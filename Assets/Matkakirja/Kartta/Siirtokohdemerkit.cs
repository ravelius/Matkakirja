using System;
using System.Collections.Generic;
using CesiumForUnity;
using TMPro;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// SIIRTOKOHTEET KARTALLA (Pelikoodarin tilaus 24.9.2026, web vaihe 'move', js/pallolauta/merkit.js
    /// kohdeElementti): nopan jälkeen pelaajan mahdolliset kohteet renkaina pallolla. Kaupunkikohde: 24 pt
    /// kultalevy, punamullan katkorengas, hengittävä halo ja nimi halon yläpuolella; reitin varren piste 15 pt
    /// ilman nimeä. Kaupunkikohteen napautus kulkee kaupunkimerkkien omaa reittiä (KaupunkiMerkit), reitin
    /// varren pisteen napautus nostaa <see cref="Napautettu"/> (avain → PeliOhjain.ValitseSiirto).
    ///
    /// Koko on vakio näytön pisteinä kuten KaupunkiMerkeissä (PalloKierto.Pistekerroin), merkit tuodaan
    /// näkösädettä pitkin pinnan eteen, ja takapuolen merkit ovat piilossa.
    /// </summary>
    public sealed class Siirtokohdemerkit : MonoBehaviour
    {
        /// <summary>Kohde pelistä (PeliApu.SiirtoKohde ilman Assembly-CSharp-riippuvuutta).</summary>
        public struct Kohde
        {
            public string Avain;
            /// <summary>Kaupungin id tai null (reitin varren piste).</summary>
            public string Kaupunki;
            public string Nimi;
            public double Lat, Lon;
        }

        public CesiumGeoreference georeferenssi;
        public Camera kamera;
        public PalloKierto kierto;
        public Material materiaali;
        public TMP_FontAsset fontti;
        [Tooltip("KOHDEMERKIN_PX (kaupunki) ja KOHDEMERKIN_PISTE_PX (reitin varsi), pisteinä.")]
        public float kaupunkiPx = 24f, pistePx = 15f;
        [Tooltip("KOHDEMERKIN_NIMI_PX ja KOHDEMERKIN_NIMI_RAKO_PX.")]
        public float nimiPx = 13f, nimiRako = 8f;
        [Tooltip("Napautuksen osuma-alue (web: lähin kohde 44 px).")]
        public float osumaSade = 22f;
        [Tooltip("Merkin nosto pinnasta (m), kuten kaupunkimerkeissä.")]
        public double nosto = 5000.0;
        public Color musteenVari = new Color(0.20f, 0.15f, 0.10f);

        /// <summary>Reitin varren pisteen napautus: kohteen avain.</summary>
        public event Action<string> Napautettu;

        public static Siirtokohdemerkit Instanssi { get; private set; }

        sealed class Merkki
        {
            public Kohde kohde;
            public Transform juuri;
            public Vector3 pinta, normaali;
        }

        readonly List<Merkki> merkit = new List<Merkki>();
        Mesh nelio;
        Material nimiMateriaali;
        const float Etuna = 0.3f;

        void Awake() => Instanssi = this;

        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            if (kierto != null) kierto.Napautettu -= Napautus;
        }

        void Start()
        {
            if (kamera == null) kamera = Camera.main;
            if (kierto != null) kierto.Napautettu += Napautus;
        }

        /// <summary>Uudet kohteet (vanhat pois). Tyhjä tai null = renkaat pois.</summary>
        public void Nayta(IReadOnlyList<Kohde> kohteet)
        {
            foreach (var m in merkit) Destroy(m.juuri.gameObject);
            merkit.Clear();
            if (kohteet == null || georeferenssi == null || materiaali == null) return;
            nelio ??= Nelio();
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            foreach (var k in kohteet)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.Lon, k.Lat, nosto));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var juuri = new GameObject("Siirtokohde " + k.Avain).transform;
                juuri.SetParent(georeferenssi.transform, false);
                bool kaupunki = !string.IsNullOrEmpty(k.Kaupunki);
                float px = kaupunki ? kaupunkiPx : pistePx;
                float sivu = px * 1.42f + 8f;   // laajin halo + viiva + pehmennys
                var q = new GameObject("Rengas").transform;
                q.SetParent(juuri, false);
                q.localScale = new Vector3(sivu, sivu, 1);
                q.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                var r = q.gameObject.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                var lohko = new MaterialPropertyBlock();
                lohko.SetFloat("_Sade", px * 0.5f);
                lohko.SetFloat("_Koko", sivu);
                lohko.SetFloat("_Viiva", kaupunki ? 3f : 2.2f);
                // .target-halo.fokus 3,4 / .far 2,4 (css/styles.css:8293–8298).
                lohko.SetFloat("_HaloViiva", kaupunki ? 3.4f : 2.4f);
                lohko.SetVector("_Katko", kaupunki ? new Vector4(6, 4, 0, 0) : new Vector4(4, 3, 0, 0));
                lohko.SetColor("_Taytto", new Color(0.965f, 0.824f, 0.478f, kaupunki ? 0.72f : 0.55f));
                r.SetPropertyBlock(lohko);
                if (kaupunki && fontti != null && !string.IsNullOrEmpty(k.Nimi))
                {
                    var n = new GameObject("Nimi").AddComponent<TextMeshPro>();
                    n.transform.SetParent(juuri, false);
                    n.font = fontti;
                    n.text = k.Nimi;
                    n.fontSize = nimiPx;
                    n.fontStyle = FontStyles.Bold;
                    n.color = musteenVari;
                    n.alignment = TextAlignmentOptions.Bottom;
                    n.textWrappingMode = TextWrappingModes.NoWrap;
                    n.outlineWidth = 0.2f;
                    n.outlineColor = new Color32(247, 237, 216, 235);
                    n.rectTransform.pivot = new Vector2(0.5f, 0f);
                    n.rectTransform.sizeDelta = new Vector2(400, 40);
                    // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/piste.
                    n.transform.localScale = Vector3.one * 10f;
                    n.transform.localPosition = new Vector3(0, px * 0.5f * 1.42f + nimiRako, 0);
                    nimiMateriaali ??= new Material(fontti.material) { renderQueue = 3006 };
                    n.fontSharedMaterial = nimiMateriaali;
                }
                merkit.Add(new Merkki { kohde = k, juuri = juuri, pinta = (float3)u, normaali = (float3)math.normalize(u - keskus) });
            }
        }

        void Napautus(Vector2 ruutu)
        {
            if (merkit.Count == 0 || kamera == null) return;
            float raja = osumaSade * PalloKierto.Pistekerroin;
            Merkki paras = null;
            float parasD = float.MaxValue;
            foreach (var m in merkit)
            {
                if (!string.IsNullOrEmpty(m.kohde.Kaupunki) || !m.juuri.gameObject.activeSelf) continue;
                Vector3 p = kamera.WorldToScreenPoint(georeferenssi.transform.TransformPoint(m.pinta));
                float d = Vector2.Distance(ruutu, p);
                if (d < raja && d < parasD) { parasD = d; paras = m; }
            }
            if (paras != null) Napautettu?.Invoke(paras.kohde.Avain);
        }

        void LateUpdate()
        {
            if (merkit.Count == 0 || kamera == null) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float pikseleita = Screen.height / PalloKierto.Pistekerroin;
            foreach (var m in merkit)
            {
                Vector3 paikka = gt.TransformPoint(m.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                bool edessa = !PalloKierto.PorttiSumea && Vector3.Dot(gt.TransformDirection(m.normaali), kohti / etaisyys) > 0.12f;
                if (m.juuri.gameObject.activeSelf != edessa) m.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - Etuna);
                m.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                m.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pikseleita);
            }
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Siirtokohde" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }
    }
}
