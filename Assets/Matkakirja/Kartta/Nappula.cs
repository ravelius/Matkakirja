using System;
using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pelinappula kartalla ja sen liike (Fablen tarkastus B16; web js/pallolauta/siirto.js
    /// ja js/siirtokoreografia.js):
    ///   AUTOKYYTI (liftaus, laiva, bussi): koko matka yhdellä käyrällä, joka kiihdyttää
    ///   lähtiessä ja jarruttaa perillä (autokydinVaihe), ja jokaisella matkapisteellä vauhti
    ///   notkahtaa osuuteen 0,4 (matkanVaihe) — nappula kulkee pisteiden läpi eikä hypi.
    ///   LENTO: isoympyräkaari ylös ja alas samalla käyrällä.
    /// Kamera seuraa nappulaa, kun seuraaKamera on päällä (Pelikoodari: Matkalla-tila).
    /// Hahmo on webin pawnShape (sotilasnappula) koodista piirrettynä, jalka pisteessä.
    /// </summary>
    public class Nappula : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Material materiaali;
        [Tooltip("Nappulan korkeus iOS-pisteinä (web 36 px).")]
        public float koko = 36f;
        [Tooltip("Korkeus ellipsoidin yläpuolella, metreinä (kuten merkit).")]
        public double nosto = 5000.0;
        public Color vari = new Color32(0x9a, 0x3b, 0x2c, 0xff);
        public bool seuraaKamera = true;

        /// <summary>Webin MATKAPISTEEN_VAUHTI: vauhti matkapisteen kohdalla suhteessa välin keskinopeuteen.</summary>
        public const double MatkapisteenVauhti = 0.4;

        public double Lat { get; private set; }
        public double Lon { get; private set; }
        public bool Nakyy => olio != null && olio.activeSelf;
        public bool Liikkeessa => liike != null;

        [Header("Aloituslento")]
        [Tooltip("Lentokoneen koko iOS-pisteinä.")]
        public float koneKoko = 44f;
        [Tooltip("Kaari (°), jolla kamera näyttää lähtökaupungin ennen lentoa.")]
        public double lahtoKaari = 18.6;
        [Tooltip("Kameran zoomi lähtöön, sekunteja.")]
        public float lahtoZoomS = 2.5f;
        public Color koneVari = new Color32(0x9a, 0x3b, 0x2c, 0xff);

        GameObject olio;
        Material oma;
        Texture2D nappulaKuva, koneKuva;
        bool kone;
        Coroutine liike;
        Action kesken;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
        }

        // ---- Rajapinta ----

        /// <summary>Nappula näkyviin pisteeseen (saapuminen, lataus).</summary>
        public void Aseta(double lat, double lon)
        {
            Pysayta();
            Tee();
            Siirra(lat, lon, 0);
            olio.SetActive(true);
        }

        public void Piilota()
        {
            Pysayta();
            if (olio != null) olio.SetActive(false);
        }

        /// <summary>
        /// Autokyyti matkapisteiden läpi (ensimmäinen = lähtö). valmis kutsutaan perillä;
        /// uusi Aja/Lenna/Aseta keskeyttää ilman valmis-kutsua.
        /// </summary>
        public void Aja(IList<(double lat, double lon)> matkapisteet, float kestoS, Action valmis)
        {
            if (matkapisteet == null || matkapisteet.Count == 0) { valmis?.Invoke(); return; }
            Pysayta();
            Tee();
            olio.SetActive(true);
            var pisteet = new List<(double lat, double lon)>(matkapisteet);
            if (pisteet.Count == 1) { Siirra(pisteet[0].lat, pisteet[0].lon, 0); valmis?.Invoke(); return; }
            liike = StartCoroutine(Kulje(kestoS, valmis, t =>
            {
                double p = MatkanVaihe(t, pisteet.Count - 1);
                double raaka = p * (pisteet.Count - 1);
                int i = math.min(pisteet.Count - 2, (int)math.floor(raaka));
                var a = pisteet[i];
                var b = pisteet[i + 1];
                var q = ReittiGeometria.Isoympyra(a.lat, a.lon, b.lat, b.lon, raaka - i);
                return (q.x, q.y, 0.0);
            }));
        }

        /// <summary>Lento isoympyrää pitkin kaarena (lento, mannerlento).</summary>
        public void Lenna(double lat0, double lon0, double lat1, double lon1, float kestoS, Action valmis)
        {
            Pysayta();
            Tee();
            olio.SetActive(true);
            double kulma = ReittiGeometria.Kulma(lat0, lon0, lat1, lon1);
            double huippu = math.min(900000.0, math.radians(kulma) * 6371000.0 * 0.12); // Kulma on asteina
            liike = StartCoroutine(Kulje(kestoS, valmis, t =>
            {
                double p = AutokyydinVaihe(t);
                var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                return (q.x, q.y, huippu * math.sin(math.PI * p));
            }));
        }

        /// <summary>
        /// Aloituslento (omistajan aloituskaava 23.9.2026): kamera zoomaa lähtöön (Lontoo),
        /// lentokone lähtee isoympyräkaarta pitkin kohteeseen, ja kamera seuraa konetta
        /// nousten niin, että kaari mahtuu kuvaan. lahti kutsutaan, kun kone irtoaa (ääni ja
        /// luenta alkavat), valmis perillä. kestoS = lennon kesto ilman zoomia (intro-luennan
        /// pituus, vähintään 20 s). Uusi Aja/Lenna/Aseta keskeyttää ilman valmis-kutsua;
        /// perillä kone vaihtuu takaisin nappulaksi.
        /// </summary>
        public void AloitusLento(double lahtoLat, double lahtoLon, double lat, double lon, float kestoS, Action lahti, Action valmis)
        {
            Pysayta();
            Tee();
            Kone(true);
            Siirra(lahtoLat, lahtoLon, 0);
            olio.SetActive(true);
            liike = StartCoroutine(Aloitus(lahtoLat, lahtoLon, lat, lon, math.max(1f, kestoS), lahti, valmis));
        }

        IEnumerator Aloitus(double lat0, double lon0, double lat1, double lon1, float kesto, Action lahti, Action valmis)
        {
            kesken = valmis;
            double lahtoKorkeus = kierto != null ? kierto.KorkeusKaarelle(lahtoKaari) : 0;
            if (kierto != null)
            {
                kierto.Aja(lat0, lon0, lahtoKorkeus, lahtoZoomS, null);
                // Sormi voi keskeyttää zoomin (Aja ei silloin kutsu valmista): lento lähtee silti ajallaan.
                yield return new WaitForSecondsRealtime(lahtoZoomS);
            }
            lahti?.Invoke();
            double kulma = ReittiGeometria.Kulma(lat0, lon0, lat1, lon1);
            double huippu = math.min(900000.0, math.radians(kulma) * 6371000.0 * 0.12);
            // Kamera nousee lennon puolivälissä niin korkealle, että koko kaari näkyy.
            double huippuKorkeus = kierto != null ? math.max(lahtoKorkeus, kierto.KorkeusKaarelle(math.min(120.0, kulma * 1.4))) : 0;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            float alku = Time.unscaledTime;
            while (true)
            {
                double t = math.saturate((Time.unscaledTime - alku) / kesto);
                double p = AutokyydinVaihe(t);
                var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                Siirra(q.x, q.y, huippu * math.sin(math.PI * p));
                if (kierto != null)
                {
                    double nousu = math.sin(math.PI * math.saturate(t * 1.15 - 0.075));
                    kierto.Seuraa(q.x, q.y, math.lerp(lahtoKorkeus, huippuKorkeus, nousu));
                }
                if (kamera != null) Suunta(kamera, p, lat0, lon0, lat1, lon1, huippu);
                if (t >= 1) break;
                yield return null;
            }
            liike = null;
            kesken = null;
            if (kierto != null) kierto.SeurantaLoppui();
            Kone(false);
            valmis?.Invoke();
        }

        /// <summary>Koneen nokka lentosuuntaan ruudulla (kuva osoittaa ylös).</summary>
        void Suunta(Camera kamera, double p, double lat0, double lon0, double lat1, double lon1, double huippu)
        {
            double p2 = math.min(1.0, p + 0.01);
            if (p2 <= p) return;
            var a = olio.transform.position;
            var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p2);
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.y, q.x, nosto + huippu * math.sin(math.PI * p2)));
            var b = georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
            Vector3 ra = kamera.WorldToScreenPoint(a), rb = kamera.WorldToScreenPoint(b);
            var d = new Vector2(rb.x - ra.x, rb.y - ra.y);
            if (d.sqrMagnitude < 1e-6f || ra.z <= 0 || rb.z <= 0) return;
            oma.SetFloat("_Kulma", Mathf.Atan2(d.y, d.x) - Mathf.PI / 2f);
        }

        /// <summary>Vaihtaa kuvan nappulan ja lentokoneen välillä.</summary>
        void Kone(bool paalle)
        {
            if (oma == null || kone == paalle) return;
            kone = paalle;
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            if (paalle && koneKuva == null) koneKuva = Kuva(koneVari, 64, 64, KoneMuoto);
            oma.SetTexture("_MainTex", paalle ? koneKuva : nappulaKuva);
            oma.SetFloat("_Koko", (paalle ? koneKoko : koko) * kerroin);
            oma.SetFloat("_Suhde", paalle ? 1f : 32f / 36f);
            oma.SetFloat("_Keskitys", paalle ? 0.5f : 0f);
            oma.SetFloat("_Kulma", 0f);
        }

        // ---- Käyrät (web js/siirtokoreografia.js) ----

        public static double AutokyydinVaihe(double t)
        {
            double x = math.saturate(t);
            return x < 0.5 ? 2 * x * x : 1 - math.pow(-2 * x + 2, 2) / 2;
        }

        public static double MatkanVaihe(double t, int pisteita)
        {
            int n = math.max(1, pisteita);
            double x = AutokyydinVaihe(t);
            if (n < 2 || x <= 0 || x >= 1) return x;
            double k = 1 - MatkapisteenVauhti;
            double raaka = x * n;
            int i = math.min(n - 1, (int)math.floor(raaka));
            double u = raaka - i;
            return (i + (u - k / (2 * math.PI) * math.sin(2 * math.PI * u))) / n;
        }

        // ---- Toteutus ----

        IEnumerator Kulje(float kestoS, Action valmis, Func<double, (double lat, double lon, double h)> paikka)
        {
            kesken = valmis;
            float alku = Time.unscaledTime;
            float kesto = math.max(0.05f, kestoS);
            while (true)
            {
                double t = math.saturate((Time.unscaledTime - alku) / kesto);
                var (lat, lon, h) = paikka(t);
                Siirra(lat, lon, h);
                if (seuraaKamera && kierto != null) kierto.Seuraa(lat, lon);
                if (t >= 1) break;
                yield return null;
            }
            liike = null;
            kesken = null;
            if (kierto != null) kierto.SeurantaLoppui();
            valmis?.Invoke();
        }

        void Pysayta()
        {
            if (liike != null) StopCoroutine(liike);
            liike = null;
            kesken = null;
            if (kierto != null) kierto.SeurantaLoppui();
            Kone(false);
        }

        void Siirra(double lat, double lon, double h)
        {
            Lat = lat;
            Lon = lon;
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, nosto + h));
            olio.transform.localPosition = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        void LateUpdate()
        {
            if (oma == null || georeferenssi == null) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
        }

        void Tee()
        {
            if (olio != null) return;
            olio = new GameObject("Pelinappula");
            olio.transform.SetParent(georeferenssi.transform, false);
            var m = new Mesh { name = "Nappula" };
            m.vertices = new Vector3[4];
            m.uv = new[] { new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(-1, 1) };
            m.triangles = new[] { 0, 2, 1, 0, 3, 2 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e7f);
            olio.AddComponent<MeshFilter>().sharedMesh = m;
            var r = olio.AddComponent<MeshRenderer>();
            oma = new Material(materiaali);
            nappulaKuva = Kuva(vari, 64, 72, NappulaMuoto);
            oma.SetTexture("_MainTex", nappulaKuva);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            oma.SetFloat("_Koko", koko * kerroin);
            r.sharedMaterial = oma;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            olio.SetActive(false);
        }

        /// <summary>Sotilasnappula (pää, kaula, runko, jalusta): etäisyys muotoon (negatiivinen sisällä), 64×72 px, y = 0 alhaalla.</summary>
        static float NappulaMuoto(float x, float y)
        {
            float cx = x - 32f;
            float paa = new Vector2(cx, y - 55f).magnitude - 10.5f;
            float runkoLeveys = Mathf.Lerp(15f, 7f, Mathf.InverseLerp(10f, 46f, y));
            float runko = Mathf.Max(Mathf.Abs(cx) - runkoLeveys, Mathf.Max(10f - y, y - 47f));
            float jalka = new Vector2(cx / 24f, (y - 8f) / 6.5f).magnitude * 6.5f - 6.5f;
            return Mathf.Min(paa, Mathf.Min(runko, jalka));
        }

        /// <summary>Lentokone ylhäältä, nokka ylöspäin (runko, siivet, pyrstö), 64×64 px.</summary>
        static float KoneMuoto(float x, float y)
        {
            float cx = Mathf.Abs(x - 32f);
            float runko = Mathf.Max(cx - 4.5f, Mathf.Max(6f - y, y - 58f));
            float nokka = new Vector2(cx, y - 57f).magnitude - 4.5f;
            // Siivet: nuolimaiset, juuresta (y 40) kärkeen (y 30), paksuus 8 px.
            float siipiY = 40f - cx * 0.4f;
            float siipi = Mathf.Max(cx - 29f, Mathf.Abs(y - siipiY) - 4f);
            float pyrstoY = 12f - cx * 0.3f;
            float pyrsto = Mathf.Max(cx - 12f, Mathf.Abs(y - pyrstoY) - 3f);
            return Mathf.Min(Mathf.Min(runko, nokka), Mathf.Min(siipi, pyrsto));
        }

        /// <summary>Kuva etäisyysmuodosta tummalla ääriviivalla ja korostuksella.</summary>
        static Texture2D Kuva(Color vari, int L, int K, Func<float, float, float> Muoto)
        {
            var t = new Texture2D(L, K, TextureFormat.RGBA32, false) { name = "Nappula", wrapMode = TextureWrapMode.Clamp };
            var px = new Color32[L * K];
            var muste = new Color(0.16f, 0.11f, 0.07f, 1f);
            for (int y = 0; y < K; y++)
                for (int x = 0; x < L; x++)
                {
                    float d = Muoto(x + 0.5f, y + 0.5f);
                    float peitto = Mathf.Clamp01(0.5f - d);
                    if (peitto <= 0) { px[y * L + x] = new Color32(0, 0, 0, 0); continue; }
                    float reuna = Mathf.Clamp01(d + 2.5f);
                    // Korostus vasemmalta ylhäältä.
                    float valo = Mathf.Clamp01(0.5f - (x - L / 2f) / 40f + (y - K / 2f) / 90f) * 0.35f;
                    var c = Color.Lerp(Color.Lerp(vari, Color.white, valo), muste, reuna);
                    c.a = peitto;
                    px[y * L + x] = c;
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return t;
        }
    }
}
