// ISS-LCD:N AJANTASAISET NIMET (Päätoimittaja 7.10.2026: "ILLICHIVSK", nimi Tšornomorsk vuodesta 2016; kartta elää nykyajassa):
// Resources/IssPaikat/nimet-fi.json "nimi|ISO3" → nimi. Jokainen avain on paikat.json:ssa, nimet eivät ole tyhjiä eivätkä
// samoja kuin vanha, ja tunnetut nimenmuutokset ovat mukana.
using System.Collections.Generic;
using System.IO;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class IssNimetTestit
    {
        const string Kansio = "../Assets/Matkakirja/Linssit/Resources/IssPaikat/";

        static Dictionary<string, object> Nimet() =>
            (Dictionary<string, object>)((Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Kansio + "nimet-fi.json")))["nimet"];

        [Testi] static void AvaimetPaikoissaJaNimetEiTyhjia()
        {
            var paikat = new HashSet<string>();
            foreach (var o in (List<object>)((Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Kansio + "paikat.json")))["paikat"])
            { var x = (List<object>)o; paikat.Add((string)x[0] + "|" + (string)x[3]); }
            var n = Nimet();
            Oleta.Tosi(n.Count > 300, $"nimiä {n.Count}");
            foreach (var kv in n)
            {
                Oleta.Tosi(paikat.Contains(kv.Key), $"{kv.Key} ei ole paikat.json:ssa");
                var uusi = kv.Value as string;
                Oleta.Tosi(!string.IsNullOrWhiteSpace(uusi) && uusi != kv.Key.Split('|')[0], $"{kv.Key}: '{uusi}'");
            }
        }

        [Testi] static void TunnetutNimenmuutokset()
        {
            var n = Nimet();
            Oleta.Tosi((n["Illichivsk|UKR"] as string) == "Tšornomorsk", "Illichivsk → Tšornomorsk (2016)");
            Oleta.Tosi((n["Kirovohrad|UKR"] as string) == "Kropyvnytskyi", "Kirovohrad → Kropyvnytskyi (2016)");
        }
    }
}
