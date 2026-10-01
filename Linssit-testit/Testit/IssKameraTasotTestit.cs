// ISS-kameran koko laattajoukko tasoittain (INDEKSI_JSON + TASOT_PPM; verkko): PiirraKaikki kuten laitteella, täyttöpikselit
// (meri, alfa 254) tasoittain ja kooste tasolta TASO (oletus z12) — Cesium piirtää myös isälaattoja (laitekoe 5).
//   TASOT_KULMA="nlat nlon h klat klon mm" (oletus 400 mm Helsinki 4:5)
using System;
using System.Collections.Concurrent;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraTasotTestit
    {
        static byte[] Curl(string url, long a, long n)
        {
            var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r {a}-{a + n - 1} {url}") { RedirectStandardOutput = true, UseShellExecute = false });
            var m = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(m); p.WaitForExit(); return m.ToArray();
        }

        [Testi]
        static void KaikkiTasot()
        {
            var ip = Environment.GetEnvironmentVariable("INDEKSI_JSON"); var ppm = Environment.GetEnvironmentVariable("TASOT_PPM");
            if (string.IsNullOrEmpty(ip) || string.IsNullOrEmpty(ppm)) return;
            var kv = (Environment.GetEnvironmentVariable("TASOT_KULMA") ?? "57.51 25.81 420 60.17 24.94 320").Split(' ').Select(v => double.Parse(v, System.Globalization.CultureInfo.InvariantCulture)).ToArray();
            int TASO = int.Parse(Environment.GetEnvironmentVariable("TASO") ?? "12");
            var x = S2Indeksi.Jasenna(File.ReadAllText(ip));
            var k = IssKameraSuunnitelmaTestit.Kamera(kv[0], kv[1], kv[2], kv[3], kv[4], kv[5], 4096); k.Korkeus = 5120;
            var n = Kuvasuunnitelma.Naytteet(k);
            double w = n.Min(q => q.LonMin), s = n.Min(q => q.LatMin), e = n.Max(q => q.LonMax), nn = n.Max(q => q.LatMax);
            var ruudut = Kuvasuunnitelma.Ruudut(n, x.Alueella(w, s, e, nn).Select(q => q.Ruutu())).Keys.ToList();
            var ty = new KuvanTyosto { Ensisijainen = true }; ty.Data.Lut = x.Lut;
            foreach (var ru in ruudut) { try { ty.Data.Ruudut.Add((ru, CogOtsake.Jasenna(Curl(ru.Url, 0, 16384)))); } catch { } }
            ty.Suunnittele(n);
            long tavut = 0;
            foreach (var (ru, o) in ty.Data.Ruudut)
                foreach (var (taso, tx, tyy) in ty.HaettavatLaatat(ru, o))
                {
                    var (a, len) = o.Tasot[taso].Alue(tx, tyy); tavut += len;
                    ty.Data.Pakatut[(ru.Tunnus, taso, tx, tyy)] = (o.Tasot[taso], Curl(ru.Url, a, len));
                }
            var tilastot = new ConcurrentDictionary<int, long[]>();
            var tasolla = ty.Laatat.Where(l => l.z == TASO).ToList();
            int x0 = tasolla.Min(l => l.x), x1 = tasolla.Max(l => l.x), y0 = tasolla.Min(l => l.y), y1 = tasolla.Max(l => l.y);
            int W = (x1 - x0 + 1) * 64, H = (y1 - y0 + 1) * 64; var kuva = new byte[W * H * 3];
            var kello = System.Diagnostics.Stopwatch.StartNew();
            ty.PiirraKaikki((l, rgba) =>
            {
                long tay = 0; for (int i = 3; i < rgba.Length; i += 16) if (rgba[i] == 254) tay++;
                var t = tilastot.GetOrAdd(l.z, _ => new long[3]);
                System.Threading.Interlocked.Increment(ref t[0]); System.Threading.Interlocked.Add(ref t[1], tay); System.Threading.Interlocked.Add(ref t[2], rgba.Length / 16);
                if (l.z != TASO) return;
                for (int py = 0; py < 64; py++) for (int px = 0; px < 64; px++)
                {
                    int o = ((py * 4) * 256 + px * 4) * 4;
                    for (int c = 0; c < 3; c++) kuva[(((l.y - y0) * 64 + py) * W + (l.x - x0) * 64 + px) * 3 + c] = rgba[o + 3] == 254 ? (byte)(c == 0 ? 255 : 0) : rgba[o + c];
                }
            }, Environment.ProcessorCount, new byte[] { 57, 72, 85 });
            Console.WriteLine($"  {ty.Data.Ruudut.Count} ruutua, haku {tavut / 1e6:0.0} Mt, {ty.Laatat.Count} laattaa, piirto {kello.ElapsedMilliseconds / 1000.0:0.0} s");
            foreach (var kvp in tilastot.OrderBy(t => t.Key)) Console.WriteLine($"    z{kvp.Key}: {kvp.Value[0]} laattaa, täyttöä {100.0 * kvp.Value[1] / Math.Max(1, kvp.Value[2]):0.00} %");
            using var f = File.Create(ppm); var h = System.Text.Encoding.ASCII.GetBytes($"P6 {W} {H} 255\n"); f.Write(h, 0, h.Length); f.Write(kuva, 0, kuva.Length);
        }
    }
}
