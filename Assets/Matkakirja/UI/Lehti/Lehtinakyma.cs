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
        readonly VisualElement ylaosa, ylaLippu;
        readonly Label ylaNimi, nimioYla;
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
        /// <summary>Auki olevan kehittäjän liitteen nimi (esim. "Lukijoilta") tai null.</summary>
        public string LiiteAuki => Auki && lehti != null && lehti.Laji == LehtiLaji.Kehittaja ? lehti.Nimi : null;
        public string AukiSivunNimi => Auki && lehti != null && nyt >= 0 ? SivunNimi(nyt) : null;
        /// <summary>Auki olevan aihesivun poiminta-avain aihe:omistaja:aihe (web aiheAvain) tai null.</summary>
        public string AukiAvain => Auki && lehti != null && lehti.Laji != LehtiLaji.Kehittaja && nyt >= 0 && nyt < lehti.Sivut.Count
            ? Reaktiot.AiheAvain(lehti.Omistaja, lehti.Sivut[nyt].Aihe?.Id) : null;
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
                case LehtiTekoLaji.Kulttuurivastaus: return o.KauppaTeko(k => k.Kulttuuri(t.Kaupunki, t.Oikein));
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

            // Tarttuva otsikkorivi (web #arrival-city etusivulla, .aihe-nimi aihesivuilla): sivun oma otsikko,
            // hampurilainen vasemmalla ja lukija oikealla otsikon viivojen sisällä. Etusivulla yllä "UNOHDETTU AARRE"
            // (web .lehti-ylarivi) ja nimiö isona ilman viivoja; aihesivulla 3 px:n viiva yllä ja ohut alla.
            ylaosa = Rakenne.El("mk-lehti__ylaosa", arkki, PickingMode.Ignore);
            nimioYla = Rakenne.Teksti("UNOHDETTU AARRE", "mk-lehti__nimioyla", ylaosa);
            Kirjasimet.Aseta(nimioYla, Kirjasin.Kone);
            var ylarivi = Rakenne.El("mk-lehti__ylarivi", ylaosa, PickingMode.Ignore);
            sisallysNappi = Rakenne.Nappi(null, "mk-lehti__ikoninappi", () => VaihdaSisallys(true), ylarivi, Ikonit.Valikko);
            sisallysNappi.tooltip = "Sisällys";
            var nimiRivi = Rakenne.El("mk-lehti__ylanimirivi", ylarivi, PickingMode.Ignore);
            ylaNimi = Rakenne.Teksti("", "mk-lehti__ylanimi", nimiRivi);
            Kirjasimet.Aseta(ylaNimi, Kirjasin.KoneLihava);
            ylaLippu = Rakenne.El("mk-lehti__lippu", nimiRivi);
            ylaLippu.style.display = DisplayStyle.None;
            kaiutin = Rakenne.Nappi(null, "mk-lehti__ikoninappi mk-lehti__ikoninappi--oikea", VaihdaLuenta, ylarivi, Ikonit.Viiva["kaiutin"]);
            ylaosa.RegisterCallback<GeometryChangedEvent>(e => { if (!Mathf.Approximately(e.oldRect.width, e.newRect.width)) MitoitaNimio(); });
            kaiutin.tooltip = "Lue sivu ääneen";

            sivupaikka = Rakenne.El("mk-lehti__sivupaikka", arkki);
            sivupaikka.RegisterCallback<PointerDownEvent>(e => { veto0 = e.position; vetaa = true; }, TrickleDown.TrickleDown);
            sivupaikka.RegisterCallback<PointerUpEvent>(e => Veto(e.position), TrickleDown.TrickleDown);
            sivupaikka.RegisterCallback<PointerCancelEvent>(_ => vetaa = false, TrickleDown.TrickleDown);

            alapalkki = Rakenne.El("mk-lehti__alapalkki", arkki, PickingMode.Ignore);
            var navi = Rakenne.El("mk-lehti__navi", alapalkki, PickingMode.Ignore);
            poistu = Rakenne.Nappi("Poistu lehdestä", "mk-lehti__poistu", Sulje, navi);
            Kirjasimet.Aseta(poistu, Kirjasin.Kone);
            alaSisallys = Rakenne.Nappi(null, "mk-lehti__selaus mk-lehti__selaus--sisallys", () => VaihdaSisallys(false), navi, Ikonit.Valikko);
            alaSisallys.tooltip = "Sisällys";
            edellinen = Selausnappi("Edellinen", "mk-lehti__selaus--edellinen", () => Kaanna(nyt - 1), navi);
            seuraava = Selausnappi("Seuraava", "mk-lehti__selaus--seuraava", () => Kaanna(nyt + 1), navi);
            tehtavaNappi = Rakenne.Nappi("", "mk-lehti__tehtavanappi", EtsiKatko, alapalkki);
            Rakenne.Tausta(tehtavaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(tehtavaNappi, Kirjasin.KoneLihava);
            liite = Rakenne.Nappi("", "mk-lehti__liite", AvaaLiite, alapalkki);
            Kirjasimet.Aseta(liite, Kirjasin.Kone);

            // Sisällyslevy (web .sisallys-levy): ylärivin ☰ laskee sen yläreunaan, alapalkin ☰ nostaa alareunasta.
            // Otsikkorivi "SISÄLLYS ×", vierivä lista ja "← Palaa kartalle" aina näkyvissä levyn pohjalla.
            sisallys = Rakenne.El("mk-lehti__sisallys", arkki);
            sisallys.style.display = DisplayStyle.None;
            var so = Rakenne.El("mk-lehti__sisallysyla", sisallys, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("SISÄLLYS", "mk-lehti__sisallysotsikko", so), Kirjasin.Kone);
            Rakenne.Nappi("×", "mk-lehti__sisallyssulje", SuljeSisallys, so).tooltip = "Sulje";
            var sv = new ScrollView(ScrollViewMode.Vertical);
            sv.AddToClassList("mk-lehti__sisallysvieritys");
            sisallys.Add(sv);
            sisallysLista = sv.contentContainer;
            sisallysLista.AddToClassList("mk-lehti__sisallyslista");
            sisallysLista.RegisterCallback<GeometryChangedEvent>(e =>
            {
                // Kaksi palstaa vain leveällä (web @media max-width 560px → yksi palsta).
                bool kaksi = e.newRect.width > 560f;
                if (sisallysLista.ClassListContains("mk-lehti__sisallyslista--kaksi") != kaksi)
                    sisallysLista.EnableInClassList("mk-lehti__sisallyslista--kaksi", kaksi);
            });
            var paluurivi = Rakenne.El("mk-lehti__sisallyspaluurivi", sisallys, PickingMode.Ignore);
            var paluu = Rakenne.Nappi("Palaa kartalle", "mk-lehti__sisallyspaluu", () => { SuljeSisallys(); Sulje(); }, paluurivi, Ikonit.Paluu);
            Kirjasimet.Aseta(paluu, Kirjasin.KoneLihava);
            // Napautus levyn ulkopuolelta sulkee sen (web ulkosulku); ☰-napit hoitavat itse vaihdon.
            arkki.RegisterCallback<PointerDownEvent>(e =>
            {
                if (sisallys.style.display != DisplayStyle.Flex || !(e.target is VisualElement v)) return;
                for (var x = v; x != null; x = x.parent)
                    if (x == sisallys || x == sisallysNappi || x == alaSisallys) return;
                SuljeSisallys();
            }, TrickleDown.TrickleDown);

            // Turva-alue (Dynamic Island, kotipalkki): arkki on koko ruudun levy, joten otsikkorivi ja alapalkki
            // siirtyvät reunoista sisään; webissä Safarin palkit ovat näkymän ulkopuolella.
            ui.Turva(Kerros);
            void Turvaa()
            {
                var r = ui.Reunat(Kerros);
                turvaYla = r.y;
                arkki.style.paddingTop = 10f + r.y;
                arkki.style.paddingBottom = r.w;
                AsetaSisallysVara();
            }
            ui.TurvaMuuttui += Turvaa;
            Turvaa();

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
        string odottavaAihe;

        /// <summary>
        /// Ohjaimen avaama lehti tälle aihesivulle (pulun matkakirjalinkki, web siirraSivulle): jo auki
        /// olevassa lehdessä heti, latautuvassa, kun lehti on valmis.
        /// </summary>
        public void SiirryAiheeseen(string aihe)
        {
            if (string.IsNullOrEmpty(aihe)) return;
            if (Auki && lehti != null)
            {
                int i = LehtiSisalto.SivuAiheelle(lehti, aihe);
                if (i >= 0 && i != nyt) NaytaSivu(Mathf.Clamp(i, 0, lehti.Sivut.Count - 1), i > nyt ? 1 : -1);
                // Lehti voi olla vielä edellinen (uusi latautuu): sama aihe jää odottamaan.
            }
            odottavaAihe = aihe;
        }

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
                int alku = sivu ?? LehtiSisalto.SivuAiheelle(l, aihe ?? odottavaAihe);
                odottavaAihe = null;
                Esita(l, alku);
            })));
        }

        /// <summary>
        /// Kehittäjän liite (web avaaKehittajaLehti): mikä tahansa jäsennelty sisältö lehtenä samalla arkilla ja
        /// sivunkäännöllä. Vain kehittäjätilassa; sivut ovat synteettisiä (otsikko + nostot tai oma Rakenna).
        /// </summary>
        public void NaytaLiite(string otsikko, List<LehtiSivu> sivut, int alku = 0)
        {
            if (!Asetukset.Kehittaja || sivut == null || sivut.Count == 0) return;
            tila = null;
            teko = null;
            avausKaupunki = null;
            Esita(new Lehti { Laji = LehtiLaji.Kehittaja, Nimi = otsikko, Sivut = sivut }, alku);
        }

        void Esita(Lehti l, int alku)
        {
            lehti = l;
            // Ylärivin ☰ molemmissa lehdissä, kun sivuja on vähintään kaksi (web varmistaLehtiHampurilainen).
            sisallysNappi.style.display = l.Sivut.Count >= 2 ? DisplayStyle.Flex : DisplayStyle.None;
            sisallys.style.display = DisplayStyle.None;
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
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            PysaytaLuenta();
            Mediarivi.Pysayta();
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
            AsetaOtsikko(s);
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
            // Web lehti.js visasivu: kaupunkilehdessä toisella sivulla (yksisivuisessa etusivulla).
            if (lehti.Laji == LehtiLaji.Kaupunki && i == (lehti.Sivut.Count > 1 ? 1 : 0)) Kulttuurivisa(sivu.contentContainer);
            Porrasta(sivu.contentContainer);

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
            if (lehti.Laji == LehtiLaji.Kehittaja) return; // liite ei ole pelin lehti: ei sivutapahtumia
            SivuNakyi?.Invoke(lehti.Omistaja, s.Aihe?.Id, i);
            Teko(new LehtiTeko
            {
                Laji = LehtiTekoLaji.SivuNakyi, Omistaja = lehti.Omistaja, Aihe = s.Aihe?.Id, Sivu = i, Kaupunki = avausKaupunki,
                SivunLaji = s.Laji == LehtiSivuLaji.Etusivu ? "etusivu" : lehti.Laji == LehtiLaji.Maa ? "maa" : "aihe",
            });
        }

        // --- sivun porrastus (UI-piikit 24.9.: maalehden avaus 82 ms, TextJob 28 + asettelu 25 + repaint 22) -----

        const int HetiLohkoja = 4;
        readonly List<VisualElement> odottavatLohkot = new List<VisualElement>();
        VisualElement porrasSivu;
        IVisualElementScheduledItem porras;

        /// <summary>
        /// Sivun ensimmäiset lohkot heti, loput yksi ruutua kohti: tekstin generointi, asettelu ja piirto jakautuvat
        /// kehyksille eikä sivun avaus pysäytä ruutua. Lohkot rakennetaan valmiiksi; vain liittäminen porrastuu.
        /// </summary>
        void Porrasta(VisualElement c)
        {
            // Edellisen sivun liittämättömät lohkot jäävät pois (sivu poistuu).
            porras?.Pause();
            porras = null;
            odottavatLohkot.Clear();
            porrasSivu = null;
            if (c.childCount <= HetiLohkoja) return;
            odottavatLohkot.AddRange(c.Children().Skip(HetiLohkoja).ToList());
            foreach (var e in odottavatLohkot) e.RemoveFromHierarchy();
            porrasSivu = c;
            porras = c.schedule.Execute(() =>
            {
                if (odottavatLohkot.Count == 0 || porrasSivu != c) { porras?.Pause(); return; }
                var e = odottavatLohkot[0];
                odottavatLohkot.RemoveAt(0);
                c.Add(e);
            }).Every(0);
        }

        /// <summary>Loput lohkot heti (luenta lukee koko sivun, sivu vaihtuu).</summary>
        void ValmistaSivu()
        {
            porras?.Pause();
            porras = null;
            if (porrasSivu != null) foreach (var e in odottavatLohkot) porrasSivu.Add(e);
            odottavatLohkot.Clear();
            porrasSivu = null;
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
            bool maalehti = lehti.Laji != LehtiLaji.Kaupunki; // kehittäjän liite on maalehden arkki (web .maalehti)
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
            // Web #arrival-intro: 1rem, riviväli 1,6, kappaleet <p> (1 em väli), anfangi ensimmäisessä.
            if (!string.IsNullOrEmpty(esittely)) Leipa(s, esittely, "mk-lehti__esittely", 1.6f, 1f, true);
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
            // Mediarivi etusivun lopussa (web #arrival-media-kaupunki): maan radio, kielinäyte ja vanha tallenne.
            if (lehti.Laji == LehtiLaji.Kaupunki) Mediarivi.Piirra(s, lehti.Omistaja);
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

        /// <summary>Otsikkorivin teksti ja asu sivun mukaan (web naytaTutkiSivu: etusivulla nimiö, muualla aihe-nimi).</summary>
        void AsetaOtsikko(LehtiSivu s)
        {
            bool nimio = s.Laji == LehtiSivuLaji.Etusivu && lehti.Laji != LehtiLaji.Kehittaja;
            ylaosa.EnableInClassList("mk-lehti__ylaosa--nimio", nimio);
            ylaosa.EnableInClassList("mk-lehti__ylaosa--aihe", !nimio);
            nimioYla.style.display = nimio ? DisplayStyle.Flex : DisplayStyle.None;
            string otsikko = nimio || s.Laji == LehtiSivuLaji.MaaEtusivu ? lehti.Nimi : s.Otsikko ?? lehti.Nimi;
            ylaNimi.text = (otsikko ?? "").ToUpperInvariant();
            // Lippu otsikon perään: maalehden etusivulla maan oma (web "KREIKKA 🇬🇷"), aihesivulla lainattu maa (aihe-lippu).
            string lippuMaa = s.Laji == LehtiSivuLaji.MaaEtusivu ? lehti.Maa : s.Aihe?.LainattuMaasta;
            string lippu = lippuMaa != null ? UiSisalto.Maa(lippuMaa)?.Lippu.FirstOrDefault() : null;
            ylaLippu.style.display = DisplayStyle.None;
            ylaLippu.style.backgroundImage = StyleKeyword.Null;
            ylaLippu.userData = lippuMaa;
            if (lippu != null)
            {
                Natiivi.Kuvat.Hae(lippu, t =>
                {
                    if (t == null || !Equals(ylaLippu.userData, lippuMaa)) return;
                    ylaLippu.style.backgroundImage = new StyleBackground(t);
                    ylaLippu.style.display = DisplayStyle.Flex;
                }, "liput");
            }
            MitoitaNimio();
        }

        bool lippuKytketty;

        /// <summary>Web #arrival-city font-size clamp(1.9rem, 7.5vw, 2.8rem); aihe-nimi 1,45rem.</summary>
        void MitoitaNimio()
        {
            if (!lippuKytketty)
            {
                lippuKytketty = true;
                // Lipun tarina (web aihe-lippu-nappi, maalehti.js).
                ylaLippu.AddManipulator(new Clickable(() => { if (ylaLippu.userData is string m && Lippuikkuna.On(m)) Lippuikkuna.Avaa(m); }));
            }
            float w = UiKerros.Hae().Juuri(Kerros).layout.width;
            if (float.IsNaN(w) || w <= 0) w = 393f;
            ylaNimi.style.fontSize = ylaosa.ClassListContains("mk-lehti__ylaosa--nimio") ? Mathf.Clamp(w * 0.075f, 30.4f, 44.8f) : 23.2f;
        }

        void Masto(VisualElement s)
        {
            // Nimiö on otsikkorivillä (AsetaOtsikko); sivulla päiväysrivi (web .lehti-alarivi) ja sää.
            var m = Rakenne.El("mk-lehti__masto", s, PickingMode.Ignore);
            int? p0 = tila != null ? tila.Matkapaiva : PeliOhjain.Instanssi?.Matka?.Tila.Paiva();
            string paiva = p0 > 0 ? p0 + ". matkapäivä" : null;
            var maa = lehti.Laji == LehtiLaji.Kaupunki ? UiSisalto.Maa(lehti.Maa) : null;
            bool linkki = maa?.KarttaUrl != null && !string.IsNullOrEmpty(lehti.MaaNimi);
            // Web @media (max-width: 699px): liitelinkin kanssa päivä vasemmalla ja linkki oikealla, maan nimi pois.
            float w = UiKerros.Hae().Juuri(Kerros).layout.width;
            bool kapea = linkki && (float.IsNaN(w) || w <= 0 || w < 700f);
            string pvm = lehti.Laji == LehtiLaji.Kehittaja ? "Kehittäjän liite"
                : string.Join(" · ", new[] { kapea ? null : lehti.MaaNimi, paiva }.Where(x => !string.IsNullOrEmpty(x)));
            var p = Rakenne.El(kapea ? "mk-lehti__paivays mk-lehti__paivays--vali" : "mk-lehti__paivays mk-lehti__paivays--keski", m, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(pvm.ToUpperInvariant(), "mk-lehti__paivaysteksti", p), Kirjasin.Kone);
            if (lehti.Laji != LehtiLaji.Kaupunki) return;
            // Liitelinkki päiväysrivillä "Suomi-liite", kun maalla on karttaetusivu (web arrival-maa-linkki).
            if (linkki)
            {
                var l = Rakenne.Nappi((lehti.MaaNimi + "-liite").ToUpperInvariant(), "mk-lehti__maalinkki", AvaaLiite, p);
                Kirjasimet.Aseta(l, Kirjasin.Kone);
            }
            SaaRivi(m, lehti.Omistaja);
        }

        // --- sää maston alla (web naytaLehtiSaa, asetaSaaRivi, naytaVuosiSaa; js/saa.js) ----------

        static readonly string[] KuukausissaNimet =
        {
            "tammikuussa", "helmikuussa", "maaliskuussa", "huhtikuussa", "toukokuussa", "kesäkuussa",
            "heinäkuussa", "elokuussa", "syyskuussa", "lokakuussa", "marraskuussa", "joulukuussa",
        };
        static readonly (int[] Koodit, string Teksti, string Kuvake)[] Saakoodit =
        {
            (new[] { 0 }, "selkeää", "aurinko"), (new[] { 1 }, "melkein selkeää", "aurinko"), (new[] { 2 }, "puolipilvistä", "pilvi"),
            (new[] { 3 }, "pilvistä", "pilvi"), (new[] { 45, 48 }, "sumua", "sumu"), (new[] { 51, 53, 55, 56, 57 }, "tihkusadetta", "sade"),
            (new[] { 61, 63, 65, 66, 67 }, "sadetta", "sade"), (new[] { 71, 73, 75, 77 }, "lumisadetta", "lumi"),
            (new[] { 80, 81, 82 }, "sadekuuroja", "sade"), (new[] { 85, 86 }, "lumikuuroja", "lumi"), (new[] { 95, 96, 99 }, "ukkosta", "ukkonen"),
        };
        static readonly Dictionary<string, string> SaaIkonit = new Dictionary<string, string>
        {
            ["aurinko"] = "<circle cx=\"12\" cy=\"12\" r=\"4.4\"/><path d=\"M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8\"/>",
            ["pilvi"] = "<path d=\"M7 17.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 17.5Z\"/>",
            ["sade"] = "<path d=\"M7 14.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 14.5Z\"/><path d=\"M8.5 17.2l-1 2.6M12.4 17.2l-1 2.6M16.3 17.2l-1 2.6\"/>",
            ["lumi"] = "<path d=\"M7 14.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 14.5Z\"/><path d=\"M8.4 18.2h.01M12.2 19.6h.01M15.9 18.2h.01\"/>",
            ["sumu"] = "<path d=\"M4.5 9.5h15M3.5 13h17M5.5 16.5h13\"/>",
            ["ukkonen"] = "<path d=\"M7 13.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 13.5Z\"/><path d=\"M12.8 15.5 10.6 19h2.6l-1.8 3\"/>",
        };

        /// <summary>
        /// Kuukauden normaali heti ("syyskuussa keskimäärin 18°, sadetta 40 mm"), sitten tämän päivän sää
        /// Open-Meteosta ("tänään 18° (12…20°), puolipilvistä, sadetta 3 mm"); "vuosiennuste ›" avaa graafin.
        /// </summary>
        void SaaRivi(VisualElement isa, string kaupunki)
        {
            var rivi = Rakenne.Nappi(null, "mk-lehti__saa", null, isa);
            rivi.style.display = DisplayStyle.None;
            Saatiedot.Hae(kaupunki, t =>
            {
                if (t == null || rivi.panel == null) return;
                int kk = DateTime.Now.Month - 1;
                var ikoni = Rakenne.Ikoni(SaaIkonit["pilvi"], "mk-ikoni", rivi);
                var teksti = Rakenne.Teksti($"{KuukausissaNimet[kk]} keskimäärin {Mathf.RoundToInt(t.Keskilampo[kk])}°, sadetta {Mathf.RoundToInt(t.Sade[kk])} mm",
                    "mk-lehti__saateksti", rivi);
                Kirjasimet.Aseta(Rakenne.Teksti("VUOSIENNUSTE ›", "mk-lehti__saavihje", rivi), Kirjasin.Kone);
                rivi.clicked += () => Saagraafi.NaytaIsona(t, "Sää vuoden mittaan — " + lehti.Nimi);
                rivi.style.display = DisplayStyle.Flex;
                var k = UiSisalto.Kaupunki(kaupunki);
                if (k == null || double.IsNaN(k.Lat)) return;
                UiKerros.Hae().StartCoroutine(SaaTanaan(k.Lat, k.Lon, (lampo, ylin, alin, koodi, sade) =>
                {
                    if (rivi.panel == null) return;
                    var kuvaus = Saakoodit.FirstOrDefault(x => x.Koodit.Contains(koodi));
                    string kuvake = kuvaus.Kuvake ?? "pilvi";
                    ikoni.Polku = SaaIkonit[kuvake];
                    string sadeTeksti = sade >= 1 ? $", sadetta {Mathf.RoundToInt(sade)} mm" : "";
                    teksti.text = $"tänään {lampo}° ({alin}…{ylin}°), {kuvaus.Teksti ?? ""}{sadeTeksti}";
                }));
            });
        }

        static readonly Dictionary<string, (float Aika, int L, int Y, int A, int K, float S)> saaMuisti = new Dictionary<string, (float, int, int, int, int, float)>();

        /// <summary>Web haeSaaTanaan: Open-Meteo current + daily, välimuisti tunnin, aikaraja 8 s.</summary>
        static System.Collections.IEnumerator SaaTanaan(double lat, double lon, Action<int, int, int, int, float> valmis)
        {
            string avain = lat.ToString(System.Globalization.CultureInfo.InvariantCulture) + "," + lon.ToString(System.Globalization.CultureInfo.InvariantCulture);
            if (saaMuisti.TryGetValue(avain, out var m) && Time.realtimeSinceStartup - m.Aika < 3600f) { valmis(m.L, m.Y, m.A, m.K, m.S); yield break; }
            string url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat.ToString(System.Globalization.CultureInfo.InvariantCulture)
                + "&longitude=" + lon.ToString(System.Globalization.CultureInfo.InvariantCulture)
                + "&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=1";
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(url))
            {
                r.timeout = 8;
                yield return r.SendWebRequest();
                if (r.result != UnityEngine.Networking.UnityWebRequest.Result.Success) yield break;
                Dictionary<string, object> d;
                try { d = Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)); } catch (FormatException) { yield break; }
                var nyt = Rakenne.Olio(MiniJson.Kentta(d, "current"));
                var pv = Rakenne.Olio(MiniJson.Kentta(d, "daily"));
                double? Eka(string k) => Rakenne.Lista(MiniJson.Kentta(pv, k)) is List<object> l && l.Count > 0 && l[0] is double x ? x : (double?)null;
                if (!(MiniJson.Luku(nyt, "temperature_2m") is double lampo)) yield break;
                int koodi = (int)(MiniJson.Luku(nyt, "weather_code") ?? -1);
                var tulos = (Time.realtimeSinceStartup, (int)Math.Round(lampo), (int)Math.Round(Eka("temperature_2m_max") ?? lampo),
                    (int)Math.Round(Eka("temperature_2m_min") ?? lampo), koodi, (float)(Eka("precipitation_sum") ?? 0));
                saaMuisti[avain] = tulos;
                valmis(tulos.Item2, tulos.Item3, tulos.Item4, tulos.Item5, tulos.Item6);
            }
        }

        // --- aihesivu ------------------------------------------------------------------------

        void Aihesivu(VisualElement s, LehtiSivu sivu)
        {
            if (lehti.Laji == LehtiLaji.Kehittaja) { Liitesivu(s, sivu); return; }
            var a = sivu.Aihe;
            // Maalehden ensimmäinen sivu: masto ja maaosasto (tunnusluvut, tervehdykset), web maa-osasto.
            // Otsikko ja lippu ovat otsikkorivillä (AsetaOtsikko). Maalehden ensimmäinen sivu: maaosasto (web maa-osasto).
            if (lehti.Laji == LehtiLaji.Maa && nyt == 0) Maaosasto(s, UiSisalto.Maa(lehti.Maa), null, true);
            if (!string.IsNullOrEmpty(a.Johdanto)) Kappale(s, a.Johdanto, "mk-lehti__johdanto", Kirjasin.LukuKursiivi);

            // Reaktioiden sivuavain (web aihesivunAvain → aiheAvain): maalehdessä ISO3, muuten kaupunki.
            string sivuAvain = Reaktiot.AiheAvain(lehti.Omistaja, a.Id);
            foreach (var n in a.Nostot) Nosto(s, n, sivuAvain);
            foreach (var (otsikko, kohteet) in a.Lista) Lista(s, otsikko, kohteet, sivuAvain);
            // Sivun oma reaktiorivi juttujen perään, ennen tehtävää (web piirraAiheenReaktiot).
            Poimintapillerit.Piirra(s, sivuAvain); // web piirraAiheenPoiminnat: aihesivun loppuun
            Reaktiot.Piirra(s, sivuAvain, a.Nimi ?? sivu.Otsikko);
            bool fokustehtava = fokus.Piirra(s, lehti, nyt);
            if (!fokustehtava && a.Tehtava != null && sivu.TehtavaAihe != null) Tehtava(s, a.Tehtava, sivu.TehtavaAihe);
            if (a.Nostot.Count == 0 && a.Lista.Count == 0 && a.Tehtava == null && !fokustehtava && string.IsNullOrEmpty(a.Johdanto))
                Kappale(s, "Tämä sivu täydentyy myöhemmin.", "mk-lehti__leipa");
        }

        /// <summary>
        /// Kehittäjän liitteen sivu (web piirraKategoria synteettiselle sivulle): masto ensimmäisellä sivulla,
        /// aiheotsikko, oma piirto (Rakenna) ja/tai nostot. Ei poimintoja, reaktioita eikä tehtäviä.
        /// </summary>
        void Liitesivu(VisualElement s, LehtiSivu sivu)
        {
            // Sivun otsikko on otsikkorivillä (AsetaOtsikko).
            if (nyt == 0) Masto(s);
            var a = sivu.Aihe;
            if (!string.IsNullOrEmpty(a?.Johdanto)) Kappale(s, a.Johdanto, "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
            if (sivu.Rakenna != null)
            {
                try { sivu.Rakenna(s); } catch (Exception e) { Debug.LogException(e); }
                if (!sivu.RakennaJatka) return;
            }
            if (a != null) foreach (var n in a.Nostot) Nosto(s, n);
        }

        // Web kulttuuri-musiikkilinkki: nuotti (kaksi kaulaa ja palkki).
        const string Nuotti = "<path d=\"M9 18.5V6.2l9-1.7v11.3\"/><circle class=\"taytto\" cx=\"6.8\" cy=\"18.6\" r=\"2.2\"/><circle class=\"taytto\" cx=\"15.8\" cy=\"15.9\" r=\"2.2\"/>";

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
            // Noston kuuntelu- ja musiikkinapit (web lisaaNostonNapit): näyte, musiikkilinkit, vapaa
            // musiikkinäyte tai Apple Musicin esikuuntelu. Sama soitin kuin mediarivillä (Mediarivi.Kuuntele).
            if (n.Aani != null || n.Musiikkilinkit.Count > 0 || n.Nayte != null || n.Esikuuntelu != null)
            {
                var media = Rakenne.El("mk-lehti__nostomedia", lohko, PickingMode.Ignore);
                if (!string.IsNullOrEmpty(n.Aani)) Mediarivi.Kuuntele(media, "Kuuntele näyte", n.Aani);
                foreach (var (mUrl, mNimi, mOtsake) in n.Musiikkilinkit)
                {
                    string u = mUrl;
                    var ml = Rakenne.Nappi(mNimi, "mk-lehti__musiikkilinkki", () => Application.OpenURL(u), media, Nuotti);
                    if (!string.IsNullOrEmpty(mOtsake)) ml.tooltip = mOtsake;
                    Kirjasimet.Aseta(ml, Kirjasin.Kone);
                }
                if (!string.IsNullOrEmpty(n.Nayte)) Mediarivi.Kuuntele(media, "Kuuntele musiikkia", n.Nayte, null, n.NayteNimi ?? "Vapaasti lisensoitu ääninäyte");
                else if (n.Esikuuntelu != null || n.Musiikki != null)
                {
                    string esi = n.Esikuuntelu, mus = n.Musiikki, nimi = n.MusiikkiNimi ?? n.Otsikko;
                    Mediarivi.Kuuntele(media, "Kuuntele näyte", null, valmis => Mediarivi.HaeEsikuuntelu(esi, mus, nimi, valmis), "Esikuuntelu Apple Musicista (30 s)");
                }
            }
            foreach (var k in Kappaleet(n.Teksti)) Kappale(lohko, k, "mk-lehti__leipa");
            if (n.Lisa != null) { try { n.Lisa(lohko); } catch (Exception e) { Debug.LogException(e); } }
            var loppu = Rakenne.El("mk-lehti__nostoloppu", lohko, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(n.Wiki))
            {
                string wiki = n.Wiki, nimi = n.Otsikko;
                // Pelin oma Lue lisää -ikkuna lehden päällä (web ui.openWikiArticle(nosto.wiki, nosto.otsikko)).
                var b = Rakenne.Nappi("Lue lisää aiheesta ›", "mk-lehti__linkki", () => UiNakymat.Hae()?.Wiki.Avaa(wiki, nimi), loppu);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (!string.IsNullOrEmpty(n.Linkki))
            {
                string url = n.Linkki;
                var b = Rakenne.Nappi((n.LinkkiNimi ?? "Avaa sivusto") + " ›", "mk-lehti__linkki", () => Application.OpenURL(url), loppu);
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

        bool KulttuuriVastattu(string kaupunki) =>
            tila != null ? tila.KulttuuriVastattu(kaupunki) : PeliOhjain.Instanssi?.Kaupat?.KulttuuriVastattu(kaupunki) ?? false;

        /// <summary>
        /// Web naytaKulttuuri: "LEHDEN KYSYMYS" minitehtävän kehyksessä, kysymys heti näkyvissä ("Tutustuitko? …"),
        /// vastaus → KauppaTeko Kulttuurivastaus, kehystetty tulos ("Oikein! +25 puntaa." tai oikea vastaus + fakta).
        /// </summary>
        void Kulttuurivisa(VisualElement s)
        {
            string kaupunki = lehti.Omistaja;
            var paikka = Rakenne.El("mk-lehti__visapaikka", s, PickingMode.Ignore);
            Kulttuurivisat.Lataa(() =>
            {
                var v = Kulttuurivisat.Hae(kaupunki);
                if (v == null || paikka.panel == null) return;
                var laatikko = Rakenne.El("mk-lehti__tehtava", paikka, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("LEHDEN KYSYMYS", "mk-lehti__tehtavaotsake", laatikko), Kirjasin.Kone);
                var palsta = Rakenne.El("mk-lehti__tehtavapalsta", laatikko, PickingMode.Ignore);
                bool vastattu = KulttuuriVastattu(kaupunki);
                var kysymys = Rakenne.Teksti(vastattu ? "Kulttuurivisaan on jo vastattu tässä kaupungissa." : "Tutustuitko? " + v.Kysymys,
                    "mk-lehti__kysymys", palsta);
                Kirjasimet.Aseta(kysymys, Kirjasin.LukuLihava);
                if (vastattu) return;
                var napit = new List<Button>();
                var tulos = Rakenne.Teksti("", "mk-lehti__tehtavatulos", palsta);
                tulos.style.display = DisplayStyle.None;
                int palkkio = KauppaVakiot.KulttuuriPalkkio;
                for (int i = 0; i < v.Vaihtoehdot.Count; i++)
                {
                    int valinta = i;
                    var b = Rakenne.Nappi(v.Vaihtoehdot[i], "mk-nosto__visanappi", null, palsta);
                    Kirjasimet.Aseta(b, Kirjasin.Luku);
                    b.clicked += () =>
                    {
                        bool oikein = valinta == v.Oikea;
                        var r = Teko(new LehtiTeko { Laji = LehtiTekoLaji.Kulttuurivastaus, Kaupunki = kaupunki, Oikein = oikein, Palkkio = palkkio });
                        foreach (var x in napit) x.RemoveFromHierarchy();
                        kysymys.text = v.Kysymys;
                        tulos.style.display = DisplayStyle.Flex;
                        // Hiljaista polkua ei ole: jo vastattu saa näkyvän vastauksen (web).
                        if (r != null && !r.Ok) { tulos.text = "Kysymykseen on jo vastattu tässä kaupungissa."; return; }
                        tulos.text = (oikein ? $"Oikein! +{palkkio} puntaa. " : $"Oikea vastaus: {v.Vaihtoehdot[v.Oikea]}. ") + (v.Fakta ?? "");
                        tulos.EnableInClassList("mk-oikein", oikein);
                        tulos.EnableInClassList("mk-vaarin", !oikein);
                        Aanet.PulunTehoste(oikein ? "correct" : "wrong");
                        Rakenne.Vierita(sivu, tulos, 30);
                    };
                    napit.Add(b);
                }
            });
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
            Natiivi.Kuvat.Hae(k.JulisteTiedosto.StartsWith("http") ? k.JulisteTiedosto : "https://media.matkakirja.app/julisteet/" + k.JulisteTiedosto, t =>
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
            // Web avaaMaalehti: suoraan kartta otsikkorivin "KREIKKA 🇬🇷" alla, ei nimiösivua.
            var m = UiSisalto.Maa(lehti.Maa);
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
            Maaosasto(s, m, LehtiSisalto.Nosto(m?.KarttaNosto), true);
        }

        /// <summary>
        /// Web arrival-maa: PERUSTIEDOT-almanakka (ikoni, arvo, pisteviivajohdin, sijoitus; demokratialle ja
        /// keskitulolle mittaripalkki), HYVÄÄ PÄIVÄÄ -rivi lippuineen, maan esittely (ARTIKKELIT intro), kartan
        /// nosto ja lopuksi uutiset ja mediarivi (maa-oikea). Kapealla luvut allekkain, leveällä kahteen palstaan.
        /// </summary>
        void Maaosasto(VisualElement s, MaaTiedot m, LehtiNosto nosto = null, bool esittely = false)
        {
            if (m == null) { if (nosto != null) Nosto(s, nosto); return; }
            if (m.Vakiluku != null || m.PintaAla != null || m.Demokratia != null || m.Keskitulo != null)
            {
                var luvut = Rakenne.El("mk-maa__luvut", s, PickingMode.Ignore);
                Rakenne.El("mk-maa__tuplaviiva", luvut, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("PERUSTIEDOT", "mk-maa__otsake", luvut), Kirjasin.Kone);
                var ruudukko = Rakenne.El("mk-maa__ruudukko", luvut, PickingMode.Ignore);
                ruudukko.RegisterCallback<GeometryChangedEvent>(e =>
                {
                    // Web grid auto-fit minmax(21rem, 1fr), gap 1,5rem: kaksi palstaa, kun tilaa on 2 × 336 + 24 px.
                    bool kaksi = e.newRect.width >= 696f;
                    if (ruudukko.ClassListContains("mk-maa__ruudukko--kaksi") != kaksi) ruudukko.EnableInClassList("mk-maa__ruudukko--kaksi", kaksi);
                });
                if (m.Vakiluku != null) Tunnus(ruudukko, Ikonit.TunnusVaki, m.Vakiluku, m.VakilukuSija, null);
                if (m.PintaAla != null) Tunnus(ruudukko, Ikonit.TunnusAla, m.PintaAla, m.PintaAlaSija, null);
                if (m.Demokratia != null)
                {
                    float? osuus = float.TryParse(m.Demokratia.Replace(',', '.'), System.Globalization.NumberStyles.Float,
                        System.Globalization.CultureInfo.InvariantCulture, out var d) ? d : (float?)null;
                    var arvo = Tunnus(ruudukko, Ikonit.TunnusVaaka, m.Demokratia + " · V-Dem", m.DemokratiaSija, osuus);
                    if (!string.IsNullOrEmpty(m.DemokratiaSelitys))
                    {
                        // Web .maa-demokratia: arvo on pisteillä alleviivattu nappi → V-Demin selitys minipopupissa.
                        Rakenne.El("mk-maa__alleviiva", arvo, PickingMode.Ignore).Add(new Johdin(0.45f));
                        string selitys = m.DemokratiaSelitys, linkki = m.DemokratiaLinkki;
                        arvo.pickingMode = PickingMode.Position;
                        arvo.AddManipulator(new Clickable(() => Minipopup.Avaa("Demokratiaindeksi (V-Dem)", c =>
                        {
                            Kirjasimet.Aseta(Rakenne.Teksti(selitys, "mk-minipopup__teksti", c), Kirjasin.Luku);
                            if (!string.IsNullOrEmpty(linkki))
                                Kirjasimet.Aseta(Rakenne.Nappi("Avaa lähde ›", "mk-lehti__linkki", () => Application.OpenURL(linkki), c), Kirjasin.Kone);
                        })));
                    }
                }
                if (m.Keskitulo != null)
                {
                    string numerot = Regex.Replace(m.Keskitulo, "[^0-9]", "");
                    float? osuus = int.TryParse(numerot, out var tulo) ? tulo / 100000f : (float?)null;
                    Tunnus(ruudukko, Ikonit.TunnusRaha, m.Keskitulo, m.KeskituloSija, osuus);
                }
            }
            if (m.Tervehdykset.Count > 0)
            {
                var laatikko = Rakenne.El("mk-maa__tervehdykset", s, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("HYVÄÄ PÄIVÄÄ", "mk-maa__otsake", laatikko), Kirjasin.Kone);
                var terv = Rakenne.El("mk-maa__tervehdysrivi", laatikko, PickingMode.Ignore);
                foreach (var t in m.Tervehdykset)
                {
                    var osa = Rakenne.El("mk-maa__tervehdys", terv, PickingMode.Ignore);
                    var teksti = Rakenne.Teksti(t.Teksti ?? "", "mk-maa__tervehdysteksti", osa);
                    teksti.enableRichText = false;
                    Kirjasimet.Aseta(teksti, Kirjasin.LukuKursiivi);
                    if (!string.IsNullOrEmpty(t.Lippu))
                    {
                        var lippu = Rakenne.El("mk-maa__tervehdyslippu", osa, PickingMode.Ignore);
                        lippu.style.display = DisplayStyle.None;
                        Natiivi.Kuvat.Hae(t.Lippu, tx =>
                        {
                            if (tx == null) return;
                            lippu.style.backgroundImage = new StyleBackground(tx);
                            lippu.style.width = Mathf.Round(16f * tx.width / Mathf.Max(1, tx.height));
                            lippu.style.display = DisplayStyle.Flex;
                        }, "liput");
                    }
                    if (!string.IsNullOrEmpty(t.Osuus)) Kirjasimet.Aseta(Rakenne.Teksti(t.Osuus, "mk-maa__sija mk-maa__osuus", osa), Kirjasin.Kone);
                }
                Rakenne.El("mk-maa__tuplaviiva mk-maa__tuplaviiva--ala", laatikko, PickingMode.Ignore);
            }
            if (esittely)
            {
                // Maan pääkirjoitus (web #arrival-maa-intro, ARTIKKELIT[maa].intro): kappaleet \n\n:stä.
                var paikka = Rakenne.El("mk-maa__esittely", s, PickingMode.Ignore);
                string nimi = m.Nimi;
                WikiArtikkelit.Lataa(() =>
                {
                    if (paikka.panel == null) return;
                    // Web #arrival-maa-intro: 1,02rem, riviväli 1,62, pre-line (\n\n = tyhjä rivi väliin), anfangi.
                    string intro = WikiArtikkelit.Intro(nimi);
                    if (!string.IsNullOrEmpty(intro)) Leipa(paikka, intro, "mk-lehti__esittely", 1.62f, 1.62f, true);
                });
            }
            if (nosto != null) Nosto(s, nosto);
            Uutiset.Piirra(s, m.Iso3);
            MaanMedia(s, m.Iso3);
        }

        /// <summary>Web maa-tunnus: ikoni, arvo (+ palkki), pisteviivajohdin ja "(sija)". Palauttaa arvon kääreen.</summary>
        static VisualElement Tunnus(VisualElement isa, string ikoni, string arvo, string sija, float? osuus)
        {
            var r = Rakenne.El("mk-maa__tunnus", isa, PickingMode.Ignore);
            var i = Rakenne.Ikoni(ikoni, "mk-maa__ikoni", r);
            i.Ruutu = 15f;
            i.pickingMode = PickingMode.Ignore;
            var kaare = Rakenne.El("mk-maa__arvo", r, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(arvo, "mk-maa__arvoteksti", kaare), Kirjasin.KoneLihava);
            if (osuus is float o) r.Add(new Mittari(o));
            var johdin = new Johdin(0.45f);
            johdin.AddToClassList("mk-maa__johdin");
            r.Add(johdin);
            if (!string.IsNullOrEmpty(sija)) Kirjasimet.Aseta(Rakenne.Teksti("(" + sija + ")", "mk-maa__sija", r), Kirjasin.Kone);
            return kaare;
        }

        /// <summary>Pisteviivajohdin (web .maa-tunnus-johdin): pisteet väliin ~0,45 em, väri USS color.</summary>
        sealed class Johdin : VisualElement
        {
            readonly float vali;
            public Johdin(float valiEm)
            {
                vali = valiEm;
                pickingMode = PickingMode.Ignore;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width <= 0) return;
                float em = resolvedStyle.fontSize > 0 ? resolvedStyle.fontSize : 15f;
                float askel = Mathf.Max(3f, vali * em), sade = Mathf.Max(0.8f, em * 0.075f);
                var p = mgc.painter2D;
                p.fillColor = resolvedStyle.color;
                float y = r.yMax - sade;
                for (float x = r.xMin + askel * 0.5f; x < r.xMax; x += askel)
                {
                    p.BeginPath();
                    p.Arc(new Vector2(x, y), sade, 0f, 360f);
                    p.Fill();
                }
            }
        }

        /// <summary>
        /// Web .maa-palkki: kiinteä 3,6 em × 0,66 em -mittari neljännesjaoin; täyte punainen &lt; 1/3,
        /// keltainen &lt; 2/3, muuten vihreä, ja siinä vaalea vinoviivoitus kuin musteessa.
        /// </summary>
        sealed class Mittari : VisualElement
        {
            readonly float osuus;
            public Mittari(float osuus)
            {
                this.osuus = osuus;
                AddToClassList("mk-maa__palkki");
                pickingMode = PickingMode.Ignore;
                generateVisualContent += Piirra;
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (r.width <= 0 || r.height <= 0) return;
                var p = mgc.painter2D;
                p.lineWidth = 1f;
                p.strokeColor = new Color(70 / 255f, 51 / 255f, 31 / 255f, 0.16f);
                for (int i = 1; i < 4; i++)
                {
                    float x = r.xMin + r.width * i / 4f;
                    p.BeginPath(); p.MoveTo(new Vector2(x, r.yMin)); p.LineTo(new Vector2(x, r.yMax)); p.Stroke();
                }
                float w = r.width * Mathf.Clamp(osuus, 0.03f, 1f);
                Color vari = osuus < 1f / 3f ? new Color32(0xbf, 0x3d, 0x2d, 255) : osuus < 2f / 3f ? new Color32(0xd9, 0xa4, 0x1f, 255) : new Color32(0x3e, 0x8f, 0x4a, 255);
                p.fillColor = vari;
                p.BeginPath();
                p.MoveTo(new Vector2(r.xMin, r.yMin)); p.LineTo(new Vector2(r.xMin + w, r.yMin));
                p.LineTo(new Vector2(r.xMin + w, r.yMax)); p.LineTo(new Vector2(r.xMin, r.yMax));
                p.ClosePath();
                p.Fill();
                p.strokeColor = new Color(252 / 255f, 247 / 255f, 234 / 255f, 0.42f);
                p.lineWidth = 0.5f;
                for (float x = r.xMin - r.height; x < r.xMin + w; x += 2.5f)
                {
                    float x0 = Mathf.Max(x, r.xMin), y0 = r.yMax - (x0 - x);
                    float x1 = Mathf.Min(x + r.height, r.xMin + w), y1 = r.yMax - (x1 - x);
                    if (x1 <= x0) continue;
                    p.BeginPath(); p.MoveTo(new Vector2(x0, y0)); p.LineTo(new Vector2(x1, y1)); p.Stroke();
                }
            }
        }

        /// <summary>
        /// Maaosaston mediarivi uutisten perään (web #arrival-media). Radio seuraa lehden maata, mutta
        /// kaupungin kielinäyte ja tallenne vain oman maan lehteen (web paivitaMediarivit: maanIso === iso).
        /// </summary>
        void MaanMedia(VisualElement isa, string iso)
        {
            string k = avausKaupunki != null && UiSisalto.Kaupunki(avausKaupunki)?.Maa == iso ? avausKaupunki : null;
            Mediarivi.Piirra(isa, k, iso);
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

        /// <summary>
        /// Lehden leipäteksti webin rivivälillä (riviEm × kirjasinkoko) ja kappalevälillä (valiEm), valinnaisesti
        /// anfangilla (web ::first-letter: float left, American Typewriter 700, 3,1 em, line-height 0,82, oikealla
        /// 0,12 em, rgba(70, 51, 31, 0,9)). UITK ei kelluta: ensimmäisen kappaleen rivit anfangin vieressä ladotaan
        /// kapeampaan palstaan ja loput täysleveänä alle. Ääneenluku lukee piilotetun kokonaisen tekstin.
        /// </summary>
        static void Leipa(VisualElement isa, string teksti, string luokka, float riviEm, float valiEm, bool anfangi)
        {
            var lohko = Rakenne.El("mk-lehti__leipa", isa, PickingMode.Ignore);
            var luettava = Rakenne.Teksti(teksti, "mk-lehti__luettava", lohko);
            luettava.enableRichText = false;
            luettava.style.display = DisplayStyle.None;
            var kappaleet = Kappaleet(teksti).ToList();
            for (int i = 0; i < kappaleet.Count; i++)
            {
                VisualElement kpl = anfangi && i == 0 ? AnfangiKappale(lohko, kappaleet[i], luokka, riviEm)
                    : Rivitetty(kappaleet[i], luokka, riviEm, lohko);
                if (i < kappaleet.Count - 1)
                {
                    var k = kpl;
                    k.RegisterCallback<GeometryChangedEvent>(_ =>
                    {
                        float f = k.resolvedStyle.fontSize > 0 ? k.resolvedStyle.fontSize : 16f;
                        float mb = Mathf.Round(valiEm * f);
                        if (!Mathf.Approximately(k.resolvedStyle.marginBottom, mb)) k.style.marginBottom = mb;
                    });
                }
            }
        }

        static string Rivivali(string teksti, float riviEm) =>
            "<line-height=" + riviEm.ToString("0.###", System.Globalization.CultureInfo.InvariantCulture) + "em><noparse>" + teksti + "</noparse>";

        static Label Rivitetty(string teksti, string luokka, float riviEm, VisualElement isa)
        {
            var l = Rakenne.Teksti(Rivivali(teksti, riviEm), luokka, isa);
            l.enableRichText = true;
            Kirjasimet.Aseta(l, Kirjasin.Luku);
            return l;
        }

        /// <summary>Fontin nousu kirjasinkoon osuutena (perusviivan etäisyys rivin yläreunasta).</summary>
        static float Nousu(Kirjasin k)
        {
            var fi = Kirjasimet.Hae(k)?.fontAsset?.faceInfo;
            return fi is UnityEngine.TextCore.FaceInfo f && f.pointSize > 0 ? f.ascentLine / f.pointSize : 0.8f;
        }

        static VisualElement AnfangiKappale(VisualElement isa, string teksti, string luokka, float riviEm)
        {
            // ::first-letter ottaa alkuvälimerkit (lainausmerkki) kirjaimen mukaan.
            int n = 0;
            while (n < teksti.Length && !char.IsLetterOrDigit(teksti[n])) n++;
            n = Mathf.Min(teksti.Length, n + 1);
            string eka = teksti.Substring(0, n), loput = teksti.Substring(n);
            var kpl = Rakenne.El("mk-lehti__anfangikappale " + luokka, isa, PickingMode.Ignore);
            var alku = Rivitetty("", luokka, riviEm, kpl);
            var loppu = Rivitetty("", luokka, riviEm, kpl);
            alku.style.marginBottom = 0;
            loppu.style.marginBottom = 0;
            var kirjain = Rakenne.Teksti(eka, "mk-lehti__anfangi", kpl);
            kirjain.enableRichText = false;
            Kirjasimet.Aseta(kirjain, Kirjasin.KoneBold);
            float leveys = -1f;
            void Lado()
            {
                float w = kpl.contentRect.width, f = alku.resolvedStyle.fontSize;
                if (w <= 0 || float.IsNaN(w) || f <= 0 || Mathf.Approximately(w, leveys)) return;
                leveys = w;
                float iso = 3.1f * f, rivi = riviEm * f;
                kirjain.style.fontSize = iso;
                // Web: kellutuslaatikko 0,06 + 0,82 em; se varaa niin monta tekstiriviä kuin ulottuu.
                int rivit = Mathf.Max(1, Mathf.CeilToInt(0.88f * iso / rivi - 0.05f));
                float sisennys = kirjain.MeasureTextSize(eka, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x + 0.12f * iso;
                // Anfangin perusviiva viimeisen viereisen rivin perusviivalle.
                kirjain.style.top = Mathf.Round(Nousu(Kirjasin.Luku) * f + (rivit - 1) * rivi - Nousu(Kirjasin.KoneBold) * iso);
                alku.style.marginLeft = sisennys;
                float palsta = Mathf.Max(1f, w - sisennys);
                float Korkeus(string t) => alku.MeasureTextSize(Rivivali(t, riviEm), palsta, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y;
                float raja = Korkeus("A" + string.Concat(Enumerable.Repeat("\nA", rivit - 1))) + 0.5f;
                var sanat = loput.Split(' ');
                int ala = 0, yla = sanat.Length;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    if (Korkeus(string.Join(" ", sanat, 0, keski)) <= raja) ala = keski; else yla = keski - 1;
                }
                alku.text = Rivivali(string.Join(" ", sanat, 0, ala), riviEm);
                string jaljella = string.Join(" ", sanat, ala, sanat.Length - ala).TrimStart();
                loppu.text = Rivivali(jaljella, riviEm);
                loppu.style.display = jaljella.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
                // Viereiset rivit täyttävät anfangin korkeuden, jotta loppu alkaa sen alta samalla rivivälillä.
                alku.style.height = rivit * rivi;
            }
            kpl.RegisterCallback<GeometryChangedEvent>(_ => Lado());
            return kpl;
        }

        /// <summary>Tyhjä rivi erottaa kappaleet (webin leipäteksti).</summary>
        static IEnumerable<string> Kappaleet(string teksti) =>
            string.IsNullOrWhiteSpace(teksti) ? Enumerable.Empty<string>()
                : Regex.Split(teksti.Trim(), @"\n\s*\n").Select(x => x.Trim()).Where(x => x.Length > 0);

        // --- sisällys (maalehti) ------------------------------------------------------------------

        void SuljeSisallys() => sisallys.style.display = DisplayStyle.None;

        float turvaYla;

        /// <summary>Yläreunaan laskeutuva levy alkaa turva-alueen alta (web .ylhaalla: tarttuma + 0,6 rem), alhaalta noustessa USS.</summary>
        void AsetaSisallysVara()
        {
            bool yla = sisallys.ClassListContains("mk-lehti__sisallys--ylhaalla");
            sisallys.style.paddingTop = yla ? 18.4f + turvaYla : StyleKeyword.Null;
        }

        /// <summary>
        /// Web avaaSisallysvalikko + rakennaSisallysLista: rivillä 52 px:n pikkukuva, sivun otsikko (sivunOtsikko,
        /// esim. "Ateena pintaa syvemmältä") ja kaksirivinen ingressi (johdannon ensimmäinen virke, sisallysTiedot).
        /// Nykyistä sivua ei korosteta.
        /// </summary>
        void VaihdaSisallys(bool ylhaalla)
        {
            if (sisallys.style.display == DisplayStyle.Flex) { SuljeSisallys(); return; }
            sisallys.EnableInClassList("mk-lehti__sisallys--ylhaalla", ylhaalla);
            AsetaSisallysVara();
            sisallysLista.Clear();
            for (int i = 0; i < lehti.Sivut.Count; i++)
            {
                int kohde = i;
                var s = lehti.Sivut[i];
                var (kuva, ingressi) = SisallysTiedot(s);
                var b = Rakenne.Nappi(null, "mk-lehti__sisallysrivi", () => { SuljeSisallys(); Kaanna(kohde); }, sisallysLista);
                if (kuva != null)
                {
                    var k = Rakenne.El("mk-lehti__sisallyskuva", b, PickingMode.Ignore);
                    NostoSisalto.HaeKuvaPienena(kuva, 104, 104, t => { if (t != null) k.style.backgroundImage = new StyleBackground(t); });
                }
                var t2 = Rakenne.El("mk-lehti__sisallysteksti", b, PickingMode.Ignore);
                string otsikko = s.Laji == LehtiSivuLaji.Etusivu && lehti.Laji == LehtiLaji.Kaupunki ? "Etusivu" : s.Otsikko ?? s.Lyhyt ?? "";
                Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-lehti__sisallysrivinimi", t2), Kirjasin.KoneLihava);
                if (!string.IsNullOrEmpty(ingressi))
                {
                    var ing = Rakenne.Teksti(ingressi, "mk-lehti__sisallysingressi", t2);
                    ing.enableRichText = false;
                    Kirjasimet.Aseta(ing, Kirjasin.LukuLihava);
                    RajaaRiveihin(ing, 2);
                }
            }
            sisallys.style.display = DisplayStyle.Flex;
        }

        /// <summary>Web sisallysTiedot: kuva ja ingressi (johdannon tai ensimmäisen kohteen ensimmäinen virke).</summary>
        (string kuva, string ingressi) SisallysTiedot(LehtiSivu s)
        {
            var a = s.Aihe;
            switch (s.Laji)
            {
                case LehtiSivuLaji.MaaEtusivu: return (UiSisalto.Maa(lehti.Maa)?.KarttaUrl, "Kaupungit ja maasto kartalla.");
                case LehtiSivuLaji.Numeroina: return (null, "Väkiluku, pinta-ala ja muut tunnusluvut.");
                case LehtiSivuLaji.Etusivu:
                    // Kansi: kansiosion pääkuva ja johdannon ensimmäinen virke (web etusivuRivi).
                    return (a?.Kansikuvat.FirstOrDefault()?.Lahde, string.IsNullOrEmpty(a?.Johdanto) ? "Lehden kansi." : EkaVirke(a.Johdanto));
            }
            if (a == null) return (null, null);
            var kohde = a.Lista.Count > 0 ? a.Lista[0].Kohteet.FirstOrDefault() : null;
            var nosto = kohde == null ? a.Nostot.FirstOrDefault() : null;
            string johdanto = a.Johdanto ?? kohde?.Teksti ?? nosto?.Teksti ?? "";
            return (kohde != null ? kohde.Kuva?.Lahde : nosto?.Kuva?.Lahde, EkaVirke(johdanto));
        }

        /// <summary>Web (teksti.match(/[^.!?]+[.!?]/) ?? [teksti])[0].trim().</summary>
        static string EkaVirke(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) return "";
            var m = Regex.Match(teksti, @"[^.!?]+[.!?]");
            return (m.Success ? m.Value : teksti).Trim();
        }

        /// <summary>Web -webkit-line-clamp: teksti katkaistaan n riviin ja loppuun "…".</summary>
        static void RajaaRiveihin(Label l, int rivit)
        {
            string koko = l.text;
            l.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float w = e.newRect.width;
                if (w <= 0 || float.IsNaN(w) || Mathf.Approximately(e.oldRect.width, w)) return;
                float rivi = l.MeasureTextSize("Ag", 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).y;
                float raja = rivi * rivit + 1f;
                string t = koko;
                if (l.MeasureTextSize(t, w, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y <= raja) { l.text = t; return; }
                int ala = 0, yla = koko.Length;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    string koe = koko.Substring(0, keski).TrimEnd() + "…";
                    if (l.MeasureTextSize(koe, w, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y <= raja) ala = keski;
                    else yla = keski - 1;
                }
                l.text = koko.Substring(0, ala).TrimEnd() + "…";
            });
        }

        // --- luenta (kaiutin) ----------------------------------------------------------------------

        void VaihdaLuenta()
        {
            if (luetaan) { PysaytaLuenta(); return; }
            ValmistaSivu();
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
        /// Testikomento: "sivu n" kääntää, "sisallys" avaa sisällyksen (ylärivin ☰, "sisallys-ala" alapalkin), "kuva" suurennoksen, "tehtava(-pois)" keksityn
        /// tehtävänapin, "viimeinen" viimeiselle sivulle, "fokus-vastaa n" / "fokus-pulla" napauttaa fokustehtävää.
        /// </summary>
        public string Testaa(string mita, int n)
        {
            ValmistaSivu();
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
                case "sisallys":
                case "sisallys-ala": if (lehti != null && lehti.Sivut.Count >= 2) VaihdaSisallys(mita == "sisallys"); break;
                case "kuva":
                    var k = sivu?.contentContainer.Q(className: "mk-lehti__kuvakehys");
                    if (k != null) using (var e = ClickEvent.GetPooled()) { e.target = k; k.SendEvent(e); }
                    break;
            }
            return null;
        }

        /// <summary>Testikomento "ui lehti vierita px|loppu": auki olevan sivun vieritys ilman kosketusta.</summary>
        public string Vierita(string mihin)
        {
            if (!Auki || sivu == null) return "lehti ei ole auki";
            ValmistaSivu();
            // Asettelu ensin: juuri avatun sivun sisältö on vielä mittaamatta.
            sivu.schedule.Execute(() =>
            {
                float loppu = Mathf.Max(0, sivu.contentContainer.layout.height - sivu.contentViewport.layout.height);
                float y = mihin == "loppu" ? loppu : float.TryParse(mihin, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var px) ? px : 0;
                sivu.scrollOffset = new Vector2(0, Mathf.Clamp(y, 0, loppu));
            }).StartingIn(50);
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
