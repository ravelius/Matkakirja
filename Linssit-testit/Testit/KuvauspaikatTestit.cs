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
            Oleta.Tosi(Kuvauspaikat.Lahin(p, 60.40, 24.94) == null, "~26 km ei");
            Oleta.Tosi(Kuvauspaikat.Lahin(p, double.NaN, 0) == null, "ei katsetta");
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
            Oleta.Tosi(Math.Max(puoliPysty, puoliVaaka) > 8900, "ei turhan pieni");
            var (_, v2) = Kuvauspaikat.Rajaus(new IssHetki(new LatLon(60.17, 24.94), 420_000, 60), h, 1);
            Oleta.Tosi(Math.Abs(v2 - 2 * Math.Atan(9000.0 / 420_000) * 180 / Math.PI) < 0.01, $"suoraan alla {v2:0.000}°");
        }
    }
}
