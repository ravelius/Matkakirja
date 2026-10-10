// REITTIHAHMON KULKU (Siirtoseppä 10.10.2026, PT erä 3): Ytimen ReittiKulku, jota DioraamaHahmot (2D) ja DioraamaHahmot3D käyttävät.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Testit
{
    public static class ReittiKulkuTestit
    {
        // L-reitti 3 m + 4 m, 1 m/s, tauko 2 s: meno 7 s, tauko 2 s, paluu 7 s, tauko 2 s = kierto 18 s.
        static ReittiKulku L() => new ReittiKulku(new Reitti { Pisteet = new List<V3> { new V3(0, 0, 0), new V3(3, 0, 0), new V3(3, 0, 4) }, Nopeus = 1, Tauko = 2 });

        static void Lahella(V3 a, V3 b, string mita) => Oleta.Tosi((a - b).Pituus < 1e-9, $"{mita}: ({a.X}, {a.Y}, {a.Z}) ≠ ({b.X}, {b.Y}, {b.Z})");

        [Testi] static void MenoTaukoJaPaluu()
        {
            var k = L();
            Oleta.Tosi(Math.Abs(k.Matka - 7) < 1e-9 && Math.Abs(k.KulkuS - 7) < 1e-9 && Math.Abs(k.Kierto - 18) < 1e-9, $"matka {k.Matka}, kulku {k.KulkuS}, kierto {k.Kierto}");
            var (p, s, tauko) = k.Paikka(0, 0); Lahella(p, new V3(0, 0, 0), "alku"); Lahella(s, new V3(3, 0, 0), "alun suunta"); Oleta.Tosi(tauko < 0, "liikkeellä");
            (p, s, tauko) = k.Paikka(5, 0); Lahella(p, new V3(3, 0, 2), "5 s"); Lahella(s, new V3(0, 0, 4), "5 s suunta");
            (p, s, tauko) = k.Paikka(7.5, 0); Lahella(p, new V3(3, 0, 4), "päätetauko"); Lahella(s, new V3(0, 0, 4), "päätetauon suunta = menosuunta"); Oleta.Tosi(Math.Abs(tauko - 0.5) < 1e-9, $"taukoaika {tauko}");
            (p, s, tauko) = k.Paikka(10, 0); Lahella(p, new V3(3, 0, 3), "paluu 1 s"); Lahella(s, new V3(0, 0, -4), "paluusuunta"); Oleta.Tosi(tauko < 0, "paluu liikkeellä");
            (p, s, tauko) = k.Paikka(17, 0); Lahella(p, new V3(0, 0, 0), "lähtötauko"); Lahella(s, new V3(-3, 0, 0), "lähtötauon suunta = paluusuunta"); Oleta.Tosi(Math.Abs(tauko - 1) < 1e-9, $"lähtötauko {tauko}");
            (p, _, _) = k.Paikka(18 + 5, 0); Lahella(p, new V3(3, 0, 2), "toinen kierros");
        }

        [Testi] static void VaiheSiirtaaKierrosta()
        {
            var k = L();
            for (double t = 0; t < 36; t += 0.7) Lahella(k.Paikka(t, 0.5).Paikka, k.Paikka(t + 9, 0).Paikka, $"vaihe 0,5 = +9 s (t {t})");
        }

        [Testi] static void Reunatapaukset()
        {
            var tyhja = new ReittiKulku(new Reitti());
            Oleta.Tosi(tyhja.Matka == 0 && tyhja.Paikka(3, 0).Taukoaika < 0, "tyhjä reitti");
            var yksi = new ReittiKulku(new Reitti { Pisteet = new List<V3> { new V3(1, 2, 3) }, Tauko = 1 });
            Lahella(yksi.Paikka(5, 0.3).Paikka, new V3(1, 2, 3), "yksi piste paikallaan");
            var nolla = new ReittiKulku(new Reitti { Pisteet = new List<V3> { new V3(0, 0, 0), new V3(2, 0, 0) }, Nopeus = 0 });
            Oleta.Tosi(Math.Abs(nolla.Nopeus - 1) < 1e-9 && Math.Abs(nolla.KulkuS - 2) < 1e-9, "nopeus 0 → 1 m/s");
            Lahella(nolla.Paikka(-1, 0).Paikka, new V3(1, 0, 0), "negatiivinen aika kiertää (−1 s = paluu 1 s)");
        }

        [Testi] static void VaiheYksikkoDeterministinen()
        {
            Oleta.Tosi(ReittiKulku.VaiheYksikko(null) == 0 && ReittiKulku.VaiheYksikko("") == 0, "tyhjä = 0");
            foreach (var id in new[] { "renki", "vesipoika", "vartija:reitti" })
            {
                double v = ReittiKulku.VaiheYksikko(id);
                Oleta.Tosi(v >= 0 && v < 1 && v == ReittiKulku.VaiheYksikko(id), $"{id}: {v}");
            }
            Oleta.Tosi(ReittiKulku.VaiheYksikko("renki") != ReittiKulku.VaiheYksikko("renki:reitti"), "suola muuttaa vaihetta");
        }
    }
}
