using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// BUILDIIN MUKANA (Raamattu ESILATAUSPOLITIIKKA kohta 1, Fable 25.9.2026 löydös 118): tiedostot, jotka soivat ilman
    /// verkkoa (StreamingAssets/mukana/, lähteet LAHDE.txt). Polku(url) palauttaa mukana olevan tiedoston polun, jos
    /// osoitteen tiedostonimi (ilman kyselyä) löytyy sieltä, muuten null. Kutsujat (Puhe, Aanisoitin, Kuvat) käyttävät sitä
    /// ennen välimuistia ja verkkoa. Build 19 (Pelikoodarin kylmämittaus, kohta 1): myös PNG-kuvat — nostotyyppien
    /// kuvakkeet (merkki-*.png) ja pulun kypäräkuva — joita haettiin kylmänä verkosta jopa 1,4 s.
    /// OFFLINE-ALUEET (Fablen päätös 27.9.2026 klo 17.5x): jos tiedosto ei ole buildissa, katsotaan Offline-kartat-latauksen
    /// kansio (Alueet: maan media ja mediaKuvat samalla ämpärin polulla kuin Laattapalvelin.Tiedosto), jotta nostokuvat ja
    /// äänitteet toimivat ilman verkkoa. Ennen tätä ladattu media jäi natiivissa käyttämättä.
    /// </summary>
    public static class Mukana
    {
        static Dictionary<string, string> tiedostot;

        /// <summary>Offline-alueen tiedosto ämpärin osoitteelle (null, jos ei ladattu tai ei ämpäristä).</summary>
        public static string Offline(string url)
        {
            if (url == null || !url.StartsWith(Laattapalvelin.Ampari, System.StringComparison.Ordinal)) return null;
            try
            {
                var f = Laattapalvelin.Tiedosto(Laattapalvelin.OfflineKansio, url.Substring(Laattapalvelin.Ampari.Length));
                return File.Exists(f) ? f : null;
            }
            catch (System.Exception) { return null; }
        }

        public static string Polku(string url)
        {
            if (string.IsNullOrEmpty(url)) return null;
            if (tiedostot == null)
            {
                tiedostot = new Dictionary<string, string>();
                var kansio = Path.Combine(Application.streamingAssetsPath, "mukana");
                try
                {
                    if (Directory.Exists(kansio))
                        foreach (var malli in new[] { "*.mp3", "*.png" })
                            foreach (var f in Directory.GetFiles(kansio, malli)) tiedostot[Path.GetFileName(f)] = f;
                }
                catch (IOException) { }
                Debug.Log($"MATKAKIRJA mukana: {tiedostot.Count} tiedostoa buildissa");
            }
            int q = url.IndexOfAny(new[] { '?', '#' });
            var nimi = Path.GetFileName(q >= 0 ? url.Substring(0, q) : url);
            return tiedostot.TryGetValue(nimi, out var polku) ? polku : Offline(url);
        }
    }
}
