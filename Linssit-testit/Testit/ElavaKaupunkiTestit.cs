// ELÄVÄ KAUPUNKI (Linssiseppä 8.10.2026): kulkijat pysyvät reitillä, edestakainen reitti kääntyy tauon jälkeen, suunta muuttuu
// pehmeästi mutkissa, välit tasaiset; lintuparvi pysyy alueellaan ja korkeudellaan, ja on deterministinen.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class ElavaKaupunkiTestit
    {
        static Reitti Mutka() => new Reitti(new List<(double, double)> { (0, 0), (200, 0), (200, 200), (400, 200) }, false);

        [Testi] static void KulkijatReitillaJaKaantyvatPaissa()
        {
            var l = new ReittiLiike(); l.Lisaa(Mutka(), 100, 5, 7);
            Oleta.Sama(6, l.Kulkijat.Count, "600 m / 100 m");
            double suurinKaanto = 0; var ed = new Dictionary<ReittiLiike.Kulkija, double>();
            foreach (var k in l.Kulkijat) ed[k] = k.Suuntima;
            int kaannoksia = 0; var suunta = new Dictionary<ReittiLiike.Kulkija, int>(); foreach (var k in l.Kulkijat) suunta[k] = k.Suunta;
            for (int i = 0; i < 60 * 300; i++)
            {
                l.Paivita(1 / 60.0);
                foreach (var k in l.Kulkijat)
                {
                    Oleta.Tosi(k.S >= -1e-9 && k.S <= 600 + 1e-9, "matka reitillä");
                    double d = Math.Abs(((k.Suuntima - ed[k]) % 360 + 540) % 360 - 180);
                    if (k.Tauko <= 0 && d < 170) suurinKaanto = Math.Max(suurinKaanto, d * 60);   // 180° käännös päässä ei kuulu
                    ed[k] = k.Suuntima;
                    if (suunta[k] != k.Suunta) { kaannoksia++; suunta[k] = k.Suunta; }
                }
            }
            Oleta.Tosi(kaannoksia > 0, "edestakainen reitti kääntyy päissä");
            Oleta.Tosi(suurinKaanto < 30, $"mutkassa kääntö {suurinKaanto:F1} °/s (pehmeä)");
        }

        [Testi] static void KiertavaReittiJaPaikka()
        {
            var r = new Reitti(new List<(double, double)> { (0, 0), (100, 0), (100, 100), (0, 100) }, true);
            Oleta.Tosi(Math.Abs(r.Pituus - 400) < 1e-9, "kiertävä sulkeutuu");
            var p = r.Paikka(450); Oleta.Tosi(Math.Abs(p.x - 50) < 1e-9 && Math.Abs(p.z) < 1e-9, "kiertävä kietoutuu");
            var l = new ReittiLiike(); l.Lisaa(r, 50, 4, 3);
            for (int i = 0; i < 600; i++) l.Paivita(0.1);
            foreach (var k in l.Kulkijat) Oleta.Tosi(k.Tauko <= 0 && k.Suunta == 1, "kiertävällä ei taukoja eikä käännöksiä");
        }

        [Testi] static void ParviPysyyAlueellaan()
        {
            var a = new Parvi(60, 1000, 500, 300, 40, 50, 11); var b = new Parvi(60, 1000, 500, 300, 40, 50, 11);
            for (int i = 0; i < 60 * 120; i++) { a.Paivita(1 / 60.0); b.Paivita(1 / 60.0); }
            for (int i = 0; i < a.Maara; i++)
            {
                double r = Math.Sqrt((a.X[i] - 1000) * (a.X[i] - 1000) + (a.Z[i] - 500) * (a.Z[i] - 500));
                Oleta.Tosi(r < 300 + 90, $"lintu alueella ({r:F0} m)");
                Oleta.Tosi(a.Y[i] > 25 && a.Y[i] < 55, $"korkeus {a.Y[i]:F0} m");
                Oleta.Tosi(a.Siipi[i] >= 0 && a.Siipi[i] <= 1 && !double.IsNaN(a.Suuntima[i]), "siipi ja suunta");
                Oleta.Tosi(a.X[i] == b.X[i], "deterministinen");
            }
        }
    }
}
