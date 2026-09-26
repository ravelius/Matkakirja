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
    /// </summary>
    public static class Mukana
    {
        static Dictionary<string, string> tiedostot;

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
            return tiedostot.TryGetValue(nimi, out var polku) ? polku : null;
        }
    }
}
