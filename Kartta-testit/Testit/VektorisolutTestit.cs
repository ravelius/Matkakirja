// Löydös 46 E1: rannikon vektorisolujen puhtaat osat (Kartta/Vektorisolut.cs) webin js/pallovektorit.js:n mukaan.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class VektorisolutTestit
    {
        static readonly double[] Lodit = { 0.1, 0.03, 0.008, 0.004, 0 };

        /// <summary>Webin muoto: int32 n, int32 lon·1e4, int32 lat·1e4, (n − 1) × (int16 dlon, int16 dlat).</summary>
        static byte[] Koodaa(params double[][] viivat) => KoodaaK(false, viivat);

        /// <summary>Korkeudellinen muoto: viiva lon, lat, h -kolmikkoina; h0 int16 otsakkeessa, sitten (dlon, dlat, h).</summary>
        static byte[] KoodaaK(bool korkeus, params double[][] viivat)
        {
            var ms = new MemoryStream();
            var w = new BinaryWriter(ms);
            int a = korkeus ? 3 : 2;
            foreach (var v in viivat)
            {
                int n = v.Length / a;
                w.Write(n);
                int x = (int)Math.Round(v[0] * 1e4), y = (int)Math.Round(v[1] * 1e4);
                w.Write(x); w.Write(y);
                if (korkeus) w.Write((short)v[2]);
                for (int k = 1; k < n; k++)
                {
                    int x2 = (int)Math.Round(v[a * k] * 1e4), y2 = (int)Math.Round(v[a * k + 1] * 1e4);
                    w.Write((short)(x2 - x)); w.Write((short)(y2 - y));
                    if (korkeus) w.Write((short)v[a * k + 2]);
                    x = x2; y = y2;
                }
            }
            return ms.ToArray();
        }

        /// <summary>lon, lat -parit askeleen 3 viivaksi (h = 0).</summary>
        static float[] V(params float[] lonLat)
        {
            var v = new float[lonLat.Length / 2 * 3];
            for (int i = 0; i < lonLat.Length / 2; i++) { v[3 * i] = lonLat[2 * i]; v[3 * i + 1] = lonLat[2 * i + 1]; }
            return v;
        }

        [Testi]
        static void PurkuKuinWebinPuraDelta()
        {
            var b = Koodaa(new[] { 23.7275, 37.9838, 23.7301, 37.9811, 23.7402, 37.9700 }, new[] { -179.99, 65.5, 179.99, 65.6 });
            var v = Vektorisolut.Pura(b);
            Oleta.Sama(2, v.Count, "viivoja");
            Oleta.Sama(9, v[0].Length, "ensimmäisen viivan floatit (lon, lat, h)");
            Oleta.Tosi(Math.Abs(v[0][6] - 23.7402) < 1e-4 && Math.Abs(v[0][7] - 37.97) < 1e-4 && v[0][8] == 0, "delta kertyy, h 0");
            // Sauman yli: delta int16:n ulkopuolella ei ole webissäkään (työkalu katkaisee > 3,2° hypyt) — tässä vain
            // tarkistetaan, että vajaa tiedosto luetaan ehjään kohtaan asti.
            var vajaa = new byte[b.Length - 3];
            Array.Copy(b, vajaa, vajaa.Length);
            Oleta.Sama(1, Vektorisolut.Pura(vajaa).Count, "vajaa tiedosto: ehjä osa");
            Oleta.Sama(0, Vektorisolut.Pura(null).Count, "null");
        }

        [Testi]
        static void PurkuKorkeuksineen()
        {
            // Karttasepän tuleva rajamuoto: (dlon, dlat, h int16), h absoluuttisena metreinä.
            var b = KoodaaK(true, new[] { 7.0, 46.0, 1200, 7.01, 46.02, 2950, 7.03, 46.03, -12 }, new[] { 8.0, 47.0, 400, 8.1, 47.0, 410 });
            var v = Vektorisolut.Pura(b, true);
            Oleta.Sama(2, v.Count, "viivoja");
            Oleta.Tosi(v[0][2] == 1200 && v[0][5] == 2950 && v[0][8] == -12 && Math.Abs(v[0][6] - 7.03) < 1e-4, "h ja paikka");
            Oleta.Tosi(v[1][2] == 400 && v[1][5] == 410, "toinen viiva");
            // Väärällä lipulla ei kaaduta (luetaan mitä saadaan).
            Vektorisolut.Pura(b, false);
        }

        [Testi]
        static void OikeaSoluAmparista()
        {
            // Valinnainen: RANNIKKO_SOLU=<polku .bin> (esim. ämpärin rannikko/l4/20_5.bin) → pisteiden määrä luettelosta.
            var polku = Environment.GetEnvironmentVariable("RANNIKKO_SOLU");
            if (string.IsNullOrEmpty(polku) || !File.Exists(polku)) return;
            var v = Vektorisolut.Pura(File.ReadAllBytes(polku));
            int n = 0;
            foreach (var x in v) n += x.Length / Vektorisolut.Askel;
            var odotettu = Environment.GetEnvironmentVariable("RANNIKKO_PISTEITA");
            Console.WriteLine($"      {polku}: {v.Count} viivaa, {n} pistettä");
            if (!string.IsNullOrEmpty(odotettu)) Oleta.Sama(int.Parse(odotettu), n, "pisteitä");
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var nauha = Vektorisolut.TeeNauha(v, 0, Identiteetti);
            long ms = kello.ElapsedMilliseconds;
            kello.Restart();
            var harva = Vektorisolut.TeeNauha(v, 0.0008, Identiteetti);
            Console.WriteLine($"      nauha {nauha.Janoja} janaa {ms} ms; porras 0,0008°: {harva.Janoja} janaa {kello.ElapsedMilliseconds} ms (Mac)");
            Oleta.Tosi(nauha.Janoja >= n - v.Count && harva.Janoja < nauha.Janoja, "janoja");
            // Valinnainen: RANNIKKO_LUETTELO=<luettelo.json> → ämpärin oikea luettelo jäsentyy.
            var lp = Environment.GetEnvironmentVariable("RANNIKKO_LUETTELO");
            if (string.IsNullOrEmpty(lp) || !File.Exists(lp)) return;
            var l = Vektorisolut.LueLuettelo(File.ReadAllText(lp));
            var t4 = l?.Tasolle("rannikko", 4);
            Console.WriteLine($"      luettelo {l?.Versio}: l4 {t4?.Tiedostot.Count} tiedostoa, {t4?.Pisteita} pistettä, {t4?.Tavuja} tavua");
            Oleta.Tosi(t4 != null && t4.Tiedostot.Contains("20_5") && t4.Tol == 0, "l4");
        }

        [Testi]
        static void TasoWebinSaannolla()
        {
            Oleta.Sama(0, Vektorisolut.ValitseTaso(Lodit, 0), "tiheys 0 (ohi pallon) → karkein");
            Oleta.Sama(0, Vektorisolut.ValitseTaso(Lodit, 5), "0,1 × 5 = 0,5 ≤ 0,5");
            Oleta.Sama(1, Vektorisolut.ValitseTaso(Lodit, 6), "0,1 × 6 > 0,5 → l1");
            Oleta.Sama(2, Vektorisolut.ValitseTaso(Lodit, 20), "maailmankuva → l2");
            Oleta.Sama(3, Vektorisolut.ValitseTaso(Lodit, 100), "0,004 × 100 = 0,4");
            // Saapumisnäkymä (~240 px/°) ja iPhonen lähin zoomi (~980 px/°): täysi aineisto kuten webissä.
            Oleta.Sama(4, Vektorisolut.ValitseTaso(Lodit, 240), "saapumisnäkymä → l4");
            Oleta.Sama(4, Vektorisolut.ValitseTaso(Lodit, 980), "lähin zoomi → l4");
            Oleta.Sama(0, Vektorisolut.ValitseTaso(new double[0], 500), "tyhjä luettelo");
        }

        [Testi]
        static void HarvennusPorrasKuinWebissa()
        {
            Oleta.Sama(0.0, Vektorisolut.HarvennusPorras(0), "ei tiheyttä");
            Oleta.Sama(0.05, Vektorisolut.HarvennusPorras(10), "0,6 / 10 = 0,06 ≥ 0,05");
            Oleta.Sama(0.003, Vektorisolut.HarvennusPorras(150), "0,6 / 150 = 0,004");
            Oleta.Sama(0.0008, Vektorisolut.HarvennusPorras(240), "0,6 / 240 = 0,0025");
            Oleta.Sama(0.0, Vektorisolut.HarvennusPorras(980), "lähin zoomi: ei harvennusta");
            Oleta.Sama(0.0, Vektorisolut.SolunPorras(0.003, 0.004), "aineisto jo karkeampi");
            Oleta.Sama(0.012, Vektorisolut.SolunPorras(0.012, 0.004), "porras karkeampi");
        }

        [Testi]
        static void SolutJaAvaimet()
        {
            Oleta.Sama("20_5", Vektorisolut.SoluAvain(23.7, 37.9, 10), "Ateena");
            Oleta.Sama("35_17", Vektorisolut.SoluAvain(180, -90, 10), "kulma rajataan");
            var alue = new Vektorisolut.Alue { Lon0 = 19.5, Lon1 = 30.5, Lat0 = 34.5, Lat1 = 41.5 };
            var s = Vektorisolut.Solut(alue, 10);
            Oleta.Tosi(s.Count == 6 && s.Contains("19_5") && s.Contains("21_4") && s.Contains("20_5"), string.Join(",", s));
            Oleta.Sama("0_0", Vektorisolut.Solut(alue, 360)[0], "koko maailman taso");
            // Sauman yli (aukikierretty alue 170…190): solut 35 ja 0.
            var sauma = Vektorisolut.Solut(new Vektorisolut.Alue { Lon0 = 172, Lon1 = 188, Lat0 = -19, Lat1 = -15 }, 10);
            Oleta.Tosi(sauma.Contains("35_10") && sauma.Contains("0_10") && sauma.Count == 2, string.Join(",", sauma));
        }

        [Testi]
        static void AlueNaytteistaAukikierretty()
        {
            var n = new List<(double, double)> { (179.0, 10.0), (-179.0, 12.0), (double.NaN, 0.0) };
            Oleta.Tosi(Vektorisolut.AlueNaytteista(n, 179.5, out var a), "osui");
            Oleta.Tosi(Math.Abs(a.Lon0 - 178.0) < 1e-9 && Math.Abs(a.Lon1 - 182.0) < 1e-9, $"lon {a.Lon0}…{a.Lon1}");
            Oleta.Tosi(Math.Abs(a.Lat0 - 9.0) < 1e-9 && Math.Abs(a.Lat1 - 13.0) < 1e-9 && a.Naytteita == 2, "lat ja NaN pois");
            Oleta.Tosi(!Vektorisolut.AlueNaytteista(new List<(double, double)>(), 0, out _), "ei näytteitä");
        }

        [Testi]
        static void HarvennusDouglasPeucker()
        {
            var v = V(0, 0, 1, 0.001f, 2, 0, 3, 0.5f, 4, 0);
            v[3 * 3 + 2] = 777; // huipun h kulkee mukana
            var h = Vektorisolut.Harvenna(v, 0.01);
            Oleta.Sama(12, h.Length, "pieni mutka pois, iso jää");
            Oleta.Tosi(h[0] == 0 && h[h.Length - 3] == 4 && h[6] == 3 && h[8] == 777, "päät, huippu ja sen h");
            Oleta.Tosi(ReferenceEquals(v, Vektorisolut.Harvenna(v, 0)), "tol 0 = sama taulukko");
        }

        static readonly double[] Identiteetti = { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 };

        [Testi]
        static void NauhaJanoinaJaPaloina()
        {
            var viivat = new List<float[]> { V(20f, 40f, 20.05f, 40f, 20.05f, 40.05f), V(5f, 5f) };
            var n = Vektorisolut.TeeNauha(viivat, 0, Identiteetti);
            Oleta.Sama(2, n.Janoja, "kaksi lyhyttä janaa, yhden pisteen viiva pois");
            Oleta.Sama(2 * 4 * Vektorisolut.KarjenFloatit, n.Karjet.Length, "kärjet");
            Oleta.Sama(12, n.Kolmiot.Length, "kolmiot");
            // Kärki 0: paikka a, toinen b, puoli −1; kärki 2: paikka b, toinen b + (b − a).
            var k = n.Karjet;
            Vektorisolut.Ecef(20, 40, 0, out double ax, out _, out _);
            Vektorisolut.Ecef(20.05, 40, 0, out double bx, out _, out _);
            Oleta.Tosi(Math.Abs(k[0] - ax) < 1 && Math.Abs(k[3] - bx) < 1 && k[6] == -1 && k[7] == 0, "kärki 0");
            int F = Vektorisolut.KarjenFloatit;
            Oleta.Tosi(Math.Abs(k[2 * F] - bx) < 1 && Math.Abs(k[2 * F + 3] - (2 * bx - ax)) < 2 && k[2 * F + 6] == -1 && k[F + 6] == 1, "kärki 2");
            // Matka: a-pään kärjet 0, b-pään kärjet janan pituus (0,05° × cos 40° × 111 km ≈ 4,27 km), seuraava jatkaa.
            Oleta.Tosi(k[8] == 0 && k[F + 8] == 0 && Math.Abs(k[2 * F + 8] - 4270) < 30, $"matka {k[2 * F + 8]}");
            Oleta.Tosi(Math.Abs(k[4 * F + 8] - k[2 * F + 8]) < 1e-3 && k[6 * F + 8] > k[4 * F + 8] + 5000, "matka kertyy");
            Oleta.Tosi(n.MinX <= ax && n.MaxX >= bx - 1, "rajat");
            // Pitkä jana (1° itään) jaetaan 0,1°:n paloihin (cos 40° → 0,766° → 8 paloa).
            var pitka = Vektorisolut.TeeNauha(new List<float[]> { V(20f, 40f, 21f, 40f) }, 0, Identiteetti);
            Oleta.Sama(8, pitka.Janoja, "paloja");
            // Sauman yli lyhintä tietä: 179,95 → −179,95 = 0,1° → yksi pala.
            Oleta.Sama(1, Vektorisolut.Paloja(179.96, 0, -179.96, 0), "sauma 0,08°");
        }

        [Testi]
        static void NauhaMatriisilla()
        {
            // Siirto + akselien vaihto: paikallinen = (ecef.y, ecef.z, ecef.x) + (1, 2, 3); rivi kerrallaan.
            double[] m = { 0, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 3, 0, 0, 0, 1 };
            var n = Vektorisolut.TeeNauha(new List<float[]> { V(10f, 0f, 10.01f, 0f) }, 0, m);
            Vektorisolut.Ecef(10, 0, 0, out double x, out double y, out double z);
            Oleta.Tosi(Math.Abs(n.Karjet[0] - (y + 1)) < 1 && Math.Abs(n.Karjet[1] - (z + 2)) < 1 && Math.Abs(n.Karjet[2] - (x + 3)) < 1,
                "matriisi rivi kerrallaan");
            Oleta.Sama(0, Vektorisolut.TeeNauha(new List<float[]>(), 0, m).Janoja, "tyhjä");
        }

        [Testi]
        static void NauhaKorkeudella()
        {
            // Alppien raja: paikka korkeudella h, lisän y = oma h, z = toisen pään h; palat interpoloivat h:n.
            var v = new float[] { 7f, 46f, 1000f, 7.2f, 46f, 3000f };
            var n = Vektorisolut.TeeNauha(new List<float[]> { v }, 0, Identiteetti);
            int F = Vektorisolut.KarjenFloatit;
            Oleta.Sama(2, n.Janoja, "0,2° × cos 46° = 0,139° → 2 paloa");
            Vektorisolut.Ecef(7, 46, 1000, out double x, out double y, out double z);
            Oleta.Tosi(Math.Abs(n.Karjet[0] - x) < 1 && Math.Abs(n.Karjet[2] - z) < 1, "paikka korkeudella");
            Oleta.Tosi(n.Karjet[9] == 1000 && n.Karjet[10] == 2000, "a-pää: oma 1000, toinen 2000 (puolivälissä)");
            Oleta.Tosi(n.Karjet[2 * F + 9] == 2000 && n.Karjet[2 * F + 10] == 3000, "b-pää: 2000, jatke 2·2000 − 1000");
            Oleta.Tosi(n.Karjet[6 * F + 9] == 3000, "viimeinen piste 3000");
        }

        [Testi]
        static void RajanTyyliKuinWebissa()
        {
            Oleta.Tosi(Math.Abs(Vektorisolut.RajaKatkoM - 700.81) < 0.01 && Math.Abs(Vektorisolut.RajaValiM - 1401.62) < 0.01, "katko 700,8 / 1 401,6 m");
            double a = Vektorisolut.LineaarinenPeitto(Vektorisolut.RajaMuste, Vektorisolut.RajaPeitto);
            Console.WriteLine($"      rajat #6b5539: web 0,34 → natiivi {a:0.000}");
            Oleta.Tosi(a > 0.34 && a < 0.7, "tummenee: " + a);
            Oleta.Tosi(Viivaleveys.Pt(25, Viivaleveys.RajaKaukana, Viivaleveys.RajaLahella) == 0.65
                && Viivaleveys.Pt(250, Viivaleveys.RajaKaukana, Viivaleveys.RajaLahella) == 0.95, "leveys 0,65–0,95");
            Oleta.Sama(30.0, Vektorisolut.RajatTiheys, "näkyy tiheydestä 30 px/°");
        }

        [Testi]
        static void LuetteloAmparinMuodossa()
        {
            const string json = "{\"versio\":\"2026-09-21-gshhs\",\"harvennus\":0.004,\"lodit\":[0.1,0.03,0.008,0.004,0],\"solu\":10," +
                "\"lajit\":{\"rannikko\":{\"tasot\":[" +
                "{\"k\":0,\"tol\":0.1,\"solu\":360,\"soluja\":1,\"pisteita\":30846,\"tiedostot\":{\"0_0\":{\"tavua\":159204,\"viivoja\":4483,\"pisteita\":30835}}}," +
                "{\"k\":2,\"tol\":0.008,\"solu\":10,\"tiedostot\":{\"20_5\":{\"tavua\":19664},\"19_5\":{\"tavua\":3968}}}," +
                "{\"k\":1,\"tol\":0.03,\"solu\":360,\"tiedostot\":{\"0_0\":{\"tavua\":604028}}}]}," +
                "\"rajat\":{\"korkeus\":true,\"tasot\":[{\"k\":0,\"tol\":0.1,\"solu\":360,\"tiedostot\":{\"0_0\":{}}}]}}}";
            var l = Vektorisolut.LueLuettelo(json);
            Oleta.Tosi(l != null && l.Versio == "2026-09-21-gshhs" && l.Lodit.Length == 5 && l.Lodit[2] == 0.008, "perustiedot");
            var t2 = l.Tasolle("rannikko", 2);
            Oleta.Tosi(t2 != null && t2.K == 2 && t2.Solu == 10 && t2.Tiedostot.Contains("20_5") && t2.Tavuja == 19664 + 3968, "taso 2 (järjestetty)");
            Oleta.Tosi(l.Tasolle("rannikko", 0).Solu == 360 && l.Tasolle("rannikko", 0).Pisteita == 30846, "taso 0");
            Oleta.Tosi(l.Tasolle("rannikko", 9) == null && l.Tasolle("joet", 0) == null, "puuttuvat");
            Oleta.Sama("rannikko/l4/20_5.bin", Vektorisolut.SolunPolku("rannikko", 4, "20_5"), "polku");
            Oleta.Tosi(!t2.Korkeus && l.Tasolle("rajat", 0).Korkeus, "korkeuslippu lajilta");
            Oleta.Tosi(Vektorisolut.LueLuettelo("[]") == null && Vektorisolut.LueLuettelo("{\"lodit\":[]}") == null, "rikki");
        }

        [Testi]
        static void PeittoLineaarisenaTummempi()
        {
            double a = Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, Vektorisolut.RantaPeitto);
            Console.WriteLine($"      rannikko #5a4330: web 0,58 → natiivi {a:0.000}");
            Oleta.Tosi(a > 0.58 && a < 0.9, "tummenee: " + a);
        }

        [Testi]
        static void MercatorLaatanRajat()
        {
            var (w, s, e, n) = Vektorisolut.MercatorLaatta(1, 0, 0);
            Oleta.Tosi(w == -180 && e == 0 && Math.Abs(s) < 1e-9 && Math.Abs(n - 85.0511287798) < 1e-6, $"{w} {s} {e} {n}");
        }
    }
}
