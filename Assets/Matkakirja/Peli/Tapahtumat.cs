// TAPAHTUMAT: tapahtumakortit suorana porttina verkkopelin js/game.js:stä
// (openEvent, closeEvent, rideTarget). Tapahtumakortti on pysähdyksen muoto
// 'event' (Kysely.MuotoPainot, paino 12): kysymyksen sijaan tapahtuu jotain
// pientä ja reilua — rahaa (ei koskaan miinukselle), ilmainen kyyti
// naapurikaupunkiin tai viive (ylimääräinen vuoro). Laatta jää kääntämättä.
// Kultainen jälki Kultaiset/pulmajalki.json (peliajot, joissa laudalle on
// lisätty Afrikan kortit) vaatii saman tilan ja satunnaisuuden kulutuksen.
//
// DATA: maailmankartalla ei ole tapahtumia eikä sisältöpaketissa
// tapahtumakokoelmaa. Tapahtumadata.Lue lukee lähdemoduulin muodon
// ([{text, effect: {kind, amount}}] tai {events: […]}) sekä tulevan
// kokoelman ({"alkiot":[{"data":{…}}]}, kokoelmat/tapahtumat.json).
//
// KYTKENTÄ: Tapahtumat.Kytke(kysely, data) asettaa koukut
// Kysely.TapahtumiaOn (web pack.events.length → muodon paino) ja
// Kysely.AvaaTapahtuma (web openEvent). Kortti on auki vaiheessa
// Vaihe.Tapahtuma (web phase 'event'); käyttöliittymä näyttää
// Tila.Tapahtumakortti.Teksti ja kutsuu Sulje() (web closeEvent).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Tapahtuman vaikutus (web effect {kind, amount}).</summary>
    public sealed class TapahtumaVaikutus
    {
        public const string Raha = "raha";
        public const string Kyyti = "kyyti";
        public const string Viive = "viive";

        /// <summary>web kind: "raha", "kyyti" tai "viive" (tuntematon laji ei tee mitään).</summary>
        public string Laji;
        /// <summary>web amount (vain rahalla).</summary>
        public int? Maara;

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"laji\":").Append(Pelitila.Teksti(Laji));
            sb.Append(",\"maara\":").Append(Maara.HasValue ? Maara.Value.ToString(CultureInfo.InvariantCulture) : "null");
            sb.Append('}');
        }

        /// <summary>Tallennuksen {laji, maara} tai lähdedatan {kind, amount}.</summary>
        internal static TapahtumaVaikutus Lue(Dictionary<string, object> o)
        {
            if (o == null) return null;
            return new TapahtumaVaikutus
            {
                Laji = MiniJson.Teksti(o, "laji") ?? MiniJson.Teksti(o, "kind"),
                Maara = (MiniJson.Luku(o, "maara") ?? MiniJson.Luku(o, "amount")) is double d ? (int)d : (int?)null,
            };
        }
    }

    /// <summary>Pakan tapahtumakortti (web pack.events[i]).</summary>
    public sealed class Tapahtuma
    {
        public string Teksti;                 // web text
        public TapahtumaVaikutus Vaikutus;    // web effect (null = ei vaikutusta)
    }

    /// <summary>Avoin tapahtumakortti (web eventCard). Tallennetaan Pelitilassa.</summary>
    public sealed class Tapahtumakortti
    {
        public string Kaupunki;               // web cityId
        public string Teksti;                 // web text
        public TapahtumaVaikutus Vaikutus;    // web effect

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"kaupunki\":").Append(Pelitila.Teksti(Kaupunki));
            sb.Append(",\"teksti\":").Append(Pelitila.Teksti(Teksti));
            sb.Append(",\"vaikutus\":");
            if (Vaikutus == null) sb.Append("null"); else Vaikutus.Kirjoita(sb);
            sb.Append('}');
        }

        internal static Tapahtumakortti Lue(Dictionary<string, object> o)
        {
            if (o == null) return null;
            return new Tapahtumakortti
            {
                Kaupunki = MiniJson.Teksti(o, "kaupunki"),
                Teksti = MiniJson.Teksti(o, "teksti"),
                Vaikutus = TapahtumaVaikutus.Lue(MiniJson.Kentta(o, "vaikutus") as Dictionary<string, object>),
            };
        }
    }

    /// <summary>Laudan tapahtumakortit järjestyksessä (web pack.events).</summary>
    public sealed class Tapahtumadata
    {
        public readonly List<Tapahtuma> Kortit = new List<Tapahtuma>();

        public static Tapahtumadata Tyhja() => new Tapahtumadata();

        /// <summary>Lukee paketin kansiosta kokoelmat/tapahtumat.json; ilman tiedostoa tyhjä (maailmankartta).</summary>
        public static Tapahtumadata LueKansiosta(string kansio)
        {
            var polku = Path.Combine(kansio, "tapahtumat.json");
            return File.Exists(polku) ? Lue(File.ReadAllText(polku)) : Tyhja();
        }

        /// <summary>
        /// Lähdemoduulin muoto [{text, effect}] tai {events: […]}, tai kokoelma
        /// {"alkiot": [{"data": {text, effect}}]}. Kortti ilman tekstiä on virhe.
        /// </summary>
        public static Tapahtumadata Lue(string json)
        {
            var juuri = MiniJson.Jasenna(json);
            List<object> alkiot;
            if (juuri is List<object> taulu) alkiot = taulu;
            else
            {
                var o = MiniJson.Objekti(juuri);
                var nimi = MiniJson.Teksti(o, "nimi");
                if (nimi != null && nimi != "tapahtumat") throw new FormatException($"odotettiin kokoelmaa 'tapahtumat', saatiin '{nimi}'");
                alkiot = MiniJson.Taulukko(MiniJson.Kentta(o, "alkiot") ?? MiniJson.Kentta(o, "events") ?? new List<object>());
            }
            var d = new Tapahtumadata();
            foreach (var a in alkiot)
            {
                var ao = MiniJson.Objekti(a);
                var data = MiniJson.Kentta(ao, "data") as Dictionary<string, object> ?? ao;
                var teksti = MiniJson.Teksti(data, "text") ?? throw new FormatException("tapahtumakortilta puuttuu text");
                d.Kortit.Add(new Tapahtuma
                {
                    Teksti = teksti,
                    Vaikutus = TapahtumaVaikutus.Lue(MiniJson.Kentta(data, "effect") as Dictionary<string, object>),
                });
            }
            return d;
        }
    }

    /// <summary>Tapahtumakorttien kytkentä Kyselyyn ja webin openEvent/closeEvent.</summary>
    public sealed class Tapahtumat
    {
        public Kysely Kysely { get; }
        public Tapahtumadata Data { get; }
        Matka Matka => Kysely.Matka;
        Pelitila Tila => Kysely.Matka.Tila;

        /// <summary>Kortin vaikutus näytölle (web say): laji ("raha", "kyyti", "viive") ja teksti.</summary>
        public event Action<string, string> Tapahtui;

        public Tapahtumat(Kysely kysely, Tapahtumadata data)
        {
            Kysely = kysely ?? throw new ArgumentNullException(nameof(kysely));
            Data = data ?? throw new ArgumentNullException(nameof(data));
            kysely.TapahtumiaOn = () => Data.Kortit.Count > 0;
            kysely.AvaaTapahtuma = Avaa;
        }

        /// <summary>Kytkee tapahtumakortit Kyselyyn (koukut TapahtumiaOn ja AvaaTapahtuma).</summary>
        public static Tapahtumat Kytke(Kysely kysely, Tapahtumadata data) => new Tapahtumat(kysely, data);

        /// <summary>Avoin kortti (web eventCard) tai null.</summary>
        public Tapahtumakortti Kortti => Tila.Tapahtumakortti;

        /// <summary>
        /// Web openEvent: tuore kortti (ei vielä käytetty, Kyselytila.Kaytetyt)
        /// tai koko pakasta, yksi arvonta. Vaihe → Tapahtuma.
        /// </summary>
        public TekoTulos Avaa(string kaupunki)
        {
            var pooli = Data.Kortit;
            if (pooli.Count == 0) return TekoTulos.Epaonnistui("Laudalla ei ole tapahtumia");
            var kaytetyt = Tila.Kysely.Kaytetyt;
            var tuoreet = pooli.Where(e => !kaytetyt.Contains(e.Teksti)).ToList();
            var pakka = tuoreet.Count > 0 ? tuoreet : pooli;
            var kortti = pakka[(int)Math.Floor(Matka.Satunnainen.Seuraava() * pakka.Count)];
            kaytetyt.Add(kortti.Teksti);
            Tila.Tapahtumakortti = new Tapahtumakortti { Kaupunki = kaupunki, Teksti = kortti.Teksti, Vaikutus = kortti.Vaikutus };
            Tila.Vaihe = Vaihe.Tapahtuma;
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Web closeEvent: toteuttaa vaikutuksen ja päättää vuoron. Raha ei vie
        /// kukkaroa miinukselle; kyyti vie arvottuun naapurikaupunkiin (saapuminen
        /// kirjataan); viive päättää vuoron kahdesti.
        /// </summary>
        public TekoTulos Sulje()
        {
            if (Tila.Vaihe != Vaihe.Tapahtuma || Tila.Tapahtumakortti == null)
                return TekoTulos.Epaonnistui("Ei avointa tapahtumaa");
            var p = Tila.Pelaaja;
            var vaikutus = Tila.Tapahtumakortti.Vaikutus;
            Tila.Tapahtumakortti = null;
            Tila.Vaihe = Vaihe.Toiminta;

            if (vaikutus?.Laji == TapahtumaVaikutus.Raha)
            {
                int muutos = Math.Max(vaikutus.Maara ?? 0, -p.Raha);
                p.Raha += muutos;
                Tapahtui?.Invoke(TapahtumaVaikutus.Raha, muutos >= 0
                    ? $"{p.Nimi} sai {muutos} puntaa."
                    : $"{p.Nimi} menetti {-muutos} puntaa.");
            }
            else if (vaikutus?.Laji == TapahtumaVaikutus.Kyyti)
            {
                var kohde = Kyytikohde(p);
                if (kohde != null)
                {
                    p.Sijainti = Sijainti.KaupungissaSijainti(kohde);
                    Tila.ViimePolku = null;
                    Matka.KirjaaSaapuminen(p);
                    var nimi = Matka.Verkko.Kaupungit.TryGetValue(kohde, out var k) ? k.Nimi : kohde;
                    Tapahtui?.Invoke(TapahtumaVaikutus.Kyyti, $"{p.Nimi} sai ilmaisen kyydin kaupunkiin {nimi}.");
                }
            }

            Matka.PaataVuoro();
            // Viive vie yhden ylimääräisen vuoron: matkapäivä kuluu silti.
            if (vaikutus?.Laji == TapahtumaVaikutus.Viive)
            {
                Tapahtui?.Invoke(TapahtumaVaikutus.Viive, $"{p.Nimi} jäi paikalleen yhdeksi vuoroksi.");
                Matka.PaataVuoro();
            }
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Web rideTarget: naapurikaupunki maa- ja merireittien (adj) kautta
        /// reittijärjestyksessä, kaksoisreitit mukaan lukien; yksi arvonta.
        /// null, jos pelaaja ei ole kaupungissa tai naapureita ei ole (ei arvontaa).
        /// </summary>
        public string Kyytikohde(Pelaaja p)
        {
            if (!p.Sijainti.Kaupungissa) return null;
            var id = p.Sijainti.Kaupunki;
            var naapurit = new List<string>();
            foreach (var rid in Matka.Verkko.Naapurireitit(id))
            {
                if (!Matka.Verkko.Reitit.TryGetValue(rid, out var r)) continue;
                var toinen = r.A == id ? r.B : r.A;
                if (Matka.Verkko.Kaupungit.ContainsKey(toinen)) naapurit.Add(toinen);
            }
            if (naapurit.Count == 0) return null;
            return naapurit[(int)Math.Floor(Matka.Satunnainen.Seuraava() * naapurit.Count)];
        }
    }
}
