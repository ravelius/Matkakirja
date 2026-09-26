using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Kehysaikamittari. Nostaa kehystavoitteen näytön taajuuteen (ProMotion 120 Hz),
    /// koska Unity rajaa iOS:llä oletuksena 30 kehykseen sekunnissa. Kirjaa kehysajat
    /// erikseen liikkeessä (veto, liuku, zoomi), levossa ja peitossa (koko näytön lehti
    /// pallon päällä, PalloKierto.Peitetty: pallo ei näy), ja kirjoittaa ne viiden
    /// sekunnin jaksoina tiedostoon persistentDataPath/kehysajat.jsonl.
    ///
    /// Simulaattorin luvut kertovat vain, ettei koodissa ole ilmeistä pullonkaulaa:
    /// simulaattori piirtää Macin GPU:lla, joten laitteen sulavuus mitataan laitteella.
    /// </summary>
    public class KehysMittari : MonoBehaviour
    {
        public PalloKierto pallo;
        public float jakso = 5f;

        readonly List<float> liike = new List<float>();
        readonly List<float> lepo = new List<float>();
        readonly List<float> peitto = new List<float>();
        float alku;
        string polku;
        float tavoite;

        void Awake()
        {
            // Tavoitetaajuus: Ruudunpaivitys (lämpöerä 25.9.2026) — täysi näytön taajuus liikkeessä, levossa 30 fps.
            var taajuus = Screen.currentResolution.refreshRateRatio.value;
            tavoite = 1000f / (taajuus > 1 ? (float)System.Math.Round(taajuus) : 60f);
            // Tiedostokirjaus vain kehittäjätilassa (Raamattu LÄMPÖ JA VIRRANKULUTUS kohta 3); loki aina.
            if (Kehittajatila())
            {
                polku = Path.Combine(Application.persistentDataPath, "kehysajat.jsonl");
                File.WriteAllText(polku, "");
            }
            alku = Time.realtimeSinceStartup;
            Debug.Log($"MATKAKIRJA kehysmittari: tavoite {1000f / tavoite:0} Hz (liikkeessä), tiedosto {polku ?? "ei (ei kehittäjätilaa)"}");
        }

        /// <summary>Sama ehto kuin Natiivi.Asetukset.Kehittaja (Assembly-CSharp; Kartta ei näe sitä).</summary>
        static bool Kehittajatila()
        {
#if MATKAKIRJA_APPSTORE
            return false;
#else
            return Debug.isDebugBuild || PlayerPrefs.GetString("matkakirja-kehittaja", "") == "1";
#endif
        }

        // Lämpöerä (Fable 25.9.): kehysten jakauma Ruudunpaivityksen tiloihin ja piirretyt kehykset jaksolla.
        int nTaysi, nLepo, nPaikallaan, nPeitto, piirretty, kehyksia;

        void Update()
        {
            float ms = Time.unscaledDeltaTime * 1000f;
            if (Time.frameCount > 5)
                (pallo == null ? lepo : pallo.Peitetty ? peitto : pallo.Liikkeessa ? liike : lepo).Add(ms);
            kehyksia++;
            if (UnityEngine.Rendering.OnDemandRendering.willCurrentFrameRender) piirretty++;
            Gpu();
            var r = Ruudunpaivitys.Instanssi;
            if (pallo != null && pallo.Peitetty) nPeitto++;
            else if (r == null || r.Nyt == Ruudunpaivitys.Tila.Taysi) nTaysi++;
            else if (r.Nyt == Ruudunpaivitys.Tila.Lepo) nLepo++;
            else if (r.Nyt == Ruudunpaivitys.Tila.Kerros) nKerros++;
            else nPaikallaan++;
            if (Time.realtimeSinceStartup - alku >= jakso)
            {
                Kirjaa();
                alku = Time.realtimeSinceStartup;
            }
        }

        // GPU-aika (löydös 161 A/B-mittaus): FrameTimingManager, vaatii PlayerSettings enableFrameTimingStats. Vain piirretyt
        // kehykset tuottavat ajan; sama kehys (frameStartTimestamp) lasketaan kerran.
        readonly FrameTiming[] ajat = new FrameTiming[1];
        ulong edellinenGpuKehys;
        double gpuSumma;
        int gpuN, nKerros;

        void Gpu()
        {
            FrameTimingManager.CaptureFrameTimings();
            if (FrameTimingManager.GetLatestTimings(1, ajat) == 0) return;
            var a = ajat[0];
            if (a.gpuFrameTime <= 0 || a.frameStartTimestamp == edellinenGpuKehys) return;
            edellinenGpuKehys = a.frameStartTimestamp;
            gpuSumma += a.gpuFrameTime;
            gpuN++;
        }

        void Kirjaa()
        {
            float akku = SystemInfo.batteryLevel;
            string rivi = "{" +
                $"\"t\":{F(Time.realtimeSinceStartup)},\"tavoiteMs\":{F(tavoite)}," +
                $"\"liike\":{Tilasto(liike, tavoite)},\"lepo\":{Tilasto(lepo, 1000f / Ruudunpaivitys.LepoFps)},\"peitto\":{Tilasto(peitto, 1000f / Ruudunpaivitys.LepoFps)}," +
                $"\"kehyksia\":{kehyksia},\"piirretty\":{piirretty}," +
                $"\"tilat\":{{\"taysi\":{nTaysi},\"lepo\":{nLepo},\"paikallaan\":{nPaikallaan},\"kerros\":{nKerros},\"peitto\":{nPeitto}}}," +
                $"\"gpuMs\":{(gpuN > 0 ? F((float)(gpuSumma / gpuN)) : "null")},\"gpuKehyksia\":{gpuN}," +
                $"\"fps\":{Application.targetFrameRate},\"thermal\":{Lampo.ThermalState},\"lampo\":\"{Lampo.Taso}\"," +
                $"\"virransaasto\":{(Lampo.Virransaasto ? "true" : "false")},\"akku\":{(akku >= 0 ? F(akku * 100f) : "-1")}," +
                VerkkoOdotus.Rivi() + "}";
            nTaysi = nLepo = nPaikallaan = nKerros = nPeitto = piirretty = kehyksia = 0;
            gpuSumma = 0; gpuN = 0;
            if (polku != null) File.AppendAllText(polku, rivi + "\n");
            Debug.Log("MATKAKIRJA kehysajat " + rivi);
            liike.Clear();
            lepo.Clear();
            peitto.Clear();
        }

        string Tilasto(List<float> a, float tavoiteMs)
        {
            if (a.Count == 0) return "null";
            var j = new List<float>(a);
            j.Sort();
            float P(float q) => j[Mathf.Min(j.Count - 1, (int)(q * j.Count))];
            int yli = j.FindAll(x => x > tavoiteMs * 1.5f).Count;
            return "{" + $"\"n\":{j.Count},\"p50\":{F(P(0.5f))},\"p95\":{F(P(0.95f))}," +
                $"\"p99\":{F(P(0.99f))},\"max\":{F(j[j.Count - 1])},\"yli15x\":{yli}" + "}";
        }

        static string F(float x) => x.ToString("0.##", CultureInfo.InvariantCulture);
    }
}
