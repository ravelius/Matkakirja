// RETKIKUNTA- JA KEHITTÄJÄPANEELI (entinen päävalikko, verkkopelin #paavalikko).
//
// Pelin valikko on pillerivalikko (Linssivalitsin, omistaja 29.9.2026: valikot yhtenä järjestelmänä). Tämä paneeli
// aukeaa sen napeista kahtena osana samalla pergamentilla ‹ Takaisin -paluulla:
//   Osa.Retkikunta: sähkelinja (UI/Sahke/SahkeNakyma täyttää; nappi näkyy, kun osiolla on sisältöä).
//   Osa.Kehittaja (vain kehittäjätilassa, ei App Store -buildissa): Maailma, Astronautin reliefi, Linssien kynnykset,
//     kartan sävy, rae ja patina, Raamattu ja Kehittäjälehti sekä Kehittäjäkoodi.
// Äänet-, Kartta- ja Asetukset-rivit ovat pillerivalikossa (UiNakymat.RakennaPuhelinvalikko); täällä asuvat niiden
// yhteiset toiminnot: Uusi peli -varmistus, Ehdota, Tietoja, Mitä uutta, kehittäjäkoodin ikkuna sekä maailmatilan
// ja pelaajan näkymän tilat.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Paavalikko : Pudotus
    {
        /// <summary>"uusi peli" vahvistettiin.</summary>
        public event Action UusiPeli;
        /// <summary>"ehdota sisältöä" painettiin (webin #palaute-kulma).</summary>
        public event Action EhdotaPainettu;
        /// <summary>"tekijätiedot ja lähteet" painettiin.</summary>
        public event Action TietojaPainettu;
        /// <summary>Retkikuntaosion paikka (SahkeNakyma täyttää; tyhjänä piilossa).</summary>
        public readonly VisualElement Retkikunta;

        /// <summary>Paneelin osa (pillerivalikon napeista).</summary>
        public enum Osa { Retkikunta, Kehittaja }

        /// <summary>Retkikunnalla on sisältöä (SahkeNakyma rakensi osion): pillerivalikon Retkikunta-nappi näkyy.</summary>
        public bool RetkikuntaSaatavilla => Retkikunta.childCount > 0 && Retkikunta.resolvedStyle.display != DisplayStyle.None;
        Osa osa;
        readonly Vahvistus vahvistus;
        readonly VisualElement retkiKuori;

        public void AvaaOsa(Osa o)
        {
            if (Auki) Sulje();
            osa = o;
            Avaa();
        }

        public Paavalikko(UiKerros kerros, Func<float> alareuna, Vahvistus vahvistus) : base(kerros, alareuna, "mk-paavalikko")
        {
            this.vahvistus = vahvistus;
            // YKSI POHJA (omistaja 29.9.2026 klo 20.2x: "eri väripohjia"): Retkikunta ja Kehittäjätyökalut samalla pergamentilla
            // kuin pillerivalikko; tumman paneelin värit vaihtuvat muuttujina (Matkakirja.uss .mk-paavalikko--pergamentti).
            // Leveys pillerivalikon mukaan (.mk-paavalikko--asetukset, 367 pt).
            Paneeli.AddToClassList("mk-paavalikko--pergamentti");
            Paneeli.AddToClassList("mk-paavalikko--asetukset");
            Rakenne.Tausta(Paneeli, Kuviot.Pergamentti);
            Paneeli.Add(new KarheaKehys { Sade = 10, Paksuus = 1.2f });
            AukiMuuttui += auki => { if (!auki) Asetukset.Tallenna(); };
            // ‹ Takaisin palaa pillerivalikkoon (UiNakymat).
            takaisin = Rakenne.Nappi("‹ Takaisin", "mk-selite__sulje mk-linssivalitsin__takaisin mk-paavalikko__takaisin", () => { Sulje(); Takaisin?.Invoke(); }, Sisalto);
            takaisin.tooltip = "Takaisin valikkoon";
            // Retkikunta omassa kuoressaan: SahkeNakyma ohjaa sisemmän näkyvyyttä, osa kuoren.
            retkiKuori = Rakenne.El("mk-paavalikko__retkikuori", Sisalto, PickingMode.Ignore);
            Retkikunta = Rakenne.El("mk-paavalikko__retkikunta", retkiKuori, PickingMode.Ignore);
            Retkikunta.style.display = DisplayStyle.None;
            // Kehittäjärivit vain Kehittäjä-osassa kehittäjätilassa (Fablen tarkastus C4, löydös 65: ei pelaajalle).
            kokeet = Rakenne.El("mk-paavalikko__kokeet", Sisalto, PickingMode.Ignore);
            Rakenne.Teksti("KEHITTÄJÄ", "mk-pudotus__otsikko", kokeet);
            // Löydös 103 (omistaja build 13): Maailma-tilan kytkin kehittäjäosassa.
            maailma = Rakenne.Nappi(null, "mk-kytkinrivi", () => { AsetaMaailma(!Maailma); Paivita(); }, kokeet, Maapallo);
            maailma.tooltip = "Maailmanäkymä: huntu pois ja liikkuminen koko pallolla (kehittäjä)";
            Rakenne.Teksti("Maailma", "mk-kytkinrivi__nimi", maailma);
            maailmaTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", maailma);
            reliefi = Rakenne.Nappi(null, "mk-kytkinrivi", VaihdaReliefi, kokeet, Ikonit.Viiva["satelliitti"]);
            reliefi.tooltip = "Astronautin kameran reliefi: täysvärinen (1,0) tai webin vaimea (0,8). Näkyy seuraavalla avauksella.";
            Rakenne.Teksti("Astronautin reliefi", "mk-kytkinrivi__nimi", reliefi);
            reliefiTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", reliefi);
#if !MATKAKIRJA_APPSTORE
            // Linssien avautumiskynnykset (Linssiseppä): kehittäjätilassa kaikki linssit auki.
            kynnykset = Rakenne.Nappi(null, "mk-kytkinrivi", () =>
            {
                LinssiOhjain.AsetaKehittajatila(!Matkakirja.Linssit.Linssirekisteri.Kehittajatila);
                Paivita();
            }, kokeet, Ikonit.Viiva["taikalasit"]);
            kynnykset.tooltip = "Linssien kynnykset: pois = kaikki linssit auki (kehittäjä).";
            Rakenne.Teksti("Linssien kynnykset", "mk-kytkinrivi__nimi", kynnykset);
            kynnyksetTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", kynnykset);
            // Pohjakartan sävy (Natiiviseppä, omistajan löydös 27.9. klo 17.2x: maitomaisempi kartta, arvo valitaan laitteella):
            // vedon aikana kartalle heti, levylle vasta sormen noustessa (Pohjasavy.Aseta tallenna).
            kontrasti = SavyRivi("Kartan kontrasti", Pohjasavy.KontrastiMin, Pohjasavy.KontrastiMax, true);
            nosto = SavyRivi("Mustan nosto", Pohjasavy.NostoMin, Pohjasavy.NostoMax, false);
            var savyNollaus = Rakenne.Nappi(null, "mk-kytkinrivi", () => { Pohjasavy.Aseta(0f, 0f); PaivitaSavy(); }, kokeet, Ikonit.Viiva["paivita"]);
            savyNollaus.tooltip = "Kartan kontrasti ja mustan nosto oletukseen (0, 0).";
            Rakenne.Teksti("Kartan sävy oletukseen", "mk-kytkinrivi__nimi", savyNollaus);
            // Paperin rae ja patina (Natiiviseppä, omistajan tilaus 27.9. klo 23.4x: tasot testataan laitteella, hyvät arvot
            // poltetaan myöhemmin laattoihin; Pohjapatina). Sama kaava kuin sävyssä: vedon aikana kartalle, levylle irrotettaessa.
            patinaRivit.Clear();
            PatinaRivi("Paperin rae", 0f, 1f, () => Pohjapatina.Rae,
                (v, t) => Pohjapatina.Aseta(v, Pohjapatina.Koko, Pohjapatina.Tahrat, Pohjapatina.Kellastus, Pohjapatina.Reuna, t));
            PatinaRivi("Rakeen koko (px)", Pohjapatina.KokoMin, Pohjapatina.KokoMax, () => Pohjapatina.Koko,
                (v, t) => Pohjapatina.Aseta(Pohjapatina.Rae, v, Pohjapatina.Tahrat, Pohjapatina.Kellastus, Pohjapatina.Reuna, t));
            PatinaRivi("Patina: tahrat", 0f, 1f, () => Pohjapatina.Tahrat,
                (v, t) => Pohjapatina.Aseta(Pohjapatina.Rae, Pohjapatina.Koko, v, Pohjapatina.Kellastus, Pohjapatina.Reuna, t));
            PatinaRivi("Patina: kellastuminen", 0f, 1f, () => Pohjapatina.Kellastus,
                (v, t) => Pohjapatina.Aseta(Pohjapatina.Rae, Pohjapatina.Koko, Pohjapatina.Tahrat, v, Pohjapatina.Reuna, t));
            PatinaRivi("Patina: reunatummennus", 0f, 1f, () => Pohjapatina.Reuna,
                (v, t) => Pohjapatina.Aseta(Pohjapatina.Rae, Pohjapatina.Koko, Pohjapatina.Tahrat, Pohjapatina.Kellastus, v, t));
            var patinaNollaus = Rakenne.Nappi(null, "mk-kytkinrivi", () =>
            {
                Pohjapatina.Aseta(0f, Pohjapatina.OletusKoko, 0f, 0f, 0f);
                PaivitaSavy();
            }, kokeet, Ikonit.Viiva["paivita"]);
            patinaNollaus.tooltip = "Paperin rae ja patina oletukseen (0 = poltettu kartta sellaisenaan).";
            Rakenne.Teksti("Rae ja patina oletukseen", "mk-kytkinrivi__nimi", patinaNollaus);
            // Striimiääni muutti kehittäjävalikosta nostokortin säätörattaaseen pelinimellä (omistaja 27.9. klo 10.2x,
            // web #3388; KortinLukija, Striimiaani.Pelinimet).
            // Työhuone (web #kehittaja-tyohuone): Raamattu ja Kehittäjälehti kehittäjän liitteinä (Tyohuone.cs).
            // Fable 24.9.: vain kehittäjätilassa eikä koskaan App Store -buildissa.
            Tyohuonerivi("Raamattu", "<path d=\"M5 4.5h6.5v15H6.6A1.6 1.6 0 0 1 5 17.9z\"/><path d=\"M19 4.5h-6.5v15h4.9a1.6 1.6 0 0 0 1.6-1.6z\"/>", Tyohuone.AvaaRaamattu);
            Tyohuonerivi("Kehittäjälehti", "<path d=\"M4.5 5.5h15v13h-15z\"/><path d=\"M7.5 9.5h6M7.5 12.5h9M7.5 15.5h9\"/>", Tyohuone.AvaaKehittajalehti);
#endif

            kehittaja = new KehittajaIkkuna(kerros);
#if MATKAKIRJA_APPSTORE
            // App Storessa ei kehittäjätilaa: "Mitä uutta" ilman Kehittäjä-nappia.
            MitaUutta = new MitaUutta(kerros, null);
#else
            MitaUutta = new MitaUutta(kerros, kehittaja.Avaa);
            // Kehittäjäkoodi (sama ikkuna aukeaa myös Asetusten Kehittäjä-kytkimestä ja Mitä uutta -näkymän napista).
            var koodi = Rakenne.Nappi(null, "mk-kytkinrivi", () => { Sulje(); kehittaja.Avaa(); }, kokeet, Ikonit.Ratas);
            Rakenne.Teksti("Kehittäjäkoodi", "mk-kytkinrivi__nimi", koodi);
#endif
            Asetukset.Muuttui += _ => { VarmistaMaailma(); if (Auki) Paivita(); };
            kerros.Juuri(UiKerros.Valikot).schedule.Execute(VarmistaMaailma).StartingIn(1000);
        }
        /// <summary>"uusi peli": varmistus (webin #nollaa-dialog), sitten tyhjennys ja UusiPeli.</summary>
        public void KysyUusiPeli()
        {
            vahvistus.Kysy("Uusi peli",
                "Matka alkaa alusta ja kaikki muistit tyhjennetään: tallennettu peli, passin leimat, laukun tavarat ja ääniasetukset. Tätä ei voi perua.",
                "Peruuta", "Aloita alusta", () =>
                {
                    Asetukset.Nollaa();
                    // Web tyhjennaMuistit pyyhkii myös pro-tunnuksen (matkakirja-pro-tunnus).
                    Palautekanava.AsetaProTunnus(null, null);
                    UusiPeli?.Invoke();
                });
        }

        public void Ehdota() => EhdotaPainettu?.Invoke();
        /// <summary>Kehittäjätilan koodi-ikkuna (pillerivalikon Asetukset: Kehittäjä-kytkin; sama lukko).</summary>
        public void AvaaKehittajakoodi() => kehittaja.Avaa();
        public void Tietoja() => TietojaPainettu?.Invoke();

        readonly Button reliefi;
        readonly VisualElement kokeet;
        Button kynnykset;
        Label kynnyksetTila;
        (Slider Saadin, Label Arvo) kontrasti, nosto;

        /// <summary>Pohjakartan sävyn liukusäädinrivi kehittäjäosaan (Pohjasavy, Natiiviseppä).</summary>
        (Slider Saadin, Label Arvo) SavyRivi(string nimi, float min, float max, bool onKontrasti)
        {
            // Kapea kehittäjäpaneeli: nimi ja arvo ylärivillä, säädin koko leveydeltä alla (vierekkäin säädin jäi ~30 px:ksi).
            var rivi = Rakenne.El("mk-saadinrivi mk-saadinrivi--pino", kokeet);
            var yla = Rakenne.El("mk-saadinrivi__yla", rivi);
            Rakenne.Teksti(nimi, "mk-saadinrivi__nimi", yla);
            var arvo = Rakenne.Teksti("", "mk-saadinrivi__arvo", yla);
            var s = new Slider(min, max) { pageSize = 0, fill = true };
            s.AddToClassList("mk-saadin");
            rivi.Add(s);
            void Aseta(float v, bool tallenna)
            {
                v = Mathf.Round(v * 100f) / 100f;
                if (onKontrasti) Pohjasavy.Aseta(v, Pohjasavy.Nosto, tallenna);
                else Pohjasavy.Aseta(Pohjasavy.Kontrasti, v, tallenna);
                arvo.text = SavyTeksti(v, onKontrasti);
            }
            s.RegisterValueChangedCallback(e => Aseta(e.newValue, false));
            s.RegisterCallback<PointerCaptureOutEvent>(_ => Aseta(s.value, true));
            return (s, arvo);
        }

        readonly List<(Slider Saadin, Label Arvo, Func<float> Hae)> patinaRivit = new List<(Slider, Label, Func<float>)>();

        /// <summary>Rakeen ja patinan liukusäädinrivi (Pohjapatina, Natiiviseppä): sama asettelu kuin <see cref="SavyRivi"/>.</summary>
        void PatinaRivi(string nimi, float min, float max, Func<float> hae, Action<float, bool> aseta)
        {
            var rivi = Rakenne.El("mk-saadinrivi mk-saadinrivi--pino", kokeet);
            var yla = Rakenne.El("mk-saadinrivi__yla", rivi);
            Rakenne.Teksti(nimi, "mk-saadinrivi__nimi", yla);
            var arvo = Rakenne.Teksti("", "mk-saadinrivi__arvo", yla);
            var s = new Slider(min, max) { pageSize = 0, fill = true };
            s.AddToClassList("mk-saadin");
            rivi.Add(s);
            void Aseta(float v, bool tallenna)
            {
                v = Mathf.Round(v * 100f) / 100f;
                aseta(v, tallenna);
                arvo.text = SavyTeksti(hae(), false);
            }
            s.RegisterValueChangedCallback(e => Aseta(e.newValue, false));
            s.RegisterCallback<PointerCaptureOutEvent>(_ => Aseta(s.value, true));
            patinaRivit.Add((s, arvo, hae));
        }

        static string SavyTeksti(float v, bool etumerkki) =>
            v.ToString(etumerkki ? "+0.00;-0.00;0" : "0.00", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',');

        void PaivitaSavy()
        {
            if (kontrasti.Saadin == null) return;
            kontrasti.Saadin.SetValueWithoutNotify(Pohjasavy.Kontrasti);
            kontrasti.Arvo.text = SavyTeksti(Pohjasavy.Kontrasti, true);
            nosto.Saadin.SetValueWithoutNotify(Pohjasavy.Nosto);
            nosto.Arvo.text = SavyTeksti(Pohjasavy.Nosto, false);
            foreach (var r in patinaRivit)
            {
                r.Saadin.SetValueWithoutNotify(r.Hae());
                r.Arvo.text = SavyTeksti(r.Hae(), false);
            }
        }
        readonly KehittajaIkkuna kehittaja;
        public readonly MitaUutta MitaUutta;
        readonly Label reliefiTila;

        /// <summary>Webin maailmanapin viivaikoni (index.html #kehittaja-maailma-btn).</summary>
        const string Maapallo = "<circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"M4.5 12h15\"/><path d=\"M12 4.5a11 11 0 0 1 0 15 11 11 0 0 1 0-15z\"/>";
        const string MaailmaAvain = "matkakirja-kehittaja-maailma";
        readonly Button maailma;
        readonly Label maailmaTila;

        /// <summary>Kehittäjän maailmanäkymä päällä (säilyy kuten webin kehittajaMaailmaPaalla); vain kehittäjätilassa.</summary>
        public static bool Maailma => Asetukset.Kehittaja && PlayerPrefs.GetInt(MaailmaAvain, 0) == 1;

        /// <summary>
        /// PELAAJAN NÄKYMÄ (omistaja 29.9.2026 klo 08.5x: "Maailmatilaan voisi tehdä apunapin, joka näyttäisi kartan samalla
        /// lailla, kuin että maailmatila ei olisi päällä. Ainoastaan kohdekaupungit näkyisivät himmeänä ja pystyisin edelleen
        /// klikkaamalla siirtymään myös niihin"; web on malli, Siirtoseppä: localStorage matkakirja-kehittaja-pelaajanakyma).
        /// Päällä: kartta, rajat, zoomi, huntu ja kaupunkirajaus kuten pelaajalla, muut pelin kaupungit himmeinä (40 %,
        /// ilman nimeä) ja niiden napautus on maailmahyppy. Vain maailmatilassa.
        /// </summary>
        public static bool PelaajanNakyma => Maailma && PlayerPrefs.GetInt(PelaajanNakymaAvain, 0) == 1;

        /// <summary>Maailmatilan näkymä (rajat pois, kaikki kaupungit, ei huntua): maailmatila ilman pelaajan näkymää.</summary>
        public static bool MaailmaNakyma => Maailma && PlayerPrefs.GetInt(PelaajanNakymaAvain, 0) != 1;

        const string PelaajanNakymaAvain = "matkakirja-kehittaja-pelaajanakyma";

        public static void AsetaPelaajanNakyma(bool paalla)
        {
            PlayerPrefs.SetInt(PelaajanNakymaAvain, paalla ? 1 : 0);
            PlayerPrefs.Save();
            VarmistaMaailma();
        }

        public static void AsetaMaailma(bool paalla)
        {
            PlayerPrefs.SetInt(MaailmaAvain, paalla ? 1 : 0);
            PlayerPrefs.Save();
            VarmistaMaailma();
        }

        /// <summary>Väritason huntu maailmanäkymän mukaan (käynnistys, kytkin, kehittäjätilan vaihto).</summary>
        public static void VarmistaMaailma()
        {
            var v = UnityEngine.Object.FindAnyObjectByType<Varitaso>();
            if (v == null || v.huntu == !MaailmaNakyma) return;
            v.huntu = !MaailmaNakyma;
            v.Uudelleen();
        }

        static bool ReliefiTaysi => Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Kyllaisyys > 0.9f;

        void VaihdaReliefi()
        {
            LinssiOhjain.AsetaAstronautinKyllaisyys(ReliefiTaysi ? 0.8f : 1f);
            Paivita();
        }

        void Tyohuonerivi(string nimi, string ikoni, Action avaa)
        {
            var b = Rakenne.Nappi(null, "mk-kytkinrivi", () => { Sulje(); avaa(); }, kokeet, ikoni);
            Rakenne.Teksti(nimi, "mk-kytkinrivi__nimi", b);
        }

        readonly Button takaisin;
        /// <summary>‹ Takaisin: pillerivalikko auki (UiNakymat).</summary>
        public Action Takaisin;

        protected override void Paivita()
        {
            DisplayStyle Nayta(bool b) => b ? DisplayStyle.Flex : DisplayStyle.None;
            bool kehittajaOsa = Asetukset.Kehittaja && osa == Osa.Kehittaja;
            takaisin.style.display = Nayta(Takaisin != null);
            // Retkikunnan sisemmän näkyvyyden päättää SahkeNakyma; kuori näkyy vain Retkikunta-osassa.
            retkiKuori.style.display = Nayta(osa == Osa.Retkikunta);
            kokeet.style.display = Nayta(kehittajaOsa);
            if (!kehittajaOsa) return;
            PaivitaSavy();
            maailma.EnableInClassList("mk-valittu", Maailma);
            maailmaTila.text = Maailma ? "PÄÄLLÄ" : "POIS";
            reliefi.EnableInClassList("mk-valittu", ReliefiTaysi);
            reliefiTila.text = ReliefiTaysi ? "TÄYSI" : "VAIMEA";
            if (kynnykset != null)
            {
                bool paalla = !Matkakirja.Linssit.Linssirekisteri.Kehittajatila;
                kynnykset.EnableInClassList("mk-valittu", paalla);
                kynnyksetTila.text = paalla ? "PÄÄLLÄ" : "POIS";
            }
        }
    }

    /// <summary>
    /// Kehittäjätilan koodi-ikkuna (webin #kehittaja-dialog): salasanakenttä ja Kytke päälle,
    /// tai päällä ollessa Kytke pois. Väärä koodi: "Koodi ei kelpaa."
    /// </summary>
    public sealed class KehittajaIkkuna
    {
        readonly VisualElement himmennys;
        readonly Label selite, virhe;
        readonly TextField kentta;
        readonly Button ok;

        public KehittajaIkkuna(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kortti = new Kortti("mk-kehittaja");
            himmennys.Add(kortti);
            Kirjasimet.Aseta(Rakenne.Teksti("Kehittäjätila", "mk-kortti__otsikko", kortti.Sisus), Kirjasin.LukuLihava);
            selite = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus);
            kentta = new TextField { isPasswordField = true, maxLength = 64 };
            kentta.AddToClassList("mk-chat__kentta");
            kentta.textEdition.placeholder = "Koodi";
            kortti.Sisus.Add(kentta);
            virhe = Rakenne.Teksti("Koodi ei kelpaa.", "mk-kortti__teksti mk-kehittaja__virhe", kortti.Sisus);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            Rakenne.Nappi("Peruuta", "mk-nappi--haamu", Sulje, napit);
            ok = Rakenne.Nappi("Kytke päälle", "mk-nappi--kulta", Kytke, napit);
            Rakenne.Tausta(ok, Kuviot.Kulta);
            Kirjasimet.Aseta(ok, Kirjasin.KoneLihava);
        }

        public void Avaa()
        {
            bool paalla = Asetukset.Kehittaja;
            selite.text = paalla ? "Kehittäjätila on päällä: Kehittäjätyökalut näkyvät Asetuksissa." : "Kehittäjätila avaa Asetuksiin Kehittäjätyökalut.";
            kentta.style.display = paalla ? DisplayStyle.None : DisplayStyle.Flex;
            kentta.value = "";
            virhe.style.display = DisplayStyle.None;
            ok.Q<Label>().text = paalla ? "Kytke pois" : "Kytke päälle";
            Rakenne.Nayta(himmennys, true, 220);
            SyoteLukko.Esta(this);
        }

        void Sulje()
        {
            kentta.Blur();
            Rakenne.Nayta(himmennys, false, 200);
            SyoteLukko.Vapauta(this);
        }

        void Kytke()
        {
            if (Asetukset.Kehittaja) { Asetukset.AsetaKehittaja(null); Sulje(); return; }
            if (Asetukset.AsetaKehittaja(kentta.value)) { Sulje(); return; }
            kentta.value = "";
            virhe.style.display = DisplayStyle.Flex;
        }
    }
}
