// Ihmisen matkan esityksen kaavat verkkopelin kultaisia arvoja vasten
// (kultaiset/esitys.json, tee-esitys.mjs).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    public static class EsitysTestit
    {
        static JsonElement Kultainen() => JsonDocument.Parse(File.ReadAllText(
            Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "esitys.json"))).RootElement;

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        static double? Luku(JsonElement e) => e.ValueKind == JsonValueKind.Number ? e.GetDouble() : (double?)null;

        static List<IReadOnlyList<double[]>> Vanat(JsonElement k) => k.GetProperty("vanat").EnumerateArray()
            .Select(v => (IReadOnlyList<double[]>)v.EnumerateArray().Select(p => p.EnumerateArray().Select(x => x.GetDouble()).ToArray()).ToList())
            .ToList();

        [Testi] static void AvauksenVaiheetKutenWebissa()
        {
            foreach (var s in Kultainen().GetProperty("avaus").EnumerateArray())
            {
                var lauseet = s.GetProperty("lauseet").EnumerateArray().Select(x => x.GetDouble()).ToList();
                var v = Esitysmatikka.Avaus(lauseet, Luku(s.GetProperty("sana")), s.GetProperty("kesto").GetDouble());
                var o = s.GetProperty("tulos");
                Lahella(o.GetProperty("musta").GetDouble(), v.Musta, "musta");
                Lahella(o.GetProperty("feidi").GetDouble(), v.Feidi, "feidi");
                Lahella(o.GetProperty("piste").GetDouble(), v.Piste, "piste");
                Lahella(o.GetProperty("zoomAlku").GetDouble(), v.ZoomAlku, "zoomAlku");
                Lahella(o.GetProperty("zoomKesto").GetDouble(), v.ZoomKesto, "zoomKesto");
                Lahella(o.GetProperty("zoomLoppu").GetDouble(), v.ZoomLoppu, "zoomLoppu");
                Lahella(o.GetProperty("afrikka").GetDouble(), v.Afrikka, "afrikka");
            }
        }

        [Testi] static void KaaretKutenWebissa()
        {
            foreach (var r in Kultainen().GetProperty("kaaret").EnumerateArray())
            {
                double t = r[0].GetDouble();
                Lahella(r[1].GetDouble(), Esitysmatikka.MarokonPehmennys(t), $"marokonPehmennys({t})");
                Lahella(r[2].GetDouble(), Esitysmatikka.MarokonKaari(t), $"marokonKaari({t})");
                Lahella(r[3].GetDouble(), Esitysmatikka.KelauksenPehmennys(t), $"kelaus({t})");
            }
        }

        [Testi] static void JaksonTahtiKutenWebissa()
        {
            var k = Kultainen();
            var vuosia = k.GetProperty("vuosia").EnumerateArray().Select(Luku).ToList();
            var vaiheet = k.GetProperty("vaiheet").EnumerateArray().Select(x => x.ValueKind == JsonValueKind.String ? x.GetString() : null).ToList();
            int i = 0;
            foreach (var o in k.GetProperty("tahdit").EnumerateArray())
            {
                var (alku, loppu) = Esitysmatikka.JaksonTahti(vuosia, vaiheet, i);
                Lahella(o.GetProperty("alku").GetDouble(), alku, $"alku[{i}]");
                Lahella(o.GetProperty("loppu").GetDouble(), loppu, $"loppu[{i}]");
                i++;
            }
            Oleta.Tosi(vaiheet.Contains("hyppy"), "kertomuksessa on hyppyjakso");
        }

        [Testi] static void VananKarkiKutenWebissa()
        {
            var k = Kultainen();
            var vanat = Vanat(k);
            int n = 0;
            foreach (var v in vanat)
                foreach (var nyt in new double[] { 80000, 70000, 60000, 52000, 47000, 3000, 2500, 1200, 500 })
                    foreach (var ennakko in new double[] { 0, 0.1 })
                    {
                        var o = k.GetProperty("karjet")[n++].GetProperty("k");
                        var c = Esitysmatikka.KarkiHetkella(v, nyt, ennakko);
                        Lahella(o.GetProperty("lat").GetDouble(), c.Value.Lat, $"lat {nyt}/{ennakko}");
                        Lahella(o.GetProperty("lng").GetDouble(), c.Value.Lon, $"lon {nyt}/{ennakko}");
                    }
        }

        [Testi] static void JaksonRajausKutenWebissa()
        {
            var k = Kultainen();
            var vanat = Vanat(k);
            foreach (var s in k.GetProperty("rajaukset").EnumerateArray())
            {
                var ko = s.GetProperty("kohde");
                double pito = s.TryGetProperty("pitoMin", out var p) ? p.GetDouble() : double.PositiveInfinity;
                var (rajaus, karjet) = Esitysmatikka.JaksonRajaus(new LatLon(ko.GetProperty("lat").GetDouble(), ko.GetProperty("lon").GetDouble()),
                    vanat, s.GetProperty("alku").GetDouble(), s.GetProperty("loppu").GetDouble(), pito);
                var o = s.GetProperty("rajaus");
                Lahella(o.GetProperty("lat").GetDouble(), rajaus.Value.Lat, "rajaus.lat");
                Lahella(o.GetProperty("lon").GetDouble(), rajaus.Value.Lon, "rajaus.lon");
                Lahella(o.GetProperty("leveysAst").GetDouble(), rajaus.Value.LeveysAst, "leveysAst");
                Lahella(o.GetProperty("korkeusAst").GetDouble(), rajaus.Value.KorkeusAst, "korkeusAst");
                Oleta.Sama(s.GetProperty("karjet").GetArrayLength(), karjet.Count, "kärkien määrä");
                Lahella(s.GetProperty("leveys").GetDouble(), Esitysmatikka.RajauksenLeveys(rajaus, 0.46).Value, "leveys pysty");
                Lahella(s.GetProperty("leveys2").GetDouble(), Esitysmatikka.RajauksenLeveys(rajaus, 2.1).Value, "leveys vaaka");
            }
        }

        [Testi] static void KameranKestoRajattu()
        {
            Oleta.Sama(1400.0, Esitysmatikka.KameranKesto(1000));
            Oleta.Sama(8500.0, Esitysmatikka.KameranKesto(10000));
            Oleta.Sama(9000.0, Esitysmatikka.KameranKesto(20000));
        }
    }
}
