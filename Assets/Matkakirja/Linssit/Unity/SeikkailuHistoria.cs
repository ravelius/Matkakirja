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
        /// <summary>Mikseritunnus historian kertojalle (puhe-ryhmä, konteksti linna).</summary>
        public const string KertojaId = "historia-kertoja";
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
            if (q.result == UnityWebRequest.Result.Success && DownloadHandlerAudioClip.GetContent(q) is AudioClip k && k.length > 0.2f)
            {
                k.name = "Kertoja:historia-" + i; kertojaKlipit[i] = k;
                SeikkailuAanet.Rekisteroi("puhe", KertojaId, k.name);
            }
        }

        void SoitaKertoja(int i, Action<string> kirjaa)
        {
            if (!kertojaKlipit.TryGetValue(i, out var k)) return;
            if (kertoja == null) { kertoja = gameObject.AddComponent<AudioSource>(); kertoja.spatialBlend = 0f; kertoja.playOnAwake = false; }
            kertoja.Stop(); kertoja.clip = k; kertoja.volume = DioraamaAanet.PuheTaso * SeikkailuAanet.Taso("puhe", KertojaId); kertoja.PlayDelayed((float)Historiajana.KertojaViiveS);
            kirjaa?.Invoke($"seikkailu: historia kertoja {i} ({k.length:F1} s)");
        }
        readonly HashSet<Renderer> piilotetut = new HashSet<Renderer>(); readonly HashSet<Light> sammutetut = new HashSet<Light>();
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
                // Valot syttyvät 1,5 s:ssa (arvio 4, PT: valmiin linnan valot ilmestyivät kerralla); lepattavat valot asettavat oman
                // voimakkuutensa itse, ja häivytys koskee vain tasaisia valoja.
                ValotLoppuun();
                foreach (var l in sammutetut) if (l != null) { syttyvat.Add((l, l.intensity)); l.intensity = 0f; l.enabled = true; }
                piilotetut.Clear(); sammutetut.Clear();
                if (syttyvat.Count > 0) syttyminen = StartCoroutine(Syty());
                return;
            }
            PiilotaLinna();
        }

        readonly List<(Light L, float I)> syttyvat = new List<(Light, float)>(); Coroutine syttyminen;
        public const float ValotSyttyvatS = 1.5f;

        IEnumerator Syty()
        {
            for (float t = 0f; t < ValotSyttyvatS; t += Time.deltaTime)
            {
                float u = t / ValotSyttyvatS; u = u * u * (3f - 2f * u);
                foreach (var (l, i) in syttyvat) if (l != null) l.intensity = i * u;
                yield return null;
            }
            syttyminen = null; ValotLoppuun();
        }

        /// <summary>Syttyvät valot täyteen heti (häivytys valmis, katkaistu tai historia päättyy).</summary>
        void ValotLoppuun()
        {
            if (syttyminen != null) { StopCoroutine(syttyminen); syttyminen = null; }
            foreach (var (l, i) in syttyvat) if (l != null) l.intensity = i;
            syttyvat.Clear();
        }

        /// <summary>Linnan renderöijät ja valot piiloon (ympäristö, vaihemallit ja vesi jäävät): kaikki dioraaman kerroksen renderöijät
        /// koko näkymässä (myös seikkailun juuret näyttämön ulkopuolella). Ajetaan joka ruutu linnan ollessa piilossa (Update jälkeen):
        /// lykätyt kävelyosat, SeikkailuEsineiden huonelataus ja kynttilät kytkivät renderöijiä takaisin, ja ne näkyivät valopisteinä
        /// tyhjän saaren yllä (arvio 2 ja 3 9.10., t = 0–37).</summary>
        void PiilotaLinna(bool leikattavatNakyviin = false)
        {
            var n = FindAnyObjectByType<DioraamaNayttamo>(); if (n == null) return;
            // Piiloon: näyttämön lapset paitsi ympäristö, vaihemallit ja vesi; näyttämön ulkopuolelta vain seikkailun juuret ("Seikkailu …").
            bool Piiloon(Transform t)
            {
                bool seikkailu = false;
                for (; t != null; t = t.parent)
                {
                    if (t == n.transform) return true;
                    if (t.name.StartsWith("Ymparisto", StringComparison.Ordinal) || t.name.StartsWith("Vaihe:", StringComparison.Ordinal) || t.name == "Ulkokuori:vesi") return false;   // kieli: ei (tekninen)
                    if (t.name.StartsWith("Seikkailu", StringComparison.Ordinal) && t.name != "SeikkailuHistoria") seikkailu = true;   // kieli: ei (tekninen)
                }
                return seikkailu;
            }
            foreach (var r in FindObjectsByType<Renderer>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
            {
                if (leikattavatNakyviin && Leikattava(r)) { if (!r.enabled && piilotetut.Remove(r)) r.enabled = true; continue; }   // rakentuva kuori
                if (r.enabled && Piiloon(r.transform)) { r.enabled = false; piilotetut.Add(r); }
            }
            foreach (var l in FindObjectsByType<Light>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
                if (l.enabled && l.type != LightType.Directional && Piiloon(l.transform)) { l.enabled = false; sammutetut.Add(l); }
        }

        /// <summary>Historiassa kävelyosista näkyy vain ranta-1499 (LR 9.10.): muiden osien sisäpinnat ja vuoden 1499 tulkinnat (vesiportin
        /// etuvarustus, puusilta) jäivät kuoren leikkauksista ilmaan. Joka ruutu (lykätyt osat latautuvat myöhemmin); palautus lopussa.</summary>
        void PiilotaKavelyosat()
        {
            var n = FindAnyObjectByType<DioraamaNayttamo>(); if (n == null) return;
            foreach (var r in n.GetComponentsInChildren<Renderer>(false))
            {
                if (!r.enabled) continue;
                for (var t = r.transform; t != null && t != n.transform; t = t.parent)
                    if (t.name.StartsWith("Tila:kavely:", StringComparison.Ordinal))
                    {
                        if (Array.IndexOf(HistorianKavelyosat, t.name) < 0) { r.enabled = false; kavelyPiilossa.Add(r); }
                        else if (t.name == HistorianKavelyosat[0] && tasaisetRannat.Add(r)) TasainenRanta(r);
                        break;
                    }
            }
        }
        readonly HashSet<Renderer> kavelyPiilossa = new HashSet<Renderer>();

        // Arvio 6: ranta-1499:n leivotussa valoatlaksessa (albedo × valo) on mustia alueita ja mustaa reunatäyttöä pienten UV-saarten välissä;
        // kaukaa (mipit) täyttö näkyi lounaispuolella mustina aukkoina. Historian ajaksi tasainen kalliosävy (atlaksen keskiarvo), palautus lopussa.
        readonly HashSet<Renderer> tasaisetRannat = new HashSet<Renderer>();
        // Arvio 7: lounaispuolen musta ei ollut tyhjää (järvitaso on kuoren alla) vaan kuvaamattomia mustia tekselejä kuoressa ja
        // porttikäytävän pimeässä valoatlaksessa, jotka myöhempien rakenteiden leikkaus paljastaa. Historian ajan maan tasolla (y < 4 m)
        // lähes mustat tekselit kalliosävyllä (DioraamaKuori ja DioraamaLeivottu, globaali; oletus 0 = pois).
        static readonly int IdMustaKorvaus = Shader.PropertyToID("_DioraamaMustaKorvaus");
        // Raakakuvan sävy ennen valoa (arvio 8: valaistun värin kynnys vaalensi yön tummat pinnat). Arvio 9: historia näkyy kuoren
        // hämäräkuvalla, jonka raaka-arvot ovat noin viidesosa päiväkuvasta, joten 0,27 näkyi valkoisena; sävy tunnelman mukaan.
        static Vector4 MustaKorvaus => Hamara ? new Vector4(0.045f, 0.047f, 0.05f, 4f) : new Vector4(0.27f, 0.28f, 0.29f, 4f);
        /// <summary>Kuori hämäräkuvalla (DioraamaTunnelma.Hamara; DioraamaSovitin asettaa ennen Aloita-kutsua).</summary>
        public static bool Hamara;
        /// <summary>Tyhjän saaren maa linnan alla koko historian ajan (arvio 10 virhe 1, PT 9.10.: lounaispuolen vedenväriset aukot
        /// täyttyvät maalla); "poikki historia saari 0" palauttaa vanhan (saari vain ennen kuoren nousua).</summary>
        public static bool SaariAlla = true;
        static Texture2D rantaSavy; static MaterialPropertyBlock rantaLohko;
        static void TasainenRanta(Renderer r)
        {
            if (rantaSavy == null) { rantaSavy = new Texture2D(1, 1, TextureFormat.RGBA32, false) { name = "Historia:rantasavy" }; rantaSavy.SetPixel(0, 0, new Color(0.42f, 0.43f, 0.45f)); rantaSavy.Apply(false, true); }
            rantaLohko ??= new MaterialPropertyBlock();
            r.GetPropertyBlock(rantaLohko); rantaLohko.SetTexture("_ValoAtlas", rantaSavy); r.SetPropertyBlock(rantaLohko);
        }
        /// <summary>Historiassa näkyvät kävelyosat (LR 9.10.): ranta-1499 (kalliotäyttö ja vesipohjat leikkausten alla) ja porttikaytava-T102
        /// ilman sisätilaleikkaustaan (sen seinät täyttävät onton fotogrammetriakuoren porttikäytävän tornin juurella, arvio 4 t = 40–70).</summary>
        static readonly string[] HistorianKavelyosat = { "Tila:kavely:ranta-1499", "Tila:kavely:porttikaytava-T102" };   // kieli: ei (tekninen)

        /// <summary>Rakentuva renderöijä: vain linnan kuori (DioraamaKuori tottelee kävelyleikkauksia). Arvio 4: leivotut huoneet
        /// (DioraamaLeivottu) näkyivät rakentumisen aikana ilman kuorta mustina laatikkoina ja tornien sisus hehkui.</summary>
        static bool Leikattava(Renderer r)
        {
            var m = r.sharedMaterial; var sh = m != null ? m.shader : null; if (sh == null) return false;
            if (sh.name.EndsWith("DioraamaKuori", StringComparison.Ordinal)) return true;
            // Arvio 5: historian kävelyosat (ranta-1499:n täyttö ja vesipohja, porttikaytava-T102) nousevat kuoren mukana, muuten
            // rakentumisen aikana lounaispuolella näkyi mustia aukkoja.
            for (var t = r.transform; t != null; t = t.parent) if (Array.IndexOf(HistorianKavelyosat, t.name) >= 0) return true;
            return false;
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
                // Kivilinna rakentuu (arvio 3): kuori nousee vedestä leikkausrajan alta, muu linna (huoneet,
                // esineet, hahmot, liekit, valot) pysyy piilossa, kunnes linna on valmis.
                bool linnaNakyy = h.LinnaNakyyT(t), rakentuu = linnaNakyy && h.Rakennus(t) < 1;
                if (rakentuu) { if (!linnaPiilossa) LinnaNakyviin(false); PiilotaLinna(true); }
                else { LinnaNakyviin(linnaNakyy); if (linnaPiilossa) PiilotaLinna(); }   // joka ruutu: huonelataus ja kynttilät (arvio 3)
                List<KavelyLeikkaus> vl = null;
                if (vaiheet != null)
                    foreach (var vm in vaiheet.Vaiheet)
                    {
                        bool maa = vm.Malli.Vuodesta == null && (h.MaaNakyy(t) || SaariAlla && linnaNakyy);   // tyhjä saari kunnes kuoren kallio on noussut (arvio 3); koe: koko ajan
                        bool nakyy = maa || vm.Nakyy(vuosi);
                        if (vm.Go != null && vm.Go.activeSelf != nakyy) kirjaa?.Invoke($"seikkailu: historia vaihe {vm.Malli.Id} {(nakyy ? "näkyviin" : "pois")} ({vuosi:F0})");
                        if (maa) { if (vm.Go != null && !vm.Go.activeSelf) vm.Go.SetActive(true); } else vm.Nayta(vuosi);
                        if (nakyy && vm.Leikkaukset != null) vl = vm.Leikkaukset;
                    }
                SeikkailuKavely.VainVuosileikkaukset = true;
                Shader.SetGlobalVector(IdMustaKorvaus, MustaKorvaus);
                PiilotaKavelyosat();
                if (rakentuu)
                {
                    double raja = h.RakennusKorkeus(t), r = SeikkailuNousu.LinnaSade * 1.3;
                    vl = vl != null ? new List<KavelyLeikkaus>(vl) : new List<KavelyLeikkaus>();
                    vl.Add(new KavelyLeikkaus("rakentuminen", keski.X, (raja + Historiajana.RakennusYla) / 2, keski.Z, 2 * r, Historiajana.RakennusYla - raja, 2 * r, 0));
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
            ValotLoppuun();   // historia päättyy: ei jätetä valoja himmeiksi (objekti tuhotaan)
            vaiheet?.Tuhoa(); vaiheet = null;
            SeikkailuKavely.VainVuosileikkaukset = false;
            Shader.SetGlobalVector(IdMustaKorvaus, Vector4.zero);
            foreach (var r in kavelyPiilossa) if (r != null) r.enabled = true;
            kavelyPiilossa.Clear();
            foreach (var r in tasaisetRannat) if (r != null) r.SetPropertyBlock(null);
            tasaisetRannat.Clear();
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
