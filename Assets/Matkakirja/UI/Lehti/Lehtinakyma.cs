// LEHTINÄKYMÄ (Natiivi-UI): kaupunki- ja maalehti natiivina (omistajan päätös 23.9.2026:
// WKWebView-kuori poistuu). Webin #arrival-dialog (.dialog.lehti.arkki, js/lehti.js,
// js/sivunkaanto.js, css/styles.css lehti-osiot; docs/moduulit/kaupunkilehti.md, maalehti.md).
//
// Arkki: paperi #f5f0e2 rakeella, leveys min(960, ruutu), terävät kulmat, taustapeite
// rgba(14,9,4,.34). Yksi sivu kerrallaan:
//   etusivu   masto (UNOHDETTU AARRE · NIMIÖ · "Maa · N. matkapäivä"), pääkuva (avauskuvien
//             karuselli tai kansikuva), esittely, kuvarivi (Ennen/Nyt tai kansikuvat 2–3),
//             Matkailijalle-laatikko
//   aihe      aihe-otsikko (versaali, viivat; lainatulla maasivulla lippu), johdanto
//             kursiivilla, nostot (otsikko + aika, kuva ja lyhyt kuvateksti + lähde, teksti
//             kappaleittain, galleria ‹ ›, "Lue lisää aiheesta" (Wikipedia), musiikkinäyte),
//             Menovinkit-listat, lopuksi lehden minitehtävä (+10 £)
// Alapalkki: Poistu lehdestä · ‹ edellinen aihe · seuraava aihe › · maalehdessä Sisällys (☰).
// Sivunkääntö: vaakapyyhkäisy (≥ 60 pt ja |dx| ≥ 2|dy|) tai napit; sivu liukuu (300 ms),
// paperiääni ja vieritys alkuun. Kaiutin lukee sivun leipätekstit kertojan äänellä
// (Puhe.Lue kappaleittain ketjussa); sivunvaihto pysäyttää. Kuvan napautus → suurennos.
// Pelin tila ja teot (minitehtävä, lehden kysymys, juliste, pulla, kätkö) kulkevat
// Pelikoodarin ILehtiNakyma-sopimuksen kautta; siihen asti Tekoja-kutsu → PeliOhjain.KauppaTeko.
// Maalehden ensimmäisellä sivulla masto ja maaosasto (tunnusluvut, tervehdykset).
// Erot webiin: sivunkääntö on liuku eikä kirjan taitos; sää, uutiset, radio, kulttuurivisa,
// maakartta ja maan intro tulevat, kun data on paketissa (Siirtoseppä, skeema 1.13).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Lehtinakyma
    {
        const int Kerros = UiKerros.Traileri; // kaiken pelin UI:n päällä kuten webin dialogi

        readonly VisualElement peite, arkki, sivupaikka, alapalkki, sisallys, sisallysLista;
        readonly Label ylaNimi;
        readonly Button kaiutin, sisallysNappi, poistu, edellinen, seuraava;
        readonly Kuvasuurennos suurennos;
        ScrollView sivu;
        Lehti lehti;
        int nyt = -1;
        bool luetaan;
        int lukuVersio;
        Vector2 veto0;
        bool vetaa;

        public bool Auki { get; private set; }
        /// <summary>Lehti avautui (omistaja: kaupunki tai ISO).</summary>
        public event Action<string> Avautui;
        /// <summary>Lehti suljettiin (omistaja), kerran per avaus.</summary>
        public event Action<string> Suljettu;
        /// <summary>Sivu tuli näkyviin (omistaja, aiheId, sivu): pulun reaktiot ja luennat ohjaimessa.</summary>
        public event Action<string, string, int> SivuNakyi;
        /// <summary>
        /// Minitehtävän vastaus (kaupunki/omistaja, aihe, oikein, palkkio) → KauppaTulos. Pelikoodarin
        /// ILehtiNakyma.TeeTeko korvaa; oletus PeliOhjain.KauppaTeko(Minitehtava).
        /// </summary>
        public Func<string, string, bool, int, KauppaTulos> Minitehtava = (kaupunki, aihe, oikein, palkkio) =>
            PeliOhjain.Instanssi?.KauppaTeko(k => k.Minitehtava(kaupunki, aihe, oikein, palkkio));
        /// <summary>Onko minitehtävä jo vastattu (kaupunki, aihe).</summary>
        public Func<string, string, bool> MinitehtavaVastattu = (kaupunki, aihe) =>
            PeliOhjain.Instanssi?.Kaupat?.MinitehtavaVastattu(kaupunki, aihe) ?? false;

        public Lehtinakyma(UiKerros ui)
        {
            var juuri = ui.Juuri(Kerros);
            peite = Rakenne.El("mk-lehti__peite", juuri);
            peite.style.display = DisplayStyle.None;
            arkki = Rakenne.El("mk-lehti", peite);
            Rakenne.Tausta(arkki, Kuviot.Pergamentti);
            Kirjasimet.Aseta(arkki, Kirjasin.Luku);

            var ylarivi = Rakenne.El("mk-lehti__ylarivi", arkki, PickingMode.Ignore);
            sisallysNappi = Rakenne.Nappi(null, "mk-lehti__ikoninappi", VaihdaSisallys, ylarivi, Ikonit.Valikko);
            sisallysNappi.tooltip = "Sisällys";
            ylaNimi = Rakenne.Teksti("", "mk-lehti__ylanimi", ylarivi);
            Kirjasimet.Aseta(ylaNimi, Kirjasin.Kone);
            kaiutin = Rakenne.Nappi(null, "mk-lehti__ikoninappi", VaihdaLuenta, ylarivi, Ikonit.Viiva["kaiutin"]);
            kaiutin.tooltip = "Lue sivu ääneen";

            sivupaikka = Rakenne.El("mk-lehti__sivupaikka", arkki);
            sivupaikka.RegisterCallback<PointerDownEvent>(e => { veto0 = e.position; vetaa = true; }, TrickleDown.TrickleDown);
            sivupaikka.RegisterCallback<PointerUpEvent>(e => Veto(e.position), TrickleDown.TrickleDown);
            sivupaikka.RegisterCallback<PointerCancelEvent>(_ => vetaa = false, TrickleDown.TrickleDown);

            alapalkki = Rakenne.El("mk-lehti__alapalkki", arkki, PickingMode.Ignore);
            poistu = Rakenne.Nappi("Poistu lehdestä", "mk-lehti__poistu", Sulje, alapalkki);
            Kirjasimet.Aseta(poistu, Kirjasin.Kone);
            edellinen = Rakenne.Nappi("", "mk-lehti__selaus", () => Kaanna(nyt - 1), alapalkki);
            seuraava = Rakenne.Nappi("", "mk-lehti__selaus mk-lehti__selaus--seuraava", () => Kaanna(nyt + 1), alapalkki);
            Kirjasimet.Aseta(edellinen, Kirjasin.Kone);
            Kirjasimet.Aseta(seuraava, Kirjasin.Kone);

            sisallys = Rakenne.El("mk-lehti__sisallys", arkki);
            sisallys.style.display = DisplayStyle.None;
            var so = Rakenne.El("mk-lehti__sisallysyla", sisallys, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("SISÄLLYS", "mk-lehti__sisallysotsikko", so), Kirjasin.Kone);
            Rakenne.Nappi("×", "mk-nosto__sulje", () => sisallys.style.display = DisplayStyle.None, so);
            var sv = new ScrollView(ScrollViewMode.Vertical);
            sv.AddToClassList("mk-lehti__sisallysvieritys");
            sisallys.Add(sv);
            sisallysLista = sv.contentContainer;

            suurennos = new Kuvasuurennos(juuri);
        }

        // --- avaus ja sulkeminen -------------------------------------------------------------

        /// <summary>Avaa lehden: kaupunkilehti (omistaja = kaupunki) tai maalehti (ISO3, aihe aloitussivuksi).</summary>
        public void Nayta(LehtiLaji laji, string omistaja, string aihe = null, int? sivu = null)
        {
            UiKerros.Hae().StartCoroutine(LehtiSisalto.Hae(laji, omistaja, l =>
            {
                if (l == null)
                {
                    Debug.Log("MATKAKIRJA ui lehti: ei lehteä " + laji + " " + omistaja);
                    UiNakymat.Hae()?.Tilarivi.Viesti("Lehteä ei löytynyt");
                    if (Auki) return;
                    Suljettu?.Invoke(omistaja);
                    return;
                }
                if (Auki && lehti != null && lehti.Omistaja != l.Omistaja) Suljettu?.Invoke(lehti.Omistaja);
                lehti = l;
                ylaNimi.text = (l.Laji == LehtiLaji.Maa ? l.Nimi + " · maan oma lehti" : l.Nimi).ToUpperInvariant();
                sisallysNappi.style.display = l.Laji == LehtiLaji.Maa && l.Sivut.Count >= 3 ? DisplayStyle.Flex : DisplayStyle.None;
                sisallys.style.display = DisplayStyle.None;
                int alku = sivu ?? LehtiSisalto.SivuAiheelle(l, aihe);
                nyt = -1;
                NaytaSivu(Mathf.Clamp(alku, 0, l.Sivut.Count - 1), 0);
                if (!Auki)
                {
                    Auki = true;
                    peite.style.display = DisplayStyle.Flex;
                    Rakenne.Nayta(peite, true, 220);
                    SyoteLukko.Esta(this);
                    Avautui?.Invoke(l.Omistaja);
                }
            }));
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            PysaytaLuenta();
            suurennos.Sulje();
            Rakenne.Nayta(peite, false, 220);
            SyoteLukko.Vapauta(this);
            Aanet.PulunTehoste("paper");
            Suljettu?.Invoke(lehti?.Omistaja);
        }

        // --- sivut ----------------------------------------------------------------------------

        void Kaanna(int uusi)
        {
            if (lehti == null || uusi < 0 || uusi >= lehti.Sivut.Count || uusi == nyt) return;
            NaytaSivu(uusi, uusi > nyt ? 1 : -1);
        }

        void Veto(Vector2 loppu)
        {
            if (!vetaa) return;
            vetaa = false;
            var d = loppu - veto0;
            if (Mathf.Abs(d.x) < 60f || Mathf.Abs(d.x) < 2f * Mathf.Abs(d.y)) return;
            Kaanna(nyt + (d.x < 0 ? 1 : -1));
        }

        void NaytaSivu(int i, int suunta)
        {
            PysaytaLuenta();
            var vanha = sivu;
            nyt = i;
            sivu = new ScrollView(ScrollViewMode.Vertical);
            sivu.AddToClassList("mk-lehti__sivu");
            sivu.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sivu.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sivupaikka.Add(sivu);
            var s = lehti.Sivut[i];
            if (s.Laji == LehtiSivuLaji.Etusivu) Etusivu(sivu.contentContainer, s);
            else Aihesivu(sivu.contentContainer, s);

            if (vanha != null)
            {
                if (suunta == 0 || LinssiUi.VahennettyLiike()) vanha.RemoveFromHierarchy();
                else
                {
                    // Liuku: uusi tulee sivusta, vanha väistyy (web sivu-oikealta/-vasemmalta).
                    Aanet.PulunTehoste("paper");
                    sivu.style.translate = new Translate(Length.Percent(100 * suunta), 0);
                    sivu.schedule.Execute(() =>
                    {
                        sivu.AddToClassList("mk-lehti__sivu--liuku");
                        sivu.style.translate = new Translate(0, 0);
                        vanha.AddToClassList("mk-lehti__sivu--liuku");
                        vanha.style.translate = new Translate(Length.Percent(-100 * suunta), 0);
                        vanha.style.opacity = 0f;
                    });
                    vanha.schedule.Execute(() => vanha.RemoveFromHierarchy()).StartingIn(340);
                }
            }
            PaivitaAlapalkki();
            SivuNakyi?.Invoke(lehti.Omistaja, s.Aihe?.Id, i);
        }

        void PaivitaAlapalkki()
        {
            var sivut = lehti.Sivut;
            bool ensimmainen = nyt == 0, viimeinen = nyt == sivut.Count - 1;
            edellinen.style.display = ensimmainen ? DisplayStyle.None : DisplayStyle.Flex;
            seuraava.style.display = viimeinen ? DisplayStyle.None : DisplayStyle.Flex;
            if (!ensimmainen) edellinen.Q<Label>().text = "‹ " + sivut[nyt - 1].Lyhyt;
            if (!viimeinen) seuraava.Q<Label>().text = sivut[nyt + 1].Lyhyt + " ›";
            poistu.Q<Label>().text = lehti.Laji == LehtiLaji.Maa ? "Poistu" : "Poistu lehdestä";
            alapalkki.style.display = DisplayStyle.Flex;
        }

        // --- etusivu ----------------------------------------------------------------------------

        void Etusivu(VisualElement s, LehtiSivu sivu)
        {
            var a = sivu.Aihe;
            Masto(s);
            var paakuvat = a.Avauskuvat.Count > 0 ? a.Avauskuvat : a.Kansikuvat.Take(1).ToList();
            if (paakuvat.Count > 0) Kuvasarja(s, paakuvat, "mk-lehti__paakuva");
            var esittely = lehti.Johdanto ?? a.Johdanto;
            if (!string.IsNullOrEmpty(esittely)) Kappale(s, esittely, "mk-lehti__esittely");
            var rivi = a.EnnenNyt.Count >= 2 ? a.EnnenNyt.Take(2).ToList()
                : (a.Avauskuvat.Count > 0 ? a.Kansikuvat.Take(2) : a.Kansikuvat.Skip(1).Take(2)).ToList();
            if (rivi.Count > 0)
            {
                var r = Rakenne.El("mk-lehti__kuvarivi", s, PickingMode.Ignore);
                bool ennenNyt = a.EnnenNyt.Count >= 2;
                for (int i = 0; i < rivi.Count; i++)
                {
                    var solu = Rakenne.El("mk-lehti__kuvasolu", r, PickingMode.Ignore);
                    Kuva(solu, rivi[i], rivi, i, "mk-lehti__rivikuva", 0.75f);
                    string etu = ennenNyt ? (i == 0 ? "Ennen " : "Nyt ") : "";
                    var t = Rakenne.Teksti($"<b>{etu}</b>{rivi[i].Lyhyt}", "mk-lehti__kuvateksti", solu);
                    t.enableRichText = true;
                }
            }
            if (!string.IsNullOrEmpty(a.MatkailijalleKappale))
            {
                var m = Rakenne.El("mk-lehti__matkailijalle", s, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("MATKAILIJALLE", "mk-lehti__osasto", m), Kirjasin.Kone);
                if (a.MatkailijalleKuva != null) Kuva(m, a.MatkailijalleKuva, new List<LehtiKuva> { a.MatkailijalleKuva }, 0, "mk-lehti__nostokuva", 0.62f);
                Kappale(m, a.MatkailijalleKappale, "mk-lehti__leipa");
            }
        }

        void Masto(VisualElement s)
        {
            var m = Rakenne.El("mk-lehti__masto", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("UNOHDETTU AARRE", "mk-lehti__nimioyla", m), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(lehti.Nimi.ToUpperInvariant(), "mk-lehti__nimio", m), Kirjasin.Kone);
            string paiva = PeliOhjain.Instanssi?.Matka != null ? PeliOhjain.Instanssi.Matka.Tila.Paiva() + ". matkapäivä" : null;
            string pvm = lehti.Laji == LehtiLaji.Maa ? "Maan oma lehti" : string.Join(" · ", new[] { lehti.MaaNimi, paiva }.Where(x => !string.IsNullOrEmpty(x)));
            var p = Rakenne.El("mk-lehti__paivays", m, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(pvm.ToUpperInvariant(), "mk-lehti__paivaysteksti", p), Kirjasin.Kone);
        }

        // --- aihesivu ------------------------------------------------------------------------

        void Aihesivu(VisualElement s, LehtiSivu sivu)
        {
            var a = sivu.Aihe;
            // Maalehden ensimmäinen sivu: masto ja maaosasto (tunnusluvut, tervehdykset), web maa-osasto.
            if (lehti.Laji == LehtiLaji.Maa && nyt == 0) { Masto(s); Maaosasto(s, UiSisalto.Maa(lehti.Maa)); }
            var ot = Rakenne.El("mk-lehti__aihe", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti((sivu.Otsikko ?? "").ToUpperInvariant(), "mk-lehti__aiheteksti", ot), Kirjasin.KoneLihava);
            if (a.LainattuMaasta != null && UiSisalto.Maa(a.LainattuMaasta)?.Lippu.FirstOrDefault() is string lippu)
            {
                var l = Rakenne.El("mk-lehti__lippu", ot, PickingMode.Ignore);
                Natiivi.Kuvat.Hae(lippu, t => { if (t != null) l.style.backgroundImage = new StyleBackground(t); }, "liput");
            }
            if (!string.IsNullOrEmpty(a.Johdanto)) Kappale(s, a.Johdanto, "mk-lehti__johdanto", Kirjasin.LukuKursiivi);

            foreach (var n in a.Nostot) Nosto(s, n);
            foreach (var (otsikko, kohteet) in a.Lista) Lista(s, otsikko, kohteet);
            if (a.Tehtava != null && sivu.TehtavaAihe != null) Tehtava(s, a.Tehtava, sivu.TehtavaAihe);
            if (a.Nostot.Count == 0 && a.Lista.Count == 0 && a.Tehtava == null && string.IsNullOrEmpty(a.Johdanto))
                Kappale(s, "Tämä sivu täydentyy myöhemmin.", "mk-lehti__leipa");
        }

        void Nosto(VisualElement s, LehtiNosto n)
        {
            var lohko = Rakenne.El("mk-lehti__nosto", s, PickingMode.Ignore);
            var otsikkorivi = Rakenne.El("mk-lehti__nosto-otsikkorivi", lohko, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(n.Otsikko ?? "", "mk-lehti__nosto-otsikko", otsikkorivi), Kirjasin.LukuLihava);
            if (!string.IsNullOrEmpty(n.Aika)) Kirjasimet.Aseta(Rakenne.Teksti(n.Aika, "mk-lehti__aika", otsikkorivi), Kirjasin.Kone);
            var kuvat = n.Galleria.Count > 0 ? n.Galleria : (n.Kuva != null ? new List<LehtiKuva> { n.Kuva } : new List<LehtiKuva>());
            if (kuvat.Count > 1) Kuvasarja(lohko, kuvat, "mk-lehti__nostokuva");
            else if (kuvat.Count == 1)
            {
                Kuva(lohko, kuvat[0], kuvat, 0, "mk-lehti__nostokuva", n.Leveys == "taysi" ? 0.56f : 0.66f);
                Kuvateksti(lohko, kuvat[0]);
            }
            foreach (var k in Kappaleet(n.Teksti)) Kappale(lohko, k, "mk-lehti__leipa");
            var loppu = Rakenne.El("mk-lehti__nostoloppu", lohko, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(n.Nayte))
            {
                string url = n.Nayte;
                var b = Rakenne.Nappi("▷ " + (n.NayteNimi ?? "Kuuntele musiikkia"), "mk-lehti__linkki", () => Puhe.Hae()?.Soita(url), loppu);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (!string.IsNullOrEmpty(n.Wiki))
            {
                string wiki = n.Wiki;
                var b = Rakenne.Nappi("Lue lisää aiheesta ›", "mk-lehti__linkki", () => Application.OpenURL("https://fi.wikipedia.org/wiki/" + Uri.EscapeDataString(wiki.Replace(' ', '_'))), loppu);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (!string.IsNullOrEmpty(n.Linkki))
            {
                string url = n.Linkki;
                var b = Rakenne.Nappi("Avaa sivusto ›", "mk-lehti__linkki", () => Application.OpenURL(url), loppu);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
        }

        void Lista(VisualElement s, string otsikko, List<LehtiListaKohde> kohteet)
        {
            var lohko = Rakenne.El("mk-lehti__lista", s, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(otsikko)) Kirjasimet.Aseta(Rakenne.Teksti(otsikko.ToUpperInvariant(), "mk-lehti__osasto", lohko), Kirjasin.Kone);
            foreach (var k in kohteet)
            {
                var rivi = Rakenne.El("mk-lehti__listarivi", lohko, PickingMode.Ignore);
                if (k.Kuva != null) Kuva(rivi, k.Kuva, new List<LehtiKuva> { k.Kuva }, 0, "mk-lehti__listakuva", 0.75f);
                var tekstit = Rakenne.El("mk-lehti__listatekstit", rivi, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Nimi ?? "", "mk-lehti__listanimi", tekstit), Kirjasin.LukuLihava);
                if (!string.IsNullOrEmpty(k.Teksti)) Kappale(tekstit, k.Teksti, "mk-lehti__listateksti");
                if (!string.IsNullOrEmpty(k.Linkki))
                {
                    string url = k.Linkki;
                    Kirjasimet.Aseta(Rakenne.Nappi("Avaa ›", "mk-lehti__linkki", () => Application.OpenURL(url), tekstit), Kirjasin.Kone);
                }
            }
        }

        void Tehtava(VisualElement s, LehtiTehtava t, string aihe)
        {
            string omistaja = lehti.Laji == LehtiLaji.Kaupunki ? lehti.Omistaja
                : (PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja.Sijainti.Kaupunki ?? lehti.Omistaja);
            var laatikko = Rakenne.El("mk-lehti__tehtava", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("LEHDEN MINITEHTÄVÄ", "mk-lehti__tehtavaotsake", laatikko), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(t.Kysymys ?? "", "mk-lehti__kysymys", laatikko), Kirjasin.LukuLihava);
            if (MinitehtavaVastattu(omistaja, aihe))
            {
                Kappale(laatikko, t.Fakta ?? "Tämän sivun minitehtävä on jo ratkaistu.", "mk-lehti__tehtavavihje");
                return;
            }
            Kappale(laatikko, $"Oikeasta vastauksesta saat {KauppaVakiot.MinitehtavaPalkkio} puntaa.", "mk-lehti__tehtavavihje");
            var napit = new List<Button>();
            var tulos = Rakenne.Teksti("", "mk-lehti__tehtavatulos", laatikko);
            tulos.style.display = DisplayStyle.None;
            for (int i = 0; i < t.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                var b = Rakenne.Nappi(t.Vaihtoehdot[i], "mk-nosto__visanappi", null, laatikko);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                b.clicked += () =>
                {
                    bool oikein = valinta == t.Oikea;
                    var r = Minitehtava?.Invoke(omistaja, aihe, oikein, KauppaVakiot.MinitehtavaPalkkio);
                    if (r != null && !r.Ok && r.Virhe != "Jo vastattu") { tulos.text = r.Virhe; tulos.style.display = DisplayStyle.Flex; return; }
                    foreach (var x in napit) x.SetEnabled(false);
                    if (t.Oikea >= 0 && t.Oikea < napit.Count) napit[t.Oikea].AddToClassList("mk-oikein");
                    if (!oikein) b.AddToClassList("mk-vaarin");
                    tulos.text = (oikein ? $"Oikein! +{KauppaVakiot.MinitehtavaPalkkio} puntaa. " : $"Oikea vastaus: {t.Vaihtoehdot[t.Oikea]}. ") + (t.Fakta ?? "");
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.style.display = DisplayStyle.Flex;
                };
                napit.Add(b);
            }
        }

        void Maaosasto(VisualElement s, MaaTiedot m)
        {
            if (m == null) return;
            var rivit = new List<(string, string)>();
            void R(string nimi, string arvo, string sija) { if (!string.IsNullOrEmpty(arvo)) rivit.Add((nimi, arvo + (string.IsNullOrEmpty(sija) ? "" : "  (" + sija + ")"))); }
            R("Väkiluku", m.Vakiluku, m.VakilukuSija);
            R("Pinta-ala", m.PintaAla, m.PintaAlaSija);
            R("Demokratiaindeksi", m.Demokratia, m.DemokratiaSija);
            R("Keskitulo", m.Keskitulo, m.KeskituloSija);
            if (!string.IsNullOrEmpty(m.Valtiomuoto)) rivit.Insert(0, ("Valtiomuoto 1873", m.Valtiomuoto));
            if (rivit.Count == 0 && m.Tervehdykset.Count == 0) return;
            var laatikko = Rakenne.El("mk-lehti__maaosasto", s, PickingMode.Ignore);
            foreach (var (nimi, arvo) in rivit)
            {
                var r = Rakenne.El("mk-lehti__tunnusrivi", laatikko, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(nimi, "mk-lehti__tunnusnimi", r), Kirjasin.Kone);
                Kirjasimet.Aseta(Rakenne.Teksti(arvo, "mk-lehti__tunnusarvo", r), Kirjasin.LukuLihava);
            }
            if (m.Tervehdykset.Count > 0)
            {
                string terv = string.Join(" · ", m.Tervehdykset.Select(t => t.Teksti + (string.IsNullOrEmpty(t.Kieli) ? "" : " (" + t.Kieli + ")")));
                Kirjasimet.Aseta(Rakenne.Teksti("Tervehdys: " + terv, "mk-lehti__tervehdys", laatikko), Kirjasin.LukuKursiivi);
            }
        }

        // --- kuvat ja teksti --------------------------------------------------------------------

        void Kuva(VisualElement isa, LehtiKuva k, List<LehtiKuva> sarja, int indeksi, string luokka, float suhde)
        {
            var kehys = Rakenne.El("mk-lehti__kuvakehys " + luokka, isa);
            var kuva = Rakenne.El("mk-lehti__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => suurennos.Avaa(sarja, indeksi));
            float omaSuhde = suhde;
            void Mitoita() { float w = kehys.resolvedStyle.width; if (w > 0) kehys.style.height = Mathf.Min(Mathf.Round(w * omaSuhde), 520f); }
            kehys.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (t == null) { kehys.style.display = DisplayStyle.None; return; }
                kuva.style.backgroundImage = new StyleBackground(t);
                // Kuvan oma suhde (pystykuva korkeintaan 1,3 × leveys), kuten webin object-fit contain.
                omaSuhde = Mathf.Clamp((float)t.height / Mathf.Max(1, t.width), 0.4f, 1.3f);
                Mitoita();
            });
        }

        void Kuvateksti(VisualElement isa, LehtiKuva k)
        {
            if (!string.IsNullOrEmpty(k.Lyhyt)) Kirjasimet.Aseta(Rakenne.Teksti(k.Lyhyt, "mk-lehti__kuvateksti", isa), Kirjasin.LukuKursiivi);
            if (!string.IsNullOrEmpty(k.LahdeRivi)) Kirjasimet.Aseta(Rakenne.Teksti(k.LahdeRivi, "mk-lehti__lahde", isa), Kirjasin.Kone);
        }

        void Kuvasarja(VisualElement isa, List<LehtiKuva> kuvat, string luokka)
        {
            var lohko = Rakenne.El("mk-lehti__kuvasarja", isa, PickingMode.Ignore);
            var paikka = Rakenne.El("mk-lehti__kuvasarjapaikka", lohko, PickingMode.Ignore);
            var tekstit = Rakenne.El("mk-lehti__kuvasarjatekstit", lohko, PickingMode.Ignore);
            int i = 0;
            void Nayta(int uusi)
            {
                i = (uusi % kuvat.Count + kuvat.Count) % kuvat.Count;
                paikka.Clear();
                tekstit.Clear();
                Kuva(paikka, kuvat[i], kuvat, i, luokka, 0.66f);
                var kehys = paikka.Q(className: "mk-lehti__kuvakehys");
                if (kuvat.Count > 1 && kehys != null)
                {
                    var ed = Rakenne.Nappi("‹", "mk-nosto__selaa mk-nosto__selaa--vasen", () => Nayta(i - 1), kehys);
                    var se = Rakenne.Nappi("›", "mk-nosto__selaa mk-nosto__selaa--oikea", () => Nayta(i + 1), kehys);
                    ed.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                    se.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                    Kirjasimet.Aseta(Rakenne.Teksti($"{i + 1} / {kuvat.Count}", "mk-nosto__laskuri", kehys), Kirjasin.Kone);
                }
                Kuvateksti(tekstit, kuvat[i]);
            }
            Nayta(0);
        }

        static void Kappale(VisualElement isa, string teksti, string luokka, Kirjasin kirjasin = Kirjasin.Luku)
        {
            var l = Rakenne.Teksti(teksti ?? "", luokka, isa);
            l.enableRichText = false;
            Kirjasimet.Aseta(l, kirjasin);
            l.AddToClassList("mk-lehti__luettava");
        }

        /// <summary>Tyhjä rivi erottaa kappaleet (webin leipäteksti).</summary>
        static IEnumerable<string> Kappaleet(string teksti) =>
            string.IsNullOrWhiteSpace(teksti) ? Enumerable.Empty<string>()
                : Regex.Split(teksti.Trim(), @"\n\s*\n").Select(x => x.Trim()).Where(x => x.Length > 0);

        // --- sisällys (maalehti) ------------------------------------------------------------------

        void VaihdaSisallys()
        {
            if (sisallys.style.display == DisplayStyle.Flex) { sisallys.style.display = DisplayStyle.None; return; }
            sisallysLista.Clear();
            for (int i = 0; i < lehti.Sivut.Count; i++)
            {
                int kohde = i;
                var s = lehti.Sivut[i];
                var b = Rakenne.Nappi(null, "mk-lehti__sisallysrivi", () => { sisallys.style.display = DisplayStyle.None; Kaanna(kohde); }, sisallysLista);
                b.EnableInClassList("mk-valittu", i == nyt);
                var t = Rakenne.El("mk-lehti__listatekstit", b, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(s.Lyhyt ?? s.Otsikko ?? "", "mk-lehti__listanimi", t), Kirjasin.LukuLihava);
                if (!string.IsNullOrEmpty(s.Aihe?.Johdanto)) Kirjasimet.Aseta(Rakenne.Teksti(s.Aihe.Johdanto, "mk-lehti__listateksti", t), Kirjasin.Luku);
            }
            var palaa = Rakenne.Nappi("‹ Palaa kartalle", "mk-lehti__linkki", Sulje, sisallysLista);
            Kirjasimet.Aseta(palaa, Kirjasin.Kone);
            sisallys.style.display = DisplayStyle.Flex;
        }

        // --- luenta (kaiutin) ----------------------------------------------------------------------

        void VaihdaLuenta()
        {
            if (luetaan) { PysaytaLuenta(); return; }
            var palat = sivu?.contentContainer.Query<Label>(className: "mk-lehti__luettava").ToList().Select(l => l.text).Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var puhe = Puhe.Hae();
            if (palat == null || palat.Count == 0 || puhe == null) return;
            luetaan = true;
            kaiutin.AddToClassList("mk-valittu");
            int v = ++lukuVersio;
            int i = 0;
            void Seuraava()
            {
                if (v != lukuVersio || i >= palat.Count) { if (v == lukuVersio) PysaytaLuenta(); return; }
                puhe.Lue(palat[i++], "kertoja", 0, Seuraava);
            }
            Seuraava();
        }

        void PysaytaLuenta()
        {
            if (!luetaan) return;
            luetaan = false;
            lukuVersio++;
            kaiutin.RemoveFromClassList("mk-valittu");
            Puhe.Instanssi?.Pysayta(0.3f);
        }

        // --- testi ---------------------------------------------------------------------------------

        /// <summary>Testikomento: "sivu n" kääntää, "sisallys" avaa sisällyksen, "kuva" suurennoksen.</summary>
        public void Testaa(string mita, int n)
        {
            switch (mita)
            {
                case "sivu": Kaanna(n); break;
                case "sisallys": if (lehti?.Laji == LehtiLaji.Maa) VaihdaSisallys(); break;
                case "kuva":
                    var k = sivu?.contentContainer.Q(className: "mk-lehti__kuvakehys");
                    if (k != null) using (var e = ClickEvent.GetPooled()) { e.target = k; k.SendEvent(e); }
                    break;
            }
        }
    }
}
