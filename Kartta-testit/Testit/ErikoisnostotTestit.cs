// ERIKOISNOSTOT (Kartta/ErikoisnostoMitat.cs): samat tapaukset kuin webin tests/ajattelijapaat.test.mjs (#3866) — nenän kääntö,
// pää karttapisteen päällä, heilahduksen jousi.
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
        static void PaaSeisooKarttapisteenPaalla()
        {
            // Web #3866: paanRuutupaikka({ x: 200, y: 400 }, 393 × 852) → (200, 400 − 64 · 0,35); kaukana ruudun ulkopuolella → piiloon.
            Oleta.Tosi(ErikoisnostoMitat.PaanRuutupaikka(200, 400, 393, 852, out float x, out float y) && Lahella(x, 200) && Lahella(y, 400 - 64 * 0.35), $"{x} {y}");
            Oleta.Tosi(!ErikoisnostoMitat.PaanRuutupaikka(-500, 400, 393, 852, out _, out _), "vasemmalla ulkona");
            Oleta.Tosi(ErikoisnostoMitat.PaanRuutupaikka(-30, 400, 393, 852, out _, out _), "reunan yli puoliksi näkyy");
            Oleta.Tosi(!ErikoisnostoMitat.PaanRuutupaikka(float.NaN, 400, 393, 852, out _, out _), "NaN");
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
