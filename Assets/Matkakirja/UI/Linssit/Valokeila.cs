// VALOKEILA (Natiivi-UI): aikajanan havainnekuvan epäsäännöllinen soikiohäivytys
// (web js/aikajana.js valokeilanMaski + css .aikajana-ilmiokuva mask-image).
//
// UI Toolkitissa ei ole mask-imagea, joten maski lasketaan kuvaan: lähde (ladattu, ei luettava)
// haetaan valmiiksi rajattuna ja pienennettynä (Kuvat.HaePienena: 16:10, object-fit: cover, luku
// AsyncGPUReadbackilla, ei pääsäikeen pysähdystä) ja alfa kerrotaan maskilla taustasäikeessä. Maski on webin kerrokset unionina (mask-composite add =
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
        public static void Hae(string osoite, int siemen, Action<Texture2D> valmis) =>
            Hae(osoite, "#" + siemen, Leveys, Korkeus, () => Soikiot(siemen), valmis);

        public const int KertomusL = 600, KertomusK = 400;
        static readonly float[] KertomusAsemat = { 0.34f, 0.58f, 0.78f, 0.94f }, KertomusArvot = { 1f, 0.72f, 0.2f, 0f };

        /// <summary>
        /// Ihmisen matkan löytökuva (web .aikajana-kertomuskuva img): 3:2, yksi soikio
        /// radial-gradient(ellipse 52% 52%, #000 34%, .72 58%, .2 78%, transparent 94%).
        /// </summary>
        public static void HaeKertomuskuva(string osoite, Action<Texture2D> valmis) =>
            Hae(osoite, "#kertomus", KertomusL, KertomusK,
                () => new List<Soikio> { new Soikio { Cx = 50, Cy = 50, Rx = 52, Ry = 52, Asemat = KertomusAsemat, Arvot = KertomusArvot } }, valmis);

        static void Hae(string osoite, string muoto, int leveys, int korkeus, Func<List<Soikio>> soikiot, Action<Texture2D> valmis)
        {
            string avain = osoite + muoto;
            if (muisti.TryGetValue(avain, out var t) && t != null) { valmis?.Invoke(t); return; }
            // Suoraan pienennettynä ja rajattuna (Kuvat.HaePienena: alkuperäinen vapautetaan heti, luku
            // AsyncGPUReadbackilla), joten täysikokoista kuvaa ei pidetä muistissa eikä ladata GPU:lle.
            Kuvat.HaePienena(osoite, leveys, korkeus, 0.5f, pieni =>
            {
                if (pieni == null) { valmis?.Invoke(null); return; }
                if (muisti.TryGetValue(avain, out var v) && v != null) { valmis?.Invoke(v); return; }
                if (!pieni.isReadable) { valmis?.Invoke(pieni); return; }
                MaskaaTaustalla(avain, pieni.GetPixels32(), leveys, korkeus, soikiot(), pieni, valmis);
            });
        }

        static void MaskaaTaustalla(string avain, Color32[] px, int leveys, int korkeus, List<Soikio> muodot, Texture2D lahde, Action<Texture2D> valmis)
        {
            Task.Run(() => Maskaa(px, leveys, korkeus, muodot)).ContinueWith(tt => UiKerros.PaaSaikeessa(() =>
            {
                if (tt.IsFaulted) { valmis?.Invoke(lahde); return; }
                var tulos = new Texture2D(leveys, korkeus, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, name = "valokeila " + avain };
                tulos.SetPixels32(tt.Result);
                tulos.Apply(false, true);
                Muista(avain, tulos);
                valmis?.Invoke(tulos);
            }));
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

        static Color32[] Maskaa(Color32[] px, int leveys, int korkeus, List<Soikio> soikiot)
        {
            for (int y = 0; y < korkeus; y++)
            {
                // Texture2D:n rivi 0 on alhaalla; maskin y mitataan ylhäältä kuten CSS:ssä.
                float v = 100f * (1f - (y + 0.5f) / korkeus);
                for (int x = 0; x < leveys; x++)
                {
                    float u = 100f * (x + 0.5f) / leveys, peitto = 0f;
                    foreach (var s in soikiot)
                    {
                        float dx = (u - s.Cx) / s.Rx, dy = (v - s.Cy) / s.Ry;
                        float a = Liuku(Mathf.Sqrt(dx * dx + dy * dy), s.Asemat, s.Arvot);
                        peitto = peitto + a * (1f - peitto);
                        if (peitto >= 0.999f) break;
                    }
                    int i = y * leveys + x;
                    var c = px[i];
                    c.a = (byte)Mathf.RoundToInt(c.a * Mathf.Clamp01(peitto));
                    px[i] = c;
                }
            }
            return px;
        }
    }
}
