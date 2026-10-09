// KOHTEEN MUOTOA SEURAAVA KOROSTUS (omistaja 9.10. "milloin tulee se parempi korostus kohteisiin kuin nykyinen pyöreä pilvi?",
// PT 00.52, juna 170): kohteen OSM-pohjapiirros (Karttaseppä: rakennus tai alue Wikidata-tunnuksella; varana aukion oma muoto)
// rasteroidaan ylhäältä pehmeäreunaiseksi maskiksi (parillinen–pariton täyttö, reiät mukana, laatikkosumennus), jonka
// koko ruudun passi (KohdeKorostus) lukee: maskin sisällä julkisivut ja katot kultaisiksi, reunalla maassa pehmeä ääriviiva.
// Koordinaatit kohteen pisteen paikallisessa ENU:ssa (m, x itä, z pohjoinen). Puhdas C#: KohdeMuotoTestit.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class KohdeMuoto
    {
        public int N; public byte[] Maski; public double KulmaX, KulmaZ, SivuM;
        public const int Koko = 256; public const double MarginaaliM = 24, PehmeysM = 2.5;

        /// <summary>Renkaat (lat, lon) → ENU kohteen pisteestä (tasoapproksimaatio, kohteen mittakaava).</summary>
        public static List<(double x, double z)> Enu(IReadOnlyList<(double lat, double lon)> rengas, double lat0, double lon0)
        {
            double cl = Math.Cos(lat0 * Math.PI / 180); var l = new List<(double, double)>(rengas.Count);
            foreach (var (la, lo) in rengas) l.Add(((lo - lon0) * 111320.0 * cl, (la - lat0) * 111132.0));
            return l;
        }

        /// <summary>Rasteroi renkaat (ulko- ja reikärenkaat samassa listassa: parillinen–pariton) maskiksi; null, jos tyhjä.</summary>
        public static KohdeMuoto Rasteroi(IReadOnlyList<List<(double x, double z)>> renkaat, int n = Koko)
        {
            double minX = double.MaxValue, minZ = double.MaxValue, maxX = double.MinValue, maxZ = double.MinValue;
            foreach (var r in renkaat) foreach (var (x, z) in r) { minX = Math.Min(minX, x); maxX = Math.Max(maxX, x); minZ = Math.Min(minZ, z); maxZ = Math.Max(maxZ, z); }
            if (minX > maxX) return null;
            double sivu = Math.Max(maxX - minX, maxZ - minZ) + 2 * MarginaaliM;
            double kx = (minX + maxX) / 2 - sivu / 2, kz = (minZ + maxZ) / 2 - sivu / 2, px = sivu / n;
            var m = new float[n * n];
            var risteys = new List<double>();
            for (int rivi = 0; rivi < n; rivi++)
            {
                double z = kz + (rivi + 0.5) * px; risteys.Clear();
                foreach (var r in renkaat)
                    for (int i = 0, j = r.Count - 1; i < r.Count; j = i++)
                    {
                        var (x1, z1) = r[i]; var (x2, z2) = r[j];
                        if ((z1 > z) != (z2 > z)) risteys.Add(x1 + (z - z1) / (z2 - z1) * (x2 - x1));
                    }
                risteys.Sort();
                for (int k = 0; k + 1 < risteys.Count; k += 2)
                {
                    int a = Math.Max(0, (int)Math.Ceiling((risteys[k] - kx) / px - 0.5)), b = Math.Min(n - 1, (int)Math.Floor((risteys[k + 1] - kx) / px - 0.5));
                    for (int c = a; c <= b; c++) m[rivi * n + c] = 1;
                }
            }
            // Pehmeä reuna: kaksi laatikkosumennusta (≈ gaussinen, säde PehmeysM).
            int sade = Math.Max(1, (int)Math.Round(PehmeysM / px));
            for (int kierros = 0; kierros < 2; kierros++) { m = Sumenna(m, n, sade, true); m = Sumenna(m, n, sade, false); }
            var tavut = new byte[n * n];
            for (int i = 0; i < tavut.Length; i++) tavut[i] = (byte)Math.Round(255 * Math.Max(0, Math.Min(1, m[i])));
            return new KohdeMuoto { N = n, Maski = tavut, KulmaX = kx, KulmaZ = kz, SivuM = sivu };
        }

        static float[] Sumenna(float[] m, int n, int r, bool vaaka)
        {
            var u = new float[m.Length]; float jako = 2 * r + 1;
            for (int a = 0; a < n; a++)
            {
                float summa = 0;
                for (int b = -r; b <= r; b++) summa += Arvo(m, n, a, b, vaaka);
                for (int b = 0; b < n; b++)
                {
                    u[vaaka ? a * n + b : b * n + a] = summa / jako;
                    summa += Arvo(m, n, a, b + r + 1, vaaka) - Arvo(m, n, a, b - r, vaaka);
                }
            }
            return u;
        }
        static float Arvo(float[] m, int n, int a, int b, bool vaaka) => b < 0 || b >= n ? 0 : m[vaaka ? a * n + b : b * n + a];

        /// <summary>Maskin arvo 0–1 paikallisessa ENU:ssa (testit; varjostin näytteistää tekstuurista samoin).</summary>
        public double Arvo(double x, double z)
        {
            int c = (int)((x - KulmaX) / SivuM * N), r = (int)((z - KulmaZ) / SivuM * N);
            return c < 0 || r < 0 || c >= N || r >= N ? 0 : Maski[r * N + c] / 255.0;
        }
    }
}
