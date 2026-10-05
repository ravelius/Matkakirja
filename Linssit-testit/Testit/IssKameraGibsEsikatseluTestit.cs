// ISS-kameran GIBS-pilvien offline-esikatselu (GIBS_PPM=<z9-mosaiikki.ppm> GIBS_XY="x0 y0" ESI_PPM=<ulos.ppm>
// [ESI_Z=11]): mosaiikista pilvet (yksi päivä), synteettinen metsäpohja z11-pikseleinä, KuvanTyosto.PiirraPilvet kuten
// kuvauspaikoilla. Ilman ympäristömuuttujia ohitetaan.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraGibsEsikatseluTestit
    {
        static (int w, int h, byte[] rgb) LuePpm(string polku)
        {
            var b = File.ReadAllBytes(polku); int i = 0;
            string Sana() { while (char.IsWhiteSpace((char)b[i])) i++; int a = i; while (!char.IsWhiteSpace((char)b[i])) i++; return System.Text.Encoding.ASCII.GetString(b, a, i - a); }
            Sana(); int w = int.Parse(Sana()), h = int.Parse(Sana()); Sana(); i++;
            var rgb = new byte[w * h * 3]; Buffer.BlockCopy(b, i, rgb, 0, rgb.Length); return (w, h, rgb);
        }

        [Testi]
        static void GibsEsikatselu()
        {
            var ppm = Environment.GetEnvironmentVariable("GIBS_PPM"); var xy = Environment.GetEnvironmentVariable("GIBS_XY");
            var ulos = Environment.GetEnvironmentVariable("ESI_PPM");
            if (string.IsNullOrEmpty(ppm) || string.IsNullOrEmpty(xy) || string.IsNullOrEmpty(ulos)) return;
            var (w, h, rgb) = LuePpm(ppm); var o = xy.Split(' ');
            int x0 = int.Parse(o[0]), y0 = int.Parse(o[1]);
            var g = GibsPilvet.Kokoa(x0, y0, w, h, new List<(DateTime, byte[][])> { (DateTime.Today, new[] { rgb, null, null, null }) });
            g.AurinkoAz = 150; g.AurinkoKorkeus = 50; g.Yksityiskohta = Environment.GetEnvironmentVariable("ESI_RAAKA") == "1" ? null : new Pilvikentta();
            int z = int.TryParse(Environment.GetEnvironmentVariable("ESI_Z"), out var ez) ? ez : 11, k = 1 << (z - GibsPilvet.Z);
            // Alueen keskeltä 4 × 4 laattaa z:lla.
            int cx = (x0 + w / 2) * k / 256, cy = (y0 + h / 2) * k / 256, L = 4, S = 256 * L;
            var kuva = new byte[S * S * 3];
            for (int ty = 0; ty < L; ty++)
                for (int tx = 0; tx < L; tx++)
                {
                    var rgba = new byte[256 * 256 * 4];
                    for (int i = 0; i < 256 * 256; i++)
                    {
                        int px = i % 256, py = i / 256; double t = Math.Sin((cx * 256 + tx * 256 + px) * 0.05) * Math.Cos((cy * 256 + ty * 256 + py) * 0.04);
                        rgba[i * 4] = (byte)(38 + 8 * t); rgba[i * 4 + 1] = (byte)(72 + 10 * t); rgba[i * 4 + 2] = (byte)(48 + 6 * t); rgba[i * 4 + 3] = 255;
                    }
                    KuvanTyosto.PiirraPilvet(g, z, cx - L / 2 + tx, cy - L / 2 + ty, rgba, true);
                    for (int py = 0; py < 256; py++)
                        for (int px = 0; px < 256; px++)
                        {
                            int s = (py * 256 + px) * 4, d = ((ty * 256 + py) * S + tx * 256 + px) * 3;
                            kuva[d] = rgba[s]; kuva[d + 1] = rgba[s + 1]; kuva[d + 2] = rgba[s + 2];
                        }
                }
            using var f = File.Create(ulos);
            var otsake = System.Text.Encoding.ASCII.GetBytes($"P6 {S} {S} 255\n"); f.Write(otsake, 0, otsake.Length); f.Write(kuva, 0, kuva.Length);
            Console.WriteLine($"esikatselu {ulos}: z{z}, peitto {g.Peitto * 100:0} %");
        }
    }
}
