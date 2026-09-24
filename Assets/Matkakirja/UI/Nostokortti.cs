// NOSTOKORTTI (Natiivi-UI): karttavalon napautuksesta avautuva kortti — webin
// fokuskohde (js/fokuskohteet.js), skandaalin lisälehti (js/skandaalit.js), historian
// hetki (js/historian-hetket.js), eläintäky (js/elaintaky.js), täkynosto (js/fokusnosto.js) ja
// syvennystarina (js/syvennys.js) yhtenä näkymänä.
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
//   kohde      luokka, nimi, kuvat (kadonneen ihmeen kuva ensin, nauha "Unohdettu aarre"),
//              "Koe ihme" kuvien alla (säilyneen ihmeen kuva suurennokseen), teksti, LUKIJAN KYSYMYS
//              (+25, "nosto"/id), "Kysy viisaalta pöllöltä pululta:" (PuluChat.Kysy), kierrokset
//              (ulkoinen linkki), "Livian leikekirja" (kohteen nimeävä täkynosto, web piirraKohteenNosto)
//   täkynosto  (web js/fokusnosto.js avaaNostonKortti; myös maalehtinosto, jonka web avaa samalla avaaNosto-
//              polulla, ja karttavalon "nosto:<id>", kokoelma takynostot) luokka, [lööppi: LISÄLEHTI, päiväys], otsikko,
//              [ingressi], äänirivi (näyte, musiikki, Apple Music), kuvat, lunastus, valokuva
//              "näin se löytyi", isoisän karttaliite (napautus → suurena), LUKIJAN KYSYMYS (+25,
//              nostotehtävälaskuri), "Katso X kartalla" (→ kohdekortti), pulun
//              kysymykset (3); kaiutin "Kuuntele kortti"
//   syvennys   (web js/syvennys.js avaaSyvennys) luokka, otsikko, kuva, tarina, minivisa (+50,
//              "<kaupunki>"/"fokus:<täky>"); oikea vastaus myöntää kaupungin julisteen ja tuo napin
//              "Lunasta juliste" (suurennos); kaiutin "Kuuntele tarina"
// Pelin tila muuttuu vain PeliOhjain.KauppaTeko-kutsuilla (Pelikoodari). Kerros 40, pallo lukittu.
// Kohdekortin korostetut sanat (web fokuskohteet piirraKorostettuSana): kunkin korostuksen
// ensimmäinen esiintymä tekstissä on alleviivattu linkki, napautus → pulu "Kerro lisää: X (kohteessa Y)".
// Kaiutin (web js/lukija.js lisaaLukijanappi, KortinLukija) vaiheessa 2 sulkuruksin vieressä.
// PAIKKA (E3, Fable 24.9.): kuvallinen kortti aukeaa keskelle kuten webin kuva edellä -kortti (js/nostokuva.js
// "KUVA EDELLÄ -KORTTI EI SEURAA MERKKIÄÄN"); kuvaton kortti ja lisäkaupunki napautuspisteen viereen ilman
// himmennystä (web asetaKohteenPaikka / asemoiKaupunkipopup): leveys min(384, 86 % ruudusta), rako 12 px merkin
// oikealle (ei mahdu → vasemmalle), keskitettynä pystyyn, reunavara 8 px ja pystyssä 10 % ruudusta (≤ 96 px),
// turva-alueen sisällä, katto ≥ 140 px. Kortti on raahattava (web raahausTaiSulku: 8 px:n kynnys; tekstin päällä
// pystyveto vierittää) ja raahattu paikka pysyy. Napautus kortin tekstiin tai pohjaan sulkee (web: pop-upin
// päällä napautus on sulku, painikkeen päällä valinta; matka < 6 px ja kesto < 700 ms). Testikomennot painavat kortin
// nappeja nimellä (Testaa: lisaa, ihme, leikekirja, kartalla, liite, valokuva, vastaa<n>, juliste).
// LISÄKAUPUNKI (web kaupunkinosto.js avaaLisakaupunginKortti, kohde.kaupunkikortti ohittaa kohdekortin):
// ✕, otsikkona kaupungin nimi, herokuva (kuvateksti ja lähderivi; ilman kuvaa paikkamerkki nimellä),
// esittely kappaleittain ja yksi kaupunkiin ankkuroitu nosto (otsikko + teksti). Ei visaa eikä kaiutinta.
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
        /// <summary>Kortin napit nimellä testikomentoja varten (ui nosto … &lt;nappi&gt;, ui ihme, ui leikekirja).</summary>
        readonly Dictionary<string, Action> napit = new Dictionary<string, Action>();

        public bool Auki { get; private set; }

        // Paikka ja raahaus (E3): ankkuri kerroksen koordinaateissa, null = keskellä.
        const float Marginaali = 8f, Rako = 12f, LaitavaraOsuus = 0.1f, LaitavaraEnintaan = 96f, Leveys = 384f,
            LeveysOsuus = 0.86f, Katto = 140f, Raahauskynnys = 8f, Napautuskynnys = 6f, NapautusMs = 700f;
        Vector2? ankkuri;
        bool ankkuroitu, raahattu, raahaa, lisakaupunkiPaikka;
        int eleId = -1;
        Vector2 eleAlku, lahto;
        float eleAika;

        /// <summary>Auki olevan kortin tiivistelmä testilokiin: laji · luokka · otsikko [· leikekirja].</summary>
        public string Kuvaus => nosto == null ? null
            : nosto.Laji + " · " + nosto.Luokka + " · " + nosto.Otsikko
              + (nosto.LeikekirjaValo != null ? " · leikekirja " + nosto.LeikekirjaValo : "")
              + (nosto.KohdeId != null ? " · kartalla " + nosto.KohdeId : "");

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
            sulje = Rakenne.Nappi(null, "mk-nosto__sulje", Sulje, kortti, Ikonit.Viiva["rasti"]); // E4: web ✕
            sulje.tooltip = "Sulje";
            lukija = new KortinLukija(kortti, luokka: "mk-nosto__lukija");
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);
            kortti.RegisterCallback<GeometryChangedEvent>(_ => { if (ankkuroitu && !raahattu) Asemoi(); });
            kortti.RegisterCallback<PointerDownEvent>(EleAlkoi, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerMoveEvent>(EleLiikkui, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerUpEvent>(EleLoppui, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerCaptureOutEvent>(_ => { raahaa = false; eleId = -1; kortti.RemoveFromClassList("mk-nosto--raahauksessa"); });
            kortti.RegisterCallback<ClickEvent>(NapautusKorttiin);

            suurennos = new Kuvasuurennos(ui.Juuri(UiKerros.Valikot));
        }

        /// <summary>Avaa kortin karttavalon id:llä (UiPalvelut.ValoNapautettu, testikomento) napautuspisteen viereen.</summary>
        public void Avaa(string valoId)
        {
            ankkuri = Napautuspiste();
            Avaa(valoId, null);
        }

        /// <summary>Testikomento: kortti annetun paneelipisteen viereen (ui nosto &lt;valo&gt; @x,y).</summary>
        public void AvaaKohdasta(string valoId, Vector2 piste)
        {
            ankkuri = kerros.WorldToLocal(piste);
            Avaa(valoId, null);
        }

        /// <summary>Viimeisin osoittimen paikka kerroksen koordinaateissa (kartan tai merkin napautus).</summary>
        Vector2? Napautuspiste()
        {
            var o = UnityEngine.InputSystem.Pointer.current;
            if (o == null || kerros.panel == null) return null;
            var r = o.position.ReadValue();
            return kerros.WorldToLocal(RuntimePanelUtils.ScreenToPanel(kerros.panel, new Vector2(r.x, Screen.height - r.y)));
        }

        void Avaa(string valoId, Action<bool> jalkeen)
        {
            int v = ++versio;
            UiKerros.Hae().StartCoroutine(AvaaReitti(valoId, v, jalkeen));
        }

        /// <summary>
        /// Web: lisäkaupungin kaupunkikortti ennen kohteen tietoruutua (fokuskohteet.js avaaFokuskohde),
        /// muuten nostokortti. jalkeen(true) = jokin kortti aukesi (testikomennot painavat sen nappeja).
        /// </summary>
        System.Collections.IEnumerator AvaaReitti(string valoId, int v, Action<bool> jalkeen)
        {
            Lisakaupunki lk = null;
            yield return NostoSisalto.HaeLisakaupunki(valoId, x => lk = x);
            if (v != versio) yield break;
            if (lk != null)
            {
                napit.Clear();
                NaytaLisakaupunki(lk);
                jalkeen?.Invoke(true);
                yield break;
            }
            Nosto n = null;
            yield return NostoSisalto.Hae(valoId, x => n = x);
            if (v != versio) yield break;
            if (n == null) Debug.Log("MATKAKIRJA ui nostot: ei sisältöä valolle " + valoId);
            else Nayta(n);
            jalkeen?.Invoke(n != null);
        }

        /// <summary>
        /// Testikomento: avaa kortin (valoId ≠ null) ja painaa napin nimeltä, tai painaa auki olevan
        /// kortin nappia. Tulos (lokiriville) takaisinkutsulla: null = ok.
        /// </summary>
        public void Testaa(string valoId, string nappi, Action<string> tulos)
        {
            void Paina()
            {
                if (string.IsNullOrEmpty(nappi)) { tulos?.Invoke(null); return; }
                if (nappi != "lisaa" && kortti.ClassListContains("mk-nosto--esittely")) Vaihe2();
                if (napit.TryGetValue(nappi, out var a)) { a(); tulos?.Invoke(null); }
                else tulos?.Invoke("kortilla ei ole nappia " + nappi + " (on: " + string.Join(", ", napit.Keys) + ")");
            }
            if (valoId == null)
            {
                if (!Auki) { tulos?.Invoke("nostokortti ei ole auki"); return; }
                Paina();
                return;
            }
            ankkuri = null;
            if (nappi != null && nappi.StartsWith("@"))
            {
                var xy = nappi.Substring(1).Split(',');
                if (xy.Length == 2 && float.TryParse(xy[0], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var ax)
                    && float.TryParse(xy[1], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var ay))
                    ankkuri = kerros.WorldToLocal(new Vector2(ax, ay));
                nappi = null;
            }
            Avaa(valoId, loytyi =>
            {
                if (!loytyi) { tulos?.Invoke("ei sisältöä valolle " + valoId); return; }
                Paina();
            });
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
            kortti.EnableInClassList("mk-nosto--looppi", n.Looppi);
            kortti.EnableInClassList("mk-nosto--kohde", n.Laji == NostoLaji.Kohde);
            lisakaupunkiPaikka = false;
            AsetaPaikka(n.Kuvat.Count == 0);
            if (n.Kuvat.Count > 0) Vaihe1(); else Vaihe2();
            AvaaKerros();
        }

        // --- paikka ja raahaus (E3) ------------------------------------------------------------

        /// <summary>Ankkuroitu (kuvaton kortti, lisäkaupunki) vai keskellä (kuva edellä); nollaa raahauksen.</summary>
        void AsetaPaikka(bool ankkuriin)
        {
            ankkuroitu = ankkuriin && ankkuri.HasValue;
            raahattu = false;
            kerros.EnableInClassList("mk-nosto__kerros--ankkuroitu", ankkuroitu);
            kerros.EnableInClassList("mk-nosto__kerros--vapaa", ankkuroitu);
            if (!ankkuroitu)
            {
                kortti.style.position = StyleKeyword.Null;
                kortti.style.left = kortti.style.top = StyleKeyword.Null;
                kortti.style.width = kortti.style.maxHeight = StyleKeyword.Null;
                return;
            }
            // Paneelin leveys (pisteinä): kerros voi olla vielä piilossa, jolloin sen oma layout on 0.
            float w = kerros.panel != null ? kerros.panel.visualTree.layout.width : 0f;
            kortti.style.position = Position.Absolute;
            if (w > 0f) kortti.style.width = HaluttuLeveys(w);
            kortti.style.left = Mathf.Round(ankkuri.Value.x + Rako);
            kortti.style.top = Mathf.Round(ankkuri.Value.y);
            Asemoi();
        }

        /// <summary>Web asetaKohteenPaikka: merkin oikealle (tai vasemmalle), pystyssä keskelle, rajojen sisään.</summary>
        void Asemoi()
        {
            float w = kerros.layout.width, h = kerros.layout.height;
            if (w <= 0 || h <= 0 || !ankkuri.HasValue) return;
            float haluttu = HaluttuLeveys(w);
            if (kortti.resolvedStyle.width != haluttu) kortti.style.width = haluttu;
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot); // vasen, ylä, oikea, ala
            // Lisäkaupunki (web asemoiKaupunkipopup): reuna 10, ei pystyn laitavaraa, katto ≥ 160 ja enintään 74 %.
            float reuna = lisakaupunkiPaikka ? 10f : Marginaali;
            float laitavara = lisakaupunkiPaikka ? reuna : Mathf.Min(LaitavaraEnintaan, Mathf.Max(Marginaali, Mathf.Round(h * LaitavaraOsuus)));
            float ala = h - Mathf.Max(laitavara, t.w + reuna), yla = Mathf.Max(laitavara, t.y + reuna);
            float oikea = w - reuna - t.z, vasen = reuna + t.x;
            float katto = Mathf.Max(lisakaupunkiPaikka ? 160f : Katto, Mathf.Round(ala - yla));
            if (lisakaupunkiPaikka) katto = Mathf.Min(katto, Mathf.Round(h * 0.74f));
            if (kortti.resolvedStyle.maxHeight.value != katto) kortti.style.maxHeight = katto;
            float leveys = kortti.layout.width, korkeus = Mathf.Min(kortti.layout.height, katto);
            if (leveys <= 0 || float.IsNaN(korkeus)) return;
            var m = ankkuri.Value;
            float rako = lisakaupunkiPaikka ? 14f : Rako;
            float x = m.x + rako;
            if (x + leveys > oikea) x = m.x - rako - leveys;
            x = Mathf.Max(vasen, Mathf.Min(x, oikea - leveys));
            float y = Mathf.Max(yla, Mathf.Min(m.y - korkeus / 2f, ala - korkeus));
            AsetaKohta(Mathf.Round(x), Mathf.Round(y));
        }

        /// <summary>Kohdekortti min(24rem, 86vw) (web .fokuskohde-popup), lisäkaupunki min(34rem, 92vw) (.kaupunkipopup).</summary>
        float HaluttuLeveys(float w) => Mathf.Round(lisakaupunkiPaikka ? Mathf.Min(544f, w * 0.92f) : Mathf.Min(Leveys, w * LeveysOsuus));

        void AsetaKohta(float x, float y)
        {
            if (kortti.resolvedStyle.left != x) kortti.style.left = x;
            if (kortti.resolvedStyle.top != y) kortti.style.top = y;
        }

        void EleAlkoi(PointerDownEvent e)
        {
            eleId = e.pointerId;
            eleAlku = e.position;
            eleAika = Time.unscaledTime * 1000f;
            raahaa = false;
        }

        /// <summary>Web raahausTaiSulku: kynnyksen ylittävä liike siirtää korttia; tekstin päällä pystyveto vierittää.</summary>
        void EleLiikkui(PointerMoveEvent e)
        {
            if (e.pointerId != eleId) return;
            Vector2 d = (Vector2)e.position - eleAlku;
            if (!raahaa)
            {
                if (d.magnitude < Raahauskynnys) return;
                bool vieritettava = sisus.contentContainer.layout.height > sisus.contentViewport.layout.height + 1f;
                bool tekstinPaalla = e.target is VisualElement v && (v == sisus || sisus.Contains(v));
                if (vieritettava && tekstinPaalla && Mathf.Abs(d.y) >= Mathf.Abs(d.x)) { eleId = -1; return; }
                raahaa = true;
                Irrota();
                lahto = new Vector2(kortti.resolvedStyle.left, kortti.resolvedStyle.top);
                kortti.AddToClassList("mk-nosto--raahauksessa");
                kortti.CapturePointer(e.pointerId);
            }
            float maxX = Mathf.Max(0f, kerros.layout.width - kortti.layout.width);
            float maxY = Mathf.Max(0f, kerros.layout.height - kortti.layout.height);
            AsetaKohta(Mathf.Round(Mathf.Clamp(lahto.x + d.x, 0f, maxX)), Mathf.Round(Mathf.Clamp(lahto.y + d.y, 0f, maxY)));
            e.StopPropagation();
        }

        void EleLoppui(PointerUpEvent e)
        {
            if (e.pointerId != eleId || !raahaa) return;
            raahaa = false;
            eleId = -1;
            raahattu = true;
            kortti.RemoveFromClassList("mk-nosto--raahauksessa");
            if (kortti.HasPointerCapture(e.pointerId)) kortti.ReleasePointer(e.pointerId);
            e.StopPropagation();
        }

        /// <summary>Keskitetty kortti vapaaksi ennen raahausta: nykyinen paikka ja leveys kiinni, kerros ilman täytettä.</summary>
        void Irrota()
        {
            if (kortti.resolvedStyle.position == Position.Absolute) return;
            var paikka = kortti.worldBound.position - kerros.worldBound.position;
            float leveys = kortti.layout.width;
            kerros.AddToClassList("mk-nosto__kerros--vapaa");
            kortti.style.position = Position.Absolute;
            kortti.style.width = leveys;
            kortti.style.left = Mathf.Round(paikka.x);
            kortti.style.top = Mathf.Round(paikka.y);
        }

        /// <summary>Napautus kortin tekstiin tai pohjaan sulkee (web avaaFokuskohde); painikkeet, kuvat ja linkit valitsevat.</summary>
        void NapautusKorttiin(ClickEvent e)
        {
            if (((Vector2)e.position - eleAlku).magnitude >= Napautuskynnys || Time.unscaledTime * 1000f - eleAika > NapautusMs) return;
            for (var v = e.target as VisualElement; v != null && v != kortti; v = v.parent)
            {
                if (v is Button || v is TextField || v.ClassListContains("mk-nosto__kuvakehys") || v.ClassListContains("mk-nosto__lukija")) return;
                if (v is TextElement te && te.text != null && te.text.Contains("<link=")) return;
            }
            var kohde = e.target as VisualElement;
            bool pohja = kohde == kortti || kohde == sisus || kohde == sisus.contentContainer || kohde == sisus.contentViewport || kohde is TextElement;
            if (!pohja) return;
            Aanet.PulunTehoste("paper");
            Sulje();
        }

        void AvaaKerros()
        {
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(kerros, true, 220);
            SyoteLukko.Esta(this);
        }

        // --- lisäkaupunki (web latoLisakaupunginKortti) -------------------------------------

        void NaytaLisakaupunki(Lisakaupunki lk)
        {
            nosto = new Nosto { Laji = NostoLaji.Kohde, Id = lk.Id, Iso = lk.Iso, Otsikko = lk.Nimi };
            if (lk.Hero != null) nosto.Kuvat.Add(lk.Hero);
            kuvaIndeksi = 0;
            kortti.RemoveFromClassList("mk-nosto--looppi");
            kortti.RemoveFromClassList("mk-nosto--kohde");
            kortti.RemoveFromClassList("mk-nosto--esittely");
            lisakaupunkiPaikka = true;
            AsetaPaikka(true);
            sisus.Clear();
            sisus.scrollOffset = Vector2.zero;
            sulje.style.display = DisplayStyle.Flex;
            lukija.Aseta(null);

            Kirjasimet.Aseta(Rakenne.Teksti(lk.Nimi ?? "", "mk-nosto__otsikko", sisus), Kirjasin.LukuLihava);
            // 1. Kuva tai sen paikkamerkki (seepiaruutu ja nimi, ei hakua ulkoa).
            var lohko = Rakenne.El("mk-nosto__kuvasarja", sisus, PickingMode.Ignore);
            if (lk.Hero != null)
            {
                Kuvakehys(lohko, lk.Hero, () => Suurenna(0));
                if (!string.IsNullOrEmpty(lk.Hero.Lyhyt))
                    Kirjasimet.Aseta(Rakenne.Teksti(lk.Hero.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.LukuKursiivi);
                if (!string.IsNullOrEmpty(lk.Hero.LahdeRivi)) Rakenne.Teksti(lk.Hero.LahdeRivi, "mk-kansikuva__lahde", lohko);
            }
            else
            {
                var paikka = Rakenne.El("mk-nosto__kuvakehys", lohko, PickingMode.Ignore);
                paikka.style.justifyContent = Justify.Center;
                paikka.style.alignItems = Align.Center;
                paikka.RegisterCallback<GeometryChangedEvent>(e => { if (e.newRect.width > 0) paikka.style.height = Mathf.Round(e.newRect.width * 2f / 3f); });
                Kirjasimet.Aseta(Rakenne.Teksti(lk.Nimi ?? "", "mk-nosto__kuvateksti", paikka), Kirjasin.LukuKursiivi);
            }
            // 2. Esittely vain, jos se on kirjoitettu.
            foreach (var k in Kappaleet(lk.Esittely)) Rakenne.Teksti(Riviva(k), "mk-nosto__teksti", sisus);
            // 3. Yksi kaupunkiin ankkuroitu nosto nostokortin otsikolla ja tekstillä.
            if (lk.NostoOtsikko != null)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(lk.NostoOtsikko, "mk-nosto__otsikko", sisus), Kirjasin.KoneLihava);
                foreach (var k in Kappaleet(lk.NostoTeksti)) Rakenne.Teksti(Riviva(k), "mk-nosto__teksti", sisus);
            }
            AvaaKerros();
        }

        // --- vaihe 1: kuva edellä ------------------------------------------------------------

        // Web nostokortin teksti (mitattu 24.9.): Iowan 15,52 px, #211d18, riviväli 24,52 = 1,58 em.
        const string RiviValiAlku = "<line-height=1.58em>";
        static string Riviva(string teksti) => RiviValiAlku + "<noparse>" + teksti + "</noparse>";

        void Vaihe1()
        {
            sisus.Clear();
            napit.Clear();
            napit["lisaa"] = Vaihe2;
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
            napit.Clear();
            sisus.scrollOffset = Vector2.zero;
            sulje.style.display = DisplayStyle.Flex;
            kortti.RemoveFromClassList("mk-nosto--esittely");
            var n = nosto;
            // Web: lööppi kuuluu luentaan; otsikko lajin mukaan (skandaalit.js, historian-hetket.js,
            // elaintaky.js, fokuskohteet.js, fokusnosto.js, syvennys.js lisaaLukijanappi).
            lukija.Aseta(new[] { n.Otsikko, n.Ingressi }.Concat(Kappaleet(n.Teksti)),
                n.Laji == NostoLaji.Skandaali ? "Kuuntele lisälehti"
                : n.Laji == NostoLaji.Kohde ? "Kuuntele: " + (n.Otsikko ?? "")
                : n.Laji == NostoLaji.Elain ? "Kuuntele eläinkortti"
                : n.Laji == NostoLaji.Takynosto ? "Kuuntele kortti"
                : n.Laji == NostoLaji.Syvennys ? "Kuuntele tarina" : "Kuuntele hetki");

            var yla = Rakenne.Teksti(n.Luokka ?? "", "mk-nosto__ylarivi", sisus);
            Kirjasimet.Aseta(yla, Kirjasin.Kone);
            if (n.Looppi)
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

            // Web piirraNostonMedia: äänet otsikon alle, ennen kuvaa.
            if (n.Laji == NostoLaji.Takynosto) Media(sisus, n);
            if (n.Kuvat.Count > 0) Kuvasarja(sisus);
            // Web piirraKortinIhmenappi: "Koe ihme" ensimmäisen kuvan (sarjan) alle.
            if (n.Ihme != null) Ihmenappi(sisus, n);

            var jaljella = n.Laji == NostoLaji.Kohde ? n.Korostukset.Select(PuraKorostus).Where(x => x.HasValue).Select(x => x.Value).ToList()
                : new List<(string Perus, string Nakyva)>();
            foreach (var k in Kappaleet(n.Teksti))
            {
                var l = Rakenne.Teksti(RiviValiAlku + Korosta(k, jaljella), "mk-nosto__teksti", sisus);
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

            // Täkynosto: valokuva ja karttaliite jutun jälkeen, ennen kysymystä (web piirraNostonSisus).
            if (n.Valokuva != null) Valokuva(sisus, n.Valokuva);
            if (n.Karttaliite != null) Karttaliite(sisus, n.Karttaliite);
            if (n.Visa != null) Visa(sisus, n);
            if (n.Laji == NostoLaji.Elain) Elainpalkkio(sisus, n);
            if (n.Laji == NostoLaji.Takynosto)
            {
                if (n.KohdeId != null) Kohdenappi(sisus, n);
                KysyPululta(sisus, n);
            }
            if (n.Laji == NostoLaji.Kohde)
            {
                KysyPululta(sisus, n);
                foreach (var (nappi, url) in n.Kierrokset)
                {
                    string u = url;
                    var b = Rakenne.Nappi(nappi.ToUpperInvariant() + " ›", "mk-nosto__kierros", () => Application.OpenURL(u), sisus);
                    Kirjasimet.Aseta(b, Kirjasin.Kone);
                }
                if (n.LeikekirjaValo != null) Leikekirja(sisus, n);
                // Reaktiot kortin loppuun: tunniste on kohteen oma id (web kohdeReaktioTunniste).
                Reaktiot.Piirra(sisus, Reaktiot.KohdeAvain(n.Id), n.Otsikko);
            }
        }

        // --- lajien lohkot ------------------------------------------------------------------

        /// <summary>Web piirraNostonKysymykset / piirraKohdeKysymykset: napautus sulkee kortin ja kysyy pululta.</summary>
        void KysyPululta(VisualElement isa, Nosto n)
        {
            if (n.Kysymykset.Count == 0) return;
            var q = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-nosto__kysyotsikko", isa);
            q.enableRichText = true;
            Kirjasimet.Aseta(q, Kirjasin.KoneLihava);
            for (int i = 0; i < n.Kysymykset.Count; i++)
            {
                string kk = n.Kysymykset[i];
                Action kysy = () => { Sulje(); UiNakymat.Hae()?.Chat.Kysy(kk); };
                var b = Rakenne.Nappi(kk, "mk-nosto__kysymys", kysy, isa);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                napit["kysy" + i] = kysy;
            }
        }

        /// <summary>
        /// Web piirraNostonMedia (ui.lisaaNostonNapit): ääninäyte ja vapaa musiikkinäyte soivat pelissä,
        /// Apple Music -linkit aukeavat selaimeen. Rivi vain, jos jokin kenttä on.
        /// </summary>
        void Media(VisualElement isa, Nosto n)
        {
            if (n.Aani == null && n.MusiikkiNayte == null && n.Musiikkilinkit.Count == 0) return;
            var rivi = Rakenne.El("mk-nosto__media", isa, PickingMode.Ignore);
            void Nappi(string teksti, string otsake, Action a)
            {
                var b = Rakenne.Nappi(teksti, "mk-nosto__medianappi", a, rivi);
                if (otsake != null) b.tooltip = otsake;
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            if (n.Aani != null) { string u = n.Aani; Nappi("▷ Kuuntele näyte", null, () => Puhe.Hae()?.Soita(u)); }
            foreach (var (nimi, url) in n.Musiikkilinkit) { string u = url; Nappi(nimi + " ›", null, () => Application.OpenURL(u)); }
            if (n.MusiikkiNayte != null)
            {
                string u = n.MusiikkiNayte;
                Nappi("▷ Kuuntele musiikkia", n.MusiikkiNayteNimi ?? "Vapaasti lisensoitu ääninäyte", () => Puhe.Hae()?.Soita(u));
            }
        }

        /// <summary>Web piirraNostonValokuva: "näin se löytyi" pienempänä tekstin alla, napautus suurentaa.</summary>
        void Valokuva(VisualElement isa, NostoKuva k)
        {
            var lohko = Rakenne.El("mk-nosto__valokuva", isa, PickingMode.Ignore);
            Kuvakehys(lohko, k, () => SuurennaYksi(k));
            if (!string.IsNullOrEmpty(k.Lyhyt)) Kirjasimet.Aseta(Rakenne.Teksti(k.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.LukuKursiivi);
            napit["valokuva"] = () => SuurennaYksi(k);
        }

        /// <summary>
        /// Web piirraNostonKarttaliite: "Isoisän matkakirjan liite" omana arkkinaan jutun jälkeen; kartta
        /// luetaan vasta suurena, joten napautus avaa suurennoksen. Lataamaton kuva vie koko liitteen.
        /// </summary>
        void Karttaliite(VisualElement isa, NostoKuva k)
        {
            var liite = Rakenne.El("mk-nosto__liite", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("ISOISÄN MATKAKIRJAN LIITE", "mk-nosto__liiteotsake", liite), Kirjasin.Luku);
            Action avaa = () => SuurennaYksi(k);
            var nappi = Rakenne.Nappi(null, "mk-nosto__liitenappi", avaa, liite);
            nappi.tooltip = "Avaa kartta suurena";
            var kuva = Rakenne.El("mk-nosto__liitekuva", nappi, PickingMode.Ignore);
            // Taitteen viivat (web .fokusnosto-liitekehys::after): arkki on ollut taitettuna kirjan välissä.
            Rakenne.El("mk-nosto__liitetaite mk-nosto__liitetaite--pysty", nappi, PickingMode.Ignore);
            Rakenne.El("mk-nosto__liitetaite mk-nosto__liitetaite--vaaka", nappi, PickingMode.Ignore);
            int v = versio;
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (v != versio) return;
                if (t == null) { liite.RemoveFromHierarchy(); napit.Remove("liite"); return; }
                kuva.style.backgroundImage = new StyleBackground(t);
            });
            var teksti = string.Join(" · ", new[] { k.Lyhyt, k.LahdeRivi }.Where(x => !string.IsNullOrEmpty(x)));
            if (teksti.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-nosto__kuvateksti", liite), Kirjasin.LukuKursiivi);
            napit["liite"] = avaa;
        }

        /// <summary>
        /// Web nostonKarttakohde + kohdenappi: kortti kiinni ja kohteen oma kortti auki (web avaaFokuskohde).
        /// </summary>
        void Kohdenappi(VisualElement isa, Nosto n)
        {
            Action katso = () => KatsoKartalla(n);
            var b = Rakenne.Nappi("→ Katso " + n.KohdeNimi + " kartalla", "mk-nosto__kohdenappi", katso, isa);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            napit["kartalla"] = katso;
        }

        void KatsoKartalla(Nosto n)
        {
            // Web: suljeNostonKortti + avaaFokuskohde — kamera ei liiku, kohteen kortti aukeaa heti.
            string valo = "kohde:" + n.KohdeId + (n.KohdeIso != null ? "@" + n.KohdeIso : "");
            Sulje();
            Avaa(valo);
        }

        /// <summary>
        /// Web piirraKohteenNosto: kohteen nimeävä täkynosto aukeaa kohdekortista. Klikkiotsikko on
        /// napin sisältö — lupaus lunastetaan noston omassa kortissa.
        /// </summary>
        void Leikekirja(VisualElement isa, Nosto n)
        {
            string valo = n.LeikekirjaValo;
            Action avaa = () => Avaa(valo);
            var b = Rakenne.Nappi(null, "mk-nosto__leikekirja", avaa, isa);
            Kirjasimet.Aseta(Rakenne.Teksti("LIVIAN LEIKEKIRJA", "mk-nosto__leikekirjaotsake", b), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(n.LeikekirjaOtsikko, "mk-nosto__leikekirjaotsikko", b), Kirjasin.Luku);
            napit["leikekirja"] = avaa;
        }

        /// <summary>Web piirraIhmenappi: tähti (kadonneiden ihmeiden karttamerkki) ja napin teksti versaalina.</summary>
        void Ihmenappi(VisualElement isa, Nosto n)
        {
            var k = n.Ihme;
            Action avaa = () => SuurennaYksi(k);
            var b = Rakenne.Nappi(null, "mk-nosto__ihmenappi", avaa, isa);
            var tahti = new SvgIkoni(NostoMerkit.Ruusu) { Ruutu = 16, Alku = new Vector2(-8, -8) };
            tahti.AddToClassList("mk-ikoni--tayta");
            tahti.AddToClassList("mk-nosto__ihmetahti");
            b.Add(tahti);
            Kirjasimet.Aseta(Rakenne.Teksti((n.IhmeNappi ?? "Koe ihme").ToUpperInvariant(), "mk-nappi__teksti", b), Kirjasin.Kone);
            napit["ihme"] = avaa;
        }

        /// <summary>
        /// Matkakirjan ihmeen kulmanauha (web piirraIhmenauha, PUNA-sävy): vino kaista kuvan vasemmassa
        /// yläkulmassa. Isäntä on kuvaelementti (scale-to-fit); nauha siirtyy kuvan todelliseen kulmaan.
        /// </summary>
        public static VisualElement Ihmenauha(VisualElement kuva, string teksti)
        {
            var nauha = Rakenne.El("mk-ihmenauha", kuva, PickingMode.Ignore);
            var kaista = Rakenne.Teksti((teksti ?? "").ToUpperInvariant(), "mk-ihmenauha__kaista", nauha);
            Kirjasimet.Aseta(kaista, Kirjasin.LukuLihava);
            return nauha;
        }

        /// <summary>Nauha kuvan todelliseen vasempaan yläkulmaan (tausta sovitetaan laatikkoon).</summary>
        public static void SovitaNauha(VisualElement kuva, VisualElement nauha, Texture2D t)
        {
            if (nauha == null || t == null) return;
            var r = kuva.contentRect;
            if (r.width <= 0 || r.height <= 0 || t.width <= 0 || t.height <= 0) return;
            float s = Mathf.Min(r.width / t.width, r.height / t.height);
            nauha.style.left = Mathf.Round((r.width - t.width * s) / 2f);
            nauha.style.top = Mathf.Round((r.height - t.height * s) / 2f);
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
            var nauha = k.Nauha != null ? Ihmenauha(kuva, k.Nauha) : null;
            if (nauha != null) nauha.style.display = DisplayStyle.None; // näkyviin, kun kuvan kulma tiedetään
            Texture2D ladattu = null;
            if (nauha != null) kuva.RegisterCallback<GeometryChangedEvent>(_ => SovitaNauha(kuva, nauha, ladattu));
            int v = versio;
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (t == null || v != versio) return;
                ladattu = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                if (nauha == null) return;
                nauha.style.display = DisplayStyle.Flex;
                SovitaNauha(kuva, nauha, t);
            });
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

        void Suurenna(int alku) => suurennos.Avaa(nosto.Kuvat.Select(Lehtikuva).ToList(), alku);

        void SuurennaYksi(NostoKuva k) => suurennos.Avaa(new List<LehtiKuva> { Lehtikuva(k) });

        static LehtiKuva Lehtikuva(NostoKuva k) => new LehtiKuva
        {
            Lahde = k.Lahde, Lyhyt = k.Lyhyt, Selite = k.Selite ?? k.Lyhyt, Nauha = k.Nauha,
            Reaktio = k.Reaktio, ReaktioOtsikko = k.ReaktioOtsikko,
            LahdeRivi = string.Join(" · ", new[] { k.Tekija, k.LahdeRivi }.Where(x => !string.IsNullOrEmpty(x))),
        };

        // --- minivisa ja palkkiot -----------------------------------------------------------

        void Visa(VisualElement isa, Nosto n)
        {
            // Lukijan kysymys (kohde, täkynosto: web piirraNostonVisa) otsakkeineen ja vihjeineen;
            // skandaali, hetki ja syvennys (web piirraSyvennysVisa) kertovat palkkion.
            bool lukijan = n.Laji == NostoLaji.Kohde || n.Laji == NostoLaji.Takynosto;
            var laatikko = Rakenne.El("mk-nosto__visa", isa, PickingMode.Ignore);
            if (lukijan) Kirjasimet.Aseta(Rakenne.Teksti(n.Visa.Otsake ?? "LUKIJAN KYSYMYS", "mk-nosto__visaotsikko", laatikko), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(n.Visa.Kysymys, "mk-nosto__visakysymys", laatikko), Kirjasin.LukuLihava);
            var o = PeliOhjain.Instanssi;
            bool vastattu = o?.Kaupat != null && o.Kaupat.MinitehtavaVastattu(n.VisaKaupunki, n.VisaAihe);
            if (vastattu)
            {
                Rakenne.Teksti(n.Visa.Fakta ?? "Tähän on jo vastattu.", "mk-nosto__visavihje", laatikko);
                return;
            }
            var vihje = Rakenne.Teksti(lukijan ? n.Visa.Vihje ?? $"Vastaus löytyy tästä jutusta · +{n.VisaPalkkio} puntaa"
                : $"Oikeasta vastauksesta saat {n.VisaPalkkio} puntaa.", "mk-nosto__visavihje", laatikko);
            var napitVisa = new List<Button>();
            var tulos = Rakenne.Teksti("", "mk-nosto__visatulos", laatikko);
            tulos.style.display = DisplayStyle.None;
            var juliste = n.VisaJuliste != null ? Juliste(n.VisaJuliste) : null;
            for (int i = 0; i < n.Visa.Vaihtoehdot.Count; i++)
            {
                int valinta = i;
                Button b = null;
                Action vastaa = () =>
                {
                    if (!b.enabledSelf) return;
                    bool oikein = valinta == n.Visa.Oikea;
                    bool julisteUusi = false;
                    var peli = PeliOhjain.Instanssi;
                    // Yksi teko: vastaus, nostotehtävälaskuri (web kirjaaNostotehtava) ja juliste
                    // (web myonnaJuliste) samaan tallennukseen.
                    var t = peli?.KauppaTeko(k =>
                    {
                        var r = k.Minitehtava(n.VisaKaupunki, n.VisaAihe, oikein, n.VisaPalkkio);
                        if (r.Ok && oikein)
                        {
                            if (n.VisaNostotehtava) k.KirjaaNostotehtava();
                            if (juliste != null && !k.JulisteLaukussa(n.VisaJuliste)) julisteUusi = k.MyonnaJuliste(n.VisaJuliste).Uusi;
                        }
                        return r;
                    }, oikein ? n.VisaRahaSyy : null);
                    // Testiavaus ilman peliä: juliste näytetään kuin se olisi myönnetty.
                    if (peli == null) julisteUusi = oikein && juliste != null;
                    foreach (var x in napitVisa) x.SetEnabled(false);
                    napitVisa[n.Visa.Oikea].AddToClassList("mk-oikein");
                    if (!oikein) b.AddToClassList("mk-vaarin");
                    // Web: vihjerivi oli lupaus vastaamattomalle; tulos korvaa sen.
                    if (lukijan) vihje.style.display = DisplayStyle.None;
                    tulos.text = t != null && !t.Ok && t.Virhe != null && t.Virhe != "Jo vastattu" ? t.Virhe
                        : oikein ? $"Oikein! +{n.VisaPalkkio} puntaa." : $"Oikea vastaus: {n.Visa.Vaihtoehdot[n.Visa.Oikea]}.";
                    if (!string.IsNullOrEmpty(n.Visa.Fakta)) tulos.text += " " + n.Visa.Fakta;
                    tulos.EnableInClassList("mk-oikein", oikein);
                    tulos.style.display = DisplayStyle.Flex;
                    if (julisteUusi)
                    {
                        // Web syvennys: juliste laukkuun heti, katselu napista (naytaJuliste).
                        Action nayta = () => NaytaJuliste(juliste);
                        var lunasta = Rakenne.Nappi("Lunasta juliste", "mk-nosto__lunastus", nayta, laatikko);
                        Kirjasimet.Aseta(lunasta, Kirjasin.LukuLihava);
                        napit["juliste"] = nayta;
                    }
                };
                b = Rakenne.Nappi(n.Visa.Vaihtoehdot[i], "mk-nosto__visanappi", vastaa, laatikko);
                Kirjasimet.Aseta(b, Kirjasin.Luku);
                napitVisa.Add(b);
                napit["vastaa" + i] = vastaa;
            }
        }

        /// <summary>Kaupungin juliste (web kaupunginJuliste = JULISTEET[kaupunki]).</summary>
        static JulisteTiedot Juliste(string kaupunki) =>
            UiSisalto.Julisteet.FirstOrDefault(j => j.Id == kaupunki) ?? UiSisalto.Julisteet.FirstOrDefault(j => j.Id == null && j.Kaupunki == kaupunki);

        void NaytaJuliste(JulisteTiedot j) =>
            suurennos.Avaa(new List<LehtiKuva>
            {
                new LehtiKuva
                {
                    Lahde = j.Url, Otsikko = j.Otsikko, Lyhyt = j.Lyhyt, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko,
                    LahdeRivi = "Matkakirjan oma paino",
                },
            });

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
