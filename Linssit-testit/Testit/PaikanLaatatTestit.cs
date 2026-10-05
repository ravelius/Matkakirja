// Tarkka ISS-kuva: kuvauspaikan kuva Web Mercator -laatoiksi (KuvanPinta).
using System;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    public static class PaikanLaatatTestit
    {
        // Helsinki: 2048² kuva bboxissa; testissä 256² (pikseli 78 m): punainen kasvaa itään, vihreä etelään.
        static PaikanLaatat Kuva(int px = 256, double mPx = 78.1)
        {
            var rgb = new byte[px * px * 3];
            for (int y = 0; y < px; y++) for (int x = 0; x < px; x++) { int o = (y * px + x) * 3; rgb[o] = (byte)(x * 255 / (px - 1)); rgb[o + 1] = (byte)(y * 255 / (px - 1)); rgb[o + 2] = 77; }
            return new PaikanLaatat(rgb, px, px, 24.759409, 60.080169, 25.120591, 60.259831, mPx);
        }

        static (int x, int y, int px, int py) Paikka(int z, double lat, double lon)
        {
            double n = 256.0 * (1 << z), la = lat * Math.PI / 180;
            double gx = (lon + 180) / 360 * n, gy = (1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * n;
            return ((int)(gx / 256), (int)(gy / 256), (int)gx % 256, (int)gy % 256);
        }

        [Testi] static void TasotJaJuuri()
        {
            var p = Kuva(2048, 9.77);
            Oleta.Sama(13, p.ZMax, "9,77 m/px 60°N → z13 (9,6 m/px)");
            Oleta.Tosi(p.Rx >= 1 && p.Ry >= 1 && p.JuuriW <= 24.76 && p.JuuriE >= 25.12 && p.JuuriN >= 60.26 && p.JuuriS <= 60.08, "juuri kattaa");
            Oleta.Tosi(p.Laatat.Count > 80 && p.Laatat.Count < 400, $"laattoja {p.Laatat.Count}");
        }

        [Testi] static void KeskeltaVariOikeinJaUlkopuoliLapinakyva()
        {
            var p = Kuva();
            int z = p.ZMax;
            var (x, y, px, py) = Paikka(z, 60.17, 24.94);
            var r = p.Piirra(z, x, y);
            int o = (py * 256 + px) * 4;
            Oleta.Tosi(r[o + 3] == 255 && Math.Abs(r[o] - 127) <= 3 && Math.Abs(r[o + 1] - 127) <= 3 && r[o + 2] == 77, $"keskellä {r[o]},{r[o + 1]},{r[o + 2]},{r[o + 3]}");
            var (x2, y2, px2, py2) = Paikka(z, 60.25, 25.11);   // koillisnurkan lähellä: punainen täynnä, vihreä pieni
            var r2 = p.Piirra(z, x2, y2); int o2 = (py2 * 256 + px2) * 4;
            Oleta.Tosi(r2[o2] > 240 && r2[o2 + 1] < 20, $"koillinen {r2[o2]},{r2[o2 + 1]}");
            var (x3, y3, px3, py3) = Paikka(z, 60.30, 24.94);   // bboxin pohjoispuolella
            var r3 = p.Piirra(z, x3, y3);
            Oleta.Sama((byte)0, r3[(py3 * 256 + px3) * 4 + 3], "ulkopuoli alfa 0");
        }
    }
}
