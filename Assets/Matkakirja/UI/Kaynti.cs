// NIMETÖN KÄVIJÄLASKURI, natiivin puoli (Pelikoodari 30.9.2026, omistajan pyyntö; web js/kaynti.js, worker
// tools/pollo/kaynnit.js): kerran käynnistyksessä 'avaus'-ping Pöllö-workerille ja apurahan kortin avaus sekä
// esittelylinssit omina tapahtumina. Worker laskee päivän eri kävijät tiivisteenä SHA-256(IP + päivän suola);
// IP-osoitteita ei tallenneta.
//
// Ei lähetetä: editori ja simulaattori (SIMULATOR_DEVICE_NAME-ympäristömuuttuja: testiajot ja kuvaukset).
// Omistajan laite lähettää omistaja: true (vain Pöllön kehittäjäkoodi Keychainissa tai PlayerPrefs-merkki
// matkakirja-omistaja, ui omistaja 1), jolloin worker ei laske sitä. Ping ei koskaan kaada eikä odota mitään.
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class Kaynti
    {
        public const string Tekijatietorivi = "Peli laskee nimettömiä käyntikertoja; IP-osoitteita ei tallenneta.";
        public const string OmistajaAvain = "matkakirja-omistaja";
        static readonly HashSet<string> lahetetyt = new HashSet<string>();

        /// <summary>Simulaattori tai editori: ei lähetetä (testiajot eivät ole kävijöitä).</summary>
        public static bool Testiymparisto =>
            Application.isEditor || !string.IsNullOrEmpty(System.Environment.GetEnvironmentVariable("SIMULATOR_DEVICE_NAME"));

        /// <summary>
        /// VAIN eksplisiittiset merkit (Päätoimittaja 30.9.2026): ui omistaja 1 tai Pöllön kehittäjäkoodi Keychainissa.
        /// Kehittäjätila, linssien kehittäjätila ja esittelylinssit EIVÄT ole omistajan tunniste: arvioijien TF:ssä ne voivat
        /// olla päällä, ja silloin laskuri näyttäisi nollaa juuri kun sitä tarvitaan.
        /// </summary>
        public static bool Omistaja =>
            PlayerPrefs.GetInt(OmistajaAvain, 0) == 1 || !string.IsNullOrEmpty(Asetukset.PolloKoodi);

        /// <summary>Lähettää tapahtuman (avaus | apuraha | esittelylinssit) kerran käynnistyksessä.</summary>
        public static void Laheta(string tapahtuma)
        {
            try
            {
                if (Testiymparisto || !lahetetyt.Add(tapahtuma)) return;
                var ui = UiKerros.Hae();
                if (ui == null) return;
                ui.StartCoroutine(Laheta(tapahtuma, Omistaja));
            }
            catch (System.Exception e) { Debug.Log("MATKAKIRJA kaynti: ohitettiin (" + e.Message + ")"); }
        }

        public static string Runko(string tapahtuma, bool omistaja) =>
            "{\"tehtava\":\"kaynti\",\"alusta\":\"ios\",\"versio\":\"" + Application.version
            + "\",\"tapahtuma\":\"" + tapahtuma + "\",\"omistaja\":" + (omistaja ? "true" : "false") + "}";

        /// <summary>Testi (ui kaynti [tapahtuma]): mitä lähtisi ja lähtisikö, ilman lähetystä.</summary>
        public static string Kuivaharjoitus(string tapahtuma) =>
            $"{Runko(tapahtuma, Omistaja)} lähtisi {(!Testiymparisto && !lahetetyt.Contains(tapahtuma))} "
            + $"(testiympäristö {Testiymparisto}, jo lähetetty {lahetetyt.Contains(tapahtuma)}, omistaja {Omistaja})";

        static IEnumerator Laheta(string tapahtuma, bool omistaja)
        {
            string runko = Runko(tapahtuma, omistaja);
            using var r = new UnityWebRequest(PuluChat.Palvelin, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = 15,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            yield return r.SendWebRequest();
            Debug.Log($"MATKAKIRJA kaynti: {tapahtuma} omistaja {omistaja} → {(r.result == UnityWebRequest.Result.Success ? "ok" : r.error)}");
        }
    }
}
