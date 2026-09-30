// YÖKUORI (ISS:n kyyti, Linssiseppä 28.9.2026): väliaikainen päivä ja yö astronautin kameraan, kunnes pallolla on oma
// terminaattori (Natiiviseppä 28.9.: ei jonossa; linssin oma kerros, ei tileset-varjostimeen eikä RenderSettingseihin).
// Pallokuori 1,012 × säde (pilvikuoren 1,01 yllä), tumma yöpuolella auringon suunnan mukaan (Aurinko.AurinkoEcef, UTC) ja
// 6°:n hämäräkaista. Näkyy kyydissä (seuranta ja ikkuna); kaukonäkymä pysyy webin kaltaisena (web on malli).
// KAUPUNKIEN VALOT (omistaja 28.9. klo 12.3x): Black Marble -kuvat ämpäristä (linssit/astronautin-kamera/iss-yovalot-
// 2026-09-28/: Eurooppa Z6 ja maailma Z3, 2048², Web Mercator), välimuisti persistentDataPath/kuvat, yksikanavaisiksi (R8,
// mipmapit, 2 × 5,6 Mt); haetaan kuoren luonnissa (linssin avaus: kyyti on yhden napautuksen päässä). Varjostin leikkaa
// katsesäteen maan pintaan ja lisää valot yön päälle (Yokuori.shader). Aurinko ja ISS samasta kellosta (IssNyt.Kello:
// testikomento astro kyyti kello). A/B: astro kyyti valot 0|1.
// AURINGON HEIJASTUS (ISS-realismi 1): vesimaski reliefipyramidin vesiväristä (iss-vesi-2026-09-28/, sama rajaus), valot ja
// vesi samaan RG16-kuvaan (R = valot, G = vesi, 2 × 8 Mt + mipit). A/B: astro kyyti kiilto 0|1 ja varjo 0|1.
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
            IdPeitto = Shader.PropertyToID("_Peitto"), IdAkseli = Shader.PropertyToID("_Akseli"), IdNolla = Shader.PropertyToID("_Nolla"), IdIta = Shader.PropertyToID("_Ita"),
            IdR = Shader.PropertyToID("_R"), IdLitistys = Shader.PropertyToID("_Litistys"), IdValot = Shader.PropertyToID("_Valot"),
            IdValotEu = Shader.PropertyToID("_ValotEu"), IdValotMaa = Shader.PropertyToID("_ValotMaa"),
            IdKiilto = Shader.PropertyToID("_Kiilto"), IdVarjo = Shader.PropertyToID("_Varjo"),
            IdPilvet = Shader.PropertyToID("_Pilvet"), IdPilvetOn = Shader.PropertyToID("_PilvetOn"), IdPilviPeitto = Shader.PropertyToID("_PilviPeitto");
        const string ValoJuuri = "https://media.matkakirja.app/linssit/astronautin-kamera/iss-yovalot-2026-09-28/",
            VesiJuuri = "https://media.matkakirja.app/linssit/astronautin-kamera/iss-vesi-2026-09-28/";
        /// <summary>
        /// Valojen voimakkuus (HDR: suurkaupunkien ytimet hehkuvat bloomissa). Omistaja 28.9. laitekuvasta: "valot palavat puhki"
        /// → vertailu 100 / 80 / 60 % → 60 %, eli 1,6 × 0,6 = 0,96.
        /// </summary>
        public const float ValojenVoima = 0.96f;
        /// <summary>A/B (`astro kyyti valot 0|1`): kaupunkien valot pois kuvaparia varten.</summary>
        public static bool ValotPois;
        /// <summary>
        /// Valojen osuus täydestä (A/B `astro kyyti valot <0…1>`, esim. 0.8): omistaja 28.9. klo 14.1x laitekuvasta "valot
        /// palavat puhki. miltä näyttää, jos pidetään esim 80% peitolla?" — vertailu 1 / 0,8 / 0,6 samasta kulmasta.
        /// </summary>
        public static float ValojenOsuus = 1f;
        /// <summary>A/B (`astro kyyti kiilto 0|1`, `astro kyyti varjo 0|1`): heijastus ja päiväpuolen varjostus pois.</summary>
        public static bool KiiltoPois, VarjoPois;
        public const float KiillonVoima = 6f, VarjonVoima = 0.55f;
        Texture2D valotEu, valotMaa;
        MeshRenderer piirto;

        CesiumGeoreference g;
        Material materiaali;
        float paivitetty = -10f;
        DateTime aurinkoUtc;

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
            byte[] lEu = null, vEu = null, lMaa = null, vMaa = null;
            int w = 0, h = 0;
            yield return Hae(ValoJuuri + "eurooppa-2048.jpg", "iss-yovalot-eurooppa-2048.jpg", (k, kw, kh) => { lEu = k; w = kw; h = kh; });
            yield return Hae(VesiJuuri + "eurooppa-2048.png", "iss-vesi-eurooppa-2048.png", (k, _, _) => vEu = k);
            valotEu = Yhdista(lEu, vEu, w, h, TextureWrapMode.Clamp, "eurooppa");
            yield return Hae(ValoJuuri + "maailma-2048.jpg", "iss-yovalot-maailma-2048.jpg", (k, kw, kh) => { lMaa = k; w = kw; h = kh; });
            yield return Hae(VesiJuuri + "maailma-2048.png", "iss-vesi-maailma-2048.png", (k, _, _) => vMaa = k);
            valotMaa = Yhdista(lMaa, vMaa, w, h, TextureWrapMode.Repeat, "maailma");
            if (vMaa != null && w == 2048 && h == 2048)
            {
                // CPU-kopio 1024² (testikomento astro kyyti kello kiilto: onko katsekohde vettä).
                VesiMaailma = new byte[1024 * 1024];
                for (int y = 0; y < 1024; y++)
                    for (int x = 0; x < 1024; x++)
                        VesiMaailma[y * 1024 + x] = vMaa[(y * 2) * 2048 + x * 2];
            }
            if (valotEu != null) materiaali.SetTexture(IdValotEu, valotEu);
            if (valotMaa != null) materiaali.SetTexture(IdValotMaa, valotMaa);
            Debug.Log($"MATKAKIRJA linssit: yövalot eurooppa {(lEu != null ? "ok" : "puuttuu")}, maailma {(lMaa != null ? "ok" : "puuttuu")}; " +
                      $"vesi eurooppa {(vEu != null ? "ok" : "puuttuu")}, maailma {(vMaa != null ? "ok" : "puuttuu")}");
        }

        /// <summary>Maailman vesimaski 1024² (Web Mercator, rivi 0 alhaalla kuten Unityssä) tai null; testejä varten.</summary>
        public static byte[] VesiMaailma;

        /// <summary>Onko piste vettä maailman vesimaskissa (null = maskia ei ole: tosi).</summary>
        public static bool OnVesi(double lat, double lon)
        {
            if (VesiMaailma == null) return true;
            double la = Math.Max(-85.05, Math.Min(85.05, lat)) * Math.PI / 180;
            double m = 0.5 - Math.Log(Math.Tan(Math.PI / 4 + la / 2)) / (2 * Math.PI);
            int x = (int)((lon + 180) / 360 * 1024) & 1023, y = 1023 - Math.Min(1023, Math.Max(0, (int)(m * 1024)));
            return VesiMaailma[y * 1024 + x] > 128;
        }

        /// <summary>RG16: R = valojen luminanssi, G = vesi; mipmapit, ei CPU-kopiota. null, jos valot puuttuvat.</summary>
        static Texture2D Yhdista(byte[] valot, byte[] vesi, int w, int h, TextureWrapMode kaarre, string nimi)
        {
            if (valot == null) return null;
            var t = new Texture2D(w, h, TextureFormat.RG16, true, true)
                { name = "iss-valot-" + nimi, wrapMode = kaarre, filterMode = FilterMode.Trilinear, anisoLevel = 2 };
            var kohde = t.GetPixelData<byte>(0);
            bool vesiOk = vesi != null && vesi.Length == valot.Length;
            for (int i = 0, n = w * h; i < n; i++)
            {
                kohde[2 * i] = valot[i];
                kohde[2 * i + 1] = vesiOk ? vesi[i] : (byte)0;
            }
            t.Apply(true, true);
            return t;
        }

        /// <summary>Kuva ämpäristä tai välimuistista luminanssiksi (tavu pikseliä kohden, rivi 0 alhaalla); null = ei saatu.</summary>
        static IEnumerator Hae(string url, string tiedosto, Action<byte[], int, int> valmis)
        {
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", tiedosto);
            byte[] tavut = null;
            if (File.Exists(polku)) tavut = File.ReadAllBytes(polku);
            else
            {
                using var p = UnityWebRequest.Get(url);
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success)
                {
                    tavut = p.downloadHandler.data;
                    try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, tavut); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA yövalot: välimuisti " + e.Message); }
                }
                else Debug.LogWarning($"MATKAKIRJA yövalot: {tiedosto} {p.error}");
            }
            if (tavut == null) { valmis(null, 0, 0); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            if (!kuva.LoadImage(tavut, false)) { Destroy(kuva); valmis(null, 0, 0); yield break; }
            var px = kuva.GetPixels32();
            var l = new byte[px.Length];
            for (int i = 0; i < px.Length; i++) l[i] = (byte)((px[i].r * 54 + px[i].g * 183 + px[i].b * 19) >> 8);
            int kw = kuva.width, kh = kuva.height;
            Destroy(kuva);
            valmis(l, kw, kh);
        }

        /// <summary>
        /// Päivän pilvet (ISS-realismi 2): paksut pilvet peittävät kaupunkien valot ja auringon heijastuksen (valo · (1 − 0,85 alfa)),
        /// kun pilvet näkyvät kyydissä (Siirtosepän löydös 28.9.: ennen pilviä ei kyydissä piirretty lainkaan). null = ei pilviä.
        /// </summary>
        public void Pilvet(Texture kuva)
        {
            materiaali.SetTexture(IdPilvet, kuva != null ? kuva : Texture2D.blackTexture);
            materiaali.SetFloat(IdPilvetOn, kuva != null ? 1f : 0f);
        }

        /// <summary>Pilvikuoren nykyinen peitto (0…1): himmennys seuraa näkyviä pilviä (A/B `astro kyyti pilvet pois` → 0).</summary>
        /// <summary>Pilvipeiton säädin (sama kynnys kuin Pilvikuori.Karsinta).</summary>
        public void Karsinta(float kynnys) => materiaali.SetFloat(IdKarsinta, Mathf.Clamp01(kynnys));
        static readonly int IdKarsinta = Shader.PropertyToID("_Karsinta");

        public void PilvienPeitto(float peitto)
        {
            if (Mathf.Approximately(pilviPeitto, peitto)) return;
            pilviPeitto = peitto;
            materiaali.SetFloat(IdPilviPeitto, peitto);
        }

        float pilviPeitto = -1f;

        /// <summary>Näkyviin tai pois (kyydissä näkyvissä, ellei A/B pois).</summary>
        public void Nayta(bool nakyvissa)
        {
            bool n = nakyvissa && !Pois;
            if (piirto.enabled != n) piirto.enabled = n;
            if (n) paivitetty = -10f;
        }

        void LateUpdate()
        {
            // Aurinko liikkuu 0,25°/min: suunta kerran sekunnissa riittää (vain piirrettäessä). Myös sekunnin välein simuloitua
            // aikaa (web kaari.aseta): nopeutettuna (1000×: 4°/s) päivitys on joka kehys, eikä terminaattori hypi.
            if (!piirto.enabled) return;
            var utc = Matkakirja.Linssit.Iss.IssNyt.Kello();
            if (Time.unscaledTime - paivitetty < 1f && Math.Abs((utc - aurinkoUtc).TotalSeconds) < 1) return;
            paivitetty = Time.unscaledTime;
            aurinkoUtc = utc;
            var gt = g.transform;
            var a = (Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(utc));
            materiaali.SetVector(IdAurinko, gt.TransformDirection(a).normalized);
            materiaali.SetVector(IdKeskus, transform.position);
            materiaali.SetVector(IdAkseli, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized);
            materiaali.SetVector(IdNolla, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(1, 0, 0))).normalized);
            materiaali.SetVector(IdIta, gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 1, 0))).normalized);
            materiaali.SetFloat(IdValot, ValotPois || valotEu == null && valotMaa == null ? 0f : ValojenVoima * ValojenOsuus);
            materiaali.SetFloat(IdKiilto, KiiltoPois ? 0f : KiillonVoima);
            materiaali.SetFloat(IdVarjo, VarjoPois ? 0f : VarjonVoima);
            // Fotorealismi 3–4 (30.9.): pilvien varjot ja kuunvalo.
            materiaali.SetFloat("_PilviVarjo", PilviVarjoPois ? 0f : PilviVarjonVoima);
            materiaali.SetFloat("_PilviKorkeus", PilviKorkeusM);
            double jd = Matkakirja.Linssit.Iss.Aika.Jd(utc);
            var kuu = Matkakirja.Linssit.Iss.Kuu.Suunta(jd);
            var ke = Matkakirja.Linssit.Iss.Kuu.Ecef((kuu.x, kuu.y, kuu.z), jd);
            var kd = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(ke.x, ke.y, ke.z))).normalized;
            materiaali.SetVector("_Kuu", new Vector4(kd.x, kd.y, kd.z, (float)Matkakirja.Linssit.Iss.Kuu.Vaihe(jd).valaistu));
            materiaali.SetFloat("_KuuVoima", KuunvaloPois ? 0f : KuunvalonVoima);
            materiaali.SetFloat("_TaivasHeijastus", TaivasHeijastusPois ? 0f : 0.3f);
        }

        /// <summary>Fotorealismi osa 3: pilvien varjot maahan (A/B `astro kyyti pilvivarjo 0|1`); korkeus = kyydin pilvikuori 8 km.</summary>
        public static bool PilviVarjoPois = true;   // junassa pois (fotorealismi A/B)
        public static float PilviVarjonVoima = 0.5f, PilviKorkeusM = 8000f;
        /// <summary>Fotorealismi osa 4: kuunvalo yöpuolelle ja pilviin (A/B `astro kyyti kuunvalo 0|1`).</summary>
        public static bool KuunvaloPois = true;   // junassa pois (fotorealismi A/B)
        /// <summary>Fotorealismi osa 2: taivaan Fresnel-heijastus vesiltä (A/B `astro kyyti fresnel 0|1`).</summary>
        public static bool TaivasHeijastusPois = true;   // junassa pois (fotorealismi A/B)
        public static float KuunvalonVoima = 0.35f;

        void OnDestroy()
        {
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            if (valotEu != null) Destroy(valotEu);
            if (valotMaa != null) Destroy(valotMaa);
            Destroy(materiaali);
        }
    }
}
