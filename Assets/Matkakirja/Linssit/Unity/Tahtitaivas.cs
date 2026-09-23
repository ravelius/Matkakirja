// TÄHTITAIVAS pallon ympärille (web js/pallolauta/tahdet.js luoTahtitaivas).
//
// Pisteet tulevat puhtaasta ytimestä (Linssit/Ydin/Tahdet.cs, sama siemen kuin
// webissä). Jokainen kerros on yksi mesh georeferenssin alla: tähti on neljä
// kärkeä samassa keskipisteessä, ja varjostin (Resources/Varjostimet/Tahti)
// levittää ne kameraan päin kääntyväksi neliöksi. Pölykerros ajelehtii maapallon
// akselin ympäri, muut ovat paikallaan.
//
// Kameran tausta ja clearFlags ovat Natiivisepän (RAJAPINTA.md). PalloKierto
// asettaa kaukorajaksi korkeus + 2 R, mutta tähdet ovat 2,6–10,4 R pinnan
// yläpuolella (astronautti kerroin 1,6), joten ne leikkautuivat pois (iPad
// 2e26b45). Taivas pyytää siksi PalloKierto.KaukorajaVahintaan-arvoksi kameran
// etäisyyden keskipisteestä + kaukaisimman tähden säteen, ja palauttaa sen
// nollaksi poistuessaan.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Tahtitaivas : MonoBehaviour
    {
        const double MaanSade = 6_371_000;
        const float Fov = 50f;

        CesiumGeoreference georeferenssi;
        readonly List<(Tahtijoukko joukko, Transform olio, Material materiaali)> kerrokset =
            new List<(Tahtijoukko, Transform, Material)>();
        Vector3 akseli;
        Vector3 keskusPaikallinen;
        double kaukaisinSade;   // metreinä maan keskipisteestä
        float kierto;
        bool vahennettyLiike;

        /// <summary>Luo taivaan georeferenssin alle; kerroin 1 (ihmisen matka) tai 1,6 (astronautti).</summary>
        public static Tahtitaivas Luo(CesiumGeoreference georeferenssi, double kerroin, bool vahennettyLiike)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Tahti");
            if (varjostin == null || georeferenssi == null)
            {
                Debug.LogWarning("MATKAKIRJA linssit: tähtitaivaan varjostin tai georeferenssi puuttuu");
                return null;
            }
            var go = new GameObject("Tahtitaivas");
            go.transform.SetParent(georeferenssi.transform, false);
            var t = go.AddComponent<Tahtitaivas>();
            t.georeferenssi = georeferenssi;
            t.vahennettyLiike = vahennettyLiike;
            t.Rakenna(varjostin, kerroin);
            return t;
        }

        void Rakenna(Shader varjostin, double kerroin)
        {
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 napa = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(new double3(0, 0, MaanSade));
            akseli = ((Vector3)(float3)(napa - keskus)).normalized;
            keskusPaikallinen = (Vector3)(float3)keskus;
            foreach (var joukko in Tahdet.Joukot(kerroin))
            {
                foreach (var p in joukko.Pisteet) kaukaisinSade = System.Math.Max(kaukaisinSade, (1 + p.Korkeus) * MaanSade);
                var olio = new GameObject("Tahdet-" + joukko.Tunnus).transform;
                olio.SetParent(transform, false);
                olio.localPosition = (Vector3)(float3)keskus;
                var mesh = Mesh(joukko, keskus);
                olio.gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = olio.gameObject.AddComponent<MeshRenderer>();
                var m = new Material(varjostin);
                r.sharedMaterial = m;
                r.shadowCastingMode = ShadowCastingMode.Off;
                r.receiveShadows = false;
                kerrokset.Add((joukko, olio, m));
            }
        }

        Mesh Mesh(Tahtijoukko joukko, double3 keskus)
        {
            ColorUtility.TryParseHtmlString(joukko.Vari, out var vari);
            float leveys = (float)(Tahdet.LeveysSateina(joukko.Koko, Fov) * MaanSade);
            int n = joukko.Pisteet.Count;
            var paikat = new Vector3[n * 4];
            var uv = new Vector2[n * 4];
            var koot = new Vector2[n * 4];
            var varit = new Color[n * 4];
            var kolmiot = new int[n * 6];
            var kulmat = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) };
            for (int i = 0; i < n; i++)
            {
                var p = joukko.Pisteet[i];
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(p.Lon, p.Lat, p.Korkeus * MaanSade));
                var paikka = (Vector3)(float3)(georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus);
                for (int k = 0; k < 4; k++)
                {
                    paikat[i * 4 + k] = paikka;
                    uv[i * 4 + k] = kulmat[k];
                    koot[i * 4 + k] = new Vector2(leveys, 0);
                    varit[i * 4 + k] = vari;
                }
                int v = i * 4, t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 2; kolmiot[t + 2] = v + 1;
                kolmiot[t + 3] = v; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var mesh = new Mesh { name = "Tahdet-" + joukko.Tunnus, indexFormat = IndexFormat.UInt32 };
            mesh.vertices = paikat;
            mesh.uv = uv;
            mesh.uv2 = koot;
            mesh.colors = varit;
            mesh.triangles = kolmiot;
            // Kärjet ovat keskipisteissä: rajat laajennetaan, ettei karsinta vie tähtiä.
            mesh.bounds = new Bounds(Vector3.zero, Vector3.one * (float)(20 * MaanSade));
            return mesh;
        }

        /// <summary>Kutsutaan joka kehys: dt sekunteina, peitto 0…1 (web paivita(dt, peitto)).</summary>
        public void Paivita(float dt, float peitto)
        {
            float p = Mathf.Clamp01(peitto);
            if (!vahennettyLiike) kierto += dt * (float)Tahdet.PolynAjautumaKierrostaS * 360f;
            foreach (var (joukko, olio, m) in kerrokset)
            {
                if (joukko.Ajautuu) olio.localRotation = Quaternion.AngleAxis(kierto, akseli);
                m.SetFloat("_Peitto", p);
                olio.gameObject.SetActive(p > 0.01f);
            }
        }

        PalloKierto pallo;

        /// <summary>Kaukoraja kaukaisimman tähden taakse (kameran etäisyys keskipisteestä + tähtikuoren säde).</summary>
        void Update()
        {
            if (georeferenssi == null) return;
            if (pallo == null) pallo = FindAnyObjectByType<PalloKierto>();
            if (pallo == null) return;
            Vector3 keskus = georeferenssi.transform.TransformPoint(keskusPaikallinen);
            pallo.KaukorajaVahintaan = Vector3.Distance(pallo.transform.position, keskus) + kaukaisinSade * 1.05;
        }

        void OnDisable()
        {
            if (pallo != null) pallo.KaukorajaVahintaan = 0;
        }

        void OnDestroy()
        {
            foreach (var (_, olio, m) in kerrokset)
            {
                if (olio != null && olio.TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
                Destroy(m);
            }
            kerrokset.Clear();
        }
    }
}
