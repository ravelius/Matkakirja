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
        const int Katto = 1200, Karki = 12;
        // Pelisilmukan vaiheet ja UI Toolkitin päämerkit ensin, jottei katto rajaa niitä pois.
        static readonly Regex Ensin = new Regex("^(PlayerLoop|Initialization|EarlyUpdate|FixedUpdate|PreUpdate|Update|PreLateUpdate|PostLateUpdate|UIElements|UIR|GC)",
            RegexOptions.CultureInvariant);
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
            var valitut = kahvat.Select(h => (Kahva: h, Kuvaus: ProfilerRecorderHandle.GetDescription(h)))
                .Where(x => x.Kuvaus.UnitType == ProfilerMarkerDataUnit.TimeNanoseconds && !string.IsNullOrEmpty(x.Kuvaus.Name) && Suodatin.IsMatch(x.Kuvaus.Name))
                .OrderBy(x => Ensin.IsMatch(x.Kuvaus.Name) ? 0 : 1)
                .Take(Katto);
            // Default (WrapAround + SumAllSamplesInFrame) EI käynnistä mittaria: ilman StartImmediately kaikki arvot
            // olivat nollia (Natiivisepän iPad-ajo 24.9.: piikkirivit tyhjiä).
            const ProfilerRecorderOptions Valinnat = ProfilerRecorderOptions.Default | ProfilerRecorderOptions.StartImmediately;
            foreach (var (h, d) in valitut) mittarit.Add((d.Name, new ProfilerRecorder(h, 1, Valinnat)));
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
            var raskaat = mittarit.Select(m => (m.Nimi, Ms: m.Mittari.LastValue / 1e6)).Where(x => x.Ms >= 0.5).OrderByDescending(x => x.Ms).Take(Karki).ToList();
            foreach (var (nimi, ms) in raskaat)
                sb.Append(' ').Append(nimi).Append(' ').Append(ms.ToString("0.0", CultureInfo.InvariantCulture)).Append(';');
            if (raskaat.Count == 0) sb.Append(" (ei arvoja: " + mittarit.Count(m => m.Mittari.Valid && m.Mittari.IsRunning) + "/" + mittarit.Count + " mittaria käynnissä)");
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
