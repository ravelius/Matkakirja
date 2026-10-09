// ISOT KUVAT SUURENNOKSEEN (terävyys, Päätoimittaja 8.10.2026; Julkaisija 9.10.: kuvat-2048/ 9 308 kuvaa, pitkä sivu 2048 px, vain ne,
// joiden Commons-alkuperäinen on vähintään 2048 px): koko ruudun kuvasuurennos on iPadilla 1640–2360 px, joten 1200 px:n kuvat/ oli
// pehmeä. Luettelo (kuvat-2048/luettelo.json {versio, pitka_sivu, maara, kuvat:[nimet]}) kertoo, mitkä ovat isoina, joten 404:ää ei
// kokeilla (CDN välimuistittaa sen). Muut kuvat kuvat/:sta kuten ennen. Luettelo (~400 kt) haetaan kerran ja tallennetaan laitteelle,
// joten se toimii myös ilman verkkoa. Vain suurennos käyttää isoja: muut pinnat ovat pienempiä kuin 1200 px:n kuva.
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class KuvatIso
    {
        public const string Kansio2048 = "kuvat-2048", KansioPerus = "kuvat";
        const string Osoite = Kuvat.PeiliJuuri + Kansio2048 + "/luettelo.json";
        static string Levy => Path.Combine(Application.persistentDataPath, "kuvat-2048-luettelo.json");
        static HashSet<string> luettelo;
        static bool haettu;

        /// <summary>Lataa luettelon (levyltä heti, verkosta taustalla); kutsu kerran käynnistyksessä.</summary>
        public static void Lataa()
        {
            if (haettu) return;
            haettu = true;
            try { if (File.Exists(Levy)) luettelo = Jasenna(File.ReadAllText(Levy)); } catch { luettelo = null; }
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            using var r = UnityWebRequest.Get(Osoite);
            r.timeout = 20;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log("MATKAKIRJA kuvat-2048: luettelo ei latautunut (" + r.error + ")"); yield break; }
            var l = Jasenna(r.downloadHandler.text);
            if (l == null) yield break;
            luettelo = l;
            try { File.WriteAllText(Levy, r.downloadHandler.text); } catch (System.Exception e) { Debug.Log("MATKAKIRJA kuvat-2048: tallennus: " + e.Message); }
            Debug.Log("MATKAKIRJA kuvat-2048: " + l.Count + " kuvaa");
        }

        static HashSet<string> Jasenna(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try
            {
                var lista = MiniJson.Kentta(MiniJson.Jasenna(json) as Dictionary<string, object>, "kuvat") as List<object>;
                if (lista == null) return null;
                var s = new HashSet<string>(System.StringComparer.Ordinal);
                foreach (var o in lista) if (o is string n && n.Length > 0) s.Add(n);
                return s;
            }
            catch { return null; }
        }

        /// <summary>
        /// Suurennoksen lähde isona: Commons-nimi tai peilin kuvat/-osoite → kuvat-2048/-osoite, jos kuva on luettelossa;
        /// muuten lähde sellaisenaan (Kuvat.Hae hoitaa tavallisen reitin).
        /// </summary>
        public static string Lahde(string lahde)
        {
            if (luettelo == null || string.IsNullOrEmpty(lahde)) return lahde;
            string alku = Kuvat.PeiliJuuri + KansioPerus + "/", nimi;
            if (lahde.StartsWith(alku, System.StringComparison.Ordinal)) nimi = lahde.Substring(alku.Length);
            else if (lahde.StartsWith("http", System.StringComparison.Ordinal) || lahde.Contains("/")) return lahde;
            else nimi = Kuvat.PeiliKuvaPolku(lahde, KansioPerus).Substring(KansioPerus.Length + 1);
            return luettelo.Contains(nimi) ? Kuvat.PeiliJuuri + Kansio2048 + "/" + nimi : lahde;
        }
    }
}
