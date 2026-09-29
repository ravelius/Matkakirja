using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    /// <summary>Omistaja 28.9.2026: "siirtymä paikkojen välillä ei saa kestää yli 5sek" (ylilento, oma sijainti, Palaa LIVE).</summary>
    public static class SiirtymaTestit
    {
        static (Simukello k, Func<double, DateTime> aja) Kello()
        {
            var alku = new DateTime(2026, 9, 28, 12, 0, 0, DateTimeKind.Utc);
            double s = 0;
            var k = new Simukello(() => alku.AddSeconds(s));
            return (k, t => { s = t; return k.Nyt(); });
        }

        [Testi] static void YlilentoPerillaAlle5s()
        {
            foreach (double tunteja in new[] { 0.2, 3, 12, 48 })
            {
                var (k, aja) = Kello();
                var tavoite = k.Nyt().AddHours(tunteja);
                int id = k.KelaaHetkeen(tavoite);
                aja(Simukello.KelausMaxS + 0.01);
                Oleta.Sama(id, k.ValmisId, $"{tunteja} h: kelaus valmis {Simukello.KelausMaxS} s:ssa");
                Oleta.Tosi(Math.Abs((k.Nyt() - tavoite).TotalSeconds) < 1, $"{tunteja} h: perillä");
            }
            Oleta.Tosi(Simukello.KelausMaxS + IssKyyti.KohteeseenS <= Simukello.SiirtymaMaxS, "kelaus + kääntyminen ≤ 5 s");
        }

        [Testi] static void PalaaLiveAlle5s()
        {
            var (k, aja) = Kello();
            k.AsetaNopeus(1000);
            aja(200);   // 200 s × 1000 = 55 h edellä
            k.AsetaNopeus(1);
            aja(200 + Simukello.PaluuMaxS + 0.01);
            Oleta.Tosi(k.Live, "LIVE viimeistään PaluuMaxS:n jälkeen");
            Oleta.Tosi(Simukello.PaluuMaxS <= Simukello.SiirtymaMaxS);
        }
    }
}
