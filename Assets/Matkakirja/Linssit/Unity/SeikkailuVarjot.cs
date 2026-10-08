// LIEKKIEN PEHMEÄT VARJOT (omistaja 8.10. 19.5x "kaikki grafiikan parannukset", PT: 2–4 lähintä liekkiä, Ultra-tasolla enemmän):
// seikkailun aikana näyttämön piste- ja kohdevaloista (liekit, lyhdyt, soihdut, kynttilät) N kameraa lähintä saa pehmeän varjon,
// muut eivät. Vain valot, joilla ei ollut varjoa ensimmäisellä näkemällä (DioraamaValot hallitsee omansa), ja ei kameran vieressä
// olevaa (pelaajan oma kynttilä: varjo kameran sisältä näyttäisi väärältä). Mobile-tasolla RP-asset ei piirrä lisävalojen varjoja,
// joten valinta ei maksa mitään; Ultra-taso (Natiiviseppä, QualitySettings-nimi "Ultra") piirtää ne. Valinta 0,4 s välein.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuVarjot
    {
        public static bool Paalla = true;
        public const int Perus = 3, Ultra = 6;
        const float KameranVieressaM = 1.0f, ValiS = 0.4f;
        static readonly HashSet<Light> hallitut = new HashSet<Light>();
        static readonly HashSet<Light> tunnetut = new HashSet<Light>();
        static readonly List<(float D, Light L)> ehdokkaat = new List<(float, Light)>();
        static float seuraava;

        /// <summary>Laatutaso nimeltä "Ultra" (Natiiviseppä 8.10.: M-laitteet).</summary>
        public static bool UltraTaso
        {
            get { var n = QualitySettings.names; int i = QualitySettings.GetQualityLevel(); return i >= 0 && i < n.Length && n[i].Contains("Ultra"); }
        }

        public static void Paivita(Transform juuri, Camera kamera)
        {
            if (juuri == null || kamera == null || Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + ValiS;
            if (!Paalla || SeikkailuPelaaja.Aktiivinen == null && SeikkailuVene.Aktiivinen == null) { Palauta(); return; }
            ehdokkaat.Clear();
            var kp = kamera.transform.position;
            foreach (var l in juuri.GetComponentsInChildren<Light>(false))
            {
                if (l.type != LightType.Point && l.type != LightType.Spot) continue;
                if (tunnetut.Add(l) && l.shadows == LightShadows.None) hallitut.Add(l);
                if (!hallitut.Contains(l)) continue;
                float d = Vector3.Distance(kp, l.transform.position);
                if (!l.isActiveAndEnabled || l.intensity < 0.2f || d < KameranVieressaM || d > l.range + 2f) { l.shadows = LightShadows.None; continue; }
                ehdokkaat.Add((d, l));
            }
            ehdokkaat.Sort((a, b) => a.D.CompareTo(b.D));
            int n = UltraTaso ? Ultra : Perus;
            for (int i = 0; i < ehdokkaat.Count; i++)
            {
                var l = ehdokkaat[i].L;
                if (i < n)
                {
                    if (l.shadows != LightShadows.Soft) { l.shadows = LightShadows.Soft; l.shadowStrength = 0.85f; l.shadowNearPlane = 0.08f; l.shadowBias = 0.04f; l.shadowNormalBias = 0.3f; }
                }
                else l.shadows = LightShadows.None;
            }
        }

        /// <summary>Seikkailu päättyi: hallitut valot takaisin ilman varjoa.</summary>
        public static void Palauta()
        {
            foreach (var l in hallitut) if (l != null) l.shadows = LightShadows.None;
            hallitut.Clear(); tunnetut.Clear();
        }
    }
}
