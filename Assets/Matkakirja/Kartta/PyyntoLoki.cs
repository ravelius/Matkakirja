using System;
using System.IO;
using System.Text;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// PYYNTÖLOKI (Natiiviseppä 26.9.2026, build 22 laattojen esilataus): Cesiumin jokainen laattapyyntö Laattapalvelimelle
    /// tiedostoon Documents/pyynnot.tsv, jotta nähdään, mitkä laatat verho odottaa (aloituslennon avaus) ja katetaanko ne
    /// esilatauksella. Kehittäjälippu (sovellus kiinni): defaults write app.matkakirja.proto3d matkakirja-pyyntoloki -int 1
    /// tai tiedosto Documents/pyyntoloki.txt. Oletus pois; App Store -käännöksessä ei koskaan.
    /// Rivi: t (s käynnistyksestä) \t luokka \t polku \t lähde (paketti/offline/valimuisti/verkko/…) \t tila \t ms;
    /// verhojen alku ja loppu merkkiriveinä "# t verho …". Esilatauksen haut eivät kuulu tähän.
    /// </summary>
    public static class PyyntoLoki
    {
        public const string Avain = "matkakirja-pyyntoloki";
        public const string LippuTiedosto = "pyyntoloki.txt";
        public const string Tiedosto = "pyynnot.tsv";

        static readonly object lukko = new object();
        static StreamWriter kirjoitin;
        static readonly System.Diagnostics.Stopwatch kello = System.Diagnostics.Stopwatch.StartNew();
        static int rivit;

        public static bool Paalla => kirjoitin != null;

        /// <summary>Pääsäikeestä kerran (Laattapalvelin.Awake): lukee lipun ja avaa tiedoston.</summary>
        public static void Alusta()
        {
#if MATKAKIRJA_APPSTORE
            return;
#else
            try
            {
                string kansio = Application.persistentDataPath;
                bool lippu = PlayerPrefs.GetInt(Avain, 0) == 1 || File.Exists(Path.Combine(kansio, LippuTiedosto));
                if (!lippu || kirjoitin != null) return;
                kirjoitin = new StreamWriter(Path.Combine(kansio, Tiedosto), false, new UTF8Encoding(false));
                Debug.Log("MATKAKIRJA pyyntöloki: päällä → Documents/" + Tiedosto);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA pyyntöloki: " + e.Message); }
#endif
        }

        static double T => kello.Elapsed.TotalSeconds;

        /// <summary>Cesiumin haku valmis (mikä tahansa säie).</summary>
        public static void Kirjaa(string luokka, string polku, string lahde, int tila, double ms)
        {
            if (kirjoitin == null) return;
            lock (lukko)
            {
                kirjoitin.Write(T.ToString("0.000", System.Globalization.CultureInfo.InvariantCulture));
                kirjoitin.Write('\t'); kirjoitin.Write(luokka);
                kirjoitin.Write('\t'); kirjoitin.Write(polku);
                kirjoitin.Write('\t'); kirjoitin.Write(lahde);
                kirjoitin.Write('\t'); kirjoitin.Write(tila);
                kirjoitin.Write('\t'); kirjoitin.WriteLine(ms.ToString("0", System.Globalization.CultureInfo.InvariantCulture));
                if (++rivit % 50 == 0) kirjoitin.Flush();
            }
        }

        /// <summary>Merkkirivi (verhon alku/loppu).</summary>
        public static void Merkki(string teksti)
        {
            if (kirjoitin == null) return;
            lock (lukko)
            {
                kirjoitin.Write("# ");
                kirjoitin.Write(T.ToString("0.000", System.Globalization.CultureInfo.InvariantCulture));
                kirjoitin.Write(' ');
                kirjoitin.WriteLine(teksti);
                kirjoitin.Flush();
            }
        }
    }
}
