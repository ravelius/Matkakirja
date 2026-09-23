// PÖLLÖN SÄHKETEHTÄVÄ (web js/fokusvirta.js "PÖLLÖN SÄHKETEHTÄVÄ"; Raamattu, omistaja 29.8. ja 3.9.2026):
// kaupungissa voi kohtaamisen SIJASTA olla sähketehtävä (pilotit Sofia ja Tukholma). Pöllö on jo
// selvittänyt aarteen paikan, mutta kertoo sen vasta tunnussanasta, joka kaivetaan maan omista
// peliaineistoista. Vastaus on SÄHKELOMAKE, jossa on kaksi aukkoa (hakemistopoiminta ja tarkka luku),
// ja rinnalla vapaa vastaus omin sanoin (paikallinen tulkinta ilmaiseksi, muuten pöllön tuomio).
//
// VÄÄRÄ YRITYS EI RIKO MITÄÄN, MUTTA MAKSAA: yrityksiä ei rajata eikä aarre lukitu koskaan; pöllö
// sähköttää takaisin, kumpi aukko on pielessä, ja palkkio pienenee neljänneksellä joka ohilyönnistä
// (KauppaVakiot.SahkePalkkioOhilyonneista, lattia 0). Kahden ohilyönnin jälkeen Livia vinkkaa lähteen.
//
// LENTO EI LUKITSE PELIÄ: oikean vastauksen jälkeen Livia lentää (LentoMs), palaa kuplalla (PaluuMs),
// ja vasta sitten laatta kääntyy (Kaupat.AvaaAarreSahkeella). Jos pelaaja on lähtenyt kaupungista, paluu
// odottaa seuraavaa pisteen napautusta (natiivissa napautus kääntää laatan; webissä kortti vain toteaa
// lähetyksen, eikä aarre paljastu ennen uutta istuntoa).
//
// Ohilyönnit ja vastatut ovat istunnon tilaa kuten webissä (ui.sahkeOhi, ui.sahkeVastattu), eivät
// tallennusta; pullat ovat pelitilassa (Kaupat.PullaOstos, avain KauppaVakiot.SahkePullaAvain).
// Sisältö: kokoelma fokusvirrat, alkion data.sahketehtava. Ei UnityEngineä: Peli-testit/Testit/SahkeTestit.cs.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Lomakkeen aukko (web tehtava.aukot[i]).</summary>
    public sealed class SahkeAukko
    {
        public string Id, Otsake, SahkeSana, Vihje;
        /// <summary>"hakemisto" (valinta maan sisältöhakemistosta) tai "luku" (numerosyöttö).</summary>
        public string Tyyppi;
        /// <summary>Hakemiston hyväksytyt otsikot (web oikeat ?? [oikea]).</summary>
        public List<string> Oikeat = new List<string>();
        /// <summary>Luvun oikea arvo tekstinä (web oikea; vertailu JS Number -arvoina).</summary>
        public string Oikea;
        /// <summary>Vapaan vastauksen tunnetut kirjoitusasut.</summary>
        public List<string> Vapaat = new List<string>();
        public double? Pienin, Suurin;
        public bool Luku => Tyyppi == "luku";
    }

    /// <summary>Puolikkaan pullan suora linkki (web vastauslinkki): kartan kohde tai lehden sivu.</summary>
    public sealed class SahkeLinkki
    {
        /// <summary>"kohde" (Maa ISO3 + Kohde) tai "lehtisivu" (Kaupunki + Sivu ≥ 1).</summary>
        public string Tyyppi, Maa, Kohde, Kaupunki;
        public int? Sivu;
        /// <summary>Web vastauslinkinNappi.</summary>
        public string Nappi => Tyyppi == "lehtisivu" ? "Avaa Livian linkki: lehden sivu"
            : Tyyppi == "kohde" ? "Avaa Livian linkki: kartan kohde" : "Avaa Livian linkki";
    }

    /// <summary>Yhden kaupungin sähketehtävä (web FOKUSVIRRAT[kaupunki].sahketehtava) oletuksineen.</summary>
    public sealed class Sahketehtava
    {
        public string Id, Kaupunki;
        public string Hahmo, Sahke, HakemistoMaa, Laheta, VapaaOtsake, VapaaVihje, LahetaVapaa, VaarinSahke;
        public string Vastaussahke, Fakta, Lento, Lahetetty, Nappi;
        /// <summary>Livian kuplat (web livianKuplat: teksti tai taulukko, tyhjät pois).</summary>
        public List<string> Johdanto, Vinkki, LinkkiSaate, Oikein, Odotus, Paluu;
        public List<SahkeAukko> Aukot = new List<SahkeAukko>();
        public SahkeLinkki Vastauslinkki;
        /// <summary>Palkkion pohja (web tehtava.palkkio ?? SAHKE_PALKKIO).</summary>
        public int Palkkio = KauppaVakiot.SahkePalkkio;

        /// <summary>Kokoelma fokusvirrat → kaupunki → sähketehtävä (vain kaupungit, joilla tehtävä on).</summary>
        public static Dictionary<string, Sahketehtava> LueKokoelma(string json)
        {
            var tulos = new Dictionary<string, Sahketehtava>();
            if (string.IsNullOrEmpty(json)) return tulos;
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "alkiot")))
            {
                var o = MiniJson.Objekti(a);
                var id = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(o, "id");
                if (id != null && MiniJson.Kentta(o, "data") is Dictionary<string, object> d
                    && MiniJson.Kentta(d, "sahketehtava") is Dictionary<string, object> s)
                    tulos[id] = Lue(s, id);
            }
            return tulos;
        }

        /// <summary>Web livianKuplat: taulukko, {teksti} tai teksti → kuplat ilman tyhjiä.</summary>
        public static List<string> Kuplat(object arvo)
        {
            IEnumerable<object> lista = arvo is List<object> l ? l : new[] { arvo };
            return lista.Select(x => x is Dictionary<string, object> o ? MiniJson.Kentta(o, "teksti") : x)
                .Select(x => x switch { null => "", string s => s, double d => SahkeTeksti.JsLukuTekstiksi(d), bool b => b ? "true" : "false", _ => "" })
                .Select(s => s.Trim()).Where(s => s.Length > 0).ToList();
        }

        static string Arvo(object x) => x switch { string s => s, double d => SahkeTeksti.JsLukuTekstiksi(d), _ => null };

        /// <summary>Yksi tehtävä jäsennetystä datasta; web-oletukset kutsupaikoilta.</summary>
        public static Sahketehtava Lue(Dictionary<string, object> s, string kaupunki)
        {
            string T(string nimi, string oletus = null) => MiniJson.Teksti(s, nimi) ?? oletus;
            var t = new Sahketehtava
            {
                Id = T("id"), Kaupunki = kaupunki,
                Hahmo = T("hahmo", "Pöllöltä"), Sahke = T("sahke", ""), HakemistoMaa = T("hakemistoMaa"),
                Laheta = T("laheta", "Lähetä sähke"),
                VapaaOtsake = T("vapaaOtsake", "Tai kirjoita vastaus omin sanoin"),
                VapaaVihje = T("vapaaVihje", "Yhdellä lauseella, omin sanoin"),
                LahetaVapaa = T("lahetaVapaa", "Lähetä omin sanoin"),
                VaarinSahke = T("vaarinSahke"),
                Vastaussahke = T("vastaussahke", "VASTAUS LÄHETETTY STOP"),
                Fakta = T("fakta"), Lento = T("lento", "Anna Livian mennä"),
                Lahetetty = T("lahetetty", "SÄHKE LÄHETETTY STOP ODOTA VASTAUSTA STOP"),
                Nappi = T("nappi", "Lue pöllön sähke"),
                Johdanto = Kuplat(MiniJson.Kentta(s, "johdanto")),
                Vinkki = Kuplat(MiniJson.Kentta(s, "vinkki")),
                LinkkiSaate = Kuplat(MiniJson.Kentta(s, "linkkiSaate")),
                Oikein = Kuplat(MiniJson.Kentta(s, "oikein")),
                Odotus = Kuplat(MiniJson.Kentta(s, "odotus")),
                Paluu = Kuplat(MiniJson.Kentta(s, "paluu")),
            };
            if (t.Odotus.Count == 0) t.Odotus.Add("Livia on matkalla. Se palaa kun se palaa.");
            if (t.Paluu.Count == 0) t.Paluu.Add("Perillä oltiin. Pöllö kertoi paikan.");
            if (MiniJson.Luku(s, "palkkio") is double p) t.Palkkio = (int)p;
            if (MiniJson.Kentta(s, "aukot") is List<object> al)
                foreach (var ao in al.OfType<Dictionary<string, object>>())
                {
                    var a = new SahkeAukko
                    {
                        Id = MiniJson.Teksti(ao, "id"), Otsake = MiniJson.Teksti(ao, "otsake"), SahkeSana = MiniJson.Teksti(ao, "sahkeSana"),
                        Vihje = MiniJson.Teksti(ao, "vihje"), Tyyppi = MiniJson.Teksti(ao, "tyyppi"),
                        Oikea = Arvo(MiniJson.Kentta(ao, "oikea")),
                        Pienin = MiniJson.Luku(ao, "pienin"), Suurin = MiniJson.Luku(ao, "suurin"),
                    };
                    if (MiniJson.Kentta(ao, "oikeat") is List<object> ol) a.Oikeat.AddRange(ol.Select(Arvo).Where(x => x != null));
                    else if (a.Oikea != null) a.Oikeat.Add(a.Oikea);
                    if (MiniJson.Kentta(ao, "vapaat") is List<object> vl) a.Vapaat.AddRange(vl.Select(Arvo).Where(x => x != null));
                    t.Aukot.Add(a);
                }
            if (MiniJson.Kentta(s, "vastauslinkki") is Dictionary<string, object> lo)
                t.Vastauslinkki = new SahkeLinkki
                {
                    Tyyppi = MiniJson.Teksti(lo, "tyyppi"), Maa = MiniJson.Teksti(lo, "maa"), Kohde = MiniJson.Teksti(lo, "kohde"),
                    Kaupunki = MiniJson.Teksti(lo, "kaupunki"), Sivu = MiniJson.Luku(lo, "sivu") is double sv ? (int)sv : (int?)null,
                };
            return t;
        }

        /// <summary>Pullan kirjanpitoavain (web sahkePullaAvain): "sahke:&lt;id&gt;:vinkki|linkki".</summary>
        public string PullaAvain(string laji) => KauppaVakiot.SahkePullaAvain(Id, laji);
    }

    /// <summary>Yksi rivi kirjoituksen aikataulussa (web sahkeKirjoitusAikataulu).</summary>
    public sealed class SahkeRivi
    {
        public string Teksti;
        public int Merkit;
        /// <summary>Merkkien väli ms (pitkä rivi nopeutuu kattoon).</summary>
        public double Merkkivali;
        /// <summary>Rivin kesto ja alku ms sähkeen alusta.</summary>
        public int Kesto, Alku;
    }

    /// <summary>Sähkeen kirjoitus rivi kerrallaan (web sahkeKirjoitusAikataulu, omistaja 3.9.2026).</summary>
    public sealed class SahkeAikataulu
    {
        public List<SahkeRivi> Rivit = new List<SahkeRivi>();
        public int ValiMs;
        public int Kesto;
    }

    /// <summary>Sähketehtävän puhtaat funktiot (web fokusvirta.js).</summary>
    public static class SahkeTulkinta
    {
        /// <summary>Kirjoituskoneen tahti (web SAHKE_MERKKI_MS, SAHKE_RIVI_KATTO_MS, SAHKE_RIVIVALI_MS).</summary>
        public const int MerkkiMs = 28, RiviKattoMs = 1400, RivivaliMs = 350;
        /// <summary>Paluusähkeet nopeammin (web SAHKE_PALUU_*).</summary>
        public const int PaluuMerkkiMs = 16, PaluuKattoMs = 700, PaluuRivivaliMs = 220;
        /// <summary>Naputusääni enintään 20 kertaa sekunnissa (web SAHKE_NAKSU_VALI_MS).</summary>
        public const int NaksuValiMs = 50;
        /// <summary>Livian lento ja paluukuplan viive ennen aarretta (web SAHKE_LENTO_MS, SAHKE_PALUU_MS).</summary>
        public const int LentoMs = 6500, PaluuMs = 3200;
        /// <summary>Monenko ohilyönnin jälkeen Livia vinkkaa (web SAHKE_VINKKI_OHI).</summary>
        public const int VinkkiOhi = 2;
        /// <summary>Pöllön tuomion aikakatkaisu (web SAHKE_TULKINTA_MS) ja rivi, kun pöllöä ei tavoitettu.</summary>
        public const int TulkintaMs = 10000;
        public const string EiVastausta = "Pöllö ei vastannut. Kokeile lomaketta.";

        static readonly Regex Rivijako = new Regex(@"\s*\n\s*");
        static readonly Regex EiSanaa = new Regex("[^0-9a-z]+");
        /// <summary>Kysymysrivi korostetaan (web SAHKE_KYSYMYSRIVI).</summary>
        public static readonly Regex KysymysRivi = new Regex(@"^(MIK[ÄA]|MISS[ÄA]|MIST[ÄA]|MIHIN|MILLOIN|MIN[ÄA] VUONNA|KUKA|KENEN|KUINKA|MITEN|MONTAKO|PALJONKO)(\s|$)", RegexOptions.IgnoreCase);

        static int JsPyorista(double x) => (int)Math.Floor(x + 0.5);

        /// <summary>Web sahkeKirjoitusAikataulu: teksti jaetaan riveiksi (\s*\n\s*), tyhjät pois.</summary>
        public static SahkeAikataulu KirjoitusAikataulu(string teksti, int merkkiMs = MerkkiMs, int kattoMs = RiviKattoMs, int valiMs = RivivaliMs) =>
            KirjoitusAikataulu(Rivijako.Split(teksti ?? ""), merkkiMs, kattoMs, valiMs);

        public static SahkeAikataulu KirjoitusAikataulu(IEnumerable<string> rivit, int merkkiMs = MerkkiMs, int kattoMs = RiviKattoMs, int valiMs = RivivaliMs)
        {
            var lista = (rivit ?? Enumerable.Empty<string>()).Select(r => r ?? "").Where(r => r.Length > 0).ToList();
            var a = new SahkeAikataulu { ValiMs = valiMs };
            double kello = 0;
            for (int i = 0; i < lista.Count; i++)
            {
                int merkit = lista[i].Length;
                double vali = merkit > 0 ? Math.Min(merkkiMs, (double)kattoMs / merkit) : merkkiMs;
                int kesto = JsPyorista(vali * merkit);
                a.Rivit.Add(new SahkeRivi { Teksti = lista[i], Merkit = merkit, Merkkivali = vali, Kesto = kesto, Alku = JsPyorista(kello) });
                kello += kesto + (i < lista.Count - 1 ? valiMs : 0);
            }
            a.Kesto = JsPyorista(kello);
            return a;
        }

        /// <summary>Web aukkoOsuu: luku JS Number -vertailuna, hakemisto täsmällisenä otsikkona.</summary>
        public static bool AukkoOsuu(SahkeAukko aukko, string arvo)
        {
            if (aukko.Luku) return SahkeTeksti.JsLuku(arvo) == SahkeTeksti.JsLuku(aukko.Oikea);
            return aukko.Oikeat.Any(o => o == arvo);
        }

        /// <summary>Web normalisoiSahketeksti: pienet, ei diakriitteja (ä → a), välimerkit välilyönneiksi.</summary>
        public static string Normalisoi(string teksti)
        {
            var nfd = (teksti ?? "").ToLowerInvariant().Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(nfd.Length);
            foreach (var c in nfd) if (c < '̀' || c > 'ͯ') sb.Append(c);
            return EiSanaa.Replace(sb.ToString(), " ").Trim();
        }

        static IEnumerable<string> VapaatVariantit(SahkeAukko a) =>
            (a.Luku ? new[] { a.Oikea }.Concat(a.Vapaat) : a.Oikeat.Concat(a.Vapaat)).Select(Normalisoi).Where(v => v.Length > 0);

        /// <summary>
        /// Web tulkitseVapaaSahke: osuu, kun jokaisen aukon jokin kirjoitusasu on tekstissä kokonaisina sanoina.
        /// Paikallinen tulkinta vain HYVÄKSYY: ohi mennyt teksti lähtee pöllölle, ei tuomita täällä.
        /// </summary>
        public static (bool Osui, List<SahkeAukko> Vaarat) TulkitseVapaa(string teksti, Sahketehtava t)
        {
            var n = Normalisoi(teksti);
            var aukot = t?.Aukot ?? new List<SahkeAukko>();
            var vaarat = aukot.Where(a => !VapaatVariantit(a).Any(v => (" " + n + " ").Contains(" " + v + " "))).ToList();
            return (n.Length > 0 && aukot.Count > 0 && vaarat.Count == 0, vaarat);
        }

        /// <summary>Web ohilyonninSahke: pöllön paluusähke, kumpi aukko on pielessä.</summary>
        public static string OhilyonninSahke(Sahketehtava t, IReadOnlyList<SahkeAukko> vaarat)
        {
            if (t.VaarinSahke != null && vaarat.Count == t.Aukot.Count) return t.VaarinSahke;
            return $"EI TÄSMÄÄ STOP TARKISTA {string.Join(" JA ", vaarat.Select(a => a.SahkeSana ?? a.Otsake))} STOP";
        }

        /// <summary>
        /// Web sisaltohakemisto: aakkostettu, kaksoiskappaleeton lista maan otsikoista (lähteet: maan lehti,
        /// maan kaupunkien lehdet ja fokusvirrat, karttakohteet). Lähteiden keruu on kutsujan (lehtidata).
        /// </summary>
        public static List<string> Hakemisto(IEnumerable<string> otsikot)
        {
            CompareInfo fi;
            try { fi = CultureInfo.GetCultureInfo("fi-FI").CompareInfo; }
            catch (Exception) { fi = CultureInfo.InvariantCulture.CompareInfo; }   // kulttuuritiedoton ajoympäristö
            return (otsikot ?? Enumerable.Empty<string>()).Where(o => !string.IsNullOrEmpty(o)).Distinct()
                .OrderBy(o => o, Comparer<string>.Create((a, b) => fi.Compare(a, b))).ToList();
        }
    }

    public enum SahkeVastausLaji
    {
        /// <summary>Tunnussana täsmää: Livia lähtee lennolle (Kuittaus-kortti).</summary>
        Osui,
        /// <summary>Ohilyönti: paluusähke ja pienentynyt palkkio.</summary>
        Ohi,
        /// <summary>Vapaa vastaus oli tyhjä: ei ohilyöntiä.</summary>
        Tyhja,
        /// <summary>Paikallinen tulkinta ei osunut: vie teksti pöllölle ja kutsu PollonTuomio.</summary>
        Pollolle,
        /// <summary>Pöllöä ei tavoitettu: ei ohilyöntiä, lomake auki.</summary>
        EiVastausta,
        /// <summary>Tehtävään on jo vastattu oikein (kortti näyttää lähetetyn sähkeen).</summary>
        JoVastattu,
    }

    /// <summary>Vastauksen tulos ja kortin päivitettävät rivit.</summary>
    public sealed class SahkeVastausTulos
    {
        public SahkeVastausLaji Laji;
        public List<SahkeAukko> Vaarat = new List<SahkeAukko>();
        /// <summary>Pöllön paluusähke (ohilyönti) tai pelaajalle näytettävä rivi (tyhjä, ei vastausta).</summary>
        public string Teksti;
        public int Ohi, Palkkio;
        /// <summary>Kahden ohilyönnin jälkeen Livian vinkki näkyy kortilla.</summary>
        public bool VinkkiNakyy;
    }

    /// <summary>Sähketehtäväkortin näytettävä tila (web piirraSahketehtava).</summary>
    public sealed class SahkeKortti
    {
        public string Otsikko = "Sähke", Hahmo;
        /// <summary>Sähkeen teksti riveinä kirjoitettavaksi (Aikataulu); lähetetyllä kuittaus.</summary>
        public string Sahke;
        public SahkeAikataulu Aikataulu;
        /// <summary>Kirjoitetaanko animoiden (kerran istunnossa per sähke; toisella avauksella valmiina).</summary>
        public bool Animoi;
        /// <summary>Livian kuplat (johdanto tai odotus), kerran istunnossa; muuten tyhjä.</summary>
        public List<string> Kuplat = new List<string>();
        /// <summary>Lomake: tosi = aukot, vapaa kenttä, pullat ja Lähetä/Myöhemmin; epätosi = vain "Selvä".</summary>
        public bool Lomake;
        public List<SahkeAukko> Aukot;
        /// <summary>Hakemiston valintalista (tyhjä, jos kutsuja ei antanut lähteitä).</summary>
        public List<string> Hakemisto = new List<string>();
        /// <summary>Edellisen ohilyönnin paluusähke tai null.</summary>
        public string ViimeSahke;
        /// <summary>Livian vinkki kahden ohilyönnin jälkeen (kuplat) tai null.</summary>
        public List<string> Vinkki;
        /// <summary>"Sähkeen palkkio nyt N puntaa. Jokainen ohilyönti pienentää sitä — mutta aarre ei lukitu koskaan."</summary>
        public string Maksurivi;
        public int Palkkio;
    }

    /// <summary>
    /// Sähketehtävien istunnon tila ja teot (web ui.sahkeOhi, sahkeVastattu, sahkeViimeSahke,
    /// sahkeKirjoitettu, sahkeSaateSanottu). Yksi olio per pelikerta (PeliOhjain; uusi peli = uusi olio).
    /// </summary>
    public sealed class SahketehtavaTila
    {
        readonly Dictionary<string, int> ohi = new Dictionary<string, int>();
        readonly HashSet<string> vastattu = new HashSet<string>();
        readonly HashSet<string> paljastettu = new HashSet<string>();
        readonly Dictionary<string, string> viimeSahke = new Dictionary<string, string>();
        readonly HashSet<string> kirjoitettu = new HashSet<string>();
        readonly HashSet<string> sanottu = new HashSet<string>();

        public int Ohi(string kaupunki) => ohi.TryGetValue(kaupunki ?? "", out var n) ? n : 0;
        public bool Vastattu(string kaupunki) => vastattu.Contains(kaupunki ?? "");
        /// <summary>Oikea vastaus annettu, mutta laatta ei ole vielä kääntynyt (Livia lennossa).</summary>
        public bool LentoKesken(string kaupunki) => Vastattu(kaupunki) && !paljastettu.Contains(kaupunki);

        /// <summary>Web sahkePalkkio(ohi, tehtava.palkkio ?? 200).</summary>
        public int Palkkio(Sahketehtava t, string kaupunki) => KauppaVakiot.SahkePalkkioOhilyonneista(Ohi(kaupunki), t.Palkkio);

        bool Kerran(HashSet<string> joukko, string avain) => joukko.Add(avain);

        /// <summary>
        /// Kortti vihreän pisteen napautuksesta (web piirraSahketehtava). <paramref name="hakemistonLahteet"/>
        /// = maan otsikot (SahkeTulkinta.Hakemisto järjestää); null = tyhjä lista (vain vapaa vastaus käy).
        /// </summary>
        public SahkeKortti Kortti(Sahketehtava t, IEnumerable<string> hakemistonLahteet = null)
        {
            var k = t.Kaupunki;
            if (Vastattu(k))
            {
                var aikataulu = SahkeTulkinta.KirjoitusAikataulu(t.Lahetetty, SahkeTulkinta.PaluuMerkkiMs, SahkeTulkinta.PaluuKattoMs, SahkeTulkinta.PaluuRivivaliMs);
                return new SahkeKortti
                {
                    Hahmo = t.Hahmo, Sahke = t.Lahetetty, Aikataulu = aikataulu, Animoi = Kerran(kirjoitettu, k + ":lahetetty"),
                    Kuplat = Kerran(sanottu, k + ":odotus") ? t.Odotus : new List<string>(),
                    Lomake = false,
                };
            }
            int n = Ohi(k), palkkio = Palkkio(t, k);
            return new SahkeKortti
            {
                Hahmo = t.Hahmo, Sahke = t.Sahke, Aikataulu = SahkeTulkinta.KirjoitusAikataulu(t.Sahke), Animoi = Kerran(kirjoitettu, k),
                Kuplat = Kerran(sanottu, k) ? t.Johdanto : new List<string>(),
                Lomake = true, Aukot = t.Aukot,
                Hakemisto = SahkeTulkinta.Hakemisto(hakemistonLahteet),
                ViimeSahke = n > 0 && viimeSahke.TryGetValue(k, out var v) ? v : null,
                Vinkki = n >= SahkeTulkinta.VinkkiOhi && t.Vinkki.Count > 0 ? t.Vinkki : null,
                Palkkio = palkkio,
                Maksurivi = $"Sähkeen palkkio nyt {palkkio} puntaa. Jokainen ohilyönti pienentää sitä — mutta aarre ei lukitu koskaan.",
            };
        }

        SahkeVastausTulos Tulos(Sahketehtava t, SahkeVastausLaji laji, string teksti = null, List<SahkeAukko> vaarat = null) => new SahkeVastausTulos
        {
            Laji = laji, Teksti = teksti, Vaarat = vaarat ?? new List<SahkeAukko>(), Ohi = Ohi(t.Kaupunki),
            Palkkio = Palkkio(t, t.Kaupunki), VinkkiNakyy = Ohi(t.Kaupunki) >= SahkeTulkinta.VinkkiOhi && t.Vinkki.Count > 0,
        };

        SahkeVastausTulos Osui(Sahketehtava t)
        {
            vastattu.Add(t.Kaupunki);
            return Tulos(t, SahkeVastausLaji.Osui, t.Vastaussahke);
        }

        SahkeVastausTulos Ohilyonti(Sahketehtava t, List<SahkeAukko> vaarat)
        {
            var sahke = SahkeTulkinta.OhilyonninSahke(t, vaarat);
            ohi[t.Kaupunki] = Ohi(t.Kaupunki) + 1;
            viimeSahke[t.Kaupunki] = sahke;
            return Tulos(t, SahkeVastausLaji.Ohi, sahke, vaarat);
        }

        /// <summary>"Lähetä sähke pöllölle": lomakkeen arvot aukon tunnuksella (valinnan otsikko tai numerokentän teksti).</summary>
        public SahkeVastausTulos Laheta(Sahketehtava t, IReadOnlyDictionary<string, string> arvot)
        {
            if (Vastattu(t.Kaupunki)) return Tulos(t, SahkeVastausLaji.JoVastattu);
            var vaarat = t.Aukot.Where(a => !SahkeTulkinta.AukkoOsuu(a, arvot != null && a.Id != null && arvot.TryGetValue(a.Id, out var x) ? (x ?? "").Trim() : "")).ToList();
            return vaarat.Count == 0 ? Osui(t) : Ohilyonti(t, vaarat);
        }

        /// <summary>"Lähetä omin sanoin": paikallinen tulkinta ilmaiseksi; ohi → Pollolle (vie teksti pöllölle).</summary>
        public SahkeVastausTulos LahetaVapaa(Sahketehtava t, string teksti)
        {
            if (Vastattu(t.Kaupunki)) return Tulos(t, SahkeVastausLaji.JoVastattu);
            var s = (teksti ?? "").Trim();
            if (s.Length == 0) return Tulos(t, SahkeVastausLaji.Tyhja, "Kirjoita ensin vastaus omin sanoin.");
            if (SahkeTulkinta.TulkitseVapaa(s, t).Osui) return Osui(t);
            return Tulos(t, SahkeVastausLaji.Pollolle);
        }

        /// <summary>
        /// Pöllön tuomio vapaasta vastauksesta (web kysySahketuomio → {kohde: bool, vuosi: bool}; avaimet aukon
        /// tunnuksia). null = pöllöä ei tavoitettu: ei ohilyöntiä.
        /// </summary>
        public SahkeVastausTulos PollonTuomio(Sahketehtava t, IReadOnlyDictionary<string, bool> tuomio)
        {
            if (Vastattu(t.Kaupunki)) return Tulos(t, SahkeVastausLaji.JoVastattu);
            if (tuomio == null) return Tulos(t, SahkeVastausLaji.EiVastausta, SahkeTulkinta.EiVastausta);
            var vaarat = t.Aukot.Where(a => !(a.Id != null && tuomio.TryGetValue(a.Id, out var b) && b)).ToList();
            return vaarat.Count == 0 ? Osui(t) : Ohilyonti(t, vaarat);
        }

        /// <summary>Kuittauskortin teksti oikean vastauksen jälkeen (web: Livian kuplat ja fakta kappaleina).</summary>
        public static string Kuittaus(Sahketehtava t) =>
            string.Join("\n\n", t.Oikein.Concat(new[] { t.Fakta }).Where(x => !string.IsNullOrEmpty(x)));

        /// <summary>Web aloitaSahkelento: Livia palaa vain, jos pelaaja on yhä kaupungissa ja laatta on siellä.</summary>
        public bool PaluuValmis(Matka m, string kaupunki) =>
            LentoKesken(kaupunki) && m.Tila.Pelaaja.Sijainti.Kaupungissa && m.Tila.Pelaaja.Sijainti.Kaupunki == kaupunki && m.LaattaTassa(kaupunki);

        /// <summary>
        /// Web paljastaSahkeAarre: laatta kääntyy sähkeen voimalla, palkkio ohilyönneistä
        /// (Kaupat.AvaaAarreSahkeella). Kutsu PeliOhjain.KauppaTeko-kääreen sisällä (tallennus, viesti).
        /// </summary>
        public KauppaTulos Paljasta(Kaupat kaupat, Sahketehtava t)
        {
            if (!Vastattu(t.Kaupunki)) return KauppaTulos.Epaonnistui("Sähkeeseen ei ole vastattu");
            if (!kaupat.Matka.LaattaTassa(t.Kaupunki)) { paljastettu.Add(t.Kaupunki); return KauppaTulos.Epaonnistui("Täällä ei ole laattaa"); }
            var tulos = kaupat.AvaaAarreSahkeella(t.Kaupunki, Palkkio(t, t.Kaupunki));
            if (tulos.Ok) paljastettu.Add(t.Kaupunki);
            return tulos;
        }

        /// <summary>Kokonainen pulla Livialle (50 £): Livian vinkki (web piirraSahkePullat).</summary>
        public static KauppaTulos OstaVinkki(Kaupat kaupat, Sahketehtava t) =>
            kaupat.PullaOstos(t.PullaAvain("vinkki"), KauppaVakiot.SahkePullaVinkkiHinta, "sai vinkin");

        /// <summary>Puolikas pulla (25 £): suora linkki vastaukseen (Sahketehtava.Vastauslinkki).</summary>
        public static KauppaTulos OstaLinkki(Kaupat kaupat, Sahketehtava t) =>
            kaupat.PullaOstos(t.PullaAvain("linkki"), KauppaVakiot.SahkePullaLinkkiHinta, "sai linkin");
    }
}
