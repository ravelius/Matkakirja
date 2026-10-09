// VALMISLUENNAT V1 KULTAISENA (PT 9.10.2026: toistotesti Peli-testinä, ei simua; ääni todennetaan TF:ssä). Kultaiset/valmisluennat-v1/
// (tee-valmisluennat-kultainen.mjs): ämpärin manifesti sellaisenaan ja pelin pyytämät kappaleet (Natiivi-UI:n vienti simussa 9.10.).
// Testaa: kaikki 6 903 luentaa manifestissa oikeassa URL-muodossa, jokainen esigeneroitu pyyntö osuu (Valmisluennat.Url), rajatut ja
// muuttuneet kappaleet → null eli palavirta (Puhe.Syntetisoi), ja pelin oletukset (William, 1,15) = manifestin ääni ja avainten nopeus.
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli.Testit
{
    static class ValmisluennatManifestiTestit
    {
        const string Kansio = "https://media.matkakirja.app/aanet/luennat/v1/";
        const int Maara = 6903;

        static string Lue(string nimi)
        {
            using var g = new GZipStream(File.OpenRead(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "valmisluennat-v1", nimi)), CompressionMode.Decompress);
            using var r = new StreamReader(g, Encoding.UTF8);
            return r.ReadToEnd();
        }

        static string manifesti;
        static string Manifesti => manifesti ??= Lue("manifest.json.gz");

        static List<Dictionary<string, object>> pyynnot;
        static Dictionary<string, object> otsake;
        static List<Dictionary<string, object>> Pyynnot
        {
            get
            {
                if (pyynnot != null) return pyynnot;
                var rivit = Lue("pyynnot.jsonl.gz").Split('\n').Where(l => l.Length > 0).Select(l => MiniJson.Objekti(MiniJson.Jasenna(l))).ToList();
                otsake = rivit[0];
                return pyynnot = rivit.Skip(1).ToList();
            }
        }
        static string Aani { get { _ = Pyynnot; return (string)otsake["aani"]; } }
        static double Nopeus { get { _ = Pyynnot; return (double)otsake["nopeus"]; } }

        static void Lataa() { Valmisluennat.Nollaa(); Oleta.Sama(Maara, Valmisluennat.Lue(Manifesti, Valmisluennat.ManifestiOletus + "?t=2026100917")); }

        [Testi] static void KaikkiLuennatManifestissaOikeallaOsoitteella()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(Manifesti));
            var aanet = MiniJson.Objekti(o["aanet"]);
            Oleta.Sama(1, aanet.Count, "yksi ääni");
            Oleta.Sama("eleven_v4_turbo", (string)aanet[Aani], "malli äänelle");
            var palat = MiniJson.Objekti(o["palat"]);
            Oleta.Sama(Maara, palat.Count, "luentoja");
            foreach (var kv in palat)
            {
                Oleta.Tosi(Regex.IsMatch(kv.Key, "^[0-9a-f]{32}$"), "avain: " + kv.Key);
                var p = MiniJson.Objekti(kv.Value);
                Oleta.Sama("k/" + kv.Key + ".mp3", (string)p["u"], "suhteellinen osoite");
                Oleta.Tosi(p.ContainsKey("s") && (double)p["s"] > 0.5, "kesto: " + kv.Key);
            }
            Lataa();
            Oleta.Sama(Maara, Valmisluennat.Maara);
            Valmisluennat.Nollaa();
        }

        [Testi] static void JokainenPelinPyytamaLuentaOsuu()
        {
            Lataa();
            var osuneet = new HashSet<string>();
            int esig = 0;
            foreach (var p in Pyynnot.Where(p => (bool)p["m"]))
            {
                esig++;
                string t = (string)p["t"], l = (string)p["l"];
                string url = Valmisluennat.Url(t, Aani, Nopeus, l);
                string avain = Valmisluennat.Avain(t, "eleven_v4_turbo", Aani, Nopeus, l);
                Oleta.Sama(Kansio + "k/" + avain + ".mp3", url, (string)p["laji"] + ": " + t.Substring(0, System.Math.Min(60, t.Length)));
                osuneet.Add(avain);
            }
            Oleta.Sama(Maara, esig, "esigeneroituja pyyntöjä");
            Oleta.Sama(Maara, osuneet.Count, "jokainen manifestin luenta on jonkin pyynnön kohde");
            Valmisluennat.Nollaa();
        }

        [Testi] static void PuuttuvaLuentaPalavirtaan()
        {
            Lataa();
            var rajatut = Pyynnot.Where(p => !(bool)p["m"]).ToList();
            Oleta.Sama(983, rajatut.Count, "maalehtien muut kuin etusivut (omistajan rajaus 9.10.)");
            foreach (var p in rajatut) Oleta.Sama(null, Valmisluennat.Url((string)p["t"], Aani, Nopeus, (string)p["l"]), "rajattu → palavirta");
            var e = Pyynnot.First(p => (bool)p["m"] && ((string)p["l"]).Length > 0);
            string t = (string)e["t"], l = (string)e["l"];
            Oleta.Tosi(Valmisluennat.Url(t, Aani, Nopeus, l) != null, "vertailu osuu");
            Oleta.Sama(null, Valmisluennat.Url(t + " Lisäys.", Aani, Nopeus, l), "muuttunut teksti → palavirta");
            Oleta.Sama(null, Valmisluennat.Url(t, Aani, Nopeus, ""), "eri loppuTagi → palavirta");
            Oleta.Sama(null, Valmisluennat.Url(t, Aani, 1.0, l), "pelaajan oma nopeus → palavirta");
            Oleta.Sama(null, Valmisluennat.Url(t, "Sz0tRTEpybtDJ9ru2kgD", Nopeus, l), "toinen lukijaääni → palavirta");
            Valmisluennat.Nollaa();
            Oleta.Sama(null, Valmisluennat.Url(t, Aani, Nopeus, l), "manifesti ei latautunut → palavirta");
        }

        [Testi] static void PelinOletuksetOvatManifestinAaniJaNopeus()
        {
            Oleta.Sama(Lukijaaani.NopeusOletus, Nopeus, "Lukijaaani.NopeusOletus = avainten nopeus");
            // Striimiaani.cs (UnityEngine, ei Peli-testeissä): ElevenAanet[0] on lukijan oletusääni → luetaan lähteestä (ajautumissuoja).
            string s = File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "..", "Assets", "Matkakirja", "UI", "Striimiaani.cs"));
            var m = Regex.Match(s, @"ElevenAanet\s*=\s*new\[\]\s*\{\s*\(""([^""]+)""", RegexOptions.Singleline);
            Oleta.Tosi(m.Success, "Striimiaani.ElevenAanet löytyy");
            Oleta.Sama(Aani, m.Groups[1].Value, "Striimiaanin oletusääni = manifestin ääni (William)");
        }
    }
}
