// SÄHKEWORKERIN KULJETUS (web sahkeKutsu, js/sahke.js kohta 7): ISahkeYhteys UnityWebRequestillä.
// UnityWebRequest ei tarvitse CORSia. Takaisinkutsumalli: SendWebRequest().completed kutsuu valmis-
// käsittelijää pääsäikeessä, joten coroutinea eikä MonoBehaviouria ei tarvita.
//
// Aikakatkaisu 12 s (SahkeVakiot.AikakatkoS). Verkkovirhe, aikakatkaisu ja kaatunut pyyntö ovat
// SahkeVastaus.Tila = 0: hiljainen ei-mitään, ei poikkeusta pelille. HTTP-virhe (4xx/5xx) palautetaan
// tilana ja runkona (worker kertoo syyn kentässä "virhe").
//
// ORIGIN-PORTTI: worker/sahke/kasittelija.js päästää vain pelin selainoriginit (403 "Origin ei ole
// sallittu" muille, myös ilman Origin-otsaketta). UnityWebRequest ei voi asettaa Origin-otsaketta, joten
// natiivi tunnistautuu samalla otsakkeella kuin Livian chat (UI/Pulu/PuluChat.cs): x-matkakirja-natiivi.
// Workeriin tarvitaan natiiviportti (Julkaisija/worker); siihen asti Sahkepinta.Kaynnista näkee 403:n ja
// pitää sähkepinnan kiinni, eikä peli muutu mitenkään.
using System;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SahkeYhteys : ISahkeYhteys
    {
        /// <summary>Workerin juuri; oletus SahkeVakiot.Osoite (testikomento voi ohjata muualle).</summary>
        public string Osoite = SahkeVakiot.Osoite;

        public void Kutsu(string metodi, string polku, string runko, Action<SahkeVastaus> valmis)
        {
            if (string.IsNullOrEmpty(Osoite)) { valmis?.Invoke(SahkeVastaus.Katkos()); return; }
            UnityWebRequest r;
            try
            {
                r = new UnityWebRequest(Osoite + (polku ?? ""), metodi ?? "GET")
                {
                    downloadHandler = new DownloadHandlerBuffer(),
                    timeout = SahkeVakiot.AikakatkoS,
                };
                if (runko != null)
                {
                    r.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" };
                    r.SetRequestHeader("Content-Type", "application/json");
                }
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            }
            catch (Exception e)
            {
                Debug.LogWarning("Sähkepyyntö ei lähtenyt: " + e.Message);
                valmis?.Invoke(SahkeVastaus.Katkos());
                return;
            }

            try
            {
                r.SendWebRequest().completed += _ =>
                {
                    SahkeVastaus v;
                    try
                    {
                        // Verkkovirhe ja aikakatkaisu = Tila 0; HTTP-virhe kulkee tilana ja runkona.
                        v = r.result == UnityWebRequest.Result.ConnectionError || r.responseCode == 0
                            ? SahkeVastaus.Katkos()
                            : SahkeVastaus.Jasenna((int)r.responseCode, r.downloadHandler?.text);
                    }
                    catch (Exception) { v = SahkeVastaus.Katkos(); }
                    finally { r.Dispose(); }
                    valmis?.Invoke(v);
                };
            }
            catch (Exception e)
            {
                Debug.LogWarning("Sähkepyyntö kaatui: " + e.Message);
                r.Dispose();
                valmis?.Invoke(SahkeVastaus.Katkos());
            }
        }

        /// <summary>
        /// Laitteen muisti (web localStorage): PlayerPrefs. Arvo null poistaa avaimen.
        /// Käyttö: new Sahkepinta(new SahkeYhteys(), SahkeYhteys.Lue, SahkeYhteys.Kirjoita).
        /// </summary>
        public static string Lue(string avain) => PlayerPrefs.HasKey(avain) ? PlayerPrefs.GetString(avain) : null;

        public static void Kirjoita(string avain, string arvo)
        {
            if (arvo == null) PlayerPrefs.DeleteKey(avain);
            else PlayerPrefs.SetString(avain, arvo);
            PlayerPrefs.Save();
        }
    }
}
