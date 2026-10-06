// TÄYDEN VAUHDIN TUNTU ISS-KYYDISSÄ (omistaja 6.10.2026 klo 09.0x Päätoimittajan kautta: täydellä nopeudella kuva "hieman vääristää
// kuvan reunoja"; Päätoimittaja: hienovarainen reunojen vääristymä ja säteittäinen liike-epäterävyys vain reunoilla, keskusta
// terävä; kameran pieni tärinä yhdessä Natiivi-UI:n paneelitärinän kanssa samalla ajastuksella; tähtiviirut odottavat omistajaa).
//   Voima     0 alle ~160×, 1 täydellä 1000×:llä (log-asteikko, liukuu 0,5 s:ssa); myös kelauksen huipulla
//   Reunat    URP Lens Distortion (tynnyri, keskusta ennallaan) + Chromatic Aberration (vain reunoilla) + säteittäinen
//             liike-epäterävyys reunoilla (Varjostimet/Reunasumennus: koko ruudun neliö, joka näytteistää kameran läpinäkymättömän
//             kuvan; kamerakohtainen värikuva vain kun Voima > 0, mobiilin URP-asetus ennallaan)
//   Heilunta  omistaja 6.10. 09.3x: "avaruusalus voisi alkaa jo hieman heilua, kun saavutetaan oranssi teksti, ja sitten heiluminen
//             lisääntyy, kun saavutetaan punainen" → TarinaVoima 0 alle 250×, hienovarainen 0,25 oranssissa (300×), 1 punaisessa
//             (1000×); hidas heilunta (~0,8 Hz) ja sen päällä pieni tärinä (~9 Hz), joka kasvaa punaista kohti.
//   Tärinä    kameran projektion siirto (ei muuta kameran asentoa eikä Cupolan kehyksen paikkaa kehykseen nähden): kaksi Perlin-
//             taajuutta, amplitudi ~0,12 % ruudun korkeudesta. Tarina (−1…1) ja Voima ovat julkisia: Natiivi-UI siirtää paneelia
//             samalla arvolla (sama ajastus).
// Pois ISS-kuvan ajan (IssKameraKuva.Kaynnissa) ja kun kyytipino on pois. A/B `astro kyyti nopeustehoste 0|1`.
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public static class Nopeustehoste
    {
        public static bool Pois;
        /// <summary>Tehosteen voima 0…1 (täysi 1000×:llä).</summary>
        public static float Voima { get; private set; }
        /// <summary>Tärinä tässä kehyksessä, kumpikin akseli −1…1 (kerro omalla amplitudilla; 0 kun Voima = 0).</summary>
        public static Vector2 Tarina { get; private set; }
        /// <summary>Heilunnan voima 0…1: 0 alle 250×, 0,25 oranssissa (300×), 1 punaisessa (1000×).</summary>
        public static float TarinaVoima { get; private set; }
        /// <summary>Kameran heilunnan amplitudi osuutena ruudun korkeudesta täydellä voimalla.</summary>
        public static float TarinaAmplitudi = 0.0025f;

        /// <summary>
        /// Ruudun siirto tässä kehyksessä pikseleinä UI:n suunnissa (x oikealle, y alas): kameran kuva (maa, Cupolan 3D-kehys,
        /// siluetti) siirtyy juuri tämän verran. Natiivi-UI siirtää paneelia samalla arvolla (px → pt jakamalla skaalalla),
        /// jolloin ohjaamo ja kuva heiluvat samassa tahdissa. Täydellä heilunnalla enintään ~TarinaAmplitudi · ruudun korkeus.
        /// </summary>
        public static Vector2 RuudunSiirtoPx => new Vector2(-Tarina.x, Tarina.y) * (TarinaAmplitudi * Screen.height);

        /// <summary>Heilunnan voima kertoimesta (oranssi 300×, punainen 1000×; Natiivi-UI:n LCD-värit).</summary>
        public static float TarinaKertoimesta(double kerroin)
        {
            if (kerroin < 250) return 0f;
            if (kerroin < 300) return 0.25f * (float)((kerroin - 250) / 50);
            float t = Mathf.Clamp01(((float)System.Math.Log10(kerroin) - 2.4771f) / 0.5229f);
            return 0.25f + 0.75f * t;
        }
        public static float VaaristymaMax = 0.10f, VarivuotoMax = 0.45f;

        static Volume volyymi;
        static LensDistortion vaaristyma;
        static ChromaticAberration varivuoto;
        static Camera kohde;
        static bool kuuntelee;
        static Transform nelio;
        static Material sumennus;
        static readonly int IdVoima = Shader.PropertyToID("_Voima");
        static CameraOverrideOption variKuva0; static bool variKuvaAsetettu;

        /// <summary>Voima kertoimesta: log10(k) 2,2 → 0 … 3 → 1, pehmeä alku.</summary>
        public static float VoimaKertoimesta(double kerroin)
        {
            if (kerroin <= 1) return 0f;
            float t = Mathf.Clamp01(((float)System.Math.Log10(kerroin) - 2.2f) / 0.8f);
            return t * t * (3 - 2 * t);
        }

        /// <summary>Joka kehys (AstronauttiKerros.LateUpdate) kyytipinon jälkeen.</summary>
        public static void Paivita(Camera kamera, bool kyydissa, double kerroin, bool kuvaKaynnissa)
        {
            bool sallittu = !Pois && kyydissa && kamera != null && !kuvaKaynnissa;
            Voima = Mathf.MoveTowards(Voima, sallittu ? VoimaKertoimesta(kerroin) : 0f, Time.unscaledDeltaTime * 2f);
            TarinaVoima = Mathf.MoveTowards(TarinaVoima, sallittu ? TarinaKertoimesta(kerroin) : 0f, Time.unscaledDeltaTime * 1.5f);
            if (kuvaKaynnissa) { Voima = 0f; TarinaVoima = 0f; }
            float t = Time.unscaledTime, tv = TarinaVoima;
            // Hidas heilunta + tärinä, joka kasvaa punaista kohti (−1…1).
            Tarina = tv <= 0f ? Vector2.zero : new Vector2(
                (Mathf.PerlinNoise(t * 0.8f, 5.1f) - 0.5f) * 1.6f + (Mathf.PerlinNoise(t * 9f, 0.37f) - 0.5f) * 0.6f * tv,
                (Mathf.PerlinNoise(3.3f, t * 0.8f) - 0.5f) * 1.6f + (Mathf.PerlinNoise(0.71f, t * 9f) - 0.5f) * 0.6f * tv) * tv;
            if (Voima <= 0f && tv <= 0f && volyymi == null) return;
            if (volyymi == null) Luo();
            volyymi.weight = Voima;
            volyymi.enabled = Voima > 0f;
            vaaristyma.intensity.Override(VaaristymaMax);
            varivuoto.intensity.Override(VarivuotoMax);
            kohde = kamera;
            Sumennus(kamera);
            if (!kuuntelee)
            {
                RenderPipelineManager.beginCameraRendering += EnnenPiirtoa;
                RenderPipelineManager.endCameraRendering += PiirronJalkeen;
                kuuntelee = true;
            }
        }

        /// <summary>Reunasumennuksen neliö ja kameran värikuva (vain kun Voima > 0).</summary>
        static void Sumennus(Camera kamera)
        {
            bool paalla = Voima > 0f && kamera != null;
            var data = kamera != null ? kamera.GetUniversalAdditionalCameraData() : null;
            if (data != null && paalla != variKuvaAsetettu)
            {
                if (paalla) { variKuva0 = data.requiresColorOption; data.requiresColorOption = CameraOverrideOption.On; }
                else data.requiresColorOption = variKuva0;
                variKuvaAsetettu = paalla;
            }
            if (paalla && nelio == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/Reunasumennus");
                if (sh == null) return;
                sumennus = new Material(sh) { name = "Reunasumennus" };
                var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
                go.name = "Reunasumennus";
                Object.Destroy(go.GetComponent<Collider>());
                var r = go.GetComponent<MeshRenderer>();
                r.sharedMaterial = sumennus; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
                nelio = go.transform;
            }
            if (nelio == null) return;
            if (nelio.gameObject.activeSelf != paalla) nelio.gameObject.SetActive(paalla);
            if (!paalla) return;
            if (nelio.parent != kamera.transform) nelio.SetParent(kamera.transform, false);
            sumennus.SetFloat(IdVoima, Voima);
        }

        static void Luo()
        {
            var go = new GameObject("Nopeustehoste");
            Object.DontDestroyOnLoad(go);
            volyymi = go.AddComponent<Volume>();
            volyymi.isGlobal = true;
            volyymi.priority = 21;   // kyytipinon (20) yläpuolella; vain nämä kaksi tehostetta
            var profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            vaaristyma = profiili.Add<LensDistortion>(true);
            vaaristyma.scale.Override(1f);
            varivuoto = profiili.Add<ChromaticAberration>(true);
            volyymi.sharedProfile = profiili;
        }

        static void EnnenPiirtoa(ScriptableRenderContext _, Camera c)
        {
            if (c != kohde || (Voima <= 0f && TarinaVoima <= 0f)) return;
            if (nelio != null && nelio.gameObject.activeSelf)
            {
                // Neliö kameran eteen tämän kehyksen lähitason ja kenttäkulman mukaan (kuten CupolaKerros), hieman ruutua suurempi.
                float dd = Mathf.Max(1f, c.nearClipPlane * 1.5f);
                if (dd >= c.farClipPlane) dd = c.farClipPlane * 0.5f;
                float hh = 2f * dd * Mathf.Tan(c.fieldOfView * 0.5f * Mathf.Deg2Rad);
                nelio.localPosition = new Vector3(0, 0, dd); nelio.localRotation = Quaternion.identity;
                nelio.localScale = new Vector3(hh * c.aspect * 1.05f, hh * 1.05f, 1f);
            }
            c.ResetProjectionMatrix();
            var p = c.projectionMatrix;
            // Projektion keskipisteen siirto (NDC-yksiköissä 2 × osuus ruudusta).
            p.m02 += 2f * TarinaAmplitudi * Tarina.x / Mathf.Max(0.1f, c.aspect);
            p.m12 += 2f * TarinaAmplitudi * Tarina.y;
            c.projectionMatrix = p;
        }

        static void PiirronJalkeen(ScriptableRenderContext _, Camera c)
        {
            if (c == kohde) c.ResetProjectionMatrix();
        }

        public static string Tila() => $"nopeustehoste {(Pois ? "pois" : "päällä")}, reunat {Voima:0.00}, heilunta {TarinaVoima:0.00} ({Tarina.x:0.00}, {Tarina.y:0.00})";
    }
}
