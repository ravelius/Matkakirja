// LINSSIVALITSIN (Natiivi-UI): webin taikalasit-nappi ja linssivalikko
// (css/styles.css .linssi-valikko, .linssi-tiedot; js/ui.js linssinappi).
//
// Nappi kartan oikeassa yläkulmassa karttaselitteen napin alla (sama 40 pt:n
// pergamenttinappi, ikoni VIIVA_IKONIT.taikalasit). Nappi näkyy vasta, kun
// rekisterissä on ensimmäinen valittava linssi (web: ei vie tilaa ennen kuin
// linssi on löytynyt). Linssin ollessa auki nappi nousee selitenapin paikalle
// (selitenappi väistyy) ja on kullan värinen (web #linssi-btn.paalla).
//
// Paneeli: pergamentti, otsikko "LINSSIT" ja ✕, rivit rekisterin
// Valittavat-järjestyksessä: linssin oma ikoni (24 × 24 -polku), nimi ja
// yhden rivin kuvaus (Lyhyt). Päällä oleva rivi on korostettu ja sanoo
// "päällä"; sen napautus sulkee linssin (rekisterin vaihtokytkin). Paneeli
// sulkeutuu ✕:sta, valinnasta ja napautuksesta paneelin ohi.
//
// iPHONE (omistaja 24.9.2026, löydös 20): silmälasinappia ei ole; yläpalkin ☰ avaa tämän paneelin
// koko pelin valikkona (Valikkona). Yläkaista on matala, ylimpänä Lisaosa-rivit (Fable 24.9.: perustoiminnot
// eivät jää vierityksen taakse) ja ohuen viivan jälkeen linssit (UiNakymat.RakennaPuhelinvalikko: Asetukset, Äänet, Offline-kartat, vanhan
// päävalikon komennot ja kehittäjätilassa viimeisenä Kehittäjä).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Linssivalitsin
    {
        readonly Button nappi;
        readonly VisualElement paneeli, lista, lisaosa;
        readonly Label otsikko;
        readonly List<(VisualElement Rivi, Func<bool> Nakyy)> lisarivit = new List<(VisualElement, Func<bool>)>();
        readonly List<(Button Nappi, Func<bool> Paalla)> kytkimet = new List<(Button, Func<bool>)>();
        /// <summary>"Muut"-paneeli (omistaja 24.9.2026 klo 13.3x): samannäköinen valikko nykyisen päälle.</summary>
        readonly VisualElement muut, muutLista;
        readonly Button poisNappi;
        readonly List<(string Id, Button Rivi, Label Tila)> rivit = new List<(string, Button, Label)>();
        string aukiId;
        int tunnettuja = -1;
        bool sallittu = true;

        /// <summary>Rivin napautus: linssin tunnus (rekisterin Valitse on vaihtokytkin).</summary>
        public event Action<string> Valittu;
        /// <summary>"Ota linssi pois" -nappi.</summary>
        public event Action Suljettava;

        public bool Auki { get; private set; }
        public event Action<bool> AukiMuuttui;

        /// <summary>iPhone: paneeli on yläpalkin ☰-valikko (ei silmälasinappia).</summary>
        public static bool Valikkona => Ylapalkki.Kelluva;

        /// <summary>Paneelin avaava muu nappi (☰): sen painallus ei ole "ohi paneelin".</summary>
        public VisualElement Avaaja;

        public Linssivalitsin(UiKerros kerros)
        {
            var turva = kerros.Turva(LinssiUi.Kerros);
            nappi = Rakenne.Nappi(null, "mk-linssiNappi", Vaihda, turva, Ikonit.Viiva["taikalasit"]);
            nappi.tooltip = "Linssit";
            nappi.style.display = DisplayStyle.None;
            Aloitusnakyma.AukiMuuttui += _ => PaivitaNakyvyys();

            paneeli = Rakenne.El("mk-linssivalitsin", turva);
            paneeli.style.display = DisplayStyle.None;
            Rakenne.Tausta(paneeli, Kuviot.Pergamentti);
            paneeli.Add(new KarheaKehys { Sade = 10, Paksuus = 1.2f });
            Kirjasimet.Aseta(paneeli, Kirjasin.Kone);

            var ylarivi = Rakenne.El("mk-selite__ylarivi", paneeli, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("LINSSIT", "mk-selite__otsikko", ylarivi);
            var sulje = Rakenne.Nappi("×", "mk-selite__sulje", Sulje, ylarivi);
            sulje.tooltip = "Sulje linssivalikko";

            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-linssivalitsin__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(vieritys);
            // iPhonen valikkona pelin rivit ylimpänä (Fable 24.9.: perustoiminnot eivät saa jäädä vierityksen taakse),
            // ohut viiva ja linssit niiden alla koko tilaan.
            lisaosa = Rakenne.El("mk-linssivalitsin__lisaosa", vieritys, PickingMode.Ignore);
            lista = Rakenne.El("mk-linssivalitsin__lista", vieritys);
            lisaosa.style.display = DisplayStyle.None;

            // Muut-paneeli: sama pergamentti ja kehys, ‹ takaisin ja ✕, rivit (Valikkona).
            muut = Rakenne.El("mk-linssivalitsin mk-linssivalitsin--valikko mk-linssivalitsin--muut", turva);
            muut.style.display = DisplayStyle.None;
            Rakenne.Tausta(muut, Kuviot.Pergamentti);
            muut.Add(new KarheaKehys { Sade = 10, Paksuus = 1.2f });
            Kirjasimet.Aseta(muut, Kirjasin.Kone);
            var muutYla = Rakenne.El("mk-selite__ylarivi", muut, PickingMode.Ignore);
            var takaisin = Rakenne.Nappi("‹ Takaisin", "mk-selite__sulje mk-linssivalitsin__takaisin", SuljeMuut, muutYla);
            takaisin.tooltip = "Takaisin valikkoon";
            var muutSulje = Rakenne.Nappi("×", "mk-selite__sulje", Sulje, muutYla);
            muutSulje.tooltip = "Sulje valikko";
            muutLista = Rakenne.El("mk-linssivalitsin__muutlista", muut, PickingMode.Ignore);

            poisNappi = Rakenne.Nappi("Ota linssi pois", "mk-nappi--haamu mk-linssivalitsin__pois", () => { Sulje(); Suljettava?.Invoke(); }, paneeli);
            poisNappi.style.display = DisplayStyle.None;

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            Asettele();
        }

        void Asettele()
        {
            // Linssi auki: karttaselitteen nappi on piilossa, joten taikalasit nousevat sen paikalle.
            float yla = Ylapalkki.Varaus + 8 + (aukiId != null ? 0 : 48);
            nappi.style.top = yla;
            // iPhonen valikkona suoraan saaren rivin alle (turva-alueen yläreuna + 8).
            paneeli.style.top = Valikkona ? Ylapalkki.Varaus + 8 : yla + 48;
        }

        /// <summary>Nappi näkyviin, kun rekisterissä on valittavia linssejä (kutsutaan harvakseltaan).</summary>
        public void PaivitaNappi(Linssirekisteri r)
        {
            int n = r?.Valittavat.Count ?? 0;
            if (n == tunnettuja) return;
            tunnettuja = n;
            PaivitaNakyvyys();
            if (Auki) Rakenna();
        }

        /// <summary>Nappi piiloon koko ruudun linssin ajaksi (astronautin kamera: vain ✕).</summary>
        /// <summary>Karttaselite auki: nappi väistyy selitepaneelin alta (natiivissa nappi on ylemmällä kerroksella).</summary>
        public void Vaista(bool vaista)
        {
            nappi.EnableInClassList("mk-linssiNappi--vaistyy", vaista);
            nappi.pickingMode = vaista ? PickingMode.Ignore : PickingMode.Position;
        }

        public void NaytaNappi(bool nakyy)
        {
            sallittu = nakyy;
            if (!nakyy) Sulje();
            PaivitaNakyvyys();
        }

        void PaivitaNakyvyys() =>
            nappi.style.display = sallittu && !Valikkona && !Aloitusnakyma.AloitusAuki && (tunnettuja > 0 || testiLinssit != null) ? DisplayStyle.Flex : DisplayStyle.None;

        /// <summary>Päällä olevan linssin tunnus (null = ei mitään): napin kulta ja rivin korostus.</summary>
        public void Merkitse(string id)
        {
            aukiId = id;
            nappi.EnableInClassList("mk-paalla", id != null);
            foreach (var (rid, rivi, tila) in rivit)
            {
                bool p = rid == id;
                rivi.EnableInClassList("mk-valittu", p);
                tila.text = p ? "päällä" : "";
            }
            poisNappi.style.display = id != null ? DisplayStyle.Flex : DisplayStyle.None;
            Asettele();
        }

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            bool v = Valikkona;
            paneeli.EnableInClassList("mk-linssivalitsin--valikko", v);
            lisaosa.style.display = v ? DisplayStyle.Flex : DisplayStyle.None;
            foreach (var (rivi, nakyy) in lisarivit) rivi.style.display = nakyy == null || nakyy() ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaKytkimet();
            Asettele();
            Rakenna();
            AukiMuuttui?.Invoke(true);
            Rakenne.Nayta(paneeli, true, 220);
            nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(paneeli, false, 220);
            SuljeMuut();
            nappi.RemoveFromClassList("mk-valittu");
            AukiMuuttui?.Invoke(false);
        }

        // --- iPhonen ☰-valikon yläosa (omistaja 24.9.2026 klo 13.3x) -----------------------------------
        //   rivi 1: äänikytkimet (Kertoja, Musiikki, Äänimaisema) suorina toggle-nappeina
        //   rivi 2: Uusi peli · Muut · Kehittäjä (vain kehittäjätilassa)
        //   Muut avaa samannäköisen paneelin päälle: loput toiminnot ja ‹ Takaisin.

        /// <summary>Uusi tiivis nappirivi valikon yläosaan.</summary>
        public VisualElement LisaNappirivi() => Rakenne.El("mk-valikkorivi", lisaosa, PickingMode.Ignore);

        Button ValikkoNappi(VisualElement isa, string nimi, string ikoni, Action painettu, string luokka = "mk-valikkonappi")
        {
            var b = Rakenne.Nappi(null, luokka, painettu, isa);
            b.tooltip = nimi;
            var kuva = new SvgIkoni(ikoni ?? Ikonit.Valikko);
            kuva.AddToClassList("mk-valikkonappi__ikoni");
            b.Add(kuva);
            var t = Rakenne.Teksti(nimi, "mk-valikkonappi__nimi", b);
            Kirjasimet.Aseta(t, Kirjasin.KoneLihava);
            return b;
        }

        /// <summary>Toiminto: valikko sulkeutuu ja toiminto ajetaan (nakyy kysytään avattaessa).</summary>
        public Button LisaNappi(VisualElement rivi, string nimi, string ikoni, Action toiminto, Func<bool> nakyy = null)
        {
            var b = ValikkoNappi(rivi, nimi, ikoni, () => { Sulje(); toiminto?.Invoke(); });
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        /// <summary>Kytkin: vaihtaa tilan valikon pysyessä auki; päällä-tila korostettuna.</summary>
        public Button LisaKytkin(VisualElement rivi, string nimi, string ikoni, Func<bool> paalla, Action vaihda)
        {
            Button b = null;
            b = ValikkoNappi(rivi, nimi, ikoni, () => { vaihda?.Invoke(); PaivitaKytkimet(); });
            b.AddToClassList("mk-valikkonappi--kytkin");
            kytkimet.Add((b, paalla));
            return b;
        }

        void PaivitaKytkimet()
        {
            foreach (var (b, paalla) in kytkimet) b.EnableInClassList("mk-valittu", paalla != null && paalla());
        }

        /// <summary>Muut-nappi: avaa Muut-paneelin nykyisen päälle.</summary>
        public Button LisaMuutNappi(VisualElement rivi, string nimi, string ikoni) => ValikkoNappi(rivi, nimi, ikoni, AvaaMuut);

        /// <summary>Muut-paneelin rivi (sulkee valikot ja ajaa toiminnon).</summary>
        public Button LisaMuuRivi(string nimi, string ikoni, Action toiminto, Func<bool> nakyy = null)
        {
            var b = ValikkoNappi(muutLista, nimi, ikoni, () => { Sulje(); toiminto?.Invoke(); }, "mk-valikkonappi mk-valikkonappi--rivi");
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        public bool MuutAuki { get; private set; }

        void AvaaMuut()
        {
            if (MuutAuki) return;
            MuutAuki = true;
            muut.style.top = paneeli.style.top;
            foreach (var (rivi, nakyy) in lisarivit) rivi.style.display = nakyy == null || nakyy() ? DisplayStyle.Flex : DisplayStyle.None;
            Rakenne.Nayta(muut, true, 180);
        }

        void SuljeMuut()
        {
            if (!MuutAuki) return;
            MuutAuki = false;
            Rakenne.Nayta(muut, false, 180);
        }

        IReadOnlyList<LinssiTiedot> testiLinssit;

        /// <summary>Testikomento: valitsin näillä tiedoilla ilman rekisteriä (null = rekisteri).</summary>
        public void Testaa(IReadOnlyList<LinssiTiedot> tiedot)
        {
            testiLinssit = tiedot;
            PaivitaNakyvyys();
            Sulje();
            Avaa();
        }

        void Rakenna()
        {
            lista.Clear();
            rivit.Clear();
            var tiedot = new List<LinssiTiedot>();
            var r = LinssiUi.Rekisteri;
            if (testiLinssit != null) tiedot.AddRange(testiLinssit);
            else if (r != null) foreach (var l in r.Valittavat) tiedot.Add(l.Tiedot);
            // Valikkona ilman löydettyjä linssejä: ei otsikkoa eikä tyhjää riviä, vain valikon rivit.
            bool tyhjaValikko = Valikkona && r != null && tiedot.Count == 0;
            // Valikkona otsikko "LINSSIT" on linssien yllä viivan alla, yläkaistassa vain ✕.
            otsikko.text = Valikkona ? "" : "LINSSIT";
            lista.style.display = tyhjaValikko ? DisplayStyle.None : DisplayStyle.Flex;
            if (Valikkona && !tyhjaValikko)
            {
                Rakenne.El("mk-linssivalitsin__erotin", lista, PickingMode.Ignore);
                Rakenne.Teksti("LINSSIT", "mk-selite__otsikko mk-linssivalitsin__valiotsikko", lista);
            }
            if (tiedot.Count == 0 && !tyhjaValikko) Rakenne.Teksti("Linssit latautuvat…", "mk-linssivalitsin__tyhja", lista);
            foreach (var t in tiedot) LuoRivi(t);
            Merkitse(r?.Auki?.Tiedot?.Id ?? aukiId);
        }

        void LuoRivi(LinssiTiedot t)
        {
            string id = t.Id;
            var b = Rakenne.Nappi(null, "mk-linssirivi", () => { Sulje(); Valittu?.Invoke(id); }, lista);
            b.tooltip = t.Nimi;
            var ikoni = new SvgIkoni(string.IsNullOrEmpty(t.Ikoni) ? Ikonit.Viiva["taikalasit"] : t.Ikoni);
            ikoni.AddToClassList("mk-linssirivi__ikoni");
            b.Add(ikoni);
            var tekstit = Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore);
            var nimirivi = Rakenne.El("mk-linssirivi__nimirivi", tekstit, PickingMode.Ignore);
            var nimi = Rakenne.Teksti(t.Nimi ?? id, "mk-linssirivi__nimi", nimirivi);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            var tila = Rakenne.Teksti("", "mk-linssirivi__tila", nimirivi);
            if (!string.IsNullOrEmpty(t.Lyhyt))
            {
                var lyhyt = Rakenne.Teksti(t.Lyhyt, "mk-linssirivi__lyhyt", tekstit);
                Kirjasimet.Aseta(lyhyt, Kirjasin.Luku);
            }
            rivit.Add((id, b, tila));
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || paneeli.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(paneeli.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!paneeli.worldBound.Contains(p) && !nappi.worldBound.Contains(p) && !(MuutAuki && muut.worldBound.Contains(p))
                && (Avaaja == null || !Avaaja.worldBound.Contains(p))) Sulje();
        }
    }
}
