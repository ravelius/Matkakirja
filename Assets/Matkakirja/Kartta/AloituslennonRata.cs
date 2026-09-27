using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON RATA v2 (omistajan palaute v7:stä 27.9.2026 klo 23.0x, Fablen kautta; Natiiviseppä). Lontoo → aloituskaupunki
    /// yhtenä 15 s:n otoksena napautetusta pallonäkymästä pelin saapumisnäkymään. Omistajan säännöt:
    ///   1. Kone näkyy KOKO AJAN (pienenä tai isona) eikä sitä näytetä koskaan takaa (edestä, sivulta tai niiden välistä).
    ///   2. Alku: kamera lähtee HYVIN KORKEALTA (napautettu pallonäkymä) ja näyttää koneen lähdön kaukaa (pienenä mutta
    ///      näkyvissä); se rullaa samalla lähemmäs ja alemmas, ja kartta näkyy kaukaa loivassa kulmassa Afrikan päältä pohjoiseen
    ///      (omistajan tarkennus Fablen kautta 27.9. klo 23.4x: ei matalaa kulmaa).
    ///   3. Takaa-ajo kiihtyy, tavoittaa koneen, ja kone lipuu VASEMMALTA OIKEALLE läheltä kameran ohi.
    ///   4. Kamera lentää kohteen yli ja näyttää saapumisen etuviistosta, kiertää laskeutumiskohtaa ja nousee, kunnes kohde
    ///      näkyy ylhäältä pelin jatkokohdasta (saapumisnäkymä).
    ///   5. Viiva ja lähtöpiste näkyvät; kamera muuttaa koko ajan suuntaa tai korkeutta kuminauhamaisesti.
    ///
    /// AIKAJANA (s): 0–4 AVAUS (napautusnäkymä 7 600 km → ~4 500 km ja kallistus 0° → 32°: silmä korkealla Saharan yllä,
    /// katse pohjoiseen, koko reitti ja Lontoo kuvassa) · 4–6,5 KIRI (kamera kiihtyy koneeseen, 4 500 → 30 km, kääntyy koneen
    /// oikealle kyljelle) · 6,5–8,1 OHITUS (kone lipuu vasemmalta oikealle, lähimmillään 23 km, reitin puolivälissä) ·
    /// 8,1–10,9 YLILENTO (kamera nousee ja kiitää kohteen taakse, kääntyy katsomaan konetta edestä) · 10,9–13,2 SAAPUMINEN
    /// (kiertää laskeutumiskohtaa, kone etuviistosta, kosketus 13,2 s) · 13,2–15 PALJASTUS (nousu saapumisnäkymään).
    ///
    /// TOTEUTUS: kamera suunnitellaan koneen RUUTUPAIKKANA. Kanavat (log-etäisyys katsepisteeseen, kallistus pystystä, suuntima,
    /// koneen ruutupaikka x/y ja katseen korkeuden paino) ovat avainkehyksiä (smootherstep), joita KUMINAUHA seuraa
    /// vaimennettuna jousena (ζ 0,7: kiihtyy, ylittää hieman ja asettuu, ei koskaan täysin paikallaan). Joka näytteessä
    /// (240 Hz) katsepiste ratkaistaan Newtonilla niin, että kone osuu kanavan ruutupaikkaan, joten kone pysyy kuvassa
    /// rakenteellisesti. Alku on täsmälleen napautusnäkymä ja loppu täsmälleen saapumisnäkymä (viimeinen 1,2 s pakottaa).
    /// Kone etenee omalla nopeusprofiilillaan: ohituksessa 5 km/s (lipuu kuvan poikki), saapumisessa laskeva absoluuttinen
    /// nopeus, muualla matkanopeudet, jotka ratkaistaan niin, että ohitus osuu reitin puoliväliin ja pysähdys 13,8 s:iin.
    /// Kone on symbolinen: siipiväli vähintään 5 km ja kaukana 5 % etäisyydestä kameraan (näkyy aina; web: koneen koko on
    /// ruudulla vakio). Pallomalli R = 6371 km (sama kuin LennonV3); PalloKierron WGS84 poikkeaa lähikuvassa metrejä.
    /// Puhdas laskenta ilman UnityEngineä (Kartta-testit/AloituslennonRataTestit mittaa koneen näkyvyyden joka näytteessä).
    /// </summary>
    public sealed class AloituslennonRata
    {
        // ---- Aikajana (s) ----
        public const double KestoS = 15.0, AvausS = 4.0, KiriS = 6.5, OhitusS = 7.3, OhitusLoppuS = 8.1, NousuS = 9.5,
            SaapuminenS = 10.9, KosketusS = 13.2, PysahdysS = 13.8;
        /// <summary>Avauksen loppu: kallistus pystystä (°, loiva) ja etäisyys reitin pituuksina (rajat alla).</summary>
        public const double AvausKallistus = 32.0, AvausEtaisyys = 1.9;
        /// <summary>Loppu pakotetaan saapumisnäkymään tästä alkaen (s).</summary>
        public const double PakotusS = 13.0;
        /// <summary>Ohituksen kohta reitillä (osuus) ja koneen nopeus ohituksessa (m/s).</summary>
        public const double OhitusOsuus = 0.5, OhitusNopeus = 5000.0;
        /// <summary>Katseen suunta koneen kulkusuunnasta ohituksessa: −95° = kamera koneen oikealla, kone liikkuu vasemmalta oikealle.</summary>
        public const double OhitusTheta = -96.0;
        /// <summary>Koneen näkökulma avauksessa (° keulasta): etuviisto.</summary>
        public const double AvausAlfa = 30.0;
        /// <summary>Symbolinen koko: siipiväli vähintään 5 km, kaukana osuus etäisyydestä kameraan.</summary>
        public const double SiipiLahellaM = 5000.0, SiipiOsuus = 0.05;
        public const double MatkaKorkeusM = 3500.0;
        const double R = LennonV3.R;
        const int Hz = 240;
        const int N = (int)(KestoS * Hz);

        /// <summary>Kameran asento PalloKierto.Kuvaa-muodossa: katsepiste, etäisyys (m), kallistus pystystä (°), suuntima (katseen
        /// suunta, °) ja katsepisteen korkeus (m).</summary>
        public struct Asento
        {
            public double Lat, Lon, EtaisyysM, Kallistus, Suuntima, Katse;
            public Asento(double lat, double lon, double etaisyysM, double kallistus, double suuntima, double katse)
            { Lat = lat; Lon = lon; EtaisyysM = etaisyysM; Kallistus = kallistus; Suuntima = suuntima; Katse = katse; }
        }

        /// <summary>Koneen mittaus ruudulla: x, y (−1…1, oikea ja ylä +), näkyykö (edessä, ruudussa, ei pallon takana),
        /// siipivälin osuus ruudun leveydestä, katselukulma keulasta (° 0 = edestä, 180 = takaa), kameran korotuskulma
        /// koneesta (°, 90 = suoraan yläpuolella), etäisyys kameraan ja kameran korkeus.</summary>
        public struct Mittaus
        {
            public double T, X, Y, Koko, Alfa, Korotus, EtaisyysM, KameraKorkeusM;
            public bool Nakyy;
        }

        public readonly double Lat0, Lon0, Lat1, Lon1, ReittiM, Kuvasuhde, Fov, MaaKohteessa;
        public readonly Asento Alku, Loppu;
        /// <summary>Matkanopeuden kertoimet ennen ja jälkeen ohituksen (1/s: kameran etäisyyksiä sekunnissa): loki ja testit.</summary>
        public double Nopeus1 { get; private set; }
        public double Nopeus2 { get; private set; }

        readonly double tanV, tanH;
        // Näytteet 240 Hz: koneen reittiosuus ja korkeus, symbolinen siipiväli, kameran asento ja katseen paino, mittaus.
        readonly double[] kp = new double[N + 1], kh = new double[N + 1], siipi = new double[N + 1];
        readonly double[] cLat = new double[N + 1], cLon = new double[N + 1], cLnD = new double[N + 1], cK = new double[N + 1],
            cB = new double[N + 1], cKatse = new double[N + 1], cKatseW = new double[N + 1];
        readonly Mittaus[] mittaus = new Mittaus[N + 1];

        /// <param name="alku">Napautusnäkymä (PalloKierto: leveys, pituus, korkeus = etäisyys, KaytettyKallistus, suuntima, katseKorkeus).</param>
        /// <param name="loppu">Saapumisnäkymä, johon peli jatkaa (PalloKierto.SaapumisNakyma ilman maarajausta).</param>
        /// <param name="kuvasuhde">Ruudun leveys / korkeus.</param>
        /// <param name="fov">Pystykuvakulma (°).</param>
        /// <param name="maaKohteessa">Kohteen maan korkeus (m, liioiteltu).</param>
        public AloituslennonRata(double lat0, double lon0, double lat1, double lon1, Asento alku, Asento loppu, double kuvasuhde,
            double fov = 50.0, double maaKohteessa = 0.0)
        {
            Lat0 = lat0; Lon0 = lon0; Lat1 = lat1; Lon1 = lon1; Alku = alku; Loppu = loppu;
            ReittiM = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            Kuvasuhde = kuvasuhde > 0 ? kuvasuhde : 0.46;
            Fov = fov;
            MaaKohteessa = maaKohteessa;
            tanV = Math.Tan(Fov * Math.PI / 360.0);
            tanH = tanV * Kuvasuhde;
            var lnD = Etaisyys();
            var jD = Jousi(lnD, 5.0);
            Kone(jD);
            Kamera(lnD, jD);
        }

        /// <summary>Kameran etäisyys katsepisteeseen avaimina (log): avaus Afrikan rannikon yllä, kiri, ohitus, nousu kohteen
        /// yli, saapuminen ja saapumisnäkymä. Riippuu vain reitin pituudesta, joten koneen nopeus voi seurata sitä.</summary>
        Kanava Etaisyys()
        {
            // Avaus: korkealla ja kaukana (loiva kallistus): silmä Saharan yllä, koko reitti ja lähtöpiste kuvassa.
            double dA = Math.Min(Rajaa(AvausEtaisyys * ReittiM, 3_000_000.0, 5_500_000.0), 0.8 * Alku.EtaisyysM);
            // Ylilento: niin korkealla, että loppumatka kulkee kuvassa rauhassa (kone ~0,8 etäisyyttä sekunnissa).
            double dC = Rajaa(0.4 * ReittiM, 350_000.0, 1_100_000.0);
            return new Kanava().Lisaa(0, Math.Log(Alku.EtaisyysM)).Lisaa(AvausS, Math.Log(dA)).Lisaa(KiriS, Math.Log(30_000))
                .Lisaa(OhitusS, Math.Log(23_000)).Lisaa(OhitusLoppuS, Math.Log(29_000)).Lisaa(NousuS, Math.Log(dC))
                .Lisaa(SaapuminenS, Math.Log(150_000)).Lisaa(KosketusS - 0.4, Math.Log(135_000)).Lisaa(KestoS, Math.Log(Loppu.EtaisyysM));
        }

        // ====================================================================================================================
        // KONE: nopeusprofiili, reittiosuus ja korkeus
        // ====================================================================================================================

        /// <summary>Kameran suunniteltu etäisyys (m) hetkellä t (kuminauhan etäisyyskanava): matkanopeus = K · etäisyys, jolloin kone
        /// kulkee ruudulla tasaisesti (ei viuhahda lähikuvan jälkeen eikä matele kaukaa).</summary>
        double[] dRef;
        double Dref(double t) => Math.Exp(Lerp(dRef, t));

        static double Rullaus(double t) => 300.0 * S(t / 0.6) * (1 - S((t - 0.6) / 1.6));
        static double W1(double t) => S((t - 0.5) / 2.4) * (1 - S((t - (KiriS - 1.4)) / 1.4));
        static double Wo(double t) => S((t - (KiriS - 1.4)) / 1.4) * (1 - S((t - (OhitusLoppuS - 0.2)) / 0.9));
        static double W2(double t) => S((t - (OhitusLoppuS - 0.2)) / 1.1) * (1 - S((t - 9.4) / 1.0));

        /// <summary>Saapumisen absoluuttinen nopeus (m/s): 60 km/s → 3 km/s (12,3 s) → 0,7 km/s kosketuksessa → pysähdys.</summary>
        static double Saapuminen(double t)
        {
            double v;
            if (t <= 10.4) v = 60000.0;
            else if (t <= 12.3) v = Math.Exp(Math.Log(60000.0) + (Math.Log(3000.0) - Math.Log(60000.0)) * S((t - 10.4) / 1.9));
            else if (t <= KosketusS) v = 3000.0 + (700.0 - 3000.0) * S((t - 12.3) / (KosketusS - 12.3));
            else if (t <= PysahdysS) v = 700.0 * (1 - S((t - KosketusS) / (PysahdysS - KosketusS)));
            else v = 0.0;
            return S((t - 9.3) / 1.1) * v;
        }

        double Nopeus(double t) => Rullaus(t) + (Nopeus1 * W1(t) + Nopeus2 * W2(t)) * Dref(t) + OhitusNopeus * Wo(t) + Saapuminen(t);

        void Kone(double[] jD)
        {
            dRef = jD;
            // Matkanopeudet: ohituksen keskikohta reitin puolivälissä (OhitusS) ja pysähdys perillä (PysahdysS).
            const int ali = 4;
            double dt = 1.0 / (Hz * ali);
            double a1 = 0, b1 = 0, a2 = 0, b2 = 0;
            for (int i = 0; i < (int)(PysahdysS * Hz * ali); i++)
            {
                double tm = (i + 0.5) * dt;
                if (tm < OhitusS) { a1 += W1(tm) * Dref(tm) * dt; b1 += (Rullaus(tm) + OhitusNopeus * Wo(tm) + Saapuminen(tm)) * dt; }
            }
            Nopeus1 = Math.Max(0.0, (OhitusOsuus * ReittiM - b1) / Math.Max(1e-6, a1));
            for (int i = 0; i < (int)(PysahdysS * Hz * ali); i++)
            {
                double tm = (i + 0.5) * dt;
                a2 += W2(tm) * Dref(tm) * dt;
                b2 += (Rullaus(tm) + Nopeus1 * W1(tm) * Dref(tm) + OhitusNopeus * Wo(tm) + Saapuminen(tm)) * dt;
            }
            Nopeus2 = Math.Max(0.0, (ReittiM - b2) / Math.Max(1e-6, a2));
            double s = 0;
            kp[0] = 0;
            for (int i = 1; i <= N; i++)
            {
                for (int j = 0; j < ali; j++) s += Nopeus(((i - 1) * ali + j + 0.5) * dt) * dt;
                kp[i] = Math.Min(1.0, s / ReittiM);
            }
            // Pysähdyksestä alkaen täsmälleen perillä (numeerinen integraali ± 1e-4).
            for (int i = 0; i <= N; i++) if (i / (double)Hz >= PysahdysS) kp[i] = 1.0;
        }

        /// <summary>Koneen peruskorkeus (m): nousu 0,6–4 s matkakorkeuteen, liuku 10,2 s:sta kosketukseen.</summary>
        public static double PerusKorkeus(double t)
        {
            double h = MatkaKorkeusM * S((t - 0.6) / 3.4);
            if (t <= 10.2) return h;
            if (t >= KosketusS) return 0.0;
            double u = (t - 10.2) / (KosketusS - 10.2);
            return h * (1 - S(Math.Pow(u, 0.85)));
        }

        /// <summary>Symbolinen siipiväli (m) etäisyydellä kameraan.</summary>
        public static double Siipivali(double etaisyysKameraanM) =>
            Math.Sqrt(SiipiLahellaM * SiipiLahellaM + Math.Pow(SiipiOsuus * etaisyysKameraanM, 2));

        /// <summary>Iso symbolikone nostetaan 30 % koon kasvusta (ei leikkaa maastoa kaukana); häviää saapumisessa.</summary>
        static double Nosto(double t, double siipiM) =>
            0.3 * Math.Max(0.0, siipiM - SiipiLahellaM) * (1 - S((t - 10.9) / 1.6));

        // ====================================================================================================================
        // KAMERA: kanavat, kuminauha ja katsepisteen ratkaisu
        // ====================================================================================================================

        /// <summary>Avainkehykset (smootherstep, lepo avaimissa).</summary>
        sealed class Kanava
        {
            readonly List<(double t, double v)> a = new List<(double, double)>();
            public Kanava Lisaa(double t, double v) { a.Add((t, v)); return this; }
            public double Arvo(double t)
            {
                if (t <= a[0].t) return a[0].v;
                for (int i = 1; i < a.Count; i++)
                    if (t <= a[i].t) return a[i - 1].v + (a[i].v - a[i - 1].v) * S((t - a[i - 1].t) / (a[i].t - a[i - 1].t));
                return a[a.Count - 1].v;
            }
        }

        /// <summary>Kuminauha: vaimennettu jousi seuraa kanavaa (lähtö levosta alkuarvosta).</summary>
        static double[] Jousi(Kanava k, double omega, double zeta = 0.7)
        {
            var ulos = new double[N + 1];
            const int ali = 4;
            double x = k.Arvo(0), v = 0, dt = 1.0 / (Hz * ali);
            ulos[0] = x;
            for (int i = 1; i <= N; i++)
            {
                for (int j = 0; j < ali; j++)
                {
                    double t = ((i - 1) * ali + j + 1) * dt;
                    double a = omega * omega * (k.Arvo(t) - x) - 2 * zeta * omega * v;
                    v += a * dt;
                    x += v * dt;
                }
                ulos[i] = x;
            }
            return ulos;
        }

        void Kamera(Kanava lnD, double[] jD)
        {
            double Psi(double t) => SuuntimaReitilla(OsuusNaytteesta(t));

            // Koneen ruutupaikka napautusnäkymässä (Lontoo) ja saapumisnäkymässä (kohde).
            var k0 = Kanta(Alku);
            Projisoi(k0, Ecef(Lat0, Lon0, 0.0), out double s0x, out double s0y, out _);
            s0x = Rajaa(double.IsNaN(s0x) ? 0 : s0x, -0.95, 0.95); s0y = Rajaa(double.IsNaN(s0y) ? 0 : s0y, -0.95, 0.95);
            var kL = Kanta(Loppu);
            Projisoi(kL, Ecef(Lat1, Lon1, MaaKohteessa), out double sfx, out double sfy, out _);
            sfx = Rajaa(double.IsNaN(sfx) ? 0 : sfx, -0.8, 0.8); sfy = Rajaa(double.IsNaN(sfy) ? 0 : sfy, -0.8, 0.8);

            // Avauksen suunta: kone etuviistosta (AvausAlfa keulasta) sille puolelle, josta kääntö ohituksen suuntaan on lyhyempi
            // (Lissabon: kiri kääntyisi muuten 130°). Lähtöpiste on silloin koneen takana kuvan yläosassa.
            double psi0 = Psi(0.8), bKiri = Psi(KiriS) + OhitusTheta;
            double bA1 = psi0 - 180.0 + AvausAlfa, bA2 = psi0 - 180.0 - AvausAlfa;
            double bA = Math.Abs(Kulmaero(bKiri, bA1)) <= Math.Abs(Kulmaero(bKiri, bA2)) ? bA1 : bA2;
            double sxA = Kulmaero(bA, psi0 - 180.0) > 0 ? -0.12 : 0.12;   // kone lähtöpisteen vastakkaiselle puolelle
            var kal = new Kanava().Lisaa(0, Alku.Kallistus).Lisaa(AvausS, AvausKallistus).Lisaa(KiriS, 82).Lisaa(OhitusS, 83).Lisaa(OhitusLoppuS, 82)
                .Lisaa(NousuS, 58).Lisaa(SaapuminenS, 66).Lisaa(KosketusS - 0.4, 50).Lisaa(KestoS, Loppu.Kallistus);
            // Laskeutumiskohdan kierto sille puolelle, josta paljastus pohjoinen ylös -näkymään on lyhyempi (kone etuviistosta).
            double bL1 = Psi(KosketusS) - 130, bL2 = Psi(KosketusS) + 130;
            double bLasku = Math.Abs(Kulmaero(bL1, Loppu.Suuntima)) <= Math.Abs(Kulmaero(bL2, Loppu.Suuntima)) ? bL1 : bL2;
            var bt = new[] { 0.0, AvausS, KiriS, OhitusS, OhitusLoppuS, NousuS, SaapuminenS, KosketusS, KestoS };
            var bv = new[]
            {
                Alku.Suuntima, bA, Psi(KiriS) + OhitusTheta, Psi(OhitusS) + OhitusTheta - 1, Psi(OhitusLoppuS) + OhitusTheta - 2,
                Psi(NousuS) - 135, Psi(SaapuminenS) - 172, bLasku, Loppu.Suuntima,
            };
            for (int i = 1; i < bv.Length; i++) bv[i] = bv[i - 1] + Kulmaero(bv[i - 1], bv[i]);
            var suu = new Kanava();
            for (int i = 0; i < bt.Length; i++) suu.Lisaa(bt[i], bv[i]);
            var sx = new Kanava().Lisaa(0, s0x).Lisaa(AvausS, sxA).Lisaa(KiriS, -0.55).Lisaa(OhitusS, -0.05).Lisaa(OhitusLoppuS, 0.40)
                .Lisaa(NousuS, 0.12).Lisaa(SaapuminenS, 0.0).Lisaa(KosketusS, 0.0).Lisaa(KestoS, sfx);
            var sy = new Kanava().Lisaa(0, s0y).Lisaa(AvausS, 0.0).Lisaa(KiriS, 0.06).Lisaa(OhitusS, 0.0).Lisaa(OhitusLoppuS, -0.02)
                .Lisaa(NousuS, 0.15).Lisaa(SaapuminenS, 0.25).Lisaa(KosketusS, 0.0).Lisaa(KestoS, sfy);
            var kw = new Kanava().Lisaa(0, 0).Lisaa(AvausS, 0).Lisaa(KiriS, 1).Lisaa(OhitusLoppuS, 1).Lisaa(NousuS, 0);

            var jK = Jousi(kal, 5.0); var jB = Jousi(suu, 4.5);
            var jX = Jousi(sx, 6.0); var jY = Jousi(sy, 6.0); var jW = Jousi(kw, 6.0);

            double edLat = Alku.Lat, edLon = Alku.Lon, edEt = Alku.EtaisyysM;
            for (int i = 0; i <= N; i++)
            {
                double t = i / (double)Hz;
                double w = S((t - PakotusS) / (KestoS - PakotusS));
                double lnd = jD[i] + (lnD.Arvo(t) - jD[i]) * w;
                double k = Rajaa(jK[i] + (kal.Arvo(t) - jK[i]) * w, 0, 85);
                double b = jB[i] + (suu.Arvo(t) - jB[i]) * w;
                double x = Rajaa(jX[i] + (sx.Arvo(t) - jX[i]) * w, -0.8, 0.8);
                double y = Rajaa(jY[i] + (sy.Arvo(t) - jY[i]) * w, -0.8, 0.8);
                double katseW = Rajaa(jW[i] * (1 - w), 0, 1);

                // Kone tässä näytteessä (koko edellisen näytteen etäisyydestä: heikko kytkös).
                var q = Kohta(kp[i]);
                siipi[i] = Siipivali(edEt);
                kh[i] = PerusKorkeus(t) + Nosto(t, siipi[i]);
                var P = Ecef(q.Lat, q.Lon, kh[i]);
                double katse = katseW * kh[i];

                double la = edLat, lo = edLon;
                if (i == 0) { la = Alku.Lat; lo = Alku.Lon; lnd = Math.Log(Alku.EtaisyysM); k = Alku.Kallistus; b = Alku.Suuntima; katse = Alku.Katse; }
                else if (i == N) { la = Loppu.Lat; lo = Loppu.Lon; lnd = Math.Log(Loppu.EtaisyysM); k = Loppu.Kallistus; b = Loppu.Suuntima; katse = Loppu.Katse; }
                else Ratkaise(P, Math.Exp(lnd), k, b, katse, x, y, ref la, ref lo);
                cLat[i] = la; cLon[i] = lo; cLnD[i] = lnd; cK[i] = k; cB[i] = b; cKatse[i] = katse; cKatseW[i] = katseW;
                edLat = la; edLon = lo;

                var m = Mittaa(t, P, q.Lat, q.Lon, kp[i], siipi[i], new Asento(la, lo, Math.Exp(lnd), k, b, katse));
                mittaus[i] = m;
                edEt = m.EtaisyysM;
            }
        }

        /// <summary>Katsepiste (lat, lon), jolla piste P projisoituu ruudun kohtaan (x, y): Newton kahdella muuttujalla,
        /// numeerinen Jacobi, lähtö edellisestä näytteestä, askelraja puolet näkymän koosta.</summary>
        void Ratkaise(V P, double d, double k, double b, double katse, double x, double y, ref double la, ref double lo)
        {
            double h = d / R * 180.0 / Math.PI * 1e-3;
            for (int it = 0; it < 16; it++)
            {
                if (!Arvioi(P, la, lo, d, k, b, katse, out double fx, out double fy)) break;
                double ex = fx - x, ey = fy - y;
                if (Math.Abs(ex) < 1e-7 && Math.Abs(ey) < 1e-7) break;
                double hl = h / Math.Max(0.2, Math.Cos(la * Math.PI / 180.0));
                Arvioi(P, la + h, lo, d, k, b, katse, out double ax, out double ay);
                Arvioi(P, la, lo + hl, d, k, b, katse, out double ox, out double oy);
                double j11 = (ax - fx) / h, j21 = (ay - fy) / h, j12 = (ox - fx) / hl, j22 = (oy - fy) / hl;
                double det = j11 * j22 - j12 * j21;
                if (Math.Abs(det) < 1e-18) break;
                double dla = (-ex * j22 + ey * j12) / det, dlo = (-ey * j11 + ex * j21) / det;
                double raja = d / R * 180.0 / Math.PI * 0.5;
                double pit = Math.Sqrt(dla * dla + dlo * dlo);
                if (pit > raja) { dla *= raja / pit; dlo *= raja / pit; }
                la = Rajaa(la + dla, -89.0, 89.0); lo += dlo;
            }
        }

        bool Arvioi(V P, double la, double lo, double d, double k, double b, double katse, out double x, out double y) =>
            Projisoi(Kanta(new Asento(la, lo, d, k, b, katse)), P, out x, out y, out _);

        Mittaus Mittaa(double t, V P, double qLat, double qLon, double osuus, double siipiM, Asento a)
        {
            var c = Kanta(a);
            bool edessa = Projisoi(c, P, out double x, out double y, out double z);
            var w = c.Silma - P;
            double et = w.Pituus;
            Kanta(qLat, qLon, out var n, out var pohj, out var ita);
            double psi = SuuntimaReitilla(osuus) * Math.PI / 180.0;
            var eteen = pohj * Math.Cos(psi) + ita * Math.Sin(psi);
            double pysty = V.Dot(w, n);
            var vaaka = w - n * pysty;
            double alfa = vaaka.Pituus < 1e-6 ? 90.0 : Math.Acos(Rajaa(V.Dot(vaaka, eteen) / vaaka.Pituus, -1, 1)) * 180.0 / Math.PI;
            double korotus = Math.Asin(Rajaa(pysty / Math.Max(1e-9, et), -1, 1)) * 180.0 / Math.PI;
            bool nakyy = edessa && Math.Abs(x) <= 1 && Math.Abs(y) <= 1 && !Peitossa(c.Silma, P);
            return new Mittaus
            {
                T = t, X = x, Y = y, Nakyy = nakyy, Koko = edessa ? siipiM / (2 * z * tanH) : 0, Alfa = alfa, Korotus = korotus,
                EtaisyysM = et, KameraKorkeusM = c.Silma.Pituus - R,
            };
        }

        /// <summary>Pallo peittää pisteen Q silmästä (jana leikkaa pallon ennen Q:ta).</summary>
        static bool Peitossa(V silma, V q)
        {
            var d = q - silma;
            double l = d.Pituus;
            var u = d * (1.0 / l);
            double bb = V.Dot(silma, u), cc = V.Dot(silma, silma) - R * R, disk = bb * bb - cc;
            if (disk <= 0) return false;
            double s1 = -bb - Math.Sqrt(disk);
            return s1 > 0 && s1 < l - 50.0;
        }

        // ====================================================================================================================
        // Julkinen rajapinta (Nappula)
        // ====================================================================================================================

        static double Lerp(double[] a, double t)
        {
            double x = Rajaa(t, 0, KestoS) * Hz;
            int i = Math.Min(N - 1, (int)x);
            return a[i] + (a[i + 1] - a[i]) * (x - i);
        }

        /// <summary>Kameran asento hetkellä t (PalloKierto.Kuvaa); lisa = koneen maastolisä (m), joka nostaa lähikuvien katsetta.</summary>
        public Asento Kamera(double t, double lisa = 0.0)
        {
            double x = Rajaa(t, 0, KestoS) * Hz;
            int i = Math.Min(N - 1, (int)x);
            double f = x - i;
            double lo = cLon[i] + Kulmaero(cLon[i], cLon[i + 1]) * f;
            return new Asento(cLat[i] + (cLat[i + 1] - cLat[i]) * f, Normalisoi180(lo), Math.Exp(cLnD[i] + (cLnD[i + 1] - cLnD[i]) * f),
                cK[i] + (cK[i + 1] - cK[i]) * f, Normalisoi(cB[i] + (cB[i + 1] - cB[i]) * f),
                cKatse[i] + (cKatse[i + 1] - cKatse[i]) * f + lisa * (cKatseW[i] + (cKatseW[i + 1] - cKatseW[i]) * f));
        }

        /// <summary>Koneen reittiosuus 0–1 (monotoninen, 1 pysähdyksestä alkaen).</summary>
        public double KoneenOsuus(double t) => Lerp(kp, t);
        /// <summary>Koneen korkeus ilman maastolisää (m): peruskorkeus + symbolisen koon nosto.</summary>
        public double KoneenKorkeus(double t) => Lerp(kh, t);
        /// <summary>Symbolinen siipiväli (m).</summary>
        public double Siipi(double t) => Lerp(siipi, t);
        /// <summary>Maastolisän paino (nousun jälkeen 1, laskussa kohteen maahan).</summary>
        public static double LisanPaino(double t) => S((t - 0.6) / 3.4) * (1 - S((t - 10.2) / (KosketusS - 10.2)));
        /// <summary>Lento v3:n aikaan kuvattu hetki (Elo, nokka, kierrokset): kosketus 13,2 s ↔ v3:n 14,3 s.</summary>
        public static double V3Aika(double t) =>
            t <= 9.0 ? t : Math.Min(LennonV3.KestoS, 9.0 + (t - 9.0) * (LennonV3.KosketusS - 9.0) / (KosketusS - 9.0));

        /// <summary>Mittaus näytteestä lähinnä hetkeä t (testit ja loki).</summary>
        public Mittaus Mitta(double t) => mittaus[Math.Min(N, Math.Max(0, (int)Math.Round(t * Hz)))];

        /// <summary>Pisteen (lat, lon, h) ruutupaikka hetkellä t (testit: lähtöpiste ja kohde kuvassa).</summary>
        public bool Ruudussa(double t, double lat, double lon, double h, out double x, out double y)
        {
            var c = Kanta(Kamera(t));
            var q = Ecef(lat, lon, h);
            bool ok = Projisoi(c, q, out x, out y, out _);
            return ok && Math.Abs(x) <= 1 && Math.Abs(y) <= 1 && !Peitossa(c.Silma, q);
        }

        // ---- Reitti ----

        public (double Lat, double Lon) Kohta(double u) => LennonV3.Isoympyralla(Lat0, Lon0, Lat1, Lon1, Rajaa(u, 0, 1));
        double OsuusNaytteesta(double t) => kp[Math.Min(N, Math.Max(0, (int)Math.Round(t * Hz)))];

        public double SuuntimaReitilla(double u)
        {
            u = Rajaa(u, 0, 0.999);
            var a = Kohta(u); var b = Kohta(Math.Min(1.0, u + 0.001));
            return LennonV3.Suuntima(a.Lat, a.Lon, b.Lat, b.Lon);
        }

        /// <summary>Reitin isoympyrä pisteinä (käytävä ja maastokysely odotuksen alussa).</summary>
        public static List<(double Lat, double Lon)> Isoympyra(double lat0, double lon0, double lat1, double lon1, int n = 96)
        {
            var p = new List<(double, double)>(n + 1);
            for (int i = 0; i <= n; i++) p.Add(LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, (double)i / n));
            return p;
        }

        /// <summary>
        /// Lennon laatat (LennonV3Kaytava.Laatta): ALKU (odotus odottaa) = koko reitin matkanäkymä Z4–Z5 ±1, lähtömaa Z6 ±1 ja
        /// ohituksen lähikuva Z7–Z9 ±1 (reitin puolivälin ±15 km); LOPUT = kohteen lasku Z7–Z9 ±1 viimeiseltä 80 km:ltä ja
        /// Z6 ±1 reitin loppukymmenykseltä. Aloitusnäytön esilämmitys ottaa näistä Z8–Z9 (ohitus ja kohde).
        /// </summary>
        public static List<LennonV3Kaytava.Laatta> Laatat(double lat0, double lon0, double lat1, double lon1)
        {
            var tulos = new List<LennonV3Kaytava.Laatta>();
            var nahty = new HashSet<long>();
            double L = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            void Lisaa(double u, bool alku, params int[] tasot)
            {
                var q = LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, Rajaa(u, 0, 1));
                foreach (int z in tasot) LennonV3Kaytava.Lisaa(tulos, nahty, q.Lat, q.Lon, z, 1, alku);
            }
            for (int i = -2; i <= 2; i++) Lisaa(OhitusOsuus + i * 7_500.0 / L, true, 7, 8, 9);
            for (int i = 0; i <= 40; i++) Lisaa(i / 40.0, true, 4, 5);
            for (int i = 0; i <= 4; i++) Lisaa(i * 0.02, true, 6);
            for (int i = 0; i <= 10; i++) Lisaa(1 - i * 0.01, false, 6);
            for (int i = 0; i <= 2; i++) Lisaa(1 - i * 40_000.0 / L, false, 7, 8, 9);
            return tulos;
        }

        // ====================================================================================================================
        // Pallomalli
        // ====================================================================================================================

        struct V
        {
            public double X, Y, Z;
            public V(double x, double y, double z) { X = x; Y = y; Z = z; }
            public static V operator +(V a, V b) => new V(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
            public static V operator -(V a, V b) => new V(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
            public static V operator *(V a, double s) => new V(a.X * s, a.Y * s, a.Z * s);
            public static double Dot(V a, V b) => a.X * b.X + a.Y * b.Y + a.Z * b.Z;
            public static V Cross(V a, V b) => new V(a.Y * b.Z - a.Z * b.Y, a.Z * b.X - a.X * b.Z, a.X * b.Y - a.Y * b.X);
            public double Pituus => Math.Sqrt(X * X + Y * Y + Z * Z);
        }

        struct Kamerakanta { public V Silma, Eteen, Oikea, Ylos; }

        static V Ecef(double lat, double lon, double h)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180, r = R + h;
            return new V(r * Math.Cos(f) * Math.Cos(l), r * Math.Cos(f) * Math.Sin(l), r * Math.Sin(f));
        }

        static void Kanta(double lat, double lon, out V ylos, out V pohj, out V ita)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            ylos = new V(Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f));
            pohj = new V(-Math.Sin(f) * Math.Cos(l), -Math.Sin(f) * Math.Sin(l), Math.Cos(f));
            ita = new V(-Math.Sin(l), Math.Cos(l), 0.0);
        }

        /// <summary>Kamera kuten PalloKierto.LaskeAsento (pallolla, ilman maaston rakoa).</summary>
        static Kamerakanta Kanta(Asento a)
        {
            Kanta(a.Lat, a.Lon, out var ylos, out var pohj, out var ita);
            var L = ylos * (R + a.Katse);
            double b = a.Suuntima * Math.PI / 180, k = a.Kallistus * Math.PI / 180;
            var eteen = pohj * Math.Cos(b) + ita * Math.Sin(b);
            var silmaan = ylos * Math.Cos(k) - eteen * Math.Sin(k);
            var f = silmaan * -1.0;
            var u = eteen * Math.Cos(k) + ylos * Math.Sin(k);
            return new Kamerakanta { Silma = L + silmaan * a.EtaisyysM, Eteen = f, Ylos = u, Oikea = V.Cross(f, u) };
        }

        bool Projisoi(Kamerakanta c, V q, out double x, out double y, out double z)
        {
            var v = q - c.Silma;
            z = V.Dot(v, c.Eteen);
            if (z <= 1.0) { x = y = double.NaN; return false; }
            x = V.Dot(v, c.Oikea) / (z * tanH);
            y = V.Dot(v, c.Ylos) / (z * tanV);
            return true;
        }

        // ---- Apurit ----

        static double S(double x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * x * (x * (x * 6 - 15) + 10); }
        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        static double Normalisoi(double a) { a %= 360.0; return a < 0 ? a + 360.0 : a; }
        static double Normalisoi180(double a) { a = Normalisoi(a + 180.0); return a - 180.0; }
        static double Kulmaero(double a, double b) => LennonV3.Kulmaero(a, b);
    }
}
