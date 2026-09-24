// NOSTOT KARTALLA (Natiivi-UI, build 6 -löydös 1): webin pallon nostokerroksen merkit
// (js/pallolauta/nostot.js, js/fokusnosto-symbolit.js) Natiivisepän NostoKerroksen tiedoilla
// (RAJAPINTA.md luku 3c). Kartta päättää, mitkä nostot näkyvät ja missä (Naytettavat, Ruutu);
// tämä piirtää merkin, nimiön ja syttymisen ja avaa kortin napautuksesta.
//
//   ● Thessaloniki        kaupungit ja hetket: piste r 3,4 aihevärillä ja musterengas
//   ✦ Olympos            ihmeet, skandaalit, eläimet: kynäsymboli (NostoMerkit) aihevärillä
//   [kuva] Delfoi         historia, luonto, kulttuuri, kauppa: tyyppimerkki (merkki-*.png)
//
// Nimiö (11 px, Iowan kursiivi, pergamenttihalo) merkin oikealla puolella, tärkeillä (tarkeys ≥ 2)
// hieman isompi. Koko kerros häivähtää Syttyminen-arvon mukaan (0 → 1, 0,7 s). Merkit näkyvät aina; karttaselitteen
// valinta ohjaa vain karttavalojen hehkua (Natiiviseppä, web). Linssin ajan kerros on piilossa (NaytaSallittu).
// Ryhmitys 44 px ja viuhka ovat seuraava vaihe.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class NostotKartalla
    {
        readonly VisualElement juuri;
        readonly List<Merkki> merkit = new List<Merkki>();
        readonly Dictionary<string, NostoMerkit.Rivi> rivit = new Dictionary<string, NostoMerkit.Rivi>();
        NostoKerros lahde;
        IKarttaValot valot;
        bool sallittu = true;

        sealed class Merkki
        {
            public VisualElement El, Symboli;
            public Label Nimio;
            public string Id, Tyyppi;
        }

        public NostotKartalla(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-nostot", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            foreach (var r in NostoMerkit.Jarjestys) rivit[r.Id] = r;
            kerros.JokaRuutu += Kytke;
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: merkit piiloon.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Paivita();
        }

        void Kytke()
        {
            var k = NostoKerros.Instanssi;
            if (k != lahde)
            {
                if (lahde != null) lahde.Paivittyi -= Paivita;
                lahde = k;
                if (lahde != null) lahde.Paivittyi += Paivita;
                Paivita();
            }
            var p = UiPalvelut.KarttaValot;
            if (p != valot)
            {
                if (valot != null) valot.Muuttui -= Paivita;
                valot = p;
                if (valot != null) valot.Muuttui += Paivita;
                Paivita();
            }
        }

        void Paivita()
        {
            var k = lahde;
            bool nakyy = sallittu && k != null && k.Nakyvissa && juuri.panel != null;
            juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!nakyy) return;
            juuri.style.opacity = Mathf.Clamp01(k.Syttyminen);
            // Merkit näkyvät aina (web fokuskohteet); karttaselitteen valinta ohjaa vain karttavalojen hehkua.
            var paneeli = juuri.panel;
            int n = 0;
            foreach (var s in k.Naytettavat)
            {
                var m = Hae(n++, s);
                // Ruutu: pikselit, origo vasen ala → paneelin pisteet (origo vasen ylä).
                var p = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(s.Ruutu.x, Screen.height - s.Ruutu.y));
                m.El.style.translate = new Translate(Mathf.Round(p.x), Mathf.Round(p.y));
            }
            for (int i = n; i < merkit.Count; i++) merkit[i].El.style.display = DisplayStyle.None;
        }

        /// <summary>Uusiokäyttö: i:s merkki tälle nostolle (symboli ja nimiö vaihdetaan vain tarvittaessa).</summary>
        Merkki Hae(int i, NostoKerros.Nosto s)
        {
            while (merkit.Count <= i)
            {
                var uusi = new Merkki { El = Rakenne.El("mk-nosto-merkki", juuri) };
                var m0 = uusi;
                uusi.El.RegisterCallback<ClickEvent>(_ => { if (m0.Id != null) UiPalvelut.IlmoitaValo(m0.Id); });
                uusi.Nimio = Rakenne.Teksti("", "mk-nosto-merkki__nimio", uusi.El);
                uusi.Nimio.pickingMode = PickingMode.Ignore;
                uusi.Nimio.enableRichText = false;
                Kirjasimet.Aseta(uusi.Nimio, Kirjasin.LukuKursiivi);
                merkit.Add(uusi);
            }
            var m = merkit[i];
            m.El.style.display = DisplayStyle.Flex;
            m.Id = s.Id;
            string tyyppi = (s.Aihe ?? "") + "|" + Kuva(s);
            if (tyyppi != m.Tyyppi)
            {
                m.Tyyppi = tyyppi;
                m.Symboli?.RemoveFromHierarchy();
                m.Symboli = Symboli(s);
                m.El.Insert(0, m.Symboli);
            }
            string nimi = s.Nimio ?? "";
            if (m.Nimio.text != nimi) m.Nimio.text = nimi;
            m.Nimio.style.display = nimi.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            m.El.EnableInClassList("mk-nosto-merkki--tarkea", s.Tarkeys >= 2);
            return m;
        }

        /// <summary>
        /// Tyyppimerkin kuva aiheen rivistä (webin KARTTASELITE_MERKIT): kategorian oma merkki, jos sellainen on
        /// (ruoka, tekniikka, merenkulku, meri), muuten aiheen ensimmäinen.
        /// </summary>
        string Kuva(NostoKerros.Nosto s)
        {
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r) || r.Kuvat.Length == 0) return null;
            foreach (var k in r.Kuvat)
                if (s.Kategoria != null && k == "merkki-" + s.Kategoria + ".png") return k;
            return r.Kuvat[0];
        }

        VisualElement Symboli(NostoKerros.Nosto s)
        {
            var alue = new VisualElement { pickingMode = PickingMode.Ignore };
            alue.AddToClassList("mk-nosto-merkki__symboli");
            if (s.Aihe == null || !rivit.TryGetValue(s.Aihe, out var r)) r = rivit["kaupungit"];
            string kuva = Kuva(s);
            if (kuva != null)
            {
                alue.AddToClassList("mk-nosto-merkki__symboli--kuva");
                Kuvat.Hae(NostoMerkit.KuvaJuuri + kuva, t => { if (t != null) alue.style.backgroundImage = new StyleBackground(t); });
                return alue;
            }
            bool piste = r.Piste || r.Vektori == null;
            alue.EnableInClassList("mk-nosto-merkki__symboli--piste", piste);
            var taytto = new SvgIkoni(piste ? NostoMerkit.PisteTaytto : r.Vektori) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
            taytto.AddToClassList("mk-ikoni--tayta");
            taytto.AddToClassList("mk-nosto-merkki__kuvio");
            taytto.style.color = Kuviot.Vari(r.Vari ?? "#8a6d4a");
            alue.Add(taytto);
            if (piste)
            {
                var rengas = new SvgIkoni(NostoMerkit.PisteRengas) { Ruutu = 16, Alku = new Vector2(-8, -8), pickingMode = PickingMode.Ignore };
                rengas.AddToClassList("mk-ikoni--tayta");
                rengas.AddToClassList("mk-nosto-merkki__kuvio");
                rengas.AddToClassList("mk-nosto-merkki__rengas");
                alue.Add(rengas);
            }
            return alue;
        }
    }
}
