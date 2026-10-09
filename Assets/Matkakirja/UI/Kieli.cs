// KIELI (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; käännökset myöhemmin): UI-tekstit avaimilla
// Resources/Kieli/<kieli>.json-taulusta (Ydin Kielitaulu). Nyt vain suomi (fi.json = perustaulu); en.json tulee rinnalle, kun
// suomi on lukittu (Raamattu KÄÄNNÖKSET). Puuttuva avain → suomi → avain itse. Uusi UI-teksti: avain fi.json:iin ja Kieli.T(avain);
// tyokalut/kielivahti.py valvoo, ettei kohdetiedostoihin tule kovakoodattua suomea ja että jokainen käytetty avain on taulussa.
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
            if (perus == null) Debug.LogWarning("MATKAKIRJA kieli: Resources/Kieli/fi.json puuttuu tai on rikki");
            nyt = Valittu == Perus ? null : Taulu(Valittu);
        }

        static Kielitaulu Taulu(string kieli)
        {
            var ta = Resources.Load<TextAsset>("Kieli/" + kieli);
            return ta != null ? Kielitaulu.Lue(ta.text) : null;
        }
    }
}
