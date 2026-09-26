using System;
using System.Collections.Generic;
using CesiumForUnity;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Kartan kerrokset linsseille ja UI:lle (RAJAPINTA.md luku 4). Linssi ei koske
    /// Cesium-komponentteihin suoraan, vaan pyytää kerroksen avaimella.
    ///
    /// Sisäiset kerrokset: "laatat" (pohja), "maasto", "kaupungit", "nimiot", "reitit",
    /// "napakannet", "varitaso", "aariviiva", "rannikko", "rajat", "linssinimet", "aluenimet". Linssin raster-kerrokset (enintään kaksi) piirtyvät pohjan päälle
    /// Cesiumin materialKey-järjestyksessä: pohja 0, linssit 1 ja 2.
    /// </summary>
    public class KarttaKerrokset : MonoBehaviour
    {
        public static KarttaKerrokset Instanssi { get; private set; }

        public Cesium3DTileset pallo;
        public CesiumRasterOverlay pohja;
        public KaupunkiMerkit merkit;
        public Reitit reitit;
        public NapaKannet napakannet;
        /// <summary>Nykyisen maan väritaso (kerma muualle), Cesiumin raster-paikka 2.</summary>
        public Varitaso varitaso;
        /// <summary>Pelaajan maan ääriviiva (web korostuskehä), samaa maata kuin väritaso.</summary>
        public Maaraja maaraja;
        /// <summary>Rantaviiva vektorina (löydös 46 E1, webin GSHHS-solut).</summary>
        public Rannikko rannikko;
        /// <summary>Valtioiden rajat vektorina (löydös 46 E2, webin GSHHS-solut, katkoviiva).</summary>
        public Rajat rajat;

        /// <summary>Linssin rasterin näkyvä alue on ladattu (avain).</summary>
        public event Action<string> KerrosValmis;
        /// <summary>Linssin rasterin lataus epäonnistui (avain).</summary>
        public event Action<string> KerrosEpaonnistui;

        class Rasteri { public CesiumUrlTemplateRasterOverlay kerros; public bool valmis; public float lisatty; public bool alfaMuutettu; public bool vaistyva; }
        readonly Dictionary<string, Rasteri> rasterit = new Dictionary<string, Rasteri>();

        /// <summary>
        /// Karttalähteiden tekijätiedot Tietoja-näkymään (Natiivi-UI). Cesiumin oma
        /// ruutukrediitti on piilotettu, koska se piirtyy pelin UI:n päälle; Copernicus-DEM:n
        /// lisenssi vaatii tekstin, joten se näytetään tästä.
        /// </summary>
        public const string Tekijatiedot =
            "Maasto: Produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 " +
            "provided under COPERNICUS by the European Union and ESA; all rights reserved.\n" +
            "Pallo: Cesium for Unity (Apache 2.0).";

        /// <summary>
        /// Kameran taustaväri linssin ajaksi (astronautti: webin tummansininen avaruus).
        /// null palauttaa pelin oman taustan.
        /// </summary>
        public void Taustavari(Color? vari)
        {
            var kamera = Camera.main;
            if (kamera == null) return;
            if (vari.HasValue)
            {
                if (!alkuperainenTausta.HasValue) alkuperainenTausta = kamera.backgroundColor;
                kamera.backgroundColor = vari.Value;
            }
            else if (alkuperainenTausta.HasValue)
            {
                kamera.backgroundColor = alkuperainenTausta.Value;
                alkuperainenTausta = null;
            }
        }
        Color? alkuperainenTausta;

        /// <summary>
        /// Linssi omalla kuvallaan (raster-kerros tai oma taustaväri, esim. topografian reliefi tai astronautin avaruus):
        /// kartan rinnevalo, tasaus ja horisonttiusva väistyvät (Aurinko.cs), ja linssi näkyy build 11:n kameravalossa.
        /// </summary>
        public bool LinssiPaalla => rasterit.Count > 0 || alkuperainenTausta.HasValue;

        /// <summary>Linssi on asettanut oman taustavärin (astronautin avaruus): horisonttiusva ei koske taustaan.</summary>
        public bool OmaTausta => alkuperainenTausta.HasValue;

        /// <summary>Lennon pinta on satelliittisarja (LentoPohja, Blue Marble + Sentinel): rannikkoviiva väistyy (Rannikko).</summary>
        public bool SatelliittiLento => satelliittiLento;

        // MAASTON TARKKUUS (omistajan löydös 46, lisäys 5, 24.9.2026 klo 22.4x: Google Earth -vertailu). Maasto on
        // Karttasepän quantized-mesh (Rakennus.MaastoUrl, layer.json maxzoom 12, tasot 11–12 vain osin), haettuna
        // Laattapalvelimen kautta. Cesium valitsee tason geometrisesta virheestä 77 067 m / 2^L (taso L), ja
        // layer.json-maastolla maximumScreenSpaceError jaetaan 8:lla (Cesium3DTileset.cs: oletus 16 = maaston 2 px).
        // iPad Pro 11" pysty (2 420 px, fov 50°) Kreikan saapumisnäkymässä (≈ 1 200 km): SSE 16 → taso 7 (laatta 1,4°,
        // Kreikan laatoissa noin 1 500 verteksiä), SSE 8 → taso 8 (0,7°, noin 2 900 verteksiä ja 5 600 kolmiota),
        // SSE 4 → taso 9. Mitattu 24.9.: Kreikan laatta tasolla 4/6/8/10 = 41/607/2 903/3 686 verteksiä.
        // ODOTETTU KUSTANNUS: jokainen SSE:n puolitus = yksi taso lisää → näkyviä laattoja ≈ 4× (laatta = yksi
        // piirtokutsu; pohja-, väri- ja linssirasterit samassa materiaalissa) ja kolmioita ≈ 4–8× niin kauan kuin
        // laatan verteksimäärä vielä kasvaa (tasolta 8 ylöspäin enää ≈ 1,3× / taso). Kreikka SSE 16: ~60 laattaa,
        // ~0,2 M kolmiota; SSE 8: ~250 laattaa, ~1,4 M kolmiota. Rasterien taso seuraa geometrialaattaa (katto
        // LaattaMaxTaso 9), joten pienempi SSE terävöittää myös pohjakarttaa kaukana ja kallistuksessa.
        // HUOM: SSE:n asetus luo tilesetin uudelleen (Cesium3DTileset.RecreateTileset: kaikki laatat ladataan uudelleen
        // levyvälimuistista), joten sitä ei vaihdeta lennon ja kartan välillä kehyksittäin, vaan komennolla.

        /// <summary>
        /// Tilesetin maximumScreenSpaceError (komento "maasto sse &lt;arvo&gt;", 1–64; kohtauksessa 16). Luo tilesetin
        /// uudelleen, joten vain mittauksiin ja asetukseen, ei kehyksittäin. Palauttaa asetetun arvon (NaN = ei tilesetiä).
        /// </summary>
        public float MaastoSse(float arvo)
        {
            if (pallo == null) return float.NaN;
            float v = Mathf.Clamp(float.IsNaN(arvo) ? 16f : arvo, 1f, 64f);
            if (Mathf.Abs(pallo.maximumScreenSpaceError - v) > 1e-3f) pallo.maximumScreenSpaceError = v;
            return v;
        }

        /// <summary>Maatila linsseille (IMaaKartta, RAJAPINTA.md luku 4).</summary>
        public Matkakirja.Linssit.Maat.IMaaKartta Maat => maaKartta;
        public MaaKartta maaKartta;
        /// <summary>Maakuntien värjäys (B17): avaimet "ISO:tunnus", Natiivi-UI:n Maakunnat-välilehti.</summary>
        public MaaKartta maakunnat;
        /// <summary>Pelinappula (Pelikoodari: Matkalla-tila, RAJAPINTA luku 3).</summary>
        public Nappula nappula;
        /// <summary>Pelin omat karttapisteet (B3 aarrepiste, Pelikoodari).</summary>
        public Karttapisteet pisteet;

        void Awake()
        {
            // Tileset-varjostimen raster-paikkojen alfat (Shaders/Cesium/MatkakirjaTileset): globaalit, oletus 0 → näkyviin.
            for (int i = 0; i < 3; i++) Shader.SetGlobalFloat("_overlayAlfa_" + i, 1f);
            // Korkeuskerroin (löydös 29): omistajan valitsema oletus 2 ja maan keskipiste varjostimelle; komento "korkeus <k>".
            KorkeusKerroin.Aseta(KorkeusKerroin.Oletus, GetComponent<CesiumGeoreference>());
            // Satelliittilennon varjostinglobaalit pois päältä, kunnes lento alkaa (paikka 2 on muulloin väritaso tai linssi).
            PaivitaLennonVarjostin();
            Instanssi = this;
            CesiumRasterOverlay.OnCesiumRasterOverlayLoadFailure += Epaonnistui;
        }

        void Start()
        {
            StartCoroutine(PiilotaRuutukrediitit());
            // Varakartta (16 × Z2, ~0,2 Mt) jo käynnistyksessä: ensimmäisellä kylmällä lennolla se latautui vasta
            // nousussa, ja loittonuksen puuttuvat laatat näyttivät vielä pergamenttia (simulaattori 24.9. klo 17.2x).
            VarmistaVarakartta();
        }

        System.Collections.IEnumerator PiilotaRuutukrediitit()
        {
            var odota = new WaitForSeconds(1f);
            while (true)
            {
                // Cesium luo oletuskrediittijärjestelmän (UIDocument) ensimmäisen tilesetin
                // latautuessa ja rakentaa sen puun uudelleen krediittien muuttuessa.
                var cs = CesiumCreditSystem.GetDefaultCreditSystem();
                var juuri = cs != null ? cs.GetComponent<UnityEngine.UIElements.UIDocument>()?.rootVisualElement : null;
                if (juuri != null && juuri.style.display != UnityEngine.UIElements.DisplayStyle.None)
                    juuri.style.display = UnityEngine.UIElements.DisplayStyle.None;
                yield return odota;
            }
        }

        void OnDestroy()
        {
            CesiumRasterOverlay.OnCesiumRasterOverlayLoadFailure -= Epaonnistui;
            if (Instanssi == this) Instanssi = null;
        }

        // LÄMPÖERÄ (PallonLepo): valokeilan siirtymä (keila liukuu, hämärä syvenee tai vaalenee) muuttaa tileset-varjostimen
        // globaaleja ilman kameran liikettä. Kerrosten näkyvyys (Nakyvyys) ja raster-kerrokset ovat yksittäisiä muutoksia.
        void OnEnable() => PallonLepo.Animoi(KeilaLiukuu, "valokeila");
        void OnDisable() => PallonLepo.Poista(KeilaLiukuu);
        bool KeilaLiukuu() => keilaKaynnissa;

        void Epaonnistui(CesiumRasterOverlayLoadFailureDetails d)
        {
            foreach (var p in rasterit)
                if (p.Value.kerros == d.overlay)
                {
                    Debug.LogWarning($"MATKAKIRJA kerros {p.Key} epäonnistui: {d.message}");
                    KerrosEpaonnistui?.Invoke(p.Key);
                    return;
                }
            // Muut kerrokset (build 11 -selvitys: harmaat suorakulmiot): lennon pinta, pohja, väritaso. Cesium kutsuu tätä
            // kerroksen (tile provider) virheestä, ei yksittäisen laatan kuvan virheestä (ne näkyvät satloki-riveillä).
            var o = d.overlay;
            string nimi = o == null ? "?" : o == silea ? "lento-bmng" : o == sentinel ? "lento-sentinel" : o == pohja ? "pohja"
                : o.materialKey + (o is CesiumUrlTemplateRasterOverlay u ? " " + u.templateUrl : "");
            Debug.LogWarning($"MATKAKIRJA kerros {nimi} epäonnistui ({d.type}, http {d.httpStatusCode}): {d.message}");
        }

        /// <summary>
        /// Sisäisen kerroksen näkyvyys. "laatat" pois = pohja poistetaan Cesiumista;
        /// palautus lukee laatat Cesiumin levyvälimuistista (ei verkkoa).
        /// </summary>
        public void Nakyvyys(string kerros, bool nakyy)
        {
            PallonLepo.Muuttui("kerros " + kerros);
            switch (kerros)
            {
                case "laatat":
                    pohjaPyydetty = nakyy;
                    if (pohja != null) pohja.enabled = nakyy || pohjaPidossa;
                    if (varitaso != null) varitaso.Nakyvat(nakyy);
                    PaivitaNavat();
                    break;
                case "varitaso": if (varitaso != null) varitaso.Nakyvat(nakyy); break;
                case "maasto":
                    if (pallo != null)
                        pallo.tilesetSource = nakyy ? CesiumDataSource.FromUrl : CesiumDataSource.FromEllipsoid;
                    break;
                case "kaupungit":
                    if (merkit != null) merkit.merkitNakyvat = nakyy;
                    // Nopan siirtokohteet samalla portilla (linssin ajaksi pois, palaavat perässä).
                    if (Siirtokohdemerkit.Instanssi != null) Siirtokohdemerkit.Instanssi.Nakyvissa = nakyy;
                    // Web: maan kehä pois linssin ajaksi samalla portilla kuin kaupunkipisteet
                    // (js/pallolauta/lauta.js linssiPaalla; LinssiOhjain.Pelikerrokset ja maatila piilottavat kaupungit).
                    if (maaraja != null) maaraja.Linssit(!nakyy);
                    // Maakunnat samalla portilla (web lauta.js:5098 maakunnat?.asetaMaa(linssiPaalla() ? null : …);
                    // löydös 74 d: valitun maakunnan rajat jäivät ihmisen matkan avaruuspallon päälle).
                    if (maakunnat != null) maakunnat.Linssit(!nakyy);
                    PaivitaLinssinimet();
                    break;
                case "linssinimet": linssinimet = nakyy; PaivitaLinssinimet(); break;
                case "aariviiva": if (maaraja != null) maaraja.Nakyvat(nakyy); break;
                case "rannikko": if (rannikko != null) rannikko.Nakyvat(nakyy); break;
                case "rajat": if (rajat != null) rajat.Nakyvat(nakyy); break;
                case "nimiot": if (merkit != null) merkit.nimiotNakyvat = nakyy; break;
                // Alue-, meri- ja valtamerinimet (Nimikerros, build 11); seuraavat myös "kaupungit"- ja "nimiot"-porttia.
                case "aluenimet": if (Nimikerros.Instanssi != null) Nimikerros.Instanssi.paalla = nakyy; break;
                case "reitit": if (reitit != null) reitit.Nakyvat(nakyy); break;
                case "napakannet": if (napakannet != null) napakannet.Nakyvat(nakyy); break;
                case "nappula": if (nappula != null) nappula.Nakyvat(nakyy); break;
                case "pisteet": if (pisteet != null) pisteet.Nakyvat(nakyy); break;
                case "valot": { var av = FindAnyObjectByType<AiheValot>(); if (av != null) av.Nakyvat(nakyy); break; }
                default: Debug.LogWarning("MATKAKIRJA kerrokset: tuntematon kerros " + kerros); break;
            }
        }

        bool linssinimet;

        /// <summary>
        /// LINSSINIMET päällä (pyydetty avaimella "linssinimet") ja voimassa: "kaupungit" on pois eli linssi on
        /// piilottanut pelikerrokset. Pelikerrosten palatessa tila purkautuu itsestään, vaikka pyyntö jäisi päälle.
        /// </summary>
        public bool Linssinimet => linssinimet && merkit != null && !merkit.merkitNakyvat;

        /// <summary>
        /// Webin linssikartan nimet (Linssiseppä, build 10): kaupunkipisteet ja -nimet (KaupunkiMerkit.LinssiNimet)
        /// ja nostot nimineen (NostoKerros.LinssiNimet) ilman napautuksia ja ilman maan kehää. Merinimet näkyvät
        /// linssin aikana Nimikerroksesta, joka lukee tämän tilan (Linssinimet) itse (RAJAPINTA luku 4).
        /// </summary>
        void PaivitaLinssinimet()
        {
            bool tila = Linssinimet;
            if (merkit != null) merkit.LinssiNimet(tila);
            var nk = NostoKerros.Instanssi;
            if (nk != null) nk.LinssiNimet = tila;
        }

        /// <summary>
        /// Linssin raster-kerros pohjan päälle. Palauttaa avaimen (sama kuin annettu).
        /// Alfa: nyt vain 0 (piilossa) tai 1 (näkyvissä); välimuoto on tulossa.
        /// vaistyva: kerros luovuttaa paikkansa, jos seuraava LisaaRasteri ei muuten mahdu (radion yövalot: radion
        /// sulun ulosliu'un aikana avattu toinen linssi saa paikan; kerroksen omistaja huomaa poiston RasterinAlfan
        /// palauttamasta −1:stä).
        /// </summary>
        public string LisaaRasteri(string avain, string url, CesiumUrlTemplateRasterOverlayProjection projektio,
                                   int min, int max, float alfa, bool vaistyva = false)
        {
            // Valmiiksi luotu lennon pinta (LentoPohjaValmiiksi, ei vielä lennolla) väistyy linssin tieltä.
            if (pintaValmiiksi)
            {
                Debug.Log("MATKAKIRJA lennon pinta: valmis pinta vapautettu (linssin kerros " + avain + ")");
                VapautaLentopinta();
            }
            PoistaRasteri(avain);
            // Väritaso vapauttaa paikan 2 linssin ajaksi (Cesiumissa kolme raster-paikkaa).
            if (varitaso != null) varitaso.Linssit(true);
            var kaytetyt = KaytetytPaikat();
            string avainCesium = !kaytetyt.Contains("1") ? "1" : !kaytetyt.Contains("2") ? "2" : null;
            if (avainCesium == null && !vaistyva)
                foreach (var p in rasterit)
                    if (p.Value.vaistyva && Paikka(p.Value.kerros) is int vp && vp >= 1)
                    {
                        Debug.Log($"MATKAKIRJA kerrokset: {p.Key} väistyy kerroksen {avain} tieltä (paikka {vp})");
                        PoistaRasteri(p.Key);
                        if (varitaso != null) varitaso.Linssit(true);
                        avainCesium = vp.ToString();
                        break;
                    }
            if (avainCesium == null && sentinel != null)
            {
                // Satelliittilento (oletus build 10) vie molemmat paikat: linssi saa Sentinelin paikan 2,
                // lento jatkuu Blue Marblella.
                VapautaKerros(sentinel);
                sentinel = null;
                avainCesium = "2";
                PaivitaLennonVarjostin();
            }
            if (avainCesium == null)
            {
                Debug.LogWarning("MATKAKIRJA kerrokset: enintään kaksi linssikerrosta kerrallaan");
                KerrosEpaonnistui?.Invoke(avain);
                return null;
            }
            var k = UusiKerros(pallo.gameObject, avainCesium, url, projektio, min, max, alfa > 0f);
            rasterit[avain] = new Rasteri { kerros = k, lisatty = Time.unscaledTime, vaistyva = vaistyva };
            PaivitaNavat();
            return avain;
        }

        /// <summary>
        /// Linssien ja lennon pinnan käyttämät raster-paikat (materialKey; väritaso väistyy linssin ajaksi). Valmiiksi luotu
        /// lennon pinta ei varaa paikkaa: se väistyy linssin tieltä (LisaaRasteri).
        /// </summary>
        HashSet<string> KaytetytPaikat()
        {
            var kaytetyt = new HashSet<string>();
            foreach (var r in rasterit.Values) kaytetyt.Add(r.kerros.materialKey);
            if (!pintaValmiiksi)
            {
                if (silea != null) kaytetyt.Add(silea.materialKey);
                if (sentinel != null) kaytetyt.Add(sentinel.materialKey);
            }
            return kaytetyt;
        }

        /// <summary>
        /// Onko raster-paikka 1 tai 2 vapaana ilman, että lennon pinta joutuu väistymään (LisaaRasteri vie muuten
        /// Sentinelin paikan). Radion yövalot (RadioMastot) lisätään vain, jos tämä on tosi: kerros ei saa viedä
        /// paikkaa reliefiltä eikä lennolta.
        /// </summary>
        public bool RasteriPaikkaVapaana()
        {
            var kaytetyt = KaytetytPaikat();
            return !kaytetyt.Contains("1") || !kaytetyt.Contains("2");
        }

        /// <summary>
        /// Sileä pohja ilman poltettua viivatasoa: peruskarttasarja 2026-09-25 on itse viivaton, joten sama kuin
        /// Rakennus.LaattaUrl (aiemmin erillinen 23a-rajaton-sarja). Z0–Z9 kuten pohja (Rakennus.LaattaMaxTaso).
        /// </summary>
        public const string SileaUrl =
            "https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-26-pohja-20260926/{z}/{x}/{reverseY}.jpg";
        /// <summary>Sileän pohjan syvin taso (= Rakennus.LaattaMaxTaso; Editor-luokkaa ei voi viitata ajossa).</summary>
        public const int SileaMaxTaso = 9;

        CesiumUrlTemplateRasterOverlay silea, sentinel;

        /// <summary>
        /// Karttasepän satelliittisarjan versio (polttopäivä) tai null = ei vielä ämpärissä → lennon pintana sileä
        /// sarja. julisteet/pallo/satelliitti/&lt;versio&gt;/bmng/{z}/{x}/{y}.jpg (Blue Marble Z0–Z7, public domain) ja
        /// …/s2/{z}/{x}/{y}.jpg (Sentinel-2 2016 Z8–Z11 kaupunkien ympärillä, CC BY 4.0: "Contains modified
        /// Copernicus Sentinel data 2016, EOX IT Services" → Tietoja), kattavuus s2/laatat.json (laatat8).
        /// </summary>
        public static string SatelliittiVersio = "2026-09-24";
        /// <summary>
        /// Karttasepän sarjat 2026-09-24: meri "bmng" (topo, tumma meri) tai "bmng-bathy" (sininen meri); kaupungit
        /// "s2" (EOX sovitettuna Blue Marbleen) tai "s2-alkup" (muuttamaton). Kattavuus (s2/laatat.json) on molemmissa
        /// sama. OLETUS build 10 (Fablen päätös 24.9.2026): bmng-bathy + s2-alkup, eli satelliitti on lennon oletuspinta;
        /// "satelliitti pois" palauttaa sileän sarjan. s2-alkupin musta meri värjätään varjostimessa (S2MeriVari).
        /// </summary>
        public static string SatelliittiMeri = "bmng-bathy", SatelliittiS2 = "s2-alkup";

        /// <summary>
        /// MEREN VÄRJÄYS (Fablen päätös 24.9.2026): Sentinel-2-alkuperäisen (EOX) meri on lähes musta, joten Z7→Z8-sauma
        /// näkyi kovana suorakulmiona bathyn sinistä vasten. Tileset-varjostin (MatkakirjaSekoitus, paikka 2) värjää
        /// Sentinelin pikselin, jonka sRGB-luma &lt; kynnys (pehmeästi 0,8·kynnys…kynnys) ja joka on sinertävä
        /// (b − r &gt; 0,02…0,08), kohti paikan 1 (bathy) väriä samassa pisteessä; jos bathy ei siinä itse ole merta
        /// (Z7 on rannikolla karkea), kohti tätä vakiota. Luokittelu on pikselikohtainen, joten rantaviiva pysyy
        /// Sentinelin terävänä eikä tumma maa (vihreä/ruskea, b &lt; r) värjäydy.
        /// Vakio on mitattu bmng-bathy Z6–Z7 -laattojen avomeren keskiarvosta Välimereltä (13 laattaa Joonianmereltä
        /// Levantille, pikselit b &gt; r + 20): sRGB (17, 46, 92) — mediaani (16, 42, 89). Kynnys 0,18 mitattiin
        /// s2-alkup-laatoista Ateenan ympäriltä (Z8–Z10): avomeren luma on 0,10–0,17, 0,12 jätti puolet merestä mustaksi.
        /// Komento "s2meri r g b kynnys" (0–1 tai 0–255; kynnys 0 = pois).
        /// </summary>
        public static Color S2MeriVari = new Color32(17, 46, 92, 255);
        public static float S2MeriKynnys = 0.18f;

        static readonly int S2MeriVariId = Shader.PropertyToID("_s2MeriVari");
        static readonly int S2MeriKynnysId = Shader.PropertyToID("_s2MeriKynnys");
        static readonly int LentoVaraId = Shader.PropertyToID("_lentoVara");
        static readonly int LentoVaraKarttaId = Shader.PropertyToID("_lentoVaraKartta");

        /// <summary>Meren värjäys heti (komento s2meri); vaikuttaa vain, kun Sentinel on paikassa 2.</summary>
        public void S2Meri(Color vari, float kynnys)
        {
            S2MeriVari = vari;
            S2MeriKynnys = Mathf.Max(0f, kynnys);
            PaivitaLennonVarjostin();
        }

        /// <summary>
        /// Lennon varjostinglobaalit sen mukaan, mitä paikoissa 1 ja 2 on: meren värjäys vain Sentinelille (paikassa 2
        /// on muulloin väritaso tai linssi, joita ei saa värjätä) ja varakartta vain Blue Marblelle.
        /// </summary>
        void PaivitaLennonVarjostin()
        {
            Color v = QualitySettings.activeColorSpace == ColorSpace.Linear ? S2MeriVari.linear : S2MeriVari;
            Shader.SetGlobalVector(S2MeriVariId, new Vector4(v.r, v.g, v.b, 1f));
            Shader.SetGlobalFloat(S2MeriKynnysId, sentinel != null ? (LentoTestiS2 ? -1f : S2MeriKynnys) : 0f);
            bool vara = satelliittiLento && varaKartta != null && varaKarttaAvain == SatelliittiAvain();
            if (vara) Shader.SetGlobalTexture(LentoVaraKarttaId, varaKartta);
            // Testitila (lentoharmaa): 2 magenta missä vara laukeaisi, 3 paikan 1 kattavuus, 4 varakartan UV;
            // "varapois" pitää varan pois. Testitilat eivät tarvitse varakarttaa (4 näyttää pelkän UV:n).
            float arvo = !satelliittiLento || LentoTestiVaraPois ? 0f : LentoTesti >= 2 ? LentoTesti : vara ? 1f : 0f;
            Shader.SetGlobalFloat(LentoVaraId, arvo);
            Shader.SetGlobalFloat(LentoVaraTasoId, VaraTaso);
            if (satelliittiLento)
            {
                // Maan akselit (_maaNolla/_maaIta/_maaAkseli) uudelleen lennon alussa: varakartan UV ei saa riippua siitä,
                // oliko georeferenssi alustettu KarttaKerrokset.Awakessa (muuten UV = kulma → valkoinen Etelämanner).
                KorkeusKerroin.Aseta(KorkeusKerroin.Arvo, GetComponent<CesiumGeoreference>());
                Debug.Log($"MATKAKIRJA lennon pinta: varjostin _lentoVara {arvo:0}, varakartta {(varaKartta != null ? varaKarttaAvain : "ei")}, " +
                          $"_maaNolla {Shader.GetGlobalVector("_maaNolla")}, _maaAkseli {Shader.GetGlobalVector("_maaAkseli")}");
            }
        }

        /// <summary>
        /// HARMAIDEN SUORAKULMIOIDEN KOKEILU (komento "lentoharmaa", simulaattori 24.9.2026): 0 = normaali; 2 = magenta
        /// siellä, missä paikan 1 rasteri puuttuu (vara laukeaisi); 3 = paikan 1 kattavuus (vihreä rasteri, magenta ei);
        /// 4 = varakartan UV väreinä (punainen = maan akselit puuttuvat). Voimaan heti ja seuraavilla lennoilla.
        /// </summary>
        public static int LentoTesti;
        /// <summary>
        /// KAUKAINEN ESIVANHEMPI (diagnoosi 2, 24.9.2026, kolme kylmää lentoa): harmaat suorakulmiot ovat laattoja, joille
        /// Cesium on kiinnittänyt useita tasoja ylemmän esivanhemman rasterin (RasterMappedTo3DTile.cpp:136–167,
        /// translationAndScale.z = 2^−d), ja sen näyte on tasaisen vaalea. Lennon aikana paikka 1 käyttää silloin
        /// Z2-varakarttaa (sama Blue Marble, aina valmis), kun käytetty rasteri on itse tasolla ≤ VaraTaso (varakartta ei
        /// silloin ole koskaan huonompi) tai rasterin UV on [0,1]:n ulkopuolella. Tasoeroa ei käytetä (d3cd945:n
        /// tasoerosääntö korvasi Ateenan lähikuvan laattoja, joiden oma Z8 latasi). Absoluuttinen taso lasketaan
        /// varjostimessa UV-derivaattojen suhteesta: z = log2(|d uv_rasteri| / |d uv_varakartta|) — rasterin
        /// suorakulmion Mercator-taso (Cesium mitoittaa rasterin kuvan laatan kokoon, joten se vastaa kuvan tarkkuutta).
        /// 0 = sääntö pois. Komento "lentoharmaa varataso z" (oletus 2,5 = tasot 0–2).
        /// </summary>
        public static float VaraTaso = 2.5f;
        static readonly int LentoVaraTasoId = Shader.PropertyToID("_lentoVaraTaso");

        /// <summary>Varakartta pois lennolta (hypoteesi: näkyykö harmaa ilman sitä samana).</summary>
        public static bool LentoTestiVaraPois;
        /// <summary>Paikan 2 (Sentinel) peitto syaanina (hypoteesi d).</summary>
        public static bool LentoTestiS2;

        /// <summary>Testitilan muutos voimaan heti (Komennot).</summary>
        public void LentoTestiVoimaan() => PaivitaLennonVarjostin();

        /// <summary>
        /// LENNON VARAKARTTA (harmaat suorakulmiot loittonuksessa, Fablen päätös 24.9.2026 "isälaatta pysyy näkyvissä").
        ///
        /// Juurisyy (cesium-native v0.64.0, Cesium for Unity 1.25.1): Cesium kiinnittää laatalle lähimmän valmiin
        /// esivanhemman rasterin, kun oma lataa (RasterMappedTo3DTile.cpp:136–167), ja Tile::isRenderable vaatii valmiin
        /// rasterin (Tile.cpp:218–239). Valinta kuitenkin lisää piirtolistaan myös laatat, jotka eivät ole piirrettäviä
        /// (TilesetSelection.cpp:611–645 renderLeaf/renderInnerTile ilman isRenderable-ehtoa; 688–786 kick-polku, kun
        /// notYetRenderableCount &gt; loadingDescendantLimit), ja Cesium for Unity aktivoi jokaisen piirtolistan laatan,
        /// jonka geometria on valmis (Cesium3DTilesetImpl.cpp:179–195, vain TileLoadState::Done). Jos millään
        /// esivanhemmalla ei ole valmista rasteria (loittonuksessa uudet karkeat laatat ja näkymään tulevat reunat),
        /// overlay-tekstuuria ei ole asetettu (detachRasterInMainThread asettaa null, UnityPrepareRendererResources.cpp:
        /// 1918–1960) ja varjostimen oletus "black" = (0,0,0,0) → alfa 0 → alta näkyy pergamentti tai materiaalin
        /// vaalea perusväri muutaman kehyksen ajan, laattojen muotoisina portaina.
        ///
        /// Tilesetin asetukset eivät riitä: Pallo.unity:ssä forbidHoles ja preloadAncestors ovat jo päällä, eikä
        /// forbidHoles estä piirtämästä laattaa ilman rasteria (se koskee vain tarkentamista lapsiin); lisäksi jokainen
        /// asetin (forbidHoles, preload*, loadingDescendantLimit, maximumSimultaneousTileLoads) kutsuu
        /// RecreateTileset():iä, joten niiden vaihtaminen lennon ajaksi lataisi koko pallon uudelleen.
        ///
        /// Ratkaisu varjostimessa (varmin, ei riipu Cesiumin ajoituksesta): "isälaatta" on koko maailman Z2-mosaiikki
        /// (Blue Marble, 4 × 4 laattaa, 1024², Web Mercator), joka on aina valmiina. Paikka 1 näyttää sen, kun laatan
        /// oma tai esivanhemman rasteri puuttuu (näyte.a &lt; 0,5), ja Cesiumin tarkempi laatta korvaa sen heti
        /// latauduttuaan. Varakartta otetaan käyttöön vain, jos kaikki 16 laattaa latautuivat (välimuisti/verkko):
        /// offline ilman välimuistia käytös on entinen (pergamentti näkyy).
        /// </summary>
        static Texture2D varaKartta;
        static string varaKarttaAvain;
        bool varaKarttaHaussa, satelliittiLento;

        static string SatelliittiAvain() => SatelliittiVersio + "/" + SatelliittiMeri;

        void VarmistaVarakartta()
        {
            if (string.IsNullOrEmpty(SatelliittiVersio) || varaKarttaHaussa) return;
            if (varaKartta != null && varaKarttaAvain == SatelliittiAvain()) return;
            varaKarttaHaussa = true;
            StartCoroutine(LataaVarakartta(SatelliittiAvain()));
        }

        System.Collections.IEnumerator LataaVarakartta(string avain)
        {
            const int Z = 2, N = 1 << Z, K = 256;
            var haut = new UnityEngine.Networking.UnityWebRequest[N * N];
            for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    // {reverseY} on Cesium Unityssä XYZ-rivi (ks. EsilataaLento), joten tiedostopolku on z/x/y (XYZ).
                    var r = UnityEngine.Networking.UnityWebRequest.Get(
                        Laattapalvelin.Paikallinen(SatelliittiJuuri + avain + "/" + Z + "/" + x + "/" + y + ".jpg"));
                    r.SendWebRequest();
                    haut[y * N + x] = r;
                }
            foreach (var r in haut) while (!r.isDone) yield return null;
            var atlas = new Texture2D(N * K, N * K, TextureFormat.RGB24, false, false)
            {
                name = "LennonVarakartta", wrapModeU = TextureWrapMode.Repeat, wrapModeV = TextureWrapMode.Clamp,
                filterMode = FilterMode.Bilinear
            };
            var pala = new Texture2D(2, 2, TextureFormat.RGB24, false, false);
            bool ok = true;
            for (int i = 0; i < haut.Length && ok; i++)
            {
                var r = haut[i];
                ok = r.result == UnityEngine.Networking.UnityWebRequest.Result.Success
                     && pala.LoadImage(r.downloadHandler.data) && pala.width == K && pala.height == K;
                // Unityn tekstuurin rivi 0 on alhaalla, XYZ-rivi 0 pohjoisessa: rivi y menee lohkoon N − 1 − y.
                if (ok) atlas.SetPixels32(i % N * K, (N - 1 - i / N) * K, K, K, pala.GetPixels32());
            }
            foreach (var r in haut) r.Dispose();
            Destroy(pala);
            varaKarttaHaussa = false;
            if (!ok)
            {
                Destroy(atlas);
                Debug.LogWarning("MATKAKIRJA lennon pinta: varakartta (Z2) ei latautunut, puuttuva laatta näyttää pohjan");
                yield break;
            }
            atlas.Apply(false, true);
            if (varaKartta != null) Destroy(varaKartta);
            varaKartta = atlas;
            varaKarttaAvain = avain;
            Debug.Log("MATKAKIRJA lennon pinta: varakartta Z2 valmis (" + avain + ")");
            PaivitaLennonVarjostin();
        }
        /// <summary>Satelliittisarjojen juuri (Laattapalvelin: laattapaketin sarjojen tarkistus).</summary>
        public const string SatelliittiJuuri = "https://media.matkakirja.app/julisteet/pallo/satelliitti/";
        static HashSet<long> sentinelZ8;
        bool sentinelHaettu;

        static CesiumUrlTemplateRasterOverlay Kerros(GameObject go, string avain, string url, int max) =>
            UusiKerros(go, avain, url, CesiumUrlTemplateRasterOverlayProjection.WebMercator, 0, max);

        // ---- Raster-kerrosten kierrätys (build 13: Cesiumin varoitus "Two or more raster overlays use the same
        //      material key") ----
        //
        // AddComponent kutsuu Cesiumin OnEnablen heti, ja uusi kerros liittyy palloon oletusavaimella "0" ennen kuin
        // avain ehditään asettaa: se törmää pohjan "0":aan (varoitus joka väritason maanvaihdossa ja linssin
        // rasterissa, lokit b9-huntu-z5 29 kertaa), ja jokainen ominaisuuden asetus liittää kerroksen uudestaan.
        // Poistetut kerrokset jäävät pois päältä kierrätykseen: seuraava käyttäjä asettaa ominaisuudet pois päältä
        // (Cesium ei liitä) ja kytkee kerroksen kerran. Uusi komponentti luodaan vain, kun vapaita ei ole, ja se
        // kytketään heti pois, joten varoitus voi tulla enintään kerran kerrosta kohden koko istunnossa.

        static readonly List<CesiumUrlTemplateRasterOverlay> vapaatKerrokset = new List<CesiumUrlTemplateRasterOverlay>();
        static int vapaaNro;

        /// <summary>URL-mallipohjainen raster-kerros pallolle kierrätyksestä tai uutena (ks. yllä). url ilman Laattapalvelinta.</summary>
        public static CesiumUrlTemplateRasterOverlay UusiKerros(GameObject go, string avain, string url,
            CesiumUrlTemplateRasterOverlayProjection projektio, int min, int max, bool paalle = true)
        {
            CesiumUrlTemplateRasterOverlay k = null;
            for (int i = vapaatKerrokset.Count - 1; i >= 0; i--)
            {
                var v = vapaatKerrokset[i];
                if (v == null) { vapaatKerrokset.RemoveAt(i); continue; }
                if (v.gameObject != go) continue;
                vapaatKerrokset.RemoveAt(i);
                k = v;
                break;
            }
            if (k == null)
            {
                k = go.AddComponent<CesiumUrlTemplateRasterOverlay>();
                k.enabled = false;
            }
            k.materialKey = avain;
            k.templateUrl = Laattapalvelin.Paikallinen(url);
            k.projection = projektio;
            k.minimumLevel = min;
            k.maximumLevel = max;
            k.tileWidth = 256;
            k.tileHeight = 256;
            k.enabled = paalle;
            return k;
        }

        /// <summary>Kerros pois pallolta ja kierrätykseen (korvaa Destroyn). Avain vaihdetaan yksilölliseksi.</summary>
        public static void VapautaKerros(CesiumUrlTemplateRasterOverlay k)
        {
            if (k == null) return;
            k.enabled = false;
            k.materialKey = "vapaa" + (vapaaNro++);
            if (!vapaatKerrokset.Contains(k)) vapaatKerrokset.Add(k);
        }

        /// <summary>Sentinel-kattavuus: Z8-esivanhempi laatat8-listassa; Z0–Z7 läpinäkyviä (Blue Marble alla).</summary>
        static bool SentinelKattaa(int z, int x, int y)
        {
            var lista = sentinelZ8;
            if (z < 8 || z > 11 || lista == null) return false;
            int s = z - 8;
            return lista.Contains(((long)(x >> s) << 32) | (uint)(y >> s));
        }

        System.Collections.IEnumerator HaeSentinelKattavuus(string versio)
        {
            string url = Laattapalvelin.Paikallinen(SatelliittiJuuri + versio + "/s2/laatat.json");
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(url))
            {
                yield return r.SendWebRequest();
                if (r.result != UnityEngine.Networking.UnityWebRequest.Result.Success)
                {
                    Debug.LogWarning("MATKAKIRJA lennon pinta: Sentinel-kattavuus ei latautunut: " + r.error);
                    sentinelHaettu = false;
                    yield break;
                }
                var joukko = new HashSet<long>();
                string t = r.downloadHandler.text;
                int i = t.IndexOf("\"laatat8\"", StringComparison.Ordinal);
                if (i >= 0)
                {
                    // [[x,y],[x,y],…] ilman JSON-kirjastoa (Kartta-asmdef): numeroparit ensimmäisestä '[':stä sulkevaan ']]':iin.
                    int alku = t.IndexOf('[', i), loppu = alku < 0 ? -1 : t.IndexOf("]]", alku, StringComparison.Ordinal);
                    if (alku < 0 || loppu < 0) { sentinelZ8 = joukko; yield break; }
                    var luvut = System.Text.RegularExpressions.Regex.Matches(t.Substring(alku, loppu - alku), "\\d+");
                    for (int k = 0; k + 1 < luvut.Count; k += 2)
                        joukko.Add(((long)int.Parse(luvut[k].Value) << 32) | (uint)int.Parse(luvut[k + 1].Value));
                }
                sentinelZ8 = joukko;
                Debug.Log($"MATKAKIRJA lennon pinta: Sentinel-kattavuus {joukko.Count} Z8-laattaa");
            }
        }

        static readonly int PallonTummuusId = Shader.PropertyToID("_pallonTummuus");

        /// <summary>
        /// PALLON SÄVY (löydös 98, build 14; Linssisepän avaruuslinssi): pallon perusväri kerrotaan kertoimella
        /// (web satelliitti-avaruus.js PALLON_SAVY 0x999999 = 0,6), jotta yökartan pisteet hehkuvat. Tileset-varjostimen
        /// ja napakansien globaali _pallonTummuus = 1 − kerroin (asettamaton 0 = ennallaan). null = palauta (1).
        /// Vaikuttaa perusväriin ennen radion hämärää; emissio (yövalot, maavalo) ei tummu.
        /// </summary>
        public static void PallonSavy(float? kerroin) =>
            Shader.SetGlobalFloat(PallonTummuusId, kerroin.HasValue ? 1f - Mathf.Clamp01(kerroin.Value) : 0f);

        // ---- Valokeila (Ihmisen matka II, Linssisepän tilaus 25.9.2026) ----

        /// <summary>
        /// Yksi valokeila: keskipiste (geodeettinen lat/lon), säde pinnalla (km), reunan pehmeys säteen osuutena (0–1),
        /// valon väri (sRGB; null = lyhty, <see cref="Lyhty"/>; valkoinen = ei sävyä), keskustan lisäkirkkaus
        /// 0–0,3 (emissiona: kohta hehkuu eikä vain säästy hämärältä) ja voimakkuus 0–1 (toinen keila heikompana).
        /// </summary>
        public struct Keila
        {
            public double lat, lon;
            public float sadeKm, pehmeys, kirkkaus, voimakkuus;
            public Color? vari;

            public Keila(double lat, double lon, float sadeKm, float pehmeys = 0.35f, Color? vari = null, float kirkkaus = 0.12f,
                         float voimakkuus = 1f)
            {
                this.lat = lat; this.lon = lon; this.sadeKm = sadeKm; this.pehmeys = pehmeys;
                this.vari = vari; this.kirkkaus = kirkkaus; this.voimakkuus = voimakkuus;
            }
        }

        /// <summary>Lyhdyn sävyn osuus: 3200 K sekoitetaan puoliksi valkoiseen, jotta paperi pysyy luettavana (ei oranssi).</summary>
        public const float LyhdynSavy = 0.5f;

        /// <summary>Lyhdyn valo: 3200 K (Valokeilalaskenta.Kelvin) osuudella <see cref="LyhdynSavy"/> valkoisen päällä, sRGB.</summary>
        public static Color Lyhty => KelvinVari(3200f, LyhdynSavy);

        /// <summary>Värilämpötila (K) sRGB-värinä; osuus 1 = täysi mustan kappaleen sävy, 0 = valkoinen.</summary>
        public static Color KelvinVari(float kelvin, float osuus = 1f)
        {
            var (r, g, b) = Valokeilalaskenta.Kelvin(kelvin);
            return Color.Lerp(Color.white, new Color((float)r, (float)g, (float)b, 1f), Mathf.Clamp01(osuus));
        }

        /// <summary>Viimeksi pyydetty pääkeila (null = pois tai sammumassa).</summary>
        public static Keila? PaaKeila { get; private set; }
        /// <summary>Viimeksi pyydetty toinen keila (null = ei).</summary>
        public static Keila? ToinenKeila { get; private set; }
        /// <summary>Viimeksi pyydetty hämäryys 0–1.</summary>
        public static float KeilanHamaryys { get; private set; }

        /// <summary>
        /// VALOKEILA: pallo hämärtyy (perusväri × (1 − 0,95 · hamaryys01)) paitsi keilan kohdalla (lat, lon, säde sadeKm,
        /// reunan liukuma pehmeys01 säteen osuutena). Siirtymä kestoS sekunnissa smootherstepillä; jos keila on jo päällä,
        /// keskipiste liukuu isoympyrää pitkin ja säde ja hämärä muuttuvat pehmeästi. Toinen keila sammuu.
        /// Koskee vain pohjaa ja laattoja (tileset-varjostin: pohja ja sen rasterikerrokset, napakannet); linssien omat
        /// geometriat, mastot, merkit ja UI eivät lue keilan globaaleja. Emissio (yövalot, radion maavalo) ei tummu.
        /// </summary>
        public static void Valokeila(double lat, double lon, float sadeKm, float pehmeys01, float hamaryys01, float kestoS) =>
            Valokeila(new Keila(lat, lon, sadeKm, pehmeys01), null, hamaryys01, kestoS);

        /// <summary>
        /// Kaksi keilaa (esim. lähtö ja määränpää): pikseli saa niistä valoisamman. toinen = null sammuttaa toisen.
        /// Värit ja kirkkaudet ovat keilakohtaisia; hämäryys on yhteinen.
        /// </summary>
        public static void Valokeila(Keila paa, Keila? toinen, float hamaryys01, float kestoS)
        {
            PaaKeila = paa; ToinenKeila = toinen; KeilanHamaryys = Mathf.Clamp01(hamaryys01);
            bool ok0 = KeilaTavoite(ref keilat[0], paa), ok1 = KeilaTavoite(ref keilat[1], toinen);
            if (!ok0 || !ok1) return;
            KeilaSiirtyma(KeilanHamaryys, kestoS);
        }

        /// <summary>Keilat ja hämärä pois kestoS sekunnissa (ease in/out); lopuksi globaalit nollaan (varjostin ennallaan).</summary>
        public static void ValokeilaPois(float kestoS)
        {
            PaaKeila = null; ToinenKeila = null; KeilanHamaryys = 0f;
            KeilaTavoite(ref keilat[0], null);
            KeilaTavoite(ref keilat[1], null);
            KeilaSiirtyma(0f, kestoS);
        }

        /// <summary>
        /// LINSSISIIRTO (Ihmisen matka II, "kartta väistää"): katsekohde siirtyy ruudulla dx (oikealle) ja dy (ylös) ruudun
        /// osuuksina, esim. (0, −0,25) = kohde alaspäin havainnekuvan tieltä. Kamera kääntyy paikallaan
        /// (<see cref="PalloKierto.Linssisiirto"/>); kallistus, etäisyys ja eleet pysyvät. Liuku kestoS sekunnissa ease in/out.
        /// </summary>
        public static void Linssisiirto(float dx, float dy, float kestoS) => PalloKierto.Linssisiirto(dx, dy, kestoS);

        /// <summary>Linssisiirto pois (kohde takaisin ruudun keskelle) kestoS sekunnissa.</summary>
        public static void LinssisiirtoPois(float kestoS) => PalloKierto.Linssisiirto(0f, 0f, kestoS);

        /// <summary>Keilan tila lokiin (komento "valokeila tila").</summary>
        public static string ValokeilaKuvaus()
        {
            string K(Keila? k) => k.HasValue ? $"{k.Value.lat:0.###},{k.Value.lon:0.###} {k.Value.sadeKm:0} km p {k.Value.pehmeys:0.##} " +
                                               $"kirkkaus {k.Value.kirkkaus:0.##} voimakkuus {k.Value.voimakkuus:0.##}" : "-";
            return $"pää {K(PaaKeila)}; toinen {K(ToinenKeila)}; hämäryys {KeilanHamaryys:0.##} (nyt {keilaHamaryys.nyt:0.##}, " +
                   $"voimakkuudet {keilat[0].nyt.voimakkuus:0.##}/{keilat[1].nyt.voimakkuus:0.##}, {(keilaKaynnissa ? "liukuu" : "levossa")})";
        }

        /// <summary>Keilan varjostinarvot: suunta Unityn maailmassa (geosentrinen yksikkö), kulma (rad), pehmeys, lineaarinen väri + kirkkaus.
        /// Varjostimelle rajat jänteinä (Valokeilalaskenta.Rajat): _keilaN.w = sisäjänne, _keilaRajat.x/z = ulkojänne.</summary>
        struct KeilaArvot
        {
            public (double x, double y, double z) suunta;
            public double kulma, pehmeys;
            public Vector4 vari; // rgb lineaarinen, a = kirkkaus
            public float voimakkuus;
        }

        struct KeilaSiirto { public KeilaArvot alku, kohde, nyt; }
        struct Liuku { public float alku, kohde, nyt; }

        static readonly KeilaSiirto[] keilat = new KeilaSiirto[2];
        static Liuku keilaHamaryys;
        static float keilaT0, keilaKesto;
        static bool keilaKaynnissa, keilaGlobaalitAsetettu;

        // Varjostimen globaalit (tileset: tee_tileset.py RadioHamara; Napakansi.shader). Asettamattomina 0 = ennallaan.
        static readonly int Keila0Id = Shader.PropertyToID("_keila0");
        static readonly int Keila1Id = Shader.PropertyToID("_keila1");
        static readonly int KeilaRajatId = Shader.PropertyToID("_keilaRajat");
        static readonly int Keila0VariId = Shader.PropertyToID("_keila0Vari");
        static readonly int Keila1VariId = Shader.PropertyToID("_keila1Vari");
        static readonly int KeilaHamaryysId = Shader.PropertyToID("_keilaHamaryys");

        /// <summary>
        /// Asettaa keilan siirtymän kohteen. Sammuneesta keilasta (voimakkuus 0) syttyvä hyppää kohteeseen ja vain
        /// voimakkuus nousee; palava liukuu. null = voimakkuus → 0 paikallaan. false, jos georeferenssiä ei löydy.
        /// </summary>
        static bool KeilaTavoite(ref KeilaSiirto s, Keila? k)
        {
            s.alku = s.nyt;
            if (!k.HasValue)
            {
                s.kohde = s.nyt;
                s.kohde.voimakkuus = 0f;
                return true;
            }
            var geo = Instanssi != null ? Instanssi.GetComponent<CesiumGeoreference>() : FindAnyObjectByType<CesiumGeoreference>();
            if (geo == null) { Debug.LogWarning("MATKAKIRJA valokeila: georeferenssi puuttuu"); return false; }
            var e = Valokeilalaskenta.SuuntaEcef(k.Value.lat, k.Value.lon);
            // ECEF-suunta → Unityn maailma kuten KorkeusKerroin.Aseta (_maaNolla/_maaIta/_maaAkseli): pallo ei liiku, kamera liikkuu.
            Vector3 u = geo.transform.TransformDirection((Unity.Mathematics.float3)geo.TransformEarthCenteredEarthFixedDirectionToUnity(
                new Unity.Mathematics.double3(e.x, e.y, e.z))).normalized;
            Color vari = (k.Value.vari ?? Lyhty).linear;
            s.kohde = new KeilaArvot
            {
                suunta = (u.x, u.y, u.z),
                kulma = Valokeilalaskenta.Kulma(k.Value.sadeKm),
                pehmeys = Mathf.Clamp01(k.Value.pehmeys),
                vari = new Vector4(vari.r, vari.g, vari.b, Mathf.Clamp(k.Value.kirkkaus, 0f, 0.3f)),
                voimakkuus = Mathf.Clamp01(k.Value.voimakkuus),
            };
            if (s.nyt.voimakkuus <= 0f)
            {
                // Sammunut keila: ei liukumaa tyhjästä, vain voimakkuus nousee.
                s.alku = s.kohde;
                s.alku.voimakkuus = 0f;
            }
            return true;
        }

        static void KeilaSiirtyma(float hamaryys, float kestoS)
        {
            keilaHamaryys.alku = keilaHamaryys.nyt;
            keilaHamaryys.kohde = hamaryys;
            keilaT0 = Time.unscaledTime;
            keilaKesto = Mathf.Max(0f, float.IsNaN(kestoS) ? 0f : kestoS);
            keilaKaynnissa = true;
            // Ilman KarttaKerroksia (ei Updatea) tai kestolla 0 kohde voimaan heti.
            if (Instanssi == null || keilaKesto <= 0f) PaivitaKeila(true);
        }

        /// <summary>Siirtymän askel (Update). Kirjoittaa globaalit vain liukuman aikana ja kerran lopuksi.</summary>
        static void PaivitaKeila(bool heti = false)
        {
            if (!keilaKaynnissa) return;
            float t = heti || keilaKesto <= 0f ? 1f : (Time.unscaledTime - keilaT0) / keilaKesto;
            double e = Valokeilalaskenta.Pehmennys(t);
            for (int i = 0; i < 2; i++)
            {
                ref var s = ref keilat[i];
                s.nyt = new KeilaArvot
                {
                    suunta = Valokeilalaskenta.Isoympyra(s.alku.suunta, s.kohde.suunta, e),
                    kulma = s.alku.kulma + (s.kohde.kulma - s.alku.kulma) * e,
                    pehmeys = s.alku.pehmeys + (s.kohde.pehmeys - s.alku.pehmeys) * e,
                    vari = Vector4.Lerp(s.alku.vari, s.kohde.vari, (float)e),
                    voimakkuus = Mathf.Lerp(s.alku.voimakkuus, s.kohde.voimakkuus, (float)e),
                };
            }
            keilaHamaryys.nyt = Mathf.Lerp(keilaHamaryys.alku, keilaHamaryys.kohde, (float)e);
            if (t >= 1f) keilaKaynnissa = false;
            if (keilaHamaryys.nyt <= 0f && keilat[0].nyt.voimakkuus <= 0f && keilat[1].nyt.voimakkuus <= 0f)
            {
                // Kaikki nollassa: varjostin ohittaa keilan kokonaan (sama kuin asettamaton globaali).
                if (!keilaGlobaalitAsetettu) return;
                Shader.SetGlobalFloat(KeilaHamaryysId, 0f);
                Shader.SetGlobalVector(KeilaRajatId, Vector4.zero);
                keilaGlobaalitAsetettu = false;
                return;
            }
            var r0 = Valokeilalaskenta.Rajat(keilat[0].nyt.kulma, keilat[0].nyt.pehmeys);
            var r1 = Valokeilalaskenta.Rajat(keilat[1].nyt.kulma, keilat[1].nyt.pehmeys);
            var d0 = keilat[0].nyt.suunta; var d1 = keilat[1].nyt.suunta;
            Shader.SetGlobalVector(Keila0Id, new Vector4((float)d0.x, (float)d0.y, (float)d0.z, (float)r0.sisa));
            Shader.SetGlobalVector(Keila1Id, new Vector4((float)d1.x, (float)d1.y, (float)d1.z, (float)r1.sisa));
            Shader.SetGlobalVector(KeilaRajatId, new Vector4((float)r0.ulko, keilat[0].nyt.voimakkuus, (float)r1.ulko, keilat[1].nyt.voimakkuus));
            Shader.SetGlobalVector(Keila0VariId, keilat[0].nyt.vari);
            Shader.SetGlobalVector(Keila1VariId, keilat[1].nyt.vari);
            Shader.SetGlobalFloat(KeilaHamaryysId, keilaHamaryys.nyt);
            keilaGlobaalitAsetettu = true;
        }

        /// <summary>
        /// LENNON KARTTA (omistaja 24.9.2026 klo 13.4x, Fablen päätös): lennon ajaksi sileä sarja pohjan päälle
        /// Cesiumin raster-paikkaan 1. Pohja latautuu sen alla, joten paluu perillä on välitön (tiet ja rajat
        /// palaavat samasta välimuistista). Väritaso (paikka 2) jää ennalleen. Ohitetaan, jos linssi käyttää
        /// raster-paikkoja tai pohja on pois (tyhjän arkin linssit). Offline-alueella sarjaa ei ole: laatta jää
        /// lataamatta ja pohja näkyy.
        /// </summary>
        public void LentoPohja(bool paalle)
        {
            PallonLepo.Muuttui("lentopohja");
            if (!paalle)
            {
                // Perillä: lennon jono pois (näkyvä kartta saa paikat takaisin).
                LennonEsilataus?.Peru();
                LennonEsilataus = null;
                if (pintaValmiiksi) Debug.Log("MATKAKIRJA lennon pinta: valmis pinta vapautettu (lento päättyi ennen käyttöönottoa)");
                VapautaLentopinta();
                return;
            }
            pintaVapautus = false;
            // Valmiiksi luotu pinta (LentoPohjaValmiiksi): vain näkyviin.
            if (pintaValmiiksi && OtaValmisPinta()) return;
            if (silea != null) return;
            if (rasterit.Count > 0 || pallo == null || pohja == null || !pohja.enabled)
            {
                PintaTila = "pinta ohitettu (linssi tai pohja pois)";
                return;
            }
            PintaTila = "pinta luotu nyt";
            string versio = SatelliittiVersio;
            if (string.IsNullOrEmpty(versio))
            {
                silea = Kerros(pallo.gameObject, "1", SileaUrl, SileaMaxTaso);
                return;
            }
            // Satelliitti: Blue Marble paikkaan 1 (Z0–Z7; Cesium venyttää Z7:n syvemmälle), Sentinel paikkaan 2
            // (väritaso väistyy lennon ajaksi kuten linssille). Cesium Unityssä {reverseY} = XYZ-rivi kuten pohjassa.
            silea = Kerros(pallo.gameObject, "1", BmngUrl(versio), 7);
            string s2 = SentinelKaytto(versio);
            VaistaVaritaso();
            sentinel = Kerros(pallo.gameObject, "2", s2 + "{z}/{x}/{reverseY}.jpg", 11);
            satelliittiLento = true;
            VarmistaVarakartta();
            PaivitaLennonVarjostin();
        }

        /// <summary>Blue Marblen osoitemalli (lennon pinta, paikka 1).</summary>
        static string BmngUrl(string versio) => SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg";

        // ---- Lennon pinta valmiiksi (löydös 80/84, BUILD 16) ----

        /// <summary>silea (ja ehkä sentinel) on luotu valmiiksi näkymättömänä (LentoPohjaValmiiksi), ei vielä lennon käytössä.</summary>
        bool pintaValmiiksi;
        /// <summary>Valinta sulkeutui: valmis pinta vapautetaan Updatessa, ellei aloituslento ota sitä käyttöön.</summary>
        bool pintaVapautus;
        float pintaValmiiksiAika;
        /// <summary>Valmiin pinnan sarja (SatelliittiAvain, "" = sileä): sarjan vaihduttua pinta luodaan uudelleen.</summary>
        string pintaSarja;
        /// <summary>Lennon pinta (valmis tai käytössä) on väistänyt väritason: vapautus palauttaa sen (myös Sentinelin lähdettyä).</summary>
        bool varitasoVaistetty;

        /// <summary>
        /// Viimeisimmän LentoPohja(true)-kutsun tila diagnostiikkaan (Nappula: rivit "valmius: verho musta-…"): "pinta valmiina
        /// &lt;s&gt; s (bmng; s2 luotu nyt)" = valmiiksi luotu pinta kytkettiin näkyviin (s = kauanko se ehti latautua),
        /// "pinta luotu nyt" = kerrokset luotiin vasta verhon takana, tai "pinta ohitettu (…)".
        /// </summary>
        public string PintaTila { get; private set; }

        /// <summary>
        /// LENNON PINTA VALMIIKSI NÄKYMÄTTÖMÄNÄ (löydös 80/84, Natiiviseppä BUILD 16). Aloituslennon musta verho odotti uusien
        /// raster-kerrosten (Blue Marble, Sentinel) latautumista valintanäkymän ~200 maastolaattaan (musta-valinta 1,3–2,0 s,
        /// lokit/verho-jalkeen). Nyt kerrokset luodaan jo valintanäkymässä (UI: Aloitusnakyma.AloitaPallovalinta, jossa
        /// valintanäkymän kamera asetetaan) ja piirretään läpinäkyvinä: tileset-varjostimen paikkakohtainen globaali alfa
        /// (_overlayAlfa_1/2 = 0; sekoitus lerp(pohja, näyte, näyte.a · alfa), sama kuin linssien RasterinAlfa), joten Cesium
        /// lataa niiden rasterit valintanäkymän laattoihin ennen lentoa. Mustan verhon takana LentoPohja(true) vain kytkee ne
        /// näkyviin (alfa 1) ja väistää väritason kuten ennen.
        ///
        /// PAIKKA 2 JA KERMA: valintanäkymässä nappula on Lontoossa, joten väritaso näyttää Ison-Britannian kerman paikassa 2
        /// (GBR-sarja Z3–Z8, AlinKaytetty 3; valintanäkymän kaukaisin taso ~4,8 → huntu täysin näkyvissä). Kerma näkyy, joten
        /// sitä ei poisteta: Sentinel luodaan valmiiksi vain, kun väritaso ei voi käyttää paikkaa 2 (ei väritasoa tai huntu
        /// pois), ja muuten verhon takana kuten ennen (sen laatat alle Z8 ovat Laattapalvelimen läpinäkyviä ilman verkkoa).
        /// Paikka 1 on valinnassa vapaa (linssinappi on piilossa aloitusnäytöllä); linssi (LisaaRasteri) vapauttaa valmiin pinnan.
        ///
        /// valmiiksi = false (valinta sulkeutui): pinta vapautetaan seuraavissa Updateissa heti, kun aloituslentoa ei ole
        /// käynnissä (Nappula.AloitusAjossa; käynnistynyt lento ottaa sen käyttöön mustan verhon takana tai vapauttaa sen
        /// keskeytyessään). Ohitetaan, jos linssin kerros on kartalla tai pohja pois (kuten LentoPohja). Idempotentti.
        /// </summary>
        public void LentoPohjaValmiiksi(bool valmiiksi = true)
        {
            if (!valmiiksi)
            {
                if (pintaValmiiksi) pintaVapautus = true;
                return;
            }
            pintaVapautus = false;
            if (pintaValmiiksi || silea != null || sentinel != null) return;
            if (rasterit.Count > 0 || pallo == null || pohja == null || !pohja.enabled) return;
            string versio = SatelliittiVersio;
            // Alfa 0 ennen kerroksen kytkentää, ettei yhtään kehystä piirry näkyvänä.
            Shader.SetGlobalFloat(PaikanAlfaId[1], 0f);
            if (string.IsNullOrEmpty(versio))
            {
                pintaSarja = "";
                silea = Kerros(pallo.gameObject, "1", SileaUrl, SileaMaxTaso);
            }
            else
            {
                pintaSarja = SatelliittiAvain();
                silea = Kerros(pallo.gameObject, "1", BmngUrl(versio), 7);
                string s2 = SentinelKaytto(versio);   // kattavuus Laattapalvelimelle (ja sen haku) jo nyt
                if (varitaso == null || !varitaso.huntu)
                {
                    // Väritaso väistyy ensin: sen Poista palauttaa paikan 2 alfan 1:een, joten 0 vasta sen jälkeen.
                    VaistaVaritaso();
                    Shader.SetGlobalFloat(PaikanAlfaId[2], 0f);
                    sentinel = Kerros(pallo.gameObject, "2", s2 + "{z}/{x}/{reverseY}.jpg", 11);
                }
                VarmistaVarakartta();
            }
            pintaValmiiksi = true;
            pintaValmiiksiAika = Time.unscaledTime;
            PaivitaLennonVarjostin();
            Debug.Log("MATKAKIRJA lennon pinta: valmiiksi näkymättömänä (alfa 0), paikka 1 " + (pintaSarja.Length > 0 ? "bmng" : "sileä") +
                      (sentinel != null ? ", paikka 2 s2" : pintaSarja.Length > 0 ? "; s2 verhon takana (paikka 2 on väritason)" : ""));
        }

        /// <summary>Valmiiksi luotu pinta näkyviin (LentoPohja(true)); false = ei kelpaa (vapautettu, luodaan tavalliseen tapaan).</summary>
        bool OtaValmisPinta()
        {
            float ika = Time.unscaledTime - pintaValmiiksiAika;
            string versio = SatelliittiVersio;
            string sarja = string.IsNullOrEmpty(versio) ? "" : SatelliittiAvain();
            if (rasterit.Count > 0 || pallo == null || pohja == null || !pohja.enabled || silea == null || sarja != pintaSarja)
            {
                Debug.Log("MATKAKIRJA lennon pinta: valmis pinta ei kelpaa (linssi, pohja pois tai sarja vaihtui), luodaan uudelleen");
                VapautaLentopinta();
                return false;
            }
            pintaValmiiksi = false;
            bool s2Valmiina = sentinel != null;
            if (sarja.Length > 0)
            {
                // Väritaso väistyy vasta nyt (kerma näkyi valintanäkymässä), Sentinel paikkaan 2, jos se ei ollut valmiina.
                VaistaVaritaso();
                if (sentinel == null) sentinel = Kerros(pallo.gameObject, "2", SentinelKaytto(versio) + "{z}/{x}/{reverseY}.jpg", 11);
                Shader.SetGlobalFloat(PaikanAlfaId[2], 1f);
                satelliittiLento = true;
                VarmistaVarakartta();
            }
            Shader.SetGlobalFloat(PaikanAlfaId[1], 1f);
            PaivitaLennonVarjostin();
            PintaTila = $"pinta valmiina {ika:0.0} s ({(sarja.Length == 0 ? "sileä" : s2Valmiina ? "bmng+s2" : "bmng; s2 luotu nyt")})";
            Debug.Log("MATKAKIRJA lennon pinta: valmis pinta näkyviin, " + PintaTila);
            return true;
        }

        /// <summary>Väritaso väistyy lennon pinnan tieltä (paikka 2), kerran; VapautaLentopinta palauttaa.</summary>
        void VaistaVaritaso()
        {
            if (varitaso == null || varitasoVaistetty) return;
            varitaso.Linssit(true);
            varitasoVaistetty = true;
        }

        /// <summary>
        /// Lennon pinnan kerrokset pois (valmiit tai käytössä olevat): kierrätykseen, valmiin pinnan alfat takaisin 1:een ja
        /// väritaso takaisin, jos lennon pinta väistätti sen. Ennen väritaso palasi vain, jos Sentinel oli yhä kartalla, joten
        /// aloituslennon jälkeen (LentoSentinelPois liu'ussa) kerma jäi pois kunnes linssi avattiin ja suljettiin.
        /// </summary>
        void VapautaLentopinta()
        {
            bool valmiina = pintaValmiiksi;
            pintaValmiiksi = false;
            pintaVapautus = false;
            if (silea != null) { VapautaKerros(silea); silea = null; }
            if (sentinel != null) { VapautaKerros(sentinel); sentinel = null; }
            if (valmiina)
            {
                // Valmiin pinnan paikat olivat alfalla 0. Paikan 2 alfa on muuten väritason (älä koske), mutta jos pinta oli
                // siinä, väritaso oli väistynyt eikä sen alfaa ole asetettu.
                Shader.SetGlobalFloat(PaikanAlfaId[1], 1f);
                if (varitasoVaistetty) Shader.SetGlobalFloat(PaikanAlfaId[2], 1f);
            }
            if (varitasoVaistetty)
            {
                varitasoVaistetty = false;
                if (varitaso != null && rasterit.Count == 0) varitaso.Linssit(false);
            }
            satelliittiLento = false;
            PaivitaLennonVarjostin();
        }

        /// <summary>
        /// Löydös 85 / Fablen päätös A (25.9.): Sentinel-2-kerros pois kesken satelliittilennon (aloituslennon loppuorbit),
        /// koska sen laatoissa on pilviä. Blue Marble (paikka 1, Z7 venytettynä) jää; väritaso pysyy väistössä, kunnes
        /// LentoPohja(false) palauttaa pohjan. Ei tee mitään ilman Sentinel-kerrosta.
        /// </summary>
        public void LentoSentinelPois()
        {
            if (sentinel == null) return;
            VapautaKerros(sentinel);
            sentinel = null;
            Debug.Log("MATKAKIRJA lennon pinta: Sentinel pois (aloituslennon loppu)");
        }

        /// <summary>Sentinel-sarjan kansio (ämpärin osoite, "/"-loppuinen); kattavuus Laattapalvelimelle ja sen haku.</summary>
        string SentinelKaytto(string versio)
        {
            string s2 = SatelliittiJuuri + versio + "/" + SatelliittiS2 + "/";
            Laattapalvelin.Kattavuus(s2.Substring(Laattapalvelin.Ampari.Length), SentinelKattaa);
            if (!sentinelHaettu) { sentinelHaettu = true; StartCoroutine(HaeSentinelKattavuus(versio)); }
            return s2;
        }

        /// <summary>Käynnissä oleva lennon esilataus (Nappula vaihtaa pinnan, kun osa on valmiina); null = ei lentoa.</summary>
        public Laattapalvelin.Esilataus LennonEsilataus { get; private set; }

        /// <summary>
        /// Lennon pinnan laatat välimuistiin ennen nousua (Fable 24.9., build 9): isoympyrän käytävä Z2–Z6 (reitti
        /// ja naapurit) sekä lähtö- ja kohdekaupungin lähikuva-alue Z7–Z8 (5 × 5). Noin 150–300 laattaa.
        /// Satelliitilla lisäksi Sentinel-2 Z8–Z11 päätepisteiden ympäriltä, kun kattavuus on ladattu (vain katetut).
        /// Edellisen lennon jono perutaan. Palauttaa edistymisen (myös LennonEsilataus).
        /// </summary>
        public Laattapalvelin.Esilataus EsilataaLento(double lat0, double lon0, double lat1, double lon1)
        {
            LennonEsilataus?.Peru();
            LennonEsilataus = null;
            string versio = SatelliittiVersio;
            string malli = string.IsNullOrEmpty(versio) ? SileaUrl : SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg";
            int huippu = string.IsNullOrEmpty(versio) ? 8 : 7;
            if (!malli.StartsWith(Laattapalvelin.Ampari, StringComparison.Ordinal)) return null;
            string pohjaPolku = malli.Substring(Laattapalvelin.Ampari.Length);
            var joukko = new HashSet<string>();
            void Lisaa(int z, double lat, double lon, int sade)
            {
                int n = 1 << z;
                double la = Math.Max(-85.0, Math.Min(85.0, lat)) * Math.PI / 180.0;
                int x = (int)Math.Floor((lon + 180.0) / 360.0 * n);
                int y = (int)Math.Floor((1.0 - Math.Log(Math.Tan(la) + 1.0 / Math.Cos(la)) / Math.PI) / 2.0 * n);
                for (int dx = -sade; dx <= sade; dx++)
                    for (int dy = -sade; dy <= sade; dy++)
                    {
                        int xx = ((x + dx) % n + n) % n, yy = y + dy;
                        if (yy < 0 || yy >= n) continue;
                        // {reverseY} on Cesium Unityssä XYZ-rivi (Rakennus.LaattaUrl): tiedostopolku on XYZ.
                        joukko.Add(pohjaPolku.Replace("{z}", z.ToString()).Replace("{x}", xx.ToString()).Replace("{reverseY}", yy.ToString()));
                    }
            }
            for (int z = 2; z <= Math.Min(6, huippu); z++)
                for (int i = 0; i <= 48; i++)
                {
                    var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, i / 48.0);
                    Lisaa(z, q.x, q.y, 1);
                }
            for (int z = 7; z <= huippu; z++) { Lisaa(z, lat0, lon0, 2); Lisaa(z, lat1, lon1, 2); }
            var e = Laattapalvelin.Esilataa(new List<string>(joukko));
            // Aloituslennon musta verho odottaa tätä (Nappula: reitti ≥ 90 %), joten se jatkuu verhon kevennyksessäkin.
            e.Verholle = true;
            LennonEsilataus = e;
            Debug.Log($"MATKAKIRJA lennon pinta: esilataus {joukko.Count} laattaa");
            if (!string.IsNullOrEmpty(versio))
            {
                StartCoroutine(EsilataaSentinel(versio, lat0, lon0, lat1, lon1, e));
                VarmistaVarakartta();   // valmiina ennen pinnan vaihtoa (16 pientä laattaa)
            }
            return e;
        }

        /// <summary>Käynnissä oleva lennon kohdealueen esilataus (EsilataaKohde); null = ei lentoa.</summary>
        public Laattapalvelin.Esilataus LennonKohdeEsilataus { get; private set; }

        /// <summary>Laatan (x, y) XYZ-ruudukossa tasolla z (Web Mercator).</summary>
        static (int x, int y) LaattaXY(int z, double lat, double lon)
        {
            int n = 1 << z;
            double la = Math.Max(-85.0, Math.Min(85.0, lat)) * Math.PI / 180.0;
            int x = (int)Math.Floor((lon + 180.0) / 360.0 * n);
            int y = (int)Math.Floor((1.0 - Math.Log(Math.Tan(la) + 1.0 / Math.Cos(la)) / Math.PI) / 2.0 * n);
            return (((x % n) + n) % n, Math.Max(0, Math.Min(n - 1, y)));
        }

        /// <summary>Laatikon (lat/lon, asteina) laatat tasolla z lähimmästä alkaen (kaupungin laatta ensin).</summary>
        static List<(int x, int y)> LaatikonLaatat(int z, double latMin, double latMax, double lonMin, double lonMax, double lat, double lon)
        {
            int n = 1 << z;
            var (x0, y0) = LaattaXY(z, latMax, lonMin);
            var (x1, y1) = LaattaXY(z, latMin, lonMax);
            var (cx, cy) = LaattaXY(z, lat, lon);
            int leveys = ((x1 - x0) % n + n) % n;
            var tulos = new List<(int x, int y)>();
            for (int dx = 0; dx <= leveys; dx++)
                for (int y = y0; y <= y1; y++) tulos.Add(((x0 + dx) % n, y));
            int Etaisyys((int x, int y) t) { int d = Math.Abs(t.x - cx); d = Math.Min(d, n - d); return Math.Max(d, Math.Abs(t.y - cy)); }
            tulos.Sort((a, b) => Etaisyys(a).CompareTo(Etaisyys(b)));
            return tulos;
        }

        /// <summary>Sentinel Z9 kohdealueelta enintään näin monta laattaa (lähimmät ensin; harva kattavuus karsii lisää).</summary>
        const int KohdeZ9Enintaan = 160;

        /// <summary>
        /// LASKUN LAATAT (Fable 24.9. klo 18, video kamerareitti-b11k: laskun sumeat laatat): lennon kohdealueen laatat
        /// välimuistiin heti lennon alussa ETUSIJALLA (Esilataus.Etusija: oma jono ja 4 omaa hakupaikkaa näkyvän kartan lisäksi). Laatikko = orbitin
        /// loppunäkymä (saapumisnäkymä väljennettynä, Nappula). EsilataaLento hakee kohteesta vain 5 × 5 Z7–Z8 ja Sentinel
        /// Z8–Z11 säteellä 1–2 esilatausjonossa, jota palvellaan vain näkyvän jonon ollessa tyhjä: saapumisnäkymä on
        /// ~7° × 10° (kaupunki alakolmanneksella, näkymä ulottuu ~8° pohjoiseen), eli Z7 ±2 ja Sentinel Z8 ±1 eivät
        /// kata sitä, ja jono ehti lennon aikana harvoin kohteeseen asti. Satelliitilla Blue Marble Z5–Z7 ja Sentinel Z8
        /// koko laatikosta, Z9 (lähimmät, kattavuuden mukaan) ja Z10 säde 2 kaupungin ympäriltä (orbit 250 km:stä);
        /// sileällä pohjalla Z5–Z8. Edellisen lennon kohdelataus perutaan.
        /// </summary>
        public Laattapalvelin.Esilataus EsilataaKohde(double latMin, double latMax, double lonMin, double lonMax, double lat, double lon)
        {
            LennonKohdeEsilataus?.Peru();
            LennonKohdeEsilataus = null;
            string versio = SatelliittiVersio;
            string malli = string.IsNullOrEmpty(versio) ? SileaUrl : SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg";
            int huippu = string.IsNullOrEmpty(versio) ? 8 : 7;
            if (!malli.StartsWith(Laattapalvelin.Ampari, StringComparison.Ordinal)) return null;
            string pohjaPolku = malli.Substring(Laattapalvelin.Ampari.Length);
            var polut = new List<string>();
            var nahty = new HashSet<string>();
            // Lähin taso ensin: laskeutumisnäkymän tarkin pohjataso, sitten karkeammat varalle.
            for (int z = huippu; z >= 5; z--)
                foreach (var (x, y) in LaatikonLaatat(z, latMin, latMax, lonMin, lonMax, lat, lon))
                {
                    string p = pohjaPolku.Replace("{z}", z.ToString()).Replace("{x}", x.ToString()).Replace("{reverseY}", y.ToString());
                    if (nahty.Add(p)) polut.Add(p);
                }
            var e = new Laattapalvelin.Esilataus { Etusija = true };
            Laattapalvelin.Esilataa(polut, e);
            LennonKohdeEsilataus = e;
            Debug.Log($"MATKAKIRJA lennon pinta: kohdealue {polut.Count} laattaa etusijalla " +
                      $"(lat {latMin:0.0}–{latMax:0.0}, lon {lonMin:0.0}–{lonMax:0.0})");
            if (!string.IsNullOrEmpty(versio)) StartCoroutine(EsilataaKohdeSentinel(versio, latMin, latMax, lonMin, lonMax, lat, lon, e));
            return e;
        }

        System.Collections.IEnumerator EsilataaKohdeSentinel(string versio, double latMin, double latMax, double lonMin, double lonMax,
            double lat, double lon, Laattapalvelin.Esilataus e)
        {
            string s2 = SentinelKaytto(versio).Substring(Laattapalvelin.Ampari.Length);
            float raja = Time.unscaledTime + 10f;
            while (sentinelZ8 == null && Time.unscaledTime < raja && !e.Peruttu) yield return null;
            if (sentinelZ8 == null || e.Peruttu) yield break;
            var polut = new List<string>();
            void Lisaa(int z, IEnumerable<(int x, int y)> laatat, int enintaan)
            {
                int n = 0;
                foreach (var (x, y) in laatat)
                {
                    if (!SentinelKattaa(z, x, y)) continue;
                    polut.Add(s2 + z + "/" + x + "/" + y + ".jpg");
                    if (++n >= enintaan) break;
                }
            }
            // Z10 kaupungin ympäriltä ensin (orbit 250 km:stä), sitten saapumisnäkymän Z8 ja Z9.
            var (cx, cy) = LaattaXY(10, lat, lon);
            var z10 = new List<(int x, int y)>();
            for (int dx = -2; dx <= 2; dx++) for (int dy = -2; dy <= 2; dy++) z10.Add(((cx + dx + 1024) % 1024, Math.Max(0, Math.Min(1023, cy + dy))));
            Lisaa(10, z10, 25);
            Lisaa(8, LaatikonLaatat(8, latMin, latMax, lonMin, lonMax, lat, lon), int.MaxValue);
            Lisaa(9, LaatikonLaatat(9, latMin, latMax, lonMin, lonMax, lat, lon), KohdeZ9Enintaan);
            Laattapalvelin.Esilataa(polut, e);
            Debug.Log($"MATKAKIRJA lennon pinta: kohdealue + Sentinel {polut.Count} laattaa etusijalla");
        }

        /// <summary>Aloituslennon lähtö (PeliOhjain.AloitusLat/AloitusLon, Assembly-CSharp): Lontoo.</summary>
        public const double AloitusLahtoLat = 51.507, AloitusLahtoLon = -0.128;
        /// <summary>Aloitusvalinnan pallon keskus (Aloitusnakyma.ValintaLat/ValintaLon): koko pallonpuolisko näkyy.</summary>
        public const double ValintaLat = 30, ValintaLon = 17;

        /// <summary>Aloitusnäytön esilataus (null = ei vielä aloitettu); diagnostiikkaan ja mittauksiin.</summary>
        public Laattapalvelin.Esilataus AloitusEsilataus { get; private set; }
        bool aloitusEsiladattu;
        PalloKierto avausKierto;
        float kiilatAlkoi;
        /// <summary>Aloitusnäytön avauskiilojen enimmäisaika (s): sen jälkeen Cesium ei enää valitse niiden laattoja.</summary>
        const float KiilatEnintaanS = 120f;

        /// <summary>
        /// ALOITUSNÄYTÖN ESILATAUS (Fablen päätös BUILD 16, esilatauspolitiikan kohta 2; löydös 80): aloituslennon mustan
        /// verhon aikana Cesium pyytää Lontoon lähikuvan (kone 30 km, LennonAikajana.LahiM / LahiKallistus 84°, näkyvä
        /// ala horisonttiin ~400 km) ja valintanäkymän (pallonpuolisko keskuksena <see cref="ValintaLat"/>, <see cref="ValintaLon"/>)
        /// lennon pinnan laatat. Ne haetaan levylle jo portin aikana tavallisena esilatauksena (esiJono: vain kun näkyvän
        /// kartan jono on tyhjä, kaksi paikkaa jää näkyvälle), jolloin musta verho lukee ne välimuistista.
        ///   lähikuva: lennon pinta lähtöpäästä samalla kaavalla kuin <see cref="EsilataaLento"/> (Z2–Z6 säde 1, Z7 säde 2,
        ///             Sentinel Z8–Z9 säde 1 ja Z10–Z11 säde 3, vain katetut) sekä pohja Z5–Z6 säde 1 ja Z7–Z9 säde 2
        ///             (pohja latautuu lennon pinnan alla, KarttaKerrokset.LentoPohja) ja maasto <see cref="AloitusMaasto"/>;
        ///   valinta:  lennon pinta Z2–Z4 laatoista, joiden keskipiste on enintään 80° valintanäkymän keskuksesta
        ///             (Sentinel alle Z8 on kattamaton eikä hae verkkoa, pohja on jo näkyvissä).
        /// Kohde ei ole vielä tiedossa, joten reitin käytävä ja kohde jäävät lennon omaan esilataukseen, ja lähikuvan suunta
        /// (lentosuunta + 90–100°) on auki: laatat Lontoon ympäriltä kaikkiin suuntiin. Lähikuvan asento (kone Lontoon yllä,
        /// kamera 12–30 km, kallistus 82–84°): lähin maa 40–45 km kamerasta, horisontti ~520 km; rasterien taso seuraa
        /// maastolaatan tasoa (pohja katto Z9, Blue Marble Z7, Sentinel Z11), joten Sentinel Z11 tarvitaan noin 20–80 km
        /// Lontoon takana (säde 3 = ±37 km) ja pohja/Blue Marble Z7–Z9 kattavat lähialueen säteillä 2.
        /// </summary>
        public Laattapalvelin.Esilataus EsilataaAloituslahto()
        {
            string versio = SatelliittiVersio;
            string malli = string.IsNullOrEmpty(versio) ? SileaUrl : SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg";
            int huippu = string.IsNullOrEmpty(versio) ? 8 : 7;
            if (!malli.StartsWith(Laattapalvelin.Ampari, StringComparison.Ordinal)) return null;
            string pintaPolku = malli.Substring(Laattapalvelin.Ampari.Length);
            string pohjaMalli = PohjaMalli();

            var polut = new List<string>();
            var nahty = new HashSet<string>();
            void Lisaa(string m, int z, int x, int y)
            {
                string p = m.Replace("{z}", z.ToString()).Replace("{x}", x.ToString()).Replace("{reverseY}", y.ToString());
                if (nahty.Add(p)) polut.Add(p);
            }
            void Ymparilta(string m, int z, double lat, double lon, int sade)
            {
                int n = 1 << z;
                var (x, y) = LaattaXY(z, lat, lon);
                for (int dx = -sade; dx <= sade; dx++)
                    for (int dy = -sade; dy <= sade; dy++)
                    {
                        int yy = y + dy;
                        if (yy >= 0 && yy < n) Lisaa(m, z, ((x + dx) % n + n) % n, yy);
                    }
            }
            // Lähikuva ensin (musta verho odottaa sitä), tarkimmat tasot ensin.
            for (int z = huippu; z >= 7; z--) Ymparilta(pintaPolku, z, AloitusLahtoLat, AloitusLahtoLon, 2);
            for (int z = Math.Min(6, huippu); z >= 2; z--) Ymparilta(pintaPolku, z, AloitusLahtoLat, AloitusLahtoLon, 1);
            int lahiPinta = polut.Count;
            if (pohjaMalli != null)
                for (int z = 9; z >= 5; z--) Ymparilta(pohjaMalli, z, AloitusLahtoLat, AloitusLahtoLon, z >= 7 ? 2 : 1);
            int lahiPohja = polut.Count - lahiPinta;
            // Valintanäkymä: pallonpuolisko, laatan keskipiste enintään 80° keskuksesta.
            double c0 = Math.Cos(ValintaLat * Math.PI / 180.0);
            var keskus = (x: c0 * Math.Cos(ValintaLon * Math.PI / 180.0), y: c0 * Math.Sin(ValintaLon * Math.PI / 180.0),
                z: Math.Sin(ValintaLat * Math.PI / 180.0));
            double raja = Math.Cos(80.0 * Math.PI / 180.0);
            for (int z = 2; z <= Math.Min(4, huippu); z++)
            {
                int n = 1 << z;
                for (int x = 0; x < n; x++)
                    for (int y = 0; y < n; y++)
                    {
                        double lon = (x + 0.5) / n * 360.0 - 180.0;
                        double lat = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * (y + 0.5) / n))) * 180.0 / Math.PI;
                        double cl = Math.Cos(lat * Math.PI / 180.0);
                        double d = cl * Math.Cos(lon * Math.PI / 180.0) * keskus.x + cl * Math.Sin(lon * Math.PI / 180.0) * keskus.y
                                   + Math.Sin(lat * Math.PI / 180.0) * keskus.z;
                        if (d >= raja) Lisaa(pintaPolku, z, x, y);
                    }
            }
            var e = Laattapalvelin.Esilataa(polut);
            AloitusEsilataus = e;
            Debug.Log($"MATKAKIRJA aloitusnäyttö: esilataus {polut.Count} laattaa (lähikuva pinta {lahiPinta}, pohja {lahiPohja}, " +
                      $"valinta {polut.Count - lahiPinta - lahiPohja})");
            if (!string.IsNullOrEmpty(versio))
            {
                StartCoroutine(EsilataaAloitusSentinel(versio, e));
                VarmistaVarakartta();
            }
            StartCoroutine(EsilataaAloitusMaasto(e));
            return e;
        }

        /// <summary>
        /// Aloitusnäytön maaston tasot ja säteet (laattoina) Lontoon ympäriltä: noin ±40 km (Z10) … ±145 km (Z7) itä–länsi
        /// ja puolitoista kertaa pohjois–etelä (laatta 0,18° … 1,4°; MaastoLaatat). Cesiumin maastotaso: geometrinen virhe
        /// 77 067 m / 2^z ≤ 2 px (SSE 16 / 8), eli 2 400 px:n ruudulla (fov 50°) Z12 riittää ≥ 24 km:n, Z11 ≥ 49 km:n ja
        /// Z10 ≥ 98 km:n päässä. Lähikuvan lähialueen Z11–Z12 riippuu suunnasta (kohde), joten esiladataan niiden
        /// esivanhemmat, joiden läpi Cesium laskeutuu taso kerrallaan (lapsi vasta vanhemman latauduttua). Nykyisessä
        /// maastossa (2026-09-24-maailma) nämä ovat kaikki saatavilla (Z7 säde 2 osuisi Pohjanmereen, 7/128/103 ei ole).
        /// </summary>
        /// <summary>Pohjakartan laattamalli ämpärin polkuna ({z}/{x}/{reverseY}), null jos pohja ei ole ämpärissä.</summary>
        string PohjaMalli()
        {
            string m = pohja is CesiumUrlTemplateRasterOverlay pu ? pu.templateUrl : null;
            if (m != null && Laattapalvelin.Juuri != null && m.StartsWith(Laattapalvelin.Juuri, StringComparison.Ordinal))
                return m.Substring(Laattapalvelin.Juuri.Length);
            if (m != null && m.StartsWith(Laattapalvelin.Ampari, StringComparison.Ordinal))
                return m.Substring(Laattapalvelin.Ampari.Length);
            return null;
        }

        /// <summary>Käynnissä oleva aloituslennon avausnäkymän esilataus (EsilataaAvaus); null = ei aloitettu.</summary>
        public Laattapalvelin.Esilataus AvausEsilataus { get; private set; }

        /// <summary>
        /// Kehittäjälippu: geometrinen avauksen esilataus päälle (PlayerPrefs matkakirja-avaus-esilataus 1). Oletus pois:
        /// malli ennusti 2–3-kertaisen joukon (tarkkuus 20–35 %), ja AvausKamerat antaa Cesiumin valita laatat itse.
        /// </summary>
        public static bool AvausEsilatausPaalla
        {
            get
            {
#if !MATKAKIRJA_APPSTORE
                if (avausLippu < 0)
                {
                    avausLippu = PlayerPrefs.GetInt("matkakirja-avaus-esilataus", 0);
                    AvausLaatat.Saada(PlayerPrefs.GetString("matkakirja-avaus-malli", ""));
                }
                return avausLippu != 0;
#else
                return true;
#endif
            }
        }
        static int avausLippu = -1;

        /// <summary>
        /// ALOITUSLENNON AVAUSNÄKYMÄN ESILATAUS (Natiiviseppä 26.9., build 22; ESILATAUSPOLITIIKKA kohta 2): mustan verhon
        /// avausvaihe odotti Cesiumin tason kerrallaan etenevää latausta (kylmänä 5 s katto, pallo 46–57 %). Kun avauksen
        /// asento on laskettu (Nappula, ennen mustaan häivytystä), sen laatat haetaan levylle kaikilla tasoilla yhtä aikaa
        /// (AvausLaatat: lähialue ja katseen kiila): pohja Z6–Z9, lennon pinta (Blue Marble) Z6–huippu ja maasto Z6–Z8.
        /// Verholle = tosi (palvellaan verhon kevennyksessäkin). Edellinen perutaan.
        /// </summary>
        public Laattapalvelin.Esilataus EsilataaAvaus(double lat0, double lon0, double etaisyysM, double kallistus, double suunta)
        {
            AvausEsilataus?.Peru();
            AvausEsilataus = null;
            if (!AvausEsilatausPaalla) return null;
            double km = etaisyysM / 1000.0;
            var polut = new List<string>();
            var nahty = new HashSet<string>();
            void Lisaa(string m, bool reverseY, List<(int z, int x, int y)> laatat)
            {
                if (m == null) return;
                foreach (var (z, x, y) in laatat)
                {
                    string p = m.Replace("{z}", z.ToString()).Replace("{x}", x.ToString())
                        .Replace(reverseY ? "{reverseY}" : "{y}", y.ToString());
                    if (nahty.Add(p)) polut.Add(p);
                }
            }
            string versio = SatelliittiVersio;
            string malli = string.IsNullOrEmpty(versio) ? SileaUrl : SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg";
            int huippu = string.IsNullOrEmpty(versio) ? 8 : 7;
            string pinta = malli.StartsWith(Laattapalvelin.Ampari, StringComparison.Ordinal) ? malli.Substring(Laattapalvelin.Ampari.Length) : null;
            int maastoN = 0;
            if (maastoPohja != null && Laattapalvelin.MaastoPolku != null)
            {
                foreach (var (z, x, y) in AvausLaatat.Laatat(true, 6, 8, 0.0, lat0, lon0, km, kallistus, suunta))
                {
                    if (!MaastoLaatat.Saatavilla(maastoSaatavuus, z, x, y)) continue;
                    string p = Laattapalvelin.MaastoPolku + maastoPohja.Replace("{z}", z.ToString()).Replace("{x}", x.ToString())
                        .Replace("{y}", y.ToString());
                    if (nahty.Add(p)) { polut.Add(p); maastoN++; }
                }
            }
            int ennen = polut.Count;
            Lisaa(PohjaMalli(), true, AvausLaatat.Laatat(false, 6, 9, 0.7, lat0, lon0, km, kallistus, suunta));
            int pohjaN = polut.Count - ennen;
            Lisaa(pinta, true, AvausLaatat.Laatat(false, 6, huippu, 0.7, lat0, lon0, km, kallistus, suunta));
            var e = Laattapalvelin.Esilataa(polut);
            e.Verholle = true;
            AvausEsilataus = e;
            Debug.Log($"MATKAKIRJA aloituslento: avauksen esilataus {polut.Count} laattaa (maasto {maastoN}, pohja {pohjaN}, " +
                      $"pinta {polut.Count - ennen - pohjaN}; {km:0} km {kallistus:0}° {suunta:0}°)");
            return e;
        }

        /// <summary>Maaston tiles-pohja ja saatavuus (EsilataaAloitusMaasto lukee layer.jsonin; EsilataaAvaus käyttää).</summary>
        string maastoPohja;
        List<(int x0, int y0, int x1, int y1)>[] maastoSaatavuus;

        static readonly (int z, int sade)[] AloitusMaasto = { (6, 1), (7, 1), (8, 2), (9, 2), (10, 3) };

        /// <summary>
        /// Aloitusnäytön esilatauksen maasto (löydös 80): Lontoon lähikuvan maastolaatat samaan esilataukseen. Mittauksessa
        /// (lokit/verho-jalkeen) mustan verhon lähikuvan maasto tuli verkosta kylmänä (maasto v11/10) ja toisellakin
        /// käynnistyksellä (v23/15), koska listassa oli vain rasterit. layer.json (tiles-pohja ja available) Laattapalvelimen
        /// kautta; luku taustasäikeessä (~220 kt), ettei portin kiertävä pallo nyi. Vain saatavilla olevat (Cesium ei pyydä muita).
        /// </summary>
        System.Collections.IEnumerator EsilataaAloitusMaasto(Laattapalvelin.Esilataus e)
        {
            string kansio = Laattapalvelin.MaastoPolku;
            if (pallo == null || pallo.tilesetSource != CesiumDataSource.FromUrl || string.IsNullOrEmpty(kansio)
                || string.IsNullOrEmpty(pallo.url)) yield break;
            string json = null;
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(pallo.url))
            {
                r.timeout = 20;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success) json = r.downloadHandler.text;
            }
            if (e.Peruttu) yield break;
            if (string.IsNullOrEmpty(json))
            {
                Debug.LogWarning("MATKAKIRJA aloitusnäyttö: maaston layer.json ei latautunut, maasto ei esilataudu");
                yield break;
            }
            int maxTaso = 0;
            foreach (var (z, _) in AloitusMaasto) maxTaso = Math.Max(maxTaso, z);
            var tehtava = System.Threading.Tasks.Task.Run(() =>
            {
                string tp = MaastoLaatat.TilesPohja(json);
                var saat = MaastoLaatat.Saatavuus(json, maxTaso);
                maastoPohja = tp;
                maastoSaatavuus = saat;
                return MaastoLaatat.Ymparilta(kansio, tp, saat, AloitusLahtoLat, AloitusLahtoLon, AloitusMaasto);
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted || e.Peruttu)
            {
                if (tehtava.IsFaulted) Debug.LogWarning("MATKAKIRJA aloitusnäyttö: maaston layer.json ei ole luettavissa: " + tehtava.Exception?.GetBaseException().Message);
                yield break;
            }
            var polut = tehtava.Result;
            if (polut.Count > 0) Laattapalvelin.Esilataa(polut, e);
            Debug.Log($"MATKAKIRJA aloitusnäyttö: esilataus + maasto {polut.Count} laattaa (yhteensä {e.Yhteensa})");
        }

        System.Collections.IEnumerator EsilataaAloitusSentinel(string versio, Laattapalvelin.Esilataus e)
        {
            string s2 = SentinelKaytto(versio).Substring(Laattapalvelin.Ampari.Length);
            float raja = Time.unscaledTime + 10f;
            while (sentinelZ8 == null && Time.unscaledTime < raja && !e.Peruttu) yield return null;
            if (sentinelZ8 == null || e.Peruttu) yield break;
            var polut = new List<string>();
            // Z8–Z9 säde 1, Z10–Z11 säde 3 (lennon EsilataaSentinel: 2), vain katetut; tarkimmat ensin. Lähikuvan Sentinel Z11
            // ulottuu lähimmästä maasta (~20 km Lontoon takana) noin 80 km:iin suunnan mukaan; säde 3 = ±37 km (Z11) / ±73 km (Z10).
            for (int z = 11; z >= 8; z--)
            {
                int n = 1 << z, sade = z < 10 ? 1 : 3;
                var (x, y) = LaattaXY(z, AloitusLahtoLat, AloitusLahtoLon);
                for (int dx = -sade; dx <= sade; dx++)
                    for (int dy = -sade; dy <= sade; dy++)
                    {
                        int xx = ((x + dx) % n + n) % n, yy = y + dy;
                        if (yy < 0 || yy >= n || !SentinelKattaa(z, xx, yy)) continue;
                        polut.Add(s2 + z + "/" + xx + "/" + yy + ".jpg");
                    }
            }
            Laattapalvelin.Esilataa(polut, e);
            Debug.Log($"MATKAKIRJA aloitusnäyttö: esilataus + Sentinel {polut.Count} laattaa (yhteensä {e.Yhteensa})");
        }

        /// <summary>
        /// Sentinel-2 (Z8–Z11, harva) lähtö- ja kohdekaupungin ympäriltä samaan esilataukseen, kun kattavuus on
        /// ladattu: vain katetut laatat (muut Laattapalvelin antaisi läpinäkyvinä ilman verkkoa). Säde 1–2 laattaa.
        /// </summary>
        System.Collections.IEnumerator EsilataaSentinel(string versio, double lat0, double lon0, double lat1, double lon1, Laattapalvelin.Esilataus e)
        {
            string s2 = SentinelKaytto(versio).Substring(Laattapalvelin.Ampari.Length);
            float raja = Time.unscaledTime + 10f;
            while (sentinelZ8 == null && Time.unscaledTime < raja && !e.Peruttu) yield return null;
            if (sentinelZ8 == null || e.Peruttu) yield break;
            var polut = new List<string>();
            var nahty = new HashSet<string>();
            foreach (var (lat, lon) in new[] { (lat0, lon0), (lat1, lon1) })
                for (int z = 8; z <= 11; z++)
                {
                    int n = 1 << z, sade = z < 10 ? 1 : 2;
                    double la = Math.Max(-85.0, Math.Min(85.0, lat)) * Math.PI / 180.0;
                    int x = (int)Math.Floor((lon + 180.0) / 360.0 * n);
                    int y = (int)Math.Floor((1.0 - Math.Log(Math.Tan(la) + 1.0 / Math.Cos(la)) / Math.PI) / 2.0 * n);
                    for (int dx = -sade; dx <= sade; dx++)
                        for (int dy = -sade; dy <= sade; dy++)
                        {
                            int xx = ((x + dx) % n + n) % n, yy = y + dy;
                            if (yy < 0 || yy >= n || !SentinelKattaa(z, xx, yy)) continue;
                            string p = s2 + z + "/" + xx + "/" + yy + ".jpg";
                            if (nahty.Add(p)) polut.Add(p);
                        }
                }
            Laattapalvelin.Esilataa(polut, e);
            Debug.Log($"MATKAKIRJA lennon pinta: esilataus + Sentinel {polut.Count} laattaa");
        }

        public void PoistaRasteri(string avain)
        {
            if (!rasterit.TryGetValue(avain, out var r)) return;
            if (r.alfaMuutettu && Paikka(r.kerros) is int paikka && paikka >= 0) Shader.SetGlobalFloat(PaikanAlfaId[paikka], 1f);
            VapautaKerros(r.kerros);
            rasterit.Remove(avain);
            if (rasterit.Count == 0 && varitaso != null) varitaso.Linssit(false);
            PaivitaNavat();
        }

        // ---- Ristihäivytys pohjan ja linssin rasterin välillä (radiouudistus build 12, RadioMastot.Hamara) ----

        static readonly int[] PaikanAlfaId =
            { Shader.PropertyToID("_overlayAlfa_0"), Shader.PropertyToID("_overlayAlfa_1"), Shader.PropertyToID("_overlayAlfa_2") };
        bool pohjaPyydetty = true, pohjaPidossa;

        /// <summary>
        /// Linssin rasterin globaali alfa tileset-varjostimessa (_overlayAlfa_&lt;paikka&gt;, paikka = kerroksen materialKey
        /// 1 tai 2, jonka LisaaRasteri antoi): 0 = pohja näkyy läpi, 1 = rasteri kokonaan. Palauttaa paikan tai −1, jos
        /// avainta ei ole. Paikan alfa palautuu 1:een, kun rasteri poistetaan (seuraava käyttäjä saa täyden alfan).
        /// </summary>
        public int RasterinAlfa(string avain, float alfa)
        {
            if (avain == null || !rasterit.TryGetValue(avain, out var r) || r.kerros == null) return -1;
            int paikka = Paikka(r.kerros);
            if (paikka < 0) return -1;
            Shader.SetGlobalFloat(PaikanAlfaId[paikka], Mathf.Clamp01(alfa));
            r.alfaMuutettu = true;
            return paikka;
        }

        static int Paikka(CesiumRasterOverlay k) =>
            k != null && k.materialKey != null && k.materialKey.Length == 1 && k.materialKey[0] >= '0' && k.materialKey[0] <= '2'
                ? k.materialKey[0] - '0' : -1;

        /// <summary>
        /// Pergamenttipohja (paikka 0) pidetään näkyvissä linssin pyynnöstä riippumatta (Nakyvyys("laatat", false)),
        /// kun tosi: linssin rasteri häivytetään pohjan päälle, ja pohja saa poistua vasta, kun rasteri on täysi.
        /// </summary>
        public void PidaPohja(bool pida)
        {
            if (pohjaPidossa == pida) return;
            pohjaPidossa = pida;
            if (pohja != null) pohja.enabled = pohjaPyydetty || pida;
            PaivitaNavat();
        }

        public void Alfa(string avain, float alfa)
        {
            if (rasterit.TryGetValue(avain, out var r)) r.kerros.enabled = alfa > 0f;
            PaivitaNavat();
        }

        /// <summary>
        /// Reliefi pohjan tilalla (topografialinssi, ei luovuttanut): napakalotti piiloon ja kannet
        /// reliefin sävyyn (web NAPAKANSI_RELIEFI_*). Kalotti on pelin kartan kuva, eikä se saa
        /// nousta reliefin päälle; laatat loppuvat reliefilläkin 85°:een, joten kansi jää.
        /// </summary>
        void PaivitaNavat()
        {
            if (napakannet == null) return;
            // Radion topografiapohja (RadioLinssi.PohjaKerros, omistaja 24.9. klo 22.3x) on sama reliefisarja omalla avaimella.
            bool Paalla(string avain) => rasterit.TryGetValue(avain, out var r) && r.kerros != null && r.kerros.enabled;
            bool reliefi = (Paalla(Matkakirja.Linssit.Topografia.Kerros) || Paalla(Matkakirja.Linssit.Radio.RadioLinssi.PohjaKerros))
                           && (pohja == null || !pohja.enabled);
            napakannet.Reliefi(reliefi);
        }

        void Update()
        {
            PaivitaKeila();
            // Aloitusnäyttö (portti) näkyy: aloituslennon lähtöpään laatat levylle matalalla prioriteetilla (BUILD 16).
            // Vasta aloitusverhon lähdettyä (löydös 80, kylmä alku): verhon aikana esilataus ei saa edes jonottaa, vaan
            // näkyvä pallo saa kaikki paikat ja säikeet. Laattapalvelimen kevennys tauottaa esiJonon verhon ajan, mutta
            // Esilataa käynnistää silti satoja levyhakuja taustasäikeisiin, ja kevennyksen voi kytkeä pois (A/B-lippu).
            if (!aloitusEsiladattu && PalloKierto.PorttiSumea && !Aloitusverho.Nakyvissa && pallo != null && pohja != null)
            {
                aloitusEsiladattu = true;
                EsilataaAloituslahto();
                // Avausnäkymän virtuaalikamerat (build 22): Cesium lataa aloituslennon avauksen laatat kaikkiin suuntiin.
                if (avausKierto == null) avausKierto = FindAnyObjectByType<PalloKierto>();
                AvausKamerat.Kiilat(avausKierto, pallo, AloitusLahtoLat, AloitusLahtoLon, LennonAikajana.AloitusAvausM,
                    LennonAikajana.AloitusAvausKallistus);
                kiilatAlkoi = Time.unscaledTime;
            }
            // Kiilat pois, jos aloitusnäytöstä lähdettiin ilman aloituslentoa (jatka tallennusta) tai ne ovat olleet liian kauan.
            if (AvausKamerat.Maara > 0 && kiilatAlkoi > 0f && (nappula == null || !nappula.AloitusAjossa)
                && (!PalloKierto.PorttiSumea || Time.unscaledTime - kiilatAlkoi > KiilatEnintaanS))
            {
                kiilatAlkoi = 0f;
                AvausKamerat.Lopeta(PalloKierto.PorttiSumea ? "aikaraja" : "aloitusnäyttö ohi");
            }
            // Valinta sulkeutui (LentoPohjaValmiiksi(false)): valmis pinta pois, kun aloituslentoa ei ole käynnissä. Valinnan
            // Valitse käynnistää lennon samassa kutsussa, jolloin pinta odottaa lentoa (LentoPohja(true) tai keskeytys).
            if (pintaVapautus && (nappula == null || !nappula.AloitusAjossa))
            {
                bool oli = pintaValmiiksi;
                pintaVapautus = false;
                if (oli)
                {
                    VapautaLentopinta();
                    Debug.Log("MATKAKIRJA lennon pinta: valmis pinta vapautettu (valinta sulkeutui ilman aloituslentoa)");
                }
            }
            if (pallo == null || rasterit.Count == 0) { linssiEhto.Nollaa(); linssiKesken = 0; return; }
            // Latausta ei arvioida heti lisäyksen jälkeen: Cesium rekisteröi uudet laatat vasta
            // seuraavilla kehyksillä, ja edistyminen näyttäisi valmiilta liian aikaisin.
            int kesken = 0;
            foreach (var r in rasterit.Values) if (!r.valmis && Time.unscaledTime - r.lisatty > 0.3f) kesken++;
            // Yhteinen valmiusehto (BUILD 16, Valmius.Tasaantunut; ennen 99,9 %). Uusi odotus, kun keskeneräisten määrä muuttuu.
            if (kesken != linssiKesken) { linssiEhto.Nollaa(); linssiKesken = kesken; }
            if (kesken == 0 || !Valmius.Tasaantunut(linssiEhto, pallo)) return;
            foreach (var p in rasterit)
                if (!p.Value.valmis && p.Value.kerros.enabled)
                {
                    p.Value.valmis = true;
                    KerrosValmis?.Invoke(p.Key);
                }
        }
        readonly ValmiusEhto linssiEhto = new ValmiusEhto();
        int linssiKesken;
    }
}
