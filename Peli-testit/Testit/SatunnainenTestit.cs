// mulberry32 bittitäsmällisesti kuten js/game.js (Kultaiset/siirrot.json).
using System;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class SatunnainenTestit
    {
        [Testi] static void KultaisetArvot()
        {
            int n = 0;
            foreach (var t in KultaisetApu.Lista(KultaisetApu.Kultaiset, "satunnaiset"))
            {
                var siemen = (double)t["siemen"];
                var r = new Satunnainen(siemen);
                var r2 = new Satunnainen((long)siemen);
                foreach (var o in MiniJson.Taulukko(t["arvot"]))
                {
                    var odotettu = (double)o;
                    Oleta.Tosi(odotettu == r.Seuraava(), $"siemen {siemen} arvo {r.Kutsuja}");
                    Oleta.Tosi(odotettu == r2.Seuraava(), $"siemen {siemen} (long) arvo {r2.Kutsuja}");
                    n++;
                }
                Oleta.Sama(20L, r.Kutsuja);
            }
            Oleta.Sama(140, n);
        }

        [Testi] static void KelausToistaaTallennuksen()
        {
            var k = MiniJson.Objekti(KultaisetApu.Kultaiset["kelaus"]);
            var r = new Satunnainen((long)(double)k["siemen"]);
            for (int i = 0; i < 17; i++) r.Seuraava();
            r.Kelaa((long)(double)k["ohitus"]);
            Oleta.Sama(1000L, r.Kutsuja);
            foreach (var o in MiniJson.Taulukko(k["arvot"])) Oleta.Tosi((double)o == r.Seuraava(), "kelattu arvo");
            Oleta.Sama(1005L, r.Kutsuja);
            r.Kelaa(0);
            Oleta.Sama(new Satunnainen(7L).Seuraava(), r.Seuraava());
        }

        [Testi] static void SiemenKuinJsUint32()
        {
            Oleta.Sama(0u, Satunnainen.JsToUint32(double.NaN));
            Oleta.Sama(4294967295u, Satunnainen.JsToUint32(-1));
            Oleta.Sama(5u, Satunnainen.JsToUint32(4294967301.7));
            Oleta.Sama(new Satunnainen(-1L).Seuraava(), new Satunnainen(4294967295.0).Seuraava());
            var r = new Satunnainen(99L);
            Oleta.Tosi(Enumerable.Range(0, 1000).Select(_ => r.Seuraava()).All(x => x >= 0 && x < 1), "väli [0,1)");
        }
    }
}
