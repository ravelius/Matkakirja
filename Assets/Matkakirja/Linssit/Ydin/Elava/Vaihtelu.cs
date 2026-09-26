// VAIHTELU JA TAUOT elävissä elementeissä (omistaja 26.9.2026 klo 16.5x, sitova kaikille: "ei monotoniaa"). Puhdas C#.
// Siemenellä toistettava aikataulu: käynti (KayS) ja tauko (SeisooS) vuorottelevat, ja tauko tulee jaksossa
// todennäköisyydellä TaukoTod. Käynnin aikana nopeus vaihtelee puuskina kahden eri jakson siniaallolla (±Puuska).
// Siirtymät ovat pehmeitä: hidastus HidastusS ja kiihdytys KiihdytysS smoothstep-käyrällä. Tavoite(t) antaa
// nopeuskertoimen (0 = seisoo, noin 1 = perusnopeus), ja Unity-puoli (ElavatElementit) kuljettaa kunkin yksilön aikaa sillä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class Vaihtelu
    {
        public double KayMinS = 60, KayMaxS = 150, SeisooMinS = 20, SeisooMaxS = 60;
        public double TaukoTod = 1.0, Puuska = 0.0, HidastusS = 3.0, KiihdytysS = 4.0;

        readonly Random satunnainen;
        readonly double puuskaVaihe1, puuskaVaihe2;
        // Jaksot: (alku, käynnin loppu, tauon loppu). Tauoton jakso: käynnin loppu == tauon loppu.
        readonly List<(double alku, double kayLoppu, double loppu)> jaksot = new List<(double, double, double)>();

        public Vaihtelu(int siemen)
        {
            satunnainen = new Random(siemen);
            puuskaVaihe1 = satunnainen.NextDouble() * Math.PI * 2;
            puuskaVaihe2 = satunnainen.NextDouble() * Math.PI * 2;
        }

        double Vali(double a, double b) => a + (b - a) * satunnainen.NextDouble();

        void Varmista(double t)
        {
            while (jaksot.Count == 0 || jaksot[jaksot.Count - 1].loppu <= t)
            {
                double alku = jaksot.Count == 0 ? 0 : jaksot[jaksot.Count - 1].loppu;
                // Ensimmäinen käynti lyhyempi (0,3–1 × jakso), etteivät yksilöt pysähdy samaan tahtiin.
                double kay = Vali(KayMinS, KayMaxS) * (jaksot.Count == 0 ? Vali(0.3, 1.0) : 1.0);
                double tauko = satunnainen.NextDouble() < TaukoTod ? Vali(SeisooMinS, SeisooMaxS) : 0;
                jaksot.Add((alku, alku + kay, alku + kay + tauko));
            }
        }

        static double Pehmea(double x) { x = Math.Max(0, Math.Min(1, x)); return x * x * (3 - 2 * x); }

        /// <summary>Nopeuskerroin hetkellä t (s, ≥ 0): 0 tauolla, käynnissä 1 ± puuska, pehmeät siirtymät.</summary>
        public double Tavoite(double t)
        {
            if (t < 0) t = 0;
            Varmista(t);
            // Etsi jakso (lineaarinen haku lopusta; jaksoja kertyy vain muutama tunnissa).
            int i = jaksot.Count - 1;
            while (i > 0 && jaksot[i].alku > t) i--;
            var (alku, kayLoppu, loppu) = jaksot[i];
            double kaynti;
            if (t < kayLoppu)
            {
                // Kiihdytys tauon jälkeen, hidastus ennen taukoa (tauoton jakson vaihto jatkuu suoraan).
                bool taukoEnnen = i > 0 && jaksot[i - 1].loppu > jaksot[i - 1].kayLoppu;
                double ylos = taukoEnnen ? Pehmea((t - alku) / KiihdytysS) : 1;
                double alas = loppu > kayLoppu ? Pehmea((kayLoppu - t) / HidastusS) : 1;
                kaynti = Math.Min(ylos, alas);
            }
            else kaynti = 0;
            double puuska = Puuska * (0.6 * Math.Sin(t * 2 * Math.PI / 11.0 + puuskaVaihe1) + 0.4 * Math.Sin(t * 2 * Math.PI / 4.3 + puuskaVaihe2));
            return Math.Max(0, kaynti * (1 + puuska));
        }

        /// <summary>Seuraavan tauon alku (hidastuksen loppu) hetkestä t eteenpäin, tai NaN (ei taukoja tunnin sisällä).</summary>
        public double SeuraavaTauko(double t)
        {
            for (double h = Math.Max(0, t); h < t + 3600; h = jaksot[jaksot.Count - 1].loppu + 1e-6)
            {
                Varmista(h);
                foreach (var j in jaksot) if (j.kayLoppu >= t && j.loppu > j.kayLoppu) return j.kayLoppu;
            }
            return double.NaN;
        }

        /// <summary>Seisooko yksilö hetkellä t (tauon keskellä).</summary>
        public bool Seisoo(double t) => Tavoite(t) < 1e-4;
    }
}
