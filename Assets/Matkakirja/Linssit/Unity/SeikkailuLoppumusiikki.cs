// OLAVINLINNAN LOPPUMUSIIKKI (omistaja 9.10.2026: "Medieval: The Bard's Tale", CC0; PT juna 174): soi pelattavan palan lopussa K2-dronesta
// (SeikkailuKappeli.Nousu) loppukuvan ja lopputekstien (tietokerroksen loppukortit) ajan ☰-mikserin Musiikki-voimalla. Väistää puheen
// alle (linnan puhe, kertoja tai hahmon repliikki: 35 %, liukuen). Esikytkentä: soi, kun tiedosto on ämpärissä; puuttuva (404) = hiljaa,
// ei paikkamerkkiä. Häivytys sisään 2 s ja ulos 3 s (Lopeta). Kappale soi kerran; silmukka (esiladattu kappaleen aikana) jatkaa
// heti kappaleen jälkeen, jos lopputekstit ovat yhä auki (Pelikoodari 10.10.: ennen silmukka ladattiin vasta kappaleen loputtua).
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
            yield return Soita(Url, false, kirjaa);   // kappale; käynnistää silmukan esilatauksen
            // Kappaleen jälkeen saumaton silmukka, jos lopputekstit ovat yhä auki (tietokerroksen loppukortit). Silmukka on esiladattu
            // kappaleen aikana (Esilataa), joten se alkaa heti kappaleen hiivuttua eikä vasta latauksen (verkon) jälkeen.
            if (!lopeta && SeikkailuTietokerros.Aktiivinen != null && SeikkailuTietokerros.Aktiivinen.LoppuAuki)
            {
                while (!silmukkaHaettu && !lopeta) yield return null;
                if (!lopeta && silmukkaKlippi != null) yield return SoitaKlippi(silmukkaKlippi, true, kirjaa);
            }
            Pois();
        }

        AudioClip silmukkaKlippi; bool silmukkaHaettu; UnityWebRequest esilataus;

        /// <summary>Silmukka muistiin kappaleen soidessa (pakattuna 1,4 Mt; LAME-tagi hakuttomaan liitokseen). Virhe = ei silmukkaa.</summary>
        IEnumerator Esilataa(System.Action<string> kirjaa)
        {
            using (var q = esilataus = UnityWebRequestMultimedia.GetAudioClip(SilmukkaUrl, AudioType.MPEG))
            {
                // Pakattuna muistiin (ei striimiä): striimattua klippiä ei voi soittaa kahdella lähteellä, ja saumaton jatko
                // (SaumatonSilmukka, hakuton liitos) tarvitsee kaksi.
                ((DownloadHandlerAudioClip)q.downloadHandler).compressed = true;
                yield return q.SendWebRequest();
                var k = q.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(q) : null;
                if (k == null) kirjaa?.Invoke($"seikkailu: loppumusiikin silmukka ei latautunut ({q.responseCode})");
                else
                {
                    k.name = "Musiikki:loppu-silmukka";
                    yield return SaumatonSilmukka.HaeTagi(SilmukkaUrl, k);   // LAME-tagi: kierroksen tarkka alku ja loppu
                    silmukkaKlippi = k;
                }
            }
            esilataus = null;
            silmukkaHaettu = true;
        }

        /// <summary>Kappale kerran striimattuna (yksi lähde); pyyntö pidetään auki soiton ajan, koska striimattu klippi lukee sen puskuria.</summary>
        IEnumerator Soita(string url, bool silmukka, System.Action<string> kirjaa)
        {
            using (var q = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG))
            {
                var dh = (DownloadHandlerAudioClip)q.downloadHandler; dh.streamAudio = !silmukka; dh.compressed = true;
                yield return q.SendWebRequest();
                if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: loppumusiikki ei ämpärissä ({q.responseCode})"); lopeta = true; yield break; }
                var k = DownloadHandlerAudioClip.GetContent(q);
                if (k == null) { lopeta = true; yield break; }
                k.name = "Musiikki:loppu";
                if (!string.IsNullOrEmpty(SilmukkaUrl)) StartCoroutine(Esilataa(kirjaa));
                yield return SoitaKlippi(k, silmukka, kirjaa);
            }
        }

        IEnumerator SoitaKlippi(AudioClip k, bool silmukka, System.Action<string> kirjaa)
        {
            SeikkailuAanet.Rekisteroi("musiikki", Id, k.name);
            if (lahde == null) lahde = gameObject.AddComponent<AudioSource>();
            lahde.clip = k; lahde.loop = silmukka; lahde.spatialBlend = 0f; lahde.playOnAwake = false; lahde.volume = taso * SeikkailuAanet.Taso("musiikki", Id);
            if (silmukka) SaumatonSilmukka.Kiinnita(lahde, pakotaLiitos: true);   // ~53 ms katko jokaisessa saumassa pois (juna 174)
            lahde.Play();
            kirjaa?.Invoke($"seikkailu: loppumusiikki{(silmukka ? "n silmukka" : "")} alkaa ({k.length:F0} s)");
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
        void OnDestroy()
        {
            if (ajossa == this) ajossa = null;
            if (esilataus != null) { esilataus.Abort(); esilataus.Dispose(); }   // kesken jäänyt esilataus (lopetus kappaleen aikana)
            if (silmukkaKlippi != null) Destroy(silmukkaKlippi);
        }
    }
}
