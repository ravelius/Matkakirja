// OPPAAN LYHIN REITTI (Linssiseppä 9.10.2026; omistaja Tukholmasta: "kuumailmapallo käy liian kaukaisissa kohteissa ja ehkä menee vähän
// siksakkia. paras olisi edelleen että liikuttaisiin mahdollisimman lyhyitä reittejä"): pallokierroksen kohteet järjestetään avoimeksi
// poluksi ensimmäisestä alkaen niin, että kokonaismatka on pienin (ei paluuta alkuun). Ensimmäinen pysyy ensimmäisenä, koska kaupungin
// avauskerronta tähtää siihen. Kaukaiset kohteet pudotetaan ennen järjestämistä: kohde (ei koskaan ensimmäinen) on kaukainen, jos sen
// lähin muu kohde on yli KaukoRajaM:n päässä tai jos sen poisto lyhentää parasta polkua yli KiertoRajaM:n. Pudotetaan ahneesti yksi
// kerrallaan (suurin säästö ensin, tilanne lasketaan uudelleen joka kierroksella), enintään MaksimiPudotus ja vain niin kauan kuin
// jäljelle jää vähintään VahintaanKohteita. Järjestys: tarkka (Held–Karp, bittimaski) kun n ≤ TarkkaRaja, muuten lähin naapuri + 2-opt
// (lähtö sekä lähimmästä naapurista että annetusta järjestyksestä, lyhyempi voittaa → ei koskaan pidempi kuin annettu). Etäisyys
// KierrosLento.EtaisyysM (isoympyrä). Rajat viritetty 37 kaupungin datalla (kultaiset/opas-kierrokset-20261008.json): Tukholma pudottaa
// Drottningholmin (lähin 9,6 km) ja Skogskyrkogårdenin (5,4 km), Pariisi ei mitään (Sacré-Cœur lähin 2,8 km, säästö 4,2 km). Puhdas C#.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasReitti
    {
        /// <summary>Kohde on kaukainen, jos sen lähin muu kohde on tätä kauempana (m).</summary>
        public const double KaukoRajaM = 5000;
        /// <summary>Kohde on kaukainen, jos sen poisto lyhentää parasta avointa polkua enemmän kuin tämä (m).</summary>
        public const double KiertoRajaM = 6000;
        /// <summary>Pudotuksia enintään, ja kierrokselle jää aina vähintään näin monta kohdetta.</summary>
        public const int MaksimiPudotus = 2, VahintaanKohteita = 5;
        /// <summary>Tarkka järjestys (Held–Karp) tähän kokoon asti, sitä suuremmille lähin naapuri + 2-opt.</summary>
        public const int TarkkaRaja = 14;   // Tukholman uusi kierros 14 kohdetta (Pelikoodari esittely-v3, 9.10.): 2^13 × 14 tilaa, ~1 Mt

        /// <summary>Kohteet lyhimpänä avoimena polkuna ensimmäisestä alkaen; kaukaiset pudotetaan (palautetaan pudotetut-listassa
        /// pudotusjärjestyksessä).</summary>
        public static List<T> Lyhin<T>(IList<T> kohteet, Func<T, (double Lat, double Lon)> paikka, out List<T> pudotetut)
        {
            pudotetut = new List<T>();
            if (kohteet == null || kohteet.Count == 0) return new List<T>();
            var jaljella = new List<T>(kohteet);
            while (pudotetut.Count < MaksimiPudotus && jaljella.Count - 1 >= VahintaanKohteita)
            {
                double koko = Pituus(Jarjesta(jaljella, paikka), paikka), parasSaasto = double.NegativeInfinity; int paras = -1;
                for (int i = 1; i < jaljella.Count; i++)
                {
                    var p = paikka(jaljella[i]); double lahin = double.PositiveInfinity;
                    for (int j = 0; j < jaljella.Count; j++)
                    {
                        if (j == i) continue;
                        var q = paikka(jaljella[j]); lahin = Math.Min(lahin, KierrosLento.EtaisyysM(p.Lat, p.Lon, q.Lat, q.Lon));
                    }
                    var ilman = new List<T>(jaljella); ilman.RemoveAt(i);
                    double saasto = koko - Pituus(Jarjesta(ilman, paikka), paikka);
                    if ((lahin > KaukoRajaM || saasto > KiertoRajaM) && saasto > parasSaasto) { parasSaasto = saasto; paras = i; }
                }
                if (paras < 0) break;
                pudotetut.Add(jaljella[paras]); jaljella.RemoveAt(paras);
            }
            return Jarjesta(jaljella, paikka);
        }

        /// <summary>Polun kokonaismatka (m) annetussa järjestyksessä.</summary>
        public static double Pituus<T>(IList<T> l, Func<T, (double Lat, double Lon)> paikka)
        {
            double s = 0;
            for (int i = 1; i < l.Count; i++)
            {
                var a = paikka(l[i - 1]); var b = paikka(l[i]);
                s += KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            }
            return s;
        }

        /// <summary>Lyhin avoin polku ensimmäisestä alkaen (kaikki mukana).</summary>
        static List<T> Jarjesta<T>(IList<T> l, Func<T, (double Lat, double Lon)> paikka)
        {
            int n = l.Count;
            if (n <= 2) return new List<T>(l);
            var d = new double[n, n];
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                {
                    var a = paikka(l[i]); var b = paikka(l[j]);
                    d[i, j] = i == j ? 0 : KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
                }
            var jarjestys = n <= TarkkaRaja ? HeldKarp(d, n) : Heuristinen(d, n);
            var tulos = new List<T>(n);
            foreach (int i in jarjestys) tulos.Add(l[i]);
            return tulos;
        }

        /// <summary>Tarkka: dp[maski, v] = lyhin polku 0:sta joukon maski (bitit 1..n−1) läpi päättyen v:hen.</summary>
        static int[] HeldKarp(double[,] d, int n)
        {
            int m = n - 1, taysi = (1 << m) - 1;
            var dp = new double[1 << m, n]; var edel = new int[1 << m, n];
            for (int s = 0; s <= taysi; s++) for (int v = 0; v < n; v++) { dp[s, v] = double.PositiveInfinity; edel[s, v] = -1; }
            for (int v = 1; v < n; v++) { dp[1 << (v - 1), v] = d[0, v]; edel[1 << (v - 1), v] = 0; }
            for (int s = 1; s <= taysi; s++)
                for (int v = 1; v < n; v++)
                {
                    if ((s & (1 << (v - 1))) == 0 || double.IsPositiveInfinity(dp[s, v])) continue;
                    for (int w = 1; w < n; w++)
                    {
                        if ((s & (1 << (w - 1))) != 0) continue;
                        int t = s | (1 << (w - 1)); double c = dp[s, v] + d[v, w];
                        if (c < dp[t, w]) { dp[t, w] = c; edel[t, w] = v; }
                    }
                }
            int loppu = 1; for (int v = 2; v < n; v++) if (dp[taysi, v] < dp[taysi, loppu]) loppu = v;
            var polku = new int[n]; int maski = taysi, nyt = loppu;
            for (int k = n - 1; k >= 1; k--) { polku[k] = nyt; int e = edel[maski, nyt]; maski &= ~(1 << (nyt - 1)); nyt = e; }
            polku[0] = 0;
            return polku;
        }

        /// <summary>Lähin naapuri ja annettu järjestys, kumpikin 2-opt-paranneltuna (ensimmäinen kiinni, loppu vapaa); lyhyempi voittaa.</summary>
        static int[] Heuristinen(double[,] d, int n)
        {
            var nn = new int[n]; var kayty = new bool[n]; kayty[0] = true;
            for (int k = 1; k < n; k++)
            {
                int ed = nn[k - 1], paras = -1;
                for (int j = 1; j < n; j++) if (!kayty[j] && (paras < 0 || d[ed, j] < d[ed, paras])) paras = j;
                nn[k] = paras; kayty[paras] = true;
            }
            var annettu = new int[n]; for (int i = 0; i < n; i++) annettu[i] = i;
            KaksiOpt(nn, d); KaksiOpt(annettu, d);
            return Matka(nn, d) <= Matka(annettu, d) ? nn : annettu;
        }

        /// <summary>2-opt avoimelle polulle: käännetään väli p[i..j] (i ≥ 1), jos se lyhentää; j = n−1 kääntää hännän (ei paluukaarta).</summary>
        static void KaksiOpt(int[] p, double[,] d)
        {
            int n = p.Length; bool parani = true;
            while (parani)
            {
                parani = false;
                for (int i = 1; i < n - 1; i++)
                    for (int j = i + 1; j < n; j++)
                    {
                        double ennen = d[p[i - 1], p[i]] + (j + 1 < n ? d[p[j], p[j + 1]] : 0);
                        double jalkeen = d[p[i - 1], p[j]] + (j + 1 < n ? d[p[i], p[j + 1]] : 0);
                        if (jalkeen < ennen - 1e-6) { Array.Reverse(p, i, j - i + 1); parani = true; }
                    }
            }
        }

        static double Matka(int[] p, double[,] d)
        {
            double s = 0; for (int i = 1; i < p.Length; i++) s += d[p[i - 1], p[i]]; return s;
        }
    }
}
