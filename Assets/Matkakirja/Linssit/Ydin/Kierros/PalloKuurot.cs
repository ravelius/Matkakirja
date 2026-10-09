// SADEKUUROT ITSESTÄÄN (omistaja TF 168, 9.10.: "jonkun verran ukkosta ja sadetta voisi tulla jossain kohdissa itsestään"; Päätoimittaja
// juna 170): kehityskaupungeissa selkeällä tai pilvisellä säällä kuuro tulee harvoin (ValiMinS…ValiMaxS), kestää KestoMinS…KestoMaxS ja
// voimistuu ja heikkenee RamppiS:ssa S-käyränä; osa kuuroista on ukkoskuuroja (UkkosOsuus). Lisäpainot sekoitetaan säätehosteisiin
// (PalloSaaVaikutus), ja Voima kertoo kuuron vaiheen Linssiseppä 2:n pilville ja märille kaduille (KaupunkiKuuro). Puhdas C#.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class PalloKuurot
    {
        public const double EkaMinS = 240, EkaMaxS = 540, ValiMinS = 600, ValiMaxS = 1200, KestoMinS = 120, KestoMaxS = 200, RamppiS = 35, UkkosOsuus = 0.35;

        readonly Random r;
        double aika, seuraava, alku = -1, kesto; bool ukkonen;
        /// <summary>Kuuron voima 0–1 (0 = ei kuuroa).</summary>
        public double Voima { get; private set; }
        /// <summary>Nykyinen kuuro on ukkoskuuro.</summary>
        public bool Ukkoskuuro => ukkonen && alku >= 0;
        /// <summary>Tässä päivityksessä alkoi ukkoskuuro (kaukainen jyrinä kerran).</summary>
        public bool UkkonenAlkoi { get; private set; }

        public PalloKuurot(int siemen) { r = new Random(siemen); seuraava = EkaMinS + (EkaMaxS - EkaMinS) * r.NextDouble(); }

        /// <summary>Joka ruutu; sallittu = kehityskaupunki ja selkeä/pilvinen sää. Kesken alkanut kuuro hiipuu loppuun, vaikka sallinta loppuisi.</summary>
        public SaaPainot Paivita(double dt, bool sallittu)
        {
            aika += Math.Max(0, dt); UkkonenAlkoi = false;
            if (alku < 0 && sallittu && aika >= seuraava)
            {
                alku = aika; kesto = KestoMinS + (KestoMaxS - KestoMinS) * r.NextDouble(); ukkonen = r.NextDouble() < UkkosOsuus; UkkonenAlkoi = ukkonen;
            }
            if (alku >= 0)
            {
                double s = aika - alku;
                if (!sallittu && s < kesto - RamppiS) { kesto = s + RamppiS; }   // sää vaihtui: hiipuu pehmeästi
                if (s >= kesto) { alku = -1; ukkonen = false; seuraava = aika + ValiMinS + (ValiMaxS - ValiMinS) * r.NextDouble(); Voima = 0; }
                else Voima = Sm(Math.Min(1, s / RamppiS)) * Sm(Math.Min(1, (kesto - s) / RamppiS));
            }
            else Voima = 0;
            double v = Voima;
            return new SaaPainot { Harmaus = 0.7 * v, Sumu = 0.25 * v, Sade = 0.65 * v, Ukkonen = ukkonen ? v : 0 };
        }

        static double Sm(double x) => x * x * (3 - 2 * x);
    }
}
