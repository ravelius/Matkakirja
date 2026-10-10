// TAIDEMUSEO: VALAISTUS FYSIKAALISISTA ARVOISTA (Linssiseppä 10.10.2026; aineistoraportin liite C2.4, PT: ~150 lx, 3000–3500 K,
// neutraali sävytys). Varjostin MuseoValaistu laskee valaistusvoimakkuuden E (lx) jokaiselle pinnalle: kohdevalot (valokeila:
// paikka, suunta, puolikulma, reunahäivä, lx teoksen keskellä) + osan hajavalo (seinäpesu ja kattoikkunat). Luminanssi
// L = E·ρ/π (cd/m²) ja kuvan arvo L / Lmax, missä Lmax = 1,2 · 2^EV100 (lukittu valotus, ei automaattia; Lagarde & de Rousiers).
// Värilämpötila Kelvineistä lineaariseksi RGB:ksi, normitettu luminanssiin 1 ja osittain mukautettu (neutraali: valkoinen
// paperi näyttää lämpimän valkoiselta, ei oranssilta).
using System;

namespace Matkakirja.Linssit.Museo
{
    public static class MuseoValo
    {
        /// <summary>Kuinka paljon värilämpötilan sävystä jää kuvaan (0 = täysin mukautettu valkoiseksi, 1 = raaka).</summary>
        public const double Savyosuus = 0.45;
        /// <summary>Kohdevalon voimakkuus I (cd) niin, että teoksen keskellä (pinnan normaali n) on keilan lx: E = I·cosθ / d².</summary>
        public static double Voimakkuus(Valokeila k, Dioraama.V3 kohde, Dioraama.V3 n)
        {
            var d = kohde - k.Paikka; double l = d.Pituus;
            if (l < 1e-6) return 0;
            double cos = Math.Abs(d.X * n.X + d.Y * n.Y + d.Z * n.Z) / (l * Math.Max(1e-9, n.Pituus));
            return k.Lx * l * l / Math.Max(0.2, cos);
        }

        /// <summary>Lukitun valotuksen kerroin 1 / Lmax (cd/m² → kuva-arvo).</summary>
        public static double Valotus(double ev100) => 1.0 / (1.2 * Math.Pow(2, ev100));

        /// <summary>Kuva-arvo (lineaarinen) pinnalle: heijastus ρ, valaistus E lx, EV100.</summary>
        public static double KuvaArvo(double rho, double lx, double ev100) => rho * lx / Math.PI * Valotus(ev100);

        /// <summary>Värilämpötila → lineaarinen RGB (Planckin käyrän sovitus, Tanner Helland), normitettu luminanssiin 1,
        /// sävy pienennetty Savyosuuteen (osittainen kromaattinen mukautus).</summary>
        public static (double R, double G, double B) Kelvin(double k)
        {
            double t = Math.Max(1000, Math.Min(40000, k)) / 100, r, g, b;
            r = t <= 66 ? 255 : 329.698727446 * Math.Pow(t - 60, -0.1332047592);
            g = t <= 66 ? 99.4708025861 * Math.Log(t) - 161.1195681661 : 288.1221695283 * Math.Pow(t - 60, -0.0755148492);
            b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.Log(t - 10) - 305.0447927307;
            double Lin(double c) { c = Math.Max(0, Math.Min(255, c)) / 255; return c <= 0.04045 ? c / 12.92 : Math.Pow((c + 0.055) / 1.055, 2.4); }
            double R = Lin(r), G = Lin(g), B = Lin(b);
            double y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
            R /= y; G /= y; B /= y;
            return (1 + (R - 1) * Savyosuus, 1 + (G - 1) * Savyosuus, 1 + (B - 1) * Savyosuus);
        }

        /// <summary>Keilan reunan pehmeys: sisäkulma = puolikulma · (1 − reunahäivä); palauttaa (cos ulko, cos sisä).</summary>
        public static (double Ulko, double Sisa) Kartio(Valokeila k)
        {
            double a = k.PuolikulmaAste * Math.PI / 180;
            return (Math.Cos(a), Math.Cos(a * (1 - Math.Max(0, Math.Min(0.95, k.Reunahaive)))));
        }

        /// <summary>Osan hajavalo (lx) seinille ja lattialle: seinäpesu 15 % kohdevalosta + päivänvalo-osuus kattoikkunoista.</summary>
        public static double Hajavalo(Osa o) => o.Lx * (0.15 + 0.25 * o.Paivanvalo);
    }
}
