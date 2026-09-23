// Astronautin kameran kaavat ja aineisto verkkopelin kultaisia arvoja vasten
// (kultaiset/astronautti.json, tee-astronautti.mjs; paketti/satelliitti-data.json).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AstronauttiTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("astronautti.json"))).RootElement;

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        [Testi] static void IssRataKutenWebissa()
        {
            var k = K();
            foreach (var r in k.GetProperty("iss").EnumerateArray())
            {
                double t = r.GetProperty("t").GetDouble();
                var p = Astronauttimatikka.IssPaikka(t);
                Lahella(r.GetProperty("p").GetProperty("lat").GetDouble(), p.Lat, $"lat({t})");
                Lahella(r.GetProperty("p").GetProperty("lng").GetDouble(), p.Lon, $"lng({t})");
            }
            var kaari = Astronauttimatikka.IssKaari(123.4, 16);
            var o = k.GetProperty("kaari").EnumerateArray().ToList();
            Oleta.Sama(o.Count, kaari.Count);
            for (int i = 0; i < o.Count; i++)
            {
                Lahella(o[i].GetProperty("lat").GetDouble(), kaari[i].Lat, $"kaari lat[{i}]");
                Lahella(o[i].GetProperty("lng").GetDouble(), kaari[i].Lon, $"kaari lng[{i}]");
            }
        }

        [Testi] static void KameranKorkeudetKutenWebissa()
        {
            var k = K();
            foreach (var r in k.GetProperty("avaus").EnumerateArray())
                Lahella(r.GetProperty("alt").GetDouble(),
                    Astronauttimatikka.AvausKorkeus(r.GetProperty("leveys").GetDouble(), r.GetProperty("korkeus").GetDouble()), "avausKorkeus");
            foreach (var r in k.GetProperty("halk").EnumerateArray())
                Lahella(r[1].GetDouble(), Astronauttimatikka.HalkaisijaRuudulla(r[0].GetDouble(), 844), "halkaisija");
            foreach (var r in k.GetProperty("zoomi").EnumerateArray())
            {
                var (min, max) = Astronauttimatikka.Zoomirajat(r.GetProperty("a").GetDouble());
                Lahella(r.GetProperty("min").GetDouble(), min, "zoomi min");
                Lahella(r.GetProperty("max").GetDouble(), max, "zoomi max");
            }
            foreach (var r in k.GetProperty("pehm").EnumerateArray())
                Lahella(r[1].GetDouble(), Astronauttimatikka.AvausPehmennys(r[0].GetDouble()), "avausPehmennys");
        }

        [Testi] static void PilvetJaSumuKutenWebissa()
        {
            foreach (var r in K().GetProperty("peitot").EnumerateArray())
            {
                double s = r[0].GetDouble();
                Lahella(r[1].GetDouble(), Astronauttimatikka.PilvienPeitto(s * 2, 2), $"pilvet({s})");
                Lahella(r[2].GetDouble(), Astronauttimatikka.SumunPeitto(s * 2, 2), $"sumu({s})");
            }
        }

        static List<NimionKohde> Kohteet(JsonElement e) => e.EnumerateArray().Select(x => new NimionKohde(
            x.GetProperty("id").GetString(), x.GetProperty("x").GetDouble(), x.GetProperty("y").GetDouble(),
            x.GetProperty("w").GetDouble(), x.GetProperty("h").GetDouble())).ToList();

        static Kylki Kylki(string s) => s switch
        {
            "yla" => Astronautti.Kylki.Yla, "oikea" => Astronautti.Kylki.Oikea, "vasen" => Astronautti.Kylki.Vasen,
            "piilo" => Astronautti.Kylki.Piilo, _ => Astronautti.Kylki.Ala,
        };

        [Testi] static void NimiotLadotaanKutenWebissa()
        {
            var k = K();
            var eka = Astronauttimatikka.LadoNimiot(Kohteet(k.GetProperty("kohteet")));
            foreach (var r in k.GetProperty("eka").EnumerateArray())
                Oleta.Sama(Kylki(r[1].GetString()), eka[r[0].GetString()], "eka " + r[0].GetString());
            var toka = Astronauttimatikka.LadoNimiot(Kohteet(k.GetProperty("siirretty")), eka);
            foreach (var r in k.GetProperty("toka").EnumerateArray())
                Oleta.Sama(Kylki(r[1].GetString()), toka[r[0].GetString()], "toka " + r[0].GetString());
            Oleta.Tosi(eka.Values.Count(x => x == Astronautti.Kylki.Piilo) > 0, "rypäässä osa piiloon");
        }

        [Testi] static void AineistoPaketista()
        {
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(Polku("paketti/satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(Polku("paketti/astronaut-kysymykset.json"))));
            Oleta.Sama(64, a.Kohteet.Count);
            Oleta.Sama(83, a.Kohteet.Sum(x => x.Havainnot.Count));
            Oleta.Tosi(a.Lahde?.Lisenssi != null, "lähde ja lisenssi");
            var etna = a.Kohteet.First(x => x.Tunnus == "etna");
            Oleta.Sama(37.751, etna.Lat);
            Oleta.Sama(2, etna.Kysymykset.Count);
            Oleta.Tosi(etna.Havainnot[0].Kuva.EndsWith("~large.jpg"), etna.Havainnot[0].Kuva);
            Oleta.Tosi(etna.Havainnot[0].Leveys > 0);
            foreach (var r in K().GetProperty("oletukset").EnumerateArray())
                Oleta.Sama(r[1].GetInt32(), a.Kohteet.First(x => x.Tunnus == r[0].GetString()).OletusIndeksi, "oletus " + r[0].GetString());
        }
    }
}
