// PALLON SÄÄTEHOSTEIDEN PAINOT (omistaja 8.10.2026, Päätoimittaja: kevyet tehosteet ensin, A/B COZYllä myöhemmin; juna 166).
// Saatila.Saa (+ PalloSaaTiedot LIVEssä) → painot 0–1: harmaus (valaistus ja horisontti), sumu, sade, lumi ja ukkonen. Painot
// liukuvat SiirtymaS:ssa (ei hyppyä säätä vaihdettaessa). Ukkosella salama (kaksoisvälähdys) SalamaVali-välein ja kumahdus
// KumahdusViive:n jälkeen (kirjastoääni, Pelikoodari). Puhdas ydin; Unity-puoli: KaupunkiKuva (sävy ja sumu) ja PalloSaaKerros.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public struct SaaPainot
    {
        public double Harmaus, Sumu, Sade, Lumi, Ukkonen;
        public bool Tyhja => Harmaus < 0.005 && Sumu < 0.005 && Sade < 0.005 && Lumi < 0.005 && Ukkonen < 0.005;
    }

    public sealed class PalloSaaVaikutus
    {
        public const double SiirtymaS = 2.5;
        public const double SalamaValiMinS = 8, SalamaValiMaxS = 20, KumahdusViiveMinS = 0.5, KumahdusViiveMaxS = 3;

        static double C(double x) => Math.Max(0, Math.Min(1, x));

        /// <summary>Tavoitepainot säästä; hienosäätö LIVEn tiedoista (null = käsivalinnan oletukset).</summary>
        public static SaaPainot Tavoite(PalloSaa s, PalloSaaTiedot t) => s switch
        {
            PalloSaa.Pilvinen => new SaaPainot { Harmaus = t != null ? 0.45 + 0.35 * C((t.PilvisyysPct - 70) / 30) : 0.6, Sumu = 0.15 },
            PalloSaa.Sade => new SaaPainot { Harmaus = 0.75, Sumu = 0.35, Sade = t != null ? C(0.35 + t.SadeMmH / 4) : 0.6 },
            PalloSaa.Lumi => new SaaPainot { Harmaus = 0.5, Sumu = 0.4, Lumi = 0.7 },
            PalloSaa.Sumu => new SaaPainot { Harmaus = 0.6, Sumu = t != null ? Math.Max(0.8, C(t.SumuPct / 100)) : 0.85 },
            PalloSaa.Ukkonen => new SaaPainot { Harmaus = 1, Sumu = 0.4, Sade = 0.9, Ukkonen = 1 },
            _ => default,   // Pois, Selkea
        };

        public SaaPainot Nyt;
        /// <summary>Salaman kirkkaus 0–1 tällä hetkellä.</summary>
        public double Salama { get; private set; }
        /// <summary>Tässä päivityksessä pitää soittaa kumahdus (yhden kerran).</summary>
        public bool Kumahdus { get; private set; }

        readonly Random rnd;
        double seuraavaSalama = -1, salamaAika = -1, kumahdusAika = -1;
        public PalloSaaVaikutus(int siemen = 0) { rnd = siemen == 0 ? new Random() : new Random(siemen); }

        double Lahesty(double nyt, double tavoite, double dt)
        {
            double askel = Math.Max(0, dt) / SiirtymaS;
            return nyt < tavoite ? Math.Min(tavoite, nyt + askel) : Math.Max(tavoite, nyt - askel);
        }

        public void Paivita(double dt, PalloSaa s, PalloSaaTiedot t) => Paivita(dt, s, t, default);

        /// <summary>Kuten Paivita, ja lisäpainot (PalloKuurot) sekoitetaan tavoitteeseen suurimpana.</summary>
        public void Paivita(double dt, PalloSaa s, PalloSaaTiedot t, SaaPainot lisa)
        {
            var g = Tavoite(s, t);
            g = new SaaPainot { Harmaus = Math.Max(g.Harmaus, lisa.Harmaus), Sumu = Math.Max(g.Sumu, lisa.Sumu), Sade = Math.Max(g.Sade, lisa.Sade), Lumi = Math.Max(g.Lumi, lisa.Lumi), Ukkonen = Math.Max(g.Ukkonen, lisa.Ukkonen) };
            Nyt = new SaaPainot
            {
                Harmaus = Lahesty(Nyt.Harmaus, g.Harmaus, dt), Sumu = Lahesty(Nyt.Sumu, g.Sumu, dt), Sade = Lahesty(Nyt.Sade, g.Sade, dt),
                Lumi = Lahesty(Nyt.Lumi, g.Lumi, dt), Ukkonen = Lahesty(Nyt.Ukkonen, g.Ukkonen, dt),
            };
            Kumahdus = false;
            if (Nyt.Ukkonen < 0.5) { seuraavaSalama = -1; salamaAika = -1; kumahdusAika = -1; Salama = 0; return; }
            if (seuraavaSalama < 0) seuraavaSalama = SalamaValiMinS * 0.5 + rnd.NextDouble() * (SalamaValiMaxS - SalamaValiMinS) * 0.5;
            seuraavaSalama -= dt;
            if (seuraavaSalama <= 0)
            {
                salamaAika = 0; seuraavaSalama = SalamaValiMinS + rnd.NextDouble() * (SalamaValiMaxS - SalamaValiMinS);
                kumahdusAika = KumahdusViiveMinS + rnd.NextDouble() * (KumahdusViiveMaxS - KumahdusViiveMinS);
            }
            if (salamaAika >= 0) { salamaAika += dt; Salama = Valahdys(salamaAika); if (salamaAika > 0.5) salamaAika = -1; } else Salama = 0;
            if (kumahdusAika >= 0) { kumahdusAika -= dt; if (kumahdusAika <= 0) { Kumahdus = true; kumahdusAika = -1; } }
        }

        /// <summary>Kaksoisvälähdys: huiput 0,04 s ja 0,22 s (jälkimmäinen heikompi), loppuu 0,36 s:ssa.</summary>
        public static double Valahdys(double t)
        {
            double P(double keski, double leveys, double huippu) => huippu * Math.Max(0, 1 - Math.Abs(t - keski) / leveys);
            return C(P(0.04, 0.05, 1) + P(0.22, 0.14, 0.6));   // pulssit limittäin: ei pimeää väliä
        }
    }
}
