// VIDEOPELIKOHTEET (Natiivi-UI; omistaja 11.10.2026 Päätoimittajan kautta, juna 182): kartan kohteet, jotka ovat sekä nähtävyys
// että pelattava videopeli, saavat sinisen videopelimuunnelman (tyylikirja teemat.videopeli): nostokortti (Nostokortti,
// mk-nosto--videopeli, kimmel) ja kartan merkki (NostotKartalla: sininen hehkurengas merkin alla, hillitty syke). Ensimmäisenä
// Olavinlinna (pelattava pala, SeikkailuTapit.AvaaPelaajalle).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Videopelit
    {
        /// <summary>Videopelikohteiden valotunnukset ilman maaliitettä (kohde:olavinlinna@FI → kohde:olavinlinna).</summary>
        static readonly string[] Valot = { "kohde:olavinlinna" };

        /// <summary>Onko kartan valo (noston tunnus) videopelikohde.</summary>
        public static bool Valo(string id)
        {
            if (string.IsNullOrEmpty(id)) return false;
            int at = id.IndexOf('@');
            string v = at >= 0 ? id.Substring(0, at) : id;
            return System.Array.IndexOf(Valot, v) >= 0;
        }

        /// <summary>Kohdenosto (laji Kohde, tunnus ilman etuliitettä) videopelikohteena.</summary>
        public static bool Kohde(Nosto n) => n != null && n.Laji == NostoLaji.Kohde && Valo("kohde:" + n.Id);

        /// <summary>Syke: hehku himmenee ja kirkastuu vuorotellen (siirtymä 2,4 s USS:ssä, ympäristöanimaatio).</summary>
        public const long SykeValiMs = 4000;

        const int Koko = 96;
        static Texture2D hehku;

        /// <summary>
        /// Merkin sininen hehku renkaana (keskus läpinäkyvä, jottei 3D-malli haalistu; vrt. pääkohteen kultainen MusteJaljet.Hehku):
        /// videopeli-korostus, peitto renkaan huipulla 0,6.
        /// </summary>
        public static Texture2D Hehku()
        {
            if (hehku != null) return hehku;
            var c = Tyylikirja.Videopeli.Korostus;
            var px = new Color32[Koko * Koko];
            for (int y = 0; y < Koko; y++)
                for (int x = 0; x < Koko; x++)
                {
                    float cx = (x + 0.5f) / Koko * 2f - 1f, cy = (y + 0.5f) / Koko * 2f - 1f, r = Mathf.Sqrt(cx * cx + cy * cy);
                    float d = (r - 0.6f) / 0.2f, a = Mathf.Exp(-d * d) * Mathf.Clamp01((1f - r) * 6f) * 0.6f;
                    c.a = (byte)Mathf.RoundToInt(a * 255f);
                    px[y * Koko + x] = c;
                }
            hehku = new Texture2D(Koko, Koko, TextureFormat.RGBA32, true, false)
                { name = "Videopelin hehku", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
            hehku.SetPixels32(px);
            hehku.Apply(true, true);
            return hehku;
        }
    }
}
