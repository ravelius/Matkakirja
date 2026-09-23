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
    /// "napakannet". Linssin raster-kerrokset (enintään kaksi) piirtyvät pohjan päälle
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
                case "laatat": if (pohja != null) pohja.enabled = nakyy; break;
                case "maasto":
                    if (pallo != null)
                        pallo.tilesetSource = nakyy ? CesiumDataSource.FromUrl : CesiumDataSource.FromEllipsoid;
                    break;
                case "kaupungit": if (merkit != null) merkit.merkitNakyvat = nakyy; break;
                case "nimiot": if (merkit != null) merkit.nimiotNakyvat = nakyy; break;
                case "reitit": if (reitit != null) reitit.Nakyvat(nakyy); break;
                case "napakannet": if (napakannet != null) napakannet.Nakyvat(nakyy); break;
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
            var kaytetyt = new HashSet<string>();
            foreach (var r in rasterit.Values) kaytetyt.Add(r.kerros.materialKey);
            string avainCesium = !kaytetyt.Contains("1") ? "1" : !kaytetyt.Contains("2") ? "2" : null;
            if (avainCesium == null)
            {
                Debug.LogWarning("MATKAKIRJA kerrokset: enintään kaksi linssikerrosta kerrallaan");
                KerrosEpaonnistui?.Invoke(avain);
                return null;
            }
            var k = pallo.gameObject.AddComponent<CesiumUrlTemplateRasterOverlay>();
            k.materialKey = avainCesium;
            k.templateUrl = url;
            k.projection = projektio;
            k.minimumLevel = min;
            k.maximumLevel = max;
            k.tileWidth = 256;
            k.tileHeight = 256;
            k.enabled = alfa > 0f;
            rasterit[avain] = new Rasteri { kerros = k, lisatty = Time.unscaledTime };
            return avain;
        }

        public void PoistaRasteri(string avain)
        {
            if (!rasterit.TryGetValue(avain, out var r)) return;
            if (r.kerros != null) Destroy(r.kerros);
            rasterit.Remove(avain);
        }

        public void Alfa(string avain, float alfa)
        {
            if (rasterit.TryGetValue(avain, out var r)) r.kerros.enabled = alfa > 0f;
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
