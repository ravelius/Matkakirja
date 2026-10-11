// VIDEOPELIKOHTEET (Natiivi-UI; omistaja 11.10.2026 Päätoimittajan kautta, juna 182): kartan kohteet, jotka ovat sekä nähtävyys
// että pelattava videopeli, saavat sinisen videopelimuunnelman (tyylikirja teemat.videopeli): nostokortti (Nostokortti,
// mk-nosto--videopeli, kimmel) ja kartan merkki (NostotKartalla: sininen hehkurengas merkin alla, hillitty syke). Ensimmäisenä
// Olavinlinna (pelattava pala, SeikkailuTapit.AvaaPelaajalle).
using System;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

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

        /// <summary>"Vähennä liikettä" -syke: hehku himmenee ja kirkastuu vuorotellen (siirtymä 2,4 s USS:ssä, ympäristöanimaatio).</summary>
        public const long SykeValiMs = 4000;

        /// <summary>
        /// SYKÄYS (omistaja 11.10.2026 klo 17.0x PT:n kautta: "sykkiikö … jotta se houkuttelee tarpeeksi klikkaamaan", juna 182):
        /// kertasykkeen rengaspohjalla (IssPiirros.Syke / web .astro-iss-syke) noin 3 s:n välein sininen rengas laajenee
        /// 1 → 1,35 ja haihtuu 0,9 s:ssa (ease-out); perusrengas pysyy. "Vähennä liikettä" → vanha hidas häivytys. Ei herätä
        /// ruudunpäivitystä: kartan levossa (Ruudunpaivitys PAIKALLAAN) syke jäätyy kuten ennenkin.
        /// </summary>
        public const float SykaisyValiS = 3f, SykaisyKestoS = 0.9f, SykaisyMittakaava = 1.35f, SykaisyAlkuPeitto = 0.9f;

        /// <summary>Sykäyksen mittakaava ja peitto hetkellä t (s) jakson alusta; jakson lopussa (t ≥ kesto) rengas on haihtunut.</summary>
        public static (float Mittakaava, float Peitto) Sykaisy(float t)
        {
            if (t < 0f || t >= SykaisyKestoS) return (SykaisyMittakaava, 0f);
            float u = t / SykaisyKestoS, k = 1f - (1f - u) * (1f - u);
            return (1f + (SykaisyMittakaava - 1f) * k, SykaisyAlkuPeitto * (1f - k));
        }

        /// <summary>Testikomento `ui sykaisy <t>|pois`: sykäys pysäytettynä hetkeen t (kuvat alku, laajimmillaan, haihtunut).</summary>
        public static float? PakotettuT;

        const string AaltoNimi = "videopeli-aalto";

        /// <summary>Kytkee hehkuun (videopeliluokalla) laajenevan aaltorenkaan; kutsu toistuvasti turvallinen.</summary>
        public static void KytkeSykaisy(VisualElement hehku)
        {
            if (hehku == null || hehku.Q(AaltoNimi) != null) return;
            // Terävä 2 pt:n rengas perusrenkaan säteellä (mk-videopeli-aalto), kuten IssPiirros.Syke; pehmeä hehku jäi stilleissä
            // erottumattomaksi (simuajo a3c912f4).
            var aalto = new VisualElement { name = AaltoNimi, pickingMode = PickingMode.Ignore };
            aalto.AddToClassList("mk-videopeli-aalto");
            aalto.style.opacity = 0f;
            hehku.Add(aalto);
            hehku.schedule.Execute(() =>
            {
                bool paalla = hehku.ClassListContains("mk-nosto-merkki__hehku--videopeli") && hehku.panel != null
                              && hehku.resolvedStyle.display != DisplayStyle.None && !LinssiUi.VahennettyLiike();
                if (!paalla) { if (aalto.style.opacity != 0f) aalto.style.opacity = 0f; return; }
                var (m, p) = Sykaisy(PakotettuT ?? Time.unscaledTime % SykaisyValiS);
                aalto.style.scale = new Scale(new Vector2(m, m));
                aalto.style.opacity = p;
            }).Every(16);
        }

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
