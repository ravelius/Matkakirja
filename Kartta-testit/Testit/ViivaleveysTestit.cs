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
        [Testi]
        static void AluerajatVastaMaanakymasta()
        {
            // Löydös 74 d: iPhonen avaruuspallo (halkaisija ~560 laitepikseliä) = säde 280 px → keskellä 280 · π/180 ≈ 4,9 px/°.
            double avaruus = 280.0 * Math.PI / 180.0;
            double raja = Vektorisolut.RajatTiheys;
            Oleta.Tosi(raja == 30, "web VEKTORIT_RAJAT_PX_ASTE 30");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, avaruus, raja, 1f) == 0f, "avaruudessa piilossa");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(1f, true, avaruus, raja, 1f) == 0f, "loitonnus häivyttää pois");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, 30, raja, 1f) == 1f, "maanäkymässä näkyvissä");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, double.NaN, raja, 1f) == 0f, "NaN = kaukana");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(1f, false, 240, raja, 1f) == 0f, "linssissä pois");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, 0, 0, 0f, 0f) == 1f, "raja 0 ja kesto 0 = heti näkyvissä");
        }

        [Testi]
        static void AluerajojenHaiveKuinWebissa()
        {
            // Web VEKTORIT_HAIVE_MS 260: puolivälissä 0,13 s:n jälkeen, perillä 0,26 s:ssa, ei yli.
            float h = 0f;
            for (int i = 0; i < 13; i++) h = Viivaleveys.AluerajaHaive(h, true, 100, 30, 0.01f);
            Oleta.Tosi(Math.Abs(h - 0.5f) < 1e-3f, "puolivälissä " + h);
            for (int i = 0; i < 20; i++) h = Viivaleveys.AluerajaHaive(h, true, 100, 30, 0.01f);
            Oleta.Tosi(h == 1f, "perillä " + h);
            h = Viivaleveys.AluerajaHaive(h, true, 10, 30, 0.13f);
            Oleta.Tosi(Math.Abs(h - 0.5f) < 1e-3f, "ulos samaa tahtia " + h);
            Oleta.Tosi(Viivaleveys.AluerajaHaive(float.NaN, true, 100, 30, -1f) == 0f, "NaN ja negatiivinen dt eivät liikuta");
        }
    }
}
