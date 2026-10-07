// KUUMAILMAPALLON KORIN LIIKE (omistaja 7.10.2026 klo 09.1x, Päätoimittaja: korinäkymä kaupunkitilassa, kokeilu Prahassa).
// Kaupunki ja horisontti pysyvät vakaina; vain kori ja köydet (oma overlay-kamera) liikkuvat:
//  - keinunta: jatkuva hiljainen kahden sinin summa (~1°, pääjakso ~5 s), myös orbitin aikana (LS2:n Cupolan Ajelehdi-malli);
//  - jousi: kun pallo kiihtyy eteen/sivulle, kori jää vastasuuntaan (enintään RajaAst) ja palaa keskelle tasaisessa
//    liikkeessä; pysähtyessä hidastuvuus heilauttaa sen pienesti eteen, ja se asettuu (vaimennettu jousi, ominaisjakso JaksoS);
//  - köydet seuraavat koria viiveellä (alipäästö KoysiViiveS).
// Puhdas C# (testit Linssit-testit/Testit/KoriLiikeTestit.cs). Kulmat asteina: Nyokkays (+ = kori kallistuu eteen), Kallistus
// (+ = oikealle). Kiihtyvyys kameran omissa akseleissa (m/s², eteen ja oikealle); pystykiihtyvyys ei heiluta.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class KoriLiike
    {
        public const double KeinuntaAst = 0.7, KeinuntaJaksoS = 5.0, Keinunta2Ast = 0.3, Keinunta2JaksoS = 8.3;
        public const double RajaAst = 2.0, JaksoS = 2.6, Vaimennus = 0.32, KoysiViiveS = 0.35;
        /// <summary>Kiihtyvyyden vaste: kori kallistuu kuin heiluri (atan(a/g)), mutta pehmennettynä tällä kertoimella.</summary>
        public const double Vaste = 0.6;
        const double G = 9.81;

        double t, nyok, nyokV, kall, kallV;
        public double Nyokkays { get; private set; }
        public double Kallistus { get; private set; }
        public double KoysiNyokkays { get; private set; }
        public double KoysiKallistus { get; private set; }
        /// <summary>Vähennetty liike (käyttöjärjestelmän asetus): ei keinuntaa eikä jousta.</summary>
        public bool Vahennetty;

        /// <summary>Askel: dt s, kiihtyvyys eteen ja oikealle (m/s²). Palauttaa korin kulmat (Nyokkays, Kallistus).</summary>
        public (double nyokkays, double kallistus) Paivita(double dt, double kiihtyvyysEteen, double kiihtyvyysOikealle)
        {
            if (dt <= 0) return (Nyokkays, Kallistus);
            dt = Math.Min(dt, 0.1);
            t += dt;
            if (Vahennetty) { nyok = nyokV = kall = kallV = 0; Nyokkays = Kallistus = KoysiNyokkays = KoysiKallistus = 0; return (0, 0); }
            // Heiluri: kiihtyvyys eteen → kori jää taakse (nyökkäys negatiivinen). Tavoite rajataan, jousi vie kohti.
            double tavN = Rajaa(-Vaste * Math.Atan2(kiihtyvyysEteen, G) * 180 / Math.PI, RajaAst);
            double tavK = Rajaa(-Vaste * Math.Atan2(kiihtyvyysOikealle, G) * 180 / Math.PI, RajaAst);
            (nyok, nyokV) = Jousi(nyok, nyokV, tavN, dt);
            (kall, kallV) = Jousi(kall, kallV, tavK, dt);
            double w1 = 2 * Math.PI / KeinuntaJaksoS, w2 = 2 * Math.PI / Keinunta2JaksoS;
            double keinuK = KeinuntaAst * Math.Sin(w1 * t) + Keinunta2Ast * Math.Sin(w2 * t + 1.3);
            double keinuN = 0.6 * KeinuntaAst * Math.Sin(w1 * 0.83 * t + 0.7) + 0.5 * Keinunta2Ast * Math.Sin(w2 * 1.17 * t + 2.1);
            Nyokkays = Rajaa(nyok + keinuN, RajaAst + KeinuntaAst);
            Kallistus = Rajaa(kall + keinuK, RajaAst + KeinuntaAst);
            double a = 1 - Math.Exp(-dt / KoysiViiveS);
            KoysiNyokkays += (Nyokkays - KoysiNyokkays) * a;
            KoysiKallistus += (Kallistus - KoysiKallistus) * a;
            return (Nyokkays, Kallistus);
        }

        /// <summary>Vaimennettu jousi kohti tavoitetta (ominaiskulmataajuus 2π/JaksoS, vaimennussuhde Vaimennus), puoli-implisiittinen.</summary>
        static (double x, double v) Jousi(double x, double v, double tavoite, double dt)
        {
            double w = 2 * Math.PI / JaksoS;
            v += (-w * w * (x - tavoite) - 2 * Vaimennus * w * v) * dt;
            x += v * dt;
            return (Rajaa(x, RajaAst), v);
        }

        static double Rajaa(double x, double r) => Math.Max(-r, Math.Min(r, x));
    }
}
