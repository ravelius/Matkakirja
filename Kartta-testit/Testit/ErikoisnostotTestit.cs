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
            // Reunaehto (Päätoimittajan OK 2.10.): webin iPhone, avattu kartuutsi 20–382 × 612–853, lippu (165, 643), ruutu 402
            // → webin kaavalla x 390 (vain 12 px näkyy) → kartuutsin yläpuolelle oikeaan reunaan (330, 612 − 64 − 8 = 540).
            var y = ErikoisnostoMitat.SarakkeenPaikka(165, 643, 382, 612, 853, 64, 402, out _, out bool ylla);
            Oleta.Tosi(ylla && Lahella(y.X, 330) && Lahella(y.Y, 540), $"{y} {ylla}");
            // iPad (ruutu 1376): avattu kartuutsi 35–585 mahtuu → lipun alle kuten webissä (593, 822 + 20 + 8 = 850).
            var z = ErikoisnostoMitat.SarakkeenPaikka(245, 842, 585, 804, 997, 64, 1376, out bool m3, out bool ylla3);
            Oleta.Tosi(!ylla3 && m3 && Lahella(z.X, 593) && Lahella(z.Y, 850), $"{z} {m3} {ylla3}");
            // Rajalla kuten webin #3857 (x + 64 + 8 > ruutu): x 330 ruudulla 401 → yllä, ruudulla 402 → ei.
            ErikoisnostoMitat.SarakkeenPaikka(330, 643, 322, 612, 853, 64, 401, out _, out bool raja1);
            ErikoisnostoMitat.SarakkeenPaikka(330, 643, 322, 612, 853, 64, 402, out _, out bool raja2);
            Oleta.Tosi(raja1 && !raja2, $"{raja1} {raja2}");
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
