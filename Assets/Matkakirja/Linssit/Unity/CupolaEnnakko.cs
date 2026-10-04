// CUPOLAN ENNAKKOKAMERA (iPad 75ddd638, 4.10.2026: kylmä ensiavaus jäi 4 s:n kattoon karkeana, lataus 10 %; lämpimät avaukset
// häivyttivät 2,1–2,4 s:ssa tarkkoina). Cesium valitsee laatat vain kameroille, joten Cupolan näkymä alkoi latautua vasta
// napautuksesta. Linssin kaukonäkymässä piirtämätön kamera (pois päältä, cullingMask 0) pidetään asennossa, johon Cupola juuri
// nyt avautuisi (AstronauttiLinssi.CupolanEnnakko), kaikkien tilesettien CesiumCameraManager.additionalCamerasissa (native
// getAllCameras ei vaadi enabled-tilaa; sama kaava kuin Nappula.Aloitusrata.EnnakkoAsentoon). Kyydissä ja linssin ulkopuolella
// pois. Asento päivitetään kerran sekunnissa (ISS 7,7 km/s, näkymä ~2 000 km). A/B `ui linssi astro ennakko 0|1`.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Iss;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class CupolaEnnakko : MonoBehaviour
    {
        /// <summary>A/B `ui linssi astro ennakko 0|1` (oletus päällä).</summary>
        public static bool Kaytossa = true;
        /// <summary>Ennakkokameran kenttä Cupolan omaan nähden (aluksen liike päivitysten välillä).</summary>
        const float KenttaVara = 1.15f;

        AstronauttiKerros kerros;
        CesiumGeoreference georeferenssi;
        Camera paa, ennakko;
        readonly List<CesiumCameraManager> hallinnat = new List<CesiumCameraManager>();
        float seuraava;

        /// <summary>Viimeisin tila (tilakomento): "pois", "odottaa" tai asento.</summary>
        public static string Tila { get; private set; } = "pois";

        public static CupolaEnnakko Luo(AstronauttiKerros kerros, CesiumGeoreference g, Camera paa)
        {
            var e = kerros.gameObject.AddComponent<CupolaEnnakko>();
            e.kerros = kerros; e.georeferenssi = g; e.paa = paa;
            return e;
        }

        /// <summary>Verkosta haetut tavut (Laattapalvelin.VerkostaTavuja) ennakkojakson alussa; −1 = ei jaksoa vielä.</summary>
        public static long AlkuTavut { get; private set; } = -1;

        // Jakso = kaukonäkymä, jossa ennakko olisi päällä (myös A/B 0: sama mittaus vertailuun). Kehysajat linssin liikkeen
        // hidastumisen mittaamiseen (Päätoimittajan ehto 1: linssin avaus tai liike ei hidastu).
        bool jaksossa;
        float jaksoAlku, pisinMs;
        int kehyksia, hitaita;
        double summaMs;

        void Update()
        {
            if (jaksossa)
            {
                float ms = Time.unscaledDeltaTime * 1000f;
                kehyksia++; summaMs += ms; pisinMs = Mathf.Max(pisinMs, ms); if (ms > 50f) hitaita++;
            }
            if (Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + 1f;
            var l = kerros != null ? kerros.Linssi : null;
            var a = default(Matkakirja.Linssit.Kuvakulma);
            bool kauko = l != null && paa != null && georeferenssi != null && l.CupolanEnnakko(out a);
            if (kauko && !jaksossa) { jaksossa = true; jaksoAlku = Time.unscaledTime; kehyksia = hitaita = 0; summaMs = 0; pisinMs = 0; AlkuTavut = Laattapalvelin.VerkostaTavuja; }
            else if (!kauko && jaksossa) { jaksossa = false; Kirjaa(); }
            if (!Kaytossa || !kauko) { Irrota(); Tila = Kaytossa ? "odottaa" : "pois"; return; }
            Asentoon(a);
            Tila = $"asento {a}";
        }

        void Kirjaa()
        {
            double mt = (Laattapalvelin.VerkostaTavuja - AlkuTavut) / 1048576.0;
            Debug.Log($"MATKAKIRJA linssit: cupolan ennakko {(Kaytossa ? "päällä" : "pois")}: jakso {Time.unscaledTime - jaksoAlku:0.0} s, " +
                $"kehyksiä {kehyksia}, keskim. {(kehyksia > 0 ? summaMs / kehyksia : 0):0.0} ms, pisin {pisinMs:0} ms, yli 50 ms {hitaita}, verkosta {mt:0.0} Mt");
        }

        void Asentoon(in Matkakirja.Linssit.Kuvakulma a)
        {
            if (ennakko == null)
            {
                var go = new GameObject("Cupolan ennakkokamera");
                go.transform.SetParent(transform, false);
                ennakko = go.AddComponent<Camera>();
                ennakko.enabled = false;
                ennakko.cullingMask = 0;
                ennakko.clearFlags = CameraClearFlags.Nothing;
            }
            if (hallinnat.Count == 0)
                foreach (var t in FindObjectsByType<Cesium3DTileset>(FindObjectsSortMode.None))
                {
                    var h = CesiumCameraManager.GetOrCreate(t.gameObject);
                    if (h != null) hallinnat.Add(h);
                }
            foreach (var h in hallinnat)
                if (h != null && !h.additionalCameras.Contains(ennakko)) h.additionalCameras.Add(ennakko);
            // Asento kuten PalloKierto.Kuvaa (katsepiste, etäisyys, kallistus ≤ 85°, suuntima): kamera katsoo katsepisteeseen.
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(a.Lon, a.Lat, a.KatseKorkeusM));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde);
            double3 pohjoinen = math.normalize(new double3(0, 0, 1) - ylos * ylos.z);
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(a.Suuntima), k = math.radians(math.clamp(a.Kallistus, 0, 85));
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            double3 silma = kohde + (ylos * math.cos(k) - eteen * math.sin(k)) * a.EtaisyysM;
            var gt = georeferenssi.transform;
            var p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(silma));
            var q = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(kohde));
            var yl = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(eteen * math.cos(k) + ylos * math.sin(k)));
            ennakko.transform.SetPositionAndRotation(p, Quaternion.LookRotation(q - p, yl));
            ennakko.rect = paa.rect;
            ennakko.fieldOfView = Mathf.Min(120f, (float)IssKuvakulma.IkkunanKentta * KenttaVara);
            ennakko.aspect = paa.aspect;
            ennakko.nearClipPlane = (float)math.max(50.0, a.EtaisyysM * 0.01);
            ennakko.farClipPlane = (float)(a.EtaisyysM + 2.0 * CesiumWgs84Ellipsoid.GetMaximumRadius());
        }

        void Irrota()
        {
            foreach (var h in hallinnat)
                if (h != null && ennakko != null) h.additionalCameras.Remove(ennakko);
            hallinnat.Clear();
        }

        void OnDisable() => Irrota();

        void OnDestroy()
        {
            Irrota();
            if (ennakko != null) Destroy(ennakko.gameObject);
        }
    }
}
