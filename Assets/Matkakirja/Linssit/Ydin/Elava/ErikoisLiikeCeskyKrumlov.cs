// ERIKOISMALLIN LIIKE: ČESKÝ KRUMLOV (omistaja valitsi elämänidean A 27.9. klo 18.4x; speksi docs/raportit/erikoismallit/cesky-krumlov.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (kanootit Vltavan mutkassa), harvinainen tapahtuma (puinen lautta), reaktio
// pelaajaan ja yövalot. Puhdas C#, ei allokaatioita kehyksessä (keskilinjan taulukko rakennetaan kerran staattisesti, Asento
// vertaa nimiä suoraan), siemenellä toistettava aikataulu noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Český Krumlov: perusliike = 1–3 punaista kanoottia (joskus kumilautta kanootin paikalla) tulee oikeasta etukulmasta,
    /// kiertää Vltavan mukana vanhankaupungin edestä vasemmalle, vasenta reunaa ylös ja linnan kallion alta tornin ohi ulos
    /// itäreunasta (22 s ± 15 %, lähtöväli 1,2–2 s, alussa ja lopussa 1,5 s:n pehmennys, ilmestyy ja katoaa 0,6 s:ssa). Horní
    /// hradin alla vene laskee Jelení lávkan padon kourun: nousee harjalle, keula painuu 12° ja vene sukeltaa vaahtoon (roiske
    /// 0,8 s). Tauko 15–45 s, ensimmäinen lähtö 3–20 s. Harvinainen (noin 1/10 lähdöistä, oma arpakanava): pitkä puinen lautta
    /// kahdella lauttamiehellä (30 s); puoliskot taipuvat mutkissa ja kourussa (10°) ja roiske on kaksinkertainen (1,4 s).
    /// Reaktio: lähestyttäessä tauolla oleva lähtö alkaa heti (kanootit); napautus lähettää lautan heti (enintään kerran 20 s:ssa,
    /// ja lähtemättömät kanootit jäävät rannalle, jotta nopeammat kanootit eivät aja lautan läpi). Yöllä kanootit eivät lähde
    /// (ei ajastettuna eikä lähestyttäessä), mutta napautuksen lautan keulassa palaa lyhty; linna, torni ja vanhakaupunki
    /// valaistaan (1,5 s, valaisematon hehku). Levossa (joki tyhjä, valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0
    /// kehystä; vähennetty liike (d = 0) jäädyttää veneet paikoilleen.
    /// </summary>
    public sealed class CeskyKrumlovLiike : ErikoisAnimaatio
    {
        /// <summary>Joen keskilinjan ohjauspisteet (sama taulukko kuin Symbolimallit.CkJokiX/CkJokiZ): muuta molemmat.</summary>
        static readonly double[] JokiX = { 0.50, 0.33, 0.16, -0.01, -0.16, -0.28, -0.358, -0.38, -0.335, -0.24, -0.10, 0.05, 0.24, 0.50 };
        static readonly double[] JokiZ = { -0.185, -0.207, -0.243, -0.276, -0.268, -0.215, -0.145, -0.07, -0.007, 0.045, 0.065, 0.033, -0.025, -0.067 };
        /// <summary>Padon harja keskilinjan pituusosuutena (Symbolimallit.CkKouruU) ja näytteitä ohjausväliä kohden (CkNayte).</summary>
        public const double KouruU = 0.66;
        const int Nayte = 16;

        public const double KuluS = 22, Vaihtelu = 0.15, Yksilo = 0.02, HelpotusS = 1.5, NakyS = 0.6;
        public const double TaukoMinS = 15, TaukoMaxS = 45, EkaMinS = 3, EkaMaxS = 20, ValiMinS = 1.2, ValiMaxS = 2.0;
        public const double Harvinainen = 0.1, KumiOsuus = 0.3, NapautusValiS = 20;
        /// <summary>Lautta: kulku (s), puoliskon keskipisteiden väli (mallin yksiköissä) ja taivutus kourussa (°).</summary>
        public const double LauttaS = 30, LauttaVali = 0.08, LauttaTaivutus = 10;
        /// <summary>Kouru: nousu harjalle, sukellus, keulan kallistus (°) ja roiskeen matkat (mallin yksiköissä: kanootin vauhdilla
        /// noin 0,8 s, lautan noin 1,4 s).</summary>
        public const double KouruNousu = 0.004, KouruPudotus = 0.008, LauttaPudotus = 0.003, KouruKallistus = 12, RoiskeMatka = 0.07, LauttaRoiskeMatka = 0.09;
        /// <summary>Lauttamiehet: sauvan heilahdus ±8°, jakso 2,4 s; paikat puoliskon keskeltä (keula +X) ja kannen korkeus.</summary>
        public const double SauvaAste = 8, SauvaJaksoS = 2.4, MiesKeula = 0.022, MiesPera = -0.028, Kansi = 0.004;
        /// <summary>Lyhdyn paikka keulapuoliskon pivotista (Symbolimallit.CkLyhtyPaikka).</summary>
        public const double LyhtyX = 0.032, LyhtyY = 0.0215;

        static readonly double[] PX, PZ, PS;
        /// <summary>Keskilinjan pituus mallin yksiköissä (noin 1,93).</summary>
        public static readonly double Pituus;

        static CeskyKrumlovLiike()
        {
            int n = JokiX.Length, m = (n - 1) * Nayte + 1;
            PX = new double[m]; PZ = new double[m]; PS = new double[m];
            for (int k = 0; k < m; k++)
            {
                int i = Math.Min(k / Nayte, n - 2);
                double t = (k - i * Nayte) / (double)Nayte;
                PX[k] = Cr(JokiX, i, t); PZ[k] = Cr(JokiZ, i, t);
                PS[k] = k == 0 ? 0 : PS[k - 1] + Math.Sqrt((PX[k] - PX[k - 1]) * (PX[k] - PX[k - 1]) + (PZ[k] - PZ[k - 1]) * (PZ[k] - PZ[k - 1]));
            }
            Pituus = PS[m - 1];
        }

        /// <summary>Catmull-Rom ohjausvälillä i osuudella t (päissä peilatut haamupisteet, kuten mallissa).</summary>
        static double Cr(double[] p, int i, double t)
        {
            int n = p.Length;
            double P(int k) => k < 0 ? 2 * p[0] - p[1] : k >= n ? 2 * p[n - 1] - p[n - 2] : p[k];
            double p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2), t2 = t * t, t3 = t2 * t;
            return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
        }

        /// <summary>Keskilinjan piste kaarenpituudella s (0–Pituus) ja kulkusuunta (yksikkövektori). Binäärihaku, ei allokaatioita.</summary>
        public static void Polku(double s, out double x, out double z, out double dx, out double dz)
        {
            s = Math.Max(0, Math.Min(Pituus, s));
            int lo = 1, hi = PS.Length - 1;
            while (lo < hi) { int mid = (lo + hi) >> 1; if (PS[mid] < s) lo = mid + 1; else hi = mid; }
            int k = lo;
            double f = (s - PS[k - 1]) / Math.Max(1e-9, PS[k] - PS[k - 1]);
            x = PX[k - 1] + (PX[k] - PX[k - 1]) * f;
            z = PZ[k - 1] + (PZ[k] - PZ[k - 1]) * f;
            dx = PX[k] - PX[k - 1]; dz = PZ[k] - PZ[k - 1];
            double l = Math.Sqrt(dx * dx + dz * dz);
            if (l > 1e-12) { dx /= l; dz /= l; } else { dx = 1; dz = 0; }
        }

        // ---- tila ----
        /// <summary>Kanoottilähtö: aika lähdöstä (−1 = joki tyhjä), lähtöviiveet, kulkuajat (−1 = ei mukana), kumilautan paikka.</summary>
        double lahto = -1, lahtoLoppu, tauko, lautta = -1, lautanKesto = LauttaS, edellinenNapautus = double.NegativeInfinity;
        readonly double[] alku = new double[3], kesto = { -1, -1, -1 };
        int kumi = -1, lahtoja, lauttoja;

        public CeskyKrumlovLiike(string id) : base(id) { tauko = Vali(EkaMinS, EkaMaxS, 0, 70); }

        public bool Kanootteja => lahto >= 0;
        public bool Lautta => lautta >= 0;
        public int Lahtoja => lahtoja;
        public int Lauttoja => lauttoja;

        void AloitaKanootit()
        {
            lahtoja++;
            int n = 1 + Math.Min(2, (int)(Arpa(lahtoja, 73) * 3));
            kumi = Arpa(lahtoja, 74) < KumiOsuus ? Math.Min(n - 1, (int)(Arpa(lahtoja, 75) * n)) : -1;
            double vauhti = 1 + Vaihtelu * (2 * Arpa(lahtoja, 76) - 1), t0 = 0;
            lahtoLoppu = 0;
            for (int k = 0; k < 3; k++)
            {
                if (k >= n) { kesto[k] = -1; continue; }
                alku[k] = t0;
                kesto[k] = KuluS * vauhti * (1 + Yksilo * (2 * Arpa(lahtoja * 3 + k, 77) - 1));
                lahtoLoppu = Math.Max(lahtoLoppu, alku[k] + kesto[k]);
                t0 += Vali(ValiMinS, ValiMaxS, lahtoja * 3 + k, 78);
            }
            lahto = 0;
        }

        void AloitaLautta()
        {
            lauttoja++;
            lautta = 0;
            lautanKesto = LauttaS * (1 + 0.06 * (2 * Arpa(lauttoja, 79) - 1));
            // Lähtemättömät kanootit jäävät rannalle (lautta on hitaampi, joten myöhemmin lähtevä kanootti ajaisi sen läpi).
            if (lahto >= 0)
                for (int k = 0; k < 3; k++) if (kesto[k] > 0 && alku[k] > lahto) kesto[k] = -1;
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && lautta < 0 && T - edellinenNapautus >= NapautusValiS) { edellinenNapautus = T; AloitaLautta(); }
            if (heraa && !yo && lahto < 0 && lautta < 0) AloitaKanootit();
            if (lahto < 0 && lautta < 0)
            {
                tauko -= d;
                if (tauko <= 0)
                {
                    if (yo) tauko = Vali(TaukoMinS, TaukoMaxS, lahtoja + 1000, 72);
                    else if (Arpa(lahtoja + lauttoja + 1, 71) < Harvinainen) { lahtoja++; AloitaLautta(); }
                    else AloitaKanootit();
                }
            }
            bool kaynnissa = false;
            if (lahto >= 0)
            {
                lahto += d; kaynnissa = true;
                if (lahto > lahtoLoppu) { lahto = -1; kumi = -1; if (lautta < 0) tauko = Vali(TaukoMinS, TaukoMaxS, lahtoja, 72); }
            }
            if (lautta >= 0)
            {
                lautta += d; kaynnissa = true;
                if (lautta > lautanKesto) { lautta = -1; if (lahto < 0) tauko = Vali(TaukoMinS, TaukoMaxS, lahtoja + lauttoja * 7, 72); }
            }
            if (kaynnissa && d > 0) Liikkuu = true;
        }

        // ---- asennot ----

        /// <summary>Tasainen matka 0–1 ajassa t / kesto: pehmeä kiihdytys ja jarrutus r sekuntia, välissä vakionopeus.</summary>
        static double Tasainen(double t, double kesto, double r)
        {
            t = Math.Max(0, Math.Min(kesto, t));
            double v = 1 / (kesto - r);
            if (t < r) return v * t * t / (2 * r);
            if (t > kesto - r) return 1 - v * (kesto - t) * (kesto - t) / (2 * r);
            return v * (t - r * 0.5);
        }

        /// <summary>Kupu 0 → 1 → 0 välillä [a, b] (sin², pehmeä päistä).</summary>
        static double Kupu(double x, double a, double b)
        {
            if (x <= a || x >= b) return 0;
            double s = Math.Sin(Math.PI * (x - a) / (b - a));
            return s * s;
        }

        /// <summary>Veneen asento kaarenpituudella s: paikka, suunta, kourun nousu ja sukellus (pudotus mallin yksiköissä) sekä
        /// keulan kallistus (°).</summary>
        static OsanAsento Vene(double s, double skaala, double kallistusKerroin, double pudotus = KouruPudotus)
        {
            Polku(s, out double x, out double z, out double dx, out double dz);
            double yaw = Math.Atan2(-dz, dx) * 180 / Math.PI;
            double e = s - KouruU * Pituus;   // matka padon harjalta (+ alavirtaan)
            double y = KouruNousu * Kupu(e, -0.03, 0.004) - pudotus * Kupu(e, 0.0, 0.06);
            double kallistus = kallistusKerroin * (Kupu(e, -0.012, 0.04) - 0.3 * Kupu(e, 0.03, 0.075));
            var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, yaw), OsanAsento.Kierto(0, 0, 1, -kallistus));
            return new OsanAsento { X = x, Y = y, Z = z, Skaala = skaala }.Kierretty(q);
        }

        /// <summary>Kanoottipaikan k kaarenpituus ja näkyvyys (skaala 0–1); false, jos paikka ei ole joella.</summary>
        bool Paikka(int k, out double s, out double skaala, out double u)
        {
            s = 0; skaala = 0; u = 0;
            if (lahto < 0 || kesto[k] <= 0) return false;
            double t = lahto - alku[k];
            if (t < 0 || t > kesto[k]) return false;
            u = Tasainen(t, kesto[k], HelpotusS);
            s = u * Pituus;
            skaala = Pehmea(Math.Min(t, kesto[k] - t) / NakyS);
            return skaala > 0.001;
        }

        /// <summary>Lautan puoliskon (0 keula, 1 perä) kaarenpituus ja näkyvyys.</summary>
        bool Puolisko(int i, out double s, out double skaala)
        {
            s = 0; skaala = 0;
            if (lautta < 0) return false;
            double u = Tasainen(lautta, lautanKesto, HelpotusS);
            double sk = LauttaVali + u * (Pituus - LauttaVali);
            s = i == 0 ? sk : sk - LauttaVali;
            skaala = Pehmea(Math.Min(lautta, lautanKesto - lautta) / NakyS);
            return skaala > 0.001;
        }

        /// <summary>Vektorin kierto kvaterniolla (allokaatioton).</summary>
        static void Kierra(double w, double qx, double qy, double qz, ref double x, ref double y, ref double z)
        {
            double tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
            double nx = x + w * tx + (qy * tz - qz * ty), ny = y + w * ty + (qz * tx - qx * tz), nz = z + w * tz + (qx * ty - qy * tx);
            x = nx; y = ny; z = nz;
        }

        /// <summary>Lauttamies i puoliskonsa päällä: paikka puoliskon kehyksessä ja keinunta sauvan tahdissa (vaihe siemenestä).</summary>
        OsanAsento Mies(int i)
        {
            if (!Puolisko(i, out double s, out double sk)) return OsanAsento.Piilossa;
            var p = Vene(s, sk, LauttaTaivutus, LauttaPudotus);
            double lx = (i == 0 ? MiesKeula : MiesPera) * sk, ly = Kansi * sk, lz = 0;
            Kierra(p.Qw, p.Qx, p.Qy, p.Qz, ref lx, ref ly, ref lz);
            double vaihe = 2 * Math.PI * (lautta / SauvaJaksoS + 0.5 * i + Arpa(lauttoja, 80));
            var q = OsanAsento.Tulo((p.Qw, p.Qx, p.Qy, p.Qz), OsanAsento.Kierto(0, 0, 1, SauvaAste * Math.Sin(vaihe)));
            return new OsanAsento { X = p.X + lx, Y = p.Y + ly, Z = p.Z + lz, Skaala = sk }.Kierretty(q);
        }

        /// <summary>Roiske kourun alla: suurin veneiden ja lautan vaahtokaarista (lautalla kaksinkertainen).</summary>
        double Roiske()
        {
            double r = 0, raja = KouruU * Pituus;
            for (int k = 0; k < 3; k++)
                if (Paikka(k, out double s, out _, out _)) r = Math.Max(r, Math.Sin(Math.PI * Math.Max(0, Math.Min(1, (s - raja) / RoiskeMatka))));
            if (Puolisko(0, out double sb, out _))
                r = Math.Max(r, 2 * Math.Sin(Math.PI * Math.Max(0, Math.Min(1, (sb - raja) / LauttaRoiskeMatka))));
            return r;
        }

        OsanAsento Kanootti(int k, bool kumilautta)
        {
            if ((kumi == k) != kumilautta || !Paikka(k, out double s, out double sk, out _)) return OsanAsento.Piilossa;
            return Vene(s, sk, KouruKallistus);
        }

        OsanAsento Vana(int k)
        {
            if (!Paikka(k, out double s, out double sk, out double u)) return OsanAsento.Piilossa;
            double v = Math.Min(1, 1.6 * 4 * u * (1 - u)) * sk;
            if (v <= 0.02) return OsanAsento.Piilossa;
            var p = Vene(s, v, 0);
            p.Y = 0;
            return p;
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "kanootti0": return Kanootti(0, false);
                case "kanootti1": return Kanootti(1, false);
                case "kanootti2": return Kanootti(2, false);
                case "kumilautta": return kumi >= 0 ? Kanootti(kumi, true) : OsanAsento.Piilossa;
                case "vana0": return Vana(0);
                case "vana1": return Vana(1);
                case "vana2": return Vana(2);
                case "roiske":
                {
                    double r = Roiske();
                    return r <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = r };
                }
                case "lautta0":
                case "lautta1":
                {
                    int i = osa[6] - '0';
                    return Puolisko(i, out double s, out double sk) ? Vene(s, sk, LauttaTaivutus, LauttaPudotus) : OsanAsento.Piilossa;
                }
                case "mies0": return Mies(0);
                case "mies1": return Mies(1);
                case "lyhty":
                {
                    if (Valo <= 0.001 || !Puolisko(0, out double s, out double sk)) return OsanAsento.Piilossa;
                    var p = Vene(s, sk, LauttaTaivutus, LauttaPudotus);
                    double lx = LyhtyX * sk, ly = LyhtyY * sk, lz = 0;
                    Kierra(p.Qw, p.Qx, p.Qy, p.Qz, ref lx, ref ly, ref lz);
                    return new OsanAsento { X = p.X + lx, Y = p.Y + ly, Z = p.Z + lz, Qw = 1, Skaala = sk * Pehmea(Valo) };
                }
                case "valot":
                case "valot1":
                case "valot2":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            (lahto >= 0 ? $"kanootit joella {lahto:F1}/{lahtoLoppu:F1} s ({(kesto[2] > 0 ? 3 : kesto[1] > 0 ? 2 : 1)} kpl{(kumi >= 0 ? $", kumilautta paikalla {kumi}" : "")})" : $"tauko {tauko:F0} s") +
            (lautta >= 0 ? $", puulautta {lautta:F1}/{lautanKesto:F1} s" : "") + $", lähtöjä {lahtoja}, lauttoja {lauttoja}";
    }
}
