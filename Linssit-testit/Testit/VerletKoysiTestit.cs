// PALLON KÖYSI (Linssiseppä 8.10.2026): päät kiinni, levossa vain pieni notkahdus, kiihdytys taivuttaa ja värähtely vaimenee.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class VerletKoysiTestit
    {
        [Testi] static void KoysiTaipuuJaVaimenee()
        {
            var k = new VerletKoysi(3.0); const double dt = 1 / 60.0;
            for (int i = 0; i < 300; i++) k.Paivita(dt, 0, 0);
            Oleta.Tosi(k.SuurinPoikkeama < 0.02, $"levossa poikittain {k.SuurinPoikkeama:F3} m");
            for (int i = 0; i < 30; i++) k.Paivita(dt, 2.5, 0);   // 0,5 s kiihdytys
            double taipuma = k.SuurinPoikkeama;
            Oleta.Tosi(taipuma > 0.03 && taipuma < 0.5, $"kiihdytys taivuttaa {taipuma:F3} m");
            Oleta.Tosi(k.Poikkeama(0).x == 0 && k.Poikkeama(1).x == 0, "päät kiinni");
            Oleta.Tosi(k.Poikkeama(0.5).x < 0, "hitausvoima vastakkain kiihtyvyyttä");
            for (int i = 0; i < 300; i++) k.Paivita(dt, 0, 0);
            Oleta.Tosi(k.SuurinPoikkeama < 0.25 * taipuma, $"värähtely vaimenee 5 s:ssa ({k.SuurinPoikkeama:F3} m)");
        }
    }
}
