// KAUPUNKIOPAS KARTTAELEMENTTINÄ (Kartta/KaupunkiPalloMitat.cs): näkyvyys ja koko zoomin mukaan, pallon kiinnityspiste.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KaupunkiPallotTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-4) => Math.Abs(a - b) <= tol;

        [Testi]
        static void NakyvyysZoominMukaan()
        {
            Oleta.Tosi(KaupunkiPalloMitat.Peitto(20_000_000) == 0f, "koko pallo: piilossa");
            Oleta.Tosi(KaupunkiPalloMitat.Peitto(KaupunkiPalloMitat.NakyyAstiM) == 0f, "raja: piilossa");
            Oleta.Tosi(KaupunkiPalloMitat.Peitto(KaupunkiPalloMitat.HaipyyAlkaenM) == 1f, "häivytyksen alku: täysi");
            Oleta.Tosi(KaupunkiPalloMitat.Peitto(5_000) == 1f, "kaupungin yllä: täysi");
            double puoli = (KaupunkiPalloMitat.NakyyAstiM + KaupunkiPalloMitat.HaipyyAlkaenM) / 2;
            Oleta.Tosi(Lahella(KaupunkiPalloMitat.Peitto(puoli), 0.5, 1e-5), "häivytys lineaarinen");
            Oleta.Tosi(KaupunkiPalloMitat.Peitto(double.NaN) == 0f, "NaN: piilossa");
        }

        [Testi]
        static void KokoKasvaaLahestyessa()
        {
            float kauka = KaupunkiPalloMitat.Koko(KaupunkiPalloMitat.NakyyAstiM), lahi = KaupunkiPalloMitat.Koko(10_000);
            Oleta.Tosi(kauka == KaupunkiPalloMitat.KokoKaukaPt && lahi == KaupunkiPalloMitat.KokoLahiPt, $"rajat {kauka} {lahi}");
            float edellinen = 0f;
            foreach (double h in new[] { 1_400_000.0, 800_000, 300_000, 120_000, 60_000 })
            {
                float k = KaupunkiPalloMitat.Koko(h);
                Oleta.Tosi(k >= edellinen && k >= KaupunkiPalloMitat.KokoKaukaPt && k <= KaupunkiPalloMitat.KokoLahiPt, $"monotoninen {h}: {k}");
                edellinen = k;
            }
            Oleta.Tosi(KaupunkiPalloMitat.Koko(KaupunkiPalloMitat.LahiM) == KaupunkiPalloMitat.KokoLahiPt, "LahiM: täysi koko");
        }

        [Testi]
        static void PuoliKortistaPoispain()
        {
            // Rooma: kortti oikealla ylhäällä → vasemmalle (oletus); Ateena: kortti vasemmalla → oikealle.
            Oleta.Tosi(KaupunkiPalloMitat.Oikealle(200f, 400f, 250f, 360f, 90f) == false, "kortti oikealla → vasemmalle");
            Oleta.Tosi(KaupunkiPalloMitat.Oikealle(200f, 400f, 150f, 360f, 90f) == true, "kortti vasemmalla → oikealle");
            Oleta.Tosi(KaupunkiPalloMitat.Oikealle(200f, 400f, 600f, 360f, 90f) == null, "kortti kaukana → ei päätöstä");
            Oleta.Tosi(KaupunkiPalloMitat.Oikealle(200f, 400f, float.NaN, 0f, 90f) == null, "ei korttia");
        }

        [Testi]
        static void PalloSeisooPisteenPaalla()
        {
            Oleta.Tosi(KaupunkiPalloMitat.Ruutupaikka(200f, 400f, 60f, 402f, 874f, out float x, out float y), "ruudulla");
            Oleta.Tosi(Lahella(x, 170f) && Lahella(y, 400f - 60f * (1f - KaupunkiPalloMitat.AnkkuriOsuus)), $"vasen yläkulma {x},{y}");
            Oleta.Tosi(!KaupunkiPalloMitat.Ruutupaikka(-100f, 400f, 60f, 402f, 874f, out _, out _), "vasemmalla ulkona");
            Oleta.Tosi(KaupunkiPalloMitat.Ruutupaikka(-30f, 400f, 60f, 402f, 874f, out _, out _), "reunan yli puoliksi: näkyy");
            Oleta.Tosi(!KaupunkiPalloMitat.Ruutupaikka(float.NaN, 0f, 60f, 402f, 874f, out _, out _), "NaN");
        }
    }
}
