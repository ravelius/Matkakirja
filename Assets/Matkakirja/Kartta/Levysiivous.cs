using System;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LEVYN VÄLIMUISTIN SIIVOUS (Raamattu ESILATAUSPOLITIIKKA, MEKANISMI: "siivous vanhimmasta yli 2 Gt:ssa"; Esilataaja
    /// erä 4, Pelikoodari). Välimuistit ovat persistentDataPathin kansioissa <see cref="Kansiot"/> (kuvat osoitteella, puheet
    /// ja äänet osoitteella, sisältöpaketti versiolla, linssien virrat). Laattojen välimuisti (temporaryCachePath/laatat,
    /// Laattapalvelin karsii itse 600 Mt:iin) lasketaan yhteissummaan mutta sitä ei poisteta täältä. Offline-alueet,
    /// tallennus, maamerkit ja Documentsin lokit eivät kuulu välimuistiin.
    /// Kun yhteensä yli <see cref="RajaMt"/>, poistetaan vanhimmasta (viimeisin käyttö tai kirjoitus) kunnes summa on
    /// 90 %:ssa rajasta. Ajetaan taustasäikeessä 20 s käynnistyksestä ja komennolla `levy`.
    /// </summary>
    public static class Levysiivous
    {
        public const int RajaMt = 2048;
        public static readonly string[] Kansiot = { "kuvat", "aani", "aanet", "sisalto", "virta" };

        public static string Viimeisin { get; private set; } = "ei ajettu";
        static bool kaynnissa;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Viimeisin = "ei ajettu"; kaynnissa = false; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Ajasta()
        {
            var go = new GameObject("Levysiivous");
            UnityEngine.Object.DontDestroyOnLoad(go);
            go.AddComponent<Ajastin>();
        }

        sealed class Ajastin : MonoBehaviour
        {
            float alku;
            void Start() => alku = Time.realtimeSinceStartup;
            void Update()
            {
                if (Time.realtimeSinceStartup - alku < 20f) return;
                Siivoa(RajaMt);
                Destroy(gameObject);
            }
        }

        /// <summary>Käynnistää siivouksen taustalla (pääsäikeestä: polut luetaan täällä). Palauttaa heti.</summary>
        public static void Siivoa(int rajaMt)
        {
            if (kaynnissa) return;
            kaynnissa = true;
            string juuri = Application.persistentDataPath;
            string laatat = Path.Combine(Application.temporaryCachePath, "laatat");
            Task.Run(() =>
            {
                try { Viimeisin = LevyKarsinta.Aja(juuri, Kansiot, laatat, (long)rajaMt * 1048576); }
                catch (Exception e) { Viimeisin = "virhe " + e.Message; }
                finally { kaynnissa = false; }
                Debug.Log("MATKAKIRJA levy: " + Viimeisin);
            });
        }

    }
}
