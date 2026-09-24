// VU-MITTARIN NÄKYMÄ radiolinssille (BUILD 7, omistaja 24.9.2026). UI Toolkit -elementti, jonka
// Natiivi-UI sijoittaa radion koteloon: VuMittariNakyma.Luo(() => radio.Mittari).
//
// EI REPAINT-PIIKKEJÄ (ui piikit 24.9.: radion paneeli piirtyi uudelleen joka kehys, 15 ms). Asteikko,
// kaari, jaot ja luvut piirretään KERRAN (generateVisualContent muuttuu vain koon vaihtuessa). Joka
// kehys käännetään vain neulaelementtiä (style.rotate, UsageHints.DynamicTransform), mikä on pelkkä
// muunnosmatriisi eikä uusi tessellointi; kun neula on levossa tai kulma ei muutu, mitään ei aseteta.
//
// Mitat ja värit webin poistetusta mittarista (radiosoitin.js MITTARIN_KUVA 112 × 80, napa 56/76,
// kaari 54, neula 58, kulma ±48°; css/radio.css v267: kermanvärinen levy, tumma kehys, punainen nollasta ylös).
using System;
using System.Linq;
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class VuMittariNakyma : VisualElement
    {
        const float KuvaL = 112, KuvaK = 80, NapaX = 56, NapaY = 76, Kaari = 54, Neula = 58;
        static readonly Color Levy = new Color32(0xe5, 0xd7, 0xb2, 0xff);
        static readonly Color Kehys = new Color32(24, 15, 6, 217);
        static readonly Color Muste = new Color32(0x3b, 0x2a, 0x17, 0xff);
        static readonly Color Puna = new Color32(0xa8, 0x32, 0x1f, 0xff);
        static readonly Color NeulanVari = new Color32(0x1f, 0x14, 0x0a, 0xff);

        readonly Func<VuMittari> lahde;
        readonly VisualElement neula;
        float piirrettyKulma = float.NaN;

        /// <summary>Uusi mittari; lahde palauttaa auki olevan radion mittarin (null = lepo).</summary>
        public static VuMittariNakyma Luo(Func<VuMittari> lahde) => new VuMittariNakyma(lahde);

        VuMittariNakyma(Func<VuMittari> lahde)
        {
            this.lahde = lahde;
            name = "vu-mittari";
            AddToClassList("mk-vu-mittari");
            style.width = KuvaL;
            style.height = KuvaK;
            style.overflow = Overflow.Hidden;
            generateVisualContent += Piirra;
            RegisterCallback<GeometryChangedEvent>(_ => { AsetaLuvut(); MarkDirtyRepaint(); });

            neula = new VisualElement { name = "vu-neula", pickingMode = PickingMode.Ignore, usageHints = UsageHints.DynamicTransform };
            neula.style.position = Position.Absolute;
            neula.style.width = 2;
            neula.style.backgroundColor = NeulanVari;
            neula.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(100));
            Add(neula);
            pickingMode = PickingMode.Ignore;
            schedule.Execute(Paivita).Every(16);
        }

        bool levyKuvana;

        /// <summary>
        /// Radiouudistus (build 12): levy kuvaputken paperina (Resources/Radio/radio-vu-levy) piirretyn värin tilalle;
        /// mittari täyttää emonsa (koko USS:stä). null = entinen piirretty levy.
        /// </summary>
        public void KaytaLevya(Texture2D levy)
        {
            if (levy == null) return;
            levyKuvana = true;
            style.backgroundImage = new StyleBackground(levy);
            style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
            style.flexGrow = 1;
            MarkDirtyRepaint();
        }

        float Mittakaava => resolvedStyle.width > 0 && !float.IsNaN(resolvedStyle.width) ? resolvedStyle.width / KuvaL : 1;

        static Vector2 Piste(float osuus, float r, float s)
        {
            float a = (2 * osuus - 1) * (float)VuMittari.Kulma * Mathf.Deg2Rad;
            return new Vector2((NapaX + r * Mathf.Sin(a)) * s, (NapaY - r * Mathf.Cos(a)) * s);
        }

        void Piirra(MeshGenerationContext mgc)
        {
            float s = Mittakaava;
            var p = mgc.painter2D;
            // Levy ja kehys (kuvana piirretty levy ja messinkikehys tulevat radion paneelilta).
            if (!levyKuvana)
            {
                p.fillColor = Levy;
                p.BeginPath();
                p.MoveTo(Vector2.zero); p.LineTo(new Vector2(KuvaL * s, 0)); p.LineTo(new Vector2(KuvaL * s, KuvaK * s)); p.LineTo(new Vector2(0, KuvaK * s));
                p.ClosePath();
                p.Fill();
                p.strokeColor = Kehys;
                p.lineWidth = 2 * s;
                p.Stroke();
            }
            // Asteikkokaari: musta nollaan asti, punainen siitä ylös.
            float alku = -90 - (float)VuMittari.Kulma, loppu = -90 + (float)VuMittari.Kulma;
            float punainen = alku + (loppu - alku) * (float)VuMittari.Punainen;
            var napa = new Vector2(NapaX * s, NapaY * s);
            p.lineWidth = 1.2f * s;
            p.strokeColor = Muste;
            p.BeginPath(); p.Arc(napa, Kaari * s, alku, punainen); p.Stroke();
            p.strokeColor = Puna;
            p.lineWidth = 2.4f * s;
            p.BeginPath(); p.Arc(napa, Kaari * s, punainen, loppu); p.Stroke();
            // Jaot.
            foreach (var j in VuMittari.Jaot)
            {
                p.strokeColor = j.Punainen ? Puna : Muste;
                p.lineWidth = (j.Pitka ? 1.2f : 0.8f) * s;
                p.BeginPath();
                p.MoveTo(Piste((float)j.Osuus, Kaari - (j.Pitka ? 7 : 4), s));
                p.LineTo(Piste((float)j.Osuus, Kaari, s));
                p.Stroke();
            }
            // Napa.
            p.fillColor = NeulanVari;
            p.BeginPath(); p.Arc(napa, 3.2f * s, 0, 360); p.Fill();
        }

        void AsetaLuvut()
        {
            float s = Mittakaava;
            foreach (var l in Children().OfType<Label>().ToArray()) l.RemoveFromHierarchy();
            foreach (var j in VuMittari.Jaot)
            {
                if (j.Teksti == null) continue;
                var paikka = Piste((float)j.Osuus, Kaari + 9, s);
                var l = new Label(j.Teksti) { pickingMode = PickingMode.Ignore };
                l.style.position = Position.Absolute;
                l.style.left = paikka.x - 12 * s;
                l.style.top = paikka.y - 6 * s;
                l.style.width = 24 * s;
                l.style.unityTextAlign = TextAnchor.MiddleCenter;
                l.style.fontSize = 8 * s;
                l.style.color = j.Punainen ? Puna : Muste;
                l.style.paddingLeft = l.style.paddingRight = l.style.paddingTop = l.style.paddingBottom = 0;
                l.style.marginLeft = l.style.marginRight = l.style.marginTop = l.style.marginBottom = 0;
                Insert(0, l);
            }
            neula.style.left = NapaX * s - 1;
            neula.style.top = (NapaY - Neula) * s;
            neula.style.height = Neula * s;
            piirrettyKulma = float.NaN;
        }

        void Paivita()
        {
            var m = lahde?.Invoke();
            float kulma = (float)(m != null ? m.KulmaAsteina : (2 * VuMittari.Lepo - 1) * VuMittari.Kulma);
            if (!float.IsNaN(piirrettyKulma) && Mathf.Abs(kulma - piirrettyKulma) < 0.05f) return;
            piirrettyKulma = kulma;
            neula.style.rotate = new Rotate(new Angle(kulma, AngleUnit.Degree));
        }
    }
}
