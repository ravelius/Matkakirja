// KYSELY: kysymysmoottori suorana porttina verkkopelin js/game.js
// Game-luokasta: tehtavaTarjolla, canExplore, openExplore, formWeights,
// pickForm, kaariTilanne, kaariTarina, kaariYritysLuku, aarreLukittu,
// lukitseAarre (kirjanpito-osa), actionQuiz, openClaim, setPhotoPool,
// photoTargets, flagTargets, openFlagQuestion, openPhotoQuestion,
// answerQuiz, actionHint, actionKaveriapu, timeoutQuiz, actionFiftyFifty,
// closeQuiz, hardAvailable, pickQuestion, pickAsker, shuffledOrder.
// Kultainen jälki Kultaiset/kysymysjalki.json (Kultaiset/tee-kysymysjalki.mjs)
// vaatii, että sama käsikirjoitus tuottaa saman tilan ja SAMAN MÄÄRÄN
// satunnaislukukutsuja joka teon jälkeen.
//
// KYTKENTÄ MATKAAN: new Kysely(matka, data) asettaa Matkan koukut
// TehtavaTarjolla ('stay'-tapa) ja Tutki (ValitseKulkutapa(Pysy) → Avaa).
// Kokemus on Matkan (Matka.Kokemus, saapumispisteet kytketty siellä).
// Tallennuksen jälkeen luodaan uusi Kysely ladatulle Matkalle; kysymystila
// ja laatat kulkevat Pelitilassa.
//
// LAATTAKOUKUT: jos Matkalla on laattamaailma (Matka.Luo(…, Laattamaarat)),
// konstruktori kytkee ne Matkaan (erä 3); testit voivat korvata ne.
//   LaattaTassa     — web tokens.has(city) → Matka.LaattaTassa
//   LaattaKaantyy   — web revealToken(city) → Matka.KaannaLaatta (rahat,
//                     tähdet, pisteet, löytöpaikat, ennätys); palauttaa
//                     web-tuloksen, esim. 'pieniAarre' tai 'pollo'
//   AarreLukittuu   — web lukitseAarre:n laattaosa → Matka.LukitseLaatta
// MUUT KOUKUT (null = ominaisuutta ei ole):
//   PulmaOdottaa, AvaaPulma — web pendingPuzzle / openPuzzle: Pulmat.Kytke
//                     (Peli/Pulmat.cs, generaattorit portattu C#:ksi); vastaus-
//                     ja sulkulogiikka (Laji Pulma) on tässä
//   TapahtumiaOn, AvaaTapahtuma — web pack.events / openEvent: Tapahtumat.Kytke
//                     (Peli/Tapahtumat.cs; maailmankartalla ei tapahtumia, joten
//                     paino on nolla kuten webissä)
//   Liput           — web pack.map.countryShapes (ei sisältöpaketissa)
//   AsetaKuvat      — web setPhotoPool (käyttöliittymä syöttää kuratoidut kuvat)
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Pysähdyksen muoto (web form / quiz.kind): quiz, claim, photo, flag, event, puzzle.</summary>
    public enum KysymysMuoto { Visa, Vaite, Kuva, Lippu, Tapahtuma, Pulma }

    /// <summary>Kysymysten vaikeustaso (web difficulty / quizLevel): easy, normal, hard.</summary>
    public enum Vaikeustaso { Helppo, Perus, Vaikea }

    /// <summary>Kysymysten hinnat ja vakiot (js/game.js).</summary>
    public static class KysymysVakiot
    {
        public const int PuolitusHinta = 80;    // FIFTY_FIFTY_PRICE
        public const int VihjeHinta = 40;       // HINT_PRICE
        public const int KaveriapuHinta = 25;   // KAVERIAPU_HINTA
        public const int Sekunnit = 45;         // QUIZ_SECONDS
        public const int VaikeaPalkkio = 100;   // HARD_BONUS
        public const int TutkimusPalkkio = 50;  // EXPLORE_REWARD
        public const int KaariYritykset = 2;    // KAARI_YRITYKSET
        public const int KuvaVaihtoehdot = 4;   // PHOTO_CHOICES
        public const int LippuVaihtoehdot = 4;  // FLAG_CHOICES
    }

    /// <summary>Tarinakaaren kohtaamisen yritykset kaupungissa (web kaariYritykset-arvo).</summary>
    public sealed class KaariYritys
    {
        public int Yritykset;
        public bool Onnistui;
    }

    /// <summary>Avoin kysymys (web quiz-olio). Tallennetaan sellaisenaan.</summary>
    public sealed class AvoinKysymys
    {
        public KysymysMuoto Laji = KysymysMuoto.Visa;   // web kind (undefined = quiz)
        public string Kaupunki;                         // web cityId
        public bool Vaikea;                             // web hard
        public bool Kaari;                              // web kaari
        public bool Tutkimus;                           // web explore
        public string Kehys;                            // web frame (kysyjä)
        public string Kysymys;                          // web question
        public string Fakta;                            // web fact
        public List<string> Lahteet = new List<string>();   // web source
        public string Paikka;                           // web place (väittämä)
        public string KuvaKaupunki;                     // web photoCity
        public string KuvaTiedosto;                     // web photoFile
        public string LippuTiedosto;                    // web flagFile
        public string LippuMaa;                         // web flagCountry
        public List<string> Vaihtoehdot = new List<string>();  // web options
        public int Oikea;                               // web correct
        public string Vihje;                            // web hint
        public bool VihjeNaytetty;                      // web hintShown
        public List<int> Piilotetut = new List<int>();  // web hidden (50:50)
        public bool Kaveriapu;                          // web kaveriapu
        public int? Valittu;                            // web chosen (−1 = aika loppui)
        public bool? OikeinVastattu;                    // web right
        public bool AikaLoppui;                         // web timedOut
        public int? Sekunnit = KysymysVakiot.Sekunnit;  // web seconds (pulmalla null)
        public bool? AarreLukittui;                     // web aarreLukittui
        public string Loyto;                            // web found
        public bool Laatta;                             // web laatta (pulma laattakaupungissa)
        public string PulmaId;                          // web puzzleId
        /// <summary>Pulman näytettävät lisätiedot (web title, selite, sketchData, kuvat, kuvaLahteet; Peli/Pulmat.cs). Muilla null.</summary>
        public PulmanTiedot PulmaTiedot;
    }

    /// <summary>Kysymysmoottorin tallennettava tila (Pelitila.Kysely).</summary>
    public sealed class Kyselytila
    {
        /// <summary>Kysytyt: kysymysteksti, "photo:id", "flag:ISO" (web usedQuestions).</summary>
        public HashSet<string> Kaytetyt = new HashSet<string>();
        public KysymysMuoto? ViimeMuoto;                 // web lastForm
        public HashSet<string> Tutkitut = new HashSet<string>();   // web explored (kaupunki-id)
        public Dictionary<string, KaariYritys> KaariYritykset = new Dictionary<string, KaariYritys>();
        public HashSet<string> AarreLukot = new HashSet<string>(); // web aarreLukot (kaupunki-id)
        /// <summary>Saapumishavainnon kaupunki (web arrivalFact.cityId).</summary>
        public string Havainto;
        /// <summary>Avoin kysymys (web quiz).</summary>
        public AvoinKysymys Kysymys;
        /// <summary>Pulman avausvaihe (web puzzlePrevPhase). Ei tallenneta.</summary>
        public Vaihe? PulmaEdellinenVaihe;

        // --- tallennus --------------------------------------------------------

        static string T(string s) => Pelitila.Teksti(s);
        static string L(int n) => n.ToString(CultureInfo.InvariantCulture);
        static string Lista(IEnumerable<string> l) => "[" + string.Join(",", l.Select(T)) + "]";
        static string Jarj(IEnumerable<string> l) => Lista(l.OrderBy(x => x, StringComparer.Ordinal));

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"kaytetyt\":").Append(Jarj(Kaytetyt));
            sb.Append(",\"viimeMuoto\":").Append(ViimeMuoto.HasValue ? T(ViimeMuoto.Value.ToString()) : "null");
            sb.Append(",\"tutkitut\":").Append(Jarj(Tutkitut));
            sb.Append(",\"kaari\":[").Append(string.Join(",", KaariYritykset.OrderBy(k => k.Key, StringComparer.Ordinal)
                .Select(k => $"[{T(k.Key)},{L(k.Value.Yritykset)},{(k.Value.Onnistui ? "true" : "false")}]"))).Append(']');
            sb.Append(",\"lukot\":").Append(Jarj(AarreLukot));
            sb.Append(",\"havainto\":").Append(T(Havainto));
            sb.Append(",\"kysymys\":");
            if (Kysymys == null) sb.Append("null");
            else
            {
                var q = Kysymys;
                string B(bool b) => b ? "true" : "false";
                sb.Append('{');
                sb.Append("\"laji\":").Append(T(q.Laji.ToString()));
                sb.Append(",\"kaupunki\":").Append(T(q.Kaupunki));
                sb.Append(",\"vaikea\":").Append(B(q.Vaikea));
                sb.Append(",\"kaari\":").Append(B(q.Kaari));
                sb.Append(",\"tutkimus\":").Append(B(q.Tutkimus));
                sb.Append(",\"kehys\":").Append(T(q.Kehys));
                sb.Append(",\"kysymys\":").Append(T(q.Kysymys));
                sb.Append(",\"fakta\":").Append(T(q.Fakta));
                sb.Append(",\"lahteet\":").Append(Lista(q.Lahteet));
                sb.Append(",\"paikka\":").Append(T(q.Paikka));
                sb.Append(",\"kuvaKaupunki\":").Append(T(q.KuvaKaupunki));
                sb.Append(",\"kuvaTiedosto\":").Append(T(q.KuvaTiedosto));
                sb.Append(",\"lippuTiedosto\":").Append(T(q.LippuTiedosto));
                sb.Append(",\"lippuMaa\":").Append(T(q.LippuMaa));
                sb.Append(",\"vaihtoehdot\":").Append(Lista(q.Vaihtoehdot));
                sb.Append(",\"oikea\":").Append(L(q.Oikea));
                sb.Append(",\"vihje\":").Append(T(q.Vihje));
                sb.Append(",\"vihjeNaytetty\":").Append(B(q.VihjeNaytetty));
                sb.Append(",\"piilotetut\":[").Append(string.Join(",", q.Piilotetut.Select(L))).Append(']');
                sb.Append(",\"kaveriapu\":").Append(B(q.Kaveriapu));
                sb.Append(",\"valittu\":").Append(q.Valittu.HasValue ? L(q.Valittu.Value) : "null");
                sb.Append(",\"oikein\":").Append(q.OikeinVastattu.HasValue ? B(q.OikeinVastattu.Value) : "null");
                sb.Append(",\"aikaLoppui\":").Append(B(q.AikaLoppui));
                sb.Append(",\"sekunnit\":").Append(q.Sekunnit.HasValue ? L(q.Sekunnit.Value) : "null");
                sb.Append(",\"aarreLukittui\":").Append(q.AarreLukittui.HasValue ? B(q.AarreLukittui.Value) : "null");
                sb.Append(",\"loyto\":").Append(T(q.Loyto));
                sb.Append(",\"laatta\":").Append(B(q.Laatta));
                sb.Append(",\"pulmaId\":").Append(T(q.PulmaId));
                if (q.PulmaTiedot != null) { sb.Append(",\"pulmaTiedot\":"); q.PulmaTiedot.Kirjoita(sb); }
                sb.Append('}');
            }
            sb.Append('}');
        }

        static List<string> Tekstit(object o) =>
            o is List<object> l ? l.Select(x => (string)x).ToList() : new List<string>();

        internal static Kyselytila Lue(Dictionary<string, object> o)
        {
            var t = new Kyselytila();
            if (o == null) return t;
            foreach (var s in Tekstit(MiniJson.Kentta(o, "kaytetyt"))) t.Kaytetyt.Add(s);
            if (MiniJson.Teksti(o, "viimeMuoto") is string vm) t.ViimeMuoto = (KysymysMuoto)Enum.Parse(typeof(KysymysMuoto), vm);
            foreach (var s in Tekstit(MiniJson.Kentta(o, "tutkitut"))) t.Tutkitut.Add(s);
            if (MiniJson.Kentta(o, "kaari") is List<object> kaaret)
                foreach (var k in kaaret.Cast<List<object>>())
                    t.KaariYritykset[(string)k[0]] = new KaariYritys { Yritykset = (int)(double)k[1], Onnistui = (bool)k[2] };
            foreach (var s in Tekstit(MiniJson.Kentta(o, "lukot"))) t.AarreLukot.Add(s);
            t.Havainto = MiniJson.Teksti(o, "havainto");
            if (MiniJson.Kentta(o, "kysymys") is Dictionary<string, object> q)
            {
                int? N(string k) => MiniJson.Luku(q, k) is double d ? (int)d : (int?)null;
                bool? Bn(string k) => MiniJson.Kentta(q, k) is bool b ? b : (bool?)null;
                t.Kysymys = new AvoinKysymys
                {
                    Laji = (KysymysMuoto)Enum.Parse(typeof(KysymysMuoto), MiniJson.Teksti(q, "laji")),
                    Kaupunki = MiniJson.Teksti(q, "kaupunki"),
                    Vaikea = MiniJson.Totuus(q, "vaikea"),
                    Kaari = MiniJson.Totuus(q, "kaari"),
                    Tutkimus = MiniJson.Totuus(q, "tutkimus"),
                    Kehys = MiniJson.Teksti(q, "kehys"),
                    Kysymys = MiniJson.Teksti(q, "kysymys"),
                    Fakta = MiniJson.Teksti(q, "fakta"),
                    Lahteet = Tekstit(MiniJson.Kentta(q, "lahteet")),
                    Paikka = MiniJson.Teksti(q, "paikka"),
                    KuvaKaupunki = MiniJson.Teksti(q, "kuvaKaupunki"),
                    KuvaTiedosto = MiniJson.Teksti(q, "kuvaTiedosto"),
                    LippuTiedosto = MiniJson.Teksti(q, "lippuTiedosto"),
                    LippuMaa = MiniJson.Teksti(q, "lippuMaa"),
                    Vaihtoehdot = Tekstit(MiniJson.Kentta(q, "vaihtoehdot")),
                    Oikea = N("oikea") ?? 0,
                    Vihje = MiniJson.Teksti(q, "vihje"),
                    VihjeNaytetty = MiniJson.Totuus(q, "vihjeNaytetty"),
                    Piilotetut = (MiniJson.Kentta(q, "piilotetut") as List<object> ?? new List<object>()).Select(x => (int)(double)x).ToList(),
                    Kaveriapu = MiniJson.Totuus(q, "kaveriapu"),
                    Valittu = N("valittu"),
                    OikeinVastattu = Bn("oikein"),
                    AikaLoppui = MiniJson.Totuus(q, "aikaLoppui"),
                    Sekunnit = N("sekunnit"),
                    AarreLukittui = Bn("aarreLukittui"),
                    Loyto = MiniJson.Teksti(q, "loyto"),
                    Laatta = MiniJson.Totuus(q, "laatta"),
                    PulmaId = MiniJson.Teksti(q, "pulmaId"),
                    PulmaTiedot = PulmanTiedot.Lue(MiniJson.Kentta(q, "pulmaTiedot") as Dictionary<string, object>),
                };
            }
            return t;
        }
    }

    public sealed class Kysely
    {
        /// <summary>Pysähdyksen muotojen painot (web FORM_WEIGHTS) Object.entries-järjestyksessä.</summary>
        public static readonly IReadOnlyList<KeyValuePair<KysymysMuoto, int>> MuotoPainot = new[]
        {
            new KeyValuePair<KysymysMuoto, int>(KysymysMuoto.Visa, 55),
            new KeyValuePair<KysymysMuoto, int>(KysymysMuoto.Vaite, 15),
            new KeyValuePair<KysymysMuoto, int>(KysymysMuoto.Kuva, 10),
            new KeyValuePair<KysymysMuoto, int>(KysymysMuoto.Lippu, 8),
            new KeyValuePair<KysymysMuoto, int>(KysymysMuoto.Tapahtuma, 12),
        };

        /// <summary>Kysyjät kaupungin äänimaiseman (Kaupunki.Tyyppi) mukaan (web ASKERS).</summary>
        public static readonly IReadOnlyDictionary<string, string[]> Kysyjat = new Dictionary<string, string[]>
        {
            ["basaari"] = new[]
            {
                "maustekauppias punnitsee sahramia ja kysyy",
                "teenkeittäjä ojentaa höyryävän lasin ja kysyy",
                "kankuri levittää kankaansa tiskille ja kysyy",
                "vanha kirjuri nostaa katseen kirjastaan ja kysyy",
            },
            ["aavikko"] = new[]
            {
                "karavaanin vetäjä kohentaa nuotiota ja kysyy",
                "opas tähyää dyynien yli ja kysyy",
                "kaivon vartija ojentaa vesileilin ja kysyy",
            },
            ["meri"] = new[]
            {
                "satamakirjuri sulkee lokikirjansa ja kysyy",
                "vanha kalastaja paikkaa verkkoaan ja kysyy",
                "perämies laskee kiikarinsa ja kysyy",
            },
            ["sademetsa"] = new[]
            {
                "jokiluotsi työntää veneen vesille ja kysyy",
                "kantaja laskee taakkansa maahan ja kysyy",
                "opas raivaa polkua ja kysyy",
            },
            ["savanni"] = new[]
            {
                "karjapaimen nojaa sauvaansa ja kysyy",
                "jäljittäjä osoittaa jälkiä maassa ja kysyy",
            },
            ["ylanko"] = new[]
            {
                "vuoristo-opas kiristää köyttä ja kysyy",
                "paimen viittoo istumaan kivelle ja kysyy",
            },
            ["yleinen"] = new[]
            {
                "majatalon isäntä laskee lampun pöytään ja kysyy",
                "matkatoveri selaa isoisän kirjaa ja kysyy",
                "harmaantunut vanhus istahtaa viereen ja kysyy",
                "nuori tulkki hymyilee ja kysyy",
            },
        };

        public const string KuvaKehys = "matkavalokuvaaja levittää vedoksensa pöytään ja kysyy";
        public const string KuvaKysymys = "Mikä paikka valokuvassa on?";
        public const string LippuKehys = "tullimies kääntää passia kädessään ja kysyy";
        public const string LippuKysymys = "Minkä maan lippu tämä on?";
        public static readonly IReadOnlyList<string> VaiteVaihtoehdot = new[] { "Pitää yhä paikkansa", "Ei enää pidä" };

        public Matka Matka { get; }
        public Kysymysdata Data { get; }
        public Kokemus Kokemus { get; }
        /// <summary>Laudan kaupungit järjestyksessä (web board.cities).</summary>
        public IReadOnlyList<Kaupunki> Kaupungit { get; }

        Pelitila Tila => Matka.Tila;
        Kyselytila K => Matka.Tila.Kysely;
        Satunnainen Rng => Matka.Satunnainen;

        // --- koukut -------------------------------------------------------------

        public Func<string, bool> LaattaTassa;
        public Func<string, string> LaattaKaantyy;
        public Action<string> AarreLukittuu;
        public Func<Pelaaja, bool> PulmaOdottaa;
        public Func<TekoTulos> AvaaPulma;
        public Func<bool> TapahtumiaOn;
        public Func<string, TekoTulos> AvaaTapahtuma;
        /// <summary>Lippukysymyksen maat (web countryShapes-järjestyksessä). null = ei lippumuotoa.</summary>
        public IReadOnlyList<Lippumaa> Liput;

        /// <summary>Näytölle animoitava tapahtuma (web emit): laji 'aid' (löytöpalkkio).</summary>
        public event Action<string, string> Tapahtui;

        readonly List<string> kuvaPooli = new List<string>();
        readonly Dictionary<string, (string Tiedosto, string Lahde)> kuvaTiedostot = new Dictionary<string, (string, string)>();

        public Kysely(Matka matka, Kysymysdata data, IReadOnlyList<Kaupunki> kaupungit = null)
        {
            Matka = matka ?? throw new ArgumentNullException(nameof(matka));
            Data = data ?? throw new ArgumentNullException(nameof(data));
            Kaupungit = kaupungit ?? (matka.Verkko as Reittiverkko)?.KaupunkiLista
                ?? matka.Verkko.Kaupungit.Values.ToList();
            Kokemus = matka.Kokemus;
            matka.TehtavaTarjolla = TehtavaTarjolla;
            matka.Tutki = _ => Avaa();
            if (matka.Laatat != null)
            {
                LaattaTassa = matka.LaattaTassa;
                LaattaKaantyy = c => matka.KaannaLaatta(c)?.WebTulos;
                AarreLukittuu = c => matka.LukitseLaatta(c);
            }
        }

        Pelaaja P => Tila.Pelaaja;
        static string KaupunkiJossa(Pelaaja p) => p.Sijainti.Kaupungissa ? p.Sijainti.Kaupunki : null;
        bool Laatta(string kaupunki) => kaupunki != null && LaattaTassa != null && LaattaTassa(kaupunki);
        int Arpa(int n) => (int)Math.Floor(Rng.Seuraava() * n);
        string Nimi(string kaupunki) => Matka.Verkko.Kaupungit.TryGetValue(kaupunki, out var k) ? k.Nimi : kaupunki;

        // --- tehtävän tarjonta ------------------------------------------------

        /// <summary>Web tehtavaTarjolla: laatta, pulma, kohtaaminen tai tutkimaton kaupunki → 'stay'.</summary>
        public bool TehtavaTarjolla(Pelaaja p)
        {
            var kaupunki = KaupunkiJossa(p);
            if (kaupunki == null) return false;
            return Laatta(kaupunki)
                || (PulmaOdottaa != null && PulmaOdottaa(p))
                || (!p.Botti && KaariTarina(kaupunki) != null)
                || VoiTutkia(kaupunki);
        }

        /// <summary>Web canExplore: laataton, kaareton, tutkimaton kaupunki, jolle on kysyttävää.</summary>
        public bool VoiTutkia(string kaupunki)
        {
            if (kaupunki == null || Laatta(kaupunki)) return false;
            // Kaarikaupungeissa kertatutkimista ei ole (kohtaaminen on ainoa laataton tehtävä).
            if (Data.Kaaret.ContainsKey(kaupunki)) return false;
            if (K.Tutkitut.Contains(kaupunki)) return false;
            return Data.Omat(kaupunki).Count + Data.Yleiset.Count > 0;
        }

        // --- tarinakaari ------------------------------------------------------

        /// <summary>Web kaariTilanne: kohde, yritykset ja onnistuminen; null ilman kaarta.</summary>
        public (KaariKysymys Kohde, int Yritykset, bool Onnistui)? KaariTilanne(string kaupunki)
        {
            if (kaupunki == null || !Data.Kaaret.TryGetValue(kaupunki, out var kohde)) return null;
            K.KaariYritykset.TryGetValue(kaupunki, out var t);
            return (kohde, t?.Yritykset ?? 0, t?.Onnistui ?? false);
        }

        /// <summary>Web kaariTarina: kohde, jos kohtaaminen on vielä pelattavissa.</summary>
        public KaariKysymys KaariTarina(string kaupunki)
        {
            var t = KaariTilanne(kaupunki);
            return t.HasValue && !t.Value.Onnistui && t.Value.Yritykset < KysymysVakiot.KaariYritykset ? t.Value.Kohde : null;
        }

        /// <summary>Web kaariYritysLuku: (nyt, kaikki) tai null.</summary>
        public (int Nyt, int Kaikki)? KaariYritysLuku(string kaupunki)
        {
            var t = KaariTilanne(kaupunki);
            if (!t.HasValue) return null;
            return (Math.Min(Math.Max(1, t.Value.Yritykset), KysymysVakiot.KaariYritykset), KysymysVakiot.KaariYritykset);
        }

        /// <summary>Web aarreLukittu.</summary>
        public bool AarreLukittu(string kaupunki) => K.AarreLukot.Contains(kaupunki);

        /// <summary>
        /// Web lukitseAarre: kirjanpito tässä, laatan poisto ja ainutkertaisen
        /// aarteen siirto koukussa AarreLukittuu (Laatat). Palauttaa false, jos
        /// kaupunki oli jo lukossa.
        /// </summary>
        public bool LukitseAarre(string kaupunki)
        {
            if (!K.AarreLukot.Add(kaupunki)) return false;
            AarreLukittuu?.Invoke(kaupunki);
            return true;
        }

        // --- muoto ja kysymyksen valinta --------------------------------------

        /// <summary>Web formWeights: puuttuvan sisällön ja edellisen erikoismuodon paino siirtyy visalle.</summary>
        public List<KeyValuePair<KysymysMuoto, int>> Painot(string kaupunki)
        {
            var painot = MuotoPainot.ToDictionary(p => p.Key, p => p.Value);
            if (Data.Vaitteet.Count == 0) painot[KysymysMuoto.Vaite] = 0;
            if (TapahtumiaOn == null || AvaaTapahtuma == null || !TapahtumiaOn()) painot[KysymysMuoto.Tapahtuma] = 0;
            if (KuvaKohteet().Count == 0 || Kaupungit.Count < KysymysVakiot.KuvaVaihtoehdot) painot[KysymysMuoto.Kuva] = 0;
            if (LippuKohteet().Count < KysymysVakiot.LippuVaihtoehdot) painot[KysymysMuoto.Lippu] = 0;
            if (K.ViimeMuoto.HasValue && K.ViimeMuoto.Value != KysymysMuoto.Visa && painot.ContainsKey(K.ViimeMuoto.Value))
                painot[K.ViimeMuoto.Value] = 0;
            int siirtyy = 0;
            foreach (var p in MuotoPainot) if (p.Key != KysymysMuoto.Visa) siirtyy += p.Value - painot[p.Key];
            painot[KysymysMuoto.Visa] += siirtyy;
            return MuotoPainot.Select(p => new KeyValuePair<KysymysMuoto, int>(p.Key, painot[p.Key])).ToList();
        }

        /// <summary>Web pickForm: painotettu arvonta pelin satunnaisluvulla (yksi kutsu).</summary>
        public KysymysMuoto ArvoMuoto(string kaupunki)
        {
            var painot = Painot(kaupunki);
            double summa = painot.Sum(p => p.Value);
            double osuma = Rng.Seuraava() * summa;
            foreach (var p in painot)
            {
                osuma -= p.Value;
                if (osuma < 0) return p.Key;
            }
            return KysymysMuoto.Visa;
        }

        /// <summary>Web hardAvailable: onko kaupungin tai yleispakassa vaikeita (taso 3).</summary>
        public bool VaikeitaTarjolla(string kaupunki) =>
            Data.Omat(kaupunki).Concat(Data.Yleiset).Any(q => q.Vaikeus == 3);

        static readonly int[][][] Portaat =
        {
            new[] { new[] { 1 }, new[] { 1, 2 } },      // easy
            new[] { new[] { 1, 2 } },                   // normal
            new[] { new[] { 3 }, new[] { 2, 3 } },      // hard
        };

        /// <summary>
        /// Web pickQuestion: vaikeustaso ensin, sitten tuoreus, sitten
        /// paikallisuus (omat ennen yleispakkaa). Yksi arvonta.
        /// </summary>
        public Kysymys ValitseKysymys(string kaupunki, Vaikeustaso taso)
        {
            var omat = Data.Omat(kaupunki);
            var yleiset = Data.Yleiset;
            foreach (var tasot in Portaat[(int)taso])
            {
                foreach (var vainTuoreet in new[] { true, false })
                {
                    foreach (var lahde in new[] { omat, yleiset })
                    {
                        var pakka = lahde.Where(q => Array.IndexOf(tasot, q.Vaikeus) >= 0);
                        if (vainTuoreet) pakka = pakka.Where(q => !K.Kaytetyt.Contains(q.Q));
                        var l = pakka.ToList();
                        if (l.Count == 0) continue;
                        var kysymys = l[Arpa(l.Count)];
                        K.Kaytetyt.Add(kysymys.Q);
                        return kysymys;
                    }
                }
            }
            var kaikki = omat.Concat(yleiset).ToList();
            var q2 = kaikki[Arpa(kaikki.Count)];
            K.Kaytetyt.Add(q2.Q);
            return q2;
        }

        /// <summary>Web pickAsker: maiseman kysyjät + yleiset, yksi arvonta.</summary>
        public string ValitseKysyja(string kaupunki)
        {
            string tyyppi = kaupunki != null && Matka.Verkko.Kaupungit.TryGetValue(kaupunki, out var k) ? k.Tyyppi : null;
            var pooli = new List<string>();
            if (tyyppi != null && Kysyjat.TryGetValue(tyyppi, out var omat)) pooli.AddRange(omat);
            pooli.AddRange(Kysyjat["yleinen"]);
            return pooli[Arpa(pooli.Count)];
        }

        /// <summary>Web shuffledOrder: Fisher–Yates lopusta alkuun, count − 1 arvontaa.</summary>
        public List<int> Sekoitettu(int n)
        {
            var j = Enumerable.Range(0, n).ToList();
            for (int i = j.Count - 1; i > 0; i--)
            {
                int k = Arpa(i + 1);
                (j[i], j[k]) = (j[k], j[i]);
            }
            return j;
        }

        // --- kuvat ja liput ---------------------------------------------------

        /// <summary>Web setPhotoPool: kuratoidut kuvakohteet (järjestys säilyy, kaksoiset pois) ja tiedostot.</summary>
        public void AsetaKuvat(IEnumerable<string> kaupungit, IDictionary<string, (string Tiedosto, string Lahde)> kuvat = null)
        {
            kuvaPooli.Clear();
            foreach (var id in kaupungit) if (!kuvaPooli.Contains(id)) kuvaPooli.Add(id);
            kuvaTiedostot.Clear();
            if (kuvat != null) foreach (var kv in kuvat) kuvaTiedostot[kv.Key] = kv.Value;
        }

        /// <summary>Web photoTargets: kysymättömät kuvakohteet laudalla.</summary>
        public List<string> KuvaKohteet() =>
            kuvaPooli.Where(id => Matka.Verkko.Kaupungit.ContainsKey(id) && !K.Kaytetyt.Contains("photo:" + id)).ToList();

        /// <summary>Web flagTargets: maat, joilla on nimi ja lippu ja joita ei ole kysytty.</summary>
        public List<Lippumaa> LippuKohteet() =>
            (Liput ?? Array.Empty<Lippumaa>())
                .Where(m => !string.IsNullOrEmpty(m.Lippu) && !string.IsNullOrEmpty(m.Nimi) && !K.Kaytetyt.Contains("flag:" + m.Iso))
                .ToList();

        // --- avaus ------------------------------------------------------------

        /// <summary>Web actionTravel('stay', {hard}): Pysy-tapa tarjolla ja vaihe Toiminta.</summary>
        public TekoTulos Tutki(bool vaikea = false, KysymysMuoto? muoto = null)
        {
            if (Tila.Vaihe != Vaihe.Toiminta) return TekoTulos.Epaonnistui("Väärä vaihe");
            if (!Matka.Kulkutavat().Contains(Kulkutapa.Pysy)) return TekoTulos.Epaonnistui("Tuo matkustustapa ei ole nyt käytettävissä");
            return Avaa(vaikea, muoto);
        }

        AvoinKysymys Aseta(AvoinKysymys q)
        {
            K.Kysymys = q;
            Tila.Vaihe = Vaihe.Kysymys;
            return q;
        }

        /// <summary>
        /// Web actionQuiz: kohtaaminen, pulma, tutkiminen tai laatan
        /// pysähdys arvotulla muodolla. Vaikea kysymys on aina monivalinta.
        /// </summary>
        public TekoTulos Avaa(bool vaikea = false, KysymysMuoto? muoto = null)
        {
            if (Tila.Vaihe != Vaihe.Toiminta) return TekoTulos.Epaonnistui("Väärä vaihe");
            var p = P;
            var nykyinen = KaupunkiJossa(p);
            var kaari = (vaikea || (muoto.HasValue && muoto.Value != KysymysMuoto.Visa) || p.Botti || nykyinen == null)
                ? null : KaariTarina(nykyinen);

            // Pulma on kohtaamisen jälkeen pysähdyksen ainoa tehtävä.
            if (kaari == null && !vaikea && muoto == null && PulmaOdottaa != null && PulmaOdottaa(p))
                return AvaaPulma != null ? AvaaPulma() : TekoTulos.Epaonnistui("Pulmat tulevat myöhemmässä erässä");

            var laatta = Laatta(nykyinen) ? nykyinen : null;
            if (laatta == null && kaari == null)
            {
                if (!vaikea && nykyinen != null && VoiTutkia(nykyinen)) return AvaaTutkimus(nykyinen);
                return TekoTulos.Epaonnistui("Täällä ei ole laattaa");
            }
            if (vaikea && !VaikeitaTarjolla(laatta)) return TekoTulos.Epaonnistui("Täällä ei ole vaikeita kysymyksiä");

            var valittu = (vaikea || kaari != null) ? KysymysMuoto.Visa : (muoto ?? ArvoMuoto(laatta));
            K.ViimeMuoto = valittu;
            switch (valittu)
            {
                case KysymysMuoto.Vaite: return AvaaVaite(laatta);
                case KysymysMuoto.Kuva: return AvaaKuva(laatta);
                case KysymysMuoto.Lippu: return AvaaLippu(laatta);
                case KysymysMuoto.Tapahtuma:
                    return AvaaTapahtuma != null ? AvaaTapahtuma(laatta) : TekoTulos.Epaonnistui("Tapahtumat tulevat myöhemmässä erässä");
            }

            string q, fakta;
            List<string> vaihtoehdot, lahteet;
            int oikea;
            string vihje;
            if (kaari != null)
            {
                // Yritys kirjataan avattaessa: kesken jätetty kohtaaminen on käytetty yritys.
                if (!K.KaariYritykset.TryGetValue(nykyinen, out var t)) K.KaariYritykset[nykyinen] = t = new KaariYritys();
                t.Yritykset++;
                q = kaari.Q; vaihtoehdot = kaari.Vaihtoehdot; oikea = kaari.Oikea; fakta = kaari.Fakta;
                lahteet = new List<string>(); vihje = null;
            }
            else
            {
                var k = ValitseKysymys(laatta, vaikea ? Vaikeustaso.Vaikea : p.Taso);
                q = k.Q; vaihtoehdot = k.Vaihtoehdot; oikea = k.Oikea; fakta = k.Fakta; lahteet = k.Lahteet; vihje = k.Vihje;
            }
            var jarj = Sekoitettu(vaihtoehdot.Count);
            var kaupunki = laatta ?? nykyinen;
            Aseta(new AvoinKysymys
            {
                Kaupunki = kaupunki,
                Vaikea = vaikea,
                Kaari = kaari != null,
                // Laatattomassa kaupungissa kohtaaminen palkitsee kuten tutkiminen.
                Tutkimus = kaari != null && laatta == null,
                Kehys = ValitseKysyja(kaupunki),
                Kysymys = q,
                Fakta = fakta,
                Lahteet = new List<string>(lahteet),
                Vaihtoehdot = jarj.Select(i => vaihtoehdot[i]).ToList(),
                Oikea = jarj.IndexOf(oikea),
                Vihje = vihje,
            });
            return TekoTulos.Onnistui();
        }

        /// <summary>Web openExplore: kertatutkiminen laatattomassa kaupungissa, aina monivalinta.</summary>
        TekoTulos AvaaTutkimus(string kaupunki)
        {
            K.Tutkitut.Add(kaupunki);
            var k = ValitseKysymys(kaupunki, P.Taso);
            var jarj = Sekoitettu(k.Vaihtoehdot.Count);
            Aseta(new AvoinKysymys
            {
                Kaupunki = kaupunki,
                Tutkimus = true,
                Kehys = ValitseKysyja(kaupunki),
                Kysymys = k.Q,
                Fakta = k.Fakta,
                Lahteet = new List<string>(k.Lahteet),
                Vaihtoehdot = jarj.Select(i => k.Vaihtoehdot[i]).ToList(),
                Oikea = jarj.IndexOf(k.Oikea),
                Vihje = k.Vihje,
            });
            return TekoTulos.Onnistui();
        }

        /// <summary>Web openClaim: isoisän väittämä, kaksi vaihtoehtoa.</summary>
        TekoTulos AvaaVaite(string kaupunki)
        {
            var pooli = Data.Vaitteet;
            var tuoreet = pooli.Where(c => !K.Kaytetyt.Contains(c.Q)).ToList();
            var pakka = tuoreet.Count > 0 ? tuoreet : pooli;
            var v = pakka[Arpa(pakka.Count)];
            K.Kaytetyt.Add(v.Q);
            Aseta(new AvoinKysymys
            {
                Laji = KysymysMuoto.Vaite,
                Kaupunki = kaupunki,
                Kysymys = v.Q,
                Fakta = v.Fakta,
                Paikka = v.Paikka,
                Lahteet = new List<string>(v.Lahteet),
                Vaihtoehdot = VaiteVaihtoehdot.ToList(),
                Oikea = v.VaiteTotta ? 0 : 1,
            });
            return TekoTulos.Onnistui();
        }

        /// <summary>Web openFlagQuestion: oman maan lippu, jos kysymättä; muuten arvottu.</summary>
        TekoTulos AvaaLippu(string kaupunki)
        {
            var kohteet = LippuKohteet();
            if (kohteet.Count < KysymysVakiot.LippuVaihtoehdot) return Avaa(muoto: KysymysMuoto.Visa);
            var omaIso = Matka.Verkko.Kaupungit.TryGetValue(kaupunki, out var kk) ? kk.Maa : null;
            var oma = omaIso == null ? null : kohteet.FirstOrDefault(m => m.Iso == omaIso);
            var kohde = oma ?? kohteet[Arpa(kohteet.Count)];
            K.Kaytetyt.Add("flag:" + kohde.Iso);
            var muut = kohteet.Where(m => m.Iso != kohde.Iso).ToList();
            var vaarat = Sekoitettu(muut.Count).Take(KysymysVakiot.LippuVaihtoehdot - 1).Select(i => muut[i]).ToList();
            var ehdokkaat0 = new List<Lippumaa> { kohde };
            ehdokkaat0.AddRange(vaarat);
            var ehdokkaat = Sekoitettu(KysymysVakiot.LippuVaihtoehdot).Select(i => ehdokkaat0[i]).ToList();
            Aseta(new AvoinKysymys
            {
                Laji = KysymysMuoto.Lippu,
                Kaupunki = kaupunki,
                LippuTiedosto = kohde.Lippu,
                LippuMaa = kohde.Nimi,
                Kehys = LippuKehys,
                Kysymys = LippuKysymys,
                Fakta = $"Lippu on {kohde.Nimi}.",
                Vaihtoehdot = ehdokkaat.Select(m => m.Nimi).ToList(),
                Oikea = ehdokkaat.IndexOf(kohde),
            });
            return TekoTulos.Onnistui();
        }

        /// <summary>Web openPhotoQuestion: kuvan kohde ei ole kaupunki, jossa seistään.</summary>
        TekoTulos AvaaKuva(string kaupunki)
        {
            var kohteet = KuvaKohteet().Where(id => id != kaupunki).ToList();
            if (kohteet.Count == 0) return Avaa(muoto: KysymysMuoto.Visa);
            var kohdeId = kohteet[Arpa(kohteet.Count)];
            var kohde = Matka.Verkko.Kaupungit[kohdeId];
            K.Kaytetyt.Add("photo:" + kohdeId);
            var muut = Kaupungit.Where(c => c.Id != kohdeId).ToList();
            var vaarat = Sekoitettu(muut.Count).Take(KysymysVakiot.KuvaVaihtoehdot - 1).Select(i => muut[i]).ToList();
            var ehdokkaat0 = new List<Kaupunki> { kohde };
            ehdokkaat0.AddRange(vaarat);
            var ehdokkaat = Sekoitettu(KysymysVakiot.KuvaVaihtoehdot).Select(i => ehdokkaat0[i]).ToList();
            kuvaTiedostot.TryGetValue(kohdeId, out var kuva);
            Aseta(new AvoinKysymys
            {
                Laji = KysymysMuoto.Kuva,
                Kaupunki = kaupunki,
                KuvaKaupunki = kohde.Id,
                KuvaTiedosto = kuva.Tiedosto,
                Kehys = KuvaKehys,
                Kysymys = KuvaKysymys,
                Fakta = $"Kuvassa on {kohde.Nimi}." + (string.IsNullOrEmpty(kuva.Lahde) ? "" : $" Valokuva: {kuva.Lahde}."),
                Vaihtoehdot = ehdokkaat.Select(c => c.Nimi).ToList(),
                Oikea = ehdokkaat.IndexOf(kohde),
            });
            return TekoTulos.Onnistui();
        }

        // --- vastaaminen ------------------------------------------------------

        /// <summary>Web answerQuiz: tulos jää näkyviin, kunnes Sulje() kutsutaan.</summary>
        public TekoTulos Vastaa(int indeksi)
        {
            var q = K.Kysymys;
            if (Tila.Vaihe != Vaihe.Kysymys || q == null || q.Valittu.HasValue) return TekoTulos.Epaonnistui("Ei avointa kysymystä");
            if (q.Piilotetut.Contains(indeksi)) return TekoTulos.Epaonnistui("Tuo vaihtoehto on poistettu");
            var p = P;
            q.Valittu = indeksi;
            bool oikein = indeksi == q.Oikea;
            q.OikeinVastattu = oikein;
            Kokemus.KirjaaVastaus(p, oikein);

            if (q.Kaari)
            {
                // Yritys on kirjattu avattaessa; puuttuva kirjaus luetaan ensimmäiseksi (web ?? {yritykset: 1}).
                K.KaariYritykset.TryGetValue(q.Kaupunki, out var t);
                // Onnistunut kohtaaminen ei toistu; toinen väärä sulkee kätkön pysyvästi.
                if (oikein) K.KaariYritykset[q.Kaupunki] = new KaariYritys { Yritykset = t?.Yritykset ?? 1, Onnistui = true };
                else if ((t?.Yritykset ?? 1) >= KysymysVakiot.KaariYritykset) q.AarreLukittui = LukitseAarre(q.Kaupunki);
            }

            if (q.Laji == KysymysMuoto.Pulma)
            {
                if (oikein)
                {
                    Kokemus.Anna(p, Kokemus.Pulma);
                    if (q.Laatta) q.Loyto = LaattaKaantyy?.Invoke(q.Kaupunki);
                }
                return TekoTulos.Onnistui();
            }

            if (q.Tutkimus)
            {
                if (oikein)
                {
                    Kokemus.Anna(p, Kokemus.Tutkiminen);
                    p.Raha += KysymysVakiot.TutkimusPalkkio;
                    Tapahtui?.Invoke("aid", $"Löytöpalkkio +{KysymysVakiot.TutkimusPalkkio} puntaa");
                }
                return TekoTulos.Onnistui();
            }

            if (oikein)
            {
                // Vaikean kysymyksen palkkio ennen laatan kääntöä (web järjestys).
                if (q.Vaikea)
                {
                    p.Raha += KysymysVakiot.VaikeaPalkkio;
                    Kokemus.Anna(p, Kokemus.VaikeaVastaus);
                }
                q.Loyto = LaattaKaantyy?.Invoke(q.Kaupunki);
            }
            return TekoTulos.Onnistui();
        }

        TekoTulos Avoin(out AvoinKysymys q)
        {
            q = K.Kysymys;
            if (Tila.Vaihe != Vaihe.Kysymys || q == null) return TekoTulos.Epaonnistui("Ei avointa kysymystä");
            if (q.Valittu.HasValue) return TekoTulos.Epaonnistui("Kysymykseen on jo vastattu");
            return null;
        }

        /// <summary>Web actionHint: sanallinen vihje 40 punnalla.</summary>
        public TekoTulos Vihje()
        {
            if (Avoin(out var q) is TekoTulos virhe) return virhe;
            if (q.VihjeNaytetty) return TekoTulos.Epaonnistui("Vihje on jo ostettu");
            if (q.Vihje == null) return TekoTulos.Epaonnistui("Tähän kysymykseen ei ole vihjettä");
            if (P.Raha < KysymysVakiot.VihjeHinta) return TekoTulos.Epaonnistui("Rahat eivät riitä");
            P.Raha -= KysymysVakiot.VihjeHinta;
            q.VihjeNaytetty = true;
            return TekoTulos.Onnistui();
        }

        /// <summary>Web actionKaveriapu: 25 puntaa ja lippu; sähke ja veikkaus ovat käyttöliittymän.</summary>
        public TekoTulos Kaveriapu()
        {
            if (Avoin(out var q) is TekoTulos virhe) return virhe;
            if (q.Kaveriapu) return TekoTulos.Epaonnistui("Kaverilta on jo kysytty");
            if (q.Vaihtoehdot == null || q.Vaihtoehdot.Count < 2) return TekoTulos.Epaonnistui("Tähän ei voi kysyä kaverilta");
            if (P.Raha < KysymysVakiot.KaveriapuHinta) return TekoTulos.Epaonnistui("Rahat eivät riitä");
            P.Raha -= KysymysVakiot.KaveriapuHinta;
            q.Kaveriapu = true;
            return TekoTulos.Onnistui();
        }

        /// <summary>Web timeoutQuiz: aika loppui, vastaus on väärä.</summary>
        public TekoTulos AikaLoppui()
        {
            if (Avoin(out var q) is TekoTulos virhe) return virhe;
            q.Valittu = -1;
            q.OikeinVastattu = false;
            q.AikaLoppui = true;
            q.Sekunnit = 0;
            Kokemus.KirjaaVastaus(P, false);
            return TekoTulos.Onnistui();
        }

        /// <summary>Web actionFiftyFifty: 80 punnalla kaksi väärää piiloon (arvonta).</summary>
        public TekoTulos Puolita()
        {
            if (Avoin(out var q) is TekoTulos virhe) return virhe;
            if (q.Piilotetut.Count > 0) return TekoTulos.Epaonnistui("50:50 on jo käytetty");
            if (q.Vaihtoehdot.Count < 4) return TekoTulos.Epaonnistui("Tähän ei voi käyttää 50:50:tä");
            if (P.Raha < KysymysVakiot.PuolitusHinta) return TekoTulos.Epaonnistui("Rahat eivät riitä");
            P.Raha -= KysymysVakiot.PuolitusHinta;
            var vaarat = Enumerable.Range(0, q.Vaihtoehdot.Count).Where(i => i != q.Oikea).ToList();
            for (int i = vaarat.Count - 1; i > 0; i--)
            {
                int j = Arpa(i + 1);
                (vaarat[i], vaarat[j]) = (vaarat[j], vaarat[i]);
            }
            q.Piilotetut = vaarat.Take(2).OrderBy(i => i).ToList();
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Web closeQuiz: laatattoman kaupungin pulma palaa edelliseen
        /// vaiheeseen; muuten vuoro päättyy.
        /// </summary>
        public TekoTulos Sulje()
        {
            var q = K.Kysymys;
            if (q == null) return TekoTulos.Epaonnistui("Ei avointa kysymystä");
            if (q.Laji == KysymysMuoto.Pulma && !q.Laatta)
            {
                K.Kysymys = null;
                if (Tila.Vaihe != Vaihe.Ohi) Tila.Vaihe = K.PulmaEdellinenVaihe ?? Vaihe.Toiminta;
                K.PulmaEdellinenVaihe = null;
                return TekoTulos.Onnistui();
            }
            K.Kysymys = null;
            if (Tila.Vaihe == Vaihe.Ohi) return TekoTulos.Onnistui();
            Tila.Vaihe = Vaihe.Toiminta;
            Matka.PaataVuoro();
            return TekoTulos.Onnistui();
        }
    }
}
