// ERIKOISMALLIN LIIKE: OLAVINLINNA (omistaja hyväksyi elämänidean 27.9.2026, erä 6; speksi docs/raportit/erikoismallit/olavinlinna.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (ponttonisilta kääntyy ja valkoinen höyrylaiva lipuu Linnansalmen läpi), harvinainen
// tapahtuma (musta pässi, legenda keväältä 1656), reaktio pelaajaan (lähestyminen kääntää sillan ja tuo laivan, napautus = pässi)
// ja yövalot. Puhdas C#: reitin kaaripituustaulukko lasketaan kerran (staattinen konstruktori), kehyksessä ei allokaatioita
// (tila kentissä, Asento vertaa nimiä suoraan), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Olavinlinna: perusliike = ponttonisilta kääntyy Tallisaaren päänsä ympäri virran mukana etelään (5 s, 55–65° siemenestä),
    /// valkoinen höyrylaiva lipuu Linnansalmea mallin etelälaidalta pohjoislaidalle tai päinvastoin (suunta siemenestä, 16 s ±12 %,
    /// ilmestyy ja katoaa väylän päissä 1 s:ssa, kulkulinja ±0,006, koko 0,95–1,05, runko keinuu ±1°) savua tupruttaen ja vanaa
    /// jättäen, ja kun sen runko on ohittanut sillan kääntöalueen, silta kääntyy takaisin (5 s). Tauko 55–150 s (yöllä 90–200 s).
    /// Harvinainen (noin 1/10 ohituksista päivällä, oma arpakanava): musta pässi — tumma ukkospilvi liukuu lännestä linnan
    /// pohjoisosan ylle (ei salamaa eikä välähdystä), 2–3 piirittäjien soutuvenettä ilmestyy Paksun bastionin edustalle ja soutaa
    /// hitaasti linnaa kohti, pässi kiipeää bastionin tykkitasanteelle, nousee takajaloilleen ja heiluttaa sarviaan, veneet
    /// kääntyvät ja soutavat kiireesti pois salmen reunoille, joissa ne häipyvät, ja pässi painuu rintavarustuksen taakse ja
    /// pilvi liukuu itään (8,2 s). Legenda, ei fakta; hukkumisia ei näytetä.
    /// Reaktio: lähestyminen aloittaa jakson heti (silta kääntyy ja laiva tulee), jos se ei jo ole käynnissä. Napautus käynnistää
    /// pässin heti (enintään kerran 20 s:ssa, myös yöllä).
    /// Yö: tornien aukot ja ikkunat, päälinnan ikkunat ja esilinnan oopperavalo hehkuvat (Valot(), 1,5 s), laivan ikkunat
    /// seuraavat laivaa. Pässi ei tule yöllä itsestään.
    /// Levossa (silta kiinni, salmi tyhjä, savu hälvennyt ja pässi poissa, valo vakaa) Liikkuu = false, joten elävä kerros
    /// piirtää 0 kehystä.
    /// </summary>
    public sealed class OlavinlinnaLiike : ErikoisAnimaatio
    {
        // ---- Paikat (samat kuin Symbolimallit.Olv*-vakiot: muuta molemmat) ----

        /// <summary>Sillan kääntöpää (pivot, Tallisaari) ja linnan pää.</summary>
        public const double SiltaTX = -0.43, SiltaTZ = 0.10, SiltaCX = -0.285, SiltaCZ = -0.035;
        /// <summary>Laivan pivot (OlvLaivaP), piipun suu laivan avaruudessa (OlvPiippu), rungon puolipituus ja puolileveys.</summary>
        public const double LaivaPX = -0.39, LaivaPZ = -0.12, PiippuY = 0.034, PiippuZ = -0.004, PuoliPituus = 0.05, PuoliLeveys = 0.0112;
        /// <summary>Linnansalmen väylä kuutiollisena Bézier-käyränä etelästä pohjoiseen (mallin yksiköissä).</summary>
        static readonly double[] BX = { -0.43, -0.385, -0.365, -0.36 }, BZ = { -0.245, -0.10, 0.10, 0.25 };
        /// <summary>Pässin pivot takajaloissa (OlvPassiP) ja niska pässin avaruudessa (OlvNiska).</summary>
        public const double PassiPX = 0.302, PassiPY = 0.071, PassiPZ = -0.012, NiskaY = 0.024, NiskaZ = 0.036;
        /// <summary>Piirittäjien veneiden pivotit (OlvVeneP) sekä lähtö- ja pakopaikat pivotin suhteen.</summary>
        public static readonly double[] VeneAX = { 0.30, 0.405, 0.225 }, VeneAZ = { -0.122, -0.108, -0.152 };
        static readonly double[] VeneSX = { -0.004, 0.004, -0.004 }, VeneSZ = { -0.02, -0.012, -0.014 };
        static readonly double[] VeneFX = { -0.055, 0.057, -0.045 }, VeneFZ = { -0.02, 0.098, -0.04 };

        // ---- Ajat ja vaihtelu (speksi kohta 6) ----

        public const double AvausS = 5, AukiMin = 55, AukiMax = 65, LaivaViive = 2.0, LaivaS = 16, LaivaVaihtelu = 0.12, IlmestyyS = 1.0,
            Ramppi = 1.2, Linja = 0.006, KeinuAste = 1.0, KeinuS = 3.4;
        public const double TaukoMin = 55, TaukoMax = 150, YoTaukoMin = 90, YoTaukoMax = 200, EkaMin = 3, EkaMax = 20;
        public const double Harvinainen = 0.1, NapautusValiS = 20;
        /// <summary>Savu: tuprun elinkaari, porrastus, nousu ja tuuli (mallin yksikköä sekunnissa).</summary>
        public const double SavuS = 2.4, SavuPorras = 0.8, SavuNousu = 0.03, TuuliX = -0.003, TuuliZ = -0.002;
        /// <summary>Pässi: kokonaiskesto, pilvi sisään, veneet näkyviin, pässi nousee, seisoo takajaloillaan, veneet kääntyvät ja
        /// pakenevat, pässi painuu ja pilvi lähtee (s).</summary>
        public const double PassiS = 8.2, PilviSisaan = 1.6, VeneetAlku = 0.6, VeneetNakyvat = 1.0, NousuAlku = 1.4, NousuS = 1.0,
            PystyAlku = 2.6, PystyLoppu = 5.8, PystyAste = 68, KaannosAlku = 3.2, KaannosS = 0.7, PakoLoppu = 7.6, PainuuAlku = 6.0,
            PainuuS = 1.0, PilviLahtee = 6.0, PilviLahteeS = 2.2, Piilo = 0.034, SarviAste = 30, SarviHz = 1.5;
        /// <summary>Sillan kääntöalueen varamarginaali (säde ja kulma).</summary>
        const double SektoriVara = 0.012, SektoriAste = 6;

        // ---- Esilaskettu väylä ----

        const int Naytteita = 64;
        static readonly double[] kaari = new double[Naytteita + 1];
        /// <summary>Väylän pituus (mallin yksiköissä).</summary>
        public static readonly double Pituus;
        static readonly double SiltaL, SiltaSuunta;

        static OlavinlinnaLiike()
        {
            double s = 0, px = BX[0], pz = BZ[0];
            for (int i = 1; i <= Naytteita; i++)
            {
                Bez(i / (double)Naytteita, out double x, out double z, out _, out _);
                s += Math.Sqrt((x - px) * (x - px) + (z - pz) * (z - pz));
                kaari[i] = s; px = x; pz = z;
            }
            Pituus = s;
            SiltaL = Math.Sqrt((SiltaCX - SiltaTX) * (SiltaCX - SiltaTX) + (SiltaCZ - SiltaTZ) * (SiltaCZ - SiltaTZ));
            SiltaSuunta = Math.Atan2(SiltaCX - SiltaTX, SiltaCZ - SiltaTZ) * 180 / Math.PI;
        }

        /// <summary>Bézier-käyrän piste ja derivaatta parametrilla t.</summary>
        static void Bez(double t, out double x, out double z, out double dx, out double dz)
        {
            double u = 1 - t;
            x = u * u * u * BX[0] + 3 * u * u * t * BX[1] + 3 * u * t * t * BX[2] + t * t * t * BX[3];
            z = u * u * u * BZ[0] + 3 * u * u * t * BZ[1] + 3 * u * t * t * BZ[2] + t * t * t * BZ[3];
            dx = 3 * u * u * (BX[1] - BX[0]) + 6 * u * t * (BX[2] - BX[1]) + 3 * t * t * (BX[3] - BX[2]);
            dz = 3 * u * u * (BZ[1] - BZ[0]) + 6 * u * t * (BZ[2] - BZ[1]) + 3 * t * t * (BZ[3] - BZ[2]);
        }

        /// <summary>Kaaripituus → käyrän parametri (puolitushaku taulukosta, lineaarinen välillä).</summary>
        static double TKaaresta(double s)
        {
            if (s <= 0) return 0;
            if (s >= Pituus) return 1;
            int a = 0, b = Naytteita;
            while (b - a > 1) { int m = (a + b) >> 1; if (kaari[m] <= s) a = m; else b = m; }
            double w = (s - kaari[a]) / Math.Max(1e-12, kaari[b] - kaari[a]);
            return (a + w) / Naytteita;
        }

        // ---- Tila ----

        double tauko, o = -1;
        int kierroksia, ohituksia;
        // Jakson vaihtelu: suunta (+1 pohjoiseen), kesto, kulkulinja, koko ja sillan kulma.
        int suunta = 1;
        double kesto = LaivaS, linja, koko = 1, auki = 60, keinuVaihe;
        // Silta: kulma 0–auki, sulkeutumisen alku (−1 = ei vielä), laiva on käynyt kääntöalueella.
        double siltaKulma, sulkeutuu = -1, sulkeutuuKulma;
        bool kavi;
        // Laiva: paikka, suunta ψ (° kompassisuunta, keula +Z), skaala, nopeus (0–1) ja keinunta.
        double lx = LaivaPX, lz = LaivaPZ, psi, lSkaala, lNopeus, keinu;
        bool laivaMatkalla;
        // Savu: kolme tuprua (ikä, lähtöpaikka, koko, kierto) ja lähtökello.
        readonly double[] savuIka = { -1, -1, -1 }, savuX = new double[3], savuY = new double[3], savuZ = new double[3], savuKoko = new double[3], savuKierto = new double[3];
        double savuKello;
        int tuprut;
        // Pässi: aika (−1 = ei käynnissä), kerrat, edellinen napautus, veneiden määrä, pässin suunta ja veneiden hajonta.
        double passi = -1, edellinenNapautus = double.NegativeInfinity, passiSuunta = 115;
        int passeja, veneita = 3;
        readonly double[] veneDX = new double[3], veneDZ = new double[3], veneViive = new double[3];

        public OlavinlinnaLiike(string id) : base(id)
        {
            tauko = Vali(EkaMin, EkaMax, 0, 120);
            keinuVaihe = Vali(0, Math.PI * 2, 0, 121);
        }

        // ---- Testien ja lokin ominaisuudet ----

        public bool Kaynnissa => o >= 0;
        public bool Passi => passi >= 0;
        public int Ohituksia => ohituksia;
        public int Passeja => passeja;
        public int Kierroksia => kierroksia;
        public double SiltaKulma => siltaKulma;
        /// <summary>Laivan paikka, suunta (°), skaala (0 = poissa).</summary>
        public (double x, double z, double psi, double skaala) Laiva => (lx, lz, psi, lSkaala);
        /// <summary>Veneen k paikka, suunta ja skaala (testeihin).</summary>
        public (double x, double z, double psi, double skaala) Vene(int k) { VeneTila(k, out double x, out double z, out double y, out double s); return (x, z, y, s); }
        /// <summary>Savutuprun k maailmanpaikka ja skaala (testeihin).</summary>
        public (double x, double y, double z, double skaala) Savu(int k) { var a = SavuAsento(k); return (a.X + LaivaPX, a.Y + PiippuY, a.Z + LaivaPZ + PiippuZ, a.Skaala); }

        // ---- Jakso: silta ja laiva ----

        void AloitaJakso()
        {
            kierroksia++;
            o = 0;
            suunta = Arpa(kierroksia, 122) < 0.5 ? 1 : -1;
            kesto = LaivaS * (1 + LaivaVaihtelu * (2 * Arpa(kierroksia, 123) - 1));
            linja = Vali(-Linja, Linja, kierroksia, 124);
            koko = Vali(0.95, 1.05, kierroksia, 125);
            auki = Vali(AukiMin, AukiMax, kierroksia, 126);
            sulkeutuu = -1; kavi = false; laivaMatkalla = true;
        }

        /// <summary>Tasainen matka 0–1: pehmeä kiihdytys ja jarrutus r sekuntia, välissä vakionopeus; v = nopeus suhteessa huippuun.</summary>
        static double Tasainen(double t, double kesto, double r, out double v)
        {
            t = Math.Max(0, Math.Min(kesto, t));
            double vh = 1 / (kesto - r);
            if (t < r) { v = t / r; return vh * t * t / (2 * r); }
            if (t > kesto - r) { v = (kesto - t) / r; return 1 - vh * (kesto - t) * (kesto - t) / (2 * r); }
            v = 1; return vh * (t - r * 0.5);
        }

        /// <summary>Onko piste sillan kääntöalueella (sektori kääntöpään ympärillä suljetusta avoimeen asentoon, varoin)?</summary>
        bool Sektorissa(double x, double z)
        {
            double dx = x - SiltaTX, dz = z - SiltaTZ;
            if (dx * dx + dz * dz > (SiltaL + SektoriVara) * (SiltaL + SektoriVara)) return false;
            double b = Math.Atan2(dx, dz) * 180 / Math.PI - SiltaSuunta;
            b -= 360 * Math.Floor((b + 180) / 360);
            return b >= -SektoriAste && b <= AukiMax + SektoriAste;
        }

        /// <summary>Onko laivan runko (keula, perä ja kyljet) kääntöalueella?</summary>
        bool RunkoSektorissa()
        {
            if (lSkaala <= 0.001) return false;
            double a = psi * Math.PI / 180, hx = Math.Sin(a), hz = Math.Cos(a);
            for (int i = 0; i < 6; i++)
            {
                double pz = i < 2 ? (i == 0 ? PuoliPituus : -PuoliPituus) : (i < 4 ? 0.016 : -0.036);
                double px = i < 2 ? 0 : (i % 2 == 0 ? PuoliLeveys : -PuoliLeveys);
                double wx = lx + (hx * pz + hz * px) * lSkaala, wz = lz + (hz * pz - hx * px) * lSkaala;
                if (Sektorissa(wx, wz)) return true;
            }
            return false;
        }

        bool EtenJakso(double d, bool yo)
        {
            if (o < 0) return false;
            o += d;
            // Laiva väylällä.
            double tl = o - LaivaViive;
            if (laivaMatkalla && tl >= 0)
            {
                double p = Tasainen(tl, kesto, Ramppi, out double v);
                double s = (suunta > 0 ? p : 1 - p) * Pituus;
                double t = TKaaresta(s);
                Bez(t, out double x, out double z, out double dx, out double dz);
                lx = x + linja; lz = z;
                psi = Math.Atan2(dx * suunta, dz * suunta) * 180 / Math.PI;
                lNopeus = v;
                lSkaala = koko * Pehmea(tl / IlmestyyS) * (1 - Pehmea((tl - (kesto - IlmestyyS)) / IlmestyyS));
                keinu = KeinuAste * Math.Sin(2 * Math.PI * T / KeinuS + keinuVaihe);
                if (tl >= kesto) { laivaMatkalla = false; lSkaala = 0; lNopeus = 0; ohituksia++; }
            }
            else if (!laivaMatkalla) { lSkaala = 0; lNopeus = 0; }
            // Silta: aukeaa heti, sulkeutuu kun runko on ohittanut kääntöalueen (tai laiva on poissa).
            bool sektorissa = RunkoSektorissa();
            if (sektorissa) kavi = true;
            if (sulkeutuu < 0 && o >= AvausS && ((kavi && !sektorissa) || !laivaMatkalla)) { sulkeutuu = o; sulkeutuuKulma = siltaKulma; }
            if (sulkeutuu < 0) siltaKulma = auki * Pehmea(o / AvausS);
            else siltaKulma = sulkeutuuKulma * (1 - Pehmea((o - sulkeutuu) / AvausS));
            // Jakso päättyy, kun laiva on poissa ja silta kiinni.
            if (!laivaMatkalla && sulkeutuu >= 0 && o - sulkeutuu >= AvausS)
            {
                o = -1; siltaKulma = 0;
                tauko = yo ? Vali(YoTaukoMin, YoTaukoMax, kierroksia, 127) : Vali(TaukoMin, TaukoMax, kierroksia, 128);
                if (!yo && passi < 0 && Arpa(kierroksia, 129) < Harvinainen) AloitaPassi();
            }
            return true;
        }

        // ---- Savu ----

        bool EtenSavu(double d)
        {
            bool liikkuu = false;
            // Uusi tupru piipusta 0,8 s:n välein, kun laiva näkyy kunnolla ja liikkuu.
            if (laivaMatkalla && lSkaala > 0.6 * koko && lNopeus > 0.2)
            {
                savuKello += d;
                if (savuKello >= SavuPorras)
                {
                    savuKello -= SavuPorras;
                    int k = tuprut % 3;
                    tuprut++;
                    double a = psi * Math.PI / 180;
                    savuX[k] = lx + Math.Sin(a) * PiippuZ * lSkaala;
                    savuZ[k] = lz + Math.Cos(a) * PiippuZ * lSkaala;
                    savuY[k] = PiippuY * lSkaala;
                    savuKoko[k] = lSkaala * Vali(0.85, 1.15, tuprut, 130);
                    savuKierto[k] = Vali(0, 360, tuprut, 131);
                    savuIka[k] = 0;
                }
            }
            else savuKello = SavuPorras * 0.9;
            for (int k = 0; k < 3; k++)
            {
                if (savuIka[k] < 0) continue;
                savuIka[k] += d; liikkuu = true;
                if (savuIka[k] >= SavuS) savuIka[k] = -1;
            }
            return liikkuu;
        }

        OsanAsento SavuAsento(int k)
        {
            double a = savuIka[k];
            if (a < 0) return OsanAsento.Piilossa;
            double u = a / SavuS;
            double s = savuKoko[k] * (0.35 + 0.65 * Pehmea(a / 0.7)) * (1 - Pehmea((a - 1.3) / (SavuS - 1.3)));
            if (s <= 0.02) return OsanAsento.Piilossa;
            double y = savuY[k] - PiippuY + SavuNousu * (1 - (1 - u) * (1 - u));
            double x = savuX[k] + TuuliX * a - LaivaPX, z = savuZ[k] + TuuliZ * a - (LaivaPZ + PiippuZ);
            return new OsanAsento { X = x, Y = y, Z = z, Skaala = s }.Kierretty(OsanAsento.Kierto(0, 1, 0, savuKierto[k] + 40 * a));
        }

        // ---- Musta pässi ----

        void AloitaPassi()
        {
            passi = 0; passeja++;
            veneita = Arpa(passeja, 132) < 0.5 ? 2 : 3;
            passiSuunta = Vali(105, 125, passeja, 133);
            for (int k = 0; k < 3; k++)
            {
                veneDX[k] = Vali(-0.004, 0.004, passeja * 3 + k, 134);
                veneDZ[k] = Vali(-0.003, 0.003, passeja * 3 + k, 135);
                veneViive[k] = Vali(0, 0.35, passeja * 3 + k, 136);
            }
        }

        /// <summary>Soutumatka 0–1: pehmeä alku ja loppu, välissä vetojen tahdissa nytkähtelevä eteneminen.</summary>
        static double Soutu(double u, double vetoja)
        {
            u = Math.Max(0, Math.Min(1, u));
            double p = Pehmea(u);
            return Math.Max(0, Math.Min(1, p + 0.015 * Math.Sin(2 * Math.PI * u * vetoja) * Math.Sin(Math.PI * u)));
        }

        /// <summary>Kulma a → b osuudella t lyhintä tietä (asteina).</summary>
        static double Kulma(double a, double b, double t)
        {
            double e = b - a;
            e -= 360 * Math.Floor((e + 180) / 360);
            return a + e * Math.Max(0, Math.Min(1, t));
        }

        /// <summary>Veneen k tila pässin aikana: maailmanpaikka (x, z), suunta (°) ja skaala.</summary>
        void VeneTila(int k, out double x, out double z, out double yaw, out double s)
        {
            x = VeneAX[k]; z = VeneAZ[k]; yaw = 0; s = 0;
            if (passi < 0 || k >= veneita) return;
            double t = passi - veneViive[k];
            double ax = VeneAX[k] + veneDX[k], az = VeneAZ[k] + veneDZ[k];
            double sx = ax + VeneSX[k], sz = az + VeneSZ[k], fx = ax + VeneFX[k], fz = az + VeneFZ[k];
            double meno = Math.Atan2(ax - sx, az - sz) * 180 / Math.PI, pako = Math.Atan2(fx - ax, fz - az) * 180 / Math.PI;
            s = Pehmea((t - VeneetAlku) / VeneetNakyvat) * (1 - Pehmea((t - (PakoLoppu - 1.0)) / 1.0));
            double kaannos = KaannosAlku + 0.15 * k;
            if (t < kaannos)
            {
                double u = Soutu((t - VeneetAlku) / (kaannos - VeneetAlku), 3);
                x = sx + (ax - sx) * u; z = sz + (az - sz) * u; yaw = meno;
            }
            else if (t < kaannos + KaannosS)
            {
                x = ax; z = az; yaw = Kulma(meno, pako, Pehmea((t - kaannos) / KaannosS));
            }
            else
            {
                double u = Soutu((t - kaannos - KaannosS) / (PakoLoppu - kaannos - KaannosS), 5);
                x = ax + (fx - ax) * u; z = az + (fz - az) * u; yaw = pako;
            }
        }

        /// <summary>Pässin vartalo: nousu (y), takajaloille nousun kulma (°) ja näkyvyys.</summary>
        void PassiTila(out double y, out double kulma, out bool nakyy)
        {
            y = -Piilo; kulma = 0; nakyy = false;
            if (passi < NousuAlku || passi > PainuuAlku + PainuuS) return;
            nakyy = true;
            double nousu = Pehmea((passi - NousuAlku) / NousuS);
            double hyppy = passi > NousuAlku + 0.55 && passi < NousuAlku + 0.95 ? 0.007 * Math.Sin(Math.PI * (passi - NousuAlku - 0.55) / 0.4) : 0;
            double painuu = Pehmea((passi - PainuuAlku) / PainuuS);
            y = -Piilo * (1 - nousu) + hyppy - Piilo * painuu;
            kulma = PystyAste * Pehmea((passi - PystyAlku) / 0.5) * (1 - Pehmea((passi - (PystyLoppu - 0.5)) / 0.5));
        }

        /// <summary>Kvaternion kierto vektorille (w, x, y, z).</summary>
        static void Kierra((double w, double x, double y, double z) q, double vx, double vy, double vz, out double rx, out double ry, out double rz)
        {
            double tx = 2 * (q.y * vz - q.z * vy), ty = 2 * (q.z * vx - q.x * vz), tz = 2 * (q.x * vy - q.y * vx);
            rx = vx + q.w * tx + (q.y * tz - q.z * ty);
            ry = vy + q.w * ty + (q.z * tx - q.x * tz);
            rz = vz + q.w * tz + (q.x * ty - q.y * tx);
        }

        (double w, double x, double y, double z) PassiKierto(double kulma) =>
            OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, passiSuunta), OsanAsento.Kierto(1, 0, 0, -kulma));

        // ---- Askel ----

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && passi < 0 && T - edellinenNapautus >= NapautusValiS) { edellinenNapautus = T; AloitaPassi(); }
            bool liikkuu = false;
            if (o < 0)
            {
                if (heraa) tauko = 0;
                tauko -= d;
                if (tauko <= 0) AloitaJakso();
            }
            liikkuu |= EtenJakso(d, yo);
            liikkuu |= EtenSavu(d);
            if (passi >= 0)
            {
                passi += d; liikkuu = true;
                if (passi > PassiS) passi = -1;
            }
            if (liikkuu && d > 0) Liikkuu = true;
        }

        // ---- Asennot ----

        static (double w, double x, double y, double z) Yaw(double aste) => OsanAsento.Kierto(0, 1, 0, aste);

        OsanAsento LaivaAsento(double skaala, bool keinuu)
        {
            if (skaala <= 0.001) return OsanAsento.Piilossa;
            var q = keinuu ? OsanAsento.Tulo(Yaw(psi), OsanAsento.Kierto(0, 0, 1, keinu)) : Yaw(psi);
            return new OsanAsento { X = lx - LaivaPX, Z = lz - LaivaPZ, Skaala = skaala }.Kierretty(q);
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "silta": return new OsanAsento { Skaala = 1 }.Kierretty(Yaw(siltaKulma));
                case "laiva": return LaivaAsento(lSkaala, true);
                case "laivavalot": return Valo <= 0.001 ? OsanAsento.Piilossa : LaivaAsento(lSkaala * Pehmea(Valo), true);
                case "vana":
                {
                    double s = lSkaala * lNopeus;
                    return s <= 0.03 ? OsanAsento.Piilossa : LaivaAsento(s, false);
                }
                case "savu0": return SavuAsento(0);
                case "savu1": return SavuAsento(1);
                case "savu2": return SavuAsento(2);
                case "pilvi":
                {
                    if (passi < 0) return OsanAsento.Piilossa;
                    double sisaan = Pehmea(passi / PilviSisaan), ulos = Pehmea((passi - PilviLahtee) / PilviLahteeS);
                    double s = (0.35 + 0.65 * sisaan) * (1 - ulos) * (1 + 0.03 * Math.Sin(2 * Math.PI * 0.6 * passi));
                    if (s <= 0.02) return OsanAsento.Piilossa;
                    return new OsanAsento { Qw = 1, X = -0.3 * (1 - sisaan) + 0.22 * ulos, Y = 0.004 * Math.Sin(2 * Math.PI * 0.35 * passi), Skaala = s };
                }
                case "passi":
                {
                    PassiTila(out double y, out double kulma, out bool nakyy);
                    if (!nakyy) return OsanAsento.Piilossa;
                    return new OsanAsento { Y = y, Skaala = 1 }.Kierretty(PassiKierto(kulma));
                }
                case "passinpaa":
                {
                    PassiTila(out double y, out double kulma, out bool nakyy);
                    if (!nakyy) return OsanAsento.Piilossa;
                    var qb = PassiKierto(kulma);
                    Kierra(qb, 0, NiskaY, NiskaZ, out double nx, out double ny, out double nz);
                    // Sarvien heilutus takajaloilla seistessä: pää kääntyy sivulta sivulle ja nyökkää.
                    double voima = Pehmea((passi - (PystyAlku + 0.3)) / 0.4) * (1 - Pehmea((passi - (PystyLoppu - 0.8)) / 0.4));
                    double heilu = SarviAste * voima * Math.Sin(2 * Math.PI * SarviHz * (passi - PystyAlku));
                    double nyokkays = 12 * voima * Math.Sin(4 * Math.PI * SarviHz * (passi - PystyAlku));
                    var qh = OsanAsento.Tulo(qb, OsanAsento.Tulo(Yaw(heilu), OsanAsento.Kierto(1, 0, 0, nyokkays)));
                    return new OsanAsento { X = nx, Y = y + ny - NiskaY, Z = nz - NiskaZ, Skaala = 1 }.Kierretty(qh);
                }
                case "vene0": case "vene1": case "vene2":
                {
                    int k = osa[4] - '0';
                    VeneTila(k, out double x, out double z, out double yaw, out double s);
                    if (s <= 0.02) return OsanAsento.Piilossa;
                    double kk = passi - veneViive[k];
                    double keinuVene = 2.5 * Math.Sin(2 * Math.PI * 1.1 * kk + k);
                    return new OsanAsento { X = x - VeneAX[k], Z = z - VeneAZ[k], Skaala = s }.Kierretty(OsanAsento.Tulo(Yaw(yaw), OsanAsento.Kierto(0, 0, 1, keinuVene)));
                }
                case "valot0": case "valot1": case "valot2": case "valot3": case "valot4":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            (o >= 0 ? $"jakso {o:F1} s, silta {siltaKulma:F0}°, laiva {(suunta > 0 ? "pohjoiseen" : "etelään")} ({lx:F3}, {lz:F3}) ψ {psi:F0}° skaala {lSkaala:F2}"
                    : $"tauko {tauko:F0} s") + $", ohituksia {ohituksia}, pässejä {passeja}" + (passi >= 0 ? $", pässi {passi:F1} s" : "");
    }
}
