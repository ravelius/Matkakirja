// HISTORIAMOOTTORI: PYSTYLEIKKEEN TEHOSTEET (Siirtoseppä 7.10.2026; E3-käsikirjoitus kohta 6 "Äänet"; CC0/PD-lähteet, LAHTEET.md
// paketissa). Manifest media.matkakirja.app/seikkailu/<rakennus>/aanet-e3-v1/manifest.json { aanet[] { tunnus, aani, kesto_s, silmukka } };
// ääni haetaan ensimmäisellä soitolla ja pidetään muistissa. Soitto 3D:nä kuulokehyksestä (SeikkailuKuulija: kuulostaa olan yli
// -kamerasta); silmukat (sydän, tuuli) omina lähteinään, joita kutsuja ohjaa (Silmukka(tunnus, paalla, paikka)).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuAanet : MonoBehaviour
    {
        public static SeikkailuAanet Aktiivinen { get; private set; }
        sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public AudioClip Klippi; public bool Haussa; }
        readonly Dictionary<string, Aani> aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);
        readonly Dictionary<string, AudioSource> silmukat = new Dictionary<string, AudioSource>(StringComparer.Ordinal);
        string juuri; Action<string> kirjaa;
        public bool Valmis { get; private set; }

        public static SeikkailuAanet Luo(Transform isa, string manifestUrl, Action<string> kirjaa)
        {
            string j = manifestUrl.Substring(0, manifestUrl.LastIndexOf('/') + 1);
            if (Aktiivinen != null && Aktiivinen.juuri == j) return Aktiivinen;
            Poista();
            var go = new GameObject("Seikkailu äänet"); go.transform.SetParent(isa, false);
            var a = go.AddComponent<SeikkailuAanet>(); a.juuri = j; a.kirjaa = kirjaa; Aktiivinen = a;
            a.StartCoroutine(a.Lataa(manifestUrl));
            return a;
        }

        IEnumerator Lataa(string url)
        {
            using var q = UnityWebRequest.Get(url + "?v=1"); q.timeout = 20;
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: tehosteet: manifest ei latautunut ({q.error})"); yield break; }
            object j; try { j = MiniJson.Jasenna(q.downloadHandler.text); } catch (Exception e) { kirjaa?.Invoke("seikkailu: tehosteet: " + e.Message); yield break; }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(j), "aanet")))
            {
                var o = MiniJson.ObjektiTaiNull(x); string t = MiniJson.Teksti(o, "tunnus");
                if (!string.IsNullOrEmpty(t)) aanet[t] = new Aani { Tunnus = t, Polku = MiniJson.Teksti(o, "aani"), Silmukka = MiniJson.Kentta(o, "silmukka") is bool b && b };
            }
            Valmis = true;
            kirjaa?.Invoke($"seikkailu: tehosteet {aanet.Count}");
            foreach (var a in aanet.Values) StartCoroutine(Hae(a));   // pieni paketti (< 0,5 Mt): kaikki heti muistiin
        }

        IEnumerator Hae(Aani a)
        {
            if (a.Klippi != null || a.Haussa || string.IsNullOrEmpty(a.Polku)) yield break;
            a.Haussa = true;
            using var p = UnityWebRequestMultimedia.GetAudioClip(juuri + a.Polku, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler; dh.streamAudio = false; dh.compressed = false;
            yield return p.SendWebRequest();
            a.Haussa = false;
            if (p.result == UnityWebRequest.Result.Success) { a.Klippi = DownloadHandlerAudioClip.GetContent(p); a.Klippi.name = "Tehoste:" + a.Tunnus; }
        }

        /// <summary>Kertaääni paikassa (Unity, dioraaman koordinaatit). Puuttuva tai lataamaton tunnus ohitetaan hiljaa.</summary>
        public static void Soita(string tunnus, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            var s = Aktiivinen; if (s == null || !s.aanet.TryGetValue(tunnus, out var a) || a.Klippi == null) return;
            var l = SeikkailuKuulija.Lahde("Tehoste:" + tunnus, 2f, 25f);
            SeikkailuKuulija.Aseta(l, paikka); l.clip = a.Klippi; l.volume = voimakkuus; l.pitch = savel; l.Play();
            Destroy(l.gameObject, a.Klippi.length / Mathf.Max(0.1f, savel) + 0.2f);
        }

        /// <summary>Silmukka päälle tai pois (sydän, tuuli); paikka päivitetään joka kutsulla.</summary>
        public static void Silmukka(string tunnus, bool paalla, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            var s = Aktiivinen; if (s == null) return;
            if (!s.silmukat.TryGetValue(tunnus, out var l) || l == null)
            {
                if (!paalla || !s.aanet.TryGetValue(tunnus, out var a) || a.Klippi == null) return;
                l = SeikkailuKuulija.Lahde("Silmukka:" + tunnus, 2f, 25f); l.clip = a.Klippi; l.loop = true; s.silmukat[tunnus] = l;
            }
            SeikkailuKuulija.Aseta(l, paikka); l.volume = voimakkuus; l.pitch = savel;
            if (paalla && !l.isPlaying) l.Play(); else if (!paalla && l.isPlaying) l.Stop();
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var l in silmukat.Values) if (l != null) Destroy(l.gameObject);
            foreach (var a in aanet.Values) if (a.Klippi != null) Destroy(a.Klippi);
        }
    }
}
