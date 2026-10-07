// Kuumailmapallon kori (Päätoimittaja 7.10. 09.1x): keinunta ~1°, jousi vastasuuntaan ≤ 2°, pysähdyksessä heilahdus eteen.
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
            Oleta.Tosi(maks > 0.5 && maks <= 1.1 && min < -0.5, $"keinunta {min:F2}…{maks:F2}°");
        }

        [Testi] static void KiihdytysTaaksePysahdysEteen()
        {
            var k = new KoriLiike(); double alin = 0, ylin = 0;
            for (int i = 0; i < 60; i++) { k.Paivita(1 / 30.0, 3, 0); alin = Math.Min(alin, k.Nyokkays); }   // 2 s kiihdytys eteen
            for (int i = 0; i < 90; i++) k.Paivita(1 / 30.0, 0, 0);                                         // tasainen liike: palaa
            for (int i = 0; i < 30; i++) { k.Paivita(1 / 30.0, -3, 0); ylin = Math.Max(ylin, k.Nyokkays); } // jarrutus
            Oleta.Tosi(alin < -1.0 && alin >= -2.0 - KoriLiike.KeinuntaAst, $"kiihdytys taakse {alin:F2}°");
            Oleta.Tosi(ylin > 0.8, $"pysähdys eteen {ylin:F2}°");
        }

        [Testi] static void PallonLennotHitaammatLyhyillaValeilla()
        {
            OpasSilmukka.PalloLento = false; double l0 = OpasSilmukka.LennonKesto(400), p0 = OpasSilmukka.LennonKesto(5000);
            OpasSilmukka.PalloLento = true; double l1 = OpasSilmukka.LennonKesto(400), p1 = OpasSilmukka.LennonKesto(5000);
            OpasSilmukka.PalloLento = false;
            Oleta.Tosi(l1 / l0 > 1.5 && p1 / p0 < 1.2 && p1 / p0 > 1.1, $"lyhyt {l1 / l0:F2}, pitkä {p1 / p0:F2}");
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
