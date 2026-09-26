using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KOHDEMAAN LIPPUTANKO (omistajan löydös 161, 26.9.2026, build 21 -koe): liioitellun iso 3D-lipputanko kohdemaan
    /// pääkaupunkiin tai keskipisteeseen, ja maan 1873-lippu liehuu oikeissa väreissään. Se on kartan ainoa täysvärinen
    /// kohde, yksi maa kerrallaan. Natiivi-UI asettaa sen, kun maa vaihtuu (<see cref="Aseta"/>: maa, paikka ja lipun
    /// tekstuuri Kuvat.Hae-haulta, kuten kartussi); <see cref="Pois"/> poistaa.
    ///
    /// LIEHUNTA (vaihtoehto A, oletus): lippu on 144:n aaltoileva RT (Liput.Aaltoile). Se seuraa Joutosykettä, joten se liehuu
    /// saapumisen ja kosketuksen jälkeen muutaman sekunnin, asettuu levossa suoraksi 0,3 s:ssa ja jähmettyy (lepopiirto 0
    /// kehystä). Vaihtoehto B (eristetty kerros: kartta kerran talteen, vain lippu 30 fps) on mittausta varten erikseen.
    ///
    /// MUOTO: tangon korkeus on vakio ruudulla (<see cref="KorkeusPt"/> pistettä, kuten KaupunkiMerkit), ja tanko nousee
    /// pinnan normaalin suuntaan. Suoraan ylhäältä katsottuna pystysuora tanko olisi pelkkä piste, joten akseli kallistuu
    /// normaalin ja katseen tasossa niin, että tanko on vähintään <see cref="MinKulma"/> asteen kulmassa katseeseen (näkyy
    /// seisovana; kallistetussa näkymässä se on aito pystysuora). Lippu kääntyy tangon ympäri kameraan päin ja liehuu
    /// ruudulla oikealle (kuvan tankopuoli pysyy tangossa). Horisonttiusva (Shaders/Horisonttiusva.hlsl) häivyttää sen
    /// kuten 153:n nostot. Piilossa lennon, linssin ja aloitusportin aikana sekä pallon takana.
    /// Komennot: `lipputanko tila | pois | koe [lat lon] | koko <pt>` (Komennot.cs).
    /// </summary>
    [DefaultExecutionOrder(110)]
    public sealed class Lipputanko : MonoBehaviour
    {
        /// <summary>Tangon korkeus ruudun pisteinä (liioiteltu, omistaja: "liioitellun iso").</summary>
        public static float KorkeusPt = 120f;
        /// <summary>Lipun korkeus tangon korkeudesta.</summary>
        public const float LipunOsuus = 0.36f;
        /// <summary>Tangon pienin kulma katseeseen (°): ylhäältä katsottuna tanko kallistuu näkyviin.</summary>
        public const float MinKulma = 55f;
        const float Sade = 0.013f, NupinSade = 0.03f;

        /// <summary>
        /// Omistaja 26.9. klo 10.0x: lippu liehuu KOKO AJAN (elävällä kerroksella, kartta 0 kehystä). false = vaihtoehto A
        /// (Joutosyke: liehuu kosketuksen jälkeen ja jähmettyy levossa), mittausta varten (komento `lipputanko jatkuva|syke`).
        /// </summary>
        public static bool Jatkuva = true;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { KorkeusPt = 120f; Jatkuva = true; instanssi = null; }

        /// <summary>Vaihtoehdon vaihto ajossa (A/B-mittaus).</summary>
        public static void AsetaJatkuva(bool j)
        {
            Jatkuva = j;
            if (instanssi != null && instanssi.aalto != null) instanssi.aalto.Jatkuva = j;
            PallonLepo.Muuttui("lipputanko");
        }

        static Lipputanko instanssi;

        /// <summary>Nykyinen maa (ISO3) tai null.</summary>
        public static string Maa => instanssi != null && instanssi.asetettu ? instanssi.maa : null;

        /// <summary>
        /// Lipputanko maahan <paramref name="iso3"/> paikkaan (lat, lon; pääkaupunki tai maan keskipiste) ja lippu
        /// <paramref name="lippu"/>sta (Kuvat.Hae, ei omisteta). korkeusM = maanpinnan korkeus paikassa (KorkeusKerroin nostaa).
        /// </summary>
        public static void Aseta(string iso3, double lat, double lon, Texture lippu, double korkeusM = 0)
        {
            var t = Hae();
            if (t == null) { Debug.LogWarning("MATKAKIRJA lipputanko: pallo puuttuu"); return; }
            t.AsetaNyt(iso3, lat, lon, lippu, korkeusM);
        }

        /// <summary>Tanko pois (maa vaihtuu tai kartta sulkeutuu).</summary>
        public static void Pois() { if (instanssi != null) instanssi.PoisNyt(); }

        /// <summary>Tila lokiin.</summary>
        public static string Tila() => instanssi == null ? "ei luotu" : instanssi.Kuvaus();

        /// <summary>Kokeen lippu ilman verkkoa (komento `lipputanko koe`): Kreikan 1873 maalippu, valkoinen risti sinisellä.</summary>
        public static Texture2D Koelippu()
        {
            const int w = 90, h = 60;
            var tx = new Texture2D(w, h, TextureFormat.RGBA32, false) { name = "Lipputanko-koe", wrapMode = TextureWrapMode.Clamp };
            var sini = new Color32(13, 94, 175, 255); var valk = new Color32(255, 255, 255, 255);
            var px = new Color32[w * h];
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                    px[y * w + x] = (Mathf.Abs(x - w / 2) < 7 || Mathf.Abs(y - h / 2) < 7) ? valk : sini;
            tx.SetPixels32(px);
            tx.Apply(false, true);
            return tx;
        }

        static Lipputanko Hae()
        {
            if (instanssi != null) return instanssi;
            var geo = FindAnyObjectByType<CesiumGeoreference>();
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (geo == null || kierto == null) return null;
            var go = new GameObject("Lipputanko");
            go.transform.SetParent(geo.transform, false);
            instanssi = go.AddComponent<Lipputanko>();
            instanssi.georeferenssi = geo;
            instanssi.kierto = kierto;
            instanssi.kamera = kierto.GetComponent<Camera>();
            instanssi.aurinko = FindAnyObjectByType<Aurinko>();
            instanssi.Rakenna();
            return instanssi;
        }

        CesiumGeoreference georeferenssi;
        PalloKierto kierto;
        Camera kamera;
        Aurinko aurinko;
        MeshRenderer tanko, nuppi, lippu;
        Transform lippuT;
        Material tankoMat, nuppiMat, lippuMat;
        Liput.Aalto aalto;
        Texture lahde;
        string maa;
        bool asetettu, nakyi;
        double lat, lon, korkeus;
        Vector3 normaaliPaikallinen;

        void Rakenna()
        {
            var shader = Resources.Load<Shader>("Lipputanko");
            if (shader == null) { Debug.LogWarning("MATKAKIRJA lipputanko: varjostin puuttuu"); enabled = false; return; }
            tankoMat = new Material(shader) { name = "Lipputanko-tanko" };
            tankoMat.SetColor("_BaseColor", new Color(0.33f, 0.26f, 0.19f));
            nuppiMat = new Material(shader) { name = "Lipputanko-nuppi" };
            nuppiMat.SetColor("_BaseColor", new Color(0.80f, 0.63f, 0.28f));
            lippuMat = new Material(shader) { name = "Lipputanko-lippu" };
            tanko = Osa("Tanko", Sylinteri(Sade, 1f, 8), tankoMat);
            nuppi = Osa("Nuppi", Nuppi(NupinSade, 1f + NupinSade * 0.6f), nuppiMat);
            lippu = Osa("Lippu", Nelio(), lippuMat);
            lippuT = lippu.transform;
            Nayta(false);
        }

        MeshRenderer Osa(string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return r;
        }

        void AsetaNyt(string iso3, double la, double lo, Texture kuva, double korkeusM)
        {
            maa = iso3; lat = la; lon = lo; korkeus = korkeusM;
            if (kuva != lahde)
            {
                if (aalto != null) { Liput.Vapauta(aalto); aalto = null; }
                lahde = kuva;
                if (kuva != null)
                {
                    // RT:n koko lipun ruutukoosta (pisteet × pistekerroin), marginaali mukaan; katto 512.
                    float hPx = KorkeusPt * LipunOsuus * PalloKierto.Pistekerroin / (1f - 2f * Liput.Reuna);
                    float suhde = kuva.width / (float)Mathf.Max(1, kuva.height);
                    int h = Mathf.Clamp(Mathf.CeilToInt(hPx), 16, 512), w = Mathf.Clamp(Mathf.CeilToInt(hPx * suhde), 16, 512);
                    aalto = Liput.Aaltoile(kuva, w, h);
                    aalto.Jatkuva = Jatkuva;
                    lippuMat.mainTexture = aalto.Kuva;
                    lippu.GetComponent<MeshFilter>().sharedMesh = Nelio(suhde);
                }
            }
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lo, la, 0));
            var n = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            normaaliPaikallinen = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(n)).normalized;
            transform.localPosition = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef)
                                      + (float3)normaaliPaikallinen * (float)KorkeusKerroin.Lisays(korkeusM);
            asetettu = true;
            PallonLepo.Muuttui("lipputanko");
            Debug.Log("MATKAKIRJA lipputanko: " + Kuvaus());
        }

        void PoisNyt()
        {
            asetettu = false;
            if (aalto != null) { Liput.Vapauta(aalto); aalto = null; }
            lahde = null;
            Nayta(false);
            PallonLepo.Muuttui("lipputanko");
        }

        void Nayta(bool n)
        {
            if (tanko != null && tanko.enabled != n) { tanko.enabled = n; nuppi.enabled = n; }
            bool l = n && aalto != null;
            if (lippu != null && lippu.enabled != l) lippu.enabled = l;
            if (aalto != null) aalto.Nakyy = l;
            nakyi = n;
        }

        void LateUpdate()
        {
            if (!asetettu || kamera == null) { if (nakyi) Nayta(false); return; }
            var kk = KarttaKerrokset.Instanssi;
            bool sallittu = !PalloKierto.PorttiSumea && !(kk != null && kk.LinssiPaalla) && !(aurinko != null && aurinko.Paalla);
            var gt = georeferenssi.transform;
            Vector3 p = transform.position;
            Vector3 n = gt.TransformDirection(normaaliPaikallinen).normalized;
            Vector3 kohti = kamera.transform.position - p;
            float etaisyys = kohti.magnitude;
            Vector3 v = kohti / Mathf.Max(1e-6f, etaisyys);
            bool edessa = Vector3.Dot(n, v) > 0.12f;
            if (!sallittu || !edessa) { if (nakyi) { Nayta(false); PallonLepo.Muuttui("lipputanko"); } return; }
            if (!nakyi) { Nayta(true); PallonLepo.Muuttui("lipputanko"); }

            // Akseli: normaali, mutta vähintään MinKulma katseesta (normaalin ja katseen tasossa, katseesta poispäin).
            float kulma = Mathf.Acos(Mathf.Clamp(Vector3.Dot(n, v), -1f, 1f)) * Mathf.Rad2Deg;
            Vector3 akseli = n;
            if (kulma < MinKulma)
            {
                // Kallistus ruudun ylöspäin (ylhäältä katsottuna tanko "seisoo" kartalla; normaalin oma suunta on silloin satunnainen).
                Vector3 t = Vector3.ProjectOnPlane(kamera.transform.up, v).normalized;
                float a = MinKulma * Mathf.Deg2Rad;
                akseli = (v * Mathf.Cos(a) + t * Mathf.Sin(a)).normalized;
            }
            Vector3 eteen = Vector3.ProjectOnPlane(v, akseli);
            if (eteen.sqrMagnitude < 1e-8f) eteen = Vector3.ProjectOnPlane(-kamera.transform.forward, akseli);
            var suunta = Quaternion.LookRotation(eteen.normalized, akseli);

            // Vakio ruutukoko (KaupunkiMerkit): yksi piste tällä etäisyydellä.
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float piste = 2f * etaisyys * tanPuoli / (Screen.height / PalloKierto.Pistekerroin);
            float koko = piste * KorkeusPt / Mathf.Max(1e-9f, gt.lossyScale.x);
            if (transform.rotation != suunta) transform.rotation = suunta;
            var s = Vector3.one * koko;
            if ((transform.localScale - s).sqrMagnitude > 1e-6f * koko * koko) transform.localScale = s;
        }

        string Kuvaus() =>
            $"maa {maa ?? "-"}, paikka {lat:0.00} {lon:0.00}, näkyy {nakyi}, lippu {(lahde != null ? lahde.width + "×" + lahde.height : "-")}" +
            $"{(aalto != null ? $" (RT {aalto.Kuva.width}×{aalto.Kuva.height})" : "")}, korkeus {KorkeusPt:0} pt";

        void OnDestroy()
        {
            if (aalto != null) Liput.Vapauta(aalto);
            Destroy(tankoMat); Destroy(nuppiMat); Destroy(lippuMat);
            if (instanssi == this) instanssi = null;
        }

        // ---- Verkot (paikallinen +Y = tangon akseli, 1 = tangon korkeus) ----

        static Mesh Sylinteri(float r, float h, int sivuja)
        {
            var v = new Vector3[sivuja * 2 + 2]; var nn = new Vector3[v.Length]; var t = new int[sivuja * 6 + sivuja * 3];
            for (int i = 0; i < sivuja; i++)
            {
                float a = i * Mathf.PI * 2f / sivuja;
                var d = new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a));
                v[i] = d * r; v[sivuja + i] = d * r + Vector3.up * h;
                nn[i] = nn[sivuja + i] = d;
            }
            int k = 0;
            for (int i = 0; i < sivuja; i++)
            {
                int j = (i + 1) % sivuja;
                t[k++] = i; t[k++] = sivuja + i; t[k++] = j;
                t[k++] = j; t[k++] = sivuja + i; t[k++] = sivuja + j;
            }
            int keski = sivuja * 2;
            v[keski] = Vector3.up * h; nn[keski] = Vector3.up;
            v[keski + 1] = Vector3.zero; nn[keski + 1] = Vector3.down;
            for (int i = 0; i < sivuja; i++) { t[k++] = keski; t[k++] = sivuja + (i + 1) % sivuja; t[k++] = sivuja + i; }
            var m = new Mesh { name = "Lipputanko-tanko", vertices = v, normals = nn, triangles = t };
            m.bounds = new Bounds(Vector3.up * h * 0.5f, new Vector3(1f, h + 0.2f, 1f));
            return m;
        }

        static Mesh Nuppi(float r, float y)
        {
            // Oktaedri: kuusi kärkeä, tasavarjostettu (kärjet toistettu sivuittain).
            var p = new[] { Vector3.up, Vector3.down, Vector3.right, Vector3.left, Vector3.forward, Vector3.back };
            int[,] sivut = { { 0, 4, 2 }, { 0, 2, 5 }, { 0, 5, 3 }, { 0, 3, 4 }, { 1, 2, 4 }, { 1, 5, 2 }, { 1, 3, 5 }, { 1, 4, 3 } };
            var v = new Vector3[24]; var nn = new Vector3[24]; var t = new int[24];
            for (int i = 0; i < 8; i++)
            {
                Vector3 a = p[sivut[i, 0]], b = p[sivut[i, 1]], c = p[sivut[i, 2]];
                var normaali = Vector3.Cross(b - a, c - a).normalized;
                for (int j = 0; j < 3; j++) { v[i * 3 + j] = p[sivut[i, j]] * r + Vector3.up * y; nn[i * 3 + j] = normaali; t[i * 3 + j] = i * 3 + j; }
            }
            return new Mesh { name = "Lipputanko-nuppi", vertices = v, normals = nn, triangles = t };
        }

        /// <summary>
        /// Lipun nelikulmio: RT:ssä on Liput.Reuna-marginaali joka reunalla, joten nelikulmio on 1 / (1 − 2 · Reuna) kertaa
        /// näkyvä lippu. Lippu liehuu paikallista −X:ää kohti (ruudulla oikealle, kun +Z katsoo kameraan), tankopuoli
        /// (u = 0) tangossa ja yläreuna tangon latvan alla.
        /// </summary>
        static Mesh Nelio(float suhde = 1.5f)
        {
            float hn = LipunOsuus, wn = LipunOsuus * suhde, R = Liput.Reuna, k = 1f / (1f - 2f * R);
            float H = hn * k, W = wn * k, yla = 0.985f;
            float x0 = W * R, x1 = -W * (1f - R), y1 = yla + H * R, y0 = y1 - H;
            var m = new Mesh
            {
                name = "Lipputanko-lippu",
                vertices = new[] { new Vector3(x0, y0, 0), new Vector3(x1, y0, 0), new Vector3(x0, y1, 0), new Vector3(x1, y1, 0) },
                normals = new[] { Vector3.forward, Vector3.forward, Vector3.forward, Vector3.forward },
                uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) },
                triangles = new[] { 0, 2, 1, 1, 2, 3 },
            };
            return m;
        }
    }
}
