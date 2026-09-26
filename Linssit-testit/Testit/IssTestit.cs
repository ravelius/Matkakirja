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
