// KÄSIN PIIRRETTY KEHYS (Natiivi-UI, erä 3): webin karheaKehys (js/ilme.js,
// Rough.js: roughness 0,9, bowing 0,6, siemen 7) Painter2D:llä. Pyöristetty
// suorakulmio piirretään kahdesti hieman eri heilahduksella, kuten Rough.js:n
// kaksoisveto, jolloin reuna näyttää musteella vedetyltä. Satunnaisuus on
// siemenestä, joten kehys on joka piirrossa sama (ei väreile).
// Väri = USS border-color (kehyselementin reunaa ei piirretä, leveys 0).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KarheaKehys : VisualElement
    {
        public float Sade = 8f, Paksuus = 1.2f, Karheus = 0.9f;
        public int Siemen = 7;

        public KarheaKehys()
        {
            AddToClassList("mk-karhea-kehys");
            pickingMode = PickingMode.Ignore;
            generateVisualContent += Piirra;
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var r = contentRect;
            if (r.width < 8 || r.height < 8) return;
            var vari = resolvedStyle.borderTopColor;
            if (vari.a <= 0) vari = new Color(70 / 255f, 51 / 255f, 31 / 255f, 0.78f);
            var p = mgc.painter2D;
            p.strokeColor = vari;
            p.lineWidth = Paksuus;
            p.lineCap = LineCap.Round;
            p.lineJoin = LineJoin.Round;
            var satunnainen = new System.Random(Siemen);
            for (int veto = 0; veto < 2; veto++) Veto(p, r, satunnainen, veto == 0 ? 1f : 0.6f);
        }

        void Veto(Painter2D p, Rect r, System.Random s, float voima)
        {
            float H() => (float)(s.NextDouble() * 2 - 1) * Karheus * voima;
            float sade = Mathf.Min(Sade, Mathf.Min(r.width, r.height) / 2);
            // Kulmien keskipisteet ja sivujen pisteet heilahduksineen (bowing: sivun keskikohta taipuu).
            Vector2 K(float x, float y) => new Vector2(x + H(), y + H());
            var vy = new Vector2(r.xMin + sade, r.yMin + sade);
            var oy = new Vector2(r.xMax - sade, r.yMin + sade);
            var oa = new Vector2(r.xMax - sade, r.yMax - sade);
            var va = new Vector2(r.xMin + sade, r.yMax - sade);
            float taipuma = 0.6f * voima;
            p.BeginPath();
            p.MoveTo(K(r.xMin + sade, r.yMin));
            p.QuadraticCurveTo(K((r.xMin + r.xMax) / 2, r.yMin + H() * taipuma), K(r.xMax - sade, r.yMin));
            p.ArcTo(new Vector2(r.xMax, r.yMin) + new Vector2(H(), H()), K(r.xMax, oy.y), sade);
            p.QuadraticCurveTo(K(r.xMax + H() * taipuma, (r.yMin + r.yMax) / 2), K(r.xMax, oa.y));
            p.ArcTo(new Vector2(r.xMax, r.yMax) + new Vector2(H(), H()), K(oa.x, r.yMax), sade);
            p.QuadraticCurveTo(K((r.xMin + r.xMax) / 2, r.yMax + H() * taipuma), K(va.x, r.yMax));
            p.ArcTo(new Vector2(r.xMin, r.yMax) + new Vector2(H(), H()), K(r.xMin, va.y), sade);
            p.QuadraticCurveTo(K(r.xMin + H() * taipuma, (r.yMin + r.yMax) / 2), K(r.xMin, vy.y));
            p.ArcTo(new Vector2(r.xMin, r.yMin) + new Vector2(H(), H()), K(vy.x + H(), r.yMin), sade);
            p.Stroke();
        }
    }
}
