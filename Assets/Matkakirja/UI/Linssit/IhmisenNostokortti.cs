// IHMISEN MATKAN NOSTOKORTTI (Natiivi-UI): web js/linssit/ihmisen-matka-kortti.js luoNostokortti ja
// css/ihmisen-tutkimus.css .ihmisen-nostokortti. Löytökuvan napautus avaa kortin palkin alle vasempaan
// reunaan: ✕ (Sulje nosto), ajoitus pilkun kanssa, otsikko, "paikka — maa", kuvat (kuvitus, esine,
// aito kuva), löytöteksti ja "Kysy viisaalta pöllöltä pululta" -kysymykset. Valmis vastaus tulee
// kortin sisään lähteineen (LinssiKysymykset), muuten kysymys avaa Pulun yhteisen chatin (PuluChat.Kysy, 1.10.2026).
// Esitys menee kortin ajaksi tauolle ja jatkuu sulkiessa, jos se oli käynnissä.
//
// Kuvatekstit (KuvaSelite, EsineSelite, AitoSelite), aidon kuvan suurennos lähderivillä (web
// kortinKuvalahde: lähde vain suurennoksessa), noston lähderivi ja "Lue lisää" (Tiedeliite: koko juttu →
// IhmisenMatkaLinssi.TiedeliitteenSivu) tulevat Linssisepän korttikentistä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IhmisenNostokortti
    {
        readonly VisualElement kortti;
        readonly ScrollView vieritys;
        readonly Kuvasuurennos suurennos;
        readonly Action<Loytopaikka> lueLisaa;
        bool pysaytin;
        // NOSTOKORTTI-pohja TUMMA (web #3789, Päätoimittaja 1.10.): paikka pohjasta (KAPEA alareuna 45 %/85 %, muuten
        // sivukortti oikealle palkin alle), vetokahva, Esc; ei ✕:ää; toimintorivi Kysy · Lue lisää.
        readonly Vetokahva kahva;
        bool laajennettu;
        float yla, ala;
        VisualElement toimintorivi;

        /// <summary>Auki olevan noston tunnus (web tila.auki), tai null.</summary>
        public string Auki { get; private set; }

        /// <summary>Kortti avautui tai sulkeutui (pulun linssikysymykset seuraavat avointa nostoa).</summary>
        public event Action Muuttui;

        /// <summary>Kortin juurielementti (z-järjestys: kortti kertojan tekstityksen päällä, web z-index 9).</summary>
        public VisualElement El => kortti;

        public IhmisenNostokortti(VisualElement isa, VisualElement suurennoksenKoti, Action<Loytopaikka> lueLisaa)
        {
            this.lueLisaa = lueLisaa;
            suurennos = new Kuvasuurennos(suurennoksenKoti);
            kortti = Rakenne.El("mk-ihmisnosto", isa);
            kortti.style.display = DisplayStyle.None;
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-ihmisnosto__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(vieritys);
            kahva = new Vetokahva(kortti, l => { laajennettu = l; Paikka(); }, Sulje, () => laajennettu);
            isa.RegisterCallback<GeometryChangedEvent>(_ => Paikka());
            Nappaimisto.Rekisteroi("ihmisnosto", 60, () => Auki != null, null, null, Sulje);
        }

        /// <summary>Kortin yläreuna palkin alle (turva-alueen koordinaateissa).</summary>
        public float Yla { set { yla = value; Paikka(); } }
        /// <summary>Alareunan varaus (aikaselain näkyvissä: sen korkeus + väli), ettei kortti peitä aikaselainta (savuke 101).</summary>
        public float Ala { set { ala = value; Paikka(); } }

        void Paikka()
        {
            var isa = kortti.parent;
            if (isa == null) return;
            float W = isa.layout.width, H = isa.layout.height, m = Tyylikirja.Vali.M, alin = Mathf.Max(ala, m);
            if (float.IsNaN(W) || W <= 0 || H <= 0) return;
            bool kapea = Pohja.Leveys(W) == Pohja.Luokka.Kapea;
            if (kapea)
            {
                kortti.style.left = m; kortti.style.right = m; kortti.style.width = StyleKeyword.Auto;
                kortti.style.top = StyleKeyword.Auto; kortti.style.bottom = alin;
                kortti.style.maxHeight = Mathf.Round(Mathf.Min(H - yla - alin, H * (laajennettu ? Tyylikirja.Peitto.Laajennettu : Tyylikirja.Peitto.Max) / 100f));
            }
            else
            {
                kortti.style.left = StyleKeyword.Auto; kortti.style.right = m; kortti.style.width = Pohja.Sivukortti(W);
                kortti.style.top = yla; kortti.style.bottom = StyleKeyword.Auto;
                kortti.style.maxHeight = Mathf.Round(H - yla - alin);
            }
            kortti.style.maxWidth = StyleKeyword.None;
            kahva.Juuri.style.display = kapea ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Web avaa(tunnus): sama nosto uudestaan sulkee.</summary>
        public bool Avaa(Loytopaikka p)
        {
            if (p == null) return false;
            if (Auki == p.Tunnus) { Sulje(); return false; }
            Auki = p.Tunnus;
            paikka = p;
            toimintorivi?.RemoveFromHierarchy();
            toimintorivi = null;
            laajennettu = false;
            var s = vieritys.contentContainer;
            s.Clear();
            vieritys.scrollOffset = Vector2.zero;

            var ajoitus = Rakenne.El("mk-ihmisnosto__ajoitus", s, PickingMode.Ignore);
            Rakenne.El("mk-ihmisnosto__pilkku", ajoitus, PickingMode.Ignore);
            // Kapiteeli "ajoitus · paikka — maa" virran värisellä pisteellä (web #3789 KorttiData.ylaVari).
            string paikkaRivi = string.IsNullOrEmpty(p.Paikka) ? "" : " · " + (string.IsNullOrEmpty(p.Maa) ? p.Paikka : p.Paikka + " — " + p.Maa);
            Kirjasimet.Aseta(Rakenne.Teksti(((p.Ajoitus ?? "") + paikkaRivi).ToUpperInvariant(), "mk-ihmisnosto__ajoitusteksti", ajoitus), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(p.Otsikko ?? "", "mk-ihmisnosto__otsikko", s), Tyylikirja.Kirjain.Otsikko);

            // Kuva-alue (web: kuvitus, esine 38 %, aito kuva sovitettuna).
            var kuvat = Rakenne.El("mk-ihmisnosto__kuvat", s, PickingMode.Ignore);
            // Kuvasäännöt (UI-pohjat): ensimmäinen kuva hero 2:1 koko leveydelle, toinen upotus 4:3 tekstin oikealle.
            const float Hero = 0.5f, Upotus = 0.75f;
            if (!string.IsNullOrEmpty(p.Kuva)) Kuva(kuvat, p.Kuva, p.KuvaSelite, "mk-ihmisnosto__kuvakehys--kuvitus", Hero, null);
            if (!string.IsNullOrEmpty(p.Esine)) Kuva(kuvat, p.Esine, p.EsineSelite, "mk-ihmisnosto__kuvakehys--esine", kuvat.childCount > 0 ? Upotus : Hero, null);
            if (!string.IsNullOrEmpty(p.Aito))
            {
                // Aito kuva on suurennettava, ja sen lähderivi näkyy suurennoksessa (web KUVALAHDE_VAIN_SUURENNOKSESSA).
                string aito = p.Aito, selite = p.AitoSelite ?? "Aito kuva";
                string lahde = p.AidonTiedot != null && p.AidonTiedot.TryGetValue("lahde", out var l) ? l as string : null;
                Kuva(kuvat, aito, selite, "mk-ihmisnosto__kuvakehys--aito", kuvat.childCount > 0 ? Upotus : Hero,
                    () => suurennos.Avaa(new List<LehtiKuva> { new LehtiKuva { Lahde = aito, Selite = selite, LahdeRivi = lahde } }));
            }
            if (kuvat.childCount == 0) kuvat.style.display = DisplayStyle.None;

            string teksti = p.KortinTeksti;
            // Kaksi kuvaa (omistaja 1.10.2026 klo 09.2x, web .ihmisen-nostokortti-runko + .kellu): maisemakuva yksin koko
            // leveydelle, toinen kuva tekstin oikealle puolelle ja teksti kiertää sen.
            if (kuvat.childCount == 2 && teksti.Length > 0)
            {
                Kierra(s, kuvat[1], teksti);
                kuvat[0].style.marginRight = 0; // maisemakuva koko leveydelle (web 326,6 px iPhonella)
            }
            else if (teksti.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-ihmisnosto__teksti", s), Kirjasin.Luku);
            if (!string.IsNullOrEmpty(p.Lahde)) Kirjasimet.Aseta(Rakenne.Teksti(p.Lahde, "mk-ihmisnosto__lahde", s), Kirjasin.Luku);
            // Toimintorivi (web #3789): Kysy (kun kysymyksiä: Pulun chat noston valmiine kysymyksineen) · Lue lisää (ensisijainen,
            // kun tiedeliite on). Inline-kysymykset ja kortin oma vastauskupla poistuivat.
            var valmiit = !p.Lisanosto ? LinssiKysymykset.Tunnukselle(p.Tunnus) : null;
            var kysymykset = (valmiit != null && valmiit.Kysymykset.Count > 0 ? valmiit.Kysymykset : p.Kysymykset.ToList())
                .Where(k => !string.IsNullOrEmpty(k)).Take(3).ToList();
            bool lue = p.Juttu && lueLisaa != null && (LinssiUi.IhmisenMatka?.TiedeliitteenSivu(p.Tunnus) ?? -1) >= 0;
            if (kysymykset.Count > 0 || lue)
            {
                toimintorivi = Rakenne.El("mk-nosto__toiminnot mk-ihmisnosto__toiminnot", kortti, PickingMode.Ignore);
                kortti.AddToClassList("mk-nosto--toiminnot");
                if (kysymykset.Count > 0)
                {
                    var aihe = new PuluChat.Aihe
                    {
                        Otsake = "Ihmisen matkan löytö, josta pelaaja kysyy",
                        Nimi = string.Join(", ", new[] { p.Otsikko, p.Paikka, p.Maa }.Where(x => !string.IsNullOrWhiteSpace(x))),
                        Tyyppi = p.Ajoitus,
                        Teksti = p.Loyto,
                    };
                    var parit = kysymykset.Select(k => (k, valmiit != null && valmiit.Vastaukset.TryGetValue(k.Trim(), out var v) ? v.Vastaus : null)).ToList();
                    Kirjasimet.Aseta(Rakenne.Nappi("Kysy", "mk-nosto__toiminto", () =>
                    {
                        var c = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
                        if (c == null) return;
                        if (parit.Any(x => x.Item2 != null)) c.AvaaValmiilla(aihe, parit); else c.AvaaKortista(aihe, kysymykset);
                    }, toimintorivi), Kirjasin.KoneLihava);
                }
                if (lue)
                {
                    var paikka = p;
                    var b = Rakenne.Nappi("Lue lisää", "mk-nosto__toiminto mk-nappi--kulta", () => lueLisaa(paikka), toimintorivi);
                    b.tooltip = "Tiedeliite: koko juttu";
                    Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
                }
            }
            else kortti.RemoveFromClassList("mk-nosto--toiminnot");

            kortti.style.display = DisplayStyle.Flex;
            kortti.BringToFront();
            Paikka();
            Rakenne.Nayta(kortti, true, Tyylikirja.Kesto.Avaus);
            // Esitys tauolle kortin ajaksi; jatko sulusta (web tila.pysaytin).
            var e = LinssiUi.IhmisenMatka?.Esitys;
            if (e != null && e.Kaynnissa) { e.Tauko(); pysaytin = true; }
            Muuttui?.Invoke();
            return true;
        }

        public void Sulje()
        {
            if (Auki == null) return;
            Auki = null;
            Rakenne.Nayta(kortti, false, Tyylikirja.Kesto.Sulku);
            suurennos.Sulje();
            laajennettu = false;
            if (pysaytin) { pysaytin = false; LinssiUi.IhmisenMatka?.Esitys?.Jatka(); }
            Muuttui?.Invoke();
        }

        /// <summary>Linssi pois tai esitys alusta: kortti kiinni ilman jatkoa.</summary>
        public void Pois()
        {
            pysaytin = false;
            Sulje();
        }

        static void Kuva(VisualElement isa, string url, string selite, string luokka, float suhde, Action suurenna)
        {
            var kehys = Rakenne.El("mk-ihmisnosto__kuvakehys " + luokka, isa, PickingMode.Ignore);
            var k = Rakenne.El("mk-ihmisnosto__kuva", kehys, suurenna != null ? PickingMode.Position : PickingMode.Ignore);
            if (suurenna != null) k.RegisterCallback<ClickEvent>(_ => suurenna());
            if (!string.IsNullOrEmpty(selite)) Kirjasimet.Aseta(Rakenne.Teksti(selite, "mk-ihmisnosto__kuvateksti", kehys), Kirjasin.Luku);
            k.RegisterCallback<GeometryChangedEvent>(ev =>
            {
                float h = Mathf.Round(ev.newRect.width * suhde);
                if (ev.newRect.width > 0 && Mathf.Abs(ev.newRect.height - h) > 0.5f) k.style.height = h;
            });
            // Puuttuva kuva pois (web ilmanVaraa / error → kehys pois).
            Kuvat.Hae(url, t => { if (t == null) kehys.RemoveFromHierarchy(); else k.style.backgroundImage = new StyleBackground(t); });
        }

        /// <summary>
        /// Web float: right (.ihmisen-nostokortti-kuvakehys.kellu, leveys 38 %, vasen väli 0,75 rem) ilman UI Toolkitin
        /// floatia: teksti jaetaan kahteen osaan. Kuvan vieressä on niin monta riviä kuin kuvan korkeuteen (kuvateksti ja
        /// marginaalit mukana) alkaa, eli sama sääntö kuin selaimen kelluvalla laatikolla; loput sanat koko leveydellä
        /// kuvan alla. Jako lasketaan uudelleen, kun leveys tai kuvan korkeus muuttuu (kuva latautuu, kierto).
        /// </summary>
        static void Kierra(VisualElement isa, VisualElement sivukuva, string teksti)
        {
            var runko = Rakenne.El("mk-ihmisnosto__runko", isa, PickingMode.Ignore);
            var rivi = Rakenne.El("mk-ihmisnosto__runkorivi", runko, PickingMode.Ignore);
            var yla = Rakenne.Teksti(teksti, "mk-ihmisnosto__teksti mk-ihmisnosto__teksti--kuvanvieressa", rivi);
            Kirjasimet.Aseta(yla, Kirjasin.Luku);
            sivukuva.RemoveFromHierarchy();
            sivukuva.AddToClassList("mk-ihmisnosto__kuvakehys--kellu");
            rivi.Add(sivukuva);
            var ala = Rakenne.Teksti("", "mk-ihmisnosto__teksti mk-ihmisnosto__teksti--kuvanalla", runko);
            Kirjasimet.Aseta(ala, Kirjasin.Luku);
            ala.style.display = DisplayStyle.None;
            var sanat = teksti.Split(' ');
            var edellinen = (-1f, -1f);
            void Jaa()
            {
                // Kuva poistui (latausvirhe): koko teksti yhteen osaan.
                if (sivukuva.parent != rivi) { yla.text = teksti; ala.style.display = DisplayStyle.None; return; }
                float w = rivi.contentRect.width, kuvaW = sivukuva.layout.width;
                var ks = sivukuva.resolvedStyle;
                float kuvaH = sivukuva.layout.height + ks.marginTop + ks.marginBottom;
                if (float.IsNaN(w) || float.IsNaN(kuvaH) || w <= 0 || kuvaW <= 0 || kuvaH <= 0) return;
                if (Mathf.Abs(edellinen.Item1 - w) < 0.5f && Mathf.Abs(edellinen.Item2 - kuvaH) < 0.5f) return;
                edellinen = (w, kuvaH);
                float tila = w - kuvaW - ks.marginLeft - ks.marginRight;
                if (tila <= 0) return;
                float Korkeus(int n) => yla.MeasureTextSize(string.Join(" ", sanat, 0, n), tila, VisualElement.MeasureMode.Exactly, 0, VisualElement.MeasureMode.Undefined).y;
                float riviK = Korkeus(1);
                if (float.IsNaN(riviK) || riviK <= 0) return;
                // Selain: rivi asettuu kuvan viereen, jos sen yläreuna on kuvan alareunan yläpuolella.
                float raja = Mathf.CeilToInt(kuvaH / riviK - 0.01f) * riviK + 0.5f;
                int lo = 1, hi = sanat.Length;
                while (lo < hi)
                {
                    int keski = (lo + hi + 1) / 2;
                    if (Korkeus(keski) <= raja) lo = keski; else hi = keski - 1;
                }
                yla.text = string.Join(" ", sanat, 0, lo);
                ala.text = lo < sanat.Length ? string.Join(" ", sanat, lo, sanat.Length - lo) : "";
                ala.style.display = lo < sanat.Length ? DisplayStyle.Flex : DisplayStyle.None;
            }
            rivi.RegisterCallback<GeometryChangedEvent>(_ => Jaa());
            sivukuva.RegisterCallback<GeometryChangedEvent>(_ => Jaa());
        }

        Loytopaikka paikka;

        /// <summary>Testi (linssi matka nosto &lt;n&gt; kysy &lt;k&gt;): toimintorivin Kysy (k &lt; 0) tai Lue lisää (k = 99).</summary>
        /// <summary>Testikomento ui linssi matka veto laajenna|pienenna|alas: kuin vetokahvan veto (savuke 106: ui nostonappi koskee
        /// vain kartan nostokorttia).</summary>
        public string TestiVeto(string suunta)
        {
            if (Auki == null) return "ihmisen matkan nostokortti ei ole auki";
            if (suunta == "alas") { Sulje(); return "kahva alas: suljettu"; }
            if (suunta != "laajenna" && suunta != "pienenna") return "ui linssi matka veto laajenna|pienenna|alas";
            laajennettu = suunta == "laajenna";
            Paikka();
            return (laajennettu ? "laajennettu" : "pienennetty") + ", korkeus enintään " + kortti.style.maxHeight.value.value;
        }

        public string TestiKysy(int n)
        {
            if (toimintorivi == null) return "ei toimintoriviä";
            var napit = toimintorivi.Query<Button>(className: "mk-nosto__toiminto").ToList();
            var b = n == 99 ? napit.LastOrDefault() : napit.FirstOrDefault();
            if (b == null) return "ei nappia";
            using (var e = NavigationSubmitEvent.GetPooled()) { e.target = b; b.SendEvent(e); }
            return "painettu " + b.text;
        }
    }
}
