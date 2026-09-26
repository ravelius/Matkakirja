// ISS-linssi: SGP4-ydin Vallado 2006 -vertailuvektoria vastaan (satelliitti 00005, tcppver.out), ISS:n rata ja alapiste.
using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class IssTestit
    {
        const string V1 = "1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753";
        const string V2 = "2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667";

        // ISS 2008 (Wikipedian TLE-esimerkki).
        const string I1 = "1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927";
        const string I2 = "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537";

        static void Lahella((double x, double y, double z) a, double x, double y, double z, double tol, string mita)
        {
            double d = Math.Sqrt((a.x - x) * (a.x - x) + (a.y - y) * (a.y - y) + (a.z - z) * (a.z - z));
            Oleta.Tosi(d < tol, $"{mita}: ero {d:G4} ({a.x:F5}, {a.y:F5}, {a.z:F5})");
        }

        [Testi] static void TleJasentyy()
        {
            var t = Tle.Jasenna(V1, V2);
            Oleta.Sama(5, t.Numero);
            Oleta.Tosi(Math.Abs(t.Eksentrisyys - 0.1859667) < 1e-9, "eksentrisyys");
            Oleta.Tosi(Math.Abs(t.Bstar - 0.28098e-4) < 1e-12, "B*: " + t.Bstar);
            Oleta.Tosi(Math.Abs(t.Keskiliike * 1440 / (2 * Math.PI) - 10.82419157) < 1e-8, "keskiliike");
            Oleta.Tosi(Tle.Tarkiste(V1) && Tle.Tarkiste(V2), "tarkiste");
            Oleta.Tosi(Tle.Jasenna(I1, I2).Bstar < 0, "negatiivinen B*");
        }

        [Testi] static void TleJsonSiirtosepanMuodossa()
        {
            string J(string r1, string r2) =>
                "{\"nimi\":\"ISS (ZARYA)\",\"rivi1\":\"" + r1 + "\",\"rivi2\":\"" + r2 + "\",\"haettu\":\"2026-09-26T15:00:00Z\",\"lahde\":\"CelesTrak\"}";
            var t = Tle.JasennaJson(J(I1, I2));
            Oleta.Tosi(t != null, "kelvollinen json");
            Oleta.Sama(25544, t.Numero);
            Oleta.Sama("ISS (ZARYA)", t.Nimi);
            Oleta.Sama("2026-09-26T15:00:00Z", t.Haettu);
            Oleta.Sama("CelesTrak", t.Lahde);
            Oleta.Tosi(Tle.JasennaJson(J(I1, I2.Substring(0, 68) + "0")) == null, "väärä tarkiste → null");
            Oleta.Tosi(Tle.JasennaJson(J(I1, "2 25544")) == null, "lyhyt rivi → null");
            Oleta.Tosi(Tle.JasennaJson("{\"nimi\":\"ISS\"}") == null, "rivit puuttuvat → null");
            Oleta.Tosi(Tle.JasennaJson("rikki{") == null && Tle.JasennaJson(null) == null, "rikki → null");
        }

        static double Kulma(Matkakirja.Linssit.Aikajana.LatLon a, Matkakirja.Linssit.Aikajana.LatLon b)
        {
            double r = Math.PI / 180, c = Math.Sin(a.Lat * r) * Math.Sin(b.Lat * r) + Math.Cos(a.Lat * r) * Math.Cos(b.Lat * r) * Math.Cos((a.Lon - b.Lon) * r);
            return Math.Acos(Math.Max(-1, Math.Min(1, c))) / r;
        }

        // Siirtosepän ensimmäinen ämpäritiedosto (media.matkakirja.app/data/iss-tle.json, 26.9.2026, #3334).
        const string AmpariNayte = "{\"nimi\": \"ISS (ZARYA)\", \"rivi1\": \"1 25544U 98067A   26269.01266414  .00010261  00000+0  19655-3 0  9997\", \"rivi2\": \"2 25544  51.6303 161.0895 0007829 186.0461 174.0434 15.48628597587381\", \"haettu\": \"2026-09-26T14:57:26.605Z\", \"lahde\": \"CelesTrak GP (NORAD 25544)\"}";

        [Testi] static void TleJsonAmparinNayte()
        {
            var t = Tle.JasennaJson(AmpariNayte);
            Oleta.Tosi(t != null && t.TarkisteOk, "ämpärin näyte jäsentyy");
            Oleta.Sama(25544, t.Numero);
            var r = new Rata(t);
            Oleta.Tosi(r.Kaytettavissa, r.Syy ?? "");
            Oleta.Tosi(r.Alapiste(t.EpookkiJd, out double lat, out _, out double km), "alapiste");
            Oleta.Tosi(Math.Abs(lat) <= 52 && km > 350 && km < 450, $"leveys {lat:F1}, korkeus {km:F0} km");
        }

        [Testi] static void IssNytIlmanTletaHavainnollinen()
        {
            IssNyt.Nollaa();
            var t0 = new DateTime(2026, 9, 26, 12, 0, 0, DateTimeKind.Utc);
            Oleta.Tosi(IssNyt.Laatu(t0) == RadanLaatu.Havainnollinen, "ilman TLE:tä havainnollinen");
            var p0 = IssNyt.Paikka(t0);
            Oleta.Tosi(Math.Abs(p0.Lat) <= 51.6 + 1e-9, "leveys ≤ 51,6°: " + p0.Lat);
            // Oikea vauhti: minuutissa noin 360/92,9 ≈ 3,9° radalla (maan kierto lisää ≤ 0,25°).
            double d = Kulma(p0, IssNyt.Paikka(t0.AddMinutes(1)));
            Oleta.Tosi(d > 3.5 && d < 4.3, "minuutissa " + d.ToString("F2") + "°");
        }

        [Testi] static void IssNytTlellaSgp4JaLaatu()
        {
            IssNyt.Nollaa();
            var tle = Tle.Jasenna(I1, I2);
            Oleta.Tosi(IssNyt.Aseta(tle), "aseta");
            Oleta.Tosi(!IssNyt.Aseta(Tle.Jasenna(I1, I2)), "sama epookki ei vaihda");
            // Epookki 2008 päivä 264,51782528 = 20.9.2008 klo 12.25.40 UTC.
            var ep = new DateTime(2008, 9, 20, 12, 25, 40, DateTimeKind.Utc);
            var t = ep.AddHours(1);
            Oleta.Tosi(IssNyt.Laatu(t) == RadanLaatu.Tarkka, "tunti epookista tarkka");
            Oleta.Tosi(IssNyt.Laatu(ep.AddDays(10)) == RadanLaatu.Arvio, "10 vrk arvio");
            Oleta.Tosi(IssNyt.Laatu(ep.AddDays(40)) == RadanLaatu.Havainnollinen, "40 vrk havainnollinen");
            new Rata(tle).Alapiste(Aika.Jd(t), out double lat, out double lon, out _);
            var p = IssNyt.Paikka(t);
            Oleta.Tosi(Math.Abs(p.Lat - lat) < 1e-9 && Math.Abs(p.Lon - lon) < 1e-9, "Paikka = SGP4-alapiste");
            var kaari = new Matkakirja.Linssit.Aikajana.LatLon[Matkakirja.Linssit.Astronautti.Astronauttimatikka.IssKaarenPisteita + 1];
            var kello = System.Diagnostics.Stopwatch.StartNew();
            IssNyt.Kaari(t, kaari);
            double ms = kello.Elapsed.TotalMilliseconds;
            Oleta.Tosi(Kulma(kaari[kaari.Length / 2], p) < 1e-6, "kaaren keskellä ISS");
            double suurin = 0;
            for (int k = 1; k < kaari.Length; k++) suurin = Math.Max(suurin, Kulma(kaari[k - 1], kaari[k]));
            Oleta.Tosi(suurin < 2.0, "pisteväli ≤ 2° (" + suurin.ToString("F2") + ")");
            Console.WriteLine($"      maajälki {kaari.Length} pistettä SGP4:llä {ms:F2} ms (ensimmäinen kutsu, JIT mukana)");
            IssNyt.Nollaa();
        }

        [Testi] static void ValladoVektoritEpookissaJa360Min()
        {
            var r = new Rata(Tle.Jasenna(V1, V2));
            Oleta.Tosi(r.Kaytettavissa, r.Syy ?? "");
            Oleta.Tosi(r.Sijainti(0, out var p0, out var v0), "t = 0");
            Lahella(p0, 7022.46529266, -1400.08296755, 0.03995155, 1e-3, "r(0) km");
            Lahella(v0, 1.893841015, 6.405893759, 4.534807250, 1e-6, "v(0) km/s");
            Oleta.Tosi(r.Sijainti(360, out var p1, out var v1), "t = 360");
            Lahella(p1, -7154.03120202, -3783.17682504, -3536.19412294, 1e-3, "r(360) km");
            Lahella(v1, 4.741887409, -4.151817765, -2.093935425, 1e-6, "v(360) km/s");
        }

        [Testi] static void IssKierrosJaKorkeus()
        {
            var r = new Rata(Tle.Jasenna(I1, I2));
            Oleta.Tosi(Math.Abs(r.KierrosMin - 91.6) < 1.0, "kierros noin 91,6 min: " + r.KierrosMin);
            for (double t = 0; t < 1440; t += 17)
            {
                Oleta.Tosi(r.Alapiste(r.Tle.EpookkiJd + t / 1440, out var lat, out var lon, out var h), "laskettavissa");
                Oleta.Tosi(h > 300 && h < 400, $"korkeus 2008 noin 350 km: {h:F1} (t {t})");
                Oleta.Tosi(Math.Abs(lat) <= 52.0, $"leveys ≤ inklinaatio + geodeettinen ero 0,2°: {lat:F2}");
                Oleta.Tosi(lon >= -180 && lon <= 180, "pituus");
            }
        }

        [Testi] static void AurinkoSeisauksissaJaTasauksessa()
        {
            // Kesäpäivänseisaus 20.6.2024 20.51 UTC: deklinaatio +23,44°; kevätpäiväntasaus 20.3.2024 3.06 UTC: 0°.
            Aurinko.Alihajapiste(Aika.Jd(2024, 6, 20, 20 + 51 / 60.0), out var lat, out _);
            Oleta.Tosi(Math.Abs(lat - 23.44) < 0.02, "kesäpäivänseisaus: " + lat);
            Aurinko.Alihajapiste(Aika.Jd(2024, 3, 20, 3 + 6 / 60.0), out lat, out var lon);
            Oleta.Tosi(Math.Abs(lat) < 0.02, "tasaus: " + lat);
            // Keskipäivä UTC Greenwichissä: alihajapiste lähellä nollameridiaania (aikayhtälö enintään ±4°).
            Aurinko.Alihajapiste(Aika.Jd(2024, 3, 20, 12), out _, out lon);
            Oleta.Tosi(Math.Abs(lon) < 4.5, "keskipäivä UTC → pituus lähellä 0: " + lon);
        }

        [Testi] static void IssVarjossaOsanKierroksesta()
        {
            var r = new Rata(Tle.Jasenna(I1, I2));
            int varjossa = 0, n = 0;
            for (double t = 0; t < r.KierrosMin; t += 0.5, n++)
            {
                r.Sijainti(t, out var p, out _);
                if (Aurinko.Varjossa(p, r.Tle.EpookkiJd + t / 1440)) varjossa++;
            }
            double osuus = varjossa / (double)n;
            Oleta.Tosi(osuus > 0.2 && osuus < 0.45, "ISS varjossa 20–45 % kierroksesta: " + osuus);
        }

        [Testi] static void GmstJ2000()
        {
            // J2000.0 (JD 2451545.0): GMST 280,46061837°.
            double g = Aika.Gmst(2451545.0) * 180 / Math.PI;
            Oleta.Tosi(Math.Abs(g - 280.46061837) < 1e-5, "GMST J2000: " + g);
            Oleta.Tosi(Math.Abs(Aika.Jd(2000, 1, 1, 12) - 2451545.0) < 1e-9, "JD 1.1.2000 12:00");
        }
    }
}
