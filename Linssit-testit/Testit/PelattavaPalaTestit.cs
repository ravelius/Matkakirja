// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): appiin kiinnitetty paketti ja huonesimulaation kultaiset ovat samaa vientiä.
using System;
using System.IO;
using System.Text.RegularExpressions;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class PelattavaPalaTestit
    {
        [Testi] static void HashJaKultaisetSamaaVientia()
        {
            Oleta.Tosi(Regex.IsMatch(PelattavaPala.Hash, "^[0-9a-f]{16}$"), $"hash 16 heksaa ({PelattavaPala.Hash})");
            string k = Path.Combine(AppContext.BaseDirectory, "..", "kultaiset");
            foreach (var osa in new[] { "merkit", "osat" })
                Oleta.Tosi(File.Exists(Path.Combine(k, $"olavinlinna-{PelattavaPala.Versio}-{osa}.json")),
                    $"kultaiset olavinlinna-{PelattavaPala.Versio}-{osa}.json puuttuu: simulaatio ei todenna appiin kiinnitettyä pakettia");
        }

        /// <summary>LR v46a: lukittujen tammiovien lehdet (glb) ja Codex-seinäesineet (seina: true, ei törmäystä) kävelydatassa.</summary>
        [Testi] static void OvilehdetJaSeinaesineet()
        {
            string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n));
            var d = KavelyData.Lue(Lue($"olavinlinna-{PelattavaPala.Versio}-osat.json"), Lue($"olavinlinna-{PelattavaPala.Versio}-merkit.json"));
            int lehtia = 0;
            foreach (var m in d.Lajia("ovi"))
                if (!string.IsNullOrEmpty(m.Glb))
                {
                    lehtia++;
                    Oleta.Tosi(m.Lukko, $"ovilehti vain lukitussa ovessa ({m.Tunnus})");
                    Oleta.Tosi(m.Glb.StartsWith("ovi-tammi-", StringComparison.Ordinal) && m.Leveys > 0, $"ovi {m.Tunnus}: glb {m.Glb}, leveys {m.Leveys}");
                }
            Oleta.Tosi(lehtia >= 4, $"tammiovien lehtiä {lehtia} (pääovi, muurikäytävä, Kellotorni, tyrmä)");
            int seinia = 0;
            foreach (var m in d.Lajia("rekvisiitta")) if (m.Seina) seinia++;
            Oleta.Tosi(seinia >= 4, $"seinäesineitä {seinia} (kuvakudos, lippu, vaakuna, raapustukset)");
        }
    }
}
