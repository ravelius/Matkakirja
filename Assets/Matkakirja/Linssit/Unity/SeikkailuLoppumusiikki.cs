// OLAVINLINNAN LOPPUMUSIIKKI (omistaja 9.10.2026: "Medieval: The Bard's Tale", CC0; PT juna 174): soi pelattavan palan lopussa K2-dronesta
// (SeikkailuKappeli.Nousu) loppukuvan ja lopputekstien (tietokerroksen loppukortit) ajan ☰-mikserin Musiikki-voimalla. Väistää puheen
// alle (linnan puhe, kertoja tai hahmon repliikki: 35 %, liukuen). Esikytkentä: soi, kun tiedosto on ämpärissä; puuttuva (404) = hiljaa,
// ei paikkamerkkiä. Häivytys sisään 2 s ja ulos 3 s (Lopeta). Kappale soi kerran (ei silmukkaa).
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuLoppumusiikki : MonoBehaviour
    {
        /// <summary>Kappale ja saumaton jatkosilmukka (Pelikoodari 9.10.: seikkailu/olavinlinna/musiikki-v1, loppu.mp3 158,6 s ja
        /// loppu-silmukka.mp3 57,7 s, −11,6 LUFS kuten pelin musiikki). Silmukka jatkaa, jos lopputekstit ovat yhä auki kappaleen jälkeen.</summary>
        public static string Url = "https://media.matkakirja.app/seikkailu/olavinlinna/musiikki-v1/loppu.mp3",
            SilmukkaUrl = "https://media.matkakirja.app/seikkailu/olavinlinna/musiikki-v1/loppu-silmukka.mp3";
        public const float VaistoKerroin = 0.35f, SisaanS = 2f, UlosS = 3f;
        /// <summary>Mikserin tunnus (musiikki-ryhmä, konteksti linna).</summary>
        public const string Id = "loppumusiikki";

        static SeikkailuLoppumusiikki ajossa;
        public static bool Soi => ajossa != null && ajossa.lahde != null && ajossa.lahde.isPlaying;

        AudioSource lahde; float taso; bool lopeta;

        public static void Aloita(Transform isa, System.Action<string> kirjaa = null)
        {
            if (string.IsNullOrEmpty(Url) || ajossa != null) return;
            var go = new GameObject("Seikkailu loppumusiikki");
            go.transform.SetParent(isa, false);
            ajossa = go.AddComponent<SeikkailuLoppumusiikki>();
            ajossa.StartCoroutine(ajossa.Aja(kirjaa));
        }

        public static void Lopeta() { if (ajossa != null) ajossa.lopeta = true; }

        IEnumerator Aja(System.Action<string> kirjaa)
        {
            yield return Soita(Url, false, kirjaa);
            // Kappaleen jälkeen saumaton silmukka, jos lopputekstit ovat yhä auki (tietokerroksen loppukortit).
            if (!lopeta && SeikkailuTietokerros.Aktiivinen != null && SeikkailuTietokerros.Aktiivinen.LoppuAuki) yield return Soita(SilmukkaUrl, true, kirjaa);
            Pois();
        }

        IEnumerator Soita(string url, bool silmukka, System.Action<string> kirjaa)
        {
            using (var q = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG))
            {
                var dh = (DownloadHandlerAudioClip)q.downloadHandler; dh.streamAudio = true; dh.compressed = true;
                yield return q.SendWebRequest();
                if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: loppumusiikki ei ämpärissä ({q.responseCode})"); lopeta = true; yield break; }
                var k = DownloadHandlerAudioClip.GetContent(q);
                if (k == null) { lopeta = true; yield break; }
                k.name = silmukka ? "Musiikki:loppu-silmukka" : "Musiikki:loppu";
                SeikkailuAanet.Rekisteroi("musiikki", Id, k.name);
                if (lahde == null) lahde = gameObject.AddComponent<AudioSource>();
                lahde.clip = k; lahde.loop = silmukka; lahde.spatialBlend = 0f; lahde.playOnAwake = false; lahde.volume = taso * SeikkailuAanet.Taso("musiikki", Id);
                lahde.Play();
                kirjaa?.Invoke($"seikkailu: loppumusiikki alkaa ({k.length:F0} s)");
            }
            while (lahde != null && lahde.isPlaying)
            {
                float tavoite = lopeta ? 0f : PuheSoi() ? VaistoKerroin : 1f;
                taso = Mathf.MoveTowards(taso, tavoite, Time.unscaledDeltaTime / (lopeta ? UlosS : tavoite > taso ? SisaanS : 0.6f));
                lahde.volume = taso * SeikkailuAanet.Taso("musiikki", Id);
                if (lopeta && taso <= 0f) break;
                if (silmukka && !(SeikkailuTietokerros.Aktiivinen != null && SeikkailuTietokerros.Aktiivinen.LoppuAuki)) lopeta = true;   // tekstit suljettu
                yield return null;
            }
        }

        /// <summary>Puhetta soi: linnan puhelähde (kertoja, repliikki) tai historian kertoja.</summary>
        static bool PuheSoi() => DioraamaAanet.PuheSoiNyt || SeikkailuHistoria.KertojaSoi;

        void Pois() { if (ajossa == this) ajossa = null; Destroy(gameObject); }
        void OnDestroy() { if (ajossa == this) ajossa = null; }
    }
}
