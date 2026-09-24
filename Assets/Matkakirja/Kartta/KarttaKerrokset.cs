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
    /// "napakannet", "varitaso", "aariviiva". Linssin raster-kerrokset (enintään kaksi) piirtyvät pohjan päälle
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

        /// <summary>Linssin rasterin näkyvä alue on ladattu (avain).</summary>
        public event Action<string> KerrosValmis;
        /// <summary>Linssin rasterin lataus epäonnistui (avain).</summary>
        public event Action<string> KerrosEpaonnistui;

        class Rasteri { public CesiumUrlTemplateRasterOverlay kerros; public bool valmis; public float lisatty; }
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

        void Epaonnistui(CesiumRasterOverlayLoadFailureDetails d)
        {
            foreach (var p in rasterit)
                if (p.Value.kerros == d.overlay)
                {
                    Debug.LogWarning($"MATKAKIRJA kerros {p.Key} epäonnistui: {d.message}");
                    KerrosEpaonnistui?.Invoke(p.Key);
                    return;
                }
        }

        /// <summary>
        /// Sisäisen kerroksen näkyvyys. "laatat" pois = pohja poistetaan Cesiumista;
        /// palautus lukee laatat Cesiumin levyvälimuistista (ei verkkoa).
        /// </summary>
        public void Nakyvyys(string kerros, bool nakyy)
        {
            switch (kerros)
            {
                case "laatat":
                    if (pohja != null) pohja.enabled = nakyy;
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
                    // Web: maan kehä pois linssin ajaksi samalla portilla kuin kaupunkipisteet
                    // (js/pallolauta/lauta.js linssiPaalla; LinssiOhjain.Pelikerrokset ja maatila piilottavat kaupungit).
                    if (maaraja != null) maaraja.Linssit(!nakyy);
                    break;
                case "aariviiva": if (maaraja != null) maaraja.Nakyvat(nakyy); break;
                case "nimiot": if (merkit != null) merkit.nimiotNakyvat = nakyy; break;
                case "reitit": if (reitit != null) reitit.Nakyvat(nakyy); break;
                case "napakannet": if (napakannet != null) napakannet.Nakyvat(nakyy); break;
                case "nappula": if (nappula != null) nappula.Nakyvat(nakyy); break;
                case "pisteet": if (pisteet != null) pisteet.Nakyvat(nakyy); break;
                case "valot": { var av = FindAnyObjectByType<AiheValot>(); if (av != null) av.Nakyvat(nakyy); break; }
                default: Debug.LogWarning("MATKAKIRJA kerrokset: tuntematon kerros " + kerros); break;
            }
        }

        /// <summary>
        /// Linssin raster-kerros pohjan päälle. Palauttaa avaimen (sama kuin annettu).
        /// Alfa: nyt vain 0 (piilossa) tai 1 (näkyvissä); välimuoto on tulossa.
        /// </summary>
        public string LisaaRasteri(string avain, string url, CesiumUrlTemplateRasterOverlayProjection projektio,
                                   int min, int max, float alfa)
        {
            PoistaRasteri(avain);
            // Väritaso vapauttaa paikan 2 linssin ajaksi (Cesiumissa kolme raster-paikkaa).
            if (varitaso != null) varitaso.Linssit(true);
            var kaytetyt = new HashSet<string>();
            foreach (var r in rasterit.Values) kaytetyt.Add(r.kerros.materialKey);
            if (silea != null) kaytetyt.Add(silea.materialKey);
            if (sentinel != null) kaytetyt.Add(sentinel.materialKey);
            string avainCesium = !kaytetyt.Contains("1") ? "1" : !kaytetyt.Contains("2") ? "2" : null;
            if (avainCesium == null && sentinel != null)
            {
                // Satelliittilento (oletus build 10) vie molemmat paikat: linssi saa Sentinelin paikan 2,
                // lento jatkuu Blue Marblella.
                sentinel.enabled = false;
                Destroy(sentinel);
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
            var k = pallo.gameObject.AddComponent<CesiumUrlTemplateRasterOverlay>();
            k.materialKey = avainCesium;
            k.templateUrl = Laattapalvelin.Paikallinen(url);
            k.projection = projektio;
            k.minimumLevel = min;
            k.maximumLevel = max;
            k.tileWidth = 256;
            k.tileHeight = 256;
            k.enabled = alfa > 0f;
            rasterit[avain] = new Rasteri { kerros = k, lisatty = Time.unscaledTime };
            PaivitaNavat();
            return avain;
        }

        /// <summary>
        /// Karttasepän sileä 23a-sarja: sama pohja ilman poltettua viivatasoa (ei teitä, rajoja eikä kaupunkipisteitä;
        /// joet, vesiviivoitus ja syvyyskäyrät jäävät). Z0–Z8 kuten pohja.
        /// </summary>
        public const string SileaUrl =
            "https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-23a-pohja-20260923arajaton/{z}/{x}/{reverseY}.jpg";

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
            Shader.SetGlobalFloat(S2MeriKynnysId, sentinel != null ? S2MeriKynnys : 0f);
            bool vara = satelliittiLento && varaKartta != null && varaKarttaAvain == SatelliittiAvain();
            if (vara) Shader.SetGlobalTexture(LentoVaraKarttaId, varaKartta);
            Shader.SetGlobalFloat(LentoVaraId, vara ? 1f : 0f);
        }

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
        const string SatelliittiJuuri = "https://media.matkakirja.app/julisteet/pallo/satelliitti/";
        static HashSet<long> sentinelZ8;
        bool sentinelHaettu;

        static CesiumUrlTemplateRasterOverlay Kerros(GameObject go, string avain, string url, int max)
        {
            var k = go.AddComponent<CesiumUrlTemplateRasterOverlay>();
            k.materialKey = avain;
            k.templateUrl = Laattapalvelin.Paikallinen(url);
            k.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            k.minimumLevel = 0;
            k.maximumLevel = max;
            k.tileWidth = 256;
            k.tileHeight = 256;
            return k;
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

        /// <summary>
        /// LENNON KARTTA (omistaja 24.9.2026 klo 13.4x, Fablen päätös): lennon ajaksi sileä sarja pohjan päälle
        /// Cesiumin raster-paikkaan 1. Pohja latautuu sen alla, joten paluu perillä on välitön (tiet ja rajat
        /// palaavat samasta välimuistista). Väritaso (paikka 2) jää ennalleen. Ohitetaan, jos linssi käyttää
        /// raster-paikkoja tai pohja on pois (tyhjän arkin linssit). Offline-alueella sarjaa ei ole: laatta jää
        /// lataamatta ja pohja näkyy.
        /// </summary>
        public void LentoPohja(bool paalle)
        {
            if (!paalle)
            {
                // Perillä: lennon jono pois (näkyvä kartta saa paikat takaisin).
                LennonEsilataus?.Peru();
                LennonEsilataus = null;
                if (silea != null) { silea.enabled = false; Destroy(silea); silea = null; }
                if (sentinel != null)
                {
                    sentinel.enabled = false;
                    Destroy(sentinel);
                    sentinel = null;
                    if (varitaso != null && rasterit.Count == 0) varitaso.Linssit(false);
                }
                satelliittiLento = false;
                PaivitaLennonVarjostin();
                return;
            }
            if (silea != null || rasterit.Count > 0 || pallo == null || pohja == null || !pohja.enabled) return;
            string versio = SatelliittiVersio;
            if (string.IsNullOrEmpty(versio))
            {
                silea = Kerros(pallo.gameObject, "1", SileaUrl, 8);
                return;
            }
            // Satelliitti: Blue Marble paikkaan 1 (Z0–Z7; Cesium venyttää Z7:n syvemmälle), Sentinel paikkaan 2
            // (väritaso väistyy lennon ajaksi kuten linssille). Cesium Unityssä {reverseY} = XYZ-rivi kuten pohjassa.
            silea = Kerros(pallo.gameObject, "1", SatelliittiJuuri + versio + "/" + SatelliittiMeri + "/{z}/{x}/{reverseY}.jpg", 7);
            string s2 = SentinelKaytto(versio);
            if (varitaso != null) varitaso.Linssit(true);
            sentinel = Kerros(pallo.gameObject, "2", s2 + "{z}/{x}/{reverseY}.jpg", 11);
            satelliittiLento = true;
            VarmistaVarakartta();
            PaivitaLennonVarjostin();
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
            LennonEsilataus = e;
            Debug.Log($"MATKAKIRJA lennon pinta: esilataus {joukko.Count} laattaa");
            if (!string.IsNullOrEmpty(versio))
            {
                StartCoroutine(EsilataaSentinel(versio, lat0, lon0, lat1, lon1, e));
                VarmistaVarakartta();   // valmiina ennen pinnan vaihtoa (16 pientä laattaa)
            }
            return e;
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
            if (r.kerros != null) { r.kerros.enabled = false; Destroy(r.kerros); }
            rasterit.Remove(avain);
            if (rasterit.Count == 0 && varitaso != null) varitaso.Linssit(false);
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
            bool reliefi = rasterit.TryGetValue(Matkakirja.Linssit.Topografia.Kerros, out var r)
                           && r.kerros != null && r.kerros.enabled && (pohja == null || !pohja.enabled);
            napakannet.Reliefi(reliefi);
        }

        void Update()
        {
            if (pallo == null || rasterit.Count == 0) return;
            // Latausta ei arvioida heti lisäyksen jälkeen: Cesium rekisteröi uudet laatat vasta
            // seuraavilla kehyksillä, ja edistyminen näyttäisi valmiilta liian aikaisin.
            bool kesken = false;
            foreach (var r in rasterit.Values) kesken |= !r.valmis && Time.unscaledTime - r.lisatty > 0.3f;
            if (!kesken || pallo.ComputeLoadProgress() < 99.9f) return;
            foreach (var p in rasterit)
                if (!p.Value.valmis && p.Value.kerros.enabled)
                {
                    p.Value.valmis = true;
                    KerrosValmis?.Invoke(p.Key);
                }
        }
    }
}
