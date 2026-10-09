// LYHYIDEN KAUPUNKISILMUKOIDEN KORVAAJAT (Pelikoodari 9.10.2026, PT: lyhyet silmukat 90–120 s; Linssiseppä kytkee, juna 174):
// aanet/kaupunkisilmukat-v1 (Soundly Pro, −23 LUFS, saumattomat) korvaa 20–45 s Freesound-esikuuntelut. Manifestin korvaa-kenttä
// nimeää vanhan polun; taulu on tässä kiinteänä, jotta vanhat manifestit (kaupunkimaisema-v1/-v2, pariisi-seine-v1) ja
// elava-kaupunki-v1:n kiinteä nimi pysyvät ennallaan ja vain latausosoite vaihtuu. Kyyhkyjen vanha polku on seine-manifestin
// todellinen "pariisi/kyyhkyt-kujerrus.mp3" (manifestin korvaa-kentässä piste).
using System;

namespace Matkakirja.Linssit.Aanet
{
    public static class KaupunkiSilmukat
    {
        public const string Kansio = "kaupunkisilmukat-v1/";

        /// <summary>Vanha polku aanet/-juuren alla → uusi tiedosto kaupunkisilmukat-v1:ssä.</summary>
        public static readonly (string Vanha, string Uusi)[] Korvaajat =
        {
            ("kaupunkimaisema-v2/pariisi/metro.mp3", "pariisi-metro-02.mp3"),
            ("kaupunkimaisema-v2/pariisi/tori.mp3", "pariisi-tori-02.mp3"),
            ("kaupunkimaisema-v2/tukholma/tori.mp3", "tukholma-tori-02.mp3"),
            ("kaupunkimaisema-v1/metro-01.mp3", "metro-02.mp3"),
            ("kaupunkimaisema-v1/raitiovaunu-02.mp3", "raitiovaunu-03.mp3"),
            ("pariisi-seine-v1/pariisi/kyyhkyt-kujerrus.mp3", "pariisi-kyyhkyt-02.mp3"),
            ("elava-kaupunki-v1/lokkiparvi.mp3", "lokkiparvi-02.mp3"),
        };

        /// <summary>Osoite, josta ääni ladataan: korvattu polku kaupunkisilmukat-v1:stä, muuten sama. Juuri = ".../aanet/".</summary>
        public static string Osoite(string url, string juuri)
        {
            if (string.IsNullOrEmpty(url) || string.IsNullOrEmpty(juuri) || !url.StartsWith(juuri, StringComparison.Ordinal)) return url;
            string polku = url.Substring(juuri.Length);
            foreach (var (vanha, uusi) in Korvaajat)
                if (polku == vanha) return juuri + Kansio + uusi;
            return url;
        }
    }
}
