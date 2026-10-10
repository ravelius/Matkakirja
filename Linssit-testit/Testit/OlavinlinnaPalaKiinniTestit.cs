// KIINNIJÄÄNTI JOKA PISTEESSÄ HUONEISSA 2–4 (Siirtoseppä 10.10.2026, PT): laiturilta Kirkkotornin portaiden yläpäähän (reitti:pelaaja-2…20)
// samat ehdot kuin M-osassa (OlavinlinnaMOsaTestit.KiinniKaikissa). Ajetaan vain OLAVINLINNA_LAAJA=1:llä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaPalaKiinniTestit
    {
        [Testi] static void KiinniJokaPisteessaHuoneet2Ja3Ja4()
        {
            if (Environment.GetEnvironmentVariable("OLAVINLINNA_LAAJA") != "1") { Console.WriteLine("      ohitettu (OLAVINLINNA_LAAJA=1 ajaa)"); return; }
            // Tilat ketjuna huoneittain (kuten AjaHuoneTestit): tilat[k] = tila pisteessä k (0-pohjainen).
            var tilat = new Dictionary<int, Huonesimulaatio>(); var w = Huonesimulaatio.Uusi(); tilat[0] = w.Kopioi();
            foreach (int h in new[] { 2, 3, 4 })
            {
                var r = ThiefAjuri.Huoneet[h]; int seuraava = w.Seuraava > r.Alku && w.Seuraava <= r.Loppu ? w.Seuraava : r.Alku + 1;
                var tulos = ThiefAjuri.AjaHuone(w, h);
                Oleta.Tosi(tulos.Loppu != null, $"huone {h} läpi");
                for (int j = 0; j < tulos.Tilat.Count; j++) tilat[seuraava + j] = tulos.Tilat[j];
                w = tulos.Loppu;
            }
            int loppu = ThiefAjuri.Huoneet[4].Loppu;
            Oleta.Tosi(tilat.ContainsKey(loppu), $"tila pisteessä {loppu + 1}");
            OlavinlinnaMOsaTestit.KiinniKaikissa(k => tilat[k].Kopioi(), 1, loppu);
        }
    }
}
