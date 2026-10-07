using System.Collections.Generic;
// Kuumailmapallon kori (Päätoimittaja 7.10. 09.1x, vahvistettu 18.5x): keinunta ~2,5°, jousi vastasuuntaan ≤ 5,5°, pysähdyksessä heilahdus eteen.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KoriLiikeTestit
    {
        [Testi] static void KeinuntaPieniJaJatkuva()
        {
            var k = new KoriLiike(); double maks = 0, min = 0;
            for (int i = 0; i < 600; i++) { k.Paivita(1 / 30.0, 0, 0); maks = Math.Max(maks, k.Kallistus); min = Math.Min(min, k.Kallistus); }
            Oleta.Tosi(maks > 1.8 && maks <= 2.6 && min < -1.8, $"keinunta {min:F2}…{maks:F2}°");
        }

        [Testi] static void KiihdytysTaaksePysahdysEteen()
        {
            var k = new KoriLiike(); double alin = 0, ylin = 0;
            for (int i = 0; i < 60; i++) { k.Paivita(1 / 30.0, 3, 0); alin = Math.Min(alin, k.Nyokkays); }   // 2 s kiihdytys eteen
            for (int i = 0; i < 90; i++) k.Paivita(1 / 30.0, 0, 0);                                         // tasainen liike: palaa
            for (int i = 0; i < 30; i++) { k.Paivita(1 / 30.0, -3, 0); ylin = Math.Max(ylin, k.Nyokkays); } // jarrutus
            Oleta.Tosi(alin < -4.0 && alin >= -KoriLiike.RajaAst - KoriLiike.KeinuntaAst, $"kiihdytys taakse {alin:F2}°");
            Oleta.Tosi(ylin > 3.0, $"jarrutus eteen {ylin:F2}°");
        }

        [Testi] static void PallonLennotHitaitaJaPehmeita()
        {
            // Omistaja TF 163 (23.2x): "pallo liikkuu vieläkin aivan liian nopeasti ja äkkinäisesti" → huippunopeus noin puoleen,
            // kiihdytys ja jarrutus ≥ 4 s, kääntyminen ≤ 10°/s (pahin tapaus: lähtösuunta vastakkainen lentosuuntaan).
            foreach (double m in new[] { 300.0, 800, 1500, 3000, 6000 })
            {
                OpasSilmukka.PalloLento = false;
                double vanha = OpasSilmukka.LennonKesto(m) * OpasSilmukka.PalloKerroin(m / 1000);   // TF 163:n pallokesto
                var (vVanha, _, _) = Mittaa(m, vanha, false);
                OpasSilmukka.PalloLento = true;
                double T = OpasSilmukka.LennonKesto(m);
                var (v, kiihdytysS, kaantoAstS) = Mittaa(m, T, true);
                OpasSilmukka.PalloLento = false;
                Oleta.Tosi(T >= OpasSilmukka.PalloLentoMinS, $"{m} m: kesto {T:F1} s");
                Oleta.Tosi(v <= 0.55 * vVanha, $"{m} m: huippunopeus {v:F0} m/s (oli {vVanha:F0})");
                Oleta.Tosi(kiihdytysS >= 3.95, $"{m} m: kiihdytys {kiihdytysS:F1} s");
                Oleta.Tosi(kaantoAstS <= 10.2, $"{m} m: kääntyminen {kaantoAstS:F1}°/s");
            }
        }

        /// <summary>Lento pohjoiseen m metriä kestolla T: katsepisteen huippunopeus (m/s), aika huippunopeuteen (s) ja suurin
        /// kääntönopeus (°/s), kun kamera katsoo lähtiessä etelään (180°).</summary>
        static (double v, double kiihdytys, double kaanto) Mittaa(double m, double T, bool pallo)
        {
            double lat0 = 48.85, lon0 = 2.35, lat1 = lat0 + m / 111320.0;
            double tulo = pallo ? OpasSilmukka.PalloTulosuunta(180, 0, T) : 0;
            var a = new Kuvakulma(lat0, lon0, 800, 55, 180);
            var b = new Kuvakulma(lat1, lon0, 800, 55, tulo);
            const double dt = 0.02;
            var ed = OpasKuvaus.Lennossa(a, b, 0);
            double vMax = 0, tMax = 0, kMax = 0;
            var nopeudet = new List<(double t, double v)>();
            for (double t = dt; t <= T + 1e-9; t += dt)
            {
                var k = OpasKuvaus.Lennossa(a, b, t / T);
                double v = KierrosLento.EtaisyysM(ed.Lat, ed.Lon, k.Lat, k.Lon) / dt;
                double w = Math.Abs(KierrosLento.Kiedo(k.Suuntima - ed.Suuntima)) / dt;
                nopeudet.Add((t, v)); if (v > vMax) vMax = v; if (w > kMax) kMax = w;
                ed = k;
            }
            foreach (var (t, v) in nopeudet) if (v >= 0.995 * vMax) { tMax = t; break; }
            return (vMax, tMax, kMax);
        }

        [Testi] static void KoydetViiveella()
        {
            var k = new KoriLiike();
            for (int i = 0; i < 5; i++) k.Paivita(1 / 30.0, 0, 6);
            Oleta.Tosi(Math.Abs(k.KoysiKallistus) < Math.Abs(k.Kallistus), "köysi jää koriin nähden jälkeen");
            var v = new KoriLiike { Vahennetty = true };
            v.Paivita(0.1, 5, 5);
            Oleta.Tosi(v.Nyokkays == 0 && v.Kallistus == 0);
        }
    }
}
