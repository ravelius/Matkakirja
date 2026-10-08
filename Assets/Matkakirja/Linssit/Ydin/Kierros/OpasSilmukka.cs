// ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittaja; Linssiseppä): Sonnet valitsee paikat ja kirjoittaa kerronnan
// reaaliajassa Pulun workerissa (Pelikoodari), William puhuu, ja kamera lentää ajonaikaisesti mihin tahansa maapallolla.
// Pelaajan toive (Pulu-chatin syöttökenttä, iPhonen sanelu) keskeyttää. Tämä on moottoriton osa: kohteen kehystys, lento
// kahden asennon välillä (kaupungin sisällä kaarella, kauas isoympyrää pitkin ylhäältä) ja silmukan tila.
//
// SILMUKKA: Pyyda(ensimmäinen) → Odota → Lento → Saapuu (ääni alkaa; heti pyyntö seuraavasta = esihaku) → Puhuu → (ääni loppui
// ja seuraava valmis) → Lento → … Toive: keskeneräinen esihaku hylätään, puhe katkeaa ja pyydetään toiveen mukainen kohde.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    /// <summary>Workerin vastaus: yksi oppaan kohde (Pelikoodarin rajapinta /opas/seuraava).</summary>
    public sealed class OpasKohde
    {
        public string Id, Nimi, Alarivi, Teksti, Aani;
        /// <summary>PCM-virta (Pöllö, juna 145): raaka s16le mono AaniTaajuus Hz, chunked; ensimmäiset tavut ~0,3 s. null = vain mp3.</summary>
        public string AaniPcm;
        /// <summary>Sanakohtaiset ajat (Pelikoodari 7.10.: "aani_ajat" → {"sanat":[[merkki, alku, loppu],…]}, merkki näyttötekstiin);
        /// null = ei kohdistusta (yksityiskohtakuvat varapolulla).</summary>
        public string AaniAjat;
        /// <summary>Kohteen luokka workerilta (valinnainen, esim. katu, kanava, aukio, torni, kirkko, linnoitus, puisto); OpasKuvaus.Kehysta käyttää.</summary>
        public string Luokka;
        /// <summary>Kohteen korostus maassa (Pelikoodari #4018+, juna 145; valinnainen): piste, alue tai reitti.</summary>
        public OpasKorostus Korostus;
        /// <summary>Siltalauseiden ryhmät (Pelikoodari #4026, juna 146): vaihtoehtojen järjestyksessä, ja pelaajan toiveen ryhmä.</summary>
        public string[] VaihtoehtojenRyhmat;
        public string ToiveenRyhma;
        /// <summary>Pysähdys kuuluu Esittele kaupunki -kierrokseen: opas jatkaa itse vaihtoehdoista huolimatta (omistaja, TF 144).</summary>
        public bool Kierros;
        /// <summary>Kysy-napin kysymykset (worker, Sonnet valmiiksi pysähdyksen generoinnissa; omistaja 6.10. 11.57).</summary>
        public string[] Kysymykset;
        /// <summary>Workerin "odota"-vastaus: ei pysähdystä, odotetaan pelaajan valintaa.</summary>
        public bool Odota;
        /// <summary>Pelaajan kysymyksen vastaus (Esita): esihaku vasta vastauksen jälkeen (omistaja TF 152).</summary>
        public bool PelaajanVastaus;
        /// <summary>Pelaajan valintaa odottava pysähdys: vaihtoehtoja on, eikä se kuulu Esittele kaupunki -kierrokseen.</summary>
        public bool OdottaaValintaa => !Kysymys && !Kierros && Vaihtoehdot != null && Vaihtoehdot.Length > 0;
        public int AaniTaajuus = 24000;
        /// <summary>Äänen tunniste (PCM ensisijainen, muuten mp3); null = ei ääntä.</summary>
        public string AaniAvain => !string.IsNullOrEmpty(AaniPcm) ? AaniPcm : Aani;
        public double Lat, Lon, KokoM = 60, KorkeusM, KestoS;
        /// <summary>Workerin kysymys (tyyppi "kysymys"): opas kysyy ääneen, vaihtoehdot chattiin; ei sijaintia.</summary>
        public bool Kysymys;
        public string[] Vaihtoehdot;
        /// <summary>Pysähdyksen kuvat (Natiivi-UI 5.10.2026, omistaja 19.3x; Pelikoodarin worker "kuvat"): pieni kuvakortti.</summary>
        public OpasKuva[] Kuvat = Array.Empty<OpasKuva>();

        public static OpasKohde Lue(IDictionary<string, object> j)
        {
            if (j == null) return null;
            string S(string k) => j.TryGetValue(k, out var v) ? v as string : null;
            double D(string k, double o) => j.TryGetValue(k, out var v) && v != null ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : o;
            // Worker #4034+: "odota" = ei uutta pysähdystä ilman pelaajan valintaa (vanhojen buildien esihaku), ei virhe.
            if (S("tyyppi") == "odota") return new OpasKohde { Odota = true };
            if (S("tyyppi") == "kysymys")
            {
                var vaihtoehdot = new List<string>();
                if (j.TryGetValue("vaihtoehdot", out var vo) && vo is IList<object> lista) foreach (var x in lista) if (x is string t && t.Length > 0) vaihtoehdot.Add(t);
                return string.IsNullOrEmpty(S("teksti")) ? null : new OpasKohde { Kysymys = true, Teksti = S("teksti"), Aani = S("aani"), AaniPcm = S("aani_pcm"), AaniAjat = S("aani_ajat"), Luokka = S("luokka"),
                    AaniTaajuus = (int)D("aani_taajuus", 24000), KestoS = D("kesto_s", 0), Vaihtoehdot = vaihtoehdot.ToArray() };
            }
            var k = new OpasKohde
            {
                Id = S("id"), Nimi = S("nimi"), Alarivi = S("alarivi"), Teksti = S("teksti"), Aani = S("aani"), AaniPcm = S("aani_pcm"),
                AaniAjat = S("aani_ajat"), AaniTaajuus = (int)D("aani_taajuus", 24000),
                Lat = D("lat", double.NaN), Lon = D("lon", double.NaN), KokoM = D("koko_m", 60), KorkeusM = D("korkeus_m", 0), KestoS = D("kesto_s", 0),
            };
            if (j.TryGetValue("vaihtoehdot", out var pv) && pv is IList<object> pl)
            {
                var v = new List<string>();
                foreach (var x in pl) if (x is string t && t.Length > 0) v.Add(t);
                k.Vaihtoehdot = v.ToArray();
            }
            k.Kuvat = OpasKuva.Lue(j.TryGetValue("kuvat", out var ko) ? ko as IList<object> : null);
            k.Korostus = OpasKorostus.Lue(j.TryGetValue("korostus", out var kr) ? kr as Dictionary<string, object> : null);
            if (j.TryGetValue("vaihtoehtojen_ryhmat", out var vr) && vr is IList<object> vrl)
            {
                var ryhmat = new List<string>();
                foreach (var x in vrl) ryhmat.Add(x as string);
                k.VaihtoehtojenRyhmat = ryhmat.ToArray();
            }
            k.ToiveenRyhma = j.TryGetValue("toiveen_ryhma", out var tr) ? tr as string : null;
            k.Kierros = j.TryGetValue("kierros", out var ki) && (ki is IDictionary<string, object> || ki is bool kb && kb);   // {"numero", "maara"}
            if (j.TryGetValue("kysymykset", out var kq) && kq is IList<object> kql)
            {
                var kys = new List<string>();
                foreach (var x in kql) if (x is string t && !string.IsNullOrWhiteSpace(t)) kys.Add(t.Trim());
                k.Kysymykset = kys.ToArray();
            }
            if (string.IsNullOrEmpty(k.Nimi) || double.IsNaN(k.Lat) || double.IsNaN(k.Lon) || Math.Abs(k.Lat) > 90 || Math.Abs(k.Lon) > 180) return null;
            return k;
        }
    }

    /// <summary>Workerin kuva: {url, tyyppi valokuva|havainnekuva, tekija, lisenssi, lahde, selite}; url pakollinen.</summary>

    /// <summary>
    /// KOHTEEN KOROSTUS (Pelikoodari 5.10. 21.4x, juna 145): workerin "korostus": { "tyyppi": "piste"|"alue"|"reitti",
    /// "pisteet": [[lat, lon], …], "sade_m": 60 }. Piste ja alue: yksi keskipiste ja säde; reitti: 2–6 pistettä järjestyksessä
    /// (ei sädettä). Siirtoseppä piirtää (rengas tai viiva maahan). Virheellinen tai tyhjä → null.
    /// </summary>
    public sealed class OpasKorostus
    {
        public string Tyyppi;
        public (double lat, double lon)[] Pisteet;
        public double SadeM;
        public bool Reitti => Tyyppi == "reitti";

        public static OpasKorostus Lue(Dictionary<string, object> j)
        {
            if (j == null) return null;
            string tyyppi = j.TryGetValue("tyyppi", out var t) ? t as string : null;
            if (tyyppi != "piste" && tyyppi != "alue" && tyyppi != "reitti") return null;
            var pisteet = new List<(double, double)>();
            if (j.TryGetValue("pisteet", out var po) && po is IList<object> pl)
                foreach (var x in pl)
                {
                    if (!(x is IList<object> pari) || pari.Count < 2 || pari[0] == null || pari[1] == null) continue;
                    double la = Convert.ToDouble(pari[0], System.Globalization.CultureInfo.InvariantCulture);
                    double lo = Convert.ToDouble(pari[1], System.Globalization.CultureInfo.InvariantCulture);
                    if (Math.Abs(la) <= 90 && Math.Abs(lo) <= 180) pisteet.Add((la, lo));
                }
            if (pisteet.Count == 0 || (tyyppi == "reitti" && pisteet.Count < 2)) return null;
            double sade = j.TryGetValue("sade_m", out var so) && so != null ? Convert.ToDouble(so, System.Globalization.CultureInfo.InvariantCulture) : 0;
            return new OpasKorostus { Tyyppi = tyyppi, Pisteet = pisteet.ToArray(), SadeM = tyyppi == "reitti" ? 0 : Math.Max(0, sade) };
        }
    }

    public sealed class OpasKuva
    {
        public string Url, Tekija, Lisenssi, Lahde, Selite;
        public bool Havainnekuva;

        /// <summary>Tekijättömiä tai lisenssittömiä valokuvia hylätty (lokiin sovittimessa).</summary>
        public static int Hylatyt;
        /// <summary>Tekijätietoa ei vaadita: public domain tai CC0.</summary>
        static bool Vapaa(string lisenssi)
        {
            string l = lisenssi.Trim().ToLowerInvariant();
            return l == "pd" || l.StartsWith("pd-") || l.Contains("public domain") || l.Contains("cc0") || l.Contains("cc-zero");
        }

        public static OpasKuva[] Lue(IList<object> lista)
        {
            var tulos = new List<OpasKuva>();
            if (lista != null)
                foreach (var x in lista)
                {
                    if (!(x is IDictionary<string, object> j)) continue;
                    string S(string k) => j.TryGetValue(k, out var v) ? v as string : null;
                    string url = S("url");
                    if (string.IsNullOrEmpty(url) || !url.StartsWith("http", StringComparison.Ordinal)) continue;
                    var k = new OpasKuva { Url = url, Havainnekuva = S("tyyppi") == "havainnekuva", Tekija = S("tekija") ?? S("tekijä"),
                        Lisenssi = S("lisenssi"), Lahde = S("lahde") ?? S("lähde"), Selite = S("selite") };
                    // Valokuva ilman tekijää tai lisenssiä jätetään pois (CC BY vaatii tekijätiedon; Natiivi-UI 6.10.: Canal Granden
                    // kuvien lähderivi tyhjä). Havainnekuvat ovat omia, niille riittää url.
                    // Pelikoodari #4045: lisenssi aina; tekijä vaaditaan, paitsi vapaissa (PD, CC0).
                    if (!k.Havainnekuva && (string.IsNullOrWhiteSpace(k.Lisenssi) || string.IsNullOrWhiteSpace(k.Tekija) && !Vapaa(k.Lisenssi))) { Hylatyt++; continue; }
                    tulos.Add(k);
                }
            return tulos.ToArray();
        }
    }

    public enum OpasVaihe { Alku, Odottaa, Lentaa, Puhuu, Valmis }

    public sealed class OpasSilmukka
    {
        /// <summary>Kehystys: etäisyys = koko × kerroin + lisä (rajattuna), kallistus pystystä, katse nostetaan osuuteen korkeudesta.</summary>
        public const double KokoKerroin = 3.0, KokoLisaM = 150, EtaisyysMinM = 220, EtaisyysMaxM = 1600, Kallistus = 62, KatseOsuus = 0.45;
        /// <summary>Lennon kesto: kaupungissa per km, kauas logaritmisesti; rajat.</summary>
        public const double LentoMinS = 3.5, LentoMaxS = 14;
        /// <summary>Kertoja aloittaa kappaleen näin monta sekuntia ennen saapumista (nimi kuuluu, kun kamera laskeutuu).</summary>
        public const double PuheEnnenS = 5, PuheAikaisinS = 2;
        /// <summary>
        /// Kerronnan alku ennen lennon loppua: pitkillä lennoilla aiemmin, max(PuheEnnenS, kesto − PuheLennonAlkuS) (Päätoimittaja 8.10. ilta,
        /// PalloKaupungitTestit.PuheJaLento: ~15 s:n lennoilla hiljaisuus 8,3 s). Lennon alku (PuheLennonAlkuS) on lähtölauseen ja nousun aikaa.
        /// </summary>
        public static double PuheEnnen(double lentoKestoS) => Math.Max(PuheEnnenS, lentoKestoS - PuheLennonAlkuS);
        public const double PuheLennonAlkuS = 9;
        /// <summary>Lähdön laattaodotus käynnissä (s; 0 = ei odoteta): pallon odotusäänet (sovitin, PalloKori).</summary>
        public double LaattaOdotusS => LahtoValmisteilla ? lahtoOdotusS : 0;
        /// <summary>Avauksen liuku kaupungin ylle odottaessa ensimmäistä kohdetta (s; etäisyys × kerroin, kallistus +).</summary>
        public const double AlkuLiukuS = 14, AlkuLiukuKerroin = 0.5, AlkuLiukuKallistus = 8;
        /// <summary>Puheen jälkeen tauko ennen lentoa (s) ja kierto pysähdyksessä (°/s).</summary>
        public const double TaukoS = 0.4, KiertoAsteS = 0.6;
        /// <summary>Esihaun ja toiveen vastauksen enimmäisodotus (s), jonka jälkeen silmukka pyytää uudelleen.</summary>
        public const double VastausMaxS = 25;
        /// <summary>Saapumisen enimmäisodotus laattoja varten (s) lennon päätyttyä.</summary>
        public const double SaapumisOdotusS = 4;
        /// <summary>
        /// LÄHTÖ ODOTTAA LAATTOJA (Päätoimittaja 8.10. 07.4x, juna 164 -video: Île de la Citén korttelin kokoinen sumea laikku
        /// lennon alussa Notre-Damelta Louvreen, lähtö 87 %:ssa; avauksesta 1. kohteeseen 61 %:ssa; omistaja moitti sumeita laattoja
        /// jo TF 162:ssa): lähtö odottaa, kunnes seuraavan kohteen ja reitin laatat (esikamera + ReittiEsilataus-kamerat; latausaste
        /// kattaa kaikki kamerat) ovat ≥ LahtoValmis, kuitenkin enintään LahtoOdotusMaxS normaalin pysähdyksen yli, ettei kierros jumitu.
        /// Pelaajan ohitus (⏭) valmiiseen seuraavaan tai toive odottaa enintään LahtoPelaajaMaxS (painallukseen vastataan heti).
        /// </summary>
        public const double LahtoValmis = 0.98, LahtoOdotusMaxS = 5, LahtoPelaajaMaxS = 2;
        /// <summary>Reitin esilatausnäkymät lennon osuuksina (0 = lähtö, 1 = perillä; perillä on esikamera).</summary>
        public static readonly double[] ReittiNaytteet = { 0.15, 0.4, 0.65 };
        /// <summary>Latausaste kertoo uusien kameroiden laatoista vasta tämän jälkeen (video2 8.10. 07.5x: 1. lento lähti 61 %:ssa
        /// samassa ruudussa, jossa seuraava tuli — aste oli vielä edellisen näkymän 100 %).</summary>
        public const double LahtoMittausS = 0.5;
        OpasKohde seuraavaMitattu; double seuraavaIka;
        double lahtoOdotusS;
        bool ohitettu;
        /// <summary>
        /// KOHTEEN KOROSTUS (Päätoimittaja 8.10. 07.5x: kohteen valo sammui ja syttyi yhdessä ruudussa lähdössä): 0–1, häivytys
        /// KorostusS. Syttyy saapumisesta (Puhuu), sammuu lähdön valmistelussa ENNEN liikettä — lento alkaa vasta, kun korostus on
        /// sammunut (sovitin: yövalojen kohdevalo × osuus, rengas pois valmistelun alussa).
        /// </summary>
        public const double KorostusS = 1.0, KorostusPikaS = 0.4;
        /// <summary>Sammutus kertojan lopputauon aikana (LoppuTaukoS, kamera paikallaan) → automaattinen lähtö ei viivästy; pelaajan
        /// valinta tai lähtö odotustilasta sammuttaa KorostusPikaS:ssa (painallukseen vastataan heti).</summary>
        bool korostusPika;
        public double KorostusOsuus { get; private set; }
        /// <summary>Lähtö valmisteilla (ehdot täyttyivät; korostus sammuu, laatat latautuvat).</summary>
        public bool LahtoValmisteilla { get; private set; }
        /// <summary>Korostus kuuluu nykyiseen kohteeseen: perillä (Puhuu tai Odottaa kehyksessä), ei kysymys.</summary>
        bool KorostusKohteella => (Vaihe == OpasVaihe.Puhuu || Vaihe == OpasVaihe.Odottaa) && NykyinenKehys != null && Nykyinen != null && !Nykyinen.Kysymys;
        /// <summary>Viimeisimmän lähdön odotus laattoja varten (s; sovitin kirjaa lokiin).</summary>
        public double LahtoOdottiS { get; private set; }

        public OpasVaihe Vaihe { get; private set; } = OpasVaihe.Alku;
        public OpasKohde Nykyinen { get; private set; }
        public OpasKohde Seuraava { get; private set; }
        public Pysahdys NykyinenKehys { get; private set; }
        public Kuvakulma Asento { get; private set; }
        public double VaiheAika { get; private set; }
        public double LentoKestoS { get; private set; }
        /// <summary>Alkaneen lennon mittari (OpasKuvaus.Mittari): suurin kiihtyvyys m/s² ja suurin laskunopeus m/s; siirrossa (0, 0).</summary>
        public (double kiihtyvyys, double lasku) LentoMittari { get; private set; }
        /// <summary>Lähtevä pyyntö: toive (tai null) — sovitin lähettää workerille. Palauttaa pyynnön järjestysnumeron.</summary>
        public event Action<int, string> Pyyda;
        /// <summary>
        /// AVAUSKUVA (omistaja TF 144: "1. kohde näkyy vain tasaisena värilaattana"; toisto 6.10. 00.04: avauksessa 2–4 s tyhjää,
        /// laatat 0–24 %): avaus korkealta ja lähes ylhäältä, jolloin karkeat laatat näyttävät kaupungin heti eikä etualalla ole
        /// matalaa laattamassaa.
        /// </summary>
        public static Kuvakulma Avauskuva(double lat, double lon) => new Kuvakulma(lat, lon, AvausEtaisyysM, AvausKallistus, 40, 40);
        public const double AvausEtaisyysM = 5000, AvausKallistus = 25;

        /// <summary>Lento seuraavaan alkoi (kohde, matka m, pelaajan toiveesta): siltalause kierroksen siirtymään (juna 146).</summary>
        public event Action<OpasKohde, double, bool> LentoAlkaa;
        /// <summary>Avauksen laskeutumisessa kohde vaihtui arviosta lopulliseen kehykseen (sovittimen loki).</summary>
        public event Action<OpasKohde> LentoKohdeVaihtui;

        // ---- SALLITUT KAUPUNGIT (omistaja 7.10. 00.4x, juna 157): lennot ja workerin kohteet vain sallitun 3D:n alueelle ----
        /// <summary>Sallitut kaupungit (Pöllön /opas/aineistot "sallitut"); tyhjä = ei rajausta.</summary>
        public IReadOnlyList<OpasSallitut.Kaupunki> Sallitut = Array.Empty<OpasSallitut.Kaupunki>();
        /// <summary>Kohde torjuttiin (sallitun alueen ulkopuolella): nimi ja pelaajan pyynnöstä (vie minut, valinta, Liiku). Sovitin
        /// kirjaa ja soittaa pelaajan pyynnöstä siltalauseen "valitse kohde listasta" (Päätoimittaja 7.10. 01.0x); kierroksen
        /// esihaussa hiljaa.</summary>
        public event Action<string, bool> Torjuttu;
        public int Torjuntoja { get; private set; }
        int torjuntoja;
        bool Sallittu(double lat, double lon) => OpasSallitut.Sallittu(Sallitut, lat, lon);
        bool Torju(string nimi, double lat, double lon, bool pelaajalta = true)
        {
            if (Sallittu(lat, lon)) return false;
            Torjuntoja++; Torjuttu?.Invoke(nimi ?? $"{lat:F3}, {lon:F3}", pelaajalta);
            return true;
        }
        /// <summary>Saapui kohteeseen: sovitin aloittaa äänen ja näyttää nimen.</summary>
        public event Action<OpasKohde> Saapui;
        /// <summary>Kappale alkaa PuheEnnenS ennen saapumista (sovitin soittaa; Saapui ei enää aloita puhetta uudelleen).</summary>
        public event Action<OpasKohde> AlkaaPuhua;
        bool puheAloitettu;
        /// <summary>Puhe katkaistava (toive keskeytti).</summary>
        public event Action Hiljenna;
        /// <summary>Workerin kysymys: sovitin soittaa sen ja näyttää vaihtoehdot chatissa; vastaus tulee Toive-kutsuna.</summary>
        public event Action<OpasKohde> Kysyy;
        /// <summary>Kysymykseen ei vastattu: oma valinta tämän jälkeen (s puheen lopusta).</summary>
        public const double KysymysOdotusS = 8;
        /// <summary>Kysymys odottaa vastausta (esihakua ei tehdä).</summary>
        public bool OdottaaVastausta { get; private set; }
        double kysymysAika = -1;
        string kysymysOletus;

        readonly HashSet<string> nahdyt = new HashSet<string>(StringComparer.Ordinal);
        int pyynto, odotettu;
        double odotusAlku;
        /// <summary>Aika saapumisesta nykyiseen kehykseen (s); OpasKuvaus.Pysahdyksella laskee kierron ja dollyn.</summary>
        double kierto;
        bool aaniLoppui;
        Kuvakulma lahto;
        Pysahdys kohdeKehys;
        // MAASTON KORKEUS ENNEN NÄKYMÄÄ (simu 6.10. 12.42, juna 148: Prahan linna aukesi kermana — kehys oli 45 m:n arviolla,
        // Prahan maa ~290 m, kamera linnamäen sisällä): arvio korjataan näytteellä heti kun se tulee, ja siirto ei avaa näkymää
        // ennen näytettä (enintään SiirtoMaxS). Lennon aikana kohdekehys liukuu uuteen KehysVaihtoS:ssä (ei hyppyä).
        /// <summary>Maaston korkeus pisteessä (lat, lon → m ellipsoidista tai NaN); sovitin täyttää näytteistä.</summary>
        public Func<double, double, double> MaaPisteessa;
        /// <summary>Kohdekehyksen maa on arvio: sovitin aloittaa näytteen pisteeseen (lat, lon).</summary>
        public event Action<double, double> MaaTarvitaan;
        /// <summary>Kehyksen maa korjattiin näytteellä (arvio, näyte) — sovittimen loki.</summary>
        public event Action<double, double> KehysKorjattu;
        public const double MaaArvioM = 45, KehysVaihtoS = 1.0, SiirtoMaaOdotusS = 0.5, SiirtoMaatonEdistys = 0.9;
        bool kehysArvio; OpasKohde kehysKohde; double kehysTulo, kehysVaihto = 1, maaTunnettu = -10;
        Kuvakulma? kehysVanha;
        double kehysVaihtoS = KehysVaihtoS, maaPyydetty;
        /// <summary>
        /// AVAUKSEN LASKEUTUMINEN (omistaja 8.10. ~09.0x: "ei odoteta yläilmoissa vaan ladataan kumpikin näkymä etukäteen ja pallo
        /// laskeutuu rauhallisesti ensimmäiseen kohteeseen alkuesittelyn aikana"): yleiskuvasta (≥ AvausKorkeaM) lähtevä kierroksen
        /// aloituslento kestää vähintään AvausLaskuS, ja kun workerin vastaus tulee kesken lennon, kohde vaihtuu arviokehyksestä
        /// lopulliseen kehykseen AvausVaihtoS:n liu'ulla samassa lennossa (ei pysähdystä arviokehyksessä eikä toista lentoa).
        /// </summary>
        public const double AvausLaskuS = 18, AvausKorkeaM = 2000, AvausVaihtoS = 3;
        /// <summary>
        /// SUORA LASKEUTUMINEN AVAUSNÄKYMÄSTÄ (omistaja TF 168, 9.10.: "siirtymässä ei ole mitään hidasta kiihdytystä vaan vauhti
        /// alkaa ja loppuu melkein seinään"; PalloAvausTestit: zoomauspolulla avausnäkymän (1 100 m / 50°) ja kohteen välinen
        /// vaakaosuus kasautui lennon loppuun, silmä seisoi ensin ja syöksyi sitten 700 → 175 m kaartaen, kiihtyvyys 37 m/s²):
        /// kaupungin avauskehyksestä (ei kohdetta, alle AvausKorkeaM) lähtevä pallolento laskeutuu suoraan silmän ja katsepisteen
        /// janoja pitkin yhdellä S-käyrällä, ja kestää vähintään AvausSuoraS.
        /// </summary>
        public const double AvausSuoraS = 24;
        bool suoraLasku;

        void AsetaSuoraLasku()
        {
            suoraLasku = PalloLento && !siirto && NykyinenKehys != null && NykyinenKehys.Id == null && lahto.EtaisyysM < AvausKorkeaM
                && kohdeKehys != null && lahto.EtaisyysM > 1.5 * kohdeKehys.EtaisyysM;
            if (suoraLasku) LentoKestoS = Math.Max(LentoKestoS, AvausSuoraS);
        }

        /// <summary>Lennon kohdekehys on yhä maa-arviolla (ei näytettä).</summary>
        public bool KehysArviolla => kehysArvio && Vaihe == OpasVaihe.Lentaa;

        void AsetaKohdeKehys(Pysahdys p, bool arvio, OpasKohde k, double tulo)
        {
            kohdeKehys = p; kehysArvio = arvio; kehysKohde = k; kehysTulo = tulo;
            kehysVanha = null; kehysVaihto = 1; maaTunnettu = -10; kehysVaihtoS = KehysVaihtoS; maaPyydetty = 0;
            if (arvio) MaaTarvitaan?.Invoke(p.Lat, p.Lon);
        }

        /// <summary>Lentaa-vaihe: maa-arvio näytteellä heti kun se on saatavilla; true, kun kehys vaihtui.</summary>
        bool KorjaaKehyksenMaa(Func<OpasKohde, double> maaKorkeus)
        {
            if (!kehysArvio || kohdeKehys == null) return false;
            double m = kehysKohde != null ? (maaKorkeus?.Invoke(kehysKohde) ?? double.NaN) : double.NaN;
            if (double.IsNaN(m)) m = MaaPisteessa?.Invoke(kohdeKehys.Lat, kohdeKehys.Lon) ?? double.NaN;
            if (double.IsNaN(m)) return false;
            double arvio = kohdeKehys.MaaM;
            kehysVanha = KehysAsento(kohdeKehys, 0); kehysVaihto = 0;
            if (kehysKohde != null) kohdeKehys = OpasKuvaus.Kehysta(kehysKohde, m, kehysTulo);
            else kohdeKehys.MaaM = m;   // kaupungin yläkuva (oma olio)
            kehysArvio = false; maaTunnettu = VaiheAika;
            KehysKorjattu?.Invoke(arvio, m);
            return true;
        }

        /// <summary>Lennon kohdeasento; korjatun kehyksen vaihto liukuu KehysVaihtoS:ssä.</summary>
        Kuvakulma KohdeAsento()
        {
            var uusi = KehysAsento(kohdeKehys, 0);
            if (kehysVanha == null || kehysVaihto >= 1) return uusi;
            return KierrosLento.Valissa(kehysVanha.Value, uusi, KierrosLento.Smootherstep(kehysVaihto), 0);
        }
        string toive;

        public OpasSilmukka(Kuvakulma alku) { Asento = alku; }

        public IEnumerable<string> Nahdyt => nahdyt;

        /// <summary>Kehys kohteelle: katsesuunta tulosuunnasta (kamera jatkaa eteenpäin), maaston korkeus ellipsoidista.</summary>
        public static Pysahdys Kehysta(OpasKohde k, double maaM, double tulosuunta)
        {
            double et = Math.Max(EtaisyysMinM, Math.Min(EtaisyysMaxM, k.KokoM * KokoKerroin + KokoLisaM));
            double nosto = Math.Min(60, Math.Max(5, (k.KorkeusM > 0 ? k.KorkeusM : k.KokoM * 0.3) * KatseOsuus));
            return new Pysahdys
            {
                Id = k.Id ?? k.Nimi, Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = k.Teksti, Lat = k.Lat, Lon = k.Lon, MaaM = maaM, NostoM = nosto,
                Suuntima = KierrosLento.Kiedo(tulosuunta), Kallistus = Kallistus, EtaisyysM = et,
            };
        }

        /// <summary>Suuntima pisteestä a pisteeseen b (astetta pohjoisesta).</summary>
        public static double Suunta(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, f1 = lat1 * r, f2 = lat2 * r, dl = (lon2 - lon1) * r;
            double y = Math.Sin(dl) * Math.Cos(f2), x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Math.Atan2(y, x) / r;
        }

        /// <summary>
        /// Lennon kesto matkasta, jatkuvasti (omistaja 6.10. 23.4x: "lennon mitan sijaan tärkeämpää on, että kamera ei syöksy
        /// luonnottomasti … siirtymä voi olla nopeakin, varsinkin jos kohde on lähellä"): 300 m ≈ 4,2 s, 1 km ≈ 5,2 s, 4 km ≈ 7,4 s,
        /// 10 km = 10 s, sitten logaritmisesti enintään 14 s. Pehmeys tulee nopeusprofiilista (OpasKuvaus.Eteneminen).
        /// </summary>
        public static double LennonKesto(double matkaM)
        {
            double km = matkaM / 1000.0;
            double s = km < 10 ? 3.0 + 2.2 * Math.Sqrt(km) : 10.0 + 4.0 * Math.Log10(km / 10.0);
            if (!PalloLento) return Math.Max(LentoMinS, Math.Min(LentoMaxS, s));
            // Omistajan tarkennus 23.4x: "pallolla voi olla sama huippunopeus" → kesto kuten TF 163:ssa (PalloKerroin); pehmeys
            // tulee S-käyristä (OpasKuvaus.Lennossa: suunta etenemisen mukaan, ei kääntymistä paikallaan).
            return PalloProfiili(matkaM).kesto;
        }

        /// <summary>
        /// PALLON RAMPIT (Päätoimittaja 8.10. 07.5x: "lepo → huippunopeus 1–1,5 s … noin 3 s:n S-käyriksi, huippunopeus ennallaan"):
        /// kiihdytys ja jarrutus vähintään PalloRamppiS (smootherstep, OpasKuvaus.Eteneminen). Huippunopeus kuten TF 163:ssa
        /// (kesto × PalloKerroin, rampin osuus OpasKuvaus.RamppiOsuus), joten kesto pitenee rampin lisäyksen verran. Lyhyt lento:
        /// pelkkä S-käyrä (osuus 0,5), kesto vähintään 2 × PalloRamppiS ja huippu enintään entinen.
        /// </summary>
        // Omistaja TF 167 (9.10.): "kiihdyttää hitaammin automaattisissa siirtymissä" → rampit 6,5 → 9 s (huippunopeus ennallaan,
        // lento pitenee rampin lisäyksen verran; puhe alkaa yhä PuheEnnen ennen saapumista).
        public const double PalloRamppiS = 9.0;   // smootherstep: kulkunopeus 10 → 90 % ≥ 3 s (korkeuspainotus lyhentää ~10 %) (Päätoimittaja 08.3x: ≥ 3 s)
        public static (double kesto, double osuus) PalloProfiili(double matkaM)
        {
            double km = matkaM / 1000.0;
            double s = (km < 10 ? 3.0 + 2.2 * Math.Sqrt(km) : 10.0 + 4.0 * Math.Log10(km / 10.0)) * PalloKerroin(km);
            double t0 = Math.Max(LentoMinS, Math.Min(LentoMaxS * PalloKerroinLyhyt, s));
            double a0 = OpasKuvaus.RamppiOsuus(matkaM);
            double tasainen = t0 * (1 - a0);   // 1 / huippunopeus (lennon osuutta sekunnissa)
            if (a0 * t0 >= PalloRamppiS) return (t0, a0);
            if (tasainen >= PalloRamppiS) return (tasainen + PalloRamppiS, PalloRamppiS / (tasainen + PalloRamppiS));
            return (Math.Max(t0, 2 * PalloRamppiS), 0.5);   // lyhyt: pelkkä S-käyrä, rampit PalloRamppiS (huippu enintään entinen)
        }

        /// <summary>Pallolennon suunnan muutos enintään PalloKaantoAstS (Päätoimittaja 23.2x).</summary>
        public const double PalloKaantoAstS = 10;

        /// <summary>
        /// Pallolennon saapumissuunta: kohteen kehys katsoo enintään niin paljon nykyisestä suunnasta poispäin, että suunta kääntyy
        /// koko lennon ajan etenemisen mukana (huippu enintään 2 × keskiarvo) enintään PalloKaantoAstS asteen sekuntinopeudella.
        /// </summary>
        public static double PalloTulosuunta(double nykyinen, double lentosuunta, double kestoS)
        {
            // Kääntö vaakaliikkeen mukana: huippu ≈ 2 × keskiarvo (S-käyrä) × korkeussuhde (vaakanopeus ∝ korkeus, pitkillä lennoilla ≤ 1,6) → 3,2;
            // van Wijk–Nuij-polulla vaakaosuus kasautuu lennon keskelle, mitattu huippu 37 kaupungissa enintään 5,5 × keskiarvo
            // (PalloKaupungitTestit 8.10.: jakajalla 3,2 kääntö 14–16 °/s).
            double max = PalloKaantoAstS * kestoS / 5.5;
            double d = KierrosLento.Kiedo(lentosuunta - nykyinen);
            return KierrosLento.Kiedo(nykyinen + Math.Max(-max, Math.Min(max, d)));
        }

        // ---- KUUMAILMAPALLO (Päätoimittaja 7.10. 09.2x: "liike suhteellisen hidas kuin pallolla, mutta fysiikkaa saa venyttää, jotta
        // kaikki kiinnostavat kohteet ehditään nähdä (tuulta vastaan, nopeammin pitkillä väleillä)") ----
        /// <summary>Korinäkymä päällä (sovitin): lyhyet lennot hitaammin, pitkät lähes ennallaan.</summary>
        public static bool PalloLento;
        public const double PalloKerroinLyhyt = 1.6, PalloKerroinPitka = 1.15, PalloPitkaKm = 3.0;
        /// <summary>Lennon keston kerroin pallossa: 1,6 alle 0,5 km:n väleillä, liukuen 1,15:een 3 km:ssä ja sen yli.</summary>
        public static double PalloKerroin(double km)
        {
            double t = Math.Max(0, Math.Min(1, (km - 0.5) / (PalloPitkaKm - 0.5)));
            return PalloKerroinLyhyt + (PalloKerroinPitka - PalloKerroinLyhyt) * t;
        }

        /// <summary>Käynnistys: ensimmäinen pyyntö (alkutoive, esim. "Kööpenhamina").</summary>
        /// <summary>Pelaajan tauko: Paivita ei etene (ei lentoa, kiertoa eikä seuraavaa); sovitin pysäyttää äänet.</summary>
        public bool Tauolla;
        /// <summary>Ensimmäinen pyyntö on lähetetty (Aloita, toive tai paikan vaihto); täkyavauksessa vasta pelaajan valinnasta.</summary>
        public bool Aloitettu { get; private set; }

        public void Aloita(string alkutoive)
        {
            Aloitettu = true;
            toive = alkutoive;
            UusiPyynto();
        }

        /// <summary>Pelaajan toive: hylkää esihaun, katkaisee puheen ja pyytää toiveen mukaisen kohteen.</summary>
        public void Toive(string teksti)
        {
            if (string.IsNullOrWhiteSpace(teksti) || Vaihe == OpasVaihe.Valmis) return;
            PelaajaValitsi();
            toive = teksti.Trim(); toiveesta = true;
            KierrosKaynnissa = false;
            Seuraava = null;
            OdottaaVastausta = false; kysymysAika = -1; lykattyKysymys = null; esihakuPuheenJalkeen = false;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true;
            PelaajanPyynto();
        }

        /// <summary>
        /// Paikan vaihto koordinaatein (Natiivi-UI 6.10. 00.2x: Amsterdam valittu, kertoja kysyi siitä, mutta kamera jäi
        /// Kööpenhaminaan): kuten VaihdaPaikka, ja kamera lentää heti kaupungin yleiskuvaan (siirtymälento, ei puhetta), jossa
        /// se kiertää, kunnes workerin pysähdys tai pelaajan valinta vie eteenpäin.
        /// </summary>
        public void VaihdaPaikka(double lat, double lon, string nimi = null)
        {
            if (Torju(nimi, lat, lon)) return;
            VaihdaPaikka();
            if (Vaihe == OpasVaihe.Valmis || (!PakotaSiirto && KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, lat, lon) < SiirtymaMinM)) return;
            // Sama 5 km:n yläkuva kuin avauksessa (Päätoimittaja 6.10. 00.4x: Amsterdam laskeutui matalaan viistoon kuvaan).
            double maa = MaaPisteessa?.Invoke(lat, lon) ?? double.NaN;
            AsetaKohdeKehys(new Pysahdys { Lat = lat, Lon = lon, MaaM = double.IsNaN(maa) ? 0 : maa, NostoM = 0, Suuntima = KierrosLento.Kiedo(Suunta(Asento.Lat, Asento.Lon, lat, lon)),
                Kallistus = AvausKallistusOhitus ?? AvausKallistus, EtaisyysM = AvausEtaisyysOhitus ?? AvausEtaisyysM }, double.IsNaN(maa), null, 0);
            Ohjaus.Nollaa();
            lahto = Asento;
            double matka = KierrosLento.EtaisyysM(lahto.Lat, lahto.Lon, lat, lon);
            LentoKestoS = LennonKesto(matka);
            AloitaSiirtoJosKaukana(matka, lat, lon, nimi);
            Vaihe = OpasVaihe.Lentaa; VaiheAika = 0;
            puheAloitettu = true; siirtyma = true;
            UnohdaEdellinenKohde();
        }

        /// <summary>
        /// Kaupungin vaihdossa edellinen kohde ei ole enää "nykyinen" (simu 7.10. 07.08: basilikan kuvakortti ja nimilappu jäivät
        /// Varsovan yleiskuvaan, koska yleiskuva odottaa Nykyinen-kohteen kanssa). Odottamisen uusintapyyntö käyttää sitä silti
        /// kuten ennen (edellinen), joten pyyntörytmi ei muutu.
        /// </summary>
        void UnohdaEdellinenKohde()
        {
            if (Nykyinen == null) return;
            edellinen = Nykyinen; Nykyinen = null;
        }
        OpasKohde edellinen;

        /// <summary>
        /// Kaupungin vaihto suoraan kohteeseen (worker #4107, Pelikoodari 7.10.): kuten VaihdaPaikka, mutta yleiskuvan sijaan siirto
        /// vie kohteeseen ja workerin pysähdys pyydetään siitä (Liiku). Kohde sallitun alueen ulkopuolella torjutaan kuten Liiku.
        /// </summary>
        public void VaihdaPaikkaKohteeseen(string nimi, double lat, double lon)
        {
            if (Torju(nimi, lat, lon)) return;
            VaihdaPaikka();
            Liiku(nimi, lat, lon);
            if (Vaihe == OpasVaihe.Lentaa && siirto) UnohdaEdellinenKohde();
        }

        // ---- SIIRTO ILMAN LENTOA (omistaja 6.10. 12.0x) ----
        /// <summary>Kaupungin rajan arvio: tätä pidemmälle ei lennetä, vaan siirrytään latausruudun kautta.</summary>
        // SiirtoMaxS 12 (Päätoimittaja 8.10. 09.0x: peite pois vasta yleiskuva + 1. kohde ≥ 95 %, turvaraja ~12 s).
        // Juna 165 (lupa 09.2x): turvaraja 20 s, kun 1. kohde ladataan yleiskuvan jälkeen.
        public const double SiirtoRajaM = 30000, SiirtoValmis = 0.95, SiirtoMinS = 1.0, SiirtoMaxS = 20;
        /// <summary>Siirron 1. vaihe valmis: yleiskuva ≥ SiirtoValmis (vasta sitten 1. kohteen esilataus).</summary>
        public bool YleiskuvaValmis { get; private set; }
        double yleiskuvaAika;

        /// <summary>
        /// Workerin pyyntöjen sijainti (omistaja TF 152: natiivi lähetti Ateenalle, Amsterdamille, Pariisille ja Sydneylle Kööpenhaminan
        /// avauskuvan 55,679/12,576, koska liiku-lista haettiin ennen kuin kamera oli perillä): kamera, kun se on valitun kaupungin
        /// alueella (SiirtoRajaM keskustasta), muuten valitun kaupungin keskusta.
        /// </summary>
        public static (double lat, double lon) PyynnonPaikka(Kuvakulma asento, (double lat, double lon) keskusta) =>
            KierrosLento.EtaisyysM(asento.Lat, asento.Lon, keskusta.lat, keskusta.lon) <= SiirtoRajaM ? (asento.Lat, asento.Lon) : keskusta;
        bool siirto;
        /// <summary>UI: tumma ruutu "Siirrytään" + SiirtoNimi ja palkki SiirtoEdistys (0–1) niin kauan kuin Siirtymassa.</summary>
        public bool Siirtymassa => siirto && Vaihe == OpasVaihe.Lentaa;
        public string SiirtoNimi { get; private set; }
        public double SiirtoEdistys { get; private set; }
        /// <summary>Kohteen latausaste 0–1 (sovitin: Cesium-laatat kohdekamerassa); ilman sitä laatatValmiit.</summary>
        public Func<double> LatausEdistys;
        /// <summary>Siirto alkoi (sovitin siirtää georeferenssin origon heti kohteeseen).</summary>
        public event Action<double, double> SiirtoAlkaa;

        /// <summary>
        /// AVAUS ILMAN KARTTAA (omistaja 6.10. 14.2x, juna 149): ensimmäinen paikka avataan aina siirtoruudun kautta (kaupunkinäkymää
        /// ei ole vielä ladattu) matkasta riippumatta. Seuraava lento tai paikan vaihto kuluttaa lipun.
        /// </summary>
        public bool PakotaSiirto;

        void AloitaSiirtoJosKaukana(double matkaM, double lat, double lon, string nimi)
        {
            siirto = matkaM >= SiirtoRajaM || PakotaSiirto;
            PakotaSiirto = false; YleiskuvaValmis = false;
            if (!siirto) return;
            SiirtoNimi = nimi; SiirtoEdistys = 0;
            SiirtoAlkaa?.Invoke(lat, lon);
        }

        /// <summary>Kaupunkitilan avausnäkymässä ensimmäinen kohde näkyy kuvan alakolmanneksessa: katsepiste on näin monta
        /// osuutta etäisyydestä kohteen takana katsesuunnassa (1,1 km / 50°, pystykenttä ~40°: kohde ~1/6 kuvan korkeudesta keskeltä alas).</summary>
        public const double AvausKatseEteenOsuus = 0.18;

        /// <summary>
        /// Kaupunkitila (omistaja TF 162, Rooma kartan pallosta: "kohde on liian kaukana"; Päätoimittaja 22.4x: avausnäkymä
        /// puoliväliin, ei lähikuvaa, koska avausteksti kuvaa kaupunkia ylhäältä): kun esityksen ensimmäinen kohde selviää vielä
        /// siirtoruudun aikana, avausnäkymän kehys (etäisyys ja kallistus ennallaan, AvausEtaisyysOhitus/AvausKallistusOhitus)
        /// katsoo kohti kohdetta niin, että se on kuvan alakolmanneksessa ja vanha kaupunki ympärillä. Kierroksen alku lentää
        /// tästä pehmeästi kohteen kehykseen. Ruudun alla, joten ei liukua; true = kohdistettiin.
        /// </summary>
        public bool KohdistaAvausKohteeseen(string nimi, double lat, double lon)
        {
            if (!Siirtymassa || !siirtyma || kohdeKehys == null) return false;
            double et = kohdeKehys.EtaisyysM, suunta = kohdeKehys.Suuntima * Math.PI / 180, d = AvausKatseEteenOsuus * et;
            double kLat = lat + d * Math.Cos(suunta) / 111320.0;
            double kLon = lon + d * Math.Sin(suunta) / (111320.0 * Math.Cos(lat * Math.PI / 180));
            double maa = MaaPisteessa?.Invoke(kLat, kLon) ?? double.NaN;
            AsetaKohdeKehys(new Pysahdys { Lat = kLat, Lon = kLon, MaaM = double.IsNaN(maa) ? 0 : maa, NostoM = 0, Suuntima = kohdeKehys.Suuntima,
                Kallistus = kohdeKehys.Kallistus, EtaisyysM = et }, double.IsNaN(maa), null, 0);
            Asento = KehysAsento(kohdeKehys, 0);
            return true;
        }

        // ---- KYSY, LIIKU, KAUPUNKIKIERROS, KESKUSTELU (omistaja 6.10. 11.57) ----
        /// <summary>Kaupunkikierros käynnissä (Liiku-listan alin rivi): kohteet jonossa, opas jatkaa itse lyhyellä kerronnalla.</summary>
        public bool KierrosKaynnissa { get; private set; }
        /// <summary>Kierroksen nykyinen pyyntö (numero 1…, määrä) workerille; (0, 0) muuten.</summary>
        public (int numero, int maara) KierrosTieto { get; private set; }
        /// <summary>Seuraavan pyynnön sijainti (Liiku ja kierros): sovitin lähettää sen workerille kaupungin keskipisteen sijaan.</summary>
        public (double lat, double lon)? PyynnonSijainti;
        readonly List<(string nimi, double lat, double lon)> kierrosJono = new List<(string, double, double)>();
        int kierrosIndeksi;
        /// <summary>Kierroksen kohteet järjestyksessä (metrokartta, Pariisi-kokeilu 7.10.): tyhjä, kun kierros ei ole käynnissä.</summary>
        public IReadOnlyList<(string nimi, double lat, double lon)> KierrosJono => kierrosJono;
        /// <summary>Nykyisen (viimeksi pyydetyn) kierroskohteen indeksi 0…; −1 = ei kierrosta.</summary>
        public int KierrosNykyinen
        {
            get
            {
                if (!KierrosKaynnissa && !KierrosKeskeytetty) return -1;
                // Simu 7.10. 10.50: esihaku kasvattaa indeksiä jo kerronnan aikana (metro näytti seuraavaa) → nykyinen kohteen mukaan.
                var n = Nykyinen;
                if (n != null)
                    for (int i = 0; i < kierrosJono.Count; i++)
                        if (string.Equals(kierrosJono[i].nimi, n.Nimi, StringComparison.OrdinalIgnoreCase)
                            || KierrosLento.EtaisyysM(kierrosJono[i].lat, kierrosJono[i].lon, n.Lat, n.Lon) < 80) return i;
                return Math.Max(0, kierrosIndeksi - 1);
            }
        }

        /// <summary>Liiku-listan kohde: lento heti kohteeseen (kaukana siirto), ja workerin pysähdys kohteesta pyydetään samalla.</summary>
        public void Liiku(string nimi, double lat, double lon)
        {
            KierrosKaynnissa = false;
            LiikuSisainen(nimi, lat, lon);
        }

        void LiikuSisainen(string nimi, double lat, double lon)
        {
            if (string.IsNullOrWhiteSpace(nimi) || Vaihe == OpasVaihe.Valmis) return;
            if (Torju(nimi, lat, lon)) return;
            PyynnonSijainti = (lat, lon);
            bool kierros = KierrosKaynnissa;
            Toive(nimi);
            KierrosKaynnissa = kierros;   // Toive keskeyttää kierroksen; kierroksen oma siirto ei
            if (!PakotaSiirto && KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, lat, lon) < 150) return;
            var arvio = new OpasKohde { Nimi = nimi, Lat = lat, Lon = lon, KokoM = 120 };
            double maa = MaaPisteessa?.Invoke(lat, lon) ?? double.NaN, tulo = PalloLento ? LennonSuunta(lat, lon) : Suunta(Asento.Lat, Asento.Lon, lat, lon);
            if (PalloLento)
            {
                // Pallo: arviokehyksen suunta kääntörajan sisällä (PalloKaupungitTestit: avauksen laskeutuminen kääntyi 190°, 36 °/s).
                double m0 = KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, lat, lon), t0 = LennonKesto(m0);
                if (KierrosKaynnissa && Asento.EtaisyysM >= AvausKorkeaM) t0 = Math.Max(t0, AvausLaskuS);
                tulo = PalloTulosuunta(Asento.Suuntima - OpasKuvaus.SivuKulma, tulo, t0);
            }
            AsetaKohdeKehys(OpasKuvaus.Kehysta(arvio, double.IsNaN(maa) ? MaaArvioM : maa, tulo), double.IsNaN(maa), arvio, tulo);
            Ohjaus.Nollaa();
            lahto = Asento;
            double matka = KierrosLento.EtaisyysM(lahto.Lat, lahto.Lon, lat, lon);
            LentoKestoS = LennonKesto(matka);
            if (KierrosKaynnissa && lahto.EtaisyysM >= AvausKorkeaM) LentoKestoS = Math.Max(LentoKestoS, AvausLaskuS);   // avauksen laskeutuminen
            AloitaSiirtoJosKaukana(matka, lat, lon, nimi);
            AsetaSuoraLasku();
            Vaihe = OpasVaihe.Lentaa; VaiheAika = 0;
            puheAloitettu = true; siirtyma = true;   // perillä odotetaan workerin pysähdystä (sama paikka → kerronta heti)
        }

        /// <summary>Siirtoruudun jälkeen näkymä on auki näin kauan ennen kertojaa (omistaja 6.10. 16.5x: ~1,3 s).</summary>
        // Päätoimittaja 7.10. 22.5x, mitattu BUILD 163 (linssi → Pariisi): latausikkuna häipyy 1,1 s siirron jälkeen
        // (mk-astroavaus--haipyy), ja puhe alkoi 1,3 s:n tauolla vain 0,16 s sen jälkeen → tavoite ≥ 1 s näkymän auettua: 1,1 + 1,2.
        public const double AvausTaukoS = 2.3;
        /// <summary>Siirron jälkeinen avaustauko käynnissä (latausikkuna häipyy, puhe ei vielä ala).</summary>
        public bool AvausTauolla => avausViive > 0;
        double avausViive;

        // ---- KIERROKSEN KESKEYTYS, JATKO JA LOPETUS (omistaja TF 149, Päätoimittaja 16.3x/16.4x, juna 151) ----
        /// <summary>Kysymys keskeytti kierroksen: kamera pysähtyy paikalleen, kertoja vaikenee, ja jono odottaa JatkaKierrosta-kutsua.</summary>
        public bool KierrosKeskeytetty { get; private set; }
        /// <summary>Lopeta kierros (■): ei jonoa eikä workerin omia pysähdyksiä; kamera paikallaan (Linssiseppä 2:n vapaa ohjaus).</summary>
        public bool VapaaTila { get; private set; }
        /// <summary>Automaattiset pyynnöt seis (keskeytetty kierros tai vapaa tila); kysymykset ja pelaajan valinnat toimivat.</summary>
        bool Pysaytetty => KierrosKeskeytetty || VapaaTila;
        OpasKohde jatkoKohde;
        /// <summary>Keskeytetyn kierroksen kesken jäänyt kohde (luetaan JATKA:ssa alusta); sovitin pitää sen äänen tallessa.</summary>
        public OpasKohde JatkoKohde => jatkoKohde;
        (int, int) keskeytysTieto;

        /// <summary>Kamera jää nykyiseen asentoon (lento keskeytyy): uusi kehys tähän, kierto jatkuu tästä.</summary>
        void PysahdyTahan()
        {
            if (Vaihe != OpasVaihe.Lentaa) return;
            NykyinenKehys = new Pysahdys { Lat = Asento.Lat, Lon = Asento.Lon, MaaM = Asento.KatseKorkeusM, NostoM = 0, Suuntima = Asento.Suuntima,
                Kallistus = Asento.Kallistus, EtaisyysM = Asento.EtaisyysM, Id = Nykyinen?.Id, Nimi = Nykyinen?.Nimi };
            kierto = 0; siirto = false; siirtyma = false; avausViive = 0;
            Vaihe = OpasVaihe.Odottaa; VaiheAika = 0;
        }

        /// <summary>Pelaajan kysymys kierroksella: kierros pysähtyy (kesken jäänyt kohde luetaan jatkossa alusta). true = keskeytettiin.</summary>
        public bool KeskeytaKierros()
        {
            if (!KierrosKaynnissa || Vaihe == OpasVaihe.Valmis) return false;
            bool kesken = Vaihe == OpasVaihe.Lentaa || (Vaihe == OpasVaihe.Puhuu && !aaniLoppui);
            jatkoKohde = kesken ? Nykyinen : null;   // luettu loppuun → seuraava pyydetään jatkossa uudelleen
            if (Seuraava != null || odotettu != 0) kierrosIndeksi = Math.Max(0, kierrosIndeksi - 1);   // esihaettu tai pyynnössä: uudelleen
            keskeytysTieto = KierrosTieto;
            PysahdyTahan();
            Seuraava = null; odotettu = 0; OdottaaVastausta = false; kysymysAika = -1; lykattyKysymys = null; esihakuPuheenJalkeen = false;
            KierrosKaynnissa = false; KierrosKeskeytetty = true;
            aaniLoppui = true;
            Hiljenna?.Invoke();
            return true;
        }

        /// <summary>
        /// "KERRO LISÄÄ" kierroksella (omistaja 7.10. 10.3x, yksi esitys): kierros keskeytyy kuten kysymyksessä, nykyisestä kohteesta
        /// pyydetään pidempi teksti (PitkaPyynto: ei kierroksen lyhyt-kenttää), ja JATKA jatkaa seuraavasta (lyhyttä ei toisteta).
        /// Kierroksen ulkopuolella tavallinen toive. true = otettu.
        /// </summary>
        public bool KerroLisaa(string teksti = "kerro lisää")
        {
            if (Vaihe == OpasVaihe.Valmis) return false;
            if (!KierrosKaynnissa && !KierrosKeskeytetty) { Toive(teksti); return true; }
            if (KierrosKaynnissa) KeskeytaKierros();
            var kt = keskeytysTieto;
            Toive(teksti);
            KierrosKeskeytetty = true; keskeytysTieto = kt; jatkoKohde = null;
            PitkaPyynto = true;
            return true;
        }
        /// <summary>Kierroksen keskeytys ilman kesken jääneen kohteen toistoa (valmis "Kerro lisää" esitetään paikalla; JATKA seuraavasta).</summary>
        public bool KeskeytaKierrosOhittaen()
        {
            bool ok = KierrosKaynnissa ? KeskeytaKierros() : KierrosKeskeytetty;
            jatkoKohde = null;
            return ok;
        }

        /// <summary>Seuraava pyyntö ilman kierroksen lyhyt-merkintää (sovitin kuluttaa).</summary>
        public bool PitkaPyynto;

        /// <summary>
        /// Kaupunkitilan automaattinen jatko kysymyksen vastauksen jälkeen (OpasSovitin): vasta kun vastaus on kuultu — kierros
        /// keskeytetty, opas odottaa yli viiveen, mikään ääni ei soi, vastaus ei odota esitystä (Seuraava) eikä kysymyksen odotus
        /// ole käynnissä. TF 166: vastaus tuli 4 s:ssa Odottaa-vaiheen jo kestäessä → jatko laukesi ennen vastausta.
        /// </summary>
        public static bool JatkoVastauksenJalkeen(bool keskeytetty, OpasVaihe vaihe, double vaiheAika, double viiveS, bool aaniSoi, bool vastausOdottaa, bool kysymysOdottaa) =>
            keskeytetty && vaihe == OpasVaihe.Odottaa && vaiheAika > viiveS && !aaniSoi && !vastausOdottaa && !kysymysOdottaa;

        /// <summary>JATKA KIERROSTA: kesken jäänyt kohde alusta, muuten seuraava jonosta. true = jatkui.</summary>
        public bool JatkaKierrosta()
        {
            if (!KierrosKeskeytetty || Vaihe == OpasVaihe.Valmis) return false;
            KierrosKeskeytetty = false; KierrosKaynnissa = true; KierrosTieto = keskeytysTieto;
            Seuraava = null; odotettu = 0; OdottaaVastausta = false; toiveesta = false;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true; hiljaS = double.MaxValue;
            if (jatkoKohde != null) { Seuraava = jatkoKohde; jatkoKohde = null; }
            else UusiPyynto();   // KierrosPyynto: seuraava jonosta (tai kierros päättyy)
            return true;
        }

        /// <summary>LOPETA KIERROS (■): kierros päättyy, kertoja vaikenee, kamera jää paikalleen vapaaseen tilaan.</summary>
        public void LopetaKierros()
        {
            if (Vaihe == OpasVaihe.Valmis) return;
            KierrosKaynnissa = false; KierrosKeskeytetty = false; KierrosTieto = (0, 0);
            kierrosJono.Clear(); kierrosIndeksi = 0; jatkoKohde = null;
            PysahdyTahan();
            Seuraava = null; odotettu = 0; OdottaaVastausta = false; kysymysAika = -1; lykattyKysymys = null; esihakuPuheenJalkeen = false;
            aaniLoppui = true;
            VapaaTila = true;
            Hiljenna?.Invoke();
        }

        /// <summary>Kysymyksen vastauksen siirto (toiminto siirry/kohde): liike kuten Liiku, mutta keskeytetty kierros ja vapaa tila
        /// säilyvät (simu 6.10. 17.1x: "mitä täällä järjestettiin" → siirry samaan kohteeseen päätti kierroksen eikä JATKA tullut).</summary>
        public void LiikuVastauksesta(string nimi, double lat, double lon)
        {
            bool kesk = KierrosKeskeytetty, vapaa = VapaaTila; var jk = jatkoKohde; var kt = keskeytysTieto;
            Liiku(nimi, lat, lon);
            KierrosKeskeytetty = kesk; VapaaTila = vapaa; jatkoKohde = jk; keskeytysTieto = kt;
        }

        // ---- SEURAAVA (›|; omistaja 6.10. 23.3x "seuraava nappi, jolla nykyisen kohteen voisi ohittaa", juna 156) ----
        /// <summary>Seuraava-nappi käytettävissä: opas käynnissä eikä siirtoruutu.</summary>
        public bool SeuraavaKaytettavissa => Vaihe != OpasVaihe.Valmis && Aloitettu && !Siirtymassa && !Luovutti;

        /// <summary>
        /// Ohittaa nykyisen kohteen: kertoja vaikenee ja opas siirtyy seuraavaan (esihaettu heti; muuten pyyntö ja lento, kun vastaus
        /// tulee). Kierroksella seuraava jonosta; keskeytetty kierros jatkuu seuraavasta (kesken jäänyttä ei lueta); vapaasta tilasta
        /// palataan oppaan omiin kohteisiin. Lennon aikana kamera pysähtyy ja lento suuntautuu seuraavaan. true = ohitettiin.
        /// </summary>
        public bool OhitaKohde()
        {
            if (!SeuraavaKaytettavissa) return false;
            if (KierrosKeskeytetty) { KierrosKeskeytetty = false; KierrosKaynnissa = true; KierrosTieto = keskeytysTieto; jatkoKohde = null; }
            VapaaTila = false; vapaaKehyksessa = false;
            lykattyKysymys = null; esihakuPuheenJalkeen = false; OdottaaVastausta = false; kysymysAika = -1;
            if (Vaihe == OpasVaihe.Puhuu || (puheAloitettu && !aaniLoppui)) Hiljenna?.Invoke();
            aaniLoppui = true; hiljaS = double.MaxValue;
            // Seuraava jo valmiina → pelaaja odottaa välitöntä lähtöä: laatoille enintään LahtoPelaajaMaxS. Ilman sitä (kierroksen
            // aloitus avauksesta, workerin vastaus) täysi LahtoOdotusMaxS kuten automaattisessa lähdössä.
            ohitettu = Seuraava != null;
            if (Vaihe == OpasVaihe.Lentaa) PysahdyTahan();
            if (Seuraava == null && odotettu == 0) UusiPyynto();   // kierros: jonosta; muuten workerin seuraava
            return true;
        }

        /// <summary>Pelaajan oma suunta (toive, Liiku, paikan vaihto, uusi kierros): vanha kierros ja vapaa tila päättyvät.</summary>
        void PelaajaValitsi() { KierrosKeskeytetty = false; jatkoKohde = null; VapaaTila = false; lykattyKysymys = null; esihakuPuheenJalkeen = false; }

        /// <summary>Kaupunkikierros: kohteet järjestyksessä; ensimmäiseen heti, seuraava esihaetaan kerronnan aikana.</summary>
        public void AloitaKierros(IList<(string nimi, double lat, double lon)> kohteet)
        {
            if (kohteet == null || kohteet.Count == 0 || Vaihe == OpasVaihe.Valmis) return;
            PyynnotSeis = false; EsiKohde = null;
            PelaajaValitsi();
            kierrosJono.Clear(); kierrosJono.AddRange(kohteet);
            kierrosIndeksi = 0;
            KierrosKaynnissa = true;
            var e = kierrosJono[kierrosIndeksi++];
            KierrosTieto = (1, kierrosJono.Count);
            LiikuSisainen(e.nimi, e.lat, e.lon);
        }

        /// <summary>
        /// Keskustelun vastaus tai toiminnon kohde (Kysy, mikki, näppäimistö): esitetään seuraavaksi. Samassa paikassa (alle 50 m)
        /// kappale alkaa heti, muualle lento tai siirto. Pelaajan toiminto: kierros ja odottava pyyntö keskeytyvät.
        /// </summary>
        public void Esita(OpasKohde k)
        {
            if (k == null || Vaihe == OpasVaihe.Valmis) return;
            KierrosKaynnissa = false; KierrosTieto = (0, 0);
            k.PelaajanVastaus = true;
            odotettu = 0; Seuraava = k;
            OdottaaVastausta = false; kysymysAika = -1; lykattyKysymys = null; esihakuPuheenJalkeen = false;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true; toiveesta = true;
        }

        /// <summary>Kierroksen esihaku: seuraava jonosta (lyhyt kerronta); jonon lopussa kierros päättyy eikä pyyntöä tehdä.</summary>
        bool KierrosPyynto()
        {
            if (!KierrosKaynnissa) return false;
            if (kierrosIndeksi >= kierrosJono.Count) { KierrosKaynnissa = false; KierrosTieto = (0, 0); return true; }
            var e = kierrosJono[kierrosIndeksi++];
            KierrosTieto = (kierrosIndeksi, kierrosJono.Count);
            toive = e.nimi; PyynnonSijainti = (e.lat, e.lon);
            odotettuPaikka = (e.lat, e.lon);   // esilataus heti jonon paikasta, ei vasta workerin vastauksesta (juna 156)
            return false;
        }
        public const double SiirtymaMinM = 5000;
        bool siirtyma;

        /// <summary>Paikan vaihto valikosta (Natiivi-UI OpasValikko): kuten toive ilman tekstiä, nähdyt tyhjennetään.</summary>
        public void VaihdaPaikka()
        {
            if (Vaihe == OpasVaihe.Valmis) return;
            PelaajaValitsi();
            KierrosKaynnissa = false; KierrosTieto = (0, 0);
            nahdyt.Clear();
            toive = null; toiveesta = true;
            Seuraava = null;
            OdottaaVastausta = false; kysymysAika = -1; lykattyKysymys = null; esihakuPuheenJalkeen = false;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true;
            PelaajanPyynto();
        }

        /// <summary>Pelaajan toiminta: luovutus puretaan (uusi yritys), mutta kesken oleva virhetauko odotetaan loppuun.</summary>
        void PelaajanPyynto()
        {
            Aloitettu = true;
            Luovutti = false; Virheita = 0;
            if (VirheTauko > 0) { odotettu = 0; virhe = true; return; }
            UusiPyynto();
        }

        /// <summary>Esityksen avaus ja opastus soivat (sovitin): ei workerin pyyntöjä ennen kierrosta (kaupungin kysymys ei saa
        /// soida avauksen päälle). Kierroksen aloitus (AloitaKierros) purkaa.</summary>
        public bool PyynnotSeis;

        void UusiPyynto()
        {
            if (PyynnotSeis) return;
            lykattyKysymys = null; esihakuPuheenJalkeen = false;   // uusi pyyntö korvaa puheen aikana tulleen kysymyksen
            odotettuPaikka = null;
            if (toive == null && KierrosPyynto()) return;   // kierros päättyi: ei uutta pysähdystä
            pyynto++;
            odotettu = pyynto;
            odotusAlku = -1;
            Pyyda?.Invoke(pyynto, toive);
            toive = null;
        }

        /// <summary>
        /// VIRHETAUKO (Natiivi-UI 5.10. iPad: 429 → 9 800 pyyntöä 6 minuutissa): virheen jälkeen uusi pyyntö vasta tauon päästä,
        /// tauko kaksinkertaistuu (2, 4, 8 … enintään 60 s); VirheitaMax peräkkäisen virheen jälkeen opas luovuttaa (Luovutti).
        /// Onnistunut vastaus nollaa laskurin.
        /// </summary>
        public const double VirheTaukoAlkuS = 2, VirheTaukoMaxS = 60;
        public const int VirheitaMax = 5;
        /// <summary>Peräkkäiset virheet, viimeisen virheen HTTP-koodi (0 = aikakatkaisu tai verkko) ja jäljellä oleva tauko (s).</summary>
        public int Virheita { get; private set; }
        public int ViimeKoodi { get; private set; }
        public double VirheTauko { get; private set; }
        /// <summary>Worker ei vastaa (VirheitaMax peräkkäistä virhettä): sovitin sulkee linssin viestillä.</summary>
        public bool Luovutti { get; private set; }
        /// <summary>Opas lepää (virhe ja tauko kesken).</summary>
        public bool Lepaa => VirheTauko > 0;
        public static double Tauko(int virheita) => Math.Min(VirheTaukoMaxS, VirheTaukoAlkuS * Math.Pow(2, Math.Max(0, virheita - 1)));

        /// <summary>Virhe (HTTP-koodi; 0 = verkko tai aikakatkaisu). odotaS = palvelimen Retry-After (s, 0 = ei annettu): tauko on
        /// suurempi niistä; jos Retry-After ylittää VirheTaukoMaxS (esim. 429 päiväraja klo 03 asti), opas luovuttaa heti.
        /// Luovutuksen jälkeen ei pyydetä mitään ennen pelaajan toimintaa (Toive, Vastaus kysymykseen tai uusi avaus).</summary>
        void Virhe(int koodi, double odotaS)
        {
            Virheita++; ViimeKoodi = koodi;
            if (Virheita >= VirheitaMax || odotaS > VirheTaukoMaxS) { Luovutti = true; VirheTauko = 0; virhe = false; return; }
            VirheTauko = Math.Min(VirheTaukoMaxS, Math.Max(Tauko(Virheita), odotaS));
            virhe = true;
        }

        /// <summary>Workerin vastaus pyyntöön n (vanhat hylätään). null = virhe (koodi = HTTP-tila, 0 = verkko/aikakatkaisu):
        /// pyydetään uudelleen virhetauon jälkeen.</summary>
        public void Vastaus(int n, OpasKohde k, int koodi = 0, double odotaS = 0)
        {
            if (n != odotettu) return;
            odotettu = 0;
            if (k == null) { Virhe(koodi, odotaS); return; }
            Virheita = 0; VirheTauko = 0; ViimeKoodi = 0;
            if (k.Odota) return;
            // Sallitun alueen ulkopuolinen pysähdys torjutaan (worker suodattaa myös); kaksi uutta yritystä peräkkäin, sitten odotetaan.
            if (!k.Kysymys && Torju(k.Nimi, k.Lat, k.Lon, toiveesta))
            {
                // Pelaajan toive (vie minut X) ulkona: ei lentoa eikä uutta pyyntöä, siltalause ohjaa listaan.
                if (toiveesta) { toiveesta = false; return; }
                if (++torjuntoja <= 2) UusiPyynto();
                return;
            }
            torjuntoja = 0;
            if (KierrosKaynnissa) k.Kierros = true;
            if (k.Kysymys)
            {
                // Kysymys ei liikuta kameraa: opas kysyy, ja pelaajan valinta (chat) tulee Toive-kutsuna.
                // Omistaja (TF 144): opas odottaa pelaajan valintaa — ei oletusvaihtoehtoa eikä esihakua (siltalause täyttää odotuksen).
                // Omistaja TF 152 (Sydney): kysymys ei katkaise puhetta — se esitetään vasta puheen ja LoppuTaukoS:n jälkeen.
                // Omistaja TF 162 (linssi → Pariisi): "Lukija aloitti jo latausikkunassa" → kysymys odottaa myös siirtymän loppuun.
                if (PuheSoi || Siirtymassa || avausViive > 0) { lykattyKysymys = k; return; }
                KysyNyt(k);
                return;
            }
            Seuraava = k;
        }
        bool virhe;

        /// <summary>Kertojan puhe soi (pysähdys tai pelaajan kysymyksen vastaus): workerin kysymys odottaa sen loppuun.</summary>
        public bool PuheSoi => Vaihe == OpasVaihe.Puhuu && (!aaniLoppui || hiljaS < LoppuTaukoS)
            || Vaihe == OpasVaihe.Lentaa && puheAloitettu && !aaniLoppui;
        /// <summary>Puheen tai siirtymän aikana tullut workerin kysymys (esitetään niiden jälkeen; pelaajan toiminta hylkää sen).</summary>
        OpasKohde lykattyKysymys;
        public bool KysymysOdottaaPuhetta => lykattyKysymys != null;
        /// <summary>Pelaajan kysymyksen vastaus soi: esihaku tehdään vasta sen jälkeen (omistaja TF 152: vastaus katkesi).</summary>
        bool esihakuPuheenJalkeen;

        void KysyNyt(OpasKohde k)
        {
            OdottaaVastausta = true; kysymysAika = 0;
            Kysyy?.Invoke(k);
        }

        /// <summary>Saapumisen esihaku; pelaajan kysymyksen vastauksen aikana ei pyydetä mitään (seuraava pyyntö vasta puheen jälkeen).</summary>
        void Esihaku(OpasKohde k)
        {
            if (OdottaaVastausta || Seuraava != null || odotettu != 0 || k.OdottaaValintaa || Pysaytetty) return;
            if (k.PelaajanVastaus) { esihakuPuheenJalkeen = true; return; }
            UusiPyynto();
        }

        /// <summary>Puhe loppui (tai sitä ei voitu soittaa).</summary>
        public void AaniLoppui() { if (!aaniLoppui) hiljaS = 0; aaniLoppui = true; }

        /// <summary>Kertojan äänen lopusta vähintään näin kauan ennen seuraavaa lentoa (Päätoimittaja 16.3x: "+ ~1 s tauko";
        /// omistaja TF 149: kamera ei saa lähteä ennen kuin lukija on lopettanut).</summary>
        public const double LoppuTaukoS = 1.0;
        double hiljaS = double.MaxValue;

        /// <summary>
        /// Kerran kehyksessä. aika = monotoninen s; maaKorkeus(kohde) palauttaa maaston korkeuden ellipsoidista (tai NaN,
        /// jolloin käytetään arviota). Palauttaa true, kun kamera on uudessa asennossa (Asento).
        /// </summary>
        public void Paivita(double dt, Func<OpasKohde, double> maaKorkeus, Func<bool> laatatValmiit = null)
        {
            if (Vaihe == OpasVaihe.Valmis || Tauolla) return;   // tauko: kerronta, lento ja kierto seis (omistaja TF 144)
            VaiheAika += Math.Max(0, dt);
            if (hiljaS < double.MaxValue) hiljaS += Math.Max(0, dt);
            if (Luovutti) return;
            ohjausLepoS = PelaajaOhjaa ? 0 : (ohjausLepoS == double.MaxValue ? ohjausLepoS : ohjausLepoS + Math.Max(0, dt));
            if (odotettu != 0) { if (odotusAlku < 0) odotusAlku = 0; odotusAlku += dt; if (odotusAlku > VastausMaxS) { odotettu = 0; Virhe(0, 0); } }
            if (VirheTauko > 0) VirheTauko = Math.Max(0, VirheTauko - Math.Max(0, dt));
            if (virhe && VirheTauko <= 0) { virhe = false; UusiPyynto(); }
            // Vastaamaton kysymys (simu 18.39: worker kysyi saman 9 kertaa): opas valitsee itse ensimmäisen vaihtoehdon.
            if (OdottaaVastausta && aaniLoppui) kysymysAika += dt;   // odotus kestää pelaajan valintaan asti (omistaja, TF 144)
            // Siirron jälkeen myös avaustauko (AvausTaukoS) kuten kertojalla: BUILD 163 -todistusajossa kysymys vapautui samalla
            // ruudulla, jolla siirto päättyi, eli latausikkunan vielä näkyessä.
            if (lykattyKysymys != null && !PuheSoi && !Siirtymassa && avausViive <= 0) { var lk = lykattyKysymys; lykattyKysymys = null; KysyNyt(lk); }
            if (esihakuPuheenJalkeen && Vaihe == OpasVaihe.Puhuu && !PuheSoi)
            {
                esihakuPuheenJalkeen = false;
                if (!OdottaaVastausta && Seuraava == null && odotettu == 0 && (Nykyinen ?? edellinen) is OpasKohde nk && !nk.OdottaaValintaa && !Pysaytetty) UusiPyynto();
            }

            if (!ReferenceEquals(Seuraava, seuraavaMitattu)) { seuraavaMitattu = Seuraava; seuraavaIka = 0; } else seuraavaIka += Math.Max(0, dt);
            double korTavoite = KorostusKohteella && !LahtoValmisteilla ? 1 : 0;
            KorostusOsuus = korTavoite > KorostusOsuus ? Math.Min(korTavoite, KorostusOsuus + Math.Max(0, dt) / KorostusS)
                : Math.Max(korTavoite, KorostusOsuus - Math.Max(0, dt) / (korostusPika ? KorostusPikaS : KorostusS));
            switch (Vaihe)
            {
                case OpasVaihe.Alku:
                case OpasVaihe.Odottaa:
                    if (VapaaAsento(dt)) { }
                    else if (NykyinenKehys != null) PysahdysAsento(dt);
                    else
                    {
                        // Avaus: kamera lähtee heti laskeutumaan kaupungin ylle, kun worker suunnittelee (ei pysähtynyttä kuvaa).
                        alkuAsento ??= Asento;
                        var a = alkuAsento.Value;
                        var loppu = new Kuvakulma(a.Lat, a.Lon, a.EtaisyysM * AlkuLiukuKerroin, a.Kallistus + AlkuLiukuKallistus, a.Suuntima + 20, a.KatseKorkeusM);
                        Asento = KierrosLento.Valissa(a, loppu, KierrosLento.Smootherstep(Math.Min(1, VaiheAika / AlkuLiukuS)), 0);
                    }
                    bool odotusEhdot = Seuraava != null && aaniLoppuiTaiAlku() && !OdottaaVastausta && !OhjausPitaa;
                    if (LahtoSaa(odotusEhdot, odotusEhdot, true, dt)) AloitaLento(maaKorkeus);
                    break;
                case OpasVaihe.Puhuu:
                    if (!VapaaAsento(dt)) PysahdysAsento(dt);   // vapaassa tilassa kysymyksen vastaus ei palauta kameraa
                    // Valmistelu (korostus sammuu) alkaa jo äänen lopusta, lähtö vasta tauon jälkeen.
                    // Kosketuksen irrotuksen jälkeinen OhjausTaukoS kuluu samalla (sammutus ei pidennä taukoa).
                    bool valmistelu = aaniLoppui && Seuraava != null && !PelaajaOhjaa;
                    bool lahtoEhdot = valmistelu && !OhjausPitaa && VaiheAika >= TaukoS && hiljaS >= LoppuTaukoS;
                    // Tauko jo ohi (seuraava tuli myöhässä) tai pelaajan valinta: nopea sammutus.
                    if (LahtoSaa(lahtoEhdot, valmistelu, ohitettu || toiveesta || hiljaS >= LoppuTaukoS, dt)) AloitaLento(maaKorkeus);
                    else if (lahtoEhdot) { }
                    else if (aaniLoppui && Seuraava == null && odotettu == 0 && !esihakuPuheenJalkeen) { Vaihe = OpasVaihe.Odottaa; VaiheAika = 0; }
                    break;
                case OpasVaihe.Lentaa:
                {
                    KorjaaKehyksenMaa(maaKorkeus);
                    if (siirto)
                    {
                        kehysVaihto = 1;   // ruudun alla: ei liukua
                        // SIIRTO (omistaja 6.10. 12.0x): kaupungin ulkopuolelle ei lennetä — kamera kohteessa tumman ruudun alla,
                        // laatat latautuvat valmiiksi, ja näkymä aukeaa (saapuminen ja kertoja) vasta kun lataus on valmis.
                        Asento = KehysAsento(kohdeKehys, 0);
                        double ed = LatausEdistys != null ? LatausEdistys() : (laatatValmiit == null || laatatValmiit() ? 1 : 0);
                        // Näkymä ei aukea maa-arviolla: edistys enintään SiirtoMaatonEdistys ennen näytettä, ja korjatun kehyksen
                        // laatoille SiirtoMaaOdotusS (latausaste lasketaan uudesta kamerasta).
                        bool maaOdottaa = kehysArvio && MaaPisteessa != null;
                        // Näyte uudelleen sekunnin välein (video8 8.10.: ensimmäinen pyyntö lähti ennen kuin kaupunki oli auki, hylättiin
                        // hiljaa, ja siirto odotti 90 %:n katossa aina 25 s:n aikarajaan asti).
                        if (maaOdottaa && VaiheAika - maaPyydetty >= 1.0) { maaPyydetty = VaiheAika; MaaTarvitaan?.Invoke(kohdeKehys.Lat, kohdeKehys.Lon); }
                        double aste = Math.Max(0, Math.Min(maaOdottaa ? SiirtoMaatonEdistys : 1, ed));
                        bool tuore = VaiheAika - maaTunnettu >= SiirtoMaaOdotusS;
                        // KAKSI VAIHETTA (Päätoimittaja 8.10. 09.2x, video9: 12 s:n rajalla laatat 70 %): ensin vain yleiskuva ≥ SiirtoValmis,
                        // sitten 1. kohteen esikamera (Esilataus) ja uudelleen ≥ SiirtoValmis LahtoMittausS:n jälkeen; palkki 0–60 % / 60–100 %.
                        if (!YleiskuvaValmis && aste >= SiirtoValmis && tuore && VaiheAika >= SiirtoMinS) { YleiskuvaValmis = true; yleiskuvaAika = VaiheAika; }
                        bool kohdeKesken = EsiKohde != null && (!YleiskuvaValmis || VaiheAika - yleiskuvaAika < LahtoMittausS);
                        SiirtoEdistys = EsiKohde == null ? aste : YleiskuvaValmis ? 0.6 + 0.4 * (VaiheAika - yleiskuvaAika < LahtoMittausS ? 0 : aste) : 0.6 * aste;
                        if (VaiheAika < SiirtoMinS || ((aste < SiirtoValmis || !tuore || kohdeKesken) && VaiheAika < SiirtoMaxS)) break;
                        siirto = false; VaiheAika = LentoKestoS + SaapumisOdotusS;   // perillä, laatat valmiit
                        avausViive = AvausTaukoS;   // omistaja 16.5x: reilu sekunti ennen kertojaa, ei "hätiköityä" alkua
                    }
                    // Näkymä auki siirron jälkeen, kertoja odottaa AvausTaukoS (kamera kehyksessä, puhe ei vielä ala).
                    if (avausViive > 0) { Asento = KehysAsento(kohdeKehys, 0); avausViive -= Math.Max(0, dt); break; }
                    // Kesken avauksen laskeutumisen tullut vastaus: kohde vaihtuu lopulliseen kehykseen samassa lennossa.
                    if (siirtyma && Seuraava != null && !Seuraava.Kysymys && kehysKohde != null && kehysKohde.Id == null
                        && VaiheAika < LentoKestoS - 2
                        && KierrosLento.EtaisyysM(kehysKohde.Lat, kehysKohde.Lon, Seuraava.Lat, Seuraava.Lon) < 150)
                    {
                        var k = Seuraava; Seuraava = null;
                        var vanha = KohdeAsento();
                        var kehys = KehysKohteelle(k, maaKorkeus, out bool kArvio, out double kTulo);
                        // Pallo: suunta pysyy arviokehyksen (kääntörajan sisällä lasketun) suuntana; vain paikka ja koko vaihtuvat
                        // (PalloKaupungitTestit: kesken lennon laskettu tulo otti lennon hetkellisen suuntiman, ja kehysten sekoitus heilutti
                        // suuntaa 40 → 61 → 55 → 69°, kääntö 14 °/s).
                        if (PalloLento) { kTulo = KierrosLento.Kiedo(vanha.Suuntima - OpasKuvaus.SivuKulma); kehys = OpasKuvaus.Kehysta(k, kehys.MaaM, kTulo); }
                        AsetaKohdeKehys(kehys, kArvio, k, kTulo);
                        kehysVanha = vanha; kehysVaihto = 0; kehysVaihtoS = AvausVaihtoS;
                        // Suora laskeutuminen: vaihto liukuu lennon loppuun asti (3 s:n liuku nosti kiihtyvyyden 4,5 → 9 m/s²).
                        if (suoraLasku) kehysVaihtoS = Math.Max(AvausVaihtoS, LentoKestoS - VaiheAika - 1);
                        Nykyinen = k; edellinen = null; siirtyma = false; puheAloitettu = false; toiveesta = false;
                        LentoKohdeVaihtui?.Invoke(k);
                    }
                    kehysVaihto = Math.Min(1, kehysVaihto + Math.Max(0, dt) / kehysVaihtoS);
                    double t = Math.Min(1, VaiheAika / LentoKestoS);
                    Asento = suoraLasku ? OpasKuvaus.SuoraLasku(lahto, KohdeAsento(), t) : OpasKuvaus.Lennossa(lahto, KohdeAsento(), t);
                    if (kiertoJatko > 0 && VaiheAika < OpasKuvaus.KiertoAlkuS)
                        Asento = new Kuvakulma(Asento.Lat, Asento.Lon, Asento.EtaisyysM, Asento.Kallistus,
                            KierrosLento.Kiedo(Asento.Suuntima + OpasKuvaus.KierronHiipuminen(kiertoJatko, VaiheAika)), Asento.KatseKorkeusM);
                    // Puhe alkaa PuheEnnenS ennen saapumista, kuitenkin aikaisintaan PuheAikaisinS nousun jälkeen (simu 19.54: tauko ~5 s → ≤ 3 s).
                    if (!puheAloitettu && VaiheAika >= Math.Max(PuheAikaisinS, LentoKestoS - PuheEnnen(LentoKestoS))) { puheAloitettu = true; aaniLoppui = false; AlkaaPuhua?.Invoke(Nykyinen); }
                    // Saapuminen odottaa laattoja enintään SaapumisOdotusS (simu 18.39: saapuessa laatat 28–45 %).
                    // Pallo ei jää lennon loppuun seisomaan (LS2:n PalloKierrosTestit, hidas verkko: 3 s paikallaan kehyksessä): kertoja
                    // alkoi jo PuheEnnenS ennen saapumista, ja pysähdyksen lipuminen alkaa heti laattojen latautuessa.
                    if (t >= 1 && laatatValmiit != null && !laatatValmiit() && VaiheAika < LentoKestoS + SaapumisOdotusS && !(PalloLento && Nykyinen?.Id != null)) break;
                    if (t >= 1 && kehysVaihto < 1) break;   // korjattu kehys liukuu loppuun ennen saapumista
                    if (t >= 1 && siirtyma)
                    {
                        // Siirtymälento perillä: kaupungin yleiskuva kiertää; ei saapumista, puhetta eikä esihakua.
                        siirtyma = false;
                        NykyinenKehys = kohdeKehys; kierto = 0; lipumisAika = 0; lipumisKohti = null; lipumisRaaka = 0; LipumisVauhti = 0;
                        Vaihe = OpasVaihe.Odottaa; VaiheAika = 0;
                        break;
                    }
                    if (t >= 1)
                    {
                        NykyinenKehys = kohdeKehys; kierto = 0; lipumisAika = 0; lipumisKohti = null; lipumisRaaka = 0; LipumisVauhti = 0;
                        Vaihe = OpasVaihe.Puhuu; VaiheAika = 0;
                        if (VapaaTila) vapaaKehyksessa = true;   // vapaassa tilassa lennetty kohde: kehys kerronnan ajan
                        if (!puheAloitettu) aaniLoppui = false;
                        if (Nykyinen.Id != null) nahdyt.Add(Nykyinen.Id);
                        Saapui?.Invoke(Nykyinen);
                        // Esihaku puheen ajaksi — ei, jos seuraava on jo tiedossa tai pyynnössä (lennon aikana annettu toive;
                        // simu 23.05: saapumisen esihaku korvasi toiveen "näytä Strøget").
                        // Vaihtoehdollinen pysähdys (ei kierros) odottaa pelaajan valintaa: ei esihakua (omistaja, TF 144).
                        Esihaku(Nykyinen);
                    }
                    break;
                }
            }
        }

        /// <summary>Kohteen pysähdyskehys nykyisestä asennosta (sama kuin lennon kohde): OpasKuvaus.Kehysta, tulosuunta lennon suunta
        /// (alle 150 m: nykyinen suuntima), maaston korkeus näytteestä tai arvio 45 m.</summary>
        Pysahdys KehysKohteelle(OpasKohde k, Func<OpasKohde, double> maaKorkeus) => KehysKohteelle(k, maaKorkeus, out _, out _);

        Pysahdys KehysKohteelle(OpasKohde k, Func<OpasKohde, double> maaKorkeus, out bool arvio, out double tulo)
        {
            double maa = maaKorkeus?.Invoke(k) ?? double.NaN;
            if (double.IsNaN(maa)) maa = MaaPisteessa?.Invoke(k.Lat, k.Lon) ?? double.NaN;
            arvio = double.IsNaN(maa);
            if (arvio) maa = MaaArvioM;
            tulo = PalloLento ? LennonSuunta(k.Lat, k.Lon) : Suunta(Asento.Lat, Asento.Lon, k.Lat, k.Lon);
            double matkaM = KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, k.Lat, k.Lon);
            if (matkaM < 150) tulo = Asento.Suuntima;
            // Raja koskee lopullista kehyssuuntimaa (tulo + SivuKulma; video6 Louvre: kääntö 13,6 °/s, kun sivukulma jäi rajan ulkopuolelle).
            else if (PalloLento) tulo = PalloTulosuunta(Asento.Suuntima - OpasKuvaus.SivuKulma, tulo, LennonKesto(matkaM));
            var p = OpasKuvaus.Kehysta(k, maa, tulo);   // luokka k.Luokasta, muuten koosta ja korkeudesta
            if (PalloLento && matkaM < SiirtoRajaM)
            {
                // Lyhyt hyppy pienestä suureen kehykseen (PalloKaupungitTestit: Praha 75 m 40 → 200 m, Sevilla 172 m 60 → 400 m):
                // silmä ei perääntyisi lennon aikana, joten vaakaetäisyys kasvaa enintään 0,9 × hypyn pituus ja loppu katsotaan
                // jyrkemmin ylhäältä (sama katse-etäisyys).
                double A = Math.PI / 180, hNyt = Asento.EtaisyysM * Math.Sin(Asento.Kallistus * A), hMax = hNyt + 0.9 * matkaM;
                double h = p.EtaisyysM * Math.Sin(p.Kallistus * A);
                if (h > hMax && p.EtaisyysM > 1) p.Kallistus = Math.Max(OpasOhjaus.KallistusMin, Math.Asin(Math.Min(1, hMax / p.EtaisyysM)) / A);
                // Silmä jo seuraavan ohi hypyn suunnassa (PalloKaupungitTestit: Granada, Alhambran kehyksen silmä 196 m kohti 128 m:n
                // päässä olevaa Kaarle V:n palatsia, lento palasi 12,5 m): kehys katsoo seuraavaan nykyisestä silmän paikasta, jolloin
                // vaakaliikettä ei ole (vain suunta ja katse vaihtuvat).
                var nyt = OpasKuvaus.KameraPaikka(Asento, k.Lat, k.Lon);
                var uusi = OpasKuvaus.KameraPaikka(KehysAsento(p, 0), k.Lat, k.Lon);
                var (ae, an) = (OpasKuvaus.KameraPaikka(new Kuvakulma(Asento.Lat, Asento.Lon, 0, 0, 0, 0), k.Lat, k.Lon).e, OpasKuvaus.KameraPaikka(new Kuvakulma(Asento.Lat, Asento.Lon, 0, 0, 0, 0), k.Lat, k.Lon).n);
                double ul = Math.Sqrt(ae * ae + an * an);
                if (ul > 1)
                {
                    double ue = -ae / ul, un = -an / ul;   // hypyn suunta (nykyisestä kohteesta seuraavaan)
                    double eteNyt = nyt.e * ue + nyt.n * un, eteUusi = uusi.e * ue + uusi.n * un;
                    double hz = Math.Sqrt(nyt.e * nyt.e + nyt.n * nyt.n), vz = nyt.u - p.KatseKorkeusM;
                    if (eteNyt <= ul && eteUusi < eteNyt - 1 && eteUusi < -1 && eteNyt < 0 && p.EtaisyysM > 1)
                    {
                        // Silmä seuraavan takana, ja suurempi kehys perääntyisi (Praha 75 m, 40 → 200 m: 8–11 m taaksepäin): vaakaetäisyys
                        // pienenee niin, ettei silmä kulje hypyn suunnassa taaksepäin, ja kehys katsoo jyrkemmin ylhäältä.
                        double f = eteNyt / eteUusi, hb = p.EtaisyysM * Math.Sin(p.Kallistus * A) * f;
                        p.Kallistus = Math.Max(OpasOhjaus.KallistusMin, Math.Asin(Math.Min(1, hb / p.EtaisyysM)) / A);
                    }
                    else if (eteNyt > ul && eteUusi < eteNyt - 1 && hz > 1 && vz > 1)
                    {
                        p.Suuntima = KierrosLento.Kiedo(Math.Atan2(-nyt.e, -nyt.n) / A);
                        p.Kallistus = Math.Atan2(hz, vz) / A;
                        p.EtaisyysM = Math.Sqrt(hz * hz + vz * vz);
                        p.MinEtM = 0;
                    }
                }
            }
            return p;
        }

        /// <summary>
        /// ESILATAUSKAMERA (Siirtoseppä 5.10. 21.0x: saapuessa laatat 55–62 %, esilataus käytti vanhaa kehystä ja lennon aikana ei mitään):
        /// lennon aikana täsmälleen laskeutumiskehys, muuten esihaetun kohteen kehys samalla laskennalla kuin lento; null = ei esilattavaa.
        /// </summary>
        /// <summary>Pyynnössä olevan kohteen tunnettu paikka (kierroksen jono): esilataus ennen workerin vastausta (omistaja 23.3x:
        /// "laatat ehtivät latautua vasta kertomuksen puolivälin jälkeen").</summary>
        (double lat, double lon)? odotettuPaikka;
        public (double lat, double lon)? OdotettuPaikka => odotettu != 0 ? odotettuPaikka : null;

        /// <summary>Kaupunkitilan aloitus (omistaja 7.10. 12.5x, Ateena TF 159: lähizoomin laatat puuttuivat): yleiskuvan etäisyys
        /// (lyhyempi siirtymä lähikuvaan); null = AvausEtaisyysM.</summary>
        public double? AvausEtaisyysOhitus;
        /// <summary>Kaupunkitilan avausnäkymän kallistus (Päätoimittaja 22.4x: ~50°, ei 25°:n pystykuvaa); null = AvausKallistus.</summary>
        public double? AvausKallistusOhitus;
        /// <summary>Esityksen ensimmäinen kohde: latauskuvan ja avauksen aikana esikamera esilataa sen lähikuvan, ja siirtoruutu
        /// aukeaa vasta, kun myös ne laatat ovat valmiit (latausaste kattaa kaikki kamerat). Kierroksen alku tyhjentää.</summary>
        public (string nimi, double lat, double lon)? EsiKohde;

        /// <summary>Esikameran asento kehykselle: sama kuin saapumisasento (katon ja kallistuksen rajat, OpasOhjaus.Rajoita), jotta esiladatut
        /// laatat ovat juuri saapumisnäkymän (PalloKaupungitTestit.LaatatValmiina: 110 m:n kehyksissä ero oli 15 m).</summary>
        static Kuvakulma EsiAsento(Pysahdys p) => OpasOhjaus.Rajoita(OpasKuvaus.Pysahdyksella(p, 0), p.MaaM);

        public Kuvakulma? Esilataus(Func<OpasKohde, double> maaKorkeus)
        {
            // Linssireitti (omistaja 8.10. ~09.0x): esilataus jatkuu siirron jälkeen kysymysvaiheessa, kunnes kierros alkaa.
            if (EsiKohde is (string en, double ela, double elo) && ((Siirtymassa && YleiskuvaValmis) || (PyynnotSeis && Vaihe != OpasVaihe.Lentaa && !Siirtymassa)
                || (Vaihe == OpasVaihe.Odottaa && Nykyinen == null && Seuraava == null)))
                return EsiAsento(KehysKohteelle(new OpasKohde { Nimi = en, Lat = ela, Lon = elo, KokoM = 120 }, maaKorkeus));
            // Saavuttu (odotetaan laattoja): pääkamera on jo kehyksessä → esikamera pois, latausaste mittaa vain pääkameraa.
            if (Vaihe == OpasVaihe.Lentaa && kohdeKehys != null) return VaiheAika >= LentoKestoS ? (Kuvakulma?)null : EsiAsento(kohdeKehys);
            if (Seuraava != null && !Seuraava.Kysymys) return EsiAsento(KehysKohteelle(Seuraava, maaKorkeus));
            if (OdotettuPaikka is (double, double) op)
                return EsiAsento(KehysKohteelle(new OpasKohde { Lat = op.lat, Lon = op.lon, KokoM = 120 }, maaKorkeus));
            return null;
        }

        /// <summary>
        /// TAPPIOHJAUS (omistaja 21.3x, juna 145; Natiivi-UI OpasTapit, Siirtosepän OpasOhjaus): sovitin asettaa joka kehys
        /// tappien akselit (Tapit: kierto, korkeus, etäisyys −1…1) ja PelaajaOhjaa (kosketus). Pysähdyksellä automaattinen kierto ja
        /// dolly (aika saapumisesta) etenevät vain, kun ohjaus ei ole aktiivinen; seuraavaan ei lähdetä kosketuksen aikana eikä
        /// OhjausTaukoS:ään irrotuksen jälkeen. Puhe jatkuu keskeytyksettä.
        /// </summary>
        public readonly OpasOhjaus Ohjaus = new OpasOhjaus();
        public (double kierto, double korkeus, double etaisyys) Tapit;
        /// <summary>Vapaan tilan tapit (Linssiseppä 2, juna 152): vasen x/y ja oikea x/y −1…1 (y + = ylös); OpasVapaaLento.</summary>
        public (double vx, double vy, double ox, double oy) VapaaTapit;
        /// <summary>Vapaa lento kierroksen ■ jälkeen (VapaaTila): kamera tapeilla ilman kiertokeskipistettä.</summary>
        public readonly OpasVapaaLento Vapaa = new OpasVapaaLento();
        bool vapaaKaynnissa, vapaaKehyksessa;
        double vapaaNayteS; int vapaaKeha;

        /// <summary>Vapaassa tilassa asento vapaasta lennosta (aloitus nykyisestä asennosta); muuten false.</summary>
        bool VapaaAsento(double dt)
        {
            if (!VapaaTila) { vapaaKaynnissa = false; return false; }
            // Mikä tämä on? (LS1, juna 152): kohteeseen lennetty → kamera kiertää kohdetta kerronnan ajan, ja vapaa lento jatkuu
            // sen jälkeen siitä asennosta (ei hyppyä takaisin vapaan lennon vanhaan paikkaan).
            if (vapaaKehyksessa)
            {
                if (Vaihe == OpasVaihe.Puhuu && !aaniLoppui) { vapaaKaynnissa = false; return false; }
                vapaaKehyksessa = false;
            }
            if (!vapaaKaynnissa) { Vapaa.Aloita(Asento, MaaPisteessa); Vapaa.Alue = OpasSallitut.Alue(Sallitut, Asento.Lat, Asento.Lon); vapaaKaynnissa = true; }
            Asento = Vapaa.Paivita(dt, VapaaTapit.vx, VapaaTapit.vy, VapaaTapit.ox, VapaaTapit.oy, MaaPisteessa);
            // 3D-pinnan näytteet (rakennukset mukana) kamerasta ja liikkeen suunnasta 4 kertaa sekunnissa (sovitin välimuistittaa ~11 m:n ruutuun).
            vapaaNayteS -= dt;
            if (vapaaNayteS <= 0)
            {
                vapaaNayteS = 0.25;
                MaaTarvitaan?.Invoke(Vapaa.Lat, Vapaa.Lon);
                var (el, eo) = Vapaa.Ennakko; MaaTarvitaan?.Invoke(el, eo);
                // Kehät vuorotellen (4 pistettä kierroksella → 16 pistettä sekunnissa).
                for (int i = 0; i < 4; i++) { var (kl, ko) = Vapaa.KehaPiste(vapaaKeha); MaaTarvitaan?.Invoke(kl, ko); vapaaKeha = (vapaaKeha + 1) % OpasVapaaLento.KehaPisteita; }
            }
            return true;
        }
        public bool PelaajaOhjaa;
        double lipumisAika, lipumisKatto, lipumisRaaka, valmisteluAika; (double lat, double lon)? lipumisKohti;
        /// <summary>Lipumisen nykyinen vauhti (m/s; telemetria ja testit).</summary>
        public double LipumisVauhti { get; private set; }
        /// <summary>Lipumisen jarrutus lähdön valmistelussa (s): pelaajan valinta nopeammin.</summary>
        double LipumisJarru => korostusPika ? 0.5 : 1.0;
        /// <summary>Pallon lipumiskaari on päässä (seuraavan puolella tai sen tasalla): pallo leijuu paikallaan (omistaja 8.10. 18.4x).</summary>
        public bool Leijuu { get; private set; }
        double LipumisSkaala => NykyinenKehys == null ? 1 : Math.Min(1, NykyinenKehys.EtaisyysM / OpasKuvaus.LipumisVertailuEtM);
        /// <summary>Lipumisen jarrutuksen aika (s): kuluu vasta, kun lähtö on muuten valmis (laatat).</summary>
        double jarruAika;
        /// <summary>Kuva koko ruudulla (Kuvasuurennos): pysähdyksen kierto ja dolly seis; puhe jatkuu.</summary>
        public bool KameraSeis;
        /// <summary>Seuraava lento on pelaajan toiveen tai paikan vaihdon seuraus (siltalause soitettiin jo valinnasta).</summary>
        bool toiveesta;
        public const double OhjausTaukoS = 4;
        double ohjausLepoS = double.MaxValue;
        /// <summary>Pelaaja ohjaa tai irrotti alle OhjausTaukoS sitten: ei lähdetä seuraavaan.</summary>
        public bool OhjausPitaa => PelaajaOhjaa || ohjausLepoS < OhjausTaukoS;

        void PysahdysAsento(double dt)
        {
            Leijuu = false;
            Ohjaus.Paivita(dt, Tapit.kierto, Tapit.korkeus, Tapit.etaisyys);
            if (!Ohjaus.Aktiivinen && !KameraSeis) kierto += dt;   // kuvasuurennoksen ajan kamera seis (omistaja 12.1x)   // aika saapumisesta: ei nollaudu Puhuu ↔ Odottaa eikä "kerro lisää" -kappaleessa
            // Ohjauksen etäisyysrajat ovat perusasennon suhteisia (Siirtoseppä bfd0b8af), joten kaupungin 5 km:n yläkuva säilyy.
            if (PalloLento && NykyinenKehys.Id != null)
            {
                // Pallo (omistaja 8.10.): ei kiertoa kohteen ympäri; lipuu kohti seuraavaa, kamera pysyy nykyisessä kohteessa.
                var perus = OpasKuvaus.Pysahdyksella(NykyinenKehys, kierto, false);
                var kohti = Seuraava != null && !Seuraava.Kysymys ? ((double, double)?)(Seuraava.Lat, Seuraava.Lon) : OdotettuPaikka;
                if (kohti is (double klat, double klon) && lipumisKohti == null)
                {
                    lipumisKohti = (klat, klon);   // suunta ja katto lukitaan ensimmäisestä tiedosta (esihaun vaihdos ei hyppää)
                    double seurM = KierrosLento.EtaisyysM(NykyinenKehys.Lat, NykyinenKehys.Lon, klat, klon);
                    lipumisKatto = Math.Min(OpasKuvaus.LipumisMaxM, OpasKuvaus.LipumisOsuus * seurM);
                }
                if (lipumisKohti != null && !Ohjaus.Aktiivinen && !KameraSeis)
                {
                    // Vauhti S-käyrällä ylös (LipumisAlkuS) ja lähdön valmistelussa S-käyrällä nollaan ennen lentoa (lento alkaa levosta).
                    lipumisAika += dt;
                    double ylos = KierrosLento.Smootherstep(Math.Min(1, lipumisAika / OpasKuvaus.LipumisAlkuS));
                    LipumisVauhti = OpasKuvaus.LipumisNopeus * LipumisSkaala * ylos * (1 - KierrosLento.Smootherstep(Math.Min(1, jarruAika / LipumisJarru)));
                    lipumisRaaka += LipumisVauhti * dt;
                }
                // Katto tanh-käyränä + hidas ryömintä (LS2:n PalloKierrosTestit: pitkällä pysähdyksellä tanh vei vauhdin alle 0,2 m/s,
                // kun dolly poistui pallotilasta): pallo ei koskaan seiso täysin ennen lähdön jarrua.
                double d = lipumisKatto > 0 ? lipumisKatto * Math.Tanh(lipumisRaaka / lipumisKatto) + OpasKuvaus.LipumisRyomintaOsuus * lipumisRaaka : 0;
                bool loppu = false;
                Asento = Ohjaus.Sovella(lipumisKohti is (double la, double lo) ? OpasKuvaus.Lipunut(perus, la, lo, d, out loppu) : perus, NykyinenKehys.MaaM);
                Leijuu = loppu;
                return;
            }
            // Pallon avausnäkymä (kehys ilman kohdetta; omistaja TF 168: "parin kertojan lauseen jälkeen kip kääntyy kovalla vauhdilla
            // 180 astetta"): vanha pysähdys kiersi ja hyppäsi 13 s:n kohdalla toiseen kehykseen (> 1 000 m/s) kesken avauksen. Pallo
            // pysyy avauksen ajan rauhassa kehyksessä (ohjaus toimii), ensimmäinen lento lähtee levosta.
            Asento = Ohjaus.Sovella(OpasKuvaus.Pysahdyksella(NykyinenKehys, kierto, !PalloLento), NykyinenKehys.MaaM);
        }

        /// <summary>
        /// Lennon suunta kohteeseen (Linssiseppä 9.10., omistaja TF 168: "matkaa seinen puolelta toiselle ihan turhaan"): normaalisti
        /// katsepisteestä kohteeseen, mutta kun kohde on silmän ja katsepisteen välissä kuvan suunnassa (avausnäkymä katsoo 1. kohteen
        /// ohi, AvausKatseEteenOsuus), katsepisteestä laskettu suunta osoittaisi takaisin kameraa kohti → 180°:n käännös ja kohteen
        /// toiselle puolelle. Silloin suunta silmästä kohteeseen.
        /// </summary>
        public double LennonSuunta(double lat, double lon)
        {
            double A = Math.PI / 180, h = Asento.EtaisyysM * Math.Sin(Asento.Kallistus * A), su = Asento.Suuntima * A;
            double eLat = Asento.Lat - h * Math.Cos(su) / 111320.0, eLon = Asento.Lon - h * Math.Sin(su) / (111320.0 * Math.Cos(Asento.Lat * A));
            double sk = Suunta(eLat, eLon, lat, lon), dk = KierrosLento.EtaisyysM(eLat, eLon, lat, lon);
            if (Math.Abs(KierrosLento.Kiedo(sk - Asento.Suuntima)) < 60 && dk < h + 50) return sk;
            return Suunta(Asento.Lat, Asento.Lon, lat, lon);
        }

        /// <summary>Lähtöhetken kiertonopeus (°/s), joka hiipuu lennon alussa (OpasKuvaus.KierronHiipuminen).</summary>
        double kiertoJatko;

        bool aaniLoppuiTaiAlku() => Vaihe == OpasVaihe.Alku || aaniLoppui;
        Kuvakulma? alkuAsento;

        /// <summary>"Kerro lisää": seuraava on nykyisen oikean kohteen kehyksessä (sama ehto kuin AloitaLennon oikotiellä). Avauksen
        /// yleiskuva kohteen kohdalla ei ole sama paikka (video3 8.10.: 1. lento lähti 57 %:ssa odottamatta, ilman reitin esilatausta,
        /// ja pysähtyi kesken odottamaan laattoja — matka katsepisteestä oli alle 50 m).</summary>
        bool SamaPaikka() => Seuraava != null && NykyinenKehys != null && kehysKohde != null && kehysKohde.Id != null
            && KierrosLento.EtaisyysM(NykyinenKehys.Lat, NykyinenKehys.Lon, Seuraava.Lat, Seuraava.Lon) < 50;

        /// <summary>Lähdön valmistelu: ehdot täyttyvät → korostus sammuu ja laatat odotetaan; lento, kun molemmat valmiit.</summary>
        bool LahtoSaa(bool ehdot, bool valmistelu, bool pika, double dt)
        {
            // "Kerro lisää" (sama paikka) ei lähde mihinkään: korostus jää palamaan.
            bool sama = SamaPaikka();
            if (!valmistelu || sama) { LahtoValmisteilla = false; korostusPika = false; valmisteluAika = 0; jarruAika = 0; return ehdot && sama; }
            if (!LahtoValmisteilla) { korostusPika = pika; valmisteluAika = 0; jarruAika = 0; }   // nopeus valitaan valmistelun alussa
            LahtoValmisteilla = true;
            valmisteluAika += Math.Max(0, dt);
            if (!ehdot) return false;
            bool laatat = LahtoLaatatValmiit(dt);
            // Pallo: lipuminen pysähtyy ennen lentoa (ei nopeushyppyä), mutta vasta kun laatat ovat valmiit: laattaodotuksen ajan pallo
            // lipuu edelleen (omistaja TF 166, 18.3x: "jää välillä aivan liikaa paikalleen"; TF-lokissa lähtö odotti laattoja 5,0 s
            // joka kerta, ja pallo seisoi jarrutuksen jälkeen koko odotuksen).
            if (laatat) jarruAika += Math.Max(0, dt);
            bool lipuminenSeis = lipumisKohti == null || jarruAika >= LipumisJarru;
            return laatat && KorostusOsuus <= 0 && lipuminenSeis;
        }

        /// <summary>Lähteekö lento nyt (LahtoValmis tai odotus täynnä); siirto (kauas tai pakotettu) ja "kerro lisää" lähtevät heti.</summary>
        bool LahtoLaatatValmiit(double dt)
        {
            if (LatausEdistys == null || PakotaSiirto || Seuraava == null || VapaaTila) return true;
            double matka = KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, Seuraava.Lat, Seuraava.Lon);
            if (matka >= SiirtoRajaM) return true;
            if ((seuraavaIka >= LahtoMittausS && LatausEdistys() >= LahtoValmis) || lahtoOdotusS >= (ohitettu || toiveesta ? LahtoPelaajaMaxS : LahtoOdotusMaxS)) return true;
            lahtoOdotusS += Math.Max(0, dt);
            return false;
        }

        /// <summary>
        /// REITIN ESILATAUS (Päätoimittaja 8.10. 07.4x; ks. LahtoValmis): esikamera lataa vain seuraavan kohteen pysähdysnäkymän, mutta
        /// lennon alussa kääntyvä kamera näki pysähdyksellä selän taakse jääneen korttelin latautumattomana. Pysähdyksellä (seuraava
        /// tiedossa) lennon välinäkymät ReittiNaytteet samalla laskennalla kuin lento (OpasKuvaus.Lennossa nykyisestä asennosta),
        /// lennon aikana vielä edessä olevat. Googlen ehdot (CesiumKaupunki, ESILATAUKSEN EHTORAJAT): vain reitti SEURAAVAAN
        /// pysähdykseen, joka näytetään heti; sovitin poistaa kamerat, kun suunnitelma muuttuu (0 näkymää). Palauttaa näkymien määrän.
        /// </summary>
        public int ReittiEsilataus(Func<OpasKohde, double> maaKorkeus, Kuvakulma[] ulos)
        {
            if (ulos == null || VapaaTila || Siirtymassa || Tauolla) return 0;
            Kuvakulma a, b; double t0;
            if (Vaihe == OpasVaihe.Lentaa)
            {
                // Myös siirtymälento (kierroksen aloitus yleiskuvasta arviokehykseen, video4 5–12 s karkeana).
                if (siirto || kohdeKehys == null || avausViive > 0 || VaiheAika >= LentoKestoS) return 0;
                a = lahto; b = KohdeAsento(); t0 = VaiheAika / Math.Max(0.01, LentoKestoS);
            }
            else if (Seuraava != null && !Seuraava.Kysymys && !PakotaSiirto)
            {
                a = Asento;
                double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, Seuraava.Lat, Seuraava.Lon);
                if (matka >= SiirtoRajaM || SamaPaikka()) return 0;   // siirto ei lennä; "kerro lisää" jää paikalleen
                b = KehysAsento(KehysKohteelle(Seuraava, maaKorkeus), 0);
                t0 = 0;
            }
            else return 0;
            int n = 0;
            foreach (var t in ReittiNaytteet)
                if (t > t0 && n < ulos.Length) ulos[n++] = OpasKuvaus.Lennossa(a, b, t);
            return n;
        }

        void AloitaLento(Func<OpasKohde, double> maaKorkeus)
        {
            var k = Seuraava; Seuraava = null; Leijuu = false;
            LahtoOdottiS = lahtoOdotusS; lahtoOdotusS = 0; ohitettu = false; LahtoValmisteilla = false; korostusPika = false;
            // "Kerro lisää" (Pelikoodari #4009): sama paikka uudelleen → kamera jää kiertämään, kappale alkaa heti.
            // Vain, kun nykyinen kehys on oikean kohteen: valinnan ja Liikun välitön lento kehystää arviokohteen (koko 120, ei
            // korkeutta → katu, 143 m), ja juna 156:n VIE-este (Eiffel tornin juurella, simu 7.10. 04.1x) syntyi, kun workerin
            // oikea kohde (korkeus 330 m) jäi tämän oikotien takia arviokehykseen. Arviosta lennetään lyhyesti oikeaan kehykseen.
            if (NykyinenKehys != null && kehysKohde != null && kehysKohde.Id != null
                && KierrosLento.EtaisyysM(NykyinenKehys.Lat, NykyinenKehys.Lon, k.Lat, k.Lon) < 50)
            {
                Nykyinen = k; edellinen = null;
                // Uusi kohde samassa paikassa: lipuminen alkaa alusta kohti sen seuraavaa (PalloKaupungitTestit: Košice, Tampere,
                // Sisilia — vanha lipumissuunta osoitti samaan paikkaan, ja pallo seisoi koko kerronnan).
                if (PalloLento && NykyinenKehys != null && !VapaaTila)
                {
                    NykyinenKehys = new Pysahdys { Id = k.Id, Nimi = k.Nimi, Lat = NykyinenKehys.Lat, Lon = NykyinenKehys.Lon, MaaM = NykyinenKehys.MaaM, NostoM = NykyinenKehys.NostoM,
                        Suuntima = Asento.Suuntima, Kallistus = Asento.Kallistus, EtaisyysM = Asento.EtaisyysM };
                    kierto = 0; lipumisAika = 0; lipumisKohti = null; lipumisRaaka = 0; LipumisVauhti = 0;
                    Ohjaus.Nollaa();   // kehys on jo nykyinen asento: ohjauksen rajoitustila ei saa siirtyä uuteen kehykseen (hyppy 7,6°)
                }
                Vaihe = OpasVaihe.Puhuu; VaiheAika = 0; aaniLoppui = false;
                puheAloitettu = true; AlkaaPuhua?.Invoke(k);
                Saapui?.Invoke(k);
                Esihaku(k);
                return;
            }
            var kehys = KehysKohteelle(k, maaKorkeus, out bool maaArvio, out double tulo);
            AsetaKohdeKehys(kehys, maaArvio, k, tulo);
            Nykyinen = k; edellinen = null;
            // Pysähdyksen kierto hiipuu lennon alussa S-käyränä (ei pysähdy kerralla): lähtöhetken nopeus talteen.
            kiertoJatko = (Vaihe == OpasVaihe.Puhuu || Vaihe == OpasVaihe.Odottaa) && NykyinenKehys != null && !Ohjaus.Aktiivinen && !KameraSeis
                && !(PalloLento && NykyinenKehys.Id != null)   // pallon pysähdys ei kierrä (lipuminen), joten jatkoa ei ole
                ? OpasKuvaus.KiertoNopeus(kierto) : 0;
            Ohjaus.Nollaa();   // lento alkaa pelaajan kulmasta (Asento sisältää jo ohjauksen), ei hyppyä
            lahto = Asento;
            if (kiertoJatko > 0)
                lahto = new Kuvakulma(lahto.Lat, lahto.Lon, lahto.EtaisyysM, lahto.Kallistus,
                    KierrosLento.Kiedo(lahto.Suuntima + kiertoJatko * OpasKuvaus.KiertoAlkuS * 0.5), lahto.KatseKorkeusM);
            double matka = KierrosLento.EtaisyysM(lahto.Lat, lahto.Lon, k.Lat, k.Lon);
            LentoKestoS = LennonKesto(matka);
            AloitaSiirtoJosKaukana(matka, k.Lat, k.Lon, k.Nimi);
            AsetaSuoraLasku();
            LentoMittari = siirto ? (0, 0) : OpasKuvaus.Mittari(lahto, KohdeAsento(), LentoKestoS);
            LentoAlkaa?.Invoke(k, matka, toiveesta);
            toiveesta = false;
            Vaihe = OpasVaihe.Lentaa; VaiheAika = 0;
            puheAloitettu = false;
        }

        public static Kuvakulma KehysAsento(Pysahdys p, double kierto) =>
            OpasOhjaus.Rajoita(new Kuvakulma(p.Lat, p.Lon, p.EtaisyysM, p.Kallistus, KierrosLento.Kiedo(p.Suuntima + kierto), p.KatseKorkeusM), p.MaaM);

        /// <summary>
        /// Lento kahden asennon välillä: lyhyt matka kuten kierroksessa (kaari), pitkä isoympyrää pitkin ja etäisyys nousee
        /// keskellä niin, että koko matka mahtuu kuvaan (kallistus kohti pystyä), jolloin laattoja ei tarvita reitin varrelta.
        /// </summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon), s = KierrosLento.Smootherstep(t);
            if (matka < 20000)
            {
                double kaari = Math.Min(KierrosLento.KaariMaxM * 2, KierrosLento.KaariOsuus * matka) * Math.Sin(Math.PI * t);
                return KierrosLento.Valissa(a, b, s, kaari);
            }
            Isoympyra(a.Lat, a.Lon, b.Lat, b.Lon, s, out double lat, out double lon);
            double h = Math.Sin(Math.PI * t), kork = Math.Min(4e6, 0.9 * matka) * h;
            double ds = KierrosLento.Kiedo(b.Suuntima - a.Suuntima);
            double kall = a.Kallistus + (b.Kallistus - a.Kallistus) * s;
            kall = kall + (10 - kall) * h;   // keskellä lähes suoraan alas
            return new Kuvakulma(lat, lon, a.EtaisyysM + (b.EtaisyysM - a.EtaisyysM) * s + kork, kall, KierrosLento.Kiedo(a.Suuntima + ds * s),
                a.KatseKorkeusM + (b.KatseKorkeusM - a.KatseKorkeusM) * s);
        }

        /// <summary>Isoympyrän piste osuudella f (slerp yksikkövektoreilla).</summary>
        public static void Isoympyra(double lat1, double lon1, double lat2, double lon2, double f, out double lat, out double lon)
        {
            double r = Math.PI / 180;
            double x1 = Math.Cos(lat1 * r) * Math.Cos(lon1 * r), y1 = Math.Cos(lat1 * r) * Math.Sin(lon1 * r), z1 = Math.Sin(lat1 * r);
            double x2 = Math.Cos(lat2 * r) * Math.Cos(lon2 * r), y2 = Math.Cos(lat2 * r) * Math.Sin(lon2 * r), z2 = Math.Sin(lat2 * r);
            double d = Math.Acos(Math.Max(-1, Math.Min(1, x1 * x2 + y1 * y2 + z1 * z2)));
            double A = d < 1e-9 ? 1 - f : Math.Sin((1 - f) * d) / Math.Sin(d), B = d < 1e-9 ? f : Math.Sin(f * d) / Math.Sin(d);
            double x = A * x1 + B * x2, y = A * y1 + B * y2, z = A * z1 + B * z2;
            lat = Math.Atan2(z, Math.Sqrt(x * x + y * y)) / r;
            lon = Math.Atan2(y, x) / r;
        }
    }
}
