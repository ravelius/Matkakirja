using System;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISNOSTOT, AJATTELIJAN PÄÄ KARTUUTSIN LIPUN ALLA (omistaja 2.10.2026 klo 12.34, vaihtoehto B; web #3843
    /// js/ajattelijapaat.js on malli). Puhdas geometria (ei UnityEngineä), testit Kartta-testit/Testit/ErikoisnostotTestit.cs;
    /// käyttö UI/Erikoisnostot.cs ja UI/AjattelijaPaat.cs.
    ///
    ///  - PAIKKA (web #3866 paanRuutupaikka, omistaja 16.5x: pää on karttaobjekti kiinteässä karttapisteessä): napin
    ///    keskipiste x = pisteen x, y = pisteen y − 0,35 × 64 (pää seisoo pisteen päällä); piilossa, kun piste on yli pään
    ///    verran ruudun ulkopuolella. Ruudun koordinaatit, y alas.
    ///  - KÄÄNTÖ (web kaantoKeskustaa): nenä kohti näkymän keskustaa enintään 30° (+ = katsojan oikealle).
    ///  - HEILAHDUS (web HEILAHDUS): kartan pituusasteen muutos korkeudella jaettuna potkaisee jousta (jousi 0,12,
    ///    vaimennus 0,82, kerroin 1,4, korkeus vähintään 0,05 maan sädettä).
    ///  - OMA MAA (omistaja 4.10.2026 klo 19.4x, natiivi: "Ajattelijoiden päät saavat näkyä vain kohde maassa oltaessa"): pää
    ///    näkyy vain, kun pelaaja on ajattelijan maassa (kartta.maa ISO3 = pelaajan maa), myös kaukozoomissa piilossa muualla;
    ///    maan vaihtuessa pää häivytetään esiin tai pois nostojen syttymisen ajassa (NostoKerros.syttyminenS).
    /// </summary>
    public static class ErikoisnostoMitat
    {
        public const float KaantoAste = 30f, KallistusAste = 12f, PaaPt = 64f;
        public const double Jousi = 0.12, Vaimennus = 0.82, Kerroin = 1.4, KorkeusMin = 0.05;

        /// <summary>Nenän kääntö (aste) kohti keskustaa: pään keskikohta x suhteessa ruudun leveyteen, ±30°.</summary>
        public static float KaantoKeskustaa(float paaX, float leveys)
        {
            float puoli = Math.Max(1f, leveys / 2f);
            float s = Math.Max(-1f, Math.Min(1f, (puoli - paaX) / puoli));
            return s * KaantoAste;
        }

        /// <summary>Pään keskipiste ruudulla karttapisteestä (x, y alas); false = yli pään verran ruudun ulkopuolella.</summary>
        public static bool PaanRuutupaikka(float pisteX, float pisteY, float leveys, float korkeus, out float x, out float y)
        {
            x = pisteX;
            y = pisteY - PaaPt * 0.35f;
            if (float.IsNaN(x) || float.IsNaN(y)) return false;
            return !(x < -PaaPt || y < -PaaPt || x > leveys + PaaPt || y > korkeus + PaaPt);
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

        /// <summary>Saako pää näkyä: ajattelijan maa (ISO3) on pelaajan maa. Tuntematon kumpi tahansa = ei.</summary>
        public static bool OmaMaa(string paanMaa, string pelaajanMaa) =>
            !string.IsNullOrEmpty(paanMaa) && !string.IsNullOrEmpty(pelaajanMaa)
            && string.Equals(paanMaa, pelaajanMaa, StringComparison.OrdinalIgnoreCase);

        /// <summary>Häivytys: peitto kohti 1 (näkyy) tai 0 (piilossa) tasaisesti kestoS:ssa (dt s), rajattu 0…1.</summary>
        public static float Haivytys(float peitto, bool nakyy, float dt, float kestoS)
        {
            float askel = kestoS > 0f ? dt / kestoS : 1f;
            return Math.Max(0f, Math.Min(1f, peitto + (nakyy ? askel : -askel)));
        }

        /// <summary>Jatkuuko liike (web: nopeus &gt; 0,01 tai kulma &gt; 0,05 tai potku &gt; 0,001).</summary>
        public static bool Liikkuu(double kulma, double nopeus, double potku) =>
            Math.Abs(potku) > 0.001 || Math.Abs(nopeus) > 0.01 || Math.Abs(kulma) > 0.05;
    }
}
