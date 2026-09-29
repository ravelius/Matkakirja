// VU-MITTARIN NÄKYMÄ radiolinssille (BUILD 7, omistaja 24.9.2026). UI Toolkit -elementti, jonka
// Natiivi-UI sijoittaa radion koteloon: VuMittariNakyma.Luo(() => radio.Mittari).
//
// EI REPAINT-PIIKKEJÄ (ui piikit 24.9.: radion paneeli piirtyi uudelleen joka kehys, 15 ms). Asteikko,
// kaari, jaot ja luvut piirretään KERRAN (generateVisualContent muuttuu vain koon vaihtuessa). Joka
// kehys käännetään vain neulaelementtiä (style.rotate, UsageHints.DynamicTransform), mikä on pelkkä
// muunnosmatriisi eikä uusi tessellointi; kun neula on levossa tai kulma ei muutu, mitään ei aseteta.
//
// YKSINKERTAINEN JA TERÄVÄ (omistaja 29.9.2026: "VU-mittari ei ole paras mahdollinen"; Päätoimittajan katselmus):
// mittari täyttää emonsa, akseli on piilossa mittarin alapuolella, jolloin asteikkokaari on leveä ja täyttää leveyden
// (ennen kaari oli pieni vasemmassa yläkulmassa); kermanvärinen taulu lämpimällä taustavalolla (vaaleampi keskeltä),
// luvut −20 … +3, punainen alue nollasta ylös, pieni "VU"-teksti, ohut musta neula ja hillitty lasiheijastus.
// Kaikki piirretään UI:lla (ei kuvia); mitat lasketaan elementin koosta.
using System;
using System.Linq;
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class VuMittariNakyma : VisualElement
    {
        static readonly Color Taulu = new Color32(0xf4, 0xe6, 0xc2, 0xff), TauluReuna = new Color32(0xe2, 0xc9, 0x93, 0xff);
        static readonly Color Muste = new Color32(0x2e, 0x21, 0x12, 0xff);
        static readonly Color Puna = new Color32(0xb2, 0x2e, 0x1c, 0xff);
        static readonly Color NeulanVari = new Color32(0x14, 0x0e, 0x08, 0xff);
        /// <summary>Luvut asteikon kohdissa (VuMittari.Jaot: 0,28 = −10 ja 0,46 = −5).</summary>
        static readonly (double Osuus, string Teksti, bool Punainen)[] Luvut =
            { (0, "-20", false), (0.28, "-10", false), (0.46, "-5", false), (VuMittari.Punainen, "0", true), (1, "+3", true) };

        readonly Func<VuMittari> lahde;
        readonly VisualElement neula, heijastus;
        readonly Label vuTeksti;
        float piirrettyKulma = float.NaN;

        /// <summary>Uusi mittari; lahde palauttaa auki olevan radion mittarin (null = lepo).</summary>
        public static VuMittariNakyma Luo(Func<VuMittari> lahde) => new VuMittariNakyma(lahde);

        VuMittariNakyma(Func<VuMittari> lahde)
        {
            this.lahde = lahde;
            name = "vu-mittari";
            AddToClassList("mk-vu-mittari");
            style.flexGrow = 1;
            style.overflow = Overflow.Hidden;
            style.borderTopLeftRadius = style.borderTopRightRadius = style.borderBottomLeftRadius = style.borderBottomRightRadius = 3;
            // Lämmin taustavalo: vaaleampi keskeltä ylhäältä, reunoilta kellertävämpi.
            style.backgroundImage = new StyleBackground(Kuviot.Pysty("vu-taulu", Taulu, TauluReuna));
            generateVisualContent += Piirra;
            RegisterCallback<GeometryChangedEvent>(_ => { AsetaLuvut(); MarkDirtyRepaint(); });

            vuTeksti = new Label("VU") { pickingMode = PickingMode.Ignore };
            vuTeksti.style.position = Position.Absolute;
            vuTeksti.style.unityTextAlign = TextAnchor.MiddleCenter;
            vuTeksti.style.color = Muste;
            vuTeksti.style.unityFontStyleAndWeight = FontStyle.Bold;
            vuTeksti.style.paddingLeft = vuTeksti.style.paddingRight = vuTeksti.style.paddingTop = vuTeksti.style.paddingBottom = 0;
            vuTeksti.style.marginLeft = vuTeksti.style.marginRight = vuTeksti.style.marginTop = vuTeksti.style.marginBottom = 0;
            Add(vuTeksti);

            neula = new VisualElement { name = "vu-neula", pickingMode = PickingMode.Ignore, usageHints = UsageHints.DynamicTransform };
            neula.style.position = Position.Absolute;
            neula.style.backgroundColor = NeulanVari;
            neula.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(100));
            Add(neula);

            // Hillitty lasiheijastus yläosassa (vaalea liukuma läpinäkyvään).
            heijastus = new VisualElement { pickingMode = PickingMode.Ignore };
            heijastus.style.position = Position.Absolute;
            heijastus.style.left = 0; heijastus.style.right = 0; heijastus.style.top = 0;
            heijastus.style.height = Length.Percent(42);
            heijastus.style.backgroundImage = new StyleBackground(Kuviot.Pysty("vu-lasi", new Color(1, 1, 1, 0.22f), new Color(1, 1, 1, 0)));
            Add(heijastus);
            pickingMode = PickingMode.Ignore;
            schedule.Execute(Paivita).Every(16);
        }

        /// <summary>Entinen kuvaputken levy: ei enää käytössä (mittari piirretään), kutsu jätetään yhteensopivuuden vuoksi.</summary>
        public void KaytaLevya(Texture2D levy) { }

        // Geometria elementin koosta: kaari täyttää ~88 % leveydestä, kaaren huippu ~34 % korkeudesta, akseli alareunan alla.
        float L => float.IsNaN(resolvedStyle.width) ? 0 : resolvedStyle.width;
        float K => float.IsNaN(resolvedStyle.height) ? 0 : resolvedStyle.height;
        float Sade => 0.42f * L / Mathf.Sin((float)VuMittari.Kulma * Mathf.Deg2Rad);
        Vector2 Napa => new Vector2(L / 2f, 0.2f * K + Sade);

        Vector2 Piste(float osuus, float r)
        {
            float a = (2 * osuus - 1) * (float)VuMittari.Kulma * Mathf.Deg2Rad;
            var n = Napa;
            return new Vector2(n.x + r * Mathf.Sin(a), n.y - r * Mathf.Cos(a));
        }

        void Piirra(MeshGenerationContext mgc)
        {
            if (L <= 1 || K <= 1) return;
            var p = mgc.painter2D;
            float R = Sade, v = Mathf.Max(0.8f, K / 48f);
            // Asteikkokaari: musta nollaan asti, punainen (leveämpi) siitä ylös.
            float alku = -90 - (float)VuMittari.Kulma, loppu = -90 + (float)VuMittari.Kulma;
            float punainen = alku + (loppu - alku) * (float)VuMittari.Punainen;
            p.lineWidth = 1.1f * v;
            p.strokeColor = Muste;
            p.BeginPath(); p.Arc(Napa, R, alku, punainen); p.Stroke();
            p.strokeColor = Puna;
            p.lineWidth = 3.2f * v;
            p.BeginPath(); p.Arc(Napa, R + 1.1f * v, punainen, loppu); p.Stroke();
            // Jaot kaaren sisäpuolelle.
            foreach (var j in VuMittari.Jaot)
            {
                p.strokeColor = j.Punainen ? Puna : Muste;
                p.lineWidth = (j.Pitka ? 1.2f : 0.8f) * v;
                p.BeginPath();
                p.MoveTo(Piste((float)j.Osuus, R - (j.Pitka ? 6.5f : 3.8f) * v));
                p.LineTo(Piste((float)j.Osuus, R));
                p.Stroke();
            }
        }

        void AsetaLuvut()
        {
            if (L <= 1 || K <= 1) return;
            foreach (var l in Children().OfType<Label>().Where(l => l != vuTeksti).ToArray()) l.RemoveFromHierarchy();
            float v = Mathf.Max(0.8f, K / 48f), fontti = Mathf.Clamp(7.5f * v, 7f, 11f);
            // Luvut kaaren sisäpuolelle (laite rk1: kaaren yläpuolella ne leikkautuivat reunoilta); kapealla vain −20, 0 ja +3.
            bool kapea = L < 96;
            foreach (var (osuus, teksti, punainen) in Luvut)
            {
                if (kapea && (teksti == "-10" || teksti == "-5")) continue;
                var paikka = Piste((float)osuus, Sade - 6.5f * v - fontti * 0.9f);
                var l = new Label(teksti) { pickingMode = PickingMode.Ignore };
                l.style.position = Position.Absolute;
                l.style.left = paikka.x - 12;
                l.style.top = paikka.y - fontti * 0.7f;
                l.style.width = 24;
                l.style.unityTextAlign = TextAnchor.MiddleCenter;
                l.style.fontSize = fontti;
                l.style.color = punainen ? Puna : Muste;
                l.style.paddingLeft = l.style.paddingRight = l.style.paddingTop = l.style.paddingBottom = 0;
                l.style.marginLeft = l.style.marginRight = l.style.marginTop = l.style.marginBottom = 0;
                Insert(0, l);
            }
            vuTeksti.style.fontSize = fontti;
            // VU vasempaan alakulmaan: neula nousee alareunan keskeltä (laite rk2: keskellä teksti jäi neulan alle).
            vuTeksti.style.left = 0.06f * L; vuTeksti.style.right = StyleKeyword.Auto;
            vuTeksti.style.top = K - fontti * 1.5f;
            // Neula akselilta kaaren yli; näkyvä osa alkaa alareunasta (akseli piilossa).
            float pituus = Sade + 2f * v;
            neula.style.width = Mathf.Max(1.2f, 1.3f * v);
            neula.style.left = Napa.x - neula.style.width.value.value / 2f;
            neula.style.top = Napa.y - pituus;
            neula.style.height = pituus;
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
