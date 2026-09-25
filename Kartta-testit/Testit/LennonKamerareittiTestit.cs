// LÖYDÖS 120 (build 14): aloituslennon kamera yhtenä C1-jatkuvana reittinä. Reitti ajetaan näytteinä pallomallilla
// (LennonKamerareitti.Kuva = PalloKierto.Aseta + Nappula.Lento ilman maastoa): ei hyppyjä 0,1 s:n näytteissä
// (muutos > 3 × ympäröivien keskiarvo), kanavien ja kamerapaikan nopeus jatkuva 120 Hz:n näytteissä, kone ei takaa,
// kaarto nokan edestä monotoninen ja loppu saapumisnäkymässä.
// Raportti: ./kaanna.sh TulostaKamerareitti; kanavat CSV:nä: LENTO_CSV=<polku.csv> ./kaanna.sh KanavatCsv
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LennonKamerareittiTestit
    {
        const double LontooLat = 51.507, LontooLon = -0.128;

        static readonly (string Id, double Lat, double Lon)[] Kohteet =
        {
            ("ateena", 37.98, 23.73), ("istanbul", 41.01, 28.98), ("kairo", 30.04, 31.24), ("tanger", 35.76, -5.83),
            ("moskova", 55.75, 37.62), ("tokio", 35.68, 139.69), ("sydney", -33.87, 151.21), ("newyork", 40.71, -74.0),
            ("kapkaupunki", -33.92, 18.42), ("rio", -22.91, -43.17), ("dubai", 25.20, 55.27), ("sanfrancisco", 37.77, -122.42),
            ("singapore", 1.29, 103.85), ("buenosaires", -34.60, -58.38), ("peking", 39.90, 116.40), ("perth", -31.95, 115.86),
        };

        /// <summary>Lähtöasennot: valintanäkymä (pohjoinen ylös) ja kierretty/kallistettu pallo.</summary>
        static readonly LennonKamerareitti.Alku[] Alut =
        {
            LennonKamerareitti.Valintanakyma,
            new LennonKamerareitti.Alku(30.0, 60.0, 8_000_000.0, 20.0, 200.0),
            new LennonKamerareitti.Alku(52.0, 0.0, 1_500_000.0, 40.0, 90.0),
            new LennonKamerareitti.Alku(45.0, 10.0, 12_000_000.0, 0.0, 300.0),
            new LennonKamerareitti.Alku(45.0, 10.0, 20_000_000.0, 0.0, -540.0),
        };

        static LennonKamerareitti.Lento Aloitus(string id, double lat, double lon, LennonKamerareitti.Alku alku) =>
            LennonKamerareitti.Tee(LontooLat, LontooLon, lat, lon, id, true, alku);

        [Testi]
        static void TulostaKamerareitti()
        {
            // Ei väitteitä: 0,1 s:n raportti (Ateena valintanäkymästä) kuten Nappulan "kamerareitti paalle" -loki.
            var l = Aloitus("ateena", 37.98, 23.73, LennonKamerareitti.Valintanakyma);
            var r = LennonKamerareitti.Analysoi(LennonKamerareitti.Suunnitelma(l, 0.1));
            Console.WriteLine(LennonKamerareitti.Raportti(r, "ateena (pallomalli)"));
        }

        /// <summary>Kanavat CSV:nä 120 Hz:llä (LENTO_CSV=polku): t, etäisyys, suunta, kallistus, kohde, kone, nopeudet.</summary>
        [Testi]
        static void KanavatCsv()
        {
            string polku = Environment.GetEnvironmentVariable("LENTO_CSV");
            if (string.IsNullOrEmpty(polku)) return;
            var c = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("t_s,etaisyys_m,suunta_abs,suunta_rel,kallistus,kohde,kone,nopeus_ms,kulmanopeus_as,hyppy\n");
            var l = Aloitus("ateena", 37.98, 23.73, LennonKamerareitti.Valintanakyma);
            double T = l.Jako.KestoS, dt = 1.0 / 120.0;
            var n = LennonKamerareitti.Suunnitelma(l, dt);
            var r = LennonKamerareitti.Analysoi(n);
            double ed = double.NaN;
            for (int i = 0; i < n.Length; i++)
            {
                double t = Math.Min(1, n[i].T / T);
                var a = l.Arvo(t);
                double s = ed.Equals(double.NaN) ? a.s : ed + Kiedo180(a.s - ed);
                ed = s;
                double rel = ((a.s - l.Suunta(t)) % 360 + 360) % 360;
                sb.Append(string.Format(c, "{0:0.0000},{1:0.0},{2:0.000},{3:0.000},{4:0.000},{5:0.0000},{6:0.0000},{7:0.0},{8:0.000},{9}\n",
                    n[i].T, a.e, s, rel, a.k, a.kohde, a.kone, r[i].NopeusMs, r[i].KulmanopeusAs, r[i].Hyppy || r[i].KulmaHyppy ? 1 : 0));
            }
            Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(polku)));
            File.WriteAllText(polku, sb.ToString());
            Console.WriteLine("      " + polku);
        }

        static double Kiedo180(double a) => ((a % 360.0) + 540.0) % 360.0 - 180.0;

        // ---- Hypyt ja jatkuvuus ----

        [Testi]
        static void EiHyppyja01s()
        {
            foreach (var alku in Alut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, alku);
                var r = LennonKamerareitti.Analysoi(LennonKamerareitti.Suunnitelma(l, 0.1));
                foreach (var x in r)
                {
                    Oleta.Tosi(!x.Hyppy, $"{id}: hyppy t={x.T:0.0} s ({x.Siirto:0} m)");
                    Oleta.Tosi(!x.KulmaHyppy, $"{id}: kulmahyppy t={x.T:0.0} s ({x.Kulma:0.00}°)");
                }
            }
        }

        /// <summary>
        /// Kanavien (log-etäisyys, kallistus, suunta, kohde, kone) nopeus 120 Hz:n näytteissä: nopeuden muutos per näyte
        /// on pieni suhteessa kanavan suurimpaan nopeuteen (C1: ei portaita), ja kamerapaikan ja katsesuunnan nopeus
        /// ei hyppää (vektorinopeuden muutos per näyte ei ole piikki).
        /// </summary>
        [Testi]
        static void NopeusJatkuva120Hz()
        {
            const double Hz = 120.0;
            foreach (var alku in Alut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, alku);
                double T = l.Jako.KestoS;
                int N = (int)(T * Hz);
                var kan = new double[N + 1][];
                for (int i = 0; i <= N; i++)
                {
                    var a = l.Arvo(i / (double)N);
                    kan[i] = new[] { Math.Log(a.e), a.k, a.s, a.kohde, a.kone };
                }
                for (int k = 0; k < 5; k++)
                {
                    var kv = new double[N];
                    double maks = 1e-9;
                    for (int i = 0; i < N; i++)
                    {
                        double d = kan[i + 1][k] - kan[i][k];
                        if (k == 2) d = Kiedo180(d);
                        kv[i] = d * Hz;
                        maks = Math.Max(maks, Math.Abs(kv[i]));
                    }
                    for (int i = 1; i < N; i++)
                        Oleta.Tosi(Math.Abs(kv[i] - kv[i - 1]) <= 0.08 * maks,
                            $"{id}: {Nimi[k]} nopeus porras t={i / Hz:0.000} s: {kv[i - 1]:0.###} → {kv[i]:0.###} (maks {maks:0.###})");
                }
                // Kamerapaikka ja katsesuunta: nopeusvektorin muutos per näyte on pieni suhteessa ympäristön (±0,25 s)
                // suurimpaan nopeuteen. Porras (C1-katko) ei pienene näytevälin mukana, kiihtyvyyden vaihtelu pienenee.
                var n = LennonKamerareitti.Suunnitelma(l, 1.0 / Hz);
                int m = n.Length - 1;
                var v = new double[m + 1][];
                var w = new double[m + 1][];
                var vp = new double[m + 1];
                var wp = new double[m + 1];
                for (int i = 1; i <= m; i++)
                {
                    v[i] = new[] { (n[i].X - n[i - 1].X) * Hz, (n[i].Y - n[i - 1].Y) * Hz, (n[i].Z - n[i - 1].Z) * Hz };
                    w[i] = new[] { (n[i].KX - n[i - 1].KX) * Hz, (n[i].KY - n[i - 1].KY) * Hz, (n[i].KZ - n[i - 1].KZ) * Hz };
                    vp[i] = Pituus(v[i][0], v[i][1], v[i][2]);
                    wp[i] = Pituus(w[i][0], w[i][1], w[i][2]) * 180 / Math.PI;
                }
                int ikkuna = (int)(0.25 * Hz);
                for (int i = 2; i <= m; i++)
                {
                    double vMax = 0, wMax = 0;
                    for (int q = Math.Max(1, i - ikkuna); q <= Math.Min(m, i + ikkuna); q++) { vMax = Math.Max(vMax, vp[q]); wMax = Math.Max(wMax, wp[q]); }
                    double dv = Pituus(v[i][0] - v[i - 1][0], v[i][1] - v[i - 1][1], v[i][2] - v[i - 1][2]);
                    double dw = Pituus(w[i][0] - w[i - 1][0], w[i][1] - w[i - 1][1], w[i][2] - w[i - 1][2]) * 180 / Math.PI;
                    Oleta.Tosi(dv <= 0.1 * vMax + 50.0,
                        $"{id}: kameran nopeus porrastuu t={n[i].T:0.000} s: Δv {dv:0} m/s ({vp[i - 1]:0} → {vp[i]:0}, ympäristön maks {vMax:0})");
                    Oleta.Tosi(dw <= 0.1 * wMax + 0.2,
                        $"{id}: kulmanopeus porrastuu t={n[i].T:0.000} s: Δω {dw:0.00} °/s ({wp[i - 1]:0.0} → {wp[i]:0.0}, maks {wMax:0.0})");
                }
            }
        }

        // ---- Käsikirjoitus ----

        static double Rel(LennonKamerareitti.Lento l, double t) => ((l.Arvo(t).s - l.Suunta(t)) % 360 + 360) % 360;

        [Testi]
        static void KoneEiKoskaanTakaa()
        {
            // Koneen vaiheissa (kohde kone: syöksyn perille tulosta 1,0 s irtautumisen loppuun 6,0 s, tai kone isona) suunta
            // ei ole ±45°:n sisällä suoraan takaa (0°).
            foreach (var alku in Alut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, alku);
                for (int i = 0; i <= 2000; i++)
                {
                    double t = i / 2000.0;
                    var a = l.Arvo(t);
                    bool koneella = t >= 0.10 && t <= 0.60 || a.kone > 0.3;
                    if (!koneella) continue;
                    double r = Rel(l, t);
                    Oleta.Tosi(Math.Min(r, 360 - r) >= 45, $"{id}: kamera takana t={t * 10:0.00} s ({r:0.0}°, {a.e / 1000:0} km)");
                }
            }
        }

        [Testi]
        static void KaartoNokanEdestaMonotoninen()
        {
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, LennonKamerareitti.Valintanakyma);
                int puoli = l.Reitti.Puoli;
                double P(double x) => puoli > 0 ? x : 360 - x;
                Oleta.Tosi(Math.Abs(Kiedo180(Rel(l, 0.22) - P(125))) < 1e-6 && Math.Abs(Kiedo180(Rel(l, 0.36) - P(235))) < 1e-6, $"{id}: kaaren päät");
                Oleta.Tosi(Math.Abs(Kiedo180(Rel(l, 0.29) - 180)) < 1e-6, $"{id}: nokan kohdalla edestä");
                double ed = l.Arvo(0.22).s, wMax = 0;
                for (int i = 1; i <= 280; i++)
                {
                    double t = 0.22 + 0.14 * i / 280.0;
                    double s = l.Arvo(t).s;
                    Oleta.Tosi((s - ed) * puoli > 0, $"{id}: kaarto ei monotoninen t={t * 10:0.000} s");
                    wMax = Math.Max(wMax, Math.Abs(s - ed) / (0.14 * 10 / 280.0));
                    ed = s;
                }
                Oleta.Tosi(wMax > 90 && wMax < 130, $"{id}: kaarron huippu {wMax:0} °/s");
            }
        }

        [Testi]
        static void LoppuSaapumisnakymassa()
        {
            foreach (var alku in Alut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, alku);
                var a = l.Arvo(1.0);
                Oleta.Tosi(Math.Abs(a.k) < 1e-9, $"{id}: kallistus {a.k}");
                double s = ((a.s % 360) + 360) % 360;
                Oleta.Tosi(Math.Min(s, 360 - s) < 1e-9, $"{id}: suunta {a.s}");
                Oleta.Tosi(Math.Abs(a.kohde - 2) < 1e-12 && Math.Abs(a.e - l.SaapumisKorkeus) < 1e-3, $"{id}: kohde {a.kohde}, korkeus {a.e}");
                // Nopeudet nollassa lopussa (ease out).
                var b = l.Arvo(1.0 - 1e-5);
                Oleta.Tosi(Math.Abs(b.s - a.s) < 1e-3 && Math.Abs(b.k - a.k) < 1e-3 && Math.Abs(Math.Log(b.e / a.e)) < 1e-5, $"{id}: loppunopeus");
                // Alku: kameran lähtöasento.
                var z = l.Arvo(0);
                Oleta.Tosi(Math.Abs(z.e - alku.Korkeus) < 1e-3 && Math.Abs(z.k - alku.Kallistus) < 1e-9
                           && Math.Abs(Kiedo180(z.s - alku.Suunta)) < 1e-9 && z.kohde == -1, $"{id}: lähtöasento");
            }
        }

        [Testi]
        static void KiertoJaOrbit()
        {
            // Kierron ja orbitin kulma 30–180°, orbit vakiokulmanopeudella (8,6 s → jarrutus), kierto kiihtyvä (7,0–8,6 s).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, LennonKamerareitti.Valintanakyma);
                var j = l.Jako;
                double kaari = l.Reitti.Kaari;
                Oleta.Tosi(Math.Abs(kaari) >= LennonAikajana.AloitusKaariMin - 1e-9 && Math.Abs(kaari) <= 180 + 1e-9, $"{id}: kaari {kaari:0}");
                Oleta.Tosi(Math.Abs(l.Arvo(1).s - l.Arvo(LennonAikajana.AloitusMatkaLoppu).s - kaari) < 1e-6, $"{id}: kierron kulma");
                double h = 1e-6;
                double W(double t) => (l.Arvo(t + h).s - l.Arvo(t - h).s) / (2 * h * 10);
                double w0 = W(j.Kierto + 1e-4);
                for (int i = 1; i < 10; i++)
                {
                    double t = j.Kierto + (j.Tasainen - j.Kierto) * i / 10.0;
                    Oleta.Tosi(Math.Abs(W(t) - w0) < 1e-6 * Math.Abs(w0), $"{id}: orbit vakio {W(t):0.000} vs {w0:0.000}");
                }
                double ed = 0;
                for (int i = 1; i <= 20; i++)
                {
                    double w = W(LennonAikajana.AloitusMatkaLoppu + (j.Kierto - LennonAikajana.AloitusMatkaLoppu) * i / 20.0 - 1e-5) * Math.Sign(kaari);
                    Oleta.Tosi(w >= ed - 1e-9, $"{id}: kierron kulmanopeus kasvaa");
                    ed = w;
                }
            }
        }

        [Testi]
        static void KoneJaKameraIrtautumisessa()
        {
            // Irtautumisessa (4,3–6,0 s) koneen ruutuosuus ei kasva; kamera maan ja koneen yllä koko koneen vaiheen ajan.
            foreach (var alku in Alut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, alku);
                double ed = double.MaxValue;
                for (int i = 0; i <= 400; i++)
                {
                    double t = 0.43 + 0.17 * i / 400.0;
                    double k = l.Arvo(t).kone;
                    Oleta.Tosi(k >= 0 && k <= ed + 1e-12, $"{id}: koneen koko kasvaa t={t * 10:0.00} s ({k:0.000})");
                    ed = k;
                }
                for (int i = 0; i <= 2000; i++)
                {
                    double t = i / 2000.0;
                    var (silma, _, _, h) = LennonKamerareitti.Kuva(l, t);
                    double korkeus = Pituus(silma[0], silma[1], silma[2]) - 6371000.0;
                    Oleta.Tosi(korkeus > 1000, $"{id}: silmä {korkeus:0} m t={t * 10:0.00} s");
                    if (t >= 0.10 && t <= LennonAikajana.AloitusMatkaLoppu)
                        Oleta.Tosi(korkeus >= h, $"{id}: silmä {korkeus:0} m koneen ({h:0} m) alla t={t * 10:0.00} s");
                }
            }
        }

        [Testi]
        static void TulostaKierrot()
        {
            // Ei väitteitä: kylki, orbitin kulma ja matkan ajelehdinta kohteittain (./kaanna.sh TulostaKierrot).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon, LennonKamerareitti.Valintanakyma);
                var r = l.Reitti;
                Console.WriteLine($"      {id,-12} kylki {(r.Puoli > 0 ? "+" : "−")}  kierto {r.Kaari,6:0}°  " +
                                  $"{(Math.Sign(r.Kaari) == r.Puoli ? "sama suunta" : "VASTASUUNTA")}  ajelehdinta {r.Ajelehdinta,6:0}°");
            }
        }

        static readonly string[] Nimi = { "log etäisyys", "kallistus", "suunta", "kohde", "kone" };
        static double Pituus(double x, double y, double z) => Math.Sqrt(x * x + y * y + z * z);
    }
}
