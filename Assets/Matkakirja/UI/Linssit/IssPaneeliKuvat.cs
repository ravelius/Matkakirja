// ISS-KYTKINPANEELIN RENDERIKERROKSET (Linssiseppä 30.9.2026; Päätoimittaja: Linnanrakentaja renderöi paneelin Cyclesillä
// pikselintarkoiksi kerroksiksi, minä kokoan ne UI:hin). Sopimus Linnanrakentajan kanssa 30.9.:
//   kansio Resources/IssPaneeli/<asettelu>/ (asettelu puhelin | tabletti; puhelin @3x, tabletti @2x)
//   pohja-vasen.png, pohja-keski.png (64 px, toistuu saumatta), pohja-oikea.png: vain paikallaan pysyvät osat
//   osa-nopeus-0…3.png (−60°, −20°, 20°, 60°), osa-nuppi-00…23.png (15° myötäpäivään, 00 = ylös), osa-painike-ylos|alas.png,
//   osa-vipu-ylos|alas.png, osa-kansi-0…5.png (0°…110°): liikkuvat osat varjoineen läpinäkyvinä
//   valo-live-vihrea|live-meripihka|kohde|poistu|legendat|paneeli|avain.png: kytkinryhmän kokoiset valokerrokset
//   (puhelin 402 × 168 pt, tabletti 608 × 168 pt), summataan IssValot-varjostimella
//   sprites.json: { "<asettelu>": { "ryhma_pt": [w, h], "<osa>": { "keski_pt": [x, y], "koko_pt": [w, h] }, … } }
//   (x, y pöydän vasemmasta yläkulmasta; osat: live, lukema, nopeus, pilvet, kuukausi, kohde, oma, poistu)
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
        /// <summary>Ovatko otsikot ja legendat renderissä (true → peli ei piirrä niitä). Testirenderi 30.9.: ei.</summary>
        public static bool KaiverretutTekstit = false;
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
        public static bool Paikalla(string asettelu) => Kuva(asettelu, "pohja-keski") != null && Osa(asettelu, "nopeus").HasValue;

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

        /// <summary>Osan laatikko pt:nä kytkinryhmän vasemmasta yläkulmasta (keski ± koko/2), tai null.</summary>
        public static Rect? Osa(string asettelu, string osa)
        {
            if (!(Sprites()?.GetValueOrDefault(asettelu) is Dictionary<string, object> a) || !(a.GetValueOrDefault(osa) is Dictionary<string, object> o)) return null;
            var k = Pari(o.GetValueOrDefault("keski_pt")); var s = Pari(o.GetValueOrDefault("koko_pt"));
            if (!k.HasValue || !s.HasValue) return null;
            return new Rect(k.Value - s.Value * 0.5f, s.Value);
        }

        /// <summary>Kytkinryhmän koko (pt): sprites.json ryhma_pt tai sopimuksen oletus.</summary>
        public static Vector2 Ryhma(string asettelu)
        {
            var v = Sprites()?.GetValueOrDefault(asettelu) is Dictionary<string, object> a ? Pari(a.GetValueOrDefault("ryhma_pt")) : null;
            return v ?? new Vector2(asettelu == "puhelin" ? 402f : 608f, KorkeusPt);
        }

        /// <summary>Nupin kehys kulmasta (° myötäpäivään ylhäältä): 15° askel, 24 kehystä.</summary>
        public static int NupinKehys(float kulma) => ((Mathf.RoundToInt(kulma / 15f) % 24) + 24) % 24;

        public static readonly string[] Valot = { "avain", "paneeli", "legendat", "live-vihrea", "live-meripihka", "kohde", "poistu" };
    }
}
