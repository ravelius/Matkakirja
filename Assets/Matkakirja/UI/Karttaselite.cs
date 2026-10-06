// KARTTASELITE (Natiivi-UI, erä 3): webin js/karttaselite.js natiivina.
//
// Nappi (kolme palloa ja viivaa) kartan oikeassa yläkulmassa yläpalkin alla;
// paneeli liukuu alas napin päälle (220 ms, suljettu: ylempänä ja litistynyt).
// Paneeli: pergamentti #f5f0e2, käsin piirretty kehys (KarheaKehys), otsikko
// "NOSTOT" ja ✕. Rivit webin KARTTASELITE_JARJESTYS-järjestyksessä: merkki |
// nimi | luku (tasalevyiset numerot, tyhjä "0" ja rivi himmeänä). Yksi aihe
// kerrallaan: peukalolevy (pilleri) liukuu valitun rivin kohdalle ja sen
// "linssi" näyttää valitun luvun suurennettuna; rivin napautus tai sormen veto
// rivien yli valitsee. Valinta ja laskurit: UiPalvelut.KarttaValot
// (Natiiviseppä); asettamaton palvelu = pelkät selitykset ilman valintaa.
// Sulkeutuu ✕:sta ja napautuksesta paneelin ohi (napautus menee silti kartalle).
// Välilehdet NOSTOT | MAAKUNNAT (webin karttaselite-valilehti; valinta muistetaan:
// PlayerPrefs matkakirja-karttaselite-valilehti). Maakunnat-välilehden sisältö on
// Maakunnat.cs:ssä ja rakentuu, kun välilehti avataan ensi kerran.
//
// MAAKUNTAKARTTA (omistaja 28.9.2026 klo 17.1x, Päätoimittajan kautta; MaakuntaKartta = true "toistaiseksi"): Nostot-
// välilehti ja -lista pois pelistä (kartan nostot jäävät), nappi on kytkin maakuntakartta päälle/pois, maakuntalista pois
// kokonaan. Päällä: rajat ilman täyttöä, kartan napautus valitsee maakunnan (vain se värjätty, MaaKartta.VainKorostetut)
// eikä avaa kaupunkeja tai valoja (PalloKierto.Sieppaaja); nostomerkit piilossa tilan ajan; paneeli on vain isompi
// kuvausruutu (nimi, kuva, lyhyt teksti, Lue lisää → kortti). Vanha välilehtipolku jää koodiin palautusta varten.
//
// MAAKUNTA AUTOMAATTISESTI (omistaja 30.9.2026 klo 12.28, Päätoimittajan kautta; Automaattinen = true): nappi pois, ja
// kartan napautus tyhjään kohtaan (ei kaupunkia, nostoa, karttapistettä, siirtokohdetta tai muuta osumaa, eikä
// painallus sulkenut korttia tai paneelia) valitsee kohdan maakunnan ja avaa lapun yläkulmaan. Toinen napautus samaan
// maakuntaan sulkee lapun (kuten 28.9. klo 20.3x), napautus toiseen maakuntaan vaihtaa sisällön, napautus mereen tai
// maakunnattomaan kohtaan sulkee, ja kohteen napautus sulkee lapun kohteen oman toiminnon tieltä. Kaupungit ja nostot
// toimivat lapun aikana tavalliseen tapaan (ei sieppaajaa). Maakuntakerros tuntee pelaajan nykyisen maan maakunnat.
// Linssin, aloitusnäkymän ja muun kuin karttatilan aikana maakuntaa ei valita.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Karttaselite
    {
        readonly UiKerros kerros;
        readonly Button nappi;
        const string ValilehtiAvain = "matkakirja-karttaselite-valilehti";
        readonly VisualElement paneeli, lista, peukalo, paneeliNostot, paneeliMaakunnat;
        readonly Button valilehtiNostot, valilehtiMaakunnat;
        public readonly Maakunnat Maakunnat;
        bool maakunnatAuki;
        readonly Label linssiLuku;
        readonly Dictionary<string, (Button Rivi, Label Luku)> rivit = new Dictionary<string, (Button, Label)>();
        IKarttaValot kuunneltu;
        bool vetaa, paivitysPyydetty;

        public bool Auki { get; private set; }

        /// <summary>Maakuntakartta-kytkin Nostot|Maakunnat-paneelin tilalla (omistaja 28.9. klo 17.1x).</summary>
        public const bool MaakuntaKartta = true;

        /// <summary>Maakunta kartan tyhjästä napautuksesta ilman nappia (omistaja 30.9.2026 klo 12.28).</summary>
        public const bool Automaattinen = true;

        /// <summary>Linssi päällä (LinssiUi): linssi omistaa kartan napautukset, maakuntaa ei valita.</summary>
        public bool LinssiPaalla { get; set; }

        public Karttaselite(UiKerros kerros)
        {
            this.kerros = kerros;
            var turva = kerros.Turva(UiKerros.Tilarivi);

            nappi = Rakenne.Nappi(null, "mk-seliteNappi", Vaihda, turva, NostoMerkit.SeliteNappi);
            nappi.tooltip = MaakuntaKartta ? "Maakuntakartta" : "Karttaselitteet";
            nappi.style.top = Ylapalkki.Varaus + 8;
            // LINSSIT-KARTTANAPPI (omistaja 2.10.2026 klo 13.56 ja 18.3x, web #3859): OHJAUSNAPPI-neliö suurennuslasilla kartan
            // oikeaan yläkulmaan (webissä selitenapin ≡ vasemmalla puolella; natiivissa selite on automaattinen eikä nappia ole,
            // joten Linssit on kulmassa); napautus avaa pillerivalikon suoraan Linssit-näkymään. Näkyy, kun linssejä on.
            linssit = Ohjausnappi.Nappi(Ikonit.Viiva["suurennuslasi"], "Linssit", AvaaLinssit, turva, "paperi");
            linssit.AddToClassList("mk-linssitNappi");
            linssit.style.position = Position.Absolute;
            linssit.style.display = DisplayStyle.None;
            linssit.schedule.Execute(PaivitaNappi).Every(500);   // linssien määrä muuttuu pelin aikana
            // Pelaajan näkymä (omistaja 29.9.2026, web on malli, Siirtoseppä): kehittäjän maailmatilassa silmänappi
            // karttaselitenapin alla (sama koko ja tyyli, väli 8), valittuna = kartta kuten pelaajalla.
            Aloitusnakyma.AukiMuuttui += _ => PaivitaNappi();

            paneeli = Rakenne.El("mk-selite", turva);
            paneeli.style.top = Ylapalkki.Varaus + 8;
            paneeli.style.display = DisplayStyle.None;
            var kehys = new KarheaKehys { Sade = 8, Paksuus = 1.2f };
            paneeli.Add(kehys);
            Kirjasimet.Aseta(paneeli, Kirjasin.Kone);

            var ylarivi = Rakenne.El("mk-selite__ylarivi", paneeli, PickingMode.Ignore);
            var valilehdet = Rakenne.El("mk-selite__valilehdet", ylarivi, PickingMode.Ignore);
            valilehtiNostot = Rakenne.Nappi("NOSTOT", "mk-selite__valilehti", () => VaihdaValilehti(false), valilehdet);
            valilehtiMaakunnat = Rakenne.Nappi("MAAKUNNAT", "mk-selite__valilehti", () => VaihdaValilehti(true), valilehdet);
            // Ei ✕:ää (✕-inventaario 5.10.2026; ylärivi on maakuntakarttatilassa piilossa, ohinapautus sulkee vanhan paneelin).

            paneeliNostot = Rakenne.El("mk-selite__paneeli", paneeli, PickingMode.Ignore);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-selite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeliNostot.Add(vieritys);
            paneeliMaakunnat = Rakenne.El("mk-selite__paneeli", paneeli, PickingMode.Ignore);
            Maakunnat = new Maakunnat(kerros, paneeliMaakunnat);
            MaakuntaKortti.VaistoMuuttui += v => paneeli.style.visibility = v ? Visibility.Hidden : StyleKeyword.Null;
            maakunnatAuki = MaakuntaKartta || PlayerPrefs.GetString(ValilehtiAvain, "") == "maakunnat";
            if (MaakuntaKartta)
            {
                ylarivi.style.display = DisplayStyle.None; // ei välilehtiä eikä ✕: nappi on kytkin
                paneeli.AddToClassList("mk-selite--karttatila");
                // iPadilla leveämpi (omistaja: "mininosto saisi olla isompi"): 300 pt jätti isonnetulle tekstille kapean palstan.
                paneeli.EnableInClassList("mk-selite--karttatila-tabletti", UiKerros.Tabletti);
                // Omistaja 29.9.2026 (iPhone-laitekuva): käsin piirretty kehys (KarheaKehys) näkyi tummana
                // reunana koko pienen kuvausruudun ympärillä — pois vain maakuntakarttatilassa, pohja jää
                // silti nostokortin paperin väriseksi (mk-selite background-color).
                kehys.style.display = DisplayStyle.None;
                Maakunnat.PiilotaLista();
                // Omistaja 29.9.2026 klo 07.3x (iPhone-kaappaus maakuntalappu-paikka.jpg): "Tuo maakunta lappu saisi olla
                // ylempänä ja peittää sen avanneen painikkeet. Lisää pieni x sen oik yläkulmaan sulkemista varten." Lappu
                // napin kohdalle (Asettele) ja pieni ✕ kulmaan, osuma-ala 44 pt (mitat sovittu Siirtosepän kanssa webiin).
                // ✕ POISTETTU (omistaja 5.10.2026 klo 00.1x, ✕-inventaario): tyhjä napautus (meri, maakunnaton kohta, sama maakunta)
                // sulkee lapun (TyhjaNapautus).
            }
            NaytaValilehti();
            lista = Rakenne.El("mk-selite__lista", vieritys);

            peukalo = Rakenne.El("mk-peukalo", lista, PickingMode.Ignore);
            var linssi = Rakenne.El("mk-peukalo__linssi", peukalo, PickingMode.Ignore);
            linssiLuku = Rakenne.Teksti("", "mk-peukalo__luku", linssi);
            peukalo.style.display = DisplayStyle.None;

            foreach (var r in NostoMerkit.Jarjestys) LuoRivi(r);

            // Sormen veto rivien yli valitsee (webin peukalolevyn raahaus).
            lista.RegisterCallback<PointerDownEvent>(e => { vetaa = true; lista.CapturePointer(e.pointerId); ValitseKohdasta(e.localPosition.y); e.StopPropagation(); });
            // Vedon aikana ScrollView ei vieritä (peukalolevyn veto valitsee, web).
            lista.RegisterCallback<PointerMoveEvent>(e => { if (vetaa) { ValitseKohdasta(e.localPosition.y); e.StopPropagation(); } });
            lista.RegisterCallback<PointerUpEvent>(e => { vetaa = false; lista.ReleasePointer(e.pointerId); });
            lista.RegisterCallback<PointerCaptureOutEvent>(_ => vetaa = false);
            lista.RegisterCallback<GeometryChangedEvent>(_ => SiirraPeukalo());

            kerros.TurvaMuuttui += Asettele;
            Asettele();
            // Vaakatilan väkäsnappi on oikeassa kulmassa: selite väistyy sen verran vasemmalle, ja
            // auki olevan yläpalkin alta kumpikin väistyy kokonaan (web body.ylapalkki-auki .karttaselite).
            Ylapalkki.AukiMuuttui += auki =>
            {
                nappi.style.opacity = auki ? 0f : 1f;
                nappi.pickingMode = auki ? PickingMode.Ignore : PickingMode.Position;
            };
            Ylapalkki.PalkkiPiilossaMuuttui += PaivitaNappi;
            // Napautus paneelin ohi (myös pallolle, jota UI ei näe) sulkee.
            kerros.JokaRuutu += TarkistaOhiNapautus;
            if (Automaattinen) PalloKierto.NapautusKasitelty += Napautettiin;
            PaivitaNappi();
        }

        /// <summary>Välilehti vaihtuu (web vaihdaValilehti); valinta muistetaan laitteella.</summary>
        public void VaihdaValilehti(bool maakunnat)
        {
            if (MaakuntaKartta) maakunnat = true; // Nostot-välilehti pois pelistä
            if (maakunnat == maakunnatAuki) return;
            maakunnatAuki = maakunnat;
            PlayerPrefs.SetString(ValilehtiAvain, maakunnat ? "maakunnat" : "nostot");
            PlayerPrefs.Save();
            NaytaValilehti();
            if (Auki && !maakunnat) Paivita();
        }

        /// <summary>Löydös 177 (Uusi peli): välilehti oletukseen (nostot) ja maakuntien valinta pois, kuten webin uudelleenlatauksessa.</summary>
        public void Nollaa()
        {
            if (maakunnatAuki && !MaakuntaKartta) { maakunnatAuki = false; NaytaValilehti(); if (Auki) Paivita(); }
            if (MaakuntaKartta) Sulje(); // Uusi peli: maakuntakartta kiinni (sieppaaja ja nostojen esto pois)
            Maakunnat.Nollaa();
        }

        void NaytaValilehti()
        {
            paneeliNostot.style.display = maakunnatAuki ? DisplayStyle.None : DisplayStyle.Flex;
            paneeliMaakunnat.style.display = maakunnatAuki ? DisplayStyle.Flex : DisplayStyle.None;
            valilehtiNostot.EnableInClassList("mk-valittu", !maakunnatAuki);
            valilehtiMaakunnat.EnableInClassList("mk-valittu", maakunnatAuki);
            paneeli.EnableInClassList("mk-selite--maakunnat", maakunnatAuki);
            if (maakunnatAuki && Auki) Maakunnat.Avautui();
            Maakunnat.AsetaNakyvissa(Auki && maakunnatAuki); // löydös 165
        }

        void LuoRivi(NostoMerkit.Rivi r)
        {
            var b = Rakenne.Nappi(null, "mk-selite-rivi", null, lista);
            // Löydös 69 (iPhone): rivi ei ota osumaa. Napin Clickable kaappasi PointerDownin, jolloin listan
            // valinta (ValitseKohdasta, peukalolevyn veto) ei käynnistynyt. Nyt lista on kohde.
            b.pickingMode = PickingMode.Ignore;
            b.tooltip = r.Koko;
            b.userData = r.Id;
            var merkki = Rakenne.El("mk-selite-rivi__merkki", b, PickingMode.Ignore);
            if (r.Piste || r.Vektori != null)
            {
                var alue = Rakenne.El("mk-selite-rivi__vektori", merkki, PickingMode.Ignore);
                string taytto = r.Piste ? NostoMerkit.PisteTaytto : r.Vektori;
                var t = new SvgIkoni(taytto) { Ruutu = 16, Alku = new Vector2(-8, -8) };
                t.AddToClassList("mk-ikoni--tayta");
                t.AddToClassList("mk-selite-rivi__symboli");
                if (r.Vari != null) t.style.color = Kuviot.Vari(r.Vari);
                alue.Add(t);
                if (r.Piste)
                {
                    var rengas = new SvgIkoni(NostoMerkit.PisteRengas) { Ruutu = 16, Alku = new Vector2(-8, -8) };
                    rengas.AddToClassList("mk-ikoni--tayta");
                    rengas.AddToClassList("mk-selite-rivi__symboli");
                    rengas.AddToClassList("mk-selite-rivi__rengas");
                    alue.Add(rengas);
                }
            }
            foreach (var kuva in r.Kuvat)
            {
                var k = Rakenne.El("mk-selite-rivi__kuva", merkki, PickingMode.Ignore);
                Kuvat.Hae(NostoMerkit.KuvaJuuri + kuva, t => { if (t != null) k.style.backgroundImage = new StyleBackground(t); });
            }
            Kirjasimet.Aseta(Rakenne.Teksti(r.Nimi, "mk-selite-rivi__nimi", b), Kirjasin.Kone);
            var luku = Rakenne.Teksti("", "mk-selite-rivi__luku", b);
            rivit[r.Id] = (b, luku);
        }

        void ValitseKohdasta(float y)
        {
            var palvelu = UiPalvelut.KarttaValot;
            if (palvelu == null) return;
            foreach (var pari in rivit)
            {
                var l = pari.Value.Rivi.layout;
                if (y >= l.yMin && y < l.yMax)
                {
                    if (palvelu.Valittu != pari.Key) palvelu.Valitse(pari.Key);
                    Paivita();
                    return;
                }
            }
        }

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        /// <summary>
        /// Paneeli auki/kiinni: kelluvat napit ja lappu, jotka natiivissa ovat ylemmillä kerroksilla (silmälasit,
        /// matkakirjan lappu), väistyvät paneelin alta (web: paneeli on niiden päällä; build 5 -löydös 15).
        /// </summary>
        public event System.Action<bool> AukiMuuttui;

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            if (MaakuntaKartta)
            {
                Maakunnat.AsetaKarttatila(true);
                // Automaattisessa tilassa ei sieppaajaa: kaupungit ja nostot aukeavat lapun aikana (Napautettiin).
                if (!Automaattinen) PalloKierto.Sieppaaja = MaakuntaNapautus;
                MaakuntaKerros()?.AsetaTilaRajat(true);
                // Nostot pysyvät kartalla maakuntatilassa (omistaja 29.9.2026: "saisi näkyä edelleen kaikki nostot myös
                // kartalla"); maakuntakerros on 3D-pallossa niiden alla.
            }
            KytkePalvelu();
            Paivita();
            if (maakunnatAuki) Maakunnat.Avautui();
            Rakenne.Nayta(paneeli, true, 220);
            nappi.AddToClassList("mk-valittu");
            Maakunnat.AsetaNakyvissa(maakunnatAuki); // löydös 165
            AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(paneeli, false, LinssiUi.VahennettyLiike() ? 0 : 240); // webin sulku 200 ms + 40 ms (omistaja 29.9.2026)
            nappi.RemoveFromClassList("mk-valittu");
            Maakunnat.AsetaNakyvissa(false); // löydös 165: kartan korostus pois, valinta säilyy listassa
            if (MaakuntaKartta)
            {
                Maakunnat.AsetaKarttatila(false);
                MaakuntaKerros()?.AsetaTilaRajat(false);
                if (PalloKierto.Sieppaaja == (System.Func<Vector2, bool>)MaakuntaNapautus) PalloKierto.Sieppaaja = null;
            }
            AukiMuuttui?.Invoke(false);
        }

        /// <summary>
        /// Maakuntakartan napautus (PalloKierto.Sieppaaja): pelaajan maan maakunta pisteessä valitaan (MaaKartta.MaaPisteessa,
        /// sama osumatesti kuin maiden napautuksessa). Napautus niellään aina tilan aikana, ettei kaupunki tai valo aukea.
        /// </summary>
        bool MaakuntaNapautus(Vector2 ruutu)
        {
            var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
            if (mk == null || !mk.RuutuPallolle(ruutu, out double lat, out double lon)) return true;
            string avain = mk.MaaPisteessa(lat, lon);
            Debug.Log($"MATKAKIRJA ui maakuntakartta: napautus {lat:0.00} {lon:0.00} → {avain ?? "ei maakuntaa"}");
            // Omistaja 28.9. klo 20.3x: saman maakunnan uusi napautus tyhjentää valinnan ja poistuu maakuntatilasta.
            if (avain != null && avain == Maakunnat.ValittuAvain) { Sulje(); return true; }
            if (avain != null) Maakunnat.Valitse(avain);
            return true;
        }

        static MaaKartta MaakuntaKerros() => KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;

        /// <summary>Nappi näkyviin tai piiloon (linssi päällä, aloitus).</summary>
        /// <summary>Karttanappi (iPhonella yläpalkin riviin, Ylapalkki.Vieras).</summary>
        public VisualElement Nappi => nappi;

        public void NaytaNappi(bool nakyy)
        {
            nappiSallittu = nakyy;
            PaivitaNappi();
        }

        bool nappiSallittu = true;
        readonly Button linssit;

        /// <summary>Linssit-karttanappi (web #3859): pillerivalikko suoraan Linssit-näkymään.</summary>
        public VisualElement LinssitNappi => linssit;

        static void AvaaLinssit()
        {
            var v = UiNakymat.Olemassa ? UiNakymat.Hae().Linssit?.Valitsin : null;
            if (v == null) return;
            if (!v.Auki) v.Avaa();
            // Pelit-kategoria (omistaja 4.10.2026): ilman linssejä nappi avaa Pelit-näkymän.
            v.NaytaNakyma(LinssiUi.Rekisteri?.Valittavat.Count > 0 ? Linssivalitsin.Nakyma.Linssit : Linssivalitsin.Nakyma.Pelit);
        }

        /// <summary>Linssi ei päällä eikä aloitusnäkymä auki (web: aloituksessa ei selitteen nappia).</summary>
        void PaivitaNappi()
        {
            // Palkki piilossa (vaaka, iPhonen veto): vain ☰ näkyy (omistaja 24.9.). Automaattisessa tilassa nappia ei ole,
            // ja lappu saa näkyä piilotetun palkin aikanakin (se on kartan omaa sisältöä).
            bool sallittu = nappiSallittu && !Aloitusnakyma.AloitusAuki && (Automaattinen || !Ylapalkki.PalkkiPiilossa);
            if (!sallittu) Sulje();
            nappi.style.display = sallittu && !Automaattinen ? DisplayStyle.Flex : DisplayStyle.None;
            // Pelit-kategoria samassa napissa (omistaja 4.10.2026): nappi näkyy myös, kun on vain pelejä.
            bool linsseja = LinssiUi.Rekisteri?.Valittavat.Count > 0 || Linssivalitsin.PelejaAvattu;
            // Myös piilotetulla palkilla (iPhonen vaaka) ☰:n vieressä: linssit eivät ole enää valikossa (Päätoimittaja 2.10. 19.0x;
            // omistajan 24.9. "vaakana vain ☰" koski yläpalkin nappeja).
            linssit.style.display = nappiSallittu && linsseja && !LinssiPaalla && !Aloitusnakyma.AloitusAuki ? DisplayStyle.Flex : DisplayStyle.None;
            // Maakuntadata valmiiksi kartan tullessa näkyviin, jotta ensimmäinen napautus avaa maakunnan heti.
            if (Automaattinen && sallittu) Maakunnat.Esilataa();
        }

        /// <summary>Automaattinen maakunta sallittu: ei linssiä, ei aloitusnäkymää, peli karttatilassa, maakuntakortti kiinni.</summary>
        bool MaakuntaSallittu()
        {
            if (!nappiSallittu || LinssiPaalla || Aloitusnakyma.AloitusAuki || Maakunnat.KorttiAuki) return false;
            // Luennan aikana ei lappua (savukierros 1.0.73, omistajan linja 88fe1265): matkakirjakortti pysyy auki koko luennan,
            // mutta lapun avaus väistäisi sen (SeliteVaisto). Maakunta avautuu napautuksesta vasta luennan jälkeen.
            if (Aanet.KertojaPuhuu) return false;
            var o = PeliOhjain.Instanssi;
            if (o != null && o.SaapumisluentaKesken) return false;
            return o == null || !o.Kaytossa || o.Tila == SilmukanTila.Kartta;
        }

        /// <summary>
        /// PalloKierto.NapautusKasitelty (automaattinen tila): osuma sulkee lapun kohteen tieltä; tyhjä kohta päätetään vasta
        /// seuraavalla ruudulla, koska kortin ohinapautuksen sulkija (esim. KaupunkiKortti irrotuksessa) voi toimia samalla
        /// ruudulla napautuksen jälkeen.
        /// </summary>
        void Napautettiin(Vector2 ruutu, bool osui)
        {
            if (osui) { Sulje(); return; }
            int painallus = PalloKierto.PainallusRuutu;
            paneeli.schedule.Execute(() => TyhjaNapautus(ruutu, painallus)).StartingIn(20);
        }

        void TyhjaNapautus(Vector2 ruutu, int painallus)
        {
            if (!MaakuntaSallittu()) return;
            // Painallus sulki kortin tai paneelin (ohinapautus): se oli sulkeminen, ei maakunnan valinta.
            if (painallus >= 0 && UiKerros.OhiSulkuRuutu >= painallus) return;
            var mk = MaakuntaKerros();
            string avain = null;
            if (mk != null && mk.RuutuPallolle(ruutu, out double lat, out double lon)) avain = mk.MaaPisteessa(lat, lon);
            Debug.Log($"MATKAKIRJA ui maakunta: tyhjä napautus → {avain ?? "ei maakuntaa"}{(Auki ? ", lappu auki " + Maakunnat.ValittuAvain : "")}");
            // Meri tai maakunnaton kohta sulkee; saman maakunnan uusi napautus sulkee (omistaja 28.9. klo 20.3x).
            if (avain == null || !Maakunnat.Tunnettu(avain) || (Auki && avain == Maakunnat.ValittuAvain)) { Sulje(); return; }
            if (!Auki) Avaa();
            Maakunnat.ValitseKunValmis(avain);
        }

        void KytkePalvelu()
        {
            var p = UiPalvelut.KarttaValot;
            if (ReferenceEquals(p, kuunneltu)) return;
            if (kuunneltu != null) kuunneltu.Muuttui -= PalveluMuuttui;
            kuunneltu = p;
            if (p != null) p.Muuttui += PalveluMuuttui;
        }

        void PalveluMuuttui()
        {
            if (paivitysPyydetty) return;
            paivitysPyydetty = true;
            UiKerros.PaaSaikeessa(() => { paivitysPyydetty = false; if (Auki) Paivita(); });
        }

        void Paivita()
        {
            var p = UiPalvelut.KarttaValot;
            // Web: Kaikki-rivillä kokonaismäärä (laskuri "kaikki" tai aiheiden summa), Ei mitään ilman lukua.
            int summa = 0;
            if (p?.Laskurit != null)
                foreach (var kv in p.Laskurit) if (kv.Key != "kaikki" && kv.Key != "ei" && rivit.ContainsKey(kv.Key)) summa += kv.Value;
            foreach (var pari in rivit)
            {
                int n = 0;
                bool laskettu = p != null && p.Laskurit != null && p.Laskurit.TryGetValue(pari.Key, out n);
                bool erikois = pari.Key == "kaikki" || pari.Key == "ei";
                if (pari.Key == "kaikki" && !laskettu) n = summa;
                pari.Value.Luku.text = p == null || pari.Key == "ei" ? "" : (laskettu || pari.Key == "kaikki" ? n : 0).ToString();
                pari.Value.Rivi.EnableInClassList("mk-tyhja", p != null && !erikois && n == 0);
                pari.Value.Rivi.EnableInClassList("mk-valittu", p != null && p.Valittu == pari.Key);
            }
            lista.EnableInClassList("mk-valittava", p != null);
            SiirraPeukalo();
        }

        void SiirraPeukalo()
        {
            var p = UiPalvelut.KarttaValot;
            if (p == null || p.Valittu == null || !rivit.TryGetValue(p.Valittu, out var r))
            {
                peukalo.style.display = DisplayStyle.None;
                return;
            }
            peukalo.style.display = DisplayStyle.Flex;
            var l = r.Rivi.layout;
            peukalo.style.translate = new Translate(0, l.yMin);
            peukalo.style.height = l.height;
            linssiLuku.text = r.Luku.text;
            peukalo.EnableInClassList("mk-vetaa", vetaa);
        }

        void Asettele()
        {
            float yla = Ylapalkki.Varaus + 8, oikea = Ylapalkki.Piilossa ? 10 + 40 + 8 : 10;
            // iPhonella nappi on yläpalkin rivissä (Ylapalkki.Vieras): ei omaa sijaintia.
            bool rivissa = nappi.ClassListContains("mk-ylapalkki__vieras");
            nappi.style.top = rivissa ? StyleKeyword.Null : yla;
            nappi.style.right = rivissa ? StyleKeyword.Null : oikea;
            // Linssit-nappi kulmassa; jos selitenappi näkyy kartalla (ei rivissä), sen vasemmalla puolella 8 pt:n välillä (web).
            bool selite = !Automaattinen && !rivissa;
            linssit.style.top = yla;
            // Piilotetulla palkilla väkäsnappi (40 pt:n OHJAUSNAPPI, oikea 10) on kulmassa: oikea siirtyy sen ja 8 pt:n välin verran.
            linssit.style.right = selite ? oikea + 40 + 8 : oikea;
            // Maakuntakartassa lappu peittää sen avanneen napin (omistaja 29.9.2026); sulkeminen lapun omalla ✕:llä.
            paneeli.style.top = yla;
            paneeli.style.right = oikea;
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki || Maakunnat.KorttiAuki || MaakuntaKartta) return; // maakuntakartta: napautus kartalla valitsee
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame) return;
            var ruutu = osoitin.position.ReadValue();
            var paneelinPaneeli = paneeli.panel;
            if (paneelinPaneeli == null) return;
            var pp = RuntimePanelUtils.ScreenToPanel(paneelinPaneeli, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!paneeli.worldBound.Contains(pp) && !nappi.worldBound.Contains(pp)) Sulje();
        }
    }
}
