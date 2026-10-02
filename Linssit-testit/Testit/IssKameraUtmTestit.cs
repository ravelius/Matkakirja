// ISS-kameran UTM-muunnos: keskimeridiaanin pohjoiskoordinaatti = 0,9996 × meridiaanikaari, ja edestakainen muunnos
// Euroopan reunoilla (myös naapurivyöhykkeen puolelle, koska S2-ruudut ulottuvat vyöhykkeen yli).
using System;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraUtmTestit
    {
        [Testi]
        static void KeskimeridiaaniJaPaivantasaaja()
        {
            var (e0, n0) = Utm.Eteen(0, 27, 35);
            Oleta.Tosi(Math.Abs(e0 - 500000) < 1e-6 && Math.Abs(n0) < 1e-6, $"{e0} {n0}");
            var (e, n) = Utm.Eteen(60, 27, 35);   // meridiaanikaari 60°: 6 654 072,819 m (WGS84)
            Oleta.Tosi(Math.Abs(e - 500000) < 1e-6 && Math.Abs(n - 0.9996 * 6654072.819) < 0.01, $"{e} {n}");
        }

        [Testi]
        static void EdestakainenMuunnos()
        {
            foreach (var (lat, lon, v) in new[] { (60.17, 24.94, 35), (36.4, 25.43, 35), (64.15, -21.94, 27), (45.83, 6.86, 32), (41.0, 34.5, 35), (70.0, 25.0, 35) })
            {
                var (e, n) = Utm.Eteen(lat, lon, v);
                var (la, lo) = Utm.Taakse(e, n, v);
                Oleta.Tosi(Math.Abs(la - lat) < 1e-9 && Math.Abs(lo - lon) < 1e-9, $"{lat},{lon} → {la},{lo}");
            }
            // 35VLG:n vasen yläkulma (COG:n tiepoint 300000, 6700020) on noin 60,4° N 23,4° E.
            var (a, b) = Utm.Taakse(300000, 6700020, 35);
            Oleta.Tosi(Math.Abs(a - 60.4) < 0.1 && Math.Abs(b - 23.4) < 0.1, $"{a} {b}");
            Oleta.Sama(35, Utm.Vyohyke("35VLG"));
        }
    }
}
