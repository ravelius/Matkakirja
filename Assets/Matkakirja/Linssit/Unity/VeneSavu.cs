// LAIVOJEN SAVU JA HÖYRY, UNITY-OSA (Linssiseppä 2, 9.10.2026; omistaja TF 168, PT juna 170): LS1:n ElavaKaupunki kutsuu luodessaan
// VeneSavu.Liita(piippu, laji) höyry-, saaristo- ja moottorilaivoille. Kevyt ParticleSystem piipun kohdalle (maailma-avaruus, nousee
// ja kulkee tuulen mukana KaupunkiIlmakeha.TuuliMs), oma Savu-varjostin. Lajit ja määrät Ydin SavuLajit (null = ei savua).
// Mittakaava piipun lossyScalesta (veneet ovat georeferenssin metriavaruudessa).
using Matkakirja.Linssit.Ilmakeha;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class VeneSavu
    {
        static Material mat;

        /// <summary>Savu piippuun; palauttaa luodun olion tai null (ei savua lajille tai varjostin puuttuu).</summary>
        public static GameObject Liita(Transform piippu, string laji)
        {
            if (piippu == null || !(SavuLajit.Laji(laji) is SavuAsetus a)) return null;
            if (mat == null)
            {
                var sh = Shader.Find("Matkakirja/Linssit/Savu");
                if (sh == null || !sh.isSupported) { Debug.Log("MATKAKIRJA kaupunki: savuvarjostin puuttuu, ei savua"); return null; }
                mat = new Material(sh) { name = "VeneSavu" };
            }
            float s = Mathf.Max(1e-4f, piippu.lossyScale.y);
            var go = new GameObject("Savu " + laji) { layer = piippu.gameObject.layer };
            go.transform.SetParent(piippu, false);
            var ps = go.AddComponent<ParticleSystem>();
            ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            var m = ps.main;
            m.simulationSpace = ParticleSystemSimulationSpace.World;
            m.startLifetime = (float)a.ElinikaS; m.startSpeed = (float)a.NousuMs * s; m.startSize = (float)a.KokoAlkuM * s;
            m.maxParticles = a.Enintaan; m.startColor = new Color(a.R, a.G, a.B, (float)a.Peitto);
            m.startRotation = new ParticleSystem.MinMaxCurve(0f, Mathf.PI * 2f); m.scalingMode = ParticleSystemScalingMode.Hierarchy;
            var e = ps.emission; e.rateOverTime = (float)a.MaaraS;
            var sh2 = ps.shape; sh2.shapeType = ParticleSystemShapeType.Cone; sh2.angle = 8f; sh2.radius = 0.5f;
            sh2.rotation = new Vector3(-90f, 0f, 0f);   // ylös
            var v = ps.velocityOverLifetime; v.enabled = true; v.space = ParticleSystemSimulationSpace.World;
            v.x = KaupunkiIlmakeha.TuuliMs.x * s; v.y = 0.2f * s; v.z = KaupunkiIlmakeha.TuuliMs.y * s;
            var koko = ps.sizeOverLifetime; koko.enabled = true;
            koko.size = new ParticleSystem.MinMaxCurve(1f, AnimationCurve.Linear(0f, 1f, 1f, (float)(a.KokoLoppuM / a.KokoAlkuM)));
            var vari = ps.colorOverLifetime; vari.enabled = true;
            var g = new Gradient();
            g.SetKeys(new[] { new GradientColorKey(Color.white, 0f), new GradientColorKey(Color.white, 1f) },
                      new[] { new GradientAlphaKey(0f, 0f), new GradientAlphaKey(1f, 0.1f), new GradientAlphaKey(0.6f, 0.5f), new GradientAlphaKey(0f, 1f) });
            vari.color = g;
            var r = go.GetComponent<ParticleSystemRenderer>();
            r.sharedMaterial = mat; r.renderMode = ParticleSystemRenderMode.Billboard;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; r.receiveShadows = false;
            ps.Play();
            return go;
        }
    }
}
