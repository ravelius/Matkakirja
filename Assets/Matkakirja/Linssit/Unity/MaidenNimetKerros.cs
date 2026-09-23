// VERTAILULINSSIN MAANIMET (web js/vertailu.js piirraMaatPallolle nimienOsa
// 'vertailu-nimet': CSS2D-merkki .pallolauta-maanimi maan keskukseen, vain
// tarpeeksi leveille maille). Toteuttaa IMaidenNimet.
//
// Sama kaava kuin VesistotKerros.Nimet: TextMeshPro joka kehys kameraan päin
// ruutupisteiden kokoon, takapuolen nimet piiloon normaalilla, jono 3005
// kaupunkien nimiöiden tasolla (kaupungit ovat maatilassa piilossa).
// Korkeus 25 km (web MAAPOLYGONIN_KORKEUS 0,004 säteinä, kuten uomat).
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using TMPro;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class MaidenNimetKerros : MonoBehaviour, IMaidenNimet
    {
        const float Etuna = 0.02f;
        const int JonoNimet = 3005;
        const float NimenKoko = 13f;
        const double Korkeus = 0.004 * 6_371_000;

        sealed class Nimi
        {
            public Transform juuri;
            public Vector3 pinta, normaali;
        }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        TMP_FontAsset fontti;
        Material materiaali;
        readonly List<Nimi> nimet = new List<Nimi>();

        public static MaidenNimetKerros Luo(PalloKierto kierto)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("MaidenNimetKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<MaidenNimetKerros>();
            k.georeferenssi = g;
            k.kamera = kierto.GetComponent<Camera>();
            var kartta = KarttaKerrokset.Instanssi;
            k.fontti = kartta != null && kartta.merkit != null ? kartta.merkit.fontti : null;
            if (k.fontti == null) Debug.LogWarning("MATKAKIRJA maanimet: fontti puuttuu (KarttaKerrokset.merkit.fontti), nimet jäävät pois");
            return k;
        }

        public void Nimet(IReadOnlyList<Maa> maat)
        {
            Tyhjenna();
            if (fontti == null) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            materiaali ??= new Material(fontti.material) { renderQueue = JonoNimet };
            foreach (var m in maat)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(m.KeskusLon, m.KeskusLat, Korkeus));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var juuri = new GameObject("Maanimi " + m.Id).transform;
                juuri.SetParent(transform, false);
                var t = new GameObject("Nimi").AddComponent<TextMeshPro>();
                t.transform.SetParent(juuri, false);
                t.font = fontti;
                t.fontSharedMaterial = materiaali;
                t.text = m.Nimi;
                // css .pallolauta-maanimi: käsiala 13 px, muste rgba(70, 51, 31, 0.85), paperihehku.
                t.fontSize = NimenKoko;
                t.color = new Color32(70, 51, 31, 217);
                t.alignment = TextAlignmentOptions.Center;
                t.textWrappingMode = TextWrappingModes.NoWrap;
                t.outlineWidth = 0.2f;
                t.outlineColor = new Color32(247, 237, 216, 217);
                t.rectTransform.sizeDelta = new Vector2(400, 40);
                // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/piste.
                t.transform.localScale = Vector3.one * 10f;
                juuri.gameObject.SetActive(false);
                nimet.Add(new Nimi { juuri = juuri, pinta = (float3)u, normaali = (float3)math.normalize(u - keskus) });
            }
        }

        public void Pois() => Destroy(gameObject);

        void Tyhjenna()
        {
            foreach (var n in nimet) if (n.juuri != null) Destroy(n.juuri.gameObject);
            nimet.Clear();
        }

        void LateUpdate()
        {
            if (kamera == null || nimet.Count == 0) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float pisteita = Screen.height / kerroin;
            foreach (var p in nimet)
            {
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                bool edessa = etaisyys > 0 && Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) > 0.05f;
                if (p.juuri.gameObject.activeSelf != edessa) p.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - Etuna);
                p.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                p.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pisteita);
            }
        }

        void OnDestroy()
        {
            if (materiaali != null) Destroy(materiaali);
        }
    }
}
