// KUVATAAJUUDEN SÄÄSTÖKATOT (omistaja 11.10.2026, akku- ja lämpömittaus TF 180): pallokierros ja lämmin laite 40 fps
// ProMotionilla / 30 fps 60 Hz:n näytöllä, kartan lepo 10 fps ja piirto 2 s:n välein (Kartta/KuvataajuusPaatos.cs).
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KuvataajuusPaatosTestit
    {
        [Testi]
        static void KevennettyNaytonMukaan()
        {
            Oleta.Sama(40, KuvataajuusPaatos.Kevennetty(120), "ProMotion 120 Hz → 40 (joka 3. virkistys)");
            Oleta.Sama(30, KuvataajuusPaatos.Kevennetty(60), "60 Hz → 30 (40 ei jaa 60:tä tasan)");
            Oleta.Sama(30, KuvataajuusPaatos.Kevennetty(59), "pyöristetty 60 Hz");
        }

        [Testi]
        static void PalloKierrosKatetaanMyosViileana()
        {
            Oleta.Sama(40, KuvataajuusPaatos.Katto(120, 0, true), "pallo, viileä, ProMotion");
            Oleta.Sama(30, KuvataajuusPaatos.Katto(60, 0, true), "pallo, viileä, 60 Hz");
        }

        [Testi]
        static void LamminLaskeeJoEnnenKuumaa()
        {
            Oleta.Sama(0, KuvataajuusPaatos.Katto(120, 0, false), "viileä ilman palloa: ei kattoa");
            Oleta.Sama(40, KuvataajuusPaatos.Katto(120, 1, false), "fair (lämmin) → 40");
            Oleta.Sama(30, KuvataajuusPaatos.Katto(60, 1, false), "fair 60 Hz:llä → 30");
            Oleta.Sama(40, KuvataajuusPaatos.Katto(120, 2, false), "serious: Ruudunpaivityksen kuuma-katto 30 voittaa (pienempi)");
        }

        [Testi]
        static void SovellaOttaaPienemman()
        {
            Oleta.Sama(60, KuvataajuusPaatos.Sovella(60, 0), "ei kattoa");
            Oleta.Sama(40, KuvataajuusPaatos.Sovella(120, 40), "katto");
            Oleta.Sama(30, KuvataajuusPaatos.Sovella(30, 40), "kuuma 30 pysyy");
            Oleta.Sama(20, KuvataajuusPaatos.Sovella(20, 40), "kriittinen 20 pysyy");
        }

        [Testi]
        static void LevonPiirtovaliPysyyKahdessaSekunnissa()
        {
            Oleta.Sama(10, KuvataajuusPaatos.PaikallaanFps, "kartan lepo 10 Hz");
            Oleta.Sama(2f, KuvataajuusPaatos.PaikallaanVali / (float)KuvataajuusPaatos.PaikallaanFps, "piirto 2 s:n välein kuten ennen (30 fps × 60)");
        }
    }
}
