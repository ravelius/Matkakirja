// LINSSIEN SISÄLTÖ sisältöpaketista: moduulit/js/linssit/*.json ja kokoelmat, Sisalto.HaePaketista-funktiolla (yhteinen
// haku, välimuisti, versio ja koekansio kartan kanssa). Verkko-odotus mitataan vain, kun linssi on auki.
using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class LinssiSisalto
    {

        static string versioPolku;

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

        /// <summary>
        /// Paketin tiedosto Sisalto.HaePaketista-funktiolla (Pelikoodarin yhteinen haku, build 19): sama polku rinnakkain
        /// haetaan kerran, ja välimuisti, versio ja koekansio ovat yhteiset kartan kanssa (ennen maarajat.json, maat.json ja
        /// radiot.json tulivat kahdesti, Pelikoodarin käynnistysanalyysi 26.9.2026).
        /// </summary>
        static IEnumerator HaeSisalto(string polku, Action<string> valmis)
        {
            string teksti = null;
            yield return Sisalto.HaePaketista(polku, t => teksti = t, true);
            if (teksti == null) Debug.LogWarning($"MATKAKIRJA linssit: {polku} ei saatu");
            valmis(teksti);
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
