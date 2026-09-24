// KAUPUNKILIUSKA (Natiivi-UI; löydös 48, omistaja 25.9.2026 klo 00.1x, sitova): kaupungin napautus avaa webin
// kaupunkiliuskan kaupunkimerkin viereen (js/pallolauta/kaupunkiliuska.js liuskanRivit, nostot.js piirraLiuskanRivi,
// css .pallolauta-viuhka-pohja ja .nostosym-nimio). Ennen: iso pergamenttikortti ruudun alaosaan.
//
//   Pariisi                          (kaupungin rivi = kaupunkilehti)
//   Nähtävyydet                      (kaupungilla on kohdekartta)
//   Turistiopas                      (oppaan artikkeli)
//   Liiku tänne / Mannerlento        (vain kun tarjolla)
//   ───────                          (hiusviiva omana rivinään)
//   ● Kadonneet ihmeet (3)           (nostokategoriat haitarina: toisen avaus sulkee edellisen)
//        Mona Lisan varkaus          (kohderivi sisennettynä: liuska kiinni ja nosto auki)
//
// Mitat webistä (mitattu 25.9. b12, lokit/pariteetti-b12/web-liuska-mitat.txt, iPhone ja iPad samat): Liberation
// Serif kursiivi 13 px (liuskanKirjasinPx lattia), riviväli 1,45 × = 18,85, teksti 33,5 px pohjan vasemmasta
// reunasta, väripallo ⌀ 5,7 keskellä 23,1 px, oikea vara 20,4, ylä ja ala 18,5; hiusviiva 29,2 px:stä,
// rgba(58, 47, 36, .35); pohja neljä pyöristettyä kerrosta #efdcb4 peittävyydellä .11 / .24 / .38 / .58 (sisennys 0 /
// 4,5 / 8 / 10). Paikka: 15 px merkin oikealle (ei mahdu → vasemmalle), pystyssä merkin kohdalle keskitettynä,
// ruudun kalusteiden väliin (web LIUSKAN_YLAVARA_PX 18), leveys enintään 78 % ruudusta (LIUSKAN_LEVEYDEN_OSUUS).
// Liuska seuraa merkin ruutupistettä joka ruudussa (PalloKierto.RuutuPiste) ja aukeaa kamera-ajon jälkeen
// (web LIUSKAN_AJO_MS 420). Hyväksytty poikkeama: pieni herokuva liuskan yläosassa (omistaja 25.9.).
// Ei sulkunappia: kartan napautus liuskan ohi sulkee (web kuunteleSulkevaNapautus). Kelausrivit, kun rivit eivät
// mahdu (web kelattuLiuska). Toiminnot antaa PeliOhjain (KaupunkiToiminnot, null = rivi piiloon).
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

        // Web: LIUSKAN_RIVIVALI_KERROIN 1,45 × 13 px, LIUSKAN_YLAVARA_PX 18, LIUSKAN_LEVEYDEN_OSUUS 0,78, LIUSKAN_AJO_MS 420.
        const float RivinKorkeus = 18.85f, Rako = 15f, Ylavara = 18f, LeveydenOsuus = 0.78f, Reunavara = 8f;
        const long AvausViive = 420;
        static readonly string KelausYlosIkoni = "<path d=\"M5.5 15 12 8.5 18.5 15\"/>";

        readonly UiKerros kerros;
        readonly VisualElement alue, liuska, kuva, rivit;
        readonly ScrollView vieritys;
        readonly Button kelausYlos, kelausAlas;
        KaupunkiToiminnot toiminnot;
        string kaupunki, nimi;
        double lat = double.NaN, lon = double.NaN;
        OpasArtikkeli opas;
        bool nahtavyyksia;
        KaupunkiTiedot tiedot;
        PalloKierto kierto;
        /// <summary>Nostokategoriat (null = ei vielä ladattu), avattu kategoria (null = kaikki kiinni).</summary>
        List<NostoKategoria> kategoriat;
        string avattu;
        readonly List<Action> nostoOdottajat = new List<Action>();
        int avausVersio;

        public bool Auki { get; private set; }
        /// <summary>Liuska ei ole alareunan paneeli: pulu ja Liiku eivät väistä sitä (web: liuska kartalla).</summary>
        public VisualElement Alue => null;
        public string Kaupunki => Auki ? kaupunki : null;

        public KaupunkiKortti(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Matkavalinta);
            kerros.Turva(UiKerros.Matkavalinta);

            // Koko ruudun läpinäkyvä alue; vain liuska ottaa kosketukset.
            alue = Rakenne.El("mk-kaupunkikortti-alue", juuri, PickingMode.Ignore);
            alue.style.display = DisplayStyle.None;
            liuska = Rakenne.El("mk-liuska", alue);
            // Pehmeäreunainen paperi (web .pallolauta-viuhka-pohja neljänä kerroksena).
            for (int i = 0; i < 4; i++) Rakenne.El("mk-liuska__pohja mk-liuska__pohja--" + i, liuska, PickingMode.Ignore);
            kuva = Rakenne.El("mk-liuska__kuva", liuska, PickingMode.Ignore);
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
            Kirjasimet.Aseta(liuska, Kirjasin.Atlas);

            kerros.JokaRuutu += Asemoi;
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
        /// Joka ruutu: liuska kaupunkimerkin oikealle (ei mahdu → vasemmalle), pystyssä merkin kohdalle
        /// keskitettynä ja ruudun kalusteiden väliin. Merkki pallon takana → liuska piiloon.
        /// </summary>
        void Asemoi()
        {
            if (!Auki || alue.panel == null || double.IsNaN(lat)) return;
            if (kierto == null) kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            Vector2 r = default;
            bool nakyy = kierto != null && kierto.RuutuPiste(lat, lon, out r);
            var v = nakyy ? Visibility.Visible : Visibility.Hidden;
            if (liuska.style.visibility.value != v) liuska.style.visibility = v;
            if (!nakyy) return;
            var p = alue.WorldToLocal(RuntimePanelUtils.ScreenToPanel(alue.panel, new Vector2(r.x, Screen.height - r.y)));
            float W = alue.layout.width, H = alue.layout.height, w = liuska.layout.width, h = liuska.layout.height;
            if (float.IsNaN(W) || W <= 0 || float.IsNaN(w) || w <= 0) return;
            var t = kerros.Reunat(UiKerros.Matkavalinta);
            float yla = t.y + Ylapalkki.Varaus + Ylavara, ala = H - t.w - Ylavara;
            float katto = Mathf.Max(4 * RivinKorkeus, ala - yla);
            if (!Mathf.Approximately(liuska.resolvedStyle.maxHeight.value, katto)) liuska.style.maxHeight = katto;
            float leveys = Mathf.Round(W * LeveydenOsuus);
            if (!Mathf.Approximately(liuska.resolvedStyle.maxWidth.value, leveys)) liuska.style.maxWidth = leveys;
            float vasen = t.x + Reunavara, oikea = W - t.z - Reunavara;
            float x = p.x + Rako;
            if (x + w > oikea) x = p.x - Rako - w;
            x = Mathf.Round(Mathf.Clamp(x, vasen, Mathf.Max(vasen, oikea - w)));
            float y = Mathf.Round(Mathf.Clamp(p.y - h / 2f, yla, Mathf.Max(yla, ala - h)));
            if (liuska.resolvedStyle.left != x) liuska.style.left = x;
            if (liuska.resolvedStyle.top != y) liuska.style.top = y;
        }

        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t)
        {
            if (kaupunki != kaupunkiId) nostoOdottajat.Clear();
            kaupunki = kaupunkiId;
            this.nimi = nimi ?? kaupunkiId ?? "";
            opas = null;
            nahtavyyksia = false;
            tiedot = null;
            kategoriat = null;
            avattu = null;
            lat = lon = double.NaN;
            vieritys.scrollOffset = Vector2.zero;
            toiminnot = t ?? new KaupunkiToiminnot();
            kuva.style.display = DisplayStyle.None;
            kuva.style.backgroundImage = StyleKeyword.None;
            RakennaRivit(null);
            if (!Auki)
            {
                Auki = true;
                // Kamera ajaa ensin, liuska aukeaa sen jälkeen (web lauta.js: ajaKamera → avaaLiuskaKaupungista).
                int v = ++avausVersio;
                alue.style.display = DisplayStyle.Flex;
                liuska.style.visibility = Visibility.Hidden;
                alue.schedule.Execute(() => { if (Auki && v == avausVersio) Rakenne.Nayta(alue, true, 180); }).StartingIn(AvausViive);
            }

            UiSisalto.Lataa(() => { if (Auki && kaupunki == kaupunkiId) Tayta(UiSisalto.Kaupunki(kaupunkiId)); });
        }

        void Tayta(KaupunkiTiedot k)
        {
            if (k == null) return;
            lat = k.Lat;
            lon = k.Lon;
            // Pieni herokuva (hyväksytty poikkeama webistä, omistaja 25.9.): kansikuva tai juliste.
            var kansi = k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            string tiedosto = kansi?.Tiedosto ?? k.JulisteTiedosto;
            if (tiedosto != null)
                Kuvat.Hae(tiedosto, tex =>
                {
                    if (tex == null || kaupunki != k.Id) return;
                    kuva.style.backgroundImage = new StyleBackground(tex);
                    kuva.style.display = DisplayStyle.Flex;
                });
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

        /// <summary>Web liuskanRivit: kaupungin rivi, Nähtävyydet, Turistiopas, siirto, hiusviiva ja kategoriat.</summary>
        void RakennaRivit(KaupunkiTiedot k)
        {
            rivit.Clear();
            var t = toiminnot;
            // Kaupungin oma rivi = kaupunkilehti (web PAATOKSET 34 kohta 8).
            Rivi(nimi, t.LueLehti != null && (k == null || k.Lehti) ? t.LueLehti : null);
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
                Rakenne.Teksti(k.Otsikko, "mk-liuska__nimi", b);
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

        /// <summary>Yläryhmän rivi (web nimiö): toiminto null = pelkkä teksti (kaupungilla ei lehteä).</summary>
        void Rivi(string teksti, Action toiminto)
        {
            var b = Rakenne.Nappi(null, "mk-liuska__rivi", () => { if (Auki) toiminto?.Invoke(); }, rivit);
            b.SetEnabled(toiminto != null);
            Rakenne.Teksti(teksti, "mk-liuska__nimi", b);
        }

        /// <summary>Piilottaa liuskan kutsumatta Sulje-toimintoa (kutsuja siirtyy muualle).</summary>
        public void Piilota()
        {
            if (!Auki) return;
            Auki = false;
            avausVersio++;
            Rakenne.Nayta(alue, false, 180);
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
