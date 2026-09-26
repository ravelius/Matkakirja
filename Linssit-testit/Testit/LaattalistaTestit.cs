using System;
using System.Linq;

namespace Matkakirja.Linssit.Testit
{
    /// <summary>Laatat näkyvälle alueelle etukäteen (ESILATAUSPOLITIIKKA: topografia nykyisellä zoomilla ±1, yövalot).</summary>
    public static class LaattalistaTestit
    {
        const string Relief = "https://media.matkakirja.app/matkakirja/reliefipyramidi/20260924/pallo/{z}/{x}/{y}.jpg";
        const string Yovalot = "https://media.matkakirja.app/julisteet/pallo/yovalot/2026-09-25/{z}/{x}/{reverseY}.jpg";
        const string Juuri = "https://media.matkakirja.app/";

        [Testi] static void TasoNatiivisepanMittauksesta()
        {
            // KarttaKerrokset 24.9.: iPad 2 420 px, fov 50°, 1 200 km Kreikan yllä → geometrialaatta 1,4° = Web Mercator 8.
            double z = Laattalista.TasoTarkka(1_200_000, 38, 50, 2420);
            Oleta.Tosi(Math.Abs(z - 8.06) < 0.05, $"kaava {z:F2}");
            Oleta.Sama(8, Laattalista.Taso(1_200_000, 38, 50, 2420, 0, 8));
            Oleta.Sama(7, Laattalista.Taso(2_400_000, 38, 50, 2420, 0, 8), "kaksinkertainen korkeus = taso alemmas");
            Oleta.Sama(0, Laattalista.Taso(1e9, 0, 50, 2420, 0, 8), "min");
            Oleta.Sama(6, Laattalista.Taso(1_000, 0, 50, 2420, 0, 6), "sarjan katto");
        }

        [Testi] static void KulmaSadeMatalaltaJaKaukaa()
        {
            // 100 km, pystyruutu 0,5: kulmasäde 27,5° → maastossa ~52 km ≈ 0,47°.
            double s = Laattalista.KulmaSade(100_000, 50, 0.5, 0);
            Oleta.Tosi(s > 0.42 && s < 0.52, $"matala {s:F3}");
            // Kaukaa horisontti rajaa: acos(R/(R+h)).
            double h = 60_000_000;
            double horisontti = Math.Acos(Laattalista.MaanSadeM / (Laattalista.MaanSadeM + h)) * 180 / Math.PI;
            double k = Laattalista.KulmaSade(h, 50, 0.5, 0);
            Oleta.Tosi(k <= horisontti + 1e-9 && k > 0, $"kaukaa {k:F2} ≤ {horisontti:F2}");
            Oleta.Tosi(Laattalista.KulmaSade(100_000, 50, 0.5, 60) > s * 3, "kallistus levittää");
        }

        [Testi] static void LaattaTunnetutPisteet()
        {
            Oleta.Sama((1, 1), Laattalista.Laatta(-0.1, 0.1, 1));
            Oleta.Sama((145, 74), Laattalista.Laatta(60.17, 24.94, 8), "Helsinki z8");
            Oleta.Sama((0, 0), Laattalista.Laatta(89, -180, 3), "napa rajataan");
            Oleta.Sama((7, 7), Laattalista.Laatta(-89, 179.99, 3));
            Oleta.Tosi(Math.Abs(Laattalista.RivinLat(0, 0) - Laattalista.MercatorRaja) < 1e-6);
        }

        [Testi] static void PolutAlkavatKamerastaJaTasotJarjestyksessa()
        {
            var kamera = new Nakyma(60.17, 24.94, 1_200_000);
            var polut = Laattalista.Polut(Relief, kamera, 50, 0.46, 2532, 0, 8, Juuri);
            Oleta.Tosi(polut.Count > 0 && polut.Count <= Laattalista.Katto, $"määrä {polut.Count}");
            Oleta.Tosi(polut.All(p => p.StartsWith("matkakirja/reliefipyramidi/20260924/pallo/")), "juuri pois");
            int z = Laattalista.Taso(1_200_000, 60.17, 50, 2532, 0, 8);
            var (x, y) = Laattalista.Laatta(60.17, 24.94, z);
            Oleta.Sama($"matkakirja/reliefipyramidi/20260924/pallo/{z}/{x}/{y}.jpg", polut[0], "kameran alla ensin");
            var tasot = polut.Select(p => int.Parse(p.Split('/')[4])).ToList();
            int ensimmainenLahemmas = tasot.IndexOf(z + 1), ensimmainenKauemmas = tasot.IndexOf(z - 1);
            Oleta.Tosi(ensimmainenLahemmas > 0 && ensimmainenKauemmas > ensimmainenLahemmas, "z, sitten z+1, sitten z−1");
            Oleta.Tosi(tasot.All(t => t >= z - 1 && t <= z + 1), "vain ±1");
            Oleta.Sama(polut.Count, polut.Distinct().Count(), "ei kaksoiskappaleita");
        }

        [Testi] static void ReverseYOnXyzRivi()
        {
            var kamera = new Nakyma(60.17, 24.94, 1_200_000);
            var polut = Laattalista.Polut(Yovalot, kamera, 50, 0.46, 2532, 0, 6, Juuri);
            int z = Laattalista.Taso(1_200_000, 60.17, 50, 2532, 0, 6);
            var (x, y) = Laattalista.Laatta(60.17, 24.94, z);
            Oleta.Sama($"julisteet/pallo/yovalot/2026-09-25/{z}/{x}/{y}.jpg", polut[0]);
            Oleta.Tosi(polut.All(p => int.Parse(p.Split('/')[4]) <= 6), "sarjan katto Z6");
        }

        [Testi] static void AntimeridiaaniJaNapa()
        {
            var polut = Laattalista.Polut(Relief, new Nakyma(0, 179.9, 3_000_000), 50, 0.46, 2532, 0, 8, Juuri);
            Oleta.Tosi(polut.Any(p => p.Split('/')[5] == "0"), "itäraja jatkuu x = 0:sta");
            var napa = Laattalista.Polut(Relief, new Nakyma(84, 0, 8_000_000), 50, 0.46, 2532, 0, 8, Juuri);
            Oleta.Tosi(napa.Count > 0, "napa ei kaada");
            var koko = Laattalista.Polut(Relief, new Nakyma(0, 0, 60_000_000), 50, 1.3, 2532, 0, 8, Juuri);
            Oleta.Tosi(koko.Count > 0 && koko.Count <= Laattalista.Katto, $"koko pallo {koko.Count}");
        }

        [Testi] static void PystyruutuJattaaTilaaTasoille()
        {
            // iPhone pystyssä 1 200 km Helsingin yllä: taso z ei saa täyttää kattoa, vaan ±1 mahtuu mukaan.
            var polut = Laattalista.Polut(Relief, new Nakyma(60.17, 24.94, 1_200_000), 50, 0.46, 2532, 0, 8, Juuri);
            int z = Laattalista.Taso(1_200_000, 60.17, 50, 2532, 0, 8);
            var tasot = polut.Select(p => int.Parse(p.Split('/')[4])).ToList();
            Oleta.Tosi(tasot.Contains(z + 1) && tasot.Contains(z - 1), $"z={z}: {tasot.Count(t => t == z)} / "
                + $"{tasot.Count(t => t == z + 1)} / {tasot.Count(t => t == z - 1)}");
            Oleta.Tosi(polut.Count < Laattalista.Katto, $"yhteensä {polut.Count}");
        }

        [Testi] static void KallistusKatsooPohjoiseen()
        {
            // 300 km, kallistus 60°: ruudun alareuna osuu ~1,9° pohjoiseen, yläreuna horisonttiin (~17°).
            var kamera = new Nakyma(45, 10, 300_000, 60);
            var polut = Laattalista.Polut(Relief, kamera, 50, 0.46, 2532, 0, 8, Juuri);
            int z = Laattalista.Taso(300_000, 45, 50, 2532, 0, 8);
            var oma = Laattalista.Laatta(45, 10, z);
            var tasolla = polut.Select(p => p.Split('/')).Where(o => int.Parse(o[4]) == z)
                .Select(o => (x: int.Parse(o[5]), y: int.Parse(o[6].Split('.')[0]))).Where(t => t != oma).ToList();
            Oleta.Tosi(tasolla.Count > 0, "pohjoinen näkyy");
            Oleta.Tosi(tasolla.All(t => Laattalista.RivinLat(t.y, z) > 44.5), "etelään jäävät laatat pois");
            Oleta.Tosi(tasolla.Any(t => Laattalista.RivinLat(t.y + 1, z) > 49), "horisonttia kohti");
        }

        [Testi] static void KattoJaTyhjat()
        {
            var kamera = new Nakyma(45, 10, 500_000, 50);
            Oleta.Sama(20, Laattalista.Polut(Relief, kamera, 50, 0.46, 2532, 0, 8, Juuri, katto: 20).Count);
            Oleta.Sama(0, Laattalista.Polut(null, kamera, 50, 0.46, 2532, 0, 8).Count);
            Oleta.Sama(0, Laattalista.Polut(Relief, kamera, 50, 0.46, 2532, 5, 4).Count);
        }
    }
}
