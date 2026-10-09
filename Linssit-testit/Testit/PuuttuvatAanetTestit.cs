// OLAVINLINNAN PUUTTUVAT ÄÄNET ETUKÄTEEN (PT 9.10.2026): Pelikoodarin aja-generointi.sh (omistajan luvalla) tuottaa 16 repliikkiä
// (Sisältökirjurin käsikirjoitus #4249/#4250 → seikkailu/olavinlinna/repliikit-lapi-v1), 5 tehostetta (→ aanet-lapi-v2) ja historian
// kertojan 9 riviä (R2 opas/<sha>.mp3). Koodi soittaa ne, kun tiedosto on ämpärissä, ja puuttuessa on hiljaa. Testi: koodin
// tunnukset ovat täsmälleen käsikirjoituksen tunnuksia (kirjoitusvirhe ei jää hiljaiseksi puutteeksi), ja kertojan 9 äänitunnistetta
// (32 heksamerkkiä) ovat taulussa.
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class PuuttuvatAanetTestit
    {
        static string Juuri => Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", ".."));

        static readonly HashSet<string> Repliikit = new HashSet<string>(StringComparer.Ordinal)
        {
            "muuri-vartija-rauha-1", "muuri-vartija-rauha-2", "muuri-vartija-epaily-1", "muuri-vartija-epaily-2", "muuri-vartija-etsinta-1",
            "muuri-vartija-etsinta-2", "muuri-vartija-halytys-1", "muuri-vartija-halytys-2", "muuri-vartija-kiinni-1", "muuri-vartija-paluu-1",
            "muuri-vartija-paluu-2", "kello-vartija-halytys-1", "tyrma-vartija-vienti-1", "tyrma-vesipoika-1", "tyrma-vartija-kolina-1",
            "tyrma-vartija-rotat-1",
        };
        static readonly string[] Tehosteet = { "sytytys", "hanska", "kauha", "nauris", "tarjotin" };

        static string Koodi()
        {
            var b = new System.Text.StringBuilder();
            foreach (var f in Directory.GetFiles(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Unity"), "Seikkailu*.cs")) b.Append(File.ReadAllText(f));
            return b.ToString();
        }

        [Testi] static void RepliikitOvatKasikirjoituksesta()
        {
            var koodi = Koodi();
            var kaytetyt = new HashSet<string>(StringComparer.Ordinal);
            foreach (Match m in Regex.Matches(koodi, "\"((?:muuri-vartija|kello-vartija|tyrma-vartija|tyrma-vesipoika)-[a-z0-9\\-]+)\"")) kaytetyt.Add(m.Groups[1].Value);
            foreach (var k in kaytetyt) Oleta.Tosi(Repliikit.Contains(k), $"tuntematon repliikki {k}");
            foreach (var r in Repliikit) Oleta.Tosi(kaytetyt.Contains(r), $"käsikirjoituksen repliikki ei kytketty: {r}");
        }

        [Testi] static void TehosteetKytketty()
        {
            var koodi = Koodi();
            foreach (var t in Tehosteet) Oleta.Tosi(koodi.Contains("\"" + t + "\""), $"tehoste {t} kytketty");
            Oleta.Tosi(File.ReadAllText(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Unity/DioraamaSovitin.cs")).Contains("/aanet-lapi-v2/manifest.json")
                && File.ReadAllText(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Unity/DioraamaSovitin.cs")).Contains("/repliikit-lapi-v1/manifest.json"), "manifestit");
        }

        [Testi] static void KertojanAanitunnisteetTaulussa()
        {
            var t = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(File.ReadAllText(Path.Combine(Juuri, "Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json"))));
            int n = 0;
            foreach (var v in Matkakirja.Linssit.Dioraama.Historiajana.Olavinlinna.Vaiheet)
                if (v.Avain != null && t.TryGetValue("olavinlinna.historia." + v.Avain + ".kertoja", out _))
                {
                    Oleta.Tosi(t.TryGetValue("olavinlinna.historia." + v.Avain + ".kertoja.aani", out var s) && s is string sha && Regex.IsMatch(sha, "^[0-9a-f]{32}$"), $"{v.Avain}: äänitunniste");
                    n++;
                }
            Oleta.Sama(9, n);
        }
    }
}
