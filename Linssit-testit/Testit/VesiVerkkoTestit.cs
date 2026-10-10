// OMA VESIPINTA (Linssiseppä 2, 8.10.2026; omistaja 20.2x B): Karttasepän vesiverkon muoto (ote vesi-tukholma-16m:stä, 4 palaa):
// koot ja indeksit kunnossa, kolmiot CCW ylhäältä ENU:ssa → Unityyn käännettyinä CW, kärjet palan bbox:ssa, rannan alfa, palavalinta.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Ilmakeha;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class VesiVerkkoTestit
    {
        static string K(string n) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n);

        public static VesiVerkko Lue(string nimi)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(K(nimi + ".json"))));
            var palat = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "palat")).Select(MiniJson.Objekti).Select(p =>
            {
                double[] L(string k) => MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(p, k)).Select(Convert.ToDouble).ToArray();
                var ka = L("karjet"); var ix = L("indeksit"); var b = L("bbox");
                return new VesiVerkko.Pala { K0 = (int)ka[0], Kn = (int)ka[1], I0 = (int)ix[0], In = (int)ix[1], MinE = b[0], MinN = b[1], MinU = b[2], MaxE = b[3], MaxN = b[4], MaxU = b[5] };
            }).ToArray();
            return new VesiVerkko(File.ReadAllBytes(K(nimi + ".bytes")), (int)MiniJson.Luku(j, "karkia"), (int)MiniJson.Luku(j, "indekseja"), palat);
        }

        [Testi] static void MuotoJaIndeksit()
        {
            var v = Lue("vesi-tukholma-16m-ote");
            Oleta.Tosi(v.Palat.Length == 4 && v.Indekseja % 3 == 0, $"palat {v.Palat.Length}, indeksejä {v.Indekseja}");
            foreach (var p in v.Palat)
                for (int i = 0; i < p.In; i++) { int ix = v.Indeksi(p.I0 + i); Oleta.Tosi(ix >= 0 && ix < p.Kn, $"indeksi {ix} palan sisällä (< {p.Kn})"); if (ix < 0 || ix >= p.Kn) return; }
            foreach (var p in v.Palat)
                for (int i = 0; i < p.Kn; i++)
                {
                    var k = v.Karki(p.K0 + i);
                    bool sisalla = k.E >= p.MinE - 0.01 && k.E <= p.MaxE + 0.01 && k.N >= p.MinN - 0.01 && k.N <= p.MaxN + 0.01 && k.U >= p.MinU - 0.01 && k.U <= p.MaxU + 0.01;
                    if (!sisalla) { Oleta.Tosi(false, $"kärki {k} bbox:n ulkopuolella"); return; }
                    if (k.D < 0 || k.D > 30) { Oleta.Tosi(false, $"rantaetäisyys {k.D}"); return; }
                }
        }

        [Testi] static void IndeksiV5EnsinJaPaluuV4()
        {
            // Karttaseppä 9.10.: v5 = Tukholmaan kauko2 48 m 20–40 km, Pariisin 16 m 40 km:iin; v4 ja vanhemmat varalla (Natiivisepän ehto 4).
            Oleta.Tosi(string.Join(",", VesiIndeksi.Nimet) == "index-v6.json,index-v5.json,index-v4.json,index-v3.json,index-v2.json,index.json", "v6 → v5 → v4 → v3 → v2 → index");
            Oleta.Tosi(VesiIndeksi.Ensimmainen(n => n == "index-v6.json" || n == "index-v5.json" ? null : n == "index-v4.json" ? "v4" : "vanha") == "v4", "v6 ja v5 puuttuvat → v4");
            Oleta.Tosi(VesiIndeksi.Ensimmainen(n => n == "index-v6.json" ? null : n == "index-v5.json" ? "v5" : "vanha") == "v5", "v6 puuttuu (vanha ämpäri) → v5");
            Oleta.Tosi(VesiIndeksi.Ensimmainen(n => "x" + n) == "xindex-v6.json", "v6 ensin");
            string s = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiVesi.cs"));
            Oleta.Tosi(s.Contains("foreach (var nimi in VesiIndeksi.Nimet)"), "KaupunkiVesi käy VesiIndeksi.Nimet");
        }

        [Testi] static void TasotTarkkuuksista()
        {
            var (t, r) = VesiIndeksi.Tasot(new[] { "6m", "16m", "48m" });
            Oleta.Tosi(t.Length == 3 && t[2].Ruutu == "48m" && t[2].Taso == 2 && r == VesiIndeksi.KaukoM, $"Tukholma v5: 3 tasoa, kauko {r}");
            (t, r) = VesiIndeksi.Tasot(new[] { "6m", "16m" });
            Oleta.Tosi(t.Length == 2 && r == VesiIndeksi.KaukoM2, $"Pariisi v5: 16 m 40 km:iin, kauko {r}");
            (t, r) = VesiIndeksi.Tasot(null);
            Oleta.Tosi(t.Length == 2 && r == VesiIndeksi.KaukoM, $"v4: ennallaan, kauko {r}");
        }

        [Testi] static void KolmiotUnityssaMyotapaivaanYlhaalta()
        {
            var v = Lue("vesi-tukholma-16m-ote"); int cw = 0, ccw = 0;
            var p = new List<(float X, float Y, float Z)>(); var r = new List<float>(); var t = new List<int>();
            for (int i = 0; i < v.Palat.Length; i++) v.Unityyn(i, 0.4, p, r, t);
            for (int i = 0; i < t.Count; i += 3)
            {
                var a = p[t[i]]; var b = p[t[i + 1]]; var c = p[t[i + 2]];
                // Unityn normaali = (b − a) × (c − a); y > 0 = ylöspäin näkyvä etupuoli (vasenkätinen: myötäpäivään ylhäältä).
                double ny = (b.Z - a.Z) * (c.X - a.X) - (b.X - a.X) * (c.Z - a.Z);
                if (ny > 1e-6) cw++; else if (ny < -1e-6) ccw++;
            }
            Console.WriteLine($"      kolmioita {t.Count / 3}: ylös {cw}, alas {ccw}");
            Oleta.Tosi(cw > 0.99 * (cw + ccw), $"etupuoli ylöspäin ({cw}/{cw + ccw})");
            Oleta.Tosi(p.All(x => Math.Abs(x.Y - (23.2f + 0.4f)) < 25f), "nosto lisätty (vesitaso ≈ geoidi 23,2 m + 0,4)");
        }

        [Testi] static void KorkeusKarjessaJaVedenUlkopuolella()
        {
            var v = Lue("vesi-tukholma-16m-ote"); var p = v.Palat[0];
            var k = v.Karki(p.K0 + v.Indeksi(p.I0));
            Oleta.Tosi(v.Korkeus(k.E, k.N, out var u) && Math.Abs(u - k.U) < 1e-3, $"kärjessä korkeus {u:F3} = {k.U:F3}");
            var a = v.Karki(p.K0 + v.Indeksi(p.I0)); var b = v.Karki(p.K0 + v.Indeksi(p.I0 + 1)); var c = v.Karki(p.K0 + v.Indeksi(p.I0 + 2));
            Oleta.Tosi(v.Korkeus((a.E + b.E + c.E) / 3, (a.N + b.N + c.N) / 3, out var uk) && Math.Abs(uk - (a.U + b.U + c.U) / 3) < 1e-3, "kolmion keskellä keskiarvo");
            Oleta.Tosi(!v.Korkeus(p.MinE - 5000, p.MinN - 5000, out _), "vedestä kaukana ei korkeutta");
        }

        [Testi] static void RantaAlfaJaValinta()
        {
            Oleta.Sama(0.0, VesiVerkko.RantaAlfa(0), "rannalla 0"); Oleta.Sama(1.0, VesiVerkko.RantaAlfa(3), "3 m:n päässä 1");
            Oleta.Tosi(Math.Abs(VesiVerkko.RantaAlfa(1.5) - 0.5) < 1e-9, "puolivälissä 0,5");
            var v = Lue("vesi-tukholma-16m-ote");
            var lahi = v.Valitse(0, 0, 0, 1500); var kauka = v.Valitse(0, 0, 1500, 1e9);
            Oleta.Tosi(lahi.Count + kauka.Count == v.Palat.Length && lahi.Count > 0, $"lähi {lahi.Count} + kauka {kauka.Count} = {v.Palat.Length}");
        }
    }
}
