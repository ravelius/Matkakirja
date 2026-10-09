// UI-RUUTU (Natiivi-UI 9.10.2026, Päätoimittajan asettelutesti): ruudun koko, turva-alue ja tiheys yhdestä paikasta.
// Asettelutesti (Editor/Testit/AsetteluTestit.cs) antaa testikoon (iPhone ja iPad, pysty ja vaaka), jolloin UiKerros
// piirtää paneelit kiinteän kokoiseen tekstuuriin ja asettelukoodi laskee samoista arvoista ilman simulaattoria.
// Ilman testikokoa arvot tulevat Screenistä sellaisenaan (pelin toiminta ei muutu).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class UiRuutu
    {
        /// <summary>Testikoko pikseleinä (origo vasen alakulma kuten Screen.safeArea).</summary>
        public struct Koko
        {
            public int Leveys, Korkeus;
            public Rect Turva;
            public float PikseliaPisteessa;
            public bool Tabletti;
        }

        /// <summary>Asettelutestin koko; null = laitteen ruutu.</summary>
        public static Koko? Testi;

#if UNITY_EDITOR
        /// <summary>Ympäristömuuttuja, jolla editorin asettelutesti välittää koon Play-tilan domain reloadin yli:
        /// "leveys,korkeus,turvaX,turvaY,turvaL,turvaK,pikseliäPisteessä,tabletti(0|1)".</summary>
        public const string TestiMuuttuja = "MATKAKIRJA_UI_TESTIKOKO";

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void LueTestikoko()
        {
            Testi = null;
            var o = (System.Environment.GetEnvironmentVariable(TestiMuuttuja) ?? "").Split(',');
            if (o.Length != 8) return;
            var ic = System.Globalization.CultureInfo.InvariantCulture;
            float F(int i) => float.Parse(o[i], ic);
            Testi = new Koko { Leveys = (int)F(0), Korkeus = (int)F(1), Turva = new Rect(F(2), F(3), F(4), F(5)), PikseliaPisteessa = F(6), Tabletti = o[7] == "1" };
            Debug.Log($"MATKAKIRJA ui: asettelutestin koko {Testi.Value.Leveys}×{Testi.Value.Korkeus} @{Testi.Value.PikseliaPisteessa}");
        }
#endif

        public static int Leveys => Testi?.Leveys ?? Screen.width;
        public static int Korkeus => Testi?.Korkeus ?? Screen.height;
        public static Rect Turva => Testi?.Turva ?? Screen.safeArea;
    }
}
