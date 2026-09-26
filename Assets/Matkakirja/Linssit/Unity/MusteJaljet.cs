// ELÄVÄ KARTTA, kohta 2: musteen jäljet tekstuureina Natiivi-UI:n nostomerkeille (NostotKartalla, UI Toolkit).
//
// Löytämätön nosto näkyy himmeänä musteen jälkenä ilman nimeä (Raamattu ELÄVÄ KARTTA kohta 2). Jäljet ovat poolina:
// Muunnelmia kappaletta (Ydin/Elava/MusteJalki, sama muoto kuin videon Laikka.shaderissa), ja Hae(valoId) valitsee
// muunnelman tunnuksen vakaalla tiivisteellä (FNV-1a), joten sama nosto saa aina saman jäljen ja satojen nostojen
// muisti pysyy pienenä. UI saa kiertää ja peilata kuvaa vaihtelun lisäämiseksi. Tekstuurit: RGBA32, sRGB, SUORA alfa
// (ei esikerrottu), mipmapit (merkki piirtyy pienenä), väri muste, ja reunaan pakkautunut muste tummempana.
// Hehku(): pääkohteen staattinen kultainen hehku (ei animoida levossa). Loyto(t): löydön käyrä 0–0,3 s → (mittakaava,
// peitto), jolla jälki muuttuu täydeksi merkiksi. Laskenta taustasäikeessä käynnistyksessä (Valmistele), Hae palauttaa
// null, kunnes pooli on valmis.
using System;
using System.Threading.Tasks;
using Matkakirja.Linssit.Elava;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class MusteJaljet
    {
        public const int Koko = 128, HehkunKoko = 64, Muunnelmia = 10;
        /// <summary>Musteen väri (sRGB, sama kuin videon läikät).</summary>
        public static readonly Color Muste = new Color(0.17f, 0.12f, 0.08f, 1f);
        /// <summary>Hehkun väri (sRGB).</summary>
        public static readonly Color Kulta = new Color(0.93f, 0.74f, 0.33f, 1f);

        static Texture2D[] pooli;
        static Texture2D hehku;
        static Task<(float[] Peitto, float[] Tummuma)[]> laskenta;
        static Task<float[]> hehkuLaskenta;

        /// <summary>Pooli valmis (Hae palauttaa kuvan).</summary>
        public static bool Valmis => pooli != null;

        /// <summary>Aloittaa laskennan taustasäikeessä (kutsutaan käynnistyksessä, ElavaKartta.KytkeSaapumiset).</summary>
        public static void Valmistele()
        {
            if (laskenta != null) return;
            laskenta = Task.Run(() =>
            {
                var t = new (float[], float[])[Muunnelmia];
                for (int i = 0; i < Muunnelmia; i++) t[i] = MusteJalki.Laske(Koko, 7919 * (i + 1));
                return t;
            });
            hehkuLaskenta = Task.Run(() => MusteJalki.Hehku(HehkunKoko));
        }

        static void Viimeistele()
        {
            if (pooli == null && laskenta != null && laskenta.IsCompleted && !laskenta.IsFaulted)
            {
                var p = new Texture2D[Muunnelmia];
                for (int i = 0; i < Muunnelmia; i++)
                {
                    var (peitto, tummuma) = laskenta.Result[i];
                    var pikselit = new Color32[Koko * Koko];
                    for (int k = 0; k < pikselit.Length; k++)
                    {
                        float v = 1f - tummuma[k];
                        pikselit[k] = new Color(Muste.r * v, Muste.g * v, Muste.b * v, peitto[k]);
                    }
                    var tx = new Texture2D(Koko, Koko, TextureFormat.RGBA32, true, false)
                        { name = "Musteen jälki " + (i + 1), wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
                    tx.SetPixels32(pikselit);
                    tx.Apply(true, true);
                    p[i] = tx;
                }
                pooli = p;
            }
            if (hehku == null && hehkuLaskenta != null && hehkuLaskenta.IsCompleted && !hehkuLaskenta.IsFaulted)
            {
                var h = hehkuLaskenta.Result;
                var pikselit = new Color32[HehkunKoko * HehkunKoko];
                for (int k = 0; k < pikselit.Length; k++) pikselit[k] = new Color(Kulta.r, Kulta.g, Kulta.b, h[k] * 0.55f);
                var tx = new Texture2D(HehkunKoko, HehkunKoko, TextureFormat.RGBA32, true, false)
                    { name = "Pääkohteen hehku", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
                tx.SetPixels32(pikselit);
                tx.Apply(true, true);
                hehku = tx;
            }
        }

        /// <summary>FNV-1a 32: vakaa kaikilla alustoilla (string.GetHashCode voi vaihdella ajoittain).</summary>
        static uint Tiiviste(string s)
        {
            uint h = 2166136261;
            foreach (char c in s ?? "") { h ^= c; h *= 16777619; }
            return h;
        }

        /// <summary>Noston jälki (null, kunnes pooli on valmis). Sama tunnus = sama muunnelma.</summary>
        public static Texture2D Hae(string valoId)
        {
            if (pooli == null) { Valmistele(); Viimeistele(); }
            return pooli?[Tiiviste(valoId) % Muunnelmia];
        }

        /// <summary>Muunnelman numero (UI:n kierto ja peilaus voivat käyttää samaa tiivistettä).</summary>
        public static int Muunnelma(string valoId) => (int)(Tiiviste(valoId) % Muunnelmia);

        /// <summary>Pääkohteen staattinen hehku (null, kunnes valmis).</summary>
        public static Texture2D Hehku()
        {
            if (hehku == null) { Valmistele(); Viimeistele(); }
            return hehku;
        }

        /// <summary>Löydön käyrä: t 0–0,3 s → (mittakaava 0,85 → jousi → 1, peitto 0,5 → 1).</summary>
        public static (float Mittakaava, float Peitto) Loyto(float t)
        {
            var (m, p) = MusteJalki.Loyto(t);
            return ((float)m, (float)p);
        }
    }
}
