// ASTRONAUTIN KAMERAN MAAILMANKIERROS (omistajan toive 27.9.2026 klo 23.5x Fablen kautta; Linssisepän suositus
// docs/raportit/astronautin-kuvaselain-20260928.md). Havaintokohteet yhdeksi suljetuksi kierrokseksi maantieteellisen
// läheisyyden mukaan: "seuraava" ja "edellinen" vievät aina viereiseen kohteeseen kartalla ja samaa tietä takaisin, ja
// kaikki maailman kuvat voi selata kuin yhtä galleriaa. Lähin naapuri isoympyräetäisyydellä, sitten 2-opt (ristikkäiset
// hypyt suoriksi); kierros alkaa läntisimmästä ja kulkee myötäpäivään (pohjoisen kautta itään). Deterministinen: sama
// aineisto antaa saman järjestyksen.
// Puhdas C#, testit Linssit-testit/Testit/AstronauttiKierrosTestit.cs.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Astronautti
{
    public static class AstronauttiKierros
    {
        /// <summary>2-opt-kierrosten katto (189 kohdetta paranee alle kymmenessä).</summary>
        public const int OptKierroksia = 60;

        /// <summary>Isoympyräetäisyys radiaaneina (haversine).</summary>
        public static double Etaisyys(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = Math.PI / 180;
            double dLat = (lat2 - lat1) * R, dLon = (lon2 - lon1) * R;
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                       + Math.Cos(lat1 * R) * Math.Cos(lat2 * R) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2 * Math.Asin(Math.Min(1, Math.Sqrt(a)));
        }

        /// <summary>
        /// Kierros aineiston indekseinä: vain kohteet, joilla on paikka ja vähintään yksi kuva. Alku on läntisin kohde, ja
        /// suunta on myötäpäivään kuten karttaa luettaessa: alusta ensin pohjoisempaan naapuriin.
        /// </summary>
        public static int[] Laske(IReadOnlyList<Havaintokohde> kohteet)
        {
            var mukana = new List<int>();
            for (int i = 0; i < (kohteet?.Count ?? 0); i++)
            {
                var k = kohteet[i];
                if (k != null && !double.IsNaN(k.Lat) && !double.IsNaN(k.Lon) && k.Havainnot.Count > 0) mukana.Add(i);
            }
            int n = mukana.Count;
            if (n <= 2) return mukana.ToArray();
            double D(int a, int b) => Etaisyys(kohteet[a].Lat, kohteet[a].Lon, kohteet[b].Lat, kohteet[b].Lon);

            // Lähin naapuri läntisimmästä (tasapelissä pienempi indeksi).
            int alku = mukana[0];
            foreach (int i in mukana) if (kohteet[i].Lon < kohteet[alku].Lon) alku = i;
            var reitti = new int[n];
            var kayty = new HashSet<int> { alku };
            reitti[0] = alku;
            for (int p = 1; p < n; p++)
            {
                int ed = reitti[p - 1], paras = -1;
                double parasD = double.MaxValue;
                foreach (int i in mukana)
                {
                    if (kayty.Contains(i)) continue;
                    double d = D(ed, i);
                    if (d < parasD) { parasD = d; paras = i; }
                }
                reitti[p] = paras;
                kayty.Add(paras);
            }

            // 2-opt suljetulla kierroksella: kaari (a, b) ja (c, d) → (a, c) ja (b, d), jos lyhenee.
            for (int kierros = 0; kierros < OptKierroksia; kierros++)
            {
                bool parani = false;
                for (int i = 0; i < n - 1; i++)
                    for (int j = i + 2; j < n; j++)
                    {
                        if (i == 0 && j == n - 1) continue;
                        int a = reitti[i], b = reitti[i + 1], c = reitti[j], d = reitti[(j + 1) % n];
                        if (D(a, c) + D(b, d) < D(a, b) + D(c, d) - 1e-12)
                        {
                            Array.Reverse(reitti, i + 1, j - i);
                            parani = true;
                        }
                    }
                if (!parani) break;
            }

            // Alku läntisimpään ja suunta myötäpäivään (alun naapureista pohjoisempi ensin).
            int s = Array.IndexOf(reitti, alku);
            var tulos = new int[n];
            for (int p = 0; p < n; p++) tulos[p] = reitti[(s + p) % n];
            if (kohteet[tulos[1]].Lat < kohteet[tulos[n - 1]].Lat) Array.Reverse(tulos, 1, n - 1);
            return tulos;
        }

        /// <summary>Naapuri kierroksella: <paramref name="kierros"/>ssa kohteen <paramref name="indeksi"/> jälkeen (suunta +1) tai
        /// ennen (−1), ympäri kiertäen; −1, jos kohde ei ole kierroksella.</summary>
        public static int Naapuri(int[] kierros, int indeksi, int suunta)
        {
            if (kierros == null || kierros.Length == 0) return -1;
            int p = Array.IndexOf(kierros, indeksi);
            if (p < 0) return -1;
            int n = kierros.Length;
            return kierros[((p + Math.Sign(suunta)) % n + n) % n];
        }
    }
}
