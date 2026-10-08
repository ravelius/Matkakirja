// Mikseriluokka (PT 8.10.): sää vs. tausta.
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class AaniLuokkaTestit
    {
        [Testi] static void SaaJaTausta()
        {
            foreach (var s in new[] { "linna-tuuli", "sade-kivi", "sade-pressu", "ukkonen-jyly", "tippuminen-muuri", "tippuminen-raystas", "tuuli-rako", "tuuli-puuska" })
                Oleta.Tosi(AaniLuokka.OnkoSaa(s), s + " on sää");
            foreach (var s in new[] { "jarvi-laineet", "tulisija-ratina", "keskushalli-ambienssi", "kuoro", "askel-kivi", "sydan", null, "" })
                Oleta.Tosi(!AaniLuokka.OnkoSaa(s), (s ?? "null") + " ei ole sää");
        }
    }
}
