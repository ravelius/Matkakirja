// ESITTELYN VAIHEET NYKYASUN PAKETISTA (Siirtoseppä 10.10.2026, juna 176; PT 11.3x): esittely ladataan nykyasun paketista
// (PelattavaPala.EsittelyHash, kultaiset olavinlinna-<EsittelyVersio>-*.json), jonka kuoressa tornien 1790-luvun korotukset ja
// kartiot ovat valmiina. LR:n vuosileikkaukset (ranta-1499: n1790-*, b1499-*; merkit leikkaus:vain-1499*) piilottavat ne
// Historiajana.Esittelyn vaiheissa ennen vuottaan ja kasvattavat näkyviin sen jälkeen (SeikkailuHistoria → SeikkailuKavely.AsetaKasvu).
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class EsittelyVuosileikkauksetTestit
    {
        const int LeikkauksiaMax = 48;   // SeikkailuKavely.LeikkauksiaMax (Unity) = DioraamaKuori.shaderin taulukko

        static KavelyData Data()
        {
            string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n));
            return KavelyData.Lue(Lue("olavinlinna-" + PelattavaPala.EsittelyVersio + "-osat.json"), Lue("olavinlinna-" + PelattavaPala.EsittelyVersio + "-merkit.json"));
        }

        static (HashSet<string> Aina, List<HistoriaOsa> Osat, List<KavelyLeikkaus> Kaikki) Lue()
        {
            var d = Data(); var aina = new HashSet<string>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("leikkaus")) if (m.Tunnus.StartsWith("vain-1499", StringComparison.Ordinal) && m.Leikkaukset != null) foreach (var n in m.Leikkaukset) if (n != null) aina.Add(n);
            var l = new List<(string, double?, double?)>(); var kaikki = new List<KavelyLeikkaus>();
            foreach (var o in d.Osat.Values) foreach (var k in o.Leikkaukset) { l.Add((k.Nimi, k.HistoriaVuodesta, k.HistoriaVuoteen)); kaikki.Add(k); }
            return (aina, Historiajana.OsatDatasta(l), kaikki);
        }

        [Testi] static void KartiotPiilossaEnnen1790()
        {
            var (aina, osat, _) = Lue(); var jana = Historiajana.Esittely;
            var n1790 = new[] { "n1790-kellotorni", "n1790-kirkkotorni", "n1790-kijlin-torni" };
            foreach (var n in n1790)
            {
                Oleta.Tosi(aina.Contains(n), $"{n} vain-1499-listalla (leikataan aina, kasvu ratkaisee)");
                var osa = Historiajana.Osa(n, osat);
                Oleta.Tosi(osa != null && osa.Vuodesta == 1790, $"{n}: vuodesta 1790 ({osa?.Vuodesta})");
                for (double t = 0; t <= jana.Kesto; t += 0.25)
                {
                    double v = jana.Vuosi(t), g = Historiajana.Kasvu(v, osa);
                    if (v < 1790) Oleta.Tosi(g == 0, $"{n}: piilossa {v:F0} ({t:F2} s, kasvu {g:F2})");
                }
                Oleta.Sama(1.0, Historiajana.Kasvu(jana.Vuosi(jana.Kesto), osa), $"{n}: nykyasussa näkyvissä");
            }
            double alku = -1; for (double t = 0; t <= jana.Kesto && alku < 0; t += 0.25) if (jana.Vuosi(t) >= 1790) alku = t;
            Console.WriteLine($"      {PelattavaPala.EsittelyVersio}: kartiot alkavat kasvaa {alku:F2} s (kesto {jana.Kesto:F0} s), aina-leikkauksia {aina.Count}");
        }

        [Testi] static void MyohemmatRakenteetPiilossaVaiheissa1475Ja1499()
        {
            var (aina, osat, kaikki) = Lue();
            int vuodelliset = 0;
            foreach (var k in kaikki)
            {
                var osa = k.HistoriaVuodesta != null ? Historiajana.Osa(k.Nimi, osat) : null;
                if (osa == null || !aina.Contains(k.Nimi)) continue;
                vuodelliset++;
                foreach (double v in new[] { 1475.0, 1499 }) Oleta.Sama(0.0, Historiajana.Kasvu(v, osa), $"{k.Nimi} ({osa.Vuodesta}) piilossa {v}");
                Oleta.Sama(1.0, Historiajana.Kasvu(Historiajana.Esittely.LoppuVuosi, osa), $"{k.Nimi} nykyasussa");
            }
            Oleta.Tosi(vuodelliset >= 10, $"vuodellisia aina-leikkauksia {vuodelliset}");
        }

        [Testi] static void VuosileikkauksetMahtuvatVarjostimeen()
        {
            // Historiassa (VainVuosileikkaukset) kuori saa vain aina- ja vuosileikkaukset; ne ohittavat muut järjestyksessä.
            var (aina, _, kaikki) = Lue(); int n = 0;
            foreach (var k in kaikki) if (aina.Contains(k.Nimi) || k.HistoriaVuodesta != null || k.HistoriaVuoteen != null) n++;
            Oleta.Tosi(n <= LeikkauksiaMax - 4, $"esittelyn vuosileikkauksia {n} ≤ {LeikkauksiaMax} − 4 (vaiheiden omat ja rakentuminen)");
        }
    }
}
