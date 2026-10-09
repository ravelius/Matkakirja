// OPPAAN LYHIN REITTI 37 KAUPUNGISSA (Linssiseppä 9.10.2026; omistaja Tukholmasta: liian kaukaiset kohteet ja siksak): OpasReitti.Lyhin
// kultaisella datalla (opas-kierrokset-20261008.json, workerin "kierros"-järjestys). Taulukko "| kaupunki | ennen km | jälkeen km |
// pudotetut |" tulostetaan raporttia varten. Tarkistukset: jälkeen ≤ ennen joka kaupungissa, ensimmäinen kohde ennallaan, enintään kaksi
// pudotusta, Tukholma pudottaa Drottningholmin linnan ja Skogskyrkogårdenin, Pariisi ei mitään. Lisäksi heuristinen haara (n > 10).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasReittiTestit
    {
        static (double Lat, double Lon) P(OpasKohde k) => (k.Lat, k.Lon);

        [Testi] static void LyhinKaikissaKaupungeissa()
        {
            Console.WriteLine("| kaupunki | ennen km | jälkeen km | pudotetut |");
            Console.WriteLine("|---|---:|---:|---|");
            foreach (var c in PalloKaupungitTestit.Lue())
            {
                var reitti = OpasReitti.Lyhin(c.Kohteet, P, out var pudotetut);
                double ennen = OpasReitti.Pituus(c.Kohteet, P), jalkeen = OpasReitti.Pituus(reitti, P);
                Console.WriteLine($"| {c.Nimi} | {ennen / 1000:F1} | {jalkeen / 1000:F1} | {string.Join(", ", pudotetut.Select(k => k.Nimi))} |");
                if (c.Id == "tukholma" || c.Id == "pariisi")
                {
                    Console.WriteLine($"  ennen: {string.Join(" → ", c.Kohteet.Select(k => k.Nimi))}");
                    Console.WriteLine($"  jälkeen: {string.Join(" → ", reitti.Select(k => k.Nimi))}");
                }
                Oleta.Tosi(jalkeen <= ennen + 1e-6, $"{c.Nimi}: jälkeen {jalkeen:F0} > ennen {ennen:F0}");
                Oleta.Sama(c.Kohteet[0].Id, reitti[0].Id, $"{c.Nimi}: ensimmäinen muuttui");
                Oleta.Tosi(pudotetut.Count <= OpasReitti.MaksimiPudotus, $"{c.Nimi}: {pudotetut.Count} pudotusta");
                Oleta.Sama(c.Kohteet.Length, reitti.Count + pudotetut.Count, $"{c.Nimi}: kohteita hävisi");
                Oleta.Sama(reitti.Count, reitti.Select(k => k.Id).Distinct().Count(), $"{c.Nimi}: tuplakohde");
                if (c.Id == "tukholma")
                    Oleta.Sama("Drottningholmin linna, Skogskyrkogården", string.Join(", ", pudotetut.Select(k => k.Nimi).OrderBy(n => n, StringComparer.Ordinal)), "Tukholma");
                if (c.Id == "pariisi") Oleta.Sama(0, pudotetut.Count, "Pariisi pudotti");
            }
        }

        [Testi] static void HeuristinenEiPidennaJaEnsimmainenPysyy()
        {
            // 14 pistettä siksakkina kahdella rivillä (≈ 300 m välein): heuristinen haara, tulos ei pidempi kuin annettu järjestys.
            var l = new List<(double Lat, double Lon)>();
            for (int i = 0; i < 14; i++) l.Add((60.0 + (i % 2) * 0.004, 24.0 + (i % 7) * 0.006 + (i / 7) * 0.001));
            var r = OpasReitti.Lyhin(l, x => x, out var pudotetut);
            Oleta.Sama(0, pudotetut.Count, "pudotti");
            Oleta.Sama(l[0], r[0], "ensimmäinen");
            Oleta.Tosi(OpasReitti.Pituus(r, x => x) <= OpasReitti.Pituus(l, x => x) + 1e-6, "pidempi");
        }

        // Tukholman uusi kierros (Pelikoodari esittely-v3, 9.10.: 5 lähikohdetta, Held–Karp 6,3 km kuninkaanlinnalta): ei pudotuksia,
        // tarkka järjestys (14 ≤ TarkkaRaja), sama pituus kuin Pelikoodarin. Vanhojen kohteiden paikat kultaisesta datasta / Wikidatasta.
        [Testi] static void TukholmanUusiKierrosLyhin()
        {
            var k = new (string Nimi, double Lat, double Lon)[]
            {
                ("Kuninkaanlinna", 59.32667, 18.07167), ("Suurkirkko", 59.32583, 18.07056), ("Stortorget", 59.32500, 18.07083), ("Gamla stan", 59.32500, 18.07083),
                ("Ritarihuone", 59.32593, 18.06573), ("Riddarholmen", 59.32472, 18.06472), ("Kaupungintalo", 59.32750, 18.05472), ("Valtiopäivätalo", 59.32750, 18.06750),
                ("Kuninkaanpuisto", 59.33194, 18.07111), ("Kansallismuseo", 59.32861, 18.07806), ("Skeppsholmen", 59.32600, 18.08300), ("Vasa-museo", 59.32807, 18.09139),
                ("Skansen", 59.32445, 18.10100), ("Katarinan kirkko", 59.31708, 18.07806),
            };
            var l = OpasReitti.Lyhin(k, x => (x.Lat, x.Lon), out var pois);
            double pit = OpasReitti.Pituus(l, x => (x.Lat, x.Lon));
            Console.WriteLine($"      Tukholma uusi: {pit / 1000:F1} km: {string.Join(" → ", l.ConvertAll(x => x.Nimi))}");
            Oleta.Sama(0, pois.Count, "ei pudotuksia (kaikki lähellä)");
            Oleta.Sama("Kuninkaanlinna", l[0].Nimi, "alku pysyy");
            Oleta.Tosi(pit <= 6400, $"lyhin {pit:F0} m (Pelikoodarin Held–Karp 6,3 km)");
        }
    }
}
