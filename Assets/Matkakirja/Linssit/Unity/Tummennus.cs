// KEKSINTÖLINSSIN TUMMENNUS (web js/aikajana.js PALLON_TUMMENNUS ja siirraReika,
// js/pallolauta/linssit.js kalvoRuudulle): kartta tummuu linssin ajaksi, jotta
// lamput hehkuvat, ja nykyisen lampun kohdalle aukeaa pehmeä reikä.
//
//   sävy    rgba(10, 7, 5, 0.86), puoliväli rgba(10, 7, 5, 0.35)
//   reikä   säde MERKIN_SADE × REIAN_SUHDE = 63 ruutupistettä; kirkas 12 %:iin,
//           puoliväli 50 %; ei liu'u (PALLON_REIAN_LIUKU_MS 0)
//   häivytys 0,7 s sisään (webin kalvon siirtymä)
//
// Kalvo on yksi koko ruudun neliö (Resources/Varjostimet/Tummennus), jonka kärjet
// ovat leikkeen koordinaateissa; se piirtyy pallon ja reliefin päälle ja valojen
// alle. Pallon takana oleva lamppu ei tee reikää (normaali poispäin kamerasta).
// Puuttuu vielä webistä: reiän kulku kaarella hypyn aikana (siirraReikaMatkalla).
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Tummennus : MonoBehaviour
    {
        public const float ReianSadePt = 63f;
        const float HaivytysS = 0.7f;
        static readonly Color Vari = new Color32(10, 7, 5, 219);     // 0,86
        static readonly Color Keski = new Color32(10, 7, 5, 89);     // 0,35

        CesiumGeoreference georeferenssi;
        Camera kamera;
        Material materiaali;
        Mesh nelio;
        float peitto;
        Vector3? reika;   // georeferenssin paikallisissa koordinaateissa
        Vector3 keskus;

        public static Tummennus Luo(PalloKierto kierto, Transform isanta)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Tummennus");
            if (varjostin == null) { Debug.LogWarning("MATKAKIRJA linssit: Tummennus-varjostin puuttuu"); return null; }
            var go = new GameObject("Tummennus");
            go.transform.SetParent(isanta, false);
            var t = go.AddComponent<Tummennus>();
            t.georeferenssi = kierto.georeferenssi;
            t.kamera = kierto.GetComponent<Camera>();
            t.keskus = (float3)t.georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            t.nelio = new Mesh
            {
                name = "Tummennus",
                vertices = new[] { new Vector3(-1, -1, 0), new Vector3(1, -1, 0), new Vector3(1, 1, 0), new Vector3(-1, 1, 0) },
                triangles = new[] { 0, 2, 1, 0, 3, 2 },
                // Kärjet eivät ole maailmassa: rajat niin suuret, ettei karsinta vie kalvoa.
                bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f),
            };
            go.AddComponent<MeshFilter>().sharedMesh = t.nelio;
            var r = go.AddComponent<MeshRenderer>();
            t.materiaali = new Material(varjostin);
            t.materiaali.SetColor("_Vari", Vari);
            t.materiaali.SetColor("_Keski", Keski);
            t.materiaali.SetFloat("_Peitto", 0);
            r.sharedMaterial = t.materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            t.peitto = LinssiOhjain.Instanssi?.VahennettyLiike ?? false ? 1f : 0f;
            return t;
        }

        /// <summary>Reikä pisteeseen (lat, lon), tai tasainen tummennus (NaN).</summary>
        public void Reika(double lat, double lon)
        {
            if (double.IsNaN(lat) || double.IsNaN(lon)) { reika = null; return; }
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
            reika = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        void LateUpdate()
        {
            if (materiaali == null || kamera == null) return;
            peitto = Mathf.MoveTowards(peitto, 1f, Time.unscaledDeltaTime / HaivytysS);
            materiaali.SetFloat("_Peitto", peitto);
            var r = Vector4.zero;
            if (reika is Vector3 p)
            {
                var gt = georeferenssi.transform;
                Vector3 paikka = gt.TransformPoint(p);
                Vector3 kohti = kamera.transform.position - paikka;
                bool edessa = Vector3.Dot(gt.TransformDirection((p - keskus).normalized), kohti.normalized) > 0;
                Vector3 ruutu = kamera.WorldToScreenPoint(paikka);
                if (edessa && ruutu.z > 0)
                {
                    float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
                    r = new Vector4(ruutu.x, ruutu.y, ReianSadePt * kerroin, 1);
                }
            }
            materiaali.SetVector("_Reika", r);
            materiaali.SetVector("_Ruutu", new Vector4(kamera.pixelWidth, kamera.pixelHeight, 0, 0));
        }

        void OnDestroy()
        {
            if (materiaali != null) Destroy(materiaali);
            if (nelio != null) Destroy(nelio);
        }
    }
}
