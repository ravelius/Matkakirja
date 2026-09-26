using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KARTAN TAIVAS (omistajan löydös 154, build 20): kallistetussa karttanäkymässä horisonttiusvan yläpuoli sinertää
    /// ylöspäin (pergamentti usvan rajalla → utuinen vaaleansininen ruudun yläreunassa). Kokoruudun liukuväri
    /// (Resources/Karttataivas.shader) kameran lapsena; raja ja voima Horisonttiusva.RuutuRajaY/RuutuVoima (Aurinko
    /// kirjoittaa joka kehys, löydös 153), joten lento, linssin oma tausta ja kallistamaton kartta ohittavat sen.
    /// Oletus <see cref="Savy"/> = utu (omistajan valinta 26.9.2026 kuvasarjasta lokit/taivas-154/); komento
    /// "taivas kartta pois|utu|vaalea|sini|r g b [voima] [kaari]" (Komennot.cs).
    /// Lepopiirto: materiaali päivitetään vain arvon muuttuessa (kamera liikkuu → kehys piirretään joka tapauksessa).
    /// </summary>
    [DefaultExecutionOrder(100)]   // Aurinko (0) kirjoittaa rajan ensin
    public sealed class Karttataivas : MonoBehaviour
    {
        /// <summary>Valittavat sävyt kuvapariin (sRGB). utu = hienovarainen, vaalea = keskitie, sini = selvästi sininen.</summary>
        public static readonly Color Utu = new Color(0.80f, 0.86f, 0.90f);
        public static readonly Color Vaalea = new Color(0.71f, 0.81f, 0.90f);
        public static readonly Color Sini = new Color(0.58f, 0.72f, 0.88f);

        /// <summary>Taivaan sävy (omistaja valitsi utun 26.9.2026 klo 09.3x); null = pois (build 19:n kerma).</summary>
        public static Color? Savy = Utu;
        /// <summary>Peitto ruudun yläreunassa (0–1).</summary>
        public static float Voima = 0.85f;
        /// <summary>Liukuvärin käyrä: &lt; 1 sinertää nopeasti rajan yllä, &gt; 1 vasta ylhäällä.</summary>
        public static float Kaari = 0.8f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Savy = Utu; Voima = 0.85f; Kaari = 0.8f; }

        static readonly int VariId = Shader.PropertyToID("_Vari"), RajaId = Shader.PropertyToID("_Raja"),
            VoimaId = Shader.PropertyToID("_Voima"), KaariId = Shader.PropertyToID("_Kaari");

        MeshRenderer piirto;
        Material materiaali;
        Color vari;
        float raja = -1f, voima = -1f, kaari = -1f;

        void Start()
        {
            var shader = Resources.Load<Shader>("Karttataivas");
            if (shader == null) { Debug.LogWarning("MATKAKIRJA karttataivas: varjostin puuttuu"); enabled = false; return; }
            materiaali = new Material(shader) { name = "Karttataivas" };
            var go = new GameObject("Karttataivas");
            go.transform.SetParent(transform, false);
            go.transform.localPosition = Vector3.forward;   // kameran edessä, ettei rajausta karsita
            var mesh = new Mesh { name = "Karttataivas" };
            mesh.vertices = new[] { new Vector3(-1, -1, 0), new Vector3(1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0) };
            mesh.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            mesh.bounds = new Bounds(Vector3.zero, Vector3.one * 1e6f);   // kärjet leikkausavaruudessa, aina näkyvissä
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            piirto = go.AddComponent<MeshRenderer>();
            piirto.sharedMaterial = materiaali;
            piirto.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            piirto.receiveShadows = false;
            piirto.enabled = false;
        }

        void LateUpdate()
        {
            if (piirto == null) return;
            float v = Savy.HasValue ? Horisonttiusva.RuutuVoima * Voima : 0f;
            bool nakyy = v > 0.001f && Horisonttiusva.RuutuRajaY > 0.001f;
            if (piirto.enabled != nakyy) { piirto.enabled = nakyy; PallonLepo.Muuttui("karttataivas"); }
            if (!nakyy) return;
            var c = Savy.Value;
            if (c != vari) { vari = c; materiaali.SetColor(VariId, c); PallonLepo.Muuttui("karttataivas"); }
            if (!Mathf.Approximately(Horisonttiusva.RuutuRajaY, raja)) { raja = Horisonttiusva.RuutuRajaY; materiaali.SetFloat(RajaId, raja); }
            if (!Mathf.Approximately(v, voima)) { voima = v; materiaali.SetFloat(VoimaId, v); }
            if (!Mathf.Approximately(Kaari, kaari)) { kaari = Kaari; materiaali.SetFloat(KaariId, kaari); PallonLepo.Muuttui("karttataivas"); }
        }

        /// <summary>Tila lokiin.</summary>
        public static string Tila() =>
            $"sävy {(Savy.HasValue ? Savy.Value.ToString() : "pois")}, voima {Voima:0.00}, kaari {Kaari:0.00}, " +
            $"raja {Horisonttiusva.RuutuRajaY:0.000}, usva {Horisonttiusva.RuutuVoima:0.00}";
    }
}
