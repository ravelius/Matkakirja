using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// REITTIKERROKSEN PUHTAAT MITAT (build 13, pariteetti B4/B5/B23). Puhdas, testit
    /// Kartta-testit/Testit/ReittiMitatTestit.cs. Webin arvot origin/main 25.9.2026, js/pallolauta/reitit.js;
    /// px = natiivin pt (kerrotaan PalloKierto.Pistekerroin:lla ruudulle).
    /// </summary>
    public static class ReittiMitat
    {
        /// <summary>Pergamenttivarjon paksuus (reitit.js:67 MATKAREITIN_VARJON_PAKSUUS_PX).</summary>
        public const float VarjonPaksuusPt = 4f;
        /// <summary>Varjo viivaa alempana: REITIN_VARJON_KORKEUS / REITIN_KORKEUS = 0,0018 / 0,002 (reitit.js:110–111).</summary>
        public const double VarjonKorkeusSuhde = 0.0018 / 0.002;

        /// <summary>Askelhelmen ulkohalkaisija (reitit.js:101 REITTIHELMEN_HALKAISIJA_PX).</summary>
        public const float HelmenHalkaisijaPt = 15f;
        /// <summary>Tumma reunus (reitit.js:103 REITTIHELMEN_REUNA_PX).</summary>
        public const float HelmenReunaPt = 2.2f;
        /// <summary>Pergamenttitäytteen halkaisija (reitit.js:105): 15 − 2 · 2,2 = 10,6.</summary>
        public const float HelmenTaytePt = HelmenHalkaisijaPt - 2f * HelmenReunaPt;
        /// <summary>
        /// Kohdemerkki-varjostimen _Sade: reunuksen keskiviiva (viiva piirtyy säteen molemmin puolin), jolloin
        /// ulkoreuna on 15 / 2 ja täyte näkyy halkaisijalla 10,6.
        /// </summary>
        public const float HelmenKeskiSadePt = (HelmenHalkaisijaPt - HelmenReunaPt) * 0.5f;

        /// <summary>Lentokaaren huippu pallon säteinä 180°:n lennolla (reitit.js:206 LENTOKAAREN_KORKEUS).</summary>
        public const double LentokaarenKorkeus = 0.5;

        /// <summary>
        /// js/rules.js pointAlong: piste polulla osuudella t (0…1) kuljetun matkan mukaan, laudan yksiköissä.
        /// </summary>
        public static (double X, double Y) PisteMatkalla(IReadOnlyList<(double X, double Y)> polku, double t)
        {
            if (polku == null || polku.Count == 0) throw new ArgumentException("tyhjä polku");
            if (polku.Count == 1) return polku[0];
            var pituudet = new double[polku.Count - 1];
            double yhteensa = 0;
            for (int i = 1; i < polku.Count; i++)
            {
                double d = Math.Sqrt(Sq(polku[i].X - polku[i - 1].X) + Sq(polku[i].Y - polku[i - 1].Y));
                pituudet[i - 1] = d;
                yhteensa += d;
            }
            double kohde = Math.Max(0, Math.Min(1, t)) * yhteensa;
            for (int i = 0; i < pituudet.Length; i++)
            {
                if (kohde <= pituudet[i] || i == pituudet.Length - 1)
                {
                    double f = pituudet[i] > 0 ? kohde / pituudet[i] : 0;
                    return (polku[i].X + (polku[i + 1].X - polku[i].X) * f, polku[i].Y + (polku[i + 1].Y - polku[i].Y) * f);
                }
                kohde -= pituudet[i];
            }
            return polku[polku.Count - 1];
        }

        /// <summary>
        /// Askelhelmien osuudet (reitit.js:426–430): i / askelia, i = 1 … askelia − 1. Päätekaupungeissa ei
        /// helmeä; askelia pyöristetään ja on vähintään 1 (yksiaskelisella reitillä ei helmiä).
        /// </summary>
        public static List<double> HelmienOsuudet(double askelia)
        {
            int n = Math.Max(1, (int)Math.Round(double.IsNaN(askelia) ? 1 : askelia, MidpointRounding.AwayFromZero));
            var ulos = new List<double>(Math.Max(0, n - 1));
            for (int i = 1; i < n; i++) ulos.Add((double)i / n);
            return ulos;
        }

        /// <summary>reitit.js:284 lentokaarenKorkeus: huippu pallon säteinä, 0,5 · clamp(kulma / 180, 0,02 … 1).</summary>
        public static double LentokaarenHuippu(double kulmaAst, double kerroin = LentokaarenKorkeus) =>
            kerroin * Math.Max(0.02, Math.Min(1.0, kulmaAst / 180.0));

        /// <summary>reitit.js:300 lentokaarenKohta: nousu osuudella t, paraabeli 4 t (1 − t) (huipussa 1).</summary>
        public static double KaarenNousu(double t) => 4.0 * t * (1.0 - t);

        static double Sq(double x) => x * x;
    }
}
