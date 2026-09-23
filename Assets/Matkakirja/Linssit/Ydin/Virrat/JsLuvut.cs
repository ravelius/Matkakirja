// JAVASCRIPTIN LUKUFUNKTIOT BITTITARKASTI (värivirtojen laskennan pohja).
//
// Verkkopelin laskenta (js/aikajana-virrat-laskenta.js) pyöristää
// saapumisajat Float32:ksi ja valitsee Dijkstran tasapelit keon
// järjestyksessä, joten yksikin eri bitti matematiikkafunktiossa voi
// kääntää edeltäjäketjun toiseen naapuriin. Tässä ovat ne V8:n funktiot,
// joiden .NET-vastine EI anna samoja bittejä:
//
//   - Math.hypot: V8 normalisoi suurimmalla ja summaa Kahanilla
//     (src/builtins/math.tq MathHypot); sqrt(x² + y²) eroaa ulpin.
//   - Math.cos / Math.sin: V8 ajaa glibc:n trigonometriaa, .NET macOS:n
//     libm:ää; ne eroavat viimeisessä bitissä n. 4 %:ssa argumenteista.
//     Tässä on fdlibm (FreeBSD msun, V8:n vanha ieee754.cc), joka on
//     mitattu samaksi kuin Node 26 kaikilla ruudukon 360 leveysasteella
//     ja ~99,5 %:ssa satunnaisista argumenteista. Laskenta kysyy kosinia
//     vain ruudukon leveysasteilla (Dijkstra, laatikoiden syvyys), joten
//     kentät ovat tavutarkkoja; painopisteiden ja vanojen etäisyyksissä
//     ero on korkeintaan ulp.
//   - Math.round: pyöristää puolikkaat ylöspäin (.NET: parilliseen).
//   - Number.prototype.toFixed: tarkka desimaalipyöristys (.NET Math.Round
//     skaalaa ja pyöristää kahdesti).
//
// Math.atan2 ja Math.acos jäävät .NETin omiksi: niitä käyttää vain
// kameran painopiste, jonka tulos vertaillaan toleranssilla.
using System;
using System.Globalization;
using System.Numerics;

namespace Matkakirja.Linssit.Virrat
{
    public static class JsLuvut
    {
        /// <summary>V8 Math.hypot(a, b): normalisointi suurimmalla + Kahanin summa.</summary>
        public static double Hypot(double a, double b)
        {
            if (double.IsNaN(a) || double.IsNaN(b))
            {
                if (double.IsInfinity(a) || double.IsInfinity(b)) return double.PositiveInfinity;
                return double.NaN;
            }
            a = Math.Abs(a);
            b = Math.Abs(b);
            var max = a > b ? a : b;
            if (double.IsPositiveInfinity(max)) return double.PositiveInfinity;
            if (max == 0) return 0;
            double summa = 0, korjaus = 0;
            var n = a / max;
            var lisa = n * n - korjaus;
            var alustava = summa + lisa;
            korjaus = (alustava - summa) - lisa;
            summa = alustava;
            n = b / max;
            lisa = n * n - korjaus;
            alustava = summa + lisa;
            summa = alustava;
            return Math.Sqrt(summa) * max;
        }

        /// <summary>V8 Math.hypot(a, b, c).</summary>
        public static double Hypot(double a, double b, double c)
        {
            if (double.IsNaN(a) || double.IsNaN(b) || double.IsNaN(c))
            {
                if (double.IsInfinity(a) || double.IsInfinity(b) || double.IsInfinity(c)) return double.PositiveInfinity;
                return double.NaN;
            }
            a = Math.Abs(a);
            b = Math.Abs(b);
            c = Math.Abs(c);
            var max = a;
            if (b > max) max = b;
            if (c > max) max = c;
            if (double.IsPositiveInfinity(max)) return double.PositiveInfinity;
            if (max == 0) return 0;
            double summa = 0, korjaus = 0;
            foreach (var arvo in new[] { a, b, c })
            {
                var n = arvo / max;
                var lisa = n * n - korjaus;
                var alustava = summa + lisa;
                korjaus = (alustava - summa) - lisa;
                summa = alustava;
            }
            return Math.Sqrt(summa) * max;
        }

        /// <summary>JS Math.round: lähin kokonaisluku, puolikas ylöspäin (+∞ kohti).</summary>
        public static double Round(double x)
        {
            if (double.IsNaN(x) || double.IsInfinity(x)) return x;
            var alas = Math.Floor(x);
            // x − floor(x) on tarkka: murto-osa on aina esitettävissä.
            return x - alas >= 0.5 ? alas + 1 : alas;
        }

        /// <summary>
        /// JS +x.toFixed(d) (d ≤ 20, |x| &lt; 1e21): lähin n / 10^d tarkasta
        /// binääriarvosta, tasapelissä suurempi itseisarvo, ja tulos
        /// takaisin lähimmäksi doubleksi.
        /// </summary>
        public static double ToFixed(double x, int d)
        {
            if (double.IsNaN(x) || double.IsInfinity(x) || Math.Abs(x) >= 1e21) return x;
            var negatiivinen = x < 0;
            var a = Math.Abs(x);
            var bitit = BitConverter.DoubleToInt64Bits(a);
            var eksponentti = (int)((bitit >> 52) & 0x7FF);
            var mantissa = bitit & 0xFFFFFFFFFFFFFL;
            if (eksponentti == 0) eksponentti = 1; else mantissa |= 1L << 52;
            var e2 = eksponentti - 1075; // a = mantissa · 2^e2
            var kymmen = BigInteger.Pow(10, d);
            BigInteger n;
            if (e2 >= 0) n = (new BigInteger(mantissa) << e2) * kymmen;
            else
            {
                var jakaja = BigInteger.One << -e2;
                // Pyöristys puolikas ylöspäin: floor((2·m·10^d + D) / 2D).
                n = (2 * new BigInteger(mantissa) * kymmen + jakaja) / (2 * jakaja);
            }
            var teksti = n.ToString(CultureInfo.InvariantCulture) + "E-" + d.ToString(CultureInfo.InvariantCulture);
            var tulos = double.Parse(teksti, NumberStyles.Float, CultureInfo.InvariantCulture);
            return negatiivinen ? -tulos : tulos;
        }

        /* ------------------------------------------------ fdlibm cos/sin */

        static int Ylasana(double x) => (int)(BitConverter.DoubleToInt64Bits(x) >> 32);
        static double Sanoista(int yla, uint ala) => BitConverter.Int64BitsToDouble(((long)yla << 32) | ala);

        const double C1 = 4.16666666666666019037e-02, C2 = -1.38888888888741095749e-03,
            C3 = 2.48015872894767294178e-05, C4 = -2.75573143513906633035e-07,
            C5 = 2.08757232129817482790e-09, C6 = -1.13596475577881948265e-11;
        const double S1 = -1.66666666666666324348e-01, S2 = 8.33333333332248946124e-03,
            S3 = -1.98412698298579493134e-04, S4 = 2.75573137070700676789e-06,
            S5 = -2.50507602534068634195e-08, S6 = 1.58969099521155010221e-10;
        const double InvPio2 = 6.36619772367581382433e-01,
            Pio2_1 = 1.57079632673412561417e+00, Pio2_1t = 6.07710050650619224932e-11,
            Pio2_2 = 6.07710050630396597660e-11, Pio2_2t = 2.02226624879595063154e-21,
            Pio2_3 = 2.02226624871116645580e-21, Pio2_3t = 8.47842766036889956997e-32;

        static readonly int[] Npio2Yla =
        {
            0x3FF921FB, 0x400921FB, 0x4012D97C, 0x401921FB, 0x401F6A7A, 0x4022D97C,
            0x4025FDBB, 0x402921FB, 0x402C463A, 0x402F6A7A, 0x4031475C, 0x4032D97C,
            0x40346B9C, 0x4035FDBB, 0x40378FDB, 0x403921FB, 0x403AB41B, 0x403C463A,
            0x403DD85A, 0x403F6A7A, 0x40407E4C, 0x4041475C, 0x4042106C, 0x4042D97C,
            0x4043A28C, 0x40446B9C, 0x404534AC, 0x4045FDBB, 0x4046C6CB, 0x40478FDB,
            0x404858EB, 0x404921FB,
        };

        static double YtimenCos(double x, double y)
        {
            var ix = Ylasana(x) & 0x7FFFFFFF;
            if (ix < 0x3E400000 && (int)x == 0) return 1.0;
            var z = x * x;
            var r = z * (C1 + z * (C2 + z * (C3 + z * (C4 + z * (C5 + z * C6)))));
            if (ix < 0x3FD33333) return 1.0 - (0.5 * z - (z * r - x * y));
            var qx = ix > 0x3FE90000 ? 0.28125 : Sanoista(ix - 0x00200000, 0);
            var iz = 0.5 * z - qx;
            var a = 1.0 - qx;
            return a - (iz - (z * r - x * y));
        }

        static double YtimenSin(double x, double y, int iy)
        {
            var ix = Ylasana(x) & 0x7FFFFFFF;
            if (ix < 0x3E400000 && (int)x == 0) return x;
            var z = x * x;
            var v = z * x;
            var r = S2 + z * (S3 + z * (S4 + z * (S5 + z * S6)));
            if (iy == 0) return x + v * (S1 + z * r);
            return x - ((z * (0.5 * y - v * r) - y) - v * S1);
        }

        /// <summary>fdlibm __ieee754_rem_pio2 ilman suurten argumenttien haaraa (|x| ≤ 2^19·π/2).</summary>
        static int JaaPiPuolikkaalla(double x, out double y0, out double y1)
        {
            var hx = Ylasana(x);
            var ix = hx & 0x7FFFFFFF;
            double z;
            if (ix <= 0x3FE921FB) { y0 = x; y1 = 0; return 0; }
            if (ix < 0x4002D97C)
            {
                if (hx > 0)
                {
                    z = x - Pio2_1;
                    if (ix != 0x3FF921FB) { y0 = z - Pio2_1t; y1 = (z - y0) - Pio2_1t; }
                    else { z -= Pio2_2; y0 = z - Pio2_2t; y1 = (z - y0) - Pio2_2t; }
                    return 1;
                }
                z = x + Pio2_1;
                if (ix != 0x3FF921FB) { y0 = z + Pio2_1t; y1 = (z - y0) + Pio2_1t; }
                else { z += Pio2_2; y0 = z + Pio2_2t; y1 = (z - y0) + Pio2_2t; }
                return -1;
            }
            var t = Math.Abs(x);
            var n = (int)(t * InvPio2 + 0.5);
            double fn = n;
            var r = t - fn * Pio2_1;
            var w = fn * Pio2_1t;
            if (n < 32 && ix != Npio2Yla[n - 1]) y0 = r - w;
            else
            {
                var j = ix >> 20;
                y0 = r - w;
                var i = j - ((Ylasana(y0) >> 20) & 0x7FF);
                if (i > 16)
                {
                    t = r;
                    w = fn * Pio2_2;
                    r = t - w;
                    w = fn * Pio2_2t - ((t - r) - w);
                    y0 = r - w;
                    i = j - ((Ylasana(y0) >> 20) & 0x7FF);
                    if (i > 49)
                    {
                        t = r;
                        w = fn * Pio2_3;
                        r = t - w;
                        w = fn * Pio2_3t - ((t - r) - w);
                        y0 = r - w;
                    }
                }
            }
            y1 = (r - y0) - w;
            if (hx < 0) { y0 = -y0; y1 = -y1; return -n; }
            return n;
        }

        /// <summary>Kosini (fdlibm). Suurilla argumenteilla (yli 8·10^5) .NETin Math.Cos.</summary>
        public static double Cos(double x)
        {
            var ix = Ylasana(x) & 0x7FFFFFFF;
            if (ix <= 0x3FE921FB) return YtimenCos(x, 0);
            if (ix >= 0x7FF00000) return x - x;
            if (ix > 0x413921FB) return Math.Cos(x);
            var n = JaaPiPuolikkaalla(x, out var a, out var b);
            switch (n & 3)
            {
                case 0: return YtimenCos(a, b);
                case 1: return -YtimenSin(a, b, 1);
                case 2: return -YtimenCos(a, b);
                default: return YtimenSin(a, b, 1);
            }
        }

        /// <summary>Sini (fdlibm). Suurilla argumenteilla .NETin Math.Sin.</summary>
        public static double Sin(double x)
        {
            var ix = Ylasana(x) & 0x7FFFFFFF;
            if (ix <= 0x3FE921FB) return YtimenSin(x, 0, 0);
            if (ix >= 0x7FF00000) return x - x;
            if (ix > 0x413921FB) return Math.Sin(x);
            var n = JaaPiPuolikkaalla(x, out var a, out var b);
            switch (n & 3)
            {
                case 0: return YtimenSin(a, b, 1);
                case 1: return YtimenCos(a, b);
                case 2: return -YtimenSin(a, b, 1);
                default: return -YtimenCos(a, b);
            }
        }
    }
}
