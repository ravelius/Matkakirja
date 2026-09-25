// NÄHTÄVYYSNÄKYMÄ (Natiivi-UI): kaupunkikortin rivi "Nähtävyydet" (web kaupunkinosto.js
// latoNahtavyysnakyma + lehti.js avaaTiivisLehtiarkki; speksi kohta 3a).
//
// Tiivis lehtiarkki: lehden leveys ja paperi, yläosassa vain otsikko "Nähtävyydet" ja ×; arkki on
// sisältönsä korkuinen ja keskitetty. Sisältö: oikealla ylhäällä "⤢ Kokoruutu", kohdekartta ilman
// omaa otsikkoa ja kohdeluetteloa (KohdekarttaNakyma), kartan alla esittely: alle 900 merkkiä
// kokonaan, muuten ensimmäinen lause ja "Lue lisää", joka jatkaa samaa kappaletta. Ei galleriaa.
// Kohteen avaus → Nahtavyysarkki (sama kerros, arkki aukeaa tämän päälle ja palaa tähän).
// × tai napautus taustaan sulkee (ääni paper).
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Nahtavyysnakyma
    {
        const int EsittelynRaja = 900;

        readonly UiKerros ui;
        readonly VisualElement peite, arkki, sisus;
        readonly Label otsikko;
        string kaupunki;

        public bool Auki { get; private set; }

        public Nahtavyysnakyma(UiKerros ui)
        {
            this.ui = ui;
            var juuri = ui.Juuri(UiKerros.Traileri);
            peite = Rakenne.El("mk-lehti__peite mk-nahtavyydet__peite", juuri);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(e => { if (e.target == peite) Sulje(); });
            arkki = Rakenne.El("mk-nahtavyydet", peite);
            Kuviot.AsetaArkki(arkki);
            Kirjasimet.Aseta(arkki, Kirjasin.Luku);
            var yla = Rakenne.El("mk-nahtavyydet__yla", arkki, PickingMode.Ignore);
            // Web .tiivis-lehtiarkki .lehti-nimio: versaalinimiö keskellä (× ei siirrä keskikohtaa).
            otsikko = Rakenne.Teksti("NÄHTÄVYYDET", "mk-nahtavyydet__otsikko", yla);
            Kirjasimet.Aseta(otsikko, Kirjasin.KoneBold);
            Rakenne.Nappi("×", "mk-galleria__rasti mk-nahtavyydet__sulje", Sulje, yla);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-nahtavyydet__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            v.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            arkki.Add(v);
            sisus = v.contentContainer;
        }

        /// <summary>Avaa kaupungin nähtävyysnäkymän (ei mitään, jos kohdekarttaa ei ole).</summary>
        public void Avaa(string kaupunkiId)
        {
            kaupunki = kaupunkiId;
            Kohdekartat.Hae(kaupunkiId, k =>
            {
                if (k == null || kaupunki != kaupunkiId) return;
                Rakenna(k);
                Aanet.PulunTehoste("paper");
                if (Auki) return;
                Auki = true;
                Rakenne.Nayta(peite, true, 220);
                SyoteLukko.Esta(this);
            });
        }

        void Rakenna(Kohdekartta k)
        {
            sisus.Clear();
            // Löydös 63: kokoruutunappi ja lähderivi ovat KohdekarttaNakyman omia (web piirraKaupunkiKartta
            // kokoruutuNappi: true); täällä ne piirtyivät toiseen kertaan.
            var kartta = new KohdekarttaNakyma(k);
            kartta.KohdeAvattu += kohde => UiNakymat.Hae()?.Nahtavyydet.AvaaKohde(k, kohde);
            kartta.KokoruutuPyydetty += () => Kokoruutu(k);
            sisus.Add(kartta);
            Esittely(k.Esittely);
        }

        void Kokoruutu(Kohdekartta k) =>
            Kohdekartan.AvaaKokoruutu(k, kohde => UiNakymat.Hae()?.Nahtavyydet.AvaaKohde(k, kohde));

        /// <summary>Web: alle 900 merkkiä kokonaan, muuten ensimmäinen lause ja "Lue lisää" samaan kappaleeseen.</summary>
        void Esittely(string teksti)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return;
            teksti = teksti.Trim();
            var l = Rakenne.Teksti("", "mk-nahtavyydet__esittely", sisus);
            l.enableRichText = true;
            Kirjasimet.Aseta(l, Kirjasin.Luku);
            string Suojaa(string x) => Nahtavyysarkki.Vuosikorosta(x);
            if (teksti.Length < EsittelynRaja) { l.text = Suojaa(teksti); return; }
            int piste = teksti.IndexOf(". ", StringComparison.Ordinal);
            if (piste < 0 || piste > EsittelynRaja) { l.text = Suojaa(teksti); return; }
            string alku = teksti.Substring(0, piste + 1);
            l.text = Suojaa(alku);
            var lisaa = Rakenne.Nappi("Lue lisää", "mk-lehti__opaslinkki mk-nahtavyydet__luelisaa", null, sisus);
            Kirjasimet.Aseta(lisaa, Kirjasin.Luku);
            lisaa.clicked += () => { l.text = Suojaa(teksti); lisaa.RemoveFromHierarchy(); };
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(peite, false, 200);
            SyoteLukko.Vapauta(this);
            Aanet.PulunTehoste("paper");
        }
    }
}
