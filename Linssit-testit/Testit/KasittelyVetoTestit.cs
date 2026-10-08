// Käsittely käsin (pelattavuusmalli kohta 6): esineestä alkava veto asteiksi ja kulmanopeudeksi; alle 30°/s hiljainen.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KasittelyVetoTestit
    {
        const double Dt = 1.0 / 60;

        /// <summary>Tasainen veto nopeudella asteS (°/s) sekunnit ajan, 60 kehystä sekunnissa.</summary>
        static KasittelyVeto Veda(double asteS, double s)
        {
            var v = new KasittelyVeto();
            v.Aloita();
            double ptKehys = asteS / KasittelyVeto.AsteitaPerPt * Dt;
            for (int i = 0; i < (int)Math.Round(s / Dt); i++) v.Liiku(ptKehys, 0, Dt);
            return v;
        }

        [Testi] static void PisteetAsteiksiSormenSuuntaan()
        {
            var v = new KasittelyVeto();
            v.Aloita();
            v.Liiku(100, -50, 0.5);
            Oleta.Tosi(Math.Abs(v.AsteetX - 30) < 1e-9 && Math.Abs(v.AsteetY + 15) < 1e-9, $"{v.AsteetX} {v.AsteetY}");
            var (x, y) = v.Ota();
            Oleta.Tosi(Math.Abs(x - 30) < 1e-9 && Math.Abs(y + 15) < 1e-9, "Ota palauttaa kertymän");
            var (x2, y2) = v.Ota();
            Oleta.Tosi(x2 == 0 && y2 == 0, "toinen Ota on nolla");
        }

        [Testi] static void HidasVetoOnHiljainen()
        {
            var v = Veda(20, 1.0);
            Oleta.Tosi(v.Hiljainen, $"20°/s: nopeus {v.NopeusAsteS:F1}");
            Oleta.Tosi(Math.Abs(v.NopeusAsteS - 20) < 0.5, $"tasoitettu nopeus lähellä 20: {v.NopeusAsteS:F2}");
            Oleta.Sama(0, v.Narahdukset, "ei narahdusta");
        }

        [Testi] static void NopeaVetoNarahtaaKerran()
        {
            var v = Veda(60, 1.0);
            Oleta.Tosi(!v.Hiljainen, $"60°/s: nopeus {v.NopeusAsteS:F1}");
            Oleta.Sama(1, v.Narahdukset, "yksi ylitys");
            Oleta.Tosi(Math.Abs(v.AsteetX - 60) < 0.5, $"kertymä 60°: {v.AsteetX:F2}");
        }

        [Testi] static void YksittainenNykaysEiNarahda()
        {
            // 3 pt yhdessä kehyksessä (≈ 54°/s hetkellisesti), sitten paikallaan: tasoitus pitää alle rajan.
            var v = new KasittelyVeto();
            v.Aloita();
            v.Liiku(3, 0, Dt);
            for (int i = 0; i < 30; i++) v.Paikallaan(Dt);
            Oleta.Sama(0, v.Narahdukset, $"huippu {v.HuippuAsteS:F1}");
            Oleta.Tosi(v.NopeusAsteS < 1, $"pysähtyy: {v.NopeusAsteS:F2}");
        }

        [Testi] static void SamanKehyksenLiikeLasketaanSeuraavaanDt()
        {
            var v = new KasittelyVeto();
            v.Aloita();
            v.Liiku(10, 0, 0);
            Oleta.Sama(0.0, v.NopeusAsteS, "dt 0: ei nopeutta vielä");
            v.Liiku(10, 0, 0.1);
            // 20 pt = 6° 0,1 s:ssa = 60°/s, tasoitus 1 − e^−1.
            double odotettu = 60 * (1 - Math.Exp(-1));
            Oleta.Tosi(Math.Abs(v.NopeusAsteS - odotettu) < 1e-9, $"{v.NopeusAsteS:F3} vs {odotettu:F3}");
        }

        [Testi] static void LopetusNollaaNopeudenJaEstaaLiikkeen()
        {
            var v = Veda(60, 0.5);
            double kertyma = v.AsteetX;
            v.Lopeta();
            Oleta.Tosi(!v.Kaynnissa && v.NopeusAsteS == 0, "lopetettu");
            v.Liiku(100, 0, Dt);
            Oleta.Tosi(v.AsteetX == kertyma, "lopetuksen jälkeen ei kerry");
            v.Aloita();
            Oleta.Tosi(v.AsteetX == 0 && v.HuippuAsteS == 0 && v.Ota().X == 0, "uusi veto alkaa nollasta");
        }
    }
}
