// KARTTASELITE (Natiivi-UI, erä 3): webin js/karttaselite.js natiivina.
//
// Nappi (kolme palloa ja viivaa) kartan oikeassa yläkulmassa yläpalkin alla;
// paneeli liukuu alas napin päälle (220 ms, suljettu: ylempänä ja litistynyt).
// Paneeli: pergamentti #f5f0e2, käsin piirretty kehys (KarheaKehys), otsikko
// "NOSTOT" ja ✕. Rivit webin KARTTASELITE_JARJESTYS-järjestyksessä: merkki |
// nimi | luku (tasalevyiset numerot, tyhjä "0" ja rivi himmeänä). Yksi aihe
// kerrallaan: peukalolevy (pilleri) liukuu valitun rivin kohdalle ja sen
// "linssi" näyttää valitun luvun suurennettuna; rivin napautus tai sormen veto
// rivien yli valitsee. Valinta ja laskurit: UiPalvelut.KarttaValot
// (Natiiviseppä); asettamaton palvelu = pelkät selitykset ilman valintaa.
// Sulkeutuu ✕:sta ja napautuksesta paneelin ohi (napautus menee silti kartalle).
// Välilehdet NOSTOT | MAAKUNNAT (webin karttaselite-valilehti; valinta muistetaan:
// PlayerPrefs matkakirja-karttaselite-valilehti). Maakunnat-välilehden sisältö on
// Maakunnat.cs:ssä ja rakentuu, kun välilehti avataan ensi kerran.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Karttaselite
    {
        readonly UiKerros kerros;
        readonly Button nappi;
        const string ValilehtiAvain = "matkakirja-karttaselite-valilehti";
        readonly VisualElement paneeli, lista, peukalo, paneeliNostot, paneeliMaakunnat;
        readonly Button valilehtiNostot, valilehtiMaakunnat;
        public readonly Maakunnat Maakunnat;
        bool maakunnatAuki;
        readonly Label linssiLuku;
        readonly Dictionary<string, (Button Rivi, Label Luku)> rivit = new Dictionary<string, (Button, Label)>();
        IKarttaValot kuunneltu;
        bool vetaa, paivitysPyydetty;

        public bool Auki { get; private set; }

        public Karttaselite(UiKerros kerros)
        {
            this.kerros = kerros;
            var turva = kerros.Turva(UiKerros.Tilarivi);

            nappi = Rakenne.Nappi(null, "mk-seliteNappi", Vaihda, turva, NostoMerkit.SeliteNappi);
            nappi.tooltip = "Karttaselitteet";
            nappi.style.top = Ylapalkki.Korkeus + 8;

            paneeli = Rakenne.El("mk-selite", turva);
            paneeli.style.top = Ylapalkki.Korkeus + 8;
            paneeli.style.display = DisplayStyle.None;
            paneeli.Add(new KarheaKehys { Sade = 8, Paksuus = 1.2f });
            Kirjasimet.Aseta(paneeli, Kirjasin.Kone);

            var ylarivi = Rakenne.El("mk-selite__ylarivi", paneeli, PickingMode.Ignore);
            var valilehdet = Rakenne.El("mk-selite__valilehdet", ylarivi, PickingMode.Ignore);
            valilehtiNostot = Rakenne.Nappi("NOSTOT", "mk-selite__valilehti", () => VaihdaValilehti(false), valilehdet);
            valilehtiMaakunnat = Rakenne.Nappi("MAAKUNNAT", "mk-selite__valilehti", () => VaihdaValilehti(true), valilehdet);
            var sulje = Rakenne.Nappi("×", "mk-selite__sulje", Sulje, ylarivi);
            sulje.tooltip = "Sulje karttaselitteet";

            paneeliNostot = Rakenne.El("mk-selite__paneeli", paneeli, PickingMode.Ignore);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-selite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeliNostot.Add(vieritys);
            paneeliMaakunnat = Rakenne.El("mk-selite__paneeli", paneeli, PickingMode.Ignore);
            Maakunnat = new Maakunnat(kerros, paneeliMaakunnat);
            maakunnatAuki = PlayerPrefs.GetString(ValilehtiAvain, "") == "maakunnat";
            NaytaValilehti();
            lista = Rakenne.El("mk-selite__lista", vieritys);

            peukalo = Rakenne.El("mk-peukalo", lista, PickingMode.Ignore);
            var linssi = Rakenne.El("mk-peukalo__linssi", peukalo, PickingMode.Ignore);
            linssiLuku = Rakenne.Teksti("", "mk-peukalo__luku", linssi);
            peukalo.style.display = DisplayStyle.None;

            foreach (var r in NostoMerkit.Jarjestys) LuoRivi(r);

            // Sormen veto rivien yli valitsee (webin peukalolevyn raahaus).
            lista.RegisterCallback<PointerDownEvent>(e => { vetaa = true; lista.CapturePointer(e.pointerId); ValitseKohdasta(e.localPosition.y); });
            lista.RegisterCallback<PointerMoveEvent>(e => { if (vetaa) ValitseKohdasta(e.localPosition.y); });
            lista.RegisterCallback<PointerUpEvent>(e => { vetaa = false; lista.ReleasePointer(e.pointerId); });
            lista.RegisterCallback<PointerCaptureOutEvent>(_ => vetaa = false);
            lista.RegisterCallback<GeometryChangedEvent>(_ => SiirraPeukalo());

            kerros.TurvaMuuttui += () => { nappi.style.top = Ylapalkki.Korkeus + 8; paneeli.style.top = Ylapalkki.Korkeus + 8; };
            // Napautus paneelin ohi (myös pallolle, jota UI ei näe) sulkee.
            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        /// <summary>Välilehti vaihtuu (web vaihdaValilehti); valinta muistetaan laitteella.</summary>
        public void VaihdaValilehti(bool maakunnat)
        {
            if (maakunnat == maakunnatAuki) return;
            maakunnatAuki = maakunnat;
            PlayerPrefs.SetString(ValilehtiAvain, maakunnat ? "maakunnat" : "nostot");
            PlayerPrefs.Save();
            NaytaValilehti();
            if (Auki && !maakunnat) Paivita();
        }

        void NaytaValilehti()
        {
            paneeliNostot.style.display = maakunnatAuki ? DisplayStyle.None : DisplayStyle.Flex;
            paneeliMaakunnat.style.display = maakunnatAuki ? DisplayStyle.Flex : DisplayStyle.None;
            valilehtiNostot.EnableInClassList("mk-valittu", !maakunnatAuki);
            valilehtiMaakunnat.EnableInClassList("mk-valittu", maakunnatAuki);
            paneeli.EnableInClassList("mk-selite--maakunnat", maakunnatAuki);
            if (maakunnatAuki && Auki) Maakunnat.Avautui();
        }

        void LuoRivi(NostoMerkit.Rivi r)
        {
            var b = Rakenne.Nappi(null, "mk-selite-rivi", null, lista);
            b.tooltip = r.Koko;
            b.userData = r.Id;
            var merkki = Rakenne.El("mk-selite-rivi__merkki", b, PickingMode.Ignore);
            if (r.Piste || r.Vektori != null)
            {
                var alue = Rakenne.El("mk-selite-rivi__vektori", merkki, PickingMode.Ignore);
                string taytto = r.Piste ? NostoMerkit.PisteTaytto : r.Vektori;
                var t = new SvgIkoni(taytto) { Ruutu = 16, Alku = new Vector2(-8, -8) };
                t.AddToClassList("mk-ikoni--tayta");
                t.AddToClassList("mk-selite-rivi__symboli");
                if (r.Vari != null) t.style.color = Kuviot.Vari(r.Vari);
                alue.Add(t);
                if (r.Piste)
                {
                    var rengas = new SvgIkoni(NostoMerkit.PisteRengas) { Ruutu = 16, Alku = new Vector2(-8, -8) };
                    rengas.AddToClassList("mk-ikoni--tayta");
                    rengas.AddToClassList("mk-selite-rivi__symboli");
                    rengas.AddToClassList("mk-selite-rivi__rengas");
                    alue.Add(rengas);
                }
            }
            foreach (var kuva in r.Kuvat)
            {
                var k = Rakenne.El("mk-selite-rivi__kuva", merkki, PickingMode.Ignore);
                Kuvat.Hae(NostoMerkit.KuvaJuuri + kuva, t => { if (t != null) k.style.backgroundImage = new StyleBackground(t); });
            }
            Rakenne.Teksti(r.Nimi, "mk-selite-rivi__nimi", b);
            var luku = Rakenne.Teksti("", "mk-selite-rivi__luku", b);
            rivit[r.Id] = (b, luku);
        }

        void ValitseKohdasta(float y)
        {
            var palvelu = UiPalvelut.KarttaValot;
            if (palvelu == null) return;
            foreach (var pari in rivit)
            {
                var l = pari.Value.Rivi.layout;
                if (y >= l.yMin && y < l.yMax)
                {
                    if (palvelu.Valittu != pari.Key) palvelu.Valitse(pari.Key);
                    Paivita();
                    return;
                }
            }
        }

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            KytkePalvelu();
            Paivita();
            if (maakunnatAuki) Maakunnat.Avautui();
            Rakenne.Nayta(paneeli, true, 220);
            nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(paneeli, false, 220);
            nappi.RemoveFromClassList("mk-valittu");
        }

        /// <summary>Nappi näkyviin tai piiloon (linssi päällä, aloitus).</summary>
        public void NaytaNappi(bool nakyy)
        {
            if (!nakyy) Sulje();
            nappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void KytkePalvelu()
        {
            var p = UiPalvelut.KarttaValot;
            if (ReferenceEquals(p, kuunneltu)) return;
            if (kuunneltu != null) kuunneltu.Muuttui -= PalveluMuuttui;
            kuunneltu = p;
            if (p != null) p.Muuttui += PalveluMuuttui;
        }

        void PalveluMuuttui()
        {
            if (paivitysPyydetty) return;
            paivitysPyydetty = true;
            UiKerros.PaaSaikeessa(() => { paivitysPyydetty = false; if (Auki) Paivita(); });
        }

        void Paivita()
        {
            var p = UiPalvelut.KarttaValot;
            foreach (var pari in rivit)
            {
                int n = 0;
                bool laskettu = p != null && p.Laskurit != null && p.Laskurit.TryGetValue(pari.Key, out n);
                bool erikois = pari.Key == "kaikki" || pari.Key == "ei";
                pari.Value.Luku.text = p == null || erikois ? "" : (laskettu ? n : 0).ToString();
                pari.Value.Rivi.EnableInClassList("mk-tyhja", p != null && !erikois && n == 0);
                pari.Value.Rivi.EnableInClassList("mk-valittu", p != null && p.Valittu == pari.Key);
            }
            lista.EnableInClassList("mk-valittava", p != null);
            SiirraPeukalo();
        }

        void SiirraPeukalo()
        {
            var p = UiPalvelut.KarttaValot;
            if (p == null || p.Valittu == null || !rivit.TryGetValue(p.Valittu, out var r))
            {
                peukalo.style.display = DisplayStyle.None;
                return;
            }
            peukalo.style.display = DisplayStyle.Flex;
            var l = r.Rivi.layout;
            peukalo.style.translate = new Translate(0, l.yMin);
            peukalo.style.height = l.height;
            linssiLuku.text = r.Luku.text;
            peukalo.EnableInClassList("mk-vetaa", vetaa);
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki || Maakunnat.KorttiAuki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame) return;
            var ruutu = osoitin.position.ReadValue();
            var paneelinPaneeli = paneeli.panel;
            if (paneelinPaneeli == null) return;
            var pp = RuntimePanelUtils.ScreenToPanel(paneelinPaneeli, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!paneeli.worldBound.Contains(pp) && !nappi.worldBound.Contains(pp)) Sulje();
        }
    }
}
