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
    /// <summary>Lennon vaihe (LENNON ESITYS): Ei = ei lentoa.</summary>
    public enum LennonVaihe { Ei, Nousu, Matka, Lasku }

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
        [Tooltip("Lentokoneen 3D-malli (Natiivi-UI:n DC-3, nokka +Z); null = kuva.")]
        public GameObject koneMalli;
        [Tooltip("3D-koneen koko ruudulla iOS-pisteinä (siipiväli).")]
        public float malliPx = 90f;
        public Savujana savu;
        public Aurinko aurinko;

        GameObject olio;
        Material oma;
        Texture2D nappulaKuva, koneKuva;
        GameObject malli;
        float malliKoko = 1f;
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

        /// <summary>
        /// Lento isoympyräkaarena (lento, mannerlento) lennon esityksellä: kamera yläviistosta,
        /// nousu → matkalento → lasku puoliorbitilla, aurinko, sumu, pilvet ja savujana.
        /// </summary>
        public void Lenna(double lat0, double lon0, double lat1, double lon1, float kestoS, Action valmis)
        {
            Pysayta();
            Tee();
            Kone(true);
            Siirra(lat0, lon0, 0);
            liike = StartCoroutine(Lento(lat0, lon0, lat1, lon1, math.max(0.5f, kestoS), 0f, null, valmis));
        }

        /// <summary>
        /// Aloituslento (omistajan aloituskaava 23.9.2026): kamera zoomaa lähtöön (Lontoo),
        /// sitten lento kuten <see cref="Lenna"/>. lahti kutsutaan, kun kone irtoaa (ääni ja
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
            liike = StartCoroutine(Lento(lahtoLat, lahtoLon, lat, lon, math.max(1f, kestoS), lahtoZoomS, lahti, valmis));
        }

        /// <summary>Lennon vaihe (LENNON ESITYS): Pelikoodari ajoittaa äänet ja luennan, UI tekstit.</summary>
        public LennonVaihe Vaihe { get; private set; }
        public event Action<LennonVaihe> VaiheVaihtui;

        void AsetaVaihe(LennonVaihe v)
        {
            if (Vaihe == v) return;
            Vaihe = v;
            VaiheVaihtui?.Invoke(v);
        }

        IEnumerator Lento(double lat0, double lon0, double lat1, double lon1, float kesto, float zoomS, Action lahti, Action valmis)
        {
            kesken = valmis;
            double saapumisKorkeus = kierto != null ? kierto.KorkeusKaarelle(lahtoKaari) : 0;
            if (kierto != null && zoomS > 0)
            {
                kierto.Aja(lat0, lon0, saapumisKorkeus, zoomS, null);
                // Sormi voi keskeyttää zoomin (Aja ei silloin kutsu valmista): lento lähtee silti ajallaan.
                yield return new WaitForSecondsRealtime(zoomS);
            }
            lahti?.Invoke();

            double kulma = ReittiGeometria.Kulma(lat0, lon0, lat1, lon1);
            double reittiM = math.radians(kulma) * 6371000.0;
            double huippu = math.min(900000.0, reittiM * 0.12);
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;

            // Lähtöasento kamerasta: kuvaus liukuu siihen ensimmäisen sekunnin aikana.
            var alkuAsento = kierto != null
                ? new Asento { lat = kierto.leveys, lon = kierto.pituus, etaisyys = kierto.korkeus, kallistus = kierto.kallistus, suuntima = kierto.suuntima, katse = kierto.katseKorkeus }
                : default;
            double lahtoEtaisyys = math.max(saapumisKorkeus, kierto != null ? math.min(kierto.korkeus, saapumisKorkeus * 2.5) : 0);
            double matkaEtaisyys = math.clamp(reittiM * 0.28, lahtoEtaisyys, 1_600_000.0);

            if (savu != null) savu.Aloita();
            if (aurinko != null) aurinko.Aseta(true);
            var pilvet = Matkakirja.Linssit.Pilvet.LentoPilvet.Instanssi;
            pilvet?.Nayta(math.max(2000.0, huippu * 0.35));
            AsetaVaihe(LennonVaihe.Nousu);

            float alku = Time.unscaledTime;
            while (true)
            {
                float kulunut = Time.unscaledTime - alku;
                double t = math.saturate(kulunut / kesto);
                double p = AutokyydinVaihe(t);
                var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                double h = huippu * math.sin(math.PI * p);
                Siirra(q.x, q.y, h);
                double suunta = Suuntima(lat0, lon0, lat1, lon1, p);

                AsetaVaihe(p < NousuLoppuu ? LennonVaihe.Nousu : p < LaskuAlkaa ? LennonVaihe.Matka : LennonVaihe.Lasku);
                double nousu = Pehmea(p / NousuLoppuu);
                double lasku = Pehmea((p - LaskuAlkaa) / (1 - LaskuAlkaa));
                double matka = nousu * (1 - lasku);

                var a = new Asento
                {
                    lat = q.x,
                    lon = q.y,
                    katse = nosto + h,
                    etaisyys = math.lerp(math.lerp(lahtoEtaisyys, matkaEtaisyys, nousu), saapumisKorkeus, lasku),
                    kallistus = math.lerp(math.lerp(25.0, 55.0, nousu), 38.0, lasku),
                    // Kamera koneen takana; laskussa puoliorbitti koneen ympäri.
                    suuntima = suunta + 180.0 * lasku,
                };
                if (kierto != null)
                {
                    double sulau = Pehmea(kulunut / 1.2);
                    if (sulau < 1) a = Asento.Sekoita(alkuAsento, a, sulau);
                    kierto.Kuvaa(a.lat, a.lon, a.etaisyys, a.kallistus, a.suuntima, a.katse);
                }
                if (aurinko != null)
                {
                    if (lasku > 0.3) aurinko.Aseta(false);
                    // Etäisyyssumu matkalennon ajan: alku ja loppu karkaavat kauas nousussa ja laskussa.
                    if (matka > 0.02) aurinko.Sumu(a.etaisyys * (1.1 + 6.0 * (1 - matka)), a.etaisyys * (4.0 + 30.0 * (1 - matka)));
                    else aurinko.Sumu(0, 0);
                }
                if (pilvet != null)
                {
                    if (lasku > 0.15) { if (pilvet.Nakyvissa) pilvet.Piilota(); }
                    else pilvet.Korkeus(math.max(2000.0, (nosto + h) * 0.6));
                }
                PaivitaKone(kamera, lat0, lon0, lat1, lon1, p, huippu);
                if (t >= 1) break;
                yield return null;
            }
            liike = null;
            kesken = null;
            Paatalento();
            valmis?.Invoke();
        }

        /// <summary>Lennon esitys pois (perillä tai keskeytys): kamera palautuu, valo, sumu ja pilvet pois.</summary>
        void Paatalento()
        {
            if (kierto != null) kierto.SeurantaLoppui();
            if (savu != null) savu.Lopeta();
            if (aurinko != null) { aurinko.Aseta(false); aurinko.Sumu(0, 0); }
            var pilvet = Matkakirja.Linssit.Pilvet.LentoPilvet.Instanssi;
            if (pilvet != null && pilvet.Nakyvissa) pilvet.Piilota();
            AsetaVaihe(LennonVaihe.Ei);
            Kone(false);
        }

        const double NousuLoppuu = 0.2, LaskuAlkaa = 0.8;

        static double Pehmea(double x)
        {
            x = math.saturate(x);
            return x * x * (3 - 2 * x);
        }

        /// <summary>Lentosuunta (suuntima asteina pohjoisesta) reitin kohdassa p.</summary>
        static double Suuntima(double lat0, double lon0, double lat1, double lon1, double p)
        {
            double pa = math.min(p, 0.995), pb = pa + 0.005;
            var a = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, pa);
            var b = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, pb);
            double f1 = math.radians(a.x), f2 = math.radians(b.x), dl = math.radians(b.y - a.y);
            double y = math.sin(dl) * math.cos(f2);
            double x = math.cos(f1) * math.sin(f2) - math.sin(f1) * math.cos(f2) * math.cos(dl);
            return math.degrees(math.atan2(y, x));
        }

        struct Asento
        {
            public double lat, lon, etaisyys, kallistus, suuntima, katse;

            public static Asento Sekoita(Asento a, Asento b, double s)
            {
                double ds = ((b.suuntima - a.suuntima) % 360.0 + 540.0) % 360.0 - 180.0;
                return new Asento
                {
                    lat = math.lerp(a.lat, b.lat, s),
                    lon = a.lon + ((b.lon - a.lon + 540.0) % 360.0 - 180.0) * s,
                    etaisyys = math.exp(math.lerp(math.log(math.max(1.0, a.etaisyys)), math.log(math.max(1.0, b.etaisyys)), s)),
                    kallistus = math.lerp(a.kallistus, b.kallistus, s),
                    suuntima = a.suuntima + ds * s,
                    katse = math.lerp(a.katse, b.katse, s),
                };
            }
        }

        /// <summary>3D-kone (DC-3) paikalleen, nokka lentosuuntaan ja koko ruudulla vakio; ilman mallia kuvan kierto.</summary>
        void PaivitaKone(Camera kamera, double lat0, double lon0, double lat1, double lon1, double p, double huippu)
        {
            if (kamera == null) return;
            double p2 = math.min(1.0, p + 0.004), p1 = p2 - 0.004;
            Vector3 a = Maailmaan(lat0, lon0, lat1, lon1, p1, huippu), b = Maailmaan(lat0, lon0, lat1, lon1, p2, huippu);
            if (savu != null)
            {
                var qs = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                savu.Lisaa(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(qs.y, qs.x, nosto + huippu * math.sin(math.PI * p))));
            }
            if (malli == null) { Suunta(kamera, a, b); return; }
            var paikka = olio.transform.position;
            var ylos = (paikka - georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero))).normalized;
            var eteen = b - a;
            if (eteen.sqrMagnitude > 1e-6f) malli.transform.SetPositionAndRotation(paikka, Quaternion.LookRotation(eteen.normalized, ylos));
            else malli.transform.position = paikka;
            float etaisyys = Vector3.Distance(kamera.transform.position, paikka);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float pikseli = 2f * etaisyys * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad) / Mathf.Max(1, Screen.height);
            malli.transform.localScale = Vector3.one * (pikseli * malliPx * kerroin / malliKoko);
        }

        Vector3 Maailmaan(double lat0, double lon0, double lat1, double lon1, double p, double huippu)
        {
            var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.y, q.x, nosto + huippu * math.sin(math.PI * p)));
            return georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
        }

        /// <summary>Kuvan nokka lentosuuntaan ruudulla (kuva osoittaa ylös), kun 3D-mallia ei ole.</summary>
        void Suunta(Camera kamera, Vector3 a, Vector3 b)
        {
            Vector3 ra = kamera.WorldToScreenPoint(a), rb = kamera.WorldToScreenPoint(b);
            var d = new Vector2(rb.x - ra.x, rb.y - ra.y);
            if (d.sqrMagnitude < 1e-6f || ra.z <= 0 || rb.z <= 0) return;
            oma.SetFloat("_Kulma", Mathf.Atan2(d.y, d.x) - Mathf.PI / 2f);
        }

        /// <summary>Vaihtaa nappulan ja lentokoneen välillä: 3D-malli, jos koneMalli on annettu, muuten kuva.</summary>
        void Kone(bool paalle)
        {
            if (oma == null || kone == paalle) return;
            kone = paalle;
            if (koneMalli != null)
            {
                if (paalle && malli == null)
                {
                    malli = Instantiate(koneMalli, georeferenssi.transform, false);
                    malli.name = "Lentokone";
                    if (malli.GetComponent<Potkurit>() == null) malli.AddComponent<Potkurit>();
                    // Mallin koko (siipiväli tai pituus) maailman akseleissa ennen kiertoa.
                    malli.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
                    malli.transform.localScale = Vector3.one;
                    Bounds? rajat = null;
                    foreach (var r in malli.GetComponentsInChildren<Renderer>())
                    {
                        r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                        if (rajat == null) rajat = r.bounds; else { var b = rajat.Value; b.Encapsulate(r.bounds); rajat = b; }
                    }
                    if (rajat != null) malliKoko = Mathf.Max(0.01f, Mathf.Max(rajat.Value.size.x, rajat.Value.size.z));
                }
                if (malli != null) malli.SetActive(paalle);
                olio.SetActive(!paalle);
                if (!paalle) olio.SetActive(true);
                return;
            }
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            if (paalle && koneKuva == null) koneKuva = Kuva(koneVari, 64, 64, KoneMuoto);
            oma.SetTexture("_MainTex", paalle ? koneKuva : nappulaKuva);
            oma.SetFloat("_Koko", (paalle ? koneKoko : koko) * kerroin);
            oma.SetFloat("_Suhde", paalle ? 1f : 32f / 36f);
            oma.SetFloat("_Keskitys", paalle ? 0.5f : 0f);
            oma.SetFloat("_Kulma", 0f);
            olio.SetActive(true);
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
            if (Vaihe != LennonVaihe.Ei) Paatalento();
            else if (kierto != null) kierto.SeurantaLoppui();
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
