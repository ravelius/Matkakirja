// ISS-KUVAN KEHITYS (omistaja 6.10.2026 Päätoimittajan kautta: "Voisiko tuon ilmakehän halon värjätä voimakkaammin siniseksi ja
// voisiko sinisen sävyjä korostaa koko kuvassa?" ja "Kuvaan pitäisi saada vielä enemmän wow-efektiä"; Päätoimittajan suositus:
// paikallinen kontrasti lähialueelle, sinisten eloisuus, kevyt hehku kimallukseen ja S-käyrä). Yksi suositusversio, ei säätimiä
// pelaajalle. Puhdas C# RGBA-tavuille (Linssit-testit KuvankasittelyTestit); Unity-puoli IssKameraKuva kutsuu ennen S-käyrää.
//   PaikallinenKontrasti  luminanssin yksityiskohta (L − sumea L) voimistuu keskisävyissä: rantaviivat, saaret ja kaupunki
//   Sinisyys              sinisten ja syaanien kylläisyys ylös (meri, utu, varjot); harmaa ja valkoinen (pilvet) eivät sinerry
//   Hehku                 kirkkaimmat kohdat (auringon kimallus) saavat pehmeän lämpimän hehkun
using System;

namespace Matkakirja.Linssit.IssKamera
{
    public static class Kuvankasittely
    {
        /// <summary>Suositusversio: kontrasti, sinisyys ja hehku (kuvan leveyteen suhteutetut säteet).</summary>
        public static void Kehita(byte[] rgba, int w, int h)
        {
            PaikallinenKontrasti(rgba, w, h, Math.Max(2, w / 120), 0.45f);
            Sinisyys(rgba, 0.35f);
            Hehku(rgba, w, h, 232, Math.Max(2, w / 160), 0.35f);
        }

        static float[] Luminanssi(byte[] rgba, int n)
        {
            var l = new float[n];
            for (int i = 0; i < n; i++) l[i] = 0.2126f * rgba[i * 4] + 0.7152f * rgba[i * 4 + 1] + 0.0722f * rgba[i * 4 + 2];
            return l;
        }

        /// <summary>Kolme laatikkosumennusta (≈ Gauss), säde r; f korvataan tuloksella.</summary>
        static void Sumenna(float[] f, int w, int h, int r)
        {
            var t = new float[f.Length];
            for (int k = 0; k < 3; k++) { Vaaka(f, t, w, h, r); Pysty(t, f, w, h, r); }
        }

        static void Vaaka(float[] a, float[] b, int w, int h, int r)
        {
            float k = 1f / (2 * r + 1);
            for (int y = 0; y < h; y++)
            {
                int o = y * w; float s = 0;
                for (int x = -r - 1; x < r; x++) s += a[o + Math.Max(0, Math.Min(w - 1, x))];
                for (int x = 0; x < w; x++)
                {
                    s += a[o + Math.Min(w - 1, x + r)] - a[o + Math.Max(0, x - r - 1)];
                    b[o + x] = s * k;
                }
            }
        }

        static void Pysty(float[] a, float[] b, int w, int h, int r)
        {
            float k = 1f / (2 * r + 1);
            for (int x = 0; x < w; x++)
            {
                float s = 0;
                for (int y = -r - 1; y < r; y++) s += a[Math.Max(0, Math.Min(h - 1, y)) * w + x];
                for (int y = 0; y < h; y++)
                {
                    s += a[Math.Min(h - 1, y + r) * w + x] - a[Math.Max(0, y - r - 1) * w + x];
                    b[y * w + x] = s * k;
                }
            }
        }

        static byte Tavu(float v) => (byte)(v <= 0 ? 0 : v >= 255 ? 255 : (int)(v + 0.5f));

        /// <summary>Paikallinen kontrasti: L + määrä · (L − sumea L) keskisävyissä (varjot ja valot suojattu), lisättynä kanaviin.</summary>
        public static void PaikallinenKontrasti(byte[] rgba, int w, int h, int sade, float maara)
        {
            int n = w * h;
            var l = Luminanssi(rgba, n); var b = (float[])l.Clone();
            Sumenna(b, w, h, sade);
            for (int i = 0; i < n; i++)
            {
                float t = l[i] / 255f, suoja = 1f - (2f * t - 1f) * (2f * t - 1f);   // 0 mustassa ja valkoisessa, 1 keskellä
                // Reunatietoinen: suuret erot (paneelin reuna merta vasten) rajataan pehmeästi ±12:een, jottei synny vaaleaa
                // kehää (Päätoimittaja ca48b99e: kermaviiva paneelin reunassa), pienet yksityiskohdat voimistuvat täysin.
                float e = l[i] - b[i];
                float d = maara * 12f * (float)Math.Tanh(e / 12f) * suoja;
                if (d == 0) continue;
                int o = i * 4;
                rgba[o] = Tavu(rgba[o] + d); rgba[o + 1] = Tavu(rgba[o + 1] + d); rgba[o + 2] = Tavu(rgba[o + 2] + d);
            }
        }

        /// <summary>
        /// Sinisten ja syaanien eloisuus: kylläisyys s → s · (1 + voima · paino · (1 − s)), paino sävyikkunasta 170–250° (huippu 210°).
        /// Harmaa pysyy harmaana (s = 0) ja kylläiset kohdat eivät ylikyllästy; kirkkaus (max-kanava) säilyy.
        /// </summary>
        public static void Sinisyys(byte[] rgba, float voima)
        {
            for (int o = 0; o < rgba.Length; o += 4)
            {
                float r = rgba[o], g = rgba[o + 1], bl = rgba[o + 2];
                float mx = Math.Max(r, Math.Max(g, bl)), mn = Math.Min(r, Math.Min(g, bl));
                if (mx < 1f || mx - mn < 1f) continue;
                float s = (mx - mn) / mx, hue;
                if (mx == r) hue = 60f * (((g - bl) / (mx - mn)) % 6f);
                else if (mx == g) hue = 60f * ((bl - r) / (mx - mn) + 2f);
                else hue = 60f * ((r - g) / (mx - mn) + 4f);
                if (hue < 0) hue += 360f;
                float e = Math.Abs(hue - 210f) / 40f;
                if (e >= 1f || s < 0.12f) continue;
                // Vain selvästi sininen (meri, syvä utu): harmaansininen maa-utu ei sinerry (Päätoimittaja 6.10.: maa luonnollisena).
                float sk = Math.Min(1f, (s - 0.12f) / 0.18f);
                float paino = (0.5f + 0.5f * (float)Math.Cos(e * Math.PI)) * sk * sk * (3 - 2 * sk);
                float s2 = Math.Min(1f, s * (1f + voima * paino * (1f - s)));
                // Sama sävy ja max-kanava, uusi kylläisyys: kanava = mx − (mx − c) · s2 / s.
                float k = s2 / s;
                rgba[o] = Tavu(mx - (mx - r) * k); rgba[o + 1] = Tavu(mx - (mx - g) * k); rgba[o + 2] = Tavu(mx - (mx - bl) * k);
            }
        }

        /// <summary>
        /// Valojen pehmeä katto (omistaja 6.10.: "puhkipalaneeseen valkoiseen haloon … upean sinisen gradienttisävyn"; Päätoimittaja:
        /// kirkkain kohta alle 100 %): suurin kanava yli polven puristetaan tanh-käyrällä ja kaikki kanavat samassa suhteessa, jolloin
        /// sävy säilyy (sininen kaari ei valkene). Ajetaan viimeisenä S-käyrän jälkeen.
        /// </summary>
        /// <summary>
        /// Valotus kertoimella k pehmeällä olkapäällä (juliste 59dc1f55, Päätoimittaja 6.10. ilta: Suomenlahden pilvikansi tasainen
        /// valkoinen läntti): suora kerto leikkasi kertoimella 1,35 kaikki ≥ 189 arvot 255:een ennen kehitystä, joten pilven
        /// pinnanmuoto katosi. Kirkkain kanava m·k yli polven puristuu tanh-käyrällä kohti 255:tä (sävy säilyy, järjestys säilyy).
        /// </summary>
        public static void Valota(byte[] rgba, float k, float polvi = 160f)
        {
            float vara = 255f - polvi;
            for (int o = 0; o < rgba.Length; o += 4)
            {
                float m = Math.Max(rgba[o], Math.Max(rgba[o + 1], rgba[o + 2]));
                if (m <= 0) continue;
                float mk = m * k, f = mk <= polvi ? k : (polvi + vara * (float)Math.Tanh((mk - polvi) / vara)) / m;
                rgba[o] = Tavu(rgba[o] * f); rgba[o + 1] = Tavu(rgba[o + 1] * f); rgba[o + 2] = Tavu(rgba[o + 2] * f);
            }
        }

        public static void ValojenKatto(byte[] rgba, float polvi = 200f, float katto = 250f)
        {
            float vara = katto - polvi;
            for (int o = 0; o < rgba.Length; o += 4)
            {
                float m = Math.Max(rgba[o], Math.Max(rgba[o + 1], rgba[o + 2]));
                if (m <= polvi) continue;
                float k = (polvi + vara * (float)Math.Tanh((m - polvi) / vara)) / m;
                rgba[o] = Tavu(rgba[o] * k); rgba[o + 1] = Tavu(rgba[o + 1] * k); rgba[o + 2] = Tavu(rgba[o + 2] * k);
            }
        }

        /// <summary>
        /// Ilmakehän reuna 2D-gradienttina (Päätoimittaja 6.10. 14.3x, omistajan viite: "pehmeä sininen hehku … valkoista vyötä ei
        /// ole"): horisontin yllä ohut vaalea syaani (2–3 px / 2160), sitten taivaansininen → kuninkaansininen → laivastonsininen →
        /// musta ~58 px:n matkalla; fysikaalinen sironta jää alle himmennettynä (20 %), ja maan puolella 14 px:n vyö himmenee.
        /// raja[x] = ensimmäisen maarivin y ylhäältä (murtoluku), &lt; 0 = sarakkeessa ei horisonttia. rivitAlhaalta: Unityn tekstuuri.
        /// </summary>
        public static void Halo(byte[] rgba, int w, int h, float[] raja, bool rivitAlhaalta)
        {
            float s = w / 2160f;
            var p = new (float d, float r, float g, float b)[] { (0f, 205, 245, 255), (2.5f, 150, 215, 255), (9f, 70, 150, 250), (24f, 30, 75, 205), (40f, 12, 28, 95), (58f, 0, 0, 0) };
            int yla = (int)Math.Ceiling(92 * s) + 2, ala = (int)Math.Ceiling(14 * s);
            for (int x = 0; x < w; x++)
            {
                float yr = raja[x];
                if (yr < 0) continue;
                int y0 = (int)Math.Floor(yr);
                for (int y = Math.Max(0, y0 - yla); y < Math.Min(h, y0 + ala + 1); y++)
                {
                    float dd = (yr - (y + 0.5f)) / s;   // > 0 taivaan puolella
                    int o = ((rivitAlhaalta ? h - 1 - y : y) * w + x) * 4;
                    if (dd >= 0)
                    {
                        int i = 0; while (i < p.Length - 2 && dd > p[i + 1].d) i++;
                        float t = Math.Min(1f, Math.Max(0f, (dd - p[i].d) / (p[i + 1].d - p[i].d)));
                        float r = p[i].r + (p[i + 1].r - p[i].r) * t, g = p[i].g + (p[i + 1].g - p[i].g) * t, b = p[i].b + (p[i + 1].b - p[i].b) * t;
                        // Sironta alle 20 %:iin, gradientin jälkeen (58–90 px) takaisin täyteen, ettei synny saumaa.
                        float u = Math.Min(1f, Math.Max(0f, (dd - 58f) / 32f)), f = 0.2f + 0.8f * u * u * (3 - 2 * u);
                        rgba[o] = Tavu(r + f * rgba[o]); rgba[o + 1] = Tavu(g + f * rgba[o + 1]); rgba[o + 2] = Tavu(b + f * rgba[o + 2]);
                    }
                    else
                    {
                        // Maan puoli: reunan valkoinen utu himmenee ja saa ytimen syaanin sävyn aivan pinnassa.
                        float t = Math.Min(1f, -dd / 14f), k = 0.72f + 0.28f * t, ydin = Math.Max(0f, 1f - (-dd) / 1.5f) * 0.5f;
                        rgba[o] = Tavu(rgba[o] * k * (1 - ydin) + 205 * ydin); rgba[o + 1] = Tavu(rgba[o + 1] * k * (1 - ydin) + 245 * ydin);
                        rgba[o + 2] = Tavu(rgba[o + 2] * k * (1 - ydin) + 255 * ydin);
                    }
                }
            }
        }

        /// <summary>Hehku: luminanssi yli kynnyksen sumennetaan säteellä ja lisätään lämpimänä valkoisena.</summary>
        public static void Hehku(byte[] rgba, int w, int h, int kynnys, int sade, float voima)
        {
            int n = w * h; var m = new float[n]; bool yhtaan = false;
            for (int i = 0; i < n; i++)
            {
                float l = 0.2126f * rgba[i * 4] + 0.7152f * rgba[i * 4 + 1] + 0.0722f * rgba[i * 4 + 2];
                if (l > kynnys) { m[i] = (l - kynnys) / (255f - kynnys); yhtaan = true; }
            }
            if (!yhtaan) return;
            Sumenna(m, w, h, sade);
            for (int i = 0; i < n; i++)
            {
                float a = voima * m[i] * 255f;
                if (a < 0.5f) continue;
                int o = i * 4;
                rgba[o] = Tavu(rgba[o] + a); rgba[o + 1] = Tavu(rgba[o + 1] + a * 0.96f); rgba[o + 2] = Tavu(rgba[o + 2] + a * 0.88f);
            }
        }
    }
}
