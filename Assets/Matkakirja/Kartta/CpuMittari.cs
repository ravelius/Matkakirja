using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Unity.Profiling;
using Unity.Profiling.LowLevel.Unsafe;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KEHYKSEN CPU-HINTA (Fable 25.9.2026 klo 22.4x, Pelikoodari; raportti docs/raportit/kehyksen-hinta-20260925.md, osio CPU).
    /// Profilerin merkit laitteella ilman editoria: ProfilerRecorder jokaiselle aikamerkille, joka täsmää suodattimeen.
    /// Skriptien Update-merkit ("Luokka.Update() [Invoke]" ym.) ja UI Toolkitin tarkat merkit ovat vain Development-käännöksessä
    /// (MATKAKIRJA_KEHITYS=1); Release-käännöksessä saadaan vain moottorin päämerkit.
    ///   cpu lista            kaikki saatavilla olevat aikamerkit → Documents/cpu-merkit.txt
    ///   cpu mittaa [s] [suodatin|kaikki]  s sekuntia (oletus 10): keskiarvo ms/kehys, p95, max ja kutsut/kehys merkeittäin
    ///                        → Documents/cpu-mittaus.txt (kalleimmat ensin) ja lokiin 25 kalleinta
    /// </summary>
    public sealed class CpuMittari : MonoBehaviour
    {
        static CpuMittari instanssi;
        public static string Tila { get; private set; } = "ei mitattu";

        /// <summary>Oletussuodatin: pelisilmukan vaiheet, skriptien kutsut, UI Toolkit, Cesium, renderöinnin CPU-puoli.</summary>
        static readonly string[] Oletus =
        {
            "PlayerLoop", "Main Thread", "Update.", "PreUpdate.", "PreLateUpdate.", "PostLateUpdate.", "FixedUpdate.", "EarlyUpdate.",
            "Initialization.", "[Invoke]", "[Coroutine", "Coroutine", "UIElements", "UIR.", "Layout", "Panel", "TextCore", "Cesium",
            "Tileset", "Camera.Render", "Culling", "RenderPipeline", "Inl_", "Canvas", "Gfx.", "WaitForTargetFPS", "GC.", "Loading.",
        };

        static void Varmista()
        {
            if (instanssi != null) return;
            var go = new GameObject("CpuMittari");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<CpuMittari>();
        }

        static List<ProfilerRecorderHandle> Aikamerkit(out Dictionary<ProfilerRecorderHandle, ProfilerRecorderDescription> kuvaukset)
        {
            var kaikki = new List<ProfilerRecorderHandle>();
            ProfilerRecorderHandle.GetAvailable(kaikki);
            kuvaukset = new Dictionary<ProfilerRecorderHandle, ProfilerRecorderDescription>();
            var ajat = new List<ProfilerRecorderHandle>();
            foreach (var h in kaikki)
            {
                var d = ProfilerRecorderHandle.GetDescription(h);
                if (d.UnitType != ProfilerMarkerDataUnit.TimeNanoseconds) continue;
                kuvaukset[h] = d;
                ajat.Add(h);
            }
            return ajat;
        }

        /// <summary>
        /// Profiler päälle (Development-käännös): moottori luo skriptien kutsumerkit ("Luokka.Update() [Invoke]") vasta, kun
        /// profilointi on käynnissä. Data puskuroidaan muistiin (ei tiedostoa, ei yhteyttä).
        /// </summary>
        public static string Profiloi(bool paalle)
        {
            if (!Debug.isDebugBuild) return "vain Development-käännöksessä";
            UnityEngine.Profiling.Profiler.maxUsedMemory = 64 * 1024 * 1024;
            UnityEngine.Profiling.Profiler.enabled = paalle;
            return "profiler " + (UnityEngine.Profiling.Profiler.enabled ? "päällä" : "pois");
        }

        public static string Lista()
        {
            var ajat = Aikamerkit(out var k);
            var rivit = ajat.Select(h => $"{k[h].Category.Name}\t{k[h].Name}").OrderBy(x => x, StringComparer.Ordinal);
            File.WriteAllLines(Path.Combine(Application.persistentDataPath, "cpu-merkit.txt"), rivit);
            return $"{ajat.Count} aikamerkkiä → cpu-merkit.txt";
        }

        public static string Mittaa(float s, string suodatin, bool piirto = false)
        {
            Varmista();
            if (instanssi.kaynnissa) return "mittaus jo käynnissä";
            instanssi.StartCoroutine(instanssi.Aja(s, suodatin == "-" ? null : suodatin, piirto));
            return null;
        }

        bool kaynnissa;

        sealed class Merkki
        {
            public string Nimi, Luokka;
            public ProfilerRecorder R;
            public readonly List<double> Ms = new List<double>();
            public long Kutsuja;
        }

        IEnumerator Aja(float s, string suodatin, bool piirto)
        {
            kaynnissa = true;
            // piirto: LEPO joka kehys (UI ei "rauhassa") eikä PAIKALLAAN, jotta renderöinnin CPU-osuus näkyy.
            var rauha = Ruudunpaivitys.UiRauhassa;
            if (piirto) Ruudunpaivitys.UiRauhassa = () => false;
            Tila = "mitataan";
            var ajat = Aikamerkit(out var kuvaukset);
            string[] ehdot = suodatin == "kaikki" ? null : string.IsNullOrEmpty(suodatin) ? Oletus : suodatin.Split('|');
            var merkit = new List<Merkki>();
            foreach (var h in ajat)
            {
                var d = kuvaukset[h];
                if (ehdot != null && !ehdot.Any(e => d.Name.IndexOf(e, StringComparison.Ordinal) >= 0)) continue;
                var m = new Merkki { Nimi = d.Name, Luokka = d.Category.Name, R = new ProfilerRecorder(h, 1, ProfilerRecorderOptions.Default | ProfilerRecorderOptions.SumAllSamplesInFrame) };
                m.R.Start();
                merkit.Add(m);
            }
            Debug.Log($"MATKAKIRJA cpu: mitataan {s:0} s, {merkit.Count} merkkiä ({ajat.Count} aikamerkistä), ruutu {Ruudunpaivitys.Instanssi?.Nyt}");
            yield return null;
            float loppu = Time.realtimeSinceStartup + s;
            int kehyksia = 0;
            var tilat = new Dictionary<string, int>();
            while (Time.realtimeSinceStartup < loppu)
            {
                yield return null;
                kehyksia++;
                string t = Ruudunpaivitys.Instanssi != null ? Ruudunpaivitys.Instanssi.Nyt.ToString() : "?";
                tilat[t] = tilat.TryGetValue(t, out var n) ? n + 1 : 1;
                foreach (var m in merkit)
                {
                    if (!m.R.Valid) continue;
                    m.Ms.Add(m.R.LastValue / 1e6);
                    m.Kutsuja += m.R.Count > 0 ? m.R.GetSample(0).Count : 0;
                }
            }
            foreach (var m in merkit) m.R.Dispose();
            if (piirto) Ruudunpaivitys.UiRauhassa = rauha;
            var tulos = merkit.Where(m => m.Ms.Count > 0).Select(m =>
            {
                var j = m.Ms.OrderBy(x => x).ToList();
                return (m.Nimi, m.Luokka, Ka: j.Average(), P95: j[(int)Math.Min(j.Count - 1, Math.Floor(j.Count * 0.95))], Max: j[j.Count - 1],
                        Kutsuja: (double)m.Kutsuja / Math.Max(1, kehyksia));
            }).Where(x => x.Max > 0).OrderByDescending(x => x.Ka).ToList();
            var sb = new StringBuilder();
            sb.AppendLine($"CPU-MITTAUS {DateTime.Now:yyyy-MM-dd HH:mm:ss}: {kehyksia} kehystä {s:0} s:ssa, tilat {string.Join(", ", tilat.Select(kv => kv.Key + " " + kv.Value))}, "
                        + $"kehitys {Debug.isDebugBuild}, laite {SystemInfo.deviceModel}");
            sb.AppendLine("ka ms/kehys\tp95\tmax\tkutsuja/kehys\tluokka\tmerkki");
            foreach (var x in tulos)
                sb.AppendLine($"{x.Ka:0.000}\t{x.P95:0.000}\t{x.Max:0.000}\t{x.Kutsuja:0.#}\t{x.Luokka}\t{x.Nimi}");
            File.WriteAllText(Path.Combine(Application.persistentDataPath, "cpu-mittaus.txt"), sb.ToString());
            Debug.Log("MATKAKIRJA cpu: " + string.Join(" | ", tulos.Take(25).Select(x => $"{x.Nimi} {x.Ka:0.00}")));
            Tila = $"{kehyksia} kehystä, {tulos.Count} merkkiä → cpu-mittaus.txt";
            kaynnissa = false;
        }
    }
}
