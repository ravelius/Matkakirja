// PELISTREAK (talous 5b, omistaja 27.9.2026 klo 11.3x, luvut hyväksytty sellaisenaan;
// web js/game.js streakErittely/streakPalkkio/streakOtsikko ja Game.kirjaaPelipaiva,
// docs/raportit/talous-suunnitelma-20260927.md 5b): oikean elämän peräkkäiset
// pelipäivät (laitteen paikallinen päivä, päivän ensimmäinen onnistunut teko).
//
// Päivät 1–2: 0, 3–6: 20 £/pv, 7.: 50 + viikkobonus 100 £, 8+: 30 £/pv ja joka
// 7. päivä (14, 21, …) +100 £. Väliin jäänyt päivä nollaa laskurin (ei armopäivää).
//
// Päivämäärä tulee aina ulkoa (PeliOhjain: DateTime.Now, testit: kiinteä päivä), joten
// pelilogiikka ja kultaiset jäljet pysyvät deterministisinä: ilman kutsua streak ei laukea.
// Kirjaus: Matka.KirjaaPelipaiva; tila: Pelaaja.Streak (tallennusversio 7).
using System;
using System.Globalization;

namespace Matkakirja.Peli
{
    /// <summary>Pelaajan pelipäiväputki (web p.streak = {paiva: 'YYYY-MM-DD', pituus}).</summary>
    public sealed class StreakTila
    {
        /// <summary>Viimeisin kirjattu pelipäivä muodossa yyyy-MM-dd (laitteen paikallinen päivä).</summary>
        public string Paiva;
        /// <summary>Peräkkäisten pelipäivien määrä (1 = putki alkoi tänään).</summary>
        public int Pituus;
    }

    /// <summary>Päiväpalkkio ja viikkobonus erikseen (web streakErittely: lokirivi ja toast kertovat molemmat).</summary>
    public readonly struct StreakErittely
    {
        public readonly int Paiva;
        public readonly int Viikko;
        public StreakErittely(int paiva, int viikko) { Paiva = paiva; Viikko = viikko; }
        public int Yhteensa => Paiva + Viikko;
    }

    /// <summary>Pelistreakin puhtaat säännöt (web streakErittely, streakPalkkio, streakOtsikko, paivaaLisaa).</summary>
    public static class Streak
    {
        /// <summary>Web streakErittely(pituus).</summary>
        public static StreakErittely Erittely(int pituus)
        {
            int paiva = pituus < 3 ? 0 : pituus < 7 ? 20 : pituus == 7 ? 50 : 30;
            int viikko = pituus >= 7 && pituus % 7 == 0 ? 100 : 0;
            return new StreakErittely(paiva, viikko);
        }

        /// <summary>Web streakPalkkio(pituus): päiväpalkkio + viikkobonus.</summary>
        public static int Palkkio(int pituus) => Erittely(pituus).Yhteensa;

        /// <summary>Web JARJESTYSLUVUT: 1–10 sanoina, muuten "n.".</summary>
        static readonly string[] Jarjestysluvut =
        {
            "", "Ensimmäinen", "Toinen", "Kolmas", "Neljäs", "Viides", "Kuudes",
            "Seitsemäs", "Kahdeksas", "Yhdeksäs", "Kymmenes",
        };

        /// <summary>Web streakOtsikko: "Kolmas päivä peräkkäin matkalla" / "14. päivä peräkkäin matkalla".</summary>
        public static string Otsikko(int pituus) =>
            (pituus >= 0 && pituus < Jarjestysluvut.Length ? Jarjestysluvut[pituus] : pituus.ToString(CultureInfo.InvariantCulture) + ".")
            + " päivä peräkkäin matkalla";

        /// <summary>Toastin alarivi (web sub): "+20 £" / "+50 £ ja viikkobonus +100 £".</summary>
        public static string Ala(int pituus)
        {
            var e = Erittely(pituus);
            return $"+{e.Paiva} £" + (e.Viikko > 0 ? $" ja viikkobonus +{e.Viikko} £" : "");
        }

        /// <summary>Lokirivi (web say): "Kolmas päivä peräkkäin matkalla: +20 puntaa." (+ " ja viikkobonus +100 puntaa").</summary>
        public static string Lokirivi(int pituus)
        {
            var e = Erittely(pituus);
            return $"{Otsikko(pituus)}: +{e.Paiva} puntaa" + (e.Viikko > 0 ? $" ja viikkobonus +{e.Viikko} puntaa" : "") + ".";
        }

        /// <summary>Kelpaako päivämäärä (web /^\d{4}-\d{2}-\d{2}$/ ja oikea kalenteripäivä).</summary>
        public static bool Kelpaa(string paivays) =>
            paivays != null && paivays.Length == 10
            && DateTime.TryParseExact(paivays, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);

        /// <summary>Web paivaaLisaa(paivays, n): 'yyyy-MM-dd' + n päivää (kalenterilaskenta, ei aikavyöhykettä).</summary>
        public static string PaivaaLisaa(string paivays, int n) =>
            DateTime.ParseExact(paivays, "yyyy-MM-dd", CultureInfo.InvariantCulture)
                .AddDays(n).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
    }
}
