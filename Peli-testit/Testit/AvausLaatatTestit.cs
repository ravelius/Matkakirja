// Aloituslennon avausnäkymän laatat (Assets/Matkakirja/Kartta/AvausLaatat.cs; build 22 laattojen esilataus).
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class AvausLaatatTestit
    {
        const double Lat = 51.507, Lon = -0.128;

        static (double lat, double lon) XyzKeskus(int z, int x, int y)
        {
            int n = 1 << z;
            return (System.Math.Atan(System.Math.Sinh(System.Math.PI * (1 - 2 * (y + 0.5) / n))) * 180 / System.Math.PI, (x + 0.5) / n * 360 - 180);
        }

        [Testi] static void KohteenLaattaOnMukanaJokaTasolla()
        {
            var l = AvausLaatat.Laatat(false, 6, 8, 0.7, Lat, Lon, 450, 45, 220);
            for (int z = 6; z <= 8; z++)
            {
                int n = 1 << z;
                int x = (int)System.Math.Floor((Lon + 180) / 360 * n);
                double la = Lat * System.Math.PI / 180;
                int y = (int)System.Math.Floor((1 - System.Math.Log(System.Math.Tan(la) + 1 / System.Math.Cos(la)) / System.Math.PI) / 2 * n);
                Oleta.Tosi(l.Contains((z, x, y)), $"Lontoon laatta Z{z}");
            }
        }

        [Testi] static void KaukaisetLaatatOvatKatseenSuunnassa()
        {
            // Katse lounaaseen (220°): 1 000 km:n päässä lounaassa (Biskajanlahti) mukana, koillisessa (Tanska) ei.
            var l = AvausLaatat.Laatat(false, 6, 6, 0.7, Lat, Lon, 450, 45, 220);
            var keskukset = l.Select(t => XyzKeskus(t.z, t.x, t.y)).ToList();
            Oleta.Tosi(keskukset.Any(k => k.lat > 42 && k.lat < 48 && k.lon > -10 && k.lon < -1), "lounas mukana");
            Oleta.Tosi(!keskukset.Any(k => k.lat > 54 && k.lat < 59 && k.lon > 7 && k.lon < 14), "koillinen pois");
        }

        [Testi] static void KarkeinTasoEnsin()
        {
            var l = AvausLaatat.Laatat(true, 6, 8, 0.0, Lat, Lon, 450, 45, 220);
            Oleta.Tosi(l.Count > 0, "laattoja");
            for (int i = 1; i < l.Count; i++) Oleta.Tosi(l[i - 1].z <= l[i].z, "tasojärjestys");
        }

        [Testi] static void MaaraPysyyKohtuullisena()
        {
            int n = AvausLaatat.Laatat(true, 6, 8, 0.0, Lat, Lon, 450, 45, 220).Count
                    + AvausLaatat.Laatat(false, 6, 9, 0.7, Lat, Lon, 450, 45, 220).Count
                    + AvausLaatat.Laatat(false, 6, 7, 0.7, Lat, Lon, 450, 45, 220).Count;
            Oleta.Tosi(n > 150 && n < 1500, $"laattoja {n}");
        }
    }
}
