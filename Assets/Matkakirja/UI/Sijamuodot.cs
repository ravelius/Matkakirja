// PAIKANNIMIEN SIJAMUODOT (Natiivi-UI): webin js/ui-apurit.js maahanMuoto, paikkaaMuoto ja
// paikassaMuoto sanasta sanaan (omistajan tilaus 26.8.2026, saapumissekvenssin puhekuplat).
// Sääntö hoitaa säännölliset, taulukko poikkeukset; taulukot ovat webin (pelin omat nimet).
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    public static class Sijamuodot
    {
        const string Vokaalit = "aeiouyäö";

        /// <summary>Aidot diftongit ja pitkät vokaalit (Algeria ja Nicaragua eivät ole diftongeja).</summary>
        static readonly HashSet<string> Diftongit = new HashSet<string>
        {
            "ai", "ei", "oi", "ui", "yi", "äi", "öi",
            "au", "eu", "iu", "ou", "ey", "iy", "äy", "öy",
            "ie", "uo", "yö",
        };

        static readonly Dictionary<string, string> IllatiiviPoikkeukset = new Dictionary<string, string>
        {
            ["Alankomaat"] = "Alankomaihin",
            ["Arabiemiirikunnat"] = "Arabiemiirikuntiin",
            ["Bermuda"] = "Bermudalle",
            ["Falklandinsaaret"] = "Falklandinsaarille",
            ["Fidži"] = "Fidžille",
            ["Filippiinit"] = "Filippiineille",
            ["Kypros"] = "Kyprokselle",
            ["Norfolkinsaari"] = "Norfolkinsaarelle",
            ["Paraguay"] = "Paraguayhin",
            ["Salomonsaaret"] = "Salomonsaarille",
            ["Suomi"] = "Suomeen",
            ["Uruguay"] = "Uruguayhin",
            ["Yhdysvallat"] = "Yhdysvaltoihin",
        };

        static readonly Dictionary<string, string> InessiiviPoikkeukset = new Dictionary<string, string>
        {
            ["Alpit"] = "Alpeilla",
            ["Helsinki"] = "Helsingissä",
            ["Islanti"] = "Islannissa",
            ["Kapkaupunki"] = "Kapkaupungissa",
            ["Kreeta"] = "Kreetalla",
            ["Riika"] = "Riiassa",
            ["Rovaniemi"] = "Rovaniemellä",
            ["Tampere"] = "Tampereella",
        };

        /// <summary>Vokaalisointu luetaan sanan lopusta (Kööpenhaminassa, New Yorkissa).</summary>
        static bool Takavokaalinen(string sana)
        {
            var s = sana.ToLowerInvariant();
            for (int i = s.Length - 1; i >= 0; i--)
            {
                if ("aou".IndexOf(s[i]) >= 0) return true;
                if ("äöy".IndexOf(s[i]) >= 0) return false;
            }
            return false;
        }

        static (char Viim, char Toka) Loppu(string sana)
        {
            var s = sana.ToLowerInvariant();
            return (s[s.Length - 1], s.Length > 1 ? s[s.Length - 2] : '\0');
        }

        static bool Vokaali(char c) => Vokaalit.IndexOf(c) >= 0;

        /// <summary>"Tervetuloa X": illatiivi tai poikkeustaulun ulkopaikallissija (web maahanMuoto).</summary>
        public static string Maahan(string nimi)
        {
            var sana = (nimi ?? "").Trim();
            if (sana.Length == 0) return "";
            if (IllatiiviPoikkeukset.TryGetValue(sana, out var p)) return p;
            // Yhdysnimen loppu -maa taipuu kuten "maa": Thaimaahan.
            if (sana.ToLowerInvariant().EndsWith("maa")) return sana + "han";
            var (viim, toka) = Loppu(sana);
            if (!Vokaali(viim)) return sana + "iin";
            if (viim == toka) return sana + "seen";
            if (Diftongit.Contains(new string(new[] { toka, viim })))
                return "iy".IndexOf(viim) >= 0 ? sana + "hin" : sana + "h" + viim + "n";
            return sana + viim + "n";
        }

        /// <summary>"Klikkaa X": yksikön partitiivi (web paikkaaMuoto: Ateenaa, Lontoota, Wieniä).</summary>
        public static string Paikkaa(string nimi)
        {
            var sana = (nimi ?? "").Trim();
            if (sana.Length == 0) return "";
            string paate = Takavokaalinen(sana) ? "a" : "ä";
            var (viim, toka) = Loppu(sana);
            if (!Vokaali(viim)) return sana + "i" + paate;
            if (viim == toka || Diftongit.Contains(new string(new[] { toka, viim }))) return sana + "t" + paate;
            return sana + paate;
        }

        /// <summary>"Tehtävä X": inessiivi tai poikkeus (web paikassaMuoto).</summary>
        public static string Paikassa(string nimi)
        {
            var sana = (nimi ?? "").Trim();
            if (sana.Length == 0) return "";
            if (InessiiviPoikkeukset.TryGetValue(sana, out var p)) return p;
            string paate = Takavokaalinen(sana) ? "ssa" : "ssä";
            return Vokaali(Loppu(sana).Viim) ? sana + paate : sana + "i" + paate;
        }
    }
}
