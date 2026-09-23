// LINSSIN SELITEKORTTI (Natiivi-UI): webin .linssi-selite (css/styles.css
// "Linssin selitekortti kartan nurkassa"). Kortti nojaa .event-toastin
// pohjaan: läpikuultava tumma rgba(46,33,20,.88) ja kultainen reuna
// rgba(217,161,59,.45), jotta värilaput luetaan sekä meren että mantereen
// päältä. Otsikko = linssin nimi kultana isoin kirjaimin; se on myös nappi,
// joka kutistaa kortin pelkäksi nimilapuksi ja avaa sen taas (omistaja
// 4.8.2026). Rivit: värilappu 12 × 12 (aineiston oma väri) ja teksti; alla
// lähde (aineisto · lisenssi). Paikka: vasen alakulma (webissä nurkka, jossa
// päiväkirja ei ole; natiivissa pulu on oikeassa alakulmassa).
// Näkyy vain linssille, jolla on seliterivejä.
using System.Collections.Generic;
using Matkakirja.Linssit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiSelite
    {
        readonly VisualElement kortti, runko, rivit;
        readonly Label otsikko, lahde;
        bool pieni;

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

            runko = Rakenne.El("mk-linssiselite__runko", kortti, PickingMode.Ignore);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-linssiselite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            runko.Add(vieritys);
            rivit = Rakenne.El("mk-linssiselite__rivit", vieritys, PickingMode.Ignore);
            lahde = Rakenne.Teksti("", "mk-linssiselite__lahde", runko);

            kerros.TurvaMuuttui += Asettele;
            Asettele();
        }

        void Asettele()
        {
            float reuna = Screen.width > 1500 ? 16 : 8;
            kortti.style.left = reuna;
            kortti.style.bottom = reuna + 6;
        }

        /// <summary>Linssin selite näkyviin (null tai ei rivejä = kortti pois).</summary>
        public void Nayta(LinssiTiedot t)
        {
            if (t == null || t.Selite == null || t.Selite.Count == 0) { Piilota(); return; }
            Nayta(t.Nimi ?? t.Id, t.Selite, LahdeTeksti(t.Lahde));
        }

        public void Nayta(string nimi, IReadOnlyList<SeliteRivi> selite, string lahdeTeksti)
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
            lahde.text = lahdeTeksti ?? "";
            lahde.style.display = string.IsNullOrEmpty(lahdeTeksti) ? DisplayStyle.None : DisplayStyle.Flex;
            AsetaPieni(false);
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

        /// <summary>Lähderivi: "Lähde: aineisto · lisenssi" (webin .linssi-selite-lahde).</summary>
        public static string LahdeTeksti(Lahde l)
        {
            if (l == null) return null;
            var osat = new List<string>();
            if (!string.IsNullOrEmpty(l.Aineisto)) osat.Add(l.Aineisto);
            if (!string.IsNullOrEmpty(l.Lisenssi)) osat.Add(l.Lisenssi);
            return osat.Count == 0 ? null : "Lähde: " + string.Join(" · ", osat);
        }
    }
}
