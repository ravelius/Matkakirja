// LINSSIN SELITEKORTTI (Natiivi-UI): webin .linssi-selite (css/styles.css
// "Linssin selitekortti kartan nurkassa"). Kortti nojaa .event-toastin
// pohjaan: läpikuultava tumma rgba(46,33,20,.88) ja kultainen reuna
// rgba(217,161,59,.45), jotta värilaput luetaan sekä meren että mantereen
// päältä. Otsikko = linssin nimi kultana isoin kirjaimin; se on myös nappi,
// joka kutistaa kortin pelkäksi nimilapuksi ja avaa sen taas (omistaja
// 4.8.2026). Aloitustila on kutistettu, ja valinta säilyy istunnon yli linssistä
// toiseen (web linssiSelitePieni ??= true). Rivit: värilappu 12 × 12 (aineiston
// oma väri) ja teksti. Lähdettä EI ole kortissa (omistaja 4.8.2026, web
// piirraLinssiSelite): se on linssivalitsimen "Mistä tämä tieto on?" -kohdassa.
// Paikka (web sijoitaLinssiSelite): nurkka, jossa päiväkirja ei ole. Päiväkirja
// on natiivissa aina vasemmassa yläkulmassa, joten leveallä kartalla
// (≥ FACT_WIDTH + TURN_WIDTH + 40 = 940) kortti on vasemmassa alakulmassa ja
// kapealla (iPad pystyssä) oikeassa yläkulmassa linssinappien alla.
// Näkyy vain linssille, jolla on seliterivejä.
using System.Collections.Generic;
using Matkakirja.Linssit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiSelite
    {
        const float LeveaKartta = 340 + 560 + 40; // web FACT_WIDTH + TURN_WIDTH + 40

        readonly VisualElement kortti, runko, rivit;
        readonly Label otsikko;
        // Istunnon yli linssistä toiseen (web this.linssiSelitePieni ??= true).
        static bool pieni = true;

        public bool Nakyvissa { get; private set; }

        public LinssiSelite(UiKerros kerros)
        {
            var turva = kerros.Turva(LinssiUi.Kerros);
            kortti = Rakenne.El("mk-linssiselite", turva);
            kortti.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);

            var nimi = Rakenne.Nappi(null, "mk-linssiselite__nimi", Kutista, kortti);
            otsikko = Rakenne.Teksti("", "mk-linssiselite__otsikko", nimi);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            nimi.tooltip = "Kutista tai avaa selite";
            // Koko kortti on napautuspinta (web: kortin click → vaihdaLinssiSelite; nimi hoitaa omansa).
            kortti.RegisterCallback<ClickEvent>(e =>
            {
                e.StopPropagation();
                if (e.target is VisualElement v && (v == nimi || nimi.Contains(v))) return;
                Kutista();
            });

            runko = Rakenne.El("mk-linssiselite__runko", kortti, PickingMode.Ignore);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-linssiselite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            runko.Add(vieritys);
            rivit = Rakenne.El("mk-linssiselite__rivit", vieritys, PickingMode.Ignore);

            kerros.TurvaMuuttui += Asettele;
            turva.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
            Asettele();
        }

        void Asettele()
        {
            float leveys = kortti.parent?.layout.width ?? float.NaN;
            bool levea = !float.IsNaN(leveys) && leveys >= LeveaKartta;
            var s = kortti.style;
            // Web .linssi-selite[data-corner]: 0,5 rem reunoista, alakulmassa 0,9 rem alhaalta.
            s.left = levea ? 8 : StyleKeyword.Auto;
            s.bottom = levea ? 14 : StyleKeyword.Auto;
            s.right = levea ? StyleKeyword.Auto : 8;
            // Taikalasit ja "Sulje linssi" ovat oikeassa yläkulmassa (Linssivalitsin, LinssiUi): kortti niiden alle.
            s.top = levea ? StyleKeyword.Auto : Ylapalkki.Varaus + 8 + 48;
        }

        /// <summary>Linssin selite näkyviin (null tai ei rivejä = kortti pois).</summary>
        public void Nayta(LinssiTiedot t)
        {
            if (t == null || t.Selite == null || t.Selite.Count == 0) { Piilota(); return; }
            Nayta(t.Nimi ?? t.Id, t.Selite);
        }

        public void Nayta(string nimi, IReadOnlyList<SeliteRivi> selite)
        {
            otsikko.text = (nimi ?? "").ToUpperInvariant();
            rivit.Clear();
            foreach (var r in selite)
            {
                var rivi = Rakenne.El("mk-linssiselite__rivi", rivit, PickingMode.Ignore);
                var lappu = Rakenne.El("mk-linssiselite__lappu", rivi, PickingMode.Ignore);
                lappu.style.backgroundColor = Kuviot.Vari(r.Vari ?? "#888888");
                Rakenne.Teksti(r.Teksti ?? "", "mk-linssiselite__teksti", rivi);
            }
            AsetaPieni(pieni);
            Nakyvissa = true;
            Asettele();
            Rakenne.Nayta(kortti, true, 320);
        }

        public void Piilota()
        {
            if (!Nakyvissa) return;
            Nakyvissa = false;
            Rakenne.Nayta(kortti, false, 220);
        }

        void Kutista() => AsetaPieni(!pieni);

        void AsetaPieni(bool p)
        {
            pieni = p;
            kortti.EnableInClassList("mk-pieni", p);
            runko.style.display = p ? DisplayStyle.None : DisplayStyle.Flex;
        }
    }
}
