using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LÄHTÖSUMU JA PILVIMERI (omistaja 24.9.2026 klo 13.5x, LENNON PINTA): kaareva, läpikuultava pilvilevy
    /// (Shaders/Usva) annettuun paikkaan ja korkeuteen. Lennon lähdössä se peittää maanpinnan lähikuvissa
    /// (Lontoon usva) ja laskussa kohteen yllä, ja sen alla pallon pinta vaihtuu pergamentista lennon pintaan
    /// ja takaisin (KarttaKerrokset.LentoPohja) — vaihto ei näy tiilinä.
    ///
    /// Levy on pallon muotoinen kalotti säteellä R + korkeus (400 km:n levy olisi tasona reunoiltaan 12 km maan
    /// yläpuolella), joten se pysyy koneen alla horisonttiin asti. Peitto häivytetään omassa Update-silmukassa
    /// (Tavoite), jotta lasku voi jatkaa häivytystä vielä Nappulan Paatalennon jälkeen.
    /// </summary>
    public sealed class Usvalevy : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Material materiaali;
        [Tooltip("Levyn säde metreinä.")]
        public float sade = 400_000f;

        static readonly int PeittoId = Shader.PropertyToID("_Peitto");
        MeshRenderer piirto;
        MaterialPropertyBlock lohko;
        float peitto, tavoite, nopeus = 1f;

        /// <summary>Kokeilu (komento "lentoharmaa usva pois"): levy ei piirry, vaikka peitto olisi päällä.</summary>
        public static bool Estetty;

        /// <summary>Nykyinen peitto 0–1.</summary>
        public float Peitto => peitto;

        /// <summary>Levy paikkaan (aste, aste, korkeus m merenpinnasta) ja peitto heti.</summary>
        public void Aseta(double lat, double lon, double korkeusM, float peittoNyt)
        {
            Tee();
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeusM));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            double3 napa = new double3(0, 0, 1);
            double3 pohjoinen = math.normalize(napa - ylos * math.dot(napa, ylos));
            var t = transform;
            t.localPosition = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            var y = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ylos);
            var z = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(pohjoinen);
            t.localRotation = Quaternion.LookRotation(z, y);
            peitto = tavoite = Mathf.Clamp01(peittoNyt);
            Paivita();
        }

        /// <summary>Peitto kohti arvoa kestoS sekunnissa (lineaarinen, pehmennetty varjostimessa).</summary>
        public void Tavoite(float arvo, float kestoS)
        {
            tavoite = Mathf.Clamp01(arvo);
            nopeus = 1f / Mathf.Max(0.05f, kestoS);
        }

        void Update()
        {
            if (piirto == null) return;
            if (!Mathf.Approximately(peitto, tavoite))
            {
                peitto = Mathf.MoveTowards(peitto, tavoite, nopeus * Time.unscaledDeltaTime);
                Paivita();
            }
        }

        void Paivita()
        {
            lohko ??= new MaterialPropertyBlock();
            lohko.SetFloat(PeittoId, peitto * peitto * (3f - 2f * peitto));
            piirto.SetPropertyBlock(lohko);
            piirto.enabled = peitto > 0.001f && !Estetty;
        }

        void Tee()
        {
            if (piirto != null) return;
            if (transform.parent != georeferenssi.transform) transform.SetParent(georeferenssi.transform, false);
            gameObject.AddComponent<MeshFilter>().sharedMesh = Kalotti(sade, 6_371_000f + 3_000f);
            piirto = gameObject.AddComponent<MeshRenderer>();
            piirto.sharedMaterial = materiaali;
            piirto.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            piirto.receiveShadows = false;
        }

        /// <summary>Pallokalotti: keskipiste origossa, ylös +Y, reuna laskee pallon kaarevuuden mukaan. uv.x = r / säde.</summary>
        static Mesh Kalotti(float sade, float pallonSade)
        {
            const int kehat = 24, sektorit = 72;
            var v = new Vector3[1 + kehat * sektorit];
            var n = new Vector3[v.Length];
            var uv = new Vector2[v.Length];
            var t = new int[sektorit * 3 + (kehat - 1) * sektorit * 6];
            v[0] = Vector3.zero; n[0] = Vector3.up; uv[0] = Vector2.zero;
            for (int k = 0; k < kehat; k++)
            {
                // Tiheämmät kehät keskellä (lähikuva), harvemmat reunalla.
                float s = (k + 1f) / kehat;
                float r = sade * s * s;
                float th = r / pallonSade;
                for (int j = 0; j < sektorit; j++)
                {
                    float f = j * Mathf.PI * 2f / sektorit;
                    var suunta = new Vector3(Mathf.Sin(f), 0, Mathf.Cos(f));
                    int i = 1 + k * sektorit + j;
                    v[i] = suunta * (pallonSade * Mathf.Sin(th)) + Vector3.up * (pallonSade * (Mathf.Cos(th) - 1f));
                    n[i] = (suunta * Mathf.Sin(th) + Vector3.up * Mathf.Cos(th)).normalized;
                    uv[i] = new Vector2(s * s, 0);
                }
            }
            int q = 0;
            for (int j = 0; j < sektorit; j++) { t[q++] = 0; t[q++] = 1 + j; t[q++] = 1 + (j + 1) % sektorit; }
            for (int k = 0; k < kehat - 1; k++)
                for (int j = 0; j < sektorit; j++)
                {
                    int a = 1 + k * sektorit + j, b = 1 + k * sektorit + (j + 1) % sektorit;
                    int c = a + sektorit, d = b + sektorit;
                    t[q++] = a; t[q++] = c; t[q++] = b;
                    t[q++] = b; t[q++] = c; t[q++] = d;
                }
            var m = new Mesh { name = "Usvalevy", vertices = v, normals = n, uv = uv, triangles = t };
            m.bounds = new Bounds(Vector3.zero, new Vector3(sade * 2f, sade, sade * 2f));
            return m;
        }
    }
}
