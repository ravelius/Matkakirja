// VERTAILUN MAAKÄYRÄT (web js/maakayrat.js piirraVertailu, vertailuLohko, piirraKayra,
// somaYlaraja, VERTAILUVARIT, muotoileVaki).
//
// Vertailulinssin Vertaa-nappi avaa näkymän, jossa valitut maat (järjestys = väri, sama kuin
// kartalla) ovat viidessä käyrälohkossa: väkiluku, tulot, elinajanodote, kaupungistuminen ja
// hiilidioksidipäästöt. Web piirtää SVG:n (viewBox 300 × 150); natiivissa tämä laskee saman
// geometrian datana samassa koordinaatistossa, ja Natiivi-UI piirtää sen (Painter2D, pelin
// mustekynän tyyli: css .maakayra-*). Aukot piirretään aukkoina: null katkaisee viivan, ja
// yksinäinen havainto saa pisteen (r 1,6).
//
// Aineisto: paketin tiedostot/assets/data/maakayrat.json (skeema 1.16, Siirtoseppä B18)
// { meta { lahderivi }, mittarit, maat { ISO3: { vakiluku|bkt|elinika|kaupungistuminen|co2:
// { alku, ennusteAlku?, arvot [luku|null] } } } }.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Maat
{
    public sealed class Aikasarja
    {
        public int Alku;
        public int? EnnusteAlku;
        public IReadOnlyList<double?> Arvot;
    }

    public sealed class MaakayratAineisto
    {
        public string Lahderivi;
        public readonly Dictionary<string, Dictionary<string, Aikasarja>> Maat =
            new Dictionary<string, Dictionary<string, Aikasarja>>(StringComparer.Ordinal);

        public static MaakayratAineisto Lue(object json)
        {
            var a = new MaakayratAineisto();
            var d = json as Dictionary<string, object>;
            a.Lahderivi = MiniJson.Teksti(MiniJson.Kentta(d, "meta") as Dictionary<string, object>, "lahderivi");
            if (MiniJson.Kentta(d, "maat") is Dictionary<string, object> maat)
                foreach (var (iso, arvo) in maat)
                {
                    if (!(arvo is Dictionary<string, object> m)) continue;
                    var sarjat = new Dictionary<string, Aikasarja>(StringComparer.Ordinal);
                    foreach (var (kentta, s) in m)
                        if (s is Dictionary<string, object> so && MiniJson.Luku(so, "alku") is double alku
                            && MiniJson.Kentta(so, "arvot") is List<object> arvot)
                            sarjat[kentta] = new Aikasarja
                            {
                                Alku = (int)alku,
                                EnnusteAlku = MiniJson.Luku(so, "ennusteAlku") is double e ? (int)e : (int?)null,
                                Arvot = arvot.Select(x => x is double v ? v : (double?)null).ToList(),
                            };
                    a.Maat[iso] = sarjat;
                }
            return a;
        }
    }

    /// <summary>Yksi piirto-osa (web SVG-elementti): line, text, polyline tai circle.</summary>
    public sealed class KayraOsa
    {
        public string Tyyppi;     // "line" | "text" | "polyline" | "circle"
        public string Luokka;     // css-luokka (maakayra-apuviiva, -akseli, -viiva, -toinen, ...)
        public double X1, Y1, X2, Y2;          // line
        public double X, Y;                    // text; circle cx, cy
        public string Ankkuri;                 // text-anchor: "end" | "middle"
        public string Teksti;
        public double R;                       // circle
        /// <summary>polyline: pisteet (x, y) yhden desimaalin tarkkuudella kuten web toFixed(1).</summary>
        public IReadOnlyList<(double X, double Y)> Pisteet;
    }

    public sealed class KayraLohko
    {
        public string Otsikko, Seloste;
        public double Leveys = Maakayrat.L, Korkeus = Maakayrat.K;
        public readonly List<KayraOsa> Osat = new List<KayraOsa>();
    }

    public sealed class Vertailukuva
    {
        /// <summary>Valitut maat, joilla on sarjoja, järjestyksessä; Luokka = väri (VERTAILUVARIT).</summary>
        public readonly List<(string Iso, string Luokka)> Maat = new List<(string, string)>();
        public readonly List<KayraLohko> Lohkot = new List<KayraLohko>();
        /// <summary>"Näistä maista ei ole tilastosarjoja." kun yhdelläkään ei ole; muuten null.</summary>
        public string Tyhja;
        public string Lahderivi;
    }

    public static class Maakayrat
    {
        public const double L = 300, K = 150, Vasen = 36, Oikea = 290, Yla = 12, Ala = 128;
        public const string EiSarjoja = "Näistä maista ei ole tilastosarjoja.";

        /// <summary>Valintajärjestyksen värit (web VERTAILUVARIT); viides ja myöhemmät saavat viimeisen.</summary>
        public static readonly IReadOnlyList<string> Varit = new[]
        {
            "maakayra-viiva", "maakayra-toinen", "maakayra-kolmas", "maakayra-neljas",
        };

        const char Nbsp = ' ';

        /// <summary>Väkiluku sanoiksi: 5,6 milj. / 59 milj. / 1,7 mrd. / 390 000 (web muotoileVaki).</summary>
        public static string MuotoileVaki(double n)
        {
            static string Desim(double x)
            {
                var s = Js.Fixed(x, 1).Replace('.', ',');
                return s.EndsWith(",0") ? s[..^2] : s;
            }
            if (n >= 995e6) return Desim(n / 1e9) + Nbsp + "mrd.";
            if (n >= 9.95e6) return Js.Luku(Js.Round(n / 1e6)) + Nbsp + "milj.";
            if (n >= 0.95e6) return Desim(n / 1e6) + Nbsp + "milj.";
            return Js.Luku(Js.Round(n / 1000)) + Nbsp + "000";
        }

        /// <summary>Yläraja somaan lukemaan (web somaYlaraja).</summary>
        public static double SomaYlaraja(double suurin)
        {
            if (!(suurin > 0)) return 1;
            double kymppi = Math.Pow(10, Math.Floor(Math.Log10(suurin)));
            foreach (var kerroin in new[] { 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 })
                if (suurin <= kerroin * kymppi) return kerroin * kymppi;
            return 10 * kymppi;
        }

        /// <summary>Vertailunäkymä (web piirraVertailu ilman kortteja: kortit ovat UI:n).</summary>
        public static Vertailukuva Vertailu(IEnumerable<string> isot, MaakayratAineisto data)
        {
            var kuva = new Vertailukuva();
            var valitut = new List<(string Iso, Dictionary<string, Aikasarja> Maa, string Luokka)>();
            int i = 0;
            foreach (var iso in isot)
            {
                string luokka = i < Varit.Count ? Varit[i] : Varit[^1];
                i++;
                if (data.Maat.TryGetValue(iso, out var maa)) valitut.Add((iso, maa, luokka));
            }
            if (valitut.Count == 0) { kuva.Tyhja = EiSarjoja; return kuva; }
            foreach (var v in valitut) kuva.Maat.Add((v.Iso, v.Luokka));

            var vaki = valitut.Where(v => v.Maa.ContainsKey("vakiluku")).ToList();
            bool miljoonissa = vaki.Count > 0
                && vaki.SelectMany(v => v.Maa["vakiluku"].Arvot).Where(a => a.HasValue).Select(a => a.Value)
                    .DefaultIfEmpty(double.NegativeInfinity).Max() >= 2e6;
            Lohko(kuva, $"Väkiluku, {(miljoonissa ? "miljoonaa" : "tuhatta")} asukasta", "Väkiluku 1950–2050", valitut, "vakiluku", jakaja: miljoonissa ? 1e6 : 1e3);
            Lohko(kuva, "Tulot asukasta kohti, tuhatta dollaria vuodessa", "Bruttokansantuote asukasta kohti, ostovoimakorjattu", valitut, "bkt", jakaja: 1e3);
            Lohko(kuva, "Elinajanodote, vuotta", "Vastasyntyneen odotettu elinikä", valitut, "elinika");
            Lohko(kuva, "Kaupungeissa asuvien osuus, %", "Kaupungistumisaste", valitut, "kaupungistuminen", katto: 100);
            Lohko(kuva, "Hiilidioksidipäästöt asukasta kohti, tonnia vuodessa", "Hiilidioksidipäästöt asukasta kohti", valitut, "co2");
            kuva.Lahderivi = data.Lahderivi;
            return kuva;
        }

        static void Lohko(Vertailukuva kuva, string otsikko, string seloste,
            List<(string Iso, Dictionary<string, Aikasarja> Maa, string Luokka)> valitut, string kentta,
            double jakaja = 1, double? katto = null)
        {
            var kanssa = valitut.Where(v => v.Maa.ContainsKey(kentta)).ToList();
            if (kanssa.Count < 1) return;
            var lohko = Kayra(seloste, kanssa[0].Maa[kentta],
                kanssa.Skip(1).Select(v => (v.Maa[kentta], v.Luokka)).ToList(), jakaja, katto);
            lohko.Otsikko = otsikko;
            kuva.Lohkot.Add(lohko);
        }

        /// <summary>Web piirraKayra vertailun asetuksilla (ei Suomea, ei toista, ei ennustetta eikä silloin-jälkeä).</summary>
        public static KayraLohko Kayra(string seloste, Aikasarja sarja, IReadOnlyList<(Aikasarja Sarja, string Luokka)> lisat,
            double jakaja = 1, double? katto = null, double korkeus = K)
        {
            double ala = korkeus - (K - Ala);
            var lohko = new KayraLohko { Seloste = seloste, Korkeus = korkeus };
            var osat = lohko.Osat;
            var sarjat = new[] { sarja }.Concat(lisat.Select(l => l.Sarja)).Where(s => s != null).ToList();
            int alku = sarjat.Min(s => s.Alku);
            int loppu = sarjat.Max(s => s.Alku + s.Arvot.Count) - 1;
            double suurin = Math.Max(sarjat.SelectMany(s => s.Arvot).Where(a => a.HasValue).Select(a => a.Value)
                .DefaultIfEmpty(double.NegativeInfinity).Max(), 0);
            double ylaraja = katto ?? SomaYlaraja(suurin / jakaja) * jakaja;
            double X(double vuosi) => Vasen + ((vuosi - alku) / (double)(loppu - alku)) * (Oikea - Vasen);
            double Y(double arvo) => ala - (arvo / ylaraja) * (ala - Yla);

            foreach (var osa in new[] { 0.5, 1 })
            {
                double arvo = ylaraja * osa;
                osat.Add(new KayraOsa { Tyyppi = "line", Luokka = "maakayra-apuviiva", X1 = Vasen, Y1 = Y(arvo), X2 = Oikea, Y2 = Y(arvo) });
                double luku = arvo / jakaja;
                osat.Add(new KayraOsa
                {
                    Tyyppi = "text", Luokka = "maakayra-akseli", X = Vasen - 4, Y = Y(arvo) + 3, Ankkuri = "end",
                    Teksti = luku % 1 != 0 ? Js.Fixed(luku, 1).Replace('.', ',') : Js.Luku(luku),
                });
            }

            int jana = loppu - alku;
            int askel = jana >= 90 ? 25 : jana >= 50 ? 20 : 10;
            for (int vuosi = (int)Math.Ceiling(alku / (double)askel) * askel; vuosi <= loppu; vuosi += askel)
            {
                osat.Add(new KayraOsa { Tyyppi = "text", Luokka = "maakayra-akseli", X = X(vuosi), Y = ala + 11, Ankkuri = "middle", Teksti = vuosi.ToString(CultureInfo.InvariantCulture) });
                osat.Add(new KayraOsa { Tyyppi = "line", Luokka = "maakayra-apuviiva", X1 = X(vuosi), Y1 = ala, X2 = X(vuosi), Y2 = ala + 2.5 });
            }

            void Patkat(Aikasarja s, string luokka)
            {
                var patka = new List<(double, double)>();
                void Ulos()
                {
                    if (patka.Count == 1)
                        osat.Add(new KayraOsa { Tyyppi = "circle", Luokka = luokka + "-piste", X = Js.Pyor1(patka[0].Item1), Y = Js.Pyor1(patka[0].Item2), R = 1.6 });
                    else if (patka.Count > 1)
                        osat.Add(new KayraOsa { Tyyppi = "polyline", Luokka = luokka, Pisteet = patka.Select(p => (Js.Pyor1(p.Item1), Js.Pyor1(p.Item2))).ToList() });
                    patka = new List<(double, double)>();
                }
                for (int i = 0; i < s.Arvot.Count; i++)
                {
                    if (!(s.Arvot[i] is double arvo)) { Ulos(); continue; }
                    patka.Add((X(s.Alku + i), Y(arvo)));
                }
                Ulos();
            }
            foreach (var (lisa, luokka) in lisat) if (lisa != null) Patkat(lisa, luokka);
            Patkat(sarja, "maakayra-viiva");
            osat.Add(new KayraOsa { Tyyppi = "line", Luokka = "maakayra-pohjaviiva", X1 = Vasen, Y1 = ala, X2 = Oikea, Y2 = ala });
            return lohko;
        }
    }

    /// <summary>JavaScriptin lukumuotoilut (Number#toString, toFixed, Math.round) webin kanssa samoiksi.</summary>
    public static class Js
    {
        /// <summary>String(n): lyhin tarkka esitys (.NET Core 3.0+ "R" = sama kuin V8 tavallisilla luvuilla).</summary>
        public static string Luku(double n) => n == Math.Floor(n) && Math.Abs(n) < 1e21
            ? ((decimal)n).ToString(CultureInfo.InvariantCulture) : n.ToString("R", CultureInfo.InvariantCulture);
        /// <summary>
        /// toFixed(d): liukuluvun TARKKA desimaaliarvo pyöristettynä puolikkaat nollasta poispäin
        /// (V8). .NET:n "F" pyöristää tarkat puolikkaat parilliseen (0.25 → "0.2", JS "0.3"), joten
        /// pyöristys tehdään tässä tarkasta laajennuksesta ("F" 40 desimaalilla on tarkka).
        /// </summary>
        public static string Fixed(double n, int d)
        {
            string t = Math.Abs(n).ToString("F" + (d + 40), CultureInfo.InvariantCulture);
            int piste = t.IndexOf('.');
            var numerot = (t.Substring(0, piste) + t.Substring(piste + 1, d)).ToCharArray();
            if (t[piste + 1 + d] >= '5')
            {
                int i = numerot.Length - 1;
                while (i >= 0 && numerot[i] == '9') numerot[i--] = '0';
                if (i >= 0) numerot[i]++;
                else numerot = ("1" + new string(numerot)).ToCharArray();
            }
            string kok = new string(numerot, 0, numerot.Length - d);
            string tulos = d > 0 ? kok + "." + new string(numerot, numerot.Length - d, d) : kok;
            bool nolla = tulos.All(c => c == '0' || c == '.');
            return n < 0 && !nolla ? "-" + tulos : tulos;
        }
        /// <summary>Math.round: puolikkaat kohti +∞.</summary>
        public static double Round(double n) => Math.Floor(n + 0.5);
        /// <summary>Number(n.toFixed(1)).</summary>
        public static double Pyor1(double n) => double.Parse(Fixed(n, 1), CultureInfo.InvariantCulture);
    }
}
