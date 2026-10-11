// EUROOPPA-LOITONNUS (Kartta/EurooppaLoitonnus.cs; omistaja 11.10.2026, juna 182, kuumailmapallojen kohta c): pelaajan katto
// sallii koko Euroopan iPhonella ja iPadilla, huntu ei katoa Euroopan korkeudella, rajojen kynnys ja peitto, panorointi,
// pallojen koko kaukana ja laattamäärän arvio.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class EurooppaLoitonnusTestit
    {
        internal const double R = 6378137.0, Fov = 50.0, Rad = Math.PI / 180.0;
        // Laitteet pisteinä (leveys, korkeus, pistekerroin): iPhone 17 Pro pysty, iPad Air 11" pysty ja vaaka.
        internal static readonly (string Nimi, double W, double H, double K)[] Laitteet =
        {
            ("iPhone pysty", 402, 874, 3), ("iPad pysty", 820, 1180, 2), ("iPad vaaka", 1180, 820, 2),
        };
        // Euroopan reunakaupungit ja pallokaupungit (lat, lon).
        static readonly (string Nimi, double Lat, double Lon)[] Kaupungit =
        {
            ("Reykjavík", 64.15, -21.94), ("Lissabon", 38.72, -9.14), ("Moskova", 55.76, 37.62), ("Nikosia", 35.17, 33.36),
            ("Nordkapp", 71.17, 25.78), ("Pariisi", 48.857, 2.352), ("Tukholma", 59.33, 18.07), ("Ateena", 37.98, 23.73),
        };

        /// <summary>Näkyykö piste kamerassa, joka katsoo Euroopan keskipistettä korkeudelta h (säteinä), pohjoinen ylös.</summary>
        internal static bool Kuvassa(double lat, double lon, double h, double kuvasuhde)
        {
            double d = 1 + h, la = EurooppaLoitonnus.KeskiLat * Rad, lo = EurooppaLoitonnus.KeskiLon * Rad;
            double[] c = { Math.Cos(la) * Math.Cos(lo), Math.Cos(la) * Math.Sin(lo), Math.Sin(la) };
            double[] e = { -Math.Sin(lo), Math.Cos(lo), 0 };
            double[] n = { -Math.Sin(la) * Math.Cos(lo), -Math.Sin(la) * Math.Sin(lo), Math.Cos(la) };
            double[] p = { Math.Cos(lat * Rad) * Math.Cos(lon * Rad), Math.Cos(lat * Rad) * Math.Sin(lon * Rad), Math.Sin(lat * Rad) };
            double pc = p[0] * c[0] + p[1] * c[1] + p[2] * c[2];
            if (pc < 1 / d) return false;
            double[] v = { p[0] - d * c[0], p[1] - d * c[1], p[2] - d * c[2] };
            double z = d - pc, x = v[0] * e[0] + v[1] * e[1], y = v[0] * n[0] + v[1] * n[1] + v[2] * n[2];
            double tanV = Math.Tan(Fov / 2 * Rad);
            return Math.Abs(y) / z <= tanV && Math.Abs(x) / z <= tanV * kuvasuhde;
        }

        /// <summary>PalloKierto.KokoPallonKorkeus (metreinä): r / sin(kapeampi puolikulma × 0,92) − r.</summary>
        internal static double KokoPallo(double kuvasuhde)
        {
            double pysty = Fov / 2 * Rad, vaaka = Math.Atan(Math.Tan(pysty) * kuvasuhde);
            return R / Math.Sin(Math.Min(pysty, vaaka) * 0.92) - R;
        }

        [Testi]
        static void KattoSalliiKokoEuroopan()
        {
            const double maanKatto = 2_200_000; // esim. Ranskan saapumisnäkymän katto
            foreach (var l in Laitteet)
            {
                double a = l.W / l.H, sovitus = EurooppaLoitonnus.SovitusKorkeus(Fov, a);
                Oleta.Tosi(sovitus > 0 && !double.IsNaN(sovitus), $"{l.Nimi}: sovitus {sovitus}");
                double katto = EurooppaLoitonnus.Katto(maanKatto, sovitus * R, KokoPallo(a));
                Oleta.Tosi(katto > maanKatto, $"{l.Nimi}: katto {katto / 1000:0} km > maan katto");
                Oleta.Tosi(katto < KokoPallo(a), $"{l.Nimi}: katto {katto / 1000:0} km alle koko pallon {KokoPallo(a) / 1000:0} km");
                foreach (var k in Kaupungit)
                {
                    Oleta.Tosi(EurooppaLoitonnus.Euroopassa(k.Lat, k.Lon), $"{k.Nimi} Euroopan laatikossa");
                    Oleta.Tosi(Kuvassa(k.Lat, k.Lon, katto / R, a), $"{l.Nimi}: {k.Nimi} kuvassa katolla {katto / 1000:0} km");
                }
                // Laatikon kulmat mahtuvat (vara 1,08), ja 0,9 × sovituksella jokin reuna jää kuvan ulkopuolelle.
                foreach (var (la, lo) in new[] { (EurooppaLoitonnus.LatMin, EurooppaLoitonnus.LonMin), (EurooppaLoitonnus.LatMin, EurooppaLoitonnus.LonMax),
                                                 (EurooppaLoitonnus.LatMax, EurooppaLoitonnus.LonMin), (EurooppaLoitonnus.LatMax, EurooppaLoitonnus.LonMax) })
                    Oleta.Tosi(Kuvassa(la, lo, sovitus, a), $"{l.Nimi}: kulma ({la}, {lo}) kuvassa");
                bool kaikki = true;
                for (int i = 0; i <= 24; i++)
                {
                    double t = i / 24.0;
                    double lon = EurooppaLoitonnus.LonMin + (EurooppaLoitonnus.LonMax - EurooppaLoitonnus.LonMin) * t;
                    double lat = EurooppaLoitonnus.LatMin + (EurooppaLoitonnus.LatMax - EurooppaLoitonnus.LatMin) * t;
                    kaikki &= Kuvassa(EurooppaLoitonnus.LatMin, lon, sovitus * 0.85, a) && Kuvassa(EurooppaLoitonnus.LatMax, lon, sovitus * 0.85, a)
                              && Kuvassa(lat, EurooppaLoitonnus.LonMin, sovitus * 0.85, a) && Kuvassa(lat, EurooppaLoitonnus.LonMax, sovitus * 0.85, a);
                }
                Oleta.Tosi(!kaikki, $"{l.Nimi}: sovitus on tiukka (0,85 × ei mahdu)");
                Console.WriteLine($"  eurooppa-loitonnus {l.Nimi}: katto {katto / 1000:0} km (sovitus {sovitus:0.000} R, koko pallo {KokoPallo(a) / 1000:0} km)");
            }
            // Maan katto jo korkeammalla (iso maa) → ennallaan; ei maan kattoa (kaupunkinäkymä) → ei Euroopan kattoa.
            Oleta.Tosi(EurooppaLoitonnus.Katto(20_000_000, 10_000_000, 30_000_000) == 20_000_000, "maan katto korkeampi");
            Oleta.Tosi(EurooppaLoitonnus.Katto(0, 10_000_000, 30_000_000) == 0, "ei maan kattoa");
            Oleta.Tosi(EurooppaLoitonnus.Katto(2_000_000, double.NaN, 30_000_000) == 2_000_000, "sovitus ei ratkea");
            Oleta.Tosi(EurooppaLoitonnus.Katto(2_000_000, 40_000_000, 30_000_000) == 30_000_000, "enintään koko pallo");
        }

        [Testi]
        static void HuntuEiKatoaEuroopanKorkeudella()
        {
            const double kauko = 15_000_000; // Varitaso.kaukoKorkeus
            foreach (var l in Laitteet)
            {
                double a = l.W / l.H, katto = EurooppaLoitonnus.Katto(2_200_000, EurooppaLoitonnus.SovitusKorkeus(Fov, a) * R, KokoPallo(a));
                double raja = EurooppaLoitonnus.HunnunKaukoraja(kauko, katto);
                // Varitaso: huntu pois, kun korkeus > raja; takaisin alle 0,85 × raja. Katolla huntu pysyy kummassakin tilassa.
                Oleta.Tosi(raja >= kauko && katto < raja * 0.85, $"{l.Nimi}: katto {katto / 1000:0} km < 0,85 × kaukoraja {raja / 1000:0} km");
                // Hunnun häivytys (Varitaso.NakymanAlinTaso, AlinKaytetty 3 → täysi peitto z ≥ 3,5): kaukaisin näkyvä piste on
                // horisontti, taso log2(2πR cos(lat) / (256 · m/px)).
                double d = 1 + katto / R, horisontti = Math.Sqrt(d * d - 1) * R;
                double mpp = 2 * horisontti * Math.Tan(Fov / 2 * Rad) / (l.H * l.K);
                double z = Math.Log(2 * Math.PI * 6_371_000 * Math.Cos(EurooppaLoitonnus.KeskiLat * Rad) / (256 * mpp), 2);
                Oleta.Tosi(z >= 3.5, $"{l.Nimi}: näkymän alin taso z{z:0.0} ≥ 3,5 (huntu täysin)");
                // Laattamäärä: hunnun tasolla ⌈z⌉ koko Euroopan laatikko on kymmeniä laattoja (ei satoja).
                int n = EurooppaLoitonnus.LaattojaAlueella(EurooppaLoitonnus.LatMin, EurooppaLoitonnus.LatMax, EurooppaLoitonnus.LonMin,
                                                           EurooppaLoitonnus.LonMax, (int)Math.Ceiling(z));
                Oleta.Tosi(n > 0 && n <= 64, $"{l.Nimi}: Euroopan laatikko z{Math.Ceiling(z)}: {n} laattaa");
                Console.WriteLine($"  eurooppa-loitonnus {l.Nimi}: huntu z{z:0.0}, kaukoraja {raja / 1000:0} km, Euroopan laattoja z{Math.Ceiling(z)} {n}");
            }
            Oleta.Tosi(EurooppaLoitonnus.HunnunKaukoraja(kauko, 0) == kauko, "ilman Euroopan kattoa ennallaan");
            Oleta.Tosi(EurooppaLoitonnus.LaattojaAlueella(-90, 90, -180, 180, 0) == 1, "z0: 1 laatta");
            Oleta.Tosi(EurooppaLoitonnus.LaattojaAlueella(-90, 90, -180, 180, 2) == 16, "z2: 16 laattaa");
        }

        [Testi]
        static void RajojenKynnysJaPeitto()
        {
            Oleta.Tosi(EurooppaLoitonnus.RajojenMinTiheys(true, 30) == EurooppaLoitonnus.RajojenKynnys, "Euroopan sääntö: 15 px/°");
            Oleta.Tosi(EurooppaLoitonnus.RajojenMinTiheys(false, 30) == 30, "maailmatila ja muut: 30 px/° ennallaan");
            foreach (var l in Laitteet)
            {
                double a = l.W / l.H, katto = EurooppaLoitonnus.Katto(2_200_000, EurooppaLoitonnus.SovitusKorkeus(Fov, a) * R, KokoPallo(a));
                // Pintaosuma.Tiheys: laitepikseliä leveysastetta kohti ruudun keskellä.
                double pxRad = l.H * l.K / 2 / Math.Tan(Fov / 2 * Rad), tiheys = pxRad * (6_371_000 * Rad) / katto;
                Oleta.Tosi(tiheys >= EurooppaLoitonnus.RajojenKynnys, $"{l.Nimi}: tiheys {tiheys:0.0} px/° ≥ kynnys katolla");
                Console.WriteLine($"  eurooppa-loitonnus {l.Nimi}: rajojen tiheys katolla {tiheys:0.0} px/°, peitto {EurooppaLoitonnus.RajojenPeitto(1f, tiheys):0.00} ×");
            }
            Oleta.Tosi(Math.Abs(EurooppaLoitonnus.RajojenPeitto(0.2f, 15) - 0.2f * EurooppaLoitonnus.RajojenKaukoOsuus) < 1e-6, "kynnyksellä kevyt");
            Oleta.Tosi(EurooppaLoitonnus.RajojenPeitto(0.2f, 30) == 0.2f && EurooppaLoitonnus.RajojenPeitto(0.2f, 80) == 0.2f, "lähellä ennallaan");
            float edellinen = 0f;
            for (double t = 10; t <= 40; t += 2.5)
            {
                float p = EurooppaLoitonnus.RajojenPeitto(0.2f, t);
                Oleta.Tosi(p >= edellinen && p <= 0.2f, $"monotoninen {t}: {p}");
                edellinen = p;
            }
        }

        [Testi]
        static void PanorointiLaajeneeKohtiEurooppaa()
        {
            const double maan = 2_000_000, katto = 12_000_000;
            Oleta.Tosi(EurooppaLoitonnus.Osuus(maan, maan, katto) == 0 && EurooppaLoitonnus.Osuus(1_000_000, maan, katto) == 0, "maan katolla 0");
            Oleta.Tosi(EurooppaLoitonnus.Osuus(katto, maan, katto) == 1, "Euroopan katolla 1");
            Oleta.Tosi(EurooppaLoitonnus.Osuus(5_000_000, maan, 0) == 0, "ei Euroopan kattoa");
            double ed = -1;
            for (double h = maan; h <= katto; h += 500_000)
            {
                double o = EurooppaLoitonnus.Osuus(h, maan, katto);
                Oleta.Tosi(o >= ed, $"monotoninen {h}");
                ed = o;
            }
            // Portugalin raja (lat 36–43, lon −10…−6): täydellä osuudella koko Euroopan laatikko, puolivälissä välissä.
            var t = EurooppaLoitonnus.Laajenna(36, 43, -10, -6, true, 1);
            Oleta.Tosi(t.LatMin <= EurooppaLoitonnus.LatMin && t.LatMax >= EurooppaLoitonnus.LatMax && t.LngMin <= EurooppaLoitonnus.LonMin
                       && t.LngMax >= EurooppaLoitonnus.LonMax, $"täysi laajennus {t}");
            Oleta.Tosi(EurooppaLoitonnus.KeskiLon <= t.LngMax && EurooppaLoitonnus.KeskiLon >= t.LngMin, "Euroopan keskipiste rajassa");
            var p = EurooppaLoitonnus.Laajenna(36, 43, -10, -6, true, 0.5);
            Oleta.Tosi(p.LngMax > -6 && p.LngMax < EurooppaLoitonnus.LonMax && p.LatMax > 43 && p.LatMax < EurooppaLoitonnus.LatMax, $"puolivälissä {p}");
            Oleta.Tosi(EurooppaLoitonnus.Laajenna(36, 43, -10, -6, true, 0) == (36, 43, -10, -6), "osuus 0: ennallaan");
            var k = EurooppaLoitonnus.Laajenna(36, 43, 170, 190, false, 1);
            Oleta.Tosi(k.LngMin == 170 && k.LngMax == 190, "päivämäärärajan yli: pituus ennallaan");
            // Kaukonäkymä (himmeät pisteet): selvästi maan katon yläpuolella.
            Oleta.Tosi(!EurooppaLoitonnus.Kaukana(maan * 1.05, maan) && EurooppaLoitonnus.Kaukana(maan * 1.2, maan), "kaukonäkymän kynnys");
            Oleta.Tosi(!EurooppaLoitonnus.Kaukana(5_000_000, 0), "ei maan kattoa: ei kaukonäkymää");
        }

        [Testi]
        static void PallotEivatKatoaEuroopanKatolla()
        {
            // KaupunkiPallot: näkyvyys vain maan mukaan (ei korkeusrajaa), koko kaukana vakio 84 pt.
            foreach (var l in Laitteet)
            {
                double a = l.W / l.H, katto = EurooppaLoitonnus.Katto(2_200_000, EurooppaLoitonnus.SovitusKorkeus(Fov, a) * R, KokoPallo(a));
                Oleta.Tosi(KaupunkiPalloMitat.Koko(katto) == KaupunkiPalloMitat.KokoKaukaPt, $"{l.Nimi}: pallon koko katolla");
            }
            Oleta.Tosi(KaupunkiPalloMitat.Nakyy("FRA", "FRA", false) && KaupunkiPalloMitat.Nakyy("SWE", "SWE", false), "Pariisi ja Tukholma omassa maassa");
            // Kiinnityspiste ruudulla: Pariisi iPhonen katolla ruudun sisällä (pallo ei rajaudu pois).
            Oleta.Tosi(KaupunkiPalloMitat.Ruutupaikka(201f, 500f, KaupunkiPalloMitat.KokoKaukaPt, 402f, 874f, out _, out _), "ruutupaikka");
        }
    }
}
