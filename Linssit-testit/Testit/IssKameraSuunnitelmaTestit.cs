// ISS-kameran kuvasuunnitelma: nadir 400 mm Helsingin yllä tarvitsee 10 m:n tason (17 laattaa, 29 Mt), 50 mm:n vino
// kaarinäkymä (ISS 700 km etelään) 180 m/px lähimmillään ja km:ejä horisontissa; horisontin yli jäävät solut putoavat pois. Valinnainen verkkotesti (COG_URL = 35VLG:n TCI)
// laskee 400 mm:n kuvan laatat ja tavut oikeasta otsakkeesta.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraSuunnitelmaTestit
    {
        static (double, double, double) Norm((double x, double y, double z) v) { double l = Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z); return (v.x / l, v.y / l, v.z / l); }
        static (double, double, double) Ristiin((double x, double y, double z) a, (double x, double y, double z) b) => (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

        /// <summary>Kamera korkeudella h (km) pisteen (lat, lon) yllä, katse kohti maapistettä (klat, klon); kuva 36 × 24 mm.</summary>
        internal static KuvaKamera Kamera(double lat, double lon, double h, double klat, double klon, double mm, int leveys = 4096)
        {
            var maa = Kuvasuunnitelma.Ecef(lat, lon); var n = Norm(maa);
            var p = (maa.x + n.Item1 * h * 1000, maa.y + n.Item2 * h * 1000, maa.z + n.Item3 * h * 1000);
            var k = Kuvasuunnitelma.Ecef(klat, klon);
            var katse = Norm((k.x - p.Item1, k.y - p.Item2, k.z - p.Item3));
            var oikea = Norm(Ristiin(katse, n)); var ylos = Norm(Ristiin(oikea, katse));
            return new KuvaKamera { Paikka = p, Katse = katse, Oikea = oikea, Ylos = ylos,
                PystykenttaAst = 2 * Math.Atan(12 / mm) * 180 / Math.PI, Leveys = leveys, Korkeus = leveys * 2 / 3 };
        }

        [Testi]
        static void Nadir400mmTarvitsee10m()
        {
            var n = Kuvasuunnitelma.Naytteet(Kamera(60.17, 24.94, 420, 60.17, 24.94, 400));
            Oleta.Sama(48 * 36, n.Count);
            double m = n.Average(q => q.MetriaPikseli);
            Oleta.Tosi(m > 7 && m < 11, $"m/px {m:0.0}");
            Oleta.Tosi(Math.Abs(n.Average(q => q.Lat) - 60.17) < 0.05, "keskipiste");
        }

        [Testi]
        static void Vino50mmPorrastuuJaHorisonttiPutoaa()
        {
            var n = Kuvasuunnitelma.Naytteet(Kamera(53.96, 26.79, 420, 61.74, 24.35, 50));
            Oleta.Tosi(n.Count < 48 * 36, "horisontin yli jäävät solut pois");
            double lahin = n.Min(q => q.MetriaPikseli), kaukaisin = n.Max(q => q.MetriaPikseli);
            Oleta.Tosi(lahin < 250 && kaukaisin > 1000, $"m/px {lahin:0}–{kaukaisin:0}");
            Console.WriteLine($"  50 mm: {n.Count} solua, {lahin:0}–{kaukaisin:0} m/px, lat {n.Min(q => q.LatMin):0.0}–{n.Max(q => q.LatMax):0.0}");
        }

        [Testi]
        static void Oikea400mmLaattaJaTavut()   // vain COG_URL-muuttujalla (35VLG)
        {
            var url = Environment.GetEnvironmentVariable("COG_URL");
            if (string.IsNullOrEmpty(url) || !url.Contains("35/V/LG")) return;
            var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r 0-65535 {url}") { RedirectStandardOutput = true, UseShellExecute = false });
            var mem = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(mem); p.WaitForExit();
            var o = CogOtsake.Jasenna(mem.ToArray());
            var (s, w) = Utm.Taakse(o.Pohjoinen0 - 109800, o.Ita0, 35); var (nn, e) = Utm.Taakse(o.Pohjoinen0, o.Ita0 + 109800, 35);
            var ru = new S2Ruutu { Tunnus = "35VLG", Url = url, W = Math.Min(w, Utm.Taakse(o.Ita0, o.Pohjoinen0, 35).lon), S = Utm.Taakse(o.Ita0 + 109800, o.Pohjoinen0 - 109800, 35).lat,
                E = Utm.Taakse(o.Ita0 + 109800, o.Pohjoinen0 - 109800, 35).lon, N = Utm.Taakse(o.Ita0, o.Pohjoinen0, 35).lat };
            var n = Kuvasuunnitelma.Naytteet(Kamera(60.17, 24.94, 420, 60.17, 24.94, 400));
            var laatat = Kuvasuunnitelma.Laatat(ru, o, n);
            long tavut = Kuvasuunnitelma.Tavut(o, laatat);
            Console.WriteLine($"  400 mm 35VLG: {laatat.Count} laattaa (tasot {string.Join(",", laatat.Select(l => l.taso).Distinct())}), {tavut / 1e6:0.0} Mt");
            Oleta.Tosi(laatat.All(l => l.taso == 0) && laatat.Count > 0, "10 m");
        }
    }
}
