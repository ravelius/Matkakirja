// KARTUSCHA (Natiivi-UI, erä 4): webin maapaneeli (js/pallolauta/maapaneeli.js)
// natiivina. Vanhan atlaksen kartussi kartan vasemmassa alakulmassa: pelaajan
// kaupungin maa.
//
// Suljettu (masto, kelluu kartalla pergamenttihalon kanssa):
//      I T A L I A
//      ───────────────
//      Italia · kuningaskunta v. 1873         (kursiivi)
// Avattu (napautus; kasvaa YLÖSPÄIN, masto pysyy paikallaan):
//      HISTORIA  RUOKA  MUSIIKKI …            maalehden aiheet → LueMaalehti(iso, aihe)
//      Valtiomuoto 1873  kuningaskunta
//      Nyt
//      VÄKILUKU    59 milj.     (sija 25./195 näkyy rivin napautuksesta)
//      PINTA-ALA   302 000 km²
//      DEMOKRATIA  0,64 · V-Dem
//      KESKITULO   42 100 $/v
//      KIELET      Buongiorno [lippu] italia …
//      [lippu] I T A L I A
// Avattu: pergamentti rgba(247,239,219,.94), reuna + sisäviiva, leveys 40 %
// (puhelimessa koko leveys). Sulkeutuu, kun karttaa kosketaan. Avattuna maston
// oikeassa laidassa radion merkkivalo (web .maapaneeli-radio, Mediarivi.Radionappi):
// maan suora lähetys, valo palaa soidessa; vain maille, joilla asema on. Piilossa, kun pelaaja ei ole kaupungissa, peli ei ole
// Kartta-/Dialogi-/Matkalla-tilassa tai linssi on päällä (NaytaSallittu).
// Data: UiSisalto.Maa (Siirtosepän maat-kokoelma).
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kartuscha
    {
        readonly UiKerros kerros;
        readonly VisualElement kortti, sisus, aiheet, tilastot, kielet, lippu;
        readonly Button masto, radio;
        readonly Label nimi, alarivi, valtiomuoto;
        readonly VisualElement valtiomuotoRivi;
        string iso, testiIso;
        bool auki, sallittu = true, sijatAuki;

        public Kartuscha(UiKerros kerros)
        {
            this.kerros = kerros;
            var turva = kerros.Turva(UiKerros.Tilarivi);

            kortti = Rakenne.El("mk-kartuscha", turva, PickingMode.Ignore);
            kortti.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(kortti, Kirjasin.Kone);

            // Ylhäältä alas: aiheet, tilastot, masto (flex-sarake, ankkuri alhaalla → kasvaa ylöspäin).
            sisus = Rakenne.El("mk-kartuscha__sisus", kortti);
            sisus.style.display = DisplayStyle.None;
            aiheet = Rakenne.El("mk-kartuscha__aiheet", sisus, PickingMode.Ignore);

            valtiomuotoRivi = Rakenne.El("mk-kartuscha__vuosi", sisus, PickingMode.Ignore);
            Rakenne.Teksti("VALTIOMUOTO 1873", "mk-kartuscha__nimike", valtiomuotoRivi);
            valtiomuoto = Rakenne.Teksti("", "mk-kartuscha__arvo", valtiomuotoRivi);

            tilastot = Rakenne.El("mk-kartuscha__tilastot", sisus);
            tilastot.RegisterCallback<PointerDownEvent>(_ => { sijatAuki = !sijatAuki; tilastot.EnableInClassList("mk-sijat-auki", sijatAuki); });
            kielet = Rakenne.El("mk-kartuscha__kielet", sisus, PickingMode.Ignore);

            masto = Rakenne.Nappi(null, "mk-kartuscha__masto", Vaihda, kortti);
            var nimirivi = Rakenne.El("mk-kartuscha__nimirivi", masto, PickingMode.Ignore);
            lippu = Rakenne.El("mk-kartuscha__lippu", nimirivi);
            // Lipun napautus → lipun tarina (web maapaneeli avaaLippuikkuna); muuten masto kuten ennen.
            lippu.RegisterCallback<PointerDownEvent>(e =>
            {
                string maa = testiIso ?? iso;
                if (!Lippuikkuna.On(maa)) return;
                e.StopPropagation();
                Lippuikkuna.Avaa(maa);
            });
            nimi = Rakenne.Teksti("", "mk-kartuscha__nimi", nimirivi);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            Rakenne.El("mk-kartuscha__viiva", masto, PickingMode.Ignore);
            alarivi = Rakenne.Teksti("", "mk-kartuscha__alarivi", masto);
            Kirjasimet.Aseta(alarivi, Kirjasin.LukuKursiivi);
            radio = Mediarivi.Radionappi(masto);

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            // Pelaajan maa tarkistetaan harvakseltaan (kaupunki vaihtuu vain saapuessa).
            kortti.schedule.Execute(Seuraa).Every(400);
            UiSisalto.Lataa(null);
        }

        void Asettele()
        {
            // Reuna 12 pt (tabletilla 24 pt) turva-alueen sisällä.
            float reuna = Screen.width > 1500 ? 24 : 12;
            kortti.style.left = reuna;
            kortti.style.bottom = reuna;
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: kartuscha piiloon.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Seuraa();
        }

        void Seuraa()
        {
            var o = PeliOhjain.Instanssi;
            string uusi = null;
            if (sallittu && o != null && o.Kaytossa && o.Matka != null
                && (o.Tila == SilmukanTila.Kartta || o.Tila == SilmukanTila.Dialogi || o.Tila == SilmukanTila.Matkalla))
            {
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa) uusi = UiSisalto.Kaupunki(s.Kaupunki)?.Maa;
            }
            if (testiIso != null) uusi = testiIso;
            if (uusi == iso) return;
            iso = uusi;
            if (iso == null || UiSisalto.Maa(iso) == null)
            {
                Sulje();
                kortti.style.display = DisplayStyle.None;
                return;
            }
            Tayta(UiSisalto.Maa(iso));
            var mt = UiSisalto.Maa(iso);
            Mediarivi.AsetaRadionMaa(radio, iso, mt?.Nimi ?? iso);
            Asettele();
            kortti.style.display = DisplayStyle.Flex;
        }

        void Tayta(MaaTiedot m)
        {
            nimi.text = (m.Nimi ?? m.Iso3).ToUpperInvariant();
            string vm = m.Valtiomuoto;
            alarivi.text = string.IsNullOrEmpty(m.Paikallinen) && string.IsNullOrEmpty(vm) ? ""
                : (m.Paikallinen ?? m.Nimi) + (string.IsNullOrEmpty(vm) ? "" : " · " + vm);
            alarivi.style.display = alarivi.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;

            lippu.style.backgroundImage = StyleKeyword.None;
            if (m.Lippu.Count > 0)
                Kuvat.Hae(m.Lippu[0], t =>
                {
                    if (t == null || iso != m.Iso3) return;
                    lippu.style.backgroundImage = new StyleBackground(t);
                    lippu.style.width = 18f * t.width / Mathf.Max(1, t.height);
                }, "liput");

            // Valtiomuoto 1873 ilman "v. 1873" -päätettä (webin valtiomuoto1873).
            valtiomuotoRivi.style.display = string.IsNullOrEmpty(vm) ? DisplayStyle.None : DisplayStyle.Flex;
            valtiomuoto.text = vm != null ? vm.Replace(" v. 1873", "") : "";

            tilastot.Clear();
            if (m.OnTiedot)
            {
                Rakenne.Teksti("Nyt", "mk-kartuscha__nyt", tilastot);
                Tilasto("VÄKILUKU", m.Vakiluku, m.VakilukuSija);
                Tilasto("PINTA-ALA", m.PintaAla, m.PintaAlaSija);
                Tilasto("DEMOKRATIA", m.Demokratia != null ? m.Demokratia + " · V-Dem" : null, m.DemokratiaSija);
                Tilasto("KESKITULO", m.Keskitulo, m.KeskituloSija);
            }
            tilastot.style.display = m.OnTiedot ? DisplayStyle.Flex : DisplayStyle.None;

            kielet.Clear();
            if (m.Tervehdykset.Count > 0)
            {
                Rakenne.Teksti("KIELET", "mk-kartuscha__nimike", kielet);
                var rivi = Rakenne.El("mk-kartuscha__tervehdykset", kielet, PickingMode.Ignore);
                foreach (var (teksti, kieli, lippuNimi, _) in m.Tervehdykset)
                {
                    var t = Rakenne.El("mk-tervehdys", rivi, PickingMode.Ignore);
                    Rakenne.Teksti(teksti, "mk-tervehdys__teksti", t);
                    if (!string.IsNullOrEmpty(lippuNimi))
                    {
                        var l = Rakenne.El("mk-tervehdys__lippu", t, PickingMode.Ignore);
                        Kuvat.Hae(lippuNimi, tex => { if (tex != null) { l.style.backgroundImage = new StyleBackground(tex); l.style.width = 11f * tex.width / Mathf.Max(1, tex.height); } }, "liput");
                    }
                    Rakenne.Teksti(kieli, "mk-tervehdys__kieli", t);
                }
            }
            kielet.style.display = m.Tervehdykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;

            aiheet.Clear();
            foreach (var (id, aiheNimi) in m.Aiheet)
            {
                var b = Rakenne.Nappi(aiheNimi.ToUpperInvariant(), "mk-kartuscha__aihe", () => AvaaAihe(id), aiheet);
                b.style.borderBottomColor = Kuviot.Vari(AiheenVari(id));
            }
            aiheet.style.display = m.Aiheet.Count > 0 && m.Maalehti != null ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void Tilasto(string nimike, string arvo, string sija)
        {
            if (string.IsNullOrEmpty(arvo)) return;
            var r = Rakenne.El("mk-kartuscha__rivi", tilastot, PickingMode.Ignore);
            Rakenne.Teksti(nimike, "mk-kartuscha__nimike", r);
            Rakenne.Teksti(arvo, "mk-kartuscha__arvo", r);
            if (!string.IsNullOrEmpty(sija)) Rakenne.Teksti(sija, "mk-kartuscha__sija", r);
        }

        /// <summary>Aiheen alleviivausväri webin aiheperheistä (--sym-*).</summary>
        static string AiheenVari(string id)
        {
            if (id.StartsWith("hetki")) return "#6e4a63";
            switch (id)
            {
                case "historia": return "#a05c3f";
                case "ruoka": case "keittio": case "juoma": return "#8e4550";
                case "musiikki": case "kuvataide": case "kulttuuri": case "teatteri": case "arkkitehtuuri": return "#7b5a8c";
                case "luonto": return "#4f7d6f";
                case "elaimet": return "#b98d54";
                case "kieli": case "kirjallisuus": case "legendat": return "#47597f";
                case "tiede": case "tekniikka": return "#6f7278";
                case "kauppa": return "#7d7840";
                case "merenkulku": return "#34566d";
                case "urheilu": return "#93893c";
                case "menovinkit": case "nahtavyydet": return "#5f7f9e";
                default: return "#4b3a1c";
            }
        }

        void AvaaAihe(string aihe)
        {
            var o = PeliOhjain.Instanssi;
            if (o == null || iso == null) return;
            Sulje();
            var virhe = o.LueMaalehti(iso, aihe);
            if (virhe != null) Debug.LogWarning("MATKAKIRJA ui kartuscha: " + virhe);
        }

        /// <summary>Testikomento: näytä maa ilman peliä (null = takaisin pelaajan maahan).</summary>
        public void Testaa(string iso3, bool avaa)
        {
            testiIso = iso3;
            UiSisalto.Lataa(() => { iso = null; Seuraa(); if (avaa) Avaa(); });
        }

        public void Vaihda() { if (auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            if (auki || iso == null) return;
            auki = true;
            kortti.AddToClassList("mk-auki");
            sisus.style.display = DisplayStyle.Flex;
        }

        public void Sulje()
        {
            if (!auki) return;
            auki = false;
            sijatAuki = false;
            tilastot.RemoveFromClassList("mk-sijat-auki");
            kortti.RemoveFromClassList("mk-auki");
            sisus.style.display = DisplayStyle.None;
        }

        /// <summary>Web: kartan kosketus sulkee avatun kartuschan.</summary>
        void TarkistaOhiNapautus()
        {
            if (!auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || kortti.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(kortti.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!kortti.worldBound.Contains(p)) Sulje();
        }
    }
}
