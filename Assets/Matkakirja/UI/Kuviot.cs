// KUVIOT: verkkopelin liukuvärit ja paperin rae tekstuureina (Natiivi-UI).
//
// USS:ssä ei ole linear-/radial-gradientia eikä background-blend-modea, joten
// verkkopelin taustat lasketaan kerran pieniksi tekstuureiksi ja asetetaan
// style.backgroundImage-kenttään (venyy elementin kokoon; border-radius leikkaa).
//   Ylapalkki     linear-gradient(180deg, #3a2a1c, #251b12)            (.topbar)
//   Kulta         linear-gradient(180deg, #eab84e, #d09024)            (button.primary)
//   KultaPainettu linear-gradient(180deg, #f3c661, #d9a13b)            (button.primary:hover)
//   Ilmoitus      linear-gradient(180deg, rgba(46,33,20,.96), rgba(30,21,12,.96)) (.event-toast)
//   Pergamentti   radial-gradient(circle at 42% 34%, #f6e7c6, #ecd8ae 58%, #d9be8d)
//                 × fraktaalikohina (multiply)                          (.dialog-card)
using System.Collections.Generic;
using UnityEngine.UIElements;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Kuviot
    {
        static readonly Dictionary<string, Texture2D> valimuisti = new Dictionary<string, Texture2D>();

        public static Color Vari(string hex, float alfa = 1f)
        {
            ColorUtility.TryParseHtmlString(hex, out var c);
            c.a = alfa;
            return c;
        }

        public static Texture2D Ylapalkki => Pysty("ylapalkki", Vari("#3a2a1c"), Vari("#251b12"));
        public static Texture2D Kulta => Pysty("kulta", Vari("#eab84e"), Vari("#d09024"));
        public static Texture2D KultaPainettu => Pysty("kulta-painettu", Vari("#f3c661"), Vari("#d9a13b"));
        public static Texture2D Ilmoitus => Pysty("ilmoitus", Vari("#2e2114", 0.96f), Vari("#1e150c", 0.96f));

        /// <summary>Vaakasuora kahden värin liukuväri (vasemmalta oikealle).</summary>
        public static Texture2D Vaaka(string nimi, Color vasen, Color oikea)
        {
            if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
            const int K = 64;
            t = Uusi(nimi, K, 2);
            var px = new Color[K * 2];
            for (int x = 0; x < K; x++) px[x] = px[K + x] = Color.Lerp(vasen, oikea, (x + 0.5f) / K);
            t.SetPixels(px);
            t.Apply(false, true);
            valimuisti[nimi] = t;
            return t;
        }

        /// <summary>Pystysuora kahden värin liukuväri (ylhäältä alas).</summary>
        public static Texture2D Pysty(string nimi, Color yla, Color ala)
        {
            if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
            const int K = 64;
            t = Uusi(nimi, 2, K);
            var px = new Color[2 * K];
            for (int y = 0; y < K; y++)
            {
                // Tekstuurin rivi 0 on alhaalla.
                var c = Color.Lerp(ala, yla, (y + 0.5f) / K);
                px[y * 2] = px[y * 2 + 1] = c;
            }
            t.SetPixels(px);
            t.Apply(false, true);
            valimuisti[nimi] = t;
            return t;
        }

        /// <summary>
        /// CSS radial-gradient(ellipse at 50% 50%, keski alku, reuna 100%): soikio kulmiin asti (farthest-corner),
        /// keskellä tasainen väri alku-säteeseen, siitä lineaarisesti reunaväriin. Venyy elementin kokoon.
        /// </summary>
        public static Texture2D Soikio(string nimi, Color keski, Color reuna, float alku)
        {
            if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
            const int N = 128;
            t = Uusi(nimi, N, N);
            var px = new Color[N * N];
            float kulma = 0.5f * Mathf.Sqrt(2f);
            for (int y = 0; y < N; y++)
            for (int x = 0; x < N; x++)
            {
                float dx = ((x + 0.5f) / N - 0.5f) / kulma, dy = ((y + 0.5f) / N - 0.5f) / kulma;
                float r = Mathf.Sqrt(dx * dx + dy * dy);
                px[y * N + x] = Color.Lerp(keski, reuna, Mathf.Clamp01((r - alku) / (1f - alku)));
            }
            t.SetPixels(px);
            t.Apply(false, true);
            valimuisti[nimi] = t;
            return t;
        }

        /// <summary>
        /// Ihmisen matkan aloituksen reunapimennys (css/aikajana.css .aikajana-avaus-tausta):
        /// mask-image radial-gradient(ellipse 70% 76% at 50% 47%, #000 26%, .6 54%, .12 76%,
        /// transparent 92%) käännettynä mustaksi peitoksi, ja päälle ::after-kehyksen suorat
        /// liu'ut (ylä/ala 24 %, sivut 20 %). Venyy elementin kokoon kuten webin prosentit.
        /// </summary>
        public static Texture2D Vinjetti
        {
            get
            {
                const string nimi = "vinjetti";
                if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
                const int N = 128;
                t = Uusi(nimi, N, N);
                t.wrapMode = TextureWrapMode.Clamp;
                var px = new Color[N * N];
                float[] asemat = { 0f, 0.26f, 0.54f, 0.76f, 0.92f };
                float[] arvot = { 1f, 1f, 0.6f, 0.12f, 0f };
                for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    float u = (x + 0.5f) / N, v = 1f - (y + 0.5f) / N; // v = 0 ylhäällä
                    float dx = (u - 0.5f) / 0.70f, dy = (v - 0.47f) / 0.76f;
                    float r = Mathf.Sqrt(dx * dx + dy * dy);
                    float nakyy = 0f;
                    for (int i = 1; i < asemat.Length; i++)
                        if (r <= asemat[i]) { nakyy = Mathf.Lerp(arvot[i - 1], arvot[i], (r - asemat[i - 1]) / (asemat[i] - asemat[i - 1])); break; }
                    float pysty = v < 0.24f ? 1f - v / 0.24f : v > 0.76f ? (v - 0.76f) / 0.24f : 0f;
                    float vaaka = u < 0.2f ? 1f - u / 0.2f : u > 0.8f ? (u - 0.8f) / 0.2f : 0f;
                    float musta = 1f - nakyy * (1f - pysty) * (1f - vaaka);
                    px[y * N + x] = new Color(0f, 0f, 0f, musta);
                }
                t.SetPixels(px);
                t.Apply(false, true);
                valimuisti[nimi] = t;
                return t;
            }
        }

        /// <summary>Dialogikortin pergamentti: säteittäinen liukuväri kertaa paperin rae.</summary>
        public static Texture2D Pergamentti
        {
            get
            {
                const string nimi = "pergamentti";
                if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
                const int N = 256;
                t = Uusi(nimi, N, N);
                t.wrapMode = TextureWrapMode.Clamp;
                var a = Vari("#f6e7c6"); var b = Vari("#ecd8ae"); var c = Vari("#d9be8d");
                var px = new Color[N * N];
                var keski = new Vector2(0.42f, 1f - 0.34f);
                // radial-gradient(circle …): säde = kauimpaan kulmaan (farthest-corner).
                float sade = Mathf.Max(
                    Mathf.Max(Vector2.Distance(keski, Vector2.zero), Vector2.Distance(keski, Vector2.right)),
                    Mathf.Max(Vector2.Distance(keski, Vector2.up), Vector2.Distance(keski, Vector2.one)));
                for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    var p = new Vector2((x + 0.5f) / N, (y + 0.5f) / N);
                    float s = Vector2.Distance(p, keski) / sade;
                    var v = s < 0.58f ? Color.Lerp(a, b, s / 0.58f) : Color.Lerp(b, c, (s - 0.58f) / 0.42f);
                    // Paperin rae: kaksi oktaavia Perlinin kohinaa, multiply noin 0,9–1,0.
                    float n = 0.6f * Mathf.PerlinNoise(x * 0.09f, y * 0.09f) + 0.4f * Mathf.PerlinNoise(x * 0.31f + 17f, y * 0.31f + 5f);
                    float kerroin = 0.9f + 0.1f * n;
                    px[y * N + x] = new Color(v.r * kerroin, v.g * kerroin, v.b * kerroin, 1f);
                }
                t.SetPixels(px);
                t.Apply(false, true);
                valimuisti[nimi] = t;
                return t;
            }
        }

        /// <summary>
        /// Lehden arkki (web .dialog.arkki .dialog-card: background-color #f5f0e2 ja --paper-noise multiply): tasainen
        /// paperi ja hieno rae. Webin kohina on feTurbulence fractalNoise 0,9 / 4 oktaavia värillä (0,42, 0,33, 0,19)
        /// ja alfalla 0,2 × kohina; multiply-sekoitus = pohja × (1 − α + α × väri). 140 × 140 laatta toistuu
        /// (AsetaArkki), joten rae on pikselin kokoista kuten webissä eikä veny arkin mukana.
        /// </summary>
        public static Texture2D Arkkipaperi
        {
            get
            {
                const string nimi = "arkkipaperi";
                if (valimuisti.TryGetValue(nimi, out var t) && t != null) return t;
                const int N = 140;
                t = Uusi(nimi, N, N);
                t.wrapMode = TextureWrapMode.Repeat;
                var pohja = Vari("#f5f0e2");
                var vari = new Color(0.42f, 0.33f, 0.19f);
                var rnd = new System.Random(140);
                var hila = new float[N * N];
                for (int i = 0; i < hila.Length; i++) hila[i] = (float)rnd.NextDouble();
                // Jaksollinen arvokohina (toistuu saumattomasti): oktaavit 1, 2, 4 ja 8 px, painot 1/2, 1/4, ….
                float Arvo(int x, int y, int askel)
                {
                    int x0 = x / askel * askel, y0 = y / askel * askel;
                    float fx = (x - x0) / (float)askel, fy = (y - y0) / (float)askel;
                    float H(int a, int b) => hila[((b % N + N) % N) * N + ((a % N + N) % N)];
                    float yla = Mathf.Lerp(H(x0, y0), H(x0 + askel, y0), fx), ala = Mathf.Lerp(H(x0, y0 + askel), H(x0 + askel, y0 + askel), fx);
                    return Mathf.Lerp(yla, ala, fy);
                }
                var px = new Color[N * N];
                for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    float n = 0.5f * Arvo(x, y, 1) + 0.25f * Arvo(x, y, 2) + 0.15f * Arvo(x, y, 4) + 0.1f * Arvo(x, y, 8);
                    float a = 0.2f * Mathf.Clamp01(0.5f + (n - 0.5f) * 1.6f);
                    px[y * N + x] = new Color(pohja.r * (1f - a + a * vari.r), pohja.g * (1f - a + a * vari.g), pohja.b * (1f - a + a * vari.b), 1f);
                }
                t.SetPixels(px);
                t.Apply(false, true);
                valimuisti[nimi] = t;
                return t;
            }
        }

        /// <summary>Arkkipaperi toistuvana 140 × 140 -laattana (web background-image toistuu luonnollisessa koossaan).</summary>
        public static void AsetaArkki(VisualElement e)
        {
            e.style.backgroundColor = Vari("#f5f0e2");
            e.style.backgroundImage = new StyleBackground(Arkkipaperi);
            e.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.Repeat);
            e.style.backgroundSize = new BackgroundSize(new Length(140f), new Length(140f));
            e.style.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Left);
            e.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Top);
        }

        static Texture2D Uusi(string nimi, int w, int h) => new Texture2D(w, h, TextureFormat.RGBA32, false)
        {
            name = "Matkakirja " + nimi,
            wrapMode = TextureWrapMode.Clamp,
            filterMode = FilterMode.Bilinear,
            hideFlags = HideFlags.DontSave,
        };
    }
}
