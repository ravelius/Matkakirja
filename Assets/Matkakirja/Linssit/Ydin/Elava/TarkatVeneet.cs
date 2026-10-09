// TARKEMMAT LAIVAT (Linssiseppä 2, 9.10.2026; omistaja TF 168: "tukholmassa liikkuvat laivat ovat hyviä, mutta saisiko niitä
// tarkemmiksi? nyt hieman liian laatikkomaisia", PT: omat mallit, ei ostoja). Proseduraaliset kuten LS1:n VeneMallit (sama VeneVerkko,
// samat akselit: x oikealle, y ylös, z eteen, vesiraja y = 0), mutta muoto ei ole laatikko:
//  - runko 16 asemasta: pyöreä peräpeili, suippo keula, joka kallistuu ylhäältä eteen, kansilinja nousee keulaan (sheer), kyljet
//    levenevät ylöspäin (flare); vesirajassa tumma ja punainen pohjamaali, kannen reunassa valkoinen kaide-nauha;
//  - kansirakennukset viistetyin kulmin (8-kulmainen pohja), ikkunarivit pilareineen, ohjaushytin isot ikkunat;
//  - pyöreät savupiiput (12 sivua, kallistus taaksepäin, yhtiön väriraita ja musta yläpää), mastot ja pelastusveneet.
// Tyypit (Tukholma): saaristolaiva (Waxholm-tyyppi, ~36 m), hoyrylaiva (vanha höyrylaiva, ~32 m), lautta (Djurgårdsfärjan, ~28 m),
// pendelbat (työmatkavene, ~24 m). Muut tyypit LS1:n VeneMalleista (ElavaKaupunki valitsee: TarkatVeneet.Tukee(tyyppi)).
// Piippu(tyyppi) = savun lähtöpiste (VeneSavu). Kolmiot noin 3–6 k / laiva (pallo 100–800 m:n päässä, muistibudjetti: verkko jaetaan).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public static class TarkatVeneet
    {
        static readonly byte[] Valkoinen = { 238, 238, 232, 255 }, Kerma = { 226, 220, 200, 255 }, Musta = { 28, 28, 30, 255 },
            Pohja = { 128, 38, 34, 255 }, Ikkuna = { 34, 46, 58, 255 }, Lankku = { 156, 128, 96, 255 }, Kelta = { 216, 172, 60, 255 },
            Sininen = { 32, 66, 120, 255 }, Harmaa = { 112, 116, 120, 255 }, Puu = { 120, 84, 52, 255 }, Oranssi = { 210, 96, 36, 255 },
            Lasi = { 120, 150, 168, 255 }, Tummansininen = { 24, 40, 72, 255 }, Penkki = { 70, 78, 88, 255 }, Punainen = { 168, 40, 36, 255 };

        // Pariisi (PT 9.10., omistajan TF 169: Seinen laivat punavalkoraitaisina laatikkoina): jokilaiva (bateau-mouche) ja
        // kiertoajelu (vedette / Batobus) tarkempina; muut VeneMalleista.
        public static readonly string[] Tyypit = { "saaristolaiva", "hoyrylaiva", "lautta", "pendelbat", "jokilaiva", "kiertoajelu" };
        public static bool Tukee(string tyyppi) => Array.IndexOf(Tyypit, tyyppi) >= 0;

        sealed class R
        {
            readonly List<float> p = new List<float>(), n = new List<float>(); readonly List<byte> c = new List<byte>(); readonly List<int> t = new List<int>();
            public int K(float x, float y, float z, float nx, float ny, float nz, byte[] v) { p.Add(x); p.Add(y); p.Add(z); n.Add(nx); n.Add(ny); n.Add(nz); c.AddRange(v); return p.Count / 3 - 1; }
            /// <summary>Nelikulmio a-b-c-d, normaali käännetään poispäin pisteestä sisa (kuten VeneMallit).</summary>
            public void Q(float[] a, float[] b, float[] cc, float[] d, byte[] v, float[] sisa)
            {
                float ux = d[0] - a[0], uy = d[1] - a[1], uz = d[2] - a[2], wx = cc[0] - a[0], wy = cc[1] - a[1], wz = cc[2] - a[2];
                float nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
                float l = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz); if (l < 1e-9f) return;
                nx /= l; ny /= l; nz /= l;
                float mx = (a[0] + cc[0]) / 2 - sisa[0], my = (a[1] + cc[1]) / 2 - sisa[1], mz = (a[2] + cc[2]) / 2 - sisa[2];
                bool kaanna = nx * mx + ny * my + nz * mz < 0;
                if (kaanna) { nx = -nx; ny = -ny; nz = -nz; }
                int i0 = K(a[0], a[1], a[2], nx, ny, nz, v), i1 = K(b[0], b[1], b[2], nx, ny, nz, v), i2 = K(cc[0], cc[1], cc[2], nx, ny, nz, v), i3 = K(d[0], d[1], d[2], nx, ny, nz, v);
                if (!kaanna) { t.Add(i0); t.Add(i3); t.Add(i2); t.Add(i0); t.Add(i2); t.Add(i1); }
                else { t.Add(i0); t.Add(i2); t.Add(i3); t.Add(i0); t.Add(i1); t.Add(i2); }
            }
            /// <summary>Kolmio, jonka normaali osoittaa suuntaan (nx, ny, nz); kiertojärjestys valitaan sen mukaan (Unity: Cross(p1−p0, p2−p0)).</summary>
            public void T(float[] a, float[] b, float[] cc, byte[] v, float nx, float ny, float nz)
            {
                float ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], wx = cc[0] - a[0], wy = cc[1] - a[1], wz = cc[2] - a[2];
                float cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
                int i0 = K(a[0], a[1], a[2], nx, ny, nz, v), i1 = K(b[0], b[1], b[2], nx, ny, nz, v), i2 = K(cc[0], cc[1], cc[2], nx, ny, nz, v);
                if (cx * nx + cy * ny + cz * nz >= 0) { t.Add(i0); t.Add(i1); t.Add(i2); } else { t.Add(i0); t.Add(i2); t.Add(i1); }
            }
            /// <summary>Korkeus = korkein kärki (mastot ja piiput mukana).</summary>
            public VeneVerkko Valmis(float l, float b, float _)
            {
                float h = 0; for (int i = 1; i < p.Count; i += 3) h = Math.Max(h, p[i]);
                return new VeneVerkko { Paikat = p.ToArray(), Normaalit = n.ToArray(), Varit = c.ToArray(), Kolmiot = t.ToArray(), Pituus = l, Leveys = b, Korkeus = h };
            }
        }

        static float[] P(float x, float y, float z) => new[] { x, y, z };

        /// <summary>Rungon puolileveys osuutena (t 0 perä … 1 keula): pyöreä perä, täysi keskiosa, suippo keula.</summary>
        public static float Leveys(float t)
        {
            if (t < 0.18f) { float u = t / 0.18f; return 0.72f + 0.28f * (float)Math.Sqrt(u * (2 - u)); }
            if (t < 0.58f) return 1f;
            float v = (t - 0.58f) / 0.42f; return (float)Math.Pow(Math.Max(0, 1 - v * v), 0.75);
        }

        /// <summary>Kannen korkeus (sheer): nousee keulaan ja hieman perään.</summary>
        static float Kansi(float t, float h) => h * (1f + 0.22f * Math.Max(0, t - 0.6f) / 0.4f + 0.06f * Math.Max(0, 0.15f - t) / 0.15f);

        const int Asemia = 16;

        static void Runko(R r, float l, float b, float h, byte[] kylki, byte[] raita, float syvays)
        {
            // Asema t: z = −l/2 + t·l; keulan yläosa kallistuu eteen (rake 0,05 l), kyljet levenevät ylöspäin (flare 6 %).
            float[] Pt(float t, float y, int s, float kerroin)
            {
                float z = -l / 2 + t * l + (t > 0.85f ? (y / (h * 1.2f)) * 0.05f * l * (t - 0.85f) / 0.15f : 0f);
                float w = b / 2 * Leveys(t) * kerroin * (1f + 0.06f * Math.Max(0, y) / h);
                return P(s * w, y, z);
            }
            var keski = new float[3];
            for (int i = 0; i < Asemia; i++)
            {
                float t0 = i / (float)Asemia, t1 = (i + 1) / (float)Asemia;
                float k0 = Kansi(t0, h), k1 = Kansi(t1, h), raitaY = Math.Min(0.35f, h * 0.18f);
                foreach (int s in new[] { 1, -1 })
                {
                    keski[0] = 0; keski[1] = h / 2; keski[2] = -l / 2 + (t0 + t1) / 2 * l;
                    r.Q(Pt(t0, -syvays, s, 0.86f), Pt(t1, -syvays, s, 0.86f), Pt(t1, 0.02f, s, 0.97f), Pt(t0, 0.02f, s, 0.97f), Pohja, keski);   // pohjamaali
                    r.Q(Pt(t0, 0.02f, s, 0.97f), Pt(t1, 0.02f, s, 0.97f), Pt(t1, raitaY, s, 0.99f), Pt(t0, raitaY, s, 0.99f), raita, keski);     // vesirajan raita
                    r.Q(Pt(t0, raitaY, s, 0.99f), Pt(t1, raitaY, s, 0.99f), Pt(t1, k1, s, 1f), Pt(t0, k0, s, 1f), kylki, keski);                  // kylki
                    r.Q(Pt(t0, k0, s, 1f), Pt(t1, k1, s, 1f), Pt(t1, k1 + 0.9f, s, 1f), Pt(t0, k0 + 0.9f, s, 1f), Valkoinen, keski);             // kaide (umpinainen)
                }
                // Kansi (puu) asemittain.
                r.Q(Pt(t0, k0, -1, 1f), Pt(t0, k0, 1, 1f), Pt(t1, k1, 1, 1f), Pt(t1, k1, -1, 1f), Lankku, P(0, -10f, -l / 2 + t0 * l));
            }
            // Peräpeili (pyöreän perän tasainen pää).
            r.Q(Pt(0, -syvays, -1, 0.86f), Pt(0, -syvays, 1, 0.86f), Pt(0, Kansi(0, h), 1, 1f), Pt(0, Kansi(0, h), -1, 1f), kylki, P(0, h / 2, 0));
        }

        /// <summary>Kansirakennus: 8-kulmainen pohja (viistetyt kulmat), ikkunarivi pilareineen, katto. y = lattia, z = keskikohta.</summary>
        static void Rakennus(R r, float y, float z, float sx, float sy, float sz, byte[] seina, byte[] katto, bool isotIkkunat = false)
        {
            float v = Math.Min(sx, sz) * 0.22f, hx = sx / 2, hz = sz / 2;
            var pohja = new[] { P(-hx + v, 0, hz), P(hx - v, 0, hz), P(hx, 0, hz - v), P(hx, 0, -hz + v), P(hx - v, 0, -hz), P(-hx + v, 0, -hz), P(-hx, 0, -hz + v), P(-hx, 0, hz - v) };
            var k = P(0, y + sy / 2, z);
            float ia = y + sy * (isotIkkunat ? 0.35f : 0.45f), ib = y + sy * (isotIkkunat ? 0.88f : 0.78f);
            for (int i = 0; i < 8; i++)
            {
                var a = pohja[i]; var b = pohja[(i + 1) % 8];
                float[] Q(float[] q, float yy) => P(q[0], yy, q[2] + z);
                r.Q(Q(a, y), Q(b, y), Q(b, ia), Q(a, ia), seina, k);
                r.Q(Q(a, ib), Q(b, ib), Q(b, y + sy), Q(a, y + sy), seina, k);
                // Ikkunat: sivun pituuden mukaan 1,1 m:n ruutuja, välissä pilarit (seinän väri).
                float dx = b[0] - a[0], dz = b[2] - a[2], pit = (float)Math.Sqrt(dx * dx + dz * dz);
                int ruutuja = Math.Max(1, (int)(pit / 1.1f));
                for (int j = 0; j < ruutuja; j++)
                {
                    float u0 = (j + 0.12f) / ruutuja, u1 = (j + 0.88f) / ruutuja, p0 = j / (float)ruutuja, p1 = (j + 1f) / ruutuja;
                    float[] L(float u, float yy) => P(a[0] + dx * u, yy, a[2] + dz * u + z);
                    r.Q(L(u0, ia), L(u1, ia), L(u1, ib), L(u0, ib), Ikkuna, k);
                    r.Q(L(p0, ia), L(u0, ia), L(u0, ib), L(p0, ib), seina, k);
                    r.Q(L(u1, ia), L(p1, ia), L(p1, ib), L(u1, ib), seina, k);
                }
            }
            // Katto hieman yli (räystäs).
            for (int i = 0; i < 8; i++)
            {
                var a = pohja[i]; var b = pohja[(i + 1) % 8];
                r.T(P(0, y + sy, z), P(a[0] * 1.04f, y + sy, a[2] * 1.04f + z), P(b[0] * 1.04f, y + sy, b[2] * 1.04f + z), katto, 0, 1, 0);
            }
        }

        /// <summary>Suorakulmainen laatikko (penkit, kaiteet, ohjaamon katto): keskipiste (x, y + sy/2, z), mitat sx × sy × sz.</summary>
        static void Laatikko(R r, float x, float y, float z, float sx, float sy, float sz, byte[] v)
        {
            float a = x - sx / 2, b = x + sx / 2, c = y, d = y + sy, e = z - sz / 2, f = z + sz / 2; var k = P(x, y + sy / 2, z);
            r.Q(P(a, c, e), P(b, c, e), P(b, d, e), P(a, d, e), v, k); r.Q(P(a, c, f), P(b, c, f), P(b, d, f), P(a, d, f), v, k);
            r.Q(P(a, c, e), P(a, c, f), P(a, d, f), P(a, d, e), v, k); r.Q(P(b, c, e), P(b, c, f), P(b, d, f), P(b, d, e), v, k);
            r.Q(P(a, d, e), P(b, d, e), P(b, d, f), P(a, d, f), v, k);
        }

        /// <summary>Lasikattoinen salonki (jokilaivat): matala seinä, isot ikkunat ja loiva lasikatto harjalla.</summary>
        static void LasiSalonki(R r, float y, float z, float sx, float sy, float sz, byte[] seina)
        {
            Rakennus(r, y, z, sx, sy, sz, seina, Lasi, true);
            float hx = sx / 2 * 0.96f, hz = sz / 2 * 0.98f, harja = y + sy + sx * 0.12f; var k = P(0, y + sy * 0.5f, z);
            r.Q(P(-hx, y + sy, z - hz), P(-hx, y + sy, z + hz), P(0, harja, z + hz), P(0, harja, z - hz), Lasi, k);
            r.Q(P(hx, y + sy, z - hz), P(hx, y + sy, z + hz), P(0, harja, z + hz), P(0, harja, z - hz), Lasi, k);
            for (int i = -3; i <= 3; i++) Laatikko(r, 0, y + sy, z + i * sz / 7f, sx * 0.98f, 0.08f, 0.12f, seina);   // kattokaaret
        }

        /// <summary>Pyöreä savupiippu: 12 sivua, kallistus taaksepäin, raita ja musta yläpää.</summary>
        static void Piippu(R r, float y, float z, float halk, float korkeus, byte[] runko, byte[] raita)
        {
            const int sivuja = 12; float kallistus = 0.12f * korkeus;
            float[] Kehä(int i, float yy) { double a = i * Math.PI * 2 / sivuja; float tz = (yy - y) / korkeus * -kallistus; return P((float)Math.Cos(a) * halk / 2, yy, z + tz + (float)Math.Sin(a) * halk / 2); }
            float[] tasot = { y, y + korkeus * 0.62f, y + korkeus * 0.8f, y + korkeus * 0.9f, y + korkeus };
            byte[][] varit = { runko, raita, runko, Musta };
            for (int s = 0; s < 4; s++)
                for (int i = 0; i < sivuja; i++)
                {
                    var k = P(0, (tasot[s] + tasot[s + 1]) / 2, z - kallistus * ((tasot[s] + tasot[s + 1]) / 2 - y) / korkeus);
                    r.Q(Kehä(i, tasot[s]), Kehä(i + 1, tasot[s]), Kehä(i + 1, tasot[s + 1]), Kehä(i, tasot[s + 1]), varit[s], k);
                }
        }

        static void Masto(R r, float y, float z, float korkeus, byte[] v)
        {
            float d = 0.12f;
            var k = P(0, y + korkeus / 2, z);
            r.Q(P(-d, y, z - d), P(d, y, z - d), P(d, y + korkeus, z - d), P(-d, y + korkeus, z - d), v, k);
            r.Q(P(-d, y, z + d), P(d, y, z + d), P(d, y + korkeus, z + d), P(-d, y + korkeus, z + d), v, k);
            r.Q(P(-d, y, z - d), P(-d, y, z + d), P(-d, y + korkeus, z + d), P(-d, y + korkeus, z - d), v, k);
            r.Q(P(d, y, z - d), P(d, y, z + d), P(d, y + korkeus, z + d), P(d, y + korkeus, z - d), v, k);
        }

        /// <summary>Pelastusvene kannella (pieni suippo runko, oranssi tai valkoinen).</summary>
        static void Pelastusvene(R r, float x, float y, float z, float pit, byte[] v)
        {
            float b = pit * 0.3f, h = pit * 0.18f;
            var k = P(x, y + h / 2, z);
            for (int i = 0; i < 6; i++)
            {
                float t0 = i / 6f, t1 = (i + 1) / 6f;
                float w0 = b / 2 * (float)Math.Sin(Math.PI * Math.Max(0.15, t0)), w1 = b / 2 * (float)Math.Sin(Math.PI * Math.Max(0.15, t1));
                float z0 = z - pit / 2 + t0 * pit, z1 = z - pit / 2 + t1 * pit;
                r.Q(P(x - w0, y + h, z0), P(x + w0, y + h, z0), P(x + w1, y + h, z1), P(x - w1, y + h, z1), v, P(x, y - 5f, z));
                foreach (int s in new[] { 1, -1 }) r.Q(P(x + s * w0 * 0.6f, y, z0), P(x + s * w1 * 0.6f, y, z1), P(x + s * w1, y + h, z1), P(x + s * w0, y + h, z0), v, k);
            }
        }

        /// <summary>Savun lähtöpiste (piipun yläpää, veneen paikallisissa koordinaateissa) tai null.</summary>
        public static float[] Piippu(string tyyppi) => tyyppi switch
        {
            "saaristolaiva" => P(0, 9.6f, -1.5f),
            "hoyrylaiva" => P(0, 11.2f, 0.5f),
            "lautta" => P(0, 7.4f, -2f),
            "pendelbat" => P(0, 5.6f, -4f),
            _ => null,
        };

        public static VeneVerkko Luo(string tyyppi)
        {
            var r = new R();
            switch (tyyppi)
            {
                case "saaristolaiva":   // Waxholm-tyyppi (~36 m): valkoinen, kaksi kansirakennusta, keltaraitainen musta piippu
                {
                    float l = 36, b = 7.6f, h = 2.0f;
                    Runko(r, l, b, h, Valkoinen, Sininen, 0.35f);
                    Rakennus(r, h, -2.5f, b * 0.82f, 2.3f, l * 0.55f, Valkoinen, Harmaa);
                    Rakennus(r, h + 2.3f, -1.0f, b * 0.7f, 2.1f, l * 0.34f, Valkoinen, Harmaa);
                    Rakennus(r, h + 4.4f, 6.5f, b * 0.5f, 1.8f, 3.2f, Valkoinen, Harmaa, true);
                    Piippu(r, h + 4.4f, -1.5f, 1.5f, 3.2f, Musta, Kelta);
                    Masto(r, h + 6.2f, 6.8f, 5f, Valkoinen);
                    foreach (int s in new[] { 1, -1 }) Pelastusvene(r, s * b * 0.3f, h + 4.4f, -7f, 4.2f, Valkoinen);
                    return r.Valmis(l, b, h + 11f);
                }
                case "hoyrylaiva":   // vanha höyrylaiva (~32 m): musta runko, valkoinen kansirakennus, korkea musta piippu, kaksi mastoa
                {
                    float l = 32, b = 6.4f, h = 1.9f;
                    Runko(r, l, b, h, Musta, Kerma, 0.4f);
                    Rakennus(r, h, -1.5f, b * 0.78f, 2.2f, l * 0.5f, Valkoinen, Puu);
                    Rakennus(r, h + 2.2f, 4.5f, b * 0.48f, 1.8f, 3.4f, Valkoinen, Puu, true);
                    Piippu(r, h + 2.2f, 0.5f, 1.3f, 7.1f, Musta, Valkoinen);
                    Masto(r, h, 11.5f, 9f, Puu); Masto(r, h + 2.2f, -9.5f, 6f, Puu);
                    foreach (int s in new[] { 1, -1 }) Pelastusvene(r, s * b * 0.32f, h + 2.2f, -4.5f, 3.6f, Valkoinen);
                    return r.Valmis(l, b, h + 12f);
                }
                case "lautta":   // Djurgårdsfärjan (~28 m): valkoinen, pitkä matala salonki, ohjaushytti keskellä, musta piippu
                {
                    float l = 28, b = 7.0f, h = 1.6f;
                    Runko(r, l, b, h, Valkoinen, Musta, 0.3f);
                    Rakennus(r, h, 0f, b * 0.8f, 2.3f, l * 0.62f, Valkoinen, Harmaa);
                    Rakennus(r, h + 2.3f, 2.5f, b * 0.45f, 1.7f, 3.0f, Valkoinen, Harmaa, true);
                    Piippu(r, h + 2.3f, -2f, 1.0f, 3.5f, Musta, Sininen);
                    Masto(r, h + 4f, 3.2f, 3f, Valkoinen);
                    return r.Valmis(l, b, h + 8f);
                }
                case "pendelbat":   // työmatkavene (~24 m): moderni, matala, sininen raita, iso ikkunainen salonki, oranssit pelastuslautat
                {
                    float l = 24, b = 6.0f, h = 1.5f;
                    Runko(r, l, b, h, Valkoinen, Sininen, 0.3f);
                    Rakennus(r, h, -1f, b * 0.86f, 2.4f, l * 0.6f, Valkoinen, Sininen, true);
                    Rakennus(r, h + 2.4f, 2f, b * 0.5f, 1.4f, 2.6f, Valkoinen, Sininen, true);
                    Piippu(r, h + 2.4f, -4f, 0.6f, 1.8f, Valkoinen, Sininen);
                    foreach (int s in new[] { 1, -1 }) Pelastusvene(r, s * b * 0.35f, h + 2.4f, -6f, 1.8f, Oranssi);
                    return r.Valmis(l, b, h + 6f);
                }
                case "jokilaiva":   // bateau-mouche (~50 m): valkoinen matala runko, tummansininen raita, pitkä lasikattoinen salonki,
                {                   // perässä avoin kansi penkkiriveineen, ohjaamo keulassa, lippu perässä
                    float l = 50, b = 9.0f, h = 1.3f;
                    Runko(r, l, b, h, Valkoinen, Tummansininen, 0.3f);
                    LasiSalonki(r, h, -3f, b * 0.86f, 2.1f, l * 0.58f, Valkoinen);
                    Rakennus(r, h, 15.5f, b * 0.42f, 2.4f, 3.6f, Valkoinen, Valkoinen, true);   // ohjaamo
                    for (int i = 0; i < 4; i++) Laatikko(r, 0, h, -19.5f + i * 1.3f, b * 0.7f, 0.45f, 0.5f, Penkki);   // avoin peräkansi
                    foreach (int s2 in new[] { 1, -1 }) Laatikko(r, s2 * b * 0.43f, h, -19f, 0.06f, 0.9f, 6f, Valkoinen);   // kaide
                    Masto(r, h, -23f, 3.2f, Valkoinen);
                    return r.Valmis(l, b, h + 4f);
                }
                case "kiertoajelu":   // vedette / Batobus (~24 m): matala, tummansininen, lähes koko pituudelta lasikattoinen salonki
                {
                    float l = 24, b = 5.6f, h = 1.3f;
                    Runko(r, l, b, h, Tummansininen, Valkoinen, 0.25f);
                    LasiSalonki(r, h, -0.5f, b * 0.84f, 1.7f, l * 0.66f, Tummansininen);
                    Laatikko(r, 0, h, -10.5f, b * 0.6f, 0.4f, 1.2f, Penkki);
                    Masto(r, h, -9.5f, 2.4f, Valkoinen);
                    return r.Valmis(l, b, h + 3.2f);
                }
                default: return null;
            }
        }
    }
}
