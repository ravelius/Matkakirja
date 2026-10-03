// MAAPALLON VUOSI -LINSSIN PANEELI (Natiivi-UI 28.9.2026): webin js/linssit/maapallon-vuosi.js (.mv-ui) ja
// maapallon-vuosi.html (CSS), Siirtosepän PR #3558. Linssi ja kuori ovat Linssiseppä 2:n (MaapallonVuosiSovitin,
// MaapallonVuosiLinssi); paneeli vain näyttää linssin tilan (Muuttui) ja kutsuu AsetaKuukausi/AsetaKerros/
// AsetaPeitto/Toisto.
//
//   paneeli   alareunan keskellä, leveys min(560, ruutu − 32), ala 18 + turva-alue; tausta rgba(12,16,26,0.72),
//             reunus 1 px rgba(239,230,210,0.18), pyöristys 14, täyte 12 14 10, rivien väli 8, teksti #efe6d2 15 px
//   rivi 1    ▶/❚❚ (34 × 34, pyöreä, rgba(239,230,210,0.12)) + kuukausiliuku 1–12 + kuukauden nimi
//             (web small-caps: pienaakkoset isoina kirjaimina pienemmällä koolla, oikealle, väh. 6,5 em)
//   rivi 2    kerrosvalikko ("Ei kerrosta" + luettelon nimet; max 48 %) + läpinäkyvyysliuku 0–1 (askel 0,05),
//             pois (0,35) ilman kerrosta
//   lähde     11 px, 0,6, keskellä: MaapallonVuosiLinssi.LahdeRivi
//
// Webissä linssi on koko ruudun oma näkymä: linssin ajaksi pelin yläpalkki, paikkapilleri, maan otsikko, Liiku
// ja nostomerkit väistyvät (LinssiUi.Vaihtui, laitekuva vuosi1 07-pohja.png).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Vuosi;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MaapallonVuosiNakyma
    {
        const string ToistaIkoni = "<path class=\"taytto\" d=\"M8 5.5v13l10.5-6.5z\"/>";
        const string TaukoIkoni = "<rect class=\"taytto\" x=\"6.5\" y=\"5.5\" width=\"4\" height=\"13\" rx=\"0.8\"/>"
            + "<rect class=\"taytto\" x=\"13.5\" y=\"5.5\" width=\"4\" height=\"13\" rx=\"0.8\"/>";
        const string EiKerrosta = "Ei kerrosta";

        readonly UiKerros kerros;
        readonly VisualElement juuri, paneeli, toistaIkoni, taukoIkoni;
        readonly Button toista;
        readonly SliderInt kuukausi;
        readonly Slider peitto;
        readonly Label nimi, lahde;
        readonly DropdownField valinta;
        readonly List<string> tunnukset = new List<string>();
        MaapallonVuosiLinssi linssi;
        int kerrosVersio = -1;
        bool paivittaa;

        public MaapallonVuosiNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-vuosi", kerros.Juuri(LinssiUi.RadioKerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            paneeli = Rakenne.El("mk-vuosi__paneeli", juuri);
            Kirjasimet.Aseta(paneeli, Kirjasin.Luku);

            var rivi1 = Rakenne.El("mk-vuosi__rivi", paneeli, PickingMode.Ignore);
            // ▶/❚❚ OHJAUSNAPPI-neliönä lasiteemalla (omistaja 2.10.2026 klo 14.2x EI OVAALEJA, Päätoimittaja 3.10.).
            toista = Rakenne.Nappi(null, "mk-ohjausnappi tk-teema-lasi mk-vuosi__toista", () => linssi?.Toisto(!linssi.Toistaa), rivi1);
            toistaIkoni = Rakenne.Ikoni(ToistaIkoni, "mk-vuosi__ikoni", toista);
            taukoIkoni = Rakenne.Ikoni(TaukoIkoni, "mk-vuosi__ikoni", toista);
            kuukausi = new SliderInt(1, 12) { pageSize = 0 };
            kuukausi.AddToClassList("mk-saadin");
            kuukausi.AddToClassList("mk-vuosi__liuku");
            kuukausi.tooltip = "Kuukausi";
            rivi1.Add(kuukausi);
            kuukausi.RegisterValueChangedCallback(e => { if (!paivittaa) linssi?.AsetaKuukausi(e.newValue); });
            nimi = Rakenne.Teksti("", "mk-vuosi__nimi", rivi1);

            var rivi2 = Rakenne.El("mk-vuosi__rivi", paneeli, PickingMode.Ignore);
            valinta = new DropdownField(new List<string> { EiKerrosta }, 0);
            valinta.AddToClassList("mk-vuosi__valinta");
            valinta.tooltip = "Datakerros";
            Kirjasimet.Aseta(valinta, Kirjasin.Luku);
            rivi2.Add(valinta);
            valinta.RegisterValueChangedCallback(_ =>
            {
                if (paivittaa) return;
                int i = valinta.index;
                linssi?.AsetaKerros(i > 0 && i - 1 < tunnukset.Count ? tunnukset[i - 1] : null);
            });
            peitto = new Slider(0f, 1f) { pageSize = 0 };
            peitto.AddToClassList("mk-saadin");
            peitto.AddToClassList("mk-vuosi__peitto");
            peitto.tooltip = "Kerroksen läpinäkyvyys";
            rivi2.Add(peitto);
            peitto.RegisterValueChangedCallback(e =>
            {
                if (paivittaa) return;
                // Web step 0,05.
                linssi?.AsetaPeitto(Mathf.Round(e.newValue / 0.05f) * 0.05f);
            });

            lahde = Rakenne.Teksti("", "mk-vuosi__lahde", paneeli);

            kerros.TurvaMuuttui += Asettele;
            Asettele();
            MaapallonVuosiSovitin.Vaihtui += Kytke;
            Kytke(MaapallonVuosiSovitin.Linssi);
        }

        public bool Nakyvissa => linssi != null;
        /// <summary>Paneeli (Pulu hyppää sen yläpuolelle, Pulu.Alareuna).</summary>
        public VisualElement Paneeli => paneeli;

        /// <summary>Ala 18 + turva-alue, sivuilla 16 (web calc(100% − 32px)).</summary>
        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            juuri.style.bottom = 18f + r.w;
            juuri.style.left = 16f + r.x;
            juuri.style.right = 16f + r.z;
        }

        void Kytke(MaapallonVuosiLinssi uusi)
        {
            if (linssi != null) linssi.Muuttui -= Paivita;
            linssi = uusi;
            kerrosVersio = -1;
            if (linssi != null) linssi.Muuttui += Paivita;
            juuri.style.display = linssi != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (linssi != null) Paivita();
        }

        /// <summary>Paneeli linssin tilasta (web paivitaUi): liuku, nimi, toisto, kerrosvalikko, peitto ja lähde.</summary>
        void Paivita()
        {
            if (linssi == null) return;
            paivittaa = true;
            try
            {
                kuukausi.SetValueWithoutNotify(linssi.Kk);
                // Web font-variant: small-caps pienaakkosille: isot kirjaimet pienemmällä koolla (UITK:ssa ei small-capsia).
                nimi.text = linssi.KuukaudenNimi.ToUpperInvariant();
                toistaIkoni.style.display = linssi.Toistaa ? DisplayStyle.None : DisplayStyle.Flex;
                taukoIkoni.style.display = linssi.Toistaa ? DisplayStyle.Flex : DisplayStyle.None;
                toista.tooltip = linssi.Toistaa ? "Pysäytä vuosi" : "Toista vuosi";
                var kerrokset = linssi.Kerrokset;
                if (kerrokset.Count != kerrosVersio)
                {
                    kerrosVersio = kerrokset.Count;
                    tunnukset.Clear();
                    var nimet = new List<string> { EiKerrosta };
                    foreach (var k in kerrokset) { tunnukset.Add(k.Tunnus); nimet.Add(k.Nimi); }
                    valinta.choices = nimet;
                }
                int i = linssi.Kerros == null ? 0 : tunnukset.IndexOf(linssi.Kerros) + 1;
                valinta.SetValueWithoutNotify(valinta.choices[Mathf.Max(0, i)]);
                peitto.SetValueWithoutNotify(linssi.Peitto);
                peitto.SetEnabled(linssi.Kerros != null);
                lahde.text = linssi.LahdeRivi;
            }
            finally { paivittaa = false; }
        }
    }
}
