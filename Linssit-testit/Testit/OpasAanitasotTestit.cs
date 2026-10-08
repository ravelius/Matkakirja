// OPPAAN ÄÄNITASOT (Linssiseppä 8.10.2026, Päätoimittaja: mikseri on junassa 167): kertoja ja siltalause seuraavat mikserin Lukija-
// säädintä, kori Tehosteet-säädintä, ja ukkonen ja kori väistävät −9 dB kertojan alla. Mitatuilla leikkeillä (ukkonen hetkellisesti
// −12,2 LUFS, kertoja −17,4 LUFS, huiput −1,7 / −1,6 dBFS) ukkonen on oletussäätimillä vähintään 6 dB kertojan alla ja huippusumma ≤ 1.
using System;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasAanitasotTestit
    {
        const double TK = 0.7079458;   // PalloKori.TehosteKerroin oletus (−3 dB)

        [Testi] static void SaatimetVaikuttavatOppaaseen()
        {
            Oleta.Tosi(Math.Abs(OpasAanitasot.Kertoja(0.9) - 0.9) < 1e-9 && OpasAanitasot.Kertoja(0) == 0, "Lukija-säädin kertojaan");
            Oleta.Tosi(Math.Abs(OpasAanitasot.Kori(0.9, 0.25, TK, 0.5, false) - 0.9 * 0.25 * TK * 0.5) < 1e-9, "Tehosteet-säädin koriin");
            Oleta.Tosi(OpasAanitasot.Kori(0.9, 0.25, TK, 0, false) == 0 && OpasAanitasot.Ukkonen(TK, 0, false) == 0, "säädin nollaan → hiljaa");
        }

        [Testi] static void UkkonenJaKoriVaistavatKertojaa()
        {
            Oleta.Tosi(Math.Abs(OpasAanitasot.Ukkonen(TK, 1, true) / OpasAanitasot.Ukkonen(TK, 1, false) - KaupunkiAanimaisema.VaistoTaso) < 1e-9, "ukkonen −9 dB");
            Oleta.Tosi(Math.Abs(OpasAanitasot.Kori(0.9, 1, TK, 1, true) / OpasAanitasot.Kori(0.9, 1, TK, 1, false) - KaupunkiAanimaisema.VaistoTaso) < 1e-9, "kori −9 dB");
            double Db(double x) => 20 * Math.Log10(x);
            double kertoja = -17.4 + Db(OpasAanitasot.Kertoja(0.9)), ukkonen = -12.2 + Db(OpasAanitasot.Ukkonen(TK, 1, true));
            Oleta.Tosi(kertoja - ukkonen >= 6, $"ukkonen {kertoja - ukkonen:F1} dB kertojan alla (ilman väistöä {kertoja - (-12.2 + Db(OpasAanitasot.Ukkonen(TK, 1, false))):F1})");
            double summa = Math.Pow(10, -1.6 / 20) * 0.9 + Math.Pow(10, -1.7 / 20) * OpasAanitasot.Ukkonen(TK, 1, true) + Math.Pow(10, -3.7 / 20) * OpasAanitasot.Kori(0.9, 0.25, TK, 1, true);
            Oleta.Tosi(summa <= 1, $"huippusumma {summa:F2}");
            double v = 0; for (int i = 0; i < 30; i++) v = OpasAanitasot.Liuku(v, 1, 1 / 30.0);
            Oleta.Tosi(v > 0.98, "väistö liukuu 0,25 s:ssa");
        }
    }
}
