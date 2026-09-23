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
//            [ tekijätiedot ja lähteet ]     (Tietoja: karttojen pakollinen attribuutio)
//   v1.0 · sisältö v1
//
// Kytkinrivit (.kertoja-valikko): min 44 pt, puolihimmeä tausta, reuna --line,
// pyöristys 8; päällä-rivi: --panel-2, reuna --accent-dark, teksti --accent;
// pois-rivi himmeä. Tilateksti versaalina ("päällä"/"pois").
// Kehittäjän syötekokeet (webin Syötekoe, Kerrokset, Kehysprofiili) ja
// laudanvalinta (piilossa webissäkin) jätetään pois. "ehdota sisältöä" tulee,
// kun natiivilla on palautekanava.
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
        /// <summary>"tekijätiedot ja lähteet" painettiin.</summary>
        public event Action TietojaPainettu;
        /// <summary>Retkikuntaosion paikka (SahkeNakyma täyttää; tyhjänä piilossa).</summary>
        public readonly VisualElement Retkikunta;

        public Paavalikko(UiKerros kerros, Func<float> alareuna, Vahvistus vahvistus) : base(kerros, alareuna, "mk-paavalikko")
        {
            Otsikko("Äänet");
            Kytkinrivi(Kytkin.Kertoja, Ikonit.Kertoja);
            Kytkinrivi(Kytkin.Musiikki, Ikonit.Musiikki);
            Kytkinrivi(Kytkin.Aanimaisema, Ikonit.Aanimaisema);
            Otsikko("Kartta");
            Kytkinrivi(Kytkin.PieniLiike, Ikonit.PieniLiike);
            Retkikunta = Rakenne.El("mk-paavalikko__retkikunta", Sisalto, PickingMode.Ignore);
            Retkikunta.style.display = DisplayStyle.None;
            // KOKEET vain kehittäjätilassa (Fablen tarkastus C4: ei App Storen pelaajille).
            kokeet = Rakenne.El("mk-paavalikko__kokeet", Sisalto, PickingMode.Ignore);
            Rakenne.Teksti("KOKEET", "mk-pudotus__otsikko", kokeet);
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
#endif

            Rakenne.El("mk-pudotus__erotin", Sisalto, PickingMode.Ignore);
            var uusi = Rakenne.Nappi("uusi peli", "mk-komentorivi", () =>
            {
                Sulje();
                vahvistus.Kysy("Uusi peli",
                    "Matka alkaa alusta ja kaikki muistit tyhjennetään: tallennettu peli, passin leimat, laukun tavarat ja ääniasetukset. Tätä ei voi perua.",
                    "Peruuta", "Aloita alusta", () =>
                    {
                        Asetukset.Nollaa();
                        UusiPeli?.Invoke();
                    });
            }, Sisalto);
            Kirjasimet.Aseta(uusi, Kirjasin.KoneLihava);

            var tietoja = Rakenne.Nappi("tekijätiedot ja lähteet", "mk-komentorivi", () => { Sulje(); TietojaPainettu?.Invoke(); }, Sisalto);
            Kirjasimet.Aseta(tietoja, Kirjasin.KoneLihava);

            var pohja = Rakenne.El("mk-pudotus__pohjarivi", Sisalto, PickingMode.Ignore);
            // Versiorivi avaa kehittäjätilan koodi-ikkunan (webin versiokulma #kehittaja-btn).
            var versioNappi = Rakenne.Nappi("", "mk-pudotus__versionappi", () => { Sulje(); kehittaja.Avaa(); }, pohja);
            versio = versioNappi.Q<Label>();
            versio.AddToClassList("mk-pudotus__versio");
            kehittaja = new KehittajaIkkuna(kerros);
            Asetukset.Muuttui += _ => { if (Auki) Paivita(); };
        }

        readonly Button reliefi;
        readonly VisualElement kokeet;
        Button kynnykset;
        Label kynnyksetTila;
        readonly KehittajaIkkuna kehittaja;
        readonly Label reliefiTila;

        static bool ReliefiTaysi => Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Kyllaisyys > 0.9f;

        void VaihdaReliefi()
        {
            LinssiOhjain.AsetaAstronautinKyllaisyys(ReliefiTaysi ? 0.8f : 1f);
            Paivita();
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
            reliefiTila.text = ReliefiTaysi ? "TÄYSI" : "VAIMEA";
            kokeet.style.display = Asetukset.Kehittaja ? DisplayStyle.Flex : DisplayStyle.None;
            if (kynnykset != null)
            {
                bool paalla = !Matkakirja.Linssit.Linssirekisteri.Kehittajatila;
                kynnykset.EnableInClassList("mk-valittu", paalla);
                kynnyksetTila.text = paalla ? "PÄÄLLÄ" : "POIS";
            }
            versio.text = (Asetukset.Kehittaja ? "kehittäjä · " : "") + "v" + Application.version + (UiNakymat.SisaltoVersio != null ? " · sisältö " + UiNakymat.SisaltoVersio : "");
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
