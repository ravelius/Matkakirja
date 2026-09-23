// Kultaiset testit: ruudukko, maamaski ja JS-lukufunktiot
// (web js/aikajana-virrat-laskenta.js; kultaiset/tee-kultaiset.mjs).
using System;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;

namespace Matkakirja.Linssit.Testit
{
    public static class VirratRuudukkoTestit
    {
        [Testi] static void MaamaskiPurkautuuKutenWebissa()
        {
            var m = O(Kultaiset, "maski");
            var maa = Maa;
            Oleta.Sama(Ruudukko.Leveys * Ruudukko.Korkeus, maa.Length);
            var n = 0;
            foreach (var b in maa) if (b != 0) n += 1;
            Oleta.Sama(I(m["maaruutuja"]), n, "maaruutuja");
            Oleta.Sama(S(m, "maa"), Fnv(maa), "maamaskin tiiviste");
        }

        [Testi] static void MaamaskiJaPeittoPakkautuvatSamaksiTekstiksi()
        {
            var m = O(Kultaiset, "maski");
            Oleta.Sama(true, (bool)m["pakkausPalautuu"], "webin pakkaus palautuu");
            Oleta.Sama(Aineisto.Maamaski.Juoksut, Ruudukko.PakkaaMaamaski(Maa));
            var peitto = Ruudukko.PuraPeitto(Aineisto.Maamaski.Peitot);
            Oleta.Sama(S(m, "peitto"), Fnv(peitto), "peiton tiiviste");
            Oleta.Sama(true, (bool)m["peittoPalautuu"]);
            Oleta.Sama(Aineisto.Maamaski.Peitot, Ruudukko.PakkaaPeitto(peitto));
            Oleta.Sama(null, Ruudukko.PuraPeitto(""), "tyhjä peitto → null");
        }

        [Testi] static void PieniMaskiJaBase64Taytteet()
        {
            var p = O(O(Kultaiset, "maski"), "pieni");
            var lista = L(p, "maski");
            var maski = new byte[lista.Count];
            for (var i = 0; i < maski.Length; i += 1) maski[i] = (byte)I(lista[i]);
            var pakattu = Ruudukko.PakkaaMaamaski(maski);
            Oleta.Sama(S(p, "pakattu"), pakattu);
            var takaisin = Ruudukko.PuraMaamaski(pakattu, maski.Length);
            Oleta.Sama(Fnv(maski), Fnv(takaisin), "pieni maski palautuu");
            // Täytteettömänä (= poistettu) sama tulos, kuten webin base64Tavuiksi.
            Oleta.Sama(Fnv(maski), Fnv(Ruudukko.PuraMaamaski(pakattu.TrimEnd('='), maski.Length)));
        }

        [Testi] static void RannikkoJaKomponentit()
        {
            var m = O(Kultaiset, "maski");
            var rannikko = Ruudukko.RannikkoMaski(Maa);
            var n = 0;
            foreach (var b in rannikko) if (b != 0) n += 1;
            Oleta.Sama(I(m["rannikkoruutuja"]), n);
            Oleta.Sama(S(m, "rannikko"), Fnv(rannikko));
            var k = Ruudukko.Komponentit(Maa);
            Oleta.Sama(I(m["komponentteja"]), k.Koot.Count, "komponentteja");
            var koot = L(m, "koot");
            for (var i = 0; i < koot.Count; i += 1) Oleta.Sama(I(koot[i]), k.Koot[i], "koko #" + i);
            Oleta.Sama(S(m, "tunnus"), Fnv(k.Tunnus), "komponenttitunnukset");
        }

        [Testi] static void RuutuKeskusJaKierto()
        {
            var p = O(Kultaiset, "perus");
            foreach (var a in L(p, "ruutu"))
            {
                var r = L(a);
                Oleta.Sama(I(r[2]), Ruudukko.Ruutu(D(r[0]), D(r[1])), $"ruutu({D(r[0]):R}, {D(r[1]):R})");
            }
            foreach (var a in L(p, "keskus"))
            {
                var r = L(a);
                var k = Ruudukko.RuudunKeskus(I(r[0]));
                Oleta.Sama(D(r[1]), k.Lat);
                Oleta.Sama(D(r[2]), k.Lon);
            }
            foreach (var a in L(p, "kierraLon"))
            {
                var r = L(a);
                Oleta.Sama(D(r[1]), Ruudukko.KierraLon(D(r[0])));
            }
        }

        [Testi] static void LahinMaa()
        {
            foreach (var a in L(O(Kultaiset, "perus"), "lahinMaa"))
            {
                var r = L(a);
                Oleta.Sama(I(r[3]), Ruudukko.LahinMaa(Maa, D(r[0]), D(r[1]), I(r[2])), $"lahinMaa({D(r[0]):R}, {D(r[1]):R}, {I(r[2])})");
            }
        }

        [Testi] static void HypotOnV8nBittitarkka()
        {
            foreach (var a in L(O(Kultaiset, "perus"), "hypot"))
            {
                var r = L(a);
                Oleta.Sama(D(r[3]), JsLuvut.Hypot(D(r[0]), D(r[1])), $"hypot({D(r[0]):R}, {D(r[1]):R})");
                Oleta.Sama(D(r[4]), JsLuvut.Hypot(D(r[0]), D(r[1]), D(r[2])), "hypot3");
            }
            Oleta.Sama(0.0, JsLuvut.Hypot(0, 0));
            Oleta.Sama(double.PositiveInfinity, JsLuvut.Hypot(double.NaN, double.NegativeInfinity));
            Oleta.Tosi(double.IsNaN(JsLuvut.Hypot(double.NaN, 1)));
        }

        [Testi] static void KosiniRuudukonLeveysasteillaBittitarkka()
        {
            // Kosini ruudukon 360 leveysasteella (Dijkstra, laatikoiden syvyys)
            // täsmälleen; sini ja pituusasteet (vain painopiste) enintään ulpin päässä.
            var trig = L(O(Kultaiset, "perus"), "trig");
            var ulpEroja = 0;
            for (var k = 0; k < trig.Count; k += 1)
            {
                var r = L(trig[k]);
                var x = D(r[0]);
                if (k < Ruudukko.Korkeus)
                {
                    Oleta.Sama(D(r[1]), JsLuvut.Cos(x), $"cos({x:R})");
                    // Sini vain painopisteessä (toleranssi).
                    Lahella(D(r[2]), JsLuvut.Sin(x), "sin lat", 1e-15);
                    if (D(r[2]) != JsLuvut.Sin(x)) ulpEroja += 1;
                }
                else
                {
                    Lahella(D(r[1]), JsLuvut.Cos(x), "cos lon", 1e-15);
                    Lahella(D(r[2]), JsLuvut.Sin(x), "sin lon", 1e-15);
                    if (D(r[1]) != JsLuvut.Cos(x) || D(r[2]) != JsLuvut.Sin(x)) ulpEroja += 1;
                }
            }
            Console.WriteLine($"      leveysasteiden sin ja pituusasteiden sin/cos: {ulpEroja}/{trig.Count} eroaa ulpin (V8 glibc vs fdlibm)");
        }

        [Testi] static void PyoristyksetKutenJs()
        {
            Oleta.Sama(3.0, JsLuvut.Round(2.5));
            Oleta.Sama(-2.0, JsLuvut.Round(-2.5));
            Oleta.Sama(0.0, JsLuvut.Round(0.49999999999999994));
            Oleta.Sama(45123.0, JsLuvut.Round(45122.5));
            // toFixed: tarkka binääriarvo, tasapeli suurempaan itseisarvoon.
            Oleta.Sama(0.063, JsLuvut.ToFixed(0.0625, 3));
            Oleta.Sama(-0.063, JsLuvut.ToFixed(-0.0625, 3));
            Oleta.Sama(1.005, JsLuvut.ToFixed(1.0049999999999999, 3));
            Oleta.Sama(1.0, JsLuvut.ToFixed(1.0005, 3), "1.0005 on binäärinä alle puolikkaan");
            Oleta.Sama(10.188, JsLuvut.ToFixed(10.1875, 3));
            Oleta.Sama(-73.204, JsLuvut.ToFixed(-73.2044, 3));
        }
    }
}
