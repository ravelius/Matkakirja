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

        void Update()
        {
            float ms = Time.unscaledDeltaTime * 1000f;
            if (Time.frameCount > 5)
                (pallo == null ? lepo : pallo.Peitetty ? peitto : pallo.Liikkeessa ? liike : lepo).Add(ms);
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
                $"\"liike\":{Tilasto(liike)},\"lepo\":{Tilasto(lepo)},\"peitto\":{Tilasto(peitto)}" + "}";
            if (polku != null) File.AppendAllText(polku, rivi + "\n");
            Debug.Log("MATKAKIRJA kehysajat " + rivi);
            liike.Clear();
            lepo.Clear();
            peitto.Clear();
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
