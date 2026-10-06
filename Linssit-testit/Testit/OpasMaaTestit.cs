using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasMaaTestit
    {
        [Testi] static void TorniEiNostaMaata()
        {
            // Eiffel: keskipisteen säde osuu toiseen tasanteeseen (~191 m), kehä maahan (~77 m), yksi kehäpiste puuhun.
            var (maa, korkeus) = OpasKuvaus.MaaJaKorkeus(191, new double[] { 77, 78, 76, 79, 77, 95, 78, 77 });
            Oleta.Sama(77.5, maa, "maa kehän mediaanista");
            Oleta.Sama(113.5, korkeus, "korkeus keskus − maa");
            var (m2, k2) = OpasKuvaus.MaaJaKorkeus(80, new double[] { 77, 60, 78, 79, 77, 78, 78, 77 });
            Oleta.Tosi(m2 == 77.5 && k2 == 0, "matala kohde: korkeus 0; yksittäinen kuoppa (60) ei vedä alas");
            var (m3, k3) = OpasKuvaus.MaaJaKorkeus(77, new double[] { double.NaN, double.NaN });
            Oleta.Tosi(m3 == 77 && k3 == 0, "ilman kehää keskus");
            var (m4, _) = OpasKuvaus.MaaJaKorkeus(70, new double[] { 77, 78, 79, 80, 81, 82, 83, 84 });
            Oleta.Sama(70.0, m4, "keskus matalampi (kuoppa, ranta) → keskus");
        }

        [Testi] static void RinteessaMaaJalanTasolla()
        {
            // Sacré-Cœur -tyyppinen mäki: jalka 130 m, kehä rinteessä 112…140 m (alas etelään, ylös pohjoiseen), kupoli 213 m.
            var (maa, korkeus) = OpasKuvaus.MaaJaKorkeus(213, new double[] { 140, 136, 128, 118, 112, 120, 129, 137 });
            Oleta.Tosi(Math.Abs(maa - 128.5) < 0.01, $"maa mediaanista jalan tasolla ({maa:F1}), ei rinteen pohjalla (112)");
            Oleta.Tosi(korkeus > 80 && korkeus < 90, $"korkeus {korkeus:F1}");
            // Naapurin katot puolessa kehästä eivät nosta maata yli keskuksen (matala rakennus, keskus = oma katto 25 m).
            var (m2, _) = OpasKuvaus.MaaJaKorkeus(102, new double[] { 77, 77, 100, 101, 78, 99, 77, 78 });
            Oleta.Tosi(m2 <= 102, "maa ≤ keskus");
        }

        [Testi] static void KorkeaTorniKehystetaanKauas()
        {
            var matala = OpasKuvaus.Kehysta(new OpasKohde { Nimi = "Eiffel", Lat = 48.8583, Lon = 2.2945, KokoM = 125, Luokka = "torni" }, 77, 0);
            var korkea = OpasKuvaus.Kehysta(new OpasKohde { Nimi = "Eiffel", Lat = 48.8583, Lon = 2.2945, KokoM = 125, KorkeusM = 300, Luokka = "torni" }, 77, 0);
            Oleta.Tosi(korkea.EtaisyysM > 2 * matala.EtaisyysM, $"korkeus kaukaa: {matala.EtaisyysM:F0} → {korkea.EtaisyysM:F0} m");
            double sade = OpasKuvaus.KehaSade(125);
            Oleta.Tosi(sade > 62 && sade < 100, $"kehä jalanjäljen ulkopuolella ({sade:F0} m)");
            var p = OpasKuvaus.KehaPiste(48.8583, 2.2945, sade, 2);
            Oleta.Tosi(Math.Abs(KierrosLento.EtaisyysM(48.8583, 2.2945, p.lat, p.lon) - sade) < 1, "kehäpiste säteellä");
        }
    }
}
