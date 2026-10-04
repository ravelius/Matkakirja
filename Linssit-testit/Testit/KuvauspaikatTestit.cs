// Tarkka ISS-kuva (omistaja 4.10.2026): Karttasepän kuvauspaikat, kameranappi vain kuvauspaikan kohdalla, rajaus paikan sisään.
using System;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class KuvauspaikatTestit
    {
        const string Helsinki = @"{""tunniste"": ""helsinki"", ""nimi"": ""Helsinki"", ""maa"": ""Suomi"", ""nimi_lcd"": ""HELSINKI"", ""maa_lcd"": ""SUOMI"",
            ""keskipiste"": [60.17, 24.94], ""bbox"": [24.759409, 60.080169, 25.120591, 60.259831], ""koko_m"": 20000, ""px"": 2048,
            ""m_px"": 9.77, ""kuva"": ""kuvauspaikat/v1/helsinki.jpg"", ""lahde"": ""Contains modified Copernicus Sentinel data""}";

        [Testi] static void YksittainenJaKooste()
        {
            var a = Kuvauspaikat.Jasenna(Helsinki);
            Oleta.Sama(1, a.Count);
            var h = a[0];
            Oleta.Sama("HELSINKI", h.NimiLcd); Oleta.Sama("SUOMI", h.MaaLcd);
            Oleta.Sama(60.17, h.Lat); Oleta.Sama(25.120591, h.E); Oleta.Sama(2048, h.Px);
            var b = Kuvauspaikat.Jasenna(@"{""paikat"": [" + Helsinki + @", {""tunniste"": ""rooma"", ""nimi"": ""Rooma"", ""keskipiste"": [41.9, 12.5], ""bbox"": [12.38, 41.81, 12.62, 41.99]}]}");
            Oleta.Sama(2, b.Count);
            Oleta.Sama("ROOMA", b[1].NimiLcd);
            Oleta.Sama("kuvauspaikat/v1/rooma.jpg", b[1].Kuva);
        }

        [Testi] static void NappiVainKuvauspaikanKohdalla()
        {
            var p = Kuvauspaikat.Jasenna(Helsinki);
            Oleta.Sama("helsinki", Kuvauspaikat.Lahin(p, 60.20, 24.90)?.Tunniste, "~4 km");
            Oleta.Sama("helsinki", Kuvauspaikat.Lahin(p, 61.30, 24.94)?.Tunniste, "~126 km (alus 7,7 km/s: ikkuna ~40 s)");
            Oleta.Tosi(Kuvauspaikat.Lahin(p, 61.60, 24.94) == null, "~159 km ei");
            Oleta.Tosi(Kuvauspaikat.Lahin(p, double.NaN, 0) == null, "ei katsetta");
        }

        [Testi] static void KierrettyRajausPysyyLahdekuvanSisalla()
        {
            // Kuvan neljä kulmaa projisoidaan maahan (kameran säde ISS:ltä, pallomaa) ja tarkistetaan, että ne ovat bboxin sisällä.
            var h = Kuvauspaikat.Jasenna(Helsinki)[0];
            foreach (var (lat, lon) in new[] { (58.0, 30.0), (62.5, 20.0), (57.5, 22.0), (60.17, 28.5) })
            {
                var iss = new IssHetki(new LatLon(lat, lon), 420_000, 60);
                var (a, v) = Kuvauspaikat.Rajaus(iss, h, 4.0 / 5);
                foreach (var (sx, sy) in new[] { (-1.0, -1.0), (1.0, -1.0), (-1.0, 1.0), (1.0, 1.0) })
                {
                    var (klat, klon) = Kulma(a, v, 4.0 / 5, sx, sy);
                    Oleta.Tosi(klat >= h.S && klat <= h.N && klon >= h.W && klon <= h.E,
                        $"ISS ({lat}, {lon}) suuntima {a.Suuntima:0}°: kulma ({sx}, {sy}) → ({klat:0.0000}, {klon:0.0000}) bboxin ulkopuolella");
                }
            }
        }

        /// <summary>Kuvan kulma (sx, sy ∈ ±1) maahan: kameran ortonormaali kanta katsepisteestä ja säteen leikkaus pallon kanssa.</summary>
        static (double lat, double lon) Kulma(Matkakirja.Linssit.Kuvakulma a, double pystyAst, double suhde, double sx, double sy)
        {
            const double R = 6_371_000, D = Math.PI / 180;
            double[] V(double la, double lo) => new[] { Math.Cos(la * D) * Math.Cos(lo * D), Math.Cos(la * D) * Math.Sin(lo * D), Math.Sin(la * D) };
            var p = V(a.Lat, a.Lon); for (int i = 0; i < 3; i++) p[i] *= R;
            var up = V(a.Lat, a.Lon);
            var ita = new[] { -Math.Sin(a.Lon * D), Math.Cos(a.Lon * D), 0 };
            var poh = new[] { -Math.Sin(a.Lat * D) * Math.Cos(a.Lon * D), -Math.Sin(a.Lat * D) * Math.Sin(a.Lon * D), Math.Cos(a.Lat * D) };
            double b = a.Suuntima * D, z = a.Kallistus * D;
            var f = new double[3]; for (int i = 0; i < 3; i++) f[i] = Math.Cos(b) * poh[i] + Math.Sin(b) * ita[i];
            // silmä: katsepisteestä taaksepäin (vastakkaiseen suuntaan kuin f) ja ylös; katse = -(sin ζ · (−f) + cos ζ · up)
            var e = new double[3]; for (int i = 0; i < 3; i++) e[i] = p[i] + a.EtaisyysM * (-Math.Sin(z) * f[i] + Math.Cos(z) * up[i]);
            var d = new double[3]; for (int i = 0; i < 3; i++) d[i] = (p[i] - e[i]) / a.EtaisyysM;
            var oik = new[] { d[1] * up[2] - d[2] * up[1], d[2] * up[0] - d[0] * up[2], d[0] * up[1] - d[1] * up[0] };
            double on = Math.Sqrt(oik[0] * oik[0] + oik[1] * oik[1] + oik[2] * oik[2]); for (int i = 0; i < 3; i++) oik[i] /= on;
            var yl = new[] { oik[1] * d[2] - oik[2] * d[1], oik[2] * d[0] - oik[0] * d[2], oik[0] * d[1] - oik[1] * d[0] };
            double t = Math.Tan(pystyAst / 2 * D);
            var r = new double[3]; for (int i = 0; i < 3; i++) r[i] = d[i] + sx * t * suhde * oik[i] + sy * t * yl[i];
            double rn = Math.Sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]); for (int i = 0; i < 3; i++) r[i] /= rn;
            double bb = 2 * (e[0] * r[0] + e[1] * r[1] + e[2] * r[2]), cc = e[0] * e[0] + e[1] * e[1] + e[2] * e[2] - R * R;
            double s = (-bb - Math.Sqrt(bb * bb - 4 * cc)) / 2;
            var q = new double[3]; for (int i = 0; i < 3; i++) q[i] = e[i] + s * r[i];
            return (Math.Asin(q[2] / R) / D, Math.Atan2(q[1], q[0]) / D);
        }

        [Testi] static void RajausPysyyPaikanSisalla()
        {
            var h = Kuvauspaikat.Jasenna(Helsinki)[0];
            // ISS 300 km sivussa: vino katse; kentän pystyulottuvuus maassa ≤ 0,9 × 20 km.
            var iss = new IssHetki(new LatLon(58.0, 30.0), 420_000, 60);
            var (a, v) = Kuvauspaikat.Rajaus(iss, h, 4.0 / 5);
            Oleta.Sama(60.17, a.Lat);
            double puoliPysty = a.EtaisyysM * Math.Tan(v / 2 * Math.PI / 180) / Math.Cos(a.Kallistus * Math.PI / 180);
            double puoliVaaka = a.EtaisyysM * Math.Tan(v / 2 * Math.PI / 180) * 4 / 5;
            Oleta.Tosi(puoliPysty <= 9000.5 && puoliVaaka <= 9000.5, $"pysty {puoliPysty:0} m, vaaka {puoliVaaka:0} m");
            Oleta.Tosi(Math.Max(puoliPysty, puoliVaaka) > 0.6 * 9000, $"ei turhan pieni ({Math.Max(puoliPysty, puoliVaaka):0} m)");
            var (_, v2) = Kuvauspaikat.Rajaus(new IssHetki(new LatLon(60.17, 24.94), 420_000, 60), h, 1);
            // Suoraan alla, suuntima 60°: neliökuvan kierretty laatikko (sin + cos) · ρ t ≤ 0,95 · 9 km.
            double odotus = 2 * Math.Atan(Kuvauspaikat.Varmuus * 9000.0 / (420_000 * (Math.Sin(Math.PI / 3) + Math.Cos(Math.PI / 3)))) * 180 / Math.PI;
            Oleta.Tosi(Math.Abs(v2 - odotus) < 0.01, $"suoraan alla {v2:0.000}° (odotus {odotus:0.000}°)");
        }
    }
}
