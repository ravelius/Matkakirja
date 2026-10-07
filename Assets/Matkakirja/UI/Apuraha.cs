// APURAHAN ARVIOIJALLE (Pelikoodari 30.9.2026, omistajan pyyntö; web js/apuraha.js + ui.js naytaApuraha).
//
// Portin napin (Jatka matkaa / Uusi matka / Aloita seikkailu) alla kevyt nappi "Apurahahakemus – katso tämä ensin",
// joka avaa esittelykortin: otsikko, kursiivinen alaotsikko, kappaleet (väliotsikko, teksti, numeroitu lista,
// linkki) ja viiden kuvan rivi. Kuva avautuu kokoruutuun (reunat selaavat, muu napautus sulkee).
// Kappaleen ja listarivin webTeksti on selaimen versio; natiivi näyttää teksti-kentän.
// Sisältö on YHDESSÄ tiedostossa webin repossa (assets/apuraha/esittely.json), jonka Päätoimittaja päivittää:
// natiivi hakee sen sivustolta joka käynnistyksessä, joten tekstimuutos ei vaadi TF-buildia. Viimeisin onnistunut
// haku säilyy laitteella (offline-käynnistys näyttää sen); jos haku ei ole koskaan onnistunut, nappia ei ole.
// Ei videota (omistaja 30.9.2026 klo 15.06); kuvarivin pikkukuvien leveys kuvien määrän mukaan (4: kartta + 3 linssiä).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Apuraha
    {
        public const string Sivusto = "https://matkakirja.app/";
        public const string Osoite = Sivusto + "assets/apuraha/esittely.json";
        const string Muisti = "matkakirja-apuraha-esittely";

        public sealed class Kappale { public int Numero; public string Otsikko, Teksti, LinkkiTeksti, LinkkiUrl, NappiTeksti, NappiValmis, Toiminto; public bool Korostus; public List<string> Lista = new List<string>(); }
        /// <summary>Kappale = esittely.json:n kappaleet-taulukon 0-pohjainen indeksi alkuperäisessä järjestyksessä (versio 7, omistaja
        /// 7.10. 14.5x; Pelikoodari): kuva pienenä kappaleen vieressä; −1 tai osumaton indeksi = kortin lopun kuvarivi.</summary>
        public sealed class Kuva { public string Url, Teksti; public int Kappale = -1; public float RajausX = 50f, RajausY = 20f; }
        public sealed class Esittely
        {
            public string Nappi, Otsikko, Alaotsikko;
            public List<Kappale> Kappaleet = new List<Kappale>();
            public List<Kuva> Kuvat = new List<Kuva>();
        }

        /// <summary>Sama tarkistus kuin webin tarkistaApuraha: puuttuva nappi, otsikko tai kappalelista = null.</summary>
        public static Esittely Jasenna(string json)
        {
            Dictionary<string, object> d;
            if (string.IsNullOrEmpty(json)) return null;
            try { d = Rakenne.Olio(MiniJson.Jasenna(json)); } catch { return null; }
            if (d == null) return null;
            string S(Dictionary<string, object> o, string k) => o != null && o.TryGetValue(k, out var v) ? v as string : null;
            var e = new Esittely { Nappi = S(d, "nappi")?.Trim(), Otsikko = S(d, "otsikko"), Alaotsikko = S(d, "alaotsikko") ?? "" };
            var kappaleet = Rakenne.Lista(d.TryGetValue("kappaleet", out var kv) ? kv : null);
            if (string.IsNullOrEmpty(e.Nappi) || e.Otsikko == null || kappaleet == null) return null;
            int numero = -1;
            foreach (var ko in kappaleet)
            {
                numero++;   // 0-pohjainen indeksi JSONin kappaleet-taulukossa (tyhjät mukaan lukien)
                var o = Rakenne.Olio(ko);
                if (o == null) continue;
                // "korostus": true = kappaleen teksti lihavoituna, sama koko (omistaja 1.10.2026).
                var k = new Kappale { Numero = numero, Otsikko = S(o, "otsikko"), Teksti = S(o, "teksti"), Korostus = MiniJson.Totuus(o, "korostus") };
                var lista = Rakenne.Lista(o.TryGetValue("lista", out var lv) ? lv : null);
                // Rivi on teksti tai {teksti, webTeksti}; natiivi näyttää teksti-kentän (webTeksti on selaimen versio).
                if (lista != null) foreach (var r in lista) { var rt = r as string ?? S(Rakenne.Olio(r), "teksti"); if (rt != null) k.Lista.Add(rt); }
                var linkki = Rakenne.Olio(o.TryGetValue("linkki", out var li) ? li : null);
                k.LinkkiUrl = S(linkki, "url");
                k.LinkkiTeksti = S(linkki, "teksti") ?? k.LinkkiUrl;
                var nappi = Rakenne.Olio(o.TryGetValue("nappi", out var nv) ? nv : null);
                k.NappiTeksti = S(nappi, "teksti");
                k.NappiValmis = S(nappi, "valmis") ?? k.NappiTeksti;
                k.Toiminto = S(nappi, "toiminto");
                if (k.Otsikko != null || k.Teksti != null || k.Lista.Count > 0 || k.NappiTeksti != null) e.Kappaleet.Add(k);
            }
            var kuvat = Rakenne.Lista(d.TryGetValue("kuvat", out var kuv) ? kuv : null);
            if (kuvat != null)
                foreach (var ko in kuvat)
                {
                    var o = Rakenne.Olio(ko);
                    var t = S(o, "tiedosto");
                    if (string.IsNullOrEmpty(t)) continue;
                    var kuva = new Kuva { Url = Url(t), Teksti = S(o, "teksti") ?? "" };
                    // Pikkukuvan painopiste "x% y%" (web object-position; radion paneeli alhaalla 50% 90%).
                    var m = System.Text.RegularExpressions.Regex.Match(S(o, "rajaus") ?? "", @"^(\d{1,3})% (\d{1,3})%$");
                    if (m.Success) { kuva.RajausX = float.Parse(m.Groups[1].Value); kuva.RajausY = float.Parse(m.Groups[2].Value); }
                    if (o.TryGetValue("kappale", out var kp) && kp != null && int.TryParse(System.Convert.ToString(kp, System.Globalization.CultureInfo.InvariantCulture), out int kn)) kuva.Kappale = kn;
                    e.Kuvat.Add(kuva);
                }
            return e;
        }

        /// <summary>Polku sivuston juuresta (assets/…) tai täysi osoite.</summary>
        public static string Url(string t) => t.StartsWith("https://") || t.StartsWith("http://") ? t : Sivusto + t.TrimStart('/');

        public Esittely Nykyinen { get; private set; }
        public event Action Ladattu;
        public bool Auki => himmennys != null && himmennys.style.display == DisplayStyle.Flex;

        readonly VisualElement juuri;
        VisualElement himmennys, kokoruutu;
        ScrollView vieritys;

        public Apuraha(VisualElement juuri)
        {
            this.juuri = juuri;
            Nykyinen = Jasenna(PlayerPrefs.GetString(Muisti, ""));
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        IEnumerator Lataa()
        {
            using var r = UnityWebRequest.Get(Osoite);
            r.timeout = 15;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA apuraha: haku epäonnistui ({r.error}), muistissa {(Nykyinen != null ? "on" : "ei")}"); yield break; }
            var e = Jasenna(r.downloadHandler.text);
            if (e == null) { Debug.Log("MATKAKIRJA apuraha: esittely.json ei kelpaa"); yield break; }
            PlayerPrefs.SetString(Muisti, r.downloadHandler.text);
            Nykyinen = e;
            Debug.Log($"MATKAKIRJA apuraha: ladattu, {e.Kappaleet.Count} kappaletta, {e.Kuvat.Count} kuvaa");
            // Kortti rakennetaan uudelleen seuraavalla avauksella (teksti voi muuttua kesken istunnon vain haussa).
            if (himmennys != null && !Auki) { himmennys.RemoveFromHierarchy(); himmennys = null; }
            Ladattu?.Invoke();
        }

        /// <summary>Testi (ui apuraha tiedosto): esittely paikallisesta JSONista ennen kuin se on sivustolla. Ei tallennu muistiin.</summary>
        public string KaytaTekstia(string json)
        {
            var e = Jasenna(json);
            if (e == null) return "esittely ei kelpaa";
            Nykyinen = e;
            if (himmennys != null) { himmennys.RemoveFromHierarchy(); himmennys = null; }
            Ladattu?.Invoke();
            return null;
        }

        public void Avaa()
        {
            if (Nykyinen == null) return;
            Kaynti.Laheta("apuraha");
            if (himmennys == null) himmennys = Rakenna(Nykyinen);
            vieritys.scrollOffset = Vector2.zero;
            Rakenne.Nayta(himmennys, true, 250);
        }

        public void Sulje()
        {
            SuljeKokoruutu();
            if (himmennys != null) Rakenne.Nayta(himmennys, false, 250);
        }

        /// <summary>Testi: vieritys loppuun (kuvarivi näkyviin).</summary>
        public void VieritaLoppuun() => vieritys?.schedule.Execute(() => vieritys.scrollOffset = new Vector2(0, vieritys.contentContainer.layout.height)).StartingIn(300);

        // KORTIN LOPPU (omistaja 7.10. 09.4x: "Linkin voisi ottaa pois"; Päätoimittaja): aloitusportin periaate-ikkunasta siirretyt
        // lippurivi lippukuvien tekijöineen (Commonsin CC BY/BY-SA vaatii nimeämisen), palautelohko (PalauteLomake.PeriaateLohko) ja
        // ©-rivi; GitHub-linkki ja periaatetekstit jäävät pois. Pohjat: pieni oikeusrivi (.mk-aloitus__oikeudet, Kirjain.Apuri) ja
        // palautteen lohko sellaisenaan. Lippurivin alku paketin ui-tekstit PERIAATTEET.lippurivi (Aloitusnakyma), tekijät
        // moduulit/js/packs/lippu-tekijat.json (web js/packs/lippu-tekijat.js, tools/lisaa-tekijat.mjs).
        /// <summary>"Palaute ja mukaan" -lohko kortin lopussa (pois apurahakierroksen ajan, omistaja 14.5x).</summary>
        const bool PalauteKortissa = false;
        public static string Lippurivi = "Lippukuvat ovat Wikimedia Commonsista. Lisenssi edellyttää näiden tekijöiden mainitsemista: ";   // Päätoimittaja 7.10. kielikorjaus
        const string Oikeudet = "© Visuaaliviestinnän Instituutti Tampere Oy";
        static List<(string Tekija, string Lisenssi)> lippuTekijat;
        Label lippuEl;
        VisualElement palaute;

        void Loppuosa(VisualElement isa)
        {
            lippuEl = Rakenne.Teksti("", "mk-aloitus__oikeudet", isa);
            Kirjasimet.Aseta(lippuEl, Tyylikirja.Kirjain.Apuri);
            lippuEl.style.display = DisplayStyle.None;
            lippuEl.style.whiteSpace = WhiteSpace.Normal;   // simu 10.2x: rivi katkesi "…":llä yhdelle riville
            PaivitaLippurivi();
            if (lippuTekijat == null) UiKerros.Hae().StartCoroutine(LataaLippuTekijat());
            // Omistaja 7.10. 14.5x: palautelomakkeet pois apurahakortista apurahakierroksen ajaksi; palautus: PalauteKortissa = true.
            if (PalauteKortissa) palaute = PalauteLomake.PeriaateLohko(isa, UiKerros.Traileri);
            Kirjasimet.Aseta(Rakenne.Teksti(Oikeudet, "mk-aloitus__oikeudet", isa), Tyylikirja.Kirjain.Apuri);
        }

        void PaivitaLippurivi()
        {
            if (lippuEl == null) return;
            bool on = lippuTekijat != null && lippuTekijat.Count > 0;
            lippuEl.style.display = on ? DisplayStyle.Flex : DisplayStyle.None;
            if (on) lippuEl.text = Lippurivi + string.Join(", ", lippuTekijat.Select(l => $"{l.Tekija} ({l.Lisenssi})")) + ".";
        }

        System.Collections.IEnumerator LataaLippuTekijat()
        {
            string json = null;
            yield return Sisalto.HaePaketista("moduulit/js/packs/lippu-tekijat.json", t => json = t, true);
            var lista = new List<(string, string)>();
            try
            {
                var v = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(json ?? "{}")), "exportit"));
                var x = MiniJson.Kentta(v, "LIPPU_TEKIJAT");
                if (Rakenne.Olio(x) is Dictionary<string, object> o) x = MiniJson.Kentta(o, "arvo") ?? x;
                if (x is List<object> l)
                    foreach (var y in l)
                        if (Rakenne.Olio(y) is Dictionary<string, object> d && MiniJson.Teksti(d, "tekija") is string te)
                            lista.Add((te, MiniJson.Teksti(d, "lisenssi") ?? ""));
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA apuraha: lippu-tekijat: " + e.Message); }
            lippuTekijat = lista;
            Debug.Log($"MATKAKIRJA apuraha: lippukuvien tekijät {lista.Count}");
            PaivitaLippurivi();
        }

        /// <summary>Testi (ui palaute periaate): kortti auki ja vieritys palautelohkoon.</summary>
        public string AvaaPalaute()
        {
            Avaa();
            if (vieritys == null) return "apuraha: esittely ei ladattu";
            if (palaute == null) return "apuraha: palautelohko pois apurahakierroksen ajan";
            Rakenne.Vierita(vieritys, palaute, 350);
            return "apuraha: palautelohko";
        }

        /// <summary>Kappaleen kuvasarakkeen leveys (% kortin sisäleveydestä; omistaja 14.5x "aika pienellä").</summary>
        const float KappaleKuvaOsuus = 33f;
        readonly List<Kuva> ladatut = new List<Kuva>();

        /// <summary>
        /// Kuvanappi pohjalla mk-apuraha__kuva (3:4), näkyviin vasta latauduttua (ei tyhjää kehystä), napautus avaa kokoruudun
        /// latautuneista. leveys ≥ 0 = kiinteä % (kappaleen sarake), &lt; 0 = rivin näkyvien kesken jaettuna (rako 2 %).
        /// </summary>
        void KuvaNappi(Esittely e, Kuva kuva, VisualElement isa, List<Kuva> ladatut, float leveys)
        {
            Button b = null;
            b = Rakenne.Nappi(null, "mk-apuraha__kuva", () =>
            {
                var jarj = e.Kuvat.Where(ladatut.Contains).ToList();
                AvaaKokoruutu(jarj, Mathf.Max(0, jarj.IndexOf(kuva)));
            }, isa);
            b.style.display = DisplayStyle.None;
            if (leveys >= 0f) { b.style.width = Length.Percent(leveys); b.style.marginBottom = 6; }
            b.style.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Left, Length.Percent(kuva.RajausX));
            b.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Top, Length.Percent(kuva.RajausY));
            b.RegisterCallback<GeometryChangedEvent>(_ => { if (b.layout.width > 1f && Mathf.Abs(b.layout.height - b.layout.width * 4f / 3f) > 0.5f) b.style.height = b.layout.width * 4f / 3f; });
            string url = kuva.Url;
            Kuvat.Hae(url, t =>
            {
                if (t == null) { Debug.Log("MATKAKIRJA apuraha: kuva puuttuu, ei kehystä: " + url); return; }
                b.style.backgroundImage = new StyleBackground(t);
                b.style.display = DisplayStyle.Flex;
                if (!ladatut.Contains(kuva)) ladatut.Add(kuva);
                isa.style.display = DisplayStyle.Flex;
                if (leveys < 0f)
                {
                    var nakyvat = isa.Children().Where(c => c.style.display == DisplayStyle.Flex).ToList();
                    foreach (var c in nakyvat) c.style.width = Length.Percent((100f - 2f * (nakyvat.Count - 1)) / nakyvat.Count);
                }
            });
        }

        VisualElement Rakenna(Esittely e)
        {
            ladatut.Clear();
            var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            h.style.display = DisplayStyle.None;
            h.RegisterCallback<PointerDownEvent>(ev => { if (ev.target == h) Sulje(); });
            var kortti = new Kortti("mk-tietoja mk-apuraha", pohja: true); // KORTTI-pohja (web #3795)
            h.Add(kortti);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            var o = Rakenne.Teksti(e.Otsikko, "mk-kortti__otsikko mk-apuraha__otsikko", vieritys);
            Kirjasimet.Aseta(o, Tyylikirja.Kirjain.Otsikko); // KORTTI-pohja: otsikko kuten muissa korteissa
            if (e.Alaotsikko.Length > 0)
                Kirjasimet.Aseta(Rakenne.Teksti(e.Alaotsikko, "mk-apuraha__alaotsikko", vieritys), Kirjasin.LukuKursiivi);
            foreach (var k in e.Kappaleet)
            {
                if (k.Otsikko != null) Kirjasimet.Aseta(Rakenne.Teksti(k.Otsikko.ToUpperInvariant(), "mk-apuraha__valiotsikko", vieritys), Kirjasin.Kone);
                // KUVAT TEKSTIN YHTEYDESSÄ (omistaja 7.10. 14.5x): kappaleen kuvat pienenä (~kolmannes kortista) tekstin vieressä.
                var omat = e.Kuvat.Where(x => x.Kappale == k.Numero).ToList();
                if (k.Teksti != null)
                {
                    VisualElement isa = vieritys;
                    if (omat.Count > 0) { isa = Rakenne.El("mk-apuraha__rivi", vieritys, PickingMode.Ignore); isa.style.alignItems = Align.FlexStart; }
                    var t = Rakenne.Teksti(k.Teksti, "mk-kortti__teksti mk-apuraha__teksti", isa);
                    if (omat.Count > 0) { t.style.flexGrow = 1; t.style.flexShrink = 1; }
                    if (k.Korostus) Kirjasimet.Aseta(t, Kirjasin.LukuLihava);
                    if (omat.Count > 0)
                    {
                        var sarake = Rakenne.El("mk-apuraha__kappalekuvat", isa, PickingMode.Ignore);
                        sarake.style.width = Length.Percent(KappaleKuvaOsuus); sarake.style.flexShrink = 0;
                        sarake.style.marginLeft = 8;
                        sarake.style.display = DisplayStyle.None;   // näkyviin vasta kuvan latauduttua (ei tyhjää saraketta)
                        foreach (var kv2 in omat) KuvaNappi(e, kv2, sarake, ladatut, 100f);
                    }
                }
                for (int i = 0; i < k.Lista.Count; i++)
                {
                    var rivi = Rakenne.El("mk-apuraha__rivi", vieritys, PickingMode.Ignore);
                    Rakenne.Teksti($"{i + 1}.", "mk-kortti__teksti mk-apuraha__numero", rivi);
                    Rakenne.Teksti(k.Lista[i], "mk-kortti__teksti mk-apuraha__riviteksti", rivi);
                }
                if (k.Toiminto == "esittelylinssit" && k.NappiTeksti != null)
                {
                    // Kaikki linssit heti, myös kokeilut, ilman pisteitä ja muuta kehittäjätilaa (LinssiOhjain.AvaaEsittelylinssit).
                    Button b = null;
                    void Valmis() { b.Q<Label>().text = k.NappiValmis; b.SetEnabled(false); }
                    b = Rakenne.Nappi(k.NappiTeksti, "mk-nappi--toiminto mk-apuraha__toiminto", () =>
                    {
                        LinssiOhjain.AvaaEsittelylinssit();
                        Kaynti.Laheta("esittelylinssit");
                        Debug.Log($"MATKAKIRJA apuraha: esittelylinssit auki, valittavissa {LinssiUi.Rekisteri?.Valittavat.Count ?? -1}");
                        Valmis();
                    }, vieritys);
                    Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
                    if (LinssiOhjain.EsittelylinssitAuki) Valmis();
                }
                if (k.LinkkiUrl != null)
                {
                    var url = k.LinkkiUrl;
                    Kirjasimet.Aseta(Rakenne.Nappi(k.LinkkiTeksti, "mk-lehti__linkki mk-apuraha__linkki", () => Application.OpenURL(url), vieritys), Kirjasin.Kone);
                }
            }
            var loppukuvat = e.Kuvat.Where(x => x.Kappale < 0 || !e.Kappaleet.Any(k => k.Numero == x.Kappale && k.Teksti != null)).ToList();
            if (loppukuvat.Count > 0)
            {
                var kuvarivi = Rakenne.El("mk-apuraha__kuvat", vieritys, PickingMode.Ignore);
                kuvarivi.style.display = DisplayStyle.None;
                foreach (var kuva in loppukuvat) KuvaNappi(e, kuva, kuvarivi, ladatut, -1f);
            }
            Loppuosa(vieritys);
            kortti.Sisus.Add(vieritys);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Takaisin", "mk-nappi--toiminto", Sulje, napit), Kirjasin.KoneLihava);
            return h;
        }

        // --- kokoruutu (web openLightbox: kuva sovitettuna, kuvateksti ja laskuri alla) ---------------------------

        List<Kuva> kokoKuvat;
        int kokoIndeksi;
        VisualElement kokoKuva;
        Label kokoTeksti;

        public void AvaaKokoruutu(List<Kuva> kuvat, int indeksi)
        {
            SuljeKokoruutu();
            if (kuvat == null || kuvat.Count == 0) return;
            kokoKuvat = kuvat;
            kokoruutu = Rakenne.El("mk-apuraha__kokoruutu", juuri);
            kokoruutu.RegisterCallback<PointerDownEvent>(ev =>
            {
                ev.StopPropagation();
                // Reunakaistat (24 %) selaavat kuten postikorttipinossa, muu napautus sulkee.
                float x = ev.position.x / Mathf.Max(1f, kokoruutu.worldBound.width);
                int askel = kokoKuvat.Count < 2 ? 0 : x < 0.24f ? -1 : x > 0.76f ? 1 : 0;
                if (askel == 0) { SuljeKokoruutu(); return; }
                NaytaKokoruudussa((kokoIndeksi + askel + kokoKuvat.Count) % kokoKuvat.Count);
            });
            kokoKuva = Rakenne.El("mk-apuraha__kokokuva", kokoruutu, PickingMode.Ignore);
            kokoTeksti = Rakenne.Teksti("", "mk-apuraha__kokoteksti", kokoruutu);
            Kirjasimet.Aseta(kokoTeksti, Kirjasin.Kone);
            NaytaKokoruudussa(indeksi);
            Rakenne.Nayta(kokoruutu, true, 200);
        }

        void NaytaKokoruudussa(int i)
        {
            kokoIndeksi = i;
            var k = kokoKuvat[i];
            kokoKuva.style.backgroundImage = StyleKeyword.None;
            Kuvat.Hae(k.Url, t => { if (t != null && kokoIndeksi == i && kokoKuva != null) kokoKuva.style.backgroundImage = new StyleBackground(t); });
            kokoTeksti.text = k.Teksti + (kokoKuvat.Count > 1 ? $"\n{i + 1} / {kokoKuvat.Count}" : "");
        }

        public bool KokoruutuAuki => kokoruutu != null;

        public void SuljeKokoruutu()
        {
            if (kokoruutu == null) return;
            var vanha = kokoruutu;
            kokoruutu = null;
            kokoKuva = null;
            vanha.pickingMode = PickingMode.Ignore;
            Rakenne.PiilotaHaivyttaen(vanha, 180);
            vanha.schedule.Execute(vanha.RemoveFromHierarchy).StartingIn(220);
        }
    }
}
