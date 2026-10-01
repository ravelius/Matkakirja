// KYYDIN AURINKO (Kartta/Aurinko.cs, Linssiseppä 1.10.2026, Natiivisepän ehdot): KyydinAurinko == null → täsmälleen kameravalon
// polku (ei Slerpiä nollapainolla, väri palaa perusväriin), ja AstronauttiKerros nollaa sen. Aurinko.cs on MonoBehaviour, joten
// testi lukee lähdekoodin tekstinä.
using System.IO;
using System.Text.RegularExpressions;

namespace Matkakirja.Kartta.Testit
{
    public static class KyydinAurinkoTestit
    {
        static string Lue(string polku) => File.ReadAllText(Path.Combine("..", polku));

        [Testi]
        static void NullPolkuOnEnnallaan()
        {
            var s = Lue("Assets/Matkakirja/Kartta/Aurinko.cs");
            Oleta.Tosi(s.Contains("var ka = KyydinAurinko != null && kk != null && kk.LinssiPaalla ? KyydinAurinko() : null;"), "vain linssissä");
            Oleta.Tosi(Regex.IsMatch(s, @"if \(kyyti > 0f\)\s*\{\s*valonKierto = Quaternion\.Slerp\(valonKierto, kyydinKierto, kyyti\);"),
                "Slerp vain painolla > 0 (null → kameravalon ketju ennallaan)");
            Oleta.Tosi(s.Contains("else if (kyyti0 > 0f) valo.color = perusVari;"), "väri palaa perusväriin");
            Oleta.Tosi(s.Contains("perusVari = valo.color;"), "perusväri talteen Startissa");
            Oleta.Tosi(s.Contains("Kompensoi(n0, kartta * (1f - s));"), "ambientin kompensointi ennallaan (kartta = 0 linssissä)");
            Oleta.Tosi(s.Contains("kyydin aurinko"), "tila-rivillä kyydin aurinko");
        }

        [Testi]
        static void AstronauttiKerrosNollaa()
        {
            var s = Lue("Assets/Matkakirja/Linssit/Unity/AstronauttiKerros.cs");
            foreach (var m in new[] { "void OnDisable()", "void OnDestroy()" })
            {
                int i = s.IndexOf(m);
                Oleta.Tosi(i >= 0 && s.IndexOf("Aurinko.KyydinAurinko = null;", i) is int j && j > i && j - i < 600, m + " nollaa kyydin auringon");
            }
            Oleta.Tosi(s.Contains("if (kyyti == KyydinTila.Kauko || georeferenssi == null || !katseOn) return null;"), "kaukonäkymässä null");
        }
    }
}
