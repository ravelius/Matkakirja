// PERGAMENTTIKORTTI: verkkopelin .dialog-card (Natiivi-UI, erä 1).
//
// Pergamentti = säteittäinen liukuväri × paperin rae (Kuviot.Pergamentti),
// reuna 1 px rgba(70,51,31,.45), käsin piirretyt epätasaiset kulmat
// (--sketch-radius, USS:ssä kulmakohtaiset säteet), varjo (0 18 50 rgba(0,0,0,.5):
// USS:ssä ei box-shadowta, joten alle tumma, pehmeäreunainen levy) ja toinen,
// hieman kierretty katkoviivareuna (.dialog-card::before: inset −6, dashed,
// rgba(70,51,31,.32), rotate −0,45°), joka piirretään Painter2D:llä.
// Sisääntulo: card-in 0,32 s (nousee 16 pt, kiertyy −1,2° → 0, skaalautuu 0,97 → 1).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kortti : VisualElement
    {
        /// <summary>Korttiin lisättävä sisältö (pehmusteiden sisällä).</summary>
        public readonly VisualElement Sisus;
        readonly VisualElement varjo, kehys;

        public Kortti(string luokka = null)
        {
            AddToClassList("mk-kortti-kehys");
            Rakenne.Luokat(this, luokka);
            pickingMode = PickingMode.Ignore;

            varjo = Rakenne.El("mk-kortti__varjo", this, PickingMode.Ignore);
            kehys = new Katkoviiva();
            kehys.AddToClassList("mk-kortti__katkoviiva");
            Add(kehys);
            Sisus = Rakenne.El("mk-kortti", this);
            Rakenne.Tausta(Sisus, Kuviot.Pergamentti);
            Kirjasimet.Aseta(Sisus, Kirjasin.Luku);
        }

        /// <summary>Katkoviivainen pyöristetty suorakulmio (väri = USS border-color, paksuus 1).</summary>
        sealed class Katkoviiva : VisualElement
        {
            public Katkoviiva()
            {
                pickingMode = PickingMode.Ignore;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width < 4 || r.height < 4) return;
                var p = mgc.painter2D;
                p.strokeColor = resolvedStyle.borderTopColor.a > 0 ? resolvedStyle.borderTopColor : new Color(70 / 255f, 51 / 255f, 31 / 255f, 0.32f);
                p.lineWidth = 1f;
                p.lineCap = LineCap.Butt;
                // --sketch-radius-alt: kulmat eri säteillä (vasen ylä, oikea ylä, oikea ala, vasen ala).
                float a = Mathf.Min(18, r.height / 2), b = Mathf.Min(26, r.height / 2), c = Mathf.Min(16, r.height / 2), d = Mathf.Min(28, r.height / 2);
                var pisteet = Kaaret(r, a, b, c, d);
                const float Viiva = 5f, Vali = 4f;
                float kertyma = 0; bool piirto = true;
                p.BeginPath();
                p.MoveTo(pisteet[0]);
                for (int i = 1; i < pisteet.Length; i++)
                {
                    var alku = pisteet[i - 1]; var loppu = pisteet[i];
                    float pituus = Vector2.Distance(alku, loppu), kuljettu = 0;
                    while (kuljettu < pituus)
                    {
                        float raja = (piirto ? Viiva : Vali) - kertyma;
                        float askel = Mathf.Min(raja, pituus - kuljettu);
                        kuljettu += askel; kertyma += askel;
                        var kohta = Vector2.Lerp(alku, loppu, kuljettu / pituus);
                        if (piirto) p.LineTo(kohta); else p.MoveTo(kohta);
                        if (kertyma >= (piirto ? Viiva : Vali) - 1e-3f) { piirto = !piirto; kertyma = 0; }
                    }
                }
                p.Stroke();
            }

            static Vector2[] Kaaret(Rect r, float vy, float oy, float oa, float va)
            {
                var lista = new System.Collections.Generic.List<Vector2>();
                void Kaari(Vector2 keski, float sade, float alkuAst)
                {
                    for (int i = 0; i <= 8; i++)
                    {
                        float t = (alkuAst + 90f * i / 8f) * Mathf.Deg2Rad;
                        lista.Add(keski + new Vector2(Mathf.Cos(t), Mathf.Sin(t)) * sade);
                    }
                }
                // Paneelin y kasvaa alaspäin: 180° = vasen, 270° = ylä.
                Kaari(new Vector2(r.xMin + vy, r.yMin + vy), vy, 180);
                Kaari(new Vector2(r.xMax - oy, r.yMin + oy), oy, 270);
                Kaari(new Vector2(r.xMax - oa, r.yMax - oa), oa, 0);
                Kaari(new Vector2(r.xMin + va, r.yMax - va), va, 90);
                lista.Add(lista[0]);
                return lista.ToArray();
            }
        }
    }
}
