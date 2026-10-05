// TARKKA ISS-KUVA: KUVAUSPAIKAN KUVA KUVAN PINNAKSI (omistaja 4.10.2026; Karttasepän kuvauspaikka 2048² jpg, 20 × 20 km, ylin rivi
// pohjoinen, pikselit tasavälein lon/lat-bboxissa). Kuvasta tehdään Web Mercator -laattapuu KuvanTyoston tapaan (juuri z6,
// lehdet tasolla, jonka pikseli on kuvan pikseliä tarkempi), ja AstronauttiKerros.KuvanPinta piirtää sen S2:n paikalle
// kuvauksen ajaksi. Kuvan ulkopuoli on läpinäkyvä (alla oleva pinta näkyy), ja karkeammat tasot näytteistetään kuvan
// puolitetuista versioista (laatikkosuodin), ettei kaukotasoille tule kohinaa. Laatan rivi 0 = pohjoinen.
// Puhdas C#: Linssit-testit PaikanLaatatTestit.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class PaikanLaatat
    {
        public const int Koko = 256;
        readonly List<(byte[] rgb, int w, int h)> tasot = new List<(byte[], int, int)>();
        public readonly double W, S, E, N;
        public readonly int ZMax;
        /// <summary>Juurijako (z6): vasen yläkulma, koko ja rajaus asteina (AstronauttiKerros.Pinta).</summary>
        public int X0, Y0, Rx, Ry;
        public double JuuriW, JuuriS, JuuriE, JuuriN;
        public readonly SortedSet<(int z, int x, int y)> Laatat = new SortedSet<(int, int, int)>();

        /// <summary><paramref name="rgb"/>: 3 tavua/px, rivi 0 = pohjoinen; bbox asteina; <paramref name="mPx"/> kuvan pikselikoko (m).</summary>
        public PaikanLaatat(byte[] rgb, int w, int h, double west, double south, double east, double north, double mPx)
        {
            W = west; S = south; E = east; N = north;
            tasot.Add((rgb, w, h));
            while (tasot[tasot.Count - 1].w > 8 && tasot[tasot.Count - 1].h > 8) tasot.Add(Puolita(tasot[tasot.Count - 1]));
            double lat = (S + N) / 2;
            double z = Math.Log(2 * Math.PI * 6378137 * Math.Cos(lat * Math.PI / 180) / (Koko * Math.Max(1, mPx)), 2);
            ZMax = Math.Max(KuvanTyosto.JuuriZ, Math.Min(KuvanTyosto.MaksimiZ, (int)Math.Ceiling(z - 1e-9)));
            Suunnittele();
        }

        void Suunnittele()
        {
            Laatat.Clear();
            for (int z = KuvanTyosto.JuuriZ; z <= ZMax; z++)
            {
                var (x0, y0) = Laatta(z, N, W); var (x1, y1) = Laatta(z, S, E);
                for (int x = x0; x <= x1; x++) for (int y = y0; y <= y1; y++) Laatat.Add((z, x, y));
            }
            // Täysi neliöpuu kuten KuvanTyosto: jokaisen laatan sisarukset (läpinäkyvinä), ettei Cesium jää odottamaan puuttuvaa.
            foreach (var (z, x, y) in new List<(int, int, int)>(Laatat))
                if (z > KuvanTyosto.JuuriZ) { int bx = x & ~1, by = y & ~1; Laatat.Add((z, bx, by)); Laatat.Add((z, bx + 1, by)); Laatat.Add((z, bx, by + 1)); Laatat.Add((z, bx + 1, by + 1)); }
            int xmin = int.MaxValue, xmax = int.MinValue, ymin = int.MaxValue, ymax = int.MinValue;
            foreach (var (z, x, y) in Laatat)
                if (z == KuvanTyosto.JuuriZ) { xmin = Math.Min(xmin, x); xmax = Math.Max(xmax, x); ymin = Math.Min(ymin, y); ymax = Math.Max(ymax, y); }
            X0 = xmin; Y0 = ymin; Rx = xmax - xmin + 1; Ry = ymax - ymin + 1;
            int n0 = 1 << KuvanTyosto.JuuriZ;
            JuuriW = X0 * 360.0 / n0 - 180; JuuriE = (X0 + Rx) * 360.0 / n0 - 180;
            JuuriN = LaatanLat(KuvanTyosto.JuuriZ, Y0); JuuriS = LaatanLat(KuvanTyosto.JuuriZ, Y0 + Ry);
        }

        /// <summary>Laatan RGBA (rivi 0 = pohjoinen); kuvan ulkopuoli alfa 0. Säieturvallinen.</summary>
        public byte[] Piirra(int z, int x, int y)
        {
            var r = new byte[Koko * Koko * 4];
            double n = (double)Koko * (1 << z);
            double lonPx = 360.0 / n;
            // Taso: kuvan pikseli (asteina lon) vs. laatan pikseli → puolitettu versio, jonka pikseli ≈ laatan pikseli.
            double kuvanPx = (E - W) / tasot[0].w;
            int t = Math.Max(0, Math.Min(tasot.Count - 1, (int)Math.Floor(Math.Log(Math.Max(1, lonPx / kuvanPx), 2))));
            var (rgb, w, h) = tasot[t];
            for (int py = 0; py < Koko; py++)
            {
                double lat = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * (y * Koko + py + 0.5) / n))) * 180 / Math.PI;
                double v = (N - lat) / (N - S) * h - 0.5;
                if (v < -0.5 || v > h - 0.5) continue;
                for (int px = 0; px < Koko; px++)
                {
                    double lon = (x * Koko + px + 0.5) / n * 360 - 180;
                    double u = (lon - W) / (E - W) * w - 0.5;
                    if (u < -0.5 || u > w - 0.5) continue;
                    double fu = Math.Max(0, Math.Min(w - 1.001, u)), fv = Math.Max(0, Math.Min(h - 1.001, v));
                    int iu = (int)fu, iv = (int)fv; double au = fu - iu, av = fv - iv;
                    int a00 = (iv * w + iu) * 3, a10 = a00 + 3, a01 = a00 + w * 3, a11 = a01 + 3, o = (py * Koko + px) * 4;
                    for (int c = 0; c < 3; c++)
                        r[o + c] = (byte)((rgb[a00 + c] * (1 - au) + rgb[a10 + c] * au) * (1 - av) + (rgb[a01 + c] * (1 - au) + rgb[a11 + c] * au) * av + 0.5);
                    r[o + 3] = 255;
                }
            }
            return r;
        }

        static (byte[], int, int) Puolita((byte[] rgb, int w, int h) l)
        {
            int w2 = l.w / 2, h2 = l.h / 2; var r = new byte[w2 * h2 * 3];
            for (int y = 0; y < h2; y++)
                for (int x = 0; x < w2; x++)
                    for (int c = 0; c < 3; c++)
                    {
                        int i = ((2 * y) * l.w + 2 * x) * 3 + c, j = i + l.w * 3;
                        r[(y * w2 + x) * 3 + c] = (byte)((l.rgb[i] + l.rgb[i + 3] + l.rgb[j] + l.rgb[j + 3] + 2) / 4);
                    }
            return (r, w2, h2);
        }

        static (int x, int y) Laatta(int z, double lat, double lon)
        {
            double n = 1 << z, la = Math.Max(-85, Math.Min(85, lat)) * Math.PI / 180;
            int x = (int)Math.Floor((lon + 180) / 360 * n), y = (int)Math.Floor((1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * n);
            return (Math.Max(0, Math.Min((int)n - 1, x)), Math.Max(0, Math.Min((int)n - 1, y)));
        }

        static double LaatanLat(int z, int y) => Math.Atan(Math.Sinh(Math.PI * (1 - 2.0 * y / (1 << z)))) * 180 / Math.PI;
    }
}
