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

        // ---- 5. KOKO KALLISTETUSSA KARTASSA (omistaja 28.9.2026 klo 17.4x Päätoimittajan kautta: "palauta 3d symbolit vielä mutta
        // tee niistä isompia. nyt kaikki 3d mallit pienenevät kun niitä menee lähemmäksi silloin kun kartta on kallistettuna.
        // pitäisi mennä päinvastoin"). Syy: malli pidettiin vakiokokoisena ruudulla omalla etäisyydellään, joten kallistetussa
        // kartassa lähestyttäessä maasto kasvoi ja malli ei, eli malli kutistui maisemaan nähden, ja kaukana olevat mallit olivat
        // yhtä isoja kuin lähellä olevat. Nyt kallistetussa kartassa malli on esine: koko sidotaan katsepisteen etäisyyteen
        // (lähempänä isompi, kauempana pienempi) ja kasvaa zoomatessa nopeammin kuin ylhäältä. Ylhäältä ennallaan (× IsoKerroin).

        /// <summary>3D-mallien kokokerroin (tasot 1–3 ja erikoismallit): omistajan "tee niistä isompia".</summary>
        public const float IsoKerroin = 1.35f;
        /// <summary>Kameran kallistus (°), josta kallistetun kartan koko on täysin käytössä; 0° = ylhäältä (entinen vakioruutu).</summary>
        public const double LuonnollinenTaysiAste = 25.0;
        /// <summary>
        /// Kallistetun kartan lisäkasvu: ruutukoko × (kerroin / kynnys)^LisaKasvu. Ylhäältä tason 1 käyrä kasvaa kertoimen
        /// potenssina ~0,37 (30 → 54 pt kertoimilla 1,25 → 6), joten kallistettuna ~0,82, lähes oikea esine (1,0).
        /// </summary>
        public const double LisaKasvu = 0.45;
        /// <summary>Perspektiivikertoimen rajat (katsepisteen etäisyys / mallin etäisyys): horisontissa ei pisteeksi, edessä ei yli 2 ×.</summary>
        public const double PerspektiiviAla = 0.4, PerspektiiviYla = 2.0;
        /// <summary>Katto: malli enintään tämä osuus ruudun lyhyemmästä sivusta (ylhäältä-koko ei koskaan pienene katon takia).</summary>
        public const float KattoOsuus = 0.3f;

        /// <summary>Kallistuksen paino 0–1: 0 ylhäältä, 1 kallistuksesta <paramref name="taysiAste"/> alkaen (smootherstep).</summary>
        public static double KallistusPaino(double kallistusAste, double taysiAste = LuonnollinenTaysiAste)
        {
            if (double.IsNaN(kallistusAste) || kallistusAste <= 0) return 0;
            if (!(taysiAste > 0)) return 1;
            double t = Math.Min(1.0, kallistusAste / taysiAste);
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        /// <summary>
        /// Mallin leveys ruudulla (pt): <paramref name="perusPt"/> (ylhäältä-käyrä) × kasvu × perspektiivi, enintään katto.
        /// Kasvu = (kerroin / kynnys)^(lisäkasvu × paino), kun kerroin ylittää kynnyksen; perspektiivi = (fokus / etäisyys)^paino
        /// rajattuna [ala, ylä], eli painolla 1 mallin koko maailmassa ei riipu sen omasta etäisyydestä (oikea perspektiivi).
        /// Paino 0 palauttaa perusPt:n (entinen vakioruutu). Katto ei koskaan pienennä alle perusPt:n.
        /// </summary>
        public static float RuutuKoko(float perusPt, double kerroin, double kynnys, double fokusEtaisyys, double etaisyys,
            double paino, double lisaKasvu, float kattoPt, double ala = PerspektiiviAla, double yla = PerspektiiviYla)
        {
            if (!(perusPt > 0f)) return 0f;
            double p = double.IsNaN(paino) ? 0 : Math.Max(0.0, Math.Min(1.0, paino));
            double s = perusPt;
            if (p > 0)
            {
                if (kynnys > 0 && kerroin > kynnys && lisaKasvu > 0) s *= Math.Pow(kerroin / kynnys, lisaKasvu * p);
                if (fokusEtaisyys > 0 && etaisyys > 0)
                    s *= Math.Pow(Math.Max(ala, Math.Min(yla, fokusEtaisyys / etaisyys)), p);
            }
            double katto = Math.Max(kattoPt, perusPt);
            if (kattoPt > 0f && s > katto) s = katto;
            return (float)s;
        }

        // ---- 6. ERIKOISMALLI KAUPUNGIN VIERESSÄ (omistaja 28.9.2026 klo 17.4x: "jos erikoissymboli on kohdekaupungissa, se pitää
        // siirtää hieman sen viereen"). Malli ruudulla kaupunkipisteen vasemmalle (kaupungin nimiö on oletuksena oikealla ja
        // väistää mallia kalusteena), lähin reuna SivuValiPt:n päässä pisteen keskeltä. ----

        /// <summary>Väli kaupunkipisteen keskeltä mallin lähimpään reunaan (pt): pisteen säde ~4 pt + 8 pt rako.</summary>
        public const float SivuValiPt = 12f;
        /// <summary>Kaupungin säde (km), jonka sisällä erikoismalli kuuluu kaupunkiin (Colosseum 0,8 km Rooman pisteestä).</summary>
        public const double SivuSadeKm = 3.0;

        /// <summary>
        /// Jalan siirto kaupunkipisteestä: mallin ulottuma siirtosuuntaan (<paramref name="dx"/>, <paramref name="dz"/> = suunta
        /// mallin paikallisessa X–Z-tasossa, <paramref name="puoliX"/>, <paramref name="puoliZ"/> = puolileveydet) kertaa
        /// <paramref name="koko"/> + väli pisteinä (<paramref name="yksikkoaPisteessa"/> = yksikköä ruudun pisteessä).
        /// </summary>
        public static float SivuSiirto(float dx, float dz, float puoliX, float puoliZ, float koko, float yksikkoaPisteessa,
            float valiPt = SivuValiPt) =>
            (Math.Abs(dx) * puoliX + Math.Abs(dz) * puoliZ) * koko + valiPt * yksikkoaPisteessa;
    }
}
