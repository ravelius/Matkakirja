// ÄÄNITAULUT JA -VAKIOT (B7 §1–§2): musiikin ja äänimaiseman data natiiville.
//
// Vakiot ovat verkkopelin moduulien sisäisiä lukuja (ambience-stream.js, siirtymamusiikki.js,
// musiikkivalitsin.js, ui.js), joita vienti ei tuo. Spesifikaation §1.10 kohta 2: ne pidetään
// C#:n vakioina, ja kultainen jälki (Kultaiset/aanijalki.json, erityisesti jälki 10 = koko
// sekoitus tynkäsoittimella) punastuu, jos web muuttaa niitä.
//
// Taulut: sisäänrakennettu oletus (AaniTaulut.Oletus) vastaa webiä a55f2a813. Paketista luetaan
// kokoelma aanitaulut (skeema ≥ 1.22: siirtyma, tilaraita, paikkaraita, pulu, pohjaraita, maisemakori,
// aarreaihe) ja kaupungit (maa, tyyppi); moduuli aani-ehdokkaat.json antaa KAUPUNKI_EHDOKKAAT,
// joilla maisemakori lasketaan, jos paketissa ei ole valmiita maisemakori-rivejä.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli
{
    /// <summary>Webin sekoituksen luvut (lineaarinen gain, sama asteikko kuin AudioSource.volume; ajat ms).</summary>
    public static class AaniVakiot
    {
        // --- musiikki (musiikkivalitsin.js) ---
        public const double MusiikinPerustaso = 0.034;
        public const double MusiikinKayra = 2.5;
        public const double MusiikinKatto = 8;
        public const int LiukuMin = 0, LiukuMax = 100, LiukuOletus = 35;

        // --- pohjaraita (ambience-stream.js POHJA_*) ---
        public const int PohjaNousuMs = 4000;
        public const int PohjaVaihtoMs = 1500;

        // --- visamusiikki (MUSIIKKI_VOIMA = perustaso × 1,3) ---
        public const double VisanKerroin = 1.3;
        /// <summary>QUIZ_MUSIC: ulkoinen varamusiikki, jos oletusvalintaa ei ole (Freesound 713120).</summary>
        public const string VisanVara = "https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3";

        // --- aarreaihe (ui.js AARRE_MUSIIKIN_VOIMA = perustaso × 3,8) ---
        public const double AarteenKerroin = 3.8;
        public const string AarteenSyy = "aarremusiikki";

        // --- äänimaisema (ambience-stream.js) ---
        public const double MaisemanVoima = 0.14;
        public const double EtusivunVoima = 0.28;
        public const double LennonVoima = 2.6;
        public const double JalkamatkanVoima = 0.75;
        public const int HaivytysMs = 1800;
        public const int LennonNousuMs = 600;
        public const int JalkamatkanNousuMs = 900;
        public const double LoppuvaraS = 45;
        public const int SilmukkaRistiMs = 2600;
        /// <summary>Lataus, joka ei ole soittokunnossa tässä ajassa, tulkitaan virheeksi (§2.7).</summary>
        public const int LatausvahtiMs = 6000;
        /// <summary>Maiseman kompressori ennen tasoa (§2.2): threshold dB, knee dB, ratio, attack s, release s.</summary>
        public const double KompressoriKynnys = -24, KompressoriPolvi = 18, KompressoriSuhde = 4, KompressoriAttack = 0.01, KompressoriRelease = 0.35;

        // --- väistö ---
        public const double VaistoNayte = 0.15;
        public const double VaistoPuhe = 0.25;
        public const double VaistoVisa = 0.15;
        public const int VaistoLiukuMs = 650;
        public const double VaistoHiljennys = 0.45;
        public const int HiljennysLiukuMs = 400;
        public const string LinssinHiljennys = "linssi";

        // --- avaus ---
        public const double AvauksenMusiikki = 0.6;
        public const double AvauksenMaisema = 1.45;
        public const int AvauksenLiukuMs = 1300;

        // --- siirtymä- ja linssiraidat ---
        public const int SiirtymaNousuMs = 300;
        public const int SiirtymaLaskuMs = 500;
        /// <summary>AIKAJANA_TAUKO_HIMMENNYS: kellon pysäytys puolittaa linssiraidan.</summary>
        public const double AikajanaTaukoHimmennys = 0.5;

        /// <summary>Säätimen (musiikki, tausta) muutos soivaan raitaan.</summary>
        public const int SaadinMs = 200;
    }

    /// <summary>Siirtymä- tai linssiraita (siirtymamusiikki.js RAIDAT).</summary>
    public sealed class SiirtymaRaita
    {
        public string Laji;
        /// <summary>"siirtyma" tai "linssi".</summary>
        public string Ryhma;
        /// <summary>Ensimmäinen osoite (ämpärin aanet/).</summary>
        public string Ampari;
        /// <summary>Varapolku assets/audio/… (AaniOsoite.AaniUrl).</summary>
        public string Oma;
        public double Voima;
        public int NousuMs = AaniVakiot.SiirtymaNousuMs;
        public int LaskuMs = AaniVakiot.SiirtymaLaskuMs;
    }

    /// <summary>Pulun tehoste (aanitaulut laji "pulu"; Natiivi-UI:n pulukirjasto, §5.3).</summary>
    public sealed class PuluAani
    {
        public string Nimi;
        /// <summary>Kansion osoite (ämpärin aanet/tehosteet/pulu/).</summary>
        public string Juuri;
        public string Tunnus;
        /// <summary>Kesto sekunteina.</summary>
        public double Kesto;
        public double Voima;
    }

    /// <summary>Maisemakori: äänitysten osoitteet (#alku/#voima) ja porras, jolta kori tuli.</summary>
    public sealed class MaisemaKoriRivi
    {
        public string Paikka;
        public string Tyyppi;
        /// <summary>"kaupunki", "maa", "tyyppi" tai null (tyhjä kori).</summary>
        public string Porras;
        public IReadOnlyList<string> Kori = Array.Empty<string>();
    }

    /// <summary>Kaupungin oma kenttä-äänitys (aani-ehdokkaat.js KAUPUNKI_EHDOKKAAT).</summary>
    public readonly struct KaupunkiAanite
    {
        public readonly string Url;
        /// <summary>Aloituskohta, joka liitetään osoitteeseen (#alku=), tai null.</summary>
        public readonly string Alku;
        public KaupunkiAanite(string url, string alku) { Url = url; Alku = alku; }
        public string Valinta => Alku != null ? Url + "#alku=" + Alku : Url;
    }

    public sealed class AaniTaulut
    {
        /// <summary>Laudan tunnus (web game.pack.id): natiivi pelaa maailmankarttaa.</summary>
        public string Lauta = "maailmankartta";
        public string MusiikinPaate = "-lyria";
        public string Pohjaraita = "musa-pohja";
        /// <summary>TILARAIDAT prioriteettijärjestyksessä (nimi, tunnus).</summary>
        public List<(string Nimi, string Tunnus)> Tilaraidat = new List<(string, string)>();
        public Dictionary<string, string> Paikkaraidat = new Dictionary<string, string>();
        /// <summary>Tila- ja paikkaraitojen kuvaukset (nimi → kuvaus) paketista; oletuksessa tyhjä.</summary>
        public Dictionary<string, string> Raitakuvaukset = new Dictionary<string, string>();
        /// <summary>Pulun tehosteet paketista (nimi → tehoste) lisäysjärjestyksessä; oletuksessa tyhjä.</summary>
        public Dictionary<string, PuluAani> Pulut = new Dictionary<string, PuluAani>();
        public HashSet<string> Kaupunkiraidat = new HashSet<string>();
        public Dictionary<string, string> KaupunginAlue = new Dictionary<string, string>();
        public HashSet<string> Alueraidat = new HashSet<string>();
        public Dictionary<string, string> AlueenMaat = new Dictionary<string, string>();
        /// <summary>RAIDAT järjestyksessä.</summary>
        public List<SiirtymaRaita> Siirtymat = new List<SiirtymaRaita>();
        /// <summary>Visamusiikin oletusvalinta (EHDOKKAAT['musiikki:tietovisa'].oletus); '' = pois.</summary>
        public string VisaOletus;
        public string AarreTavallinen, AarrePaa;
        public HashSet<string> Aarretyypit = new HashSet<string>();
        public HashSet<string> Vakiopaikat = new HashSet<string>();
        public Dictionary<string, string[]> Yhdistetyt = new Dictionary<string, string[]>();
        public Dictionary<string, List<string>> Oletuskorit = new Dictionary<string, List<string>>();
        /// <summary>KAUPUNKI_EHDOKKAAT: lauta → (kaupunki → äänitteet), lisäysjärjestyksessä (maaKori riippuu siitä).</summary>
        public List<(string Lauta, List<(string Kaupunki, List<KaupunkiAanite> Aanitteet)> Kaupungit)> KaupunkiEhdokkaat
            = new List<(string, List<(string, List<KaupunkiAanite>)>)>();
        /// <summary>Kaupunki → ISO3 (web pack.map.cityCountry).</summary>
        public Dictionary<string, string> Maat = new Dictionary<string, string>();
        /// <summary>Kaupunki → äänimaisematyyppi (city.ambience).</summary>
        public Dictionary<string, string> Tyypit = new Dictionary<string, string>();
        /// <summary>Paketin valmiit maisemakorit (skeema ≥ 1.22) laudalle Lauta; tyhjä = lasketaan.</summary>
        public Dictionary<string, MaisemaKoriRivi> Maisemakorit = new Dictionary<string, MaisemaKoriRivi>();

        /// <summary>Webin musaPolku: assets/audio/&lt;tunnus&gt;-lyria.mp3.</summary>
        public string MusaPolku(string tunnus) => "assets/audio/" + tunnus + MusiikinPaate + ".mp3";

        public SiirtymaRaita Siirtyma(string laji) => laji == null ? null : Siirtymat.FirstOrDefault(r => r.Laji == laji);

        public string Maa(string kaupunki) => kaupunki != null && Maat.TryGetValue(kaupunki, out var m) ? m : null;

        /// <summary>Aarteen paljastusaihe laattatyypille (ui.js onAarre → musa-paaaarre tähdelle, muuten musa-aarre); null = ei aihetta.</summary>
        public string Aarreaihe(string tyyppi) =>
            tyyppi != null && Aarretyypit.Contains(tyyppi) ? (tyyppi == "star" ? AarrePaa : AarreTavallinen) : null;

        /// <summary>Verkkopelin taulut (origin/main a55f2a813), ilman paketin kaupunkikohtaista dataa.</summary>
        public static AaniTaulut Oletus()
        {
            var t = new AaniTaulut();
            t.Tilaraidat.Add(("lehti", "musa-lehti"));
            t.Tilaraidat.Add(("matkalaukku", "musa-matkalaukku"));
            t.Paikkaraidat["etusivu"] = "musa-etusivu";
            t.Kaupunkiraidat.Add("ateena");
            t.KaupunginAlue["marseille"] = "valimeri";
            foreach (var a in new[] { "britteinsaaret", "pohjola", "keski-eurooppa", "valimeri", "balkan", "ita-eurooppa" }) t.Alueraidat.Add(a);
            void Alue(string alue, params string[] maat) { foreach (var m in maat) t.AlueenMaat[m] = alue; }
            Alue("britteinsaaret", "GBR", "IRL");
            Alue("pohjola", "NOR", "SWE", "DNK", "FIN", "ISL");
            Alue("keski-eurooppa", "FRA", "NLD", "BEL", "LUX", "DEU", "CZE", "AUT", "CHE", "POL", "HUN", "SVN", "SVK");
            Alue("valimeri", "ESP", "PRT", "ITA", "GRC", "MLT");
            Alue("balkan", "HRV", "BIH", "BGR", "ROU", "TUR");
            Alue("ita-eurooppa", "RUS", "UKR", "EST", "LVA", "LTU");
            SiirtymaRaita R(string laji, string ryhma, double voima, int nousu = AaniVakiot.SiirtymaNousuMs, int lasku = AaniVakiot.SiirtymaLaskuMs)
            {
                var tunnus = (ryhma == "linssi" ? "linssi-" : "siirtyma-") + laji + "-lyria.mp3";
                return new SiirtymaRaita { Laji = laji, Ryhma = ryhma, Ampari = AaniOsoite.Juuri + "aanet/" + tunnus, Oma = "assets/audio/" + tunnus, Voima = voima, NousuMs = nousu, LaskuMs = lasku };
            }
            t.Siirtymat.Add(R("jalan", "siirtyma", 0.11));
            t.Siirtymat.Add(R("laiva", "siirtyma", 0.11));
            t.Siirtymat.Add(R("lento", "siirtyma", 0.06));
            t.Siirtymat.Add(R("keksinnot", "linssi", 0.11, 600, 800));
            t.Siirtymat.Add(R("ihmisen-matka", "linssi", 0.11, 600, 800));
            t.VisaOletus = t.MusaPolku("musa-visa-2");
            t.AarreTavallinen = t.MusaPolku("musa-aarre");
            t.AarrePaa = t.MusaPolku("musa-paaaarre");
            foreach (var a in new[] { "star", "mannerAarre", "isoAarre", "pieniAarre" }) t.Aarretyypit.Add(a);
            t.Vakiopaikat.Add("etusivu");
            t.Vakiopaikat.Add("lentomatka");
            var mantereet = new[] { "europe", "africa", "middleeast", "asia", "oceania", "northamerica", "southamerica" };
            t.Yhdistetyt["maailmankartta"] = mantereet;
            t.Yhdistetyt["maailma"] = mantereet;
            foreach (var (tyyppi, kori) in OletuskoritWeb) t.Oletuskorit[tyyppi] = kori.ToList();
            return t;
        }

        /// <summary>aani-ehdokkaat.js OLETUSKORIT (ei viety pakettiin; jälki 7 ja paketin maisemakori-rivit vartioivat).</summary>
        static readonly (string, string[])[] OletuskoritWeb =
        {
            ("lentoasema", new[] { "https://cdn.freesound.org/previews/731/731249_10924423-lq.mp3#voima=3.04" }),
            ("lentokone", new[] { "https://cdn.freesound.org/previews/433/433002_138-lq.mp3#voima=2.69" }),
            ("basaari", new[] {
                "https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55",
                "https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23" }),
            ("aavikko", new[] {
                "https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#voima=0.98",
                "https://cdn.freesound.org/previews/411/411774_1910728-lq.mp3#voima=5.85",
                "https://cdn.freesound.org/previews/565/565015_12186594-lq.mp3#voima=0.16",
                "https://cdn.freesound.org/previews/635/635912_2247456-lq.mp3#voima=4.32",
                "https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27" }),
            ("meri", new[] {
                "https://cdn.freesound.org/previews/848/848927_17398983-lq.mp3#voima=0.82",
                "https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15",
                "https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15",
                "https://cdn.freesound.org/previews/573/573187_97550-lq.mp3#voima=0.54",
                "https://cdn.freesound.org/previews/543/543819_6667441-lq.mp3#alku=22&voima=0.73",
                "https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75" }),
            ("sademetsa", new[] {
                "https://cdn.freesound.org/previews/818/818589_15983207-lq.mp3#voima=0.25",
                "https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36",
                "https://cdn.freesound.org/previews/410/410078_1661766-lq.mp3#voima=0.22",
                "https://cdn.freesound.org/previews/407/407583_1661766-lq.mp3#voima=0.26",
                "https://cdn.freesound.org/previews/253/253301_2409224-lq.mp3#voima=0.48" }),
            ("savanni", new[] {
                "https://cdn.freesound.org/previews/202/202876_1934171-lq.mp3#voima=2.48",
                "https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#alku=20&voima=0.98",
                "https://cdn.freesound.org/previews/504/504694_778707-lq.mp3#voima=2.4",
                "https://cdn.freesound.org/previews/612/612318_13563349-lq.mp3#voima=0.3",
                "https://cdn.freesound.org/previews/764/764981_15688695-lq.mp3#voima=0.86",
                "https://cdn.freesound.org/previews/411/411996_7037-lq.mp3#alku=52&voima=0.92" }),
            ("ylanko", new[] { "https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22" }),
            ("kaupunki", new[] {
                "https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55",
                "https://cdn.freesound.org/previews/677/677253_9756914-lq.mp3#voima=0.47",
                "https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23" }),
            ("satama", new[] {
                "https://archive.org/download/aporee_8703_10524/CityCountryMeSassnitzFischereihafenFender.mp3#voima=0.33",
                "https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75",
                "https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15" }),
            ("vuoristo", new[] {
                "https://archive.org/download/aporee_68991_80056/almaporeejochbergalm12uhr30.mp3#voima=0.5",
                "https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22" }),
            ("metsa", new[] {
                "https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36",
                "https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27" }),
            ("pohjoinen", new[] {
                "https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22",
                "https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27",
                "https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15" }),
        };

        // --- paketin luku -------------------------------------------------------

        /// <summary>
        /// Kokoelma aanitaulut (kokoelmat/aanitaulut.json). Luetaan rivit, jotka natiivi tarvitsee:
        /// siirtyma, tilaraita, paikkaraita, pulu, pohjaraita, maisemakori (skeema ≥ 1.22) ja aarreaihe.
        /// Tuntemattomat lajit ohitetaan. Palauttaa luettujen maisemakori-rivien määrän.
        /// </summary>
        public int LueAanitaulut(string json)
        {
            var tilat = new List<(string, string)>();
            var siirtymat = new List<SiirtymaRaita>();
            int korit = 0;
            foreach (var o in MiniJson.Alkiot(json))
            {
                var laji = MiniJson.Teksti(o, "laji");
                var nimi = MiniJson.Teksti(o, "nimi");
                // Siirtymä-, tila-, paikkaraidan ja pulun kentät: päätaso ensin (skeema 1.30, koepaketti v38),
                // raaka data vain Paataso-varareitillä (≤ 1.29: vain data-oliossa; RaakaKielletty katkaisee).
                var data = Paataso.Nakyma(o, Paataso.Aanitaulu);
                switch (laji)
                {
                    case "siirtyma":
                        siirtymat.Add(new SiirtymaRaita
                        {
                            Laji = nimi, Ryhma = MiniJson.Teksti(data, "ryhma"), Ampari = MiniJson.Teksti(data, "ampari"),
                            Oma = MiniJson.Teksti(data, "oma"), Voima = MiniJson.Luku(data, "voima") ?? 0,
                            NousuMs = (int)(MiniJson.Luku(data, "nousuMs") ?? AaniVakiot.SiirtymaNousuMs),
                            LaskuMs = (int)(MiniJson.Luku(data, "laskuMs") ?? AaniVakiot.SiirtymaLaskuMs),
                        });
                        break;
                    case "tilaraita":
                        tilat.Add((nimi, MiniJson.Teksti(data, "tunnus")));
                        if (MiniJson.Teksti(data, "kuvaus") is string tk) Raitakuvaukset[nimi] = tk;
                        break;
                    case "paikkaraita":
                        Paikkaraidat[nimi] = MiniJson.Teksti(data, "tunnus");
                        if (MiniJson.Teksti(data, "kuvaus") is string pk) Raitakuvaukset[nimi] = pk;
                        break;
                    case "pulu":
                        Pulut[nimi] = new PuluAani
                        {
                            Nimi = nimi, Juuri = MiniJson.Teksti(o, "juuri"), Tunnus = MiniJson.Teksti(data, "tunnus"),
                            Kesto = MiniJson.Luku(data, "kesto") ?? 0, Voima = MiniJson.Luku(data, "voima") ?? 0,
                        };
                        break;
                    case "pohjaraita": Pohjaraita = nimi; break;
                    case "aarreaihe":
                        if (nimi == "paa") AarrePaa = MusaPolku(MiniJson.Teksti(o, "tunnus"));
                        else if (nimi == "tavallinen") AarreTavallinen = MusaPolku(MiniJson.Teksti(o, "tunnus"));
                        break;
                    case "maisemakori":
                        var paikka = MiniJson.Teksti(o, "paikka");
                        Maisemakorit[paikka] = new MaisemaKoriRivi
                        {
                            Paikka = paikka, Tyyppi = MiniJson.Teksti(o, "tyyppi"), Porras = MiniJson.Teksti(o, "porras"),
                            Kori = MiniJson.Taulukko(MiniJson.Kentta(o, "kori")).Select(x => (string)x).ToList(),
                        };
                        if (MiniJson.Totuus(o, "vakio")) Vakiopaikat.Add(paikka);
                        korit++;
                        break;
                }
            }
            if (tilat.Count > 0) Tilaraidat = tilat;
            if (siirtymat.Count > 0) Siirtymat = siirtymat;
            return korit;
        }

        /// <summary>Kaupunkien maa (ISO3) ja äänimaisematyyppi paketin kokoelmasta kaupungit.</summary>
        public void LueKaupungit(IEnumerable<Kaupunki> kaupungit)
        {
            foreach (var k in kaupungit)
            {
                if (k.Maa != null) Maat[k.Id] = k.Maa;
                if (k.Tyyppi != null) Tyypit[k.Id] = k.Tyyppi;
            }
        }

        /// <summary>
        /// KAUPUNKI_EHDOKKAAT muodossa { lauta: { kaupunki: [ { url, alku? } ] } } (moduuli
        /// aani-ehdokkaat.json exportit.KAUPUNKI_EHDOKKAAT tai kultaisen jäljen vakiot).
        /// </summary>
        public void LueKaupunkiEhdokkaat(Dictionary<string, object> ehdokkaat)
        {
            KaupunkiEhdokkaat.Clear();
            foreach (var lauta in ehdokkaat)
            {
                var kaupungit = new List<(string, List<KaupunkiAanite>)>();
                foreach (var kaupunki in MiniJson.Objekti(lauta.Value))
                {
                    var aanitteet = new List<KaupunkiAanite>();
                    foreach (var e in MiniJson.Taulukko(kaupunki.Value))
                    {
                        var o = MiniJson.Objekti(e);
                        var alku = MiniJson.Kentta(o, "alku");
                        aanitteet.Add(new KaupunkiAanite(MiniJson.Teksti(o, "url"), AlkuTekstina(alku)));
                    }
                    kaupungit.Add((kaupunki.Key, aanitteet));
                }
                KaupunkiEhdokkaat.Add((lauta.Key, kaupungit));
            }
        }

        /// <summary>JS `${e.url}#alku=${e.alku}` kun e.alku on tosi (luku tai merkkijono).</summary>
        static string AlkuTekstina(object alku) => alku switch
        {
            string s when s.Length > 0 => s,
            double d when d != 0 && !double.IsNaN(d) => d.ToString("R", System.Globalization.CultureInfo.InvariantCulture),
            _ => null,
        };
    }
}
