// LINSSIN HAMPURILAISVALIKKO (Natiivi-UI): webin js/aikajana-valikko.js ja
// css/aikajana.css .aikajana-valikko-* (omistaja 8.9.2026, Raamattu "LINSSIEN
// HAMPURILAINEN OIKEASSA YLAKULMASSA"): linssin palkin oikean laidan nappi ja
// sen pudotusvalikko, järjestyksessä ylhäältä alas
//
//   1. Poistu           linssi kiinni (entinen ✕; LinssiUi.SuljeLinssi)
//   2. Aloita alusta    kaari alkuun (entinen ↺; kutsujan teko)
//   3. Kertoja          pelin oma kytkin Asetukset Kytkin.Kertoja (web luentaKytkin)
//   4. Taustamusiikki   pelin oma kytkin Asetukset Kytkin.Musiikki (web musiikkiPaalla)
//   5. Tekstitys        vain linsseillä, jotka antavat sen (NaytaTekstitys; Ihmisen matka II, löydös 147)
//
// Kytkimet ovat PELIN omia eivätkä linssin paikallisia: sama kertoja vaikenee
// matkakirjan merkinnöissä (Puhe kuuntelee Asetukset.Muuttui), ja linssin oma
// luenta mykistyy EsityksenAani.Mykistetty-koukusta (LinssiUi). Kaikki kohdat
// sulkevat valikon; kytkimen tila kirjoitetaan riville ennen sulkua, ja tila
// luetaan uudestaan joka avauksella (kytkintä voi kääntää muualtakin).
//
// Asu: ikoni Ikonit.Valikko (sama kynä kuin päävalikossa, web HAMPURILAISEN_POLKU),
// pudotus napin alle oikeaan reunaan, sama ruskea liukuväri kuin palkilla
// (Kuviot.Ylapalkki), kullanväriset rivit, tila "päällä"/"pois" vaalealla.
// Pudotus asuu linssikerroksen turva-alueella (ei napin sisällä), jotta se
// piirtyy linssin paneelin päälle; paikka lasketaan napista avatessa.
// Napautus valikon ja napin ohi sulkee (web ulkopuolella-kuuntelija).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiValikko
    {
        /// <summary>Hampurilaisnappi; kutsuja lisää sen palkkiinsa (webin kotelo).</summary>
        public readonly Button Nappi;
        readonly VisualElement valikko;
        readonly Button alustaNappi;
        readonly (Button Rivi, Label Tila) kertoja, musiikki, tekstitys;
        Func<bool> tekstitysTila;
        Action<bool> tekstitysAseta;
        readonly Action poistu, alusta;

        /// <summary>Taustamusiikin kytkin käännettiin (web onMusiikki: linssin oma raita tottelee samaa kytkintä).</summary>
        public event Action<bool> Musiikki;

        public bool Auki { get; private set; }

        public LinssiValikko(UiKerros kerros, Action poistu, Action alusta)
        {
            this.poistu = poistu;
            this.alusta = alusta;
            Nappi = Rakenne.Nappi(null, "mk-aikajana-nappi mk-linssivalikko__nappi", Vaihda, null, Ikonit.Valikko);
            Nappi.tooltip = "Valikko";

            // Kerroksen juureen (ei turva-alueeseen): ylärivi on juuressa turvan jälkeen ja peitti valikon yläosan (Poistu) — avaus
            // tuo valikon sen päälle (f4f47679-todennus 1.10.2026). Paikka lasketaan napista (Asettele), joten turvaa ei tarvita.
            valikko = Rakenne.El("mk-linssivalikko", kerros.Juuri(LinssiUi.Kerros));
            valikko.style.display = DisplayStyle.None;
            // PANEELI (LASI), omistaja 1.10.2026, web #3810: tasainen lasipinta tokeneista (ei yläpalkin kuviota), komennot
            // TOIMINTO-riveinä, viiva, kytkimet KYTKIN-riveinä (tila kapiteelina). Tyylit Linssit.uss "PANEELI (LASI)".
            valikko.AddToClassList("mk-linssivalikko--pohja");
            Kirjasimet.Aseta(valikko, Kirjasin.Luku);

            Komento("Poistu", () => this.poistu?.Invoke());
            alustaNappi = Komento("Aloita alusta", () => this.alusta?.Invoke());
            Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);
            kertoja = Kytkinrivi(Kytkin.Kertoja, "Kertoja");
            musiikki = Kytkinrivi(Kytkin.Musiikki, "Taustamusiikki");
            tekstitys = Tekstitysrivi();
            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        /// <summary>
        /// OHJAUSNAPPI-valikko (omistaja 2.10.2026 klo 14.44: linssin kaikki kuvakenapit yhteen hampurilaiseen oikeaan yläkulmaan):
        /// linssin omat valinnat, viiva, Kertoja ja Taustamusiikki, viiva ja viimeisenä <paramref name="sulkuNimi"/>. Nappi on
        /// OHJAUSNAPPI-neliö (harmaa); kutsuja sijoittaa sen ohjausryhmään.
        /// </summary>
        public LinssiValikko(UiKerros kerros, IEnumerable<(string Nimi, Action Teko)> valinnat, string sulkuNimi, Action sulje)
        {
            poistu = sulje;
            Nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", Vaihda, null, "harmaa");
            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja", kerros.Juuri(LinssiUi.Kerros));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Luku);
            bool omia = false;
            foreach (var (nimi, teko) in valinnat) { Komento(nimi, teko); omia = true; }
            if (omia) Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);
            kertoja = Kytkinrivi(Kytkin.Kertoja, "Kertoja");
            musiikki = Kytkinrivi(Kytkin.Musiikki, "Taustamusiikki");
            tekstitys = Tekstitysrivi();
            Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);
            Komento(sulkuNimi, () => poistu?.Invoke());
            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        /// <summary>Löydös 147 (omistaja, build 17): Ihmisen matka II:n CC-nappi pois yläriviltä, tilalle kytkin "Tekstitys".</summary>
        (Button Rivi, Label Tila) Tekstitysrivi()
        {
            var tb = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () =>
            {
                if (tekstitysTila == null) return;
                tekstitysAseta?.Invoke(!tekstitysTila());
                PaivitaTekstitys();
                Sulje();
            }, valikko);
            Rakenne.Teksti("Tekstitys", "mk-linssivalikko__nimi", tb);
            var tila = Rakenne.Teksti("", "mk-linssivalikko__tila", tb);
            Kirjasimet.Aseta(tila, Kirjasin.KoneBold);
            tb.style.display = DisplayStyle.None;
            return (tb, tila);
        }

        /// <summary>Komento: yksi teko ja valikko kiinni.</summary>
        Button Komento(string teksti, Action teko)
        {
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => { Sulje(); teko(); }, valikko);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            b.tooltip = teksti;
            return b;
        }

        /// <summary>Kytkinrivi: nimi vasemmalla, tila ("päällä"/"pois") oikealla.</summary>
        (Button, Label) Kytkinrivi(Kytkin k, string nimi)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () =>
            {
                bool uusi = !Asetukset.Paalla(k);
                Asetukset.Aseta(k, uusi);
                if (k == Kytkin.Musiikki) Musiikki?.Invoke(uusi);
                // Tila riville heti, vasta sitten sulku: seuraava avaus näyttää totuuden.
                PaivitaRivi(k);
                Sulje();
            }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(nimi, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            var tila = Rakenne.Teksti("", "mk-linssivalikko__tila", b);
            Kirjasimet.Aseta(tila, Kirjasin.KoneBold);
            return (b, tila);
        }

        void PaivitaRivi(Kytkin k)
        {
            var (rivi, tila) = k == Kytkin.Kertoja ? kertoja : musiikki;
            bool paalla = Asetukset.Paalla(k);
            rivi.EnableInClassList("mk-valittu", paalla);
            tila.text = paalla ? "PÄÄLLÄ" : "POIS";
            rivi.tooltip = (k == Kytkin.Kertoja ? "Kertoja" : "Taustamusiikki") + ": " + (paalla ? "päällä" : "pois");
        }

        /// <summary>Kytkinten tila Asetuksista (web paivita).</summary>
        public void Paivita()
        {
            PaivitaRivi(Kytkin.Kertoja);
            PaivitaRivi(Kytkin.Musiikki);
            PaivitaTekstitys();
        }

        /// <summary>
        /// Tekstitys-kytkin näkyviin linssin omalla tilalla (tila + asetus), tai pois (null). Löydös 147: Ihmisen matka II.
        /// </summary>
        public void NaytaTekstitys(Func<bool> tila, Action<bool> aseta)
        {
            tekstitysTila = tila;
            tekstitysAseta = aseta;
            tekstitys.Rivi.style.display = tila != null ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaTekstitys();
        }

        public bool TekstitysNakyy => tekstitysTila != null;

        void PaivitaTekstitys()
        {
            if (tekstitysTila == null) return;
            bool paalla = tekstitysTila();
            tekstitys.Rivi.EnableInClassList("mk-valittu", paalla);
            tekstitys.Tila.text = paalla ? "PÄÄLLÄ" : "POIS";
            tekstitys.Rivi.tooltip = "Tekstitys: " + (paalla ? "päällä" : "pois");
        }

        /// <summary>Aloita alusta -rivi näkyviin tai pois (kaari, jolle alustusta ei vielä ole).</summary>
        public void NaytaAlusta(bool nakyy) => alustaNappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            if (Auki || Nappi.panel == null) return;
            Paivita();
            Auki = true;
            Asettele();
            valikko.BringToFront();
            // Avaus ja sulku animoiden napin kulmasta (omistaja 29.9.2026, Raamattu PR #3602; Ponnahdus = webin arvot).
            Ponnahdus.Avaa(valikko, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
            Nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ponnahdus.Sulje(valikko);
            Nappi.RemoveFromClassList("mk-valittu");
        }

        /// <summary>Pudotus napin alle, oikea reuna napin oikeaan reunaan (web top: 100% + 0.4rem; right: 0).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
            var n = Nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 6;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            if (Nappi.panel == null) { Sulje(); return; }
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!valikko.worldBound.Contains(p) && !Nappi.worldBound.Contains(p)) { UiKerros.OhiSulki(); Sulje(); }  // maakuntalappu ei aukea samasta napautuksesta (omistaja 30.9.2026)
        }
    }
}
