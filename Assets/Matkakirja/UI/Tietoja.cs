// TEKIJÄTIEDOT JA LÄHTEET (Natiivi-UI): webin #lahteet-dialogin natiivi vastine,
// avataan päävalikosta. Pakollinen karttalähteiden attribuutio (Copernicus-DEM,
// Cesium; Natiivisepän KarttaKerrokset.Tekijatiedot), koska Cesiumin oma
// ruutukrediitti on piilotettu UI:n alta. Pergamenttikortti himmennyksen päällä,
// sisältö vierittyy, "Sulje" oikealla (webin .dialog-actions).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Tietoja
    {
        readonly VisualElement himmennys;
        public bool Auki { get; private set; }

        public Tietoja(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });

            var kortti = new Kortti("mk-tietoja");
            himmennys.Add(kortti);
            var otsikko = Rakenne.Teksti("Tekijätiedot ja lähteet", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);

            Osio(vieritys, "Matkakirja – unohdettu aarre",
                "Suomenkielinen seikkailupeli nuoren Foggin matkasta isoisän vuoden 1873 matkapäiväkirjan jäljillä.");
            Osio(vieritys, "Kartta ja maasto", KarttaKerrokset.Tekijatiedot);
            Osio(vieritys, "Kuvat",
                "Valokuvat, julisteet ja liput ovat Wikimedia Commonsista (vapaat lisenssit); tekijä ja lisenssi näkyvät kunkin kuvan yhteydessä.");
            Osio(vieritys, "3D-mallit",
                "Lentokone (DC-3-tyyppinen potkurikone) on pelin oma malli, CC0 (public domain).");
            Osio(vieritys, "Äänet",
                "Pulun äänitehosteet ovat Freesoundista (CC0 ja CC BY). Luennat ja Livian repliikit ovat pelin omia äänitteitä.");
            Osio(vieritys, "Fontit",
                "American Typewriter, Iowan Old Style ja Snell Roundhand ovat iOS:n järjestelmäfontteja. Varafontti EB Garamond (SIL Open Font License 1.1).");
            Osio(vieritys, "Versio", "Sovellus " + Application.version + (UiNakymat.SisaltoVersio != null ? " · sisältö " + UiNakymat.SisaltoVersio : ""));

            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Sulje", "mk-nappi--kulta", Sulje, napit);
            Rakenne.Tausta(sulje, Kuviot.Kulta);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);
        }

        static void Osio(VisualElement isa, string otsikko, string teksti)
        {
            var o = Rakenne.El("mk-tietoja__osio", isa, PickingMode.Ignore);
            var t = Rakenne.Teksti(otsikko.ToUpperInvariant(), "mk-tietoja__otsikko", o);
            Kirjasimet.Aseta(t, Kirjasin.Kone);
            Rakenne.Teksti(teksti, "mk-kortti__teksti", o);
        }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }
    }
}
