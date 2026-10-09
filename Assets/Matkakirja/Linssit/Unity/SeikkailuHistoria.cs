// LINNAN HISTORIA (PT 9.10.2026, juna 171): Historiajana.Olavinlinna (noin 3 min) drone-kameralla dioraamassa. Kamera kiertää
// linnaa (Historiajana.Kamera), vuosi etenee vaiheittain, vuoden 1499 jälkeiset osat kasvavat korkeuden mukaan
// (SeikkailuKavely.AsetaKasvu, kun kävelydata ja leikkaukset ovat käytössä), avainsana (vuosiluku + muutama sana) näkyy
// DioraamaTaulussa vain tämän ajon aikana (PT:n ehto 2: ei pelin aikana). Ilman kertojaa (ehto 2); kertoja tulee omistajan luvalla.
// Käynnistys: kehityskomento "poikki historia" (Natiivi-UI:n alun valintakortti "Linnan historia" kutsuu Aloita, kun
// Historiajana.Lukittu). Esc tai Natiivi-UI:n ⏭ Ohita lopettaa (napautus ei). Vaihemallit (jääkausi, 1475, 1700-luku, palo) tulevat LR:ltä; siihen asti
// näkyy nykyinen kuori ja ympäristö.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuHistoria : MonoBehaviour
    {
        static SeikkailuHistoria ajossa;
        public static bool Kaynnissa => ajossa != null;
        /// <summary>Avainsana nyt (DioraamaTaulu näyttää; null = ei).</summary>
        public static HistoriaVaihe Avainsana { get; private set; }
        /// <summary>Drone-kaaren alkuatsimuutti (kompassi) ja linnan keskipiste/säde Unityssa (SeikkailuNousun luvut).</summary>
        public static float AlkuAtsimuutti = 0f;   // siirtää koko kamerakäyrää (kohtauslistan atsimuutit ovat kompassisuuntia)

        Action valmis;
        bool lopeta;

        /// <param name="vaiheJuuri">Paketin blender-kansio (LR v45y: blender/vaiheet/vaiheet.json); null = ei vaihemalleja.</param>
        public static void Aloita(Transform kamera, Action valmis = null, Action<string> kirjaa = null, string vaiheJuuri = null, Func<string, string> url = null)
        {
            if (kamera == null) { valmis?.Invoke(); return; }
            Lopeta();
            var go = new GameObject("SeikkailuHistoria");
            ajossa = go.AddComponent<SeikkailuHistoria>();
            ajossa.valmis = valmis;
            var nayttamo = FindAnyObjectByType<DioraamaNayttamo>();
            ajossa.vaiheetKesken = vaiheJuuri != null && nayttamo != null;
            if (ajossa.vaiheetKesken)
                ajossa.StartCoroutine(SeikkailuVaiheet.Lataa(vaiheJuuri, url ?? (s => s), nayttamo.transform, kirjaa, v => { if (ajossa != null && !ajossa.lopeta) { ajossa.vaiheet = v; ajossa.vaiheetKesken = false; } else v.Tuhoa(); }));
            ajossa.StartCoroutine(ajossa.Aja(kamera, kirjaa));
        }

        SeikkailuVaiheet vaiheet;
        bool vaiheetKesken;

        // KERTOJA (PT 9.10.: 9 riviä Pelikoodarin aja-generointi.sh:lla omistajan luvalla): ääni workerin kautta {Palvelin}/opas/aani/<sha>.mp3,
        // sha taulusta olavinlinna.historia.<avain>.kertoja.aani (tyokalut/historia_kertoja_sha.mjs, sama kuin generoinnissa). Jakso
        // hakee oman rivinsä etukäteen ja soittaa sen alussa; puuttuva ääni (404) = hiljaa, ei paikkamerkkiä.
        readonly Dictionary<int, AudioClip> kertojaKlipit = new Dictionary<int, AudioClip>();
        readonly HashSet<int> kertojaHaettu = new HashSet<int>();
        AudioSource kertoja;
        /// <summary>Historian kertoja puhuu (loppumusiikin väistö).</summary>
        public static bool KertojaSoi => ajossa != null && ajossa.kertoja != null && ajossa.kertoja.isPlaying;

        static string KertojaUrl(HistoriaVaihe v)
        {
            if (v?.Avain == null) return null;
            string sha = Kieli.T("olavinlinna.historia." + v.Avain + ".kertoja.aani");   // puuttuva → avain itse (≠ 32 merkkiä)
            return sha.Length == 32 ? PuluChat.Palvelin + "/opas/aani/" + sha + ".mp3" : null;
        }

        IEnumerator HaeKertoja(int i, HistoriaVaihe v)
        {
            if (!kertojaHaettu.Add(i)) yield break;
            string url = KertojaUrl(v); if (url == null) yield break;
            using var q = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            ((DownloadHandlerAudioClip)q.downloadHandler).compressed = true;
            yield return q.SendWebRequest();
            if (q.result == UnityWebRequest.Result.Success && DownloadHandlerAudioClip.GetContent(q) is AudioClip k && k.length > 0.2f) kertojaKlipit[i] = k;
        }

        void SoitaKertoja(int i, Action<string> kirjaa)
        {
            if (!kertojaKlipit.TryGetValue(i, out var k)) return;
            if (kertoja == null) { kertoja = gameObject.AddComponent<AudioSource>(); kertoja.spatialBlend = 0f; kertoja.playOnAwake = false; }
            kertoja.Stop(); kertoja.clip = k; kertoja.volume = DioraamaAanet.PuheTaso * Asetukset.Taso(Voima.Lukija); kertoja.PlayDelayed((float)Historiajana.KertojaViiveS);
            kirjaa?.Invoke($"seikkailu: historia kertoja {i} ({k.length:F1} s)");
        }
        readonly List<Renderer> piilotetut = new List<Renderer>(); readonly List<Light> sammutetut = new List<Light>();
        bool linnaPiilossa;

        /// <summary>Linna piiloon ennen kivilinnaa (tyhjä saari, puuvarustus): kaikki näyttämön renderöijät ja pistevalot paitsi ympäristö
        /// (maasto, vesi, taivas, puut), kuoren vesi ja vaihemallit; palautus täsmälleen samoihin.</summary>
        void LinnaNakyviin(bool nakyy)
        {
            if (nakyy == !linnaPiilossa) return;
            linnaPiilossa = !nakyy;
            if (nakyy)
            {
                foreach (var r in piilotetut) if (r != null) r.enabled = true;
                foreach (var l in sammutetut) if (l != null) l.enabled = true;
                piilotetut.Clear(); sammutetut.Clear();
                return;
            }
            var n = FindAnyObjectByType<DioraamaNayttamo>(); if (n == null) return;
            bool Jaa(Transform t) { for (; t != null && t != n.transform; t = t.parent) if (t.name.StartsWith("Ymparisto", StringComparison.Ordinal) || t.name.StartsWith("Vaihe:", StringComparison.Ordinal) || t.name == "Ulkokuori:vesi") return true; return false; }   // kieli: ei (tekninen)
            foreach (var r in n.GetComponentsInChildren<Renderer>(false)) if (r.enabled && !Jaa(r.transform)) { r.enabled = false; piilotetut.Add(r); }
            foreach (var l in n.GetComponentsInChildren<Light>(false)) if (l.enabled && l.type != LightType.Directional && !Jaa(l.transform)) { l.enabled = false; sammutetut.Add(l); }
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
            yield return HaeKertoja(0, h.Vaiheet[0]);   // ensimmäinen rivi ennen alkua (puuttuva → heti eteenpäin)
            // Vaihemallit valmiiksi ennen alkua (tyhjä saari näkyy heti, linna ei katoa tyhjään veteen); enintään 10 s.
            for (float odotus = 0; vaiheetKesken && odotus < 10f && !lopeta; odotus += Time.unscaledDeltaTime) yield return null;
            float alku = Time.unscaledTime;
            int vaihe = -1; double seurLoki = 0;
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
                if (t >= seurLoki) { seurLoki += 5; kirjaa?.Invoke($"seikkailu: historia t={t:F1} vuosi {vuosi:F0} kamera {sij}"); }   // kuva-arkin aikaleimat
                LinnaNakyviin(Historiajana.LinnaNakyy(vuosi));
                List<KavelyLeikkaus> vl = null;
                if (vaiheet != null)
                    foreach (var vm in vaiheet.Vaiheet)
                    {
                        bool nakyy = vm.Nakyy(vuosi);
                        if (vm.Go != null && vm.Go.activeSelf != nakyy) kirjaa?.Invoke($"seikkailu: historia vaihe {vm.Malli.Id} {(nakyy ? "näkyviin" : "pois")} ({vuosi:F0})");
                        vm.Nayta(vuosi);
                        if (nakyy && vm.Leikkaukset != null) vl = vm.Leikkaukset;
                    }
                if (kasvu) SeikkailuKavely.AsetaHistoriaLeikkaukset(vl);
                if (kasvu) SeikkailuKavely.AsetaKasvu(n => Historiajana.Kasvu(vuosi, SeikkailuKavely.HistoriaOsa(n)));
                var (i, _) = h.Kohta(t);
                if (i != vaihe)
                {
                    vaihe = i; kirjaa?.Invoke($"seikkailu: historia vaihe {i} ({h.Vaiheet[i].VuosiTeksti}) {t:F1} s");
                    if (h.Vaiheet[i].Kertoja) SoitaKertoja(i, kirjaa);   // rivi 9 jatkuu restaurointiin (1961-kohtauksella ei omaa riviä)
                    if (i + 1 < h.Vaiheet.Count) StartCoroutine(HaeKertoja(i + 1, h.Vaiheet[i + 1]));
                }
                Avainsana = h.Avainsana(t);
                if (Avainsana != nakyva) { nakyva = Avainsana; if (nakyva != null) Debug.Log($"MATKAKIRJA linssit: historia avainsana {nakyva.VuosiTeksti} {nakyva.Sanat} ({t:F1} s)"); }
                // Vain Esc ja Natiivi-UI:n ⏭ Ohita (Lopeta) päättävät historian; napautus ei (PT 9.10.: vahinkonapautus ei katkaise).
                var kb = Keyboard.current;
                if (kb != null && kb.escapeKey.wasPressedThisFrame) break;
                yield return null;
            }
            Avainsana = null;
            LinnaNakyviin(true);
            vaiheet?.Tuhoa(); vaiheet = null;
            if (kasvu) { SeikkailuKavely.AsetaHistoriaLeikkaukset(null); SeikkailuKavely.AsetaKasvu(null); }
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
