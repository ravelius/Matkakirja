// LUE LISÄÄ -ARTIKKELI (Natiivi-UI): web #wiki-dialog ja openWikiArticle (js/ui.js), renderArticle
// (js/lehti.js), wiki.js (summary, extracts, media-list, pickImages).
//
// Järjestys kuten webissä:
//   1. Pelin oma artikkeli (moduulit js/packs/<manner>-artikkelit.json, kenttä artikkeli ?? teksti) →
//      ruudulle heti, lähderivi "Unohdetun aarteen oma artikkeli, kirjoitettu Wikipedian pohjalta
//      (CC BY-SA) — lue alkuperäinen". Kuva haetaan silti Wikipediasta.
//   2. Muuten Wikipedian tiivistelmä (fi, varalla en; alle 200 merkin tynkä vain varalle), sitten koko
//      artikkeli (action=query extracts explaintext), jos se on pidempi. Lähde "Wikipedia (CC BY-SA) — lue artikkeli".
//   3. Ei yhteyttä: "Tietoja ei saatu haettua. Matka jatkuu."
// Kuva: tiivistelmän alkuperäinen kuva, galleria media-listasta (kelvottomat pois, web BAD_IMAGE),
// laskuri ja nuolet, kun kuvia on useampi; napautus avaa suurennoksen. Kaiutin lukee artikkelin.
// Kerros: lehden ja nähtävyysarkin päällä (web showModal top-layer).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class WikiIkkuna
    {
        const int Kerros = UiKerros.Traileri;
        static readonly Regex HuonoKuva = new Regex(@"montage|collage|kollaasi|mosaic|banner|coat|vaakuna|flag|lippu|locator|\bmap\b|kartta|logo|seal|icon|graph|diagram|chart|topography|density|evolution|\.svg$", RegexOptions.IgnoreCase);
        static readonly Regex Hanta = new Regex(@"^(katso myös|lähteet|viitteet|lähteet ja viitteet|kirjallisuutta?|aiheesta muualla|ulkoiset linkit|kuvia|kuvagalleria|galleria|huomautukset|aiheeseen liittyvää|see also|references|notes|footnotes|citations|sources|bibliography|further reading|external links|gallery)$", RegexOptions.IgnoreCase);

        readonly VisualElement himmennys, kuvakotelo, kuva, teksti;
        readonly Label otsikko, laskuri, kuvateksti, lahde;
        readonly Button edellinen, seuraava, lahdeLinkki;
        readonly ScrollView vieritys;
        readonly KortinLukija lukija;
        readonly Kuvasuurennos suurennos;
        string auki, lahdeOsoite;
        int versio;
        List<(string Src, string Kuvateksti)> kuvat = new List<(string, string)>();
        int kuvaKohdalla;

        public bool Auki { get; private set; }

        public WikiIkkuna(UiKerros kerros)
        {
            var juuri = kerros.Juuri(Kerros);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kortti = new Kortti("mk-tietoja mk-wiki");
            himmennys.Add(kortti);
            var ylarivi = Rakenne.El("mk-wiki__ylarivi", kortti.Sisus, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("Lue lisää", "mk-kortti__otsikko mk-wiki__otsikko", ylarivi);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            // Kaiutin artikkelin ylälaidassa (web varustaLukija, seuraa korttia).
            lukija = new KortinLukija(ylarivi, "Kuuntele artikkeli");

            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);

            kuvakotelo = Rakenne.El("mk-wiki__kuvakotelo", vieritys.contentContainer);
            kuva = Rakenne.El("mk-wiki__kuva", kuvakotelo);
            kuva.RegisterCallback<ClickEvent>(_ => AvaaSuurennos());
            kuva.RegisterCallback<GeometryChangedEvent>(e => MitoitaKuva());
            edellinen = Rakenne.Nappi("‹", "mk-wiki__nuoli mk-wiki__nuoli--edellinen", () => Selaa(-1), kuvakotelo);
            seuraava = Rakenne.Nappi("›", "mk-wiki__nuoli mk-wiki__nuoli--seuraava", () => Selaa(1), kuvakotelo);
            laskuri = Rakenne.Teksti("", "mk-wiki__laskuri", kuvakotelo);
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            kuvateksti = Rakenne.Teksti("", "mk-wiki__kuvateksti", vieritys.contentContainer);
            Kirjasimet.Aseta(kuvateksti, Kirjasin.LukuKursiivi);
            teksti = Rakenne.El("mk-wiki__teksti", vieritys.contentContainer, PickingMode.Ignore);
            var lahderivi = Rakenne.El("mk-wiki__lahderivi", vieritys.contentContainer, PickingMode.Ignore);
            lahde = Rakenne.Teksti("", "mk-wiki__lahde", lahderivi);
            Kirjasimet.Aseta(lahde, Kirjasin.Luku);
            lahdeLinkki = Rakenne.Nappi("", "mk-wiki__linkki", () => { if (!string.IsNullOrEmpty(lahdeOsoite)) Application.OpenURL(lahdeOsoite); }, lahderivi);
            Kirjasimet.Aseta(lahdeLinkki, Kirjasin.Luku);

            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Sulje", "mk-nappi--kulta", Sulje, napit);
            Rakenne.Tausta(sulje, Kuviot.Kulta);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);
            // Suurennos himmennyksen sisällä: nousee ikkunan kanssa muiden päälle (web: katselin dialogin sisällä).
            suurennos = new Kuvasuurennos(himmennys);
        }

        /// <summary>Avaa artikkelin (web openWikiArticle(title, label)).</summary>
        public void Avaa(string wikiOtsikko, string nimi = null)
        {
            if (string.IsNullOrEmpty(wikiOtsikko)) return;
            auki = wikiOtsikko;
            int oma = ++versio;
            otsikko.text = nimi ?? wikiOtsikko;
            kuvat = new List<(string, string)>();
            kuvaKohdalla = 0;
            NaytaKuva();
            lukija.Pysayta();
            AsetaLahde(null, null, null);
            Kappaleet(new[] { "Haetaan…" });
            vieritys.scrollOffset = Vector2.zero;
            if (!Auki)
            {
                Auki = true;
                himmennys.BringToFront();
                Aanet.PulunTehoste("paper");
                Rakenne.Nayta(himmennys, true, 280);
                SyoteLukko.Esta(this);
            }
            WikiArtikkelit.Lataa(() =>
            {
                if (oma != versio) return;
                string omaTeksti = WikiArtikkelit.Hae(wikiOtsikko);
                if (omaTeksti != null)
                {
                    Renderoi(omaTeksti);
                    AsetaLahde("Unohdetun aarteen oma artikkeli, kirjoitettu Wikipedian pohjalta (CC BY-SA)", null, null);
                }
                UiKerros.Hae().StartCoroutine(Hae(wikiOtsikko, nimi, omaTeksti != null, oma));
            });
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            lukija.Pysayta();
            suurennos.Sulje();
            Rakenne.Nayta(himmennys, false, 220);
            SyoteLukko.Vapauta(this);
        }

        IEnumerator Hae(string wikiOtsikko, string nimi, bool omaArtikkeli, int oma)
        {
            PuluChat.WikiYhteenveto y = null;
            yield return PuluChat.HaeYhteenveto(wikiOtsikko, new[] { "fi", "en" }, t => y = t);
            if (oma != versio) yield break;
            if (y == null)
            {
                // Oma selitys on parempi kuin pahoittelu (web): oma artikkeli jää, muuten lyhyt ilmoitus.
                if (!omaArtikkeli) Kappaleet(new[] { "Tietoja ei saatu haettua. Matka jatkuu." });
                yield break;
            }
            if (!omaArtikkeli) otsikko.text = y.Otsikko ?? nimi ?? wikiOtsikko;
            if (!string.IsNullOrEmpty(y.Kuva)) { kuvat.Add((y.Kuva, null)); NaytaKuva(); }
            UiKerros.Hae().StartCoroutine(HaeGalleria(y, oma));
            if (omaArtikkeli)
            {
                AsetaLahde("Unohdetun aarteen oma artikkeli, kirjoitettu Wikipedian pohjalta (CC BY-SA) — ", "lue alkuperäinen", y.Osoite);
                yield break;
            }
            Kappaleet(new[] { y.Tiivistelma });
            AsetaLahde("Lähde: Wikipedia (CC BY-SA) — ", "lue artikkeli", y.Osoite);
            // Koko artikkeli tiivistelmän perään; tiivistelmä jää, jos hakua ei saada tehtyä.
            string url = $"https://{y.Kieli}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&redirects=1&format=json&titles={Uri.EscapeDataString(y.Otsikko ?? wikiOtsikko)}";
            using (var r = UnityWebRequest.Get(url))
            {
                yield return r.SendWebRequest();
                if (oma != versio || r.result != UnityWebRequest.Result.Success) yield break;
                string koko = null;
                try
                {
                    var sivut = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)), "query")), "pages"));
                    var sivu = sivut != null && sivut.Count > 0 ? Rakenne.Olio(sivut.Values.First()) : null;
                    koko = (MiniJson.Teksti(sivu, "extract") ?? "").Trim();
                }
                catch (FormatException) { }
                if (!string.IsNullOrEmpty(koko) && koko.Length > y.Tiivistelma.Length) Renderoi(koko);
            }
        }

        /// <summary>Artikkelin kuvasto (web cachedGallery → pickImages): vain, jos kuvia on useampi.</summary>
        IEnumerator HaeGalleria(PuluChat.WikiYhteenveto y, int oma)
        {
            using var r = UnityWebRequest.Get($"https://{y.Kieli}.wikipedia.org/api/rest_v1/page/media-list/{Uri.EscapeDataString(y.Otsikko)}");
            yield return r.SendWebRequest();
            if (oma != versio || r.result != UnityWebRequest.Result.Success) yield break;
            var lista = new List<(string, string)>();
            try
            {
                var alkiot = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)), "items"));
                foreach (var a in (alkiot ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                {
                    if (MiniJson.Teksti(a, "type") != "image" || HuonoKuva.IsMatch(MiniJson.Teksti(a, "title") ?? "")) continue;
                    var srcset = Rakenne.Lista(MiniJson.Kentta(a, "srcset"));
                    if (srcset == null || srcset.Count == 0) continue;
                    string src = MiniJson.Teksti(Rakenne.Olio(srcset[srcset.Count - 1]), "src") ?? MiniJson.Teksti(Rakenne.Olio(srcset[0]), "src");
                    if (string.IsNullOrEmpty(src)) continue;
                    if (src.StartsWith("//")) src = "https:" + src;
                    string teksti = (MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(a, "caption")), "text") ?? "").Trim();
                    lista.Add((src, teksti.Length > 0 ? teksti : null));
                    if (lista.Count >= 12) break;
                }
            }
            catch (FormatException) { yield break; }
            if (lista.Count < 2) yield break;
            // Tiivistelmän kuva pysyy ensimmäisenä, jos se on kuvastossa (web findIndex).
            string nykyinen = kuvat.Count > 0 ? Tiedosto(kuvat[0].Src) : null;
            int alku = nykyinen != null ? lista.FindIndex(k => Tiedosto(k.Item1) == nykyinen) : -1;
            kuvat = lista;
            kuvaKohdalla = Mathf.Max(0, alku);
            NaytaKuva();
        }

        static string Tiedosto(string url)
        {
            string n = url.Substring(url.LastIndexOf('/') + 1);
            return Regex.Replace(n, @"^\d+px-", "");
        }

        // --- kuva ---------------------------------------------------------------------------------

        void NaytaKuva()
        {
            bool on = kuvat.Count > 0;
            kuvakotelo.style.display = on ? DisplayStyle.Flex : DisplayStyle.None;
            bool useita = kuvat.Count > 1;
            edellinen.style.display = seuraava.style.display = laskuri.style.display = useita ? DisplayStyle.Flex : DisplayStyle.None;
            laskuri.text = useita ? $"{kuvaKohdalla + 1} / {kuvat.Count}" : "";
            kuvateksti.text = on ? kuvat[kuvaKohdalla].Kuvateksti ?? "" : "";
            kuvateksti.style.display = kuvateksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (!on) { kuva.style.backgroundImage = StyleKeyword.None; return; }
            int oma = versio, kohta = kuvaKohdalla;
            Kuvat.Hae(kuvat[kohta].Src, t =>
            {
                if (oma != versio || kohta != kuvaKohdalla || t == null) return;
                kuva.style.backgroundImage = new StyleBackground(t);
                kuvaSuhde = (float)t.height / Mathf.Max(1, t.width);
                MitoitaKuva();
            });
        }

        float kuvaSuhde = 0.6f;

        void MitoitaKuva()
        {
            float w = kuva.resolvedStyle.width;
            if (float.IsNaN(w) || w <= 0) return;
            float h = Mathf.Round(Mathf.Min(w * kuvaSuhde, 360f));
            if (Mathf.Abs(kuva.resolvedStyle.height - h) > 0.5f) kuva.style.height = h;
        }

        void Selaa(int suunta)
        {
            if (kuvat.Count < 2) return;
            kuvaKohdalla = (kuvaKohdalla + suunta + kuvat.Count) % kuvat.Count;
            NaytaKuva();
        }

        void AvaaSuurennos()
        {
            if (kuvat.Count == 0) return;
            var lista = kuvat.Select(k => new LehtiKuva { Lahde = k.Src, Selite = k.Kuvateksti ?? otsikko.text, LahdeRivi = "Wikimedia Commons" }).ToList();
            suurennos.Avaa(lista, kuvaKohdalla);
        }

        // --- teksti -------------------------------------------------------------------------------

        void AsetaLahde(string teksti, string linkki, string osoite)
        {
            lahde.text = teksti ?? "";
            lahde.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            lahdeOsoite = osoite;
            bool l = !string.IsNullOrEmpty(linkki) && !string.IsNullOrEmpty(osoite);
            lahdeLinkki.Q<Label>().text = linkki ?? "";
            lahdeLinkki.style.display = l ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void Kappaleet(IEnumerable<string> kappaleet)
        {
            teksti.Clear();
            var luettavat = new List<string> { otsikko.text };
            foreach (var k in kappaleet)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-wiki__p", teksti), Kirjasin.Luku);
                luettavat.Add(k);
            }
            lukija.Aseta(luettavat, "Kuuntele artikkeli");
        }

        /// <summary>
        /// Web renderArticle: tyhjä rivi erottaa kappaleet, == Otsikko == on väliotsikko, ja pääotsikkotason
        /// häntäosio (Lähteet, Katso myös …) katkaisee artikkelin.
        /// </summary>
        void Renderoi(string teksti)
        {
            this.teksti.Clear();
            var luettavat = new List<string> { otsikko.text };
            var kappale = new List<string>();
            void Tyhjenna()
            {
                if (kappale.Count == 0) return;
                string k = string.Join(" ", kappale);
                Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-wiki__p", this.teksti), Kirjasin.Luku);
                luettavat.Add(k);
                kappale.Clear();
            }
            foreach (var rivi in teksti.Split('\n'))
            {
                string t = rivi.Trim();
                if (t.Length == 0) { Tyhjenna(); continue; }
                var m = Regex.Match(t, @"^(={2,6})\s*(.+?)\s*={2,6}$");
                if (!m.Success) { kappale.Add(t); continue; }
                Tyhjenna();
                bool paa = m.Groups[1].Length <= 2;
                if (paa && Hanta.IsMatch(m.Groups[2].Value)) break;
                Kirjasimet.Aseta(Rakenne.Teksti(m.Groups[2].Value, paa ? "mk-wiki__h2" : "mk-wiki__h3", this.teksti), Kirjasin.LukuLihava);
            }
            Tyhjenna();
            lukija.Aseta(luettavat, "Kuuntele artikkeli");
        }
    }

    /// <summary>Pelin omat artikkelit (web ARTIKKELIT: kuuden mantereen *_ARTIKKELIT yhdistettynä).</summary>
    public static class WikiArtikkelit
    {
        static readonly string[] Moduulit = { "africa", "europe", "asia", "northamerica", "southamerica", "oceania" };
        static Dictionary<string, string> artikkelit, introt;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>Artikkelin teksti (artikkeli ?? teksti) wiki-otsikolla, tai null.</summary>
        public static string Hae(string otsikko) =>
            otsikko != null && artikkelit != null && artikkelit.TryGetValue(otsikko, out var t) ? t : null;

        /// <summary>Artikkelin lyhyt esittely (web ARTIKKELIT[x].intro, maalehden pääkirjoitus), tai null.</summary>
        public static string Intro(string otsikko) =>
            otsikko != null && introt != null && introt.TryGetValue(otsikko, out var t) ? t : null;

        public static void Lataa(Action valmis)
        {
            if (artikkelit != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(HaeKaikki());
        }

        static IEnumerator HaeKaikki()
        {
            var tulos = new Dictionary<string, string>();
            var introTulos = new Dictionary<string, string>();
            foreach (var m in Moduulit)
            {
                string json = null;
                yield return Sisalto.HaePaketista("moduulit/js/packs/" + m + "-artikkelit.json", t => json = t, true);
                if (json == null) continue;
                try
                {
                    var exportit = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(json)), "exportit"));
                    if (exportit == null) continue;
                    foreach (var vienti in exportit.Values)
                    {
                        var o = Rakenne.Olio(vienti);
                        var arvo = Rakenne.Olio(MiniJson.Kentta(o, "arvo")) ?? o;
                        if (arvo == null) continue;
                        foreach (var kv in arvo)
                        {
                            var a = Rakenne.Olio(kv.Value);
                            string t = MiniJson.Teksti(a, "artikkeli") ?? MiniJson.Teksti(a, "teksti");
                            if (!string.IsNullOrEmpty(t)) tulos[kv.Key] = t; // myöhempi voittaa kuten spread
                            if (MiniJson.Teksti(a, "intro") is string intro && intro.Length > 0) introTulos[kv.Key] = intro;
                        }
                    }
                }
                catch (FormatException e) { Debug.LogWarning("MATKAKIRJA ui artikkelit " + m + ": " + e.Message); }
            }
            introt = introTulos;
            artikkelit = tulos;
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var c in kutsut) { try { c(); } catch (Exception e) { Debug.LogException(e); } }
        }
    }
}
