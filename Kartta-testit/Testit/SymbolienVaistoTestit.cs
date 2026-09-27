// 3D-symbolit isommiksi, aikaisemmin ja väistäen (omistajan toive 27.9.2026 klo 23.2x, Linssisepän speksi
// docs/raportit/symbolit-ja-lippu-speksi-20260928.md; Kartta/SymbolienVaisto.cs ja Linssit/Ydin/Kamera/LiioiteltuPerspektiivi.cs):
// kynnys, koko zoomtasojen mukaan, laatikot, väistö hystereeseineen ja viiveineen sekä perspektiivin ramppi.
using System;
using Matkakirja;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Kartta.Testit
{
    static class SymbolienVaistoTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-3) => Math.Abs(a - b) <= tol;

        [Testi]
        static void KynnysYksiZoomtasoAiemmin()
        {
            Oleta.Tosi(Lahella(SymbolienVaisto.KynnysKerroin * 2, SymbolienVaisto.VanhaKynnysKerroin), "1,25 = 2,5 / 2");
            Oleta.Tosi(Lahella(SymbolienVaisto.Kynnys(1.25, double.PositiveInfinity), 1.25), "iso maa");
            Oleta.Tosi(Lahella(SymbolienVaisto.Kynnys(1.25, 1.3), 1.17), "pieni maa: 0,9 × suurin");
            Oleta.Tosi(Lahella(SymbolienVaisto.Kynnys(1.25, 0), 1.25), "tuntematon suurin");
        }

        [Testi]
        static void KokoKasvaaZoomtasoittain()
        {
            float Koko(double k) => SymbolienVaisto.Koko(k, 1.25, 6.0, 30f, 54f);
            Oleta.Tosi(Lahella(Koko(1.25), 30) && Lahella(Koko(1.0), 30), "kynnyksellä ja sen alla 30 pt");
            Oleta.Tosi(Lahella(Koko(6.0), 54) && Lahella(Koko(20.0), 54), "täysi 54 pt");
            Oleta.Tosi(Lahella(Koko(2.5), 30 + 24 * Math.Log(2) / Math.Log(4.8), 1e-2), $"2,5 → {Koko(2.5):0.00}");
            Oleta.Tosi(Lahella(Koko(2.5) - Koko(1.25), Koko(5.0) - Koko(2.5), 1e-2), "sama kasvu joka zoomtasolla");
            Oleta.Tosi(Koko(2.5) > 40f, "2,5:ssä jo isompi kuin 1.0.33:n täysi 40 pt");
            // 1.0.33 (vanha 1): lineaarinen kertoimen mukaan 2,5 → 6.
            Oleta.Tosi(Lahella(SymbolienVaisto.Koko(4.25, 2.5, 6.0, 22f, 40f, false), 31), "vanha lineaarinen");
            Oleta.Tosi(Lahella(SymbolienVaisto.Koko(3.0, 3.0, 3.0, 22f, 40f), 40), "sama kynnys ja täysi: täysi");
        }

        [Testi]
        static void LaatikkoJaYdin()
        {
            var l = SymbolienVaisto.Laatikko(100f, 100f, 50f, 0.8f);
            Oleta.Tosi(Lahella(l.X0, 75) && Lahella(l.X1, 125) && Lahella(l.Y0, 85) && Lahella(l.Y1, 140), l.ToString());
            var matala = SymbolienVaisto.Laatikko(100f, 100f, 50f, 0.2f);
            Oleta.Tosi(Lahella(matala.Y1, 125), "matala malli: vähintään puolet leveydestä ylös");
            var y = SymbolienVaisto.Ydin(l, false);
            Oleta.Tosi(Lahella(y.X0, 82.5) && Lahella(y.X1, 117.5) && Lahella(y.Y0, 93.25) && Lahella(y.Y1, 131.75), y.ToString());
            var yj = SymbolienVaisto.Ydin(l, true);
            Oleta.Tosi(yj.X0 < y.X0 && yj.X1 > y.X1 && yj.Y1 > y.Y1, "jo väistynyt: 10 % suurempi ydin");
        }

        [Testi]
        static void NimiVaistattaaPaitsiOmaPaikka()
        {
            var l = SymbolienVaisto.Laatikko(100f, 100f, 54f, 0.8f);
            var ydin = SymbolienVaisto.Ydin(l, false);
            float vara = 8f;   // pt × Pistekerroin 1
            // Kaupungin oma piste ja nimi alkavat jalan vierestä: ei väistöä (Visbyn nosto Visbyn pisteessä).
            var omaNimi = new Ruutulaatikko(105f, 96f, 160f, 108f);
            Oleta.Tosi(SymbolienVaisto.OmaPaikka(omaNimi, 100f, 100f, vara), "nimi 5 px jalasta = oma");
            Oleta.Tosi(!SymbolienVaisto.OsuuNimeen(ydin, omaNimi, 100f, 100f, vara), "oma nimi ei väistätä");
            // Toisen kaupungin nimi symbolin rungon päällä: väistö.
            var toinen = new Ruutulaatikko(90f, 115f, 150f, 127f);
            Oleta.Tosi(SymbolienVaisto.OsuuNimeen(ydin, toinen, 100f, 100f, vara), "vieras nimi rungolla");
            // Reunan kosketus ei väistätä (ydin 0,7).
            var reuna = new Ruutulaatikko(124f, 130f, 180f, 142f);
            Oleta.Tosi(!SymbolienVaisto.OsuuNimeen(ydin, reuna, 100f, 100f, vara), "kulman kosketus");
        }

        [Testi]
        static void SymbolitPaallekkain()
        {
            var a = SymbolienVaisto.Laatikko(100f, 100f, 50f, 0.8f);
            Oleta.Tosi(Lahella(SymbolienVaisto.Paallekkaisyys(a, a), 1), "sama");
            var puoli = SymbolienVaisto.Laatikko(125f, 100f, 50f, 0.8f);
            Oleta.Tosi(Lahella(SymbolienVaisto.Paallekkaisyys(a, puoli), 0.5), "puoliksi");
            var erillaan = SymbolienVaisto.Laatikko(200f, 100f, 50f, 0.8f);
            Oleta.Tosi(SymbolienVaisto.Paallekkaisyys(a, erillaan) == 0f, "erillään");
            // Hystereesi: 24 % ei väistätä uutta, mutta väistynyt pysyy (raja 22,5 %).
            var b = SymbolienVaisto.Laatikko(138f, 100f, 50f, 0.8f);   // 12/50 = 24 %
            Oleta.Tosi(!SymbolienVaisto.VaistaaSymbolia(b, a, false), "24 %: uusi ei väisty");
            Oleta.Tosi(SymbolienVaisto.VaistaaSymbolia(b, a, true), "24 %: väistynyt pysyy");
            var c = SymbolienVaisto.Laatikko(137f, 100f, 50f, 0.8f);   // 26 %
            Oleta.Tosi(SymbolienVaisto.VaistaaSymbolia(c, a, false), "26 %: väistyy");
        }

        [Testi]
        static void TarkeysJaViive()
        {
            Oleta.Tosi(SymbolienVaisto.Vertaa(true, "kohde:b", false, "kohde:a") < 0, "löydetty ensin");
            Oleta.Tosi(SymbolienVaisto.Vertaa(false, "kohde:a", false, "kohde:b") < 0, "sitten tunniste");
            Oleta.Tosi(SymbolienVaisto.SaaVaihtaa(10f, -1f), "ensimmäinen arvio heti");
            Oleta.Tosi(!SymbolienVaisto.SaaVaihtaa(10.3f, 10f), "0,3 s: ei vielä");
            Oleta.Tosi(SymbolienVaisto.SaaVaihtaa(10.6f, 10f), "0,6 s: saa vaihtaa");
            // Välkyntä: tavoite vaihtelee joka kehys 1 s ajan (30 fps), tila vaihtuu enintään kahdesti.
            bool tila = false; float muutos = -1f; int vaihtoja = 0;
            for (int i = 0; i < 30; i++)
            {
                bool tavoite = i % 2 == 0;
                float t = 5f + i / 30f;
                if (tavoite != tila && SymbolienVaisto.SaaVaihtaa(t, muutos)) { tila = tavoite; muutos = t; vaihtoja++; }
                else if (muutos < 0f) muutos = t;
            }
            Oleta.Tosi(vaihtoja <= 2, $"vaihtoja {vaihtoja}");
        }

        [Testi]
        static void PerspektiivinRamppi()
        {
            const double w = 390, h = 844;
            // Puolivälissä keskeltä oikeaan reunaan (elliptinen etäisyys 0,5).
            var (uusi, dx, _) = LiioiteltuPerspektiivi.Kallistus(w * 0.75, h * 0.5, w, h, 0, 0.5);
            var (vanha, _, _) = LiioiteltuPerspektiivi.Kallistus(w * 0.75, h * 0.5, w, h, 0);
            Oleta.Tosi(Lahella(uusi, 55), $"ramppi 0,5: täysi 55° puolivälissä ({uusi:0.0})");
            Oleta.Tosi(Lahella(vanha, 27.5), $"oletus 1,0: 27,5° ({vanha:0.0})");
            Oleta.Tosi(Lahella(dx, 1), "suunta keskeltä ulos");
            var (keski, _, _) = LiioiteltuPerspektiivi.Kallistus(w * 0.5, h * 0.5, w, h, 0, 0.5);
            Oleta.Tosi(keski == 0, "keskellä suoraan ylhäältä (omistaja 26.9.)");
            var (kallistettu, _, _) = LiioiteltuPerspektiivi.Kallistus(w * 0.75, h * 0.5, w, h, 40, 0.5);
            Oleta.Tosi(Lahella(kallistettu, 0), "kamera 40°: liioittelu häipynyt");
            var (reunalla, _, _) = LiioiteltuPerspektiivi.Kallistus(w, h * 0.5, w, h, 0, 0.5);
            Oleta.Tosi(Lahella(reunalla, 55), "reunalla rajattu 55°:een");
        }
    }
}
