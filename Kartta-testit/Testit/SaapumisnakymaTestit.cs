// Saapumisnäkymä (Assets/Matkakirja/Kartta/Saapumisnakyma.cs) webin omaa koodia vasten: kultaiset arvot
// Kultaiset/saapuminen.json tehdään webin js/pallolauta/kamera.js kotiin-ajolla (Kultaiset/tee-saapuminen.mjs).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Kartta.Testit
{
    static class SaapumisnakymaTestit
    {
        static string Juuri([System.Runtime.CompilerServices.CallerFilePath] string p = "") =>
            Path.GetFullPath(Path.Combine(Path.GetDirectoryName(p), ".."));

        sealed class Tapaus
        {
            public string Maa, Kaupunki, Ruutu;
            public double Lat, Lon, W, H, Dpr;
            public bool Mahtuu;
            public Saapumisnakyma.Laatikko? Laatikko;
            public double WebLat, WebLng, WebAlt, KLat, KLng, KAlt;
        }

        static List<Tapaus> tapaukset;
        static List<Tapaus> Tapaukset()
        {
            if (tapaukset != null) return tapaukset;
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(Juuri(), "Kultaiset", "saapuminen.json"))));
            tapaukset = new List<Tapaus>();
            foreach (var o in MiniJson.Taulukko(juuri["tapaukset"]))
            {
                var t = MiniJson.Objekti(o);
                var l = MiniJson.ObjektiTaiNull(MiniJson.Kentta(t, "laatikko"));
                var web = MiniJson.Objekti(t["web"]);
                var k = MiniJson.Objekti(t["kaupunkinakyma"]);
                tapaukset.Add(new Tapaus
                {
                    Maa = MiniJson.Teksti(t, "maa"), Kaupunki = MiniJson.Teksti(t, "kaupunki"), Ruutu = MiniJson.Teksti(t, "ruutu"),
                    Lat = L(t, "lat"), Lon = L(t, "lon"), W = L(t, "w"), H = L(t, "h"), Dpr = L(t, "dpr"),
                    Mahtuu = MiniJson.Totuus(t, "mahtuu"),
                    Laatikko = l == null ? null : new Saapumisnakyma.Laatikko(L(l, "x"), L(l, "y"), L(l, "w"), L(l, "h")),
                    WebLat = L(web, "lat"), WebLng = L(web, "lng"), WebAlt = L(web, "altitude"),
                    KLat = L(k, "lat"), KLng = L(k, "lng"), KAlt = L(k, "altitude"),
                });
            }
            return tapaukset;
        }

        static double L(Dictionary<string, object> o, string nimi) => MiniJson.Luku(o, nimi) ?? double.NaN;
        static double Kiedo(double lon) => ((lon % 360.0) + 540.0) % 360.0 - 180.0;

        static void Sama(double odotettu, double saatu, double tol, string viesti)
        {
            if (!(Math.Abs(odotettu - saatu) <= tol)) throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} ({viesti})");
        }

        static Saapumisnakyma.Tulos Laske(Tapaus t, Saapumisnakyma.Laatikko? l) =>
            Saapumisnakyma.Laske(l, t.Lat, t.Lon, t.W, t.H, Saapumisnakyma.PalloFov, t.Dpr);

        [Testi] static void ProjektioEdesTakaisin()
        {
            foreach (var (lon, lat) in new[] { (23.741, 37.97), (-74.0, 40.7), (139.7, 35.7), (-70.0, -33.0), (179.9, 65.0) })
            {
                var (x, y) = Saapumisnakyma.ProjisoiLaudalle(lon, lat);
                var a = Saapumisnakyma.LaudaltaAsteiksi(x, y);
                Sama(lon, a.Lon, 1e-9, "pituus"); Sama(lat, a.Lat, 1e-9, "leveys");
            }
            // Lontoo laudalla (js/packs: x 5829,5, y 1324,1).
            var lontoo = Saapumisnakyma.LaudaltaAsteiksi(5829.5, 1324.1);
            var takaisin = Saapumisnakyma.ProjisoiLaudalle(lontoo.Lon, lontoo.Lat);
            Sama(5829.5, takaisin.X, 1e-6, "lontoo x"); Sama(1324.1, takaisin.Y, 1e-6, "lontoo y");
        }

        /// <summary>Maan laatikolla: sama keskipiste ja korkeus kuin webin kotiin({ bbox }).</summary>
        [Testi] static void MaanNakymaKuinWebissa()
        {
            int maassa = 0;
            foreach (var t in Tapaukset())
            {
                var r = Laske(t, t.Laatikko);
                string n = $"{t.Kaupunki} {t.Ruutu} {r.Tapa}";
                Oleta.Sama(t.Mahtuu, r.Tapa != Saapumisnakyma.Tapa.Kaupunkinakyma, n + " mahtuu");
                Sama(t.WebLat, r.Lat, 1e-6, n + " lat");
                Sama(0, Kiedo(t.WebLng - r.Lon), 1e-6, n + " lon");
                Sama(t.WebAlt, r.Korkeus, 1e-7, n + " korkeus");
                Oleta.Sama(0.0, r.Kallistus, n + " kallistus");
                if (t.Mahtuu) maassa++;
            }
            Oleta.Tosi(maassa >= 20, $"maanäkymiä {maassa}");
        }

        /// <summary>Ilman laatikkoa (tuntematon maa, rajat lataamatta): webin kaupunkinäkymä.</summary>
        [Testi] static void KaupunkinakymaKuinWebissa()
        {
            foreach (var t in Tapaukset())
            {
                var r = Laske(t, null);
                string n = $"{t.Kaupunki} {t.Ruutu}";
                Oleta.Sama(Saapumisnakyma.Tapa.Kaupunkinakyma, r.Tapa, n);
                Sama(t.KLat, r.Lat, 1e-6, n + " lat");
                Sama(0, Kiedo(t.KLng - r.Lon), 1e-6, n + " lon");
                Sama(t.KAlt, r.Korkeus, 1e-7, n + " korkeus");
                Oleta.Tosi(r.Lat > t.Lat, n + ": kaupunki ruudun alaosassa → kamera kaupungin pohjoispuolella");
            }
        }

        [Testi] static void LiianIsoLaatikkoOnKaupunkinakyma()
        {
            var iso = new Saapumisnakyma.Laatikko(1000, 500, 1900, 900);
            var r = Saapumisnakyma.Laske(iso, 40, -100, 1210, 834, 50, 2);
            Oleta.Sama(Saapumisnakyma.Tapa.Kaupunkinakyma, r.Tapa, "katto 2000 × 1,10");
            Oleta.Tosi(r.Korkeus >= r.KorkeusMin && r.Korkeus <= Saapumisnakyma.KorkeusMax, "rajoissa");
        }

        // ------------------------------------------------------------------ maan rajat (build 13, D7/D8)

        static Saapumisnakyma.Laatikko Ranska()
        {
            var a = Saapumisnakyma.ProjisoiLaudalle(-5, 51.1);
            var b = Saapumisnakyma.ProjisoiLaudalle(8.2, 42.3);
            return new Saapumisnakyma.Laatikko(a.X, a.Y, b.X - a.X, b.Y - a.Y);
        }

        [Testi] static void UloszoomauksenKattoOnSaapumisnakyma()
        {
            // Web kamera.js:1059: sama kaava kuin saapumisella kertoimella 1,02 → katto = saapumisen korkeus.
            var r = Saapumisnakyma.Laske(Ranska(), 43.3, 5.4, 390, 700, 50, 3);
            var katto = Saapumisnakyma.Uloszoomauskatto(r);
            Oleta.Tosi(katto.HasValue && katto.Value == r.Korkeus, $"katto {katto} = saapuminen {r.Korkeus}");
            var iso = Saapumisnakyma.Laske(new Saapumisnakyma.Laatikko(1000, 500, 1900, 900), 40, -100, 1210, 834, 50, 2);
            Oleta.Tosi(!Saapumisnakyma.Uloszoomauskatto(iso).HasValue, "kaupunkinäkymässä ei kattoa (RUS, USA)");
        }

        [Testi] static void PanorajaLaatikkoKertaa13()
        {
            // Leveällä ruudulla (ei korkeuteen sovitusta) raja on laatikko × 1,3 keskeltä.
            var l = Ranska();
            var raja = Saapumisnakyma.MaanPanoraja(l, 1400, 900, 5.4, 0);
            Oleta.Tosi(raja.HasValue && raja.Value.Pituus && !raja.Value.Elava, "kiinteä raja");
            var r = raja.Value;
            var keski = Saapumisnakyma.LaudaltaAsteiksi(l.X + l.W / 2, l.Y + l.H / 2);
            Oleta.Tosi(r.LatMin < 42.3 && r.LatMax > 51.1 && r.LngMin < -5 && r.LngMax > 8.2, $"sisältää Ranskan: {r.LatMin:0.#}–{r.LatMax:0.#}, {r.LngMin:0.#}–{r.LngMax:0.#}");
            Lahella(keski.Lon, (r.LngMin + r.LngMax) / 2, 1e-6, "keskellä");
            // Japani rajataan pois; pituus lähimpään kiertoon.
            var (lat, lon) = Saapumisnakyma.RajaaPanorointi(r, 36, 139);
            Oleta.Tosi(lat <= r.LatMax && lat >= r.LatMin && lon == r.LngMax, $"Japani → itäreuna ({lat:0.#}, {lon:0.#})");
            var (lat2, lon2) = Saapumisnakyma.RajaaPanorointi(r, 46, 2 + 360);
            Lahella(2, lon2, 1e-9, "kierto"); Lahella(46, lat2, 1e-9, "sisällä ennallaan");
        }

        static void Lahella(double odotettu, double saatu, double vara, string viesti) =>
            Oleta.Tosi(System.Math.Abs(odotettu - saatu) <= vara, $"{viesti}: {odotettu} ≠ {saatu}");

        [Testi] static void KapeallaRuudullaPituusrajaElaa()
        {
            // Puhelimen pystykotelo: korkeuteen sovitus → X-raja riippuu korkeudesta (web panoraja elava).
            var l = Ranska();
            var kaukana = Saapumisnakyma.MaanPanoraja(l, 377, 690, 5.4, 0);
            Oleta.Tosi(kaukana.HasValue && kaukana.Value.Elava, "elävä raja");
            var lahella = Saapumisnakyma.MaanPanoraja(l, 377, 690, 5.4, 0.02);
            Oleta.Tosi(lahella.Value.LngMax - lahella.Value.LngMin > kaukana.Value.LngMax - kaukana.Value.LngMin,
                $"lähempänä saa panoroida laajemmin: {lahella.Value.LngMin:0.##}–{lahella.Value.LngMax:0.##} vs {kaukana.Value.LngMin:0.##}–{kaukana.Value.LngMax:0.##}");
        }

        // ------------------------------------------------------------------ kotelo → koko ruutu (löydös 50)

        [Testi] static void WebinKoteloKuinMitattu()
        {
            // web-nostot-kartalla-mitat.txt raakamitat "kotelo" (Chromium, 25.9.2026).
            foreach (var (w, h, x, y, kw, kh) in new[] {
                (402.0, 874.0, 8.1875, 64.78125, 385.625, 801.03125),
                (834.0, 1210.0, 10.59375, 71.96875, 812.8125, 1127.4375),
                (1194.0, 834.0, 10.59375, 10.59375, 1172.8125, 812.8125) })
            {
                var k = Saapumisnakyma.WebinKotelo(w, h);
                string n = $"{w}x{h}";
                Sama(x, k.X, 1e-9, n + " x"); Sama(y, k.Y, 1e-9, n + " y");
                Sama(kw, k.W, 1e-9, n + " w"); Sama(kh, k.H, 1e-9, n + " h");
            }
        }

        /// <summary>
        /// Pallon piste ruudulle (pt, y alas): kamera katselupisteen (lat, lon) yllä korkeudella h pallonsäteinä,
        /// pohjoinen ylös, kallistus 0, pystykulma fov ruudun korkeudella h_pt (Globe.gl / natiivin PalloKierto).
        /// </summary>
        static (double X, double Y) Projisoi(double camLat, double camLon, double h, double wPt, double hPt, double fov, double lat, double lon)
        {
            double r = Math.PI / 180.0;
            (double, double, double) Ykkonen(double la, double lo) => (Math.Cos(la * r) * Math.Cos(lo * r), Math.Cos(la * r) * Math.Sin(lo * r), Math.Sin(la * r));
            var n = Ykkonen(camLat, camLon);
            var ita = (-Math.Sin(camLon * r), Math.Cos(camLon * r), 0.0);
            var poh = (-Math.Sin(camLat * r) * Math.Cos(camLon * r), -Math.Sin(camLat * r) * Math.Sin(camLon * r), Math.Cos(camLat * r));
            var p = Ykkonen(lat, lon);
            var v = (p.Item1 - (1 + h) * n.Item1, p.Item2 - (1 + h) * n.Item2, p.Item3 - (1 + h) * n.Item3);
            double Piste((double, double, double) a, (double, double, double) b) => a.Item1 * b.Item1 + a.Item2 * b.Item2 + a.Item3 * b.Item3;
            double z = -Piste(v, n), s = hPt / 2 / Math.Tan(fov / 2 * r);
            return (wPt / 2 + s * Piste(v, ita) / z, hPt / 2 - s * Piste(v, poh) / z);
        }

        /// <summary>Pistettä leveysastetta kohden ruudulla: ±2° webin pov:n ympäriltä sen pituudella.</summary>
        static double PxAsteelle(Func<double, double, (double X, double Y)> proj, double lat, double lon) =>
            (proj(lat - 2, lon).Y - proj(lat + 2, lon).Y) / 4.0;

        /// <summary>
        /// LÖYDÖS 50 (Natiivi-UI 25.9.): saapumisnäkymä natiivin koko ruudun kameralla vastaa webin mittauksia
        /// (lokit/pariteetti-b12/web-nostot-kartalla-mitat.txt kohta 1 ja I): webin pov kotelossa sama kuin mitattu,
        /// ja natiivin kuvassa sama mittakaava (px/°lat) ja pov kotelon keskellä kuin webissä. Ennen korjausta
        /// (Laske koko ruudulle) mittakaava oli ruudun / kotelon korkeus = 1,03–1,09 × webin.
        /// </summary>
        [Testi] static void SaapumisnakymaRuudullaKuinWebissa()
        {
            var fra = Tapaukset().First(t => t.Maa == "FRA" && t.Laatikko.HasValue).Laatikko;
            var grc = Tapaukset().First(t => t.Maa == "GRC" && t.Laatikko.HasValue).Laatikko;
            // maa, laatikko, kaupunki, ruutu (pt), dpr, webin pov lat/lng/alt ja mitattu px/°lat.
            var mitat = new (string Nimi, Saapumisnakyma.Laatikko? L, double Lat, double Lon, double W, double H, double Dpr,
                double WebLat, double WebLng, double WebAlt, double WebPx)[]
            {
                ("ranska-iphone", fra, 43.297, 5.381, 402, 874, 3, 46.3481, 5.2490, 0.20491, 72.1),
                ("ranska-ipad", fra, 43.297, 5.381, 834, 1210, 2, 46.3481, 3.7146, 0.20493, 101.6),
                ("ranska-ipad-vaaka", fra, 43.297, 5.381, 1194, 834, 2, 46.3481, 2.2100, 0.20494, 73.1),
                ("kreikka-iphone", grc, 37.9699, 23.741, 402, 874, 3, 38.3253, 23.7410, 0.14577, 102.1),
                ("kreikka-ipad", grc, 37.9699, 23.741, 834, 1210, 2, 38.3253, 23.7410, 0.14577, 143.7),
                ("kreikka-ipad-vaaka", grc, 37.9699, 23.741, 1194, 834, 2, 38.3253, 23.9375, 0.14578, 103.5),
            };
            bool tulosta = Environment.GetEnvironmentVariable("SAAPUMINEN_RUUTU") != null;
            foreach (var m in mitat)
            {
                var k = Saapumisnakyma.WebinKotelo(m.W, m.H);
                var r = Saapumisnakyma.LaskeRuudulle(m.L, m.Lat, m.Lon, m.W, m.H, Saapumisnakyma.PalloFov, m.Dpr);
                string n = m.Nimi;
                Sama(m.WebLat, r.WebLat, 1e-3, n + " web lat");
                // Ranska iPhone: web mittasi 5,249, kaava antaa Marseillen oman 5,381 (kaistan yläraja 5,925 kotelon
                // kuvasuhteella 0,481; 5,249 vastaisi kuvasuhdetta 0,556 eli saapuessa ~690 pt korkeaa koteloa).
                // Ero 0,13° ≈ 7 pt vaakaan; muut ≤ 0,005°.
                Sama(m.WebLng, r.WebLon, n == "ranska-iphone" ? 0.15 : 0.01, n + " web lng");
                Sama(m.WebAlt, r.WebKorkeus, 1e-4, n + " web alt");
                Func<double, double, (double X, double Y)> web = (la, lo) =>
                {
                    var q = Projisoi(r.WebLat, r.WebLon, r.WebKorkeus, k.W, k.H, Saapumisnakyma.PalloFov, la, lo);
                    return (q.X + k.X, q.Y + k.Y);
                };
                Func<double, double, (double X, double Y)> natiivi = (la, lo) =>
                    Projisoi(r.Lat, r.Lon, r.Korkeus, m.W, m.H, Saapumisnakyma.PalloFov, la, lo);
                double pxWeb = PxAsteelle(web, r.WebLat, r.WebLon), pxNat = PxAsteelle(natiivi, r.WebLat, r.WebLon);
                var pov = natiivi(r.WebLat, r.WebLon);
                Sama(k.X + k.W / 2, pov.X, 0.5, n + " pov x kotelon keskellä");
                Sama(k.Y + k.H / 2, pov.Y, 0.5, n + " pov y kotelon keskellä");
                Sama(1, pxNat / pxWeb, 0.003, n + $" px/°lat natiivi {pxNat:0.0} vs web-malli {pxWeb:0.0}");
                // Webin mitattu px/° on merkkien lineaarinen sovitus koko kuvan yli (pallo kaartuu): 3 %.
                Sama(1, pxNat / m.WebPx, 0.03, n + $" px/°lat natiivi {pxNat:0.0} vs mitattu {m.WebPx}");
                // Webin reunat (kotelon kulmat) samoissa pisteissä: Strasbourg ja Nizza / Korfu ja Rodos.
                foreach (var (la, lo) in m.Nimi.StartsWith("ranska") ? new[] { (48.573, 7.752), (43.703, 7.266) } : new[] { (39.62, 19.92), (36.43, 28.22) })
                {
                    var a = web(la, lo); var b = natiivi(la, lo);
                    Sama(a.X, b.X, 1.5, $"{n} ({la}, {lo}) x"); Sama(a.Y, b.Y, 1.5, $"{n} ({la}, {lo}) y");
                }
                var ennen = Saapumisnakyma.Laske(m.L, m.Lat, m.Lon, m.W, m.H, Saapumisnakyma.PalloFov, m.Dpr);
                double pxEnnen = PxAsteelle((la, lo) => Projisoi(ennen.Lat, ennen.Lon, ennen.Korkeus, m.W, m.H, Saapumisnakyma.PalloFov, la, lo), r.WebLat, r.WebLon);
                // Juurisyy: ennen korjausta mittakaava oli ruudun / kotelon korkeus × webin (iPhone 1,091, iPad 1,073, vaaka 1,026).
                Sama(m.H / k.H, pxEnnen / pxWeb, 0.01, $"{n}: ennen korjausta {pxEnnen:0.0} px/° (web {pxWeb:0.0})");
                if (tulosta)
                    Console.WriteLine($"  {n}: kotelo {k}; web pov ({r.WebLat:0.####}, {r.WebLon:0.####}) {r.WebKorkeus:0.#####} R, " +
                        $"{pxWeb:0.0} px/°lat (mitattu {m.WebPx}); ennen ({ennen.Lat:0.###}, {ennen.Lon:0.###}) {ennen.Korkeus:0.#####} R " +
                        $"{pxEnnen:0.0} px/°lat; nyt ({r.Lat:0.###}, {r.Lon:0.###}) {r.Korkeus:0.#####} R {pxNat:0.0} px/°lat");
            }
            if (tulosta)
                foreach (var (nimi, l, la, lo) in new[] { ("ranska", fra, 43.297, 5.381), ("kreikka", grc, 37.9699, 23.741) })
                {
                    var r = Saapumisnakyma.LaskeRuudulle(l, la, lo, 1024, 1366, Saapumisnakyma.PalloFov, 2);
                    var ennen = Saapumisnakyma.Laske(l, la, lo, 1024, 1366, Saapumisnakyma.PalloFov, 2);
                    Console.WriteLine($"  {nimi}-ipad13 1024x1366: kotelo {Saapumisnakyma.WebinKotelo(1024, 1366)}; web ({r.WebLat:0.####}, {r.WebLon:0.####}) " +
                        $"{r.WebKorkeus:0.#####} R {r.Tapa}; ennen {ennen.Korkeus:0.#####} R ({ennen.Tapa}); nyt ({r.Lat:0.###}, {r.Lon:0.###}) {r.Korkeus:0.#####} R");
                }
        }

        /// <summary>Kotelo = koko ruutu: LaskeRuudulle on sama kuin Laske (kultaiset arvot pätevät sellaisinaan).</summary>
        [Testi] static void KoteloKokoRuutuOnWebinLaske()
        {
            foreach (var t in Tapaukset())
            {
                var a = Laske(t, t.Laatikko);
                var b = Saapumisnakyma.LaskeRuudulle(t.Laatikko, t.Lat, t.Lon, t.W, t.H, Saapumisnakyma.PalloFov, t.Dpr,
                    new Saapumisnakyma.Kotelo(0, 0, t.W, t.H));
                string n = $"{t.Kaupunki} {t.Ruutu}";
                Sama(a.Lat, b.Lat, 1e-12, n + " lat"); Sama(a.Lon, b.Lon, 1e-12, n + " lon"); Sama(a.Korkeus, b.Korkeus, 1e-12, n + " korkeus");
            }
        }

        static Dictionary<string, List<(double Lon, double Lat)[]>> rajat;
        /// <summary>Maarajat: SAAPUMINEN_MAARAJAT=polku (esim. tuore vienti), muuten linssien kultainen paketti.</summary>
        static Dictionary<string, List<(double Lon, double Lat)[]>> Rajat() => rajat ??= Saapumisnakyma.LueMaarajat(MiniJson.Jasenna(File.ReadAllText(
            Environment.GetEnvironmentVariable("SAAPUMINEN_MAARAJAT") is string p && p.Length > 0 ? p
                : Path.Combine(Juuri(), "..", "Linssit-testit", "kultaiset", "paketti", "maarajat.json"))));

        static Saapumisnakyma.Laatikko? NatiivinLaatikko(Tapaus t)
        {
            var raaka = Rajat().TryGetValue(t.Maa, out var renkaat) ? Saapumisnakyma.MaanLautalaatikko(renkaat, t.Lat, t.Lon) : null;
            return raaka.HasValue ? Saapumisnakyma.Valjenna(raaka.Value) : (Saapumisnakyma.Laatikko?)null;
        }

        /// <summary>
        /// Natiivin laatikko maarajat.jsonista on webin maapolygonit.json-laatikon kokoinen: reunat enintään 4 %
        /// pidemmästä sivusta toisistaan (vienti harventaa 0,05°: FRA 2,5 %, JPN 3,2 %). Kiinni jää ankkurin,
        /// sauman ja saarivaran virhe. <see cref="PudotetutSaaret"/>: vienti pudottaa alle 4 pisteen renkaat
        /// (tools/vienti/maarajat.mjs), joten pieni saari, joka webissä venyttää laatikkoa, puuttuu (mitat.md).
        /// </summary>
        static readonly Dictionary<string, double> PudotetutSaaret = new Dictionary<string, double>
        {
            ["ITA"] = 0.10, // Lampedusa ja Linosa: h 508 → 460
            ["AUS"] = 0.13, // Lord Howe (159° E): w 1694 → 1492
        };

        [Testi] static void MaarajojenLaatikkoKuinWebissa()
        {
            foreach (var t in Tapaukset().Where(x => x.Ruutu == "ipad-vaaka" && x.Laatikko.HasValue))
            {
                var n = NatiivinLaatikko(t);
                Oleta.Tosi(n.HasValue, t.Maa + " laatikko");
                var w = t.Laatikko.Value; var l = n.Value;
                if (Environment.GetEnvironmentVariable("SAAPUMINEN_LAATIKOT") != null) Console.WriteLine($"  {t.Maa}: web {w} natiivi {l}");
                double tol = Math.Max(4.0, (PudotetutSaaret.TryGetValue(t.Maa, out var o) ? o : 0.04) * Math.Max(w.W, w.H));
                // x voi olla laudan leveyden monikerran päässä (sauma).
                double dx = l.X - w.X; dx -= Math.Round(dx / Saapumisnakyma.LaudanLeveys) * Saapumisnakyma.LaudanLeveys;
                Sama(0, dx, tol, t.Maa + " x");
                Sama(w.Y, l.Y, tol, t.Maa + " y");
                Sama(w.W, l.W, tol, t.Maa + " w");
                Sama(w.H, l.H, tol, t.Maa + " h");
            }
        }

        /// <summary>
        /// PalloKierron omat rajat (KorkeusKaarelle/Aja: MinKorkeus minKaari 3,6° ja MaxKorkeus täyttö 0,92
        /// kapeammassa suunnassa, pystykulma 50°) pallonsäteinä tälle ruudulle.
        /// </summary>
        static (double Min, double Max) KierronRajat(double w, double h)
        {
            double pysty = 25.0 * Math.PI / 180.0;
            double puoli = Math.Min(pysty, Math.Atan(Math.Tan(pysty) * w / h));
            return (3.6 * Math.PI / 180.0 / (2.0 * Math.Tan(puoli)), 1.0 / Math.Sin(puoli * 0.92) - 1.0);
        }

        /// <summary>SAAPUMINEN_MITAT=polku.md: vertailutaulukko natiivi (maarajat) vs web (maapolygonit).</summary>
        [Testi] static void Mittaustaulukko()
        {
            var polku = Environment.GetEnvironmentVariable("SAAPUMINEN_MITAT");
            if (string.IsNullOrEmpty(polku)) return;
            var sb = new StringBuilder();
            sb.AppendLine("| maa | kaupunki | ruutu | tapa | natiivi lat, lon | web lat, lon | natiivi korkeus R (km) | web korkeus R (km) | ero | PalloKierron rajoin R | natiivi leveys yks |");
            sb.AppendLine("|---|---|---|---|---|---|---|---|---|---|---|");
            foreach (var t in Tapaukset())
            {
                var r = Laske(t, NatiivinLaatikko(t));
                double ero = (r.Korkeus / t.WebAlt - 1) * 100;
                var (min, max) = KierronRajat(t.W, t.H);
                double kierto = Math.Min(max, Math.Max(min, r.Korkeus));
                string rajattu = Math.Abs(kierto - r.Korkeus) > 1e-9 ? $"**{kierto:0.0000}**" : "=";
                sb.AppendLine($"| {t.Maa} | {t.Kaupunki} | {t.Ruutu} | {r.Tapa} | {r.Lat:0.00}, {r.Lon:0.00} | {t.WebLat:0.00}, {t.WebLng:0.00} | " +
                              $"{r.Korkeus:0.0000} ({r.KorkeusMetreina / 1000:0}) | {t.WebAlt:0.0000} ({t.WebAlt * Saapumisnakyma.Sade / 1000:0}) | " +
                              $"{ero:+0.0;-0.0;0.0} % | {rajattu} | {r.NakyvaLeveys:0} |");
            }
            File.WriteAllText(polku, sb.ToString());
        }
    }
}
