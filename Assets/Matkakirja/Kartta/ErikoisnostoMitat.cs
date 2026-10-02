using System;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISNOSTOT, AJATTELIJAN PÄÄ KARTUUTSIN LIPUN ALLA (omistaja 2.10.2026 klo 12.34, vaihtoehto B; web #3843
    /// js/ajattelijapaat.js on malli). Puhdas geometria (ei UnityEngineä), testit Kartta-testit/Testit/ErikoisnostotTestit.cs;
    /// käyttö UI/Erikoisnostot.cs ja UI/AjattelijaPaat.cs.
    ///
    ///  - PAIKKA (web sarakkeenPaikka): sarake roikkuu lipun alla (väli 8) kartuutsin oikean reunan ulkopuolella. Kartuutsi
    ///    on ruudun alareunassa, joten jos sarake ei mahdu lipun alle, se nousee niin, että alareuna on kartuutsin alareunan
    ///    tasalla (puhelin: pää kartuutsin vieressä). Ruudun koordinaatit, y alas kuten webin getBoundingClientRect.
    ///    Ei reunaehtoa (omistaja 2.10. 16.4x: "ei pään tarvitse väistää kartussia"): avattu kortti saa peittää pään.
    ///  - KÄÄNTÖ (web kaantoKeskustaa): nenä kohti näkymän keskustaa enintään 30° (+ = katsojan oikealle).
    ///  - HEILAHDUS (web HEILAHDUS): kartan pituusasteen muutos korkeudella jaettuna potkaisee jousta (jousi 0,12,
    ///    vaimennus 0,82, kerroin 1,4, korkeus vähintään 0,05 maan sädettä).
    /// </summary>
    public static class ErikoisnostoMitat
    {
        public const float KaantoAste = 30f, KallistusAste = 12f, Vali = 8f, PaaPt = 64f;
        public const int Enintaan = 3;
        public const double Jousi = 0.12, Vaimennus = 0.82, Kerroin = 1.4, KorkeusMin = 0.05;

        /// <summary>Nenän kääntö (aste) kohti keskustaa: pään keskikohta x suhteessa ruudun leveyteen, ±30°.</summary>
        public static float KaantoKeskustaa(float paaX, float leveys)
        {
            float puoli = Math.Max(1f, leveys / 2f);
            float s = Math.Max(-1f, Math.Min(1f, (puoli - paaX) / puoli));
            return s * KaantoAste;
        }

        /// <summary>
        /// Sarakkeen vasen yläkulma (ruutu, y alas): lipun alla kartuutsin oikean reunan ulkopuolella; <paramref name="mahtuu"/>
        /// = mahtuiko lipun alle (muuten alareuna kartuutsin alareunan tasalla, ei ruudun yläreunan yli).
        /// </summary>
        public static (float X, float Y) SarakkeenPaikka(float lippuVasen, float lippuAla, float kortinOikea, float kortinAla,
            float korkeus, out bool mahtuu)
        {
            float alle = lippuAla + Vali;
            mahtuu = alle + korkeus <= kortinAla;
            return (Math.Max(lippuVasen, kortinOikea + Vali), mahtuu ? alle : Math.Max(0f, kortinAla - korkeus));
        }

        /// <summary>Pituusasteen muutos (aste, kääritty ±180) jaettuna korkeudella maan säteinä (vähintään 0,05).</summary>
        public static double Potku(double edellinenLon, double lon, double korkeusSateina)
        {
            double d = ((lon - edellinenLon + 540.0) % 360.0 + 360.0) % 360.0 - 180.0;
            return d / Math.Max(KorkeusMin, korkeusSateina);
        }

        /// <summary>Yksi jousen askel (web piirra): palauttaa uuden (kulma, nopeus), kulma rajattu ±30°.</summary>
        public static (double Kulma, double Nopeus) Heilahda(double kulma, double nopeus, double potku)
        {
            nopeus = (nopeus - potku * Kerroin - kulma * Jousi) * Vaimennus;
            kulma = Math.Max(-KaantoAste, Math.Min(KaantoAste, kulma + nopeus));
            return (kulma, nopeus);
        }

        /// <summary>Lopullinen kääntö: keskustaa kohti + heilahdus, rajattu ±30°.</summary>
        public static float Kaanto(float paaKeskiX, float leveys, double heilahdus) =>
            (float)Math.Max(-KaantoAste, Math.Min(KaantoAste, KaantoKeskustaa(paaKeskiX, leveys) + heilahdus));

        /// <summary>Jatkuuko liike (web: nopeus &gt; 0,01 tai kulma &gt; 0,05 tai potku &gt; 0,001).</summary>
        public static bool Liikkuu(double kulma, double nopeus, double potku) =>
            Math.Abs(potku) > 0.001 || Math.Abs(nopeus) > 0.01 || Math.Abs(kulma) > 0.05;
    }
}
