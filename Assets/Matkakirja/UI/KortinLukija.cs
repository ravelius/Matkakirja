// KORTIN LUKIJA (Natiivi-UI): webin js/lukija.js lisaaLukijanappi — kaiutinkuvake tekstikortin
// otsikkoriville (omistaja 6.9.2026: "Kaikissa missä on tekstiä" luenta).
//
// Napautus lukee kortin tekstit kertojan äänellä (Puhe.Lue, persoona "kertoja") kappale
// kerrallaan; toinen napautus pysäyttää. Vain yksi luenta kerrallaan: uusi kortti tai toisen
// kortin kaiutin pysäyttää edellisen. Luennan aikana kuvake on kultainen (web .lukee #a8741a).
// Kertoja pois → vinoviiva ja nimeksi syy, nappi jää näkyviin (web .mykistetty). Alle 80 merkin
// teksti ei tarjoa kaiutinta (web LUETTAVAN_VAHIMMAIS). Kortin sulkija kutsuu Pysayta.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KortinLukija
    {
        public const int Vahimmais = 80;
        const string Mykka = "Äänet ovat mykistettynä — luentaa ei ole";
        static KortinLukija ajossa;

        public readonly Button Nappi;
        string otsikko;
        List<string> palat = new List<string>();
        bool luetaan;
        int versio;

        public KortinLukija(VisualElement isa, string otsikko = "Kuuntele kortti", string luokka = null)
        {
            this.otsikko = otsikko;
            Nappi = Rakenne.Nappi(null, "mk-lukija" + (luokka != null ? " " + luokka : ""), Vaihda, isa, Ikonit.Viiva["kaiutin"]);
            Rakenne.El("mk-kaiutin__vinoviiva", Nappi, PickingMode.Ignore);
            Asetukset.Muuttui += _ => PaivitaMykistys();
            PaivitaMykistys();
            Nappi.style.display = DisplayStyle.None;
        }

        /// <summary>Kortin luettavat tekstit (kappaleet); edellinen luenta pysähtyy (web: uusi kortti ruudulle).</summary>
        public void Aseta(IEnumerable<string> tekstit, string otsikko = null)
        {
            if (otsikko != null) this.otsikko = otsikko;
            Pysayta();
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            palat = (tekstit ?? Enumerable.Empty<string>()).Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim()).ToList();
            Nappi.style.display = palat.Sum(p => p.Length) >= Vahimmais ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaMykistys();
        }

        void PaivitaMykistys()
        {
            bool mykka = !Puhe.Paalla;
            Nappi.EnableInClassList("mk-mykistetty", mykka);
            Nappi.tooltip = mykka ? Mykka : otsikko;
            if (mykka && luetaan) Pysayta();
        }

        void Vaihda()
        {
            if (luetaan) { Pysayta(); return; }
            var puhe = Puhe.Hae();
            if (palat.Count == 0 || puhe == null || !Puhe.Paalla) return;
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            ajossa = this;
            luetaan = true;
            Nappi.AddToClassList("mk-lukee");
            int v = ++versio, i = 0;
            void Seuraava()
            {
                if (v != versio) return;
                if (i >= palat.Count) { Pysayta(); return; }
                if (!puhe.Lue(palat[i++], "kertoja", 0, () => UiKerros.PaaSaikeessa(Seuraava))) Pysayta();
            }
            Seuraava();
        }

        /// <summary>Luenta seis (kortti suljettiin, sivu vaihtui tai toinen kortti aukesi).</summary>
        public void Pysayta()
        {
            if (!luetaan) return;
            luetaan = false;
            versio++;
            Nappi.RemoveFromClassList("mk-lukee");
            if (ajossa == this) ajossa = null;
            Puhe.Instanssi?.Pysayta(0.3f);
        }
    }
}
