// AJATTELIJAN AIKAJANA (webin js/linssit/ajattelija.js asetaPrologi/asetaRuutu/asetaGlobaali luvuiksi): kaikki, mikä ei
// tarvitse Unityn vektoreita tai bystin pintaa. Ruudut ovat Blenderin 30 r/s -ruutuja; globaali ruutu G = 1…prologi.loppu
// on prologi, sen jälkeen kierros r = G − prologi.loppu. Kello on puheraita: G = prologi.loppu + puhe.currentTime · 30
// (prologi kulkee omalla kellollaan ennen puhetta).
//
// Taustavirran arvonta (webin mulberry32 ja sekoitus samalla siemenellä) tuottaa täsmälleen webin rivit, koot, kirkkaudet,
// kulmat ja nopeudet: sama tausta joka avauksella ja kummallakin alustalla.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Ajattelijat
{
    public enum KameraVaihe { Intro, Rembrandt, Lahesty, Kaari, Kaiku }

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

        /// <summary>Auringon ja maailman kerroin: hiipuu nollaan kaiun ajaksi (45 ruutua kummassakin päässä).</summary>
        public static double Hiipuu(AjattelijaData a, double r)
        {
            if (a.Kaiku == null) return 1;
            double ka = a.Ajat.Kaiku[0], kl = a.Ajat.Kaiku[1];
            return r <= ka || r >= kl ? 1 : Math.Max(0, 1 - Math.Min(1, Math.Min((r - ka) / 45, (kl - r) / 45)));
        }

        /// <summary>Päälauseen vieritys −s0 → s0 lineaarisesti vieritysvälillä.</summary>
        public static double VieritysSiirto(AjattelijaAjat t, double r, double s0) =>
            -s0 + 2 * s0 * Rajaa(Valilla(r, t.Vieritys[0], t.Vieritys[1]));

        /// <summary>Päälauseen tykin teho: nousee ja laskee 6 ruudussa (v4_projektori).</summary>
        public static double VieritysTeho(AjattelijaAjat t, double r)
        {
            double va = t.Vieritys[0], vl = t.Vieritys[1];
            return r < va || r > vl ? 0 : Math.Max(0, Math.Min(1, Math.Min((r - va) / 6, (vl - r) / 6)));
        }

        /// <summary>Taustavirran häivytys (r0 → r1 sisään, r2 → r3 ulos).</summary>
        public static double VirtaVoima(AjattelijaTaustavirta tv, double r)
        {
            double r0 = tv.Ajat[0], r1 = tv.Ajat[1], r2 = tv.Ajat[2], r3 = tv.Ajat[3];
            return r <= r0 || r >= r3 ? 0 : Math.Min(1, Math.Min((r - r0) / (r1 - r0), (r3 - r) / (r3 - r2)));
        }

        /// <summary>Kaikukuvan liuku (−liuku → liuku kaiun aikana).</summary>
        public static double KaikuSiirto(AjattelijaData a, double r) =>
            a.Kaiku == null ? 0 : -a.Kaiku.Liuku + 2 * a.Kaiku.Liuku * Rajaa(Valilla(r, a.Ajat.Kaiku[0], a.Ajat.Kaiku[1]));

        /// <summary>Kameran vaihe (web asetaRuutu): intron leikkaukset, Rembrandt, lähestyminen, kaari, kaiku.</summary>
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

        /// <summary>Globaalista ruudusta: prologi (p 1…loppu) tai kierros (r 1…pito); lappu, kun kierros on pidossa.</summary>
        public static (bool prologi, double ruutu, bool loppu) Globaali(AjattelijaData a, double g)
        {
            double pl = a.Prologi.Loppu;
            if (g <= pl) return (true, Math.Max(1, g), false);
            double r = Math.Min(g - pl, a.Ajat.Pito);
            return (false, r, g - pl >= a.Ajat.Pito);
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

        /// <summary>Taustavirran rivit projektoreille (web: nopeudet sekoitetaan, rivit jaetaan tasaisin välein kuva-alalle).</summary>
        public static List<VirtaRivi> Taustavirta(AjattelijaTaustavirta tv)
        {
            var satunnainen = Siemenluku(tv.Siemen);
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
