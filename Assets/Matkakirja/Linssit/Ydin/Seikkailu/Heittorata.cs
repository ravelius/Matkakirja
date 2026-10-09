// HARHAUTUSHEITON TÄHTÄYS (pelattavuusmalli 2.4, juna 170): heiton kantama katseen pystykulman mukaan 3–9 m (alas lähelle,
// ylös kauas), jotta pelaaja voi harhauttaa vartijan valitsemaansa paikkaan. Lähtökulma kiinteä 30°, lähtökorkeus käden
// korkeus (~1,3 m lattiasta); nopeus ratkaistaan niin, että esine osuu lattiaan kantaman päässä (tasainen maa, ei ilmanvastusta).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public static class Heittorata
    {
        public const double MinM = 3, MaxM = 9, KeskiM = 6, AsteJaM = 25.0 / 3.0;   // ±25° katseesta → 3…9 m
        public const double LahtoAste = 30, KasiM = 1.3, G = 9.81;

        /// <summary>Kantama (m) katseen pystykulmasta (asteina, + = ylös): 0° → 6 m, −25° → 3 m, +25° → 9 m, rajattu.</summary>
        public static double Kantama(double ylosAste) => Math.Max(MinM, Math.Min(MaxM, KeskiM + ylosAste / AsteJaM));

        /// <summary>Lähtönopeuden vaaka- ja pystykomponentti (m/s), jolla esine laskeutuu kantaman päähän KasiM:n korkeudelta.</summary>
        public static (double Vaaka, double Pysty) Nopeus(double kantamaM, double kasiM = KasiM)
        {
            double th = LahtoAste * Math.PI / 180, c = Math.Cos(th), t = Math.Tan(th);
            double v2 = G * kantamaM * kantamaM / (2 * c * c * (kantamaM * t + Math.Max(0.2, kasiM)));
            double v = Math.Sqrt(Math.Max(0, v2));
            return (v * c, v * Math.Sin(th));
        }
    }
}
