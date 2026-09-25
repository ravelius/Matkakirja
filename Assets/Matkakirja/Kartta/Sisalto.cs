using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Verkkopelin sisältöpaketti ämpäristä (Siirtoseppä, tools/vienti):
    /// sisalto/&lt;pääversio&gt;/uusin.json → polku (esim. sisalto/1/v15/) → kokoelmat/*.json.
    /// Versiokansiot ovat muuttumattomia, joten haettu kokoelma tallennetaan
    /// laitteelle ja luetaan sieltä, jos verkkoa ei ole.
    /// </summary>
    public static class Sisalto
    {
        public const string Juuri = "https://media.matkakirja.app/";
        /// <summary>
        /// Paketin pääversio: 1 = verkkopelin kanssa jaettu (tuotanto), 2 = 2.0 (sisalto/2/, ei data-kenttää).
        /// Vaihto 2:een on Fablen päätös, kun 2.0 on ämpärissä. Kokeiluun Documents/sisalto-2.txt valitsee 2:n.
        /// </summary>
        public const int Paaversio = 1;
        public static int ValittuPaaversio =>
            File.Exists(Path.Combine(Application.persistentDataPath, "sisalto-2.txt")) ? 2 : Paaversio;
        /// <summary>Osoitin sisalto/&lt;pääversio&gt;/uusin.json (kaikki lukijat hakevat sen tästä).</summary>
        public static string Osoitin => Juuri + $"sisalto/{ValittuPaaversio}/uusin.json";

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
            /// <summary>ISO3 (esim. "GRC").</summary>
            public string maa;
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
            /// <summary>Skeema 1.10: pintakorkeus metreinä merenpinnasta (null paketissa = 0).</summary>
            public double korkeus;
            /// <summary>
            /// Laudan oma nimen asettelu (web js/packs/*.js la/lx/ly, js/karttanimet.js sijoitaKaupunginNimi ehdokas 0):
            /// ankkuri "start"/"end"/"middle" ja perusviivan siirtymä laudan yksiköinä (y alas). Tyhjä la = ei asettelua.
            /// </summary>
            public string la;
            public float lx, ly;
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
        public static IEnumerator HaeTeksti(string kokoelma, Action<string> valmis, bool valinnainen) =>
            HaePaketista("kokoelmat/" + kokoelma + ".json", valmis, valinnainen);

        /// <summary>Hakee paketin tiedoston versiopolun alta (esim. "offline.json"), välimuistin kautta.</summary>
        public static IEnumerator HaePaketista(string suhteellinen, Action<string> valmis, bool valinnainen)
        {
            // Koekansio (testaus laitteella ja simulaattorissa): Documents/sisalto-koe/<suhteellinen>
            // voittaa julkaistun paketin versiosta riippumatta.
            string koe = Path.Combine(Application.persistentDataPath, "sisalto-koe",
                suhteellinen.Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(koe))
            {
                Debug.Log("MATKAKIRJA sisältö: koekansiosta " + suhteellinen);
                string koeTeksti = null;
                yield return Taustalla(() => File.ReadAllText(koe), t => koeTeksti = t);
                valmis(koeTeksti);
                yield break;
            }
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

            string polku = versioPolku + suhteellinen;
            string tiedosto = Valimuisti(polku);
            string teksti = null;
            if (File.Exists(tiedosto))
            {
                // Välimuistitiedosto on 3–11 Mt: luku ja purku pääsäikeessä maksoi 25–58 ms:n kehyksen
                // jokaisella kokoelmalla (Natiivi-UI:n piikkimittaus 24.9.), joten luetaan taustasäikeessä.
                // Epäonnistunut luku (esim. toinen haku kirjoittaa samaa tiedostoa) → haetaan verkosta.
                yield return Taustalla(() => File.ReadAllText(tiedosto), t => teksti = t);
            }
            if (teksti == null)
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
                // Purku ja välimuistiin kirjoitus taustasäikeessä (tavut kopioidaan pääsäikeessä). Polut
                // lasketaan tässä: Application.persistentDataPath toimii vain pääsäikeessä. Kirjoitus
                // väliaikaistiedostoon ja siirto, koska useampi haku voi kirjoittaa saman kokoelman yhtä aikaa.
                var tavut = k.downloadHandler.data;
                string versio = versioPolku, viimeisin = ViimeisinPolku;
                yield return Taustalla(() =>
                {
                    var s = System.Text.Encoding.UTF8.GetString(tavut);
                    try
                    {
                        Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                        Kirjoita(tiedosto, s);
                        Kirjoita(viimeisin, versio);
                    }
                    catch (Exception) { /* välimuisti on valinnainen */ }
                    return s;
                }, t => teksti = t);
            }
            valmis(teksti);
        }

        /// <summary>Kirjoitus väliaikaistiedostoon ja siirto paikalleen (lukija ei näe puolikasta tiedostoa).</summary>
        static void Kirjoita(string tiedosto, string sisalto)
        {
            string tmp = tiedosto + "." + Guid.NewGuid().ToString("N") + ".tmp";
            File.WriteAllText(tmp, sisalto);
            try
            {
                // Uudelleennimeäminen: samaa tiedostoa lukeva haku ei saa jakamisvirhettä (Mono tarkistaa vain avauksen).
                if (File.Exists(tiedosto)) File.Replace(tmp, tiedosto, null);
                else File.Move(tmp, tiedosto);
            }
            finally { if (File.Exists(tmp)) File.Delete(tmp); }
        }

        /// <summary>Ajaa työn taustasäikeessä ja odottaa kehyksittäin; virheessä tulos on null (kirjataan).</summary>
        static IEnumerator Taustalla(Func<string> tyo, Action<string> tulos)
        {
            var t = System.Threading.Tasks.Task.Run(tyo);
            while (!t.IsCompleted) yield return null;
            if (t.IsFaulted) Debug.LogError("MATKAKIRJA sisältö: luku epäonnistui: " + t.Exception?.GetBaseException().Message);
            tulos(t.IsFaulted ? null : t.Result);
        }

        static bool osoitinHaussa;
        static string istunnonPolku;
    }
}
