// NÄHTÄVYYSARKKI JA TURISTIOPAS (Natiivi-UI): webin #nahtavyys-dialog (js/nahtavyydet.js
// avaaNahtavyys, js/opas.js taitaOpas, css .nahtavyys-arkki / .opas-*; speksi
// docs/raportit/natiivi-ui-nahtavyydet-opas-speksi-20260923.md kohdat 2 ja 4).
//
// Arkki: lehden paperi (#f5f0e2, oppaassa #f8efdc), keskitetty; puhelimessa ankkuroitu
// alareunaan 0,6 rem + turva-alue. Leveys puhelimessa min(90 %, 640), leveällä
// min(92 %, 860), oppaassa min(84 %, 840). Otsikko ja kaiutin ylhäällä (oppaassa isona
// aksenttivärillä, pysyy paikallaan vieritettäessä kuten webin sticky), sisältö vierii,
// Sulje alhaalla. Napautus taustaan sulkee (ensin kuvasuurennos).
//
// Nähtävyysjuttu: "KOHDE n · aika", otsikko, kappaleet (vuosiluvut lihavoituna),
// ensimmäisen kappaleen jälkeen kuva tai karuselli, lainaus puolivälissä, lähderivi.
// Opas: ingressi, "Kaupunki lyhyesti" -kainalo (Parasta täällä ★, Hyvä tietää; rivin
// napautus → pikkuseloste), jaksot väliotsikoin (kuva tekstin jälkeen tai kapeana
// oikealla), "Milloin matkaan?" jakson 1 jälkeen (säägraafi, paras aika, kaudet),
// nosto jakson 2 jälkeen, "Suunnittele matka" -linkit.
// Leveys ≥ 640 pt: kainalo, kapea kuva ja säägraafi rinnakkain tekstin kanssa (webin
// float); kapeammalla allekkain kuten webin puhelintaitto.
// Kohdekartan juttu (AvaaKohde): ☰ oikeassa yläkulmassa = saman kaupungin muut kohteet (teksti tai
// wiki, ≥ 2), ‹ › reunoilla ja 40 pt:n vaakapyyhkäisy = selattavat (teksti + kuva), kiertää ympäri
// (web taytaNahtavyysValikko, varustaNahtavyysSelaus). Oppaassa ei valikkoa eikä nuolia.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Kaupunkikartan kohteen juttu (web nahtavyydet + kohdekartan kohde).</summary>
    public sealed class NahtavyysKohde
    {
        public string Nimi, Aika, Teksti, Wiki, Lahde, LainausTeksti, LainausLahde;
        public List<LehtiKuva> Kuvat = new List<LehtiKuva>();
    }

    public sealed class Nahtavyysarkki
    {
        const int Kerros = UiKerros.Traileri; // lehtiarkin päälle (luodaan lehden jälkeen)
        const float Levearaja = 640f;

        readonly UiKerros ui;
        readonly VisualElement peite, arkki, ylaosa, sisus;
        readonly Label aika, otsikko;
        readonly Button kaiutin;
        readonly ScrollView vieritys;
        readonly Kuvasuurennos suurennos;
        readonly List<string> luettavat = new List<string>();
        readonly Button valikkoNappi, edellinen, seuraava;
        readonly VisualElement valikko;
        Kohdekartta kartta;
        KohdekarttaKohde nykyinen;
        bool opas, luetaan;
        int lukuVersio;

        public bool Auki { get; private set; }
        public event Action Suljettu;
        /// <summary>Arkki tuli näkyviin (pulun kerros väistää sen alle, UiNakymat).</summary>
        public event Action Avautui;
        /// <summary>Auki olevan nähtävyysjutun poiminta-avain juttu:kaupunki:nimi (web juttuAvain) tai null.</summary>
        public string AukiAvain => Auki && !opas && nykyinen != null
            ? Reaktiot.JuttuAvain(kartta?.Kaupunki ?? PeliOhjain.Instanssi?.PelaajanKaupunki, nykyinen.Nimi) : null;

        public Nahtavyysarkki(UiKerros ui)
        {
            this.ui = ui;
            var juuri = ui.Juuri(Kerros);
            peite = Rakenne.El("mk-nahtavyys__peite", juuri);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(e => { if (e.target == peite) Sulje(); });
            arkki = Rakenne.El("mk-nahtavyys", peite);
            Kuviot.AsetaArkki(arkki);
            Kirjasimet.Aseta(arkki, Kirjasin.Luku);

            ylaosa = Rakenne.El("mk-nahtavyys__yla", arkki, PickingMode.Ignore);
            aika = Rakenne.Teksti("", "mk-nahtavyys__aika", ylaosa);
            Kirjasimet.Aseta(aika, Kirjasin.Kone);
            var otsikkorivi = Rakenne.El("mk-nahtavyys__otsikkorivi", ylaosa, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("", "mk-nahtavyys__otsikko", otsikkorivi);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            kaiutin = Rakenne.Nappi(null, "mk-nahtavyys__kaiutin", VaihdaLuenta, otsikkorivi, Ikonit.Viiva["kaiutin"]);
            kaiutin.tooltip = "Lue ääneen";

            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-nahtavyys__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            arkki.Add(vieritys);
            sisus = vieritys.contentContainer;

            var napit = Rakenne.El("mk-nahtavyys__napit", arkki, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Sulje", "mk-nappi--kulta mk-nahtavyys__sulje", Sulje, napit);
            Rakenne.Tausta(sulje, Kuviot.Kulta);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);

            // ☰ ja ‹ ›: kortin sisaruksia (eivät vieri sisällön mukana).
            valikkoNappi = Rakenne.Nappi(null, "mk-nahtavyys__valikkonappi", VaihdaValikko, arkki, Ikonit.Valikko);
            valikkoNappi.tooltip = "Kaupungin nähtävyydet";
            valikko = Rakenne.El("mk-nahtavyys__valikko", arkki);
            valikko.style.display = DisplayStyle.None;
            edellinen = Rakenne.Nappi("‹", "mk-nahtavyys__nuoli mk-nahtavyys__nuoli--vasen", () => Selaa(-1), arkki);
            seuraava = Rakenne.Nappi("›", "mk-nahtavyys__nuoli mk-nahtavyys__nuoli--oikea", () => Selaa(1), arkki);
            Vector2 vetoAlku = default;
            bool veto = false;
            arkki.RegisterCallback<PointerDownEvent>(e =>
            {
                var t = e.target as VisualElement;
                veto = t != null && !Sisalla(t, "mk-nahtavyys__kuvakehys") && !Sisalla(t, "mk-nahtavyys__valikko");
                vetoAlku = e.position;
            }, TrickleDown.TrickleDown);
            arkki.RegisterCallback<PointerUpEvent>(e =>
            {
                if (!veto) return;
                veto = false;
                var d = (Vector2)e.position - vetoAlku;
                if (Mathf.Abs(d.x) > 40f && Mathf.Abs(d.x) > Mathf.Abs(d.y)) Selaa(d.x < 0 ? 1 : -1);
            }, TrickleDown.TrickleDown);
            arkki.RegisterCallback<PointerCancelEvent>(_ => veto = false, TrickleDown.TrickleDown);
            PaivitaSelaus();

            suurennos = new Kuvasuurennos(juuri);
            ui.TurvaMuuttui += Asettele;
            peite.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
        }

        float arkkiLeveys;
        // Asetettu leveys (resolvedStyle ei ole vielä valmis taiton hetkellä).
        bool Levea => arkkiLeveys >= Levearaja;

        static bool Sisalla(VisualElement e, string luokka)
        {
            for (; e != null; e = e.parent) if (e.ClassListContains(luokka)) return true;
            return false;
        }

        void Asettele()
        {
            var r = ui.Reunat(Kerros);
            float w = peite.resolvedStyle.width;
            if (float.IsNaN(w) || w <= 0) return;
            bool puhelin = w < 700f;
            float leveys = opas && w >= 760f ? Mathf.Min(w * 0.84f, 840f)
                : puhelin ? Mathf.Min(w * 0.9f, 640f) : Mathf.Min(w * 0.92f, 860f);
            arkki.style.width = leveys;
            arkkiLeveys = leveys;
            peite.style.paddingTop = r.y + 22f;
            peite.style.paddingBottom = r.w + (puhelin ? 10f : 22f);
            peite.style.justifyContent = puhelin ? Justify.FlexEnd : Justify.Center;
        }

        // --- avaus ------------------------------------------------------------------------------

        /// <summary>Turistiopas (web avaaTuristiOpas → avaaNahtavyys, taitto opas).</summary>
        public void AvaaOpas(OpasArtikkeli o)
        {
            if (o == null) return;
            kartta = null; nykyinen = null;
            Aloita(true, null, o.Nimi);
            opasTiedot = o;
            // Leveyden mukainen taitto vasta kun arkin leveys tiedetään.
            arkki.schedule.Execute(() => { if (opasTiedot == o) TaitaOpas(o); });
        }

        OpasArtikkeli opasTiedot;

        /// <summary>
        /// Kohdekartan kohde (web nahtavyysKohteet + avaaNahtavyys): juttu arkkiin valikon ja selauksen
        /// kanssa, pelkkä wiki-kohde Wikipediaan. numero = false: aikarivillä ei "Kohde n" (pulun
        /// linkki, web avaaNahtavyys numero null).
        /// </summary>
        public void AvaaKohde(Kohdekartta k, KohdekarttaKohde kohde, bool numero = true)
        {
            if (k == null || kohde == null) return;
            if (kohde.Juttu == null || string.IsNullOrEmpty(kohde.Juttu.Teksti))
            {
                // Ilman omaa juttua wikin artikkeli pelin omaan Lue lisää -ikkunaan (web openWikiArticle).
                if (!string.IsNullOrEmpty(kohde.Wiki)) UiNakymat.Hae()?.Wiki.Avaa(kohde.Wiki, kohde.Nimi);
                return;
            }
            kartta = k;
            nykyinen = kohde;
            AvaaJuttu(kohde.Juttu, numero ? kohde.Numero : (int?)null);
        }

        /// <summary>Nähtävyysjuttu ilman karttayhteyttä (ei valikkoa eikä selausta).</summary>
        public void Avaa(NahtavyysKohde k, int? numero = null)
        {
            kartta = null; nykyinen = null;
            AvaaJuttu(k, numero);
        }

        void AvaaJuttu(NahtavyysKohde k, int? numero)
        {
            if (k == null) return;
            Aloita(false, string.Join(" · ", new[] { numero.HasValue ? "Kohde " + numero : null, k.Aika }.Where(x => !string.IsNullOrEmpty(x))), k.Nimi);
            opasTiedot = null;
            arkki.schedule.Execute(() => TaitaJuttu(k));
        }

        void Aloita(bool onOpas, string aikarivi, string nimi)
        {
            PysaytaLuenta();
            suurennos.Sulje();
            Pikkuseloste.Sulje();
            opas = onOpas;
            arkki.EnableInClassList("mk-nahtavyys--opas", onOpas);
            valikko.style.display = DisplayStyle.None;
            PaivitaSelaus();
            aika.text = (aikarivi ?? "").ToUpperInvariant();
            aika.style.display = string.IsNullOrEmpty(aikarivi) ? DisplayStyle.None : DisplayStyle.Flex;
            otsikko.text = nimi ?? "";
            sisus.Clear();
            luettavat.Clear();
            if (!string.IsNullOrEmpty(nimi)) luettavat.Add(nimi);
            otsikonPituus = luettavat.Count > 0 ? luettavat[0].Length : 0;
            PaivitaKaiutin();
            vieritys.scrollOffset = Vector2.zero;
            Asettele();
            Aanet.PulunTehoste("popup");
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(peite, true, 220);
            SyoteLukko.Esta(this);
            Avautui?.Invoke();
        }

        /// <summary>Testikomento: vieritys alas (px) taiton jälkeen.</summary>
        public void Vierita(float px) => vieritys.schedule.Execute(() => vieritys.scrollOffset = new Vector2(0, px)).StartingIn(600);

        /// <summary>Suurennos ja arkki kiinni kerralla (UiNakymat.SuljeKaikki).</summary>
        public void SuljeKokonaan()
        {
            suurennos.Sulje();
            Sulje();
        }

        /// <summary>Sulje-nappi tai taustan napautus: ensin auki oleva kuvasuurennos.</summary>
        public void Sulje()
        {
            if (suurennos.Auki) { suurennos.Sulje(); return; }
            if (!Auki) return;
            Auki = false;
            PysaytaLuenta();
            Pikkuseloste.Sulje();
            opasTiedot = null;
            Rakenne.Nayta(peite, false, 200);
            SyoteLukko.Vapauta(this);
            Aanet.PulunTehoste("paper");
            Suljettu?.Invoke();
        }

        // --- valikko ja selaus (kohdekartan jutut) ----------------------------------------------------

        List<KohdekarttaKohde> Selattavat => kartta?.Kohteet.Where(x => x.Selattava).ToList() ?? new List<KohdekarttaKohde>();

        void PaivitaSelaus()
        {
            var lista = Selattavat;
            bool selattava = !opas && nykyinen != null && lista.Count > 1 && lista.Contains(nykyinen);
            edellinen.style.display = seuraava.style.display = selattava ? DisplayStyle.Flex : DisplayStyle.None;
            bool valikoitava = !opas && kartta != null && kartta.Kohteet.Count(x => x.Avattava) >= 2;
            valikkoNappi.style.display = valikoitava ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void Selaa(int suunta)
        {
            var lista = Selattavat;
            int i = nykyinen != null ? lista.IndexOf(nykyinen) : -1;
            if (opas || i < 0 || lista.Count < 2 || suurennos.Auki) return;
            var k = lista[(i + suunta + lista.Count) % lista.Count];
            Aanet.PulunTehoste("paper");
            AvaaKohde(kartta, k);
        }

        void VaihdaValikko()
        {
            if (valikko.style.display == DisplayStyle.Flex) { valikko.style.display = DisplayStyle.None; return; }
            valikko.Clear();
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-nahtavyys__valikkovieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            valikko.Add(v);
            foreach (var k in kartta?.Kohteet.Where(x => x.Avattava) ?? Enumerable.Empty<KohdekarttaKohde>())
            {
                var kohde = k;
                var rivi = Rakenne.Nappi(null, "mk-nahtavyys__valikkorivi", () => { valikko.style.display = DisplayStyle.None; AvaaKohde(kartta, kohde); }, v);
                rivi.EnableInClassList("mk-valittu", k == nykyinen);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Numero.ToString(), "mk-nahtavyys__valikkonumero", rivi), Kirjasin.KoneLihava);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Nimi, "mk-nahtavyys__valikkonimi", rivi), k == nykyinen ? Kirjasin.LukuLihava : Kirjasin.Luku);
            }
            valikko.style.display = DisplayStyle.Flex;
        }

        // --- nähtävyysjuttu -------------------------------------------------------------------------

        void TaitaJuttu(NahtavyysKohde k)
        {
            var kappaleet = Kappaleet(k.Teksti).ToList();
            int lainaus = string.IsNullOrEmpty(k.LainausTeksti) ? -1 : (kappaleet.Count + 1) / 2;
            var kuvat = k.Kuvat.Take(5).ToList();
            for (int i = 0; i < kappaleet.Count; i++)
            {
                Kappale(sisus, kappaleet[i], "mk-nahtavyys__kappale");
                if (i + 1 == lainaus) Lainaus(sisus, k.LainausTeksti, k.LainausLahde);
                if (i == 0 && kuvat.Count > 0) KuvaTaiKaruselli(sisus, kuvat, true);
            }
            if (kappaleet.Count == 0 && kuvat.Count > 0) KuvaTaiKaruselli(sisus, kuvat, true);
            if (!string.IsNullOrEmpty(k.Wiki))
            {
                string wiki = k.Wiki, nimi = k.Nimi;
                var b = Rakenne.Nappi("Lue lisää aiheesta", "mk-nahtavyys__wiki", () => UiNakymat.Hae()?.Wiki.Avaa(wiki, nimi), sisus);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            else Lahderivi(sisus, k.Lahde);
            // Reaktiot lähderivin kylkeen (web nahtavyydet.js: juttuAvain(kaupunki, kohteen nimi)).
            Reaktiot.Piirra(sisus, Reaktiot.JuttuAvain(kartta?.Kaupunki ?? PeliOhjain.Instanssi?.PelaajanKaupunki, k.Nimi), k.Nimi);
            // Web: pöllöpoiminnat jutun loppuun reaktioiden jälkeen.
            if (!opas) Poimintapillerit.Piirra(sisus, Reaktiot.JuttuAvain(kartta?.Kaupunki ?? PeliOhjain.Instanssi?.PelaajanKaupunki, k.Nimi));
        }

        static void Lahderivi(VisualElement isa, string lahde)
        {
            if (string.IsNullOrEmpty(lahde)) return;
            string t = lahde == "Wikipedia" ? "Matkakirjan oma teksti · lähteenä Wikipedia" : lahde;
            Kirjasimet.Aseta(Rakenne.Teksti(t, "mk-nahtavyys__lahderivi", isa), Kirjasin.Kone);
        }

        void Lainaus(VisualElement isa, string teksti, string lahde)
        {
            var l = Rakenne.El("mk-nahtavyys__lainaus", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-nahtavyys__lainausteksti", l), Kirjasin.LukuKursiivi);
            luettavat.Add(teksti);
            PaivitaKaiutin();
            if (!string.IsNullOrEmpty(lahde)) Kirjasimet.Aseta(Rakenne.Teksti(lahde, "mk-nahtavyys__lainauslahde", l), Kirjasin.Kone);
        }

        // --- opas ---------------------------------------------------------------------------------

        void TaitaOpas(OpasArtikkeli o)
        {
            bool levea = Levea;
            arkki.EnableInClassList("mk-nahtavyys--levea", levea);
            foreach (var k in Kappaleet(o.Teksti)) Kappale(sisus, k, "mk-opas__ingressi");
            var kainalo = Kainalo(o);
            if (kainalo != null && o.Jaksot.Count == 0) sisus.Add(kainalo);
            var valiin = new SortedDictionary<int, Func<VisualElement>>();
            if (!string.IsNullOrEmpty(o.ParasAika) || o.Kaudet.Count > 0) valiin[0] = () => Kaudet(o);
            if (!string.IsNullOrEmpty(o.Nosto)) valiin[1] = () => Nosto(o.Nosto);
            for (int i = 0; i < o.Jaksot.Count; i++)
            {
                sisus.Add(Jakso(o.Jaksot[i], i == 0 ? kainalo : null, levea));
                if (valiin.TryGetValue(i, out var lohko)) sisus.Add(lohko());
            }
            foreach (var kv in valiin) if (kv.Key >= o.Jaksot.Count) sisus.Add(kv.Value());
            if (o.Linkit.Count > 0) sisus.Add(Linkit(o));
            Lahderivi(sisus, o.Lahde);
        }

        VisualElement Jakso(OpasJakso j, VisualElement kainalo, bool levea)
        {
            var osa = Rakenne.El("mk-opas__jakso", null, PickingMode.Ignore);
            // Kapealla kainalo ennen väliotsikkoa (web order: -1).
            if (kainalo != null && !levea) osa.Add(kainalo);
            if (!string.IsNullOrEmpty(j.Otsikko))
                Kirjasimet.Aseta(Rakenne.Teksti(j.Otsikko.ToUpperInvariant(), "mk-opas__valiotsikko", osa), Kirjasin.KoneLihava);
            bool kapea = j.Kapea && j.Kuvat.Count > 0;
            // Leveällä kainalo tai kapea kuva tekstin oikealle puolelle (webin float: right).
            bool rinnakkain = levea && (kainalo != null || kapea);
            var runko = rinnakkain ? Rakenne.El("mk-opas__rinnakkain", osa, PickingMode.Ignore) : osa;
            var teksti = rinnakkain ? Rakenne.El("mk-opas__palsta", runko, PickingMode.Ignore) : osa;
            foreach (var k in Kappaleet(j.Teksti)) Kappale(teksti, k, "mk-nahtavyys__kappale");
            if (rinnakkain)
            {
                var sivu = Rakenne.El(kainalo != null ? "mk-opas__sivupalsta" : "mk-opas__sivupalsta mk-opas__sivupalsta--kuva", runko, PickingMode.Ignore);
                if (kainalo != null) sivu.Add(kainalo);
                if (kapea) KuvaTaiKaruselli(kainalo != null ? teksti : sivu, j.Kuvat, false);
            }
            else if (j.Kuvat.Count > 0) KuvaTaiKaruselli(osa, j.Kuvat, false);
            return osa;
        }

        VisualElement Kainalo(OpasArtikkeli o)
        {
            if (o.Parasta.Count == 0 && o.HyvaTietaa.Count == 0) return null;
            var taulu = Rakenne.El("mk-opas__kainalo", null, PickingMode.Ignore);
            void Vyo(string luokka, string ots, List<OpasRivi> rivit)
            {
                if (rivit.Count == 0) return;
                var vyo = Rakenne.El("mk-opas__vyo " + luokka, taulu, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(ots, "mk-opas__vyootsikko", vyo), Kirjasin.KoneLihava);
                for (int i = 0; i < rivit.Count; i++)
                {
                    var r = rivit[i];
                    VisualElement rivi;
                    if (string.IsNullOrEmpty(r.Selite)) rivi = Rakenne.El("mk-opas__vyorivi", vyo, PickingMode.Ignore);
                    else
                    {
                        Button b = null;
                        string selite = r.Selite;
                        b = Rakenne.Nappi(null, "mk-opas__vyorivi mk-opas__vyonappi", () => Pikkuseloste.Vaihda(b, selite), vyo);
                        rivi = b;
                    }
                    rivi.EnableInClassList("mk-opas__vyorivi--eka", i == 0);
                    Kirjasimet.Aseta(Rakenne.Teksti(r.Nimi ?? "", "mk-opas__vyonimi", rivi), Kirjasin.KoneLihava);
                    if (r.Tahdet.HasValue)
                    {
                        int n = Mathf.Clamp(r.Tahdet.Value, 0, 3);
                        var t = Rakenne.Teksti($"{new string('★', n)}<alpha=#42>{new string('★', 3 - n)}", "mk-opas__tahdet", rivi);
                        t.enableRichText = true;
                    }
                }
            }
            Vyo("mk-opas__vyo--lammin", "PARASTA TÄÄLLÄ", o.Parasta);
            Vyo("mk-opas__vyo--viilea", "HYVÄ TIETÄÄ", o.HyvaTietaa);
            return taulu;
        }

        VisualElement Laatikko(string ots, string luokka)
        {
            var l = Rakenne.El("mk-opas__laatikko " + luokka, null, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(ots, "mk-opas__laatikkootsikko", l), Kirjasin.KoneLihava);
            return l;
        }

        VisualElement Kaudet(OpasArtikkeli o)
        {
            var l = Laatikko("MILLOIN MATKAAN?", "mk-opas__saa");
            var rivi = Rakenne.El(Levea ? "mk-opas__rinnakkain" : "mk-opas__pino", l, PickingMode.Ignore);
            var palsta = Rakenne.El("mk-opas__palsta", rivi, PickingMode.Ignore);
            // Säägraafi (Saagraafi.cs) oikealle leveällä, kapealla tekstin yläpuolelle.
            var graafipaikka = Rakenne.El("mk-opas__saagraafi", null, PickingMode.Ignore);
            graafipaikka.style.display = DisplayStyle.None;
            if (Levea) rivi.Add(graafipaikka); else rivi.Insert(0, graafipaikka);
            string kaupunkiNimi = UiSisalto.Kaupunki(o.Kaupunki)?.Nimi;
            Saatiedot.Hae(o.Kaupunki, t =>
            {
                if (t == null || graafipaikka.panel == null) return;
                var kuvaaja = Saagraafi.OppaanKuvaaja(t, "Sää vuoden mittaan" + (kaupunkiNimi != null ? " — " + kaupunkiNimi : ""));
                if (kuvaaja == null) return;
                graafipaikka.Add(kuvaaja);
                graafipaikka.style.display = DisplayStyle.Flex;
            });
            if (!string.IsNullOrEmpty(o.ParasAika)) Kappale(palsta, o.ParasAika, "mk-opas__parasaika");
            foreach (var k in o.Kaudet)
            {
                var kr = Rakenne.El(Levea ? "mk-opas__kausi" : "mk-opas__kausi mk-opas__kausi--pino", palsta, PickingMode.Ignore);
                var nimi = Rakenne.El("mk-opas__kausinimi", kr, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Nimi ?? "", "mk-opas__kausisana", nimi), Kirjasin.KoneLihava);
                if (!string.IsNullOrEmpty(k.Kk)) Kirjasimet.Aseta(Rakenne.Teksti(k.Kk, "mk-opas__kausikk", nimi), Kirjasin.Kone);
                var tiedot = Rakenne.El("mk-opas__kausitiedot", kr, PickingMode.Ignore);
                if (!string.IsNullOrEmpty(k.Lampotila)) Kirjasimet.Aseta(Rakenne.Teksti(k.Lampotila, "mk-opas__kausilampo", tiedot), Kirjasin.KoneLihava);
                if (!string.IsNullOrEmpty(k.Kuvaus)) Kappale(tiedot, k.Kuvaus, "mk-opas__kausikuvaus");
            }
            return l;
        }

        VisualElement Nosto(string teksti)
        {
            var n = Rakenne.El("mk-opas__nosto", null, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-opas__nostoteksti", n), Kirjasin.LukuKursiivi);
            luettavat.Add(teksti);
            PaivitaKaiutin();
            return n;
        }

        VisualElement Linkit(OpasArtikkeli o)
        {
            var l = Laatikko("SUUNNITTELE MATKA", "mk-opas__suunnittele");
            foreach (var (nimi, url) in o.Linkit)
            {
                string u = url;
                Kirjasimet.Aseta(Rakenne.Nappi(nimi, "mk-opas__linkki", () => Application.OpenURL(u), l), Kirjasin.Kone);
            }
            return l;
        }

        // --- kuvat ------------------------------------------------------------------------------------

        /// <summary>Yksi kuva kehyksessä tai karuselli (‹ ›, laskuri, pyyhkäisy); napautus → suurennos.</summary>
        void KuvaTaiKaruselli(VisualElement isa, List<LehtiKuva> kuvat, bool ensikuva)
        {
            var lohko = Rakenne.El("mk-nahtavyys__kuvalohko", isa, PickingMode.Ignore);
            var kehys = Rakenne.El("mk-nahtavyys__kuvakehys", lohko);
            var kuva = Rakenne.El("mk-nahtavyys__kuva", kehys, PickingMode.Ignore);
            var tekstit = Rakenne.El("mk-nahtavyys__kuvateksti", lohko, PickingMode.Ignore);
            Label laskuri = null;
            int i = 0, versio = 0;
            float suhde = 0.66f;
            Texture2D nykyinen = null;
            void Mitoita()
            {
                float lw = lohko.parent?.contentRect.width ?? 0f;
                if (lw <= 0 || float.IsNaN(lw)) return;
                bool pysty = nykyinen != null && nykyinen.height > nykyinen.width;
                // Pystykuva leveällä min(46 %, 420), puhelimessa täysi leveys (web kuva-pysty).
                float w = ensikuva && pysty && Levea ? Mathf.Min(lw * 0.46f, 420f) : lw;
                lohko.style.width = w;
                kehys.style.height = Mathf.Round(w * suhde);
            }
            void Nayta(int uusi)
            {
                i = (uusi % kuvat.Count + kuvat.Count) % kuvat.Count;
                var k = kuvat[i];
                int v = ++versio;
                kuva.style.backgroundImage = StyleKeyword.None;
                tekstit.Clear();
                string selite = k.Lyhyt ?? k.Selite;
                if (!string.IsNullOrEmpty(selite)) Kirjasimet.Aseta(Rakenne.Teksti(selite, "mk-nahtavyys__selite", tekstit), Kirjasin.Luku);
                if (!string.IsNullOrEmpty(k.LahdeRivi)) Kirjasimet.Aseta(Rakenne.Teksti(k.LahdeRivi, "mk-nahtavyys__kuvalahde", tekstit), Kirjasin.Kone);
                if (laskuri != null) laskuri.text = $"{i + 1} / {kuvat.Count}";
                NostoSisalto.HaeKuva(k.Lahde, t =>
                {
                    if (v != versio) return;
                    if (t == null) { if (kuvat.Count == 1) lohko.style.display = DisplayStyle.None; return; }
                    nykyinen = t;
                    kuva.style.backgroundImage = new StyleBackground(t);
                    suhde = Mathf.Clamp((float)t.height / Mathf.Max(1, t.width), 0.4f, 1.5f);
                    Mitoita();
                });
            }
            kehys.RegisterCallback<ClickEvent>(_ => suurennos.Avaa(kuvat, i));
            lohko.RegisterCallback<GeometryChangedEvent>(e => { if (e.oldRect.width != e.newRect.width) Mitoita(); });
            isa.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            if (kuvat.Count > 1)
            {
                var ed = Rakenne.Nappi("‹", "mk-nosto__selaa mk-nosto__selaa--vasen", () => Nayta(i - 1), kehys);
                var se = Rakenne.Nappi("›", "mk-nosto__selaa mk-nosto__selaa--oikea", () => Nayta(i + 1), kehys);
                ed.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                se.RegisterCallback<ClickEvent>(e => e.StopPropagation());
                laskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kehys);
                Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
                // Pyyhkäisy 40 pt kuvan päällä (web karuselli).
                Vector2 alku = default;
                bool vetaa = false;
                kehys.RegisterCallback<PointerDownEvent>(e => { alku = e.position; vetaa = true; });
                kehys.RegisterCallback<PointerUpEvent>(e =>
                {
                    if (!vetaa) return;
                    vetaa = false;
                    var d = (Vector2)e.position - alku;
                    if (Mathf.Abs(d.x) >= 40f && Mathf.Abs(d.x) > Mathf.Abs(d.y)) Nayta(i + (d.x < 0 ? 1 : -1));
                });
            }
            Nayta(0);
        }

        // --- teksti ------------------------------------------------------------------------------------

        static IEnumerable<string> Kappaleet(string teksti) =>
            string.IsNullOrWhiteSpace(teksti) ? Enumerable.Empty<string>()
                : Regex.Split(teksti.Trim(), @"\n\s*\n").Select(x => x.Trim()).Where(x => x.Length > 0);

        void Kappale(VisualElement isa, string teksti, string luokka)
        {
            var l = Rakenne.Teksti(Vuosikorosta(teksti), luokka, isa);
            l.enableRichText = true;
            Kirjasimet.Aseta(l, Kirjasin.Luku);
            luettavat.Add(teksti);
            PaivitaKaiutin();
        }

        const string VuosiJakso = @"(?:\s?[–-]\s?\d{2,4})?";
        static readonly Regex VuosiKuvio = new Regex(
            @"\b\d{4}" + VuosiJakso + @"(?:-luvu\w*)?(?:\s(?:eaa\.|jaa\.))?"
            + @"|\b\d{3}" + VuosiJakso + @"(?:-luvu\w*(?:\s(?:eaa\.|jaa\.))?|\s(?:eaa\.|jaa\.))");

        /// <summary>
        /// Vuosiluvut lihavoituna (web vuosikorosta): 3–4-numeroiset, välit, -luvulla, eaa./jaa.
        /// Tuhaterotin ei ole vuosiluku ("1 700 siltaa"). Muu teksti suojataan rich textiltä.
        /// </summary>
        public static string Vuosikorosta(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) return "";
            var sb = new System.Text.StringBuilder();
            int kohta = 0;
            foreach (Match m in VuosiKuvio.Matches(teksti))
            {
                char ed = m.Index > 0 ? teksti[m.Index - 1] : '\0';
                char ed2 = m.Index > 1 ? teksti[m.Index - 2] : '\0';
                if ((ed == ' ' || ed == ' ') && char.IsDigit(ed2)) continue;
                sb.Append(Suojaa(teksti.Substring(kohta, m.Index - kohta))).Append("<b>").Append(Suojaa(m.Value)).Append("</b>");
                kohta = m.Index + m.Length;
            }
            sb.Append(Suojaa(teksti.Substring(kohta)));
            return sb.ToString();
        }

        static string Suojaa(string s) => s.Replace("<", "<noparse><</noparse>");

        // --- luenta ------------------------------------------------------------------------------------

        int otsikonPituus;

        /// <summary>
        /// E16 (web lukija.js paivitaLukija, LUETTAVAN_VAHIMMAIS 80): kaiutin vain, kun luettavaa tekstiä on otsikon
        /// lisäksi vähintään 80 merkkiä — muuten nappi lupaisi hiljaisuutta.
        /// </summary>
        void PaivitaKaiutin()
        {
            int pituus = -otsikonPituus;
            foreach (var t in luettavat) pituus += t?.Length ?? 0;
            kaiutin.style.display = pituus >= 80 ? DisplayStyle.Flex : DisplayStyle.None;
        }

        void VaihdaLuenta()
        {
            if (luetaan) { PysaytaLuenta(); return; }
            var palat = luettavat.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var puhe = Puhe.Hae();
            if (palat.Count == 0 || puhe == null) return;
            luetaan = true;
            kaiutin.AddToClassList("mk-valittu");
            int v = ++lukuVersio, i = 0;
            void Seuraava()
            {
                if (v != lukuVersio || i >= palat.Count) { if (v == lukuVersio) PysaytaLuenta(); return; }
                puhe.Lue(palat[i++], "kertoja", 0, Seuraava);
            }
            Seuraava();
        }

        void PysaytaLuenta()
        {
            if (!luetaan) return;
            luetaan = false;
            lukuVersio++;
            kaiutin.RemoveFromClassList("mk-valittu");
            Puhe.Instanssi?.Pysayta(0.3f);
        }
    }
}
