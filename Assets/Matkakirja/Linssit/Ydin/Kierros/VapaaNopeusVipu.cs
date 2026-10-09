// VAPAAN LENNON NOPEUSVIPU (omistaja 9.10.2026, juna 170: "vasemmalla keskellä myös pieni säädin vipu, millä voisi vaikuttaa
// maksiminopeuteen. näin pallolla voisi lentää kuin dronella"; Päätoimittaja: mikserin liukusäädin pystyasennossa). Vivun asento
// −2…log2 3 (ylös = nopeampi) → kerroin 2^asento: ×0,25 … ×1 (nykyinen) … ×3 (Päätoimittaja 9.10.: sama alue kuin LS1:n
// OpasSovitin.VapaaNopeus 0,25–3). OpasVapaaLento kertoo vaaka- ja pystyvauhdin enimmäisarvon tällä (LS1). Puhdas C#: Linssit-testit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class VapaaNopeusVipu
    {
        public const float Min = -2f, Max = 1.5849625f, Oletus = 0f;   // Max = log2 3

        /// <summary>Vivun asento → nopeuskerroin (0,25 … 3; oletus 1).</summary>
        public static double Kerroin(float asento) => Math.Max(0.25, Math.Min(3.0, Math.Pow(2, Math.Max(Min, Math.Min(Max, float.IsNaN(asento) ? Oletus : asento)))));

        /// <summary>VoiceOverin arvoteksti: "×0,5", "×1", "×3".</summary>
        public static string Teksti(float asento)
        {
            double k = Kerroin(asento);
            return "×" + (Math.Abs(k - Math.Round(k)) < 0.005 ? Math.Round(k).ToString("0") : k.ToString("0.0#", System.Globalization.CultureInfo.GetCultureInfo("fi-FI")));
        }
    }
}
