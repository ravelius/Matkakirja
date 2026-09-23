// ÄÄNET: striimatut äänitteet UI:lle (Natiivi-UI, erä 5: pulu, luennat).
//
// Äänitteet tulevat ämpäristä (media.matkakirja.app) mp3:na: ladataan kerran
// UnityWebRequestMultimedialla, tallennetaan laitteelle (persistentDataPath/
// aanet/…), ja muistissa pidetään viimeisimmät klipit. Soittimia on kolme
// kanavaa: Puhe (Livian repliikit), Kertoja (isoisän luennat) ja Tehoste
// (pulun äänikirjasto, lyhyet efektit päällekkäin).
//
// Voimakkuudet Asetuksista kuten webissä: Pulun ääni (Voima.Pulu),
// Lukija (Voima.Lukija), Äänitehosteet (Voima.Tehosteet); Äänimaisema-kytkin
// pois = koko pelin mykistys (webin sfx.enabled). Puhevuoro: pulu ei puhu
// kertojan päälle (omistaja 8.9.2026) — kupla näkyy silti, äänettä.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

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
        static AudioSource puhe, kertoja;
        static readonly List<AudioSource> tehosteet = new List<AudioSource>();
        static bool kytketty;

        /// <summary>Soiko kertoja (isoisän luenta) juuri nyt: pulu vaikenee sen ajan.</summary>
        public static bool KertojaPuhuu => (kertoja != null && kertoja.isPlaying) || (Puhe.Instanssi != null && Puhe.Instanssi.Soi);
        public static bool PuluPuhuu => puhe != null && puhe.isPlaying;
        public static AudioSource Kertojasoitin => Soitin(AaniKanava.Kertoja);
        public static AudioSource Puhesoitin => Soitin(AaniKanava.Puhe);

        static bool Mykistetty => !Asetukset.Paalla(Kytkin.Aanimaisema);

        /// <summary>Kanavan voimakkuus 0…1 asetuksista (webin tasot).</summary>
        public static float Taso(AaniKanava k) => Mykistetty ? 0f : k switch
        {
            AaniKanava.Puhe => Asetukset.Taso(Voima.Pulu) * 0.9f,
            AaniKanava.Kertoja => Asetukset.Taso(Voima.Lukija),
            // Pulun tehosteet −8 dB kertojaan nähden (PULUN_TASO 0,4 × PULUN_PERUSVOIMA 0,35 → normalisoitu).
            _ => Asetukset.Taso(Voima.Tehosteet) * 0.4f,
        };

        static AudioSource Soitin(AaniKanava k)
        {
            Kytke();
            if (k == AaniKanava.Puhe) return puhe;
            if (k == AaniKanava.Kertoja) return kertoja;
            foreach (var s in tehosteet) if (!s.isPlaying) return s;
            var uusi = UiKerros.Hae().gameObject.AddComponent<AudioSource>();
            uusi.playOnAwake = false;
            tehosteet.Add(uusi);
            return uusi;
        }

        static void Kytke()
        {
            if (kytketty && puhe != null) return;
            kytketty = true;
            var go = UiKerros.Hae().gameObject;
            puhe = go.AddComponent<AudioSource>();
            kertoja = go.AddComponent<AudioSource>();
            puhe.playOnAwake = kertoja.playOnAwake = false;
            Asetukset.Muuttui += _ =>
            {
                if (puhe != null) puhe.volume = Taso(AaniKanava.Puhe);
                if (kertoja != null) kertoja.volume = Taso(AaniKanava.Kertoja);
            };
        }

        /// <summary>Hakee äänitteen (https-osoite tai ämpärin avain). valmis(null) = ei saatu.</summary>
        public static void Hae(string urlTaiAvain, Action<AudioClip> valmis)
        {
            if (string.IsNullOrEmpty(urlTaiAvain)) { valmis?.Invoke(null); return; }
            string url = urlTaiAvain.StartsWith("http") ? urlTaiAvain : Juuri + urlTaiAvain;
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

        static string Levy(string url)
        {
            // Kyselyosa (?v=…) kuuluu nimeen: uudelleenäänitetty repliikki saa uuden tiedoston.
            string nimi = url.StartsWith(Juuri) ? url.Substring(Juuri.Length) : "u/" + url.GetHashCode().ToString("x");
            foreach (var m in new[] { '?', '=', '&' }) nimi = nimi.Replace(m, '_');
            if (!nimi.EndsWith(".mp3")) nimi += ".mp3";
            return Path.Combine(Application.persistentDataPath, "aanet", nimi.Replace('/', Path.DirectorySeparatorChar));
        }

        static IEnumerator Lataa(string url)
        {
            AudioClip klippi = null;
            string levy = Levy(url);
            // 1) Tavut laitteelle (kerran), 2) klippi levyltä: sama reitti verkossa ja ilman.
            if (!File.Exists(levy))
            {
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
            if (File.Exists(levy))
            {
                using var p = UnityWebRequestMultimedia.GetAudioClip("file://" + levy, AudioType.MPEG);
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) klippi = DownloadHandlerAudioClip.GetContent(p);
                else { Debug.LogWarning($"MATKAKIRJA ui ääni ei purkautunut: {levy} ({p.error})"); File.Delete(levy); }
            }
            if (klippi != null)
            {
                klippi.name = url;
                muisti[url] = klippi;
                jarjestys.AddFirst(url);
                while (jarjestys.Count > Muistissa)
                {
                    var vanha = jarjestys.Last.Value;
                    jarjestys.RemoveLast();
                    if (muisti.TryGetValue(vanha, out var vk) && vk != null && vk != puhe?.clip && vk != kertoja?.clip) UnityEngine.Object.Destroy(vk);
                    muisti.Remove(vanha);
                }
            }
            if (kesken.TryGetValue(url, out var odottajat))
            {
                kesken.Remove(url);
                foreach (var o in odottajat) { try { o?.Invoke(klippi); } catch (Exception e) { Debug.LogException(e); } }
            }
        }

        /// <summary>
        /// Soittaa äänitteen kanavalla. Puhe- ja kertojakanava katkaisevat edellisen.
        /// alkoi(klippi) kutsutaan, kun soitto todella alkaa (null = ei soinut).
        /// </summary>
        public static void Soita(AaniKanava k, string urlTaiAvain, Action<AudioClip> alkoi = null, float vaimennus = 1f)
        {
            Hae(urlTaiAvain, klippi =>
            {
                if (klippi == null) { alkoi?.Invoke(null); return; }
                // Pulu ei aloita kertojan päälle (kupla jää ruudulle äänettä).
                if (k == AaniKanava.Puhe && KertojaPuhuu) { alkoi?.Invoke(null); return; }
                var s = Soitin(k);
                if (k == AaniKanava.Tehoste) { s.PlayOneShot(klippi, Taso(k) * vaimennus); alkoi?.Invoke(klippi); return; }
                s.Stop();
                s.clip = klippi;
                s.volume = Taso(k) * vaimennus;
                s.Play();
                alkoi?.Invoke(klippi);
            });
        }

        public static void Pysayta(AaniKanava k)
        {
            if (k == AaniKanava.Tehoste) { foreach (var s in tehosteet) s.Stop(); return; }
            var soitin = k == AaniKanava.Puhe ? puhe : kertoja;
            if (soitin != null) soitin.Stop();
        }

        // --- pulun äänikirjasto (webin js/sound.js PULUN_TEHOSTEET) --------------

        public const string PulunTehosteJuuri = "aanet/tehosteet/pulu/";

        /// <summary>Webin tehosteavain → ämpärin tiedosto (manifesti.json tunnus).</summary>
        static readonly Dictionary<string, (string Tiedosto, float Voima)> pulunTehosteet = new Dictionary<string, (string, float)>
        {
            ["pulu.siivet"] = ("siivet-lento", 0.9f),
            ["pulu.siivet-lasku"] = ("siivet-laskeutuminen", 0.9f),
            ["pulu.tomahdys"] = ("tomahdys-laskeutuminen", 1f),
            ["pulu.doing"] = ("doing-vieteri", 0.8f),
            ["pulu.sekoilu"] = ("sekoilu-2", 0.8f),
            ["pulu.viuhahdus"] = ("viuhahdus-tulo", 0.85f),
            ["pulu.viuhahdus-lahto"] = ("viuhahdus-lahto", 0.85f),
            ["pulu.kujerrus"] = ("kujerrus", 0.9f),
            ["pulu.sahke"] = ("paperin-kahina", 0.8f),
            ["pulu.kilahdus"] = ("kellon-kilahdus", 0.8f),
            ["pulu.kamera-klik"] = ("kamera-laukaisin", 1f),
            ["pulu.kirjain-suhina"] = ("kirjain-suhina", 0.8f),
            ["pulu.pulla-riemu"] = ("pulla-riemu", 0.9f),
            ["pulu.pulla-puraisu"] = ("pulla-puraisu", 0.7f),
        };

        /// <summary>Webin LIVIAN_TEHOSTEET-ohjelmat: (tehoste, viive s).</summary>
        static readonly Dictionary<string, (string Tehoste, float Viive)[]> ohjelmat = new Dictionary<string, (string, float)[]>
        {
            ["saapuu"] = new[] { ("pulu.viuhahdus", 0f), ("pulu.siivet", 0.1f), ("pulu.tomahdys", 0.45f) },
            ["sekoilee"] = new[] { ("pulu.doing", 0f) },
            ["lahtee"] = new[] { ("pulu.siivet", 0f), ("pulu.viuhahdus-lahto", 0.18f) },
        };

        /// <summary>Yksi pulun tehoste (esim. "pulu.kujerrus").</summary>
        public static void PulunTehoste(string avain)
        {
            if (!pulunTehosteet.TryGetValue(avain, out var t)) return;
            Soita(AaniKanava.Tehoste, PulunTehosteJuuri + t.Tiedosto + ".mp3", null, t.Voima);
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
