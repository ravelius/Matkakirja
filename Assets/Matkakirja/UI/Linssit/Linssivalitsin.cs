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
        readonly VisualElement paneeli, lista;
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
            Rakenne.Teksti("LINSSIT", "mk-selite__otsikko", ylarivi);
            var sulje = Rakenne.Nappi("×", "mk-selite__sulje", Sulje, ylarivi);
            sulje.tooltip = "Sulje linssivalikko";

            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-linssivalitsin__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(vieritys);
            lista = Rakenne.El("mk-linssivalitsin__lista", vieritys);

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
            paneeli.style.top = yla + 48;
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
            nappi.style.display = sallittu && !Aloitusnakyma.AloitusAuki && (tunnettuja > 0 || testiLinssit != null) ? DisplayStyle.Flex : DisplayStyle.None;

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
            Rakenna();
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
            if (tiedot.Count == 0) Rakenne.Teksti("Linssit latautuvat…", "mk-linssivalitsin__tyhja", lista);
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
            if (!paneeli.worldBound.Contains(p) && !nappi.worldBound.Contains(p)) Sulje();
        }
    }
}
