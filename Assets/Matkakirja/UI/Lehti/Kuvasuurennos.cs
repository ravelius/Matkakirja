// KUVASUURENNOS (Natiivi-UI): kuva isona paperikehyksessä, pitkä selite ja lähderivi
// (webin naytaKulttuuriKuva / avaaKohdeSuurennos). Sarjaa voi selata ‹ ›; napautus kuvan
// ohi sulkee. Kuvat NostoSisalto.HaeKuva-reitillä (https, media.json, Commons). Ihmekuvalla
// kulmanauha kuten kortissa (web avaaKohdeSuurennos piirraIhmenauha) ja oma reaktiorivi
// (LehtiKuva.Reaktio, web piirraReaktiot luokalla reaktiot-suurennos).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kuvasuurennos
    {
        readonly VisualElement kerros, kuva, kehys;
        ReaktioRivi reaktiot;
        readonly Label teksti, lahde, laskuri;
        VisualElement nauha;
        Texture2D ladattu;
        readonly Button edellinen, seuraava;
        List<LehtiKuva> sarja = new List<LehtiKuva>();
        int i, versio;

        public bool Auki { get; private set; }

        public Kuvasuurennos(VisualElement isa)
        {
            kerros = Rakenne.El("mk-nosto__suurennos mk-suurennos", isa);
            kerros.style.display = DisplayStyle.None;
            kerros.RegisterCallback<PointerDownEvent>(e => { if (e.target == kerros) Sulje(); });
            kehys = Rakenne.El("mk-nosto__suurennoskehys", kerros);
            kuva = Rakenne.El("mk-nosto__suurennoskuva", kehys, PickingMode.Ignore);
            edellinen = Rakenne.Nappi("‹", "mk-nosto__selaa mk-nosto__selaa--vasen", () => Nayta(i - 1), kuva);
            seuraava = Rakenne.Nappi("›", "mk-nosto__selaa mk-nosto__selaa--oikea", () => Nayta(i + 1), kuva);
            kuva.pickingMode = PickingMode.Position;
            laskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kuva);
            kuva.RegisterCallback<GeometryChangedEvent>(_ => Nostokortti.SovitaNauha(kuva, nauha, ladattu));
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            teksti = Rakenne.Teksti("", "mk-nosto__suurennosteksti", kehys);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            lahde = Rakenne.Teksti("", "mk-nosto__lahde", kehys);
            Kirjasimet.Aseta(lahde, Kirjasin.Kone);
        }

        public void Avaa(IReadOnlyList<LehtiKuva> kuvat, int alku = 0)
        {
            sarja = new List<LehtiKuva>(kuvat ?? Array.Empty<LehtiKuva>());
            if (sarja.Count == 0) return;
            Nayta(alku);
            Auki = true;
            Rakenne.Nayta(kerros, true, 220);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            Rakenne.Nayta(kerros, false, 180);
        }

        void Nayta(int uusi)
        {
            i = (uusi % sarja.Count + sarja.Count) % sarja.Count;
            var k = sarja[i];
            int v = ++versio;
            kuva.style.backgroundImage = StyleKeyword.None;
            ladattu = null;
            nauha?.RemoveFromHierarchy();
            nauha = null;
            if (k.Nauha != null)
            {
                nauha = Nostokortti.Ihmenauha(kuva, k.Nauha);
                nauha.style.display = DisplayStyle.None; // näkyviin, kun kuvan kulma tiedetään
                nauha.SendToBack();
            }
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (t == null || v != versio) return;
                ladattu = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                if (nauha == null) return;
                nauha.style.display = DisplayStyle.Flex;
                Nostokortti.SovitaNauha(kuva, nauha, t);
            });
            teksti.text = k.Selite ?? k.Lyhyt ?? "";
            teksti.style.display = teksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lahde.text = k.LahdeRivi ?? "";
            lahde.style.display = lahde.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            bool monta = sarja.Count > 1;
            edellinen.style.display = seuraava.style.display = laskuri.style.display = monta ? DisplayStyle.Flex : DisplayStyle.None;
            laskuri.text = $"{i + 1} / {sarja.Count}";
            // Kuvan oma reaktiorivi paperin alle (web avaaKohdeSuurennos / naytaKulttuuriKuva: kuva.reaktio,
            // käytännössä Matkakirjan ihme); vaihtuu kuvan mukana.
            reaktiot?.Juuri.RemoveFromHierarchy();
            reaktiot = Reaktiot.Piirra(kehys, k.Reaktio, k.ReaktioOtsikko ?? k.Otsikko ?? k.Lyhyt, "mk-reaktiot--suurennos");
        }
    }
}
