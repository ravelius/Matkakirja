using System.Collections.Generic;
using CesiumForUnity;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// AVAUSNÄKYMÄN VIRTUAALIKAMERAT (Natiiviseppä 26.9.2026, build 22; ESILATAUSPOLITIIKKA kohta 2). Aloituslennon musta
    /// verho odotti kylmänä avausnäkymän (Lontoo 450 km, 45°) laattoja 7,8 s (katto 4,4 s → verho lähti pallo 46–57 %:ssa;
    /// lokit/laatta-esilataus/pois-katto30): Cesium lataa tason kerrallaan, ja näkymä tarvitsee noin 460 verkkolaattaa.
    /// Geometrinen malli (AvausLaatat) ennusti 2–3-kertaisen joukon, joten laatat valitsee Cesium itse:
    /// CesiumCameraManager.additionalCameras käyttää myös pois käytöstä olevia kameroita laattojen valintaan
    /// ("virtual camera that affects Cesium3DTileset loading without being used for rendering").
    ///
    ///   aloitusnäyttö (aloitusverhon jälkeen): <see cref="Kiila"/> kameraa avausasennossa suuntiin 0°, 120° ja 240°, kukin
    ///       pääkameran pystykulmalla ja -resoluutiolla (sama LOD) mutta vaakana <see cref="KiilanVaaka"/>° (renderöimätön
    ///       targetTexture antaa leveyden; Cesium lukee pixelWidth/pixelHeight/fieldOfView). Suunta ei ole vielä tiedossa.
    ///   lennon alku (Nappula, kohde tiedossa): yksi tarkka kamera avausasentoon, kiilat pois.
    ///   mustan loppu: kaikki pois.
    /// KOKEILU, OLETUS POIS (kehittäjälippu matkakirja-avauskamerat 1): mitattuna huonompi kuin ilman (lokit/laatta-esilataus/
    /// b-taysi-kamera: avaus 16,8 s, ilman 7,3–8,1 s; kiilat 18,7 s). Geometrinen esilataus (KarttaKerrokset.EsilataaAvaus)
    /// on käytössä.
    /// </summary>
    public static class AvausKamerat
    {
        public const int Kiila = 3;
        public const float KiilanVaaka = 130f;
        static readonly List<Camera> kamerat = new List<Camera>();
        static CesiumCameraManager hallinta;
        static int lippu = -1;

        public static bool Paalla
        {
            get
            {
#if !MATKAKIRJA_APPSTORE
                if (lippu < 0) lippu = PlayerPrefs.GetInt("matkakirja-avauskamerat", 0);
                return lippu != 0;
#else
                return true;
#endif
            }
        }

        public static int Maara => kamerat.Count;

        /// <summary>
        /// Aloitusnäytön kiilat (kehittäjälippu matkakirja-avauskiilat 1; oletus pois): mittauksessa (kamerat-katto30) kolme
        /// 130°:n kiilaa toivat Cesiumin jonoon 2 200–2 600 laattaa, jotka tukkivat lennon mustan (avaus 18,7 s).
        /// </summary>
        public static bool KiilatPaalla
        {
            get
            {
#if !MATKAKIRJA_APPSTORE
                if (kiilaLippu < 0) kiilaLippu = PlayerPrefs.GetInt("matkakirja-avauskiilat", 0);
                return kiilaLippu != 0;
#else
                return false;
#endif
            }
        }
        static int kiilaLippu = -1;

        /// <summary>Aloitusnäyttö: kiilat avausasennon kaikkiin suuntiin (suunta selviää vasta valinnassa).</summary>
        public static void Kiilat(PalloKierto kierto, Cesium3DTileset pallo, double lat, double lon, double etaisyysM, double kallistus)
        {
            if (!Paalla || !KiilatPaalla) return;
            Lopeta(null);
            for (int i = 0; i < Kiila; i++)
                Lisaa(kierto, pallo, lat, lon, etaisyysM, kallistus, i * 360.0 / Kiila, KiilanVaaka);
            Debug.Log($"MATKAKIRJA avauskamerat: {kamerat.Count} kiilaa ({etaisyysM / 1000:0} km {kallistus:0}°, vaaka {KiilanVaaka:0}°)");
        }

        /// <summary>Lennon alku: yksi kamera tarkkaan avausasentoon (pääkameran kuvasuhde), kiilat pois.</summary>
        public static void Tarkka(PalloKierto kierto, Cesium3DTileset pallo, double lat, double lon, double etaisyysM, double kallistus,
            double suunta, double katseKorkeus)
        {
            if (!Paalla) return;
            Lopeta(null);
            Lisaa(kierto, pallo, lat, lon, etaisyysM, kallistus, suunta, 0f, katseKorkeus);
            Debug.Log($"MATKAKIRJA avauskamerat: tarkka ({etaisyysM / 1000:0} km {kallistus:0}° {suunta:0}°)");
        }

        public static void Lopeta(string syy)
        {
            if (hallinta != null)
                foreach (var c in kamerat) hallinta.additionalCameras.Remove(c);
            foreach (var c in kamerat)
                if (c != null)
                {
                    var rt = c.targetTexture;
                    c.targetTexture = null;
                    if (rt != null) Object.Destroy(rt);
                    Object.Destroy(c.gameObject);
                }
            if (kamerat.Count > 0 && syy != null) Debug.Log($"MATKAKIRJA avauskamerat: pois ({syy})");
            kamerat.Clear();
        }

        /// <param name="vaaka">Vaakakulma (°); 0 = pääkameran kuvasuhde.</param>
        static void Lisaa(PalloKierto kierto, Cesium3DTileset pallo, double lat, double lon, double etaisyysM, double kallistus,
            double suunta, float vaaka, double katseKorkeus = 0)
        {
            if (kierto == null || pallo == null) return;
            var paa = kierto.GetComponent<Camera>();
            if (paa == null) return;
            if (hallinta == null) hallinta = CesiumCameraManager.GetOrCreate(pallo.gameObject);
            var go = new GameObject("Avauskamera " + suunta.ToString("0"));
            go.transform.SetParent(kierto.transform.parent, false);
            var c = go.AddComponent<Camera>();
            c.enabled = false;
            c.fieldOfView = paa.fieldOfView;
            int h = Mathf.Max(1, paa.pixelHeight);
            int w = paa.pixelWidth;
            if (vaaka > 0f)
            {
                double tanPysty = System.Math.Tan(paa.fieldOfView * System.Math.PI / 360.0);
                w = (int)System.Math.Ceiling(h * System.Math.Tan(vaaka * System.Math.PI / 360.0) / tanPysty);
            }
            // Renderöimätön kohde (ei Create): antaa Cesiumille pixelWidth/pixelHeight; kamera on pois käytöstä.
            c.targetTexture = new RenderTexture(Mathf.Max(1, w), h, 0);
            c.aspect = (float)w / h;
            kierto.AsetaKamera(c, lat, lon, etaisyysM, kallistus, suunta, katseKorkeus);
            kamerat.Add(c);
            hallinta.additionalCameras.Add(c);
        }
    }
}
