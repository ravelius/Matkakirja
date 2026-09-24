// TIEDELIITE (Natiivi-UI): webin js/tiedeliite.js avaaTiedeliite + piirraTiedeliitteenSivu keksintölinssille.
// Sisältö ja säännöt Linssisepältä (Linssit/Ydin/Aikajana/Tiedeliite.cs, KeksinnotLinssi.Tiedeliite(i)).
//
//   kortti      pergamentti #f6ecc6 kevyen himmennyksen päällä, leveys min(640, 100 %), korkeus ≤ 90 %
//   ylärivi     ☰ sisällys | "TIEDELIITE" + paikkarivi (ajoitus · paikka) | kaiutin ✕; kaksoisviiva alla
//   sisällys    ☰: kaikki sivulliset pysäkit (vuosi + henkilö/otsikko), nykyinen korostettuna
//   sivu        otsikko, henkilö (versaali, kulta), ingressi, leipä + generoidut kasvot palstassa,
//               havainnekuva (yksi) tai karuselli (‹ ›, pisteet, pyyhkäisy 30 px), henkilöjuttu väliotsikon
//               alla aidon muotokuvan kanssa; kuvan napautus → suurennos (pitkä kuvateksti + lähde)
//   navi        "‹ 1876 Bell" / "1879 Edison ›", päissä "‹ Kaaren alku" / "Kaaren loppu ›" harmaana
// Koukut: KeksinnotLinssi.JuttuPyydetty(i) avaa, selaus → JuttuVaihtui(j), sulku → JuttuSuljettu().
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Tiedeliitenakyma
    {
        const int Kerros = UiKerros.Traileri;
        const float KaruselliKynnys = 30f;

        readonly VisualElement peite, kortti, sisallys;
        readonly ScrollView vieritys;
        readonly Label paikkarivi;
        readonly Button edellinen, seuraava;
        readonly KortinLukija lukija;
        readonly Kuvasuurennos suurennos;
        KeksinnotLinssi linssi;
        int nykyinen = -1;

        public bool Auki { get; private set; }

        public Tiedeliitenakyma(UiKerros ui)
        {
            var juuri = ui.Juuri(Kerros);
            peite = Rakenne.El("mk-tiedeliite__peite", juuri);
            peite.style.display = DisplayStyle.None;
            kortti = Rakenne.El("mk-tiedeliite", peite);
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);

            var ylarivi = Rakenne.El("mk-tiedeliite__ylarivi", kortti, PickingMode.Ignore);
            var vasen = Rakenne.El("mk-tiedeliite__reuna", ylarivi, PickingMode.Ignore);
            var hampurilainen = Rakenne.Nappi(null, "mk-tiedeliite__ikoninappi", VaihdaSisallys, vasen, Ikonit.Valikko);
            hampurilainen.tooltip = "Sisällys: kaikki keksijät";
            var nimiot = Rakenne.El("mk-tiedeliite__nimiot", ylarivi, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(Tiedeliite.Nimio.ToUpperInvariant(), "mk-tiedeliite__nimio", nimiot), Kirjasin.KoneLihava);
            paikkarivi = Rakenne.Teksti("", "mk-tiedeliite__paikkarivi", nimiot);
            Kirjasimet.Aseta(paikkarivi, Kirjasin.LukuKursiivi);
            var oikea = Rakenne.El("mk-tiedeliite__reuna mk-tiedeliite__reuna--oikea", ylarivi, PickingMode.Ignore);
            lukija = new KortinLukija(oikea, "Kuuntele tiedeliite", "mk-tiedeliite__ikoninappi");
            var sulje = Rakenne.Nappi("✕", "mk-tiedeliite__sulje", Sulje, oikea);
            sulje.tooltip = "Sulje";

            sisallys = Rakenne.El("mk-tiedeliite__sisallys", kortti);
            sisallys.style.display = DisplayStyle.None;

            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tiedeliite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(vieritys);

            var navi = Rakenne.El("mk-tiedeliite__navi", kortti, PickingMode.Ignore);
            edellinen = Rakenne.Nappi("", "mk-tiedeliite__navinappi", () => Selaa(-1), navi);
            seuraava = Rakenne.Nappi("", "mk-tiedeliite__navinappi mk-tiedeliite__navinappi--seuraava", () => Selaa(1), navi);
            Kirjasimet.Aseta(navi, Kirjasin.Kone);

            suurennos = new Kuvasuurennos(juuri);
        }

        /// <summary>KeksinnotLinssi.JuttuPyydetty: sivu auki pysäkille i.</summary>
        public void Avaa(KeksinnotLinssi l, int i)
        {
            linssi = l;
            nykyinen = -1;
            if (!Vaihda(i)) return;
            if (Auki) return;
            Auki = true;
            Aanet.PulunTehoste("paper");
            Rakenne.Nayta(peite, true, 220);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            lukija.Pysayta();
            suurennos.Sulje();
            sisallys.style.display = DisplayStyle.None;
            Rakenne.Nayta(peite, false, 220);
            SyoteLukko.Vapauta(this);
            linssi?.JuttuSuljettu();
        }

        bool Vaihda(int j)
        {
            var s = linssi?.Tiedeliite(j);
            if (s == null || j == nykyinen) return s != null;
            bool avattu = nykyinen >= 0;
            nykyinen = j;
            paikkarivi.text = s.Paikkarivi ?? "";
            paikkarivi.style.display = string.IsNullOrEmpty(s.Paikkarivi) ? DisplayStyle.None : DisplayStyle.Flex;
            var sivu = vieritys.contentContainer;
            sivu.Clear();
            vieritys.scrollOffset = Vector2.zero;
            PiirraSivu(sivu, s);
            lukija.Aseta(new[] { s.Otsikko }.Concat(s.Ingressi).Concat(s.Juttu).Concat(s.Henkilojuttu), "Kuuntele tiedeliite");
            Naviteksti(edellinen, s.Edellinen, "‹", true);
            Naviteksti(seuraava, s.Seuraava, "›", false);
            if (avattu) linssi.JuttuVaihtui(j);
            if (sisallys.style.display == DisplayStyle.Flex) TaytaSisallys();
            return true;
        }

        void Selaa(int suunta)
        {
            var s = linssi?.Tiedeliite(nykyinen);
            int j = s == null ? -1 : suunta < 0 ? s.Edellinen : s.Seuraava;
            if (j < 0) return;
            Aanet.PulunTehoste("paper");
            Vaihda(j);
        }

        /// <summary>Navinappi: "‹ 1876 Bell" tai päässä "‹ Kaaren alku" harmaana.</summary>
        void Naviteksti(Button nappi, int j, string merkki, bool ennen)
        {
            var t = j >= 0 ? linssi.Tiedeliite(j) : null;
            nappi.SetEnabled(t != null);
            var l = nappi.Q<Label>();
            if (t == null) { l.text = ennen ? merkki + " Kaaren alku" : "Kaaren loppu " + merkki; return; }
            string nimi = (t.Henkilo ?? t.Otsikko ?? "").Trim();
            string aika = Ajoitus(t);
            l.text = ennen ? merkki + " " + (aika + " " + nimi).Trim() : (aika + " " + nimi).Trim() + " " + merkki;
        }

        static string Ajoitus(TiedeliiteSivu s)
        {
            string p = s.Paikkarivi ?? "";
            int i = p.IndexOf(" · ", StringComparison.Ordinal);
            return i < 0 ? p : p.Substring(0, i);
        }

        // --- sisällys (☰) --------------------------------------------------------------------

        void VaihdaSisallys()
        {
            bool auki = sisallys.style.display != DisplayStyle.Flex;
            if (auki) TaytaSisallys();
            sisallys.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void TaytaSisallys()
        {
            sisallys.Clear();
            var lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-tiedeliite__sisallyslista");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisallys.Add(lista);
            if (linssi == null) return;
            // Linssisepän Sisallys(): sivulliset pysäkit (indeksi, vuosi, otsikko, henkilö).
            foreach (var (j, vuosi, otsikko, henkilo) in linssi.Sisallys())
            {
                int k = j;
                var rivi = Rakenne.Nappi(null, "mk-tiedeliite__sisallysrivi" + (j == nykyinen ? " mk-valittu" : ""), () =>
                {
                    sisallys.style.display = DisplayStyle.None;
                    Vaihda(k);
                }, lista);
                Kirjasimet.Aseta(Rakenne.Teksti(vuosi ?? "", "mk-tiedeliite__sisallysvuosi", rivi), Kirjasin.Kone);
                Rakenne.Teksti(henkilo ?? otsikko ?? "", "mk-tiedeliite__sisallysnimi", rivi);
            }
        }

        // --- sivu (web piirraTiedeliitteenSivu) ------------------------------------------------

        void PiirraSivu(VisualElement sivu, TiedeliiteSivu s)
        {
            Kirjasimet.Aseta(Rakenne.Teksti(s.Otsikko ?? "", "mk-tiedeliite__otsikko", sivu), Kirjasin.LukuLihava);
            if (!string.IsNullOrEmpty(s.Henkilo))
                Kirjasimet.Aseta(Rakenne.Teksti(s.Henkilo.ToUpperInvariant(), "mk-tiedeliite__henkilo", sivu), Kirjasin.Kone);
            foreach (var k in s.Ingressi) Rakenne.Teksti(k, "mk-tiedeliite__ingressi", sivu);

            var palsta = Rakenne.El("mk-tiedeliite__palsta", sivu, PickingMode.Ignore);
            var leipa = Rakenne.El("mk-tiedeliite__leipa", palsta, PickingMode.Ignore);
            foreach (var k in s.Juttu) Rakenne.Teksti(k, "mk-tiedeliite__kappale", leipa);
            Kasvot(palsta, s.Kasvot, s.Henkilo, "mk-tiedeliite__kasvot--pieni");

            if (s.Ilmiot.Count > 1) Karuselli(sivu, s.Ilmiot);
            else foreach (var k in s.Ilmiot) Ilmiokuva(sivu, k);

            if (s.Henkilojuttu.Count > 0)
            {
                var osio = Rakenne.El("mk-tiedeliite__keksija", sivu, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(s.Henkilo ?? "Keksijä", "mk-tiedeliite__valiotsikko", osio), Kirjasin.LukuLihava);
                var rivi = Rakenne.El("mk-tiedeliite__palsta", osio, PickingMode.Ignore);
                var teksti = Rakenne.El("mk-tiedeliite__leipa", rivi, PickingMode.Ignore);
                foreach (var k in s.Henkilojuttu) Rakenne.Teksti(k, "mk-tiedeliite__kappale", teksti);
                if (s.Aito != null) Kasvot(rivi, new[] { s.Aito }, s.Henkilo, "mk-tiedeliite__kasvot--aito");
            }
        }

        static string Lahde(Kuvatieto k) => !string.IsNullOrEmpty(k.Tiedosto) ? k.Tiedosto : k.Osoite;

        void Suurenna(Kuvatieto k) => suurennos.Avaa(new List<LehtiKuva>
        {
            new LehtiKuva { Lahde = Lahde(k), Lyhyt = k.LyhytTeksti, Selite = k.PitkaTeksti, LahdeRivi = k.Lahde },
        });

        VisualElement Kuva(VisualElement isa, Kuvatieto k, string luokka)
        {
            var kehys = Rakenne.El(luokka, isa);
            var kuva = Rakenne.El("mk-tiedeliite__kuva", kehys);
            kuva.AddManipulator(new Clickable(() => Suurenna(k)));
            NostoSisalto.HaeKuva(Lahde(k), t =>
            {
                if (kehys.panel == null) return;
                if (t == null) { kehys.style.display = DisplayStyle.None; return; }
                kuva.style.backgroundImage = new StyleBackground(t);
            });
            if (!string.IsNullOrEmpty(k.LyhytTeksti)) Rakenne.Teksti(k.LyhytTeksti, "mk-tiedeliite__kuvateksti", kehys);
            return kehys;
        }

        void Kasvot(VisualElement isa, IReadOnlyList<Kuvatieto> kuvat, string henkilo, string luokka)
        {
            if (kuvat == null || kuvat.Count == 0) return;
            var rivi = Rakenne.El("mk-tiedeliite__kasvot " + luokka, isa, PickingMode.Ignore);
            foreach (var k in kuvat) Kuva(rivi, k, "mk-tiedeliite__kasvo");
        }

        void Ilmiokuva(VisualElement isa, Kuvatieto k) => Kuva(isa, k, "mk-tiedeliite__ilmio");

        /// <summary>Web piirraIlmiokaruselli: yksi kuva kerrallaan, ‹ ›, pisteet, pyyhkäisy (kynnys 30 px).</summary>
        void Karuselli(VisualElement isa, IReadOnlyList<Kuvatieto> kuvat)
        {
            var kehys = Rakenne.El("mk-tiedeliite__karuselli", isa);
            var ikkuna = Rakenne.El("mk-tiedeliite__karuselli-ikkuna", kehys);
            var kuva = Rakenne.El("mk-tiedeliite__kuva mk-tiedeliite__kuva--karuselli", ikkuna);
            var vas = Rakenne.Nappi("‹", "mk-tiedeliite__karuselli-nuoli", null, ikkuna);
            var oik = Rakenne.Nappi("›", "mk-tiedeliite__karuselli-nuoli mk-tiedeliite__karuselli-nuoli--oikea", null, ikkuna);
            var teksti = Rakenne.Teksti("", "mk-tiedeliite__kuvateksti", kehys);
            var pisteet = Rakenne.El("mk-tiedeliite__pisteet", kehys, PickingMode.Ignore);
            var pistenapit = new List<Button>();
            int kohdalla = 0;
            var tekstuurit = new Texture2D[kuvat.Count];
            void Nayta()
            {
                var k = kuvat[kohdalla];
                teksti.text = k.LyhytTeksti;
                vas.SetEnabled(kohdalla > 0);
                oik.SetEnabled(kohdalla < kuvat.Count - 1);
                for (int j = 0; j < pistenapit.Count; j++) pistenapit[j].EnableInClassList("mk-valittu", j == kohdalla);
                kuva.style.backgroundImage = tekstuurit[kohdalla] != null ? new StyleBackground(tekstuurit[kohdalla]) : new StyleBackground(StyleKeyword.None);
            }
            void Siirry(int j)
            {
                int uusi = Mathf.Clamp(j, 0, kuvat.Count - 1);
                if (uusi == kohdalla) return;
                kohdalla = uusi;
                Aanet.PulunTehoste("paper");
                Nayta();
            }
            vas.clicked += () => Siirry(kohdalla - 1);
            oik.clicked += () => Siirry(kohdalla + 1);
            for (int j = 0; j < kuvat.Count; j++)
            {
                int k = j;
                pistenapit.Add(Rakenne.Nappi(null, "mk-tiedeliite__piste", () => Siirry(k), pisteet));
                NostoSisalto.HaeKuva(Lahde(kuvat[j]), t =>
                {
                    tekstuurit[k] = t;
                    if (k == kohdalla && kehys.panel != null) Nayta();
                });
            }
            // Pyyhkäisy vaakaan vaihtaa kuvaa, napautus suurentaa.
            Vector2 alku = default;
            bool painettu = false;
            kuva.RegisterCallback<PointerDownEvent>(e => { alku = e.position; painettu = true; });
            kuva.RegisterCallback<PointerUpEvent>(e =>
            {
                if (!painettu) return;
                painettu = false;
                float dx = e.position.x - alku.x, dy = e.position.y - alku.y;
                if (Mathf.Abs(dx) >= KaruselliKynnys && Mathf.Abs(dx) > Mathf.Abs(dy)) Siirry(kohdalla + (dx < 0 ? 1 : -1));
                else if (Mathf.Abs(dx) < 6f && Mathf.Abs(dy) < 6f) Suurenna(kuvat[kohdalla]);
            });
            Nayta();
        }
    }
}
