// Aikajanan ydin verkkopelin kultaisia arvoja vasten
// (kultaiset/aikajana.json, tee-aikajana.mjs).
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    public static class AikajanaTestit
    {
        static JsonElement Kultainen()
        {
            var polku = Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "aikajana.json");
            return JsonDocument.Parse(File.ReadAllText(polku)).RootElement;
        }

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            double raja = tol * Math.Max(1, Math.Abs(odotettu));
            if (Math.Abs(odotettu - saatu) > raja) throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        static double[] Arvot(JsonElement k) => k.GetProperty("arvot").EnumerateArray().Select(x => x.GetDouble()).ToArray();

        [Testi] static void AsteikkoVastaaWebia()
        {
            var k = Kultainen();
            var asteikko = Asteikko.VuosiaSitten(Arvot(k));
            Oleta.Sama(-5.0, asteikko.Alku);
            Oleta.Sama(190.0, asteikko.Loppu);
            foreach (var r in k.GetProperty("asteikko").EnumerateArray())
            {
                double p = r.GetProperty("p").GetDouble();
                double l = asteikko.Lukema(p);
                Lahella(r.GetProperty("l").GetDouble(), l, $"lukema({p})");
                Lahella(r.GetProperty("paikka").GetDouble(), asteikko.Paikka(l), $"paikka({l})", 1e-7);
                Oleta.Sama(r.GetProperty("askel").GetInt32(), (int)asteikko.Askel(l), $"askel({l})");
                var t = r.GetProperty("teksti");
                Oleta.Sama(t.ValueKind == JsonValueKind.Null ? null : t.GetString(), asteikko.Teksti(l), $"teksti({l})");
            }
        }

        [Testi] static void NopeusprofiiliVastaaWebia()
        {
            foreach (var r in Kultainen().GetProperty("nopeus").EnumerateArray())
            {
                double e = r[0].GetDouble();
                Lahella(r[1].GetDouble(), Kello.Nopeus(e), $"nopeus({e})", 1e-12);
            }
        }

        static readonly KellonPysakki[] Pysakit =
        {
            new KellonPysakki(1769), new KellonPysakki(1771), new KellonPysakki(1780, paalu: true),
            new KellonPysakki(1781, hiljainen: true), new KellonPysakki(1790),
        };

        [Testi] static void KelloKulkeeKutenWebissa()
        {
            var odotetut = Kultainen().GetProperty("kello").EnumerateArray().ToList();
            var tila = KellonTila.Aluksi(1765);
            int k = 0;
            for (int n = 0; n < 4000 && k < odotetut.Count; n++)
            {
                var r = Kello.Askel(tila, 16.7, Pysakit);
                tila = r.Tila;
                if (odotetut[k].GetProperty("n").GetInt32() != n) continue;
                var o = odotetut[k++];
                Lahella(o.GetProperty("vuosi").GetDouble(), tila.Paikka, $"vuosi kehyksellä {n}");
                Oleta.Sama(o.GetProperty("i").GetInt32(), tila.I, $"i kehyksellä {n}");
                Lahella(o.GetProperty("viive").GetDouble(), tila.Viive, $"viive kehyksellä {n}");
                var s = o.GetProperty("syttyi");
                Oleta.Sama(s.ValueKind == JsonValueKind.Null ? -1 : s.GetInt32(), r.Syttyi, $"syttyi kehyksellä {n}");
                Oleta.Sama(o.GetProperty("loppu").GetBoolean(), r.Loppu, $"loppu kehyksellä {n}");
            }
            Oleta.Sama(odotetut.Count, k, "kaikki kultaiset rivit käyty");
        }

        [Testi] static void AikaSeuraavaanKutenWebissa()
        {
            Lahella(Kultainen().GetProperty("eta").GetDouble(), Kello.AikaSeuraavaan(KellonTila.Aluksi(1765), Pysakit), "eta");
        }

        [Testi] static void HyppyKaarellaKutenWebissa()
        {
            var k = Kultainen();
            var a = new LatLon(31.855, -8.8725);
            var b = new LatLon(-33.75, 143.0833);
            Lahella(k.GetProperty("kulma").GetDouble(), Kameramatikka.KulmaAsteina(a, b), "kulma");
            foreach (var r in k.GetProperty("hyppy").EnumerateArray())
            {
                double t = r.GetProperty("t").GetDouble();
                var (paikka, leveys) = Kameramatikka.Hyppy(a, b, 560, true, t);
                Lahella(r.GetProperty("lat").GetDouble(), paikka.Lat, $"lat({t})");
                Lahella(r.GetProperty("lon").GetDouble(), paikka.Lon, $"lon({t})");
                Lahella(r.GetProperty("leveys").GetDouble(), leveys, $"leveys({t})");
            }
        }

        [Testi] static void LuentaPidattaaTauon()
        {
            var tila = new KellonTila { Paikka = 12.4, I = 1, Viive = 100, ViiveTaysi = 4600 };
            var p = Kello.PidataLuennalle(tila, true, 5000);
            Oleta.Sama(12.0, p.Paikka);
            Oleta.Sama(Kello.LuennanTaukovaraMs, p.Viive);
            Oleta.Sama(100.0, Kello.PidataLuennalle(tila, true, Kello.LuennanPisinMs + 1).Viive, "katto");
            Oleta.Sama(100.0, Kello.PidataLuennalle(tila, false, 0).Viive, "ei luentaa");
        }

        [Testi] static void VuositekstiPyoristaaKutenMathRound()
        {
            Oleta.Sama("n. 1300 jaa.", Asteikko.KellonVuositeksti(700));
            Oleta.Sama("n. 101 jaa.", Asteikko.KellonVuositeksti(1899.5));        // Math.round(100.5) = 101
            Oleta.Sama("n. 0 eKr.", Asteikko.KellonVuositeksti(2000.5, 3000));    // Math.round(−0.5) = −0
            Oleta.Sama("n. 1 eKr.", Asteikko.KellonVuositeksti(2001.5, 3000));    // Math.round(−1.5) = −1
            Oleta.Sama(null, Asteikko.KellonVuositeksti(1900));
        }
    }
}
