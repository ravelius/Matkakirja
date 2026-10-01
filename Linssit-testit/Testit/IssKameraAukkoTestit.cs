// ISS-kameran aukot oikealla indeksillä (INDEKSI_JSON + AUKKO_PPM; verkko): 400 mm Helsinki 4096 × 5120 kuten laitekoe 3,
// Ensisijainen päällä; lehtien läpinäkyvät (ei S2-dataa) pikselit lasketaan ja z13-lehdistä kooste kuvaksi.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraAukkoTestit
    {
        static byte[] Curl(string url, long a, long n)
        {
            var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r {a}-{a + n - 1} {url}") { RedirectStandardOutput = true, UseShellExecute = false });
            var m = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(m); p.WaitForExit(); return m.ToArray();
        }

        [Testi]
        static void Helsinki400mmEiAukkoja()
        {
            var ip = Environment.GetEnvironmentVariable("INDEKSI_JSON"); var ppm = Environment.GetEnvironmentVariable("AUKKO_PPM");
            if (string.IsNullOrEmpty(ip) || string.IsNullOrEmpty(ppm)) return;
            var x = S2Indeksi.Jasenna(File.ReadAllText(ip));
            var k = IssKameraSuunnitelmaTestit.Kamera(57.51, 25.81, 420, 60.17, 24.94, 320, 4096);
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
            var lehdet = ty.Lehdet(); int zmax = lehdet.Max(l => l.z); var huiput = lehdet.Where(l => l.z == zmax).ToList();
            int x0 = huiput.Min(l => l.x), x1 = huiput.Max(l => l.x), y0 = huiput.Min(l => l.y), y1 = huiput.Max(l => l.y);
            int W = (x1 - x0 + 1) * 64, H = (y1 - y0 + 1) * 64; var kuva = new byte[W * H * 3]; var rgba = new byte[256 * 256 * 4];
            long aukot = 0, kaikki = 0;
            foreach (var (z, xx, yy) in huiput)
            {
                Uudelleenprojisointi.Laatta(ty.Data, z, xx, yy, rgba);
                for (int py = 0; py < 64; py++) for (int px = 0; px < 64; px++)
                {
                    int o = ((py * 4) * 256 + px * 4) * 4; kaikki++; if (rgba[o + 3] == 0) aukot++;
                    for (int c = 0; c < 3; c++) kuva[(((yy - y0) * 64 + py) * W + (xx - x0) * 64 + px) * 3 + c] = rgba[o + 3] == 0 ? (byte)(c == 0 ? 255 : 0) : rgba[o + c];
                }
            }
            Console.WriteLine($"  400 mm: {ty.Data.Ruudut.Count} ruutua ({string.Join(" ", ty.Data.Ruudut.Select(r => $"{r.ruutu.Tunnus}:{r.ruutu.Nodata:0}%"))}), haku {tavut / 1e6:0.0} Mt, z{zmax}-lehtiä {huiput.Count}, aukkoja {100.0 * aukot / kaikki:0.00} %");
            using var f = File.Create(ppm); var h = System.Text.Encoding.ASCII.GetBytes($"P6 {W} {H} 255\n"); f.Write(h, 0, h.Length); f.Write(kuva, 0, kuva.Length);
        }
    }
}
