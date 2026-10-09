// PELIN TEKSTIT AVAIMILLA (PT 9.10.2026, käännettävyys englanniksi): Peli/Tekstit.cs, taulu Linssit/Resources/Tekstit/olavinlinna.fi.json
// (tyokalut/tekstit_olavinlinna.py). Testit: (1) Tekstit-luokan säännöt, (2) jokainen koodin Tekstit.T("…")-avain on fi-taulussa,
// (3) Olavinlinnan pelin koodissa ei ole kovakoodattua suomenkielistä näkyvää merkkijonoa (lokit ja "// tekninen" -rivit ohitetaan),
// (4) taulu kattaa datan tekstit (repliikit, kertoja, tietokortit).
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class TekstitTestit
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

        [Testi] static void TekstitSaannot()
        {
            Tekstit.Lisaa("xx", "{\"a.b\": \"Avaa\", \"a.c\": \"{0} / {1}\"}");
            Tekstit.Lisaa("yy", "{\"a.b\": \"Open\"}");
            string ennen = Tekstit.Kieli;
            try
            {
                Tekstit.Kieli = "xx";
                Oleta.Sama("Avaa", Tekstit.T("a.b"));
                Oleta.Sama("1 / 2", Tekstit.T("a.c", 1, 2));
                Oleta.Sama("[a.puuttuu]", Tekstit.T("a.puuttuu"));
                Oleta.Sama("data", Tekstit.TaiData("a.puuttuu", "data"));
                Tekstit.Kieli = "yy";
                Oleta.Sama("Open", Tekstit.T("a.b"));
            }
            finally { Tekstit.Kieli = ennen; }
            Oleta.Sama("olavinlinna.kertoja.jarvelta", Matkakirja.Linssit.Dioraama.DioraamaData.TekstiAvain("Olavinlinna", "kertoja", "järvelta"[0] == 'j' ? "jarvelta" : ""));
            Oleta.Sama("olavinlinna.tietokortti.kyronsalmi-ja-1", Matkakirja.Linssit.Dioraama.DioraamaData.TekstiAvain("olavinlinna", "tietokortti", "Kyronsalmi ja 1"));
        }

        [Testi] static void KoodinAvaimetOvatTaulussa()
        {
            var t = Taulu();
            var kaytetyt = new SortedSet<string>(StringComparer.Ordinal);
            foreach (var f in PelinKoodi())
                foreach (Match m in Regex.Matches(File.ReadAllText(f), "Tekstit\\.T\\(\"([a-z0-9.\\-]+)\""))
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
                    if (s.StartsWith("//") || s.StartsWith("*") || r.Contains("// tekninen")) continue;
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
            Oleta.Tosi(loydot.Count == 0, $"kovakoodattuja suomenkielisiä merkkijonoja {loydot.Count} (avain Tekstit-tauluun tai \"// tekninen\", jos ei näy pelaajalle)");
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
            Tekstit.Lisaa("fi", File.ReadAllText(TauluPolku));
            var tk = Matkakirja.Linssit.Seikkailu.Tietokerros.Lue("{\"kortit\": [{\"id\": \"kyronsalmi\", \"otsikko\": \"data\"}]}");
            Oleta.Sama(t["olavinlinna.tietokortti.kyronsalmi.otsikko"] as string, tk.Kortit[0].Otsikko);
        }
    }
}
