using System.Collections.Generic;
using System.Globalization;
using System.Text;
using CesiumForUnity;
using UnityEngine;
using Valinta = Matkakirja.LiikeLaatatPaatos.Valinta;
using Este = Matkakirja.LiikeLaatatPaatos.Este;

namespace Matkakirja
{
    /// <summary>
    /// LIIKKEEN LAATTAVALINTA (löydös S10, Fablen päätös 26.9.2026, Natiiviseppä): laattojen tarkkuus liikkeessä SSE 32 ja
    /// levossa 16 ILMAN tilesetin uudelleenluontia. S10-mittaus (iPad Pro 13, proto-3d/lokit/S10-gpu-profilointi): SSE 32
    /// laski liikkeen p50:n 20 ms:sta 13 ms:iin, ja se oli ainoa selvä säästö.
    ///
    /// MIKSI VARJOKAMERA: Cesium3DTileset.maximumScreenSpaceErrorin asetin kutsuu RecreateTileset():iä (Cesium for Unity
    /// 1.25.1, Cesium3DTileset.cs:249), ja nativen TilesetOptionsiin ei pääse C#:sta. Cesium lukee valinnan näkymät joka
    /// kehys CesiumCameraManagerista (native CameraManager.cpp getAllCameras: Camera.main, jos useMainCamera, ja jokainen
    /// additionalCameras-kamera ILMAN enabled-ehtoa, sama kuin löydöksen 163 korjauksessa ElavaKerroksessa), ja näkymän
    /// koon se ottaa Camera.pixelWidth- ja pixelHeight-arvoista (unityCameraToViewState). Näyttövirhe on suoraan
    /// verrannollinen pikselikorkeuteen, joten kamera, jolla on sama paikka, asento, FOV, kuvasuhde ja near/far mutta
    /// puolikas pikselikorkeus, valitsee samat laatat kuin SSE 32 pääkameralla (<see cref="LiikeLaatatPaatos.Kerroin"/>).
    ///
    /// TOTEUTUS: varjokamera on pääkameran (PalloKierto) lapsi (paikka ja asento aina samat, myös kehyksen sisällä), pois
    /// päältä (ei piirrä), cullingMask 0, ja sen rect on pääkameran rect × kerroin (pixelRect puolittuu ilman
    /// RenderTexturea). Liikkeessä CesiumCameraManager.useMainCamera = false ja varjokamera additionalCamerasiin; levossa
    /// takaisin. Suoritusjärjestys −100: ennen Cesium3DTilesetin Updatea (0), joten vaihto koskee jo tätä kehystä.
    ///
    /// MILLOIN KARKEA (PalloKierto.KarkeaLiike): pelaajan veto, nipistys ja kierto (kun ele on ylittänyt napautuksen rajan
    /// ja näkymä liikkuu), heiton liuku ja kamera-ajot paitsi saapumisajo. EI koskaan: aloitusverho ja musta verho
    /// (Valmius.Verhossa), portti, lento (nappulan liike tai seuranta), saapumisajo (laskeutuminen), peitto tai pääkamera
    /// pois (elävä kerros, peitto). Este vaihtaa pääkameraan heti, jotta laatat eivät jää pyytämättä (löydökset 163, 171).
    /// Lepoon <see cref="LiikeLaatatPaatos.LepoViiveS"/> viimeisen karkean liikkeen jälkeen (hystereesi), eli vielä
    /// Ruudunpaivityksen TÄYDESSÄ tilassa; vaihto herättää pallon (PallonLepo.Valmistui), ja tarkentuvien laattojen lataus
    /// pitää sen hereillä (latausaste).
    ///
    /// Komento `maasto liike 32|16|pois|tila` (Komennot.cs): 16 = varjokamera täysikokoisena (sama valinta, mekanismin
    /// kontrolli), pois = aina pääkamera. Tila näkyy KehysMittarin rivillä ("valinta").
    /// </summary>
    [DefaultExecutionOrder(-100)]
    public sealed class LiikeLaatat : MonoBehaviour
    {
        /// <summary>Liikkeen SSE-vastine (0 = pois, aina pääkamera). Komento `maasto liike`.</summary>
        public static float Sse = LiikeLaatatPaatos.OletusSse;

        public static LiikeLaatat Instanssi { get; private set; }

        /// <summary>Tämän kehyksen valinta (KehysMittari).</summary>
        public static Valinta Nyt => Instanssi != null ? Instanssi.valinta : Valinta.Paa;

        /// <summary>Vaihtojen määrä käynnistyksestä (loki, `maasto liike tila`).</summary>
        public static int Vaihtoja { get; private set; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Instanssi = null; Sse = LiikeLaatatPaatos.OletusSse; Vaihtoja = 0; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (Instanssi != null) return;
            var go = new GameObject("LiikeLaatat");
            DontDestroyOnLoad(go);
            go.AddComponent<LiikeLaatat>();
        }

        PalloKierto kierto;
        Camera paa, varjo;
        Nappula nappula;
        Cesium3DTileset pallo;
        /// <summary>Hallinnat, joihin varjo on kiinnitetty, ja niiden useMainCamera ennen kiinnitystä.</summary>
        readonly List<(CesiumCameraManager hallinta, bool paaKaytossa)> kiinnitetyt = new List<(CesiumCameraManager, bool)>();
        Valinta valinta = Valinta.Paa;
        Este este = Este.Kamera;
        float viimeKarkea = -10f;
        float kerroin = 1f;
        string syy = "alku";

        void Awake()
        {
            Instanssi = this;
            // Vakiotarkkuus (LiikeLaatatPaatos.VakioSse): kohtauksen pohja-SSE on 20 (Rakennus) eikä liikkeen varjokameraa
            // käytetä. Lippu 0 = vanha 16/32-vaihto (pohja 16 ajossa: luo tilesetin uudelleen kerran käynnistyksessä).
            if (PlayerPrefs.GetInt(LiikeLaatatPaatos.VakioAvain, 1) != 0) Sse = 0f;
            else
            {
                Sse = LiikeLaatatPaatos.OletusSse;
                var t = FindAnyObjectByType<Cesium3DTileset>();
                if (t != null && Mathf.Abs(t.maximumScreenSpaceError - 16f) > 1e-3f) t.maximumScreenSpaceError = 16f;
            }
        }

        void OnDestroy()
        {
            Irrota();
            if (varjo != null) Destroy(varjo.gameObject);
            if (Instanssi == this) Instanssi = null;
        }

        void OnDisable()
        {
            if (valinta == Valinta.Varjo) Vaihda(Valinta.Paa, "pois käytöstä");
        }

        void Etsi()
        {
            if (kierto == null)
            {
                kierto = FindAnyObjectByType<PalloKierto>();
                paa = kierto != null ? kierto.GetComponent<Camera>() : null;
            }
            if (nappula == null) nappula = FindAnyObjectByType<Nappula>();
            if (pallo == null) pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
        }

        void Update()
        {
            if (kierto == null || paa == null || Time.frameCount % 30 == 0) Etsi();
            float nyt = Time.unscaledTime;
            este = Esta();
            bool karkea = este == Este.Ei && kierto.KarkeaLiike;
            if (karkea) viimeKarkea = nyt;
            var uusi = LiikeLaatatPaatos.Seuraava(valinta, karkea, este, nyt, viimeKarkea);
            if (uusi == Valinta.Varjo)
            {
                if (!VarmistaVarjo()) uusi = Valinta.Paa;
                else PaivitaVarjo();
            }
            if (uusi != valinta)
                Vaihda(uusi, uusi == Valinta.Varjo ? "liike" : este != Este.Ei ? LiikeLaatatPaatos.Nimi(este)
                    : "lepo " + LiikeLaatatPaatos.LepoViiveS.ToString("0.##", CultureInfo.InvariantCulture) + " s");
            else if (valinta == Valinta.Varjo && Time.frameCount % 60 == 0) Kiinnita();   // uudet tilesetit
        }

        /// <summary>Ensimmäinen este karkealle valinnalle (Ei = saa käyttää).</summary>
        Este Esta()
        {
            if (!(Sse > 0f)) return Este.Pois;
            if (kierto == null || paa == null) return Este.Kamera;
            if (Aloitusverho.Nakyvissa || Valmius.Verhossa) return Este.Verho;
            if (kierto.Peitetty) return Este.Peitto;
            // Pääkamera pois (peitto tai elävän kerroksen KERROS): Cesiumin valinta pysyy niiden omalla logiikalla.
            if (!paa.isActiveAndEnabled) return Este.Kamera;
            if (kierto.Portissa || PalloKierto.PorttiSumea) return Este.Portti;
            if (kierto.Seurataan || (nappula != null && nappula.Liikkeessa)) return Este.Lento;
            if (kierto.Saapumassa) return Este.Saapuminen;
            return Este.Ei;
        }

        bool VarmistaVarjo()
        {
            if (paa == null) return false;
            if (varjo != null && varjo.transform.parent == paa.transform) return true;
            if (varjo != null) Destroy(varjo.gameObject);
            var go = new GameObject("LiikeLaatatKamera");
            go.transform.SetParent(paa.transform, false);
            go.transform.localPosition = Vector3.zero;
            go.transform.localRotation = Quaternion.identity;
            go.transform.localScale = Vector3.one;
            varjo = go.AddComponent<Camera>();
            // Ei piirrä koskaan: pois päältä, eikä sillä ole mitään piirrettävää. Cesium lukee vain paikan, projektion ja koon.
            varjo.enabled = false;
            varjo.cullingMask = 0;
            varjo.clearFlags = CameraClearFlags.Nothing;
            varjo.depth = paa.depth - 100;
            varjo.targetTexture = null;
            return true;
        }

        /// <summary>Projektio ja koko pääkamerasta joka kehys (FOV, near/far, kuvasuhde; rect × kerroin).</summary>
        void PaivitaVarjo()
        {
            float pohja = pallo != null ? pallo.maximumScreenSpaceError : 16f;
            kerroin = LiikeLaatatPaatos.Kerroin(pohja, Sse);
            var r = paa.rect;
            var uusi = new Rect(r.x, r.y, r.width * kerroin, r.height * kerroin);
            if (varjo.rect != uusi) varjo.rect = uusi;
            if (varjo.orthographic != paa.orthographic) varjo.orthographic = paa.orthographic;
            if (varjo.orthographicSize != paa.orthographicSize) varjo.orthographicSize = paa.orthographicSize;
            if (varjo.fieldOfView != paa.fieldOfView) varjo.fieldOfView = paa.fieldOfView;
            if (varjo.nearClipPlane != paa.nearClipPlane) varjo.nearClipPlane = paa.nearClipPlane;
            if (varjo.farClipPlane != paa.farClipPlane) varjo.farClipPlane = paa.farClipPlane;
            // Kuvasuhde suoraan pääkamerasta (rect skaalautuu molemmista suunnista samalla kertoimella, mutta pyöristys
            // kokonaisiin pikseleihin ei saa muuttaa vaakakulmaa).
            float aspekti = paa.aspect;
            if (varjo.aspect != aspekti) varjo.aspect = aspekti;
        }

        void Vaihda(Valinta uusi, string miksi)
        {
            if (uusi == Valinta.Varjo) Kiinnita();
            else Irrota();
            valinta = uusi;
            syy = miksi;
            Vaihtoja++;
            // Valinta muuttui: pallo hereille (laatat vaihtuvat; tarkentuvien lataus pitää sen hereillä latausasteella).
            PallonLepo.Valmistui("liikevalinta");
            if (Vaihtoja <= 30 || Vaihtoja % 100 == 0)
                Debug.Log("MATKAKIRJA liikevalinta: " + LiikeLaatatPaatos.Nimi(uusi) + " (" + miksi + "), " + Koot() + " #" + Vaihtoja);
        }

        /// <summary>Varjo kaikkien tilesettien kamerahallintaan, pääkamera pois valinnasta.</summary>
        void Kiinnita()
        {
            if (varjo == null) return;
            foreach (var t in FindObjectsByType<Cesium3DTileset>(FindObjectsSortMode.None))
            {
                var h = CesiumCameraManager.GetOrCreate(t.gameObject);
                if (h == null) continue;
                bool loytyi = false;
                foreach (var k in kiinnitetyt) if (k.hallinta == h) { loytyi = true; break; }
                if (!loytyi) kiinnitetyt.Add((h, h.useMainCamera));
                if (h.useMainCamera) h.useMainCamera = false;
                if (!h.additionalCameras.Contains(varjo)) h.additionalCameras.Add(varjo);
            }
        }

        /// <summary>Pääkamera takaisin valintaan, varjo pois.</summary>
        void Irrota()
        {
            foreach (var k in kiinnitetyt)
            {
                if (k.hallinta == null) continue;
                k.hallinta.useMainCamera = k.paaKaytossa;
                if (varjo != null) k.hallinta.additionalCameras.Remove(varjo);
            }
            kiinnitetyt.Clear();
        }

        string Koot()
        {
            var ic = CultureInfo.InvariantCulture;
            return "SSE " + (Sse > 0f ? Sse.ToString("0.##", ic) : "pois") + ", kerroin " + kerroin.ToString("0.###", ic)
                   + ", varjo " + (varjo != null ? varjo.pixelWidth + "×" + varjo.pixelHeight : "-")
                   + " px, pää " + (paa != null ? paa.pixelWidth + "×" + paa.pixelHeight : "-") + " px";
        }

        /// <summary>Tila komennolle `maasto liike tila`.</summary>
        public static string Kuvaus()
        {
            var i = Instanssi;
            if (i == null) return "ei käynnissä";
            var sb = new StringBuilder();
            sb.Append("valinta ").Append(LiikeLaatatPaatos.Nimi(i.valinta)).Append(" (").Append(i.syy).Append("), este ")
              .Append(LiikeLaatatPaatos.Nimi(i.este)).Append(", ").Append(i.Koot()).Append(", pohja-SSE ")
              .Append(i.pallo != null ? i.pallo.maximumScreenSpaceError.ToString("0.##", CultureInfo.InvariantCulture) : "-")
              .Append(", hallinnat ").Append(i.kiinnitetyt.Count).Append(", vaihtoja ").Append(Vaihtoja);
            return sb.ToString();
        }
    }
}
