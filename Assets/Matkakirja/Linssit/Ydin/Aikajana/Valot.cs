// ELÄVÄ LIEKKIVALO AIKAJANAN LAMPUKSI (web js/aikajana-valo.js, omistaja
// 5.9.2026: epäsäännöllinen, sykkivä liekki, joka syttyy ensin pienenä hehkuna
// ja laajenee; kirkas ydin ja pitkä, likimain käänteisen neliön häntä; valot
// eroavat toisistaan kirkkaudeltaan, kooltaan, sävyltään ja muodoltaan).
//
// Tässä on KAIKKI ajasta riippuva: variaatio valoittain (sama siemen kuin
// webissä), syttymisen kaksi vaihetta, syke, reunan harmoniat ja kohina, jäljeksi
// hiipuminen ja säteittäinen profiili väreineen. Unity-puoli (Linssit/Unity/
// Valot.cs) vain kirjoittaa nämä luvut meshin kärkidataan, ja varjostin
// (Resources/Varjostimet/Valo.shader) piirtää webin kolme vetoa yhdessä neliössä.
//
// Mitat ovat webin ruutupisteitä (CSS px): valon piirtoruutu on 128 × 128, ja
// täyden valon säde on puolet siitä kertaa variaatio, syttymä ja syke.
// (VALON_SADE_PX 49 on webissä vain dokumentaatiota: piirto käyttää ruudun puolikasta.)
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Lampun tila moottorin kannalta (web asetaValonTila: palaa, nykyinen, tuleva).</summary>
    public enum ValonVaihe
    {
        /// <summary>Ei pala: ei piirretä.</summary>
        Sammunut,
        /// <summary>Palaa (syttynyt tai hiljaisesti sytytetty kohde); jos oli nykyinen, hiipuu jäljeksi.</summary>
        Palaa,
        /// <summary>Viimeksi syttynyt: kirkkain, täysi koko.</summary>
        Nykyinen,
        /// <summary>Selauksen tuleva pysäkki: palaa, mutta kutistettuna ja himmennettynä (css .tuleva).</summary>
        Tuleva,
    }

    /// <summary>Syttymisen vaihe (web syttymisenVaihe().vaihe).</summary>
    public enum SyttymanVaihe { Hehku, Laajenee, Palaa }

    /// <summary>Syttymisen kertoimet täydelle säteelle ja kirkkaudelle.</summary>
    public readonly struct Syttyma
    {
        public readonly double Koko, Kirkkaus;
        public readonly SyttymanVaihe Vaihe;
        public Syttyma(double koko, double kirkkaus, SyttymanVaihe vaihe) { Koko = koko; Kirkkaus = kirkkaus; Vaihe = vaihe; }
    }

    /// <summary>Sykkeen kertoimet (web sykkeenTila).</summary>
    public readonly struct Syke
    {
        public readonly double Sade, Kirkkaus;
        public Syke(double sade, double kirkkaus) { Sade = sade; Kirkkaus = kirkkaus; }
    }

    /// <summary>Yksi reunan kulmaharmoninen: k·kulma + vaihe + nopeus·t.</summary>
    public readonly struct Harmonia
    {
        public readonly int K;
        public readonly double Voima, Vaihe, Nopeus;
        public Harmonia(int k, double voima, double vaihe, double nopeus) { K = k; Voima = voima; Vaihe = vaihe; Nopeus = nopeus; }
    }

    /// <summary>Sävy 0…255 (web [r, g, b], pyöristetty kuten Math.round).</summary>
    public readonly struct Savy
    {
        public readonly int R, G, B;
        public Savy(int r, int g, int b) { R = r; G = g; B = b; }
        public override string ToString() => $"({R}, {G}, {B})";
    }

    /// <summary>Valon kolme sävyä: lähes valkoinen ydin, keski ja lämmin laita.</summary>
    public readonly struct ValonSavyt
    {
        public readonly Savy Ydin, Keski, Laita;
        public ValonSavyt(Savy ydin, Savy keski, Savy laita) { Ydin = ydin; Keski = keski; Laita = laita; }
    }

    /// <summary>Webin säteittäisen liukuvärin pysäkki (teeProfiili addColorStop).</summary>
    public readonly struct ProfiilinPysakki
    {
        public readonly double Paikka, Alfa;
        public readonly Savy Vari;
        public ProfiilinPysakki(double paikka, Savy vari, double alfa) { Paikka = paikka; Vari = vari; Alfa = alfa; }
    }

    /// <summary>Yhden valon oma luonne (web valonVariaatio). Deterministinen: sama N → sama valo.</summary>
    public sealed class ValonVariaatio
    {
        public int N;
        public uint Siemen;
        public double Kirkkaus, Koko, Lampo, SykeHz, SykeVaihe, KohinaSiirto;
        public Harmonia[] Harmoniat;
    }

    /// <summary>
    /// Liekin reuna yhdellä hetkellä varjostimen muodossa: neljä harmonista
    /// (k = 2…5, puuttuvan voima 0) valmiiksi laskettuine vaiheineen ja kohinan
    /// viisi hilapistettä. <see cref="Sade"/> laskee saman kuin varjostin;
    /// testit vertaavat sitä webin liekinSade-funktioon.
    /// </summary>
    public readonly struct LiekinMuoto
    {
        public readonly double[] Voimat;   // 4
        public readonly double[] Vaiheet;  // 4, rad 0…2π
        public readonly double KohinaAlku; // 0…1: kohinan paikka kulmassa 0 hilaruudun sisällä
        public readonly double[] Kohina;   // 5 hila-arvoa

        public LiekinMuoto(double[] voimat, double[] vaiheet, double kohinaAlku, double[] kohina)
        { Voimat = voimat; Vaiheet = vaiheet; KohinaAlku = kohinaAlku; Kohina = kohina; }

        /// <summary>Reunan säteen kerroin kulmassa (rad, canvasin y alas) — sama kaava kuin Valo.shader.</summary>
        public double Sade(double kulma)
        {
            double s = 1;
            for (int j = 0; j < 4; j++) s += Voimat[j] * Math.Cos((j + 2) * kulma + Vaiheet[j]);
            double x = kulma * 1.5 / Math.PI + KohinaAlku;
            int i = Math.Max(0, Math.Min(3, (int)Math.Floor(x)));
            double f = x - i;
            double u = f * f * (3 - 2 * f);
            s += Liekki.KohinanVoima * (Kohina[i] + (Kohina[i + 1] - Kohina[i]) * u - 0.5);
            return Math.Max(0.5, s);
        }
    }

    /// <summary>
    /// Yhden valon piirtoarvot hetkellä (web piirraValo). Säteet ruutupisteinä;
    /// <see cref="Skaala"/> ja <see cref="Peitto"/> ovat css:n .tuleva-arvot
    /// (koko kehys kutistuu, canvas himmenee), muuten 1.
    /// </summary>
    public readonly struct ValonKuva
    {
        public readonly bool Nakyy;
        /// <summary>Hännän säde (drawImage-veto 1); rungon ja ytimen säteet ovat tästä kertoimin.</summary>
        public readonly double Sade;
        /// <summary>0…1, rajattu.</summary>
        public readonly double Kirkkaus;
        /// <summary>Jäljeksi hiipumisen osuus 0…1.</summary>
        public readonly double Hiipuma;
        /// <summary>Syttymisestä kulunut aika (ms): liekin muoto lasketaan tästä.</summary>
        public readonly double IkaMs;
        public readonly double Skaala, Peitto;
        public readonly SyttymanVaihe Vaihe;

        public ValonKuva(bool nakyy, double sade, double kirkkaus, double hiipuma, double ikaMs, double skaala, double peitto, SyttymanVaihe vaihe)
        { Nakyy = nakyy; Sade = sade; Kirkkaus = kirkkaus; Hiipuma = hiipuma; IkaMs = ikaMs; Skaala = skaala; Peitto = peitto; Vaihe = vaihe; }

        /// <summary>Piirtoruudun puolikas ruutupisteinä (css-skaalaus mukana): valo leikkautuu tähän.</summary>
        public double Laatikko => Liekki.RuutuPx / 2.0 * Skaala;

        // Webin kolme vetoa (säde, alfa). Alfa rajataan ykköseen kuten globalAlpha.
        public (double sade, double alfa) Hanta => (Sade * Skaala, Math.Min(1, Kirkkaus * Liekki.HannanAlfa));
        public (double sade, double alfa) Runko => (Sade * Liekki.RungonSade * Skaala, Math.Min(1, Kirkkaus * Liekki.RungonAlfa));
        public (double sade, double alfa) Ydin => (Sade * Liekki.YtimenSade * Skaala, Math.Min(1, Kirkkaus));
        /// <summary>Rungon leikkaavan liekkimaskin perussäde (kerrotaan LiekinMuoto.Sade(kulma):lla).</summary>
        public double Maski => Sade * Liekki.MaskinSade * Skaala;
    }

    /// <summary>Vakiot ja puhtaat funktiot (web js/aikajana-valo.js, vakiot 56–160).</summary>
    public static class Liekki
    {
        /* ----------------------------------------------------- MITAT */

        /// <summary>Webin VALON_SADE_PX (vanhan lampun kajo 7 × 7; piirto käyttää RuutuPx/2).</summary>
        public const double SadePx = 49;
        /// <summary>Piirtoruudun sivu ruutupisteinä (VALON_RUUTU_PX): täyden valon säde on puolet tästä.</summary>
        public const double RuutuPx = 128;
        /// <summary>Webin piirtoväli (30 fps). Natiivi päivittää joka kehys.</summary>
        public const double PiirtovaliMs = 33;
        /// <summary>Montako lamppua webissä elää yhtä aikaa.</summary>
        public const int Kehyskatto = 25;

        /* -------------------------------------------------- PROFIILI */

        public const double YdinOsuus = 0.2;
        public const double ProfiilinEksponentti = 2;
        public const int Pysakkeja = 28;
        public const double PysakinPaino = 1.7;

        /* ------------------------------------------------- SYTTYMINEN */

        public const double HehkuMs = 300;
        public const double LaajennusMs = 900;
        public const double SyttymaMs = HehkuMs + LaajennusMs;
        public const double Alkukoko = 0.3;
        public const double Alkukirkkaus = 1.35;

        /* ------------------------------------------------ SYKE, MUOTO */

        public static readonly double[] SykeHz = { 0.8, 1.6 };
        public const double SykeSade = 0.07;
        public const double SykeKirkkaus = 0.09;
        public static readonly int[] Harmonioita = { 2, 4 };
        public static readonly double[] HarmonianVoima = { 0.06, 0.17 };
        public const double KohinanVoima = 0.11;
        /// <summary>Webin monikulmion kärjet (varjostin laskee reunan suoraan kaavasta).</summary>
        public const int Karkia = 48;

        /* ---------------------------------------- VARIAATIO JA JÄLKI */

        public const double VariaatioKirkkaus = 0.15;
        public const double VariaatioKoko = 0.2;
        public const double JaljenKirkkaus = 0.34;
        public const double JaljenKoko = 0.82;
        public const double HiipumaMs = 1600;

        /* ------------------------------------------- PIIRRON VEDOT */

        public const double HannanAlfa = 0.72;
        public const double RungonSade = 0.9, RungonAlfa = 0.6, MaskinSade = 0.85;
        public const double YtimenSade = 0.26;

        /* ----------------------------------------------- CSS .tuleva */

        /// <summary>css/aikajana.css .aikajana-valo-pallolla.tuleva scale(0.62).</summary>
        public const double TulevanKoko = 0.62;
        /// <summary>css/aikajana.css .aikajana-valo.tuleva .aikajana-valo-liekki opacity 0.42.</summary>
        public const double TulevanPeitto = 0.42;

        /* ----------------------------------------------------- VÄRIT */

        public static readonly ValonSavyt Lammin = new ValonSavyt(new Savy(255, 244, 209), new Savy(255, 186, 84), new Savy(236, 126, 28));
        public static readonly ValonSavyt Vaalea = new ValonSavyt(new Savy(255, 252, 236), new Savy(255, 220, 148), new Savy(246, 196, 92));

        /* ========================================== PUHTAAT FUNKTIOT */

        /// <summary>Säteittäinen profiili: 1 keskellä, 0 laidalla, väliltä 1 / (1 + (r/r0)²) normalisoituna.</summary>
        public static double Profiili(double r, double r0 = YdinOsuus)
        {
            double x = Math.Max(0, Math.Min(1, double.IsFinite(r) ? r : 1));
            double laita = ProfiilinArvo(1, r0);
            return (ProfiilinArvo(x, r0) - laita) / (1 - laita);
        }

        static double ProfiilinArvo(double u, double r0) => 1 / (1 + Math.Pow(u / r0, ProfiilinEksponentti));

        /// <summary>Kokonaisluku tasajakoiseksi luvuksi 0…1 (web sekoita, murmur3-viimeistely).</summary>
        static double Sekoita(double n)
        {
            unchecked
            {
                uint x = JsInt32(n) ^ 0x9e3779b9u;
                x *= 0x85ebca6bu;
                x ^= x >> 13;
                x *= 0xc2b2ae35u;
                x ^= x >> 16;
                return x / 4294967296.0;
            }
        }

        /// <summary>JavaScriptin ToInt32 (n | 0) bittikuviona.</summary>
        static uint JsInt32(double n)
        {
            if (!double.IsFinite(n)) return 0;
            double t = Math.Truncate(n) % 4294967296.0;
            return unchecked((uint)(long)t);
        }

        /// <summary>Tapahtuman numerosta vakaa siemen (web valonSiemen).</summary>
        public static uint Siemen(double n)
        {
            double t = double.IsFinite(n) ? Math.Truncate(n) : 0;
            return (uint)(Math.Abs(t) * 2654435761.0 % 4294967291.0);
        }

        /// <summary>Arpoja, joka antaa aina saman jonon samasta siemenestä (web valonArpoja).</summary>
        public static Func<double> Arpoja(uint siemen)
        {
            uint t = siemen == 0 ? 1u : siemen;
            return () =>
            {
                unchecked { t += 0x6d2b79f5u; }
                return Sekoita(t);
            };
        }

        /// <summary>Pehmeä arvokohina 0…1 (web valonKohina).</summary>
        public static double Kohina(double x, double siemen = 0)
        {
            double v = double.IsFinite(x) ? x : 0;
            double i = Math.Floor(v);
            double f = v - i;
            double u = f * f * (3 - 2 * f);
            double a = Sekoita(i + siemen * 131);
            double b = Sekoita(i + 1 + siemen * 131);
            return a + (b - a) * u;
        }

        /// <summary>Yhden valon luonne tapahtuman numerosta (web valonVariaatio).</summary>
        public static ValonVariaatio Variaatio(int n)
        {
            uint siemen = Siemen(n);
            var arvo = Arpoja(siemen);
            var v = new ValonVariaatio { N = n, Siemen = siemen };
            v.Kirkkaus = 1 + (arvo() * 2 - 1) * VariaatioKirkkaus;
            v.Koko = 1 + (arvo() * 2 - 1) * VariaatioKoko;
            v.Lampo = arvo();
            v.SykeHz = SykeHz[0] + arvo() * (SykeHz[1] - SykeHz[0]);
            v.SykeVaihe = arvo() * Math.PI * 2;
            int maara = Harmonioita[0] + (int)Math.Floor(arvo() * (Harmonioita[1] - Harmonioita[0] + 1));
            v.Harmoniat = new Harmonia[maara];
            for (int i = 0; i < maara; i++)
            {
                double voima = HarmonianVoima[0] + arvo() * (HarmonianVoima[1] - HarmonianVoima[0]);
                double vaihe = arvo() * Math.PI * 2;
                double nopeus = 0.15 + arvo() * 0.5;
                v.Harmoniat[i] = new Harmonia(2 + i, voima, vaihe, nopeus);
            }
            v.KohinaSiirto = arvo() * 64;
            return v;
        }

        /// <summary>Syttymisen kaksi vaihetta: hehku pienenä (300 ms), laajeneminen ease-outilla (900 ms).</summary>
        public static Syttyma Syttyminen(double ms, bool vahennettyLiike = false)
        {
            if (vahennettyLiike) return new Syttyma(1, 1, SyttymanVaihe.Palaa);
            double t = double.IsFinite(ms) ? ms : 0;
            if (t <= 0) return new Syttyma(Alkukoko * 0.35, 0, SyttymanVaihe.Hehku);
            if (t < HehkuMs)
            {
                double p = t / HehkuMs;
                double nousu = 1 - Math.Pow(1 - p, 2);
                return new Syttyma(Alkukoko * (0.35 + 0.65 * nousu), Alkukirkkaus * nousu, SyttymanVaihe.Hehku);
            }
            if (t < SyttymaMs)
            {
                double p = (t - HehkuMs) / LaajennusMs;
                double pehmea = 1 - Math.Pow(1 - p, 3);
                return new Syttyma(Alkukoko + (1 - Alkukoko) * pehmea,
                    Alkukirkkaus + (1 - Alkukirkkaus) * pehmea, SyttymanVaihe.Laajenee);
            }
            return new Syttyma(1, 1, SyttymanVaihe.Palaa);
        }

        /// <summary>Sykkeen kertoimet hetkellä ms (web sykkeenTila): säde ja kirkkaus eri tahdissa.</summary>
        public static Syke Sykkeen(double ms, ValonVariaatio v, bool vahennettyLiike = false)
        {
            if (vahennettyLiike) return new Syke(1, 1);
            double t = (double.IsFinite(ms) ? ms : 0) / 1000;
            double perus = Math.Sin(2 * Math.PI * v.SykeHz * t + v.SykeVaihe);
            double sivu = Math.Sin(2 * Math.PI * v.SykeHz * 1.73 * t + v.SykeVaihe * 2.1);
            double hidas = Kohina(t * 0.6 + v.KohinaSiirto, v.Siemen) * 2 - 1;
            double a = 0.5 * perus + 0.25 * sivu + 0.25 * hidas;
            double b = 0.5 * Math.Sin(2 * Math.PI * v.SykeHz * t + v.SykeVaihe + 0.9) + 0.3 * sivu + 0.2 * hidas;
            return new Syke(1 + SykeSade * a, 1 + SykeKirkkaus * b);
        }

        /// <summary>Liekin reunan säteen kerroin kulmassa (rad) hetkellä ms (web liekinSade).</summary>
        public static double LiekinSade(double kulma, double ms, ValonVariaatio v, bool vahennettyLiike = false)
        {
            double t = vahennettyLiike ? 0 : (double.IsFinite(ms) ? ms : 0) / 1000;
            double s = 1;
            foreach (var h in v.Harmoniat) s += h.Voima * Math.Cos(h.K * kulma + h.Vaihe + h.Nopeus * t);
            s += KohinanVoima * (Kohina(kulma * 1.5 / Math.PI + t * 0.35, v.Siemen) - 0.5);
            return Math.Max(0.5, s);
        }

        /// <summary>Liekin reuna varjostimen muodossa hetkellä ms (sama käyrä kuin LiekinSade).</summary>
        public static LiekinMuoto Muoto(double ms, ValonVariaatio v, bool vahennettyLiike = false)
        {
            double t = vahennettyLiike ? 0 : (double.IsFinite(ms) ? ms : 0) / 1000;
            var voimat = new double[4];
            var vaiheet = new double[4];
            foreach (var h in v.Harmoniat)
            {
                int j = h.K - 2;
                if (j < 0 || j > 3) continue;
                voimat[j] = h.Voima;
                double vaihe = (h.Vaihe + h.Nopeus * t) % (2 * Math.PI);
                vaiheet[j] = vaihe < 0 ? vaihe + 2 * Math.PI : vaihe;
            }
            double x0 = t * 0.35;
            double i0 = Math.Floor(x0);
            var kohina = new double[5];
            for (int j = 0; j < 5; j++) kohina[j] = Kohina(i0 + j, v.Siemen);
            return new LiekinMuoto(voimat, vaiheet, x0 - i0, kohina);
        }

        static Savy SekoitaVari(Savy a, Savy b, double p)
        {
            double q = Math.Max(0, Math.Min(1, p));
            static int Pyorista(double x) => (int)Math.Floor(x + 0.5);
            return new Savy(Pyorista(a.R + (b.R - a.R) * q), Pyorista(a.G + (b.G - a.G) * q), Pyorista(a.B + (b.B - a.B) * q));
        }

        /// <summary>Valon sävyt värilämpötilan mukaan (0 = kynttilän oranssi, 1 = lampun kellertävä).</summary>
        public static ValonSavyt Savyt(double lampo) => new ValonSavyt(
            SekoitaVari(Lammin.Ydin, Vaalea.Ydin, lampo),
            SekoitaVari(Lammin.Keski, Vaalea.Keski, lampo),
            SekoitaVari(Lammin.Laita, Vaalea.Laita, lampo));

        /// <summary>
        /// Profiilin sävy intensiteetin mukaan: yli puolen ydin ← keski, alle puolen
        /// keski ← laita (web teeProfiili). Varjostin laskee saman jatkuvana.
        /// </summary>
        public static Savy ProfiilinVari(ValonSavyt s, double intensiteetti) => intensiteetti > 0.5
            ? SekoitaVari(s.Keski, s.Ydin, (intensiteetti - 0.5) * 2)
            : SekoitaVari(s.Laita, s.Keski, intensiteetti * 2);

        /// <summary>Webin liukuvärin 29 pysäkkiä: tihenevät keskustaa kohti (paino 1,7).</summary>
        public static List<ProfiilinPysakki> ProfiilinPysakit(ValonSavyt s)
        {
            var ulos = new List<ProfiilinPysakki>(Pysakkeja + 1);
            for (int i = 0; i <= Pysakkeja; i++)
            {
                double t = Math.Pow((double)i / Pysakkeja, PysakinPaino);
                double I = Profiili(t);
                ulos.Add(new ProfiilinPysakki(Math.Min(1, t), ProfiilinVari(s, I), I));
            }
            return ulos;
        }
    }

    /// <summary>
    /// Yksi lamppu: tila ja sen ajat (web luoLiekkivalot valot-kartan alkio ja
    /// tila()). Syttymishetki otetaan talteen vain kun lamppu ei jo palanut:
    /// uudelleen nykyiseksi merkitseminen ei aloita syttymistä alusta.
    /// </summary>
    public sealed class Liekkivalo
    {
        public readonly int N;
        public readonly ValonVariaatio Variaatio;
        public readonly ValonSavyt Savyt;
        public bool Palaa { get; private set; }
        public bool Nykyinen { get; private set; }
        public bool Tuleva { get; private set; }
        /// <summary>Syttymishetki (ms).</summary>
        public double Alkoi { get; private set; }
        /// <summary>Hetki, jona lamppu lakkasi olemasta nykyinen; null = ei hiivu.</summary>
        public double? Sammui { get; private set; }

        public Liekkivalo(int n)
        {
            N = n;
            Variaatio = Liekki.Variaatio(n);
            Savyt = Liekki.Savyt(Variaatio.Lampo);
        }

        /// <summary>Web tila(n, palaa, nykyinen) + css-luokka tuleva.</summary>
        public void AsetaTila(bool palaa, bool nykyinen, bool tuleva, double nytMs)
        {
            if (palaa && !Palaa) Alkoi = nytMs;
            if (!nykyinen && Nykyinen) Sammui = nytMs;
            if (nykyinen) Sammui = null;
            Palaa = palaa;
            Nykyinen = nykyinen;
            Tuleva = palaa && tuleva;
        }

        public void AsetaVaihe(ValonVaihe vaihe, double nytMs)
        {
            switch (vaihe)
            {
                case ValonVaihe.Nykyinen: AsetaTila(true, true, false, nytMs); break;
                case ValonVaihe.Palaa: AsetaTila(true, false, false, nytMs); break;
                case ValonVaihe.Tuleva: AsetaTila(true, false, true, nytMs); break;
                default: AsetaTila(false, false, false, nytMs); break;
            }
        }

        /// <summary>Kaikki sammuksiin (web alusta): syttymishetki jää, hiipuminen nollautuu.</summary>
        public void Alusta()
        {
            Palaa = false;
            Nykyinen = false;
            Tuleva = false;
            Sammui = null;
        }

        /// <summary>Piirtoarvot hetkellä nytMs (web piirraValo ilman canvasia).</summary>
        public ValonKuva Laske(double nytMs, bool vahennettyLiike = false)
        {
            double skaala = Tuleva ? Liekki.TulevanKoko : 1;
            double peitto = Tuleva ? Liekki.TulevanPeitto : 1;
            if (!Palaa) return new ValonKuva(false, 0, 0, 0, 0, skaala, peitto, SyttymanVaihe.Hehku);
            var v = Variaatio;
            double ika = nytMs - Alkoi;
            var syttyma = Liekki.Syttyminen(ika, vahennettyLiike);
            var syke = Liekki.Sykkeen(nytMs + v.SykeVaihe * 100, v, vahennettyLiike);
            double hiipuma = 0;
            if (!Nykyinen && Sammui.HasValue)
                hiipuma = vahennettyLiike ? 1 : Math.Min(1, Math.Max(0, (nytMs - Sammui.Value) / Liekki.HiipumaMs));
            double jaljella = Nykyinen ? 1 : (1 - hiipuma) + hiipuma * Liekki.JaljenKirkkaus;
            double kokoJaljella = Nykyinen ? 1 : (1 - hiipuma) + hiipuma * Liekki.JaljenKoko;
            double sade = Liekki.RuutuPx / 2 * v.Koko * syttyma.Koko * syke.Sade * kokoJaljella;
            double kirkkaus = Math.Max(0, Math.Min(1, v.Kirkkaus * syttyma.Kirkkaus * syke.Kirkkaus * jaljella));
            bool nakyy = sade > 0 && kirkkaus > 0;
            return new ValonKuva(nakyy, sade, kirkkaus, hiipuma, ika, skaala, peitto, syttyma.Vaihe);
        }

        /// <summary>Liekin reuna hetkellä nytMs (muoto kulkee syttymisestä kuluneen ajan mukaan).</summary>
        public LiekinMuoto Muoto(double nytMs, bool vahennettyLiike = false) =>
            Liekki.Muoto(nytMs - Alkoi, Variaatio, vahennettyLiike);
    }
}
