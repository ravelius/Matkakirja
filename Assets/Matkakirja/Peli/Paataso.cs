// PAKETIN PÄÄTASON KENTÄT (skeema 1.19, Siirtosepän 2.0-polku 23.9.2026): kysymysten ja pulmien
// pelin lukemat kentät ovat alkion päätasolla suomeksi (kysymys, vaihtoehdot, oikea, …), ja raaka
// `data` (verkkopelin moduulin olio) poistuu myöhemmin. Lukija ottaa päätason kentän, kun se on,
// ja muuten raa'an datan kentän: sama koodi lukee vanhat (≤ 1.18) ja uudet paketit.
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public static class Paataso
    {
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
        /// lukijat toimivat sellaisinaan. Alkio ilman dataa (lähdemoduulin muoto tai data poistettu):
        /// alkion omat kentät pohjana. Päätason null ei ylikirjoita.
        /// </summary>
        public static Dictionary<string, object> Yhdista(Dictionary<string, object> alkio, IReadOnlyList<(string Uusi, string Vanha)> kentat)
        {
            var tulos = MiniJson.Kentta(alkio, "data") is Dictionary<string, object> d
                ? new Dictionary<string, object>(d) : new Dictionary<string, object>(alkio);
            foreach (var (uusi, vanha) in kentat)
                if (alkio.TryGetValue(uusi, out var arvo) && arvo != null) tulos[vanha] = arvo;
            return tulos;
        }
    }
}
