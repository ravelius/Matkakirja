using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Kehysaikamittari. Nostaa kehystavoitteen näytön taajuuteen (ProMotion 120 Hz),
    /// koska Unity rajaa iOS:llä oletuksena 30 kehykseen sekunnissa. Kirjaa kehysajat
    /// erikseen liikkeessä (veto, liuku, zoomi) ja levossa, ja kirjoittaa ne viiden
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
        float alku;
        string polku;
        float tavoite;

        void Awake()
        {
            var taajuus = Screen.currentResolution.refreshRateRatio.value;
            Application.targetFrameRate = taajuus > 1 ? (int)System.Math.Round(taajuus) : 60;
            tavoite = 1000f / Application.targetFrameRate;
            polku = Path.Combine(Application.persistentDataPath, "kehysajat.jsonl");
            File.WriteAllText(polku, "");
            alku = Time.realtimeSinceStartup;
            Debug.Log($"MATKAKIRJA kehysmittari: tavoite {Application.targetFrameRate} Hz, {polku}");
        }

        void Update()
        {
            float ms = Time.unscaledDeltaTime * 1000f;
            if (Time.frameCount > 5) (pallo != null && pallo.Liikkeessa ? liike : lepo).Add(ms);
            if (Time.realtimeSinceStartup - alku >= jakso)
            {
                Kirjaa();
                alku = Time.realtimeSinceStartup;
            }
        }

        void Kirjaa()
        {
            string rivi = "{" +
                $"\"t\":{F(Time.realtimeSinceStartup)},\"tavoiteMs\":{F(tavoite)}," +
                $"\"liike\":{Tilasto(liike)},\"lepo\":{Tilasto(lepo)}" + "}";
            File.AppendAllText(polku, rivi + "\n");
            Debug.Log("MATKAKIRJA kehysajat " + rivi);
            liike.Clear();
            lepo.Clear();
        }

        string Tilasto(List<float> a)
        {
            if (a.Count == 0) return "null";
            var j = new List<float>(a);
            j.Sort();
            float P(float q) => j[Mathf.Min(j.Count - 1, (int)(q * j.Count))];
            int yli = j.FindAll(x => x > tavoite * 1.5f).Count;
            return "{" + $"\"n\":{j.Count},\"p50\":{F(P(0.5f))},\"p95\":{F(P(0.95f))}," +
                $"\"p99\":{F(P(0.99f))},\"max\":{F(j[j.Count - 1])},\"yli15x\":{yli}" + "}";
        }

        static string F(float x) => x.ToString("0.##", CultureInfo.InvariantCulture);
    }
}
