// ALOITUSNÄKYMÄ (Natiivi-UI): webin aloitusportti, #intro ja aloituskaupungin valinta
// (js/ui.js showAloitusportti, renderIntro, typeText, aloitaKartalta; css .start-gate,
// .intro-juliste, .intro-arkki, .intro-valinta).
//
//   1 PORTTI     tumma verho pallon päällä: "Laita äänet päälle 🔈", kultainen
//                "Aloita seikkailu", alhaalla linkki "Oppiminen on hauskaa" (periaatteet).
//                Tallennettu matka (PeliOhjain.TallennusOn): "Jatka matkaa" (kulta) ja
//                "Uusi matka" (haamu) — webissä tallennus jatkuu ilman porttia.
//   2 AVAUS      yläosassa 1873-juliste (◈-viivat, MATKAKIRJA, MAAILMAN YMPÄRI,
//                KAHDEKSASSAKYMMENESSÄ PÄIVÄSSÄ, punainen OSA II · UNOHDETTU AARRE)
//                sumuverhon päällä; alaosassa pergamenttiarkki, jolle paikkarivi
//                ("Heathrow, Lontoo, syyskuu 2026") ja avausteksti naputetaan sana
//                kerrallaan (web INTRO_TYPE_MS 190, tauot välimerkeistä) ja kertoja
//                lukee intro-puhe.mp3:n (Puhe). Napautus arkkiin kirjoittaa loppuun.
//                Lopuksi kehystetty nappi VALITSE ALOITUSKAUPUNKI.
//   3 VALINTA    webissä valinta tehdään pallolla (ETUSIVUN_KOHTEET); natiivissa
//                pergamenttikortti, jossa lähtökaupungit (PeliOhjain.Lahtokaupungit,
//                paketin aloitus = true) lippuineen. Valinta → Aloita(id).
// Matkan huipennus (Huipennus alla): PeliOhjain.KaikkiAarteetLoytyi → webin
// #winner-dialog ("Jatka vaeltamista" / "Uusi matka" → avausteksti ja valinta).
//
// Tekstit ovat omistajan lukitsemia (js/ui.js INTRO_TEXT, INTRO_PAIKKA, INTRO_VALINTA,
// naytaPeriaatteet): muutos webin kautta, sitten tänne sanasta sanaan.
// Pelin kulku (milloin näkymä näkyy, mihin valinta vie) on Pelikoodarin: kutsuja
// antaa kohteet ja Aloita-toiminnon (Nayta).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Aloitusnakyma
    {
        public const string IntroText = "Vintiltä löytyi isoisän matkalaukku ja kulunut "
            + "matkakirja. Juokset sisälle terminaaliin ja olet varma, että ukko "
            + "oli löytänyt jotain. Mutta kuka on repinyt kirjasta viimeisen "
            + "sivun?";
        public const string IntroPaikka = "Heathrow, Lontoo";
        public const string IntroValinta = "Valitse aloituskaupunki";
        public const string IntroPuhe = "https://media.matkakirja.app/audio/intro-puhe.mp3?v=2";
        /// <summary>Webin ETUSIVUN_KOHTEET (js/ui-apurit.js), näyttöjärjestyksessä.</summary>
        public static readonly string[] Kohteet =
        {
            "ateena", "newyork", "kairo", "rio", "mumbai", "peking", "sydney",
            "moskova", "tokio", "singapore", "kapkaupunki", "sanfrancisco", "tanger", "istanbul",
        };

        const int Tahti = 190;
        static readonly (Regex Osuu, int Tauko, int Huojunta)[] Tauot =
        {
            (new Regex("…\"?$"), 1200, 500),
            (new Regex("[.!?]$"), 620, 320),
            (new Regex("[,;:—–]$"), 300, 160),
        };

        readonly VisualElement juuri, portti, intro, arkki, valinta, valintaLista, periaatteet;
        readonly Label paikka, runko;
        readonly Button valintaNappi, aloitaNappi, jatkaNappi;
        readonly System.Random arpa = new System.Random();
        IVisualElementScheduledItem kirjoitus;
        string[] sanat;
        int sana;
        Action<string> aloita;
        Action jatka;
        IReadOnlyList<(string Id, string Nimi)> kohteet;

        public bool Auki { get; private set; }

        public Aloitusnakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-aloitus", kerros.Juuri(UiKerros.Traileri));
            juuri.style.display = DisplayStyle.None;

            // 2 AVAUS (portin alla, näkyy kun portti häipyy)
            intro = Rakenne.El("mk-aloitus__intro", juuri, PickingMode.Ignore);
            var ylaosa = Rakenne.El("mk-aloitus__ylaosa", intro, PickingMode.Ignore);
            Rakenne.Tausta(ylaosa, Kuviot.Pysty("aloitus-verho", Kuviot.Vari("#f7edd8", 0.86f), Kuviot.Vari("#f7edd8", 0f)));
            var juliste = Rakenne.El("mk-juliste", ylaosa, PickingMode.Ignore);
            Viiva(juliste);
            JulisteRivi(juliste, "MATKAKIRJA", "mk-juliste__nimi");
            JulisteRivi(juliste, "MAAILMAN YMPÄRI", "mk-juliste__yla");
            JulisteRivi(juliste, "KAHDEKSASSAKYMMENESSÄ PÄIVÄSSÄ", "mk-juliste__ala");
            JulisteRivi(juliste, "OSA II · UNOHDETTU AARRE", "mk-juliste__osa");
            Viiva(juliste);

            arkki = Rakenne.El("mk-aloitus__arkki", intro);
            Rakenne.Tausta(arkki, Kuviot.Pergamentti);
            arkki.RegisterCallback<PointerDownEvent>(_ => KirjoitaLoppuun());
            var palsta = Rakenne.El("mk-aloitus__palsta", arkki, PickingMode.Ignore);
            paikka = Rakenne.Teksti("", "mk-aloitus__paikka", palsta);
            Kirjasimet.Aseta(paikka, Kirjasin.KoneLihava);
            runko = Rakenne.Teksti("", "mk-aloitus__runko", palsta);
            Kirjasimet.Aseta(runko, Kirjasin.Kone);
            valintaNappi = Rakenne.Nappi(IntroValinta.ToUpperInvariant(), "mk-aloitus__valinta", NaytaValinta, palsta);
            Kirjasimet.Aseta(valintaNappi, Kirjasin.LukuLihava);

            // 3 VALINTA
            valinta = Rakenne.El("mk-himmennys mk-himmennys--tumma mk-aloitus__valintakerros", juuri);
            valinta.style.display = DisplayStyle.None;
            var vk = new Kortti("mk-aloitus__valintakortti");
            valinta.Add(vk);
            var vo = Rakenne.Teksti(IntroValinta, "mk-kortti__otsikko", vk.Sisus);
            Kirjasimet.Aseta(vo, Kirjasin.LukuLihava);
            var vv = new ScrollView(ScrollViewMode.Vertical);
            vv.AddToClassList("mk-aloitus__valintavieritys");
            vv.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vk.Sisus.Add(vv);
            valintaLista = Rakenne.El("mk-aloitus__kohteet", vv, PickingMode.Ignore);

            // 1 PORTTI (päällimmäisenä)
            portti = Rakenne.El("mk-aloitus__portti", juuri);
            Rakenne.Tausta(Rakenne.El("mk-aloitus__porttireuna", portti, PickingMode.Ignore), Kuviot.Vinjetti);
            var keskus = Rakenne.El("mk-aloitus__keskus", portti, PickingMode.Ignore);
            var aanet = Rakenne.El("mk-aloitus__aanet", keskus, PickingMode.Ignore);
            var at = Rakenne.Teksti("Laita äänet päälle", "mk-aloitus__aaniteksti", aanet);
            Kirjasimet.Aseta(at, Kirjasin.Kone);
            aanet.Add(new SvgIkoni(Ikonit.Viiva["kaiutin"]));
            jatkaNappi = Rakenne.Nappi("Jatka matkaa", "mk-nappi--kulta mk-aloitus__aloita", Jatka, keskus);
            Rakenne.Tausta(jatkaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(jatkaNappi, Kirjasin.KoneLihava);
            aloitaNappi = Rakenne.Nappi("Aloita seikkailu", "mk-nappi--kulta mk-aloitus__aloita", Portista, keskus);
            Rakenne.Tausta(aloitaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(aloitaNappi, Kirjasin.KoneLihava);
            var linkki = Rakenne.Nappi("Oppiminen on hauskaa", "mk-aloitus__linkki", () => Rakenne.Nayta(periaatteet, true, 250), portti);
            Kirjasimet.Aseta(linkki, Kirjasin.Kone);

            periaatteet = Periaatteet(juuri);
        }

        /// <summary>◈-aarremerkki viivaikonina (fonteissa ei ole ◈:tä).</summary>
        public static SvgIkoni Merkki(string luokka)
        {
            var m = new SvgIkoni(Ikonit.Aarremerkki);
            m.AddToClassList(luokka);
            return m;
        }

        static void JulisteRivi(VisualElement isa, string teksti, string luokka)
        {
            var l = Rakenne.Teksti(teksti, "mk-juliste__rivi " + luokka, isa);
            Kirjasimet.Aseta(l, Kirjasin.LukuLihava);
        }

        static void Viiva(VisualElement isa)
        {
            var v = Rakenne.El("mk-juliste__viiva", isa, PickingMode.Ignore);
            Rakenne.El("mk-juliste__vaakaviiva", v, PickingMode.Ignore);
            v.Add(Merkki("mk-juliste__merkki"));
            Rakenne.El("mk-juliste__vaakaviiva", v, PickingMode.Ignore);
        }

        // --- kulku ---------------------------------------------------------------------

        /// <summary>
        /// Näkymä auki portista alkaen. kohteet = lähtökaupungit (null/tyhjä = webin
        /// ETUSIVUN_KOHTEET); jatka ≠ null = tallennettu matka odottaa (Jatka matkaa).
        /// </summary>
        public void Nayta(Action<string> aloita, IReadOnlyList<(string Id, string Nimi)> kohteet = null, Action jatka = null)
        {
            this.aloita = aloita;
            this.jatka = jatka;
            this.kohteet = kohteet != null && kohteet.Count > 0 ? kohteet : Array.ConvertAll(Kohteet, id => (id, (string)null));
            jatkaNappi.style.display = jatka != null ? DisplayStyle.Flex : DisplayStyle.None;
            aloitaNappi.EnableInClassList("mk-nappi--haamu", jatka != null);
            aloitaNappi.EnableInClassList("mk-nappi--kulta", jatka == null);
            aloitaNappi.style.backgroundImage = jatka != null ? new StyleBackground(StyleKeyword.None) : new StyleBackground(Kuviot.Kulta);
            ((Label)aloitaNappi.Q<Label>()).text = jatka != null ? "Uusi matka" : "Aloita seikkailu";
            Auki = true;
            juuri.style.display = DisplayStyle.Flex;
            juuri.style.opacity = 1f;
            portti.style.display = DisplayStyle.Flex;
            portti.style.opacity = 1f;
            intro.style.opacity = 0f;
            arkki.style.opacity = 0f;
            valinta.style.display = DisplayStyle.None;
            valintaNappi.style.display = DisplayStyle.None;
            paikka.text = runko.text = "";
            SyoteLukko.Esta(this);
        }

        public void Piilota()
        {
            if (!Auki) return;
            Auki = false;
            kirjoitus?.Pause();
            juuri.style.opacity = 0f;
            juuri.schedule.Execute(() => { if (!Auki) juuri.style.display = DisplayStyle.None; }).StartingIn(900);
            SyoteLukko.Vapauta(this);
        }

        /// <summary>Suoraan avaustekstiin (huipennuksen Uusi matka): portti ohitetaan.</summary>
        public void NaytaAvaus(Action<string> aloita, IReadOnlyList<(string Id, string Nimi)> kohteet = null)
        {
            Nayta(aloita, kohteet);
            portti.style.display = DisplayStyle.None;
            Portista();
        }

        void Jatka()
        {
            var j = jatka;
            Piilota();
            j?.Invoke();
        }

        void Portista()
        {
            // Portti häipyy, juliste ja arkki nousevat (web intro-aloitettu, 0,9 s).
            portti.style.opacity = 0f;
            portti.schedule.Execute(() => portti.style.display = DisplayStyle.None).StartingIn(400);
            intro.style.opacity = 1f;
            arkki.style.opacity = 1f;
            AloitaKirjoitus();
        }

        void AloitaKirjoitus()
        {
            var nyt = DateTime.Now;
            paikka.text = IntroPaikka + ", " + nyt.ToString("MMMM", new CultureInfo("fi-FI")) + " " + nyt.Year;
            sanat = IntroText.Split(' ');
            sana = 0;
            runko.text = "";
            // Puhe: yksi puhuja kerrallaan ja musiikin vaimennus (Pelikoodarin Puhe.cs).
            Puhe.Hae()?.Soita(IntroPuhe);
            kirjoitus?.Pause();
            kirjoitus = runko.schedule.Execute(Seuraava).StartingIn(Tahti + 600);
        }

        /// <summary>Seuraava sana ja sen jälkeinen viive (web typeText + KIRJOITUSTAUOT).</summary>
        void Seuraava()
        {
            if (sanat == null || sana >= sanat.Length) { Valmis(); return; }
            string s = sanat[sana++];
            runko.text = sana == 1 ? s : runko.text + " " + s;
            if (sana >= sanat.Length) { Valmis(); return; }
            int viive = (int)(Tahti * (0.7 + 0.6 * arpa.NextDouble()));
            bool osui = false;
            foreach (var t in Tauot)
                if (t.Osuu.IsMatch(s)) { viive += t.Tauko + (int)(t.Huojunta * arpa.NextDouble()); osui = true; break; }
            if (!osui && arpa.NextDouble() < 0.15) viive += 280 + (int)(340 * arpa.NextDouble());
            kirjoitus = runko.schedule.Execute(Seuraava).StartingIn(viive);
        }

        void KirjoitaLoppuun()
        {
            if (sanat == null || sana >= sanat.Length) return;
            kirjoitus?.Pause();
            sana = sanat.Length;
            runko.text = IntroText;
            Valmis();
        }

        void Valmis()
        {
            if (valintaNappi.style.display == DisplayStyle.Flex) return;
            valintaNappi.style.display = DisplayStyle.Flex;
            valintaNappi.style.opacity = 0f;
            valintaNappi.schedule.Execute(() => valintaNappi.style.opacity = 1f);
        }

        void NaytaValinta()
        {
            // Web aloitaKartalta: avauksen puhe loppuu, kun valinta alkaa.
            Puhe.Instanssi?.Pysayta();
            Aanet.PulunTehoste("pulu.kujerrus");
            UiSisalto.Lataa(() =>
            {
                valintaLista.Clear();
                foreach (var (id, nimi) in kohteet)
                {
                    var k = UiSisalto.Kaupunki(id);
                    string kid = id;
                    var rivi = Rakenne.Nappi(null, "mk-aloitus__kohde", () => Valitse(kid), valintaLista);
                    var lippu = Rakenne.El("mk-aloitus__lippu", rivi, PickingMode.Ignore);
                    if (k != null && k.Lippu.Count > 0)
                        Kuvat.Hae(k.Lippu[0], t => { if (t != null) lippu.style.backgroundImage = new StyleBackground(t); });
                    var tekstit = Rakenne.El("mk-aloitus__kohdetekstit", rivi, PickingMode.Ignore);
                    var n = Rakenne.Teksti(k?.Nimi ?? nimi ?? id, "mk-aloitus__kohdenimi", tekstit);
                    Kirjasimet.Aseta(n, Kirjasin.LukuLihava);
                    if (!string.IsNullOrEmpty(k?.MaaNimi))
                    {
                        var m = Rakenne.Teksti(k.MaaNimi, "mk-aloitus__kohdemaa", tekstit);
                        Kirjasimet.Aseta(m, Kirjasin.Kone);
                    }
                }
                Rakenne.Nayta(valinta, true, 250);
            });
        }

        void Valitse(string id)
        {
            Rakenne.Nayta(valinta, false, 200);
            Piilota();
            aloita?.Invoke(id);
        }

        // --- periaatteet (web naytaPeriaatteet, sanasta sanaan) ------------------------

        VisualElement Periaatteet(VisualElement isa)
        {
            var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", isa);
            h.style.display = DisplayStyle.None;
            h.RegisterCallback<PointerDownEvent>(e => { if (e.target == h) Rakenne.Nayta(h, false, 250); });
            var kortti = new Kortti("mk-tietoja");
            h.Add(kortti);
            var o = Rakenne.Teksti("Oppiminen on hauskaa", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(o, Kirjasin.LukuLihava);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-tietoja__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(v);
            void K(string t) => Rakenne.Teksti(t, "mk-kortti__teksti mk-aloitus__periaate", v);
            void O(string t) { var l = Rakenne.Teksti(t.ToUpperInvariant(), "mk-tietoja__otsikko", v); Kirjasimet.Aseta(l, Kirjasin.Kone); }
            K("Matkakirja ja unohdettu aarre on seikkailupeli, jonka sivutuotteena opitaan — "
                + "ei oppikirja, johon on liimattu noppa. Pelin pitää olla "
                + "koukuttava ensin; tieto tarttuu matkassa.");
            O("Mitä pelissä opitaan");
            K("Maiden arkea ja kulttuuria, maantiedettä ja historiaa, "
                + "geopolitiikkaa ja poliittista tilannetta — ja ennen kaikkea sitä, "
                + "että maailma on suurempi kuin oma ympäristö. Jokaisella "
                + "pysähdyksellä on jotain katsottavaa: valokuva silloin ja nyt, "
                + "maan tunnusluvut, kaupungin musiikkia ja ruokaa.");
            O("Kaksi ääntä");
            K("Isoisän päiväkirja vuodelta 1873 ja nuoren Foggin havainto "
                + "tänään. Vanha ääni loistaa siinä, mikä ei ole muuttunut, ja on "
                + "toivottoman vanhentunut nimissä ja rajoissa.");
            O("Totuus ja lähteet");
            K("Jokainen väittämä on tarkistettavissa. Epävarmaa ei väitetä "
                + "eikä kiistanalaista esitetä varmana. Politiikka ja historia "
                + "kuvataan, ei tuomita: kerrotaan mitä on ja miksi.");
            O("Tekoäly apuna, ihminen päättää");
            K("Tekoäly auttaa sisällön kokoamisessa: havainnekuvat luodaan "
                + "avoimesti lisensoiduista aineistoista ja merkitään havainnekuviksi, "
                + "ja tekstit kirjoitetaan lähteistä uudelleen yhtenäiseen asuun. "
                + "Jokaisen sisällön tarkistaa ja hyväksyy ihminen.");
            O("Kunnioitus");
            K("Jokainen maa kuvataan asukkaidensa silmin — ei stereotypioita, "
                + "ei pilkkaa eikä säälittelyä, ei pelkkiä turistikliseitä. "
                + "Vaikeita aiheita ei kaunistella eikä kauhistella.");
            O("Avointa ja ilmaista");
            K("Peli on toistaiseksi ilmainen, ja sen lähdekoodi on "
                + "kaikkien luettavissa. Peliä tekee tamperelainen "
                + "Visuaaliviestinnän Instituutti (VVI). "
                + "Kuvat, äänet ja tiedot tulevat avoimista "
                + "lähteistä, ja jokaisen kohdalla lukee mistä se on ja kuka sen "
                + "on tehnyt. Peli itse on tekijänsä omaisuutta: sitä saa pelata "
                + "ja lähdekoodia lukea vapaasti, mutta julkaisuun tai omaan "
                + "tuotteeseen tarvitaan lupa.");
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Sulje", "mk-nappi--kulta", () => Rakenne.Nayta(h, false, 250), napit);
            Rakenne.Tausta(sulje, Kuviot.Kulta);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);
            return h;
        }

        // --- testi ---------------------------------------------------------------------

        /// <summary>Testikomento: portti | avaus | loppu | valinta (ilman peliä; valinta kirjataan ilmoitukseen).</summary>
        public void Testaa(string vaihe, Action<string> valittu)
        {
            Nayta(valittu, null, vaihe == "jatka" ? () => valittu("(jatka)") : (Action)null);
            if (vaihe == "jatka") return;
            if (vaihe == "portti") return;
            Portista();
            if (vaihe == "avaus") return;
            KirjoitaLoppuun();
            if (vaihe == "valinta") NaytaValinta();
        }
    }

    /// <summary>
    /// Matkan huipennus (webin #winner-dialog): kaikki unohdetut aarteet löytyivät
    /// (PeliOhjain.KaikkiAarteetLoytyi, kerran matkassa). Fablen kaanoniteksti
    /// (nuoren Foggin merkintä, luvut MatkanYhteenvedosta), "Jatka vaeltamista"
    /// (kiinni, peli jatkuu) ja "Uusi matka" (avausteksti ja lähtökaupungin valinta).
    /// </summary>
    public sealed class Huipennus
    {
        // Kaanon: docs/moduulit/huipennus-teksti.md (Fable 23.9.2026; myöhemmin paketin kautta).
        const string Otsikko = "Aarnin luettelo on täynnä";
        const string Teksti =
            "Viimeinen sivu on kirjoitettu. Aarnin luettelossa ei ole enää yhtään "
            + "aarretta, josta vain kerrotaan — jokaisen olen nähnyt omin silmin.\n\n"
            + "Isoisä lähti tälle matkalle vuonna 1873 ja jätti sen kesken. Nyt tiedän, "
            + "ettei se jäänyt kesken siksi, ettei hän olisi löytänyt. Hän löysi jotain, "
            + "mistä revitty sivu ei kerro. Ehkä hän tahtoi, että löydän sen itse.\n\n"
            + "{paivat} päivää, {kaupungit} kaupunkia, {loydot} unohdettua aarretta. "
            + "Matkakirja on täynnä, mutta maailma ei ole. Isoisä kirjoitti kerran: "
            + "\"Matka ei lopu siihen, että saapuu.\"";

        readonly VisualElement himmennys;
        readonly Label teksti;
        Action uusiMatka;
        public bool Auki { get; private set; }

        public Huipennus(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            var kortti = new Kortti("mk-huipennus");
            himmennys.Add(kortti);
            kortti.Sisus.Add(Aloitusnakyma.Merkki("mk-huipennus__merkki"));
            var o = Rakenne.Teksti(Otsikko, "mk-kortti__otsikko mk-huipennus__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(o, Kirjasin.LukuLihava);
            teksti = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var jatka = Rakenne.Nappi("Jatka vaeltamista", "mk-nappi--haamu", Sulje, napit, Ikonit.Viiva["kompassi"]);
            Kirjasimet.Aseta(jatka, Kirjasin.Kone);
            var uusi = Rakenne.Nappi("Uusi matka", "mk-nappi--kulta", () => { Sulje(); uusiMatka?.Invoke(); }, napit);
            Rakenne.Tausta(uusi, Kuviot.Kulta);
            Kirjasimet.Aseta(uusi, Kirjasin.KoneLihava);
        }

        public void Nayta(MatkanYhteenveto yv, Action uusiMatka)
        {
            this.uusiMatka = uusiMatka;
            teksti.text = Teksti
                .Replace("{paivat}", (yv?.Paivat ?? 0).ToString())
                .Replace("{kaupungit}", (yv?.Kaupungit ?? 0).ToString())
                .Replace("{loydot}", (yv?.Aarteet ?? 0).ToString());
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }
    }
}
