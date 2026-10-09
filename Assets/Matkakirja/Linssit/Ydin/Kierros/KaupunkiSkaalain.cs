// KAUPUNKINÄKYMÄN SKAALAIN (raportti pallo-unreal-vertailu-20261008.md / #4220 kohta 7: "STP tai TAA renderScalella 0,8–0,9,
// KaupunkiTerava päälle"; Päätoimittaja 9.10.: koodina testeineen; Natiiviseppä, juna 172). Moottoriton valinta: KaupunkiKuva
// (Unity) vie sen URP-assettiin ajallisen reunanpehmennyksen (KaupunkiKooste.Kaytossa) ollessa päällä.
//   - ei ajallista: renderScale 1, ei skaalainta, terävöitys asetuksen mukaan (entinen käytös täsmälleen)
//   - ajallinen + skaalain 0 (TAA): renderScale 1, TAA
//   - ajallinen + skaalain 1 (STP): renderScale 0,8–0,9 (oletus 0,85), STP (korvaa TAA:n, URP ajaa STP:n kun renderScale < 1),
//     terävöitys vähintään StpTerava (pienempi resoluutio pehmentää)
// Asetukset (asetukset.json): "kaupunki.Skaalain" 0|1 (oletus 1), "kaupunki.RenderScale" (oletus 0,85).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public struct SkaalainValinta
    {
        public bool Ajallinen, Stp;
        public float RenderScale, Terava;
    }

    public static class KaupunkiSkaalain
    {
        public const float StpMin = 0.8f, StpMax = 0.9f, StpOletus = 0.85f, StpTerava = 0.35f;

        public static SkaalainValinta Valitse(bool ajallinen, int skaalain, double renderScale, float terava)
        {
            var v = new SkaalainValinta { Ajallinen = ajallinen, Stp = false, RenderScale = 1f, Terava = Math.Max(0f, terava) };
            if (!ajallinen || skaalain != 1) return v;
            double r = double.IsNaN(renderScale) || renderScale <= 0 ? StpOletus : renderScale;
            v.Stp = true;
            v.RenderScale = (float)Math.Min(StpMax, Math.Max(StpMin, r));
            v.Terava = Math.Max(v.Terava, StpTerava);
            return v;
        }
    }
}
