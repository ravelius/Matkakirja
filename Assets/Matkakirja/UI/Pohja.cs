// UI-POHJAT (omistaja 1.10.2026, docs/raportit/ui-pohjat-kartoitus-20261001.md): pohjien yhteiset säännöt koodissa.
// Arvot tulevat tyylikirjasta (Tyylikirja.cs, generoitu tyylikirja.json:sta); tänne vain niistä johdettu logiikka.
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Pohja
    {
        /// <summary>Leveysluokat: KAPEA &lt; 600 pt (iPhone pysty), KESKI 600–939 (iPhone vaaka, iPad pysty), LEVEÄ ≥ 940.</summary>
        public enum Luokka { Kapea, Keski, Levea }

        public static Luokka Leveys(float paneelinLeveys) =>
            paneelinLeveys < Tyylikirja.Leveys.Kapea ? Luokka.Kapea : paneelinLeveys < Tyylikirja.Leveys.Levea ? Luokka.Keski : Luokka.Levea;

        /// <summary>Sivukortin leveys (NOSTOKORTTI KESKI/LEVEÄ): sivukortti-mitta, mutta peitto enintään Peitto.Max % leveydestä.</summary>
        public static float Sivukortti(float paneelinLeveys) =>
            UnityEngine.Mathf.Round(UnityEngine.Mathf.Min(Tyylikirja.Leveys.Sivukortti, paneelinLeveys * Tyylikirja.Peitto.Max / 100f));

        /// <summary>
        /// NOSTOKORTTI-pohjan paikka: KAPEA alareunaan (korkeus Peitto.Max %, laajennettuna Peitto.Laajennettu %),
        /// KESKI/LEVEÄ sivukortti oikeaan reunaan yläpalkin alta alas. Palauttaa true, jos luokka on KAPEA.
        /// kiintea = korkeus asetetaan (ei vain katto): kortin koko ei muutu sisällön mukana (maakuntakortti, omistaja 29.9.).
        /// </summary>
        public static bool NostokortinPaikka(UnityEngine.UIElements.VisualElement kerros, UnityEngine.UIElements.VisualElement kortti,
            bool laajennettu, bool kiintea = false)
        {
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float kh = kerros.layout.height, kw = kerros.layout.width;
            if (float.IsNaN(kh) || kh <= 0 || float.IsNaN(kw) || kw <= 0) return true;
            float m = Tyylikirja.Vali.M;
            bool kapea = Leveys(kw - t.x - t.z) == Luokka.Kapea;
            kerros.style.justifyContent = kapea ? UnityEngine.UIElements.Justify.FlexEnd : UnityEngine.UIElements.Justify.FlexStart;
            kerros.style.alignItems = kapea ? UnityEngine.UIElements.Align.Center : UnityEngine.UIElements.Align.FlexEnd;
            // Sivukortti alkaa yläpalkin alta (turva-alue ei sisällä palkkia; 0c34c00e: kortti yläpalkin päällä iPadilla).
            float yla = kapea ? t.y : t.y + Ylapalkki.Varaus;
            kerros.style.paddingTop = UnityEngine.Mathf.Round(yla + m);
            kerros.style.paddingBottom = UnityEngine.Mathf.Round(t.w + m);
            kerros.style.paddingRight = UnityEngine.Mathf.Round(t.z + m);
            kerros.style.paddingLeft = UnityEngine.Mathf.Round(t.x + m);
            float tila = kh - yla - t.w - 2f * m;
            float h = kapea ? UnityEngine.Mathf.Min(tila, UnityEngine.Mathf.Round(kh * (laajennettu ? Tyylikirja.Peitto.Laajennettu : Tyylikirja.Peitto.Max) / 100f)) : tila;
            if (kortti.resolvedStyle.maxHeight.value != h) kortti.style.maxHeight = h;
            if (kiintea && kortti.style.height.value.value != h) kortti.style.height = h;
            return kapea;
        }
    }

    /// <summary>
    /// NOSTOKORTTI-pohjan vetokahva (KAPEA): ylös laajentaa, alas pienentää laajennetun ja sulkee muuten, napautus vaihtaa korkeutta. Kuten kartan
    /// nostokortissa (Nostokortti.EleAlkoi/KahvaIrti, todennettu laitteella): painallus ja irrotus mitataan KORTILLA
    /// TrickleDown-vaiheessa ennen lapsia, vyöhyke on kortin koko yläreuna (28 pt), ja kortti kaappaa osoittimen, jotta
    /// kortin ulkopuolelle päättyvä veto ylös tulee perille. (Ennen kahvan oma 120 × 26 pt elementti, joka ei saanut
    /// käsivetoa Ihmisen matkan kortissa: savuke 106, todennus f4f47679.)
    /// </summary>
    public sealed class Vetokahva
    {
        public readonly UnityEngine.UIElements.VisualElement Juuri;
        UnityEngine.Vector2 alku;
        int id = -1;
        const float Ylos = 20f, Alas = 40f, Napautus = 6f, Vyohyke = 28f;

        /// <summary>Kahvan veto käynnissä (kortin oma vieritys ja napautus väistävät).</summary>
        public bool Vetaa => id >= 0;

        public Vetokahva(UnityEngine.UIElements.VisualElement kortti, System.Action<bool> laajenna, System.Action sulje, System.Func<bool> laajennettu)
        {
            Juuri = Rakenne.El("mk-vetokahva", kortti, UnityEngine.UIElements.PickingMode.Ignore);
            Rakenne.El("mk-nosto__kahva", Juuri, UnityEngine.UIElements.PickingMode.Ignore);
            kortti.RegisterCallback<UnityEngine.UIElements.PointerDownEvent>(e =>
            {
                var r = kortti.worldBound;
                if (id >= 0 || Juuri.resolvedStyle.display == UnityEngine.UIElements.DisplayStyle.None
                    || !r.Contains(e.position) || e.position.y - r.y >= Vyohyke) return;
                id = e.pointerId;
                alku = e.position;
                // Ei StopPropagationia (kuten Nostokortti): yläreunan nappi saa painalluksen ja vie kaappauksen (CaptureOut → ei vetoa).
                kortti.CapturePointer(id);
            }, UnityEngine.UIElements.TrickleDown.TrickleDown);
            kortti.RegisterCallback<UnityEngine.UIElements.PointerUpEvent>(e =>
            {
                if (e.pointerId != id) return;
                if (kortti.HasPointerCapture(id)) kortti.ReleasePointer(id);
                id = -1;
                e.StopPropagation();
                float dy = e.position.y - alku.y;
                UnityEngine.Debug.Log($"MATKAKIRJA ui vetokahva: dy {dy:0}");
                // NOSTOKORTTI kohta 2 (omistaja 1.10. 11.17): laajennetusta alasveto palaa ensin 45 %:iin, vasta siitä sulkee.
                if (dy > Alas) { if (laajennettu()) laajenna(false); else sulje(); return; }
                if (dy < -Ylos) laajenna(true);
                else if (UnityEngine.Mathf.Abs(dy) < Napautus) laajenna(!laajennettu());
            }, UnityEngine.UIElements.TrickleDown.TrickleDown);
            kortti.RegisterCallback<UnityEngine.UIElements.PointerCaptureOutEvent>(_ => id = -1);
        }
    }
}
