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
        public const double NopeusMs = 6, MinS = 1.3, MaxS = 2.4, KaariM = 0.8, KaariOsuus = 0.12;
        /// <summary>Perillä kipinä pysyy täysin kirkkaana (s) ja himmenee sitten (s), vaikka vihjeen valo olisi hennompi
        /// (PT 11.10. 02.3x, simu af4eb6678: kipinä erottui vain 0,5–1 s).</summary>
        public const double PerillaKirkasS = 2, PerillaHimmenee = 0.8;
        /// <summary>Kirkkaus perillä ajan mukaan (1 kirkkaana, sitten lineaarinen lasku nollaan).</summary>
        public static double PerillaKirkkaus(double s) => s <= PerillaKirkasS ? 1 : Math.Max(0, 1 - (s - PerillaKirkasS) / PerillaHimmenee);
        /// <summary>Ruudun reunan piste (näkymän koordinaatit 0–1) kohteen suunnassa, kun kohde ei ole ruudulla: kameran takana
        /// oleva peilataan; reunasta Reuna (osuus) sisään.</summary>
        public const double Reuna = 0.06;
        public static (double X, double Y) ReunaPiste(double vx, double vy, bool takana)
        {
            double dx = vx - 0.5, dy = vy - 0.5;
            if (takana) { dx = -dx; dy = -dy; }
            double m = Math.Max(Math.Abs(dx), Math.Abs(dy));
            if (m < 1e-6) { dx = 0; dy = -1; m = 1; }   // suoraan takana: alareunaan
            double k = (0.5 - Reuna) / m;
            return (0.5 + dx * k, 0.5 + dy * k);
        }

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
