// PALAUTEKANAVA (Natiivi-UI): webin js/ehdotukset.js:n lähetysosa (postita, tarkistaPro,
// pro-tunnus laitteen muistissa) natiivina. Lomakkeet: PalauteLomake.cs, Kuvavinkki.cs, ProOsio.cs.
//
// Sama worker kuin webissä (EHDOTUS_OSOITE), samat reitit ja kentät:
//   POST /laheta        ehdotus ja pro-materiaali   multipart/form-data (webin FormData)
//   POST /kuvavinkki    kuvavinkki ja kuvapalaute   multipart/form-data
//   POST /pro-profiili  pro-tuottajan tekijäsivu    multipart/form-data
//   POST /pro-tarkista  pro-kirjautuminen           JSON {sahkoposti, koodi}
// Vastaus on JSON; virheessä {virhe: "…"} suomeksi, ja se näytetään pelaajalle kuten webissä
// (postita: data.virhe ?? "HTTP n"). Tyhjät kentät jätetään pois: worker lukee puuttuvan
// kentän tyhjänä (kasittelija.js kentta), ja Unityn multipart-osa ei salli tyhjää arvoa.
//
// TUNNISTUS: natiivi ei lähetä Originia; se kertoo itsensä kuten pulun chat (PuluChat.Pyynto,
// pollo-worker #2956): x-matkakirja-natiivi = bundle id ja sama tunniste User-Agentissa.
// Ehdotusworker tarkistaa 24.9.2026 vain Originin (kasittelija.js sallittuOrigin: /laheta,
// /kuvavinkki, /pro-tarkista, /pro-profiili), joten natiivin kirjoitus saa 403 "Origin ei ole
// sallittu", kunnes workeriin tulee pollo-workerin sallittuNatiivi-portti. 403 näytetään
// omana lauseenaan (EiNatiivissa), ei englanninkielisenä origin-viestinä.
//
// KUVAT: webissä <input type=file> ja canvas-pienennys (skaalaaEhdotusKuva). Natiivissa kuvat
// valitsee iOS-liitännäinen (Kuvanvalitsin), joka palauttaa jpeg-tavut valmiiksi pienennettyinä.
// Pelikoodarin Scripts/Peli/Kuvanvalitsin.cs asettaa sen iOS-laitteella; muualla null, ja kuvanappi kertoo sen.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    /// <summary>Lähetettävä kuva: tavut, tiedostonimi ja tyyppi (jpeg, png, webp tai heic).</summary>
    public sealed class Liitekuva
    {
        public byte[] Tavut;
        public string Nimi = "kuva.jpg";
        public string Tyyppi = "image/jpeg";
    }

    public static class Palautekanava
    {
        public const string Osoite = "https://matkakirja-ehdotukset.samireivinen.workers.dev";

        /// <summary>Kuvia enintään (EHDOTUS_KUVIA, sama raja kuin workerissa).</summary>
        public const int Kuvia = 3;
        /// <summary>Pisin sivu pikseleinä: ehdotus, kuvavinkki, pro-materiaali ja pro-omakuva.</summary>
        public const int EhdotuksenSivu = 2048, KuvavinkinSivu = 2400, ProMateriaalinSivu = 2000, ProKuvanSivu = 1024;

        const string ProAvain = "matkakirja-pro-tunnus";
        public const string EiNatiivissa = "Lähetys ei vielä ole auki tässä sovelluksessa.";

        /// <summary>
        /// Kuvanvalitsin: (enintään, pisin sivu px, valmis). valmis(null tai tyhjä) = peruttu.
        /// Kutsu voi palata mistä säikeestä tahansa. KYTKENTÄ (yksi rivi): iOS-liitännäinen asettaa
        /// tämän käynnistyksessä (rajapintatoive Pelikoodarille, Assets/Plugins/iOS/).
        /// </summary>
        public static Action<int, int, Action<List<Liitekuva>>> Kuvanvalitsin = null;

        public sealed class Tulos
        {
            public bool Ok;
            public long Status;
            public Dictionary<string, object> Data;
            /// <summary>Workerin oma virheteksti tai "HTTP n" (webin postita).</summary>
            public string Virhe;
            /// <summary>Yhteyttä ei saatu (webin TypeError / Failed to fetch).</summary>
            public bool Verkoton;
            /// <summary>403: worker ei vielä päästä natiivia läpi.</summary>
            public bool Estetty;

            /// <summary>Virheen syy pelaajan kielellä ilman etuliitettä.</summary>
            public string Syy => Estetty ? null : Verkoton ? "yhteyttä ei saatu" : Virhe;
        }

        /// <summary>
        /// Webin lahetysvirheViesti (kuvavinkki) ja ehdotusosion virhe: "Lähetys ei onnistunut: syy.
        /// Kokeile hetken päästä uudelleen." Pro-lähetykset ilman kehotusta (kokeile = false).
        /// </summary>
        public static string Virheviesti(Tulos t, bool kokeile = true)
        {
            if (t.Estetty) return EiNatiivissa;
            return "Lähetys ei onnistunut: " + t.Syy + (kokeile ? ". Kokeile hetken päästä uudelleen." : "");
        }

        // --- lähetys ---------------------------------------------------------------------

        /// <summary>Lomake workerille (webin postita): kentät järjestyksessä, samanniminen voi toistua.</summary>
        public static void Postita(string polku, IList<(string Nimi, string Arvo)> kentat, IList<(string Nimi, Liitekuva Kuva)> kuvat, Action<Tulos> valmis)
            => UiKerros.Hae().StartCoroutine(PostitaAjo(polku, kentat, kuvat, valmis));

        static IEnumerator PostitaAjo(string polku, IList<(string Nimi, string Arvo)> kentat, IList<(string Nimi, Liitekuva Kuva)> kuvat, Action<Tulos> valmis)
        {
            var osat = new List<IMultipartFormSection>();
            if (kentat != null)
                foreach (var (nimi, arvo) in kentat)
                    if (!string.IsNullOrEmpty(arvo)) osat.Add(new MultipartFormDataSection(nimi, arvo));
            if (kuvat != null)
                foreach (var (nimi, kuva) in kuvat)
                    if (kuva?.Tavut != null && kuva.Tavut.Length > 0)
                        osat.Add(new MultipartFormFileSection(nimi, kuva.Tavut, kuva.Nimi ?? "kuva.jpg", kuva.Tyyppi ?? "image/jpeg"));
            if (osat.Count == 0)
            {
                valmis?.Invoke(new Tulos { Virhe = "lähetys on tyhjä" });
                yield break;
            }
            using (var r = UnityWebRequest.Post(Osoite + polku, osat))
            {
                r.timeout = 90;
                Tunnisteet(r);
                yield return r.SendWebRequest();
                valmis?.Invoke(Lue(r));
            }
        }

        /// <summary>Webin tarkistaPro: sähköposti + koodi → { ok, nimi, tekijaId, tila, profiili, kommentti }.</summary>
        public static void TarkistaPro(string sahkoposti, string koodi, Action<Tulos> valmis)
        {
            string runko = "{\"sahkoposti\":" + PeliApu.Json(sahkoposti ?? "") + ",\"koodi\":" + PeliApu.Json(koodi ?? "") + "}";
            UiKerros.Hae().StartCoroutine(JsonAjo("/pro-tarkista", runko, valmis));
        }

        static IEnumerator JsonAjo(string polku, string runko, Action<Tulos> valmis)
        {
            using (var r = new UnityWebRequest(Osoite + polku, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = 30,
            })
            {
                r.SetRequestHeader("Content-Type", "application/json");
                Tunnisteet(r);
                yield return r.SendWebRequest();
                valmis?.Invoke(Lue(r));
            }
        }

        static void Tunnisteet(UnityWebRequest r)
        {
            r.SetRequestHeader("Accept", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
        }

        static Tulos Lue(UnityWebRequest r)
        {
            var t = new Tulos { Status = r.responseCode };
            try
            {
                var s = r.downloadHandler?.text;
                if (!string.IsNullOrEmpty(s)) t.Data = MiniJson.Jasenna(s) as Dictionary<string, object>;
            }
            catch (FormatException) { /* tyhjä tai ei-JSON-runko */ }
            if (r.responseCode == 0 || r.result == UnityWebRequest.Result.ConnectionError)
            {
                t.Verkoton = true;
                t.Virhe = r.error;
                Debug.LogWarning("MATKAKIRJA palautekanava: yhteys ei auennut: " + r.error);
                return t;
            }
            if (r.responseCode >= 200 && r.responseCode < 300)
            {
                t.Ok = true;
                return t;
            }
            t.Virhe = MiniJson.Teksti(t.Data, "virhe") ?? "HTTP " + r.responseCode;
            t.Estetty = r.responseCode == 403;
            Debug.LogWarning("MATKAKIRJA palautekanava: " + r.url + " → " + r.responseCode + " " + t.Virhe);
            return t;
        }

        // --- pro-tunnus laitteen muistissa (webin PRO_TALLE) ---------------------------------

        /// <summary>Tuottajan tunnuspari muistista tai null.</summary>
        public static (string Sahkoposti, string Koodi)? ProTunnus()
        {
            string s = PlayerPrefs.GetString(ProAvain, "");
            if (s.Length == 0) return null;
            try
            {
                var o = MiniJson.Jasenna(s) as Dictionary<string, object>;
                string posti = MiniJson.Teksti(o, "sahkoposti"), koodi = MiniJson.Teksti(o, "koodi");
                if (!string.IsNullOrEmpty(posti) && !string.IsNullOrEmpty(koodi)) return (posti, koodi);
            }
            catch (FormatException) { }
            return null;
        }

        /// <summary>Pari talteen; tyhjä arvo unohtaa sen (webin asetaProTunnus).</summary>
        public static void AsetaProTunnus(string sahkoposti, string koodi)
        {
            if (!string.IsNullOrEmpty(sahkoposti) && !string.IsNullOrEmpty(koodi))
                PlayerPrefs.SetString(ProAvain, "{\"sahkoposti\":" + PeliApu.Json(sahkoposti) + ",\"koodi\":" + PeliApu.Json(koodi) + "}");
            else PlayerPrefs.DeleteKey(ProAvain);
            PlayerPrefs.Save();
        }
    }
}
