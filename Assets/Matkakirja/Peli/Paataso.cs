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
// SKEEMA 1.26 (Siirtoseppä 24.9.2026): jokainen natiivin lukema raakakenttä on myös päätasolla.
// Kaikki lukijat lukevat ENSIN päätason kentän ja vasta sen puuttuessa raa'an datan: varareitti
// kulkee AINA tämän luokan kautta (Raaka, RaakaArvo, Nakyma, Olio, Yhdista), jotta RaakaKielletty
// katkaisee sen yhdestä kohdasta. Lukija ei saa lukea `data`-kenttää suoraan (pakettivartija
// listaa lukukohdat; tyokalut/tarkista.sh ei tätä valvo). 2.0 poistaa data-kentän ja varareitin.
//
// Pakettiskeema: lukijoiden tuntemat skeemaversiot. Uusi minor paketissa → vartija punainen,
// kunnes lukijat on käyty läpi ja SuurinMinor nostettu.
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

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
            ("id", "id"), ("kaupunki", "city"), ("generaattori", "generaattori"), ("kuvat", "kuvat"),
        };

        /// <summary>
        /// Reittialkio: a, b, askelia ← data.steps. Laji on aina päätasolla ("maa", "sea", "lento"; raaka
        /// data.type toistaa sen). Meren maksulla (data.fee) ei ole päätason kenttää: yksikään paketti ei
        /// sitä sisällä, joten lukija lukee sen vain raa'asta datasta (Raaka) ja muuten web SEA_FEE.
        /// </summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Reitti = new[]
        {
            ("a", "a"), ("b", "b"), ("askelia", "steps"),
        };

        /// <summary>Laattakokoelman alkio "tokens": maarat ← counts, tyypit ← types, mannerTyypit ← mannerTypes.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Laatat = new[]
        {
            ("maarat", "counts"), ("tyypit", "types"), ("mannerTyypit", "mannerTypes"),
        };

        /// <summary>Tarinakaaren alkio (web TARINAKAARI[id]); kysymys on oma olionsa (TarinakaariKysymys).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Tarinakaari = Samat(
            "kohtaaminen", "aarre", "nimi", "otsikko", "henkilo", "saapuminen", "tunneKohtaaminen", "tunneAarre", "mykistetyt");

        /// <summary>Tarinakaaren kysymys: päätaso {kysymys, vaihtoehdot, oikea, fakta} ← raaka {q, vaihtoehdot, oikea, fakta}.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> TarinakaariKysymys = new[]
        {
            ("kysymys", "q"), ("vaihtoehdot", "vaihtoehdot"), ("oikea", "oikea"), ("fakta", "fakta"),
        };

        /// <summary>Paikkatieto: teksti/aani/lahde/wiki ← data.text/voice/source/wiki (tai data merkkijonona = teksti).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Paikkatieto = new[]
        {
            ("teksti", "text"), ("aani", "voice"), ("lahde", "source"), ("wiki", "wiki"),
        };

        /// <summary>Kohtaamisalkio (web KOHTAAMISET[id]): samat nimet, kehys ← frame.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Kohtaaminen = Samat(
            "hahmo", "nappi", "tervehdys", "loyto", "tyhja", "vaarin", "tervehdysLuenta", "loytoLuenta",
            "tunneTervehdys", "tunneLoyto", "tunneTyhja", "tunneVaarin").Append(("kehys", "frame")).ToArray();

        /// <summary>
        /// Kohtaamiskuva: samat nimet. EI kaupunkia: päätason kaupunki on id, raa'an datan kaupunki on
        /// kaupungin nimi (lukija käyttää päätason id:tä; nimi ei ole enää avain).
        /// </summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Kohtaamiskuva = Samat(
            "tila", "kohde", "aktiivinen", "alt", "lyhyt", "kuvateksti", "kaytto", "hahmo", "maa", "hetki", "vihje");

        /// <summary>Paikallisaarre (pieniAarre/isoAarre): päätaso {nimi, fakta, kuva, url, varat} ← raaka {name, fakta, kuva}.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Paikallisaarre = new[]
        {
            ("nimi", "name"), ("fakta", "fakta"), ("kuva", "kuva"),
        };

        /// <summary>Eläintäky: samat nimet (päätason kuva on olio {arvo, url, …}, raaka kuva on polku).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Elaintaky = Samat(
            "elain", "otsikko", "teksti", "lahde", "lat", "lon", "nimio");

        /// <summary>Juliste: samat nimet (kuva.url ← data.tiedosto erikseen lukijassa).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Juliste = Samat("otsikko", "lyhyt", "selite");

        /// <summary>Saapumispuhe: url, teksti ← text, kesto ← duration, nimi ← name, iskulause ← slogan, sha256, yksiOtto ← singleTake.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Saapumispuhe = new[]
        {
            ("url", "url"), ("teksti", "text"), ("kesto", "duration"), ("nimi", "name"), ("iskulause", "slogan"),
            ("sha256", "sha256"), ("yksiOtto", "singleTake"),
        };

        /// <summary>Luento (kokoelma luennat): kentät ovat jo päätasolla; data-olio vain varalla.</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Luento = Samat(
            "id", "kaupunki", "url", "teksti", "paikkarivi", "kesto", "reaktiot", "reaktioHetket");

        /// <summary>Äänitaulun rivi (siirtyma, tilaraita, paikkaraita): samat nimet (v33: vielä vain raa'assa datassa).</summary>
        public static readonly IReadOnlyList<(string Uusi, string Vanha)> Aanitaulu = Samat(
            "ryhma", "ampari", "oma", "voima", "nousuMs", "laskuMs", "tunnus");

        /// <summary>Kentät, joilla päätason ja raa'an datan nimi on sama.</summary>
        public static (string Uusi, string Vanha)[] Samat(params string[] nimet)
        {
            var l = new (string, string)[nimet.Length];
            for (int i = 0; i < nimet.Length; i++) l[i] = (nimet[i], nimet[i]);
            return l;
        }

        /// <summary>Raaka data-olio tai null (ei dataa, data ei ole olio, tai RaakaKielletty). Ainoa raakareitti oliolle.</summary>
        public static Dictionary<string, object> Raaka(Dictionary<string, object> alkio) =>
            RaakaKielletty ? null : MiniJson.Kentta(alkio, "data") as Dictionary<string, object>;

        /// <summary>Raaka data sellaisenaan (esim. paikkatiedon merkkijono) tai null, kun RaakaKielletty.</summary>
        public static object RaakaArvo(Dictionary<string, object> alkio) =>
            RaakaKielletty ? null : MiniJson.Kentta(alkio, "data");

        /// <summary>
        /// Päätason näkymä: alkion omat kentät (ilman `data`-kenttää) päätason nimin. Puuttuva tai null
        /// päätason kenttä täydentyy raa'an datan vanhasta nimestä, kun raaka on sallittu (vanhat paketit).
        /// </summary>
        public static Dictionary<string, object> Nakyma(Dictionary<string, object> alkio, IReadOnlyList<(string Uusi, string Vanha)> kentat)
        {
            var tulos = new Dictionary<string, object>(alkio ?? new Dictionary<string, object>());
            tulos.Remove("data");
            var raaka = Raaka(alkio);
            if (raaka != null)
                foreach (var (uusi, vanha) in kentat)
                    if ((!tulos.TryGetValue(uusi, out var v) || v == null) && raaka.TryGetValue(vanha, out var r) && r != null)
                        tulos[uusi] = r;
            return tulos;
        }

        /// <summary>
        /// Päätason olio `uusi` sellaisenaan, tai (raaka sallittu) raa'an datan olio `vanha` päätason nimin
        /// (kentat: uusi ← vanha; ilman kenttiä kopio sellaisenaan). null, jos kumpaakaan ei ole.
        /// </summary>
        public static Dictionary<string, object> Olio(Dictionary<string, object> alkio, string uusi, string vanha,
            IReadOnlyList<(string Uusi, string Vanha)> kentat = null)
        {
            if (MiniJson.Kentta(alkio, uusi) is Dictionary<string, object> p) return p;
            if (!(MiniJson.Kentta(Raaka(alkio), vanha) is Dictionary<string, object> r)) return null;
            if (kentat == null) return r;
            var tulos = new Dictionary<string, object>();
            foreach (var (u, v) in kentat) if (r.TryGetValue(v, out var x)) tulos[u] = x;
            return tulos;
        }

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
        /// <summary>Uusin läpikäyty minor (koepaketti v33 = 1.26, 24.9.2026: kaikki raakakentät päätasolla).</summary>
        public const int SuurinMinor = 26;
        /// <summary>
        /// Ensimmäinen skeema, jossa jokainen natiivin lukema raakakenttä on päätasolla (koepaketti v33).
        /// Vanhempaa pakettia ei voi lukea raakakiellolla (vartija ajaa sen ilman kieltoa ja kertoo sen).
        /// </summary>
        public const string PaatasoTaysi = "1.26";

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

        /// <summary>Onko versio vähintään raja (sama major, minor ≥); jäsentymätön = false.</summary>
        public static bool Vahintaan(string versio, string raja) =>
            Jasenna(versio, out var a, out var b) && Jasenna(raja, out var c, out var d) && a == c && b >= d;

        /// <summary>Tunteeko lukija version (major sama, minor välillä PieninMinor–SuurinMinor).</summary>
        public static bool Tunnettu(string versio) =>
            Jasenna(versio, out var major, out var minor) && major == Major && minor >= PieninMinor && minor <= SuurinMinor;
    }
}
