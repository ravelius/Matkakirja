// KAUPUNGIN AVAUSKORTTI (Natiivi-UI; omistaja 27.9.2026 klo 23.4x, web v2296 js/kaupunkinosto.js avaaAvauskortti ja
// css/kaupunkinosto.css .kaupunkipopup-avaus): kaupungin napautus avaa kortin, joka korvaa kaupunkiliuskan
// (KaupunkiKortti.cs jää testikomennoille, kuten webin KAUPUNKILIUSKA = false). Kolme osaa päällekkäin:
//
//   ┌──────────────────────────────┐
//   │ [herokuva 16 % ruudusta]   × │  avauskuva tai kansikuva (cover), nimi vasemmassa alakulmassa varjolla
//   │ Pariisi                      │
//   │ Kaksi ensimmäistä lausetta   │  esittely (kaupungin intro), enintään 3 riviä (iPad 4) ja "…"
//   │ Lue kaupunkilehti →          │
//   │ ┌──────────────────────────┐ │  nähtävyyskartta ilman tekstejä, kaista 35 % ruudun korkeudesta; napautus →
//   │ │ kartta                   │ │  suurennos lähes koko ruudulle (Kohdekartan.AvaaKokoruutu kortista)
//   │ └──────────────────────────┘ │
//   │ [kuva] TURISTI-INFO          │  oppaan otsikko ja kaksi lausetta → turistiopas
//   │        Matkailijan Pariisi   │
//   └──────────────────────────────┘
//
// Mitat webistä (rem = 16 pt): leveys min(560, ruutu − 24), 8 pt yläpalkin alla, keskellä, kulma 16; hero 16 % ruudun
// korkeudesta (vähintään 120, iPad 14 %), nimi 30,4 Luku lihava #fff8ec; esittely 10,4/14,4/8, teksti 15,5 riviväli
// 1,42; lehtilinkki Kone 14,4 #b03a2b alleviivattuna; kartan kaista reunus rgba(122,85,20,.35) kulma 8; turisti-info
// pohja #efe1c2 kulma 8, kuva 84 × 84 kulma 6, laji Kone lihava 11,5 #8a6114, otsikko 15,5 lihava, teksti 13,8.
// Sulku ×: 33,6 pt ympyrä rgba(245,240,226,.92). Kortti kasvaa kutsuminiatyyristä 280 ms (web AVAUSKORTIN_KASVU_MS,
// cubic-bezier(0.2, 0.7, 0.2, 1)) ja palaa sinne suljettaessa (0.4, 0, 0.6, 1); ilman kutsua 200 ms häivytys.
// Vähennetty liike: ei liikettä. Ohi-napautus sulkee (web kuunteleSulkevaNapautus).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Avauskortti : IKaupunkiKortti
    {
        /// <summary>Web AVAUSKORTIN_KASVU_MS (omistaja: 250–300 ms, pehmeä, ei pop-up).</summary>
        public const float KasvuMs = 280f;
        float maksimi;
        const float Leveyskatto = 560f, Sivuvara = 12f, Ylavara = 8f, Alavara = 8f;
        const float HeroOsuus = 0.16f, HeroOsuusTabletti = 0.14f, HeroVahintaan = 120f, KarttaOsuus = 0.35f;
        const float HaivytysMs = 200f;
        /// <summary>Web LEHDEN_VAKIOESITTELY.</summary>
        const string Vakioesittely = "Isoisä on merkinnyt tämän paikan karttaansa.";
        const string RiviVali = "<line-height=1.42em>";

        readonly UiKerros kerros;
        readonly VisualElement alue, kortti, hero, heroKuva, esittely, karttaKaista, oppaanRivi, oppaanKuva;
        readonly ScrollView vieritys;
        readonly Label nimiLappu, teksti, oppaanOtsikko, oppaanTeksti;
        readonly Button lehtiNappi;
        KohdekarttaNakyma kartta;
        KaupunkiToiminnot toiminnot;
        string kaupunki, nimi, esittelyTeksti;
        OpasArtikkeli opas;

        // Kasvu kutsuminiatyyristä (web kutsunMuunnos, FLIP): lahde = miniatyyrin paneelilaatikko, NaN = ei liikettä.
        Rect? lahde;
        float liikeAlku = float.NaN;
        bool sulkeutuu;
        Action sulkuValmis;

        public bool Auki { get; private set; }
        /// <summary>Kortti ruudulla (myös sulkuliikkeen ajan): kutsuminiatyyri pysyy piilossa.</summary>
        public bool Nakyvissa => alue.style.display == DisplayStyle.Flex;
        /// <summary>Seuraavan avauksen lähde (kutsuminiatyyrin laatikko); Nayta käyttää ja tyhjentää sen.</summary>
        public Rect? SeuraavaLahde;
        /// <summary>Kortti ei ole alareunan paneeli: pulu ja Liiku eivät väistä sitä.</summary>
        public VisualElement Alue => null;
        public string Kaupunki => Auki ? kaupunki : null;
        /// <summary>Kortin paneelilaatikko (kutsuminiatyyri ja testit); tyhjä, kun kiinni.</summary>
        public Rect Laatikko => Auki ? kortti.worldBound : default;
        /// <summary>Kortti sulkeutui (kutsuminiatyyri tulee takaisin näkyviin).</summary>
        public event Action Suljettu;

        public Avauskortti(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Matkavalinta);
            alue = Rakenne.El("mk-avauskortti-alue", juuri, PickingMode.Ignore);
            alue.style.display = DisplayStyle.None;
            kortti = Rakenne.El("mk-avauskortti", alue);
            kortti.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(50));

            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-avauskortti__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(vieritys);
            var sisalto = vieritys.contentContainer;

            // 1. Herokuva, nimi ja esittely.
            hero = Rakenne.El("mk-avauskortti__hero", sisalto, PickingMode.Ignore);
            heroKuva = Rakenne.El("mk-avauskortti__herokuva", hero, PickingMode.Ignore);
            nimiLappu = Rakenne.Teksti("", "mk-avauskortti__nimi", hero);
            Kirjasimet.Aseta(nimiLappu, Kirjasin.LukuLihava);
            esittely = Rakenne.El("mk-avauskortti__esittely", sisalto, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-avauskortti__teksti", esittely);
            teksti.enableRichText = true;
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            teksti.RegisterCallback<GeometryChangedEvent>(_ => RajaaTeksti());
            lehtiNappi = Rakenne.Nappi("Lue kaupunkilehti →", "mk-avauskortti__lehti", LueLehti, esittely);
            Kirjasimet.Aseta(lehtiNappi, Kirjasin.Kone);

            // 2. Nähtävyyskartta ilman tekstejä.
            karttaKaista = Rakenne.El("mk-avauskortti__kartta", sisalto);
            karttaKaista.style.display = DisplayStyle.None;

            // 3. Turisti-info.
            oppaanRivi = Rakenne.Nappi(null, "mk-avauskortti__opas", AvaaOpas, sisalto);
            oppaanKuva = Rakenne.El("mk-avauskortti__opaskuva", oppaanRivi, PickingMode.Ignore);
            var tekstit = Rakenne.El("mk-avauskortti__opastekstit", oppaanRivi, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("TURISTI-INFO", "mk-avauskortti__oppaanlaji", tekstit), Kirjasin.KoneLihava);
            oppaanOtsikko = Rakenne.Teksti("", "mk-avauskortti__oppaanotsikko", tekstit);
            Kirjasimet.Aseta(oppaanOtsikko, Kirjasin.LukuLihava);
            oppaanTeksti = Rakenne.Teksti("", "mk-avauskortti__oppaanteksti", tekstit);
            // Web .kaupunkipopup-sisalto padding-bottom 0,85rem: oma loppuelementti, koska ScrollView ei laske
            // contentContainerin paddingia korkeuteensa (kortti jäi 13,6 pt lyhyeksi ja turisti-info leikkautui).
            Rakenne.El("mk-avauskortti__loppu", sisalto, PickingMode.Ignore);
            Kirjasimet.Aseta(oppaanTeksti, Kirjasin.Luku);
            oppaanRivi.style.display = DisplayStyle.None;

            var sulku = Rakenne.Nappi("×", "mk-avauskortti__sulku", () => Sulje(), kortti);
            sulku.tooltip = "Sulje";
            Kirjasimet.Aseta(sulku, Kirjasin.Luku);

            alue.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kerros.JokaRuutu += Animoi;
            kerros.JokaRuutu += TarkistaOhiNapautus;
            // Kylmäkäynnistys: lehdet (avauskuvat, Lehti-lippu) saapuvat myöhemmin → hero ja lehtilinkki uudelleen.
            UiSisalto.LehdetSaapuivat += () =>
            {
                if (!Auki) return;
                var k = UiSisalto.Kaupunki(kaupunki);
                TaytaHero(k);
                PaivitaLehtilinkki(k);
            };
        }

        // --- mitoitus -----------------------------------------------------------------------------

        void Mitoita()
        {
            float W = alue.layout.width, H = alue.layout.height;
            if (float.IsNaN(W) || W <= 0 || H <= 0) return;
            var t = kerros.Reunat(UiKerros.Matkavalinta);
            float leveys = Mathf.Round(Mathf.Min(Leveyskatto, W - t.x - t.z - 2 * Sivuvara));
            float yla = Mathf.Round(t.y + Ylapalkki.Varaus + Ylavara);
            kortti.style.width = leveys;
            kortti.style.left = Mathf.Round((W - leveys) / 2f);
            kortti.style.top = yla;
            // Web max-height calc(100 % − 16 px) kartta-alasta: alaraja on turva-alue, ei toimintorivin varaus.
            // Saman kerroksen turva-alue kuin yläreunalla (Traileri-kerroksen alareuna oli iPhonella ~124 pt, 34:n sijaan,
            // jolloin turisti-infon alapehmuste jäi vierityksen taakse).
            maksimi = Mathf.Max(200f, H - yla - t.w - Alavara);
            kortti.style.maxHeight = maksimi;
            // Web svh-yksiköt: osuus koko ruudun korkeudesta.
            hero.style.height = Mathf.Round(Mathf.Max(HeroVahintaan, H * (UiKerros.Tabletti ? HeroOsuusTabletti : HeroOsuus)));
            karttaKaista.style.height = Mathf.Round(H * KarttaOsuus);
        }

        // --- avaus ja sulku ------------------------------------------------------------------------

        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t)
        {
            var l = SeuraavaLahde;
            SeuraavaLahde = null;
            Nayta(kaupunkiId, nimi, t, l);
        }

        /// <summary>Avaa kortin; lahde = kutsuminiatyyrin paneelilaatikko, josta kortti kasvaa (null = häivytys).</summary>
        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t, Rect? lahde)
        {
            UiSisalto.LataaLehti(kaupunkiId);
            bool sama = Auki && !sulkeutuu && kaupunki == kaupunkiId;
            kaupunki = kaupunkiId;
            this.nimi = nimi ?? kaupunkiId ?? "";
            toiminnot = t ?? new KaupunkiToiminnot();
            sulkeutuu = false;
            sulkuValmis = null;
            if (!sama)
            {
                opas = null;
                esittelyTeksti = null;
                nimiLappu.text = this.nimi;
                heroKuva.style.backgroundImage = StyleKeyword.None;
                heroKuva.style.opacity = 0f;
                heroKuva.userData = null; // muuten sama kuva ei latautuisi uudelleen (TaytaHero vertaa userDataa)
                teksti.text = "";
                oppaanRivi.style.display = DisplayStyle.None;
                karttaKaista.Clear();
                karttaKaista.style.display = DisplayStyle.None;
                kartta = null;
                vieritys.scrollOffset = Vector2.zero;
                lehtiNappi.style.display = toiminnot.LueLehti != null ? DisplayStyle.Flex : DisplayStyle.None;
            }
            bool liike = !LinssiUi.VahennettyLiike();
            this.lahde = liike ? lahde : null;
            liikeAlku = liike ? -1f : float.NaN;
            kortti.style.opacity = liike ? 0f : 1f;
            Auki = true;
            alue.style.display = DisplayStyle.Flex;
            Ruudunpaivitys.Herata(0.4f);
            if (sama) return;
            UiSisalto.Lataa(() => { if (Auki && kaupunki == kaupunkiId) Tayta(UiSisalto.Kaupunki(kaupunkiId)); });
        }

        /// <summary>Piilottaa kortin kutsumatta Sulje-toimintoa (kutsuja siirtyy muualle).</summary>
        public void Piilota()
        {
            if (!Auki) return;
            Auki = false;
            if (Kohdekartan.KortistaAuki) Kohdekartan.Sulje();
            bool liike = !LinssiUi.VahennettyLiike();
            if (!liike) { Loppu(); return; }
            // Sama liike takaperin miniatyyrin paikalle (tai häivytys), sitten piiloon.
            sulkeutuu = true;
            liikeAlku = -1f;
            sulkuValmis = Loppu;
            Ruudunpaivitys.Herata(0.4f);
        }

        void Loppu()
        {
            sulkeutuu = false;
            sulkuValmis = null;
            liikeAlku = float.NaN;
            alue.style.display = DisplayStyle.None;
            kortti.style.scale = StyleKeyword.Null;
            kortti.style.translate = StyleKeyword.Null;
            kortti.style.opacity = StyleKeyword.Null;
            karttaKaista.Clear();
            kartta = null;
            Suljettu?.Invoke();
        }

        /// <summary>Sulku (×, ohi-napautus): piilottaa ja kertoo kutsujalle.</summary>
        public void Sulje()
        {
            if (!Auki) return;
            var s = toiminnot?.Sulje;
            Piilota();
            s?.Invoke();
        }

        // --- liike (web avaaAvauskortti / suljeKaupunkipopup) -----------------------------------------

        static float Kasvu(float x)
        {
            // cubic-bezier(0.2, 0.7, 0.2, 1) ≈ nopea alku, pehmeä loppu.
            x = Mathf.Clamp01(x);
            float y = 1f - x;
            return 1f - y * y * y * y;
        }

        static float Paluu(float x)
        {
            // cubic-bezier(0.4, 0, 0.6, 1): ease-in-out.
            x = Mathf.Clamp01(x);
            return x * x * (3f - 2f * x);
        }

        void Animoi()
        {
            if (float.IsNaN(liikeAlku) || alue.style.display == DisplayStyle.None) return;
            float nyt = Time.unscaledTime * 1000f;
            if (liikeAlku < 0f) liikeAlku = nyt;
            float kesto = lahde.HasValue ? KasvuMs : HaivytysMs;
            float s = (nyt - liikeAlku) / kesto;
            float e = sulkeutuu ? 1f - Paluu(s) : Kasvu(s);
            var k = kortti.layout;
            if (lahde is Rect m && k.width > 0 && m.width > 0)
            {
                // Web kutsunMuunnos: kortti miniatyyrin kokoiseksi sen keskelle, opacity 0,35 → 1.
                var kw = kortti.worldBound;
                float skaala = m.width / kw.width;
                var d = m.center - kw.center;
                float sk = Mathf.Lerp(skaala, 1f, e);
                kortti.style.scale = new Scale(new Vector3(sk, sk, 1f));
                kortti.style.translate = new Translate(d.x * (1f - e), d.y * (1f - e));
                kortti.style.opacity = Mathf.Lerp(0.35f, 1f, e);
            }
            else
            {
                kortti.style.opacity = e;
                kortti.style.translate = new Translate(0, (1f - e) * 8f);
            }
            Ruudunpaivitys.Herata(0.1f);
            if (s < 1f) return;
            if (sulkeutuu) { sulkuValmis?.Invoke(); return; }
            liikeAlku = float.NaN;
            kortti.style.scale = StyleKeyword.Null;
            kortti.style.translate = StyleKeyword.Null;
            kortti.style.opacity = 1f;
        }

        // Web kuunteleSulkevaNapautus: napautus kortin ohi (liike < 6 px, < 700 ms) sulkee; veto ei.
        Vector2 ohiAlku;
        float ohiAika = -1f;

        void TarkistaOhiNapautus()
        {
            if (!Auki || sulkeutuu || Kohdekartan.Auki) { ohiAika = -1f; return; }
            var osoitin = UnityEngine.InputSystem.Pointer.current;
            if (osoitin == null || alue.panel == null) return;
            var r = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(alue.panel, new Vector2(r.x, Screen.height - r.y));
            if (osoitin.press.wasPressedThisFrame)
            {
                ohiAika = kortti.worldBound.Contains(p) ? -1f : Time.unscaledTime;
                ohiAlku = p;
            }
            if (!osoitin.press.wasReleasedThisFrame || ohiAika < 0f) return;
            bool napautus = (p - ohiAlku).magnitude < 6f && Time.unscaledTime - ohiAika < 0.7f;
            ohiAika = -1f;
            if (!napautus) return;
            string k = kaupunki;
            alue.schedule.Execute(() => { if (Auki && kaupunki == k) Sulje(); }).StartingIn(50);
        }

        // --- sisältö -----------------------------------------------------------------------------

        void Tayta(KaupunkiTiedot k)
        {
            if (k == null) return;
            if (string.IsNullOrEmpty(nimi) || nimi == k.Id) { nimi = k.Nimi ?? k.Id; nimiLappu.text = nimi; }
            TaytaHero(k);
            esittelyTeksti = Lauseet(k.Intro, 2);
            if (string.IsNullOrEmpty(esittelyTeksti)) esittelyTeksti = Vakioesittely;
            teksti.text = RiviVali + esittelyTeksti;
            RajaaTeksti();
            PaivitaLehtilinkki(k);
            string id = k.Id;
            Kohdekartat.Hae(id, kk =>
            {
                if (kk == null || !Auki || kaupunki != id) return;
                kartta = new KohdekarttaNakyma(kk, pelkka: true);
                kartta.KokoruutuPyydetty += () =>
                {
                    Aanet.PulunTehoste("paper");
                    Kohdekartan.AvaaKokoruutu(kk, kohde => UiNakymat.Hae()?.Nahtavyydet.AvaaKohde(kk, kohde), kortista: true);
                };
                karttaKaista.Clear();
                karttaKaista.Add(kartta);
                karttaKaista.style.display = DisplayStyle.Flex;
            });
            LehtiSisalto.HaeOpas(id, o =>
            {
                if (o == null || !Auki || kaupunki != id) return;
                opas = o;
                oppaanOtsikko.text = o.Nimi ?? "TURISTI-INFO";
                oppaanTeksti.text = Lauseet(o.Teksti, 2);
                oppaanRivi.style.display = DisplayStyle.Flex;
                oppaanKuva.style.display = DisplayStyle.None;
                var kuva = LehtiSisalto.OppaanKuva(id);
                if (kuva?.Lahde != null)
                    Kuvat.Hae(kuva.Lahde, tex =>
                    {
                        if (tex == null || !Auki || kaupunki != id) return;
                        oppaanKuva.style.backgroundImage = new StyleBackground(tex);
                        oppaanKuva.style.display = DisplayStyle.Flex;
                    });
            });
        }

        /// <summary>Web: linkki aina, kun lehden avaus on tarjolla (ui.avaaTutkinta); kaupungin Lehti-lippu latautuu
        /// kaupunkikohtaisesti myöhässä (UiSisalto.LataaLehti), joten sitä ei odoteta.</summary>
        void PaivitaLehtilinkki(KaupunkiTiedot k) =>
            lehtiNappi.style.display = toiminnot?.LueLehti != null ? DisplayStyle.Flex : DisplayStyle.None;

        /// <summary>Web avauskortinHero: avauskuvista ensimmäinen, muuten kansikuvista (ei julistetta).</summary>
        void TaytaHero(KaupunkiTiedot k)
        {
            if (k == null) return;
            var teos = k.Avauskuvat.Count > 0 ? k.Avauskuvat[0] : k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            string tiedosto = teos?.Tiedosto;
            if (tiedosto == null || Equals(heroKuva.userData, tiedosto)) return;
            heroKuva.userData = tiedosto;
            string id = k.Id;
            Kuvat.Hae(tiedosto, tex =>
            {
                if (tex == null || !Auki || kaupunki != id || !Equals(heroKuva.userData, tiedosto)) return;
                heroKuva.style.backgroundImage = new StyleBackground(tex);
                heroKuva.style.opacity = 1f;
            });
        }

        /// <summary>Herokuvan tiedosto kutsuminiatyyrille (web avauskortinHeroOsoite), tai null.</summary>
        public static string HeroTiedosto(KaupunkiTiedot k)
        {
            if (k == null) return null;
            var teos = k.Avauskuvat.Count > 0 ? k.Avauskuvat[0] : k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            return teos?.Tiedosto;
        }

        /// <summary>Web avauskortinLauseet: n ensimmäistä lausetta ilman lihavointimerkkejä.</summary>
        public static string Lauseet(string teksti, int n)
        {
            string puhdas = Regex.Replace((teksti ?? "").Replace("**", ""), @"\s+", " ").Trim();
            if (puhdas.Length == 0) return "";
            var osumat = Regex.Matches(puhdas, @"[^.!?]+[.!?]+(?=\s|$)");
            if (osumat.Count == 0) return puhdas;
            return string.Join(" ", osumat.Cast<Match>().Take(n).Select(m => m.Value.Trim())).Trim();
        }

        /// <summary>Web -webkit-line-clamp 3 (iPad 4): teksti katkaistaan riveihin ja loppuun "…".</summary>
        void RajaaTeksti()
        {
            string koko = esittelyTeksti;
            float w = teksti.contentRect.width;
            if (string.IsNullOrEmpty(koko) || float.IsNaN(w) || w <= 0) return;
            int rivit = UiKerros.Tabletti ? 4 : 3;
            float Korkeus(string s) => teksti.MeasureTextSize(RiviVali + s, w, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y;
            // Raja n rivin todellisesta korkeudesta (rivivälitagi ei koske ensimmäistä riviä: "Ag" × n jäi rivin vajaaksi).
            float raja = Korkeus(string.Join("\n", Enumerable.Repeat("Ag", rivit))) + 1f;
            string tulos = koko;
            if (Korkeus(koko) > raja)
            {
                int ala = 0, yla = koko.Length;
                while (ala < yla)
                {
                    int keski = (ala + yla + 1) / 2;
                    if (Korkeus(koko.Substring(0, keski).TrimEnd() + "…") <= raja) ala = keski;
                    else yla = keski - 1;
                }
                tulos = koko.Substring(0, ala).TrimEnd() + "…";
            }
            string uusi = RiviVali + tulos;
            if (teksti.text != uusi) teksti.text = uusi;
        }

        void LueLehti()
        {
            if (!Auki) return;
            var a = toiminnot?.LueLehti;
            Piilota();
            a?.Invoke();
        }

        void AvaaOpas()
        {
            if (!Auki || opas == null) return;
            var o = opas;
            Aanet.PulunTehoste("paper");
            Piilota();
            UiNakymat.Hae()?.Nahtavyydet.AvaaOpas(o);
        }

        // --- testikomento (ui avauskortti …) --------------------------------------------------------

        /// <summary>Tila lokiriville: nimi, esittely, kartta ja turisti-info.</summary>
        public string Kuvaus() => !Auki ? "kiinni"
            : $"{nimi}: \"{esittelyTeksti}\" · kartta {(kartta != null ? "on" : "ei")} · turisti-info {(opas != null ? opas.Nimi : "ei")}"
              + $" · kortti {kortti.layout.height:0.#}/{maksimi:0.#} pt (ruutu {alue.layout.height:0.#}, turva ala {kerros.Reunat(UiKerros.Matkavalinta).w:0.#})";

        /// <summary>Napauttaa korttia: "kartta" (suurennos), "lehti", "opas" tai "sulje".</summary>
        public string Napauta(string mita)
        {
            if (!Auki) return "avauskortti ei ole auki";
            switch (mita)
            {
                case "kartta":
                    if (kartta == null) return "kaupungilla ei ole nähtävyyskarttaa";
                    Kohdekartan.AvaaKokoruutu(kartta.Kartta, kohde => UiNakymat.Hae()?.Nahtavyydet.AvaaKohde(kartta.Kartta, kohde), kortista: true);
                    return null;
                case "lehti": if (toiminnot?.LueLehti == null) return "ei lehteä"; LueLehti(); return null;
                case "opas": if (opas == null) return "ei turisti-infoa"; AvaaOpas(); return null;
                case "sulje": Sulje(); return null;
                default: return "ui avauskortti <id> [kartta | lehti | opas | sulje]";
            }
        }
    }
}
