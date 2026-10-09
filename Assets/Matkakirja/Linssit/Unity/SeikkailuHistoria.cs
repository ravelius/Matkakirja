// LINNAN HISTORIA (PT 9.10.2026, juna 171): Historiajana.Olavinlinna (noin 3 min) drone-kameralla dioraamassa. Kamera kiertää
// linnaa (Historiajana.Kamera), vuosi etenee vaiheittain, vuoden 1499 jälkeiset osat kasvavat korkeuden mukaan
// (SeikkailuKavely.AsetaKasvu, kun kävelydata ja leikkaukset ovat käytössä), avainsana (vuosiluku + muutama sana) näkyy
// DioraamaTaulussa vain tämän ajon aikana (PT:n ehto 2: ei pelin aikana). Ilman kertojaa (ehto 2); kertoja tulee omistajan luvalla.
// Käynnistys: kehityskomento "poikki historia" (Natiivi-UI:n alun valintakortti "Linnan historia" kutsuu Aloita, kun
// Historiajana.Lukittu). Esc tai Natiivi-UI:n ⏭ Ohita lopettaa (napautus ei). Vaihemallit (jääkausi, 1475, 1700-luku, palo) tulevat LR:ltä; siihen asti
// näkyy nykyinen kuori ja ympäristö.
using System;
using System.Collections;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuHistoria : MonoBehaviour
    {
        static SeikkailuHistoria ajossa;
        public static bool Kaynnissa => ajossa != null;
        /// <summary>Avainsana nyt (DioraamaTaulu näyttää; null = ei).</summary>
        public static HistoriaVaihe Avainsana { get; private set; }
        /// <summary>Drone-kaaren alkuatsimuutti (kompassi) ja linnan keskipiste/säde Unityssa (SeikkailuNousun luvut).</summary>
        public static float AlkuAtsimuutti = 200f;

        Action valmis;
        bool lopeta;

        public static void Aloita(Transform kamera, Action valmis = null, Action<string> kirjaa = null)
        {
            if (kamera == null) { valmis?.Invoke(); return; }
            Lopeta();
            var go = new GameObject("SeikkailuHistoria");
            ajossa = go.AddComponent<SeikkailuHistoria>();
            ajossa.valmis = valmis;
            ajossa.StartCoroutine(ajossa.Aja(kamera, kirjaa));
        }

        public static void Lopeta() { if (ajossa != null) ajossa.lopeta = true; }

        IEnumerator Aja(Transform kamera, Action<string> kirjaa)
        {
            var h = Historiajana.Olavinlinna;
            var cam = kamera.GetComponent<Camera>();
            float alkuFov = cam != null ? cam.fieldOfView : 60f;
            bool kameraVapaa = DioraamaSovitin.KameraVapaa;
            DioraamaSovitin.KameraVapaa = true;
            bool kasvu = SeikkailuKavely.LeikkauksetPaalla;
            var keski = new Matkakirja.Linssit.Dioraama.V3(SeikkailuNousu.LinnaKeskiUnity.x, SeikkailuNousu.LinnaKeskiUnity.y, -SeikkailuNousu.LinnaKeskiUnity.z);
            kirjaa?.Invoke($"seikkailu: historia alkaa ({h.Kesto:F0} s, {h.Vaiheet.Count} vaihetta, kasvu {(kasvu ? "leikkauksin" : "ei kävelydataa")}{(Historiajana.Lukittu ? "" : ", vuodet alustavia")})");
            float alku = Time.unscaledTime;
            int vaihe = -1;
            HistoriaVaihe nakyva = null;
            while (!lopeta)
            {
                double t = Time.unscaledTime - alku;
                if (t >= h.Kesto) break;
                var (sij, kohde) = Kameraliike.AsentoSijainti(h.Kamera(t, keski, SeikkailuNousu.LinnaSade, AlkuAtsimuutti));
                var s = DioraamaNayttamo.UnityPiste(sij);
                kamera.position = s;
                var suunta = DioraamaNayttamo.UnityPiste(kohde) - s;
                if (suunta.sqrMagnitude > 1e-6f) kamera.rotation = Quaternion.LookRotation(suunta, Vector3.up);
                if (cam != null) cam.fieldOfView = (float)Historiajana.Fov;
                double vuosi = h.Vuosi(t);
                if (kasvu) SeikkailuKavely.AsetaKasvu(n => Historiajana.Kasvu(vuosi, Historiajana.Osa(n)));
                var (i, _) = h.Kohta(t);
                if (i != vaihe) { vaihe = i; kirjaa?.Invoke($"seikkailu: historia vaihe {i} ({h.Vaiheet[i].VuosiTeksti}) {t:F1} s"); }
                Avainsana = h.Avainsana(t);
                if (Avainsana != nakyva) { nakyva = Avainsana; if (nakyva != null) Debug.Log($"MATKAKIRJA linssit: historia avainsana {nakyva.VuosiTeksti} {nakyva.Sanat} ({t:F1} s)"); }
                // Vain Esc ja Natiivi-UI:n ⏭ Ohita (Lopeta) päättävät historian; napautus ei (PT 9.10.: vahinkonapautus ei katkaise).
                var kb = Keyboard.current;
                if (kb != null && kb.escapeKey.wasPressedThisFrame) break;
                yield return null;
            }
            Avainsana = null;
            if (kasvu) SeikkailuKavely.AsetaKasvu(null);
            if (cam != null) cam.fieldOfView = alkuFov;
            DioraamaSovitin.KameraVapaa = kameraVapaa;
            kirjaa?.Invoke($"seikkailu: historia päättyi ({Time.unscaledTime - alku:F1} s)");
            ajossa = null;
            var v = valmis;
            Destroy(gameObject);
            v?.Invoke();
        }
    }
}
