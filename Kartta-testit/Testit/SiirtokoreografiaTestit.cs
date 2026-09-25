// SIIRRON KOREOGRAFIA (pariteettiraportti A20, A21, B12–B16): webin js/siirtokoreografia.js ja js/ui.js luvut
// lukuina. Odotusarvot on laskettu webin kaavoista käsin (tests/siirtoajoitus.test.mjs:n esimerkit: 1 askel 0,9 s,
// 3 askelta 3,0 s, 5 askelta 5,1 s, 6 askelta 708 ms/askel ja 5,2 s; bussi 3 askelta 1548 ms).
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class SiirtokoreografiaTestit
    {
        static void Lahella(double odotettu, double saatu, double tol, string viesti = "") =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) <= tol, $"odotettu {odotettu}, saatu {saatu} {viesti}");

        [Testi]
        static void JalkamatkanAskelPorrastuu()
        {
            for (int n = 1; n <= 5; n++) Oleta.Sama(860.0, Siirtokoreografia.JalkamatkanAskel(n), "n=" + n);
            // 6: (5200 − 5 × 190) / 6 = 708,33 → 708.
            Oleta.Sama(708.0, Siirtokoreografia.JalkamatkanAskel(6));
            // Pitkä heitto ei mene alle 640 ms.
            Oleta.Sama(640.0, Siirtokoreografia.JalkamatkanAskel(12));
            Oleta.Sama(860.0, Siirtokoreografia.JalkamatkanAskel(0), "0 → 1 askel");
        }

        [Testi]
        static void NappulanKestoKulkutavanMukaan()
        {
            var L = Siirtokoreografia.Tapa.Liftaus;
            Oleta.Sama(860.0, Siirtokoreografia.NappulanKestoMs(L, 1));
            Oleta.Sama(2960.0, Siirtokoreografia.NappulanKestoMs(L, 3));
            Oleta.Sama(5060.0, Siirtokoreografia.NappulanKestoMs(L, 5));
            Oleta.Sama(6 * 708.0 + 5 * 190.0, Siirtokoreografia.NappulanKestoMs(L, 6));
            // Bussi: n × round(askel × 0,6), ei taukoja (516 ms/askel).
            Oleta.Sama(516.0, Siirtokoreografia.AutokyydinAskel(3, bussi: true));
            Oleta.Sama(1548.0, Siirtokoreografia.NappulanKestoMs(Siirtokoreografia.Tapa.Bussi, 3));
            Oleta.Sama(6 * 425.0, Siirtokoreografia.NappulanKestoMs(Siirtokoreografia.Tapa.Bussi, 6), "round(708 × 0,6) = 425");
            // Laiva: 190 ms hyppy + 190 ms tauko.
            Oleta.Sama(4 * 190.0 + 3 * 190.0, Siirtokoreografia.NappulanKestoMs(Siirtokoreografia.Tapa.Laiva, 4));
        }

        [Testi]
        static void SaattoajonKestoRajoissa()
        {
            Oleta.Sama(1440.0, Siirtokoreografia.SiirtoajonKesto(860), "300 + 860 + 280");
            Oleta.Sama(3540.0, Siirtokoreografia.SiirtoajonKesto(2960));
            Oleta.Sama(1200.0, Siirtokoreografia.SiirtoajonKesto(190), "alaraja");
            Oleta.Sama(6200.0, Siirtokoreografia.SiirtoajonKesto(9000), "yläraja");
        }

        [Testi]
        static void SovitaAjonKesto()
        {
            Oleta.Sama(760.0, Siirtokoreografia.SovitaAjonKesto(760, 0, 0));
            // Yksi oktaavi zoomia: × 1,5.
            Oleta.Sama(1140.0, Siirtokoreografia.SovitaAjonKesto(760, Math.Log(2), 0));
            // Oktaavi + ruudullinen panorointia: × 2 = 1520.
            Oleta.Sama(1520.0, Siirtokoreografia.SovitaAjonKesto(760, Math.Log(0.5), 1));
            // Katto 1800 ms.
            Oleta.Sama(1800.0, Siirtokoreografia.SovitaAjonKesto(760, Math.Log(16), 3));
            // Pyydettyä pidempi pysyy.
            Oleta.Sama(2000.0, Siirtokoreografia.SovitaAjonKesto(2000, 0, 0));
        }

        [Testi]
        static void PehmennysOnTrapetsi()
        {
            Lahella(0, Siirtokoreografia.SiirtoajonPehmennys(0), 1e-12);
            Lahella(1, Siirtokoreografia.SiirtoajonPehmennys(1), 1e-12);
            Lahella(0.5, Siirtokoreografia.SiirtoajonPehmennys(0.5), 1e-12);
            // Saumat: v·r/2 ja 1 − v·r/2 (v = 1/0,7).
            double v = 1 / 0.7;
            Lahella(v * 0.3 / 2, Siirtokoreografia.SiirtoajonPehmennys(0.3), 1e-12);
            Lahella(1 - v * 0.3 / 2, Siirtokoreografia.SiirtoajonPehmennys(0.7), 1e-12);
            // Keskiosan nopeus vakio 1/(1 − r).
            double d = (Siirtokoreografia.SiirtoajonPehmennys(0.6) - Siirtokoreografia.SiirtoajonPehmennys(0.4)) / 0.2;
            Lahella(v, d, 1e-9);
            // Sama kuin PalloKierto.Pehmennys (kaava kopioitu): nopeus nolla päissä.
            double alku = Siirtokoreografia.SiirtoajonPehmennys(1e-4) / 1e-4;
            Oleta.Tosi(alku < 1e-3, "lähtönopeus " + alku);
        }

        [Testi]
        static void HypynVaiheJaHuippu()
        {
            var (e0, n0) = Siirtokoreografia.HypynVaihe(0);
            var (e1, n1) = Siirtokoreografia.HypynVaihe(1);
            var (eh, nh) = Siirtokoreografia.HypynVaihe(0.5);
            Lahella(0, e0, 1e-12); Lahella(0, n0, 1e-12);
            Lahella(1, e1, 1e-12); Lahella(0, n1, 1e-12);
            Lahella(0.5, eh, 1e-12); Lahella(1, nh, 1e-12);
            Lahella(2 * 0.25 * 0.25, Siirtokoreografia.HypynVaihe(0.25).e, 1e-12, "ease-in 2x²");
            Oleta.Sama(9.0, Siirtokoreografia.HypynHuippu(10), "alaraja");
            Lahella(0.34 * 50, Siirtokoreografia.HypynHuippu(50), 1e-12);
            Oleta.Sama(30.0, Siirtokoreografia.HypynHuippu(200), "yläraja");
        }

        [Testi]
        static void MatkanVaiheOsuuPisteisiin()
        {
            for (int n = 1; n <= 6; n++)
            {
                Lahella(0, Siirtokoreografia.MatkanVaihe(0, n), 1e-12);
                Lahella(1, Siirtokoreografia.MatkanVaihe(1, n), 1e-12);
                double edellinen = 0;
                for (int i = 1; i <= 200; i++)
                {
                    double p = Siirtokoreografia.MatkanVaihe(i / 200.0, n);
                    Oleta.Tosi(p >= edellinen - 1e-12, $"ei peruuta n={n} i={i}");
                    edellinen = p;
                }
            }
            // Autokyyti on neliöllinen ease-in-out (siirtokoreografia.js:489).
            Lahella(0.5, Siirtokoreografia.AutokyydinVaihe(0.5), 1e-12);
            Lahella(0.08, Siirtokoreografia.AutokyydinVaihe(0.2), 1e-12);
        }

        [Testi]
        static void LautaMillerEdestakaisin()
        {
            foreach (var lat in new[] { -60.0, -10.0, 0.0, 43.3, 48.85, 70.0 })
                Lahella(lat, Siirtokoreografia.LatLaudalta(Siirtokoreografia.LautaY(lat)), 1e-9, "lat " + lat);
            // Pituusaste: 1° = 12000 / 360 yksikköä, myös päivämäärärajan yli.
            Lahella(12000.0 / 360.0, Siirtokoreografia.LautaMatka((0, 179.5), (0, -179.5)), 1e-6);
            var s = Siirtokoreografia.SiirraLaudalla((0, 179.9), 12000.0 / 360.0 * 0.2, 0);
            Lahella(-179.9, s.lon, 1e-9, "kiedottu");
        }

        [Testi]
        static void KorkeusJaLeveysKaanteisia()
        {
            const double R = 6378137.0, fov = 50, aspect = 0.75;
            foreach (var yks in new[] { 40.0, 60.0, 120.0, 400.0 })
            {
                double h = Siirtokoreografia.KorkeusLeveydesta(yks, fov, aspect, R);
                Lahella(yks, Siirtokoreografia.LeveysKorkeudesta(h, fov, aspect, R), 1e-9);
            }
            // Sama kuin PalloKierto.MinKorkeus: 60 yks = 1,8° ruudun leveydellä.
            double h60 = Siirtokoreografia.KorkeusLeveydesta(60, fov, aspect, R);
            Lahella(1.8 * Math.PI / 180 * R / (2 * Math.Tan(25 * Math.PI / 180) * aspect), h60, 1e-6);
        }

        /// <summary>Kolmen askeleen liftaus länteen päiväntasaajalla: askeleet 100 yks (3°).</summary>
        static List<(double lat, double lon)> Reitti(int askelia, double askelAst = 3.0) {
            var p = new List<(double, double)>();
            for (int i = 0; i <= askelia; i++) p.Add((0.0, 10.0 - i * askelAst));
            return p;
        }

        [Testi]
        static void EnnakkozoomiAskelmittakaava()
        {
            // iPhone pysty 402 × 874 pt: askel 100 yks → leveys = 402 × 100 / (0,25 × 402) = 400 yks.
            var e = Siirtokoreografia.Ennakkozoomi(Reitti(3), Siirtokoreografia.Tapa.Liftaus, 0, 10, 1000, 402, 874, 40);
            Oleta.Tosi(e.Askelmittakaava);
            Lahella(400, e.Leveys, 1e-6);
            // Keskipiste lähdön ja 2. askeleen puolivälissä: lon 10 − 3 = 7.
            Lahella(7, e.Lon, 1e-9);
            Lahella(0, e.Lat, 1e-9);
            // Kesto: zoomi 1000 → 400 = 1,32 oktaavia, panorointi 3° / 30° = 0,1 ruutua → 760 × 1,71 ≈ 1300.
            double odotettu = Math.Floor(760 * (1 + 0.5 * Math.Log(1000.0 / 400) / Math.Log(2) + 0.5 * 0.1) + 0.5);
            Oleta.Sama(odotettu, e.KestoMs);
            // Nykyinen näkymä lähempänä: se säilyy (min(nyt, askel)).
            var lahi = Siirtokoreografia.Ennakkozoomi(Reitti(3), Siirtokoreografia.Tapa.Bussi, 0, 10, 300, 402, 874, 40);
            Lahella(300, lahi.Leveys, 1e-9);
            // Syvin sallittu: pieni askel ei vie alle 60 yks (iPad).
            var pieni = Siirtokoreografia.Ennakkozoomi(Reitti(2, 0.2), Siirtokoreografia.Tapa.Liftaus, 0, 10, 1000, 834, 1112, 60);
            Lahella(60, pieni.Leveys, 1e-9);
            // Yhden askeleen matkalla suunta on määränpää.
            var yksi = Siirtokoreografia.Ennakkozoomi(Reitti(1), Siirtokoreografia.Tapa.Liftaus, 0, 10, 1000, 402, 874, 40);
            Lahella(8.5, yksi.Lon, 1e-9);
            // Kesto enintään 1800 ms.
            var kaukaa = Siirtokoreografia.Ennakkozoomi(Reitti(3), Siirtokoreografia.Tapa.Liftaus, 40, 60, 12000, 402, 874, 40);
            Oleta.Sama(1800.0, kaukaa.KestoMs);
        }

        [Testi]
        static void EnnakkozoomiLaivaRajaaKokoMatkan()
        {
            // 4 askelta × 3° = 12° = 400 yks vaakaan; korkeus alle 120 → 120. Vara 2: max(800, 240 × 402/874) = 800.
            var e = Siirtokoreografia.Ennakkozoomi(Reitti(4), Siirtokoreografia.Tapa.Laiva, 0, 10, 1000, 402, 874, 40);
            Oleta.Tosi(!e.Askelmittakaava);
            Lahella(800, e.Leveys, 1e-6);
            Lahella(4, e.Lon, 1e-9, "laatikon keskellä");
            // Pystyreitti vaakaruudulla: korkeus ratkaisee.
            var pysty = new List<(double lat, double lon)> { (0, 0), (10, 0) };
            var p = Siirtokoreografia.Ennakkozoomi(pysty, Siirtokoreografia.Tapa.Laiva, 0, 0, 1000, 1112, 834, 60);
            double h = Siirtokoreografia.LautaY(0) - Siirtokoreografia.LautaY(10);
            Lahella(h * 2 * 1112.0 / 834.0, p.Leveys, 1e-6);
        }

        [Testi]
        static void SaattoSiirtyyNappulanVerran()
        {
            var reitti = Reitti(3);
            var e = Siirtokoreografia.Ennakkozoomi(reitti, Siirtokoreografia.Tapa.Liftaus, 0, 10, 1000, 402, 874, 40);
            // Kamera on ennakon kohteessa (lon 7): saatto siirtyy nappulan matkan 9° länteen → lon −2.
            var s = Siirtokoreografia.Saattoajo(reitti[0], reitti[3], e, e.Lat, e.Lon, e.Leveys, 402);
            Oleta.Tosi(s.Ajetaan);
            Lahella(-2, s.Lon, 1e-9);
            Lahella(400, s.Leveys, 1e-9);
            // Matka ruudulla: 300 yks × 402 / 400 = 301,5 pt; kynnys max(24, 24,12) = 24,12.
            Lahella(301.5, s.MatkaPt, 1e-6);
            Lahella(24.12, s.KynnysPt, 1e-9);
            // Hyvin lyhyt matka jää ajamatta.
            var lyhyt = new List<(double lat, double lon)> { (0, 10), (0, 9.99) };
            var el = Siirtokoreografia.Ennakkozoomi(lyhyt, Siirtokoreografia.Tapa.Liftaus, 0, 10, 1000, 402, 874, 40);
            var sl = Siirtokoreografia.Saattoajo(lyhyt[0], lyhyt[1], el, el.Lat, el.Lon, 1000, 402);
            Oleta.Tosi(!sl.Ajetaan, "matka " + sl.MatkaPt);
            // Laiva: kohde on määränpää, korkeus pysyy (NaN).
            var laiva = Siirtokoreografia.Ennakkozoomi(Reitti(4), Siirtokoreografia.Tapa.Laiva, 0, 10, 1000, 402, 874, 40);
            var sv = Siirtokoreografia.Saattoajo(Reitti(4)[0], Reitti(4)[4], laiva, laiva.Lat, laiva.Lon, laiva.Leveys, 402);
            Lahella(-2, sv.Lon, 1e-9);
            Oleta.Tosi(double.IsNaN(sv.Leveys));
        }

        [Testi]
        static void AikatauluKameraEdellaNappulaPerassa()
        {
            var a = Siirtokoreografia.Laske(Siirtokoreografia.Tapa.Liftaus, 3, 1000);
            Oleta.Sama(1120.0, a.SaattoAlkaaMs);
            Oleta.Sama(1420.0, a.NappulaLahteeMs);
            Oleta.Sama(3540.0, a.SaattoMs);
            // Nappula perillä 280 ms ennen kameraa; valmis kameran lopussa.
            Oleta.Sama(1420.0 + 2960.0, a.NappulaPerillaMs);
            Oleta.Sama(1120.0 + 3540.0, a.KokonaisMs);
            // Ilman kameraa: ei ennakkoa, hengähdystä eikä viivettä.
            var ilman = Siirtokoreografia.Laske(Siirtokoreografia.Tapa.Liftaus, 3, 1000, kamera: false);
            Oleta.Sama(2960.0, ilman.KokonaisMs);
            // Skaalaus säilyttää suhteet.
            var k = a.Skaalattu(0.5);
            Lahella(a.KokonaisMs * 0.5, k.KokonaisMs, 1e-9);
        }

        [Testi]
        static void NappulanVaiheHyppyketjussa()
        {
            var a = Siirtokoreografia.Laske(Siirtokoreografia.Tapa.Liftaus, 3, 0);
            var h0 = Siirtokoreografia.NappulanVaihe(a, 3, 430);  // 1. hypyn puoliväli
            Oleta.Sama(0, h0.i); Lahella(0.5, h0.e, 1e-12); Lahella(1, h0.nousu, 1e-12);
            var tauko = Siirtokoreografia.NappulanVaihe(a, 3, 900); // tauko 860–1050
            Oleta.Sama(0, tauko.i); Lahella(1, tauko.e, 1e-12); Lahella(0, tauko.nousu, 1e-12);
            var h1 = Siirtokoreografia.NappulanVaihe(a, 3, 1050 + 430);
            Oleta.Sama(1, h1.i); Lahella(0.5, h1.e, 1e-12);
            var loppu = Siirtokoreografia.NappulanVaihe(a, 3, 5000);
            Oleta.Sama(2, loppu.i); Lahella(1, loppu.e, 1e-12);
            Oleta.Sama(2960.0, Siirtokoreografia.HyppyketjunMs(a, 3));
            // Bussi: ei nousua, pisteet osuvat kohdalleen.
            var b = Siirtokoreografia.Laske(Siirtokoreografia.Tapa.Bussi, 3, 0);
            var bk = Siirtokoreografia.NappulanVaihe(b, 3, b.NappulaMs / 2);
            Oleta.Sama(1, bk.i); Lahella(0.5, bk.e, 1e-9); Lahella(0, bk.nousu, 1e-12);
        }
    }
}
