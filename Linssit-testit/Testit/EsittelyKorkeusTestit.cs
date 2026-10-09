// Esittelykorkeus (omistaja TF 169, PT 9.10.): pallossa silmä rakennuksen puolivälin–hieman yläpuolen korkeudella, kattojen yläpuolella.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class EsittelyKorkeusTestit
    {
        static double Silma(Pysahdys p) => p.NostoM + p.EtaisyysM * Math.Cos(p.Kallistus * Math.PI / 180);

        [Testi] static void PallossaPuolivalinKorkeudelleKattojenYlapuolelle()
        {
            bool vanha = OpasSilmukka.PalloLento;
            try
            {
                var nd = new OpasKohde { Id = "notre-dame", Nimi = "Notre-Dame", Lat = 48.853, Lon = 2.3499, KokoM = 130, KorkeusM = 96, Luokka = "kirkko" };
                OpasSilmukka.PalloLento = false;
                double ennen = Silma(OpasKuvaus.Kehysta(nd, 35, 0));
                OpasSilmukka.PalloLento = true;
                double ilmanKattoja = Silma(OpasKuvaus.Kehysta(nd, 35, 0));
                nd.YmparysM = 22;
                var p = OpasKuvaus.Kehysta(nd, 35, 0);
                double s = Silma(p);
                Oleta.Tosi(Math.Abs(p.KattoYlaM - 34) < 1e-9, $"katto ympäröivät katot + 12 m ({p.KattoYlaM:F0})");
                Oleta.Tosi(s >= 0.5 * 96 - 1 && s <= 0.7 * 96 + 1, $"silmä 0,5–0,7 × korkeus ({s:F0} m; ennen {ennen:F0}, ilman kattotietoa {ilmanKattoja:F0})");
                Oleta.Tosi(p.Kallistus <= OpasOhjaus.KallistusMax, "jyrkkyys rajoissa");
                var matala = new OpasKohde { Id = "louvre", Nimi = "Louvre", Lat = 48.861, Lon = 2.336, KokoM = 200, KorkeusM = 16, Luokka = "museo", YmparysM = 24 };
                var pm = OpasKuvaus.Kehysta(matala, 35, 0);
                Oleta.Tosi(Silma(pm) >= 24 + 12 - 1, $"matala kohde: silmä kattojen yläpuolella ({Silma(pm):F0} m)");
                Oleta.Sama(double.NaN, OpasKuvaus.Ymparys(new List<double> { 10, 20 }), "liian vähän näytteitä");
                Oleta.Tosi(Math.Abs(OpasKuvaus.Ymparys(new List<double> { 5, 10, 12, 14, 18, 20, 22, 25, 30, 80 }) - 30) < 1e-9, "90. persentiili (torni ei nosta)");
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }
    }
}
