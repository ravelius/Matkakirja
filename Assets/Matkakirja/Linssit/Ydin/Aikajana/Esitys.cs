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
        /// <summary>Vanat piirretään heti pitona tähän kellolukemaan asti (muistista jatko, web pidon pohja).</summary>
        void PidonPohja(double vuosiaSitten);
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
        /// <summary>Pienin kellolukema tähän asti (web tila.pitoMin): muistin pidon pohja.</summary>
        public double PitoMin { get; private set; } = double.PositiveInfinity;
        /// <summary>Jatkettiinko muistista (ei mustaa, ei avausta).</summary>
        public bool Muistista { get; private set; }
        /// <summary>Esitys päättyi (web ui.aloitaTutkimusvaihe): linssi aloittaa tutkimusvaiheen.</summary>
        public Action Lopussa;
        /// <summary>Muisti seuraa jaksoa (web ajo.tallennaMuisti): jakson alku ja valinta lopun jälkeen.</summary>
        public Action Tallenna;
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

        /// <summary>
        /// Jakson aikaleimat (lauseet, sanat) UI:lle: kertojan tekstilaatikko vaihtaa osia lauseleimojen
        /// tahdissa (web osienHetket). null, jos jaksolla ei ole leimoja (varapolku: merkkiosuus).
        /// </summary>
        public JaksonLeimat Leimat(string jaksonId) => jaksonId != null && leimat.TryGetValue(jaksonId, out var l) ? l : null;

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
            // Avaruus (web avaaKaukaisuus) ajetaan tempon dramaturgialla (Raamattu KAMERA-AJOT 24.9.):
            // ensimmäinen virke mustalla kaupungin yllä, NOUSU tähtiin mustan häivyttyä (Nousu), HETKI
            // TÄHDISSÄ (pito zoomin alkuun), SYÖKSY Afrikkaan KUMINAUHAJARRUTUKSELLA (SyoksyKuminauha).
            // Vähennetty liike: pallo heti Afrikassa (KaynnistaAvaruusajo).
            nousuOdottaa = !y.VahennettyLiike;
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
            if (juttuAuki) return;   // raita nousee vasta tiedeliitteen sulkiessa (JutunAjaksi)
            y.LinssiMusiikki(MusiikkiLaji);
            y.LinssiMusiikkiHimmennys(Kaynnissa ? 1 : Pysakkiajo.TaukoHimmennys);
        }

        void MusiikkiTaso(double taso) { if (musiikkiAlkoi && !juttuAuki) y.LinssiMusiikkiHimmennys(taso); }

        bool juttuAuki;

        /// <summary>
        /// TIEDELIITE ON OMA NÄKYMÄNSÄ (web vaimennaJutunAjaksi / palautaJutunJalkeen): linssin raita
        /// väistyy kokonaan sivun ajaksi ja palaa sulkiessa esityksen tasolle.
        /// </summary>
        public void JutunAjaksi(bool auki)
        {
            if (auki == juttuAuki) return;
            juttuAuki = auki;
            if (!musiikkiAlkoi) return;
            if (auki) { y.LinssiMusiikki(null); return; }
            y.LinssiMusiikki(MusiikkiLaji);
            y.LinssiMusiikkiHimmennys(Kaynnissa ? 1 : Pysakkiajo.TaukoHimmennys);
        }

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
                // Tauon jälkeen loppumatka levosta kuminauhalla (ei nykäystä syöksyn keskeltä).
                if (!AvausOhi) AjaAlueeseen("afrikka", AvaruuttaJaljella(),
                    Matkakirja.Linssit.Kamera.Kamerakayrat.Funktio(Matkakirja.Linssit.Kamera.Kayra.Kuminauha));
            }
        }

        /// <summary>Hyppää jakson alkuun (aikaselain, web valitse).</summary>
        public void Valitse(string id)
        {
            int i = -1;
            for (int k = 0; k < kertomus.Count; k++) if (kertomus[k].Id == id) { i = k; break; }
            if (i < 0) return;
            // Aikaselaimen irrotus (web valitse): selaus päättyy, pito alkaa valitusta hetkestä.
            bool? oliTauolla = selaus;
            selaus = null;
            // Pidon pohja alkaa valitusta hetkestä (web valitse: tila.pitoMin = vuosia).
            PitoMin = kertomus[i].Vuosia ?? Vuosia;
            nakyma.VirtojenPito(true);
            if (Paattynyt)
            {
                // Esityksen jälkeen valinta on pelkkä kelaus: kello ja vanat hetkeen, kertoja vaiti.
                I = i;
                KirjoitaKello(kertomus[i].Vuosia ?? Vuosia);
                Tallenna?.Invoke();
                return;
            }
            Kaynnissa = true;
            AloitaJakso(i, 0, hyppy: true);
            // Pelaaja oli itse tauolla ennen vetoa: jakso vaihtuu, mutta esitys ei lähde.
            if (oliTauolla == true) Tauko();
        }

        /// <summary>Aikaselaimen veto alkoi (null = ei selausta): oliko esitys tauolla ennen vetoa.</summary>
        bool? selaus;
        public bool Selataan => selaus != null;

        /// <summary>
        /// AIKASELAIMEN VETO (web esikatsele): esitys menee hiljaa tauolle, pito katkeaa vedon ajaksi,
        /// ja kello sekä vanat seuraavat sormea (osuus 0…1 nauhalla, geometrinen välilukema).
        /// </summary>
        public bool Esikatsele(double osuus)
        {
            if (selaus == null)
            {
                selaus = !Kaynnissa;
                if (Kaynnissa) Tauko();
                nakyma.VirtojenPito(false);
            }
            KirjoitaKello(KelauksenLukema(kertomus, osuus));
            return true;
        }

        /// <summary>Web kelauksenLukema: nauhan jatkuva osuus → vuosia sitten (geometrinen jaksojen välillä).</summary>
        public static double KelauksenLukema(IReadOnlyList<KertomusJakso> kertomus, double osuus)
        {
            int n = kertomus?.Count ?? 0;
            if (n == 0) return 0;
            double t = Math.Max(0, Math.Min(1, double.IsNaN(osuus) ? 0 : osuus)) * (n - 1);
            int i = Math.Min(n - 2, (int)Math.Floor(t));
            if (i < 0) return kertomus[0].Vuosia ?? 0;
            double f = Math.Max(0, Math.Min(1, t - i));
            if (!(kertomus[i].Vuosia is double a) || !double.IsFinite(a)) return 0;
            if (!(kertomus[i + 1].Vuosia is double b) || !double.IsFinite(b)) return a;
            if (!(a > 0) || !(b > 0)) return a + (b - a) * f;
            return a * Math.Pow(b / a, f);
        }

        /// <summary>Web selaimenVuositeksti: sama muoto kuin kellossa ("50 000 v. sitten", "n. 1250 jaa.").</summary>
        public static string SelaimenVuositeksti(double vuosia, string yksikko = "v. sitten")
        {
            double arvo = Math.Max(0, double.IsNaN(vuosia) ? 0 : vuosia);
            var teksti = Asteikko.KellonVuositeksti(arvo);
            if (teksti != null) return teksti;
            string luku = Math.Floor(arvo + 0.5).ToString("#,0", new System.Globalization.NumberFormatInfo { NumberGroupSeparator = " ", NumberGroupSizes = new[] { 3 } });
            return string.IsNullOrEmpty(yksikko) ? luku : luku + " " + yksikko;
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
                if (nousuOdottaa && Kulunut >= ajat.Musta) KaynnistaNousu(ajat.ZoomAlku - Kulunut);
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
            // Muisti seuraa jaksoa (web aloitaJakso → ajo.tallennaMuisti).
            Tallenna?.Invoke();
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

        void Paata(bool kamera = true)
        {
            if (Paattynyt) return;
            Paattynyt = true;
            if (valotOdottaa) SytytaValot();
            AvausOhi = true;
            Kaynnissa = false;
            MusiikkiSisaan();
            MusiikkiTaso(Pysakkiajo.TaukoHimmennys);
            var viimeinen = Nykyinen;
            if (kamera && viimeinen?.Alue != null) AjaAlueeseen(viimeinen.Alue, y.VahennettyLiike ? 0 : Esitysmatikka.LopunAsetusMs);
            nakyma.Kuva(null);
            nakyma.Loppu();
            // Viimeisen jakson pulu on luovutus tutkimusvaiheeseen ("Kartta on sinun…"; web paata →
            // sanoPulu(viimeinen)): sanotaan lopussa, ellei jakso ehtinyt sanoa sitä itse — myös
            // muistista tai testikomennolla suoraan loppuun tultaessa. Ei koskaan kahdesti.
            if (!puluSanottu && !string.IsNullOrEmpty(viimeinen?.Pulu)) { puluSanottu = true; nakyma.Pulu(viimeinen.Pulu); }
            // Koukku viimeisenä: tutkimusvaihe saa ruudun vasta, kun esitys on siivonnut jälkensä.
            Lopussa?.Invoke();
        }

        /// <summary>
        /// TESTIKOMENTO (linssi-komento "ihminen tutkimus"): esitys suoraan loppuun ilman ajoa.
        /// Kertoja vaikenee, avaus ja musta ohitetaan, kaikki löytöpaikat syttyvät, kello nollaan
        /// (vanat kokonaan) ja Paata ajaa lopun kameran ja Lopussa-koukun kuten luonnollinen loppu.
        /// </summary>
        public bool Loppuun()
        {
            if (Paattynyt) return false;
            aani?.Lopeta();
            selaus = null;
            avausOdottaa = false;
            AvausOhi = true;
            kohdeajo = false;
            kohdeajonTauko = null;
            if (MustaPaalla) { MustaPaalla = false; nakyma.Musta(false, 0); }
            if (!valotPalavat)
            {
                valotOdottaa = false;
                valotPalavat = true;
                nakyma.Valot(0);
            }
            nakyma.VirtojenPito(true);
            foreach (var j in kertomus)
            {
                foreach (var h in j.Hiljaiset ?? Array.Empty<string>()) nakyma.SytytaKohde(h);
                if (j.Kohde != null) nakyma.SytytaKohde(j.Kohde);
            }
            I = kertomus.Count - 1;
            KirjoitaKello(0);
            Paata();
            return true;
        }

        // ── Muisti ────────────────────────────────────────────────────────

        /// <summary>
        /// JATKO MUISTISTA (web jatkaMuistista): ei mustaa eikä avausta, valot päällä, musiikki
        /// nousee, pito kytketään ja sen pohja piirretään ensin (muuten Amerikat olisivat tyhjät,
        /// jos jatko on Euroopan haarassa). Kamera on linssin muistista jo paikallaan.
        /// Tutkimusvaihe jatkuu suoraan loppuun ilman kamera-ajoa.
        /// </summary>
        public bool JatkaMuistista(LinssiMuistiTila muisti)
        {
            if (muisti == null || Kaynnissa || Paattynyt || I >= 0) return false;
            int i = -1;
            if (muisti.Vaihe != "tutkimus")
            {
                for (int k = 0; k < kertomus.Count; k++) if (kertomus[k].Id == muisti.Jakso) { i = k; break; }
                if (i < 0) return false;
            }
            Muistista = true;
            AvausOhi = true;
            avausOdottaa = false;
            valotOdottaa = false;
            valotPalavat = true;
            MustaPaalla = false;
            nakyma.Musta(false, 0);
            nakyma.Valot(0);
            nakyma.VirtojenPito(true);
            MusiikkiSisaan();
            if (muisti.PitoMin is double p)
            {
                PitoMin = p;
                nakyma.PidonPohja(p);
            }
            if (muisti.Vaihe == "tutkimus")
            {
                I = kertomus.Count - 1;
                KirjoitaKello(0);
                Paata(kamera: false);
                return true;
            }
            // Jakson kesto tarkentuu äänitteestä; kulunut ei saa ylittää varakestoa.
            double kulunut = Math.Max(0, Math.Min(muisti.Kulunut, Varakesto(kertomus[i]) - 200));
            Kaynnissa = true;
            AloitaJakso(i, kulunut, hyppy: true);
            return true;
        }

        // ── Kello ─────────────────────────────────────────────────────────

        (double alku, double loppu) Tahti(int i) =>
            Esitysmatikka.JaksonTahti(kertomus.Select(j => j.Vuosia).ToList(), kertomus.Select(j => j.Vaihe).ToList(), i);

        void KirjoitaKello(double v)
        {
            Vuosia = v;
            // Veto ei kasvata pitoa (web kelaaKello); pohja alkaa irrotuksen valinnasta.
            if (selaus == null) PitoMin = Math.Min(PitoMin, Math.Max(0, v));
            nakyma.Kello(v);
        }

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

        bool nousuOdottaa;

        /// <summary>Nousun kesto (ms): enintään 1,8 s ja 60 % ajasta zoomin alkuun, jotta tähdissä ehtii viipyä.</summary>
        public const double NousuMaxMs = 1800, NousuMinMs = 500;

        /// <summary>NOUSU: kaupungista 300 pallonsäteen päähän Afrikan yläpuolelle (Kayra.Nousu), liian lyhyellä ajalla heti.</summary>
        void KaynnistaNousu(double zoomiinMs)
        {
            nousuOdottaa = false;
            if (!Esitysmatikka.Alueet.TryGetValue("afrikka", out var a) || !(a is Laatikko af)) return;
            var r = af.Rajaus();
            double ms = Math.Min(NousuMaxMs, zoomiinMs * 0.6);
            if (ms < NousuMinMs) { y.KameraAvaruuteen(r.Lat, r.Lon, Esitysmatikka.AvaruudenKorkeus); return; }
            y.AjaKamera(new Nakyma(r.Lat, r.Lon, Esitysmatikka.AvaruudenKorkeus * Kameramatikka.MaanSade), (float)(ms / 1000),
                Matkakirja.Linssit.Kamera.Kamerakayrat.Funktio(Matkakirja.Linssit.Kamera.Kayra.Nousu));
        }

        void KaynnistaAvaruusajo(double? kesto)
        {
            nousuOdottaa = false;
            if (!avausOdottaa) return;
            avausOdottaa = false;
            double katto = Esitysmatikka.AvaruudenMs + Esitysmatikka.ZoominJatkoMs;   // AVARUUDEN_KATTO_MS
            avaruusKesto = Math.Max(Esitysmatikka.AvaruudenMinMs, Math.Min(katto, kesto is double k && k > 0 ? k : katto));
            if (MustaPaalla) { MustaPaalla = false; nakyma.Musta(false, 0); }
            if (y.VahennettyLiike) { AjaAlueeseen("afrikka", 0); return; }
            avaruusAlku = Nyt;
            // SYÖKSY + KUMINAUHAJARRUTUS: hidas irtoaminen tähdistä, kiihtyvä pudotus, jousto perille.
            AjaAlueeseen("afrikka", avaruusKesto, Matkakirja.Linssit.Kamera.Kamerakayrat.Funktio(Matkakirja.Linssit.Kamera.Kayra.SyoksyKuminauha));
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

        void AjaAlueeseen(string alue, double kestoMs, Func<double, double> pehmennys = null)
        {
            if (!Esitysmatikka.Alueet.TryGetValue(alue, out var laatikko)) return;
            if (laatikko is Laatikko l)
            {
                var r = l.Rajaus();
                // Laatikko mahtuu ruudulle kummassakin suunnassa (web ajaKamera bbox).
                double leveys = Math.Max(r.LeveysAst, r.KorkeusAst * y.Kuvasuhde);
                Aja(new LatLon(r.Lat, r.Lon), leveys, kestoMs, pehmennys);
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
            // Oma käyrä puuttuu → tempo matkan mukaan (Kamerakoreografia.Matkalle, Raamattu KAMERA-AJOT).
            var nyt = y.Kamera;
            pehmennys ??= Matkakirja.Linssit.Kamera.Kamerakayrat.Matkalle(nyt.Lat, nyt.Lon, keskus.Lat, keskus.Lon);
            y.AjaKamera(new Nakyma(keskus.Lat, keskus.Lon, y.KorkeusLeveydelle(leveysAst)), (float)(ms / 1000), pehmennys);
        }
    }
}
