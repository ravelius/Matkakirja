using System;

namespace Matkakirja
{
    /// <summary>
    /// 3D-SYMBOLIT ISOMMIKSI, AIKAISEMMIN JA VÄISTÄEN (omistajan toive 27.9.2026 klo 23.2x Fablen kautta; Linssisepän speksi
    /// docs/raportit/symbolit-ja-lippu-speksi-20260928.md). Puhdas geometria ja päätökset ilman UnityEngineä, testit
    /// Kartta-testit/Testit/SymbolienVaistoTestit.cs; käyttö Symbolimallit.Vaisto.cs.
    ///  1. KYNNYS: tason 1 3D-mallit kartan kertoimesta 1,25 eli yksi zoomtaso ennen 155:n 2,5:tä; pienissä maissa enintään
    ///     0,9 × suurin saavutettava kerroin kuten ennen.
    ///  2. KOKO: kategoriasymbolit ja arkkityypit 30 pt kynnyksellä → 54 pt täydellä kertoimella (ennen 22 → 40 pt), ja
    ///     erikoismallit 22 → 40 pt × KokoKerroin (täysi koko ennallaan). Molemmat kasvavat zoomtasojen mukaan tasaisesti
    ///     (logaritminen asteikko), eli yhtä paljon joka zoomtasolla. Tasot 2–3 ennallaan.
    ///  3. PERSPEKTIIVI: liioiteltu kallistus on täydessä 55°:ssa jo puolivälissä keskeltä reunaan (reuna 0,5, ennen 1,0), joten
    ///     tasokuva vaihtuu 3D:ksi nopeammin kuin ennen. Keskellä kohde näkyy yhä suoraan ylhäältä (omistaja 26.9.).
    ///  4. VÄISTÖ (kuvakortin sääntö: symboli ei siirry, saa piiloutua). Symboli väistyy 2D-kuvamerkiksi, kun sen ydin osuu
    ///     kaupungin pisteeseen tai nimeen tai tärkeämpään symboliin (päällekkäin vähintään 25 % pienemmästä). Oman paikan
    ///     laatikko, jonka lähin kohta on enintään 8 pt jalasta, ei väistätä. Jos jalka on tärkeämmän symbolin laatikossa,
    ///     symboli piiloutuu kokonaan ja merkki näkyy reunapisteenä kuten erikoismallin alla. Tärkeys: löydetty ensin, sitten
    ///     tunniste. Hystereesi 10 %, uusi vaihto aikaisintaan 0,6 s edellisestä ja häivytys 0,3 s, joten ei välkyntää.
    /// </summary>
    public static class SymbolienVaisto
    {
        /// <summary>Tason 1 3D-mallien kynnyskerroin (uusi) ja 1.0.33:n kynnys (NostoSaannot.TyyppimerkinKerroin).</summary>
        public const double KynnysKerroin = 1.25, VanhaKynnysKerroin = 2.5;
        /// <summary>Kategoriasymbolien ja arkkityyppien leveys (pt) kynnyksellä ja täydellä kertoimella: uusi ja 1.0.33.</summary>
        public const float SymKynnysPt = 30f, SymTaysiPt = 54f, VanhaSymKynnysPt = 22f, VanhaSymTaysiPt = 40f;
        /// <summary>Liioitellun perspektiivin täyden kallistuksen etäisyys (0 keskellä, 1 reunalla): uusi ja 1.0.33.</summary>
        public const double RamppiReuna = 0.5, VanhaRamppiReuna = 1.0;
        /// <summary>Ydin: osuus laatikon leveydestä ja korkeudesta keskipisteen ympäri (reunan kosketus ei väistätä).</summary>
        public const float YdinOsuus = 0.7f;
        /// <summary>Oma paikka: nimilaatikko, jonka lähin kohta on enintään tämän verran jalasta (pt), ei väistätä.</summary>
        public const float OmaVaraPt = 8f;
        /// <summary>Jo väistynyt tarkistetaan 10 % suuremmalla ytimellä ja päällekkäisyysrajalla × 0,9 (pysyy väistyneenä).</summary>
        public const float Hystereesi = 0.1f;
        /// <summary>Uusi vaihto aikaisintaan näin kauan edellisestä (s).</summary>
        public const float ViiveS = 0.6f;
        /// <summary>Kahden symbolin päällekkäisyys (osuus pienemmän laatikon alasta), josta vähemmän tärkeä väistyy.</summary>
        public const float PaallekkainOsuus = 0.25f;

        /// <summary>Kynnys: perus, mutta pienissä maissa enintään 0,9 × suurin saavutettava kerroin (Mallinsepän löydös 27.9.).</summary>
        public static double Kynnys(double perus, double suurin) =>
            double.IsInfinity(suurin) || double.IsNaN(suurin) || !(suurin > 0) ? perus : Math.Min(perus, 0.9 * suurin);

        /// <summary>
        /// Leveys (pt) kertoimella: <paramref name="a"/> kynnyksellä <paramref name="k0"/> → <paramref name="b"/> kertoimella
        /// <paramref name="k1"/>, välissä zoomtasojen mukaan (log) tai lineaarisesti kertoimen mukaan (1.0.33), rajattuna.
        /// </summary>
        public static float Koko(double kerroin, double k0, double k1, float a, float b, bool log = true)
        {
            if (!(k1 > k0 * 1.0001) || !(k0 > 0)) return kerroin >= k1 ? b : a;
            double u = log ? Math.Log(Math.Max(kerroin, 1e-6) / k0) / Math.Log(k1 / k0) : (kerroin - k0) / (k1 - k0);
            u = Math.Min(1.0, Math.Max(0.0, u));
            return (float)(a + (b - a) * u);
        }

        /// <summary>
        /// Symbolin ruutulaatikko (px, y ylös): leveys jalan kohdalta, ylöspäin mallin korkeussuhteella (vähintään puolet
        /// leveydestä, koska ylhäältä katsottu malli ulottuu jalan ympärille) ja 0,3 × leveys jalan alle.
        /// </summary>
        public static Ruutulaatikko Laatikko(float jx, float jy, float leveys, float suhde)
        {
            float h = Math.Max(0.5f * leveys, leveys * suhde);
            return new Ruutulaatikko(jx - leveys * 0.5f, jy - 0.3f * leveys, jx + leveys * 0.5f, jy + h);
        }

        /// <summary>Ydin: laatikko kutistettuna <see cref="YdinOsuus"/>:een keskipisteen ympäri (jo väistynyt: 10 % suurempi).</summary>
        public static Ruutulaatikko Ydin(Ruutulaatikko l, bool jo)
        {
            float k = YdinOsuus * (jo ? 1f + Hystereesi : 1f);
            float cx = (l.X0 + l.X1) * 0.5f, cy = (l.Y0 + l.Y1) * 0.5f, pw = 0.5f * k * (l.X1 - l.X0), ph = 0.5f * k * (l.Y1 - l.Y0);
            return new Ruutulaatikko(cx - pw, cy - ph, cx + pw, cy + ph);
        }

        /// <summary>Kuuluuko nimilaatikko noston omaan paikkaan: lähin kohta enintään <paramref name="varaPx"/> jalasta.</summary>
        public static bool OmaPaikka(Ruutulaatikko nimi, float jx, float jy, float varaPx)
        {
            float dx = Math.Max(0f, Math.Max(nimi.X0 - jx, jx - nimi.X1)), dy = Math.Max(0f, Math.Max(nimi.Y0 - jy, jy - nimi.Y1));
            return dx * dx + dy * dy <= varaPx * varaPx;
        }

        /// <summary>Väistääkö ydin nimeä: leikkaa, eikä nimi kuulu noston omaan paikkaan.</summary>
        public static bool OsuuNimeen(Ruutulaatikko ydin, Ruutulaatikko nimi, float jx, float jy, float omaVaraPx) =>
            ydin.Leikkaa(nimi) && !OmaPaikka(nimi, jx, jy, omaVaraPx);

        /// <summary>Päällekkäisyys: leikkauksen ala / pienemmän laatikon ala (0 = erillään, 1 = pienempi kokonaan toisen sisällä).</summary>
        public static float Paallekkaisyys(Ruutulaatikko a, Ruutulaatikko b)
        {
            float w = Math.Min(a.X1, b.X1) - Math.Max(a.X0, b.X0), h = Math.Min(a.Y1, b.Y1) - Math.Max(a.Y0, b.Y0);
            if (w <= 0f || h <= 0f) return 0f;
            float pa = (a.X1 - a.X0) * (a.Y1 - a.Y0), pb = (b.X1 - b.X0) * (b.Y1 - b.Y0), p = Math.Min(pa, pb);
            return p > 0f ? w * h / p : 0f;
        }

        /// <summary>Väistääkö symboli toista: päällekkäisyys vähintään raja (jo väistynyt: raja × 0,9).</summary>
        public static bool VaistaaSymbolia(Ruutulaatikko oma, Ruutulaatikko tarkeampi, bool jo) =>
            Paallekkaisyys(oma, tarkeampi) >= PaallekkainOsuus * (jo ? 1f - Hystereesi : 1f);

        /// <summary>Tärkeysjärjestys (&lt; 0 = a ensin): löydetty ennen löytämätöntä, sitten tunniste (vakaa, ei välky).</summary>
        public static int Vertaa(bool aLoydetty, string aId, bool bLoydetty, string bId)
        {
            if (aLoydetty != bLoydetty) return aLoydetty ? -1 : 1;
            return string.CompareOrdinal(aId, bId);
        }

        /// <summary>
        /// Viive: saako tila vaihtua nyt (<paramref name="nytS"/>), kun edellinen vaihto oli <paramref name="edellinenS"/>
        /// (negatiivinen = ei vielä päätetty, jolloin ensimmäinen arvio pätee heti).
        /// </summary>
        public static bool SaaVaihtaa(float nytS, float edellinenS) => edellinenS < 0f || nytS - edellinenS >= ViiveS;
    }
}
