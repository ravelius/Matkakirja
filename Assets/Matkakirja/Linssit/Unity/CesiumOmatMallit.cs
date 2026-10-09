// OMAT MALLIT CESIUM-KAUPUNKIIN, UNITY-OSA (Linssiseppä 7.10.2026, Giza-pilotti; ks. Ydin/Kierros/OmatMallit.cs ja
// tyokalut/omat_mallit_tileset.py). Kaupunkinäkymän avautuessa Googlen datalla: lähellä olevat omat mallit ladataan 3D Tilesinä
// (Cesium piirtää GLB:n itse, LOD REPLACE-ketjuna), ja kun mallin juurilaatta on ladattu, Googlen tilesetiin lisätään
// CesiumPolygonRasterOverlay, joka leikkaa mallien alueet pois (excludeSelectedTiles: kokonaan sisään jäävät laatat jätetään
// lataamatta). Leikkaus vain näyttöhetkellä; Googlen dataa ei tallenneta. Mallin epäonnistuessa leikkaus pois (ei tyhjää reikää).
// LÄHDE: Documents/omat-mallit/mallit.json (kehitys, file://), StreamingAssets/omat-mallit/mallit.json (appin mukana) tai
// R2 (omistaja 7.10. 08.4x "Egypti loppuun omilla malleilla"): media.matkakirja.app/kartta/omat-mallit/uusin.json → {"mallit":
// "<versio>/mallit.json"}; haetaan kerran kaupunkinäkymän avautuessa, ja jos lähellä on kohteita, mallit avataan kun json saapuu.
// KORKEUS (PT 9.10. päätös 2; Map Tiles C4: Googlen laatoista ei lueta korkeuksia): vain mallit.json:n ellipsoidikorkeus omasta
// korkeusmallista (IGN RGE ALTI / Lantmäteriet / DEM + geoidi). Mallia EI siirretä Googlen pinnan mukaan. Kehittäjätilassa
// (Linssirekisteri.Kehittajatila, ei oma korkeusmalli) Googlen pinta näytteistetään leikkauskulmista VAIN lokiin saumojen arviointiin.
// TEKIJÄRIVI: Tekijat (esim. "Pyramidien 3D-malli: Matkakirja") näytetään erillään Googlen riveistä (Natiivi-UI, KrediititTiivis).
using System;
using System.Collections.Generic;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Splines;

namespace Matkakirja.Linssit
{
    public sealed class CesiumOmatMallit
    {
        /// <summary>Näkyvien omien mallien tekijärivi (null = ei omia malleja ruudulla). Googlen rivien erillään (Map Tiles -ohjeet).</summary>
        public static string Tekijat { get; private set; }
        /// <summary>☰ › Lähteet (Natiivi-UI 9.10.): kaikkien mallit.json-kohteiden krediittirivit (myös ei näkyvien); tyhjä, kunnes json on
        /// saatavilla (Documents, StreamingAssets tai R2-osoitin).</summary>
        public static IReadOnlyList<string> Lahderivit
        {
            get
            {
                var (json, _, _) = Lue();
                if (json == null) return System.Array.Empty<string>();
                if (!ReferenceEquals(json, lahdeJson)) { lahdeJson = json; lahdeRivit = OmatMallit.Lahderivit(OmatMallit.Lue(json)); }
                return lahdeRivit;
            }
        }
        static string lahdeJson; static List<string> lahdeRivit = new List<string>();
        /// <summary>Tyhjä näyte (Googlen laatat eivät vielä ladattu): uusi yritys näin monta kertaa 3 s välein.</summary>
        public const int NayteYrityksia = 5;

        readonly Action<string> kirjaa;
        GameObject juuri;
        Cesium3DTileset google;
        CesiumPolygonRasterOverlay leikkaus;
        readonly List<(OmatMallit.Kohde kohde, Cesium3DTileset tileset, CesiumCartographicPolygon polygoni)> mallit = new();
        OmatMallit.Paketti paketti;

        public CesiumOmatMallit(Action<string> kirjaa) { this.kirjaa = kirjaa; VerkkoSaapui += Saapui; }

        /// <summary>Googlen leikkaus: juurisyy (koko tileset katosi, materialKey "0") korjattu 72cc68be; päällä Gizan valmistuessa
        /// (omistaja 7.10. 08.4x), kun ennen/jälkeen-kuva on todennettu. Testi pois: Documents/omat-mallit/leikkaus-pois.</summary>
        static bool Leikkaa => !File.Exists(Path.Combine(Application.persistentDataPath, "omat-mallit", "leikkaus-pois"));

        /// <summary>uusin-2.json (9.10., juna 170): kaupunkien omat mallit (Riddarholmen, Concorde) vain buildeille, joissa ilmakehän
        /// laattavarjostimen leikkaus on oikein päin (fa5efa25c); vanhat buildit lukevat uusin.json:ia (vain Giza), muuten niissä
        /// kehityskaupungin koko Googlen kaupunki katoaisi leikkauksen kohdalla.</summary>
        public const string VerkkoOsoitin = "https://media.matkakirja.app/kartta/omat-mallit/uusin-2.json";
        static string verkkoJson, verkkoJuuri;
        static bool verkkoHaettu, verkkoHaussa;
        /// <summary>R2:n mallit.json saapui (avoin kaupunkinäkymä avaa lähellä olevat mallit).</summary>
        static event Action VerkkoSaapui;
        double viimeLat, viimeLon;

        /// <summary>Hakee R2:n osoittimen ja mallit.json:n kerran istunnossa (ei mitään, jos Documents tai StreamingAssets käytössä).</summary>
        static System.Collections.IEnumerator HaeVerkosta()
        {
            verkkoHaussa = true;
            string osoitin = null;
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(VerkkoOsoitin + "?t=" + DateTime.UtcNow.Ticks / TimeSpan.TicksPerMinute))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success
                    && Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> d && d.TryGetValue("mallit", out var m))
                    osoitin = m as string;
                else Debug.Log($"MATKAKIRJA kaupunki: omat mallit: osoitin ei latautunut ({r.responseCode})");
            }
            if (!string.IsNullOrEmpty(osoitin) && !osoitin.Contains("..") && !osoitin.StartsWith("/"))
            {
                string url = new Uri(new Uri(VerkkoOsoitin), osoitin).AbsoluteUri;
                using var r = UnityEngine.Networking.UnityWebRequest.Get(url);
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                { verkkoJson = r.downloadHandler.text; verkkoJuuri = url.Substring(0, url.LastIndexOf('/') + 1); }
                Debug.Log($"MATKAKIRJA kaupunki: omat mallit: {osoitin} {(verkkoJson != null ? "ok" : r.responseCode.ToString())}");
            }
            verkkoHaettu = true; verkkoHaussa = false;
            if (verkkoJson != null) VerkkoSaapui?.Invoke();
        }

        void Saapui() { if (vanhempi0 != null && avattu == null) Avaa(vanhempi0, googleViimeisin, viimeLat, viimeLon, kerros0); }

        public int Maara => mallit.Count;
        string avattu;   // avattujen kohteiden id:t (Paivita avaa uudelleen vain, jos joukko vaihtuu)
        Transform vanhempi0; int kerros0;

        // KAUKOSÄÄNTÖ (simu 7.10. 14.05, Giza v2b): 2,5 ja 5 km:stä leikkausmaski osui karkeilla Googlen tiilillä sivuun (suurten
        // kolmioiden yli interpoloitu maskikoordinaatti) ja jätti valkoisia reikiä helmojen ulkopuolelle; 1,4 km:stä tarkka. Kaukana
        // maski pois (Googlen ja oma malli ovat siellä samannäköiset), lähellä takaisin; väli estää vilkkumisen rajalla.
        public const float LeikkausPoisM = 2200f, LeikkausTakaisinM = 1800f;

        /// <summary>Joka kehys (CesiumKaupunki.PidaMaski): kameran etäisyys lähimpään omaan malliin ohjaa leikkausta.</summary>
        public void Kamera(Vector3 kamera)
        {
            if (leikkaus == null || mallit.Count == 0) return;
            float d = float.MaxValue;
            foreach (var m in mallit) if (m.polygoni != null) d = Mathf.Min(d, (m.polygoni.transform.position - kamera).magnitude);
            if (leikkaus.enabled && d > LeikkausPoisM) { leikkaus.enabled = false; kirjaa?.Invoke($"omat mallit: leikkaus pois kaukaa ({d:F0} m)"); }
            else if (!leikkaus.enabled && d < LeikkausTakaisinM) { leikkaus.enabled = true; kirjaa?.Invoke($"omat mallit: leikkaus päälle ({d:F0} m)"); }
        }

        /// <summary>Kaupungin origo siirtyi (oppaan siirtymä toiseen kaupunkiin): avaa uudelleen vain, jos lähellä olevat vaihtuivat.</summary>
        public void Paivita(double lat, double lon)
        {
            if (vanhempi0 == null) return;
            viimeLat = lat; viimeLon = lon;
            var (json, _, _) = Lue();
            var l = json == null ? new List<OmatMallit.Kohde>() : OmatMallit.Lahella(OmatMallit.Lue(json), lat, lon);
            if (string.Join(",", l.ConvertAll(k => k.Id)) != (avattu ?? "")) Avaa(vanhempi0, google ?? googleViimeisin, lat, lon, kerros0);
        }
        Cesium3DTileset googleViimeisin;

        /// <summary>Avaa lähellä olevat mallit (vanhat pois). vanhempi = Cesium-kaupungin juuri georeferenssin alla.</summary>
        public void Avaa(Transform vanhempi, Cesium3DTileset googleTileset, double lat, double lon, int kerros)
        {
            Sulje();
            vanhempi0 = vanhempi; kerros0 = kerros; googleViimeisin = googleTileset; viimeLat = lat; viimeLon = lon;
            var (json, juuriUrl, lahde) = Lue();
            if (json == null)
            {
                if (!verkkoHaettu && !verkkoHaussa && Matkakirja.Natiivi.LinssiOhjain.Instanssi != null) Matkakirja.Natiivi.LinssiOhjain.Instanssi.StartCoroutine(HaeVerkosta());
                return;
            }
            var paketti = OmatMallit.Lue(json);
            var lahella = OmatMallit.Lahella(paketti, lat, lon);
            if (lahella.Count == 0) return;
            avattu = string.Join(",", lahella.ConvertAll(k => k.Id));
            google = googleTileset; this.paketti = paketti;
            juuri = new GameObject("Omat mallit") { layer = kerros };
            juuri.transform.SetParent(vanhempi, false);
            foreach (var k in lahella)
            {
                var go = new GameObject("Oma malli " + k.Id) { layer = kerros };
                go.SetActive(false);
                go.transform.SetParent(juuri.transform, false);
                var t = go.AddComponent<Cesium3DTileset>();
                t.tilesetSource = CesiumDataSource.FromUrl;
                t.url = juuriUrl + k.Tileset;
                t.showCreditsOnScreen = false;   // oma tekijärivi Tekijat-kentästä
                t.createPhysicsMeshes = false;
                t.forbidHoles = true;
                t.maximumScreenSpaceError = googleTileset != null ? googleTileset.maximumScreenSpaceError : 16f;
                var kohde = k;
                t.OnTileGameObjectCreated += laatta => MalliLadattu(kohde, laatta);
                go.SetActive(true);
                mallit.Add((k, t, Polygoni(k, kerros)));
            }
            Cesium3DTileset.OnCesium3DTilesetLoadFailure += LatausVirhe;
            kirjaa?.Invoke($"omat mallit: {lahella.Count} kohdetta ({string.Join(", ", lahella.ConvertAll(k => k.Id))}) {lahde}");
            if (google != null) MittaaKorkeudet();
        }

        public void Sulje()
        {
            Cesium3DTileset.OnCesium3DTilesetLoadFailure -= LatausVirhe;
            if (leikkaus != null) UnityEngine.Object.Destroy(leikkaus);
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            leikkaus = null; juuri = null; google = null; mallit.Clear(); Tekijat = null; avattu = null;
        }

        /// <summary>Leikkauspolygoni: CesiumGlobeAnchor kohteen pisteeseen (Unityn x itä, z pohjoinen paikallisesti), solmut metreinä.</summary>
        CesiumCartographicPolygon Polygoni(OmatMallit.Kohde k, int kerros)
        {
            var go = new GameObject("Leikkaus " + k.Id) { layer = kerros };
            go.transform.SetParent(juuri.transform, false);
            var ankkuri = go.AddComponent<CesiumGlobeAnchor>();
            ankkuri.adjustOrientationForGlobeWhenMoving = true;
            ankkuri.longitudeLatitudeHeight = new double3(k.Lon, k.Lat, k.KorkeusM);
            var sc = go.AddComponent<SplineContainer>();
            var p = go.AddComponent<CesiumCartographicPolygon>();   // luo oletusneliön: korvataan
            foreach (var s in new List<Spline>(sc.Splines)) sc.RemoveSpline(s);
            var spline = new Spline();
            foreach (var (e, n) in OmatMallit.Paikallinen(k.Leikkaus, k.Lat, k.Lon)) spline.Add(new BezierKnot(new float3((float)e, 0, (float)n)));
            spline.Closed = true;
            spline.SetTangentMode(TangentMode.Linear);
            sc.AddSpline(spline);
            return p;
        }

        /// <summary>Ensimmäinen laatta kohteelta → leikkaus päälle (kaikki tähän asti ladatut kohteet).</summary>
        void MalliLadattu(OmatMallit.Kohde k, GameObject laatta)
        {
            if (google == null || juuri == null) return;
            if (laatta != null) laatta.layer = juuri.layer;
            Tekijat = OmatMallit.Tekijat(paketti, mallit.ConvertAll(m => m.kohde));
            if (!Leikkaa) return;   // oletuksena pois (Päätoimittaja 7.10.); testi Documents/omat-mallit/leikkaus-paalle
            if (leikkaus == null)
            {
                leikkaus = google.gameObject.AddComponent<CesiumPolygonRasterOverlay>();
                // JUURISYY (simu 7.10. 03.58: koko Googlen tileset katosi): Cesium asettaa materialKey = "Clipping" vain editorin
                // Reset()-metodissa (#if UNITY_EDITOR); ajonaikainen AddComponent jäi avaimelle "0" (kuvakerros), jolloin polygonimaski
                // piirtyi tiilien kuvana. Avain asetetaan itse, ja Refresh lisää overlayn uudelleen oikealla avaimella.
                leikkaus.materialKey = "Clipping";
                leikkaus.invertSelection = false;
                leikkaus.excludeSelectedTiles = true;
                // Simu 7.10. 09.33: kaukaa (1,4–5 km) maski rasteroitui karkean Google-tiilen kokoiselle tekstuurille, ja reikä paisui
                // lähes kaksinkertaiseksi (lähellä tarkka). Hienompi maski: pienempi ruutuvirhe ja suurempi tekstuuri.
                leikkaus.maximumScreenSpaceError = 0.5f;
                leikkaus.maximumTextureSize = 4096;
            }
            var lista = new List<CesiumCartographicPolygon>();
            foreach (var m in mallit) if (m.polygoni != null) lista.Add(m.polygoni);
            if (leikkaus.polygons == null || leikkaus.polygons.Count != lista.Count || leikkaus.materialKey != "Clipping")
            {
                leikkaus.materialKey = "Clipping";
                leikkaus.polygons = lista;
                if (leikkaus.enabled) leikkaus.Refresh();   // kaukana pois: OnEnable lisää uudet polygonit, kun kamera palaa
                kirjaa?.Invoke($"omat mallit: {k.Id} ladattu, Googlen tiilet leikattu {lista.Count} alueelta");
                // Diagnostiikka (simu 7.10. 01.07: koko Googlen tileset katosi): polygonin ensimmäinen ja kolmas solmu
                // maailmasta → tilesetin paikallinen → ECEF → lat/lon, kuten CesiumCartographicPolygon.GetCartographicPoints.
                var georef = google.GetComponentInParent<CesiumGeoreference>();
                foreach (var pg in lista)
                {
                    var sc = pg.GetComponent<SplineContainer>();
                    if (georef == null || sc == null || sc.Splines.Count == 0) continue;
                    var sp = sc.Splines[0]; var w2t = google.transform.worldToLocalMatrix;
                    string Piste(int i)
                    {
                        if (i >= sp.Count) return "-";
                        Vector3 w = pg.transform.TransformPoint((Vector3)sp[i].Position);
                        var ecef = georef.TransformUnityPositionToEarthCenteredEarthFixed((double3)(float3)w2t.MultiplyPoint3x4(w));
                        var llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
                        return $"{llh.y:F5}, {llh.x:F5}";
                    }
                    kirjaa?.Invoke($"omat mallit: leikkaus {pg.name}: {sp.Count} solmua, 0 = {Piste(0)}, 2 = {Piste(2)}, ankkuri {pg.GetComponent<CesiumGlobeAnchor>().longitudeLatitudeHeight}");
                }
            }
        }

        void LatausVirhe(Cesium3DTilesetLoadFailureDetails d)
        {
            int i = mallit.FindIndex(m => m.tileset == d.tileset);
            if (i < 0) return;
            kirjaa?.Invoke($"omat mallit: {mallit[i].kohde.Id} ei latautunut ({d.type}, HTTP {d.httpStatusCode}), leikkaus pois");
            if (mallit[i].polygoni != null) UnityEngine.Object.Destroy(mallit[i].polygoni.gameObject);
            mallit[i] = (mallit[i].kohde, mallit[i].tileset, null);
            if (leikkaus != null)
            {
                var lista = new List<CesiumCartographicPolygon>();
                foreach (var m in mallit) if (m.polygoni != null) lista.Add(m.polygoni);
                leikkaus.polygons = lista; leikkaus.Refresh();
                if (lista.Count == 0) { UnityEngine.Object.Destroy(leikkaus); leikkaus = null; Tekijat = null; }
            }
        }

        /// <summary>Kehittäjätilan diagnoosi: Googlen pinta leikkauskulmien ulkopuolelta (+3 m ulospäin) → ero mallin korkeuteen VAIN lokiin
        /// (ei korjausta; korkeus aina mallit.json:sta, OmatMallit.KorkeusOmastaMallista).</summary>
        async void MittaaKorkeudet()
        {
            if (!OmatMallit.GooglenPintaLokiin(Linssirekisteri.Kehittajatila, Matkakirja.Natiivi.OpasSovitin.OmaKorkeusPaalla))
            { kirjaa?.Invoke("omat mallit: korkeus mallit.jsonista (oma korkeusmalli), Googlen pintaa ei näytteistetä"); return; }
            var g = google;
            foreach (var (k, t, _) in new List<(OmatMallit.Kohde, Cesium3DTileset, CesiumCartographicPolygon)>(mallit))
            for (int yritys = 1; yritys <= NayteYrityksia; yritys++)
            {
                if (yritys > 1) { await System.Threading.Tasks.Task.Delay(3000); if (g != google || t == null) return; }
                var pisteet = new List<double3>();
                foreach (var (la, lo) in k.Leikkaus)
                {
                    double dLa = la - k.Lat, dLo = lo - k.Lon, pit = Math.Sqrt(dLa * dLa + dLo * dLo);
                    double ulos = pit > 0 ? 3.0 / 111195.0 / pit : 0;   // noin 3 m ulospäin kulmasta (Googlen alkuperäinen pinta)
                    pisteet.Add(new double3(lo + dLo * ulos, la + dLa * ulos, 0));
                }
                CesiumSampleHeightResult r;
                try { r = await g.SampleHeightMostDetailed(pisteet.ToArray()); }
                catch (Exception e) { kirjaa?.Invoke($"omat mallit: {k.Id} korkeusnäyte epäonnistui ({e.GetType().Name})"); continue; }
                if (g != google || t == null) return;
                var hs = new List<double>();
                for (int i = 0; i < r.longitudeLatitudeHeightPositions.Length; i++)
                    if (r.sampleSuccess[i]) hs.Add(r.longitudeLatitudeHeightPositions[i].z);
                if (hs.Count < pisteet.Count) { kirjaa?.Invoke($"omat mallit: {k.Id} korkeusnäyte {hs.Count}/{pisteet.Count} (yritys {yritys})"); continue; }
                var jarj = new List<double>(hs); jarj.Sort();
                double mediaani = jarj[jarj.Count / 2], ero = mediaani - k.KorkeusM, hajonta = jarj[^1] - jarj[0];
                // Kulmat leikkauspolygonin järjestyksessä (pyramideilla NE, SE, SW, NW): ero mallin pohjaan kulmittain. Vain loki.
                kirjaa?.Invoke($"omat mallit: {k.Id} (kehittäjä, vain loki) Googlen pinta kulmissa {string.Join(" / ", hs.ConvertAll(h => $"{h:F1} ({h - k.KorkeusM:+0.0;-0.0})"))} m, " +
                    $"malli {k.KorkeusM:F1} m, mediaaniero {ero:+0.0;-0.0} m, hajonta {hajonta:F1} m (ei korjausta: korkeus omasta mallista)");
                break;
            }
        }

        /// <summary>mallit.json ja sen kansion URL (päättyy /): Documents ensin, sitten StreamingAssets; ei kumpaakaan → null.</summary>
        static (string json, string juuriUrl, string lahde) Lue()
        {
            foreach (var (kansio, nimi) in new[] { (Path.Combine(Application.persistentDataPath, "omat-mallit"), "Documents"),
                                                   (Path.Combine(Application.streamingAssetsPath, "omat-mallit"), "StreamingAssets") })
            {
                string p = Path.Combine(kansio, "mallit.json");
                try { if (File.Exists(p)) return (File.ReadAllText(p), new Uri(kansio + "/").AbsoluteUri, nimi); }
                catch (Exception) { }
            }
            if (verkkoJson != null) return (verkkoJson, verkkoJuuri, "R2");
            return (null, null, null);
        }
    }
}
