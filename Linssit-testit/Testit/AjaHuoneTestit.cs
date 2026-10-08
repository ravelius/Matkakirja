// YHTEINEN LÄPIPELUURAJAPINTA (Linssiseppä 2 Linssisepälle, 8.10.2026): ThiefAjuri.AjaHuone(w, huone) pelattavuusmallin huonerajoin.
// Huoneet ketjutetaan (pala 2 → 3 → 4, M 6 → 7 → 8): jokainen pääsee loppuunsa ilman kiinnijääntiä, ja jokainen rajapiste on turvallinen
// (pelaaja reittipisteessä, ThiefAjuri.Turvallinen: mittari < 0,15, ei epäilyä eikä hälytystä, ei tutkimista pelaajan luota; muualla
// tutkiva hahmo kirjataan), jotta läpipeluuajuri voi aloittaa huoneen rajalta.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class AjaHuoneTestit
    {
        static void Ketju(Huonesimulaatio w, params int[] huoneet)
        {
            foreach (int h in huoneet)
            {
                var r = ThiefAjuri.Huoneet[h]; double t0 = w.T; int kiinni0 = w.Kiinni;
                var tulos = ThiefAjuri.AjaHuone(w, h);
                if (tulos.Loppu == null) { Console.WriteLine($"      huone {h}: jumissa pisteessä {tulos.Pisin + 1}"); ThiefAjuri.Tulosta(tulos.PisinTila); }
                Oleta.Tosi(tulos.Loppu != null, $"huone {h}: pelaaja-{r.Alku + 1} → -{r.Loppu + 1} läpi");
                w = tulos.Loppu;
                var p = Huonesimulaatio.Reitti[r.Loppu];
                Oleta.Tosi(Huonesimulaatio.Etaisyys3(w.PX, w.PY, w.PZ, p.X, p.Y, p.Z) < 0.1 && w.Kiinni == kiinni0, $"huone {h}: rajapisteessä ilman kiinnijääntiä");
                string muualla = "";
                foreach (var x in w.Hahmot)
                    if (x.Aktiivinen && x.Aivot.Tila != VartijanTila.Partio && x.Aivot.Tila != VartijanTila.Paluu) muualla += $", {x.Nimi} {x.Aivot.Tila} {Huonesimulaatio.Etaisyys2(x.Aivot.EpailyX, x.Aivot.EpailyZ, w.PX, w.PZ):F0} m pelaajasta";
                Console.WriteLine($"      huone {h}: pelaaja-{r.Alku + 1} → -{r.Loppu + 1} {w.T - t0:F0} s{muualla}");
                Oleta.Tosi(ThiefAjuri.Turvallinen(w, kiinni0), $"huone {h}: rajapiste turvallinen{muualla}");
            }
        }

        [Testi] static void PalanHuoneet2Ja3Ja4Ketjuna() => Ketju(Huonesimulaatio.Uusi(), 2, 3, 4);

        [Testi] static void MOsanHuoneet6Ja7Ja8Ketjuna() => Ketju(Huonesimulaatio.UusiM(), 6, 7, 8);

        [Testi] static void EiKavelyhuoneHylataan()
        {
            foreach (int h in new[] { 1, 5, 9, 10 })
            {
                bool hylatty = false;
                try { ThiefAjuri.AjaHuone(Huonesimulaatio.Uusi(), h); } catch (ArgumentOutOfRangeException) { hylatty = true; }
                Oleta.Tosi(hylatty, $"huone {h} hylätään");
            }
        }
    }
}
