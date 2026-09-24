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
