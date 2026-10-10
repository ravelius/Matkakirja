// HISTORIAMOOTTORI: VIHJEEN VALOKIPINÄN LENTO (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma A4, Laitetestaajan TF 180 -raportti
// a6: ☰ › Vihje ja automaattiset vihjeet eivät näkyneet ruudulla, koska kohteen hento kimallus jäi pimeään tai näkymän ulkopuolelle).
// Vihjeen valo (ValoVihje, omistajan päätös 8.10.: maailman valona, ei Pulua) lähtee pelaajan katseen edestä ja lentää kaarena
// kohteeseen, joten suunta näkyy myös, kun kohde on näkymän ulkopuolella; perillä se jää kohteeseen ValoVihjeen ajaksi.
// Kesto matkasta (nopeus NopeusMs, rajat MinS–MaxS), kaaren korkeus matkasta (enintään KaariM). Koordinaatit dioraaman (x, y, z).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class VihjeLento
    {
        public const double NopeusMs = 7, MinS = 0.8, MaxS = 2.2, KaariM = 0.8, KaariOsuus = 0.12;
        /// <summary>Lähtö katseen edestä (m) ja hieman alempaa (m), jotta kipinä näkyy heti keskellä kuvaa.</summary>
        public const double LahtoEteenM = 1.6, LahtoAlasM = 0.15;
        /// <summary>Taso 1 lentää vain, jos kohde ei ole näkymässä (vaarassa vain hento katse kohteessa, Vihjeet).</summary>
        public static bool Lentaa(int taso, bool kohdeNakyvissa) => taso >= 2 || !kohdeNakyvissa;

        public (double X, double Y, double Z) Alku { get; private set; }
        public (double X, double Y, double Z) Kohde { get; private set; }
        public double Kesto { get; private set; }
        public double Aika { get; private set; }
        public bool Perilla => Aika >= Kesto;
        double kaari;

        public VihjeLento((double X, double Y, double Z) alku, (double X, double Y, double Z) kohde)
        {
            Alku = alku; Kohde = kohde;
            double m = Math.Sqrt(Sq(kohde.X - alku.X) + Sq(kohde.Y - alku.Y) + Sq(kohde.Z - alku.Z));
            Kesto = Math.Max(MinS, Math.Min(MaxS, m / NopeusMs));
            kaari = Math.Min(KaariM, m * KaariOsuus);
        }

        /// <summary>Etenee dt sekuntia; palauttaa kipinän paikan (pehmeä lähtö ja lasku, kaari ylöspäin).</summary>
        public (double X, double Y, double Z) Paivita(double dt)
        {
            Aika = Math.Min(Kesto, Aika + Math.Max(0, dt));
            return Paikka(Aika / Kesto);
        }

        public (double X, double Y, double Z) Paikka(double osuus)
        {
            double s = Math.Max(0, Math.Min(1, osuus)), e = s * s * (3 - 2 * s);
            return (Alku.X + (Kohde.X - Alku.X) * e, Alku.Y + (Kohde.Y - Alku.Y) * e + kaari * Math.Sin(Math.PI * s), Alku.Z + (Kohde.Z - Alku.Z) * e);
        }

        static double Sq(double x) => x * x;
    }
}
