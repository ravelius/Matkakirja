// HISTORIAMOOTTORI E3 (Siirtoseppä 7.10.2026): kappelin kynttilät — sammutus ja sytytys, oma kynttilä, valoisuus havainnolle.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KynttilatTestit
    {
        static Kynttilat Uusi() => new Kynttilat(new List<(double, double, double)> { (0, 1, 0), (4, 1, 0), (8, 1, 0) });

        [Testi] static void SammutusJaOsuus()
        {
            var k = Uusi();
            Oleta.Sama(1.0, k.Osuus);
            var t = k.Valitse(0.5, 1, 0);
            Oleta.Sama(KynttilaToiminto.SammutaTilan, t.Toiminto); Oleta.Sama(0, t.Indeksi);
            k.Tee(t);
            Oleta.Tosi(!k.Palaa(0) && Math.Abs(k.Osuus - 2.0 / 3) < 1e-9, "yksi sammui");
            k.SammutaKaikki();
            Oleta.Sama(0, k.Palavia);
            Oleta.Sama(KynttilaToiminto.Ei, k.Valitse(0.5, 1, 0).Toiminto);   // ei omaa kynttilää
        }

        [Testi] static void OmaKynttilaSytyttaaJaPuhalletaan()
        {
            var k = Uusi(); k.SammutaKaikki(); k.OmaKynttila = true;
            var t = k.Valitse(2, 1, 0);
            Oleta.Sama(KynttilaToiminto.SytytaOma, t.Toiminto); k.Tee(t);
            Oleta.Tosi(k.OmaPalaa, "oma palaa");
            t = k.Valitse(4.3, 1, 0);
            Oleta.Sama(KynttilaToiminto.SytytaTilan, t.Toiminto); Oleta.Sama(1, t.Indeksi); k.Tee(t);
            Oleta.Tosi(k.Palaa(1), "tilan kynttilä syttyi omasta");
            k.Aseta(1, false);
            t = k.Valitse(2, 1, 0);
            Oleta.Sama(KynttilaToiminto.SammutaOma, t.Toiminto); k.Tee(t);
            Oleta.Tosi(!k.OmaPalaa, "puhallettu");
        }

        [Testi] static void ValoisuusPimeassaJaKynttilalla()
        {
            var k = Uusi();
            Oleta.Tosi(k.Valoisuus(0, 1, 1) > 0.7, "palavan vieressä valoisa");
            k.SammutaKaikki();
            Oleta.Tosi(Math.Abs(k.Valoisuus(0, 1, 1) - Kynttilat.PerusValo) < 1e-9, "pimeä");
            k.OmaKynttila = true; k.AsetaOma(true);
            Oleta.Tosi(k.Valoisuus(0, 1, 1, (0, 1, 1)) > 0.99, "oma kynttilä valaisee kantajan");
            Oleta.Tosi(k.Valoisuus(0, 1, 6, (0, 1, 1)) <= Kynttilat.PerusValo + 1e-9, "kauempana pimeää");
        }
    }
}
