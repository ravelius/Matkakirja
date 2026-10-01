// KYYDIN TAIVAS (ISS-realismi 4b ja 4c, omistajan kortti 28.9.2026): oikeat tähdet ja Kuu ISS:n kyytiin.
//
//   tähdet   Yale Bright Star Catalogue 5 (1 656 tähteä magnitudiin 5,5; PD, ämpärissä linssit/astronautin-kamera/
//            tahdet-bsc5-2026-09-28.json, sama aineisto kuin webin linssi-tahdet.js). Yksi mesh: tähti on neljä kärkeä
//            samassa ECI-suunnassa, varjostin (KyydinTahdet) kiertää ne maailmaan (georeferenssi × GMST) ja levittää
//            kameraan päin neliöksi; syvyys kaukotasolle, joten maa peittää ne eikä parallaksia ole. Koko ja kirkkaus
//            magnitudista, väri B−V:stä.
//   Kuu      Kuu.Suunta (Meeus, noin 0,3°) → ECEF → maailma; kiekko 0,52° todellisessa koossa (KyydinKuu), vaihe
//            varjostimessa auringon suunnasta (Lambert pallon normaalilla), maanvalo 0,03.
//   kirkkaus ISS maan varjossa (sylinterimalli) tähdet 1, päivällä 0,3 (valotus); Kuu aina.
// Näkyy kyydissä (seuranta ja ikkuna); kaukonäkymässä pysyy webin satunnainen tähtikenttä (Tahtitaivas). Aika ISS-kellosta
// (IssNyt.Kello), joten testikello siirtää myös taivaan. A/B: astro kyyti taivas 0|1.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit.Iss;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class KyydinTaivas : MonoBehaviour
    {
        public const string TahtiUrl = "https://media.matkakirja.app/linssit/astronautin-kamera/tahdet-bsc5-2026-09-28.json";
        const float KuunKulma = 0.52f;
        static readonly int IdKiertoX = Shader.PropertyToID("_KiertoX"), IdKiertoY = Shader.PropertyToID("_KiertoY"),
            IdKiertoZ = Shader.PropertyToID("_KiertoZ"), IdPeitto = Shader.PropertyToID("_Peitto"),
            IdSuunta = Shader.PropertyToID("_Suunta"), IdAurinko = Shader.PropertyToID("_Aurinko"), IdKoko = Shader.PropertyToID("_Koko");

        /// <summary>A/B (`astro kyyti taivas 0|1`): oikeat tähdet ja Kuu pois (kuvapari).</summary>
        public static bool Pois;
        /// <summary>A/B (`astro kyyti taivas 2`): ISS maan varjossa pakotettuna (tähdet täysinä), kuvapariin, kun testikello osuu
        /// hetkeen, jolloin alapisteessä on yö mutta ISS vielä auringossa (laite taivas1 28.9.: aurinko −19,4° → tähdet 0,3).</summary>
        public static bool VarjoPakko;
        /// <summary>Tähdet ladattu (AstronauttiKerros himmentää satunnaisen kentän kyydissä vain silloin).</summary>
        public bool TahdetValmiit { get; private set; }

        CesiumGeoreference g;
        Camera kamera;
        Material tahtiMat, kuuMat;
        Mesh tahtiMesh, kuuMesh;
        MeshRenderer tahtiPiirto, kuuPiirto;
        bool nakyy;
        // Diagnostiikka (laite taivas1–3 28.9.: oikeita tähtiä ei näkynyt edes pakotetussa varjossa): suunnat ja magnitudit.
        Vector3[] tahtiSuunnat = Array.Empty<Vector3>();
        float[] tahtiMag = Array.Empty<float>();
        float seuraavaLoki;

        public static KyydinTaivas Luo(CesiumGeoreference georeferenssi, Camera kamera)
        {
            var tahti = Resources.Load<Shader>("Varjostimet/KyydinTahdet");
            var kuu = Resources.Load<Shader>("Varjostimet/KyydinKuu");
            if (tahti == null || kuu == null || georeferenssi == null || kamera == null)
            {
                Debug.LogWarning("MATKAKIRJA kyydin taivas: varjostin tai kamera puuttuu");
                return null;
            }
            var go = new GameObject("KyydinTaivas");
            go.transform.SetParent(georeferenssi.transform, false);
            var t = go.AddComponent<KyydinTaivas>();
            t.g = georeferenssi;
            t.kamera = kamera;
            t.tahtiMat = new Material(tahti) { name = "KyydinTahdet" };
            t.kuuMat = new Material(kuu) { name = "KyydinKuu" };
            t.kuuMesh = Nelio();
            // GameObject-piirtäjät Graphics.DrawMeshin sijaan (laite taivas1–3: DrawMeshillä kamerakohtaisesti piirretyt tähdet
            // ja Kuu eivät näkyneet, satunnainen GameObject-tähtikenttä näkyi; elävän kerroksen tilat vaihtavat pääkameran).
            t.kuuPiirto = Piirtaja(go.transform, "KyydinKuu", t.kuuMesh, t.kuuMat);
            t.StartCoroutine(t.HaeTahdet());
            return t;
        }

        public void Nayta(bool paalla) => nakyy = paalla;

        static MeshRenderer Piirtaja(Transform isanta, string nimi, Mesh mesh, Material mat)
        {
            var o = new GameObject(nimi);
            o.transform.SetParent(isanta, false);
            o.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = o.AddComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            r.enabled = false;
            return r;
        }

        IEnumerator HaeTahdet()
        {
            List<object> lista = null;
            yield return HaeTahtiLista(l => lista = l);
            if (lista == null) yield break;
            tahtiMesh = RakennaTahdet(lista, out tahtiSuunnat, out tahtiMag);
            TahdetValmiit = tahtiMesh != null;
            if (tahtiMesh != null) tahtiPiirto = Piirtaja(transform, "KyydinTahdet", tahtiMesh, tahtiMat);
            Debug.Log($"MATKAKIRJA kyydin taivas: {lista.Count} tähteä (BSC5)");
        }

        /// <summary>BSC5-tähtilista ämpäristä välimuistin kautta (myös Tähtitaivas-linssi, TaivasNayttamo); null = ei saatu.</summary>
        public static IEnumerator HaeTahtiLista(Action<List<object>> valmis)
        {
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", "tahdet-bsc5-2026-09-28.json");
            string teksti = null;
            if (File.Exists(polku)) teksti = File.ReadAllText(polku);
            else
            {
                using var p = UnityWebRequest.Get(TahtiUrl);
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success)
                {
                    teksti = p.downloadHandler.text;
                    try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllText(polku, teksti); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA kyydin taivas: välimuisti " + e.Message); }
                }
                else Debug.LogWarning("MATKAKIRJA kyydin taivas: tähdet " + p.error);
            }
            if (teksti == null) { valmis(null); yield break; }
            if (!(Matkakirja.Peli.MiniJson.Jasenna(teksti) is Dictionary<string, object> juuri)
                || !(juuri.TryGetValue("tahdet", out var o) && o is List<object> lista)) { valmis(null); yield break; }
            valmis(lista);
        }

        /// <summary>Neljä kärkeä tähteä kohden: paikka = ECI-yksikkövektori, uv = kulma (±1), uv2 = (koko px, kirkkaus), väri B−V:stä.</summary>
        public static Mesh RakennaTahdet(List<object> lista, out Vector3[] suunnat, out float[] magnitudit)
        {
            int n = lista.Count;
            var sl = new List<Vector3>(n);
            var ml = new List<float>(n);
            var paikat = new Vector3[n * 4];
            var uv = new Vector2[n * 4];
            var uv2 = new Vector2[n * 4];
            var varit = new Color32[n * 4];
            var kolmiot = new int[n * 6];
            var kulmat = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(1, 1) };
            int k = 0;
            for (int i = 0; i < n; i++)
            {
                if (!(lista[i] is List<object> r) || r.Count < 4) continue;
                double ra = Convert.ToDouble(r[0]) * Math.PI / 180, dec = Convert.ToDouble(r[1]) * Math.PI / 180;
                float mag = Convert.ToSingle(r[2]), bv = Convert.ToSingle(r[3]);
                var suunta = new Vector3((float)(Math.Cos(dec) * Math.Cos(ra)), (float)(Math.Cos(dec) * Math.Sin(ra)), (float)Math.Sin(dec));
                // Magnitudi → koko (1,1…4,2 px @1×) ja kirkkaus. Laite cl4/cl5 28.9. (Linssiseppä 2): lineaarinen vuo
                // 10^(−0,4·(m−1)) jätti magnitudin 3–5 tähdet (näkökentän valtaosa) 0,02–0,16:een, joten oikea taivas
                // näytti tyhjältä satunnaiseen kenttään verrattuna. Nyt havaittu kirkkaus kuten tähtikartoissa:
                // neliöjuuri vuosta 10^(−0,2·(m−1)) (m 5 → 0,16, m 3 → 0,40, m 1 → 1, Sirius → 2,5), lattia 0,22.
                float koko = Mathf.Lerp(1.1f, 4.2f, Mathf.Clamp01((4.5f - mag) / 5.5f));
                float kirkkaus = Kirkkaus(mag);
                var vari = (Color32)Vari(bv);
                sl.Add(suunta); ml.Add(mag);
                for (int c = 0; c < 4; c++)
                {
                    paikat[k * 4 + c] = suunta;
                    uv[k * 4 + c] = kulmat[c];
                    uv2[k * 4 + c] = new Vector2(koko, kirkkaus);
                    varit[k * 4 + c] = vari;
                }
                kolmiot[k * 6] = k * 4; kolmiot[k * 6 + 1] = k * 4 + 2; kolmiot[k * 6 + 2] = k * 4 + 1;
                kolmiot[k * 6 + 3] = k * 4 + 1; kolmiot[k * 6 + 4] = k * 4 + 2; kolmiot[k * 6 + 5] = k * 4 + 3;
                k++;
            }
            suunnat = sl.ToArray();
            magnitudit = ml.ToArray();
            if (k == 0) return null;
            var m = new Mesh { name = "KyydinTahdet", indexFormat = IndexFormat.UInt32 };
            m.SetVertices(paikat, 0, k * 4);
            m.SetUVs(0, uv, 0, k * 4);
            m.SetUVs(1, uv2, 0, k * 4);
            m.SetColors(varit, 0, k * 4);
            m.SetTriangles(kolmiot, 0, k * 6, 0);
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f);
            return m;
        }

        /// <summary>Tähden kirkkaus magnitudista (havaittu: neliöjuuri vuosta, lattia 0,22, katto 2,5).</summary>
        public static float Kirkkaus(float mag) => Mathf.Clamp(Mathf.Pow(10f, -0.2f * (mag - 1f)), 0.22f, 2.5f);

        /// <summary>Tähden väri B−V:stä (sininen −0,3 … valkoinen 0 … kellertävä 0,6 … oranssi 1,6).</summary>
        static Color Vari(float bv)
        {
            if (bv < 0f) return Color.Lerp(new Color(0.72f, 0.8f, 1f), Color.white, Mathf.Clamp01((bv + 0.3f) / 0.3f));
            if (bv < 0.6f) return Color.Lerp(Color.white, new Color(1f, 0.95f, 0.84f), bv / 0.6f);
            return Color.Lerp(new Color(1f, 0.95f, 0.84f), new Color(1f, 0.72f, 0.48f), Mathf.Clamp01((bv - 0.6f) / 1.0f));
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "KyydinKuu" };
            m.vertices = new[] { Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero };
            m.uv = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f);
            return m;
        }

        void LateUpdate()
        {
            bool paalla = nakyy && !Pois && kamera != null && g != null;
            if (tahtiPiirto != null) tahtiPiirto.enabled = paalla;
            if (kuuPiirto != null) kuuPiirto.enabled = paalla;
            if (!paalla) return;
            var utc = IssNyt.Kello();
            double jd = Aika.Jd(utc);
            var gt = g.transform;
            // Maailma ← ECEF (georeferenssi) ← ECI (GMST-kierto).
            Vector3 X = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(1, 0, 0))).normalized;
            Vector3 Y = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 1, 0))).normalized;
            Vector3 Z = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized;
            double gm = Aika.Gmst(jd);
            float c = (float)Math.Cos(gm), s = (float)Math.Sin(gm);
            // ECI x-akseli ECEF:ssä = (cos g, −sin g, 0), y = (sin g, cos g, 0), z = z.
            Vector3 ex = X * c - Y * s, ey = X * s + Y * c;

            // Aurinko ja ISS:n varjo (kamera ~ ISS): sylinterivarjo ECEF:ssä.
            var aur = Aurinko.AurinkoEcef(utc);
            Vector3 aurMaailma = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(aur)).normalized;
            var kameraEcef = g.TransformUnityPositionToEarthCenteredEarthFixed((float3)gt.InverseTransformPoint(kamera.transform.position));
            double d = math.dot(kameraEcef, aur);
            bool varjossa = d < 0 && math.lengthsq(kameraEcef - aur * d) < 6_378_137.0 * 6_378_137.0;

            if (tahtiMesh != null)
            {
                tahtiMat.SetVector(IdKiertoX, ex);
                tahtiMat.SetVector(IdKiertoY, ey);
                tahtiMat.SetVector(IdKiertoZ, Z);
                // Päivällä valotus on auringon mukaan: tähdet lähes poissa (Päätoimittaja 30.9.: päivällä yhtä paljon kuin yöllä);
                // kuvaputkessa päivällä tasan 0 (Päätoimittaja 1.10.: ei tähtiä päiväkuviin).
                tahtiMat.SetFloat(IdPeitto, varjossa || VarjoPakko ? 1f : Matkakirja.Natiivi.Avaruus.Kuvaputki ? 0f : 0.04f);
            }

            var kuu = Kuu.Suunta(jd);
            var kuuEcef = Kuu.Ecef((kuu.x, kuu.y, kuu.z), jd);
            Vector3 kuuMaailma = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(
                new double3(kuuEcef.x, kuuEcef.y, kuuEcef.z))).normalized;
            kuuMat.SetVector(IdSuunta, kuuMaailma);
            kuuMat.SetVector(IdAurinko, aurMaailma);
            kuuMat.SetFloat(IdKoko, Mathf.Tan(KuunKulma * 0.5f * Mathf.Deg2Rad));
            if (Time.unscaledTime >= seuraavaLoki) { seuraavaLoki = Time.unscaledTime + 10f; Kirjaa(ex, ey, Z, kuuMaailma, varjossa); }
        }

        /// <summary>Lokiin: kamera, piirtäjät ja näkökentän tähdet (sama muunnos kuin varjostimessa, CPU:lla).</summary>
        void Kirjaa(Vector3 ex, Vector3 ey, Vector3 ez, Vector3 kuu, bool varjossa)
        {
            var paikka = kamera.transform.position;
            int nakyvissa = 0; float kirkkain = 99f; Vector3 kirkkainRuutu = default;
            for (int i = 0; i < tahtiSuunnat.Length; i++)
            {
                var d = tahtiSuunnat[i];
                var v = kamera.WorldToViewportPoint(paikka + (ex * d.x + ey * d.y + ez * d.z) * 1.0e6f);
                if (v.z <= 0 || v.x < 0 || v.x > 1 || v.y < 0 || v.y > 1) continue;
                nakyvissa++;
                if (tahtiMag[i] < kirkkain) { kirkkain = tahtiMag[i]; kirkkainRuutu = v; }
            }
            var kv = kamera.WorldToViewportPoint(paikka + kuu * 1.0e6f);
            Debug.Log($"MATKAKIRJA kyydin taivas: kamera {kamera.name} päällä {kamera.isActiveAndEnabled} maski0 {(kamera.cullingMask & 1) != 0} far {kamera.farClipPlane:F0}, "
                + $"tähdet piirtäjä {(tahtiPiirto != null && tahtiPiirto.enabled)} näkyy {(tahtiPiirto != null && tahtiPiirto.isVisible)}, kentässä {nakyvissa}/{tahtiSuunnat.Length}, "
                + $"kirkkain m {kirkkain:F1} ruudulla ({kirkkainRuutu.x:F2}, {kirkkainRuutu.y:F2}), varjossa {varjossa} pakko {VarjoPakko}, "
                + $"Kuu ({kv.x:F2}, {kv.y:F2}, {(kv.z > 0 ? "edessä" : "takana")}) näkyy {(kuuPiirto != null && kuuPiirto.isVisible)}");
        }

        void OnDestroy()
        {
            if (tahtiMesh != null) Destroy(tahtiMesh);
            if (kuuMesh != null) Destroy(kuuMesh);
            if (tahtiMat != null) Destroy(tahtiMat);
            if (kuuMat != null) Destroy(kuuMat);
        }
    }
}
