// YÖKUORI (ISS:n kyyti, Linssiseppä 28.9.2026): väliaikainen päivä ja yö astronautin kameraan, kunnes pallolla on oma
// terminaattori (Natiiviseppä 28.9.: ei jonossa; linssin oma kerros, ei tileset-varjostimeen eikä RenderSettingseihin).
// Pallokuori 1,012 × säde (pilvikuoren 1,01 yllä), tumma yöpuolella auringon suunnan mukaan (Aurinko.AurinkoEcef, UTC) ja
// 6°:n hämäräkaista. Näkyy kyydissä (seuranta ja ikkuna); kaukonäkymä pysyy webin kaltaisena (web on malli).
// KAUPUNKIEN VALOT (omistaja 28.9. klo 12.3x): Black Marble -kuvat ämpäristä (linssit/astronautin-kamera/iss-yovalot-
// 2026-09-28/: Eurooppa Z6 ja maailma Z3, 2048², Web Mercator), välimuisti persistentDataPath/kuvat, yksikanavaisiksi (R8,
// mipmapit, 2 × 5,6 Mt); haetaan kuoren luonnissa (linssin avaus: kyyti on yhden napautuksen päässä). Varjostin leikkaa
// katsesäteen maan pintaan ja lisää valot yön päälle (Yokuori.shader). Aurinko ja ISS samasta kellosta (IssNyt.Kello:
// testikomento astro kyyti kello). A/B: astro kyyti valot 0|1.
using System;
using System.Collections;
using System.IO;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Yokuori : MonoBehaviour
    {
        const double MaanSade = 6_371_000, Sade = 1.012;
        const int Sarakkeet = 96, Rivit = 48;
        static readonly int IdAurinko = Shader.PropertyToID("_Aurinko"), IdKeskus = Shader.PropertyToID("_Keskus"),
            IdPeitto = Shader.PropertyToID("_Peitto"), IdAkseli = Shader.PropertyToID("_Akseli"), IdNolla = Shader.PropertyToID("_Nolla"),
            IdR = Shader.PropertyToID("_R"), IdLitistys = Shader.PropertyToID("_Litistys"), IdValot = Shader.PropertyToID("_Valot"),
            IdValotEu = Shader.PropertyToID("_ValotEu"), IdValotMaa = Shader.PropertyToID("_ValotMaa");
        const string ValoJuuri = "https://media.matkakirja.app/linssit/astronautin-kamera/iss-yovalot-2026-09-28/";
        /// <summary>Valojen voimakkuus (HDR: suurkaupunkien ytimet hehkuvat bloomissa).</summary>
        public const float ValojenVoima = 1.6f;
        /// <summary>A/B (`astro kyyti valot 0|1`): kaupunkien valot pois kuvaparia varten.</summary>
        public static bool ValotPois;
        Texture2D valotEu, valotMaa;
        MeshRenderer piirto;

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
            // Objekti pysyy aktiivisena (valojen haku on korutiini), vain piirto on pois kunnes kyyti alkaa.
            y.piirto.enabled = false;
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
            var rend = piirto = gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin) { name = "Yokuori" };
            rend.sharedMaterial = materiaali;
            rend.shadowCastingMode = ShadowCastingMode.Off;
            rend.receiveShadows = false;
            materiaali.SetFloat(IdR, (float)CesiumWgs84Ellipsoid.GetMaximumRadius());
            materiaali.SetFloat(IdLitistys, (float)(CesiumWgs84Ellipsoid.GetMaximumRadius() / CesiumWgs84Ellipsoid.GetMinimumRadius()));
            materiaali.SetFloat(IdValot, 0f);
            StartCoroutine(HaeValot());
        }

        IEnumerator HaeValot()
        {
            yield return Hae("eurooppa-2048.jpg", TextureWrapMode.Clamp, t => valotEu = t);
            yield return Hae("maailma-2048.jpg", TextureWrapMode.Repeat, t => valotMaa = t);
            if (valotEu != null) materiaali.SetTexture(IdValotEu, valotEu);
            if (valotMaa != null) materiaali.SetTexture(IdValotMaa, valotMaa);
            Debug.Log($"MATKAKIRJA linssit: yövalot eurooppa {(valotEu != null ? "ok" : "puuttuu")}, maailma {(valotMaa != null ? "ok" : "puuttuu")}");
        }

        /// <summary>Kuva ämpäristä tai välimuistista yksikanavaiseksi (luminanssi = R) mipmapein; null = ei saatu.</summary>
        static IEnumerator Hae(string nimi, TextureWrapMode kaarre, Action<Texture2D> valmis)
        {
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", "iss-yovalot-" + nimi);
            byte[] tavut = null;
            if (File.Exists(polku)) tavut = File.ReadAllBytes(polku);
            else
            {
                using var p = UnityWebRequest.Get(ValoJuuri + nimi);
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success)
                {
                    tavut = p.downloadHandler.data;
                    try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, tavut); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA yövalot: välimuisti " + e.Message); }
                }
                else Debug.LogWarning($"MATKAKIRJA yövalot: {nimi} {p.error}");
            }
            if (tavut == null) { valmis(null); yield break; }
            var rgb = new Texture2D(2, 2, TextureFormat.RGB24, false);
            if (!rgb.LoadImage(tavut, false)) { Destroy(rgb); valmis(null); yield break; }
            // Luminanssi R8:aan: kolmasosa muistista (2048² = 4 Mt + mipit), sävy lasketaan varjostimessa.
            var lahde = rgb.GetPixelData<byte>(0);
            int n = rgb.width * rgb.height;
            var r8 = new Texture2D(rgb.width, rgb.height, TextureFormat.R8, true, true)
                { name = "yovalot-" + nimi, wrapMode = kaarre, filterMode = FilterMode.Trilinear, anisoLevel = 2 };
            var kohde = r8.GetPixelData<byte>(0);
            for (int i = 0, j = 0; i < n; i++, j += 3)
                kohde[i] = (byte)((lahde[j] * 54 + lahde[j + 1] * 183 + lahde[j + 2] * 19) >> 8);
            Destroy(rgb);
            r8.Apply(true, true);
            valmis(r8);
        }

        /// <summary>Näkyviin tai pois (kyydissä näkyvissä, ellei A/B pois).</summary>
        public void Nayta(bool nakyvissa)
        {
            bool n = nakyvissa && !Pois;
            if (piirto.enabled != n) piirto.enabled = n;
            if (n) paivitetty = -10f;
        }

        void LateUpdate()
        {
            // Aurinko liikkuu 0,25°/min: suunta kerran sekunnissa riittää (vain piirrettäessä).
            if (!piirto.enabled || Time.unscaledTime - paivitetty < 1f) return;
            paivitetty = Time.unscaledTime;
            var gt = g.transform;
            var a = (Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(Matkakirja.Linssit.Iss.IssNyt.Kello()));
            materiaali.SetVector(IdAurinko, gt.TransformDirection(a).normalized);
            materiaali.SetVector(IdKeskus, transform.position);
            materiaali.SetVector(IdAkseli, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized);
            materiaali.SetVector(IdNolla, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(1, 0, 0))).normalized);
            materiaali.SetFloat(IdValot, ValotPois || valotEu == null && valotMaa == null ? 0f : ValojenVoima);
        }

        void OnDestroy()
        {
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            if (valotEu != null) Destroy(valotEu);
            if (valotMaa != null) Destroy(valotMaa);
            Destroy(materiaali);
        }
    }
}
