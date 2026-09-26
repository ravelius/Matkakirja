using System;
using System.Globalization;

namespace Matkakirja
{
    /// <summary>
    /// LIIKKEEN LAATTAVALINTA, puhtaat päätökset (löydös S10, Fablen päätös 26.9.2026: laattojen tarkkuus liikkeessä SSE 32,
    /// levossa 16, ilman tilesetin uudelleenluontia). Unity-kytkentä: <c>LiikeLaatat</c> (varjokamera Cesiumin valintaan).
    /// Testit: Kartta-testit/Testit/LiikeLaatatPaatosTestit.cs.
    ///
    /// Miksi kerroin: Cesiumin laatta tarkennetaan, kun sen näyttövirhe geometricError · viewportHeight / (distance ·
    /// 2 tan(fovY / 2)) ylittää maximumScreenSpaceErrorin. Näyttövirhe on suoraan verrannollinen näkymän pikselikorkeuteen
    /// (Cesium lukee sen Camera.pixelHeightista, native CameraManager.cpp unityCameraToViewState), joten kamera, jonka
    /// pikselikorkeus on pohja / liike -kertainen, valitsee samat laatat kuin SSE liike pääkameralla.
    /// </summary>
    public static class LiikeLaatatPaatos
    {
        /// <summary>Liikkeen SSE-vastine oletuksena (Fablen päätös 26.9.; S10-mittaus: liikkeen p50 20 → 13 ms).</summary>
        public const float OletusSse = 32f;
        /// <summary>Lepoon (pääkameran valinta) vasta, kun karkeaa liikettä ei ole ollut näin kauan (s). Pienempi kuin
        /// Ruudunpaivitys.TaysiPitoS (0,5), joten tarkennus alkaa vielä täydellä taajuudella.</summary>
        public const float LepoViiveS = 0.35f;
        /// <summary>Varjokameran pienin pikselikerroin (SSE enintään 8 × pohja).</summary>
        public const float MinKerroin = 0.125f;
        /// <summary>Suurin hyväksytty liikkeen SSE komennossa.</summary>
        public const float MaxSse = 128f;

        public enum Valinta { Paa, Varjo }

        /// <summary>Syy, miksi karkeaa valintaa ei nyt saa käyttää (Ei = saa, jos liike on karkeaa liikettä).</summary>
        public enum Este { Ei, Pois, Kamera, Verho, Peitto, Portti, Lento, Saapuminen }

        /// <summary>
        /// Varjokameran pikselikoon kerroin pääkameraan nähden: pohja / liike (esim. 16 / 32 = 0,5), rajattuna
        /// [<see cref="MinKerroin"/>, 1]. Liike ≤ pohja tai virheellinen arvo = 1 (sama valinta kuin pääkameralla).
        /// </summary>
        public static float Kerroin(float pohjaSse, float liikeSse)
        {
            if (!(pohjaSse > 0f) || !(liikeSse > 0f)) return 1f;
            float k = pohjaSse / liikeSse;
            return k >= 1f ? 1f : k < MinKerroin ? MinKerroin : k;
        }

        /// <summary>
        /// Tämän kehyksen valinta. Este → pääkamera heti (verho, lento, saapuminen, peitto: laatat eivät saa jäädä
        /// pyytämättä). Karkea liike → varjo heti. Muuten varjo pysyy <paramref name="viive"/> sekuntia viimeisestä karkeasta
        /// liikkeestä (hystereesi: lyhyet tauot eleen sisällä eivät vaihda valintaa edestakaisin).
        /// </summary>
        public static Valinta Seuraava(Valinta nyt, bool karkeaLiike, Este este, float aika, float viimeKarkea,
            float viive = LepoViiveS)
        {
            if (este != Este.Ei) return Valinta.Paa;
            if (karkeaLiike) return Valinta.Varjo;
            if (nyt == Valinta.Varjo && aika - viimeKarkea < viive) return Valinta.Varjo;
            return Valinta.Paa;
        }

        /// <summary>Komennon arvo `maasto liike &lt;arvo&gt;`: "pois" = 0 (aina pääkamera), luku 1–<see cref="MaxSse"/>,
        /// muuten null (virheellinen).</summary>
        public static float? LueSse(string s)
        {
            if (s == "pois") return 0f;
            if (!float.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out float v)) return null;
            return v >= 1f && v <= MaxSse ? v : (float?)null;
        }

        /// <summary>Komennon arvo `ruutu liike &lt;hz&gt;`: "pois" tai "naytto" = 0 (näytön taajuus), luku 20–240, muuten null.</summary>
        public static int? LueKatto(string s)
        {
            if (s == "pois" || s == "naytto") return 0;
            if (!int.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out int v)) return null;
            return v >= 20 && v <= 240 ? v : (int?)null;
        }

        /// <summary>Täyden tilan tavoitetaajuus: näytön taajuus tai liikkeen katto, kumpi pienempi (katto 0 = ei kattoa).</summary>
        public static int Katto(int naytto, int liikeKatto) => liikeKatto > 0 ? Math.Min(naytto, liikeKatto) : naytto;

        /// <summary>Lokin nimi valinnalle (KehysMittari, `maasto liike tila`).</summary>
        public static string Nimi(Valinta v) => v == Valinta.Varjo ? "varjo" : "paa";

        /// <summary>Lokin nimi esteelle.</summary>
        public static string Nimi(Este e)
        {
            switch (e)
            {
                case Este.Ei: return "-";
                case Este.Pois: return "pois";
                case Este.Kamera: return "kamera";
                case Este.Verho: return "verho";
                case Este.Peitto: return "peitto";
                case Este.Portti: return "portti";
                case Este.Lento: return "lento";
                case Este.Saapuminen: return "saapuminen";
                default: return e.ToString();
            }
        }
    }
}
