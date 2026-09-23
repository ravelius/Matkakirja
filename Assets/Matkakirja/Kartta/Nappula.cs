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

        GameObject olio;
        Material oma;
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
            oma.SetTexture("_MainTex", Kuva(vari));
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            oma.SetFloat("_Koko", koko * kerroin);
            r.sharedMaterial = oma;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            olio.SetActive(false);
        }

        /// <summary>Sotilasnappula (pää, kaula, runko, jalusta) tummalla ääriviivalla ja korostuksella.</summary>
        static Texture2D Kuva(Color vari)
        {
            const int L = 64, K = 72;
            var t = new Texture2D(L, K, TextureFormat.RGBA32, false) { name = "Nappula", wrapMode = TextureWrapMode.Clamp };
            var px = new Color32[L * K];
            var muste = new Color(0.16f, 0.11f, 0.07f, 1f);
            // Etäisyys muotoon (negatiivinen sisällä), yksiköt pikseleitä; y = 0 alhaalla.
            float Muoto(float x, float y)
            {
                float cx = x - L / 2f;
                float paa = new Vector2(cx, y - 55f).magnitude - 10.5f;
                float runkoLeveys = Mathf.Lerp(15f, 7f, Mathf.InverseLerp(10f, 46f, y));
                float runko = Mathf.Max(Mathf.Abs(cx) - runkoLeveys, Mathf.Max(10f - y, y - 47f));
                float jalka = new Vector2(cx / 24f, (y - 8f) / 6.5f).magnitude * 6.5f - 6.5f;
                return Mathf.Min(paa, Mathf.Min(runko, jalka));
            }
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
