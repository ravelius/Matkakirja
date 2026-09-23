// PAKETIN PÄÄTASON KENTÄT (skeema 1.19, Siirtosepän 2.0-polku 23.9.2026): kysymysten ja pulmien
// pelin lukemat kentät ovat alkion päätasolla suomeksi (kysymys, vaihtoehdot, oikea, …), ja raaka
// `data` (verkkopelin moduulin olio) poistuu myöhemmin. Lukija ottaa päätason kentän, kun se on,
// ja muuten raa'an datan kentän: sama koodi lukee vanhat (≤ 1.18) ja uudet paketit.
//
// VAIHE 2 (pakettivartija, Fable 23.9.2026): RaakaKielletty = true poistaa raa'an datan
// varareitin (Yhdista ei enää kopioi `data`-oliota). Oletus false. Vartija
// (Peli-testit/Testit/Pakettivartija.cs) käyttää samaa kytkintä ja listaa kaikki lukijat, jotka
// vielä lukevat `data`-kenttää päätason ohi (myös ne, jotka eivät kulje Yhdistan kautta).
//
// Pakettiskeema: lukijoiden tuntemat skeemaversiot. Uusi minor paketissa → vartija punainen,
// kunnes lukijat on käyty läpi ja SuurinMinor nostettu.
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Peli
{
    public static class Paataso
    {
        /// <summary>
        /// Vaihe 2: tosi = raakaa `data`-oliota ei lueta päätason ohi (vain alkion omat kentät).
        /// Oletus epätosi (nykyiset paketit ≤ 1.18 tarvitsevat raa'an datan).
        /// </summary>
        public static bool RaakaKielletty;

        /// <summary>Kysymysalkion päätason kenttä → raa'an datan kenttä (web {q, options, correct, …}).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Kysymys = new[]
        {
            ("kysymys", "q"), ("vaihtoehdot", "options"), ("oikea", "correct"), ("taso", "level"),
            ("vihje", "hint"), ("fakta", "fact"), ("lahde", "source"), ("paikka", "place"),
        };

        /// <summary>Pulma-alkion päätason kenttä → raa'an datan kenttä (web pulmamoduuli).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Pulma = new[]
        {
            ("otsikko", "title"), ("selite", "selite"), ("vihje", "hint"), ("kysymys", "q"),
            ("vaihtoehdot", "options"), ("oikea", "correct"), ("fakta", "fact"), ("lahde", "source"),
            ("luonnos", "sketch"), ("kuvaLahteet", "kuvaLahteet"),
        };

        /// <summary>
        /// Raaka data (kopio) päätason kentillä ylikirjoitettuna vanhoin nimin, jotta olemassa olevat
        /// lukijat toimivat sellaisinaan. Alkio ilman dataa (lähdemoduulin muoto tai data poistettu)
        /// tai RaakaKielletty: alkion omat kentät pohjana (ilman `data`-kenttää). Päätason null ei ylikirjoita.
        /// </summary>
        public static Dictionary<string, object> Yhdista(Dictionary<string, object> alkio, IReadOnlyList<(string Uusi, string Vanha)> kentat)
        {
            Dictionary<string, object> tulos;
            if (!RaakaKielletty && MiniJson.Kentta(alkio, "data") is Dictionary<string, object> d)
                tulos = new Dictionary<string, object>(d);
            else
            {
                tulos = new Dictionary<string, object>(alkio);
                tulos.Remove("data");
            }
            foreach (var (uusi, vanha) in kentat)
                if (alkio.TryGetValue(uusi, out var arvo) && arvo != null) tulos[vanha] = arvo;
            return tulos;
        }
    }

    /// <summary>
    /// Sisältöpaketin skeemaversiot, jotka natiivin lukijat tuntevat (osoitin/manifest `skeemaversio`
    /// "major.minor", vertailu numeroina: 1.10 > 1.9). Tuntematon versio = pakettivartija punainen.
    /// </summary>
    public static class Pakettiskeema
    {
        public const int Major = 1;
        /// <summary>Vanhin luettava minor (Kultaiset/paketti = 1.1).</summary>
        public const int PieninMinor = 1;
        /// <summary>Uusin läpikäyty minor (koepaketti v30 = 1.24, 23.9.2026).</summary>
        public const int SuurinMinor = 24;

        /// <summary>"1.10" → (1, 10); muu muoto → false.</summary>
        public static bool Jasenna(string versio, out int major, out int minor)
        {
            major = minor = -1;
            if (string.IsNullOrEmpty(versio)) return false;
            var osat = versio.Split('.');
            return osat.Length == 2
                && int.TryParse(osat[0], NumberStyles.None, CultureInfo.InvariantCulture, out major)
                && int.TryParse(osat[1], NumberStyles.None, CultureInfo.InvariantCulture, out minor);
        }

        /// <summary>Tunteeko lukija version (major sama, minor välillä PieninMinor–SuurinMinor).</summary>
        public static bool Tunnettu(string versio) =>
            Jasenna(versio, out var major, out var minor) && major == Major && minor >= PieninMinor && minor <= SuurinMinor;
    }
}
