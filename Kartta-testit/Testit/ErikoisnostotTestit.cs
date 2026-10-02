// ERIKOISNOSTOT (Kartta/ErikoisnostoMitat.cs): samat tapaukset kuin webin tests/ajattelijapaat.test.mjs (#3843) — nenän kääntö,
// sarakkeen paikka lipun alla tai kartuutsin vieressä, heilahduksen jousi.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ErikoisnostotTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-4) => Math.Abs(a - b) <= tol;

        [Testi]
        static void NenaKohtiKeskustaaEnintaan30()
        {
            Oleta.Tosi(ErikoisnostoMitat.KaantoAste == 30f, "30°");
            Oleta.Tosi(Lahella(ErikoisnostoMitat.KaantoKeskustaa(200, 400), 0), "keskellä 0");
            Oleta.Tosi(Lahella(ErikoisnostoMitat.KaantoKeskustaa(0, 400), 30), "vasen reuna → 30 (katsojan oikealle)");
            Oleta.Tosi(Lahella(ErikoisnostoMitat.KaantoKeskustaa(400, 400), -30), "oikea reuna → −30");
            Oleta.Tosi(Lahella(ErikoisnostoMitat.KaantoKeskustaa(-500, 400), 30), "rajattu");
            Oleta.Tosi(ErikoisnostoMitat.KaantoKeskustaa(300, 400) < 0, "oikealla puolella negatiivinen");
        }

        [Testi]
        static void SarakeLipunAllaTaiKartuutsinVieressa()
        {
            // Web: kartuutsi { left 20, right 240, bottom 832 }, lippu { left 150, bottom 560 }, korkeus 64 → (248, 568) mahtuu.
            var p = ErikoisnostoMitat.SarakkeenPaikka(150, 560, 240, 832, 64, out bool mahtuu);
            Oleta.Tosi(Lahella(p.X, 248) && Lahella(p.Y, 568) && mahtuu, $"{p} {mahtuu}");
            // Puhelin (393 × 852): nimirivi päättyy 804 → pää nousee kartuutsin viereen (248, 768).
            var q = ErikoisnostoMitat.SarakkeenPaikka(20, 804, 240, 832, 64, out bool mahtuu2);
            Oleta.Tosi(Lahella(q.X, 248) && Lahella(q.Y, 768) && !mahtuu2, $"{q} {mahtuu2}");
            // Korkea sarake ei nouse ruudun yläreunan yli.
            var r = ErikoisnostoMitat.SarakkeenPaikka(20, 804, 240, 100, 300, out _);
            Oleta.Tosi(Lahella(r.Y, 0), r.ToString());
        }

        [Testi]
        static void HeilahdusJousiPalaaLepoon()
        {
            // Potku: pituuden muutos käärittynä ±180 ja jaettuna korkeudella (vähintään 0,05 sädettä).
            Oleta.Tosi(Lahella(ErikoisnostoMitat.Potku(179, -179, 1), 2), "sauma ±180");
            Oleta.Tosi(Lahella(ErikoisnostoMitat.Potku(10, 11, 0.01), 20), "korkeus vähintään 0,05");
            // Kartta itään (+1°, korkeus 1): pää heilahtaa negatiiviseen (web −dLng · 1,4), jousi palauttaa lepoon.
            double k = 0, n = 0;
            (k, n) = ErikoisnostoMitat.Heilahda(k, n, ErikoisnostoMitat.Potku(0, 1, 1));
            Oleta.Tosi(Lahella(n, -1.4 * 0.82) && Lahella(k, -1.4 * 0.82), $"{k} {n}");
            for (int i = 0; i < 200; i++) (k, n) = ErikoisnostoMitat.Heilahda(k, n, 0);
            Oleta.Tosi(!ErikoisnostoMitat.Liikkuu(k, n, 0), $"lepo {k} {n}");
            // Iso potku rajautuu ±30°:een, ja lopullinen kääntö pysyy ±30°:ssa.
            (k, n) = ErikoisnostoMitat.Heilahda(0, 0, 100);
            Oleta.Tosi(Lahella(k, -30), k.ToString());
            Oleta.Tosi(Lahella(ErikoisnostoMitat.Kaanto(0, 400, 25), 30), "keskusta 30 + heilahdus 25 → 30");
        }
    }
}
