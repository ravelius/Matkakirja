// LAUTAPELINOSTOT (Natiivi-UI; omistaja hyväksyi 11.10.2026 klo 14.2x Päätoimittajan kautta, juna 182): lautapelit nostoina omissa
// kaupungeissaan, Mylly Berliinissä ja Tavli Ateenassa (Peliluettelo.Koti). Sama sininen videopeliteema kuin Olavinlinnalla
// (tyylikirja teemat.videopeli, Videopelit.Hehku), mutta aina ilmaisia: napautus avaa videopeliteeman nostokortin (lyhyt
// esittely + ilmainen Pelaa, Videopelit.Lautapelinosto; PT 11.10. "tee molemmat"), Pelaa avaa pelin (MyllyNakyma/TavliNakyma.
// AvaaPeli). Kaupunkikortin tehtävätarjous (Peliluettelo.Odottaa) säilyy ennallaan.
//
//  - Karttaobjekti ERIKOISNOSTOT-pohjalla kuten kipsipäät ja kaupunkipallot: pyöreä sininen levy, jossa pelin viivaikoni
//    (sama kuin Pelit-valikossa, Ikonit.Viiva mylly/tavli), alla sininen hehkurengas ja syke 4 s:n välein (Videopelit).
//  - Paikka: kaupungin pisteen oikealla puolella; kun kaupungin kutsukortti on oikealla, vasemmalla (kuten pallo kortista poispäin).
//  - Näkyy pelaajan ollessa kaupungin maassa (kuten pallot ja päät), häivytys maan vaihtuessa; kaukonäkymän houkutinpisteet
//    hunnun päällä ovat Linssisepän. Piilossa pallon takapuolella, ruudun ulkopuolella sekä linssin, lentopelin, kaupunkikortin,
//    valikon ja muun kuin karttatilan aikana.
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Lautapelinostot
    {
        sealed class Kohde
        {
            public PeliKuvaus Peli;
            public Button Nappi;
            public double Lat, Lon;
            public string Maa;
            public float Peitto;
            public bool Nakyy;
        }

        /// <summary>Levyn koko (osuma-ala ≥ 44 pt) ja etäisyys kaupungin pisteestä.</summary>
        const float Koko = 44f, Sivulle = 30f;

        readonly VisualElement juuri;
        readonly List<Kohde> kohteet = new List<Kohde>();
        PalloKierto kierto;

        public Lautapelinostot(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-erikoisnostot", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            juuri.name = "lautapelinostot";
            juuri.style.display = DisplayStyle.None;
            foreach (var p in Peliluettelo.Kaikki) Lisaa(p);
            kerros.JokaRuutu += Ruutu;
        }

        void Lisaa(PeliKuvaus peli)
        {
            var k = new Kohde { Peli = peli, Lat = double.NaN, Lon = double.NaN };
            var b = Rakenne.Nappi(null, "mk-erikoisnosto-paa mk-lautapelinosto", () => Avaa(k), juuri);
            b.name = "lautapelinosto-" + peli.Id;   // todistusajon haku
            b.tooltip = Kieli.T("ui.lautapelinosto.pelaa", peli.Nimi);   // VoiceOver
            var hehku = Rakenne.El("mk-lautapelinosto__hehku mk-nosto-merkki__hehku mk-nosto-merkki__hehku--videopeli", b, PickingMode.Ignore);
            hehku.style.backgroundImage = new StyleBackground(Videopelit.Hehku());
            var levy = Rakenne.El("mk-lautapelinosto__levy", b, PickingMode.Ignore);
            Rakenne.Ikoni(Ikonit.Viiva.TryGetValue(peli.Id, out var ik) ? ik : Ikonit.Viiva["noppa"], "mk-lautapelinosto__ikoni", levy);
            hehku.schedule.Execute(() =>
            {
                if (!k.Nakyy) return;
                hehku.ToggleInClassList("mk-nosto-merkki__hehku--syke");
                Ruudunpaivitys.Herata(2.6f);
            }).Every(Videopelit.SykeValiMs);
            b.style.display = DisplayStyle.None;
            k.Nappi = b;
            kohteet.Add(k);
        }

        static void Avaa(Kohde k)
        {
            // PT 11.10.: napautus avaa videopeliteeman nostokortin (esittely + ilmainen Pelaa).
            Debug.Log("MATKAKIRJA lautapelinosto: " + k.Peli.Id);
            if (UiNakymat.Olemassa) UiNakymat.Hae().Nostokortti.Avaa(Videopelit.PeliEtuliite + k.Peli.Id);
        }

        static bool Sallittu()
        {
            if (!UiNakymat.Olemassa) return false;
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            return o != null && o.Kaytossa && o.Tila == SilmukanTila.Kartta && ui.Linssit?.Auki == null && !ui.Kaupunkikortti.Nakyvissa
                   && Nappula.Lentopelissa == null && !ui.Valikko.Auki;
        }

        void Ruutu()
        {
            bool sallittu = Sallittu();
            juuri.style.display = sallittu ? DisplayStyle.Flex : DisplayStyle.None;
            kierto ??= Object.FindAnyObjectByType<PalloKierto>();
            float W = juuri.layout.width, H = juuri.layout.height;
            if (!sallittu || kierto == null || juuri.panel == null || float.IsNaN(W) || W <= 0)
            {
                foreach (var k in kohteet) Nayta(k, false);
                return;
            }
            var nk = NostoKerros.Instanssi;
            string maa = nk != null ? nk.NykyinenMaa : null;
            float kesto = Mathf.Min(nk != null ? nk.syttyminenS : 0.3f, Tyylikirja.Kesto.Avaus / 1000f);
            var kortti = UiNakymat.Hae().Kutsu?.Laatikko ?? default;
            Vector2 kk = kortti.width > 0 ? juuri.WorldToLocal(kortti.center) : new Vector2(float.NaN, float.NaN);
            foreach (var k in kohteet)
            {
                if (k.Maa == null && !Paikka(k)) { Nayta(k, false); continue; }
                bool oma = ErikoisnostoMitat.OmaMaa(k.Maa, maa);
                k.Peitto = ErikoisnostoMitat.Haivytys(k.Peitto, oma, Time.unscaledDeltaTime, kesto);
                if (k.Peitto <= 0f || !kierto.RuutuPiste(k.Lat, k.Lon, out var r)) { Nayta(k, false); continue; }
                var q = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y)));
                // Kortti oikealla lähellä → vasemmalle (kortin keskipiste alle 3 levyn päässä pisteestä oikealla).
                bool vasen = !float.IsNaN(kk.x) && kk.x > q.x && (kk - q).magnitude < Koko * 3f;
                float x = q.x + (vasen ? -Sivulle - Koko : Sivulle), y = q.y - Koko / 2f;
                if (x < -Koko || y < -Koko || x > W + Koko || y > H + Koko) { Nayta(k, false); continue; }
                k.Nappi.style.left = x;
                k.Nappi.style.top = y;
                k.Nappi.style.opacity = k.Peitto;
                k.Nappi.pickingMode = oma ? PickingMode.Position : PickingMode.Ignore;
                Nayta(k, true);
            }
        }

        /// <summary>Kotikaupungin sijainti ja maa pelin reittiverkosta (null, kunnes peli on ladattu).</summary>
        static bool Paikka(Kohde k)
        {
            var v = PeliOhjain.Instanssi?.Verkko;
            if (v == null || !v.Kaupungit.TryGetValue(k.Peli.Koti, out var c) || string.IsNullOrEmpty(c.Maa)) return false;
            k.Lat = c.Lat; k.Lon = c.Lon; k.Maa = c.Maa.ToUpperInvariant();
            return true;
        }

        static void Nayta(Kohde k, bool nakyy)
        {
            if (k.Nakyy == nakyy) return;
            k.Nakyy = nakyy;
            k.Nappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Testikomento: nostojen tila.</summary>
        public string Kuvaus()
        {
            var r = new List<string>();
            foreach (var k in kohteet)
                r.Add($"{k.Peli.Id} {(k.Nakyy ? $"näkyy @ {k.Nappi.worldBound.center.x:0},{k.Nappi.worldBound.center.y:0}" : "piilossa")} ({k.Peli.Koti}, {k.Maa ?? "-"})");
            return "lautapelinostot: " + string.Join("; ", r);
        }
    }
}
