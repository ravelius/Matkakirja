// PUHUJAKUVA (Natiivi-UI 5.10.2026; omistajan päätös 14.3x, kortti "Ensin kappelin koe"): linnan dialogin puhujan muotokuva
// "ilman rajoja ja neliömallia niin, että reunoja häivytetään ja se näkyisi aina kulloinkin puhuvan henkilön yläreunassa".
// Pohja: kehyksetön kuva, pehmeä ellipsimaski (alfa lasketaan kuvaan kerran, ei kehystä eikä nappimuotoa), ankkuri puhujan pään
// yläpuolella maailmasta ruudulle joka ruudulla, häivytys sisään/ulos 200 ms (--tk-kesto-sulku), vaihto puhujan mukana
// ristiinhäivyttäen, leveys ~22 % ruudun lyhyemmästä sivusta (72–140 pt, pieni peitto).
// Kytkentä (Siirtoseppä): Ankkuri = () => DioraamaHahmot3D.PuhujanPaa, Kamera = () => DioraamaSovitin.AktiivinenKamera ja
// Aseta(henkiloId, ilme) / Aseta(null) vuoron vaihtuessa. Kuvat: Resources/Puhujakuvat/<henkilö>-<ilme> (Codex; paikkamerkit
// Linnanrakentajan referensseistä), puuttuva ilme → <henkilö>-neutraali → <henkilö>.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Puhujakuva
    {
        /// <summary>Puhujan pään maailmapiste (null = ei puhujaa näkyvissä).</summary>
        public static Func<Vector3?> Ankkuri;
        /// <summary>Kamera, jolla maailmapiste viedään ruudulle.</summary>
        public static Func<Camera> Kamera;
        /// <summary>Viimeksi luotu (DioraamaTaulu); Siirtosepän kytkentä ja testikomento.</summary>
        public static Puhujakuva Viimeisin { get; private set; }

        const float Osuus = 0.22f, MinLeveys = 72f, MaxLeveys = 140f, Korkeussuhde = 1.2f, Rako = 6f;
        const int HaivytysMs = 200;

        readonly VisualElement kuva;
        string nykyinen;           // "henkilö-ilme" tai null
        Texture2D maskattu;
        Vector2? testiPiste;       // testi: ruudun piste ilman ankkuria
        IVisualElementScheduledItem vaihto;
        static readonly Dictionary<string, Texture2D> valimuisti = new Dictionary<string, Texture2D>();

        public Puhujakuva(VisualElement isa)
        {
            kuva = Rakenne.El("mk-puhujakuva", isa, PickingMode.Ignore);
            kuva.style.opacity = 0f;
            kuva.style.display = DisplayStyle.None;
            kuva.schedule.Execute(Asettele).Every(0);
            Viimeisin = this;
        }

        public string Nykyinen => nykyinen;

        /// <summary>Puhuja ja ilme (null = ei puhujaa: kuva häipyy). Sama puhuja ja ilme ei tee mitään.</summary>
        public void Aseta(string henkilo, string ilme = null)
        {
            Texture2D t = null;
            string avain = null;
            if (!string.IsNullOrEmpty(henkilo))
            {
                string i = string.IsNullOrEmpty(ilme) ? "neutraali" : ilme;
                foreach (var nimi in new[] { henkilo + "-" + i, henkilo + "-neutraali", henkilo })
                    if ((t = Lataa(nimi)) != null) { avain = nimi; break; }
                if (t == null) Debug.Log($"MATKAKIRJA linssit: puhujakuva puuttuu: {henkilo}-{i}");
            }
            if (avain == nykyinen) return;
            nykyinen = avain;
            Vaihda(t);
        }

        /// <summary>Testi `ui puhujakuva &lt;kuva&gt; [x y]|pois`: kuva ruudun pisteeseen (pt) tai ankkuriin.</summary>
        internal static string Testi(string loput)
        {
            var p = Viimeisin;
            if (p == null) return "puhujakuva: dioraamataulua ei ole (avaa linna)";
            var o = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            if (o.Length == 0 || o[0] == "pois") { p.testiPiste = null; p.nykyinen = null; p.Vaihda(null); return "puhujakuva: pois"; }
            p.testiPiste = o.Length >= 3 && float.TryParse(o[1], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var x)
                && float.TryParse(o[2], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var y)
                ? new Vector2(x, y) : (Vector2?)null;
            var t = Lataa(o[0]);
            if (t == null) return "puhujakuva: kuvaa ei löydy: Resources/Puhujakuvat/" + o[0];
            p.nykyinen = o[0];
            p.Vaihda(t);
            return "puhujakuva: " + o[0] + (p.testiPiste.HasValue ? $" pisteessä {p.testiPiste.Value.x:0} {p.testiPiste.Value.y:0}" : " ankkurissa");
        }

        static Texture2D Lataa(string nimi)
        {
            if (valimuisti.TryGetValue(nimi, out var m)) return m;
            var lahde = Resources.Load<Texture2D>("Puhujakuvat/" + nimi);
            m = lahde != null ? Maskaa(lahde) : null;
            valimuisti[nimi] = m;
            return m;
        }

        /// <summary>
        /// Pehmeä ellipsimaski kuvan alfaan (kerran per kuva): täysi peitto keskellä, häivytys reunaan; lähdekuvan ei tarvitse
        /// olla luettava (GPU-kopio RenderTexturen kautta). Enintään 256 px lyhyempi sivu.
        /// </summary>
        static Texture2D Maskaa(Texture2D lahde)
        {
            float s = Mathf.Min(1f, 256f / Mathf.Min(lahde.width, lahde.height));
            int w = Mathf.Max(8, Mathf.RoundToInt(lahde.width * s)), h = Mathf.Max(8, Mathf.RoundToInt(lahde.height * s));
            var rt = RenderTexture.GetTemporary(w, h, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            var ennen = RenderTexture.active;
            Graphics.Blit(lahde, rt);
            RenderTexture.active = rt;
            var t = new Texture2D(w, h, TextureFormat.RGBA32, false, false) { wrapMode = TextureWrapMode.Clamp, name = lahde.name + " (puhujakuva)" };
            t.ReadPixels(new Rect(0, 0, w, h), 0, 0);
            RenderTexture.active = ennen;
            RenderTexture.ReleaseTemporary(rt);
            var px = t.GetPixels32();
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    float dx = (x + 0.5f) / w * 2f - 1f, dy = (y + 0.5f) / h * 2f - 1f;
                    float r = Mathf.Sqrt(dx * dx + dy * dy);
                    float a = 1f - Mathf.SmoothStep(0f, 1f, Mathf.InverseLerp(0.55f, 1f, r));
                    int i = y * w + x;
                    px[i].a = (byte)Mathf.RoundToInt(px[i].a * a);
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return t;
        }

        void Vaihda(Texture2D t)
        {
            vaihto?.Pause();
            bool nakyy = kuva.style.display == DisplayStyle.Flex && kuva.resolvedStyle.opacity > 0.01f;
            if (!nakyy) { Kayta(t); return; }
            // Ristiinhäivytys: vanha pois, uusi tilalle ja esiin.
            kuva.style.opacity = 0f;
            vaihto = kuva.schedule.Execute(() => Kayta(t)).StartingIn(HaivytysMs);
        }

        void Kayta(Texture2D t)
        {
            maskattu = t;
            if (t == null)
            {
                kuva.style.opacity = 0f;
                vaihto = kuva.schedule.Execute(() => { if (maskattu == null) kuva.style.display = DisplayStyle.None; }).StartingIn(HaivytysMs);
                return;
            }
            kuva.style.backgroundImage = new StyleBackground(t);
            kuva.style.display = DisplayStyle.Flex;
            Asettele();
            kuva.schedule.Execute(() => { if (maskattu == t) kuva.style.opacity = 1f; });
        }

        /// <summary>Joka ruudulla: koko ruudun lyhyemmästä sivusta ja paikka puhujan pään yläpuolelle (ruudun sisälle rajattuna).</summary>
        void Asettele()
        {
            if (maskattu == null || kuva.panel == null) return;
            var juuri = kuva.panel.visualTree.layout;
            if (!(juuri.width > 0f)) return;
            float leveys = Mathf.Clamp(Osuus * Mathf.Min(juuri.width, juuri.height), MinLeveys, MaxLeveys);
            float korkeus = leveys * Korkeussuhde;
            Vector2? piste = testiPiste;
            if (!piste.HasValue)
            {
                var a = Ankkuri?.Invoke();
                var k = Kamera?.Invoke();
                if (a.HasValue && k != null)
                {
                    var sp = k.WorldToScreenPoint(a.Value);
                    if (sp.z > 0f) piste = RuntimePanelUtils.ScreenToPanel(kuva.panel, new Vector2(sp.x, Screen.height - sp.y));
                }
            }
            if (!piste.HasValue) { kuva.style.visibility = Visibility.Hidden; return; }
            kuva.style.visibility = Visibility.Visible;
            var p = piste.Value;
            float vasen = Mathf.Clamp(p.x - leveys * 0.5f, 4f, juuri.width - leveys - 4f);
            float yla = Mathf.Clamp(p.y - korkeus - Rako, 4f, juuri.height - korkeus - 4f);
            kuva.style.left = Mathf.Round(vasen);
            kuva.style.top = Mathf.Round(yla);
            kuva.style.width = Mathf.Round(leveys);
            kuva.style.height = Mathf.Round(korkeus);
        }
    }
}
