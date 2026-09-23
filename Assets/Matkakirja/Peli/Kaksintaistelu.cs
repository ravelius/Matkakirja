// KAKSINTAISTELU: rosvon kaksintaistelu suorana porttina verkkopelin
// js/game.js Game-luokasta (beginDuel, actionDuelRelief, answerDuel,
// timeoutDuel, closeDuel; aloitus closeQuiz → duelArmed → beginDuel).
// Kultainen jälki Kultaiset/kaksintaistelujalki.json
// (Kultaiset/tee-kaksintaistelujalki.mjs) vaatii, että sama käsikirjoitus
// tuottaa saman tilan ja SAMAN MÄÄRÄN satunnaislukukutsuja joka teon
// jälkeen, myös tallennuksen yli.
//
// SÄÄNNÖT (web): laatan alta löytynyt ryöstäjä nostaa lipun
// (Tila.KaksintaisteluOdottaa). Kun kysymys suljetaan (Kysely.Sulje),
// Matka.KaksintaisteluAlkaa laskee lipun ja kutsuu Matka.Kaksintaistelu-
// koukkua, jonka tämä luokka asettaa: rosvo esittää kiperän kysymyksen
// (kokoelma kaksintaistelut, 8 vaihtoehtoa), vaihe on Vaihe.Kaksintaistelu.
//   Vastaa oikein ilman helpotuksia → saalis DUEL_PRIZE (200) puntaa.
//   Vastaa oikein helpotuksen jälkeen → loput rahat säilyvät.
//   Väärin tai aika loppui → rosvo vie kaikki rahat.
//   Helpotus (enintään 2): rosvo vie floor(raha / 2); ensimmäinen poistaa
//     4 väärää, toinen 2 (arvonta Fisher–Yates lopusta alkuun).
//   Sulje → vaihe Toiminta ja vuoro päättyy (web closeDuel).
// Kaksintaistelu kirjataan tietoprosenttiin (web countAnswer → Kokemus.KirjaaVastaus).
//
// KYTKENTÄ: new Kaksintaistelu(matka, data) asettaa Matka.Kaksintaistelu-
// koukun. Kysely kytkee oman Kaksintaistelu-koukkunsa Matka.KaksintaisteluAlkaa-
// metodiin, joten kysymyksen sulkeminen aloittaa kaksintaistelun kuten webissä.
// Latauksen jälkeen luodaan uusi Kaksintaistelu ladatulle Matkalle (kuten Kysely);
// avoin kaksintaistelu kulkee Pelitilassa (Tila.Kaksintaistelu).
//
// POIKKEAMAT: (1) tyhjä kokoelma: web kaatuisi (deck[0] undefined), täällä
// Aloita epäonnistuu ilman arvontaa ja vuoro päättyy tavalliseen tapaan.
// (2) Web ei tarkista helpotuksen rahaa (käyttöliittymä harmaannuttaa napin,
// kun floor(raha/2) ≤ 0); logiikka sallii helpotuksen 0 punnalla kuten
// webissä, ja HelpotusTarjolla kertoo napin tilan.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Kaksintaistelun vakiot (js/game.js).</summary>
    public static class KaksintaisteluVakiot
    {
        public const int Saalis = 200;                        // DUEL_PRIZE
        public const int Helpotukset = 2;                     // actionDuelRelief: reliefs >= 2
        public const int EnsimmainenPoisto = 4;               // removeCount, kun reliefs === 1
        public const int ToinenPoisto = 2;                    // removeCount muuten
        public const int Sekunnit = KysymysVakiot.Sekunnit;   // QUIZ_SECONDS
    }

    /// <summary>
    /// Kaksintaistelukysymykset (web pack.duels): sisältöpaketin kokoelma
    /// kaksintaistelut.json, alkion data {q, options, correct, fact, source?}.
    /// Järjestys on osa sääntöä (arvonta indeksistä), joten paketin järjestys säilyy.
    /// </summary>
    public sealed class Kaksintaistelut
    {
        public const string Tiedosto = "kaksintaistelut.json";
        public readonly List<Kysymys> Kysymykset = new List<Kysymys>();

        /// <summary>Lukee kokoelman tekstistä; kaksoiskysymykset pois kuten webin yksilolliset (avain q).</summary>
        public static Kaksintaistelut Lue(string json)
        {
            var d = new Kaksintaistelut();
            var runko = MiniJson.Objekti(MiniJson.Jasenna(json));
            var nimi = MiniJson.Teksti(runko, "nimi");
            if (nimi != null && nimi != "kaksintaistelut")
                throw new FormatException($"odotettiin kokoelmaa 'kaksintaistelut', saatiin '{nimi}'");
            var nahdyt = new HashSet<string>();
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(runko, "alkiot")))
            {
                var k = Kysymysdata.LueKysymys(MiniJson.Objekti(MiniJson.Kentta(MiniJson.Objekti(a), "data")));
                if (k.Vaihtoehdot == null || k.Vaihtoehdot.Count == 0)
                    throw new FormatException($"kaksintaistelulta '{k.Q}' puuttuvat vaihtoehdot");
                if (nahdyt.Add(k.Q)) d.Kysymykset.Add(k);
            }
            return d;
        }

        /// <summary>Lukee paketin kansiosta (…/kokoelmat/) kaksintaistelut.json.</summary>
        public static Kaksintaistelut LueKansiosta(string kansio) =>
            Lue(File.ReadAllText(Path.Combine(kansio, Tiedosto)));
    }

    /// <summary>Avoin kaksintaistelu (web duel-olio). Tallennetaan sellaisenaan (Pelitila.Kaksintaistelu).</summary>
    public sealed class AvoinKaksintaistelu
    {
        public string Kysymys;                                   // web question
        public string Fakta;                                     // web fact
        public List<string> Lahteet = new List<string>();        // web source
        public List<string> Vaihtoehdot = new List<string>();    // web options (sekoitettu)
        public int Oikea;                                        // web correct
        public List<int> Piilotetut = new List<int>();           // web hidden (nousevassa järjestyksessä)
        public int Helpotukset;                                  // web reliefs
        /// <summary>Rosvon viemät punnat yhteensä (web taken).</summary>
        public int Viety;
        public int? Valittu;                                     // web chosen (−1 = aika loppui)
        public bool? OikeinVastattu;                             // web right
        public bool AikaLoppui;                                  // web timedOut
        /// <summary>Jäljellä oleva aika (web seconds). Käyttöliittymä päivittää tikittäessä, jotta tallennus jatkaa samasta.</summary>
        public int? Sekunnit = KaksintaisteluVakiot.Sekunnit;
        /// <summary>Voitettu saalis (web prize): vain suora oikea vastaus ilman helpotuksia.</summary>
        public int? Saalis;

        /// <summary>Onko kysymykseen vastattu (tai aika loppunut).</summary>
        public bool Vastattu => Valittu.HasValue;

        // --- tallennus --------------------------------------------------------

        static string T(string s) => Pelitila.Teksti(s);
        static string L(int n) => n.ToString(CultureInfo.InvariantCulture);
        static string Ln(int? n) => n.HasValue ? L(n.Value) : "null";
        static string B(bool b) => b ? "true" : "false";

        internal void Kirjoita(StringBuilder sb)
        {
            sb.Append("{\"kysymys\":").Append(T(Kysymys));
            sb.Append(",\"fakta\":").Append(T(Fakta));
            sb.Append(",\"lahteet\":[").Append(string.Join(",", Lahteet.Select(T))).Append(']');
            sb.Append(",\"vaihtoehdot\":[").Append(string.Join(",", Vaihtoehdot.Select(T))).Append(']');
            sb.Append(",\"oikea\":").Append(L(Oikea));
            sb.Append(",\"piilotetut\":[").Append(string.Join(",", Piilotetut.Select(L))).Append(']');
            sb.Append(",\"helpotukset\":").Append(L(Helpotukset));
            sb.Append(",\"viety\":").Append(L(Viety));
            sb.Append(",\"valittu\":").Append(Ln(Valittu));
            sb.Append(",\"oikein\":").Append(OikeinVastattu.HasValue ? B(OikeinVastattu.Value) : "null");
            sb.Append(",\"aikaLoppui\":").Append(B(AikaLoppui));
            sb.Append(",\"sekunnit\":").Append(Ln(Sekunnit));
            sb.Append(",\"saalis\":").Append(Ln(Saalis));
            sb.Append('}');
        }

        /// <summary>Lukee Kirjoita-muodon; null → null (tallennus ilman avointa kaksintaistelua).</summary>
        internal static AvoinKaksintaistelu Lue(Dictionary<string, object> o)
        {
            if (o == null) return null;
            int? N(string k) => MiniJson.Luku(o, k) is double d ? (int)d : (int?)null;
            List<string> Tekstit(string k) =>
                MiniJson.Kentta(o, k) is List<object> l ? l.Select(x => x as string).ToList() : new List<string>();
            return new AvoinKaksintaistelu
            {
                Kysymys = MiniJson.Teksti(o, "kysymys"),
                Fakta = MiniJson.Teksti(o, "fakta"),
                Lahteet = Tekstit("lahteet"),
                Vaihtoehdot = Tekstit("vaihtoehdot"),
                Oikea = N("oikea") ?? 0,
                Piilotetut = (MiniJson.Kentta(o, "piilotetut") as List<object> ?? new List<object>()).Select(x => (int)(double)x).ToList(),
                Helpotukset = N("helpotukset") ?? 0,
                Viety = N("viety") ?? 0,
                Valittu = N("valittu"),
                OikeinVastattu = MiniJson.Kentta(o, "oikein") is bool b ? b : (bool?)null,
                AikaLoppui = MiniJson.Totuus(o, "aikaLoppui"),
                Sekunnit = N("sekunnit"),
                Saalis = N("saalis"),
            };
        }
    }

    /// <summary>
    /// Rosvon kaksintaistelun teot. Käyttöliittymä tietää kaksintaistelun
    /// alkaneen, kun Kysely.Sulje() jättää vaiheeksi Vaihe.Kaksintaistelu
    /// (tai tapahtumasta Alkoi); näytettävä tila on Avoin.
    /// </summary>
    public sealed class Kaksintaistelu
    {
        public Matka Matka { get; }
        public Kaksintaistelut Data { get; }

        /// <summary>Kaksintaistelu alkoi (pelaaja, avoin kaksintaistelu).</summary>
        public event Action<Pelaaja, AvoinKaksintaistelu> Alkoi;

        Pelitila Tila => Matka.Tila;
        Pelaaja P => Tila.Pelaaja;
        Satunnainen Rng => Matka.Satunnainen;

        public Kaksintaistelu(Matka matka, Kaksintaistelut data)
        {
            Matka = matka ?? throw new ArgumentNullException(nameof(matka));
            Data = data ?? throw new ArgumentNullException(nameof(data));
            matka.Kaksintaistelu = _ => Aloita().Ok;
        }

        /// <summary>Avoin kaksintaistelu (web game.duel) tai null.</summary>
        public AvoinKaksintaistelu Avoin => Tila.Kaksintaistelu;

        /// <summary>Onko kaksintaistelu käynnissä (web phase === 'duel' &amp;&amp; duel).</summary>
        public bool Kaynnissa => Tila.Vaihe == Vaihe.Kaksintaistelu && Avoin != null;

        /// <summary>Mitä rosvo veisi helpotuksesta nyt (web floor(money / 2)).</summary>
        public int HelpotuksenHinta => (int)Math.Floor(P.Raha / 2.0);

        /// <summary>
        /// Helpotusnappi käytettävissä (web renderDuel: näkyvissä kun vastaamatta,
        /// pois käytöstä kun helpotukset on käytetty tai hinta ≤ 0).
        /// </summary>
        public bool HelpotusTarjolla =>
            Kaynnissa && !Avoin.Vastattu && Avoin.Helpotukset < KaksintaisteluVakiot.Helpotukset && HelpotuksenHinta > 0;

        int Arpa(int n) => (int)Math.Floor(Rng.Seuraava() * n);

        /// <summary>Web shuffledOrder: Fisher–Yates lopusta alkuun, n − 1 arvontaa (sama kuin Kysely.Sekoitettu).</summary>
        List<int> Sekoitettu(int n)
        {
            var j = Enumerable.Range(0, n).ToList();
            for (int i = j.Count - 1; i > 0; i--)
            {
                int k = Arpa(i + 1);
                (j[i], j[k]) = (j[k], j[i]);
            }
            return j;
        }

        /// <summary>
        /// Web beginDuel: tuore kysymys (käytetyt Kyselytila.Kaytetyt, yhteinen
        /// tietovisojen kanssa; jos kaikki on kysytty, koko kokoelma), yksi
        /// arvonta ja vaihtoehtojen sekoitus. Vaihe → Kaksintaistelu.
        /// Kutsutaan Matka.Kaksintaistelu-koukusta; ei vaihetarkistusta kuten webissä.
        /// </summary>
        public TekoTulos Aloita()
        {
            var pooli = Data.Kysymykset;
            if (pooli.Count == 0) return TekoTulos.Epaonnistui("Kaksintaistelukysymyksiä ei ole");
            var kaytetyt = Tila.Kysely.Kaytetyt;
            var tuoreet = pooli.Where(q => !kaytetyt.Contains(q.Q)).ToList();
            var pakka = tuoreet.Count > 0 ? tuoreet : pooli;
            var k = pakka[Arpa(pakka.Count)];
            kaytetyt.Add(k.Q);
            var jarj = Sekoitettu(k.Vaihtoehdot.Count);
            var d = new AvoinKaksintaistelu
            {
                Kysymys = k.Q,
                Fakta = k.Fakta,
                Lahteet = new List<string>(k.Lahteet),
                Vaihtoehdot = jarj.Select(i => k.Vaihtoehdot[i]).ToList(),
                Oikea = jarj.IndexOf(k.Oikea),
            };
            Tila.Kaksintaistelu = d;
            Tila.Vaihe = Vaihe.Kaksintaistelu;
            Alkoi?.Invoke(P, d);
            return TekoTulos.Onnistui();
        }

        /// <summary>Web actionDuelRelief: rosvo vie puolet rahoista ja puolet vääristä poistuu (4, sitten 2).</summary>
        public TekoTulos Helpotus()
        {
            var d = Avoin;
            if (Tila.Vaihe != Vaihe.Kaksintaistelu || d == null) return TekoTulos.Epaonnistui("Ei kaksintaistelua");
            if (d.Valittu.HasValue) return TekoTulos.Epaonnistui("Kysymykseen on jo vastattu");
            if (d.Helpotukset >= KaksintaisteluVakiot.Helpotukset) return TekoTulos.Epaonnistui("Helpotukset on käytetty");
            var p = P;
            int hinta = HelpotuksenHinta;
            p.Raha -= hinta;
            d.Viety += hinta;
            d.Helpotukset++;
            var vaarat = Enumerable.Range(0, d.Vaihtoehdot.Count)
                .Where(i => i != d.Oikea && !d.Piilotetut.Contains(i)).ToList();
            for (int i = vaarat.Count - 1; i > 0; i--)
            {
                int j = Arpa(i + 1);
                (vaarat[i], vaarat[j]) = (vaarat[j], vaarat[i]);
            }
            int poisto = d.Helpotukset == 1 ? KaksintaisteluVakiot.EnsimmainenPoisto : KaksintaisteluVakiot.ToinenPoisto;
            d.Piilotetut = d.Piilotetut.Concat(vaarat.Take(poisto)).OrderBy(i => i).ToList();
            return TekoTulos.Onnistui();
        }

        /// <summary>Web answerDuel: suora oikea tuo saaliin, väärä vie kaikki rahat. Tulos jää näkyviin Sulje()-kutsuun asti.</summary>
        public TekoTulos Vastaa(int indeksi)
        {
            var d = Avoin;
            if (Tila.Vaihe != Vaihe.Kaksintaistelu || d == null || d.Valittu.HasValue)
                return TekoTulos.Epaonnistui("Ei avointa kaksintaistelua");
            if (d.Piilotetut.Contains(indeksi)) return TekoTulos.Epaonnistui("Tuo vaihtoehto on poistettu");
            var p = P;
            d.Valittu = indeksi;
            bool oikein = indeksi == d.Oikea;
            d.OikeinVastattu = oikein;
            Kokemus.KirjaaVastaus(p, oikein);
            if (oikein)
            {
                if (d.Helpotukset == 0)
                {
                    p.Raha += KaksintaisteluVakiot.Saalis;
                    d.Saalis = KaksintaisteluVakiot.Saalis;
                }
            }
            else
            {
                d.Viety += p.Raha;
                p.Raha = 0;
            }
            return TekoTulos.Onnistui();
        }

        /// <summary>Web timeoutDuel: aika loppui, rosvo vie kaikki rahat.</summary>
        public TekoTulos AikaLoppui()
        {
            var d = Avoin;
            if (Tila.Vaihe != Vaihe.Kaksintaistelu || d == null || d.Valittu.HasValue)
                return TekoTulos.Epaonnistui("Ei avointa kaksintaistelua");
            var p = P;
            d.Valittu = -1;
            d.OikeinVastattu = false;
            d.AikaLoppui = true;
            d.Sekunnit = 0;
            Kokemus.KirjaaVastaus(p, false);
            d.Viety += p.Raha;
            p.Raha = 0;
            return TekoTulos.Onnistui();
        }

        /// <summary>Web closeDuel: sulkee kaksintaistelun ja päättää vuoron (myös vastaamatta, kuten webin logiikka).</summary>
        public TekoTulos Sulje()
        {
            if (Avoin == null) return TekoTulos.Epaonnistui("Ei kaksintaistelua");
            Tila.Kaksintaistelu = null;
            if (Tila.Vaihe == Vaihe.Ohi) return TekoTulos.Onnistui();
            Tila.Vaihe = Vaihe.Toiminta;
            Matka.PaataVuoro();
            return TekoTulos.Onnistui();
        }
    }
}
