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

        static bool Sisalla(List<object> r, double x, double y)
        {
            bool c = false;
            for (int i = 0, j = r.Count - 2; i < r.Count; j = i, i += 2)
            {
                double xi = System.Convert.ToDouble(r[i]), yi = System.Convert.ToDouble(r[i + 1]), xj = System.Convert.ToDouble(r[j]), yj = System.Convert.ToDouble(r[j + 1]);
                if ((yi > y) != (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
            }
            return c;
        }

        /// <summary>Kiistanalaiset alueet (Päätoimittaja 7.10.): Krim Ukraina, Pohjois-Kypros Kypros, Kosovo; Kaliningrad ei alueissa.</summary>
        [Testi] static void KiistanalaisetAlueetJaPaikkojenMaat()
        {
            var j = (Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Kansio + "nimet-fi.json"));
            var maat = (Dictionary<string, object>)j["maat"];
            foreach (var k in new[] { "Simferopol|RUS", "Sevastopol|RUS", "Kerch|RUS", "Yalta|RUS" })
                Oleta.Tosi((maat[k] as string) == "UKR", k + " → UKR");
            Oleta.Tosi((maat["Kyrenia|CYN"] as string) == "CYP" && (maat["Famagusta|CYN"] as string) == "CYP", "Pohjois-Kypros → CYP");
            Oleta.Tosi(!maat.ContainsKey("Kaliningrad|RUS"), "Kaliningrad pysyy Venäjänä");
            string Alue(double lat, double lon)
            {
                foreach (var o in (List<object>)j["alueet"])
                { var d = (Dictionary<string, object>)o; if (Sisalla((List<object>)d["rengas"], lon, lat)) return (string)d["iso"]; }
                return null;
            }
            Oleta.Tosi(Alue(44.95, 34.10) == "UKR" && Alue(44.6, 33.47) == "UKR" && Alue(45.37, 36.49) == "UKR", "Simferopol, Sevastopol, Kertš");
            Oleta.Tosi(Alue(45.2, 36.9) == null && Alue(46.64, 32.6) == null, "Taman (Venäjä) ja Herson eivät Krimiä");
            Oleta.Tosi(Alue(42.67, 21.17) == "KOS" && Alue(35.33, 33.33) == "CYP" && Alue(35.13, 33.95) == "CYP", "Priština, Kyrenia, Famagusta");
            Oleta.Tosi(Alue(54.7, 20.5) == null && Alue(46.85, 29.64) == null && Alue(43.0, 41.0) == null, "Kaliningrad, Tiraspol, Suhumi: maarajojen mukaan");
        }

        [Testi] static void TunnetutNimenmuutokset()
        {
            var n = Nimet();
            Oleta.Tosi((n["Illichivsk|UKR"] as string) == "Tšornomorsk", "Illichivsk → Tšornomorsk (2016)");
            Oleta.Tosi((n["Kirovohrad|UKR"] as string) == "Kropyvnytskyi", "Kirovohrad → Kropyvnytskyi (2016)");
        }
    }
}
