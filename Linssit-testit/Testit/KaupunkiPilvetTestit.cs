// PALLON PILVIKERROS (Linssiseppä 2, 8.10.2026; PT 23.28, raportin kohta 6a): Ydin KaupunkiPilvet = varjostimen IlmPilviKerros-vertailu.
// Geometria (tasot, säteen matka, häivytys), Karttasepän peittokaava ja varjostimen vakiot samat kuin Ytimessä; varjot ja pilvet
// samasta kentästä (IlmPilvi kutsuu IlmPilviPeitto), jotta varjo osuu pilven alle.
using System;
using System.IO;
using Matkakirja.Linssit.Ilmakeha;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiPilvetTestit
    {
        static string Varjostimet => Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet");

        [Testi] static void TasotJaMatka()
        {
            Oleta.Sama(1600.0, KaupunkiPilvet.TasonKorkeus(0)); Oleta.Sama(2100.0, KaupunkiPilvet.TasonKorkeus(1)); Oleta.Sama(2600.0, KaupunkiPilvet.TasonKorkeus(2));
            // Pallo 300 m:ssä, katse 30° ylös (dy 0,5): pohjaan 2,6 km.
            Oleta.Tosi(Math.Abs(KaupunkiPilvet.Matka(300, 0.5, 1600) - 2600) < 1e-9, "matka pohjaan");
            Oleta.Sama(-1.0, KaupunkiPilvet.Matka(300, -0.1, 2000), "alas katsova säde ei osu");
            Oleta.Sama(-1.0, KaupunkiPilvet.Matka(2100, 0.5, 2000), "kamera pohjan yllä");
        }

        [Testi] static void HaivytysHorisonttiinJaKameranNoustessa()
        {
            Oleta.Sama(1.0, KaupunkiPilvet.Hiipuma(10000, 300), "lähellä täysi");
            Oleta.Sama(0.0, KaupunkiPilvet.Hiipuma(90000, 300), "horisontissa pois");
            Oleta.Tosi(KaupunkiPilvet.Hiipuma(60000, 300) > 0.2 && KaupunkiPilvet.Hiipuma(60000, 300) < 0.8, "välissä pehmeä");
            Oleta.Sama(0.0, KaupunkiPilvet.Hiipuma(5000, 1350), "kamera 250 m pohjan alla → pois");
            Oleta.Sama(1.0, KaupunkiPilvet.Hiipuma(5000, 900), "kamera 700 m pohjan alla → täysi");
        }

        [Testi] static void PeittoKarttasepanKaavalla()
        {
            // smoothstep(1 − p, 1 − p + 0,2, D − 0,15·(1 − G)): peitto 0 → ei pilviä; täysi tiheys ja yksityiskohta peitolla 0,5 → pilvi.
            Oleta.Sama(0.0, KaupunkiPilvet.Peitto(0.9, 1, 0), "peitto 0");
            Oleta.Sama(1.0, KaupunkiPilvet.Peitto(0.9, 1, 0.5), "tiheä kohta");
            Oleta.Tosi(KaupunkiPilvet.Peitto(0.6, 0, 0.5) < KaupunkiPilvet.Peitto(0.6, 1, 0.5), "yksityiskohta syö reunaa");
            Oleta.Sama(0.0, KaupunkiPilvet.TasonPeittoVahennys(0)); Oleta.Tosi(KaupunkiPilvet.TasonPeittoVahennys(2) > KaupunkiPilvet.TasonPeittoVahennys(1), "ylemmät vain ytimissä");
        }

        [Testi] static void VarjostinSamoillaVakioilla()
        {
            string h = File.ReadAllText(Path.Combine(Varjostimet, "Ilmakeha.hlsl")), t = File.ReadAllText(Path.Combine(Varjostimet, "IlmakehaTaivas.shader"));
            Oleta.Tosi(h.Contains(FormattableString.Invariant($"smoothstep({KaupunkiPilvet.HiipumaAlkuM:F1}, {KaupunkiPilvet.HiipumaLoppuM:F1}, t)")), "horisonttihäivytys 40–80 km");
            Oleta.Tosi(h.Contains(FormattableString.Invariant($"smoothstep(pohja - {2 * KaupunkiPilvet.KameraVaraM:F1}, pohja - {KaupunkiPilvet.KameraVaraM:F1}, kamera)")), "kameran häivytys");
            Oleta.Tosi(h.Contains("_IlmPilviParam.x - 0.12 * i"), "tasojen peitto (kumpu)");
            Oleta.Tosi(h.Contains("return IlmPilviPeitto(xz, _IlmPilviParam.x);"), "varjot samasta kentästä");
            Oleta.Tosi(h.Contains("smoothstep(1.0 - peitto, 1.0 - peitto + 0.2, D - 0.15 * (1.0 - G))"), "peittokaava");
            Oleta.Tosi(t.Contains("IlmPilviKerros(d)"), "kupoli piirtää pilvikerroksen");
        }
    }
}
