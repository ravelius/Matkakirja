// ALOITUSLENNON RATA (omistajan TF-löydös 27.9.2026): lähtö napautusnäkymästä, lyhyt lähikuva, nousu reitin rajaukseen,
// lasku kohteeseen. Testit: alku täsmälleen napautusnäkymä, kanavat jatkuvia (ei hyppyjä), kone perillä kosketuksessa,
// 7 s:n rajauksessa Lontoo ja kohde ruudulla, lähikuva lähellä ja matka kaukana, loppukuva. ALOITUSRATA_TAULU=1 tulostaa aikajanan.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class AloituslennonRataTestit
    {
        const double LontooLat = 51.507, LontooLon = -0.128;
        static readonly (string Id, double Lat, double Lon)[] Kohteet =
            { ("ateena", 37.98, 23.73), ("pariisi", 48.857, 2.352), ("rooma", 41.9, 12.5), ("istanbul", 41.01, 28.98), ("lissabon", 38.72, -9.14) };
        static readonly AloituslennonRata.Asento Napautus = new AloituslennonRata.Asento(47.0, 10.0, 6_500_000, 0, 0, 0);

        static AloituslennonRata Rata(double lat, double lon) =>
            new AloituslennonRata(LontooLat, LontooLon, lat, lon, Napautus, 1206.0 / 2622.0, 50.0, 200.0);

        [Testi]
        static void AlkaaNapautusnakymasta()
        {
            var r = Rata(37.98, 23.73);
            var a = r.Kamera(0);
            Oleta.Tosi(Math.Abs(a.Lat - Napautus.Lat) < 1e-9 && Math.Abs(a.EtaisyysM - Napautus.EtaisyysM) < 1e-3 && a.Kallistus == 0,
                $"t = 0: {a.Lat:F3} {a.EtaisyysM:F0} {a.Kallistus:F1}");
            var b = r.Kamera(1.0 / 120);
            Oleta.Tosi(Math.Abs(b.EtaisyysM / Napautus.EtaisyysM - 1) < 0.001, "lähtö levosta");
        }

        [Testi]
        static void KanavatJatkuvia()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k.Lat, k.Lon);
                double dt = 1.0 / 120;
                var ed = r.Kamera(0);
                double edV = 0;
                for (double t = dt; t <= AloituslennonRata.KestoS; t += dt)
                {
                    var a = r.Kamera(t);
                    double v = Math.Log(a.EtaisyysM / ed.EtaisyysM) / dt;
                    Oleta.Tosi(Math.Abs(v) < 6.0, $"{k.Id} zoom {v:F2} e/s t={t:F2}");
                    Oleta.Tosi(Math.Abs(v - edV) < 0.25, $"{k.Id} zoomin nykäys {v - edV:F3} t={t:F2}");
                    Oleta.Tosi(Math.Abs(LennonV3.Kulmaero(ed.Suuntima, a.Suuntima)) / dt < (t < AloituslennonRata.SyoksyS ? 100 : 60), $"{k.Id} suuntima t={t:F2}");
                    Oleta.Tosi(Math.Abs(a.Kallistus - ed.Kallistus) / dt < (t < AloituslennonRata.SyoksyS ? 100 : 60), $"{k.Id} kallistus t={t:F2}");
                    double siirto = LennonAikajana.ReittiM(ed.Lat, ed.Lon, a.Lat, a.Lon) / Math.Max(a.EtaisyysM, 1) / dt;
                    Oleta.Tosi(siirto < 3.0, $"{k.Id} katsepiste liukuu {siirto:F2} etäisyyttä/s t={t:F2}");
                    edV = v; ed = a;
                }
            }
        }

        [Testi]
        static void KonePerillaJaLahikuvaLontoossa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k.Lat, k.Lon);
                Oleta.Tosi(r.KoneenOsuus(3.4) * r.ReittiM < 20_000, $"{k.Id} lähikuva Lontoossa: {r.KoneenOsuus(3.4) * r.ReittiM / 1000:F1} km");
                Oleta.Tosi(r.KoneenOsuus(AloituslennonRata.KosketusS) > 0.998, $"{k.Id} kosketus perillä {r.KoneenOsuus(14.3):F4}");
                Oleta.Tosi(Math.Abs(r.KoneenOsuus(15) - 1) < 1e-9, $"{k.Id} 15 s");
                double ed = 0;
                for (double t = 0; t <= 15; t += 0.01) { double p = r.KoneenOsuus(t); Oleta.Tosi(p >= ed - 1e-12, "monotoninen"); ed = p; }
                Oleta.Tosi(r.Kamera(2.7).EtaisyysM < 30_000 && r.Kamera(8).EtaisyysM > 150_000, $"{k.Id} lähi {r.Kamera(2.7).EtaisyysM / 1000:F0} km, matka {r.Kamera(8).EtaisyysM / 1000:F0} km");
                var l = r.Kamera(15);
                Oleta.Tosi(Math.Abs(l.EtaisyysM - AloituslennonRata.LoppuM) < 1 && Math.Abs(l.Lat - k.Lat) < 1e-3, $"{k.Id} loppukuva");
            }
        }

        [Testi]
        static void RajausNayttaaMatkan()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k.Lat, k.Lon);
                var a = r.Rajaukset[0];
                double yL = r.RuudunY(a.Katse, a.EtaisyysM, LontooLat, LontooLon), yK = r.RuudunY(a.Katse, a.EtaisyysM, k.Lat, k.Lon);
                Oleta.Tosi(Math.Abs(yL - AloituslennonRata.RajausAla) < 0.02 && Math.Abs(yK - AloituslennonRata.RajausYla) < 0.02,
                    $"{k.Id} 7 s: Lontoo y {yL:F2}, kohde y {yK:F2}, {a.EtaisyysM / 1000:F0} km");
            }
            if (Environment.GetEnvironmentVariable("ALOITUSRATA_TAULU") != "1") return;
            foreach (var k in Kohteet)
            {
                var r = Rata(k.Lat, k.Lon);
                Console.WriteLine($"{k.Id}: reitti {r.ReittiM / 1000:F0} km, matkanopeus {r.MatkaNopeus / 1000:F0} km/s, rajaukset "
                                  + string.Join(", ", Array.ConvertAll(r.Rajaukset, x => $"{x.T:F0} s {x.EtaisyysM / 1000:F0} km")));
                for (double t = 0; t <= 15.001; t += 0.5)
                {
                    var c = r.Kamera(t);
                    double p = r.KoneenOsuus(t), s = AloituslennonRata.Siipivali(c.EtaisyysM);
                    Console.WriteLine($"  {t,4:F1} s  kamera {c.EtaisyysM / 1000,8:F1} km  kall {c.Kallistus,5:F1}°  suunt {c.Suuntima,5:F0}°  "
                                      + $"kone {p * r.ReittiM / 1000,6:F0} km  kork {AloituslennonRata.KoneenKorkeus(t, s) / 1000,5:F1} km  siipi {s / 1000,5:F1} km");
                }
            }
        }
    }
}
