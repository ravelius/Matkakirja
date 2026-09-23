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
        /// Pöllön tuomio vapaasta sähkevastauksesta (web kysySahketuomio): POST pollo-workeriin
        /// {tehtava:"sahke", id, vastaus} → {kohde: bool, vuosi: bool}; aukon tunnus → osui. valmis(null) =
        /// pöllöä ei tavoitettu (verkko, 10 s aikakatkaisu, kelvoton vastaus) eikä ohilyöntiä lasketa.
        /// Natiivi tunnistautuu kuten puhe ja chat (x-matkakirja-natiivi; workerin natiiviportti, PR #2985).
        /// </summary>
        public static void Tuomio(string tehtavaId, string teksti, Action<System.Collections.Generic.Dictionary<string, bool>> valmis)
        {
            if (string.IsNullOrEmpty(tehtavaId)) { valmis?.Invoke(null); return; }
            UnityWebRequest r;
            try
            {
                var runko = SahkeTeksti.JsonOlio(("tehtava", "sahke"), ("id", tehtavaId), ("vastaus", teksti ?? ""));
                r = new UnityWebRequest(Puhe.Puhepalvelin, "POST")
                {
                    downloadHandler = new DownloadHandlerBuffer(),
                    uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                    timeout = SahkeTulkinta.TulkintaMs / 1000,
                };
                r.SetRequestHeader("Content-Type", "application/json");
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            }
            catch (Exception e) { Debug.LogWarning("Sähketuomio ei lähtenyt: " + e.Message); valmis?.Invoke(null); return; }
            try
            {
                r.SendWebRequest().completed += _ =>
                {
                    System.Collections.Generic.Dictionary<string, bool> tulos = null;
                    try
                    {
                        if (r.result == UnityWebRequest.Result.Success
                            && Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text) is System.Collections.Generic.Dictionary<string, object> d
                            && d.TryGetValue("kohde", out var k) && k is bool kb && d.TryGetValue("vuosi", out var v) && v is bool vb)
                            tulos = new System.Collections.Generic.Dictionary<string, bool> { ["kohde"] = kb, ["vuosi"] = vb };
                    }
                    catch (Exception) { tulos = null; }
                    finally { r.Dispose(); }
                    valmis?.Invoke(tulos);
                };
            }
            catch (Exception e) { Debug.LogWarning("Sähketuomio kaatui: " + e.Message); r.Dispose(); valmis?.Invoke(null); }
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
