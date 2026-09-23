// PUHE: isoisän luennat ja kertojaäänet natiivissa (Pelikoodari, 23.9.2026).
//
// Yksi puhuja kerrallaan kuten webin js/luenta.js: uusi puhe häivyttää
// edellisen, pysäytys häivyttää 1,5 s (LUENNAN_HAIPYMA_S). Äänitteet ovat
// ämpärissä (https-osoitteet sisältöpaketin kokoelmista, esim.
// saapumispuheet.data.url); ne ladataan kerran välimuistiin
// persistentDataPath/aani/<sha256(url)>.mp3 ja soitetaan sieltä, joten sama
// luenta toimii toisella kerralla ilman verkkoa.
//
// Kytkin (web luentaKytkinPaalla): PlayerPrefs "matkakirja.luennat", oletus
// päällä. Puhuu-tapahtuma (tosi alkaessa, epätosi loppuessa) on musiikin ja
// ambienssin vaimennusta varten (web puheAlkoi/puheLoppui).
//
// iOS: äänettömyyskytkin mykistäisi Unityn oletusistunnon (Ambient). Web
// Safarissa media soi kytkimestä huolimatta, joten natiivi asettaa istunnon
// Playback + MixWithOthers (Plugins/iOS/MatkakirjaAani.mm) ensimmäisellä
// puheella.
using System;
using System.Collections;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class Puhe : MonoBehaviour
    {
        public const string KytkinAvain = "matkakirja.luennat";
        /// <summary>Luennan loppuhäivytys (web LUENNAN_HAIPYMA_S).</summary>
        public const float Haivytys = 1.5f;
        /// <summary>Uuden puheen alkuhäivytys (web: kertoja alkaa pehmeästi).</summary>
        public const float Alkuhaivytys = 0.15f;

        public static Puhe Instanssi { get; private set; }

        /// <summary>Puhe alkoi (tosi) tai loppui/pysähtyi (epätosi): musiikin vaimennus.</summary>
        public event Action<bool> Puhuu;

        [Range(0, 1)] public float voimakkuus = 1f;

        AudioSource lahde;
        Coroutine lataus, haivytys;
        int tunnus;
        Action loppu;
        bool puhuu;

        /// <summary>Soiva (tai ladattava) äänite, null = hiljaa.</summary>
        public string SoivaUrl { get; private set; }
        public bool Soi => puhuu;
        public float Aika => lahde != null && lahde.clip != null ? lahde.time : 0;
        public float Kesto => lahde != null && lahde.clip != null ? lahde.clip.length : 0;
        public string ViimeVirhe { get; private set; }

        /// <summary>Luennat päällä (web luentaKytkin). Pois kytkeminen pysäyttää soivan.</summary>
        public static bool Paalla
        {
            get => PlayerPrefs.GetInt(KytkinAvain, 1) != 0;
            set
            {
                PlayerPrefs.SetInt(KytkinAvain, value ? 1 : 0);
                PlayerPrefs.Save();
                if (!value && Instanssi != null) Instanssi.Pysayta();
            }
        }

        static string Kansio => Path.Combine(Application.persistentDataPath, "aani");

        public static Puhe Hae()
        {
            if (Instanssi != null) return Instanssi;
            var go = new GameObject("MatkakirjaPuhe");
            DontDestroyOnLoad(go);
            return go.AddComponent<Puhe>();
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(gameObject); return; }
            Instanssi = this;
            lahde = gameObject.AddComponent<AudioSource>();
            lahde.playOnAwake = false;
            lahde.loop = false;
            lahde.spatialBlend = 0;
            lahde.priority = 0;
        }

        void OnDestroy() { if (Instanssi == this) Instanssi = null; }

        /// <summary>
        /// Soittaa äänitteen (https). viiveS odotetaan latauksen rinnalla;
        /// loppu kutsutaan, kun äänite soi loppuun (ei, jos se pysäytetään tai
        /// korvataan). Palauttaa false, jos luennat on kytketty pois tai url puuttuu.
        /// </summary>
        public bool Soita(string url, float viiveS = 0, Action loppu = null)
        {
            if (!Paalla || string.IsNullOrEmpty(url)) return false;
            AsetaIstunto();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = url;
            ViimeVirhe = null;
            lataus = StartCoroutine(LataaJaSoita(url, viiveS, oma));
            return true;
        }

        /// <summary>Pysäyttää häivyttäen (web haivytaAani); loppu-kutsua ei tehdä.</summary>
        public void Pysayta(float haivytysS = Haivytys)
        {
            tunnus++;
            loppu = null;
            if (lataus != null) { StopCoroutine(lataus); lataus = null; }
            SoivaUrl = null;
            if (lahde.isPlaying) Haivyta(haivytysS, true);
            else AsetaPuhuu(false);
        }

        IEnumerator LataaJaSoita(string url, float viiveS, int oma)
        {
            float alku = Time.unscaledTime;
            string tiedosto = Path.Combine(Kansio, Tiiviste(url) + Paate(url));
            if (!File.Exists(tiedosto))
            {
                Directory.CreateDirectory(Kansio);
                string valiaikainen = tiedosto + ".lataus";
                using (var r = new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET))
                {
                    r.downloadHandler = new DownloadHandlerFile(valiaikainen) { removeFileOnAbort = true };
                    r.timeout = 60;
                    yield return r.SendWebRequest();
                    if (oma != tunnus) yield break;
                    if (r.result != UnityWebRequest.Result.Success)
                    {
                        ViimeVirhe = r.error;
                        Debug.LogWarning($"MATKAKIRJA puhe: {url} ei latautunut: {r.error}");
                        lataus = null;
                        yield break;
                    }
                }
                try { if (File.Exists(tiedosto)) File.Delete(tiedosto); File.Move(valiaikainen, tiedosto); }
                catch (Exception e) { ViimeVirhe = e.Message; Debug.LogWarning("MATKAKIRJA puhe: välimuisti: " + e.Message); lataus = null; yield break; }
            }

            AudioClip klippi;
            using (var r = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, TyyppiPaatteesta(tiedosto)))
            {
                yield return r.SendWebRequest();
                if (oma != tunnus) yield break;
                if (r.result != UnityWebRequest.Result.Success)
                {
                    ViimeVirhe = r.error;
                    Debug.LogWarning($"MATKAKIRJA puhe: {tiedosto} ei avautunut: {r.error}");
                    try { File.Delete(tiedosto); } catch { }
                    lataus = null;
                    yield break;
                }
                klippi = DownloadHandlerAudioClip.GetContent(r);
            }
            float jaljella = viiveS - (Time.unscaledTime - alku);
            if (jaljella > 0) yield return new WaitForSecondsRealtime(jaljella);
            if (oma != tunnus) { Destroy(klippi); yield break; }

            if (haivytys != null) { StopCoroutine(haivytys); haivytys = null; }
            var vanha = lahde.clip;
            lahde.Stop();
            lahde.clip = klippi;
            lahde.volume = 0;
            lahde.Play();
            if (vanha != null && vanha != klippi) Destroy(vanha);
            AsetaPuhuu(true);
            lataus = null;
            haivytys = StartCoroutine(Voimakkuuteen(voimakkuus, Alkuhaivytys, false));

            // Loppu: äänite soi loppuun (ei pysäytetty eikä korvattu).
            while (oma == tunnus && lahde.isPlaying) yield return null;
            if (oma != tunnus) yield break;
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        void Haivyta(float kesto, bool pysayta)
        {
            if (haivytys != null) StopCoroutine(haivytys);
            haivytys = StartCoroutine(Voimakkuuteen(0, kesto, true));
            if (pysayta) AsetaPuhuu(false);
        }

        IEnumerator Voimakkuuteen(float kohde, float kesto, bool lopuksiSeis)
        {
            float alku = lahde.volume, t = 0;
            while (t < kesto)
            {
                t += Time.unscaledDeltaTime;
                float x = Mathf.Clamp01(t / Mathf.Max(0.001f, kesto));
                // Loppuhäivytys alkaa loivasti (viimeinen sana ei huku), alku nopeasti.
                float k = lopuksiSeis ? 1 - (1 - x) * (1 - x) : x;
                lahde.volume = Mathf.Lerp(alku, kohde, k);
                yield return null;
            }
            lahde.volume = kohde;
            if (lopuksiSeis) lahde.Stop();
            haivytys = null;
        }

        void AsetaPuhuu(bool nyt)
        {
            if (puhuu == nyt) return;
            puhuu = nyt;
            try { Puhuu?.Invoke(nyt); }
            catch (Exception e) { Debug.LogException(e); }
        }

        void Update()
        {
            if (puhuu && haivytys == null && lahde.isPlaying && !Mathf.Approximately(lahde.volume, voimakkuus))
                lahde.volume = voimakkuus;
        }

        // --- apurit ------------------------------------------------------------

        static string Tiiviste(string s)
        {
            using var sha = SHA256.Create();
            var b = sha.ComputeHash(Encoding.UTF8.GetBytes(s));
            var sb = new StringBuilder(64);
            foreach (var x in b) sb.Append(x.ToString("x2"));
            return sb.ToString();
        }

        static string Paate(string url)
        {
            var polku = url.Split('?', '#')[0];
            var p = Path.GetExtension(polku).ToLowerInvariant();
            return p == ".mp3" || p == ".m4a" || p == ".ogg" || p == ".wav" ? p : ".mp3";
        }

        static AudioType TyyppiPaatteesta(string tiedosto)
        {
            switch (Path.GetExtension(tiedosto).ToLowerInvariant())
            {
                case ".m4a": return AudioType.AUDIOQUEUE;
                case ".ogg": return AudioType.OGGVORBIS;
                case ".wav": return AudioType.WAV;
                default: return AudioType.MPEG;
            }
        }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaAani_Toisto();
        static bool istuntoAsetettu;
        static void AsetaIstunto()
        {
            if (istuntoAsetettu) return;
            istuntoAsetettu = true;
            try { MatkakirjaAani_Toisto(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: ääni-istunto: " + e.Message); }
        }
#else
        static void AsetaIstunto() { }
#endif
    }
}
