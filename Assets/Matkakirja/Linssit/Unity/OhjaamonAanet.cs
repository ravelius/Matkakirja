// ISS-OHJAAMON ÄÄNET (omistaja 4.10.2026 "ISS-OHJAAMO UUSIKSI"; Sisältökirjurin aidot CC0-äänitteet, ei generointia, LAHTEET.md
// paketissa): kaasuvivun pykälän naksahdus (AstronauttiLinssi.KaasuTehoste "iss-kaasu") ja kameran laukaisin ("iss-kamera-laukaisin")
// WAV:eina ämpäristä omiksi tehosteiksi (Aanet.RekisteroiTehoste; isku 0 ms:ssä, huippu −6 dBFS). Joystickin suhinasilmukka soi
// AstronauttiLinssi.SuhinaUrl-osoitteesta linssin silmukkana. Ladataan kerran (LinssiOhjain.LataaAstronautti).
using System.Collections;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class OhjaamonAanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/cupola/ohjaamo/v1/";
        public const string Laukaisin = "iss-kamera-laukaisin";
        static bool ladattu;

        public static IEnumerator Lataa()
        {
            if (ladattu) yield break;
            ladattu = true;
            yield return Hae(Juuri + "iss-kaasu-naksahdus.wav", AstronauttiLinssi.KaasuTehoste);
            yield return Hae(Juuri + "iss-kamera-laukaisin.wav", Laukaisin);
        }

        static IEnumerator Hae(string url, string nimi)
        {
            using var q = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.WAV);
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA linssit: ohjaamon ääni {nimi}: {q.error}"); ladattu = false; yield break; }
            var klippi = DownloadHandlerAudioClip.GetContent(q);
            if (klippi == null) yield break;
            klippi.name = nimi;
            // Gain kuten muut käyttöliittymän omat tehosteet (Aanet.RekisteroiTehoste oletus 0,35); taso tulee äänitteestä (−6 dBFS).
            Aanet.RekisteroiTehoste(nimi, klippi);
            Debug.Log($"MATKAKIRJA linssit: ohjaamon ääni {nimi} {klippi.length:0.00} s");
        }
    }
}
