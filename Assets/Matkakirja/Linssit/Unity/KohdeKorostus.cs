// KOHTEEN MUOTOA SEURAAVA KOROSTUS, UNITY-OSA (Linssiseppä 9.10.2026; omistaja: "parempi korostus kohteisiin kuin nykyinen pyöreä
// pilvi", PT 00.52, juna 170): kun kohteella on pohjapiirros (Resources/Elava/muodot-<kaupunki>.json, tyokalut/kohde_muodot.py:
// Karttasepän OSM-jalanjäljet Wikidata-tunnuksella, varana aukion oma muoto), Ydin KohdeMuoto rasteroi sen maskiksi ja
// FullScreenPassRendererFeature (KohdeKorostus.shader) valaisee muodon kultaiseksi: hehku saapuessa, sitten heikko (A1:n ajoitus
// OpasKorostusKuvasta), yöllä julkisivuvalona (KaupunkiYovalot.Osuus). Muodon kanssa pyöreä rengas ja yön pyöreä kohdevalo jäävät
// pois (OpasSovitin); ilman muotoa ne kuten ennen. Maa omasta korkeusmallista (kehyksen maa). Krediitti OSM ODbL.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KohdeKorostus
    {
        public static bool Paalla = true;
        /// <summary>Muoto näkyy nyt (OpasSovitin jättää renkaan ja yön kohdevalon pois).</summary>
        public static bool Kaytossa => maski != null && !haivytetty;
        public const float AariviivaVoima = 1f, OletusKorkeusM = 25f;

        static readonly Dictionary<string, Dictionary<string, object>> muodot = new Dictionary<string, Dictionary<string, object>>();
        static FullScreenPassRendererFeature feature; static Material materiaali; static ScriptableRendererData data;
        static Texture2D maski; static KohdeMuoto muoto;
        static double lat, lon, maaM; static float korkeus, alku, poisAlku = -1f; static bool haivytetty;
        static readonly int IdMaski = Shader.PropertyToID("_Maski"), IdMatriisi = Shader.PropertyToID("_MaailmaKohde"),
            IdAlue = Shader.PropertyToID("_MaskiAlue"), IdParam = Shader.PropertyToID("_KorostusParam");

        static Dictionary<string, object> Kaupunki(string id)
        {
            if (id == null) return null;
            if (muodot.TryGetValue(id, out var m)) return m;
            var ta = Resources.Load<TextAsset>("Elava/muodot-" + id);
            m = ta != null ? MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(ta.text)), "kohteet")) : null;
            if (ta != null) Resources.UnloadAsset(ta);
            muodot[id] = m; return m;
        }

        /// <summary>Saapuessa: true, jos kohteella on muoto (silloin rengas jää pois).</summary>
        public static bool Nayta(string kaupunkiId, OpasKohde k, double maa)
        {
            Piilota(true);
            if (!Paalla || k?.Id == null) return false;
            var kk = Kaupunki(kaupunkiId);
            if (kk == null || !kk.TryGetValue(k.Id, out var mo) || !(mo is Dictionary<string, object> d)) return false;
            var renkaat = new List<List<(double x, double z)>>();
            foreach (var ro in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "renkaat")))
            {
                var r = new List<(double lat, double lon)>();
                foreach (var p in MiniJson.TaulukkoTaiTyhja(ro)) { var a = MiniJson.TaulukkoTaiTyhja(p); if (a.Count >= 2) r.Add((System.Convert.ToDouble(a[0]), System.Convert.ToDouble(a[1]))); }
                if (r.Count >= 3) renkaat.Add(KohdeMuoto.Enu(r, k.Lat, k.Lon));
            }
            muoto = KohdeMuoto.Rasteroi(renkaat);
            if (muoto == null) return false;
            maski = new Texture2D(muoto.N, muoto.N, TextureFormat.R8, false, true) { name = "Kohteen muoto " + k.Nimi, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            maski.SetPixelData(muoto.Maski, 0); maski.Apply(false, true);
            lat = k.Lat; lon = k.Lon; maaM = maa;
            double kr = MiniJson.Luku(d, "korkeus_m") ?? 0;
            korkeus = (float)(kr > 0 ? kr : MiniJson.Teksti(d, "laji") == "alue" ? 6 : System.Math.Max(OletusKorkeusM, k.KorkeusM));
            alku = Time.unscaledTime; poisAlku = -1f; haivytetty = false;
            Debug.Log($"MATKAKIRJA linssit: opas: muotokorostus {k.Nimi} ({MiniJson.Teksti(d, "laji")}, {renkaat.Count} rengasta, korkeus {korkeus:F0} m)");
            return true;
        }

        public static void Piilota(bool heti = false)
        {
            if (maski == null) return;
            if (!heti) { if (poisAlku < 0) poisAlku = Time.unscaledTime; return; }
            Object.Destroy(maski); maski = null; muoto = null; haivytetty = true; Pois();
        }

        /// <summary>Joka kehys (OpasSovitin): passi päälle muodon ajaksi, voima A1:n ajoituksella.</summary>
        public static void Paivita(CesiumGeoreference g)
        {
            if (maski == null || g == null) { Pois(); return; }
            float t = Time.unscaledTime;
            float sisaan = Mathf.SmoothStep(0, 1, (t - alku) / OpasKorostusKuva.HaivytysS);
            float pois = poisAlku < 0 ? 1 : 1 - Mathf.SmoothStep(0, 1, (t - poisAlku) / OpasKorostusKuva.PoistoS);
            float hehku = Mathf.Lerp(1f, OpasKorostusKuva.HeikkoOsuus, Mathf.SmoothStep(0f, 1f, (t - alku - OpasKorostusKuva.HehkuS) / OpasKorostusKuva.HehkuLaskuS));
            float voima = sisaan * pois * hehku * Mathf.SmoothStep(0f, 1f, OpasKorostusKuva.Osuus);
            if (poisAlku >= 0 && pois <= 0) { Piilota(true); return; }
            if (feature == null && !Luo()) return;
            var u = g.TransformEarthCenteredEarthFixedPositionToUnity(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, maaM)));
            var pk = g.transform.worldToLocalMatrix.MultiplyPoint3x4(new Vector3((float)u.x, (float)u.y, (float)u.z));
            materiaali.SetMatrix(IdMatriisi, Matrix4x4.Translate(-pk) * g.transform.worldToLocalMatrix);
            materiaali.SetTexture(IdMaski, maski);
            materiaali.SetVector(IdAlue, new Vector4((float)muoto.KulmaX, (float)muoto.KulmaZ, (float)muoto.SivuM, 1f));
            // Eiffel (Päätoimittaja 9.10., SETE): ei yön julkisivuvaloa korostuksessa (päivän korostus säilyy, yöllä himmeä).
            materiaali.SetVector(IdParam, new Vector4(OpasSovitin.OnEiffel(lat, lon) ? voima * (1f - 0.7f * KaupunkiYovalot.Osuus) : voima, OpasSovitin.OnEiffel(lat, lon) ? 0f : KaupunkiYovalot.Osuus, korkeus, AariviivaVoima));
        }

        static bool Luo()
        {
            var v = Shader.Find("Matkakirja/Linssit/KohdeKorostus");
            if (v == null || !(GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) || urp.rendererDataList.Length == 0) { Paalla = false; return false; }
            data = urp.rendererDataList[0];
            if (data == null) return false;
            materiaali = new Material(v) { name = "KohdeKorostus" };
            feature = ScriptableObject.CreateInstance<FullScreenPassRendererFeature>();
            feature.name = "Matkakirja kohteen muotokorostus";
            // JUURISYY 9.10. (oma simudiagnoosi 3910d569: passi violettina koko ruudulla, maailmanpaikka tyhjä): AfterRenderingPostProcessing
            // ajetaan kamerapinossa vain viimeiselle kameralle (korin ja kuvun päällyskamerat), jonka syvyys on tyhjä → kaupungin pikselit
            // ohitettiin taivaana. Peruskameran vaiheessa ennen jälkikäsittelyä syvyys on kaupungin (valotus kompensoidaan varjostimessa).
            feature.injectionPoint = FullScreenPassRendererFeature.InjectionPoint.BeforeRenderingPostProcessing;
            feature.fetchColorBuffer = true; feature.requirements = ScriptableRenderPassInput.Depth;
            feature.passMaterial = materiaali; feature.passIndex = 0;
            data.rendererFeatures.Add(feature); data.SetDirty();
            return true;
        }

        static void Pois()
        {
            if (feature == null) return;
            if (data != null) { data.rendererFeatures.Remove(feature); data.SetDirty(); }
            Object.Destroy(feature); if (materiaali != null) Object.Destroy(materiaali);
            feature = null; materiaali = null; data = null;
        }
    }
}
