// AARRELAATAT: suora portti verkkopelin js/tokens.js-tiedostosta
// (createTokenPile, tokenPileTemplate, arvoAarteenArvo) ja js/game.js:n
// laattaosista (enterWorld: pinon sekoitus + jaaLaatat, revealToken,
// lukitseAarre:n laattaosa, kirjaaLoytopaikka).
//
// Kultainen jälki: Peli-testit/Kultaiset/laattajalki.json
// (Kultaiset/tee-laattajalki.mjs), testi Testit/LaattaTestit.cs. Testi vaatii
// saman jaon, samat arvot ja SAMAN MÄÄRÄN satunnaislukukutsuja kuin web.
//
// RNG-JÄRJESTYS PELIN LUONNISSA (web constructor → enterWorld):
//   1. createTokenPile: Fisher–Yates, pinon koko − 1 kutsua (maailmankartta 265)
//   2. jaaLaatat/sijoita('star'): yksi kutsu per manner (7)
//   3. jaaLaatat/sijoita('mannerAarre'): yksi kutsu per manner (7)
//   4. jaaLaatat: yksi kutsu per aloituskaupunkiin osunut ylimääräinen
//      pääaarre (maailmankartalla ei koskaan)
// Maailmankartalla yhteensä 279 = matkajäljen rngAlussa. Konstruktorin
// beginTurn ei kuluta satunnaisuutta: Matka.Luo(…, Laattamaarat) kutsuu
// Laattamaailma.Jaa samalla Satunnaisella ennen ensimmäistä vuoroa (erä 3).
//
// JAKO MATKAN KANSSA: tämä luokka omistaa laudan laattatilan (web world.tokens,
// world.revealed, world.starsFound). Pelaajan tila (raha, tähdet,
// tietäjäpisteet, finds) kuuluu Pelitilalle: Kaanna palauttaa Loyto-olion,
// jonka Matka.KaannaLaatta kirjaa pelaajalle (ks. Loyto-luokan kommentti).
// Tallennus: Pelitila.Laatat (Kirjoita/Lue alla), Map-järjestys säilyy.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Laattatyyppien tunnisteet kuten webissä (TOKEN_TYPES-avaimet).</summary>
    public static class Laattatyypit
    {
        public const string Paaaarre = "star";
        public const string MannerAarre = "mannerAarre";
        public const string IsoAarre = "isoAarre";
        public const string PieniAarre = "pieniAarre";
        /// <summary>Sisäinen merkki: pöllön korvaama laatta (ei aarre).</summary>
        public const string Tyhja = "empty";

        /// <summary>Web onAarre / AARRETYYPIT.</summary>
        public static bool OnAarre(string tyyppi) =>
            tyyppi == Paaaarre || tyyppi == MannerAarre || tyyppi == IsoAarre || tyyppi == PieniAarre;

        /// <summary>Tyypit, joita on yksi per manner ja jotka eivät saa kadota (star, mannerAarre).</summary>
        public static bool OnAinutkertainen(string tyyppi) => tyyppi == Paaaarre || tyyppi == MannerAarre;

        /// <summary>Web TOKEN_TYPES[type].value (kiinteä arvo; tuntematon tyyppi → 0).</summary>
        public static int KiinteaArvo(string tyyppi) => tyyppi == MannerAarre ? LaattaVakiot.MannerAarreArvo : 0;
    }

    /// <summary>Laattojen vakiot (js/tokens.js, js/game.js).</summary>
    public static class LaattaVakiot
    {
        public const int MannerAarreArvo = 1000;  // MANNER_AARRE_ARVO
        public const int PieniMin = 100, PieniMax = 250;  // PIENI_AARRE_ARVO
        public const int IsoMin = 500, IsoMax = 800;      // ISO_AARRE_ARVO
        public const int PaaaarrePalkkio = 2000;  // STAR_PRIZE (vain vaellustilassa)
        public const int TpPaaaarre = 100;        // XP_STAR
        public const int TpEnnatys = 200;         // XP_RECORD (noteRecord, Matkan vastuulla)
        public const int EnnatysPaivat = 80;      // RECORD_DAYS
    }

    /// <summary>
    /// Laudan laattamäärät (web pack.tokens.counts) JÄRJESTYKSESSÄ: pinon
    /// malli syntyy Object.entries-järjestyksessä, joten järjestys on osa
    /// jakoa. Paketissa: moduulit/js/packs/maailmankartta.json
    /// exportit.MAAILMANKARTTA.tokens.counts; testeissä Kultaiset/paketti/laatat.json.
    /// </summary>
    public sealed class Laattamaarat
    {
        public readonly List<KeyValuePair<string, int>> Maarat = new List<KeyValuePair<string, int>>();

        public Laattamaarat() { }
        public Laattamaarat(IEnumerable<KeyValuePair<string, int>> maarat) { foreach (var m in maarat) Lisaa(m.Key, m.Value); }

        public Laattamaarat Lisaa(string tyyppi, int maara)
        {
            if (!Laattatyypit.OnAarre(tyyppi)) throw new ArgumentException($"laattatyyppi {tyyppi} ei ole aarre (poistettu pelistä)");
            Maarat.Add(new KeyValuePair<string, int>(tyyppi, maara));
            return this;
        }

        /// <summary>Paketin tyypit, jotka Lue ohitti (ei aarre, esim. robber).</summary>
        public readonly List<string> Ohitetut = new List<string>();

        public int Yhteensa { get { int s = 0; foreach (var m in Maarat) s += m.Value; return s; } }

        /// <summary>
        /// Lukee määrät JSONista. Kelpaa kolme muotoa: {"counts":{…}} (laatat.json
        /// tai pack.tokens), sisältöpaketin moduuli {"exportit":{"MAAILMANKARTTA":{"tokens":{"counts":…}}}}
        /// tai pelkkä {"star":7,…}. MiniJson säilyttää avainten järjestyksen.
        /// </summary>
        public static Laattamaarat Lue(string json)
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            if (MiniJson.Kentta(o, "exportit") is Dictionary<string, object> ex)
            {
                foreach (var e in ex.Values)
                    if (e is Dictionary<string, object> lauta && MiniJson.Kentta(lauta, "tokens") is Dictionary<string, object> t)
                    { o = t; break; }
            }
            // Kokoelma kokoelmat/laatat.json (Siirtoseppä #2944): alkiot[0] = { id: 'tokens', data: { types, mannerTypes, counts } }.
            if (MiniJson.Kentta(o, "alkiot") is List<object> alkiot && alkiot.Count > 0
                && alkiot[0] is Dictionary<string, object> alkio && MiniJson.Kentta(alkio, "data") is Dictionary<string, object> data) o = data;
            if (MiniJson.Kentta(o, "tokens") is Dictionary<string, object> tok) o = tok;
            if (MiniJson.Kentta(o, "counts") is Dictionary<string, object> c) o = c;
            var tulos = new Laattamaarat();
            foreach (var kv in o)
            {
                if (kv.Key.StartsWith("$")) continue;
                if (!(kv.Value is double d)) throw new FormatException($"laattamäärä {kv.Key} ei ole luku");
                // Vain aarteet: rosvolaatat, jalokivet, tyhjät ja muut poistetut tyypit eivät
                // pääse pinoon, vaikka paketissa olisi niille määrä (Raamattu 25.8.2026).
                if (!Laattatyypit.OnAarre(kv.Key)) { tulos.Ohitetut.Add(kv.Key); continue; }
                tulos.Lisaa(kv.Key, (int)d);
            }
            return tulos;
        }
    }

    /// <summary>
    /// JS Map -semantiikalla järjestetty kartta: uusi avain menee loppuun,
    /// olemassa olevan arvon vaihto pitää paikan, poisto poistaa. Webin
    /// [...tokens.entries()]-suodatukset (pöllö, lukitus) arpovat tästä
    /// järjestyksestä, joten tavallinen Dictionary ei kelpaa.
    /// </summary>
    public sealed class JarjestettyKartta : IReadOnlyDictionary<string, string>
    {
        readonly List<string> avaimet = new List<string>();
        readonly Dictionary<string, string> arvot = new Dictionary<string, string>();

        public string this[string avain] => arvot[avain];
        public IEnumerable<string> Keys => avaimet;
        public IEnumerable<string> Values { get { foreach (var a in avaimet) yield return arvot[a]; } }
        public int Count => avaimet.Count;
        public bool ContainsKey(string avain) => arvot.ContainsKey(avain);
        public bool TryGetValue(string avain, out string arvo) => arvot.TryGetValue(avain, out arvo);
        /// <summary>Web map.get: puuttuva → null.</summary>
        public string Hae(string avain) => arvot.TryGetValue(avain, out var a) ? a : null;

        /// <summary>Web map.set.</summary>
        public void Aseta(string avain, string arvo)
        {
            if (!arvot.ContainsKey(avain)) avaimet.Add(avain);
            arvot[avain] = arvo;
        }

        /// <summary>Web map.delete.</summary>
        public bool Poista(string avain)
        {
            if (!arvot.Remove(avain)) return false;
            avaimet.Remove(avain);
            return true;
        }

        public IEnumerator<KeyValuePair<string, string>> GetEnumerator()
        {
            foreach (var a in avaimet) yield return new KeyValuePair<string, string>(a, arvot[a]);
        }
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    /// <summary>
    /// Yhden laatan käännön tulos (web revealToken). Matka kirjaa sen pelaajalle:
    ///   pelaaja.Raha += RahaLisays; pelaaja.Paaaarteet += PaaaarreLisays;
    ///   pelaaja.Tp += TpLisays (web awardXp: linssi- ja tasokynnykset);
    ///   finds.Add(Tyyppi); findManner.Add(Manner); findMaa.Add(Maa);
    ///   jos Ennatys: web noteRecord (kerran pelissä recordNoted; jos päivä
    ///     &lt;= EnnatysPaivat, pelaaja.Tp += TpEnnatys) — pelin päivälaskuri on Matkalla;
    ///   jos Pollo: PolloLoydetty = true (pöllön paljastus UI:lle);
    ///   muuten linssi aarteen kylkiäisenä (web linssiAarteenKylkiaisena, KOUKKU,
    ///   vain isoAarre) ja lopuksi checkWin (Matka).
    /// </summary>
    public sealed class Loyto
    {
        public string Kaupunki;
        /// <summary>Kirjattu tyyppi (revealed ja finds). Pöllön korvaamana "empty".</summary>
        public string Tyyppi;
        /// <summary>Web palauttaa 'pollo': pöllö korvasi laatan aarteen kokonaan.</summary>
        public bool Pollo;
        /// <summary>Web viimeAarre.arvo (arvoAarteenArvo): löytöhetkellä arvottu arvo. Pöllöllä 0.</summary>
        public int Arvo;
        public int RahaLisays;
        public int PaaaarreLisays;
        public int TpLisays;
        /// <summary>Web findManner: laudan cityManner tai null (EI laudan tunnusta).</summary>
        public string Manner;
        /// <summary>Web findMaa: laudan cityCountry (ISO3) tai null.</summary>
        public string Maa;
        /// <summary>Pääaarre löytyi: Matka kutsuu webin noteRecordin vastineen (ennätysbonus).</summary>
        public bool Ennatys;
        /// <summary>Pääaarre vaelluksessa, ja muilla mantereilla on vielä aarre löytämättä (web MANNERLENTO_ILMOITUS).</summary>
        public bool MannerlentoIlmoitus;

        /// <summary>Webin revealToken-paluuarvo: 'pollo' tai tyyppi.</summary>
        public string WebTulos => Pollo ? "pollo" : Tyyppi;
    }

    /// <summary>
    /// Yhden laudan laattatila (web world.tokens, world.revealed, world.starsFound).
    /// Metodit ottavat pelin Satunnainen-olion parametrina, jotta kutsumäärä
    /// kulkee samassa laskurissa kuin muu peli.
    /// </summary>
    public sealed class Laattamaailma
    {
        public string LautaId { get; }
        /// <summary>Kääntämättömät laatat: kaupunki → tyyppi (web world.tokens), Map-järjestyksessä.</summary>
        public JarjestettyKartta Laatat { get; } = new JarjestettyKartta();
        /// <summary>Käännetyt laatat: kaupunki → tyyppi (web world.revealed).</summary>
        public JarjestettyKartta Kaannetyt { get; } = new JarjestettyKartta();
        /// <summary>Löytyneet pääaarteet: manner → kaupunki (web world.starsFound).</summary>
        public JarjestettyKartta PaaaarteetLoydetty { get; } = new JarjestettyKartta();

        readonly List<Kaupunki> kaupunkiLista;
        readonly Dictionary<string, Kaupunki> kaupungit = new Dictionary<string, Kaupunki>();

        Laattamaailma(string lautaId, IReadOnlyList<Kaupunki> lista)
        {
            LautaId = lautaId;
            kaupunkiLista = new List<Kaupunki>(lista);
            foreach (var k in kaupunkiLista) kaupungit[k.Id] = k;
        }

        /// <summary>
        /// Tyhjä maailma tallennuksen palautusta varten: kutsuja täyttää Laatat,
        /// Kaannetyt ja PaaaarteetLoydetty tallennuksen järjestyksessä.
        /// </summary>
        public static Laattamaailma Tyhja(IReadOnlyList<Kaupunki> kaupungit, string lautaId = "maailmankartta") =>
            new Laattamaailma(lautaId, kaupungit);

        /// <summary>
        /// Kaupungin manner (web mannerOf ja jaaLaatat mannerNimi): paketin
        /// manner-kenttä tai laudan tunnus, jos mannerta ei ole merkitty.
        /// </summary>
        public string MannerOf(string kaupunki) =>
            kaupungit.TryGetValue(kaupunki, out var k) && k.Manner != null ? k.Manner : LautaId;

        /// <summary>Web mantereenTahtiLoytynyt.</summary>
        public bool PaaaarreLoytynyt(string manner) => PaaaarteetLoydetty.ContainsKey(manner);

        /// <summary>Web starFound: onko yksikään pääaarre löytynyt.</summary>
        public bool JokinPaaaarreLoytynyt => PaaaarteetLoydetty.Count > 0;

        /// <summary>Laudan muut mantereet kaupunkijärjestyksessä (web muutMantereet).</summary>
        public List<string> MuutMantereet(string manner)
        {
            var ulos = new List<string>();
            foreach (var k in kaupunkiLista)
            {
                var m = MannerOf(k.Id);
                if (m == manner || ulos.Contains(m)) continue;
                ulos.Add(m);
            }
            return ulos;
        }

        static int Arpa(Satunnainen rng, int n) => (int)Math.Floor(rng.Seuraava() * n);

        // --- js/tokens.js -------------------------------------------------------

        /// <summary>Web tokenPileTemplate: tyypit määrien järjestyksessä.</summary>
        public static List<string> Mallipino(Laattamaarat maarat)
        {
            var pino = new List<string>();
            foreach (var m in maarat.Maarat)
                for (int i = 0; i < m.Value; i++) pino.Add(m.Key);
            return pino;
        }

        /// <summary>Web createTokenPile: Fisher–Yates lopusta alkuun (pino.Count − 1 kutsua).</summary>
        public static List<string> SekoitettuPino(Laattamaarat maarat, Satunnainen rng)
        {
            var pino = Mallipino(maarat);
            for (int i = pino.Count - 1; i > 0; i--)
            {
                int j = Arpa(rng, i + 1);
                var t = pino[i]; pino[i] = pino[j]; pino[j] = t;
            }
            return pino;
        }

        /// <summary>
        /// Web arvoAarteenArvo: pieni ja iso paikallisaarre arvotaan kymmenen
        /// punnan tarkkuudella (yksi kutsu), muut ovat kiinteitä (ei kutsua).
        /// </summary>
        public static int ArvoAarteenArvo(string tyyppi, Satunnainen rng)
        {
            int min, max;
            if (tyyppi == Laattatyypit.PieniAarre) { min = LaattaVakiot.PieniMin; max = LaattaVakiot.PieniMax; }
            else if (tyyppi == Laattatyypit.IsoAarre) { min = LaattaVakiot.IsoMin; max = LaattaVakiot.IsoMax; }
            else return Laattatyypit.KiinteaArvo(tyyppi);
            int askelia = (max - min) / 10 + 1;
            return min + Arpa(rng, askelia) * 10;
        }

        // --- js/game.js enterWorld + jaaLaatat ----------------------------------

        /// <summary>
        /// Web enterWorld: sekoittaa pinon ja jakaa laatat kaupungeille. Jokainen
        /// kaupunki saa laatan, joten pinon koko = kaupunkien määrä (muuten heittää
        /// kuten web). Kaupungit laudan järjestyksessä (Reittiverkko.KaupunkiLista).
        /// </summary>
        public static Laattamaailma Jaa(IReadOnlyList<Kaupunki> kaupungit, Laattamaarat maarat, Satunnainen rng,
            string lautaId = "maailmankartta")
        {
            var maailma = new Laattamaailma(lautaId, kaupungit);
            var pino = SekoitettuPino(maarat, rng);
            if (pino.Count != kaupungit.Count)
                throw new InvalidOperationException($"Laattoja {pino.Count}, kaupunkeja {kaupungit.Count}");
            maailma.JaaLaatat(pino, rng);
            return maailma;
        }

        /// <summary>
        /// Web jaaLaatat: pääaarre ja mantereen aarre yksi per manner (pääaarre ei
        /// aloituskaupunkiin), loput sekoitetusta pinosta kaupunkijärjestyksessä.
        /// </summary>
        void JaaLaatat(List<string> pino, Satunnainen rng)
        {
            var kaupunkiIdt = new List<string>();
            var startit = new HashSet<string>();
            foreach (var k in kaupunkiLista)
            {
                kaupunkiIdt.Add(k.Id);
                if (k.Aloitus) startit.Add(k.Id);
            }
            var mantereet = new List<string>();
            foreach (var id in kaupunkiIdt)
            {
                var m = MannerOf(id);
                if (!mantereet.Contains(m)) mantereet.Add(m);
            }

            var varatut = new Dictionary<string, string>(); // kaupunki → käsin sijoitettu tyyppi
            void Sijoita(string tyyppi, bool ohitaStartit)
            {
                int jaljella = 0;
                foreach (var t in pino) if (t == tyyppi) jaljella++;
                foreach (var manner in mantereet)
                {
                    if (jaljella <= 0) break;
                    var ehdokkaat = new List<string>();
                    foreach (var id in kaupunkiIdt)
                        if (MannerOf(id) == manner && !varatut.ContainsKey(id) && !(ohitaStartit && startit.Contains(id)))
                            ehdokkaat.Add(id);
                    if (ehdokkaat.Count == 0) continue;
                    var valittu = ehdokkaat[Arpa(rng, ehdokkaat.Count)];
                    varatut[valittu] = tyyppi;
                    jaljella--;
                }
            }
            Sijoita(Laattatyypit.Paaaarre, true);
            Sijoita(Laattatyypit.MannerAarre, false);

            // Käsin sijoitetut poistetaan pinon alusta; muiden järjestys säilyy.
            var poistettavia = new Dictionary<string, int>();
            foreach (var t in varatut.Values) poistettavia[t] = (poistettavia.TryGetValue(t, out var n) ? n : 0) + 1;
            var jaettava = new List<string>();
            foreach (var t in pino)
            {
                int j = poistettavia.TryGetValue(t, out var n) ? n : 0;
                if (j > 0) { poistettavia[t] = j - 1; continue; }
                jaettava.Add(t);
            }

            int i = 0;
            foreach (var id in kaupunkiIdt)
                Laatat.Aseta(id, varatut.TryGetValue(id, out var t) ? t : jaettava[i++]);

            // Ylimääräinen pääaarre aloituskaupungissa vaihtaa paikkaa arvotun
            // kaupungin kanssa. Web iteroi Mapia ja näkee muutetut arvot, joten
            // arvo luetaan joka kierroksella uudelleen.
            foreach (var id in kaupunkiIdt)
            {
                if (Laatat.Hae(id) != Laattatyypit.Paaaarre || !startit.Contains(id)) continue;
                var vapaat = new List<string>();
                foreach (var v in kaupunkiIdt) if (!startit.Contains(v) && !varatut.ContainsKey(v)) vapaat.Add(v);
                int k = Arpa(rng, vapaat.Count);
                if (k >= vapaat.Count) break; // web: vapaat[k] undefined → break
                var vaihto = vapaat[k];
                Laatat.Aseta(id, Laatat.Hae(vaihto));
                Laatat.Aseta(vaihto, Laattatyypit.Paaaarre);
            }
        }

        // --- js/game.js revealToken ---------------------------------------------

        /// <summary>
        /// Saman mantereen kääntämättömät laatat, jotka eivät ole star/mannerAarre
        /// (pöllön ja lukituksen siirtopaikat), Map-järjestyksessä.
        /// </summary>
        List<string> Siirtopaikat(string manner)
        {
            var vapaat = new List<string>();
            foreach (var kv in Laatat)
                if (!Laattatyypit.OnAinutkertainen(kv.Value) && MannerOf(kv.Key) == manner) vapaat.Add(kv.Key);
            return vapaat;
        }

        /// <summary>
        /// Web revealToken. Palauttaa null, jos kaupungissa ei ole laattaa.
        /// <paramref name="vaellus"/> = web roaming (pääaarre maksaa STAR_PRIZE).
        /// <paramref name="polloKorvaa"/> = web polloAarteena &amp;&amp; !polloLoydetty &amp;&amp; !p.isBot:
        /// pöllö korvaa laatan aarteen kokonaan; pääaarre siirretään ensin saman
        /// mantereen toiseen laattaan (yksi kutsu), ja jos paikkaa ei ole, laatta
        /// paljastuu tavallisesti.
        /// </summary>
        public Loyto Kaanna(string kaupunki, Satunnainen rng, bool vaellus, bool polloKorvaa = false)
        {
            var tyyppi = Laatat.Hae(kaupunki);
            if (tyyppi == null) return null;
            Laatat.Poista(kaupunki);

            var kaupunkiTieto = kaupungit.TryGetValue(kaupunki, out var kt) ? kt : null;
            var loyto = new Loyto
            {
                Kaupunki = kaupunki,
                Tyyppi = tyyppi,
                Manner = kaupunkiTieto?.Manner,
                Maa = kaupunkiTieto?.Maa,
            };

            if (polloKorvaa)
            {
                bool korvaa = true;
                if (tyyppi == Laattatyypit.Paaaarre)
                {
                    var vapaat = Siirtopaikat(MannerOf(kaupunki));
                    if (vapaat.Count > 0) Laatat.Aseta(vapaat[Arpa(rng, vapaat.Count)], Laattatyypit.Paaaarre);
                    else korvaa = false;
                }
                if (korvaa)
                {
                    Kaannetyt.Aseta(kaupunki, Laattatyypit.Tyhja);
                    loyto.Tyyppi = Laattatyypit.Tyhja;
                    loyto.Pollo = true;
                    return loyto;
                }
            }

            Kaannetyt.Aseta(kaupunki, tyyppi);
            loyto.Arvo = ArvoAarteenArvo(tyyppi, rng);
            switch (tyyppi)
            {
                case Laattatyypit.Paaaarre:
                {
                    var manner = MannerOf(kaupunki);
                    PaaaarteetLoydetty.Aseta(manner, kaupunki);
                    loyto.PaaaarreLisays = 1;
                    loyto.TpLisays = LaattaVakiot.TpPaaaarre;
                    loyto.Ennatys = true;
                    if (vaellus)
                    {
                        loyto.RahaLisays = LaattaVakiot.PaaaarrePalkkio;
                        foreach (var m in MuutMantereet(manner))
                            if (!PaaaarreLoytynyt(m)) { loyto.MannerlentoIlmoitus = true; break; }
                    }
                    break;
                }
                default:
                    loyto.RahaLisays = loyto.Arvo;
                    break;
            }
            return loyto;
        }

        // --- tallennus (Pelitila, versio 3) ----------------------------------------

        static void Parit(StringBuilder sb, JarjestettyKartta k)
        {
            sb.Append('[');
            bool eka = true;
            foreach (var kv in k)
            {
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append('[').Append(Pelitila.Teksti(kv.Key)).Append(',').Append(Pelitila.Teksti(kv.Value)).Append(']');
            }
            sb.Append(']');
        }

        /// <summary>
        /// {"lauta":…,"laatat":[[kaupunki,tyyppi],…],"kaannetyt":[…],"tahdet":[[manner,kaupunki],…]}
        /// — taulukot Map-järjestyksessä, koska pöllön ja lukituksen siirrot arpovat siitä.
        /// </summary>
        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"lauta\":").Append(Pelitila.Teksti(LautaId));
            sb.Append(",\"laatat\":"); Parit(sb, Laatat);
            sb.Append(",\"kaannetyt\":"); Parit(sb, Kaannetyt);
            sb.Append(",\"tahdet\":"); Parit(sb, PaaaarteetLoydetty);
            sb.Append('}');
        }

        /// <summary>
        /// Kirjoita-muodon luku. Kaupunkilista antaa mantereet (MannerOf); ilman sitä
        /// (Pelitila.FromJson ilman verkkoa) teksti kulkee ehjänä, mutta mantereet puuttuvat.
        /// </summary>
        internal static Laattamaailma Lue(Dictionary<string, object> o, IReadOnlyList<Kaupunki> kaupungit)
        {
            var w = new Laattamaailma(MiniJson.Teksti(o, "lauta") ?? "maailmankartta", kaupungit ?? Array.Empty<Kaupunki>());
            void Tayta(JarjestettyKartta k, string nimi)
            {
                if (!(MiniJson.Kentta(o, nimi) is List<object> l)) return;
                foreach (var pari in l)
                {
                    var p = (List<object>)pari;
                    k.Aseta((string)p[0], (string)p[1]);
                }
            }
            Tayta(w.Laatat, "laatat");
            // Vanhan tallennuksen kääntämätön rosvo- tai muu poistettu laatta katoaa (ei löydy laatan alta).
            foreach (var kaupunki in w.Laatat.Where(kv => !Laattatyypit.OnAarre(kv.Value)).Select(kv => kv.Key).ToList())
                w.Laatat.Poista(kaupunki);
            Tayta(w.Kaannetyt, "kaannetyt");
            Tayta(w.PaaaarteetLoydetty, "tahdet");
            return w;
        }

        // --- js/game.js lukitseAarre (laattaosa) --------------------------------

        /// <summary>
        /// Web lukitseAarre laatan osalta: laatta poistuu pelistä kääntämättä.
        /// Pääaarre ja mantereen aarre siirretään saman mantereen toiseen
        /// laattaan (yksi kutsu, jos paikka löytyy). Lukkojoukko (pack:city),
        /// lokirivi ja checkWin kuuluvat Matkalle. Palauttaa poistetun tyypin tai null.
        /// </summary>
        public string PoistaLukittu(string kaupunki, Satunnainen rng)
        {
            var tyyppi = Laatat.Hae(kaupunki);
            if (tyyppi == null) return null;
            Laatat.Poista(kaupunki);
            if (Laattatyypit.OnAinutkertainen(tyyppi))
            {
                var vapaat = Siirtopaikat(MannerOf(kaupunki));
                if (vapaat.Count > 0) Laatat.Aseta(vapaat[Arpa(rng, vapaat.Count)], tyyppi);
            }
            return tyyppi;
        }
    }
}
