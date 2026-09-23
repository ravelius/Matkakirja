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

        static Texture2D Uusi(string nimi, int w, int h) => new Texture2D(w, h, TextureFormat.RGBA32, false)
        {
            name = "Matkakirja " + nimi,
            wrapMode = TextureWrapMode.Clamp,
            filterMode = FilterMode.Bilinear,
            hideFlags = HideFlags.DontSave,
        };
    }
}
