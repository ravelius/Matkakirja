// JÄRVIEN TÄYTTÖ KOLMIOINA (web: Globe.gl polygonsData kolmioi renkaan itse
// earcutilla ja kaareuttaa kannen polygonCapCurvatureResolution-välein).
//
// RATKAISU: korvanleikkaus (ear clipping) AJOSSA, kerran latauksessa
// (VesistotPallolle.Laske). Perustelut:
//   - aineisto on pieni: 38 rengasta, yhteensä ~1500 pistettä, suurin 174
//     (Kaspianmeri); O(n²)-leikkaus vie koko aineistolle millisekunteja
//     (mitattu VesistotTestit.KolmiointiOnNopea), eli selvästi alle 50 ms:n rajan;
//   - sisältöpaketti ei ole Linssisepän, eikä kolmioita tarvitse viedä sinne:
//     kolmiot seuraavat aina paketin omia renkaita, eikä vienti voi mennä
//     niistä ristiin;
//   - reikiä ei tarvita: webin järvet ovat yksittäisiä renkaita (GeoJSON
//     Polygon, yksi rengas), joten earcutin reikätuki jää pois.
//
// Leikkaus tehdään tasossa (lon, lat). Korvan ehto (kupera kärki, eikä muita
// kärkiä kolmion sisällä) on affiininen, joten pituusasteen venymä ei vaikuta
// siihen. Rappeutunut tai itseään leikkaava rengas ei jää jumiin: jos korvaa ei
// löydy, suora kärki poistetaan tai ensimmäinen kupera kärki leikataan väkisin.
//
// PALLON KAAREVUUS: kolmio on tasainen, joten pitkä sivu painuisi kaaren alle
// (Kaspianmeren 10°:n sivulla ~50 km). Kolmiot jaetaan tasaisesti s × s
// -osiin, missä s = ceil(pisin sivu / MaxSivu) KOKO järvelle, jotta
// naapurikolmioiden yhteiset sivut jakautuvat samoin eikä saumoihin jää rakoja
// (T-liitoksia). 2°:n jänne painuu kaaren alle ~1 km, mikä on nostojen
// (≥ 5 km) sisällä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Vesistot
{
    public static class Jarvikolmiot
    {
        /// <summary>Pisin kolmion sivu tihennyksen jälkeen, asteina.</summary>
        public const double MaxSivu = 2;

        public sealed class Verkko
        {
            /// <summary>Kärjet (lat, lon).</summary>
            public List<LatLon> Karjet = new List<LatLon>();
            /// <summary>Kolmiot kärki-indekseinä, vastapäivään tasossa (lon, lat).</summary>
            public List<int> Kolmiot = new List<int>();
            /// <summary>Korvanleikkauksen kolmiot ennen tihennystä.</summary>
            public int Perus;
            /// <summary>Tihennyksen jako s (1 = ei tihennetty).</summary>
            public int Jako = 1;
        }

        const double Eps = 1e-14;

        static double Risti(LatLon a, LatLon b, LatLon c) =>
            (b.Lon - a.Lon) * (c.Lat - a.Lat) - (b.Lat - a.Lat) * (c.Lon - a.Lon);

        static bool Sama(LatLon a, LatLon b) => a.Lat == b.Lat && a.Lon == b.Lon;

        /// <summary>Renkaan etumerkillinen pinta-ala tasossa (lon, lat); + = vastapäivään.</summary>
        public static double Ala(IReadOnlyList<LatLon> rengas)
        {
            double s = 0;
            for (int i = 0, n = rengas.Count; i < n; i++)
            {
                var a = rengas[i];
                var b = rengas[(i + 1) % n];
                s += a.Lon * b.Lat - b.Lon * a.Lat;
            }
            return s / 2;
        }

        /// <summary>
        /// Korvanleikkaus: kolmiot renkaan indekseinä (vastapäivään). Suljettu rengas
        /// (ensimmäinen = viimeinen) ja peräkkäiset kaksoispisteet sallitaan.
        /// </summary>
        public static List<int> Korvat(IReadOnlyList<LatLon> rengas)
        {
            var ulos = new List<int>();
            if (rengas == null) return ulos;
            int n = rengas.Count;
            if (n > 1 && Sama(rengas[0], rengas[n - 1])) n--;
            var ind = new List<int>(n);
            for (int i = 0; i < n; i++)
                if (ind.Count == 0 || !Sama(rengas[ind[ind.Count - 1]], rengas[i])) ind.Add(i);
            while (ind.Count > 1 && Sama(rengas[ind[0]], rengas[ind[ind.Count - 1]])) ind.RemoveAt(ind.Count - 1);
            if (ind.Count < 3) return ulos;

            double ala = 0;
            for (int i = 0; i < ind.Count; i++)
            {
                var a = rengas[ind[i]];
                var b = rengas[ind[(i + 1) % ind.Count]];
                ala += a.Lon * b.Lat - b.Lon * a.Lat;
            }
            double etu = ala >= 0 ? 1 : -1;

            void Lisaa(int a, int b, int c)
            {
                if (etu > 0) { ulos.Add(a); ulos.Add(b); ulos.Add(c); }
                else { ulos.Add(a); ulos.Add(c); ulos.Add(b); }
            }

            int alku = 0;
            while (ind.Count > 3)
            {
                int m = ind.Count;
                int loydetty = -1;
                for (int j = 0; j < m && loydetty < 0; j++)
                {
                    int k = (alku + j) % m;
                    int a = ind[(k - 1 + m) % m], b = ind[k], c = ind[(k + 1) % m];
                    LatLon A = rengas[a], B = rengas[b], C = rengas[c];
                    if (Risti(A, B, C) * etu <= Eps) continue;   // kovera tai suora
                    bool tyhja = true;
                    for (int q = 0; q < m && tyhja; q++)
                    {
                        int p = ind[q];
                        if (p == a || p == b || p == c) continue;
                        var P = rengas[p];
                        if (Sama(P, A) || Sama(P, B) || Sama(P, C)) continue;
                        // Sisällä tai reunalla: varovainen, ettei leikattu kolmio peitä muuta renkaan osaa.
                        if (Risti(A, B, P) * etu >= 0 && Risti(B, C, P) * etu >= 0 && Risti(C, A, P) * etu >= 0) tyhja = false;
                    }
                    if (tyhja) loydetty = k;
                }
                if (loydetty < 0)
                {
                    // Rappeutunut tai itseään leikkaava rengas: suora kärki pois ilman kolmiota,
                    // muuten ensimmäinen kupera kärki (tai mikä tahansa) leikataan väkisin.
                    int suora = -1, kupera = -1;
                    for (int k = 0; k < m; k++)
                    {
                        double r = Risti(rengas[ind[(k - 1 + m) % m]], rengas[ind[k]], rengas[ind[(k + 1) % m]]) * etu;
                        if (Math.Abs(r) <= Eps && suora < 0) suora = k;
                        if (r > Eps && kupera < 0) kupera = k;
                    }
                    if (suora >= 0) { ind.RemoveAt(suora); alku = suora; continue; }
                    loydetty = kupera >= 0 ? kupera : 0;
                }
                Lisaa(ind[(loydetty - 1 + m) % m], ind[loydetty], ind[(loydetty + 1) % m]);
                ind.RemoveAt(loydetty);
                alku = loydetty;   // jatketaan samasta kohdasta: kolmiot jakautuvat tasaisemmin
            }
            if (Math.Abs(Risti(rengas[ind[0]], rengas[ind[1]], rengas[ind[2]])) > Eps) Lisaa(ind[0], ind[1], ind[2]);
            return ulos;
        }

        /// <summary>Kolmioverkko renkaasta: korvanleikkaus ja tasainen tihennys MaxSivu-asteeseen.</summary>
        public static Verkko Laske(IReadOnlyList<LatLon> rengas, double maxSivu = MaxSivu)
        {
            var v = new Verkko();
            var perus = Korvat(rengas);
            v.Perus = perus.Count / 3;
            if (perus.Count == 0) return v;

            double pisin = 0;
            for (int t = 0; t < perus.Count; t += 3)
                for (int e = 0; e < 3; e++)
                    pisin = Math.Max(pisin, Kameramatikka.KulmaAsteina(rengas[perus[t + e]], rengas[perus[t + (e + 1) % 3]]));
            int s = Math.Max(1, (int)Math.Ceiling(pisin / maxSivu - 1e-9));
            v.Jako = s;

            if (s == 1)
            {
                v.Karjet.AddRange(rengas);
                v.Kolmiot.AddRange(perus);
                return v;
            }
            // Tasainen barysentrinen jako tasossa (lon, lat): järvi ei ylitä saumaa
            // (VesistotPallolle hylkää sellaiset), joten lineaarinen pituusaste on oikein.
            for (int t = 0; t < perus.Count; t += 3)
            {
                LatLon A = rengas[perus[t]], B = rengas[perus[t + 1]], C = rengas[perus[t + 2]];
                int pohja = v.Karjet.Count;
                // Rivi i (0…s), sarake j (0…s−i): indeksi = pohja + i(2s+3−i)/2 + j.
                for (int i = 0; i <= s; i++)
                    for (int j = 0; j <= s - i; j++)
                    {
                        double u = (double)i / s, w = (double)j / s;
                        v.Karjet.Add(new LatLon(
                            A.Lat + (B.Lat - A.Lat) * u + (C.Lat - A.Lat) * w,
                            A.Lon + (B.Lon - A.Lon) * u + (C.Lon - A.Lon) * w));
                    }
                int I(int i, int j) => pohja + i * (2 * s + 3 - i) / 2 + j;
                for (int i = 0; i < s; i++)
                    for (int j = 0; j < s - i; j++)
                    {
                        v.Kolmiot.Add(I(i, j)); v.Kolmiot.Add(I(i + 1, j)); v.Kolmiot.Add(I(i, j + 1));
                        if (j < s - i - 1) { v.Kolmiot.Add(I(i + 1, j)); v.Kolmiot.Add(I(i + 1, j + 1)); v.Kolmiot.Add(I(i, j + 1)); }
                    }
            }
            return v;
        }
    }
}
