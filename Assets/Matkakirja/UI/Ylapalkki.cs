// YLÄPALKKI JA TILARIVI (Natiivi-UI, erä 1): verkkopelin .topbar natiivina.
//
//   [logo]   ( laukku  300 £ · päivä 1 · aamu )   [ratas] [≡]
//
// Tausta linear-gradient(#3a2a1c → #251b12), alareunassa hiusviiva --line,
// ulottuu turva-alueen yläpuolelle (lovi, Dynamic Island). Keskellä
// "turn-pill" (webin renderTurnPill): laukun kuvake, raha ja kello; kun kellon
// teksti vaihtuu, se välähtää kultaisena (aika-valahdys 1,4 s). Sijainti ei ole
// pillerissä (kuten webissä): kaupungin nimi näkyy pallon nimikortissa.
// Rivi palauttaa koko tekstin testikomentoja varten.
//
// Viesti: verkkopelin .event-toast — kelluva kortti kartan yläkolmanneksessa
// (top 16 %), tumma liukuväri ja kultareuna, liukuu sisään alhaalta.
//
// VAAKA-ASENTO (web js/ylapalkki-vaaka.js, omistaja 13.9.2026): matalalla vaakaruudulla
// (korkeus ≤ 520 pt) ja kosketuslaitteella vaakasuunnassa (leveys ≤ 1366 pt, siis myös iPad)
// palkki liukuu ylös piiloon ja oikeaan yläkulmaan tulee karttaselitteen kokoinen väkäsnappi.
// Napautus avaa palkin muun sisällön päälle; napautus palkin ja sen pudotusvalikoiden
// ulkopuolelle sulkee sen. Ylhäältä asemoituvat näkymät lukevat varauksen Ylapalkki.Varaus-
// arvosta (0 piilotettuna), joten kartta ja kortit nousevat palkin paikalle.
//
// iPHONE (omistaja 24.9.2026, build 5 -löydökset 5–6, Raamattu NATIIVIN iPHONE-ASETTELU; iPad ja web ennallaan):
// ei ruskeaa palkkia eikä logoa, kartta näkyy koko ruudulta (myös Dynamic Islandin alta). Vasemmassa
// yläkulmassa kelluva pilleri "300£ 1/80" (raha, päivä/80), oikeassa vain ☰ (kehittäjätilassa myös ratas),
// puoliläpinäkyvällä pergamenttitaustalla kuten muut kelluvat napit.
// SAARIRIVI (omistaja 24.9.2026 tarkennus): pystyasennossa pilleri ja napit ovat Dynamic Islandin riville sen
// kummallakin puolella (pilleri vasemmalla, napit oikealla, pilleri ei ulotu saaren alle); lovellisella laitteella
// loven riville, ilman lovea tilarivin korkeudelle (tilarivi on piilotettu). Saari luetaan Screen.cutoutsista,
// muuten arvioidaan turva-alueen yläreunasta (≥ 55 pt Dynamic Island 126 × 37 pt ylhäällä 11 pt, ≥ 40 pt lovi).
// LÖYDÖS 20 (omistaja 24.9. klo 11.2x): oikealla vain karttanappi (Karttaselite, Vieras) ja ☰; ratas ei ole
// yläreunassa (kehittäjän säätimet ovat ☰-valikon Kehittäjä-rivillä). Pillerin alle asettuu matkakirjan lappu
// samanlevyisenä kaupunkipillerinä (Matkakirjakortti lukee PilleriMuuttui-tapahtuman).
//
// PALKKI TAKAISIN iPHONELLE (omistaja 24.9.2026 klo 16.1x, Raamattu NATIIVIN YLÄPALKKI iPHONELLA JA iPADILLA):
// kelluva yläosa ja saaririvi poistuivat käytöstä (Kelluva = false). iPhone saa webin ruskean palkin samalla sisällöllä
// kuin web (logo, pilleri "£300  Päivä 1, aamu", ☰; ⚙ ei näy, Fable 24.9.) webin mitoin: iPhone 57 pt (täyte 4,8/7,2, logo 92 × 22,
// pilleri 12,48 px, napit 40 × 40), iPad 61 pt (täyte 7,2/12,8, logo 130 × 32, pilleri 14,4 px, napit 44 × 36).
// iPhonella palkki liukuu piiloon, kun pelaaja vetää karttaa, ja palaa kartan tai kaupungin napautuksesta; piilossa
// oikeassa yläkulmassa on vain ☰, joka tuo palkin takaisin. Vaaka-asennossa palkki on piilossa oletuksena (sama ☰).
// iPadilla palkki ei piiloudu. Puhelin = iPhone: ☰ on siellä omistajan linssivalikko (klo 13.3x, hyväksytty poikkeama)
// eikä laukussa ole linssejä (klo 11.2x); Pulun tekstipiilo ja Liiku-napin keveys lukevat samaa lippua.
//
// Toteuttaa Pelikoodarin ITilarivi-rajapinnan (Scripts/Peli/NakymaSopimukset.cs).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Ylapalkki : ITilarivi
    {
        /// <summary>Webin .topbar-korkeus: puhelimella 57, muuten 61 (mitattu 393 × 852 ja 834 × 1194).</summary>
        /// <summary>
        /// Palkin korkeus turva-alueen alla. iPad 61 → 65 (löydös 78, omistaja 25.9. klo 09.4x: "hieman korkeampi";
        /// hyväksytty poikkeama webin 60 pt:stä, Fable). iPhonen matala palkki: MatalaLisa.
        /// </summary>
        public static float Korkeus => Puhelin ? 57f : 65f;
        /// <summary>Webin .topbar-täyte (pysty, vaaka).</summary>
        /// <summary>Palkin täyte (pysty, sivut). Löydös 88 (omistaja build 13): logo ja ☰ sisemmäs kuin webissä (12,8 → 22 pt).</summary>
        static Vector2 Tayte => Puhelin ? new Vector2(4.8f, 14f) : new Vector2(7.2f, 22f);

        /// <summary>Testikomento (ui ylapalkki vaaka|pysty|auto): null = ruudun mukaan.</summary>
        public static bool? Pakota;

        /// <summary>
        /// Palkki piilossa väkäsnapin takana (web: @media (orientation: landscape) and (max-height: 520px),
        /// (orientation: landscape) and (pointer: coarse) and (max-width: 1366px)). Pisteet = pikselit / iOS:n skaala.
        /// </summary>
        public static bool Piilossa
        {
            get
            {
                if (Pakota.HasValue) return Pakota.Value;
                if (Screen.width <= Screen.height) return false;
                float skaala = Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 163f)) : 1f;
                float w = Screen.width / skaala, h = Screen.height / skaala;
                return h <= 520f || (Touchscreen.current != null && w <= 1366f);
            }
        }

        /// <summary>Testikomento (ui ylapalkki kelluva|palkki): null = laitteen mukaan.</summary>
        public static bool? PakotaKelluva;

        /// <summary>iPhone (iOS ilman tablettia); testikomento ui ylapalkki kelluva|palkki pakottaa.</summary>
        public static bool Puhelin => PakotaKelluva ?? (Application.platform == RuntimePlatform.IPhonePlayer && !UiKerros.Tabletti);

        /// <summary>Kelluva yläosa poistui käytöstä (omistaja 24.9. klo 16.1x): iPhonellakin ruskea palkki.</summary>
        public static bool Kelluva => false;

        /// <summary>iPhonella kartan veto piilotti palkin (☰ tuo takaisin).</summary>
        public static bool VetoPiilossa { get; private set; }

        /// <summary>
        /// Palkki piilossa (vaaka-asento tai iPhonen veto): näkyvissä vain ☰ (omistaja 24.9.: ei kelluvia pillereitä eikä
        /// nappeja), joten karttaselitteen ja linssien napit piiloutuvat tämän mukaan.
        /// </summary>
        public static bool PalkkiPiilossa => Piilossa || VetoPiilossa;
        public static event Action PalkkiPiilossaMuuttui;

        /// <summary>Ylhäältä asemoituvien näkymien varaus turva-alueen yläreunasta (0, kun palkki on piilossa).</summary>
        public static float Varaus => Piilossa ? 0f : kelluvaVaraus ?? Korkeus;

        /// <summary>Saaririvillä se osa rivistä, joka jää turva-alueen yläreunan alle (0 saaren/loven vieressä).</summary>
        static float? kelluvaVaraus;

        /// <summary>Saaririvin korkeus ja reunavara pisteinä (näytön pyöristetty kulma).</summary>
        /// <summary>SaariReuna: löydös 68 (omistaja 25.9.) pilleri ja ☰ sisemmäs reunoista (14 → 20 pt), löydös 88 (build 13) 26 pt.</summary>
        const float SaariRivi = 36f, SaariReuna = 26f, SaariVali = 6f;

        /// <summary>
        /// Löydös 44 (omistaja 24.9. klo 19.4x, Raamattu NATIIVIN YLÄPALKKI, TARKENNUS): iPhonen pystyasennossa palkki
        /// matalana ilman logoa; pilleri (raha/päivä) vasemmalle ja ☰ oikealle Dynamic Islandin riville, ruskea palkki
        /// taustalla vain turva-alueen korkuisena (rivi + 4,8 pt, jos rivi ulottuu turva-alueen alle).
        /// </summary>
        public static bool Matala => Puhelin && Screen.height > Screen.width && !Kelluva;
        /// <summary>Matalan palkin rivi (webin iPhone-napit 40 × 40) ja alavara (webin täyte 4,8).</summary>
        const float MatalaRivi = 40f, MatalaAla = 4.8f;
        /// <summary>
        /// Löydös 78 (omistaja 25.9.2026): matala palkki hieman turva-aluetta korkeampi (build 12: 62 pt = pelkkä
        /// turva-alue iPhone 17:ssä → 70 pt), yhä webiä matalampi; pilleri ja ☰ pysyvät saaren rivillä.
        /// </summary>
        const float MatalaLisa = 8f;
        bool? matalaNyt;

        /// <summary>Testikomento (ui ylapalkki saari x,y,w,h pisteinä | pois): simulaattorissa ei ole cutouts-tietoa.</summary>
        public static Rect? PakotaSaari;

        /// <summary>
        /// iPhonen pikseliä pisteessä: lyhyt sivu ≥ 1000 px on @3x (X:stä alkaen, paitsi XR/11 828 px ja SE 750 px @2x).
        /// Screen.dpi ei kelpaa: simulaattori ilmoitti iPhone 18 Pro:lle @2x:n dpi:n (saari laskettiin 239 pt:hen).
        /// </summary>
        public static float PuhelimenSkaala => Mathf.Min(Screen.width, Screen.height) >= 1000 ? 3f : 2f;

        /// <summary>
        /// Dynamic Island tai lovi ruudun pisteinä (origo ylhäällä vasemmalla); leveys 0 = ei lovea.
        /// Screen.cutouts ensin (pikselit, origo alhaalla), muuten arvio turva-alueen yläreunasta.
        /// </summary>
        public static Rect Saari()
        {
            if (PakotaSaari.HasValue) return PakotaSaari.Value;
            float pp = PuhelimenSkaala;
            foreach (var c in Screen.cutouts)
                if (c.yMax >= Screen.height - 2f * pp && c.width < Screen.width * 0.8f)
                {
                    var saari = new Rect(c.xMin / pp, (Screen.height - c.yMax) / pp, c.width / pp, c.height / pp);
                    // Löydös 73: Unity antaa Dynamic Islandin suorakulmion ruudun yläreunasta saaren alareunaan
                    // (iPhone 17: y 0,3, korkeus 49,7). Saari itse on 126 × 37 pt (leveyden suhteessa), alareuna pitää.
                    if (saari.yMin < 2f && saari.height > 40f && saari.width > 90f)
                    {
                        float korkeus = saari.width * 37f / 126f;
                        saari = new Rect(saari.xMin, saari.yMax - korkeus, saari.width, korkeus);
                    }
                    return saari;
                }
            float yla = (Screen.height - Screen.safeArea.yMax) / pp, w = Screen.width / pp;
            if (yla >= 55f) return new Rect((w - 126f) / 2f, 11f, 126f, 37f);
            if (yla >= 40f) return new Rect((w - 162f) / 2f, 0f, 162f, 32f);
            return new Rect(w / 2f, 0f, 0f, 0f);
        }

        /// <summary>Piilotettu palkki avattiin väkäsnapista tai suljettiin (karttaselitteen nappi väistyy).</summary>
        public static event Action<bool> AukiMuuttui;
        public static bool Auki { get; private set; }

        /// <summary>Onko jokin palkin pudotusvalikoista auki (UiNakymat): silloin ohinapautus ei sulje palkkia.</summary>
        public Func<bool> PudotusAuki;

        readonly UiKerros kerros;
        readonly VisualElement palkki, pilleri, ilmoitus, logo;
        bool? kelluvaNyt;
        readonly VisualElement napit;
        readonly List<(VisualElement Nappi, VisualElement Koti)> vieraat = new List<(VisualElement, VisualElement)>();

        /// <summary>Pillerin paikka tai koko muuttui (kaupunkipilleri seuraa sitä iPhonella).</summary>
        public event Action PilleriMuuttui;
        readonly Button vakasnappi;
        bool piilossa, nakyy = true;
        readonly Label raha, kello, ilmoitusTeksti, rahaton;
        string rivi = "", kelloTeksti = "";
        // Talouden vaihe 1 (UiNakymat.PaivitaKassa): rahattomuuden vuorokaudet ja matkan loppu.
        int? rahatonVrk, rahatonVuoroja;
        bool matkaPaattyi;
        /// <summary>Elämäpalkin lohkot: Talous.RahattomuusVuoroja (2 vrk × 4 vuoroa à 6 h).</summary>
        const int ElamaLohkoja = 8;
        readonly VisualElement elama, elamaLohkot;
        readonly Label elamaTeksti;
        /// <summary>Lapun teksti "RAHAT LOPPU · 1 VRK 12 H" (web #3421-luonnos); omistaja 15.2x: pelkät neliöt, joten pois.</summary>
        public static bool ElamaTekstilla = false;
        /// <summary>UiNakymat: karttaselitenapin ja auki olevan matkapäiväkirjan rajat (paneelin pisteinä).</summary>
        public Func<(Rect Selite, Rect Paivakirja)> ElamaAnkkurit;
        readonly Label elamaSelite;
        IVisualElementScheduledItem elamaAjastin, elamaSeliteAjastin;
        const string ElamaSeliteTeksti = "Rahat ovat loppu. Jokainen neliö on 6 tuntia matkaa — kun kaikki sammuvat, matka päättyy. "
            + "Ansaitse tai löydä rahaa jatkaaksesi.";

        void VaihdaElamaSelite()
        {
            bool auki = elamaSelite.style.display != DisplayStyle.Flex;
            elamaSelite.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            elamaSeliteAjastin?.Pause();
            if (!auki) return;
            elamaSelite.BringToFront();
            AsetteleElama();
            elamaSeliteAjastin = elamaSelite.schedule.Execute(() => elamaSelite.style.display = DisplayStyle.None).StartingIn(7000);
        }

        /// <summary>Web: miniselite sulkeutuu napautuksella mihin tahansa (palkin oma napautus hoitaa itsensä).</summary>
        void TarkistaElamaSelite()
        {
            if (elamaSelite.style.display != DisplayStyle.Flex || elama.panel == null) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame) return;
            var ruutu = osoitin.position.ReadValue();
            var pp = RuntimePanelUtils.ScreenToPanel(elama.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!elama.worldBound.Contains(pp)) { elamaSelite.style.display = DisplayStyle.None; elamaSeliteAjastin?.Pause(); }
        }
        IVisualElementScheduledItem ilmoitusAjastin, valahdysAjastin, rahaAjastin;

        /// <summary>Ratas- ja valikkonappi (Paavalikko ja Aanentasot ankkuroituvat näihin).</summary>
        public readonly Button Ratas, Valikko;
        public event Action PilleriPainettu;
        /// <summary>Tilapilleri (matkalaukku ankkuroituu sen alle).</summary>
        public VisualElement Pilleri => pilleri;

        /// <summary>Pelirivi vaihtui (Aseta): UiNakymat lukee talouden tilan (Jatka ei laukaise TilaMuuttui-tapahtumaa).</summary>
        public event Action RiviAsetettu;

        /// <summary>Logon napautus (UiNakymat: tekijätiedot ja lähteet).</summary>
        public event Action LogoPainettu;

        public Ylapalkki(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Tilarivi);
            var turva = kerros.Turva(UiKerros.Tilarivi);

            palkki = Rakenne.El("mk-ylapalkki", juuri);
            Rakenne.Tausta(palkki, Kuviot.Ylapalkki);

            // Logo avaa tekijätiedot ja lähteet (web brand-btn, omistaja 5.8.2026).
            logo = Rakenne.El("mk-logo", palkki);
            logo.AddManipulator(new Clickable(() => LogoPainettu?.Invoke()));
            var logoKuva = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logoKuva != null) logo.style.backgroundImage = new StyleBackground(logoKuva);

            pilleri = Rakenne.Nappi(null, "mk-pilleri", () => PilleriPainettu?.Invoke(), palkki, Ikonit.Laukku);
            Kirjasimet.Aseta(pilleri, Kirjasin.Kone);
            raha = Rakenne.Teksti("", "mk-pilleri__raha", pilleri);
            rahaton = Rakenne.Teksti("", "mk-pilleri__rahaton", pilleri);
            rahaton.style.display = DisplayStyle.None;
            kello = Rakenne.Teksti("", "mk-pilleri__kello", pilleri);
            pilleri.style.display = DisplayStyle.None;
            pilleri.RegisterCallback<GeometryChangedEvent>(_ => { SovitaPilleri(); PilleriMuuttui?.Invoke(); });

            napit = Rakenne.El("mk-ylapalkki__napit", palkki, PickingMode.Ignore);
            Ratas = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Ratas);
            Ratas.tooltip = "Äänentasot ja asetukset";
            Valikko = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Valikko);
            Valikko.tooltip = "Valikko";

            // ELÄMÄPALKKI (omistaja 27.9. 15.1x): rahattomuuden 2 vrk = 8 punaista 6 h -lohkoa kartan yläreunassa.
            // Web #3421 rahattomuuspalkki: lappu kartan keskellä selitenapin alla, 8 lohkoa 10 × 6 ja teksti.
            elama = Rakenne.El("mk-elamapalkki", juuri, PickingMode.Position);
            // Napautus avaa miniselitteen (omistaja 16.1x, web #3421 34524825); uusi napautus sulkee.
            elama.AddManipulator(new Clickable(() => VaihdaElamaSelite()));
            elamaSelite = Rakenne.Teksti(ElamaSeliteTeksti, "mk-elamapalkki__selite", juuri);
            elamaSelite.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(elamaSelite, Kirjasin.Luku);
            elamaSelite.style.display = DisplayStyle.None;
            // Kortin/kyltin koko muuttuu ilman omaa tapahtumaa: paikka tarkistetaan 4 kertaa sekunnissa näkyvänä.
            elamaAjastin = elama.schedule.Execute(AsetteleElama).Every(250);
            elamaAjastin.Pause();
            elamaLohkot = Rakenne.El("mk-elamapalkki__lohkot", elama, PickingMode.Ignore);
            for (int i = 0; i < ElamaLohkoja; i++) Rakenne.El("mk-elamapalkki__lohko", elamaLohkot, PickingMode.Ignore);
            elamaTeksti = Rakenne.Teksti("", "mk-elamapalkki__teksti", elama);
            Kirjasimet.Aseta(elamaTeksti, Kirjasin.KoneLihava);
            elama.style.display = DisplayStyle.None;
            elama.RegisterCallback<GeometryChangedEvent>(_ => AsetteleElama());

            // Hetkellinen viesti (event-toast).
            ilmoitus = Rakenne.El("mk-ilmoitus", juuri, PickingMode.Ignore);
            Rakenne.Tausta(ilmoitus, Kuviot.Ilmoitus);
            ilmoitusTeksti = Rakenne.Teksti("", "mk-ilmoitus__teksti", ilmoitus);
            Kirjasimet.Aseta(ilmoitus, Kirjasin.KoneLihava);
            ilmoitus.style.display = DisplayStyle.None;

            // Piilossa ☰ tuo palkin takaisin (omistaja 24.9.: ei kelluvia nappeja, vain palkki).
            vakasnappi = Rakenne.Nappi(null, "mk-vakasnappi", () =>
            {
                if (VetoPiilossa) { NaytaVedonJalkeen(); return; }
                if (Auki) Sulje(); else Avaa();
            }, turva, KolmeVakasta);
            vakasnappi.tooltip = "Näytä yläpalkki";

            Kirjasimet.Aseta(juuri, Kirjasin.Kone);
            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            kerros.JokaRuutu += TarkistaElamaSelite;
            kerros.JokaRuutu += TarkistaVeto;
            Asettele();
        }

        /// <summary>Löydös 68: piilotetun palkin nappi kolmena allekkaisena väkäsenä (⌄), ei ☰.</summary>
        const string KolmeVakasta = "<path d=\"M7 5.5l5 3 5-3\"/><path d=\"M7 10.5l5 3 5-3\"/><path d=\"M7 15.5l5 3 5-3\"/>";

        // --- iPhonen automaattinen piilotus (kartan veto piilottaa, napautus tuo takaisin) ---------------------
        Vector2 vetoAlku;
        float vetoAika = -1f;
        bool vetoKartalla;

        void TarkistaVeto()
        {
            // Löydös 73 (omistaja 25.9. klo 05.4x): iPhonen pystyasennossa yläpalkki on aina näkyvissä; automaattinen
            // piilotus ja väkäsnappi vain vaakamuodossa (Piilossa).
            bool pysty = Screen.height > Screen.width;
            if (!Puhelin || piilossa || !nakyy || pysty) { if (VetoPiilossa) NaytaVedonJalkeen(); return; }
            var o = Pointer.current;
            if (o == null) return;
            var r = o.position.ReadValue();
            if (o.press.wasPressedThisFrame)
            {
                // Vain kartalla alkanut ele: UI:n (palkki, kortit, napit) päällä alkanut ei piilota eikä näytä.
                vetoKartalla = !kerros.PeittaaPisteen(r);
                vetoAlku = r;
                vetoAika = Time.unscaledTime;
                return;
            }
            if (!vetoKartalla || vetoAika < 0f) return;
            float matka = (r - vetoAlku).magnitude / Mathf.Max(1f, PuhelimenSkaala);
            if (o.press.isPressed && matka >= 8f && !VetoPiilossa) { VetoPiilossa = true; PaivitaVeto(); }
            if (o.press.wasReleasedThisFrame)
            {
                if (matka < 6f && Time.unscaledTime - vetoAika < 0.7f && VetoPiilossa) NaytaVedonJalkeen();
                vetoAika = -1f;
            }
        }

        /// <summary>Testikomento ui ylapalkki veto|napautus: kartan veto piilottaa / napautus näyttää (simulaattorissa ei eleitä).</summary>
        public void TestaaVeto(bool piiloon)
        {
            if (piiloon) { VetoPiilossa = true; PaivitaVeto(); }
            else NaytaVedonJalkeen();
        }

        void NaytaVedonJalkeen()
        {
            if (!VetoPiilossa) return;
            VetoPiilossa = false;
            PaivitaVeto();
        }

        void PaivitaVeto()
        {
            palkki.EnableInClassList("mk-ylapalkki--piilossa", piilossa || VetoPiilossa);
            PaivitaNappi();
            PalkkiPiilossaMuuttui?.Invoke();
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Tilarivi);
            AsetaKelluva();
            bool matala = Matala && !Piilossa;
            if (matala != matalaNyt)
            {
                matalaNyt = matala;
                logo.style.display = matala || kelluvaNyt == true ? DisplayStyle.None : DisplayStyle.Flex;
                // Pillerin muoto vaihtuu ("300£ 1/80" saaren vieressä): sama rivi uudelleen.
                string rv = rivi;
                rivi = null;
                kelloTeksti = "";
                Aseta(rv);
            }
            if (!((kelluvaNyt == true || matala) && Screen.height > Screen.width && !Piilossa && AsetaSaaririvi(r, matala)))
            {
                kelluvaVaraus = null;
                palkki.EnableInClassList("mk-ylapalkki--saari", false);
                palkki.EnableInClassList("mk-ylapalkki--matala", false);
                pilleri.style.maxWidth = StyleKeyword.Null;
                pilleri.style.fontSize = StyleKeyword.Null;
                foreach (var e in new VisualElement[] { pilleri, Valikko }) e.style.height = e.style.minHeight = StyleKeyword.Null;
                pilleri.style.borderTopLeftRadius = pilleri.style.borderTopRightRadius =
                    pilleri.style.borderBottomLeftRadius = pilleri.style.borderBottomRightRadius = StyleKeyword.Null;
                var t = Tayte;
                palkki.style.paddingTop = r.y + t.x;
                palkki.style.paddingBottom = t.x;
                palkki.style.paddingLeft = r.x + t.y;
                palkki.style.paddingRight = r.z + t.y;
                palkki.style.height = r.y + Korkeus;
            }
            palkki.EnableInClassList("mk-ylapalkki--puhelin", Puhelin);
            // Löydös 68: väkäsnappi täsmälleen ☰:n paikalle ja kokoiseksi (turva-alueen sisällä, palkin täyte).
            vakasnappi.style.top = Mathf.Round((Korkeus - 36f) / 2f);
            vakasnappi.style.right = Tayte.y;
            vakasnappi.style.width = 44f;
            vakasnappi.style.height = vakasnappi.style.minHeight = 36f;
            bool p = Piilossa;
            if (p != piilossa) { piilossa = p; if (!p) Sulje(); PalkkiPiilossaMuuttui?.Invoke(); }
            palkki.EnableInClassList("mk-ylapalkki--piilossa", piilossa || VetoPiilossa);
            PaivitaNappi();
        }

        /// <summary>Pilleri ja napit saaren riville (ks. SAARIRIVI yllä); paneelin yksiköt muunnetaan ruudun pisteistä.</summary>
        string viimeSaariLoki;

        bool AsetaSaaririvi(Vector4 r, bool matala = false)
        {
            var paneeli = palkki.panel;
            if (paneeli == null || Screen.width <= 0) return false;
            float pp = PuhelimenSkaala;
            // Ruudun pisteet → paneelin yksiköt (viiteskaala ei ole iOS-pisteet kaikilla leveyksillä).
            Vector2 P(float x, float y) => RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(x * pp, y * pp));
            var saari = Saari();
            float yksikko = P(100f, 0f).x / 100f;
            float rivi = (matala ? MatalaRivi : SaariRivi) * yksikko;
            var ylakulma = P(saari.xMin, saari.yMin);
            var alakulma = P(saari.xMax, saari.yMax);
            // Löydös 73: matalalla palkilla pilleri ja ☰ Dynamic Islandin korkuisina ja sen korkeudella.
            // ScreenToPanel kääntää y-akselin (pisteet annetaan yläreunasta), joten korkeus itseisarvona.
            float saarenKorkeus = saari.height > 0 ? Mathf.Abs(alakulma.y - ylakulma.y) : 0f;
            if (matala && saarenKorkeus > 20f * yksikko) rivi = saarenKorkeus;
            float napinKorkeus = matala ? rivi : float.NaN;
            string loki = $"matala {matala}, saari {saari}, saaren korkeus {saarenKorkeus:0.#}, rivi {rivi:0.#}, yksikkö {yksikko:0.###}";
            if (loki != viimeSaariLoki) { viimeSaariLoki = loki; Debug.Log("MATKAKIRJA ylapalkki saaririvi: " + loki); }
            foreach (var e in new VisualElement[] { pilleri, Valikko })
            {
                e.style.height = float.IsNaN(napinKorkeus) ? StyleKeyword.Null : new StyleLength(napinKorkeus);
                e.style.minHeight = float.IsNaN(napinKorkeus) ? StyleKeyword.Null : new StyleLength(napinKorkeus);
            }
            if (matala) pilleri.style.borderTopLeftRadius = pilleri.style.borderTopRightRadius =
                pilleri.style.borderBottomLeftRadius = pilleri.style.borderBottomRightRadius = rivi / 2f;
            float keski = saari.height > 0 ? (ylakulma.y + alakulma.y) / 2f : 0f;
            float yla = Mathf.Max(4f * yksikko, keski - rivi / 2f);
            palkki.EnableInClassList("mk-ylapalkki--saari", !matala);
            palkki.EnableInClassList("mk-ylapalkki--matala", matala);
            palkki.style.paddingTop = yla;
            palkki.style.paddingLeft = r.x + SaariReuna * yksikko;
            palkki.style.paddingRight = r.z + SaariReuna * yksikko;
            // Matala: ruskea tausta turva-alueen korkuisena, ja rivi + alavara, jos rivi ulottuu sen alle.
            float korkeus = matala ? Mathf.Max(r.y + MatalaLisa * yksikko, yla + rivi + MatalaAla * yksikko) : yla + rivi;
            palkki.style.height = korkeus;
            // Löydös 73: palkki keskittää rivin pystysuunnassa, joten turva-alueen korkuinen palkki valutti pillerin
            // ja ☰:n 5,6 pt saaren alapuolelle (iPhone 17: pilleri y 19,6, saari y 14). Loppu alatäytteeksi.
            palkki.style.paddingBottom = Mathf.Max(0f, korkeus - yla - rivi);
            // Pilleri ei ulotu saaren alle; ilman lovea puolet leveydestä.
            float oikea = saari.width > 0 ? ylakulma.x - SaariVali * yksikko : P(Screen.width / pp, 0f).x / 2f;
            pilleriMax = Mathf.Max(60f, oikea - r.x - SaariReuna * yksikko);
            pilleri.style.maxWidth = pilleriMax;
            // Varaus turva-alueen yläreunasta: se osa palkista, joka jää turva-alueen alle.
            kelluvaVaraus = Mathf.Max(0f, korkeus - r.y);
            SovitaPilleri();
            return true;
        }

        float pilleriMax;

        /// <summary>
        /// Saaririvillä pillerin teksti pienenee (14 → 11 px), kunnes "raha£ päivä/80" mahtuu saaren viereen;
        /// muuten kello leikkautuisi pois isoilla summilla tai kapealla puhelimella.
        /// </summary>
        void SovitaPilleri()
        {
            bool matala = palkki.ClassListContains("mk-ylapalkki--matala");
            if (!(palkki.ClassListContains("mk-ylapalkki--saari") || matala) || kello.style.display == DisplayStyle.None)
            {
                pilleri.style.fontSize = StyleKeyword.Null;
                return;
            }
            float nyt = raha.resolvedStyle.fontSize;
            if (float.IsNaN(nyt) || nyt <= 0) return; // GeometryChanged yrittää uudelleen
            var ikoni = pilleri.Q(className: "mk-ikoni");
            float kiintea = pilleri.resolvedStyle.paddingLeft + pilleri.resolvedStyle.paddingRight
                + pilleri.resolvedStyle.borderLeftWidth + pilleri.resolvedStyle.borderRightWidth
                + kello.resolvedStyle.marginLeft
                + (ikoni != null && ikoni.style.display != DisplayStyle.None ? ikoni.resolvedStyle.width + ikoni.resolvedStyle.marginLeft + ikoni.resolvedStyle.marginRight : 0f);
            float teksti = raha.MeasureTextSize(raha.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x
                + kello.MeasureTextSize(kello.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (rahaton.style.display == DisplayStyle.Flex)
                teksti += rahaton.MeasureTextSize(rahaton.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x
                    + rahaton.resolvedStyle.marginLeft;
            if (float.IsNaN(kiintea) || teksti <= 0) return;
            float koko = matala ? 12.48f : 14f; // matala: webin iPhone-pillerin koko
            // Rahattomuuden varoitus mukana: kutistus 10 px:iin asti, jotta päivä mahtuu yhä pilleriin.
            float alaraja = rahaton.style.display == DisplayStyle.Flex ? 10f : 11f;
            while (koko > alaraja && kiintea + teksti * koko / nyt + 2f > pilleriMax) koko -= 0.5f;
            if (!Mathf.Approximately(koko, nyt)) pilleri.style.fontSize = koko;
            rahaton.style.fontSize = koko * 0.85f;
        }

        void AsetaKelluva()
        {
            bool k = Kelluva;
            // ⚙ ei ole pelaajan näkymässä (omistajan löydös 37, Fable 24.9.): asetukset ☰ → Muut → Asetukset.
            Ratas.style.display = DisplayStyle.None;
            if (kelluvaNyt == k) return;
            kelluvaNyt = k;
            SiirraVieraat();
            palkki.EnableInClassList("mk-ylapalkki--kelluva", k);
            palkki.pickingMode = k ? PickingMode.Ignore : PickingMode.Position;
            logo.style.display = k || matalaNyt == true ? DisplayStyle.None : DisplayStyle.Flex;
            if (k) palkki.style.backgroundImage = StyleKeyword.None;
            else Rakenne.Tausta(palkki, Kuviot.Ylapalkki);
            // Pillerin muoto vaihtuu: sama rivi uudelleen.
            string r = rivi;
            rivi = null;
            kelloTeksti = "";
            Aseta(r);
        }

        /// <summary>
        /// iPhonen yläriville tuleva muun näkymän nappi (karttaselitteen nappi ☰:n vasemmalle puolelle). Kelluvassa
        /// tilassa nappi siirretään riviin (luokka mk-ylapalkki__vieras), muuten se palaa omaan isäänsä.
        /// </summary>
        public void Vieras(VisualElement nappi)
        {
            if (nappi == null || vieraat.Exists(v => v.Nappi == nappi)) return;
            vieraat.Add((nappi, nappi.parent));
            SiirraVieraat();
            Paivita();
        }

        void SiirraVieraat()
        {
            bool k = kelluvaNyt == true;
            foreach (var (n, koti) in vieraat)
            {
                n.EnableInClassList("mk-ylapalkki__vieras", k);
                if (k) { if (n.parent != napit) napit.Insert(0, n); }
                else if (n.parent != koti) koti?.Add(n);
            }
        }

        /// <summary>Ruudun koko tai testikomento muutti tilaa: näkymät asettuvat uudelleen (TurvaMuuttui).</summary>
        public void Paivita() => kerros.PakotaTurva();

        // Web @keyframes laukku-elo (0,9 s): (hetki, kulma °, mittakaava).
        static readonly (float T, float Kulma, float Koko)[] LaukkuElo =
            { (0f, 0f, 1f), (0.14f, -7f, 1.14f), (0.32f, 6f, 1.1f), (0.52f, -4f, 1.06f), (0.72f, 2.5f, 1.03f), (1f, 0f, 1f) };
        IVisualElementScheduledItem eloAjastin;

        /// <summary>
        /// Laukku herää eloon, kun sinne tulee jotain uutta (web elavoitaLaukku, .turn-pill.laukku-elo):
        /// pieni heilahdus 0,9 s. Pieni liike: ei heilahdusta (web prefers-reduced-motion).
        /// </summary>
        public void ElavoitaLaukku()
        {
            eloAjastin?.Pause();
            pilleri.style.rotate = StyleKeyword.Null;
            pilleri.style.scale = StyleKeyword.Null;
            if (LinssiUi.VahennettyLiike() || pilleri.style.display == DisplayStyle.None) return;
            float alku = Time.unscaledTime;
            eloAjastin = pilleri.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                float t = Mathf.Clamp01((Time.unscaledTime - alku) / 0.9f);
                int i = 1;
                while (i < LaukkuElo.Length - 1 && LaukkuElo[i].T < t) i++;
                var a = LaukkuElo[i - 1];
                var b = LaukkuElo[i];
                float s = Mathf.SmoothStep(0f, 1f, (t - a.T) / Mathf.Max(0.0001f, b.T - a.T));
                pilleri.style.rotate = new Rotate(new Angle(Mathf.Lerp(a.Kulma, b.Kulma, s)));
                float k = Mathf.Lerp(a.Koko, b.Koko, s);
                pilleri.style.scale = new Scale(new Vector2(k, k));
                if (t >= 1f)
                {
                    eloAjastin?.Pause();
                    pilleri.style.rotate = StyleKeyword.Null;
                    pilleri.style.scale = StyleKeyword.Null;
                }
            }).Every(16);
        }

        void PaivitaNappi()
        {
            vakasnappi.style.display = (piilossa || VetoPiilossa) && nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            vakasnappi.EnableInClassList("mk-vakasnappi--auki", Auki);
            vakasnappi.pickingMode = Auki ? PickingMode.Ignore : PickingMode.Position;
            vakasnappi.tooltip = Auki ? "Piilota yläpalkki" : "Näytä yläpalkki";
        }

        public void Avaa()
        {
            if (!piilossa || Auki) return;
            Auki = true;
            palkki.AddToClassList("mk-ylapalkki--auki");
            PaivitaNappi();
            AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            palkki.RemoveFromClassList("mk-ylapalkki--auki");
            PaivitaNappi();
            AukiMuuttui?.Invoke(false);
        }

        /// <summary>
        /// Web: pointerdown kaappausvaiheessa sulkee palkin ennen kuin napautuksen kohde reagoi. Pallo lukee
        /// syötettä suoraan, joten napautus tarkistetaan joka ruudussa; palkki ja auki oleva pudotusvalikko ovat sisällä.
        /// </summary>
        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            if (Keyboard.current != null && Keyboard.current.escapeKey.wasPressedThisFrame) { Sulje(); return; }
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || palkki.panel == null) return;
            if (PudotusAuki != null && PudotusAuki()) return;
            var ruutu = osoitin.position.ReadValue();
            var pp = RuntimePanelUtils.ScreenToPanel(palkki.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!palkki.worldBound.Contains(pp) && !vakasnappi.worldBound.Contains(pp)) Sulje();
        }

        /// <summary>Näkyvän palkin alareuna paneelin pisteinä, piilossa 0 (näkymäpeiton tarkistus: palkki on läpinäkymätön).</summary>
        public float NakyvaAlareuna => palkki.resolvedStyle.display != DisplayStyle.None && !palkki.ClassListContains("mk-ylapalkki--piilossa")
            && palkki.worldBound.height > 0 ? palkki.worldBound.yMax : 0f;

        /// <summary>Palkin alareuna paneelin pisteinä (pudotusvalikot asettuvat tämän alle).</summary>
        public float Alareuna => palkki.resolvedStyle.height > 0 ? palkki.resolvedStyle.height : Korkeus;

        // --- ITilarivi ------------------------------------------------------

        public string Rivi => rivi;

        /// <summary>PeliApu.TilaTeksti: "300 £ · päivä 1 · aamu · Pariisi".</summary>
        public void Aseta(string teksti)
        {
            teksti ??= "";
            if (teksti == rivi) return;
            rivi = teksti;
            var osat = teksti.Split(new[] { " · " }, StringSplitOptions.None);
            if (osat.Length < 3)
            {
                // Lataus- ja virhetekstit ("Haetaan matkakirjaa…") koko pillerissä.
                raha.text = teksti;
                kello.text = "";
                kello.style.display = DisplayStyle.None;
            }
            else if (kelluvaNyt == true || matalaNyt == true)
            {
                // iPhone: "300£ 1/80" (omistaja 24.9.2026) — raha ja päivä / isoisän ennätys.
                string luku = Raha(osat[0]).TrimStart('£');
                string uusiRaha = luku + "£";
                if (uusiRaha != raha.text && raha.text.EndsWith("£")) Valahda(raha, ref rahaAjastin);
                raha.text = uusiRaha;
                var m = System.Text.RegularExpressions.Regex.Match(osat[1], @"\d+");
                string uusiKello = (m.Success ? m.Value : osat[1]) + "/" + Matkakirja.Peli.LaattaVakiot.EnnatysPaivat;
                kello.style.display = DisplayStyle.Flex;
                if (uusiKello != kelloTeksti && kelloTeksti.Length > 0) Valahda(kello, ref valahdysAjastin);
                kelloTeksti = uusiKello;
                kello.text = uusiKello;
            }
            else
            {
                string uusiRaha = Raha(osat[0]);
                // Kukkaron muutos välähtää kuten kello (osto, palkkio, lento).
                if (uusiRaha != raha.text && raha.text.StartsWith("£")) Valahda(raha, ref rahaAjastin);
                raha.text = uusiRaha;
                string uusiKello = Iso(osat[1]) + ", " + osat[2];
                kello.style.display = DisplayStyle.Flex;
                if (uusiKello != kelloTeksti && kelloTeksti.Length > 0) Valahda(kello, ref valahdysAjastin);
                kelloTeksti = uusiKello;
                kello.text = uusiKello; // web: kello omana tekstinään pillerin välillä, ei pistettä
            }
            NaytaTalous(osat.Length >= 3);
            pilleri.style.display = teksti.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            SovitaPilleri();
            try { RiviAsetettu?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>
        /// TALOUDEN VAIHE 1 (web renderTurnPill, #3394): rahat lopussa kassa on punainen ja sen vieressä
        /// "rahat loppu · N vrk" (Matka.RahattomuuttaJaljella); matkan päätyttyä rahattomuuteen pillerissä on
        /// pelkkä "Matka päättyi" (web game.phase 'over' ilman voittajaa). Vihje = web kassan title.
        /// </summary>
        public void Talous(int? jaljellaVrk, bool paattyi, string vihje, int? jaljellaVuoroja = null)
        {
            pilleri.tooltip = vihje ?? "";
            if (jaljellaVuoroja != rahatonVuoroja)
            {
                rahatonVuoroja = jaljellaVuoroja;
                NaytaElama();
            }
            if (jaljellaVrk == rahatonVrk && paattyi == matkaPaattyi) return;
            bool palautuu = matkaPaattyi && !paattyi;
            rahatonVrk = jaljellaVrk;
            matkaPaattyi = paattyi;
            NaytaElama();
            if (palautuu)
            {
                // "Matka päättyi" korvasi kassan ja kellon: rivi uudelleen (Jatka viimeisestä tallennuksesta).
                var r = rivi;
                rivi = null;
                Aseta(r);
                return;
            }
            NaytaTalous(rivi.Split(new[] { " · " }, StringSplitOptions.None).Length >= 3);
            SovitaPilleri();
        }

        /// <summary>Elämäpalkki: täysi lohko jokaista jäljellä olevaa 6 h vuoroa kohden; näkyy vain rahattomana.</summary>
        void NaytaElama()
        {
            bool naytetaan = rahatonVuoroja != null && !matkaPaattyi && nakyy;
            elama.style.display = naytetaan ? DisplayStyle.Flex : DisplayStyle.None;
            if (!naytetaan) { elamaAjastin.Pause(); elamaSelite.style.display = DisplayStyle.None; return; }
            elamaAjastin.Resume();
            int n = Mathf.Clamp(rahatonVuoroja.Value, 0, ElamaLohkoja);
            for (int i = 0; i < elamaLohkot.childCount; i++)
                elamaLohkot[i].EnableInClassList("mk-elamapalkki__lohko--kulunut", i >= n);
            // Web: aika = lohkot × 6 h → "N vrk" + "M h" (tyhjä osa pois, 0 → "0 h").
            int tunnit = n * 6, vrk = tunnit / 24, h = tunnit % 24;
            string aika = (vrk > 0 ? vrk + " VRK" : "") + (h > 0 || vrk == 0 ? (vrk > 0 ? " " : "") + h + " H" : "");
            elamaTeksti.text = "RAHAT LOPPU · " + aika;
            elamaTeksti.style.display = ElamaTekstilla ? DisplayStyle.Flex : DisplayStyle.None;
            AsetteleElama();
        }

        /// <summary>
        /// Web #3421 34524825 (omistaja 16.1x): laatikko (näkymätön pehmuste 6/8) heti kartan yläreunassa keskellä; jos se
        /// osuisi matkakirjan kylttiin/korttiin tai karttaselitenappiin, top = osuvien alareuna (toistetaan, kunnes ei osumia).
        /// Miniselite palkin alla keskellä, leveys min(260, leveys − 32).
        /// </summary>
        void AsetteleElama()
        {
            if (elama.style.display == DisplayStyle.None || elama.panel == null) return;
            var (selite, kirja) = ElamaAnkkurit?.Invoke() ?? (Rect.zero, Rect.zero);
            float w = elama.resolvedStyle.width, h = elama.resolvedStyle.height, leveys = elama.panel.visualTree.layout.width;
            if (float.IsNaN(w) || w <= 0 || float.IsNaN(h) || float.IsNaN(leveys)) return;
            // Kartan yläreuna: näkyvän palkin alareuna, piilotettuna turva-alueen yläreuna (Varaus).
            float top = palkki.resolvedStyle.display != DisplayStyle.None && palkki.worldBound.height > 0 && !palkki.ClassListContains("mk-ylapalkki--piilossa")
                ? palkki.worldBound.yMax : kerros.Reunat(UiKerros.Tilarivi).y;
            float x = (leveys - w) / 2f;
            for (int kierros = 0; kierros < 4; kierros++)
            {
                var laatikko = new Rect(x, top, w, h);
                float ala = top;
                foreach (var este in new[] { selite, kirja })
                    if (este.width > 0 && este.height > 0 && este.Overlaps(laatikko)) ala = Mathf.Max(ala, este.yMax);
                if (ala <= top) break;
                top = ala;
            }
            var juuri = elama.parent.worldBound;
            if (!Mathf.Approximately(elama.resolvedStyle.top, top - juuri.yMin)) elama.style.top = top - juuri.yMin;
            if (!Mathf.Approximately(elama.resolvedStyle.left, x - juuri.xMin)) elama.style.left = x - juuri.xMin;
            if (elamaSelite.style.display == DisplayStyle.Flex)
            {
                float sw = Mathf.Min(260f, leveys - 32f);
                elamaSelite.style.width = sw;
                elamaSelite.style.left = (leveys - sw) / 2f - juuri.xMin;
                elamaSelite.style.top = top + h - juuri.yMin;
            }
        }

        void NaytaTalous(bool pelirivi)
        {
            bool loppu = pelirivi && matkaPaattyi;
            if (loppu)
            {
                raha.text = "Matka päättyi";
                kello.style.display = DisplayStyle.None;
            }
            bool varoitus = pelirivi && !loppu && rahatonVrk != null;
            raha.EnableInClassList("mk-pilleri__raha--rahaton", varoitus);
            // Lihavointi kirjasimella (pilleri on Kone); koko 0,85 em pillerin koosta (SovitaPilleri muuttaa sitä).
            if (varoitus) Kirjasimet.Aseta(raha, Kirjasin.KoneLihava);
            else raha.style.unityFontDefinition = StyleKeyword.Null;
            float koko = raha.resolvedStyle.fontSize;
            if (!float.IsNaN(koko) && koko > 0) rahaton.style.fontSize = koko * 0.85f;
            // Lyhyt "2 vrk" kaikilla laitteilla (omistaja 27.9. 15.1x: iPad kuten iPhone, ei webin "rahat loppu · 2 vrk").
            // iPhonen pilleri on Dynamic Islandin vieressä (~104 pt), joten siellä myös laukkuikoni väistyy.
            bool kapea = kelluvaNyt == true || matalaNyt == true;
            rahaton.text = varoitus ? rahatonVrk + " vrk" : "";
            // iPhonella laukkuikoni väistyy varoituksen ajaksi (~22 pt), jotta päivä "1/80" mahtuu saaren viereen.
            var laukku = pilleri.Q(className: "mk-ikoni");
            if (laukku != null) laukku.style.display = varoitus && kapea ? DisplayStyle.None : DisplayStyle.Flex;
            rahaton.style.display = varoitus ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Webin muoto "£250" ("250 puntaa" / "250 £" → "£250"), jotta pilleri mahtuu puhelimeen.</summary>
        static string Raha(string s)
        {
            var osat = s.Trim().Split(' ');
            if (osat.Length == 2 && int.TryParse(osat[0], out _) && (osat[1] == "£" || osat[1].StartsWith("punta")))
                return "£" + osat[0];
            return s;
        }

        static string Iso(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        static void Valahda(Label l, ref IVisualElementScheduledItem ajastin)
        {
            l.AddToClassList("mk-valahdys");
            ajastin?.Pause();
            ajastin = l.schedule.Execute(() => l.RemoveFromClassList("mk-valahdys")).StartingIn(700);
        }

        public void Viesti(string teksti, float kestoS = 3f)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            ilmoitusTeksti.text = teksti;
            Rakenne.Nayta(ilmoitus, true);
            ilmoitusAjastin?.Pause();
            ilmoitusAjastin = ilmoitus.schedule.Execute(() => Rakenne.Nayta(ilmoitus, false, 300))
                .StartingIn((long)(Mathf.Max(0.5f, kestoS) * 1000));
        }

        /// <summary>Koko palkki näkyviin tai pois (esim. lehti auki).</summary>
        public void NaytaPalkki(bool nakyy)
        {
            this.nakyy = nakyy;
            palkki.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            NaytaElama();
            if (!nakyy) Sulje();
            PaivitaNappi();
        }
    }
}
