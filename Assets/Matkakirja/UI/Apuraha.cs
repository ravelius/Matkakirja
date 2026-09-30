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

        public sealed class Kappale { public string Otsikko, Teksti, LinkkiTeksti, LinkkiUrl, NappiTeksti, NappiValmis, Toiminto; public List<string> Lista = new List<string>(); }
        public sealed class Kuva { public string Url, Teksti; }
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
            foreach (var ko in kappaleet)
            {
                var o = Rakenne.Olio(ko);
                if (o == null) continue;
                var k = new Kappale { Otsikko = S(o, "otsikko"), Teksti = S(o, "teksti") };
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
                    e.Kuvat.Add(new Kuva { Url = Url(t), Teksti = S(o, "teksti") ?? "" });
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

        VisualElement Rakenna(Esittely e)
        {
            var h = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            h.style.display = DisplayStyle.None;
            h.RegisterCallback<PointerDownEvent>(ev => { if (ev.target == h) Sulje(); });
            var kortti = new Kortti("mk-tietoja mk-apuraha");
            h.Add(kortti);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            var o = Rakenne.Teksti(e.Otsikko, "mk-kortti__otsikko mk-apuraha__otsikko", vieritys);
            Kirjasimet.Aseta(o, Kirjasin.KoneLihava);
            if (e.Alaotsikko.Length > 0)
                Kirjasimet.Aseta(Rakenne.Teksti(e.Alaotsikko, "mk-apuraha__alaotsikko", vieritys), Kirjasin.LukuKursiivi);
            foreach (var k in e.Kappaleet)
            {
                if (k.Otsikko != null) Kirjasimet.Aseta(Rakenne.Teksti(k.Otsikko.ToUpperInvariant(), "mk-apuraha__valiotsikko", vieritys), Kirjasin.Kone);
                if (k.Teksti != null) Rakenne.Teksti(k.Teksti, "mk-kortti__teksti mk-apuraha__teksti", vieritys);
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
                    b = Rakenne.Nappi(k.NappiTeksti, "mk-nappi--haamu mk-apuraha__toiminto", () =>
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
            if (e.Kuvat.Count > 0)
            {
                var kuvarivi = Rakenne.El("mk-apuraha__kuvat", vieritys, PickingMode.Ignore);
                // Pikkukuvat 3:4 (web aspect-ratio): korkeus leveydestä.
                kuvarivi.RegisterCallback<GeometryChangedEvent>(_ =>
                {
                    foreach (var c in kuvarivi.Children())
                        if (c.layout.width > 1f && Mathf.Abs(c.layout.height - c.layout.width * 4f / 3f) > 0.5f) c.style.height = c.layout.width * 4f / 3f;
                });
                for (int i = 0; i < e.Kuvat.Count; i++)
                {
                    int n = i;
                    var b = Rakenne.Nappi(null, "mk-apuraha__kuva", () => AvaaKokoruutu(e.Kuvat, n), kuvarivi);
                    // Leveys kuvien määrän mukaan (4 kuvaa, omistaja 30.9. klo 15.06; rako 2 %).
                    b.style.width = Length.Percent((100f - 2f * (e.Kuvat.Count - 1)) / e.Kuvat.Count);
                    Kuvat.Hae(e.Kuvat[i].Url, t => { if (t != null) b.style.backgroundImage = new StyleBackground(t); });
                }
            }
            kortti.Sisus.Add(vieritys);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Takaisin", "mk-nappi--haamu", Sulje, napit), Kirjasin.KoneLihava);
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
