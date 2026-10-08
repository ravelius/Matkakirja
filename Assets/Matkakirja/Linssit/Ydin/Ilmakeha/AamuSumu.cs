// AAMUSUMU VEDEN YLLÄ (Linssiseppä 2, 9.10.2026; omistaja: "aamuisin matala sumu joen yllä"): voimakkuus auringon korkeudesta ja
// suunnasta. Sumu syntyy auringon noustessa (aurinko idän puolella, atsimuutti 0–180°) ja haihtuu, kun aurinko on noussut ~14°:een;
// illalla ei sumua. VesiPinta piirtää sen toisena, veden yläpuolelle nostettuna kerroksena (_IlmSaa.z).
using System;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class AamuSumu
    {
        public const double AlkaaAst = -2, TaysiAst = 2, HaihtuuAlkuAst = 6, HaihtuuLoppuAst = 14;

        /// <summary>0–1 auringon korkeudesta (°) ja atsimuutista (°, 0 = pohjoinen, 90 = itä).</summary>
        public static double Voima(double korkeusAst, double atsimuuttiAst)
        {
            double a = ((atsimuuttiAst % 360) + 360) % 360;
            if (a >= 180) return 0;
            return Smooth(AlkaaAst, TaysiAst, korkeusAst) * (1 - Smooth(HaihtuuAlkuAst, HaihtuuLoppuAst, korkeusAst));
        }

        static double Smooth(double a, double b, double x) { double t = Math.Max(0, Math.Min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    }
}
