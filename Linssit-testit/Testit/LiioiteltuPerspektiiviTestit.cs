// Liioiteltu perspektiivi: keskellä 0°, reunalla KulmaMax, suunta keskeltä poispäin, monotoninen, häipyy kameran kallistuksessa.
using System;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Testit
{
    public static class LiioiteltuPerspektiiviTestit
    {
        const double W = 1206, H = 2622;

        [Testi] static void KeskellaNollaReunallaMax()
        {
            var k = LiioiteltuPerspektiivi.Kallistus(W / 2, H / 2, W, H, 0);
            Oleta.Tosi(k.kulma == 0 && k.dx == 0 && k.dy == 0, "keskellä 0°");
            var ylä = LiioiteltuPerspektiivi.Kallistus(W / 2, H, W, H, 0);
            double puolivali = LiioiteltuPerspektiivi.Kallistus(W / 2, H * 0.75, W, H, 0).kulma;
            Oleta.Tosi(Math.Abs(puolivali - LiioiteltuPerspektiivi.KulmaMax * 0.5) < 1e-9, "puolivälissä puolet: " + puolivali);
            Oleta.Tosi(Math.Abs(ylä.kulma - LiioiteltuPerspektiivi.KulmaMax) < 1e-9, "yläreunalla max: " + ylä.kulma);
            Oleta.Tosi(Math.Abs(ylä.dy - 1) < 1e-9 && Math.Abs(ylä.dx) < 1e-9, "suunta ylös (poispäin keskeltä)");
            var vasen = LiioiteltuPerspektiivi.Kallistus(0, H / 2, W, H, 0);
            Oleta.Tosi(Math.Abs(vasen.kulma - LiioiteltuPerspektiivi.KulmaMax) < 1e-9 && vasen.dx < -0.999, "vasen reuna: " + vasen.kulma);
        }

        [Testi] static void MonotoninenJaPehmeaKeskella()
        {
            double edellinen = -1;
            for (double y = H / 2; y <= H; y += 20)
            {
                double k = LiioiteltuPerspektiivi.Kallistus(W / 2, y, W, H, 0).kulma;
                Oleta.Tosi(k >= edellinen - 1e-12, "monotoninen " + y);
                edellinen = k;
            }
            // Keskialue lähes pystysuora: 10 %:n päässä keskeltä alle 1°.
            Oleta.Tosi(LiioiteltuPerspektiivi.Kallistus(W / 2 + W * 0.05, H / 2, W, H, 0).kulma < 1, "keskialue");
        }

        [Testi] static void HaipyyKameranKallistuksessa()
        {
            double k0 = LiioiteltuPerspektiivi.Kallistus(W / 2, H * 0.8, W, H, 0).kulma;
            double k20 = LiioiteltuPerspektiivi.Kallistus(W / 2, H * 0.8, W, H, 20).kulma;
            double k40 = LiioiteltuPerspektiivi.Kallistus(W / 2, H * 0.8, W, H, 40).kulma;
            Oleta.Tosi(k0 > k20 && k20 > 0 && k40 == 0, $"{k0:F1} > {k20:F1} > {k40:F1}");
        }
    }
}
