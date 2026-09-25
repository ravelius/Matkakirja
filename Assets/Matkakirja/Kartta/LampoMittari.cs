using System.Globalization;
using System.IO;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// LÄMPÖMITTARI (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA kohta 4, Pelikoodari 25.9.2026): 30 s välein rivi
    /// "MATKAKIRJA lampo {json}" lokiin ja Documents/lampo.jsonl-tiedostoon (laitteelta devicectl:llä): aika, thermalState
    /// (0 nominal – 3 critical), virransäästö, akku-%, lataus, keskimääräinen fps jaksolla, targetFrameRate ja piirtoväli.
    /// Ei muuta pelin käytöstä (build 15:n vertailumittaus).
    /// </summary>
    public sealed class LampoMittari : MonoBehaviour
    {
        public const float Jakso = 30f;

        string polku;
        float alku;
        int kehyksia;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (FindAnyObjectByType<LampoMittari>() != null) return;
            var go = new GameObject("LampoMittari");
            DontDestroyOnLoad(go);
            go.AddComponent<LampoMittari>();
        }

        void Awake()
        {
            polku = Path.Combine(Application.persistentDataPath, "lampo.jsonl");
            alku = Time.realtimeSinceStartup;
            Lampo.Paivita(true);
            Kirjaa(0f);
        }

        void Update()
        {
            kehyksia++;
            Lampo.Paivita();
            float kulunut = Time.realtimeSinceStartup - alku;
            if (kulunut < Jakso) return;
            Kirjaa(kehyksia / kulunut);
            alku = Time.realtimeSinceStartup;
            kehyksia = 0;
        }

        void Kirjaa(float fps)
        {
            var c = CultureInfo.InvariantCulture;
            float akku = SystemInfo.batteryLevel;
            string rivi = "{\"t\":" + Time.realtimeSinceStartup.ToString("0", c)
                + ",\"aika\":\"" + System.DateTime.Now.ToString("HH:mm:ss", c) + "\""
                + ",\"thermal\":" + Lampo.ThermalState
                + ",\"virransaasto\":" + (Lampo.Virransaasto ? "true" : "false")
                + ",\"akku\":" + (akku >= 0 ? (akku * 100f).ToString("0", c) : "-1")
                + ",\"lataus\":\"" + SystemInfo.batteryStatus + "\""
                + ",\"fps\":" + fps.ToString("0.0", c)
                + ",\"tavoite\":" + Application.targetFrameRate
                + ",\"piirtovali\":" + OnDemandRendering.renderFrameInterval + "}";
            Debug.Log("MATKAKIRJA lampo " + rivi);
            try { File.AppendAllText(polku, rivi + "\n"); } catch (IOException) { }
        }
    }
}
