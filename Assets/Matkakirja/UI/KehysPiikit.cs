// KEHYSPIIKIT (Natiivi-UI): pitkän kehyksen syy lokiin ilman Xcoden profiloijaa (Natiivisepän havainto 24.9.:
// `ui jatka` antaa 107 ms:n kehyksen, vaikka pelin omat ajoitukset ovat pieniä).
//
// `ui piikit [s] [kynnys ms]` käynnistää ProfilerRecorderit kaikille aikamerkeille, joiden nimi osuu suodattimeen
// (UI Toolkit, teksti ja fontit, skriptit, GC, lataus, tekstuurit ja shaderit, renderöinti, Cesium), ja kirjaa
// s sekunnin ajan jokaisesta kynnyksen ylittävästä kehyksestä kaksitoista raskainta merkkiä (ms). Merkit ovat
// saatavilla development-buildissa; release-buildissa lista jää lyhyeksi. Mittari sammuu itsestään.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Unity.Profiling;
using Unity.Profiling.LowLevel.Unsafe;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class KehysPiikit
    {
        const int Katto = 400, Karki = 12;
        static readonly Regex Suodatin = new Regex(
            "UI|UIR|Panel|Layout|Text|Font|Style|Visual|Update|Script|Coroutine|GC|Load|Shader|Texture|Upload|Render|Cesium|Camera|Audio|Animation|Gfx|Semaphore|WaitFor",
            RegexOptions.CultureInvariant);

        static readonly List<(string Nimi, ProfilerRecorder Mittari)> mittarit = new List<(string, ProfilerRecorder)>();
        static float loppu, kynnys;
        static int piikkeja;
        static bool kaynnissa;

        /// <summary>Käynnistää seurannan (kesto s, kynnys ms); palauttaa seurattujen merkkien määrän.</summary>
        public static int Aloita(float kestoS, float kynnysMs)
        {
            Lopeta();
            var kahvat = new List<ProfilerRecorderHandle>();
            ProfilerRecorderHandle.GetAvailable(kahvat);
            foreach (var h in kahvat)
            {
                var d = ProfilerRecorderHandle.GetDescription(h);
                if (d.UnitType != ProfilerMarkerDataUnit.TimeNanoseconds || string.IsNullOrEmpty(d.Name) || !Suodatin.IsMatch(d.Name)) continue;
                mittarit.Add((d.Name, new ProfilerRecorder(h, 1, ProfilerRecorderOptions.Default)));
                if (mittarit.Count >= Katto) break;
            }
            loppu = Time.realtimeSinceStartup + kestoS;
            kynnys = kynnysMs / 1000f;
            piikkeja = 0;
            if (!kaynnissa) { kaynnissa = true; UiKerros.Hae().JokaRuutu += Ruutu; }
            Debug.Log($"MATKAKIRJA piikit: seurataan {mittarit.Count} merkkiä {kestoS:0} s, kynnys {kynnysMs:0} ms");
            return mittarit.Count;
        }

        static void Ruutu()
        {
            if (Time.realtimeSinceStartup > loppu) { Debug.Log($"MATKAKIRJA piikit: loppu, {piikkeja} piikkiä"); Lopeta(); return; }
            // unscaledDeltaTime on edellisen kehyksen kesto, ja mittarien LastValue on samasta kehyksestä.
            float dt = Time.unscaledDeltaTime;
            if (dt < kynnys) return;
            piikkeja++;
            var sb = new StringBuilder();
            sb.Append("MATKAKIRJA piikit: kehys ").Append((dt * 1000f).ToString("0.0", CultureInfo.InvariantCulture)).Append(" ms (frame ")
              .Append(Time.frameCount - 1).Append("):");
            foreach (var (nimi, ms) in mittarit.Select(m => (m.Nimi, Ms: m.Mittari.LastValue / 1e6)).Where(x => x.Ms >= 0.5).OrderByDescending(x => x.Ms).Take(Karki))
                sb.Append(' ').Append(nimi).Append(' ').Append(ms.ToString("0.0", CultureInfo.InvariantCulture)).Append(';');
            Debug.Log(sb.ToString());
        }

        public static void Lopeta()
        {
            foreach (var (_, m) in mittarit) m.Dispose();
            mittarit.Clear();
            if (kaynnissa && UiKerros.Olemassa) UiKerros.Hae().JokaRuutu -= Ruutu;
            kaynnissa = false;
        }
    }
}
