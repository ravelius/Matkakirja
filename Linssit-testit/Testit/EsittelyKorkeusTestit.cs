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

        /// <summary>Pitkä matala rakennus (PT 9.10., Orsay 190 m / 24 m): silmä vähintään 0,25 × koko, ei 28 m:ssä kadun yllä.</summary>
        [Testi] static void PitkaMatalaRakennusKorkeammalta()
        {
            bool vanha = OpasSilmukka.PalloLento;
            try
            {
                OpasSilmukka.PalloLento = true;
                var orsay = new OpasKohde { Id = "Q23402", Nimi = "Orsayn taidemuseo", Lat = 48.86, Lon = 2.3265, KokoM = 190, KorkeusM = 24, Luokka = "rakennus", YmparysM = 16 };
                var p = OpasKuvaus.Kehysta(orsay, 35, 0);
                Oleta.Tosi(Silma(p) >= 0.25 * 190 - 1, $"Orsay: silmä {Silma(p):F0} m ≥ 0,25 × 190");
                var nd = new OpasKohde { Id = "nd", Nimi = "Notre-Dame", Lat = 48.853, Lon = 2.3499, KokoM = 128, KorkeusM = 96, Luokka = "kirkko", YmparysM = 5 };
                Oleta.Tosi(Math.Abs(Silma(OpasKuvaus.Kehysta(nd, 35, 0)) - 0.6 * 96) < 1, "korkea kohde ennallaan (0,6 × korkeus)");
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        /// <summary>Alue (kuva-arkki 9.10., P3/T3): korkeudeton suuri kohde viistosti kattojen yläpuolelta, ei 64°:n kartta-asennossa.</summary>
        [Testi] static void AlueViistostiKattojenYlapuolelta()
        {
            bool vanha = OpasSilmukka.PalloLento;
            try
            {
                OpasSilmukka.PalloLento = true;
                foreach (var (nimi, koko, katot) in new[] { ("Louvre", 700.0, 30.0), ("Concorden aukio", 360.0, 11.0), ("Champs-Élysées", 1900.0, 26.0), ("Gamla stan", 600.0, 18.0) })
                {
                    var k = new OpasKohde { Id = nimi, Nimi = nimi, Lat = 48.86, Lon = 2.33, KokoM = koko, KorkeusM = 0 };
                    var ilman = OpasKuvaus.Kehysta(k, 35, 0);
                    k.YmparysM = katot;
                    var p = OpasKuvaus.Kehysta(k, 35, 0);
                    Oleta.Tosi(OpasKuvaus.Luokittele(k) == OpasKuvaus.Luokka.Alue, $"{nimi}: alue");
                    Oleta.Tosi(Math.Abs(p.Kallistus - OpasKuvaus.AlueEsittelyKallistus) < 0.5 || Silma(p) <= katot + OpasKuvaus.KattoVaraM + 1,
                        $"{nimi}: kallistus {p.Kallistus:F0}° (ennen {ilman.Kallistus:F0}°), silmä {Silma(p):F0} m (ennen {Silma(ilman):F0})");
                    Oleta.Tosi(Silma(p) >= katot + OpasKuvaus.KattoVaraM - 1, $"{nimi}: silmä kattojen yläpuolella ({Silma(p):F0} m)");
                    double vaaka(Pysahdys x) => x.EtaisyysM * Math.Sin(x.Kallistus * Math.PI / 180);
                    Oleta.Tosi(Math.Abs(vaaka(p) - vaaka(ilman)) < 0.5, $"{nimi}: vaakaetäisyys pysyy");
                }
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }
    }
}
