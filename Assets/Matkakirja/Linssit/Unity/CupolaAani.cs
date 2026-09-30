// CUPOLAN ÄÄNI (Pelikoodari 30.9.2026; omistaja Päätoimittajan kautta: "iss ääni hyvä, tosin siihen voisi lisätä oman
// huminan taustalle, jossa olisi matalia taajuuksia mukana vielä lisäksi ja soittaa tuota vähän hiljemmalla sen päällä").
//
// Kaksi kerrosta Cupolassa (KyydinTila.Ikkuna; AstronauttiKerros.Kyyti/Pois kutsuvat Tila-metodia):
//   humina  oma 90 s:n saumaton silmukka (matala jyrinä 30–120 Hz, pohjasävy 41 Hz yläsävelineen, tuuletinkohina ja
//           NASA:n sisätilahumina), soi jatkuvasti; väistää puhetta vain vähän.
//   radio   NASA:n aito radiosilmukka (EVA 38, 6.1.2017, 23 min, public domain; tekijätiedot "Ääni: NASA") arvotusta
//           kohdasta, sisäänhäivytys; 6 dB huminaa hiljempänä, väistää Pulun ja luennan (AaniTila.Voimassa) selvästi.
// Linssin oma humina (astro-humina) vaiennetaan Cupolan ajaksi ja palautetaan, kun kyyti jatkuu muualla.
//
// Soitto natiivin AVAudioEngine-moottorin kautta (Plugins/iOS/MatkakirjaSilmukat.mm), ei Unityn pakattuna klippinä
// (luennan hyppyongelma). Tiedostot ladataan kerran laitteen välimuistiin. Muualla kuin iOS-laitteella/simulaattorissa
// (editori) kerrokset eivät soi. Testimykistys (simulaattori) ja Äänimaisema-kytkin vaientavat myös nämä, ja sovellus
// taustalle sulkee kerrokset (paluussa uusi arvottu kohta).
using System.Collections;
using System.IO;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class CupolaAani : MonoBehaviour
    {
        public const string HuminaUrl = "https://media.matkakirja.app/aanet/cupola/v1/cupola-humina-90s.wav";
        public const string RadioUrl = "https://media.matkakirja.app/aanet/cupola/v1/cupola-radio-eva38-23min.mp3";
        public const float RadioPituusS = 1380f;
        const int Humina = 0, Radio = 1;
        /// <summary>Perustasot (humina −26 LUFS, radio −20 LUFS tiedostossa → radio 6 dB huminaa hiljempänä).</summary>
        public static float HuminaVoima = 0.9f, RadioVoima = 0.45f;
        /// <summary>Väistön kertoimet puheen aikana (AaniTila.Voimassa &lt; 1): humina vain vähän, radio selvästi.</summary>
        public static float HuminaVaisto = 0.7f, RadioVaisto = 0.15f;
        const float NousuS = 3f, LaskuS = 1.2f, VaistoS = 0.4f;

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaSilmukka_Avaa(int kerros, string polku, double alkuS, int tapa);
        [DllImport("__Internal")] static extern void MatkakirjaSilmukka_Voimakkuus(int kerros, float arvo);
        [DllImport("__Internal")] static extern void MatkakirjaSilmukka_Sulje(int kerros);
        [DllImport("__Internal")] static extern int MatkakirjaSilmukka_Tila(int kerros);
        [DllImport("__Internal")] static extern double MatkakirjaSilmukka_Aika(int kerros);
        static bool Natiivi => true;
#else
        static void MatkakirjaSilmukka_Avaa(int kerros, string polku, double alkuS, int tapa) { }
        static void MatkakirjaSilmukka_Voimakkuus(int kerros, float arvo) { }
        static void MatkakirjaSilmukka_Sulje(int kerros) { }
        static int MatkakirjaSilmukka_Tila(int kerros) => 0;
        static double MatkakirjaSilmukka_Aika(int kerros) => -1;
        static bool Natiivi => false;
#endif

        static CupolaAani instanssi;
        bool paalla, soi;
        readonly float[] taso = new float[2];
        int vuoro;
        string viimeVirhe;

        /// <summary>Cupolassa (true) vai ei (AstronauttiKerros.Kyyti: tila == Ikkuna; Pois: false).</summary>
        public static void Tila(bool cupolassa)
        {
            if (instanssi == null)
            {
                if (!cupolassa) return;
                var go = new GameObject("CupolaAani");
                DontDestroyOnLoad(go);
                instanssi = go.AddComponent<CupolaAani>();
            }
            instanssi.Aseta(cupolassa);
        }

        void Aseta(bool cupolassa)
        {
            if (cupolassa == paalla) return;
            paalla = cupolassa;
            // Linssin oma humina pois Cupolan ajaksi; takaisin vain, jos linssi jatkuu (Pois ei palauta).
            Aanisoitin.LinssiTausta(cupolassa ? null : Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Humina);
            if (cupolassa) Kaynnista(); else Lopeta();
            Debug.Log($"MATKAKIRJA cupola-aani: {(cupolassa ? "Cupolassa" : "pois")}");
        }

        /// <summary>Linssi suljettiin (AstronauttiKerros.Pois): kerrokset pois eikä linssin huminaa palauteta.</summary>
        public static void LinssiPois()
        {
            if (instanssi == null || !instanssi.paalla) return;
            instanssi.paalla = false;
            instanssi.Lopeta();
        }

        void Kaynnista()
        {
            vuoro++;
            if (!Natiivi) { viimeVirhe = "ei natiivia (editori)"; return; }
            StartCoroutine(Avaa(vuoro));
        }

        IEnumerator Avaa(int oma)
        {
            string humina = null, radio = null;
            yield return Hae(HuminaUrl, p => humina = p);
            yield return Hae(RadioUrl, p => radio = p);
            if (oma != vuoro || !paalla) yield break;
            if (humina == null || radio == null) { Debug.Log("MATKAKIRJA cupola-aani: tiedosto puuttuu: " + viimeVirhe); yield break; }
            taso[Humina] = taso[Radio] = 0f;
            MatkakirjaSilmukka_Avaa(Humina, humina, 0, 1);
            float alku = Random.Range(0f, RadioPituusS - 5f);
            MatkakirjaSilmukka_Avaa(Radio, radio, alku, 0);
            soi = true;
            Debug.Log($"MATKAKIRJA cupola-aani: soi, radio kohdasta {alku:0} s");
        }

        void Lopeta()
        {
            vuoro++;
            if (!soi) return;
            // Lyhyt lasku Updatessa, sitten sulku (LaskuS).
            StartCoroutine(Sulje(vuoro));
        }

        IEnumerator Sulje(int oma)
        {
            yield return new WaitForSeconds(LaskuS + 0.1f);
            if (oma != vuoro || paalla) yield break;
            MatkakirjaSilmukka_Sulje(Humina);
            MatkakirjaSilmukka_Sulje(Radio);
            soi = false;
        }

        IEnumerator Hae(string url, System.Action<string> valmis)
        {
            var kansio = Path.Combine(Application.persistentDataPath, "aani-cupola");
            var polku = Path.Combine(kansio, Path.GetFileName(url));
            if (File.Exists(polku) && new FileInfo(polku).Length > 1000) { valmis(polku); yield break; }
            Directory.CreateDirectory(kansio);
            var valiaikainen = polku + ".lataus";
            using var r = new UnityWebRequest(url, "GET") { downloadHandler = new DownloadHandlerFile(valiaikainen) { removeFileOnAbort = true }, timeout = 120 };
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { viimeVirhe = $"{Path.GetFileName(url)}: {r.error}"; valmis(null); yield break; }
            if (File.Exists(polku)) File.Delete(polku);
            File.Move(valiaikainen, polku);
            valmis(polku);
        }

        void OnApplicationPause(bool tauko)
        {
            if (!paalla) return;
            // Taustalla ei soiteta; paluussa uusi arvottu kohta.
            if (tauko) { vuoro++; MatkakirjaSilmukka_Sulje(Humina); MatkakirjaSilmukka_Sulje(Radio); soi = false; }
            else Kaynnista();
        }

        void Update()
        {
            if (!soi) return;
            var tila = Aanisoitin.Instanssi?.Tila;
            bool kuuluu = paalla && !TestiMykistys.Paalla && (tila?.Aanimaisema ?? true);
            float tausta = (float)(tila?.TaustanKerroin ?? 1);
            bool puhe = tila != null && tila.Voimassa < 0.999;
            float h = kuuluu ? HuminaVoima * tausta * (puhe ? HuminaVaisto : 1f) : 0f;
            float r = kuuluu ? RadioVoima * tausta * (puhe ? RadioVaisto : 1f) : 0f;
            Liu(Humina, h, puhe ? VaistoS : NousuS);
            Liu(Radio, r, puhe ? VaistoS : NousuS);
        }

        void Liu(int k, float kohde, float nousuS)
        {
            float nyt = taso[k];
            float askel = Time.unscaledDeltaTime / (kohde < nyt ? (paalla ? VaistoS : LaskuS) : nousuS);
            taso[k] = Mathf.MoveTowards(nyt, kohde, askel);
            if (!Mathf.Approximately(nyt, taso[k])) MatkakirjaSilmukka_Voimakkuus(k, taso[k]);
        }

        /// <summary>Testikomento (ui cupolaaani tila): kerrosten tila, taso ja soittokohta (etenee mykkänäkin).</summary>
        public static string Raportti()
        {
            var i = instanssi;
            if (i == null) return "cupola-aani: ei käynnistetty";
            string K(int k) => $"tila {MatkakirjaSilmukka_Tila(k)} taso {i.taso[k]:0.00} aika {MatkakirjaSilmukka_Aika(k):0.0} s";
            return $"cupola-aani: päällä {i.paalla}, soi {i.soi}, mykistys {TestiMykistys.Paalla}; humina {K(Humina)}; radio {K(Radio)}"
                + (i.viimeVirhe != null ? $"; virhe {i.viimeVirhe}" : "");
        }
    }
}
