using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Verkkopelin sisältöpaketti ämpäristä (Siirtoseppä, tools/vienti):
    /// sisalto/1/uusin.json → polku (esim. sisalto/1/v1/) → kokoelmat/*.json.
    /// Versiokansiot ovat muuttumattomia, joten haettu kokoelma tallennetaan
    /// laitteelle ja luetaan sieltä, jos verkkoa ei ole.
    /// </summary>
    public static class Sisalto
    {
        public const string Juuri = "https://media.matkakirja.app/";
        public const string Osoitin = Juuri + "sisalto/1/uusin.json";

        [Serializable]
        public class OsoitinTiedot
        {
            public int versio;
            public string polku;
            public string skeemaversio;
        }

        [Serializable]
        public class Kaupunki
        {
            public string id;
            public string nimi;
            public string maa2;
            public double lat;
            public double lon;
            public string tyyppi;
            public bool lentokentta;
            public bool aloitus;
            public bool saari;
            public string sijaintiLahde;
            /// <summary>Skeema 1.2: 0–3 (3 = pääkaupunki tai aloitus). -1 = ei paketissa.</summary>
            public int tarkeys = -1;
        }

        [Serializable]
        class Kokoelma<T>
        {
            public T[] alkiot;
        }

        static string Valimuisti(string polku) =>
            Path.Combine(Application.persistentDataPath, "sisalto", polku.Replace('/', Path.DirectorySeparatorChar));

        static string ViimeisinPolku => Path.Combine(Application.persistentDataPath, "sisalto", "viimeisin.txt");

        /// <summary>Hakee kokoelman. valmis(null) = ei verkkoa eikä välimuistia.</summary>
        public static IEnumerator Hae<T>(string kokoelma, Action<T[]> valmis)
        {
            string teksti = null;
            yield return HaeTeksti(kokoelma, t => teksti = t);
            valmis(teksti == null ? null : JsonUtility.FromJson<Kokoelma<T>>(teksti).alkiot);
        }

        /// <summary>
        /// Hakee kokoelman raakatekstinä (sisäkkäiset taulukot, kuten reittien via,
        /// luetaan MiniJsonilla). Osoitin haetaan kerran istuntoa kohden.
        /// </summary>
        public static IEnumerator HaeTeksti(string kokoelma, Action<string> valmis) => HaeTeksti(kokoelma, valmis, false);

        /// <summary>
        /// Kuten yllä; valinnainen = true: puuttuva kokoelma (404, uudempi nippu kuin
        /// julkaistu paketti) kirjataan tavallisena lokirivinä eikä virheenä.
        /// </summary>
        public static IEnumerator HaeTeksti(string kokoelma, Action<string> valmis, bool valinnainen)
        {
            while (osoitinHaussa) yield return null;
            string versioPolku = istunnonPolku;
            if (versioPolku == null)
            {
                osoitinHaussa = true;
                using (var p = UnityWebRequest.Get(Osoitin))
                {
                    p.timeout = 10;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success)
                    {
                        var o = JsonUtility.FromJson<OsoitinTiedot>(p.downloadHandler.text);
                        versioPolku = o.polku;
                        Debug.Log($"MATKAKIRJA sisältö: versio {o.versio}, skeema {o.skeemaversio}, {o.polku}");
                    }
                    else if (File.Exists(ViimeisinPolku))
                    {
                        versioPolku = File.ReadAllText(ViimeisinPolku).Trim();
                        Debug.LogWarning($"MATKAKIRJA sisältö: osoitin ei vastaa ({p.error}), käytetään {versioPolku}");
                    }
                }
                osoitinHaussa = false;
                istunnonPolku = versioPolku;
            }
            if (versioPolku == null) { valmis(null); yield break; }

            string polku = versioPolku + "kokoelmat/" + kokoelma + ".json";
            string tiedosto = Valimuisti(polku);
            string teksti = null;
            if (File.Exists(tiedosto))
            {
                teksti = File.ReadAllText(tiedosto);
            }
            else
            {
                using var k = UnityWebRequest.Get(Juuri + polku);
                k.timeout = 20;
                yield return k.SendWebRequest();
                if (k.result != UnityWebRequest.Result.Success)
                {
                    if (valinnainen && k.responseCode == 404)
                        Debug.Log($"MATKAKIRJA sisältö: {polku} ei ole tässä paketissa (valinnainen)");
                    else
                        Debug.LogError($"MATKAKIRJA sisältö: {polku} epäonnistui: {k.error}");
                    valmis(null);
                    yield break;
                }
                teksti = k.downloadHandler.text;
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                File.WriteAllText(tiedosto, teksti);
                File.WriteAllText(ViimeisinPolku, versioPolku);
            }
            valmis(teksti);
        }

        static bool osoitinHaussa;
        static string istunnonPolku;
    }
}
