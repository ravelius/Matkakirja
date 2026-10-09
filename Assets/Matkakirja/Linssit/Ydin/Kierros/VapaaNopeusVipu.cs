// VAPAAN LENNON NOPEUSVIPU (omistaja 9.10.2026, juna 170: "vasemmalla keskellä myös pieni säädin vipu, millä voisi vaikuttaa
// maksiminopeuteen. näin pallolla voisi lentää kuin dronella"; Päätoimittaja: mikserin liukusäädin pystyasennossa). Vivun asento
// −2…1 (ylös = nopeampi) → kerroin 2^asento: ×0,25 … ×1 (nykyinen, keskeltä hieman ylös) … ×2. OpasVapaaLento kertoo vaaka- ja
// pystyvauhdin enimmäisarvon tällä (LS1). Puhdas C#: Linssit-testit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class VapaaNopeusVipu
    {
        public const float Min = -2f, Max = 1f, Oletus = 0f;

        /// <summary>Vivun asento → nopeuskerroin (0,25 … 2; oletus 1).</summary>
        public static double Kerroin(float asento) => Math.Pow(2, Math.Max(Min, Math.Min(Max, float.IsNaN(asento) ? Oletus : asento)));

        /// <summary>VoiceOverin arvoteksti: "×0,5", "×1", "×2".</summary>
        public static string Teksti(float asento)
        {
            double k = Kerroin(asento);
            return "×" + (Math.Abs(k - Math.Round(k)) < 0.005 ? Math.Round(k).ToString("0") : k.ToString("0.0#", System.Globalization.CultureInfo.GetCultureInfo("fi-FI")));
        }
    }
}
