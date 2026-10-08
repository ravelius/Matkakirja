// MAAKUNNAN MINIKARTTA (Pelikoodari 30.9.2026; omistajan kortti klo 22.5x, Länsi-Makedonia: "tuon kartan voisi taittaa
// leipätekstin oikealle puolelle pienessä koossa ja sen voisi sitten klikata suuremmaksi minipopup tyyliin jolloin se
// animoidusti suurenisi ruudulle"). Havainnekuva piirretään omasta aineistosta: maan maakunnat (Maakuntajako, sama
// kokoelma kuin pallon maakuntakerros) maan ääriviivoissa, valittu maakunta korostettuna kartan sävyillä
// (MaakunnatSilta: valinnan täyttö ja reuna, perusraja). Meri jää läpinäkyväksi, jolloin kortin paperi näkyy.
//
// Piirto 2× ylinäytteistettynä (reunat pehmeinä) ja kerran per maakunta (välimuisti). Rajaus: se maan rypäs, jossa
// valittu maakunta on (emämaa ilman kaukaisia saaria), reunus 6 % ja kuvasuhde 0,55–1,3 (korkeus / leveys).
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class MaakuntaMinikartta
    {
        static readonly Dictionary<string, Texture2D> valimuisti = new Dictionary<string, Texture2D>(StringComparer.Ordinal);

        static readonly Color Maa = (Color)Tyylikirja.Kehys.Paper;
        static readonly Color Valittu = new Color(0.70f, 0.30f, 0.20f, 0.55f);
        static readonly Color ValittuReuna = new Color(0.45f, 0.16f, 0.10f, 0.95f);
        static readonly Color Raja = (Color)Tyylikirja.Kehys.RiviTausta;
        static readonly Color Ulkoraja = (Color)Tyylikirja.Kehys.MapInk85;

        /// <summary>Kylkikartan leveys pikseleinä; viivat on mitoitettu tälle (isompi piirto paksuntaa ne samassa suhteessa).</summary>
        public const int PerusLeveys = 512;

        /// <summary>Minikartta avaimella "ISO:tunnus" (leveys pikseleinä); null, jos maakuntien aineisto ei ole ladattu.
        /// Vain perusleveys välimuistiin; isompi (suurennos) on kutsujan vapautettava.</summary>
        public static Texture2D Hae(string avain, int leveys = PerusLeveys)
        {
            if (string.IsNullOrEmpty(avain)) return null;
            bool perus = leveys == PerusLeveys;
            if (perus && valimuisti.TryGetValue(avain, out var t) && t != null) return t;
            var kk = global::Matkakirja.KarttaKerrokset.Instanssi;
            var maa = kk != null && kk.maakunnat != null ? kk.maakunnat.MaanAlueet(avain) : null;
            if (maa == null) return null;
            t = Piirra(maa, avain, leveys);
            if (t != null && perus) valimuisti[avain] = t;
            return t;
        }

        /// <summary>Avain tekstuurin nimestä ("minikartta-ISO:tunnus"), tai null.</summary>
        public static string Avain(Texture t) => t != null && t.name.StartsWith("minikartta-", StringComparison.Ordinal) ? t.name.Substring(11) : null;

        static Texture2D Piirra(global::Matkakirja.Maakuntajako.MaanAlueet maa, string avain, int leveys)
        {
            // Rajaus: painavin rypäs, jossa valittu alue on; muuten maan painavin rypäs.
            global::Matkakirja.Maakuntajako.Rypas rypas = null;
            foreach (var r in maa.Rypaat)
            {
                bool osuu = false;
                foreach (var rg in r.Renkaat) if (rg.Alue != null && rg.Alue.Id == avain) { osuu = true; break; }
                if (osuu && (rypas == null || r.Paino > rypas.Paino)) rypas = r;
            }
            if (rypas == null) foreach (var r in maa.Rypaat) if (rypas == null || r.Paino > rypas.Paino) rypas = r;
            if (rypas == null) return null;
            double w = rypas.W, e = rypas.E, s = rypas.S, n = rypas.N;
            double latKeski = (s + n) / 2.0, kx = Math.Cos(latKeski * Math.PI / 180.0);
            double lev = (e - w) * kx, kork = n - s;
            if (lev <= 0 || kork <= 0) return null;
            // Reunus 6 % ja kuvasuhde 0,55–1,3.
            double reuna = Math.Max(lev, kork) * 0.06;
            lev += 2 * reuna; kork += 2 * reuna;
            if (kork / lev < 0.55) kork = lev * 0.55;
            if (kork / lev > 1.3) lev = kork / 1.3;
            double keskiX = (w + e) / 2.0, keskiY = latKeski;
            double lon0 = keskiX - lev / kx / 2.0, lat1 = keskiY + kork / 2.0;

            int ss = 2, W = leveys * ss, H = Mathf.Max(8, (int)Math.Round(leveys * kork / lev)) * ss;
            double skaala = W / lev;
            var kuva = new Color[W * H];
            Vector2 P((double Lon, double Lat) p)
            {
                double lon = p.Lon;
                if (lon < w - 180) lon += 360; else if (lon > w + 540) lon -= 360;
                return new Vector2((float)((lon - lon0) * kx * skaala), (float)((lat1 - p.Lat) * skaala));
            }

            // Täytöt: kaikki maan alueet maan sävyllä, valittu korostettuna päälle.
            foreach (var alue in maa.Alueet)
            {
                var sarja = new List<Vector2[]>();
                foreach (var rg in alue.Renkaat) { var v = new Vector2[rg.Length]; for (int i = 0; i < rg.Length; i++) v[i] = P(rg[i]); sarja.Add(v); }
                Tayta(kuva, W, H, sarja, Maa);
                if (alue.Id == avain) Tayta(kuva, W, H, sarja, Valittu);
            }
            // Rajat: maakuntien väliset ohuina, ulkoraja vahvempana, valitun reuna korostettuna.
            float vk = ss * (float)leveys / PerusLeveys; // viivat samassa suhteessa kuvaan kaikilla leveyksillä
            Viivat(kuva, W, H, maa.Kaaret, P, 1.1f * vk, Raja);
            Viivat(kuva, W, H, maa.UlkoKaaret, P, 1.5f * vk, Ulkoraja);
            foreach (var alue in maa.Alueet)
                if (alue.Id == avain) Viivat(kuva, W, H, alue.Renkaat, P, 1.6f * vk, ValittuReuna);

            // 2× → 1× laatikkosuodatin.
            int w1 = W / ss, h1 = H / ss;
            var ulos = new Color32[w1 * h1];
            for (int y = 0; y < h1; y++)
                for (int x = 0; x < w1; x++)
                {
                    Color c = Color.clear;
                    for (int dy = 0; dy < ss; dy++) for (int dx = 0; dx < ss; dx++) c += kuva[(y * ss + dy) * W + x * ss + dx];
                    c /= ss * ss;
                    // Premultiplied → suora alfa.
                    if (c.a > 0.0001f) { c.r /= c.a; c.g /= c.a; c.b /= c.a; }
                    ulos[(h1 - 1 - y) * w1 + x] = c; // Texture2D: rivi 0 alhaalla
                }
            var t = new Texture2D(w1, h1, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, name = "minikartta-" + avain };
            t.SetPixels32(ulos);
            t.Apply(false, true);
            return t;
        }

        /// <summary>Parillisuussääntöinen pyyhkäisytäyttö (renkaat yhdessä: reiät ja saaret), värit premultiplied-muodossa.</summary>
        static void Tayta(Color[] kuva, int W, int H, List<Vector2[]> renkaat, Color vari)
        {
            var reunat = new List<(float Y0, float Y1, float X0, float Kulma)>();
            float ymin = float.MaxValue, ymax = float.MinValue;
            foreach (var r in renkaat)
                for (int i = 0; i < r.Length; i++)
                {
                    var a = r[i]; var b = r[(i + 1) % r.Length];
                    if (Mathf.Approximately(a.y, b.y)) continue;
                    if (a.y > b.y) { var tmp = a; a = b; b = tmp; }
                    reunat.Add((a.y, b.y, a.x, (b.x - a.x) / (b.y - a.y)));
                    ymin = Mathf.Min(ymin, a.y); ymax = Mathf.Max(ymax, b.y);
                }
            if (reunat.Count == 0) return;
            var xt = new List<float>();
            Color p = new Color(vari.r * vari.a, vari.g * vari.a, vari.b * vari.a, vari.a);
            int y0 = Mathf.Max(0, Mathf.FloorToInt(ymin)), y1 = Mathf.Min(H - 1, Mathf.CeilToInt(ymax));
            for (int y = y0; y <= y1; y++)
            {
                float yc = y + 0.5f;
                xt.Clear();
                foreach (var r in reunat) if (yc >= r.Y0 && yc < r.Y1) xt.Add(r.X0 + (yc - r.Y0) * r.Kulma);
                if (xt.Count < 2) continue;
                xt.Sort();
                for (int k = 0; k + 1 < xt.Count; k += 2)
                {
                    int xa = Mathf.Max(0, Mathf.CeilToInt(xt[k] - 0.5f)), xb = Mathf.Min(W - 1, Mathf.FloorToInt(xt[k + 1] - 0.5f));
                    for (int x = xa; x <= xb; x++) Sekoita(kuva, y * W + x, p);
                }
            }
        }

        static void Viivat(Color[] kuva, int W, int H, IEnumerable<(double Lon, double Lat)[]> kaaret,
            Func<(double Lon, double Lat), Vector2> P, float paksuus, Color vari)
        {
            // Kerroksen peitto erikseen (max), jotta liitoskohdat eivät tummu kahteen kertaan.
            var peitto = new float[W * H];
            float puoli = paksuus / 2f;
            foreach (var k in kaaret)
            {
                if (k == null || k.Length < 2) continue;
                var edellinen = P(k[0]);
                for (int i = 1; i < k.Length; i++)
                {
                    var nyt = P(k[i]);
                    Jana(peitto, W, H, edellinen, nyt, puoli);
                    edellinen = nyt;
                }
            }
            Color p = new Color(vari.r * vari.a, vari.g * vari.a, vari.b * vari.a, vari.a);
            for (int i = 0; i < peitto.Length; i++) if (peitto[i] > 0f) Sekoita(kuva, i, p * peitto[i]);
        }

        static void Jana(float[] peitto, int W, int H, Vector2 a, Vector2 b, float puoli)
        {
            int x0 = Mathf.Max(0, Mathf.FloorToInt(Mathf.Min(a.x, b.x) - puoli - 1)), x1 = Mathf.Min(W - 1, Mathf.CeilToInt(Mathf.Max(a.x, b.x) + puoli + 1));
            int y0 = Mathf.Max(0, Mathf.FloorToInt(Mathf.Min(a.y, b.y) - puoli - 1)), y1 = Mathf.Min(H - 1, Mathf.CeilToInt(Mathf.Max(a.y, b.y) + puoli + 1));
            if (x0 > x1 || y0 > y1) return;
            var ab = b - a;
            float l2 = Mathf.Max(ab.sqrMagnitude, 1e-6f);
            for (int y = y0; y <= y1; y++)
                for (int x = x0; x <= x1; x++)
                {
                    var q = new Vector2(x + 0.5f, y + 0.5f);
                    float t = Mathf.Clamp01(Vector2.Dot(q - a, ab) / l2);
                    float d = (a + ab * t - q).magnitude;
                    float c = Mathf.Clamp01(puoli + 0.5f - d);
                    int i = y * W + x;
                    if (c > peitto[i]) peitto[i] = c;
                }
        }

        /// <summary>Premultiplied "over": uusi väri vanhan päälle.</summary>
        static void Sekoita(Color[] kuva, int i, Color p)
        {
            var v = kuva[i];
            kuva[i] = new Color(p.r + v.r * (1f - p.a), p.g + v.g * (1f - p.a), p.b + v.b * (1f - p.a), p.a + v.a * (1f - p.a));
        }
    }
}
