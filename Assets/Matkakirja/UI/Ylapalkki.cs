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
        public static float Korkeus => Puhelin ? 57f : 61f;
        /// <summary>Webin .topbar-täyte (pysty, vaaka).</summary>
        static Vector2 Tayte => Puhelin ? new Vector2(4.8f, 7.2f) : new Vector2(7.2f, 12.8f);

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

        /// <summary>Ylhäältä asemoituvien näkymien varaus turva-alueen yläreunasta (0, kun palkki on piilossa).</summary>
        public static float Varaus => Piilossa ? 0f : kelluvaVaraus ?? Korkeus;

        /// <summary>Saaririvillä se osa rivistä, joka jää turva-alueen yläreunan alle (0 saaren/loven vieressä).</summary>
        static float? kelluvaVaraus;

        /// <summary>Saaririvin korkeus ja reunavara pisteinä (näytön pyöristetty kulma).</summary>
        const float SaariRivi = 36f, SaariReuna = 14f, SaariVali = 6f;

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
                    return new Rect(c.xMin / pp, (Screen.height - c.yMax) / pp, c.width / pp, c.height / pp);
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
        readonly Label raha, kello, ilmoitusTeksti;
        string rivi = "", kelloTeksti = "";
        IVisualElementScheduledItem ilmoitusAjastin, valahdysAjastin, rahaAjastin;

        /// <summary>Ratas- ja valikkonappi (Paavalikko ja Aanentasot ankkuroituvat näihin).</summary>
        public readonly Button Ratas, Valikko;
        public event Action PilleriPainettu;
        /// <summary>Tilapilleri (matkalaukku ankkuroituu sen alle).</summary>
        public VisualElement Pilleri => pilleri;

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
            kello = Rakenne.Teksti("", "mk-pilleri__kello", pilleri);
            pilleri.style.display = DisplayStyle.None;
            pilleri.RegisterCallback<GeometryChangedEvent>(_ => { SovitaPilleri(); PilleriMuuttui?.Invoke(); });

            napit = Rakenne.El("mk-ylapalkki__napit", palkki, PickingMode.Ignore);
            Ratas = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Ratas);
            Ratas.tooltip = "Äänentasot ja asetukset";
            Valikko = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Valikko);
            Valikko.tooltip = "Valikko";

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
            }, turva, Ikonit.Valikko);
            vakasnappi.tooltip = "Näytä yläpalkki";

            Kirjasimet.Aseta(juuri, Kirjasin.Kone);
            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            kerros.JokaRuutu += TarkistaVeto;
            Asettele();
        }

        // --- iPhonen automaattinen piilotus (kartan veto piilottaa, napautus tuo takaisin) ---------------------
        Vector2 vetoAlku;
        float vetoAika = -1f;
        bool vetoKartalla;

        void TarkistaVeto()
        {
            if (!Puhelin || piilossa || !nakyy) { if (VetoPiilossa && (!Puhelin || piilossa)) NaytaVedonJalkeen(); return; }
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
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Tilarivi);
            AsetaKelluva();
            if (!(kelluvaNyt == true && Screen.height > Screen.width && !Piilossa && AsetaSaaririvi(r)))
            {
                kelluvaVaraus = null;
                palkki.EnableInClassList("mk-ylapalkki--saari", false);
                pilleri.style.maxWidth = StyleKeyword.Null;
                pilleri.style.fontSize = StyleKeyword.Null;
                var t = Tayte;
                palkki.style.paddingTop = r.y + t.x;
                palkki.style.paddingBottom = t.x;
                palkki.style.paddingLeft = r.x + t.y;
                palkki.style.paddingRight = r.z + t.y;
                palkki.style.height = r.y + Korkeus;
            }
            palkki.EnableInClassList("mk-ylapalkki--puhelin", Puhelin);
            bool p = Piilossa;
            if (p != piilossa) { piilossa = p; if (!p) Sulje(); }
            palkki.EnableInClassList("mk-ylapalkki--piilossa", piilossa || VetoPiilossa);
            PaivitaNappi();
        }

        /// <summary>Pilleri ja napit saaren riville (ks. SAARIRIVI yllä); paneelin yksiköt muunnetaan ruudun pisteistä.</summary>
        bool AsetaSaaririvi(Vector4 r)
        {
            var paneeli = palkki.panel;
            if (paneeli == null || Screen.width <= 0) return false;
            float pp = PuhelimenSkaala;
            // Ruudun pisteet → paneelin yksiköt (viiteskaala ei ole iOS-pisteet kaikilla leveyksillä).
            Vector2 P(float x, float y) => RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(x * pp, y * pp));
            var saari = Saari();
            float yksikko = P(100f, 0f).x / 100f;
            float rivi = SaariRivi * yksikko;
            var ylakulma = P(saari.xMin, saari.yMin);
            var alakulma = P(saari.xMax, saari.yMax);
            float keski = saari.height > 0 ? (ylakulma.y + alakulma.y) / 2f : 0f;
            float yla = Mathf.Max(4f * yksikko, keski - rivi / 2f);
            palkki.EnableInClassList("mk-ylapalkki--saari", true);
            palkki.style.paddingTop = yla;
            palkki.style.paddingLeft = r.x + SaariReuna * yksikko;
            palkki.style.paddingRight = r.z + SaariReuna * yksikko;
            palkki.style.height = yla + rivi;
            // Pilleri ei ulotu saaren alle; ilman lovea puolet leveydestä.
            float oikea = saari.width > 0 ? ylakulma.x - SaariVali * yksikko : P(Screen.width / pp, 0f).x / 2f;
            pilleriMax = Mathf.Max(60f, oikea - r.x - SaariReuna * yksikko);
            pilleri.style.maxWidth = pilleriMax;
            kelluvaVaraus = Mathf.Max(0f, yla + rivi - r.y);
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
            if (!palkki.ClassListContains("mk-ylapalkki--saari") || kello.style.display == DisplayStyle.None)
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
                + (ikoni != null ? ikoni.resolvedStyle.width + ikoni.resolvedStyle.marginLeft + ikoni.resolvedStyle.marginRight : 0f);
            float teksti = raha.MeasureTextSize(raha.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x
                + kello.MeasureTextSize(kello.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (float.IsNaN(kiintea) || teksti <= 0) return;
            float koko = 14f;
            while (koko > 11f && kiintea + teksti * koko / nyt + 2f > pilleriMax) koko -= 0.5f;
            if (!Mathf.Approximately(koko, nyt)) pilleri.style.fontSize = koko;
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
            logo.style.display = k ? DisplayStyle.None : DisplayStyle.Flex;
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
            else if (kelluvaNyt == true)
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
            pilleri.style.display = teksti.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            SovitaPilleri();
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
            if (!nakyy) Sulje();
            PaivitaNappi();
        }
    }
}
