using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// HEHKUPISTE TEKSTUURINA (löydös 125; web js/fokusnosto-symbolit.js piirraNostosymMiniCanvas, omistaja 21.9.2026:
    /// "eloton yksi väripallo, saisi olla hehkuvan näköinen"). Kartan pistemerkin harmaa häive (0,45 → 0 säteellä
    /// 0,7 r … 2,1 r) ja kiekko (sisus vaalennettu 0,42 vasemmalta ylhäältä, peitto 0,86) yhtenä kuvana, joka kattaa
    /// minimerkin ruudun 16 × 16 kirjaston yksikköä (−8 … 8), eli saman laatikon kuin Natiivi-UI:n kuvio
    /// (SvgIkoni Ruutu 16, Alku −8, −8): Natiivi-UI asettaa kuvan kuvion taustaksi ja piirtää musterenkaan päälle.
    /// Värit ja muodot NostoSaannot.Hehkupiste (puhdas, Kartta-testit). Peitto korjataan lineaariseen sekoitukseen
    /// pergamenttipohjalla (NimiLadonta.LineaarinenAlfa, kuten nimikerroksen värit), jotta häive ja kiekko näyttävät
    /// samalta kuin webin sRGB-canvasilla. Sykähdys (±7 %, 2,4 s levossa) jää pois: se pitäisi pallon hereillä
    /// PAIKALLAAN-tilassa (Ruudunpaivitys, lämpö) — webkin harventaa sen lepopiirtoon.
    /// </summary>
    public static class NostoHehku
    {
        /// <summary>Kuvan sivu tekseleinä: 16 yksikköä enintään mitalla 2 (22 px:n nimiökatto) = 32 pt = 96 px @3x.</summary>
        public const int Koko = 128;
        /// <summary>Kuvan sivu kirjaston yksiköinä (minimerkin ruutu, sama kuin Natiivi-UI:n kuvio).</summary>
        public const double Ruutu = 16.0;
        const int Alinaytteet = 4;

        static Texture2D kuva;

        /// <summary>Hehkupisteen kuva (luodaan kerran, mipit pieniä kokoja varten, ei luettavissa luonnin jälkeen).</summary>
        public static Texture2D Kuva => kuva != null ? kuva : (kuva = Luo());

        static Texture2D Luo()
        {
            var t = new Texture2D(Koko, Koko, TextureFormat.RGBA32, true, false)
            {
                name = "NostoHehku", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear,
            };
            t.SetPixels32(Tekselit());
            t.Apply(true, true);
            return t;
        }

        /// <summary>
        /// Tekselit rivi kerrallaan alhaalta ylös (Texture2D:n rivi 0 on kuvan alareuna): tekselin keskipiste
        /// yksiköinä, y alas kuten webin canvasilla; kiekon reunan kattavuus 4 × 4 alinäytteestä.
        /// </summary>
        public static Color32[] Tekselit()
        {
            var px = new Color32[Koko * Koko];
            double yks = Ruutu / Koko, r = NostoSaannot.PisteR, r2 = r * r;
            for (int j = 0; j < Koko; j++)
            for (int i = 0; i < Koko; i++)
            {
                double x = (i + 0.5) * yks - Ruutu / 2, y = Ruutu / 2 - (j + 0.5) * yks;
                int sisalla = 0;
                for (int sy = 0; sy < Alinaytteet; sy++)
                for (int sx = 0; sx < Alinaytteet; sx++)
                {
                    double xx = x + ((sx + 0.5) / Alinaytteet - 0.5) * yks, yy = y + ((sy + 0.5) / Alinaytteet - 0.5) * yks;
                    if (xx * xx + yy * yy <= r2) sisalla++;
                }
                var (cr, cg, cb, a) = NostoSaannot.Hehkupiste(x / r, y / r, sisalla / (double)(Alinaytteet * Alinaytteet));
                a = NimiLadonta.LineaarinenAlfa(new[] { cr, cg, cb }, a, NimiLadonta.PohjaMaa);
                px[j * Koko + i] = new Color32(Tavu(cr), Tavu(cg), Tavu(cb), Tavu(a));
            }
            return px;
        }

        static byte Tavu(double v) => (byte)Math.Round(Math.Min(1.0, Math.Max(0.0, v)) * 255.0);
    }
}
