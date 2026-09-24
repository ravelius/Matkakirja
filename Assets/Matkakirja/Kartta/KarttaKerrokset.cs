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
            // Korkeuskerroin (löydös 29, koelippu): oletus 1 ja maan keskipiste varjostimelle; komento "korkeus <k>".
            KorkeusKerroin.Aseta(1f, GetComponent<CesiumGeoreference>());
            Instanssi = this;
            CesiumRasterOverlay.OnCesiumRasterOverlayLoadFailure += Epaonnistui;
        }

        void Start() => StartCoroutine(PiilotaRuutukrediitit());

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
        public static string SatelliittiVersio = null;
        /// <summary>
        /// Karttasepän sarjat 2026-09-24 (omistaja vertaa, hävinnyt poistetaan): meri "bmng" (topo, tumma meri) tai
        /// "bmng-bathy" (sininen meri); kaupungit "s2" (EOX sovitettuna Blue Marbleen) tai "s2-alkup" (muuttamaton).
        /// Kattavuus (s2/laatat.json) on molemmissa sama.
        /// </summary>
        public static string SatelliittiMeri = "bmng", SatelliittiS2 = "s2";
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
            if (!string.IsNullOrEmpty(versio)) StartCoroutine(EsilataaSentinel(versio, lat0, lon0, lat1, lon1, e));
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
