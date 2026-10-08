// PALLON PILVIKERROS (Linssiseppä 2, 8.10.2026; PT 23.28: raportti pallo-unreal-vertailu-20261008.md kohta 6a, kevyt 2.5D-pilvikerros).
// Taivaskupolin varjostin (IlmakehaTaivas) leikkaa katsesäteen kolmella vaakatasolla pilvipohjan ja -katon välillä ja näytteistää
// Karttasepän pilvitiheyden (pilvet-tiheys.png, kolmen mittakaavan yhdistelmä, sama kenttä ja tuuli kuin laattojen pilvivarjoilla),
// joten varjot maassa osuvat pilvien alle. Tämä on varjostimen CPU-vertailu (geometria ja peitto) testejä varten.
// Rajat: kamera pilvipohjan alapuolella (pallo lentää alle 2 km:ssä); kerros häipyy, kun kamera nousee lähelle pohjaa, ja horisontissa
// (säde yli HiipumaAlkuM … HiipumaLoppuM), jossa ilmaperspektiivi on jo peittänyt pilvet.
using System;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class KaupunkiPilvet
    {
        public const int Tasot = 3;
        public const double PohjaM = 2000, PaksuusM = 600, HiipumaAlkuM = 40000, HiipumaLoppuM = 80000, KameraVaraM = 300;

        /// <summary>Tason i (0 = pohja … Tasot−1 = katto) korkeus metreinä maasta.</summary>
        public static double TasonKorkeus(int i, double pohjaM = PohjaM, double paksuusM = PaksuusM) => pohjaM + paksuusM * i / (Tasot - 1);

        /// <summary>Katsesäteen (suunnan y-komponentti dy) matka tasolle korkeudella h kamerasta korkeudella kameraM; −1 = ei osu.</summary>
        public static double Matka(double kameraM, double dy, double h) => dy <= 1e-4 || h <= kameraM ? -1 : (h - kameraM) / dy;

        /// <summary>Häivytys horisonttia kohti (matka) ja kameran noustessa pilvipohjan lähelle.</summary>
        public static double Hiipuma(double matkaM, double kameraM, double pohjaM = PohjaM)
        {
            if (matkaM < 0) return 0;
            double h = 1 - Smooth(HiipumaAlkuM, HiipumaLoppuM, matkaM);
            double k = 1 - Smooth(pohjaM - 2 * KameraVaraM, pohjaM - KameraVaraM, kameraM);
            return h * k;
        }

        /// <summary>Peitto Karttasepän kaavalla (pilvet-tiheys.json): smoothstep(1 − p, 1 − p + 0,2, D − 0,15·(1 − G)).</summary>
        public static double Peitto(double d, double g, double peitto) => Smooth(1 - peitto, 1 - peitto + 0.2, d - 0.15 * (1 - g));

        /// <summary>Tason tiheys: keskitaso täysi, pohja ja katto ohuempia (kumpupilven pyöreä profiili).</summary>
        public static double TasonPaino(int i) => i == (Tasot - 1) / 2 ? 1.0 : 0.6;

        static double Smooth(double a, double b, double x) { double t = Math.Max(0, Math.Min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    }
}
