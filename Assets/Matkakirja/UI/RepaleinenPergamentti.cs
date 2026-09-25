// REPALEINEN PERGAMENTTI (Natiivi-UI, linssipariteetti rivi 11): webin aloituslaatikon paperi yhtenä tekstuurina.
//
// Web (css/aikajana.css .aikajana-avaus-laatikko ja ::before/::after, js/pergamentti.js "PERGAMENTIN REPALEINEN
// REUNA"): paperin muoto on viistetyin kulmin ja loivin aalloin piirretty monikulmio, jonka reunaa rikkoo kaksi
// turbulenssia (karkea 12/400 ja hieno 4,5/400 leveydestä, pystysuunnassa vaimennettuna 0,38 ja 0,44); pinnalla on
// kohina ja laikut, yläosa vaalenee ja alaosa tummuu, reunoilla on kolme sisävarjoa ja kulmissa tahrat; paperin
// alla on lämmin sumea kajo (#d9ae74, muoto kasvaa 15 %). UI Toolkitissa ei ole maskeja eikä suodattimia, joten
// kaikki lasketaan kerran taustasäikeessä RGBA-kuvaksi, jonka reunus (kajo) ulottuu laatikon ulkopuolelle.
using System;
using System.Threading.Tasks;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class RepaleinenPergamentti
    {
        /// <summary>Kajon reunus kuvan pikseleinä laatikon leveydestä (web HEHKU_KASVU 0,15 → sumean osan ulottuma).</summary>
        public const float KajoOsuus = 0.05f;

        static Texture2D keila;

        /// <summary>
        /// Lyhdyn valokeila (web .aikajana-lyhty .kajo/.ydin): lämmin säteittäinen liuku, joka häipyy täysin jo
        /// elementin reunan keskikohdissa (Kuviot.Soikio häipyy vasta kulmissa, jolloin reunat näkyivät suorakaiteena).
        /// </summary>
        public static Texture2D Keila
        {
            get
            {
                if (keila != null) return keila;
                const int N = 128;
                keila = new Texture2D(N, N, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, name = "avauslyhty" };
                var px = new Color32[N * N];
                for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    float dx = (x + 0.5f) / N * 2f - 1f, dy = (y + 0.5f) / N * 2f - 1f;
                    float r = Mathf.Clamp01(Mathf.Sqrt(dx * dx + dy * dy));
                    float ydin = Mathf.Pow(1f - r, 2.2f), kajo = Mathf.Pow(1f - r, 1.2f);
                    var c = Color.Lerp(new Color(1f, 0.67f, 0.29f), new Color(1f, 0.94f, 0.77f), ydin);
                    c.a = 0.55f * kajo * 0.6f + 0.4f * ydin;
                    px[y * N + x] = c;
                }
                keila.SetPixels32(px);
                keila.Apply(false, true);
                return keila;
            }
        }

        /// <summary>
        /// Luo paperin w × h pikseliä (laatikon koko) + kajoreunus joka sivulla. valmis(tekstuuri, reunus) kutsutaan
        /// pääsäikeessä. siemen muuttaa reunan muotoa (web siemenNimesta).
        /// </summary>
        public static void Luo(int w, int h, int siemen, Action<Texture2D, int> valmis)
        {
            if (w < 8 || h < 8) { valmis(null, 0); return; }
            int m = Mathf.RoundToInt(w * KajoOsuus);
            int W = w + 2 * m, H = h + 2 * m;
            Task.Run(() => Laske(w, h, m, siemen)).ContinueWith(t =>
            {
                var data = t.IsFaulted ? null : t.Result;
                UiKerros.PaaSaikeessa(() =>
                {
                    if (data == null) { valmis(null, 0); return; }
                    var tex = new Texture2D(W, H, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, name = "repaleinen-pergamentti" };
                    tex.SetPixelData(data, 0);
                    tex.Apply(false, true);
                    valmis(tex, m);
                });
            });
        }

        // --- laskenta (taustasäie) ---------------------------------------------------------------

        internal static Color32[] Laske(int w, int h, int m, int siemen)
        {
            int W = w + 2 * m, H = h + 2 * m;
            var d = new Color32[W * H];
            var r = new System.Random(siemen);
            float s = w / 400f; // webin piirtoleveys 400
            float Viiste() => (4f + (float)r.NextDouble() * 6f) * s;
            float v1 = Viiste(), v2 = Viiste(), v3 = Viiste(), v4 = Viiste();
            float karkea = 12f * s, hieno = 6f * s, marg = 0f;
            int o1 = r.Next(1000), o2 = r.Next(1000), o3 = r.Next(1000), o4 = r.Next(1000), o5 = r.Next(1000);
            float kajoSade = Mathf.Max(1f, m * 0.9f);
            // Webin sisävarjot pikseleinä (20/44/86 px 400 px:n paperilla).
            float sv1 = 20f * s, sv2 = 44f * s, sv3 = 86f * s;
            var kajo = new Color(0xd9 / 255f, 0xae / 255f, 0x74 / 255f);
            for (int py = 0; py < H; py++)
            {
                // Tekstuurin rivi 0 on alareuna (Unity); y = etäisyys laatikon yläreunasta.
                float y = (H - 1 - py) - m + 0.5f;
                for (int px = 0; px < W; px++)
                {
                    float x = px - m + 0.5f;
                    // Reunan turbulenssi: siirto molempiin suuntiin, pystysiirto vaimennettu (web PYSTY_OSUUS_*).
                    // Kolmas, hienoin rypy: arvokohina on turbulenssia pehmeämpää, joten webin rosoinen sivureuna
                    // tarvitsee lisätaajuuden (mitattu vertailukuvasta).
                    float nx = (Fbm(x * 0.012f / s, y * 0.022f / s, o1, 3) - 0.5f) * 2f * karkea
                             + (Fbm(x * 0.04f / s, y * 0.075f / s, o2, 2) - 0.5f) * 2f * hieno
                             + (Arvo(x * 0.16f / s, y * 0.3f / s, o2 + 3) - 0.5f) * 2f * 2.2f * s;
                    float ny = (Fbm(x * 0.012f / s, y * 0.022f / s, o3, 3) - 0.5f) * 2f * karkea * 0.38f
                             + (Fbm(x * 0.04f / s, y * 0.075f / s, o4, 2) - 0.5f) * 2f * hieno * 0.44f;
                    float ex = x + nx, ey = y + ny;
                    // Sisennys laatikon reunasta: webin näkyvä paperi on 291/325 laatikosta (mitattu iPhone 402),
                    // eli noin 5 % kummaltakin sivulta (MARGINAALI 12/400 + turbulenssin siirto sisäänpäin).
                    float dist = Etaisyys(ex, ey, w, h, marg + 20f * s, v1, v2, v3, v4);
                    float paperi = Mathf.Clamp01(0.5f - dist);
                    Color c = default;
                    if (paperi > 0f)
                    {
                        float u = x / w, v = y / h;
                        // Sävy mitattu webin kuvasta (iPhone 402, keksintöjen avaus): lyhtyjen valaisema kultainen
                        // yläosa tummuu alas ruskeaksi (web linear-gradient + ::after + lyhdyt).
                        c = Liuku(v);
                        // Kohina (web feTurbulence 1,1) ja laikut (0,012/0,02) multiply-sekoituksena.
                        float kohina = Fbm(x * 1.1f / s, y * 1.1f / s, o5, 2);
                        float laikku = Fbm(x * 0.012f / s, y * 0.02f / s, o1 + 7, 4);
                        c *= (0.9f + 0.16f * kohina) * (1f - Mathf.Clamp01(laikku * 0.62f - 0.16f) * 0.35f);
                        // Sisävarjot reunasta (web inset box-shadow 20/44/86 px).
                        float sisalla = Mathf.Max(0f, -dist);
                        float varjo = 0.30f * Mathf.Exp(-sisalla / (sv1 * 0.5f)) + 0.16f * Mathf.Exp(-sisalla / (sv2 * 0.5f)) + 0.10f * Mathf.Exp(-sisalla / (sv3 * 0.5f));
                        c = Color.Lerp(c, new Color(74 / 255f, 46 / 255f, 12 / 255f), Mathf.Clamp01(varjo));
                        // Kulmatahrat (web ::before).
                        float tahra = Soikio(u, v, 0.03f, 0.02f, 0.36f, 0.32f) * 0.34f + Soikio(u, v, 0.98f, 0.05f, 0.30f, 0.28f) * 0.30f
                                    + Soikio(u, v, 0.94f, 0.98f, 0.40f, 0.36f) * 0.40f + Soikio(u, v, 0.05f, 0.96f, 0.34f, 0.32f) * 0.34f;
                        c = Color.Lerp(c, c * new Color(0.62f, 0.48f, 0.3f), Mathf.Clamp01(tahra));
                        c.a = paperi;
                    }
                    // Kajo paperin alla: lämmin ja sumea, himmenee reunasta ulos.
                    float kajoA = dist > 0f ? 0.2f * Mathf.Exp(-Sq(dist / kajoSade) * 3f) : 0.2f;
                    var ulos = new Color(kajo.r, kajo.g, kajo.b, kajoA);
                    // Paperi kajon päällä (lähde yli).
                    float a = c.a + ulos.a * (1f - c.a);
                    Color tulos = a > 0f ? (c * c.a + ulos * ulos.a * (1f - c.a)) / a : default;
                    tulos.a = a;
                    d[py * W + px] = tulos;
                }
            }
            return d;
        }

        static float Sq(float x) => x * x;

        /// <summary>Paperin sävy ylhäältä alas (webin kuvasta mitatut pisteet 0 / 30 / 52 / 72 / 100 %).</summary>
        static Color Liuku(float v)
        {
            v = Mathf.Clamp01(v);
            Color C(int r, int g, int b) => new Color(r / 255f, g / 255f, b / 255f);
            if (v < 0.30f) return Color.Lerp(C(216, 172, 102), C(206, 158, 100), v / 0.30f);
            if (v < 0.52f) return Color.Lerp(C(206, 158, 100), C(168, 132, 88), (v - 0.30f) / 0.22f);
            if (v < 0.72f) return Color.Lerp(C(168, 132, 88), C(112, 89, 62), (v - 0.52f) / 0.20f);
            return Color.Lerp(C(112, 89, 62), C(78, 61, 37), (v - 0.72f) / 0.28f);
        }

        /// <summary>Webin radial-gradient(ellipse rx ry at cx cy, väri, läpinäkyvä ~75 %): 1 keskellä, 0 reunalla.</summary>
        static float Soikio(float u, float v, float cx, float cy, float rx, float ry)
        {
            float t = Mathf.Sqrt(Sq((u - cx) / rx) + Sq((v - cy) / ry));
            return Mathf.Clamp01(1f - t / 0.75f);
        }

        /// <summary>Etumerkillinen etäisyys viistekulmaiseen suorakaiteeseen (sisällä negatiivinen), reunavara marg.</summary>
        static float Etaisyys(float x, float y, float w, float h, float marg, float v1, float v2, float v3, float v4)
        {
            float l = marg, o = w - marg, t = marg, b = h - marg;
            float dx = Mathf.Max(l - x, x - o), dy = Mathf.Max(t - y, y - b);
            float laatikko = Mathf.Max(dx, dy);
            // Viisteet kulmissa: x + y -tasot (webin viiste 4–10 px 400 px:n paperilla).
            float c1 = ((l - x) + (t + v1 - y)) * 0.7071f;
            float c2 = ((x - o) + (t + v2 - y)) * 0.7071f;
            float c3 = ((x - o) + (y - (b - v3))) * 0.7071f;
            float c4 = ((l - x) + (y - (b - v4))) * 0.7071f;
            return Mathf.Max(laatikko, Mathf.Max(Mathf.Max(c1, c2), Mathf.Max(c3, c4)));
        }

        // --- kohina -----------------------------------------------------------------------------

        static float Hash(int x, int y, int s)
        {
            unchecked
            {
                uint h = (uint)(x * 374761393 + y * 668265263 + s * 144665);
                h = (h ^ (h >> 13)) * 1274126177u;
                return ((h ^ (h >> 16)) & 0xffffff) / 16777215f;
            }
        }

        static float Arvo(float x, float y, int s)
        {
            int ix = Mathf.FloorToInt(x), iy = Mathf.FloorToInt(y);
            float fx = x - ix, fy = y - iy;
            fx = fx * fx * (3f - 2f * fx);
            fy = fy * fy * (3f - 2f * fy);
            float a = Hash(ix, iy, s), b = Hash(ix + 1, iy, s), c = Hash(ix, iy + 1, s), e = Hash(ix + 1, iy + 1, s);
            return Mathf.Lerp(Mathf.Lerp(a, b, fx), Mathf.Lerp(c, e, fx), fy);
        }

        static float Fbm(float x, float y, int s, int oktaavit)
        {
            float summa = 0f, amp = 0.5f, yht = 0f;
            for (int i = 0; i < oktaavit; i++)
            {
                summa += Arvo(x, y, s + i * 31) * amp;
                yht += amp;
                x *= 2f; y *= 2f; amp *= 0.5f;
            }
            return summa / yht;
        }
    }
}
