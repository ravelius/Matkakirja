// LAIVOJEN ÄÄNET (Linssiseppä 2, 9.10.2026; PT juna 170, Pelikoodarin aanet/elava-kaupunki-v1, −23 LUFS): ElavaKaupunki liittää
// jokaiseen veneeseen 3D-äänilähteen lajin mukaan (Ydin SavuLajit-tyyppien tapaan): höyry- ja saaristolaivat höyrykone, lautat ja
// jokilaivat lautan moottori, pikkuveneet moottorivene; silmukat satunnaisesta kohdasta ja hieman eri sävelkorkeudella (ei kaikuja).
// Etäisyys: lineaarinen 40–900 m (pallo 100–800 m:n päässä), taso mikserin Kerroin("maisema", laiva.<tunnus>) × LaivaTaso; enintään 24
// ääntä kerrallaan (prioriteetti). Äänirekisteri (Natiivi-UI 9.10.): kolme laivaääntä pallon Äänimaisema-ryhmään, klipin nimi = tunnus.
// Steam Audio -koe (9.10., oletus pois): lähteet SteamAudioKoe.Rekisteroi-kutsulla, kytkin pallo.SteamAudio / "opas steamaudio".
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class VeneAanet
    {
        public const string Juuri = KaupunkiAanimaisemaSoitin.Juuri + "elava-kaupunki-v1/";
        public const float LaivaTaso = 0.7f, MinM = 40f, MaxM = 900f;
        static readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>();
        static readonly HashSet<string> ladataan = new HashSet<string>();
        static readonly List<(AudioSource a, string tunnus)> lahteet = new List<(AudioSource, string)>();

        static readonly string[] Tunnukset = { "hoyrykone", "lautta", "moottorivene" };
        static readonly float[] tasot = new float[3];
        public static string AaniId(string tunnus) => "laiva." + tunnus;
        static bool rekisteroity;
        static void Rekisteroi()
        {
            if (rekisteroity) return;
            rekisteroity = true;
            var m = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
            m.Rekisteroi("pallo", "maisema", AaniId("hoyrykone"), "Laivat: höyrykone");
            m.Rekisteroi("pallo", "maisema", AaniId("lautta"), "Laivat: lautan moottori");
            m.Rekisteroi("pallo", "maisema", AaniId("moottorivene"), "Laivat: moottorivene");
        }

        /// <summary>Lajin ääni (tiedoston tunnus) tai null.</summary>
        public static string Tunnus(string laji) => laji switch
        {
            "hoyrylaiva" or "saaristolaiva" => "hoyrykone",
            "lautta" or "pendelbat" or "autolautta" or "pikkulautta" or "kiertoajelu" or "jokilaiva" => "lautta",
            "vene" => "moottorivene",
            _ => null,
        };

        public static void Liita(MonoBehaviour isanta, GameObject vene, string laji)
        {
            string t = Tunnus(laji); if (t == null || isanta == null || vene == null) return;
            Rekisteroi();
            if (!klipit.ContainsKey(t) && ladataan.Add(t)) isanta.StartCoroutine(Lataa(t));
            var a = vene.AddComponent<AudioSource>();
            float s = Mathf.Max(1e-4f, vene.transform.lossyScale.y);
            a.spatialBlend = 1f; a.rolloffMode = AudioRolloffMode.Linear; a.minDistance = MinM * s; a.maxDistance = MaxM * s;
            a.loop = true; a.playOnAwake = false; a.dopplerLevel = 0f; a.pitch = Random.Range(0.92f, 1.08f); a.volume = 0f;
            a.priority = 200;
            SaumatonSilmukka.Kiinnita(a);   // saumaton silmukka (juna 174)
            lahteet.Add((a, t));
            SteamAudioKoe.Rekisteroi(a);   // HRTF-koe (kehittäjäkytkin pallo.SteamAudio, oletus pois)
        }

        static IEnumerator Lataa(string t)
        {
            using var r = UnityWebRequestMultimedia.GetAudioClip(Juuri + t + ".mp3", AudioType.MPEG);
            r.timeout = 30;
            yield return r.SendWebRequest();
            ladataan.Remove(t);
            klipit[t] = r.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(r) : null;
            if (klipit[t] != null) klipit[t].name = AaniId(t);
            if (klipit[t] != null) yield return SaumatonSilmukka.HaeTagi(Juuri + t + ".mp3", klipit[t]);
            if (klipit[t] == null) Debug.Log($"MATKAKIRJA kaupunki: laivan ääni {t} ei latautunut ({r.error})");
        }

        /// <summary>Joka kehys (ElavaKaupunki): klipit lähteisiin, taso mikseristä (Äänimaisema × laivan ääni); tuhoutuneet pois.</summary>
        public static void Paivita()
        {
            SteamAudioKoe.Paivita();
            var m = Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
            for (int j = 0; j < Tunnukset.Length; j++) tasot[j] = m.Kerroin("maisema", AaniId(Tunnukset[j])) * LaivaTaso;
            for (int i = lahteet.Count - 1; i >= 0; i--)
            {
                var (a, t) = lahteet[i];
                if (a == null) { lahteet.RemoveAt(i); continue; }
                if (a.clip == null && klipit.TryGetValue(t, out var k) && k != null)
                {
                    a.clip = k; a.time = Random.Range(0f, Mathf.Max(0f, k.length - 0.1f));
                    if (a.isActiveAndEnabled) a.Play();
                }
                a.volume = tasot[System.Array.IndexOf(Tunnukset, t)];
                if (a.clip != null && a.isActiveAndEnabled && !a.isPlaying) a.Play();
            }
        }
    }
}
