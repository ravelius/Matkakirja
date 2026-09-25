using System;
using System.Globalization;

namespace Matkakirja
{
    /// <summary>
    /// LÄMPÖ JA VIRRANKULUTUS NATIIVISSA (Raamattu, omistaja 25.9.2026 klo 18.2x, build 16: "peli ei saa kuumentaa laitetta
    /// levossa"): Natiivisepän osuuden puhtaat päätökset ilman Unityä (Kartta-testit/Testit/LampopaatosTestit.cs).
    /// Unity-kytkennät: <c>PallonLepo</c> (pallon leposignaali Pelikoodarin lepopiirrolle, Ruudunpaivitys) ja
    /// <c>LampoSaadot</c> (HDR, päävalon varjot ja lokin pinot kuvaparia ja laitemittausta varten).
    /// </summary>
    public static class Lampopaatos
    {
        // ---- Pallon lepo ----

        /// <summary>Ensimmäinen este pallon levolle (Ei = lepää).</summary>
        public enum Este { Ei, Kamera, Laatat, Palvelin, Heratys, Animaatio }

        /// <summary>Laattojen latausaste (Cesium3DTileset.ComputeLoadProgress, %), josta alkaen laatat ovat valmiit.</summary>
        public const float ValmisAste = 99.99f;

        /// <summary>Latausasteen ero, jota pienempi ei ole muutos (aste lasketaan laattamääristä, joten sama tila = sama luku).</summary>
        const float AsteenTarkkuus = 1e-4f;

        /// <summary>
        /// Yhden tilesetin laatat ovat valmiit ja vakaat: aste ≥ <see cref="ValmisAste"/> kolmessa peräkkäisessä
        /// näytteessä (tämä, edellinen ja toissa kehys) eikä aste muuttunut niiden välillä. NaN (Cesium: ei yhtään laattaa
        /// laskussa, esim. juuri luotu tileset) ei ole koskaan vakaa.
        /// </summary>
        public static bool Vakaa(float aste, float edellinen, float toissa) =>
            aste >= ValmisAste && Math.Abs(aste - edellinen) < AsteenTarkkuus && Math.Abs(edellinen - toissa) < AsteenTarkkuus;

        /// <summary>Pienempi aste kahdesta tilesetistä; NaN voittaa (keskeneräinen tileset ei ole valmis).</summary>
        public static float Pienin(float a, float b) => float.IsNaN(a) || float.IsNaN(b) ? float.NaN : Math.Min(a, b);

        /// <summary>
        /// Pallon lepopäätös kerran kehyksessä. Pallo lepää, kun (a) kamera on levossa eikä näkymä (paikka, asento,
        /// projektio) muuttunut tässä kehyksessä, (b) kaikkien käytössä olevien tilesettien laatat ovat valmiit (pienin
        /// aste ≥ <see cref="ValmisAste"/>) ja vakaat (<see cref="Vakaa"/> jokaiselle), (c) laattapalvelin ei ole
        /// kiireinen, (d) herätys on ohi (aika ≥ hereilläAsti) ja (e) yksikään kartan animaatio ei ole käynnissä.
        /// Palauttaa ensimmäisen esteen järjestyksessä kamera → laatat (aste) → palvelin → laatat (asettuvat) →
        /// herätys → animaatio; <see cref="Este.Ei"/> = lepää.
        /// </summary>
        public static Este Lepo(bool kameraLevossa, bool nakymaMuuttui, float pieninAste, bool laatatVakaat,
                                bool palvelinKiireinen, float aika, float hereillaAsti, bool animaatio)
        {
            if (!kameraLevossa || nakymaMuuttui) return Este.Kamera;
            if (!(pieninAste >= ValmisAste)) return Este.Laatat;   // myös NaN
            if (palvelinKiireinen) return Este.Palvelin;
            if (!laatatVakaat) return Este.Laatat;
            if (aika < hereillaAsti) return Este.Heratys;
            if (animaatio) return Este.Animaatio;
            return Este.Ei;
        }

        /// <summary>
        /// Esteen lyhyt teksti lokiin ja Pelikoodarille: "kamera", "laatat 97 %", "laatat asettuvat" (aste valmis, mutta
        /// muuttui kahden viime kehyksen aikana), "palvelin", "herätys: &lt;kuka&gt;", "animaatio: &lt;nimi&gt;"; lepo = tyhjä.
        /// </summary>
        public static string Syy(Este este, float pieninAste, string kuka)
        {
            string k = string.IsNullOrEmpty(kuka) ? "?" : kuka;
            switch (este)
            {
                case Este.Ei: return "";
                case Este.Kamera: return "kamera";
                case Este.Laatat:
                    if (float.IsNaN(pieninAste)) return "laatat ? %";
                    return pieninAste >= ValmisAste ? "laatat asettuvat"
                        : "laatat " + ((int)Math.Floor(pieninAste)).ToString(CultureInfo.InvariantCulture) + " %";
                case Este.Palvelin: return "palvelin";
                case Este.Heratys: return "herätys: " + k;
                default: return "animaatio: " + k;
            }
        }

        /// <summary>
        /// Herätyksen uusi takaraja: nyt + sekuntia, mutta lyhyt herätys ei lyhennä aiempaa pidempää (Herata(0,1) kesken
        /// Herata(0,6):n pitää pallon hereillä 0,6 s loppuun). Negatiivinen tai NaN kesto = 0.
        /// </summary>
        public static float Heratys(float hereillaAsti, float nyt, float sekuntia) =>
            Math.Max(hereillaAsti, nyt + (sekuntia > 0f ? sekuntia : 0f));

        // ---- Kytkimet (komennot hdr ja varjot) ----

        /// <summary>Komennon sana päälle/pois: "paalle"/"päälle" = tosi, "pois" = epätosi, muu = null (esim. "tila").</summary>
        public static bool? PaalleTaiPois(string sana)
        {
            switch (sana)
            {
                case "paalle":
                case "päälle": return true;
                case "pois": return false;
                default: return null;
            }
        }

        // ---- Päävalon varjot ----

        /// <summary>Päävalon varjot: Pois = ei koskaan (nykyinen ilme), Auto = vain kun maamerkki on ruudulla, Paalle = aina.</summary>
        public enum VarjoTila { Pois, Auto, Paalle }

        /// <summary>Heittääkö päävalo varjoja tässä kehyksessä.</summary>
        public static bool VarjotPaalla(VarjoTila tila, bool maamerkkiRuudulla) =>
            tila == VarjoTila.Paalle || (tila == VarjoTila.Auto && maamerkkiRuudulla);

        /// <summary>
        /// Yhden ruudulla olevan maamerkin tarve varjokartan etäisyydelle (m): etäisyys kamerasta + 2 × mallin korkeus
        /// ruudulla (liioittelukertoimen jälkeen), jotta varjo mahtuu kokonaan kartan sisään.
        /// </summary>
        public static float VarjoTarve(float etaisyys, float korkeus) => etaisyys + 2f * Math.Max(0f, korkeus);

        /// <summary>
        /// Varjokartan etäisyys (m, URP shadowDistance): kauimman ruudulla olevan maamerkin tarve (<see cref="VarjoTarve"/>),
        /// vähintään asetuksen alkuperäinen arvo. Tarve NaN tai ≤ 0 (ei maamerkkiä ruudulla) = alkuperäinen.
        /// </summary>
        public static float VarjoEtaisyys(float tarve, float alkuperainen) =>
            float.IsNaN(tarve) || tarve <= 0f ? alkuperainen : Math.Max(alkuperainen, tarve);

        /// <summary>Komennon sana varjotilaksi ("pois", "auto", "paalle"/"päälle"); null = tuntematon.</summary>
        public static VarjoTila? VarjoTilaksi(string sana)
        {
            switch (sana)
            {
                case "pois": return VarjoTila.Pois;
                case "auto": return VarjoTila.Auto;
                case "paalle":
                case "päälle": return VarjoTila.Paalle;
                default: return null;
            }
        }
    }
}
