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
//             Menovinkit-listat, lopuksi lehden minitehtävä (+10 £) tai sivulle sidottu fokustehtävä
//             (AARTEEN AVAUS / JULISTE, +50 £, pullavinkki; LehtiFokus.cs)
// Alapalkki (web paivitaTutkiAlapalkki): Poistu (himmeä, vasemmalla) · maalehdessä ☰ · Edellinen /
// Seuraava (kaksi riviä: suunta ja sivun nimi); kaupunkilehdessä sen alla täysleveä tehtävänappi
// (LehtiTila.TehtavaNappi: "Tapaa X" / "Etsi kätkö", harmaa = loppuun pelattu) jokaisella sivulla
// ja viimeisellä sivulla "Maa-liite" (→ maalehti). Ylärivin ☰ (sisällys) molemmissa lehdissä, kun
// sivuja on vähintään kaksi.
// Sivunkääntö: vaakapyyhkäisy (≥ 60 pt ja |dx| ≥ 2|dy|) tai napit; sivu liukuu (300 ms),
// paperiääni ja vieritys alkuun. Kaiutin lukee sivun leipätekstit kertojan äänellä
// (Puhe.Lue kappaleittain ketjussa); sivunvaihto pysäyttää. Kuvan napautus → suurennos.
// Pelin tila ja teot (minitehtävä, juliste, kätkö, maalehti, sivu näkyi) kulkevat Pelikoodarin
// ILehtiNakyma-sopimuksen kautta (PeliNakymat.Lehti, LehtiTila, LehtiTeko). Testikomennon avaus
// ilman peliä (Nayta(LehtiLaji, …)) tekee teot suoraan PeliOhjain.KauppaTekona.
// Minitehtävän palkintojuliste (web piirraJulistepalkinto, omistaja 21.–22.8.2026): kaupunkilehdessä,
// jos kaupungilla on juliste, tehtävälaatikon kyljessä vedos (Palkinto/Voitettu); oikea vastaus
// myöntää sen heti ja tuo napin "Lunasta juliste" (suurennos). Jo ratkaistu → takautuva myöntö.
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
    public sealed class Lehtinakyma : ILehtiNakyma
    {
        const int Kerros = UiKerros.Traileri; // kaiken pelin UI:n päällä kuten webin dialogi

        readonly VisualElement peite, arkki, sivupaikka, alapalkki, sisallys, sisallysLista;
        readonly Label ylaNimi;
        readonly Button kaiutin, sisallysNappi, alaSisallys, poistu, edellinen, seuraava, tehtavaNappi, liite;
        readonly Kuvasuurennos suurennos;
        readonly LehtiFokus fokus;
        ScrollView sivu;
        Lehti lehti;
        int nyt = -1;
        bool luetaan;
        int lukuVersio;
        Vector2 veto0;
        bool vetaa;
        // Pelin tila ja teot (ILehtiNakyma); null = testiavaus ilman ohjainta.
        LehtiTila tila;
        Func<LehtiTeko, KauppaTulos> teko;
        string avausKaupunki;

        public bool Auki { get; private set; }
        /// <summary>Auki olevan sivun nimi (palautteen ehdotusSivu) tai null.</summary>
        public string AukiSivunNimi => Auki && lehti != null && nyt >= 0 ? SivunNimi(nyt) : null;
        /// <summary>Lehti avautui (omistaja: kaupunki tai ISO).</summary>
        public event Action<string> Avautui;
        /// <summary>Lehti suljettiin (omistaja), kerran per avaus.</summary>
        public event Action<string> Suljettu;
        /// <summary>Sivu tuli näkyviin (omistaja, aiheId, sivu): pulun reaktiot ja luennat ohjaimessa.</summary>
        public event Action<string, string, int> SivuNakyi;
        /// <summary>Lehden teko ohjaimelle; ilman sopimusta (testiavaus) suoraan kauppoihin.</summary>
        KauppaTulos Teko(LehtiTeko t)
        {
            if (teko != null) return teko(t);
            var o = PeliOhjain.Instanssi;
            if (o == null) return null;
            switch (t.Laji)
            {
                case LehtiTekoLaji.Minitehtavavastaus: return o.KauppaTeko(k => k.Minitehtava(t.Kaupunki, t.Aihe, t.Oikein, t.Palkkio));
                case LehtiTekoLaji.JulisteMyonto: return o.KauppaTeko(k => k.MyonnaJuliste(t.Avain));
                case LehtiTekoLaji.PullaVinkki: return o.KauppaTeko(k => k.PullaVinkki(t.Kaupunki));
                default: return null;
            }
        }

        bool MinitehtavaVastattu(string kaupunki, string aihe) =>
            tila != null ? tila.MinitehtavaVastattu(kaupunki, aihe) : PeliOhjain.Instanssi?.Kaupat?.MinitehtavaVastattu(kaupunki, aihe) ?? false;
        bool MinitehtavaRatkaistu(string kaupunki, string aihe) =>
            tila != null ? tila.MinitehtavaRatkaistu(kaupunki, aihe) : PeliOhjain.Instanssi?.Kaupat?.MinitehtavaRatkaistu(kaupunki, aihe) ?? false;
        bool JulisteLaukussa(string kaupunki) =>
            tila != null ? tila.JulisteLaukussa(kaupunki) : PeliOhjain.Instanssi?.Kaupat?.JulisteLaukussa(kaupunki) ?? false;

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
            var navi = Rakenne.El("mk-lehti__navi", alapalkki, PickingMode.Ignore);
            poistu = Rakenne.Nappi("Poistu lehdestä", "mk-lehti__poistu", Sulje, navi);
            Kirjasimet.Aseta(poistu, Kirjasin.Kone);
            alaSisallys = Rakenne.Nappi(null, "mk-lehti__selaus mk-lehti__selaus--sisallys", VaihdaSisallys, navi, Ikonit.Valikko);
            alaSisallys.tooltip = "Sisällys";
            edellinen = Selausnappi("Edellinen", "mk-lehti__selaus--edellinen", () => Kaanna(nyt - 1), navi);
            seuraava = Selausnappi("Seuraava", "mk-lehti__selaus--seuraava", () => Kaanna(nyt + 1), navi);
            tehtavaNappi = Rakenne.Nappi("", "mk-lehti__tehtavanappi", EtsiKatko, alapalkki);
            Rakenne.Tausta(tehtavaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(tehtavaNappi, Kirjasin.KoneLihava);
            liite = Rakenne.Nappi("", "mk-lehti__liite", AvaaLiite, alapalkki);
            Kirjasimet.Aseta(liite, Kirjasin.Kone);

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
            fokus = new LehtiFokus(() => tila, Teko, suurennos);
        }

        // --- avaus ja sulkeminen -------------------------------------------------------------

        /// <summary>ILehtiNakyma: pelin avaama lehti tiloineen ja tekoineen.</summary>
        public void Nayta(LehtiAvaus avaus, LehtiTila tila, Func<LehtiTeko, KauppaTulos> teeTeko)
        {
            if (avaus == null) return;
            this.tila = tila;
            teko = teeTeko;
            avausKaupunki = avaus.Kaupunki;
            Avaa(avaus.Maalehti ? LehtiLaji.Maa : LehtiLaji.Kaupunki, avaus.Omistaja, avaus.Aihe, avaus.Sivu);
        }

        /// <summary>ILehtiNakyma: raha, vastatut ja tehtävänappi muuttuivat (sivua ei piirretä uudelleen).</summary>
        public void PaivitaTila(LehtiTila tila)
        {
            this.tila = tila;
            if (Auki && lehti != null) PaivitaAlapalkki();
        }

        /// <summary>Testiavaus ilman peliä: kaupunkilehti (omistaja = kaupunki) tai maalehti (ISO3, aihe aloitussivuksi).</summary>
        public void Nayta(LehtiLaji laji, string omistaja, string aihe = null, int? sivu = null)
        {
            tila = null;
            teko = null;
            avausKaupunki = laji == LehtiLaji.Kaupunki ? omistaja : PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja.Sijainti.Kaupunki;
            Avaa(laji, omistaja, aihe, sivu);
        }

        void Avaa(LehtiLaji laji, string omistaja, string aihe, int? sivu)
        {
            // Fokustehtävät ensin (pieni kokoelma), jotta sivun oma minitehtävä osaa väistyä.
            LehtiFokus.Lataa(() => UiKerros.Hae().StartCoroutine(LehtiSisalto.Hae(laji, omistaja, l =>
            {
                if (l == null)
                {
                    Debug.Log("MATKAKIRJA ui lehti: ei lehteä " + laji + " " + omistaja);
                    UiNakymat.Hae()?.Tilarivi.Viesti("Lehteä ei löytynyt");
                    if (Auki) return;
                    Suljettu?.Invoke(omistaja);
                    return;
                }
                // Lehdestä toiseen (Maa-liite) saman avauksen sisällä: Suljettu vasta lopullisesta sulkemisesta.
                lehti = l;
                ylaNimi.text = (l.Laji == LehtiLaji.Maa ? l.Nimi + " · maan oma lehti" : l.Nimi).ToUpperInvariant();
                // Ylärivin ☰ molemmissa lehdissä, kun sivuja on vähintään kaksi (web varmistaLehtiHampurilainen).
                sisallysNappi.style.display = l.Sivut.Count >= 2 ? DisplayStyle.Flex : DisplayStyle.None;
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
            })));
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            PysaytaLuenta();
            Aanisoitin.Nayte(false);
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

        // Sivun tekstit, joita ei merkitä mk-lehti__luettava-luokalla (Maa numeroina).
        readonly List<string> lisaLuettavat = new List<string>();

        void NaytaSivu(int i, int suunta)
        {
            PysaytaLuenta();
            lisaLuettavat.Clear();
            var vanha = sivu;
            nyt = i;
            sivu = new ScrollView(ScrollViewMode.Vertical);
            sivu.AddToClassList("mk-lehti__sivu");
            sivu.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sivu.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sivupaikka.Add(sivu);
            var s = lehti.Sivut[i];
            switch (s.Laji)
            {
                case LehtiSivuLaji.Etusivu: Etusivu(sivu.contentContainer, s); break;
                case LehtiSivuLaji.MaaEtusivu: MaaEtusivu(sivu.contentContainer); break;
                case LehtiSivuLaji.Numeroina:
                {
                    var c = sivu.contentContainer;
                    MaaNumeroina.Rakenna(c, lehti.Maa, UiSisalto.Maa(lehti.Maa)?.Numeroina, lisaLuettavat.Add);
                    break;
                }
                default: Aihesivu(sivu.contentContainer, s); break;
            }

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
            Teko(new LehtiTeko
            {
                Laji = LehtiTekoLaji.SivuNakyi, Omistaja = lehti.Omistaja, Aihe = s.Aihe?.Id, Sivu = i, Kaupunki = avausKaupunki,
                SivunLaji = s.Laji == LehtiSivuLaji.Etusivu ? "etusivu" : lehti.Laji == LehtiLaji.Maa ? "maa" : "aihe",
            });
        }

        static Button Selausnappi(string suunta, string luokka, Action painettu, VisualElement isa)
        {
            var b = Rakenne.Nappi(null, "mk-lehti__selaus " + luokka, painettu, isa);
            Kirjasimet.Aseta(Rakenne.Teksti(suunta, "mk-lehti__selaussuunta", b), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti("", "mk-lehti__selausaihe", b), Kirjasin.Kone);
            return b;
        }

        string SivunNimi(int i) =>
            i < 0 || i >= lehti.Sivut.Count ? "" : lehti.Sivut[i].Laji == LehtiSivuLaji.Etusivu ? "Etusivu" : lehti.Sivut[i].Lyhyt ?? lehti.Sivut[i].Otsikko ?? "";

        /// <summary>Web etsiKatko: lehti kiinni ja kohtaaminen tai kysymys alkaa (ohjain sulkee lehden).</summary>
        void EtsiKatko()
        {
            if (tila == null || tila.TehtavaNappiPois || lehti == null) return;
            Aanet.PulunTehoste("paper");
            var r = Teko(new LehtiTeko { Laji = LehtiTekoLaji.EtsiKatko, Kaupunki = lehti.Omistaja });
            if (r != null && !r.Ok) UiNakymat.Hae()?.Tilarivi.Viesti(r.Virhe);
            else if (Auki) Sulje();
        }

        /// <summary>"Maa-liite" kaupunkilehden viimeiseltä sivulta → maan oma lehti (web avaaMaalehti).</summary>
        void AvaaLiite()
        {
            if (lehti == null || string.IsNullOrEmpty(lehti.Maa)) return;
            if (teko != null) Teko(new LehtiTeko { Laji = LehtiTekoLaji.AvaaMaalehti, Maa = lehti.Maa, Kaupunki = avausKaupunki ?? lehti.Omistaja });
            else Avaa(LehtiLaji.Maa, lehti.Maa, null, null);
        }

        void PaivitaAlapalkki()
        {
            var sivut = lehti.Sivut;
            bool maalehti = lehti.Laji == LehtiLaji.Maa;
            bool ensimmainen = nyt == 0, viimeinen = nyt == sivut.Count - 1;
            edellinen.style.display = ensimmainen ? DisplayStyle.None : DisplayStyle.Flex;
            seuraava.style.display = viimeinen ? DisplayStyle.None : DisplayStyle.Flex;
            edellinen.Q<Label>(className: "mk-lehti__selausaihe").text = SivunNimi(nyt - 1);
            seuraava.Q<Label>(className: "mk-lehti__selausaihe").text = SivunNimi(nyt + 1);
            alaSisallys.style.display = maalehti && sivut.Count >= 3 ? DisplayStyle.Flex : DisplayStyle.None;
            poistu.Q<Label>().text = maalehti || viimeinen ? "Poistu" : "Poistu lehdestä";
            // Tehtävänappi jokaisen kaupunkisivun alareunassa (omistaja 9.8.2026); maalehdessä ei.
            string teksti = maalehti ? null : tila?.TehtavaNappi;
            tehtavaNappi.style.display = teksti != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (teksti != null)
            {
                tehtavaNappi.Q<Label>().text = teksti;
                tehtavaNappi.EnableInClassList("mk-lehti__tehtavanappi--pois", tila.TehtavaNappiPois);
                tehtavaNappi.pickingMode = tila.TehtavaNappiPois ? PickingMode.Ignore : PickingMode.Position;
            }
            string maaNimi = lehti.MaaNimi;
            bool liiteNakyy = !maalehti && viimeinen && !string.IsNullOrEmpty(lehti.Maa) && !string.IsNullOrEmpty(maaNimi);
            liite.style.display = liiteNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (liiteNakyy) liite.Q<Label>().text = maaNimi + "-liite";
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
            if (!string.IsNullOrEmpty(a.MatkailijalleKappale)) Matkailijalle(s, a);
        }

        /// <summary>
        /// Matkailijalle-lohko (web piirraMatkailijalle): oppaaseen kolme sisäänkäyntiä — vino
        /// "Matkaopas"-nauha, kuvan napautus (ei suurennosta) ja "Lue lisää matkailijan oppaasta →".
        /// </summary>
        void Matkailijalle(VisualElement s, LehtiAihe a)
        {
            var m = Rakenne.El("mk-lehti__matkailijalle", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("MATKAILIJALLE", "mk-lehti__osasto", m), Kirjasin.Kone);
            var opas = a.Opas;
            if (opas != null) opas.Kaupunki = lehti.Omistaja;
            Action avaa = opas != null ? () => UiNakymat.Hae()?.Nahtavyydet.AvaaOpas(opas) : (Action)null;
            if (a.MatkailijalleKuva != null)
            {
                Kuva(m, a.MatkailijalleKuva, new List<LehtiKuva> { a.MatkailijalleKuva }, 0, "mk-lehti__nostokuva", 0.62f, avaa);
                Kuvateksti(m, a.MatkailijalleKuva);
            }
            var kappaleet = Kappaleet(a.MatkailijalleKappale).ToList();
            foreach (var k in kappaleet) Kappale(m, k, "mk-lehti__leipa");
            if (avaa == null) return;
            var kotelo = Rakenne.El("mk-lehti__opaskotelo", m, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("MATKAOPAS", "mk-lehti__opasnauha", avaa, kotelo), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Lue lisää matkailijan oppaasta →", "mk-lehti__opaslinkki", avaa, m), Kirjasin.Luku);
        }

        void Masto(VisualElement s)
        {
            var m = Rakenne.El("mk-lehti__masto", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("UNOHDETTU AARRE", "mk-lehti__nimioyla", m), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(lehti.Nimi.ToUpperInvariant(), "mk-lehti__nimio", m), Kirjasin.Kone);
            int? p0 = tila != null ? tila.Matkapaiva : PeliOhjain.Instanssi?.Matka?.Tila.Paiva();
            string paiva = p0 > 0 ? p0 + ". matkapäivä" : null;
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
                var l = Rakenne.El("mk-lehti__lippu", ot);
                string lippuMaa = a.LainattuMaasta;
                // Lipun tarina (web aihe-lippu-nappi, maalehti.js).
                if (Lippuikkuna.On(lippuMaa)) l.AddManipulator(new Clickable(() => Lippuikkuna.Avaa(lippuMaa)));
                Natiivi.Kuvat.Hae(lippu, t => { if (t != null) l.style.backgroundImage = new StyleBackground(t); }, "liput");
            }
            if (!string.IsNullOrEmpty(a.Johdanto)) Kappale(s, a.Johdanto, "mk-lehti__johdanto", Kirjasin.LukuKursiivi);

            // Reaktioiden sivuavain (web aihesivunAvain → aiheAvain): maalehdessä ISO3, muuten kaupunki.
            string sivuAvain = Reaktiot.AiheAvain(lehti.Omistaja, a.Id);
            foreach (var n in a.Nostot) Nosto(s, n, sivuAvain);
            foreach (var (otsikko, kohteet) in a.Lista) Lista(s, otsikko, kohteet, sivuAvain);
            // Sivun oma reaktiorivi juttujen perään, ennen tehtävää (web piirraAiheenReaktiot).
            Reaktiot.Piirra(s, sivuAvain, a.Nimi ?? sivu.Otsikko);
            bool fokustehtava = fokus.Piirra(s, lehti, nyt);
            if (!fokustehtava && a.Tehtava != null && sivu.TehtavaAihe != null) Tehtava(s, a.Tehtava, sivu.TehtavaAihe);
            if (a.Nostot.Count == 0 && a.Lista.Count == 0 && a.Tehtava == null && !fokustehtava && string.IsNullOrEmpty(a.Johdanto))
                Kappale(s, "Tämä sivu täydentyy myöhemmin.", "mk-lehti__leipa");
        }

        void Nosto(VisualElement s, LehtiNosto n, string sivuAvain = null)
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
                var b = Rakenne.Nappi("▷ " + (n.NayteNimi ?? "Kuuntele musiikkia"), "mk-lehti__linkki", () =>
                {
                    // Kulttuurinäyte vaimentaa taustan (web vaimennaTausta, B7-soitin); loppu palauttaa.
                    if (Puhe.Hae()?.Soita(url, 0, () => Aanisoitin.Nayte(false)) == true) Aanisoitin.Nayte(true);
                }, loppu);
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
            // Loppurivin reaktiot "Lue lisää aiheesta" -napin rinnalle (web leipa-loppurivi, otsikkoAvain).
            Reaktiot.Piirra(loppu, Reaktiot.OtsikkoAvain(sivuAvain, n.Otsikko), n.Otsikko, "mk-reaktiot--loppu");
        }

        void Lista(VisualElement s, string otsikko, List<LehtiListaKohde> kohteet, string sivuAvain = null)
        {
            var lohko = Rakenne.El("mk-lehti__lista", s, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(otsikko))
            {
                // Ryhmäotsikko on väliotsikko: pieni reaktionappi rivin päähän (web piirraVinkkilista).
                var orivi = Rakenne.El("mk-lehti__osastorivi", lohko, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(otsikko.ToUpperInvariant(), "mk-lehti__osasto", orivi), Kirjasin.Kone);
                Reaktiot.PiirraOtsikolle(orivi, sivuAvain, otsikko);
            }
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
            string omistaja = lehti.Laji == LehtiLaji.Kaupunki ? lehti.Omistaja : (avausKaupunki ?? lehti.Omistaja);
            // Palkintojuliste vain kaupunkilehdessä (maan yhteinen sivu ei tarjoa samaa julistetta uudelleen).
            var juliste = lehti.Laji == LehtiLaji.Kaupunki ? UiSisalto.Kaupunki(lehti.Omistaja) : null;
            if (string.IsNullOrEmpty(juliste?.JulisteTiedosto)) juliste = null;
            var laatikko = Rakenne.El("mk-lehti__tehtava", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("LEHDEN MINITEHTÄVÄ", "mk-lehti__tehtavaotsake", laatikko), Kirjasin.Kone);
            var runko = Rakenne.El("mk-lehti__tehtavarunko", laatikko, PickingMode.Ignore);
            var palsta = Rakenne.El("mk-lehti__tehtavapalsta", runko, PickingMode.Ignore);
            if (MinitehtavaVastattu(omistaja, aihe))
            {
                // Takautuva myöntö: oikein ratkaistu ennen julisteita (web minitehtavatOikein).
                if (juliste != null)
                {
                    bool voitettu = MinitehtavaRatkaistu(omistaja, aihe) || JulisteLaukussa(juliste.Id);
                    if (voitettu) Teko(new LehtiTeko { Laji = LehtiTekoLaji.JulisteMyonto, Avain = juliste.Id, Kaupunki = omistaja });
                    Julistepalkinto(runko, juliste, voitettu);
                }
                Kirjasimet.Aseta(Rakenne.Teksti("Tämän sivun minitehtävä on jo ratkaistu.", "mk-lehti__kysymys", palsta), Kirjasin.LukuLihava);
                return;
            }
            Action voita = juliste != null ? Julistepalkinto(runko, juliste, JulisteLaukussa(juliste.Id)) : null;
            Kirjasimet.Aseta(Rakenne.Teksti(t.Kysymys ?? "", "mk-lehti__kysymys", palsta), Kirjasin.LukuLihava);
            var napit = new List<Button>();
            var tulos = Rakenne.Teksti("", "mk-lehti__tehtavatulos", palsta);
            tulos.style.display = DisplayStyle.None;
            int palkkio = KauppaVakiot.MinitehtavaPalkkio;
            for (int i = 0; i < t.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                var b = Rakenne.Nappi(t.Vaihtoehdot[i], "mk-nosto__visanappi", null, palsta);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                b.clicked += () =>
                {
                    bool oikein = valinta == t.Oikea;
                    var r = Teko(new LehtiTeko { Laji = LehtiTekoLaji.Minitehtavavastaus, Kaupunki = omistaja, Aihe = aihe, Oikein = oikein, Palkkio = palkkio });
                    if (r != null && !r.Ok) { tulos.text = r.Virhe; tulos.style.display = DisplayStyle.Flex; return; }
                    // Web: vaihtoehdot pois, kehystetty tulos tilalle.
                    foreach (var x in napit) x.RemoveFromHierarchy();
                    tulos.text = (oikein ? $"Oikein! +{palkkio} puntaa. " : $"Oikea vastaus: {t.Vaihtoehdot[t.Oikea]}. ") + (t.Fakta ?? "");
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.EnableInClassList("mk-vaarin", !oikein);
                    tulos.style.display = DisplayStyle.Flex;
                    Aanet.PulunTehoste(oikein ? "correct" : "wrong");
                    // Palkkiokupla tulee RahaMuuttui-tapahtumasta (Leima); testiavauksessa ilman ohjainta ei kuplaa.
                    // Juliste myönnetään heti; nappi vain avaa katselun (omistaja 22.8.2026).
                    if (oikein && juliste != null)
                    {
                        Teko(new LehtiTeko { Laji = LehtiTekoLaji.JulisteMyonto, Avain = juliste.Id, Kaupunki = omistaja });
                        voita?.Invoke();
                        var lunasta = Rakenne.Nappi("Lunasta juliste", "mk-lehti__lunastus", () => NaytaJuliste(juliste), palsta);
                        Kirjasimet.Aseta(lunasta, Kirjasin.LukuLihava);
                    }
                };
                napit.Add(b);
            }
        }

        /// <summary>Pikkuvedos julisteesta tehtävälaatikon kyljessä; palauttaa "merkitse voitetuksi".</summary>
        Action Julistepalkinto(VisualElement runko, KaupunkiTiedot k, bool voitettu)
        {
            var kotelo = Rakenne.El("mk-lehti__julistepalkinto", runko);
            var kuva = Rakenne.El("mk-lehti__julistekuva", kotelo, PickingMode.Ignore);
            var merkki = Rakenne.Teksti("", "mk-lehti__julistemerkki", kotelo);
            Kirjasimet.Aseta(merkki, Kirjasin.KoneLihava);
            Natiivi.Kuvat.Hae("https://media.matkakirja.app/julisteet/" + k.JulisteTiedosto, t =>
            {
                if (t == null) { kotelo.RemoveFromHierarchy(); return; }
                kuva.style.backgroundImage = new StyleBackground(t);
                kuva.style.height = Mathf.Round(kuva.resolvedStyle.width * t.height / Mathf.Max(1f, t.width));
            });
            kuva.RegisterCallback<GeometryChangedEvent>(e =>
            {
                var tx = kuva.resolvedStyle.backgroundImage.texture;
                if (tx != null) kuva.style.height = Mathf.Round(e.newRect.width * tx.height / Mathf.Max(1f, tx.width));
            });
            void Aseta(bool v)
            {
                kotelo.EnableInClassList("mk-voitettu", v);
                merkki.text = v ? "VOITETTU" : "PALKINTO";
            }
            Aseta(voitettu);
            kotelo.RegisterCallback<ClickEvent>(_ => { if (kotelo.ClassListContains("mk-voitettu")) NaytaJuliste(k); });
            return () => Aseta(true);
        }

        void NaytaJuliste(KaupunkiTiedot k)
        {
            var j = UiSisalto.Julisteet.FirstOrDefault(x => x.Kaupunki == k.Id);
            suurennos.Avaa(new List<LehtiKuva>
            {
                new LehtiKuva
                {
                    Lahde = "https://media.matkakirja.app/julisteet/" + k.JulisteTiedosto, Otsikko = j?.Otsikko ?? k.JulisteOtsikko,
                    Lyhyt = j?.Lyhyt, Selite = j?.Selite ?? j?.Lyhyt ?? k.JulisteOtsikko, LahdeRivi = "Matkakirjan oma paino",
                },
            });
        }

        /// <summary>
        /// Maan etusivu (web piirraMaaEtusivu, skeema 1.15+): masto, maan nimi, korkokartta
        /// kaupunkipisteineen (napautus → suurennos) ja lähde, perustiedot ja tervehdykset
        /// sekä kartan nosto. Radio tulee radion kuoren kanssa.
        /// </summary>
        void MaaEtusivu(VisualElement s)
        {
            var m = UiSisalto.Maa(lehti.Maa);
            Masto(s);
            var ot = Rakenne.El("mk-lehti__aihe", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti((lehti.Nimi ?? "").ToUpperInvariant(), "mk-lehti__aiheteksti", ot), Kirjasin.KoneLihava);
            if (m?.KarttaUrl != null)
            {
                var kehys = Rakenne.El("mk-lehti__maakartta", s);
                var kuva = Rakenne.El("mk-lehti__maakarttakuva", kehys, PickingMode.Ignore);
                float suhde = 1f;
                void Mitoita() { float w = kehys.resolvedStyle.width; if (w > 0 && !float.IsNaN(w)) kehys.style.height = Mathf.Round(w * suhde); }
                kehys.RegisterCallback<GeometryChangedEvent>(e => { if (e.oldRect.width != e.newRect.width) Mitoita(); });
                NostoSisalto.HaeKuva(m.KarttaUrl, t =>
                {
                    if (t == null) { kehys.style.display = DisplayStyle.None; return; }
                    kuva.style.backgroundImage = new StyleBackground(t);
                    suhde = (float)t.height / Mathf.Max(1, t.width);
                    Mitoita();
                });
                foreach (var (nimi, x, y, paa) in m.KarttaKaupungit)
                {
                    var piste = Rakenne.El(paa ? "mk-lehti__maapiste mk-lehti__maapiste--paa" : "mk-lehti__maapiste", kehys, PickingMode.Ignore);
                    piste.style.left = Length.Percent(x);
                    piste.style.top = Length.Percent(y);
                    var n = Rakenne.Teksti(nimi ?? "", x > 60 ? "mk-lehti__maapistenimi mk-lehti__maapistenimi--vasen" : "mk-lehti__maapistenimi", piste);
                    Kirjasimet.Aseta(n, paa ? Kirjasin.KoneLihava : Kirjasin.Kone);
                }
                string url = m.KarttaUrl, lahde = m.KarttaLahde, nimiKartta = lehti.Nimi + " — korkokartta";
                kehys.RegisterCallback<ClickEvent>(_ => suurennos.Avaa(new List<LehtiKuva> { new LehtiKuva { Lahde = url, Selite = nimiKartta, LahdeRivi = lahde } }));
                if (!string.IsNullOrEmpty(lahde)) Kirjasimet.Aseta(Rakenne.Teksti(lahde, "mk-lehti__lahde", s), Kirjasin.Kone);
            }
            Maaosasto(s, m);
            if (LehtiSisalto.Nosto(m?.KarttaNosto) is LehtiNosto nosto) Nosto(s, nosto);
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
            if (!string.IsNullOrEmpty(m.DemokratiaSelitys))
            {
                // Web naytaVdemInfo: V-Demin selitys minipopupissa.
                string selitys = m.DemokratiaSelitys, linkki = m.DemokratiaLinkki, arvo = m.Demokratia;
                var b = Rakenne.Nappi($"Demokratiaindeksi {arvo} · V-Dem ›", "mk-lehti__linkki", () => Minipopup.Avaa("Demokratiaindeksi (V-Dem)", c =>
                {
                    Kirjasimet.Aseta(Rakenne.Teksti(selitys, "mk-minipopup__teksti", c), Kirjasin.Luku);
                    if (!string.IsNullOrEmpty(linkki))
                        Kirjasimet.Aseta(Rakenne.Nappi("Avaa lähde ›", "mk-lehti__linkki", () => Application.OpenURL(linkki), c), Kirjasin.Kone);
                }), laatikko);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (m.Tervehdykset.Count > 0)
            {
                string terv = string.Join(" · ", m.Tervehdykset.Select(t => t.Teksti + (string.IsNullOrEmpty(t.Kieli) ? "" : " (" + t.Kieli + ")")));
                Kirjasimet.Aseta(Rakenne.Teksti("Tervehdys: " + terv, "mk-lehti__tervehdys", laatikko), Kirjasin.LukuKursiivi);
            }
        }

        // --- kuvat ja teksti --------------------------------------------------------------------

        void Kuva(VisualElement isa, LehtiKuva k, List<LehtiKuva> sarja, int indeksi, string luokka, float suhde, Action napautus = null)
        {
            var kehys = Rakenne.El("mk-lehti__kuvakehys " + luokka, isa);
            var kuva = Rakenne.El("mk-lehti__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => { if (napautus != null) napautus(); else suurennos.Avaa(sarja, indeksi); });
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
            var palat = sivu?.contentContainer.Query<Label>(className: "mk-lehti__luettava").ToList().Select(l => l.text)
                .Concat(lisaLuettavat).Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
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

        /// <summary>
        /// Testikomento: "sivu n" kääntää, "sisallys" avaa sisällyksen, "kuva" suurennoksen, "tehtava(-pois)" keksityn
        /// tehtävänapin, "viimeinen" viimeiselle sivulle, "fokus-vastaa n" / "fokus-pulla" napauttaa fokustehtävää.
        /// </summary>
        public string Testaa(string mita, int n)
        {
            switch (mita)
            {
                case "fokus-vastaa":
                case "fokus-pulla": return LehtiFokus.Testaa(sivu?.contentContainer, mita, n);
                case "sivu": Kaanna(n); break;
                case "tehtava":
                case "tehtava-pois":
                    PaivitaTila(new LehtiTila { Matkapaiva = 12, TehtavaNappi = mita == "tehtava" ? "Tapaa gondolieeri" : "Gondolieeri ei tavattavissa", TehtavaNappiPois = mita != "tehtava" });
                    break;
                case "viimeinen": if (lehti != null) Kaanna(lehti.Sivut.Count - 1); break;
                case "sisallys": if (lehti != null && lehti.Sivut.Count >= 2) VaihdaSisallys(); break;
                case "kuva":
                    var k = sivu?.contentContainer.Q(className: "mk-lehti__kuvakehys");
                    if (k != null) using (var e = ClickEvent.GetPooled()) { e.target = k; k.SendEvent(e); }
                    break;
            }
            return null;
        }

        /// <summary>Testikomento "ui lehti fokus [kaupunki] [juliste]": kaupunkilehti fokustehtävän sivulla (ilman peliä).</summary>
        public void TestaaFokus(string kaupunki, bool juliste) =>
            LehtiFokus.Lataa(() =>
            {
                int s = LehtiFokus.TestiSivu(kaupunki, juliste);
                if (s < 0) UiNakymat.Hae()?.Tilarivi.Viesti("Ei fokustehtäviä: " + kaupunki);
                Nayta(LehtiLaji.Kaupunki, kaupunki, null, s < 0 ? (int?)null : s);
            });
    }
}
