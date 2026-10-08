// ELÄVÄN KAUPUNGIN VENEET JA LOKIT, VERKOT (Linssiseppä 8.10.2026; suunnitelma B1 + B2, docs/raportit/pallo-elava-kaupunki-20261008.md).
// Proseduraaliset matalapolygoniset mallit omasta koodista (ei ulkoisia malleja eikä lisenssejä): runko suippenee keulaan, vyö
// vesirajassa, kansirakennukset, ikkunanauha, savupiippu; vana erillisenä läpikuultavana verkkona. Pallo on 100–350 m:n päässä,
// joten 30 m:n lautta on ~200 kuvapistettä: muodot ja värit ratkaisevat, ei yksityiskohdat. Akselit: x oikealle, y ylös, z eteen
// (keula +z), vesiraja y = 0, runko ulottuu Syvays-verran veden alle. Värit sRGB-tavuina (varjostin muuntaa).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class VeneVerkko
    {
        public float[] Paikat, Normaalit; public byte[] Varit; public int[] Kolmiot;
        public float Pituus, Leveys, Korkeus;
        public int Karkia => Paikat.Length / 3;
    }

    public static class VeneMallit
    {
        public const float Syvays = 0.3f;
        public static readonly string[] Tyypit = { "lautta", "pendelbat", "saaristolaiva", "hoyrylaiva", "kiertoajelu", "autolautta", "pikkulautta", "vene" };

        static readonly byte[] Valkoinen = { 236, 236, 230, 255 }, Merensininen = { 28, 42, 70, 255 }, Musta = { 30, 30, 32, 255 },
            Ikkuna = { 40, 52, 62, 255 }, Kansi = { 150, 140, 125, 255 }, Puu = { 140, 98, 60, 255 }, Kelta = { 214, 170, 70, 255 },
            Punainen = { 150, 40, 36, 255 }, Harmaa = { 120, 124, 128, 255 }, Vihrea = { 34, 70, 52, 255 };

        sealed class Rakentaja
        {
            readonly List<float> p = new List<float>(), n = new List<float>(); readonly List<byte> c = new List<byte>(); readonly List<int> t = new List<int>();
            public int Karki(float x, float y, float z, float nx, float ny, float nz, byte[] v)
            {
                p.Add(x); p.Add(y); p.Add(z); n.Add(nx); n.Add(ny); n.Add(nz); c.AddRange(v); return p.Count / 3 - 1;
            }
            public void Kolmio(int a, int b, int c) { t.Add(a); t.Add(b); t.Add(c); }
            /// <summary>Tasainen nelikulmio a-b-c-d (kehän järjestyksessä), käännetään osoittamaan poispäin pisteestä sisa (rungon
            /// keskiviiva, laatikon keskipiste). Unityn etupuoli: normaali = Cross(p1 − p0, p2 − p0).</summary>
            public void Nelio(float[] a, float[] b, float[] cc, float[] d, byte[] v, float[] sisa)
            {
                float ux = d[0] - a[0], uy = d[1] - a[1], uz = d[2] - a[2], wx = cc[0] - a[0], wy = cc[1] - a[1], wz = cc[2] - a[2];
                float nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
                float l = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz); if (l < 1e-9f) return;
                nx /= l; ny /= l; nz /= l;
                float mx = (a[0] + cc[0]) / 2 - sisa[0], my = (a[1] + cc[1]) / 2 - sisa[1], mz = (a[2] + cc[2]) / 2 - sisa[2];
                bool kaanna = nx * mx + ny * my + nz * mz < 0;
                if (kaanna) { nx = -nx; ny = -ny; nz = -nz; }
                int i0 = Karki(a[0], a[1], a[2], nx, ny, nz, v), i1 = Karki(b[0], b[1], b[2], nx, ny, nz, v),
                    i2 = Karki(cc[0], cc[1], cc[2], nx, ny, nz, v), i3 = Karki(d[0], d[1], d[2], nx, ny, nz, v);
                if (!kaanna) { Kolmio(i0, i3, i2); Kolmio(i0, i2, i1); }
                else { Kolmio(i0, i2, i3); Kolmio(i0, i1, i2); }
            }
            public void Laatikko(float cx, float cy, float cz, float sx, float sy, float sz, byte[] v)
            {
                float x0 = cx - sx / 2, x1 = cx + sx / 2, y0 = cy, y1 = cy + sy, z0 = cz - sz / 2, z1 = cz + sz / 2;
                float[] P(float x, float y, float z) => new[] { x, y, z };
                var k = P(cx, cy + sy / 2, cz);
                Nelio(P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1), v, k);   // katto
                Nelio(P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1), v, k);   // etu (+z)
                Nelio(P(x1, y0, z0), P(x0, y0, z0), P(x0, y1, z0), P(x1, y1, z0), v, k);   // taka
                Nelio(P(x1, y0, z1), P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), v, k);   // oikea
                Nelio(P(x0, y0, z0), P(x0, y0, z1), P(x0, y1, z1), P(x0, y1, z0), v, k);   // vasen
            }
            public VeneVerkko Valmis(float l, float b, float h) => new VeneVerkko { Paikat = p.ToArray(), Normaalit = n.ToArray(), Varit = c.ToArray(), Kolmiot = t.ToArray(), Pituus = l, Leveys = b, Korkeus = h };
        }

        /// <summary>Rungon puolileveys osuutena (t = 0 perä, 1 keula): perä hieman kapeampi, keula suippo.</summary>
        public static float Muoto(float t)
        {
            if (t < 0.3f) return 0.86f + 0.14f * t / 0.3f;
            if (t < 0.55f) return 1f;
            float u = (t - 0.55f) / 0.45f; return (float)Math.Sqrt(Math.Max(0, 1 - u * u));
        }

        static readonly float[] Asemat = { 0f, 0.12f, 0.3f, 0.45f, 0.55f, 0.68f, 0.8f, 0.9f, 0.96f, 1f };

        /// <summary>Runko: kyljet vyönä (vesiraja–vyo) ja ylempänä (vyo–kansi), kansi tasona, perä peilinä.</summary>
        static void Runko(Rakentaja r, float l, float b, float h, byte[] kylki, byte[] vyo, byte[] kansi)
        {
            float vyoY = Math.Min(0.45f, h * 0.35f);
            float[] P(float t, float y, int puoli, float kerroin) => new[] { puoli * b / 2 * Muoto(t) * kerroin, y, -l / 2 + t * l };
            foreach (int s in new[] { 1, -1 })
                for (int i = 0; i + 1 < Asemat.Length; i++)
                {
                    float t0 = Asemat[i], t1 = Asemat[i + 1];
                    var a0 = P(t0, -Syvays, s, 0.88f); var a1 = P(t1, -Syvays, s, 0.88f);
                    var m0 = P(t0, vyoY, s, 0.97f); var m1 = P(t1, vyoY, s, 0.97f);
                    var y0 = P(t0, h, s, 1f); var y1 = P(t1, h, s, 1f);
                    var keski = new[] { 0f, h / 2, -l / 2 + (t0 + t1) / 2 * l };   // kyljet poispäin keskiviivasta
                    r.Nelio(a0, a1, m1, m0, vyo, keski); r.Nelio(m0, m1, y1, y0, kylki, keski);
                }
            // Perä (t = 0) ja kansi (viuhka keskiviivalta).
            r.Nelio(P(0, -Syvays, -1, 0.88f), P(0, -Syvays, 1, 0.88f), P(0, h, 1, 1f), P(0, h, -1, 1f), kylki, new[] { 0f, h / 2, 0f });
            for (int i = 0; i + 1 < Asemat.Length; i++)
            {
                float t0 = Asemat[i], t1 = Asemat[i + 1];
                r.Nelio(P(t0, h, -1, 1f), P(t0, h, 1, 1f), P(t1, h, 1, 1f), P(t1, h, -1, 1f), kansi, new[] { 0f, h - 10f, -l / 2 + t0 * l });
            }
        }

        /// <summary>Kansirakennus ikkunanauhoineen: laatikko ja hieman leveämpi tumma nauha keskikorkeudella.</summary>
        static void Rakennus(Rakentaja r, float y, float z, float sx, float sy, float sz, byte[] v, bool ikkunat = true)
        {
            r.Laatikko(0, y, z, sx, sy, sz, v);
            if (ikkunat) r.Laatikko(0, y + sy * 0.38f, z, sx + 0.06f, sy * 0.34f, sz + 0.06f, Ikkuna);
        }

        public static VeneVerkko Luo(string tyyppi)
        {
            var r = new Rakentaja();
            switch (tyyppi)
            {
                case "lautta":   // kaupungin lautta (~28 m)
                    Runko(r, 28, 7, 1.6f, Vihrea, Musta, Kansi);
                    Rakennus(r, 1.6f, -1f, 5.6f, 2.4f, 17f, Valkoinen);
                    Rakennus(r, 4f, 1.5f, 4.2f, 1.9f, 6f, Valkoinen);
                    r.Laatikko(0, 5.9f, 1.5f, 0.25f, 2.2f, 0.25f, Harmaa);
                    return r.Valmis(28, 7, 8.1f);
                case "pendelbat":   // työmatkavene (~24 m)
                    Runko(r, 24, 6.5f, 1.4f, Valkoinen, Merensininen, Kansi);
                    Rakennus(r, 1.4f, -1.5f, 5.4f, 2.3f, 15f, Valkoinen);
                    Rakennus(r, 3.7f, 3.5f, 3.4f, 1.7f, 3.6f, Valkoinen);
                    return r.Valmis(24, 6.5f, 5.4f);
                case "saaristolaiva":   // saaristolaiva (~36 m)
                    Runko(r, 36, 8, 1.8f, Valkoinen, Merensininen, Kansi);
                    Rakennus(r, 1.8f, -2f, 6.8f, 2.6f, 24f, Valkoinen);
                    Rakennus(r, 4.4f, 0f, 5.8f, 2.2f, 13f, Valkoinen);
                    r.Laatikko(0, 6.6f, 3.5f, 3.6f, 1.5f, 3f, Valkoinen);
                    r.Laatikko(0, 6.6f, -3f, 1.6f, 2.4f, 1.8f, Valkoinen);
                    r.Laatikko(0, 9.0f, -3f, 1.64f, 0.6f, 1.84f, Musta);
                    return r.Valmis(36, 8, 9.6f);
                case "hoyrylaiva":   // vanha höyrylaiva (~32 m): musta runko, valkoinen kansirakennus, korkea piippu
                    Runko(r, 32, 6.5f, 1.8f, Musta, Punainen, Puu);
                    Rakennus(r, 1.8f, -2f, 5.4f, 2.4f, 19f, Valkoinen);
                    r.Laatikko(0, 4.2f, 4f, 3.4f, 1.6f, 3f, Valkoinen);
                    r.Laatikko(0, 4.2f, -1f, 1.5f, 3.6f, 1.5f, Kelta);
                    r.Laatikko(0, 7.8f, -1f, 1.54f, 0.9f, 1.54f, Musta);
                    r.Laatikko(0, 1.8f, 11f, 0.22f, 9f, 0.22f, Puu);
                    return r.Valmis(32, 6.5f, 10.8f);
                case "kiertoajelu":   // kiertoajeluvene (~22 m): matala lasikatteinen salonki
                    Runko(r, 22, 6, 1.2f, Merensininen, Musta, Kansi);
                    r.Laatikko(0, 1.2f, -1f, 5f, 0.6f, 16f, Valkoinen);
                    r.Laatikko(0, 1.8f, -1f, 5.06f, 1.3f, 16.06f, Ikkuna);
                    r.Laatikko(0, 3.1f, -1f, 5f, 0.25f, 16f, Valkoinen);
                    return r.Valmis(22, 6, 3.4f);
                case "autolautta":   // maantielautta (~50 m): avoin autokansi, sivuilla kopit, komentosilta poikittain
                    Runko(r, 50, 13, 2.0f, Kelta, Musta, Harmaa);
                    r.Laatikko(5.6f, 2f, 0f, 1.6f, 2.6f, 34f, Kelta);
                    r.Laatikko(-5.6f, 2f, 0f, 1.6f, 2.6f, 34f, Kelta);
                    Rakennus(r, 4.6f, 0f, 12.8f, 2.6f, 4f, Valkoinen);
                    return r.Valmis(50, 13, 7.2f);
                case "pikkulautta":   // pieni lautta tai yhteysvene (~16 m)
                    Runko(r, 16, 5, 1.2f, Valkoinen, Merensininen, Kansi);
                    Rakennus(r, 1.2f, -0.5f, 4f, 2.2f, 8f, Valkoinen);
                    return r.Valmis(16, 5, 3.4f);
                default:   // "vene": moottorivene (~7 m)
                    Runko(r, 7, 2.6f, 0.9f, Valkoinen, Merensininen, Puu);
                    r.Laatikko(0, 0.9f, 0.3f, 1.9f, 0.9f, 2.4f, Valkoinen);
                    r.Laatikko(0, 1.25f, 1.0f, 1.94f, 0.4f, 1.0f, Ikkuna);
                    return r.Valmis(7, 2.6f, 1.8f);
            }
        }

        /// <summary>
        /// Vana: kaksi viistoa vaahtovyötä perästä taaksepäin (pituus 4 × rungon pituus, levenee 3 × leveyteen) ja keskivana;
        /// alfa 0,7 perässä → 0 lopussa. Tasossa y = 0, normaali ylös. Mittakaava rungon pituudella ja leveydellä.
        /// </summary>
        public static VeneVerkko Vana(float l, float b)
        {
            var r = new Rakentaja();
            float z0 = -l / 2, pit = 4f * l;
            const int N = 8;
            for (int puoli = -1; puoli <= 1; puoli++)
            {
                for (int i = 0; i < N; i++)
                {
                    float u0 = i / (float)N, u1 = (i + 1) / (float)N;
                    float LeveysKohdassa(float u) => puoli == 0 ? b * 0.35f * (1 + u) : b * 0.25f * (1 + 2 * u);
                    float Keski(float u) => puoli == 0 ? 0 : puoli * (b * 0.45f + u * b * 1.3f);
                    byte A(float u) => (byte)(255 * (puoli == 0 ? 0.55f : 0.7f) * (1 - u) * (1 - u));
                    float za = z0 - u0 * pit, zb = z0 - u1 * pit;
                    float xa = Keski(u0), xb = Keski(u1), wa = LeveysKohdassa(u0) / 2, wb = LeveysKohdassa(u1) / 2;
                    var va = new byte[] { 245, 248, 250, A(u0) }; var vb = new byte[] { 245, 248, 250, A(u1) };
                    int a0 = r.Karki(xa - wa, 0, za, 0, 1, 0, va), a1 = r.Karki(xa + wa, 0, za, 0, 1, 0, va);
                    int b0 = r.Karki(xb - wb, 0, zb, 0, 1, 0, vb), b1 = r.Karki(xb + wb, 0, zb, 0, 1, 0, vb);
                    r.Kolmio(a0, a1, b1); r.Kolmio(a0, b1, b0);
                }
            }
            return r.Valmis(l, b, 0);
        }

        /// <summary>Lokin vartalo (0,45 m, valkoinen, harmaa selkä) ja yksi siipi (+x, 0,65 m) tyveltä origosta.</summary>
        public static VeneVerkko LokinVartalo()
        {
            var r = new Rakentaja();
            r.Laatikko(0, -0.06f, 0, 0.12f, 0.12f, 0.45f, Valkoinen);
            r.Laatikko(0, 0.06f, 0.02f, 0.1f, 0.02f, 0.3f, Harmaa);
            return r.Valmis(0.45f, 0.12f, 0.14f);
        }

        public static VeneVerkko LokinSiipi(int puoli)
        {
            var r = new Rakentaja();
            r.Laatikko(puoli * 0.33f, 0, 0, 0.66f, 0.015f, 0.16f, Harmaa);
            r.Laatikko(puoli * 0.6f, 0.016f, -0.02f, 0.12f, 0.004f, 0.1f, Musta);   // musta siiven kärki
            return r.Valmis(0.66f, 0.16f, 0.02f);
        }
    }
}
