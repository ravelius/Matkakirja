// KIELI (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; käännökset myöhemmin): tekstit avaimilla
// Siirtosepän muodossa Resources/Tekstit/<alue>.<kieli>.json (litteä {"avain": "teksti"}; UI = ui.fi.json, peli = olavinlinna.fi.json),
// kaikki saman kielen alueet yhdeksi Ydin Kielitauluksi. Nyt vain suomi; en-tiedostot tulevat rinnalle, kun suomi on lukittu
// (Raamattu KÄÄNNÖKSET). Puuttuva avain → suomi → avain itse. Uusi UI-teksti: avain ui.fi.json:iin ja Kieli.T(avain);
// tyokalut/kielivahti.py valvoo kohdetiedostot. Kun Siirtosepän Matkakirja.Tekstit on junassa, tämä kutsuu sitä.
using System;
using Matkakirja.Linssit;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Kieli
    {
        public const string Perus = "fi";
        static Kielitaulu perus, nyt;
        static bool ladattu;

        /// <summary>Valittu kieli (nyt aina suomi; kielivalinta asetuksiin englannin valmistuttua).</summary>
        public static string Valittu => Perus;

        public static string T(string avain) => T(avain, null);

        public static string T(string avain, params object[] arvot)
        {
            if (!ladattu) Lataa();
            if (perus == null) return avain ?? "";
            return (nyt ?? perus).T(avain, perus, arvot);
        }

        static void Lataa()
        {
            ladattu = true;
            perus = Taulu(Perus);
            if (perus == null) Debug.LogWarning("MATKAKIRJA kieli: Resources/Tekstit/*.fi.json puuttuu tai on rikki");
            nyt = Valittu == Perus ? null : Taulu(Valittu);
        }

        /// <summary>Kaikki Resources/Tekstit/*.<kieli>.json yhdeksi tauluksi; null, jos yhtään ei ole.</summary>
        static Kielitaulu Taulu(string kieli)
        {
            Kielitaulu t = null;
            foreach (var ta in Resources.LoadAll<TextAsset>("Tekstit"))
            {
                if (ta == null || !ta.name.EndsWith("." + kieli, StringComparison.Ordinal)) continue;
                t ??= Kielitaulu.Lue("{}");
                if (!t.Lisaa(ta.text)) Debug.LogWarning("MATKAKIRJA kieli: rikkinäinen Tekstit/" + ta.name + ".json");
            }
            return t;
        }
    }
}
