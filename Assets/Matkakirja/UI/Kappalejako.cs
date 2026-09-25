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

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// TAVUTUS (Natiivi-UI): webin hyphens: auto (lang fi) tasatulle palstalle. UITK ei tavuta, joten sanoihin lisätään
    /// pehmeät tavuviivat (U+00AD), joista rivi saa katketa. Sääntö on suomen tavusääntö: tavu alkaa konsonantista, jota
    /// seuraa vokaali (yh-tä-jak-soi-ses-ti, Ak-ro-po-lis). Vokaalien välistä ei katkaista, koska se vaatisi
    /// diftongisäännöt. Webin rajat: sana vähintään 5 kirjainta, kummallekin puolelle vähintään 2.
    /// </summary>
    public static class Tavutus
    {
        public const char Pehmea = '­';
        const int VahinSana = 5, VahinPuoli = 2;

        static bool Vokaali(char c) => "aeiouyäöåéèüáàâêîôûAEIOUYÄÖÅÉÈÜÁÀÂÊÎÔÛ".IndexOf(c) >= 0;

        /// <summary>Kappale pehmein tavuviivoin; muut merkit (lihavointimerkit, välimerkit, numerot) ennallaan.</summary>
        public static string Suomi(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) return teksti;
            var sb = new System.Text.StringBuilder(teksti.Length + teksti.Length / 4);
            int i = 0;
            while (i < teksti.Length)
            {
                if (!char.IsLetter(teksti[i])) { sb.Append(teksti[i++]); continue; }
                int alku = i;
                while (i < teksti.Length && char.IsLetter(teksti[i])) i++;
                Sana(sb, teksti, alku, i - alku);
            }
            return sb.ToString();
        }

        static void Sana(System.Text.StringBuilder sb, string t, int alku, int pituus)
        {
            if (pituus < VahinSana) { sb.Append(t, alku, pituus); return; }
            bool vokaaliNahty = false;
            for (int k = 0; k < pituus; k++)
            {
                char c = t[alku + k];
                bool raja = k >= VahinPuoli && pituus - k >= VahinPuoli && vokaaliNahty && !Vokaali(c)
                    && k + 1 < pituus && Vokaali(t[alku + k + 1])
                    // Vierasperäinen th, ph, ch, sh on yksi äänne (Part-he-non → Par-the-non).
                    && !(char.ToLowerInvariant(c) == 'h' && "tpcsTPCS".IndexOf(t[alku + k - 1]) >= 0);
                // th-parin edessä raja siirtyy h:n kohdalta t:n eteen.
                if (!raja && char.ToLowerInvariant(c) == 'h' && k >= VahinPuoli + 1 && pituus - k >= VahinPuoli && k + 1 < pituus
                    && Vokaali(t[alku + k + 1]) && "tpcsTPCS".IndexOf(t[alku + k - 1]) >= 0 && vokaaliNahty && sb.Length > 0)
                    sb.Insert(sb.Length - 1, Pehmea);
                if (raja) sb.Append(Pehmea);
                sb.Append(c);
                if (Vokaali(c)) vokaaliNahty = true;
            }
        }
    }
}
