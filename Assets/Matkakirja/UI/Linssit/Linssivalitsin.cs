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
    public sealed partial class Linssivalitsin
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
        /// <summary>Paneeli (UiNakymat: koko ruudun peitto sammuttaa pallon kameran).</summary>
        public VisualElement Paneeli => paneeli;
        public event Action<bool> AukiMuuttui;

        /// <summary>
        /// Paneeli on yläpalkin ☰-valikko (ei silmälasinappia eikä erillistä linssipaneelia): iPhonella omistaja 24.9. klo
        /// 13.3x, kaikilla laitteilla löydös 65 (omistaja 25.9.2026, build 12 iPad).
        /// </summary>
        public static bool Valikkona => true;

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
            // PANEELI-pohja (omistaja 1.10.2026, web #3804): paperipinta ja pergamenttirengas tokeneista (Linssit.uss "PANEELI").
            paneeli.AddToClassList("mk-paneeli--pohja");
            Kirjasimet.Aseta(paneeli, Kirjasin.Kone);

            var ylarivi = Rakenne.El("mk-selite__ylarivi", paneeli, PickingMode.Ignore);
            // Pillerivalikon alinäkymät (Linssit, Aarteet): ‹ Takaisin pääsivulle (Linssivalitsin.Pilleri.cs).
            alaTakaisin = Rakenne.Nappi("‹ Takaisin", "mk-selite__sulje mk-linssivalitsin__takaisin", () => NaytaNakyma(Nakyma.Paa), ylarivi);
            alaTakaisin.tooltip = "Takaisin valikkoon";
            alaTakaisin.style.display = DisplayStyle.None;
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
            this.vieritys = vieritys;
            LuoPilleriOsat(turva, kerros);

            // Muut-paneeli: sama pergamentti ja kehys, ‹ takaisin ja ✕, rivit (Valikkona).
            muut = Rakenne.El("mk-linssivalitsin mk-linssivalitsin--valikko mk-linssivalitsin--muut", turva);
            muut.style.display = DisplayStyle.None;
            // PANEELI-pohja (omistaja 1.10.2026, web #3804): paperipinta ja pergamenttirengas tokeneista (Linssit.uss "PANEELI").
            muut.AddToClassList("mk-paneeli--pohja");
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
            // Karttaselitteen nappi on paikallaan myös linssin aikana (löydös 42), joten taikalasit pysyvät sen alla.
            // Linsseissä, joissa selite piiloutuu (aikajana, astronautti), taikalasitkin ovat piilossa.
            float yla = Ylapalkki.Varaus + 8 + 48;
            nappi.style.top = yla;
            // iPhonen valikkona suoraan saaren rivin alle (turva-alueen yläreuna + 8).
            paneeli.style.top = Valikkona ? Ylapalkki.Varaus + 8 : yla + 48;
            AsetteleEsikatselu();
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
            nappi.style.display = sallittu && !Valikkona && !Aloitusnakyma.AloitusAuki && !Ylapalkki.PalkkiPiilossa
                && (tunnettuja > 0 || testiLinssit != null) ? DisplayStyle.Flex : DisplayStyle.None;

        /// <summary>Päällä olevan linssin tunnus (null = ei mitään): napin kulta ja rivin korostus.</summary>
        public void Merkitse(string id)
        {
            aukiId = id;
            nappi.EnableInClassList("mk-paalla", id != null);
            foreach (var (rid, rivi, tila) in rivit)
            {
                bool p = rid == (id ?? EiLinssia);
                rivi.EnableInClassList("mk-valittu", p);
                tila.text = p ? "PÄÄLLÄ" : ""; // PANEELI: tila kapiteelina (web #3811)
            }
            // Pillerivalikossa linssi otetaan pois "Ei linssiä" -riviltä kuten webissä.
            poisNappi.style.display = id != null && !PilleriValikko ? DisplayStyle.Flex : DisplayStyle.None;
            Asettele();
        }

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            // Linssisepän lykätty aineisto (linssiseppa/lykatty-data): valitsimen avaus lataa linssit heti, jos joutilas hetki
            // ei ole vielä tullut (noin 15–20 s käynnistyksestä); idempotentti.
            LinssiOhjain.LataaAineistoHeti();
            if (Auki) return;
            Auki = true;
            bool v = Valikkona;
            paneeli.EnableInClassList("mk-linssivalitsin--valikko", v);
            lisaosa.style.display = v ? DisplayStyle.Flex : DisplayStyle.None;
            foreach (var (rivi, nakyy) in lisarivit) rivi.style.display = nakyy == null || nakyy() ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaKytkimet();
            PaivitaNappirivit();
            Asettele();
            Rakenna();
            if (PilleriValikko) { NaytaNakyma(Nakyma.Paa); Avautuu?.Invoke(); PaivitaSaatimet(); }
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
            SuljeEsikatselu();
            nappi.RemoveFromClassList("mk-valittu");
            AukiMuuttui?.Invoke(false);
        }

        // --- iPhonen ☰-valikon yläosa (omistaja 24.9.2026 klo 13.3x) -----------------------------------
        //   rivi 1: äänikytkimet (Kertoja, Musiikki, Äänimaisema) suorina toggle-nappeina
        //   rivi 2: Uusi peli · Muut · Kehittäjä (vain kehittäjätilassa)
        //   Muut avaa samannäköisen paneelin päälle: loput toiminnot ja ‹ Takaisin.

        /// <summary>
        /// Uusi nappirivi pääsivulle tai annettuun osaan (Asetukset). Rivin napit ovat kiinni toisissaan (omistaja 29.9.2026 klo
        /// 23.0x, 1.0.56): yhteinen reuna, pyöristys vain rivin päissä (PaivitaNappirivit merkitsee näkyvistä ensimmäisen ja viimeisen).
        /// </summary>
        public VisualElement LisaNappirivi(VisualElement isa = null) =>
            Rakenne.El("mk-valikkorivi mk-valikkorivi--yhtenainen", isa ?? lisaosa, PickingMode.Ignore);

        /// <summary>Yhtenäisten rivien päät näkyvien nappien mukaan (piilotettu Retkikunta tai Kehittäjätyökalut ei jätä kulmaa).</summary>
        void PaivitaNappirivit()
        {
            paneeli.Query<VisualElement>(className: "mk-valikkorivi--yhtenainen").ForEach(rivi =>
            {
                VisualElement eka = null, vika = null;
                foreach (var c in rivi.Children())
                {
                    if (c.style.display == DisplayStyle.None) continue;
                    eka ??= c;
                    vika = c;
                }
                foreach (var c in rivi.Children())
                {
                    c.EnableInClassList("mk-valikkonappi--eka", c == eka);
                    c.EnableInClassList("mk-valikkonappi--vika", c == vika);
                }
            });
        }

        Button ValikkoNappi(VisualElement isa, string nimi, string ikoni, Action painettu, string luokka = "mk-valikkonappi")
        {
            var b = Rakenne.Nappi(null, luokka, painettu, isa);
            b.tooltip = nimi;
            var kuva = new SvgIkoni(ikoni ?? Ikonit.Valikko);
            kuva.AddToClassList("mk-valikkonappi__ikoni");
            b.Add(kuva);
            var t = Rakenne.Teksti(nimi, "mk-valikkonappi__nimi", b);
            Kirjasimet.Aseta(t, Kirjasin.KoneLihava);
            // Nimi aina kokonaan (1.0.55-laitekuvat: "Äänimai…" 12,5 px:llä ja "Äänimaise…" vielä 11,5 px:llä): vapaa tila luetaan
            // asettelusta ja fonttia pienennetään vain tarvittaessa 0,25 px:n portain (vähintään 9,5 px), kuten RadioNakyma.SovitaNimi.
            float perus = 0f, tulossa = -1f;
            void Sovita()
            {
                if (perus <= 0f) perus = t.resolvedStyle.fontSize;
                if (perus <= 0f || string.IsNullOrEmpty(t.text)) return;
                // Labelin oma reunus ja sisäreunus mukaan (1.0.56-palautteen laitekuva: ilman niitä "Äänimaise…" 300 pt:n valikossa).
                var ts = t.resolvedStyle;
                float muut = ts.marginLeft + ts.marginRight + ts.paddingLeft + ts.paddingRight + ts.borderLeftWidth + ts.borderRightWidth;
                foreach (var c in b.Children())
                    if (c != t && c.resolvedStyle.display != DisplayStyle.None)
                        muut += c.layout.width + c.resolvedStyle.marginLeft + c.resolvedStyle.marginRight;
                float tila = (b.contentRect.width - muut) * 0.95f;
                if (float.IsNaN(tila) || tila <= 0f) return;
                float nyt = ts.fontSize > 0f ? ts.fontSize : perus;
                float leveys = t.MeasureTextSize(t.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x * perus / nyt;
                float koko = leveys > tila ? Mathf.Max(9.5f, Mathf.Floor(perus * tila / leveys * 4f) / 4f) : perus;
                if (Mathf.Abs(nyt - koko) <= 0.01f || Mathf.Abs(koko - tulossa) <= 0.01f) return;
                // Seuraavaan ruutuun (1.0.62-savuke: asetus kesken asettelun toi "Layout update is struggling" -varoituksen).
                tulossa = koko;
                t.schedule.Execute(() =>
                {
                    t.style.fontSize = tulossa;
                    Debug.Log($"MATKAKIRJA ui valikkonappi: {nimi} {perus:0.##} → {tulossa:0.##} px (tila {tila:0.#}, teksti {leveys:0.#})");
                });
            }
            // Vain napin oma koko (paneelin leveys) sovittaa: labelin koko muuttuu sovituksesta itsestään, eikä sitä kuunnella.
            b.RegisterCallback<GeometryChangedEvent>(_ => Sovita());
            return b;
        }

        // VALIKKOJEN KOLME NAPPITYYPPIÄ (omistaja 29.9.2026 klo 20.2x: "järkeistä noita valikoita … eri väripohjia"; Päätoimittajan
        // malli): sama muoto ja korkeus (48 pt), raot 12 pt, sama kulma ja reuna. NAVIGOINTI avaa näkymän (kuvake + nimi + ›,
        // LisaAlinakyma), KYTKIN on päällä meripihka ja pois pergamentti himmeällä tekstillä, TOIMINTO on kertatoiminto ohuella
        // reunuksella ilman täyttöä (Matkakirja.uss/Linssit.uss .mk-valikkonappi--*).

        /// <summary>Toiminto: valikko sulkeutuu ja toiminto ajetaan (nakyy kysytään avattaessa); pysy = valikko jää auki.</summary>
        public Button LisaNappi(VisualElement rivi, string nimi, string ikoni, Action toiminto, Func<bool> nakyy = null, bool pysy = false)
        {
            var b = ValikkoNappi(rivi, nimi, ikoni, () => { if (!pysy) Sulje(); toiminto?.Invoke(); }, "mk-valikkonappi mk-valikkonappi--toiminto");
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        /// <summary>Kytkin: vaihtaa tilan valikon pysyessä auki; päällä-tila korostettuna (nakyy kysytään avattaessa).</summary>
        public Button LisaKytkin(VisualElement rivi, string nimi, string ikoni, Func<bool> paalla, Action vaihda, Func<bool> nakyy = null)
        {
            Button b = null;
            b = ValikkoNappi(rivi, nimi, ikoni, () => { vaihda?.Invoke(); PaivitaKytkimet(); });
            b.AddToClassList("mk-valikkonappi--kytkin");
            kytkimet.Add((b, paalla));
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        void PaivitaKytkimet()
        {
            foreach (var (b, paalla) in kytkimet) b.EnableInClassList("mk-valittu", paalla != null && paalla());
            // Kytkin voi tuoda tai viedä rivejä (Maailma → Näytä huntu, Laitetestaaja 1.1 (82)): näkyvyys heti, ei vasta avauksessa.
            foreach (var (rivi, nakyy) in lisarivit) rivi.style.display = nakyy == null || nakyy() ? DisplayStyle.Flex : DisplayStyle.None;
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
            if (Valikkona && !tyhjaValikko && !PilleriValikko)
            {
                Rakenne.El("mk-linssivalitsin__erotin", lista, PickingMode.Ignore);
                Rakenne.Teksti("LINSSIT", "mk-selite__otsikko mk-linssivalitsin__valiotsikko", lista);
            }
            if (tiedot.Count == 0 && !tyhjaValikko) Rakenne.Teksti("Linssit latautuvat…", "mk-linssivalitsin__tyhja", lista);
            if (PilleriValikko && tiedot.Count > 0)
            {
                // Web (js/ui.js paivitaLinssiTiedot, pariteetti-2 rivi 12): "Ei linssiä" ja valmiit, sitten otsikko
                // KESKENERÄISET ja keskeneräiset sen alla.
                LuoEiLinssia();
                foreach (var t in tiedot) if (!t.Kesken) LuoRivi(t);
                if (tiedot.Exists(t => t.Kesken))
                {
                    var o = Rakenne.Teksti("KESKENERÄISET", "mk-selite__otsikko mk-linssivalitsin__valiotsikko", lista);
                    Kirjasimet.Aseta(o, Kirjasin.Kone);
                    // Maininta vain otsikossa, ei linssin nimessä (omistaja 29.9.2026 klo 23.0x, 1.0.56).
                    foreach (var t in tiedot) if (t.Kesken) LuoRivi(t);
                }
            }
            else foreach (var t in tiedot) LuoRivi(t);
            Merkitse(r?.Auki?.Tiedot?.Id ?? aukiId);
        }

        readonly Dictionary<string, LinssiTiedot> linssiTiedot = new Dictionary<string, LinssiTiedot>();
        static string EsikatselunKuva(LinssiTiedot t) => string.IsNullOrEmpty(t.Havainnekuva) ? Matkalaukku.VarusteKuva(t.Id) : t.Havainnekuva;
        static string EsikatselunTeksti(LinssiTiedot t) => string.IsNullOrEmpty(t.Esittely) ? t.Lyhyt : t.Esittely;

        /// <summary>"Ei linssiä" -rivin tunnus rivilistassa (web linssiRivi(null)).</summary>
        const string EiLinssia = "";
        /// <summary>Yliviivatut taikalasit ("Ei linssiä": rivi ja esikatseluikkunan kuvake).</summary>
        static string EiLinssiaIkoni => Ikonit.Viiva["taikalasit"] + "<path d=\"M5.4 5.4 20 20\"/>";
        /// <summary>Linssin viivakuvake (rivi ja esikatseluikkuna, kun kuvaa ei ole).</summary>
        static string LinssinIkoni(LinssiTiedot t) => string.IsNullOrEmpty(t.Ikoni) ? Ikonit.Viiva["taikalasit"] : t.Ikoni;

        /// <summary>Web linssiRivi(null, 'Ei linssiä'): yliviivatut taikalasit, esikatselu ilman kuvaa, toiminto sulkee linssin.</summary>
        void LuoEiLinssia()
        {
            Button b = null;
            Label tila = null;
            b = Rakenne.Nappi(null, "mk-linssirivi", () =>
            {
                if (esiId != EiLinssia)
                {
                    Esikatsele(EiLinssia, b, tila, null, "Ei linssiä", "Kartta sellaisena kuin isoisä sen piirsi.",
                        aukiId == null ? "Ota pois" : "Aktivoi", () => { Sulje(); Suljettava?.Invoke(); }, EiLinssiaIkoni);
                    return;
                }
                Sulje();
                Suljettava?.Invoke();
            }, lista);
            b.tooltip = "Ei linssiä";
            b.AddToClassList("mk-linssirivi--aktivoi");
            var ikoni = new SvgIkoni(EiLinssiaIkoni);
            ikoni.AddToClassList("mk-linssirivi__ikoni");
            b.Add(ikoni);
            var nimirivi = Rakenne.El("mk-linssirivi__nimirivi", Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore), PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Ei linssiä", "mk-linssirivi__nimi", nimirivi), Kirjasin.LukuLihava);
            tila = Rakenne.Teksti("", "mk-linssirivi__tila", nimirivi);
            rivit.Add((EiLinssia, b, tila));
        }

        void LuoRivi(LinssiTiedot t, string nimenPerassa = "")
        {
            string id = t.Id;
            linssiTiedot[id] = t;
            Button b = null;
            Label tila = null;
            // Web (Pelikoodari): kuva LINSSI.havainnekuva tai varana varusteen kuva, teksti esittely tai varana lyhyt.
            string kuva = EsikatselunKuva(t);
            // Pillerivalikko (Pelikoodari 29.9., web malli): 1. napautus esikatselu vasemmalle ja rivi "Aktivoi", 2. avaa.
            b = Rakenne.Nappi(null, "mk-linssirivi", () =>
            {
                if (PilleriValikko && esiId != id)
                {
                    // Web (Pelikoodari): kuva LINSSI.havainnekuva tai varana varusteen kuva, teksti esittely tai varana lyhyt.
                    // Aktiivisen linssin rivi: "Ota pois" (palaute 6, web).
                    bool paalla = id == aukiId;
                    Esikatsele(id, b, tila, EsikatselunKuva(t), t.Nimi, EsikatselunTeksti(t), paalla ? "Ota pois" : "Aktivoi",
                        paalla ? () => { Sulje(); Suljettava?.Invoke(); } : () => { Sulje(); Valittu?.Invoke(id); }, LinssinIkoni(t));
                    return;
                }
                Sulje();
                Valittu?.Invoke(id);
            }, lista);
            b.tooltip = t.Nimi;
            if (PilleriValikko) b.AddToClassList("mk-linssirivi--aktivoi");
            var ikoni = new SvgIkoni(string.IsNullOrEmpty(t.Ikoni) ? Ikonit.Viiva["taikalasit"] : t.Ikoni);
            ikoni.AddToClassList("mk-linssirivi__ikoni");
            if (PilleriValikko && !string.IsNullOrEmpty(kuva))
            {
                // Web: rivikuvakkeena havainnekuva pyöreänä (kokoelma-rivi kuvaPieni); viivapiirros vain kun kuva ei lataudu.
                var kehys = Rakenne.El("mk-linssirivi__ikoni mk-linssirivi__kuva", b, PickingMode.Ignore);
                kehys.Add(ikoni);
                ikoni.RemoveFromClassList("mk-linssirivi__ikoni");
                ikoni.AddToClassList("mk-linssirivi__varaikoni");
                Kuvat.Hae(kuva, tex =>
                {
                    if (tex == null || kehys.panel == null) return;
                    kehys.style.backgroundImage = new StyleBackground(tex);
                    ikoni.RemoveFromHierarchy();
                });
            }
            else b.Add(ikoni);
            var tekstit = Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore);
            var nimirivi = Rakenne.El("mk-linssirivi__nimirivi", tekstit, PickingMode.Ignore);
            var nimi = Rakenne.Teksti((t.Nimi ?? id) + nimenPerassa, "mk-linssirivi__nimi", nimirivi);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            tila = Rakenne.Teksti("", "mk-linssirivi__tila", nimirivi);
            if (!string.IsNullOrEmpty(t.Lyhyt) && !PilleriValikko)
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
                && !EsikatseluSisaltaa(p) && (Avaaja == null || !Avaaja.worldBound.Contains(p))
                && !Avaajat.Exists(a => a != null && a.panel != null && a.worldBound.Contains(p))) { UiKerros.OhiSulki(); Sulje(); }  // maakuntalappu ei aukea samasta napautuksesta (omistaja 30.9.2026)
        }
    }
}
