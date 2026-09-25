// ETUSIVUN LENTO (löydös 112): reitti, ajoitus, kamera ja jälki webin js/etusivupallo.js:n mukaan.
// Kultaiset arvot: webin puhtaat funktiot (kaariAste … jaljenPisteet, origin/main 25.9.2026) Nodella ajettuina
// ämpärin etusivu.json-koordinaateilla (proto-3d/lokit/loydos112-etusivupallo). Mitoitus: mitatut-dom-arvot.json.
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class EtusivunLentoTestit
    {
        static void Lahella(double odotettu, double saatu, double tol, string mika) =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) <= tol, $"{mika}: odotettu {odotettu}, saatu {saatu}");

        [Testi]
        static void KestoJaJaksot()
        {
            Lahella(49.62275265795338, EtusivunLento.Kesto, 1e-9, "kesto (etusivu.json 49,6228)");
            Oleta.Sama(11, EtusivunLento.Jaksot.Length, "10 lentoa + pito");
            // MITAT.md luku 2: jaksojen alut ja kestot.
            double[] alut = { 0.000, 1.355, 5.679, 11.187, 13.900, 17.833, 21.513, 25.474, 35.035, 40.261, 47.023 };
            for (int i = 0; i < alut.Length; i++) Lahella(alut[i], EtusivunLento.Jaksot[i].Alku, 0.0015, "alku " + i);
            Lahella(9.561, EtusivunLento.Jaksot[7].Kesto, 0.0015, "Tokio → San Francisco");
            Oleta.Tosi(EtusivunLento.Jaksot[10].Pito && EtusivunLento.Jaksot[10].Kesto == 2.6, "Lontoon pito 2,6 s");
        }

        // (t, lat, lon, jakso, osuus, kamera lat, kamera lon, jäljen näytteitä, jäljen 6. näyte lat, lon) — web Nodella.
        static readonly (double T, double Lat, double Lon, int Jakso, double Osuus, double KLat, double KLon, int N, double J5Lat, double J5Lon)[] Kultaiset =
        {
            (0, 51.50509, -0.115, 0, 0, 30.434907, 2.984432, 2, 51.50509, -0.115),
            (0.5, 50.529606, 0.820303, 0, 0.368995, 29.814284, 5.05341, 2, 50.529606, 0.820303),
            (3, 42.555081, 15.287762, 1, 0.380457, 25.71048, 15.740271, 12, 47.4149, 5.851033),
            (5.679, 29.999723, 31.22847, 2, 0.000055, 20.538088, 33.125606, 25, 47.338591, 6.026485),
            (17.833, 1.802171, 103.599265, 4, 0.999879, 7.586652, 102.654631, 79, 47.338591, 6.026485),
            (30.1, 48.714078, 185.976244, 7, 0.483809, 28.50964, 186.41603, 138, 47.338591, 6.026485),
            (45, 53.853566, 335.339343, 9, 0.700844, 31.947532, 333.246149, 212, 47.338591, 6.026485),
            (47.5, 51.50509, 359.885, 10, 0.183557, 32.177576, 351.373258, 222, 47.338591, 6.026485),
            (49.3, 51.50509, 359.885, 10, 0.875864, 30.809153, 361.310243, 222, 47.338591, 6.026485),
        };

        [Testi]
        static void KoneKameraJaJalkiKuinWeb()
        {
            var jalki = new List<EtusivunLento.Piste>();
            foreach (var k in Kultaiset)
            {
                var kone = EtusivunLento.KoneenTila(k.T);
                string s = $"t {k.T}";
                Lahella(k.Lat, kone.Lat, 2e-6, s + " kone lat");
                Lahella(k.Lon, kone.Lon, 2e-6, s + " kone lon");
                Oleta.Sama(k.Jakso, kone.Jakso, s + " jakso");
                Lahella(k.Osuus, kone.Osuus, 2e-6, s + " osuus");
                var kam = EtusivunLento.KameranNakyma(k.T);
                Lahella(k.KLat, kam.Lat, 2e-6, s + " kamera lat");
                Lahella(k.KLon, kam.Lon, 2e-6, s + " kamera lon");
                EtusivunLento.JaljenPisteet(k.T, jalki);
                Oleta.Sama(k.N, jalki.Count, s + " jäljen näytteet");
                var j5 = jalki[Math.Min(5, jalki.Count - 1)];
                Lahella(k.J5Lat, j5.Lat, 2e-6, s + " jälki[5] lat");
                Lahella(k.J5Lon, j5.Lon, 2e-6, s + " jälki[5] lon");
                var viimeinen = jalki[jalki.Count - 1];
                Lahella(kone.Lat, viimeinen.Lat, 1e-9, s + " jälki päättyy koneeseen");
            }
        }

        [Testi]
        static void JaksollinenSauma()
        {
            // Web t = −1,7 s: kone edellisen kierroksen Lontoossa, kamera kurkistaa sauman yli (−5,978184°).
            var kone = EtusivunLento.KoneenTila(-1.7);
            Lahella(-0.115, kone.Lon, 1e-9, "edellinen kierros");
            Lahella(31.964944, EtusivunLento.KameranNakyma(-1.7).Lat, 2e-6, "kamera lat −1,7 s");
            Lahella(-5.978184, EtusivunLento.KameranNakyma(-1.7).Lon, 2e-6, "kamera lon −1,7 s");
            // Kamera on saumaton: t = kesto − ε ja t = +ε antavat saman kiedotun näkymän.
            double e = 1e-4, kesto = EtusivunLento.Kesto;
            var a = EtusivunLento.KameranNakyma(kesto - e);
            var b = EtusivunLento.KameranNakyma(e);
            Lahella(a.Lat, b.Lat, 1e-3, "sauma lat");
            Lahella(EtusivunLento.KaariAste(a.Lon), EtusivunLento.KaariAste(b.Lon), 1e-3, "sauma lon");
            Lahella(1.0, EtusivunLento.Kierroksessa(kesto + 1.0), 1e-9, "kierroksessa");
            Lahella(kesto - 1.0, EtusivunLento.Kierroksessa(-1.0), 1e-9, "kierroksessa negatiivinen");
        }

        [Testi]
        static void Haivytys()
        {
            double kesto = EtusivunLento.Kesto;
            Lahella(0, EtusivunLento.Haivytys(0), 1e-12, "alku");
            Lahella(0.5, EtusivunLento.Haivytys(0.55), 1e-9, "nousu");
            Lahella(1, EtusivunLento.Haivytys(20), 1e-12, "keskellä");
            Lahella(1, EtusivunLento.Haivytys(kesto - 2.0), 1e-12, "pidon alku näkyy");
            Lahella(0.5, EtusivunLento.Haivytys(kesto - 0.55), 1e-9, "lasku pidon lopussa");
            Lahella(0, EtusivunLento.Haivytys(kesto), 1e-12, "loppu");
        }

        [Testi]
        static void MitoitusKuinWeb()
        {
            // Polkuyksikkö: iPhone 0,7523 pt, iPad 1,0744 pt (koneTransform scale × SVG-laatikko / 1200).
            Lahella(0.961 * 938.890625 / 1200, EtusivunLento.Yksikko(393, 852), 0.002, "iPhone yksikkö");
            Lahella(0.863 * 1493.09375 / 1200, EtusivunLento.Yksikko(834, 1194), 0.002, "iPad yksikkö");
            // Viiva ruudulla: stroke-width (SVG-yksikköä) × laatikko / 1200.
            Lahella(9.2 * 938.890625 / 1200, EtusivunLento.ViivanLeveys(393, 852), 0.02, "iPhone viiva 7,2 pt");
            Lahella(8.26 * 1493.09375 / 1200, EtusivunLento.ViivanLeveys(834, 1194), 0.02, "iPad viiva 10,3 pt");
            // Koneen bbox kierrettynä (koneGBBoxRuudulla): 29 × 18 polkuyksikköä.
            (double L, double K) Laatikko(double kulma, double y)
            {
                double c = Math.Abs(Math.Cos(kulma * Math.PI / 180)), s = Math.Abs(Math.Sin(kulma * Math.PI / 180));
                return ((29 * c + 18 * s) * y, (29 * s + 18 * c) * y);
            }
            var p = Laatikko(35.6, EtusivunLento.Yksikko(393, 852));
            Lahella(25.61, p.L, 0.1, "iPhone bbox leveys");
            Lahella(23.70, p.K, 0.1, "iPhone bbox korkeus");
            var t = Laatikko(36.8, EtusivunLento.Yksikko(834, 1194));
            Lahella(36.51, t.L, 0.1, "iPad bbox leveys");
            Lahella(34.13, t.K, 0.1, "iPad bbox korkeus");
            // Koneen polun rajat x −15…14, y −9…9.
            double minX = 0, maxX = 0, minY = 0, maxY = 0;
            foreach (var (_, xy) in EtusivunLento.KoneenPolku)
                for (int i = 0; i < xy.Length; i += 2)
                {
                    minX = Math.Min(minX, xy[i]); maxX = Math.Max(maxX, xy[i]);
                    minY = Math.Min(minY, xy[i + 1]); maxY = Math.Max(maxY, xy[i + 1]);
                }
            Oleta.Tosi(minX == -15 && maxX == 14 && minY == -9 && maxY == 9, "koneen polun rajat");
        }
    }
}
