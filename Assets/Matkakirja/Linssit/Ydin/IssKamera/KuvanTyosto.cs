// ISS-KAMERA: laukaisun työstö ilman Unityä. Kuvasuunnitelman soluista Web Mercator -laattajoukko z6-juuriin rajattuna
// (AstronauttiKerroksen pinta: taso = z − 6, x' = x − X0·2^t, y' = y − Y0·2^t, KarttaKerrokset.RasterinJako), maamaski
// saman kuvan SCL:stä (vesiluokka 6, karkein taso ~320 m, sumennus ~8 km → pilvien rantavyöhyke) ja laatan piirto:
// S2 (Uudelleenprojisointi) + pilvet (Pilvikentta 32 × 32 -hilassa, bilineaarisesti ylös; pilvet ovat ≥ 500 m:n piirteitä).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class KuvanTyosto
    {
        public const int JuuriZ = 6, MaksimiZ = 14;
        public readonly KuvaData Data = new KuvaData();
        public Pilvikentta Pilvet;
        /// <summary>z6-juurijako: vasen yläkulma (X0, Y0), koko Rx × Ry, ja rajaus asteina (W, S, E, N).</summary>
        public int X0, Y0, Rx, Ry;
        public double W, S, E, N;
        /// <summary>Piirrettävät laatat (z, x, y), juurista tarkimpaan.</summary>
        public readonly SortedSet<(int z, int x, int y)> Laatat = new SortedSet<(int, int, int)>();
        readonly List<(S2Ruutu ruutu, CogOtsake otsake, float[] maa, int koko)> maamaskit = new List<(S2Ruutu, CogOtsake, float[], int)>();

        static int Zoom(double metria, double lat)
        {
            double z = Math.Log(2 * Math.PI * 6378137 * Math.Cos(lat * Math.PI / 180) / (256 * Math.Max(1, metria)), 2);
            return Math.Max(JuuriZ, Math.Min(MaksimiZ, (int)Math.Ceiling(z - 1e-9)));
        }

        static (int x, int y) Laatta(int z, double lat, double lon)
        {
            double n = 1 << z, la = Math.Max(-85, Math.Min(85, lat)) * Math.PI / 180;
            int x = (int)Math.Floor((lon + 180) / 360 * n), y = (int)Math.Floor((1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * n);
            return (Math.Max(0, Math.Min((int)n - 1, x)), Math.Max(0, Math.Min((int)n - 1, y)));
        }

        static double LaatanLat(int z, int y) => Math.Atan(Math.Sinh(Math.PI * (1 - 2.0 * y / (1 << z)))) * 180 / Math.PI;

        /// <summary>
        /// Laattajoukko näytteistä: jokainen solu tasollaan (pikselikoko ≤ solun maapikseli) ja yksi taso tarkemmin, jotta
        /// Cesiumin tasovalinta ei pyydä puuttuvaa laattaa; esivanhemmat juureen asti. Juurijako kattaa kaikki solut.
        /// </summary>
        public void Suunnittele(List<Nayte> naytteet)
        {
            Laatat.Clear();
            int xmin = int.MaxValue, xmax = int.MinValue, ymin = int.MaxValue, ymax = int.MinValue;
            foreach (var n in naytteet)
            {
                int z = Math.Min(MaksimiZ, Zoom(n.MetriaPikseli, n.Lat) + 1);
                var (x0, y0) = Laatta(z, n.LatMax, n.LonMin); var (x1, y1) = Laatta(z, n.LatMin, n.LonMax);
                for (int x = x0; x <= x1; x++)
                    for (int y = y0; y <= y1; y++)
                        for (int zz = z, xx = x, yy = y; zz >= JuuriZ; zz--, xx >>= 1, yy >>= 1) if (!Laatat.Add((zz, xx, yy))) break;
            }
            foreach (var (z, x, y) in Laatat)
                if (z == JuuriZ) { xmin = Math.Min(xmin, x); xmax = Math.Max(xmax, x); ymin = Math.Min(ymin, y); ymax = Math.Max(ymax, y); }
            if (xmin > xmax) { Rx = Ry = 0; return; }
            X0 = xmin; Y0 = ymin; Rx = xmax - xmin + 1; Ry = ymax - ymin + 1;
            // Juurijaon ulkopuolelle jäävät tasot kuuluvat silti juureen (esivanhempi on aina juurijoukossa).
            W = X0 * 360.0 / (1 << JuuriZ) - 180; E = (X0 + Rx) * 360.0 / (1 << JuuriZ) - 180;
            N = LaatanLat(JuuriZ, Y0); S = LaatanLat(JuuriZ, Y0 + Ry);
        }

        /// <summary>Lehtilaatat: joukon laatat, joilla ei ole lapsia joukossa (niiden data haetaan, isät kootaan lapsista).</summary>
        public List<(int z, int x, int y)> Lehdet()
        {
            var r = new List<(int, int, int)>();
            foreach (var (z, x, y) in Laatat)
                if (!Laatat.Contains((z + 1, 2 * x, 2 * y)) && !Laatat.Contains((z + 1, 2 * x + 1, 2 * y))
                    && !Laatat.Contains((z + 1, 2 * x, 2 * y + 1)) && !Laatat.Contains((z + 1, 2 * x + 1, 2 * y + 1))) r.Add((z, x, y));
            return r;
        }

        /// <summary>
        /// COG-laatat ruudulle lehtilaattojen alueesta (laitekoe 2, 1.10.: solupohjainen haku jätti Mercator-laattojen reunoille
        /// aukkoja → tummat kaistat): jokainen lehti tasolla, jonka pikseli ≤ lehden pikseli, rajaus 9 reunapisteestä.
        /// </summary>
        public HashSet<(int taso, int tx, int ty)> HaettavatLaatat(S2Ruutu ru, CogOtsake o)
        {
            var r = new HashSet<(int, int, int)>(); int v = ru.Vyohyke;
            foreach (var (z, x, y) in Lehdet())
            {
                var (n0, w0) = Uudelleenprojisointi.Pikseli(z, x, y, 0, 0); var (s0, e0) = Uudelleenprojisointi.Pikseli(z, x, y, 256, 256);
                if (e0 < ru.W || w0 > ru.E || n0 < ru.S || s0 > ru.N) continue;
                int taso = o.TasoResoluutiolle(Uudelleenprojisointi.PikseliM(z, (n0 + s0) / 2));
                var t = o.Tasot[taso]; double pm = o.TasonPikseliM(taso);
                double xmin = double.MaxValue, xmax = double.MinValue, ymin = double.MaxValue, ymax = double.MinValue;
                for (int i = 0; i <= 2; i++) for (int j = 0; j <= 2; j++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 128, j * 128);
                    var (e, no) = Utm.Eteen(la, lo, v);
                    double px = (e - o.Ita0) / pm, py = (o.Pohjoinen0 - no) / pm;
                    xmin = Math.Min(xmin, px - 2); xmax = Math.Max(xmax, px + 2); ymin = Math.Min(ymin, py - 2); ymax = Math.Max(ymax, py + 2);
                }
                int tx0 = Math.Max(0, (int)Math.Floor(xmin / t.LaattaL)), tx1 = Math.Min(t.LaattojaX - 1, (int)Math.Floor(xmax / t.LaattaL));
                int ty0 = Math.Max(0, (int)Math.Floor(ymin / t.LaattaK)), ty1 = Math.Min(t.LaattojaY - 1, (int)Math.Floor(ymax / t.LaattaK));
                for (int tx = tx0; tx <= tx1; tx++) for (int ty = ty0; ty <= ty1; ty++) r.Add((taso, tx, ty));
            }
            return r;
        }

        /// <summary>RGBA 256² → neljännes 128² (2 × 2 -keskiarvo) isälaatan koontiin.</summary>
        public static byte[] Puolita(byte[] rgba)
        {
            var o = new byte[128 * 128 * 4];
            for (int y = 0; y < 128; y++) for (int x = 0; x < 128; x++) for (int c = 0; c < 4; c++)
            {
                int a = ((2 * y) * 256 + 2 * x) * 4 + c;
                o[(y * 128 + x) * 4 + c] = (byte)((rgba[a] + rgba[a + 4] + rgba[a + 1024] + rgba[a + 1028] + 2) / 4);
            }
            return o;
        }

        /// <summary>Isälaatta neljästä neljänneksestä (järjestys: vasen ylä, oikea ylä, vasen ala, oikea ala).</summary>
        public static void Kokoa(byte[][] nelj, byte[] rgba)
        {
            for (int k = 0; k < 4; k++)
            {
                int ox = (k % 2) * 128, oy = (k / 2) * 128;
                for (int y = 0; y < 128; y++) Buffer.BlockCopy(nelj[k], y * 128 * 4, rgba, ((oy + y) * 256 + ox) * 4, 128 * 4);
            }
        }

        /// <summary>Laatan tiedostopolku rajatussa jaossa: "{t}/{x'}/{y'}" (Cesiumin {z}/{x}/{reverseY} ei käytössä: y pohjoisesta).</summary>
        public string Polku(int z, int x, int y)
        {
            int t = z - JuuriZ, k = 1 << t;
            return $"{t}/{x - X0 * k}/{y - Y0 * k}";
        }

        /// <summary>Maamaski ruudulle SCL:n karkeimmasta tasosta (puretut laatat, 1 kanava): vesi (6) = 0, muu = 1, sumennus ~8 km.</summary>
        public void LisaaMaamaski(S2Ruutu ruutu, CogOtsake scl, Func<int, int, byte[]> laatta)
        {
            int taso = scl.Tasot.Count - 1; var t = scl.Tasot[taso]; int koko = t.Leveys;
            var maa = new float[koko * koko];
            for (int y = 0; y < koko; y++)
                for (int x = 0; x < koko; x++)
                {
                    var l = laatta(x / t.LaattaL, y / t.LaattaK);
                    byte c = l == null ? (byte)0 : l[(y % t.LaattaK) * t.LaattaL + x % t.LaattaL];
                    maa[y * koko + x] = c == 6 ? 0f : 1f;
                }
            int sade = Math.Max(1, (int)Math.Round(8000 / scl.TasonPikseliM(taso)));
            for (int k = 0; k < 2; k++) { Laatikko(maa, koko, sade, true); Laatikko(maa, koko, sade, false); }
            maamaskit.Add((ruutu, scl, maa, koko));
        }

        static void Laatikko(float[] a, int n, int r, bool vaaka)
        {
            var rivi = new float[n];
            for (int j = 0; j < n; j++)
            {
                double s = 0; int c = 0;
                for (int i = -r; i <= r; i++) { int q = Math.Max(0, Math.Min(n - 1, i)); s += vaaka ? a[j * n + q] : a[q * n + j]; c++; }
                for (int i = 0; i < n; i++)
                {
                    rivi[i] = (float)(s / c);
                    int pois = Math.Max(0, Math.Min(n - 1, i - r)), tulee = Math.Max(0, Math.Min(n - 1, i + r + 1));
                    s += (vaaka ? a[j * n + tulee] : a[tulee * n + j]) - (vaaka ? a[j * n + pois] : a[pois * n + j]);
                }
                for (int i = 0; i < n; i++) { if (vaaka) a[j * n + i] = rivi[i]; else a[i * n + j] = rivi[i]; }
            }
        }

        /// <summary>Maa-osuus pisteessä: ensimmäinen maamaski, jonka ruutu kattaa pisteen; muualla 0 (avomeri, ei S2-ruutua).</summary>
        public double MaaOsuus(double lat, double lon)
        {
            foreach (var (ru, o, maa, koko) in maamaskit)
            {
                if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                var (e, n) = Utm.Eteen(lat, lon, ru.Vyohyke);
                double pm = o.TasonPikseliM(o.Tasot.Count - 1);
                int x = (int)((e - o.Ita0) / pm), y = (int)((o.Pohjoinen0 - n) / pm);
                if (x < 0 || y < 0 || x >= koko || y >= koko) continue;
                return maa[y * koko + x];
            }
            return maamaskit.Count == 0 ? 1 : 0;
        }

        /// <summary>Piirtää laatan RGBA:ksi: S2 ja pilvet. Palauttaa peittävät pikselit (0 = ei kirjoiteta).</summary>
        public int Piirra(int z, int x, int y, byte[] rgba)
        {
            int peitto = Uudelleenprojisointi.Laatta(Data, z, x, y, rgba);
            if (Pilvet == null) return peitto;
            const int G = 32; var a = new float[(G + 1) * (G + 1)]; var kk = new float[a.Length]; var v = new float[a.Length];
            for (int j = 0; j <= G; j++)
                for (int i = 0; i <= G; i++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 256.0 / G, j * 256.0 / G);
                    var (pa, pk, pv) = Pilvet.Nayte(la, lo);
                    int q = j * (G + 1) + i; a[q] = (float)pa; kk[q] = (float)pk; v[q] = (float)pv;
                }
            for (int py = 0; py < 256; py++)
                for (int px = 0; px < 256; px++)
                {
                    int o = (py * 256 + px) * 4;
                    if (rgba[o + 3] == 0) continue;   // ei S2-dataa: alempi kerros näkyy, pilviä ei (avomeri)
                    float gx = px * G / 256f, gy = py * G / 256f; int ix = Math.Min(G - 1, (int)gx), iy = Math.Min(G - 1, (int)gy);
                    float tx = gx - ix, ty = gy - iy;
                    float H(float[] f) { int q = iy * (G + 1) + ix; return (f[q] * (1 - tx) + f[q + 1] * tx) * (1 - ty) + (f[q + G + 1] * (1 - tx) + f[q + G + 2] * tx) * ty; }
                    float al = H(a), ki = H(kk), va = H(v);
                    for (int c = 0; c < 3; c++)
                    {
                        float pohja = rgba[o + c] * (1 - va), pilvi = 246f * ki * (c == 0 ? 1f : c == 1 ? 0.975f : 0.94f);
                        rgba[o + c] = (byte)Math.Min(255, pohja * (1 - al) + pilvi * al + 0.5f);
                    }
                }
            return peitto;
        }
    }
}
