// VUODENAIKA ISS-KYYDISSÄ (omistaja 1.10.2026 klo 10.2x Päätoimittajan kautta): ohjaamon kuukausivalinta rajattiin neljään
// vuodenaikaan. Kukin kausi näyttää yhden edustavan BMNG-kuukauden (talvi tammi, kevät touko, kesä heinä, syksy syys). Valittu
// BMNG-kuukausista 1.10.: huhtikuussa ja lokakuussa Venäjällä ja Pohjolassa on lunta, joka näkyisi saumana S2:n kesäaineiston
// rajalla (45°E); touko ja syys ovat lumettomia kuten S2. Euroopan S2-mosaiikki on kesäaineisto: se näkyy lumettomina kausina (kevät, kesä, syksy), talvella pinta on BMNG
// (lumi). Oletus on nykyinen vuodenaika (pohjoinen pallonpuolisko, meteorologiset kaudet: joulu–helmi talvi jne.).
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

        /// <summary>Näkyykö Euroopan S2-mosaiikki tällä kaudella (lumettomat kaudet).</summary>
        public static bool S2Nakyy(int kausi) => kausi != Talvi;
    }
}
