// PAKETTIVARTIJA (Pelikoodari 23.9.2026, Fablen määrittely): sisältöpaketti vs natiivin lukijat.
//
// Jokaiselle natiivin lukijalle (kokoelma + lukijametodi) on sääntö: mitkä kentät lukija lukee,
// millä tyypillä, mitkä ovat pakollisia ja mitkä alkiot se tarkoituksella ohittaa. Vartija
//   1. tarkistaa osoittimen ja manifestin skeemaversion (Pakettiskeema, tuntematon = punainen),
//   2. tarkistaa kokoelman rungon ($skeema, nimi, alkiot) sekä manifestin lkm:n ja sha256:n,
//   3. käy jokaisen alkion läpi säännön kentillä: puuttuva pakollinen kenttä, väärä tyyppi,
//      säännön ehto tai kaksoisavain = HYLÄTTY (punainen), suodin = OHITETTU (ei virhe),
//   4. ajaa oikean lukijan koko kokoelmalle (poikkeus = punainen) ja vertaa sen lukemaa määrää
//      vartijan hyväksymiin (ero = sääntö ja lukija eivät ole samaa mieltä = punainen).
// Tuloste: kokoelmakohtainen yhteenveto (luettu, ohitettu, hylätty ja syy) ja raakadatan lukukohdat.
//
// Kenttäpolku: "a.b.c", vaihtoehdot "|" lukijan järjestyksessä (ensimmäinen ei-null voittaa),
// "*" = jokainen taulukon alkio tai olion arvo. Polku, joka alkaa "data.", on RAAKADATAA
// (webin moduulin olio, sopimuksen mukaan ei nojata). VAIHE 2: Paataso.RaakaKielletty = true →
// raakapolkuja ei lueta, joten jokainen lukija, joka vielä tarvitsee niitä, punastuu.
// SKEEMA 1.26 (24.9.2026): säännöt ovat päätaso ensin ("kentta|data.vanha", Tai("a.b")), kuten
// lukijat (Paataso.Nakyma/Olio). Raaka vaihtoehto on vain vanhoja paketteja varten.
// SKEEMA 1.30 (24.9.2026, koepaketti v38): aanitaulut (oma sääntö), reitit.maksu ja laattatyyppien
// suomenkieliset nimet päätasolla. Laattatyypin englanninkieliset nimet (name, symbol, value, color)
// ovat vanhan muodon varareitti: vartija kohtelee niitä kuten data.*-polkuja (Englanninkieliset).
//
// Lukijat (kaanna.sh:n tiedostot): SisaltoTuonti, Reittiverkko, Laattamaarat, Aarrenimet,
// Kysymysdata, Kohtaamiset, Kuvakokoelmat, Pulmadata, Kauppasisalto, Fokusdata, Sahketehtava,
// Luennat, AaniTaulut. Laukku ja Lento eivät lue pakettia suoraan (Laukku saa Aarrenimet ja Kauppasisallon).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    [Flags]
    enum JsonTyyppi { Teksti = 1, Luku = 2, Totuus = 4, Olio = 8, Taulukko = 16 }

    /// <summary>Yksi sisältöpaketti: osoitin, manifesti ja kokoelmien tekstit (levyltä tai muistista).</summary>
    sealed class Paketti
    {
        public readonly string Nimi;
        public readonly Dictionary<string, object> Osoitin, Manifest;
        readonly Func<string, string> lue;
        readonly Dictionary<string, string> tekstit = new Dictionary<string, string>();
        readonly Dictionary<string, Dictionary<string, object>> rungot = new Dictionary<string, Dictionary<string, object>>();

        public Paketti(string nimi, Dictionary<string, object> osoitin, Dictionary<string, object> manifest, Func<string, string> lue)
        {
            Nimi = nimi; Osoitin = osoitin; Manifest = manifest; this.lue = lue;
        }

        /// <summary>Kokoelman teksti tai null (ei paketissa).</summary>
        public string Teksti(string kokoelma)
        {
            if (!tekstit.TryGetValue(kokoelma, out var t)) tekstit[kokoelma] = t = lue(kokoelma);
            return t;
        }

        /// <summary>Kokoelman jäsennetty runko tai null.</summary>
        public Dictionary<string, object> Runko(string kokoelma)
        {
            if (rungot.TryGetValue(kokoelma, out var r)) return r;
            var t = Teksti(kokoelma);
            r = t == null ? null : MiniJson.Jasenna(t) as Dictionary<string, object>;
            rungot[kokoelma] = r;
            return r;
        }

        public IEnumerable<Dictionary<string, object>> Alkiot(string kokoelma) =>
            (MiniJson.Kentta(Runko(kokoelma), "alkiot") as List<object> ?? new List<object>()).OfType<Dictionary<string, object>>();

        /// <summary>Korvaa kokoelman tekstin (vartijan omat testit: rikottu paketti).</summary>
        public Paketti Korvaa(string kokoelma, string teksti)
        {
            var p = new Paketti(Nimi + " (muokattu)", Osoitin, Manifest, k => k == kokoelma ? teksti : Teksti(k));
            return p;
        }

        HashSet<string> kaupungit;
        /// <summary>Kokoelman kaupungit id:t (ristiviittausten tarkistus).</summary>
        public HashSet<string> Kaupungit => kaupungit ??=
            new HashSet<string>(Teksti("kaupungit") == null ? new string[0] : Alkiot("kaupungit").Select(o => MiniJson.Teksti(o, "id")).Where(x => x != null));

        public string Versio => MiniJson.Luku(Osoitin, "versio") is double v ? "v" + v.ToString(CultureInfo.InvariantCulture) : "v?";
        public string Skeemaversio => MiniJson.Teksti(Osoitin, "skeemaversio") ?? MiniJson.Teksti(Manifest, "skeemaversio");

        /// <summary>
        /// Paketti kansiosta: juuri, jossa uusin.json (polku sisalto/1/v&lt;N&gt;/ → juuri/v&lt;N&gt;), tai suoraan
        /// versiokansio, jossa manifest.json (osoitin = osoitin.json tai uusin.json, jos on).
        /// </summary>
        public static Paketti Kansiosta(string kansio, string nimi)
        {
            Dictionary<string, object> osoitin = null;
            string versiokansio = kansio;
            if (!File.Exists(Path.Combine(kansio, "manifest.json")))
            {
                var uusin = Path.Combine(kansio, "uusin.json");
                if (!File.Exists(uusin)) throw new Exception($"{kansio}: ei uusin.json eikä manifest.json");
                osoitin = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(uusin)));
                var polku = (MiniJson.Teksti(osoitin, "polku") ?? "").TrimEnd('/');
                versiokansio = Path.Combine(kansio, polku.Substring(polku.LastIndexOf('/') + 1));
            }
            else
                foreach (var n in new[] { "osoitin.json", "uusin.json" })
                    if (osoitin == null && File.Exists(Path.Combine(kansio, n)))
                        osoitin = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(kansio, n))));
            var manifest = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(versiokansio, "manifest.json"))));
            return new Paketti($"{nimi} ({versiokansio})", osoitin ?? new Dictionary<string, object>(), manifest, k =>
            {
                var f = Path.Combine(versiokansio, "kokoelmat", k + ".json");
                return File.Exists(f) ? File.ReadAllText(f) : null;
            });
        }
    }

    sealed class VartijanKentta
    {
        public string[] Polut;
        public JsonTyyppi Tyyppi;
        public bool Pakollinen;
        public string Nimi => string.Join("|", Polut);
    }

    /// <summary>Yhden lukijan sääntö yhdelle kokoelmalle.</summary>
    sealed class Lukijasaanto
    {
        public string Kokoelma, Lukija;
        public readonly List<VartijanKentta> Kentat = new List<VartijanKentta>();
        public readonly List<(Func<Dictionary<string, object>, bool> Ehto, string Syy)> Suotimet = new List<(Func<Dictionary<string, object>, bool>, string)>();
        public readonly List<Func<Dictionary<string, object>, Paketti, string>> Ehdot = new List<Func<Dictionary<string, object>, Paketti, string>>();
        public Func<Dictionary<string, object>, string> Avain;
        /// <summary>Ajaa oikean lukijan: (luettu määrä tai null, kuvaus).</summary>
        public Func<Paketti, (int? Maara, string Kuvaus)> Aja;
        public int VahintaanLuettu = 1;

        public Lukijasaanto Pakko(string polut, JsonTyyppi t) { Kentat.Add(new VartijanKentta { Polut = polut.Split('|'), Tyyppi = t, Pakollinen = true }); return this; }
        public Lukijasaanto Voi(string polut, JsonTyyppi t) { Kentat.Add(new VartijanKentta { Polut = polut.Split('|'), Tyyppi = t }); return this; }
        public Lukijasaanto Vain(Func<Dictionary<string, object>, bool> ehto, string syy) { Suotimet.Add((ehto, syy)); return this; }
        public Lukijasaanto Ehto(Func<Dictionary<string, object>, Paketti, string> ehto) { Ehdot.Add(ehto); return this; }
        public Lukijasaanto Uniikki(string polut) { var p = polut.Split('|'); Avain = o => Pakettivartija.Ensimmainen(o, p) as string; return this; }
    }

    /// <summary>Yhden säännön tulos.</summary>
    sealed class Vartijarivi
    {
        public string Kokoelma, Lukija, LukijanKuvaus;
        public int Alkioita, Luettu, Ohitettu, Hylatty, Raaka;
        public int? LukijanMaara;
        public readonly Dictionary<string, List<string>> Ohitussyyt = new Dictionary<string, List<string>>();
        public readonly Dictionary<string, List<string>> Hylkayssyyt = new Dictionary<string, List<string>>();
        public readonly SortedDictionary<string, int> RaakaPolut = new SortedDictionary<string, int>();
    }

    sealed class Vartijatulos
    {
        public Paketti Paketti;
        /// <summary>Paataso.RaakaKielletty tarkistuksen aikana.</summary>
        public bool RaakaKielletty;
        public readonly List<Vartijarivi> Rivit = new List<Vartijarivi>();
        public readonly List<string> Virheet = new List<string>();
        public readonly List<string> Huomiot = new List<string>();
        /// <summary>Skeeman lupaama kenttä puuttuu (varoitus, ei virhe: lukijat sietävät puuttuvan).</summary>
        public readonly List<string> Varoitukset = new List<string>();
        public bool Vihrea => Virheet.Count == 0;
    }

    static class Pakettivartija
    {
        const JsonTyyppi T = JsonTyyppi.Teksti, L = JsonTyyppi.Luku, B = JsonTyyppi.Totuus, O = JsonTyyppi.Olio, A = JsonTyyppi.Taulukko;

        public const string OsoitinOletus = "https://media.matkakirja.app/sisalto/1/uusin.json";
        public const string KoepakettiOletus = "/Users/Shared/Claude/sisalto-koe";

        // --- polut -------------------------------------------------------

        /// <summary>
        /// Laattatyypin englanninkieliset nimet (skeema ≤ 1.29; 1.30 tuo suomenkieliset rinnalle, 2.0 poistaa):
        /// raakaa kuten data.*, joten raakakielto katkaisee ne (lukija: Paataso.Suomeksi).
        /// </summary>
        public static readonly HashSet<string> Englanninkieliset = new HashSet<string>
        {
            "tyypit.*.name", "tyypit.*.symbol", "tyypit.*.value", "tyypit.*.color",
            "mannerTyypit.*.*.name", "mannerTyypit.*.*.symbol", "mannerTyypit.*.*.value", "mannerTyypit.*.*.color",
        };

        static bool OnRaaka(string polku) =>
            polku == "data" || polku.StartsWith("data.", StringComparison.Ordinal) || Englanninkieliset.Contains(polku);

        /// <summary>Polun arvot (polku, arvo); puuttuva väliolio tai lehti antaa (polku, null).</summary>
        public static IEnumerable<(string Polku, object Arvo)> Arvot(object juuri, string polku)
        {
            IEnumerable<(string, object)> nykyiset = new[] { ("", juuri) };
            foreach (var osa in polku.Split('.'))
            {
                var seuraavat = new List<(string, object)>();
                foreach (var (p, arvo) in nykyiset)
                {
                    if (arvo == null && p.Length > 0) { seuraavat.Add((p, null)); continue; }
                    string Liita(string x) => p.Length == 0 ? x : p + "." + x;
                    if (osa == "*")
                    {
                        if (arvo is List<object> l) for (int i = 0; i < l.Count; i++) seuraavat.Add((Liita(i.ToString(CultureInfo.InvariantCulture)), l[i]));
                        else if (arvo is Dictionary<string, object> d) foreach (var kv in d) seuraavat.Add((Liita(kv.Key), kv.Value));
                        else seuraavat.Add((Liita(osa), null));
                    }
                    else seuraavat.Add((Liita(osa), (arvo as Dictionary<string, object>) is Dictionary<string, object> o && o.TryGetValue(osa, out var v) ? v : null));
                }
                nykyiset = seuraavat;
            }
            return nykyiset;
        }

        /// <summary>Yksittäisen polun arvo (ei *): raakapolku on null, kun Paataso.RaakaKielletty.</summary>
        public static object Arvo(Dictionary<string, object> o, string polku) =>
            Paataso.RaakaKielletty && OnRaaka(polku) ? null : Arvot(o, polku).FirstOrDefault().Arvo;

        /// <summary>Ensimmäinen ei-null vaihtoehto (lukijan ?? -ketju).</summary>
        public static object Ensimmainen(Dictionary<string, object> o, params string[] polut)
        {
            foreach (var p in polut) { var v = Arvo(o, p); if (v != null) return v; }
            return null;
        }

        static string S(Dictionary<string, object> o, params string[] polut) => Ensimmainen(o, polut) as string;

        public static JsonTyyppi? TyyppiOf(object v) => v switch
        {
            string _ => JsonTyyppi.Teksti, double _ => JsonTyyppi.Luku, bool _ => JsonTyyppi.Totuus,
            Dictionary<string, object> _ => JsonTyyppi.Olio, List<object> _ => JsonTyyppi.Taulukko, _ => (JsonTyyppi?)null,
        };

        static string TyyppiNimi(JsonTyyppi t) => string.Join("|", Enum.GetValues(typeof(JsonTyyppi)).Cast<JsonTyyppi>().Where(x => t.HasFlag(x)).Select(x => x.ToString().ToLowerInvariant()));

        // --- säännöt -------------------------------------------------------

        static Lukijasaanto Saanto(string kokoelma, string lukija, Func<Paketti, (int?, string)> aja) =>
            new Lukijasaanto { Kokoelma = kokoelma, Lukija = lukija, Aja = aja };

        static HashSet<string> Kaupunkiavaimet(Paketti p) => p.Kaupungit;

        static string Kaupunki(Paketti p, string id, string kentta) =>
            id == null || Kaupunkiavaimet(p).Contains(id) ? null : $"{kentta} '{id}' ei ole kaupungeissa";

        static Kohtaamiset UudetKohtaamiset(Paketti p)
        {
            var k = new Kohtaamiset();
            foreach (var id in Kaupunkiavaimet(p)) k.Kaupungit[id] = new Kohtaaminen();
            return k;
        }

        const JsonTyyppi Kupla = JsonTyyppi.Teksti | JsonTyyppi.Taulukko | JsonTyyppi.Olio;

        /// <summary>Päätason polku ja sen raaka vastine samalla nimellä: "a.b" → "a.b|data.a.b" (päätaso ensin).</summary>
        static string Tai(string polku) => polku + "|data." + polku;

        /// <summary>Kaikki natiivin lukijat. Järjestys = tulosteen järjestys.</summary>
        public static readonly IReadOnlyList<Lukijasaanto> Saannot = new List<Lukijasaanto>
        {
            Saanto("kaupungit", "SisaltoTuonti.LueKaupungit", p => (SisaltoTuonti.LueKaupungit(p.Teksti("kaupungit")).Count, null))
                .Pakko("id", T).Pakko("nimi", T).Pakko("manner", T).Pakko("lat", L).Pakko("lon", L)
                .Voi("maa", T).Voi("maa2", T).Voi("saari", B).Voi("lentokentta", B).Voi("aloitus", B).Voi("tyyppi", T)
                .Uniikki("id"),

            Saanto("reitit", "SisaltoTuonti.LueReitit + Reittiverkko", p =>
                {
                    var r = SisaltoTuonti.LueReitit(p.Teksti("reitit"));
                    var v = new Reittiverkko(SisaltoTuonti.LueKaupungit(p.Teksti("kaupungit")), r);
                    return (r.Count, $"{v.Reitit.Count} maa/meri, {v.Lennot.Count} lentoa");
                })
                .Pakko("a|data.a", T).Pakko("b|data.b", T).Pakko("laji", T)
                .Voi("askelia|data.steps", L).Voi("maksu|data.fee", L)
                .Ehto((o, p) => MiniJson.Teksti(o, "laji") is string l && l != "maa" && l != "sea" && l != "lento" ? $"tuntematon laji '{l}'" : null)
                // Webin kaava: vain merireitillä on maksu (sea → data.fee ?? SEA_FEE, muut 0).
                .Ehto((o, p) => MiniJson.Luku(o, "maksu") is double m && (m < 0 || (MiniJson.Teksti(o, "laji") != "sea" && m != 0))
                    ? $"maksu {m} ei ole webin kaavan mukainen (laji {MiniJson.Teksti(o, "laji")})" : null)
                .Ehto((o, p) => MiniJson.Teksti(o, "laji") != "lento" && Ensimmainen(o, "askelia", "data.steps") == null ? "puuttuu askelia (maa/meri)" : null)
                .Ehto((o, p) => Kaupunki(p, S(o, "a", "data.a"), "a") ?? Kaupunki(p, S(o, "b", "data.b"), "b")),

            Saanto("laatat", "Laattamaarat.Lue", p =>
                {
                    var m = Laattamaarat.Lue(p.Teksti("laatat"));
                    return (m.Yhteensa > 0 ? 1 : 0, $"{m.Yhteensa} laattaa" + (m.Ohitetut.Count > 0 ? $", ohi {string.Join(",", m.Ohitetut)}" : ""));
                })
                .Pakko("maarat|data.counts", O).Pakko("maarat.*|data.counts.*", L),

            Saanto("laatat", "Aarrenimet.LueLaatat", p =>
                {
                    var n = new Aarrenimet(); n.LueLaatat(p.Teksti("laatat"));
                    return (n.Hae(Laattatyypit.PieniAarre, null, null)?.Nimi != null ? 1 : 0, $"{n.Mantereet.Count()} mannerta");
                })
                // Nimi suomeksi (1.30), englanninkielinen vain vanhan paketin varareitti (Paataso.Suomeksi).
                .Pakko("tyypit|data.types", O).Pakko("tyypit.*.nimi|tyypit.*.name|data.types.*.name", T)
                .Voi("tyypit.*.fakta|data.types.*.fakta", T).Voi("tyypit.*.kuva|data.types.*.kuva", T)
                .Voi("mannerTyypit|data.mannerTypes", O).Voi("mannerTyypit.*|data.mannerTypes.*", O)
                .Voi("mannerTyypit.*.*.nimi|mannerTyypit.*.*.name|data.mannerTypes.*.*.name", T)
                .Voi("mannerTyypit.*.*.kuva|data.mannerTypes.*.*.kuva", T),

            Saanto("kysymykset", "Kysymysdata.LueKysymykset", p =>
                {
                    var d = new Kysymysdata(); d.LueKysymykset(p.Teksti("kysymykset"));
                    return (d.Yleiset.Count + d.Vaitteet.Count + d.Kaupungeittain.Sum(x => x.Value.Count),
                        $"{d.Kaupungeittain.Count} kaupunkia, {d.Yleiset.Count} yleistä, {d.Vaitteet.Count} väitettä");
                })
                .Pakko("ryhma|kaupunki", T).Pakko("kysymys|data.q", T)
                .Voi("vaihtoehdot|data.options", A).Voi("vaihtoehdot.*|data.options.*", T | L)
                .Voi("oikea|data.correct", L | B).Voi("taso|data.level", L).Voi("vihje|data.hint", T).Voi("fakta|data.fact", T)
                .Voi("lahde|data.source", T | A).Voi("paikka|data.place", T)
                .Ehto((o, p) =>
                {
                    var ryhma = S(o, "ryhma", "kaupunki");
                    var oikea = Ensimmainen(o, "oikea", "data.correct");
                    if (ryhma == "claims") return oikea is bool ? null : "väitteeltä puuttuu oikea (tosi/epätosi)";
                    if (!(Ensimmainen(o, "vaihtoehdot", "data.options") is List<object> v)) return "puuttuvat vaihtoehdot";
                    if (!(oikea is double i) || i < 0 || i >= v.Count || i != Math.Floor(i)) return "oikea ei ole vaihtoehdon indeksi";
                    return ryhma == "general" ? null : Kaupunki(p, ryhma, "ryhma");
                }),

            Saanto("tarinakaari", "Kysymysdata.LueTarinakaari", p =>
                {
                    var d = new Kysymysdata(); d.LueTarinakaari(p.Teksti("tarinakaari"));
                    return (d.Kaaret.Count, null);
                })
                .Vain(o => Ensimmainen(o, "kysymys", "data.kysymys") is Dictionary<string, object>, "ei kysymystä")
                .Pakko("kaupunki|id", T).Pakko("kysymys.kysymys|data.kysymys.q", T)
                .Pakko("kysymys.vaihtoehdot|data.kysymys.vaihtoehdot", A).Pakko("kysymys.oikea|data.kysymys.oikea", L)
                .Voi(Tai("nimi"), T).Voi(Tai("kysymys.fakta"), T).Uniikki("kaupunki|id"),

            Saanto("tarinakaari", "Kohtaamiset.LueTarinakaari", p =>
                {
                    var k = new Kohtaamiset(); k.LueTarinakaari(p.Teksti("tarinakaari"));
                    return (k.Kaupungit.Count(x => x.Value.KaariKohtaaminen != null), null);
                })
                .Pakko("kaupunki|id", T).Pakko(Tai("kohtaaminen"), T).Pakko(Tai("aarre"), T)
                .Voi(Tai("tunneKohtaaminen"), O).Voi(Tai("tunneKohtaaminen.tunne"), T).Voi(Tai("tunneKohtaaminen.voimakkuus"), L)
                .Voi(Tai("tunneAarre"), O).Voi(Tai("tunneAarre.tunne"), T).Voi(Tai("tunneAarre.voimakkuus"), L)
                .Uniikki("kaupunki|id"),

            Saanto("paikkatiedot", "Kysymysdata.LuePaikkatiedot", p =>
                {
                    var d = new Kysymysdata(); d.LuePaikkatiedot(p.Teksti("paikkatiedot"));
                    return (d.Paikkatiedot.Sum(x => x.Value.Count), $"{d.Paikkatiedot.Count} kaupunkia");
                })
                // Vanha paketti: data on merkkijono (= teksti) tai olio {text, voice, source, wiki}.
                .Pakko("kaupunki", T).Pakko("teksti|data.text|data", T | O)
                .Voi("aani|data.voice", T).Voi("lahde|data.source", T).Voi("wiki|data.wiki", T)
                .Ehto((o, p) => (S(o, "teksti", "data.text") ?? Arvo(o, "data") as string) == null ? "puuttuu teksti" : null)
                .Ehto((o, p) => Kaupunki(p, MiniJson.Teksti(o, "kaupunki"), "kaupunki")),

            Saanto("kohtaamiset", "Kohtaamiset.LueKohtaamiset", p =>
                {
                    var k = new Kohtaamiset(); k.LueKohtaamiset(p.Teksti("kohtaamiset"));
                    return (k.Kaupungit.Count(x => x.Value.Tervehdys != null), null);
                })
                .Pakko("kaupunki|id", T)
                .Pakko(Tai("tervehdys"), T).Pakko(Tai("loyto"), T).Pakko(Tai("tyhja"), T).Pakko(Tai("vaarin"), T)
                .Voi(Tai("hahmo"), T).Voi(Tai("nappi"), T)
                .Voi(Tai("tunneTervehdys.tunne"), T).Voi(Tai("tunneLoyto.tunne"), T).Voi(Tai("tunneTyhja.tunne"), T).Voi(Tai("tunneVaarin.tunne"), T)
                .Voi(Tai("tunneTervehdys.voimakkuus"), L).Voi(Tai("tunneLoyto.voimakkuus"), L).Voi(Tai("tunneTyhja.voimakkuus"), L).Voi(Tai("tunneVaarin.voimakkuus"), L)
                .Uniikki("kaupunki|id"),

            Saanto("kohtaamiskuvat", "Kohtaamiset.LueKohtaamiskuvat", p =>
                {
                    var k = UudetKohtaamiset(p); k.LueKohtaamiskuvat(p.Teksti("kohtaamiskuvat"));
                    return (null, $"kaari {k.Kaupungit.Count(x => x.Value.KaariKuva != null)}, tavallinen {k.Kaupungit.Count(x => x.Value.TavallinenKuva != null)} kaupungissa");
                })
                .Vain(o => S(o, "tila", "data.tila") is string t ? t == "tarkistettu" : true, "tila ≠ tarkistettu")
                .Vain(o => !(Ensimmainen(o, "aktiivinen", "data.aktiivinen") is bool b) || b, "aktiivinen = false")
                .Pakko("url", T).Pakko(Tai("tila"), T)
                // Päätason kaupunki on id; vanhan paketin data.kaupunki on kaupungin nimi (avain kuvaAvain).
                .Voi(Tai("kohde"), T).Voi("kaupunki|data.kaupunki", T).Voi(Tai("aktiivinen"), B)
                .Voi(Tai("alt"), T).Voi(Tai("lyhyt"), T).Voi(Tai("kuvateksti"), T).Voi(Tai("kaytto"), T)
                .Ehto((o, p) =>
                {
                    var avain = Kohtaamiset.KuvaAvain(S(o, "kohde", "data.kohde", "kaupunki", "data.kaupunki"));
                    return Kaupunkiavaimet(p).Any(k => Kohtaamiset.KuvaAvain(k) == avain) || !string.IsNullOrEmpty(MiniJson.Teksti(o, "kaupunki")) ? null : "kaupunki ei ratkea (kohde/kaupunki)";
                }),

            Saanto("paikallisaarteet", "Aarrenimet.LuePaikallisaarteet", p =>
                {
                    var n = new Aarrenimet(); n.LuePaikallisaarteet(p.Teksti("paikallisaarteet"));
                    int maara = p.Alkiot("paikallisaarteet").Select(o => S(o, "maa", "id")).Distinct()
                        .Count(m => n.Hae(Laattatyypit.PieniAarre, null, m) != null || n.Hae(Laattatyypit.IsoAarre, null, m) != null);
                    return (maara, null);
                })
                .Pakko("maa|id", T)
                .Voi(Tai("pieniAarre"), O).Voi(Tai("isoAarre"), O)
                .Voi("pieniAarre.nimi|data.pieniAarre.name", T).Voi("isoAarre.nimi|data.isoAarre.name", T)
                .Voi(Tai("pieniAarre.fakta"), T).Voi(Tai("isoAarre.fakta"), T).Voi(Tai("pieniAarre.kuva"), T).Voi(Tai("isoAarre.kuva"), T)
                .Voi("pieniAarre.url|kuvat.pieniAarre.url", T).Voi("isoAarre.url|kuvat.isoAarre.url", T)
                .Ehto((o, p) => Ensimmainen(o, "pieniAarre.nimi", "isoAarre.nimi", "data.pieniAarre.name", "data.isoAarre.name") == null
                    ? (Paataso.RaakaKielletty ? "ei yhtään aarteen nimeä päätasolla" : "ei yhtään aarteen nimeä") : null)
                .Uniikki("maa|id"),

            Saanto("saannot", "Kohtaamiset.LueSaannot", p =>
                {
                    var k = new Kohtaamiset { KatkoKuvaUrl = null }; k.LueSaannot(p.Teksti("saannot"));
                    return (k.KatkoKuvaUrl != null ? 1 : 0, "KATKOKUVA " + k.KatkoKuvaUrl);
                })
                .Vain(o => MiniJson.Teksti(o, "id") == "KATKOKUVA", "natiivi ei lue (KauppaVakiot)")
                .Pakko("arvo", O).Pakko("arvo.url", T),

            Saanto("elaintayt", "Kauppasisalto.Lue (eläintäyt)", p => (Kauppasisalto.Lue(p.Teksti("elaintayt"), null).Elaintayt.Count, null))
                .Pakko("maa|id", T).Pakko(Tai("elain"), T).Pakko(Tai("otsikko"), T).Pakko(Tai("teksti"), T)
                .Voi(Tai("lahde"), T).Voi("kuva.url|data.kuva", T).Voi(Tai("lat"), L).Voi(Tai("lon"), L)
                .Uniikki("maa|id"),

            Saanto("julisteet", "Kauppasisalto.Lue (julisteet)", p => (Kauppasisalto.Lue(null, p.Teksti("julisteet")).Julisteet.Count, null))
                .Pakko("id", T).Pakko("kuva.url|data.tiedosto", T).Pakko(Tai("otsikko"), T)
                .Voi("kaupunki", T).Voi(Tai("lyhyt"), T).Voi(Tai("selite"), T)
                .Uniikki("id"),

            Saanto("fokusvirrat", "Fokusdata.Lue", p => (Fokusdata.Lue(p.Teksti("fokusvirrat"), lehtitehtavat: p.Teksti("lehtitehtavat")).Kaupunkeja, null))
                .Pakko("kaupunki|id", T)
                .Voi("virta", O).Voi("virta.kohtaaminen|data.kohtaaminen", O)
                .Voi(Tai("kohtaamispiste"), O).Voi(Tai("kohtaamispiste.nimi"), T).Voi(Tai("kohtaamispiste.laudat"), O)
                .Voi(Tai("kohtaamispiste.laudat.maailmankartta.x"), L).Voi(Tai("kohtaamispiste.laudat.maailmankartta.y"), L)
                .Voi(Tai("sahketehtava"), O)
                // Päätaso: id-lista "kaupunki:tehtava" (palkinto kokoelmasta lehtitehtavat); raaka: olioita {id, palkinto}.
                .Voi(Tai("lehtitehtavat"), A).Pakko("lehtitehtavat.*|data.lehtitehtavat.*.id", T)
                // Raaka palkinto luetaan vain, kun päätason listaa ei ole (päätason palkinto: kokoelma lehtitehtavat).
                .Voi("lehtitehtavat.*|data.lehtitehtavat.*.palkinto", T)
                .Ehto((o, p) =>
                {
                    if (!(MiniJson.Kentta(o, "lehtitehtavat") is List<object> idt) || idt.Count == 0) return null;
                    var lt = p.Teksti("lehtitehtavat");
                    if (lt == null) return "päätason lehtitehtavat ilman kokoelmaa lehtitehtavat";
                    var tunnetut = new HashSet<string>(p.Alkiot("lehtitehtavat").Select(x => MiniJson.Teksti(x, "id")).Where(x => x != null));
                    var puuttuu = idt.OfType<string>().FirstOrDefault(x => !tunnetut.Contains(x));
                    return puuttuu == null ? null : $"lehtitehtävä {puuttuu} ei ole kokoelmassa lehtitehtavat";
                })
                .Uniikki("kaupunki|id"),

            Saanto("fokusvirrat", "Sahketehtava.LueKokoelma", p => (Sahketehtava.LueKokoelma(p.Teksti("fokusvirrat")).Count, null))
                .Vain(o => Ensimmainen(o, "sahketehtava", "data.sahketehtava") is Dictionary<string, object>, "ei sähketehtävää")
                .Pakko("kaupunki|id", T).Pakko(Tai("sahketehtava.id"), T).Pakko(Tai("sahketehtava.sahke"), T)
                .Pakko(Tai("sahketehtava.aukot"), A).Pakko(Tai("sahketehtava.aukot.*.id"), T).Pakko(Tai("sahketehtava.aukot.*.tyyppi"), T)
                .Voi(Tai("sahketehtava.aukot.*.otsake"), T).Voi(Tai("sahketehtava.aukot.*.sahkeSana"), T).Voi(Tai("sahketehtava.aukot.*.vihje"), T)
                .Voi(Tai("sahketehtava.aukot.*.oikea"), T | L).Voi(Tai("sahketehtava.aukot.*.oikeat"), A).Voi(Tai("sahketehtava.aukot.*.oikeat.*"), T | L)
                .Voi(Tai("sahketehtava.aukot.*.vapaat"), A).Voi(Tai("sahketehtava.aukot.*.vapaat.*"), T | L)
                .Voi(Tai("sahketehtava.aukot.*.pienin"), L).Voi(Tai("sahketehtava.aukot.*.suurin"), L)
                .Voi(Tai("sahketehtava.hahmo"), T).Voi(Tai("sahketehtava.hakemistoMaa"), T).Voi(Tai("sahketehtava.fakta"), T)
                .Voi(Tai("sahketehtava.palkkio"), L)
                .Voi(Tai("sahketehtava.johdanto"), Kupla).Voi(Tai("sahketehtava.vinkki"), Kupla).Voi(Tai("sahketehtava.linkkiSaate"), Kupla)
                .Voi(Tai("sahketehtava.oikein"), Kupla).Voi(Tai("sahketehtava.odotus"), Kupla).Voi(Tai("sahketehtava.paluu"), Kupla)
                .Voi(Tai("sahketehtava.vastauslinkki"), O).Voi(Tai("sahketehtava.vastauslinkki.tyyppi"), T)
                .Voi(Tai("sahketehtava.vastauslinkki.maa"), T).Voi(Tai("sahketehtava.vastauslinkki.kohde"), T)
                .Voi(Tai("sahketehtava.vastauslinkki.kaupunki"), T).Voi(Tai("sahketehtava.vastauslinkki.sivu"), L)
                .Uniikki("kaupunki|id"),

            Saanto("kuvakysymykset", "Kuvakokoelmat.Lue (kuvat)", p => (Kuvakokoelmat.Lue(p.Teksti("kuvakysymykset"), null).Kuvat.Count, null))
                .Pakko("kaupunki", T).Pakko("tiedosto", T).Pakko("url", T).Voi("lahde", T)
                .Ehto((o, p) => MiniJson.Teksti(o, "url") is string u && !u.StartsWith("https://", StringComparison.Ordinal) ? "url ei ole https" : null)
                .Ehto((o, p) => Kaupunki(p, MiniJson.Teksti(o, "kaupunki"), "kaupunki")),

            Saanto("lippumaat", "Kysymysdata.LueLiput + Kuvakokoelmat", p => (Kuvakokoelmat.Lue(null, p.Teksti("lippumaat")).Liput.Count, null))
                .Pakko("iso", T).Pakko("nimi", T).Pakko("lippu", T).Pakko("url", T)
                .Ehto((o, p) => MiniJson.Teksti(o, "iso")?.Length == 3 ? null : "iso ei ole ISO3")
                .Ehto((o, p) => MiniJson.Teksti(o, "url") is string u && !u.StartsWith("https://", StringComparison.Ordinal) ? "url ei ole https" : null)
                .Uniikki("iso"),

            Saanto("pulmat", "Pulmadata.Lue", p =>
                {
                    var d = Pulmadata.Lue(p.Teksti("pulmat"));
                    return (d.Pulmat.Count, d.Ohitetut.Count > 0 ? "lukija ohitti: " + string.Join("; ", d.Ohitetut) : null);
                })
                // Paataso.Yhdista: päätason kentät (myös id, kaupunki, generaattori, kuvat) voittavat raa'an datan.
                .Pakko("id|data.id", T).Pakko("kaupunki|data.city", T).Pakko("otsikko|data.title", T).Pakko("kysymys|data.q", T)
                .Voi("selite|data.selite", T).Voi("vihje|data.hint", T).Voi("fakta|data.fact", T).Voi("lahde|data.source", T | A)
                .Voi("kuvaLahteet|data.kuvaLahteet", T).Voi("luonnos|data.sketch", O).Voi("kuvat|data.kuvat", A)
                .Voi("vaihtoehdot|data.options", A).Voi("oikea|data.correct", L)
                .Voi("generaattori|data.generaattori", T).Voi("data.generate", T | O)
                .Ehto((o, p) =>
                {
                    var g = S(o, "generaattori", "data.generaattori") ?? (Arvo(o, "data.generate") is Dictionary<string, object> go ? MiniJson.Teksti(go, "$funktio") : S(o, "data.generate"));
                    if (g != null) return Pulmageneraattorit.Hae(g) != null ? null : $"tuntematon generaattori {g}";
                    return Ensimmainen(o, "vaihtoehdot", "data.options") is List<object> && Ensimmainen(o, "oikea", "data.correct") is double ? null : "ei generaattoria eikä vaihtoehtoja";
                })
                .Ehto((o, p) => Kaupunki(p, S(o, "kaupunki", "data.city"), "kaupunki"))
                .Uniikki("id|data.id"),

            Saanto("saapumispuheet", "Luennat.LueSaapumispuheet", p =>
                {
                    var l = new Luennat(); l.LueSaapumispuheet(p.Teksti("saapumispuheet"));
                    return (l.Saapumispuheita, null);
                })
                .Pakko("kaupunki|id", T).Pakko(Tai("url"), T).Voi("teksti|data.text", T).Voi("kesto|data.duration", L)
                .Uniikki("kaupunki|id"),

            Saanto("luennat", "Luennat.LueLuennat", p =>
                {
                    var l = new Luennat(); l.LueLuennat(p.Teksti("luennat"));
                    int erikois = (l.Intro != Luennat.OletusIntro ? 1 : 0) + (l.LentoAlku != Luennat.OletusLentoAlku ? 1 : 0);
                    return (l.Luentoja + erikois, $"{l.Luentoja} kaupunkia + {erikois} (intro, lento-alku)");
                })
                // Lukija: Paataso.Nakyma (päätaso ensin, data-olio vain varalla).
                .Pakko(Tai("id"), T).Pakko(Tai("url"), T)
                .Voi(Tai("kaupunki"), T).Voi(Tai("teksti"), T).Voi(Tai("paikkarivi"), T).Voi(Tai("kesto"), L)
                .Voi(Tai("reaktiot"), A).Voi("reaktiot.*.id", T).Voi("reaktiot.*.ankkuri", T).Voi("reaktiot.*.tarkoitus", T)
                .Voi("reaktiot.*.voimakkuus", L).Voi("reaktiot.*.siirtyma", L)
                .Voi(Tai("reaktioHetket"), O).Voi("reaktioHetket.*", L)
                .Ehto((o, p) =>
                {
                    var id = S(o, "id", "data.id");
                    return id == "intro" || id == "lento-alku" || S(o, "kaupunki", "data.kaupunki") != null ? null : "kaupunkiluennolta puuttuu kaupunki";
                })
                .Uniikki(Tai("kaupunki")),

            // AANITAULUT (B7, Peli/Aani/AaniTaulut.cs): rivit, jotka natiivi lukee; muut lajit ohitetaan.
            // Kentät päätasolla skeemasta 1.30 (v38); vanha paketti data.* (Paataso.Nakyma).
            Saanto("aanitaulut", "AaniTaulut.LueAanitaulut", p =>
                {
                    var t = new AaniTaulut { Pohjaraita = null };
                    int korit = t.LueAanitaulut(p.Teksti("aanitaulut"));
                    int maara = t.Siirtymat.Count + t.Tilaraidat.Count + t.Paikkaraidat.Count + t.Pulut.Count + korit
                        + (t.Pohjaraita != null ? 1 : 0) + (t.AarreTavallinen != null ? 1 : 0) + (t.AarrePaa != null ? 1 : 0);
                    return (maara, $"{t.Siirtymat.Count} siirtymää, {t.Tilaraidat.Count} tila-, {t.Paikkaraidat.Count} paikkaraitaa, {t.Pulut.Count} pulua, {korit} koria");
                })
                .Vain(o => AanitaulunLajit.Contains(MiniJson.Teksti(o, "laji") ?? ""), "laji, jota natiivi ei lue")
                .Pakko("id", T).Pakko("laji", T).Voi("nimi", T)
                .Voi(Tai("ryhma"), T).Voi(Tai("ampari"), T).Voi(Tai("oma"), T).Voi(Tai("voima"), L)
                .Voi(Tai("nousuMs"), L).Voi(Tai("laskuMs"), L)
                .Voi(Tai("tunnus"), T).Voi(Tai("kuvaus"), T).Voi(Tai("kesto"), L).Voi("juuri", T)
                .Voi("paikka", T).Voi("tyyppi", T).Voi("porras", T).Voi("vakio", B).Voi("kori", A).Voi("kori.*", T)
                .Ehto((o, p) => MiniJson.Teksti(o, "laji") switch
                {
                    "siirtyma" => Vaadi(o, "nimi", "ryhma", "ampari", "oma", "voima")
                        ?? (S(o, "ryhma", "data.ryhma") is string r && r != "siirtyma" && r != "linssi" ? $"tuntematon ryhmä '{r}'" : null),
                    "tilaraita" or "paikkaraita" => Vaadi(o, "nimi", "tunnus"),
                    "pulu" => Vaadi(o, "nimi", "juuri", "tunnus", "kesto", "voima"),
                    "pohjaraita" => Vaadi(o, "nimi"),
                    "aarreaihe" => Vaadi(o, "nimi", "tunnus")
                        ?? (MiniJson.Teksti(o, "nimi") is string n && n != "paa" && n != "tavallinen" ? $"tuntematon aarreaihe '{n}'" : null),
                    "maisemakori" => Vaadi(o, "paikka", "kori"),
                    _ => null,
                })
                .Uniikki("id"),
        };

        /// <summary>Äänitaulujen lajit, jotka AaniTaulut.LueAanitaulut lukee (muut: viritys, tehoste, ambienssi, musiikkiketju, tilaraitaUrl).</summary>
        static readonly HashSet<string> AanitaulunLajit = new HashSet<string>
            { "siirtyma", "tilaraita", "paikkaraita", "pulu", "pohjaraita", "aarreaihe", "maisemakori" };

        /// <summary>Ensimmäinen puuttuva kenttä (päätaso tai raakana data.&lt;kenttä&gt;, raakakielto huomioiden) tai null.</summary>
        static string Vaadi(Dictionary<string, object> o, params string[] kentat)
        {
            foreach (var k in kentat)
                if (Ensimmainen(o, k, "data." + k) == null)
                    return Paataso.RaakaKielletty && Arvot(o, "data." + k).Any(x => x.Arvo != null) ? $"vain raakadatassa: {k}" : $"puuttuu {k}";
            return null;
        }

        /// <summary>Raakadatan lukukohdat, joita vartija ei näe kentistä (kirjataan tulosteeseen).</summary>
        public static readonly string[] MuutRaakaluvut =
        {
            "Paataso (Peli/Paataso.cs): Raaka, RaakaArvo, Nakyma, Olio, Yhdista = lukijoiden ainoa varareitti data-olioon, kun päätason kenttä puuttuu (kytkin Paataso.RaakaKielletty)",
            "PeliOhjain.HaeAanitaulut (Scripts/Peli/PeliOhjain.Aanet.cs): moduulit/js/aani-ehdokkaat.json, kun paketissa ei maisemakoreja (skeema < 1.22); ohitetaan raakakiellolla",
            "Laattamaarat.Lue (Peli/Laatat.cs): webin moduulimuoto exportit (vain testit; raakakiellolla FormatException). PeliOhjainin moduulivarareitti poistettu 24.9.2026",
            "SisaltoTuonti.LueReitit: data.fee (Paataso.Raaka), vain kun päätason maksu puuttuu (≤ 1.29); fee ei ole yhdessäkään paketissa, joten käytännössä web SEA_FEE",
            "UI/ (Natiivi-UI, ei tässä vartijassa): päätaso ensin (natiivi-ui/paataso); jäljellä Pulu/Fokusvirrat, Lehti/LehtiSisalto ja Pulu/PuluHaku (v38:n päätaso eri rakenteessa, Siirtosepän kenttäkartta)",
        };

        // --- tarkistus -----------------------------------------------------

        /// <summary>Skeemaversiot, joista alkaen kenttä kuuluu kokoelman alkioihin (RAJAPINTA.md, Siirtoseppä).</summary>
        public static readonly (string Versio, string Kokoelma, string Kentta)[] LuvatutKentat =
        {
            ("1.10", "kaupungit", "korkeus"),
            ("1.10", "luennat", "reaktiot"),
            ("1.10", "luennat", "tekstiSha256"),
            ("1.30", "reitit", "maksu"),
        };

        public static Vartijatulos Tarkista(Paketti p, IEnumerable<Lukijasaanto> saannot = null)
        {
            var tulos = new Vartijatulos { Paketti = p, RaakaKielletty = Paataso.RaakaKielletty };
            var lista = saannot?.ToList() ?? Saannot.ToList();

            // 1. Skeemaversio (osoitin ja manifesti).
            var ov = MiniJson.Teksti(p.Osoitin, "skeemaversio");
            var mv = MiniJson.Teksti(p.Manifest, "skeemaversio");
            foreach (var (mista, v) in new[] { ("osoitin", ov), ("manifest", mv) })
                if (v != null && !Pakettiskeema.Tunnettu(v))
                    tulos.Virheet.Add($"{mista}: tuntematon skeemaversio {v} (lukijat tuntevat {Pakettiskeema.Major}.{Pakettiskeema.PieninMinor}–{Pakettiskeema.Major}.{Pakettiskeema.SuurinMinor} ja {Pakettiskeema.SuurinMajor}.0–{Pakettiskeema.SuurinMajor}.{Pakettiskeema.SuurinMinor2})");
            if (ov == null && mv == null) tulos.Virheet.Add("skeemaversio puuttuu osoittimesta ja manifestista");
            if (ov != null && mv != null && ov != mv) tulos.Virheet.Add($"osoittimen skeemaversio {ov} ≠ manifestin {mv}");
            var manifestKokoelmat = (MiniJson.Kentta(p.Manifest, "kokoelmat") as List<object> ?? new List<object>())
                .OfType<Dictionary<string, object>>().Where(k => MiniJson.Teksti(k, "nimi") != null)
                .GroupBy(k => MiniJson.Teksti(k, "nimi")).ToDictionary(g => g.Key, g => g.First());

            // 2. Kokoelmien rungot.
            foreach (var nimi in lista.Select(s => s.Kokoelma).Distinct())
            {
                string teksti = p.Teksti(nimi);
                if (teksti == null) { tulos.Virheet.Add($"{nimi}: kokoelma puuttuu paketista"); continue; }
                Dictionary<string, object> runko;
                try { runko = p.Runko(nimi); }
                catch (Exception e) { tulos.Virheet.Add($"{nimi}: JSON ei jäsenny: {e.Message}"); continue; }
                if (runko == null) { tulos.Virheet.Add($"{nimi}: runko ei ole olio"); continue; }
                var skeema = MiniJson.Teksti(runko, "$skeema");
                // Kokoelman major = paketin major (1.x → /1/, 2.0 → /2/); ilman skeemaversiota 1.
                int major = Pakettiskeema.MajorOf(p.Skeemaversio) is int m && m > 0 ? m : Pakettiskeema.Major;
                if (skeema != null && !Pakettiskeema.TunnettuKokoelmaskeema(skeema, major)) tulos.Virheet.Add($"{nimi}: tuntematon $skeema {skeema}");
                if (MiniJson.Teksti(runko, "nimi") != nimi) tulos.Virheet.Add($"{nimi}: runko.nimi = {MiniJson.Teksti(runko, "nimi") ?? "null"}");
                if (!(MiniJson.Kentta(runko, "alkiot") is List<object> alkiot)) { tulos.Virheet.Add($"{nimi}: alkiot ei ole taulukko"); continue; }
                if (alkiot.Any(a => !(a is Dictionary<string, object>))) tulos.Virheet.Add($"{nimi}: alkio, joka ei ole olio");
                if (manifestKokoelmat.TryGetValue(nimi, out var mk))
                {
                    if (MiniJson.Luku(mk, "lkm") is double lkm && (int)lkm != alkiot.Count) tulos.Virheet.Add($"{nimi}: manifestin lkm {lkm} ≠ alkiot {alkiot.Count}");
                    if (MiniJson.Teksti(mk, "sha256") is string sha && sha != Sha256(teksti)) tulos.Virheet.Add($"{nimi}: sha256 ei täsmää manifestiin (kopio rikki tai eri versio)");
                }
                else if (manifestKokoelmat.Count > 0) tulos.Huomiot.Add($"{nimi}: ei manifestissa");
            }

            // 3–4. Säännöt alkioittain ja lukijat.
            foreach (var s in lista)
            {
                if (p.Teksti(s.Kokoelma) == null) continue;
                var rivi = TarkistaSaanto(p, s, tulos);
                tulos.Rivit.Add(rivi);
            }

            // 5. Skeeman lupaamat kentät (Fable/Siirtoseppä 24.9.2026): ämpärin v11 ilmoittaa 1.10:n,
            // mutta koottiin varhaisesta 1.10-koepaketista ilman näitä. Lukijat sietävät puuttuvan,
            // joten puute on varoitus, ei virhe, kunnes skeemasopimus (tunnuskentät + tiiviste) valvoo sen.
            foreach (var (versio, kokoelma, kentta) in LuvatutKentat)
            {
                if (!Pakettiskeema.Vahintaan(p.Skeemaversio, versio) || p.Teksti(kokoelma) == null) continue;
                var alkiot = p.Alkiot(kokoelma).ToList();
                if (alkiot.Count > 0 && !alkiot.Any(o => o.ContainsKey(kentta)))
                    tulos.Varoitukset.Add($"{kokoelma}.{kentta} puuttuu kaikista alkioista, vaikka skeema {p.Skeemaversio} ≥ {versio} lupaa sen");
            }
            return tulos;
        }

        static void Kirjaa(Dictionary<string, List<string>> syyt, string syy, string id)
        {
            if (!syyt.TryGetValue(syy, out var l)) syyt[syy] = l = new List<string>();
            l.Add(id);
        }

        static Vartijarivi TarkistaSaanto(Paketti p, Lukijasaanto s, Vartijatulos tulos)
        {
            var rivi = new Vartijarivi { Kokoelma = s.Kokoelma, Lukija = s.Lukija };
            var avaimet = new HashSet<string>();
            int indeksi = 0;
            List<Dictionary<string, object>> alkiot;
            try { alkiot = p.Alkiot(s.Kokoelma).ToList(); }
            catch (Exception e) { tulos.Virheet.Add($"{s.Kokoelma}: {e.Message}"); return rivi; }
            foreach (var o in alkiot)
            {
                rivi.Alkioita++;
                var id = MiniJson.Teksti(o, "id") ?? "#" + indeksi;
                indeksi++;
                // Suodin kuvaa sisältöä (esim. "ei sähketehtävää"), joten se katsoo myös raakaa dataa;
                // raakakiellon rikkeet näkyvät kenttien tarkistuksessa.
                var kielto = Paataso.RaakaKielletty;
                Paataso.RaakaKielletty = false;
                (Func<Dictionary<string, object>, bool> Ehto, string Syy) ohitus;
                try { ohitus = s.Suotimet.FirstOrDefault(x => !x.Ehto(o)); }
                finally { Paataso.RaakaKielletty = kielto; }
                if (ohitus.Ehto != null) { rivi.Ohitettu++; Kirjaa(rivi.Ohitussyyt, ohitus.Syy, id); continue; }

                var syyt = new List<string>();
                bool raaka = false;
                foreach (var k in s.Kentat)
                {
                    bool loytyi = false, vainRaaka = false;
                    foreach (var polku in k.Polut)
                    {
                        var arvot = Arvot(o, polku).ToList();
                        // Tähdellinen polku löytyy, kun säiliö on (tyhjä taulukko = ei tarkistettavaa).
                        int tahti = polku.IndexOf(".*", StringComparison.Ordinal);
                        bool onArvo = tahti >= 0 ? Arvot(o, polku.Substring(0, tahti)).Any(x => x.Arvo != null) : arvot.Any(x => x.Arvo != null);
                        if (Paataso.RaakaKielletty && OnRaaka(polku)) { vainRaaka |= onArvo; continue; }
                        if (!onArvo) continue;
                        loytyi = true;
                        if (OnRaaka(polku)) { raaka = true; rivi.RaakaPolut[polku] = rivi.RaakaPolut.TryGetValue(polku, out var n) ? n + 1 : 1; }
                        foreach (var (pp, arvo) in arvot)
                        {
                            if (arvo == null) { if (k.Pakollinen) syyt.Add($"puuttuu {Yleista(pp)}"); continue; }
                            var t = TyyppiOf(arvo);
                            if (t == null || !k.Tyyppi.HasFlag(t.Value))
                                syyt.Add($"{Yleista(pp)}: odotettu {TyyppiNimi(k.Tyyppi)}, saatu {(t.HasValue ? TyyppiNimi(t.Value) : "?")}");
                        }
                        break;
                    }
                    // Tähdellinen pakollinen kenttä koskee alkioita: puuttuva säiliö ei ole virhe (säiliö erikseen Pakko).
                    if (!loytyi && k.Pakollinen && (vainRaaka || !k.Polut.All(x => x.Contains("*")))) syyt.Add(vainRaaka ? $"vain raakadatassa: {k.Nimi}" : $"puuttuu {k.Nimi}");
                }
                if (syyt.Count == 0)
                    foreach (var e in s.Ehdot)
                    {
                        string syy;
                        try { syy = e(o, p); } catch (Exception x) { syy = "ehto kaatui: " + x.Message; }
                        if (syy != null) { syyt.Add(syy); break; }
                    }
                if (syyt.Count == 0 && s.Avain != null && s.Avain(o) is string avain && !avaimet.Add(avain))
                    syyt.Add($"kaksoisavain {avain}");
                if (syyt.Count > 0) { rivi.Hylatty++; foreach (var syy in syyt.Distinct()) Kirjaa(rivi.Hylkayssyyt, syy, id); }
                else { rivi.Luettu++; if (raaka) rivi.Raaka++; }
            }

            string tunnus = $"{s.Kokoelma} / {s.Lukija}";
            if (rivi.Hylatty > 0)
                tulos.Virheet.Add($"{tunnus}: hylätty {rivi.Hylatty}: " + string.Join("; ", rivi.Hylkayssyyt.Take(3).Select(kv => $"{kv.Key} ({kv.Value.Count})")));
            if (rivi.Luettu < s.VahintaanLuettu)
                tulos.Virheet.Add($"{tunnus}: luettu {rivi.Luettu} < {s.VahintaanLuettu}");
            try
            {
                var (maara, kuvaus) = s.Aja(p);
                rivi.LukijanMaara = maara; rivi.LukijanKuvaus = kuvaus;
                if (maara.HasValue && rivi.Hylatty == 0 && maara.Value != rivi.Luettu)
                    tulos.Virheet.Add($"{tunnus}: lukija luki {maara}, vartija hyväksyi {rivi.Luettu} (sääntö ja lukija eri mieltä)");
            }
            catch (Exception e)
            {
                rivi.LukijanKuvaus = "KAATUI: " + e.Message;
                tulos.Virheet.Add($"{tunnus}: lukija kaatui: {e.GetType().Name}: {e.Message}");
            }
            return rivi;
        }

        /// <summary>"a.3.b" → "a.*.b" syiden ryhmittelyyn.</summary>
        static string Yleista(string polku) =>
            string.Join(".", polku.Split('.').Select(x => x.Length > 0 && x.All(char.IsDigit) ? "*" : x));

        public static string Sha256(string teksti)
        {
            using var sha = SHA256.Create();
            return string.Concat(sha.ComputeHash(Encoding.UTF8.GetBytes(teksti)).Select(b => b.ToString("x2")));
        }

        // --- tuloste -------------------------------------------------------

        public static void Tulosta(Vartijatulos t)
        {
            var p = t.Paketti;
            Console.WriteLine($"  PAKETTIVARTIJA {p.Nimi}");
            Console.WriteLine($"  versio {p.Versio}, skeema {p.Skeemaversio ?? "?"}, julkaistu {MiniJson.Teksti(p.Osoitin, "julkaistu") ?? "?"}, commit {MiniJson.Teksti(p.Osoitin, "commit") ?? "?"}"
                + $"; raakadata {(t.RaakaKielletty ? "KIELLETTY (vaihe 2)" : "sallittu")}");
            Console.WriteLine($"  {"kokoelma",-16} {"lukija",-38} {"alkiot",6} {"luettu",6} {"ohitettu",8} {"hylätty",7} {"raaka",5}  lukijan tulos");
            foreach (var r in t.Rivit)
            {
                var lukija = (r.LukijanMaara.HasValue ? r.LukijanMaara.Value.ToString(CultureInfo.InvariantCulture) : "–")
                    + (r.LukijanKuvaus != null ? " (" + r.LukijanKuvaus + ")" : "");
                Console.WriteLine($"  {r.Kokoelma,-16} {r.Lukija,-38} {r.Alkioita,6} {r.Luettu,6} {r.Ohitettu,8} {r.Hylatty,7} {r.Raaka,5}  {lukija}");
                foreach (var kv in r.Ohitussyyt) Console.WriteLine($"  {"",-16}   ohitettu {kv.Value.Count}: {kv.Key}");
                foreach (var kv in r.Hylkayssyyt)
                    Console.WriteLine($"  {"",-16}   HYLÄTTY {kv.Value.Count}: {kv.Key} — esim. {string.Join(", ", kv.Value.Take(4))}");
            }
            Console.WriteLine("  Raakadatan (data.*) lukukohdat, joita lukijat nyt käyttävät:");
            foreach (var g in t.Rivit.Where(r => r.RaakaPolut.Count > 0))
                Console.WriteLine($"    {g.Kokoelma} / {g.Lukija}: {string.Join(", ", g.RaakaPolut.Select(kv => $"{kv.Key} {kv.Value}"))}");
            foreach (var m in MuutRaakaluvut) Console.WriteLine("    " + m);
            foreach (var h in t.Huomiot) Console.WriteLine("  huom: " + h);
            foreach (var v in t.Varoitukset) Console.WriteLine("  VAROITUS: " + v);
            if (t.Vihrea) Console.WriteLine($"  VIHREÄ: {t.Rivit.Sum(r => r.Luettu)} alkiota luettu, {t.Rivit.Sum(r => r.Ohitettu)} ohitettu, 0 hylätty");
            else
            {
                Console.WriteLine($"  PUNAINEN: {t.Virheet.Count} virhettä");
                foreach (var v in t.Virheet) Console.WriteLine("    - " + v);
            }
        }

        // --- paketin haku (vain lipulla) ------------------------------------

        /// <summary>Kokoelmat, jotka paikallinen kopio ja haku sisältävät (säännöt + lehtitehtavat Fokusdatalle).</summary>
        public static IEnumerable<string> KopioitavatKokoelmat => Saannot.Select(s => s.Kokoelma).Append("lehtitehtavat").Distinct();

        /// <summary>
        /// Hakee tuotantopaketin osoittimesta kansioon kohde/{uusin.json, v&lt;N&gt;/manifest.json,
        /// v&lt;N&gt;/kokoelmat/*.json}. Manifestista jätetään vain skeema ja kokoelmat (moduulit, media ym. ovat suuria).
        /// Jokaisen kokoelman sha256 tarkistetaan manifestia vasten. Lataus curlilla (ämpärin CORS ei koske sitä; välityspalvelin HTTPS_PROXY).
        /// </summary>
        public static string Hae(string osoitin, string kohde)
        {
            string Lataa(string url)
            {
                var ps = new ProcessStartInfo("curl", "-fsSL --retry 3 --max-time 120 -A matkakirja-pakettivartija/1 \"" + url + "\"")
                    { RedirectStandardOutput = true, RedirectStandardError = true, StandardOutputEncoding = new UTF8Encoding(false) };
                using var pr = Process.Start(ps);
                var ulos = pr.StandardOutput.ReadToEnd();
                var virhe = pr.StandardError.ReadToEnd();
                pr.WaitForExit();
                if (pr.ExitCode != 0) throw new Exception($"curl {url}: {pr.ExitCode} {virhe.Trim()}");
                return ulos;
            }
            var osoitinTeksti = Lataa(osoitin);
            var o = MiniJson.Objekti(MiniJson.Jasenna(osoitinTeksti));
            var polku = MiniJson.Teksti(o, "polku") ?? throw new Exception("osoittimessa ei polkua");
            var juuri = osoitin.Substring(0, osoitin.IndexOf("sisalto/", StringComparison.Ordinal));
            var manifest = MiniJson.Objekti(MiniJson.Jasenna(Lataa(juuri + polku + "manifest.json")));
            var vkansio = Path.Combine(kohde, polku.TrimEnd('/').Substring(polku.TrimEnd('/').LastIndexOf('/') + 1));
            var valiaikainen = Path.Combine(kohde, ".uusi-" + Path.GetFileName(vkansio));
            if (Directory.Exists(valiaikainen)) Directory.Delete(valiaikainen, true);
            Directory.CreateDirectory(Path.Combine(valiaikainen, "kokoelmat"));
            var kokoelmat = (MiniJson.Kentta(manifest, "kokoelmat") as List<object> ?? new List<object>()).OfType<Dictionary<string, object>>().ToList();
            foreach (var nimi in KopioitavatKokoelmat)
            {
                var mk = kokoelmat.FirstOrDefault(k => MiniJson.Teksti(k, "nimi") == nimi);
                if (mk == null) { Console.WriteLine($"  haku: {nimi} ei ole manifestissa"); continue; }
                var tiedosto = MiniJson.Teksti(mk, "tiedosto") ?? $"kokoelmat/{nimi}.json";
                var teksti = Lataa(juuri + polku + tiedosto);
                if (MiniJson.Teksti(mk, "sha256") is string sha && sha != Sha256(teksti)) throw new Exception($"{nimi}: ladatun sha256 ei täsmää manifestiin");
                File.WriteAllText(Path.Combine(valiaikainen, "kokoelmat", nimi + ".json"), teksti, new UTF8Encoding(false));
            }
            var ote = new Dictionary<string, object>
            {
                ["$skeema"] = MiniJson.Kentta(manifest, "$skeema"),
                ["skeemaversio"] = MiniJson.Kentta(manifest, "skeemaversio"),
                ["$ote"] = "Pakettivartijan ote: vain skeema ja kokoelmat (Peli-testit/Testit/Pakettivartija.cs Hae).",
                ["kokoelmat"] = MiniJson.Kentta(manifest, "kokoelmat"),
            };
            var sb = new StringBuilder(); Json.Kirjoita(sb, ote);
            File.WriteAllText(Path.Combine(valiaikainen, "manifest.json"), sb.ToString() + "\n", new UTF8Encoding(false));
            foreach (var vanha in Directory.Exists(kohde) ? Directory.GetDirectories(kohde, "v*") : new string[0]) Directory.Delete(vanha, true);
            Directory.Move(valiaikainen, vkansio);
            File.WriteAllText(Path.Combine(kohde, "uusin.json"), osoitinTeksti, new UTF8Encoding(false));
            return kohde;
        }
    }
}
