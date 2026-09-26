// LENTO V3 (Natiiviseppä 27.9.2026): esilatauskäytävän laatat, koneen korkeus maaston yllä ja odotuksen leikkausehto
// (Kartta/LennonV3Kaytava.cs; speksi docs/raportit/lento-v3-speksi.md kohdat 2 ja 5). Lisäksi LennonV3:n
// varauksettomat ylikuormat (Pituudet) antavat samat arvot kuin alkuperäiset.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LennonV3KaytavaTestit
    {
        const double AteenaLat = 37.98, AteenaLon = 23.73, LontooLat = 51.507, LontooLon = -0.128;

        static List<(double Lat, double Lon)> Ateena() => LennonV3.Reitti("ateena", LontooLat, LontooLon, AteenaLat, AteenaLon);

        [Testi]
        static void AteenanKaytavaSpeksinKokoinen()
        {
            var l = LennonV3Kaytava.Laatat(Ateena());
            int pohja = l.Count(x => !x.Maasto), maasto = l.Count(x => x.Maasto);
            Console.WriteLine($"      Ateena: pohja {pohja}, maasto {maasto}, alku {l.Count(x => x.Alku)}");
            // Speksi: 116 pohja- ja 108 maastolaattaa (~2,2 Mt); nykyinen lento 1 761.
            Oleta.Tosi(pohja >= 70 && pohja <= 200, $"pohjalaattoja {pohja}");
            Oleta.Tosi(maasto >= 70 && maasto <= 200, $"maastolaattoja {maasto}");
            Oleta.Tosi(l.Count <= 400, $"yhteensä {l.Count} (tavoite ≤ 400)");
            Oleta.Tosi(l.All(x => x.Z >= 6 && x.Z <= 9), "tasot 6–9");
        }

        [Testi]
        static void YksikasitteisetJaAlkuEnsin()
        {
            var l = LennonV3Kaytava.Laatat(Ateena());
            Oleta.Sama(l.Count, l.Select(x => (x.Maasto, x.Z, x.X, x.Y)).Distinct().Count(), "ei kaksoiskappaleita");
            int viimeinenAlku = l.FindLastIndex(x => x.Alku), ensimmainenMuu = l.FindIndex(x => !x.Alku);
            Oleta.Tosi(viimeinenAlku >= 0 && ensimmainenMuu > viimeinenAlku, $"alku ensin ({viimeinenAlku} < {ensimmainenMuu})");
        }

        [Testi]
        static void LahikuvatZ9AlustaJaLopusta()
        {
            var r = Ateena();
            var l = LennonV3Kaytava.Laatat(r);
            // Lähikuvan alku (Kyrenaikan rannikko) ja kohde (Ateena) Z9:llä, keskimatka (Antikythera) ei.
            var alku = LennonV3.ReitinKohta(r, 0.0);
            var a9 = LennonV3Kaytava.Mercator(9, alku.Lat, alku.Lon);
            var k9 = LennonV3Kaytava.Mercator(9, AteenaLat, AteenaLon);
            Oleta.Tosi(l.Any(x => !x.Maasto && x.Z == 9 && x.X == a9.x && x.Y == a9.y && x.Alku), "alun Z9");
            Oleta.Tosi(l.Any(x => !x.Maasto && x.Z == 9 && x.X == k9.x && x.Y == k9.y), "Ateenan Z9");
            var m9 = LennonV3Kaytava.Mercator(9, 35.85, 23.28);
            Oleta.Tosi(!l.Any(x => !x.Maasto && x.Z == 9 && x.X == m9.x && x.Y == m9.y), "keskimatkalla ei Z9:ää");
            var mt = MaastoLaatat.Laatta(9, AteenaLat, AteenaLon);
            Oleta.Tosi(l.Any(x => x.Maasto && x.Z == 9 && x.X == mt.x && x.Y == mt.y), "Ateenan maasto Z9");
        }

        [Testi]
        static void LyhytJaPitkaReitti()
        {
            // Wien–Bratislava (55 km) ja Lontoo–New York (viimeiset 600 km): käytävä pysyy pienenä.
            var lyhyt = LennonV3Kaytava.Laatat(LennonV3.Reitti(null, 48.21, 16.37, 48.15, 17.11));
            var pitka = LennonV3Kaytava.Laatat(LennonV3.Reitti(null, LontooLat, LontooLon, 40.71, -74.01));
            Console.WriteLine($"      Wien–Bratislava {lyhyt.Count}, Lontoo–New York {pitka.Count}");
            Oleta.Tosi(lyhyt.Count > 20 && lyhyt.Count < pitka.Count, "lyhyt pienempi");
            Oleta.Tosi(pitka.Count <= 400, $"pitkä {pitka.Count}");
            Oleta.Sama(0, LennonV3Kaytava.Laatat(null).Count);
        }

        [Testi]
        static void EsilammitysPieni()
        {
            // Speksi: 18 aloituskohteen alun 5 s noin 450 laattaa (5 Mt) → kohdetta kohden kymmeniä, vain Z8–Z9 ja alku.
            var e = LennonV3Kaytava.Esilammitettavat(LennonV3Kaytava.Laatat(Ateena()));
            Console.WriteLine($"      esilämmitys Ateena {e.Count}");
            Oleta.Tosi(e.Count > 0 && e.Count <= 80, $"Ateena {e.Count}");
            Oleta.Tosi(e.All(x => x.Alku && x.Z >= 8), "alku Z8–Z9");
            Oleta.Sama(0, LennonV3Kaytava.Esilammitettavat(null).Count);
        }

        [Testi]
        static void MercatorKuinKarttaKerrokset()
        {
            // Lontoo Z9: x = floor((lon + 180) / 360 · 512) = 255, y = 170.
            Oleta.Sama((255, 170), LennonV3Kaytava.Mercator(9, LontooLat, LontooLon));
            Oleta.Sama((0, 0), LennonV3Kaytava.Mercator(0, 10, 10));
        }

        [Testi]
        static void LisakorkeusMaastonYlla()
        {
            // 600 km, 61 näytettä (10 km välein): meri paitsi 4 000 m:n harjanne näytteessä 30.
            var m = new double[61];
            m[30] = 4000;
            var lisa = LennonV3Kaytava.Lisakorkeus(m, 600_000);
            // Harjanteella vaatimus 4 000 + 2 000 − 3 500 = 2 500 m, ja ennakoiden jo ±8 km:n päässä (näytteet 29 ja 31).
            Oleta.Tosi(lisa[30] >= 2500 - 1e-6, $"harjanne {lisa[30]}");
            Oleta.Tosi(lisa[29] >= 2500 - 1e-6 && lisa[31] >= 2500 - 1e-6, "ennakointi ±8 km");
            Oleta.Tosi(lisa[0] == 0 && lisa[60] == 0, "kaukana meri: ei lisää");
            // Pehmeä: vierekkäisten ero enintään puolet harjanteen lisästä.
            for (int i = 1; i < lisa.Length; i++) Oleta.Tosi(Math.Abs(lisa[i] - lisa[i - 1]) <= 1300, $"loikka {i}");
            // Matala maa (1 000 m) ei nosta: 1 000 + 2 000 < 3 500.
            var matala = Enumerable.Repeat(1000.0, 61).ToArray();
            Oleta.Tosi(LennonV3Kaytava.Lisakorkeus(matala, 600_000).All(x => x == 0), "matala maa");
            // Puuttuvat näytteet (NaN) ohitetaan, tyhjä ei kaadu.
            var nan = Enumerable.Repeat(double.NaN, 5).ToArray();
            Oleta.Tosi(LennonV3Kaytava.Lisakorkeus(nan, 50_000).All(x => x == 0), "NaN");
            Oleta.Sama(1, LennonV3Kaytava.Lisakorkeus(null, 1000).Length);
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.LisaOsuudessa(new[] { 0.0, 100.0 }, 0.25) - 25) < 1e-9, "interpolaatio");
        }

        [Testi]
        static void KorkeusLaskeutuuKohteenMaahan()
        {
            // Matkalla 3,5 km + lisä, kosketuksesta kohteen maassa (liioiteltu 400 m), myös lisän ollessa suuri.
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.KoneenKorkeus(5, 0, 400) - 3500) < 1e-6, "matka");
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.KoneenKorkeus(8, 1200, 400) - 4700) < 1e-6, "lisä");
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.KoneenKorkeus(LennonV3.KosketusS, 1200, 400) - 400) < 1e-6, "kosketus");
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.KoneenKorkeus(15, 1200, 400) - 400) < 1e-6, "rullaus");
            Oleta.Tosi(Math.Abs(LennonV3Kaytava.KoneenKorkeus(15, 0, -20) - 0) < 1e-6, "meren alla oleva maa → 0");
            // Laskeutuu monotonisesti 11,5 s:sta kosketukseen.
            double ed = double.MaxValue;
            for (double t = 11.5; t <= LennonV3.KosketusS; t += 0.05)
            {
                double h = LennonV3Kaytava.KoneenKorkeus(t, 800, 300);
                Oleta.Tosi(h <= ed + 1e-6, $"nousee {t:F2} s");
                ed = h;
            }
        }

        [Testi]
        static void OdotuksenLeikkaus()
        {
            Oleta.Sama(null, LennonV3Kaytava.Leikkaa(0.3, 1, 1), "vähintään 0,5 s");
            Oleta.Sama("valmis", LennonV3Kaytava.Leikkaa(0.5, 0.96, 1));
            Oleta.Sama(null, LennonV3Kaytava.Leikkaa(3, 0.99, 0.98), "alku kesken");
            Oleta.Sama(null, LennonV3Kaytava.Leikkaa(5.9, 0.5, 1), "ennen 6 s:n kattoa");
            Oleta.Sama("katto", LennonV3Kaytava.Leikkaa(6, 0.5, 1));
            Oleta.Sama(null, LennonV3Kaytava.Leikkaa(9.9, 0.5, 0.5));
            Oleta.Sama("ehdoton", LennonV3Kaytava.Leikkaa(10, 0, 0));
        }

        [Testi]
        static void PituudetYlikuormaSamaArvo()
        {
            var r = Ateena();
            var pit = LennonV3.Pituudet(r);
            for (double u = 0; u <= 1.0001; u += 0.05)
            {
                var a = LennonV3.ReitinKohta(r, u); var b = LennonV3.ReitinKohta(r, pit, u);
                Oleta.Tosi(a.Lat == b.Lat && a.Lon == b.Lon && a.Suunta == b.Suunta, $"ReitinKohta {u}");
            }
            for (double t = 0; t <= 15; t += 0.5)
                Oleta.Sama(LennonV3.Kallistus(r, t), LennonV3.Kallistus(r, pit, t), $"Kallistus {t}");
        }
    }
}
