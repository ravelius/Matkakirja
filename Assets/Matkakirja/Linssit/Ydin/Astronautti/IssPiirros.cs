// ISS:N PIIRROS ASTRONAUTIN KAMERAN MERKIKSI (web js/linssit/satelliitti-avaruus.js ISS_PIIRROS_SVG, Raamattu PAATOKSET 52:
// "itse iss itsensä näköinen"): runko, ristikko ja neljä aurinkopaneelisiipeä kummallakin puolella, ruudulla 24 × 12 pt.
// Oikean aseman siivet ovat kullanruskeat. Rasteroidaan kerran RGBA-tavuiksi (ylisuodatus 4 × 4 näytettä per pikseli), jotta
// Unity-kerros tekee siitä tekstuurin ilman kuvatiedostoa. Lisäksi kertasykkeen rengas (web .astro-iss-syke: 44 pt, 2 pt:n
// reuna). Puhdas C#, testit Linssit-testit/Testit/IssPiirrosTestit.cs.
using System;

namespace Matkakirja.Linssit.Astronautti
{
    public static class IssPiirros
    {
        /// <summary>Piirroksen koko ruudun pisteinä (web ISS_PIIRROKSEN_LEVEYS_PX, ISS_PIIRROKSEN_KORKEUS_PX).</summary>
        public const float LeveysPt = 24, KorkeusPt = 12;
        /// <summary>Kertasykkeen rengas (web .astro-iss-syke): halkaisija 44 pt, reuna 2 pt, 600 ms, mittakaava 0,3 → 1.</summary>
        public const float SykeHalkaisijaPt = 44, SykeReunaPt = 2, SykeKestoS = 0.6f, SykeAlkuMittakaava = 0.3f, SykeAlkuPeitto = 0.95f;

        readonly struct Suorakaide
        {
            public readonly float X, Y, W, H, Pyoristys, Viiva;
            public readonly uint Tayte, Reuna;
            public Suorakaide(float x, float y, float w, float h, uint tayte, uint reuna = 0, float viiva = 0, float pyoristys = 0)
            { X = x; Y = y; W = w; H = h; Tayte = tayte; Reuna = reuna; Viiva = viiva; Pyoristys = pyoristys; }
        }

        // SVG:n viewBox 0 0 24 12 piirtojärjestyksessä: siivet (täyte #c9953a, viiva #5a3d10 0,3), ristikko #e6ebf1,
        // moduuli #f4f7fb (viiva #8a95a3 0,3, pyöristys 0,8) ja sen päällä #dfe5ec.
        const uint Kulta = 0xc9953a, KullanReuna = 0x5a3d10;
        static readonly Suorakaide[] Osat =
        {
            new Suorakaide(1.4f, 0.6f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f), new Suorakaide(4.6f, 0.6f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f),
            new Suorakaide(1.4f, 7.2f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f), new Suorakaide(4.6f, 7.2f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f),
            new Suorakaide(16.8f, 0.6f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f), new Suorakaide(20f, 0.6f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f),
            new Suorakaide(16.8f, 7.2f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f), new Suorakaide(20f, 7.2f, 2.6f, 4.2f, Kulta, KullanReuna, 0.3f),
            new Suorakaide(1.2f, 5.4f, 21.6f, 1.2f, 0xe6ebf1),
            new Suorakaide(10.2f, 3.6f, 3.6f, 4.8f, 0xf4f7fb, 0x8a95a3, 0.3f, 0.8f),
            new Suorakaide(11.2f, 1.6f, 1.6f, 2f, 0xdfe5ec),
        };

        /// <summary>
        /// Piirros RGBA-tavuina, rivi 0 ALHAALLA (Unityn Texture2D.LoadRawTextureData). skaala = pikseleitä per piste; leveys 24 ×
        /// skaala, korkeus 12 × skaala. Värit ovat suoria (ei esikerrottua alfaa).
        /// </summary>
        public static byte[] Rasteroi(int skaala, out int leveys, out int korkeus)
        {
            skaala = Math.Max(1, skaala);
            leveys = (int)LeveysPt * skaala;
            korkeus = (int)KorkeusPt * skaala;
            var tavut = new byte[leveys * korkeus * 4];
            const int N = 4;
            for (int py = 0; py < korkeus; py++)
            for (int px = 0; px < leveys; px++)
            {
                double r = 0, g = 0, b = 0, a = 0;
                for (int sy = 0; sy < N; sy++)
                for (int sx = 0; sx < N; sx++)
                {
                    // SVG:n y kasvaa alaspäin; tekstuurin rivi 0 on alhaalla.
                    float x = (px + (sx + 0.5f) / N) / skaala;
                    float y = KorkeusPt - (py + (sy + 0.5f) / N) / skaala;
                    var (vr, vg, vb, va) = Nayte(x, y);
                    // Alfa-kompositio näytteen sisällä on jo tehty; keskiarvo esikerrottuna, jotta reunat eivät tummu.
                    r += vr * va; g += vg * va; b += vb * va; a += va;
                }
                int i = (py * leveys + px) * 4;
                if (a > 0) { tavut[i] = (byte)Math.Round(r / a * 255); tavut[i + 1] = (byte)Math.Round(g / a * 255); tavut[i + 2] = (byte)Math.Round(b / a * 255); }
                tavut[i + 3] = (byte)Math.Round(a / (N * N) * 255);
            }
            return tavut;
        }

        /// <summary>Yhden pisteen väri ja peitto (0 tai 1) piirtojärjestyksessä: myöhempi osa peittää aiemman.</summary>
        static (double r, double g, double b, double a) Nayte(float x, float y)
        {
            (double r, double g, double b, double a) v = (0, 0, 0, 0);
            foreach (var o in Osat)
            {
                float h = o.Viiva / 2;
                if (Sisalla(o, x, y, h))
                {
                    // Viiva on reunan molemmin puolin (SVG stroke): sisempi osa täyte, uloin viivan leveys reunaväri.
                    bool reuna = o.Viiva > 0 && !Sisalla(o, x, y, -h);
                    v = Vari(reuna ? o.Reuna : o.Tayte);
                }
            }
            return v;
        }

        static bool Sisalla(in Suorakaide o, float x, float y, float laajennus)
        {
            float x0 = o.X - laajennus, y0 = o.Y - laajennus, x1 = o.X + o.W + laajennus, y1 = o.Y + o.H + laajennus;
            if (x < x0 || x > x1 || y < y0 || y > y1) return false;
            float r = Math.Max(0, o.Pyoristys + laajennus);
            if (r <= 0) return true;
            float cx = Math.Min(Math.Max(x, x0 + r), x1 - r), cy = Math.Min(Math.Max(y, y0 + r), y1 - r);
            float dx = x - cx, dy = y - cy;
            return dx * dx + dy * dy <= r * r;
        }

        static (double, double, double, double) Vari(uint rgb) =>
            (((rgb >> 16) & 0xff) / 255.0, ((rgb >> 8) & 0xff) / 255.0, (rgb & 0xff) / 255.0, 1.0);

        /// <summary>
        /// Kertasykkeen rengas RGBA-tavuina (valkoinen rgba(242,248,255), peitto 0,9 reunassa): koko × koko pikseliä, reunan
        /// paksuus suhteessa halkaisijaan 2/44 kuten webissä. Ylisuodatus 4 × 4.
        /// </summary>
        public static byte[] Rengas(int koko)
        {
            koko = Math.Max(8, koko);
            var tavut = new byte[koko * koko * 4];
            double r1 = koko / 2.0, r0 = r1 * (1 - 2 * SykeReunaPt / SykeHalkaisijaPt);
            const int N = 4;
            for (int py = 0; py < koko; py++)
            for (int px = 0; px < koko; px++)
            {
                int osumia = 0;
                for (int sy = 0; sy < N; sy++)
                for (int sx = 0; sx < N; sx++)
                {
                    double dx = px + (sx + 0.5) / N - r1, dy = py + (sy + 0.5) / N - r1;
                    double d = Math.Sqrt(dx * dx + dy * dy);
                    if (d >= r0 && d <= r1) osumia++;
                }
                int i = (py * koko + px) * 4;
                tavut[i] = 242; tavut[i + 1] = 248; tavut[i + 2] = 255;
                tavut[i + 3] = (byte)Math.Round(0.9 * osumia / (N * N) * 255);
            }
            return tavut;
        }

        /// <summary>Sykkeen mittakaava ja peitto hetkellä t (s) animaation alusta (web @keyframes astro-iss-syke, ease-out).</summary>
        public static (float Mittakaava, float Peitto) Syke(float t)
        {
            if (t < 0) return (SykeAlkuMittakaava, 0);
            float x = Math.Min(1, t / SykeKestoS);
            // CSS ease-out = cubic-bezier(0, 0, 0.58, 1).
            float k = Kaari(x);
            return (SykeAlkuMittakaava + (1 - SykeAlkuMittakaava) * k, SykeAlkuPeitto * (1 - k));
        }

        /// <summary>cubic-bezier(0, 0, 0.58, 1) arvo x:llä (Newton, x → t → y).</summary>
        static float Kaari(float x)
        {
            if (x <= 0) return 0;
            if (x >= 1) return 1;
            double t = x;
            for (int i = 0; i < 8; i++)
            {
                double bx = 3 * (1 - t) * t * t * 0.58 + t * t * t;           // P1x = 0, P2x = 0,58
                double dbx = 3 * 0.58 * (2 * t - 3 * t * t) + 3 * t * t;
                if (Math.Abs(dbx) < 1e-6) break;
                t -= (bx - x) / dbx;
                t = Math.Min(1, Math.Max(0, t));
            }
            return (float)(3 * (1 - t) * t * t + t * t * t);                   // P1y = 0, P2y = 1
        }

        /// <summary>
        /// Näkyykö merkki (web issKiekonSisalla): ruutupisteen etäisyys pallon kiekon keskipisteestä enintään säde − vara (2 pt).
        /// Rata on 6 % pinnan yläpuolella, joten reunan takana horisontin yllä oleva asema projisoituisi kiekon ulkopuolelle.
        /// </summary>
        public static bool KiekonSisalla(double x, double y, double keskusX, double keskusY, double sade, double vara = 2)
        {
            if (!(sade > 0) || double.IsNaN(x) || double.IsNaN(y)) return false;
            double dx = x - keskusX, dy = y - keskusY;
            return Math.Sqrt(dx * dx + dy * dy) <= sade - vara;
        }
    }
}
