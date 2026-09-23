// PELITILA: verkkopelin js/game.js Game-olion matkaa koskeva osa puhtaana
// datana (pelaajat, vaihe, noppa, kulkutapa, kello) sekä tallennus omaan
// yksinkertaiseen JSON-muotoon ja takaisin (MiniJson).
//
// Säännöt ovat Peli/Matka.cs:ssä; tämä tiedosto ei päätä mitään, vaan
// pitää kirjaa. Tämän erän laajuus: yksinpeli (roaming), matkustus, raha
// ja aika. Laatat, kysymykset, kaksintaistelut, XP ja pulmat tulevat
// myöhemmissä erissä omiin kenttiinsä (tallennusversio nousee silloin).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Pelaaja (web players[i]): tämän erän kentät.</summary>
    public sealed class Pelaaja
    {
        public int Id;
        public string Nimi;
        public int Raha = Vakiot.AloitusRaha;     // web money
        public Sijainti Sijainti;                // web pos
        public string Aloitus;                   // web start
        /// <summary>Käydyt kaupungit (web world.visited; yksi lauta).</summary>
        public HashSet<string> Kaydyt = new HashSet<string>();
    }

    /// <summary>Pelin tila (web Game): matkan kentät ja kello.</summary>
    public sealed class Pelitila
    {
        public const int TallennusVersio = 1;

        public List<Pelaaja> Pelaajat = new List<Pelaaja>();
        public int Vuorossa;                                   // web current
        public Pelaaja Pelaaja => Pelaajat[Vuorossa];          // web player

        public Vaihe Vaihe = Vaihe.Toiminta;                   // web phase
        /// <summary>Kierroslaskuri ykkösestä (web turnCount). Kello johdetaan tästä.</summary>
        public int VuoroLaskuri = 1;
        public int? Noppa;                                     // web die
        /// <summary>Lailliset siirrot heiton jälkeen (web moves). Ei tallenneta: lasketaan latauksessa.</summary>
        public IReadOnlyDictionary<string, Siirto> Siirrot;
        public Kulkutapa? Kulkutapa;                           // web travelMode
        /// <summary>Peli valitsi ainoan noppatavan pelaajan puolesta (web autoTravel).</summary>
        public bool AutoMatka;
        /// <summary>Matka kesken reitillä: heitto ilman nappia (web jatkaAutomaattisesti). Ei tallenneta.</summary>
        public bool JatkaAutomaattisesti;
        /// <summary>Laivalippu, joka veloitetaan siirrossa (web pendingFare).</summary>
        public int OdottavaMaksu;
        /// <summary>Viimeisimmän siirron askelpolku animaatiolle (web lastPath). Ei tallenneta.</summary>
        public List<Sijainti> ViimePolku;

        /// <summary>Satunnaislähteen siemen ja kulutus tallennusta varten (web seed, rngCalls).</summary>
        public uint Siemen;
        public long Arvontoja;

        // --- aika (web elapsedHours, dayCount, timeOfDay) -------------------

        /// <summary>Kuluneet tunnit matkan alusta; ensimmäinen vuoro on hetki nolla.</summary>
        public int Tunnit() => (VuoroLaskuri - 1) * Vakiot.VuoronTunnit;

        /// <summary>Matkapäivä ykkösestä alkaen.</summary>
        public int Paiva() => Tunnit() / 24 + 1;

        /// <summary>Vuorokaudenaika (web timeOfDayName: &lt;6 aamu, &lt;12 keskipäivä, &lt;18 ilta, muuten yö).</summary>
        public Vuorokaudenaika Vuorokaudenaika()
        {
            int tunti = Tunnit() % 24;
            if (tunti < 6) return Peli.Vuorokaudenaika.Aamu;
            if (tunti < 12) return Peli.Vuorokaudenaika.Keskipaiva;
            if (tunti < 18) return Peli.Vuorokaudenaika.Ilta;
            return Peli.Vuorokaudenaika.Yo;
        }

        // --- tallennus ------------------------------------------------------

        /// <summary>
        /// Tila JSON-tekstinä. Kentät ovat tämän erän omia (ei webin
        /// toJSON-muoto): versio, siemen, arvontoja, vuorossa, vaihe,
        /// vuoroLaskuri, noppa, kulkutapa, autoMatka, odottavaMaksu, pelaajat.
        /// Sijainti tallennetaan avaimena (web posKey).
        /// </summary>
        public string ToJson()
        {
            var sb = new StringBuilder();
            sb.Append('{');
            Kentta(sb, "versio", TallennusVersio.ToString(CultureInfo.InvariantCulture), true);
            Kentta(sb, "siemen", Siemen.ToString(CultureInfo.InvariantCulture));
            Kentta(sb, "arvontoja", Arvontoja.ToString(CultureInfo.InvariantCulture));
            Kentta(sb, "vuorossa", Vuorossa.ToString(CultureInfo.InvariantCulture));
            Kentta(sb, "vaihe", Teksti(Vaihe.ToString()));
            Kentta(sb, "vuoroLaskuri", VuoroLaskuri.ToString(CultureInfo.InvariantCulture));
            Kentta(sb, "noppa", Noppa.HasValue ? Noppa.Value.ToString(CultureInfo.InvariantCulture) : "null");
            Kentta(sb, "kulkutapa", Kulkutapa.HasValue ? Teksti(Kulkutapa.Value.ToString()) : "null");
            Kentta(sb, "autoMatka", AutoMatka ? "true" : "false");
            Kentta(sb, "odottavaMaksu", OdottavaMaksu.ToString(CultureInfo.InvariantCulture));
            sb.Append(",\"pelaajat\":[");
            for (int i = 0; i < Pelaajat.Count; i++)
            {
                var p = Pelaajat[i];
                if (i > 0) sb.Append(',');
                sb.Append('{');
                Kentta(sb, "id", p.Id.ToString(CultureInfo.InvariantCulture), true);
                Kentta(sb, "nimi", Teksti(p.Nimi));
                Kentta(sb, "raha", p.Raha.ToString(CultureInfo.InvariantCulture));
                Kentta(sb, "sijainti", Teksti(p.Sijainti.Avain));
                Kentta(sb, "aloitus", Teksti(p.Aloitus));
                // Järjestetty, jotta sama tila antaa aina saman tekstin.
                var kaydyt = p.Kaydyt.OrderBy(k => k, StringComparer.Ordinal).Select(Teksti);
                sb.Append(",\"kaydyt\":[").Append(string.Join(",", kaydyt)).Append(']');
                sb.Append('}');
            }
            sb.Append("]}");
            return sb.ToString();
        }

        /// <summary>
        /// Lukee ToJsonin tekstin. Siirrot ja JatkaAutomaattisesti johdetaan
        /// vasta Matkan latauksessa (web fromJSON), koska ne tarvitsevat verkon.
        /// </summary>
        public static Pelitila FromJson(string json)
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            var versio = (int)(MiniJson.Luku(o, "versio") ?? 0);
            if (versio != TallennusVersio) throw new FormatException($"tuntematon tallennusversio {versio}");
            var t = new Pelitila
            {
                Siemen = (uint)(MiniJson.Luku(o, "siemen") ?? 0),
                Arvontoja = (long)(MiniJson.Luku(o, "arvontoja") ?? 0),
                Vuorossa = (int)(MiniJson.Luku(o, "vuorossa") ?? 0),
                Vaihe = (Vaihe)Enum.Parse(typeof(Vaihe), MiniJson.Teksti(o, "vaihe")),
                VuoroLaskuri = (int)(MiniJson.Luku(o, "vuoroLaskuri") ?? 1),
                Noppa = MiniJson.Luku(o, "noppa") is double n ? (int)n : (int?)null,
                Kulkutapa = MiniJson.Teksti(o, "kulkutapa") is string k
                    ? (Kulkutapa)Enum.Parse(typeof(Kulkutapa), k) : (Kulkutapa?)null,
                AutoMatka = MiniJson.Totuus(o, "autoMatka"),
                OdottavaMaksu = (int)(MiniJson.Luku(o, "odottavaMaksu") ?? 0),
            };
            foreach (var po in MiniJson.Taulukko(MiniJson.Kentta(o, "pelaajat")))
            {
                var pd = MiniJson.Objekti(po);
                var p = new Pelaaja
                {
                    Id = (int)(MiniJson.Luku(pd, "id") ?? 0),
                    Nimi = MiniJson.Teksti(pd, "nimi"),
                    Raha = (int)(MiniJson.Luku(pd, "raha") ?? 0),
                    Sijainti = LueSijainti(MiniJson.Teksti(pd, "sijainti")),
                    Aloitus = MiniJson.Teksti(pd, "aloitus"),
                };
                foreach (var kay in MiniJson.Taulukko(MiniJson.Kentta(pd, "kaydyt") ?? new List<object>()))
                    p.Kaydyt.Add((string)kay);
                t.Pelaajat.Add(p);
            }
            if (t.Pelaajat.Count == 0) throw new FormatException("tallennuksessa ei ole pelaajia");
            return t;
        }

        /// <summary>Sijainti avaimesta "c:id" tai "e:a|b:idx" (web posKey käänteisenä).</summary>
        public static Sijainti LueSijainti(string avain)
        {
            if (avain == null) throw new FormatException("sijainti puuttuu");
            if (avain.StartsWith("c:", StringComparison.Ordinal))
                return Sijainti.KaupungissaSijainti(avain.Substring(2));
            int viim = avain.LastIndexOf(':');
            if (!avain.StartsWith("e:", StringComparison.Ordinal) || viim <= 2)
                throw new FormatException($"tuntematon sijainti '{avain}'");
            return Sijainti.ReitillaSijainti(avain.Substring(2, viim - 2),
                int.Parse(avain.Substring(viim + 1), CultureInfo.InvariantCulture));
        }

        static void Kentta(StringBuilder sb, string nimi, string arvo, bool ensimmainen = false)
        {
            if (!ensimmainen) sb.Append(',');
            sb.Append('"').Append(nimi).Append("\":").Append(arvo);
        }

        /// <summary>JSON-merkkijono lainausmerkkeineen; null → null.</summary>
        static string Teksti(string s)
        {
            if (s == null) return "null";
            var sb = new StringBuilder(s.Length + 2);
            sb.Append('"');
            foreach (var c in s)
            {
                switch (c)
                {
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
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
