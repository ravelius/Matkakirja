// TÄHTIKUVIOT (Linssiseppä 29.9.2026, erä 3): tunnetuimmat tähtikuviot ja kuviot viivoina. Viivat kulkevat kirkkaiden tähtien
// välillä. Tähdet on annettu likimääräisillä J2000-paikoilla (RA, Dec asteina), ja ne napsautetaan lähimpään BSC5-tähteen
// (Yale Bright Star Catalogue, public domain, sama aineisto kuin tähdillä), jotta viiva osuu täsmälleen piirrettyyn tähteen.
// Kuviot on laadittu itse tähtien paikoista (tosiasioita), joten erillistä lisenssiä ei tarvita. Nimet suomeksi.
// Testit Linssit-testit/Testit/TaivasTestit.cs.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Taivas
{
    public sealed class Tahtikuvio
    {
        public string Nimi;
        /// <summary>Tähdet (RA, Dec asteina, likimääräinen J2000).</summary>
        public (double Ra, double Dec)[] Tahdet;
        /// <summary>Viivat tähtien indekseinä.</summary>
        public (int A, int B)[] Viivat;
    }

    public static class Tahtikuviot
    {
        /// <summary>Napsautuksen säde (°): tätä kauempana ei BSC5-tähteä → annettu paikka jää sellaisenaan.</summary>
        public const double NapsautusAsteet = 0.8;

        static Tahtikuvio K(string nimi, (double, double)[] t, params (int, int)[] v) => new Tahtikuvio { Nimi = nimi, Tahdet = t, Viivat = v };

        public static readonly Tahtikuvio[] Kaikki =
        {
            K("Otava", new[] { (165.93, 61.75), (165.46, 56.38), (178.46, 53.69), (183.86, 57.03), (193.51, 55.96), (200.98, 54.93), (206.89, 49.31) },
                (0, 1), (1, 2), (2, 3), (3, 0), (3, 4), (4, 5), (5, 6)),
            K("Pieni karhu", new[] { (37.95, 89.26), (263.05, 86.59), (251.49, 82.04), (236.01, 77.79), (222.68, 74.16), (230.18, 71.83), (244.38, 75.76) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 3)),
            K("Kassiopeia", new[] { (2.29, 59.15), (10.13, 56.54), (14.18, 60.72), (21.45, 60.24), (28.60, 63.67) },
                (0, 1), (1, 2), (2, 3), (3, 4)),
            K("Orion", new[] { (88.79, 7.41), (81.28, 6.35), (83.00, -0.30), (84.05, -1.20), (85.19, -1.94), (86.94, -9.67), (78.63, -8.20), (83.78, 9.93) },
                (2, 3), (3, 4), (0, 4), (1, 2), (4, 5), (2, 6), (7, 0), (7, 1)),
            K("Joutsen", new[] { (310.36, 45.28), (305.56, 40.26), (292.68, 27.96), (296.24, 45.13), (311.55, 33.97) },
                (0, 1), (1, 2), (3, 1), (1, 4)),
            K("Lyyra", new[] { (279.23, 38.78), (281.19, 37.61), (283.63, 36.90), (284.74, 32.69), (282.52, 33.36) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 1)),
            K("Kotka", new[] { (296.56, 10.61), (297.70, 8.87), (298.83, 6.41) }, (0, 1), (1, 2)),
            K("Leijona", new[] { (152.09, 11.97), (151.83, 16.76), (154.99, 19.84), (154.17, 23.42), (148.19, 26.01), (146.46, 23.77),
                    (168.53, 20.52), (177.26, 14.57), (168.56, 15.43) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (2, 6), (6, 7), (7, 8), (8, 0)),
            K("Kaksoset", new[] { (113.65, 31.89), (116.33, 28.03) }, (0, 1)),
            K("Iso koira", new[] { (101.29, -16.72), (95.67, -17.96), (107.10, -26.39), (104.66, -28.97), (111.02, -29.30) },
                (0, 1), (0, 2), (2, 3), (2, 4)),
            K("Skorpioni", new[] { (241.36, -19.81), (240.08, -22.62), (247.35, -26.43), (252.54, -34.29), (264.33, -43.00), (263.40, -37.10) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 5)),
            K("Pegasoksen neliö", new[] { (346.19, 15.21), (345.94, 28.08), (2.10, 29.09), (3.31, 15.18) }, (0, 1), (1, 2), (2, 3), (3, 0)),
            K("Karhunvartija", new[] { (213.92, 19.18), (221.25, 27.07), (228.88, 33.31), (225.49, 40.39), (218.02, 38.31), (208.67, 18.40) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 0), (0, 5)),
            K("Ajomies", new[] { (79.17, 45.99), (89.88, 44.95), (89.93, 37.21), (81.57, 28.61), (74.25, 33.17) },
                (0, 1), (1, 2), (2, 3), (3, 4), (4, 0)),
            K("Etelän risti", new[] { (186.65, -63.10), (187.79, -57.11), (191.93, -59.69), (183.79, -58.75) }, (0, 1), (2, 3)),
            K("Kesäkolmio", new[] { (279.23, 38.78), (310.36, 45.28), (297.70, 8.87) }, (0, 1), (1, 2), (2, 0)),
        };

        /// <summary>
        /// Napsauttaa kuvioiden tähdet lähimpään luettelon tähteen (RA, Dec asteina). Palauttaa jokaiselle kuviolle tähtien
        /// ECI-suunnat samassa järjestyksessä kuin <see cref="Tahtikuvio.Tahdet"/>.
        /// </summary>
        public static List<(double x, double y, double z)[]> Napsauta(IReadOnlyList<(double Ra, double Dec)> luettelo)
        {
            var tulos = new List<(double x, double y, double z)[]>();
            double raja = Math.Cos(NapsautusAsteet * Math.PI / 180);
            var suunnat = new (double x, double y, double z)[luettelo?.Count ?? 0];
            for (int i = 0; i < suunnat.Length; i++) suunnat[i] = Taivaslaskenta.Eci(luettelo[i].Ra, luettelo[i].Dec);
            foreach (var k in Kaikki)
            {
                var t = new (double x, double y, double z)[k.Tahdet.Length];
                for (int j = 0; j < t.Length; j++)
                {
                    var s = Taivaslaskenta.Eci(k.Tahdet[j].Ra, k.Tahdet[j].Dec);
                    double paras = raja;
                    t[j] = s;
                    foreach (var l in suunnat)
                    {
                        double d = s.x * l.x + s.y * l.y + s.z * l.z;
                        if (d > paras) { paras = d; t[j] = l; }
                    }
                }
                tulos.Add(t);
            }
            return tulos;
        }

        /// <summary>Kuvion nimen paikka: tähtien suuntien keskiarvo (ECI-yksikkövektori).</summary>
        public static (double x, double y, double z) Keskipiste((double x, double y, double z)[] tahdet)
        {
            double x = 0, y = 0, z = 0;
            foreach (var s in tahdet) { x += s.x; y += s.y; z += s.z; }
            double r = Math.Sqrt(x * x + y * y + z * z);
            return r > 0 ? (x / r, y / r, z / r) : (0, 0, 1);
        }
    }
}
