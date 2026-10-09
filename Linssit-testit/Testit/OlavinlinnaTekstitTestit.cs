// OLAVINLINNAN PELITEKSTIT AVAIMILLA (PT 9.10.2026, käännettävyys englanniksi): Natiivi-UI:n Kielitaulu-muoto, lisätaulu
// Linssit/Resources/Tekstit/olavinlinna.fi.json (litteä; tyokalut/tekstit_olavinlinna.py), jonka Kieli yhdistää UI:n ui.fi.json:iin.
// Testit: (1) Ytimen pääsy (Kielitaulu.Hae, TaiData, alueiden yhdistäminen), (2) jokainen pelin Kieli.T- / Kielitaulu.Hae-avain on taulussa,
// (3) pelin koodissa ei ole kovakoodattua suomenkielistä näkyvää merkkijonoa (lokit ja "// kieli: ei" -rivit ohitetaan; sama sääntö
// tyokalut/kielivahti.py:ssä), (4) taulu kattaa datan tekstit (repliikit, kertoja, tietokortit).
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using Matkakirja.Linssit;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaTekstitTestit
    {
        static string Juuri => Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", ".."));
        static string TauluPolku => Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json");

        static Dictionary<string, object> Taulu() => MiniJson.ObjektiTaiNull(MiniJson.Jasenna(File.ReadAllText(TauluPolku)));

        /// <summary>Olavinlinnan pelin koodi (seikkailu, historia, kertoja- ja tietokerrosdata).</summary>
        static IEnumerable<string> PelinKoodi()
        {
            foreach (var f in Directory.GetFiles(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Unity"), "Seikkailu*.cs")) yield return f;
            foreach (var f in Directory.GetFiles(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Ydin/Seikkailu"), "*.cs")) yield return f;
            yield return Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Ydin/Dioraama/Historiajana.cs");
        }

        [Testi] static void YtimenPaasyJaLisataulu()
        {
            var (p0, v0) = (Kielitaulu.Perus, Kielitaulu.Valittu);
            try
            {
                var fi = Kielitaulu.Lue("{\"a.b\": \"Avaa\", \"a.c\": \"{0} / {1}\"}");
                fi.Lisaa("{\"olavinlinna.x\": \"Lisä\"}");
                Kielitaulu.Perus = fi; Kielitaulu.Valittu = null;
                Oleta.Sama("Avaa", Kielitaulu.Hae("a.b"));
                Oleta.Sama("Lisä", Kielitaulu.Hae("olavinlinna.x"));
                Oleta.Sama("1 / 2", Kielitaulu.Hae("a.c", 1, 2));
                Oleta.Sama("a.puuttuu", Kielitaulu.Hae("a.puuttuu"));
                Oleta.Sama("data", Kielitaulu.TaiData("a.puuttuu", "data"));
                Kielitaulu.Valittu = Kielitaulu.Lue("{\"a.b\": \"Open\"}");
                Oleta.Sama("Open", Kielitaulu.Hae("a.b"));
                Oleta.Sama("Lisä", Kielitaulu.Hae("olavinlinna.x"));   // puuttuva käännös → suomi
            }
            finally { Kielitaulu.Perus = p0; Kielitaulu.Valittu = v0; }
            Oleta.Sama("olavinlinna.kertoja.jarvelta", Matkakirja.Linssit.Dioraama.DioraamaData.TekstiAvain("Olavinlinna", "kertoja", "järvelta"[0] == 'j' ? "jarvelta" : ""));
            Oleta.Sama("olavinlinna.tietokortti.kyronsalmi-ja-1", Matkakirja.Linssit.Dioraama.DioraamaData.TekstiAvain("olavinlinna", "tietokortti", "Kyronsalmi ja 1"));
        }

        [Testi] static void KoodinAvaimetOvatTaulussa()
        {
            var t = Taulu();
            var kaytetyt = new SortedSet<string>(StringComparer.Ordinal);
            foreach (var f in PelinKoodi())
                foreach (Match m in Regex.Matches(File.ReadAllText(f), "(?:Kieli\\.T|Kielitaulu\\.Hae)\\(\"([a-z0-9.\\-]+)\""))
                    if (!m.Groups[1].Value.EndsWith(".", StringComparison.Ordinal)) kaytetyt.Add(m.Groups[1].Value);
            // Historiajanan vaiheiden avaimet ("olavinlinna.historia." + Avain + ".vuosi/.sanat").
            foreach (var v in Matkakirja.Linssit.Dioraama.Historiajana.Olavinlinna.Vaiheet) { kaytetyt.Add("olavinlinna.historia." + v.Avain + ".vuosi"); kaytetyt.Add("olavinlinna.historia." + v.Avain + ".sanat"); }
            Oleta.Tosi(kaytetyt.Count >= 40, $"avaimia koodissa {kaytetyt.Count}");
            foreach (var a in kaytetyt) Oleta.Tosi(t.ContainsKey(a), $"avain puuttuu taulusta: {a}");
        }

        static readonly Regex Literaali = new Regex("\\$?@?\"((?:[^\"\\\\]|\\\\.)*)\"");
        // Lokikutsu ei näy pelaajalle: rivi katkaistaan sen kohdalta (kirjaa, Kirjaa, Debug.Log*, poikkeukset); tekniset nimet ohitetaan.
        static readonly Regex Lokit = new Regex("(kirjaa\\?\\.Invoke|o\\.Kirjaa|Kirjaa\\(|Debug\\.Log|Exception\\(|new GameObject\\(|Shader\\.Find|PropertyToID|GetType\\(|GetMethod\\(|GetProperty\\()");
        static readonly Regex Nimet = new Regex("(new GameObject|Shader\\.Find|PropertyToID|GetType|GetMethod|GetProperty|Lahde|CompareTag|tag ==)\\(?\\s*\\$?\"(?:[^\"\\\\]|\\\\.)*\"");

        /// <summary>Rivin loppukommentti pois (// merkkijonon ulkopuolella).</summary>
        static string IlmanKommenttia(string r)
        {
            bool sisalla = false;
            for (int i = 0; i < r.Length - 1; i++)
            {
                if (r[i] == '"' && (i == 0 || r[i - 1] != '\\')) sisalla = !sisalla;
                else if (!sisalla && r[i] == '/' && r[i + 1] == '/') return r.Substring(0, i);
            }
            return r;
        }

        [Testi] static void EiKovakoodattuaSuomea()
        {
            var loydot = new List<string>();
            foreach (var f in PelinKoodi())
            {
                var rivit = File.ReadAllLines(f);
                for (int i = 0; i < rivit.Length; i++)
                {
                    string r = rivit[i], s = r.TrimStart();
                    if (s.StartsWith("//") || s.StartsWith("*") || r.Contains("kieli: ei")) continue;
                    string koodi = IlmanKommenttia(r);
                    var loki = Lokit.Match(koodi); if (loki.Success && !Nimet.IsMatch(koodi.Substring(loki.Index))) koodi = koodi.Substring(0, loki.Index);
                    koodi = Nimet.Replace(koodi, "");
                    foreach (Match m in Literaali.Matches(koodi))
                    {
                        string x = m.Groups[1].Value;
                        bool suomi = Regex.IsMatch(x, "^[A-ZÄÖ][a-zäö]+$") || Regex.IsMatch(x, "[äöÄÖ]") || Regex.IsMatch(x, "[A-ZÄÖa-zäö]{3,} [a-zäö]{2,}") && !Regex.IsMatch(x, "^[a-z0-9_\\-:./ {}]+$");
                        if (suomi) loydot.Add($"{Path.GetFileName(f)}:{i + 1}: \"{x}\"");
                    }
                }
            }
            if (loydot.Count > 0) Console.WriteLine("      kovakoodattu:\n        " + string.Join("\n        ", loydot));
            Oleta.Tosi(loydot.Count == 0, $"kovakoodattuja suomenkielisiä merkkijonoja {loydot.Count} (avain Tekstit/olavinlinna.fi.json:iin ja Kieli.T, tai \"// kieli: ei (syy)\", jos ei näy pelaajalle)");
        }

        [Testi] static void EsittelynTekstitOvatTaulussa()
        {
            // Paketin rakennus.json-kopio (tyokalut/tekstit_olavinlinna.py kirjoittaa sen): jokainen DioraamaData.Tekstikohteet-avain
            // on taulussa samalla tekstillä (generaattori ja C# laskevat avaimet samoin), ja Lokalisoi vaihtaa tekstin taulusta.
            var t = Taulu();
            string kopio = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "olavinlinna-" + Matkakirja.Linssit.Seikkailu.PelattavaPala.Versio + "-rakennus.json"));
            var (p0, v0) = (Kielitaulu.Perus, Kielitaulu.Valittu);
            try
            {
                Kielitaulu.Perus = null; Kielitaulu.Valittu = null;
                var r = Matkakirja.Linssit.Dioraama.DioraamaData.Lue(kopio);
                var kohteet = Matkakirja.Linssit.Dioraama.DioraamaData.Tekstikohteet(r);
                Oleta.Tosi(kohteet.Count >= 150, $"esittelyn tekstejä {kohteet.Count}");
                int pulu = 0;
                foreach (var (avain, teksti, _) in kohteet)
                {
                    Oleta.Tosi(t.TryGetValue(avain, out var x) && x as string == teksti, $"{avain}: taulussa sama teksti");
                    if (avain.Contains(".pulu")) pulu++;
                }
                Console.WriteLine($"      esittely: {kohteet.Count} tekstiä, joista Pulun {pulu}");
                Kielitaulu.Perus = Kielitaulu.Lue("{\"" + kohteet[0].Avain + "\": \"KÄÄNNETTY\"}");
                var r2 = Matkakirja.Linssit.Dioraama.DioraamaData.Lue(kopio);
                Oleta.Sama("KÄÄNNETTY", Matkakirja.Linssit.Dioraama.DioraamaData.Tekstikohteet(r2)[0].Teksti);
            }
            finally { Kielitaulu.Perus = p0; Kielitaulu.Valittu = v0; }
        }

        [Testi] static void TauluKattaaDatanTekstit()
        {
            var t = Taulu();
            int Ryhma(string r) { int n = 0; foreach (var k in t.Keys) if (k.StartsWith("olavinlinna." + r + ".", StringComparison.Ordinal)) n++; return n; }
            Oleta.Tosi(Ryhma("repliikki") >= 40, $"repliikit {Ryhma("repliikki")}");
            Oleta.Tosi(Ryhma("kertoja") >= 4, $"kertoja {Ryhma("kertoja")}");
            Oleta.Tosi(Ryhma("tietokortti") >= 30, $"tietokortit {Ryhma("tietokortti")}");
            Oleta.Tosi(Ryhma("verbi") >= 20 && Ryhma("loyto") >= 4 && Ryhma("historia") >= 18, "koodin tekstit");
            foreach (var kv in t) Oleta.Tosi(kv.Value is string s && s.Length > 0, $"tyhjä teksti: {kv.Key}");
            // Tietokortti avaimella taulusta (sama kuin data nyt; myöhemmin käännös).
            var (p0, v0) = (Kielitaulu.Perus, Kielitaulu.Valittu);
            try
            {
                Kielitaulu.Perus = Kielitaulu.Lue(File.ReadAllText(TauluPolku)); Kielitaulu.Valittu = null;
                var tk = Matkakirja.Linssit.Seikkailu.Tietokerros.Lue("{\"kortit\": [{\"id\": \"kyronsalmi\", \"otsikko\": \"data\"}]}");
                Oleta.Sama(t["olavinlinna.tietokortti.kyronsalmi.otsikko"] as string, tk.Kortit[0].Otsikko);
                Oleta.Sama(t["olavinlinna.historia.1499.sanat"] as string, Matkakirja.Linssit.Dioraama.Historiajana.Olavinlinna.Vaiheet[4].Sanat);
            }
            finally { Kielitaulu.Perus = p0; Kielitaulu.Valittu = v0; }
        }
    }
}
