using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// LENTO V3 — SAAPUMISLENTO RETRO-KAKSITASOLLA (omistaja hyväksyi 26.9.2026 klo 23.5x; speksi
    /// docs/raportit/lento-v3-speksi.md, Linssiseppä: koneen malli ja kamera; Natiiviseppä: esilatauskäytävä, kytkin
    /// `lento v3 0|1` ja Nappulan v3-haara). Puhdas laskenta ilman UnityEngineä (Kartta-testit):
    ///   - Yksi yhtenäinen 15 s:n otos lennon viimeisestä osuudesta: näkyvä matka L = min(reitti, 600 km) (<see cref="NakyvaM"/>).
    ///   - Kamera viitenä kanavana avainkehyksistä (<see cref="Avaimet"/>, Ateena-referenssi L = 588 km): etäisyys koneeseen
    ///     logaritmisena, kuvauskulma θ lentosuunnasta (0 takaa, 90 kyljeltä vasemmalta, 180 edestä), korkeuskulma koneesta
    ///     kameraan, kuvakulma (fov, pysty) ja katsepisteen siirtymä koneesta kohti kaupunkia. Käyrät ovat viidennen asteen
    ///     Hermite-paloja (nopeus ja kiihtyvyys jatkuvia), joten nykäyksiä ei tule; 0 s ei ole lepoavain (kamera liukuu
    ///     heti) ja 15 s on lepo.
    ///   - Koneen nopeus on sidottu kameraan, ei fysiikkaan (<see cref="NopeusProfiili"/>, ∫ = 8,27 s): lähikuvassa 7 %
    ///     huipusta, S-käyrällä 100 %:iin 2–8 s, 100 % 8–11 s, 35 %:iin 13,5 s:iin, 12 %:iin kosketukseen 14,3 s ja
    ///     pysähdys 15 s. Kaukokuvan etäisyys skaalautuu reitin pituuden mukaan (36–80 km), joten maa virtaa kaikilla
    ///     reiteillä samalla kulmanopeudella.
    ///   - Lähestymisreitti (omistaja 23.5x: kaupungin kuvauslinja): Ateena Dernasta Antikytheran ja Aeginan kautta
    ///     (<see cref="Lahestymiset"/>), muut aloituskaupungit maisemasuunnastaan (LennonAikajana.Kaupungit) loivalla
    ///     S-mutkalla, muut kohteet todellisen lentosuunnan loppuosana.
    ///   - Koneen korkeus 3,5 km (lasku 11,5 s:sta, kosketus 14,3 s, rullaus), kallistus kaarroksissa 1° / (°/s)
    ///     enintään ±22° 0,3 s ennakoiden, ja EI MONOTONIAA -vaihtelu siemenestä (<see cref="Elo"/>).
    /// </summary>
    public static class LennonV3
    {
        public const double KestoS = 15.0, NakyvaEnintaanM = 600_000.0, R = 6371000.0;
        /// <summary>Koneen korkeus matkalla (m) ja kuvakulma (pysty, astetta; webin PALLO_FOV, usva ja nimiladonta lukevat sitä).</summary>
        public const double MatkaKorkeusM = 3500.0, Fov = 50.0;
        /// <summary>Lasku: liuku alkaa, nokka ylös, kosketus (s).</summary>
        public const double LaskuAlkaaS = 11.5, OikaisuS = 13.8, KosketusS = 14.3;
        /// <summary>Kallistus kaarroksissa: astetta per suuntiman muutos (°/s), raja ja ennakointi (s).</summary>
        public const double KallistusKerroin = 1.0, KallistusRaja = 22.0, KallistusEnnakko = 0.3;

        /// <summary>Kameran avain: aika, etäisyys koneeseen (km), kuvauskulma θ (°), korkeuskulma koneesta (°) ja
        /// kaukoskaalan paino (0 = ei skaalaudu reitin pituuden mukaan, 1 = täysin).</summary>
        public readonly struct Avain
        {
            public readonly double T, EtaisyysKm, Theta, Korkeuskulma, Skaala;
            public Avain(double t, double etaisyysKm, double theta, double korkeuskulma, double skaala)
            { T = t; EtaisyysKm = etaisyysKm; Theta = theta; Korkeuskulma = korkeuskulma; Skaala = skaala; }
        }

        /// <summary>
        /// Ateena-referenssin avaimet (speksin kohta 1): etäisyys 20 → 23 → 46 → 80 → 80 → 55 → 45 km, θ 115° (etuviisto kylki)
        /// → 50° (takaviisto), korkeuskulma 12° → 14° (kamera 7,7–18 km merestä, katse −11…−16°). Kaukoavainten etäisyys
        /// skaalautuu reitin pituuden mukaan (<see cref="Kaukoskaala"/>), lähikuva ei.
        /// </summary>
        public static readonly Avain[] Avaimet =
        {
            new Avain(0.0, 20, 115, 12.1, 0.0),
            new Avain(2.0, 23, 106, 12.0, 0.0),
            new Avain(5.0, 46, 88, 10.6, 0.5),
            new Avain(8.0, 80, 68, 9.7, 1.0),
            new Avain(11.0, 80, 62, 10.4, 1.0),
            new Avain(13.5, 55, 50, 13.5, 1.0),
            new Avain(15.0, 45, 50, 14.1, 1.0),
        };

        /// <summary>Näkyvä osuus reitistä: viimeiset enintään 600 km (pitkän reitin alku jää ennen ensimmäistä kuvaa).</summary>
        public static double NakyvaM(double reittiM) => Math.Max(1000.0, Math.Min(reittiM, NakyvaEnintaanM));

        /// <summary>Kaukokuvan etäisyyskerroin: 80 km × L / 600 km, kuitenkin 36–80 km (kerroin 0,45–1).</summary>
        public static double Kaukoskaala(double reittiM) => Rajaa(NakyvaM(reittiM) / NakyvaEnintaanM, 0.45, 1.0);

        /// <summary>Kameran kehys hetkellä t.</summary>
        public struct Kehys
        {
            /// <summary>Etäisyys koneeseen (m), kuvauskulma θ lentosuunnasta (°, 0 takaa, 90 vasemmalta, 180 edestä),
            /// korkeuskulma koneesta kameraan (°), kuvakulma (°) ja katsepisteen siirtymä koneesta kohti kaupunkia (0–0,3).</summary>
            public double EtaisyysM, Theta, Korkeuskulma, Fov, KatseKaupunkiin;
        }

        /// <summary>Kamera hetkellä t (0–15 s) reitin pituudella reittiM: viidennen asteen Hermite-palat avainten välissä.</summary>
        public static Kehys Kamera(double t, double reittiM)
        {
            t = Rajaa(t, 0, KestoS);
            double s = Kaukoskaala(reittiM);
            int i = Pala(t);
            var a = Avaimet[i]; var b = Avaimet[i + 1];
            double h = b.T - a.T, u = (t - a.T) / h;
            double LnE(int k) => Math.Log(Avaimet[k].EtaisyysKm * Math.Pow(s, Avaimet[k].Skaala));
            double ln = Hermite5(u, h, LnE(i), LnE(i + 1), Derivaatta(i, LnE), Derivaatta(i + 1, LnE));
            double th = Hermite5(u, h, a.Theta, b.Theta, Derivaatta(i, k => Avaimet[k].Theta), Derivaatta(i + 1, k => Avaimet[k].Theta));
            double kk = Hermite5(u, h, a.Korkeuskulma, b.Korkeuskulma, Derivaatta(i, k => Avaimet[k].Korkeuskulma), Derivaatta(i + 1, k => Avaimet[k].Korkeuskulma));
            return new Kehys
            {
                EtaisyysM = Math.Exp(ln) * 1000.0, Theta = th, Korkeuskulma = kk, Fov = Fov,
                KatseKaupunkiin = 0.3 * Pehmea((t - 13.0) / 2.0),
            };
        }

        /// <summary>Kameran korkeus merenpinnasta (m): koneen korkeus + etäisyys · sin(korkeuskulma).</summary>
        public static double KameranKorkeusM(double t, double reittiM)
        {
            var k = Kamera(t, reittiM);
            return KoneenKorkeusM(t) + k.EtaisyysM * Math.Sin(k.Korkeuskulma * Math.PI / 180.0);
        }

        static int Pala(double t)
        {
            for (int i = 0; i + 2 < Avaimet.Length; i++) if (t < Avaimet[i + 1].T) return i;
            return Avaimet.Length - 2;
        }

        /// <summary>Kanavan derivaatta avaimessa k: keskusero (Catmull-Rom epätasavälisenä), alussa etuero (kamera liukuu heti)
        /// ja lopussa 0 (lepo).</summary>
        static double Derivaatta(int k, Func<int, double> arvo)
        {
            int n = Avaimet.Length;
            if (k == n - 1) return 0.0;
            if (k == 0) return (arvo(1) - arvo(0)) / (Avaimet[1].T - Avaimet[0].T);
            // 8–11 s ajelehdinta: kaukoavainten välillä sama arvo → derivaatta pieni mutta jatkuva.
            return (arvo(k + 1) - arvo(k - 1)) / (Avaimet[k + 1].T - Avaimet[k - 1].T);
        }

        /// <summary>Viidennen asteen Hermite (arvot, derivaatat, toiset derivaatat 0 päissä): u 0–1, h palan kesto.</summary>
        static double Hermite5(double u, double h, double p0, double p1, double v0, double v1)
        {
            double u2 = u * u, u3 = u2 * u, u4 = u3 * u, u5 = u4 * u;
            double h00 = 1 - 10 * u3 + 15 * u4 - 6 * u5, h10 = u - 6 * u3 + 8 * u4 - 3 * u5;
            double h01 = 10 * u3 - 15 * u4 + 6 * u5, h11 = -4 * u3 + 7 * u4 - 3 * u5;
            return h00 * p0 + h10 * h * v0 + h01 * p1 + h11 * h * v1;
        }

        // ---- Koneen nopeus ja paikka reitillä ----

        /// <summary>Nopeusprofiili f(t) osuutena huipusta (speksi kohta 2), pehmeät siirtymät (smootherstep).</summary>
        public static double NopeusProfiili(double t)
        {
            if (t <= 2.0) return 0.07;
            if (t <= 8.0) return 0.07 + 0.93 * Pehmea((t - 2.0) / 6.0);
            if (t <= 11.0) return 1.0;
            if (t <= 13.5) return 1.0 - 0.65 * Pehmea((t - 11.0) / 2.5);
            if (t <= KosketusS) return 0.35 - 0.23 * Pehmea((t - 13.5) / (KosketusS - 13.5));
            if (t < KestoS) return 0.12 * (1.0 - Pehmea((t - KosketusS) / (KestoS - KosketusS)));
            return 0.0;
        }

        const int Naytteita = 1500;
        static double[] integraali;

        /// <summary>∫₀¹⁵ f (s): noin 8,27 s.</summary>
        public static double ProfiilinIntegraali { get { Taulukoi(); return integraali[Naytteita]; } }

        static void Taulukoi()
        {
            if (integraali != null) return;
            var a = new double[Naytteita + 1];
            double dt = KestoS / Naytteita;
            for (int i = 1; i <= Naytteita; i++)
                a[i] = a[i - 1] + 0.5 * (NopeusProfiili((i - 1) * dt) + NopeusProfiili(i * dt)) * dt;
            integraali = a;
        }

        /// <summary>Koneen osuus näkyvästä matkasta hetkellä t (0 → 1, monotoninen).</summary>
        public static double KoneenOsuus(double t)
        {
            Taulukoi();
            t = Rajaa(t, 0, KestoS);
            double x = t / KestoS * Naytteita;
            int i = Math.Min(Naytteita - 1, (int)x);
            double w = x - i;
            return (integraali[i] + (integraali[i + 1] - integraali[i]) * w) / integraali[Naytteita];
        }

        /// <summary>Koneen maanopeus (m/s) hetkellä t reitin pituudella reittiM: L · f(t) / ∫f.</summary>
        public static double NopeusMs(double t, double reittiM) => NakyvaM(reittiM) * NopeusProfiili(t) / ProfiilinIntegraali;

        /// <summary>Koneen korkeus merenpinnasta (m): 3,5 km, liuku 11,5 s:sta kosketukseen (14,3 s) pehmeästi, sitten maassa.</summary>
        public static double KoneenKorkeusM(double t)
        {
            if (t <= LaskuAlkaaS) return MatkaKorkeusM;
            if (t >= KosketusS) return 0.0;
            double u = (t - LaskuAlkaaS) / (KosketusS - LaskuAlkaaS);
            // Liuku ja oikaisu: laskeutuminen hidastuu kosketusta kohti (oikaisu 13,8–14,3 s).
            return MatkaKorkeusM * (1.0 - Pehmea(Math.Pow(u, 0.85)));
        }

        /// <summary>Nokan kulma (°, + ylös): liuku −3°, oikaisu 13,8–14,3 s +5° ja rullauksessa kannusasento +11°.</summary>
        public static double NokanKulma(double t)
        {
            if (t < LaskuAlkaaS) return 0.0;
            if (t < OikaisuS) return -3.0 * Pehmea((t - LaskuAlkaaS) / 0.6);
            if (t < KosketusS) return -3.0 + 8.0 * Pehmea((t - OikaisuS) / (KosketusS - OikaisuS));
            return 5.0 + 6.0 * Pehmea((t - KosketusS) / 0.5);
        }

        // ---- Lähestymisreitti ----

        /// <summary>Käsin piirretyt kuvauslinjat (lat, lon) lähtöpisteestä kaupunkiin (kaupunkia ei listassa).</summary>
        public static readonly Dictionary<string, (double Lat, double Lon)[]> Lahestymiset = new Dictionary<string, (double, double)[]>
        {
            // Ateena: Kyrenaikan rannikolta (Derna) pohjoiseen Välimeren yli, Antikytheran salmi, Aeginan itäpuoli (speksi 1–2).
            ["ateena"] = new[] { (32.80, 22.60), (35.85, 23.28), (37.70, 23.52) },
        };

        /// <summary>
        /// Reitin pisteet lähtöpisteestä kaupunkiin (lat, lon): Lahestymiset-taulukosta, muuten aloituskaupungin maisemasuunnasta
        /// (kone lentää maisemasuuntaan kohti kaupunkia, loiva S-mutka ±2 % L) tai todellisen lentosuunnan loppuosasta
        /// (lähtö → kohde, viimeiset L).
        /// </summary>
        public static List<(double Lat, double Lon)> Reitti(string kohde, double lat0, double lon0, double lat1, double lon1)
        {
            var pisteet = new List<(double, double)>();
            if (kohde != null && Lahestymiset.TryGetValue(kohde, out var kasin))
            {
                pisteet.AddRange(kasin);
                pisteet.Add((lat1, lon1));
                return Leikkaa(pisteet, NakyvaEnintaanM);
            }
            double reitti = LennonAikajana.ReittiM(lat0, lon0, lat1, lon1);
            double L = NakyvaM(reitti);
            double suunta;
            if (kohde != null && LennonAikajana.Kaupungit.TryGetValue(kohde, out var maisema) && !double.IsNaN(maisema.Suunta))
                suunta = maisema.Suunta;
            else
                suunta = Suuntima(lat1, lon1, lat0, lon0) + 180.0;   // saapumissuunta todellisesta reitistä
            // Lähtöpiste L:n päässä vastakkaisesta suunnasta, S-mutka kahdella välipisteellä (±2 % L sivulle).
            var alku = Kohta(lat1, lon1, suunta + 180.0, L);
            var v1 = Kohta(lat1, lon1, suunta + 180.0, L * 0.66); var v2 = Kohta(lat1, lon1, suunta + 180.0, L * 0.33);
            v1 = Kohta(v1.Lat, v1.Lon, suunta + 90.0, 0.02 * L);
            v2 = Kohta(v2.Lat, v2.Lon, suunta - 90.0, 0.02 * L);
            pisteet.Add(alku); pisteet.Add(v1); pisteet.Add(v2); pisteet.Add((lat1, lon1));
            return pisteet;
        }

        /// <summary>Reitin viimeiset enintään L metriä (pitkä käsin piirretty reitti leikataan alusta).</summary>
        static List<(double Lat, double Lon)> Leikkaa(List<(double Lat, double Lon)> p, double L)
        {
            double yht = 0;
            for (int i = 1; i < p.Count; i++) yht += Etaisyys(p[i - 1], p[i]);
            if (yht <= L) return p;
            double pois = yht - L;
            var tulos = new List<(double, double)>();
            for (int i = 1; i < p.Count; i++)
            {
                double d = Etaisyys(p[i - 1], p[i]);
                if (pois > d) { pois -= d; continue; }
                tulos.Add(Kohta(p[i - 1].Lat, p[i - 1].Lon, Suuntima(p[i - 1].Lat, p[i - 1].Lon, p[i].Lat, p[i].Lon), pois));
                for (int j = i; j < p.Count; j++) tulos.Add(p[j]);
                break;
            }
            return tulos;
        }

        /// <summary>Paikka ja suunta reitillä osuudessa u (0–1) kaarenpituuden mukaan; kulmat pyöristetty (kaarre 30–60 km:n
        /// säteellä, tässä lineaarinen interpolaatio suuntimassa ±0,06 osuuden ikkunassa, jotta kallistus on jatkuva).</summary>
        public static (double Lat, double Lon, double Suunta) ReitinKohta(List<(double Lat, double Lon)> p, double u)
        {
            double yht = 0;
            var pit = new double[p.Count];
            for (int i = 1; i < p.Count; i++) { yht += Etaisyys(p[i - 1], p[i]); pit[i] = yht; }
            double s = Rajaa(u, 0, 1) * yht;
            int k = 1;
            while (k < p.Count - 1 && pit[k] < s) k++;
            double w = (s - pit[k - 1]) / Math.Max(1e-9, pit[k] - pit[k - 1]);
            double sv = Suuntima(p[k - 1].Lat, p[k - 1].Lon, p[k].Lat, p[k].Lon);
            var q = Kohta(p[k - 1].Lat, p[k - 1].Lon, sv, w * (pit[k] - pit[k - 1]));
            // Suunnan pehmennys taitteessa: sekoitus seuraavan/edellisen osan suuntimaan 20 km:n matkalla taitteen molemmin puolin.
            double pehmennys = 20_000.0;
            double suunta = sv;
            if (k < p.Count - 1 && pit[k] - s < pehmennys)
            {
                double seur = Suuntima(p[k].Lat, p[k].Lon, p[k + 1].Lat, p[k + 1].Lon);
                suunta = sv + 0.5 * Pehmea(1.0 - (pit[k] - s) / pehmennys) * Kulmaero(sv, seur);
            }
            else if (k > 1 && s - pit[k - 1] < pehmennys)
            {
                double edel = Suuntima(p[k - 2].Lat, p[k - 2].Lon, p[k - 1].Lat, p[k - 1].Lon);
                suunta = sv - 0.5 * Pehmea(1.0 - (s - pit[k - 1]) / pehmennys) * Kulmaero(edel, sv);
            }
            return (q.Lat, q.Lon, Normalisoi(suunta));
        }

        /// <summary>Kallistus (°, + oikealle) hetkellä t: suuntiman muutosnopeus 0,3 s eteenpäin katsottuna × 1 °/(°/s),
        /// enintään ±22°, ja kosketuksen jälkeen 0.</summary>
        public static double Kallistus(List<(double Lat, double Lon)> reitti, double t)
        {
            if (t >= KosketusS) return 0.0;
            double te = Math.Min(KestoS, t + KallistusEnnakko), dt = 0.1;
            double s0 = ReitinKohta(reitti, KoneenOsuus(te)).Suunta, s1 = ReitinKohta(reitti, KoneenOsuus(Math.Min(KestoS, te + dt))).Suunta;
            double nopeus = Kulmaero(s0, s1) / dt;
            return Rajaa(nopeus * KallistusKerroin, -KallistusRaja, KallistusRaja);
        }

        // ---- EI MONOTONIAA (speksi kohta 4): vaihtelu siemenestä, sama lento aina sama ----

        /// <summary>Koneen elävyys hetkellä t: pystyheilunta (osuutena siipivälistä), kallistus-, nokka- ja sivuheilahdus (°)
        /// ja potkurin kierrosten kerroin. Puuskat 3–6 s välein (5 % siipivälistä 0,7 s:ssa, vaimeneva jousi 1,2 Hz).</summary>
        public static (double Pysty, double Kallistus, double Nokka, double Sivu, double Kierrokset) Elo(double t, int siemen)
        {
            double A(int k) => Arpa(siemen, 0, k);
            double pysty = 0.02 * Math.Sin(2 * Math.PI * (0.35 + 0.25 * A(1)) * t + 6.28 * A(2));
            double kall = 1.5 * Math.Sin(2 * Math.PI * (0.25 + 0.2 * A(3)) * t + 6.28 * A(4));
            double laajuus = 0.6 + 0.4 * (0.5 + 0.5 * Math.Sin(2 * Math.PI * 0.07 * t + 6.28 * A(5)));
            double nokka = 0.8 * laajuus * Math.Sin(2 * Math.PI * 0.3 * t + 6.28 * A(6));
            double sivu = 1.2 * laajuus * Math.Sin(2 * Math.PI * 0.17 * t + 6.28 * A(7));
            // Puuskat: alkuhetket kumulatiivisesti 3–6 s välein siemenestä.
            double alku = 1.5 + 2.0 * A(8);
            for (int n = 0; n < 8 && alku < t + 0.01; n++)
            {
                double dt = t - alku;
                if (dt >= 0 && dt < 3.0)
                {
                    double suunta = Arpa(siemen, n, 9) < 0.5 ? -1 : 1;
                    double jousi = Math.Exp(-dt * 1.6) * Math.Sin(2 * Math.PI * 1.2 * dt);
                    pysty += 0.05 * suunta * Math.Sin(Math.PI * Math.Min(1.0, dt / 0.7)) * Math.Exp(-dt * 1.2);
                    kall += 4.0 * suunta * jousi;
                }
                alku += 3.0 + 3.0 * Arpa(siemen, n, 10);
            }
            // Kierrokset: hidas ±3 %, kaasu +8 % 2–4 s, −35 % 11,5–14 s, tyhjäkäynti −60 % kosketuksesta.
            double kierr = 1.0 + 0.03 * Math.Sin(2 * Math.PI * 0.1 * t + 6.28 * A(11));
            kierr += 0.08 * Pehmea((t - 2.0) / 0.5) * (1.0 - Pehmea((t - 3.5) / 0.5));
            kierr -= 0.35 * Pehmea((t - 11.5) / 1.0);
            if (t >= KosketusS) kierr = Math.Max(0.4, kierr - 0.25 * Pehmea((t - KosketusS) / 0.4));
            if (t >= KosketusS) { pysty *= 0.1; kall *= 0.1; nokka *= 0.2; sivu *= 0.3; }
            return (pysty, kall, nokka, sivu, kierr);
        }

        // ---- Apurit ----

        static double Arpa(int siemen, int n, int k)
        {
            unchecked
            {
                uint h = (uint)siemen * 0x9E3779B1u ^ (uint)n * 0x85EBCA77u ^ (uint)k * 0xC2B2AE3Du;
                h ^= h >> 16; h *= 0x7FEB352Du; h ^= h >> 15; h *= 0x846CA68Bu; h ^= h >> 16;
                return (h & 0xFFFFFF) / 16777216.0;
            }
        }

        static double Pehmea(double x) { x = Rajaa(x, 0, 1); return x * x * x * (x * (x * 6 - 15) + 10); }
        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        static double Normalisoi(double a) { a %= 360.0; return a < 0 ? a + 360.0 : a; }
        /// <summary>Etumerkillinen kulmaero a → b (−180…180).</summary>
        public static double Kulmaero(double a, double b) { double d = Normalisoi(b - a); return d > 180 ? d - 360 : d; }

        static double Etaisyys((double Lat, double Lon) a, (double Lat, double Lon) b) => LennonAikajana.ReittiM(a.Lat, a.Lon, b.Lat, b.Lon);

        /// <summary>Alkusuuntima pisteestä 0 pisteeseen 1 (° pohjoisesta myötäpäivään).</summary>
        public static double Suuntima(double lat0, double lon0, double lat1, double lon1)
        {
            double f0 = lat0 * Math.PI / 180, f1 = lat1 * Math.PI / 180, dl = (lon1 - lon0) * Math.PI / 180;
            double y = Math.Sin(dl) * Math.Cos(f1), x = Math.Cos(f0) * Math.Sin(f1) - Math.Sin(f0) * Math.Cos(f1) * Math.Cos(dl);
            return Normalisoi(Math.Atan2(y, x) * 180 / Math.PI);
        }

        /// <summary>Piste etäisyydellä d (m) suuntimaan (°) isoympyrää pitkin.</summary>
        public static (double Lat, double Lon) Kohta(double lat, double lon, double suuntima, double d)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180, th = suuntima * Math.PI / 180, dr = d / R;
            double f2 = Math.Asin(Math.Sin(f) * Math.Cos(dr) + Math.Cos(f) * Math.Sin(dr) * Math.Cos(th));
            double l2 = l + Math.Atan2(Math.Sin(th) * Math.Sin(dr) * Math.Cos(f), Math.Cos(dr) - Math.Sin(f) * Math.Sin(f2));
            return (f2 * 180 / Math.PI, (l2 * 180 / Math.PI + 540) % 360 - 180);
        }
    }
}
