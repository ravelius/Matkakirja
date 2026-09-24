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

        CesiumUrlTemplateRasterOverlay silea;

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
                if (silea != null) { silea.enabled = false; Destroy(silea); silea = null; }
                return;
            }
            if (silea != null || rasterit.Count > 0 || pallo == null || pohja == null || !pohja.enabled) return;
            silea = pallo.gameObject.AddComponent<CesiumUrlTemplateRasterOverlay>();
            silea.materialKey = "1";
            silea.templateUrl = Laattapalvelin.Paikallinen(SileaUrl);
            silea.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            silea.minimumLevel = 0;
            silea.maximumLevel = 8;
            silea.tileWidth = 256;
            silea.tileHeight = 256;
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
