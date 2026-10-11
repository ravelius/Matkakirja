// VIDEOPELIKOHTEET (Natiivi-UI; omistaja 11.10.2026 Päätoimittajan kautta, juna 182): kartan kohteet, jotka ovat sekä nähtävyys
// että pelattava videopeli, saavat sinisen videopelimuunnelman (tyylikirja teemat.videopeli): nostokortti (Nostokortti,
// mk-nosto--videopeli, kimmel) ja kartan merkki (NostotKartalla: sininen hehkurengas merkin alla, hillitty syke). Ensimmäisenä
// Olavinlinna (pelattava pala, SeikkailuTapit.AvaaPelaajalle).
using System;
using Matkakirja.Peli.Pelit;
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

        /// <summary>Kohdenosto (laji Kohde, tunnus ilman etuliitettä) videopelikohteena; myös lautapelinosto.</summary>
        public static bool Kohde(Nosto n) => n != null && n.Laji == NostoLaji.Kohde && (Valo("kohde:" + n.Id) || Lautapeli(n) != null);

        /// <summary>Lautapelinoston valotunnuksen etuliite (Lautapelinostot → Nostokortti.Avaa("peli:mylly")).</summary>
        public const string PeliEtuliite = "peli:";
        const string PeliId = "peli-";

        /// <summary>
        /// LAUTAPELINOSTON KORTTI (PT 11.10.2026: "tee molemmat"): videopeliteeman nostokortti, otsikkona pelin nimi, lyhyt
        /// esittely ensimmäisen laudan historiatekstistä (Peliluettelo, Sisältökirjuri/Siirtoseppä) ja ilmainen Pelaa-nappi.
        /// </summary>
        public static Nosto Lautapelinosto(string valo)
        {
            var p = valo != null && valo.StartsWith(PeliEtuliite, StringComparison.Ordinal) ? Peliluettelo.Hae(valo.Substring(PeliEtuliite.Length)) : null;
            if (p == null) return null;
            return new Nosto
            {
                Laji = NostoLaji.Kohde, Id = PeliId + p.Id, Iso = p.Maat.Length > 0 ? p.Maat[0].Maa : null, Kaupunki = p.Koti,
                Luokka = Kieli.T("ui.lautapelinosto.luokka"), Otsikko = p.Nimi, Teksti = p.Laudat.Length > 0 ? p.Laudat[0].Historia : null,
            };
        }

        /// <summary>Lautapelinoston peli, tai null.</summary>
        public static PeliKuvaus Lautapeli(Nosto n) =>
            n != null && n.Id != null && n.Id.StartsWith(PeliId, StringComparison.Ordinal) ? Peliluettelo.Hae(n.Id.Substring(PeliId.Length)) : null;

        /// <summary>Lautapelin avaus suoraan (aina ilmainen).</summary>
        public static void AvaaLautapeli(PeliKuvaus p)
        {
            Debug.Log("MATKAKIRJA videopelit: lautapeli " + p.Id);
            if (p == Peliluettelo.Mylly) MyllyNakyma.AvaaPeli(p.Id);
            else if (p == Peliluettelo.Tavli) TavliNakyma.AvaaPeli(p.Id);
        }

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
