// LINSSIEN SISÄLTÖ sisältöpaketista: moduulit/js/linssit/*.json ja kokoelmat.
// Kartan Sisalto.HaeTeksti hakee vain kokoelmat/-kansiosta, joten moduulit
// haetaan tässä samalla kaavalla (uusin.json → versiopolku → tiedosto,
// välimuisti persistentDataPath/sisalto/<polku>). Sama välimuisti ja
// viimeisin.txt kuin Sisalto.cs:llä, joten offline-käynnistys toimii kummallekin.
// Koekansio Documents/sisalto-koe/<polku> luetaan ensin (sama kuin Sisalto.HaePaketista).
using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class LinssiSisalto
    {
        [Serializable] class Osoitin { public string polku; }

        static string versioPolku;
        static bool haussa;

        static string Valimuisti(string polku) =>
            Path.Combine(Application.persistentDataPath, "sisalto", polku.Replace('/', Path.DirectorySeparatorChar));

        /// <summary>Hakee paketin tiedoston tekstinä (polku versiokansion alta, esim. "moduulit/js/linssit/satelliitti-data.json").</summary>
        public static IEnumerator Hae(string polku, Action<string> valmis)
        {
            // Koekansio ensin (Natiivisepän Sisalto 705fc50): Documents/sisalto-koe/<polku>
            // on versiosta riippumaton, joten osoittimen vaihtuminen ei riko laitekokeita.
            string koe = Path.Combine(Application.persistentDataPath, "sisalto-koe", polku.Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(koe)) { valmis(File.ReadAllText(koe)); yield break; }
            // Verkko-odotus vain, kun linssi on auki (pelaaja odottaa aineistoa); käynnistyksen taustarekisteröinti
            // (esim. LataaAstronautti) kirjautuu vain hakuna.
            if (LinssiOhjain.Rekisteri?.Auki == null) { yield return HaeSisalto(polku, valmis); yield break; }
            var odotus = VerkkoOdotus.Alku("linssi", polku);
            string saatu = null;
            yield return HaeSisalto(polku, t => saatu = t);
            VerkkoOdotus.Loppu(odotus, saatu == null ? "ei saatu" : null);
            valmis(saatu);
        }

        static IEnumerator HaeSisalto(string polku, Action<string> valmis)
        {
            while (haussa) yield return null;
            if (versioPolku == null)
            {
                haussa = true;
                using (var p = UnityWebRequest.Get(Sisalto.Osoitin))
                {
                    p.timeout = 10;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success)
                        versioPolku = JsonUtility.FromJson<Osoitin>(p.downloadHandler.text).polku;
                    else
                    {
                        string viimeisin = Path.Combine(Application.persistentDataPath, "sisalto", "viimeisin.txt");
                        if (File.Exists(viimeisin)) versioPolku = File.ReadAllText(viimeisin).Trim();
                    }
                }
                haussa = false;
            }
            if (versioPolku == null) { valmis(null); yield break; }
            string koko = versioPolku + polku;
            string tiedosto = Valimuisti(koko);
            if (File.Exists(tiedosto)) { valmis(File.ReadAllText(tiedosto)); yield break; }
            using var k = UnityWebRequest.Get(Sisalto.Juuri + koko);
            k.timeout = 20;
            float hakuAlku = Time.realtimeSinceStartup;
            yield return k.SendWebRequest();
            VerkkoOdotus.Haku("linssi", (Time.realtimeSinceStartup - hakuAlku) * 1000.0, (long)k.downloadedBytes);
            if (k.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning($"MATKAKIRJA linssit: {koko} epäonnistui: {k.error}");
                valmis(null);
                yield break;
            }
            Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
            File.WriteAllText(tiedosto, k.downloadHandler.text);
            valmis(k.downloadHandler.text);
        }

        /// <summary>
        /// Striimattu linssiaineisto paketin ulkopuolelta (esim. GPL-3.0-rajat 1873, jotka eivät saa
        /// olla binaarissa eivätkä paketissa). Koekansio Documents/sisalto-koe/virta/&lt;nimi&gt; ensin,
        /// sitten välimuisti persistentDataPath/virta/&lt;nimi&gt; (offline), sitten osoite.
        /// </summary>
        public static IEnumerator HaeVirrasta(string osoite, string nimi, Action<string> valmis)
        {
            string koe = Path.Combine(Application.persistentDataPath, "sisalto-koe", "virta", nimi);
            if (File.Exists(koe)) { valmis(File.ReadAllText(koe)); yield break; }
            string tiedosto = Path.Combine(Application.persistentDataPath, "virta", nimi);
            if (File.Exists(tiedosto)) { valmis(File.ReadAllText(tiedosto)); yield break; }
            using var k = UnityWebRequest.Get(osoite);
            k.timeout = 20;
            yield return k.SendWebRequest();
            if (k.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning($"MATKAKIRJA linssit: {osoite} epäonnistui: {k.error}");
                valmis(null);
                yield break;
            }
            Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
            File.WriteAllText(tiedosto, k.downloadHandler.text);
            valmis(k.downloadHandler.text);
        }
    }
}
