// ERIKOISMALLIN LIIKE: GEYSIR JA STROKKUR (omistaja hyväksyi elämänidean 27.9.2026, erä 6; speksi docs/raportit/erikoismallit/geysir.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (Strokkurin kupu, patsas, höyry ja turistit), harvinainen tapahtuma (Suuri Geysir
// herää), reaktio pelaajaan (lähestyminen aloittaa kuvun, napautus herättää Suuren Geysirin) ja yövalot. Puhdas C#, ei allokaatioita
// kehyksessä (tila kentissä ja taulukoissa, Asento vertaa merkkejä ja nimiä suoraan), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Geysir ja Strokkur: perusliike = Strokkurin purkaus. Allas pullistuu turkoosiksi kuvuksi (0,9–1,5 s), kupu puhkeaa ja
    /// valkoinen patsas nousee 0,6 s:ssa (korkeus 0,85–1,15 × 0,40, joskus 1,3 ×), seisoo ja huojuu 0,7–1,3 s kallistuen tuulen
    /// alle ja putoaa 1,0 s:ssa, jolloin vaahtorengas leviää altaalle. Kolme höyrymöykkyä ajautuu tuulen alle (suunta
    /// itä–pohjoinen–länsi-sektorista, 0,10–0,16) ja hälvenee noin 6 s:ssa. Vesi valuu kuiluun (1,2 s) ja allas täyttyy (3,4 s).
    /// Noin joka viides purkaus on kaksoispurkaus: toinen kupu alkaa 3–4 s ensimmäisen puhkeamisen jälkeen, ja toisella suihkulla
    /// on omat höyrymöykyt. Turistit perääntyvät köyden takana puhkeamisen jälkeen (0,004–0,016 säteen suuntaan, omat viiveet,
    /// noin joka kuudes ei peräänny) ja palaavat, kun patsas on pudonnut. Tauko 18–45 s (kaksoispurkauksen jälkeen 35–70 s).
    /// Harvinainen (noin 1/10 purkauksista, oma arpakanava, ja napautus): Suuri Geysir herää. Allas kuohuu 1,8 s, patsas nousee
    /// 0,80:een, seisoo 3,5 s ja putoaa, kolme isoa höyrymöykkyä ajautuu tuulen alle ja turistit kääntyvät katsomaan (noin 9,6 s).
    /// Reaktio: lähestyminen aloittaa kuvun heti, jos Strokkur on tauolla. Napautus (enintään kerran 20 s:ssa, myös yöllä) herättää
    /// Suuren Geysirin heti. Yö: Strokkur purkautuu yölläkin; Geysir-keskuksen ja hotellin ikkunat hehkuvat (Valot(), 1,5 s).
    /// Tauolla (kaikki osat levossa ja valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class GeysirLiike : ErikoisAnimaatio
    {
        // ---- Paikat (samat kuin Symbolimallit.Gys*-vakiot: muuta molemmat) ----

        /// <summary>Strokkurin ja Suuren Geysirin altaiden keskipisteet (GysSx/GysSz ja GysGx/GysGz).</summary>
        public const double SX = -0.05, SZ = -0.08, GX = 0.15, GZ = 0.16;
        /// <summary>Höyrypivotien korkeus vesirajan yllä (GysHoyryY ja GysSuuriHoyryY).</summary>
        public const double HoyryY = 0.26, SuuriHoyryY = 0.45;
        public const int Turisteja = 9;
        /// <summary>Turistien kulmat (astetta +X:stä vastapäivään ylhäältä) ja etäisyydet Strokkurin keskeltä (GysTuristiKulma ja
        /// GysTuristiSade).</summary>
        public static readonly double[] TuristiKulma = { 138, 160, 187, 211, 236, 262, 291, 318, 347 };
        public static readonly double[] TuristiSade = { 0.131, 0.137, 0.133, 0.138, 0.132, 0.136, 0.133, 0.137, 0.131 };

        // ---- Strokkurin purkaus (s) ----

        public const double KupuMinS = 0.9, KupuMaxS = 1.5, Kupu2MinS = 0.6, Kupu2MaxS = 1.0, PuhkeaaS = 0.12, NousuS = 0.6,
            SeisooMinS = 0.7, SeisooMaxS = 1.3, PutoaaS = 1.0, RoiskeS = 1.6;
        /// <summary>Vesi valuu kuiluun (viive patsaan pudottua, kesto) ja allas täyttyy; altaan pienin skaala.</summary>
        public const double ValuuViive = 0.5, ValuuS = 1.2, TayttyyS = 3.4, Pohja = 0.72;
        public const double HoyryElinS = 6.0, HoyryVali = 0.3;
        /// <summary>Höyrymöykyn syntypaikka tuulen alapuolella patsaan akselista (kruunun reunalla).</summary>
        public const double HoyryLahto = 0.025;
        public const double KaksoisTod = 0.2, KaksoisMinS = 3.0, KaksoisMaxS = 4.0, KorkeaTod = 0.12, PatsasKorkeus = 0.40;
        public const double TaukoMinS = 18, TaukoMaxS = 45, KaksoisTaukoMinS = 35, KaksoisTaukoMaxS = 70, EkaMinS = 3, EkaMaxS = 15;
        /// <summary>Tuulen suunta (astetta +X:stä vastapäivään: itä 0, pohjoinen 90, länsi 180; ei koskaan kameraa kohti etelään,
        /// joten höyry ei peitä patsasta eikä turisteja) ja höyryn ajautuma.</summary>
        public const double TuuliMin = 0, TuuliMax = 180, AjoMin = 0.10, AjoMax = 0.16, KallistusMin = 3, KallistusMax = 6;
        /// <summary>Höyrymöykkyjen säteet (Symbolimallit.GysHoyrySade ja GysSuuriHoyrySade) ajautuman rajaukseen.</summary>
        public static readonly double[] HoyrySade = { 0.050, 0.044, 0.056, 0.046, 0.052 }, SuuriHoyrySade = { 0.066, 0.072, 0.062 };
        /// <summary>Saarekkeen reunan säde 32 suunnassa (11,25°:n välein itään 0 alkaen, vastapäivään; Symbolimallit.GysReunaSade):
        /// höyryn ajautuma rajataan niin, että möykky säteineen pysyy mallin jalanjäljellä (ei koskaan kartan päällä).</summary>
        public static readonly double[] Reuna =
        {
            0.4949, 0.4996, 0.4931, 0.4807, 0.4666, 0.4438, 0.4139, 0.3919, 0.3874, 0.3990, 0.4237, 0.4639, 0.5071, 0.5242, 0.5064, 0.4808,
            0.4722, 0.4797, 0.4842, 0.4805, 0.4682, 0.4448, 0.4182, 0.4036, 0.4047, 0.4120, 0.4196, 0.4376, 0.4680, 0.4896, 0.4923, 0.4909,
        };
        public const double ReunaVara = 0.012;
        public const double Harvinainen = 0.1, NapautusValiS = 20;

        // ---- Turistit ----

        public const double AskelMin = 0.004, AskelMax = 0.016, RohkeaTod = 0.16, RohkeaAskel = 0.0015, PerayViiveMax = 0.4, PerayS = 0.6,
            PaluuViive = 0.9, PaluuViiveMax = 1.5, PaluuS = 1.5, AskelNousu = 0.0008, AskelJakso = 0.32;

        // ---- Suuri Geysir (s tapahtuman alusta) ----

        public const double GKuohuS = 0.6, GNousuAlku = 1.8, GNousuS = 1.0, GSeisooS = 3.5, GPutoaaS = 1.5, GKuohuLoppu = 7.2, GKuohuLoppuS = 1.0,
            GLoppuS = 9.6, GHoyryAlku = 2.0, GHoyryVali = 0.45, GHoyryElinS = 6.5, GOdotusS = 1.2, SuuriKorkeus = 0.80;
        public const double KaantoS = 0.8, KaantoViiveMin = 0.4, KaantoViiveMax = 1.0, KaantoTakaisin = 8.0, TakaisinViiveMax = 0.5;
        /// <summary>Turistit nojaavat taaksepäin katsoessaan korkeaa patsasta (astetta, siemenestä turistikohtaisesti).</summary>
        public const double NojaMin = 5, NojaMax = 9;

        // ---- Tila ----

        double e = -1, tauko, loppu;
        int purkaus = -1, purkauksia, kaksoisia;
        bool kaksois;
        double kupu0, kupu1, puhk0, puhk1, ylos0, ylos1, putoaa0, putoaa1, korkeus0 = 1, korkeus1 = 1, valuu, tayttyy;
        double tuuliX = 1, tuuliZ, ajo = 0.12, kallistus = 4;
        readonly double[] askel = new double[Turisteja], perayViive = new double[Turisteja], paluuViive = new double[Turisteja];
        readonly double[] hoyrySynty = new double[5], hoyryElin = new double[5], hoyryAjo = new double[5], hoyryKoko = new double[5], hoyryY0 = new double[5];

        double g = -1, gOdota = -1, gKorkeus = 1, gTuuliX = 1, gTuuliZ, gAjo = 0.17, edellinenNapautus = double.NegativeInfinity;
        int suuria, luonnollisia, napautuksia;
        readonly double[] kaantoViive = new double[Turisteja], takaisinViive = new double[Turisteja], kaanto = new double[Turisteja],
            noja = new double[Turisteja], nojaX = new double[Turisteja], nojaZ = new double[Turisteja];
        readonly double[] gHoyryAjo = new double[3], gHoyryKoko = new double[3];

        /// <summary>Turistien lepopaikat (x, z) ja säteen suunta; kääntökulma Geysiriin päin (astetta).</summary>
        static readonly double[] tx = new double[Turisteja], tz = new double[Turisteja], ux = new double[Turisteja], uz = new double[Turisteja];

        static GeysirLiike()
        {
            for (int i = 0; i < Turisteja; i++)
            {
                double a = TuristiKulma[i] * Math.PI / 180;
                ux[i] = Math.Cos(a); uz[i] = Math.Sin(a);
                tx[i] = SX + ux[i] * TuristiSade[i]; tz[i] = SZ + uz[i] * TuristiSade[i];
            }
        }

        public GeysirLiike(string id) : base(id)
        {
            tauko = Vali(EkaMinS, EkaMaxS, 0, 60);
            for (int i = 0; i < Turisteja; i++)
            {
                // Kääntö Geysiriin päin: levossa katse Strokkuriin (−u), kohde Geysir.
                double levossa = Kulma(-ux[i], -uz[i]), kohde = Kulma(GX - tx[i], GZ - tz[i]);
                double d = kohde - levossa;
                d -= 360 * Math.Floor((d + 180) / 360);
                kaanto[i] = d;
                // Nojauksen akseli: vaakasuora, kohtisuorassa katseeseen Geysiriä kohti (yläpää siirtyy poispäin Geysiristä).
                double kx = GX - tx[i], kz = GZ - tz[i], kl = Math.Sqrt(kx * kx + kz * kz);
                nojaX[i] = -kz / kl; nojaZ[i] = kx / kl;
            }
        }

        // ---- Testien ja lokin kyselyt ----

        public bool Purkaus => e >= 0;
        public bool SuuriKaynnissa => g >= 0;
        public int Purkauksia => purkauksia;
        public int Kaksoisia => kaksoisia;
        public int Suuria => suuria;
        public int LuonnollisiaSuuria => luonnollisia;
        public int Napautuksia => napautuksia;
        /// <summary>Kulma (astetta, myötäpäivään +Z:sta kuten Kierto(0, 1, 0, …)): suunta (x, z).</summary>
        static double Kulma(double x, double z) => Math.Atan2(x, z) * 180 / Math.PI;

        // ---- Strokkur ----

        /// <summary>Uusi purkaus: kuvun kesto, patsaan korkeus, kaksoispurkaus, tuuli, höyry ja turistien reaktiot siemenestä.</summary>
        void Aloita()
        {
            purkaus++; purkauksia++;
            int n = purkaus;
            kupu0 = Vali(KupuMinS, KupuMaxS, n, 61);
            korkeus0 = Arpa(n, 63) < KorkeaTod ? Vali(1.25, 1.35, n, 64) : Vali(0.85, 1.15, n, 62);
            kaksois = Arpa(n, 65) < KaksoisTod;
            if (kaksois) kaksoisia++;
            puhk0 = kupu0;
            ylos0 = puhk0 + NousuS;
            putoaa0 = ylos0 + Vali(SeisooMinS, SeisooMaxS, n, 69);
            if (kaksois)
            {
                double alku1 = puhk0 + Vali(KaksoisMinS, KaksoisMaxS, n, 66);
                kupu1 = Vali(Kupu2MinS, Kupu2MaxS, n, 67);
                puhk1 = alku1 + kupu1;
                korkeus1 = korkeus0 * Vali(0.75, 1.05, n, 68);
                ylos1 = puhk1 + NousuS;
                putoaa1 = ylos1 + Vali(SeisooMinS, SeisooMaxS, n, 70);
            }
            double viimeinen = kaksois ? putoaa1 : putoaa0;
            valuu = viimeinen + ValuuViive;
            tayttyy = valuu + ValuuS;
            double tk = Vali(TuuliMin, TuuliMax, n, 71) * Math.PI / 180;
            tuuliX = Math.Cos(tk); tuuliZ = Math.Sin(tk);
            ajo = Vali(AjoMin, AjoMax, n, 72);
            double tila = ReunaanMatka(SX, SZ, tuuliX, tuuliZ);
            kallistus = Vali(KallistusMin, KallistusMax, n, 73);
            loppu = tayttyy + TayttyyS;
            for (int j = 0; j < 5; j++)
            {
                bool toinen = j >= 3;
                double p = toinen ? puhk1 : puhk0, h = toinen ? korkeus1 : korkeus0;
                int jj = toinen ? j - 3 : j;
                hoyrySynty[j] = toinen && !kaksois ? -1 : p + 0.35 + jj * HoyryVali;
                hoyryElin[j] = HoyryElinS * Vali(0.9, 1.1, n * 8 + j, 81);
                hoyryKoko[j] = Vali(0.85, 1.15, n * 8 + j, 83);
                hoyryAjo[j] = Math.Min(ajo * Vali(0.8, 1.2, n * 8 + j, 82) * (0.85 + 0.15 * jj), tila - HoyryLahto - HoyrySade[j] * hoyryKoko[j]);
                hoyryY0[j] = (0.24 + 0.05 * jj) * h - HoyryY;
                if (hoyrySynty[j] >= 0) loppu = Math.Max(loppu, hoyrySynty[j] + hoyryElin[j]);
            }
            for (int i = 0; i < Turisteja; i++)
            {
                int m = n * 16 + i;
                askel[i] = Arpa(m, 79) < RohkeaTod ? RohkeaAskel : Vali(AskelMin, AskelMax, m, 78);
                perayViive[i] = Vali(0, PerayViiveMax, m, 77);
                paluuViive[i] = Vali(0, PaluuViiveMax, m, 80);
                loppu = Math.Max(loppu, viimeinen + PaluuViive + paluuViive[i] + PaluuS);
            }
            e = 0;
        }

        void Paata()
        {
            e = -1;
            tauko = kaksois ? Vali(KaksoisTaukoMinS, KaksoisTaukoMaxS, purkaus, 75) : Vali(TaukoMinS, TaukoMaxS, purkaus, 74);
            // Harvinainen: Suuri Geysir herää purkauksen jälkeen (oma kanava); Strokkur odottaa, kunnes Geysir on hiljaa.
            if (g < 0 && gOdota < 0 && Arpa(purkaus, 76) < Harvinainen)
            {
                gOdota = GOdotusS; luonnollisia++;
                tauko = Math.Max(tauko, GOdotusS + GLoppuS + 4);
            }
        }

        // ---- Suuri Geysir ----

        void AloitaSuuri()
        {
            int m = suuria++;
            g = 0; gOdota = -1;
            gKorkeus = Vali(0.95, 1.05, m, 90);
            double tk = Vali(TuuliMin, TuuliMax, m, 91) * Math.PI / 180;
            gTuuliX = Math.Cos(tk); gTuuliZ = Math.Sin(tk);
            gAjo = Vali(0.14, 0.20, m, 92);
            double tila = ReunaanMatka(GX, GZ, gTuuliX, gTuuliZ);
            for (int j = 0; j < 3; j++)
            {
                gHoyryKoko[j] = Vali(0.85, 1.15, m * 8 + j, 96);
                gHoyryAjo[j] = Math.Min(gAjo * Vali(0.8, 1.2, m * 8 + j, 95) * (0.85 + 0.15 * j), tila - HoyryLahto * 1.5 - SuuriHoyrySade[j] * gHoyryKoko[j]);
            }
            for (int i = 0; i < Turisteja; i++)
            {
                kaantoViive[i] = Vali(KaantoViiveMin, KaantoViiveMax, m * 16 + i, 93);
                takaisinViive[i] = Vali(0, TakaisinViiveMax, m * 16 + i, 94);
                noja[i] = Vali(NojaMin, NojaMax, m * 16 + i, 97);
            }
        }

        /// <summary>Etäisyys pisteestä (px, pz) suuntaan (dx, dz) saarekkeen reunaan, vähennettynä varalla (kerran purkausta
        /// kohden, ei kehyksessä; ei allokaatioita).</summary>
        static double ReunaanMatka(double px, double pz, double dx, double dz)
        {
            double t = 0;
            for (int i = 0; i < 200; i++, t += 0.004)
            {
                double x = px + dx * t, z = pz + dz * t;
                double a = Math.Atan2(z, x) / (2 * Math.PI) * Reuna.Length;
                if (a < 0) a += Reuna.Length;
                int i0 = (int)a % Reuna.Length;
                double f = a - Math.Floor(a), r = Reuna[i0] + (Reuna[(i0 + 1) % Reuna.Length] - Reuna[i0]) * f;
                if (Math.Sqrt(x * x + z * z) >= r) break;
            }
            return Math.Max(0, t - ReunaVara);
        }

        // ---- Askel ----

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && T - edellinenNapautus >= NapautusValiS && g < 0)
            {
                edellinenNapautus = T; napautuksia++;
                AloitaSuuri();
            }
            if (heraa && e < 0) Aloita();
            if (d <= 0) return;

            bool liikkuu = false;
            if (e >= 0)
            {
                e += d; liikkuu = true;
                if (e >= loppu) Paata();
            }
            else
            {
                tauko -= d;
                if (tauko <= 0 && g < 0 && gOdota < 0) Aloita();
            }
            if (gOdota >= 0)
            {
                gOdota -= d;
                if (gOdota < 0) AloitaSuuri();
            }
            if (g >= 0)
            {
                g += d; liikkuu = true;
                if (g > GLoppuS) g = -1;
            }
            if (liikkuu) Liikkuu = true;
        }

        // ---- Asennot ----

        /// <summary>Patsaan skaala ja kallistus suihkulle (puhkeaa, ylhäällä, putoaa, korkeus) hetkellä e.</summary>
        double Patsas(double puhk, double ylos, double putoaa, double h, out double kallistusNyt)
        {
            kallistusNyt = 0;
            if (e < puhk || e > putoaa + PutoaaS) return 0;
            kallistusNyt = kallistus * Pehmea((e - puhk) / 0.8) * (1 - Pehmea((e - putoaa) / PutoaaS));
            if (e < ylos) { double u = (e - puhk) / NousuS; return h * (1 - (1 - u) * (1 - u) * (1 - u)); }
            if (e < putoaa) return h * (1 + 0.03 * Math.Sin(2 * Math.PI * 2.3 * (e - ylos)) * Pehmea((e - ylos) / 0.3));
            double v = (e - putoaa) / PutoaaS;
            return h * (1 - v * v);
        }

        OsanAsento PatsasAsento()
        {
            if (e < 0) return OsanAsento.Piilossa;
            double s = Patsas(puhk0, ylos0, putoaa0, korkeus0, out double k);
            if (s <= 0.001 && kaksois) s = Patsas(puhk1, ylos1, putoaa1, korkeus1, out k);
            if (s <= 0.005) return OsanAsento.Piilossa;
            return new OsanAsento { Skaala = s }.Kierretty(OsanAsento.Kierto(tuuliZ, 0, -tuuliX, k));
        }

        double Kupu(double alku, double kesto)
        {
            double t = e - alku;
            if (t < 0 || t > kesto + PuhkeaaS) return 0;
            if (t < kesto) return Pehmea(t / kesto) * (1 + 0.04 * Math.Sin(2 * Math.PI * 3 * t) * Pehmea(t / 0.4));
            return 1 - (t - kesto) / PuhkeaaS;
        }

        OsanAsento KupuAsento()
        {
            if (e < 0) return OsanAsento.Piilossa;
            double s = Kupu(0, kupu0);
            if (s <= 0.001 && kaksois) s = Kupu(puhk1 - kupu1, kupu1);
            return s <= 0.01 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
        }

        double Roiske(double putoaa)
        {
            double t = e - putoaa;
            if (t < 0 || t > RoiskeS) return 0;
            return Pehmea(t / 0.35) * (1 - Pehmea((t - 0.5) / (RoiskeS - 0.5)));
        }

        OsanAsento RoiskeAsento()
        {
            if (e < 0) return OsanAsento.Piilossa;
            double s = Roiske(putoaa0);
            if (kaksois) s = Math.Max(s, Roiske(putoaa1));
            return s <= 0.01 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = 0.75 + 0.35 * s, Y = -0.0015 * (1 - s) };
        }

        OsanAsento AllasAsento()
        {
            if (e < valuu || e < 0) return OsanAsento.Lepo;
            double s;
            if (e < tayttyy) s = 1 - (1 - Pohja) * Pehmea((e - valuu) / ValuuS);
            else s = Pohja + (1 - Pohja) * Pehmea((e - tayttyy) / TayttyyS);
            return new OsanAsento { Qw = 1, Skaala = s };
        }

        OsanAsento HoyryAsento(int j)
        {
            if (e < 0 || hoyrySynty[j] < 0) return OsanAsento.Piilossa;
            double a = e - hoyrySynty[j];
            if (a < 0 || a > hoyryElin[j]) return OsanAsento.Piilossa;
            double u = a / hoyryElin[j];
            double s = hoyryKoko[j] * (0.45 + 0.55 * Pehmea(u / 0.2)) * (1 - Pehmea((u - 0.5) / 0.5));
            if (s <= 0.02) return OsanAsento.Piilossa;
            // Tuuli tarttuu höyryyn heti (hidastuva ajautuminen), joten patsaan kruunusta lähtee vana eikä pallo jää huipulle.
            double m = HoyryLahto + hoyryAjo[j] * (1 - Math.Pow(1 - u, 2.2));
            double y = hoyryY0[j] + 0.06 * (1 - (1 - u) * (1 - u));
            return new OsanAsento { Qw = 1, X = tuuliX * m, Y = y, Z = tuuliZ * m, Skaala = s };
        }

        double SuuriPatsas(out double kallistusNyt)
        {
            kallistusNyt = 0;
            double t = g - GNousuAlku, ylos = GNousuS, putoaa = GNousuS + GSeisooS;
            if (g < 0 || t < 0 || t > putoaa + GPutoaaS) return 0;
            kallistusNyt = 3 * Pehmea(t / 1.2) * (1 - Pehmea((t - putoaa) / GPutoaaS));
            if (t < ylos) { double u = t / ylos; return gKorkeus * (1 - (1 - u) * (1 - u) * (1 - u)); }
            if (t < putoaa) return gKorkeus * (1 + 0.025 * Math.Sin(2 * Math.PI * 1.7 * (t - ylos)) * Pehmea((t - ylos) / 0.4));
            double v = (t - putoaa) / GPutoaaS;
            return gKorkeus * (1 - v * v);
        }

        OsanAsento KuohuAsento()
        {
            if (g < 0) return OsanAsento.Piilossa;
            double kasvu = Pehmea(g / GKuohuS), haipuu = 1 - Pehmea((g - GKuohuLoppu) / GKuohuLoppuS);
            double s = kasvu * haipuu * (1 + 0.08 * Math.Sin(2 * Math.PI * 4.1 * g));
            if (s <= 0.01) return OsanAsento.Piilossa;
            return new OsanAsento { Qw = 1, Y = 0.0012 * (0.5 + 0.5 * Math.Sin(2 * Math.PI * 2.3 * g)) * kasvu * haipuu, Skaala = s };
        }

        OsanAsento SuuriHoyryAsento(int j)
        {
            if (g < 0) return OsanAsento.Piilossa;
            double a = g - (GHoyryAlku + j * GHoyryVali);
            if (a < 0 || a > GHoyryElinS) return OsanAsento.Piilossa;
            double u = a / GHoyryElinS;
            double s = gHoyryKoko[j] * (0.35 + 0.65 * Pehmea(u / 0.25)) * (1 - Pehmea((u - 0.55) / 0.45));
            if (s <= 0.02) return OsanAsento.Piilossa;
            double m = HoyryLahto * 1.5 + gHoyryAjo[j] * (1 - Math.Pow(1 - u, 2.2));
            double y = (SuuriHoyryY - 0.12 + 0.1 * j) * gKorkeus - SuuriHoyryY + 0.08 * (1 - (1 - u) * (1 - u));
            return new OsanAsento { Qw = 1, X = gTuuliX * m, Y = y, Z = gTuuliZ * m, Skaala = s };
        }

        OsanAsento TuristiAsento(int i)
        {
            double r = 0, liike = 0, t0 = 0;
            if (e >= 0)
            {
                double viimeinen = kaksois ? putoaa1 : putoaa0;
                double peray = (e - (puhk0 + perayViive[i])) / PerayS, paluu = (e - (viimeinen + PaluuViive + paluuViive[i])) / PaluuS;
                r = askel[i] * (Pehmea(peray) - Pehmea(paluu));
                if (peray > 0 && peray < 1) { liike = 1; t0 = puhk0 + perayViive[i]; }
                if (paluu > 0 && paluu < 1) { liike = 1; t0 = viimeinen + PaluuViive + paluuViive[i]; }
            }
            double kulma = 0, nojaNyt = 0;
            if (g >= 0)
            {
                double k0 = (g - kaantoViive[i]) / KaantoS, k1 = (g - (KaantoTakaisin + takaisinViive[i])) / KaantoS;
                double kk = Pehmea(k0) - Pehmea(k1);
                kulma = kaanto[i] * kk;
                nojaNyt = noja[i] * kk;
            }
            if (r == 0 && kulma == 0) return OsanAsento.Lepo;
            double y = liike > 0 && askel[i] > RohkeaAskel ? AskelNousu * Math.Abs(Math.Sin(Math.PI * (e - t0) / AskelJakso)) : 0;
            // Kääntö pystyakselin ympäri ja nojaus taaksepäin (katse ylös patsaaseen) vaakasuoran akselin ympäri.
            var q = OsanAsento.Kierto(0, 1, 0, kulma);
            if (nojaNyt != 0) q = OsanAsento.Tulo(OsanAsento.Kierto(nojaX[i], 0, nojaZ[i], nojaNyt), q);
            return new OsanAsento { X = ux[i] * r, Y = y, Z = uz[i] * r, Skaala = 1 }.Kierretty(q);
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa == null) return OsanAsento.Lepo;
            int n = osa.Length;
            if (n == 8 && osa[0] == 't' && osa[1] == 'u')   // turisti0–8
            {
                int i = osa[7] - '0';
                return i >= 0 && i < Turisteja ? TuristiAsento(i) : OsanAsento.Lepo;
            }
            if (n == 6 && osa[0] == 'h' && osa[1] == 'o')   // hoyry0–4
            {
                int j = osa[5] - '0';
                return j >= 0 && j < 5 ? HoyryAsento(j) : OsanAsento.Lepo;
            }
            if (n == 11 && osa[0] == 's' && osa[5] == 'h')  // suurihoyry0–2
            {
                int j = osa[10] - '0';
                return j >= 0 && j < 3 ? SuuriHoyryAsento(j) : OsanAsento.Lepo;
            }
            switch (osa)
            {
                case "allas": return AllasAsento();
                case "kupu": return KupuAsento();
                case "patsas": return PatsasAsento();
                case "roiske": return RoiskeAsento();
                case "kuohu": return KuohuAsento();
                case "suuri":
                {
                    double s = SuuriPatsas(out double k);
                    if (s <= 0.005) return OsanAsento.Piilossa;
                    return new OsanAsento { Skaala = s }.Kierretty(OsanAsento.Kierto(gTuuliZ, 0, -gTuuliX, k));
                }
                case "valot":
                case "valot1":
                    return Valot();
                default: return OsanAsento.Lepo;   // maa ja tuntemattomat
            }
        }

        public override string Tila() =>
            (e >= 0 ? $"Strokkur purkautuu {e:F1}/{loppu:F1} s{(kaksois ? " (kaksois)" : "")}" : $"Strokkur tauolla ({tauko:F0} s)") +
            $", purkauksia {purkauksia}, kaksoisia {kaksoisia}" + (g >= 0 ? $", Suuri Geysir {g:F1} s" : "") +
            $", Suuria {suuria} (luonnollisia {luonnollisia}, napautuksia {napautuksia})";
    }
}
