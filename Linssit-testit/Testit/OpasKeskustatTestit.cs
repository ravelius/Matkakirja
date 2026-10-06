// Kaupunkien keskustat (juna 148): korjaustaulu Resources/Opas/keskustat.json kattaa kaikki maanosat, ja korjaukset ovat
// järkeviä (250 m – 30 km Natural Earth -pisteestä). Pistokokeet Päätoimittajalle: Amsterdam, Tokio, Kairo, Rio, Sydney, Toronto.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasKeskustatTestit
    {
        const string Polku = "../Assets/Matkakirja/Linssit/Resources/Opas/keskustat.json";

        static Dictionary<string, object> Taulu() =>
            (Dictionary<string, object>)((Dictionary<string, object>)MiniJson.Jasenna(File.ReadAllText(Polku)))["keskustat"];

        static (double, double) P(object o) { var l = (IList<object>)o; return (Convert.ToDouble(l[0]), Convert.ToDouble(l[1])); }

        [Testi] static void TauluKattaaMaailmanJaOnJarkeva()
        {
            var t = Taulu();
            Oleta.Tosi(t.Count > 6000, $"korjauksia {t.Count}");
            foreach (var kv in t)
            {
                var o = kv.Key.Split(',');
                double la = double.Parse(o[0], System.Globalization.CultureInfo.InvariantCulture), lo = double.Parse(o[1], System.Globalization.CultureInfo.InvariantCulture);
                var (pla, plo) = P(kv.Value);
                double d = KierrosLento.EtaisyysM(la, lo, pla, plo);
                Oleta.Tosi(d >= 240 && d <= 30500, $"{kv.Key}: {d:F0} m");
            }
        }

        [Testi] static void Pistokokeet()
        {
            var t = Taulu();
            void Tarkista(string avain, double lat, double lon, double maxM)
            {
                Oleta.Tosi(t.TryGetValue(avain, out var v), "puuttuu " + avain);
                var (la, lo) = P(v);
                Oleta.Tosi(KierrosLento.EtaisyysM(la, lo, lat, lon) < maxM, $"{avain} → {la:F4},{lo:F4}");
            }
            Tarkista("52.3519,4.9147", 52.3728, 4.8936, 2500);      // Amsterdam → keskusta (Dam)
            Tarkista("35.6870,139.7495", 35.6895, 139.6917, 1000);  // Tokio (Wikidata Q1490: Shinjuku, Tokion hallitus)
            Tarkista("30.0519,31.2480", 30.0444, 31.2357, 1000);    // Kairo
            Tarkista("-22.9231,-43.2270", -22.9111, -43.2056, 1000); // Rio de Janeiro
            Tarkista("-33.9181,151.1832", -33.8688, 151.2093, 1000); // Sydney
            Tarkista("43.7019,-79.4220", 43.6532, -79.3832, 2500);  // Toronto
        }
    }
}
