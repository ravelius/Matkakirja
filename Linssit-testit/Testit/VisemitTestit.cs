// FACEIT (Siirtoseppä 6.10.2026): huulisynkan kohdistus → suumuodot, räpäytys ja kohdistuksen luku molemmista muodoista.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class VisemitTestit
    {
        static Kohdistus K(string merkit, double vali = 0.1)
        {
            var k = new Kohdistus { Merkit = merkit, Alut = new double[merkit.Length], Loput = new double[merkit.Length] };
            for (int i = 0; i < merkit.Length; i++) { k.Alut[i] = i * vali; k.Loput[i] = (i + 1) * vali; }
            return k;
        }

        [Testi] static void VokaalitJaHuulikonsonantit()
        {
            var w = new float[Visemit.Nimet.Length];
            var k = K("ma uo");   // m 0–0,1 · a 0,1–0,2 · ' ' · u 0,3–0,4 · o 0,4–0,5
            Visemit.Laske(k, 0.05, w);
            Oleta.Tosi(w[3] > 0.8f && w[0] < 0.3f, $"m: suu kiinni ({w[3]:F2}), leuka pieni ({w[0]:F2})");
            Visemit.Laske(k, 0.15, w);
            Oleta.Tosi(w[0] >= 0.59f, $"a: leuka auki ({w[0]:F2})");
            Visemit.Laske(k, 0.35, w);
            Oleta.Tosi(w[2] >= 0.89f, $"u: pyöreä ({w[2]:F2})");
            Visemit.Laske(k, 0.45, w);
            Oleta.Tosi(w[1] >= 0.79f, $"o: suppu ({w[1]:F2})");
            Visemit.Laske(k, 2.0, w);
            Oleta.Tosi(Array.TrueForAll(w, x => x == 0f), "puheen jälkeen kiinni");
            Visemit.Laske(k, -0.2, w);
            Oleta.Tosi(Array.TrueForAll(w, x => x == 0f), "ennen puhetta kiinni");
        }

        [Testi] static void NousuJaLaskuPehmeat()
        {
            var w = new float[Visemit.Nimet.Length];
            var k = new Kohdistus { Merkit = "a", Alut = new[] { 1.0 }, Loput = new[] { 1.2 } };
            Visemit.Laske(k, 1.0 - Visemit.NousuS / 2, w);
            Oleta.Tosi(w[0] > 0.25f && w[0] < 0.35f, $"nousun puolivälissä ~0,3 ({w[0]:F2})");
            Visemit.Laske(k, 1.2 + Visemit.LaskuS / 2, w);
            Oleta.Tosi(w[0] > 0.25f && w[0] < 0.35f, $"laskun puolivälissä ~0,3 ({w[0]:F2})");
        }

        [Testi] static void RapaytysHarvaJaLyhyt()
        {
            int kiinni = 0, rapaytyksia = 0; bool oli = false;
            for (double t = 0; t < 60; t += 0.01)
            {
                float r = Visemit.Rapaytys(7, t);
                Oleta.Tosi(r >= 0 && r <= 1, "0–1");
                if (r > 0.5f) kiinni++;
                bool nyt = r > 0;
                if (nyt && !oli) rapaytyksia++;
                oli = nyt;
            }
            Oleta.Tosi(rapaytyksia >= 12 && rapaytyksia <= 16, $"minuutissa ~15 räpäystä ({rapaytyksia})");
            Oleta.Tosi(kiinni < 60 * 100 / 20, "silmät enimmäkseen auki");
            Oleta.Tosi(Visemit.Rapaytys(7, 12.34) == Visemit.Rapaytys(7, 12.34), "toistettava");
        }

        [Testi] static void VoudinFaceitGlbMuodot()
        {
            // Linnanrakentajan FACEIT-malli (_valmiit/linna-hahmot/paa-v1): morph-kohteet luetaan nimineen, z peilataan.
            const string Polku = "/Users/Shared/Claude/proto-3d/_valmiit/linna-hahmot/paa-v1/vouti-faceit.glb";
            if (!System.IO.File.Exists(Polku)) return;
            var m = DioraamaGlb.Lue(System.IO.File.ReadAllBytes(Polku), true);
            var nimet = new HashSet<string>();
            int osia = 0;
            foreach (var s in m.Solmut) foreach (var o in s.Osat) if (o.Muodot.Count > 0) { osia++; foreach (var (n, d) in o.Muodot) { nimet.Add(n); Oleta.Sama(o.Paikat.Length, d.Length); } }
            foreach (var n in Visemit.Nimet) Oleta.Tosi(nimet.Contains(n), "muoto " + n);   // ml. mouthStretchLeft/Right
            Oleta.Tosi(nimet.Contains("eyeBlinkLeft") && nimet.Contains("eyeBlinkRight"), "räpäytysmuodot");
            Oleta.Tosi(osia >= 4, $"muodollisia primitiivejä {osia}");
        }

        [Testi] static void KohdistuksenLukuMolemmistaMuodoista()
        {
            var oma = DioraamaData.LueKohdistus((Dictionary<string, object>)MiniJson.Jasenna("{\"merkit\": \"ab\", \"alut_s\": [0, 0.1], \"loput_s\": [0.1, 0.2]}"));
            Oleta.Sama("ab", oma.Merkit);
            var el = DioraamaData.LueKohdistus((Dictionary<string, object>)MiniJson.Jasenna(
                "{\"characters\": [\"H\", \"e\", \"i\"], \"character_start_times_seconds\": [0, 0.05, 0.1], \"character_end_times_seconds\": [0.05, 0.1, 0.2]}"));
            Oleta.Sama("Hei", el.Merkit);
            Oleta.Tosi(Math.Abs(el.Loput[2] - 0.2) < 1e-9, "loput");
            Oleta.Tosi(DioraamaData.LueKohdistus(null) == null, "puuttuva → null");
        }
    }
}
