// Maakunnat maittain (Kartta/Maakuntajako.cs, MaaKartta.maakohtainen): kansi päivämäärärajan yli, rypäät,
// rasterointi ja kaarien kohdistus. Oikea aineisto (skeema 1.42, 138 maata, 8,3 Mt) ja kestot:
//   MAAKUNTARAJAT=<polku>/maakuntarajat.json ./kaanna.sh Maakuntajako
// (esim. curl https://media.matkakirja.app/sisalto/1/v107/kokoelmat/maakuntarajat.json); ilman ympäristömuuttujaa
// oikean aineiston testit ohitetaan.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Matkakirja;
using Matkakirja.Linssit.Maat;

namespace Matkakirja.Kartta.Testit
{
    static class MaakuntajakoTestit
    {
        const double Tavoite = 44.0 / 4096;
        const long Budjetti = 4096L * 4096;
        const int Sivu = 8192;

        static bool Lahella(double a, double b, double tol = 1e-9) => Math.Abs(a - b) <= tol;

        [Testi]
        static void KansiTavallinen()
        {
            var k = Maakuntajako.Kansi(new List<(double, double)> { (-5, 8), (2, 10), (-4, -1) });
            Oleta.Tosi(Lahella(k.W, -5) && Lahella(k.E, 10), $"{k}");
        }

        [Testi]
        static void KansiPaivamaararajanYli()
        {
            // Venäjä: länsi 20…180 ja Tšukotka -180…-169 → yksi kansi 20…191.
            var k = Maakuntajako.Kansi(new List<(double, double)> { (20, 180), (-180, -169) });
            Oleta.Tosi(Lahella(k.W, 20) && Lahella(k.E, 191), $"{k}");
            // Fidži: 177…180 ja -180…-178 → 177…182.
            k = Maakuntajako.Kansi(new List<(double, double)> { (177, 180), (-180, -178) });
            Oleta.Tosi(Lahella(k.W, 177) && Lahella(k.E, 182), $"{k}");
            // Viimeinen lohko jatkuu ensimmäisten yli: 100…250 (≡ -110) nielee -170…-160.
            k = Maakuntajako.Kansi(new List<(double, double)> { (-170, -160), (100, 250) });
            Oleta.Tosi(Lahella(k.W, 100) && Lahella(k.E, 250), $"{k}");
        }

        [Testi]
        static void LonValiKiertaa()
        {
            Oleta.Tosi(Lahella(Maakuntajako.LonVali(178, 180, -180, -179), 0), "vierekkäin ±180");
            Oleta.Tosi(Lahella(Maakuntajako.LonVali(170, 175, -178, -176), 7), "7° yli rajan");
        }

        static Dictionary<string, object> Alue(string id, params double[][] rengas)
        {
            double w = 1e9, s = 1e9, e = -1e9, n = -1e9;
            var pisteet = new List<object>();
            foreach (var p in rengas)
            {
                pisteet.Add(new List<object> { p[0], p[1] });
                w = Math.Min(w, p[0]); e = Math.Max(e, p[0]); s = Math.Min(s, p[1]); n = Math.Max(n, p[1]);
            }
            return new Dictionary<string, object>
            {
                ["id"] = id, ["bbox"] = new List<object> { w, s, e, n },
                ["renkaat"] = new List<object> { pisteet },
            };
        }

        static List<object> Kaari(params double[][] p)
        {
            var l = new List<object>();
            foreach (var x in p) l.Add(new List<object> { x[0], x[1] });
            return l;
        }

        static double[] P(double lon, double lat) => new[] { lon, lat };

        static Maakuntajako Keksitty() => Maakuntajako.Lue(new Dictionary<string, object>
        {
            ["alkiot"] = new List<object>
            {
                // AAA: kaksi vierekkäistä aluetta ja kaukainen saari (30° itään).
                Alue("AAA:a", P(0, 0), P(1, 0), P(1, 1), P(0, 1)),
                Alue("AAA:b", P(1, 0), P(2, 0), P(2, 1), P(1, 1)),
                Alue("AAA:saari", P(30, 0), P(30.5, 0), P(30.5, 0.5), P(30, 0.5)),
                // BBB: päivämääräraja jakaa alueen kahdeksi renkaaksi.
                new Dictionary<string, object>
                {
                    ["id"] = "BBB:x", ["bbox"] = new List<object> { -180.0, 10.0, 180.0, 11.0 },
                    ["renkaat"] = new List<object>
                    {
                        Kaari(P(179, 10), P(180, 10), P(180, 11), P(179, 11)),
                        Kaari(P(-180, 10), P(-179, 10), P(-179, 11), P(-180, 11)),
                    },
                },
            },
            ["kaaret"] = new List<object>
            {
                Kaari(P(1, 0), P(1, 1)),                 // AAA:n sisäraja
                Kaari(P(0, 0), P(1, 0), P(2, 0)),        // AAA:n etelärannikko
                Kaari(P(30, 0), P(30.5, 0), P(30.5, 0.5), P(30, 0.5), P(30, 0)),
                Kaari(P(179, 10), P(180, 10)),           // BBB
                Kaari(P(50, 50), P(51, 51)),             // ei kenenkään
            },
            ["maat"] = new List<object> { new Dictionary<string, object> { ["iso3"] = "AAA", ["nimi"] = "Aa" } },
        });

        [Testi]
        static void MaittainJaKaaret()
        {
            var j = Keksitty();
            Oleta.Sama(2, j.Maat.Count);
            Oleta.Sama(3, j.Hae("AAA").Alueet.Count);
            Oleta.Sama("Aa", j.Hae("AAA").Nimi);
            Oleta.Sama(3, j.Hae("AAA").Kaaret.Count);
            Oleta.Sama(1, j.Hae("BBB").Kaaret.Count);
            Oleta.Sama(1, j.KohdistamattomatKaaret);
            Oleta.Sama(2, j.Hae("AAA").Rypaat.Count, "emämaa ja saari");
            Oleta.Sama(1, j.Hae("BBB").Rypaat.Count, "±180 yksi rypäs");
        }

        [Testi]
        static void RajausSeuraaPelaajaa()
        {
            var j = Keksitty();
            // Ilman pistettä suurin rypäs (emämaa); saari jää pois, koska teksel karkenisi (0,01° → 0,025°).
            var r = j.Rajaa("AAA", null, null, 0.01, 100_000, Sivu);
            Oleta.Sama(2, r.Alueet.Count);
            Oleta.Sama(1, r.RypaitaPois);
            Oleta.Tosi(r.Sisalla(1, 0.5) && !r.Sisalla(30.2, 0.2), "emämaa sisällä, saari ulkona");
            // Saarella saari.
            r = j.Rajaa("AAA", 0.2, 30.2, 0.01, 100_000, Sivu);
            Oleta.Sama(1, r.Alueet.Count);
            Oleta.Sama("AAA:saari", r.Alueet[0].Id);
            // Iso budjetti: molemmat samassa tekselissä.
            r = j.Rajaa("AAA", null, null, 0.01, 1_000_000, Sivu);
            Oleta.Sama(3, r.Alueet.Count);
            Oleta.Tosi(j.Rajaa("CCC", null, null, 0.01, 1_000_000, Sivu) == null, "tuntematon maa");
        }

        static byte Pikseli(Maakuntajako.Rajaus r, byte[] k, double lon, double lat)
        {
            double d = lon - r.Lon0;
            d -= 360 * Math.Floor(d / 360);
            int x = (int)(d / r.LonVali * r.W), y = (int)((r.Lat1 - lat) / r.LatVali * r.H);
            return x < 0 || x >= r.W || y < 0 || y >= r.H ? (byte)0 : k[y * r.W + x];
        }

        [Testi]
        static void RasterointiJaPaivamaararaja()
        {
            var j = Keksitty();
            var r = j.Rajaa("AAA", null, null, 0.01, 1_000_000, Sivu);
            var k = Maakuntajako.Rasteroi(r);
            Oleta.Sama(1, (int)Pikseli(r, k, 0.5, 0.5));
            Oleta.Sama(2, (int)Pikseli(r, k, 1.5, 0.5));
            Oleta.Sama(0, (int)Pikseli(r, k, 0.5, 1.3));
            r = j.Rajaa("BBB", null, null, 0.01, 1_000_000, Sivu);
            Oleta.Tosi(Lahella(r.Lon0, 178.5) && r.LonVali >= 3, $"BBB {r.Lon0} {r.LonVali}");
            k = Maakuntajako.Rasteroi(r);
            Oleta.Sama(1, (int)Pikseli(r, k, 179.5, 10.5), "länsipuoli");
            Oleta.Sama(1, (int)Pikseli(r, k, -179.5, 10.5), "itäpuoli (-179,5 ≡ 180,5)");
            Oleta.Sama(1, j.Janat(r).Count);
        }

        // ---- Oikea aineisto ----

        static Maakuntajako oikea;
        static long jasennysMs, lueMs;

        static Maakuntajako Oikea()
        {
            if (oikea != null) return oikea;
            var polku = Environment.GetEnvironmentVariable("MAAKUNTARAJAT");
            if (string.IsNullOrEmpty(polku) || !File.Exists(polku)) return null;
            GC.Collect();
            long ennen = GC.GetTotalMemory(true);
            var (j, pituus, puu) = Jasenna(polku);
            GC.Collect();
            long jaettu = GC.GetTotalMemory(true) - ennen;
            oikea = j;
            Console.WriteLine($"      maakuntarajat {pituus / 1e6:0.0} Mt: MiniJson {jasennysMs} ms (puu ~{puu / 1e6:0} Mt), " +
                              $"maittain {lueMs} ms, muistiin {jaettu / 1e6:0} Mt; {j.Maat.Count} maata, {j.AlueitaYhteensa} aluetta, " +
                              $"{j.Kaaria} kaarta ({j.KohdistamattomatKaaret} kohdistamatta), suurin {j.AlueitaEnintaanMaa} {j.AlueitaEnintaan}");
            return oikea;
        }

        static (Maakuntajako, int, long) Jasenna(string polku)
        {
            var teksti = File.ReadAllText(polku);
            long ennen = GC.GetTotalMemory(true);
            var kello = Stopwatch.StartNew();
            var juuri = Matkakirja.Peli.MiniJson.Jasenna(teksti);
            jasennysMs = kello.ElapsedMilliseconds;
            long puu = GC.GetTotalMemory(true) - ennen;
            kello.Restart();
            var j = Maakuntajako.Lue(juuri);
            lueMs = kello.ElapsedMilliseconds;
            return (j, teksti.Length, puu);
        }

        static (Maakuntajako.Rajaus r, byte[] k) Maa(string iso, double? lat = null, double? lon = null)
        {
            var j = Oikea();
            var kello = Stopwatch.StartNew();
            var r = j.Rajaa(iso, lat, lon, Tavoite, Budjetti, Sivu);
            var k = Maakuntajako.Rasteroi(r);
            var janat = j.Janat(r);
            Console.WriteLine($"      {iso}{(lat.HasValue ? $" ({lat:0.#}, {lon:0.#})" : "")}: {r.Alueet.Count} aluetta, {r.W}×{r.H} " +
                              $"({r.W * (long)r.H / 1e6:0.0} Mt), teksel {r.Teksel * 111.2:0.0} km, {r.Lon0:0.#}…{r.Lon0 + r.LonVali:0.#}°, " +
                              $"rypäitä {r.Rypaita} (+{r.RypaitaPois} pois), {janat.Count} janaa, {kello.ElapsedMilliseconds} ms");
            return (r, k);
        }

        static string Osuma(Maakuntajako.Rajaus r, double lat, double lon) => new MaaOsuma(r.Alueet).Hae(lat, lon, 0.1);

        [Testi]
        static void OikeaAineistoMaittain()
        {
            var j = Oikea();
            if (j == null) { Console.WriteLine("      (ohitettu: MAAKUNTARAJAT puuttuu)"); return; }
            Oleta.Sama(138, j.Maat.Count);
            Oleta.Tosi(j.AlueitaEnintaan <= Maakuntajako.AluetaEnintaan, $"{j.AlueitaEnintaanMaa} {j.AlueitaEnintaan}");
            Oleta.Tosi(j.KohdistamattomatKaaret < 100, $"kohdistamatta {j.KohdistamattomatKaaret}");
            foreach (var m in j.Maat.Values) Oleta.Tosi(m.Kaaret.Count > 0, m.Iso3 + " ilman kaaria");
        }

        [Testi]
        static void OikeaRanska()
        {
            if (Oikea() == null) return;
            var (r, k) = Maa("FRA", 48.857, 2.352);
            Oleta.Tosi(r.Teksel <= Tavoite * 1.0001, "emämaa 1,2 km:n tekselissä");
            Oleta.Tosi(Pikseli(r, k, 2.352, 48.857) > 0, "Pariisi");
            Oleta.Tosi(Pikseli(r, k, 9.1, 42.1) > 0, "Korsika");
            Oleta.Tosi(!r.Sisalla(-61.5, 16.2), "Guadeloupe pois");
            Oleta.Tosi(Osuma(r, 48.857, 2.352)?.StartsWith("FRA:") == true, "osuma Pariisissa");
            Oleta.Tosi(Osuma(r, 16.2, -61.5) == null, "ei osumaa Guadeloupessa");
            var (g, gk) = Maa("FRA", 4.939, -52.332);
            Oleta.Tosi(Pikseli(g, gk, -52.5, 4.5) > 0 && g.Alueet.Count < 5, "Cayenne: Guyana");
        }

        [Testi]
        static void OikeaVenaja()
        {
            if (Oikea() == null) return;
            var (r, k) = Maa("RUS", 55.751, 37.617);
            Oleta.Tosi(r.Lon0 + r.LonVali > 185, "itäraja päivämäärärajan yli");
            Oleta.Tosi(Pikseli(r, k, 37.617, 55.751) > 0, "Moskova");
            Oleta.Tosi(Pikseli(r, k, 20.5, 54.7) > 0, "Kaliningrad");
            Oleta.Tosi(Pikseli(r, k, 158.7, 53.0) > 0, "Kamtšatka");
            Oleta.Tosi(Pikseli(r, k, -175.0, 66.5) > 0, "Tšukotka -175°");
            Oleta.Tosi(Osuma(r, 66.5, -175.0)?.StartsWith("RUS:") == true, "osuma Tšukotkassa");
        }

        [Testi]
        static void OikeaYhdysvallat()
        {
            if (Oikea() == null) return;
            var (r, k) = Maa("USA", 40.67, -73.94);
            Oleta.Tosi(Pikseli(r, k, -73.94, 40.67) > 0 && Pikseli(r, k, -122.4, 37.78) > 0, "New York ja San Francisco");
            Oleta.Tosi(!r.Sisalla(-149.9, 61.2), "Alaska pois New Yorkista");
            var (a, ak) = Maa("USA", 61.217, -149.894);
            Oleta.Tosi(Pikseli(a, ak, -149.894, 61.217) > 0 && Pikseli(a, ak, -165.4, 64.5) > 0, "Anchorage ja Nome");
            var (h, hk) = Maa("USA", 20, -156.301);
            Oleta.Tosi(Pikseli(h, hk, -155.5, 19.6) > 0, "Havaiji");
        }

        [Testi]
        static void SisaisetKaaretPois()
        {
            // DDD:a = kaksi departementtia (kaksi rengasta, yhteinen jana x = 1), DDD:b vieressä (raja x = 2).
            var j = Maakuntajako.Lue(new Dictionary<string, object>
            {
                ["alkiot"] = new List<object>
                {
                    new Dictionary<string, object>
                    {
                        ["id"] = "DDD:a", ["bbox"] = new List<object> { 0.0, 0.0, 2.0, 1.0 },
                        ["renkaat"] = new List<object>
                        {
                            Kaari(P(0, 0), P(1, 0), P(1, 1), P(0, 1), P(0, 0)),
                            Kaari(P(1, 0), P(2, 0), P(2, 1), P(1, 1), P(1, 0)),
                        },
                    },
                    Alue("DDD:b", P(2, 0), P(3, 0), P(3, 1), P(2, 1), P(2, 0)),
                },
                ["kaaret"] = new List<object>
                {
                    Kaari(P(1, 0), P(1, 1)),                          // departementtien raja: pois
                    Kaari(P(2, 0), P(2, 1)),                          // alueiden raja
                    Kaari(P(1, 0), P(0, 0), P(0, 1), P(1, 1)),        // ulkoraja (a:n länsiosa)
                    Kaari(P(1, 0), P(2, 0)), Kaari(P(1, 1), P(2, 1)), // ulkoraja (a:n itäosa)
                    Kaari(P(2, 0), P(3, 0), P(3, 1), P(2, 1)),        // ulkoraja (b)
                },
            });
            var m = j.Hae("DDD");
            Oleta.Sama(5, m.Kaaret.Count);
            Oleta.Sama(1, m.SisaisetKaaret.Count);
            Oleta.Sama(1, j.SisaisetKaaret);
            Oleta.Tosi(m.SisaisetKaaret[0][0] == (1.0, 0.0) && m.SisaisetKaaret[0][1] == (1.0, 1.0), "x = 1 pois");
            // Väritys: a ja b naapureita (sama omistajatieto), a:n renkaat eivät tee siitä oman naapurinsa.
            Oleta.Tosi(m.Varit[0] != m.Varit[1], "a ja b eri sävyissä");
        }

        [Testi]
        static void OikeaSisaisetKaaret()
        {
            var j = Oikea();
            if (j == null) return;
            Console.WriteLine($"      sisäisiä kaaria yhteensä {j.SisaisetKaaret}");
            foreach (var (iso, lat, lon) in new[] { ("FRA", 48.857, 2.352), ("JPN", 35.689, 139.692), ("RUS", 55.751, 37.617) })
            {
                var m = j.Hae(iso);
                var r = j.Rajaa(iso, lat, lon, Tavoite, Budjetti, Sivu);
                int jalkeen = j.Janat(r).Count, pois = j.Janat(r, true).Count;
                Console.WriteLine($"      {iso}: kaaria {m.Kaaret.Count + m.SisaisetKaaret.Count} → {m.Kaaret.Count}, " +
                                  $"rajajanoja {jalkeen + pois} → {jalkeen}");
                if (iso == "FRA")
                {
                    // 96 departementtia 13 alueessa (+ merentakaiset): sisäisiä kaaria on paljon, alueiden rajat jäävät.
                    Oleta.Tosi(m.SisaisetKaaret.Count > 50, $"FRA sisäisiä {m.SisaisetKaaret.Count}");
                    Oleta.Tosi(m.Kaaret.Count > 20, $"FRA jäljellä {m.Kaaret.Count}");
                    // Jokainen jäljelle jäänyt kaari on alueiden välinen raja tai ulkoraja.
                    var om = Maakuntajako.JanaOmistajat(m.Alueet);
                    foreach (var k in m.Kaaret) Oleta.Tosi(!Maakuntajako.SisainenKaari(k, om), "sisäinen jäi");
                }
            }
        }

        [Testi]
        static void OikeaUudetMaat()
        {
            if (Oikea() == null) return;
            var (g, gk) = Maa("GRC", 37.984, 23.728);
            Oleta.Tosi(Pikseli(g, gk, 23.728, 37.984) > 0 && Pikseli(g, gk, 25.1, 35.2) > 0, "Ateena ja Kreeta");
            var (jp, jk) = Maa("JPN", 35.689, 139.692);
            Oleta.Tosi(Pikseli(jp, jk, 139.692, 35.689) > 0 && Pikseli(jp, jk, 135.768, 35.012) > 0, "Tokio ja Kioto");
            var (f, fk) = Maa("FJI", -18.133, 178.433);
            Oleta.Tosi(Pikseli(f, fk, 178.433, -18.1) > 0 || Pikseli(f, fk, 178.45, -18.0) > 0, "Suva");
            Oleta.Tosi(f.Lon0 + f.LonVali > 180, "Fidžin itäsaaret yli 180°");
            foreach (var iso in new[] { "CAN", "CHN", "IDN", "BRA", "AUS", "NZL", "NOR", "TUR" }) if (Oikea().Hae(iso) != null) Maa(iso);
        }
    }
}
