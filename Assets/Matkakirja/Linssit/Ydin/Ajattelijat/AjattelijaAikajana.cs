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

    /// <summary>Taustavirran rivi: projektori i (1 + rivin indeksi), sen projektorikohde, koko ja liike (webin virta-alkio).</summary>
    public sealed class VirtaRivi
    {
        public int I, Projektori, Rivi;
        public double Korkeus, Kirkkaus, VM, Kulma, Nopeus;
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

        /// <summary>Kaikujen ikkunat datasta: kierroksen 1 kaiku (a.Ajat.Kaiku) ja kierrosten 2– kaiut (ruudut).</summary>
        public static List<double[]> KaikuIkkunat(AjattelijaData a)
        {
            var l = new List<double[]>();
            if (a.Kaiku != null) l.Add(a.Ajat.Kaiku);
            if (a.Kierrokset != null) foreach (var k in a.Kierrokset.Lista) if (k.Kaiku != null) l.Add(k.Kaiku.Ruudut);
            return l;
        }

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

        /// <summary>Kohtauksen loppuruutu (lappu): kierrosten loppu tai kierroksen 1 pito.</summary>
        public static double Loppu(AjattelijaData a) => a.Kierrokset?.Loppu ?? a.Ajat.Pito;

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
        public static List<VirtaRivi> Taustavirta(AjattelijaTaustavirta tv) => Taustavirta(tv, tv.Siemen);
        public static List<VirtaRivi> Taustavirta(AjattelijaTaustavirta tv, uint siemen)
        {
            var satunnainen = Siemenluku(siemen);
            var nopeudet = Enumerable.Range(0, tv.Rivit.Count).Select(k => 0.0007 * Math.Pow(1.18, k)).ToArray();
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
                    double kork = koot[(int)Math.Floor(satunnainen() * koot.Length)];
                    var kk = tv.Kirkkaus.TryGetValue(kieli, out var v) ? v : tv.Kirkkaus["el"];
                    double kirkkaus = kk[0] + (kk[1] - kk[0]) * satunnainen();
                    double vM = (-0.4 + 0.8 * (k + 0.5) / pj.Riveja) * pj.Ala + (satunnainen() * 2 - 1) * 0.01;
                    double kulma = (satunnainen() * 2 - 1) * tv.Kulma * Math.PI / 180;
                    tulos.Add(new VirtaRivi
                    {
                        I = 1 + ri, Projektori = p, Rivi = ri, Korkeus = kork, Kirkkaus = kirkkaus, VM = vM, Kulma = kulma,
                        Nopeus = nopeudet[ri] * (ri % 2 == 1 ? 1 : -1),
                    });
                }
            }
            return tulos;
        }
    }
}
