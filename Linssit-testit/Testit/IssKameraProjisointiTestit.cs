// ISS-kameran uudelleenprojisointi: Mercator-laatan pikselin paikka ja koko, sekä valinnainen verkkotesti: Helsingin
// keskustan z13-laatat 3 × 2 oikeasta 35VLG-COG:sta (COG_URL), kuva COG_PPM_MERC-polkuun silmämääräistä tarkistusta varten.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraProjisointiTestit
    {
        [Testi]
        static void MercatorPikseli()
        {
            var (lat, lon) = Uudelleenprojisointi.Pikseli(0, 0, 0, 128, 128);
            Oleta.Tosi(Math.Abs(lat) < 1e-9 && Math.Abs(lon) < 1e-9, $"{lat} {lon}");
            var (la2, lo2) = Uudelleenprojisointi.Pikseli(1, 1, 0, 0, 0);
            Oleta.Tosi(Math.Abs(lo2) < 1e-9 && Math.Abs(la2 - 85.0511287798) < 1e-6, $"{la2} {lo2}");
            double m = Uudelleenprojisointi.PikseliM(13, 60);
            Oleta.Tosi(Math.Abs(m - 9.554628535647032) < 1e-6, $"{m}");
        }

        static byte[] Curl(string url, long a, long n)
        {
            var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r {a}-{a + n - 1} {url}") { RedirectStandardOutput = true, UseShellExecute = false });
            var m = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(m); p.WaitForExit(); return m.ToArray();
        }

        [Testi]
        static void OikeaHelsinkiZ13()   // vain COG_URL (35VLG)
        {
            var url = Environment.GetEnvironmentVariable("COG_URL");
            if (string.IsNullOrEmpty(url) || !url.Contains("35/V/LG")) return;
            var o = CogOtsake.Jasenna(Curl(url, 0, 65536));
            var ru = new S2Ruutu { Tunnus = "35VLG", Url = url, W = 23.3, S = 59.4, E = 25.3, N = 60.45 };
            var d = new KuvaData(); d.Ruudut.Add((ru, o));
            int z = 13, x0 = (int)((24.94 + 180) / 360 * (1 << z)) - 1;
            double la = 60.17 * Math.PI / 180; int y0 = (int)((1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * (1 << z));
            // Tarvittavat COG-laatat: laattojen kulmapisteiden UTM-rajaus tasolla 0.
            var t = o.Tasot[0];
            var tarve = new System.Collections.Generic.HashSet<(int, int)>();
            for (int x = x0; x < x0 + 3; x++) for (int y = y0; y < y0 + 2; y++) foreach (var (px, py) in new[] { (0, 0), (256, 0), (0, 256), (256, 256) })
            {
                var (pla, plo) = Uudelleenprojisointi.Pikseli(z, x, y, px, py); var (e, n) = Utm.Eteen(pla, plo, 35);
                tarve.Add(((int)((e - o.Ita0) / 10 / t.LaattaL), (int)((o.Pohjoinen0 - n) / 10 / t.LaattaK)));
            }
            foreach (var (tx, ty) in tarve.ToList())   // naapurit bilineaarisen reunan vuoksi
                foreach (var (dx, dy) in new[] { (1, 0), (0, 1), (1, 1) }) tarve.Add((tx + dx, ty + dy));
            foreach (var (tx, ty) in tarve)
            {
                if (tx >= t.LaattojaX || ty >= t.LaattojaY) continue;
                var (alku, pit) = t.Alue(tx, ty);
                d.Laatat[("35VLG", 0, tx, ty)] = CogOtsake.PuraLaatta(t, Curl(url, alku, pit));
            }
            var kuva = new byte[768 * 512 * 3]; var l = new byte[256 * 256 * 4];
            var kello = System.Diagnostics.Stopwatch.StartNew(); int peitto = 0;
            for (int i = 0; i < 3; i++) for (int j = 0; j < 2; j++)
            {
                peitto += Uudelleenprojisointi.Laatta(d, z, x0 + i, y0 + j, l);
                for (int py = 0; py < 256; py++) for (int px = 0; px < 256; px++)
                    for (int c = 0; c < 3; c++) kuva[((j * 256 + py) * 768 + i * 256 + px) * 3 + c] = l[(py * 256 + px) * 4 + c];
            }
            Console.WriteLine($"  z13 3×2: {tarve.Count} COG-laattaa, peitto {peitto}/{6 * 65536}, projisointi {kello.ElapsedMilliseconds} ms");
            var ppm = Environment.GetEnvironmentVariable("COG_PPM_MERC");
            if (!string.IsNullOrEmpty(ppm))
            {
                using var f = File.Create(ppm); var h = System.Text.Encoding.ASCII.GetBytes("P6 768 512 255\n"); f.Write(h, 0, h.Length); f.Write(kuva, 0, kuva.Length);
            }
            // Meren tummimmat TCI-pikselit voivat olla 0,0,0 (= nodata): sallitaan 0,1 %.
            Oleta.Tosi(peitto > 6 * 65536 * 0.999, $"peitto {peitto}");
        }
    }
}
