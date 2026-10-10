// KAUPUNKIOPAS KARTTAELEMENTTINÄ (Kartta/KaupunkiPalloMitat.cs): koko zoomin mukaan, pallon kiinnityspiste, puoli kortista poispäin.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KaupunkiPallotTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-4) => Math.Abs(a - b) <= tol;

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

        /// <summary>Omistaja TF 162: kehittäjän maailmanäkymässä (huntu pois) kaikkien maiden pallot; pelissä vain oma maa.</summary>
        [Testi]
        static void MaailmanakymassaKaikkiMaat()
        {
            Oleta.Tosi(KaupunkiPalloMitat.Nakyy("GRC", "GRC", false) && !KaupunkiPalloMitat.Nakyy("ITA", "GRC", false), "peli: vain oma maa");
            Oleta.Tosi(!KaupunkiPalloMitat.Nakyy("ITA", null, false), "peli: ei maata → ei palloja");
            Oleta.Tosi(KaupunkiPalloMitat.Nakyy("ITA", "GRC", true) && KaupunkiPalloMitat.Nakyy("GRC", "GRC", true), "maailmanäkymä: kaikki maat");
            Oleta.Tosi(KaupunkiPalloMitat.Nakyy("FIN", null, true), "maailmanäkymä: myös ilman pelaajan maata");
        }

        /// <summary>Omistaja 10.10. 11.5x: kehittäjän maailmanäkymässä muiden kuin kohdemaan pallot paljon pienempinä.</summary>
        [Testi]
        static void MaailmanakymassaMuutMaatPienempina()
        {
            float k = KaupunkiPalloMitat.KokoKaukaPt;
            Oleta.Tosi(KaupunkiPalloMitat.KokoMaassa(k, "GRC", "GRC", true) == k, "maailmanäkymä: kohdemaa ennallaan");
            float muu = KaupunkiPalloMitat.KokoMaassa(k, "ITA", "GRC", true);
            Oleta.Tosi(muu < k * 0.5f && Lahella(muu, k * KaupunkiPalloMitat.MuuMaaOsuus), $"maailmanäkymä: muu maa pieni {muu}");
            Oleta.Tosi(KaupunkiPalloMitat.KokoMaassa(k, null, "GRC", true) < k, "maailmanäkymä: tuntematon maa pieni");
            Oleta.Tosi(KaupunkiPalloMitat.KokoMaassa(k, "ITA", null, true) == k, "maailmanäkymä ilman kohdemaata: ennallaan");
            Oleta.Tosi(KaupunkiPalloMitat.KokoMaassa(k, "ITA", "GRC", false) == k && KaupunkiPalloMitat.KokoMaassa(k, "GRC", "GRC", false) == k, "peli: ennallaan");
        }
    }
}
