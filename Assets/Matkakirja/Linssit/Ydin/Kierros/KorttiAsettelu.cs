// YKSITYISKOHTAKORTIN ASETTELU (Päätoimittaja 7.10. 21.5x, iPad-vaaka BUILD 162: pystykortti peitti oikean nappisarakkeen ja
// yläkulma ylänapit). Kortin koko, lepopaikka ja sisään-/poistumisliike lasketaan ruutupikseleinä 3D-kallistuksen ja perspektiivin
// jälkeen: kortin ruutulaatikko ei koko näkyvän liikkeen aikana leikkaa yhtäkään nappia (OpasValikko antaa nappien laatikot) eikä
// mene ruudun reunan yli. Jos paikkaa ei löydy edes kutistamalla, korttia ei näytetä (Mahtuu = false).
// Koordinaatit: ruutupikselit, origo vasemmassa alakulmassa. Asento: kortin keskipiste pikseleinä ruudun keskeltä lepoetäisyydellä
// (Syvyys 1 = lepoetäisyys; syvyydellä k sama pikselisiirtymä näkyy ruudulla 1/k-kokoisena), Kaanto astetta Y:n ympäri
// (Unityn Quaternion.Euler(0, a, 0): positiivinen kulma tuo oikean reunan lähemmäs katsojaa).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class KorttiAsettelu
    {
        public const float LeveysOsuus = 0.4f, SisennysOsuus = 0.04f, AlaPt = 44f, FovAste = 40f, KaantoAste = 14f;
        /// <summary>Kortin korkeus enintään tämä osuus ruudun korkeudesta (vaaka / pysty).</summary>
        public const float KorkVaaka = 0.72f, KorkPysty = 0.56f;
        /// <summary>Sisääntulon alfa nousee tämän osuuden aikana; poistuminen häivyttää viimeisen kolmanneksen.</summary>
        public const float SisaanHaivytys = 0.6f, PoisHaivytysAlku = 0.66f;
        /// <summary>Näkyvä vaihe (alfa yli tämän) ei saa leikata nappeja.</summary>
        public const float NakyvaAlfa = 0.15f;

        public struct Laatikko
        {
            public float X0, Y0, X1, Y1;
            public Laatikko(float x0, float y0, float x1, float y1) { X0 = x0; Y0 = y0; X1 = x1; Y1 = y1; }
            public bool Leikkaa(Laatikko o) => X0 < o.X1 && o.X0 < X1 && Y0 < o.Y1 && o.Y0 < Y1;
            public Laatikko Laajenna(float m) => new Laatikko(X0 - m, Y0 - m, X1 + m, Y1 + m);
            public override string ToString() => $"[{X0:0},{Y0:0}–{X1:0},{Y1:0}]";
        }

        public struct Asento
        {
            public float X, Y, Syvyys, Kaanto;
            public Asento(float x, float y, float syvyys, float kaanto) { X = x; Y = y; Syvyys = syvyys; Kaanto = kaanto; }
            public static Asento Lerp(Asento a, Asento b, float u) => new Asento(a.X + (b.X - a.X) * u, a.Y + (b.Y - a.Y) * u,
                a.Syvyys + (b.Syvyys - a.Syvyys) * u, a.Kaanto + (b.Kaanto - a.Kaanto) * u);
        }

        public sealed class Tulos
        {
            public bool Mahtuu;
            /// <summary>Kortin mitat ruutupikseleinä lepoetäisyydellä, sisennys ja alakaista.</summary>
            public float Lev, Kork, Sis, AlaPx;
            public Asento Tulo, Lepo, Lahto;
            public Laatikko LepoLaatikko;
        }

        /// <summary>Kortin ruutulaatikko (kulmat kallistettuina ja perspektiiviprojisoituina).</summary>
        public static Laatikko Ruutu(float w, float h, float lev, float kork, Asento a)
        {
            float d = h / (2f * (float)Math.Tan(FovAste * 0.5f * Math.PI / 180.0));
            float c = (float)Math.Cos(a.Kaanto * Math.PI / 180.0), s = (float)Math.Sin(a.Kaanto * Math.PI / 180.0);
            var l = new Laatikko(float.MaxValue, float.MaxValue, float.MinValue, float.MinValue);
            for (int i = 0; i < 4; i++)
            {
                float sx = (i & 1) == 0 ? -0.5f * lev : 0.5f * lev, sy = (i & 2) == 0 ? -0.5f * kork : 0.5f * kork;
                // Kulma maailmassa (pikseleinä lepoetäisyydellä d): keskipiste × syvyys, kallistus Y:n ympäri.
                float x = a.X * a.Syvyys + sx * c, y = a.Y * a.Syvyys + sy, z = d * a.Syvyys - sx * s;
                float px = 0.5f * w + x * d / z, py = 0.5f * h + y * d / z;
                l.X0 = Math.Min(l.X0, px); l.X1 = Math.Max(l.X1, px); l.Y0 = Math.Min(l.Y0, py); l.Y1 = Math.Max(l.Y1, py);
            }
            return l;
        }

        /// <summary>Sisääntulon (t 0..1) asento ja alfa; liike hidastuu loppua kohti.</summary>
        public static (Asento, float) Sisaan(Tulos t, float aika01)
        {
            float u = 1f - (float)Math.Pow(1f - Rajaa(aika01), 3);
            return (Asento.Lerp(t.Tulo, t.Lepo, u), Rajaa(aika01 / SisaanHaivytys));
        }

        /// <summary>Poistumisen (t 0..1) asento ja alfa; liike kiihtyy, häivytys viimeisellä kolmanneksella.</summary>
        public static (Asento, float) Pois(Tulos t, float aika01)
        {
            float u = Rajaa(aika01);
            return (Asento.Lerp(t.Lepo, t.Lahto, u * u), 1f - Rajaa((u - PoisHaivytysAlku) / (1f - PoisHaivytysAlku)));
        }

        /// <summary>
        /// Koko ja paikka: leveys 40 % pidemmästä sivusta (enintään 80 % leveydestä), korkeus enintään KorkVaaka/KorkPysty; vaakaruudulla
        /// oikealla ja pystyssä keskellä yläpuolella. Jos laatikko tai liike osuu nappiin tai reunaan, kortti siirtyy vasemmalle
        /// (pystyssä alas/ylös) ja tarvittaessa pienenee (enintään 40 %:iin; iPhone-vaaka).
        /// </summary>
        public static Tulos Laske(float w, float h, float dpiKerroin, float kuvasuhde, IList<Laatikko> napit)
        {
            if (!(kuvasuhde > 0.05f)) kuvasuhde = 1.5f;
            bool pysty = h > w * 1.2f;
            float alaPx = AlaPt * Math.Max(1f, dpiKerroin), reuna = 0.02f * Math.Min(w, h), vali = 0.012f * Math.Min(w, h);
            float lev0 = Math.Min(LeveysOsuus * Math.Max(w, h), 0.8f * w);
            float korkMax = (pysty ? KorkPysty : KorkVaaka) * h;
            float k0 = (1f - 2f * SisennysOsuus) / kuvasuhde + 2f * SisennysOsuus;
            if (lev0 * k0 + alaPx > korkMax) lev0 = Math.Max(1f, (korkMax - alaPx) / k0);
            var ruutu = new Laatikko(reuna, reuna, w - reuna, h - reuna);

            for (float koko = 1f; koko >= 0.399f; koko -= 0.075f)
            {
                float lev = lev0 * koko, kork = lev * k0 + alaPx;
                // Ehdokkaat: vaakana oikealta vasemmalle (oikea reuna 0,74 W:sta alkaen, keskipiste enintään 0,15 W keskeltä vasemmalle), pystyssä keskeltä ylös ja alas.
                var ehdokkaat = new List<(float, float)>();
                if (pysty)
                    foreach (float dy in new[] { 0.12f, 0.16f, 0.08f, 0.2f, 0.04f, 0f, -0.04f })
                        ehdokkaat.Add((0f, dy * h));
                else
                    for (float oikea = 0.74f; oikea >= 0.35f + 0.5f * lev / w - 0.001f; oikea -= 0.02f)
                        foreach (float dy in new[] { 0.06f, 0.03f, 0.09f, 0.12f, 0.15f, 0.18f, 0f })
                            ehdokkaat.Add((Math.Min(0.22f * w, oikea * w - 0.5f * w - 0.5f * lev), dy * h));
                foreach (var (cx, cy) in ehdokkaat)
                {
                    // Kallistus keskustaa kohti: pystyssä puolet, vaakana sitä vähemmän mitä lähempänä keskustaa kortti on.
                    float kaanto = pysty ? 0.5f * KaantoAste : KaantoAste * Math.Max(-1f, Math.Min(1f, cx / (0.15f * w)));
                    var t = new Tulos
                    {
                        Lev = lev, Kork = kork, Sis = SisennysOsuus * lev, AlaPx = alaPx,
                        Lepo = new Asento(cx, cy, 1f, kaanto),
                        // Sisään: hieman kauempaa, alempaa ja oikealta, kallistus jyrkempänä; pois: kauas ja ylös samalla ruutu-x:llä.
                        Tulo = new Asento(cx + 0.04f * w, cy - 0.04f * h, 1.3f, kaanto * 2.2f),
                        Lahto = new Asento(cx, cy + 0.12f * h, 3f, kaanto),
                    };
                    t.LepoLaatikko = Ruutu(w, h, lev, kork, t.Lepo);
                    if (Vapaa(t, w, h, ruutu, napit, vali)) { t.Mahtuu = true; return t; }
                }
            }
            return new Tulos { Mahtuu = false, AlaPx = alaPx };
        }

        /// <summary>Koko näkyvä liike (lepo, sisääntulo ja poistuminen 24 näytteellä kumpikin) ruudun sisällä ja irti napeista.</summary>
        public static bool Vapaa(Tulos t, float w, float h, Laatikko ruutu, IList<Laatikko> napit, float vali)
        {
            for (int vaihe = 0; vaihe < 3; vaihe++)
                for (int i = 0; i <= (vaihe == 0 ? 0 : 24); i++)
                {
                    var (a, alfa) = vaihe == 0 ? (t.Lepo, 1f) : vaihe == 1 ? Sisaan(t, i / 24f) : Pois(t, i / 24f);
                    if (alfa < NakyvaAlfa) continue;
                    var l = Ruutu(w, h, t.Lev, t.Kork, a);
                    if (vaihe == 0 && (l.X0 < ruutu.X0 || l.Y0 < ruutu.Y0 || l.X1 > ruutu.X1 || l.Y1 > ruutu.Y1)) return false;
                    if (napit != null)
                        foreach (var n in napit)
                            if (l.Leikkaa(n.Laajenna(vali))) return false;
                }
            return true;
        }

        static float Rajaa(float x) => x < 0f ? 0f : x > 1f ? 1f : x;
    }
}
