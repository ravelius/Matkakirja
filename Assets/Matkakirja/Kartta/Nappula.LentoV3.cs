using System;
using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LENTO V3 — SAAPUMISLENTO RETRO-KAKSITASOLLA, Nappulan haara (Natiiviseppä 27.9.2026; omistaja hyväksyi 26.9. klo 23.5x,
    /// speksi docs/raportit/lento-v3-speksi.md; kamera ja kone Linssisepän LennonV3/TigerMothKone). Kun kytkin
    /// <see cref="LentoV3"/> on päällä, <see cref="Lenna"/> ja <see cref="AloitusLento"/> ajavat tämän:
    ///   1. ODOTUS elävässä näkymässä (ei feidiä eikä mustaa verhoa): nykyinen näkymä jää, esilatauskäytävä
    ///      (KarttaKerrokset.EsilataaLentoV3) latautuu ja moottori käynnistyy (tapahtuma "kaynnistys" Pelikoodarin äänelle).
    ///      Kova leikkaus, kun käytävä ≥ 96 % ja alun 5 s valmis, vähintään 0,5 s, katto 6 s (alku valmis) ja ehdoton katto
    ///      10 s (LennonV3Kaytava.Leikkaa). Mittari VerkkoOdotus "lento/v3-odotus".
    ///   2. LENTO 15,0 s: kone (TigerMothKone, Symbolimalli-varjostin ja ääriviiva kuten symbolimalleissa) reitillä
    ///      LennonV3.Reitti / ReitinKohta / KoneenOsuus, korkeus LennonV3Kaytava.KoneenKorkeus (3,5 km, vähintään 2 km
    ///      liioitellun maaston yllä, pyörät kohteen maahan), kallistus LennonV3.Kallistus ja elo TigerMothKone.Aseta;
    ///      kamera LennonV3.Kamera → PalloKierto.Kuvaa (kuten lento v2). Pinta on pelin oma pergamenttikartta: lennon
    ///      pintaa (LentoPohja), satelliittia, usvalevyä, pilviä, lennon aurinkoa ja filmipinoa ei kytketä, joten kartan
    ///      rinnevalo, horisonttiusva ja Karttataivaan utu jäävät kuten kallistetulla kartalla.
    ///   3. PERILLÄ nykyinen saapumissekvenssi kuten ennen: aloituslento jää odottamaan saapumiskorttia
    ///      (AloituslentoPerilla → PaataAloituslento), muu lento purkaa esityksen ja kutsuu valmis.
    /// Pelilogiikka (Lento.cs) ei muutu. Joka kehys ei varaa muistia (reitin pituudet valmiiksi, LennonV3:n kanavat ilman
    /// delegaatteja); koneen juuri deaktivoidaan lennon jälkeen, joten Potkurit ei pidä palloa hereillä (PallonLepo).
    /// </summary>
    public partial class Nappula
    {
        // ---- Kytkin (komento "lento v3 0|1", PlayerPrefs matkakirja-lento-v3, Documents/lento-v3.txt) ----

        /// <summary>Kehittäjälippu: 1 = lento v3 (oletus), 0 = vanha lento A/B-vertailuun. PeliOhjain säilyttää sen Uusi peli -tyhjennyksessä.</summary>
        public const string LentoV3Avain = "matkakirja-lento-v3";
        /// <summary>Documents-kansion tiedosto "0" tai "1" voittaa PlayerPrefsin (simulaattorissa ilman defaults writea).</summary>
        public const string LentoV3Tiedosto = "lento-v3.txt";
        static int lentoV3Lippu = -1;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaLentoV3() => lentoV3Lippu = -1;

        /// <summary>
        /// Ajetaanko lennot v3:lla (oletus kyllä; App Store -käännöksessä aina). Asetus muistetaan PlayerPrefsissä ja
        /// Documents/lento-v3.txt:ssä, ja se tulee voimaan seuraavasta lennosta.
        /// </summary>
        public static bool LentoV3
        {
            get
            {
#if MATKAKIRJA_APPSTORE
                return true;
#else
                if (lentoV3Lippu < 0)
                {
                    lentoV3Lippu = PlayerPrefs.GetInt(LentoV3Avain, 1) != 0 ? 1 : 0;
                    try
                    {
                        string f = System.IO.Path.Combine(Application.persistentDataPath, LentoV3Tiedosto);
                        if (System.IO.File.Exists(f))
                        {
                            string s = System.IO.File.ReadAllText(f).Trim();
                            if (s == "0" || s == "1") lentoV3Lippu = s == "1" ? 1 : 0;
                        }
                    }
                    catch (Exception) { /* valinnainen */ }
                    Debug.Log($"MATKAKIRJA lento v3: {(lentoV3Lippu != 0 ? "päällä" : "POIS (vanha lento, kehittäjälippu)")}");
                }
                return lentoV3Lippu != 0;
#endif
            }
            set
            {
                lentoV3Lippu = value ? 1 : 0;
                PlayerPrefs.SetInt(LentoV3Avain, lentoV3Lippu);
                PlayerPrefs.Save();
                try { System.IO.File.WriteAllText(System.IO.Path.Combine(Application.persistentDataPath, LentoV3Tiedosto), value ? "1" : "0"); }
                catch (Exception) { /* valinnainen */ }
            }
        }

        /// <summary>Komennon "lento v3" lokirivi.</summary>
        public static string LentoV3Kuvaus() =>
            $"MATKAKIRJA lento v3: {(LentoV3 ? "päällä (1)" : "pois (0, vanha lento)")}; kesto {LennonV3.KestoS:0.0} s, odotus "
            + $"{LennonV3Kaytava.OdotusVahintaanS:0.0}–{LennonV3Kaytava.OdotusKattoS:0}/{LennonV3Kaytava.OdotusEhdotonS:0} s, käytävä ≥ "
            + $"{LennonV3Kaytava.KaytavaKynnys:P0}";

        /// <summary>
        /// PeliOhjaimen varakello v3-lennolle (s): ehdoton odotus + 15 s + vara. Lento kutsuu valmis itse; tämä vain estää
        /// varakelloa (lennon kesto + 0,75 s) laukeamasta kesken lennon.
        /// </summary>
        public static float LentoV3VaraS => (float)(LennonV3Kaytava.OdotusEhdotonS + LennonV3.KestoS) + 1.5f;

        // ---- Rajapinta äänelle ja UI:lle ----

        /// <summary>
        /// Lennon tapahtumat moottorin äänelle (Pelikoodarin LentoAani, speksi kohta 4) ja UI:lle: "kaynnistys" (odotus alkaa:
        /// käynnistysääni), "leikkaus" (lento alkaa, kierrokset nousevat), "kosketus" (14,3 s), "tyhjakaynti" (rullaus) ja
        /// "perilla" (15 s).
        /// </summary>
        public event Action<string> LentoV3Tapahtuma;

        /// <summary>Äänen tila joka kehys (LentoAani.Tila): kameran etäisyys koneeseen (m), lähestymisnopeus (m/s, + = lähestyy),
        /// kierrokset (0–1,1) ja kaasu (0–1). Etäisyys &lt; 0 = ei lentoa.</summary>
        public struct LentoV3Aani { public float EtaisyysM, LahestymisnopeusMs, Kierrokset, Kaasu; }
        public LentoV3Aani V3Aani { get; private set; } = new LentoV3Aani { EtaisyysM = -1f };

        /// <summary>V3-lennon esitys on kuvassa (leikkauksesta purkuun): symbolimallit piiloon (speksi kohta 3).</summary>
        public bool LentoV3Esitys => v3Esitys;

        /// <summary>Kauanko v3-lento on odottanut käytävää (s); &lt; 0 = ei odota. UI: "Kone lähtee…" vasta yli 2 s (Fable 27.9.).</summary>
        public float LentoV3Odotus { get; private set; } = -1f;

        // ---- Toteutus ----

        /// <summary>Tiger Mothin siipiväli pelissä (m, speksi: 5 km).</summary>
        public const double V3SiipivaliM = 5000.0;
        /// <summary>Reitin maastonäytteitä (LennonV3Kaytava.Lisakorkeus).</summary>
        const int V3MaastoNaytteita = 32;

        TigerMothKone v3Kone;
        Material v3Materiaali, v3Reuna;
        MaterialPropertyBlock v3Lohko;
        readonly List<MeshRenderer> v3Reunat = new List<MeshRenderer>();
        float v3ReunaLeveys = -1f;
        KarttaKerrokset.KaytavaLataus v3Kaytava;
        bool v3Esitys;
        static readonly int V3TilaId = Shader.PropertyToID("_Tila");

        void V3Tapahtuma(string t)
        {
            try { LentoV3Tapahtuma?.Invoke(t); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Kone kerran (verkot, materiaali ja ääriviivat); juuri deaktivoituna.</summary>
        void V3TeeKone()
        {
            if (v3Kone != null || georeferenssi == null) return;
            var s = Resources.Load<Shader>("Symbolimalli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA lento v3: Symbolimalli-varjostin puuttuu"); return; }
            // Seepia kuten symbolimallit ja erikoismallit: värit kärkiväreinä (TigerMoth.cs), ääriviiva omana piirtonaan.
            v3Materiaali = new Material(s) { name = "TigerMoth" };
            v3Reuna = new Material(v3Materiaali) { name = "TigerMoth (ääriviiva)" };
            v3Reuna.SetFloat("_Reuna", 1f);
            v3Reuna.SetFloat("_Cull", (float)UnityEngine.Rendering.CullMode.Off);
            v3Reuna.SetFloat("_ZWrite", 0f);
            v3Reuna.renderQueue = v3Materiaali.renderQueue - 1;
            v3Lohko = new MaterialPropertyBlock();
            v3Kone = TigerMothKone.Luo(georeferenssi.transform, v3Materiaali);
            v3Reunat.Clear();
            foreach (var mf in v3Kone.GetComponentsInChildren<MeshFilter>(true))
            {
                if (mf.sharedMesh == null) continue;
                var go = new GameObject("Aariviiva");
                go.transform.SetParent(mf.transform, false);
                go.AddComponent<MeshFilter>().sharedMesh = mf.sharedMesh;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = v3Reuna;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                v3Reunat.Add(r);
            }
            // Potkurilevy (PotkuriKiekko) kuten DC-3:lla; kiekko ei pyöri lapojen mukana.
            if (v3Kone.Potkurit != null) v3Kone.Potkurit.Kiekot(kiekkoMateriaali);
            v3ReunaLeveys = -1f;
            V3Nakyvat(kerrosNakyy);
            v3Kone.gameObject.SetActive(false);
            Debug.Log($"MATKAKIRJA lento v3: kone luotu ({v3Kone.GetComponentsInChildren<Renderer>(true).Length} piirtoa)");
        }

        /// <summary>KarttaKerrokset "nappula" -portti koskee myös v3-konetta.</summary>
        void V3Nakyvat(bool nakyy)
        {
            if (v3Kone == null) return;
            foreach (var r in v3Kone.GetComponentsInChildren<Renderer>(true)) r.enabled = nakyy;
        }

        /// <summary>V3-esitys pois (perillä, keskeytys): kone deaktivoituu (Potkurit ja PallonLepo), käytävä perutaan.</summary>
        /// <summary>Laattapalvelimen saapumistilan syy lennon ajan taustatauolle.</summary>
        const string TaustaTaukoSyy = "lento-v3";

        void V3Pois()
        {
            PoistaJalki();
            EnnakkoPois();
            Laattapalvelin.AsetaSaapumistila(TaustaTaukoSyy, false);
            LentoV3Odotus = -1f;
            V3Aani = new LentoV3Aani { EtaisyysM = -1f };
            if (v3Kaytava != null) { v3Kaytava.Peru(); v3Kaytava = null; }
            if (v3Kone != null && v3Kone.gameObject.activeSelf) v3Kone.gameObject.SetActive(false);
            // Nappula palaa näkyviin kuten vanhalla lennolla Kone(false): perillä se on jo kohteessa (Siirra lennon lopussa).
            if (v3Esitys && olio != null && !kone) olio.SetActive(true);
            v3Esitys = false;
        }

        /// <summary>
        /// Kone paikalleen: juuri reitin pisteeseen korkeudelle h (ellipsoidista), nokka suuntimaan pinnan vaakatasossa,
        /// siipiväli <see cref="V3SiipivaliM"/>; elo ja kallistus TigerMothKone.Asetalla. Ääriviivan leveys 1,2 pt ruudulla.
        /// Palauttaa koneen paikan maailmassa.
        /// </summary>
        Vector3 V3AsetaKone(Camera kamera, double lat, double lon, double h, double suunta, double t, int siemen, double kallistus,
            double siipiM = V3SiipivaliM)
        {
            double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, h));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            double3 napa = new double3(0, 0, 1);
            double3 pohjoinen = math.normalize(napa - ylos * math.dot(napa, ylos));
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(suunta);
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            double3 p0 = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            double3 p1 = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef + ylos * siipiM);
            var f = (Vector3)(float3)math.normalize(georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(eteen));
            var y = (Vector3)(float3)math.normalize(georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ylos));
            var juuri = v3Kone.transform;
            juuri.localPosition = (float3)p0;
            juuri.localRotation = Quaternion.LookRotation(f, y);
            float mitta = (float)math.distance(p0, p1);
            juuri.localScale = new Vector3(mitta, mitta, mitta);
            v3Kone.Aseta(t, siemen, kallistus);
            var paikka = juuri.position;
            if (kamera != null && v3Reunat.Count > 0)
            {
                // Ääriviiva (Symbolimalli kohta 6): leveys mallin yksiköissä = 1,2 pt / koneen siipiväli pisteinä.
                float etaisyys = Vector3.Distance(kamera.transform.position, paikka);
                float pikseli = 2f * etaisyys * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad) / Mathf.Max(1, Screen.height);
                float siipiPt = mitta * georeferenssi.transform.lossyScale.x / Mathf.Max(1e-9f, pikseli) / Mathf.Max(0.01f, PalloKierto.Pistekerroin);
                float leveys = Symbolimallit.ReunaPt > 0f ? Symbolimallit.ReunaPt / Mathf.Max(1f, siipiPt) : 0f;
                if (Mathf.Abs(leveys - v3ReunaLeveys) > 0.01f * Mathf.Max(1e-6f, v3ReunaLeveys))
                {
                    v3ReunaLeveys = leveys;
                    v3Lohko.SetVector(V3TilaId, new Vector4(0f, 0f, leveys, 0f));
                    for (int i = 0; i < v3Reunat.Count; i++) v3Reunat[i].SetPropertyBlock(v3Lohko);
                }
            }
            return paikka;
        }

        /// <summary>Lennon siemen reitistä: sama lento aina sama, eri lennot eroavat (EI MONOTONIAA).</summary>
        static int V3Siemen(double lat0, double lon0, double lat1, double lon1)
        {
            unchecked
            {
                int h = 17;
                h = h * 31 + (int)math.round(lat0 * 1000);
                h = h * 31 + (int)math.round(lon0 * 1000);
                h = h * 31 + (int)math.round(lat1 * 1000);
                h = h * 31 + (int)math.round(lon1 * 1000);
                return h;
            }
        }

        /// <summary>Reitin maastonäytteet Cesiumilta (raaka korkeus, liioitellaan tuloksessa); null = ei maastoa tai kysely kaatui.</summary>
        static System.Threading.Tasks.Task<CesiumSampleHeightResult> V3MaastoKysely(List<(double Lat, double Lon)> reitti, double[] pit)
        {
            var pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
            if (pallo == null || pallo.tilesetSource != CesiumDataSource.FromUrl) return null;
            var paikat = new double3[V3MaastoNaytteita];
            for (int i = 0; i < paikat.Length; i++)
            {
                var q = LennonV3.ReitinKohta(reitti, pit, (double)i / (paikat.Length - 1));
                paikat[i] = new double3(q.Lon, q.Lat, 0);
            }
            try { return pallo.SampleHeightMostDetailed(paikat); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA lento v3: reitin maastokysely kaatui: " + e.Message); return null; }
        }

        /// <summary>Lento v3: odotus elävässä näkymässä, 15 s:n lento ja saapuminen (luokan kuvaus).</summary>
        IEnumerator LentoV3Ajo(double lat0, double lon0, double lat1, double lon1, Action lahti, Action valmis, bool aloitus)
        {
            kesken = valmis;
            AloituslentoPerilla = false;
            aloitusAjossa = aloitus;
            var merkit = aloitusMerkit != null ? aloitusMerkit : FindAnyObjectByType<KaupunkiMerkit>();
            string kohdeId = merkit != null ? merkit.LahinId(lat1, lon1) : null;
            // ALOITUSLENNON RATA (omistajan TF-löydös 27.9.2026): aloituslento lentää isoympyrän Lontoosta kohteeseen
            // AloituslennonRadan kameralla (lähtö napautusnäkymästä, lähikuva, nousu matkanäkymään, lasku); muut lennot v3.
            bool rataPaalla = aloitus && Aloitusrata && kierto != null;
            var reitti = rataPaalla ? AloituslennonRata.Isoympyra(lat0, lon0, lat1, lon1) : LennonV3.Reitti(kohdeId, lat0, lon0, lat1, lon1);
            var pit = LennonV3.Pituudet(reitti);
            double pituus = pit[pit.Length - 1];
            int siemen = V3Siemen(lat0, lon0, lat1, lon1);
            var kerrokset = KarttaKerrokset.Instanssi;
            v3Kaytava = kerrokset == null ? null
                : rataPaalla ? kerrokset.EsilataaAloitusrata(lat0, lon0, lat1, lon1) : kerrokset.EsilataaLentoV3(reitti);
            var maastoKysely = V3MaastoKysely(reitti, pit);
            // Kohteen maa (liioiteltu): kaupungin piste on maa + nosto (KaupunkiMerkit.PisteenKorkeus, löydös 166).
            double maaKohteessa = merkit != null ? merkit.PisteenKorkeus(lat1, lon1) - merkit.nosto : double.NaN;
            if (double.IsNaN(maaKohteessa)) maaKohteessa = 0;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            // Napautusnäkymä on radan alku: ei leikkausta (kamera lähtee levosta nykyisestä asennosta). Rata lasketaan jo
            // odotuksen alussa, jotta ennakkokamera pyytää lähikuvan laatat odotuksen ja syöksyn aikana.
            AloituslennonRata rata = null;
            var napautus = default(AloituslennonRata.Asento);
            if (rataPaalla)
            {
                napautus = new AloituslennonRata.Asento(kierto.leveys, kierto.pituus, kierto.korkeus, kierto.KaytettyKallistus,
                    kierto.suuntima, kierto.katseKorkeus);
                rata = new AloituslennonRata(lat0, lon0, lat1, lon1, napautus, (double)Screen.width / Mathf.Max(1, Screen.height),
                    kamera != null ? kamera.fieldOfView : 50.0, maaKohteessa);
                EnnakkoAsentoon(rata.Kamera(EnnakkoLahiS), kamera);
            }

            // 1. ODOTUS: nykyinen näkymä elää (ei feidiä eikä verhoa), käytävä latautuu, moottori käynnistyy. Kone luodaan ja
            // piirretään jo nyt lähtöpaikassaan (esilämmitys: varjostin ja verkot ennen leikkausta; valintanäkymästä se on
            // alle pikselin kokoinen).
            V3TeeKone();
            if (v3Kone != null)
            {
                var q0 = LennonV3.ReitinKohta(reitti, pit, 0);
                v3Kone.gameObject.SetActive(true);
                V3AsetaKone(kamera, q0.Lat, q0.Lon, LennonV3Kaytava.KoneenKorkeus(0, 0, maaKohteessa), q0.Suunta, 0, siemen, 0);
            }
            // Pelin lento on jo alkanut (PeliOhjain.AloitaLento ennen Lennaa): vaihe heti, jotta sen oma ajastin ei etene.
            if (!aloitus) AsetaVaihe(LennonVaihe.Nousu);
            V3Tapahtuma("kaynnistys");
            // TAUSTAJONO TAUOLLE LENNON AJAKSI (Fablen päätös 27.9. klo 12.2x): saapumistilan tavoin tausta, tavallinen
            // esilataus ja pohjan uusinta odottavat, näkyvällä kartalla on verhon paikat, ja käytävä (etusija) sekä kohdemaan
            // saapuminen jatkuvat. Päättyy perillä tai lennon purussa (V3Pois).
            Laattapalvelin.AsetaSaapumistila(TaustaTaukoSyy, true);
            float odotusAlku = Time.unscaledTime;
            var rataEhto = rata != null ? new ValmiusEhto() : null;
            string syy;
            int kehyksia = 0;
            while (true)
            {
                // Esilämmitys riittää kahdella kehyksellä; sitten kone piiloon leikkaukseen asti (kaukaa se olisi mustepiste).
                if (++kehyksia == 3 && v3Kone != null) v3Kone.gameObject.SetActive(false);
                float kulunut = Time.unscaledTime - odotusAlku;
                LentoV3Odotus = kulunut;
                // Aloitusrata: napautusnäkymä pysyy (omistaja: ei siirtymää ennen lentoa). Kaupungin napautus käynnistää myös
                // KaupunkiMerkit.ValitseKaupunki-ajon kohti kaupunkia heti aloituslennon käynnistyksen jälkeen (v4-video 27.9.:
                // kamera zoomasi odotuksessa Ateenaan ja syöksy hyppäsi takaisin); Kuvaa katkaisee ajon ja pitää asennon.
                if (rata != null)
                    kierto.Kuvaa(napautus.Lat, napautus.Lon, napautus.EtaisyysM, napautus.Kallistus, napautus.Suuntima, napautus.Katse);
                syy = LennonV3Kaytava.Leikkaa(kulunut, v3Kaytava != null ? v3Kaytava.Osuus : 1f, v3Kaytava != null ? v3Kaytava.AlkuOsuus : 1f);
                // Aloitusrata: myös Cesiumin valinta tasaantunut (ennakkokamera mukana: Lontoon lähikuvan laatat piirtoon asti,
                // v3-video 27.9.: levyltäkin ~3 s), enintään AloitusrataOdotusKattoS napautuksesta. Näkymä on koko ajan paikallaan.
                bool pallo = rata == null || Valmius.Tasaantunut(rataEhto, kerrokset != null ? kerrokset.pallo : null);
                if (syy != null && !pallo && syy == "valmis" && kulunut < AloitusrataOdotusKattoS) syy = null;
                else if (syy != null && rata != null) syy += pallo ? ", pallo valmis" : ", pallo kesken";
                if (syy != null) break;
                yield return null;
            }
            float odotusS = Time.unscaledTime - odotusAlku;
            LentoV3Odotus = -1f;
            Debug.Log($"MATKAKIRJA lento v3: odotus {odotusS:0.00} s ({syy}), käytävä "
                      + (v3Kaytava != null ? $"{v3Kaytava.Valmis}+{v3Kaytava.Epaonnistui}/{v3Kaytava.Yhteensa} ({v3Kaytava.Osuus:P0}), alku {v3Kaytava.AlkuOsuus:P0}" : "-")
                      + $", {kohdeId ?? "?"} {pituus / 1000:0} km näkyvää, välimuistista {Laattapalvelin.Valimuistista}, verkosta {Laattapalvelin.Verkosta}");
            VerkkoOdotus.Kirjaa("lento", "v3-odotus", odotusS * 1000.0);

            // 2. KOVA LEIKKAUS lähikuvaan: esitys päälle (kohteen punainen rengas ja maamerkki; reittikaaret pois, LENNON KARTTA).
            v3Esitys = true;
            if (olio != null) olio.SetActive(false);
            if (v3Kone != null) v3Kone.gameObject.SetActive(true);
            reititEnnen = kerrokset == null || kerrokset.reitit == null || kerrokset.reitit.Nakyvissa;
            kerrokset?.Nakyvyys("reitit", false);
            lentoMerkit = merkit;
            lentoIdt = kohdeId != null ? new[] { kohdeId } : null;
            if (maamerkit != null && lentoIdt != null) maamerkit.Nayta(lentoIdt);
            if (merkit != null && lentoIdt != null)
            {
                merkit.Renkaat(lentoIdt, null, LentoPunainen);
                merkit.Korosta(kohdeId, LentoPunainen);
            }
            // Kohdemaan pelin kartta kortin alle (VARTIJA 171) kuten vanhalla aloituslennolla.
            Laattapalvelin.Esilataus saapumisLataus = null;
            if (aloitus && Saapumisvartija.Paalla && kerrokset != null)
            {
                string kmaa = kohdeId != null && merkit != null ? merkit.KaupunginMaa(kohdeId) : null;
                saapumisLataus = kerrokset.EsilataaSaapumisalue(kohdeId ?? "aloituslento", kmaa, lat1, lon1, Taso.Nakyva,
                    linssi: false, maaRajaus: false, kiire: true);
            }
            lahti?.Invoke();
            AsetaVaihe(LennonVaihe.Nousu);
            V3Tapahtuma("leikkaus");
            if (rata != null)
            {
                TeeJalki(lat0, lon0, lat1, lon1);
                Debug.Log($"MATKAKIRJA aloitusrata: {kohdeId ?? "?"} {rata.ReittiM / 1000:0} km, napautus {napautus.EtaisyysM / 1000:0} km "
                          + $"{napautus.Kallistus:0}° {napautus.Suuntima:0}°, lähikuva puoli {rata.Puoli}, rajaukset "
                          + string.Join(", ", Array.ConvertAll(rata.Rajaukset, x => $"{x.T:0} s {x.EtaisyysM / 1000:0} km")));
            }

            // 3. LENTO 15,0 s.
            double[] lisa = null;
            double lisaPaino = 0;
            bool vartijaAlkoi = false, kosketus = false, tyhjakaynti = false;
            var reittiNaytteet = KamerareittiLoki && kamera != null ? new List<LennonKamerareitti.Nayte>() : null;
            float seuraavaNayte = 0f;
            double edEtaisyys = double.NaN, kallMin = 0, kallMax = 0, kierrMin = 9, kierrMax = 0, kameraMax = 0, katseMin = 0, katseMax = -90;
            float alku = Time.unscaledTime, edellinen = alku;
            while (true)
            {
                float nyt = Time.unscaledTime;
                float dt = Mathf.Max(1e-4f, nyt - edellinen);
                edellinen = nyt;
                double t = math.min(LennonV3.KestoS, nyt - alku);
                // Maaston lisäkorkeus heti, kun Cesiumin kysely valmistuu; pehmeästi 1,5 s:ssa (speksi: pehmennys 1,5 s).
                if (maastoKysely != null && maastoKysely.IsCompleted)
                {
                    var k = maastoKysely;
                    maastoKysely = null;
                    if (!k.IsFaulted && !k.IsCanceled && k.Result != null)
                    {
                        var r = k.Result;
                        var m = new double[V3MaastoNaytteita];
                        double korkein = 0;
                        for (int i = 0; i < m.Length; i++)
                        {
                            bool ok = r.sampleSuccess != null && i < r.sampleSuccess.Length && r.sampleSuccess[i];
                            m[i] = ok ? KorkeusKerroin.Sovita(r.longitudeLatitudeHeightPositions[i].z) : double.NaN;
                            if (ok) korkein = math.max(korkein, m[i]);
                        }
                        lisa = LennonV3Kaytava.Lisakorkeus(m, pituus);
                        double lisaMax = 0;
                        foreach (var x in lisa) lisaMax = math.max(lisaMax, x);
                        Debug.Log($"MATKAKIRJA lento v3: reitin maasto korkein {korkein:0} m (liioiteltu), lisäkorkeus enintään {lisaMax:0} m, t={t:0.0} s");
                    }
                    else Debug.LogWarning("MATKAKIRJA lento v3: reitin maastokysely epäonnistui, kone 3,5 km:ssä");
                }
                if (lisa != null) lisaPaino += (1.0 - lisaPaino) * (1.0 - math.exp(-dt / 1.5));
                double u = rata != null ? rata.KoneenOsuus(t) : LennonV3.KoneenOsuus(t);
                var q = LennonV3.ReitinKohta(reitti, pit, u);
                double lisaNyt = lisa != null ? LennonV3Kaytava.LisaOsuudessa(lisa, u) * lisaPaino : 0;
                var ra = rata != null ? rata.Kamera(t) : default;
                double siipi = rata != null ? AloituslennonRata.Siipivali(ra.EtaisyysM) : V3SiipivaliM;
                // Radalla: peruskorkeus (nousu Lontoosta, koon nosto) + maaston lisä nousun jälkeen; lasku kohteen maahan kuten v3.
                double h = rata != null
                    ? LennonV3Kaytava.KoneenKorkeus(t, lisaNyt * math.saturate((t - 1.2) / 3.3), maaKohteessa) - LennonV3.KoneenKorkeusM(t)
                      + AloituslennonRata.KoneenKorkeus(t, siipi)
                    : LennonV3Kaytava.KoneenKorkeus(t, lisaNyt, maaKohteessa);
                double kall = rata != null ? 0.0 : LennonV3.Kallistus(reitti, pit, t);
                Lat = q.Lat;
                Lon = q.Lon;
                AsetaVaihe(t < 5.0 ? LennonVaihe.Nousu : t < 11.0 ? LennonVaihe.Matka : LennonVaihe.Lasku);
                if (aloitus && !vartijaAlkoi && t >= 11.0)
                {
                    vartijaAlkoi = true;
                    Saapumisvartija.Aloita("aloituslento " + (kohdeId ?? "?"), "lento", saapumisLataus);
                }
                if (!kosketus && t >= LennonV3.KosketusS) { kosketus = true; V3Tapahtuma("kosketus"); }
                if (!tyhjakaynti && t >= LennonV3.KosketusS + 0.3) { tyhjakaynti = true; V3Tapahtuma("tyhjakaynti"); }

                // Kamera (LennonV3.Kamera): kone katseen kohteena, katse liukuu 13–15 s 30 % kohti kaupunkia. PalloKierto.Kuvaa:
                // kallistus pystystä = 90° − korkeuskulma, suuntima = katseen suunta = lentosuunta + θ (θ 90 = kamera vasemmalla).
                var kk = LennonV3.Kamera(t, pituus);
                double s = kk.KatseKaupunkiin;
                double klat = q.Lat + (lat1 - q.Lat) * s;
                double klon = q.Lon + ((lon1 - q.Lon + 540.0) % 360.0 - 180.0) * s;
                double katse = h + (maaKohteessa - h) * s;
                double kallistusK = 90.0 - kk.Korkeuskulma;
                if (rata != null) kierto.Kuvaa(ra.Lat, ra.Lon, ra.EtaisyysM, ra.Kallistus, ra.Suuntima, ra.Katse);
                else if (kierto != null) kierto.Kuvaa(klat, klon, kk.EtaisyysM, kallistusK, q.Suunta + kk.Theta, katse);
                Vector3 paikka = v3Kone != null ? V3AsetaKone(kamera, q.Lat, q.Lon, h, q.Suunta, t, siemen, kall, siipi) : Vector3.zero;
                if (rata != null) PaivitaJalki(u, ra.EtaisyysM, kamera);
                if (rata != null) { if (t >= EnnakkoLaskuS) EnnakkoPois(); else EnnakkoAsentoon(rata.Kamera(t < EnnakkoVaihtoS ? EnnakkoLahiS : EnnakkoLaskuS), kamera); }

                // Äänen tila (LentoAani.Tila) ja EI MONOTONIAA -seuranta lokiin.
                var elo = LennonV3.Elo(t, siemen);
                double etaisyys = kamera != null ? Vector3.Distance(kamera.transform.position, paikka) / math.max(1e-9, georeferenssi.transform.lossyScale.x) : kk.EtaisyysM;
                double lahestyy = double.IsNaN(edEtaisyys) ? 0 : (edEtaisyys - etaisyys) / dt;
                edEtaisyys = etaisyys;
                double kaasu = t < 2 ? 0.7 : t < 4 ? 1.0 : t < 11.5 ? 0.85 : t < LennonV3.KosketusS ? 0.4 : 0.1;
                V3Aani = new LentoV3Aani { EtaisyysM = (float)etaisyys, LahestymisnopeusMs = (float)lahestyy, Kierrokset = (float)elo.Kierrokset, Kaasu = (float)kaasu };
                kallMin = math.min(kallMin, kall + elo.Kallistus); kallMax = math.max(kallMax, kall + elo.Kallistus);
                kierrMin = math.min(kierrMin, elo.Kierrokset); kierrMax = math.max(kierrMax, elo.Kierrokset);
                kameraMax = rata != null ? math.max(kameraMax, ra.EtaisyysM * math.cos(math.radians(ra.Kallistus)))
                    : math.max(kameraMax, h + kk.EtaisyysM * math.sin(math.radians(kk.Korkeuskulma)));
                katseMin = math.min(katseMin, -kk.Korkeuskulma); katseMax = math.max(katseMax, -kk.Korkeuskulma);
                if (reittiNaytteet != null && (t >= seuraavaNayte || t >= LennonV3.KestoS))
                {
                    seuraavaNayte += 0.1f;
                    var kp = kamera.transform.position;
                    var ke = kamera.transform.forward;
                    reittiNaytteet.Add(new LennonKamerareitti.Nayte((float)t, kp.x, kp.y, kp.z, ke.x, ke.y, ke.z));
                }
                if (t >= LennonV3.KestoS) break;
                yield return null;
            }
            Debug.Log($"MATKAKIRJA lento v3: perillä {kohdeId ?? "?"} {Time.unscaledTime - alku:0.00} s (odotus {odotusS:0.00} s), kallistus "
                      + $"{kallMin:0.0}…{kallMax:0.0}°, kierrokset {kierrMin:0.00}…{kierrMax:0.00}, siemen {siemen}, kamera enintään {kameraMax / 1000:0.0} km, "
                      + $"katse {katseMin:0.0}…{katseMax:0.0}°, käytävä "
                      + (v3Kaytava != null ? $"{v3Kaytava.Valmis}+{v3Kaytava.Epaonnistui}/{v3Kaytava.Yhteensa}" : "-")
                      + $", välimuistista {Laattapalvelin.Valimuistista}, verkosta {Laattapalvelin.Verkosta}");
            if (reittiNaytteet != null)
                Debug.Log(LennonKamerareitti.Raportti(LennonKamerareitti.Analysoi(reittiNaytteet),
                    $"{(aloitus ? "aloituslento" : "lento")} v3 {kohdeId ?? "?"} {LennonV3.KestoS:0.0} s (oikea kamera)"));
            Laattapalvelin.AsetaSaapumistila(TaustaTaukoSyy, false);
            V3Tapahtuma("perilla");
            // Nappula kohteeseen piilossa: esityksen purku näyttää sen perillä (V3Pois).
            if (olio != null) Siirra(lat1, lon1, 0);
            liike = null;
            kesken = null;
            aloitusAjossa = false;
            // Saapuminen kuten ennen: aloituslennon esitys jää saapumiskortin alle (PaataAloituslento), muu lento purkaa sen.
            if (aloitus) AloituslentoPerilla = true;
            else Paatalento();
            valmis?.Invoke();
        }
    }
}
