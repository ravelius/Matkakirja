// KUUMAILMAPALLON KORINÄKYMÄ (omistaja 7.10.2026 klo 09.1x, Päätoimittaja: kokeilu Prahassa, ei junaan ennen kuittausta).
// Kaupunkitilassa (OpasSovitin.Kaupunkitila) kuva on kuin vanhan pallon korista: alalaidassa punotun korin nahkareunus (~12 %
// ruudun korkeudesta) ja sivuilla kaksi köyttä nousee kuvan yläpuolelle. Kori ja köydet piirretään omalla overlay-kameralla
// (kerros Kerros, URP-kamerapino) kaupunkikameran päälle, joten ne eivät uppoa rakennuksiin; ohjaimet (UI Toolkit) jäävät päälle.
// Liike: Ydin KoriLiike (keinunta ~1° / 5 s, jousi vastasuuntaan kiihdytyksissä, köydet viiveellä); kaupunki ja horisontti
// pysyvät vakaina, koska vain overlay-kameran lapset kääntyvät. Kiihtyvyys kaupunkikameran paikasta (2. derivaatta,
// alipäästö); origon siirto (siirtymä toiseen paikkaan) nollaa historian.
// PAIKKAMERKKI: laatikot ja sylinterit PalloKori-varjostimella, kunnes Linnanrakentajan GLB (kori + 2 köyttä) tulee.
// A/B: komento `opas kori 0|1`.
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class PalloKori
    {
        public const int Kerros = 16;
        /// <summary>A/B (komento `opas kori 0|1`); kaupunkitilassa oletuksena päällä tässä kokeessa.</summary>
        public static bool Paalla = true;
        /// <summary>Etäisyys kamerasta korin etureunaan (m); näkymäkulma ratkaisee koon.</summary>
        const float EtaisyysM = 0.8f;
        /// <summary>Korin reunan yläreuna ruudun alalaidasta, osuutena ruudun korkeudesta (Päätoimittaja: ~12 %).</summary>
        const float ReunaOsuus = 0.12f;
        const float KiihtyvyysAikavakioS = 0.15f, HyppyM = 300f;

        readonly KoriLiike liike = new KoriLiike();
        Camera perus, overlay;
        Transform juuri, koriKaanto, koysiKaanto;
        Material punos, nahka, koysi;
        float fov = -1, aspect = -1;
        Vector3 edPaikka, edNopeus, kiihtyvyys;
        int historia;
        bool kaytossa;

        public bool Nakyy => kaytossa && juuri != null && juuri.gameObject.activeSelf;
        public KoriLiike Liike => liike;

        /// <summary>Joka kehys oppaasta: kaytossa = kaupunkitila ja näkymä auki.</summary>
        public void Kayta(bool paalla, Camera kamera)
        {
            paalla &= Paalla && kamera != null;
            if (paalla && (perus != kamera || overlay == null)) Luo(kamera);
            if (paalla == kaytossa) return;
            kaytossa = paalla;
            if (juuri != null) juuri.gameObject.SetActive(paalla);
            if (overlay != null) overlay.enabled = paalla;
            historia = 0;
            if (paalla) RenderPipelineManager.beginCameraRendering += EnnenPiirtoa;
            else RenderPipelineManager.beginCameraRendering -= EnnenPiirtoa;
        }

        public void Sulje()
        {
            Kayta(false, null);
            if (perus != null && overlay != null)
            {
                var d = perus.GetUniversalAdditionalCameraData();
                if (d != null) d.cameraStack.Remove(overlay);
            }
            if (overlay != null) Object.Destroy(overlay.gameObject);
            foreach (var m in new[] { punos, nahka, koysi }) if (m != null) Object.Destroy(m);
            overlay = null; juuri = null; perus = null; punos = nahka = koysi = null; fov = aspect = -1;
        }

        void Luo(Camera kamera)
        {
            Sulje();
            perus = kamera;
            var go = new GameObject("Pallon kori (overlay)") { layer = Kerros };
            go.transform.SetParent(kamera.transform, false);
            overlay = go.AddComponent<Camera>();
            overlay.clearFlags = CameraClearFlags.Depth;
            overlay.cullingMask = 1 << Kerros;
            overlay.nearClipPlane = 0.05f; overlay.farClipPlane = 20f;
            overlay.GetUniversalAdditionalCameraData().renderType = CameraRenderType.Overlay;
            var pd = kamera.GetUniversalAdditionalCameraData();
            if (pd != null && !pd.cameraStack.Contains(overlay)) pd.cameraStack.Add(overlay);
            var sh = Shader.Find("Matkakirja/Linssit/PalloKori");
            punos = Materiaali(sh, new Color(0.55f, 0.40f, 0.24f), 1, new Vector4(60, 6, 0, 0));
            nahka = Materiaali(sh, new Color(0.30f, 0.17f, 0.09f), 0, Vector4.one);
            koysi = Materiaali(sh, new Color(0.62f, 0.52f, 0.36f), 2, new Vector4(1, 40, 0, 0));
            juuri = new GameObject("Kori") { layer = Kerros }.transform;
            juuri.SetParent(go.transform, false);
            koriKaanto = new GameObject("Korin kääntö") { layer = Kerros }.transform;
            koriKaanto.SetParent(juuri, false);
            koysiKaanto = new GameObject("Köysien kääntö") { layer = Kerros }.transform;
            koysiKaanto.SetParent(juuri, false);
        }

        static Material Materiaali(Shader sh, Color c, float kuvio, Vector4 toisto)
        {
            var m = new Material(sh != null ? sh : Shader.Find("Universal Render Pipeline/Unlit"));
            m.SetColor("_Vari", c); m.SetFloat("_Kuvio", kuvio); m.SetVector("_Toisto", toisto);
            return m;
        }

        /// <summary>Paikkamerkin geometria näkymäkulman mukaan (reunan yläreuna ReunaOsuus ruudun alalaidasta).</summary>
        void Rakenna()
        {
            foreach (Transform t in koriKaanto) Object.Destroy(t.gameObject);
            foreach (Transform t in koysiKaanto) Object.Destroy(t.gameObject);
            float h = EtaisyysM * Mathf.Tan(fov * 0.5f * Mathf.Deg2Rad), w = h * aspect;
            float yla = -h + 2 * h * ReunaOsuus, nahkaK = 0.05f * h;
            Laatikko(koriKaanto, punos, new Vector3(0, (yla - nahkaK + -1.6f * h) * 0.5f, EtaisyysM + 0.02f), new Vector3(2.6f * w, (yla - nahkaK) + 1.6f * h, 0.04f));
            Laatikko(koriKaanto, nahka, new Vector3(0, yla - nahkaK * 0.5f, EtaisyysM - 0.005f), new Vector3(2.6f * w, nahkaK, 0.06f));
            foreach (float s in new[] { -1f, 1f })
            {
                var ala = new Vector3(s * 0.86f * w, yla, EtaisyysM + 0.05f);
                var ylos = new Vector3(s * 0.62f * w, 2.2f * h, EtaisyysM + 0.6f);
                Koysi(koysiKaanto, ala, ylos, 0.012f * h);
            }
        }

        void Laatikko(Transform v, Material m, Vector3 p, Vector3 koko)
        {
            var g = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Object.Destroy(g.GetComponent<Collider>());
            g.layer = Kerros; g.transform.SetParent(v, false);
            g.transform.localPosition = p; g.transform.localScale = koko;
            var r = g.GetComponent<MeshRenderer>(); r.sharedMaterial = m; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
        }

        void Koysi(Transform v, Vector3 a, Vector3 b, float sade)
        {
            var g = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            Object.Destroy(g.GetComponent<Collider>());
            g.layer = Kerros; g.transform.SetParent(v, false);
            g.transform.localPosition = (a + b) * 0.5f;
            g.transform.localRotation = Quaternion.FromToRotation(Vector3.up, (b - a).normalized);
            g.transform.localScale = new Vector3(2 * sade, (b - a).magnitude * 0.5f, 2 * sade);
            var r = g.GetComponent<MeshRenderer>(); r.sharedMaterial = koysi; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
        }

        /// <summary>Kaupunkikameran lopullinen asento tässä kehyksessä: kiihtyvyys ja korin kulmat ennen piirtoa.</summary>
        void EnnenPiirtoa(ScriptableRenderContext _, Camera c)
        {
            if (c != perus || overlay == null || juuri == null) return;
            overlay.fieldOfView = perus.fieldOfView;
            if (!Mathf.Approximately(fov, perus.fieldOfView) || !Mathf.Approximately(aspect, perus.aspect))
            { fov = perus.fieldOfView; aspect = perus.aspect; Rakenna(); }
            float dt = Mathf.Max(Time.unscaledDeltaTime, 1e-3f);
            Vector3 p = perus.transform.position;
            if (historia > 0 && (p - edPaikka).magnitude > HyppyM) historia = 0;   // origon siirto tai siirtymä
            Vector3 v = historia > 0 ? (p - edPaikka) / dt : Vector3.zero;
            Vector3 a = historia > 1 ? (v - edNopeus) / dt : Vector3.zero;
            kiihtyvyys += (a - kiihtyvyys) * (1 - Mathf.Exp(-dt / KiihtyvyysAikavakioS));
            edPaikka = p; edNopeus = v; historia = Mathf.Min(historia + 1, 2);
            Vector3 eteen = Vector3.ProjectOnPlane(perus.transform.forward, Vector3.up);
            if (eteen.sqrMagnitude < 1e-6f) eteen = Vector3.ProjectOnPlane(perus.transform.up, Vector3.up);
            eteen.Normalize();
            Vector3 oikea = Vector3.Cross(Vector3.up, eteen);
            liike.Paivita(dt, Vector3.Dot(kiihtyvyys, eteen), Vector3.Dot(kiihtyvyys, oikea));
            koriKaanto.localRotation = Quaternion.Euler((float)liike.Nyokkays, 0, -(float)liike.Kallistus);
            koysiKaanto.localRotation = Quaternion.Euler((float)liike.KoysiNyokkays, 0, -(float)liike.KoysiKallistus);
        }
    }
}
