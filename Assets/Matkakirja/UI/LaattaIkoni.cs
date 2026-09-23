// LAATTAIKONI (Natiivi-UI, erä 4): löydön kuva tuloslaatikkoon.
//
// Verkkopelin tuloksessa (js/visa.js renderQuiz → aarreIkoni, 56 px) aarre
// näkyy laudan omana aarrekuvana pyöreäksi rajattuna, jos laattatyypillä on
// kuva (themedTokenTypes: kuva), ja muuten piirrosikonina (js/mapart.js
// drawTokenIcon, viewBox −13…13):
//   star        viisisakarainen tähti (#e8b23c, reuna #6d4d12)
//   pieniAarre  kolikkopino (kolme ellipsiä)
//   isoAarre, mannerAarre  kätköarkku
// Natiivin lauta on maailmankartta (Laatat.LautaId), jonka pääaarteella on
// kuva ämpärissä (js/packs/maailma.js: assets/aarteet/aarre-maailma-star.jpg,
// R2 kohtaamiset/aarteet/…); muilla tyypeillä sillä laudalla ei ole kuvaa,
// joten ne piirretään kuten webissä. Pöllön kuva (assets/tietaja/viisas-pollo.jpg)
// ei ole ämpärissä: sen tilalla on webin pöllö-viivaikoni.
// Erä 5: ohjaimen antama löydön oma kuva (KysymysNaytto.LoytoKuvaUrl, manner- tai
// maakohtainen aarre) on ensisijainen; piirrosikoni on varana, jos se ei lataudu.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LaattaIkoni : VisualElement
    {
        /// <summary>Laattatyyppien aarrekuvat (https); puuttuva = piirrosikoni.</summary>
        public static readonly Dictionary<string, string> AarreKuvat = new Dictionary<string, string>
        {
            ["star"] = Kuvat.PeiliJuuri + "kohtaamiset/aarteet/aarre-maailma-star.jpg",
        };

        static readonly Color Muste = Kuviot.Vari("#3b2a13");

        readonly string tyyppi;
        readonly VisualElement kuva;

        /// <summary>Onko tyypille kuva tai piirros (pöllö, aarteet, ryöstäjä).</summary>
        public static bool Tunnettu(string tyyppi) =>
            tyyppi == "star" || tyyppi == "pieniAarre" || tyyppi == "isoAarre"
            || tyyppi == "mannerAarre" || tyyppi == "pollo";

        public LaattaIkoni(string tyyppi, string kuvaUrl = null)
        {
            this.tyyppi = tyyppi;
            AddToClassList("mk-laattaikoni");
            pickingMode = PickingMode.Ignore;
            generateVisualContent += Piirra;
            if (tyyppi == "pollo")
            {
                var i = Rakenne.Ikoni(Ikonit.Viiva["pollo"], "mk-laattaikoni__pollo", this);
                i.style.color = Muste;
            }
            string url = !string.IsNullOrEmpty(kuvaUrl) ? kuvaUrl : AarreKuvat.TryGetValue(tyyppi ?? "", out var u) ? u : null;
            if (url != null)
            {
                kuva = Rakenne.El("mk-laattaikoni__kuva", this, PickingMode.Ignore);
                kuva.style.display = DisplayStyle.None;
                Kuvat.Hae(url, t =>
                {
                    if (t == null || kuva.panel == null) return; // piirrosikoni jää (web: onerror → tokenIconSvg)
                    kuva.style.backgroundImage = new StyleBackground(t);
                    kuva.style.display = DisplayStyle.Flex;
                    MarkDirtyRepaint();
                });
            }
        }

        void Piirra(MeshGenerationContext mgc)
        {
            if (tyyppi == "pollo" || (kuva != null && kuva.style.display == DisplayStyle.Flex)) return;
            var r = contentRect;
            float s = Mathf.Min(r.width, r.height) / 26f;
            if (float.IsNaN(s) || s <= 0) return;
            var o = r.center;
            Vector2 P(float x, float y) => o + new Vector2(x, y) * s;
            var p = mgc.painter2D;
            p.lineJoin = LineJoin.Round;
            p.lineCap = LineCap.Round;

            void Polku(string d, Color? tayta, Color? viiva, float leveys)
            {
                p.BeginPath();
                foreach (var k in SvgPolku.Jasenna(d).Komennot)
                {
                    switch (k.Laji)
                    {
                        case SvgPolku.Laji.Siirry: p.MoveTo(P(k.A.x, k.A.y)); break;
                        case SvgPolku.Laji.Viiva: p.LineTo(P(k.A.x, k.A.y)); break;
                        case SvgPolku.Laji.Kaari3: p.BezierCurveTo(P(k.A.x, k.A.y), P(k.B.x, k.B.y), P(k.C.x, k.C.y)); break;
                        case SvgPolku.Laji.Sulje: p.ClosePath(); break;
                    }
                }
                if (tayta.HasValue) { p.fillColor = tayta.Value; p.Fill(); }
                if (viiva.HasValue) { p.strokeColor = viiva.Value; p.lineWidth = leveys * s; p.Stroke(); }
            }
            string Ellipsi(float cx, float cy, float rx, float ry) =>
                Inv($"M{cx - rx} {cy}A{rx} {ry} 0 1 0 {cx + rx} {cy}A{rx} {ry} 0 1 0 {cx - rx} {cy}Z");

            switch (tyyppi)
            {
                case "star":
                    Polku("M0,-12 L3.5,-4 L12,-3.5 L5.6,2 L7.6,11 L0,6.4 L-7.6,11 L-5.6,2 L-12,-3.5 L-3.5,-4 Z",
                        Kuviot.Vari("#e8b23c"), Kuviot.Vari("#6d4d12"), 1.6f);
                    break;
                case "pieniAarre":
                    foreach (var cy in new[] { 6f, 1f, -4f })
                        Polku(Ellipsi(0, cy, 9, 3.4f), Kuviot.Vari("#c89a3c"), Muste, 1.5f);
                    break;
                default:
                    Polku("M-11,-1 q11,-8 22,0 l0,9 q-11,3 -22,0 z", Kuviot.Vari("#c89a3c"), Muste, 1.5f);
                    Polku("M-11,-1 L11,-1", null, Muste, 1.4f);
                    Polku("M-2,-2.5 L-2,4 M2,-2.5 L2,4", null, Muste, 1.4f);
                    break;
            }
        }

        static string Inv(System.FormattableString s) => System.FormattableString.Invariant(s);
    }
}
