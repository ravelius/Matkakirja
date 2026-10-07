// Kaupunkikuvan vuorokaudenaika (juna 150): paikallinen aurinkoaika, auringon korkeus, avainkuvat ja liu'ut.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiValoTestit
    {
        [Testi] static void PaikallinenAurinkoaika()
        {
            var utc = new DateTime(2026, 10, 6, 12, 0, 0, DateTimeKind.Utc);
            Oleta.Tosi(Math.Abs(KaupunkiValo.PaikallinenTunti(utc, 0) - 12) < 1e-9, "Greenwich");
            Oleta.Tosi(Math.Abs(KaupunkiValo.PaikallinenTunti(utc, 23.73) - 13.582) < 0.01, "Ateena +1,58 h");
            Oleta.Tosi(Math.Abs(KaupunkiValo.PaikallinenTunti(utc, -180) - 0) < 1e-9, "päivämääräraja kiertyy");
        }

        [Testi] static void AuringonKorkeusAteenassa()
        {
            // 6.10. Ateena (37,97 N, 23,73 E): aurinkokeskipäivä ~10.15 UTC (korkeus ~46°); 01.00 UTC yö; 15.30 UTC ilta-aurinko matalalla.
            var (k12, aamu12, az12) = KaupunkiValo.Aurinko(new DateTime(2026, 10, 6, 9, 30, 0, DateTimeKind.Utc), 37.97, 23.73);
            Oleta.Tosi(k12 > 38 && k12 < 50 && aamu12, $"aamupäivä {k12:F1}°, aamupäivä");
            Oleta.Tosi(az12 > 120 && az12 < 180, $"aamupäivällä kaakossa {az12:F0}°");
            var (k3, _, _) = KaupunkiValo.Aurinko(new DateTime(2026, 10, 6, 1, 0, 0, DateTimeKind.Utc), 37.97, 23.73);
            Oleta.Tosi(k3 < -30, $"yö {k3:F1}°");
            var (k16, aamu16, az16) = KaupunkiValo.Aurinko(new DateTime(2026, 10, 6, 15, 30, 0, DateTimeKind.Utc), 37.97, 23.73);
            Oleta.Tosi(k16 > -2 && k16 < 10 && !aamu16, $"ilta {k16:F1}°");
            Oleta.Tosi(az16 > 240 && az16 < 280, $"illalla lännessä {az16:F0}°");
            Oleta.Tosi(Math.Abs(KaupunkiValo.AtsimuuttiTunnista(6) - 90) < 1e-9 && Math.Abs(KaupunkiValo.AtsimuuttiTunnista(18) - 270) < 1e-9, "kellosta");
        }

        [Testi] static void SavyKorkeudesta()
        {
            Oleta.Tosi(KaupunkiValo.Korkeudelle(-20, true).Valotus == KaupunkiValo.Yo.Valotus, "yö");
            Oleta.Tosi(KaupunkiValo.Korkeudelle(2, true).Lampotila == KaupunkiValo.Aamu.Lampotila && KaupunkiValo.Aamu.Lampotila >= 25, "aamuhämärä kultainen");
            Oleta.Tosi(KaupunkiValo.Korkeudelle(2, false).Lampotila == KaupunkiValo.Ilta.Lampotila, "iltahämärä");
            Oleta.Tosi(KaupunkiValo.Korkeudelle(45, false).Valotus == 0, "päivä neutraali");
            var v = KaupunkiValo.Korkeudelle(13, false);
            Oleta.Tosi(v.Lampotila > 0 && v.Lampotila < KaupunkiValo.Ilta.Lampotila, "liuku illasta päivään");
        }

        [Testi] static void KellonAvainkuvat()
        {
            Oleta.Tosi(KaupunkiValo.Tunnille(12).Lampotila == 0 && KaupunkiValo.Tunnille(2).Valotus < -1.5 && KaupunkiValo.Tunnille(2).Lampotila < 0, "päivä ja yö (kuunsininen, valot erikseen)");
            Oleta.Tosi(Math.Abs(KaupunkiValo.Tunnille(24).Valotus - KaupunkiValo.Tunnille(0).Valotus) < 1e-9, "keskiyö jatkuva");
            var h = KaupunkiValo.Taivas(KaupunkiValo.Paiva, 0); var z = KaupunkiValo.Taivas(KaupunkiValo.Paiva, 1);
            Oleta.Tosi(h[2] == KaupunkiValo.Paiva.Horisontti[2] && z[2] == KaupunkiValo.Paiva.TaivasYla[2], "taivaan päät");
        }
    }
}
