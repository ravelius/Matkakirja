// OPPAAN LÄHILUOTAIMEN KUVAN TULKINTA (OpasLahiluotain; Pelikoodarin Eiffel-toisto 6.10. 19.1x: pelkkä lähin etäisyys sekoitti
// maan esteisiin ja 40 m:n raja päästi kameran ristikon viereen, este 56–62 m). Syvyyskuva (silmäsyvyys m, rivi 0 = alin)
// kameran tilaan → paikallinen (sivu, eteen, ylös) luotaimen kallistuksella:
//   vaaka   lähin vaakaetäisyys pisteeseen, joka on korkeintaan AlasVaraM kameran alapuolella (seinä, torni, ristikko edessä;
//           matalampi kattopinta ja maa eivät ole esteitä vaakaliikkeelle)
//   alla    pienin pystyvara pisteeseen, joka on AllaSadeM:n sisällä vaakasuunnassa kameran alapuolella (ristikon taso alla)
// Puhdas C#: Linssit-testit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasLuotainKuva
    {
        public const double AlasVaraM = 25, AllaSadeM = 30;

        /// <summary>z[y · w + x] = silmäsyvyys (m) tai NaN / ääretön (ei osumaa); pystyFov ja alas asteina.</summary>
        public static (double vaaka, double alla, double alaKeski, double ylaKeski) Tulkitse(double[] z, int w, int h, double pystyFov, double alasAst)
        {
            double tanV = Math.Tan(pystyFov * 0.5 * Math.PI / 180), tanH = tanV * w / h;
            double ca = Math.Cos(alasAst * Math.PI / 180), sa = Math.Sin(alasAst * Math.PI / 180);
            double vaaka = double.PositiveInfinity, alla = double.PositiveInfinity, ala = 0, yla = 0; int na = 0, ny = 0;
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    double s = z[y * w + x];
                    if (double.IsNaN(s) || double.IsInfinity(s)) continue;
                    if (y < h / 4) { ala += s; na++; } else if (y >= h - h / 4) { yla += s; ny++; }
                    double cx = ((x + 0.5) / w * 2 - 1) * tanH * s, cy = ((y + 0.5) / h * 2 - 1) * tanV * s;
                    double ylos = cy * ca - s * sa, eteen = s * ca + cy * sa;
                    double v = Math.Sqrt(cx * cx + eteen * eteen);
                    if (ylos > -AlasVaraM && eteen > 0) vaaka = Math.Min(vaaka, v);
                    if (ylos < 0 && v < AllaSadeM) alla = Math.Min(alla, -ylos);
                }
            return (vaaka, alla, na > 0 ? ala / na : double.NaN, ny > 0 ? yla / ny : double.NaN);
        }
    }
}
