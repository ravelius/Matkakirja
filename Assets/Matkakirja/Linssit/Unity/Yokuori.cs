// YÖKUORI (ISS:n kyyti, Linssiseppä 28.9.2026): väliaikainen päivä ja yö astronautin kameraan, kunnes pallolla on oma
// terminaattori (Natiiviseppä 28.9.: ei jonossa; linssin oma kerros, ei tileset-varjostimeen eikä RenderSettingseihin).
// Pallokuori 1,012 × säde (pilvikuoren 1,01 yllä), tumma yöpuolella auringon suunnan mukaan (Aurinko.AurinkoEcef, UTC) ja
// 6°:n hämäräkaista. Näkyy kyydissä (seuranta ja ikkuna); kaukonäkymä pysyy webin kaltaisena (web on malli).
using System;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Yokuori : MonoBehaviour
    {
        const double MaanSade = 6_371_000, Sade = 1.012;
        const int Sarakkeet = 96, Rivit = 48;
        static readonly int IdAurinko = Shader.PropertyToID("_Aurinko"), IdKeskus = Shader.PropertyToID("_Keskus"),
            IdPeitto = Shader.PropertyToID("_Peitto");

        CesiumGeoreference g;
        Material materiaali;
        float paivitetty = -10f;

        /// <summary>A/B (testikomento astro yo 0|1): yökuori pois kuvaparia varten.</summary>
        public static bool Pois;

        public static Yokuori Luo(CesiumGeoreference georeferenssi)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Yokuori");
            if (varjostin == null || georeferenssi == null) { Debug.LogWarning("MATKAKIRJA yökuori: varjostin puuttuu"); return null; }
            var go = new GameObject("Yokuori");
            go.transform.SetParent(georeferenssi.transform, false);
            var y = go.AddComponent<Yokuori>();
            y.g = georeferenssi;
            y.Rakenna(varjostin);
            go.SetActive(false);
            return y;
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
                    var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, (Sade - 1) * MaanSade));
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
            var mesh = new Mesh { name = "Yokuori", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kolmiot };
            mesh.RecalculateBounds();
            gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
            var rend = gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin) { name = "Yokuori" };
            rend.sharedMaterial = materiaali;
            rend.shadowCastingMode = ShadowCastingMode.Off;
            rend.receiveShadows = false;
        }

        /// <summary>Näkyviin tai pois (kyydissä näkyvissä, ellei A/B pois).</summary>
        public void Nayta(bool nakyvissa)
        {
            bool n = nakyvissa && !Pois;
            if (gameObject.activeSelf != n) gameObject.SetActive(n);
            if (n) paivitetty = -10f;
        }

        void LateUpdate()
        {
            // Aurinko liikkuu 0,25°/min: suunta kerran sekunnissa riittää.
            if (Time.unscaledTime - paivitetty < 1f) return;
            paivitetty = Time.unscaledTime;
            var gt = g.transform;
            var a = (Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(DateTime.UtcNow));
            materiaali.SetVector(IdAurinko, gt.TransformDirection(a).normalized);
            materiaali.SetVector(IdKeskus, transform.position);
        }

        void OnDestroy()
        {
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            Destroy(materiaali);
        }
    }
}
