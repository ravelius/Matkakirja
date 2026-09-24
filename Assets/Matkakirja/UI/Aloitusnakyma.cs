// ALOITUSNÄKYMÄ (Natiivi-UI): webin aloitusportti, #intro ja aloituskaupungin valinta
// (js/ui.js showAloitusportti, renderIntro, typeText, aloitaKartalta; css .start-gate,
// .intro-juliste, .intro-arkki, .intro-valinta).
//
//   1 PORTTI     tumma verho pallon päällä; yläosassa heti sama 1873-juliste kuin avauksessa
//                ja yksi lause pelistä (Fablen kaanonlause 23.9.2026) —
//                Laitetestaajan ensikokemus 23.9.: pelkkä pyörivä pallo ei kertonut pelistä
//                mitään. Kehystetty nappi "Laita äänet päälle 🔈" (laittaa Äänimaiseman
//                päälle ja kuittaa "Äänet päällä"), kultainen "Aloita seikkailu",
//                alhaalla linkki "Oppiminen on hauskaa" (periaatteet).
//                Tallennettu matka (PeliOhjain.TallennusOn): "Jatka matkaa" (kulta) ja
//                "Uusi matka" (haamu) — webissä tallennus jatkuu ilman porttia.
// ALOITUSKAAVA (omistaja 23.9.2026, Raamattu, sitova; Fablen tarkennus 24.9.): portti → kartta
// (lähtökaupungit korostettuina, napautus valitsee suoraan kuten webin doPickStart, ei vahvistusta)
// → lento Lontoosta valittuun kaupunkiin (kamera ja lentokaari
// Natiivisepältä, koneen ääni ja isoisän intro-luenta Pelikoodarilta). Avausteksti naputetaan
// LENNON AIKANA pallon päälle pergamenttikaistaleelle (LentoKirjoitus), ei omalle ruudulleen.
// Alla vaiheet 2 ja 3 kuvaavat osia, joista kaava koostuu.
//
//   2 AVAUS      yläosassa 1873-juliste (◈-viivat, MATKAKIRJA, MAAILMAN YMPÄRI,
//                KAHDEKSASSAKYMMENESSÄ PÄIVÄSSÄ, punainen OSA II · UNOHDETTU AARRE)
//                sumuverhon päällä; alaosassa pergamenttiarkki, jolle paikkarivi
//                ("Heathrow, Lontoo, syyskuu 2026") ja avausteksti naputetaan sana
//                kerrallaan (web INTRO_TYPE_MS 190, tauot välimerkeistä) ja kertoja
//                lukee intro-puhe.mp3:n (Puhe). Napautus arkkiin kirjoittaa loppuun.
//                Lopuksi kehystetty nappi VALITSE ALOITUSKAUPUNKI.
//   3 VALINTA    pallolla kuten webissä (js/ui.js aloitaPallolta, js/pallolauta/lauta.js
//                aloitusnakyma/aloitusKohteet; omistaja 23.9.2026: "valitaan KARTALTA"):
//                verho häipyy, kamera ajetaan kiinteään valintanäkymään (30° N, 17° E,
//                pallon säde 0,55 ruudun korkeudesta, Lontoo ja Ateena mahtuvat kuvaan),
//                näkyvissä vain Lontoo ja lähtökaupungit (PeliOhjain.Lahtokaupungit,
//                paketin aloitus = true), ja jokaisella valittavalla on sykkivä kultapiste
//                (Natiivisepän Karttapisteet, web .pallolauta-huomio #eab84e). Napautus
//                kaupunkiin tai pisteeseen valitsee suoraan (web doPickStart) → Aloita(id).
//                Ilman palloa (3D ei käytössä) varana pergamenttikortti lippuineen.
// Matkan huipennus (Huipennus alla): PeliOhjain.KaikkiAarteetLoytyi → webin
// #winner-dialog ("Jatka vaeltamista" / "Uusi matka" → avausteksti ja valinta).
//
// Tekstit ovat omistajan lukitsemia: ne luetaan sisältöpaketista (moduulit/js/ui-tekstit.json:
// INTRO_TEXT, INTRO_PAIKKA, INTRO_VALINTA, PERIAATTEET — webin js/ui-tekstit.js). Koodin
// vakiot ovat vain vara, jos paketissa ei vielä ole moduulia.
// Pelin kulku (milloin näkymä näkyy, mihin valinta vie) on Pelikoodarin: kutsuja
// antaa kohteet ja Aloita-toiminnon (Nayta).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using Unity.Mathematics;
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
        /// <summary>
        /// Avauslennon ainoa rivi (web js/packs/maailma.js flightFirst, luenta puhe-lento-alku.mp3 = luennat "lento-alku";
        /// omistaja 24.9.2026 löydös 23a). Paketin ui-tekstit FLIGHT_FIRST korvaa; tämä on vara.
        /// </summary>
        public const string LentoTeksti = "Kone nousee. Isoisän kirja aukeaa sylissäni kuin se olisi odottanut tätä hetkeä.";
        /// <summary>Lennon luennan tunniste Puhe.SoivaUrl:ssa (Pelikoodari soittaa luennat "lento-alku" koneen lähtiessä).</summary>
        public const string LentoPuheTunniste = "puhe-lento-alku";
        public const string LentoPuhe = "https://media.matkakirja.app/audio/puhe-lento-alku.mp3?v=2";
        /// <summary>Varalista, jos pelin Lahtokaupungit() ei ole saatavilla (webin ETUSIVUN_KOHTEET).</summary>
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

        /// <summary>
        /// Aloitus auki / kiinni (portti, avausteksti ja pallovalinta): webin aloitusnäkymässä ei ole
        /// karttaselitteen eikä linssien nappia (pariteetti 24.9. rivi 2), joten ne piiloutuvat tämän ajan.
        /// </summary>
        public static event Action<bool> AukiMuuttui;
        public static bool AloitusAuki { get; private set; }

        void AsetaAuki(bool auki)
        {
            Auki = auki;
            if (AloitusAuki == auki) return;
            AloitusAuki = auki;
            AukiMuuttui?.Invoke(auki);
        }

        /// <summary>
        /// Portti näkyy (Aloita seikkailu / Jatka matkaa): kameran puoli sumentaa pallon sen ajan (web .start-gate
        /// backdrop-filter 6px; Natiiviseppä, löydös 17). Tapahtuu vain tilan muuttuessa.
        /// </summary>
        public static event Action<bool> PorttiMuuttui;
        public static bool PorttiAuki { get; private set; }

        static void AsetaPortti(bool auki)
        {
            if (PorttiAuki == auki) return;
            PorttiAuki = auki;
            PorttiMuuttui?.Invoke(auki);
            // Kameran puoli: pallo täyttää ruudun ja sumenee 6 pt, merkit piiloon (Natiiviseppä, löydös 17).
            PalloKierto.PorttiSumea = auki;
        }

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
            valintaNappi = Rakenne.Nappi(introValinta.ToUpperInvariant(), "mk-aloitus__valinta", NaytaValinta, palsta);
            Kirjasimet.Aseta(valintaNappi, Kirjasin.LukuLihava);

            // 3 VALINTA
            valinta = Rakenne.El("mk-himmennys mk-himmennys--tumma mk-aloitus__valintakerros", juuri);
            valinta.style.display = DisplayStyle.None;
            var vk = new Kortti("mk-aloitus__valintakortti");
            valinta.Add(vk);
            valintaOtsikko = Rakenne.Teksti(introValinta, "mk-kortti__otsikko", vk.Sisus);
            var vo = valintaOtsikko;
            Kirjasimet.Aseta(vo, Kirjasin.LukuLihava);
            var vv = new ScrollView(ScrollViewMode.Vertical);
            vv.AddToClassList("mk-aloitus__valintavieritys");
            vv.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vk.Sisus.Add(vv);
            valintaLista = Rakenne.El("mk-aloitus__kohteet", vv, PickingMode.Ignore);

            // 1 PORTTI (päällimmäisenä)
            portti = Rakenne.El("mk-aloitus__portti", juuri);
            // Web .start-gate: radial-gradient(ellipse at 50% 50%, rgba(36,26,18,.28) 40%, rgba(36,26,18,.6) 100%)
            // koko ruudun pallon päällä (omistaja 24.9., build 5 -löydös 17). Sumennus (web backdrop-filter 6px)
            // tulee kameran puolelta (Natiiviseppä); UI Toolkit ei sumenna 3D-kuvaa.
            Rakenne.Tausta(Rakenne.El("mk-aloitus__porttireuna", portti, PickingMode.Ignore),
                Kuviot.Soikio("aloitus-portti", new Color(36 / 255f, 26 / 255f, 18 / 255f, 0.28f), new Color(36 / 255f, 26 / 255f, 18 / 255f, 0.6f), 0.4f));
            // Omistaja 24.9.2026 (löydös 24, web showAloitusportti): portissa ei julistetta eikä ingressiä —
            // vain äänirivi, Aloita seikkailu ja Oppiminen on hauskaa. Elementit jäävät piiloon.
            var porttiYla = Rakenne.El("mk-aloitus__ylaosa mk-aloitus__porttiyla", portti, PickingMode.Ignore);
            Rakenne.Tausta(porttiYla, Kuviot.Pysty("aloitus-verho", Kuviot.Vari("#f7edd8", 0.86f), Kuviot.Vari("#f7edd8", 0f)));
            var porttiJuliste = Rakenne.El("mk-juliste", porttiYla, PickingMode.Ignore);
            Viiva(porttiJuliste);
            JulisteRivi(porttiJuliste, "MATKAKIRJA", "mk-juliste__nimi");
            JulisteRivi(porttiJuliste, "MAAILMAN YMPÄRI", "mk-juliste__yla");
            JulisteRivi(porttiJuliste, "KAHDEKSASSAKYMMENESSÄ PÄIVÄSSÄ", "mk-juliste__ala");
            JulisteRivi(porttiJuliste, "OSA II · UNOHDETTU AARRE", "mk-juliste__osa");
            Viiva(porttiJuliste);
            porttiLause = Rakenne.Teksti(PorttiLause, "mk-aloitus__porttilause", porttiYla);
            Kirjasimet.Aseta(porttiLause, Kirjasin.LukuKursiivi);
            porttiYla.style.display = DisplayStyle.None;
            var keskus = Rakenne.El("mk-aloitus__keskus", portti, PickingMode.Ignore);
            aaniNappi = Rakenne.Nappi(null, "mk-aloitus__aanet", AanetPaalle, keskus);
            aaniTeksti = Rakenne.Teksti("Laita äänet päälle", "mk-aloitus__aaniteksti", aaniNappi);
            Kirjasimet.Aseta(aaniTeksti, Kirjasin.Kone);
            aaniNappi.Add(new SvgIkoni(Ikonit.Viiva["kaiutin"]));
            jatkaNappi = Rakenne.Nappi("Jatka matkaa", "mk-nappi--kulta mk-aloitus__aloita", Jatka, keskus);
            Rakenne.Tausta(jatkaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(jatkaNappi, Kirjasin.KoneLihava);
            jatkaNappi.style.display = DisplayStyle.None;
            // Tallennus olemassa → peli jatkuu; muuten avausruutu (web: sama nappi molemmissa).
            aloitaNappi = Rakenne.Nappi("Aloita seikkailu", "mk-nappi--kulta mk-aloitus__aloita", () => { if (jatka != null) Jatka(); else PortistaKartalle(); }, keskus);
            Rakenne.Tausta(aloitaNappi, Kuviot.Kulta);
            Kirjasimet.Aseta(aloitaNappi, Kirjasin.KoneLihava);
            var linkki = Rakenne.Nappi("Oppiminen on hauskaa", "mk-aloitus__linkki", () => Rakenne.Nayta(periaatteet, true, 250), portti);
            Kirjasimet.Aseta(linkki, Kirjasin.Kone);

            periaatteet = Periaatteet(juuri);
            UiKerros.Hae().StartCoroutine(LataaTekstit());
        }

        // Fablen kaanonlause (23.9.2026); webin meta description päivitetään samaksi.
        const string PorttiLause = "Seuraa isoisän matkakirjaa vuodelta 1873 ja etsi Aarnin luettelon unohdetut aarteet.";
        Label porttiLause, aaniTeksti;
        Button aaniNappi;

        /// <summary>Äänet päälle -nappi: Äänimaisema (koko pelin mykistys) päälle ja kuittaus.</summary>
        void AanetPaalle()
        {
            Asetukset.Aseta(Kytkin.Aanimaisema, true);
            aaniTeksti.text = "Äänet päällä";
            aaniNappi.AddToClassList("mk-valittu");
            Aanet.PulunTehoste("paper");
        }

        void PaivitaAaniNappi()
        {
            aaniTeksti.text = "Laita äänet päälle";
            aaniNappi.RemoveFromClassList("mk-valittu");
        }

        string introText = IntroText, introPaikka = IntroPaikka, introValinta = IntroValinta, lentoTeksti = LentoTeksti;
        /// <summary>Kirjoituskoneen nykyinen teksti (avaus tai lennon rivi).</summary>
        string teksti = "";
        Label valintaOtsikko, periaateOtsikko;
        ScrollView periaateVieritys;
        VisualElement periaateLinkki, periaatePalaute;

        /// <summary>Testikomento (ui palaute periaate): periaatteet auki ja vieritys palautelohkoon.</summary>
        public void AvaaPeriaatteet()
        {
            Rakenne.Nayta(periaatteet, true, 250);
            Rakenne.Vierita(periaateVieritys, periaatePalaute, 350);
        }

        /// <summary>Tekstit paketista (moduulit/js/ui-tekstit.json); puuttuva moduuli = koodin vara.</summary>
        System.Collections.IEnumerator LataaTekstit()
        {
            string json = null;
            yield return Sisalto.HaePaketista("moduulit/js/ui-tekstit.json", t => json = t, true);
            if (json == null) yield break;
            try
            {
                var v = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(json)), "exportit"));
                string Arvo(string nimi)
                {
                    var x = MiniJson.Kentta(v, nimi);
                    if (Rakenne.Olio(x) is Dictionary<string, object> o) x = MiniJson.Kentta(o, "arvo") ?? x;
                    return x as string;
                }
                introText = Arvo("INTRO_TEXT") ?? introText;
                introPaikka = Arvo("INTRO_PAIKKA") ?? introPaikka;
                introValinta = Arvo("INTRO_VALINTA") ?? introValinta;
                // FLIGHT_FIRST voi olla lista (webin flightFirst: [rivi]) tai merkkijono.
                var ff = MiniJson.Kentta(v, "FLIGHT_FIRST");
                if (Rakenne.Olio(ff) is Dictionary<string, object> ffo) ff = MiniJson.Kentta(ffo, "arvo") ?? ff;
                if (ff is List<object> ffl && ffl.Count > 0) ff = ffl[0];
                if (ff is string ffs && ffs.Length > 0) lentoTeksti = ffs;
                valintaNappi.Q<Label>().text = introValinta.ToUpperInvariant();
                valintaOtsikko.text = introValinta;
                var p = Rakenne.Olio(MiniJson.Kentta(v, "PERIAATTEET"));
                if (p != null && Rakenne.Olio(MiniJson.Kentta(p, "arvo")) is Dictionary<string, object> pa) p = pa;
                if (p != null && MiniJson.Kentta(p, "osat") is List<object> osat && osat.Count > 0)
                {
                    periaateOtsikko.text = MiniJson.Teksti(p, "otsikko") ?? periaateOtsikko.text;
                    periaateVieritys.Clear();
                    foreach (var x in osat)
                    {
                        var o = Rakenne.Olio(x);
                        if (o == null) continue;
                        if (MiniJson.Teksti(o, "otsikko") is string ot)
                            Kirjasimet.Aseta(Rakenne.Teksti(ot.ToUpperInvariant(), "mk-tietoja__otsikko", periaateVieritys), Kirjasin.Kone);
                        if (MiniJson.Teksti(o, "teksti") is string te)
                            Rakenne.Teksti(te, "mk-kortti__teksti mk-aloitus__periaate", periaateVieritys);
                    }
                    // Linkki ja palautelohko säilyvät paketin tekstien jälkeen (web: ennen oikeusriviä).
                    if (periaateLinkki != null) periaateVieritys.Add(periaateLinkki);
                    if (periaatePalaute != null) periaateVieritys.Add(periaatePalaute);
                    if (MiniJson.Teksti(p, "oikeudet") is string oik) Rakenne.Teksti(oik, "mk-kortti__teksti mk-aloitus__periaate", periaateVieritys);
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui aloitus: ui-tekstit: " + e.Message); }
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
            lennolla = false;
            juuri.pickingMode = PickingMode.Position;
            intro.RemoveFromClassList("mk-aloitus__intro--lento");
            PaivitaAaniNappi();
            this.jatka = jatka;
            this.kohteet = kohteet != null && kohteet.Count > 0 ? kohteet : Array.ConvertAll(Kohteet, id => (id, (string)null));
            // Löydös 24: ei Jatka matkaa / Uusi matka -paria; Aloita seikkailu jatkaa tallennuksen, jos sellainen on.
            jatkaNappi.style.display = DisplayStyle.None;
            AsetaAuki(true);
            juuri.style.display = DisplayStyle.Flex;
            juuri.style.opacity = 1f;
            portti.style.display = DisplayStyle.Flex;
            portti.style.opacity = 1f;
            AsetaPortti(true);
            intro.style.opacity = 0f;
            arkki.style.opacity = 0f;
            valinta.style.display = DisplayStyle.None;
            valintaNappi.style.display = DisplayStyle.None;
            paikka.text = runko.text = "";
            SyoteLukko.Esta(this);
        }

        /// <summary>Testikomento (ui aloitus valinta kortti): varakortti pallon sijaan.</summary>
        public bool PakotaKortti;

        public void Piilota()
        {
            if (!Auki) return;
            LopetaPallovalinta();
            AsetaAuki(false);
            AsetaPortti(false);
            kirjoitus?.Pause();
            juuri.style.opacity = 0f;
            // Ei lennolla: Valitse → Piilota → LentoKirjoitus, ja tämä ajastin piilotti avaustekstin heti (TF4, Laitetestaaja).
            juuri.schedule.Execute(() => { if (!Auki && !lennolla) juuri.style.display = DisplayStyle.None; }).StartingIn(900);
            SyoteLukko.Vapauta(this);
        }

        /// <summary>Suoraan avaustekstiin (huipennuksen Uusi matka): portti ohitetaan.</summary>
        public void NaytaAvaus(Action<string> aloita, IReadOnlyList<(string Id, string Nimi)> kohteet = null)
        {
            Nayta(aloita, kohteet);
            portti.style.display = DisplayStyle.None;
            AsetaPortti(false);
            NaytaAvausteksti();
        }

        /// <summary>
        /// Aloituskaava (omistaja 24.9.2026 klo 12.1x, korvaa erillisen avausruudun): portista suoraan pallovalintaan.
        /// Pallolla alapalkissa kertojan avaus — "Heathrow, Lontoo" + kuukausi ja vuosi ja INTRO_TEXT intro-puhe-luennan
        /// tahdissa — ja sen jälkeen pulun ensiesittely (LivianAvaus, web naytaLivianAvaus). Pallo on valittavissa koko
        /// ajan: kaupungin napautus keskeyttää luennan ja pulun ja aloittaa lennon (flightFirst, LentoKirjoitus).
        /// </summary>
        void PortistaKartalle()
        {
            Aanisoitin.AvausAlkoi(); // web aloitaAvauksenAani (B7-soitin)
            portti.style.opacity = 0f;
            AsetaPortti(false);
            portti.schedule.Execute(() => portti.style.display = DisplayStyle.None).StartingIn(400);
            NaytaAvausteksti();
        }

        /// <summary>Kertojan avaus on alapalkissa pallovalinnan aikana (ei vielä pulun esittelyä).</summary>
        bool avausPallolla;

        void NaytaAvausteksti()
        {
            avausPallolla = true;
            NaytaValinta();
            juuri.style.display = DisplayStyle.Flex;
            juuri.style.opacity = 1f;
            juuri.pickingMode = PickingMode.Ignore;
            intro.AddToClassList("mk-aloitus__intro--lento");
            intro.EnableInClassList("mk-aloitus__intro--vaaka", Screen.width > Screen.height);
            arkki.pickingMode = PickingMode.Ignore; // napautukset pallolle, alapalkki ei peitä valintaa
            valintaNappi.style.display = DisplayStyle.None;
            intro.style.opacity = 1f;
            arkki.style.opacity = 1f;
            var nyt = DateTime.Now;
            AloitaKirjoitus(introText, introPaikka + ", " + nyt.ToString("MMMM", new CultureInfo("fi-FI")) + " " + nyt.Year, IntroPuhe, true);
        }

        /// <summary>Kertojan avaus päättyi pallolla: alapalkki häipyy ja pulu esittäytyy (kerran laitteella).</summary>
        void AvausPallollaValmis()
        {
            avausPallolla = false;
            juuri.schedule.Execute(() =>
            {
                if (lennolla || !ValitseePallolla) return;
                intro.style.opacity = 0f;
                if (ValitseePallolla) LivianAvaus.Nayta(() => ValitseePallolla, valintaIdt.Count);
            }).StartingIn(1800);
        }

        void Jatka()
        {
            var j = jatka;
            Piilota();
            j?.Invoke();
        }

        /// <summary>
        /// Kirjoituskone luennan tahdissa: sanat ilmestyvät Puhe.Aika-kellon mukaan, kun luenta (puheUrl:n tiedosto)
        /// soi — aikaleimoista (luennan .aikaleimat.json, jos saatavilla) tai muuten merkkimäärän suhteessa luennan
        /// kestoon. Jos luenta ei ala 4 s:ssa (äänet pois, lataus), vara on webin typeText-rytmi (190 ms/sana, tauot).
        /// soitaItse: UI soittaa luennan (avaus); lennolla sen soittaa peli (Pelikoodari, luennat "lento-alku").
        /// </summary>
        void AloitaKirjoitus(string kirjoitettava, string paikkarivi, string puheUrl, bool soitaItse, float odotusS = 4f)
        {
            teksti = kirjoitettava ?? "";
            paikka.text = paikkarivi ?? "";
            paikka.style.display = string.IsNullOrEmpty(paikkarivi) ? DisplayStyle.None : DisplayStyle.Flex;
            sanat = teksti.Split(' ');
            sana = 0;
            runko.text = "";
            sanaAjat = null;
            puheTunniste = Tunniste(puheUrl);
            if (soitaItse && !string.IsNullOrEmpty(puheUrl)) Puhe.Hae()?.Soita(puheUrl);
            HaeAikaleimat(puheUrl, sanat.Length);
            kirjoitus?.Pause();
            float alku = Time.unscaledTime;
            bool alkoi = false;
            kirjoitus = runko.schedule.Execute(() =>
            {
                if (sanat == null || sana >= sanat.Length) { kirjoitus?.Pause(); return; }
                var p = Puhe.Instanssi;
                bool soi = p != null && p.Soi && puheTunniste != null && (p.SoivaUrl ?? "").Contains(puheTunniste);
                if (soi)
                {
                    alkoi = true;
                    var ajat = sanaAjat ?? SuhteellisetAjat(p.Kesto);
                    float ms = p.Aika * 1000f;
                    int n = sana;
                    while (n < sanat.Length && (ajat == null || ajat[n] <= ms)) n++;
                    if (n > sana) Nayta(n);
                    return;
                }
                if (alkoi) { KirjoitaLoppuun(); return; }  // luenta päättyi tai katkesi: loput kerralla
                if (Time.unscaledTime - alku > odotusS)
                {
                    // Vara: webin rytmi ilman ääntä.
                    kirjoitus?.Pause();
                    kirjoitus = runko.schedule.Execute(Seuraava).StartingIn(Tahti);
                }
            }).Every(50);
        }

        string puheTunniste;
        float[] sanaAjat;

        static string Tunniste(string url)
        {
            if (string.IsNullOrEmpty(url)) return null;
            string t = url.Split('?')[0];
            int i = t.LastIndexOf('/');
            t = i >= 0 ? t.Substring(i + 1) : t;
            return t.EndsWith(".mp3") ? t.Substring(0, t.Length - 4) : t;
        }

        /// <summary>Sanan alkuhetket (ms) merkkimäärän suhteessa luennan kestoon (ei aikaleimoja).</summary>
        float[] SuhteellisetAjat(float kestoS)
        {
            if (kestoS <= 0 || sanat == null || sanat.Length == 0) return null;
            int yht = 0;
            foreach (var w in sanat) yht += w.Length + 1;
            var ajat = new float[sanat.Length];
            int kertyma = 0;
            // Puhe alkaa ja loppuu pienellä tauolla: 4 % alussa, 94 % kohdalla viimeinen sana.
            for (int i = 0; i < sanat.Length; i++)
            {
                ajat[i] = kestoS * 1000f * (0.04f + 0.9f * kertyma / Mathf.Max(1, yht));
                kertyma += sanat[i].Length + 1;
            }
            sanaAjat = ajat;
            return ajat;
        }

        /// <summary>Luennan aikaleimat (web tools: sanat[].alku ms), jos tiedosto on olemassa ja sanamäärä täsmää.</summary>
        void HaeAikaleimat(string puheUrl, int sanoja)
        {
            if (string.IsNullOrEmpty(puheUrl)) return;
            string osoite = puheUrl.Split('?')[0];
            if (!osoite.EndsWith(".mp3")) return;
            osoite = osoite.Substring(0, osoite.Length - 4) + ".aikaleimat.json" + (puheUrl.Contains("?") ? "?" + puheUrl.Split('?')[1] : "");
            string tunniste = puheTunniste;
            UiKerros.Hae().StartCoroutine(Hae());
            System.Collections.IEnumerator Hae()
            {
                using (var req = UnityEngine.Networking.UnityWebRequest.Get(osoite))
                {
                    req.timeout = 6;
                    yield return req.SendWebRequest();
                    if (req.result != UnityEngine.Networking.UnityWebRequest.Result.Success || tunniste != puheTunniste) yield break;
                    try
                    {
                        if (!(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(req.downloadHandler.text)), "sanat") is List<object> lista)
                            || lista.Count != sanoja) yield break;
                        var ajat = new float[lista.Count];
                        for (int i = 0; i < lista.Count; i++)
                            ajat[i] = Convert.ToSingle(MiniJson.Kentta(Rakenne.Olio(lista[i]), "alku") ?? 0, CultureInfo.InvariantCulture);
                        sanaAjat = ajat;
                    }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA aloitus: aikaleimat " + e.Message); }
                }
            }
        }

        void Nayta(int n)
        {
            sana = Mathf.Min(n, sanat.Length);
            runko.text = string.Join(" ", sanat, 0, sana);
            if (sana >= sanat.Length) { kirjoitus?.Pause(); Valmis(); }
        }

        /// <summary>Seuraava sana ja sen jälkeinen viive (web typeText + KIRJOITUSTAUOT): vara ilman luentaa.</summary>
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
            runko.text = teksti;
            Valmis();
        }

        void Valmis()
        {
            if (avausPallolla) { AvausPallollaValmis(); return; }
            if (lennolla) { LopetaLento(lentoOhi ? 2500 : 5000); return; }
            if (valintaNappi.style.display == DisplayStyle.Flex) return;
            valintaNappi.style.display = DisplayStyle.Flex;
            valintaNappi.style.opacity = 0f;
            valintaNappi.schedule.Execute(() => valintaNappi.style.opacity = 1f);
        }

        void NaytaValinta()
        {
            // Web aloitaKartalta: avauksen puhe loppuu, kun valinta alkaa; naksahdus (sfx clack). Pallon avauksessa
            // luenta alkaa vasta tämän jälkeen (NaytaAvausteksti), joten pysäytys ei osu siihen.
            if (!avausPallolla) Puhe.Instanssi?.Pysayta();
            Aanet.Tehoste("clack");
            UiSisalto.Lataa(() =>
            {
                if (!Auki || ValitseePallolla) return;
                if (!PakotaKortti && AloitaPallovalinta()) return;
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
            Aanet.Tehoste("clack", 2.4f); // web ui.js:12690 aloituskaupungin napautus
            // Ohitus milloin tahansa: kertojan avaus ja pulun esittely katkeavat heti.
            avausPallolla = false;
            Puhe.Instanssi?.Pysayta();
            LivianAvaus.Peru();
            arkki.pickingMode = PickingMode.Position;
            var merkit = valintaMerkit;
            LopetaPallovalinta();
            // Valittu kaupunki pitää renkaansa (valittu-asu) aloituslennon loppuun (AloituslentoPaattyi).
            if (merkit != null) merkit.Renkaat(new[] { id }, id);
            rengasMerkit = merkit;
            Rakenne.Nayta(valinta, false, 200);
            Piilota();
            aloita?.Invoke(id);
            LentoKirjoitus();
        }

        // --- avausteksti lennon aikana (aloituskaava) --------------------------------------

        /// <summary>
        /// Pelikoodari soittaa intro-luennan aloituslennolla (koneen ääni + isoisä). Niin kauan kuin
        /// false, UI soittaa intro-puhe.mp3:n itse kirjoituksen alkaessa (Puhe.Soita).
        /// </summary>
        public static bool LuentaPelilta;
        bool lennolla, lentoOhi = true;
        /// <summary>Avausteksti on lennon kaistaleella (tai kirjoittumassa sinne).</summary>
        public bool Lennolla => lennolla;

        /// <summary>
        /// Avausteksti naputetaan pallon päälle alareunan pergamenttikaistaleelle (arkki ilman verhoa ja
        /// julistetta). Kaistale häipyy, kun teksti on valmis ja lento ohi (AloituslentoPaattyi), tai
        /// viimeistään 5 s tekstin jälkeen. Napautus kaistaleeseen kirjoittaa loppuun.
        /// </summary>
        public void LentoKirjoitus()
        {
            lennolla = true;
            lentoOhi = false;
            juuri.style.display = DisplayStyle.Flex;
            juuri.style.opacity = 1f;
            juuri.pickingMode = PickingMode.Ignore;
            intro.AddToClassList("mk-aloitus__intro--lento");
            intro.EnableInClassList("mk-aloitus__intro--vaaka", Screen.width > Screen.height);
            portti.style.display = DisplayStyle.None;
            AsetaPortti(false);
            valinta.style.display = DisplayStyle.None;
            valintaNappi.style.display = DisplayStyle.None;
            intro.style.opacity = 1f;
            arkki.style.opacity = 1f;
            // Lennolla vain avauslennon rivi (flightFirst) ilman paikkariviä; luennan soittaa peli.
            // Kone lähtee kameran lähestymisen jälkeen: luentaa odotetaan pidempään kuin avauksessa.
            AloitaKirjoitus(lentoTeksti, null, LentoPuhe, false, 10f);
        }

        /// <summary>Pelikoodarin/Natiivisepän aloituslento päättyi: kaistale häipyy, kun teksti on valmis.</summary>
        public void AloituslentoPaattyi()
        {
            lentoOhi = true;
            if (rengasMerkit != null) rengasMerkit.Renkaat(null);
            rengasMerkit = null;
            if (lennolla && (sanat == null || sana >= sanat.Length)) LopetaLento(1500);
        }

        void LopetaLento(long viiveMs)
        {
            juuri.schedule.Execute(() =>
            {
                if (!lennolla || Auki) return;
                lennolla = false;
                juuri.style.opacity = 0f;
                juuri.schedule.Execute(() =>
                {
                    if (Auki || lennolla) return;
                    juuri.style.display = DisplayStyle.None;
                    juuri.pickingMode = PickingMode.Position;
                    intro.RemoveFromClassList("mk-aloitus__intro--lento");
                    intro.RemoveFromClassList("mk-aloitus__intro--vaaka");
                }).StartingIn(900);
            }).StartingIn(viiveMs);
        }

        // --- valinta pallolla (web aloitaPallolta; lauta.js aloitusnakyma, aloitusKohteet) --

        public const double ValintaLat = 30, ValintaLon = 17;
        const double PallonOsuus = 0.55, AnkkuriVara = 0.78;
        /// <summary>Web ALOITUSVALINNAN_ANKKURIT: Lontoo ja Ateena mahtuvat kuvaan kapeallakin ruudulla.</summary>
        static readonly string[] Ankkurit = { "lontoo", "ateena" };
        const string Lahto = "lontoo";
        static readonly Color Huomio = new Color32(0xea, 0xb8, 0x4e, 0xff);
        const string PisteEtuliite = "aloitus:";

        KaupunkiMerkit valintaMerkit;
        /// <summary>Valitun kaupungin rengas lennon ajan (poistuu AloituslentoPaattyi-kutsussa).</summary>
        KaupunkiMerkit rengasMerkit;
        Karttapisteet valintaPisteet;
        PalloKierto valintaKierto;
        readonly List<string> valintaIdt = new List<string>();

        /// <summary>Lähtövalinta pallolla käynnissä (verho pois, pallon syöte vapaana).</summary>
        public bool ValitseePallolla { get; private set; }

        /// <summary>Valinta pallolle, jos 3D-kartta on käytössä; false = varakortti.</summary>
        bool AloitaPallovalinta()
        {
            var kk = KarttaKerrokset.Instanssi;
            var kierto = kk != null && kk.pisteet != null ? kk.pisteet.kierto : null;
            if (kk == null || kk.merkit == null || kierto == null) return false;
            valintaMerkit = kk.merkit;
            valintaPisteet = kk.pisteet;
            valintaKierto = kierto;
            ValitseePallolla = true;

            // Verho ja arkki häipyvät (web intro-fade); pallo saa syötteen. Kertojan avaus jää alapalkkiin.
            if (!avausPallolla)
            {
                juuri.style.opacity = 0f;
                juuri.schedule.Execute(() => { if (ValitseePallolla && !avausPallolla) juuri.style.display = DisplayStyle.None; }).StartingIn(900);
            }
            SyoteLukko.Vapauta(this);

            valintaIdt.Clear();
            foreach (var (id, _) in kohteet) if (id != null && id != Lahto) valintaIdt.Add(id);
            var nakyvat = new HashSet<string>(valintaIdt) { Lahto };
            valintaMerkit.NaytaVain(nakyvat);
            // Valittavien hehkurenkaat (web .pallolauta-huomio; Natiivisepän KaupunkiMerkit.Renkaat).
            valintaMerkit.Renkaat(valintaIdt);
            foreach (var id in valintaIdt)
            {
                valintaMerkit.Korosta(id, Huomio);
                var k = UiSisalto.Kaupunki(id);
                if (k != null && !double.IsNaN(k.Lat)) valintaPisteet.Aseta(PisteEtuliite + id, k.Lat, k.Lon, Huomio, false);
            }
            valintaKierto.KaupunkiNapautettu += KaupunkiValittu;
            valintaPisteet.Napautettu += PisteValittu;
            valintaKierto.Aja(ValintaLat, ValintaLon, ValintanakymanKorkeus(), 1.6f, null);
            // Web naytaLivianAvaus: Livia liitää sisään ja esittelee valinnan (kerran laitteella) — pallon avauksessa
            // vasta kertojan jälkeen (AvausPallollaValmis).
            if (!avausPallolla) LivianAvaus.Nayta(() => ValitseePallolla, valintaIdt.Count);
            return true;
        }

        void KaupunkiValittu(string id)
        {
            if (ValitseePallolla && valintaIdt.Contains(id)) UiKerros.PaaSaikeessa(() => Valitse(id));
        }

        void PisteValittu(string pid)
        {
            if (!ValitseePallolla || pid == null || !pid.StartsWith(PisteEtuliite)) return;
            string id = pid.Substring(PisteEtuliite.Length);
            if (valintaIdt.Contains(id)) UiKerros.PaaSaikeessa(() => Valitse(id));
        }

        void LopetaPallovalinta()
        {
            if (!ValitseePallolla) return;
            ValitseePallolla = false;
            if (valintaKierto != null) valintaKierto.KaupunkiNapautettu -= KaupunkiValittu;
            if (valintaPisteet != null)
            {
                valintaPisteet.Napautettu -= PisteValittu;
                foreach (var id in valintaIdt) valintaPisteet.Poista(PisteEtuliite + id);
            }
            if (valintaMerkit != null)
            {
                foreach (var id in valintaIdt) valintaMerkit.Korosta(id, null);
                valintaMerkit.NaytaVain(null);
                valintaMerkit.Renkaat(null);
            }
            valintaIdt.Clear();
        }

        /// <summary>
        /// Web aloitusvalinnanKorkeus: pallon säde 0,55 ruudun korkeudesta (kameran pystysuora fov), ja
        /// ankkurikaupungit mahtuvat 78 %:iin ruudun puolikkaasta. Tulos metreinä pinnasta.
        /// </summary>
        double ValintanakymanKorkeus()
        {
            var kamera = valintaKierto.GetComponent<Camera>();
            double fov = kamera != null ? kamera.fieldOfView : 40.0;
            double tan = math.tan(math.radians(fov / 2));
            double suhde = math.max(0.05, Screen.width / (double)math.max(1, Screen.height));
            double d = 1.0 / math.max(1e-6, math.sin(math.atan(2 * PallonOsuus * tan)));
            double a0 = math.radians(ValintaLat), b0 = math.radians(ValintaLon);
            var keskus = new double3(math.cos(a0) * math.cos(b0), math.cos(a0) * math.sin(b0), math.sin(a0));
            var ita = new double3(-math.sin(b0), math.cos(b0), 0);
            var pohjoinen = new double3(-math.sin(a0) * math.cos(b0), -math.sin(a0) * math.sin(b0), math.cos(a0));
            foreach (var id in Ankkurit)
            {
                var k = UiSisalto.Kaupunki(id);
                if (k == null || double.IsNaN(k.Lat)) continue;
                double a = math.radians(k.Lat), b = math.radians(k.Lon);
                var v = new double3(math.cos(a) * math.cos(b), math.cos(a) * math.sin(b), math.sin(a));
                double e = math.dot(v, ita), n = math.dot(v, pohjoinen), u = math.dot(v, keskus);
                d = math.max(d, math.max(u + math.abs(e) / math.max(1e-6, AnkkuriVara * suhde * tan),
                                         u + math.abs(n) / math.max(1e-6, AnkkuriVara * tan)));
            }
            return (d - 1) * CesiumForUnity.CesiumWgs84Ellipsoid.GetMaximumRadius();
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
            periaateOtsikko = o;
            var v = new ScrollView(ScrollViewMode.Vertical);
            periaateVieritys = v;
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
            // Web periaate-linkit ja -oikeudet (ui.js naytaPeriaatteet).
            var gh = Rakenne.Nappi("Pelin GitHub-sivu", "mk-lehti__linkki mk-aloitus__periaatelinkki", () => Application.OpenURL("https://github.com/ravelius/Matkakirja"), v);
            Kirjasimet.Aseta(gh, Kirjasin.Kone);
            periaateLinkki = gh;
            // Web periaatePalaute: palautelohko linkin jälkeen (lomake: PalauteLomake.cs).
            periaatePalaute = PalauteLomake.PeriaateLohko(v, UiKerros.Traileri);
            Kirjasimet.Aseta(Rakenne.Teksti("© Visuaaliviestinnän Instituutti Tampere Oy", "mk-aloitus__oikeudet", v), Kirjasin.Kone);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Takaisin", "mk-nappi--haamu", () => Rakenne.Nayta(h, false, 250), napit);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);
            return h;
        }

        // --- testi ---------------------------------------------------------------------

        /// <summary>Testikomento: portti | valinta | kortti | lento | jatka (ilman peliä; valinta kirjataan ilmoitukseen).</summary>
        public void Testaa(string vaihe, Action<string> valittu)
        {
            // Pelin lähtökaupungit (paketin aloitus = true, 19 kpl), jos peli on ladattu; muuten webin varalista.
            Nayta(valittu, PeliOhjain.Instanssi?.Lahtokaupungit(), vaihe == "jatka" ? () => valittu("(jatka)") : (Action)null);
            if (vaihe == "jatka") return;
            if (vaihe == "portti") return;
            // lento = avausteksti pallon päällä (kuten valinnan jälkeen), valinta = kartalla,
            // kortti = varakortti ilman palloa.
            if (vaihe == "lento") { Piilota(); LentoKirjoitus(); return; }
            PakotaKortti = vaihe == "kortti";
            PortistaKartalle();
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

        // Web #winner-jaa -kuvake: kolme solmua ja kaksi viivaa.
        const string JaaIkoni = "<circle cx=\"17.5\" cy=\"6\" r=\"2.6\"/><circle cx=\"6.5\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18\" r=\"2.6\"/><path d=\"M8.8 10.8 15.2 7.2M8.8 13.2l6.4 3.6\"/>";
        readonly Button jaa;
        string jaettava;

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
            // "Jaa matka" (web #winner-jaa, paivitaJakonappi): vain kun jakoarkki on saatavilla (iOS-laite),
            // muualla nappia ei ole lainkaan. Teksti web natiiviMatkaTeksti = MatkanYhteenveto.Teksti.
            jaa = Rakenne.Nappi("Jaa matka", "mk-nappi--haamu", () => { if (jaettava != null) Jakaminen.JaaTeksti(jaettava); }, napit, JaaIkoni);
            Kirjasimet.Aseta(jaa, Kirjasin.Kone);
            jaa.style.display = Jakaminen.Saatavilla ? DisplayStyle.Flex : DisplayStyle.None;
            var uusi = Rakenne.Nappi("Uusi peli", "mk-nappi--kulta", () => { Sulje(); uusiMatka?.Invoke(); }, napit);
            Rakenne.Tausta(uusi, Kuviot.Kulta);
            Kirjasimet.Aseta(uusi, Kirjasin.KoneLihava);
        }

        public void Nayta(MatkanYhteenveto yv, Action uusiMatka)
        {
            this.uusiMatka = uusiMatka;
            jaettava = yv?.Teksti;
            jaa.style.display = Jakaminen.Saatavilla && jaettava != null ? DisplayStyle.Flex : DisplayStyle.None;
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
