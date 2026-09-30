// ISS-KYTKINPANEELIN RENDERIKERROKSET (Linssiseppä 30.9.2026; Päätoimittaja: Linnanrakentaja renderöi paneelin Cyclesillä
// pikselintarkoiksi kerroksiksi, minä kokoan ne UI:hin). Linnanrakentajan v1 (30.9., _valmiit/iss-paneeli/v1, kooste
// tools/linssit/blender/iss_paneeli_kooste.py), kansio Resources/IssPaneeli/<asettelu>/ (puhelin @3x, tabletti @2x):
//   pohja-vasen|keski (64 px, toistuu)|oikea.png koko pöydän leveydeltä (päädyt paaty_pt), ryhma.png keskitettynä (ryhma_pt;
//   puhelimessa 418 pt: olkapäät 8 pt reunojen yli), osa-nopeus-0…3, osa-nuppi-00…23 (15° myötäpäivään, 00 = ylös; renderöity
//   PILVET-paikalle, KUUKAUSI siirretään ankkurien erotuksella), osa-kohde|poistu-ylos|alas, osa-vipu-ylos|alas,
//   osa-kaari-0 (kiinni)…5 (auki), valo-paneeli|live-vihrea|live-meripihka|kohde|poistu|legendat-valkoinen|legendat-meripihka
//   (ryhmän kokoisina puolikoossa). Otsikot ja legendat on painettu kuviin; peli piirtää vain lukeman ja arvokilvet (<osa>-levy).
//   sprites.json: asettelut.<asettelu>.{ryhma_pt, pohja.paaty_pt, laatikot.<nimi>, osat.<kehys>} = {keski_pt, koko_pt}
//   ryhmäkuvan vasemmasta yläkulmasta.
// Jos kerroksia ei ole, IssKytkimet piirtää paikkamerkit (Painter2D) kuten ennen. A/B `astro kyyti kerrokset 0|1`.
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class IssPaneeliKuvat
    {
        /// <summary>A/B: false = paikkamerkit, vaikka kerrokset olisivat paikallaan.</summary>
        public static bool Kaytossa = true;
        /// <summary>Kytkinryhmän korkeus (pt) kummassakin asettelussa.</summary>
        public const float KorkeusPt = 168f;
        /// <summary>Ovatko otsikot ja legendat renderissä (true → peli ei piirrä niitä). v1 30.9.: kyllä (Päätoimittaja).</summary>
        public static bool KaiverretutTekstit = true;
        /// <summary>Hellä legendapulssi (legendat-kerroksen peitto 0,8…1, 3 s jakso).</summary>
        public static bool LegendaPulssi = true;

        public static string Asettelu(float ruudunLeveysPt) => ruudunLeveysPt < 600f ? "puhelin" : "tabletti";

        static readonly Dictionary<string, Texture2D> kuvat = new Dictionary<string, Texture2D>();
        static readonly HashSet<string> haetut = new HashSet<string>();
        static Dictionary<string, object> sprites;
        static bool spritesHaettu;

        /// <summary>Kerros tai null (ei kerroksia / A/B pois).</summary>
        public static Texture2D Kuva(string asettelu, string nimi)
        {
            if (!Kaytossa) return null;
            string avain = asettelu + "/" + nimi;
            if (!haetut.Contains(avain)) { haetut.Add(avain); kuvat[avain] = Resources.Load<Texture2D>("IssPaneeli/" + avain); }
            return kuvat[avain];
        }

        /// <summary>Onko asettelun renderöity pohja paikallaan (kerrostila päälle).</summary>
        public static bool Paikalla(string asettelu) => Kuva(asettelu, "ryhma") != null && Osa(asettelu, "nopeus").HasValue;

        static Dictionary<string, object> Sprites()
        {
            if (!spritesHaettu)
            {
                spritesHaettu = true;
                var t = Resources.Load<TextAsset>("IssPaneeli/sprites");
                if (t != null)
                    try { sprites = MiniJson.Jasenna(t.text) as Dictionary<string, object>; }
                    catch (System.FormatException e) { Debug.LogWarning("MATKAKIRJA iss-paneeli: sprites.json ei jäsenny: " + e.Message); }
            }
            return sprites;
        }

        static Vector2? Pari(object o) =>
            o is List<object> l && l.Count >= 2 && l[0] is double a && l[1] is double b ? new Vector2((float)a, (float)b) : (Vector2?)null;

        static Dictionary<string, object> Asetteluna(string asettelu) =>
            (Sprites()?.GetValueOrDefault("asettelut") as Dictionary<string, object>)?.GetValueOrDefault(asettelu) as Dictionary<string, object>;

        static Rect? Laatikko(object o)
        {
            if (!(o is Dictionary<string, object> d)) return null;
            var k = Pari(d.GetValueOrDefault("keski_pt")); var s = Pari(d.GetValueOrDefault("koko_pt"));
            if (!k.HasValue || !s.HasValue) return null;
            return new Rect(k.Value - s.Value * 0.5f, s.Value);
        }

        /// <summary>Laatikko (osuma-ala, otsikko, levy, kupu, lukema…) pt:nä ryhmän vasemmasta yläkulmasta, tai null.</summary>
        public static Rect? Osa(string asettelu, string nimi) =>
            Laatikko((Asetteluna(asettelu)?.GetValueOrDefault("laatikot") as Dictionary<string, object>)?.GetValueOrDefault(nimi));

        /// <summary>Liikkuvan osan kuvakehyksen laatikko (osat.<kehys>, esim. nuppi-00), tai null.</summary>
        public static Rect? Kehys(string asettelu, string kehys) =>
            Laatikko((Asetteluna(asettelu)?.GetValueOrDefault("osat") as Dictionary<string, object>)?.GetValueOrDefault(kehys));

        /// <summary>Kytkinryhmän koko (pt): ryhma_pt tai oletus.</summary>
        public static Vector2 Ryhma(string asettelu) =>
            Pari(Asetteluna(asettelu)?.GetValueOrDefault("ryhma_pt")) ?? new Vector2(asettelu == "puhelin" ? 418f : 600f, KorkeusPt);

        /// <summary>Pohjan päädyn leveys (pt).</summary>
        public static float Paaty(string asettelu) =>
            (Asetteluna(asettelu)?.GetValueOrDefault("pohja") as Dictionary<string, object>)?.GetValueOrDefault("paaty_pt") is double d ? (float)d : 24f;

        /// <summary>Nupin kehys kulmasta (° myötäpäivään ylhäältä): 15° askel, 24 kehystä.</summary>
        public static int NupinKehys(float kulma) => ((Mathf.RoundToInt(kulma / 15f) % 24) + 24) % 24;

    }
}
