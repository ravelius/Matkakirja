// KAUPUNKILIUSKA (Natiivi-UI; löydös 48, omistaja 25.9.2026 klo 00.1x, sitova; ulkoasu löydös 146 malli v2, omistaja
// 26.9.2026 "kortti aika hyvä", lokit/natiivi-ui-146-malli/malli2.html): kaupungin napautus avaa kaupunkimerkin viereen
// kapean ja tiiviin pergamenttikortin. Rivien sisältö ja toiminnot kuten webin kaupunkiliuskassa
// (js/pallolauta/kaupunkiliuska.js liuskanRivit, nostot.js piirraLiuskanRivi).
//
//   ┌────────────────────────────┐
//   │ [herokuva 3:2]             │   (kuvan/nimen napautus = kaupunkilehti; ilman kuvaa nimi omana rivinään)
//   │ Pariisi                    │   (nimi kuvan päällä alareunassa, tumma liukuma kuvan alaosassa)
//   │ Nähtävyydet              › │   (kaupungilla on kohdekartta)
//   │ Turistiopas              › │   (oppaan artikkeli)
//   │ Liiku tänne / Mannerlento› │   (vain kun tarjolla)
//   │ ────────────────────────── │   (hiusviiva omana rivinään)
//   │ ● Kadonneet ihmeet       3 │   (nostokategoriat haitarina: toisen avaus sulkee edellisen)
//   │     Mona Lisan varkaus     │   (kohderivi sisennettynä: liuska kiinni ja nosto auki)
//   └────────────────────────────┘
//
// Mitat mallista (löydös 146): leveys iPhonella 60 % ruudusta, iPadilla 300 pt; pergamentti #f3e8cf, 1 px reuna
// rgba(92, 62, 30, .5), kulma 3, reunus 8; rivi 22 pt, teksti 14,5 pt Iowan Old Style, lukumäärät ja nuolet himmeinä
// oikealla (American Typewriter 12, #7a6650). Paikka: iPhonella kaupungin yläpuolelle keskitettynä 16 pt rakoon
// (ei mahdu → alle), iPadilla 24 pt merkin oikealle (ei mahdu → vasemmalle) pystyssä keskitettynä; aina ruudun
// kalusteiden väliin. Korkeus iPhonella enintään 45 % ruudusta (kelausrivit, jos rivit eivät mahdu; web kelattuLiuska).
// Liuska seuraa merkin ruutupistettä joka ruudussa (PalloKierto.RuutuPiste), myös kamera-ajon aikana.
// Animaatio: kuori heti napautuksesta (60 ms), kuva 120 ms, rivit 30 ms portain (kukin 90 ms), kaikki < 250 ms,
// ease-out; sulku 100 ms. Vähennetty liike (LinssiUi.VahennettyLiike) = ei animaatiota.
// Ei sulkunappia: kartan napautus liuskan ohi sulkee (web kuunteleSulkevaNapautus). Toiminnot antaa PeliOhjain
// (KaupunkiToiminnot, null = rivi piiloon).
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiKortti : IKaupunkiKortti
    {
        public const string LehtiIkoni =
            "<path d=\"M4.5 5.5h12v13H7a2.5 2.5 0 0 1-2.5-2.5z\"/><path d=\"M16.5 8.5h3v8a2 2 0 0 1-2 2\"/>"
            + "<path d=\"M7.5 9h6M7.5 12h6M7.5 15h3.5\"/>";

        // Löydös 146 (malli v2): mitat pt-yksiköissä (USS .mk-liuska samat). Ylavara = web LIUSKAN_YLAVARA_PX 18.
        public const float RivinKorkeus = 22f;
        const float Rako = 16f, RakoTabletti = 24f, Ylavara = 18f, Reunavara = 12f;
        const float LeveydenOsuus = 0.6f, TablettiLeveys = 300f, KorkeudenOsuus = 0.45f;
        const float Reunus = 8f + 1f, RivitYla = 4f; // padding 8 + reuna 1; rivit 4 pt kuvan alla
        // Animaation ajat (ms): kuva, rivin häivytys, ensimmäisen rivin viive, porras, viimeisen rivin viiveen katto.
        const float KuvaMs = 120f, RiviMs = 90f, EnsimmainenMs = 20f, PorrasMs = 30f, ViimeinenMs = 150f;
        const int SulkuMs = 100;
        static readonly string KelausYlosIkoni = "<path d=\"M5.5 15 12 8.5 18.5 15\"/>";

        readonly UiKerros kerros;
        readonly VisualElement alue, liuska, kuvapinta, rivit;
        readonly Button kuva;
        readonly Label kuvanimi;
        readonly ScrollView vieritys;
        readonly Button kelausYlos, kelausAlas;
        KaupunkiToiminnot toiminnot;
        string kaupunki, nimi;
        double lat = double.NaN, lon = double.NaN;
        OpasArtikkeli opas;
        bool nahtavyyksia, nimiAnnettu;
        /// <summary>Kaupungilla on herokuva: nimi kuvan päällä eikä omana rivinään.</summary>
        bool kuvallinen;
        /// <summary>Kaupunkilehden toiminto (kuvan ja nimirivin napautus), null = ei lehteä.</summary>
        Action lehti;
        KaupunkiTiedot tiedot;
        PalloKierto kierto;
        /// <summary>Nostokategoriat (null = ei vielä ladattu), avattu kategoria (null = kaikki kiinni).</summary>
        List<NostoKategoria> kategoriat;
        string avattu;
        readonly List<Action> nostoOdottajat = new List<Action>();
        float asetettuLeveys = -1f;
        // Löydös 146: avausanimaation alku (ms, Time.unscaledTime); NaN = ei animaatiota (kaikki näkyvissä),
        // −1 = alkaa, kun liuska ensimmäisen kerran asemoidaan näkyviin. kuvaAlku samoin myöhään saapuvalle kuvalle.
        float liikeAlku = float.NaN, kuvaAlku = float.NaN;

        public bool Auki { get; private set; }
        /// <summary>Liuska ei ole alareunan paneeli: pulu ja Liiku eivät väistä sitä (web: liuska kartalla).</summary>
        public VisualElement Alue => null;
        public string Kaupunki => Auki ? kaupunki : null;

        /// <summary>Löydös 146: liuskan leveys (iPhone 60 % ruudusta, iPad 300 pt).</summary>
        public static float Leveys(float ruudunLeveys) => UiKerros.Tabletti ? TablettiLeveys : Mathf.Round(ruudunLeveys * LeveydenOsuus);

        static float KuvanKorkeus(float leveys) => Mathf.Round((leveys - 2 * Reunus) * 2f / 3f);

        /// <summary>Kamerakohteelle (UiNakymat.LiuskanRuutupiste): liuskan arvioitu korkeus kuvan ja noin 7 rivin kanssa.</summary>
        public static float ArvioituKorkeus(float ruudunLeveys) => 2 * Reunus + KuvanKorkeus(Leveys(ruudunLeveys)) + RivitYla + 7 * RivinKorkeus;

        public KaupunkiKortti(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Matkavalinta);
            kerros.Turva(UiKerros.Matkavalinta);

            // Koko ruudun läpinäkyvä alue; vain liuska ottaa kosketukset.
            alue = Rakenne.El("mk-kaupunkikortti-alue", juuri, PickingMode.Ignore);
            alue.style.display = DisplayStyle.None;
            liuska = Rakenne.El("mk-liuska", alue);
            // Löydös 146: herokuva 3:2 kortin levyisenä, nimi kuvan päällä; napautus = kaupunkilehti (ennen nimirivi).
            kuva = Rakenne.Nappi(null, "mk-liuska__kuva", () => { if (Auki) lehti?.Invoke(); }, liuska);
            kuvapinta = Rakenne.El("mk-liuska__kuvapinta", kuva, PickingMode.Ignore);
            // UITK:ssa ei ole CSS-liukumaa: mallin linear-gradient(to top, rgba(20,12,4,.62), 0 42 %) tekstuurina.
            Rakenne.Tausta(Rakenne.El("mk-liuska__nimivarjo", kuva, PickingMode.Ignore),
                Kuviot.Pysty("liuska-nimivarjo", Kuviot.Vari("#140c04", 0f), Kuviot.Vari("#140c04", 0.62f)));
            kuvanimi = Rakenne.Teksti("", "mk-liuska__kuvanimi", kuva);
            kuva.style.display = DisplayStyle.None;
            kelausYlos = Kelausrivi("edelliset", KelausYlosIkoni, -1);
            liuska.Add(kelausYlos);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-liuska__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            liuska.Add(vieritys);
            kelausAlas = Kelausrivi("lisää", Ikonit.NuoliAlas, 1);
            liuska.Add(kelausAlas);
            vieritys.verticalScroller.valueChanged += _ => PaivitaKelaus();
            vieritys.contentContainer.RegisterCallback<GeometryChangedEvent>(_ => PaivitaKelaus());
            vieritys.contentViewport.RegisterCallback<GeometryChangedEvent>(_ => PaivitaKelaus());
            rivit = Rakenne.El("mk-liuska__rivit", vieritys, PickingMode.Ignore);
            // Löydös 146: mallin Iowan Old Style (ennen webin Atlas-kursiivi).
            Kirjasimet.Aseta(liuska, Kirjasin.Luku);

            kerros.JokaRuutu += Asemoi;
            kerros.JokaRuutu += Animoi;
            UiSisalto.LehdetSaapuivat += LehdetSaapuivat; // kylmäkäynnistys: kansikuva lehdistä myöhemmin
            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        // E1 (web kaupunkiliuska ilman sulkunappia): kartan napautus liuskan ohi sulkee, samoin saman merkin
        // uudelleennapautus. Veto ei sulje (web kuunteleSulkevaNapautus: liike < 6 px ja kesto < 700 ms).
        Vector2 ohiAlku;
        float ohiAika = -1f;

        void TarkistaOhiNapautus()
        {
            if (!Auki) { ohiAika = -1f; return; }
            var osoitin = UnityEngine.InputSystem.Pointer.current;
            if (osoitin == null || alue.panel == null) return;
            var r = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(alue.panel, new Vector2(r.x, Screen.height - r.y));
            if (osoitin.press.wasPressedThisFrame)
            {
                bool sisalla = liuska.worldBound.Contains(p);
                ohiAika = sisalla ? -1f : Time.unscaledTime;
                ohiAlku = p;
            }
            if (!osoitin.press.wasReleasedThisFrame || ohiAika < 0f) return;
            bool napautus = (p - ohiAlku).magnitude < 6f && Time.unscaledTime - ohiAika < 0.7f;
            ohiAika = -1f;
            if (!napautus) return;
            string k = kaupunki;
            // Seuraavassa ruudussa: toisen kaupungin napautus on jo vaihtanut liuskan sisällön, eikä sitä suljeta.
            alue.schedule.Execute(() => { if (Auki && kaupunki == k) Sulje(); }).StartingIn(50);
        }

        /// <summary>
        /// Joka ruutu (löydös 146): iPhonella liuska kaupungin yläpuolelle keskitettynä 16 pt rakoon (ei mahdu → alle),
        /// iPadilla 24 pt merkin oikealle (ei mahdu → vasemmalle) pystyssä keskitettynä; aina ruudun kalusteiden
        /// väliin. Liuska näkyy vasta asemoituna; merkki pallon takana → liuska piiloon.
        /// </summary>
        void Asemoi()
        {
            if (!Auki || alue.panel == null) return;
            float W = alue.layout.width, H = alue.layout.height;
            if (float.IsNaN(W) || W <= 0) return;
            bool tabletti = UiKerros.Tabletti;
            // Leveys ja kuvan korkeus (3:2; UITK:ssa ei aspect-ratiota) ennen sijoitusta.
            float leveys = Leveys(W);
            if (leveys != asetettuLeveys)
            {
                asetettuLeveys = leveys;
                liuska.style.width = leveys;
                kuva.style.height = KuvanKorkeus(leveys);
            }
            var t = kerros.Reunat(UiKerros.Matkavalinta);
            float yla = t.y + Ylapalkki.Varaus + Ylavara, ala = H - t.w - Ylavara;
            float katto = ala - yla;
            if (!tabletti) katto = Mathf.Min(katto, Mathf.Round(H * KorkeudenOsuus));
            katto = Mathf.Max(katto, 2 * Reunus + KuvanKorkeus(leveys) + 3 * RivinKorkeus);
            if (!Mathf.Approximately(liuska.resolvedStyle.maxHeight.value, katto)) liuska.style.maxHeight = katto;

            Vector2 r = default;
            if (kierto == null) kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            float w = liuska.layout.width, h = liuska.layout.height;
            bool nakyy = !double.IsNaN(lat) && kierto != null && kierto.RuutuPiste(lat, lon, out r)
                && !float.IsNaN(w) && Mathf.Abs(w - leveys) < 1f && h > 0;
            var v = nakyy ? Visibility.Visible : Visibility.Hidden;
            if (liuska.style.visibility.value != v) liuska.style.visibility = v;
            if (!nakyy) return;
            var p = alue.WorldToLocal(RuntimePanelUtils.ScreenToPanel(alue.panel, new Vector2(r.x, Screen.height - r.y)));
            float vasen = t.x + Reunavara, oikea = W - t.z - Reunavara;
            float x, y;
            if (tabletti)
            {
                x = p.x + RakoTabletti;
                if (x + w > oikea) x = p.x - RakoTabletti - w;
                y = p.y - h / 2f;
            }
            else
            {
                x = p.x - w / 2f;
                y = p.y - Rako - h;
                if (y < yla) y = p.y + Rako; // ei mahdu ylle → alle
            }
            x = Mathf.Round(Mathf.Clamp(x, vasen, Mathf.Max(vasen, oikea - w)));
            y = Mathf.Round(Mathf.Clamp(y, yla, Mathf.Max(yla, ala - h)));
            if (liuska.resolvedStyle.left != x) liuska.style.left = x;
            if (liuska.resolvedStyle.top != y) liuska.style.top = y;
        }

        // --- avausanimaatio (löydös 146) ----------------------------------------------------

        static float Helpotus(float x)
        {
            x = Mathf.Clamp01(x);
            float y = 1f - x;
            return 1f - y * y * y; // ease-out, ei pomppua
        }

        /// <summary>Rivin i peittävyys hetkellä t (ms avauksesta): 30 ms portain, viimeisen alku enintään 150 ms.</summary>
        static float Porras(int i, float t) => Helpotus((t - Mathf.Min(EnsimmainenMs + i * PorrasMs, ViimeinenMs)) / RiviMs);

        /// <summary>Kehysanimaatio: kuva ja rivit porrastetusti. Rivit rakennetaan uudelleen datan saapuessa, joten
        /// peittävyys lasketaan joka ruudussa ajasta eikä USS-siirtyminä (uusi rivi jatkaa samasta kohdasta).</summary>
        void Animoi()
        {
            if (!Auki || liuska.style.visibility.value != Visibility.Visible) return;
            float nyt = Time.unscaledTime * 1000f;
            bool kaynnissa = false;
            if (!float.IsNaN(liikeAlku))
            {
                if (liikeAlku < 0f) liikeAlku = nyt;
                float t = nyt - liikeAlku;
                if (t >= ViimeinenMs + RiviMs && t >= KuvaMs)
                {
                    liikeAlku = float.NaN;
                    kuva.style.opacity = StyleKeyword.Null;
                    foreach (var e in rivit.Children()) e.style.opacity = StyleKeyword.Null;
                }
                else
                {
                    kaynnissa = true;
                    kuva.style.opacity = Helpotus(t / KuvaMs);
                    int i = 0;
                    foreach (var e in rivit.Children()) e.style.opacity = Porras(i++, t);
                }
            }
            if (!float.IsNaN(kuvaAlku))
            {
                if (kuvaAlku < 0f) kuvaAlku = nyt;
                float s = (nyt - kuvaAlku) / KuvaMs;
                if (s >= 1f) { kuvaAlku = float.NaN; kuvapinta.style.opacity = 1f; }
                else { kaynnissa = true; kuvapinta.style.opacity = Helpotus(s); }
            }
            // Lämpöerä: kehysanimaatio ei herätä ruudunpäivitystä itse (USS-siirtymät herättävät).
            if (kaynnissa) Ruudunpaivitys.Herata(0.1f);
        }

        /// <summary>Juuri rakennetut rivit animaation nykyiseen vaiheeseen (ennen ensimmäistä ruutua piiloon).</summary>
        void Porrasta()
        {
            if (float.IsNaN(liikeAlku)) return;
            float t = liikeAlku < 0f ? -1f : Time.unscaledTime * 1000f - liikeAlku;
            int i = 0;
            foreach (var e in rivit.Children()) e.style.opacity = t < 0f ? 0f : Porras(i++, t);
        }

        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t)
        {
            // Lehti kaupungeittain (Pelikoodari 26.9.): kansikuva saapuu LehdetSaapuivat-tapahtumana, jos ei ole jo luettu.
            UiSisalto.LataaLehti(kaupunkiId);
            if (kaupunki != kaupunkiId) nostoOdottajat.Clear();
            kaupunki = kaupunkiId;
            this.nimi = nimi ?? kaupunkiId ?? "";
            nimiAnnettu = nimi != null;
            opas = null;
            nahtavyyksia = false;
            tiedot = null;
            kategoriat = null;
            avattu = null;
            lat = lon = double.NaN;
            vieritys.scrollOffset = Vector2.zero;
            toiminnot = t ?? new KaupunkiToiminnot();
            kuvallinen = false;
            kuva.style.display = DisplayStyle.None;
            kuvapinta.style.backgroundImage = StyleKeyword.None;
            kuvapinta.style.opacity = 0f;
            // Löydös 146: liuska piiloon, kunnes Asemoi on vienyt sen uuden merkin kohdalle (ei välähdystä vanhassa paikassa).
            liuska.style.visibility = Visibility.Hidden;
            bool liike = !LinssiUi.VahennettyLiike();
            liikeAlku = liike ? -1f : float.NaN;
            kuvaAlku = float.NaN;
            kuva.style.opacity = liike ? 0f : 1f;
            RakennaRivit(null);
            if (!Auki)
            {
                Auki = true;
                // Löydös 146: kuori heti napautuksesta (ennen 420 ms kamera-ajon jälkeen, web LIUSKAN_AJO_MS); kamera
                // ajaa kortin alla ja liuska seuraa merkkiä. Vähennetty liike: ei häivytystä.
                if (liike) alue.style.transitionDuration = StyleKeyword.Null;
                else alue.style.transitionDuration = new List<TimeValue> { new TimeValue(0f) };
                alue.style.display = DisplayStyle.Flex;
                Rakenne.Nayta(alue, true, SulkuMs);
            }
            if (liike) Ruudunpaivitys.Herata(0.35f);

            UiSisalto.Lataa(() => { if (Auki && kaupunki == kaupunkiId) Tayta(UiSisalto.Kaupunki(kaupunkiId)); });
        }

        /// <summary>Näkyvän herokuvan tiedosto (kansikuva tai juliste), jotta myöhään saapuva kansikuva voi korvata julisteen.</summary>
        string kuvanTiedosto;

        /// <summary>
        /// Kylmäkäynnistys (Pelikoodari: kaupunkilehdet luetaan Valmis-tilan jälkeen, UiSisalto.LehdetSaapuivat): jos kortti avattiin
        /// ennen lehtiä ja näyttää julistetta tai ei kuvaa, kansikuva vaihtuu tilalle 120 ms:n feidillä; rivit eivät rakennu uudelleen.
        /// </summary>
        void LehdetSaapuivat()
        {
            if (!Auki || string.IsNullOrEmpty(kaupunki)) return;
            var k = UiSisalto.Kaupunki(kaupunki);
            var kansi = k != null && k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            if (kansi?.Tiedosto == null || kansi.Tiedosto == kuvanTiedosto) return;
            string id = k.Id, tiedosto = kansi.Tiedosto;
            Kuvat.Hae(tiedosto, tex =>
            {
                if (tex == null || !Auki || kaupunki != id) return;
                kuvanTiedosto = tiedosto;
                if (!kuvallinen) { kuvallinen = true; kuvanimi.text = nimi; kuva.style.display = DisplayStyle.Flex; RakennaRivit(tiedot); }
                kuvapinta.style.backgroundImage = new StyleBackground(tex);
                bool oma = !LinssiUi.VahennettyLiike();
                kuvapinta.style.opacity = oma ? 0f : 1f;
                kuvaAlku = oma ? -1f : float.NaN;
            });
        }

        void Tayta(KaupunkiTiedot k)
        {
            if (k == null) return;
            lat = k.Lat;
            lon = k.Lon;
            // Testikomento (ui kortti <id>) ei anna nimeä: kuvan päälle kaupungin oikea nimi tunnisteen sijaan.
            if (!nimiAnnettu && !string.IsNullOrEmpty(k.Nimi)) nimi = k.Nimi;
            // Löydös 146: herokuva kortin levyisenä (kansikuva tai juliste), nimi sen päällä. Kuva feidaa sisään, kun
            // tekstuuri saapuu; jos lataus epäonnistuu, nimi palaa omaksi rivikseen.
            var kansi = k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            string tiedosto = kansi?.Tiedosto ?? k.JulisteTiedosto;
            kuvanTiedosto = tiedosto;
            kuvallinen = tiedosto != null;
            if (kuvallinen)
            {
                kuvanimi.text = nimi;
                kuva.style.display = DisplayStyle.Flex;
                Kuvat.Hae(tiedosto, tex =>
                {
                    if (!Auki || kaupunki != k.Id || !kuvallinen) return;
                    if (tex == null)
                    {
                        kuvallinen = false;
                        kuva.style.display = DisplayStyle.None;
                        RakennaRivit(tiedot);
                        return;
                    }
                    kuvapinta.style.backgroundImage = new StyleBackground(tex);
                    // Avausanimaation aikana koko kuva feidaa jo; myöhään saapuva kuva feidaa omana 120 ms:naan.
                    bool oma = float.IsNaN(liikeAlku) && !LinssiUi.VahennettyLiike();
                    kuvapinta.style.opacity = oma ? 0f : 1f;
                    kuvaAlku = oma ? -1f : float.NaN;
                });
            }
            tiedot = k;
            RakennaRivit(k);
            // Nostokategoriat (web liuskan kategoriarivit): kaupungin sisäiset nostot aiheittain.
            KaupunkiNostot.Hae(k.Id, l =>
            {
                if (!Auki || kaupunki != k.Id) return;
                kategoriat = l;
                RakennaRivit(k);
                var odottajat = nostoOdottajat.ToArray();
                nostoOdottajat.Clear();
                foreach (var a in odottajat) a();
            });
            // Nähtävyydet-rivi, kun kaupungilla on kohdekartta (web KAUPUNKIKARTAT).
            Kohdekartat.Hae(k.Id, kk =>
            {
                if (kk == null || !Auki || kaupunki != k.Id) return;
                nahtavyyksia = true;
                RakennaRivit(k);
            });
            // Turistiopas-rivi, kun oppaan artikkeli on (kaupunkilehdet ladataan tarvittaessa).
            LehtiSisalto.HaeOpas(k.Id, o =>
            {
                if (o == null || !Auki || kaupunki != k.Id) return;
                opas = o;
                RakennaRivit(k);
            });
        }

        /// <summary>Web liuskanRivit: (kaupungin rivi,) Nähtävyydet, Turistiopas, siirto, hiusviiva ja kategoriat.</summary>
        void RakennaRivit(KaupunkiTiedot k)
        {
            rivit.Clear();
            var t = toiminnot;
            // Kaupungin oma rivi = kaupunkilehti (web PAATOKSET 34 kohta 8). Löydös 146: kuvallisella kaupungilla nimi
            // on kuvan päällä ja lehti aukeaa kuvan napautuksesta; ilman kuvaa nimi on rivinä kuten ennen.
            lehti = t.LueLehti != null && (k == null || k.Lehti) ? t.LueLehti : null;
            kuva.SetEnabled(lehti != null);
            rivit.EnableInClassList("mk-liuska__rivit--kuvan-alla", kuvallinen);
            if (!kuvallinen) Rivi(nimi, lehti, "mk-liuska__rivi--nimi");
            if (nahtavyyksia)
            {
                string id = kaupunki;
                Rivi("Nähtävyydet", () => UiNakymat.Hae()?.Nahtavyysnakyma.Avaa(id));
            }
            if (opas != null)
            {
                var o = opas;
                Rivi("Turistiopas", () => UiNakymat.Hae()?.Nahtavyydet.AvaaOpas(o));
            }
            if (t.Liiku != null) Rivi(t.LiikuTeksti ?? "Liiku tänne", t.Liiku);
            if (t.Mannerlento != null) Rivi(t.MannerlentoTeksti ?? "Mannerlento", t.Mannerlento);
            Haitari();
            Porrasta();
        }

        // --- nostokategoriat haitarina (web liuskanRivit) -----------------------------------

        VisualElement Haitari()
        {
            if (kategoriat == null || kategoriat.Count == 0) return null;
            VisualElement avattuRivi = null;
            // Hiusviiva omana rivinään (web piirraLiuskanRivi 'hiusviiva').
            var viivarivi = Rakenne.El("mk-liuska__viivarivi", rivit, PickingMode.Ignore);
            Rakenne.El("mk-liuska__hiusviiva", viivarivi, PickingMode.Ignore);
            foreach (var kat in kategoriat)
            {
                var k = kat;
                bool auki = avattu == k.Aihe;
                var b = Rakenne.Nappi(null, "mk-liuska__rivi mk-liuska__kategoria", () => { if (Auki) VaihdaKategoria(k.Aihe); }, rivit);
                b.EnableInClassList("mk-liuska__rivi--auki", auki);
                var pallo = Rakenne.El("mk-liuska__pallo", b, PickingMode.Ignore);
                pallo.style.backgroundColor = Kuviot.Vari(k.Vari);
                Rakenne.Teksti(k.Nimi, "mk-liuska__nimi", b);
                // Löydös 146: lukumäärä himmeänä oikealla (ennen otsikossa sulkeissa).
                Maara(k.Maara.ToString(), b);
                if (!auki) continue;
                avattuRivi = b;
                foreach (var n in k.Jasenet)
                {
                    var nosto = n;
                    var r = Rakenne.Nappi(null, "mk-liuska__rivi mk-liuska__kohde", () => { if (Auki) AvaaNosto(nosto); }, rivit);
                    Rakenne.Teksti(nosto.Nimi, "mk-liuska__nimi", r);
                }
            }
            return avattuRivi;
        }

        /// <summary>Kategorian napautus: avaa (edellinen sulkeutuu) tai sulkee avatun. Uusi alkaa aina alusta.</summary>
        void VaihdaKategoria(string aihe)
        {
            avattu = avattu == aihe ? null : aihe;
            rivit.Clear();
            RakennaRivit(tiedot);
            if (avattu == null) return;
            foreach (var e in rivit.Children())
                if (e.ClassListContains("mk-liuska__rivi--auki")) { Rakenne.Vierita(vieritys, e, 60); break; }
        }

        /// <summary>Kohderivi: liuska kiinni (web liuska = null) ja noston kortti auki.</summary>
        void AvaaNosto(KaupunkiNosto n)
        {
            Sulje();
            n.Avaa();
        }

        // --- kelausrivit (web kelattuLiuska) ------------------------------------------------

        Button Kelausrivi(string teksti, string ikoni, int suunta)
        {
            var b = Rakenne.Nappi(teksti, "mk-liuska__kelaus", () => { if (Auki) Kelaa(suunta); }, null, ikoni);
            b.style.display = DisplayStyle.None;
            return b;
        }

        float Liikkumavara => Mathf.Max(0f, vieritys.contentContainer.layout.height - vieritys.contentViewport.layout.height);

        void PaivitaKelaus()
        {
            float vara = Liikkumavara, y = vieritys.scrollOffset.y;
            bool ylos = vara > 1f && y > 1f, alas = vara > 1f && y < vara - 1f;
            var ny = ylos ? DisplayStyle.Flex : DisplayStyle.None;
            var na = alas ? DisplayStyle.Flex : DisplayStyle.None;
            if (kelausYlos.style.display != ny) kelausYlos.style.display = ny;
            if (kelausAlas.style.display != na) kelausAlas.style.display = na;
        }

        /// <summary>Kelausrivi siirtää näkyvää alaa; liuska pysyy auki (web kohta 5, askel = ikkuna − 2 riviä).</summary>
        public void Kelaa(int suunta)
        {
            float ikkuna = vieritys.contentViewport.layout.height;
            if (float.IsNaN(ikkuna) || ikkuna <= 0) return;
            float askel = Mathf.Max(RivinKorkeus, ikkuna - 2 * RivinKorkeus);
            float y = Mathf.Clamp(vieritys.scrollOffset.y + suunta * askel, 0f, Liikkumavara);
            vieritys.scrollOffset = new Vector2(0, y);
            PaivitaKelaus();
        }

        // --- testikomento (ui kaupunki <id> …) ---------------------------------------------

        /// <summary>Kutsuu toiminnon, kun nykyisen kaupungin nostokategoriat on ladottu liuskaan.</summary>
        public void KunNostot(Action a)
        {
            if (a == null) return;
            if (Auki && kategoriat != null) a();
            else nostoOdottajat.Add(a);
        }

        /// <summary>Kategoriat tekstinä: "Skandaalit (3): Mona Lisan varkaus, …; Muut (1): …".</summary>
        public string Kuvaus() => kategoriat == null ? "ei ladattu" : kategoriat.Count == 0 ? "ei nostoja"
            : string.Join("; ", kategoriat.Select(k => k.Otsikko + ": " + string.Join(", ", k.Jasenet.Select(n => n.Nimi))));

        /// <summary>Avaa kategorian aiheella tai järjestysnumerolla (1…); null = ensimmäinen.</summary>
        public string AvaaKategoria(string aihe)
        {
            if (kategoriat == null || kategoriat.Count == 0) return "ei nostokategorioita";
            var k = aihe == null ? kategoriat[0]
                : int.TryParse(aihe, out var nro) && nro >= 1 && nro <= kategoriat.Count ? kategoriat[nro - 1]
                : kategoriat.Find(x => x.Aihe == aihe || string.Equals(x.Nimi, aihe, StringComparison.OrdinalIgnoreCase));
            if (k == null) return "ei kategoriaa " + aihe;
            if (avattu != k.Aihe) VaihdaKategoria(k.Aihe);
            return null;
        }

        /// <summary>Napauttaa avatun kategorian n:ttä kohderiviä (1…).</summary>
        public string NapautaKohde(int n)
        {
            var k = kategoriat?.Find(x => x.Aihe == avattu);
            if (k == null) return "ei avattua kategoriaa";
            if (n < 1 || n > k.Maara) return "kohteita on " + k.Maara;
            AvaaNosto(k.Jasenet[n - 1]);
            return null;
        }

        /// <summary>Yläryhmän rivi (web nimiö) ja himmeä nuoli oikealla; toiminto null = pelkkä teksti ilman nuolta.</summary>
        void Rivi(string teksti, Action toiminto, string luokka = null)
        {
            var b = Rakenne.Nappi(null, "mk-liuska__rivi" + (luokka != null ? " " + luokka : ""), () => { if (Auki) toiminto?.Invoke(); }, rivit);
            b.SetEnabled(toiminto != null);
            Rakenne.Teksti(teksti, "mk-liuska__nimi", b);
            if (toiminto != null) Maara("›", b);
        }

        /// <summary>Löydös 146: himmeä lukumäärä tai nuoli rivin oikeassa reunassa (mallin American Typewriter 12).</summary>
        static void Maara(string teksti, VisualElement rivi) =>
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-liuska__maara", rivi), Kirjasin.Kone);

        /// <summary>Piilottaa liuskan kutsumatta Sulje-toimintoa (kutsuja siirtyy muualle).</summary>
        public void Piilota()
        {
            if (!Auki) return;
            Auki = false;
            liikeAlku = kuvaAlku = float.NaN;
            // Löydös 146: sulku 100 ms (USS .mk-kaupunkikortti-alue ease-in).
            Rakenne.Nayta(alue, false, SulkuMs);
        }

        /// <summary>Ohi-napautus: piilottaa ja kertoo kutsujalle.</summary>
        public void Sulje()
        {
            if (!Auki) return;
            var s = toiminnot?.Sulje;
            Piilota();
            s?.Invoke();
        }
    }
}
