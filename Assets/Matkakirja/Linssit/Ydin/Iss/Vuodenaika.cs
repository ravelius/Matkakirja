// VUODENAIKA ISS-KYYDISSÄ (omistaja 1.10.2026 klo 10.2x Päätoimittajan kautta): ohjaamon kuukausivalinta rajattiin neljään
// vuodenaikaan. Kukin kausi näyttää yhden edustavan BMNG-kuukauden (talvi tammi, kevät touko, kesä heinä, syksy syys). Valittu
// BMNG-kuukausista 1.10.: huhtikuussa ja lokakuussa Venäjällä ja Pohjolassa on lunta, joka näkyisi saumana S2:n kesäaineiston
// rajalla (45°E); touko ja syys ovat lumettomia kuten S2. Euroopan S2-mosaiikki on kesäaineisto: se näkyy lumettomina kausina (kevät, kesä, syksy), talvella pinta on BMNG
// (lumi). 9.10.: talvelle Karttasepän Euroopan talvimosaiikki (talvi/v1); maailman S2 talvella pois (BMNG). Oletus on nykyinen vuodenaika (pohjoinen pallonpuolisko, meteorologiset kaudet: joulu–helmi talvi jne.).
// Puhdas C#: AstronauttiKerros (pinta), IssKytkinpoyta ja IssKyytiNakyma (nuppi ja liukusäädin).
namespace Matkakirja.Linssit.Iss
{
    public static class Vuodenaika
    {
        public const int Talvi = 0, Kevat = 1, Kesa = 2, Syksy = 3;
        public static readonly string[] Nimet = { "Talvi", "Kevät", "Kesä", "Syksy" };
        static readonly int[] edustava = { 1, 5, 7, 9 };

        /// <summary>Kuukauden (1–12) kausi: joulu–helmi talvi, maalis–touko kevät, kesä–elo kesä, syys–marras syksy.</summary>
        public static int Kausi(int kuukausi) => ((kuukausi % 12) + 12) % 12 / 3;

        /// <summary>Kauden edustava BMNG-kuukausi (1–12).</summary>
        public static int Kuukausi(int kausi) => edustava[((kausi % 4) + 4) % 4];

        /// <summary>
        /// Kauden Euroopan S2-mosaiikin versio (Karttaseppä 7.10.2026: s2-eurooppa/<kausi>/v1, sama jako kuin kesän v2):
        /// syksy "syksy/v1", kevät "kevat/v1" (huhti–toukokuu, ämpärissä 7.10. 20.02), talvi "talvi/v1" (Karttaseppä 9.10., PT
        /// junaan 173); null = kesän v2.
        /// </summary>
        public static string S2EuroopanVersio(int kausi)
        {
            int k = ((kausi % 4) + 4) % 4;
            return k == Syksy ? "syksy/v1" : k == Kevat ? "kevat/v1" : k == Talvi ? "talvi/v1" : null;
        }

        /// <summary>Näkyykö S2 tällä kaudella: kaikkina, koska talvellakin on Euroopan talvimosaiikki (9.10.).</summary>
        public static bool S2Nakyy(int kausi) => true;

        /// <summary>
        /// Talvella S2 vain Euroopan lohkossa (talvi/v1): maailman S2 on kesäaineistoa, joten sen ulkopuolella näkyy BMNG:n
        /// tammikuu lumineen (Laattapalvelin.S2VainEurooppa → maailman laatat tyhjinä).
        /// </summary>
        public static bool S2VainEurooppa(int kausi) => ((kausi % 4) + 4) % 4 == Talvi;
    }
}
