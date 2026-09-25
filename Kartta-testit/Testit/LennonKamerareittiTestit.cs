// LÖYDÖS 120 (build 14): aloituslennon kamera yhtenä C2-jatkuvana reittinä. Reitti ajetaan näytteinä pallomallilla
// (LennonKamerareitti.Kuva = PalloKierto.Aseta + Nappula.Lento ilman maastoa): ei hyppyjä 0,1 s:n näytteissä
// (muutos > 3 × ympäröivien keskiarvo), kanavien ja kamerapaikan nopeus ja kiihtyvyys jatkuvia 120 Hz:n näytteissä,
// kone ei takaa, lähikuvan panorointi hidas ja loppu saapumisnäkymässä (nopeus ja kiihtyvyys 0).
// V2 (omistaja 25.9. klo 19.0x): KONE AINA KUVASSA — koneen projektio pysyy ruudun sisällä marginaalin kanssa kaikilla t
// (iPhone pysty 393 × 852 pt ja vaaka 852 × 393 pt, kameran fov Saapumisnakyma.PalloFov = Rakennus.cs:n 50°), ja avaus
// näyttää Lontoon ja nousevan koneen.
// Raportit: ./kaanna.sh TulostaKamerareitti, ./kaanna.sh TulostaRuutu; kanavat CSV:nä: LENTO_CSV=<polku.csv> ./kaanna.sh KanavatCsv
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
            ("mumbai", 19.08, 72.88), ("losangeles", 34.05, -118.24),
        };

        /// <summary>Aloituslento avauksesta (Nappula asettaa kameran avaukseen mustan verhon alla), saapuminen kaupunkiin.</summary>
        static LennonKamerareitti.Lento Aloitus(string id, double lat, double lon) =>
            LennonKamerareitti.Tee(LontooLat, LontooLon, lat, lon, id, true);

        // ---- Ruutu (iPhone 16/17 Pro: 393 × 852 pt; vaaka 852 × 393 pt) ----

        /// <summary>Ruudun mitat pisteinä ja nimi.</summary>
        static readonly (string Nimi, double W, double H)[] Ruudut = { ("pysty", 393, 852), ("vaaka", 852, 393) };
        /// <summary>Kameran pystykuvakulma (Rakennus.cs: kamera.fieldOfView = 50, webin PALLO_FOV).</summary>
        static readonly double Fov = Saapumisnakyma.PalloFov;
        /// <summary>Nappula.malliPx: 3D-koneen merkkikoko (siipiväli) pisteinä.</summary>
        const double MerkkiPt = 110.0;
        /// <summary>Koneen keskipisteen vähimmäisetäisyys ruudun reunasta (osuus ruudun leveydestä / korkeudesta).</summary>
        const double Marginaali = 0.10;

        /// <summary>Aloituslento oikealla saapumisnäkymällä tälle ruudulle (Nappula: PalloKierto.SaapumisNakyma ilman maarajausta).</summary>
        static LennonKamerareitti.Lento AloitusRuudulle(string id, double lat, double lon, double w, double h)
        {
            var sn = Saapumisnakyma.LaskeRuudulle(null, lat, lon, w, h, Fov, 3);
            return LennonKamerareitti.Tee(LontooLat, LontooLon, lat, lon, id, true, null, null, sn.KorkeusMetreina, sn.Lat, sn.Lon);
        }

        /// <summary>
        /// Koneen paikka ruudulla hetkellä t: keskipisteen marginaali (lähin reuna, osuus ruudun mitasta; 0,5 = keskellä)
        /// ja koneen koko pisteinä (Nappula: pehmeä maksimi merkkikoosta ja lyhyemmän sivun osuudesta).
        /// </summary>
        static (double marginaali, double x, double y, double kokoPt, bool edessa) Koneruutu(LennonKamerareitti.Lento l, double t, double w, double h)
        {
            var (silma, kohde, yl, kone, _) = LennonKamerareitti.Kamera(l, t);
            bool edessa = LennonKamerareitti.Projisoi(silma, kohde, yl, kone, Fov, w / h, out double x, out double y);
            double m = Math.Min((1 - Math.Abs(x)) / 2, (1 - Math.Abs(y)) / 2);
            double koko = LennonAikajana.KoneenKokoPx(MerkkiPt, l.Arvo(t).kone, w, h);
            return (m, x, y, koko, edessa);
        }

        [Testi]
        static void KoneAinaKuvassa()
        {
            // Omistaja 25.9. klo 19.0x: "kamera ei missään vaiheessa kadota konetta ruudusta". Tiheä näytteistys (2400 näytettä
            // = 200 Hz): koneen keskipiste vähintään 10 % ruudun leveydestä ja korkeudesta reunasta, ja kun kone on pieni
            // (alle puolet lyhyemmästä sivusta), koko kone (siipiväli halkaisijana) ruudun sisällä.
            foreach (var (ruutu, w, h) in Ruudut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = AloitusRuudulle(id, lat, lon, w, h);
                for (int i = 0; i <= 2400; i++)
                {
                    double t = i / 2400.0;
                    var r = Koneruutu(l, t, w, h);
                    Oleta.Tosi(r.edessa, $"{ruutu} {id}: kone kameran takana t={t * l.Jako.KestoS:0.000} s");
                    Oleta.Tosi(r.marginaali >= Marginaali,
                        $"{ruutu} {id}: kone reunalla t={t * l.Jako.KestoS:0.000} s (x {r.x:0.000}, y {r.y:0.000}, marginaali {r.marginaali:P1})");
                    if (r.kokoPt < 0.5 * Math.Min(w, h))
                    {
                        double vx = 1 - Math.Abs(r.x) - r.kokoPt / w, vy = 1 - Math.Abs(r.y) - r.kokoPt / h;
                        Oleta.Tosi(vx >= 0 && vy >= 0,
                            $"{ruutu} {id}: kone ei mahdu ruutuun t={t * l.Jako.KestoS:0.000} s (x {r.x:0.000}, y {r.y:0.000}, koko {r.kokoPt:0} pt)");
                    }
                }
            }
        }

        [Testi]
        static void AvausNayttaaLontoonJaKoneen()
        {
            // "LENNON ALKU NÄKYY, vaikka kaukaa": avauksessa (0–1,8 s) Lontoo ja kone kuvassa marginaalin kanssa, kone on
            // lähtenyt Lontoosta (siirtynyt ruudulla) ja noussut, ja kamera on vielä kaukana (≥ 200 km).
            foreach (var (ruutu, w, h) in Ruudut)
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = AloitusRuudulle(id, lat, lon, w, h);
                var lontoo = LennonKamerareitti.Piste(LontooLat, LontooLon);
                double T = l.Jako.KestoS;
                for (int i = 0; i <= 180; i++)
                {
                    double t = i / 100.0 / T;
                    Oleta.Tosi(LennonKamerareitti.Ruudulla(l, t, lontoo, Fov, w / h, out double x, out double y)
                               && Math.Min((1 - Math.Abs(x)) / 2, (1 - Math.Abs(y)) / 2) >= Marginaali,
                        $"{ruutu} {id}: Lontoo ei kuvassa t={t * T:0.00} s ({x:0.00}, {y:0.00})");
                    Oleta.Tosi(Koneruutu(l, t, w, h).marginaali >= Marginaali, $"{ruutu} {id}: kone ei kuvassa t={t * T:0.00} s");
                }
                double a = 1.8 / T;
                Oleta.Tosi(l.Arvo(a).e >= 200_000, $"{id}: kamera jo lähellä avauksen lopussa ({l.Arvo(a).e / 1000:0} km)");
                var (_, _, kone, korkeus) = LennonKamerareitti.Kuva(l, a);
                double siirto = l.P(a) * l.ReittiM;
                Oleta.Tosi(siirto >= 15_000 && korkeus >= 5_000, $"{id}: kone ei ole lähtenyt ({siirto / 1000:0.0} km, {korkeus:0} m)");
                LennonKamerareitti.Ruudulla(l, 0, lontoo, Fov, w / h, out double x0, out double y0);
                LennonKamerareitti.Ruudulla(l, a, lontoo, Fov, w / h, out double x1, out double y1);
                var k1 = Koneruutu(l, a, w, h);
                double ero = Math.Sqrt((k1.x - x1) * (k1.x - x1) * w * w + (k1.y - y1) * (k1.y - y1) * h * h) / 2;
                Oleta.Tosi(ero >= 20, $"{ruutu} {id}: kone ei erotu Lontoosta avauksessa ({ero:0} pt)");
            }
        }

        [Testi]
        static void TulostaRuutu()
        {
            // Ei väitteitä: koneen pienin marginaali ruudun reunaan ja sen hetki, kohteittain ja ruuduittain.
            foreach (var (ruutu, w, h) in Ruudut)
            {
                double kaikkiMin = 1; string kaikki = "";
                foreach (var (id, lat, lon) in Kohteet)
                {
                    var l = AloitusRuudulle(id, lat, lon, w, h);
                    double min = 1, tMin = 0, xMin = 0, yMin = 0;
                    for (int i = 0; i <= 2400; i++)
                    {
                        double t = i / 2400.0;
                        var r = Koneruutu(l, t, w, h);
                        if (r.marginaali < min) { min = r.marginaali; tMin = t * l.Jako.KestoS; xMin = r.x; yMin = r.y; }
                    }
                    var loppu = Koneruutu(l, 1, w, h);
                    Console.WriteLine($"      {ruutu} {id,-12} pienin marginaali {min,6:P1} ({min * (Math.Abs(xMin) > Math.Abs(yMin) ? w : h),4:0} pt) t={tMin,5:0.00} s " +
                                      $"({xMin,6:0.00}, {yMin,6:0.00}); perillä ({loppu.x:0.00}, {loppu.y:0.00}); matka {l.Reitti.MatkaNopeus / 1000,5:0} km/s, " +
                                      $"lasku {l.Reitti.LaskuKulma:0.00} rad/s");
                    if (min < kaikkiMin) { kaikkiMin = min; kaikki = $"{id} t={tMin:0.00} s"; }
                }
                Console.WriteLine($"      {ruutu}: pienin {kaikkiMin:P1} ({kaikki})");
            }
        }

        [Testi]
        static void TulostaKamerareitti()
        {
            // Ei väitteitä: 0,1 s:n raportti (Ateena avauksesta) kuten Nappulan "kamerareitti paalle" -loki.
            var l = Aloitus("ateena", 37.98, 23.73);
            var r = LennonKamerareitti.Analysoi(LennonKamerareitti.Suunnitelma(l, 0.1));
            Console.WriteLine(LennonKamerareitti.Raportti(r, "ateena (pallomalli)"));
        }

        /// <summary>
        /// Kanavat CSV:nä 120 Hz:llä (LENTO_CSV=polku): t, etäisyys, suunta, kallistus, kohde, kone, nopeudet, kiihtyvyys,
        /// koneen reittiosuus ja koneen paikka pystyruudulla (x, y).
        /// </summary>
        [Testi]
        static void KanavatCsv()
        {
            string polku = Environment.GetEnvironmentVariable("LENTO_CSV");
            if (string.IsNullOrEmpty(polku)) return;
            var c = CultureInfo.InvariantCulture;
            var sb = new StringBuilder("t_s,etaisyys_m,suunta_abs,suunta_rel,kallistus,kohde,kone,nopeus_ms,kulmanopeus_as,kiihtyvyys_ms2,hyppy,kone_osuus,kone_x,kone_y\n");
            var (_, w, h) = Ruudut[0];
            var l = AloitusRuudulle("ateena", 37.98, 23.73, w, h);
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
                // Kameran paikan kiihtyvyys: toinen differenssi (keskitetty), päissä 0.
                double kiih = i == 0 || i == n.Length - 1 ? 0 : Pituus(n[i + 1].X - 2 * n[i].X + n[i - 1].X,
                    n[i + 1].Y - 2 * n[i].Y + n[i - 1].Y, n[i + 1].Z - 2 * n[i].Z + n[i - 1].Z) / (dt * dt);
                var k = Koneruutu(l, t, w, h);
                sb.Append(string.Format(c, "{0:0.0000},{1:0.0},{2:0.000},{3:0.000},{4:0.000},{5:0.0000},{6:0.0000},{7:0.0},{8:0.000},{9:0.0},{10},{11:0.000000},{12:0.0000},{13:0.0000}\n",
                    n[i].T, a.e, s, rel, a.k, a.kohde, a.kone, r[i].NopeusMs, r[i].KulmanopeusAs, kiih, r[i].Hyppy || r[i].KulmaHyppy ? 1 : 0,
                    l.P(t), k.x, k.y));
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
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                var r = LennonKamerareitti.Analysoi(LennonKamerareitti.Suunnitelma(l, 0.1));
                foreach (var x in r)
                {
                    Oleta.Tosi(!x.Hyppy, $"{id}: hyppy t={x.T:0.0} s ({x.Siirto:0} m)");
                    Oleta.Tosi(!x.KulmaHyppy, $"{id}: kulmahyppy t={x.T:0.0} s ({x.Kulma:0.00}°)");
                }
            }
        }

        /// <summary>
        /// Kanavien (log-etäisyys, kallistus, suunta, kohde, kone) ja koneen reittiosuuden nopeus 120 Hz:n näytteissä:
        /// nopeuden muutos per näyte on pieni suhteessa kanavan suurimpaan nopeuteen (C1: ei portaita), ja kamerapaikan ja
        /// katsesuunnan nopeus ei hyppää (vektorinopeuden muutos per näyte ei ole piikki).
        /// </summary>
        [Testi]
        static void NopeusJatkuva120Hz()
        {
            const double Hz = 120.0;
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                double T = l.Jako.KestoS;
                int N = (int)(T * Hz);
                var kan = new double[N + 1][];
                for (int i = 0; i <= N; i++)
                {
                    var a = l.Arvo(i / (double)N);
                    kan[i] = new[] { Math.Log(a.e), a.k, a.s, a.kohde, a.kone, l.P(i / (double)N) };
                }
                for (int k = 0; k < 6; k++)
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

        /// <summary>
        /// C2 (Fable 25.9., löydös 120): kiihtyvyys jatkuva 120 Hz:n näytteissä kaikissa kanavissa, koneen reittiosuudessa ja
        /// kameran paikassa ja katsesuunnassa. Ehdokas: kahden näytteen kiihtyvyysmuutos |a(i+1) − a(i−1)| (porras voi
        /// jakautua kahdelle näytteelle) on yli 3 × kahden näytteen päässä olevien vastaavien keskiarvo ja yli 2 % ympäristön
        /// suurimmasta |a|:sta. Varmistus 8 × tiheämmillä näytteillä: kiihtyvyyden porras ei pienene näytevälin mukana,
        /// jatkuvan kiihtyvyyden muutos (nykäys × näyteväli, myös nykäyksen merkin vaihtuessa avaimessa) pienenee 8-kertaisesti.
        /// Kanavissa lisäksi |Δa| per näyte alle 40 % ympäristön (±0,25 s) suurimmasta kiihtyvyydestä.
        /// </summary>
        [Testi]
        static void KiihtyvyysJatkuva120Hz()
        {
            const double Hz = 120.0;
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                double T = l.Jako.KestoS;
                for (int k = 0; k < 6; k++)
                {
                    int kk = k;
                    TarkistaKiihtyvyys(id + ": " + Nimi[k], t =>
                    {
                        var a = l.Arvo(t);
                        return new[] { new[] { Math.Log(a.e), a.k, a.s, a.kohde, a.kone, l.P(t) }[kk], 0.0, 0.0 };
                    }, T, Hz, 0.4);
                }
                TarkistaKiihtyvyys(id + ": kameran paikka", t => LennonKamerareitti.Kuva(l, t).silma, T, Hz, double.NaN);
                TarkistaKiihtyvyys(id + ": katsesuunta", t =>
                {
                    var (silma, kohde, _, _) = LennonKamerareitti.Kuva(l, t);
                    double dx = kohde[0] - silma[0], dy = kohde[1] - silma[1], dz = kohde[2] - silma[2], p = Pituus(dx, dy, dz);
                    return new[] { dx / p, dy / p, dz / p };
                }, T, Hz, double.NaN);
            }
        }

        /// <summary>Kiihtyvyysvektori toisena differenssinä: f(osuus) → vektori, t sekunteina, h näyteväli (s).</summary>
        static double[] Kiihtyvyys(Func<double, double[]> f, double T, double t, double h)
        {
            var a = f(Math.Max(0, t - h) / T);
            var b = f(t / T);
            var c = f(Math.Min(T, t + h) / T);
            return new[] { (a[0] - 2 * b[0] + c[0]) / (h * h), (a[1] - 2 * b[1] + c[1]) / (h * h), (a[2] - 2 * b[2] + c[2]) / (h * h) };
        }

        static double Ero(double[] a, double[] b) => Pituus(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

        static void TarkistaKiihtyvyys(string nimi, Func<double, double[]> f, double T, double hz, double raja)
        {
            double h = 1.0 / hz;
            int n = (int)Math.Round(T * hz);
            var a = new double[n + 1][];
            for (int i = 1; i < n; i++) a[i] = Kiihtyvyys(f, T, i * h, h);
            a[0] = a[1]; a[n] = a[n - 1];
            var d2 = new double[n + 1];
            for (int i = 1; i < n; i++) d2[i] = Ero(a[i + 1], a[i - 1]);
            int ikkuna = (int)(0.25 * hz);
            for (int i = 4; i <= n - 4; i++)
            {
                double aMax = 0;
                for (int q = Math.Max(1, i - ikkuna); q <= Math.Min(n - 1, i + ikkuna); q++) aMax = Math.Max(aMax, Pituus(a[q][0], a[q][1], a[q][2]));
                if (!double.IsNaN(raja))
                    Oleta.Tosi(Ero(a[i], a[i - 1]) <= raja * aMax + 1e-6,
                        $"{nimi}: kiihtyvyyden muutos t={i * h:0.000} s: |Δa| {Ero(a[i], a[i - 1]):0.####} > {raja:P0} × {aMax:0.###}");
                if (!(d2[i] > 3.0 * 0.5 * (d2[i - 2] + d2[i + 2]) && d2[i] > 0.02 * aMax + 1e-6)) continue;
                // Varmistus tiheämmin: suurin kahden näytteen muutos ehdokkaan ympäristössä 8 × lyhyemmällä välillä.
                double hh = h / 8, tiheä = 0;
                for (double s = (i - 2) * h; s <= (i + 2) * h; s += hh)
                    tiheä = Math.Max(tiheä, Ero(Kiihtyvyys(f, T, s + hh, hh), Kiihtyvyys(f, T, s - hh, hh)));
                Oleta.Tosi(tiheä < 0.5 * d2[i],
                    $"{nimi}: kiihtyvyys porrastuu t={i * h:0.000} s: |a(i+1) − a(i−1)| {d2[i]:0.####} (8 × tiheämmin {tiheä:0.####}; |a| {Pituus(a[i][0], a[i][1], a[i][2]):0.###})");
            }
        }

        // ---- Käsikirjoitus ----

        static double Rel(LennonKamerareitti.Lento l, double t) => ((l.Arvo(t).s - l.Suunta(t)) % 360 + 360) % 360;

        [Testi]
        static void KoneEiKoskaanTakaa()
        {
            // Koneen vaiheissa (katse koneessa 2,1 s:sta irtautumisen loppuun 7,6 s, tai kone isona) suunta ei ole ±45°:n
            // sisällä suoraan takaa (0°).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                for (int i = 0; i <= 2400; i++)
                {
                    double t = i / 2400.0;
                    var a = l.Arvo(t);
                    bool koneella = t >= LennonAikajana.AloitusKatseKoneessa && t <= l.Jako.Liuku || a.kone > 0.3;
                    if (!koneella) continue;
                    double r = Rel(l, t);
                    Oleta.Tosi(Math.Min(r, 360 - r) >= 45, $"{id}: kamera takana t={t * l.Jako.KestoS:0.00} s ({r:0.0}°, {a.e / 1000:0} km)");
                }
            }
        }

        [Testi]
        static void LahikuvaPanoroiHitaasti()
        {
            // (c) LÄHIKUVA 3,4–5,8 s: kamera lähes paikallaan (etäisyys 12–13,5 km, kone 1,9), panorointi koneen ympäri
            // P(100) → P(135) monotonisesti ja hitaasti (≤ 30°/s); ei kaartoa nokan edestä (v1).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                double T = l.Jako.KestoS;
                int puoli = l.Reitti.Puoli;
                double P(double x) => puoli > 0 ? x : 360 - x;
                double t0 = LennonAikajana.AloitusLahikuva, t1 = l.Jako.Sivu;
                Oleta.Tosi(Math.Abs(Kiedo180(Rel(l, t0) - P(LennonAikajana.AloitusLahiSuunta))) < 1e-6
                           && Math.Abs(Kiedo180(Rel(l, t1) - P(LennonAikajana.AloitusPanorointiSuunta))) < 1e-6, $"{id}: panoroinnin päät");
                // Monotoninen koneen suhteen: lentosuunnan hidas muutos (isoympyrä) saa kääntää suhteellista suuntaa enintään
                // 0,1° panoroinnin levosta lähtiessä.
                double ed = Rel(l, t0), huippu = 0, wMax = 0;
                for (int i = 1; i <= 240; i++)
                {
                    double t = t0 + (t1 - t0) * i / 240.0;
                    var a = l.Arvo(t);
                    double r = Rel(l, t);
                    double kulunut = Kiedo180(r - Rel(l, t0)) * puoli;
                    Oleta.Tosi(kulunut >= huippu - 0.1, $"{id}: panorointi ei monotoninen t={t * T:0.000} s ({kulunut:0.000}° < {huippu:0.000}°)");
                    huippu = Math.Max(huippu, kulunut);
                    wMax = Math.Max(wMax, Math.Abs(Kiedo180(r - ed)) / ((t1 - t0) * T / 240.0));
                    ed = r;
                    Oleta.Tosi(a.e >= 12_000 && a.e <= 13_500 && Math.Abs(a.kone - LennonAikajana.AloitusLahiKone) < 1e-9 && a.kohde == 0,
                        $"{id}: lähikuva t={t * T:0.00} s ({a.e / 1000:0.0} km, kone {a.kone:0.00}, kohde {a.kohde})");
                }
                Oleta.Tosi(wMax <= 30, $"{id}: panoroinnin huippu {wMax:0} °/s");
            }
        }

        [Testi]
        static void LoppuSaapumisnakymassa()
        {
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                var a = l.Arvo(1.0);
                Oleta.Tosi(Math.Abs(a.k) < 1e-9, $"{id}: kallistus {a.k}");
                double s = ((a.s % 360) + 360) % 360;
                Oleta.Tosi(Math.Min(s, 360 - s) < 1e-9, $"{id}: suunta {a.s}");
                Oleta.Tosi(Math.Abs(a.kohde - 2) < 1e-12 && Math.Abs(a.e - l.SaapumisKorkeus) < 1e-3, $"{id}: kohde {a.kohde}, korkeus {a.e}");
                // Nopeudet nollassa lopussa (ease out).
                var b = l.Arvo(1.0 - 1e-5);
                Oleta.Tosi(Math.Abs(b.s - a.s) < 1e-3 && Math.Abs(b.k - a.k) < 1e-3 && Math.Abs(Math.Log(b.e / a.e)) < 1e-5, $"{id}: loppunopeus");
                // Alku: avauksen asento (katse Lontoossa, 450 km, 45°, P(100)), levossa.
                var z = l.Arvo(0);
                var av = l.Reitti.Avaus;
                Oleta.Tosi(Math.Abs(z.e - LennonAikajana.AloitusAvausM) < 1e-3 && Math.Abs(z.k - LennonAikajana.AloitusAvausKallistus) < 1e-9
                           && Math.Abs(Kiedo180(z.s - av.suunta)) < 1e-9 && z.kohde == -1, $"{id}: lähtöasento");
                double rel0 = Rel(l, 0);
                Oleta.Tosi(Math.Abs(Kiedo180(rel0 - (l.Reitti.Puoli > 0 ? 100 : 260))) < 1e-6, $"{id}: avauksen suunta {rel0:0.0}");
                var z1 = l.Arvo(1e-5);
                Oleta.Tosi(Math.Abs(z1.s - z.s) < 1e-6 && Math.Abs(Math.Log(z1.e / z.e)) < 1e-8, $"{id}: lähtönopeus");
                // Kone: lähtö levosta Lontoosta, perillä laskeutumisesta alkaen.
                Oleta.Tosi(l.P(0) == 0 && l.P(1e-4) < 1e-7 && Math.Abs(l.P(LennonAikajana.AloitusLaskeutuminen) - 1) < 1e-9 && l.P(1) == 1,
                    $"{id}: koneen alku ja loppu ({l.P(0)}, {l.P(1e-4)}, {l.P(LennonAikajana.AloitusLaskeutuminen)}, {l.P(1)})");
            }
        }

        [Testi]
        static void KiertoJaOrbit()
        {
            // Kierron ja orbitin kulma 30–180°, orbit vakiokulmanopeudella (10,4 s → jarrutus), kierto kiihtyvä (8,8–10,4 s).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                var j = l.Jako;
                double T = j.KestoS;
                double kaari = l.Reitti.Kaari;
                Oleta.Tosi(Math.Abs(kaari) >= LennonAikajana.AloitusKaariMin - 1e-9 && Math.Abs(kaari) <= 180 + 1e-9, $"{id}: kaari {kaari:0}");
                Oleta.Tosi(Math.Abs(l.Arvo(1).s - l.Arvo(LennonAikajana.AloitusMatkaLoppu).s - kaari) < 1e-6, $"{id}: kierron kulma");
                double h = 1e-6;
                double W(double t) => (l.Arvo(t + h).s - l.Arvo(t - h).s) / (2 * h * T);
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
            // Irtautumisessa (5,8–7,6 s) koneen ruutuosuus ei kasva; kamera maan ja koneen yllä koko koneen vaiheen ajan.
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                var j = l.Jako;
                double ed = double.MaxValue;
                for (int i = 0; i <= 400; i++)
                {
                    double t = j.Sivu + (j.Liuku - j.Sivu) * i / 400.0;
                    double k = l.Arvo(t).kone;
                    Oleta.Tosi(k >= 0 && k <= ed + 1e-12, $"{id}: koneen koko kasvaa t={t * j.KestoS:0.00} s ({k:0.000})");
                    ed = k;
                }
                for (int i = 0; i <= 2400; i++)
                {
                    double t = i / 2400.0;
                    var (silma, _, _, h) = LennonKamerareitti.Kuva(l, t);
                    double korkeus = Pituus(silma[0], silma[1], silma[2]) - 6371000.0;
                    Oleta.Tosi(korkeus > 1000, $"{id}: silmä {korkeus:0} m t={t * j.KestoS:0.00} s");
                    if (t >= LennonAikajana.AloitusKatseKoneessa && t <= LennonAikajana.AloitusMatkaLoppu)
                        Oleta.Tosi(korkeus >= h, $"{id}: silmä {korkeus:0} m koneen ({h:0} m) alla t={t * j.KestoS:0.00} s");
                }
            }
        }

        [Testi]
        static void KoneEteneeLevostaPerille()
        {
            // Koneen eteneminen (AloitusReitti.KoneenOsuus): monotoninen, lähikuvassa 20 km/s kaikilla reiteillä, matkassa
            // nopein, perillä laskeutumisessa (11,0 s) ja laskeutumisen kulmanopeus kamerasta enintään 0,3 rad/s.
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                double T = l.Jako.KestoS, ed = 0;
                for (int i = 1; i <= 2400; i++)
                {
                    double p = l.P(i / 2400.0);
                    Oleta.Tosi(p >= ed - 1e-12, $"{id}: kone taaksepäin t={i / 200.0:0.000} s");
                    ed = p;
                }
                double V(double s) => (l.P((s + 0.01) / T) - l.P((s - 0.01) / T)) / 0.02 * l.ReittiM;
                foreach (double s in new[] { 3.5, 4.5, 5.5 })
                    Oleta.Tosi(Math.Abs(V(s) - LennonAikajana.AloitusLahiNopeus) < 0.02 * LennonAikajana.AloitusLahiNopeus, $"{id}: lähikuvan nopeus {V(s):0} m/s");
                Oleta.Tosi(V(8.0) > 10 * V(4.5), $"{id}: matka ei nopein ({V(8.0):0} m/s)");
                Oleta.Tosi(l.Reitti.MatkaNopeus > 0 && l.Reitti.LaskuKulma > 0 && l.Reitti.LaskuKulma <= LennonAikajana.AloitusLaskuKulmaMax + 1e-12,
                    $"{id}: matka {l.Reitti.MatkaNopeus:0} m/s, lasku {l.Reitti.LaskuKulma:0.000} rad/s");
            }
        }

        [Testi]
        static void TulostaKierrot()
        {
            // Ei väitteitä: kylki, orbitin kulma ja matkan ajelehdinta kohteittain (./kaanna.sh TulostaKierrot).
            foreach (var (id, lat, lon) in Kohteet)
            {
                var l = Aloitus(id, lat, lon);
                var r = l.Reitti;
                Console.WriteLine($"      {id,-12} kylki {(r.Puoli > 0 ? "+" : "−")}  kierto {r.Kaari,6:0}°  " +
                                  $"{(Math.Sign(r.Kaari) == r.Puoli ? "sama suunta" : "VASTASUUNTA")}  ajelehdinta {r.Ajelehdinta,6:0}°");
            }
        }

        static readonly string[] Nimi = { "log etäisyys", "kallistus", "suunta", "kohde", "kone", "koneen reittiosuus" };
        static double Pituus(double x, double y, double z) => Math.Sqrt(x * x + y * y + z * z);
    }
}
