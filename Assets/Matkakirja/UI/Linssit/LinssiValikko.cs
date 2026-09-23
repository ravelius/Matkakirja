// LINSSIN HAMPURILAISVALIKKO (Natiivi-UI): webin js/aikajana-valikko.js ja
// css/aikajana.css .aikajana-valikko-* (omistaja 8.9.2026, Raamattu "LINSSIEN
// HAMPURILAINEN OIKEASSA YLAKULMASSA"): linssin palkin oikean laidan nappi ja
// sen pudotusvalikko, järjestyksessä ylhäältä alas
//
//   1. Poistu           linssi kiinni (entinen ✕; LinssiUi.SuljeLinssi)
//   2. Aloita alusta    kaari alkuun (entinen ↺; kutsujan teko)
//   3. Kertoja          pelin oma kytkin Asetukset Kytkin.Kertoja (web luentaKytkin)
//   4. Taustamusiikki   pelin oma kytkin Asetukset Kytkin.Musiikki (web musiikkiPaalla)
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
        readonly (Button Rivi, Label Tila) kertoja, musiikki;
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

            valikko = Rakenne.El("mk-linssivalikko", kerros.Turva(LinssiUi.Kerros));
            valikko.style.display = DisplayStyle.None;
            Rakenne.Tausta(valikko, Kuviot.Ylapalkki);
            Kirjasimet.Aseta(valikko, Kirjasin.Kone);

            Komento("Poistu", () => this.poistu?.Invoke());
            alustaNappi = Komento("Aloita alusta", () => this.alusta?.Invoke());
            kertoja = Kytkinrivi(Kytkin.Kertoja, "Kertoja");
            musiikki = Kytkinrivi(Kytkin.Musiikki, "Taustamusiikki");

            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        /// <summary>Komento: yksi teko ja valikko kiinni.</summary>
        Button Komento(string teksti, Action teko)
        {
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta", () => { Sulje(); teko(); }, valikko);
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
            Rakenne.Teksti(nimi, "mk-linssivalikko__nimi", b);
            var tila = Rakenne.Teksti("", "mk-linssivalikko__tila", b);
            return (b, tila);
        }

        void PaivitaRivi(Kytkin k)
        {
            var (rivi, tila) = k == Kytkin.Kertoja ? kertoja : musiikki;
            bool paalla = Asetukset.Paalla(k);
            rivi.EnableInClassList("mk-valittu", paalla);
            tila.text = paalla ? "päällä" : "pois";
            rivi.tooltip = (k == Kytkin.Kertoja ? "Kertoja" : "Taustamusiikki") + ": " + tila.text;
        }

        /// <summary>Kytkinten tila Asetuksista (web paivita).</summary>
        public void Paivita()
        {
            PaivitaRivi(Kytkin.Kertoja);
            PaivitaRivi(Kytkin.Musiikki);
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
            valikko.style.display = DisplayStyle.Flex;
            valikko.BringToFront();
            Nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            valikko.style.display = DisplayStyle.None;
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
            if (!valikko.worldBound.Contains(p) && !Nappi.worldBound.Contains(p)) Sulje();
        }
    }
}
