// HISTORIAMOOTTORI: KÄVELYGEOMETRIAN LATAUS (Siirtoseppä 7.10.2026; Linnanrakentajan kavely v1, rakennus.json kavely { osat, merkit }).
// - osat.json + merkit.json (Ydin KavelyData) paketin juuresta tai kehitysjuuresta ("poikki kavely data <url-kansio>", esim. file://…/v1/).
// - Näkyvä osa piirretään DioraamaRakennus.LisaaTila-polulla rakennuksen pinnoilla (kivi, laasti, puu, laatta) tilana "kavely:<osa>".
// - Törmäys-glb → MeshCollider (ei piirretä) kerroksessa DioraamaNayttamo.Kerros; CharacterController ja kameran esteiden väistö näkevät sen.
// - Kävely-glb säilytetään NavMeshin lähteeksi (V3, vartijat).
// - Leikkaukset → DioraamaKuori.shaderin globaalit (_KavelyLeikkaus[8], _KavelyLeikkausKoko[8], _KavelyLeikkausN) kävelytilan ajaksi.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuKavely
    {
        public static KavelyData Data { get; private set; }
        public static readonly List<Mesh> KavelyPinnat = new List<Mesh>();
        static readonly List<GameObject> tormaykset = new List<GameObject>();
        static readonly int IdLeikkaus = Shader.PropertyToID("_KavelyLeikkaus"), IdKoko = Shader.PropertyToID("_KavelyLeikkausKoko"),
            IdN = Shader.PropertyToID("_KavelyLeikkausN");
        public static bool Ladattu => Data != null;

        /// <summary>Lataa osat.json (osatUrl) ja merkit.json (merkitUrl, voi olla null), piirtää osat ja lisää törmäykset; glb-polut osat.jsonin
        /// kansiosta. url = peilikuvaus (ämpäri → peili).</summary>
        public static IEnumerator Lataa(string osatUrl, string merkitUrl, Func<string, string> url, DioraamaRakennus r3d, Rakennus rakennus, Transform isa, Action<string> kirjaa)
        {
            Pura();
            string osat = null, merkit = null, juuri = osatUrl.Substring(0, osatUrl.LastIndexOf('/') + 1);
            yield return Teksti(url(osatUrl), t => osat = t);
            if (!string.IsNullOrEmpty(merkitUrl)) yield return Teksti(url(merkitUrl), t => merkit = t);
            if (osat == null) { kirjaa?.Invoke($"seikkailu: osat.json ei latautunut ({juuri})"); yield break; }
            var d = KavelyData.Lue(osat, merkit);
            int piirretty = 0, tormays = 0;
            foreach (var osa in d.Osat.Values)
            {
                if (!string.IsNullOrEmpty(osa.Nakyva))
                {
                    byte[] b = null; yield return DioraamaLevyvalimuisti.Hae(url(juuri + osa.Nakyva), 120, t => b = t);
                    if (b != null && r3d != null && r3d.LisaaTila(rakennus, new Tila { Id = "kavely:" + osa.Id, Nimi = osa.Id, Kohdistettava = true }, b, kirjaa)) piirretty++;
                }
                if (!string.IsNullOrEmpty(osa.Tormays))
                {
                    byte[] b = null; yield return DioraamaLevyvalimuisti.Hae(url(juuri + osa.Tormays), 120, t => b = t);
                    var m = b != null ? Mesh(b, "Tormays:" + osa.Id, kirjaa, kaksipuolinen: true) : null;
                    if (m != null)
                    {
                        var go = new GameObject("Törmäys:" + osa.Id) { layer = DioraamaNayttamo.Kerros };
                        go.transform.SetParent(isa, false);
                        go.AddComponent<MeshCollider>().sharedMesh = m;
                        tormaykset.Add(go); tormays++;
                    }
                }
                if (!string.IsNullOrEmpty(osa.Kavely))
                {
                    byte[] b = null; yield return DioraamaLevyvalimuisti.Hae(url(juuri + osa.Kavely), 120, t => b = t);
                    var m = b != null ? Mesh(b, "Kavely:" + osa.Id, kirjaa) : null;
                    if (m != null) KavelyPinnat.Add(m);
                }
            }
            Data = d;
            kirjaa?.Invoke($"seikkailu: kävelygeometria {d.Osat.Count} osaa (piirretty {piirretty}, törmäyksiä {tormays}, kävelypintoja {KavelyPinnat.Count}), merkkejä {d.Merkit.Count}");
        }

        /// <summary>Kuoren leikkaukset päälle/pois (kävelytila).</summary>
        public static void Leikkaukset(bool paalla)
        {
            var c = new Vector4[8]; var k = new Vector4[8]; int n = 0;
            if (paalla && Data != null)
                foreach (var osa in Data.Osat.Values)
                    foreach (var l in osa.Leikkaukset)
                    {
                        if (n >= 8) break;
                        c[n] = new Vector4((float)l.X, (float)l.Y, (float)l.Z, (float)l.KiertoY);
                        k[n] = new Vector4((float)l.KokoX / 2, (float)l.KokoY / 2, (float)l.KokoZ / 2, 0); n++;
                    }
            Shader.SetGlobalVectorArray(IdLeikkaus, c); Shader.SetGlobalVectorArray(IdKoko, k); Shader.SetGlobalFloat(IdN, n);
        }

        public static void Pura()
        {
            foreach (var go in tormaykset) if (go != null) UnityEngine.Object.Destroy(go);
            tormaykset.Clear();
            foreach (var m in KavelyPinnat) if (m != null) UnityEngine.Object.Destroy(m);
            KavelyPinnat.Clear();
            Data = null;
            Leikkaukset(false);
        }

        /// <summary>Glb:n kaikki osat yhdeksi meshiksi (vain paikat ja kolmiot; Unity-koordinaatit DioraamaGlb.Lue(unityyn: true)).
        /// kaksipuolinen = jokainen kolmio myös käännettynä (törmäys: z-peilaus kääntää kiertosuunnan, ja säteet ja kapseli osuvat
        /// silloin pintaan kummaltakin puolelta).</summary>
        static Mesh Mesh(byte[] tavut, string nimi, Action<string> kirjaa, bool kaksipuolinen = false)
        {
            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(tavut, true); } catch (Exception e) { kirjaa?.Invoke($"seikkailu: {nimi} glb virhe: {e.Message}"); return null; }
            if (malli?.Osat == null || malli.Osat.Count == 0) return null;
            var p = new List<Vector3>(); var t = new List<int>();
            foreach (var osa in malli.Osat)
            {
                int alku = p.Count, n = (osa.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < n; i++) p.Add(new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]));
                foreach (int ix in osa.Kolmiot ?? Array.Empty<int>()) t.Add(ix + alku);
            }
            if (kaksipuolinen) for (int i = 0, n = t.Count; i + 2 < n; i += 3) { t.Add(t[i]); t.Add(t[i + 2]); t.Add(t[i + 1]); }
            var m = new Mesh { name = nimi, indexFormat = p.Count > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            m.SetVertices(p); m.SetTriangles(t, 0); m.RecalculateBounds(); m.RecalculateNormals();
            return m;
        }

        static IEnumerator Teksti(string url, Action<string> valmis)
        {
            using var r = UnityWebRequest.Get(url);
            r.timeout = 20;
            yield return r.SendWebRequest();
            valmis(r.result == UnityWebRequest.Result.Success ? r.downloadHandler.text : null);
        }
    }
}
