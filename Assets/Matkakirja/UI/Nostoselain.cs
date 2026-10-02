// NOSTOSELAIN (Natiivi-UI; omistaja 1.10.2026, mallit 20 + 22 + 23, loki b3e273d72; vain natiivi, web ei muutu).
// NOSTOKORTTI-pohjan osat NOSTOSELAIN ja AUTO (tyylikirja.json pohjat.NOSTOKORTTI.osat):
//   rivi      vetokahvan alla ‹ [Nostot ▾] › (TOIMINTO-nappi ja askelnapit 44 pt)
//   paneeli   PANEELI (paperi) kortin päällä rivin alla: "<MAA> · NOSTOT" kapiteelina, aihesirut "Historia (2/6)"
//             (luetut/kaikki) ja valitun aiheen nostot (nykyinen korostettuna, luettu ✓ himmeänä). Sulku: ohinapautus, Esc,
//             avaaja. Rivin napautus avaa noston.
//   ‹ ›       selaa listan järjestyksessä: aiheet karttaselitteen järjestyksessä (NostoMerkit.Jarjestys), aiheen sisällä
//             datan järjestys. Kartta lentää nostoon (PalloKierto.Aja, korkeus ennallaan).
//   AUTO      lukijan rivin vasemmalla: avautuva nosto luetaan itse ja luennan jälkeen siirrytään seuraavaan 3 s:n
//             laskurilla (TUMMA lappu "Seuraava: <nimi> 3 s · Pysäytä"). Sama asetus kuin lehden jatkuva luenta
//             (PlayerPrefs matkakirja-lukija-auto, web localStorage sama avain).
// Kaupungit eivät ole listalla (niiden valo avaa kaupungin, ei nostoa); näkymätön (NostonMuste.Nakyy false) ei ole.
// Testikomennot Nostokortti.Testaa-nimillä: selain, selain-seuraava, selain-edellinen, selain-siru:<aihe>, selain-rivi:<n>,
// auto, auto-pois, siirto, pysayta.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Nostoselain
    {
        /// <summary>Lehden jatkuvan luennan avain (Lehtinakyma.JatkuvaAvain): yksi asetus kummallekin.</summary>
        public const string AutoAvain = "matkakirja-lukija-auto";
        public static bool Auto
        {
            get => PlayerPrefs.GetInt(AutoAvain, 0) == 1;
            set { PlayerPrefs.SetInt(AutoAvain, value ? 1 : 0); PlayerPrefs.Save(); }
        }

        const float SiirtoS = 3f, LentoS = 1.2f;

        readonly VisualElement kortti, rivi, paneeli, siruRivi, lappu, palkki;
        readonly ScrollView sirut, lista;
        readonly Button edellinen, seuraava, avaaja, pysayta;
        readonly Label otsikko, lappuNimi, lappuAika;
        readonly Action<string> avaa;
        readonly Action autoVaihtui;
        Button autoNappi;
        readonly List<NostoKerros.Nosto> jarjestys = new List<NostoKerros.Nosto>();
        string nykyinen, maa, aihe;
        IVisualElementScheduledItem siirtoAjo;
        float siirtoAlku;

        public bool PaneeliAuki { get; private set; }
        /// <summary>Kortin pystyvieritys (Kosketusvieritys) vierittää paneelin listaa, kun paneeli on auki.</summary>
        public ScrollView Vierittava => PaneeliAuki ? lista : null;
        public bool SiirtoKaynnissa => siirtoAjo != null;

        /// <summary>Testilokiin: "selain 3/12 · historia (2/6) [· paneeli] [· auto] [· siirto]".</summary>
        public string Kuvaus
        {
            get
            {
                if (rivi.style.display == DisplayStyle.None) return "selain ei näy";
                int i = jarjestys.FindIndex(x => x.Id == nykyinen);
                var (l, k) = Maarat(aihe);
                return $"selain {i + 1}/{jarjestys.Count} · {aihe} ({l}/{k})" + (PaneeliAuki ? " · paneeli" : "")
                       + (Auto ? " · auto" : "") + (SiirtoKaynnissa ? " · siirto" : "");
            }
        }

        /// <summary>Ylärivin sivut: vasemmalle noston kategoria, oikealle lukijan napit (näkyvät, kun selain näkyy).</summary>
        public readonly VisualElement Vasen, Oikea;
        public bool Nakyvissa => rivi.style.display != DisplayStyle.None;
        /// <summary>Tätä kapeammalla rivillä (pt) kategoriasta näkyy vain symboli (puhelin ~340 pt; iPadin kortti ~390 pt,
        /// jossa pitkä kategoria lyhenee …-merkillä).</summary>
        const float KapeaRivi = 360f;

        public Nostoselain(VisualElement kortti, VisualElement ennen, Action<string> avaa, Action autoVaihtui)
        {
            this.kortti = kortti;
            this.avaa = avaa;
            this.autoVaihtui = autoVaihtui;

            // Yksi ylärivi (omistaja 2.10.2026 klo 17.5x ja 18.4x, loki b00599567): vasemmalla kategoria (symboli ja nimi), keskellä
            // ryhmänä ‹ NOSTOT ▾ › ilman kehystä ja AUTO sen vieressä, oikeassa reunassa ≡ ja kaiutin; kaikki HISTORIA-otsakkeen
            // kirjasimella samalla keskilinjalla (rivi perii .mk-nosto__ylarivi-kirjasimen).
            rivi = Rakenne.El("mk-nostoselain mk-nosto__ylarivi", null, PickingMode.Ignore);
            kortti.Insert(kortti.IndexOf(ennen), rivi);
            Vasen = Rakenne.El("mk-nostoselain__sivu mk-nostoselain__sivu--vasen", rivi, PickingMode.Ignore);
            edellinen = Rakenne.Nappi("‹", "mk-nostoselain__askel", () => Askel(-1), rivi);
            // Nostopaneelin ylärivi (omistaja 2.10. klo 13.53): ‹ NOSTOT ▾ › ja AUTO samalla rivillä HISTORIA-kapiteelin
            // kirjasimella, molemmat kevyinä suorakulmioina (ei ovaalia; web #3849 AUTO:n malli).
            avaaja = Rakenne.Nappi("NOSTOT", "mk-nostoselain__avaaja", VaihdaPaneeli, rivi);
            // ▾ piirroksena (Kone-kirjasimesta puuttuu merkki: laitteella neliö).
            Rakenne.Ikoni("<path class=\"taytto\" d=\"M7.5 10h9L12 15z\"/>", "mk-nostoselain__avaajaikoni", avaaja);
            seuraava = Rakenne.Nappi("›", "mk-nostoselain__askel", () => Askel(1), rivi);
            // Oikea reuna: ≡ ja kaiutin (lukijan paikka, Nostokortti.SiirraYlarivi). Sivut yhtä leveät → keskiryhmä keskellä.
            Oikea = Rakenne.El("mk-nostoselain__sivu mk-nostoselain__sivu--oikea", rivi, PickingMode.Ignore);
            // Puhelimella rivi ei mahdu kokonaan (5fc4be80: HISTORIA katkesi ja ≡ meni päälle): kapealla kategoriasta vain symboli.
            // Luokka riippuu vain kortin leveydestä (ei rivin sisällöstä), joten asettelu ei kierrä.
            rivi.RegisterCallback<GeometryChangedEvent>(e => rivi.EnableInClassList("mk-nostoselain--kapea", e.newRect.width < KapeaRivi));
            edellinen.tooltip = "Edellinen nosto";
            seuraava.tooltip = "Seuraava nosto";
            Kirjasimet.Aseta(avaaja, Kirjasin.Kone);
            // Teksti perii HISTORIA-rivin koon ja harvennuksen (ei .mk-nappi__teksti-kokoa 15 px).
            avaaja.Q<Label>(className: "mk-nappi__teksti")?.RemoveFromClassList("mk-nappi__teksti");
            Kirjasimet.Aseta(edellinen, Kirjasin.Kone);
            Kirjasimet.Aseta(seuraava, Kirjasin.Kone);

            paneeli = Rakenne.El("mk-nostoselain__paneeli", kortti);
            paneeli.style.display = DisplayStyle.None;
            otsikko = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-nostoselain__otsikko", paneeli);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            sirut = new ScrollView(ScrollViewMode.Horizontal);
            sirut.AddToClassList("mk-nostoselain__sirut");
            sirut.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sirut.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sirut.mode = ScrollViewMode.Horizontal;
            paneeli.Add(sirut);
            siruRivi = sirut.contentContainer;
            siruRivi.AddToClassList("mk-nostoselain__sirurivi");
            lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-nostoselain__lista");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(lista);
            Nappaimisto.Rekisteroi("nostoselain", 61, () => PaneeliAuki, null, null, SuljePaneeli);

            // Siirtolaskuri (malli 23): TUMMA lappu kortin alareunassa, palkki täyttyy 3 s:ssa.
            lappu = Rakenne.El("mk-nostoselain__lappu", kortti);
            lappu.style.display = DisplayStyle.None;
            var teksti = Rakenne.El("mk-nostoselain__lapputeksti", lappu, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Seuraava:", "mk-nostoselain__lappuohje", teksti), Kirjasin.Kone);
            lappuNimi = Rakenne.Teksti("", "mk-nostoselain__lappunimi", teksti);
            lappuAika = Rakenne.Teksti("", "mk-nostoselain__lappuaika", teksti);
            Kirjasimet.Aseta(lappuNimi, Kirjasin.Kone);
            Kirjasimet.Aseta(lappuAika, Kirjasin.KoneBold);
            pysayta = Rakenne.Nappi("Pysäytä", "mk-nostoselain__pysayta", LopetaSiirto, lappu);
            Kirjasimet.Aseta(pysayta, Kirjasin.KoneBold);
            palkki = Rakenne.El("mk-nostoselain__palkki", lappu, PickingMode.Ignore);

            rivi.style.display = DisplayStyle.None;
        }

        /// <summary>AUTO-kytkin selaimen riville oikeaan reunaan NOSTOT-valitsimen kanssa (omistaja 2.10. klo 13.53; ennen lukijan
        /// rivillä ≡:n vasemmalla).</summary>
        public void LisaaAuto()
        {
            autoNappi = Rakenne.Nappi(null, "mk-nostoselain__auto", () => { AsetaAuto(!Auto); }, null);
            Rakenne.El("mk-nostoselain__autopiste", autoNappi, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("AUTO", "mk-nostoselain__autoteksti", autoNappi), Kirjasin.Kone);
            autoNappi.tooltip = "Auto: lukee avautuvat nostot ja siirtyy seuraavaan";
            rivi.Insert(rivi.IndexOf(seuraava) + 1, autoNappi); // NOSTOT-ryhmän viereen keskelle (omistaja 18.4x)
            PaivitaAuto();
        }

        public void AsetaAuto(bool paalle)
        {
            Auto = paalle;
            if (!paalle) LopetaSiirto();
            PaivitaAuto();
            autoVaihtui?.Invoke();
        }

        void PaivitaAuto() => autoNappi?.EnableInClassList("mk-valittu", Auto);

        /// <summary>Kortti avasi valon: lista sen maasta, nykyinen korostetaan (null-maa = rivi piiloon).</summary>
        public void Paivita(string valoId)
        {
            LopetaSiirto();
            nykyinen = valoId;
            var k = NostoKerros.Instanssi;
            var n = k?.NostoIdlla(valoId);
            maa = n?.Maa ?? k?.NykyinenMaa;
            jarjestys.Clear();
            if (k != null && maa != null)
            {
                var mukana = k.MaanNostot(maa).Where(Mukaan).ToList();
                foreach (var r in NostoMerkit.Jarjestys) jarjestys.AddRange(mukana.Where(x => x.Aihe == r.Id));
            }
            aihe = n != null && jarjestys.Contains(n) ? n.Aihe : jarjestys.FirstOrDefault()?.Aihe;
            rivi.style.display = jarjestys.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaAskeleet();
            PaivitaAuto();
            if (PaneeliAuki) RakennaPaneeli();
        }

        static bool Mukaan(NostoKerros.Nosto x) =>
            x.Id != null && x.Aihe != null && x.Aihe != "kaupungit" && x.Aihe != "kaikki" && x.Aihe != "ei"
            && (PeliOhjain.Instanssi == null || PeliOhjain.Instanssi.NostonMuste(x.Id).Nakyy);

        static bool Luettu(NostoKerros.Nosto x) => PeliOhjain.Instanssi != null && PeliOhjain.Instanssi.NostonMuste(x.Id).Loydetty;

        static string Nimi(NostoKerros.Nosto x) => x.Nimi ?? x.Nimio ?? x.Id;

        (int Luetut, int Kaikki) Maarat(string a)
        {
            int l = 0, n = 0;
            foreach (var x in jarjestys)
                if (x.Aihe == a) { n++; if (Luettu(x)) l++; }
            return (l, n);
        }

        NostoKerros.Nosto Naapuri(int suunta)
        {
            if (jarjestys.Count == 0) return null;
            int i = jarjestys.FindIndex(x => x.Id == nykyinen);
            if (i < 0) return suunta > 0 ? jarjestys[0] : null;
            int j = i + suunta;
            return j >= 0 && j < jarjestys.Count ? jarjestys[j] : null;
        }

        void PaivitaAskeleet()
        {
            edellinen.SetEnabled(Naapuri(-1) != null);
            seuraava.SetEnabled(Naapuri(1) != null);
        }

        public bool Askel(int suunta)
        {
            var x = Naapuri(suunta);
            if (x == null) return false;
            Siirry(x);
            return true;
        }

        void Siirry(NostoKerros.Nosto x)
        {
            LopetaSiirto();
            SuljePaneeli();
            nykyinen = x.Id;
            aihe = x.Aihe;
            PaivitaAskeleet();
            var kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            kierto?.Aja(x.OmaLat, x.OmaLon, 0, LentoS, null);
            avaa?.Invoke(x.Id);
        }

        // --- paneeli -------------------------------------------------------------------------

        public void VaihdaPaneeli()
        {
            if (PaneeliAuki) { SuljePaneeli(); return; }
            if (jarjestys.Count == 0) return;
            PaneeliAuki = true;
            avaaja.AddToClassList("mk-valittu");
            RakennaPaneeli();
            Sijoita();
            paneeli.BringToFront();
            Rakenne.NaytaHeti(paneeli);
            Ponnahdus.Avaa(paneeli, origo: new TransformOrigin(Length.Percent(50), 0));
        }

        public void SuljePaneeli()
        {
            if (!PaneeliAuki) return;
            PaneeliAuki = false;
            avaaja.RemoveFromClassList("mk-valittu");
            Ponnahdus.Sulje(paneeli, () => { if (!PaneeliAuki) paneeli.style.display = DisplayStyle.None; });
        }

        /// <summary>Paneeli rivin alle koko kortin leveydelle; alareuna kortin sisällä (lista vierii).</summary>
        void Sijoita()
        {
            float yla = rivi.layout.yMax;
            if (float.IsNaN(yla) || yla <= 0) yla = 72f;
            paneeli.style.top = Mathf.Round(yla + Tyylikirja.Vali.Xs);
        }

        void RakennaPaneeli()
        {
            var nimi = UiSisalto.Maa(maa)?.Nimi ?? maa ?? "";
            otsikko.text = (nimi + " · Nostot").ToUpperInvariant();
            siruRivi.Clear();
            Button valittu = null;
            foreach (var r in NostoMerkit.Jarjestys)
            {
                var (l, k) = Maarat(r.Id);
                if (k == 0) continue;
                string id = r.Id;
                var s = Rakenne.Nappi($"{r.Koko} ({l}/{k})", "mk-nostoselain__siru", () => ValitseAihe(id), siruRivi);
                Kirjasimet.Aseta(s, Kirjasin.KoneBold);
                if (id == aihe) { s.AddToClassList("mk-valittu"); valittu = s; }
            }
            lista.Clear();
            lista.scrollOffset = Vector2.zero;
            VisualElement nyt = null;
            int i = 0;
            foreach (var x in jarjestys)
            {
                if (x.Aihe != aihe) continue;
                var nosto = x;
                bool luettu = Luettu(x);
                // Kehyksettömät rivit, jakoviiva välissä (omistaja 17.5x, loki cc217e829: "nostoissa ei pidä olla kehystä ympärillä").
                var b = Rakenne.Nappi(null, "mk-nostoselain__rivi", () => Siirry(nosto), lista);
                if (i > 0) b.AddToClassList("mk-nostoselain__rivi--viiva");
                b.name = "rivi-" + i++;
                Kirjasimet.Aseta(Rakenne.Teksti(Nimi(x), "mk-nappi__teksti mk-nostoselain__nimi", b), Kirjasin.KoneBold);
                if (luettu) Kirjasimet.Aseta(Rakenne.Teksti("✓", "mk-nostoselain__luettu", b), Kirjasin.KoneBold);
                Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-nostoselain__nuoli", b), Kirjasin.KoneBold);
                b.EnableInClassList("mk-nostoselain__rivi--luettu", luettu && x.Id != nykyinen);
                if (x.Id == nykyinen) { b.AddToClassList("mk-nostoselain__rivi--nykyinen"); nyt = b; }
            }
            if (valittu != null) Rakenne.Vierita(sirut, valittu, 1);
            if (nyt != null) Rakenne.Vierita(lista, nyt, 1);
        }

        void ValitseAihe(string a)
        {
            aihe = a;
            RakennaPaneeli();
        }

        /// <summary>Painallus kortilla: paneelin ohi (ei avaajaan) sulkee paneelin. true = suljettiin (ei kortin sulkua).</summary>
        public bool OhiPainallus(Vector2 p)
        {
            if (!PaneeliAuki) return false;
            if (paneeli.worldBound.Contains(p) || avaaja.worldBound.Contains(p)) return false;
            SuljePaneeli();
            return true;
        }

        /// <summary>Kortin napautus näihin ei sulje korttia (rivi, paneeli, lappu, AUTO).</summary>
        public bool Sisaltaa(VisualElement e) =>
            e != null && (rivi.Contains(e) || paneeli.Contains(e) || lappu.Contains(e) || (autoNappi != null && autoNappi.Contains(e)));

        // --- AUTO-siirto ----------------------------------------------------------------------

        /// <summary>Luenta loppui omia aikojaan: AUTO päällä → laskuri 3 s ja seuraava nosto (ei seuraavaa: ei laskuria).</summary>
        public bool AloitaSiirto()
        {
            LopetaSiirto();
            var x = Naapuri(1);
            if (x == null) return false;
            lappuNimi.text = Nimi(x);
            lappuAika.text = Mathf.CeilToInt(SiirtoS) + " s";
            palkki.style.width = Length.Percent(0);
            lappu.BringToFront();
            Rakenne.NaytaHeti(lappu);
            siirtoAlku = Time.unscaledTime;
            Ruudunpaivitys.Herata(SiirtoS + 0.2f);
            siirtoAjo = lappu.schedule.Execute(() =>
            {
                float t = Time.unscaledTime - siirtoAlku;
                if (t >= SiirtoS) { Siirry(x); return; }
                lappuAika.text = Mathf.CeilToInt(SiirtoS - t) + " s";
                palkki.style.width = Length.Percent(100f * t / SiirtoS);
            }).Every(0);
            return true;
        }

        public void LopetaSiirto()
        {
            if (siirtoAjo == null) return;
            siirtoAjo.Pause();
            siirtoAjo = null;
            lappu.style.display = DisplayStyle.None;
        }

        /// <summary>Kortti suljettiin: paneeli ja laskuri pois.</summary>
        public void Sulje()
        {
            LopetaSiirto();
            if (PaneeliAuki) { PaneeliAuki = false; avaaja.RemoveFromClassList("mk-valittu"); paneeli.style.display = DisplayStyle.None; }
        }

        /// <summary>Testikomento (Nostokortti.Testaa): null = ok, muuten virhe.</summary>
        public string Testaa(string nappi)
        {
            if (nappi == "selain") { VaihdaPaneeli(); return null; }
            if (nappi == "selain-seuraava") return Askel(1) ? null : "ei seuraavaa nostoa";
            if (nappi == "selain-edellinen") return Askel(-1) ? null : "ei edellistä nostoa";
            if (nappi == "auto") { AsetaAuto(true); return null; }
            if (nappi == "auto-pois") { AsetaAuto(false); return null; }
            if (nappi == "siirto") return AloitaSiirto() ? null : "ei seuraavaa nostoa";
            if (nappi == "pysayta") { LopetaSiirto(); return null; }
            if (nappi.StartsWith("selain-siru:"))
            {
                var a = nappi.Substring(12);
                if (Maarat(a).Kaikki == 0) return "ei aihetta " + a;
                if (!PaneeliAuki) VaihdaPaneeli();
                ValitseAihe(a);
                return null;
            }
            if (nappi.StartsWith("selain-rivi:") && int.TryParse(nappi.Substring(12), out var n))
            {
                var r = lista.contentContainer.Q<Button>("rivi-" + n);
                if (!PaneeliAuki || r == null) return "paneelissa ei riviä " + n;
                using (var s = NavigationSubmitEvent.GetPooled()) { s.target = r; r.SendEvent(s); }
                return null;
            }
            return "selaimella ei ole nappia " + nappi;
        }
    }
}
