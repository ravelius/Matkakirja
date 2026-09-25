// PILVIKUORI astronautin kameralle (web js/linssit/astro-sumu.js): pallokuori
// 1,01 × säde, NASA Blue Marble -pilvikuva (osoite sisältöpaketin
// linssiaineistosta), pyörii 0,5°/min maapallon akselin ympäri, peitto kameran
// korkeudesta (Astronauttimatikka.PilvienPeitto). Lennon pilvisumu (PilviKerros) käyttää
// samaa kuorta eri korkeudella (Korkeus: mittakaava maan keskipisteestä) ja samaa kuvaa
// (jaettu tekstuuri, ladataan kerran istunnossa).
using System.Collections;
using CesiumForUnity;
using Matkakirja.Linssit.Astronautti;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Pilvikuori : MonoBehaviour
    {
        public const string OletusOsoite = "https://media.matkakirja.app/matkakirja/linssit/pilvet-bluemarble-2048.jpg";
        const double MaanSade = 6_371_000;
        const int Sarakkeet = 128, Rivit = 64;

        Material materiaali;
        Vector3 akseli;
        /// <summary>Jaettu pilvikuva (astronautti ja lento); ei tuhota kuoren mukana.</summary>
        static Texture2D jaettu;
        static string jaetunOsoite;
        static bool lataa;
        Texture2D kuva => jaettu;

        public static Pilvikuori Luo(CesiumGeoreference georeferenssi, string osoite = OletusOsoite)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Pilvet");
            if (varjostin == null || georeferenssi == null) return null;
            var go = new GameObject("Pilvikuori");
            go.transform.SetParent(georeferenssi.transform, false);
            var p = go.AddComponent<Pilvikuori>();
            p.Rakenna(georeferenssi, varjostin);
            p.StartCoroutine(p.Lataa(osoite ?? OletusOsoite));
            return p;
        }

        void Rakenna(CesiumGeoreference g, Shader varjostin)
        {
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            akseli = ((Vector3)(float3)(g.TransformEarthCenteredEarthFixedPositionToUnity(new double3(0, 0, MaanSade)) - keskus)).normalized;
            transform.localPosition = (Vector3)(float3)keskus;
            var paikat = new Vector3[(Sarakkeet + 1) * (Rivit + 1)];
            var uv = new Vector2[paikat.Length];
            for (int r = 0; r <= Rivit; r++)
                for (int s = 0; s <= Sarakkeet; s++)
                {
                    double lat = 90 - 180.0 * r / Rivit, lon = -180 + 360.0 * s / Sarakkeet;
                    var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                        new double3(lon, lat, (Astronauttimatikka.PilvienSade - 1) * MaanSade));
                    int i = r * (Sarakkeet + 1) + s;
                    paikat[i] = (Vector3)(float3)(g.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus);
                    uv[i] = new Vector2(s / (float)Sarakkeet, 1 - r / (float)Rivit);
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
            var mesh = new Mesh { name = "Pilvikuori", indexFormat = IndexFormat.UInt32, vertices = paikat, uv = uv, triangles = kolmiot };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
            var rend = gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin);
            materiaali.SetFloat("_Peitto", 0);
            rend.sharedMaterial = materiaali;
            rend.shadowCastingMode = ShadowCastingMode.Off;
            rend.receiveShadows = false;
        }

        IEnumerator Lataa(string osoite)
        {
            while (lataa) yield return null;
            if (jaettu != null && jaetunOsoite == osoite) { materiaali.SetTexture("_MainTex", jaettu); yield break; }
            lataa = true;
            try { yield return LataaKuva(osoite); }
            finally { lataa = false; }
            if (jaettu != null) materiaali.SetTexture("_MainTex", jaettu);
        }

        static IEnumerator LataaKuva(string osoite)
        {
            using var pyynto = UnityWebRequestTexture.GetTexture(osoite, false);
            yield return pyynto.SendWebRequest();
            if (pyynto.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning("MATKAKIRJA linssit: pilvikuva ei latautunut: " + pyynto.error);
                yield break;
            }
            var lahde = DownloadHandlerTexture.GetContent(pyynto);
            var pikselit = lahde.GetPixels32();
            var tavut = new byte[pikselit.Length * 4];
            for (int i = 0; i < pikselit.Length; i++)
            {
                tavut[i * 4] = pikselit[i].r; tavut[i * 4 + 1] = pikselit[i].g;
                tavut[i * 4 + 2] = pikselit[i].b; tavut[i * 4 + 3] = pikselit[i].a;
            }
            // GetPixels32: rivi 0 on kuvan alareuna eli eteläisin.
            Pilvikuva.Alfa(tavut, lahde.width, lahde.height, pohjoinenEnsin: false);
            var kuva = new Texture2D(lahde.width, lahde.height, TextureFormat.RGBA32, true) { wrapModeU = TextureWrapMode.Repeat, wrapModeV = TextureWrapMode.Clamp };
            // SetPixelData tasolle 0 ja mipit Applyllä. LoadRawTextureData vaatisi koko
            // mip-ketjun datan ja heitti poikkeuksen, jolloin pilvet jäivät pois (iPad 2e26b45).
            kuva.SetPixelData(tavut, 0);
            kuva.Apply(true, true);
            Destroy(lahde);
            if (jaettu != null) Destroy(jaettu);
            jaettu = kuva;
            jaetunOsoite = osoite;
        }

        /// <summary>
        /// Kuoren korkeus merenpinnasta (m): mittakaava maan keskipisteestä rakennuskorkeuteen
        /// nähden (Astronauttimatikka.PilvienSade). Ellipsoidi skaalautuu tasaisesti, mikä riittää sumulle.
        /// </summary>
        public void Korkeus(double korkeusM)
        {
            double rakennettu = (Astronauttimatikka.PilvienSade - 1) * MaanSade;
            transform.localScale = Vector3.one * (float)((MaanSade + korkeusM) / (MaanSade + rakennettu));
        }

        /// <summary>Peitto 0…1 ja kierto asteina (Astronauttimatikka).</summary>
        public void Aseta(double peitto, double kiertoAsteina)
        {
            Peitto(peitto);
            transform.localRotation = Quaternion.AngleAxis((float)kiertoAsteina, akseli);
        }

        // ── Ihmisen matka II: sumu (IhmisenMatka2Sumu) ────────────────────────
        static readonly int IdPeitto = Shader.PropertyToID("_Peitto"), IdVari = Shader.PropertyToID("_Vari"),
            IdHamara = Shader.PropertyToID("_Hamara"), IdKeskus = Shader.PropertyToID("_Keskus"),
            IdKeilaA = Shader.PropertyToID("_KeilaA"), IdKeilaAsisa = Shader.PropertyToID("_KeilaAsisa"),
            IdKeilaB = Shader.PropertyToID("_KeilaB"), IdKeilaBsisa = Shader.PropertyToID("_KeilaBsisa");

        /// <summary>Maapallon akseli (Aseta-kierron akseli), maailmassa.</summary>
        public Vector3 Akseli => akseli;

        /// <summary>Peitto 0…1; kuori piiloon, kun peitto on nolla (kuvaa odottaessa näkyvissä mutta läpinäkyvä).</summary>
        public void Peitto(double peitto)
        {
            materiaali.SetFloat(IdPeitto, (float)peitto);
            gameObject.SetActive(peitto > 0.001 || kuva == null);
        }

        /// <summary>Kuoren kierto sellaisenaan (sumun ajelehtiminen ja aikahypyn pyörre).</summary>
        public void Kierto(Quaternion q) => transform.localRotation = q;

        /// <summary>Sävy: kertoo pilvikuvan värin ja alfan (valkoinen = ennallaan).</summary>
        public void Savy(Color vari) => materiaali.SetColor(IdVari, vari);

        /// <summary>
        /// Valokeila pilvissä kuten pallossa: keilojen ulkopuolella kirkkaus 1 − 0,95 · hämäryys. Keila maan keskipisteestä
        /// katsottuna: suunta georeferenssin avaruudessa (<see cref="Suunta"/>), cos ulko- ja sisäreuna, voimakkuus
        /// (0 = ei keilaa). Varjostin vertaa maailman suuntiin, joten suunnat käännetään georeferenssin kierrolla.
        /// </summary>
        public void Valaistus(float hamaryys, Vector3 suuntaA, float ulkoA, float sisaA, float voimaA,
                              Vector3 suuntaB, float ulkoB, float sisaB, float voimaB)
        {
            var g = transform.parent;
            Vector3 A = g != null ? g.TransformDirection(suuntaA) : suuntaA, B = g != null ? g.TransformDirection(suuntaB) : suuntaB;
            materiaali.SetFloat(IdHamara, Mathf.Clamp01(hamaryys));
            materiaali.SetVector(IdKeskus, transform.position);
            materiaali.SetVector(IdKeilaA, new Vector4(A.x, A.y, A.z, ulkoA));
            materiaali.SetVector(IdKeilaAsisa, new Vector4(sisaA, voimaA, 0f, 0f));
            materiaali.SetVector(IdKeilaB, new Vector4(B.x, B.y, B.z, ulkoB));
            materiaali.SetVector(IdKeilaBsisa, new Vector4(sisaB, voimaB, 0f, 0f));
        }

        /// <summary>Suunta maan keskipisteestä paikkaan (lat, lon) georeferenssin avaruudessa (keilat, pyörteen akseli).</summary>
        public static Vector3 Suunta(CesiumGeoreference g, double lat, double lon)
        {
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
            return ((Vector3)(float3)(g.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus)).normalized;
        }

        void OnDestroy()
        {
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            Destroy(materiaali);
        }
    }
}
