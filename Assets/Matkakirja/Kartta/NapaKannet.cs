using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Napakannet: Web Mercator -laatat päättyvät 85,05°:een, ja sen yläpuolelle
    /// Cesium jättää paljaan ellipsoidin (vaalea "hattu"). Kuten verkkopelissä
    /// (js/pallo.js asennaNapakannet), kummallekin navalle tehdään oma kalotti
    /// laattojen sävyllä. Laattojen oma yläreuna (noin 83–85°) on tummempi
    /// rengas, joten kalotti on täysi 84°:sta napaan ja häivytetään 82,5°:een
    /// (verkkopelin "häive"). Kalotti on hieman ellipsoidin yläpuolella.
    /// </summary>
    public class NapaKannet : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Material pohjoinen;
        public Material etela;
        [Tooltip("Kalotti on täysin peittävä tästä leveydestä napaan (laatat päättyvät 85,05°:een).")]
        public double taysi = 84.0;
        [Tooltip("Kalotin uloin reuna, jossa se on häipynyt kokonaan laattoihin.")]
        public double reuna = 82.5;
        [Tooltip("Korkeus ellipsoidin yläpuolella metreinä.")]
        public double korkeus = 1500.0;
        public int sektoreita = 96;
        public int kehia = 16;

        readonly System.Collections.Generic.List<GameObject> kannet = new System.Collections.Generic.List<GameObject>();

        /// <summary>KarttaKerrokset "napakannet".</summary>
        public void Nakyvat(bool nakyy) { foreach (var k in kannet) k.SetActive(nakyy); }

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            Tee("Napakansi pohjoinen", +1, pohjoinen);
            Tee("Napakansi etelä", -1, etela);
        }

        void Tee(string nimi, int suunta, Material materiaali)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = Verkko(suunta);
            go.AddComponent<MeshRenderer>().sharedMaterial = materiaali;
            kannet.Add(go);
        }

        Mesh Verkko(int suunta)
        {
            int n = (kehia + 1) * (sektoreita + 1);
            var paikat = new Vector3[n];
            var normaalit = new Vector3[n];
            var varit = new Color[n];
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            int i = 0;
            for (int k = 0; k <= kehia; k++)
            {
                // Kehä 0 on napa, viimeinen kehä on reuna.
                double lat = suunta * (90.0 - (90.0 - reuna) * k / kehia);
                for (int s = 0; s <= sektoreita; s++)
                {
                    double lon = -180.0 + 360.0 * s / sektoreita;
                    double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                        new double3(lon, lat, korkeus));
                    double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                    paikat[i] = (float3)u;
                    normaalit[i] = (float3)math.normalize(u - keskus);
                    float alfa = (float)math.saturate((math.abs(lat) - reuna) / (taysi - reuna));
                    varit[i] = new Color(1, 1, 1, alfa);
                    i++;
                }
            }
            var kolmiot = new int[kehia * sektoreita * 6];
            int t = 0;
            for (int k = 0; k < kehia; k++)
                for (int s = 0; s < sektoreita; s++)
                {
                    int a = k * (sektoreita + 1) + s, b = a + 1;
                    int c = a + sektoreita + 1, d = c + 1;
                    // Kierto valitaan niin, että etupuoli osoittaa ulospäin kummallakin navalla.
                    if (suunta > 0) { kolmiot[t++] = a; kolmiot[t++] = c; kolmiot[t++] = b; kolmiot[t++] = b; kolmiot[t++] = c; kolmiot[t++] = d; }
                    else { kolmiot[t++] = a; kolmiot[t++] = b; kolmiot[t++] = c; kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c; }
                }
            var m = new Mesh { name = "Napakansi" };
            m.vertices = paikat;
            m.normals = normaalit;
            m.colors = varit;
            m.triangles = kolmiot;
            m.RecalculateBounds();
            return m;
        }
    }
}
