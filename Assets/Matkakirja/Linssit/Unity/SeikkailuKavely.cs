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
        /// <summary>osat.jsonin kansio (merkkien glb-polut, esim. esineet, ovat suhteessa tähän).</summary>
        public static string Juuri { get; private set; }
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
                // Tila samalla nimellä (Linnanrakentaja v44c: keittio-g102 leivottuna) piirtää huoneen itse: kävelyosan seinät olisivat päällekkäin.
                bool tilaPiirtaa = false;
                if (rakennus?.Tilat != null) foreach (var t in rakennus.Tilat) if (string.Equals(t.Id, osa.Id, StringComparison.OrdinalIgnoreCase)) { tilaPiirtaa = true; break; }
                if (tilaPiirtaa) kirjaa?.Invoke($"seikkailu: {osa.Id}: tila piirtää, kävelyosan näkyvä ohitetaan");
                if (!string.IsNullOrEmpty(osa.Nakyva) && !tilaPiirtaa)
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
                        // Hahmojen jalkojen maa (Final IK Grounder, IkKerros): sama törmäysmalli omassa kerroksessaan, jotta
                        // esineiden SphereColliderit (DioraamaNayttamo.Kerros) eivät nosta jalkaa (Linnanrakentaja 8.10.).
                        var ikMaa = new GameObject("IkMaa:" + osa.Id) { layer = DioraamaHahmot3D.IkKerros };
                        ikMaa.transform.SetParent(go.transform, false);
                        ikMaa.AddComponent<MeshCollider>().sharedMesh = m;
                        tormaykset.Add(go); tormays++;
                    }
                }
                if (!string.IsNullOrEmpty(osa.Kavely))
                {
                    byte[] b = null; yield return DioraamaLevyvalimuisti.Hae(url(juuri + osa.Kavely), 120, t => b = t);
                    var m = b != null ? Mesh(b, "Kavely:" + osa.Id, kirjaa, kaksipuolinen: true) : null;   // NavMesh hylkää alaspäin osoittavat (keittiö v44b)
                    if (m != null) KavelyPinnat.Add(m);
                }
            }
            Data = d; Juuri = juuri;
            kirjaa?.Invoke($"seikkailu: kävelygeometria {d.Osat.Count} osaa (piirretty {piirretty}, törmäyksiä {tormays}, kävelypintoja {KavelyPinnat.Count}), merkkejä {d.Merkit.Count}");
        }

        /// <summary>Kuoren leikkaukset päälle/pois (kävelytila).</summary>
        public const int LeikkauksiaMax = 32;
        static bool leikkauksetPaalla; static string leikkausOsa;

        /// <summary>Kuoren leikkaukset kävelytilassa (enintään LeikkauksiaMax; 7.10. datassa 40, ennen otettiin vain 8 ensimmäistä,
        /// jolloin kappelin ja portaiden leikkaukset jäivät pois). Valinta: pelaajan osa, sen naapurit, sitten lähimmät keskipisteet.</summary>
        /// <summary>Vuoden 1499 näkymä (leikkaus:vain-1499*): päällä kävelyssä, pois K2-dronessa nykyiseen linnaan (LR v44x).</summary>
        public static bool Vain1499 { get; private set; } = true;
        public static void AsetaVain1499(bool paalla) { if (Vain1499 == paalla) return; Vain1499 = paalla; PaivitaLeikkaukset(SeikkailuPelaaja.Aktiivinen != null ? SeikkailuPelaaja.Aktiivinen.transform.position : (Vector3?)null, true); }
        public static void Leikkaukset(bool paalla) { leikkauksetPaalla = paalla; leikkausOsa = null; if (paalla) Vain1499 = true; PaivitaLeikkaukset(SeikkailuPelaaja.Aktiivinen != null ? SeikkailuPelaaja.Aktiivinen.transform.position : (Vector3?)null, true); }

        /// <summary>Kutsutaan pelaajan liikkuessa (SeikkailuPelaaja, 0,5 s välein): valinta päivittyy, kun osa vaihtuu.</summary>
        public static void PaivitaLeikkaukset(Vector3? pelaaja, bool pakota = false)
        {
            var c = new Vector4[LeikkauksiaMax]; var k = new Vector4[LeikkauksiaMax]; int n = 0;
            if (leikkauksetPaalla && Data != null)
            {
                string osa = pelaaja is Vector3 pp ? Matkakirja.Linssit.Seikkailu.Askelaani.Osa(Data, pp.x, pp.y, -pp.z) : null;
                if (!pakota && osa == leikkausOsa) return;
                leikkausOsa = osa;
                Data.Osat.TryGetValue(osa ?? "", out var oma);
                // Vuoden 1499 linna (omistaja 8.10.): merkkien leikkaus:vain-1499* listaamat leikkaukset (bastionit, Kellobastioni) aina ensin.
                var aina = new HashSet<string>(StringComparer.Ordinal);
                foreach (var m in Data.Lajia("leikkaus")) if (m.Tunnus.StartsWith("vain-1499", StringComparison.Ordinal) && m.Leikkaukset != null) foreach (var nm in m.Leikkaukset) if (nm != null) aina.Add(nm);
                var kaikki = new List<(KavelyLeikkaus L, double Arvo)>();
                foreach (var o in Data.Osat.Values)
                    foreach (var l in o.Leikkaukset)
                    {
                        bool ainaL = l.Nimi != null && aina.Contains(l.Nimi);
                        if (ainaL && !Vain1499) continue;   // drone nykyiseen linnaan: bastionit näkyvät
                        double arvo = ainaL ? -1e6 : o.Id == osa ? 0 : oma != null && (oma.Naapurit.Contains(o.Id) || o.Naapurit.Contains(osa)) ? 1000 : 2000;
                        if (pelaaja is Vector3 q) { double dx = l.X - q.x, dy = l.Y - q.y, dz = l.Z + q.z; arvo += Math.Sqrt(dx * dx + dy * dy + dz * dz); }
                        kaikki.Add((l, arvo));
                    }
                kaikki.Sort((a, b) => a.Arvo.CompareTo(b.Arvo));
                foreach (var (l, _) in kaikki)
                {
                    if (n >= LeikkauksiaMax) break;
                    c[n] = new Vector4((float)l.X, (float)l.Y, (float)l.Z, (float)l.KiertoY);
                    k[n] = new Vector4((float)l.KokoX / 2, (float)l.KokoY / 2, (float)l.KokoZ / 2, 0); n++;
                }
            }
            Shader.SetGlobalVectorArray(IdLeikkaus, c); Shader.SetGlobalVectorArray(IdKoko, k); Shader.SetGlobalFloat(IdN, n);
        }

        static readonly int IdMarkyys = Shader.PropertyToID("_Markyys");

        /// <summary>
        /// MÄRÄT PINNAT (omistajan palaute 8.10. (2), LR v45f): tilan leivotun materiaalin _Markyys kävelydatasta — kävelyosan
        /// osa.markyys (kavely:&lt;osa&gt; tai samanniminen tila) tai pinta-merkin markyys (merkin osa = tila, tai kävelyosaton tila,
        /// esim. laituri, jonka rajoihin merkki osuu); suurin voittaa. Seikkailun ajan globaali kytkin päälle ja kiilto kuunvalona.
        /// Kutsutaan latauksen jälkeen ja uudelleen, kun tiloja on tullut lisää (kevyt).
        /// </summary>
        public static void AsetaMarkyys(DioraamaRakennus r3d)
        {
            var d = Data; if (d == null || r3d == null) return;
            Shader.SetGlobalFloat("_DioraamaMarkyysPaalla", 1f);
            Shader.SetGlobalVector("_DioraamaMarkyysKiilto", new Vector4(0.50f, 0.58f, 0.72f, 1f));
            int n = 0;
            foreach (var kv in r3d.Tilat)
            {
                if (kv.Value == null) continue;
                string id = kv.Key.StartsWith("kavely:", StringComparison.Ordinal) ? kv.Key.Substring(7) : kv.Key;
                bool onOsa = d.Osat.TryGetValue(id, out var osa);
                double m = onOsa ? osa.Markyys : 0;
                var rr = kv.Value.GetComponentsInChildren<MeshRenderer>(true);
                if (rr.Length == 0) continue;
                var rajat = rr[0].bounds; foreach (var r in rr) rajat.Encapsulate(r.bounds);
                rajat.Expand(0.5f);
                foreach (var p in d.Merkit)
                {
                    if (p.Laji != "pinta" || p.Markyys <= 0) continue;
                    bool kuuluu = p.Osa != null ? string.Equals(p.Osa, id, StringComparison.OrdinalIgnoreCase)
                        : !onOsa && rajat.Contains(new Vector3((float)p.X, (float)p.Y, (float)-p.Z));
                    if (kuuluu && p.Markyys > m) m = p.Markyys;
                }
                if (m <= 0) continue;
                foreach (var r in rr)
                    foreach (var mat in r.sharedMaterials)
                        if (mat != null && mat.HasProperty(IdMarkyys) && mat.GetFloat(IdMarkyys) != (float)m) { mat.SetFloat(IdMarkyys, (float)m); n++; }
            }
            if (n > 0) Debug.Log($"MATKAKIRJA seikkailu: märät pinnat {n} materiaalia");
        }

        public static void Pura()
        {
            Shader.SetGlobalFloat("_DioraamaMarkyysPaalla", 0f);
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
