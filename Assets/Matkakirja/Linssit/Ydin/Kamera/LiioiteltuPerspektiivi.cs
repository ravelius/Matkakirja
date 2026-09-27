// LIIOITELTU PERSPEKTIIVI (omistajan sääntö 26.9.2026 Fablen kautta; korvaa 15°:n oman kallistuksen): 3D-kohde ruudun
// keskellä näkyy suoraan ylhäältä, ja keskeltä poispäin kohdetta kallistetaan liioitellusti, jolloin sen keskustaa kohti
// oleva kylki näkyy kuin kamera olisi paljon alempana. Kallistus kasvaa etäisyyden mukaan: 0° keskellä ja KulmaMax
// reunalla (smootherstep), ja suunta on keskipisteestä poispäin (kohteen yläpää kallistuu ulospäin). Kun kamera on jo
// kallistettu, todellinen perspektiivi näyttää kyljet, joten liioittelu häipyy kameran kallistuksen 0° → HaipyyAsteet
// mukana. Puhdas C#. Yhteinen: lippu ja 3D-nostot (Natiiviseppä), elävät elementit (Linssiseppä), web-linssien 3D-kohteet.
using System;

namespace Matkakirja.Linssit.Kamera
{
    public static class LiioiteltuPerspektiivi
    {
        /// <summary>Kallistus reunalla (°) ja elliptinen etäisyys (0 keskellä, 1 jokaisella reunalla), jossa se saavutetaan.</summary>
        public const double KulmaMax = 55.0, Reuna = 1.0;
        /// <summary>Kameran kallistus (°), jossa liioittelu on häipynyt kokonaan.</summary>
        public const double HaipyyAsteet = 40.0;

        /// <summary>
        /// Kohteen kallistus ruutupisteessä (x, y, pikseleinä vasemmasta alakulmasta) ruudulla (leveys, korkeus) kameran
        /// kallistuksella (° pystysuorasta). Palauttaa kulman (°) ja suunnan ruudulla (yksikkövektori keskeltä kohteeseen;
        /// (0, 0) keskellä, pikseleissä, joten kulmakin on oikea). Etäisyys on elliptinen: sivu jaetaan omalla puolikkaallaan,
        /// joten jokainen reuna on 1 ja kulma on siellä KulmaMax myös pystypuhelimella (kulmissa etäisyys √2, rajataan 1:een).
        /// <paramref name="reuna"/> = elliptinen etäisyys, jossa KulmaMax saavutetaan (oletus <see cref="Reuna"/> 1,0; 3D-nostot
        /// 0,5 omistajan toiveesta 27.9.2026 klo 23.2x: tasokuva vaihtuu 3D:ksi nopeammin, keskellä yhä suoraan ylhäältä).
        /// </summary>
        public static (double kulma, double dx, double dy) Kallistus(double x, double y, double leveys, double korkeus, double kameranKallistus,
            double reuna = Reuna)
        {
            if (!(leveys > 0) || !(korkeus > 0)) return (0, 0, 0);
            double px = x - leveys * 0.5, py = y - korkeus * 0.5;
            double ox = px / (leveys * 0.5), oy = py / (korkeus * 0.5);
            double r = Math.Sqrt(ox * ox + oy * oy), pit = Math.Sqrt(px * px + py * py);
            if (r < 1e-9 || pit < 1e-9) return (0, 0, 0);
            double paino = 1 - Kamerakayrat.Pehmea(Math.Max(0, kameranKallistus) / HaipyyAsteet);
            return (KulmaMax * Kamerakayrat.Pehmea(r / Math.Max(0.05, reuna)) * paino, px / pit, py / pit);
        }
    }
}
