// NYT-RIVI (Päätoimittaja 9.10.2026, loki #4288; Linssisepän Pariisin intron kohtauslista, kohta 3 / 15,5 s): ohut rivi
// "PARIISI · nyt 17.42 · 14 °C" vasempaan alakulmaan noin 3 s:ksi ja häivytys (Nimikyltti, 200 ms), joka sitoo nykyajan intron
// "nyt"-tunnelmaan ilman kertojaa. Kellonaika on pelaajan laitteen hetki ja sää Pulun workerin GET /opas/saa (sama kuin pallon
// LIVE-laatikko, PalloSaaTiedot); jos sää puuttuu tai ei ehdi, pelkkä kellonaika. Pohja: pallon nimilappu (tk-teema-harmaa
// mk-opas-nimilappu, ilman viivaa ja nastaa), kirjasin Moderni, peitto alle 5 % ruudusta. Ei kosketuksia.
// Kutsu: NytRivi.Nayta("Pariisi", lat, lon, "pariisi") intron aikajanalta (Linssiseppä); säähaku kannattaa aloittaa etukäteen
// NytRivi.Valmistele(lat, lon, kaupunki), jotta rivi ehtii lämpötilan kanssa. Testi: ui nytrivi [kaupunki].
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class NytRivi
    {
        /// <summary>Kuinka kauan säätä odotetaan ennen pelkkää kellonaikaa (rivi ei saa myöhästyä intron tahdista).</summary>
        public const float SaanOdotusS = 1.5f;

        static Label lappu;
        static Nimikyltti kyltti;
        static string saaAvain;
        static double? lampotila;
        static bool haussa;

        static void Luo()
        {
            if (lappu != null && lappu.panel != null) return;
            var isa = UiKerros.Hae().Turva(UiKerros.Valikot);
            lappu = Rakenne.Teksti("", "tk-teema-harmaa mk-opas-nimilappu mk-opas-nimilappu--nakyy mk-opas-nimilappu--nytrivi", isa);
            lappu.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(lappu, Kirjasin.Moderni);
            lappu.style.visibility = Visibility.Hidden;
            kyltti = new Nimikyltti(lappu);
        }

        /// <summary>Säähaku etukäteen (esim. intron alussa); toistuva kutsu samalle paikalle ei hae uudelleen.</summary>
        public static void Valmistele(double lat, double lon, string kaupunki)
        {
            string avain = kaupunki ?? lat.ToString("F2", CultureInfo.InvariantCulture) + "," + lon.ToString("F2", CultureInfo.InvariantCulture);
            if (avain == saaAvain && (lampotila != null || haussa)) return;
            saaAvain = avain;
            lampotila = null;
            haussa = true;
            UiKerros.Hae().StartCoroutine(HaeSaa(lat, lon, kaupunki, avain));
        }

        static IEnumerator HaeSaa(double lat, double lon, string kaupunki, string avain)
        {
            var ic = CultureInfo.InvariantCulture;
            using var r = UnityWebRequest.Get($"{PuluChat.Palvelin}/opas/saa?lat={lat.ToString("F4", ic)}&lon={lon.ToString("F4", ic)}&kaupunki={UnityWebRequest.EscapeURL(kaupunki ?? "")}");
            r.timeout = 10;
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            yield return r.SendWebRequest();
            if (avain != saaAvain) yield break;
            haussa = false;
            var t = r.result == UnityWebRequest.Result.Success ? PalloSaaTiedot.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : null;
            lampotila = t?.LampotilaC is double c && !double.IsNaN(c) ? c : (double?)null;
            Debug.Log("MATKAKIRJA nyt-rivi: sää " + (kaupunki ?? avain) + ": " + (lampotila?.ToString("F1", ic) ?? "ei saatu (" + r.responseCode + ")"));
        }

        /// <summary>Rivin teksti: "PARIISI · nyt 17.42 · 14 °C"; ilman säätä "PARIISI · nyt 17.42".</summary>
        public static string Teksti(string nimi, DateTime aika, double? lampotilaC)
        {
            string s = (nimi ?? "").Trim().ToUpper(CultureInfo.GetCultureInfo("fi-FI")) + " · " + Kieli.T("ui.nytrivi.nyt") + " " + aika.ToString("H.mm", CultureInfo.InvariantCulture);
            if (lampotilaC is double c) s += " · " + Math.Round(c).ToString("0", CultureInfo.InvariantCulture).Replace("-", "−") + " °C";
            return s;
        }

        /// <summary>Rivi esiin noin 3 s:ksi (Nimikyltti). Odottaa säätä enintään SaanOdotusS, sitten näyttää pelkän kellonajan.</summary>
        public static void Nayta(string nimi, double lat, double lon, string kaupunki)
        {
            Valmistele(lat, lon, kaupunki);
            UiKerros.Hae().StartCoroutine(NaytaKunValmis(nimi));
        }

        static IEnumerator NaytaKunValmis(string nimi)
        {
            float raja = Time.unscaledTime + SaanOdotusS;
            while (haussa && lampotila == null && Time.unscaledTime < raja) yield return null;
            Luo();
            lappu.text = Teksti(nimi, DateTime.Now, lampotila);
            kyltti.Nayta();
            Debug.Log("MATKAKIRJA nyt-rivi: " + lappu.text);
        }

        /// <summary>Piiloon heti (intro keskeytettiin).</summary>
        public static void Piilota()
        {
            if (lappu == null) return;
            lappu.style.visibility = Visibility.Hidden;
            kyltti?.Nollaa();
        }
    }
}
