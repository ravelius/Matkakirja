// ISS-kameran työstö: laattajoukko juurijakoineen (synteettinen) ja valinnainen päästä päähän -ajo oikealla datalla:
// TYOSTO_PPM=<kuva.ppm> COG_URL=<35VLG TCI> ./kaanna.sh IssKameraTyosto → 400 mm nadir Helsinki: suunnitelma, TCI- ja
// SCL-haku, maamaski, laatat pilvineen ja tarkimman tason kooste.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraTyostoTestit
    {
        [Testi]
        static void LaattajoukkoJaJuurijako()
        {
            var k = IssKameraSuunnitelmaTestit.Kamera(60.17, 24.94, 420, 60.17, 24.94, 400, 1024);
            var ty = new KuvanTyosto(); ty.Suunnittele(Kuvasuunnitelma.Naytteet(k, 16, 12));
            Oleta.Tosi(ty.Rx >= 1 && ty.Ry >= 1 && ty.Rx <= 2 && ty.Ry <= 2, $"juuri {ty.Rx}×{ty.Ry}");
            Oleta.Tosi(ty.W <= 24.94 && ty.E >= 24.94 && ty.S <= 60.17 && ty.N >= 60.17, "rajaus kattaa Helsingin");
            int zmax = ty.Laatat.Max(l => l.z);
            Oleta.Tosi(zmax == 13, $"tarkin taso z{zmax} (1024 px: ~36 m → z12, +1)");
            foreach (var (z, x, y) in ty.Laatat)
                if (z > KuvanTyosto.JuuriZ) Oleta.Tosi(ty.Laatat.Contains((z - 1, x >> 1, y >> 1)), $"esivanhempi puuttuu {z}/{x}/{y}");
            Oleta.Sama("0/0/0", ty.Polku(6, ty.X0, ty.Y0));
        }

        static byte[] Curl(string url, long a, long n)
        {
            var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r {a}-{a + n - 1} {url}") { RedirectStandardOutput = true, UseShellExecute = false });
            var m = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(m); p.WaitForExit(); return m.ToArray();
        }

        [Testi]
        static void PaastaPaahanHelsinki400mm()   // vain TYOSTO_PPM + COG_URL (35VLG)
        {
            var ppm = Environment.GetEnvironmentVariable("TYOSTO_PPM"); var url = Environment.GetEnvironmentVariable("COG_URL");
            if (string.IsNullOrEmpty(ppm) || string.IsNullOrEmpty(url) || !url.Contains("35/V/LG")) return;
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var k = IssKameraSuunnitelmaTestit.Kamera(60.17, 24.94, 420, 60.17, 24.94, 400, 3240);
            var naytteet = Kuvasuunnitelma.Naytteet(k);
            var tci = CogOtsake.Jasenna(Curl(url, 0, 65536));
            var ru = new S2Ruutu { Tunnus = "35VLG", Url = url, W = 23.3, S = 59.4, E = 25.3, N = 60.45 };
            var ty = new KuvanTyosto(); ty.Data.Ruudut.Add((ru, tci)); ty.Suunnittele(naytteet);
            long tavut = 0;
            foreach (var (taso, tx, ty2) in Kuvasuunnitelma.Laatat(ru, tci, naytteet))
            {
                var (a, n) = tci.Tasot[taso].Alue(tx, ty2); tavut += n;
                ty.Data.Laatat[("35VLG", taso, tx, ty2)] = CogOtsake.PuraLaatta(tci.Tasot[taso], Curl(url, a, n));
            }
            var sclUrl = url.Replace("TCI.tif", "SCL.tif"); var scl = CogOtsake.Jasenna(Curl(sclUrl, 0, 65536));
            int st = scl.Tasot.Count - 1; var stt = scl.Tasot[st];
            var sclLaatat = new System.Collections.Generic.Dictionary<(int, int), byte[]>();
            for (int x = 0; x < stt.LaattojaX; x++) for (int y = 0; y < stt.LaattojaY; y++)
                { var (a, n) = stt.Alue(x, y); tavut += n; sclLaatat[(x, y)] = CogOtsake.PuraLaatta(stt, Curl(sclUrl, a, n)); }
            ty.LisaaMaamaski(ru, scl, (x, y) => sclLaatat.TryGetValue((x, y), out var l) ? l : null);
            ty.Pilvet = new Pilvikentta { MaaOsuus = ty.MaaOsuus }.Kalibroi();
            long haku = kello.ElapsedMilliseconds; kello.Restart();
            int zmax = ty.Laatat.Max(l => l.z); var huiput = ty.Laatat.Where(l => l.z == zmax - 1).ToList();
            int x0 = huiput.Min(l => l.x), x1 = huiput.Max(l => l.x), y0 = huiput.Min(l => l.y), y1 = huiput.Max(l => l.y);
            int W = (x1 - x0 + 1) * 256, H = (y1 - y0 + 1) * 256; var kuva = new byte[W * H * 3]; var rgba = new byte[256 * 256 * 4];
            foreach (var (z, x, y) in huiput)
            {
                ty.Piirra(z, x, y, rgba);
                for (int py = 0; py < 256; py++) for (int px = 0; px < 256; px++) for (int c = 0; c < 3; c++)
                    kuva[(((y - y0) * 256 + py) * W + (x - x0) * 256 + px) * 3 + c] = rgba[(py * 256 + px) * 4 + c];
            }
            Console.WriteLine($"  400 mm: {ty.Laatat.Count} laattaa (juuri {ty.Rx}×{ty.Ry}, z{ty.Laatat.Min(l => l.z)}–{zmax}), haku {tavut / 1e6:0.0} Mt {haku} ms, z{zmax - 1} {huiput.Count} laattaa {kello.ElapsedMilliseconds} ms");
            using var f = File.Create(ppm); var h = System.Text.Encoding.ASCII.GetBytes($"P6 {W} {H} 255\n"); f.Write(h, 0, h.Length); f.Write(kuva, 0, kuva.Length);
        }
    }
}
