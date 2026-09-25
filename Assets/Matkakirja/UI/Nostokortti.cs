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
        // Kaksipalstataitto ≥ 1100 pt (web nostoPalstoiksi): rivi = kuvapalsta (kuvasarja) + tekstipalsta (loput).
        VisualElement rivi, kuvapalsta, tekstipalsta;
        float korttiPohja, kuvaKorkeusKatto, kuvaSuhde = 2f / 3f;
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
            // Kierto tai ikkunan koko: kuva edellä -kortin leveys uudelleen (web asemoi resize-kuuntelijassa).
            kerros.RegisterCallback<GeometryChangedEvent>(e => { if (Auki && !Mathf.Approximately(e.oldRect.width, e.newRect.width)) MitoitaKuvaEdella(); });
            kortti.RegisterCallback<GeometryChangedEvent>(_ => EsittelynYlin());
            kortti.RegisterCallback<PointerDownEvent>(EleAlkoi, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerMoveEvent>(EleLiikkui, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerUpEvent>(EleLoppui, TrickleDown.TrickleDown);
            kortti.RegisterCallback<PointerCaptureOutEvent>(_ => { raahaa = false; eleId = -1; kortti.RemoveFromClassList("mk-nosto--raahauksessa"); });
            kortti.RegisterCallback<ClickEvent>(NapautusKorttiin);

            suurennos = new Kuvasuurennos(ui.Juuri(UiKerros.Valikot)) { Tayteen = true }; // löydös 102
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
            kuvaSuhde = 2f / 3f;
            kortti.EnableInClassList("mk-nosto--looppi", n.Looppi);
            kortti.EnableInClassList("mk-nosto--kohde", n.Laji == NostoLaji.Kohde);
            lisakaupunkiPaikka = false;
            AsetaPaikka(n.Kuvat.Count == 0);
            if (n.Kuvat.Count > 0) Vaihe1(); else Vaihe2();
            MitoitaKuvaEdella();
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

        // Web js/nostokuva.js (kuva edellä): NOSTOKUVA_MARGINAALI 12, VAAKAVARA 44, PYSTYVARA 150, KAPEA_KATTO 760,
        // VARA_ARVIO 48, LEVEA_RAJA 1100; suurennoksenMitat (js/ui-apurit.js) kertoimet 0,99 / 0,82 / 0,94 ja vähin 0,28.
        const float KuvaMarginaali = 12f, KuvaVaakavara = 44f, KuvaPystyvara = 150f, KuvaKapeaKatto = 760f, KuvaVaraArvio = 48f,
            KuvaLeveaRaja = 1100f;

        // Web NOSTOKUVA_LEVEA_KATTO 1100, KUVAPALSTA_OSUUS 0,5 ja PYSTY_OSUUS 0,32; css/fokusnosto.css osio 13:
        // palstaväli 1,5 rem (24 px), kuvapalsta enintään 50 % (pystykuvalla 34 %) rivistä.
        const float KuvaLeveaKatto = 1100f, KuvapalstaOsuus = 0.5f, KuvapalstaPystyOsuus = 0.32f, KutistusMs = 260f;

        /// <summary>
        /// Web nostokuvanVakioleveys: vaakakuvan (3:2) leveys ruudulla. Alle 1100 pt:n katettuna KAPEA_KATTO −
        /// VARA_ARVIO (712); leveällä (kapea = false) ilman kattoa (web enintaanLeveys Infinity).
        /// </summary>
        static float KuvaVakioleveys(float rl, float rk, bool kapea = true)
        {
            const float suhde = 1.5f;
            bool pysty = rk >= rl; // vaakakuva pystyruudulla = vastakkainen
            float leveys = (pysty ? rl * 0.99f : rl * 0.82f) - KuvaVaakavara;
            if (kapea) leveys = Mathf.Min(leveys, KuvaKapeaKatto - KuvaVaraArvio);
            float korkeus = KuvaKorkeusKatto(rk);
            if (leveys / suhde > korkeus) leveys = korkeus * suhde;
            return Mathf.Round(leveys);
        }

        /// <summary>Web suurennoksenMitat: kuvan korkeuskatto max(0,94 × ruutu − 150, 0,28 × ruutu).</summary>
        static float KuvaKorkeusKatto(float rk) => Mathf.Max(rk * 0.94f - KuvaPystyvara, rk * 0.28f);

        // Web NOSTOKUVA_YLAVARA 88 (omistaja 12.9.): vaiheen 1 kortti ei jää keskitettynä tätä alemmas, jotta vaiheen 2
        // kortti alkaa yläpalkin kohdalta eikä kartalta.
        const float KuvaYlavara = 88f;

        /// <summary>
        /// Web nostokuvanYlin: vaiheen 1 kortti pystysuunnassa keskelle turva-aluetta, mutta enintään
        /// NOSTOKUVA_MARGINAALI + NOSTOKUVA_YLAVARA (100 pt) yläreunasta. Muulloin kerros keskittää (.mk-himmennys).
        /// </summary>
        void EsittelynYlin()
        {
            bool esittely = Auki && !ankkuroitu && kortti.ClassListContains("mk-nosto--esittely");
            if (!esittely)
            {
                if (kerros.style.justifyContent.keyword != StyleKeyword.Null) { kerros.style.justifyContent = StyleKeyword.Null; kerros.style.paddingTop = StyleKeyword.Null; }
                return;
            }
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            // iPhonella ei ole yläpalkkia (NATIIVIN iPHONE-ASETTELU): pilleri ja saapumispalkki ovat samoilla y-arvoilla kuin
            // webin yläpalkki ja palkki Safarin näkymässä, joten ruutu alkaa näytön yläreunasta (b12l: turva-alueesta
            // mitattuna kortti jäi 62 pt webiä alemmas). iPadilla turva-alueen alta kuten ennen.
            float yla = UiKerros.Tabletti ? t.y : 0f;
            float rk = kerros.layout.height - yla - t.w, h = kortti.layout.height;
            if (rk <= 0 || h <= 0 || float.IsNaN(h)) return;
            float ylin = Mathf.Max(KuvaMarginaali, Mathf.Min(Mathf.Round((rk - h) / 2f), KuvaMarginaali + KuvaYlavara));
            kerros.style.justifyContent = Justify.FlexStart;
            float p = Mathf.Round(Mathf.Max(yla + ylin, t.y + KuvaMarginaali));
            if (kerros.resolvedStyle.paddingTop != p) kerros.style.paddingTop = p;
        }

        /// <summary>
        /// Web jaadytaLeveys: kuva edellä -kortin leveys, vakioleveys + kortin reunus ja täyte, enintään ruutu − 2 × 12.
        /// Alle 1100 pt:n leveys on sama molemmissa vaiheissa (kuva ei liiku) ja enintään KAPEA_KATTO 760.
        /// ≥ 1100 pt (web NOSTOKUVA_LEVEA_RAJA, iPad vaakana): vaiheessa 1 iso kuva ilman kattoa; vaiheessa 2 pohja
        /// min(vakioleveys, 1100 − 48), kortti enintään 1100, kuva vasemmalle palstaansa ja teksti oikealle.
        /// </summary>
        void MitoitaKuvaEdella()
        {
            bool kuvaEdella = !ankkuroitu && nosto != null && nosto.Kuvat.Count > 0;
            var pohja = kerros.panel?.visualTree.layout ?? default;
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float rl = pohja.width - t.x - t.z, rk = pohja.height - t.y - t.w;
            if (!kuvaEdella || rl <= 0 || rk <= 0)
            {
                Pinoksi();
                if (!ankkuroitu) { kortti.style.width = StyleKeyword.Null; kortti.style.maxWidth = StyleKeyword.Null; }
                return;
            }
            // Reunus 1 + täyte 15,2 kummallakin puolella (web .fokuskohde-popup, mitattu 24.9. b11).
            const float vara = 2f * (1f + 15.2f);
            float enintaan = rl - 2f * KuvaMarginaali, leveys;
            if (rl < KuvaLeveaRaja)
            {
                Pinoksi();
                leveys = Mathf.Min(KuvaVakioleveys(rl, rk) + vara, Mathf.Min(enintaan, KuvaKapeaKatto));
            }
            else if (kortti.ClassListContains("mk-nosto--esittely"))
                leveys = Mathf.Min(KuvaVakioleveys(rl, rk, kapea: false) + vara, enintaan);
            else
            {
                korttiPohja = Mathf.Min(KuvaVakioleveys(rl, rk, kapea: false), KuvaLeveaKatto - KuvaVaraArvio);
                kuvaKorkeusKatto = KuvaKorkeusKatto(rk);
                leveys = Mathf.Min(korttiPohja + vara, Mathf.Min(enintaan, KuvaLeveaKatto));
                Palstoiksi();
                MitoitaKuvapalsta();
            }
            leveys = Mathf.Round(leveys);
            if (kortti.style.width.value.value != leveys) { kortti.style.width = leveys; kortti.style.maxWidth = leveys; }
        }

        /// <summary>
        /// Web nostoPalstoiksi: kuvasarja (kuva, laskuri ja kuvateksti) vasempaan palstaan, kaikki sen jälkeen
        /// oikeaan; sitä edeltävät (luokka, otsikko, ingressi, äänet) jäävät koko leveydelle.
        /// </summary>
        void Palstoiksi()
        {
            if (rivi != null) return;
            var c = sisus.contentContainer;
            var lohko = c.Children().FirstOrDefault(x => x.ClassListContains("mk-nosto__kuvasarja"));
            if (lohko == null) return;
            int i = c.IndexOf(lohko);
            var jalkeen = c.Children().Skip(i + 1).ToList();
            rivi = Rakenne.El("mk-nosto__rivi", null, PickingMode.Ignore);
            kuvapalsta = Rakenne.El("mk-nosto__kuvapalsta", rivi, PickingMode.Ignore);
            tekstipalsta = Rakenne.El("mk-nosto__tekstipalsta", rivi, PickingMode.Ignore);
            c.Insert(i, rivi);
            kuvapalsta.Add(lohko);
            foreach (var x in jalkeen) tekstipalsta.Add(x);
            AsetaKehyksenSuhde(kuvaSuhde);
        }

        /// <summary>Palstat takaisin pinoksi (kierto alle 1100 pt:n): kuva ylös 3:2-kehykseen, teksti alle.</summary>
        void Pinoksi()
        {
            if (rivi == null) return;
            var c = sisus.contentContainer;
            int i = c.IndexOf(rivi);
            var lapset = kuvapalsta.Children().Concat(tekstipalsta.Children()).ToList();
            rivi.RemoveFromHierarchy();
            foreach (var x in lapset) c.Insert(i++, x);
            rivi = kuvapalsta = tekstipalsta = null;
            AsetaKehyksenSuhde(null);
        }

        /// <summary>
        /// Web: kuva kapenee palstaansa, pohja × 0,5 (pystykuva × 0,32), ja saa oman muotonsa korkeuden enintään
        /// kuvan korkeuskattoon (nostokuvanSovitus).
        /// </summary>
        void MitoitaKuvapalsta()
        {
            if (kuvapalsta == null) return;
            float w = korttiPohja * (kuvaSuhde > 1f ? KuvapalstaPystyOsuus : KuvapalstaOsuus);
            if (kuvaKorkeusKatto > 0f && w * kuvaSuhde > kuvaKorkeusKatto) w = kuvaKorkeusKatto / kuvaSuhde;
            w = Mathf.Round(w);
            if (kuvapalsta.style.width.value.value != w) kuvapalsta.style.width = w;
        }

        /// <summary>Kuvasarjan kehyksen korkeus/leveys-suhde: palstassa kuvan oma muoto, pinossa (null) 3:2.</summary>
        void AsetaKehyksenSuhde(float? suhde)
        {
            var kehys = sisus.contentContainer.Q(className: "mk-nosto__kuvapaikka")?.Q(className: "mk-nosto__kuvakehys");
            if (kehys == null) return;
            kehys.userData = suhde;
            float w = kehys.layout.width;
            if (w > 0 && !float.IsNaN(w)) kehys.style.height = Mathf.Round(w * (suhde ?? 2f / 3f));
        }

        /// <summary>Kuvasarjan kuva latautui: muoto talteen, palstassa kehys ja palstan leveys sen mukaan.</summary>
        void SarjanKuvaLadattu(Texture2D t)
        {
            if (t == null || t.width <= 0 || t.height <= 0) return;
            kuvaSuhde = t.height / (float)t.width;
            if (rivi == null) return;
            AsetaKehyksenSuhde(kuvaSuhde);
            MitoitaKuvapalsta();
        }

        /// <summary>
        /// Web kutistaNakyvasti (FLIP, NOSTOKUVA_KUTISTUS_MS 260): kuva piirretään ensin vaiheen 1 paikkaansa ja
        /// liukuu ja pienenee palstaansa. Teksti on heti paikallaan.
        /// </summary>
        void Kutista(Rect ennen)
        {
            var kehys = kuvapalsta?.Q(className: "mk-nosto__kuvakehys");
            if (kehys == null) return;
            int v = versio;
            void Alusta(GeometryChangedEvent g)
            {
                var nyt = kehys.worldBound;
                if (nyt.width <= 0 || float.IsNaN(nyt.width)) return;
                kehys.UnregisterCallback<GeometryChangedEvent>(Alusta);
                if (v != versio) return;
                float s = ennen.width / nyt.width;
                var d = ennen.position - nyt.position;
                kehys.style.transformOrigin = new TransformOrigin(0, 0);
                void Aseta(float k)
                {
                    float e = 1f - (1f - k) * (1f - k) * (1f - k); // ease-out
                    kehys.style.scale = new Scale(Vector2.one * Mathf.Lerp(s, 1f, e));
                    kehys.style.translate = new Translate(Mathf.Lerp(d.x, 0f, e), Mathf.Lerp(d.y, 0f, e));
                }
                Aseta(0f);
                kehys.experimental.animation.Start(0f, 1f, (int)KutistusMs, (_, k) => Aseta(k))
                    .OnCompleted(() => { kehys.style.scale = StyleKeyword.Null; kehys.style.translate = StyleKeyword.Null; });
            }
            kehys.RegisterCallback<GeometryChangedEvent>(Alusta);
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
            // Kuva edellä -kortissa (vaihe 1) ei ole yläriviä eikä otsikkoa: kahvana on kortin ylin kaista.
            eleKahvasta = OnKahva(e.position);
        }

        /// <summary>Kortin yläreunan kaista, josta raahaus alkaa myös ilman yläriviä (löydös 79).</summary>
        const float KahvanKorkeus = 28f;

        /// <summary>Ele alkoi raahauskahvasta (ylärivi tai otsikko).</summary>
        bool eleKahvasta;

        /// <summary>
        /// Löydös 79 (omistaja 25.9.2026, sitova): korttia liikutetaan vain yläreunasta eli webin raahauskahvasta
        /// (css/fokuskohteet.css: .fokuskohde-ylarivi ja .fokuskohde-otsikko, touch-action none). Muu kortti jää
        /// vieritykselle ja napautuksille.
        /// </summary>
        bool OnKahva(Vector2 kohta)
        {
            // Paikan mukaan, ei kohteen: ylärivi ja otsikko ovat PickingMode.Ignore, joten osuma menee vieritykselle.
            if (kohta.y - kortti.worldBound.yMin < KahvanKorkeus) return true;
            bool osui = false;
            kortti.Query(className: "mk-nosto__ylarivi").ForEach(v => osui |= v.resolvedStyle.display != DisplayStyle.None && v.worldBound.Contains(kohta));
            if (!osui) kortti.Query(className: "mk-nosto__otsikko").ForEach(v => osui |= v.resolvedStyle.display != DisplayStyle.None && v.worldBound.Contains(kohta));
            return osui;
        }

        /// <summary>Web raahausTaiSulku: kynnyksen ylittävä liike siirtää korttia; tekstin päällä pystyveto vierittää.</summary>
        void EleLiikkui(PointerMoveEvent e)
        {
            if (e.pointerId != eleId) return;
            Vector2 d = (Vector2)e.position - eleAlku;
            if (!raahaa)
            {
                if (d.magnitude < Raahauskynnys) return;
                // Löydös 79: vain kahvasta alkanut ele raahaa; muualla ele jää vieritykselle (ei napautus).
                if (!eleKahvasta) { eleId = -1; return; }
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
                    Kirjasimet.Aseta(Rakenne.Teksti(lk.Hero.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.Luku);
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
            rivi = kuvapalsta = tekstipalsta = null;
            napit.Clear();
            napit["lisaa"] = Vaihe2;
            sisus.scrollOffset = Vector2.zero;
            sulje.style.display = DisplayStyle.None;
            lukija.Aseta(null);
            kortti.AddToClassList("mk-nosto--esittely");
            var k = nosto.Kuvat[0];
            var kuva = Kuvakehys(sisus, k, Vaihe2, SarjanKuvaLadattu);
            var alarivi = Rakenne.El("mk-nosto__esittelyrivi", sisus, PickingMode.Ignore);
            // Web .nostokuva-selite keskitettynä ja .nostokuva-lisaa sen alla keskellä (mitattu 24.9. b11); lähde vain suurennoksessa.
            // Web nostokuvaAloita: kuvatekstiLyhyt(kuva), eläintäyn vakioselite vasta karusellissa (pariteetti b12-2 #27).
            Kuvateksti(alarivi, k.LyhytVara ? "" : k.Lyhyt ?? nosto.Otsikko ?? "", k);
            var lisaa = Rakenne.Nappi("LISÄÄ", "mk-nosto__lisaa", Vaihe2, alarivi);
            Kirjasimet.Aseta(lisaa, Kirjasin.Kone);
            MitoitaKuvaEdella();
        }

        // --- vaihe 2: koko kortti ----------------------------------------------------------

        void Vaihe2()
        {
            // Vaiheen 1 kuvan paikka ruudulla: leveällä kuva kutistuu siitä palstaansa (web kutistaNakyvasti).
            Rect? ennen = kortti.ClassListContains("mk-nosto--esittely")
                ? sisus.contentContainer.Q(className: "mk-nosto__kuvakehys")?.worldBound : null;
            sisus.Clear();
            rivi = kuvapalsta = tekstipalsta = null;
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

            Ylarivi(sisus, n);
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
            var otsikko = Rakenne.Teksti(n.Otsikko ?? "", n.Laji == NostoLaji.Kohde ? "mk-nosto__otsikko mk-nosto__otsikko--kohde" : "mk-nosto__otsikko", sisus);
            // Web .fokuskohde-otsikko: American Typewriter 700, 16,32 px, #211d18 (mitattu 24.9. b11).
            Kirjasimet.Aseta(otsikko, n.Laji == NostoLaji.Kohde ? Kirjasin.KoneBold : Kirjasin.LukuLihava);
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
            string nimi = n.Otsikko;
            void Linkit(Label l)
            {
                if (!l.text.Contains("<link=")) return;
                l.pickingMode = PickingMode.Position;
                l.RegisterCallback<UnityEngine.UIElements.Experimental.PointerUpLinkTagEvent>(e =>
                {
                    if (string.IsNullOrEmpty(e.linkID)) return;
                    Sulje();
                    UiNakymat.Hae()?.Chat.Kysy($"Kerro lisää: {e.linkID} (kohteessa {nimi})");
                });
            }
            var kappaleet = Kappaleet(n.Teksti).Select(k => Korosta(k, jaljella)).ToList();
            // Web lehtipalstaKotelo: pitkä teksti kahdelle palstalle, kun sen oma leveys ≥ 600 (iPadin kuvakortti).
            if (Lehtipalstat.OnPitka(n.Teksti, kappaleet.Count))
                Lehtipalstat.Luo(sisus, kappaleet, RiviValiAlku, "mk-nosto__teksti", Kirjasin.Luku, Linkit);
            else
                foreach (var k in kappaleet) Linkit(Rakenne.Teksti(RiviValiAlku + k, "mk-nosto__teksti", sisus));

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
            MitoitaKuvaEdella();
            if (rivi != null && ennen.HasValue && ennen.Value.width > 0) Kutista(ennen.Value);
        }

        /// <summary>
        /// Web nostosymKortinYlarivi / piirraKohdeYlarivi: aihesymboli ja luokka. Symboli 1,5 em (16,3 pt) rivin
        /// alussa, oikealla 0,4 em (4,35 pt), kaiverruskuva sisällä 14,1 pt (mitattu 24.9. b12, Millaun silta).
        /// Generoitu kuva UI/Resources/Symbolit/sym-*.png (web assets/kartat/symbolit/sym-*.webp); hetki ja ihme ovat
        /// webissä koodipiirtäjiä, joten niille ei ole kuvaa (rivi ilman symbolia).
        /// </summary>
        static void Ylarivi(VisualElement isa, Nosto n)
        {
            var rivi = Rakenne.El("mk-nosto__ylarivi mk-nosto__ylarivi--rivi", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(rivi, Kirjasin.Kone);
            var kuva = n.Symboli == null ? null : Resources.Load<Texture2D>("Symbolit/sym-" + n.Symboli);
            if (kuva != null)
            {
                var symboli = Rakenne.El("mk-nosto__ylarivi-symboli", rivi, PickingMode.Ignore);
                symboli.style.backgroundImage = new StyleBackground(kuva);
            }
            Rakenne.Teksti(n.Luokka ?? "", "mk-nosto__ylarivi-teksti", rivi);
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
            if (!string.IsNullOrEmpty(k.Lyhyt)) Kirjasimet.Aseta(Rakenne.Teksti(k.Lyhyt, "mk-nosto__kuvateksti", lohko), Kirjasin.Luku);
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

        /// <summary>Web jaaKappaleiksi (Kappalejako): tyhjät rivit, muuten ≥ 3 virkettä puolitettuna.</summary>
        static List<string> Kappaleet(string teksti) => Kappalejako.Jaa(teksti);

        // --- kuvat ------------------------------------------------------------------------

        VisualElement Kuvakehys(VisualElement isa, NostoKuva k, Action napautus, Action<Texture2D> ladattuna = null)
        {
            var kehys = Rakenne.El("mk-nosto__kuvakehys", isa);
            var kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => napautus?.Invoke());
            // 3:2-kehys leveyden mukaan (web oletussuhde); kaksipalstataiton kuvapalstassa kuvan oma muoto (userData).
            kehys.RegisterCallback<GeometryChangedEvent>(e =>
            {
                if (e.newRect.width > 0) kehys.style.height = Mathf.Round(e.newRect.width * (kehys.userData is float s ? s : 2f / 3f));
            });
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
                ladattuna?.Invoke(t);
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
            var teksti = Kuvateksti(lohko, "", null); // web .nostokuva-selite: Iowan pysty, keskitetty
            Label laskuri = null;
            void Nayta(int i)
            {
                kuvaIndeksi = (i + kuvat.Count) % kuvat.Count;
                kehysPaikka.Clear();
                var k = kuvat[kuvaIndeksi];
                int kohta = kuvaIndeksi;
                var kehys = Kuvakehys(kehysPaikka, k, () => Suurenna(kohta), SarjanKuvaLadattu);
                if (rivi != null) { kehys.userData = kuvaSuhde; MitoitaKuvapalsta(); }
                AsetaKuvateksti(teksti, k.Lyhyt, k);
                if (kuvat.Count > 1)
                {
                    laskuri = Rakenne.Teksti($"{kuvaIndeksi + 1} / {kuvat.Count}", "mk-nosto__laskuri", kehys);
                    Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
                }
            }
            // Löydös 34: reunanapautus ja pyyhkäisy selaavat (ei nuolia), keskiosa suurentaa.
            new KuvaSelaus(kehysPaikka, () => kuvat.Count, s => Nayta(kuvaIndeksi + s), () => kehysPaikka.childCount > 0 ? kehysPaikka[0] : kehysPaikka);
            Nayta(kuvaIndeksi);
        }

        // --- "Havainnekuva"-merkintä (web js/havainnekuva.js lisaaHavainnekuvaMerkki, css/fokusnosto.css
        // .kuvateksti-havainne; Fable 24.9. klo 20.3x: tarkoitettu merkki kaikissa korteissa) ----------------

        static readonly System.Text.RegularExpressions.Regex HavainneLahde =
            new System.Text.RegularExpressions.Regex(@"^\s*Tekoälyllä tuotettu havainnekuva\."),
            HavainneRivi = new System.Text.RegularExpressions.Regex("Matkakirjan (?:havainnekuva|kuvitus)");

        /// <summary>Web onHavainnekuva: lähderivi alkaa "Tekoälyllä tuotettu havainnekuva." tai mainitsee Matkakirjan havainnekuvan.</summary>
        static bool OnHavainnekuva(NostoKuva k)
        {
            string l = k?.LahdeRivi ?? "";
            return HavainneLahde.IsMatch(l) || HavainneRivi.IsMatch(l);
        }

        /// <summary>Lyhyt kuvateksti (web .nostokuva-selite) kotelona, johon havainnekuvan merkki mahtuu rivin jatkoksi.</summary>
        static VisualElement Kuvateksti(VisualElement isa, string teksti, NostoKuva k)
        {
            var kotelo = Rakenne.El("mk-nosto__kuvateksti mk-nosto__kuvateksti--kotelo", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(kotelo, Kirjasin.Luku);
            AsetaKuvateksti(kotelo, teksti, k);
            return kotelo;
        }

        /// <summary>
        /// Web lisaaHavainnekuvaMerkki: &lt;small&gt; inline-block kuvatekstin perässä. UITK ei kellota laatikkoa
        /// tekstirivin sisään, joten havainnekuvan teksti ladotaan sanoittain rivittyvään keskitettyyn riviin
        /// (sanaväli Iowan 13,44 px = 3,73 px, mitattu), ja merkki on sen viimeinen alkio. Muu kuvateksti yhtenä tekstinä.
        /// </summary>
        static void AsetaKuvateksti(VisualElement kotelo, string teksti, NostoKuva k)
        {
            kotelo.Clear();
            bool merkki = OnHavainnekuva(k);
            kotelo.style.display = string.IsNullOrEmpty(teksti) && !merkki ? DisplayStyle.None : DisplayStyle.Flex;
            if (!merkki)
            {
                if (!string.IsNullOrEmpty(teksti)) Rakenne.Teksti(teksti, "mk-nosto__kuvarivi", kotelo);
                return;
            }
            var sanat = (teksti ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < sanat.Length; i++)
                Rakenne.Teksti(sanat[i], i < sanat.Length - 1 ? "mk-nosto__kuvasana mk-nosto__kuvasana--vali" : "mk-nosto__kuvasana", kotelo);
            var m = Rakenne.Teksti("Havainnekuva".ToUpperInvariant(), "mk-nosto__havainne", kotelo);
            m.tooltip = "Tekoälyllä tuotettu havainnekuva";
            Kirjasimet.Aseta(m, Kirjasin.Kone);
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
