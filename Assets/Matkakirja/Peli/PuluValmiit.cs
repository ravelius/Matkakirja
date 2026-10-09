// PULUN VALMIIT VASTAUKSET (omistaja 9.10.2026, Päätoimittaja: juna 173): Sonnet-parven esigeneroimat vastaukset maittain ämpärissä
// pulu/vastaukset/v1/<ISO3>.json (tools/pulu-esigenerointi/koosta.mjs, haara pulu-ranska-pilvi):
//   { $skeema "matkakirja-pulu-vastaukset/1", maa, kohdat: { "<kohta>": { kysymykset: [{kysymys, vastaus, jatkot[2], paikka?}],
//     lisaa: { "<käsite pienellä>": {kasite, vastaus, jatkot[2]} } } } }
// Kohta = karttavalon tunnus (kohde:<id> tai nosto:<id>). Vastauksessa [[käsite]]-merkinnät ovat paikallaan kuten workerin
// vastauksessa; käsitelinkin napautus kysyy "Kerro lisää: <käsite>", ja sen valmis vastaus on kohdan lisaa-taulussa.
// Hakemisto pulu/vastaukset/v1/maat.json { maat: { "<ISO3>": "<versio>" } } kertoo valmiit maat (ei kokeilla 404:ää, CDN).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli
{
    public sealed class PuluValmiit
    {
        public const string Skeema = "matkakirja-pulu-vastaukset/1", KerroLisaaAlku = "Kerro lisää: ";

        public sealed class Vastaus
        {
            public string Kysymys, Teksti;
            public List<string> Jatkot = new List<string>();
        }

        public sealed class Kohta
        {
            public List<Vastaus> Kysymykset = new List<Vastaus>();
            public Dictionary<string, Vastaus> Lisaa = new Dictionary<string, Vastaus>(StringComparer.Ordinal);
        }

        public string Maa;
        public readonly Dictionary<string, Kohta> Kohdat = new Dictionary<string, Kohta>(StringComparer.Ordinal);
        public int Vastauksia => Kohdat.Values.Sum(k => k.Kysymykset.Count + k.Lisaa.Count);

        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);

        static Vastaus LueVastaus(Dictionary<string, object> o, string kysymys)
        {
            string teksti = T(o, "vastaus");
            if (string.IsNullOrWhiteSpace(teksti) || string.IsNullOrWhiteSpace(kysymys)) return null;
            var v = new Vastaus { Kysymys = kysymys.Trim(), Teksti = teksti.Trim() };
            if (MiniJson.Kentta(o, "jatkot") is List<object> j)
                v.Jatkot = j.OfType<string>().Select(x => PuraLinkit(x).Trim()).Where(x => x.Length > 0).Take(2).ToList();
            return v;
        }

        static readonly Regex LinkkiKuvio = new Regex(@"\[\[([^\[\]\n]*)\]\]");

        /// <summary>
        /// Jatkokysymys on napautettava siru ja lähtee sellaisenaan liveen, joten käsitelinkit puretaan tekstiksi: [[aihe|muoto]] → muoto,
        /// [[aihe]] → aihe (Pelikoodari 10.10.2026: FRA saint-cloud, ROU retezat ja ceahlau; Päätoimittaja).
        /// </summary>
        public static string PuraLinkit(string teksti) => LinkkiKuvio.Replace(teksti ?? "", m =>
        {
            string k = m.Groups[1].Value;
            int p = k.LastIndexOf('|');
            return (p < 0 ? k : k.Substring(p + 1)).Trim();
        });

        /// <summary>Paketti JSONista; null, jos skeema tai rakenne ei kelpaa.</summary>
        public static PuluValmiit Lue(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            Dictionary<string, object> juuri;
            try { juuri = MiniJson.Jasenna(json) as Dictionary<string, object>; } catch { return null; }
            if (juuri == null || T(juuri, "$skeema") != Skeema || !(MiniJson.Kentta(juuri, "kohdat") is Dictionary<string, object> kohdat)) return null;
            var p = new PuluValmiit { Maa = T(juuri, "maa") };
            foreach (var kv in kohdat)
            {
                if (!(kv.Value is Dictionary<string, object> ko)) continue;
                var k = new Kohta();
                foreach (var o in (MiniJson.Kentta(ko, "kysymykset") as List<object> ?? new List<object>()).OfType<Dictionary<string, object>>())
                    if (LueVastaus(o, T(o, "kysymys")) is Vastaus v && !k.Kysymykset.Any(x => x.Kysymys == v.Kysymys)) k.Kysymykset.Add(v);
                if (MiniJson.Kentta(ko, "lisaa") is Dictionary<string, object> lisaa)
                    foreach (var l in lisaa)
                        if (l.Value is Dictionary<string, object> lo && LueVastaus(lo, KerroLisaaAlku + (T(lo, "kasite") ?? l.Key)) is Vastaus v)
                            k.Lisaa[Avain(T(lo, "kasite") ?? l.Key)] = v;
                if (k.Kysymykset.Count > 0) p.Kohdat[kv.Key] = k;
            }
            return p;
        }

        /// <summary>Hakemisto maat.json → maa → versio; null, jos ei kelpaa.</summary>
        public static Dictionary<string, string> LueHakemisto(string json)
        {
            try
            {
                if (!(MiniJson.Kentta(MiniJson.Jasenna(json) as Dictionary<string, object>, "maat") is Dictionary<string, object> m)) return null;
                return m.Where(x => x.Value != null).ToDictionary(x => x.Key.ToUpperInvariant(), x => Convert.ToString(x.Value, System.Globalization.CultureInfo.InvariantCulture));
            }
            catch { return null; }
        }

        /// <summary>Käsitteen avain lisaa-taulussa (pienet kirjaimet, välit siistitty).</summary>
        public static string Avain(string kasite) => Regex.Replace((kasite ?? "").Trim(), @"\s+", " ").ToLowerInvariant();

        /// <summary>Käsitelinkin ja nostokortin korostuksen kysymys (sama muoto kuin valmiissa vastauksissa: KerroLisaa purkaa sen).</summary>
        public static string KerroLisaaKysymys(string kasite) => KerroLisaaAlku + (kasite ?? "").Trim();

        /// <summary>"Kerro lisää: X" → X; muu kysymys → null.</summary>
        public static string KerroLisaa(string kysymys)
        {
            var k = (kysymys ?? "").Trim();
            return k.StartsWith(KerroLisaaAlku, StringComparison.Ordinal) && k.Length > KerroLisaaAlku.Length ? k.Substring(KerroLisaaAlku.Length).Trim() : null;
        }

        /// <summary>Kohdan valmis vastaus kysymykseen (valmis kysymys tai käsitelinkin "Kerro lisää"), tai null.</summary>
        public Vastaus Vastaa(string kohta, string kysymys)
        {
            if (kohta == null || !Kohdat.TryGetValue(kohta, out var k)) return null;
            string q = (kysymys ?? "").Trim();
            var v = k.Kysymykset.FirstOrDefault(x => x.Kysymys == q);
            if (v != null) return v;
            string kasite = KerroLisaa(q);
            return kasite != null && k.Lisaa.TryGetValue(Avain(kasite), out var l) ? l : null;
        }

        /// <summary>Onko kohdalla valmis "Kerro lisää" -vastaus käsitteelle (linkki vain silloin, kun live ei ole käytössä).</summary>
        public bool OnLisaa(string kohta, string kasite) =>
            kohta != null && Kohdat.TryGetValue(kohta, out var k) && k.Lisaa.ContainsKey(Avain(kasite));
    }
}
