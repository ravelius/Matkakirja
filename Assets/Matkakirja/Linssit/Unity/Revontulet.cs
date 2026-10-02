// REVONTULET (ISS-realismi 3b, omistajan kortti 28.9.2026): NOAA SWPC OVATION Prime -ennuste kuorella R + 110 km yöpuolella
// (Revontulet.shader). Data Julkaisijan ajastetusta hausta (30 min): data/revontulet/uusin.png, 360 × 181 harmaa
// todennäköisyys × 2,55. Haetaan kyydin alkaessa ja 30 minuutin välein kyydin aikana; ilman dataa kerros ei piirry.
// Aurinko ISS-kellosta (testikello siirtää myös yötä). A/B: astro kyyti revontulet 0|1.
using System;
using System.Collections;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Revontulet : MonoBehaviour
    {
        public const string Url = "https://media.matkakirja.app/data/revontulet/uusin.png";
        const double KorkeusM = 110_000;
        const int Sarakkeet = 128, Rivit = 64;
        const float PaivitysS = 1800f;
        static readonly int IdTod = Shader.PropertyToID("_Todennakoisyys"), IdAurinko = Shader.PropertyToID("_Aurinko"),
            IdKeskus = Shader.PropertyToID("_Keskus"), IdAkseli = Shader.PropertyToID("_Akseli"), IdNolla = Shader.PropertyToID("_Nolla"), IdIta = Shader.PropertyToID("_Ita"),
            IdAika = Shader.PropertyToID("_Aika"), IdVoima = Shader.PropertyToID("_Voima");

        /// <summary>A/B (`astro kyyti revontulet 0|1`).</summary>
        public static bool Pois;

        CesiumGeoreference g;
        Material materiaali;
        MeshRenderer piirto;
        Texture2D kuva;
        bool nakyy, haetaan;
        float haettu = -1e9f;

        public static Revontulet Luo(CesiumGeoreference georeferenssi)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Revontulet");
            if (varjostin == null || georeferenssi == null) { Debug.LogWarning("MATKAKIRJA revontulet: varjostin puuttuu"); return null; }
            var go = new GameObject("Revontulet");
            go.transform.SetParent(georeferenssi.transform, false);
            var r = go.AddComponent<Revontulet>();
            r.g = georeferenssi;
            r.Rakenna(varjostin);
            return r;
        }

        void Rakenna(Shader varjostin)
        {
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            transform.localPosition = (Vector3)(float3)keskus;
            var paikat = new Vector3[(Sarakkeet + 1) * (Rivit + 1)];
            for (int r = 0; r <= Rivit; r++)
                for (int s = 0; s <= Sarakkeet; s++)
                {
                    double lat = 90 - 180.0 * r / Rivit, lon = -180 + 360.0 * s / Sarakkeet;
                    var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, KorkeusM));
                    paikat[r * (Sarakkeet + 1) + s] = (Vector3)(float3)(g.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus);
                }
            var kolmiot = new int[Sarakkeet * Rivit * 6];
            int t = 0;
            for (int r = 0; r < Rivit; r++)
                for (int s = 0; s < Sarakkeet; s++)
                {
                    int a = r * (Sarakkeet + 1) + s, b = a + 1, c = a + Sarakkeet + 1, d = c + 1;
                    kolmiot[t++] = a; kolmiot[t++] = b; kolmiot[t++] = c;
                    kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c;
                }
            var mesh = new Mesh { name = "Revontulet", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kolmiot };
            mesh.RecalculateBounds();
            gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
            piirto = gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin) { name = "Revontulet" };
            piirto.sharedMaterial = materiaali;
            piirto.shadowCastingMode = ShadowCastingMode.Off;
            piirto.receiveShadows = false;
            piirto.enabled = false;
        }

        public void Nayta(bool paalla)
        {
            nakyy = paalla;
            if (paalla && !haetaan && Time.unscaledTime - haettu > PaivitysS) StartCoroutine(Hae());
            piirto.enabled = paalla && !Pois && kuva != null;
        }

        IEnumerator Hae()
        {
            haetaan = true;
            haettu = Time.unscaledTime;
            // Aikaleima ohittaa välimuistit: tiedosto vaihtuu 30 minuutin välein.
            using var p = UnityWebRequest.Get(Url + "?t=" + DateTime.UtcNow.ToString("yyyyMMddHHmm"));
            yield return p.SendWebRequest();
            haetaan = false;
            if (p.result != UnityWebRequest.Result.Success) { Debug.Log("MATKAKIRJA revontulet: ei dataa (" + p.error + ")"); yield break; }
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, false) { wrapModeU = TextureWrapMode.Repeat, wrapModeV = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            if (!t.LoadImage(p.downloadHandler.data, true)) { Destroy(t); yield break; }
            if (kuva != null) Destroy(kuva);
            kuva = t;
            materiaali.SetTexture(IdTod, kuva);
            Debug.Log($"MATKAKIRJA revontulet: OVATION {kuva.width} × {kuva.height}");
            Nayta(nakyy);
        }

        void LateUpdate()
        {
            if (!piirto.enabled) { if (nakyy && !Pois && kuva != null) piirto.enabled = true; else return; }
            if (Pois) { piirto.enabled = false; return; }
            var gt = g.transform;
            var a = (Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(Matkakirja.Linssit.Iss.IssNyt.AurinkoKello()));
            materiaali.SetVector(IdAurinko, gt.TransformDirection(a).normalized);
            materiaali.SetVector(IdKeskus, transform.position);
            materiaali.SetVector(IdAkseli, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized);
            materiaali.SetVector(IdNolla, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(1, 0, 0))).normalized);
            materiaali.SetVector(IdIta, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 1, 0))).normalized);
            materiaali.SetFloat(IdAika, Time.unscaledTime);
            materiaali.SetFloat(IdVoima, 1.4f);
        }

        void OnDestroy()
        {
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            if (kuva != null) Destroy(kuva);
            Destroy(materiaali);
        }
    }
}
