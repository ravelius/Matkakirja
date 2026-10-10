// MUISTITARKKA (Natiiviseppä 9.10.2026; PT 23.2x: junan 173 iPad-jetsamin juurisyy MITTAAMALLA ennen korjausta, piikin hetki
// luokittain 100 ms välein, sama BUILD 172:lla). Diagnostiikka, vain kun Documents/muisti-tarkka.txt on olemassa (sisältö: väli ms,
// oletus 100). Kirjoittaa Documents/muisti-tarkka.log, rivit:
//   N <ms> …  taustasäie joka välillä: phys_footprint (jetsam-mittari), vapaa, internal (anonyymi CPU), compressed, grafiikka
//             (Metal-resurssit, task_vm_info graphics-kirjanpito), media, malloc käytössä/varattu, footprint-huippu
//   A <ms> …  VM-alueet tunnisteittain (Plugins/iOS/MatkakirjaMuisti.mm): 1 s välein ja heti, kun footprint on noussut ≥ 48 Mt
//   U <ms> …  pääsäie joka välillä: kehysväli, Unityn laskurit (Total Used/Reserved, GC, Audio, Video, App Resident, System Used),
//             currentTextureMemory, Googlen latausaste ja Cesium-laatat ryhmittäin: elossa, luotu+/tuhottu− välillä, arvioitu mesh-
//             ja tekstuurimuisti (laatan omat HideAndDontSave-tekstuurit mitoista ja muodosta)
//   L <ms> …  MATKAKIRJA-lokirivit (ei telemetriaa eikä kehysaikoja) ja muistivaroitukset samalla kellolla
//   T <ms> …  tekstuurit tyypeittäin + suurimmat, kun footprint nousee ≥ 150 Mt 0,3 s:ssa (enintään 2 s välein) ja 3 s avauksen jälkeen
// Rivit kirjoitetaan heti (AutoFlush): jetsam tappaa prosessin, mutta write():lla kirjoitettu jää tiedostoon. Ei kytköksiä muuhun
// koodiin (RuntimeInitializeOnLoadMethod, tilesetit haetaan itse), joten sama tiedosto käy sellaisenaan BUILD 172:n päälle.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using CesiumForUnity;
using Unity.Profiling;
using UnityEngine;
using Debug = UnityEngine.Debug;

namespace Matkakirja.Natiivi
{
    public sealed class MuistiTarkka : MonoBehaviour
    {
        const string Kytkin = "muisti-tarkka.txt", Loki = "muisti-tarkka.log";
        static readonly Stopwatch kello = new Stopwatch();
        static readonly object lukko = new object();
        static StreamWriter ulos;
        static int valiMs = 100;
        static volatile int tekstuuriPyynto;

        static long Ms => kello.ElapsedMilliseconds;
        static long Mt(long b) => b < 0 ? -1 : b >> 20;

        static void Kirjoita(string rivi)
        {
            lock (lukko) { try { ulos?.WriteLine(rivi); } catch (Exception) { } }
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Alusta()
        {
            try
            {
                var p = Path.Combine(Application.persistentDataPath, Kytkin);
                if (!File.Exists(p)) return;
                if (int.TryParse(File.ReadAllText(p).Trim(), out var ms) && ms >= 20) valiMs = ms;
                ulos = new StreamWriter(new FileStream(Path.Combine(Application.persistentDataPath, Loki), FileMode.Create, FileAccess.Write, FileShare.ReadWrite)) { AutoFlush = true };
                kello.Start();
                Kirjoita($"ALKU {DateTime.Now:yyyy-MM-dd HH:mm:ss} realtime {Time.realtimeSinceStartup:F2} väli {valiMs} ms laite {SystemInfo.deviceModel} " +
                         $"muisti {SystemInfo.systemMemorySize} Mt näyttö {Screen.width}×{Screen.height} unity {Application.unityVersion} versio {Application.version}");
                var go = new GameObject("MuistiTarkka") { hideFlags = HideFlags.HideAndDontSave };
                DontDestroyOnLoad(go);
                go.AddComponent<MuistiTarkka>();
                Application.logMessageReceivedThreaded += Lokirivi;
                Application.lowMemory += () => Kirjoita($"L {Ms} MUISTIVAROITUS (Application.lowMemory)");
                new Thread(Tausta) { IsBackground = true, Name = "MuistiTarkka", Priority = System.Threading.ThreadPriority.AboveNormal }.Start();
                Debug.Log($"MATKAKIRJA muistitarkka: päällä, väli {valiMs} ms → Documents/{Loki}");
            }
            catch (Exception e) { Debug.Log("MATKAKIRJA muistitarkka: ei käynnisty: " + e.Message); }
        }

        static void Lokirivi(string viesti, string pino, LogType tyyppi)
        {
            if (viesti == null || !viesti.StartsWith("MATKAKIRJA", StringComparison.Ordinal) || viesti.StartsWith("MATKAKIRJA muistitarkka", StringComparison.Ordinal)) return;
            if (viesti.Contains("telemetria") || viesti.StartsWith("MATKAKIRJA kehysajat", StringComparison.Ordinal) || viesti.StartsWith("MATKAKIRJA lampo", StringComparison.Ordinal)) return;
            Kirjoita($"L {Ms} {(viesti.Length > 260 ? viesti.Substring(0, 260) : viesti)}");
        }

        // ---- TAUSTASÄIE: task_vm_info + malloc joka välillä, VM-alueet 1 s välein ja nousussa ----
        static void Tausta()
        {
            var v = new long[16]; var a = new long[20];
            long alueAika = -100000, fpAlueet = 0;
            var historia = new Queue<(long Ms, long Fp)>();
            while (true)
            {
                long t = Ms;
                if (Tila(v) > 0)
                {
                    long fp = v[0];
                    Kirjoita($"N {t} fp {Mt(fp)} vapaa {Mt(v[1])} int {Mt(v[2])} comp {Mt(v[3])} gfx {Mt(v[4])} media {Mt(v[5])} neur {Mt(v[6])} " +
                             $"purg {Mt(v[8])} malloc {Mt(v[10])}/{Mt(v[11])} res {Mt(v[9])} huippu {Mt(v[12])} gfxei {Mt(v[15])}");
                    historia.Enqueue((t, fp));
                    while (historia.Count > 0 && t - historia.Peek().Ms > 300) historia.Dequeue();
                    if (historia.Count > 0 && fp - historia.Peek().Fp >= 150L << 20) tekstuuriPyynto = 1;
                    if (t - alueAika >= 1000 || fp - fpAlueet >= 48L << 20)
                    {
                        long t0 = Ms; int n = Alueet(a);
                        if (n > 0)
                            Kirjoita($"A {t} malloc {Mt(a[0])}/{Mt(a[1])} iogpu {Mt(a[2])}/{Mt(a[3])} iosurf {Mt(a[4])}/{Mt(a[5])} anon {Mt(a[6])}/{Mt(a[7])} " +
                                     $"imageio {Mt(a[8])}/{Mt(a[9])} aani {Mt(a[10])}/{Mt(a[11])} cg {Mt(a[12])}/{Mt(a[13])} pino {Mt(a[14])}/{Mt(a[15])} " +
                                     $"app {Mt(a[16])}/{Mt(a[17])} muu {Mt(a[18])}/{Mt(a[19])} alueita {n} kesto {Ms - t0} ms");
                        alueAika = t; fpAlueet = fp;
                    }
                }
                long uni = valiMs - (Ms - t);
                Thread.Sleep((int)Math.Max(5, uni));
            }
        }

#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern int MatkakirjaMuisti_Tila(long[] ulos, int n);
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern int MatkakirjaMuisti_Alueet(long[] ulos, int n);
        static int Tila(long[] v) => MatkakirjaMuisti_Tila(v, v.Length);
        static int Alueet(long[] a) => MatkakirjaMuisti_Alueet(a, a.Length);
#else
        static int Tila(long[] v) => 0;
        static int Alueet(long[] a) => 0;
#endif

        // ---- PÄÄSÄIE: Unityn laskurit, tekstuurit ja Cesium-laatat ----
        ProfilerRecorder rUsed, rRes, rGc, rGcRes, rAudio, rVideo, rAppRes, rSys;
        long seuraava, seuraavaHaku, seuraavaOv, viimeT = -1, edellinenTekstuuriT = -100000, avausT = -1;
        float edellinenKehys, maxDt;
        int kehyksia;

        sealed class Laatta { public GameObject Go; public string Ryhma; public long Mesh, Tex, Ov; }
        sealed class Ryhma { public int Elossa, Luotu, Tuhottu; public long Mesh, Tex, Ov; }
        readonly List<Laatta> laatat = new List<Laatta>();
        readonly Dictionary<string, Ryhma> ryhmat = new Dictionary<string, Ryhma>();
        readonly HashSet<int> seuratut = new HashSet<int>();
        readonly HashSet<int> tunnetut = new HashSet<int>();
        Cesium3DTileset google;
        readonly List<CesiumCameraManager> hallinnat = new List<CesiumCameraManager>();
        readonly Dictionary<string, int> kamLaskuri = new Dictionary<string, int>();

        static ProfilerRecorder R(string nimi)
        {
            try { return ProfilerRecorder.StartNew(ProfilerCategory.Memory, nimi); } catch (Exception) { return default; }
        }
        static long Arvo(ProfilerRecorder r) => r.Valid ? r.LastValue : -1;

        void Awake()
        {
            rUsed = R("Total Used Memory"); rRes = R("Total Reserved Memory"); rGc = R("GC Used Memory"); rGcRes = R("GC Reserved Memory");
            rAudio = R("Audio Used Memory"); rVideo = R("Video Used Memory"); rAppRes = R("App Resident Memory"); rSys = R("System Used Memory");
            edellinenKehys = Time.realtimeSinceStartup;
        }

        void OnDestroy()
        {
            rUsed.Dispose(); rRes.Dispose(); rGc.Dispose(); rGcRes.Dispose(); rAudio.Dispose(); rVideo.Dispose(); rAppRes.Dispose(); rSys.Dispose();
        }

        void Update()
        {
            kehyksia++;
            if (Time.unscaledDeltaTime > maxDt) maxDt = Time.unscaledDeltaTime;
            long t = Ms;
            if (t >= seuraavaHaku) { seuraavaHaku = t + 500; HaeTilesetit(); }
            if (tekstuuriPyynto == 1 && t - edellinenTekstuuriT >= 2000) { tekstuuriPyynto = 0; edellinenTekstuuriT = t; Kirjoita($"T {t} nousu {Tekstuurit(12)}"); }
            if (avausT > 0 && t - avausT >= 3000) { avausT = -1; Kirjoita($"T {t} avaus+3s {Tekstuurit(12)}"); }
            if (t >= seuraavaOv)
            {
                seuraavaOv = t + 2000;
                foreach (var rr in ryhmat.Values) rr.Ov = 0;
                foreach (var l in laatat) if (l.Go != null && ryhmat.TryGetValue(l.Ryhma, out var rr)) rr.Ov += Overlay(l.Go);
            }
            if (t < seuraava) return;
            seuraava = t + valiMs;
            float nyt = Time.realtimeSinceStartup;
            float vali = viimeT < 0 ? 0 : (nyt - edellinenKehys) * 1000f / Math.Max(1, kehyksia);
            float maxMs = maxDt * 1000f;
            edellinenKehys = nyt; kehyksia = 0; viimeT = t; maxDt = 0f;
            for (int i = laatat.Count - 1; i >= 0; i--)
            {
                var l = laatat[i];
                if (l.Go != null) continue;
                if (ryhmat.TryGetValue(l.Ryhma, out var r)) { r.Elossa--; r.Tuhottu++; r.Mesh -= l.Mesh; r.Tex -= l.Tex; }
                laatat[i] = laatat[laatat.Count - 1]; laatat.RemoveAt(laatat.Count - 1);
            }
            var sb = new StringBuilder(256);
            sb.Append($"U {t} rt {nyt:F2} kehys {vali:F0}/{maxMs:F0} used {Mt(Arvo(rUsed))} res {Mt(Arvo(rRes))} gc {Mt(Arvo(rGc))}/{Mt(Arvo(rGcRes))} " +
                      $"aud {Mt(Arvo(rAudio))} vid {Mt(Arvo(rVideo))} appres {Mt(Arvo(rAppRes))} sys {Mt(Arvo(rSys))} tex {Mt((long)Texture.currentTextureMemory)}");
            if (google != null) { try { sb.Append($" g% {google.ComputeLoadProgress():F0}"); } catch (Exception) { } }
            Kamerat(sb);
            foreach (var kv in ryhmat)
            {
                var r = kv.Value;
                sb.Append($" | {kv.Key} {r.Elossa} +{r.Luotu}-{r.Tuhottu} m {Mt(r.Mesh)} t {Mt(r.Tex)}{(r.Ov > 0 ? $" ov {Mt(r.Ov)}" : "")}");
                r.Luotu = 0; r.Tuhottu = 0;
            }
            Kirjoita(sb.ToString());
        }

        /// <summary>Cesiumin laattavalinnan kamerat (pää P, esilataus E, reitti R, karkea K, lähi L, muu ?) ja pikselikorkeus suhteessa
        /// näyttöön, esim. "kam P E1.0 R0.5×3": lisäkamerat valitsevat laatat kuten pääkamera (esilataus, reitti, karkea vaihe).</summary>
        void Kamerat(StringBuilder sb)
        {
            foreach (var h in hallinnat)
            {
                if (h == null) continue;
                kamLaskuri.Clear();
                sb.Append(" kam").Append(h.useMainCamera ? " P" : "");
                foreach (var c in h.additionalCameras)
                {
                    if (c == null) continue;
                    string n = c.name;
                    char k = n.Contains("reitin") ? 'R' : n.Contains("esilataus") ? 'E' : n.Contains("karkea") ? 'K' : n.Contains("lähi") ? 'L' : '?';
                    string avain = $"{k}{c.pixelRect.height / Math.Max(1, Screen.height):F1}";
                    kamLaskuri[avain] = kamLaskuri.TryGetValue(avain, out var x) ? x + 1 : 1;
                }
                foreach (var kv in kamLaskuri) sb.Append(' ').Append(kv.Key).Append(kv.Value > 1 ? $"×{kv.Value}" : "");
            }
        }

        static string RyhmanNimi(Cesium3DTileset ts)
        {
            string n = ts.gameObject.name;
            if (n.StartsWith("Kaupunki Google", StringComparison.Ordinal)) return "G";
            if (n.StartsWith("Oma malli", StringComparison.Ordinal)) return "O";
            if (n.StartsWith("Kaupunki aluskerros", StringComparison.Ordinal)) return "A";
            n = n.Replace(' ', '_');
            return n.Length > 14 ? n.Substring(0, 14) : n;
        }

        void HaeTilesetit()
        {
            Cesium3DTileset[] kaikki;
            try { kaikki = FindObjectsByType<Cesium3DTileset>(FindObjectsInactive.Include, FindObjectsSortMode.None); }
            catch (Exception) { return; }
            try
            {
                hallinnat.Clear();
                foreach (var h in FindObjectsByType<CesiumCameraManager>(FindObjectsInactive.Exclude, FindObjectsSortMode.None)) if (h != null) hallinnat.Add(h);
            }
            catch (Exception) { }
            foreach (var ts in kaikki)
            {
                if (ts == null || !seuratut.Add(ts.GetHashCode())) continue;
                string ryhma = RyhmanNimi(ts);
                if (ryhma == "G") { google = ts; avausT = Ms; }
                var tsMuisti = ts;
                ts.OnTileGameObjectCreated += go => Luotu(ryhma, go);
                int vanhat = 0;
                foreach (Transform lapsi in tsMuisti.transform) { Luotu(ryhma, lapsi.gameObject); vanhat++; }
                Kirjoita($"L {Ms} muistitarkka: seuraa tilesettiä {ts.gameObject.name} ({ryhma}), valmiina {vanhat} laattaa, SSE {ts.maximumScreenSpaceError:F1}, välimuisti {ts.maximumCachedBytes >> 20} Mt, " +
                         $"rinnakkain {ts.maximumSimultaneousTileLoads}, forbidHoles {ts.forbidHoles}, preloadAncestors {ts.preloadAncestors}");
            }
        }

        void Luotu(string ryhma, GameObject go)
        {
            if (go == null || !tunnetut.Add(go.GetHashCode())) return;
            if (!ryhmat.TryGetValue(ryhma, out var r)) ryhmat[ryhma] = r = new Ryhma();
            var (m, tx) = Arvioi(go);
            laatat.Add(new Laatta { Go = go, Ryhma = ryhma, Mesh = m, Tex = tx });
            r.Elossa++; r.Luotu++; r.Mesh += m; r.Tex += tx;
            if (ryhma == "O" || (ryhma == "G" && gKuvattu++ < 5)) Kirjoita($"L {Ms} muistitarkka: laatta {ryhma} {go.name}: {Erittely(go)}, arvio mesh {Mt(m)} Mt, tekstuurit {Mt(tx)} Mt");
        }

        int gKuvattu;
        static readonly List<string> nimet = new List<string>();
        /// <summary>Rasterikerrosten (esim. omien mallien leikkausmaski "_overlayTexture_Clipping") tekstuurit laatan materiaaleissa.</summary>
        static long Overlay(GameObject go)
        {
            long b = 0;
            try
            {
                tassa.Clear();
                foreach (var mr in go.GetComponentsInChildren<MeshRenderer>(true))
                    foreach (var mat in mr.sharedMaterials)
                    {
                        if (mat == null) continue;
                        mat.GetTexturePropertyNames(nimet);
                        foreach (var n in nimet)
                        {
                            if (n.IndexOf("overlay", StringComparison.OrdinalIgnoreCase) < 0) continue;
                            var t = mat.GetTexture(n);
                            if (t == null || !tassa.Add(t.GetHashCode())) continue;
                            b += Koko(t);
                        }
                    }
            }
            catch (Exception) { }
            return b;
        }
        /// <summary>Laatan renderöijät, tekstuuriviitteet ja yksilölliset tekstuurit mitoittain (onko sama kuva monena tekstuurina).</summary>
        static string Erittely(GameObject go)
        {
            try
            {
                int rend = 0, viitteet = 0; var yks = new Dictionary<int, Texture>(); var muut = new HashSet<int>();
                foreach (var mr in go.GetComponentsInChildren<MeshRenderer>(true))
                {
                    rend++;
                    foreach (var mat in mr.sharedMaterials)
                    {
                        if (mat == null) continue;
                        mat.GetTexturePropertyNameIDs(idt);
                        foreach (var id in idt)
                        {
                            var t = mat.GetTexture(id); if (t == null) continue;
                            if ((t.hideFlags & HideFlags.HideAndDontSave) != HideFlags.HideAndDontSave) { muut.Add(t.GetHashCode()); continue; }
                            viitteet++; yks[t.GetHashCode()] = t;
                        }
                    }
                }
                var mitat = new Dictionary<string, int>();
                foreach (var t in yks.Values) { string k = $"{t.width}×{t.height} {t.graphicsFormat} mip{t.mipmapCount}"; mitat[k] = mitat.TryGetValue(k, out var c) ? c + 1 : 1; }
                var sb = new StringBuilder($"renderöijiä {rend}, tekstuuriviitteitä {viitteet}, yksilöllisiä {yks.Count} (muita jaettuja {muut.Count}):");
                foreach (var kv in mitat) sb.Append($" {kv.Key} ×{kv.Value};");
                return sb.ToString();
            }
            catch (Exception e) { return "erittely epäonnistui: " + e.Message; }
        }

        static readonly List<int> idt = new List<int>();
        static readonly HashSet<int> tassa = new HashSet<int>();
        static (long Mesh, long Tex) Arvioi(GameObject go)
        {
            long m = 0, tx = 0;
            try
            {
                foreach (var mf in go.GetComponentsInChildren<MeshFilter>(true))
                {
                    var mesh = mf.sharedMesh; if (mesh == null) continue;
                    for (int s = 0; s < mesh.vertexBufferCount; s++) m += (long)mesh.GetVertexBufferStride(s) * mesh.vertexCount;
                    long ind = 0; for (int i = 0; i < mesh.subMeshCount; i++) ind += mesh.GetIndexCount(i);
                    m += ind * (mesh.indexFormat == UnityEngine.Rendering.IndexFormat.UInt32 ? 4 : 2);
                }
                tassa.Clear();
                foreach (var mr in go.GetComponentsInChildren<MeshRenderer>(true))
                    foreach (var mat in mr.sharedMaterials)
                    {
                        if (mat == null) continue;
                        mat.GetTexturePropertyNameIDs(idt);
                        foreach (var id in idt)
                        {
                            var t = mat.GetTexture(id);
                            if (t == null || (t.hideFlags & HideFlags.HideAndDontSave) != HideFlags.HideAndDontSave || !tassa.Add(t.GetHashCode())) continue;
                            tx += Koko(t);
                        }
                    }
            }
            catch (Exception) { }
            return (m, tx);
        }

        /// <summary>Tekstuurin koko mitoista ja muodosta (laitteella GetRuntimeMemorySizeLong antaa GPU-tekstuureille liian vähän).</summary>
        static long Koko(Texture t)
        {
            try
            {
                var f = t.graphicsFormat;
                long w = Math.Max(1, t.width), h = Math.Max(1, t.height), d = t is Texture3D t3 ? t3.depth : t is Texture2DArray ta ? ta.depth : t is Cubemap ? 6 : 1;
                long b = 0;
                if (f != UnityEngine.Experimental.Rendering.GraphicsFormat.None)
                {
                    uint bw = UnityEngine.Experimental.Rendering.GraphicsFormatUtility.GetBlockWidth(f), bh = UnityEngine.Experimental.Rendering.GraphicsFormatUtility.GetBlockHeight(f);
                    b = (w + bw - 1) / bw * ((h + bh - 1) / bh) * UnityEngine.Experimental.Rendering.GraphicsFormatUtility.GetBlockSize(f) * d;
                }
                if (t.mipmapCount > 1) b = b * 4 / 3;
                if (t is RenderTexture rt) { b *= Math.Max(1, rt.antiAliasing); if (rt.depthStencilFormat != UnityEngine.Experimental.Rendering.GraphicsFormat.None) b += w * h * 5 * Math.Max(1, rt.antiAliasing); }
                return b;
            }
            catch (Exception) { return 0; }
        }

        /// <summary>Kaikki tekstuurit tyypeittäin (piilo = HideAndDontSave, esim. Cesiumin laatat) ja n suurinta.</summary>
        static string Tekstuurit(int n)
        {
            var kaikki = Resources.FindObjectsOfTypeAll<Texture>();
            var tyypit = new Dictionary<string, (int N, long B)>();
            var rivit = new List<(long B, string K)>(kaikki.Length);
            foreach (var t in kaikki)
            {
                if (t == null) continue;
                long b = Koko(t);
                string tyyppi = t.GetType().Name + ((t.hideFlags & HideFlags.HideAndDontSave) == HideFlags.HideAndDontSave ? "(piilo)" : "");
                var e = tyypit.TryGetValue(tyyppi, out var x) ? x : (0, 0L);
                tyypit[tyyppi] = (e.Item1 + 1, e.Item2 + b);
                rivit.Add((b, $"{(t.name.Length > 0 ? t.name : "(nimetön)")} {t.width}×{t.height} {t.graphicsFormat} {b >> 20} Mt"));
            }
            rivit.Sort((p, q) => q.B.CompareTo(p.B));
            var sb = new StringBuilder($"{kaikki.Length} kpl, currentTextureMemory {(long)Texture.currentTextureMemory >> 20} Mt;");
            foreach (var kv in tyypit) sb.Append($" {kv.Key} {kv.Value.N} kpl {kv.Value.B >> 20} Mt,");
            sb.Append(" suurimmat:");
            for (int i = 0; i < Math.Min(n, rivit.Count); i++) sb.Append(" | ").Append(rivit[i].K);
            return sb.ToString();
        }
    }
}
