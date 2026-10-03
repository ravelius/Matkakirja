// AJATTELIJAN AIKAJANA (webin js/linssit/ajattelija.js asetaPrologi/asetaRuutu/asetaGlobaali luvuiksi): kaikki, mikä ei
// tarvitse Unityn vektoreita tai bystin pintaa. Ruudut ovat Blenderin 30 r/s -ruutuja; globaali ruutu G = 1…prologi.loppu
// on prologi, sen jälkeen kierros r = G − prologi.loppu. Kello on puheraita: G = prologi.loppu + puhe.currentTime · 30
// (prologi kulkee omalla kellollaan ennen puhetta).
//
// KIERROKSET 2– (web #3884, a.kierrokset): kohtaus jatkuu pidosta kierrosten loppuun (Sokrates 3330 = 111 s, lappu siellä).
// Kierros vaihtuu, kun ruutu saavuttaa kierroksen virran alun (web kierrosRuudussa); kamera kulkee Blenderin avaimilla
// (Kamerakayra = webin kamerakayra), ja aurinko hiipuu jokaisen kaiun ajaksi.
//
// Taustavirran arvonta (webin mulberry32 ja sekoitus samalla siemenellä) tuottaa täsmälleen webin rivit, koot, kirkkaudet,
// kulmat ja nopeudet: sama tausta joka avauksella ja kummallakin alustalla.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Ajattelijat
{
    public enum KameraVaihe { Intro, Rembrandt, Lahesty, Kaari, Kaiku, Kierrokset }

    /// <summary>Kameran vaihe ruudussa r: Otos (intro), K (siirtymän pehmeä osuus), Osuus (kaaren tai kaiun ajo 0…1).</summary>
    public struct KameraHetki
    {
        public KameraVaihe Vaihe; public int Otos; public double K, Osuus;
    }

    /// <summary>
    /// Taustavirran rivi: projektori i (1 + rivin indeksi), sen projektorikohde, koko ja liike (webin virta-alkio). Nopeus on
    /// uv/ruutu (etumerkki = suunta), Mms sama pinnalla millimetreinä sekunnissa (web paikat().virta).
    /// </summary>
    public sealed class VirtaRivi
    {
        public int I, Projektori, Rivi;
        public double Korkeus, Kirkkaus, VM, Kulma, Nopeus, Mms;
        /// <summary>v14 porrastus: kasvojen puoli, projektorin kuva-ala (m), siirto pinnalla m/ruutu ja lähtöruutu (Porrastus).</summary>
        public VirtaPuoli Puoli;
        public double Ala, MPerRuutu, Lahto;
    }

    /// <summary>Taustavirran rivin puoli kasvoilla (web v14 puoli): alhaalla parta ja suu, ohimot, ylhäällä otsa ja päälaki.</summary>
    public enum VirtaPuoli { Ala, Vasen, Oikea, Yla }

    /// <summary>Rakovalon jalanjälki (web asetaRako): keila, kuvion pehmeys ja voimakerroin ilman W:tä.</summary>
    public struct RakoJalanjalki
    {
        /// <summary>Jalanjälki etäisyydellä RD (m): k + 2·RD·tan(spread/2) kumpaankin suuntaan.</summary>
        public double Kx, Ky;
        /// <summary>Kuvion puolikas (m, RD:n tasolla) = max(kx, ky) / 2 × 1,1 ja keilan puolikulma atan(puoli / RD).</summary>
        public double Puoli, Kulma;
        /// <summary>Kuvion sumennus metreinä (kankaan blur(px) on Gaussin keskihajonta): max(1 px, levea · px / 2) / px.</summary>
        public double Sumeus;
        /// <summary>Voima = energia × W × Kerroin; Kerroin = RD² / (kx · ky) × 30 (kalibroitu Blender-stilleihin).</summary>
        public double Kerroin;
    }

    public static class AjattelijaAikajana
    {
        public const double RuutuaSekunnissa = 30;

        public static double Pehmea(double t) { double x = Math.Min(1, Math.Max(0, t)); return x * x * (3 - 2 * x); }
        public static double Valilla(double r, double a, double b) => (r - a) / (b - a);
        static double Rajaa(double x) => Math.Min(1, Math.Max(0, x));

        /// <summary>Prologin reunavalojen hehku ruudussa p (kytkin → hehkulanka t^2,2 pienellä värähdyksellä → täysi).</summary>
        public static double Hehku(AjattelijaPrologi p, double r) =>
            r < p.Kytkin ? 0 : r < p.Taysi ? Math.Pow(Valilla(r, p.Kytkin, p.Taysi), 2.2) * (1 + 0.08 * Math.Sin(r * 2.7)) : 1;

        /// <summary>Tekstin peitto: 0 välin ulkopuolella, häivytys hai ruutua kummastakin päästä (web nayta).</summary>
        public static double Nakyvyys(double r, double[] vali, double hai = 15) =>
            r < vali[0] || r > vali[1] ? 0 : Math.Min(1, Math.Min((r - vali[0]) / hai, (vali[1] - r) / hai));

        /// <summary>Pystyvinjetti laajoissa otoksissa: nimestä lähestymisen alkuun + 20 ruutua (CSS-siirtymä 1,2 s).</summary>
        public static bool Vinjetti(AjattelijaAjat t, double r) => r >= t.Nimi[0] && r < t.Lahesty[0] + 20;
        /// <summary>Aikajana-tilassa vinjetti nimestä kysymyksen loppuun + 20 ruutua (web asetaAikajana).</summary>
        public static bool VinjettiAikajana(AjattelijaAjat t, double r) => r >= t.Nimi[0] && r < t.Kysymys[1] + 20;

        /// <summary>Kaikujen ikkunat datasta: kierroksen 1 kaiku (a.Ajat.Kaiku) ja kierrosten 2– kaiut (ruudut).</summary>
        public static List<double[]> KaikuIkkunat(AjattelijaData a)
        {
            var l = new List<double[]>();
            if (a.Kaiku != null) l.Add(a.Ajat.Kaiku);
            if (a.Kierrokset != null) foreach (var k in a.Kierrokset.Lista) if (k.Kaiku != null) l.Add(k.Kaiku.Ruudut);
            return l;
        }

        /// <summary>Maailman täytteen lisäkerroin (web #3892): alkukuvissa (r &lt; nimi) intro.tayte, varjopuoli lähes mustaksi.</summary>
        public static double MaailmaKerroin(AjattelijaData a, double r) => r < a.Ajat.Nimi[0] ? a.IntroTayte : 1;

        /// <summary>Auringon ja maailman kerroin: hiipuu nollaan jokaisen kaiun ajaksi (45 ruutua kummassakin päässä).</summary>
        public static double Hiipuu(AjattelijaData a, double r) => Hiipuu(KaikuIkkunat(a), r);

        /// <summary>Hiipuminen annetuista kaikuikkunoista (web kaikuIkkunat: vain kaiut, joiden kohde osui bystiin).</summary>
        public static double Hiipuu(IEnumerable<double[]> ikkunat, double r)
        {
            double h = 1;
            foreach (var w in ikkunat)
            {
                double ka = w[0], kl = w[1];
                if (r > ka && r < kl) h = Math.Min(h, Math.Max(0, 1 - Math.Min(1, Math.Min((r - ka) / 45, (kl - r) / 45))));
            }
            return h;
        }

        /// <summary>Päälauseen vieritys −s0 → s0 lineaarisesti vieritysvälillä.</summary>
        public static double VieritysSiirto(AjattelijaAjat t, double r, double s0) => VieritysSiirto(t.Vieritys, r, s0);
        public static double VieritysSiirto(double[] vieritys, double r, double s0) =>
            -s0 + 2 * s0 * Rajaa(Valilla(r, vieritys[0], vieritys[1]));

        /// <summary>Päälauseen tykin teho: nousee ja laskee 6 ruudussa (v4_projektori).</summary>
        public static double VieritysTeho(AjattelijaAjat t, double r) => VieritysTeho(t.Vieritys, r);
        public static double VieritysTeho(double[] vieritys, double r)
        {
            double va = vieritys[0], vl = vieritys[1];
            return r < va || r > vl ? 0 : Math.Max(0, Math.Min(1, Math.Min((r - va) / 6, (vl - r) / 6)));
        }

        /// <summary>Taustavirran häivytys (r0 → r1 sisään, r2 → r3 ulos); kierroksilla 2– kierroksen oma virta.</summary>
        public static double VirtaVoima(AjattelijaTaustavirta tv, double r) => VirtaVoima(tv.Ajat, r);
        public static double VirtaVoima(double[] ajat, double r)
        {
            double r0 = ajat[0], r1 = ajat[1], r2 = ajat[2], r3 = ajat[3];
            return r <= r0 || r >= r3 ? 0 : Math.Min(1, Math.Min((r - r0) / (r1 - r0), (r3 - r) / (r3 - r2)));
        }

        /// <summary>Kaikukuvan liuku (−liuku → liuku kaiun aikana).</summary>
        public static double KaikuSiirto(AjattelijaData a, double r) =>
            a.Kaiku == null ? 0 : KaikuSiirto(a.Kaiku.Liuku, a.Ajat.Kaiku, r);
        public static double KaikuSiirto(double liuku, double[] ruudut, double r) =>
            -liuku + 2 * liuku * Rajaa(Valilla(r, ruudut[0], ruudut[1]));

        /// <summary>Kohtauksen loppuruutu (lappu): aikajanan loppu, kierrosten loppu tai kierroksen 1 pito (web LOPPU).</summary>
        public static double Loppu(AjattelijaData a) => a.Aikajana?.Loppu ?? a.Kierrokset?.Loppu ?? a.Ajat.Pito;

        /// <summary>
        /// Kierros ruudussa r (web kierrosRuudussa): 0 = kierros 1, j = a.Kierrokset.Lista[j − 1], kun r ≥ sen virran alku.
        /// Näyttämö käyttää samaa sääntöä vain bystiin osuneisiin kierroksiin.
        /// </summary>
        public static int KierrosRuudussa(AjattelijaData a, double r)
        {
            int k = 0;
            if (a.Kierrokset == null) return k;
            for (int j = 0; j < a.Kierrokset.Lista.Count; j++) if (r >= a.Kierrokset.Lista[j].Virta[0]) k = j + 1;
            return k;
        }

        /// <summary>
        /// Webin kamerakayra: Blenderin avaimet ([ruutu, paikka, katse, mm]) käyränä; jokainen kanava erikseen kuutiollisena
        /// Hermite-käyränä, jonka kulmakertoimet ovat Blenderin AUTO_CLAMPED-kahvat (naapurien välinen kulmakerroin; ääriarvossa
        /// ja päissä vaaka). Palauttaa ruutu → otos samoissa koordinaateissa kuin avaimet (R = ruutu).
        /// </summary>
        public static Func<double, AjattelijaOtos> Kamerakayra(IReadOnlyList<AjattelijaOtos> avaimet)
        {
            int n = avaimet.Count;
            var ruudut = avaimet.Select(k => k.R).ToArray();
            var kanavat = avaimet.Select(k => new[] { k.Paikka[0], k.Paikka[1], k.Paikka[2], k.Katse[0], k.Katse[1], k.Katse[2], k.Mm }).ToArray();
            var kulmat = new double[n][];
            for (int i = 0; i < n; i++)
            {
                kulmat[i] = new double[7];
                if (i == 0 || i == n - 1) continue;
                for (int j = 0; j < 7; j++)
                {
                    double v = kanavat[i][j], e = kanavat[i - 1][j], s = kanavat[i + 1][j];
                    if ((v >= e && v >= s) || (v <= e && v <= s)) continue;
                    kulmat[i][j] = (s - e) / (ruudut[i + 1] - ruudut[i - 1]);
                }
            }
            return r =>
            {
                int i = 0;
                while (i < n - 2 && r > ruudut[i + 1]) i++;
                double dt = ruudut[i + 1] - ruudut[i];
                double t = Rajaa((r - ruudut[i]) / dt), t2 = t * t, t3 = t2 * t;
                double h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + t, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
                var x = new double[7];
                for (int j = 0; j < 7; j++)
                    x[j] = h00 * kanavat[i][j] + h10 * dt * kulmat[i][j] + h01 * kanavat[i + 1][j] + h11 * dt * kulmat[i + 1][j];
                return new AjattelijaOtos { R = r, Paikka = new[] { x[0], x[1], x[2] }, Katse = new[] { x[3], x[4], x[5] }, Mm = x[6] };
            };
        }

        /// <summary>Kameran vaihe (web asetaRuutu): intron leikkaukset, Rembrandt, lähestyminen, kaari, kaiku, kierrokset 2– (pidon jälkeen).</summary>
        public static KameraHetki Kamera(AjattelijaData a, double r)
        {
            var t = a.Ajat;
            if (r < t.Nimi[0])
            {
                int o = 0;
                for (int i = 0; i < a.IntroOtokset.Count; i++) if (r >= a.IntroOtokset[i].R) o = i;
                return new KameraHetki { Vaihe = KameraVaihe.Intro, Otos = o };
            }
            if (r <= t.Lahesty[0]) return new KameraHetki { Vaihe = KameraVaihe.Rembrandt };
            if (r <= t.Lahesty[1]) return new KameraHetki { Vaihe = KameraVaihe.Lahesty, K = Pehmea(Valilla(r, t.Lahesty[0], t.Lahesty[1])) };
            if (a.Kierrokset != null && r > t.Pito) return new KameraHetki { Vaihe = KameraVaihe.Kierrokset };
            if (a.Kaiku == null || r <= t.Kaiku[0])
                return new KameraHetki { Vaihe = KameraVaihe.Kaari, Osuus = Pehmea(Valilla(Math.Min(r, t.KaariLoppu), t.Lahesty[1], t.KaariLoppu)) };
            double ka0 = t.Kaiku[0], kl0 = t.Kaiku[1], s = a.Kaiku.KameraSiirtyma;
            return new KameraHetki { Vaihe = KameraVaihe.Kaiku, K = Pehmea(Valilla(r, ka0, ka0 + s)), Osuus = Rajaa(Valilla(r, ka0 + s, kl0)) };
        }

        /// <summary>Auringon suunta introssa (Blender, normalisoitu): avainten välillä pehmeä siirtymä, lopussa Rembrandt.</summary>
        public static double[] AuringonSuunta(AjattelijaData a, double r)
        {
            var avaimet = a.IntroValo;
            var e = avaimet[0];
            foreach (var v in avaimet)
            {
                if (r <= v.R)
                {
                    if (v.R == e.R) return Normaali(v.Suunta);
                    var p = Normaali(e.Suunta); var q = Normaali(v.Suunta);
                    double k = Pehmea(Valilla(r, e.R, v.R));
                    return Normaali(new[] { p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k, p[2] + (q[2] - p[2]) * k });
                }
                e = v;
            }
            return Normaali(e.Suunta);
        }

        public static double[] Normaali(double[] v)
        {
            double l = Math.Sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return l > 0 ? new[] { v[0] / l, v[1] / l, v[2] / l } : new[] { 0.0, 0, 0 };
        }

        /// <summary>Globaalista ruudusta: prologi (p 1…loppu) tai kierros (r 1…Loppu); lappu kohtauksen lopussa.</summary>
        public static (bool prologi, double ruutu, bool loppu) Globaali(AjattelijaData a, double g)
        {
            double pl = a.Prologi.Loppu, loppu = Loppu(a);
            if (g <= pl) return (true, Math.Max(1, g), false);
            double r = Math.Min(g - pl, loppu);
            return (false, r, g - pl >= loppu);
        }

        /// <summary>Webin ajattelijaSiemenluku (mulberry32): sama siemen → sama jono kuin webissä.</summary>
        public static Func<double> Siemenluku(uint siemen)
        {
            uint s = siemen;
            return () =>
            {
                unchecked
                {
                    s += 0x6D2B79F5;
                    uint x = (s ^ (s >> 15)) * (1u | s);
                    x = (x + (x ^ (x >> 7)) * (61u | x)) ^ x;
                    return (x ^ (x >> 14)) / 4294967296.0;
                }
            };
        }

        /// <summary>
        /// Taustavirran rivit projektoreille (web asetaVirta: nopeudet sekoitetaan, rivit jaetaan tasaisin välein kuva-alalle).
        /// Kierrokset 2– asettelevat samat rivit omalla siemenellään (Blender virta2/virta3).
        /// </summary>
        public static List<VirtaRivi> Taustavirta(AjattelijaData a) => Taustavirta(a, a.Taustavirta.Siemen);
        public static List<VirtaRivi> Taustavirta(AjattelijaData a, uint siemen)
        {
            var tv = a.Taustavirta;
            var satunnainen = Siemenluku(siemen);
            // Nopeudet lähes samat (web #3891, Blender v11): kertoimet tasavälein 1 ± vaihtelu, sekoitettuina siemenellä;
            // uv/ruutu = mm/s / 1000 × kerroin / 30 / rivin laatan leveys pinnalla (kork × laatan lev / laatan korkeus px).
            int n = tv.Rivit.Count;
            var nopeudet = Enumerable.Range(0, n).Select(k => 1 - tv.Vaihtelu + 2 * tv.Vaihtelu * k / Math.Max(1, n - 1)).ToArray();
            for (int i = nopeudet.Length - 1; i > 0; i--)
            {
                int j = (int)Math.Floor(satunnainen() * (i + 1));
                (nopeudet[i], nopeudet[j]) = (nopeudet[j], nopeudet[i]);
            }
            var tulos = new List<VirtaRivi>();
            int ri = 0;
            for (int p = 0; p < tv.Projektorit.Count; p++)
            {
                var pj = tv.Projektorit[p];
                for (int k = 0; k < pj.Riveja && ri < tv.Rivit.Count; k++, ri++)
                {
                    string kieli = tv.Rivit[ri].Kieli;
                    var koot = kieli == "fi" ? tv.Rivikork.OrderBy(x => x).Take(2).ToArray() : tv.Rivikork;
                    // v14: riviKoko ohentaa pehmeät rivit (web tv.riviKoko; arvonta ennallaan).
                    double kork = koot[(int)Math.Floor(satunnainen() * koot.Length)] * tv.RiviKoko;
                    var kk = tv.Kirkkaus.TryGetValue(kieli, out var v) ? v : tv.Kirkkaus["el"];
                    double kirkkaus = kk[0] + (kk[1] - kk[0]) * satunnainen();
                    double vM = (-0.4 + 0.8 * (k + 0.5) / pj.Riveja) * pj.Ala + (satunnainen() * 2 - 1) * 0.01;
                    double kulma = (satunnainen() * 2 - 1) * tv.Kulma * Math.PI / 180;
                    var paikka = a.Atlas.Paikat[1 + ri];
                    // v14: nauha heijastetaan riviTila-kertaisena (kirjaimet atlaksessa 1 / riviTila -kokoisina).
                    double riviLev = kork * tv.RiviTila * paikka.Lev / paikka.Korkeus;   // laatta pinnalla (m), u:n yksikkö
                    double nopeus = tv.Mms / 1000 * nopeudet[ri] / RuutuaSekunnissa / riviLev;
                    // v14: kasvojen puoli porrastettua sisääntuloa varten (web: suunta x ±0,5 → ohimot, muuten z > 0,5 tai vM > 0 → ylä).
                    var puoli = pj.Suunta[0] < -0.5 ? VirtaPuoli.Vasen : pj.Suunta[0] > 0.5 ? VirtaPuoli.Oikea
                        : pj.Suunta[2] > 0.5 || vM > 0 ? VirtaPuoli.Yla : VirtaPuoli.Ala;
                    tulos.Add(new VirtaRivi
                    {
                        I = 1 + ri, Projektori = p, Rivi = ri, Korkeus = kork, Kirkkaus = kirkkaus, VM = vM, Kulma = kulma,
                        Nopeus = nopeus * (ri % 2 == 1 ? 1 : -1), Mms = tv.Mms * nopeudet[ri],
                        Puoli = puoli, Ala = pj.Ala, MPerRuutu = tv.Mms / 1000 * nopeudet[ri] / RuutuaSekunnissa,
                    });
                }
            }
            return tulos;
        }

        // ── AIKAJANA (v13–v14, web asetaAikajana; 088b64d0c) ─────────────────────────────────────────

        /// <summary>Webin avainArvo: lineaarinen arvo avaimista [[ruutu, arvo], …]; päiden ulkopuolella ensimmäinen tai viimeinen.</summary>
        public static double AvainArvo(IReadOnlyList<double[]> avaimet, double r)
        {
            if (r <= avaimet[0][0]) return avaimet[0][1];
            for (int i = 1; i < avaimet.Count; i++)
            {
                double r1 = avaimet[i][0];
                if (r <= r1)
                {
                    double r0 = avaimet[i - 1][0], a = avaimet[i - 1][1], b = avaimet[i][1];
                    double t = r1 > r0 ? (r - r0) / (r1 - r0) : 1;
                    return a + (b - a) * t;
                }
            }
            return avaimet[avaimet.Count - 1][1];
        }

        /// <summary>avainArvo vektoriavaimille [[ruutu, [x, y, z]], …] (pyyhkäisyn kohteet).</summary>
        public static double[] AvainArvo(IReadOnlyList<(double R, double[] V)> avaimet, double r)
        {
            if (r <= avaimet[0].R) return avaimet[0].V;
            for (int i = 1; i < avaimet.Count; i++)
            {
                if (r <= avaimet[i].R)
                {
                    var (r0, a) = avaimet[i - 1]; var (r1, b) = avaimet[i];
                    double t = r1 > r0 ? (r - r0) / (r1 - r0) : 1;
                    return a.Select((x, j) => x + (b[j] - x) * t).ToArray();
                }
            }
            return avaimet[avaimet.Count - 1].V;
        }

        /// <summary>Webin askelAvain: viimeinen avain, jonka ruutu ≤ r (muuten ensimmäinen); arvot vaihtuvat leikkausruuduissa.</summary>
        public static int AskelIndeksi(IReadOnlyList<double> ruudut, double r)
        {
            int k = 0;
            for (int i = 0; i < ruudut.Count; i++) if (ruudut[i] <= r) k = i;
            return k;
        }
        public static double[] AskelAvain(IReadOnlyList<double[]> avaimet, double r) => avaimet[AskelIndeksi(avaimet.Select(x => x[0]).ToList(), r)];
        public static RakoAvain AskelAvain(IReadOnlyList<RakoAvain> avaimet, double r) => avaimet[AskelIndeksi(avaimet.Select(x => x.R).ToList(), r)];

        /// <summary>
        /// Webin aikajanaKamera: CONSTANT-avain pitää arvonsa seuraavaan avaimeen (leikkaus), BEZIER-avaimista seuraavaan
        /// ajetaan; peräkkäiset ajot ovat yksi AUTO_CLAMPED-käyrä (Kamerakayra), joka päättyy pitoon tai leikkaukseen.
        /// </summary>
        public static Func<double, AjattelijaOtos> AikajanaKamera(IReadOnlyList<AikajanaKameraAvain> avaimet)
        {
            var otos = avaimet.Select(k => new AjattelijaOtos { R = k.R, Paikka = k.Paikka, Katse = k.Katse, Mm = k.Mm }).ToList();
            var ajot = new List<(double alku, double loppu, Func<double, AjattelijaOtos> kayra)>();
            int i = 0;
            while (i < avaimet.Count - 1)
            {
                if (!avaimet[i].Ajo) { i++; continue; }
                int e = i;
                while (e < avaimet.Count - 1 && avaimet[e].Ajo) e++;
                ajot.Add((avaimet[i].R, avaimet[e].R, Kamerakayra(otos.GetRange(i, e - i + 1))));
                i = e;
            }
            return r =>
            {
                foreach (var (alku, loppu, kayra) in ajot) if (r >= alku && r < loppu) return kayra(r);
                var k = otos[0];
                foreach (var x in otos) if (r >= x.R) k = x;
                return new AjattelijaOtos { R = r, Paikka = k.Paikka, Katse = k.Katse, Mm = k.Mm };
            };
        }

        /// <summary>
        /// Webin aikajanaAurinko: paikka avaimista suunnan ja etäisyyden mukaan (kierto ei oikaise ympyrän läpi), energia ja
        /// väri lineaarisesti. Palauttaa ruutu → (paikka, energia, väri tai null) Blender-koordinaateissa.
        /// </summary>
        public static Func<double, (double[] paikka, double energia, double[] vari)> AikajanaAurinko(double[] kohde, IReadOnlyList<AikajanaAurinkoAvain> avaimet)
        {
            var suhteessa = avaimet.Select(k =>
            {
                var d = new[] { k.Paikka[0] - kohde[0], k.Paikka[1] - kohde[1], k.Paikka[2] - kohde[2] };
                double pituus = Math.Sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
                return (r: k.R, suunta: d.Select(x => x / pituus).ToArray(), pituus, e: k.Energia, vari: k.Vari);
            }).ToList();
            return r =>
            {
                int i = suhteessa.FindIndex(x => r <= x.r);
                if (i <= 0) i = i < 0 ? suhteessa.Count - 1 : 0;
                var b = suhteessa[i]; var a = suhteessa[Math.Max(0, i - 1)];
                double t = b.r > a.r ? Rajaa((r - a.r) / (b.r - a.r)) : 1;
                var s = a.suunta.Select((x, j) => x + (b.suunta[j] - x) * t).ToArray();
                double n = Math.Sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
                if (n == 0) n = 1;
                double pituus = a.pituus + (b.pituus - a.pituus) * t;
                var vari = a.vari != null && b.vari != null ? a.vari.Select((x, j) => x + (b.vari[j] - x) * t).ToArray() : (b.vari ?? a.vari);
                return (s.Select((x, j) => kohde[j] + x / n * pituus).ToArray(), a.e + (b.e - a.e) * t, vari);
            };
        }

        /// <summary>
        /// Webin korttiRivit (v14 päälainaus korttina): sanat tasapainoisille riveille; rivejä ceil(pituus / merkkeja), rivi
        /// vaihtuu, kun tavoitepituus + 4 ylittyisi. Natiivissa kortti on valmiina atlaksessa (tyokalut/ajattelijat-natiiviin.mjs).
        /// </summary>
        public static List<string> KorttiRivit(string teksti, int merkkeja)
        {
            var sanat = System.Text.RegularExpressions.Regex.Split(teksti, @"\s+");
            int n = Math.Max(1, (int)Math.Ceiling(teksti.Length / (double)merkkeja));
            double tavoite = teksti.Length / (double)n;
            var rivit = new List<string> { "" };
            foreach (var sana in sanat)
            {
                string nyt = rivit[rivit.Count - 1];
                if (nyt.Length > 0 && nyt.Length + 1 + sana.Length > tavoite + 4 && rivit.Count < n) rivit.Add(sana);
                else rivit[rivit.Count - 1] = nyt.Length > 0 ? nyt + " " + sana : sana;
            }
            return rivit;
        }

        /// <summary>Rakovalon kuvion etäisyys (m) ja kerroin (web RD 0,9, RAKO_KERROIN 30).</summary>
        public const double RakoEtaisyys = 0.9, RakoKerroin = 30;

        /// <summary>
        /// Webin asetaRako: suorakaide k × ky levenee spreadin verran (RD · tan(spread/2) joka reunalla), teho jakautuu
        /// jalanjäljelle (E = P / A'); keila kattaa jalanjäljen (kuvio ±puoli, 512 px:n kangas), kuvion pehmeys kankaan blur.
        /// </summary>
        public static RakoJalanjalki Rako(double k, double ky, double spread)
        {
            double levea = RakoEtaisyys * Math.Tan(spread / 2 * Math.PI / 180);
            double kx = k + 2 * levea, kyy = ky + 2 * levea;
            double puoli = Math.Max(kx, kyy) / 2 * 1.1;
            double px = 256 / puoli;
            return new RakoJalanjalki
            {
                Kx = kx, Ky = kyy, Puoli = puoli, Kulma = Math.Atan(puoli / RakoEtaisyys),
                Sumeus = Math.Max(1, levea * px / 2) / px, Kerroin = RakoEtaisyys * RakoEtaisyys / (kx * kyy) * RakoKerroin,
            };
        }

        /// <summary>
        /// Webin porrastus (v14): lähtöjärjestys kiertää ala → vasen → oikea → ylä, tahti vali ruutua; ylärivit vasta
        /// kysymyksen jälkeen (r0 ≥ kysymysLoppu), ellei muita ole jäljellä. Asettaa rivien Lahto; palauttaa porrastuksen lopun
        /// (viimeinen lähtö + vali + häivytys), jonka jälkeen aikajanan virtakerroin ohjaa.
        /// </summary>
        public static double Porrastus(IReadOnlyList<VirtaRivi> virta, double alku, double vali, double haivytys, double kysymysLoppu)
        {
            var kierto = new[] { VirtaPuoli.Ala, VirtaPuoli.Vasen, VirtaPuoli.Oikea, VirtaPuoli.Yla };
            var jonot = kierto.ToDictionary(p => p, p => new Queue<VirtaRivi>(virta.Where(v => v.Puoli == p)));
            double r0 = alku;
            int k = 0;
            while (kierto.Any(p => jonot[p].Count > 0))
            {
                VirtaPuoli? valittu = null;
                for (int n = 0; n < 4 && valittu == null; n++)
                {
                    var ehdokas = kierto[(k + n) % 4];
                    if (jonot[ehdokas].Count == 0) continue;
                    if (ehdokas == VirtaPuoli.Yla && r0 < kysymysLoppu && kierto.Any(q => q != VirtaPuoli.Yla && jonot[q].Count > 0)) continue;
                    valittu = ehdokas; k += n;
                }
                jonot[valittu.Value].Dequeue().Lahto = r0;
                r0 += vali; k++;
            }
            return r0 + haivytys;
        }

        /// <summary>
        /// Porrastetun rivin tila ruudussa r (web asetaAikajana): siirto (uv), rintama (projektorin pF.w: 0 = koko rivi,
        /// ±10 + kynnys m) ja voiman kerroin (häivytys × aikajanan virtakerroin, ennen kaikkien lähtöä vähintään 1).
        /// </summary>
        public static (double siirto, double rintama, double voima) PorrasTila(VirtaRivi v, double r, double haivytys, double rintamaKerroin,
            double reuna, double vk, bool kaikki)
        {
            double ika = r - v.Lahto;
            if (ika <= 0) return (0, 0, 0);
            double etu = reuna * v.Ala / 2 - rintamaKerroin * v.MPerRuutu * ika;
            double sd = v.Nopeus > 0 ? 1 : -1;
            double rintama = etu > -v.Ala / 2 ? sd * 10 + sd * etu : 0;
            return (v.Nopeus * ika, rintama, Math.Min(1, ika / haivytys) * (kaikki ? vk : Math.Max(vk, 1)));
        }

        /// <summary>Väistökehän säde ruudussa r: kasvaa ja kutistuu 15 ruudussa (web v13c), 0 välin ulkopuolella.</summary>
        public static double VaistoSade(double sade, double[] ruudut, double r) =>
            r > ruudut[0] && r < ruudut[1] ? sade * Math.Min(1, Math.Min((r - ruudut[0]) / 15, (ruudut[1] - r) / 15)) : 0;

        /// <summary>Lainaus ruudussa r (web): tykki, jonka energia-avainten väli sisältää ruudun, muuten seuraava (tai 0).</summary>
        public static int TykkiRuudussa(IReadOnlyList<AikajanaTykki> tykit, double r)
        {
            for (int j = 0; j < tykit.Count; j++)
                if (r >= tykit[j].Energia[0][0] && r <= tykit[j].Energia[tykit[j].Energia.Count - 1][0]) return j;
            for (int j = 0; j < tykit.Count; j++) if (r < tykit[j].Energia[0][0]) return j;
            return 0;
        }

        /// <summary>Kaikupaikan s (0/1; kaiut vuorotellen) kaiku ruudussa r: käynnissä oleva, muuten viimeksi alkanut tai ensimmäinen.</summary>
        public static int KaikuPaikassa(IReadOnlyList<AikajanaKaiku> kaiut, int s, double r)
        {
            var omat = Enumerable.Range(0, kaiut.Count).Where(i => i % 2 == s).ToList();
            if (omat.Count == 0) return -1;
            double Alku(int i) => kaiut[i].Energia[0][0];
            double Loppu(int i) => kaiut[i].Energia[kaiut[i].Energia.Count - 1][0];
            foreach (var i in omat) if (r >= Alku(i) && r <= Loppu(i)) return i;
            int viim = -1;
            foreach (var i in omat) if (Alku(i) <= r) viim = i;
            return viim >= 0 ? viim : omat[0];
        }

        /// <summary>Savumaskin ruutu (web): laatan u, v (8 × 8) ja kanava 0–3 ruudussa r (silmukka kesto s, fps, ruutuja).</summary>
        public static (double u, double v, int kanava) SavuRuutu(double r, double kesto, double fps, double ruutuja)
        {
            int ruutu = (int)Math.Floor(((r / RuutuaSekunnissa) % kesto) * fps) % (int)ruutuja;
            int laatta = ruutu / 4;
            return ((laatta % 8) / 8.0, Math.Floor(laatta / 8.0) / 8.0, ruutu % 4);
        }
    }
}
