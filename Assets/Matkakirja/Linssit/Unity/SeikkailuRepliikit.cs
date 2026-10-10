// HISTORIAMOOTTORI: PYSTYLEIKKEEN REPLIIKIT (Siirtoseppä 7.10.2026; omistajan päätös 13.3x: 31 repliikkiä huoneisiin 1–5;
// Pelikoodarin manifest media.matkakirja.app/seikkailu/<rakennus>/repliikit-v3/manifest.json { repliikit[] { tunnus, hahmo, huone,
// tilanne, teksti, aani, kesto_s } }, äänet tasoitettu −17,2 dB:iin). Ei tekstiä ruudulle (omistaja: pelin aikana ei luettavaa).
// - Manifest kerran, ääni haetaan ensimmäisellä soitolla (mp3 → PCM-klippi) ja pidetään muistissa.
// - Soitto lähietäisyyden 3D-äänenä kuulokehyksessä (SeikkailuKuulija), puhujan pään kohdalta, yksi repliikki kerrallaan per puhuja.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuRepliikit : MonoBehaviour
    {
        public static SeikkailuRepliikit Aktiivinen { get; private set; }
        public const float Voimakkuus = 1f;

        sealed class Repliikki { public string Tunnus, Hahmo, Aani, Juuri; public double KestoS; public AudioClip Klippi; public bool Haussa; }
        readonly Dictionary<string, Repliikki> repliikit = new Dictionary<string, Repliikki>(StringComparer.Ordinal);
        readonly Dictionary<string, AudioSource> puhujat = new Dictionary<string, AudioSource>(StringComparer.Ordinal);
        string juuri;
        Action<string> kirjaa;
        public bool Valmis { get; private set; }
        public int Maara => repliikit.Count;

        public static SeikkailuRepliikit Luo(Transform isa, string manifestUrl, Action<string> kirjaa)
        {
            if (Aktiivinen != null && Aktiivinen.juuri == manifestUrl.Substring(0, manifestUrl.LastIndexOf('/') + 1)) return Aktiivinen;
            Poista();
            var go = new GameObject("Seikkailu repliikit");
            go.transform.SetParent(isa, false);
            var r = go.AddComponent<SeikkailuRepliikit>();
            r.kirjaa = kirjaa; r.juuri = manifestUrl.Substring(0, manifestUrl.LastIndexOf('/') + 1);
            Aktiivinen = r;
            r.StartCoroutine(r.LataaManifest(manifestUrl));
            return r;
        }

        /// <summary>Lisämanifest (repliikit-lapi-v1, Pelikoodarin aja-generointi.sh omistajan luvalla): uudet tunnukset omalla juurellaan,
        /// olemassa olevia ei korvata. Puuttuva manifest (404) = ei uusia repliikkejä, ei virhettä.</summary>
        public static void LisaaManifest(string url) { var r = Aktiivinen; if (r != null && !string.IsNullOrEmpty(url)) r.StartCoroutine(r.LataaManifest(url, true)); }

        IEnumerator LataaManifest(string url, bool lisa = false)
        {
            string oma = url.Substring(0, url.LastIndexOf('/') + 1);
            using var q = UnityWebRequest.Get(url + "?v=1");
            q.timeout = 20;
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: repliikit: manifest ei latautunut ({q.error}{(lisa ? ", lisämanifest: ei vielä ämpärissä" : "")})"); yield break; }
            object j;
            try { j = MiniJson.Jasenna(q.downloadHandler.text); } catch (Exception e) { kirjaa?.Invoke("seikkailu: repliikit: manifest virhe " + e.Message); yield break; }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(j), "repliikit")))
            {
                var o = MiniJson.ObjektiTaiNull(x); string t = MiniJson.Teksti(o, "tunnus");
                if (string.IsNullOrEmpty(t) || lisa && repliikit.ContainsKey(t)) continue;
                repliikit[t] = new Repliikki { Tunnus = t, Hahmo = MiniJson.Teksti(o, "hahmo"), Aani = MiniJson.Teksti(o, "aani"), KestoS = MiniJson.Luku(o, "kesto_s") ?? 0, Juuri = oma };
                SeikkailuAanet.Rekisteroi("repliikit", HahmonId(repliikit[t].Hahmo), "Repliikki:" + t);   // mikserissä hahmoittain
            }
            if (!lisa) Valmis = true;
            kirjaa?.Invoke($"seikkailu: repliikit {repliikit.Count} ({juuri})");
        }

        /// <summary>Mikserin tunnus hahmolle ("vartija" → "repliikit-vartija").</summary>
        public static string HahmonId(string hahmo) => "repliikit-" + (string.IsNullOrEmpty(hahmo) ? "muut" : hahmo);

        /// <summary>Hakee äänen etukäteen (ensimmäinen soitto ei viivy).</summary>
        public void Esilataa(string tunnus) { if (repliikit.TryGetValue(tunnus, out var r) && r.Klippi == null && !r.Haussa) StartCoroutine(Hae(r)); }

        IEnumerator Hae(Repliikki r)
        {
            r.Haussa = true;
            using var p = UnityWebRequestMultimedia.GetAudioClip((r.Juuri ?? juuri) + r.Aani, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler; dh.streamAudio = false; dh.compressed = false;
            yield return p.SendWebRequest();
            r.Haussa = false;
            if (p.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: repliikki {r.Tunnus} ei latautunut ({p.error})"); yield break; }
            r.Klippi = DownloadHandlerAudioClip.GetContent(p); r.Klippi.name = "Repliikki:" + r.Tunnus;
        }

        /// <summary>Repliikki kiinteästä paikasta (tilan hahmo, jolla ei ole omaa Transformia seikkailussa, esim. kokki liedellä).</summary>
        public double Soita(string tunnus, Vector3 paikka)
        {
            if (!kiinteat.TryGetValue(tunnus, out var t) || t == null) { t = new GameObject("Paikka:" + tunnus).transform; t.SetParent(transform, false); kiinteat[tunnus] = t; }
            t.position = paikka - Vector3.up * 1.6f;
            return Soita(tunnus, t);
        }
        readonly Dictionary<string, Transform> kiinteat = new Dictionary<string, Transform>(StringComparer.Ordinal);
        public bool On(string tunnus) => repliikit.ContainsKey(tunnus);

        /// <summary>M-osa (8.10.): uusi repliikki, jos se on manifestissa (omistajan luvalla generoitu), muuten vara (olemassa oleva) tai
        /// hiljaisuus. Aktiivinen puuttuu tai ei valmis → 0.</summary>
        public static double SoitaTaiVara(string tunnus, string vara, Vector3 paikka)
        {
            var r = Aktiivinen; if (r == null || !r.Valmis) return 0;
            string t = r.On(tunnus) ? tunnus : vara != null && r.On(vara) ? vara : null;
            return t != null ? r.Soita(t, paikka) : 0;
        }

        /// <summary>Soittaa repliikin puhujan kohdalta (puhuja = Transform, jota ääni seuraa). Palauttaa keston (s) tai 0.</summary>
        public double Soita(string tunnus, Transform puhuja)
        {
            if (!repliikit.TryGetValue(tunnus, out var r)) { kirjaa?.Invoke($"seikkailu: repliikki {tunnus} puuttuu manifestista"); return 0; }
            StartCoroutine(SoitaKun(r, puhuja));
            return r.KestoS;
        }

        IEnumerator SoitaKun(Repliikki r, Transform puhuja)
        {
            if (r.Klippi == null) { if (!r.Haussa) yield return Hae(r); while (r.Haussa) yield return null; }
            if (r.Klippi == null || puhuja == null) yield break;
            string avain = r.Hahmo ?? "?";
            if (!puhujat.TryGetValue(avain, out var a) || a == null)
            {
                // Lähietäisyyden 3D kuulokehyksessä (SeikkailuKuulija: kuulija olan yli -kamerassa; E1-ajo 7.10.: pallon kuulijalla
                // 3D-repliikit jäivät kuulumatta). Täysi taso 4 m:iin, puhuja kuuluu vasemmalta tai oikealta.
                a = SeikkailuKuulija.Lahde("Puhuja:" + avain, 4f, 35f);
                a.spatialBlend = 0.8f;
                puhujat[avain] = a;
            }
            puhujaT[avain] = puhuja;
            a.Stop(); a.clip = r.Klippi; a.volume = Voimakkuus * SeikkailuAanet.Taso("repliikit", HahmonId(r.Hahmo)); a.Play();   // ☰-mikseri "Hahmojen repliikit", hahmoittain
            kirjaa?.Invoke($"seikkailu: repliikki {r.Tunnus} ({r.Hahmo}, {r.KestoS:F1} s)");
        }

        /// <summary>Jokin repliikki soi nyt (SeikkailuVartijat: syke −6 dB puheen alle, PT 10.10.).</summary>
        public bool PuheSoi { get { foreach (var a in puhujat.Values) if (a != null && a.isPlaying) return true; return false; } }
        readonly Dictionary<string, Transform> puhujaT = new Dictionary<string, Transform>(StringComparer.Ordinal);

        void LateUpdate()
        {
            foreach (var kv in puhujaT)
                if (kv.Value != null && puhujat.TryGetValue(kv.Key, out var a) && a != null) SeikkailuKuulija.Aseta(a, kv.Value.position + Vector3.up * 1.6f);
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var a in puhujat.Values) if (a != null) Destroy(a.gameObject);
            foreach (var r in repliikit.Values) if (r.Klippi != null) Destroy(r.Klippi);
        }
    }
}
