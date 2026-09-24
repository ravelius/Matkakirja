// ÄÄNET: striimatut äänitteet UI:lle (Natiivi-UI, erä 5: pulu, luennat; B7: tehosteet ja lento).
//
// Äänitteet tulevat ämpäristä (media.matkakirja.app) mp3:na: ladataan kerran
// UnityWebRequestMultimedialla, tallennetaan laitteelle (persistentDataPath/
// aanet/…), ja muistissa pidetään viimeisimmät klipit. Soittimia on kolme
// kanavaa: Puhe (Livian repliikit), Kertoja (isoisän luennat) ja Tehoste
// (pelin ja UI:n tehosteet, pulun äänikirjasto ja lentomoottori, päällekkäin).
//
// Voimakkuudet Asetuksista kuten webissä: Pulun ääni (Voima.Pulu),
// Lukija (Voima.Lukija), Äänitehosteet (Voima.Tehosteet); Äänimaisema-kytkin
// pois = koko pelin mykistys (webin sfx.enabled). Puhevuoro: pulu ei puhu
// kertojan päälle (omistaja 8.9.2026) — kupla näkyy silti, äänettä.
//
// TEHOSTEET (B7 §1.8, webin js/sound.js play → playSlice): PeliOhjain.Aani(tunnus) ja
// UI:n omat napit soivat siivutaulusta (Tehostetaulu-alias alla): tiedosto, siivun
// alku (alusta / isku = findHits / häntä / satunnainen 20–80 %), kesto, gain, vire tai
// ±5 %:n heitto. Siivu leikataan klipistä omaksi klipikseen, ja webin gain-käyrä
// (eksponentiaalinen 10 ms:n nousu 0,0001:stä ja 40 ms:n lasku 0,0001:een) lasketaan
// näytteisiin, jolloin leikkauskohta ei naksu eikä ruudunpäivitys vaikuta ajoitukseen.
// Soiva taso = gain × 0,24 × Taso(Tehosteet) (webin bus → master 0,24 × tehosteVoima).
// Webin kaiku (dry 0,82 + wet 0,18, 1,2 s) ja master-kompressori jäävät pois.
//
// LENTOMOOTTORI (PeliOhjain.LentoAani, webin startFlight/stopFlight): jet-silmukka 40 s:n
// kohdasta (jos äänite > 60 s), nousu 0,0001 → 0,7 eksponentiaalisesti 0,15–5,2 s,
// lasku 0,9 s; sama tehosteväylän taso.
//
// VÄLIMUISTI: LRU (24 klippiä) ei vapauta klippiä, jota jokin AudioSource soittaa tai
// pitää tauolla (myös muiden roolien soittimet), eikä Suojaa-kutsulla suojattua.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;
// Siivutaulu: Pelikoodarin puhdas Peli/Aani/Tehostetaulu.cs (B7 §1.8).
using Tehostetaulu = Matkakirja.Peli.Tehostetaulu;
using TehosteRivi = Matkakirja.Peli.Tehoste;

namespace Matkakirja.Natiivi
{
    public enum AaniKanava { Puhe, Kertoja, Tehoste }

    public static class Aanet
    {
        public const string Juuri = "https://media.matkakirja.app/";
        const int Muistissa = 24;

        static readonly Dictionary<string, AudioClip> muisti = new Dictionary<string, AudioClip>();
        static readonly LinkedList<string> jarjestys = new LinkedList<string>();
        static readonly Dictionary<string, List<Action<AudioClip>>> kesken = new Dictionary<string, List<Action<AudioClip>>>();
        static readonly HashSet<AudioClip> suojatut = new HashSet<AudioClip>();
        static AudioSource puhe, kertoja;
        static readonly List<AudioSource> tehosteet = new List<AudioSource>();
        static bool kytketty;

        /// <summary>Soiko kertoja (isoisän luenta) juuri nyt: pulu vaikenee sen ajan.</summary>
        public static bool KertojaPuhuu => (kertoja != null && kertoja.isPlaying) || (Puhe.Instanssi != null && Puhe.Instanssi.Soi);
        public static bool PuluPuhuu => puhe != null && puhe.isPlaying;
        public static AudioSource Kertojasoitin => Soitin(AaniKanava.Kertoja);
        public static AudioSource Puhesoitin => Soitin(AaniKanava.Puhe);

        static bool Mykistetty => !Asetukset.Paalla(Kytkin.Aanimaisema);

        /// <summary>
        /// Kanavan voimakkuus 0…1 asetuksista (webin tasot). Tehoste on tehosteväylän taso
        /// (webin master 0,24 × tehosteVoima); soiva tehoste kertoo sen omalla gainillaan.
        /// </summary>
        public static float Taso(AaniKanava k) => Mykistetty ? 0f : k switch
        {
            AaniKanava.Puhe => Asetukset.Taso(Voima.Pulu) * 0.9f,
            AaniKanava.Kertoja => Asetukset.Taso(Voima.Lukija),
            // Webin master 0,24 × kompressorin automaattinen makeup (+1,8 dB, Tehostetaulu.Kompressori).
            _ => Tehostetaulu.Master * Tehostetaulu.Kompressori.Makeup * Asetukset.Taso(Voima.Tehosteet),
        };

        static AudioSource Soitin(AaniKanava k)
        {
            Kytke();
            if (k == AaniKanava.Puhe) return puhe;
            if (k == AaniKanava.Kertoja) return kertoja;
            tehosteet.RemoveAll(s => s == null);
            foreach (var s in tehosteet) if (!s.isPlaying && !Varattu(s)) return s;
            // Oma lapsi-GameObject: kaiku (AudioReverbFilter) koskee kaikkia saman olion lähteitä,
            // eikä puhe ja kertoja kulje webissäkään tehosteväylän kaiun läpi.
            var go = new GameObject("Tehoste " + tehosteet.Count);
            go.transform.SetParent(UiKerros.Hae().transform, false);
            var uusi = go.AddComponent<AudioSource>();
            uusi.playOnAwake = false;
            Kaiku(go.AddComponent<AudioReverbFilter>());
            tehosteet.Add(uusi);
            return uusi;
        }

        /// <summary>
        /// Soittimet ja asetusten kuuntelu valmiiksi (UiNakymat kutsuu käynnistyksessä, jotta
        /// Äänimaisema-kytkimen napsahdus ja tehosteiden levyvälimuisti ovat valmiina).
        /// </summary>
        public static void Alusta()
        {
            Kytke();
            EsilataaTehosteet();
        }

        static void Kytke()
        {
            if (kytketty && puhe != null) return;
            bool ensimmainen = !kytketty;
            kytketty = true;
            var go = UiKerros.Hae().gameObject;
            puhe = go.AddComponent<AudioSource>();
            kertoja = go.AddComponent<AudioSource>();
            puhe.playOnAwake = kertoja.playOnAwake = false;
            if (!ensimmainen) return;
            Sanelu.Alkoi += SaneluAlkoi;
            Sanelu.Loppui += SaneluLoppui;
            Asetukset.Muuttui += nimi =>
            {
                if (puhe != null) puhe.volume = Taso(AaniKanava.Puhe);
                if (kertoja != null) kertoja.volume = Taso(AaniKanava.Kertoja);
                // Tehosteliuku ja mykistys kuuluvat soiviin siivuihin heti (webin paivitaTehosteVoima).
                float vayla = Taso(AaniKanava.Tehoste);
                foreach (var s in soivat) if (!s.Lento && s.Lahde != null) s.Lahde.volume = s.Gain * vayla;
                // Webin setEnabled(true): äänet takaisin → napsahdus.
                if (nimi == nameof(Kytkin.Aanimaisema) && !Mykistetty) Tehoste("click");
            };
        }

        /// <summary>Hakee äänitteen (https-osoite tai ämpärin avain). valmis(null) = ei saatu.</summary>
        public static void Hae(string urlTaiAvain, Action<AudioClip> valmis)
        {
            if (string.IsNullOrEmpty(urlTaiAvain)) { valmis?.Invoke(null); return; }
            string url = Osoite(urlTaiAvain);
            if (muisti.TryGetValue(url, out var c) && c != null)
            {
                jarjestys.Remove(url); jarjestys.AddFirst(url);
                valmis?.Invoke(c);
                return;
            }
            if (kesken.TryGetValue(url, out var odottajat)) { odottajat.Add(valmis); return; }
            kesken[url] = new List<Action<AudioClip>> { valmis };
            UiKerros.Hae().StartCoroutine(Lataa(url));
        }

        static string Osoite(string urlTaiAvain) => urlTaiAvain.StartsWith("http") ? urlTaiAvain : Juuri + urlTaiAvain;

        /// <summary>
        /// Suojaa klipin LRU-karsinnalta (true) tai vapauttaa suojan (false). Soivat ja tauolla
        /// olevat klipit ovat suojassa ilmankin; tämä on esiladatulle klipille, joka soi myöhemmin.
        /// </summary>
        public static void Suojaa(AudioClip klippi, bool suojaa)
        {
            if (klippi == null) return;
            if (suojaa) suojatut.Add(klippi); else suojatut.Remove(klippi);
        }

        static string Levy(string url)
        {
            // Kyselyosa (?v=…) kuuluu nimeen: uudelleenäänitetty repliikki saa uuden tiedoston.
            string nimi = url.StartsWith(Juuri) ? url.Substring(Juuri.Length) : "u/" + url.GetHashCode().ToString("x");
            foreach (var m in new[] { '?', '=', '&' }) nimi = nimi.Replace(m, '_');
            if (!nimi.EndsWith(".mp3")) nimi += ".mp3";
            return Path.Combine(Application.persistentDataPath, "aanet", nimi.Replace('/', Path.DirectorySeparatorChar));
        }

        /// <summary>Lataa tavut laitteelle (kerran). Ei klippiä muistiin.</summary>
        static IEnumerator Levylle(string url, string levy)
        {
            if (File.Exists(levy)) yield break;
            using var h = UnityWebRequest.Get(url);
            h.timeout = 30;
            yield return h.SendWebRequest();
            if (h.result == UnityWebRequest.Result.Success)
            {
                try
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(levy));
                    File.WriteAllBytes(levy, h.downloadHandler.data);
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui ääni: " + e.Message); }
            }
            else Debug.LogWarning($"MATKAKIRJA ui ääni ei latautunut: {url} ({h.error})");
        }

        static IEnumerator Lataa(string url)
        {
            AudioClip klippi = null;
            string levy = Levy(url);
            // 1) Tavut laitteelle (kerran), 2) klippi levyltä: sama reitti verkossa ja ilman.
            yield return Levylle(url, levy);
            if (File.Exists(levy))
            {
                using var p = UnityWebRequestMultimedia.GetAudioClip("file://" + levy, AudioType.MPEG);
                // EI pakattuna: tehosteet siivutetaan ja iskut etsitään näytteistä (Leikkaa, Iskut: GetData), joka ei
                // toimi pakatulle klipille ("Cannot get data on compressed samples", 24.9.). Tehosteet ovat lyhyitä.
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) klippi = DownloadHandlerAudioClip.GetContent(p);
                else { Debug.LogWarning($"MATKAKIRJA ui ääni ei purkautunut: {levy} ({p.error})"); File.Delete(levy); }
            }
            if (klippi != null)
            {
                klippi.name = url;
                muisti[url] = klippi;
                jarjestys.AddFirst(url);
                Karsi();
            }
            if (kesken.TryGetValue(url, out var odottajat))
            {
                kesken.Remove(url);
                foreach (var o in odottajat) { try { o?.Invoke(klippi); } catch (Exception e) { Debug.LogException(e); } }
            }
        }

        /// <summary>
        /// LRU-karsinta vanhimmasta päästä. Käytössä oleva klippi (mikä tahansa AudioSource soittaa,
        /// on ajastanut tai pitää tauolla, tai Suojaa) jää muistiin, ja karsinta jatkuu seuraavaan;
        /// jos kaikki ovat käytössä, muisti saa hetkeksi ylittää rajan.
        /// </summary>
        static void Karsi()
        {
            if (jarjestys.Count <= Muistissa) return;
            var kaytossa = KaytossaOlevat();
            var solmu = jarjestys.Last;
            while (jarjestys.Count > Muistissa && solmu != null)
            {
                var edellinen = solmu.Previous;
                string url = solmu.Value;
                muisti.TryGetValue(url, out var vk);
                if (vk == null || !kaytossa.Contains(vk))
                {
                    jarjestys.Remove(solmu);
                    muisti.Remove(url);
                    iskut.Remove(url);
                    if (vk != null) UnityEngine.Object.Destroy(vk);
                }
                solmu = edellinen;
            }
        }

        static HashSet<AudioClip> KaytossaOlevat()
        {
            var h = new HashSet<AudioClip>(suojatut);
            // Kaikki soittimet, myös Pelikoodarin ja linssien: soiva, ajastettu tai tauolla (paikka > 0).
            foreach (var s in UnityEngine.Object.FindObjectsByType<AudioSource>(FindObjectsInactive.Include, FindObjectsSortMode.None))
                if (s != null && s.clip != null && (s.isPlaying || s.timeSamples > 0)) h.Add(s.clip);
            // Puhe- ja kertojakanavan viimeisin klippi kuten ennenkin (soi tai ei).
            if (puhe != null && puhe.clip != null) h.Add(puhe.clip);
            if (kertoja != null && kertoja.clip != null) h.Add(kertoja.clip);
            foreach (var s in soivat)
            {
                if (s.Lahde != null && s.Lahde.clip != null) h.Add(s.Lahde.clip);
                if (s.Lahdeklippi != null) h.Add(s.Lahdeklippi);
            }
            return h;
        }

        /// <summary>
        /// Soittaa äänitteen kanavalla. Puhe- ja kertojakanava katkaisevat edellisen.
        /// alkoi(klippi) kutsutaan, kun soitto todella alkaa (null = ei soinut).
        /// Tehostekanavalla vaimennus on äänitteen gain (× tehosteväylän taso).
        /// </summary>
        public static void Soita(AaniKanava k, string urlTaiAvain, Action<AudioClip> alkoi = null, float vaimennus = 1f)
        {
            Hae(urlTaiAvain, klippi =>
            {
                if (klippi == null) { alkoi?.Invoke(null); return; }
                // Pulu ei aloita kertojan päälle (kupla jää ruudulle äänettä).
                if (k == AaniKanava.Puhe && KertojaPuhuu) { alkoi?.Invoke(null); return; }
                if (k == AaniKanava.Tehoste)
                {
                    if (Mykistetty) { alkoi?.Invoke(null); return; }
                    SoitaSiivu(klippi, Osoite(urlTaiAvain), "alusta", klippi.length, vaimennus, null, true, 0f);
                    alkoi?.Invoke(klippi);
                    return;
                }
                var s = Soitin(k);
                s.Stop();
                s.clip = klippi;
                s.volume = Taso(k) * vaimennus;
                s.Play();
                alkoi?.Invoke(klippi);
            });
        }

        public static void Pysayta(AaniKanava k)
        {
            if (k == AaniKanava.Tehoste)
            {
                foreach (var s in soivat.ToArray()) if (!s.Lento) Vapauta(s);
                return;
            }
            var soitin = k == AaniKanava.Puhe ? puhe : kertoja;
            if (soitin != null) soitin.Stop();
        }

        // --- tehosteet: siivut (webin playSlice) ------------------------------------

        sealed class Soiva
        {
            public AudioSource Lahde;
            public AudioClip Siivu;        // tässä leikattu klippi (tuhotaan lopuksi); null = soi lähdeklippiä
            public AudioClip Lahdeklippi;  // välimuistin klippi, josta siivu on
            public float Gain;
            public bool Lento, Laskee;
        }

        static readonly List<Soiva> soivat = new List<Soiva>();
        static readonly Dictionary<string, float[]> iskut = new Dictionary<string, float[]>();
        const float Hiljaisuus = 0.0001f;        // webin eksponenttirampin pohja

        static bool Varattu(AudioSource a)
        {
            foreach (var s in soivat) if (s.Lahde == a) return true;
            return false;
        }

        /// <summary>
        /// Pelin tai UI:n tehoste webin sfx.play-nimellä (correct, wrong, quizOpen, paper, popup …).
        /// voima kertoo gainiin (webin pen/clack { voima }). Tuntematon nimi = hiljaisuus (§2.10).
        /// </summary>
        public static bool Tehoste(string nimi, float voima = 1f, float viive = 0f)
        {
            TehosteRivi t = Tehostetaulu.Hae(nimi);
            if (t == null || Mykistetty) return false;
            SoitaSiivu(t.Url, t.Aloitus, t.Kesto, t.Gain * voima, t.Vire, t.Tasavire, viive);
            return true;
        }

        /// <summary>Tehostetaulun nimet (testikomennolle).</summary>
        public static IEnumerable<string> TehosteNimet => Tehostetaulu.Kaikki.Keys;

        // --- sanelun tauko (web taukoaSanelunAjaksi: sfx.taukoaKonteksti + taukoaPuhePiiri) -----------

        static readonly List<AudioSource> sanelunTauolla = new List<AudioSource>();
        static bool sanelussa;

        /// <summary>Mikrofoni avautuu: kaikki tämän palvelun soivat lähteet (tehosteet, lento, puhe, kertoja) tauolle.</summary>
        static void SaneluAlkoi()
        {
            if (sanelussa) return;
            sanelussa = true;
            foreach (var s in new[] { puhe, kertoja }.Concat(tehosteet))
                if (s != null && s.isPlaying) { s.Pause(); sanelunTauolla.Add(s); }
        }

        /// <summary>Mikrofoni kiinni: tauolle pannut jatkavat (web jatkaKonteksti + jatkaPuhePiiri).</summary>
        static void SaneluLoppui()
        {
            if (!sanelussa) return;
            sanelussa = false;
            foreach (var s in sanelunTauolla) if (s != null) s.UnPause();
            sanelunTauolla.Clear();
        }

        static void SoitaSiivu(string url, string aloitus, float kesto, float gain, float? vire, bool tasavire, float viive)
        {
            // Webin play(): mykistettynä tehosteita ei synny lainkaan; sanelun ajan konteksti on pysäytetty.
            if (Mykistetty || sanelussa) return;
            string osoite = Osoite(url);
            Hae(osoite, klippi =>
            {
                if (klippi == null || Mykistetty) return;
                SoitaSiivu(klippi, osoite, aloitus, kesto, gain, vire, tasavire, viive);
            });
        }

        static void SoitaSiivu(AudioClip klippi, string url, string aloitus, float kesto, float gain, float? vire, bool tasavire, float viive)
        {
            // Vireheitto elävöittää kolahduksia; nimetty vire soittaa matalampana/korkeampana.
            float nopeus = vire.HasValue ? Heitto(vire.Value, Tehostetaulu.NimettyVireHeitto) : tasavire ? 1f : Heitto(1f, Tehostetaulu.VireHeitto);
            float pituus = klippi.length;
            float alku;
            switch (aloitus)
            {
                case "alusta": alku = 0f; break;
                case "hanta": alku = Mathf.Max(0f, pituus - kesto - 0.15f); break;
                case "isku":
                {
                    var l = Iskut(url, klippi);
                    alku = l.Length > 0 ? l[UnityEngine.Random.Range(0, l.Length)] : Satunnainen(pituus, kesto);
                    break;
                }
                default: alku = Satunnainen(pituus, kesto); break;
            }
            // Web src.start(t0, alku, kesto + 0,03): kesto on puskuriaikaa, mutta gain-käyrä kulkee
            // seinäkelloajassa ja sulkee äänen kohdassa kesto. Puskurista luetaan siis
            // min(kesto × nopeus, kesto + 0,03) ja käyrä venytetään nopeudella.
            float luku = Mathf.Min(kesto * nopeus, kesto + Tehostetaulu.SoittoLisaS);
            var siivu = Leikkaa(klippi, alku, luku, gain, verho: true, nopeus: nopeus, kayraKesto: kesto);
            var s = Soitin(AaniKanava.Tehoste);
            s.loop = false;
            s.pitch = nopeus;
            s.clip = siivu != null ? siivu : klippi;
            s.volume = gain * Taso(AaniKanava.Tehoste);
            // Varareitti (klippiä ei voi lukea): soitetaan lähdeklippiä kohdasta alku ilman käyrää.
            if (siivu == null) s.time = Mathf.Clamp(alku, 0f, Mathf.Max(0f, pituus - 0.01f));
            if (viive > 0f) s.PlayDelayed(viive); else s.Play();
            var soiva = new Soiva { Lahde = s, Siivu = siivu, Lahdeklippi = klippi, Gain = gain };
            soivat.Add(soiva);
            float soi = (siivu != null ? siivu.length : Mathf.Min(luku, pituus - alku)) / Mathf.Max(0.01f, nopeus);
            UiKerros.Hae().StartCoroutine(Lopuksi(soiva, viive + soi + 0.05f));
        }

        static IEnumerator Lopuksi(Soiva s, float sekuntia)
        {
            yield return new WaitForSecondsRealtime(sekuntia);
            Vapauta(s);
        }

        static void Vapauta(Soiva s)
        {
            if (!soivat.Remove(s)) return;
            if (s.Lahde != null)
            {
                s.Lahde.Stop();
                s.Lahde.clip = null;
                s.Lahde.loop = false;
                s.Lahde.pitch = 1f;
            }
            if (s.Siivu != null) UnityEngine.Object.Destroy(s.Siivu);
        }

        /// <summary>
        /// Webin tehosteväylän kaiku (sound.js: kuiva 0,82 + märkä 0,18, ConvolverNode 1,2 s:n kohinaimpulssilla
        /// (1 − i/n)^3,2). Impulssin −60 dB on 0,885 × 1,2 s ≈ 1,06 s; heijastukset pois (kohinaimpulssi on
        /// pelkkää jälkikaikua), korkeat taajuudet vaimenevat samassa tahdissa (valkoinen kohina).
        /// </summary>
        static void Kaiku(AudioReverbFilter k)
        {
            float Mb(float kerroin) => Mathf.Clamp(2000f * Mathf.Log10(Mathf.Max(kerroin, 1e-5f)), -10000f, 0f);
            k.reverbPreset = AudioReverbPreset.User;
            k.dryLevel = Mb(Tehostetaulu.Kaiku.Kuiva);
            k.room = Mb(Tehostetaulu.Kaiku.Marka);
            k.roomHF = 0f;
            k.roomLF = 0f;
            k.decayTime = Tehostetaulu.Kaiku.PituusS * (1f - Mathf.Pow(0.001f, 1f / Tehostetaulu.Kaiku.Vaimeneminen));
            k.decayHFRatio = 1f;
            k.reflectionsLevel = -10000f;
            k.reflectionsDelay = 0f;
            k.reverbLevel = 0f;
            k.reverbDelay = 0f;
            k.diffusion = 100f;
            k.density = 100f;
        }

        static float Heitto(float arvo, float osuus) => arvo * (1f + UnityEngine.Random.Range(-1f, 1f) * osuus);

        // Webin satunnainen siivu: äänitteen keskiosasta (20–80 %), ettei osuta alun tai lopun hiljaisuuteen.
        static float Satunnainen(float pituus, float kesto) => pituus * 0.2f + UnityEngine.Random.value * Mathf.Max(0.01f, pituus * 0.6f - kesto);

        /// <summary>
        /// Leikkaa klipistä [alku, alku + kesto] omaksi klipikseen. verho = webin gain-käyrä
        /// näytteisiin (normalisoituna: 1 = gain). null = klippiä ei voi lukea (varareitti).
        /// </summary>
        static AudioClip Leikkaa(AudioClip c, float alku, float kesto, float gain, bool verho, float nopeus = 1f, float kayraKesto = -1f)
        {
            try
            {
                if (c.loadState != AudioDataLoadState.Loaded && !c.LoadAudioData()) return null;
                int kanavat = c.channels, taajuus = c.frequency;
                int a = Mathf.Clamp(Mathf.RoundToInt(alku * taajuus), 0, Mathf.Max(0, c.samples - 1));
                int n = Mathf.Min(Mathf.RoundToInt(kesto * taajuus), c.samples - a);
                if (n <= 0 || kanavat <= 0) return null;
                var data = new float[n * kanavat];
                if (!c.GetData(data, a)) return null;
                if (verho) Verho(data, kanavat, taajuus, gain, nopeus, kayraKesto > 0f ? kayraKesto : kesto);
                var siivu = AudioClip.Create("siivu " + c.name, n, kanavat, taajuus, false);
                siivu.SetData(data, 0);
                return siivu;
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA ui ääni: siivua ei saatu (" + e.Message + ")");
                return null;
            }
        }

        /// <summary>
        /// Webin playSlice-käyrä seinäkelloajassa: 0,0001 → gain eksponentiaalisesti NousuS:ssa, pito,
        /// gain → 0,0001 eksponentiaalisesti LaskuS:ssa ennen kohtaa kesto (lasku alkaa aikaisintaan
        /// 20 ms:n kohdalla). Näyte i soi hetkellä i / taajuus / nopeus. Normalisoitu: gain AudioSource.volumeen.
        /// </summary>
        static void Verho(float[] data, int kanavat, int taajuus, float gain, float nopeus, float kesto)
        {
            int n = data.Length / kanavat;
            float pohja = Mathf.Min(1f, Hiljaisuus / Mathf.Max(gain, Hiljaisuus));
            float nousu = Tehostetaulu.NousuS;
            float laskuAlku = Mathf.Max(Tehostetaulu.PitoMinS, kesto - Tehostetaulu.LaskuS);
            float lasku = Mathf.Max(1e-4f, kesto - laskuAlku);
            float r = Mathf.Max(0.01f, nopeus);
            for (int i = 0; i < n; i++)
            {
                float t = (float)i / taajuus / r;
                float e;
                if (t < nousu) e = pohja * Mathf.Pow(1f / pohja, t / nousu);
                else if (t < laskuAlku) continue;
                else e = Mathf.Pow(pohja, Mathf.Clamp01((t - laskuAlku) / lasku));
                int o = i * kanavat;
                for (int k = 0; k < kanavat; k++) data[o + k] *= e;
            }
        }

        /// <summary>
        /// Webin findHits: kohdat, joissa taso ylittää 0,3 × huipun; väli 100 ms, kohta −5 ms.
        /// Lasketaan kerran klippiä kohden (ensimmäinen kanava, kuten webissä).
        /// </summary>
        static float[] Iskut(string url, AudioClip c)
        {
            if (iskut.TryGetValue(url, out var l)) return l;
            var tulos = new List<float>();
            try
            {
                if (c.loadState == AudioDataLoadState.Loaded || c.LoadAudioData())
                {
                    int k = Mathf.Max(1, c.channels), n = c.samples;
                    float taajuus = c.frequency;
                    var data = new float[n * k];
                    if (c.GetData(data, 0))
                    {
                        int vali = Mathf.FloorToInt(taajuus * 0.1f);
                        float huippu = 0f;
                        for (int i = 0; i < n; i += 16) huippu = Mathf.Max(huippu, Mathf.Abs(data[i * k]));
                        float raja = huippu * 0.3f;
                        for (int i = 0; i < n; i += 8)
                        {
                            if (Mathf.Abs(data[i * k]) >= raja)
                            {
                                tulos.Add(Mathf.Max(0f, i / taajuus - 0.005f));
                                i += vali;
                            }
                        }
                    }
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui ääni: iskut (" + e.Message + ")"); }
            return iskut[url] = tulos.ToArray();
        }

        /// <summary>Tehosteiden tiedostot laitteelle taustalla (webin loadRealSamples); muistiin vasta soitettaessa.</summary>
        static void EsilataaTehosteet()
        {
            var osoitteet = new List<string>();
            foreach (var t in Tehostetaulu.Kaikki.Values) if (!osoitteet.Contains(t.Url)) osoitteet.Add(t.Url);
            if (!osoitteet.Contains(Tehostetaulu.Lento.Url)) osoitteet.Add(Tehostetaulu.Lento.Url);
            UiKerros.Hae().StartCoroutine(Esilataa(osoitteet));
        }

        static IEnumerator Esilataa(List<string> osoitteet)
        {
            foreach (var u in osoitteet)
            {
                string url = Osoite(u);
                yield return Levylle(url, Levy(url));
            }
        }

        // --- lentomoottori (webin startFlight / stopFlight) -------------------------

        static Soiva lento;
        static int lentoVuoro;

        /// <summary>
        /// Lennon moottoriääni (PeliOhjain.LentoAani): alkaa = true käynnistää (jo soiva jatkuu),
        /// false häivyttää 0,9 s:ssa. kestoS on webissäkin vain synteesikoneen käyrälle.
        /// </summary>
        public static void LentoAani(bool alkaa, float kestoS = 0f)
        {
            if (!alkaa)
            {
                lentoVuoro++;
                if (lento != null) lento.Laskee = true;
                lento = null;
                return;
            }
            if (lento != null || Mykistetty) return;
            int vuoro = ++lentoVuoro;
            Hae(Tehostetaulu.Lento.Url, klippi =>
            {
                if (klippi == null || vuoro != lentoVuoro || lento != null || Mykistetty) return;
                // Pitkissä äänityksissä alku on lähestymistä: silmukka lennon ytimestä loppuun.
                float alku = klippi.length > Tehostetaulu.Lento.PitkaAaniteS ? Tehostetaulu.Lento.SilmukkaAlkuS : 0f;
                AudioClip silmukka = alku > 0f ? Leikkaa(klippi, alku, klippi.length - alku, 1f, verho: false) : null;
                var s = Soitin(AaniKanava.Tehoste);
                s.clip = silmukka != null ? silmukka : klippi;
                s.loop = true;
                s.pitch = 1f;
                s.volume = Hiljaisuus * Taso(AaniKanava.Tehoste);
                // Varareitti: ilman leikkausta silmukka palaa äänitteen alkuun.
                if (silmukka == null && alku > 0f) s.time = alku;
                s.Play();
                lento = new Soiva { Lahde = s, Siivu = silmukka, Lahdeklippi = klippi, Gain = Tehostetaulu.Lento.Gain, Lento = true };
                soivat.Add(lento);
                UiKerros.Hae().StartCoroutine(Lentokayra(lento));
            });
        }

        static IEnumerator Lentokayra(Soiva s)
        {
            float alku = Time.unscaledTime, taso = Hiljaisuus;
            float a = Tehostetaulu.Lento.NousuAlkuS, b = Tehostetaulu.Lento.NousuLoppuS, huippu = Mathf.Min(1f, s.Gain);
            while (!s.Laskee)
            {
                if (s.Lahde == null || !soivat.Contains(s)) yield break;
                float t = Time.unscaledTime - alku;
                taso = t < a ? Hiljaisuus : t >= b ? huippu : Hiljaisuus * Mathf.Pow(huippu / Hiljaisuus, (t - a) / (b - a));
                s.Lahde.volume = taso * Taso(AaniKanava.Tehoste);
                yield return null;
            }
            // Moottori hiipuu rauhassa nykyisestä tasosta 0,0001:een.
            float v0 = Mathf.Max(taso, Hiljaisuus), laskuAlku = Time.unscaledTime, kesto = Tehostetaulu.Lento.LaskuS;
            while (Time.unscaledTime - laskuAlku < kesto)
            {
                if (s.Lahde == null || !soivat.Contains(s)) yield break;
                float u = (Time.unscaledTime - laskuAlku) / kesto;
                s.Lahde.volume = v0 * Mathf.Pow(Hiljaisuus / v0, u) * Taso(AaniKanava.Tehoste);
                yield return null;
            }
            Vapauta(s);
        }

        /// <summary>Soiko lentomoottori (testikomennolle).</summary>
        public static bool LentoSoi => lento != null;

        // --- pulun äänikirjasto (webin js/sound.js PULUN_TEHOSTEET) --------------

        public const string PulunTehosteJuuri = "aanet/tehosteet/pulu/";

        // Webin taso: PULUN_PERUSVOIMA 0,35 × PULUN_TASO 0,4 (−8 dB luentaan nähden) × voima,
        // sitten tehosteväylä 0,24 × tehosteVoima ≈ 0,034 × voima. Ennen B7:ää natiivi soitti
        // koko äänitteen tasolla 0,4 × Tehosteet × voima, noin 21 dB kovempaa.
        const float PulunPerusvoima = 0.35f, PulunTaso = 0.4f;

        /// <summary>Webin tehosteavain → ämpärin tiedosto (manifesti.json tunnus), siivun kesto ja voima.</summary>
        static readonly Dictionary<string, (string Tiedosto, float Kesto, float Voima)> pulunTehosteet = new Dictionary<string, (string, float, float)>
        {
            ["pulu.siivet"] = ("siivet-lento", 1.4f, 0.9f),
            ["pulu.siivet-lasku"] = ("siivet-laskeutuminen", 1.2f, 0.9f),
            ["pulu.tomahdys"] = ("tomahdys-laskeutuminen", 0.7f, 1f),
            ["pulu.doing"] = ("doing-vieteri", 1.1f, 0.8f),
            ["pulu.sekoilu"] = ("sekoilu-2", 1.2f, 0.8f),
            ["pulu.ovi-auki"] = ("ovi-auki", 1.6f, 0.9f),
            ["pulu.ovi-kiinni"] = ("ovi-lamahdys", 1.2f, 0.9f),
            ["pulu.viuhahdus"] = ("viuhahdus-tulo", 0.9f, 0.85f),
            ["pulu.viuhahdus-lahto"] = ("viuhahdus-lahto", 0.9f, 0.85f),
            ["pulu.kujerrus"] = ("kujerrus", 1.4f, 0.9f),
            ["pulu.sahke"] = ("paperin-kahina", 1f, 0.8f),
            ["pulu.kilahdus"] = ("kellon-kilahdus", 1.2f, 0.8f),
            ["pulu.kamera-klik"] = ("kamera-laukaisin", 0.8f, 1f),
            ["pulu.kirjain-suhina"] = ("kirjain-suhina", 1.4f, 0.8f),
            ["pulu.pulla-riemu"] = ("pulla-riemu", 0.9f, 0.9f),
            ["pulu.pulla-puraisu"] = ("pulla-puraisu", 0.8f, 0.7f),
        };

        /// <summary>Pulun tehosteiden avaimet (testikomennolle).</summary>
        public static IEnumerable<string> PulunTehosteNimet => pulunTehosteet.Keys;

        /// <summary>Webin LIVIAN_TEHOSTEET-ohjelmat: (tehoste, viive s).</summary>
        static readonly Dictionary<string, (string Tehoste, float Viive)[]> ohjelmat = new Dictionary<string, (string, float)[]>
        {
            ["saapuu"] = new[] { ("pulu.viuhahdus", 0f), ("pulu.siivet", 0.1f), ("pulu.tomahdys", 0.45f) },
            ["sekoilee"] = new[] { ("pulu.doing", 0f) },
            ["lahtee"] = new[] { ("pulu.siivet", 0f), ("pulu.viuhahdus-lahto", 0.18f) },
        };

        /// <summary>
        /// Yksi pulun tehoste (esim. "pulu.kujerrus") webin tasolla, siivuna alusta. Muut nimet
        /// (paper, popup, correct …) ovat UI:n omia tehosteita samasta taulusta kuin pelin.
        /// </summary>
        public static void PulunTehoste(string avain, float voima = 1f, float viive = 0f)
        {
            if (!pulunTehosteet.TryGetValue(avain, out var t)) { Tehoste(avain, voima, viive); return; }
            SoitaSiivu(PulunTehosteJuuri + t.Tiedosto + ".mp3", "alusta", t.Kesto, PulunPerusvoima * PulunTaso * t.Voima * voima, null, false, viive);
        }

        /// <summary>Tehosteohjelma: "saapuu", "sekoilee", "lahtee".</summary>
        public static void PulunOhjelma(string laji)
        {
            if (!ohjelmat.TryGetValue(laji, out var o)) return;
            foreach (var (tehoste, viive) in o)
            {
                if (viive <= 0) PulunTehoste(tehoste);
                else UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule.Execute(() => PulunTehoste(tehoste)).StartingIn((long)(viive * 1000));
            }
        }
    }
}
