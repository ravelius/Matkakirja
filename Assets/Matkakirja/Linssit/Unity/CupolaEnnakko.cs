// CUPOLAN ENNAKKO (iPad 75ddd638 ja 36a05beb, 4.10.2026: kylmä ensiavaus jäi 4 s:n kattoon karkeana; lämpimät avaukset
// häivyttivät 2,0–2,4 s:ssa tarkkoina). Kaksi osaa linssin kaukonäkymässä, asennossa johon Cupola juuri nyt avautuisi
// (AstronauttiLinssi.CupolanEnnakko):
//   1) Piirtämätön kamera (pois päältä, cullingMask 0) kaikkien tilesettien CesiumCameraManager.additionalCamerasissa (native
//      getAllCameras ei vaadi enabled-tilaa; kaava Nappula.Aloitusrata.EnnakkoAsentoon): maasto- ja geometrialaatat valmiiksi.
//   2) Rasteriesihaku (juurisyy, iPad 36a05beb: kamera yksin ei auttanut, koska kyydin BMNG- ja S2-kerrokset lisätään vasta
//      Cupolaan tultaessa ja niiden laatat tulivat verkosta): CupolanLaatat laskee näkymän laatat ja Laattapalvelin.Esilataa
//      hakee ne levylle. Esilataus odottaa näkyvän kartan jonon tyhjenemistä, joten linssin avaus ja liike eivät hidastu
//      (Päätoimittajan ehto 1); sama kaikilla verkoilla (Raamattu #3938). Uusi haku, kun asento on siirtynyt ≥ 1°; jakson
//      yläraja EsihakuKattoMt. Cupolaan tultaessa kesken jäänyt esihaku perutaan (Cesium hakee loput itse).
// Kyydissä ja linssin ulkopuolella pois. Asento päivitetään kerran sekunnissa. A/B `ui linssi astro ennakko 0|1`.
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
        /// <summary>Uusi esihaku, kun Cupolan katsepiste on siirtynyt vähintään tämän (°; ISS ~1° / 15 s).</summary>
        public const double EsihakuSiirtymaAst = 1;
        /// <summary>Kaukonäkymäjakson verkkotavujen yläraja, jonka jälkeen uusia esihakuja ei aloiteta (Mt).</summary>
        public const int EsihakuKattoMt = 30;
        readonly List<AstronauttiKerros.CupolanSarja> sarjat = new List<AstronauttiKerros.CupolanSarja>();
        Laattapalvelin.Esilataus esihaku;
        Matkakirja.Linssit.Kuvakulma? haettu;
        int esihakuja, esihakuLaattoja;

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
            if (kauko && !jaksossa) { jaksossa = true; jaksoAlku = Time.unscaledTime; kehyksia = hitaita = 0; summaMs = 0; pisinMs = 0; AlkuTavut = Laattapalvelin.VerkostaTavuja; haettu = null; esihakuja = esihakuLaattoja = 0; }
            else if (!kauko && jaksossa) { jaksossa = false; Kirjaa(); }
            if (!Kaytossa || !kauko) { Irrota(); Tila = Kaytossa ? "odottaa" : "pois"; return; }
            Asentoon(a);
            Esihae(a);
            Tila = $"asento {a}, esihaku {(esihaku != null ? $"{esihaku.Valmis}/{esihaku.Yhteensa}" : "-")}";
        }

        void Esihae(in Matkakirja.Linssit.Kuvakulma a)
        {
            if (haettu is Matkakirja.Linssit.Kuvakulma h && Matkakirja.Linssit.Laattalista.Etaisyys(h.Lat, h.Lon, a.Lat, a.Lon) < EsihakuSiirtymaAst) return;
            if (Laattapalvelin.VerkostaTavuja - AlkuTavut > EsihakuKattoMt * 1048576L) return;
            kerros.CupolanSarjat(sarjat);
            if (sarjat.Count == 0) return;   // kuukauden tarkistus kesken: uusi yritys seuraavalla sekunnilla
            esihaku?.Peru();
            esihaku = null;
            int n = 0;
            var rivi = new System.Text.StringBuilder();
            foreach (var sa in sarjat)
            {
                var laatat = CupolanLaatat.Laske(a, IssKuvakulma.IkkunanKentta, (double)Screen.width / Mathf.Max(1, Screen.height), Screen.height,
                    sa.ZMin, sa.ZMax, sa.Alue);
                var polut = CupolanLaatat.Polut(sa.Malli, laatat, Laattapalvelin.Ampari, sa.JuuriZ, sa.JuuriX, sa.JuuriY);
                if (polut.Count == 0) continue;
                esihaku = Laattapalvelin.Esilataa(polut, esihaku);
                n += polut.Count;
                rivi.Append(rivi.Length > 0 ? ", " : "").Append(polut.Count).Append(sa.JuuriZ > 0 ? " S2" : " BMNG");
            }
            haettu = a;
            esihakuja++; esihakuLaattoja += n;
            Debug.Log($"MATKAKIRJA linssit: cupolan esihaku {esihakuja}: {n} laattaa ({rivi}) asennolle {a}");
        }

        void Kirjaa()
        {
            double mt = (Laattapalvelin.VerkostaTavuja - AlkuTavut) / 1048576.0;
            Debug.Log($"MATKAKIRJA linssit: cupolan ennakko {(Kaytossa ? "päällä" : "pois")}: jakso {Time.unscaledTime - jaksoAlku:0.0} s, " +
                $"kehyksiä {kehyksia}, keskim. {(kehyksia > 0 ? summaMs / kehyksia : 0):0.0} ms, pisin {pisinMs:0} ms, yli 50 ms {hitaita}, verkosta {mt:0.0} Mt, " +
                $"esihakuja {esihakuja} ({esihakuLaattoja} laattaa, viimeisin {(esihaku != null ? $"{esihaku.Valmis}/{esihaku.Yhteensa} valmiina" : "-")})");
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
            esihaku?.Peru();
            esihaku = null;
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
