// KYSYMYSDATA: Siirtosepän sisältöpaketin (skeema 1.1) kysymyskokoelmat
// C#-olioiksi, SisaltoTuonnin tyyliin. Näytteet: Kultaiset/paketti/.
//
//   kysymykset.json   — web pack.questions: ryhmä = kaupunki-id, 'general'
//                       (yleispakka) tai 'claims' (isoisän väittämät).
//                       Alkion data on laudan raakadata sellaisenaan:
//                       {q, options, correct, level?, hint?, fact, source?, place?}.
//                       Väittämässä ei ole optionsia ja correct on totuusarvo.
//   tarinakaari.json  — web TARINAKAARI: kohtaamisen kysymys
//                       {q, vaihtoehdot, oikea, fakta}.
//   paikkatiedot.json — web pack.placeFacts: merkkijono tai {text, voice, source, wiki}.
//
// JÄRJESTYS ON OSA SÄÄNTÖÄ: pickQuestion arpoo indeksin suodatetusta
// pakasta, joten ryhmän kysymykset pidetään paketin järjestyksessä (sama
// kuin laudan questions-taulukot; tarkistettu webin kanssa 23.9.2026).
//
// Lippukysymyksen maat (web pack.map.countryShapes) EIVÄT ole paketissa:
// ne annetaan Kysely.Liput-listana (testeissä Kultaiset/liput.json).
using System;
using System.Collections.Generic;
using System.IO;

namespace Matkakirja.Peli
{
    /// <summary>Monivalinta tai väittämä (web question / claim).</summary>
    public sealed class Kysymys
    {
        public string Q;                       // web q (myös käytettyjen kysymysten avain)
        public List<string> Vaihtoehdot;       // web options (väittämällä null)
        public int Oikea;                      // web correct (indeksi)
        public bool VaiteTotta;                // väittämä: web correct (totuusarvo)
        public int? Taso;                      // web level: 1 helppo, 2 perus, 3 vaikea
        public string Vihje;                   // web hint
        public string Fakta;                   // web fact
        public List<string> Lahteet = new List<string>();   // web sourceList(source)
        public string Paikka;                  // web place (väittämä)

        /// <summary>Web questionLevel: level ?? 2.</summary>
        public int Vaikeus => Taso ?? 2;
    }

    /// <summary>Tarinakaaren kohtaamisen kysymys (web TARINAKAARI[id].kysymys).</summary>
    public sealed class KaariKysymys
    {
        public string Kaupunki;
        /// <summary>Kohtaamisen henkilö (web TARINAKAARI[id].nimi): lehden tehtävänappi "Tapaa {Nimi}".</summary>
        public string Nimi;
        public string Q;
        public List<string> Vaihtoehdot;
        public int Oikea;
        public string Fakta;
    }

    /// <summary>Kaupungin paikkatieto (web placeFacts): teksti, ääni, lähde, wiki.</summary>
    public sealed class Paikkatieto
    {
        public string Teksti;
        public string Aani;     // web voice, esim. "isoisa"
        public string Lahde;
        public string Wiki;
    }

    /// <summary>Lippukysymyksen maa (web countryShapes[iso]: nimi, lippu).</summary>
    public sealed class Lippumaa
    {
        public string Iso;
        public string Nimi;
        public string Lippu;   // Commons-tiedostonimi, esim. "Flag of Italy.svg"
    }

    /// <summary>Laudan kysymyssisältö.</summary>
    public sealed class Kysymysdata
    {
        /// <summary>Kaupungin omat kysymykset (web questions[cityId]).</summary>
        public Dictionary<string, List<Kysymys>> Kaupungeittain = new Dictionary<string, List<Kysymys>>();
        /// <summary>Yleispakka (web questions.general).</summary>
        public List<Kysymys> Yleiset = new List<Kysymys>();
        /// <summary>Isoisän väittämät (web questions.claims).</summary>
        public List<Kysymys> Vaitteet = new List<Kysymys>();
        /// <summary>Tarinakaaren kohtaamiset kaupungeittain (web TARINAKAARI, vain kysymykselliset).</summary>
        public Dictionary<string, KaariKysymys> Kaaret = new Dictionary<string, KaariKysymys>();
        /// <summary>Paikkatiedot kaupungeittain (web placeFacts).</summary>
        public Dictionary<string, List<Paikkatieto>> Paikkatiedot = new Dictionary<string, List<Paikkatieto>>();

        static readonly List<Kysymys> Tyhja = new List<Kysymys>();

        /// <summary>Kaupungin omat kysymykset tai tyhjä lista.</summary>
        public List<Kysymys> Omat(string kaupunki) =>
            kaupunki != null && Kaupungeittain.TryGetValue(kaupunki, out var l) ? l : Tyhja;

        // --- luku ------------------------------------------------------------

        static IEnumerable<Dictionary<string, object>> Alkiot(string json, string odotettuNimi)
        {
            var runko = MiniJson.Objekti(MiniJson.Jasenna(json));
            var nimi = MiniJson.Teksti(runko, "nimi");
            if (nimi != null && nimi != odotettuNimi)
                throw new FormatException($"odotettiin kokoelmaa '{odotettuNimi}', saatiin '{nimi}'");
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(runko, "alkiot")))
                yield return MiniJson.Objekti(a);
        }

        static List<string> Tekstit(object arvo)
        {
            var l = new List<string>();
            if (arvo is List<object> t) foreach (var x in t) l.Add(x as string ?? Convert.ToString(x, System.Globalization.CultureInfo.InvariantCulture));
            return l;
        }

        /// <summary>Web sourceList: merkkijono tai taulukko → ei-tyhjät merkkijonot.</summary>
        static List<string> Lahdelista(object source)
        {
            var l = new List<string>();
            if (source is string s) { if (s.Trim().Length > 0) l.Add(s); }
            else if (source is List<object> t)
                foreach (var x in t) if (x is string y && y.Trim().Length > 0) l.Add(y);
            return l;
        }

        /// <summary>Yksi kysymys laudan raakadatasta ({q, options, correct, …}).</summary>
        public static Kysymys LueKysymys(Dictionary<string, object> d)
        {
            var k = new Kysymys
            {
                Q = MiniJson.Teksti(d, "q") ?? throw new FormatException("kysymykseltä puuttuu q"),
                Vihje = MiniJson.Teksti(d, "hint"),
                Fakta = MiniJson.Teksti(d, "fact"),
                Paikka = MiniJson.Teksti(d, "place"),
                Lahteet = Lahdelista(MiniJson.Kentta(d, "source")),
            };
            if (MiniJson.Luku(d, "level") is double taso) k.Taso = (int)taso;
            var oikea = MiniJson.Kentta(d, "correct");
            if (oikea is bool b) k.VaiteTotta = b;
            else if (oikea is double n) k.Oikea = (int)n;
            if (MiniJson.Kentta(d, "options") is List<object>) k.Vaihtoehdot = Tekstit(MiniJson.Kentta(d, "options"));
            return k;
        }

        /// <summary>Kokoelma kysymykset → ryhmät paketin järjestyksessä.</summary>
        public void LueKysymykset(string json)
        {
            foreach (var o in Alkiot(json, "kysymykset"))
            {
                var ryhma = MiniJson.Teksti(o, "ryhma") ?? MiniJson.Teksti(o, "kaupunki")
                    ?? throw new FormatException($"kysymykseltä {MiniJson.Teksti(o, "id")} puuttuu ryhmä");
                var k = LueKysymys(Paataso.Yhdista(o, Paataso.Kysymys));
                if (ryhma == "general") Yleiset.Add(k);
                else if (ryhma == "claims") Vaitteet.Add(k);
                else
                {
                    if (k.Vaihtoehdot == null) throw new FormatException($"kysymykseltä {MiniJson.Teksti(o, "id")} puuttuvat vaihtoehdot");
                    if (!Kaupungeittain.TryGetValue(ryhma, out var l)) Kaupungeittain[ryhma] = l = new List<Kysymys>();
                    l.Add(k);
                }
            }
        }

        /// <summary>Kokoelma tarinakaari: vain kohteet, joilla on kysymys.</summary>
        public void LueTarinakaari(string json)
        {
            foreach (var o in Alkiot(json, "tarinakaari"))
            {
                var d = MiniJson.Kentta(o, "data") as Dictionary<string, object>;
                if (!(MiniJson.Kentta(d, "kysymys") is Dictionary<string, object> k)) continue;
                var id = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(d, "id");
                Kaaret[id] = new KaariKysymys
                {
                    Kaupunki = id,
                    Nimi = MiniJson.Teksti(d, "nimi"),
                    Q = MiniJson.Teksti(k, "q"),
                    Vaihtoehdot = Tekstit(MiniJson.Kentta(k, "vaihtoehdot")),
                    Oikea = (int)(MiniJson.Luku(k, "oikea") ?? 0),
                    Fakta = MiniJson.Teksti(k, "fakta"),
                };
            }
        }

        /// <summary>Kokoelma paikkatiedot.</summary>
        public void LuePaikkatiedot(string json)
        {
            foreach (var o in Alkiot(json, "paikkatiedot"))
            {
                var id = MiniJson.Teksti(o, "kaupunki");
                var d = MiniJson.Kentta(o, "data");
                var t = d is string s
                    ? new Paikkatieto { Teksti = s }
                    : new Paikkatieto
                    {
                        Teksti = MiniJson.Teksti(d as Dictionary<string, object>, "text"),
                        Aani = MiniJson.Teksti(d as Dictionary<string, object>, "voice"),
                        Lahde = MiniJson.Teksti(d as Dictionary<string, object>, "source"),
                        Wiki = MiniJson.Teksti(d as Dictionary<string, object>, "wiki"),
                    };
                if (!Paikkatiedot.TryGetValue(id, out var l)) Paikkatiedot[id] = l = new List<Paikkatieto>();
                l.Add(t);
            }
        }

        /// <summary>Lippumaat JSONista {"maat":[{iso, nimi, lippu}]} (testiaineisto Kultaiset/liput.json).</summary>
        public static List<Lippumaa> LueLiput(string json)
        {
            var l = new List<Lippumaa>();
            // Testinäyte {"maat": […]} tai paketin kokoelma lippumaat {"alkiot": [{iso, nimi, lippu, url}]}.
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(juuri, "maat") ?? MiniJson.Kentta(juuri, "alkiot")))
            {
                var o = MiniJson.Objekti(a);
                l.Add(new Lippumaa { Iso = MiniJson.Teksti(o, "iso"), Nimi = MiniJson.Teksti(o, "nimi"), Lippu = MiniJson.Teksti(o, "lippu") });
            }
            return l;
        }

        /// <summary>
        /// Lukee paketin kansiosta (…/kokoelmat/) kysymykset.json ja, jos
        /// ne ovat mukana, tarinakaari.json ja paikkatiedot.json.
        /// </summary>
        public static Kysymysdata LueKansiosta(string kansio)
        {
            var d = new Kysymysdata();
            d.LueKysymykset(File.ReadAllText(Path.Combine(kansio, "kysymykset.json")));
            var kaari = Path.Combine(kansio, "tarinakaari.json");
            if (File.Exists(kaari)) d.LueTarinakaari(File.ReadAllText(kaari));
            var paikat = Path.Combine(kansio, "paikkatiedot.json");
            if (File.Exists(paikat)) d.LuePaikkatiedot(File.ReadAllText(paikat));
            return d;
        }
    }
}
