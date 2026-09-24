// IHMISEN MATKAN ESITYS (web js/linssit/ihmisen-matka-esitys.js luoEsitys).
//
// Yksi yhtenäinen kaari: kertoja lukee koko kertomuksen putkeen, ja kartta
// seuraa kertojaa. Esityksen kello on ÄÄNIKELLO: jakson kulunut aika luetaan
// äänitteen kohdasta, ja vasta ilman ääntä (mykistys, puuttuva tiedosto)
// pudotaan seinäkelloon ja tekstin pituudesta laskettuun varakestoon.
//
// Vaiheet: pimea (musta ruutu, tähdet, avaruuszoomi Afrikkaan sanan "Afrik"
// kohdalla) → valot (kehys ja virrat esiin, kamera Marokkoon) → matka × N →
// hyppy (kello kelaa taakse) → loppu (koko pallo, tutkimusvaihe).
//
// Tämä luokka ei piirrä eikä soita mitään: se kertoo IEsityksenNakyma-
// rajapinnalle mitä näytetään ja ILinssiYmparistolle minne kamera ajaa.
// Näin koko koreografia testataan ilman Unityä.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Kertomuksen jakso (web IHMISEN_MATKA_KERTOMUS, sisältöpaketti).</summary>
    public sealed class KertomusJakso
    {
        public string Id;
        public string Vaihe;          // pimea | valot | matka | hyppy | loppu
        public string Kohde;          // IHMISEN_MATKA-tunnus tai null
        public IReadOnlyList<string> Hiljaiset = Array.Empty<string>();
        public string Alue;           // Esitysmatikka.Alueet-avain tai null
        public double? Vuosia;
        public string Teksti;
        public string Pulu;
        public string Tunne;
        public double TunteenVoimakkuus;
        public string Maisema;
    }

    /// <summary>Jakson aikaleimat kertomusmanifestista (ms äänitteen alusta, lauseet ja sanat jakson alusta).</summary>
    public sealed class JaksonLeimat
    {
        public double Alku, Loppu, Paattyy;
        public IReadOnlyList<double> Lauseet = Array.Empty<double>();
        public IReadOnlyList<(string sana, double alku)> Sanat = Array.Empty<(string, double)>();
        public double Kesto => Paattyy - Alku;
        public double Puhe => Loppu - Alku;

        /// <summary>Manifestin jaksot → leimat; paattyy = seuraavan alku (web jaksojenAikaleimat).</summary>
        public static Dictionary<string, JaksonLeimat> Manifestista(IReadOnlyList<(string tunnus, double alku, double loppu,
            IReadOnlyList<double> lauseet, IReadOnlyList<(string sana, double alku)> sanat)> jaksot)
        {
            var tulos = new Dictionary<string, JaksonLeimat>();
            for (int k = 0; k < jaksot.Count; k++)
            {
                var j = jaksot[k];
                double paattyy = k + 1 < jaksot.Count ? jaksot[k + 1].alku : j.loppu;
                tulos[j.tunnus] = new JaksonLeimat
                {
                    Alku = j.alku, Loppu = j.loppu, Paattyy = paattyy,
                    Lauseet = j.lauseet.Select(x => x - j.alku).ToList(),
                    Sanat = j.sanat.Select(s => (s.sana, s.alku - j.alku)).ToList(),
                };
            }
            return tulos;
        }
    }

    /// <summary>Kertojan ääni (yksi äänite koko kertomukselle, web luenta putkena).</summary>
    public interface IEsityksenAani
    {
        /// <summary>Soita äänitettä kohdasta (ms).</summary>
        void Soita(double kohtaMs);
        void Tauko();
        void Jatka();
        void Lopeta();
        /// <summary>Äänitteen kohta (ms), tai null, jos ääni ei soi (mykistys, virhe, ei vielä alkanut).</summary>
        double? KohtaMs { get; }
    }

    /// <summary>Esityksen näkyvät asiat (Natiivi-UI ja linssin omat kerrokset).</summary>
    public interface IEsityksenNakyma
    {
        void Musta(bool paalla, double feidiMs);
        void Valot(double feidiMs);
        void Jakso(int i, KertomusJakso jakso);
        void Kello(double vuosiaSitten);
        void SytytaKohde(string kohde);
        void Kuva(string kohde);          // null = kuva pois
        void Pulu(string teksti);
        void Tunne(string tunne, double voimakkuus, string jakso);
        void VirtojenPito(bool paalla);
        void Loppu();
    }

    public sealed class Esitys
    {
        public const string AvauksenSana = "Afrik";

        readonly IReadOnlyList<KertomusJakso> kertomus;
        readonly IReadOnlyDictionary<string, LatLon> kohteet;
        readonly IReadOnlyDictionary<string, JaksonLeimat> leimat;
        readonly Func<IReadOnlyList<IReadOnlyList<double[]>>> vanat;
        readonly ILinssiYmparisto y;
        readonly IEsityksenNakyma nakyma;
        readonly IEsityksenAani aani;
        readonly KertomusJakso ensimmainenKohde;

        // Tila (web tila-olio).
        public int I { get; private set; } = -1;
        public double Kulunut { get; private set; }
        public double Luenta { get; private set; }
        public double Kesto { get; private set; }
        public double Vuosia { get; private set; }
        public bool Kaynnissa { get; private set; }
        public bool Paattynyt { get; private set; }
        public bool AvausOhi { get; private set; }
        public bool MustaPaalla { get; private set; } = true;
        double alkuHetki, puluHetki;
        double viimeHaku = double.NegativeInfinity;

        /// <summary>
        /// Äänen kohta kelpaa kelloksi vain jakson leimojen sisällä (± tämä). iPadilla
        /// (2e26b45, ee68957) kelaus jakson alkuun ei aina tarttunut, jolloin kohta jäi
        /// jakson alun alle, Kulunut pysyi nollassa ja esitys jumittui. Silloin kello
        /// kulkee seinäkellolla, ja kelausta pyydetään uudelleen enintään kerran sekunnissa.
        /// </summary>
        public const double AanenToleranssiMs = 1000, KelauksenValiMs = 1000;
        bool puluSanottu, avausOdottaa = true, valotOdottaa, kohdeajo, valotPalavat;
        double? kelauksenAlku, kohdeajonTauko;
        double avaruusAlku = double.NaN, avaruusKesto, avaruusTauko = double.NaN;

        public Esitys(IReadOnlyList<KertomusJakso> kertomus, IReadOnlyDictionary<string, LatLon> kohteet,
            IReadOnlyDictionary<string, JaksonLeimat> leimat, Func<IReadOnlyList<IReadOnlyList<double[]>>> vanat,
            ILinssiYmparisto ymparisto, IEsityksenNakyma nakyma, IEsityksenAani aani)
        {
            this.kertomus = kertomus;
            this.kohteet = kohteet;
            this.leimat = leimat ?? new Dictionary<string, JaksonLeimat>();
            this.vanat = vanat ?? (() => Array.Empty<IReadOnlyList<double[]>>());
            y = ymparisto;
            this.nakyma = nakyma;
            this.aani = aani;
            ensimmainenKohde = kertomus.FirstOrDefault(j => j.Kohde != null);
        }

        double Nyt => y.Aika * 1000;
        KertomusJakso Nykyinen => I >= 0 && I < kertomus.Count ? kertomus[I] : null;
        JaksonLeimat Leimat(KertomusJakso j) => j != null && leimat.TryGetValue(j.Id, out var l) ? l : null;

        /// <summary>Tekstin pituudesta laskettu kesto (web kertomuksenVarakesto).</summary>
        public static double Varakesto(KertomusJakso j, double pohja = 2500)
        {
            int merkit = (j?.Teksti ?? "").Trim().Length;
            return Math.Max(pohja, Math.Floor(merkit / 14.0 * 1000 + 0.5));
        }

        // ── Julkinen ohjaus ───────────────────────────────────────────────

        public void Aloita()
        {
            if (Kaynnissa || Paattynyt) return;
            nakyma.Musta(true, 0);
            Kaynnissa = true;
            AloitaJakso(0);
        }

        /// <summary>Kertomuskaaren oma raita (web kaari.musiikki 'ihmisen-matka'); null = hiljainen.</summary>
        public string MusiikkiLaji;
        bool musiikkiAlkoi;

        /// <summary>
        /// Web sytytaValot / avaus ohi → ajo.aloitaMusiikki(true): musta ruutu on hiljainen, raita
        /// nousee valojen syttyessä. Tauolla ja lopussa puoleen, jatkossa täyteen (saadaMusiikki).
        /// </summary>
        void MusiikkiSisaan()
        {
            if (MusiikkiLaji == null || musiikkiAlkoi) return;
            musiikkiAlkoi = true;
            y.LinssiMusiikki(MusiikkiLaji);
            y.LinssiMusiikkiHimmennys(Kaynnissa ? 1 : Pysakkiajo.TaukoHimmennys);
        }

        void MusiikkiTaso(double taso) { if (musiikkiAlkoi) y.LinssiMusiikkiHimmennys(taso); }

        public void Tauko()
        {
            if (!Kaynnissa) return;
            Kaynnissa = false;
            MusiikkiTaso(Pysakkiajo.TaukoHimmennys);
            aani?.Tauko();
            if (!double.IsNaN(avaruusAlku) && double.IsNaN(avaruusTauko) && AvaruuttaJaljella() > 0)
                avaruusTauko = Nyt - avaruusAlku;
        }

        public void Jatka()
        {
            if (Kaynnissa || Paattynyt) return;
            Kaynnissa = true;
            alkuHetki = Nyt - Kulunut;
            MusiikkiTaso(1);
            aani?.Jatka();
            if (!double.IsNaN(avaruusTauko))
            {
                double k = avaruusTauko;
                avaruusTauko = double.NaN;
                avaruusAlku = Nyt - (AvausOhi ? avaruusKesto : k);
                if (!AvausOhi) AjaAlueeseen("afrikka", AvaruuttaJaljella());
            }
        }

        /// <summary>Hyppää jakson alkuun (aikaselain, web valitse).</summary>
        public void Valitse(string id)
        {
            int i = -1;
            for (int k = 0; k < kertomus.Count; k++) if (kertomus[k].Id == id) { i = k; break; }
            if (i < 0 || Paattynyt) return;
            Kaynnissa = true;
            AloitaJakso(i, 0, hyppy: true);
        }

        /// <summary>Kutsutaan joka kehys (web kehys).</summary>
        public void Paivita()
        {
            if (!Kaynnissa || Paattynyt) return;
            double nyt = Nyt;
            var jakso = Nykyinen;
            var l = Leimat(jakso);
            double? kohta = aani?.KohtaMs;
            if (kohta is double k && l != null && k >= l.Alku - AanenToleranssiMs && k <= l.Paattyy + AanenToleranssiMs)
            {
                Kulunut = Math.Max(0, k - l.Alku);
                alkuHetki = nyt - Kulunut;
            }
            else
            {
                Kulunut = nyt - alkuHetki;
                // Ääni soi väärässä kohdassa (kelaus ei tarttunut): pyydä uudelleen.
                if (kohta != null && l != null && nyt - viimeHaku >= KelauksenValiMs)
                {
                    viimeHaku = nyt;
                    aani.Soita(l.Alku + Kulunut);
                }
            }

            if (I == 0 && !AvausOhi)
            {
                var ajat = AvauksenAjat();
                if (MustaPaalla && Kulunut >= ajat.Musta) { MustaPaalla = false; nakyma.Musta(false, ajat.Feidi); }
                if (avausOdottaa && Kulunut >= ajat.ZoomAlku) KaynnistaAvaruusajo(ajat.ZoomLoppu - Kulunut);
            }
            if (valotOdottaa && AvaruuttaJaljella() <= 0) SytytaValot();
            if (kohdeajonTauko is double t && nyt >= t) { kohdeajonTauko = null; AloitaKohdeajo(); }
            PaivitaKello();
            if (!puluSanottu && Kulunut >= puluHetki)
            {
                puluSanottu = true;
                if (!string.IsNullOrEmpty(jakso?.Pulu)) nakyma.Pulu(jakso.Pulu);
            }
            if (Kulunut >= Kesto) SeuraavaJakso();
        }

        public void Pura()
        {
            Kaynnissa = false;
            if (musiikkiAlkoi) { musiikkiAlkoi = false; y.LinssiMusiikki(null); }
            aani?.Lopeta();
        }

        // ── Jaksot ────────────────────────────────────────────────────────

        void SeuraavaJakso()
        {
            if (I + 1 < kertomus.Count) AloitaJakso(I + 1);
            else Paata();
        }

        void AloitaJakso(int i, double kulunut = 0, bool hyppy = false)
        {
            var jakso = i < kertomus.Count ? kertomus[i] : null;
            if (jakso == null) { Paata(); return; }
            if (jakso.Vaihe == "valot") KaynnistaAvaruusajo(null);
            else if (jakso.Vaihe != "pimea")
            {
                KaynnistaAvaruusajo(null);
                // Hyppy avauksen yli (web valitse → avaus ohi, asennaPinnat({ pimea: false })):
                // valot syttyvät, vaikka valot-jaksoa ei ajettu, muuten musta jää päälle.
                if (valotOdottaa || !valotPalavat) SytytaValot();
                AvausOhi = true;
                MusiikkiSisaan();
            }
            I = i;
            alkuHetki = Nyt - kulunut;
            Kulunut = kulunut;
            puluSanottu = false;
            var l = Leimat(jakso);
            Luenta = l != null && l.Kesto > 0 ? l.Kesto : Varakesto(jakso);
            puluHetki = l != null && l.Kesto > 0 ? Math.Max(0, Math.Min(l.Puhe, l.Kesto)) : Luenta;
            Kesto = Luenta;
            kelauksenAlku = null;
            nakyma.Jakso(i, jakso);
            if (jakso.Vaihe == "valot") valotOdottaa = true;
            if (jakso.Vaihe == "hyppy") kelauksenAlku = kulunut >= Esitysmatikka.KelauksenMs ? (double?)null : Vuosia;
            var (alku, loppu) = Tahti(i);
            if (jakso.Vaihe != "hyppy" || kelauksenAlku == null) KirjoitaKello(alku);
            // Putkessa äänite soi jaksosta toiseen itse; kohtaa siirretään vain
            // alussa ja hypyssä (web luenta.aloita { hyppy }).
            if (l != null && (hyppy || aani?.KohtaMs == null)) aani?.Soita(l.Alku + kulunut);
            if (!string.IsNullOrEmpty(jakso.Tunne)) nakyma.Tunne(jakso.Tunne, jakso.TunteenVoimakkuus, jakso.Id);
            double kesto = Math.Max(Esitysmatikka.KameranPohjaMs,
                Math.Min(Esitysmatikka.KameranKattoMs, Math.Floor(Luenta * Esitysmatikka.KameranOsuus + 0.5)));
            foreach (var h in jakso.Hiljaiset ?? Array.Empty<string>()) nakyma.SytytaKohde(h);
            if (jakso.Kohde != null)
            {
                nakyma.SytytaKohde(jakso.Kohde);
                nakyma.Kuva(jakso.Kohde);
                // Avauksen Marokko-ajo on jo matkalla ensimmäiseen kohteeseen (web sama).
                // Hyppy toiseen jaksoon kesken ajon (natiivin aikaselain, iPad 23.9.)
                // ajaa kuitenkin oman kohteensa, muuten kamera jatkaisi Marokkoon.
                bool ajoPerilla = kohdeajo && !hyppy && jakso == ensimmainenKohde;
                kohdeajo = false;
                if (!ajoPerilla) AjaKohteeseen(jakso.Kohde, kesto, alku, loppu);
            }
            else
            {
                nakyma.Kuva(null);
                double alueenKesto = jakso.Vaihe == "valot" ? AvaruuttaJaljella() : kesto;
                bool zoomiKesken = jakso.Vaihe == "valot" && AvaruuttaJaljella() > 0;
                if (jakso.Alue != null && !kohdeajo && !zoomiKesken) AjaAlueeseen(jakso.Alue, alueenKesto);
            }
        }

        void Paata()
        {
            if (Paattynyt) return;
            Paattynyt = true;
            if (valotOdottaa) SytytaValot();
            AvausOhi = true;
            Kaynnissa = false;
            MusiikkiSisaan();
            MusiikkiTaso(Pysakkiajo.TaukoHimmennys);
            var viimeinen = Nykyinen;
            if (viimeinen?.Alue != null) AjaAlueeseen(viimeinen.Alue, y.VahennettyLiike ? 0 : Esitysmatikka.LopunAsetusMs);
            nakyma.Kuva(null);
            nakyma.Loppu();
        }

        // ── Kello ─────────────────────────────────────────────────────────

        (double alku, double loppu) Tahti(int i) =>
            Esitysmatikka.JaksonTahti(kertomus.Select(j => j.Vuosia).ToList(), kertomus.Select(j => j.Vaihe).ToList(), i);

        void KirjoitaKello(double v) { Vuosia = v; nakyma.Kello(v); }

        void PaivitaKello()
        {
            var jakso = Nykyinen;
            if (jakso == null) return;
            var (alku, loppu) = Tahti(I);
            if (jakso.Vaihe == "hyppy" && kelauksenAlku is double ka)
            {
                double kelaus = Math.Min(1, Kulunut / Esitysmatikka.KelauksenMs);
                if (kelaus < 1)
                {
                    KirjoitaKello(ka + (alku - ka) * Esitysmatikka.KelauksenPehmennys(kelaus));
                    return;
                }
                double jaljella = Math.Max(1, Luenta - Esitysmatikka.KelauksenMs);
                KirjoitaKello(alku + (loppu - alku) * Math.Min(1, (Kulunut - Esitysmatikka.KelauksenMs) / jaljella));
                return;
            }
            KirjoitaKello(alku + (loppu - alku) * Math.Min(1, Kulunut / Math.Max(1, Luenta)));
        }

        // ── Avaus ─────────────────────────────────────────────────────────

        public AvauksenVaiheet AvauksenAjat()
        {
            var j = kertomus.Count > 0 ? kertomus[0] : null;
            var l = Leimat(j);
            double kesto = Math.Max(1, Luenta);
            return Esitysmatikka.Avaus(l?.Lauseet ?? Array.Empty<double>(), SananHetki(j, l, kesto), kesto);
        }

        /// <summary>Sanan "Afrik…" alkuhetki jakson alusta (web sananHetki): aikaleimasta tai tekstin osuudesta.</summary>
        public static double? SananHetki(KertomusJakso j, JaksonLeimat l, double kesto, string haku = AvauksenSana)
        {
            string runko = Runko(haku);
            if (l != null)
                foreach (var (sana, alku) in l.Sanat)
                    if (Runko(sana).StartsWith(runko, StringComparison.Ordinal)) return Math.Max(0, alku);
            string t = string.Join(" ", (j?.Teksti ?? "").Split((char[])null, StringSplitOptions.RemoveEmptyEntries));
            if (t.Length == 0) return null;
            int merkkeja = 0;
            foreach (var s in t.Split(' '))
            {
                if (Runko(s).StartsWith(runko, StringComparison.Ordinal)) return Math.Max(0, kesto) * merkkeja / Math.Max(1, t.Length);
                merkkeja += s.Length + 1;
            }
            return null;
        }

        static string Runko(string s) => new string((s ?? "").ToLowerInvariant().Where(char.IsLetterOrDigit).ToArray());

        double AvaruuttaJaljella()
        {
            if (double.IsNaN(avaruusAlku)) return 0;
            double kulunut = !double.IsNaN(avaruusTauko) ? avaruusTauko : Nyt - avaruusAlku;
            return Math.Max(0, avaruusKesto - kulunut);
        }

        void KaynnistaAvaruusajo(double? kesto)
        {
            if (!avausOdottaa) return;
            avausOdottaa = false;
            double katto = Esitysmatikka.AvaruudenMs + Esitysmatikka.ZoominJatkoMs;   // AVARUUDEN_KATTO_MS
            avaruusKesto = Math.Max(Esitysmatikka.AvaruudenMinMs, Math.Min(katto, kesto is double k && k > 0 ? k : katto));
            if (MustaPaalla) { MustaPaalla = false; nakyma.Musta(false, 0); }
            if (y.VahennettyLiike) { AjaAlueeseen("afrikka", 0); return; }
            avaruusAlku = Nyt;
            AjaAlueeseen("afrikka", avaruusKesto);
        }

        void SytytaValot()
        {
            valotOdottaa = false;
            valotPalavat = true;
            double jaljella = KohteeseenAsti();
            double vara = double.IsFinite(jaljella)
                ? Math.Max(0, jaljella + Esitysmatikka.ZoominJatkoMs - Esitysmatikka.MarokonPohjaMs)
                : Esitysmatikka.MarokonTaukoMs;
            kohdeajonTauko = Nyt + (y.VahennettyLiike ? 0 : Math.Min(Esitysmatikka.MarokonTaukoMs, vara));
            nakyma.Valot(Esitysmatikka.ValojenMs);
            nakyma.VirtojenPito(true);
            MusiikkiSisaan();
        }

        /// <summary>Millisekunnit ensimmäisen kohdejakson alkuun (äänitteestä tai varakestoista).</summary>
        double KohteeseenAsti()
        {
            var l = Leimat(ensimmainenKohde);
            if (l != null && aani?.KohtaMs is double k) return l.Alku - k;
            int kohde = -1;
            for (int n = 0; n < kertomus.Count; n++) if (kertomus[n] == ensimmainenKohde) { kohde = n; break; }
            if (kohde < 0 || kohde <= I) return double.NaN;
            double ms = Math.Max(0, Luenta - Kulunut);
            for (int n = I + 1; n < kohde; n++) ms += Varakesto(kertomus[n]);
            return ms;
        }

        void AloitaKohdeajo()
        {
            if (y.VahennettyLiike || kohdeajo || AvausOhi || Paattynyt || ensimmainenKohde == null) return;
            double jaljella = KohteeseenAsti();
            double kesto = double.IsFinite(jaljella) ? jaljella + Esitysmatikka.ZoominJatkoMs : double.NaN;
            if (!double.IsFinite(kesto) || kesto < Esitysmatikka.MarokonPohjaMs) return;
            int i = -1;
            for (int n = 0; n < kertomus.Count; n++) if (kertomus[n] == ensimmainenKohde) { i = n; break; }
            var (alku, loppu) = Tahti(i);
            kohdeajo = true;
            // Kuutiollinen kiihdytys ja pitkä jarrutus (web marokonKaari).
            AjaKohteeseen(ensimmainenKohde.Kohde, kesto, alku, loppu, t => Esitysmatikka.MarokonKaari(t));
        }

        // ── Kamera ────────────────────────────────────────────────────────

        /// <summary>Viimeisin kamerarajaus (testit ja mittarit).</summary>
        public (LatLon keskus, double leveysAst, double kestoMs)? ViimeisinAjo { get; private set; }

        void AjaKohteeseen(string tunnus, double kestoMs, double alku, double loppu, Func<double, double> pehmennys = null)
        {
            if (!kohteet.TryGetValue(tunnus, out var t)) return;
            var (rajaus, _) = Esitysmatikka.JaksonRajaus(t, vanat(), alku, loppu);
            double leveys = Math.Max(Esitysmatikka.Lahikuva,
                Esitysmatikka.RajauksenLeveys(rajaus, y.Kuvasuhde, 0.14) ?? 0);
            var keskus = rajaus is Rajaus r ? new LatLon(r.Lat, r.Lon) : t;
            Aja(keskus, Kameramatikka.LeveysAsteina(leveys), kestoMs, pehmennys);
        }

        void AjaAlueeseen(string alue, double kestoMs)
        {
            if (!Esitysmatikka.Alueet.TryGetValue(alue, out var laatikko)) return;
            if (laatikko is Laatikko l)
            {
                var r = l.Rajaus();
                // Laatikko mahtuu ruudulle kummassakin suunnassa (web ajaKamera bbox).
                double leveys = Math.Max(r.LeveysAst, r.KorkeusAst * y.Kuvasuhde);
                Aja(new LatLon(r.Lat, r.Lon), leveys, kestoMs);
            }
            else
            {
                var nyt = y.Kamera;
                ViimeisinAjo = (new LatLon(nyt.Lat, nyt.Lon), 360, kestoMs);
                y.AjaKamera(new Nakyma(nyt.Lat, nyt.Lon, y.KokoPallonKorkeus), (float)(kestoMs / 1000));
            }
        }

        void Aja(LatLon keskus, double leveysAst, double kestoMs, Func<double, double> pehmennys = null)
        {
            ViimeisinAjo = (keskus, leveysAst, kestoMs);
            double ms = y.VahennettyLiike ? 0 : kestoMs;
            y.AjaKamera(new Nakyma(keskus.Lat, keskus.Lon, y.KorkeusLeveydelle(leveysAst)), (float)(ms / 1000), pehmennys);
        }
    }
}
