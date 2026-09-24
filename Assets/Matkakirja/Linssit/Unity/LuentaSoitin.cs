// LINSSILUENNAN SOITIN (web js/linssipuhe.js soitaLinssiluenta): yksi luenta
// kerrallaan, uusi katkaisee edellisen, soitto alkaa viiveen jälkeen.
//
// Soi on tosi viiveen, latauksen ja soiton ajan (web luentaSoi: ajastin tai
// readyState < 3 tai soi), joten pysäkkiajo pidättää tauon loppua jo latauksen
// aikana. Puuttuva tai latautumaton tiedosto on hiljainen: Soi palautuu
// epätodeksi, eikä kello jää odottamaan (Kello.LuennanPisinMs on lisäksi katto).
//
// Mykistys on sama kuin kertojalla (EsityksenAani.Mykistetty, Pelikoodari).
using System.Collections;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public class LuentaSoitin : MonoBehaviour, ILuentaSoitin
    {
        AudioSource lahde;
        AudioClip aanite;
        Coroutine kesken;
        bool odottaa;

        public static LuentaSoitin Luo(Transform isanta)
        {
            var s = new GameObject("Luenta").AddComponent<LuentaSoitin>();
            s.transform.SetParent(isanta, false);
            s.lahde = s.gameObject.AddComponent<AudioSource>();
            s.lahde.playOnAwake = false;
            s.lahde.spatialBlend = 0;
            return s;
        }

        public bool Soi => odottaa || (lahde != null && lahde.isPlaying);

        /// <summary>Viimeksi pyydetty osoite (linssi-loki).</summary>
        public string Osoite { get; private set; }

        public void Soita(string url, double viiveMs)
        {
            Lopeta();
            if (string.IsNullOrEmpty(url) || (EsityksenAani.Mykistetty?.Invoke() ?? false)) return;
            Osoite = url;
            odottaa = true;
            kesken = StartCoroutine(Lataa(url, (float)(viiveMs / 1000)));
        }

        IEnumerator Lataa(string url, float viive)
        {
            float alku = Time.unscaledTime;
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = true; // ei mp3:n purkua pääsäikeessä (EsityksenAani, ui piikit 24.9.)
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning($"MATKAKIRJA linssit: luenta {url} ei latautunut: {p.error}");
                odottaa = false;
                kesken = null;
                yield break;
            }
            var uusi = DownloadHandlerAudioClip.GetContent(p);
            float jaljella = viive - (Time.unscaledTime - alku);
            if (jaljella > 0) yield return new WaitForSecondsRealtime(jaljella);
            Vapauta();
            aanite = uusi;
            lahde.clip = aanite;
            lahde.Play();
            odottaa = false;
            kesken = null;
        }

        public void Lopeta()
        {
            if (kesken != null) StopCoroutine(kesken);
            kesken = null;
            odottaa = false;
            Osoite = null;
            if (lahde != null) lahde.Stop();
            Vapauta();
        }

        void Vapauta()
        {
            if (lahde != null) lahde.clip = null;
            if (aanite != null) Destroy(aanite);
            aanite = null;
        }

        void Update()
        {
            if (lahde != null) lahde.mute = EsityksenAani.Mykistetty?.Invoke() ?? false;
        }

        void OnDestroy() => Lopeta();
    }
}
