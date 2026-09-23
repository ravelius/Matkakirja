using System;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pelin omat pisteet kartalla (B3: vihreä aarrepiste; Pelikoodari asettaa PeliOhjaimen
    /// TilaMuuttui-tapahtumasta). Piste on Valopiste-täplä (kolme kehää) ruudun vakiokokoisena;
    /// lukittu piste piirretään himmeämpänä. Napautus: lähin piste 44 pt:n alueella,
    /// kaupunkimerkki voittaa kuten valoilla.
    /// </summary>
    public class Karttapisteet : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public KaupunkiMerkit merkit;
        public Material materiaali;
        [Tooltip("Säde iOS-pisteinä.")]
        public float sade = 14f;
        public float osumaSade = 22f;
        public double nosto = 5000.0;

        public event Action<string> Napautettu;

        sealed class Piste { public string Id; public GameObject Olio; public Material Oma; public Vector3 Paikka; public Vector3 Normaali; }
        readonly Dictionary<string, Piste> pisteet = new Dictionary<string, Piste>();

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (merkit == null) merkit = FindAnyObjectByType<KaupunkiMerkit>();
            if (kierto != null) kierto.Napautettu += Napautus;
        }

        void OnDestroy()
        {
            if (kierto != null) kierto.Napautettu -= Napautus;
        }

        /// <summary>Lisää tai siirtää pisteen.</summary>
        public void Aseta(string id, double lat, double lon, Color vari, bool lukittu)
        {
            if (string.IsNullOrEmpty(id) || georeferenssi == null) return;
            if (!pisteet.TryGetValue(id, out var p))
            {
                p = new Piste { Id = id, Olio = new GameObject("Karttapiste " + id) };
                p.Olio.transform.SetParent(georeferenssi.transform, false);
                p.Olio.AddComponent<MeshFilter>();
                var r = p.Olio.AddComponent<MeshRenderer>();
                p.Oma = new Material(materiaali);
                r.sharedMaterial = p.Oma;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                pisteet[id] = p;
            }
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, nosto));
            double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            p.Paikka = (float3)u;
            p.Normaali = (float3)math.normalize(u - keskus);
            // Valopiste laajentaa kärjet ruudulla objektin koordinaateissa: verkko pisteen kohdalle.
            p.Olio.GetComponent<MeshFilter>().sharedMesh = Verkko(p.Paikka, lukittu ? new Color(vari.r, vari.g, vari.b, 0.45f) : vari);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            p.Oma.SetFloat("_Koko", sade * kerroin);
            p.Oma.SetVector("_Keskus", (Vector3)(float3)keskus);
            p.Olio.SetActive(true);
        }

        public void Poista(string id)
        {
            if (!pisteet.TryGetValue(id, out var p)) return;
            Destroy(p.Olio);
            pisteet.Remove(id);
        }

        static Mesh Verkko(Vector3 paikka, Color vari)
        {
            var m = new Mesh { name = "Karttapiste" };
            m.vertices = new[] { paikka, paikka, paikka, paikka };
            m.uv = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) };
            m.colors = new[] { vari, vari, vari, vari };
            m.triangles = new[] { 0, 2, 1, 0, 3, 2 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2.6e7f);
            return m;
        }

        void Napautus(Vector2 ruutu)
        {
            if (pisteet.Count == 0 || Napautettu == null) return;
            if (merkit != null && merkit.merkitNakyvat && merkit.OsuuKaupunkiin(ruutu)) return;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (kamera == null) return;
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float paras = osumaSade * kerroin;
            string osuma = null;
            var gt = georeferenssi.transform;
            foreach (var p in pisteet.Values)
            {
                if (!p.Olio.activeSelf) continue;
                Vector3 w = gt.TransformPoint(p.Paikka);
                if (Vector3.Dot(gt.TransformDirection(p.Normaali), (kamera.transform.position - w).normalized) < 0.05f) continue;
                Vector3 r = kamera.WorldToScreenPoint(w);
                if (r.z <= 0) continue;
                float d = Vector2.Distance(ruutu, r);
                if (d < paras) { paras = d; osuma = p.Id; }
            }
            if (osuma == null) return;
            Debug.Log("MATKAKIRJA karttapiste: napautus " + osuma);
            Napautettu?.Invoke(osuma);
        }
    }
}
