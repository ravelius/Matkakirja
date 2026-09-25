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
        string lahdeUrl;
        VisualElement nauha;
        Texture2D ladattu;
        readonly Button edellinen, seuraava;
        List<LehtiKuva> sarja = new List<LehtiKuva>();
        int i, versio;

        public bool Auki { get; private set; }

        /// <summary>
        /// Löydös 102 (omistaja, build 13): noston kuvasuurennos niin isona kuin mahtuu (web fokuskohteet.js
        /// avaaKohdeSuurennos mitoita + ui-apurit.js suurennoksenMitat tayteen: 0,97 ruudusta, reunavara 16 pt, kuva
        /// enintään 1,4 × luonnollinen leveys, vähintään 140 pt ja 28 % ruudun korkeudesta). Web-mitat
        /// b13o/web/web-mitat-94-102-90.json: iPhone kehys 365 × 521, iPad 793 × 685. Ilman tätä kehys 640 ja kuva 420.
        /// </summary>
        public bool Tayteen
        {
            get => tayteen;
            set { tayteen = value; kerros.EnableInClassList("mk-suurennos--tayteen", value); Mitoita(); }
        }
        bool tayteen;
        const float TayteenOsuus = 0.97f, TayteenReuna = 16f, TayteenVenyma = 1.4f, TayteenKapein = 140f, TayteenVahinKorkeus = 0.28f;

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
            new KuvaSelaus(kehys, () => sarja?.Count ?? 0, s => Nayta(i + s), () => kuva);
            laskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kuva);
            kuva.RegisterCallback<GeometryChangedEvent>(_ => Nostokortti.SovitaNauha(kuva, nauha, ladattu));
            kerros.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kehys.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            teksti = Rakenne.Teksti("", "mk-nosto__suurennosteksti", kehys);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            lahde = Rakenne.Teksti("", "mk-nosto__lahde", kehys);
            Kirjasimet.Aseta(lahde, Kirjasin.Kone);
            lahde.RegisterCallback<ClickEvent>(e => { if (lahdeUrl != null) { e.StopPropagation(); Application.OpenURL(lahdeUrl); } });
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

        /// <summary>Täyttötila: kuvan koko contain-periaatteella; kehyksen muu tila (paperi, teksti) vähennetään varasta.</summary>
        void Mitoita()
        {
            if (!tayteen || ladattu == null || ladattu.height <= 0) return;
            float rl = kerros.layout.width, rk = kerros.layout.height;
            float kw = kuva.layout.width, kh = kuva.layout.height;
            float vaakaTila = kehys.layout.width - kw, pystyTila = kehys.layout.height - kh;
            if (float.IsNaN(rl) || float.IsNaN(kw) || float.IsNaN(vaakaTila) || float.IsNaN(pystyTila) || rl <= 0f || rk <= 0f) return;
            float suhde = (float)ladattu.width / ladattu.height;
            float leveysKatto = Mathf.Min(rl * TayteenOsuus - vaakaTila - TayteenReuna, ladattu.width * TayteenVenyma);
            float korkeusKatto = Mathf.Max(rk * TayteenOsuus - pystyTila - TayteenReuna, rk * TayteenVahinKorkeus);
            float w = leveysKatto, h = w / suhde;
            if (h > korkeusKatto) { h = korkeusKatto; w = h * suhde; }
            if (w < TayteenKapein) { w = TayteenKapein; h = w / suhde; }
            w = Mathf.Round(w);
            h = Mathf.Round(h);
            if (Mathf.Abs(kw - w) <= 1f && Mathf.Abs(kh - h) <= 1f) return;
            kuva.style.width = w;
            kuva.style.height = h;
            kehys.style.width = w + vaakaTila;
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
                Mitoita();
                if (nauha == null) return;
                nauha.style.display = DisplayStyle.Flex;
                Nostokortti.SovitaNauha(kuva, nauha, t);
            });
            teksti.text = k.Selite ?? k.Lyhyt ?? "";
            teksti.style.display = teksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lahde.text = k.LahdeRivi ?? "";
            lahdeUrl = string.IsNullOrEmpty(k.LahdeUrl) ? null : k.LahdeUrl;
            lahde.pickingMode = lahdeUrl != null ? PickingMode.Position : PickingMode.Ignore;
            lahde.EnableInClassList("mk-nosto__lahde--linkki", lahdeUrl != null);
            lahde.style.display = lahde.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            bool monta = sarja.Count > 1;
            // Löydös 34: ei nuolia kuvan päällä; selaus reunanapautuksella ja pyyhkäisyllä (KuvaSelaus).
            edellinen.style.display = seuraava.style.display = DisplayStyle.None;
            laskuri.style.display = monta ? DisplayStyle.Flex : DisplayStyle.None;
            laskuri.text = $"{i + 1} / {sarja.Count}";
            // Kuvan oma reaktiorivi paperin alle (web avaaKohdeSuurennos / naytaKulttuuriKuva: kuva.reaktio,
            // käytännössä Matkakirjan ihme); vaihtuu kuvan mukana.
            reaktiot?.Juuri.RemoveFromHierarchy();
            reaktiot = Reaktiot.Piirra(kehys, k.Reaktio, k.ReaktioOtsikko ?? k.Otsikko ?? k.Lyhyt, "mk-reaktiot--suurennos");
        }
    }
}
