// KAUPAT: pelaajan ostot ja rahan/palkkioiden lähteet suorana porttina
// verkkopelin js/game.js Game-luokasta: actionKulttuuri, actionMinitehtava,
// kirjaaNostotehtava, merkitseAarrepisteOhje, actionPullaVinkki,
// actionPullaOstos, pullaVinkkiOstettu, pullaOstettu, actionElaintaky,
// elaintakyLunastettu, myonnaJuliste, mannerLennot, actionMannerLento,
// avaaAarreSahkeella ja availableActions. Kultainen jälki
// Kultaiset/kauppajalki.json (Kultaiset/tee-kauppajalki.mjs) vaatii, että sama
// käsikirjoitus tuottaa saman tilan ja SAMAN MÄÄRÄN satunnaislukukutsuja
// joka teon jälkeen, myös tallennuksen yli.
//
// KYTKENTÄ: new Kaupat(matka). Tila kulkee Pelitilassa (Pelitila.Kaupat =
// Kauppatila), joten latauksen jälkeen luodaan uusi Kaupat ladatulle Matkalle
// kuten Kysely. Kaupat ei kytke Matkaan koukkuja; se kutsuu Matkan tekoja.
//
// AVAIMET kuten webissä: kulttuuri 'lauta:kaupunki', minitehtävä
// 'lauta:kaupunki:aihe', pullavinkki 'lauta:kaupunki' (ja kutsujan omat
// avaimet, esim. 'sahke:<tehtävä>:vinkki'), eläintäky ISO3, juliste kutsujan
// avain. Lauta = Laattamaailma.LautaId ('maailmankartta').
//
// PALKKIOT JA HINNAT päättää kutsuja (web: käyttöliittymämoduulit); niiden
// webin arvot ovat KauppaVakiot-luokassa, jotta Unity-kerros käyttää samoja.
//
// POIKKEAMAT: web say-lokirivit puuttuvat (portissa ei ole lokia).
// Näytölle animoitavat tapahtumat (web emit) kulkevat Matka.Tapahtui-
// tapahtumana: mannerlento 'flight', sähkepalkkio 'aid'.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Hinnat ja palkkiot (js/game.js ja sen kutsujat käyttöliittymässä).</summary>
    public static class KauppaVakiot
    {
        public const int PullaHinta = 25;              // game.js PULLA_HINTA
        public const int KulttuuriPalkkio = 25;        // actionKulttuuri oletus = packs/africa-kulttuuri.js KULTTUURI_PALKKIO
        public const int MinitehtavaPalkkio = 10;      // actionMinitehtava oletus = ui.js MINITEHTAVA_PALKKIO
        public const int FokusTehtavaPalkkio = 50;     // fokustehtavat.js FOKUS_TEHTAVA_PALKKIO
        public const int TakyPalkkio = 50;             // fokusvirta.js TAKY_PALKKIO (skandaalit, hetket, syvennys)
        public const int ElaintakyPalkkio = 20;        // elaintaky.js ELAINTAKY_PALKKIO
        public const int NostonVisaPalkkio = 25;       // fokusnosto.js NOSTON_VISA_PALKKIO
        public const string NostonVisaKaupunki = "nosto"; // fokusnosto.js NOSTON_VISA_KAUPUNKI
        public const int SahkePalkkio = 200;           // fokusvirta.js SAHKE_PALKKIO
        public const double SahkeVahennys = 0.25;      // fokusvirta.js SAHKE_VAHENNYS (−25 % / ohilyönti)
        public const int SahkePullaVinkkiHinta = 50;   // fokusvirta.js SAHKE_PULLA_VINKKI_HINTA
        public const int SahkePullaLinkkiHinta = 25;   // fokusvirta.js SAHKE_PULLA_LINKKI_HINTA

        /// <summary>Web sahkePalkkio(ohi, pohja): max(0, Math.round(pohja × (1 − 0,25 × ohi))).</summary>
        public static int SahkePalkkioOhilyonneista(int ohi, int pohja = SahkePalkkio) =>
            Math.Max(0, (int)Math.Floor(pohja * (1 - SahkeVahennys * ohi) + 0.5));

        /// <summary>Web sahkePullaAvain(tehtävä, laji): 'sahke:&lt;id&gt;:&lt;laji&gt;' tai '' ilman tunnusta.</summary>
        public static string SahkePullaAvain(string tehtavaId, string laji) =>
            string.IsNullOrEmpty(tehtavaId) ? "" : $"sahke:{tehtavaId}:{laji}";

        /// <summary>Web MANNERLENTO_ILMOITUS (Foggin ääni, pääaarteen jälkeen).</summary>
        public const string MannerlentoIlmoitus = "Mantereen aarre on laukussa. Isoisä olisi etsinyt satamasta laivaa — minä ostin lentolipun puhelimella: toiselle mantereelle pääsee nyt mistä tahansa kaupungista.";

        /// <summary>Web MANNER_NIMET: mantereen nimi ja illatiivi napin tekstiin.</summary>
        public static readonly IReadOnlyDictionary<string, (string Nimi, string Illatiivi)> MannerNimet =
            new Dictionary<string, (string, string)>
            {
                ["europe"] = ("Eurooppa", "Eurooppaan"),
                ["middleeast"] = ("Lähi-itä", "Lähi-itään"),
                ["africa"] = ("Afrikka", "Afrikkaan"),
                ["asia"] = ("Aasia", "Aasiaan"),
                ["northamerica"] = ("Pohjois-Amerikka", "Pohjois-Amerikkaan"),
                ["southamerica"] = ("Etelä-Amerikka", "Etelä-Amerikkaan"),
                ["oceania"] = ("Oseania", "Oseaniaan"),
            };

        /// <summary>Web MANNERLENTO_NAPPI({manner, label}).</summary>
        public static string MannerlentoNappi(MannerlentoKohde k) =>
            k.Manner != null && MannerNimet.TryGetValue(k.Manner, out var n)
                ? $"Lennä {n.Illatiivi}: {k.Nimi}" : $"Toiselle mantereelle: {k.Nimi}";
    }

    /// <summary>Kaupan teon tulos (web {ok, error, palkittu, uusi, hinta, palkkio, found, duel}).</summary>
    public sealed class KauppaTulos
    {
        public bool Ok;
        public string Virhe;          // web error
        public bool Palkittu;         // web palkittu (kulttuuri, minitehtävä)
        public bool Uusi;             // web uusi (eläintäky, juliste)
        public int Hinta;             // web hinta (pulla)
        public int Palkkio;           // web palkkio (eläintäky, sähke)
        public string Loyto;          // web found (sähke: tyyppi, 'pollo' tai null)
        public static KauppaTulos Epaonnistui(string virhe) => new KauppaTulos { Ok = false, Virhe = virhe };
    }

    /// <summary>Mannerlennon kohde (web mannerLennot: {city, manner, label}).</summary>
    public sealed class MannerlentoKohde
    {
        public string Kaupunki;
        public string Manner;
        public string Nimi;
    }

    /// <summary>Mitä vuorossa oleva voi tehdä (web availableActions).</summary>
    public sealed class Toiminnot
    {
        public List<Kulkutapa> Matkat;               // web travel
        public bool Heitto;                          // web roll
        /// <summary>Web quiz = phase 'offer'. Portissa tarjousvaihetta ei ole (web offerQuiz palauttaa aina false).</summary>
        public bool Kysymys;
        public List<string> Lennot;                  // web fly
        public List<MannerlentoKohde> MannerLennot;  // web mannerFlights
    }

    /// <summary>Kauppojen tallennettava tila (Pelitila.Kaupat).</summary>
    public sealed class Kauppatila
    {
        public HashSet<string> KulttuuriVastatut = new HashSet<string>();     // web kulttuuriVastatut
        public HashSet<string> MinitehtavatVastatut = new HashSet<string>();  // web minitehtavatVastatut
        public HashSet<string> MinitehtavatOikein = new HashSet<string>();    // web minitehtavatOikein
        public int NostotehtavatRatkaistu;                                    // web nostotehtavatRatkaistu
        public bool AarrepisteOhjeNahty;                                      // web aarrepisteOhjeNahty
        public HashSet<string> PullaVinkit = new HashSet<string>();           // web pullaVinkit
        public HashSet<string> ElaintakyLunastetut = new HashSet<string>();   // web elaintakyLunastetut
        /// <summary>Web julisteet (Set): voittojärjestyksessä, koska laukku näyttää kolme viimeisintä.</summary>
        public List<string> Julisteet = new List<string>();

        static string Jarj(IEnumerable<string> l) =>
            "[" + string.Join(",", l.OrderBy(x => x, StringComparer.Ordinal).Select(Pelitila.Teksti)) + "]";

        /// <summary>Sama JSON kuin tallennuksen kentässä kaupat (lehtikuoren alkutila, verkkopelin asetaLehtikuorenTila).</summary>
        public string Json()
        {
            var sb = new StringBuilder();
            Kirjoita(sb);
            return sb.ToString();
        }

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"kulttuuri\":").Append(Jarj(KulttuuriVastatut));
            sb.Append(",\"minitehtavat\":").Append(Jarj(MinitehtavatVastatut));
            sb.Append(",\"minitehtavatOikein\":").Append(Jarj(MinitehtavatOikein));
            sb.Append(",\"nostotehtavat\":").Append(NostotehtavatRatkaistu.ToString(CultureInfo.InvariantCulture));
            sb.Append(",\"aarrepisteOhje\":").Append(AarrepisteOhjeNahty ? "true" : "false");
            sb.Append(",\"pullat\":").Append(Jarj(PullaVinkit));
            sb.Append(",\"elaintayt\":").Append(Jarj(ElaintakyLunastetut));
            // Voittojärjestys kuten webin [...julisteet] (ei lajittelua).
            sb.Append(",\"julisteet\":[").Append(string.Join(",", Julisteet.Select(Pelitila.Teksti))).Append(']');
            sb.Append('}');
        }

        static void Lisaa(HashSet<string> joukko, Dictionary<string, object> o, string nimi)
        {
            if (MiniJson.Kentta(o, nimi) is List<object> l)
                foreach (var x in l) if (x is string s) joukko.Add(s);
        }

        /// <summary>Puuttuva olio (vanha tallennus) = tyhjä tila, kuten web fromJSON (?? []).</summary>
        internal static Kauppatila Lue(Dictionary<string, object> o)
        {
            var t = new Kauppatila();
            if (o == null) return t;
            Lisaa(t.KulttuuriVastatut, o, "kulttuuri");
            Lisaa(t.MinitehtavatVastatut, o, "minitehtavat");
            // Web: vanha tallennus ilman oikein-joukkoa lukee jokaisen vastatun ratkaistuksi.
            if (MiniJson.Kentta(o, "minitehtavatOikein") is List<object>) Lisaa(t.MinitehtavatOikein, o, "minitehtavatOikein");
            else t.MinitehtavatOikein.UnionWith(t.MinitehtavatVastatut);
            // Web: rikkinäinen tai puuttuva laskuri = 0, negatiivinen = 0.
            t.NostotehtavatRatkaistu = MiniJson.Luku(o, "nostotehtavat") is double n && !double.IsNaN(n) && !double.IsInfinity(n)
                ? Math.Max(0, (int)Math.Truncate(n)) : 0;
            t.AarrepisteOhjeNahty = MiniJson.Totuus(o, "aarrepisteOhje");
            Lisaa(t.PullaVinkit, o, "pullat");
            Lisaa(t.ElaintakyLunastetut, o, "elaintayt");
            if (MiniJson.Kentta(o, "julisteet") is List<object> jl)
                foreach (var x in jl) if (x is string s && !t.Julisteet.Contains(s)) t.Julisteet.Add(s);
            return t;
        }
    }

    /// <summary>
    /// Kauppojen sisältö sisältöpaketista (kokoelmat/elaintayt.json ja
    /// julisteet.json): missä maissa on eläintäky ja mitkä julisteet on
    /// olemassa. Pelilogiikka ei tarvitse näitä (avaimet ovat kutsujan);
    /// Unity-kerros päättää niistä, mitä tarjotaan.
    /// </summary>
    public sealed class Kauppasisalto
    {
        public sealed class Elaintaky
        {
            public string Maa, Elain, Otsikko, Teksti, Lahde;
            /// <summary>Kuvan valmis osoite (päätason kuva.url, skeema 1.26) tai vanhassa paketissa polku (data.kuva).</summary>
            public string Kuva;
            public double Lat, Lon;
        }

        public sealed class Juliste
        {
            /// <summary>Kaupunki-id tai kaupungin alikohde (Kaupat.MyonnaJuliste-avain).</summary>
            public string Avain;
            /// <summary>Kaupunki, jos juliste on kaupungin oma (alikohteella null).</summary>
            public string Kaupunki;
            /// <summary>Julisteen valmis osoite (päätason kuva.url, skeema 1.26) tai vanhassa paketissa tiedosto (data.tiedosto).</summary>
            public string Tiedosto;
            public string Otsikko, Lyhyt, Selite;
        }

        /// <summary>Eläintäyt maittain (ISO3), paketin järjestyksessä.</summary>
        public readonly Dictionary<string, Elaintaky> Elaintayt = new Dictionary<string, Elaintaky>();
        /// <summary>Julisteet avaimittain, paketin järjestyksessä.</summary>
        public readonly Dictionary<string, Juliste> Julisteet = new Dictionary<string, Juliste>();

        static IEnumerable<Dictionary<string, object>> Alkiot(string json) =>
            json == null ? Enumerable.Empty<Dictionary<string, object>>()
                : MiniJson.Alkiot(json);

        /// <summary>
        /// Lukee kokoelmien tekstit (kumpi tahansa voi olla null). Päätason kentät ensin (skeema 1.26),
        /// vanhan paketin data.* vain Paataso-varareitillä.
        /// </summary>
        public static Kauppasisalto Lue(string elaintaytJson, string julisteetJson)
        {
            var s = new Kauppasisalto();
            foreach (var a in Alkiot(elaintaytJson))
            {
                var d = Paataso.Nakyma(a, Paataso.Elaintaky);
                var maa = MiniJson.Teksti(a, "maa") ?? MiniJson.Teksti(a, "id");
                s.Elaintayt[maa] = new Elaintaky
                {
                    Maa = maa,
                    Elain = MiniJson.Teksti(d, "elain"),
                    Otsikko = MiniJson.Teksti(d, "otsikko"),
                    Teksti = MiniJson.Teksti(d, "teksti"),
                    Lahde = MiniJson.Teksti(d, "lahde"),
                    Kuva = MiniJson.Teksti(MiniJson.Kentta(a, "kuva") as Dictionary<string, object>, "url") ?? MiniJson.Teksti(Paataso.Raaka(a), "kuva"),
                    Lat = MiniJson.Luku(d, "lat") ?? 0,
                    Lon = MiniJson.Luku(d, "lon") ?? 0,
                };
            }
            foreach (var a in Alkiot(julisteetJson))
            {
                var d = Paataso.Nakyma(a, Paataso.Juliste);
                var avain = MiniJson.Teksti(a, "id");
                s.Julisteet[avain] = new Juliste
                {
                    Avain = avain,
                    Kaupunki = MiniJson.Teksti(a, "kaupunki"),
                    Tiedosto = MiniJson.Teksti(MiniJson.Kentta(a, "kuva") as Dictionary<string, object>, "url") ?? MiniJson.Teksti(Paataso.Raaka(a), "tiedosto"),
                    Otsikko = MiniJson.Teksti(d, "otsikko"),
                    Lyhyt = MiniJson.Teksti(d, "lyhyt"),
                    Selite = MiniJson.Teksti(d, "selite"),
                };
            }
            return s;
        }

        /// <summary>Kaupungin oma juliste tai null.</summary>
        public Juliste KaupunginJuliste(string kaupunki) =>
            kaupunki != null && Julisteet.TryGetValue(kaupunki, out var j) && j.Kaupunki == kaupunki ? j : null;
    }

    public sealed class Kaupat
    {
        public Matka Matka { get; }

        Pelitila Tila => Matka.Tila;
        Kauppatila K => Matka.Tila.Kaupat;
        Pelaaja P => Tila.Pelaaja;

        public Kaupat(Matka matka)
        {
            Matka = matka ?? throw new ArgumentNullException(nameof(matka));
        }

        /// <summary>Laudan tunnus avaimiin (web pack.id).</summary>
        public string Lauta => Matka.Laatat?.LautaId ?? "maailmankartta";

        string Avain(string kaupunki) => Lauta + ":" + kaupunki;

        // --- lehden tehtävät (kulttuurivisa, minitehtävä, nosto) --------------

        /// <summary>
        /// Web actionKulttuuri: vastaus kirjataan kerran per kaupunki, oikeasta
        /// palkkio. Väärä ei maksa, mutta uutta yritystä ei saa.
        /// </summary>
        public KauppaTulos Kulttuuri(string kaupunki, bool oikein, int palkkio = KauppaVakiot.KulttuuriPalkkio)
        {
            if (!K.KulttuuriVastatut.Add(Avain(kaupunki))) return KauppaTulos.Epaonnistui("Jo vastattu");
            if (oikein) P.Raha += palkkio;
            return new KauppaTulos { Ok = true, Palkittu = oikein };
        }

        /// <summary>Onko kaupungin kulttuurikysymykseen jo vastattu (web kulttuuriVastatut.has).</summary>
        public bool KulttuuriVastattu(string kaupunki) => K.KulttuuriVastatut.Contains(Avain(kaupunki));

        /// <summary>
        /// Web actionMinitehtava: lehden minitehtävä palkitaan kerran per
        /// kaupunki ja aihe (maan yhteinen aihesivu voi palkita eri kaupungissa).
        /// </summary>
        public KauppaTulos Minitehtava(string kaupunki, string aihe, bool oikein, int palkkio = KauppaVakiot.MinitehtavaPalkkio)
        {
            var avain = Avain(kaupunki) + ":" + aihe;
            if (!K.MinitehtavatVastatut.Add(avain)) return KauppaTulos.Epaonnistui("Jo vastattu");
            if (oikein)
            {
                K.MinitehtavatOikein.Add(avain);
                P.Raha += palkkio;
            }
            return new KauppaTulos { Ok = true, Palkittu = oikein };
        }

        /// <summary>Web minitehtavatVastatut.has('lauta:kaupunki:aihe').</summary>
        public bool MinitehtavaVastattu(string kaupunki, string aihe) => K.MinitehtavatVastatut.Contains(Avain(kaupunki) + ":" + aihe);

        /// <summary>Web minitehtavatOikein.has: ratkaistu oikein (juliste myönnetään tästä takautuvasti).</summary>
        public bool MinitehtavaRatkaistu(string kaupunki, string aihe) => K.MinitehtavatOikein.Contains(Avain(kaupunki) + ":" + aihe);

        /// <summary>
        /// Web kirjaaNostotehtava: karttanoston minikysymys ratkesi. Kutsutaan
        /// vasta, kun Minitehtava palautti Ok ja vastaus oli oikein. Palauttaa laskurin.
        /// </summary>
        public int KirjaaNostotehtava() => ++K.NostotehtavatRatkaistu;

        /// <summary>Web merkitseAarrepisteOhje: kertalippu pulun karttaohjeelle. Tosi = kului nyt.</summary>
        public bool MerkitseAarrepisteOhje()
        {
            if (K.AarrepisteOhjeNahty) return false;
            K.AarrepisteOhjeNahty = true;
            return true;
        }

        // --- pulla Livialle -------------------------------------------------

        /// <summary>Web actionPullaVinkki: aarteen vinkki rahalla, kerran per kaupunki.</summary>
        public KauppaTulos PullaVinkki(string kaupunki, int hinta = KauppaVakiot.PullaHinta) =>
            PullaOstos(Avain(kaupunki), hinta, "sai vinkin aarteen paikasta");

        /// <summary>
        /// Web actionPullaOstos: yhteinen kassa kaikille pullille (avain kutsujan,
        /// esim. KauppaVakiot.SahkePullaAvain). Ei kuluta vuoroa.
        /// <paramref name="mita"/> on webin lokirivin teksti (portissa ei lokia).
        /// </summary>
        public KauppaTulos PullaOstos(string avain, int hinta = KauppaVakiot.PullaHinta, string mita = "sai vinkin")
        {
            if (string.IsNullOrEmpty(avain)) return KauppaTulos.Epaonnistui("Avain puuttuu");
            if (K.PullaVinkit.Contains(avain)) return KauppaTulos.Epaonnistui("Jo ostettu");
            var p = P;
            if (p.Raha < hinta) return KauppaTulos.Epaonnistui("Rahat eivät riitä");
            p.Raha -= hinta;
            K.PullaVinkit.Add(avain);
            return new KauppaTulos { Ok = true, Hinta = hinta };
        }

        /// <summary>Web pullaVinkkiOstettu(kaupunki).</summary>
        public bool PullaVinkkiOstettu(string kaupunki) => K.PullaVinkit.Contains(Avain(kaupunki));

        /// <summary>Web pullaOstettu(avain).</summary>
        public bool PullaOstettu(string avain) => !string.IsNullOrEmpty(avain) && K.PullaVinkit.Contains(avain);

        // --- eläintäyt ja julisteet ------------------------------------------

        /// <summary>
        /// Web actionElaintaky: löytöpalkkio kerran per maa (ISO3). Jo lunastettu
        /// palauttaa Ok, Uusi = false, Palkkio = 0. Palkkio null tai ≤ 0 → 0.
        /// Palkkio on kutsujan (web: ei oletusta; käyttöliittymä antaa
        /// KauppaVakiot.ElaintakyPalkkio).
        /// </summary>
        public KauppaTulos Elaintaky(string iso, int? palkkio)
        {
            if (string.IsNullOrEmpty(iso)) return KauppaTulos.Epaonnistui("Maa puuttuu");
            if (!K.ElaintakyLunastetut.Add(iso)) return new KauppaTulos { Ok = true, Uusi = false, Palkkio = 0 };
            int maksu = palkkio.HasValue && palkkio.Value > 0 ? palkkio.Value : 0;
            P.Raha += maksu;
            return new KauppaTulos { Ok = true, Uusi = true, Palkkio = maksu };
        }

        /// <summary>Web elaintakyLunastettu(iso).</summary>
        public bool ElaintakyLunastettu(string iso) => iso != null && K.ElaintakyLunastetut.Contains(iso);

        /// <summary>Web myonnaJuliste: juliste laukkuun (myös takautuvasti). Aina Ok; Uusi = oliko uusi.</summary>
        public KauppaTulos MyonnaJuliste(string avain)
        {
            if (string.IsNullOrEmpty(avain) || K.Julisteet.Contains(avain)) return new KauppaTulos { Ok = true, Uusi = false };
            K.Julisteet.Add(avain);
            return new KauppaTulos { Ok = true, Uusi = true };
        }

        /// <summary>Onko juliste jo laukussa (web julisteet.has).</summary>
        public bool JulisteLaukussa(string avain) => avain != null && K.Julisteet.Contains(avain);

        // --- mannerlento ------------------------------------------------------

        string MannerOf(string kaupunki) =>
            Matka.Laatat?.MannerOf(kaupunki)
            ?? (Matka.Verkko.Kaupungit.TryGetValue(kaupunki, out var k) && k.Manner != null ? k.Manner : Lauta);

        bool PaaaarreLoytynyt(string manner) => Matka.Laatat != null && Matka.Laatat.PaaaarreLoytynyt(manner);

        /// <summary>
        /// Web mannerLennot: kun oman mantereen pääaarre on löytynyt, lento
        /// mistä tahansa kaupungista (ei lentokenttäehtoa) jokaisen mantereen
        /// ensimmäiseen aloituskaupunkiin, jonka mantereen aarre on vielä
        /// kateissa. Vain vaellustilassa, vaiheessa Toiminta, 300 p.
        /// Valinta on vakio eikä kuluta arvontaa.
        /// </summary>
        public List<MannerlentoKohde> MannerLennot(Pelaaja p = null)
        {
            p ??= P;
            var kohteet = new List<MannerlentoKohde>();
            if (Tila.Vaihe != Vaihe.Toiminta) return kohteet;
            if (!Matka.Vaellus) return kohteet;
            if (p.Raha < Vakiot.LentoHinta) return kohteet;
            if (!p.Sijainti.Kaupungissa || !Matka.Verkko.Kaupungit.ContainsKey(p.Sijainti.Kaupunki)) return kohteet;
            var oma = MannerOf(p.Sijainti.Kaupunki);
            if (!PaaaarreLoytynyt(oma)) return kohteet;
            var nahdyt = new HashSet<string> { oma };
            foreach (var c in Matka.KaupunkiLista(Matka.Verkko))
            {
                if (!c.Aloitus) continue;
                var manner = MannerOf(c.Id);
                if (!nahdyt.Add(manner)) continue;
                if (PaaaarreLoytynyt(manner)) continue;
                kohteet.Add(new MannerlentoKohde { Kaupunki = c.Id, Manner = manner, Nimi = c.Nimi });
            }
            return kohteet;
        }

        /// <summary>Web actionMannerLento: lento toiselle mantereelle, 300 p, vie vuoron.</summary>
        public KauppaTulos MannerLento(string kaupunki)
        {
            if (!MannerLennot().Any(k => k.Kaupunki == kaupunki)) return KauppaTulos.Epaonnistui("Sinne ei ole mannerlentoa");
            Matka.MannerLennonSiirto(kaupunki);
            return new KauppaTulos { Ok = true };
        }

        // --- pöllön sähketehtävä ------------------------------------------------

        /// <summary>
        /// Web avaaAarreSahkeella: oikea vastaussähke kääntää laatan ilman visaa.
        /// Palkkio (kutsujan laskema, KauppaVakiot.SahkePalkkioOhilyonneista)
        /// maksetaan ENNEN kääntöä, +25 tp (vaikea vastaus), sitten laatta
        /// kääntyy (Matka.KaannaLaatta) ja vuoro päättyy kuten Kysely.Sulje.
        /// Kaupunkia ei tarvitse seistä (web ei tarkista sijaintia).
        /// </summary>
        public KauppaTulos AvaaAarreSahkeella(string kaupunki, int palkkio = 0)
        {
            // Web hyväksyy myös vaiheen 'offer', jota portissa ei ole.
            if (Tila.Vaihe != Vaihe.Toiminta) return KauppaTulos.Epaonnistui("Väärä vaihe");
            if (!Matka.LaattaTassa(kaupunki)) return KauppaTulos.Epaonnistui("Täällä ei ole laattaa");
            var p = P;
            if (palkkio > 0)
            {
                p.Raha += palkkio;
                Matka.Ilmoita("aid", $"Sähkepalkkio +{palkkio} puntaa");
            }
            Matka.Kokemus.Anna(p, Kokemus.VaikeaVastaus);
            var loyto = Matka.KaannaLaatta(kaupunki)?.WebTulos;
            var tulos = new KauppaTulos { Ok = true, Loyto = loyto, Palkkio = palkkio };
            if (Tila.Vaihe == Vaihe.Ohi) return tulos;
            Tila.Vaihe = Vaihe.Toiminta;
            Matka.PaataVuoro();
            return tulos;
        }

        // --- mitä voi tehdä ----------------------------------------------------

        /// <summary>Web availableActions: matkat, heitto, kysymys (offer), lennot ja mannerlennot.</summary>
        public Toiminnot Toiminnot() => new Toiminnot
        {
            Matkat = Matka.Kulkutavat(),
            Heitto = Tila.Vaihe == Vaihe.Heitto,
            Kysymys = false,
            Lennot = Tila.Vaihe == Vaihe.Toiminta ? Matka.LentoKohteet() : new List<string>(),
            MannerLennot = MannerLennot(),
        };
    }
}
