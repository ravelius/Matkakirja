// ISS-kameran pilvikenttä (peitto maalla, selkeä meri, determinismi; valinnainen esikatselu PILVI_PPM) ja S2-indeksin
// jäsennys Karttasepän skeemalla (1.10.2026).
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraPilviJaIndeksiTestit
    {
        [Testi]
        static void PilviaMaallaEiMerella()
        {
            var maa = new Pilvikentta().Kalibroi();
            var meri = new Pilvikentta { MaaOsuus = (la, lo) => 0 }.Kalibroi();
            int n = 0, pilvi = 0, merella = 0; var r = new Random(5);
            for (int i = 0; i < 4000; i++)
            {
                double la = 59 + r.NextDouble() * 3, lo = 22 + r.NextDouble() * 6;
                if (maa.Nayte(la, lo).alfa > 0.5) pilvi++;
                if (meri.Nayte(la, lo).alfa > 0.05) merella++;
                n++;
            }
            double osuus = pilvi / (double)n;
            Oleta.Tosi(osuus > 0.05 && osuus < 0.35, $"pilveä {osuus:0.00}");
            Oleta.Sama(0, merella);
            Oleta.Tosi(maa.Nayte(60.17, 24.94) == new Pilvikentta().Kalibroi().Nayte(60.17, 24.94), "deterministinen");
            // Varjo osuu pilvestä poispäin auringosta (aurinko länsiluoteessa → varjo itäkaakossa).
            int osui = 0, kokeita = 0;
            for (int i = 0; i < 3000 && kokeita < 40; i++)
            {
                double la = 60 + r.NextDouble(), lo = 24 + r.NextDouble() * 2;
                if (maa.Nayte(la, lo).alfa < 0.95) continue;
                kokeita++;
                double L = 1500 / Math.Tan(16 * Math.PI / 180), az = 290 * Math.PI / 180;
                double dla = -Math.Cos(az) * L / 111320, dlo = -Math.Sin(az) * L / (111320 * Math.Cos(la * Math.PI / 180));
                if (maa.Nayte(la + dla, lo + dlo).varjo > 0.1) osui++;
            }
            Oleta.Tosi(kokeita > 10 && osui > kokeita * 0.7, $"varjo väärällä puolella: {osui}/{kokeita}");
            var v = maa.Nayte(60.3, 25.1);
            Oleta.Tosi(v.varjo >= 0 && v.varjo <= 0.35 + 1e-9 && v.kirkkaus >= 0.7 && v.kirkkaus <= 1, $"{v}");
        }

        [Testi]
        static void PilviEsikatselu()   // vain PILVI_PPM: 120 × 90 km Helsingin pohjoispuolelta 150 m:n pikselein
        {
            var ppm = Environment.GetEnvironmentVariable("PILVI_PPM");
            if (string.IsNullOrEmpty(ppm)) return;
            var k = new Pilvikentta().Kalibroi(); int W = 800, H = 600; var b = new byte[W * H * 3];
            var kello = System.Diagnostics.Stopwatch.StartNew();
            for (int y = 0; y < H; y++) for (int x = 0; x < W; x++)
            {
                double la = 61.0 - y * 150 / 111320.0, lo = 24.0 + x * 150 / (111320.0 * Math.Cos(60.5 * Math.PI / 180));
                var (a, kk, v) = k.Nayte(la, lo);
                double g = 90 * (1 - v);
                double c = g * (1 - a) + 246 * kk * a;
                int i = (y * W + x) * 3; b[i] = (byte)Math.Min(255, c * 0.85); b[i + 1] = (byte)Math.Min(255, c); b[i + 2] = (byte)Math.Min(255, c * 0.8);
            }
            Console.WriteLine($"  pilviesikatselu {W}×{H}: {kello.ElapsedMilliseconds} ms ({kello.Elapsed.TotalMilliseconds * 1000 / (W * H):0.0} µs/px)");
            using var f = File.Create(ppm); var h = System.Text.Encoding.ASCII.GetBytes($"P6 {W} {H} 255\n"); f.Write(h, 0, h.Length); f.Write(b, 0, b.Length);
        }

        [Testi]
        static void IndeksinJasennys()
        {
            var lut = string.Join(",", Enumerable.Range(0, 256).Select(i => Math.Min(255, i + 10)));
            var json = "{\"versio\":\"v1\",\"tci_lut\":[" + lut + "],\"ruutuja\":2,\"ruudut\":{" +
                "\"26SLH\":{\"bbox\":[-29.3039,37.8375,-28.0253,38.8444],\"epsg\":32626,\"vesisiirto\":[-0.00429,-0.00255,0.00017]," +
                "\"valinnat\":[{\"id\":\"S2B_26SLH_20240626_0_L2A\",\"tci\":\"https://x/TCI.tif\",\"pvm\":\"2024-06-26\",\"kk\":6,\"pilvi\":0.66,\"varjo\":0,\"lumi\":0,\"nodata\":0,\"scl\":\"https://x/SCL.tif\",\"pisteet\":0.66}," +
                "{\"id\":\"b\",\"tci\":\"https://y/TCI.tif\",\"pvm\":\"2023-07-01\",\"kk\":7,\"pilvi\":1.2,\"varjo\":0,\"lumi\":0,\"nodata\":3,\"scl\":\"https://y/SCL.tif\",\"pisteet\":2}," +
                "{\"id\":\"t\",\"tci\":\"https://t/TCI.tif\",\"pvm\":\"2025-08-04\",\"nodata\":50,\"rata\":53,\"toinen_rata\":true,\"scl\":\"https://t/SCL.tif\"}]}," +
                "\"35VLG\":{\"bbox\":[23.37,59.43,25.39,60.41],\"epsg\":32635,\"valinnat\":[{\"id\":\"c\",\"tci\":\"https://z/TCI.tif\",\"pvm\":\"2025-08-04\",\"kk\":8,\"pilvi\":0.4,\"scl\":\"https://z/SCL.tif\"}]}}}";
            var x = S2Indeksi.Jasenna(json);
            Oleta.Sama("v1", x.Versio); Oleta.Sama(2, x.Ruudut.Count); Oleta.Sama((byte)10, x.Lut[0]); Oleta.Sama((byte)255, x.Lut[250]);
            var r = x.Ruudut["26SLH"];
            Oleta.Sama(3, r.Valinnat.Count); Oleta.Sama("https://x/SCL.tif", r.Valinnat[0].Scl); Oleta.Sama(-29.3039, r.W); Oleta.Sama(3, r.Vesisiirto.Length);
            Oleta.Sama("https://y/TCI.tif", r.Ruutu(1).Url); Oleta.Tosi(r.Ruutu(3) == null);
            // v2: toisen radan täytekuva (Karttaseppä 5.10.)
            Oleta.Sama(2, r.ToisenRadanValinta); Oleta.Tosi(r.Valinnat[2].ToinenRata && !r.Valinnat[1].ToinenRata);
            Oleta.Sama(-1, x.Ruudut["35VLG"].ToisenRadanValinta);
            Oleta.Sama(35, x.Ruudut["35VLG"].Ruutu().Vyohyke);
            Oleta.Sama(1, x.Alueella(24, 60, 25, 60.3).Count());
        }
    }
}
