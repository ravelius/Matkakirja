// CESIUM-KAUPUNKINÄKYMÄ (Linssiseppä 5.10.2026): yhteinen osa kaupunkikierrokselle (KierrosSovitin) ja elävälle oppaalle
// (OpasSovitin). Luo Cesium ionin tilesetit pallon georeferenssiin, piilottaa oman pallon ja pergamenttipohjan, siirtää origon,
// pitää esilatauskameran ja Cesiumin krediitit ruudulla ja palauttaa kaiken sulkiessa.
//
// DATA: Google Photorealistic 3D Tiles (ion 2275207; omistaja 17.4x, kehitys/testi) yksinään, tai World Terrain (1) + Bing (2)
// + OSM Buildings (96188). Jos Googlen tileset ei lataudu (tunnuksella ei oikeutta → 401/404), näkymä vaihtaa itse ionin
// erillisdataan ja kirjaa syyn. EHDOT: kaupunkinäkymässä vain valitun lähteen data — oma pallo ja Pohjapallo piiloon, siirtymä
// mustan avausruudun kautta, Googlen/Bingin logo ja tekijätiedot muuttamattomina ruudulle, ei offline-tallennusta (vain Cesiumin
// oma välimuisti otsakkeiden max-age-rajoissa), ei omia malleja Googlen sisällöstä.
//
// TUNNUS: ei repoon eikä käännökseen; laitteen Documents/cesium-ion-tunnus.txt (kehitys) — ei lokiin.
// KAMERA: pallon oma kamera PalloKierto.Kuvaa-metodilla ennen Cesiumin laattavalintaa (KyydinKameraEnnen, −50). ESILATAUS:
// piilokamera additionalCameras-listassa (native CameraManager ottaa myös pois päältä olevat kamerat).
using System;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class CesiumKaupunki
    {
        public const float MaastoSse = 16f, RakennusSse = 24f, GoogleSse = 16f;
        public const long MaastoValimuisti = 128L << 20, RakennusValimuisti = 192L << 20, GoogleValimuisti = 384L << 20;
        public const long GoogleAsset = 2275207;
        public const uint Rinnakkain = 12;
        /// <summary>Laattojen valmiusraja (%): ComputeLoadProgress on arvio, joten 100 ei aina täyty.</summary>
        public const float ValmisProsentti = 99f;
        /// <summary>Taivaan väri kaupunkinäkymässä (pallon avaruuden musta ei sovi horisonttiin).</summary>
        static readonly Color Taivas = new Color(0.78f, 0.84f, 0.89f);

        /// <summary>Datalähde (komennot "lontoo data …" ja "opas data …"): Google oletus, Ion, Oma = testitila ilman ionia.</summary>
        public enum Lahde { Google, Ion, Oma }
        public static Lahde Data = Lahde.Google;
        public static string TunnusPolku => Path.Combine(Application.persistentDataPath, "cesium-ion-tunnus.txt");

        readonly PalloKierto kierto;
        readonly Action<string> kirjaa;
        GameObject juuri;
        Cesium3DTileset maasto, rakennukset;
        Camera esikamera, kamera;
        CesiumCameraManager hallinta;
        CesiumGeoreference georef;
        double3 vanhaOrigo;
        Cesium3DTileset palloTileset;
        Pohjapallolaskenta.Tila pohjaTila;
        bool palloOli, pohjaOli, auki;
        CameraClearFlags vanhaTyhjennys;
        Color vanhaTausta;
        string tunnus;

        public CesiumKaupunki(PalloKierto kierto, Action<string> kirjaa) { this.kierto = kierto; this.kirjaa = kirjaa; }

        /// <summary>
        /// KUVANLAADUN KOUKUT (Siirtoseppä 5.10., kaupunkikuvan parannukset junaan 144): Avattu kutsutaan, kun näkymä ja tilesetit
        /// on luotu (myös Google → Ion -vaihdon jälkeen), Suljettu ennen palautusta. Laatukoodi asuu omassa tiedostossaan ja
        /// rajautuu kaupunkinäkymään näiden kautta.
        /// </summary>
        public static event Action<CesiumKaupunki> Avattu, Suljettu;
        /// <summary>Pallon kamera (näkymän ajan) ja tilesetit: Google tai maasto (Pinta) ja OSM-rakennukset (null Googlella).</summary>
        public Camera Kamera => kamera;
        public Cesium3DTileset Rakennukset => rakennukset;

        /// <summary>Käytössä oleva lähde (Google voi vaihtua Ioniin latausvirheen jälkeen).</summary>
        public Lahde Kaytossa { get; private set; }
        public string Virhe { get; private set; }
        public CesiumGeoreference Georef => georef;
        /// <summary>Tileset korkeuden näytteenottoon (Google tai maasto).</summary>
        public Cesium3DTileset Pinta => maasto;
        /// <summary>Laattojen latausaste 0–100 (pienempi kahdesta tilesetistä).</summary>
        public float Latausaste => maasto == null ? 0f : rakennukset == null ? maasto.ComputeLoadProgress() : Mathf.Min(maasto.ComputeLoadProgress(), rakennukset.ComputeLoadProgress());
        public bool Valmis => Latausaste >= ValmisProsentti;

        /// <summary>Workerista haettu tunnus (muistissa istunnon ajan, ei levylle eikä lokiin).</summary>
        static string haettuTunnus;
        /// <summary>Tunnuksen reitti Pöllössä (Pelikoodari; salaisuus CESIUM_ION_TOKEN workerin ympäristössä).</summary>
        public const string TunnusReitti = "/opas/tunnus";

        static string LueTunnus()
        {
            try { if (File.Exists(TunnusPolku)) { var t = File.ReadAllText(TunnusPolku).Trim(); if (t.Length > 0) return t; } }
            catch (Exception) { }
            return haettuTunnus;
        }

        /// <summary>Tunnus Pöllöstä (pelaajan laite): GET {PuluChat.Palvelin}/opas/tunnus → {"tunnus": "..."}; natiivin otsakkeet.</summary>
        System.Collections.IEnumerator HaeTunnus(Lahde data)
        {
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(PuluChat.Palvelin + TunnusReitti))
            {
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (!auki) yield break;
                string t = null;
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                    t = (Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text) as System.Collections.Generic.Dictionary<string, object>) is { } j
                        && j.TryGetValue("tunnus", out var v) ? v as string : null;
                if (string.IsNullOrEmpty(t))
                {
                    kirjaa($"kaupunki: tunnuksen haku epäonnistui (HTTP {r.responseCode})");
                    Virhe = "Cesium ion -tunnus puuttuu";
                    yield break;
                }
                haettuTunnus = tunnus = t;
                kirjaa("kaupunki: tunnus haettu Pöllöstä");
                LuoData(data);
            }
        }

        /// <summary>Avaa näkymän origon ympärille. false = virhe (Virhe kertoo syyn; mitään ei muutettu).</summary>
        public bool Avaa(double origoLat, double origoLon, double origoKorkeus)
        {
            Virhe = null;
            var data = Data;
            tunnus = LueTunnus();
            bool haettava = string.IsNullOrEmpty(tunnus) && data != Lahde.Oma;
            georef = kierto != null ? kierto.georeferenssi : null;
            kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (georef == null || kamera == null) { Virhe = "pallon kamera puuttuu"; return false; }
            auki = true;

            // Vain pallon tileset-komponentti pois (simu 5.10. 18.0x: pallo on samassa oliossa kuin georeferenssi, ja koko olion
            // SetActive(false) sammutti georeferenssin → SetOrigin heitti "Initialize"-poikkeuksen).
            palloTileset = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
            palloOli = palloTileset != null && palloTileset.enabled;
            if (palloTileset != null) palloTileset.enabled = false;
            // Pohjapallo on myös georeferenssin oliossa: piilotus sen omalla tilalla (komento "pallo pohja pois"), ei SetActivella.
            pohjaTila = Pohjapallo.Tila;
            pohjaOli = true;
            Pohjapallo.Tila = Pohjapallolaskenta.Tila.Pois;
            vanhaTyhjennys = kamera.clearFlags; vanhaTausta = kamera.backgroundColor;
            kamera.clearFlags = CameraClearFlags.SolidColor; kamera.backgroundColor = Taivas;

            vanhaOrigo = new double3(georef.longitude, georef.latitude, georef.height);
            SiirraOrigo(origoLat, origoLon, origoKorkeus);

            juuri = new GameObject("Cesium-kaupunki");
            juuri.transform.SetParent(georef.transform, false);
            esikamera = new GameObject("Kaupunki esilataus").AddComponent<Camera>();
            esikamera.transform.SetParent(juuri.transform, false);
            esikamera.enabled = false;
            esikamera.cullingMask = 0;
            Cesium3DTileset.OnCesium3DTilesetLoadFailure += LatausVirhe;
            // Pelaajan laitteella tunnus haetaan ensin Pöllöstä; tilesetit luodaan vasta sitten (ei 401-latausvirhettä).
            if (haettava) kierto.StartCoroutine(HaeTunnus(data));
            else LuoData(data);
            KarttaKerrokset.RuutukrediititNakyviin = true;
            return true;
        }

        void LuoData(Lahde data)
        {
            Kaytossa = data;
            if (hallinta != null && esikamera != null) hallinta.additionalCameras.Remove(esikamera);
            if (maasto != null) UnityEngine.Object.Destroy(maasto.gameObject);
            if (rakennukset != null) UnityEngine.Object.Destroy(rakennukset.gameObject);
            maasto = null; rakennukset = null;
            if (data == Lahde.Oma)
            {
                maasto = LuoTileset("Kaupunki maasto (oma testi)", 0, MaastoSse, MaastoValimuisti);
                maasto.tilesetSource = CesiumDataSource.FromUrl;
                maasto.url = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.pallo != null ? KarttaKerrokset.Instanssi.pallo.url : null;
            }
            else if (data == Lahde.Google)
                maasto = LuoTileset("Kaupunki Google 3D", GoogleAsset, GoogleSse, GoogleValimuisti);
            else
            {
                maasto = LuoTileset("Kaupunki maasto", 1, MaastoSse, MaastoValimuisti);
                var bing = maasto.gameObject.AddComponent<CesiumIonRasterOverlay>();
                bing.ionAssetID = 2;
                bing.ionAccessToken = tunnus;
                rakennukset = LuoTileset("Kaupunki rakennukset", 96188, RakennusSse, RakennusValimuisti);
                rakennukset.gameObject.SetActive(true);
            }
            maasto.gameObject.SetActive(true);
            hallinta = CesiumCameraManager.GetOrCreate(maasto.gameObject);
            if (hallinta != null && !hallinta.additionalCameras.Contains(esikamera)) hallinta.additionalCameras.Add(esikamera);
            kirjaa("kaupunki: data " + data);
            if (auki) Avattu?.Invoke(this);
        }

        Cesium3DTileset LuoTileset(string nimi, long asset, float sse, long valimuisti)
        {
            // Pois päältä asetusten ajaksi: jokainen asetin kutsuisi muuten RecreateTileset():iä.
            var go = new GameObject(nimi);
            go.SetActive(false);
            go.transform.SetParent(juuri.transform, false);
            var t = go.AddComponent<Cesium3DTileset>();
            t.tilesetSource = CesiumDataSource.FromCesiumIon;
            t.ionAssetID = asset;
            t.ionAccessToken = tunnus;
            t.maximumScreenSpaceError = sse;
            t.maximumCachedBytes = valimuisti;
            t.maximumSimultaneousTileLoads = Rinnakkain;
            t.preloadAncestors = true;
            t.preloadSiblings = false;
            t.forbidHoles = false;
            t.createPhysicsMeshes = false;
            t.showCreditsOnScreen = true;
            return t;
        }

        void LatausVirhe(Cesium3DTilesetLoadFailureDetails d)
        {
            if (!auki || d.tileset == null || d.tileset != maasto) return;
            // Viesti voi sisältää osoitteen: ei kirjata sellaisenaan (tunnus kyselyparametrissa).
            kirjaa($"kaupunki: tilesetin lataus epäonnistui ({Kaytossa}, tyyppi {d.type}, HTTP {d.httpStatusCode})");
            // Ei tuhota tilesetiä sen omassa virhekutsussa (simu 18.20: sovellus pysähtyi heti "data Ion" -rivin jälkeen):
            // vaihto seuraavaan kehykseen.
            if (Kaytossa == Lahde.Google && !vaihtoJonossa) { vaihtoJonossa = true; kierto.StartCoroutine(VaihdaIoniin()); }
        }
        bool vaihtoJonossa;

        System.Collections.IEnumerator VaihdaIoniin()
        {
            yield return null;
            yield return null;
            vaihtoJonossa = false;
            if (auki && Kaytossa == Lahde.Google) LuoData(Lahde.Ion);
        }

        /// <summary>Georeferenssin origo uuteen paikkaan (kamera lasketaan ECEF:stä joka kehys, joten kuva ei hyppää).</summary>
        public void SiirraOrigo(double lat, double lon, double korkeus)
        {
            if (georef == null || !georef.isActiveAndEnabled) return;
            georef.Initialize();
            georef.SetOriginLongitudeLatitudeHeight(lon, lat, korkeus);
        }

        /// <summary>Esilatauskamera kuvakulmaan: sama laskenta kuin PalloKierto (kohde, suuntima, kallistus pystystä, etäisyys).</summary>
        public void AsetaEsikamera(Kuvakulma k)
        {
            if (esikamera == null || georef == null) return;
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.Lon, k.Lat, k.KatseKorkeusM));
            double3 ylos = math.normalize(CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde));
            double3 ita = math.normalize(math.cross(new double3(0, 0, 1), ylos));
            double3 pohj = math.cross(ylos, ita);
            double s = math.radians(k.Suuntima), kl = math.radians(k.Kallistus);
            double3 vaaka = math.cos(s) * pohj + math.sin(s) * ita;
            double3 suunta = math.sin(kl) * vaaka - math.cos(kl) * ylos;
            double3 silma = kohde - suunta * k.EtaisyysM;
            var gt = georef.transform;
            var p = gt.TransformPoint((float3)georef.TransformEarthCenteredEarthFixedPositionToUnity(silma));
            var t = gt.TransformPoint((float3)georef.TransformEarthCenteredEarthFixedPositionToUnity(kohde));
            var yl = gt.TransformDirection((float3)georef.TransformEarthCenteredEarthFixedDirectionToUnity(ylos));
            esikamera.transform.SetPositionAndRotation(p, Quaternion.LookRotation(t - p, yl));
            if (kamera != null)
            {
                esikamera.fieldOfView = kamera.fieldOfView;
                esikamera.aspect = kamera.aspect;
                esikamera.nearClipPlane = kamera.nearClipPlane;
                esikamera.farClipPlane = kamera.farClipPlane;
                esikamera.pixelRect = kamera.pixelRect;
            }
        }

        public void Sulje()
        {
            if (!auki) return;
            Suljettu?.Invoke(this);
            auki = false;
            Cesium3DTileset.OnCesium3DTilesetLoadFailure -= LatausVirhe;
            if (hallinta != null && esikamera != null) hallinta.additionalCameras.Remove(esikamera);
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            juuri = null; maasto = null; rakennukset = null; esikamera = null; hallinta = null;
            KarttaKerrokset.RuutukrediititNakyviin = false;
            if (georef != null && georef.isActiveAndEnabled) { georef.Initialize(); georef.SetOriginLongitudeLatitudeHeight(vanhaOrigo.x, vanhaOrigo.y, vanhaOrigo.z); }
            if (palloTileset != null && palloOli) palloTileset.enabled = true;
            if (pohjaOli) Pohjapallo.Tila = pohjaTila;
            palloTileset = null; pohjaOli = false;
            if (kamera != null) { kamera.clearFlags = vanhaTyhjennys; kamera.backgroundColor = vanhaTausta; }
            georef = null; kamera = null; tunnus = null;
        }
    }
}
