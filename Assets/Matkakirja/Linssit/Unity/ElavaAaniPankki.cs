// PALLON ELÄVÄT ÄÄNET v2, UNITY-OSA (Linssiseppä 9.10.2026; PT junaan 172; Ydin PalloElavaAanet): Pelikoodarin manifesti
// aanet/pallo-elava-v2/manifest.json haetaan kerran (404 → yksi lokirivi, uusi yritys hiljaa 10 min välein, ?t= ohittaa CDN:n
// välimuistiin jääneen 404:n), sitten kaikki tämän version tunnukset ladataan välimuistiin (temporaryCachePath) ja muistiin
// pakattuina (compressed: useampi lähde voi soittaa samaa klippiä, silmukan ristihäivytys samasta klipistä). Puuttuva tiedosto →
// yksi lokirivi ja hiljaisuus. Klipin nimi = tunnus (äänivahti). Mikseri: Rekisteroi() kerran (Aanimikseri.Yhteinen, konteksti pallo).
//  ElavaSilmukka: saumaton silmukka kahdella lähteellä (mp3:n kooderiviive pois kuten KaupunkiAanimaisemaSoitin.Silmukka), liukuva
//    taso, valinnaisesti 3D-paikassa. ElavaAaniPooli: pieni 3D-lähdepooli kerta-äänille (ei PlayOneShot 2D:nä); lähde seuraa
//    ajoneuvoa tai palloa tai on OSM-paikassa. 3D = Unityn oma panorointi (spatialBlend 1, doppler 0); vaimennus Custom tasaisena,
//    koska etäisyyden taso lasketaan Ytimessä (testattava) eikä sitä kerrota kahdesti. Taso joka kehys: OpasAanitasot.Maisema(perus,
//    väistö kertojan alla) × mikserin Kerroin(ryhmä, tunnus).
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Aanet;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class ElavaAaniPankki
    {
        const float UusintaS = 600f;
        static PalloElavaAanet manifesti;
        static readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>();
        static bool haussa, puuttuiKirjattu; static float yritys = -9999f;
        static Isanta isanta;
        sealed class Isanta : MonoBehaviour { }

        static bool rekisteroity;
        /// <summary>Kaikki v2-äänet pallon mikseriin (kerran; Rekisteroi on idempotentti).</summary>
        public static void Rekisteroi()
        {
            if (rekisteroity) return;
            rekisteroity = true;
            foreach (var m in PalloElavaAanet.Mikseri) Aanimikseri.Yhteinen.Rekisteroi("pallo", m.Ryhma, m.Id, m.Nimi, m.Klipit);
        }

        /// <summary>Mikserin kerroin tunnukselle (ryhmän taso nykyisessä kontekstissa × äänen oma kerroin).</summary>
        public static float Kerroin(string tunnus)
        {
            var (id, ryhma) = PalloElavaAanet.MikseriAani(tunnus);
            return id != null ? Aanimikseri.Yhteinen.Kerroin(ryhma, id) : 0f;
        }

        /// <summary>Ladattu klippi tai null (käynnistää manifestin haun; puuttuva = null pysyvästi).</summary>
        public static AudioClip Klippi(string tunnus)
        {
            Kaynnista();
            return tunnus != null && klipit.TryGetValue(tunnus, out var c) ? c : null;
        }

        /// <summary>Manifestin haku (kerran; epäonnistunut uudelleen UusintaS:n päästä).</summary>
        public static void Kaynnista()
        {
            Rekisteroi();
            if (manifesti != null || haussa || Time.unscaledTime - yritys < UusintaS) return;
            if (isanta == null)
            {
                var g = new GameObject("Elävät äänet v2") { hideFlags = HideFlags.HideInHierarchy };
                Object.DontDestroyOnLoad(g);
                isanta = g.AddComponent<Isanta>();
            }
            haussa = true; yritys = Time.unscaledTime;
            isanta.StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            long ikkuna = System.DateTimeOffset.UtcNow.ToUnixTimeSeconds() / 600;
            using (var r = UnityWebRequest.Get(PalloElavaAanet.ManifestiOsoite + "?t=" + ikkuna))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success)
                {
                    if (!puuttuiKirjattu) { puuttuiKirjattu = true; Debug.Log($"MATKAKIRJA kaupunki: elävät äänet v2: manifesti ei saatavilla ({r.responseCode}), äänet ennallaan"); }
                    haussa = false; yield break;
                }
                try { manifesti = PalloElavaAanet.Lue(r.downloadHandler.text); }
                catch (System.Exception e) { Debug.Log("MATKAKIRJA kaupunki: elävät äänet v2: manifesti virheellinen: " + e.Message); haussa = false; yield break; }
            }
            int ok = 0, puuttuu = 0;
            foreach (var t in PalloElavaAanet.Tunnukset())
            {
                if (!manifesti.Aanet.TryGetValue(t, out var a)) { puuttuu++; continue; }
                AudioClip c = null;
                yield return Lataa(a.Osoite, x => c = x);
                if (c != null) { c.name = t; klipit[t] = c; ok++; }
                else { puuttuu++; Debug.Log($"MATKAKIRJA kaupunki: elävät äänet v2: {t} ei latautunut"); }
            }
            haussa = false;
            Debug.Log($"MATKAKIRJA kaupunki: elävät äänet v2: {ok} ääntä ladattu, {puuttuu} puuttuu");
        }

        static IEnumerator Lataa(string url, System.Action<AudioClip> valmis)
        {
            string tiedosto = Path.Combine(Application.temporaryCachePath, "elava-v2", Hash(url) + Path.GetExtension(new System.Uri(url).AbsolutePath));
            if (!File.Exists(tiedosto))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                using var r = UnityWebRequest.Get(url);
                r.timeout = 30;
                r.downloadHandler = new DownloadHandlerFile(tiedosto) { removeFileOnAbort = true };
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { if (File.Exists(tiedosto)) File.Delete(tiedosto); valmis(null); yield break; }
            }
            var tyyppi = tiedosto.EndsWith(".wav", System.StringComparison.OrdinalIgnoreCase) ? AudioType.WAV : AudioType.MPEG;
            using var a = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, tyyppi);
            ((DownloadHandlerAudioClip)a.downloadHandler).compressed = true;
            yield return a.SendWebRequest();
            valmis(a.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(a) : null);
        }

        static string Hash(string s) { unchecked { ulong h = 1469598103934665603; foreach (char c in s) { h ^= c; h *= 1099511628211; } return h.ToString("x16"); } }

        /// <summary>3D-lähde: Unityn panorointi, tasainen Custom-vaimennus (taso Ytimestä), ei doppleria.</summary>
        public static AudioSource Lahde3D(GameObject g)
        {
            var a = g.AddComponent<AudioSource>();
            a.playOnAwake = false; a.loop = false; a.spatialBlend = 1f; a.dopplerLevel = 0f; a.spread = 0f;
            a.rolloffMode = AudioRolloffMode.Custom; a.minDistance = 1f; a.maxDistance = 100000f;
            a.SetCustomCurve(AudioSourceCurveType.CustomRolloff, AnimationCurve.Constant(0f, 1f, 1f));
            return a;
        }
    }

    /// <summary>Saumaton silmukka kahdella lähteellä, liukuva taso; 3D-paikka valinnainen (paikallinen isännän alla).</summary>
    public sealed class ElavaSilmukka
    {
        const float XfS = 1.2f, XfAlkuS = 2.5f, PadS = 0.06f;
        readonly string tunnus; readonly Transform isanta; readonly bool kolmeD;
        Transform juuri; AudioSource a, b; float taso, xfAlku;

        public ElavaSilmukka(Transform isanta, string tunnus, bool kolmeD) { this.isanta = isanta; this.tunnus = tunnus; this.kolmeD = kolmeD; }
        public float Taso => taso;

        AudioSource Uusi()
        {
            var s = kolmeD ? ElavaAaniPankki.Lahde3D(juuri.gameObject) : juuri.gameObject.AddComponent<AudioSource>();
            s.playOnAwake = false; s.loop = true; if (!kolmeD) s.spatialBlend = 0f; s.volume = 0f;
            return s;
        }

        /// <summary>Joka kehys: tavoitetaso (sisältää mikserin ja väistön), liu'un aikavakio (s), paikka isännän koordinaateissa (3D).</summary>
        public void Paivita(float tavoite, float dt, float aikaS, Vector3? paikka = null)
        {
            if (isanta == null) return;
            var c = ElavaAaniPankki.Klippi(tunnus);
            if (c == null) tavoite = 0f;
            taso = (float)PalloElavaAanet.Liuku(taso, tavoite, dt, aikaS);
            if (juuri == null)
            {
                if (tavoite <= 0.001f) return;
                juuri = new GameObject("elävä silmukka " + tunnus).transform; juuri.SetParent(isanta, false);
                a = Uusi(); b = Uusi();
            }
            if (paikka.HasValue) juuri.localPosition = paikka.Value;
            if (a.clip != c) { a.clip = c; b.clip = c; a.Stop(); b.Stop(); }
            if (c == null) return;
            if (taso < 0.0005f && tavoite <= 0f) { if (a.isPlaying) a.Stop(); if (b.isPlaying) b.Stop(); a.volume = b.volume = 0f; return; }
            if (!a.isPlaying && !b.isPlaying) { a.time = Random.Range(0f, Mathf.Max(0f, c.length * 0.9f)); a.Play(); }
            if (c.length < 3 * XfAlkuS) { a.volume = taso; return; }
            if (!b.isPlaying && a.isPlaying && c.length - a.time <= XfAlkuS) { b.time = PadS; b.Play(); xfAlku = Time.unscaledTime; }
            if (!b.isPlaying) { a.volume = taso; return; }
            float u = Mathf.Clamp01((Time.unscaledTime - xfAlku) / XfS);
            a.volume = taso * Mathf.Cos(u * Mathf.PI * 0.5f); b.volume = taso * Mathf.Sin(u * Mathf.PI * 0.5f);
            if (u >= 1f) { a.Stop(); a.volume = 0f; (a, b) = (b, a); }
        }

        public void Hiljaa() { if (a != null) { a.Stop(); a.volume = 0f; } if (b != null) { b.Stop(); b.volume = 0f; } taso = 0f; }
    }

    /// <summary>Pieni 3D-lähdepooli kerta-äänille: lähde ajoneuvossa, pallossa tai paikassa (isännän koordinaatit).</summary>
    public sealed class ElavaAaniPooli
    {
        sealed class Aani { public AudioSource A; public Transform Seuraa; public float Perus; public string Tunnus; public int Kerta; }
        readonly Aani[] aanet; readonly Transform isanta; int kerta;

        public ElavaAaniPooli(Transform isanta, int koko = 6)
        {
            this.isanta = isanta; aanet = new Aani[koko];
            for (int i = 0; i < koko; i++)
            {
                var g = new GameObject("elävä kerta-ääni " + i); g.transform.SetParent(isanta, false);
                aanet[i] = new Aani { A = ElavaAaniPankki.Lahde3D(g) };
            }
        }

        /// <summary>Soittaa klipin (perustaso ennen maisemaa, väistöä ja mikseriä); palauttaa kahvan (Soi) tai 0, jos klippiä ei ole.</summary>
        public int Soita(string tunnus, float perus, float savel, Vector3 paikka, Transform seuraa, bool vaisto)
        {
            var c = ElavaAaniPankki.Klippi(tunnus);
            if (c == null || isanta == null) return 0;
            Aani v = null;
            foreach (var x in aanet) if (!x.A.isPlaying) { v = x; break; }
            if (v == null) { v = aanet[0]; foreach (var x in aanet) if (x.A.volume < v.A.volume) v = x; }   // hiljaisin väistyy
            v.Seuraa = seuraa; v.Perus = perus; v.Tunnus = tunnus; v.Kerta = ++kerta;
            v.A.transform.localPosition = seuraa != null ? seuraa.localPosition : paikka;
            v.A.clip = c; v.A.pitch = savel; v.A.volume = Taso(v, vaisto); v.A.Play();
            return v.Kerta;
        }

        static float Taso(Aani v, bool vaisto) => (float)OpasAanitasot.Maisema(v.Perus, vaisto) * ElavaAaniPankki.Kerroin(v.Tunnus);

        public bool Soi(int kahva) { if (kahva == 0) return false; foreach (var x in aanet) if (x.Kerta == kahva) return x.A.isPlaying; return false; }

        /// <summary>Joka kehys: lähteet seuraavat kohdettaan, taso mikseristä ja väistöstä; pois päältä → hiljaa.</summary>
        public void Paivita(bool paalla, bool vaisto)
        {
            foreach (var v in aanet)
            {
                if (!v.A.isPlaying) continue;
                if (!paalla) { v.A.Stop(); continue; }
                if (v.Seuraa != null && v.Seuraa.gameObject.activeInHierarchy) v.A.transform.localPosition = v.Seuraa.localPosition;
                v.A.volume = Taso(v, vaisto);
            }
        }
    }
}
