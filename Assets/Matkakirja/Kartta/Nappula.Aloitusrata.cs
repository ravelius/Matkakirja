using System;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON RATA Nappulan puolelta (omistajan TF-löydös 27.9.2026; rata AloituslennonRata.cs): kytkin ja isoisän
    /// kynänjälki. Aloituslento v3:lla (LentoV3Ajo, aloitus) lentää isoympyrän Lontoosta kohteeseen AloituslennonRadan
    /// kameralla, kun <see cref="Aloitusrata"/> on päällä; muut lennot ennallaan.
    /// KYNÄNJÄLKI (web: paksu punainen viiva kasvaa koneen perässä, js/pallolauta/avaus.js): Kynaviiva-varjostin kuten
    /// elävän kartan kuljettu reitti (ElavaMatka), 1,8 km pinnan yllä. Koko reitti ohuena katkoviivana (kohde ja matka
    /// näkyvät heti nousussa) ja kuljettu osuus paksuna musteena, jonka kärki seuraa konetta (_Aika käänteisellä smootherstepillä,
    /// koska varjostin piirtää osuuden smoothstep(_Aika) × pituus). Viivat piirretään ennen konetta (kone peittää kärjen).
    /// </summary>
    public partial class Nappula
    {
        /// <summary>Kehittäjälippu: 1 = aloituslento radalla (oletus), 0 = lento v3:n lähestymisotos A/B-vertailuun.</summary>
        public const string AloitusrataAvain = "matkakirja-aloitusrata";

        public static bool Aloitusrata
        {
            get
            {
#if MATKAKIRJA_APPSTORE
                return true;
#else
                return PlayerPrefs.GetInt(AloitusrataAvain, 1) != 0;
#endif
            }
            set { PlayerPrefs.SetInt(AloitusrataAvain, value ? 1 : 0); PlayerPrefs.Save(); }
        }

        /// <summary>Viivojen korkeus pinnasta (m, kuten ElavaMatka).</summary>
        const double JalkiKorkeusM = 1800.0;
        /// <summary>Kuljetun osuuden ja edessä olevan reitin väri (lennon punainen kuten lähtö- ja kohdemerkit, web: punainen
        /// jälki) ja paksuus (pt).</summary>
        /// (Ominaisuuksina eikä staattisina kenttinä: LentoPunainen on toisessa osatiedostossa, eikä kenttien alustusjärjestys
        /// osatiedostojen välillä ole määritelty — kenttänä väri oli musta.)
        static Color JalkiVari => new Color(LentoPunainen.r, LentoPunainen.g, LentoPunainen.b, 0.9f);
        static Color EdessaVari => new Color(LentoPunainen.r, LentoPunainen.g, LentoPunainen.b, 0.5f);
        const float JalkiPt = 5.0f, EdessaPt = 2.2f;

        GameObject jalkiOlio, edessaOlio;
        /// <summary>v3e: vanat ja linnut (AloituslennonIlma), vain aloitusradalla.</summary>
        AloituslennonIlma aloitusIlma;

        void IlmaPois()
        {
            if (aloitusIlma != null) Destroy(aloitusIlma.gameObject);
            aloitusIlma = null;
        }
        Material jalkiMateriaali, edessaMateriaali;
        Mesh jalkiMesh, edessaMesh;

        /// <summary>Kynänjälki ja edessä oleva reitti koneen lentämänä reittinä (AloituslennonRata.LentoReitti: isoympyrä 256 välillä
        /// ja v3f4:n kaarto tiheästi); edellinen pois.</summary>
        void TeeJalki(List<(double Lat, double Lon)> pisteet)
        {
            PoistaJalki();
            var s = Resources.Load<Shader>("Varjostimet/Kynaviiva");
            if (s == null || georeferenssi == null || pisteet == null || pisteet.Count < 2) return;
            int N = pisteet.Count - 1;
            var u = new Vector3[N + 1];
            var matka = new float[N + 1];
            double kulma = 0;
            var ed = pisteet[0];
            for (int i = 0; i <= N; i++)
            {
                var q = pisteet[i];
                if (i > 0) kulma += LennonAikajana.ReittiM(ed.Item1, ed.Item2, q.Lat, q.Lon) / 6371000.0 * 180.0 / Math.PI;
                ed = (q.Lat, q.Lon);
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.Lon, q.Lat, JalkiKorkeusM));
                u[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                matka[i] = (float)kulma;
            }
            int jono = v3Reuna != null ? v3Reuna.renderQueue - 2 : 3001;
            jalkiMesh = ViivaMesh("Aloituslennon jälki", u, matka, 0f, 1f, (float)kulma);
            edessaMesh = ViivaMesh("Aloituslennon reitti", u, matka, -100f, 0.01f, (float)kulma);
            jalkiMateriaali = new Material(s) { name = "Aloituslennon jälki", renderQueue = jono };
            jalkiMateriaali.SetColor("_BaseColor", JalkiVari);
            jalkiMateriaali.SetFloat("_Paksuus", JalkiPt);
            edessaMateriaali = new Material(s) { name = "Aloituslennon reitti", renderQueue = jono - 1 };
            edessaMateriaali.SetColor("_BaseColor", EdessaVari);
            edessaMateriaali.SetFloat("_Paksuus", EdessaPt);
            edessaOlio = ViivaOlio("Aloituslennon reitti", edessaMesh, edessaMateriaali);
            jalkiOlio = ViivaOlio("Aloituslennon jälki", jalkiMesh, jalkiMateriaali);
        }

        Mesh ViivaMesh(string nimi, Vector3[] u, float[] matka, float alku, float kesto, float pituus)
        {
            int n = u.Length;
            var paikat = new Vector3[n * 2];
            var seuraavat = new Vector3[n * 2];
            var puolet = new Vector2[n * 2];
            var piirto = new Vector4[n * 2];
            for (int i = 0; i < n; i++)
            {
                Vector3 seur = i < n - 1 ? u[i + 1] : u[i] + (u[i] - u[i - 1]);
                for (int p = 0; p < 2; p++)
                {
                    int j = i * 2 + p;
                    paikat[j] = u[i]; seuraavat[j] = seur;
                    puolet[j] = new Vector2(p == 0 ? -1 : 1, matka[i]);
                    piirto[j] = new Vector4(alku, kesto, pituus, 0);
                }
            }
            var kolmiot = new int[(n - 1) * 6];
            for (int i = 0, t = 0; i < n - 1; i++)
            {
                int a = i * 2;
                kolmiot[t++] = a; kolmiot[t++] = a + 1; kolmiot[t++] = a + 2;
                kolmiot[t++] = a + 1; kolmiot[t++] = a + 3; kolmiot[t++] = a + 2;
            }
            var m = new Mesh { name = nimi };
            m.vertices = paikat;
            m.SetUVs(0, seuraavat);
            m.SetUVs(1, puolet);
            m.SetUVs(2, piirto);
            m.triangles = kolmiot;
            m.RecalculateBounds();
            return m;
        }

        GameObject ViivaOlio(string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return go;
        }

        /// <summary>
        /// Jälki koneen reittiosuuteen p (0–1) ja viivojen näkyvyys kameran etäisyydellä: lähikuvassa himmeämpi (40 %),
        /// katkojakso ruutupisteistä kuten ElavaMatka.
        /// </summary>
        void PaivitaJalki(double p, double kameranEtaisyysM, Camera kamera)
        {
            if (jalkiMateriaali == null || kamera == null) return;
            // Varjostin: piirretty = smootherstep(_Aika) × pituus → _Aika = smootherstep⁻¹(p) puolitushaulla.
            double lo = 0, hi = 1;
            for (int i = 0; i < 30; i++) { double m = 0.5 * (lo + hi); if (m * m * m * (m * (m * 6 - 15) + 10) < p) lo = m; else hi = m; }
            // Lähikuvassa (ohitus 23–30 km) jälki jää 40 %:iin: koneen piirtämä viiva näkyy maassa koneen takana (omistaja 27.9.).
            float peitto = 0.4f + 0.6f * Mathf.Clamp01((float)((kameranEtaisyysM - 30_000.0) / 40_000.0));
            var keskus = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var kw = georeferenssi.transform.TransformPoint(keskus);
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            double ptM = 2.0 * PalloKierto.Pistekerroin * Math.Max(kameranEtaisyysM, 1000) * tanPuoli / Mathf.Max(1, Screen.height);
            double jakso = Math.Pow(2, Math.Round(Math.Log(12.0 * ptM / 111_195.0, 2)));
            var keskusW = new Vector4(kw.x, kw.y, kw.z, 1);
            AsetaViiva(jalkiMateriaali, (float)(0.5 * (lo + hi)), 0f, peitto, keskusW);
            AsetaViiva(edessaMateriaali, 0f, (float)jakso, peitto, keskusW);
        }

        static void AsetaViiva(Material m, float aika, float katko, float peitto, Vector4 keskus)
        {
            m.SetFloat("_Aika", aika);
            m.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
            m.SetFloat("_Peitto", peitto);
            m.SetVector("_Keskus", keskus);
            m.SetVector("_Katko", new Vector4(katko, 0.55f, 0, 0));
        }

        // ---- Ennakkokamera: lähikuvan ja laskun laatat Cesiumille ennen kuin kamera on siellä ----

        /// <summary>Odotus napautusnäkymässä enintään (s): käytävän lisäksi Cesiumin valinta tasaantunut ennakkokameran kanssa (koko
        /// pallon näkymä ei tasaannu koskaan; v6: 4 s aina katto). Ohituksen laatat ehtivät odotuksen ja avauksen aikana.</summary>
        public const float AloitusrataOdotusKattoS = 1.5f;

        /// <summary>Aloituskaupungin valintanäkymä (UI/Aloitusnakyma.AloitaPallovalinta kirjoittaa): v3f:n esikääntö palaa siihen
        /// ennen lentoa, jos pelaaja on pyörittänyt tai zoomannut palloa (AloituslennonRata.EsikaannonKesto).</summary>
        public static AloituslennonRata.Asento? Valintanakyma;

        /// <summary>v3f: pelikello on lennon hallussa (Pelikello.Lennossa asetettu tällä lennolla): purku palauttaa sen.</summary>
        bool kelloLennossa;

        /// <summary>Pelikello pois lennolta (perillä tai purussa).</summary>
        void KelloPois()
        {
            if (!kelloLennossa) return;
            kelloLennossa = false;
            Pelikello.Lennossa = false;
        }

        readonly Camera[] ennakot = new Camera[2];
        readonly List<CesiumCameraManager> ennakkoHallinnat = new List<CesiumCameraManager>();

        /// <summary>
        /// ENNAKKOKAMERAT (v1-video 27.9.: lähikuva oli tyhjä ~3 s, koska Cesium valitsee laatat vain kameroille). Kaksi
        /// piirtämätöntä kameraa (pois päältä, cullingMask 0) radan asentoihin kaikkien tilesettien
        /// CesiumCameraManager.additionalCamerasiin (native getAllCameras ei vaadi enabled-tilaa, ks. LiikeLaatat):
        /// [0] odotuksesta ohitukseen asti ohituksen lähikuva, sitten kosketus; [1] odotuksesta asti saapumisen lähin kohta
        /// (~200 km, v3b: v3:n laiteajossa saapumisen laatat tulivat verkosta vasta saapuessa ~85 laattaa/s, ja maa oli
        /// suttuinen 14 s:iin asti). Kosketuksesta pois. Pääkamera pysyy valinnassa.
        /// </summary>
        void EnnakkoAsentoon(int i, AloituslennonRata.Asento a, Camera paa)
        {
            if (paa == null || georeferenssi == null) return;
            var ennakko = ennakot[i];
            if (ennakko == null)
            {
                var go = new GameObject("Aloitusradan ennakkokamera " + i);
                ennakko = ennakot[i] = go.AddComponent<Camera>();
                ennakko.enabled = false;
                ennakko.cullingMask = 0;
                ennakko.clearFlags = CameraClearFlags.Nothing;
            }
            if (ennakkoHallinnat.Count == 0)
                foreach (var t in FindObjectsByType<Cesium3DTileset>(FindObjectsSortMode.None))
                {
                    var h = CesiumCameraManager.GetOrCreate(t.gameObject);
                    if (h != null) ennakkoHallinnat.Add(h);
                }
            foreach (var h in ennakkoHallinnat)
                if (h != null && !h.additionalCameras.Contains(ennakko)) h.additionalCameras.Add(ennakko);
            // Asento kuten PalloKierto.LaskeAsento (ilman maaston rakoa): kamera kiertää katsepistettä.
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(a.Lon, a.Lat, a.Katse));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde);
            double3 pohjoinen = math.normalize(new double3(0, 0, 1) - ylos * ylos.z);
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(a.Suuntima), k = math.radians(a.Kallistus);
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            double3 silma = kohde + (ylos * math.cos(k) - eteen * math.sin(k)) * a.EtaisyysM;
            var gt = georeferenssi.transform;
            var p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(silma));
            var q = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(kohde));
            var yl = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(eteen * math.cos(k) + ylos * math.sin(k)));
            ennakko.transform.SetPositionAndRotation(p, Quaternion.LookRotation(q - p, yl));
            ennakko.rect = paa.rect;
            ennakko.fieldOfView = paa.fieldOfView;
            ennakko.aspect = paa.aspect;
            ennakko.nearClipPlane = (float)math.max(50.0, a.EtaisyysM * 0.01);
            ennakko.farClipPlane = (float)(a.EtaisyysM + 2.0 * CesiumWgs84Ellipsoid.GetMaximumRadius());
        }

        void EnnakkoPois()
        {
            foreach (var h in ennakkoHallinnat)
                if (h != null)
                    foreach (var e in ennakot) if (e != null) h.additionalCameras.Remove(e);
            ennakkoHallinnat.Clear();
        }

        void PoistaJalki()
        {
            if (jalkiOlio != null) Destroy(jalkiOlio);
            if (edessaOlio != null) Destroy(edessaOlio);
            if (jalkiMesh != null) Destroy(jalkiMesh);
            if (edessaMesh != null) Destroy(edessaMesh);
            if (jalkiMateriaali != null) Destroy(jalkiMateriaali);
            if (edessaMateriaali != null) Destroy(edessaMateriaali);
            jalkiOlio = edessaOlio = null; jalkiMesh = edessaMesh = null; jalkiMateriaali = edessaMateriaali = null;
        }
    }
}
