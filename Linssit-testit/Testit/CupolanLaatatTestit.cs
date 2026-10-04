// Cupolan näkymän rasterilaatat ennakolta (CupolanLaatat): iPad 36a05beb -ajon ensiavauksen asento.
using System;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    static class CupolanLaatatTestit
    {
        // Ennakon asento iPadilta (48,88, 27,04, 1199 km, 74°, 68°), Cupolan kenttä 50°, iPad vaaka 2732 × 2048.
        static readonly Kuvakulma Asento = new Kuvakulma(48.88, 27.04, 1_199_000, 74, 68);

        [Testi] static void S2JaBmngLaatatKohtuullisetJaLahellaTarkimmat()
        {
            var s2 = CupolanLaatat.Laske(Asento, 50, 2732.0 / 2048, 2048, 6, 10, alue: (-28.125, 31.952162, 45.0, 72.395704));
            var bm = CupolanLaatat.Laske(Asento, 50, 2732.0 / 2048, 2048, 0, 7);
            Console.WriteLine($"  S2 {s2.Count} laattaa ({string.Join(", ", s2.GroupBy(t => t.z).Select(g => $"z{g.Key} {g.Count()}"))}), BMNG {bm.Count} ({string.Join(", ", bm.GroupBy(t => t.z).Select(g => $"z{g.Key} {g.Count()}"))})");
            Oleta.Tosi(s2.Count > 20 && s2.Count < 1500, $"S2 {s2.Count}");
            // iPad 8023e34c -hakuloki: mustan aikana Cesium haki S2:n juuret (13 × 13) karkeiden maastolaattojen takia.
            Oleta.Tosi(s2.Count(t => t.z == 6) >= 150, $"S2-juuria {s2.Count(t => t.z == 6)}");
            Oleta.Tosi(new[] { 2, 3, 4 }.All(z => bm.Any(t => t.z == z)), "BMNG z2–z4");
            Oleta.Tosi(s2.Any(t => t.z == 8) && s2.Max(t => t.z) <= 9, $"tarkin S2-taso z{s2.Max(t => t.z)} (hakuloki: z6–z8)");
            Oleta.Tosi(s2.Any(t => t.z == 6), "esivanhemmat juureen asti");
            // Katsepisteen laatta on mukana jollain tasolla.
            Oleta.Tosi(Enumerable.Range(6, 5).Any(z => { var (x, y) = Laattalista.Laatta(48.88, 27.04, z); return s2.Contains((z, x, y)); }), "katsepiste");
            Oleta.Tosi(bm.Count > 5 && bm.Count < 1200, $"BMNG {bm.Count}");
        }

        [Testi] static void MaastolaatatNelipuuna()
        {
            var m = CupolanLaatat.Maastolaatat(Asento, 50, 2732.0 / 2048, 2048);
            Oleta.Tosi(m.Contains((0, 0, 0)) && m.Contains((0, 1, 0)), "juuret 2 × 1");
            // TMS: y = 0 etelässä; katsepisteen (48,88, 27,04) taso 6 -laatta: x = (27,04 + 180) / 2,8125, y = (48,88 + 90) / 2,8125.
            Oleta.Tosi(m.Contains((6, 73, 49)), "katsepisteen L6-laatta");
            foreach (var (l, x, y) in m)
                if (l > 0) Oleta.Tosi(m.Contains((l, x ^ 1, y)) && m.Contains((l, x, y ^ 1)) && m.Contains((l - 1, x >> 1, y >> 1)), $"sisarukset ja isä {l}/{x}/{y}");
            Console.WriteLine($"  maastolaattoja {m.Count}, tarkin L{m.Max(t => t.l)}");
        }

        [Testi] static void AlueRajaaJaPolutMallista()
        {
            var kaikki = CupolanLaatat.Laske(Asento, 50, 1.33, 2048, 6, 10);
            var rajattu = CupolanLaatat.Laske(Asento, 50, 1.33, 2048, 6, 10, alue: (-28.125, 31.95, 25.0, 72.4));
            Oleta.Tosi(rajattu.Count < kaikki.Count, $"rajaus {rajattu.Count} < {kaikki.Count}");
            var p = CupolanLaatat.Polut("https://media.matkakirja.app/s2/v1/{z}/{x}/{reverseY}.jpg", new[] { (6, 36, 22) }, "https://media.matkakirja.app/");
            Oleta.Sama("s2/v1/6/36/22.jpg", p[0]);
            // S2 Eurooppa (AstronauttiKerros: 13 × 13 juurta z6, W −28,125, N 72,3957): ämpärissä 4/156/144 = z10 588/352.
            var j = CupolanLaatat.Juuri(-28.125, 72.395704, 6);
            Oleta.Sama((27, 13), j);
            var s2 = CupolanLaatat.Polut("https://media.matkakirja.app/s2/v1/{z}/{x}/{reverseY}.jpg", new[] { (10, 588, 352), (5, 13, 6) }, "https://media.matkakirja.app/", 6, j.x, j.y);
            Oleta.Sama(1, s2.Count, "juuren yläpuolinen taso ohitetaan");
            Oleta.Sama("s2/v1/4/156/144.jpg", s2[0]);
        }
    }
}
