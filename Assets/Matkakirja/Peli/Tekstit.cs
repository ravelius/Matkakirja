// PELIN TEKSTIT AVAIMILLA (PT 9.10.2026, Raamattu: käännettävyys englanniksi; puhuttelu "sinä"). Näkyvät ja puhutut tekstit luetaan
// avaimella lokalisointitaulusta, ei kovakoodattuina: Assets/Matkakirja/Resources/Tekstit/<alue>.<kieli>.json, litteä
// { "avain": "teksti" } (olavinlinna.fi.json = Siirtoseppä, ui.*.fi.json = Natiivi-UI). Avaimet <alue>.<ryhmä>.<id> pienin kirjaimin.
// Paikkamerkit {0}, {1} (string.Format). Kieli vaihtuu Tekstit.Kieli-kentällä; puuttuva käännös palaa suomeen, puuttuva avain
// palauttaa avaimen hakasulkeissa (näkyy heti). Unity-lataaja: Matkakirja.Natiivi.TekstiLataaja (Resources). Ei käännöksiä vielä.
// Testit: Linssit-testit/Testit/TekstitTestit.cs (avaimet taulussa, ei kovakoodattua suomea pelin koodissa).
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Peli
{
    public static class Tekstit
    {
        public const string Oletuskieli = "fi";
        static readonly Dictionary<string, Dictionary<string, string>> kielet = new Dictionary<string, Dictionary<string, string>>(StringComparer.Ordinal);

        /// <summary>Valittu kieli ("fi", myöhemmin "en"); puuttuvat avaimet suomeksi.</summary>
        public static string Kieli = Oletuskieli;

        /// <summary>Lisää taulun (litteä JSON-objekti) kielelle; myöhempi samanniminen avain korvaa aiemman.</summary>
        public static int Lisaa(string kieli, string json)
        {
            if (string.IsNullOrEmpty(kieli) || string.IsNullOrEmpty(json)) return 0;
            if (!kielet.TryGetValue(kieli, out var t)) kielet[kieli] = t = new Dictionary<string, string>(StringComparer.Ordinal);
            int n = 0;
            if (MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json)) is Dictionary<string, object> o)
                foreach (var kv in o) if (kv.Value is string s) { t[kv.Key] = s; n++; }
            return n;
        }

        public static void Tyhjenna() => kielet.Clear();

        public static bool On(string avain, string kieli = Oletuskieli) => avain != null && kielet.TryGetValue(kieli, out var t) && t.ContainsKey(avain);

        /// <summary>Teksti avaimella valitulla kielellä, varalla suomi; puuttuva avain → "[avain]".</summary>
        public static string T(string avain)
        {
            if (avain == null) return "";
            if (kielet.TryGetValue(Kieli, out var t) && t.TryGetValue(avain, out var s)) return s;
            if (Kieli != Oletuskieli && kielet.TryGetValue(Oletuskieli, out var fi) && fi.TryGetValue(avain, out s)) return s;
            return "[" + avain + "]";
        }

        /// <summary>Teksti paikkamerkein ({0}, {1} …).</summary>
        public static string T(string avain, params object[] arvot) => string.Format(CultureInfo.InvariantCulture, T(avain), arvot);

        /// <summary>Datan teksti (repliikki, kertoja, tietokortti): avaimen teksti, jos taulussa, muuten datan oma (suomenkielinen) teksti.</summary>
        public static string TaiData(string avain, string data) => avain != null && (On(avain, Kieli) || On(avain)) ? T(avain) : data;

        public static IEnumerable<string> Avaimet(string kieli = Oletuskieli) => kielet.TryGetValue(kieli, out var t) ? t.Keys : (IEnumerable<string>)Array.Empty<string>();
    }
}
