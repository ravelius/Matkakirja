// PELITILA: verkkopelin js/game.js Game-olion matkaa koskeva osa puhtaana
// datana (pelaajat, vaihe, noppa, kulkutapa, kello) sekä tallennus omaan
// yksinkertaiseen JSON-muotoon ja takaisin (MiniJson).
//
// Säännöt ovat Peli/Matka.cs:ssä ja Peli/Kysely.cs:ssä; tämä tiedosto ei
// päätä mitään, vaan pitää kirjaa. Erä 1: yksinpeli (roaming), matkustus,
// raha ja aika. Erä 2 (tallennusversio 2): tietäjäpisteet ja tietoprosentin
// laskurit pelaajalle sekä kysymysmoottorin tila (Kyselytila: käytetyt
// kysymykset, tutkitut, kohtaamiset, aarrelukot, avoin kysymys).
// Erä 3 (tallennusversio 3): aarrelaatat (Laattamaailma: laatat, käännetyt,
// löydetyt pääaarteet Map-järjestyksessä), pelaajan tähdet ja löydöt
// (finds, findManner, findMaa),
// ennätys (recordNoted, recordMark.day) ja pöllöliput. Samaan versioon
// valinnaisina: nähdyt pulmat (puzzlesSeen) ja avoin tapahtumakortti (eventCard).
// Versiot 1 ja 2 latautuvat; niissä ei ole laattoja (ks. Matka.Lataa).
// Versio 4 (23.9.2026, versionosto): versioon 3 ilman nostoa tulleet kentät
// (kaupat, voittaja, avoinKaksintaistelu, pulmatNahty, tapahtumakortti) ovat
// nyt version sisältöä. Nosto estää vanhempaa sovellusta lukemasta uutta
// tallennusta ja hävittämästä sen kenttiä hiljaa seuraavassa tallennuksessa:
// uudempi versio heittää UudempiTallennus-poikkeuksen (PeliOhjain säilyttää
// tiedoston). VERSIOPOLKU: uusi kenttä tai merkityksen muutos = uusi versio,
// askel Paivita-metodiin ja testi (Peli-testit/Testit/TallennusTestit.cs).
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
        /// <summary>Tietäjäpisteet (web xp). Lisäys vain Kokemus.Anna-portin kautta.</summary>
        public int Xp;
        /// <summary>Kysytyt ja oikein vastatut (web quizAsked, quizCorrect): tietoprosentti.</summary>
        public int Kysytty;
        public int Oikein;
        /// <summary>Kysymysten taso (web quizLevel: 'easy' → Helppo, muuten Perus).</summary>
        public Vaikeustaso Taso = Vaikeustaso.Perus;
        /// <summary>Tekoälypelaaja (web isBot): ei kohtaamisia eikä tasokuplia.</summary>
        public bool Botti;
        /// <summary>Kannetut unohdetut aarteet (web stars).</summary>
        public int Tahdet;
        /// <summary>Käännetyt laatat tyyppeinä (web finds; pöllön korvaama "empty").</summary>
        public List<string> Loydot = new List<string>();
        /// <summary>Löydön manner samoin indeksein (web findManner; null = ei merkitty).</summary>
        public List<string> LoytoMantereet = new List<string>();
        /// <summary>Löydön maa (ISO3) samoin indeksein (web findMaa).</summary>
        public List<string> LoytoMaat = new List<string>();
    }

    /// <summary>
    /// Tallennus on tehty uudemmalla sovelluksella (versio &gt; TallennusVersio).
    /// Tiedostoa ei saa korvata: sen kentät katoaisivat.
    /// </summary>
    public sealed class UudempiTallennus : FormatException
    {
        public readonly int Versio;
        public UudempiTallennus(int versio)
            : base($"tallennusversio {versio} on uudempi kuin sovelluksen {Pelitila.TallennusVersio}") => Versio = versio;
    }

    /// <summary>Pelin tila (web Game): matkan kentät ja kello.</summary>
    public sealed class Pelitila
    {
        public const int TallennusVersio = 4;

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

        /// <summary>Kysymysmoottorin tila (Peli/Kysely.cs).</summary>
        public Kyselytila Kysely = new Kyselytila();

        /// <summary>
        /// Kauppojen tila (Peli/Kaupat.cs): lehtitehtävät, pullat, eläintäyt,
        /// julisteet. Tallennusversiossa 3 valinnainen kenttä "kaupat".
        /// </summary>
        public Kauppatila Kaupat = new Kauppatila();
        /// <summary>Voittaja (web winner.id; Peli/Voitto.cs). Vain moninpelissä. Valinnainen kenttä "voittaja".</summary>
        public int? VoittajaId;

        /// <summary>Laudan aarrelaatat (web world.tokens/revealed/starsFound). null = peli ilman laattoja.</summary>
        public Laattamaailma Laatat;
        /// <summary>Isoisän ennätys on jo kirjattu (web recordNoted).</summary>
        public bool EnnatysKirjattu;
        /// <summary>Ennätyksen rikkomispäivä (web recordMark.day), null jos ei rikottu.</summary>
        public int? EnnatysPaiva;
        /// <summary>Pöllö aarteena -mekaniikka (web polloAarteena; oletus false kuten POLLO_ON_AARRE).</summary>
        public bool PolloAarteena;
        /// <summary>Pöllö on jo löytynyt (web polloLoydetty = !polloAarteena alussa).</summary>
        public bool PolloLoydetty = true;
        /// <summary>Nähdyt pulmat kaupunki-id:nä (web puzzlesSeen ilman laudan etuliitettä; Peli/Pulmat.cs).</summary>
        public HashSet<string> NahdytPulmat = new HashSet<string>();
        /// <summary>Avoin tapahtumakortti (web eventCard; Peli/Tapahtumat.cs), vaiheessa Tapahtuma.</summary>
        public Tapahtumakortti Tapahtumakortti;
        /// <summary>Luetun tallennuksen versio (0 = ei luettu). Ei tallenneta.</summary>
        public int LuettuVersio;

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
        /// Tila JSON-tekstinä. Kentät ovat portin omia (ei webin
        /// toJSON-muoto): versio, siemen, arvontoja, vuorossa, vaihe,
        /// vuoroLaskuri, noppa, kulkutapa, autoMatka, odottavaMaksu, pelaajat
        /// (myös xp, kysytty, oikein, taso, botti, tahdet, loydot,
        /// loytoMantereet, loytoMaat), kysely (Kyselytila) ja versiosta 3
        /// laattamaailma, ennatys, ennatysPaiva, polloAarteena, polloLoydetty.
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
                Kentta(sb, "xp", p.Xp.ToString(CultureInfo.InvariantCulture));
                Kentta(sb, "kysytty", p.Kysytty.ToString(CultureInfo.InvariantCulture));
                Kentta(sb, "oikein", p.Oikein.ToString(CultureInfo.InvariantCulture));
                Kentta(sb, "taso", Teksti(p.Taso.ToString()));
                Kentta(sb, "botti", p.Botti ? "true" : "false");
                Kentta(sb, "tahdet", p.Tahdet.ToString(CultureInfo.InvariantCulture));
                Kentta(sb, "loydot", "[" + string.Join(",", p.Loydot.Select(Teksti)) + "]");
                Kentta(sb, "loytoMantereet", "[" + string.Join(",", p.LoytoMantereet.Select(Teksti)) + "]");
                Kentta(sb, "loytoMaat", "[" + string.Join(",", p.LoytoMaat.Select(Teksti)) + "]");
                sb.Append('}');
            }
            sb.Append(']');
            sb.Append(",\"kysely\":");
            Kysely.Kirjoita(sb);
            // Kaupat ja voittaja (Peli/Kaupat.cs, Voitto.cs): versio 3, valinnaiset.
            sb.Append(",\"kaupat\":");
            Kaupat.Kirjoita(sb);
            Kentta(sb, "voittaja", VoittajaId.HasValue ? VoittajaId.Value.ToString(CultureInfo.InvariantCulture) : "null");
            sb.Append(",\"laattamaailma\":");
            if (Laatat == null) sb.Append("null"); else Laatat.Kirjoita(sb);
            Kentta(sb, "ennatys", EnnatysKirjattu ? "true" : "false");
            Kentta(sb, "ennatysPaiva", EnnatysPaiva.HasValue ? EnnatysPaiva.Value.ToString(CultureInfo.InvariantCulture) : "null");
            Kentta(sb, "polloAarteena", PolloAarteena ? "true" : "false");
            Kentta(sb, "polloLoydetty", PolloLoydetty ? "true" : "false");
            // Pulmat ja tapahtumakortit: valinnaiset kentät (puuttuvat vanhasta tallennuksesta).
            Kentta(sb, "pulmatNahty", "[" + string.Join(",", NahdytPulmat.OrderBy(k => k, StringComparer.Ordinal).Select(Teksti)) + "]");
            sb.Append(",\"tapahtumakortti\":");
            if (Tapahtumakortti == null) sb.Append("null"); else Tapahtumakortti.Kirjoita(sb);
            sb.Append('}');
            return sb.ToString();
        }

        /// <summary>
        /// Lukee ToJsonin tekstin. Siirrot ja JatkaAutomaattisesti johdetaan
        /// vasta Matkan latauksessa (web fromJSON), koska ne tarvitsevat verkon.
        /// <paramref name="kaupungit"/> = laudan kaupungit järjestyksessä
        /// laattamaailman mantereita varten (Matka.Lataa antaa ne verkosta).
        /// </summary>
        public static Pelitila FromJson(string json, IReadOnlyList<Kaupunki> kaupungit = null)
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            var versio = (int)(MiniJson.Luku(o, "versio") ?? 0);
            if (versio > TallennusVersio) throw new UudempiTallennus(versio);
            if (versio < 1) throw new FormatException($"tuntematon tallennusversio {versio}");
            Paivita(o, versio);
            var t = new Pelitila
            {
                LuettuVersio = versio,
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
                    Xp = (int)(MiniJson.Luku(pd, "xp") ?? 0),
                    Kysytty = (int)(MiniJson.Luku(pd, "kysytty") ?? 0),
                    Oikein = (int)(MiniJson.Luku(pd, "oikein") ?? 0),
                    Taso = MiniJson.Teksti(pd, "taso") is string taso
                        ? (Vaikeustaso)Enum.Parse(typeof(Vaikeustaso), taso) : Vaikeustaso.Perus,
                    Botti = MiniJson.Totuus(pd, "botti"),
                    Tahdet = (int)(MiniJson.Luku(pd, "tahdet") ?? 0),
                    Loydot = Tekstit(pd, "loydot"),
                    LoytoMantereet = Tekstit(pd, "loytoMantereet"),
                    LoytoMaat = Tekstit(pd, "loytoMaat"),
                };
                foreach (var kay in MiniJson.Taulukko(MiniJson.Kentta(pd, "kaydyt") ?? new List<object>()))
                    p.Kaydyt.Add((string)kay);
                t.Pelaajat.Add(p);
            }
            if (t.Pelaajat.Count == 0) throw new FormatException("tallennuksessa ei ole pelaajia");
            t.Kysely = Kyselytila.Lue(MiniJson.Kentta(o, "kysely") as Dictionary<string, object>);
            // Kaupat ja voittaja: puuttuva kenttä (vanha tallennus) = tyhjä tila.
            t.Kaupat = Kauppatila.Lue(MiniJson.Kentta(o, "kaupat") as Dictionary<string, object>);
            t.VoittajaId = MiniJson.Luku(o, "voittaja") is double vo ? (int)vo : (int?)null;
            if (MiniJson.Kentta(o, "laattamaailma") is Dictionary<string, object> lm) t.Laatat = Laattamaailma.Lue(lm, kaupungit);
            t.EnnatysKirjattu = MiniJson.Totuus(o, "ennatys");
            t.EnnatysPaiva = MiniJson.Luku(o, "ennatysPaiva") is double ep ? (int)ep : (int?)null;
            // Web fromJSON: polloLoydetty = polloAarteena ? (tallennettu ?? true) : true.
            t.PolloAarteena = MiniJson.Totuus(o, "polloAarteena");
            t.PolloLoydetty = !t.PolloAarteena || MiniJson.Totuus(o, "polloLoydetty", true);
            // Pulmat ja tapahtumakortit (valinnaiset): web puzzlesSeen ?? [], eventCard ?? null.
            foreach (var s in Tekstit(o, "pulmatNahty")) if (s != null) t.NahdytPulmat.Add(s);
            t.Tapahtumakortti = Tapahtumakortti.Lue(MiniJson.Kentta(o, "tapahtumakortti") as Dictionary<string, object>);
            return t;
        }

        /// <summary>
        /// Versiopolku: vie jäsennetyn tallennuksen askel kerrallaan nykyiseen
        /// versioon ennen lukua. Nykyiset askeleet täydentävät vain oletuksia,
        /// jotka lukija antaisi muutenkin; ne on kirjattu tähän, jotta seuraava
        /// muutos (uudelleennimeäminen, merkityksen muutos) saa paikkansa.
        /// </summary>
        static void Paivita(Dictionary<string, object> o, int versio)
        {
            // 1 → 2 (erä 2): pelaajan xp, kysytty, oikein, taso ja kysely puuttuvat → oletukset.
            // 2 → 3 (erä 3): laattamaailma puuttuu → null; Matka.Lataa jakaa laatat
            //   laattamäärillä (LuettuVersio < 3), muuten peli jatkuu ilman laattoja.
            // 3 → 4 (versionosto): kaupat, voittaja, avoinKaksintaistelu, pulmatNahty ja
            //   tapahtumakortti olivat valinnaisia; puuttuva = tyhjä (lukija hoitaa).
            for (int v = versio; v < TallennusVersio; v++)
            {
                switch (v)
                {
                    case 3:
                        if (!o.ContainsKey("pulmatNahty")) o["pulmatNahty"] = new List<object>();
                        break;
                }
            }
            // Rosvon kaksintaistelu on poistettu pelistä (Raamattu 25.8.2026): vanhan tallennuksen
            // kentät kaksintaistelu ja avoinKaksintaistelu ohitetaan, ja auki jäänyt kaksintaistelu
            // palaa vaiheeseen Toiminta.
            if (MiniJson.Teksti(o, "vaihe") == "Kaksintaistelu") o["vaihe"] = nameof(Vaihe.Toiminta);
            o["versio"] = (double)TallennusVersio;
        }

        static List<string> Tekstit(Dictionary<string, object> o, string nimi) =>
            MiniJson.Kentta(o, nimi) is List<object> l ? l.Select(x => x as string).ToList() : new List<string>();

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
        internal static string Teksti(string s)
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
