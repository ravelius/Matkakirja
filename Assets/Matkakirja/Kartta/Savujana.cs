using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Koneen savujana (LENNON ESITYS, omistaja 23.9.2026; korvaa punaisen reittiviivan lennoilla):
    /// nauha koneen perässä, joka häipyy elinajassa. Pisteet talletetaan ECEF-koordinaatteina,
    /// joten georeferenssin origon siirto ei riko nauhaa. Leveys pysyy ruudulla vakiona.
    /// </summary>
    public class Savujana : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Material materiaali;
        [Tooltip("Sekunteja, joissa savu häipyy.")]
        public float elinaika = 5f;
        public float naytevali = 0.05f;
        [Tooltip("Nauhan leveys iOS-pisteinä koneen kohdalla.")]
        public float leveysPx = 7f;
        public Color vari = new Color(1f, 0.98f, 0.94f, 0.85f);

        readonly List<(double3 ecef, float aika)> pisteet = new List<(double3, float)>();
        LineRenderer viiva;
        Vector3[] paikat = new Vector3[0];
        bool paalla;
        float viimeksi;
        readonly Gradient liuku = new Gradient();
        readonly GradientColorKey[] varit = new GradientColorKey[2];
        readonly GradientAlphaKey[] alfat = new GradientAlphaKey[3];

        // LÄMPÖERÄ (PallonLepo): näkyvä savu häipyy elinajassa (5 s), myös lennon päätyttyä.
        void OnEnable() => PallonLepo.Animoi(Nakyy, "savujana");
        void OnDisable() => PallonLepo.Poista(Nakyy);
        bool Nakyy() => viiva != null && viiva.enabled;

        public void Aloita()
        {
            Tee();
            pisteet.Clear();
            paalla = true;
        }

        /// <summary>Uusia pisteitä ei tule; jäljellä oleva savu häipyy.</summary>
        public void Lopeta() => paalla = false;

        public void Lisaa(double3 ecef)
        {
            if (!paalla) return;
            float nyt = Time.unscaledTime;
            if (pisteet.Count > 1 && nyt - viimeksi < naytevali) { pisteet[pisteet.Count - 1] = (ecef, nyt); return; }
            pisteet.Add((ecef, nyt));
            viimeksi = nyt;
        }

        void Tee()
        {
            if (viiva != null) return;
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            viiva = gameObject.AddComponent<LineRenderer>();
            viiva.useWorldSpace = true;
            viiva.sharedMaterial = materiaali;
            viiva.textureMode = LineTextureMode.Stretch;
            viiva.numCapVertices = 2;
            viiva.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            viiva.receiveShadows = false;
            viiva.alignment = LineAlignment.View;
            viiva.widthCurve = new AnimationCurve(new Keyframe(0f, 0.3f), new Keyframe(1f, 1f)); // häntä ohenee
            viiva.enabled = false;
        }

        void LateUpdate()
        {
            if (viiva == null) return;
            float nyt = Time.unscaledTime;
            int pois = 0;
            while (pois < pisteet.Count && nyt - pisteet[pois].aika > elinaika) pois++;
            if (pois > 0) pisteet.RemoveRange(0, pois);
            if (pisteet.Count < 2 || georeferenssi == null) { viiva.enabled = false; return; }

            if (paikat.Length != pisteet.Count) paikat = new Vector3[pisteet.Count];
            var gt = georeferenssi.transform;
            for (int i = 0; i < pisteet.Count; i++)
                paikat[i] = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(pisteet[i].ecef));
            viiva.positionCount = paikat.Length;
            viiva.SetPositions(paikat);

            // Häntä (vanhin) läpinäkyvä, pää täysi; ikä skaalaa koko nauhan alfaa, kun uusia ei tule.
            float nuorin = nyt - pisteet[pisteet.Count - 1].aika;
            float kokonais = Mathf.Clamp01(1f - nuorin / elinaika);
            varit[0] = new GradientColorKey(vari, 0f);
            varit[1] = new GradientColorKey(vari, 1f);
            alfat[0] = new GradientAlphaKey(0f, 0f);
            alfat[1] = new GradientAlphaKey(vari.a * 0.6f * kokonais, 0.6f);
            alfat[2] = new GradientAlphaKey(vari.a * kokonais, 1f);
            liuku.SetKeys(varit, alfat);
            viiva.colorGradient = liuku;

            var kamera = Camera.main;
            if (kamera != null)
            {
                float etaisyys = Vector3.Distance(kamera.transform.position, paikat[paikat.Length - 1]);
                float kerroin = PalloKierto.Pistekerroin;
                float pikseli = 2f * etaisyys * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad) / Mathf.Max(1, Screen.height);
                viiva.widthMultiplier = pikseli * leveysPx * kerroin;
            }
            viiva.enabled = true;
        }
    }
}
