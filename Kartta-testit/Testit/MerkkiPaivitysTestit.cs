// PALLOMERKIT IRTI (omistaja TF 176, LS1 10.10.2026): kaupunkimerkkien päivityspäätös (Kartta/MerkkiPaivitys.cs).
// Ohitettu kehys: piirtoväli 2, liike päättyy kehykseen, jota willCurrentFrameRender ei piirrä → merkit päivitetään silti.
using Matkakirja;
using Asento = Matkakirja.MerkkiPaivitys.Asento;

namespace Matkakirja.Kartta.Testit
{
    static class MerkkiPaivitysTestit
    {
        static Asento Kamera(float x, float leveys = 2420f, float korkeus = 1668f, float korkeuskerroin = 2f, int pallo = 7) =>
            new Asento(x, -1.1e7f, 2.2e6f, 0.1f, 0.2f, 0.3f, 0.9f, 50f, leveys / korkeus, leveys, korkeus, 2f, korkeuskerroin, pallo);

        /// <summary>OnDemandRendering.willCurrentFrameRender: Time.frameCount % renderFrameInterval == 0.</summary>
        static bool Piirretaan(int kehys, int vali) => kehys % vali == 0;

        [Testi]
        static void LiikePaattyyPiirtamattomaanKehykseen()
        {
            // Kehykset 1–5: kamera liikkuu piirtovälillä 2 ja pysähtyy kehyksessä 5 (pariton → ei piirretä). Sen jälkeen
            // PAIKALLAAN-tila (piirtoväli 60): seuraava "piirretty" kehys on vasta 60. Laite voi silti näyttää kehyksen 5.
            var viimeksi = Kamera(0f);
            bool paivitetty = true;
            Asento vanhaViimeksi = viimeksi;
            for (int kehys = 1; kehys <= 59; kehys++)
            {
                int vali = kehys <= 5 ? 2 : 60;
                var nyt = Kamera(kehys <= 5 ? kehys * 1000f : 5000f);
                bool piirto = Piirretaan(kehys, vali);
                if (MerkkiPaivitys.Paivitetaanko(piirto, paivitetty, false, nyt, viimeksi)) viimeksi = nyt;
                if (piirto) vanhaViimeksi = nyt;   // vanha sääntö: vain willCurrentFrameRender
                if (kehys == 5)
                {
                    Oleta.Tosi(viimeksi.Sama(Kamera(5000f)), "uusi sääntö: liikkeen viimeinen (piirtämätön) kehys päivitetty");
                    Oleta.Tosi(!vanhaViimeksi.Sama(Kamera(5000f)), "vanha sääntö jätti merkit kehyksen 4 paikkaan (omistajan vika)");
                }
            }
            Oleta.Tosi(viimeksi.Sama(Kamera(5000f)), "levossa merkit pysyvät viimeisessä asennossa");
        }

        [Testi]
        static void LevossaPiirtamatonKehysOhitetaan()
        {
            var a = Kamera(1f);
            Oleta.Tosi(!MerkkiPaivitys.Paivitetaanko(false, true, false, a, a), "ei muutosta, ei piirtoa → säästö säilyy");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(true, true, false, a, a), "piirretty kehys päivitetään aina");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, false, false, a, a), "ensimmäinen päivitys");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, true, a, a), "renkaat/suodatin muuttui");
        }

        [Testi]
        static void JokainenAsennonOsaPaivittaa()
        {
            var a = Kamera(1f);
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, false, Kamera(1.5f), a), "kameran paikka");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, false, Kamera(1f, 1668f, 2420f), a), "kierto pysty/vaaka (ruutu ja kuvasuhde)");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, false, Kamera(1f, korkeuskerroin: 2.5f), a), "korkeuskerroin");
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, false, Kamera(1f, pallo: 8), a), "pallon muunnos");
            var kierto = new Asento(1f, -1.1e7f, 2.2e6f, 0.1f, 0.2f, 0.31f, 0.9f, 50f, 2420f / 1668f, 2420f, 1668f, 2f, 2f, 7);
            Oleta.Tosi(MerkkiPaivitys.Paivitetaanko(false, true, false, kierto, a), "kameran kierto");
        }

        [Testi]
        static void TakapuoliPiiloon()
        {
            Oleta.Tosi(MerkkiPaivitys.Edessa(0.92f), "Kairo edessä (iPad-simu 13.5x: dot 0,92)");
            Oleta.Tosi(!MerkkiPaivitys.Edessa(-0.38f), "Kairo takapuolella pyörityksen jälkeen (dot −0,38)");
            Oleta.Tosi(!MerkkiPaivitys.Edessa(MerkkiPaivitys.EtuRaja), "raja ei näy");
        }
    }
}
