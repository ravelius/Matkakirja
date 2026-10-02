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
        // iPadin nahkapalkki turva-alue + 57 pt (Pelikoodari 29.9., web) → 72 pt (omistaja 29.9.2026 klo 23.0x, 1.0.56: "liian matala").
        public static float Korkeus => Puhelin ? 57f : IpadNahka ? (MacSyote.Kaytossa ? MacKorkeus : IpadKorkeus) : 65f;
        const float IpadKorkeus = 72f, MacLogoKorkeus = 32f;
        // Mac (omistaja 30.9. klo 22.4x: "yläpalkki on aavistuksen liian korkea, koska alhaalla on enemmän tilaa"): Macilla ei ole
        // tilarivin turva-aluetta, joten iPadin 24 pt ylhäällä ei tasapainota tikkausnauhaa. Nauhan näkyvä yläreuna on ~4 pt
        // alatäytteen alla (omistajan kuva: ylä ~9 pt, ala ~13,5 pt) → alatäyte 19 → 15 ja palkki 72 → 68: pillerin ylä- ja
        // alaväli 9,5 pt kumpikin.
        const float MacKorkeus = 68f, MacTikkaus = 15f;
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
                // iPad: palkki näkyy myös vaaka-asennossa (omistaja 30.9.2026 klo 12.28); vaakapiilo vain iPhonella.
                if (!Puhelin) return false;
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
        /// <summary>Leveimmän Dynamic Islandin leveys (Pro Max, noin 126 pt, pyöristetty) ja keskivyöhykkeen marginaali (pt).</summary>
        const float LeveinSaari = 130f, SaarenMarginaali = 12f;

        /// <summary>
        /// Löydös 44 (omistaja 24.9. klo 19.4x, Raamattu NATIIVIN YLÄPALKKI, TARKENNUS): iPhonen pystyasennossa palkki
        /// matalana ilman logoa; pilleri (raha/päivä) vasemmalle ja ☰ oikealle Dynamic Islandin riville, ruskea palkki
        /// taustalla vain turva-alueen korkuisena (rivi + 4,8 pt, jos rivi ulottuu turva-alueen alle).
        /// </summary>
        /// <summary>Pillerivalikko puhelimella: logo vasemmalla, pilleri oikealla, ei ☰:ta (omistaja 29.9.2026).</summary>
        public static bool PilleriOikealla => Puhelin && Linssivalitsin.PilleriValikko;

        /// <summary>
        /// iPadin nahkapalkki (omistaja 29.9.2026, Codex ipad-v1; Päätoimittaja: iPad pillerivalikkoon kuten iPhone): ☰ pois,
        /// logo 36 pt vasemmasta ja pilleri 36 pt oikeasta reunasta, korkeus turva-alue + 57 pt (web), nahka rajautuu yläosasta niin, että
        /// alareuna ja tikkaus näkyvät kokonaisina; logo ja pilleri tikkauksen yläpuolisen nahan keskellä.
        /// </summary>
        public static bool IpadNahka => !Puhelin && UiKerros.Tabletti && Linssivalitsin.PilleriValikko;
        /// <summary>iPad-nahan pala @2x: 1290 × 260 px = 645 × 130 pt; alareunan varjo, sauma ja tikkaus rivit 222–260 = 19 pt.</summary>
        const float IpadNahkaLeveys = 645f, IpadNahkaKorkeus = 130f, IpadTikkaus = 19f, IpadReuna = 36f;

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
        const float SaariLeveys = 125f, SaariKorkeus = 36.33f, SaariLeveysKorjaus = 2.67f, SaariAlaKorjaus = 0.33f;

        public static Rect Saari()
        {
            if (PakotaSaari.HasValue) return PakotaSaari.Value;
            float pp = PuhelimenSkaala;
            foreach (var c in Screen.cutouts)
                if (c.yMax >= Screen.height - 2f * pp && c.width < Screen.width * 0.8f)
                {
                    var saari = new Rect(c.xMin / pp, (Screen.height - c.yMax) / pp, c.width / pp, c.height / pp);
                    // Löydös 73: Unity antaa Dynamic Islandin suorakulmion ruudun yläreunasta saaren alareunaan
                    // (iPhone 17: y 0,3, korkeus 49,7, leveys 127,7). Saaren todellinen kehys (Päätoimittaja 2.10. klo 16.1x,
                    // mitattu simulaattorin saarimaskista @3x): iPhone 17 125 × 36,33 pt, yläreuna 14 pt, alareuna 50,33 pt.
                    // Unityn suorakulmio on siis 2,67 pt leveämpi ja alareuna 0,33 pt ylempänä; korjaus keskeltä, muoto
                    // saaren suhteessa 125 : 36,33.
                    if (saari.yMin < 2f && saari.height > 40f && saari.width > 90f)
                    {
                        float leveys = saari.width - SaariLeveysKorjaus, korkeus = leveys * SaariKorkeus / SaariLeveys;
                        float ala = saari.yMax + SaariAlaKorjaus;
                        saari = new Rect(saari.center.x - leveys / 2f, ala - korkeus, leveys, korkeus);
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
        readonly Label raha, kello, ilmoitusTeksti, rahaton, punta;
        string rivi = "", kelloTeksti = "";
        // Talouden vaihe 1 (UiNakymat.PaivitaKassa): rahattomuuden vuorokaudet ja matkan loppu.
        int? rahatonVrk, rahatonVuoroja;
        bool matkaPaattyi;
        /// <summary>Elämäpalkin lohkot: Talous.RahattomuusVuoroja (2 vrk × 4 vuoroa à 6 h).</summary>
        const int ElamaLohkoja = 8, ElamaPunaisia = 3;
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
            bool auki = !elamaSeliteAuki;
            elamaSeliteAjastin?.Pause();
            if (!auki) { SuljeElamaSelite(); return; }
            elamaSeliteAuki = true;
            elamaSelite.BringToFront();
            AsetteleElama();
            // Avaus ja sulku animoiden palkin suunnasta (omistaja 29.9.2026, Raamattu PR #3602; Ponnahdus = webin arvot).
            Ponnahdus.Avaa(elamaSelite, elama.worldBound.center);
            elamaSeliteAjastin = elamaSelite.schedule.Execute(SuljeElamaSelite).StartingIn(7000);
        }

        bool elamaSeliteAuki;

        void SuljeElamaSelite()
        {
            if (!elamaSeliteAuki) return;
            elamaSeliteAuki = false;
            elamaSeliteAjastin?.Pause();
            Ponnahdus.Sulje(elamaSelite);
        }

        /// <summary>Web: miniselite sulkeutuu napautuksella mihin tahansa (palkin oma napautus hoitaa itsensä).</summary>
        void TarkistaElamaSelite()
        {
            if (!elamaSeliteAuki || elama.panel == null) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame) return;
            var ruutu = osoitin.position.ReadValue();
            var pp = RuntimePanelUtils.ScreenToPanel(elama.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!elama.worldBound.Contains(pp)) SuljeElamaSelite();
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
            // Punta omana merkkinään selkeällä kirjasimella (omistaja 2.10.2026 klo 16.0x: Kone-kirjasimen £ näytti koukulta).
            punta = Rakenne.Teksti("£", "mk-pilleri__punta", null);
            pilleri.Insert(pilleri.IndexOf(raha), punta);
            Kirjasimet.Aseta(punta, Kirjasin.Luku);
            punta.style.display = DisplayStyle.None;
            kello = Rakenne.Teksti("", "mk-pilleri__kello", pilleri);
            // Pillerivalikko puhelimella: kaksirivinen pilleri saaren oikealla puolella. Omistaja 30.9.2026 klo 12.28: päiväys
            // "1/80, keskipäivä" ylärivillä ja rahasaldo pillerin oikeaan reunaan alariville. iPadilla sama järjestys yhdellä rivillä.
            if (PilleriOikealla)
            {
                // Omistaja 2.10.2026 klo 15.1x: yksi rivi "1 pv · £400" (pino rivinä; ennen kaksirivinen).
                var pino = Rakenne.El("mk-pilleri__pino mk-pilleri__pino--rivi", pilleri, PickingMode.Ignore);
                pino.Add(kello);
                var rivi1 = Rakenne.El("mk-pilleri__rivi1", pino, PickingMode.Ignore);
                rivi1.Add(rahaton);
                rivi1.Add(punta);
                rivi1.Add(raha);
                pilleri.AddToClassList("mk-pilleri--lyhyt");
            }
            else if (IpadNahka)
            {
                kello.SendToBack();
                pilleri.Q(className: "mk-ikoni")?.SendToBack();
                pilleri.AddToClassList("mk-pilleri--paiva-ensin");
            }
            pilleri.style.display = DisplayStyle.None;
            pilleri.RegisterCallback<GeometryChangedEvent>(_ => { KeskitaPilleri(); VahvistaKulmavali(); SovitaPilleri(); PilleriMuuttui?.Invoke(); });

            napit = Rakenne.El("mk-ylapalkki__napit", palkki, PickingMode.Ignore);
            Ratas = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Ratas);
            Ratas.tooltip = "Äänentasot ja asetukset";
            Valikko = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Valikko);
            Valikko.tooltip = "Valikko";
            // Pillerivalikko (omistaja 29.9.2026 klo 09.07): puhelimella logo vasemmalla, ☰ pois ja pilleri oikealla; pilleri
            // avaa valikon. iPadilla nykyinen palkki jää (iPad-versio vasta iPhonen jälkeen), ☰ ja pilleri avaavat saman valikon.
            if (PilleriOikealla)
            {
                Valikko.style.display = DisplayStyle.None;
                palkki.AddToClassList("mk-ylapalkki--pilleri-oikealla");
                PueNahka();
            }
            else if (IpadNahka)
            {
                Valikko.style.display = DisplayStyle.None;
                palkki.AddToClassList("mk-ylapalkki--pilleri-oikealla");
                PueNahka("-ipad");
            }

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
            // Värit (omistaja 27.9. klo 17.2x, web #3443 v2335): lohkot sammuvat oikealta, joten viimeiset 18 h = kolme
            // vasemmanpuoleista punaisina, loput viisi oransseina; lopussa näkyy vain punaista.
            for (int i = 0; i < ElamaLohkoja; i++)
                Rakenne.El("mk-elamapalkki__lohko" + (i >= ElamaPunaisia ? " mk-elamapalkki__lohko--oranssi" : ""), elamaLohkot, PickingMode.Ignore);
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

        /// <summary>
        /// MATKALAUKKUNAHKA (omistaja 29.9.2026: "Hyväksyn, madalletaan"; Codexin paketti ylapalkki-matkalaukku, iphone-v1):
        /// nahkakaistale taustaksi rajattuna ja skaalattuna nykyiseen matalaan palkkiin (alareunan tikkausreuna säilyy:
        /// scale-and-crop alareunaan), keskitummennus erillisenä kerroksena saaren kohdalle (koko leveys, sama rajaus),
        /// logo ja pillerin muoto kohopainatuksina (pilleri 9-slice 53/47 px @3x). Luvut piirtää peli kuten ennen.
        /// </summary>
        void PueNahka(string laite = "")
        {
            var nahka = Resources.Load<Texture2D>("MatkakirjaUI/Ylapalkki/nahka-tile" + laite);
            if (nahka == null) return;
            palkki.style.backgroundImage = new StyleBackground(nahka);
            palkki.AddToClassList("mk-ylapalkki--nahka");
            bool ipad = laite.Length > 0;
            if (ipad)
            {
                // Pala toistuu vaakaan luonnollisessa koossaan (@2x) ja asettuu alareunaan: yläosa rajautuu, tikkaus kokonaan.
                palkki.AddToClassList("mk-ylapalkki--nahka-ipad");
                palkki.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.NoRepeat);
                palkki.style.backgroundSize = new BackgroundSize(IpadNahkaLeveys, IpadNahkaKorkeus);
                var logoIpad = Resources.Load<Texture2D>("MatkakirjaUI/Ylapalkki/logo-kohopainatus-ipad");
                if (logoIpad != null) { logo.style.backgroundImage = new StyleBackground(logoIpad); logoSuhde = 283f / 82f; }
                // Omistaja 2.10.2026 klo 15.0x ja 17.0x: pillerinappi myös iPadilla (ei kohopainettua ovaalia, ei laukkukuvaketta).
                PuePilleriNappi();
                return;
            }
            var varjo = Resources.Load<Texture2D>("MatkakirjaUI/Ylapalkki/keski-varjo");
            if (varjo != null)
            {
                var v = Rakenne.El("mk-ylapalkki__varjo", palkki, PickingMode.Ignore);
                v.style.backgroundImage = new StyleBackground(varjo);
                v.SendToBack();
            }
            var logoNahka = Resources.Load<Texture2D>("MatkakirjaUI/Ylapalkki/logo-kohopainatus");
            if (logoNahka != null) { logo.style.backgroundImage = new StyleBackground(logoNahka); logoSuhde = 326f / 95f; }
            // Omistaja 2.10.2026 klo 15.0x: pilleri napin näköiseksi, nahasta erottuva sävy (ei kohopainettua ovaalia).
            PuePilleriNappi();
        }

        /// <summary>
        /// PILLERINAPPI (omistaja 2.10.2026 klo 15.0x ja 17.0x): tyylikirjan pilleri-nappi-sävy (paperi.korostus hillitympänä),
        /// laukkukuvake pois ja pilleri vain tekstin "1 pv · £400" levyinen.
        /// </summary>
        void PuePilleriNappi()
        {
            pilleri.AddToClassList("mk-pilleri--nappi");
            pilleri.Q(className: "mk-ikoni")?.RemoveFromHierarchy();
        }

        /// <summary>Logon kuvasuhde (kultalogo 4:1, kohopainatus 326 × 95).</summary>
        float logoSuhde = 4f;

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
                logo.style.display = (matala && !PilleriOikealla) || kelluvaNyt == true ? DisplayStyle.None : DisplayStyle.Flex;
                // Pillerin muoto vaihtuu ("300£ 1/80" saaren vieressä): sama rivi uudelleen.
                string rv = rivi;
                rivi = null;
                kelloTeksti = "";
                Aseta(rv);
            }
            if (!((kelluvaNyt == true || matala) && Screen.height > Screen.width && !Piilossa && AsetaSaaririvi(r, matala)))
            {
                kelluvaVaraus = null;
                // Vaaka (1.0.71-kuva): pystyn saarimusta (66 pt) ulottui piilotetun palkin alle ja näkyi yläreunassa.
                AsetaSaariTikkaus(Rect.zero, 1f);
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
                if (IpadNahka && palkki.ClassListContains("mk-ylapalkki--nahka-ipad"))
                {
                    // Rivi tikkauksen yläpuolisen nahan keskelle; reunat 36 pt (Codex ipad-v1), turva-alue ja kulmakaari mukana.
                    palkki.style.paddingTop = r.y;
                    palkki.style.paddingBottom = MacSyote.Kaytossa ? MacTikkaus : IpadTikkaus;
                    palkki.style.paddingLeft = Mathf.Max(r.x, 0f) + IpadReuna;
                    palkki.style.paddingRight = Mathf.Max(r.z, 0f) + IpadReuna;
                    // Mac (omistaja 30.9. klo 22.4x): "matkakirja logoa saisi vähän suurentaa" — 28 → 32 pt (+14 %), vain Macilla.
                    if (MacSyote.Kaytossa) { logo.style.height = MacLogoKorkeus; logo.style.width = MacLogoKorkeus * logoSuhde; }
                }
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
            // EI OVAALEJA (omistaja 2.10.2026 klo 13.53 ja 15.1x): pilleri on suorakulmio pyöristetyin kulmin (kulma-nappi).
            if (matala) pilleri.style.borderTopLeftRadius = pilleri.style.borderTopRightRadius =
                pilleri.style.borderBottomLeftRadius = pilleri.style.borderBottomRightRadius = Tyylikirja.Kulma.Nappi * yksikko;
            float keski = saari.height > 0 ? (ylakulma.y + alakulma.y) / 2f : 0f;
            // Omistaja 30.9.2026 klo 12.28: pilleri ja logo hieman alemmas, saaren akselin alapuolelle (nahkapalkki).
            bool nahka = matala && PilleriOikealla && palkki.ClassListContains("mk-ylapalkki--nahka");
            float alemmas = nahka && saari.height > 0 ? RiviAlemmas * yksikko : 0f;
            float yla = Mathf.Max(4f * yksikko, keski - rivi / 2f + alemmas);
            palkki.EnableInClassList("mk-ylapalkki--saari", !matala);
            palkki.EnableInClassList("mk-ylapalkki--matala", matala);
            palkki.style.paddingTop = yla;
            // Pillerivalikko: webin reunat (logo 12, pilleri 8 pt ruudun reunasta; mitat.md logo x 7, pilleri oikea 389/393).
            palkki.style.paddingLeft = r.x + (PilleriOikealla ? 12f : SaariReuna) * yksikko;
            palkki.style.paddingRight = r.z + (PilleriOikealla ? 8f : SaariReuna) * yksikko;
            // Matala: ruskea tausta turva-alueen korkuisena, ja rivi + alavara, jos rivi ulottuu sen alle.
            float korkeus = matala ? Mathf.Max(r.y + MatalaLisa * yksikko, yla + rivi + MatalaAla * yksikko) : yla + rivi;
            float saariYla = Mathf.Min(ylakulma.y, alakulma.y), saariAla = Mathf.Max(ylakulma.y, alakulma.y);
            if (matala && PilleriOikealla && palkki.ClassListContains("mk-ylapalkki--nahka") && saarenKorkeus > 0f)
            {
                // Omistaja 29.9.2026 (1.0.50, palaute 5): nahkaa yhtä paljon saaren ylä- ja alapuolella, sitten tikkauskaista.
                // Laitteen saaren mukaan; kuva rajautuu alareunasta (scale-and-crop), joten tikkaus ei veny.
                korkeus = saariAla + saariYla + P(Screen.width / pp, 0f).x * NahkaTikkausOsuus;
                // Omistaja 30.9.2026 klo 12.28: yläpalkista hieman korkeampi (rivi laskee saaren akselin alle).
                korkeus += alemmas + PalkkiKorkeampi * yksikko;
            }
            AsetaSaariTikkaus(nahka && saari.width > 0 ? Rect.MinMaxRect(ylakulma.x, saariYla, alakulma.x, saariAla) : Rect.zero, yksikko);
            palkki.style.height = korkeus;
            // Löydös 73: palkki keskittää rivin pystysuunnassa, joten turva-alueen korkuinen palkki valutti pillerin
            // ja ☰:n 5,6 pt saaren alapuolelle (iPhone 17: pilleri y 19,6, saari y 14). Loppu alatäytteeksi.
            palkki.style.paddingBottom = Mathf.Max(0f, korkeus - yla - rivi);
            // Pilleri ei ulotu saaren alle; ilman lovea puolet leveydestä.
            float oikea = saari.width > 0 ? ylakulma.x - SaariVali * yksikko : P(Screen.width / pp, 0f).x / 2f;
            pilleriMax = Mathf.Max(60f, oikea - r.x - SaariReuna * yksikko);
            if (PilleriOikealla)
            {
                // Omistaja 29.9.2026: "logo näyttää olevan liian lähellä dynamic islandin reunaa … pitää varmaan miettiä pillerin
                // ja logon sijainti leveimmän saaren mukaan ja sitten vain keskelle jää tyhjää." Keskelle kiinteä vyöhyke
                // leveimmän saaren (Pro Max) verran + marginaali, sama kaikilla malleilla; lovellisella laitteella leveämpi lovi
                // voittaa. Logo vasempaan reunaan, pilleri oikeaan reunaan vyöhykkeen ulkopuolelle.
                float ruudunKeski = P(Screen.width / pp / 2f, 0f).x;
                float oma = saari.width > 0 ? (alakulma.x - ylakulma.x) / 2f : 0f;
                // Marginaali 8 pt (ennen 12): kulmavara vei pilleriltä ~13 pt oikeasta reunasta (1.0.54-laitekuva).
                float puoli = Mathf.Max(LeveinSaari / 2f * yksikko, oma) + (SaarenMarginaali - 4f) * yksikko;
                // Näytön pyöristetyt kulmat (omistaja 29.9.2026, 1.0.50: logo ja pilleri jäivät kulmien taakse): reuna vähintään
                // kulmakaaren sisään (KulmaVara), ei pelkkä turva-alue.
                float kulmaR = NaytonKulmaPt(saari, saariYla) * yksikko;
                float lkArvio = matala ? rivi * 0.8f : 24f * yksikko;
                float vasenReuna = Mathf.Max(r.x + 12f * yksikko, KulmaVara(yla + (rivi - lkArvio) / 2f, 0f, kulmaR, KulmaMarginaali * yksikko));
                // Omistaja 2.10.2026 klo 16.0x: pilleri saaren keskilinjalle (ei alemmas kuin logo) ja yhtä kauas näytön reunasta
                // kuin logo vasemmalla; kulmakaaren vara lasketaan nostetusta yläreunasta.
                KeskitaPilleri();
                float oikeaVara = Mathf.Max(r.z + 8f * yksikko, KulmaVara(yla - alemmas, rivi / 2f, kulmaR, KulmaMarginaali * yksikko));
                // Omistaja 17.0x: pillerin lähimmän pisteen etäisyys näytön kaareen ≥ logon etäisyys vasempaan kaareen (VahvistaKulmavali
                // mittaa asettelun jälkeen ja lisää tarvittaessa oikeaa väliä).
                oikeaVaraPerus = oikeaVara;
                naytonKulmaR = kulmaR;
                oikeaVara += kulmaLisa;
                float oikeaReuna = P(Screen.width / pp, 0f).x - oikeaVara;
                palkki.style.paddingLeft = vasenReuna;
                palkki.style.paddingRight = oikeaVara;
                pilleriMax = Mathf.Max(60f, oikeaReuna - (ruudunKeski + puoli));
                float logoTila = Mathf.Max(40f, (ruudunKeski - puoli) - vasenReuna);
                float lk = Mathf.Min(matala ? rivi * 0.8f : 24f * yksikko, logoTila / logoSuhde);
                logo.style.height = lk;
                logo.style.width = lk * logoSuhde;
            }
            pilleri.style.maxWidth = pilleriMax;
            // Varaus turva-alueen yläreunasta: se osa palkista, joka jää turva-alueen alle.
            kelluvaVaraus = Mathf.Max(0f, korkeus - r.y);
            SovitaPilleri();
            return true;
        }

        /// <summary>Rivin lasku saaren akselin alle ja palkin lisäkorkeus (pt; omistaja 30.9.2026 klo 12.28 "hieman").</summary>
        const float RiviAlemmas = 6f, PalkkiKorkeampi = 4f;
        /// <summary>
        /// NAHKATIKKAUS DYNAMIC ISLANDIN YMPÄRILLE (omistaja 2.10.2026 klo 15.1x: "ota musta pois dynamic islandin kohdalta ja tee
        /// ennemmin sen ympärille nahkainen tikkaus"; korvaa 30.9.:n mustan saarialueen). Päätoimittajan 16.0x korjaukset: saman
        /// tyylinen kuin palkin alareunan tikkausreuna (nahka-tile.png rivit 266–276): painettu ura, lyhyt pisto, pistojen varjo
        /// ja lanka; saaren ympärillä nahan leikkausreuna (tumma reunus ja ohut vaalea viiste kuten alareunan taitoksessa), jottei
        /// saari näytä tarralta. Yksi kehä koko saaren ympäri.
        /// </summary>
        // Etäisyydet saaren todellisesta reunasta (pt): omistaja 16.1x "saisi olla enemmän kiinni saaressa" → pistot ~2 pt:n päässä
        // joka puolelta (samankeskinen kehä).
        const float LeikkausEtaisyys = 0.5f, TikkausEtaisyys = 2.3f, ViisteEtaisyys = 3.7f, PistoPituus = 3.5f, PistoJakso = 6.5f,
            LankaPaksuus = 0.9f, UraPaksuus = 1.8f;
        /// <summary>Lanka ja viiste tyylikirjasta (pohjavahti): TUMMA muste-pehmeä, viiste läpikuultavana.</summary>
        static Color Lanka { get { Color c = Tyylikirja.Tumma.MustePehmea; c.a = 0.8f; return c; } }
        static Color Viiste { get { Color c = Tyylikirja.Tumma.MustePehmea; c.a = 0.18f; return c; } }
        VisualElement saariTikkaus;
        Rect tikkausSaari;
        float tikkausYksikko = 1f;

        /// <summary>Tikkauskehä saaren ympärille (paneelin yksiköissä); saari = Rect.zero piilottaa.</summary>
        void AsetaSaariTikkaus(Rect saari, float yksikko)
        {
            if (saari.width <= 0f)
            {
                if (saariTikkaus != null) saariTikkaus.style.display = DisplayStyle.None;
                return;
            }
            if (saariTikkaus == null)
            {
                saariTikkaus = Rakenne.El("mk-ylapalkki__saaritikkaus", palkki, PickingMode.Ignore);
                saariTikkaus.style.position = Position.Absolute;
                saariTikkaus.style.left = 0; saariTikkaus.style.top = 0; saariTikkaus.style.right = 0; saariTikkaus.style.bottom = 0;
                saariTikkaus.generateVisualContent += PiirraTikkaus;
                // Nahan ja keskivarjon päälle, logon ja pillerin alle.
                var varjo = palkki.Q(className: "mk-ylapalkki__varjo");
                if (varjo != null) saariTikkaus.PlaceInFront(varjo);
                else saariTikkaus.SendToBack();
            }
            saariTikkaus.style.display = DisplayStyle.Flex;
            if (saari == tikkausSaari && Mathf.Approximately(yksikko, tikkausYksikko)) return;
            tikkausSaari = saari;
            tikkausYksikko = yksikko;
            saariTikkaus.MarkDirtyRepaint();
            KeskitaPilleri();
        }

        void PiirraTikkaus(MeshGenerationContext mgc)
        {
            var saari = tikkausSaari;
            if (saari.width <= 0f) return;
            float u = tikkausYksikko;
            var p = mgc.painter2D;
            // Leikkausreuna: tumma reunus heti saaren reunassa ja ohut vaalea viiste sen ulkopuolella.
            p.lineCap = LineCap.Butt;
            p.strokeColor = Tyylikirja.Himmennys.Tumma;
            p.lineWidth = 1.2f * u;
            Stadion(p, saari, LeikkausEtaisyys * u, 0f, 0f);
            p.strokeColor = Viiste;
            p.lineWidth = 0.6f * u;
            Stadion(p, saari, ViisteEtaisyys * u, 0f, 0f);
            // Tikkaus: painettu ura, pistojen varjo hieman ulompana ja lanka.
            p.strokeColor = Tyylikirja.Himmennys.Kevyt;
            p.lineWidth = UraPaksuus * u;
            Stadion(p, saari, TikkausEtaisyys * u, 0f, 0f);
            p.lineCap = LineCap.Round;
            p.strokeColor = Tyylikirja.Himmennys.Tumma;
            p.lineWidth = (LankaPaksuus + 0.4f) * u;
            Stadion(p, saari, (TikkausEtaisyys + 0.4f) * u, PistoPituus * u, PistoJakso * u);
            p.strokeColor = Lanka;
            p.lineWidth = LankaPaksuus * u;
            Stadion(p, saari, TikkausEtaisyys * u, PistoPituus * u, PistoJakso * u);
        }

        /// <summary>
        /// Saaren stadionmuodon (pyöreät päädyt) ääriviiva <paramref name="d"/>:n etäisyydellä: jakso 0 = yhtenäinen viiva,
        /// muuten pistot pituudeltaan <paramref name="pisto"/> jakson välein kaarenpituuden mukaan, tasaisesti koko kehälle.
        /// </summary>
        static void Stadion(Painter2D p, Rect saari, float d, float pisto, float jakso)
        {
            float r = saari.height / 2f + d, cy = saari.center.y;
            float xa = saari.xMin + saari.height / 2f, xb = saari.xMax - saari.height / 2f; // päätyjen keskipisteet
            float suora = Mathf.Max(0f, xb - xa), kaari = Mathf.PI * r, kehä = 2f * suora + 2f * kaari;
            // Piste kehällä kaarenpituudella s (alkaen yläsuoran vasemmasta päästä myötäpäivään).
            Vector2 Piste(float s)
            {
                s = Mathf.Repeat(s, kehä);
                if (s < suora) return new Vector2(xa + s, cy - r);
                s -= suora;
                if (s < kaari) { float k = -Mathf.PI / 2f + s / r; return new Vector2(xb + r * Mathf.Cos(k), cy + r * Mathf.Sin(k)); }
                s -= kaari;
                if (s < suora) return new Vector2(xb - s, cy + r);
                s -= suora;
                { float k = Mathf.PI / 2f + s / r; return new Vector2(xa + r * Mathf.Cos(k), cy + r * Mathf.Sin(k)); }
            }
            const float Askel = 1.5f;
            if (jakso <= 0f)
            {
                p.BeginPath();
                p.MoveTo(Piste(0f));
                for (float s = Askel; s < kehä; s += Askel) p.LineTo(Piste(s));
                p.ClosePath();
                p.Stroke();
                return;
            }
            int n = Mathf.Max(1, Mathf.RoundToInt(kehä / jakso));
            float j = kehä / n, l = Mathf.Min(pisto, j * 0.8f);
            p.BeginPath();
            for (int i = 0; i < n; i++)
            {
                float a = i * j;
                p.MoveTo(Piste(a));
                for (float s = a + Askel; s < a + l; s += Askel) p.LineTo(Piste(s));
                p.LineTo(Piste(a + l));
            }
            p.Stroke();
        }

        float pilleriMax;
        /// <summary>Pillerin laukkuikonin viemä leveys (viimeksi näkyvissä mitattu; oletus ~20 pt).</summary>
        float ikoninTila = 20f;

        /// <summary>
        /// Nahkakuvan (nahka-tile 1290 × 300) alareunan varjo, sauma ja tikkaus: rivit 258–300 eli 42 / 1290 kuvan leveydestä,
        /// kun kuva skaalautuu palkin levyiseksi.
        /// </summary>
        const float NahkaTikkausOsuus = 42f / 1290f;

        /// <summary>Etäisyys kulmakaaresta (pt), jonka sisällä logo ja pilleri pysyvät.</summary>
        const float KulmaMarginaali = 4f;

        /// <summary>
        /// Näytön kulmasäde pisteinä (iOS ei kerro sitä julkisesti): Dynamic Island -iPhonet 62 (suurin, iPhone 16 Pro / 17),
        /// lovelliset 47, iPad 18, kotinäppäimelliset 0. Saari erotetaan lovesta sen yläreunan raosta.
        /// </summary>
        static float NaytonKulmaPt(Rect saari, float saarenYla)
        {
            if (UiKerros.Tabletti) return 18f;
            if (saari.width <= 0f) return 0f;
            return saarenYla > 2f ? 62f : 47f;
        }

        /// <summary>
        /// Pienin etäisyys näytön pystyreunasta (paneelin yksiköissä), jolla elementin yläkulma pysyy näytön pyöristetyn kulman
        /// (säde kulmaR) sisällä marginaalin verran: elementin yläkulman kaari (säde rho; suorakulmiolle 0, pillerille puolet
        /// korkeudesta) ei saa leikata näytön kulmakaarta. yla = elementin yläreuna näytön yläreunasta.
        /// </summary>
        public static float KulmaVara(float yla, float rho, float kulmaR, float marginaali)
        {
            if (kulmaR <= 0f) return 0f;
            float cy = yla + rho;
            if (cy >= kulmaR) return 0f;
            float d = kulmaR - rho - marginaali, dy = kulmaR - cy;
            if (d <= 0f || dy >= d) return kulmaR;
            return Mathf.Max(0f, kulmaR - Mathf.Sqrt(d * d - dy * dy) - rho);
        }

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
            float rahaLeveys = raha.MeasureTextSize(raha.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            float kelloLeveys = kello.MeasureTextSize(kello.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (punta.style.display == DisplayStyle.Flex)
                rahaLeveys += punta.MeasureTextSize(punta.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x
                    + punta.resolvedStyle.marginRight;
            if (rahaton.style.display == DisplayStyle.Flex)
                rahaLeveys += rahaton.MeasureTextSize(rahaton.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x
                    + rahaton.resolvedStyle.marginLeft;
            // Kaksirivinen (pillerivalikko): leveämpi rivi ratkaisee; yksirivinen: rivit peräkkäin.
            float teksti = PilleriOikealla ? Mathf.Max(rahaLeveys, kelloLeveys) : rahaLeveys + kelloLeveys;
            if (PilleriOikealla) kiintea -= kello.resolvedStyle.marginLeft;
            if (float.IsNaN(kiintea) || teksti <= 0) return;
            float koko = matala ? 12.48f : 14f; // matala: webin iPhone-pillerin koko
            // Rahattomuuden varoitus mukana: kutistus 10 px:iin asti, jotta päivä mahtuu yhä pilleriin.
            float alaraja = rahaton.style.display == DisplayStyle.Flex ? 10f : 11f;
            while (koko > alaraja && kiintea + teksti * koko / nyt + 2f > pilleriMax) koko -= 0.5f;
            if (!Mathf.Approximately(koko, nyt)) pilleri.style.fontSize = koko;
            rahaton.style.fontSize = koko * 0.85f;
            if (PilleriOikealla && ikoni != null)
            {
                // Kulmakaaren sisällä pilleri on kapeampi (1.0.54-laitekuva: "Päivä 1, a…" katkesi): jos teksti ei mahdu pienimmälläkään
                // koolla, laukkuikoni väistyy (kuten rahattomuuden varoituksen aikana), ja päivärivi saa sen ~20 pt.
                // Ikonin tila aina mukana (myös piilossa), ettei näkyvyys heilu GeometryChangedin välillä.
                bool nakyy = ikoni.style.display != DisplayStyle.None;
                if (nakyy && ikoni.resolvedStyle.width > 0f)
                    ikoninTila = ikoni.resolvedStyle.width + ikoni.resolvedStyle.marginLeft + ikoni.resolvedStyle.marginRight;
                // Päivärivillä on oma kokonsa (kaksirivinen 11 px), joten mahtuminen luetaan asettelusta: rivin tarvitsema leveys
                // vs. sille jäänyt tila (1.0.55-laitekuva: arvio pillerin koosta näytti mahtuvan, mutta "Päivä 1, aa…" katkesi).
                float tila = kello.contentRect.width;
                bool mahtuu = float.IsNaN(tila) || tila <= 0f
                    ? kiintea - (nakyy ? ikoninTila : 0f) + ikoninTila + teksti * koko / nyt + 2f <= pilleriMax
                    : kelloLeveys <= tila + 0.5f - (nakyy ? 0f : ikoninTila);
                bool varoitus = rahaton.style.display == DisplayStyle.Flex;
                var d = mahtuu && !varoitus ? DisplayStyle.Flex : DisplayStyle.None;
                if (ikoni.style.display != d) ikoni.style.display = d;
            }
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
            logo.style.display = k || (matalaNyt == true && !PilleriOikealla) ? DisplayStyle.None : DisplayStyle.Flex;
            if (k) palkki.style.backgroundImage = StyleKeyword.None;
            else if (!palkki.ClassListContains("mk-ylapalkki--nahka")) Rakenne.Tausta(palkki, Kuviot.Ylapalkki); // nahka pysyy
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
            if (!palkki.worldBound.Contains(pp) && !vakasnappi.worldBound.Contains(pp)) { UiKerros.OhiSulki(); Sulje(); }  // maakuntalappu ei aukea samasta napautuksesta (omistaja 30.9.2026)
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
                AsetaRahaTeksti(teksti);
                kello.text = "";
                kello.style.display = DisplayStyle.None;
            }
            // Pillerivalikko (Pelikoodari 29.9.): molemmilla laitteilla "rahat · Päivä N, aamu"; "N/80" poistui webistä 16.8.
            else if ((kelluvaNyt == true || matalaNyt == true) && !Linssivalitsin.PilleriValikko)
            {
                // iPhone: "300 £ 1/80" — raha ja päivä / isoisän ennätys (omistaja 24.9.2026; suomalainen muoto
                // "400 £" kaikkialle, Fable 27.9. klo 20.1x).
                string uusiRaha = Raha(osat[0]);
                if (uusiRaha != RahaNyt && RahaNyt.StartsWith("£")) Valahda(raha, ref rahaAjastin);
                AsetaRahaTeksti(uusiRaha);
                var m = System.Text.RegularExpressions.Regex.Match(osat[1], @"\d+");
                string uusiKello = (m.Success ? m.Value : osat[1]) + "/" + Matkakirja.Peli.LaattaVakiot.EnnatysPaivat;
                kello.style.display = DisplayStyle.Flex;
                if (uusiKello != kelloTeksti && kelloTeksti.Length > 0) Valahda(kello, ref valahdysAjastin);
                kelloTeksti = uusiKello;
                kello.text = uusiKello;
            }
            else
            {
                // Pillerivalikko: omistaja 2.10.2026 klo 15.1x pillerissä vain päivä ja rahat, "1 pv · £400" (rahan muoto £N,
                // omistaja 15.50; täysi muoto valikossa; ennen 30.9.: "1/80, keskipäivä"). Muuten "Päivä 1, aamu".
                var pv = System.Text.RegularExpressions.Regex.Match(osat[1], @"\d+");
                bool lyhyt = Linssivalitsin.PilleriValikko && pv.Success;
                string uusiRaha = Raha(osat[0]);
                // Kukkaron muutos välähtää kuten kello (osto, palkkio, lento).
                if (uusiRaha != RahaNyt && RahaNyt.StartsWith("£")) Valahda(raha, ref rahaAjastin);
                AsetaRahaTeksti(uusiRaha);
                string uusiKello = lyhyt ? pv.Value + " pv ·" : Iso(osat[1]) + ", " + osat[2];
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
        bool elamaNakyy;

        void NaytaElama()
        {
            bool naytetaan = rahatonVuoroja != null && !matkaPaattyi && nakyy;
            // Lappu ilmestyy ja poistuu animoiden (omistaja 29.9.2026, Ponnahdus); vain tilan vaihtuessa, ei joka päivityksellä.
            // Palkin piilotus lehden ajaksi (nakyy) on heti, kuten koko yläpalkki.
            if (naytetaan != elamaNakyy)
            {
                elamaNakyy = naytetaan;
                if (naytetaan) Ponnahdus.Avaa(elama, origo: new TransformOrigin(Length.Percent(50), Length.Percent(0)));
                else if (nakyy) Ponnahdus.Sulje(elama);
                else { Ponnahdus.Lopeta(elama); elama.style.display = DisplayStyle.None; }
            }
            if (!naytetaan) { elamaAjastin.Pause(); elamaSeliteAuki = false; Ponnahdus.Lopeta(elamaSelite); elamaSelite.style.display = DisplayStyle.None; return; }
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

        /// <summary>
        /// Pillerin keskikohta saaren keskilinjalle (Päätoimittaja 2.10. klo 16.0x). Mitattu 6b3076de ja 2c013d62: pilleri y 17 pt,
        /// saari y 14 pt (sama korkeus 36,3 pt), joten rivin laskennallinen sijainti ei riitä: siirto lasketaan pillerin
        /// todellisesta paikasta suhteessa saaren keskikohtaan (palkin koordinaatit) ja korjataan marginaalilla.
        /// </summary>
        float oikeaVaraPerus = float.NaN, naytonKulmaR, kulmaLisa;

        /// <summary>
        /// Pillerin oikean yläkulman lähin piste näytön pyöristettyyn kulmaan vähintään yhtä kaukana kuin logon vasen yläkulma
        /// vasempaan kaareen (omistaja 2.10.2026 klo 17.0x: mitataan lähimmästä pisteestä, ei suorasta reunasta). Pillerin kulma on
        /// kulma-napin säteinen kaari; logo on suorakulmio. Lisä oikeaan väliin kasvaa mittauksen mukaan (GeometryChanged).
        /// </summary>
        void VahvistaKulmavali()
        {
            if (float.IsNaN(oikeaVaraPerus) || naytonKulmaR <= 0f || !PilleriOikealla) return;
            var p0 = palkki.worldBound;
            var lb = logo.worldBound;
            var pb = pilleri.worldBound;
            if (float.IsNaN(lb.width) || float.IsNaN(pb.width) || pb.width <= 0f || lb.width <= 0f) return;
            float R = naytonKulmaR, W = p0.width;
            var logoKulma = new Vector2(lb.xMin - p0.xMin, lb.yMin - p0.yMin);
            float dLogo = logoKulma.x < R && logoKulma.y < R
                ? R - Vector2.Distance(logoKulma, new Vector2(R, R)) : Mathf.Min(logoKulma.x, logoKulma.y);
            float rho = pilleri.resolvedStyle.borderTopRightRadius;
            if (float.IsNaN(rho)) rho = 0f;
            var c = new Vector2(pb.xMax - p0.xMin - rho, pb.yMin - p0.yMin + rho);
            float dPilleri = c.x > W - R && c.y < R
                ? R - Vector2.Distance(c, new Vector2(W - R, R)) - rho : W - (pb.xMax - p0.xMin);
            // +0,5 pt varmuus: laitteen kaari ei ole täsmälleen mallin 62 pt (8d3af245: pilleri 12,5 px vs logo 13,6 px @3x).
            float ero = dLogo + 0.5f - dPilleri;
            if (Mathf.Abs(ero) < 0.25f) return;
            kulmaLisa = Mathf.Max(0f, kulmaLisa + ero);
            palkki.style.paddingRight = oikeaVaraPerus + kulmaLisa;
        }

        void KeskitaPilleri()
        {
            var saari = tikkausSaari;
            if (saari.width <= 0f || !PilleriOikealla || saariTikkaus == null || saariTikkaus.style.display == DisplayStyle.None)
            {
                if (pilleri.style.marginTop.keyword != StyleKeyword.Null) pilleri.style.marginTop = StyleKeyword.Null;
                return;
            }
            var wb = pilleri.worldBound;
            if (float.IsNaN(wb.height) || wb.height <= 0f) return;
            float ero = wb.center.y - palkki.worldBound.yMin - saari.center.y;
            if (Mathf.Abs(ero) < 0.25f) return;
            float nyt = pilleri.resolvedStyle.marginTop;
            pilleri.style.marginTop = (float.IsNaN(nyt) ? 0f : nyt) - ero;
        }

        /// <summary>Raha pilleriin: "£400" → punta omana merkkinään ja numero; muu teksti (lataus, "Matka päättyi") sellaisenaan.</summary>
        void AsetaRahaTeksti(string t)
        {
            bool p = t.Length > 1 && t[0] == '£' && char.IsDigit(t[1]);
            punta.style.display = p ? DisplayStyle.Flex : DisplayStyle.None;
            raha.text = p ? t.Substring(1) : t;
        }

        string RahaNyt => (punta.style.display == DisplayStyle.Flex ? "£" : "") + raha.text;

        void NaytaTalous(bool pelirivi)
        {
            bool loppu = pelirivi && matkaPaattyi;
            if (loppu)
            {
                AsetaRahaTeksti("Matka päättyi");
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

        /// <summary>Suomalainen muoto "250 £" sitovalla välilyönnillä ("250 puntaa" / "£250" → "250 £"; Fable 27.9.: kaikilla laitteilla).</summary>
        static string Raha(string s)
        {
            var osat = s.Trim().Split(' ');
            if (osat.Length == 2 && int.TryParse(osat[0], out _) && (osat[1] == "£" || osat[1].StartsWith("punta")))
                return "£" + osat[0]; // brittiläinen muoto koko pelissä (omistaja 2.10.2026 klo 15.50)
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
