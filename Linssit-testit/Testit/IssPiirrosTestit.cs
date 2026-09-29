// ISS:n piirros, kertasyke ja kiekkoehto webin mukaan (js/linssit/satelliitti-avaruus.js ISS_PIIRROS_SVG ja issKiekonSisalla,
// css/satelliitti.css .astro-iss-syke).
using System;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Testit
{
    public static class IssPiirrosTestit
    {
        static (byte r, byte g, byte b, byte a) Pikseli(byte[] t, int leveys, int korkeus, int skaala, float xPt, float yPtYlhaalta)
        {
            int px = (int)(xPt * skaala), py = korkeus - 1 - (int)(yPtYlhaalta * skaala);
            int i = (py * leveys + px) * 4;
            return (t[i], t[i + 1], t[i + 2], t[i + 3]);
        }

        [Testi] static void PiirrosKutenWebinSvg()
        {
            var t = IssPiirros.Rasteroi(4, out int w, out int h);
            Oleta.Sama(96, w);
            Oleta.Sama(48, h);
            // Siiven keskellä kulta #c9953a (vasen ylempi siipi x 1,4–4,0, y 0,6–4,8).
            var siipi = Pikseli(t, w, h, 4, 2.7f, 2.7f);
            Oleta.Sama((byte)0xc9, siipi.r); Oleta.Sama((byte)0x95, siipi.g); Oleta.Sama((byte)0x3a, siipi.b); Oleta.Sama((byte)255, siipi.a);
            // Moduulin keskellä #f4f7fb.
            var moduuli = Pikseli(t, w, h, 4, 12f, 6.9f);
            Oleta.Sama((byte)0xf4, moduuli.r); Oleta.Sama((byte)0xfb, moduuli.b);
            // Ristikko siipien välissä #e6ebf1 (y 5,4–6,6).
            var ristikko = Pikseli(t, w, h, 4, 8.5f, 6.0f);
            Oleta.Sama((byte)0xe6, ristikko.r); Oleta.Sama((byte)255, ristikko.a);
            // Kulma ja siipien väli ovat läpinäkyviä.
            Oleta.Sama((byte)0, Pikseli(t, w, h, 4, 0.1f, 0.1f).a);
            Oleta.Sama((byte)0, Pikseli(t, w, h, 4, 9f, 2f).a);
            // Siiven reunaviiva on tummanruskea #5a3d10 (x = 1,4 ± 0,15).
            var reuna = Pikseli(t, w, h, 4, 1.4f, 2.7f);
            Oleta.Tosi(reuna.r < 0x90 && reuna.a > 0, $"siiven reuna tumma: {reuna.r:x2}");
        }

        [Testi] static void SykeKutenCss()
        {
            var (m0, p0) = IssPiirros.Syke(0);
            Oleta.Tosi(Math.Abs(m0 - 0.3f) < 1e-4 && Math.Abs(p0 - 0.95f) < 1e-4, $"alku {m0} {p0}");
            var (m1, p1) = IssPiirros.Syke(IssPiirros.SykeKestoS);
            Oleta.Tosi(Math.Abs(m1 - 1f) < 1e-4 && p1 < 1e-4, $"loppu {m1} {p1}");
            // ease-out: puolivälissä yli puolet matkasta.
            var (mp, _) = IssPiirros.Syke(IssPiirros.SykeKestoS / 2);
            Oleta.Tosi(mp > 0.3f + 0.7f * 0.5f, $"ease-out {mp}");
            var rengas = IssPiirros.Rengas(176);
            int keski = (88 * 176 + 88) * 4, reunalla = (88 * 176 + 1) * 4;
            Oleta.Sama((byte)0, rengas[keski + 3], "rengas on ontto");
            Oleta.Tosi(rengas[reunalla + 3] > 150, "reunalla peitto 0,9");
        }

        [Testi] static void KiekonSisallaKutenWebissa()
        {
            Oleta.Tosi(IssPiirros.KiekonSisalla(100, 100, 100, 100, 50));
            Oleta.Tosi(IssPiirros.KiekonSisalla(148, 100, 100, 100, 50), "säde − 2 pt");
            Oleta.Tosi(!IssPiirros.KiekonSisalla(149, 100, 100, 100, 50), "reunan takana");
            Oleta.Tosi(!IssPiirros.KiekonSisalla(double.NaN, 100, 100, 100, 50));
            Oleta.Tosi(!IssPiirros.KiekonSisalla(100, 100, 100, 100, 0));
        }
    }
}
