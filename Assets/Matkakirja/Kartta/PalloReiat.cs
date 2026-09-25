using System.Collections.Generic;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// PALLON REIÄT (omistajan löydös 119, build 14), Unity-puoli: laattojen rajat korkeuskertoimen mukaan ja magenta
    /// tausta kuvia varten. Puhtaat laskut Reikakorjaus.cs:ssä, maastouusinta ja virheloki Laattapalvelimessa.
    ///
    /// RAJAT (korjaus 3, komento "pallo rajat paalle|pois [m]", oletus päällä): tileset-varjostin nostaa maastoa
    /// (KorkeusKerroin, oletus 2), mutta Unity karsii laatan Meshin rajoista, jotka Cesium laskee nostamattomasta
    /// geometriasta (UnityPrepareRendererResources: RecalculateBounds). Jokaisen uuden laatan MeshRendererille
    /// (Cesium3DTileset.OnTileGameObjectCreated: kutsutaan, kun primitiivit MeshFiltereineen on luotu) asetetaan
    /// Renderer.localBounds = Meshin rajat laajennettuina marginaalilla (k − 1) × m kaikkiin suuntiin (m = maaston
    /// yläraja, oletus 9 000 m). Mesh ei muutu (Cesium kierrättää Meshit poolissa), joten laajennus lasketaan aina
    /// Meshin rajoista: kertoimen muuttuessa (KorkeusKerroin.Muuttui, komento "korkeus n") ja komennolla kaikki ladatut
    /// laatat päivitetään; k ≤ 1 tai pois → ResetLocalBounds (Meshin omat rajat).
    ///
    /// TAUSTA (komento "pallo tausta magenta|pois", oletus pois): pelin kameran tyhjennys magentaksi, jotta reiät erottuvat
    /// kuvissa varmasti. Vain piirron ajaksi (RenderPipelineManager.begin/endCameraRendering; URP lukee tyhjennyksen
    /// ja karsii näiden välissä), joten pelin omat taustan asettajat (Aurinko: usva ja lennon taivas eli skybox,
    /// RadioMastot, KarttaKerrokset.Taustavari) eivät häiriinny. Lennon skybox ohitetaan (SolidColor), ja pallon taakse
    /// piirtyvät linssien tähtitaivas (Tahtitaivas) ja astronautin ilmakehän hehku (Ilmakeha) piilotetaan piirron ajaksi.
    /// Muuta pallon taakse ei piirry: napakannet ovat pinnalla, usva on sumua (ei koske taustaan).
    /// </summary>
    public class PalloReiat : MonoBehaviour
    {
        public static PalloReiat Instanssi { get; private set; }

        /// <summary>Laattojen rajojen laajennus (komento "pallo rajat paalle|pois").</summary>
        public static bool RajatPaalla = true;
        /// <summary>Maaston yläraja metreinä marginaaliin (komento "pallo rajat paalle &lt;m&gt;", oletus 9 000).</summary>
        public static float KorkeusM = (float)Reikakorjaus.OletusKorkeusM;
        /// <summary>Magenta tausta (komento "pallo tausta magenta|pois").</summary>
        public static bool Magenta;

        static readonly Color MagentaVari = new Color(1f, 0f, 1f, 1f);
        /// <summary>Pallon taakse piirtyvät oliot, jotka piilotetaan magenta-tilan piirron ajaksi (linssit luovat nämä).</summary>
        static readonly string[] TaustanOliot = { "Tahtitaivas", "Ilmakeha" };

        /// <summary>Editorin pelitila ilman domain reloadia: kokeilut eivät jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut()
        {
            RajatPaalla = true;
            KorkeusM = (float)Reikakorjaus.OletusKorkeusM;
            Magenta = false;
        }

        /// <summary>Kohtaus ilman tätä komponenttia (Pallo.unity ennen löydöstä 119): liitetään pallon tilesetiin ajossa.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Liita()
        {
            var kk = KarttaKerrokset.Instanssi;
            var pallo = kk != null && kk.pallo != null ? kk.pallo : FindAnyObjectByType<Cesium3DTileset>();
            if (pallo == null || pallo.GetComponent<PalloReiat>() != null) return;
            pallo.gameObject.AddComponent<PalloReiat>();
        }

        /// <summary>Voimassa oleva marginaali metreinä: (k − 1) × <see cref="KorkeusM"/>, 0 = ei laajennusta.</summary>
        public static float MarginaaliM => RajatPaalla ? (float)Reikakorjaus.Marginaali(KorkeusKerroin.Arvo, KorkeusM) : 0f;

        /// <summary>Komento "pallo rajat paalle|pois [m]": kytkin, valinnainen maaston yläraja ja kaikki laatat heti.</summary>
        public static void Rajat(bool paalle, float korkeusM = float.NaN)
        {
            RajatPaalla = paalle;
            if (!float.IsNaN(korkeusM) && korkeusM > 0f) KorkeusM = korkeusM;
            Instanssi?.Paivita();
        }

        Cesium3DTileset tileset;
        float maailmaaMetrilla = 1f;
        float voimassa = -1f;   // viimeksi kaikille laatoille asetettu marginaali (m); -1 = ei vielä
        readonly List<MeshRenderer> puskuri = new List<MeshRenderer>();

        void OnEnable()
        {
            Instanssi = this;
            tileset = GetComponent<Cesium3DTileset>();
            var g = GetComponentInParent<CesiumGeoreference>();
            if (g != null) { float s = g.transform.lossyScale.x; maailmaaMetrilla = s > 0f ? s : 1f; }
            if (tileset != null) tileset.OnTileGameObjectCreated += Luotu;
            KorkeusKerroin.Muuttui += Paivita;
            RenderPipelineManager.beginCameraRendering += PiirtoAlkaa;
            RenderPipelineManager.endCameraRendering += PiirtoLoppuu;
            voimassa = -1f;
            Paivita();
        }

        void OnDisable()
        {
            if (tileset != null) tileset.OnTileGameObjectCreated -= Luotu;
            KorkeusKerroin.Muuttui -= Paivita;
            RenderPipelineManager.beginCameraRendering -= PiirtoAlkaa;
            RenderPipelineManager.endCameraRendering -= PiirtoLoppuu;
            Palauta();
            if (Instanssi == this) Instanssi = null;
        }

        /// <summary>Uusi laatta (Cesium3DTileset.OnTileGameObjectCreated): rajat laajennettuina, jos marginaali &gt; 0.</summary>
        void Luotu(GameObject laatta)
        {
            float m = MarginaaliM;
            if (laatta == null || m <= 0f) return;
            laatta.GetComponentsInChildren(true, puskuri);
            foreach (var r in puskuri) Aseta(r, m);
            puskuri.Clear();
        }

        /// <summary>Kaikki ladatut laatat uudelleen (kerroin tai kytkin muuttui).</summary>
        public void Paivita()
        {
            if (tileset == null) return;
            float m = MarginaaliM;
            if (m <= 0f && voimassa <= 0f) { voimassa = m; return; }   // ei laajennusta ennen eikä nyt
            tileset.GetComponentsInChildren(true, puskuri);
            foreach (var r in puskuri) Aseta(r, m);
            puskuri.Clear();
            voimassa = m;
        }

        void Aseta(MeshRenderer r, float marginaaliM)
        {
            if (r == null) return;
            if (marginaaliM <= 0f) { r.ResetLocalBounds(); return; }
            var mf = r.GetComponent<MeshFilter>();
            var mesh = mf != null ? mf.sharedMesh : null;
            if (mesh == null) return;
            Bounds b = mesh.bounds;
            Vector3 s = r.transform.lossyScale;
            float yksikko = Mathf.Min(Mathf.Abs(s.x), Mathf.Min(Mathf.Abs(s.y), Mathf.Abs(s.z)));
            float lm = (float)Reikakorjaus.PaikallinenMarginaali(marginaaliM, maailmaaMetrilla, yksikko);
            var e = Reikakorjaus.Laajenna((b.extents.x, b.extents.y, b.extents.z), lm);
            r.localBounds = new Bounds(b.center, new Vector3(e.x * 2f, e.y * 2f, e.z * 2f));
        }

        // ---- Magenta tausta (vain piirron ajaksi) ----

        Camera piirrettava;
        CameraClearFlags alkuLiput;
        Color alkuVari;
        readonly List<Renderer> piilossa = new List<Renderer>();
        readonly List<Renderer> taustanPuskuri = new List<Renderer>();

        void PiirtoAlkaa(ScriptableRenderContext _, Camera c)
        {
            if (!Magenta || c == null || c.cameraType != CameraType.Game || c != Camera.main) return;
            if (piirrettava != null) Palauta();
            piirrettava = c;
            alkuLiput = c.clearFlags;
            alkuVari = c.backgroundColor;
            c.clearFlags = CameraClearFlags.SolidColor;
            c.backgroundColor = MagentaVari;
            foreach (var nimi in TaustanOliot)
            {
                var go = GameObject.Find(nimi);
                if (go == null) continue;
                go.GetComponentsInChildren(false, taustanPuskuri);
                foreach (var r in taustanPuskuri)
                    if (r.enabled) { r.enabled = false; piilossa.Add(r); }
                taustanPuskuri.Clear();
            }
        }

        void PiirtoLoppuu(ScriptableRenderContext _, Camera c)
        {
            if (piirrettava != null && c == piirrettava) Palauta();
        }

        /// <summary>Kameran oma tyhjennys ja piilotetut taustan oliot takaisin (pelin skriptit näkevät aina omat arvonsa).</summary>
        void Palauta()
        {
            if (piirrettava != null)
            {
                piirrettava.clearFlags = alkuLiput;
                piirrettava.backgroundColor = alkuVari;
                piirrettava = null;
            }
            foreach (var r in piilossa) if (r != null) r.enabled = true;
            piilossa.Clear();
        }

        /// <summary>Tila lokiin (komennot "pallo rajat …" ja "pallo tausta …"): kytkimet, marginaali ja esimerkkilaatta.</summary>
        public static string Kuvaus()
        {
            var p = Instanssi;
            int laattoja = 0;
            string esim = "";
            if (p != null && p.tileset != null)
            {
                p.tileset.GetComponentsInChildren(true, p.puskuri);
                laattoja = p.puskuri.Count;
                foreach (var r in p.puskuri)
                {
                    var mf = r.GetComponent<MeshFilter>();
                    if (mf == null || mf.sharedMesh == null) continue;
                    esim = $", esim. mesh ±{mf.sharedMesh.bounds.extents} → rajat ±{r.localBounds.extents}";
                    break;
                }
                p.puskuri.Clear();
            }
            return $"MATKAKIRJA pallo: rajat {(RajatPaalla ? "päällä" : "pois")} (kerroin {KorkeusKerroin.Arvo:0.##}, " +
                   $"korkeus {KorkeusM:0} m → marginaali {MarginaaliM:0} m), laattojen renderöijiä {laattoja}{esim}; " +
                   $"tausta {(Magenta ? "magenta" : "pelin oma")}" + (p == null ? " (PalloReiat puuttuu: ei tilesetiä)" : "");
        }
    }
}
