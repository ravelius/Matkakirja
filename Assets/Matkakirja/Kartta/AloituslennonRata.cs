using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON RATA (omistajan TF-löydös 27.9.2026, Fablen toimeksianto "suunnittele kokonaisuutena"; Natiiviseppä).
    /// Lontoo → aloituskaupunki yhtenä 15 s:n otoksena, joka lähtee siitä pallonäkymästä, jossa pelaaja napautti:
    ///   0,0–2,0  SYÖKSY     napautusnäkymästä koneen lähikuvaan Lontoossa (LennonV3.Alkuliuku: katsepiste isoympyrää
    ///                       pitkin 1,4 s:ssa, etäisyys logaritmisena, lähtö levosta). Kone rullaa ja irtoaa.
    ///   2,0–3,4  LÄHIKUVA   kone nousee kuvan keskellä etuviistosta (θ ±75° → ±60°, 28 → 32 km, katse 28–32° alaspäin:
    ///                       maata näkyy usvan alta, horisontti yläreunassa), maa virtaa 4 km/s.
    ///   3,4–7,0  NOUSU      kamera nousee pehmeästi ja kääntyy koneen taakse (θ → 0): reitti avautuu ruudun alareunasta
    ///                       ylös kohti kohdetta; 7 s:ssa kuvassa Lontoo (alhaalla), koko reitti ja kohde (ylhäällä),
    ///                       kallistus 35–45° pystystä, joten pallon kaarevuus ja horisontti näkyvät (tunne matkasta).
    ///   7,0–11,0 MATKA      rajaus seuraa jäljellä olevaa reittiä (koneen takaa kohteeseen): kamera laskeutuu hitaasti
    ///                       koneen edetessä, isoisän punainen kynänjälki piirtyy koneen perässä.
    ///  11,0–15,0 LASKU      kamera tulee alas kohteen ylle (60 km, katse 24° alas, 25° lentosuunnasta), kone laskeutuu
    ///                       14,3 s (ääni: kosketus) ja rullaa pysähdyksiin 15 s — sama loppu kuin lento v3:ssa.
    /// Kanavat (log-etäisyys, kallistus, suuntima, katsepisteen etumatka reitillä, katseen korkeus) ovat viidennen asteen
    /// Hermite-paloja avainten välissä, derivaatat Fritsch–Carlson-rajattuina (ei yliheilahdusta: etäisyydellä on yksi huippu
    /// nousun lopussa, kallistus ja suuntima monotonisia vaiheittain). Matkan avaimet ratkaistaan rajauksesta pallomallilla
    /// (<see cref="Rajaa"/>): reitin alapää ruudun alareunaan (y −0,72) ja kohde yläosaan (y +0,55), jolloin reitti kulkee
    /// ruudun pystyakselia pitkin (kameran suuntima = reitin suunta katsepisteessä). Koneen eteneminen on oma profiilinsa
    /// (<see cref="KoneenOsuus"/>): lähikuvassa ja laskussa absoluuttinen nopeus, matkanopeus kattaa loput.
    /// Kone on symbolinen: siipiväli vähintään 5 km ja kaukaa 4,5 % kameran etäisyydestä (web: koneen koko ruudulla on
    /// vakio), korkeus kasvaa koon mukana, jottei suuri kone leikkaa maastoa. Puhdas laskenta ilman UnityEngineä.
    /// </summary>
    public sealed class AloituslennonRata
    {
        public const double KestoS = LennonV3.KestoS, KosketusS = LennonV3.KosketusS;
        /// <summary>Vaiheiden rajat (s).</summary>
        public const double SyoksyS = 2.0, LahiLoppuS = 3.4, AvausS = 7.0, MatkaS = 9.0, LaskuS = 11.0;
        /// <summary>Koneen nopeus lähikuvassa ja laskun alussa / kosketuksessa (m/s).</summary>
        public const double LahiNopeus = 4000.0, LaskuNopeus = 3000.0, KosketusNopeus = 700.0;
        /// <summary>Koneen siipiväli (m) lähellä ja osuutena kameran etäisyydestä kaukana.</summary>
        public const double SiipiLahella = LennonV3SiipiM, SiipiOsuus = 0.045;
        const double LennonV3SiipiM = 5000.0;
        /// <summary>Rajaus (ruudun pystykoordinaatti −1…1): reitin alapää ja kohde.</summary>
        public const double RajausAla = -0.72, RajausYla = 0.55;
        /// <summary>Loppukuva: etäisyys (m), kallistus pystystä (°) ja suunta lentosuunnasta (°).</summary>
        public const double LoppuM = 60_000.0, LoppuKallistus = 66.0, LoppuTheta = 25.0;
        const double R = LennonV3.R;

        /// <summary>Kameran asento: katsepiste, etäisyys (m), kallistus pystystä (°), suuntima (katseen suunta, °) ja katseen korkeus (m).</summary>
        public struct Asento
        {
            public double Lat, Lon, EtaisyysM, Kallistus, Suuntima, Katse;
            public Asento(double lat, double lon, double etaisyysM, double kallistus, double suuntima, double katse)
            { Lat = lat; Lon = lon; EtaisyysM = etaisyysM; Kallistus = kallistus; Suuntima = suuntima; Katse = katse; }
        }

        public readonly double Lat0, Lon0, Lat1, Lon1, ReittiM, Kuvasuhde, Fov, MaaKohteessa;
        readonly Asento alku;
        readonly double[] avainT = { SyoksyS, LahiLoppuS, AvausS, MatkaS, LaskuS, KestoS };
        readonly double[] lnD, kall, suunt, etumatka;
        readonly double[] dLnD, dKall, dSuunt, dEtumatka;
        double[] koneP;
        const int Naytteita = 3000;

        /// <summary>Lähikuvan puoli: +1 = kamera koneen vasemmalla (θ +75°), −1 oikealla.</summary>
        public readonly int Puoli;

        /// <summary>Rajauksen tulos avaimittain (loki ja testit): etäisyys (m), katsepisteen reittiosuus ja alapään reittiosuus.</summary>
        public readonly (double T, double EtaisyysM, double Katse, double Alapaa)[] Rajaukset;

        /// <param name="alku">Napautusnäkymä (PalloKierto: leveys, pituus, korkeus = etäisyys, KaytettyKallistus, suuntima, katseKorkeus).</param>
        /// <param name="kuvasuhde">Ruudun leveys / korkeus.</param>
        /// <param name="fov">Pystykuvakulma (°).</param>
        /// <param name="maaKohteessa">Kohteen maan korkeus (m, liioiteltu).</param>
        public AloituslennonRata(double lat0, double lon0, double lat1, double lon1, Asento alku, double kuvasuhde, double fov = 50.0,
            double maaKohteessa = 0.0)
        {
            Lat0 = lat0; Lon0 = lon0; Lat1 = lat1; Lon1 = lon1;
            ReittiM = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            Kuvasuhde = kuvasuhde > 0 ? kuvasuhde : 0.46;
            Fov = fov;
            MaaKohteessa = maaKohteessa;
            this.alku = alku;
            TaulukoiKone();

            int n = avainT.Length;
            lnD = new double[n]; kall = new double[n]; suunt = new double[n]; etumatka = new double[n];
            double lahtoSuunta = LennonV3.Suuntima(lat0, lon0, lat1, lon1);
            // Lähikuva: etuviisto kylki sillä puolella, jolle syöksyn kierto napautusnäkymän suuntimasta on lyhyempi
            // (Puoli +1 = kamera koneen vasemmalla); kamera hieman loittonee ja kiertää kohti koneen takaa.
            Puoli = Math.Abs(LennonV3.Kulmaero(alku.Suuntima, lahtoSuunta + 75)) <= Math.Abs(LennonV3.Kulmaero(alku.Suuntima, lahtoSuunta - 75)) ? 1 : -1;
            lnD[0] = Math.Log(28_000); kall[0] = 62; suunt[0] = alku.Suuntima + LennonV3.Kulmaero(alku.Suuntima, lahtoSuunta + Puoli * 75); etumatka[0] = 0;
            lnD[1] = Math.Log(32_000); kall[1] = 58; suunt[1] = lahtoSuunta + Puoli * 60; etumatka[1] = 0;
            // Matka: rajaus reitin loppuosaan. 7 s: koko reitti (Lontoo alhaalla); 9 ja 11 s: koneen takaa kohteeseen.
            Rajaukset = new (double, double, double, double)[3];
            for (int k = 0; k < 3; k++)
            {
                double t = avainT[2 + k], p = KoneenOsuus(t);
                double alapaa = k == 0 ? 0.0 : Math.Max(0.0, p - (k == 1 ? 0.08 : 0.04));
                var r = Rajaa(alapaa);
                lnD[2 + k] = Math.Log(r.EtaisyysM);
                kall[2 + k] = KallistusEtaisyydella(r.EtaisyysM);
                etumatka[2 + k] = Math.Max(0.0, r.Katse - p);
                suunt[2 + k] = SuuntimaReitilla(r.Katse);
                Rajaukset[k] = (t, r.EtaisyysM, r.Katse, alapaa);
            }
            double saapumisSuunta = SuuntimaReitilla(0.999);
            lnD[5] = Math.Log(LoppuM); kall[5] = LoppuKallistus; suunt[5] = saapumisSuunta + LoppuTheta; etumatka[5] = 0;
            // Suuntima yhtenäiseksi (lyhin kierto avaimesta toiseen).
            for (int i = 1; i < n; i++) suunt[i] = suunt[i - 1] + LennonV3.Kulmaero(suunt[i - 1], suunt[i]);
            dLnD = Kulmakertoimet(lnD); dKall = Kulmakertoimet(kall); dSuunt = Kulmakertoimet(suunt); dEtumatka = Kulmakertoimet(etumatka);
        }

        /// <summary>Kallistus pystystä (°) etäisyyden mukaan: kaukana 35° (pallon kaarevuus näkyy), 200 km:ssä ja alle 60°.</summary>
        public static double KallistusEtaisyydella(double etaisyysM)
        {
            double u = (Math.Log(3_000_000.0) - Math.Log(Math.Max(1.0, etaisyysM))) / Math.Log(15.0);
            return 35.0 + 25.0 * Pehmea(u);
        }

        // ---- Kamera ----

        /// <summary>Kameran asento hetkellä t (0–15 s).</summary>
        public Asento Kamera(double t)
        {
            t = Math.Max(0, Math.Min(KestoS, t));
            double tr = Math.Max(t, SyoksyS);
            int i = 0;
            while (i < avainT.Length - 2 && tr > avainT[i + 1]) i++;
            double h = avainT[i + 1] - avainT[i], u = (tr - avainT[i]) / h;
            double d = Math.Exp(H(u, h, lnD, dLnD, i));
            double k = H(u, h, kall, dKall, i);
            double s = H(u, h, suunt, dSuunt, i);
            double e = Math.Max(0.0, H(u, h, etumatka, dEtumatka, i));
            double p = KoneenOsuus(t);
            double katseOsuus = Math.Min(1.0, p + e);
            var q = Kohta(katseOsuus);
            // Katseen korkeus: lähikuvassa koneen korkeus, nousussa maahan; lopussa kohteen maa.
            double katse = KoneenPerusKorkeus(t) * (1 - Pehmea((t - LahiLoppuS) / (AvausS - LahiLoppuS)))
                           + MaaKohteessa * Pehmea((t - LaskuS) / (KestoS - LaskuS));
            var rata = new Asento(q.Lat, q.Lon, d, k, Normalisoi(s), katse);
            if (t >= SyoksyS) return rata;
            var a = LennonV3.Alkuliuku(t, SyoksyS, (alku.Lat, alku.Lon, alku.EtaisyysM, alku.Kallistus, alku.Suuntima, alku.Katse),
                (rata.Lat, rata.Lon, rata.EtaisyysM, rata.Kallistus, rata.Suuntima, rata.Katse));
            return new Asento(a.Lat, a.Lon, a.EtaisyysM, a.Kallistus, a.Suuntima, a.Katse);
        }

        static double H(double u, double h, double[] v, double[] dv, int i) =>
            Hermite5(u, h, v[i], v[i + 1], dv[i], dv[i + 1]);

        /// <summary>Fritsch–Carlson-derivaatat (monotoninen, ei yliheilahdusta), päissä 0 (lepo syöksyn liitoksessa ja perillä).</summary>
        double[] Kulmakertoimet(double[] v)
        {
            int n = v.Length;
            var m = new double[n];
            for (int i = 1; i < n - 1; i++)
            {
                double s0 = (v[i] - v[i - 1]) / (avainT[i] - avainT[i - 1]), s1 = (v[i + 1] - v[i]) / (avainT[i + 1] - avainT[i]);
                m[i] = s0 * s1 <= 0 ? 0 : 3 * (avainT[i + 1] - avainT[i - 1]) / ((2 * avainT[i + 1] - avainT[i] - avainT[i - 1]) / s0
                    + (avainT[i + 1] + avainT[i] - 2 * avainT[i - 1]) / s1);
            }
            return m;
        }

        // ---- Kone ----

        /// <summary>Koneen reittiosuus 0–1 hetkellä t (monotoninen, 1 kosketuksesta alkaen ≈ perillä).</summary>
        public double KoneenOsuus(double t)
        {
            t = Math.Max(0, Math.Min(KestoS, t));
            double x = t / KestoS * Naytteita;
            int i = Math.Min(Naytteita - 1, (int)x);
            return koneP[i] + (koneP[i + 1] - koneP[i]) * (x - i);
        }

        /// <summary>Matkanopeus (m/s), jolla reitti tulee katetuksi (loki).</summary>
        public double MatkaNopeus { get; private set; }

        double Lahi(double t) => Pehmea(t / SyoksyS) * (1 - Pehmea((t - LahiLoppuS) / 2.4));
        double Matka(double t) => Pehmea((t - LahiLoppuS) / 2.4) * (1 - Pehmea((t - 10.4) / 2.4));
        double Lasku(double t)
        {
            double w = Pehmea((t - 10.4) / 2.4);
            double v = t < KosketusS
                ? LaskuNopeus + (KosketusNopeus - LaskuNopeus) * Pehmea((t - 12.8) / (KosketusS - 12.8))
                : KosketusNopeus * (1 - Pehmea((t - KosketusS) / (KestoS - KosketusS)));
            return w * v;
        }

        void TaulukoiKone()
        {
            double dt = KestoS / Naytteita;
            double iLahi = 0, iMatka = 0, iLasku = 0;
            for (int i = 0; i < Naytteita; i++)
            {
                double a = i * dt, b = a + dt, c = a + dt / 2;
                iLahi += (Lahi(a) + 4 * Lahi(c) + Lahi(b)) / 6 * dt;
                iMatka += (Matka(a) + 4 * Matka(c) + Matka(b)) / 6 * dt;
                iLasku += (Lasku(a) + 4 * Lasku(c) + Lasku(b)) / 6 * dt;
            }
            double kiinteat = LahiNopeus * iLahi + iLasku;
            double skaala = kiinteat > 0.8 * ReittiM ? 0.8 * ReittiM / kiinteat : 1.0;   // lyhyt reitti: lähi- ja laskunopeus alas
            MatkaNopeus = Math.Max(0.0, (ReittiM - kiinteat * skaala) / Math.Max(1e-6, iMatka));
            koneP = new double[Naytteita + 1];
            double s = 0;
            for (int i = 0; i < Naytteita; i++)
            {
                double a = i * dt, b = a + dt, c = a + dt / 2;
                double v(double x) => skaala * (LahiNopeus * Lahi(x) + Lasku(x)) + MatkaNopeus * Matka(x);
                s += (v(a) + 4 * v(c) + v(b)) / 6 * dt;
                koneP[i + 1] = s;
            }
            for (int i = 0; i <= Naytteita; i++) koneP[i] = Math.Min(1.0, koneP[i] / s);
        }

        /// <summary>Koneen korkeus ilman koon nostoa (m merenpinnasta): nousu 1,2–4,5 s 3,5 km:iin, lasku kuten v3 (kosketus 14,3 s).</summary>
        public static double KoneenPerusKorkeus(double t) =>
            Math.Min(LennonV3.MatkaKorkeusM * Pehmea((t - 1.2) / 3.3), LennonV3.KoneenKorkeusM(t));

        /// <summary>Koneen siipiväli (m) kameran etäisyydellä: vähintään 5 km, kaukana 4,5 % etäisyydestä (pehmeä maksimi).</summary>
        public static double Siipivali(double kameranEtaisyysM) =>
            Math.Sqrt(SiipiLahella * SiipiLahella + Math.Pow(SiipiOsuus * kameranEtaisyysM, 2));

        /// <summary>Koneen korkeus (m): peruskorkeus + 30 % koon kasvusta (iso symbolikone ei leikkaa maastoa kaukana).</summary>
        public static double KoneenKorkeus(double t, double siipiM) =>
            KoneenPerusKorkeus(t) + 0.3 * Math.Max(0.0, siipiM - SiipiLahella) * (t < KosketusS ? 1.0 : 0.0);

        // ---- Reitti (isoympyrä) ----

        /// <summary>Piste reitillä osuudella u (0 = lähtö, 1 = kohde).</summary>
        public (double Lat, double Lon) Kohta(double u) => LennonV3.Isoympyralla(Lat0, Lon0, Lat1, Lon1, Math.Max(0, Math.Min(1, u)));

        /// <summary>Lentosuunta (°) reitillä osuudella u.</summary>
        public double SuuntimaReitilla(double u)
        {
            u = Math.Max(0, Math.Min(0.999, u));
            var a = Kohta(u); var b = Kohta(Math.Min(1.0, u + 0.001));
            return LennonV3.Suuntima(a.Lat, a.Lon, b.Lat, b.Lon);
        }

        /// <summary>Reitin isoympyrä pisteinä ennen kameran asentoa (käytävä ja maastokysely odotuksen alussa).</summary>
        public static List<(double Lat, double Lon)> Isoympyra(double lat0, double lon0, double lat1, double lon1, int n = 96)
        {
            var p = new List<(double, double)>(n + 1);
            for (int i = 0; i <= n; i++) p.Add(LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, (double)i / n));
            return p;
        }

        /// <summary>
        /// Lennon laatat (LennonV3Kaytava.Laatta): ALKU (odotus odottaa ne kokonaan) = lähtökaupungin lähikuva Z7–Z9 ±1
        /// ensimmäiseltä 25 km:ltä ja koko reitin matkanäkymä Z4–Z5 ±1; LOPUT = reitin päiden Z6 ±1 (10 %) ja kohteen lasku
        /// Z7–Z9 ±1 viimeiseltä 80 km:ltä (40 km:n välein). Aloitusnäytön esilämmitys ottaa näistä Z8–Z9 (LennonV3Kaytava.Esilammitettavat).
        /// </summary>
        public static List<LennonV3Kaytava.Laatta> Laatat(double lat0, double lon0, double lat1, double lon1)
        {
            var tulos = new List<LennonV3Kaytava.Laatta>();
            var nahty = new HashSet<long>();
            double L = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            void Lisaa(double u, bool alku, params int[] tasot)
            {
                var q = LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, Math.Max(0, Math.Min(1, u)));
                foreach (int z in tasot) LennonV3Kaytava.Lisaa(tulos, nahty, q.Lat, q.Lon, z, 1, alku);
            }
            for (int i = 0; i <= 4; i++) Lisaa(i * 6_250.0 / L, true, 7, 8, 9);
            for (int i = 0; i <= 40; i++) Lisaa(i / 40.0, true, 4, 5);
            for (int i = 0; i <= 10; i++) { Lisaa(i * 0.01, false, 6); Lisaa(1 - i * 0.01, false, 6); }
            for (int i = 0; i <= 2; i++) Lisaa(1 - i * 40_000.0 / L, false, 7, 8, 9);
            return tulos;
        }

        // ---- Rajaus (pallomalli) ----

        /// <summary>
        /// Matkan rajaus: katsepisteen reittiosuus ja etäisyys, joilla reitin kohta <paramref name="alapaa"/> on ruudun
        /// korkeudella <see cref="RajausAla"/> ja kohde <see cref="RajausYla"/> (kallistus <see cref="KallistusEtaisyydella"/>,
        /// suuntima reitin suunta katsepisteessä, joten reitti on ruudun pystyakselilla). Etäisyys 30 km – 20 000 km.
        /// </summary>
        public (double Katse, double EtaisyysM) Rajaa(double alapaa)
        {
            double lo = Math.Log(30_000.0), hi = Math.Log(20_000_000.0);
            var ap = Kohta(alapaa);
            for (int j = 0; j < 44; j++)
            {
                double ln = 0.5 * (lo + hi), d = Math.Exp(ln);
                // Liian kaukana: alapää ei ehdi alareunaan edes katseen ollessa kohteessa (reitti on ruudulla lyhyt).
                double y1 = RuudunY(1.0, d, ap.Lat, ap.Lon);
                if (!double.IsNaN(y1) && y1 > RajausAla) { hi = ln; continue; }
                double katse = KatseAlapaalle(alapaa, d);
                double yA = RuudunY(katse, d, ap.Lat, ap.Lon), yK = RuudunY(katse, d, Lat1, Lon1);
                // Liian lähellä: alapää putoaa horisontin taakse ennen alareunaa, tai kohde on yli yläosan.
                bool kauemmas = double.IsNaN(yA) || yA > RajausAla + 0.01 || double.IsNaN(yK) || yK > RajausYla;
                if (kauemmas) lo = ln; else hi = ln;
            }
            double dd = Math.Exp(hi);
            return (KatseAlapaalle(alapaa, dd), dd);
        }

        /// <summary>Katsepisteen reittiosuus, jolla reitin kohta alapaa on korkeudella RajausAla etäisyydellä d.</summary>
        double KatseAlapaalle(double alapaa, double d)
        {
            var ap = Kohta(alapaa);
            double lo = alapaa, hi = 1.0;
            double y1 = RuudunY(hi, d, ap.Lat, ap.Lon);
            if (!double.IsNaN(y1) && y1 > RajausAla) return hi;   // ei ehdi alareunaan: katse kohteeseen (Rajaa loitontaa)
            for (int j = 0; j < 40; j++)
            {
                double m = 0.5 * (lo + hi);
                double y = RuudunY(m, d, ap.Lat, ap.Lon);
                // NaN = kameran takana tai horisontin takana: katse on jo liian edellä.
                if (double.IsNaN(y) || y < RajausAla) hi = m; else lo = m;
            }
            return hi;
        }

        /// <summary>Pisteen (lat, lon, maan pinta) pystykoordinaatti ruudulla (−1…1), kun katse on reitin osuudella u
        /// etäisyydellä d; NaN = horisontin takana tai kameran takana.</summary>
        public double RuudunY(double u, double d, double lat, double lon)
        {
            var q = Kohta(u);
            double k = KallistusEtaisyydella(d) * Math.PI / 180, b = SuuntimaReitilla(u) * Math.PI / 180;
            Kanta(q.Lat, q.Lon, out var ylos, out var pohj, out var ita);
            var L = Mul(ylos, R);
            var eteen = Add(Mul(pohj, Math.Cos(b)), Mul(ita, Math.Sin(b)));
            var silmaan = Add(Mul(ylos, Math.Cos(k)), Mul(eteen, -Math.Sin(k)));
            var silma = Add(L, Mul(silmaan, d));
            var ylosK = Add(Mul(eteen, Math.Cos(k)), Mul(ylos, Math.Sin(k)));
            Kanta(lat, lon, out var n, out _, out _);
            var P = Mul(n, R);
            var v = Add(P, Mul(silma, -1));
            if (Dot(n, Mul(v, -1)) <= 0) return double.NaN;          // pallon takapuolella kamerasta
            double z = -Dot(v, silmaan);
            if (z <= 0) return double.NaN;
            return Dot(v, ylosK) / z / Math.Tan(Fov * Math.PI / 360);
        }

        static void Kanta(double lat, double lon, out double[] ylos, out double[] pohj, out double[] ita)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            ylos = new[] { Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f) };
            pohj = new[] { -Math.Sin(f) * Math.Cos(l), -Math.Sin(f) * Math.Sin(l), Math.Cos(f) };
            ita = new[] { -Math.Sin(l), Math.Cos(l), 0.0 };
        }

        static double[] Add(double[] a, double[] b) => new[] { a[0] + b[0], a[1] + b[1], a[2] + b[2] };
        static double[] Mul(double[] a, double s) => new[] { a[0] * s, a[1] * s, a[2] * s };
        static double Dot(double[] a, double[] b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

        // ---- Apurit ----

        static double Hermite5(double u, double h, double p0, double p1, double v0, double v1)
        {
            double u2 = u * u, u3 = u2 * u, u4 = u3 * u, u5 = u4 * u;
            double h00 = 1 - 10 * u3 + 15 * u4 - 6 * u5, h10 = u - 6 * u3 + 8 * u4 - 3 * u5;
            double h01 = 10 * u3 - 15 * u4 + 6 * u5, h11 = -4 * u3 + 7 * u4 - 3 * u5;
            return h00 * p0 + h10 * h * v0 + h01 * p1 + h11 * h * v1;
        }

        static double Pehmea(double x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * x * (x * (x * 6 - 15) + 10); }
        static double Normalisoi(double a) { a %= 360.0; return a < 0 ? a + 360.0 : a; }
    }
}
