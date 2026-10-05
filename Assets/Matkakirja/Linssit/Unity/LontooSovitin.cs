// LONTOO-PILOTTI vaihe 1 (Päätoimittaja 5.10.2026, omistaja 16.3x; Linssiseppä): Unity-osa. Lennon logiikka ja reitti ovat
// moottorittomassa ytimessä (Linssit/Ydin/Lontoo), UI (pysähdyksen nimi, kertojan teksti, avausruutu) UI/Linssit/LontooTaulu.cs.
//
// DATA (omistajan linja 5.10. 11.45): kaikki Cesium ionista — World Terrain (1) + Bing Maps Aerial (2) rasterina sen päällä
// ja Cesium OSM Buildings (96188). BING-EHTO: ei omaa palloa eikä pergamenttia samassa näkymässä → pallon tileset ja
// Pohjapallo (pergamenttivarapinta) piiloon lennon ajaksi, siirtymä mustan avausruudun kautta, Cesiumin krediitit
// (Bingin logo ja tekijätiedot) ruudulle (KarttaKerrokset.RuutukrediititNakyviin).
//
// TUNNUS: ei repoon eikä käännökseen (lontoo-pilotti-suunnitelma §3). Kehitysvaiheessa tunnus luetaan laitteen
// Documents/cesium-ion-tunnus.txt-tiedostosta; omistajan oma rajattu tunnus (assetit 1, 2, 96188) haetaan ennen TF:ää
// ämpäristä samaan kenttään. Tunnusta ei kirjata lokiin.
//
// KAMERA: pallon oma kamera PalloKierto.Kuvaa-metodilla (sama kuin ISS:n kyyti), ajettuna ennen Cesiumin laattavalintaa
// (KyydinKameraEnnen, −50), joten nopeissa käännöksissä ei näy yhden kehyksen aukkoja. Georeferenssin origo siirretään
// lennon ajaksi Lontoon keskelle (reitti mahtuu 6 km:n säteelle → float-tarkkuus ~1 mm) ja palautetaan sulkiessa.
// ESILATAUS: piilokamera (pois päältä, cullingMask 0) seuraavan pysähdyksen asennossa CesiumCameraManagerin
// additionalCameras-listassa: Cesium valitsee laatat myös sen näkymään (native CameraManager ottaa myös pois päältä olevat).
// ODOTUS: pysähdykseen saavutaan, kun kummankin tilesetin ComputeLoadProgress() ≥ 99 (tai aikaraja, LontooLento).
using System;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Lontoo;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class LontooSovitin : ILinssi
    {
        /// <summary>Laattojen tarkkuus ja muistikatot (Lontoo-tutkimus 5.10.: SSE 32 → ~30 Mt siirtoa per kylmä lento).</summary>
        public const float MaastoSse = 16f, RakennusSse = 24f;
        public const long MaastoValimuisti = 128L << 20, RakennusValimuisti = 192L << 20;
        public const uint Rinnakkain = 12;
        /// <summary>Laattojen valmiusraja (%): ComputeLoadProgress on arvio, joten 100 ei aina täyty.</summary>
        public const float ValmisProsentti = 99f;
        /// <summary>Taivaan väri lennon ajaksi (pallon avaruuden musta ei sovi horisonttiin).</summary>
        static readonly Color Taivas = new Color(0.78f, 0.84f, 0.89f);

        public static LontooSovitin Viimeisin { get; private set; }
        /// <summary>UI kuuntelee: lento alkoi (sovitin) tai loppui (null).</summary>
        public static event Action<LontooSovitin> Vaihtui;
        /// <summary>Kehitystunnuksen polku laitteella (ei repoon).</summary>
        public static string TunnusPolku => Path.Combine(Application.persistentDataPath, "cesium-ion-tunnus.txt");
        /// <summary>
        /// TESTITILA ilman ion-tunnusta (komento "lontoo omadata 1"): maasto pallon omasta ämpäristä, ei ilmakuvaa eikä
        /// rakennuksia. Vain lennon, kameran, origon, UI:n ja sulun todentamiseen; ei pelaajalle.
        /// </summary>
        public static bool OmaData;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        ILinssiYmparisto y;
        LontooLento lento;
        GameObject juuri;
        Cesium3DTileset maasto, rakennukset;
        Camera esikamera, kamera;
        CesiumCameraManager hallinta;
        CesiumGeoreference georef;
        double3 vanhaOrigo;
        GameObject palloGo, pohjaGo;
        bool palloOli, pohjaOli;
        CameraClearFlags vanhaTyhjennys;
        Color vanhaTausta;
        int paivitetty = -1;
        float avattu;

        public LontooSovitin(LinssiOhjain o, PalloKierto kierto) { this.o = o; this.kierto = kierto; }
        public LinssiTiedot Tiedot => LontooReitti.Tiedot;
        public bool Auki => lento != null;
        public LontooLento Lento => lento;
        /// <summary>Avauksen virhe (puuttuva tunnus); UI näyttää sen tilarivillä ja sulkee linssin.</summary>
        public string Virhe { get; private set; }
        /// <summary>Laattojen latausaste 0–100 (pienempi kahdesta tilesetistä), UI:n odotusriville ja lokiin.</summary>
        public float Latausaste => maasto == null ? 0f : rakennukset == null ? maasto.ComputeLoadProgress() : Mathf.Min(maasto.ComputeLoadProgress(), rakennukset.ComputeLoadProgress());

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            Virhe = null;
            Viimeisin = this;
            string tunnus = LueTunnus();
            bool oma = OmaData;
            if (string.IsNullOrEmpty(tunnus) && !oma)
            {
                Virhe = "Lontoo: Cesium ion -tunnus puuttuu";
                Debug.LogWarning("MATKAKIRJA lontoo: ion-tunnus puuttuu (" + TunnusPolku + ")");
                lento = new LontooLento(LontooReitti.Pysahdykset);   // Auki = true, jotta UI ehtii sulkea linssin siististi
                Vaihtui?.Invoke(this);
                return;
            }
            avattu = Time.realtimeSinceStartup;
            georef = kierto != null ? kierto.georeferenssi : null;
            kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (georef == null || kamera == null) { Virhe = "Lontoo: pallon kamera puuttuu"; lento = new LontooLento(LontooReitti.Pysahdykset); Vaihtui?.Invoke(this); return; }

            if (kierto != null) SyoteLukko.Esta(this);   // pelaajan veto ei katkaise kuvausta
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Peite(true);

            // Oma pallo ja pergamenttipohja pois näkymästä (Bing-ehto).
            palloGo = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.pallo != null ? KarttaKerrokset.Instanssi.pallo.gameObject : null;
            palloOli = palloGo != null && palloGo.activeSelf;
            if (palloGo != null) palloGo.SetActive(false);
            pohjaGo = Pohjapallo.Instanssi != null ? Pohjapallo.Instanssi.gameObject : null;
            pohjaOli = pohjaGo != null && pohjaGo.activeSelf;
            if (pohjaGo != null) pohjaGo.SetActive(false);
            vanhaTyhjennys = kamera.clearFlags; vanhaTausta = kamera.backgroundColor;
            kamera.clearFlags = CameraClearFlags.SolidColor; kamera.backgroundColor = Taivas;

            vanhaOrigo = new double3(georef.longitude, georef.latitude, georef.height);
            georef.SetOriginLongitudeLatitudeHeight(LontooReitti.OrigoLon, LontooReitti.OrigoLat, LontooReitti.OrigoKorkeusM);

            juuri = new GameObject("Lontoo");
            juuri.transform.SetParent(georef.transform, false);
            if (oma)
            {
                maasto = LuoTileset("Lontoo maasto (oma testi)", 0, null, MaastoSse, MaastoValimuisti);
                maasto.tilesetSource = CesiumDataSource.FromUrl;
                maasto.url = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.pallo != null ? KarttaKerrokset.Instanssi.pallo.url : null;
            }
            else
            {
                maasto = LuoTileset("Lontoo maasto", 1, tunnus, MaastoSse, MaastoValimuisti);
                var bing = maasto.gameObject.AddComponent<CesiumIonRasterOverlay>();
                bing.ionAssetID = 2;
                bing.ionAccessToken = tunnus;
                rakennukset = LuoTileset("Lontoo rakennukset", 96188, tunnus, RakennusSse, RakennusValimuisti);
                rakennukset.gameObject.SetActive(true);
            }
            maasto.gameObject.SetActive(true);

            esikamera = new GameObject("Lontoo esilataus").AddComponent<Camera>();
            esikamera.transform.SetParent(juuri.transform, false);
            esikamera.enabled = false;
            esikamera.cullingMask = 0;
            hallinta = CesiumCameraManager.GetOrCreate(maasto.gameObject);
            if (hallinta != null && !hallinta.additionalCameras.Contains(esikamera)) hallinta.additionalCameras.Add(esikamera);

            KarttaKerrokset.RuutukrediititNakyviin = true;
            lento = new LontooLento(LontooReitti.Pysahdykset);
            lento.Saapui += i => o.Kirjaa($"lontoo: saapui {i + 1}/{lento.Reitti.Count} {lento.Reitti[i].Id} ({Time.realtimeSinceStartup - avattu:F1} s avauksesta)");
            if (o.GetComponent<KyydinKameraEnnen>() == null) o.gameObject.AddComponent<KyydinKameraEnnen>();
            KyydinKameraEnnen.Ajo = PaivitaKamera;
            PaivitaKamera();
            Vaihtui?.Invoke(this);
            o.Kirjaa((oma ? "lontoo: OMA TESTIDATA (ei ionia), " : "lontoo: ") + $"auki, arvio {lento.ArvioituKesto():F0} s, {lento.Reitti.Count} pysähdystä");
        }

        Cesium3DTileset LuoTileset(string nimi, long asset, string tunnus, float sse, long valimuisti)
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

        static string LueTunnus()
        {
            try { return File.Exists(TunnusPolku) ? File.ReadAllText(TunnusPolku).Trim() : null; }
            catch (Exception) { return null; }
        }

        /// <summary>LinssiOhjaimen Update: kamera on jo ajettu KyydinKameraEnnen-vaiheessa; tässä vain loppu.</summary>
        public void Paivita()
        {
            if (lento == null || Virhe != null) return;
            PaivitaKamera();
        }

        /// <summary>Kerran kehyksessä ennen Cesiumia: lennon tila, kamera ja esilatauskamera.</summary>
        void PaivitaKamera()
        {
            if (lento == null || Virhe != null || paivitetty == Time.frameCount) return;
            paivitetty = Time.frameCount;
            bool valmis = Latausaste >= ValmisProsentti;
            var ennen = lento.Vaihe;
            lento.Paivita(Time.unscaledDeltaTime, valmis);
            if (lento.Vaihe != ennen) o.Kirjaa($"lontoo: {ennen} → {lento.Vaihe} ({lento.Indeksi + 1}), laatat {Latausaste:F0} %");
            if (lento.Vaihe == LentoVaihe.Valmis) return;
            y.Kuvaa(lento.Asento);
            // Esilataus: lennon ja pysähdyksen aikana seuraava pysähdys, odotuksessa nykyinen.
            int seuraava = lento.Vaihe == LentoVaihe.Pysahdys ? Math.Min(lento.Indeksi + 1, lento.Reitti.Count - 1) : lento.Indeksi;
            AsetaEsikamera(lento.PysahdysAsento(seuraava, 0));
        }

        /// <summary>Esilatauskamera kuvakulmaan: sama laskenta kuin PalloKierto (kohde, suuntima, kallistus pystystä, etäisyys).</summary>
        void AsetaEsikamera(Kuvakulma k)
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

        /// <summary>Komento "lontoo ohita|tila" (LinssiOhjain) ja UI:n napautus.</summary>
        public void Ohita() => lento?.Ohita();

        public string Tila() => lento == null ? "lontoo: kiinni"
            : $"lontoo: {lento.Vaihe} {lento.Indeksi + 1}/{lento.Reitti.Count} {lento.Nykyinen.Id}, vaihe {lento.VaiheAika:F1}/{lento.VaiheKesto:F1} s, laatat {Latausaste:F0} %"
              + (Virhe != null ? ", VIRHE " + Virhe : "");

        public void Sulje()
        {
            KyydinKameraEnnen.Ajo = null;
            y?.KuvausLoppui();
            if (hallinta != null && esikamera != null) hallinta.additionalCameras.Remove(esikamera);
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            juuri = null; maasto = null; rakennukset = null; esikamera = null; hallinta = null;
            KarttaKerrokset.RuutukrediititNakyviin = false;
            if (georef != null && Virhe == null) georef.SetOriginLongitudeLatitudeHeight(vanhaOrigo.x, vanhaOrigo.y, vanhaOrigo.z);
            if (palloGo != null && palloOli) palloGo.SetActive(true);
            if (pohjaGo != null && pohjaOli) pohjaGo.SetActive(true);
            palloGo = null; pohjaGo = null;
            if (kamera != null && Virhe == null) { kamera.clearFlags = vanhaTyhjennys; kamera.backgroundColor = vanhaTausta; }
            SyoteLukko.Vapauta(this);
            if (Virhe == null)
            {
                y?.Pelikerrokset(true);
                y?.MusiikkiPitoon(false);
            }
            lento = null; georef = null; kamera = null; paivitetty = -1; Virhe = null;
            Vaihtui?.Invoke(null);
        }
    }
}
