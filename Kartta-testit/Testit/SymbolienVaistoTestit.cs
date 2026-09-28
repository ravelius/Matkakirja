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

        // ---- Kohta 5: koko kallistetussa kartassa (omistaja 28.9.2026 klo 17.4x: "nyt kaikki 3d mallit pienenevät kun niitä
        // menee lähemmäksi silloin kun kartta on kallistettuna. pitäisi mennä päinvastoin") ----

        [Testi]
        static void KallistuksenPaino()
        {
            Oleta.Tosi(SymbolienVaisto.KallistusPaino(0) == 0 && SymbolienVaisto.KallistusPaino(-5) == 0, "ylhäältä 0");
            Oleta.Tosi(SymbolienVaisto.KallistusPaino(double.NaN) == 0, "NaN 0");
            Oleta.Tosi(SymbolienVaisto.KallistusPaino(25) == 1 && SymbolienVaisto.KallistusPaino(60) == 1, "25° ja yli: 1");
            Oleta.Tosi(Lahella(SymbolienVaisto.KallistusPaino(12.5), 0.5), "puolivälissä 0,5 (smootherstep)");
            double ed = -1;
            for (int a = 0; a <= 30; a++)
            {
                double p = SymbolienVaisto.KallistusPaino(a);
                Oleta.Tosi(p >= ed, $"kasvaa {a}°");
                ed = p;
            }
        }

        [Testi]
        static void YlhaaltaEnnallaan()
        {
            // Paino 0 (pystysuora kamera): vakioruutu kuten 1.0.37, etäisyydestä ja kertoimesta riippumatta.
            foreach (double d in new[] { 0.5, 1.0, 3.0 })
                Oleta.Tosi(SymbolienVaisto.RuutuKoko(54f, 6.0, 1.25, 1.0, d, 0, 0.45, 117f) == 54f, $"paino 0, etäisyys {d}");
            Oleta.Tosi(SymbolienVaisto.RuutuKoko(0f, 3, 1.25, 1, 1, 1, 0.45, 117f) == 0f, "nolla pysyy nollana");
            Oleta.Tosi(SymbolienVaisto.RuutuKoko(54f, 3, 1.25, 1, 1, double.NaN, 0.45, 117f) == 54f, "NaN-paino = ylhäältä");
        }

        [Testi]
        static void KallistettunaOikeaPerspektiivi()
        {
            // Paino 1, katsepisteessä ja kynnyksellä: perus. Lähempänä isompi ja kauempana pienempi niin, että koko maailmassa
            // (pt × etäisyys) on sama: malli on esine, ei ruudun tarra.
            Oleta.Tosi(Lahella(SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 1000, 1, 0.45, 500f), 40), "katsepisteessä perus");
            float lahi = SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 700, 1, 0.45, 500f);
            float kauko = SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 1600, 1, 0.45, 500f);
            Oleta.Tosi(lahi > 40f && kauko < 40f, $"lähi {lahi:0.0}, kauko {kauko:0.0}");
            Oleta.Tosi(Lahella(lahi * 700, 40 * 1000, 1) && Lahella(kauko * 1600, 40 * 1000, 1), "sama koko maailmassa");
            // Rajat: horisontissa enintään 0,4 × (ei pisteeksi), edessä enintään 2 ×.
            Oleta.Tosi(Lahella(SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 10000, 1, 0.45, 500f), 16), "ala 0,4");
            Oleta.Tosi(Lahella(SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 100, 1, 0.45, 500f), 80), "ylä 2");
            // Puolikas paino: puolet perspektiivistä (geometrinen).
            Oleta.Tosi(Lahella(SymbolienVaisto.RuutuKoko(40f, 1.25, 1.25, 1000, 250, 0.5, 0.45, 500f), 40 * Math.Sqrt(2), 1e-2), "paino 0,5");
        }

        [Testi]
        static void LahestyttaessaKasvaa()
        {
            // Kallistettu kamera lähestyy katsepisteessä olevaa mallia: kerroin 1,25 → 6 (etäisyys = 1000 / kerroin). Ylhäältä-käyrä
            // on 30 → 54 pt; kallistettuna malli kasvaa ruudulla selvästi nopeammin ja pienenee maailmassa hitaammin kuin ennen.
            double ed = 0, edMaailma = double.MaxValue;
            for (double k = 1.25; k <= 6.0001; k *= 1.1)
            {
                double d = 1000 / k;
                float perus = SymbolienVaisto.Koko(k, 1.25, 6.0, 30f, 54f);
                float pt = SymbolienVaisto.RuutuKoko(perus, k, 1.25, d, d, 1, SymbolienVaisto.LisaKasvu, 1000f);
                Oleta.Tosi(pt > ed, $"kasvaa ruudulla kertoimella {k:0.00}: {pt:0.0} pt");
                Oleta.Tosi(pt * d <= edMaailma + 1e-3, $"ei kasva maailmassa: {k:0.00}");
                ed = pt; edMaailma = pt * d;
            }
            float taysi = SymbolienVaisto.RuutuKoko(54f, 6.0, 1.25, 1, 1, 1, SymbolienVaisto.LisaKasvu, 1000f);
            double eksponentti = Math.Log(taysi / 30.0) / Math.Log(6.0 / 1.25);
            Oleta.Tosi(eksponentti > 0.75 && eksponentti < 0.9, $"kasvu kertoimen potenssina {eksponentti:0.00} (ylhäältä ~0,37, esine 1)");
            // Ohi kulkeva malli (sama kerroin): lähestyessä kasvaa koko matkan.
            ed = 0;
            for (double d = 3000; d >= 400; d *= 0.8)
            {
                float pt = SymbolienVaisto.RuutuKoko(40f, 2.5, 1.25, 1000, d, 1, SymbolienVaisto.LisaKasvu, 1000f);
                Oleta.Tosi(pt >= ed, $"ohi kulkeva kasvaa, etäisyys {d:0}");
                ed = pt;
            }
        }

        [Testi]
        static void KattoEiPienennaYlhaaltaKokoa()
        {
            Oleta.Tosi(Lahella(SymbolienVaisto.RuutuKoko(54f, 6.0, 1.25, 1000, 400, 1, 0.45, 117f), 117), "katto 117 pt (iPhone 0,3 × 390)");
            Oleta.Tosi(SymbolienVaisto.RuutuKoko(54f, 6.0, 1.25, 1000, 1000, 0, 0.45, 40f) == 54f, "katto ei pienennä ylhäältä-kokoa");
            Oleta.Tosi(SymbolienVaisto.RuutuKoko(54f, 6.0, 1.25, 1000, 1000, 1, 0.45, 0f) > 54f, "katto 0 = ei kattoa");
        }

        [Testi]
        static void SivuSiirtoKaupunginViereen()
        {
            // Siirto suoraan länteen (mallin −X): X-puolileveys × koko + väli pisteinä.
            Oleta.Tosi(Lahella(SymbolienVaisto.SivuSiirto(-1f, 0f, 0.6f, 0.4f, 10f, 0.5f), 0.6 * 10 + 12 * 0.5), "länteen");
            // Kierretty kartta: suunta mallin X–Z-tasossa vinossa, ulottuma molemmista puolileveyksistä.
            float vino = SymbolienVaisto.SivuSiirto(0.6f, 0.8f, 0.6f, 0.4f, 10f, 0.5f);
            Oleta.Tosi(Lahella(vino, (0.6 * 0.6 + 0.8 * 0.4) * 10 + 6), $"vino {vino:0.00}");
            Oleta.Tosi(SymbolienVaisto.SivuSiirto(1f, 0f, 0.5f, 0.5f, 10f, 0.5f) > 0.5f * 10f, "reuna ei koskaan kaupunkipisteessä");
            Oleta.Tosi(SymbolienVaisto.SivuSadeKm >= 1.0 && SymbolienVaisto.SivuSadeKm <= 5.0, "säde kaupungin sisällä (Colosseum 0,8 km, Stonehenge 13 km ei)");
        }
    }
}
