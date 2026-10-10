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
        /// <summary>Diagnoosi (komento opas yovalot N): 0 normaali, 1 passi violettina, 2 maailmanpaikka, 3 Black Marble, 4 lisävalo × 5.</summary>
        public static float Diagnoosi;
        static readonly int IdDebug = Shader.PropertyToID("_ValoDebug");
        public static float Hehku = 0.04f, Pisteet = 1.4f, SoluM = 18f, Ikkunat = 0.8f, IkkunaOsuus = 0.25f;
        /// <summary>Kohteen valaistus (v4): oppaan nykyinen kohde (lat, lon, maan korkeus ellipsoidista m, säde m) saa yöllä lämpimän
        /// valonheiton (Eiffel kultaisena). OpasSovitin asettaa joka kehys; null = ei kohdetta.</summary>
        public static (double lat, double lon, double maaM, double sadeM)? Kohde;
        public static float KohdeVoima = 2.8f;
        // v6 (Linssiseppä 9.10., kehityskaupungit Tukholma ja Pariisi, PT): kierroksen muut maamerkit valaistuina (julkisivuvalo maasta
        // ylöspäin, heikompi kuin nykyinen kohde) ja veden heijastukset: vesimaskin (Resources/Elava/vesi-<id>-maski, 8 m, 12,3 km
        // keskustan ympäriltä; tyokalut/yovalot_vesi.py) vedellä rantavalot katsesuunnassa ja valaistujen maamerkkien kultaiset juovat
        // aaltoilevina (fresnel, aaltojen välke). Valo on värin lisäys laattojen päälle (Map Tiles C2), ei geometrian muutos.
        /// <summary>Kierroksen maamerkit (lat, lon, maan korkeus ellipsoidista, säde m); OpasSovitin asettaa kehityskaupungeissa.</summary>
        public static readonly List<(double lat, double lon, double maaM, double sadeM)> Maamerkit = new List<(double, double, double, double)>();
        public static float MaamerkkiVoima = 1.5f, Heijastus = 1f;
        // v12 (Linssiseppä 10.10., PT: yövalot 174/175 ilman lisämuistia): Karttasepän OSM-lamput (katuvalot, valaistut tiet ja sillat,
        // rantavalot) ja valaistut alueet (kentät, kohteet) vesimaskin vapaissa kanavissa (tyokalut/yovalot_lamput.py: G = lamppu, B = paikka
        // solussa, A = alue). Sama RGBA32-tekstuuri → 0 Mt lisää. Maskin alueella lamput ovat oikeilla paikoillaan (ei solukon arvontaa)
        // ja rantojen heijastukset tulevat lamppujen tiheydestä; muualla ennallaan. KaupunkiKuva-asetus "yolamput 0|1", "yoalueet" = voima.
        public static bool OsmLamput = true;
        // v13 IKKUNAT (Linssiseppä 10.10., Karttasepän OSM-rakennukset, tyokalut/yovalot_ikkunat.py): Resources/Elava/ikkunat-<id>.bytes
        // (gzip, R8 1536², sama ruudukko kuin vesimaski) → R8-tekstuuri ilman mippejä ja CPU-kopiota (2,36 Mt GPU). Kytkin "yoikkunadata
        // 0|1", "yoikkunakerroin" (datan osuuden kerroin; 0,6 → asunnot ~23 % klo 21–24, ennen enintään ~17 %).
        public static bool IkkunaData = true;
        public static float IkkunaKerroin = 0.6f;
        static Texture2D ikkunat;
        public static float AlueVoima = 1f;
        static bool vesiLamput;
        public const int MaamerkkejaMax = 8;
        public const float VesiSivuM = 12288f;
        static Texture2D vedet; static string vedetId; static (double lat, double lon)? vesiKeskus;
        static readonly Vector4[] maamerkit = new Vector4[MaamerkkejaMax];
        /// <summary>Kohdevalon häivytys 0–1 (OpasSilmukka.KorostusOsuus; Päätoimittaja 8.10. 07.5x: valo hyppäsi yhdessä ruudussa).</summary>
        public static float KohdeOsuus = 1f;
        /// <summary>Katumaskin tarkkuus (px) ja alue (m): oletus 6 km (testitiedosto), ämpäritiedostossa 2 × r enintään 12 km;
        /// 2048² R8 + mipit ≈ 5,6 Mt (8 km ≈ 3,9 m/px; isot kaupungit r 6000 → 12 km ≈ 5,9 m/px).</summary>
        public const float TieSivuM = 6000f, TieSivuMax = 12000f; public const int TieN = 2048;
        /// <summary>Kaupungin tunnus (KaupunkiTiet.Tunnus Aloituskaupungista); OpasSovitin asettaa.</summary>
        public static string KaupunkiId;
        /// <summary>Natrium-oranssi (omistaja) ja valkoisten LED-pisteiden osuus.</summary>
        public static Color Vari = new Color(1.0f, 0.62f, 0.28f, 0.25f);

        static bool luotu;
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
        static Dictionary<string, string> tiePolut;
        static bool tietHaussa;
        static readonly int IdValot = Shader.PropertyToID("_Valot"), IdMatriisi = Shader.PropertyToID("_MaailmaPaikallinen"),
            IdAlue = Shader.PropertyToID("_ValoAlue"), IdParam = Shader.PropertyToID("_ValoParam"), IdVari = Shader.PropertyToID("_ValoVari"),
            IdIkkunat = Shader.PropertyToID("_IkkunaParam"), IdTiet = Shader.PropertyToID("_Tiet"), IdTieAlue = Shader.PropertyToID("_TieAlue"),
            IdKohde = Shader.PropertyToID("_KohdeP"), IdKohdeParam = Shader.PropertyToID("_KohdeParam"),
            IdVedet = Shader.PropertyToID("_Vedet"), IdVesiAlue = Shader.PropertyToID("_VesiAlue"), IdKamera = Shader.PropertyToID("_KameraP"),
            IdMaamerkit = Shader.PropertyToID("_Maamerkit"), IdMaamerkkiParam = Shader.PropertyToID("_MaamerkkiParam"),
            IdLamppuParam = Shader.PropertyToID("_LamppuParam"), IdIkkunat = Shader.PropertyToID("_Ikkunat"), IdIkkunaData = Shader.PropertyToID("_IkkunaData");
        const int Koko = Matkakirja.Linssit.Kierros.KaupunkiYovalot.PxAste * Matkakirja.Linssit.Kierros.KaupunkiYovalot.Ruudukko;   // 720

        /// <summary>Kerran kehyksessä kaupunkinäkymässä. osuus 0–1 (hämärä → yö); isanta ajaa latauskorutiinit.</summary>
        /// <summary>Yön osuus 0–1 viimeisimmästä päivityksestä (KohdeKorostus: julkisivuvalo yöllä).</summary>
        public static float Osuus { get; private set; }
        /// <summary>Ikkunavalojen osuus 0–1 (iltaikkunat: syttyvät ennen katuvaloja).</summary>
        public static float IkkunaOsuusNyt { get; private set; }
        public static void Paivita(MonoBehaviour isanta, CesiumGeoreference georef, Camera kamera, double osuus, double ikkunaOsuus = -1)
        {
            if (ikkunaOsuus < 0) ikkunaOsuus = osuus;
            IkkunaOsuusNyt = Kaytossa ? (float)System.Math.Max(0, System.Math.Min(1, System.Math.Max(osuus, ikkunaOsuus))) : 0f;
            Osuus = Kaytossa && georef != null ? (float)System.Math.Max(0, System.Math.Min(1, osuus)) : 0f;
            viimeKamera = kamera; KaupunkiPassi.Kamera = kamera;
            if (!Kaytossa || System.Math.Max(osuus, ikkunaOsuus) <= 0.001 || georef == null || kamera == null) { Pois(); return; }
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
            if (!luotu && !Luo()) return;
            materiaali.SetTexture(IdValot, ruudukko);
            materiaali.SetMatrix(IdMatriisi, georef.transform.worldToLocalMatrix);
            matriisiTila = georef.transform.worldToLocalMatrix.ValidTRS() ? "paikallinen ok" : $"paikallinen EI TRS (mittakaava {georef.transform.lossyScale})";
            materiaali.SetVector(IdAlue, new Vector4(kulma.Value.lon, kulma.Value.lat, (float)georef.latitude, (float)georef.longitude));
            materiaali.SetVector(IdParam, new Vector4((float)osuus, Hehku, Pisteet, Mathf.Max(5f, SoluM)));
            materiaali.SetVector(IdDebug, new Vector4(Diagnoosi, 1f, 0f, 0f));   // y = 1: passi jälkikäsittelyn jälkeen (ei valotuksen kompensointia)
            materiaali.SetVector(IdVari, new Vector4(Vari.r, Vari.g, Vari.b, Vari.a));
            materiaali.SetVector(IdIkkunat, new Vector4(Ikkunat, Mathf.Clamp01(IkkunaOsuus), IkkunaOsuusNyt, 0f));   // z = iltaikkunoiden osuus
            materiaali.SetTexture(IdTiet, tiet != null ? tiet : Texture2D.blackTexture);
            materiaali.SetVector(IdTieAlue, tieKeskus is (double, double) tk ? new Vector4((float)tk.lat, (float)tk.lon, tieSivu, 1f) : Vector4.zero);
            if (Kohde is (double, double, double, double) ko)
            {
                var u = georef.TransformEarthCenteredEarthFixedPositionToUnity(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(ko.lon, ko.lat, ko.maaM)));
                var pk = georef.transform.worldToLocalMatrix.MultiplyPoint3x4(new Vector3((float)u.x, (float)u.y, (float)u.z));
                materiaali.SetVector(IdKohde, new Vector4(pk.x, pk.y, pk.z, 1f));
                materiaali.SetVector(IdKohdeParam, new Vector4((float)Math.Min(90, Math.Max(25, ko.sadeM * 0.4)), KohdeVoima * Mathf.SmoothStep(0f, 1f, KohdeOsuus), 0f, 0f));   // v5: kapeampi (lähikuva kokonaan kultainen)
            }
            else materiaali.SetVector(IdKohde, Vector4.zero);
            // v6: vesimaski kehityskaupungissa (kerran kaupunkia kohden, synkroninen LoadImage ~1536² PNG).
            if (vedetId != (KaupunkiId ?? ""))
            {
                vedetId = KaupunkiId ?? "";
                if (vedet != null) { Object.Destroy(vedet); vedet = null; }
                vesiKeskus = null; vesiLamput = false;
                if (ikkunat != null) { Object.Destroy(ikkunat); ikkunat = null; }
                var ia = Resources.Load<TextAsset>("Elava/ikkunat-" + vedetId);
                if (ia != null)
                {
                    try
                    {
                        using var z = new System.IO.Compression.GZipStream(new MemoryStream(ia.bytes), System.IO.Compression.CompressionMode.Decompress);
                        var raaka = new byte[1536 * 1536]; int luettu = 0, n;
                        while (luettu < raaka.Length && (n = z.Read(raaka, luettu, raaka.Length - luettu)) > 0) luettu += n;
                        if (luettu == raaka.Length)
                        {
                            ikkunat = new Texture2D(1536, 1536, TextureFormat.R8, false, true) { name = "Yövalot: ikkunat " + vedetId, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Point };
                            ikkunat.LoadRawTextureData(raaka); ikkunat.Apply(false, true);   // ei CPU-kopiota
                        }
                    }
                    catch (System.Exception e) { Debug.Log("MATKAKIRJA kaupunki: yövalot: ikkunat " + e.Message); }
                    Resources.UnloadAsset(ia);
                    Debug.Log($"MATKAKIRJA kaupunki: yövalot: ikkunat {vedetId} {(ikkunat != null ? "ladattu" : "virheellinen")}");
                }
                var kk = Array.Find(Matkakirja.Linssit.Kehityskaupungit.Lista, x => x.Id == vedetId);
                var ta = kk.Id != null ? Resources.Load<TextAsset>("Elava/vesi-" + vedetId + "-maski") : null;
                if (ta != null)
                {
                    vedet = new Texture2D(2, 2, TextureFormat.RGBA32, true, true) {   // v12: lineaarinen (B = lampun paikka, A = alue; ei sRGB-muunnosta)
                         name = "Yövalot: vedet " + vedetId, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
                    // v12: RGBA-PNG (värityyppi 6, tavu 25) = OSM-lamput mukana; vanha RGB-maski (2) toistaa vettä G:ssä → ei lamppuja.
                    vesiLamput = ta.bytes.Length > 25 && ta.bytes[25] == 6;
                    if (vedet.LoadImage(ta.bytes, true)) vesiKeskus = (kk.Lat, kk.Lon); else { Object.Destroy(vedet); vedet = null; vesiLamput = false; }
                    Resources.UnloadAsset(ta);
                    Debug.Log($"MATKAKIRJA kaupunki: yövalot: vesimaski {vedetId} {(vedet != null ? "ladattu" : "virheellinen")}{(vesiLamput ? " + OSM-lamput" : "")}");
                }
            }
            materiaali.SetTexture(IdVedet, vedet != null ? vedet : Texture2D.blackTexture);
            materiaali.SetVector(IdVesiAlue, vesiKeskus is (double, double) vk ? new Vector4((float)vk.lat, (float)vk.lon, VesiSivuM, Heijastus) : Vector4.zero);
            materiaali.SetVector(IdLamppuParam, new Vector4(vesiLamput && OsmLamput && vesiKeskus != null ? 1f : 0f, AlueVoima, 0f, 0f));
            materiaali.SetTexture(IdIkkunat, ikkunat != null ? ikkunat : Texture2D.blackTexture);
            materiaali.SetVector(IdIkkunaData, new Vector4(ikkunat != null && IkkunaData && vesiKeskus != null ? 1f : 0f, IkkunaKerroin, 0f, 0f));
            var kp = georef.transform.worldToLocalMatrix.MultiplyPoint3x4(kamera.transform.position);
            materiaali.SetVector(IdKamera, new Vector4(kp.x, kp.y, kp.z, 0f));
            // v6: maamerkit paikalliseen ENU:hun (enintään 8; w = säde, 0 = tyhjä paikka).
            int n = 0;
            foreach (var m in Maamerkit)
            {
                if (n >= MaamerkkejaMax || double.IsNaN(m.maaM)) continue;
                var um = georef.TransformEarthCenteredEarthFixedPositionToUnity(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(m.lon, m.lat, m.maaM)));
                var pm = georef.transform.worldToLocalMatrix.MultiplyPoint3x4(new Vector3((float)um.x, (float)um.y, (float)um.z));
                maamerkit[n++] = new Vector4(pm.x, pm.y, pm.z, (float)Math.Min(70, Math.Max(25, m.sadeM)));
            }
            for (int i = n; i < MaamerkkejaMax; i++) maamerkit[i] = Vector4.zero;
            materiaali.SetVectorArray(IdMaamerkit, maamerkit);
            materiaali.SetVector(IdMaamerkkiParam, new Vector4(n, MaamerkkiVoima, 0f, 0f));
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
                    var ij = ri.result == UnityWebRequest.Result.Success ? Matkakirja.Peli.MiniJson.Jasenna(ri.downloadHandler.text) : null;
                    tieIndeksi = KaupunkiTiet.LueIndeksi(ij); tiePolut = KaupunkiTiet.LuePolut(ij);
                }
                if (tieIndeksi.Contains(id))
                {
                    string suht = KaupunkiTiet.Polku(id, tiePolut);
                    string polku = Path.Combine(Application.persistentDataPath, "kuvat", suht);
                    if (File.Exists(polku)) { json = File.ReadAllText(polku); lahde = "välimuisti"; }
                    else
                    {
                        using var r = UnityWebRequest.Get(KaupunkiTiet.Media + suht);
                        r.timeout = 25;
                        yield return r.SendWebRequest();
                        lahde = r.result == UnityWebRequest.Result.Success ? "ämpäri " + suht : "ämpäri " + r.responseCode;
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

        static Camera viimeKamera;
        static string matriisiTila;
        /// <summary>Diagnoosin tila (komento opas yovalot): passi, renderöijä, varjostin, ruudukko ja kamera.</summary>
        public static string Tila()
        {
            var urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            var nyt = urp != null && urp.rendererDataList.Length > 0 ? urp.rendererDataList[0] : null;
            var ca = viimeKamera != null ? viimeKamera.GetComponent<UniversalAdditionalCameraData>() : null;
            return $"passi {KaupunkiPassi.Tila("yövalot")}, {matriisiTila ?? "paikallinen -"}, putki {(urp != null ? urp.name : "-")}, " +
                $"varjostin {(materiaali != null ? (materiaali.shader.isSupported ? "tuettu" : "EI tuettu") : "-")}, ruudukko {(ruudukko != null ? "on" : "ei")}, kulma {kulma}, " +
                $"kamerat [{string.Join("; ", System.Array.ConvertAll(Camera.allCameras, k => { var d = k.GetComponent<UniversalAdditionalCameraData>(); return $"{k.name} d{k.depth:F0} {(d != null ? d.renderType.ToString() : "?")} rt {(k.targetTexture != null ? k.targetTexture.name + " " + k.targetTexture.width + "x" + k.targetTexture.height : "-")} msaa {k.allowMSAA} hdr {k.allowHDR} renderöijä {(d != null ? d.scriptableRenderer?.GetType().Name : "?")}"; }))}], " +
                $"kamera {(viimeKamera != null ? viimeKamera.name : "-")} jälkik. {(ca != null ? ca.renderPostProcessing.ToString() : "?")} syvyys {(ca != null ? ca.requiresDepthOption.ToString() : "?")} tyyppi {(ca != null ? ca.renderType.ToString() : "?")} pino {(ca != null ? ca.cameraStack?.Count ?? 0 : 0)}";
        }


        static bool Luo()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/KaupunkiYovalot");
            if (varjostin == null) { Debug.Log("MATKAKIRJA kaupunki: yövalot ei käytettävissä (varjostin puuttuu)"); Kaytossa = false; return false; }
            materiaali = new Material(varjostin) { name = "KaupunkiYovalot" };
            luotu = true;
            KaupunkiPassi.Aseta("yövalot", materiaali);   // oma passi vain kaupungin peruskameralle (9.10. juurisyy, ks. KaupunkiPassi)
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
            if (luotu)
            {
                KaupunkiPassi.Aseta("yövalot", null);
                if (materiaali != null) Object.Destroy(materiaali);
                luotu = false; materiaali = null;
                Debug.Log("MATKAKIRJA kaupunki: yövalot pois");
            }
            if (ruudukko != null && ladataan == null) { Object.Destroy(ruudukko); ruudukko = null; kulma = null; }
        }
    }
}
