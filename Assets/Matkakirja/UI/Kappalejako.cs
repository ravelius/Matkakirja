// KAPPALEJAKO (Natiivi-UI): webin js/ui-apurit.js virkkeiksi ja jaaKappaleiksi sellaisenaan.
//
// Kirjoittajan tyhjät rivit voittavat. Ilman niitä vähintään kolmen virkkeen teksti puolitetaan kahdeksi
// kappaleeksi (ensimmäinen saa ylimääräisen virkkeen), lyhyempi pysyy yhtenä. Virke päättyy . ! ? -merkkiin,
// jota seuraa välilyönti ja iso kirjain, numero tai lainausmerkki; numeron jälkeinen piste (1. matkapäivä) ei päätä.

using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Natiivi
{
    public static class Kappalejako
    {
        /// <summary>Web VIRKKEEN_ALKU = /[0-9A-ZÅÄÖÜÉ"“«]/.</summary>
        static bool VirkkeenAlku(char c) =>
            (c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || c == 'Å' || c == 'Ä' || c == 'Ö' || c == 'Ü' || c == 'É'
            || c == '"' || c == '“' || c == '«';

        /// <summary>Web virkkeiksi.</summary>
        public static List<string> Virkkeiksi(string teksti)
        {
            string t = teksti ?? "";
            var ulos = new List<string>();
            int alku = 0;
            for (int i = 0; i < t.Length; i++)
            {
                char m = t[i];
                if (m != '.' && m != '!' && m != '?') continue;
                if (m == '.' && i > 0 && char.IsDigit(t[i - 1]) && t[i - 1] <= '9') continue;
                // /^\s+(.)/: vähintään yksi tyhjä, sitten seuraava merkki.
                int j = i + 1;
                while (j < t.Length && char.IsWhiteSpace(t[j])) j++;
                if (j == i + 1 || j >= t.Length) break;
                if (!VirkkeenAlku(t[j])) continue;
                ulos.Add(t.Substring(alku, i + 1 - alku).Trim());
                alku = i + 1;
            }
            if (alku < t.Length) ulos.Add(t.Substring(alku).Trim());
            return ulos.Where(x => x.Length > 0).ToList();
        }

        /// <summary>Web jaaKappaleiksi.</summary>
        public static List<string> Jaa(string teksti)
        {
            string koko = (teksti ?? "").Trim();
            if (koko.Contains("\n\n"))
                return Regex.Split(koko, @"\n{2,}").Select(k => k.Trim()).Where(k => k.Length > 0).ToList();
            var virkkeet = Virkkeiksi(koko);
            if (virkkeet.Count < 3) return koko.Length > 0 ? new List<string> { koko } : new List<string>();
            int puoli = (virkkeet.Count + 1) / 2;
            return new List<string> { string.Join(" ", virkkeet.Take(puoli)), string.Join(" ", virkkeet.Skip(puoli)) }
                .Where(k => k.Length > 0).ToList();
        }
    }
}
