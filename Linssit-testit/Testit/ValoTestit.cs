// Aikajanan liekkivalot verkkopelin kultaisia arvoja vasten
// (kultaiset/valot.json, tee-valot.mjs; web js/aikajana-valo.js).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    public static class ValoTestit
    {
        static JsonElement kultainen;
        static JsonElement K()
        {
            if (kultainen.ValueKind == JsonValueKind.Undefined)
                kultainen = JsonDocument.Parse(File.ReadAllText(
                    Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "valot.json"))).RootElement;
            return kultainen;
        }

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-12)
        {
            if (Math.Abs(odotettu - saatu) > tol * Math.Max(1, Math.Abs(odotettu)))
                throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        static double D(JsonElement e, string nimi) => e.GetProperty(nimi).GetDouble();

        static void SamaVari(JsonElement w, Savy c, string mita)
        {
            Oleta.Sama(w[0].GetInt32(), c.R, mita + ".r");
            Oleta.Sama(w[1].GetInt32(), c.G, mita + ".g");
            Oleta.Sama(w[2].GetInt32(), c.B, mita + ".b");
        }

        [Testi] static void VakiotKutenWebissa()
        {
            var v = K().GetProperty("vakiot");
            Oleta.Sama(D(v, "sade"), Liekki.SadePx);
            Oleta.Sama(D(v, "ruutu"), Liekki.RuutuPx);
            Oleta.Sama(v.GetProperty("karkia").GetInt32(), Liekki.Karkia);
            Oleta.Sama(D(v, "hiipuma"), Liekki.HiipumaMs);
            Oleta.Sama(1200.0, Liekki.SyttymaMs);
        }

        [Testi] static void ProfiiliKutenWebissa()
        {
            foreach (var r in K().GetProperty("profiili").EnumerateArray())
            {
                var rr = r.GetProperty("r");
                double x = rr.ValueKind == JsonValueKind.Null ? double.NaN : rr.GetDouble();
                Lahella(D(r, "I"), Liekki.Profiili(x), $"profiili({x})");
            }
            Oleta.Sama(1.0, Liekki.Profiili(0));
            Oleta.Sama(0.0, Liekki.Profiili(1));
        }

        [Testi] static void SiemenArpojaJaKohinaKutenWebissa()
        {
            var k = K();
            foreach (var r in k.GetProperty("siemenet").EnumerateArray())
                Oleta.Sama((uint)r[1].GetDouble(), Liekki.Siemen(r[0].GetDouble()), $"siemen({r[0].GetDouble()})");
            foreach (var r in k.GetProperty("arpojat").EnumerateArray())
            {
                var arpa = Liekki.Arpoja((uint)D(r, "s"));
                int i = 0;
                foreach (var l in r.GetProperty("luvut").EnumerateArray())
                    Oleta.Sama(l.GetDouble(), arpa(), $"arpoja({D(r, "s")})[{i++}]");
            }
            foreach (var r in k.GetProperty("kohina").EnumerateArray())
                Lahella(D(r, "k"), Liekki.Kohina(D(r, "x"), D(r, "s")), $"kohina({D(r, "x")}, {D(r, "s")})");
        }

        [Testi] static void VariaatioKutenWebissa()
        {
            foreach (var r in K().GetProperty("variaatiot").EnumerateArray())
            {
                int n = r.GetProperty("n").GetInt32();
                var v = Liekki.Variaatio(n);
                Oleta.Sama((uint)D(r, "siemen"), v.Siemen, $"siemen {n}");
                Lahella(D(r, "kirkkaus"), v.Kirkkaus, $"kirkkaus {n}");
                Lahella(D(r, "koko"), v.Koko, $"koko {n}");
                Lahella(D(r, "lampo"), v.Lampo, $"lampo {n}");
                Lahella(D(r, "sykeHz"), v.SykeHz, $"sykeHz {n}");
                Lahella(D(r, "sykeVaihe"), v.SykeVaihe, $"sykeVaihe {n}");
                Lahella(D(r, "kohinaSiirto"), v.KohinaSiirto, $"kohinaSiirto {n}");
                var h = r.GetProperty("harmoniat").EnumerateArray().ToList();
                Oleta.Sama(h.Count, v.Harmoniat.Length, $"harmonioita {n}");
                for (int i = 0; i < h.Count; i++)
                {
                    Oleta.Sama(h[i].GetProperty("k").GetInt32(), v.Harmoniat[i].K, $"k {n}/{i}");
                    Lahella(D(h[i], "voima"), v.Harmoniat[i].Voima, $"voima {n}/{i}");
                    Lahella(D(h[i], "vaihe"), v.Harmoniat[i].Vaihe, $"vaihe {n}/{i}");
                    Lahella(D(h[i], "nopeus"), v.Harmoniat[i].Nopeus, $"nopeus {n}/{i}");
                }
            }
        }

        [Testi] static void SyttyminenKutenWebissa()
        {
            foreach (var r in K().GetProperty("syttyma").EnumerateArray())
            {
                double ms = D(r, "ms");
                bool rm = r.GetProperty("rm").GetBoolean();
                var s = Liekki.Syttyminen(ms, rm);
                Lahella(D(r, "koko"), s.Koko, $"koko({ms}, {rm})");
                Lahella(D(r, "kirkkaus"), s.Kirkkaus, $"kirkkaus({ms}, {rm})");
                Oleta.Sama(r.GetProperty("vaihe").GetString(), s.Vaihe.ToString().ToLowerInvariant(), $"vaihe({ms})");
            }
        }

        [Testi] static void SykeJaLiekinSadeKutenWebissa()
        {
            var k = K();
            foreach (var r in k.GetProperty("syke").EnumerateArray())
            {
                var v = Liekki.Variaatio(r.GetProperty("n").GetInt32());
                var s = Liekki.Sykkeen(D(r, "ms"), v);
                Lahella(D(r, "sade"), s.Sade, $"syke.sade n{v.N} {D(r, "ms")}", 1e-11);
                Lahella(D(r, "kirkkaus"), s.Kirkkaus, $"syke.kirkkaus n{v.N} {D(r, "ms")}", 1e-11);
            }
            foreach (var r in k.GetProperty("liekki").EnumerateArray())
            {
                var v = Liekki.Variaatio(r.GetProperty("n").GetInt32());
                double ms = D(r, "ms"), kulma = D(r, "kulma");
                Lahella(D(r, "s"), Liekki.LiekinSade(kulma, ms, v), $"liekinSade n{v.N} {ms} {kulma}", 1e-11);
                Lahella(D(r, "rm"), Liekki.LiekinSade(kulma, ms, v, true), $"liekinSade rm n{v.N} {kulma}", 1e-11);
            }
        }

        /// <summary>Varjostimen reunakaava (LiekinMuoto.Sade) = webin liekinSade kaikilla kulmilla.</summary>
        [Testi] static void VarjostimenMuotoOnSamaKuinLiekinSade()
        {
            foreach (int n in new[] { 0, 1, 5, 17, 30 })
            {
                var v = Liekki.Variaatio(n);
                foreach (double ms in new[] { 0, 16.7, 999, 4321.5, 86_400_000.0 })
                {
                    var m = Liekki.Muoto(ms, v);
                    Oleta.Tosi(m.KohinaAlku >= 0 && m.KohinaAlku < 1, "kohinaAlku 0…1");
                    for (int i = 0; i < 360; i++)
                    {
                        double kulma = i * 2 * Math.PI / 360;
                        Lahella(Liekki.LiekinSade(kulma, ms, v), m.Sade(kulma), $"muoto n{n} {ms} {i}°", 1e-8);
                    }
                }
            }
        }

        [Testi] static void SavytJaPysakitKutenWebissa()
        {
            var k = K();
            foreach (var r in k.GetProperty("savyt").EnumerateArray())
            {
                var s = Liekki.Savyt(D(r, "lampo"));
                SamaVari(r.GetProperty("ydin"), s.Ydin, "ydin");
                SamaVari(r.GetProperty("keski"), s.Keski, "keski");
                SamaVari(r.GetProperty("laita"), s.Laita, "laita");
            }
            foreach (var r in k.GetProperty("pysakit").EnumerateArray())
            {
                var valo = new Liekkivalo(r.GetProperty("n").GetInt32());
                var omat = Liekki.ProfiilinPysakit(valo.Savyt);
                var web = r.GetProperty("pysakit").EnumerateArray().ToList();
                Oleta.Sama(web.Count, omat.Count, "pysäkkejä");
                Oleta.Sama(29, omat.Count);
                for (int i = 0; i < web.Count; i++)
                {
                    Lahella(web[i][0].GetDouble(), omat[i].Paikka, $"pysäkki {i}");
                    Oleta.Sama(web[i][1].GetInt32(), omat[i].Vari.R, $"pysäkki {i} r");
                    Oleta.Sama(web[i][2].GetInt32(), omat[i].Vari.G, $"pysäkki {i} g");
                    Oleta.Sama(web[i][3].GetInt32(), omat[i].Vari.B, $"pysäkki {i} b");
                    Lahella(web[i][4].GetDouble(), omat[i].Alfa, $"pysäkki {i} alfa", 5.1e-5);
                }
            }
        }

        static readonly int[] Lamput = { 0, 3, 7, 12 };
        static readonly (double t, int n, bool palaa, bool nykyinen)[] Tapahtumat =
        {
            (1000, 0, true, true), (4000, 0, true, false), (4000, 3, true, true), (4500, 7, true, false),
            (6000, 3, true, false), (6000, 12, true, true), (6200, 0, false, false), (9000, 12, true, true),
            (9500, 0, true, false),
        };

        /// <summary>Sama tapahtumasarja kuin tee-valot.mjs: tilat, syttymä, hiipumä, vedot ja liekin reuna.</summary>
        static void Piirto(string avain, bool vahennetty)
        {
            var valot = Lamput.ToDictionary(n => n, n => new Liekkivalo(n));
            int seuraava = 0;
            int piirtoja = 0;
            foreach (var r in K().GetProperty(avain).EnumerateArray())
            {
                double t = D(r, "t");
                int n = r.GetProperty("n").GetInt32();
                while (seuraava < Tapahtumat.Length && Tapahtumat[seuraava].t <= t)
                {
                    var e = Tapahtumat[seuraava++];
                    valot[e.n].AsetaTila(e.palaa, e.nykyinen, false, e.t);
                }
                var valo = valot[n];
                string mita = $"{avain} t{t} n{n}";
                Oleta.Sama(r.GetProperty("palaa").GetBoolean(), valo.Palaa, mita + " palaa");
                Oleta.Sama(r.GetProperty("nykyinen").GetBoolean(), valo.Nykyinen, mita + " nykyinen");
                Oleta.Sama(D(r, "alkoi"), valo.Alkoi, mita + " alkoi");
                Oleta.Sama(D(r, "sammui"), valo.Sammui ?? 0, mita + " sammui");

                var kuva = valo.Laske(t, vahennetty);
                var vedot = r.GetProperty("vedot").EnumerateArray().ToList();
                Oleta.Sama(vedot.Count > 0, kuva.Nakyy, mita + " näkyy");
                if (!kuva.Nakyy) continue;
                piirtoja++;
                Oleta.Sama(3, vedot.Count, mita + " vetoja");
                var omat = new[] { kuva.Hanta, kuva.Runko, kuva.Ydin };
                for (int i = 0; i < 3; i++)
                {
                    Lahella(D(vedot[i], "r"), omat[i].sade, $"{mita} veto {i} säde", 1e-11);
                    Lahella(D(vedot[i], "alfa"), omat[i].alfa, $"{mita} veto {i} alfa", 1e-11);
                    Oleta.Sama("lighter", vedot[i].GetProperty("tapa").GetString());
                    Lahella(Liekki.RuutuPx / 2, D(vedot[i], "keski"), $"{mita} veto {i} keski", 1e-12);
                }
                // Liekkimaskin kärjet (joka neljäs): keski + (cos, sin) · maski · liekinSade(kulma, ikä).
                var muoto = valo.Muoto(t, vahennetty);
                int j = 0;
                foreach (var p in r.GetProperty("polku").EnumerateArray())
                {
                    int karki = j++ * 4;
                    double kulma = (double)karki / Liekki.Karkia * Math.PI * 2;
                    double rr = kuva.Maski * Liekki.LiekinSade(kulma, kuva.IkaMs, valo.Variaatio, vahennetty);
                    Lahella(p[0].GetDouble(), Liekki.RuutuPx / 2 + Math.Cos(kulma) * rr, $"{mita} kärki {karki} x", 1e-11);
                    Lahella(p[1].GetDouble(), Liekki.RuutuPx / 2 + Math.Sin(kulma) * rr, $"{mita} kärki {karki} y", 1e-11);
                    // Varjostimen kaava samaan pisteeseen (kulma 2π on sauma: web sulkee monikulmion).
                    if (karki < Liekki.Karkia)
                        Lahella(rr, kuva.Maski * muoto.Sade(kulma), $"{mita} varjostimen reuna {karki}", 1e-8);
                }
                Oleta.Sama(13, j, mita + " kärkiä");
            }
            Oleta.Tosi(piirtoja > 20, $"{avain}: piirtoja {piirtoja}");
        }

        [Testi] static void PiirtoKutenWebissa() => Piirto("piirto", false);
        [Testi] static void PiirtoVahennetyllaLiikkeellaKutenWebissa() => Piirto("piirtoRm", true);

        [Testi] static void SyttymaHiipumaJaTuleva()
        {
            var valo = new Liekkivalo(5);
            Oleta.Tosi(!valo.Laske(0).Nakyy, "sammunut ei näy");
            valo.AsetaVaihe(ValonVaihe.Nykyinen, 1000);
            var alku = valo.Laske(1150);
            Oleta.Sama(SyttymanVaihe.Hehku, alku.Vaihe);
            Oleta.Tosi(alku.Sade < 0.4 * Liekki.RuutuPx / 2 * 1.3, "hehku on pieni");
            Oleta.Sama(SyttymanVaihe.Palaa, valo.Laske(2300).Vaihe);
            // Uudelleen nykyiseksi ei aloita syttymistä alusta.
            valo.AsetaVaihe(ValonVaihe.Nykyinen, 3000);
            Oleta.Sama(1000.0, valo.Alkoi);
            valo.AsetaVaihe(ValonVaihe.Palaa, 4000);
            Oleta.Sama(4000.0, valo.Sammui ?? -1);
            Lahella(0.5, valo.Laske(4800).Hiipuma, "hiipuma puolivälissä");
            Oleta.Sama(1.0, valo.Laske(6000).Hiipuma);
            // Selauksen tuleva: kutistettu ja himmennetty, mutta palaa.
            valo.AsetaVaihe(ValonVaihe.Tuleva, 7000);
            var tuleva = valo.Laske(7100);
            Oleta.Tosi(tuleva.Nakyy, "tuleva näkyy");
            Oleta.Sama(Liekki.TulevanKoko, tuleva.Skaala);
            Oleta.Sama(Liekki.TulevanPeitto, tuleva.Peitto);
            Lahella(Liekki.RuutuPx / 2 * Liekki.TulevanKoko, tuleva.Laatikko, "tulevan laatikko");
            valo.AsetaVaihe(ValonVaihe.Sammunut, 8000);
            Oleta.Tosi(!valo.Laske(8100).Nakyy, "sammutettu");
            Oleta.Tosi(!valo.Tuleva, "sammunut ei ole tuleva");
            valo.AsetaVaihe(ValonVaihe.Palaa, 9000);
            Oleta.Sama(9000.0, valo.Alkoi);
            valo.Alusta();
            Oleta.Tosi(!valo.Palaa && !valo.Sammui.HasValue, "alusta");
        }
    }
}
