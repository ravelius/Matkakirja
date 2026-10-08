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
    
        // VENEMALLIT (8.10.): indeksit kärjissä, normaalit yksikköpituisia ja kolmioiden etupuolella (Unity: Cross(p1 − p0, p2 − p0)),
        // tahkot pääosin ulospäin, mitat kuten ilmoitettu; vana ylöspäin ja läpikuultava, alfa häipyy.
        [Testi] static void VeneMallitEhjat()
        {
            var mallit = new List<(string Nimi, VeneVerkko V)>();
            foreach (var t in VeneMallit.Tyypit) mallit.Add((t, VeneMallit.Luo(t)));
            mallit.Add(("lokki", VeneMallit.LokinVartalo())); mallit.Add(("siipi+", VeneMallit.LokinSiipi(1))); mallit.Add(("siipi-", VeneMallit.LokinSiipi(-1)));
            foreach (var (nimi, v) in mallit)
            {
                int n = v.Karkia;
                Oleta.Tosi(n > 0 && v.Kolmiot.Length % 3 == 0 && v.Varit.Length == n * 4 && v.Normaalit.Length == n * 3, nimi + ": taulukot");
                double cx = 0, cy = 0, cz = 0, minZ = 1e9, maxZ = -1e9;
                for (int i = 0; i < n; i++) { cx += v.Paikat[i * 3]; cy += v.Paikat[i * 3 + 1]; cz += v.Paikat[i * 3 + 2]; minZ = Math.Min(minZ, v.Paikat[i * 3 + 2]); maxZ = Math.Max(maxZ, v.Paikat[i * 3 + 2]); }
                cx /= n; cy /= n; cz /= n;
                int ulos = 0, kolmioita = v.Kolmiot.Length / 3;
                for (int k = 0; k < v.Kolmiot.Length; k += 3)
                {
                    int a = v.Kolmiot[k], b = v.Kolmiot[k + 1], c = v.Kolmiot[k + 2];
                    Oleta.Tosi(a < n && b < n && c < n, nimi + ": indeksi");
                    double[] P(int i) => new double[] { v.Paikat[i * 3], v.Paikat[i * 3 + 1], v.Paikat[i * 3 + 2] };
                    var p0 = P(a); var p1 = P(b); var p2 = P(c);
                    double ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2], wx = p2[0] - p0[0], wy = p2[1] - p0[1], wz = p2[2] - p0[2];
                    double nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
                    double vn = nx * v.Normaalit[a * 3] + ny * v.Normaalit[a * 3 + 1] + nz * v.Normaalit[a * 3 + 2];
                    Oleta.Tosi(vn > 0, $"{nimi}: kolmio {k / 3} etupuoli normaalin suuntaan");
                    double mx = (p0[0] + p1[0] + p2[0]) / 3 - cx, my = (p0[1] + p1[1] + p2[1]) / 3 - cy, mz = (p0[2] + p1[2] + p2[2]) / 3 - cz;
                    if (nx * mx + ny * my + nz * mz > 0) ulos++;
                }
                for (int i = 0; i < n; i++)
                {
                    double l = Math.Sqrt(Math.Pow(v.Normaalit[i * 3], 2) + Math.Pow(v.Normaalit[i * 3 + 1], 2) + Math.Pow(v.Normaalit[i * 3 + 2], 2));
                    Oleta.Tosi(Math.Abs(l - 1) < 1e-4, nimi + ": normaali yksikkö");
                }
                Oleta.Tosi(ulos >= 0.8 * kolmioita, $"{nimi}: ulospäin {ulos}/{kolmioita}");
                if (Array.IndexOf(VeneMallit.Tyypit, nimi) >= 0)
                    Oleta.Tosi(Math.Abs((maxZ - minZ) - v.Pituus) < 0.05 * v.Pituus + 0.5, $"{nimi}: pituus {maxZ - minZ:F1} ≈ {v.Pituus}");
            }
            var vana = VeneMallit.Vana(28, 7);
            for (int k = 0; k < vana.Kolmiot.Length; k += 3)
            {
                int a = vana.Kolmiot[k], b = vana.Kolmiot[k + 1], c = vana.Kolmiot[k + 2];
                double ux = vana.Paikat[b * 3] - vana.Paikat[a * 3], uz = vana.Paikat[b * 3 + 2] - vana.Paikat[a * 3 + 2];
                double wx = vana.Paikat[c * 3] - vana.Paikat[a * 3], wz = vana.Paikat[c * 3 + 2] - vana.Paikat[a * 3 + 2];
                Oleta.Tosi(uz * wx - ux * wz > 0, "vana näkyy ylhäältä");
            }
            Oleta.Tosi(vana.Varit[3] > 100 && vana.Varit[vana.Varit.Length - 1] < 10, "vanan alfa häipyy");
        }

        static string TukholmaJson() => System.IO.File.ReadAllText("../Assets/Matkakirja/Linssit/Resources/Elava/elava-tukholma.json");

        // TUKHOLMAN VESILIIKENNE (8.10.): määräraja pitää, veneet vesipinnan korkeudella (oma aineisto), pysyvät reiteillä, parvet.
        [Testi] static void TukholmanVesiliikenne()
        {
            var json = TukholmaJson();
            foreach (int raja in new[] { 15, 40, 100 })
            {
                var v = VesiLiikenne.Lue(json, raja, 3);
                int n = v.Liike.Kulkijat.Count;
                Oleta.Tosi(n <= raja && n >= Math.Min(raja, 30), $"raja {raja}: {n} venettä");
                Oleta.Tosi(Math.Abs(v.Lat - 59.3299) < 1e-6 && Math.Abs(v.Lon - 18.07382) < 1e-6, "origo vesipinnan origo");
                for (int i = 0; i < 600; i++) v.Liike.Paivita(0.1);
                foreach (var k in v.Liike.Kulkijat)
                {
                    Oleta.Tosi(k.Y > 10 && k.Y < 30, $"vesipinta {k.Y:F2} m (ENU, kaarevuus mukana)");
                    Oleta.Tosi(Math.Sqrt(k.X * k.X + k.Z * k.Z) < 9500, "reitti säteen sisällä");
                }
            }
            var a = VesiLiikenne.Lue(json, 40, 3); var b = VesiLiikenne.Lue(json, 40, 3);
            for (int i = 0; i < 100; i++) { a.Liike.Paivita(0.1); b.Liike.Paivita(0.1); }
            for (int i = 0; i < a.Liike.Kulkijat.Count; i++) Oleta.Tosi(a.Liike.Kulkijat[i].X == b.Liike.Kulkijat[i].X, "deterministinen");
            Oleta.Tosi(a.Parvet.Count >= 10 && a.Parvet.Exists(p => p.Nimi == "Strömmen"), $"parvia {a.Parvet.Count}, Strömmen mukana");
            Oleta.Tosi(a.Krediitti != null && a.Krediitti.Contains("OpenStreetMap"), "ODbL-krediitti");
        }
    }
}
