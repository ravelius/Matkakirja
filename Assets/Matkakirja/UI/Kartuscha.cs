// KARTUSCHA (Natiivi-UI, erä 4): webin maapaneeli (js/pallolauta/maapaneeli.js)
// natiivina. Vanhan atlaksen kartussi kartan vasemmassa alakulmassa: pelaajan
// kaupungin maa.
//
// Suljettu (masto, kelluu kartalla pergamenttihalon kanssa):
//      I T A L I A
//      ───────────────
//      Italia · kuningaskunta v. 1873         (kursiivi)
// Avattu (web .maapaneeli-kortti.valikko-auki, tarkistettu tuotannosta 24.9.2026 iPhone 393 × 852):
//      I T A L I A [lippu]              ○ radio
//      ────────────────────────────────────────
//      VÄKILUKU    59 milj.     (sija näkyy rivien napautuksesta)
//      PINTA-ALA   302 000 km²
//      DEMOKRATIA  0,64 · V-Dem
//      KESKITULO   42 100 $/v
//      KIELET      Buongiorno [lippu] italia
//      LUONTO  TARUT JA SADUT  …        (aiheet pisteviivoin → LueMaalehti(iso, aihe))
// Alarivi, valtiomuoto ja "Nyt" eivät näy avattuna (web display: none). Pergamentti rgba(247,239,219,.94),
// reuna ja sisäkehys 4 px sisempänä, puhelimessa koko leveys, tabletilla 40 %. Kortti kasvaa ylöspäin
// alakulmasta; Liiku väistyy (web body.infotaulu-auki) ja pulu hyppää kortin yläpuolelle (Pulu.Alareuna).
// Sulkeutuu, kun karttaa kosketaan. Piilossa, kun pelaaja ei ole kaupungissa, peli ei ole
// Kartta-/Dialogi-/Matkalla-tilassa tai linssi on päällä (NaytaSallittu).
// Data: UiSisalto.Maa (Siirtosepän maat-kokoelma).
using System.Collections.Generic;
using System.Linq;
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
        /// <summary>Pelaajan todellinen maa testimaan asetushetkellä: kun se vaihtuu, testi raukeaa.</summary>
        string testinTodellinen;
        bool auki, sallittu = true, sijatAuki;

        public Kartuscha(UiKerros kerros)
        {
            this.kerros = kerros;
            var turva = kerros.Turva(UiKerros.Tilarivi);

            kortti = Rakenne.El("mk-kartuscha", turva, PickingMode.Ignore);
            kortti.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(kortti, Kirjasin.Kone);

            // Ylhäältä alas (web): masto (nimi + lippu, viiva, alarivi) ja sen alla sisus (rivit, aiheet).
            masto = Rakenne.Nappi(null, "mk-kartuscha__masto", Vaihda, kortti);
            var nimirivi = Rakenne.El("mk-kartuscha__nimirivi", masto, PickingMode.Ignore);
            nimi = Rakenne.Teksti("", "mk-kartuscha__nimi", nimirivi);
            lippu = Rakenne.El("mk-kartuscha__lippu", nimirivi);
            // Lipun napautus → lipun tarina (web maapaneeli avaaLippuikkuna); muuten masto kuten ennen.
            lippu.RegisterCallback<PointerDownEvent>(e =>
            {
                string maa = testiIso ?? iso;
                if (!Lippuikkuna.On(maa)) return;
                e.StopPropagation();
                Lippuikkuna.Avaa(maa);
            });
            Rakenne.El("mk-kartuscha__viiva", masto, PickingMode.Ignore);
            alarivi = Rakenne.Teksti("", "mk-kartuscha__alarivi", masto);
            Kirjasimet.Aseta(alarivi, Kirjasin.LukuKursiivi);

            // Web outline 1px rgba(74, 52, 33, .22), offset −5px: sisäkehys avatun kortin reunan sisällä.
            Rakenne.El("mk-kartuscha__kehys", kortti, PickingMode.Ignore);
            sisus = Rakenne.El("mk-kartuscha__sisus", kortti);
            sisus.style.display = DisplayStyle.None;
            valtiomuotoRivi = Rakenne.El("mk-kartuscha__vuosi", sisus, PickingMode.Ignore);
            Rakenne.Teksti("VALTIOMUOTO 1873", "mk-kartuscha__nimike", valtiomuotoRivi);
            valtiomuoto = Rakenne.Teksti("", "mk-kartuscha__arvo", valtiomuotoRivi);
            tilastot = Rakenne.El("mk-kartuscha__tilastot", sisus);
            tilastot.RegisterCallback<PointerDownEvent>(_ => { sijatAuki = !sijatAuki; tilastot.EnableInClassList("mk-sijat-auki", sijatAuki); });
            kielet = Rakenne.El("mk-kartuscha__kielet", tilastot, PickingMode.Ignore);
            aiheet = Rakenne.El("mk-kartuscha__aiheet", sisus, PickingMode.Ignore);
            // Radio kortin oikeaan yläkulmaan (web .maapaneeli-radio: absolute, top/right 0,7rem).
            var radioPaikka = kortti;
            radio = Mediarivi.Radionappi(radioPaikka);

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            // Pelaajan maa tarkistetaan harvakseltaan (kaupunki vaihtuu vain saapuessa).
            kortti.schedule.Execute(Seuraa).Every(400);
            UiSisalto.Lataa(null);
        }

        void Asettele()
        {
            // Reuna 12 pt (tabletilla 24 pt) turva-alueen sisällä.
            // Web: reuna 12 px (≥ 768 px: 24) + --gap 8 px; puhelimessa avattu kortti koko leveydeltä.
            float reuna = (UiKerros.Tabletti ? 24 : 12) + 8;
            kortti.style.left = reuna;
            kortti.style.bottom = reuna;
            kortti.style.right = auki && !UiKerros.Tabletti ? reuna : StyleKeyword.Null;
            kortti.EnableInClassList("mk-kartuscha--tabletti", UiKerros.Tabletti);
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: kartuscha piiloon.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            Seuraa();
        }

        string TodellinenMaa()
        {
            var o = PeliOhjain.Instanssi;
            // Aloitus (portti, Lontoo-zoomi, valinta) ja aloituslento: pelaaja on pelissä jo kohdekaupungissa tai
            // taustalla on vanha matka, mutta kamera on Lontoossa — kartuscha ei kuulu kuvaan (KREIKKA Lontoossa,
            // Laitetestaaja 24.9. B7).
            if (Aloitusnakyma.AloitusAuki || (o != null && o.AloituslentoKaynnissa)) return null;
            if (sallittu && o != null && o.Kaytossa && o.Matka != null
                && (o.Tila == SilmukanTila.Kartta || o.Tila == SilmukanTila.Dialogi || o.Tila == SilmukanTila.Matkalla))
            {
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa) return UiSisalto.Kaupunki(s.Kaupunki)?.Maa;
            }
            return null;
        }

        void Seuraa()
        {
            string uusi = TodellinenMaa();
            // Testimaa (ui kartuscha ISO) raukeaa, kun pelaajan todellinen maa vaihtuu (matka, uusi peli): muuten
            // testin KREIKKA jäi kartalle Lontooseen ja lennolle (Laitetestaaja 24.9., 161fa35).
            if (testiIso != null && uusi != testinTodellinen) { testiIso = null; if (auki) Sulje(); }
            if (testiIso != null) uusi = testiIso;
            if (uusi == iso) return;
            // Maa vaihtui: auki jäänyt kortti ei siirry uuteen maahan auki.
            if (auki && testiIso == null) Sulje();
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
            valtiomuoto.text = vm != null ? vm.Replace(" v. 1873", "") : "";

            // Web: avattuna ei valtiomuotoriviä eikä "Nyt"-väliotsikkoa (display: none), vain rivit.
            valtiomuotoRivi.style.display = DisplayStyle.None;
            foreach (var vanha in tilastot.Query(className: "mk-kartuscha__rivi").ToList()) vanha.RemoveFromHierarchy();
            if (m.OnTiedot)
            {
                Tilasto("VÄKILUKU", m.Vakiluku, m.VakilukuSija);
                Tilasto("PINTA-ALA", m.PintaAla, m.PintaAlaSija);
                Tilasto("DEMOKRATIA", m.Demokratia != null ? m.Demokratia + " · V-Dem" : null, m.DemokratiaSija);
                Tilasto("KESKITULO", m.Keskitulo, m.KeskituloSija);
            }
            tilastot.style.display = m.OnTiedot || m.Tervehdykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;

            kielet.Clear();
            kielet.BringToFront(); // rivien jälkeen
            if (m.Tervehdykset.Count > 0)
            {
                Kirjasimet.Aseta(Rakenne.Teksti("KIELET", "mk-kartuscha__nimike", kielet), Kirjasin.Kone);
                var rivi = Rakenne.El("mk-kartuscha__tervehdykset", kielet, PickingMode.Ignore);
                foreach (var (teksti, kieli, lippuNimi, _) in m.Tervehdykset)
                {
                    var t = Rakenne.El("mk-tervehdys", rivi, PickingMode.Ignore);
                    Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-tervehdys__teksti", t), Kirjasin.LukuKursiivi);
                    if (!string.IsNullOrEmpty(lippuNimi))
                    {
                        var l = Rakenne.El("mk-tervehdys__lippu", t, PickingMode.Ignore);
                        Kuvat.Hae(lippuNimi, tex => { if (tex != null) { l.style.backgroundImage = new StyleBackground(tex); l.style.height = Mathf.Round(14f * tex.height / Mathf.Max(1, tex.width)); } }, "liput");
                    }
                    // Web: kielen nimi ja tarkenne erikseen ("turkki · Länsi-Traakia"), ei sulkeita.
                    string k = kieli ?? "", tarkenne = null;
                    int sulku = k.IndexOf('(');
                    if (sulku > 0) { tarkenne = k.Substring(sulku + 1).TrimEnd(')', ' '); k = k.Substring(0, sulku).Trim(); }
                    Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-tervehdys__kieli", t), Kirjasin.Kone);
                    if (!string.IsNullOrEmpty(tarkenne)) Kirjasimet.Aseta(Rakenne.Teksti("· " + tarkenne, "mk-tervehdys__tarkenne", t), Kirjasin.Kone);
                }
            }
            kielet.style.display = m.Tervehdykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;

            aiheet.Clear();
            foreach (var (id, aiheNimi) in m.Aiheet)
            {
                // Web .maapaneeli-aihe: versaalit, pisteviiva alla (rgba(74, 52, 33, .75)); aiheen väri vain valitulla.
                var b = Rakenne.Nappi(null, "mk-kartuscha__aihe", () => AvaaAihe(id), aiheet);
                Kirjasimet.Aseta(Rakenne.Teksti(aiheNimi.ToUpperInvariant(), "mk-nappi__teksti", b), Kirjasin.Kone);
                var viiva = new Pisteviiva();
                viiva.AddToClassList("mk-kartuscha__aiheviiva");
                b.Add(viiva);
            }
            aiheet.style.display = m.Aiheet.Count > 0 && m.Maalehti != null ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void Tilasto(string nimike, string arvo, string sija)
        {
            if (string.IsNullOrEmpty(arvo)) return;
            var r = Rakenne.El("mk-kartuscha__rivi", tilastot, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(nimike, "mk-kartuscha__nimike", r), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(arvo, "mk-kartuscha__arvo", r), Kirjasin.Kone);
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
            testinTodellinen = TodellinenMaa();
            UiSisalto.Lataa(() => { iso = null; Seuraa(); if (avaa) Avaa(); });
        }

        public void Vaihda() { if (auki) Sulje(); else Avaa(); }

        /// <summary>Avattu kortti (web body.infotaulu-auki): Liiku väistyy, pulu hyppää yläpuolelle.</summary>
        public event System.Action<bool> AukiMuuttui;

        /// <summary>Avattu kortti pulun väistöä varten (Pulu.Alareuna), muuten null.</summary>
        /// <summary>Näkyvä maakortti (kiinni tai auki) tai null: Liiku väistää sen yläreunan (Matkavalinta).</summary>
        public VisualElement NakyvaKortti =>
            sallittu && kortti.panel != null && kortti.resolvedStyle.display != DisplayStyle.None && kortti.worldBound.height > 0 ? kortti : null;

        public VisualElement AukiKortti => auki && kortti.resolvedStyle.display != DisplayStyle.None ? kortti : null;

        /// <summary>Web border-bottom: 1px dotted — UITK:ssa ei ole pisteviivareunaa, joten pisteet piirretään.</summary>
        sealed class Pisteviiva : VisualElement
        {
            public Pisteviiva()
            {
                pickingMode = PickingMode.Ignore;
                generateVisualContent += mgc =>
                {
                    var r = contentRect;
                    if (r.width <= 0) return;
                    var p = mgc.painter2D;
                    p.fillColor = resolvedStyle.color;
                    for (float x = r.xMin; x < r.xMax; x += 2f)
                    {
                        p.BeginPath();
                        p.MoveTo(new Vector2(x, r.yMin)); p.LineTo(new Vector2(x + 1f, r.yMin));
                        p.LineTo(new Vector2(x + 1f, r.yMin + 1f)); p.LineTo(new Vector2(x, r.yMin + 1f));
                        p.ClosePath(); p.Fill();
                    }
                };
            }
        }

        public void Avaa()
        {
            if (auki || iso == null) return;
            auki = true;
            kortti.AddToClassList("mk-auki");
            sisus.style.display = DisplayStyle.Flex;
            Asettele();
            AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!auki) return;
            auki = false;
            sijatAuki = false;
            tilastot.RemoveFromClassList("mk-sijat-auki");
            kortti.RemoveFromClassList("mk-auki");
            sisus.style.display = DisplayStyle.None;
            Asettele();
            AukiMuuttui?.Invoke(false);
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
