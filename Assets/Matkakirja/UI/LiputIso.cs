// ISOT LIPUT (terävyys, Päätoimittaja 8.10.2026; Julkaisija 9.10.: liput-1024/ 178 lippua 1024 px + luettelo.json): iso lippuikkuna
// ja visan lippukysymys näytetään ~330 pt leveinä, joten 320 px:n liput/ oli pehmeä (iPhone 3×, iPad 2×). Luettelo kertoo,
// mitkä on 1024 px:nä (ei kokeilua eikä CDN:n välimuistiin jäävää 404:ää); muut (esim. Miranda do Douro, alkuperä 221 px)
// liput/:sta kuten ennen. Luettelo haetaan kerran ja muistetaan (PlayerPrefs), joten se toimii myös ilman verkkoa.
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class LiputIso
    {
        public const string Kansio1024 = "liput-1024", KansioPerus = "liput";
        const string Osoite = Kuvat.PeiliJuuri + Kansio1024 + "/luettelo.json", Muisti = "liput1024.luettelo";
        static HashSet<string> luettelo;
        static bool haettu;

        /// <summary>Lataa luettelon (muistista heti, verkosta taustalla); kutsu kerran käynnistyksessä.</summary>
        public static void Lataa()
        {
            if (haettu) return;
            haettu = true;
            luettelo = Jasenna(PlayerPrefs.GetString(Muisti, ""));
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            using var r = UnityWebRequest.Get(Osoite);
            r.timeout = 15;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log("MATKAKIRJA liput-1024: luettelo ei latautunut (" + r.error + ")"); yield break; }
            var l = Jasenna(r.downloadHandler.text);
            if (l == null) yield break;
            luettelo = l;
            PlayerPrefs.SetString(Muisti, r.downloadHandler.text);
            Debug.Log("MATKAKIRJA liput-1024: " + l.Count + " lippua");
        }

        static HashSet<string> Jasenna(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try
            {
                var lista = MiniJson.Jasenna(json) as List<object>;
                if (lista == null) return null;
                var s = new HashSet<string>(System.StringComparer.Ordinal);
                foreach (var o in lista) if (o is string n && n.Length > 0) s.Add(n);
                return s;
            }
            catch { return null; }
        }

        static bool On(string nimi) => luettelo != null && nimi != null && luettelo.Contains(nimi);

        /// <summary>Peilin kansio lipputiedostolle (Commons-nimi): liput-1024, jos se on luettelossa, muuten liput.</summary>
        public static string Kansio(string tiedosto)
        {
            if (string.IsNullOrEmpty(tiedosto) || tiedosto.Contains("/")) return KansioPerus;
            string polku = Kuvat.PeiliKuvaPolku(tiedosto, KansioPerus);
            return On(polku.Substring(KansioPerus.Length + 1)) ? Kansio1024 : KansioPerus;
        }

        /// <summary>Peilin liput/-osoite isoksi, jos 1024-versio on luettelossa; muut osoitteet sellaisinaan.</summary>
        public static string Url(string url)
        {
            string alku = Kuvat.PeiliJuuri + KansioPerus + "/";
            if (string.IsNullOrEmpty(url) || !url.StartsWith(alku, System.StringComparison.Ordinal)) return url;
            string nimi = url.Substring(alku.Length);
            return On(nimi) ? Kuvat.PeiliJuuri + Kansio1024 + "/" + nimi : url;
        }
    }
}
