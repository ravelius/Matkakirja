// YHTEENSOPIVUUSTYNKÄ (Linssiseppä 27.9.2026). Maakunnan herätys on poistettu kokonaan (omistaja 27.9. klo 08.3x: koko
// maailma auki, maakunnat heränneinä heti): ei MaakuntaHeraa-kuuntelijaa, jonoa, MaaKartta.Herata/Heraannyt-kutsuja eikä
// komentoa "elava herata". Kartan hiljaisuus ja Natiivi-UI:n koukut asuvat nyt ElavaKartassa; nämä kaksi ohjautuvat sinne,
// jotta Natiivi-UI:n UiNakymat.cs kääntyy ennallaan. Poistetaan, kun UiNakymat.cs asettaa ElavaKartta.KorttiAukiKysely
// ja ElavaKartta.KuvapakkaLahtee suoraan.
using System;

namespace Matkakirja.Natiivi
{
    public static class ElavaHerays
    {
        /// <summary>Sama kuin <see cref="ElavaKartta.KorttiAukiKysely"/>.</summary>
        public static Func<bool> KorttiAukiKysely
        {
            get => ElavaKartta.KorttiAukiKysely;
            set => ElavaKartta.KorttiAukiKysely = value;
        }

        /// <summary>Sama kuin <see cref="ElavaKartta.KuvapakkaLahtee"/>.</summary>
        public static Action KuvapakkaLahtee
        {
            get => ElavaKartta.KuvapakkaLahtee;
            set => ElavaKartta.KuvapakkaLahtee = value;
        }
    }
}
