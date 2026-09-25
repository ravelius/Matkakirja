// Löydös 46 jatko: pelaajan maan kehän leveys webin lain mukaan (Kartta/Viivaleveys.cs).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ViivaleveysTestit
    {
        [Testi]
        static void PaatteetKuinWebissa()
        {
            Oleta.Tosi(Viivaleveys.KehaPt(0) == 1.6 && Viivaleveys.KehaPt(25) == 1.6, "kaukana 1,6");
            Oleta.Tosi(Viivaleveys.KehaPt(250) == 3.0 && Viivaleveys.KehaPt(1000) == 3.0, "lähellä 3");
            Oleta.Tosi(Math.Abs(Viivaleveys.KehaPt(137.5) - 2.3) < 1e-12, "puolivälissä 2,3");
            Oleta.Tosi(Viivaleveys.KehaPt(double.NaN) == 1.6, "NaN = ohuin pää");
        }

        [Testi]
        static void KreikanNakymaIpadilla()
        {
            // iPad Pro 11" pysty: 2 420 px, fov 50°, korkeus 1 200 km → 2 420 / (2 · 1 200 · tan 25°) px/km × 111,2 km/°.
            double tiheys = 2420.0 / (2.0 * 1200.0 * Math.Tan(25.0 * Math.PI / 180.0)) * 111.2;
            double pt = Viivaleveys.KehaPt(tiheys);
            Oleta.Tosi(tiheys > 235 && tiheys < 250 && pt > 2.8 && pt <= 3.0, $"tiheys {tiheys:0}, {pt:0.00} pt");
            Oleta.Tosi(Math.Abs(Viivaleveys.NakyvaLaitePx(pt, 2) - (2 * pt + 0.5)) < 1e-12, "laitepikselit");
        }

        [Testi]
        static void OhitusVoittaa()
        {
            Oleta.Tosi(Viivaleveys.KehaPt(240, 1.2) == 1.2, "kiinteä 1,2 pt");
            Oleta.Tosi(Viivaleveys.KehaPt(240, 0) == Viivaleveys.KehaPt(240), "0 = webin laki");
        }

        [Testi]
        static void RannikkoOnPuoletKehasta()
        {
            Oleta.Tosi(Viivaleveys.Pt(250, Viivaleveys.RannikkoKaukana, Viivaleveys.RannikkoLahella) == 1.2, "rannikko 1,2");
        }
    }
}
