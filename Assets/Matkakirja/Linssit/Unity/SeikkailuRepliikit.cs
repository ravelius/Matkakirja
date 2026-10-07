// HISTORIAMOOTTORI: PYSTYLEIKKEEN REPLIIKIT (Siirtoseppä 7.10.2026; omistajan päätös 13.3x: 31 repliikkiä huoneisiin 1–5;
// Pelikoodarin manifest media.matkakirja.app/seikkailu/<rakennus>/repliikit-v1/manifest.json { repliikit[] { tunnus, hahmo, huone,
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

        sealed class Repliikki { public string Tunnus, Hahmo, Aani; public double KestoS; public AudioClip Klippi; public bool Haussa; }
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

        IEnumerator LataaManifest(string url)
        {
            using var q = UnityWebRequest.Get(url + "?v=1");
            q.timeout = 20;
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: repliikit: manifest ei latautunut ({q.error})"); yield break; }
            object j;
            try { j = MiniJson.Jasenna(q.downloadHandler.text); } catch (Exception e) { kirjaa?.Invoke("seikkailu: repliikit: manifest virhe " + e.Message); yield break; }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(j), "repliikit")))
            {
                var o = MiniJson.ObjektiTaiNull(x); string t = MiniJson.Teksti(o, "tunnus");
                if (string.IsNullOrEmpty(t)) continue;
                repliikit[t] = new Repliikki { Tunnus = t, Hahmo = MiniJson.Teksti(o, "hahmo"), Aani = MiniJson.Teksti(o, "aani"), KestoS = MiniJson.Luku(o, "kesto_s") ?? 0 };
            }
            Valmis = true;
            kirjaa?.Invoke($"seikkailu: repliikit {repliikit.Count} ({juuri})");
        }

        /// <summary>Hakee äänen etukäteen (ensimmäinen soitto ei viivy).</summary>
        public void Esilataa(string tunnus) { if (repliikit.TryGetValue(tunnus, out var r) && r.Klippi == null && !r.Haussa) StartCoroutine(Hae(r)); }

        IEnumerator Hae(Repliikki r)
        {
            r.Haussa = true;
            using var p = UnityWebRequestMultimedia.GetAudioClip(juuri + r.Aani, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler; dh.streamAudio = false; dh.compressed = false;
            yield return p.SendWebRequest();
            r.Haussa = false;
            if (p.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: repliikki {r.Tunnus} ei latautunut ({p.error})"); yield break; }
            r.Klippi = DownloadHandlerAudioClip.GetContent(p); r.Klippi.name = "Repliikki:" + r.Tunnus;
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
            a.Stop(); a.clip = r.Klippi; a.volume = Voimakkuus; a.Play();
            kirjaa?.Invoke($"seikkailu: repliikki {r.Tunnus} ({r.Hahmo}, {r.KestoS:F1} s)");
        }

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
