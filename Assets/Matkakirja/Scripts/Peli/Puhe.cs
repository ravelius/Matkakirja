// PUHE: isoisän luennat ja kertojaäänet natiivissa (Pelikoodari, 23.9.2026).
//
// Yksi puhuja kerrallaan kuten webin js/luenta.js: uusi puhe häivyttää
// edellisen, pysäytys häivyttää 1,5 s (LUENNAN_HAIPYMA_S). Äänitteet ovat
// ämpärissä (https-osoitteet sisältöpaketin kokoelmista, esim.
// saapumispuheet.data.url); ne ladataan kerran välimuistiin
// persistentDataPath/aani/<sha256(url)>.mp3 ja soitetaan sieltä, joten sama
// luenta toimii toisella kerralla ilman verkkoa.
//
// Kytkin ja taso: Natiivi-UI:n Asetukset (UI/Asetukset.cs, webin avaimet):
// Kytkin.Kertoja (web kertojaTila), Voima.Lukija (oletus 0,9, web puheVoima) ja
// Kytkin.Aanimaisema (koko pelin mykistys). Asetukset.Muuttui päivittää soivan.
// Puhuu-tapahtuma (tosi alkaessa, epätosi loppuessa) on musiikin ja
// ambienssin vaimennusta varten (web puheAlkoi/puheLoppui).
//
// PUHESYNTEESI (Lue): muut tekstit luetaan pollo-workerin puheella kuten
// webissä (js/puhe.js haePala: POST {tehtava:'puhe', teksti, persoona}).
// Natiivi tunnistautuu otsakkeella x-matkakirja-natiivi = bundle id ja samalla
// tunnisteella User-Agentissa (verkkopelin PR #2956, Fablen päätös 23.9.2026).
// Äänitetyt luennat ovat ensisijaisia; synteesi on välimuistissa kuten äänitteet.
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
        public const string Puhepalvelin = "https://matkakirja-pollo.samireivinen.workers.dev";
        /// <summary>Workerin PUHE_TEKSTIN_KATTO (tools/pollo/rajat.js).</summary>
        public const int TekstinKatto = 1000;
        /// <summary>Luennan loppuhäivytys (web LUENNAN_HAIPYMA_S).</summary>
        public const float Haivytys = 1.5f;
        /// <summary>Uuden puheen alkuhäivytys (web: kertoja alkaa pehmeästi).</summary>
        public const float Alkuhaivytys = 0.15f;

        public static Puhe Instanssi { get; private set; }

        /// <summary>Puhe alkoi (tosi) tai loppui/pysähtyi (epätosi): musiikin vaimennus.</summary>
        public event Action<bool> Puhuu;

        /// <summary>Puheen taso: Voima.Lukija, nolla kun äänet on mykistetty (Kytkin.Aanimaisema).</summary>
        public static float Voimakkuus => Asetukset.Paalla(Kytkin.Aanimaisema) ? Asetukset.Taso(Voima.Lukija) : 0f;

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

        /// <summary>Kertoja päällä (Asetukset Kytkin.Kertoja, web kertojaTila). Pois kytkeminen pysäyttää soivan.</summary>
        public static bool Paalla
        {
            get => Asetukset.Paalla(Kytkin.Kertoja);
            set => Asetukset.Aseta(Kytkin.Kertoja, value);
        }

        void AsetuksetMuuttuivat(string nimi)
        {
            if (!Paalla && (puhuu || lataus != null)) { Pysayta(0.3f); return; }
            if (lahde != null && lahde.isPlaying && haivytys == null) lahde.volume = Voimakkuus;
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
            Asetukset.Muuttui += AsetuksetMuuttuivat;
        }

        void OnDestroy()
        {
            Asetukset.Muuttui -= AsetuksetMuuttuivat;
            if (Instanssi == this) Instanssi = null;
        }

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
            lataus = StartCoroutine(LataaJaSoita(url, () => new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET), viiveS, oma));
            return true;
        }

        /// <summary>
        /// Lukee tekstin puhesynteesillä (persoona: merkinnat | kertoja | pulu,
        /// web PUHE_PERSOONAT). Muuten kuten Soita. Liian pitkä teksti katkaistaan
        /// virkkeen rajalta workerin kattoon.
        /// </summary>
        public bool Lue(string teksti, string persoona = "merkinnat", float viiveS = 0, Action loppu = null)
        {
            if (!Paalla || string.IsNullOrWhiteSpace(teksti)) return false;
            teksti = Katkaise(teksti.Trim(), TekstinKatto);
            AsetaIstunto();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = "puhe:" + persoona + ":" + teksti;
            ViimeVirhe = null;
            string runko = "{\"tehtava\":\"puhe\",\"teksti\":" + PeliApu.Json(teksti) + ",\"persoona\":" + PeliApu.Json(persoona) + "}";
            lataus = StartCoroutine(LataaJaSoita(SoivaUrl, () =>
            {
                var r = new UnityWebRequest(Puhepalvelin, UnityWebRequest.kHttpVerbPOST)
                {
                    uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                };
                r.SetRequestHeader("Content-Type", "application/json");
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                return r;
            }, viiveS, oma));
            return true;
        }

        /// <summary>Katkaisee tekstin viimeiseen virkkeen loppuun ennen kattoa (tai kattoon).</summary>
        public static string Katkaise(string teksti, int katto)
        {
            if (teksti.Length <= katto) return teksti;
            int raja = Math.Max(teksti.LastIndexOf(". ", katto, StringComparison.Ordinal),
                Math.Max(teksti.LastIndexOf("! ", katto, StringComparison.Ordinal), teksti.LastIndexOf("? ", katto, StringComparison.Ordinal)));
            return raja > katto / 3 ? teksti.Substring(0, raja + 1) : teksti.Substring(0, katto);
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

        IEnumerator LataaJaSoita(string url, Func<UnityWebRequest> pyynto, float viiveS, int oma)
        {
            float alku = Time.unscaledTime;
            string tiedosto = Path.Combine(Kansio, Tiiviste(url) + Paate(url));
            if (!File.Exists(tiedosto))
            {
                Directory.CreateDirectory(Kansio);
                string valiaikainen = tiedosto + ".lataus";
                using (var r = pyynto())
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
            haivytys = StartCoroutine(Voimakkuuteen(Voimakkuus, Alkuhaivytys, false));

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
            if (puhuu && haivytys == null && lahde.isPlaying && !Mathf.Approximately(lahde.volume, Voimakkuus))
                lahde.volume = Voimakkuus;
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
