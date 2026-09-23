// NOSTOKORTTI (Natiivi-UI): karttavalon napautuksesta avautuva kortti — webin
// fokuskohde (js/fokuskohteet.js), skandaalin lisälehti (js/skandaalit.js), historian
// hetki (js/historian-hetket.js) ja eläintäky (js/elaintaky.js) yhtenä näkymänä.
//
// Kuva edellä kahdessa vaiheessa (js/nostokuva.js): 1) pelkkä kuva, lyhyt kuvateksti ja
// LISÄÄ; 2) koko kortti (kuvasarja ‹ › ja laskuri, teksti kappaleittain, lajin lohkot).
// Kuvaton kortti aukeaa suoraan vaiheeseen 2. Kuvan napautus vaiheessa 2 avaa suurennoksen
// (pitkä selite ja lähderivi). Sulkeminen: × tai napautus kortin ohi.
//
//   skandaali  nimiö LISÄLEHTI, "paikka · vuosi" kaksoisviivojen välissä, otsikko, ingressi,
//              kuvat, teksti, minivisa (+50, Kaupat.Minitehtava(iso, "skandaali:<id>"))
//   hetki      "paikka · päiväys", kuvat, teksti, minivisa (+50, "hetki:<id>")
//   eläin      kuva(t), teksti, palkkiorivi (Kaupat.Elaintaky(iso, 20) vaiheessa 2)
//   kohde      luokka, nimi, kuvat, teksti, LUKIJAN KYSYMYS (+25, "nosto"/id),
//              "Kysy viisaalta pöllöltä pululta:" (PuluChat.Kysy), kierrokset (ulkoinen linkki)
// Pelin tila muuttuu vain PeliOhjain.KauppaTeko-kutsuilla (Pelikoodari). Kerros 40, pallo lukittu.
// Kohdekortin korostetut sanat (web fokuskohteet piirraKorostettuSana): kunkin korostuksen
// ensimmäinen esiintymä tekstissä on alleviivattu linkki, napautus → pulu "Kerro lisää: X (kohteessa Y)".
// Kaiutin (web js/lukija.js lisaaLukijanappi, KortinLukija) vaiheessa 2 sulkuruksin vieressä.
// Ero webiin: kortti on keskellä (ei napautuspisteen vieressä).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Nostokortti
    {
        readonly VisualElement kerros, kortti;
        // Suurennos selattavana sarjana (web fokuskohteet.js avaaKohdeSuurennos ‹ ›).
        readonly Kuvasuurennos suurennos;
        readonly ScrollView sisus;
        readonly Button sulje;
        readonly KortinLukija lukija;

        Nosto nosto;
        int kuvaIndeksi, versio;

        public bool Auki { get; private set; }

        public Nostokortti(UiKerros ui)
        {
            kerros = Rakenne.El("mk-himmennys mk-nosto__kerros", ui.Juuri(UiKerros.Valikot));
            kerros.style.display = DisplayStyle.None;
            kerros.RegisterCallback<PointerDownEvent>(e => { if (e.target == kerros) Sulje(); });
            kortti = Rakenne.El("mk-nosto", kerros);
            sisus = new ScrollView(ScrollViewMode.Vertical);
            sisus.AddToClassList("mk-nosto__sisus");
            sisus.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisus.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(sisus);
            sulje = Rakenne.Nappi("×", "mk-nosto__sulje", Sulje, kortti);
            sulje.tooltip = "Sulje";
            lukija = new KortinLukija(kortti, luokka: "mk-nosto__lukija");
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);

            suurennos = new Kuvasuurennos(ui.Juuri(UiKerros.Valikot));
        }

        /// <summary>Avaa kortin karttavalon id:llä (UiPalvelut.ValoNapautettu, testikomento).</summary>
        public void Avaa(string valoId)
        {
            int v = ++versio;
            UiKerros.Hae().StartCoroutine(NostoSisalto.Hae(valoId, n =>
            {
                if (v != versio) return;
                if (n == null) { Debug.Log("MATKAKIRJA ui nostot: ei sisältöä valolle " + valoId); return; }
                Nayta(n);
            }));
        }

        public void Sulje()
        {
            versio++;
            if (!Auki) return;
            Auki = false;
            lukija.Pysayta();
            Rakenne.Nayta(kerros, false, 200);
            suurennos.Sulje();
            SyoteLukko.Vapauta(this);
        }

        void Nayta(Nosto n)
        {
            nosto = n;
            kuvaIndeksi = 0;
            kortti.EnableInClassList("mk-nosto--looppi", n.Laji == NostoLaji.Skandaali);
            kortti.EnableInClassList("mk-nosto--kohde", n.Laji == NostoLaji.Kohde);
            if (n.Kuvat.Count > 0) Vaihe1(); else Vaihe2();
            if (!Auki)
            {
                Auki = true;
                Rakenne.Nayta(kerros, true, 220);
                SyoteLukko.Esta(this);
            }
        }

        // --- vaihe 1: kuva edellä ------------------------------------------------------------

        void Vaihe1()
        {
            sisus.Clear();
            sisus.scrollOffset = Vector2.zero;
            sulje.style.display = DisplayStyle.None;
            lukija.Aseta(null);
            kortti.AddToClassList("mk-nosto--esittely");
            var k = nosto.Kuvat[0];
            var kuva = Kuvakehys(sisus, k, Vaihe2);
            var alarivi = Rakenne.El("mk-nosto__esittelyrivi", sisus, PickingMode.Ignore);
            var lyhyt = Rakenne.Teksti(k.Lyhyt ?? nosto.Otsikko ?? "", "mk-nosto__kuvateksti", alarivi);
            Kirjasimet.Aseta(lyhyt, Kirjasin.LukuKursiivi);
            var lisaa = Rakenne.Nappi("LISÄÄ", "mk-nosto__lisaa", Vaihe2, alarivi);
            Kirjasimet.Aseta(lisaa, Kirjasin.KoneLihava);
        }

        // --- vaihe 2: koko kortti ----------------------------------------------------------

        void Vaihe2()
        {
            sisus.Clear();
            sisus.scrollOffset = Vector2.zero;
            sulje.style.display = DisplayStyle.Flex;
            kortti.RemoveFromClassList("mk-nosto--esittely");
            var n = nosto;
            // Web: lööppi kuuluu luentaan; otsikko lajin mukaan (skandaalit.js, historian-hetket.js,
            // elaintaky.js, fokuskohteet.js lisaaLukijanappi).
            lukija.Aseta(new[] { n.Otsikko, n.Ingressi }.Concat(Kappaleet(n.Teksti)),
                n.Laji == NostoLaji.Skandaali ? "Kuuntele lisälehti"
                : n.Laji == NostoLaji.Kohde ? "Kuuntele: " + (n.Otsikko ?? "")
                : n.Laji == NostoLaji.Elain ? "Kuuntele eläinkortti" : "Kuuntele hetki");

            var yla = Rakenne.Teksti(n.Luokka ?? "", "mk-nosto__ylarivi", sisus);
            Kirjasimet.Aseta(yla, Kirjasin.Kone);
            if (n.Laji == NostoLaji.Skandaali)
            {
                var nimio = Rakenne.Teksti("LISÄLEHTI", "mk-nosto__nimio", sisus);
                Kirjasimet.Aseta(nimio, Kirjasin.Kone);
                if (n.Meta != null)
                {
                    var p = Rakenne.El("mk-nosto__paivays", sisus, PickingMode.Ignore);
                    var pt = Rakenne.Teksti(n.Meta.ToUpperInvariant(), "mk-nosto__paivaysteksti", p);
                    Kirjasimet.Aseta(pt, Kirjasin.Kone);
                }
            }
            var otsikko = Rakenne.Teksti(n.Otsikko ?? "", "mk-nosto__otsikko", sisus);
            Kirjasimet.Aseta(otsikko, n.Laji == NostoLaji.Kohde ? Kirjasin.KoneLihava : Kirjasin.LukuLihava);
            if (n.Laji == NostoLaji.Hetki && n.Meta != null)
                Kirjasimet.Aseta(Rakenne.Teksti(n.Meta, "mk-nosto__meta", sisus), Kirjasin.Kone);
            if (!string.IsNullOrEmpty(n.Ingressi))
                foreach (var k in Kappaleet(n.Ingressi)) Kirjasimet.Aseta(Rakenne.Teksti(k, "mk-nosto__ingressi", sisus), Kirjasin.LukuLihava);

            if (n.Kuvat.Count > 0) Kuvasarja(sisus);

            var jaljella = n.Laji == NostoLaji.Kohde ? n.Korostukset.Select(PuraKorostus).Where(x => x.HasValue).Select(x => x.Value).ToList()
                : new List<(string Perus, string Nakyva)>();
            foreach (var k in Kappaleet(n.Teksti))
            {
                var l = Rakenne.Teksti(Korosta(k, jaljella), "mk-nosto__teksti", sisus);
                if (!l.text.Contains("<link=")) continue;
                l.pickingMode = PickingMode.Position;
                string nimi = n.Otsikko;
                l.RegisterCallback<UnityEngine.UIElements.Experimental.PointerUpLinkTagEvent>(e =>
                {
                    if (string.IsNullOrEmpty(e.linkID)) return;
                    Sulje();
                    UiNakymat.Hae()?.Chat.Kysy($"Kerro lisää: {e.linkID} (kohteessa {nimi})");
                });
            }

            if (n.Visa != null) Visa(sisus, n);
            if (n.Laji == NostoLaji.Elain) Elainpalkkio(sisus, n);
            if (n.Laji == NostoLaji.Kohde)
            {
                if (n.Kysymykset.Count > 0)
                {
                    var q = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-nosto__kysyotsikko", sisus);
                    q.enableRichText = true;
                    Kirjasimet.Aseta(q, Kirjasin.KoneLihava);
                    foreach (var kysymys in n.Kysymykset)
                    {
                        string kk = kysymys;
                        var b = Rakenne.Nappi(kk, "mk-nosto__kysymys", () => { Sulje(); UiNakymat.Hae()?.Chat.Kysy(kk); }, sisus);
                        Kirjasimet.Aseta(b, Kirjasin.Luku);
                    }
                }
                foreach (var (nappi, url) in n.Kierrokset)
                {
                    string u = url;
                    var b = Rakenne.Nappi(nappi.ToUpperInvariant() + " ›", "mk-nosto__kierros", () => Application.OpenURL(u), sisus);
                    Kirjasimet.Aseta(b, Kirjasin.Kone);
                }
            }
        }

        /// <summary>Tyhjä rivi erottaa kappaleet; muuten ≥ 3 virkkeen teksti puolitetaan (web jaaKappaleiksi).</summary>
        static (string Perus, string Nakyva)? PuraKorostus(string merkinta)
        {
            string t = (merkinta ?? "").Trim();
            if (t.Length == 0) return null;
            int p = t.IndexOf('|');
            if (p < 0) return (t, t);
            string perus = t.Substring(0, p).Trim(), nakyva = t.Substring(p + 1).Trim();
            return perus.Length == 0 || nakyva.Length == 0 ? ((string, string)?)null : (perus, nakyva);
        }

        /// <summary>Kappaleen korostukset linkeiksi; käytetty korostus poistuu jäljellä olevista (kerran per kortti).</summary>
        static string Korosta(string kappale, List<(string Perus, string Nakyva)> jaljella)
        {
            string Suojaa(string x) => x.Replace("<", "<noparse><</noparse>");
            if (jaljella.Count == 0) return Suojaa(kappale);
            var sb = new System.Text.StringBuilder();
            string loppu = kappale;
            while (true)
            {
                int paras = -1; (string Perus, string Nakyva) osuma = default;
                foreach (var k in jaljella)
                {
                    int i = loppu.IndexOf(k.Nakyva, StringComparison.OrdinalIgnoreCase);
                    if (i >= 0 && (paras < 0 || i < paras)) { paras = i; osuma = k; }
                }
                if (paras < 0) break;
                sb.Append(Suojaa(loppu.Substring(0, paras)));
                sb.Append("<link=\"").Append(osuma.Perus.Replace("\"", "")).Append("\"><color=#7a5514><u>")
                  .Append(Suojaa(loppu.Substring(paras, osuma.Nakyva.Length))).Append("</u></color></link>");
                loppu = loppu.Substring(paras + osuma.Nakyva.Length);
                jaljella.Remove(osuma);
            }
            sb.Append(Suojaa(loppu));
            return sb.ToString();
        }

        static List<string> Kappaleet(string teksti)
        {
            var l = new List<string>();
            if (string.IsNullOrWhiteSpace(teksti)) return l;
            var osat = Regex.Split(teksti.Trim(), @"\n\s*\n").Select(x => x.Trim()).Where(x => x.Length > 0).ToList();
            if (osat.Count > 1) return osat;
            var virkkeet = Regex.Split(teksti.Trim(), @"(?<=[.!?])\s+(?=[A-ZÅÄÖ""“])");
            if (virkkeet.Length < 3) { l.Add(teksti.Trim()); return l; }
            int puoli = (virkkeet.Length + 1) / 2;
            l.Add(string.Join(" ", virkkeet.Take(puoli)));
            l.Add(string.Join(" ", virkkeet.Skip(puoli)));
            return l;
        }

        // --- kuvat ------------------------------------------------------------------------

        VisualElement Kuvakehys(VisualElement isa, NostoKuva k, Action napautus)
        {
            var kehys = Rakenne.El("mk-nosto__kuvakehys", isa);
            var kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => napautus?.Invoke());
            // 3:2-kehys leveyden mukaan (web oletussuhde).
            kehys.RegisterCallback<GeometryChangedEvent>(e => { if (e.newRect.width > 0) kehys.style.height = Mathf.Round(e.newRect.width * 2f / 3f); });
            int v = versio;
            NostoSisalto.HaeKuva(k.Lahde, t => { if (t != null && v == versio) kuva.style.backgroundImage = new StyleBackground(t); });
            return kehys;
        }

        void Kuvasarja(VisualElement isa)
        {
            var kuvat = nosto.Kuvat;
            var lohko = Rakenne.El("mk-nosto__kuvasarja", isa, PickingMode.Ignore);
            var kehysPaikka = Rakenne.El("mk-nosto__kuvapaikka", lohko, PickingMode.Ignore);
            var teksti = Rakenne.Teksti("", "mk-nosto__kuvateksti", lohko);
            Kirjasimet.Aseta(teksti, Kirjasin.LukuKursiivi);
            Label laskuri = null;
            void Nayta(int i)
            {
                kuvaIndeksi = (i + kuvat.Count) % kuvat.Count;
                kehysPaikka.Clear();
                var k = kuvat[kuvaIndeksi];
                int kohta = kuvaIndeksi;
                var kehys = Kuvakehys(kehysPaikka, k, () => Suurenna(kohta));
                teksti.text = k.Lyhyt ?? "";
                teksti.style.display = string.IsNullOrEmpty(k.Lyhyt) ? DisplayStyle.None : DisplayStyle.Flex;
                if (kuvat.Count > 1)
                {
                    var ed = Rakenne.Nappi("‹", "mk-nosto__selaa mk-nosto__selaa--vasen", () => Nayta(kuvaIndeksi - 1), kehys);
                    var se = Rakenne.Nappi("›", "mk-nosto__selaa mk-nosto__selaa--oikea", () => Nayta(kuvaIndeksi + 1), kehys);
                    ed.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                    se.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                    laskuri = Rakenne.Teksti($"{kuvaIndeksi + 1} / {kuvat.Count}", "mk-nosto__laskuri", kehys);
                    Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
                }
            }
            Nayta(kuvaIndeksi);
        }

        void Suurenna(int alku)
        {
            var sarja = nosto.Kuvat.Select(k => new LehtiKuva
            {
                Lahde = k.Lahde, Lyhyt = k.Lyhyt, Selite = k.Selite ?? k.Lyhyt,
                LahdeRivi = string.Join(" · ", new[] { k.Tekija, k.LahdeRivi }.Where(x => !string.IsNullOrEmpty(x))),
            }).ToList();
            suurennos.Avaa(sarja, alku);
        }

        // --- minivisa ja palkkiot -----------------------------------------------------------

        void Visa(VisualElement isa, Nosto n)
        {
            var laatikko = Rakenne.El("mk-nosto__visa", isa, PickingMode.Ignore);
            if (n.Laji == NostoLaji.Kohde) Kirjasimet.Aseta(Rakenne.Teksti("LUKIJAN KYSYMYS", "mk-nosto__visaotsikko", laatikko), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(n.Visa.Kysymys, "mk-nosto__visakysymys", laatikko), Kirjasin.LukuLihava);
            var o = PeliOhjain.Instanssi;
            bool vastattu = o?.Kaupat != null && o.Kaupat.MinitehtavaVastattu(n.VisaKaupunki, n.VisaAihe);
            if (vastattu)
            {
                Rakenne.Teksti(n.Visa.Fakta ?? "Tähän on jo vastattu.", "mk-nosto__visavihje", laatikko);
                return;
            }
            Rakenne.Teksti(n.Laji == NostoLaji.Kohde ? $"Vastaus löytyy tästä jutusta · +{n.VisaPalkkio} puntaa"
                : $"Oikeasta vastauksesta saat {n.VisaPalkkio} puntaa.", "mk-nosto__visavihje", laatikko);
            var napit = new List<Button>();
            var tulos = Rakenne.Teksti("", "mk-nosto__visatulos", laatikko);
            tulos.style.display = DisplayStyle.None;
            for (int i = 0; i < n.Visa.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                var b = Rakenne.Nappi(n.Visa.Vaihtoehdot[i], "mk-nosto__visanappi", null, laatikko);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                b.clicked += () =>
                {
                    bool oikein = valinta == n.Visa.Oikea;
                    var t = PeliOhjain.Instanssi?.KauppaTeko(k => k.Minitehtava(n.VisaKaupunki, n.VisaAihe, oikein, n.VisaPalkkio));
                    foreach (var x in napit) x.SetEnabled(false);
                    napit[n.Visa.Oikea].AddToClassList("mk-oikein");
                    if (!oikein) b.AddToClassList("mk-vaarin");
                    tulos.text = t != null && !t.Ok && t.Virhe != null && t.Virhe != "Jo vastattu" ? t.Virhe
                        : oikein ? $"Oikein! +{n.VisaPalkkio} puntaa." : $"Oikea vastaus: {n.Visa.Vaihtoehdot[n.Visa.Oikea]}.";
                    if (!string.IsNullOrEmpty(n.Visa.Fakta)) tulos.text += " " + n.Visa.Fakta;
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.style.display = DisplayStyle.Flex;
                };
                napit.Add(b);
            }
        }

        void Elainpalkkio(VisualElement isa, Nosto n)
        {
            // Web: palkkio maksetaan, kun sisältö ladotaan (kuvallisella kortilla LISÄÄ-napista).
            var o = PeliOhjain.Instanssi;
            string teksti;
            if (o == null) teksti = "Eläin on kirjattu.";
            else
            {
                var t = o.KauppaTeko(k => k.Elaintaky(n.Iso, KauppaVakiot.ElaintakyPalkkio));
                teksti = t == null || !t.Ok ? "Eläin on kirjattu."
                    : t.Uusi ? $"Löytöpalkkio +{t.Palkkio} puntaa lisätty kukkaroon." : "Tämä eläin on jo löydetty.";
                if (t != null && t.Ok && !t.Uusi) teksti = "Tämä eläin on jo löydetty.";
            }
            var l = Rakenne.Teksti(teksti, "mk-nosto__palkkio", isa);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
        }
    }
}
