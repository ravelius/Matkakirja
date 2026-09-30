// ISS-SILUETTI (ISS-kamera, Helsingin esimerkkikuva; Päätoimittaja/omistaja 30.9.2026: "hillitty ISS:n rakenteen siluetti
// reunassa, ei peitä kohdetta"; kaksi kuvaa, siluetin kanssa ja ilman). Aurinkopaneelin siipi kuvan alakulmassa
// (Varjostimet/IssSiluetti, laskennallinen), koko ruudun neliönä kameran edessä kuten CupolaKerros: etäisyys 1,5 × lähitaso ja
// koko kenttäkulman mukaan juuri ennen piirtoa. Näkyy vain valokuvauskulmassa (AstronauttiLinssi.Vertailu) ja kytkimellä.
//   astro kyyti siluetti 0|1                      päälle/pois (oletus pois)
//   astro kyyti siluetti asettelu x y kulma leveys pituus    siiven paikka (ruudun osuuksina, kulma asteina)
using UnityEngine;
using UnityEngine.Rendering;
using Unity.Mathematics;
using CesiumForUnity;

namespace Matkakirja.Linssit
{
    public static class IssSiluetti
    {
        public static bool Paalla;
        public static Vector4 Asettelu = new Vector4(-0.12f, -0.06f, 24f, 0.105f);
        public static float Pituus = 0.62f;

        static readonly int IdPeitto = Shader.PropertyToID("_Peitto"), IdRuutu = Shader.PropertyToID("_Ruutu"),
            IdAurinko = Shader.PropertyToID("_AurinkoRuutu"), IdAsettelu = Shader.PropertyToID("_Asettelu"), IdPituus = Shader.PropertyToID("_Pituus");
        static Transform nelio;
        static Material materiaali;
        static Camera kohdeKamera;
        static bool kuuntelee;

        /// <summary>Joka kehys (AstronauttiKerros.LateUpdate): näkyy kuvauskulmassa, kun kytkin on päällä.</summary>
        public static void Paivita(Camera kamera, CesiumGeoreference g, bool kuvauskulma)
        {
            bool nakyy = Paalla && kuvauskulma && kamera != null;
            if (nakyy && nelio == null && !Luo(kamera)) nakyy = false;
            if (nelio == null) return;
            if (nelio.gameObject.activeSelf != nakyy) nelio.gameObject.SetActive(nakyy);
            if (!nakyy) return;
            if (nelio.parent != kamera.transform) nelio.SetParent(kamera.transform, false);
            kohdeKamera = kamera;
            materiaali.SetVector(IdAsettelu, Asettelu);
            materiaali.SetFloat(IdPituus, Pituus);
            materiaali.SetFloat(IdPeitto, 1f);
            if (g != null)
            {
                // Aurinko kameran koordinaateissa (w = 1: siluetti on aina auringossa tai sen reunalla kuvaushetkellä).
                var gt = g.transform;
                Vector3 a = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(
                    global::Matkakirja.Aurinko.AurinkoEcef(Iss.IssNyt.Kello()))).normalized;
                Vector3 k = kamera.transform.InverseTransformDirection(a);
                materiaali.SetVector(IdAurinko, new Vector4(k.x, k.y, k.z, 1f));
            }
        }

        static bool Luo(Camera kamera)
        {
            var s = Resources.Load<Shader>("Varjostimet/IssSiluetti");
            if (s == null) { Debug.LogWarning("MATKAKIRJA ISS-kamera: IssSiluetti-varjostin puuttuu"); return false; }
            materiaali = new Material(s) { name = "ISS-siluetti" };
            var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
            go.name = "ISS-siluetti";
            Object.Destroy(go.GetComponent<Collider>());
            var r = go.GetComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            nelio = go.transform;
            nelio.SetParent(kamera.transform, false);
            if (!kuuntelee) { RenderPipelineManager.beginCameraRendering += EnnenPiirtoa; kuuntelee = true; }
            return true;
        }

        /// <summary>Neliö kameran eteen juuri ennen piirtoa (lähitaso ja kenttäkulma ovat tämän kehyksen arvot, CupolaKerros).</summary>
        static void EnnenPiirtoa(ScriptableRenderContext _, Camera c)
        {
            if (nelio == null || c != kohdeKamera || !nelio.gameObject.activeSelf) return;
            float d = Mathf.Max(1f, c.nearClipPlane * 1.5f);
            if (d >= c.farClipPlane) d = c.farClipPlane * 0.5f;
            float h = 2f * d * Mathf.Tan(c.fieldOfView * 0.5f * Mathf.Deg2Rad), w = h * c.aspect;
            nelio.localPosition = new Vector3(0, 0, d);
            nelio.localRotation = Quaternion.identity;
            nelio.localScale = new Vector3(w, h, 1f);
            materiaali.SetFloat(IdRuutu, c.aspect);
        }

        public static string Tila() =>
            $"siluetti {(Paalla ? "päällä" : "pois")}, asettelu {Asettelu.x:0.00} {Asettelu.y:0.00} {Asettelu.z:0}° leveys {Asettelu.w:0.000} pituus {Pituus:0.00}";
    }
}
