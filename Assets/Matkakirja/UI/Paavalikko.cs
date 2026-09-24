// PÄÄVALIKKO (hampurilainen, Natiivi-UI erä 1): verkkopelin #paavalikko.
//
//   ÄÄNET    [kirja]  Kertoja       PÄÄLLÄ
//            [nuotti] Musiikki      PÄÄLLÄ
//            [kaiutin] Äänimaisema  PÄÄLLÄ
//   KARTTA   [aalto]  Pieni liike   PÄÄLLÄ
//   RETKIKUNTA (sähkelinja, UI/Sahke/SahkeNakyma rakentaa; piilossa, kunnes linjan tila selviää;
//            web retkikuntaOsio asuu hampurilaisen palautelomakkeessa)
//   KOKEET   [satelliitti] Astronautin reliefi  TÄYSI | VAIMEA
//            (omistajan TestFlight-vertailu 24.9.2026: kylläisyys 1,0 vs. webin 0,8;
//            LinssiOhjain.AsetaAstronautinKyllaisyys, muistetaan, näkyy seuraavalla
//            avauksella. Poistetaan, kun omistaja on päättänyt.)
//   ─────────────────────────────────────
//            [ uusi peli ]
//            [ ehdota sisältöä ]             (webin #palaute-kulma → "Kerro mitä huomasit", PalauteIkkuna)
//            [ tekijätiedot ja lähteet ]     (Tietoja: karttojen pakollinen attribuutio)
//   v1.0 (kehittäjätilassa v1.0 · kehittäjä)
//
// Kytkinrivit (.kertoja-valikko): min 44 pt, puolihimmeä tausta, reuna --line,
// pyöristys 8; päällä-rivi: --panel-2, reuna --accent-dark, teksti --accent;
// pois-rivi himmeä. Tilateksti versaalina ("päällä"/"pois").
// Kehittäjän syötekokeet (webin Syötekoe, Kerrokset, Kehysprofiili) ja
// laudanvalinta (piilossa webissäkin) jätetään pois.
// iPHONE (löydös 20): ☰ avaa linssivalikon, jonka riveiltä tämä paneeli aukeaa osana: Asetukset (kytkimet ja
// retkikunta) tai Kehittäjä (KOKEET-rivit ja kehittäjäkoodi); komennot kutsutaan suoraan (KysyUusiPeli ym.).
// Uusi peli kysyy varmistuksen (webin #nollaa-dialog) ja tyhjentää tallennuksen
// ja ääniasetukset: PeliOhjain.UusiPeli (Pelikoodari) + Asetukset.Nollaa.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Paavalikko : Pudotus
    {
        readonly Dictionary<Kytkin, (Button Rivi, Label Tila)> rivit = new Dictionary<Kytkin, (Button, Label)>();
        readonly Label versio;

        /// <summary>"uusi peli" vahvistettiin.</summary>
        public event Action UusiPeli;
        /// <summary>"ehdota sisältöä" painettiin (webin #palaute-kulma).</summary>
        public event Action EhdotaPainettu;
        /// <summary>"tekijätiedot ja lähteet" painettiin.</summary>
        public event Action TietojaPainettu;
        /// <summary>Retkikuntaosion paikka (SahkeNakyma täyttää; tyhjänä piilossa).</summary>
        public readonly VisualElement Retkikunta;

        /// <summary>Paneelin osa (iPhonen ☰-valikon riveiltä); Kaikki = iPad ja web-asettelu.</summary>
        public enum Osa { Kaikki, Asetukset, Kehittaja }
        Osa osa;
        readonly List<VisualElement> asetusosat = new List<VisualElement>(), komentoosat = new List<VisualElement>();
        readonly Vahvistus vahvistus;
        readonly VisualElement aanentasot;
        readonly Dictionary<Voima, (Slider Saadin, Label Arvo)> saatimet = new Dictionary<Voima, (Slider, Label)>();
        StyleEnum<DisplayStyle>? retkiEnnen;

        public void AvaaOsa(Osa o)
        {
            if (Auki) Sulje();
            osa = o;
            Avaa();
        }

        public Paavalikko(UiKerros kerros, Func<float> alareuna, Vahvistus vahvistus) : base(kerros, alareuna, "mk-paavalikko")
        {
            this.vahvistus = vahvistus;
            AukiMuuttui += auki => { if (!auki) { osa = Osa.Kaikki; Asetukset.Tallenna(); } };
            // iPhonen Asetukset-osion ylin osio: äänentasot liukusäätimin (Fable 24.9.: ☰-valikon kytkimet ovat
            // pikakytkimet, säädöt täällä). iPadilla ne ovat rattaan paneelissa, joten osio näkyy vain Asetukset-osana.
            aanentasot = Rakenne.El("mk-paavalikko__aanentasot", Sisalto, PickingMode.Ignore);
            Rakenne.Teksti("ÄÄNENTASOT", "mk-pudotus__otsikko", aanentasot);
            foreach (var v in Asetukset.VoimaJarjestys) saatimet[v] = Aanentasot.LuoSaadinrivi(aanentasot, v);
            Otsikko("Äänet");
            Kytkinrivi(Kytkin.Kertoja, Ikonit.Kertoja);
            Kytkinrivi(Kytkin.Musiikki, Ikonit.Musiikki);
            Kytkinrivi(Kytkin.Aanimaisema, Ikonit.Aanimaisema);
            Otsikko("Kartta");
            Kytkinrivi(Kytkin.PieniLiike, Ikonit.PieniLiike);
            Retkikunta = Rakenne.El("mk-paavalikko__retkikunta", Sisalto, PickingMode.Ignore);
            Retkikunta.style.display = DisplayStyle.None;
            asetusosat.AddRange(Sisalto.Children());
            asetusosat.Remove(aanentasot);
            // KOKEET vain kehittäjätilassa (Fablen tarkastus C4: ei App Storen pelaajille).
            kokeet = Rakenne.El("mk-paavalikko__kokeet", Sisalto, PickingMode.Ignore);
            Rakenne.Teksti("KOKEET", "mk-pudotus__otsikko", kokeet);
            reliefi = Rakenne.Nappi(null, "mk-kytkinrivi", VaihdaReliefi, kokeet, Ikonit.Viiva["satelliitti"]);
            reliefi.tooltip = "Astronautin kameran reliefi: täysvärinen (1,0) tai webin vaimea (0,8). Näkyy seuraavalla avauksella.";
            Rakenne.Teksti("Astronautin reliefi", "mk-kytkinrivi__nimi", reliefi);
            reliefiTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", reliefi);
            // Maailmanappi (omistajan löydös 36, web #kehittaja-maailma-btn kehittäjävalikossa): vain kehittäjälle;
            // huntu pois koko pallolta (web: ei kermaa maailmanäkymässä), panorointi on natiivissa jo vapaa.
            maailma = Rakenne.Nappi(null, "mk-kytkinrivi", () => { AsetaMaailma(!Maailma); Paivita(); }, kokeet, Maapallo);
            maailma.tooltip = "Maailmanäkymä: huntu pois ja liikkuminen koko pallolla (kehittäjä)";
            Rakenne.Teksti("Maailma", "mk-kytkinrivi__nimi", maailma);
            maailmaTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", maailma);
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
            // Työhuone (web #kehittaja-tyohuone): Raamattu ja Kehittäjälehti kehittäjän liitteinä (Tyohuone.cs).
            // Fable 24.9.: vain kehittäjätilassa eikä koskaan App Store -buildissa.
            Tyohuonerivi("Raamattu", "<path d=\"M5 4.5h6.5v15H6.6A1.6 1.6 0 0 1 5 17.9z\"/><path d=\"M19 4.5h-6.5v15h4.9a1.6 1.6 0 0 0 1.6-1.6z\"/>", Tyohuone.AvaaRaamattu);
            Tyohuonerivi("Kehittäjälehti", "<path d=\"M4.5 5.5h15v13h-15z\"/><path d=\"M7.5 9.5h6M7.5 12.5h9M7.5 15.5h9\"/>", Tyohuone.AvaaKehittajalehti);
#endif

            int ennenKomentoja = Sisalto.childCount;
            Rakenne.El("mk-pudotus__erotin", Sisalto, PickingMode.Ignore);
            var uusi = Rakenne.Nappi("uusi peli", "mk-komentorivi", () => { Sulje(); KysyUusiPeli(); }, Sisalto);
            Kirjasimet.Aseta(uusi, Kirjasin.KoneLihava);

            var ehdota = Rakenne.Nappi("ehdota sisältöä", "mk-komentorivi", () => { Sulje(); Ehdota(); }, Sisalto);
            ehdota.tooltip = "Ehdota sisältöä tai lähetä palautetta tästä kohdasta";
            Kirjasimet.Aseta(ehdota, Kirjasin.KoneLihava);

            var tietoja = Rakenne.Nappi("tekijätiedot ja lähteet", "mk-komentorivi", () => { Sulje(); Tietoja(); }, Sisalto);
            Kirjasimet.Aseta(tietoja, Kirjasin.KoneLihava);

            var pohja = Rakenne.El("mk-pudotus__pohjarivi", Sisalto, PickingMode.Ignore);
            // Versiorivi avaa "Mitä uutta" (webin versiokulma → #muutokset-dialog); sen Kehittäjä-nappi
            // avaa kehittäjätilan koodi-ikkunan (webin #kehittaja-btn).
            var versioNappi = Rakenne.Nappi("", "mk-pudotus__versionappi", () => { Sulje(); MitaUutta.Avaa(); }, pohja);
            versio = versioNappi.Q<Label>();
            versio.AddToClassList("mk-pudotus__versio");
            kehittaja = new KehittajaIkkuna(kerros);
#if MATKAKIRJA_APPSTORE
            // App Storessa ei kehittäjätilaa: "Mitä uutta" ilman Kehittäjä-nappia.
            MitaUutta = new MitaUutta(kerros, null);
#else
            MitaUutta = new MitaUutta(kerros, kehittaja.Avaa);
#endif
            for (int i = ennenKomentoja; i < Sisalto.childCount; i++) komentoosat.Add(Sisalto[i]);
#if !MATKAKIRJA_APPSTORE
            // Kehittäjäkoodi (iPhonen Kehittäjä-osa; iPadilla sama ikkuna aukeaa Mitä uutta -näkymän napista).
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
        public void Tietoja() => TietojaPainettu?.Invoke();

        readonly Button reliefi;
        readonly VisualElement kokeet;
        Button kynnykset;
        Label kynnyksetTila;
        readonly KehittajaIkkuna kehittaja;
        public readonly MitaUutta MitaUutta;
        readonly Label reliefiTila;

        /// <summary>Webin maailmanapin viivaikoni (index.html #kehittaja-maailma-btn).</summary>
        const string Maapallo = "<circle cx=\"12\" cy=\"12\" r=\"7.5\"/><path d=\"M4.5 12h15\"/><path d=\"M12 4.5a11 11 0 0 1 0 15 11 11 0 0 1 0-15z\"/>";
        const string MaailmaAvain = "matkakirja-kehittaja-maailma";
        Button maailma;
        Label maailmaTila;

        /// <summary>Kehittäjän maailmanäkymä päällä (säilyy kuten webin kehittajaMaailmaPaalla); vain kehittäjätilassa.</summary>
        public static bool Maailma => Asetukset.Kehittaja && PlayerPrefs.GetInt(MaailmaAvain, 0) == 1;

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
            if (v == null || v.huntu == !Maailma) return;
            v.huntu = !Maailma;
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

        void Kytkinrivi(Kytkin k, string ikoni)
        {
            var b = Rakenne.Nappi(null, "mk-kytkinrivi", () => Asetukset.Aseta(k, !Asetukset.Paalla(k)), Sisalto, ikoni);
            b.tooltip = Asetukset.Seloste(k);
            Rakenne.Teksti(Asetukset.Nimi(k), "mk-kytkinrivi__nimi", b);
            var tila = Rakenne.Teksti("", "mk-kytkinrivi__tila", b);
            rivit[k] = (b, tila);
        }

        protected override void Paivita()
        {
            foreach (var pari in rivit)
            {
                bool paalla = Asetukset.Paalla(pari.Key);
                pari.Value.Rivi.EnableInClassList("mk-valittu", paalla);
                pari.Value.Tila.text = paalla ? "PÄÄLLÄ" : "POIS";
            }
            reliefi.EnableInClassList("mk-valittu", ReliefiTaysi);
            maailma.EnableInClassList("mk-valittu", Maailma);
            maailmaTila.text = Maailma ? "PÄÄLLÄ" : "POIS";
            reliefiTila.text = ReliefiTaysi ? "TÄYSI" : "VAIMEA";
            kokeet.style.display = Asetukset.Kehittaja && osa != Osa.Asetukset ? DisplayStyle.Flex : DisplayStyle.None;
            aanentasot.style.display = osa == Osa.Asetukset ? DisplayStyle.Flex : DisplayStyle.None;
            if (osa == Osa.Asetukset) Aanentasot.PaivitaSaatimet(saatimet);
            foreach (var e in asetusosat) if (e != Retkikunta) e.style.display = osa == Osa.Kehittaja ? DisplayStyle.None : DisplayStyle.Flex;
            // Retkikunnan näkyvyys on SahkeNakyman: Kehittäjä-osassa piiloon ja takaisin entiseen seuraavalla avauksella.
            if (osa == Osa.Kehittaja) { retkiEnnen ??= Retkikunta.style.display; Retkikunta.style.display = DisplayStyle.None; }
            else if (retkiEnnen.HasValue) { Retkikunta.style.display = retkiEnnen.Value; retkiEnnen = null; }
            foreach (var e in komentoosat) e.style.display = osa == Osa.Kaikki ? DisplayStyle.Flex : DisplayStyle.None;
            if (kynnykset != null)
            {
                bool paalla = !Matkakirja.Linssit.Linssirekisteri.Kehittajatila;
                kynnykset.EnableInClassList("mk-valittu", paalla);
                kynnyksetTila.text = paalla ? "PÄÄLLÄ" : "POIS";
            }
            // E7: webin versiokulma "vNNN" / "vNNN · kehittäjä" (js/main.js); sisältöversio vain Tietoja-näkymässä.
            versio.text = "v" + Application.version + (Asetukset.Kehittaja ? " · kehittäjä" : "");
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
            selite.text = paalla ? "Kehittäjätila on päällä: KOKEET-osio näkyy päävalikossa." : "Kehittäjätila avaa päävalikon KOKEET-osion.";
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
