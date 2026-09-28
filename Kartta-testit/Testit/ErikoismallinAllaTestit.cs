// Kategoriasymbolit erikoismallin alla (Linssisepän speksi 27.9.2026 klo 21.2x, Kartta/ErikoismallinAlla.cs):
// laatikko-osuma, laatikkoleikkaus (28.9., Kinderdijk), reunapisteen suunta, merkin paikka, hystereesi ja häivytys.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ErikoismallinAllaTestit
    {
        static bool Lahella(float a, float b, float tol = 1e-3f) => Math.Abs(a - b) <= tol;

        // Český Krumlov -tyyppinen tilanne: jalka (200, 100) px, malli 90 px leveä (1,5 × 60), korkeussuhde 0,8, vara 8 px
        // (4 pt × 2) → laatikko x 147–253, y 92–180.
        static Ruutulaatikko Krumlov() => ErikoismallinAlla.Kalustelaatikko(200f, 100f, 90f, 0.8f, 8f);

        [Testi]
        static void KalustelaatikkoKuinNimioidenVaistossa()
        {
            var l = Krumlov();
            // Sama kaava kuin commitin 0bdc3626 LisaaKalusteet: leveys jalan kohdalta, korkeus = leveys × suhde, + vara.
            Oleta.Tosi(Lahella(l.X0, 147f) && Lahella(l.X1, 253f) && Lahella(l.Y0, 92f) && Lahella(l.Y1, 180f), l.ToString());
        }

        [Testi]
        static void LaatikkoOsuma()
        {
            var l = Krumlov();
            Oleta.Tosi(ErikoismallinAlla.Osuu(l, 215f, 130f, false), "Vltava 0,4 km: jalka mallin kyljessä");
            Oleta.Tosi(ErikoismallinAlla.Osuu(l, 147f, 92f, false), "kulma mukaan");
            Oleta.Tosi(ErikoismallinAlla.Osuu(l, 200f, 100f, false), "jalka itse");
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 260f, 130f, false), "oikealla ohi");
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 200f, 85f, false), "jalan alla varan ulkopuolella");
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 200f, 190f, false), "mallin yläpuolella");
        }

        [Testi]
        static void Hystereesi()
        {
            var l = Krumlov();   // leveys 106, korkeus 88: 10 % → kumpikin reuna 5,3 / 4,4 px ulommas
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 256f, 130f, false), "uusi ei piiloudu 3 px reunan ulkopuolella");
            Oleta.Tosi(ErikoismallinAlla.Osuu(l, 256f, 130f, true), "piilotettu pysyy 3 px reunan ulkopuolella");
            Oleta.Tosi(ErikoismallinAlla.Osuu(l, 200f, 184f, true), "yläreuna 4 px");
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 259f, 130f, true), "6 px ulkona palaa");
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 200f, 185f, true), "yläreuna 5 px palaa");
            // Zoomaus: laatikko kasvaa 2 % kehyksessä, piilotettu ei välky reunalla.
            bool piilossa = ErikoismallinAlla.Osuu(l, 252f, 130f, false);
            Oleta.Tosi(piilossa, "sisällä alussa");
            for (int i = 0; i < 5; i++)
            {
                float k = 1f - 0.02f * i;   // malli pienenee (zoom ulos): reuna 253 → 249
                var li = ErikoismallinAlla.Kalustelaatikko(200f, 100f, 90f * k, 0.8f, 8f);
                piilossa = ErikoismallinAlla.Osuu(li, 252f, 130f, piilossa);
                Oleta.Tosi(piilossa, $"pysyy piilossa kertoimella {k:0.00}");
            }
        }

        [Testi]
        static void ReunapisteenSuunta()
        {
            var l = Krumlov();
            // Noston paikka oikealla samalla korkeudella kuin jalka → oikea reuna jalan korkeudella.
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, 215f, 100f, out float x, out float y);
            Oleta.Tosi(Lahella(x, 253f) && Lahella(y, 100f), $"oikea {x}, {y}");
            // Suoraan ylhäällä (pohjoisessa, ruudun ylös) → yläreuna.
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, 200f, 150f, out x, out y);
            Oleta.Tosi(Lahella(x, 200f) && Lahella(y, 180f), $"ylä {x}, {y}");
            // Alapuolella → alareuna jalan alla varan päässä.
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, 195f, 95f, out x, out y);
            Oleta.Tosi(y <= 92f + 1e-3f && x < 200f && x > 190f, $"lounas {x}, {y}");
            // Vinosti koilliseen: piste suoralla jalka → nosto, oikealla puolella jalkaa ja laatikon reunalla.
            float nx = 230f, ny = 160f;
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, nx, ny, out x, out y);
            float risti = (nx - 200f) * (y - 100f) - (ny - 100f) * (x - 200f);
            float piste = (nx - 200f) * (x - 200f) + (ny - 100f) * (y - 100f);
            bool reunalla = Lahella(x, l.X0) || Lahella(x, l.X1) || Lahella(y, l.Y0) || Lahella(y, l.Y1);
            Oleta.Tosi(Math.Abs(risti) < 0.05f && piste > 0f && reunalla, $"koillinen {x}, {y}");
            Oleta.Tosi(Lahella(y, 180f) && Lahella(x, 240f), $"yläreunan leikkaus {x}, {y}");
            // Nosto laatikon ulkopuolella (ei kuitenkaan piilossa): piste silti reunalla, ei noston paikassa.
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, 400f, 100f, out x, out y);
            Oleta.Tosi(Lahella(x, 253f) && Lahella(y, 100f), $"kaukana oikealla {x}, {y}");
            // Sama piste (suunta puuttuu) → suoraan alas.
            ErikoismallinAlla.ReunaPiste(l, 200f, 100f, 200f, 100f, out x, out y);
            Oleta.Tosi(Lahella(x, 200f) && Lahella(y, 92f), $"ei suuntaa {x}, {y}");
            // Vara 0: jalka alareunalla, alaspäin osoittava suunta pysyy reunalla.
            var l0 = ErikoismallinAlla.Kalustelaatikko(200f, 100f, 90f, 0.8f, 0f);
            ErikoismallinAlla.ReunaPiste(l0, 200f, 100f, 150f, 50f, out x, out y);
            Oleta.Tosi(Lahella(x, 200f) && Lahella(y, 100f), $"vara 0 {x}, {y}");
        }

        [Testi]
        static void SymbolinLaatikko()
        {
            // Sama muoto kuin väistössä: leveys jalan kohdalta, ylös max(0,5 × leveys, leveys × suhde), 0,3 × leveys jalan alle.
            var l = ErikoismallinAlla.SymbolinLaatikko(100f, 50f, 60f, 1.2f);
            Oleta.Tosi(Lahella(l.X0, 70f) && Lahella(l.X1, 130f) && Lahella(l.Y0, 32f) && Lahella(l.Y1, 122f), l.ToString());
            var matala = ErikoismallinAlla.SymbolinLaatikko(100f, 50f, 60f, 0.3f);
            Oleta.Tosi(Lahella(matala.Y1, 80f), $"matala malli vähintään puolet leveydestä ylös {matala}");
            var piste = ErikoismallinAlla.SymbolinLaatikko(100f, 50f, 0f, 1.2f);
            Oleta.Tosi(piste.Leveys == 0f && piste.Korkeus == 0f && piste.X0 == 100f && piste.Y0 == 50f, $"leveys 0 = jalkapiste {piste}");
        }

        [Testi]
        static void LaatikkoleikkausKinderdijk()
        {
            var l = Krumlov();   // x 147–253, y 92–180
            // Kinderdijk (Linssisepän laiteajo 27.9. klo 22.0x): Goudan Maljan jalka laatikon yläpuolella, malja myllyjen päällä.
            Oleta.Tosi(!ErikoismallinAlla.Osuu(l, 240f, 190f, false), "1.0.33: jalkapiste ei osu");
            var malja = ErikoismallinAlla.SymbolinLaatikko(240f, 190f, 60f, 1.2f);   // y 172–262
            Oleta.Tosi(ErikoismallinAlla.Leikkaa(l, malja, false), "laatikko leikkaa: piiloon");
            Oleta.Tosi(!ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(240f, 205f, 60f, 1.2f), false), "ylempänä erillään (y 187–)");
            // Sivulla: puolet leveydestä ratkaisee.
            Oleta.Tosi(ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(280f, 120f, 60f, 1.2f), false), "oikealla x 250– leikkaa");
            Oleta.Tosi(!ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(290f, 120f, 60f, 1.2f), false), "oikealla x 260– erillään");
            // Alla: symboli ulottuu jalasta ylös; reunan kosketus lasketaan kuten jalkapisteessä.
            Oleta.Tosi(ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(200f, 20f, 60f, 1.2f), false), "alla yläreuna 92 koskettaa");
            Oleta.Tosi(!ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(200f, 19f, 60f, 1.2f), false), "alla 1 px irti");
        }

        [Testi]
        static void LaatikkoleikkauksenHystereesi()
        {
            var l = Krumlov();   // leveys 106: × 1,1 → puolileveys 58,3
            var s = ErikoismallinAlla.SymbolinLaatikko(285f, 120f, 60f, 1.2f);   // x 255–315, 2 px oikean reunan ulkopuolella
            Oleta.Tosi(!ErikoismallinAlla.Leikkaa(l, s, false), "uusi ei piiloudu");
            Oleta.Tosi(ErikoismallinAlla.Leikkaa(l, s, true), "piilotettu pysyy");
            Oleta.Tosi(!ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(290f, 120f, 60f, 1.2f), true), "7 px ulkona palaa");
        }

        [Testi]
        static void NollaleveysOnJalkapiste()
        {
            // Leveys 0 (ja `symbolit alla jalka`) = 1.0.33:n sääntö sellaisenaan, myös hystereesillä ja reunoilla.
            var l = Krumlov();
            int eri = 0;
            for (float x = 130f; x <= 270f; x += 0.5f)
                for (float y = 80f; y <= 195f; y += 0.5f)
                    foreach (bool jo in new[] { false, true })
                        if (ErikoismallinAlla.Leikkaa(l, ErikoismallinAlla.SymbolinLaatikko(x, y, 0f, 0.8f), jo) != ErikoismallinAlla.Osuu(l, x, y, jo)) eri++;
            Oleta.Sama(0, eri, "eroja jalkapisteeseen");
        }

        [Testi]
        static void MerkinPaikka()
        {
            var l = Krumlov();
            // Jalka laatikossa: reunapiste kuten ennen.
            ErikoismallinAlla.MerkinPaikka(l, 200f, 100f, 215f, 100f, out float x, out float y);
            Oleta.Tosi(Lahella(x, 253f) && Lahella(y, 100f), $"sisällä reunalle {x}, {y}");
            // Jalka ulkona (vain symboli leikkasi): merkki noston omaan paikkaan, ei laatikon reunalle.
            ErikoismallinAlla.MerkinPaikka(l, 200f, 100f, 240f, 190f, out x, out y);
            Oleta.Tosi(Lahella(x, 240f) && Lahella(y, 190f), $"ulkona omaan paikkaan {x}, {y}");
            // Raja: jalka reunalla → reunapiste on jalka itse (ei hyppyä).
            ErikoismallinAlla.MerkinPaikka(l, 200f, 100f, 240f, 180f, out x, out y);
            Oleta.Tosi(Lahella(x, 240f) && Lahella(y, 180f), $"reunalla {x}, {y}");
        }

        [Testi]
        static void Haivytys()
        {
            float p = 0f;
            p = ErikoismallinAlla.Haivyta(p, true, 0.15f);
            Oleta.Tosi(Lahella(p, 0.5f), $"puolivälissä {p}");
            p = ErikoismallinAlla.Haivyta(p, true, 0.2f);
            Oleta.Sama(1f, p, "piilossa 0,3 s:ssa");
            p = ErikoismallinAlla.Haivyta(p, false, 0.1f);
            Oleta.Tosi(Lahella(p, 2f / 3f), $"palaa {p}");
            p = ErikoismallinAlla.Haivyta(p, false, 1f);
            Oleta.Sama(0f, p, "näkyvissä");
            Oleta.Sama(0f, ErikoismallinAlla.Haivyta(0f, false, -1f), "negatiivinen dt ei liikuta");
        }

        [Testi]
        static void ReunapisteEnintaanKuusiPistetta()
        {
            // Nimiön mitta lähizoomissa 2 (katto 22 / 11): rengas 6,8 × mitta = 13,6 pt → rajataan 6 pt:iin.
            Oleta.Tosi(Lahella(ErikoismallinAlla.PisteMitta(2f) * ErikoismallinAlla.PisteHalkaisijaYks, 6f), "lähizoomi 6 pt");
            Oleta.Tosi(Lahella(ErikoismallinAlla.PisteMitta(0.7f), 0.7f), "pieni mitta ennallaan (4,8 pt)");
        }
    }
}
