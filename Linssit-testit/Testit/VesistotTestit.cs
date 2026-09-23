// Vesistölinssi verkkopelin kultaisia arvoja vasten (kultaiset/vesistot.json,
// tee-vesistot.mjs; paketti/maailmankartta-maasto.json, maailmankartta-nimet.json,
// vesistot.json) sekä järvien kolmiointi ja linssin elinkaari.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Vesistot;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class VesistotTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("vesistot.json"))).RootElement;
        static object Moduuli(string nimi) => MiniJson.Jasenna(File.ReadAllText(Polku("paketti/" + nimi)));

        static VesistotAineisto aineisto;
        static VesistotAineisto Aineisto() => aineisto ??= VesistotAineisto.Lue(
            Moduuli("maailmankartta-maasto.json"), Moduuli("maailmankartta-nimet.json"), Moduuli("vesistot.json"));

        static VesistotPallolla laskettu;
        static VesistotPallolla Tulos() => laskettu ??= VesistotPallolle.Laske(Aineisto());

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        static void Otos(JsonElement otos, IReadOnlyList<LatLon> pisteet, string mita)
        {
            foreach (var r in otos.EnumerateArray())
            {
                int i = r[0].GetInt32();
                Lahella(r[1].GetDouble(), pisteet[i].Lat, $"{mita} lat[{i}]");
                Lahella(r[2].GetDouble(), pisteet[i].Lon, $"{mita} lon[{i}]");
            }
        }

        [Testi] static void VakiotKutenWebissa()
        {
            var v = K().GetProperty("vakiot");
            foreach (var p in v.GetProperty("uomaPx").EnumerateObject())
                Oleta.Sama(p.Value.GetDouble(), VesistotPallolle.UomaPx[int.Parse(p.Name)], "uomaPx " + p.Name);
            Oleta.Sama(v.GetProperty("pengerPx").EnumerateObject().Count(), VesistotPallolle.PengerPx.Count);
            foreach (var p in v.GetProperty("pengerPx").EnumerateObject())
                Oleta.Sama(p.Value.GetDouble(), VesistotPallolle.PengerPx[int.Parse(p.Name)], "pengerPx " + p.Name);
            Oleta.Sama(v.GetProperty("jarvenKorkeus").GetDouble(), VesistotPallolle.JarvenKorkeus);
            Oleta.Sama(v.GetProperty("uomanKorkeus").GetDouble(), VesistotPallolle.UomanKorkeus);
            Oleta.Sama(v.GetProperty("tihennys").GetDouble(), VesistotPallolle.TihennysAst);
            Oleta.Sama(v.GetProperty("nimienKatto").GetInt32(), VesistotPallolle.NimienKatto);
        }

        [Testi] static void MaaratKutenWebissa()
        {
            var m = K().GetProperty("maarat");
            var t = Tulos();
            Oleta.Sama(m.GetProperty("jarvet").GetInt32(), t.Jarvet.Count, "järvet");
            Oleta.Sama(m.GetProperty("penkat").GetInt32(), t.Penkat.Count, "penkat");
            Oleta.Sama(m.GetProperty("uomat").GetInt32(), t.Uomat.Count, "uomat");
            Oleta.Sama(m.GetProperty("nimet").GetInt32(), t.Nimet.Count, "nimet");
            Oleta.Sama(m.GetProperty("pisteet").GetInt32(), t.Polut.Sum(p => p.Pisteet.Count), "polkujen pisteet");
            Oleta.Sama(38, t.Jarvet.Count);
            Oleta.Sama(253, t.Polut.Count, "84 pengertä + 169 uomaa");
        }

        [Testi] static void PolutKutenWebissa()
        {
            var polut = Tulos().Polut;
            var o = K().GetProperty("polut").EnumerateArray().ToList();
            Oleta.Sama(o.Count, polut.Count);
            for (int i = 0; i < o.Count; i++)
            {
                var w = o[i];
                var p = polut[i];
                Oleta.Sama(w.GetProperty("avain").GetString(), p.Avain, $"polku {i}");
                Oleta.Sama(w.GetProperty("nimi").GetString(), p.Nimi, p.Avain);
                Oleta.Sama(w.GetProperty("vari").GetString(), p.Vari, p.Avain);
                Oleta.Sama(w.GetProperty("paksuus").GetDouble(), p.Paksuus, p.Avain);
                Oleta.Sama(w.GetProperty("korkeus").GetDouble(), p.Korkeus, p.Avain);
                Oleta.Sama(w.GetProperty("n").GetInt32(), p.Pisteet.Count, p.Avain + " pisteitä");
                if (w.GetProperty("tarkeys").ValueKind == JsonValueKind.Number)
                    Oleta.Sama(w.GetProperty("tarkeys").GetInt32(), p.Tarkeys, p.Avain);
                Oleta.Sama(p.Avain.StartsWith("penger:") ? VesiLaji.Penger : VesiLaji.Uoma, p.Laji, p.Avain);
                Otos(w.GetProperty("otos"), p.Pisteet, p.Avain);
            }
        }

        [Testi] static void JarvetKutenWebissa()
        {
            var jarvet = Tulos().Jarvet;
            var o = K().GetProperty("polygonit").EnumerateArray().ToList();
            Oleta.Sama(o.Count, jarvet.Count);
            for (int i = 0; i < o.Count; i++)
            {
                var w = o[i];
                var j = jarvet[i];
                Oleta.Sama(w.GetProperty("avain").GetString(), j.Avain);
                Oleta.Sama(w.GetProperty("nimi").GetString(), j.Nimi, j.Avain);
                Oleta.Sama(w.GetProperty("vari").GetString(), j.Vari, j.Avain);
                Oleta.Sama(w.GetProperty("reuna").GetString(), j.Reuna, j.Avain);
                Oleta.Sama(w.GetProperty("korkeus").GetDouble(), j.Korkeus, j.Avain);
                Oleta.Sama(w.GetProperty("n").GetInt32(), j.Rengas.Count, j.Avain + " renkaan pisteet");
                Otos(w.GetProperty("otos"), j.Rengas, j.Avain);
                Oleta.Tosi(j.Rengas[0].Lat == j.Rengas[j.Rengas.Count - 1].Lat && j.Rengas[0].Lon == j.Rengas[j.Rengas.Count - 1].Lon, "rengas suljettu");
            }
        }

        [Testi] static void NimetKutenWebissa()
        {
            var nimet = Tulos().Nimet;
            var o = K().GetProperty("nimet").EnumerateArray().ToList();
            Oleta.Sama(o.Count, nimet.Count);
            for (int i = 0; i < o.Count; i++)
            {
                Oleta.Sama(o[i].GetProperty("avain").GetString(), nimet[i].Avain);
                Oleta.Sama(o[i].GetProperty("teksti").GetString(), nimet[i].Teksti);
                Oleta.Sama(o[i].GetProperty("tarkeys").GetInt32(), nimet[i].Tarkeys);
                Lahella(o[i].GetProperty("lat").GetDouble(), nimet[i].Lat, nimet[i].Avain + " lat");
                Lahella(o[i].GetProperty("lng").GetDouble(), nimet[i].Lon, nimet[i].Avain + " lon");
            }
        }

        static List<LatLon> Lista(JsonElement e) => e.EnumerateArray().Select(p => new LatLon(p[0].GetDouble(), p[1].GetDouble())).ToList();

        [Testi] static void SaumaJaTihennysKutenWebissa()
        {
            var k = K();
            foreach (var t in k.GetProperty("sauma").EnumerateArray())
            {
                var palat = VesistotPallolle.KatkaiseSauma(Lista(t.GetProperty("sisaan")));
                var odotetut = t.GetProperty("ulos").EnumerateArray().Select(Lista).ToList();
                Oleta.Sama(odotetut.Count, palat.Count, "saumapalat");
                for (int i = 0; i < palat.Count; i++)
                {
                    Oleta.Sama(odotetut[i].Count, palat[i].Count);
                    for (int j = 0; j < palat[i].Count; j++) { Lahella(odotetut[i][j].Lat, palat[i][j].Lat, "sauma"); Lahella(odotetut[i][j].Lon, palat[i][j].Lon, "sauma"); }
                }
            }
            foreach (var t in k.GetProperty("tihennys").EnumerateArray())
            {
                var ulos = VesistotPallolle.TihennaKaarella(Lista(t.GetProperty("sisaan")));
                var odotettu = Lista(t.GetProperty("ulos"));
                Oleta.Sama(odotettu.Count, ulos.Count, "tihennys");
                for (int j = 0; j < ulos.Count; j++) { Lahella(odotettu[j].Lat, ulos[j].Lat, $"tihennys lat[{j}]"); Lahella(odotettu[j].Lon, ulos[j].Lon, $"tihennys lon[{j}]"); }
            }
        }

        [Testi] static void TiedotJaSeliteKutenWebissa()
        {
            var t = Aineisto().Tiedot;
            Oleta.Sama("vesistot", t.Id);
            Oleta.Sama("Vesistölinssi", t.Nimi);
            Oleta.Sama(20, t.Jarjestys);
            Oleta.Tosi(t.Valokuva);
            Oleta.Tosi(t.Lyhyt.StartsWith("Joet ja järvet"), t.Lyhyt);
            Oleta.Tosi(t.Ikoni.StartsWith("<path"), "ikoni");
            Oleta.Sama("Public domain", t.Lahde.Lisenssi);
            Oleta.Sama("2026-07-27", t.Lahde.Haettu);
            var s = K().GetProperty("selite").EnumerateArray().ToList();
            Oleta.Sama(s.Count, t.Selite.Count);
            for (int i = 0; i < s.Count; i++)
            {
                Oleta.Sama(s[i].GetProperty("vari").GetString(), t.Selite[i].Vari, $"selite {i}");
                Oleta.Sama(s[i].GetProperty("teksti").GetString(), t.Selite[i].Teksti, $"selite {i}");
            }
        }

        [Testi] static void EiAvauskynnystaVainKehittajatila()
        {
            Oleta.Tosi(!Linssirekisteri.Avauskynnykset.ContainsKey("vesistot"));
        }

        // ── Kolmiointi ────────────────────────────────────────────────────

        static double KolmioidenAla(IReadOnlyList<LatLon> k, IReadOnlyList<int> t, out double pienin)
        {
            double s = 0;
            pienin = double.MaxValue;
            for (int i = 0; i < t.Count; i += 3)
            {
                LatLon a = k[t[i]], b = k[t[i + 1]], c = k[t[i + 2]];
                double r = ((b.Lon - a.Lon) * (c.Lat - a.Lat) - (b.Lat - a.Lat) * (c.Lon - a.Lon)) / 2;
                pienin = Math.Min(pienin, r);
                s += r;
            }
            return s;
        }

        [Testi] static void KorvanleikkausPeittaaJokaisenJarven()
        {
            foreach (var j in Tulos().Jarvet)
            {
                var rengas = j.Rengas.Take(j.Rengas.Count - 1).ToList();
                double ala = Math.Abs(Jarvikolmiot.Ala(rengas));
                var perus = Jarvikolmiot.Korvat(j.Rengas);
                Oleta.Sama(rengas.Count - 2, perus.Count / 3, j.Nimi + " kolmioita n − 2");
                Lahella(ala, KolmioidenAla(j.Rengas, perus, out var pienin), j.Nimi + " ala", 1e-9);
                Oleta.Tosi(pienin >= 0, j.Nimi + ": kolmio väärin päin");
                // Tihennetty verkko: sama ala, sivut enintään MaxSivu.
                var v = j.Verkko;
                Lahella(ala, KolmioidenAla(v.Karjet, v.Kolmiot, out pienin), j.Nimi + " tihennetty ala", 1e-9);
                Oleta.Tosi(pienin >= 0, j.Nimi + ": tihennetty kolmio väärin päin");
                for (int t = 0; t < v.Kolmiot.Count; t += 3)
                    for (int e = 0; e < 3; e++)
                        Oleta.Tosi(Kameramatikka.KulmaAsteina(v.Karjet[v.Kolmiot[t + e]], v.Karjet[v.Kolmiot[t + (e + 1) % 3]]) <= Jarvikolmiot.MaxSivu + 1e-6,
                            j.Nimi + " sivu yli rajan");
            }
            var kaspia = Tulos().Jarvet.First(j => j.Nimi == "Kaspianmeri");
            Oleta.Tosi(kaspia.Verkko.Jako > 1, "Kaspianmeri tihennetään");
        }

        [Testi] static void KorvanleikkausKoveraJaRappeutunut()
        {
            // L-muoto (kovera), myötäpäivään, kaksoispiste ja suljettu.
            var l = new List<LatLon> { new(0, 0), new(2, 0), new(2, 1), new(1, 1), new(1, 1), new(1, 2), new(0, 2), new(0, 0) };
            var t = Jarvikolmiot.Korvat(l);
            Lahella(3, KolmioidenAla(l, t, out var pienin), "L ala");
            Oleta.Tosi(pienin > 0);
            // Suora "rengas" ja kaksi pistettä: ei kolmioita, ei jumia.
            Oleta.Sama(0, Jarvikolmiot.Korvat(new List<LatLon> { new(0, 0), new(1, 1), new(2, 2), new(0, 0) }).Count);
            Oleta.Sama(0, Jarvikolmiot.Korvat(new List<LatLon> { new(0, 0), new(1, 1) }).Count);
            // Kahdeksikko (itseään leikkaava): päättyy.
            var kasi = new List<LatLon> { new(0, 0), new(1, 1), new(0, 2), new(1, 3), new(0, 3), new(1, 2), new(0, 1), new(1, 0) };
            Oleta.Tosi(Jarvikolmiot.Korvat(kasi).Count <= (kasi.Count - 2) * 3);
        }

        [Testi] static void KolmiointiOnNopea()
        {
            double kylma = Tulos().KestoMs;       // ensimmäinen laskenta (JIT mukana)
            var kello = Stopwatch.StartNew();
            var t = VesistotPallolle.Laske(Aineisto());
            double ms = kello.Elapsed.TotalMilliseconds;
            Oleta.Tosi(ms < 50, $"koko muunnos {ms:F1} ms");
            kello.Restart();
            foreach (var j in t.Jarvet) Jarvikolmiot.Laske(j.Rengas);
            Console.WriteLine($"      vesistöt: muunnos kylmänä {kylma:F1} ms, lämpimänä {ms:F1} ms, järvien kolmiointi {kello.Elapsed.TotalMilliseconds:F1} ms, "
                + $"{t.Jarvet.Sum(j => j.Verkko.Kolmiot.Count / 3)} kolmiota");
        }

        // ── Elinkaari ─────────────────────────────────────────────────────

        sealed class ValeNakyma : IVesistojenNakyma
        {
            public readonly List<string> Loki;
            public ValeNakyma(List<string> loki) { Loki = loki; }
            public void Jarvet(IReadOnlyList<Jarvi> j) => Loki.Add("järvet " + j.Count);
            public void Uomat(IReadOnlyList<Vesipolku> p) => Loki.Add("uomat " + p.Count + " " + p[0].Laji);
            public void Nimet(IReadOnlyList<Vesinimi> n) => Loki.Add("nimet " + n.Count);
            public void Pois() => Loki.Add("vesi pois");
        }

        [Testi] static void AvausTopografianPohjallaJaVesiPaalle()
        {
            var y = new ValeYmparisto();
            var r = new Linssirekisteri(y);
            r.Lisaa(new Topografia());
            var linssi = new VesistotLinssi(Aineisto(), new ValeNakyma(y.Loki), Tulos());
            r.Lisaa(linssi);
            Oleta.Sama("vesistot", r.Kaikki[1].Tiedot.Id, "topografian jälkeen");
            r.Valitse("vesistot");
            Oleta.Sama("peite True", y.Loki[0], "peite ensimmäisenä");
            Oleta.Tosi(y.Vale.Rasterit.ContainsKey(Topografia.Kerros), "reliefi");
            Oleta.Sama(false, y.Vale.Nakyvat["laatat"], "reliefi pohjan tilalla");
            int j = y.Loki.IndexOf("järvet 38"), u = y.Loki.IndexOf("uomat 253 Penger"), n = y.Loki.IndexOf("nimet 20");
            Oleta.Tosi(j > 0 && u > j && n > u, string.Join(" | ", y.Loki));
            y.Kello = Topografia.PortinViive; r.Paivita();
            Oleta.Sama(false, y.PelikerroksetNakyvissa);
            y.Vale.Tilat[Topografia.Kerros] = KerrosTila.Valmis;
            y.Kello = 1; r.Paivita();
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Sama("valmis", linssi.Peite.Syy);
            r.Sulje();
            Oleta.Tosi(y.Loki.IndexOf("vesi pois") < y.Loki.IndexOf("rasteri- topografia"), "vesi pois ennen pohjaa");
            Oleta.Sama(true, y.Vale.Nakyvat["laatat"]);
            Oleta.Tosi(y.PelikerroksetNakyvissa);
            Oleta.Tosi(y.Ajo.HasValue, "kamera palaa");
            Oleta.Tosi(!linssi.Auki);
        }
    }
}
