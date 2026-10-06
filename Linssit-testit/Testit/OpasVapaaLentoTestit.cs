// Oppaan vapaa tila (omistaja 6.10.2026, juna 152): vasen tappi liikuttaa katsesuunnassa, oikea kääntää ja nostaa, kallistus
// korkeuden mukaan, maasto ei läpi.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class OpasVapaaLentoTestit
    {
        static double Tasainen(double lat, double lon) => 200;   // maa 200 m

        static OpasVapaaLento Alussa(double suunta = 0)
        {
            var l = new OpasVapaaLento();
            // Praha: katsepiste 50,087/14,421, 600 m:n päästä 60° kallistuksella.
            l.Aloita(new Kuvakulma(50.087, 14.421, 600, 60, suunta, 200), Tasainen);
            return l;
        }

        static void Aja(OpasVapaaLento l, double s, double vx, double vy, double ox, double oy)
        {
            for (double t = 0; t < s; t += 1 / 60.0) l.Paivita(1 / 60.0, vx, vy, ox, oy, Tasainen);
        }

        [Testi]
        static void AloitusKatsepisteestaTaaksepain()
        {
            var l = Alussa();
            Oleta.Tosi(Math.Abs(l.KorkeusM - 300) < 1, $"korkeus 600·cos60 = 300: {l.KorkeusM:0.0}");
            Oleta.Tosi(l.Lat < 50.087, $"kamera katsepisteen eteläpuolella (katse pohjoiseen): {l.Lat:0.0000}");
        }

        [Testi]
        static void EteenSuunnanMukaan()
        {
            var l = Alussa(90);   // katse itään
            double lon0 = l.Lon, lat0 = l.Lat;
            Aja(l, 3, 0, 1, 0, 0);
            Oleta.Tosi(l.Lon > lon0 + 0.003 && Math.Abs(l.Lat - lat0) < 1e-4, $"itään: {l.Lon - lon0:0.0000}, lat {l.Lat - lat0:0.00000}");
            double lat1 = l.Lat;
            Aja(l, 2, 1, 0, 0, 0);   // sivulle oikealle = etelään, kun katse itään
            Oleta.Tosi(l.Lat < lat1 - 0.001, $"oikealle = etelään: {l.Lat - lat1:0.0000}");
        }

        [Testi]
        static void KaantoJaNousu()
        {
            var l = Alussa(0);
            double lat0 = l.Lat, lon0 = l.Lon;
            Aja(l, 1, 0, 0, 1, 0);
            Oleta.Tosi(l.Suunta > 30 && l.Suunta < 60, $"kääntyy oikealle: {l.Suunta:0}°");
            Oleta.Tosi(Math.Abs(l.Lat - lat0) < 1e-6 && Math.Abs(l.Lon - lon0) < 1e-6, "kääntö paikallaan");
            double h0 = l.KorkeusM;
            Aja(l, 2, 0, 0, 0, 1);
            Oleta.Tosi(l.KorkeusM > h0 * 2, $"nousee: {h0:0} → {l.KorkeusM:0} m");
            Oleta.Tosi(l.Kallistus < OpasVapaaLento.KallistusKorkeudelle(h0), "ylempänä jyrkemmin alas");
        }

        [Testi]
        static void MaastoEiLapi()
        {
            var l = Alussa(0);
            Aja(l, 10, 0, 0, 0, -1);
            Oleta.Sama(OpasVapaaLento.MinKorkeusM, l.KorkeusM, "laskeutuu vain minimikorkeuteen");
            var k = l.Kuvakulma(Tasainen);
            Oleta.Tosi(k.KatseKorkeusM == 200 && k.EtaisyysM > OpasVapaaLento.MinKorkeusM, $"katse maassa: {k}");
        }
    }
}
