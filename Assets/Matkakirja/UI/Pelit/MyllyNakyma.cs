// MYLLY-NÄKYMÄ (Siirtoseppä 1.10.2026; omistajan hyväksymä lautapelien pohja, Päätoimittajan loki b3e273d72):
//   PELI    = KUVANÄKYMÄ (lauta ilman taustaa, himmennys-kevyt + kartan kertakuvasumennus ja taustan UI-kerrosten blur 4 pt, ✕ 44 pt) + PANEELI (PAPERI: kapiteeli,
//             vuororivi, pelaajarivit, ohje, napit Säännöt / Luovuta). KAPEA: paneeli laudan alla; KESKI/LEVEÄ: oikealla 350 pt.
//   VALINTA = KORTTI (vastustaja: KYTKIN-ryhmä Helppo / Normaali / Vaikea + Kaveri samalla laitteella; Peruuta / Aloita peli).
//   TULOS   = KORTTI (voitto, häviö, tasapeli; botin voitosta palkkio PelinTalous.Minipeli; "Tulos kirjattiin matkakirjaan.").
// Vain tyylikirjan arvot (Tyylikirja.cs, Tyylikirja.uss); äänet tehosteväylältä (click, correct, coin, wrong) ja nappuloiden
// naksahdukset Resources/Pelit/Mylly (Kenney CC0). Lauta Linnanrakentajan Blender-kerroksina (MyllyLauta.Lataa), vektori varalla.
// Säännöt ja botti: Peli/Pelit/Mylly.cs ja Pelikehys.cs (Peli-testit MyllyTestit). Botti hakee kopiosta taustasäikeessä.
// Testikomento: ui mylly [valinta | peli helppo|normaali|vaikea|kaveri | asema <24 merkkiä> <käsi0> <käsi1> <vuoro> | teema lasi|tumma|paperi | tila | sulje].
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MyllyNakyma
    {
        static MyllyNakyma instanssi;
        public static MyllyNakyma Hae() => instanssi ??= new MyllyNakyma(UiKerros.Hae());
        /// <summary>Kohtaaminen kaupungissa (Peliluettelo.Kytke → PeliOhjain.AvaaLautapeli): maan nimi kapiteeliin, paikallinen
        /// nimi apuriville, kaupunki matkakirjaan.</summary>
        public static void Kohtaaminen(PeliKuvaus peli, PeliMaa maa, string kaupunki)
        {
            var n = Hae();
            n.Maa = maa?.MaanNimi; n.PaikallinenNimi = maa?.PaikallinenNimi; n.Paikka = kaupunki;
            n.Avaa();
        }

        /// <summary>Uusintapeli kartan Linssit-napin Pelit-kategoriasta (ei paikkaa eikä maata).</summary>
        public static void AvaaPeli(string id)
        {
            // id = "mylly" tai ansaitun laudan rivi "mylly:luostari" (avaa valinnan sillä laudalla).
            var osat = (id ?? "").Split(':');
            if (osat[0] != Peliluettelo.Mylly.Id) return;
            var n = Hae();
            n.Maa = null; n.PaikallinenNimi = null; n.Paikka = null;
            int lautaIx = osat.Length > 1 ? Array.FindIndex(Laudat, l => l.Id == osat[1]) : -1;
            if (lautaIx >= 0 && LautaKaytossa(lautaIx)) n.Lauta = lautaIx;
            n.Avaa();
        }

        /// <summary>UiNakymat.SuljeKaikki: ei luo näkymää, jos sitä ei ole avattu.</summary>
        public static void SuljeJosAuki() => instanssi?.Sulje();

        /// <summary>UiNakymat.PaivitaKuvaSumea: kartta kertakuvasumennuksena pelin ajan; ei luo näkymää.</summary>
        public static bool AukiNyt => instanssi != null && instanssi.Auki;

        /// <summary>Paikan tiedot kohteelta (pelikatalogi: Mühle Saksassa, Mlin Serbiassa, Moara Moldovassa).</summary>
        public string Paikka = null, PaikallinenNimi = null, Maa = null;

        readonly VisualElement juuri, peliTaso, paneeli, korttiTaso, pysaytys;
        /// <summary>Kartan sumea pysäytyskuva (PalloKierto.Pysaytyskuva, Kokoruutu-taso sammuttaa pallon kameran): oma kerros
        /// tilarivin (15) ja nostojen (12) alla, jotta yläpalkki jää näkyviin ja vain himmenee.</summary>
        const int PysaytysKerros = UiKerros.Nostot - 1;
        readonly MyllyLauta lauta;
        readonly Label kapiteeli, vuoroRivi, nimi0, nimi1, lukema0, lukema1, ohje;
        readonly VisualElement merkki0, merkki1;
        readonly Kortti valintaKortti, tulosKortti;
        readonly List<Button> tasoNapit = new List<Button>(), lautaNapit = new List<Button>();
        readonly Label lautaHistoria;
        /// <summary>LAUTAVALINTA (omistaja 1.10. klo 21.0x ja 21.1x): laudat Peliluettelo.Mylly.Laudat; lukittu = himmeä, apurivi kertoo
        /// miten avautuu. Linnanrakentajan Blender-kerrokset samalla 24 pisteen tiedostolla, peli ei muutu.</summary>
        static PeliLauta[] Laudat => Peliluettelo.Mylly.Laudat;
        static Pelaaja Pelaaja => PeliOhjain.Instanssi != null && PeliOhjain.Instanssi.Matka != null ? PeliOhjain.Instanssi.Matka.Tila.Pelaaja : null;
        /// <summary>Kehittäjätilassa kaikki laudat ilman ansaitsemista (Pelit-kategoria, omistaja 4.10.2026).</summary>
        static bool LautaKaytossa(int i) => Asetukset.Kehittaja || Peliluettelo.Kaytossa(Pelaaja, Peliluettelo.Mylly, Laudat[i]);
        const string LautaAvain = "mylly-lauta";
        int lauta_ = -1;
        /// <summary>Valittu lauta (0 = Majatalo, oletus); viimeisin valinta muistetaan laitteella.</summary>
        public int Lauta
        {
            get
            {
                if (lauta_ < 0) lauta_ = Mathf.Clamp(PlayerPrefs.GetInt(LautaAvain, 0), 0, Laudat.Length - 1);
                return LautaKaytossa(lauta_) ? lauta_ : 0; // muistettu lauta toisesta matkasta voi olla lukossa
            }
            set { lauta_ = Mathf.Clamp(value, 0, Laudat.Length - 1); PlayerPrefs.SetInt(LautaAvain, lauta_); PlayerPrefs.Save(); }
        }
        readonly Label tulosKapiteeli, tulosOtsikko, tulosApuri, tulosPalkkio, tulosKirjattu, tulosLaudat;
        readonly VisualElement otsikko;
        readonly Label otsikkoLauta;
        readonly VisualElement tulosPalkkioRivi;

        Mylly peli;
        Vastustaja vastustaja = Vastustaja.BottiNormaali;
        readonly List<MyllySiirto> siirrot = new List<MyllySiirto>();
        int valittu = -1, poistoKohde = -1, poistoLahde = -1;
        bool bottiMiettii, paattynyt;
        int kerta;
        readonly Satunnainen sat = new Satunnainen((long)DateTime.Now.Ticks);

        public bool Auki { get; private set; }

        /// <summary>Pelin aikaisen tilapaneelin PANEELI-teema (Tyylikirja .tk-teema-*, LAUTAPELI-pohja): paperi; vertailuun "ui mylly teema …".</summary>
        const string PaneelinTeema = "tk-teema-paperi"; // omistaja 11.0x: alkuperäinen paperi (tumma ja lasi kokeiltu)
        static readonly string[] Teemat = { "tk-teema-lasi", "tk-teema-tumma", "tk-teema-paperi" };

        MyllyNakyma(UiKerros kerros)
        {
            juuri = kerros.Juuri(UiKerros.Pelidialogit);
            pysaytys = Rakenne.El("mk-peli__pysaytys", kerros.Juuri(PysaytysKerros), PickingMode.Ignore);
            pysaytys.style.display = DisplayStyle.None;
            PalloKierto.PysaytysValmis += t => { if (Auki) AsetaPysaytys(t); };
            PalloKierto.PysaytysPoistui += () => AsetaPysaytys(null); // synkronisesti: tekstuuri vapautetaan heti tämän jälkeen

            // PELI: KUVANÄKYMÄ + PANEELI.
            peliTaso = Rakenne.El("mk-himmennys mk-peli", juuri);
            peliTaso.style.display = DisplayStyle.None;
            lauta = new MyllyLauta(Napautus);
            peliTaso.Add(lauta);
            // OTSIKKO (omistaja 4.10. 22.3x TF 140: "Ota x nappi pois. Lisää pelille logo otsikko … Laudan nimi saisi olla myös
            // esillä"; Päätoimittaja): aloitusruudun JULISTE-pohja laudan yläpuolelle — viiva / MYLLY / laudan nimi / viiva.
            otsikko = Rakenne.El("mk-juliste mk-peli__otsikko", peliTaso, PickingMode.Ignore);
            otsikko.style.position = Position.Absolute;
            Aloitusnakyma.Kapea(otsikko);
            Aloitusnakyma.Viiva(otsikko);
            Aloitusnakyma.JulisteRivi(otsikko, Kieli.T("ui.mylly.juliste"), "mk-juliste__nimi");
            otsikkoLauta = Aloitusnakyma.JulisteRivi(otsikko, "", "mk-juliste__osa");
            Aloitusnakyma.Viiva(otsikko);
            paneeli = Rakenne.El("mk-peli__paneeli " + PaneelinTeema, peliTaso); // omistaja 2.10. 11.0x: PAPERI
            // Paneelin "Mylly"-yläotsikko pois (otsikko kertoo saman); kapiteeli vain paikallisnimelle ja maalle.
            kapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", paneeli);
            Kirjasimet.Aseta(kapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            vuoroRivi = Rakenne.Teksti("", "mk-peli__vuoro", paneeli);
            Kirjasimet.Aseta(vuoroRivi, Kirjasin.LukuLihava);
            (merkki0, nimi0, lukema0) = PelaajaRivi("mk-peli__merkki--vaalea");
            (merkki1, nimi1, lukema1) = PelaajaRivi("mk-peli__merkki--tumma");
            ohje = Rakenne.Teksti("", "mk-peli__ohje", paneeli);
            Kirjasimet.Aseta(ohje, Tyylikirja.Kirjain.Apuri);
            var napit = Rakenne.El("mk-kortti__napit", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.saannot"), "mk-nappi--toiminto", NaytaSaannot, napit), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.luovuta"), "mk-nappi--toiminto", Luovuta, napit), Kirjasin.Kone);
            // ✕ pois (omistaja 4.10.): pelistä poistutaan nappirivin Poistu-napilla, toiminta kuten ✕:llä ennen.
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.poistu"), "mk-nappi--toiminto", Sulje, napit), Kirjasin.Kone);
            peliTaso.RegisterCallback<GeometryChangedEvent>(_ => Asettele());

            // KORTIT (valinta, tulos, säännöt) himmennyksellä pelin päälle.
            korttiTaso = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            korttiTaso.style.display = DisplayStyle.None;

            // Kortit lisätään himmennykseen yksi kerrallaan (NaytaKortti): Rakenne.Nayta ponnauttaa kaikki Kortti-lapset.
            // Vierittyvä kortti kuten tietokerroksen kortisto (mk-tietoja: enintään 86 % ruudusta; asettelutesti 10.10.2026: iPhone
            // vaaka, Lauta-napit ja Aloita ruudun alareunan alla): sisältö ScrollViewiin, Peruuta ja Aloita kiinteästi alaosaan.
            valintaKortti = new Kortti("mk-peli__kortti mk-tietoja", pohja: true);
            var valintaSisalto = new ScrollView(ScrollViewMode.Vertical);
            valintaSisalto.AddToClassList("mk-tietoja__vieritys");
            valintaSisalto.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            valintaKortti.Sisus.Add(valintaSisalto);
            var vk = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-peli__valinta-kapiteeli", valintaSisalto);
            Kirjasimet.Aseta(vk, Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti(Asetus.T("mylly.valinta.otsikko", Kieli.T("ui.mylly.valinta-otsikko")), "mk-kortti__otsikko", valintaSisalto), Tyylikirja.Kirjain.Otsikko);
            var ala = Rakenne.Teksti("", "mk-kortti__alaotsikko mk-peli__valinta-ala", valintaSisalto);
            Kirjasimet.Aseta(ala, Tyylikirja.Kirjain.Apuri);
            Rakenne.Teksti(Kieli.T("ui.mylly.valinta-selite"),
                "mk-kortti__teksti", valintaSisalto);
            var vo = Rakenne.Teksti(Kieli.T("ui.pelit.vastustaja"), "mk-peli__valiotsikko", valintaSisalto);
            Kirjasimet.Aseta(vo, Tyylikirja.Kirjain.Valiotsikko);
            var ryhma = Rakenne.El("mk-peli__kytkinryhma", valintaSisalto);
            foreach (var (teksti, v) in new[] { (Kieli.T("ui.pelit.botti-helppo"), Vastustaja.BottiHelppo), (Kieli.T("ui.pelit.botti-normaali"), Vastustaja.BottiNormaali), (Kieli.T("ui.pelit.botti-vaikea"), Vastustaja.BottiVaikea) })
                tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(teksti, "mk-peli__kytkin", () => ValitseVastustaja(v), ryhma), Kirjasin.Luku));
            var kaveriRyhma = Rakenne.El("mk-peli__kytkinryhma", valintaSisalto);
            tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.kaveri-samalla-laitteella"), "mk-peli__kytkin", () => ValitseVastustaja(Vastustaja.Kaveri), kaveriRyhma), Kirjasin.Luku));
            var lo = Rakenne.Teksti(Kieli.T("ui.pelit.lauta"), "mk-peli__valiotsikko", valintaSisalto);
            Kirjasimet.Aseta(lo, Tyylikirja.Kirjain.Valiotsikko);
            var lautaRyhma = Rakenne.El("mk-peli__kytkinryhma", valintaSisalto);
            for (int i = 0; i < Laudat.Length; i++)
            {
                int ii = i;
                lautaNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(Laudat[i].Nimi, "mk-peli__kytkin", () => ValitseLauta(ii), lautaRyhma), Kirjasin.Luku));
            }
            lautaHistoria = Rakenne.Teksti("", "mk-kortti__alaotsikko mk-peli__historia", valintaSisalto);
            Kirjasimet.Aseta(lautaHistoria, Tyylikirja.Kirjain.Apuri);
            var vn = Rakenne.El("mk-kortti__napit", valintaKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.yleinen.peruuta"), "mk-nappi--toiminto", Sulje, vn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.aloita-peli"), "mk-nappi--kulta", AloitaPeli, vn), Kirjasin.KoneLihava);

            tulosKortti = new Kortti("mk-peli__kortti", pohja: true);
            tulosKapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            tulosOtsikko = Rakenne.Teksti("", "mk-kortti__otsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosOtsikko, Tyylikirja.Kirjain.Otsikko);
            tulosApuri = Rakenne.Teksti("", "mk-kortti__alaotsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosApuri, Tyylikirja.Kirjain.Apuri);
            tulosPalkkioRivi = Rakenne.El("mk-peli__rivi", tulosKortti.Sisus, PickingMode.Ignore);
            Rakenne.Teksti(Kieli.T("ui.pelit.voittopalkkio"), "mk-peli__rivi-nimi", tulosPalkkioRivi);
            tulosPalkkio = Rakenne.Teksti("", "mk-peli__palkkio", tulosPalkkioRivi);
            Kirjasimet.Aseta(tulosPalkkio, Tyylikirja.Kirjain.Valiotsikko);
            tulosLaudat = Rakenne.Teksti("", "mk-kortti__teksti mk-peli__ansaitut", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosLaudat, Kirjasin.LukuLihava);
            tulosKirjattu = Rakenne.Teksti(Kieli.T("ui.pelit.tulos-kirjattu"), "mk-kortti__alaotsikko mk-peli__kirjattu", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKirjattu, Tyylikirja.Kirjain.Apuri);
            var tn = Rakenne.El("mk-kortti__napit", tulosKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.pelaa-uudelleen"), "mk-nappi--toiminto", () => NaytaKortti(valintaKortti), tn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.jatka-matkaa"), "mk-nappi--kulta", Sulje, tn), Kirjasin.KoneLihava);

            Kirjasimet.Aseta(peliTaso, Kirjasin.Luku);
            Kirjasimet.Aseta(korttiTaso, Kirjasin.Luku);
        }

        (VisualElement, Label, Label) PelaajaRivi(string merkkiLuokka)
        {
            var rivi = Rakenne.El("mk-peli__rivi", paneeli, PickingMode.Ignore);
            var m = Rakenne.El("mk-peli__merkki " + merkkiLuokka, rivi, PickingMode.Ignore);
            var n = Rakenne.Teksti("", "mk-peli__rivi-nimi", rivi);
            var l = Rakenne.Teksti("", "mk-peli__lukema", rivi);
            Kirjasimet.Aseta(l, Tyylikirja.Kirjain.Kapiteeli);
            return (m, n, l);
        }

        // --- avaus ja sulku ------------------------------------------------------------------------------------------

        /// <summary>Avaa vastustajan valinnan (KORTTI). Paikka: kohteen nimi kapiteeliin ja matkakirjaan.</summary>
        public void Avaa(string paikka = null)
        {
            if (paikka != null) Paikka = paikka;
            Auki = true;
            SyoteLukko.Esta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = Visibility.Hidden;
            Lipputanko.Piilota(this, true); // Päätoimittaja 4.10.: kirkas lippu otsikon vieressä vei katseen
            Pehmenna(true);
            if (PalloKierto.Pysaytyskuva != null) AsetaPysaytys(PalloKierto.Pysaytyskuva);
            peli ??= new Mylly();
            lauta.Lataa();
            RekisteroiAani(AaniAsetus); RekisteroiAani(AaniPoisto);
            foreach (var n in new[] { AaniSiirto, AaniMylly, AaniVoitto, AaniHavio }) RekisteroiAani(n, LisaVahvistus);
            Paivita();
            peliTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(peliTaso, true, Tyylikirja.Kesto.Avaus);
            NaytaKortti(valintaKortti);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            kerta++;
            bottiMiettii = false;
            Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);
            Rakenne.Nayta(peliTaso, false, Tyylikirja.Kesto.Sulku);
            SyoteLukko.Vapauta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = StyleKeyword.Null;
            Lipputanko.Piilota(this, false);
            Pehmenna(false);
            // Kerrokset ja äänet muistista sulkuanimaation jälkeen (Natiiviseppä: Resources.UnloadUnusedAssets suljettaessa).
            int k = kerta;
            lauta.schedule.Execute(() =>
            {
                if (Auki || k != kerta) return;
                lauta.Pura();
                Aanet.RekisteroiTehoste(AaniAsetus, (AudioClip)null);
                Aanet.RekisteroiTehoste(AaniPoisto, (AudioClip)null);
                foreach (var n in new[] { AaniSiirto, AaniMylly, AaniVoitto, AaniHavio }) Aanet.RekisteroiTehoste(n, (AudioClip)null);
                Resources.UnloadUnusedAssets();
            }).StartingIn(Tyylikirja.Kesto.Sulku + 50);
        }

        // NAPPULOIDEN ÄÄNET (Kenney Impact Sounds, CC0; omistajan OK 2.10.2026): asetus/siirto naksahtaa, kun nappula
        // laskeutuu (liu'un lopussa), poisto heti perään. Puuttuva klippi → tehosteväylän "click" kuten ennen.
        // v2 (Pelikoodari 3.10., ämpäri aanet/tehosteet/mylly-v2/, Kenney CC0): molemmat samalla tasolla (huiput −1,5 / −1,4 dBFS),
        // joten tehosteiden oletusvahvistus ilman omaa kerrointa; v1:n asetus oli ~10 dB hiljaisempi ja tarvitsi 0,5:n.
        const string AaniAsetus = "mylly-asetus", AaniPoisto = "mylly-poisto";
        // Lisä-äänet (Pelikoodari 5.10., Freesound CC0, huiput −6 dBFS eli 4,5 dB vanhoja hiljaisempia → vahvistus × 1,68):
        // liuku siirron alussa, lukitusisku heti kun mylly syntyy (ennen poistoa), voitto ja häviö lopputuloksessa.
        const string AaniSiirto = "mylly-siirto", AaniMylly = "mylly-mylly", AaniVoitto = "mylly-voitto", AaniHavio = "mylly-havio";
        static float LisaVahvistus => Vahvistus * Asetus.Luku("aanet.MyllyLisaKerroin", 1.68f);
        /// <summary>Päätoimittaja 5.10. (kaappaus bc863309): oletusvahvistuksella 0,35 nappulat soivat −23…−25 dBFS, puhelimen kaiuttimesta
        /// heikosti. 1,6 (+13 dB; 1,1 mitattiin 5.10. 01.52: huiput −15,3…−17,2) → ≈ −12…−14 dBFS (tavoite −12…−15), AudioSource.volume 1,6 × 0,296 ≈ 0,47.</summary>
        static float Vahvistus => Asetus.Luku("aanet.MyllyVahvistus", 1.6f);

        static void SiirronAani(MyllySiirto s, float voima)
        {
            float lasku = s.Mista >= 0 ? Tyylikirja.Kesto.Liuku / 1000f * 0.9f : 0f;
            if (s.Mista >= 0) Aanet.Tehoste(AaniSiirto, voima);
            bool oma = Aanet.Tehoste(AaniAsetus, voima, lasku);
            if (!oma) Aanet.Tehoste("click", voima);
            if (s.Poista >= 0 && !Aanet.Tehoste(AaniPoisto, voima, lasku + 0.12f)) Aanet.Tehoste("wrong", voima);
            Debug.Log($"MATKAKIRJA mylly: ääni {(s.Mista >= 0 ? AaniSiirto + " + " : "")}{(oma ? AaniAsetus : "click")}{(s.Poista >= 0 ? " + " + AaniPoisto : "")}");
        }

        /// <summary>Savuke 1113: naksua ei todennettu. Klippi ladataan muistiin heti (preloadAudioData + LoadAudioData), jotta
        /// ensimmäinen soitto leikkaa siivun eikä jää latauksen taakse; puuttuva klippi lokiin.</summary>
        static void RekisteroiAani(string nimi, float vahvistus = -1f)
        {
            if (vahvistus < 0f) vahvistus = Vahvistus;
            var c = Resources.Load<AudioClip>(MyllyLauta.KansioPolku + nimi);
            if (c == null) { Debug.LogWarning("MATKAKIRJA mylly: ääni puuttuu " + nimi); return; }
            if (c.loadState != AudioDataLoadState.Loaded) c.LoadAudioData();
            // Äänimikseri (Natiivi-UI 9.10.): lautapelien tehosteet kontekstiin "lautapelit" (Aanet.Tehoste lukee äänen kertoimen).
            Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen.Rekisteroi("lautapelit", "tehosteet", Aanet.MikseriId("tehoste/", nimi), nimi,
                Aanet.MikseriId("tehoste/", nimi), c.name);
            Aanet.RekisteroiTehoste(nimi, c, vahvistus, omaIsku: true);
        }

        /// <summary>TAUSTAN PEHMENNYS (omistaja 2.10. klo 11.0x, loki 11.01: "pehmennä kaikki elementit taustalla, myös
        /// tekstit"; Natiivi-UI:n keino): pallo on Kokoruutu-tason sumea pysäytyskuva (kerros 11), ja laudan alla olevien
        /// UI-kerrosten juuriin (nostot 12, tilarivi ja yläpalkki 15, matkavalinta 20) UI Toolkitin blur-suodin 4 pt kuten
        /// Nostokortti.AsetaPehmennys. Kerran avattaessa ja kerran suljettaessa; pois Nullilla (ei StyleKeyword.None, 6.3 kaatuu).</summary>
        static void Pehmenna(bool paalle)
        {
            var k = UiKerros.Hae();
            foreach (int kerros in PehmeatKerrokset)
            {
                var j = k.Juuri(kerros);
                if (!paalle) { j.style.filter = StyleKeyword.Null; continue; }
                var f = new FilterFunction(FilterFunctionType.Blur);
                f.AddParameter(new FilterParameter(PehmennysPt));
                j.style.filter = new List<FilterFunction> { f };
            }
        }

        static readonly int[] PehmeatKerrokset = { UiKerros.Nostot, UiKerros.Tilarivi, UiKerros.Matkavalinta };
        const float PehmennysPt = 4f;

        void AsetaPysaytys(Texture t)
        {
            if (t == null) { pysaytys.style.backgroundImage = StyleKeyword.None; pysaytys.style.display = DisplayStyle.None; return; }
            var tausta = t is RenderTexture rt ? Background.FromRenderTexture(rt) : t is Texture2D t2 ? Background.FromTexture2D(t2) : default;
            pysaytys.style.backgroundImage = new StyleBackground(tausta);
            pysaytys.style.display = DisplayStyle.Flex;
        }

        void NaytaKortti(Kortti k)
        {
            if (k.parent != korttiTaso)
            {
                korttiTaso.Clear();
                korttiTaso.Add(k);
                korttiTaso.RemoveFromClassList("mk-auki"); // uusi kortti ponnahtaa (Rakenne.Nayta: muutos kiinni → auki)
            }
            if (k == valintaKortti)
            {
                // Kapiteeliin maa (Päätoimittaja: "Saksa · kohtaaminen"), apuriville paikallinen nimi; uusinnassa pelin nimet.
                valintaKortti.Q<Label>(className: "mk-peli__valinta-kapiteeli").text = Maa != null ? Kieli.T("ui.pelit.kohtaaminen", Maa) : Kieli.T("ui.mylly.uusintapeli");
                valintaKortti.Q<Label>(className: "mk-peli__valinta-ala").text = PaikallinenNimi != null
                    ? Kieli.T("ui.pelit.paikallinen-nimi", PaikallinenNimi)
                    : Kieli.T("ui.mylly.tunnetaan-nimilla");
                ValitseVastustaja(vastustaja);
                ValitseLauta(Lauta);
            }
            korttiTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(korttiTaso, true, Tyylikirja.Kesto.Avaus);
        }

        void PiilotaKortti() => Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);

        void ValitseVastustaja(Vastustaja v)
        {
            vastustaja = v;
            for (int i = 0; i < tasoNapit.Count; i++) tasoNapit[i].EnableInClassList("mk-valittu", i == (int)v);
        }

        void ValitseLauta(int i)
        {
            bool kaytossa = LautaKaytossa(i);
            if (kaytossa) Lauta = i;
            for (int k = 0; k < lautaNapit.Count; k++)
            {
                lautaNapit[k].EnableInClassList("mk-valittu", k == Lauta);
                lautaNapit[k].EnableInClassList("mk-peli__kytkin--lukittu", !LautaKaytossa(k));
            }
            // Lukitun napautus: apurivi kertoo miten lauta avautuu; valinta pysyy.
            lautaHistoria.text = kaytossa ? Laudat[Lauta].Historia : Laudat[i].Nimi + " · " + Laudat[i].Ehto;
            lauta.AsetaLauta(Laudat[Lauta].Id);
        }

        public void AloitaPeli()
        {
            kerta++;
            peli = new Mylly();
            paattynyt = false; bottiMiettii = false;
            valittu = poistoKohde = poistoLahde = -1;
            PiilotaKortti();
            Paivita();
        }

        // --- vuorot ---------------------------------------------------------------------------------------------------

        bool IhmisenVuoro => !paattynyt && !bottiMiettii && (vastustaja == Vastustaja.Kaveri || peli.Vuorossa == 0);

        void Napautus(int piste)
        {
            if (!IhmisenVuoro) return;
            peli.Siirrot(siirrot);
            int oma = peli.Vuorossa;
            if (poistoKohde >= 0)
            {
                foreach (var s in siirrot)
                    if (s.Mihin == poistoKohde && s.Mista == poistoLahde && s.Poista == piste) { Tee(s); return; }
                return;
            }
            if (peli.Nappula(piste) == oma && !peli.Asetusvaihe(oma))
            {
                valittu = siirrot.Exists(s => s.Mista == piste) ? piste : -1;
                Aanet.Tehoste("click", 0.5f);
                Paivita();
                return;
            }
            if (peli.Nappula(piste) >= 0) return;
            int lahde = peli.Asetusvaihe(oma) ? -1 : valittu;
            if (lahde < 0 && !peli.Asetusvaihe(oma)) return;
            var ehdokkaat = siirrot.FindAll(s => s.Mista == lahde && s.Mihin == piste);
            if (ehdokkaat.Count == 0) return;
            if (ehdokkaat[0].Poista >= 0)
            {
                // Mylly: näytetään siirto ja odotetaan poistettavan valintaa.
                poistoKohde = piste; poistoLahde = lahde;
                if (!Aanet.Tehoste(AaniMylly)) Aanet.Tehoste("correct", 0.7f);
                Debug.Log("MATKAKIRJA mylly: ääni " + AaniMylly);
                Paivita();
                return;
            }
            Tee(ehdokkaat[0]);
        }

        void Tee(MyllySiirto s)
        {
            peli.Tee(s);
            lauta.Animoi(s, peli.Nappula(s.Mihin));
            valittu = poistoKohde = poistoLahde = -1;
            SiirronAani(s, 1f);
            Paivita();
            if (TarkistaLoppu()) return;
            if (vastustaja != Vastustaja.Kaveri && peli.Vuorossa == 1) BotinVuoro();
        }

        void BotinVuoro()
        {
            bottiMiettii = true;
            Paivita();
            int oma = ++kerta;
            var kopio = peli.Kopio();
            var (syvyys, hairio) = Botti.Taso(vastustaja);
            float alku = Time.realtimeSinceStartup;
            var tehtava = Task.Run(() => Botti.Valitse(kopio, syvyys, hairio, sat));
            UiKerros.Hae().StartCoroutine(Odota());
            System.Collections.IEnumerator Odota()
            {
                while (!tehtava.IsCompleted || Time.realtimeSinceStartup - alku < 0.45f) yield return null;
                if (oma != kerta || !Auki) yield break;
                bottiMiettii = false;
                if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA mylly: botti " + tehtava.Exception); yield break; }
                var s = tehtava.Result;
                peli.Tee(s);
                lauta.Animoi(s, peli.Nappula(s.Mihin));
                if (s.Poista >= 0) Aanet.Tehoste(AaniMylly, 0.8f, s.Mista >= 0 ? Tyylikirja.Kesto.Liuku / 1000f * 0.9f + 0.05f : 0.05f);
                SiirronAani(s, 0.8f);
                Paivita();
                TarkistaLoppu();
            }
        }

        bool TarkistaLoppu()
        {
            var t = peli.Lopputulos();
            if (!t.HasValue) return false;
            Lopeta(t.Value);
            return true;
        }

        void Luovuta()
        {
            if (paattynyt) { Sulje(); return; }
            Lopeta(-2);
        }

        void Lopeta(int voittaja)
        {
            paattynyt = true; bottiMiettii = false; kerta++;
            var tulos = new PeliTulos
            {
                PeliId = Peliluettelo.Mylly.Id, Nimi = "Mylly", PaikallinenNimi = PaikallinenNimi, Paikka = Paikka, Vastustaja = vastustaja,
                Voittaja = voittaja, Siirtoja = peli.Siirtoja, Paiva = DateTime.Now.ToString("yyyy-MM-dd"),
            };
            int palkkio = 0;
            var matka = PeliOhjain.Instanssi != null ? PeliOhjain.Instanssi.Matka : null;
            var ansaitut = new List<PeliLauta>();
            if (matka != null) { var k = Pelikehys.Kirjaa(matka, tulos, PelinTalous.Minipeli); palkkio = k.Palkkio; ansaitut = k.Laudat; }
            Debug.Log("MATKAKIRJA mylly: " + Pelikehys.Matkakirjarivi(tulos) + (palkkio > 0 ? $" +£{palkkio}" : ""));
            // Voitto (myös kaveripelin voittaja) tai häviö botille; tasapeli ja luovutus ilman ääntä.
            string loppuAani = voittaja < 0 ? null : vastustaja == Vastustaja.Kaveri || voittaja == 0 ? AaniVoitto : AaniHavio;
            if (loppuAani != null) { Aanet.Tehoste(loppuAani, 1f, 0.35f); Debug.Log("MATKAKIRJA mylly: ääni " + loppuAani); }
            Paivita();

            bool kaveri = vastustaja == Vastustaja.Kaveri;
            tulosKapiteeli.text = Kieli.T(voittaja == -1 ? "ui.mylly.kapiteeli-tasapeli" : voittaja == -2 ? "ui.mylly.kapiteeli-luovutus" : kaveri || voittaja == 0 ? "ui.mylly.kapiteeli-voitto" : "ui.mylly.kapiteeli-tappio");
            tulosOtsikko.text = voittaja == -1 ? Kieli.T("ui.mylly.tasapeli") : voittaja == -2 ? Kieli.T("ui.pelit.luovutit")
                : kaveri ? Kieli.T(voittaja == 0 ? "ui.pelit.vaalea-voitti" : "ui.pelit.tumma-voitti")
                : voittaja == 0 ? Kieli.T("ui.mylly.voitit") : Kieli.T("ui.pelit.botti-voitti");
            string vast = Pelikehys.VastustajanNimi(vastustaja);
            tulosApuri.text = kaveri ? Kieli.T("ui.mylly.kaveripeli", peli.Siirtoja)
                : voittaja == 0 ? Kieli.T("ui.mylly.voitit-vastustajan", vast.StartsWith("botti") ? Kieli.T("ui.pelit.botin") + vast.Substring(5) : vast, peli.Siirtoja)
                : Kieli.T("ui.mylly.vastassa", vast, peli.Siirtoja);
            tulosPalkkioRivi.style.display = palkkio > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            tulosPalkkio.text = $"+£{palkkio}";
            tulosKirjattu.style.display = matka != null ? DisplayStyle.Flex : DisplayStyle.None;
            // Ansaitut laudat (omistaja 1.10.): uusi lauta auki / majatalon lauta Peleihin (4.10.: pelit pois Aarteista).
            tulosLaudat.text = string.Join("\n", ansaitut.ConvertAll(l => l.Avautuu == null ? Kieli.T("ui.pelit.esine-tallentui", l.Esine) : Kieli.T("ui.pelit.uusi-lauta", l.Nimi)));
            tulosLaudat.style.display = ansaitut.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            Aanet.Tehoste(palkkio > 0 ? "coin" : voittaja == 0 || kaveri ? "correct" : "wrong");
            UiKerros.Hae().StartCoroutine(Viive());
            System.Collections.IEnumerator Viive() { yield return new WaitForSecondsRealtime(0.6f); if (Auki) NaytaKortti(tulosKortti); }
        }

        void NaytaSaannot()
        {
            UiNakymat.Hae().Vahvistus.Kysy(Kieli.T("ui.mylly.saannot-otsikko"),
                Kieli.T("ui.mylly.saannot-teksti"),
                Kieli.T("ui.pelit.sulje"), Kieli.T("ui.pelit.jatka-peli"), null, Kieli.T("ui.mylly.saannot-kapiteeli"));
        }

        // --- näyttö ---------------------------------------------------------------------------------------------------

        void Paivita()
        {
            if (peli == null) return;
            bool kaveri = vastustaja == Vastustaja.Kaveri;
            kapiteeli.text = (PaikallinenNimi ?? "") + (PaikallinenNimi != null && Maa != null ? " · " : "") + (Maa ?? "");
            kapiteeli.style.display = string.IsNullOrEmpty(kapiteeli.text) ? DisplayStyle.None : DisplayStyle.Flex;
            otsikkoLauta.text = Laudat[Lauta].Nimi.ToUpperInvariant();
            nimi0.text = kaveri ? Kieli.T("ui.pelit.vaalea") : Kieli.T("ui.pelit.sina");
            nimi1.text = kaveri ? Kieli.T("ui.pelit.tumma") : Pelikehys.VastustajanNimi(vastustaja).Replace("botti (", Kieli.T("ui.pelit.botti-etuliite")).TrimEnd(')');   // kieli: ei (Pelikehyksen nimen tunniste)
            lukema0.text = Lukema(0); lukema1.text = Lukema(1);
            int oma = peli.Vuorossa;
            string kuka = kaveri ? (oma == 0 ? Kieli.T("ui.pelit.vaalea") : Kieli.T("ui.pelit.tumma")) : Kieli.T("ui.pelit.sinun-vuorosi");
            if (paattynyt) { vuoroRivi.text = Kieli.T("ui.pelit.peli-paattyi"); ohje.text = ""; }
            else if (bottiMiettii) { vuoroRivi.text = Kieli.T("ui.mylly.botti-miettii"); ohje.text = ""; }
            else if (poistoKohde >= 0) { vuoroRivi.text = Kieli.T(oma == 0 ? "ui.mylly.poista-tumma" : "ui.mylly.poista-vaalea"); ohje.text = Kieli.T("ui.mylly.poista-ohje"); }
            else if (peli.Asetusvaihe(oma)) { vuoroRivi.text = Kieli.T("ui.mylly.aseta-nappula", kuka); ohje.text = Kieli.T("ui.mylly.asetusvaihe", peli.Kadessa(oma)); }
            else if (peli.Lentaa(oma)) { vuoroRivi.text = Kieli.T("ui.mylly.lenna-nappula", kuka); ohje.text = Kieli.T("ui.mylly.lentovaihe"); }
            else { vuoroRivi.text = Kieli.T(valittu >= 0 ? "ui.mylly.valitse-kohde" : "ui.mylly.valitse-siirrettava", kuka); ohje.text = Kieli.T("ui.mylly.siirtovaihe"); }
            ohje.style.display = string.IsNullOrEmpty(ohje.text) ? DisplayStyle.None : DisplayStyle.Flex;

            // Laudan korostukset.
            var kohteet = new List<int>(); var poistettavat = new List<int>();
            if (IhmisenVuoro)
            {
                peli.Siirrot(siirrot);
                foreach (var s in siirrot)
                {
                    if (poistoKohde >= 0) { if (s.Mihin == poistoKohde && s.Mista == poistoLahde && s.Poista >= 0) poistettavat.Add(s.Poista); }
                    else if (valittu >= 0 && s.Mista == valittu) kohteet.Add(s.Mihin);
                }
            }
            var viim = peli.Viimeisin;
            lauta.Aseta(peli, valittu, poistoKohde, poistoLahde, kohteet, poistettavat, viim.HasValue ? viim.Value.Mihin : -1);
        }

        string Lukema(int p) => peli.Kadessa(p) > 0 ? Kieli.T("ui.mylly.lukema-kadessa", peli.Kadessa(p), peli.Laudalla(p)) : Kieli.T("ui.mylly.lukema-laudalla", peli.Laudalla(p));

        void Asettele()
        {
            float w = peliTaso.layout.width, h = peliTaso.layout.height;
            if (float.IsNaN(w) || w <= 0 || h <= 0) return;
            var t = UiKerros.Hae().Reunat(UiKerros.Pelidialogit);
            float m = Tyylikirja.Vali.M;
            // Otsikko laudan yläpuolelle; sen korkeus mitataan (ensimmäisellä kerralla arvio).
            float oKork = float.IsNaN(otsikko.layout.height) || otsikko.layout.height <= 0 ? 104f : otsikko.layout.height;
            // Yläpalkin alle (iPad 4.10.: turva-alueen reuna jäi palkin alle ja MYLLY-otsikko peittyi), kuten muut ylhäältä
            // asemoituvat näkymät (Ylapalkki.Varaus: iPhonen saaririvi, iPadin palkki, 0 kun piilossa).
            float ylin = t.y + Ylapalkki.Varaus + m;
            bool kapea = Pohja.Leveys(w - t.x - t.z) == Pohja.Luokka.Kapea && h > w;
            if (kapea)
            {
                float yla = ylin + oKork;
                float pKork = float.IsNaN(paneeli.layout.height) || paneeli.layout.height <= 0 ? 300f : paneeli.layout.height;
                float koko = Mathf.Min(w - t.x - t.z - 2 * m, h - yla - t.w - pKork - 2 * m);
                Sijoita(lauta, (w - koko) / 2f, yla, koko, koko);
                SijoitaOtsikko(w / 2f, ylin, w - t.x - t.z);
                paneeli.style.left = t.x + m; paneeli.style.right = t.z + m; paneeli.style.width = StyleKeyword.Auto;
                paneeli.style.top = yla + koko + m; paneeli.style.bottom = StyleKeyword.Auto;
                paneeli.style.maxHeight = StyleKeyword.Null;
            }
            else
            {
                float pw = Tyylikirja.Leveys.Paneeli;
                float koko = Mathf.Min(h - ylin - t.w - m - oKork, w - t.x - t.z - pw - 3 * m);
                float vasen = t.x + m + Mathf.Max(0, (w - t.x - t.z - pw - 3 * m - koko) / 2f);
                Sijoita(lauta, vasen, ylin + oKork, koko, koko);
                SijoitaOtsikko(vasen + koko / 2f, ylin, koko);
                paneeli.style.left = StyleKeyword.Auto; paneeli.style.right = t.z + m; paneeli.style.width = pw;
                // Oikea palsta ylimmästä kohdasta (otsikko on vain laudan yläpuolella) ja enintään turva-alueen alareunaan
                // (asettelutesti 10.10.2026: iPhone vaaka, Säännöt/Luovuta/Poistu y 384–429 ruudun alareunan alla).
                paneeli.style.top = ylin; paneeli.style.bottom = StyleKeyword.Auto;
                paneeli.style.maxHeight = Mathf.Max(0f, h - ylin - t.w - m);
            }
        }

        /// <summary>Otsikko keskelle annettua kohtaa (leveys enintään laudan tai ruudun leveys).</summary>
        void SijoitaOtsikko(float keskiX, float yla, float leveys)
        {
            otsikko.style.width = Mathf.Round(leveys); otsikko.style.maxWidth = StyleKeyword.None;
            otsikko.style.left = Mathf.Round(keskiX - leveys / 2f); otsikko.style.top = Mathf.Round(yla);
        }

        static void Sijoita(VisualElement e, float x, float y, float w, float h)
        {
            e.style.left = Mathf.Round(x); e.style.top = Mathf.Round(y); e.style.width = Mathf.Round(w); e.style.height = Mathf.Round(h);
        }

        // --- testikomento ---------------------------------------------------------------------------------------------

        public string Komento(string loput)
        {
            var o = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string k = o.Length > 0 ? o[0] : "valinta";
            switch (k)
            {
                case "valinta": Avaa(); return "mylly: valinta";
                case "peli":
                    if (!Auki) Avaa();
                    if (o.Length > 1) ValitseVastustaja(o[1] switch { "helppo" => Vastustaja.BottiHelppo, "vaikea" => Vastustaja.BottiVaikea, "kaveri" => Vastustaja.Kaveri, _ => Vastustaja.BottiNormaali });
                    AloitaPeli();
                    return "mylly: peli " + vastustaja;
                case "asema" when o.Length >= 5:
                    if (!Auki) Avaa();
                    PiilotaKortti();
                    kerta++; paattynyt = false; bottiMiettii = false; valittu = poistoKohde = poistoLahde = -1;
                    peli = Mylly.Asemasta(o[1], int.Parse(o[2]), int.Parse(o[3]), int.Parse(o[4]));
                    Paivita();
                    return "mylly: asema " + peli.Asema();
                case "napauta" when o.Length >= 2: Napautus(int.Parse(o[1])); return "mylly: " + vuoroRivi.text;
                case "tulos" when o.Length >= 2: if (!Auki) Avaa(); Lopeta(int.Parse(o[1])); return "mylly: tulos " + o[1];
                case "kohtaaminen":
                {
                    // ui mylly kohtaaminen [kaupunki]: kohtaamiskortti kuten tehtävänapista (oletus pelaajan kaupunki).
                    var ohjain = PeliOhjain.Instanssi; var m = ohjain != null ? ohjain.Matka : null;
                    string id = o.Length > 1 ? o[1] : m?.Tila.Pelaaja.Sijainti.Kaupunki;
                    if (m == null || id == null || !m.Verkko.Kaupungit.TryGetValue(id, out var kaup)) return "mylly: ei kaupunkia " + id;
                    if (!(Peliluettelo.Kaupungille(kaup) is (PeliKuvaus peli, PeliMaa maa))) return "mylly: ei pelin maa " + kaup.Maa;
                    Kohtaaminen(peli, maa, kaup.Nimi);
                    return $"mylly: kohtaaminen {maa.MaanNimi} · {kaup.Nimi}";
                }
                case "lauta" when o.Length >= 2: ValitseLauta(int.Parse(o[1])); return "mylly: lauta " + Laudat[Lauta].Id + " | " + lautaHistoria.text;
                case "teema" when o.Length >= 2:
                {
                    string uusi = "tk-teema-" + o[1];
                    if (Array.IndexOf(Teemat, uusi) < 0) return "mylly: teema lasi|tumma|paperi";
                    foreach (var t in Teemat) paneeli.EnableInClassList(t, t == uusi);
                    return "mylly: teema " + o[1];
                }
                case "tila": return Auki ? $"mylly: {peli?.Asema()} vuoro {peli?.Vuorossa} | {vuoroRivi.text}" : "mylly: kiinni";
                case "sulje": Sulje(); return "mylly: suljettu";
            }
            return "mylly: tuntematon (valinta | kohtaaminen [kaupunki] | peli <taso> | asema <24> <k0> <k1> <vuoro> | napauta <n> | tulos <0|1|-1|-2> | tila | sulje)";
        }
    }

    /// <summary>Myllyn lauta (KUVANÄKYMÄN kuvan paikalla): pergamenttipinta, viivat ja pisteet musteella, nappulat teeman
    /// pinnalla (vaalea) ja musteella (tumma); valinta, kohteet, viimeisin siirto ja poistettavat toiminto-kullalla.</summary>
    public sealed class MyllyLauta : VisualElement
    {
        readonly Action<int> napautettu;
        Mylly peli;
        int valittu = -1, poistoKohde = -1, poistoLahde = -1, viimeisin = -1;
        readonly List<int> kohteet = new List<int>(), poistettavat = new List<int>();
        // Siirron animaatio (Päätoimittaja 1.10.: liuku ≤ 250 ms, poistossa lyhyt häivytys): Tyylikirja.Kesto.Liuku ja Sulku.
        MyllySiirto? anim; int animOmistaja; float animAlku = -1f;
        static float LiukuS => Tyylikirja.Kesto.Liuku / 1000f;
        static float HaivytysS => Tyylikirja.Kesto.Sulku / 1000f;
        float AnimT(float kesto) => anim.HasValue ? Mathf.Clamp01((Time.realtimeSinceStartup - animAlku) / kesto) : 1f;
        static float Pehmea(float t) => 1f - (1f - t) * (1f - t) * (1f - t); // ulos-hidastuva (vrt. tyylikirjan sisaan-käyrä)

        /// <summary>Käynnistää siirron animaation: liuku lähteestä kohteeseen (asetus: kasvu paikalleen) ja poistetun häivytys.</summary>
        public void Animoi(MyllySiirto s, int omistaja)
        {
            anim = s; animOmistaja = omistaja; animAlku = Time.realtimeSinceStartup;
            float loppu = animAlku + Mathf.Max(LiukuS, HaivytysS) + 0.02f;
            schedule.Execute(MarkDirtyRepaint).Every(16).Until(() => { if (Time.realtimeSinceStartup <= loppu) return false; anim = null; MarkDirtyRepaint(); return true; });
        }

        public MyllyLauta(Action<int> napautettu)
        {
            this.napautettu = napautettu;
            AddToClassList("mk-peli__lauta");
            generateVisualContent += Piirra;
            RegisterCallback<PointerDownEvent>(e =>
            {
                int p = Lahin(e.localPosition);
                if (p >= 0) { napautettu(p); e.StopPropagation(); }
            });
        }

        /// <summary>Valitun laudan tunnus (majatalo / luostari / viikinkilaiva): Blender-kerrokset tulevat tämän mukaan.</summary>
        public string LautaId { get; private set; } = "majatalo";
        public void AsetaLauta(string id) { LautaId = id; if (ladattu != null) Lataa(); MarkDirtyRepaint(); }

        // BLENDER-KERROKSET (Linnanrakentajan _valmiit/mylly-laudat/v2, PR #3906, Päätoimittaja 3.10.; v1 omistajan OK 2.10.):
        // Resources/Pelit/Mylly, iOS ASTC 6×6 sRGB + mipit, ladataan nimellä avattaessa ja puretaan suljettaessa
        // (MyllyNakyma.Sulje → Resources.UnloadUnusedAssets). Piirtojärjestys lauta → hehku (valmiin myllyn suorakaide
        // ± 0,03 laudasta) → varjot → nappulat → renkaat. Pisteet = Mylly.Paikat (pisteet.json: reuna 0,09, sama kuin
        // Marginaali). Nappulan halkaisija 0,098 laudasta = 200 px 256 px:n kuvasta; renkaat samassa pikselimitassa.
        // Ilman kuvia (lataus epäonnistui) piirretään vektoreina kuten ennen.
        public const string KansioPolku = "Pelit/Mylly/";
        const string Kansio = KansioPolku;
        const float NappulaKuva = 0.098f * 256f / 200f, RengasKuva = NappulaKuva * 320f / 256f, HehkuReuna = 0.03f;
        Texture2D kLauta, kHehku, kVaalea, kTumma, kVarjo, rValittu, rPoistettava, rKohde;
        string ladattu;

        public void Lataa()
        {
            if (ladattu == LautaId && kLauta != null) return;
            ladattu = LautaId;
            kLauta = Kuva("lauta-" + LautaId); kHehku = Kuva("hehku-" + LautaId);
            kVaalea = Kuva("nappula-vaalea-" + LautaId); kTumma = Kuva("nappula-tumma-" + LautaId); kVarjo = Kuva("nappula-varjo-" + LautaId);
            rValittu = Kuva("rengas-valittu"); rPoistettava = Kuva("rengas-poistettava"); rKohde = Kuva("rengas-kohde");
            if (kLauta == null || kVaalea == null || kTumma == null) Debug.LogWarning("MATKAKIRJA mylly: kerrokset puuttuvat (" + LautaId + "), vektoripiirto");
            MarkDirtyRepaint();
        }

        public void Pura()
        {
            kLauta = kHehku = kVaalea = kTumma = kVarjo = rValittu = rPoistettava = rKohde = null;
            ladattu = null;
        }

        static Texture2D Kuva(string nimi) => Resources.Load<Texture2D>(Kansio + nimi);
        bool Kuvat => kLauta != null && kVaalea != null && kTumma != null;
        static readonly ushort[] Nelio = { 0, 1, 2, 2, 3, 0 };

        /// <summary>Kuva suorakaiteeseen r (UITK: y alas); uv laudan osuus (0–1, y alas), sävy = läpinäkyvyys. Myös Tavlin lauta.</summary>
        internal static void Kuva(MeshGenerationContext mgc, Texture2D t, Rect r, Rect uv, float a = 1f)
        {
            if (t == null || a <= 0f) return;
            var md = mgc.Allocate(4, 6, t);
            var reg = md.uvRegion;
            var savy = Color.white; savy.a = a;
            Vector2 U(float u, float v) => new Vector2(reg.x + u * reg.width, reg.y + (1f - v) * reg.height);
            md.SetNextVertex(new Vertex { position = new Vector3(r.xMin, r.yMax, Vertex.nearZ), tint = savy, uv = U(uv.xMin, uv.yMax) });
            md.SetNextVertex(new Vertex { position = new Vector3(r.xMin, r.yMin, Vertex.nearZ), tint = savy, uv = U(uv.xMin, uv.yMin) });
            md.SetNextVertex(new Vertex { position = new Vector3(r.xMax, r.yMin, Vertex.nearZ), tint = savy, uv = U(uv.xMax, uv.yMin) });
            md.SetNextVertex(new Vertex { position = new Vector3(r.xMax, r.yMax, Vertex.nearZ), tint = savy, uv = U(uv.xMax, uv.yMax) });
            md.SetAllIndices(Nelio);
        }

        internal static void Kuva(MeshGenerationContext mgc, Texture2D t, Vector2 keski, float koko, float a = 1f) =>
            Kuva(mgc, t, new Rect(keski.x - koko / 2f, keski.y - koko / 2f, koko, koko), new Rect(0f, 0f, 1f, 1f), a);

        void PiirraKuvat(MeshGenerationContext mgc)
        {
            float w = contentRect.width, nk = w * NappulaKuva, rk = w * RengasKuva;
            Kuva(mgc, kLauta, new Rect(0f, 0f, w, w), new Rect(0f, 0f, 1f, 1f));
            if (peli != null && kHehku != null)
                foreach (var m in Mylly.Myllyt)
                {
                    int o = peli.Nappula(m[0]);
                    if (o < 0 || peli.Nappula(m[1]) != o || peli.Nappula(m[2]) != o) continue;
                    Vector2 a0 = Kohta(m[0]) / w, a2 = Kohta(m[2]) / w;
                    var uv = Rect.MinMaxRect(Mathf.Min(a0.x, a2.x) - HehkuReuna, Mathf.Min(a0.y, a2.y) - HehkuReuna,
                                             Mathf.Max(a0.x, a2.x) + HehkuReuna, Mathf.Max(a0.y, a2.y) + HehkuReuna);
                    Kuva(mgc, kHehku, new Rect(uv.x * w, uv.y * w, uv.width * w, uv.height * w), uv);
                }
            foreach (int k in kohteet) Kuva(mgc, rKohde, Kohta(k), rk);
            if (peli == null) return;

            // Näkyvät nappulat (sama logiikka kuin vektoripiirrossa): (paikka, omistaja, koko, läpinäkyvyys).
            var nappulat = new List<(Vector2 P, int O, float K, float A)>(Mylly.Pisteita + 2);
            float tl = Pehmea(AnimT(LiukuS)), th = AnimT(HaivytysS);
            for (int a = 0; a < Mylly.Pisteita; a++)
            {
                int o = peli.Nappula(a);
                if (anim.HasValue && a == anim.Value.Mihin && tl < 1f) continue;
                if (o < 0 && a != poistoKohde) continue;
                if (a == poistoLahde) continue;
                if (a == poistoKohde && o < 0) o = peli.Vuorossa;
                nappulat.Add((Kohta(a), o, nk, 1f));
            }
            if (anim.HasValue)
            {
                var am = anim.Value;
                if (am.Poista >= 0 && th < 1f) nappulat.Add((Kohta(am.Poista), 1 - animOmistaja, nk * (1f + 0.15f * th), 1f - th));
                if (tl < 1f)
                {
                    var paikka = am.Mista >= 0 ? Vector2.Lerp(Kohta(am.Mista), Kohta(am.Mihin), tl) : Kohta(am.Mihin);
                    nappulat.Add((paikka, animOmistaja, am.Mista >= 0 ? nk : nk * (0.7f + 0.3f * tl), 1f));
                }
            }
            foreach (var n in nappulat) Kuva(mgc, kVarjo, n.P, n.K, n.A);
            foreach (var n in nappulat) Kuva(mgc, n.O == 0 ? kVaalea : kTumma, n.P, n.K, n.A);
            foreach (int a in poistettavat) Kuva(mgc, rPoistettava, Kohta(a), rk);
            if (valittu >= 0) Kuva(mgc, rValittu, Kohta(valittu), rk);
            if (viimeisin >= 0 && peli.Nappula(viimeisin) >= 0 && !(anim.HasValue && tl < 1f))
                Ympyra(mgc.painter2D, Kohta(viimeisin), Askel * 0.36f * 0.2f, Tyylikirja.Paperi.Toiminto, null, 0);
        }

        public void Aseta(Mylly m, int valittu, int poistoKohde, int poistoLahde, List<int> kohteet, List<int> poistettavat, int viimeisin)
        {
            peli = m; this.valittu = valittu; this.poistoKohde = poistoKohde; this.poistoLahde = poistoLahde; this.viimeisin = viimeisin;
            this.kohteet.Clear(); this.kohteet.AddRange(kohteet);
            this.poistettavat.Clear(); this.poistettavat.AddRange(poistettavat);
            MarkDirtyRepaint();
        }

        float Marginaali => contentRect.width * 0.09f;
        float Askel => (contentRect.width - 2 * Marginaali) / 6f;
        Vector2 Kohta(int p) => new Vector2(Marginaali + Mylly.Paikat[p].X * Askel, Marginaali + Mylly.Paikat[p].Y * Askel);

        int Lahin(Vector2 kohta)
        {
            if (contentRect.width <= 0) return -1;
            float raja = Mathf.Max(Askel * 0.5f, Tyylikirja.Nappi.Osuma / 2f);
            int paras = -1; float parasD = raja * raja;
            for (int p = 0; p < Mylly.Pisteita; p++)
            {
                float d = (Kohta(p) - kohta).sqrMagnitude;
                if (d < parasD) { parasD = d; paras = p; }
            }
            return paras;
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var r = contentRect;
            if (r.width < 10) return;
            if (Kuvat) { PiirraKuvat(mgc); return; }
            var t = Tyylikirja.Paperi;
            var p = mgc.painter2D;
            float s = Askel, sade = s * 0.36f, viiva = Mathf.Max(2f, r.width / 160f);
            Color muste = t.Muste, pehmea = t.MustePehmea, pinta = t.Pinta, kulta = t.Toiminto, reunus = t.Reunus;

            // Viivat.
            p.strokeColor = pehmea; p.lineWidth = viiva; p.lineCap = LineCap.Round;
            for (int a = 0; a < Mylly.Pisteita; a++)
                foreach (int b in Mylly.Naapurit[a])
                    if (b > a) { p.BeginPath(); p.MoveTo(Kohta(a)); p.LineTo(Kohta(b)); p.Stroke(); }

            // Valmiit myllyt (kulta, läpikuultava).
            if (peli != null)
            {
                var myllyVari = kulta; myllyVari.a = 0.55f;
                foreach (var m in Mylly.Myllyt)
                {
                    int o = peli.Nappula(m[0]);
                    if (o >= 0 && peli.Nappula(m[1]) == o && peli.Nappula(m[2]) == o)
                    {
                        p.strokeColor = myllyVari; p.lineWidth = sade * 0.9f;
                        p.BeginPath(); p.MoveTo(Kohta(m[0])); p.LineTo(Kohta(m[2])); p.Stroke();
                    }
                }
            }

            // Pisteet.
            for (int a = 0; a < Mylly.Pisteita; a++) Ympyra(p, Kohta(a), sade * 0.22f, pehmea, null, 0);
            // Kohteet (valitun nappulan lailliset siirrot).
            foreach (int k in kohteet) Ympyra(p, Kohta(k), sade * 0.45f, null, kulta, sade * 0.12f);
            if (peli == null) return;

            float tl = Pehmea(AnimT(LiukuS)), th = AnimT(HaivytysS);
            for (int a = 0; a < Mylly.Pisteita; a++)
            {
                int o = peli.Nappula(a);
                if (anim.HasValue && a == anim.Value.Mihin && tl < 1f) continue; // piirretään liukuvana alla
                bool siirtyy = a == poistoLahde;
                if (o < 0 && a != poistoKohde) continue;
                if (siirtyy) continue; // nappula on jo siirtymässä poistoKohteeseen
                if (a == poistoKohde && o < 0) o = peli.Vuorossa;
                if (poistettavat.Contains(a)) Katkoympyra(p, Kohta(a), sade * 1.28f, kulta, sade * 0.14f);
                if (a == valittu) Ympyra(p, Kohta(a), sade * 1.22f, null, kulta, sade * 0.16f);
                Ympyra(p, Kohta(a), sade, o == 0 ? pinta : muste, o == 0 ? muste : pehmea, sade * 0.1f);
                Ympyra(p, Kohta(a), sade * 0.62f, null, o == 0 ? reunus : pehmea, sade * 0.06f);
                if (a == viimeisin) Ympyra(p, Kohta(a), sade * 0.2f, kulta, null, 0);
            }
            if (anim.HasValue)
            {
                var am = anim.Value;
                // Poistettu nappula häivyy pois (vastustajan väri).
                if (am.Poista >= 0 && th < 1f)
                {
                    int v = 1 - animOmistaja;
                    Color tayte = v == 0 ? pinta : muste, reuna = v == 0 ? muste : pehmea;
                    tayte.a = reuna.a = 1f - th;
                    Ympyra(p, Kohta(am.Poista), sade * (1f + 0.15f * th), tayte, reuna, sade * 0.1f);
                }
                // Liukuva (siirto/lento) tai kasvava (asetus) nappula.
                if (tl < 1f)
                {
                    var paikka = am.Mista >= 0 ? Vector2.Lerp(Kohta(am.Mista), Kohta(am.Mihin), tl) : Kohta(am.Mihin);
                    float rr = am.Mista >= 0 ? sade : sade * (0.7f + 0.3f * tl);
                    Ympyra(p, paikka, rr, animOmistaja == 0 ? pinta : muste, animOmistaja == 0 ? muste : pehmea, sade * 0.1f);
                    Ympyra(p, paikka, rr * 0.62f, null, animOmistaja == 0 ? reunus : pehmea, sade * 0.06f);
                }
            }
        }

        static void Ympyra(Painter2D p, Vector2 c, float r, Color? tayte, Color? reuna, float paksuus)
        {
            p.BeginPath();
            p.Arc(c, r, 0f, 360f);
            p.ClosePath();
            if (tayte.HasValue) { p.fillColor = tayte.Value; p.Fill(); }
            if (reuna.HasValue && paksuus > 0) { p.strokeColor = reuna.Value; p.lineWidth = paksuus; p.Stroke(); }
        }

        static void Katkoympyra(Painter2D p, Vector2 c, float r, Color vari, float paksuus)
        {
            p.strokeColor = vari; p.lineWidth = paksuus; p.lineCap = LineCap.Butt;
            const int Paloja = 12;
            for (int i = 0; i < Paloja; i++)
            {
                float a0 = i * 360f / Paloja, a1 = a0 + 360f / Paloja * 0.6f;
                p.BeginPath(); p.Arc(c, r, a0, a1); p.Stroke();
            }
        }
    }
}
