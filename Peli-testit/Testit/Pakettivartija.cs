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
//
// Lukijat (kaanna.sh:n tiedostot): SisaltoTuonti, Reittiverkko, Laattamaarat, Aarrenimet,
// Kysymysdata, Kohtaamiset, Kuvakokoelmat, Pulmadata, Kauppasisalto, Fokusdata, Sahketehtava,
// Luennat. Laukku ja Lento eivät lue pakettia suoraan (Laukku saa Aarrenimet ja Kauppasisallon).
// AaniTaulut (B7, haara pelikoodari/aani-logiikka) liitetään kohtaan "AANITAULUT" alla.
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
        public readonly List<Vartijarivi> Rivit = new List<Vartijarivi>();
        public readonly List<string> Virheet = new List<string>();
        public readonly List<string> Huomiot = new List<string>();
        public bool Vihrea => Virheet.Count == 0;
    }

    static class Pakettivartija
    {
        const JsonTyyppi T = JsonTyyppi.Teksti, L = JsonTyyppi.Luku, B = JsonTyyppi.Totuus, O = JsonTyyppi.Olio, A = JsonTyyppi.Taulukko;

        public const string OsoitinOletus = "https://media.matkakirja.app/sisalto/1/uusin.json";
        public const string KoepakettiOletus = "/Users/Shared/Claude/sisalto-koe";

        // --- polut -------------------------------------------------------

        static bool OnRaaka(string polku) => polku == "data" || polku.StartsWith("data.", StringComparison.Ordinal);

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
                .Pakko("data.a|a", T).Pakko("data.b|b", T).Pakko("laji", T)
                .Voi("data.steps", L).Voi("data.type", T).Voi("data.fee", L)
                .Ehto((o, p) => MiniJson.Teksti(o, "laji") is string l && l != "maa" && l != "sea" && l != "lento" ? $"tuntematon laji '{l}'" : null)
                .Ehto((o, p) => MiniJson.Teksti(o, "laji") != "lento" && Arvo(o, "data.steps") == null ? "puuttuu data.steps (maa/meri)" : null)
                .Ehto((o, p) => Kaupunki(p, S(o, "data.a", "a"), "a") ?? Kaupunki(p, S(o, "data.b", "b"), "b")),

            Saanto("laatat", "Laattamaarat.Lue", p =>
                {
                    var m = Laattamaarat.Lue(p.Teksti("laatat"));
                    return (m.Yhteensa > 0 ? 1 : 0, $"{m.Yhteensa} laattaa" + (m.Ohitetut.Count > 0 ? $", ohi {string.Join(",", m.Ohitetut)}" : ""));
                })
                .Pakko("data.counts", O).Pakko("data.counts.*", L),

            Saanto("laatat", "Aarrenimet.LueLaatat", p =>
                {
                    var n = new Aarrenimet(); n.LueLaatat(p.Teksti("laatat"));
                    return (n.Hae(Laattatyypit.PieniAarre, null, null)?.Nimi != null ? 1 : 0, $"{n.Mantereet.Count()} mannerta");
                })
                .Pakko("data.types", O).Pakko("data.types.*.name", T).Voi("data.types.*.fakta", T).Voi("data.types.*.kuva", T)
                .Voi("data.mannerTypes", O).Voi("data.mannerTypes.*", O).Voi("data.mannerTypes.*.*.name", T).Voi("data.mannerTypes.*.*.kuva", T),

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
                .Vain(o => Arvo(o, "data.kysymys") is Dictionary<string, object>, "ei kysymystä")
                .Pakko("kaupunki|data.id", T).Pakko("data.kysymys.q", T).Pakko("data.kysymys.vaihtoehdot", A).Pakko("data.kysymys.oikea", L)
                .Voi("data.nimi", T).Voi("data.kysymys.fakta", T).Uniikki("kaupunki|data.id"),

            Saanto("tarinakaari", "Kohtaamiset.LueTarinakaari", p =>
                {
                    var k = new Kohtaamiset(); k.LueTarinakaari(p.Teksti("tarinakaari"));
                    return (k.Kaupungit.Count(x => x.Value.KaariKohtaaminen != null), null);
                })
                .Pakko("kaupunki|id", T).Pakko("data", O).Pakko("data.kohtaaminen", T).Pakko("data.aarre", T)
                .Voi("data.tunneKohtaaminen", O).Voi("data.tunneKohtaaminen.tunne", T).Voi("data.tunneKohtaaminen.voimakkuus", L)
                .Voi("data.tunneAarre", O).Voi("data.tunneAarre.tunne", T).Voi("data.tunneAarre.voimakkuus", L)
                .Uniikki("kaupunki|id"),

            Saanto("paikkatiedot", "Kysymysdata.LuePaikkatiedot", p =>
                {
                    var d = new Kysymysdata(); d.LuePaikkatiedot(p.Teksti("paikkatiedot"));
                    return (d.Paikkatiedot.Sum(x => x.Value.Count), $"{d.Paikkatiedot.Count} kaupunkia");
                })
                .Pakko("kaupunki", T).Pakko("data", T | O)
                .Voi("data.text", T).Voi("data.voice", T).Voi("data.source", T).Voi("data.wiki", T)
                .Ehto((o, p) => Arvo(o, "data") is Dictionary<string, object> && Arvo(o, "data.text") == null ? "oliolta puuttuu data.text" : null)
                .Ehto((o, p) => Kaupunki(p, MiniJson.Teksti(o, "kaupunki"), "kaupunki")),

            Saanto("kohtaamiset", "Kohtaamiset.LueKohtaamiset", p =>
                {
                    var k = new Kohtaamiset(); k.LueKohtaamiset(p.Teksti("kohtaamiset"));
                    return (k.Kaupungit.Count(x => x.Value.Tervehdys != null), null);
                })
                .Pakko("kaupunki|id", T).Pakko("data", O)
                .Pakko("data.tervehdys", T).Pakko("data.loyto", T).Pakko("data.tyhja", T).Pakko("data.vaarin", T)
                .Voi("data.hahmo", T).Voi("data.nappi", T)
                .Voi("data.tunneTervehdys.tunne", T).Voi("data.tunneLoyto.tunne", T).Voi("data.tunneTyhja.tunne", T).Voi("data.tunneVaarin.tunne", T)
                .Voi("data.tunneTervehdys.voimakkuus", L).Voi("data.tunneLoyto.voimakkuus", L).Voi("data.tunneTyhja.voimakkuus", L).Voi("data.tunneVaarin.voimakkuus", L)
                .Uniikki("kaupunki|id"),

            Saanto("kohtaamiskuvat", "Kohtaamiset.LueKohtaamiskuvat", p =>
                {
                    var k = UudetKohtaamiset(p); k.LueKohtaamiskuvat(p.Teksti("kohtaamiskuvat"));
                    return (null, $"kaari {k.Kaupungit.Count(x => x.Value.KaariKuva != null)}, tavallinen {k.Kaupungit.Count(x => x.Value.TavallinenKuva != null)} kaupungissa");
                })
                .Vain(o => MiniJson.Teksti(Arvo(o, "data") as Dictionary<string, object>, "tila") is string t ? t == "tarkistettu" : true, "tila ≠ tarkistettu")
                .Vain(o => !(Arvo(o, "data.aktiivinen") is bool b) || b, "aktiivinen = false")
                .Pakko("url", T).Pakko("data", O).Pakko("data.tila", T)
                .Voi("data.kohde", T).Voi("data.kaupunki", T).Voi("kaupunki", T).Voi("data.aktiivinen", B)
                .Voi("data.alt", T).Voi("data.lyhyt", T).Voi("data.kuvateksti", T).Voi("data.kaytto", T)
                .Ehto((o, p) =>
                {
                    var avain = Kohtaamiset.KuvaAvain(S(o, "data.kohde", "data.kaupunki"));
                    return Kaupunkiavaimet(p).Any(k => Kohtaamiset.KuvaAvain(k) == avain) || !string.IsNullOrEmpty(MiniJson.Teksti(o, "kaupunki")) ? null : "kaupunki ei ratkea (kohde/kaupunki)";
                }),

            Saanto("paikallisaarteet", "Aarrenimet.LuePaikallisaarteet", p =>
                {
                    var n = new Aarrenimet(); n.LuePaikallisaarteet(p.Teksti("paikallisaarteet"));
                    int maara = p.Alkiot("paikallisaarteet").Select(o => S(o, "maa", "id")).Distinct()
                        .Count(m => n.Hae(Laattatyypit.PieniAarre, null, m) != null || n.Hae(Laattatyypit.IsoAarre, null, m) != null);
                    return (maara, null);
                })
                .Pakko("maa|id", T).Pakko("data", O)
                .Voi("data.pieniAarre", O).Voi("data.isoAarre", O)
                .Voi("data.pieniAarre.name", T).Voi("data.isoAarre.name", T).Voi("data.pieniAarre.fakta", T).Voi("data.isoAarre.fakta", T)
                .Voi("data.pieniAarre.kuva", T).Voi("data.isoAarre.kuva", T)
                .Voi("kuvat", O).Voi("kuvat.pieniAarre.url", T).Voi("kuvat.isoAarre.url", T)
                .Ehto((o, p) => Arvo(o, "data.pieniAarre.name") == null && Arvo(o, "data.isoAarre.name") == null ? "ei yhtään aarteen nimeä" : null)
                .Uniikki("maa|id"),

            Saanto("saannot", "Kohtaamiset.LueSaannot", p =>
                {
                    var k = new Kohtaamiset { KatkoKuvaUrl = null }; k.LueSaannot(p.Teksti("saannot"));
                    return (k.KatkoKuvaUrl != null ? 1 : 0, "KATKOKUVA " + k.KatkoKuvaUrl);
                })
                .Vain(o => MiniJson.Teksti(o, "id") == "KATKOKUVA", "natiivi ei lue (KauppaVakiot)")
                .Pakko("arvo", O).Pakko("arvo.url", T),

            Saanto("elaintayt", "Kauppasisalto.Lue (eläintäyt)", p => (Kauppasisalto.Lue(p.Teksti("elaintayt"), null).Elaintayt.Count, null))
                .Pakko("maa|id", T).Pakko("data", O)
                .Voi("data.elain", T).Voi("data.otsikko", T).Voi("data.teksti", T).Voi("data.lahde", T).Voi("data.kuva", T)
                .Voi("data.lat", L).Voi("data.lon", L)
                .Uniikki("maa|id"),

            Saanto("julisteet", "Kauppasisalto.Lue (julisteet)", p => (Kauppasisalto.Lue(null, p.Teksti("julisteet")).Julisteet.Count, null))
                .Pakko("id", T).Pakko("data", O).Pakko("data.tiedosto", T).Pakko("data.otsikko", T)
                .Voi("kaupunki", T).Voi("data.lyhyt", T).Voi("data.selite", T)
                .Uniikki("id"),

            Saanto("fokusvirrat", "Fokusdata.Lue", p => (Fokusdata.Lue(p.Teksti("fokusvirrat")).Kaupunkeja, null))
                .Pakko("kaupunki|id", T).Pakko("data", O)
                .Voi("data.kohtaamispiste", O).Voi("data.kohtaamispiste.nimi", T).Voi("data.kohtaamispiste.laudat", O)
                .Voi("data.kohtaamispiste.laudat.maailmankartta.x", L).Voi("data.kohtaamispiste.laudat.maailmankartta.y", L)
                .Voi("data.lehtitehtavat", A).Pakko("data.lehtitehtavat.*.id", T).Voi("data.lehtitehtavat.*.palkinto", T)
                .Uniikki("kaupunki|id"),

            Saanto("fokusvirrat", "Sahketehtava.LueKokoelma", p => (Sahketehtava.LueKokoelma(p.Teksti("fokusvirrat")).Count, null))
                .Vain(o => Arvo(o, "data.sahketehtava") is Dictionary<string, object>, "ei sähketehtävää")
                .Pakko("kaupunki|id", T).Pakko("data.sahketehtava.id", T).Pakko("data.sahketehtava.sahke", T)
                .Pakko("data.sahketehtava.aukot", A).Pakko("data.sahketehtava.aukot.*.id", T).Pakko("data.sahketehtava.aukot.*.tyyppi", T)
                .Voi("data.sahketehtava.aukot.*.otsake", T).Voi("data.sahketehtava.aukot.*.sahkeSana", T).Voi("data.sahketehtava.aukot.*.vihje", T)
                .Voi("data.sahketehtava.aukot.*.oikea", T | L).Voi("data.sahketehtava.aukot.*.oikeat", A).Voi("data.sahketehtava.aukot.*.oikeat.*", T | L)
                .Voi("data.sahketehtava.aukot.*.vapaat", A).Voi("data.sahketehtava.aukot.*.vapaat.*", T | L)
                .Voi("data.sahketehtava.aukot.*.pienin", L).Voi("data.sahketehtava.aukot.*.suurin", L)
                .Voi("data.sahketehtava.hahmo", T).Voi("data.sahketehtava.hakemistoMaa", T).Voi("data.sahketehtava.fakta", T)
                .Voi("data.sahketehtava.palkkio", L)
                .Voi("data.sahketehtava.johdanto", Kupla).Voi("data.sahketehtava.vinkki", Kupla).Voi("data.sahketehtava.linkkiSaate", Kupla)
                .Voi("data.sahketehtava.oikein", Kupla).Voi("data.sahketehtava.odotus", Kupla).Voi("data.sahketehtava.paluu", Kupla)
                .Voi("data.sahketehtava.vastauslinkki", O).Voi("data.sahketehtava.vastauslinkki.tyyppi", T)
                .Voi("data.sahketehtava.vastauslinkki.maa", T).Voi("data.sahketehtava.vastauslinkki.kohde", T)
                .Voi("data.sahketehtava.vastauslinkki.kaupunki", T).Voi("data.sahketehtava.vastauslinkki.sivu", L)
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
                // Yhdista: kartoittamattomat kentät (id, city, generaattori, kuvat) raa'asta datasta, jos se on.
                .Pakko("data.id|id", T).Pakko("data.city|kaupunki", T).Pakko("otsikko|data.title", T).Pakko("kysymys|data.q", T)
                .Voi("selite|data.selite", T).Voi("vihje|data.hint", T).Voi("fakta|data.fact", T).Voi("lahde|data.source", T | A)
                .Voi("kuvaLahteet|data.kuvaLahteet", T).Voi("luonnos|data.sketch", O).Voi("data.kuvat", A)
                .Voi("vaihtoehdot|data.options", A).Voi("oikea|data.correct", L)
                .Voi("data.generaattori|generaattori", T).Voi("data.generate", T | O)
                .Ehto((o, p) =>
                {
                    var g = S(o, "data.generaattori", "generaattori") ?? (Arvo(o, "data.generate") is Dictionary<string, object> go ? MiniJson.Teksti(go, "$funktio") : S(o, "data.generate"));
                    if (g != null) return Pulmageneraattorit.Hae(g) != null ? null : $"tuntematon generaattori {g}";
                    return Ensimmainen(o, "vaihtoehdot", "data.options") is List<object> && Ensimmainen(o, "oikea", "data.correct") is double ? null : "ei generaattoria eikä vaihtoehtoja";
                })
                .Ehto((o, p) => Kaupunki(p, S(o, "data.city", "kaupunki"), "kaupunki"))
                .Uniikki("data.id|id"),

            Saanto("saapumispuheet", "Luennat.LueSaapumispuheet", p =>
                {
                    var l = new Luennat(); l.LueSaapumispuheet(p.Teksti("saapumispuheet"));
                    return (l.Saapumispuheita, null);
                })
                .Pakko("kaupunki|id", T).Pakko("data", O).Pakko("data.url", T).Voi("data.text", T).Voi("data.duration", L)
                .Uniikki("kaupunki|id"),

            Saanto("luennat", "Luennat.LueLuennat", p =>
                {
                    var l = new Luennat(); l.LueLuennat(p.Teksti("luennat"));
                    int erikois = (l.Intro != Luennat.OletusIntro ? 1 : 0) + (l.LentoAlku != Luennat.OletusLentoAlku ? 1 : 0);
                    return (l.Luentoja + erikois, $"{l.Luentoja} kaupunkia + {erikois} (intro, lento-alku)");
                })
                // Lukija: d = data ?? alkio (data ohittaa alkion kokonaan, jos se on).
                .Pakko("data.id|id", T).Pakko("data.url|url", T)
                .Voi("data.kaupunki|kaupunki", T).Voi("data.teksti|teksti", T).Voi("data.paikkarivi|paikkarivi", T).Voi("data.kesto|kesto", L)
                .Voi("data.reaktiot|reaktiot", A).Voi("reaktiot.*.id", T).Voi("reaktiot.*.ankkuri", T).Voi("reaktiot.*.tarkoitus", T)
                .Voi("reaktiot.*.voimakkuus", L).Voi("reaktiot.*.siirtyma", L)
                .Voi("data.reaktioHetket|reaktioHetket", O).Voi("reaktioHetket.*", L)
                .Ehto((o, p) =>
                {
                    var id = S(o, "data.id", "id");
                    return id == "intro" || id == "lento-alku" || S(o, "data.kaupunki", "kaupunki") != null ? null : "kaupunkiluennolta puuttuu kaupunki";
                })
                .Uniikki("data.kaupunki|kaupunki"),

            // AANITAULUT (B7, haara pelikoodari/aani-logiikka, Assets/Matkakirja/Peli/Aani/): liitä tähän
            //   S("aanitaulut", "AaniTaulut.Lue", p => (…lukijan määrä…, …)).Pakko(…)…
            // Paikallinen kopio (Kultaiset/tuotanto) sisältää jo kokoelman aanitaulut.
        };

        /// <summary>Raakadatan lukukohdat, joita vartija ei näe kentistä (kirjataan tulosteeseen).</summary>
        public static readonly string[] MuutRaakaluvut =
        {
            "Paataso.Yhdista (Peli/Paataso.cs): kysymysten ja pulmien varareitti data-olioon, kun päätason kenttä puuttuu (kytkin Paataso.RaakaKielletty)",
            "PeliOhjain.HaeLaattamaarat (Scripts/Peli/PeliOhjain.cs): moduulit/js/packs/maailmankartta.json, jos kokoelmat/laatat.json puuttuu",
            "Laattamaarat.Lue (Peli/Laatat.cs): alkiot[0].data.counts (päätason maarat ≥ 1.2x ei vielä käytössä)",
            "Aarrenimet.LueLaatat (Scripts/Peli/KysymysApu.cs): data.types / data.mannerTypes (päätason tyypit/mannerTyypit ei vielä käytössä)",
            "UI/ (Natiivi-UI, ei tässä vartijassa): UiSisalto, Kohdekartat, MitaUutta, Lippuikkuna lukevat data-kenttiä Sisalto.HaeTeksti-reitillä",
        };

        // --- tarkistus -----------------------------------------------------

        public static Vartijatulos Tarkista(Paketti p, IEnumerable<Lukijasaanto> saannot = null)
        {
            var tulos = new Vartijatulos { Paketti = p };
            var lista = saannot?.ToList() ?? Saannot.ToList();

            // 1. Skeemaversio (osoitin ja manifesti).
            var ov = MiniJson.Teksti(p.Osoitin, "skeemaversio");
            var mv = MiniJson.Teksti(p.Manifest, "skeemaversio");
            foreach (var (mista, v) in new[] { ("osoitin", ov), ("manifest", mv) })
                if (v != null && !Pakettiskeema.Tunnettu(v))
                    tulos.Virheet.Add($"{mista}: tuntematon skeemaversio {v} (lukijat tuntevat {Pakettiskeema.Major}.{Pakettiskeema.PieninMinor}–{Pakettiskeema.Major}.{Pakettiskeema.SuurinMinor})");
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
                if (skeema != null && skeema != $"matkakirja-vienti/{Pakettiskeema.Major}/kokoelma") tulos.Virheet.Add($"{nimi}: tuntematon $skeema {skeema}");
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
                var ohitus = s.Suotimet.FirstOrDefault(x => !x.Ehto(o));
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
                + $"; raakadata {(Paataso.RaakaKielletty ? "KIELLETTY (vaihe 2)" : "sallittu")}");
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
            Console.WriteLine("  aanitaulut       (AaniTaulut, B7: lukija liitetään myöhemmin)");
            Console.WriteLine("  Raakadatan (data.*) lukukohdat, joita lukijat nyt käyttävät:");
            foreach (var g in t.Rivit.Where(r => r.RaakaPolut.Count > 0))
                Console.WriteLine($"    {g.Kokoelma} / {g.Lukija}: {string.Join(", ", g.RaakaPolut.Select(kv => $"{kv.Key} {kv.Value}"))}");
            foreach (var m in MuutRaakaluvut) Console.WriteLine("    " + m);
            foreach (var h in t.Huomiot) Console.WriteLine("  huom: " + h);
            if (t.Vihrea) Console.WriteLine($"  VIHREÄ: {t.Rivit.Sum(r => r.Luettu)} alkiota luettu, {t.Rivit.Sum(r => r.Ohitettu)} ohitettu, 0 hylätty");
            else
            {
                Console.WriteLine($"  PUNAINEN: {t.Virheet.Count} virhettä");
                foreach (var v in t.Virheet) Console.WriteLine("    - " + v);
            }
        }

        // --- paketin haku (vain lipulla) ------------------------------------

        /// <summary>Kokoelmat, jotka paikallinen kopio ja haku sisältävät (säännöt + aanitaulut B7:lle).</summary>
        public static IEnumerable<string> KopioitavatKokoelmat => Saannot.Select(s => s.Kokoelma).Append("aanitaulut").Distinct();

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
