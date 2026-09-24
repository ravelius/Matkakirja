// VALOKEILA (Natiivi-UI): aikajanan havainnekuvan epäsäännöllinen soikiohäivytys
// (web js/aikajana.js valokeilanMaski + css .aikajana-ilmiokuva mask-image).
//
// UI Toolkitissa ei ole mask-imagea, joten maski lasketaan kuvaan: lähde (ladattu, ei luettava)
// piirretään RenderTextureen 16:10-rajauksella (object-fit: cover), luetaan takaisin, ja alfa
// kerrotaan maskilla taustasäikeessä. Maski on webin kerrokset unionina (mask-composite add =
// lähde yli): pohjasoikio 46 % × 47 % ja kuusi arvottua lohkoa, arpojana sama mulberry32 samalla
// siemenellä (pysäkin vuosi), joten reuna kumpuilee samoin kuin webissä.
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Valokeila
    {
        public const int Leveys = 640, Korkeus = 400; // web .aikajana-ilmiokuva aspect-ratio 16 / 10, pieni kuva 640
        const int Lohkot = 6; // web VALOKEILAN_LOHKOT

        static readonly Dictionary<string, Texture2D> muisti = new Dictionary<string, Texture2D>();
        static readonly LinkedList<string> jarjestys = new LinkedList<string>();
        const int Katto = 12;

        /// <summary>Maskattu kuva (välimuistista tai laskettuna); null, jos kuvaa ei saatu.</summary>
        public static void Hae(string osoite, int siemen, Action<Texture2D> valmis)
        {
            string avain = osoite + "#" + siemen;
            if (muisti.TryGetValue(avain, out var t) && t != null) { valmis?.Invoke(t); return; }
            Kuvat.Hae(osoite, lahde =>
            {
                if (lahde == null) { valmis?.Invoke(null); return; }
                if (muisti.TryGetValue(avain, out var v) && v != null) { valmis?.Invoke(v); return; }
                Color32[] px;
                try { px = Lue(lahde); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui valokeila: " + e.Message); valmis?.Invoke(lahde); return; }
                Task.Run(() => Maskaa(px, siemen)).ContinueWith(tt => UiKerros.PaaSaikeessa(() =>
                {
                    if (tt.IsFaulted) { valmis?.Invoke(lahde); return; }
                    var tulos = new Texture2D(Leveys, Korkeus, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, name = "valokeila " + osoite };
                    tulos.SetPixels32(tt.Result);
                    tulos.Apply(false, true);
                    Muista(avain, tulos);
                    valmis?.Invoke(tulos);
                }));
            });
        }

        static void Muista(string avain, Texture2D t)
        {
            muisti[avain] = t;
            jarjestys.AddFirst(avain);
            while (jarjestys.Count > Katto)
            {
                string vanha = jarjestys.Last.Value;
                jarjestys.RemoveLast();
                if (muisti.TryGetValue(vanha, out var v) && v != null) UnityEngine.Object.Destroy(v);
                muisti.Remove(vanha);
            }
        }

        /// <summary>Lähde 16:10-rajauksella (keskeltä, peittäen) luettavaksi pikselitaulukoksi.</summary>
        static Color32[] Lue(Texture2D lahde)
        {
            float suhde = (float)lahde.width / Mathf.Max(1, lahde.height), kohde = (float)Leveys / Korkeus;
            Vector2 skaala = Vector2.one, siirto = Vector2.zero;
            if (suhde > kohde) { skaala.x = kohde / suhde; siirto.x = (1f - skaala.x) * 0.5f; }
            else { skaala.y = suhde / kohde; siirto.y = (1f - skaala.y) * 0.5f; }
            var rt = RenderTexture.GetTemporary(Leveys, Korkeus, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            var ennen = RenderTexture.active;
            try
            {
                Graphics.Blit(lahde, rt, skaala, siirto);
                RenderTexture.active = rt;
                var luku = new Texture2D(Leveys, Korkeus, TextureFormat.RGBA32, false);
                luku.ReadPixels(new Rect(0, 0, Leveys, Korkeus), 0, 0, false);
                var px = luku.GetPixels32();
                UnityEngine.Object.Destroy(luku);
                return px;
            }
            finally
            {
                RenderTexture.active = ennen;
                RenderTexture.ReleaseTemporary(rt);
            }
        }

        struct Soikio { public float Cx, Cy, Rx, Ry; public float[] Asemat, Arvot; }

        static readonly float[] PohjaAsemat = { 0.40f, 0.60f, 0.82f, 0.98f }, PohjaArvot = { 1f, 0.74f, 0.26f, 0f };
        static readonly float[] LohkoAsemat = { 0.26f, 0.55f, 0.92f }, LohkoArvot = { 1f, 0.6f, 0f };

        /// <summary>Webin valokeilanMaski(siemen) soikioina (prosentit elementin mitoista).</summary>
        static List<Soikio> Soikiot(int siemen)
        {
            var l = new List<Soikio> { new Soikio { Cx = 50, Cy = 50, Rx = 46, Ry = 47, Asemat = PohjaAsemat, Arvot = PohjaArvot } };
            var arvo = Arpoja(siemen);
            for (int i = 0; i < Lohkot; i++)
            {
                double kulma = (i + arvo() * 0.7) / Lohkot * Math.PI * 2;
                double etaisyys = 6 + arvo() * 5;
                double cx = 50 + Math.Cos(kulma) * etaisyys, cy = 50 + Math.Sin(kulma) * etaisyys * 0.85;
                double rx = 30 + arvo() * 10, ry = 28 + arvo() * 10;
                l.Add(new Soikio { Cx = Pyor(cx), Cy = Pyor(cy), Rx = Pyor(rx), Ry = Pyor(ry), Asemat = LohkoAsemat, Arvot = LohkoArvot });
            }
            return l;
        }

        static float Pyor(double n) => (float)(Math.Round(n * 10) / 10);

        /// <summary>Web valokeilanArpoja (mulberry32): sama siemen, sama sarja.</summary>
        static Func<double> Arpoja(int siemen)
        {
            uint a = unchecked((uint)(Math.Abs(siemen) + 1) * 2654435761u + 1013904223u);
            return () =>
            {
                unchecked
                {
                    a += 0x6d2b79f5u;
                    uint t = a;
                    t = (t ^ (t >> 15)) * (t | 1u);
                    t ^= t + (t ^ (t >> 7)) * (t | 61u);
                    return (t ^ (t >> 14)) / 4294967296.0;
                }
            };
        }

        static float Liuku(float r, float[] asemat, float[] arvot)
        {
            if (r <= asemat[0]) return arvot[0];
            for (int i = 1; i < asemat.Length; i++)
                if (r <= asemat[i]) return Mathf.Lerp(arvot[i - 1], arvot[i], (r - asemat[i - 1]) / (asemat[i] - asemat[i - 1]));
            return 0f;
        }

        static Color32[] Maskaa(Color32[] px, int siemen)
        {
            var soikiot = Soikiot(siemen);
            for (int y = 0; y < Korkeus; y++)
            {
                // Texture2D:n rivi 0 on alhaalla; maskin y mitataan ylhäältä kuten CSS:ssä.
                float v = 100f * (1f - (y + 0.5f) / Korkeus);
                for (int x = 0; x < Leveys; x++)
                {
                    float u = 100f * (x + 0.5f) / Leveys, peitto = 0f;
                    foreach (var s in soikiot)
                    {
                        float dx = (u - s.Cx) / s.Rx, dy = (v - s.Cy) / s.Ry;
                        float a = Liuku(Mathf.Sqrt(dx * dx + dy * dy), s.Asemat, s.Arvot);
                        peitto = peitto + a * (1f - peitto);
                        if (peitto >= 0.999f) break;
                    }
                    int i = y * Leveys + x;
                    var c = px[i];
                    c.a = (byte)Mathf.RoundToInt(c.a * Mathf.Clamp01(peitto));
                    px[i] = c;
                }
            }
            return px;
        }
    }
}
