// PULMAT: isoisän luonnoskirjan pulmat suorana porttina verkkopelin
// js/game.js:stä (pendingPuzzle, openPuzzle; vastaus- ja sulkuhaarat ovat
// Kysely.Vastaa/Sulje) ja pulmageneraattorit js/packs/europe-puzzles.js ja
// js/packs/africa-puzzles.js -tiedostoista (generate(rng)). Kultainen jälki
// Kultaiset/pulmajalki.json (Kultaiset/tee-pulmajalki.mjs) vaatii saman
// tuloksen ja SAMAN MÄÄRÄN satunnaislukukutsuja joka generaattorilta ja
// joka teon jälkeen.
//
// DATA: sisältöpaketin kokoelma kokoelmat/pulmat.json (Pulmadata.Lue).
// Paketissa generate on funktio ({"$funktio": "arvoRoomalaiset", …}), joten
// jokaisen funktion logiikka JA sen taulukot (roomalaiset rivit, pylväskuvat,
// kuunvaiheet, naksutus- ja leilivariantit) on kirjoitettu tähän käsin.
// Tuntemattoman generaattorin pulma ohitetaan (Pulmadata.Ohitetut): ilman
// logiikkaa pulma ei voi olla sama kuin webissä.
//
// KYTKENTÄ: Pulmat.Kytke(kysely, pulmadata) asettaa koukut
// Kysely.PulmaOdottaa (web pendingPuzzle → tehtavaTarjolla ja actionQuiz) ja
// Kysely.AvaaPulma (web openPuzzle). Ladatulle pelille kytketään uudelleen
// uuden Kyselyn kanssa; nähdyt pulmat kulkevat Pelitila.NahdytPulmat-kentässä.
//
// NÄYTTÖ (Unity-kerros): avoin pulma on Tila.Kysely.Kysymys, jonka Laji on
// KysymysMuoto.Pulma. Kysymys, Vaihtoehdot, Oikea, Vihje, Fakta ja Lahteet
// ovat tavallisia kenttiä; pulman omat ovat AvoinKysymys.PulmaTiedot:
// Otsikko (title), Selite, Luonnos (web sketchData: piirroksen luvut
// JSON-muotoisena sanakirjana, luvut double) ja Kuvat (valokuvapulman
// vaihtoehtojen kuvat samassa järjestyksessä kuin Vaihtoehdot) sekä
// KuvaLahteet. Luonnoksen piirto kuuluu käyttöliittymälle (webissä
// piirraAfrikanPulma / piirraEuroopanPulma).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Valokuvapulman vaihtoehdon kuva (web {tiedosto, selite}).</summary>
    public sealed class PulmaKuva
    {
        public string Tiedosto;   // Commons-tiedoston nimi
        public string Selite;     // vaihtoehdon nimi
    }

    /// <summary>Avoimen pulman näytettävät lisätiedot (web quiz.title, selite, sketchData, kuvat, kuvaLahteet).</summary>
    public sealed class PulmanTiedot
    {
        public string Otsikko;                         // web title
        public string Selite;                          // web selite: mitä piirroksessa näkyy
        /// <summary>Piirroksen data (web sketchData) MiniJson-muodossa; null = oletuspiirros.</summary>
        public Dictionary<string, object> Luonnos;
        /// <summary>Vaihtoehtojen valokuvat samassa järjestyksessä kuin Vaihtoehdot (web kuvat); null = ei kuvia.</summary>
        public List<PulmaKuva> Kuvat;
        public string KuvaLahteet;                     // web kuvaLahteet (vain kuvien kanssa)

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"otsikko\":").Append(Pelitila.Teksti(Otsikko));
            sb.Append(",\"selite\":").Append(Pelitila.Teksti(Selite));
            sb.Append(",\"luonnos\":"); Json.Kirjoita(sb, Luonnos);
            sb.Append(",\"kuvat\":");
            if (Kuvat == null) sb.Append("null");
            else sb.Append('[').Append(string.Join(",", Kuvat.Select(k =>
                $"{{\"tiedosto\":{Pelitila.Teksti(k.Tiedosto)},\"selite\":{Pelitila.Teksti(k.Selite)}}}"))).Append(']');
            sb.Append(",\"kuvaLahteet\":").Append(Pelitila.Teksti(KuvaLahteet));
            sb.Append('}');
        }

        internal static PulmanTiedot Lue(Dictionary<string, object> o)
        {
            if (o == null) return null;
            return new PulmanTiedot
            {
                Otsikko = MiniJson.Teksti(o, "otsikko"),
                Selite = MiniJson.Teksti(o, "selite"),
                Luonnos = MiniJson.Kentta(o, "luonnos") as Dictionary<string, object>,
                Kuvat = Pulmadata.LueKuvat(MiniJson.Kentta(o, "kuvat")),
                KuvaLahteet = MiniJson.Teksti(o, "kuvaLahteet"),
            };
        }
    }

    /// <summary>Generaattorin tulos (web generate(rng): sketch, q, options, correct, hint, kuvat).</summary>
    public sealed class PulmaArvonta
    {
        public Dictionary<string, object> Luonnos;   // sketch
        public string Kysymys;                       // q (null = pulman oma)
        public List<string> Vaihtoehdot;             // options
        public int Oikea;                            // correct
        public string Vihje;                         // hint (null = pulman oma)
        public List<PulmaKuva> Kuvat;                // kuvat (null = ei kuvia)
    }

    /// <summary>Yksi pulma paketista (web pack.puzzles[i]).</summary>
    public sealed class PulmaMaaritys
    {
        public string Id;
        public string Kaupunki;              // web city
        public string Otsikko;               // web title
        public string Selite;
        public string Kysymys;               // web q
        public string Fakta;                 // web fact
        public List<string> Lahteet = new List<string>();   // web sourceList(source)
        public string Vihje;                 // web hint
        public string KuvaLahteet;
        /// <summary>Kiinteät vaihtoehdot (web options), jos generaattori ei anna omiaan.</summary>
        public List<string> Vaihtoehdot;
        public int? Oikea;                   // web correct
        public Dictionary<string, object> Luonnos;   // web sketch
        public List<PulmaKuva> Kuvat;
        /// <summary>Generaattorin nimi paketissa (web generate.$funktio), null = kiinteä pulma.</summary>
        public string Generaattori;
        /// <summary>Portattu generaattori (Pulmageneraattorit), null = kiinteä pulma.</summary>
        public Func<Satunnainen, PulmaArvonta> Arvo;
    }

    /// <summary>Paketin pulmat järjestyksessä (kokoelmat/pulmat.json).</summary>
    public sealed class Pulmadata
    {
        public readonly List<PulmaMaaritys> Pulmat = new List<PulmaMaaritys>();
        /// <summary>Pulmat, joita ei voitu ottaa peliin (tuntematon generaattori tai ei vaihtoehtoja): "id: syy".</summary>
        public readonly List<string> Ohitetut = new List<string>();

        /// <summary>Web pack.puzzles.find(p => p.city === kaupunki).</summary>
        public PulmaMaaritys Kaupungissa(string kaupunki) =>
            kaupunki == null ? null : Pulmat.FirstOrDefault(p => p.Kaupunki == kaupunki);

        public PulmaMaaritys Hae(string id) => Pulmat.FirstOrDefault(p => p.Id == id);

        /// <summary>Tyhjä data (laudalla ei pulmia).</summary>
        public static Pulmadata Tyhja() => new Pulmadata();

        /// <summary>Lukee paketin kansiosta kokoelmat/pulmat.json; ilman tiedostoa tyhjä.</summary>
        public static Pulmadata LueKansiosta(string kansio)
        {
            var polku = Path.Combine(kansio, "pulmat.json");
            return File.Exists(polku) ? Lue(File.ReadAllText(polku)) : Tyhja();
        }

        /// <summary>
        /// Kokoelma {"nimi":"pulmat","alkiot":[{"id","kaupunki","data":{…}}]}
        /// tai pelkkä taulukko pulmaolioita (lähdemoduulin muoto).
        /// </summary>
        public static Pulmadata Lue(string json)
        {
            var juuri = MiniJson.Jasenna(json);
            IEnumerable<object> alkiot;
            if (juuri is List<object> taulu) alkiot = taulu;
            else
            {
                var o = MiniJson.Objekti(juuri);
                var nimi = MiniJson.Teksti(o, "nimi");
                if (nimi != null && nimi != "pulmat") throw new FormatException($"odotettiin kokoelmaa 'pulmat', saatiin '{nimi}'");
                alkiot = MiniJson.Taulukko(MiniJson.Kentta(o, "alkiot") ?? MiniJson.Kentta(o, "puzzles"));
            }
            var d = new Pulmadata();
            foreach (var a in alkiot)
            {
                var ao = MiniJson.Objekti(a);
                var data = Paataso.Yhdista(ao, Paataso.Pulma);
                var p = LuePulma(data);
                if (p.Kaupunki == null) p.Kaupunki = MiniJson.Teksti(ao, "kaupunki");
                if (p.Id == null) p.Id = MiniJson.Teksti(ao, "id");
                if (p.Generaattori != null && p.Arvo == null) { d.Ohitetut.Add($"{p.Id}: tuntematon generaattori {p.Generaattori}"); continue; }
                if (p.Arvo == null && (p.Vaihtoehdot == null || !p.Oikea.HasValue)) { d.Ohitetut.Add($"{p.Id}: ei vaihtoehtoja"); continue; }
                d.Pulmat.Add(p);
            }
            return d;
        }

        static PulmaMaaritys LuePulma(Dictionary<string, object> d)
        {
            // Paketti ≤ 1.x: generate = {"$funktio": "arvoRoomalaiset"}; skeema 1.9+ (Siirtoseppä
            // nippu 4): tunniste generaattori = "roomalaiset" (tai "pulma:roomalaiset").
            var gen = MiniJson.Kentta(d, "generate");
            string generaattori = MiniJson.Teksti(d, "generaattori")
                ?? (gen is string gs ? gs : gen is Dictionary<string, object> go ? MiniJson.Teksti(go, "$funktio") : null);
            var p = new PulmaMaaritys
            {
                Id = MiniJson.Teksti(d, "id"),
                Kaupunki = MiniJson.Teksti(d, "city"),
                Otsikko = MiniJson.Teksti(d, "title"),
                Selite = MiniJson.Teksti(d, "selite"),
                Kysymys = MiniJson.Teksti(d, "q"),
                Fakta = MiniJson.Teksti(d, "fact"),
                Lahteet = Lahdelista(MiniJson.Kentta(d, "source")),
                Vihje = MiniJson.Teksti(d, "hint"),
                KuvaLahteet = MiniJson.Teksti(d, "kuvaLahteet"),
                Vaihtoehdot = MiniJson.Kentta(d, "options") is List<object> ol
                    ? ol.Select(x => x as string ?? Json.Luku(x)).ToList() : null,
                Oikea = MiniJson.Luku(d, "correct") is double c ? (int)c : (int?)null,
                Luonnos = MiniJson.Kentta(d, "sketch") as Dictionary<string, object>,
                Kuvat = LueKuvat(MiniJson.Kentta(d, "kuvat")),
                Generaattori = generaattori,
            };
            if (generaattori != null) p.Arvo = Pulmageneraattorit.Hae(generaattori);
            return p;
        }

        internal static List<PulmaKuva> LueKuvat(object o) =>
            o is List<object> l
                ? l.Select(x => MiniJson.Objekti(x)).Select(k => new PulmaKuva
                    { Tiedosto = MiniJson.Teksti(k, "tiedosto"), Selite = MiniJson.Teksti(k, "selite") }).ToList()
                : null;

        /// <summary>Web sourceList: merkkijono tai taulukko → ei-tyhjät merkkijonot.</summary>
        static List<string> Lahdelista(object source)
        {
            var l = new List<string>();
            if (source is string s) { if (s.Trim().Length > 0) l.Add(s); }
            else if (source is List<object> t)
                foreach (var x in t) if (x is string y && y.Trim().Length > 0) l.Add(y);
            return l;
        }
    }

    /// <summary>Pulmien kytkentä Kyselyyn ja webin pendingPuzzle/openPuzzle.</summary>
    public sealed class Pulmat
    {
        public Kysely Kysely { get; }
        public Pulmadata Data { get; }
        Pelitila Tila => Kysely.Matka.Tila;

        public Pulmat(Kysely kysely, Pulmadata data)
        {
            Kysely = kysely ?? throw new ArgumentNullException(nameof(kysely));
            Data = data ?? throw new ArgumentNullException(nameof(data));
            kysely.PulmaOdottaa = p => Odottaa(p) != null;
            kysely.AvaaPulma = Avaa;
        }

        /// <summary>Kytkee pulmat Kyselyyn (koukut PulmaOdottaa ja AvaaPulma).</summary>
        public static Pulmat Kytke(Kysely kysely, Pulmadata data) => new Pulmat(kysely, data);

        /// <summary>Avoimen pulman näytettävät tiedot; null, jos auki ei ole pulmaa.</summary>
        public PulmanTiedot Nakyma =>
            Tila.Kysely.Kysymys is AvoinKysymys q && q.Laji == KysymysMuoto.Pulma ? q.PulmaTiedot : null;

        /// <summary>
        /// Web pendingPuzzle: kaupungin pulma, jos sitä ei ole vielä nähty tässä
        /// pelissä. Laukaisin on pelkkä saapuminen (myös aloituskaupunki).
        /// </summary>
        public PulmaMaaritys Odottaa(Pelaaja p = null)
        {
            p ??= Tila.Pelaaja;
            if (!p.Sijainti.Kaupungissa) return null;
            var pulma = Data.Kaupungissa(p.Sijainti.Kaupunki);
            if (pulma == null) return null;
            return Tila.NahdytPulmat.Contains(pulma.Kaupunki) ? null : pulma;
        }

        /// <summary>
        /// Web openPuzzle: kirjaa pulman nähdyksi ja edellisen vaiheen, arpoo
        /// pulman pelin satunnaisuudella (generaattori, sitten vaihtoehtojen
        /// sekoitus) ja avaa sen monivalintana. Laatallisessa kaupungissa
        /// oikea ratkaisu kääntää laatan ja sulkeminen päättää vuoron
        /// (Kysely.Vastaa/Sulje); laatattomassa vuoro jatkuu.
        /// </summary>
        public TekoTulos Avaa()
        {
            var pulma = Odottaa();
            if (pulma == null) return TekoTulos.Epaonnistui("Ei avointa pulmaa");
            var kaupunki = Tila.Pelaaja.Sijainti.Kaupunki;
            bool laatta = Kysely.LaattaTassa != null && Kysely.LaattaTassa(kaupunki);
            Tila.NahdytPulmat.Add(pulma.Kaupunki);
            Tila.Kysely.PulmaEdellinenVaihe = Tila.Vaihe;

            var arvottu = pulma.Arvo?.Invoke(Kysely.Matka.Satunnainen);
            var vaihtoehdot = arvottu?.Vaihtoehdot ?? pulma.Vaihtoehdot;
            int oikea = arvottu?.Oikea ?? pulma.Oikea ?? -1;
            var kuvat = arvottu?.Kuvat ?? pulma.Kuvat;
            var jarj = Kysely.Sekoitettu(vaihtoehdot.Count);
            Tila.Kysely.Kysymys = new AvoinKysymys
            {
                Laji = KysymysMuoto.Pulma,
                Laatta = laatta,
                Kaupunki = pulma.Kaupunki,
                PulmaId = pulma.Id,
                Vaikea = false,
                Kysymys = arvottu?.Kysymys ?? pulma.Kysymys,
                Fakta = pulma.Fakta,
                Lahteet = new List<string>(pulma.Lahteet),
                Vaihtoehdot = jarj.Select(i => vaihtoehdot[i]).ToList(),
                Oikea = jarj.IndexOf(oikea),
                Vihje = arvottu?.Vihje ?? pulma.Vihje,
                Sekunnit = null,
                PulmaTiedot = new PulmanTiedot
                {
                    Otsikko = pulma.Otsikko,
                    Selite = pulma.Selite,
                    Luonnos = arvottu?.Luonnos ?? pulma.Luonnos,
                    Kuvat = kuvat == null ? null : jarj.Select(i => kuvat[i]).ToList(),
                    KuvaLahteet = kuvat != null ? pulma.KuvaLahteet : null,
                },
            };
            Tila.Vaihe = Vaihe.Kysymys;
            return TekoTulos.Onnistui();
        }
    }

    /// <summary>
    /// Pulmageneraattorit (web GENERATORS, EUROPE_GENERATORS) generaattorin
    /// nimellä (web generate.$funktio). Jokainen kuluttaa satunnaisuutta
    /// täsmälleen kuten JS-alkuperäinen: Math.floor(rng() * n) = Arpa.
    /// </summary>
    public static class Pulmageneraattorit
    {
        public static readonly IReadOnlyDictionary<string, Func<Satunnainen, PulmaArvonta>> Generaattorit =
            new Dictionary<string, Func<Satunnainen, PulmaArvonta>>
            {
                ["arvoRoomalaiset"] = Roomalaiset,
                ["arvoPylvaat"] = Pylvaat,
                ["arvoSuolaaltaat"] = Suolaaltaat,
                ["arvoGeysir"] = Geysir,
                ["arvoLaiturit"] = Laiturit,
                ["arvoKukko"] = Kukko,
                ["arvoHieroglyfit"] = Hieroglyfit,
                ["arvoPunnukset"] = Punnukset,
                ["arvoKuunvaiheet"] = Kuunvaiheet,
                ["arvoNaksutus"] = Naksutus,
                ["arvoVesileilit"] = Vesileilit,
            };

        /// <summary>
        /// Generaattori nimellä: web-funktion nimi ("arvoRoomalaiset") tai paketin
        /// tunniste ("roomalaiset", "pulma:roomalaiset"). null = tuntematon.
        /// </summary>
        public static Func<Satunnainen, PulmaArvonta> Hae(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return null;
            if (Generaattorit.TryGetValue(nimi, out var g)) return g;
            var t = nimi.StartsWith("pulma:", StringComparison.Ordinal) ? nimi.Substring(6) : nimi;
            if (t.Length == 0) return null;
            return Generaattorit.TryGetValue("arvo" + char.ToUpperInvariant(t[0]) + t.Substring(1), out g) ? g : null;
        }

        // --- apurit (web poimi/euroPoimi, sekoita/euroSekoita, arvoLuku) -----

        static int Arpa(Satunnainen r, int n) => (int)Math.Floor(r.Seuraava() * n);
        static int Luku(Satunnainen r, int min, int max) => min + Arpa(r, max - min + 1);
        static T Poimi<T>(Satunnainen r, IReadOnlyList<T> l) => l[Arpa(r, l.Count)];

        static List<T> Sekoita<T>(Satunnainen r, IEnumerable<T> lista)
        {
            var t = lista.ToList();
            for (int i = t.Count - 1; i > 0; i--)
            {
                int j = Arpa(r, i + 1);
                (t[i], t[j]) = (t[j], t[i]);
            }
            return t;
        }

        static string S(int n) => n.ToString(CultureInfo.InvariantCulture);
        static List<object> Luvut(IEnumerable<int> l) => l.Select(x => (object)(double)x).ToList();
        static List<object> Tekstit(IEnumerable<string> l) => l.Cast<object>().ToList();

        // --- Eurooppa -------------------------------------------------------

        sealed class Romaani { public string[] Rivit; public int[] Arvot; public string Kysytty; public int Oikea; public int[] Muut; }

        static readonly Romaani[] Romaanit =
        {
            new Romaani { Rivit = new[] { "VII", "XXIV", "LX" }, Arvot = new[] { 7, 24, 60 }, Kysytty = "XLII", Oikea = 42, Muut = new[] { 62, 52, 38 } },
            new Romaani { Rivit = new[] { "VI", "XIX", "XL" }, Arvot = new[] { 6, 19, 40 }, Kysytty = "XCIV", Oikea = 94, Muut = new[] { 114, 84, 96 } },
            new Romaani { Rivit = new[] { "IX", "XXXI", "LXX" }, Arvot = new[] { 9, 31, 70 }, Kysytty = "XXIX", Oikea = 29, Muut = new[] { 31, 21, 39 } },
        };

        /// <summary>Web arvoRoomalaiset (Rooma).</summary>
        public static PulmaArvonta Roomalaiset(Satunnainen r)
        {
            var v = Poimi(r, Romaanit);
            var options = Sekoita(r, new[] { v.Oikea }.Concat(v.Muut)).Select(S).ToList();
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object>
                {
                    ["rivit"] = Tekstit(v.Rivit), ["arvot"] = Luvut(v.Arvot), ["kysytty"] = v.Kysytty,
                },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(S(v.Oikea)),
            };
        }

        static readonly string[] PylvasTyylit = { "doorilainen", "joonialainen", "korinttilainen" };

        sealed class Pylvaskuva { public string Tyyli, Tiedosto, Nimi, Lahde; }

        static readonly Pylvaskuva[] Pylvaskuvat =
        {
            new Pylvaskuva { Tyyli = "doorilainen", Tiedosto = "Parthenon (30276156187).jpg", Nimi = "Parthenonin pylväikkö", Lahde = "Phanatic (CC BY-SA 2.0)" },
            new Pylvaskuva { Tyyli = "joonialainen", Tiedosto = "Ionic capital from the Erechtheum at the British Museum.jpg", Nimi = "Erekhtheionin pylväänpää", Lahde = "Yair Haklai (CC BY-SA 4.0)" },
            new Pylvaskuva { Tyyli = "korinttilainen", Tiedosto = "A Corinthian capital (Temple of Olympian Zeus) on August 10, 2022.jpg", Nimi = "Olympieionin pylväs", Lahde = "George E. Koronaios (CC BY-SA 4.0)" },
            // Harhautus: karyatidi ei ole koskaan oikea vastaus.
            new Pylvaskuva { Tyyli = "karyatidi", Tiedosto = "Caryatid - Flickr - George M. Groutas.jpg", Nimi = "Erekhtheionin karyatidi", Lahde = "George M. Groutas (CC BY 2.0)" },
        };

        /// <summary>Web arvoPylvaat (Ateena): valokuvapulma.</summary>
        public static PulmaArvonta Pylvaat(Satunnainen r)
        {
            var kysytty = Poimi(r, PylvasTyylit);
            var jarjestys = Sekoita(r, Pylvaskuvat);
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["kysytty"] = kysytty },
                Vaihtoehdot = jarjestys.Select(k => k.Nimi).ToList(),
                Kuvat = jarjestys.Select(k => new PulmaKuva { Tiedosto = k.Tiedosto, Selite = k.Nimi }).ToList(),
                Oikea = jarjestys.FindIndex(k => k.Tyyli == kysytty),
            };
        }

        /// <summary>Web arvoSuolaaltaat (Dubrovnik).</summary>
        public static PulmaArvonta Suolaaltaat(Satunnainen r)
        {
            int haihtuu = 2 + Arpa(r, 2);
            int paivia = 4 + Arpa(r, 3);
            int oikea = haihtuu * paivia;
            var syvyydet = Sekoita(r, new[] { oikea, oikea + haihtuu, oikea - haihtuu, oikea + haihtuu * 2 });
            var kirjaimet = new[] { "A", "B", "C", "D" };
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object>
                {
                    ["syvyydet"] = Luvut(syvyydet), ["haihtuu"] = (double)haihtuu, ["paivia"] = (double)paivia,
                    ["kirjaimet"] = Tekstit(kirjaimet),
                },
                Vaihtoehdot = kirjaimet.Select((k, i) => $"Allas {k} ({S(syvyydet[i])} cm)").ToList(),
                Oikea = syvyydet.IndexOf(oikea),
            };
        }

        /// <summary>Web lisaaMinuutit: "hh:mm" + minuutit, vuorokausi ympäri.</summary>
        static string LisaaMinuutit(string hhmm, int min)
        {
            var osat = hhmm.Split(':');
            int kaikki = int.Parse(osat[0], CultureInfo.InvariantCulture) * 60 + int.Parse(osat[1], CultureInfo.InvariantCulture) + min;
            return $"{kaikki / 60 % 24:00}:{kaikki % 60:00}";
        }

        /// <summary>Web arvoGeysir (Islanti).</summary>
        public static PulmaArvonta Geysir(Satunnainen r)
        {
            int vali = 6 + Arpa(r, 3);
            int alkuH = 9 + Arpa(r, 7);
            int alkuM = Arpa(r, 6) * 5;
            var alku = $"{alkuH:00}:{alkuM:00}";
            var ajat = new[] { alku, LisaaMinuutit(alku, vali), LisaaMinuutit(alku, vali * 2) };
            var oikea = LisaaMinuutit(alku, vali * 3);
            var options = Sekoita(r, new[]
            {
                oikea, LisaaMinuutit(alku, vali * 3 - 1), LisaaMinuutit(alku, vali * 3 + 2), LisaaMinuutit(alku, vali * 4),
            });
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["ajat"] = Tekstit(ajat) },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(oikea),
            };
        }

        /// <summary>Web arvoLaiturit (Venetsia).</summary>
        public static PulmaArvonta Laiturit(Satunnainen r)
        {
            int vesi = 70 + Arpa(r, 6) * 5;
            int yli1 = vesi + 5 + Arpa(r, 2) * 5;
            int yli2 = yli1 + 10 + Arpa(r, 2) * 5;
            int ali1 = vesi - 5 - Arpa(r, 2) * 5;
            int ali2 = ali1 - 10 - Arpa(r, 2) * 5;
            var korkeudet = Sekoita(r, new[] { yli1, yli2, ali1, ali2 });
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["korkeudet"] = Luvut(korkeudet), ["vesi"] = (double)vesi },
                Vaihtoehdot = korkeudet.Select(cm => $"{S(cm)} cm").ToList(),
                Oikea = korkeudet.IndexOf(yli1),
            };
        }

        static readonly (string Avain, int Kulma)[] Suunnat =
        {
            ("pohjoinen", -90), ("koillinen", -45), ("itä", 0), ("kaakko", 45),
            ("etelä", 90), ("lounas", 135), ("länsi", 180), ("luode", -135),
        };

        /// <summary>Web arvoKukko (Pariisi).</summary>
        public static PulmaArvonta Kukko(Satunnainen r)
        {
            var oikea = Poimi(r, Suunnat);
            var muut = Sekoita(r, Suunnat.Where(s => s.Avain != oikea.Avain)).Take(3);
            var options = Sekoita(r, new[] { oikea }.Concat(muut)).Select(s => s.Avain).ToList();
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["kulma"] = (double)oikea.Kulma },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(oikea.Avain),
            };
        }

        // --- Afrikka --------------------------------------------------------

        /// <summary>Web arvoksi: hieroglyfirivin [sadat, kymmenet, ykköset] lukuarvo.</summary>
        public static int Arvoksi(int[] r) => r[0] * 100 + r[1] * 10 + r[2];

        /// <summary>Web arvoHieroglyfit (Kairo).</summary>
        public static PulmaArvonta Hieroglyfit(Satunnainen r)
        {
            int[] Numerot() => new[] { Luku(r, 0, 3), Luku(r, 0, 3), Luku(r, 0, 3) };
            int[] Rivi()
            {
                var x = Numerot();
                while (Arvoksi(x) == 0) x = Numerot();
                return x;
            }
            var esimerkit = new List<int[]> { new[] { 0, 0, Luku(r, 2, 3) } };
            while (esimerkit.Count < 3)
            {
                var x = Rivi();
                if (!esimerkit.Any(e => Arvoksi(e) == Arvoksi(x))) esimerkit.Add(x);
            }
            int[] Kysytty() => new[] { Luku(r, 1, 3), Luku(r, 1, 3), Luku(r, 1, 3) };
            var kysytty = Kysytty();
            while (esimerkit.Any(e => Arvoksi(e) == Arvoksi(kysytty))) kysytty = Kysytty();

            int oikea = Arvoksi(kysytty);
            int a = kysytty[0], b = kysytty[1], c = kysytty[2];
            var ehdokkaat = new[]
            {
                Arvoksi(new[] { c, b, a }), Arvoksi(new[] { b, a, c }), Arvoksi(new[] { a, c, b }),
                oikea + 10, oikea - 10, oikea + 100, oikea - 100,
            };
            var vaarat = new List<int>();
            foreach (var v in ehdokkaat)
                if (v != oikea && v > 0 && !vaarat.Contains(v)) vaarat.Add(v);
            var options = Sekoita(r, new[] { oikea }.Concat(vaarat.Take(3))).Select(S).ToList();
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object>
                {
                    ["esimerkit"] = esimerkit.Select(e => (object)Luvut(e)).ToList(),
                    ["kysytty"] = Luvut(kysytty),
                },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(S(oikea)),
            };
        }

        static readonly int[] Punnussarja = { 1, 2, 3, 4, 5, 6, 8, 10, 12 };

        /// <summary>Web arvoPunnukset (Kumasi).</summary>
        public static PulmaArvonta Punnukset(Satunnainen r)
        {
            int kulta = Poimi(r, new[] { 8, 10, 12, 14, 16 });
            int vasen = Poimi(r, new[] { 1, 2, 3, 4 });
            int yhteensa = kulta + vasen;
            List<int> oikeat;
            int puuttuva;
            do
            {
                oikeat = Sekoita(r, Punnussarja).Take(2).ToList();
                puuttuva = yhteensa - oikeat[0] - oikeat[1];
            } while (Array.IndexOf(Punnussarja, puuttuva) < 0);

            var vaarat = new List<int>();
            foreach (var d in Sekoita(r, new[] { 1, -1, 2, -2, 3, -3 }))
            {
                int v = puuttuva + d;
                if (v > 0 && v != puuttuva && !vaarat.Contains(v)) vaarat.Add(v);
                if (vaarat.Count == 3) break;
            }
            var options = Sekoita(r, new[] { puuttuva }.Concat(vaarat)).Select(S).ToList();
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object>
                {
                    ["kulta"] = (double)kulta, ["vasen"] = (double)vasen, ["oikea"] = Luvut(oikeat),
                },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(S(puuttuva)),
            };
        }

        static readonly (string Nimi, double V, bool Peilaa)[] Kuut =
        {
            ("uusikuu", 0, false),
            ("kasvava sirppi", 0.18, false),
            ("ensimmäinen neljännes", 0.5, false),
            ("kasvava kupera kuu", 0.82, false),
            ("täysikuu", 1, false),
            ("vähenevä kupera kuu", 0.82, true),
            ("viimeinen neljännes", 0.5, true),
            ("vähenevä sirppi", 0.18, true),
        };

        /// <summary>Web arvoKuunvaiheet (Timbuktu): sarja etenee aina eteenpäin.</summary>
        public static PulmaArvonta Kuunvaiheet(Satunnainen r)
        {
            int alku = Luku(r, 0, 7);
            int Indeksi(int i) => (alku + i) % 8;
            var sarja = new[] { 0, 1, 2 }.Select(i => Kuut[Indeksi(i)]).ToList();
            var vastaus = Kuut[Indeksi(3)];
            var vaarat = new List<string>();
            foreach (var i in new[] { 2, 4, 5, 1, 6 })
            {
                var ehdokas = Kuut[Indeksi(i)];
                if (ehdokas.Nimi != vastaus.Nimi && !vaarat.Contains(ehdokas.Nimi)) vaarat.Add(ehdokas.Nimi);
                if (vaarat.Count == 3) break;
            }
            var options = Sekoita(r, new[] { vastaus.Nimi }.Concat(vaarat));
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object>
                {
                    ["sarja"] = sarja.Select(k => (object)new Dictionary<string, object> { ["v"] = k.V, ["peilaa"] = k.Peilaa }).ToList(),
                },
                Vaihtoehdot = options,
                Oikea = options.IndexOf(vastaus.Nimi),
            };
        }

        sealed class Variantti
        {
            public string Q, Vastaus, Hint;
            public string[] Muut;
            public int[] Jarjestys;
            public int Tavoite;
        }

        static readonly Variantti[] Naksutusvariantit =
        {
            new Variantti
            {
                Q = "Piirsin muistiin kolme kohtaa, joista kieli irtoaa naksahtaen; jokaisella on oma kirjaimensa. Kansan kielen nimi on isiXhosa, ja sen keskellä kuuluu naksaus — kirjainpari Xh. Mikä näistä se on?",
                Vastaus = "x — kielen sivu poskihampailta",
                Muut = new[] { "c — kielen kärki etuhampailta", "q — kielen kärki hammasvallilta", "c — kielen sivu poskihampailta" },
                Jarjestys = new[] { 0, 1, 2 },
                Hint = "Nimi on kirjoitettu kysymykseen: isiXhosa. Mikä naksauskirjain sen keskeltä löytyy?",
            },
            new Variantti
            {
                Q = "Kolme naksausta, kolme kirjainta. Sana cela — pyytää — alkaa kevyimmällä niistä, samalla jolla englantilainen paheksuu. Mikä se on?",
                Vastaus = "c — kielen kärki ylähampaiden takaa",
                Muut = new[] { "x — kielen sivu poskihampailta", "q — kielen kärki hammasvallilta", "c — kielen kärki hammasvallilta" },
                Jarjestys = new[] { 2, 0, 1 },
                Hint = "Sana cela alkaa c:llä — ja paheksuva \"ts, ts\" syntyy kielen kärjellä ylähampaiden takana.",
            },
            new Variantti
            {
                Q = "Kolmas naksaus on syvin: kieli irtoaa kitalaen etuosasta ja poksahtaa kuin korkki pullosta. Sana qala — aloittaa — alkaa sillä. Mikä kirjain?",
                Vastaus = "q — kielen kärki hammasvallilta",
                Muut = new[] { "c — kielen kärki etuhampailta", "x — kielen sivu poskihampailta", "q — kielen sivu poskihampailta" },
                Jarjestys = new[] { 1, 2, 0 },
                Hint = "Sana qala alkaa q:lla — korkin poksahdus syntyy kielen kärjellä hammasvallilta.",
            },
        };

        /// <summary>Web arvoNaksutus (Kapkaupunki).</summary>
        public static PulmaArvonta Naksutus(Satunnainen r)
        {
            var v = Poimi(r, Naksutusvariantit);
            var options = Sekoita(r, new[] { v.Vastaus }.Concat(v.Muut));
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["jarjestys"] = Luvut(v.Jarjestys) },
                Kysymys = v.Q,
                Vaihtoehdot = options,
                Oikea = options.IndexOf(v.Vastaus),
                Vihje = v.Hint,
            };
        }

        static readonly Variantti[] Leilivariantit =
        {
            new Variantti
            {
                Tavoite = 4,
                Hint = "Kun täydestä viitosesta kaadetaan kolmonen täyteen, viitoseen jää kaksi mittaa. Mieti, mihin ne kaksi saadaan talteen.",
                Q = "Leilejä on kaksi, toiseen menee kolme mittaa ja toiseen viisi, eikä kummankaan kyljessä ole yhtään viivaa. Oppaani tarvitsee tasan neljä ennen kuin lähdemme.",
                Vastaus = "Täytä 5, kaada 3 täyteen, tyhjennä 3, kaada loput 3:een, täytä 5, kaada 3 täyteen",
                Muut = new[]
                {
                    "Täytä 3, kaada 5:een, täytä 3, kaada 5 täyteen, tyhjennä 5, kaada loput viitoseen",
                    "Täytä 5, kaada 3 täyteen, tyhjennä 5, kaada 3 viitoseen",
                    "Täytä 5, kaada 3 täyteen, tyhjennä 3, kaada loput 3:een, täytä 3",
                },
            },
            new Variantti
            {
                Tavoite = 2,
                Hint = "Paljonko viitoseen jää, kun siitä kaadetaan kolmonen täyteen?",
                Q = "Kolmen ja viiden mitan leilit, ei yhtään viivaa kyljessä. Tällä kertaa oppaani tahtoo tasan kaksi mittaa.",
                Vastaus = "Täytä 5, kaada 3 täyteen",
                Muut = new[]
                {
                    "Täytä 3, kaada 5:een, täytä 3",
                    "Täytä 5, kaada 3 täyteen, kaada 5 pois",
                    "Täytä 3, kaada 5:een",
                },
            },
            new Variantti
            {
                Tavoite = 1,
                Hint = "Täytä kolmonen kahdesti ja kaada molemmat viitoseen — toisella kerralla kaikki ei enää mahdu.",
                Q = "Samat kaksi leiliä, kolme ja viisi mittaa. Nyt tarvitaan tasan yksi mitta — sen verran vettä menee teekannuun.",
                Vastaus = "Täytä 3, kaada 5:een, täytä 3, kaada 5 täyteen",
                Muut = new[]
                {
                    "Täytä 5, kaada 3 täyteen, tyhjennä 3",
                    "Täytä 3, kaada 5:een, tyhjennä 5",
                    "Täytä 5, kaada 3 täyteen, kaada 5 pois",
                },
            },
        };

        /// <summary>Web arvoVesileilit (Sahara).</summary>
        public static PulmaArvonta Vesileilit(Satunnainen r)
        {
            var v = Poimi(r, Leilivariantit);
            var options = Sekoita(r, new[] { v.Vastaus }.Concat(v.Muut));
            return new PulmaArvonta
            {
                Luonnos = new Dictionary<string, object> { ["tavoite"] = (double)v.Tavoite },
                Kysymys = v.Q,
                Vaihtoehdot = options,
                Oikea = options.IndexOf(v.Vastaus),
                Vihje = v.Hint,
            };
        }
    }

    /// <summary>Pieni JSON-kirjoitin MiniJson-muotoisille arvoille (luonnosdata tallennukseen).</summary>
    static class Json
    {
        /// <summary>Luku kuten JS String(n): kokonaisluku ilman desimaaleja, muuten lyhin tarkka muoto.</summary>
        internal static string Luku(object o)
        {
            double d = Convert.ToDouble(o, CultureInfo.InvariantCulture);
            return d == Math.Floor(d) && Math.Abs(d) < 1e15
                ? ((long)d).ToString(CultureInfo.InvariantCulture)
                : d.ToString("R", CultureInfo.InvariantCulture);
        }

        internal static void Kirjoita(StringBuilder sb, object o)
        {
            switch (o)
            {
                case null: sb.Append("null"); break;
                case string s: sb.Append(Pelitila.Teksti(s)); break;
                case bool b: sb.Append(b ? "true" : "false"); break;
                case double _: case int _: case long _: case float _: sb.Append(Luku(o)); break;
                case Dictionary<string, object> d:
                    sb.Append('{');
                    bool eka = true;
                    foreach (var kv in d)
                    {
                        if (!eka) sb.Append(',');
                        eka = false;
                        sb.Append(Pelitila.Teksti(kv.Key)).Append(':');
                        Kirjoita(sb, kv.Value);
                    }
                    sb.Append('}');
                    break;
                case System.Collections.IEnumerable e:
                    sb.Append('[');
                    bool ek = true;
                    foreach (var x in e) { if (!ek) sb.Append(','); ek = false; Kirjoita(sb, x); }
                    sb.Append(']');
                    break;
                default: throw new FormatException("tuntematon JSON-arvo " + o.GetType());
            }
        }
    }
}
