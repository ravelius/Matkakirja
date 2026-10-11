using System;

namespace Matkakirja
{
    /// <summary>
    /// KUVATAAJUUDEN SÄÄSTÖKATOT, puhtaat päätökset (omistajan kortti 11.10.2026 00.0x "40 kuvaa sekunnissa (suositus)";
    /// Natiivisepän akku- ja lämpömittaus TF 180, docs/raportit/natiiviseppa-akku-lampo-180.md): iPad Pro 13:lla Pariisin pallo
    /// 60 fps:llä täytti GPU:n (~100 %) ja vei laitteen normaalista kuumaksi 2 min 10 s:ssa; 30 fps:llä GPU-kuorma 45 %.
    /// Unity-kytkentä: <c>Ruudunpaivitys</c> (ainoa targetFrameRaten kirjoittaja). Testit: Kartta-testit/Testit/KuvataajuusPaatosTestit.cs.
    ///   1. PALLO: opas-linssin pallokierros enintään 40 fps ProMotion-näytöllä (120 Hz: tasan joka 3. virkistys), 60 Hz:n
    ///      näytöllä 30 fps (40 ei jaa 60:tä tasan → nykiminen) — myös viileänä.
    ///   2. LÄMMIN: iOS:n thermalState fair (1) laskee täyden taajuuden samaan kattoon jo ennen kuumaa (serious 2: Lampo.Kuuma,
    ///      30 fps ja renderScale 0,7 kuten ennen). Muut kuuman kevennykset (renderScale, bloom, MSAA) vain kuumana.
    ///   3. KARTAN LEPO: PAIKALLAAN-tilan pelisilmukka 30 → 10 Hz; piirtoväli 60 → 20 kehystä, joten piirto pysyy 2 s:n välein.
    ///      Kosketus tai muutos nostaa taajuuden seuraavassa kehyksessä (enintään 100 ms).
    /// </summary>
    public static class KuvataajuusPaatos
    {
        public const int ProMotionFps = 40, KuusikymmentaFps = 30;
        /// <summary>PAIKALLAAN-tilan pelisilmukka (ennen Ruudunpaivitys.LepoFps 30).</summary>
        public const int PaikallaanFps = 10;
        /// <summary>PAIKALLAAN-tilan piirtoväli kehyksinä: 10 fps:llä 2 s kuten ennen (30 fps × 60).</summary>
        public const int PaikallaanVali = 20;
        /// <summary>thermalState, josta lämmin-katto alkaa (fair).</summary>
        public const int LamminThermal = 1;

        /// <summary>Kevennetty taajuus näytön mukaan: ProMotion (yli 60 Hz) 40, muuten 30.</summary>
        public static int Kevennetty(int naytto) => naytto > 60 ? ProMotionFps : KuusikymmentaFps;

        /// <summary>
        /// Säästökatto (Hz) tai 0 = ei kattoa: pallokierros tai lämmin laite → <see cref="Kevennetty"/>.
        /// Kuuma ja kriittinen hoidetaan Ruudunpaivityksessä (30 / 20 fps), ja pienempi katto voittaa.
        /// </summary>
        public static int Katto(int naytto, int thermalState, bool palloKierros) =>
            palloKierros || thermalState >= LamminThermal ? Kevennetty(naytto) : 0;

        /// <summary>Katto sovellettuna taajuuteen (0 = ei kattoa).</summary>
        public static int Sovella(int fps, int katto) => katto > 0 ? Math.Min(fps, katto) : fps;
    }
}
