// MAAN UUTISET (Natiivi-UI): webin js/uutiset.js + lehti.js naytaMaaUutiset / avaaUutinen natiivina.
//
// Maaosaston lopussa "Uutisissa tänään (BBC News)" ja kolme tuoreinta otsikkoa paikallisella kielellä;
// suomennos (MyMemory) otsikon alle ja artikkelin kuva pikkukuvaksi, kun ne saadaan. Napautus avaa
// uutiskortin: päiväys, "Käännä" (alkukieli ↔ suomi), lähteen nimi, otsikko, kuva ja kappaleet.
// Lähteet ja välityspalvelin sisältöpaketin moduulista moduulit/js/packs/uutislahteet.json
// (UUTISLAHTEET: ISO3 → { nimi, kieli, syote }, UUTISPROXY). Syöte ja artikkeli haetaan välityksen
// kautta (?url=…); artikkelista kappaleet (itemprop="articleBody" tai <article>, > 60 merkkiä, ei
// copyright-rivejä, enintään 6) ja og:image. Välimuistit: uutiset 30 min, artikkelit ja käännökset istunto.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Xml;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Uutiset
    {
        const string Moduuli = "moduulit/js/packs/uutislahteet.json";
        const string Kaannos = "https://api.mymemory.translated.net/get";

        sealed class Lahde { public string Nimi, Kieli, Syote; }
        sealed class Uutinen { public string Otsikko, Kuvaus, Linkki, Aika; }
        sealed class Artikkeli { public List<string> Kappaleet = new List<string>(); public string Kuva; }

        static Dictionary<string, Lahde> lahteet;
        static string proxy;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();
        static readonly Dictionary<string, (float Aika, List<Uutinen> Lista)> uutisMuisti = new Dictionary<string, (float, List<Uutinen>)>();
        static readonly Dictionary<string, Artikkeli> artikkeliMuisti = new Dictionary<string, Artikkeli>();
        static readonly Dictionary<string, string> kaannosMuisti = new Dictionary<string, string>();

        static void Lataa(Action valmis)
        {
            if (lahteet != null) { valmis(); return; }
            odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista(Moduuli, json =>
            {
                var t = new Dictionary<string, Lahde>();
                try
                {
                    var e = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(json != null ? MiniJson.Jasenna(json) : null), "exportit"));
                    object Arvo(string n) { var x = MiniJson.Kentta(e, n); return Rakenne.Olio(x) is Dictionary<string, object> o && o.ContainsKey("arvo") ? o["arvo"] : x; }
                    proxy = Arvo("UUTISPROXY") as string;
                    foreach (var kv in Rakenne.Olio(Arvo("UUTISLAHTEET")) ?? new Dictionary<string, object>())
                    {
                        var o = Rakenne.Olio(kv.Value);
                        string syote = MiniJson.Teksti(o, "syote");
                        if (syote != null) t[kv.Key] = new Lahde { Nimi = MiniJson.Teksti(o, "nimi") ?? kv.Key, Kieli = MiniJson.Teksti(o, "kieli") ?? "en", Syote = syote };
                    }
                }
                catch (FormatException) { /* ei uutisia */ }
                lahteet = t;
                haussa = false;
                var kutsut = odottajat.ToArray();
                odottajat.Clear();
                foreach (var k in kutsut) { try { k(); } catch (Exception ex) { Debug.LogException(ex); } }
            }, true));
        }

        /// <summary>Maaosaston uutislohko isän loppuun (ei lähdettä tai ei uutisia = ei mitään).</summary>
        public static void Piirra(VisualElement isa, string iso)
        {
            var lohko = Rakenne.El("mk-uutiset", isa, PickingMode.Ignore);
            lohko.style.display = DisplayStyle.None;
            Lataa(() =>
            {
                if (string.IsNullOrEmpty(proxy) || iso == null || !lahteet.TryGetValue(iso, out var lahde)) return;
                UiKerros.Hae().StartCoroutine(HaeUutiset(iso, lahde, lista =>
                {
                    if (lista.Count == 0 || lohko.panel == null) return;
                    Kirjasimet.Aseta(Rakenne.Teksti($"Uutisissa tänään ({lahde.Nimi})", "mk-uutiset__nimio", lohko), Kirjasin.Kone);
                    foreach (var u in lista.Take(3))
                    {
                        var uutinen = u;
                        var rivi = Rakenne.Nappi(null, "mk-uutiset__rivi", () => AvaaUutinen(uutinen, lahde), lohko);
                        var kuva = Rakenne.El("mk-uutiset__pikkukuva", rivi, PickingMode.Ignore);
                        kuva.style.display = DisplayStyle.None;
                        var tekstit = Rakenne.El("mk-uutiset__tekstit", rivi, PickingMode.Ignore);
                        Kirjasimet.Aseta(Rakenne.Teksti(u.Otsikko, "mk-uutiset__otsikko", tekstit), Kirjasin.LukuLihava);
                        UiKerros.Hae().StartCoroutine(Kaanna(u.Otsikko, lahde.Kieli, fi =>
                        {
                            if (string.IsNullOrEmpty(fi) || rivi.panel == null) return;
                            Rakenne.Teksti(fi, "mk-uutiset__suomeksi", tekstit);
                        }));
                        UiKerros.Hae().StartCoroutine(HaeArtikkeli(u.Linkki, a =>
                        {
                            if (a?.Kuva == null || rivi.panel == null) return;
                            Natiivi.Kuvat.Hae(a.Kuva, tex =>
                            {
                                if (tex == null || rivi.panel == null) return;
                                kuva.style.backgroundImage = new StyleBackground(tex);
                                kuva.style.display = DisplayStyle.Flex;
                            });
                        }));
                    }
                    lohko.style.display = DisplayStyle.Flex;
                }));
            });
        }

        // --- uutiskortti (web avaaUutinen) ------------------------------------------------------

        static void AvaaUutinen(Uutinen u, Lahde lahde)
        {
            Aanet.PulunTehoste("paper");
            Minipopup.Avaa("", c =>
            {
                var ylarivi = Rakenne.El("mk-uutinen__ylarivi", c, PickingMode.Ignore);
                string paiva = DateTime.TryParse(u.Aika, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out var aika)
                    ? $"{aika.Day}.{aika.Month}.{aika.Year}" : "";
                Kirjasimet.Aseta(Rakenne.Teksti(paiva, "mk-uutinen__paivays", ylarivi), Kirjasin.Kone);
                var kaanna = Rakenne.Nappi("Käännä", "mk-uutinen__kaanna", null, ylarivi);
                Kirjasimet.Aseta(kaanna, Kirjasin.Kone);
                Kirjasimet.Aseta(Rakenne.Teksti(lahde.Nimi, "mk-uutinen__masto", c), Kirjasin.KoneLihava);
                var otsikko = Rakenne.Teksti(u.Otsikko, "mk-uutinen__otsikko", c);
                Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
                var kuva = Rakenne.El("mk-uutinen__kuva", c, PickingMode.Ignore);
                kuva.style.display = DisplayStyle.None;
                var runko = Rakenne.El("mk-uutinen__runko", c, PickingMode.Ignore);
                var alkuperaiset = string.IsNullOrEmpty(u.Kuvaus) ? new List<string>() : new List<string> { Siisti(u.Kuvaus) };
                (string Otsikko, List<string> Kappaleet)? suomennos = null;
                bool suomeksi = false;
                void Kappaleet(IEnumerable<string> t) { runko.Clear(); foreach (var k in t) Rakenne.Teksti(k, "mk-uutinen__kappale", runko); }
                Kappaleet(alkuperaiset);

                IEnumerator KaannaKaikki(Action<(string, List<string>)?> valmis)
                {
                    string ots = null;
                    yield return Kaanna(u.Otsikko, lahde.Kieli, x => ots = x);
                    if (string.IsNullOrEmpty(ots)) { valmis(null); yield break; }
                    var fi = new List<string>();
                    foreach (var k in alkuperaiset)
                    {
                        string x = null;
                        yield return Kaanna(k, lahde.Kieli, y => x = y);
                        if (string.IsNullOrEmpty(x)) break;
                        fi.Add(x);
                    }
                    valmis(fi.Count == 0 ? null : (ots, fi));
                }

                UiKerros.Hae().StartCoroutine(HaeArtikkeli(u.Linkki, a =>
                {
                    if (a == null || runko.panel == null) return;
                    if (a.Kuva != null)
                        Natiivi.Kuvat.Hae(a.Kuva, tex =>
                        {
                            if (tex == null || kuva.panel == null) return;
                            kuva.style.backgroundImage = new StyleBackground(tex);
                            kuva.style.display = DisplayStyle.Flex;
                        });
                    if (a.Kappaleet.Count == 0) return;
                    alkuperaiset = a.Kappaleet;
                    suomennos = null;
                    if (!suomeksi) { Kappaleet(alkuperaiset); return; }
                    UiKerros.Hae().StartCoroutine(KaannaKaikki(k =>
                    {
                        if (k == null || !suomeksi || runko.panel == null) return;
                        suomennos = k;
                        otsikko.text = k.Value.Item1;
                        Kappaleet(k.Value.Item2);
                    }));
                }));

                var kaannaTeksti = kaanna.Q<Label>();
                kaanna.clicked += () =>
                {
                    if (suomeksi)
                    {
                        suomeksi = false;
                        otsikko.text = u.Otsikko;
                        Kappaleet(alkuperaiset);
                        kaannaTeksti.text = "Käännä";
                        return;
                    }
                    if (suomennos != null)
                    {
                        suomeksi = true;
                        otsikko.text = suomennos.Value.Otsikko;
                        Kappaleet(suomennos.Value.Kappaleet);
                        kaannaTeksti.text = "Palauta";
                        return;
                    }
                    kaannaTeksti.text = "Käännetään…";
                    kaanna.SetEnabled(false);
                    UiKerros.Hae().StartCoroutine(KaannaKaikki(k =>
                    {
                        if (runko.panel == null) return;
                        kaanna.SetEnabled(true);
                        if (k == null) { kaannaTeksti.text = "Yritä uudelleen"; return; }
                        suomennos = k;
                        suomeksi = true;
                        otsikko.text = k.Value.Item1;
                        Kappaleet(k.Value.Item2);
                        kaannaTeksti.text = "Palauta";
                    }));
                };
            }, "mk-minipopup--uutinen", UiKerros.Traileri);
        }

        // --- verkko (web haeUutiset, haeArtikkeli, kaannaSuomeksi) ------------------------------

        static IEnumerator HaeUutiset(string iso, Lahde lahde, Action<List<Uutinen>> valmis)
        {
            if (uutisMuisti.TryGetValue(iso, out var m) && Time.realtimeSinceStartup - m.Aika < 1800f) { valmis(m.Lista); yield break; }
            var lista = new List<Uutinen>();
            using (var r = UnityWebRequest.Get(proxy + "?url=" + Uri.EscapeDataString(lahde.Syote)))
            {
                r.timeout = 10;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success)
                {
                    try
                    {
                        var x = new XmlDocument { XmlResolver = null };
                        x.LoadXml(r.downloadHandler.text);
                        foreach (XmlNode item in x.GetElementsByTagName("item"))
                        {
                            string T(string n) => item[n]?.InnerText?.Trim() ?? "";
                            var u = new Uutinen { Otsikko = T("title"), Kuvaus = T("description"), Linkki = T("link"), Aika = T("pubDate") };
                            if (u.Otsikko.Length > 0) lista.Add(u);
                            if (lista.Count >= 5) break;
                        }
                    }
                    catch (XmlException e) { Debug.LogWarning("MATKAKIRJA uutiset: " + e.Message); }
                }
            }
            uutisMuisti[iso] = (Time.realtimeSinceStartup, lista);
            valmis(lista);
        }

        static readonly Regex Kappale = new Regex(@"<p[^>]*>(.*?)</p>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
        static readonly Regex Tagi = new Regex(@"<[^>]+>");
        static readonly Regex Tekijanoikeus = new Regex(@"Riproduzione riservata|©|Copyright", RegexOptions.IgnoreCase);
        static readonly Regex OgKuva = new Regex(@"<meta[^>]+property=[""']og:image[""'][^>]*content=[""']([^""']+)[""']|<meta[^>]+content=[""']([^""']+)[""'][^>]*property=[""']og:image[""']", RegexOptions.IgnoreCase);

        static string Siisti(string html) => Regex.Replace(WebUtility.HtmlDecode(Tagi.Replace(html ?? "", " ")), @"\s+", " ").Trim();

        /// <summary>Artikkelin runko: itemprop="articleBody" tai &lt;article&gt;, muuten ei kappaleita (web).</summary>
        static string Runko(string html)
        {
            var m = Regex.Match(html, @"itemprop=[""']articleBody[""'][^>]*>", RegexOptions.IgnoreCase);
            if (m.Success) return html.Substring(m.Index + m.Length);
            m = Regex.Match(html, @"<article[\s>][\s\S]*?</article>", RegexOptions.IgnoreCase);
            return m.Success ? m.Value : null;
        }

        static IEnumerator HaeArtikkeli(string linkki, Action<Artikkeli> valmis)
        {
            if (string.IsNullOrEmpty(linkki) || string.IsNullOrEmpty(proxy)) { valmis(null); yield break; }
            if (artikkeliMuisti.TryGetValue(linkki, out var vanha)) { valmis(vanha); yield break; }
            Artikkeli a = null;
            using (var r = UnityWebRequest.Get(proxy + "?url=" + Uri.EscapeDataString(linkki)))
            {
                r.timeout = 12;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success)
                {
                    string html = r.downloadHandler.text ?? "";
                    var uusi = new Artikkeli();
                    string runko = Runko(html);
                    if (runko != null)
                        foreach (Match p in Kappale.Matches(runko))
                        {
                            string t = Siisti(p.Groups[1].Value);
                            if (t.Length > 60 && !Tekijanoikeus.IsMatch(t)) uusi.Kappaleet.Add(t);
                            if (uusi.Kappaleet.Count >= 6) break;
                        }
                    var og = OgKuva.Match(html);
                    if (og.Success) uusi.Kuva = WebUtility.HtmlDecode(og.Groups[1].Success ? og.Groups[1].Value : og.Groups[2].Value);
                    if (uusi.Kappaleet.Count > 0 || uusi.Kuva != null) a = uusi;
                }
            }
            artikkeliMuisti[linkki] = a;
            valmis(a);
        }

        /// <summary>Web paloittele: virkkeinä enintään 450 merkin paloihin.</summary>
        static List<string> Paloittele(string teksti, int raja = 450)
        {
            var palat = new List<string>();
            string pala = "";
            foreach (Match vm in Regex.Matches(teksti, @"[^.!?]+[.!?]*\s*"))
            {
                string virke = vm.Value;
                while (virke.Length > raja)
                {
                    int katko = virke.LastIndexOf(' ', raja);
                    int kohta = katko > 0 ? katko : raja;
                    if (pala.Length > 0) { palat.Add(pala); pala = ""; }
                    palat.Add(virke.Substring(0, kohta));
                    virke = virke.Substring(Math.Min(virke.Length, kohta + 1));
                }
                if ((pala + virke).Length > raja && pala.Length > 0) { palat.Add(pala); pala = ""; }
                pala += virke;
            }
            if (pala.Length > 0) palat.Add(pala);
            return palat;
        }

        static IEnumerator Kaanna(string teksti, string kieli, Action<string> valmis)
        {
            if (string.IsNullOrWhiteSpace(teksti)) { valmis(""); yield break; }
            string avain = kieli + "|" + teksti;
            if (kaannosMuisti.TryGetValue(avain, out var vanha)) { valmis(vanha); yield break; }
            var kaannokset = new List<string>();
            foreach (var pala in Paloittele(teksti.Trim()).Take(4))
            {
                using (var r = UnityWebRequest.Get(Kaannos + "?q=" + Uri.EscapeDataString(pala) + "&langpair=" + Uri.EscapeDataString(kieli + "|fi")))
                {
                    r.timeout = 10;
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) { valmis(null); yield break; }
                    Dictionary<string, object> d;
                    try { d = Rakenne.Olio(MiniJson.Jasenna(r.downloadHandler.text)); } catch (FormatException) { valmis(null); yield break; }
                    string k = MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(d, "responseData")), "translatedText");
                    if (string.IsNullOrEmpty(k) || (MiniJson.Luku(d, "responseStatus") ?? 0) != 200) { valmis(null); yield break; }
                    kaannokset.Add(WebUtility.HtmlDecode(k));
                }
            }
            string koko = string.Join(" ", kaannokset);
            kaannosMuisti[avain] = koko;
            valmis(koko);
        }
    }
}
