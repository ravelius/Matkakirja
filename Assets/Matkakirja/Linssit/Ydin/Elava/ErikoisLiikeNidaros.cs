// ERIKOISMALLIN LIIKE: NIDAROSIN TUOMIOKIRKKO (elämänidea "Pyhiinvaeltajat", omistaja hyväksyi 27.9.2026; speksi
// docs/raportit/erikoismallit/nidaros.md). Sama kaava kuin ErikoisLiike.cs: perusliike (vaeltajat kiertävät kirkon kolmesti),
// harvinainen tapahtuma (Olsok-valvojaiset), reaktio pelaajaan ja yövalot. Puhdas C#: reitin taulukot lasketaan kerran
// (staattinen konstruktori), kehyksessä ei allokaatioita (Asento vertaa merkkejä, ei Substringiä), aikataulu siemenestä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Nidarosin tuomiokirkko: perusliike = 1–4 pyhiinvaeltajaa saapuu Pyhän Olavin tietä kirkkomaan etureunasta
    /// länsijulkisivun aukiolle, pysähtyy keskiportin eteen (1,5–3 s, katse porttiin), kiertää kirkon kolmesti myötäpäivään
    /// ylhäältä katsottuna (medsols) vaaleaa polkua pitkin ja kävelee keskiporttiin, jossa katoaa. Sen jälkeen tauko
    /// 55–150 s (liikkuvia kehyksiä noin 38 %, elävän kerroksen kehykset ja akku). Siemenestä vaihtelevat ryhmän koko
    /// (noin 15 %:ssa yksin), vauhti, väli, pysähdys, vaeltajien sivupoikkeamat ja askelvaiheet. Harvinainen (noin 1/10 ryhmistä): Olsok-valvojaiset — vaeltajien kynttilät syttyvät reitin alussa (1,5 s)
    /// ja palavat koko reitin, ja ruusuikkuna syttyy, kun ryhmä pysähtyy portin eteen (8 s: syttyy 1,5 s, hehkuu, hiipuu
    /// 1,5 s). Reaktio: lähestyttäessä
    /// tauolla oleva ryhmä lähtee heti; napautus = valvojaiset heti (enintään kerran 20 s:ssa): matkalla olevan ryhmän
    /// kynttilät syttyvät, tai kynttiläryhmä lähtee heti, ja ruusuikkuna syttyy heti. Yöllä ryhmät eivät lähde itsestään;
    /// lähestyminen tuo kynttiläryhmän ja napautus valvojaiset. Yövalot 1,5 s. Tauolla Liikkuu = false (0 kehystä), ja
    /// vähennetty liike (Liike 0) jäädyttää kaiken.
    /// </summary>
    public sealed class NidarosLiike : ErikoisAnimaatio
    {
        // ---- Reitti: samat taulukot ja muunnos kuin Symbolimallit.NdKierrosU/V, NdSaapuU/V, NdS, NdUc, NdSiirtoX/Z ----

        const double S = 1.0 / 112.0, Uc = 51.0, SiirtoX = 1.82, SiirtoZ = 2.30, C45 = 0.70710678, MaaY = 0.006, MaaReuna = 0.0015;
        static readonly double[] KierrosU = { -6, -6, -4.5, 1, 10, 20, 32, 42, 51, 59, 67, 76, 86, 96, 104, 106, 102, 92, 80, 71,
            62.5, 51, 42, 32, 20, 10, 1, -4.5 };
        static readonly double[] KierrosV = { -4, 8, 20.5, 25.5, 25.5, 26, 26.5, 28.5, 30, 29.5, 26.5, 24, 23.5, 17, 8, -2, -11.5, -16.5, -18,
            -25.5, -29.5, -30.5, -28.5, -26.5, -26, -25.5, -25.5, -20.5 };
        /// <summary>Saapuminen: kirkkomaan etureunasta (piste 1) eteläkyljen polulle ja sitä pitkin pysähdyspaikalle (piste 7).</summary>
        static readonly double[] SaapuU = { 30, 30, 27.5, 20, 10, 1, -4.5, -6, -6 }, SaapuV = { -46, -38, -29.5, -26, -25.5, -25.5, -20.5, -4, 8 };
        /// <summary>Poistuminen: kierroksen alusta (−6, −4) ohjauspisteen (−6, −0,5) kautta keskiportin syvennykseen (1,4; 0).</summary>
        const double PoistuCu = -6, PoistuCv = -0.5, PorttiU = 1.4, PorttiV = 0;
        /// <summary>Pyhän Olavin tien nousu kirkkomaan reunalta (MaaReuna) kiveyksen tasolle ensimmäisellä 0,07 yksiköllä
        /// (sama profiili kuin Symbolimallit.NdTienKorkeus).</summary>
        public const double TieNousu = 0.07;

        // ---- Liikkeen vakiot ----

        public const int Vaeltajia = 4, Kierroksia = 3;
        public const double Harvinainen = 0.1, YksinTod = 0.15, NapautusValiS = 20;
        /// <summary>Vauhti (mallin yksikköä sekunnissa), vaeltajien väli, pysähdys portin edessä ja tauko ryhmien välillä (s).</summary>
        public const double VauhtiMin = 0.13, VauhtiMax = 0.17, ValiMin = 0.033, ValiMax = 0.045, PysahdysMin = 1.5, PysahdysMax = 3.0,
            TaukoMin = 55, TaukoMax = 150;
        /// <summary>Kiihdytys ja hidastus (s), ilmestymis- ja katoamismatka (yksikköä) sekä sivupoikkeaman raja.</summary>
        public const double KiihdytysS = 0.8, IlmestyyMatka = 0.035, KatoaaMatka = 0.022, SivuRaja = 0.0035;
        /// <summary>Askel: nousu 0,0012 jaksolla 0,34 s; vartalon keinunta ±3° jaksolla 1,1 s.</summary>
        public const double AskelNousu = 0.0012, AskelJakso = 0.34, KeinuAste = 3, KeinuJakso = 1.1;
        /// <summary>Kynttilöiden syttyminen, ruusuikkunan kesto ja syttyminen (s).</summary>
        public const double KynttilaS = 1.5, RuusuS = 8, RuusuSyttyyS = 1.5, KatseS = 0.7;

        // ---- Esilasketut reitit (mallin yksiköissä): saapuminen (a), kierros (k) ja poistuminen (p) ----

        static readonly double[] aX, aZ, aS, kX, kZ, kS, pX, pZ, pS;
        /// <summary>Reitin osien pituudet (mallin yksiköissä).</summary>
        public static readonly double SaapuPituus, KierrosPituus, PoistuPituus;
        /// <summary>Vaeltajien ja kynttilöiden pivot (sama kuin Symbolimallit.NdVaeltajaPivot) ja keskiportin kohta.</summary>
        public static readonly double PivotX, PivotY, PivotZ, PorttiX, PorttiZ;
        /// <summary>Koko reitin pituus portin sisäpisteeseen (saapuminen, kolme kierrosta ja poistuminen).</summary>
        public static readonly double ReittiPituus;

        static void Muunna(double u, double v, out double x, out double z)
        {
            x = ((u - Uc) * C45 - v * C45 + SiirtoX) * S;
            z = ((u - Uc) * C45 + v * C45 + SiirtoZ) * S;
        }

        static double Catmull(double p0, double p1, double p2, double p3, double t)
        {
            double t2 = t * t, t3 = t2 * t;
            return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
        }

        static void Pituudet(double[] x, double[] z, double[] s)
        {
            s[0] = 0;
            for (int i = 1; i < x.Length; i++)
            {
                double dx = x[i] - x[i - 1], dz = z[i] - z[i - 1];
                s[i] = s[i - 1] + Math.Sqrt(dx * dx + dz * dz);
            }
        }

        static NidarosLiike()
        {
            const int N = 24;
            // Kierros: suljettu Catmull-Rom, viimeinen näyte = ensimmäinen.
            int n = KierrosU.Length;
            kX = new double[n * N + 1]; kZ = new double[n * N + 1]; kS = new double[n * N + 1];
            for (int i = 0; i < n; i++)
                for (int k = 0; k < N; k++)
                {
                    int i0 = (i - 1 + n) % n, i1 = i, i2 = (i + 1) % n, i3 = (i + 2) % n;
                    double t = k / (double)N;
                    Muunna(Catmull(KierrosU[i0], KierrosU[i1], KierrosU[i2], KierrosU[i3], t), Catmull(KierrosV[i0], KierrosV[i1], KierrosV[i2], KierrosV[i3], t),
                        out kX[i * N + k], out kZ[i * N + k]);
                }
            kX[n * N] = kX[0]; kZ[n * N] = kZ[0];
            Pituudet(kX, kZ, kS);
            // Saapuminen: avoin Catmull-Rom ohjauspisteestä 1 pisteeseen 7 (päiden haamupisteet 0 ja 8).
            int na = SaapuU.Length - 3;
            aX = new double[na * N + 1]; aZ = new double[na * N + 1]; aS = new double[na * N + 1];
            for (int i = 0; i < na; i++)
                for (int k = 0; k <= N; k++)
                {
                    if (k == N && i < na - 1) continue;
                    double t = k / (double)N;
                    Muunna(Catmull(SaapuU[i], SaapuU[i + 1], SaapuU[i + 2], SaapuU[i + 3], t), Catmull(SaapuV[i], SaapuV[i + 1], SaapuV[i + 2], SaapuV[i + 3], t),
                        out aX[i * N + k], out aZ[i * N + k]);
                }
            Pituudet(aX, aZ, aS);
            // Poistuminen: toisen asteen Bézier kierroksen alusta porttiin.
            pX = new double[N + 1]; pZ = new double[N + 1]; pS = new double[N + 1];
            for (int k = 0; k <= N; k++)
            {
                double t = k / (double)N, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
                Muunna(a * KierrosU[0] + b * PoistuCu + c * PorttiU, a * KierrosV[0] + b * PoistuCv + c * PorttiV, out pX[k], out pZ[k]);
            }
            Pituudet(pX, pZ, pS);
            SaapuPituus = aS[aS.Length - 1]; KierrosPituus = kS[kS.Length - 1]; PoistuPituus = pS[pS.Length - 1];
            ReittiPituus = SaapuPituus + Kierroksia * KierrosPituus + PoistuPituus;
            Muunna(KierrosU[0], KierrosV[0], out PivotX, out PivotZ);
            PivotY = MaaY;
            Muunna(0, 0, out PorttiX, out PorttiZ);
        }

        /// <summary>Piste ja yksikkötangentti taulukosta matkalla s (rajattu), binäärihaku ilman allokaatioita.</summary>
        static void Taulukosta(double[] x, double[] z, double[] s, double m, out double px, out double pz, out double tx, out double tz)
        {
            int n = s.Length;
            if (m <= 0) m = 0;
            if (m >= s[n - 1]) m = s[n - 1];
            int lo = 0, hi = n - 1;
            while (hi - lo > 1) { int mid = (lo + hi) >> 1; if (s[mid] <= m) lo = mid; else hi = mid; }
            double seg = s[hi] - s[lo], f = seg > 1e-12 ? (m - s[lo]) / seg : 0;
            px = x[lo] + (x[hi] - x[lo]) * f; pz = z[lo] + (z[hi] - z[lo]) * f;
            double dx = x[hi] - x[lo], dz = z[hi] - z[lo], l = Math.Sqrt(dx * dx + dz * dz);
            if (l > 1e-12) { tx = dx / l; tz = dz / l; } else { tx = 0; tz = 1; }
        }

        /// <summary>Reitin piste matkalla m (0 = tien alku kirkkomaan reunalla, ReittiPituus = portin sisäpiste).</summary>
        public static void Reitti(double m, out double x, out double z, out double tx, out double tz)
        {
            if (m <= SaapuPituus) { Taulukosta(aX, aZ, aS, m, out x, out z, out tx, out tz); return; }
            double k = m - SaapuPituus;
            if (k < Kierroksia * KierrosPituus)
            {
                double kk = k - Math.Floor(k / KierrosPituus) * KierrosPituus;
                Taulukosta(kX, kZ, kS, kk, out x, out z, out tx, out tz);
                return;
            }
            Taulukosta(pX, pZ, pS, k - Kierroksia * KierrosPituus, out x, out z, out tx, out tz);
        }

        /// <summary>Maan korkeus reitillä pivotin (kiveys) suhteen: tien alussa kirkkomaan reunalla (MaaReuna), nousee
        /// kiveyksen tasolle TieNousu-matkalla.</summary>
        public static double Maa(double m)
        {
            double t = Math.Max(0, Math.Min(1, m / TieNousu));
            return (MaaReuna - MaaY) * (1 - t * t * (3 - 2 * t));
        }

        // ---- Tila ----

        enum Vaihe { Tauko, Saapuu, Pysahtyy, Kiertaa }
        Vaihe vaihe = Vaihe.Tauko;
        double aika, kesto, johtaja, kiertoMatka, kynttilaTaso, ruusu = -1, edellinenNapautus = double.NegativeInfinity;
        int ryhma = -1, koko;
        double vauhti = 0.15, vali = 0.034, pysahdys = 2;
        bool kynttilat, vigilia, seuraavaKynttilat, seuraavaVigilia;
        int ryhmia, vigilioita, yksin, napautuksia;
        readonly double[] sivu = new double[Vaeltajia], askel = new double[Vaeltajia];
        readonly OsanAsento[] asennot = new OsanAsento[Vaeltajia];
        readonly double[] skaalat = new double[Vaeltajia];

        public NidarosLiike(string id) : base(id)
        {
            kesto = Vali(3, 25, 0, 70);
            for (int k = 0; k < Vaeltajia; k++) asennot[k] = OsanAsento.Piilossa;
        }

        // ---- Testien ja lokin kyselyt ----

        public int Ryhmia => ryhmia;
        public int Vigilioita => vigilioita;
        public int Yksin => yksin;
        public int Napautuksia => napautuksia;
        public int Koko => vaihe == Vaihe.Tauko ? 0 : koko;
        public bool Kulkee => vaihe != Vaihe.Tauko;
        public bool Ruusu => ruusu >= 0;
        public bool Kynttilat => kynttilat && vaihe != Vaihe.Tauko;
        /// <summary>Vaeltajan k paikka mallin avaruudessa (x, y, z) ja skaala (0 = piilossa).</summary>
        public (double x, double y, double z, double s) Vaeltaja(int k)
        {
            var a = asennot[k];
            return (a.X + PivotX, a.Y + PivotY, a.Z + PivotZ, a.Skaala);
        }

        /// <summary>Uusi ryhmä reitin alkuun: koko, vauhti, väli, pysähdys ja vaeltajien poikkeamat siemenestä.</summary>
        void Aloita(bool kynttila, bool vigil, bool yo)
        {
            ryhma++; ryhmia++;
            koko = Arpa(ryhma, 72) < YksinTod ? 1 : 2 + Math.Min(2, (int)(Arpa(ryhma, 73) * 3));
            if (koko == 1) yksin++;
            vauhti = Vali(VauhtiMin, VauhtiMax, ryhma, 74);
            vali = Vali(ValiMin, ValiMax, ryhma, 75);
            pysahdys = Vali(PysahdysMin, PysahdysMax, ryhma, 76);
            for (int k = 0; k < Vaeltajia; k++)
            {
                sivu[k] = Vali(-SivuRaja, SivuRaja, ryhma * 8 + k, 78);
                askel[k] = Arpa(ryhma * 8 + k, 79) * 10;
            }
            vigilia = vigil || (!yo && Arpa(ryhma, 71) < Harvinainen);
            kynttilat = kynttila || vigilia;
            if (vigilia) vigilioita++;
            kynttilaTaso = 0;
            vaihe = Vaihe.Saapuu; aika = 0; johtaja = 0;
            kesto = SaapuPituus / vauhti + KiihdytysS * 0.5;
        }

        /// <summary>Kuljettu matka ajassa t, kun matka L kuljetaan vauhdilla v, kiihdytys a s ja hidastus b s (puolisuunnikas).</summary>
        static double Matka(double t, double L, double v, double a, double b)
        {
            double T = L / v + (a + b) * 0.5;
            if (t <= 0) return 0;
            if (t >= T) return L;
            if (a > 0 && t < a) return v * t * t / (2 * a);
            if (t <= T - b) return v * a * 0.5 + v * (t - a);
            double r = T - t;
            return L - v * r * r / (2 * b);
        }

        /// <summary>Vauhti suhteessa huippuvauhtiin (0–1) samassa profiilissa.</summary>
        static double Vauhtisuhde(double t, double L, double v, double a, double b)
        {
            double T = L / v + (a + b) * 0.5;
            if (t < 0) return a > 0 ? 0 : 1;
            if (t >= T) return b > 0 ? 0 : 1;
            if (a > 0 && t < a) return t / a;
            if (b > 0 && t > T - b) return (T - t) / b;
            return 1;
        }

        static double Kulma(double tx, double tz) => Math.Atan2(tx, tz) * 180 / Math.PI;

        static double KulmaLerp(double a, double b, double t)
        {
            double e = b - a;
            e -= Math.Floor((e + 180) / 360) * 360;
            return a + e * t;
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            // Napautus: valvojaiset heti (enintään kerran 20 s:ssa, myös yöllä).
            if (tapahtuma && T - edellinenNapautus >= NapautusValiS)
            {
                edellinenNapautus = T; napautuksia++;
                ruusu = 0;
                if (vaihe == Vaihe.Tauko) Aloita(true, true, yo);
                else if (vaihe != Vaihe.Kiertaa || johtaja < SaapuPituus + Kierroksia * KierrosPituus)
                {
                    if (!vigilia) vigilioita++;
                    kynttilat = true; vigilia = true;
                }
                else { seuraavaKynttilat = true; seuraavaVigilia = true; }   // ryhmä jo portissa: seuraava ryhmä heti perään
            }
            // Lähestyminen: tauolla seuraava ryhmä lähtee heti (yöllä kynttilöin).
            if (heraa && vaihe == Vaihe.Tauko) Aloita(yo, false, yo);
            if (d <= 0) return;

            aika += d;
            switch (vaihe)
            {
                case Vaihe.Tauko:
                    if (aika >= kesto && (!yo || seuraavaVigilia || seuraavaKynttilat))
                    {
                        bool k = seuraavaKynttilat, v = seuraavaVigilia;
                        seuraavaKynttilat = seuraavaVigilia = false;
                        Aloita(k, v, yo);
                    }
                    break;
                case Vaihe.Saapuu:
                    johtaja = Matka(aika, SaapuPituus, vauhti, 0, KiihdytysS);
                    if (aika >= kesto)
                    {
                        johtaja = SaapuPituus;
                        vaihe = Vaihe.Pysahtyy; aika = 0; kesto = pysahdys;
                        // Luonnollisissa valvojaisissa ruusuikkuna syttyy, kun ryhmä pysähtyy portin eteen.
                        if (vigilia && ruusu < 0) ruusu = 0;
                    }
                    break;
                case Vaihe.Pysahtyy:
                    johtaja = SaapuPituus;
                    if (aika >= kesto)
                    {
                        vaihe = Vaihe.Kiertaa; aika = 0;
                        kiertoMatka = Kierroksia * KierrosPituus + PoistuPituus + (koko - 1) * vali + KatoaaMatka;
                        kesto = kiertoMatka / vauhti + KiihdytysS * 0.5;
                    }
                    break;
                case Vaihe.Kiertaa:
                    johtaja = SaapuPituus + Matka(aika, kiertoMatka, vauhti, KiihdytysS, 0);
                    if (aika >= kesto)
                    {
                        vaihe = Vaihe.Tauko; aika = 0;
                        kesto = seuraavaVigilia || seuraavaKynttilat ? 0.3 : Vali(TaukoMin, TaukoMax, ryhma, 77);
                    }
                    break;
            }
            if (vaihe != Vaihe.Tauko) Liikkuu = true;

            if (ruusu >= 0)
            {
                ruusu += d; Liikkuu = true;
                if (ruusu > RuusuS) ruusu = -1;
            }
            double tavoite = kynttilat && vaihe != Vaihe.Tauko ? 1 : 0;
            if (kynttilaTaso != tavoite)
            {
                kynttilaTaso = tavoite > kynttilaTaso ? Math.Min(tavoite, kynttilaTaso + d / KynttilaS) : Math.Max(tavoite, kynttilaTaso - d / KynttilaS);
                Liikkuu = true;
            }
            Asennot();
        }

        /// <summary>Vaeltajien asennot tälle kehykselle (tallennetaan, Asento vain lukee).</summary>
        void Asennot()
        {
            double sr = vaihe == Vaihe.Saapuu ? Vauhtisuhde(aika, SaapuPituus, vauhti, 0, KiihdytysS)
                : vaihe == Vaihe.Kiertaa ? Vauhtisuhde(aika, kiertoMatka, vauhti, KiihdytysS, 0) : 0;
            double katse = vaihe == Vaihe.Pysahtyy ? Pehmea(aika / KatseS) * (1 - Pehmea((aika - (kesto - KatseS)) / KatseS)) : 0;
            double loppu = ReittiPituus;
            for (int k = 0; k < Vaeltajia; k++)
            {
                double m = johtaja - k * vali;
                if (vaihe == Vaihe.Tauko || k >= koko || m < 0 || m >= loppu) { asennot[k] = OsanAsento.Piilossa; skaalat[k] = 0; continue; }
                Reitti(m, out double x, out double z, out double tx, out double tz);
                // Sivupoikkeama (vasemmalle positiivinen); ei tien alussa eikä portissa.
                double poistu = m - SaapuPituus - Kierroksia * KierrosPituus;
                double w = Math.Min(1, m / 0.05) * (poistu > 0 ? Math.Max(0, 1 - poistu / PoistuPituus) : 1);
                x += -tz * sivu[k] * w; z += tx * sivu[k] * w;
                double kulma = Kulma(tx, tz);
                if (katse > 0) kulma = KulmaLerp(kulma, Kulma(PorttiX - x, PorttiZ - z), katse);
                double tt = T + askel[k];
                double y = Maa(m) + AskelNousu * Math.Abs(Math.Sin(Math.PI * tt / AskelJakso)) * sr;
                double keinu = KeinuAste * Math.Sin(2 * Math.PI * (tt * 0.93) / KeinuJakso) * sr;
                double s = Pehmea(m / IlmestyyMatka) * (1 - Pehmea((m - (loppu - KatoaaMatka)) / KatoaaMatka));
                skaalat[k] = s;
                if (s <= 0.001) { asennot[k] = OsanAsento.Piilossa; continue; }
                var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, kulma), OsanAsento.Kierto(0, 0, 1, keinu));
                asennot[k] = new OsanAsento { X = x - PivotX, Y = y, Z = z - PivotZ, Skaala = s }.Kierretty(q);
            }
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa == null) return OsanAsento.Lepo;
            if (osa.Length == 9 && osa[0] == 'v' && osa[1] == 'a')   // vaeltaja0–3
            {
                int k = osa[8] - '0';
                return k >= 0 && k < Vaeltajia ? asennot[k] : OsanAsento.Lepo;
            }
            if (osa.Length == 9 && osa[0] == 'k' && osa[1] == 'y')   // kynttila0–3
            {
                int k = osa[8] - '0';
                if (k < 0 || k >= Vaeltajia) return OsanAsento.Lepo;
                double t = Pehmea(kynttilaTaso);
                if (t <= 0.001 || asennot[k].Skaala <= 0.001) return OsanAsento.Piilossa;
                var a = asennot[k];
                a.Skaala *= t;
                return a;
            }
            if (osa == "ruusu")
            {
                if (ruusu < 0) return OsanAsento.Piilossa;
                double s = Pehmea(ruusu / RuusuSyttyyS) * (1 - Pehmea((ruusu - (RuusuS - RuusuSyttyyS)) / RuusuSyttyyS));
                return s <= 0.001 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
            }
            if (osa == "valot") return Valot();
            return OsanAsento.Lepo;   // kirkkomaa ja tuntemattomat
        }

        public override string Tila() =>
            $"vaeltajat {(vaihe == Vaihe.Tauko ? "tauolla" : vaihe == Vaihe.Saapuu ? "saapuvat" : vaihe == Vaihe.Pysahtyy ? "portin edessä" : "kiertävät")} " +
            $"({aika:F0}/{kesto:F0} s), ryhmä {ryhma} koko {koko}{(kynttilat && vaihe != Vaihe.Tauko ? ", kynttilät" : "")}" +
            (ruusu >= 0 ? $", ruusuikkuna {ruusu:F1} s" : "") + $", ryhmiä {ryhmia}, valvojaisia {vigilioita}";
    }
}
