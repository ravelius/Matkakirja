// PÄÄVALIKKO (hampurilainen, Natiivi-UI erä 1): verkkopelin #paavalikko.
//
//   ÄÄNET    [kirja]  Kertoja       PÄÄLLÄ
//            [nuotti] Musiikki      PÄÄLLÄ
//            [kaiutin] Äänimaisema  PÄÄLLÄ
//   KARTTA   [aalto]  Pieni liike   PÄÄLLÄ
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

        public Paavalikko(UiKerros kerros, Func<float> alareuna, Vahvistus vahvistus) : base(kerros, alareuna, "mk-paavalikko")
        {
            Otsikko("Äänet");
            Kytkinrivi(Kytkin.Kertoja, Ikonit.Kertoja);
            Kytkinrivi(Kytkin.Musiikki, Ikonit.Musiikki);
            Kytkinrivi(Kytkin.Aanimaisema, Ikonit.Aanimaisema);
            Otsikko("Kartta");
            Kytkinrivi(Kytkin.PieniLiike, Ikonit.PieniLiike);
            Otsikko("Kokeet");
            reliefi = Rakenne.Nappi(null, "mk-kytkinrivi", VaihdaReliefi, Sisalto, Ikonit.Viiva["satelliitti"]);
            reliefi.tooltip = "Astronautin kameran reliefi: täysvärinen (1,0) tai webin vaimea (0,8). Näkyy seuraavalla avauksella.";
            Rakenne.Teksti("Astronautin reliefi", "mk-kytkinrivi__nimi", reliefi);
            reliefiTila = Rakenne.Teksti("", "mk-kytkinrivi__tila", reliefi);

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
            versio = Rakenne.Teksti("", "mk-pudotus__versio", pohja);
            Asetukset.Muuttui += _ => { if (Auki) Paivita(); };
        }

        readonly Button reliefi;
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
            versio.text = "v" + Application.version + (UiNakymat.SisaltoVersio != null ? " · sisältö " + UiNakymat.SisaltoVersio : "");
        }
    }
}
