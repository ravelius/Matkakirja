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
// Elävä kartta (tutkimuspalkki, heränneet maakunnat, salaisuusrivi, lippu liehuu valmiissa maassa): Kartuscha.Muste.cs.
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Kartuscha
    {
        readonly UiKerros kerros;
        readonly VisualElement kortti, sisus, aiheet, tilastot, kielet, lippu, nimirivi;
        /// <summary>Löydös 144: aaltoileva lippu (Natiiviseppä, Liput.Aaltoile); null = staattinen kuva.</summary>
        Liput.Aalto aalto;
        readonly Button masto, radio;
        readonly Label nimi, alarivi, valtiomuoto;
        readonly VisualElement valtiomuotoRivi;
        /// <summary>Löydös 142: vertailupalkit (raita + täyte) riveittäin avausanimaatiota varten.</summary>
        readonly List<(VisualElement Raita, VisualElement Taytto)> vertailut = new List<(VisualElement, VisualElement)>();
        IVisualElementScheduledItem vertailuAjo;
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
            nimirivi = Rakenne.El("mk-kartuscha__nimirivi", masto, PickingMode.Ignore);
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
            // Elävä kartta (Kartuscha.Muste.cs): tutkimuspalkki, heränneet maakunnat ja salaisuusrivi.
            RakennaMuste();

            // Löydös 143: nimen rivitys muuttaa korkeutta ja radio ilmestyy asemahaun jälkeen → tasaus uusiksi.
            kortti.RegisterCallback<GeometryChangedEvent>(_ => TasaaNimirivi());
            nimi.RegisterCallback<GeometryChangedEvent>(_ => TasaaNimirivi());
            radio.RegisterCallback<GeometryChangedEvent>(_ => TasaaNimirivi());

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

        /// <summary>
        /// Löydös 143 (omistaja, build 16): pitkä maannimi (BOSNIA JA HERTSEGOVINA) rivittyy sanavälistä kahdelle
        /// riville, ja lippu sekä radio tasataan YLIMMÄN nimirivin keskelle (ei kaksirivisen lohkon keskelle).
        /// Avattuna nimi ei mene radion alle: nimirivin oikea täyte varaa radion kohdan (+ 6 pt väli).
        /// </summary>
        void TasaaNimirivi()
        {
            if (kortti.panel == null || kortti.resolvedStyle.display == DisplayStyle.None) return;
            float riviK = nimi.MeasureTextSize("Å", 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).y;
            if (float.IsNaN(riviK) || riviK <= 0) return;
            float nimiY = nimi.ChangeCoordinatesTo(kortti, Vector2.zero).y;
            if (SovitaNimi(riviK)) return; // pienennetty: uusi asettelu kutsuu tämän uudelleen

            float lippuK = lippu.layout.height; // 0 = lippu piilossa (kiinni), tasataan avattaessa
            if (lippuK > 0) Aseta(lippu.style.marginTop, v => lippu.style.marginTop = v, Mathf.Max(0f, (riviK - lippuK) / 2f));

            bool radioNakyy = auki && radio.resolvedStyle.display != DisplayStyle.None && radio.layout.height > 0;
            if (radioNakyy)
            {
                // Absoluuttinen top lasketaan reunan sisäpuolelta.
                float top = nimiY - kortti.resolvedStyle.borderTopWidth + (riviK - radio.layout.height) / 2f;
                Aseta(radio.style.top, v => radio.style.top = v, Mathf.Max(0f, top));
                float sisaOikea = kortti.worldBound.xMax - kortti.resolvedStyle.borderRightWidth - kortti.resolvedStyle.paddingRight;
                Aseta(nimirivi.style.paddingRight, v => nimirivi.style.paddingRight = v, Mathf.Max(0f, sisaOikea - radio.worldBound.xMin + 6f));
            }
            else if (nimirivi.style.paddingRight.keyword != StyleKeyword.Null)
                nimirivi.style.paddingRight = StyleKeyword.Null;
        }

        // Löydös 143b (Laitetestaaja build 17, iPad): BOSNIA JA HERTSEGOVINA rivittyi kolmelle riville. Enintään kaksi riviä:
        // fonttia ja harvennusta pienennetään 8 %:n askelin (enintään 25 %), kunnes nimi mahtuu; uusi maa palauttaa koon.
        const int NimenRivitMax = 2;
        const float NimenAskel = 0.92f, NimenMinimi = 0.75f;
        float nimenKerroin = 1f, nimenFontti, nimenHarvennus;

        void NollaaNimenSovitus()
        {
            nimenKerroin = 1f;
            nimi.style.fontSize = StyleKeyword.Null;
            nimi.style.letterSpacing = StyleKeyword.Null;
        }

        /// <summary>True, jos nimeä pienennettiin (kolme tai useampia rivejä riviK:n korkuisina).</summary>
        bool SovitaNimi(float riviK)
        {
            float h = nimi.layout.height, w = nimi.contentRect.width;
            if (float.IsNaN(h) || h <= 0f || float.IsNaN(w) || w <= 0f || nimenKerroin * NimenAskel < NimenMinimi) return false;
            // Myös pisin sana yksinään riville (muuten UITK katkaisee sanan: "HERTSEGOVIN / A", Laitetestaaja b17).
            float pisin = 0f;
            foreach (var sana in (nimi.text ?? "").Split(' '))
                if (sana.Length > 0) pisin = Mathf.Max(pisin, nimi.MeasureTextSize(sana, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x);
            if (h <= riviK * (NimenRivitMax + 0.5f) && pisin <= w + 0.5f) return false;
            if (nimenKerroin >= 1f) { nimenFontti = nimi.resolvedStyle.fontSize; nimenHarvennus = nimi.resolvedStyle.letterSpacing; }
            nimenKerroin *= NimenAskel;
            nimi.style.fontSize = nimenFontti * nimenKerroin;
            nimi.style.letterSpacing = nimenHarvennus * nimenKerroin;
            return true;
        }

        /// <summary>Asettaa pituuden vain, kun se muuttuu yli 0,5 pt (GeometryChanged ei jää kiertämään).</summary>
        static void Aseta(StyleLength nyt, System.Action<StyleLength> aseta, float arvo)
        {
            if (nyt.keyword == StyleKeyword.Undefined && Mathf.Abs(nyt.value.value - arvo) < 0.5f) return;
            aseta(arvo);
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
            KytkeMuste();
            OdottavaHeraaminen();
            if (aalto != null) aalto.Nakyy = Rakenne.Naytetaan(lippu) && lippu.resolvedStyle.width > 0f; // löydös 144
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
                Lipputanko.Pois();
                return;
            }
            Tayta(UiSisalto.Maa(iso));
            var mt = UiSisalto.Maa(iso);
            Mediarivi.AsetaRadionMaa(radio, iso, mt?.Nimi ?? iso);
            Asettele();
            kortti.style.display = DisplayStyle.Flex;
        }

        /// <summary>
        /// Löydös 161 (omistaja, build 21 -koe; tarkennus 11.4x, sitova): kohdemaan 3D-lipputanko (Natiivisepän
        /// Lipputanko) maan itäreunaan maalle, ei pääkaupunkiin. Paikka on Karttasepän ankkurista lippu_lonlat
        /// ({ISO3: [lon, lat]}, sisältöpaketissa <see cref="LippuAnkkuritPolku"/>); ilman ankkuria ei tankoa.
        /// Lippu on sama 1873-lipun tekstuuri kuin kartussissa.
        /// </summary>
        void AsetaLipputanko(MaaTiedot m, Texture lippu)
        {
            string maa = m.Iso3;
            UiKerros.Hae().StartCoroutine(LippuAnkkuri(maa, a =>
            {
                if (iso != maa) return;
                if (a.HasValue) Lipputanko.Aseta(maa, a.Value.Lat, a.Value.Lon, lippu);
                else Lipputanko.Pois();
            }));
        }

        /// <summary>Karttasepän lipputankoankkurit sisältöpaketissa (Siirtoseppä vie; polku vahvistetaan datan tullessa).</summary>
        public const string LippuAnkkuritPolku = "kartta/lippu_lonlat.json";
        static Dictionary<string, (double Lat, double Lon)> lippuAnkkurit;
        static bool lippuAnkkuritHaettu;

        static System.Collections.IEnumerator LippuAnkkuri(string maa, Action<(double Lat, double Lon)?> valmis)
        {
            if (!lippuAnkkuritHaettu)
            {
                lippuAnkkuritHaettu = true;
                string json = null;
                yield return LinssiSisalto.Hae(LippuAnkkuritPolku, t => json = t);
                var d = new Dictionary<string, (double, double)>();
                if (Matkakirja.Peli.MiniJson.Jasenna(json ?? "") is Dictionary<string, object> o)
                    foreach (var kv in o)
                        if (kv.Value is List<object> p && p.Count >= 2 && p[0] is double lon && p[1] is double lat) d[kv.Key] = (lat, lon);
                lippuAnkkurit = d;
                if (d.Count == 0) Debug.Log("MATKAKIRJA ui lipputanko: ankkureita ei ole (" + LippuAnkkuritPolku + "), tanko piilossa");
            }
            while (lippuAnkkurit == null) yield return null;
            valmis(lippuAnkkurit.TryGetValue(maa, out var a) ? a : ((double, double)?)null);
        }

        void Tayta(MaaTiedot m)
        {
            nimi.text = (m.Nimi ?? m.Iso3).ToUpperInvariant();
            NollaaNimenSovitus();
            string vm = m.Valtiomuoto;
            alarivi.text = string.IsNullOrEmpty(m.Paikallinen) && string.IsNullOrEmpty(vm) ? ""
                : (m.Paikallinen ?? m.Nimi) + (string.IsNullOrEmpty(vm) ? "" : " · " + vm);
            alarivi.style.display = alarivi.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;

            lippu.style.backgroundImage = StyleKeyword.None;
            VapautaAalto();
            lippuKuva = null;
            lippuLiehuu = false;
            if (m.Lippu.Count > 0)
                Kuvat.Hae(m.Lippu[0], t =>
                {
                    if (t == null || iso != m.Iso3) return;
                    float lw = 18f * t.width / Mathf.Max(1, t.height);
                    lippu.style.width = lw;
                    // Elävä kartta: lippu liehuu vasta, kun maan kaikki maakunnat on löydetty (Kartuscha.Muste.cs PaivitaLippu).
                    lippuKuva = t;
                    lippuLeveys = lw;
                    PaivitaLippu();
                    AsetaLipputanko(m, t);
                }, "liput");
            else Lipputanko.Pois();

            // Valtiomuoto 1873 ilman "v. 1873" -päätettä (webin valtiomuoto1873).
            valtiomuoto.text = vm != null ? vm.Replace(" v. 1873", "") : "";

            // Web: avattuna ei valtiomuotoriviä eikä "Nyt"-väliotsikkoa (display: none), vain rivit.
            valtiomuotoRivi.style.display = DisplayStyle.None;
            foreach (var vanha in tilastot.Query(className: "mk-kartuscha__rivi").ToList()) vanha.RemoveFromHierarchy();
            vertailut.Clear();
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
            PaivitaMuste();
        }

        void Tilasto(string nimike, string arvo, string sija)
        {
            if (string.IsNullOrEmpty(arvo)) return;
            var r = Rakenne.El("mk-kartuscha__rivi", tilastot, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(nimike, "mk-kartuscha__nimike", r), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(arvo, "mk-kartuscha__arvo", r), Kirjasin.Kone);
            if (!string.IsNullOrEmpty(sija)) Rakenne.Teksti(sija, "mk-kartuscha__sija", r);
            // Löydös 142 (omistaja, build 16): vertailutieto lukujen perään palkkina. Sija "23./195" → osuus
            // 1 − (23 − 1) / (195 − 1): ykkössija (suurin väkiluku/pinta-ala, demokraattisin, suurin tulo) = täysi palkki.
            // Raita on kiinteän levyinen, joten palkit ovat keskenään vertailukelpoisia; tarkka sija napautuksesta kuten ennen.
            float? osuus = SijaOsuus(sija);
            if (osuus == null) return;
            var raita = Rakenne.El("mk-kartuscha__vertailu", r, PickingMode.Ignore);
            var viiva = new Pisteviiva();
            viiva.AddToClassList("mk-kartuscha__vertailuraita");
            raita.Add(viiva);
            var taytto = Rakenne.El("mk-kartuscha__vertailupalkki", raita, PickingMode.Ignore);
            taytto.style.width = Length.Percent(Mathf.Max(0.04f, osuus.Value) * 100f);
            taytto.style.transformOrigin = new TransformOrigin(0, Length.Percent(50));
            vertailut.Add((raita, taytto));
        }

        /// <summary>"23./195" → 0..1 (1 = ykkössija), muuten null.</summary>
        static float? SijaOsuus(string sija)
        {
            if (string.IsNullOrEmpty(sija)) return null;
            int kautta = sija.IndexOf('/');
            if (kautta < 0) return null;
            if (!int.TryParse(sija.Substring(0, kautta).Trim().TrimEnd('.'), out int n)) return null;
            if (!int.TryParse(sija.Substring(kautta + 1).Trim(), out int kaikki) || kaikki < 2 || n < 1) return null;
            return Mathf.Clamp01(1f - (n - 1f) / (kaikki - 1f));
        }

        // Löydös 142: avausanimaatio. Palkit kasvavat nollasta arvoonsa riveittäin porrastettuna: kortti ehtii ensin
        // näkyviin (viive 120 ms), sitten rivi kerrallaan 80 ms:n välein, kukin 480 ms kuutiollisella ease-in-outilla
        // → neljä riviä valmiina 0,84 s:ssa. Kasvu scale-muunnoksella (ei asettelua joka ruudussa → ei nykimistä).
        const float VertailuViive = 0.12f, VertailuPorras = 0.08f, VertailuKesto = 0.48f;

        static float EaseInOut(float t) => t < 0.5f ? 4f * t * t * t : 1f - Mathf.Pow(-2f * t + 2f, 3f) / 2f;

        /// <summary>Rivin i palkki vaiheeseen 0..1; raita häivyttyy esiin palkkia nopeammin (valmis 40 %:ssa).</summary>
        void AsetaVertailu(int i, float vaihe)
        {
            var (raita, taytto) = vertailut[i];
            raita.style.opacity = Mathf.Clamp01(vaihe * 2.5f);
            taytto.style.scale = new Scale(new Vector3(vaihe, 1f, 1f));
        }

        void AnimoiVertailut()
        {
            vertailuAjo?.Pause();
            vertailuAjo = null;
            // Vähennetty liike: palkit suoraan valmiina.
            if (vertailut.Count == 0 || LinssiUi.VahennettyLiike())
            {
                for (int i = 0; i < vertailut.Count; i++) AsetaVertailu(i, 1f);
                return;
            }
            for (int i = 0; i < vertailut.Count; i++) AsetaVertailu(i, 0f);
            float alku = Time.unscaledTime;
            float loppu = VertailuViive + (vertailut.Count - 1) * VertailuPorras + VertailuKesto;
            vertailuAjo = kortti.schedule.Execute(() =>
            {
                // Ei pyöritä piilossa (linssi, kartta pois, kortti kiinni): palkit valmiiksi ja ajo seis.
                float t = Time.unscaledTime - alku;
                bool valmis = t >= loppu || !auki || !Rakenne.Naytetaan(kortti);
                if (!valmis) Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                for (int i = 0; i < vertailut.Count; i++)
                    AsetaVertailu(i, valmis ? 1f : EaseInOut(Mathf.Clamp01((t - VertailuViive - i * VertailuPorras) / VertailuKesto)));
                if (valmis) { vertailuAjo?.Pause(); vertailuAjo = null; }
            }).Every(16);
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
            AnimoiVertailut();
            JatkaHeraamista(250); // Elävä kartta: odottava maakunnan herätys, kun kortti on ehtinyt näkyviin
            if (aalto != null) kortti.schedule.Execute(() => { if (aalto != null) aalto.Nakyy = Rakenne.Naytetaan(lippu); }); // löydös 144
            NollaaNimenSovitus(); // löydös 143b: avatun koko eri, sovitus uudelleen
            AukiMuuttui?.Invoke(true);
        }

        /// <summary>
        /// Löydös 144 (omistaja: liput aaltoilemaan arvokkaasti kuin tuulessa): lippu Natiivisepän aaltovarjostimen
        /// RenderTextureen (Liput.Aaltoile, pikseleinä UI-koko × paneelin skaala). RT:n reunoilla on Liput.Reuna-marginaali
        /// (lippu 92 %), joten elementti skaalataan 1 / 0,92:lla (scale ei muuta asettelua, TasaaNimirivi ennallaan).
        /// Aalto piirtyy vain, kun lippu näkyy (Seuraa: Nakyy); ilman aaltoa staattinen kuva kuten ennen.
        /// </summary>
        void AsetaLippu(Texture2D t, float leveys, float korkeus)
        {
            float k = 1f / (1f - 2f * Liput.Reuna), px = Mathf.Max(1f, UiKerros.PikseliaPisteessa);
            aalto = Liput.Aaltoile(t, Mathf.CeilToInt(leveys * k * px), Mathf.CeilToInt(korkeus * k * px));
            if (aalto?.Kuva == null) { VapautaAalto(); lippu.style.backgroundImage = new StyleBackground(t); return; }
            aalto.Paivittyi += lippu.MarkDirtyRepaint;
            aalto.Nakyy = Rakenne.Naytetaan(lippu);
            lippu.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(aalto.Kuva));
            lippu.style.scale = new Scale(new Vector2(k, k));
            lippu.style.borderTopWidth = lippu.style.borderBottomWidth = lippu.style.borderLeftWidth = lippu.style.borderRightWidth = 0f; // aaltoileva lippu ilman jäykkää kehystä
        }

        void VapautaAalto()
        {
            if (aalto == null) return;
            aalto.Paivittyi -= lippu.MarkDirtyRepaint;
            Liput.Vapauta(aalto);
            aalto = null;
            lippu.style.scale = StyleKeyword.Null;
            lippu.style.borderTopWidth = lippu.style.borderBottomWidth = lippu.style.borderLeftWidth = lippu.style.borderRightWidth = StyleKeyword.Null;
        }

        public void Sulje()
        {
            if (!auki) return;
            auki = false;
            if (aalto != null) aalto.Nakyy = false; // löydös 144: ei aaltoa kiinni
            NollaaNimenSovitus(); // löydös 143b
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
