// Löydös 171 (Natiiviseppä 26.9.2026): saapumisen kiire ja vartija (Kartta/SaapumisKiire.cs): jonon valinta, näkyvän
// jonon raja, esilatauksen ja saapumisjonon tauot, lennon hidastus loppuorbitissa ja valmiuspäätös.
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class SaapumisKiireTestit
    {
        [Testi]
        static void JononValintaSailyttaaEntisen()
        {
            // Cesiumin omat: väritaso (kerma, Sentinel) kiireeseen, muut näkyvään (163b ennallaan).
            Oleta.Sama(SaapumisKiire.Jono.Nakyva, SaapumisKiire.Valitse(false, false, false, false, false, false));
            Oleta.Sama(SaapumisKiire.Jono.Kiire, SaapumisKiire.Valitse(false, true, false, false, false, false));
            // Esilataukset kuten ennen: verhon reitin ja kohdealueen väritaso kiireeseen, kohdealue omaan jonoonsa, tausta
            // taustaan, muut esilatausjonoon (myös verhon reitin pohja).
            Oleta.Sama(SaapumisKiire.Jono.Kiire, SaapumisKiire.Valitse(true, true, true, false, false, false));
            Oleta.Sama(SaapumisKiire.Jono.Kiire, SaapumisKiire.Valitse(true, true, false, true, false, false));
            Oleta.Sama(SaapumisKiire.Jono.Kohde, SaapumisKiire.Valitse(true, false, false, true, false, false));
            Oleta.Sama(SaapumisKiire.Jono.Tausta, SaapumisKiire.Valitse(true, false, false, false, false, true));
            Oleta.Sama(SaapumisKiire.Jono.Esi, SaapumisKiire.Valitse(true, false, true, false, false, false));
            Oleta.Sama(SaapumisKiire.Jono.Esi, SaapumisKiire.Valitse(true, false, false, false, false, false));
            // Taustan väritaso (erä 2 kerma) ei mene kiireeseen.
            Oleta.Sama(SaapumisKiire.Jono.Tausta, SaapumisKiire.Valitse(true, true, false, false, false, true));
        }

        [Testi]
        static void KohdemaanSaapuminenKiireella()
        {
            // Löydös 171: kohdemaan pohja, maasto ja kerma saapumisjonoon (ei taustaan eikä esilatausjonoon; kerma ei kiirejonoon,
            // jotta näkyvän jonon etusija säilyy, 163b).
            Oleta.Sama(SaapumisKiire.Jono.Saapuminen, SaapumisKiire.Valitse(true, true, false, false, true, false));
            Oleta.Sama(SaapumisKiire.Jono.Saapuminen, SaapumisKiire.Valitse(true, false, false, false, true, false));
        }

        [Testi]
        static void NakyvanJononRaja()
        {
            Oleta.Sama(12, SaapumisKiire.NakyvaRaja(12, 24, false, false));
            Oleta.Sama(24, SaapumisKiire.NakyvaRaja(12, 24, true, false));
            Oleta.Sama(24, SaapumisKiire.NakyvaRaja(12, 24, false, true));
            Oleta.Sama(30, SaapumisKiire.NakyvaRaja(30, 24, false, true));
        }

        [Testi]
        static void TauotVerhossaJaSaapumisessa()
        {
            // Esilatausjono: verhon reitti aina; muut vain, kun verhoa eikä saapumistilaa ole.
            Oleta.Tosi(SaapumisKiire.EsiPalvellaan(false, false, false));
            Oleta.Tosi(!SaapumisKiire.EsiPalvellaan(true, false, false));
            Oleta.Tosi(!SaapumisKiire.EsiPalvellaan(false, true, false));
            Oleta.Tosi(SaapumisKiire.EsiPalvellaan(true, true, true));
            // Saapumisjono: ei verhon aikana (musta verho ja aloitusverho eivät pitene), saapumistilassa kyllä.
            Oleta.Tosi(SaapumisKiire.SaapumisPalvellaan(false, false));
            Oleta.Tosi(!SaapumisKiire.SaapumisPalvellaan(true, false));
            Oleta.Tosi(SaapumisKiire.SaapumisPalvellaan(true, true));
        }

        [Testi]
        static void HidastusVainLoppuorbitissaJaKesken()
        {
            const double kierto = 0.7;
            Oleta.Sama(1.0, SaapumisKiire.Aikakerroin(0.5, kierto, 0.2, 0));          // ennen orbitia
            Oleta.Sama(SaapumisKiire.Hidastus, SaapumisKiire.Aikakerroin(0.8, kierto, 0.2, 0));
            Oleta.Sama(1.0, SaapumisKiire.Aikakerroin(0.8, kierto, SaapumisKiire.Kynnys, 0));   // laatat levyllä
            Oleta.Sama(1.0, SaapumisKiire.Aikakerroin(0.8, kierto, -1, 0));            // ei esilatausta (korjaus pois)
            Oleta.Sama(1.0, SaapumisKiire.Aikakerroin(0.8, kierto, 0.2, SaapumisKiire.LisaaEnintaanS));
            Oleta.Sama(1.0, SaapumisKiire.Aikakerroin(1.0, kierto, 0.2, 0));           // perillä
        }

        [Testi]
        static void LisaaikaEiYlitaKattoa()
        {
            // 60 Hz, hidastus koko ajan: lisäaika kasvaa dt · 0,5 ja pysähtyy kattoon.
            double lisa = 0, t = 0.75, kesto = 12.0;
            for (int i = 0; i < 60 * 20; i++)
            {
                double k = SaapumisKiire.Aikakerroin(t, 0.7, 0.1, lisa);
                double d = SaapumisKiire.Lisa(1.0 / 60, k, lisa);
                Oleta.Tosi(d >= 0, "ei negatiivista");
                lisa += d;
                t = System.Math.Min(1.0, t + (1.0 / 60 - d) / kesto);
            }
            Oleta.Tosi(System.Math.Abs(lisa - SaapumisKiire.LisaaEnintaanS) < 1e-9, $"lisä {lisa}");
            Oleta.Sama(1.0, t);
            // Normaalinopeudella ei lisää.
            Oleta.Sama(0.0, SaapumisKiire.Lisa(1.0 / 60, 1.0, 0));
        }

        [Testi]
        static void KermanKarkeatTasotKattavatMitatut()
        {
            // d-era1 (kylmä aloituslento Ateenaan): kortin alla verkosta haetut kerman Z3–Z5-laatat kuuluvat listaan.
            var l = SaapumisKiire.KermaMaailma(37.98, 23.73);
            var joukko = new System.Collections.Generic.HashSet<(int, int, int)>(l);
            Oleta.Sama(l.Count, joukko.Count, "ei kaksoiskappaleita");
            Oleta.Sama(64 + 16 * 12 + 32 * 14, l.Count);   // Z3 kaikki, Z4 rivit 2–13, Z5 rivit 9–22
            foreach (var t in new[] { (3, 3, 5), (4, 11, 11), (5, 11, 22), (3, 0, 0), (4, 0, 3), (4, 15, 13), (5, 0, 9), (5, 31, 22) })
                Oleta.Tosi(joukko.Contains(t), $"puuttuu {t}");
            // Z4 rivit 0–1 ja 14–15 (napa-alueet) ja Z5 rivit 8 ja 23 eivät kuulu (Cesium ei pyytänyt; mitattu Z4 rivit 3–13, Z5 9–22).
            Oleta.Tosi(!joukko.Contains((4, 5, 1)) && !joukko.Contains((4, 5, 14)) && !joukko.Contains((5, 5, 8)) && !joukko.Contains((5, 5, 23)));
            // Karkein ensin, tason sisällä kohdetta lähin (laatan keskipiste) ensin: Z3 sarake 4, rivi 2 tai 3 (Ateena 38° on
            // rivillä 3, mutta rivin 2 keskipiste on lähempänä).
            Oleta.Sama(3, l[0].z);
            Oleta.Tosi(l[0].x == 4 && (l[0].y == 2 || l[0].y == 3), $"{l[0]}");
            Oleta.Sama(5, l[l.Count - 1].z);
            Oleta.Sama((5, 18, 12), l[64 + 192]);
        }

        [Testi]
        static void Valmiuspaatos()
        {
            Oleta.Tosi(SaapumisKiire.Valmis(0, false, true));
            Oleta.Tosi(!SaapumisKiire.Valmis(1, false, true));     // lento tai kamera-ajo odottaa
            Oleta.Tosi(!SaapumisKiire.Valmis(0, true, true));      // kamera liikkuu
            Oleta.Tosi(!SaapumisKiire.Valmis(0, false, false));    // pallo kesken
            Oleta.Sama("valmis", SaapumisKiire.Paljastus(true, 50f));
            Oleta.Sama("kesken", SaapumisKiire.Paljastus(false, 93f));
            Oleta.Sama("EI VALMIS", SaapumisKiire.Paljastus(false, 31.8f));
        }
    }
}
