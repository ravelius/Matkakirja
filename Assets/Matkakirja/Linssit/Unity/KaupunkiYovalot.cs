// KAUPUNGIN YÖVALOT (kuvanlaatujärjestys kohta 2, Päätoimittaja 6.10.2026; omistaja: natrium-oranssi): Unity-osa. Logiikka ja
// laattaruudukko Ydin/Kierros/KaupunkiYovalot.cs, varjostin Resources/Varjostimet/KaupunkiYovalot.shader. KaupunkiKuvaAjo kutsuu
// Paivita-metodia joka kehys valojen osuudella (0 = päivä → passi pois ja ruudukko vapautetaan). Ruudukko: kameran ympäriltä
// 3 × 3 Black Marble -laattaa (720², R8, ~0,5 Mt) ämpäristä välimuistin kautta (persistentDataPath/kuvat/kaupunki-yovalot);
// ladataan uudelleen vain, kun kamera siirtyy toisen keskilaatan alueelle. Passi URP:n FullScreenPassRendererFeaturena
// jälkikäsittelyn jälkeen, syvyys mukana (ScriptableRenderPassInput.Depth). Euroopan ulkopuolella laattoja ei ole → ei valoja.
using System;
using Object = UnityEngine.Object;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiYovalot
    {
        /// <summary>Viritys (KaupunkiKuva-asetukset "yovalot 0|1", "yohehku" = valosaaste, "yopisteet" = katuvalot, "yosolu" (m),
        /// "yoikkunat" = ikkunoiden voima, "yoikkunaosuus" = palavien ikkunoiden osuus enintään). v2 simun 21.5x kuvista.</summary>
        public static bool Kaytossa = true;
        // v4 (Päätoimittaja 22.3x): valosaaste kevyeksi, katuvalot OSM-katujen mukaan (ei satunnaisia pisteitä), ikkunat harvoiksi.
        public static float Hehku = 0.04f, Pisteet = 1.4f, SoluM = 18f, Ikkunat = 0.8f, IkkunaOsuus = 0.25f;
        /// <summary>Kohteen valaistus (v4): oppaan nykyinen kohde (lat, lon, maan korkeus ellipsoidista m, säde m) saa yöllä lämpimän
        /// valonheiton (Eiffel kultaisena). OpasSovitin asettaa joka kehys; null = ei kohdetta.</summary>
        public static (double lat, double lon, double maaM, double sadeM)? Kohde;
        public static float KohdeVoima = 2.8f;
        /// <summary>Katumaskin tarkkuus (px) ja alue (m): oletus 6 km (testitiedosto), ämpäritiedostossa 2 × r enintään 8 km;
        /// 2048² R8 + mipit ≈ 5,6 Mt (8 km ≈ 3,9 m/px).</summary>
        public const float TieSivuM = 6000f, TieSivuMax = 8000f; public const int TieN = 2048;
        /// <summary>Kaupungin tunnus (KaupunkiTiet.Tunnus Aloituskaupungista); OpasSovitin asettaa.</summary>
        public static string KaupunkiId;
        /// <summary>Natrium-oranssi (omistaja) ja valkoisten LED-pisteiden osuus.</summary>
        public static Color Vari = new Color(1.0f, 0.62f, 0.28f, 0.25f);

        static FullScreenPassRendererFeature feature;
        static Material materiaali;
        static ScriptableRendererData data;
        static Texture2D ruudukko;
        static (int lat, int lon)? kulma, ladataan;
        static HashSet<string> olemassa;
        static bool indeksiHaussa;
        static Texture2D tiet;
        static (double lat, double lon)? tieKeskus;
        static float tieSivu = TieSivuM;
        static string tieId;
        static HashSet<string> tieIndeksi;
        static bool tietHaussa;
        static readonly int IdValot = Shader.PropertyToID("_Valot"), IdMatriisi = Shader.PropertyToID("_MaailmaPaikallinen"),
            IdAlue = Shader.PropertyToID("_ValoAlue"), IdParam = Shader.PropertyToID("_ValoParam"), IdVari = Shader.PropertyToID("_ValoVari"),
            IdIkkunat = Shader.PropertyToID("_IkkunaParam"), IdTiet = Shader.PropertyToID("_Tiet"), IdTieAlue = Shader.PropertyToID("_TieAlue"),
            IdKohde = Shader.PropertyToID("_KohdeP"), IdKohdeParam = Shader.PropertyToID("_KohdeParam");
        const int Koko = Matkakirja.Linssit.Kierros.KaupunkiYovalot.PxAste * Matkakirja.Linssit.Kierros.KaupunkiYovalot.Ruudukko;   // 720

        /// <summary>Kerran kehyksessä kaupunkinäkymässä. osuus 0–1 (hämärä → yö); isanta ajaa latauskorutiinit.</summary>
        public static void Paivita(MonoBehaviour isanta, CesiumGeoreference georef, Camera kamera, double osuus)
        {
            if (!Kaytossa || osuus <= 0.001 || georef == null || kamera == null) { Pois(); return; }
            var ecef = georef.TransformUnityPositionToEarthCenteredEarthFixed(new double3(kamera.transform.position.x, kamera.transform.position.y, kamera.transform.position.z));
            var llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
            double lat = llh.y, lon = llh.x;
            var tarve = Matkakirja.Linssit.Kierros.KaupunkiYovalot.Kulma(lat, lon);
            if (ladataan == null && Matkakirja.Linssit.Kierros.KaupunkiYovalot.Vaihtuu(kulma, lat, lon) && isanta != null)
            {
                ladataan = tarve;
                isanta.StartCoroutine(Lataa(tarve, lat, lon));
            }
            // Kadut: kerran kaupunkia kohden (tunnus vaihtuu → uusi tiedosto).
            if (!tietHaussa && isanta != null && tieId != (KaupunkiId ?? ""))
            { tietHaussa = true; isanta.StartCoroutine(LataaTiet(KaupunkiId, lat, lon)); }
            if (ruudukko == null || kulma == null) return;
            if (feature == null && !Luo()) return;
            materiaali.SetTexture(IdValot, ruudukko);
            materiaali.SetMatrix(IdMatriisi, georef.transform.worldToLocalMatrix);
            materiaali.SetVector(IdAlue, new Vector4(kulma.Value.lon, kulma.Value.lat, (float)georef.latitude, (float)georef.longitude));
            materiaali.SetVector(IdParam, new Vector4((float)osuus, Hehku, Pisteet, Mathf.Max(5f, SoluM)));
            materiaali.SetVector(IdVari, new Vector4(Vari.r, Vari.g, Vari.b, Vari.a));
            materiaali.SetVector(IdIkkunat, new Vector4(Ikkunat, Mathf.Clamp01(IkkunaOsuus), 0f, 0f));
            materiaali.SetTexture(IdTiet, tiet != null ? tiet : Texture2D.blackTexture);
            materiaali.SetVector(IdTieAlue, tieKeskus is (double, double) tk ? new Vector4((float)tk.lat, (float)tk.lon, tieSivu, 1f) : Vector4.zero);
            if (Kohde is (double, double, double, double) ko)
            {
                var u = georef.TransformEarthCenteredEarthFixedPositionToUnity(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(ko.lon, ko.lat, ko.maaM)));
                var pk = georef.transform.worldToLocalMatrix.MultiplyPoint3x4(new Vector3((float)u.x, (float)u.y, (float)u.z));
                materiaali.SetVector(IdKohde, new Vector4(pk.x, pk.y, pk.z, 1f));
                materiaali.SetVector(IdKohdeParam, new Vector4((float)Math.Min(90, Math.Max(25, ko.sadeM * 0.4)), KohdeVoima, 0f, 0f));   // v5: kapeampi (lähikuva kokonaan kultainen)
            }
            else materiaali.SetVector(IdKohde, Vector4.zero);
        }

        static IEnumerator Lataa((int lat, int lon) k, double lat, double lon)
        {
            float t0 = Time.realtimeSinceStartup;
            if (olemassa == null && !indeksiHaussa) yield return HaeIndeksi();
            while (indeksiHaussa) yield return null;
            var px = new byte[Koko * Koko];
            int saatiin = 0, pyydettiin = 0;
            foreach (var (rivi, sarake, nimi) in Matkakirja.Linssit.Kierros.KaupunkiYovalot.Laatat(lat, lon))
            {
                if (olemassa != null && !olemassa.Contains(nimi)) continue;   // pimeä laatta (meri, erämaa)
                pyydettiin++;
                byte[] tavut = null;
                yield return Hae(nimi, b => tavut = b);
                if (tavut == null) continue;
                var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, false);
                if (kuva.LoadImage(tavut, false) && kuva.width == Matkakirja.Linssit.Kierros.KaupunkiYovalot.PxAste && kuva.height == kuva.width)
                {
                    var p = kuva.GetPixels32();   // rivi 0 = laatan eteläreuna
                    int w = kuva.width;
                    for (int y = 0; y < w; y++)
                        for (int x = 0; x < w; x++)
                            px[(rivi * w + y) * Koko + sarake * w + x] = p[y * w + x].r;
                    saatiin++;
                }
                Object.Destroy(kuva);
            }
            if (ruudukko == null)
                ruudukko = new Texture2D(Koko, Koko, TextureFormat.R8, false, true) { name = "KaupunkiYovalot", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            ruudukko.SetPixelData(px, 0);
            ruudukko.Apply(false, false);
            kulma = k; ladataan = null;
            Debug.Log($"MATKAKIRJA kaupunki: yövalot {saatiin}/{pyydettiin} laattaa ({Matkakirja.Linssit.Kierros.KaupunkiYovalot.Nimi(k.lat + 1, k.lon + 1)} keskellä) {Time.realtimeSinceStartup - t0:F1} s:ssa");
        }

        /// <summary>Kadut: esilaskettu ämpäritiedosto (KaupunkiTiet.Juuri, Pelikoodari) kaupungin tunnuksella, jos tunnus on
        /// Pöllön /opas/aineistot-luettelossa (CDN välimuistittaa 404:n), tai testitiedosto Documents/kaupunki-tiet.json. Rasterointi taustasäikeessä
        /// (puhdas C#) tiedoston keskipisteen ympärille, sitten R8-tekstuuri mipeillä (kaukana keskiarvo = katujen tiheys).</summary>
        static IEnumerator LataaTiet(string id, double lat, double lon)
        {
            float t0 = Time.realtimeSinceStartup;
            string json = null, lahde = "ei katuja";
            string testi = Path.Combine(Application.persistentDataPath, "kaupunki-tiet.json");
            if (File.Exists(testi)) { json = File.ReadAllText(testi); lahde = "testitiedosto"; }
            else if (!string.IsNullOrEmpty(id))
            {
                if (tieIndeksi == null)
                {
                    using var ri = UnityWebRequest.Get(PuluChat.Palvelin + "/opas/aineistot");
                    ri.timeout = 15;
                    ri.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                    ri.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                    PolloTestitunnus.Lisaa(ri);
                    yield return ri.SendWebRequest();
                    tieIndeksi = ri.result == UnityWebRequest.Result.Success ? KaupunkiTiet.LueIndeksi(Matkakirja.Peli.MiniJson.Jasenna(ri.downloadHandler.text)) : new HashSet<string>();
                }
                if (tieIndeksi.Contains(id))
                {
                    string polku = Path.Combine(Application.persistentDataPath, "kuvat", "tiet-v1", id + ".json");
                    if (File.Exists(polku)) { json = File.ReadAllText(polku); lahde = "välimuisti"; }
                    else
                    {
                        using var r = UnityWebRequest.Get(KaupunkiTiet.Juuri + id + ".json");
                        r.timeout = 25;
                        yield return r.SendWebRequest();
                        lahde = r.result == UnityWebRequest.Result.Success ? "ämpäri" : "ämpäri " + r.responseCode;
                        if (r.result == UnityWebRequest.Result.Success)
                        {
                            json = r.downloadHandler.text;
                            try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllText(polku, json); } catch (Exception) { }
                        }
                    }
                }
                else lahde = "ei luettelossa";
            }
            byte[] maski = null; int maara = 0; double kLat = lat, kLon = lon, sivu = TieSivuM;
            if (json != null)
            {
                var tehtava = System.Threading.Tasks.Task.Run(() =>
                {
                    var j = Matkakirja.Peli.MiniJson.Jasenna(json) as Dictionary<string, object>;
                    if (KaupunkiTiet.Alue(j) is (double, double, double) a) { kLat = a.Item1; kLon = a.Item2; sivu = Math.Min(TieSivuMax, 2 * a.Item3); }
                    var l = KaupunkiTiet.Lue(j);
                    maara = l.Count;
                    return KaupunkiTiet.Rasteroi(l, kLat, kLon, TieN, sivu);
                });
                while (!tehtava.IsCompleted) yield return null;
                if (!tehtava.IsFaulted) maski = tehtava.Result;
            }
            if (maski != null)
            {
                if (tiet == null) tiet = new Texture2D(TieN, TieN, TextureFormat.R8, true, true) { name = "KaupunkiTiet", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
                tiet.SetPixelData(maski, 0);
                tiet.Apply(true, false);
                tieKeskus = (kLat, kLon); tieSivu = (float)sivu;
            }
            tieId = id ?? "";   // epäonnistuessakin: ei uutta yritystä ennen kaupungin vaihtoa
            tietHaussa = false;
            Debug.Log($"MATKAKIRJA kaupunki: yövalojen kadut {maara} kpl ({id}, {lahde}) {Time.realtimeSinceStartup - t0:F1} s:ssa");
        }

        static IEnumerator HaeIndeksi()
        {
            indeksiHaussa = true;
            using (var r = UnityWebRequest.Get(Matkakirja.Linssit.Kierros.KaupunkiYovalot.Juuri + "index.json"))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success
                    && Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j
                    && j.TryGetValue("laatat", out var l) && l is IList<object> lista)
                {
                    olemassa = new HashSet<string>();
                    foreach (var x in lista) if (x is string s) olemassa.Add(s);
                }
                else Debug.Log($"MATKAKIRJA kaupunki: yövalojen luettelo ei latautunut ({r.responseCode}), haetaan kaikki laatat");
            }
            indeksiHaussa = false;
        }

        static IEnumerator Hae(string nimi, System.Action<byte[]> valmis)
        {
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", "kaupunki-yovalot", nimi + ".jpg");
            if (File.Exists(polku)) { valmis(File.ReadAllBytes(polku)); yield break; }
            using var r = UnityWebRequest.Get(Matkakirja.Linssit.Kierros.KaupunkiYovalot.Juuri + nimi + ".jpg");
            r.timeout = 15;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { valmis(null); yield break; }
            var tavut = r.downloadHandler.data;
            try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, tavut); }
            catch (System.Exception e) { Debug.LogWarning("MATKAKIRJA kaupunki: yövalojen välimuisti " + e.Message); }
            valmis(tavut);
        }

        static bool Luo()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/KaupunkiYovalot");
            if (varjostin == null || !(GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) || urp.rendererDataList.Length == 0)
            { Debug.Log("MATKAKIRJA kaupunki: yövalot ei käytettävissä (varjostin tai URP puuttuu)"); Kaytossa = false; return false; }
            data = urp.rendererDataList[0];
            if (data == null) return false;
            materiaali = new Material(varjostin) { name = "KaupunkiYovalot" };
            feature = ScriptableObject.CreateInstance<FullScreenPassRendererFeature>();
            feature.name = "Matkakirja kaupunki yövalot";
            feature.injectionPoint = FullScreenPassRendererFeature.InjectionPoint.AfterRenderingPostProcessing;
            feature.fetchColorBuffer = true;
            feature.requirements = ScriptableRenderPassInput.Depth;
            feature.passMaterial = materiaali;
            feature.passIndex = 0;
            data.rendererFeatures.Add(feature);
            data.SetDirty();
            Debug.Log("MATKAKIRJA kaupunki: yövalot päällä");
            return true;
        }

        /// <summary>Passi pois ja ruudukko vapaaksi (päivä). suljettu = näkymä suljettiin: latauskorutiini kuoli isännän mukana.</summary>
        public static void Pois(bool suljettu = false)
        {
            if (suljettu)
            {
                ladataan = null; tietHaussa = false; tieKeskus = null; tieId = null;
                if (tiet != null) { Object.Destroy(tiet); tiet = null; }
            }
            if (feature != null)
            {
                if (data != null) { data.rendererFeatures.Remove(feature); data.SetDirty(); }
                Object.Destroy(feature);
                if (materiaali != null) Object.Destroy(materiaali);
                feature = null; materiaali = null; data = null;
                Debug.Log("MATKAKIRJA kaupunki: yövalot pois");
            }
            if (ruudukko != null && ladataan == null) { Object.Destroy(ruudukko); ruudukko = null; kulma = null; }
        }
    }
}
