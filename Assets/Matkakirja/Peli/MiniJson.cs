// Pieni riippuvuukseton JSON-jäsennin (Unityssä ei ole System.Text.Jsonia).
//
// Tulos: objekti → Dictionary<string, object>, taulukko → List<object>,
// numero → double, true/false → bool, null → null, merkkijono → string.
// Tukee merkkijonojen escapet \" \\ \/ \b \f \n \r \t ja \uXXXX (myös
// korvausparit, jotka jäävät C#-merkkijonoon sellaisinaan UTF-16:na).
// Virheellinen syöte heittää FormatExceptionin, jossa on merkin sijainti.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja.Peli
{
    public static class MiniJson
    {
        /// <summary>Jäsentää koko merkkijonon yhdeksi JSON-arvoksi.</summary>
        public static object Jasenna(string teksti)
        {
            if (teksti == null) throw new ArgumentNullException(nameof(teksti));
            var j = new Jasennin(teksti);
            j.OhitaValit();
            var arvo = j.Arvo();
            j.OhitaValit();
            if (j.Kohta != teksti.Length) throw j.Virhe("ylimääräistä tekstiä arvon jälkeen");
            return arvo;
        }

        // --- apurit jäsennetyn puun lukemiseen --------------------------------

        public static Dictionary<string, object> Objekti(object arvo) =>
            arvo as Dictionary<string, object> ?? throw new FormatException("odotettiin objektia");

        public static List<object> Taulukko(object arvo) =>
            arvo as List<object> ?? throw new FormatException("odotettiin taulukkoa");

        // --- null-turvalliset luvut (kenttä voi puuttua paketista) ------------
        // Objekti ja Taulukko heittävät tarkoituksella (tallennus, reitit: rikkinäinen
        // syöte on virhe). Sisältökokoelmissa puuttuva kenttä tai rikkinäinen alkio
        // ei saa kaataa koko luetteloa: niihin nämä.

        /// <summary>Objekti tai null (arvo null tai muu kuin objekti); ei heitä.</summary>
        public static Dictionary<string, object> ObjektiTaiNull(object arvo) => arvo as Dictionary<string, object>;

        /// <summary>Taulukko tai tyhjä lista (arvo null tai muu kuin taulukko); ei heitä.</summary>
        public static List<object> TaulukkoTaiTyhja(object arvo) => arvo as List<object> ?? new List<object>();

        /// <summary>
        /// Kokoelman alkiot ({ alkiot: [ {…}, … ] }) objekteina. Puuttuva tai null
        /// alkiot-kenttä = ei alkioita, ja muut kuin objektialkiot ohitetaan.
        /// Virheellinen JSON heittää yhä (Jasenna).
        /// </summary>
        public static IEnumerable<Dictionary<string, object>> Alkiot(string json)
        {
            var juuri = ObjektiTaiNull(Jasenna(json));
            foreach (var a in TaulukkoTaiTyhja(Kentta(juuri, "alkiot")))
                if (a is Dictionary<string, object> o) yield return o;
        }

        /// <summary>Kentän arvo tai null, jos kenttää ei ole.</summary>
        public static object Kentta(Dictionary<string, object> o, string nimi) =>
            o != null && o.TryGetValue(nimi, out var v) ? v : null;

        public static string Teksti(Dictionary<string, object> o, string nimi) => Kentta(o, nimi) as string;

        public static double? Luku(Dictionary<string, object> o, string nimi) =>
            Kentta(o, nimi) is double d ? d : (double?)null;

        public static bool Totuus(Dictionary<string, object> o, string nimi, bool oletus = false) =>
            Kentta(o, nimi) is bool b ? b : oletus;

        sealed class Jasennin
        {
            readonly string s;
            public int Kohta;
            public Jasennin(string s) { this.s = s; }

            public FormatException Virhe(string syy) => new FormatException($"JSON-virhe kohdassa {Kohta}: {syy}");

            public void OhitaValit()
            {
                while (Kohta < s.Length)
                {
                    char c = s[Kohta];
                    if (c == ' ' || c == '\t' || c == '\n' || c == '\r') Kohta++;
                    else break;
                }
            }

            public object Arvo()
            {
                if (Kohta >= s.Length) throw Virhe("odottamaton loppu");
                char c = s[Kohta];
                switch (c)
                {
                    case '{': return Olio();
                    case '[': return Lista();
                    case '"': return Merkkijono();
                    case 't': Sana("true"); return true;
                    case 'f': Sana("false"); return false;
                    case 'n': Sana("null"); return null;
                    default:
                        if (c == '-' || (c >= '0' && c <= '9')) return Numero();
                        throw Virhe($"odottamaton merkki '{c}'");
                }
            }

            void Sana(string sana)
            {
                if (string.CompareOrdinal(s, Kohta, sana, 0, sana.Length) != 0) throw Virhe("odotettiin " + sana);
                Kohta += sana.Length;
            }

            Dictionary<string, object> Olio()
            {
                var o = new Dictionary<string, object>();
                Kohta++; // {
                OhitaValit();
                if (Kohta < s.Length && s[Kohta] == '}') { Kohta++; return o; }
                while (true)
                {
                    OhitaValit();
                    if (Kohta >= s.Length || s[Kohta] != '"') throw Virhe("odotettiin avainta");
                    var avain = Merkkijono();
                    OhitaValit();
                    if (Kohta >= s.Length || s[Kohta] != ':') throw Virhe("odotettiin ':'");
                    Kohta++;
                    OhitaValit();
                    o[avain] = Arvo(); // kuten JSON.parse: viimeinen samanniminen voittaa
                    OhitaValit();
                    if (Kohta >= s.Length) throw Virhe("odottamaton loppu objektissa");
                    if (s[Kohta] == ',') { Kohta++; continue; }
                    if (s[Kohta] == '}') { Kohta++; return o; }
                    throw Virhe("odotettiin ',' tai '}'");
                }
            }

            List<object> Lista()
            {
                var l = new List<object>();
                Kohta++; // [
                OhitaValit();
                if (Kohta < s.Length && s[Kohta] == ']') { Kohta++; return l; }
                while (true)
                {
                    OhitaValit();
                    l.Add(Arvo());
                    OhitaValit();
                    if (Kohta >= s.Length) throw Virhe("odottamaton loppu taulukossa");
                    if (s[Kohta] == ',') { Kohta++; continue; }
                    if (s[Kohta] == ']') { Kohta++; return l; }
                    throw Virhe("odotettiin ',' tai ']'");
                }
            }

            string Merkkijono()
            {
                Kohta++; // "
                StringBuilder sb = null;
                int alku = Kohta;
                while (true)
                {
                    if (Kohta >= s.Length) throw Virhe("päättymätön merkkijono");
                    char c = s[Kohta];
                    if (c == '"')
                    {
                        string tulos = sb == null ? s.Substring(alku, Kohta - alku) : sb.Append(s, alku, Kohta - alku).ToString();
                        Kohta++;
                        return tulos;
                    }
                    if (c < 0x20) throw Virhe("ohjausmerkki merkkijonossa");
                    if (c != '\\') { Kohta++; continue; }

                    sb ??= new StringBuilder();
                    sb.Append(s, alku, Kohta - alku);
                    Kohta++;
                    if (Kohta >= s.Length) throw Virhe("päättymätön escape");
                    char e = s[Kohta++];
                    switch (e)
                    {
                        case '"': sb.Append('"'); break;
                        case '\\': sb.Append('\\'); break;
                        case '/': sb.Append('/'); break;
                        case 'b': sb.Append('\b'); break;
                        case 'f': sb.Append('\f'); break;
                        case 'n': sb.Append('\n'); break;
                        case 'r': sb.Append('\r'); break;
                        case 't': sb.Append('\t'); break;
                        case 'u':
                            if (Kohta + 4 > s.Length) throw Virhe("lyhyt \\u-escape");
                            int koodi = 0;
                            for (int i = 0; i < 4; i++)
                            {
                                int h = Heksa(s[Kohta + i]);
                                if (h < 0) throw Virhe("virheellinen \\u-escape");
                                koodi = koodi * 16 + h;
                            }
                            Kohta += 4;
                            sb.Append((char)koodi);
                            break;
                        default: throw Virhe($"tuntematon escape \\{e}");
                    }
                    alku = Kohta;
                }
            }

            static int Heksa(char c)
            {
                if (c >= '0' && c <= '9') return c - '0';
                if (c >= 'a' && c <= 'f') return c - 'a' + 10;
                if (c >= 'A' && c <= 'F') return c - 'A' + 10;
                return -1;
            }

            double Numero()
            {
                int alku = Kohta;
                if (s[Kohta] == '-') Kohta++;
                if (Kohta >= s.Length) throw Virhe("keskeneräinen numero");
                if (s[Kohta] == '0') Kohta++;
                else if (s[Kohta] >= '1' && s[Kohta] <= '9') { while (Kohta < s.Length && s[Kohta] >= '0' && s[Kohta] <= '9') Kohta++; }
                else throw Virhe("virheellinen numero");
                if (Kohta < s.Length && s[Kohta] == '.')
                {
                    Kohta++;
                    int n = Kohta;
                    while (Kohta < s.Length && s[Kohta] >= '0' && s[Kohta] <= '9') Kohta++;
                    if (Kohta == n) throw Virhe("desimaalipisteen jälkeen ei numeroita");
                }
                if (Kohta < s.Length && (s[Kohta] == 'e' || s[Kohta] == 'E'))
                {
                    Kohta++;
                    if (Kohta < s.Length && (s[Kohta] == '+' || s[Kohta] == '-')) Kohta++;
                    int n = Kohta;
                    while (Kohta < s.Length && s[Kohta] >= '0' && s[Kohta] <= '9') Kohta++;
                    if (Kohta == n) throw Virhe("eksponentista puuttuu numerot");
                }
                return double.Parse(s.Substring(alku, Kohta - alku), NumberStyles.Float, CultureInfo.InvariantCulture);
            }
        }
    }
}
