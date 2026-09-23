// ASETUKSET: pelaajan ääni- ja karttavalinnat (Natiivi-UI, 23.9.2026).
//
// Samat valinnat ja oletukset kuin verkkopelissä, samoilla avaimilla
// (localStorage → PlayerPrefs), jotta vientityökalut ja muistiinpanot pätevät:
//   päävalikko (hampurilainen), js/main.js AANIKYTKIMET ja kartan kytkin:
//     Kertoja      matkakirja-kertoja      "ei" = pois       oletus päällä
//     Musiikki     matkakirja-musiikki     "0"/"1"           oletus päällä
//     Äänimaisema  matkakirja-aanimaisema  "0"/"1"           oletus päällä (myös koko pelin mykistys; webissä sound.js:n tila, avain natiivin oma)
//     Pieni liike  matkakirja-kartan-liike "0"/"1"           oletus päällä
//   ratas "Äänentasot", js/main.js AANIVOIMAT + js/kehittajan-voimat.js
//   (avain matkakirja-dev-voima-<laji>, 0…1, tallennetaan vain oletuksesta poikkeava):
//     tehosteet 1,0 · pulu 1,0 · lukija 0,9 · musiikki 0,35 · tausta 1,0
// Äänimoottori ja kartta lukevat arvot täältä ja kuuntelevat Muuttui-tapahtumaa.
using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public enum Kytkin { Kertoja, Musiikki, Aanimaisema, PieniLiike }
    public enum Voima { Tehosteet, Pulu, Lukija, Musiikki, Tausta }

    public static class Asetukset
    {
        /// <summary>Jokin asetus muuttui (kytkimen tai voiman nimi).</summary>
        public static event Action<string> Muuttui;

        static string Avain(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "matkakirja-kertoja",
            Kytkin.Musiikki => "matkakirja-musiikki",
            Kytkin.Aanimaisema => "matkakirja-aanimaisema",
            _ => "matkakirja-kartan-liike",
        };

        static string Avain(Voima v) => "matkakirja-dev-voima-" + v switch
        {
            Voima.Tehosteet => "tehosteet",
            Voima.Pulu => "pulu",
            Voima.Lukija => "lukija",
            Voima.Musiikki => "musiikki",
            _ => "tausta",
        };

        public static float Oletus(Voima v) => v switch
        {
            Voima.Lukija => 0.9f,
            Voima.Musiikki => 0.35f,
            _ => 1f,
        };

        public static bool Paalla(Kytkin k)
        {
            string s = PlayerPrefs.GetString(Avain(k), null);
            if (string.IsNullOrEmpty(s)) return true;
            return k == Kytkin.Kertoja ? s != "ei" : s != "0";
        }

        public static void Aseta(Kytkin k, bool paalla)
        {
            if (Paalla(k) == paalla) return;
            PlayerPrefs.SetString(Avain(k), k == Kytkin.Kertoja ? (paalla ? "kaikki" : "ei") : (paalla ? "1" : "0"));
            PlayerPrefs.Save();
            Muuttui?.Invoke(k.ToString());
        }

        /// <summary>Äänentaso 0…1.</summary>
        public static float Taso(Voima v)
        {
            string s = PlayerPrefs.GetString(Avain(v), null);
            if (string.IsNullOrEmpty(s) || !float.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var t))
                return Oletus(v);
            return Mathf.Clamp01(t);
        }

        public static void AsetaTaso(Voima v, float taso)
        {
            taso = Mathf.Clamp01(Mathf.Round(taso * 100f) / 100f);
            if (Mathf.Approximately(Taso(v), taso)) return;
            if (Mathf.Approximately(taso, Oletus(v))) PlayerPrefs.DeleteKey(Avain(v));
            else PlayerPrefs.SetString(Avain(v), taso.ToString("0.##", CultureInfo.InvariantCulture));
            PlayerPrefs.Save();
            Muuttui?.Invoke(v.ToString());
        }

        /// <summary>Kaikki asetukset oletuksiin (Uusi peli tyhjentää myös ääniasetukset, kuten webissä).</summary>
        public static void Nollaa()
        {
            foreach (Kytkin k in Enum.GetValues(typeof(Kytkin))) PlayerPrefs.DeleteKey(Avain(k));
            foreach (Voima v in Enum.GetValues(typeof(Voima))) PlayerPrefs.DeleteKey(Avain(v));
            PlayerPrefs.Save();
            Muuttui?.Invoke("kaikki");
        }

        public static string Nimi(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "Kertoja",
            Kytkin.Musiikki => "Musiikki",
            Kytkin.Aanimaisema => "Äänimaisema",
            _ => "Pieni liike",
        };

        public static string Seloste(Kytkin k) => k switch
        {
            Kytkin.Kertoja => "Kertoja lukee matkakirjan merkinnät ja avaustekstin",
            Kytkin.Musiikki => "Pelin omat raidat: pohjavire, kaupunkien kappaleet, matkat ja visa",
            Kytkin.Aanimaisema => "Paikkojen äänitykset ja tehosteet — myös koko pelin mykistys",
            _ => "Pulu, pilven varjo ja kellonajan sävy kartalla",
        };

        public static string Nimi(Voima v) => v switch
        {
            Voima.Tehosteet => "Äänitehosteet",
            Voima.Pulu => "Pulun ääni",
            Voima.Lukija => "Lukija",
            Voima.Musiikki => "Taustamusiikki",
            _ => "Taustaäänet",
        };

        public static readonly IReadOnlyList<Voima> VoimaJarjestys = new[] { Voima.Tehosteet, Voima.Pulu, Voima.Lukija, Voima.Musiikki, Voima.Tausta };
    }
}
