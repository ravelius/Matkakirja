// PASSI: pelaajan vihreä passi ja sen leimat suorana porttina verkkopelin
// js/passport.js:stä (readStamps, stampBoard, writeStamps, stampList,
// isoDate, stampDate). Kultainen jälki Kultaiset/linssijalki.json (osa
// "passi", Kultaiset/tee-linssijalki.mjs) vaatii saman JSON-tekstin ja saman
// listajärjestyksen joka teon jälkeen.
//
// PASSI ON PELAAJAN OMA, EI PELIN: leimat säilyvät pelikerrasta toiseen ja
// jäävät, vaikka peli aloitettaisiin alusta. Siksi passi EI kuulu
// pelitallennukseen (Pelitila), vaan sillä on oma tallennuspaikkansa (web
// localStorage 'matkakirja.passi.v1', jonka iOS-kuori synkkaa iCloudiin).
// Tallennuspaikka on Unity-kerroksen asia: tämä luokka tarjoaa vain
// JSON-rajapinnan (Lue / Kirjoita) ja Muuttui-tapahtuman, jonka kuulija
// kirjoittaa passin levylle.
//
// Leimat ovat litteä avaintaulu avain → {label, date}. Avaimet ovat
// laudan tunnus (lautaleima), 'kunnia:<lauta>', 'linssi:<tunnus>',
// 'hyvitys:<tunnus>' ja 'nahty:<tunnus>' (Peli/Linssiomistus.cs).
//
// POIKKEAMAT: web lukee passin joka kutsulla localStoragesta; täällä passi
// on olio, joka luetaan kerran (Lue) ja kirjoitetaan muutoksesta. Rikkinäinen
// tai muu kuin olio-JSON luetaan tyhjäksi kuten webissä. Leima, jonka arvo ei
// ole olio (web ei koskaan kirjoita sellaista), ohitetaan luettaessa.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Yksi leima (web {label, date}).</summary>
    public sealed class Leima
    {
        /// <summary>Näytettävä nimi (web label).</summary>
        public string Nimi;
        /// <summary>Ensimmäisen käynnin päivä YYYY-MM-DD (web date).</summary>
        public string Paiva;
    }

    /// <summary>Leima listana näyttöä varten (web stampList: {packId, label, date}).</summary>
    public sealed class Leimarivi
    {
        public string Avain;
        public string Nimi;
        public string Paiva;
    }

    public sealed class Passi
    {
        /// <summary>Web STAMP_KEY: tallennusavain (iOS-kuoren iCloud-synkka käyttää samaa).</summary>
        public const string TallennusAvain = "matkakirja.passi.v1";

        // Lisäysjärjestys kuten JS-olion avaimet (JSON.stringify ja stampList tasapelissä).
        readonly List<string> avaimet = new List<string>();
        readonly Dictionary<string, Leima> leimat = new Dictionary<string, Leima>(StringComparer.Ordinal);

        /// <summary>Tämän päivän lähde leimoille (web new Date()). Testit kiinnittävät.</summary>
        public Func<DateTime> Kello = () => DateTime.Now;

        /// <summary>Passi muuttui: kuulija (Unity-kerros) tallentaa Kirjoita()-tekstin.</summary>
        public event Action Muuttui;

        /// <summary>Avaimet lisäysjärjestyksessä (web Object.keys(readStamps())).</summary>
        public IReadOnlyList<string> Avaimet => avaimet;

        /// <summary>Onko avaimella leima (web Boolean(readStamps()[avain])).</summary>
        public bool Leimattu(string avain) => avain != null && leimat.ContainsKey(avain);

        /// <summary>Avaimen leima tai null.</summary>
        public Leima Leima(string avain) => avain != null && leimat.TryGetValue(avain, out var l) ? l : null;

        /// <summary>
        /// Web readStamps: passi JSON-tekstistä. null, tyhjä, rikkinäinen tai
        /// muu kuin olio → tyhjä passi (peli jatkuu).
        /// </summary>
        public static Passi Lue(string json)
        {
            var p = new Passi();
            if (string.IsNullOrEmpty(json)) return p;
            Dictionary<string, object> o;
            try { o = MiniJson.Jasenna(json) as Dictionary<string, object>; }
            catch (Exception) { return p; }
            if (o == null) return p;
            foreach (var kv in o)
            {
                if (!(kv.Value is Dictionary<string, object> arvo)) continue;
                p.Lisaa(kv.Key, new Leima { Nimi = MiniJson.Teksti(arvo, "label"), Paiva = MiniJson.Teksti(arvo, "date") });
            }
            return p;
        }

        /// <summary>Passi JSON-tekstinä (web JSON.stringify(stamps)): tallennettava sellaisenaan.</summary>
        public string Kirjoita()
        {
            var sb = new StringBuilder();
            sb.Append('{');
            for (int i = 0; i < avaimet.Count; i++)
            {
                if (i > 0) sb.Append(',');
                var l = leimat[avaimet[i]];
                sb.Append(JsonTeksti(avaimet[i])).Append(":{");
                bool eka = true;
                // JSON.stringify jättää undefined-kentät pois.
                if (l.Nimi != null) { sb.Append("\"label\":").Append(JsonTeksti(l.Nimi)); eka = false; }
                if (l.Paiva != null) { if (!eka) sb.Append(','); sb.Append("\"date\":").Append(JsonTeksti(l.Paiva)); }
                sb.Append('}');
            }
            return sb.Append('}').ToString();
        }

        /// <summary>
        /// Web stampBoard: leimaa avaimen, jos sillä ei vielä ole leimaa.
        /// Palauttaa true, kun leima on uusi (silloin sen voi näyttää pelaajalle).
        /// </summary>
        public bool Leimaa(string avain, string nimi, DateTime paiva)
        {
            if (avain == null || leimat.ContainsKey(avain)) return false;
            Lisaa(avain, new Leima { Nimi = nimi, Paiva = IsoPaiva(paiva) });
            Muuttui?.Invoke();
            return true;
        }

        /// <summary>Web stampBoard(avain, nimi): päivä Kellosta.</summary>
        public bool Leimaa(string avain, string nimi) => Leimaa(avain, nimi, Kello());

        /// <summary>
        /// Web writeStamps: koko kokoelma kerralla (iCloud-synkka yhdistää toisen
        /// laitteen leimat). null = tyhjä passi.
        /// </summary>
        public void Korvaa(IEnumerable<KeyValuePair<string, Leima>> uudet)
        {
            avaimet.Clear();
            leimat.Clear();
            if (uudet != null)
                foreach (var kv in uudet)
                    if (kv.Key != null && kv.Value != null) Lisaa(kv.Key, new Leima { Nimi = kv.Value.Nimi, Paiva = kv.Value.Paiva });
            Muuttui?.Invoke();
        }

        /// <summary>Web stampList: leimat vanhimmasta uusimpaan (vakaa: sama päivä lisäysjärjestyksessä).</summary>
        public List<Leimarivi> Lista() =>
            avaimet.Select(a => new Leimarivi { Avain = a, Nimi = leimat[a].Nimi, Paiva = leimat[a].Paiva })
                .OrderBy(r => r.Paiva ?? "", StringComparer.Ordinal).ToList();

        /// <summary>Web isoDate: päivä muodossa YYYY-MM-DD (annetun ajan kalenteripäivä).</summary>
        public static string IsoPaiva(DateTime paiva) =>
            paiva.Year.ToString(CultureInfo.InvariantCulture) + "-"
            + paiva.Month.ToString("00", CultureInfo.InvariantCulture) + "-"
            + paiva.Day.ToString("00", CultureInfo.InvariantCulture);

        /// <summary>Web stampDate: '2026-07-27' → '27.7.2026'.</summary>
        public static string LeimaPaiva(string iso)
        {
            var osat = (iso ?? "").Split('-');
            if (osat.Length < 3) return iso;
            string Luku(string s) => int.TryParse(s, NumberStyles.Integer, CultureInfo.InvariantCulture, out var n)
                ? n.ToString(CultureInfo.InvariantCulture) : "NaN";
            return $"{Luku(osat[2])}.{Luku(osat[1])}.{osat[0]}";
        }

        void Lisaa(string avain, Leima l)
        {
            if (!leimat.ContainsKey(avain)) avaimet.Add(avain);
            leimat[avain] = l;
        }

        /// <summary>JSON-merkkijono kuten JSON.stringify (\b \f \n \r \t, muut ohjausmerkit \u00xx).</summary>
        internal static string JsonTeksti(string s)
        {
            var sb = new StringBuilder(s.Length + 2);
            sb.Append('"');
            foreach (var c in s)
            {
                switch (c)
                {
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    case '\b': sb.Append("\\b"); break;
                    case '\f': sb.Append("\\f"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    default:
                        if (c < 0x20) sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture));
                        else sb.Append(c);
                        break;
                }
            }
            return sb.Append('"').ToString();
        }
    }
}
