// KAUPUNKIKUVAN PARANNUKSET (omistaja ja Päätoimittaja 5.10.2026, juna 144; Siirtoseppä Linssisepän CesiumKaupunki-koukuilla).
// Vain Cesium-kaupunkinäkymän ajaksi (CesiumKaupunki.Avattu → Suljettu), joten pallo, linna ja muut linssit eivät muutu:
//  - terävyys: tilesetien maximumScreenSpaceError pienemmäksi (Google pysyy 16:ssa: muistikatto, Päätoimittaja 5.10. 19.0x; maasto 10, OSM 16) (asetin luo tilesetin uudelleen → vain Avattu-kutsussa),
//    anisotrooppinen suodatus (ForceEnable, raja 8–16) ja MSAA 4x (URP-assetti + kameran allowMSAA), palautus sulkiessa;
//  - korkeussumu ja ilmaperspektiivi: lineaarinen RenderSettings-sumu taivaan sävyyn (vain FOG_LINEAR säilyy buildissa, ks.
//    Aurinko.cs SUMUVARIANTIT), etäisyys kameran korkeuden mukaan; asetetaan joka ruutu Aurinko.LateUpdaten JÄLKEEN
//    (DefaultExecutionOrder), koska Aurinko kirjoittaa sumun itse; arvot tallennetaan ja palautetaan;
//  - taivas: kameran taustaväri (CesiumKaupunki.Taivas) ja sumu samaan horisonttisävyyn, yläosa hieman sinisempi ei mahdollinen
//    SolidColorilla → sumu hoitaa horisontin;
//  - URP Volume: oma globaali profiili (Neutral-tonemappaus kuten linnassa, hillitty bloom), ei SSAO:ta (URP:ssa renderer-
//    ominaisuus, maksaa iPadilla), ei tilt-shiftiä. Kameran jälkikäsittely päälle näkymän ajaksi.
// Googlen kuvasisältöä ei muuteta (vain suodatus, näytteistys ja sumu). A/B: Documents/kaupunki-kuva-pois.txt (tai Paalla = false) → alkuperäinen.
using CesiumForUnity;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiKuva
    {
        /// <summary>A/B: false = Linssisepän alkuperäinen kaupunkikuva (vaikuttaa seuraavaan avaukseen).</summary>
        public static bool Paalla = true;
        // Linssiseppä 5.10. 18.5x: SSE 8 + MSAA 4x nosti simun RSS:n (Google) 7,7 Gt:iin → Google 12. Viritys ilman käännöstä:
        // Documents/kaupunki-kuva-asetukset.txt "google 12 maasto 10 rakennus 16 msaa 4" (puuttuva arvo = oletus).
        public static float GoogleSse = 16f, MaastoSse = 10f, RakennusSse = 16f;
        public static int Msaa = 4;
        /// <summary>Sumun alku ja loppu kameran korkeuden kerrannaisina (vähintään AlkuMinM / LoppuMinM metriä).</summary>
        public const float AlkuKerroin = 6f, LoppuKerroin = 30f, AlkuMinM = 1200f, LoppuMinM = 6000f;

        static KaupunkiKuvaAjo ajo;
        static GameObject volyymiGo;
        static VolumeProfile profiili;
        // palautettavat
        static AnisotropicFiltering vanhaAniso;
        static int vanhaMsaa = -1;
        static bool vanhaAllowMsaa, vanhaJalki, tallennettu;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Rekisteroi()
        {
            CesiumKaupunki.Avattu -= Avattu; CesiumKaupunki.Avattu += Avattu;
            CesiumKaupunki.Suljettu -= Suljettu; CesiumKaupunki.Suljettu += Suljettu;
        }

        static void Avattu(CesiumKaupunki k)
        {
            // A/B ilman komentoa (LinssiOhjain on Linssisepän): Documents/kaupunki-kuva-pois.txt → alkuperäinen kuva.
            bool pois = System.IO.File.Exists(System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-kuva-pois.txt"));
            if (!Paalla || pois || k?.Kamera == null) { if (pois) Debug.Log("MATKAKIRJA kaupunki: kuva pois (A/B)"); return; }
            LueAsetukset();
            // Avattu laukeaa myös Google → Ion -vaihdon jälkeen: tilesetit ovat uusia, muut asetukset jo voimassa.
            Sse(k.Pinta, k.Kaytossa == CesiumKaupunki.Lahde.Google ? GoogleSse : MaastoSse);
            Sse(k.Rakennukset, RakennusSse);
            if (tallennettu) return;
            tallennettu = true;
            var kamera = k.Kamera;

            vanhaAniso = QualitySettings.anisotropicFiltering;
            QualitySettings.anisotropicFiltering = AnisotropicFiltering.ForceEnable;
            Texture.SetGlobalAnisotropicFilteringLimits(8, 16);

            if (Msaa > 1 && GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp)
            { vanhaMsaa = urp.msaaSampleCount; urp.msaaSampleCount = Msaa; }
            vanhaAllowMsaa = kamera.allowMSAA; kamera.allowMSAA = true;
            var lisa = kamera.GetUniversalAdditionalCameraData();
            if (lisa != null) { vanhaJalki = lisa.renderPostProcessing; lisa.renderPostProcessing = true; }

            LuoVolyymi();
            ajo = new GameObject("KaupunkiKuva").AddComponent<KaupunkiKuvaAjo>();
            ajo.Aloita(k);
            Debug.Log($"MATKAKIRJA kaupunki: kuva päällä (SSE {(k.Kaytossa == CesiumKaupunki.Lahde.Google ? GoogleSse : MaastoSse)}/{RakennusSse}, MSAA {Msaa}x, aniso 8–16, sumu, Neutral)");
        }

        static void Suljettu(CesiumKaupunki k)
        {
            if (!tallennettu) return;
            tallennettu = false;
            GoogleSse = 16f; MaastoSse = 10f; RakennusSse = 16f; Msaa = 4; // asetustiedosto luetaan uudelleen seuraavassa avauksessa
            if (ajo != null) { ajo.Lopeta(); Object.Destroy(ajo.gameObject); ajo = null; }
            QualitySettings.anisotropicFiltering = vanhaAniso;
            Texture.SetGlobalAnisotropicFilteringLimits(-1, -1);
            if (vanhaMsaa > 0 && GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) urp.msaaSampleCount = vanhaMsaa;
            vanhaMsaa = -1;
            if (k?.Kamera != null)
            {
                k.Kamera.allowMSAA = vanhaAllowMsaa;
                var lisa = k.Kamera.GetUniversalAdditionalCameraData();
                if (lisa != null) lisa.renderPostProcessing = vanhaJalki;
            }
            if (volyymiGo != null) Object.Destroy(volyymiGo);
            if (profiili != null) Object.Destroy(profiili);
            volyymiGo = null; profiili = null;
            Debug.Log("MATKAKIRJA kaupunki: kuva palautettu");
        }

        static void LueAsetukset()
        {
            try
            {
                var polku = System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-kuva-asetukset.txt");
                if (!System.IO.File.Exists(polku)) return;
                var o = System.IO.File.ReadAllText(polku).Split((char[])null, System.StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i + 1 < o.Length; i += 2)
                {
                    if (!float.TryParse(o[i + 1], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v)) continue;
                    switch (o[i])
                    {
                        case "google": GoogleSse = v; break;
                        case "maasto": MaastoSse = v; break;
                        case "rakennus": RakennusSse = v; break;
                        case "msaa": Msaa = (int)v; break;
                    }
                }
            }
            catch (System.Exception) { }
        }

        static void Sse(Cesium3DTileset t, float sse)
        {
            if (t != null && t.maximumScreenSpaceError > sse) t.maximumScreenSpaceError = sse;
        }

        static void LuoVolyymi()
        {
            volyymiGo = new GameObject("KaupunkiKuva Volume");
            var v = volyymiGo.AddComponent<Volume>();
            v.isGlobal = true;
            v.priority = 60;
            profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            profiili.name = "KaupunkiKuvaProfiili";
            var savy = profiili.Add<Tonemapping>(true);
            savy.mode.Override(TonemappingMode.Neutral); // sama variantti kuin linnassa (Filmipino.asset) → säilyy buildissa
            var bloom = profiili.Add<Bloom>(true);
            bloom.threshold.Override(1.1f);
            bloom.intensity.Override(0.2f);
            bloom.scatter.Override(0.6f);
            var varit = profiili.Add<ColorAdjustments>(true);
            varit.contrast.Override(6f);
            varit.saturation.Override(4f);
            v.profile = profiili;
        }
    }

    /// <summary>Joka ruutu Aurinko.LateUpdaten jälkeen: korkeussumu taivaan sävyyn. Palauttaa sumun sulkiessa.</summary>
    [DefaultExecutionOrder(5000)]
    public sealed class KaupunkiKuvaAjo : MonoBehaviour
    {
        CesiumKaupunki kaupunki;
        bool vanhaSumu; FogMode vanhaMoodi; Color vanhaVari; float vanhaAlku, vanhaLoppu;

        public void Aloita(CesiumKaupunki k)
        {
            kaupunki = k;
            vanhaSumu = RenderSettings.fog; vanhaMoodi = RenderSettings.fogMode; vanhaVari = RenderSettings.fogColor;
            vanhaAlku = RenderSettings.fogStartDistance; vanhaLoppu = RenderSettings.fogEndDistance;
        }

        public void Lopeta()
        {
            RenderSettings.fog = vanhaSumu; RenderSettings.fogMode = vanhaMoodi; RenderSettings.fogColor = vanhaVari;
            RenderSettings.fogStartDistance = vanhaAlku; RenderSettings.fogEndDistance = vanhaLoppu;
        }

        void LateUpdate()
        {
            var kamera = kaupunki?.Kamera;
            if (kamera == null) return;
            var georef = kaupunki.Georef;
            float mitta = georef != null ? georef.transform.lossyScale.x : 1f;
            float korkeusM = georef != null ? Mathf.Max(30f, (kamera.transform.position.y - georef.transform.position.y) / Mathf.Max(1e-6f, mitta)) : 300f;
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogColor = kamera.backgroundColor;
            RenderSettings.fogStartDistance = Mathf.Max(KaupunkiKuva.AlkuMinM, korkeusM * KaupunkiKuva.AlkuKerroin) * mitta;
            RenderSettings.fogEndDistance = Mathf.Max(KaupunkiKuva.LoppuMinM, korkeusM * KaupunkiKuva.LoppuKerroin) * mitta;
        }
    }
}
