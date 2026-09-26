// ISS-LINSSI: TLE:n lataus (suunnitelma docs/raportit/iss-linssi-suunnitelma-20260926.md, "Data"). Siirtosepän
// Actions (#3334) kirjoittaa ämpäriin data/iss-tle.json 6 h:n välein, ja jokaiseen buildiin paketoidaan
// StreamingAssets/mukana/iss-tle.json. Järjestys: välimuisti ja buildin tiedosto heti (paikallisia, nopeita), ämpäri
// taustalla linssin avautuessa (enintään tunnin välein). IssNyt.Aseta pitää uusimman epookin, joten tulos on sama kuin
// järjestyksessä ämpäri → välimuisti → buildi → havainnollinen varamalli. Uusi ämpärin TLE tallennetaan välimuistiin.
// Mukana.cs indeksoi vain *.mp3/*.png, joten tiedosto luetaan suoralla polulla (Siirtoseppä 26.9.).
using System;
using System.Collections;
using System.IO;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class IssTleLataaja
    {
        public const string Osoite = Sisalto.Juuri + "data/iss-tle.json";
        public const float VerkkoValiS = 3600f;

        static bool paikalliset, haussa;
        static float verkkoHaettu = float.NegativeInfinity;

        static string Valimuisti => Path.Combine(Application.persistentDataPath, "iss-tle.json");
        static string Buildi => Path.Combine(Application.streamingAssetsPath, "mukana", "iss-tle.json");

        /// <summary>Paikalliset TLE:t heti, ämpäri taustalla (isäntä ajaa korutiinin).</summary>
        public static void Lataa(MonoBehaviour isanta)
        {
            if (!paikalliset)
            {
                paikalliset = true;
                Lue(Valimuisti, "välimuisti");
                Lue(Buildi, "buildi");
            }
            if (haussa || Time.realtimeSinceStartup - verkkoHaettu < VerkkoValiS || isanta == null) return;
            verkkoHaettu = Time.realtimeSinceStartup;
            isanta.StartCoroutine(HaeAmparista());
        }

        /// <summary>Tila lokiin ja testikomentoon: TLE:n lähde, epookki, ikä ja radan laatu.</summary>
        public static string Tila()
        {
            var t = IssNyt.Tle;
            var nyt = IssNyt.Kello();
            if (t == null) return "ei TLE:tä, havainnollinen rata";
            return $"{t.Nimi} {t.Numero}, haettu {t.Haettu ?? "-"}, ikä {IssNyt.IkaVrk(nyt):F2} vrk, laatu {IssNyt.Laatu(nyt)}";
        }

        static void Lue(string polku, string mista)
        {
            try { if (File.Exists(polku)) Aseta(File.ReadAllText(polku), mista, null); }
            catch (Exception e) { Debug.Log($"MATKAKIRJA iss: TLE {mista}: {e.Message}"); }
        }

        static IEnumerator HaeAmparista()
        {
            haussa = true;
            using (var p = UnityWebRequest.Get(Osoite))
            {
                p.timeout = 10;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) Aseta(p.downloadHandler.text, "ämpäri", Valimuisti);
                else Debug.Log($"MATKAKIRJA iss: TLE ämpäri: {p.error}");
            }
            haussa = false;
        }

        static void Aseta(string json, string mista, string tallenna)
        {
            var t = Tle.JasennaJson(json);
            if (t == null) { Debug.Log($"MATKAKIRJA iss: TLE {mista}: rikki tai väärä tarkiste, ohitettu"); return; }
            bool uusi = IssNyt.Aseta(t);
            if (uusi && tallenna != null)
            {
                try { File.WriteAllText(tallenna, json); }
                catch (Exception e) { Debug.Log($"MATKAKIRJA iss: välimuisti: {e.Message}"); }
            }
            Debug.Log($"MATKAKIRJA iss: TLE {mista} {(uusi ? "käytössä" : "ei uudempi")}; {Tila()}");
        }
    }
}
