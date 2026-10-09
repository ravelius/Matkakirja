// NOSTOKORTTI (Natiivi-UI): karttavalon napautuksesta avautuva kortti — webin
// fokuskohde (js/fokuskohteet.js), skandaalin lisälehti (js/skandaalit.js), historian
// hetki (js/historian-hetket.js), eläintäky (js/elaintaky.js), täkynosto (js/fokusnosto.js) ja
// syvennystarina (js/syvennys.js) yhtenä näkymänä.
//
// Kuva edellä kahdessa vaiheessa (js/nostokuva.js): 1) pelkkä kuva, lyhyt kuvateksti ja
// LISÄÄ; 2) koko kortti (kuvasarja ‹ › ja laskuri, teksti kappaleittain, lajin lohkot).
// Kuvaton kortti aukeaa suoraan vaiheeseen 2. Kuvan napautus vaiheessa 2 avaa suurennoksen
// (pitkä selite ja lähderivi). Sulkeminen: napautus kortin ohi, kahvan veto alas tai Esc (ei ✕-nappia; tekstin napautus ei sulje, omistaja 6.10.).
//
//   skandaali  nimiö LISÄLEHTI, "paikka · vuosi" kaksoisviivojen välissä, otsikko, ingressi,
//              kuvat, teksti, minivisa (+50, Kaupat.Minitehtava(iso, "skandaali:<id>"))
//   hetki      "paikka · päiväys", kuvat, teksti, minivisa (+50, "hetki:<id>")
//   eläin      kuva(t), teksti, palkkiorivi (Kaupat.Elaintaky(iso, 20) vaiheessa 2)
//   kohde      luokka, nimi, kuvat (ihmekuva ensin, nauha "Unohdettu aarre"), teksti (säilyneen ihmekohteen
//              oma valokuva pienenä sen kyljessä, web kohteenNykykuva; "Koe ihme" pois 27.9.2026), LUKIJAN KYSYMYS
//              (+25, "nosto"/id), "Kysy viisaalta pöllöltä pululta:" (PuluChat.Kysy), kierrokset
//              (ulkoinen linkki), "Livian leikekirja" (kohteen nimeävä täkynosto, web piirraKohteenNosto)
//   täkynosto  (web js/fokusnosto.js avaaNostonKortti; myös maalehtinosto, jonka web avaa samalla avaaNosto-
//              polulla, ja karttavalon "nosto:<id>", kokoelma takynostot) luokka, [lööppi: LISÄLEHTI, päiväys], otsikko,
//              [ingressi], äänirivi (näyte, musiikki, Apple Music), kuvat, lunastus, valokuva
//              "näin se löytyi", isoisän karttaliite (napautus → suurena), LUKIJAN KYSYMYS (+25,
//              nostotehtävälaskuri), "Katso X kartalla" (→ kohdekortti), pulun
//              kysymykset (3); kaiutin "Kuuntele kortti"
//   syvennys   (web js/syvennys.js avaaSyvennys) luokka, otsikko, kuva, tarina, minivisa (+50,
//              "<kaupunki>"/"fokus:<täky>"); oikea vastaus myöntää kaupungin julisteen ja tuo napin
//              "Lunasta juliste" (suurennos); kaiutin "Kuuntele tarina"
// Pelin tila muuttuu vain PeliOhjain.KauppaTeko-kutsuilla (Pelikoodari). Kerros 40, pallo lukittu.
// Kohdekortin korostetut sanat (web fokuskohteet piirraKorostettuSana): kunkin korostuksen
// ensimmäinen esiintymä tekstissä on alleviivattu linkki, napautus → pulu "Kerro lisää: X (kohteessa Y)".
// Kaiutin (web js/lukija.js lisaaLukijanappi, KortinLukija) vaiheessa 2 ylärivin oikeassa päässä (löydös 133).
// PAIKKA JA KOKO (löydökset 130, 131 ja 135, omistaja build 16; korvaa E3:n ankkuroinnin): jokainen kortti aukeaa
// keskelle himmennyksen päälle samalla leveydellä (Mitoita) — kuvallinen, kuvaton, kohde, lisäkaupunki ja
// skandaali (vain tyyli eri). Kuvallinen kortti aukeaa webin kuva edellä -tapaan (js/nostokuva.js), kuva omassa
// muodossaan korkeuskattoon asti; vaiheessa 2 kuva pysyy täsmälleen paikallaan (Korjaa). Löydös 137: korttia ei
// raahata (paikkaa ei tarvitse siirtää, ja otsikosta alkanut veto siirsi korttia vierityksen sijaan); pystyvieritys
// on Kosketusvieritys (löydös 51).
// Napautus kortin tekstiin tai pohjaan sulkee (web: pop-upin
// päällä napautus on sulku, painikkeen päällä valinta; matka < 6 px ja kesto < 700 ms). Testikomennot painavat kortin
// nappeja nimellä (Testaa: lisaa, ihme, leikekirja, kartalla, liite, valokuva, vastaa<n>, juliste).
// LISÄKAUPUNKI (web kaupunkinosto.js avaaLisakaupunginKortti, kohde.kaupunkikortti ohittaa kohdekortin):
// otsikkona kaupungin nimi, herokuva (kuvateksti ja lähderivi; ilman kuvaa paikkamerkki nimellä),
// esittely kappaleittain ja yksi kaupunkiin ankkuroitu nosto (otsikko + teksti). Ei visaa eikä kaiutinta.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Nostokortti
    {
        readonly VisualElement kerros, kortti;
        readonly Button pinNappi;
        string pinId;
        bool pienennetaan;
        string PinOmistaja => nosto?.Id == null ? null : "nosto:" + nosto.Id;
        static string PinOmistajaNostolle(Nosto n) => n?.Id == null ? null : "nosto:" + n.Id;

        /// <summary>
        /// PINNATTU TILA PYSYY (omistaja 6.10. 23.0x: "nosto saisi pysyä pienennettynä vaikka klikkaisin toista nostoa kartalla.
        /// Luenta vain siirtyisi siihen"): pinnattu nosto on palkkina ja kortti kiinni → kartalta valittu tai AUTOn seuraava nosto
        /// ei avaa korttia, vaan palkki ja luenta vaihtuvat siihen; ensimmäinen kuva näkyy palkin alla 3 s (Pinnaus.NaytaKuva).
        /// </summary>
        bool Taustatila => !Auki && Pinnaus.Pienena && !Pinnaus.Vaisto && Pinnaus.Nykyinen?.Omistaja != null
                           && Pinnaus.Nykyinen.Omistaja.StartsWith("nosto:", StringComparison.Ordinal);

        void NaytaTaustalla(Nosto n)
        {
            nosto = n;
            pinId = null;
            lukija.Aseta(LuennanTekstit(n), "Kuuntele: " + (n.Otsikko ?? ""), PinOmistajaNostolle(n));
            selain.Paivita(valo);
            lukija.Paina();        // pelaajan luenta: korvaa edellisen pinnatun
            VaihdaPin();           // uusi nosto pinnatuksi …
            Pinnaus.Pienenna();    // … ja heti palkiksi
            lukija.Pysayta();      // ketju taustalle (jatkuu, kunnes pinnaus vaihtuu tai luettu loppuun)
            Pinnaus.NaytaKuva(n.Kuvat.Count > 0 ? n.Kuvat[0].Lahde : null);
            Debug.Log($"MATKAKIRJA ui pinnaus: palkki vaihtui nostoon {n.Id} (kortti kiinni)");
        }

        /// <summary>Taustalla luettu nosto loppui: AUTO siirtyy seuraavaan palkkina (kortti pysyy kiinni).</summary>
        void TaustaLoppui(string omistaja)
        {
            if (!Nostoselain.Auto || !Taustatila || Pinnaus.Nykyinen.Omistaja != omistaja) return;
            if (!selain.Askel(1)) Debug.Log("MATKAKIRJA ui pinnaus: AUTO – ei seuraavaa nostoa");
        }
        /// <summary>Tämä kortti näyttää pinnatun noston täysikokoisena.</summary>
        bool PinNakyvissa => Auki && Pinnaus.Nykyinen != null && Pinnaus.Nykyinen.Omistaja == PinOmistaja && !Pinnaus.Pienena;

        void VaihdaPin()
        {
            if (nosto == null) return;
            string id = nosto.Id;
            // Palautus avaa saman valon (Avaa ottaa valon tunnuksen, ei noston id:tä; junan 146 video 6.10.: palkin napautus
            // ei palauttanut korttia, kun Avaa sai noston id:n).
            string palautus = valo ?? id;
            pinId = id;
            Pinnaus.Vaihda(new Pinnaus.Kohde
            {
                Omistaja = PinOmistaja, Otsikko = nosto.Otsikko,
                // Pienennys sulkee kortin vain, jos se yhä näyttää pinnattua nostoa (karttanapautus voi avata uuden ensin).
                Pienenna = () => { if (Auki && nosto?.Id == id) { pienennetaan = true; Sulje(); pienennetaan = false; } },
                Palauta = () => { Debug.Log($"MATKAKIRJA ui pinnaus: palautus {palautus}"); Avaa(palautus); },
                Irti = PaivitaPin,
            });
        }

        /// <summary>Pinnattuna himmennys ja syötelukko pois: kartta liikkuu ja napautuu kortin ohi (pienentää sen palkiksi).</summary>
        void PaivitaPin()
        {
            bool p = PinNakyvissa;
            pinNappi.EnableInClassList("mk-valittu", p);
            pinNappi.tooltip = p ? "Poista pinnaus" : "Pinnaa";
            kerros.pickingMode = p ? PickingMode.Ignore : PickingMode.Position;
            kerros.EnableInClassList("mk-himmennys--pin", p);
            if (!Auki) return;
            if (p) SyoteLukko.Vapauta(this); else SyoteLukko.Esta(this);
        }
        // Suurennos selattavana sarjana (web fokuskohteet.js avaaKohdeSuurennos ‹ ›).
        readonly Kuvasuurennos suurennos;
        readonly ScrollView sisus;
        readonly KortinLukija lukija;
        // Kohdekortin visa omana KORTTI-ikkunanaan nostokortin päällä (web: luoPohjaKortti({ yla: 'Visa', otsikko })).
        readonly VisualElement visaKerros;
        bool visaAuki;
        // NOSTOSELAIN ja AUTO (omistaja 1.10.2026, mallit 20 + 22 + 23): ‹ [Nostot ▾] › kahvan alla, AUTO lukijan rivillä.
        readonly Nostoselain selain;
        /// <summary>Auki olevan kortin valo (selaimen nykyinen).</summary>
        string valo;
        /// <summary>Painallus sulki selaimen paneelin: sama napautus ei sulje korttia.</summary>
        bool selainSulki;
        // NOSTOKORTTI-POHJA (UI-pohjat, omistaja 1.10.2026): KAPEA = alareunaan, korkeus ≤ Peitto.Max % (laajennettuna
        // Peitto.Laajennettu %); KESKI/LEVEÄ = sivukortti oikeaan reunaan. Vetokahva: ylös laajentaa, alas pienentää laajennetun ja sulkee muuten.
        readonly VisualElement kahva, kahvaAlue;
        bool laajennettu, kahvaVeto;
        Vector2 kahvaAlku;
        // Vyöhyke 20 pt (juna 155: selaimen rivi nousi ~8 pt kahvan alle; ennen 28 pt, joka olisi peittänyt nappien yläosan).
        const float KahvaVyohyke = 20f, KahvaYlos = 20f, KahvaAlas = 40f;
        const float HeroSuhde = 0.5f; // tyylikirja mitat.kuva.hero-kortti 2:1

        Nosto nosto;
        int kuvaIndeksi, versio;
        /// <summary>Kortin napit nimellä testikomentoja varten (ui nosto … &lt;nappi&gt;, ui ihme, ui leikekirja).</summary>
        readonly Dictionary<string, Action> napit = new Dictionary<string, Action>();

        public bool Auki { get; private set; }

        // MAAKUNTA NOSTOKORTTINA (omistaja 6.10. 13.0x, Päätoimittaja: vaihtoehto b): maakunta avautuu tähän korttiin valolla
        // "maakunta:ISO:tunnus". Pienenä kuva, koko ensimmäinen kappale nostotekstin koossa ja LISÄÄ; suurena samat napit kuin
        // nostossa (‹ MAAKUNNAT ›, AUTO, kaiutin, pin, Kysy). Sisällön ja maan maakuntalistan antaa Maakunnat.
        public const string MaakuntaEtuliite = "maakunta:";
        public static Func<string, Nosto> MaakuntaNosto;
        public static Func<string, Nostoselain.Lista> MaakuntaLista;
        /// <summary>Kortti näyttää maakuntaa.</summary>
        public bool MaakuntaAuki => Auki && valo != null && valo.StartsWith(MaakuntaEtuliite, StringComparison.Ordinal);
        /// <summary>Minikartan suurennos (sama kuin entisessä maakuntakortissa).</summary>
        readonly MinikartanSuurennos minikartta;

        /// <summary>
        /// Jokainen näkyvä avaus (valon id; myös toinen avaus ja lisäkaupungin kortti), toisin kuin
        /// PeliOhjain.NostoLoytyi, joka tulee vain ensimmäisestä löydöstä. Mallinseppä 27.9.2026.
        /// </summary>
        public static event Action<string> Avattu;
        /// <summary>Löydös 132/150: noston kuva kokoruudulla (sumennuksen taso Kokoruutu).</summary>
        public bool KuvaKokoruudulla => suurennos != null && suurennos.Auki && suurennos.Kokoruutu;

        const float Napautuskynnys = 6f, NapautusMs = 700f;
        // Napautuksen alku (sulku napautuksesta, NapautusKorttiin).
        Vector2 eleAlku;
        float eleAika;

        /// <summary>Auki olevan kortin tiivistelmä testilokiin: laji · luokka · otsikko [· leikekirja].</summary>
        public string Kuvaus => nosto == null ? null
            : nosto.Laji + " · " + nosto.Luokka + " · " + nosto.Otsikko
              + (nosto.LeikekirjaValo != null ? " · leikekirja " + nosto.LeikekirjaValo : "")
              + (nosto.KohdeId != null ? " · kartalla " + nosto.KohdeId : "")
              + " · " + selain.Kuvaus;

        public Nostokortti(UiKerros ui)
        {
            kerros = Rakenne.El("mk-himmennys mk-nosto__kerros", ui.Juuri(UiKerros.Valikot));
            kerros.style.display = DisplayStyle.None;
            // Kohde poimitaan itse (Poimi): vanhentunut kohde kortin kohdalla ei sulje korttia himmennyksestä.
            kerros.RegisterCallback<PointerDownEvent>(e =>
            {
                if (e.target != kerros || Poimi(e.position, kerros) != kerros) return;
                // Pinnattu palkki himmennyksen alla: napautus palauttaa pinnatun heti (ei vain sulje tätä korttia).
                if (Pinnaus.OsuuPalkkiin(e.position)) { e.StopPropagation(); Sulje(); Pinnaus.Palauta(); return; }
                Sulje();
            });
            kortti = Rakenne.El("mk-nosto", kerros);
            // Osuma-ala kortin yläpuolelle (savuke 110): poimittava kaista, jonka painallus tulee kortille (EleAlkoi).
            kahvaAlue = Rakenne.El("mk-vetokahva mk-nosto__vetoalue", kortti);
            kahva = Rakenne.El("mk-nosto__kahva", kortti, PickingMode.Ignore);
            sisus = new ScrollView(ScrollViewMode.Vertical);
            sisus.AddToClassList("mk-nosto__sisus");
            sisus.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisus.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(sisus);
            // Luennan säätimet (omistaja 27.9. klo 09.3x, web #3388): ratas + kaiutin (tauko/jatko, VU).
            lukija = new KortinLukija(kortti, luokka: "mk-nosto__lukija mk-nosto__lukija--kiinni", saatimet: true, rajaus: () => kortti.worldBound,
                loppui: LuentaLoppui);
            selain = new Nostoselain(kortti, sisus, id => Avaa(id), AutoVaihtui);
            selain.LisaaAuto();
            selain.MuuLista = id => id.StartsWith(MaakuntaEtuliite, StringComparison.Ordinal) ? MaakuntaLista?.Invoke(id) : null;
            // PIN-KUVAKE (omistaja 5.10.2026 klo 23.3x): ylärivillä kaiuttimen kokoisena (mk-lukija 34 pt), pinnattuna korostettu.
            pinNappi = Rakenne.Nappi(null, "mk-lukija mk-nosto__pin", VaihdaPin, null, Ikonit.Viiva["pin"]);
            pinNappi.tooltip = "Pinnaa";
            // OSUMA ERILLEEN (junan 146 video 6.10.: kaksi napautusta pinnin keskelle avasi ≡-valikon): lukijan rivi (≡ ja kaiutin)
            // on kortin päällä omana kerroksenaan ja peitti pinnin. Pinnin näkyvä alue voittaa: kortin tasolla ennen lukijaa.
            kortti.RegisterCallback<PointerDownEvent>(e =>
            {
                if (pinNappi.panel == null || pinNappi.resolvedStyle.display == DisplayStyle.None) return;
                if (!pinNappi.worldBound.Contains((Vector2)e.position)) return;
                e.StopImmediatePropagation();
                VaihdaPin();
            }, TrickleDown.TrickleDown);
            Pinnaus.Muuttui += PaivitaPin;
            KortinLukija.TaustaLoppui += TaustaLoppui;
            lukija.Juuri.RegisterCallback<GeometryChangedEvent>(_ => SijoitaLukija());
            // Napit näkyvät heti (omistaja 28.9.2026, TF 1.0.34, Korintin kanava): kiinni kortissa, ei vierityksessä.
            sisus.verticalScroller.valueChanged += _ => SijoitaLukija();
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);
            // Kierto tai ikkunan koko: leveys uudelleen (web asemoi resize-kuuntelijassa), vaiheen 2 kortti keskelle.
            kerros.RegisterCallback<GeometryChangedEvent>(e =>
            {
                if (!Auki || Mathf.Approximately(e.oldRect.width, e.newRect.width)) return;
                VapautaPaikka();
                Mitoita();
            });
            kortti.RegisterCallback<GeometryChangedEvent>(_ => Pystypaikka());
            // Löydös 131: korjauksen vieritys, kun ScrollView on päivittänyt vieritysalueensa (sen omat kuuntelijat
            // rekisteröitiin rakentajassa ennen näitä, joten ne ajetaan ensin).
            sisus.contentContainer.RegisterCallback<GeometryChangedEvent>(_ => Vierita());
            sisus.contentViewport.RegisterCallback<GeometryChangedEvent>(_ => Vierita());
            kortti.RegisterCallback<PointerDownEvent>(EleAlkoi, TrickleDown.TrickleDown);
            // Vetokahva: liike ja irrotus mitataan kortilla ennen Kosketusvieritystä (se pysäyttää liikkeen etenemisen).
            kortti.RegisterCallback<PointerUpEvent>(KahvaIrti, TrickleDown.TrickleDown);
            kortti.RegisterCallback<ClickEvent>(NapautusKorttiin);
            // Löydös 137: UI Toolkitin ScrollView tökki kosketuksella (sama mittaus kuin lehdessä, löydös 51: heitto
            // liukui kolmanneksen Safarin matkasta); sama oma pystyvieritys kuin lehdellä. Kortin isä kuuntelee
            // TrickleDown-vaiheessa, joten vaakapyyhkäisy jää kuvasarjalle (KuvaSelaus) ja napautus napeille.
            Kosketusvieritys.Liita(kortti, () => kahvaVeto ? null : selain.Vierittava ?? sisus);
            Nappaimisto.Rekisteroi("nostokortti", 60, () => Auki, null, null, Sulje); // Esc sulkee (UI-pohjat: yksi sulkupino)

            visaKerros = Rakenne.El("mk-himmennys mk-nosto-visa__kerros", ui.Juuri(UiKerros.Valikot));
            visaKerros.style.display = DisplayStyle.None;
            visaKerros.RegisterCallback<PointerDownEvent>(e => { if (e.target == visaKerros) SuljeVisa(); });
            Nappaimisto.Rekisteroi("nostovisa", 62, () => visaAuki, null, null, SuljeVisa); // Esc sulkee ensin visan

            suurennos = new Kuvasuurennos(ui.Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true }; // löydökset 102 ja 150
            suurennos.AukiMuuttui += Pehmenna;
            minikartta = new MinikartanSuurennos(ui.Juuri(UiKerros.Valikot));
        }

        // Löydös 132 (omistaja, build 16): kuva kokoruudulle → tausta pehmenee tummennuksen lisäksi. Kartta on jo
        // kameran kuvasumennuksessa (UiNakymat.PaivitaKuvaSumea → PalloKierto.KuvaSumea, 2,25 pt, koska nostokortti on auki),
        // mutta kamerasumennus ei koske UI:ta (PalloSumennus). Kortti sumennetaan siksi UI Toolkitin suotimella kuten
        // aloitusportin kone ja viiva (Etusivulento: blur-suodin, Paneeli.asset tuo Gauss-shaderin käännökseen).
        const float PehmennysPt = 4f;
        const int PehmennysAukiMs = 220, PehmennysKiinniMs = 180; // suurennoksen häivytys (Kuvasuurennos Avaa/Sulje)
        float pehmennys;
        IVisualElementScheduledItem pehmennysAjo;

        void Pehmenna(bool paalle)
        {
            pehmennysAjo?.Pause();
            float alku = pehmennys, loppu = paalle ? PehmennysPt : 0f;
            float kesto = (paalle ? PehmennysAukiMs : PehmennysKiinniMs) / 1000f, t0 = Time.unscaledTime;
            Ruudunpaivitys.Herata(kesto + 0.05f); // lämpö: häivytys täydellä taajuudella
            pehmennysAjo = kortti.schedule.Execute(() =>
            {
                float k = Mathf.Clamp01((Time.unscaledTime - t0) / kesto);
                AsetaPehmennys(Mathf.Lerp(alku, loppu, k));
                if (k >= 1f) { pehmennysAjo?.Pause(); pehmennysAjo = null; }
            }).Every(0);
        }

        void AsetaPehmennys(float pt)
        {
            pehmennys = pt;
            // Ei StyleKeyword.Nonea: UI Toolkit 6.3 kaatuu siihen (Etusivulento, Natiiviseppä 25.9.). Null = ei suodinta.
            if (pt <= 0.01f) { kortti.style.filter = StyleKeyword.Null; return; }
            var f = new FilterFunction(FilterFunctionType.Blur);
            f.AddParameter(new FilterParameter(pt));
            kortti.style.filter = new List<FilterFunction> { f };
        }

        /// <summary>Avaa kortin karttavalon id:llä (UiPalvelut.ValoNapautettu, testikomento) keskelle (löydös 135).</summary>
        public void Avaa(string valoId) => Avaa(valoId, null);

        // Löydös 134 (Pelikoodari): avauksen vaiheet lokiin — data (ms, kehyksiä), ensimmäinen näkyvä kehys, valmis.
        float avausAlku;
        int avausKehys;

        void Avaa(string valoId, Action<bool> jalkeen)
        {
            avausAlku = Time.realtimeSinceStartup;
            avausKehys = Time.frameCount;
            int v = ++versio;
            // Löydös 134: välimuistissa oleva data avaa kortin samassa kehyksessä (ei kehystä per sisäkkäinen haku).
            Korutiini.Kaynnista(UiKerros.Hae(), AvaaReitti(valoId, v, jalkeen));
        }

        /// <summary>
        /// Web: lisäkaupungin kaupunkikortti ennen kohteen tietoruutua (fokuskohteet.js avaaFokuskohde),
        /// muuten nostokortti. jalkeen(true) = jokin kortti aukesi (testikomennot painavat sen nappeja).
        /// </summary>
        System.Collections.IEnumerator AvaaReitti(string valoId, int v, Action<bool> jalkeen)
        {
            // Verkko-odotus: kortti on piilossa, kunnes data on jäsennetty (löydös 104).
            if (valoId != null && valoId.StartsWith(MaakuntaEtuliite, StringComparison.Ordinal))
            {
                var m = MaakuntaNosto?.Invoke(valoId);
                if (m != null) { napit.Clear(); valo = valoId; Nayta(m); MittaaAvaus(valoId, v); }
                else Debug.Log("MATKAKIRJA ui nostot: ei maakuntaa " + valoId);
                jalkeen?.Invoke(m != null);
                yield break;
            }
            var odotus = VerkkoOdotus.Alku("nosto", valoId);
            Lisakaupunki lk = null;
            yield return NostoSisalto.HaeLisakaupunki(valoId, x => lk = x);
            if (v != versio) { VerkkoOdotus.Loppu(odotus, "ohitettu"); yield break; }
            if (lk != null)
            {
                VerkkoOdotus.Loppu(odotus, "lisakaupunki");
                napit.Clear();
                valo = valoId;
                NaytaLisakaupunki(lk);
                MittaaAvaus(valoId, v);
                KirjaaLoyto(valoId);
                jalkeen?.Invoke(true);
                yield break;
            }
            Nosto n = null;
            yield return NostoSisalto.Hae(valoId, x => n = x);
            VerkkoOdotus.Loppu(odotus, v != versio ? "ohitettu" : n == null ? "ei sisältöä" : null);
            if (v != versio) yield break;
            if (n == null) Debug.Log("MATKAKIRJA ui nostot: ei sisältöä valolle " + valoId);
            else if (Taustatila)
            {
                // Pinnattu nosto palkkina: sama nosto avaa koko kortin, toinen vaihtaa palkin ja luennan (kortti pysyy kiinni).
                if (Pinnaus.Nykyinen.Omistaja == PinOmistajaNostolle(n)) Pinnaus.Palauta();
                else { valo = valoId; NaytaTaustalla(n); KirjaaLoyto(valoId); }
            }
            else { valo = valoId; Nayta(n); MittaaAvaus(valoId, v); KirjaaLoyto(valoId); }
            jalkeen?.Invoke(n != null);
        }

        /// <summary>
        /// Testikomento: avaa kortin (valoId ≠ null) ja painaa napin nimeltä, tai painaa auki olevan
        /// kortin nappia. Tulos (lokiriville) takaisinkutsulla: null = ok.
        /// </summary>
        public void Testaa(string valoId, string nappi, Action<string> tulos)
        {
            void Paina()
            {
                if (string.IsNullOrEmpty(nappi)) { tulos?.Invoke(null); return; }
                // Vetokahva (NOSTOKORTTI-pohja): laajenna = veto ylös, pienenna = takaisin 45 %:iin, kahva-alas = veto alas (laajennettu → 45 %, muuten sulku).
                if (nappi == "laajenna" || nappi == "pienenna")
                {
                    if (nappi == "laajenna" && kortti.ClassListContains("mk-nosto--esittely")) Vaihe2();
                    laajennettu = nappi == "laajenna"; Pystypaikka(); tulos?.Invoke(null); return;
                }
                if (nappi == "kahva-alas") { if (laajennettu) { laajennettu = false; Pystypaikka(); } else Sulje(); tulos?.Invoke(null); return; }
                // Nostoselain ja AUTO (Nostoselain.Testaa).
                if (nappi.StartsWith("selain") || nappi == "auto" || nappi == "auto-pois" || nappi == "siirto" || nappi == "pysayta")
                { tulos?.Invoke(selain.Testaa(nappi)); return; }
                if (nappi != "lisaa" && kortti.ClassListContains("mk-nosto--esittely")) Vaihe2();
                // Kaiutin (luennan mittaus): kuin napautus, ei kortin oma nappi.
                if (nappi == "kaiutin") { lukija.Paina(); tulos?.Invoke(null); return; }
                if (nappi == "valikko") { lukija.AvaaValikko(); tulos?.Invoke(null); return; }
                if (nappi == "kartta-pois") { minikartta.Sulje(false); tulos?.Invoke(null); return; }
                if (napit.TryGetValue(nappi, out var a)) { a(); tulos?.Invoke(null); }
                else tulos?.Invoke("kortilla ei ole nappia " + nappi + " (on: " + string.Join(", ", napit.Keys) + ")");
            }
            if (valoId == null)
            {
                if (!Auki) { tulos?.Invoke("nostokortti ei ole auki"); return; }
                Paina();
                return;
            }
            // Vanha ankkurimuoto "@x,y" (E3) ei enää vaikuta: kortti aukeaa aina keskelle (löydös 135).
            if (nappi != null && nappi.StartsWith("@")) nappi = null;
            Avaa(valoId, loytyi =>
            {
                if (!loytyi) { tulos?.Invoke("ei sisältöä valolle " + valoId); return; }
                Paina();
            });
        }

        /// <summary>
        /// Elävä kartta (Pelikoodari, build 18): kortti on näkyvissä → löytö kirjataan ja tallennetaan
        /// (PeliOhjain.NostoAvattu; toinen avaus ei tee mitään). Maakunnan herätys ja laskurit tulevat tapahtumista.
        /// </summary>
        static void KirjaaLoyto(string valoId)
        {
            PeliOhjain.Instanssi?.NostoAvattu(valoId);
            try { Avattu?.Invoke(valoId); } catch (Exception e) { Debug.LogException(e); }
        }

        void MittaaAvaus(string valoId, int v)
        {
            float dataMs = (Time.realtimeSinceStartup - avausAlku) * 1000f;
            int dataKehyksia = Time.frameCount - avausKehys;
            float nakyvaMs = -1f;
            IVisualElementScheduledItem ajo = null;
            ajo = kerros.schedule.Execute(() =>
            {
                if (v != versio) { ajo.Pause(); return; }
                float o = kerros.resolvedStyle.opacity;
                float ms = (Time.realtimeSinceStartup - avausAlku) * 1000f;
                if (nakyvaMs < 0 && o > 0.01f) nakyvaMs = ms;
                if (o < 0.99f && ms < 3000f) return;
                ajo.Pause();
                Debug.Log($"MATKAKIRJA ui nostot: avaus {valoId}: data {dataMs:0} ms ({dataKehyksia} kehystä), näkyvä {nakyvaMs:0} ms, "
                        + $"valmis {ms:0} ms ({Time.frameCount - avausKehys} kehystä), kuvia {nosto?.Kuvat.Count ?? 0}");
            }).Every(0);
        }

        public void Sulje()
        {
            // Pinnattu kortti ei sulkeudu (vetoalas, Esc, ohinapautus): se pienenee palkiksi ja puhe jatkuu.
            if (PinNakyvissa && !pienennetaan) { Pinnaus.Pienenna(); return; }
            versio++;
            if (!Auki) return;
            Auki = false;
            laajennettu = false;
            kahvaVeto = false;
            lukija.Pysayta();
            selain.Sulje();
            minikartta.Sulje(true);
            SuljeVisa();
            Puhe.Instanssi?.PeruEsihaku(alunEsihaku);
            alunEsihaku = null;
            Rakenne.PiilotaHaivyttaen(kerros, 200);
            Ponnahdus.Sulje(kortti, () => { }); // kortti pienenee kerroksen häivytyksen mukana; kerros piilottaa
            suurennos.Sulje();
            SyoteLukko.Vapauta(this);
        }

        void Nayta(Nosto n)
        {
            nosto = n;
            kuvaIndeksi = 0;
            laajennettu = false;
            kortti.EnableInClassList("mk-nosto--looppi", n.Looppi);
            kortti.EnableInClassList("mk-nosto--kohde", n.Laji == NostoLaji.Kohde);
            VapautaPaikka();
            Mitoita();
            // Kohdekortti (omistaja 1.10.2026 kokeiluun, loki f344f1034): suoraan koko korttiin ilman kuva edellä -vaihetta.
            // AUTO: suoraan koko korttiin ja luentaan (kuva edellä -vaihe ohitetaan).
            // Pinnatun noston palautus suoraan koko korttiin: luenta kiinnittyy takaisin samaan kohtaan (KortinLukija.Aseta).
            bool pinnattu = Puhe.Instanssi?.Pinnattu != null && Puhe.Instanssi.Pinnattu == PinOmistajaNostolle(n);
            if (n.Kuvat.Count > 0 && n.Laji != NostoLaji.Kohde && !Nostoselain.Auto && !pinnattu) Vaihe1(); else Vaihe2();
            AvaaKerros();
            EsihaeLuennanAlku(n);
            selain.Paivita(valo);
            SiirraYlarivi();
            if (Nostoselain.Auto) AutoLue();
        }

        string alunEsihaku;

        /// <summary>
        /// Luennan 1. pala haetaan heti kortin avautuessa (omistaja 29.9.2026), samoista teksteistä kuin Vaihe2:n
        /// lukija.Aseta; kaiuttimen napautus soi sen välimuistista. Kortin sulku perii jonottavan haun (Sulje).
        /// </summary>
        void EsihaeLuennanAlku(Nosto n)
        {
            var puhe = Puhe.Hae();
            if (puhe == null) return;
            var (palat, tagit) = Lukijaaani.LuennanPalatJaTagit(LuennanTekstit(n));
            if (palat.Count == 0 || palat.Sum(p => p.Length) < KortinLukija.Vahimmais) return;
            alunEsihaku = puhe.EsihaeAlku(palat[0], "kertoja", tagit[0]);
        }

        static IEnumerable<string> LuennanTekstit(Nosto n) =>
            new[] { n.Otsikko, n.Ingressi }.Concat(Kappaleet(n.Teksti)).Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim());

        // --- koko ja paikka (löydökset 130, 131, 135) --------------------------------------------

        // Löydös 130 (omistaja, build 16): kuva aukeaa isompana ja kortti saa olla leveämpi (iPad ja iPhone). Kuvan
        // korkeuskatto on turva-alue − 150 pt (kuvateksti, LISÄÄ, kortin täyte ja reunavara; ennen web 0,94 × − 150) ja
        // vähintään 28 %; vakioleveys on 3:2-kuva tällä katolla. Kortti enintään turva-alue − 2 × 8 pt (ennen 2 × 12 ja
        // kapealla katto 760 pt: iPad pystyssä 744 → 818 pt). Leveällä (≥ 1100 pt) ei enää kattoa 1100 eikä palstoja.
        const float KuvaMarginaali = 12f, KuvaPystyvara = 150f, KuvaVahinOsuus = 0.28f, Sivuvara = 8f;

        /// <summary>Kortin reunus 1 + täyte 15,2 kummallakin puolella (web .fokuskohde-popup, mitattu 24.9. b11).</summary>
        const float KortinVara = 2f * (1f + 15.2f);

        /// <summary>Kuvan korkeuskatto pisteinä (Mitoita); kuvakehys saa kuvan oman muodon enintään tähän.</summary>
        float kuvaKatto;

        /// <summary>
        /// Löydös 135 (omistaja, build 16): kaikki kortit samaan kokoon ja tyyliin — kuvallinen, kuvaton, kohde, lisäkaupunki
        /// (esim. Lyon aukesi 544 pt:n ankkuroituna ja kuvaton kohde 384 pt:n) ja skandaali (vain tyyli eri, koko sama).
        /// Leveys ei riipu vaiheesta, joten kuva ei muuta kokoaan LISÄÄ-napautuksessa (löydös 131).
        /// </summary>
        const float LeveysKatto = 620f;

        void Mitoita()
        {
            var pohja = kerros.panel?.visualTree.layout ?? default;
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float rl = pohja.width - t.x - t.z, rk = pohja.height - t.y - t.w;
            if (float.IsNaN(rl) || float.IsNaN(rk) || rl <= 0 || rk <= 0)
            {
                kortti.style.width = StyleKeyword.Null;
                kortti.style.maxWidth = StyleKeyword.Null;
                return;
            }
            kuvaKatto = Mathf.Round(Mathf.Max(rk - KuvaPystyvara, rk * KuvaVahinOsuus));
            float leveys = LaskeLeveys(rl, rk);
            if (kortti.style.width.value.value != leveys) { kortti.style.width = leveys; kortti.style.maxWidth = leveys; }
        }

        /// <summary>
        /// Kortin leveys turva-alueen käytettävästä koosta (sama kaava kuin Mitoita): omistaja 28.9.2026, maakunnan
        /// kortti "saman kokoinen kuin muut nostot" (MaakuntaKortti.Mitoita) — yksi laskukaava kaikille korteille.
        /// </summary>
        public static float LaskeLeveys(float rl, float rk) =>
            // NOSTOKORTTI-pohja: KAPEA koko leveys reunoja lukuun ottamatta, muuten sivukortti (≤ Peitto.Max %).
            Pohja.Leveys(rl) == Pohja.Luokka.Kapea ? Mathf.Round(rl - 2f * Tyylikirja.Vali.M) : Pohja.Sivukortti(rl);

        // Web NOSTOKUVA_YLAVARA 88 (omistaja 12.9.): vaiheen 1 kortti ei jää keskitettynä tätä alemmas, jotta vaiheen 2
        // kortti alkaa yläpalkin kohdalta eikä kartalta.
        const float KuvaYlavara = 88f;

        /// <summary>
        /// Löydös 131: vaiheen 2 kortin yläreuna (kerroksen täyte), jolla kuva jää täsmälleen vaiheen 1 paikalleen
        /// (Korjaa). null = kortti keskellä (kuvaton kortti, lisäkaupunki, kierron jälkeen).
        /// </summary>
        float? kiinteaYla;
        /// <summary>Vaiheen 1 kuvan paikka ruudulla (Vaihe2 → Korjaa); voimassa KorjausMs tai ensimmäiseen kosketukseen.</summary>
        Rect? kuvaEnnen;
        const long KorjausMs = 600;
        /// <summary>Korjauksen vieritys, joka odottaa ScrollViewin vieritysalueen päivitystä (&lt; 0 = ei odota).</summary>
        float odottavaVieritys = -1f;

        /// <summary>
        /// Web nostokuvanYlin: vaiheen 1 kortti pystysuunnassa keskelle turva-aluetta, mutta enintään
        /// NOSTOKUVA_MARGINAALI + NOSTOKUVA_YLAVARA (100 pt) yläreunasta; vaiheessa 2 (löydös 131) Korjaan yläreuna.
        /// Muulloin kerros keskittää (.mk-himmennys). Kortin korkeus enintään turva-alueen alareunaan.
        /// </summary>
        void Pystypaikka()
        {
            if (!Auki) return;
            bool kapea = Pohja.NostokortinPaikka(kerros, kortti, laajennettu);
            kahva.style.display = kapea ? DisplayStyle.Flex : DisplayStyle.None;
            kahvaAlue.style.display = kahva.style.display;
        }

        /// <summary>Vetokahvan irrotus: ylös laajentaa (vaiheesta 1 koko korttiin), alas pienentää laajennetun ja sulkee muuten, napautus vaihtaa korkeutta.</summary>
        void KahvaIrti(PointerUpEvent e)
        {
            if (!kahvaVeto) return;
            kahvaVeto = false;
            if (kortti.HasPointerCapture(e.pointerId)) kortti.ReleasePointer(e.pointerId);
            float dy = e.position.y - kahvaAlku.y;
            // NOSTOKORTTI kohta 2 (omistaja 1.10. 11.17, web pohjat.js): laajennetusta alasveto palaa ensin 45 %:iin.
            if (dy > KahvaAlas && laajennettu) { laajennettu = false; Pystypaikka(); return; }
            if (dy > KahvaAlas) { Aanet.PulunTehoste("paper"); Sulje(); return; }
            bool laajenna = dy < -KahvaYlos || (Mathf.Abs(dy) < Napautuskynnys && !laajennettu);
            if (laajenna && kortti.ClassListContains("mk-nosto--esittely")) { Vaihe2(); return; } // Vaihe2 laajentaa
            laajennettu = laajenna;
            Pystypaikka();
        }

        /// <summary>
        /// Löydös 131 (omistaja, build 16; web nostokuvanKorjaus kapealla ruudulla): LISÄÄ tai kuvan napautus ei liikuta
        /// kuvaa. Vaiheen 2 ylärivi, otsikko ja ingressi tulevat kuvan yläpuolelle ja teksti alle: kortin yläreuna nousee
        /// niiden verran, ja minkä turva-alue estää, sen verran sisältöä vieritetään. Leveys on sama (Mitoita), joten
        /// kuva ei myöskään pienene (webin työpöydän palstataitto kutisti sen, natiivissa ei).
        /// </summary>
        void Korjaa(VisualElement kehys)
        {
            if (!kuvaEnnen.HasValue || kehys?.panel == null || !Auki) return;
            var nyt = kehys.worldBound;
            float sisalto = sisus.contentContainer.worldBound.y, nakyma = sisus.contentViewport.worldBound.y;
            if (nyt.width <= 0 || float.IsNaN(nyt.y) || float.IsNaN(sisalto) || float.IsNaN(nakyma)) return;
            // Kuvan paikka ruudulla = kerros + yläreuna + (näkymä − kortti) + (kuva − sisältö) − vieritys.
            float kohta = nyt.y - sisalto, kortistaNakymaan = nakyma - kortti.worldBound.y;
            float tavoite = kuvaEnnen.Value.y - kerros.worldBound.y - kortistaNakymaan - kohta; // = yläreuna − vieritys
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float p = Mathf.Round(Mathf.Max(t.y + KuvaMarginaali, tavoite));
            kiinteaYla = p;
            odottavaVieritys = KokoRivi(Mathf.Max(0f, p - tavoite));
            Pystypaikka();
            Vierita();
        }

        /// <summary>
        /// Omistaja 27.9. klo 09.3x (iPhone): vaiheen 2 ylin näkyvä tekstirivi ei saa jäädä puoliksi kortin yläreunan taakse.
        /// Jos vierityksen raja osuu tekstin keskelle, vieritystä vähennetään rivin alkuun (ei varaa: se paljasti edellisen rivin reunan), jolloin sisältö ja kuva
        /// alkavat hieman alempaa (enintään rivin verran; löydös 131:n kuvan paikka muuten ennallaan).
        /// </summary>
        float KokoRivi(float v)
        {
            if (v <= 0f) return v;
            foreach (var c in sisus.contentContainer.Children())
            {
                var r = c.layout;
                if (float.IsNaN(r.y) || r.yMax <= v) continue;
                if (r.y >= v || !(c is TextElement te)) return v;
                float fs = te.resolvedStyle.fontSize;
                if (fs <= 0f || float.IsNaN(fs)) return v;
                int rivit = Mathf.Max(1, Mathf.RoundToInt(r.height / (fs * 1.3f)));
                float riviK = r.height / rivit, leikattu = (v - r.y) % riviK;
                return leikattu < 0.5f ? v : Mathf.Max(0f, v - leikattu);
            }
            return v;
        }

        /// <summary>Korjauksen vieritys; ScrollView rajaa arvon vieritysalueeseen, joten yritys toistuu sen päivittyessä.</summary>
        void Vierita()
        {
            if (odottavaVieritys < 0f) return;
            if (Mathf.Abs(sisus.scrollOffset.y - odottavaVieritys) > 0.25f) sisus.scrollOffset = new Vector2(0f, odottavaVieritys);
            if (Mathf.Abs(sisus.scrollOffset.y - odottavaVieritys) <= 0.25f) odottavaVieritys = -1f;
        }

        /// <summary>Kortti keskelle ilman vaiheen 2 korjausta (uusi kortti, kierto).</summary>
        void VapautaPaikka()
        {
            kiinteaYla = null;
            kuvaEnnen = null;
            odottavaVieritys = -1f;
        }

        void EleAlkoi(PointerDownEvent e)
        {
            // Sormi kortilla: vieritys on pelaajan, eikä myöhempi asettelu (kuvasarjan selaus) enää siirrä korttia.
            odottavaVieritys = -1f;
            kuvaEnnen = null;
            var kr = kortti.worldBound;
            kahvaVeto = e.position.y - kr.y < KahvaVyohyke && e.position.y >= kr.y - Vetokahva.Yli && e.position.x >= kr.xMin && e.position.x <= kr.xMax;
            kahvaAlku = e.position;
            // Veto ylös vie sormen kortin ulkopuolelle: kaappaus, jotta irrotus tulee kortille (savuke 99: touch_path ylös ei
            // laajentanut, irrotus osui kerrokseen).
            if (kahvaVeto) kortti.CapturePointer(e.pointerId);
            eleAlku = e.position;
            eleAika = Time.unscaledTime * 1000f;
            selainSulki = !kahvaVeto && selain.OhiPainallus(e.position);
            var kohde = Poimi(e.position, e.target as VisualElement);
            // 1.0.40 (mitattu FB234D08): UI Toolkit antaa kosketukselle kohteeksi välimuistissa olevan "osoittimen alla" -elementin,
            // kun kosketus osuu samaan pisteeseen kuin edellinen. Kaiuttimen napautus sai kohteeksi kortin (edellinen kosketus
            // ennen asettelun muutosta), vaikka pisteessä on nappi: kortti sulkeutui eikä luenta alkanut (omistaja iPadilla:
            // kuvan napautus, kaiutin ja lukijan valikkonappi sulkivat kortin ~joka kolmas kerta). Nappi tai kuva, joka ei saanut
            // painallusta, painetaan napautuksen lopussa (NapautusKorttiin).
            ohitettu = null;
            if (kohde != e.target)
                for (var v = kohde; v != null && v != kortti; v = v.parent)
                    if (v is Button || v.ClassListContains("mk-nosto__kuvakehys"))
                    {
                        if (!(e.target is VisualElement t && (t == v || v.Contains(t)))) ohitettu = v;
                        break;
                    }
        }

        /// <summary>
        /// Elementti ruudun kohdassa nyt; ilman paneelia tapahtuman kohde. PickAll eikä Pick: Pick(point) lukee hiiren
        /// välimuistia (Panel.Pick → pointerId hiiri), joka iPad-simulaattorissa on sama vanhentunut kohde (Laitetestaaja
        /// 1.0.40: kaiutin sulki kortin iPadilla ~6/7); PickAll poimii aina tuoreesti.
        /// </summary>
        VisualElement Poimi(Vector2 paikka, VisualElement varalla) => kortti.panel?.PickAll(paikka, null) ?? varalla;

        /// <summary>Nappi tai kuvakehys, jonka kohdalla painallus alkoi mutta jonka tapahtuma meni vanhentuneelle kohteelle.</summary>
        VisualElement ohitettu;

        /// <summary>Napautus korttiin: vanhentuneelle kohteelle mennyt napin/kuvan painallus painetaan; teksti ja pohja eivät sulje.</summary>
        void NapautusKorttiin(ClickEvent e)
        {
            var ohi = ohitettu;
            ohitettu = null;
            if (((Vector2)e.position - eleAlku).magnitude >= Napautuskynnys || Time.unscaledTime * 1000f - eleAika > NapautusMs) return;
            var kohde = Poimi(e.position, e.target as VisualElement);
            if (selainSulki || selain.Sisaltaa(kohde)) { selainSulki = false; return; }
            if (ohi != null && ohi.panel != null && (kohde == ohi || ohi.Contains(kohde)))
            {
                Debug.Log($"MATKAKIRJA ui nostokortti: vanhentunut kohde {(e.target as VisualElement)?.GetType().Name}, painetaan {string.Join(".", ohi.GetClasses())}");
                if (ohi is Button) using (var s = NavigationSubmitEvent.GetPooled()) { s.target = ohi; ohi.SendEvent(s); }
                else using (var c = ClickEvent.GetPooled()) { c.target = ohi; ohi.SendEvent(c); }
                return;
            }
            // Omistaja 6.10.2026 ("jos nostossa painaa nostotekstin päältä, koko nosto häviää näkyvistä. korjaa tämä asap"):
            // tekstin tai pohjan napautus ei enää sulje (kumoaa löydöksen 133). Sulku: ohinapautus, kahvan veto alas ja Esc.
        }

        void AvaaKerros()
        {
            if (Auki) return;
            Auki = true;
            Pystypaikka();
            // Löydös 134 (omistaja, build 16): nosto näkyviin heti samassa kehyksessä, ei 220 ms:n sisäänhäivytystä
            // (Pelikoodarin mittaus: näkyvä 267 ms, josta häivytys 220 ms). Sulku häivyttää kuten ennen.
            Rakenne.NaytaHeti(kerros);
            // Omistaja 29.9.2026 (Päätoimittaja, Raamattu PR #3602): nosto pysyy välittömänä mutta saa avausanimaation, joka
            // alkaa samalla ruudunpäivityksellä kuin napautus (Ponnahdus: alkutila heti, 220 ms kasvu ja häivytys).
            Ponnahdus.Avaa(kortti);
            SyoteLukko.Esta(this);
            PaivitaPin();
        }

        // --- lisäkaupunki (web latoLisakaupunginKortti) -------------------------------------

        void NaytaLisakaupunki(Lisakaupunki lk)
        {
            nosto = new Nosto { Laji = NostoLaji.Kohde, Id = lk.Id, Iso = lk.Iso, Otsikko = lk.Nimi };
            if (lk.Hero != null) nosto.Kuvat.Add(lk.Hero);
            kuvaIndeksi = 0;
            kortti.RemoveFromClassList("mk-nosto--looppi");
            kortti.RemoveFromClassList("mk-nosto--kohde");
            kortti.RemoveFromClassList("mk-nosto--esittely");
            VapautaPaikka();
            Mitoita();
            sisus.Clear();
            sisus.scrollOffset = Vector2.zero;
            lukija.Aseta(null);
            lukijaPaikka = null;
            ylarivi = null;

            Kirjasimet.Aseta(Rakenne.Teksti(lk.Nimi ?? "", "mk-nosto__otsikko", sisus), Kirjasin.LukuLihava);
            // 1. Kuva tai sen paikkamerkki (seepiaruutu ja nimi, ei hakua ulkoa).
            var lohko = Rakenne.El("mk-nosto__kuvasarja", sisus, PickingMode.Ignore);
            if (lk.Hero != null)
            {
                // Puuttuva kuva vie myös kuvatekstin ja lähteen (web #3847: figure poistuu kokonaan).
                Kuvakehys(lohko, lk.Hero, () => Suurenna(0), suhde: HeroSuhde, puuttui: () => lohko.style.display = DisplayStyle.None);
                if (!string.IsNullOrEmpty(lk.Hero.Lyhyt))
                    Kirjasimet.Aseta(Rakenne.Teksti(lk.Hero.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.Luku);
                if (!string.IsNullOrEmpty(lk.Hero.LahdeRivi)) Rakenne.Teksti(lk.Hero.LahdeRivi, "mk-kansikuva__lahde", lohko);
            }
            else
            {
                var paikka = Rakenne.El("mk-nosto__kuvakehys", lohko, PickingMode.Ignore);
                paikka.style.justifyContent = Justify.Center;
                paikka.style.alignItems = Align.Center;
                paikka.RegisterCallback<GeometryChangedEvent>(e => { if (e.newRect.width > 0) paikka.style.height = Mathf.Round(e.newRect.width * 2f / 3f); });
                Kirjasimet.Aseta(Rakenne.Teksti(lk.Nimi ?? "", "mk-nosto__kuvateksti", paikka), Kirjasin.LukuKursiivi);
            }
            // 2. Esittely vain, jos se on kirjoitettu.
            foreach (var k in Kappaleet(lk.Esittely)) Rakenne.Teksti(Riviva(k), "mk-nosto__teksti", sisus);
            // 3. Yksi kaupunkiin ankkuroitu nosto nostokortin otsikolla ja tekstillä.
            if (lk.NostoOtsikko != null)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(lk.NostoOtsikko, "mk-nosto__otsikko", sisus), Kirjasin.KoneLihava);
                foreach (var k in Kappaleet(lk.NostoTeksti)) Rakenne.Teksti(Riviva(k), "mk-nosto__teksti", sisus);
            }
            AvaaKerros();
            selain.Paivita(valo);
            SiirraYlarivi();
        }

        // --- vaihe 1: kuva edellä ------------------------------------------------------------

        // Web nostokortin teksti (mitattu 24.9.): Iowan 15,52 px, #211d18, riviväli 24,52 = 1,58 em.
        const string RiviValiAlku = "<line-height=1.58em>";
        static string Riviva(string teksti) => RiviValiAlku + "<noparse>" + teksti + "</noparse>";

        void Vaihe1()
        {
            PoistaToimintorivi();
            sisus.Clear();
            napit.Clear();
            napit["lisaa"] = Vaihe2;
            sisus.scrollOffset = Vector2.zero;
            lukija.Aseta(null);
            lukijaPaikka = null;
            ylarivi = null;
            kortti.AddToClassList("mk-nosto--esittely");
            var k = nosto.Kuvat[0];
            var kuva = Kuvakehys(sisus, k, Vaihe2, suhde: HeroSuhde);
            // Maakunta (omistaja 6.10. 13.0x): otsikko ja koko ensimmäinen kappale nostotekstin koossa kuvan alla, sitten LISÄÄ.
            if (nosto.Laji == NostoLaji.Maakunta)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(nosto.Otsikko ?? "", "mk-nosto__otsikko", sisus), Kirjasin.LukuLihava);
                var eka = Kappaleet(nosto.Teksti).FirstOrDefault();
                if (!string.IsNullOrEmpty(eka)) Rakenne.Teksti(Riviva(eka), "mk-nosto__teksti", sisus);
            }
            var alarivi = Rakenne.El("mk-nosto__esittelyrivi", sisus, PickingMode.Ignore);
            // Web .nostokuva-selite keskitettynä ja .nostokuva-lisaa sen alla keskellä (mitattu 24.9. b11); lähde vain suurennoksessa.
            // Web nostokuvaAloita: kuvatekstiLyhyt(kuva), eläintäyn vakioselite vasta karusellissa (pariteetti b12-2 #27).
            if (nosto.Laji != NostoLaji.Maakunta) Kuvateksti(alarivi, k.LyhytVara ? "" : k.Lyhyt ?? nosto.Otsikko ?? "", k);
            var lisaa = Rakenne.Nappi("LISÄÄ", "mk-nosto__lisaa", Vaihe2, alarivi);
            Kirjasimet.Aseta(lisaa, Kirjasin.Kone);
        }

        // --- vaihe 2: koko kortti ----------------------------------------------------------

        void Vaihe2()
        {
            // Löydös 131: vaiheen 1 kuvan paikka ruudulla; vaiheen 2 kuva asettuu täsmälleen siihen (Korjaa).
            bool esittelysta = kortti.ClassListContains("mk-nosto--esittely");
            // NOSTOKORTTI-pohja: LISÄÄ (tai veto ylös) laajentaa; kortti kasvaa alareunasta, joten löydös 131:n kuvan
            // paikallaan pito (Korjaa) ei enää koske (omistaja 1.10.2026 hyväksyi pohjan).
            if (esittelysta) laajennettu = true;
            Rect? ennen = null;
            VapautaPaikka();
            if (ennen.HasValue && ennen.Value.width > 0 && !float.IsNaN(ennen.Value.y))
            {
                kuvaEnnen = ennen;
                // Kortti pysyy vaiheen 1 yläreunassa, kunnes Korjaa on mitannut uuden asettelun (ei keskitystä välissä).
                kiinteaYla = kerros.resolvedStyle.paddingTop;
            }
            PoistaToimintorivi();
            sisus.Clear();
            napit.Clear();
            sisus.scrollOffset = Vector2.zero;
            kortti.RemoveFromClassList("mk-nosto--esittely");
            var n = nosto;
            // Web: lööppi kuuluu luentaan; otsikko lajin mukaan (skandaalit.js, historian-hetket.js,
            // elaintaky.js, fokuskohteet.js, fokusnosto.js, syvennys.js lisaaLukijanappi).
            lukija.Aseta(LuennanTekstit(n),
                n.Laji == NostoLaji.Skandaali ? "Kuuntele lisälehti"
                : n.Laji == NostoLaji.Kohde ? "Kuuntele: " + (n.Otsikko ?? "")
                : n.Laji == NostoLaji.Elain ? "Kuuntele eläinkortti"
                : n.Laji == NostoLaji.Takynosto ? "Kuuntele kortti"
                : n.Laji == NostoLaji.Syvennys ? "Kuuntele tarina"
                : n.Laji == NostoLaji.Maakunta ? "Kuuntele: " + (n.Otsikko ?? "")
                : "Kuuntele hetki", PinOmistajaNostolle(n));

            // Löydös 133: kaiutin ylärivin oikeaan päähän (oikean yläkulman ✕ ja sen viereinen kaiutin poistuivat).
            // NAPIT NÄKYVÄT HETI (omistaja 28.9.2026, TF 1.0.34: "käyttäjän pitää vierittää lappua hieman alaspäin, jotta
            // se kaiutin tulee näkyviin"): vaiheen 2 kuvan kohdistus (löydös 131) vierittää ylärivin kortin yläreunan taakse.
            // Ylärivillä on vain paikkavaraus; kaiutin ja valikkonappi ovat kortissa sen kohdalla eivätkä vieri pois.
            ylarivi = Ylarivi(sisus, n);
            lukijaPaikka = Rakenne.El("mk-nosto__lukijapaikka", ylarivi, PickingMode.Ignore);
            lukijaPaikka.RegisterCallback<GeometryChangedEvent>(_ => SijoitaLukija());
            if (lukija.Juuri.parent != kortti) kortti.Add(lukija.Juuri);
            lukija.Juuri.BringToFront();
            SiirraYlarivi();
            if (n.Looppi)
            {
                var nimio = Rakenne.Teksti("LISÄLEHTI", "mk-nosto__nimio", sisus);
                Kirjasimet.Aseta(nimio, Kirjasin.Kone);
                if (n.Meta != null)
                {
                    var p = Rakenne.El("mk-nosto__paivays", sisus, PickingMode.Ignore);
                    var pt = Rakenne.Teksti(n.Meta.ToUpperInvariant(), "mk-nosto__paivaysteksti", p);
                    Kirjasimet.Aseta(pt, Kirjasin.Kone);
                }
            }
            var otsikko = Rakenne.Teksti(n.Otsikko ?? "", n.Laji == NostoLaji.Kohde ? "mk-nosto__otsikko mk-nosto__otsikko--kohde" : "mk-nosto__otsikko", sisus);
            // Web .fokuskohde-otsikko: American Typewriter 700, 16,32 px, #211d18 (mitattu 24.9. b11).
            Kirjasimet.Aseta(otsikko, n.Laji == NostoLaji.Kohde ? Kirjasin.KoneBold : Kirjasin.LukuLihava);
            if (n.Laji == NostoLaji.Hetki && n.Meta != null)
                Kirjasimet.Aseta(Rakenne.Teksti(n.Meta, "mk-nosto__meta", sisus), Kirjasin.Kone);
            if (!string.IsNullOrEmpty(n.Ingressi))
                foreach (var k in Kappaleet(n.Ingressi)) Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-nosto__ingressi", sisus), Kirjasin.LukuLihava);

            // Web piirraNostonMedia: äänet otsikon alle, ennen kuvaa.
            if (n.Laji == NostoLaji.Takynosto) Media(sisus, n);
            if (n.Kuvat.Count > 0) Kuvasarja(sisus);
            // Ihmekuvan suurennos (ui ihme): ihmekuva on sarjan ensimmäinen, nauhallinen kuva.
            if (n.Kuvat.Count > 0 && n.Kuvat[0].Nauha != null) napit["ihme"] = () => Suurenna(0);

            var jaljella = n.Laji == NostoLaji.Kohde ? n.Korostukset.Select(PuraKorostus).Where(x => x.HasValue).Select(x => x.Value).ToList()
                : new List<(string Perus, string Nakyva)>();
            string nimi = n.Otsikko;
            void Linkit(Label l)
            {
                if (!l.text.Contains("<link=")) return;
                l.pickingMode = PickingMode.Position;
                l.RegisterCallback<UnityEngine.UIElements.Experimental.PointerUpLinkTagEvent>(e =>
                {
                    if (string.IsNullOrEmpty(e.linkID)) return;
                    // Löydös 136: nosto jää taustalle, chat aukeaa sen päälle (UiNakymat.ChatinKerros).
                    lukija.Pysayta();
                    UiNakymat.Hae()?.Chat.Kysy($"Kerro lisää: {e.linkID} (kohteessa {nimi})", aihe: PuluChat.NostonAihe(n));
                });
            }
            var kappaleet = Kappaleet(n.Teksti).Select(k => Korosta(k, jaljella)).ToList();
            // Web lehtipalstaKotelo: pitkä teksti kahdelle palstalle, kun sen oma leveys ≥ 600 (iPadin kuvakortti).
            // Säilyneen ihmekohteen nykykuva kelluu tekstin (ensimmäisen palstan) oikealla (web piirraKohdeTeksti).
            bool pitka = Lehtipalstat.OnPitka(n.Teksti, kappaleet.Count);
            if (n.Kylkikartta != null)
                Lehtipalstat.Luo(sisus, kappaleet, RiviValiAlku, "mk-nosto__teksti", Kirjasin.Luku, Linkit, Kylkikartta(n.Kylkikartta), palstoita: false,
                    kylkiOsuus: MinikartanSuurennos.KylkiOsuus, kylkiKatto: MinikartanSuurennos.KylkiKatto);
            else if (n.Nykykuva != null)
                Lehtipalstat.Luo(sisus, kappaleet, RiviValiAlku, "mk-nosto__teksti", Kirjasin.Luku, Linkit, Nykykuva(n.Nykykuva), pitka);
            else if (pitka)
                Lehtipalstat.Luo(sisus, kappaleet, RiviValiAlku, "mk-nosto__teksti", Kirjasin.Luku, Linkit);
            else
                foreach (var k in kappaleet) Linkit(Rakenne.Teksti(RiviValiAlku + k, "mk-nosto__teksti", sisus));

            // Täkynosto: valokuva ja karttaliite jutun jälkeen, ennen kysymystä (web piirraNostonSisus).
            if (n.Valokuva != null) Valokuva(sisus, n.Valokuva);
            if (n.Karttaliite != null) Karttaliite(sisus, n.Karttaliite);
            // Kohdekortin visa on oma KORTTI-ikkunansa (Visa-nappi, web avaaKohdePohjalla); muilla lajeilla kortin tekstissä.
            if (n.Visa != null && n.Laji != NostoLaji.Kohde) Visa(sisus, n);
            if (n.Laji == NostoLaji.Elain) Elainpalkkio(sisus, n);
            if (n.Laji == NostoLaji.Takynosto)
            {
                if (n.KohdeId != null) Kohdenappi(sisus, n);
                KysyPululta(sisus, n);
            }
            if (n.Laji == NostoLaji.Maakunta) MaakunnanToiminnot(n);
            if (n.Laji == NostoLaji.Kohde)
            {
                // Kysymykset ja kierros siirtyivät alareunan toimintoriville (Kysy · Visa · Kierros · Lehti).
                Toimintorivi(n);
                // Livian leikekirja on toimintorivin Lehti-nappi (web avaaKohdePohjalla, omistaja 2.10.2026: kohdekortti pysyvä).
                // Reaktiot kortin loppuun: tunniste on kohteen oma id (web kohdeReaktioTunniste).
                Reaktiot.Piirra(sisus, Reaktiot.KohdeAvain(n.Id), n.Otsikko);
            }
            if (kuvaEnnen.HasValue)
            {
                // Kuvasarjan lohko muuttaa paikkaansa sisällössä, kun sen yläpuolinen teksti asettuu; kehys itse ei.
                var lohko = sisus.contentContainer.Q(className: "mk-nosto__kuvasarja");
                lohko?.RegisterCallback<GeometryChangedEvent>(_ => Korjaa(lohko.Q(className: "mk-nosto__kuvakehys")));
                // Korjaus koskee vain avautumisen asettelua: myöhempi muutos (toinen kuva sarjassa) ei siirrä korttia.
                int v = versio;
                kerros.schedule.Execute(() => { if (v == versio) kuvaEnnen = null; }).StartingIn(KorjausMs);
            }
        }

        /// <summary>
        /// Web nostosymKortinYlarivi / piirraKohdeYlarivi: aihesymboli ja luokka. Symboli 1,5 em (16,3 pt) rivin
        /// alussa, oikealla 0,4 em (4,35 pt), kaiverruskuva sisällä 14,1 pt (mitattu 24.9. b12, Millaun silta).
        /// Generoitu kuva UI/Resources/Symbolit/sym-*.png (web assets/kartat/symbolit/sym-*.webp); hetki ja ihme ovat
        /// webissä koodipiirtäjiä, joten niille ei ole kuvaa (rivi ilman symbolia).
        /// </summary>
        VisualElement lukijaPaikka;

        /// <summary>
        /// Lukijan napit ylärivin paikkavarauksen kohdalle kortissa: vierittämättömässä asemassa (vieritys lisätään takaisin),
        /// joten ne pysyvät kortin yläkulmassa, vaikka sisältö vierii. Vierityksen aikana alla paperipohja (teksti alta).
        /// </summary>
        /// <summary>
        /// Omistaja 2.10.2026 klo 17.5x: noston kategoria (HISTORIA) ja lukijan napit selaimen ylärivillä, kun selain näkyy
        /// (yksi rivi ‹ NOSTOT ▾ › HISTORIA … ≡ kaiutin AUTO); muuten ne jäävät kortin sisältöön kuten ennen.
        /// </summary>
        void SiirraYlarivi()
        {
            // Edellisen kortin ylärivi pois sivuilta.
            foreach (var paikka in new[] { selain.Vasen, selain.Oikea })
                for (int i = paikka.childCount - 1; i >= 0; i--)
                    if (paikka[i] != ylarivi && paikka[i] != lukijaPaikka && paikka[i] != pinNappi && paikka[i] != selain.AutoNappi) paikka.RemoveAt(i);
            if (ylarivi == null || lukijaPaikka == null || !selain.Nakyvissa) { if (ylarivi != null) ylarivi.Add(pinNappi); return; }
            selain.Oikea.Insert(selain.AutoNappi != null && selain.AutoNappi.parent == selain.Oikea ? selain.Oikea.IndexOf(selain.AutoNappi) + 1 : 0, pinNappi); // AUTO, pin, ≡, kaiutin
            // Juna 155 (omistaja 6.10. 22.x: "kategorian voisi siirtää omalle rivilleen otsikon läheisyyteen sen yläpuolelle ja
            // nämä napit vähän ylemmäs"): kategoria (symboli ja nimi) jää kortin sisältöön otsikon yläpuolelle omaksi rivikseen.
            ylarivi.AddToClassList("mk-nosto__ylarivi--kategoria");
            selain.Oikea.Add(lukijaPaikka);  // ≡ ja kaiutin oikeaan reunaan
        }

        /// <summary>Nykyisen kortin ylärivi (kategoria); selaimen näkyessä se asuu selaimen rivillä.</summary>
        VisualElement ylarivi;

        void SijoitaLukija()
        {
            var j = lukija.Juuri;
            if (lukijaPaikka?.panel == null || j.parent != kortti) return;
            // Kortin omissa koordinaateissa, ei worldBoundista: Ponnahdus.Avaa skaalaa korttia avautuessa, ja selaimen
            // rivillä paikka ei enää liiku animaation jälkeen, joten skaalattu mittaus jäi voimaan (≡ AUTO:n päällä, 7e218ee5).
            var r = lukijaPaikka.ChangeCoordinatesTo(kortti, Vector2.zero);
            if (float.IsNaN(r.x) || float.IsNaN(r.y) || lukijaPaikka.layout.width <= 0) return;
            // Selaimen ylärivillä (SiirraYlarivi) paikka ei vieri sisällön mukana.
            float s = sisus.Contains(lukijaPaikka) ? sisus.scrollOffset.y : 0f;
            float x = Mathf.Round(r.x - kortti.resolvedStyle.borderLeftWidth);
            float y = Mathf.Round(r.y - kortti.resolvedStyle.borderTopWidth + s);
            // AUTO levittää lukijan riviä: paikkavaraus ylärivillä saman levyiseksi (USS 65,4 = ≡ + kaiutin).
            float w = j.resolvedStyle.width;
            if (w > 0f && !float.IsNaN(w) && Mathf.Abs(lukijaPaikka.resolvedStyle.width - w) > 0.5f) lukijaPaikka.style.width = w;
            // Oikea sivu ei kapene ≡:n ja kaiuttimen alle (flex-perusta 0): muuten napit valuivat AUTO:n päälle (f19af4a6).
            if (w > 0f && !float.IsNaN(w) && lukijaPaikka.parent == selain?.Oikea && Mathf.Abs(selain.Oikea.resolvedStyle.minWidth.value - w) > 0.5f)
                selain.Oikea.style.minWidth = w;
            if (j.resolvedStyle.left != x) j.style.left = x;
            if (j.resolvedStyle.top != y) j.style.top = y;
            j.EnableInClassList("mk-nosto__lukija--irti", s > 1f);
        }

        /// <summary>
        /// Kohdekortin Visa-nappi: KORTTI-pohjan ikkuna (kapiteeli VISA, otsikkona kohteen nimi) ja sen sisällä sama lukijan
        /// kysymys kuin ennen kortin tekstissä (Visa). Sulku: ohinapautus ja Esc; nostokortti jää taakse.
        /// </summary>
        void AvaaVisa(Nosto n)
        {
            lukija.Pysayta();
            visaKerros.Clear();
            var k = new Kortti("mk-nosto-visa", pohja: true);
            visaKerros.Add(k);
            Kirjasimet.Aseta(Rakenne.Teksti("VISA", "mk-kortti__kapiteeli", k.Sisus), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(n.Otsikko ?? "", "mk-kortti__otsikko", k.Sisus), Kirjasin.LukuLihava);
            Visa(k.Sisus, n);
            visaAuki = true;
            visaKerros.BringToFront();
            Rakenne.NaytaHeti(visaKerros);
            Ponnahdus.Avaa(k);
        }

        void SuljeVisa()
        {
            if (!visaAuki) return;
            visaAuki = false;
            Rakenne.PiilotaHaivyttaen(visaKerros, 200);
        }

        /// <summary>Luenta loppui omia aikojaan: AUTO siirtyy seuraavaan nostoon 3 s:n laskurilla (Nostoselain).</summary>
        void LuentaLoppui()
        {
            if (Auki && Nostoselain.Auto) selain.AloitaSiirto();
        }

        /// <summary>AUTO kytkettiin: auki oleva kortti koko korttiin ja luentaan; pois kytkettäessä luenta jatkuu.</summary>
        void AutoVaihtui()
        {
            if (!Auki || !Nostoselain.Auto || nosto == null) return;
            if (kortti.ClassListContains("mk-nosto--esittely")) Vaihe2();
            AutoLue();
        }

        /// <summary>AUTO: luenta alkaa, kun vaiheen 2 asettelu on valmis (kaiuttimen painallus; jo luettaessa ei mitään).</summary>
        void AutoLue()
        {
            int v = versio;
            kortti.schedule.Execute(() => { if (v == versio && Auki && Nostoselain.Auto && !lukija.Lukee) lukija.Paina(); }).StartingIn(300);
        }

        static VisualElement Ylarivi(VisualElement isa, Nosto n)
        {
            var rivi = Rakenne.El("mk-nosto__ylarivi mk-nosto__ylarivi--rivi", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(rivi, Kirjasin.Kone);
            var kuva = n.Symboli == null ? null : Resources.Load<Texture2D>("Symbolit/sym-" + n.Symboli);
            if (kuva != null)
            {
                var symboli = Rakenne.El("mk-nosto__ylarivi-symboli", rivi, PickingMode.Ignore);
                symboli.style.backgroundImage = new StyleBackground(kuva);
            }
            Rakenne.Teksti(n.Luokka ?? "", "mk-nosto__ylarivi-teksti", rivi);
            return rivi;
        }

        // --- lajien lohkot ------------------------------------------------------------------

        /// <summary>
        /// Web piirraNostonKysymykset / piirraKohdeKysymykset: napautus kysyy pululta. Löydös 136 (omistaja, build 16):
        /// kortti jää taustalle auki ja chat aukeaa sen päälle (UiNakymat.ChatinKerros); kortin luenta pysähtyy.
        /// </summary>
        // --- NOSTOKORTTI-pohjan toimintorivi (kohdekortti, omistaja 1.10.2026 kokeiluun) ---------------------

        VisualElement toimintorivi;

        void PoistaToimintorivi()
        {
            toimintorivi?.RemoveFromHierarchy();
            toimintorivi = null;
            kortti.RemoveFromClassList("mk-nosto--toiminnot");
        }

        /// <summary>
        /// Kiinteä alarivi (ei vierity): Kysy (Pulun chat kortin aiheella ja valmiilla kysymyksillä), Visa (lukijan kysymys
        /// näkyviin, kortti laajenee), Kierros (ensimmäinen kierros), Lehti (kaupungin tai maan lehti; ensisijainen).
        /// Puuttuva kohde jättää napin pois.
        /// </summary>
        void Toimintorivi(Nosto n)
        {
            toimintorivi = Rakenne.El("mk-nosto__toiminnot", kortti, PickingMode.Ignore);
            kortti.AddToClassList("mk-nosto--toiminnot");
            void Nappi(string nimi, string teksti, Action a, bool ensisijainen = false)
            {
                var b = Rakenne.Nappi(teksti, "mk-nosto__toiminto" + (ensisijainen ? " mk-nappi--kulta" : ""), a, toimintorivi);
                Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
                napit[nimi] = a;
            }
            // Napit kuten web avaaKohdePohjalla (#3788, omistaja 2.10.2026 pysyväksi): Kysy vain kysymyksillä, Visa, Kierros,
            // Lehti = kohteen oma täkynosto (Livian leikekirja), ei kaupungin/maan lehteä. Esim. Ateena: vain Kysy.
            if (n.Kysymykset.Count > 0)
                Nappi("kysy", "Kysy", () => { lukija.Pysayta(); UiNakymat.Hae()?.Chat.AvaaKortista(PuluChat.NostonAihe(n), n.Kysymykset); });
            if (n.Visa != null)
                Nappi("visa", "Visa", () => AvaaVisa(n));
            if (n.Kierrokset.Count > 0) { string u = n.Kierrokset[0].Item2; Nappi("kierros", "Kierros", () => Application.OpenURL(u)); }
            if (n.LeikekirjaValo != null)
            {
                string valo = n.LeikekirjaValo;
                Nappi("lehti", "Lehti", () => Avaa(valo), true);
                napit["leikekirja"] = napit["lehti"]; // testikomento ui leikekirja
            }
            if (toimintorivi.childCount == 0) PoistaToimintorivi();
        }

        /// <summary>Maakunnan toimintorivi (entinen maakuntakortti): Kysy avaa Pulun chatin valmiine vastauksineen (ei mallikutsua).</summary>
        void MaakunnanToiminnot(Nosto n)
        {
            if (n.ValmiitKysymykset.Count == 0) return;
            toimintorivi = Rakenne.El("mk-nosto__toiminnot", kortti, PickingMode.Ignore);
            kortti.AddToClassList("mk-nosto--toiminnot");
            Action kysy = () => { lukija.Pysayta(); UiNakymat.Hae()?.Chat.AvaaValmiilla(n.PuluAihe, n.ValmiitKysymykset); };
            var b = Rakenne.Nappi("Kysy", "mk-nosto__toiminto", kysy, toimintorivi);
            Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
            napit["kysy"] = kysy;
        }

        /// <summary>Maakunnan minikartta tekstin kyljessä (Lehtipalstat-kylkikuva); napautus suurentaa sen ruudun keskelle.</summary>
        VisualElement Kylkikartta(Texture2D kartta)
        {
            var kylki = Rakenne.El("mk-maakuntaKortti__kartta", null);
            kylki.style.backgroundImage = new StyleBackground(kartta);
            float suhde = kartta.height / (float)kartta.width;
            kylki.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float h = Mathf.Round(e.newRect.width * suhde);
                if (e.newRect.width > 0 && Mathf.Abs(kylki.resolvedStyle.height - h) > 0.5f) kylki.style.height = h;
            });
            kylki.tooltip = "Suurenna kartta";
            Action avaa = () => minikartta.Avaa(kylki, kartta);
            kylki.RegisterCallback<ClickEvent>(e => { e.StopPropagation(); avaa(); });
            napit["kartta"] = avaa;
            return kylki;
        }

        void KysyPululta(VisualElement isa, Nosto n)
        {
            if (n.Kysymykset.Count == 0) return;
            var q = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-nosto__kysyotsikko", isa);
            q.enableRichText = true;
            Kirjasimet.Aseta(q, Kirjasin.KoneLihava);
            for (int i = 0; i < n.Kysymykset.Count; i++)
            {
                string kk = n.Kysymykset[i];
                // Kortin aihe kysymyksen mukana (omistajan löydös 30.9.2026: pulu ei tiennyt, mistä akveduktista on kyse).
                Action kysy = () => { lukija.Pysayta(); UiNakymat.Hae()?.Chat.Kysy(kk, aihe: PuluChat.NostonAihe(n)); };
                var b = Rakenne.Nappi(kk, "mk-nosto__kysymys", kysy, isa);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                napit["kysy" + i] = kysy;
            }
        }

        /// <summary>
        /// Web piirraNostonMedia (ui.lisaaNostonNapit): ääninäyte ja vapaa musiikkinäyte soivat pelissä,
        /// Apple Music -linkit aukeavat selaimeen. Rivi vain, jos jokin kenttä on.
        /// </summary>
        void Media(VisualElement isa, Nosto n)
        {
            if (n.Aani == null && n.MusiikkiNayte == null && n.Musiikkilinkit.Count == 0) return;
            var rivi = Rakenne.El("mk-nosto__media", isa, PickingMode.Ignore);
            void Nappi(string teksti, string otsake, Action a)
            {
                var b = Rakenne.Nappi(teksti, "mk-nosto__medianappi", a, rivi);
                if (otsake != null) b.tooltip = otsake;
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (n.Aani != null) { string u = n.Aani; Nappi("▷ Kuuntele näyte", null, () => Puhe.Hae()?.Soita(u, pyynnosta: true)); }
            foreach (var (nimi, url) in n.Musiikkilinkit) { string u = url; Nappi(nimi + " ›", null, () => Application.OpenURL(u)); }
            if (n.MusiikkiNayte != null)
            {
                string u = n.MusiikkiNayte;
                Nappi("▷ Kuuntele musiikkia", n.MusiikkiNayteNimi ?? "Vapaasti lisensoitu ääninäyte", () => Puhe.Hae()?.Soita(u, pyynnosta: true));
            }
        }

        /// <summary>Web piirraNostonValokuva: "näin se löytyi" pienempänä tekstin alla, napautus suurentaa.</summary>
        void Valokuva(VisualElement isa, NostoKuva k)
        {
            var lohko = Rakenne.El("mk-nosto__valokuva", isa, PickingMode.Ignore);
            Kuvakehys(lohko, k, () => SuurennaYksi(k));
            if (!string.IsNullOrEmpty(k.Lyhyt)) Kirjasimet.Aseta(Rakenne.Teksti(k.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.Luku);
            napit["valokuva"] = () => SuurennaYksi(k);
        }

        /// <summary>
        /// Web piirraNostonKarttaliite: "Isoisän matkakirjan liite" omana arkkinaan jutun jälkeen; kartta
        /// luetaan vasta suurena, joten napautus avaa suurennoksen. Lataamaton kuva vie koko liitteen.
        /// </summary>
        void Karttaliite(VisualElement isa, NostoKuva k)
        {
            var liite = Rakenne.El("mk-nosto__liite", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("ISOISÄN MATKAKIRJAN LIITE", "mk-nosto__liiteotsake", liite), Kirjasin.Luku);
            Action avaa = () => SuurennaYksi(k);
            var nappi = Rakenne.Nappi(null, "mk-nosto__liitenappi", avaa, liite);
            nappi.tooltip = "Avaa kartta suurena";
            var kuva = Rakenne.El("mk-nosto__liitekuva", nappi, PickingMode.Ignore);
            // Taitteen viivat (web .fokusnosto-liitekehys::after): arkki on ollut taitettuna kirjan välissä.
            Rakenne.El("mk-nosto__liitetaite mk-nosto__liitetaite--pysty", nappi, PickingMode.Ignore);
            Rakenne.El("mk-nosto__liitetaite mk-nosto__liitetaite--vaaka", nappi, PickingMode.Ignore);
            int v = versio;
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (v != versio) return;
                if (t == null) { liite.RemoveFromHierarchy(); napit.Remove("liite"); return; }
                kuva.style.backgroundImage = new StyleBackground(t);
            });
            var teksti = string.Join(" · ", new[] { k.Lyhyt, k.LahdeRivi }.Where(x => !string.IsNullOrEmpty(x)));
            if (teksti.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-nosto__kuvateksti", liite), Kirjasin.LukuKursiivi);
            napit["liite"] = avaa;
        }

        /// <summary>
        /// Web nostonKarttakohde + kohdenappi: kortti kiinni ja kohteen oma kortti auki (web avaaFokuskohde).
        /// </summary>
        void Kohdenappi(VisualElement isa, Nosto n)
        {
            Action katso = () => KatsoKartalla(n);
            var b = Rakenne.Nappi("→ Katso " + n.KohdeNimi + " kartalla", "mk-nosto__kohdenappi", katso, isa);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            napit["kartalla"] = katso;
        }

        void KatsoKartalla(Nosto n)
        {
            // Web: suljeNostonKortti + avaaFokuskohde — kamera ei liiku, kohteen kortti aukeaa heti.
            string valo = "kohde:" + n.KohdeId + (n.KohdeIso != null ? "@" + n.KohdeIso : "");
            Sulje();
            Avaa(valo);
        }
        /// <summary>
        /// Web kohteenNykykuva + .fokuskohde-teksti > .fokuskohde-nykykuva (omistaja 27.9.2026, Olympia-kortti):
        /// yhä olemassa olevan ihmekohteen valokuva pienenä tekstin kyljessä, kuvateksti alla, napautus suurentaa.
        /// Leveyden ja paikan asettaa Lehtipalstat (min(42 %, 180 pt), float right).
        /// </summary>
        VisualElement Nykykuva(NostoKuva k)
        {
            var lohko = Rakenne.El("mk-nosto__nykykuva", null, PickingMode.Ignore);
            Action avaa = () => SuurennaYksi(k);
            var kehys = Kuvakehys(lohko, k, avaa, kiintea: NykykuvaKorkeus);
            kehys.AddToClassList("mk-nosto__kuvakehys--nyky");
            if (!string.IsNullOrEmpty(k.Lyhyt))
                Kirjasimet.Aseta(Rakenne.Teksti("<line-height=1.4em><noparse>" + k.Lyhyt + "</noparse>", "mk-nosto__nykyteksti", lohko), Kirjasin.Luku);
            napit["nykykuva"] = avaa;
            return lohko;
        }

        /// <summary>Web .fokuskohde-kuva img height 10rem (object-fit cover) + napin 1 px:n reunus ylhäällä ja alhaalla.</summary>
        const float NykykuvaKorkeus = 162f;

        /// <summary>
        /// Matkakirjan ihmeen kulmanauha (web piirraIhmenauha, PUNA-sävy): vino kaista kuvan vasemmassa
        /// yläkulmassa. Isäntä on kuvaelementti (scale-to-fit); nauha siirtyy kuvan todelliseen kulmaan.
        /// </summary>
        public static VisualElement Ihmenauha(VisualElement kuva, string teksti)
        {
            var nauha = Rakenne.El("mk-ihmenauha", kuva, PickingMode.Ignore);
            var kaista = Rakenne.Teksti((teksti ?? "").ToUpperInvariant(), "mk-ihmenauha__kaista", nauha);
            Kirjasimet.Aseta(kaista, Kirjasin.LukuLihava);
            return nauha;
        }

        /// <summary>Nauha kuvan todelliseen vasempaan yläkulmaan (tausta sovitetaan laatikkoon).</summary>
        public static void SovitaNauha(VisualElement kuva, VisualElement nauha, Texture2D t)
        {
            if (nauha == null || t == null) return;
            var r = kuva.contentRect;
            if (r.width <= 0 || r.height <= 0 || t.width <= 0 || t.height <= 0) return;
            float s = Mathf.Min(r.width / t.width, r.height / t.height);
            nauha.style.left = Mathf.Round((r.width - t.width * s) / 2f);
            nauha.style.top = Mathf.Round((r.height - t.height * s) / 2f);
        }

        /// <summary>Tyhjä rivi erottaa kappaleet; muuten ≥ 3 virkkeen teksti puolitetaan (web jaaKappaleiksi).</summary>
        static (string Perus, string Nakyva)? PuraKorostus(string merkinta)
        {
            string t = (merkinta ?? "").Trim();
            if (t.Length == 0) return null;
            int p = t.IndexOf('|');
            if (p < 0) return (t, t);
            string perus = t.Substring(0, p).Trim(), nakyva = t.Substring(p + 1).Trim();
            return perus.Length == 0 || nakyva.Length == 0 ? ((string, string)?)null : (perus, nakyva);
        }

        /// <summary>Kappaleen korostukset linkeiksi; käytetty korostus poistuu jäljellä olevista (kerran per kortti).</summary>
        static string Korosta(string kappale, List<(string Perus, string Nakyva)> jaljella)
        {
            string Suojaa(string x) => x.Replace("<", "<noparse><</noparse>");
            if (jaljella.Count == 0) return Suojaa(kappale);
            var sb = new System.Text.StringBuilder();
            string loppu = kappale;
            while (true)
            {
                int paras = -1; (string Perus, string Nakyva) osuma = default;
                foreach (var k in jaljella)
                {
                    int i = loppu.IndexOf(k.Nakyva, StringComparison.OrdinalIgnoreCase);
                    if (i >= 0 && (paras < 0 || i < paras)) { paras = i; osuma = k; }
                }
                if (paras < 0) break;
                sb.Append(Suojaa(loppu.Substring(0, paras)));
                sb.Append("<link=\"").Append(osuma.Perus.Replace("\"", "")).Append("\"><color=#7a5514><u>")
                  .Append(Suojaa(loppu.Substring(paras, osuma.Nakyva.Length))).Append("</u></color></link>");
                loppu = loppu.Substring(paras + osuma.Nakyva.Length);
                jaljella.Remove(osuma);
            }
            sb.Append(Suojaa(loppu));
            return sb.ToString();
        }

        /// <summary>Web jaaKappaleiksi (Kappalejako): tyhjät rivit, muuten ≥ 3 virkettä puolitettuna.</summary>
        static List<string> Kappaleet(string teksti) => Kappalejako.Jaa(teksti);

        // --- kuvat ------------------------------------------------------------------------

        /// <summary>
        /// Kuvakehys koko leveydellä. Löydös 130: korkeus kuvan omasta muodosta (web nostokuvanSovitus), enintään
        /// kuvaKatto; ennen latausta 3:2 (web oletussuhde). Pysty- ja neliökuva eivät enää kutistu 3:2-kehykseen
        /// (iPhonella pystykuva 225 pt korkea → enintään turva-alue − 150 pt). Katetun kuvan sivuille jää kortin paperi.
        /// </summary>
        /// <param name="puuttui">Kuvaa ei saatu (404 tai ei lähdettä): kehys on jo piilotettu; kutsuja piilottaa kuvatekstinsä
        /// (web #3847 pohjaKuva: virhe poistaa kuvapaikan, omistaja 2.10. klo 13.53 Bobovacin harmaa laatikko).</param>
        VisualElement Kuvakehys(VisualElement isa, NostoKuva k, Action napautus, Action<Texture2D> ladattuna = null, float kiintea = 0f, float suhde = 0f,
            Action puuttui = null)
        {
            var kehys = Rakenne.El("mk-nosto__kuvakehys", isa);
            var kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => napautus?.Invoke());
            kehys.userData = suhde > 0f ? suhde : 2f / 3f;
            // HERO (NOSTOKORTTI-pohja): kiinteä suhde (korkeus/leveys 0,5 = 2:1), kuva rajautuu (scale-and-crop).
            if (suhde > 0f) kuva.AddToClassList("mk-nosto__kuva--hero");
            // Kiinteä korkeus (nykykuva): kuva täyttää kehyksen ja rajautuu (web object-fit: cover).
            if (kiintea > 0f) kehys.style.height = kiintea;
            void Korkeus(float w)
            {
                if (kiintea > 0f || float.IsNaN(w) || w <= 0) return;
                float h = w * (kehys.userData is float s ? s : 2f / 3f);
                if (kuvaKatto > 0f) h = Mathf.Min(h, kuvaKatto);
                h = Mathf.Round(h);
                if (kehys.style.height.value.value != h) kehys.style.height = h;
            }
            kehys.RegisterCallback<GeometryChangedEvent>(e => Korkeus(e.newRect.width));
            var nauha = k.Nauha != null ? Ihmenauha(kuva, k.Nauha) : null;
            if (nauha != null) nauha.style.display = DisplayStyle.None; // näkyviin, kun kuvan kulma tiedetään
            Texture2D ladattu = null;
            if (nauha != null) kuva.RegisterCallback<GeometryChangedEvent>(_ => SovitaNauha(kuva, nauha, ladattu));
            int v = versio;
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (v != versio) return;
                if (t == null) { kehys.style.display = DisplayStyle.None; puuttui?.Invoke(); return; }
                ladattu = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                if (t.width > 0 && t.height > 0)
                {
                    if (suhde <= 0f) kehys.userData = t.height / (float)t.width;
                    kehys.AddToClassList("mk-nosto__kuvakehys--ladattu");
                    Korkeus(kehys.layout.width);
                }
                ladattuna?.Invoke(t);
                if (nauha == null) return;
                nauha.style.display = DisplayStyle.Flex;
                SovitaNauha(kuva, nauha, t);
            });
            return kehys;
        }

        void Kuvasarja(VisualElement isa)
        {
            var kuvat = nosto.Kuvat;
            var lohko = Rakenne.El("mk-nosto__kuvasarja", isa, PickingMode.Ignore);
            var kehysPaikka = Rakenne.El("mk-nosto__kuvapaikka", lohko, PickingMode.Ignore);
            var teksti = Kuvateksti(lohko, "", null); // web .nostokuva-selite: Iowan pysty, keskitetty
            // TEKIJÄRIVI SUUREN KORTIN KUVAN ALLE (Päätoimittaja 6.10. 16.25, löydös 150: ei kokoruudussa, Commons-tekijärivi
            // korttiin; CC BY-SA vaatii nimeämisen): kaikille nostoille ja maakunnille, sama pohja kuin lisäkaupungin herokuvassa.
            var lahde = Rakenne.Teksti("", "mk-kansikuva__lahde", lohko);
            Label laskuri = null;
            void Nayta(int i)
            {
                kuvaIndeksi = (i + kuvat.Count) % kuvat.Count;
                kehysPaikka.Clear();
                var k = kuvat[kuvaIndeksi];
                int kohta = kuvaIndeksi;
                // Ainoa kuva puuttuu → koko kuvasarja tekstiä myöten pois (web #3847; Bobovac). Usean kuvan sarjassa vain kehys.
                var kehys = Kuvakehys(kehysPaikka, k, () => Suurenna(kohta), suhde: HeroSuhde,
                    puuttui: kuvat.Count == 1 ? () => lohko.style.display = DisplayStyle.None : (Action)null);
                AsetaKuvateksti(teksti, k.Lyhyt, k);
                lahde.text = k.LahdeRivi ?? "";
                lahde.style.display = string.IsNullOrEmpty(k.LahdeRivi) ? DisplayStyle.None : DisplayStyle.Flex;
                if (kuvat.Count > 1)
                {
                    laskuri = Rakenne.Teksti($"{kuvaIndeksi + 1} / {kuvat.Count}", "mk-nosto__laskuri", kehys);
                    Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
                }
            }
            // Löydös 34: reunanapautus ja pyyhkäisy selaavat (ei nuolia), keskiosa suurentaa.
            new KuvaSelaus(kehysPaikka, () => kuvat.Count, s => Nayta(kuvaIndeksi + s), () => kehysPaikka.childCount > 0 ? kehysPaikka[0] : kehysPaikka);
            Nayta(kuvaIndeksi);
            napit["suurenna"] = () => Suurenna(kuvaIndeksi); // testi: kuvasuurennos tekijärivin kanssa
        }

        // --- "Havainnekuva"-merkintä (web js/havainnekuva.js lisaaHavainnekuvaMerkki, css/fokusnosto.css
        // .kuvateksti-havainne; Fable 24.9. klo 20.3x: tarkoitettu merkki kaikissa korteissa) ----------------

        static readonly System.Text.RegularExpressions.Regex HavainneLahde =
            new System.Text.RegularExpressions.Regex(@"^\s*Tekoälyllä tuotettu havainnekuva\."),
            HavainneRivi = new System.Text.RegularExpressions.Regex("Matkakirjan (?:havainnekuva|kuvitus)");

        /// <summary>Web onHavainnekuva: lähderivi alkaa "Tekoälyllä tuotettu havainnekuva." tai mainitsee Matkakirjan havainnekuvan.</summary>
        static bool OnHavainnekuva(NostoKuva k)
        {
            string l = k?.LahdeRivi ?? "";
            return HavainneLahde.IsMatch(l) || HavainneRivi.IsMatch(l);
        }

        /// <summary>Lyhyt kuvateksti (web .nostokuva-selite) kotelona, johon havainnekuvan merkki mahtuu rivin jatkoksi.</summary>
        static VisualElement Kuvateksti(VisualElement isa, string teksti, NostoKuva k)
        {
            var kotelo = Rakenne.El("mk-nosto__kuvateksti mk-nosto__kuvateksti--kotelo", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(kotelo, Kirjasin.Luku);
            AsetaKuvateksti(kotelo, teksti, k);
            return kotelo;
        }

        /// <summary>
        /// Web lisaaHavainnekuvaMerkki: &lt;small&gt; inline-block kuvatekstin perässä. UITK ei kellota laatikkoa
        /// tekstirivin sisään, joten havainnekuvan teksti ladotaan sanoittain rivittyvään keskitettyyn riviin
        /// (sanaväli Iowan 13,44 px = 3,73 px, mitattu), ja merkki on sen viimeinen alkio. Muu kuvateksti yhtenä tekstinä.
        /// </summary>
        static void AsetaKuvateksti(VisualElement kotelo, string teksti, NostoKuva k)
        {
            kotelo.Clear();
            bool merkki = OnHavainnekuva(k);
            kotelo.style.display = string.IsNullOrEmpty(teksti) && !merkki ? DisplayStyle.None : DisplayStyle.Flex;
            if (!merkki)
            {
                if (!string.IsNullOrEmpty(teksti)) Rakenne.Teksti(teksti, "mk-nosto__kuvarivi", kotelo);
                return;
            }
            var sanat = (teksti ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < sanat.Length; i++)
                Rakenne.Teksti(sanat[i], i < sanat.Length - 1 ? "mk-nosto__kuvasana mk-nosto__kuvasana--vali" : "mk-nosto__kuvasana", kotelo);
            var m = Rakenne.Teksti("Havainnekuva".ToUpperInvariant(), "mk-nosto__havainne", kotelo);
            m.tooltip = "Havainnekuva";   // Raamattu KUVAT: sana havainnekuva (PT 9.10.)
            Kirjasimet.Aseta(m, Kirjasin.Kone);
        }

        void Suurenna(int alku) => suurennos.Avaa(nosto.Kuvat.Select(Lehtikuva).ToList(), alku);

        void SuurennaYksi(NostoKuva k) => suurennos.Avaa(new List<LehtiKuva> { Lehtikuva(k) });

        static LehtiKuva Lehtikuva(NostoKuva k) => new LehtiKuva
        {
            Lahde = k.Lahde, Lyhyt = k.Lyhyt, Selite = k.Selite ?? k.Lyhyt, Nauha = k.Nauha,
            Reaktio = k.Reaktio, ReaktioOtsikko = k.ReaktioOtsikko,
            LahdeRivi = string.Join(" · ", new[] { k.Tekija, k.LahdeRivi }.Where(x => !string.IsNullOrEmpty(x))),
        };

        // --- minivisa ja palkkiot -----------------------------------------------------------

        void Visa(VisualElement isa, Nosto n)
        {
            // Lukijan kysymys (kohde, täkynosto: web piirraNostonVisa) otsakkeineen ja vihjeineen;
            // skandaali, hetki ja syvennys (web piirraSyvennysVisa) kertovat palkkion.
            bool lukijan = n.Laji == NostoLaji.Kohde || n.Laji == NostoLaji.Takynosto;
            var laatikko = Rakenne.El("mk-nosto__visa", isa, PickingMode.Ignore);
            if (lukijan) Kirjasimet.Aseta(Rakenne.Teksti(n.Visa.Otsake ?? "LUKIJAN KYSYMYS", "mk-nosto__visaotsikko", laatikko), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(n.Visa.Kysymys, "mk-nosto__visakysymys", laatikko), Kirjasin.LukuLihava);
            var o = PeliOhjain.Instanssi;
            bool vastattu = o?.Kaupat != null && o.Kaupat.MinitehtavaVastattu(n.VisaKaupunki, n.VisaAihe);
            if (vastattu)
            {
                Rakenne.Teksti(n.Visa.Fakta ?? "Tähän on jo vastattu.", "mk-nosto__visavihje", laatikko);
                return;
            }
            var vihje = Rakenne.Teksti(lukijan ? n.Visa.Vihje ?? $"Vastaus löytyy tästä jutusta · +£{n.VisaPalkkio}"
                : $"Oikeasta vastauksesta saat £{n.VisaPalkkio}.", "mk-nosto__visavihje", laatikko);
            var napitVisa = new List<Button>();
            var tulos = Rakenne.Teksti("", "mk-nosto__visatulos", laatikko);
            tulos.style.display = DisplayStyle.None;
            var juliste = n.VisaJuliste != null ? Juliste(n.VisaJuliste) : null;
            for (int i = 0; i < n.Visa.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                Button b = null;
                Action vastaa = () =>
                {
                    if (!b.enabledSelf) return;
                    bool oikein = valinta == n.Visa.Oikea;
                    bool julisteUusi = false;
                    var peli = PeliOhjain.Instanssi;
                    // Yksi teko: vastaus, nostotehtävälaskuri (web kirjaaNostotehtava) ja juliste
                    // (web myonnaJuliste) samaan tallennukseen.
                    var t = peli?.KauppaTeko(k =>
                    {
                        var r = k.Minitehtava(n.VisaKaupunki, n.VisaAihe, oikein, n.VisaPalkkio);
                        if (r.Ok && oikein)
                        {
                            if (n.VisaNostotehtava) k.KirjaaNostotehtava();
                            if (juliste != null && !k.JulisteLaukussa(n.VisaJuliste)) julisteUusi = k.MyonnaJuliste(n.VisaJuliste).Uusi;
                        }
                        return r;
                    }, oikein ? n.VisaRahaSyy : null);
                    // Testiavaus ilman peliä: juliste näytetään kuin se olisi myönnetty.
                    if (peli == null) julisteUusi = oikein && juliste != null;
                    foreach (var x in napitVisa) x.SetEnabled(false);
                    napitVisa[n.Visa.Oikea].AddToClassList("mk-oikein");
                    if (!oikein) b.AddToClassList("mk-vaarin");
                    // Web: vihjerivi oli lupaus vastaamattomalle; tulos korvaa sen.
                    if (lukijan) vihje.style.display = DisplayStyle.None;
                    tulos.text = t != null && !t.Ok && t.Virhe != null && t.Virhe != "Jo vastattu" ? t.Virhe
                        : oikein ? $"Oikein! +£{n.VisaPalkkio}." : $"Oikea vastaus: {n.Visa.Vaihtoehdot[n.Visa.Oikea]}.";
                    if (!string.IsNullOrEmpty(n.Visa.Fakta)) tulos.text += " " + n.Visa.Fakta;
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.style.display = DisplayStyle.Flex;
                    if (julisteUusi)
                    {
                        // Web syvennys: juliste laukkuun heti, katselu napista (naytaJuliste).
                        Action nayta = () => NaytaJuliste(juliste);
                        var lunasta = Rakenne.Nappi("Lunasta juliste", "mk-nosto__lunastus", nayta, laatikko);
                        Kirjasimet.Aseta(lunasta, Kirjasin.LukuLihava);
                        napit["juliste"] = nayta;
                    }
                };
                b = Rakenne.Nappi(n.Visa.Vaihtoehdot[i], "mk-nosto__visanappi", vastaa, laatikko);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                napitVisa.Add(b);
                napit["vastaa" + i] = vastaa;
            }
        }

        /// <summary>Kaupungin juliste (web kaupunginJuliste = JULISTEET[kaupunki]).</summary>
        static JulisteTiedot Juliste(string kaupunki) =>
            UiSisalto.Julisteet.FirstOrDefault(j => j.Id == kaupunki) ?? UiSisalto.Julisteet.FirstOrDefault(j => j.Id == null && j.Kaupunki == kaupunki);

        void NaytaJuliste(JulisteTiedot j) =>
            suurennos.Avaa(new List<LehtiKuva>
            {
                new LehtiKuva
                {
                    Lahde = j.Url, Otsikko = j.Otsikko, Lyhyt = j.Lyhyt, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko,
                    LahdeRivi = "Matkakirjan oma paino",
                },
            });

        void Elainpalkkio(VisualElement isa, Nosto n)
        {
            // Web: palkkio maksetaan, kun sisältö ladotaan (kuvallisella kortilla LISÄÄ-napista).
            var o = PeliOhjain.Instanssi;
            string teksti;
            if (o == null) teksti = "Eläin on kirjattu.";
            else
            {
                var t = o.KauppaTeko(k => k.Elaintaky(n.Iso, KauppaVakiot.ElaintakyPalkkio));
                teksti = t == null || !t.Ok ? "Eläin on kirjattu."
                    : t.Uusi ? $"Löytöpalkkio +£{t.Palkkio} lisätty kukkaroon." : "Tämä eläin on jo löydetty.";
                if (t != null && t.Ok && !t.Uusi) teksti = "Tämä eläin on jo löydetty.";
            }
            var l = Rakenne.Teksti(teksti, "mk-nosto__palkkio", isa);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
        }
    }
}
