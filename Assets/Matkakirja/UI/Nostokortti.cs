// NOSTOKORTTI (Natiivi-UI): karttavalon napautuksesta avautuva kortti — webin
// fokuskohde (js/fokuskohteet.js), skandaalin lisälehti (js/skandaalit.js), historian
// hetki (js/historian-hetket.js), eläintäky (js/elaintaky.js), täkynosto (js/fokusnosto.js) ja
// syvennystarina (js/syvennys.js) yhtenä näkymänä.
//
// Kuva edellä kahdessa vaiheessa (js/nostokuva.js): 1) pelkkä kuva, lyhyt kuvateksti ja
// LISÄÄ; 2) koko kortti (kuvasarja ‹ › ja laskuri, teksti kappaleittain, lajin lohkot).
// Kuvaton kortti aukeaa suoraan vaiheeseen 2. Kuvan napautus vaiheessa 2 avaa suurennoksen
// (pitkä selite ja lähderivi). Sulkeminen: napautus kortin ohi tai kortin tekstiin/pohjaan (löydös 133: ei ✕-nappia).
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
// Kaiutin (web js/lukija.js lisaaLukijanappi, KortinLukija) vaiheessa 2 ylärivin oikeassa päässä (löydös 133).
// PAIKKA JA KOKO (löydökset 130, 131 ja 135, omistaja build 16; korvaa E3:n ankkuroinnin): jokainen kortti aukeaa
// keskelle himmennyksen päälle samalla leveydellä (Mitoita) — kuvallinen, kuvaton, kohde, lisäkaupunki ja
// skandaali (vain tyyli eri). Kuvallinen kortti aukeaa webin kuva edellä -tapaan (js/nostokuva.js), kuva omassa
// muodossaan korkeuskattoon asti; vaiheessa 2 kuva pysyy täsmälleen paikallaan (Korjaa). Löydös 137: korttia ei
// raahata (paikkaa ei tarvitse siirtää, ja otsikosta alkanut veto siirsi korttia vierityksen sijaan); pystyvieritys
// on Kosketusvieritys (löydös 51).
// Napautus kortin tekstiin tai pohjaan sulkee (web: pop-upin
// päällä napautus on sulku, painikkeen päällä valinta; matka < 6 px ja kesto < 700 ms). Testikomennot painavat kortin
// nappeja nimellä (Testaa: lisaa, ihme, leikekirja, kartalla, liite, valokuva, vastaa<n>, juliste).
// LISÄKAUPUNKI (web kaupunkinosto.js avaaLisakaupunginKortti, kohde.kaupunkikortti ohittaa kohdekortin):
// otsikkona kaupungin nimi, herokuva (kuvateksti ja lähderivi; ilman kuvaa paikkamerkki nimellä),
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
        readonly KortinLukija lukija;

        Nosto nosto;
        int kuvaIndeksi, versio;
        /// <summary>Kortin napit nimellä testikomentoja varten (ui nosto … &lt;nappi&gt;, ui ihme, ui leikekirja).</summary>
        readonly Dictionary<string, Action> napit = new Dictionary<string, Action>();

        public bool Auki { get; private set; }
        /// <summary>Löydös 132/150: noston kuva kokoruudulla (sumennuksen taso Kokoruutu).</summary>
        public bool KuvaKokoruudulla => suurennos != null && suurennos.Auki && suurennos.Kokoruutu;

        const float Napautuskynnys = 6f, NapautusMs = 700f;
        // Napautuksen alku (sulku napautuksesta, NapautusKorttiin).
        Vector2 eleAlku;
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
            lukija = new KortinLukija(kortti, luokka: "mk-nosto__lukija");
            Kirjasimet.Aseta(kortti, Kirjasin.Luku);
            // Kierto tai ikkunan koko: leveys uudelleen (web asemoi resize-kuuntelijassa), vaiheen 2 kortti keskelle.
            kerros.RegisterCallback<GeometryChangedEvent>(e =>
            {
                if (!Auki || Mathf.Approximately(e.oldRect.width, e.newRect.width)) return;
                VapautaPaikka();
                Mitoita();
            });
            kortti.RegisterCallback<GeometryChangedEvent>(_ => Pystypaikka());
            // Löydös 131: korjauksen vieritys, kun ScrollView on päivittänyt vieritysalueensa (sen omat kuuntelijat
            // rekisteröitiin rakentajassa ennen näitä, joten ne ajetaan ensin).
            sisus.contentContainer.RegisterCallback<GeometryChangedEvent>(_ => Vierita());
            sisus.contentViewport.RegisterCallback<GeometryChangedEvent>(_ => Vierita());
            kortti.RegisterCallback<PointerDownEvent>(EleAlkoi, TrickleDown.TrickleDown);
            kortti.RegisterCallback<ClickEvent>(NapautusKorttiin);
            // Löydös 137: UI Toolkitin ScrollView tökki kosketuksella (sama mittaus kuin lehdessä, löydös 51: heitto
            // liukui kolmanneksen Safarin matkasta); sama oma pystyvieritys kuin lehdellä. Kortin isä kuuntelee
            // TrickleDown-vaiheessa, joten vaakapyyhkäisy jää kuvasarjalle (KuvaSelaus) ja napautus napeille.
            Kosketusvieritys.Liita(kortti, () => sisus);

            suurennos = new Kuvasuurennos(ui.Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true }; // löydökset 102 ja 150
            suurennos.AukiMuuttui += Pehmenna;
        }

        // Löydös 132 (omistaja, build 16): kuva kokoruudulle → tausta pehmenee tummennuksen lisäksi. Kartta on jo
        // kameran kuvasumennuksessa (UiNakymat.PaivitaKuvaSumea → PalloKierto.KuvaSumea, 2,25 pt, koska nostokortti on auki),
        // mutta kamerasumennus ei koske UI:ta (PalloSumennus). Kortti sumennetaan siksi UI Toolkitin suotimella kuten
        // aloitusportin kone ja viiva (Etusivulento: blur-suodin, Paneeli.asset tuo Gauss-shaderin käännökseen).
        const float PehmennysPt = 4f;
        const int PehmennysAukiMs = 220, PehmennysKiinniMs = 180; // suurennoksen häivytys (Kuvasuurennos Avaa/Sulje)
        float pehmennys;
        IVisualElementScheduledItem pehmennysAjo;

        void Pehmenna(bool paalle)
        {
            pehmennysAjo?.Pause();
            float alku = pehmennys, loppu = paalle ? PehmennysPt : 0f;
            float kesto = (paalle ? PehmennysAukiMs : PehmennysKiinniMs) / 1000f, t0 = Time.unscaledTime;
            Ruudunpaivitys.Herata(kesto + 0.05f); // lämpö: häivytys täydellä taajuudella
            pehmennysAjo = kortti.schedule.Execute(() =>
            {
                float k = Mathf.Clamp01((Time.unscaledTime - t0) / kesto);
                AsetaPehmennys(Mathf.Lerp(alku, loppu, k));
                if (k >= 1f) { pehmennysAjo?.Pause(); pehmennysAjo = null; }
            }).Every(0);
        }

        void AsetaPehmennys(float pt)
        {
            pehmennys = pt;
            // Ei StyleKeyword.Nonea: UI Toolkit 6.3 kaatuu siihen (Etusivulento, Natiiviseppä 25.9.). Null = ei suodinta.
            if (pt <= 0.01f) { kortti.style.filter = StyleKeyword.Null; return; }
            var f = new FilterFunction(FilterFunctionType.Blur);
            f.AddParameter(new FilterParameter(pt));
            kortti.style.filter = new List<FilterFunction> { f };
        }

        /// <summary>Avaa kortin karttavalon id:llä (UiPalvelut.ValoNapautettu, testikomento) keskelle (löydös 135).</summary>
        public void Avaa(string valoId) => Avaa(valoId, null);

        // Löydös 134 (Pelikoodari): avauksen vaiheet lokiin — data (ms, kehyksiä), ensimmäinen näkyvä kehys, valmis.
        float avausAlku;
        int avausKehys;

        void Avaa(string valoId, Action<bool> jalkeen)
        {
            avausAlku = Time.realtimeSinceStartup;
            avausKehys = Time.frameCount;
            int v = ++versio;
            // Löydös 134: välimuistissa oleva data avaa kortin samassa kehyksessä (ei kehystä per sisäkkäinen haku).
            Korutiini.Kaynnista(UiKerros.Hae(), AvaaReitti(valoId, v, jalkeen));
        }

        /// <summary>
        /// Web: lisäkaupungin kaupunkikortti ennen kohteen tietoruutua (fokuskohteet.js avaaFokuskohde),
        /// muuten nostokortti. jalkeen(true) = jokin kortti aukesi (testikomennot painavat sen nappeja).
        /// </summary>
        System.Collections.IEnumerator AvaaReitti(string valoId, int v, Action<bool> jalkeen)
        {
            // Verkko-odotus: kortti on piilossa, kunnes data on jäsennetty (löydös 104).
            var odotus = VerkkoOdotus.Alku("nosto", valoId);
            Lisakaupunki lk = null;
            yield return NostoSisalto.HaeLisakaupunki(valoId, x => lk = x);
            if (v != versio) { VerkkoOdotus.Loppu(odotus, "ohitettu"); yield break; }
            if (lk != null)
            {
                VerkkoOdotus.Loppu(odotus, "lisakaupunki");
                napit.Clear();
                NaytaLisakaupunki(lk);
                MittaaAvaus(valoId, v);
                jalkeen?.Invoke(true);
                yield break;
            }
            Nosto n = null;
            yield return NostoSisalto.Hae(valoId, x => n = x);
            VerkkoOdotus.Loppu(odotus, v != versio ? "ohitettu" : n == null ? "ei sisältöä" : null);
            if (v != versio) yield break;
            if (n == null) Debug.Log("MATKAKIRJA ui nostot: ei sisältöä valolle " + valoId);
            else { Nayta(n); MittaaAvaus(valoId, v); }
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
            // Vanha ankkurimuoto "@x,y" (E3) ei enää vaikuta: kortti aukeaa aina keskelle (löydös 135).
            if (nappi != null && nappi.StartsWith("@")) nappi = null;
            Avaa(valoId, loytyi =>
            {
                if (!loytyi) { tulos?.Invoke("ei sisältöä valolle " + valoId); return; }
                Paina();
            });
        }

        void MittaaAvaus(string valoId, int v)
        {
            float dataMs = (Time.realtimeSinceStartup - avausAlku) * 1000f;
            int dataKehyksia = Time.frameCount - avausKehys;
            float nakyvaMs = -1f;
            IVisualElementScheduledItem ajo = null;
            ajo = kerros.schedule.Execute(() =>
            {
                if (v != versio) { ajo.Pause(); return; }
                float o = kerros.resolvedStyle.opacity;
                float ms = (Time.realtimeSinceStartup - avausAlku) * 1000f;
                if (nakyvaMs < 0 && o > 0.01f) nakyvaMs = ms;
                if (o < 0.99f && ms < 3000f) return;
                ajo.Pause();
                Debug.Log($"MATKAKIRJA ui nostot: avaus {valoId}: data {dataMs:0} ms ({dataKehyksia} kehystä), näkyvä {nakyvaMs:0} ms, "
                        + $"valmis {ms:0} ms ({Time.frameCount - avausKehys} kehystä), kuvia {nosto?.Kuvat.Count ?? 0}");
            }).Every(0);
        }

        public void Sulje()
        {
            versio++;
            if (!Auki) return;
            Auki = false;
            lukija.Pysayta();
            Rakenne.PiilotaHaivyttaen(kerros, 200);
            suurennos.Sulje();
            SyoteLukko.Vapauta(this);
        }

        void Nayta(Nosto n)
        {
            nosto = n;
            kuvaIndeksi = 0;
            kortti.EnableInClassList("mk-nosto--looppi", n.Looppi);
            kortti.EnableInClassList("mk-nosto--kohde", n.Laji == NostoLaji.Kohde);
            VapautaPaikka();
            Mitoita();
            if (n.Kuvat.Count > 0) Vaihe1(); else Vaihe2();
            AvaaKerros();
        }

        // --- koko ja paikka (löydökset 130, 131, 135) --------------------------------------------

        // Löydös 130 (omistaja, build 16): kuva aukeaa isompana ja kortti saa olla leveämpi (iPad ja iPhone). Kuvan
        // korkeuskatto on turva-alue − 150 pt (kuvateksti, LISÄÄ, kortin täyte ja reunavara; ennen web 0,94 × − 150) ja
        // vähintään 28 %; vakioleveys on 3:2-kuva tällä katolla. Kortti enintään turva-alue − 2 × 8 pt (ennen 2 × 12 ja
        // kapealla katto 760 pt: iPad pystyssä 744 → 818 pt). Leveällä (≥ 1100 pt) ei enää kattoa 1100 eikä palstoja.
        const float KuvaMarginaali = 12f, KuvaPystyvara = 150f, KuvaVahinOsuus = 0.28f, Sivuvara = 8f;

        /// <summary>Kortin reunus 1 + täyte 15,2 kummallakin puolella (web .fokuskohde-popup, mitattu 24.9. b11).</summary>
        const float KortinVara = 2f * (1f + 15.2f);

        /// <summary>Kuvan korkeuskatto pisteinä (Mitoita); kuvakehys saa kuvan oman muodon enintään tähän.</summary>
        float kuvaKatto;

        /// <summary>
        /// Löydös 135 (omistaja, build 16): kaikki kortit samaan kokoon ja tyyliin — kuvallinen, kuvaton, kohde, lisäkaupunki
        /// (esim. Lyon aukesi 544 pt:n ankkuroituna ja kuvaton kohde 384 pt:n) ja skandaali (vain tyyli eri, koko sama).
        /// Leveys ei riipu vaiheesta, joten kuva ei muuta kokoaan LISÄÄ-napautuksessa (löydös 131).
        /// </summary>
        void Mitoita()
        {
            var pohja = kerros.panel?.visualTree.layout ?? default;
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float rl = pohja.width - t.x - t.z, rk = pohja.height - t.y - t.w;
            if (float.IsNaN(rl) || float.IsNaN(rk) || rl <= 0 || rk <= 0)
            {
                kortti.style.width = StyleKeyword.Null;
                kortti.style.maxWidth = StyleKeyword.Null;
                return;
            }
            kuvaKatto = Mathf.Round(Mathf.Max(rk - KuvaPystyvara, rk * KuvaVahinOsuus));
            float leveys = Mathf.Round(Mathf.Min(kuvaKatto * 1.5f + KortinVara, rl - 2f * Sivuvara));
            if (kortti.style.width.value.value != leveys) { kortti.style.width = leveys; kortti.style.maxWidth = leveys; }
        }

        // Web NOSTOKUVA_YLAVARA 88 (omistaja 12.9.): vaiheen 1 kortti ei jää keskitettynä tätä alemmas, jotta vaiheen 2
        // kortti alkaa yläpalkin kohdalta eikä kartalta.
        const float KuvaYlavara = 88f;

        /// <summary>
        /// Löydös 131: vaiheen 2 kortin yläreuna (kerroksen täyte), jolla kuva jää täsmälleen vaiheen 1 paikalleen
        /// (Korjaa). null = kortti keskellä (kuvaton kortti, lisäkaupunki, kierron jälkeen).
        /// </summary>
        float? kiinteaYla;
        /// <summary>Vaiheen 1 kuvan paikka ruudulla (Vaihe2 → Korjaa); voimassa KorjausMs tai ensimmäiseen kosketukseen.</summary>
        Rect? kuvaEnnen;
        const long KorjausMs = 600;
        /// <summary>Korjauksen vieritys, joka odottaa ScrollViewin vieritysalueen päivitystä (&lt; 0 = ei odota).</summary>
        float odottavaVieritys = -1f;

        /// <summary>
        /// Web nostokuvanYlin: vaiheen 1 kortti pystysuunnassa keskelle turva-aluetta, mutta enintään
        /// NOSTOKUVA_MARGINAALI + NOSTOKUVA_YLAVARA (100 pt) yläreunasta; vaiheessa 2 (löydös 131) Korjaan yläreuna.
        /// Muulloin kerros keskittää (.mk-himmennys). Kortin korkeus enintään turva-alueen alareunaan.
        /// </summary>
        void Pystypaikka()
        {
            bool esittely = Auki && kortti.ClassListContains("mk-nosto--esittely");
            if (!esittely && !kiinteaYla.HasValue)
            {
                if (kerros.style.justifyContent.keyword != StyleKeyword.Null)
                {
                    kerros.style.justifyContent = StyleKeyword.Null;
                    kerros.style.paddingTop = StyleKeyword.Null;
                    kortti.style.maxHeight = StyleKeyword.Null;
                }
                return;
            }
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float kh = kerros.layout.height;
            if (float.IsNaN(kh) || kh <= 0) return;
            float p;
            if (kiinteaYla.HasValue) p = kiinteaYla.Value;
            else
            {
                // iPhonella ei ole yläpalkkia (NATIIVIN iPHONE-ASETTELU): pilleri ja saapumispalkki ovat samoilla y-arvoilla kuin
                // webin yläpalkki ja palkki Safarin näkymässä, joten ruutu alkaa näytön yläreunasta (b12l: turva-alueesta
                // mitattuna kortti jäi 62 pt webiä alemmas). iPadilla turva-alueen alta kuten ennen.
                float yla = UiKerros.Tabletti ? t.y : 0f;
                float rk = kh - yla - t.w, h = kortti.layout.height;
                if (rk <= 0 || h <= 0 || float.IsNaN(h)) return;
                float ylin = Mathf.Max(KuvaMarginaali, Mathf.Min(Mathf.Round((rk - h) / 2f), KuvaMarginaali + KuvaYlavara));
                p = Mathf.Round(Mathf.Max(yla + ylin, t.y + KuvaMarginaali));
            }
            kerros.style.justifyContent = Justify.FlexStart;
            if (kerros.resolvedStyle.paddingTop != p) kerros.style.paddingTop = p;
            float mh = Mathf.Round(kh - p - Mathf.Max(16f, t.w + KuvaMarginaali));
            if (kortti.resolvedStyle.maxHeight.value != mh) kortti.style.maxHeight = mh;
        }

        /// <summary>
        /// Löydös 131 (omistaja, build 16; web nostokuvanKorjaus kapealla ruudulla): LISÄÄ tai kuvan napautus ei liikuta
        /// kuvaa. Vaiheen 2 ylärivi, otsikko ja ingressi tulevat kuvan yläpuolelle ja teksti alle: kortin yläreuna nousee
        /// niiden verran, ja minkä turva-alue estää, sen verran sisältöä vieritetään. Leveys on sama (Mitoita), joten
        /// kuva ei myöskään pienene (webin työpöydän palstataitto kutisti sen, natiivissa ei).
        /// </summary>
        void Korjaa(VisualElement kehys)
        {
            if (!kuvaEnnen.HasValue || kehys?.panel == null || !Auki) return;
            var nyt = kehys.worldBound;
            float sisalto = sisus.contentContainer.worldBound.y, nakyma = sisus.contentViewport.worldBound.y;
            if (nyt.width <= 0 || float.IsNaN(nyt.y) || float.IsNaN(sisalto) || float.IsNaN(nakyma)) return;
            // Kuvan paikka ruudulla = kerros + yläreuna + (näkymä − kortti) + (kuva − sisältö) − vieritys.
            float kohta = nyt.y - sisalto, kortistaNakymaan = nakyma - kortti.worldBound.y;
            float tavoite = kuvaEnnen.Value.y - kerros.worldBound.y - kortistaNakymaan - kohta; // = yläreuna − vieritys
            var t = UiKerros.Hae().Reunat(UiKerros.Valikot);
            float p = Mathf.Round(Mathf.Max(t.y + KuvaMarginaali, tavoite));
            kiinteaYla = p;
            odottavaVieritys = Mathf.Max(0f, p - tavoite);
            Pystypaikka();
            Vierita();
        }

        /// <summary>Korjauksen vieritys; ScrollView rajaa arvon vieritysalueeseen, joten yritys toistuu sen päivittyessä.</summary>
        void Vierita()
        {
            if (odottavaVieritys < 0f) return;
            if (Mathf.Abs(sisus.scrollOffset.y - odottavaVieritys) > 0.25f) sisus.scrollOffset = new Vector2(0f, odottavaVieritys);
            if (Mathf.Abs(sisus.scrollOffset.y - odottavaVieritys) <= 0.25f) odottavaVieritys = -1f;
        }

        /// <summary>Kortti keskelle ilman vaiheen 2 korjausta (uusi kortti, kierto).</summary>
        void VapautaPaikka()
        {
            kiinteaYla = null;
            kuvaEnnen = null;
            odottavaVieritys = -1f;
        }

        void EleAlkoi(PointerDownEvent e)
        {
            // Sormi kortilla: vieritys on pelaajan, eikä myöhempi asettelu (kuvasarjan selaus) enää siirrä korttia.
            odottavaVieritys = -1f;
            kuvaEnnen = null;
            eleAlku = e.position;
            eleAika = Time.unscaledTime * 1000f;
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
            // Löydös 134 (omistaja, build 16): nosto näkyviin heti samassa kehyksessä, ei 220 ms:n sisäänhäivytystä
            // (Pelikoodarin mittaus: näkyvä 267 ms, josta häivytys 220 ms). Sulku häivyttää kuten ennen.
            Rakenne.NaytaHeti(kerros);
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
            VapautaPaikka();
            Mitoita();
            sisus.Clear();
            sisus.scrollOffset = Vector2.zero;
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
            napit.Clear();
            napit["lisaa"] = Vaihe2;
            sisus.scrollOffset = Vector2.zero;
            lukija.Aseta(null);
            kortti.AddToClassList("mk-nosto--esittely");
            var k = nosto.Kuvat[0];
            var kuva = Kuvakehys(sisus, k, Vaihe2);
            var alarivi = Rakenne.El("mk-nosto__esittelyrivi", sisus, PickingMode.Ignore);
            // Web .nostokuva-selite keskitettynä ja .nostokuva-lisaa sen alla keskellä (mitattu 24.9. b11); lähde vain suurennoksessa.
            // Web nostokuvaAloita: kuvatekstiLyhyt(kuva), eläintäyn vakioselite vasta karusellissa (pariteetti b12-2 #27).
            Kuvateksti(alarivi, k.LyhytVara ? "" : k.Lyhyt ?? nosto.Otsikko ?? "", k);
            var lisaa = Rakenne.Nappi("LISÄÄ", "mk-nosto__lisaa", Vaihe2, alarivi);
            Kirjasimet.Aseta(lisaa, Kirjasin.Kone);
        }

        // --- vaihe 2: koko kortti ----------------------------------------------------------

        void Vaihe2()
        {
            // Löydös 131: vaiheen 1 kuvan paikka ruudulla; vaiheen 2 kuva asettuu täsmälleen siihen (Korjaa).
            bool esittelysta = kortti.ClassListContains("mk-nosto--esittely");
            Rect? ennen = esittelysta ? sisus.contentContainer.Q(className: "mk-nosto__kuvakehys")?.worldBound : null;
            VapautaPaikka();
            if (ennen.HasValue && ennen.Value.width > 0 && !float.IsNaN(ennen.Value.y))
            {
                kuvaEnnen = ennen;
                // Kortti pysyy vaiheen 1 yläreunassa, kunnes Korjaa on mitannut uuden asettelun (ei keskitystä välissä).
                kiinteaYla = kerros.resolvedStyle.paddingTop;
            }
            sisus.Clear();
            napit.Clear();
            sisus.scrollOffset = Vector2.zero;
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

            // Löydös 133: kaiutin ylärivin oikeaan päähän (oikean yläkulman ✕ ja sen viereinen kaiutin poistuivat).
            Ylarivi(sisus, n).Add(lukija.Nappi);
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
                    // Löydös 136: nosto jää taustalle, chat aukeaa sen päälle (UiNakymat.ChatinKerros).
                    lukija.Pysayta();
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
            if (kuvaEnnen.HasValue)
            {
                // Kuvasarjan lohko muuttaa paikkaansa sisällössä, kun sen yläpuolinen teksti asettuu; kehys itse ei.
                var lohko = sisus.contentContainer.Q(className: "mk-nosto__kuvasarja");
                lohko?.RegisterCallback<GeometryChangedEvent>(_ => Korjaa(lohko.Q(className: "mk-nosto__kuvakehys")));
                // Korjaus koskee vain avautumisen asettelua: myöhempi muutos (toinen kuva sarjassa) ei siirrä korttia.
                int v = versio;
                kerros.schedule.Execute(() => { if (v == versio) kuvaEnnen = null; }).StartingIn(KorjausMs);
            }
        }

        /// <summary>
        /// Web nostosymKortinYlarivi / piirraKohdeYlarivi: aihesymboli ja luokka. Symboli 1,5 em (16,3 pt) rivin
        /// alussa, oikealla 0,4 em (4,35 pt), kaiverruskuva sisällä 14,1 pt (mitattu 24.9. b12, Millaun silta).
        /// Generoitu kuva UI/Resources/Symbolit/sym-*.png (web assets/kartat/symbolit/sym-*.webp); hetki ja ihme ovat
        /// webissä koodipiirtäjiä, joten niille ei ole kuvaa (rivi ilman symbolia).
        /// </summary>
        static VisualElement Ylarivi(VisualElement isa, Nosto n)
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
            return rivi;
        }

        // --- lajien lohkot ------------------------------------------------------------------

        /// <summary>
        /// Web piirraNostonKysymykset / piirraKohdeKysymykset: napautus kysyy pululta. Löydös 136 (omistaja, build 16):
        /// kortti jää taustalle auki ja chat aukeaa sen päälle (UiNakymat.ChatinKerros); kortin luenta pysähtyy.
        /// </summary>
        void KysyPululta(VisualElement isa, Nosto n)
        {
            if (n.Kysymykset.Count == 0) return;
            var q = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-nosto__kysyotsikko", isa);
            q.enableRichText = true;
            Kirjasimet.Aseta(q, Kirjasin.KoneLihava);
            for (int i = 0; i < n.Kysymykset.Count; i++)
            {
                string kk = n.Kysymykset[i];
                Action kysy = () => { lukija.Pysayta(); UiNakymat.Hae()?.Chat.Kysy(kk); };
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

        /// <summary>
        /// Kuvakehys koko leveydellä. Löydös 130: korkeus kuvan omasta muodosta (web nostokuvanSovitus), enintään
        /// kuvaKatto; ennen latausta 3:2 (web oletussuhde). Pysty- ja neliökuva eivät enää kutistu 3:2-kehykseen
        /// (iPhonella pystykuva 225 pt korkea → enintään turva-alue − 150 pt). Katetun kuvan sivuille jää kortin paperi.
        /// </summary>
        VisualElement Kuvakehys(VisualElement isa, NostoKuva k, Action napautus, Action<Texture2D> ladattuna = null)
        {
            var kehys = Rakenne.El("mk-nosto__kuvakehys", isa);
            var kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => napautus?.Invoke());
            kehys.userData = 2f / 3f;
            void Korkeus(float w)
            {
                if (float.IsNaN(w) || w <= 0) return;
                float h = w * (kehys.userData is float s ? s : 2f / 3f);
                if (kuvaKatto > 0f) h = Mathf.Min(h, kuvaKatto);
                h = Mathf.Round(h);
                if (kehys.style.height.value.value != h) kehys.style.height = h;
            }
            kehys.RegisterCallback<GeometryChangedEvent>(e => Korkeus(e.newRect.width));
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
                if (t.width > 0 && t.height > 0)
                {
                    kehys.userData = t.height / (float)t.width;
                    kehys.AddToClassList("mk-nosto__kuvakehys--ladattu");
                    Korkeus(kehys.layout.width);
                }
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
                var kehys = Kuvakehys(kehysPaikka, k, () => Suurenna(kohta));
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
