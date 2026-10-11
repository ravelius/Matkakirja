// PORTAALIN PIELET JA KYNNYS (Siirtoseppä 11.10.2026; Laitetestaaja laituri-a1 f1041376: "laiturilla eteenpäin → kamera katsoo lattiaa").
// Mittaus (vesiportti-tormays.glb, paketti b257fdf63e18f222): kansi ja silta ovat samassa korkeudessa (−5,90), askel ei estä. Suora
// nousu:laituri → ovi:vesiportti-alku kulkee 0,07–0,43 m kannen itäreunan sisäpuolella; silta kääntyy portaalista 55° oikealle, joten
// tatti pohjassa kapseli liukuu kannen seinää pitkin aukon ohi kannen kaakkoiskulmaan (glTF −55,05 / 16,71, Unity z +16,71 peilattuna)
// kalliorannan eteen. Lisäksi aukossa kaksi putoamiskohtaa: kannen seinän pää ja sillan seinän matala kiila (0,47–0,8 m rako) sekä
// kolmioaukko kannen reunan ja sillan alun välissä (enintään 0,75 m). LR:n geometriakorjaukseen asti näkymättömät laatikot portaalin
// kehyksessä (t = matka portaalista kohti paria, s = sivu, + = n = (−u.z, u.x), glTF): pielet ohjaavat reunaa myötäilevän pelaajan
// sillalle ja kynnys peittää kolmioaukon. Vain taulukon portaalit; laatikot vain, kun portaali on mitatussa paikassa (±0,3 m).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Seikkailu
{
    public static class KavelyPielet
    {
        public const double PieliPaksuusM = 0.1, PieliAlaM = 0.3, PieliYlaM = 1.1, KynnysPaksuusM = 0.2, PaikkaVaraM = 0.3;

        /// <summary>Portaali, sen pari (suunta), mitattu paikka (glTF x, z) sekä pielet (t0, s0) → (t1, s1) ja kynnys (t, s -välit).</summary>
        sealed class Maaritys
        {
            public string Portaali, Pari; public double X, Z;
            public (double T0, double S0, double T1, double S1)[] Pielet;
            public double KynnysT0, KynnysT1, KynnysS0, KynnysS1;
        }

        static readonly Maaritys[] Taulu =
        {
            new Maaritys
            {
                Portaali = "ovi:vesiportti-alku", Pari = "ovi:vesiportti-loppu", X = -58.381, Z = 20.926,
                Pielet = new[]
                {
                    (0.0, -1.2, 2.5, -1.2),    // kannen puoli: seinän pää (t 1,05 / s −1,59) ja sillan kiila (0,78 / −1,21); kannen sisällä 0,7 m suppilona
                    (0.8, 1.2, 2.5, 1.2),      // sillan pohjoisseinän matala kiila (astuttava t 0,8–1,5)
                    (-1.0, 1.69, 0.85, 1.2),   // kannen seinän pää (−0,91 / 1,67) → sillan seinän alku (0,81 / 1,19): kolmioaukko kiinni
                },
                KynnysT0 = -1.0, KynnysT1 = 1.0, KynnysS0 = -1.2, KynnysS1 = 1.7,
            },
        };

        /// <summary>Laatikot glTF-koordinaateissa (KavelyLeikkaus: keskipiste, koko x = pituus, y, z = paksuus, kierto_y = atan2(u.z, u.x));
        /// nimet "pieli:&lt;portaali&gt;-N" ja "kynnys:&lt;portaali&gt;". Tyhjä, jos portaalia tai paria ei ole tai portaali on siirtynyt.</summary>
        public static List<KavelyLeikkaus> Laske(KavelyData d)
        {
            var ulos = new List<KavelyLeikkaus>();
            if (d == null) return ulos;
            foreach (var m in Taulu)
            {
                KavelyMerkki p = null, q = null;
                foreach (var k in d.Merkit) { if (k.Nimi == m.Portaali) p = k; else if (k.Nimi == m.Pari) q = k; }
                if (p == null || q == null || Math.Abs(p.X - m.X) > PaikkaVaraM || Math.Abs(p.Z - m.Z) > PaikkaVaraM) continue;
                double ux = q.X - p.X, uz = q.Z - p.Z, l = Math.Sqrt(ux * ux + uz * uz);
                if (l < 1e-6) continue;
                ux /= l; uz /= l;
                double nx = -uz, nz = ux;
                (double, double) Piste(double t, double s) => (p.X + ux * t + nx * s, p.Z + uz * t + nz * s);
                int i = 0;
                foreach (var (t0, s0, t1, s1) in m.Pielet)
                {
                    var (ax, az) = Piste(t0, s0); var (bx, bz) = Piste(t1, s1);
                    double dx = bx - ax, dz = bz - az, pit = Math.Sqrt(dx * dx + dz * dz);
                    // Paksuus ulospäin käytävästä: sisäpinta pysyy viivalla (käytävän leveys ennallaan).
                    double ox = -dz / pit, oz = dx / pit, puoli = (ox * nx + oz * nz) * (s0 + s1) >= 0 ? 1 : -1;
                    double cx = (ax + bx) / 2 + ox * puoli * PieliPaksuusM / 2, cz = (az + bz) / 2 + oz * puoli * PieliPaksuusM / 2;
                    ulos.Add(new KavelyLeikkaus($"pieli:{p.Tunnus}-{++i}", cx, p.Y + (PieliYlaM - PieliAlaM) / 2, cz,
                        pit, PieliAlaM + PieliYlaM, PieliPaksuusM, Math.Atan2(dz, dx)));
                }
                var (kx, kz) = Piste((m.KynnysT0 + m.KynnysT1) / 2, (m.KynnysS0 + m.KynnysS1) / 2);
                ulos.Add(new KavelyLeikkaus($"kynnys:{p.Tunnus}", kx, p.Y - KynnysPaksuusM / 2, kz,
                    m.KynnysT1 - m.KynnysT0, KynnysPaksuusM, m.KynnysS1 - m.KynnysS0, Math.Atan2(uz, ux)));
            }
            return ulos;
        }
    }
}

namespace Matkakirja.Linssit.Seikkailu
{
    /// <summary>
    /// SILMÄN VARA NÄKYVÄÄ MALLIA VASTEN (Siirtoseppä 11.10.2026; PT 07.0x, Laitetestaaja 5. kierros v10-30/60/76: "karmit upottavat
    /// kameran, kattolevy + seinä täyttää ruudun", kaikissa muunnelmissa). Mittaus tyrma-E101 (paketti b257fdf63e18f222): näkyvän kivi =
    /// törmäysmalli, mutta näkyvän rappauksen holvi (ei törmäystä) alkaa 1,60 m:stä seinän linjassa ja jatkuu oviaukon (1,0 × 1,9 m) eteen:
    /// silmät 1,62 m menevät oviaukossa holvin pinnan läpi (näkyvä aukko 1,6 m). Silmä lasketaan (kuten SeikkailuPelaaja.KattoRaja)
    /// korkeimpaan kohtaan, jossa VaraM-pallo ei koske näkyvään kolmioon; jos mikään korkeus ei auta (seinä vieressä), silmä pysyy.
    /// Kolmiot ruudukossa (SoluM, vaakataso); koordinaatit kutsujan (Unityssa kävelyosien isä).
    /// </summary>
    public sealed class SilmaVara
    {
        public const double VaraM = 0.15, AskelM = 0.02, SoluM = 1.0;
        readonly List<double> k = new List<double>();   // 9 lukua per kolmio
        readonly Dictionary<long, List<int>> solut = new Dictionary<long, List<int>>();
        public int Kolmioita => k.Count / 9;

        static long Avain(int i, int j) => ((long)i << 32) ^ (uint)j;

        /// <summary>Lisää meshin kolmiot (paikat x, y, z peräkkäin; kolmiot indekseinä).</summary>
        public void Lisaa(float[] paikat, int[] kolmiot)
        {
            if (paikat == null || kolmiot == null) return;
            for (int t = 0; t + 2 < kolmiot.Length; t += 3)
            {
                if (Math.Max(kolmiot[t], Math.Max(kolmiot[t + 1], kolmiot[t + 2])) * 3 + 2 >= paikat.Length) continue;
                int n = Kolmioita; double x0 = double.MaxValue, x1 = double.MinValue, z0 = double.MaxValue, z1 = double.MinValue;
                for (int v = 0; v < 3; v++)
                {
                    int a = kolmiot[t + v] * 3; double x = paikat[a], z = paikat[a + 2];
                    k.Add(x); k.Add(paikat[a + 1]); k.Add(z);
                    x0 = Math.Min(x0, x); x1 = Math.Max(x1, x); z0 = Math.Min(z0, z); z1 = Math.Max(z1, z);
                }
                for (int i = (int)Math.Floor(x0 / SoluM); i <= (int)Math.Floor(x1 / SoluM); i++)
                    for (int j = (int)Math.Floor(z0 / SoluM); j <= (int)Math.Floor(z1 / SoluM); j++)
                    {
                        if (!solut.TryGetValue(Avain(i, j), out var l)) solut[Avain(i, j)] = l = new List<int>();
                        l.Add(n);
                    }
            }
        }

        /// <summary>Koko glb: kaikki mesh-solmut (Solmut, TRS vanhempineen; kävelyosan glb:ssä kivi, kivilattia, olki ja rappaus omina
        /// solminaan). Pelkkä GlbMalli.Osat on vain ensimmäinen solmu (kivi), jossa holvia ei ole.</summary>
        public void LisaaMalli(GlbMalli m)
        {
            if (m == null) return;
            if (m.Solmut == null || m.Solmut.Count == 0) { foreach (var o in m.Osat) Lisaa(o.Paikat, o.Kolmiot); return; }
            for (int i = 0; i < m.Solmut.Count; i++)
                foreach (var o in m.Solmut[i].Osat)
                {
                    if (o.Paikat == null) continue;
                    var q = (float[])o.Paikat.Clone();
                    for (int v = 0; v + 2 < q.Length; v += 3)
                    {
                        double x = q[v], y = q[v + 1], z = q[v + 2];
                        for (int s = i, n = 0; s >= 0 && n < 64; s = m.Solmut[s].Vanhempi, n++) Muunna(m.Solmut[s], ref x, ref y, ref z);
                        q[v] = (float)x; q[v + 1] = (float)y; q[v + 2] = (float)z;
                    }
                    Lisaa(q, o.Kolmiot);
                }
        }

        /// <summary>Solmun paikallinen TRS pisteeseen: skaalaus, kierto (kvaternio x, y, z, w), siirto.</summary>
        static void Muunna(GlbSolmu s, ref double x, ref double y, ref double z)
        {
            x *= s.Scale[0]; y *= s.Scale[1]; z *= s.Scale[2];
            double qx = s.Rotation[0], qy = s.Rotation[1], qz = s.Rotation[2], qw = s.Rotation[3];
            // v' = v + 2w (q × v) + 2 q × (q × v)
            double tx = 2 * (qy * z - qz * y), ty = 2 * (qz * x - qx * z), tz = 2 * (qx * y - qy * x);
            double rx = x + qw * tx + (qy * tz - qz * ty), ry = y + qw * ty + (qz * tx - qx * tz), rz = z + qw * tz + (qx * ty - qy * tx);
            x = rx + s.Translation[0]; y = ry + s.Translation[1]; z = rz + s.Translation[2];
        }

        /// <summary>Lähimmän kolmion etäisyys pisteestä, kun se on alle raja (muuten raja).</summary>
        public double Etaisyys(double x, double y, double z, double raja = VaraM)
        {
            double paras = raja;
            int i0 = (int)Math.Floor((x - raja) / SoluM), i1 = (int)Math.Floor((x + raja) / SoluM);
            int j0 = (int)Math.Floor((z - raja) / SoluM), j1 = (int)Math.Floor((z + raja) / SoluM);
            for (int i = i0; i <= i1; i++)
                for (int j = j0; j <= j1; j++)
                    if (solut.TryGetValue(Avain(i, j), out var l))
                        foreach (int n in l) { double e = Piste(n, x, y, z); if (e < paras) paras = e; }
            return paras;
        }

        /// <summary>Korkein silmän y (silmaY:stä alaY:hen AskelM:n välein), jossa VaraM-pallo on vapaa; silmaY, jos mikään ei ole.</summary>
        public double Raja(double x, double z, double silmaY, double alaY)
        {
            for (double y = silmaY; y >= alaY - 1e-9; y -= AskelM) if (Etaisyys(x, y, z) >= VaraM) return y;
            return silmaY;
        }

        /// <summary>Pisteen etäisyys kolmiosta n (Ericson, Real-Time Collision Detection 5.1.5).</summary>
        double Piste(int n, double px, double py, double pz)
        {
            int o = n * 9;
            double ax = k[o], ay = k[o + 1], az = k[o + 2], bx = k[o + 3], by = k[o + 4], bz = k[o + 5], cx = k[o + 6], cy = k[o + 7], cz = k[o + 8];
            double abx = bx - ax, aby = by - ay, abz = bz - az, acx = cx - ax, acy = cy - ay, acz = cz - az;
            double apx = px - ax, apy = py - ay, apz = pz - az;
            double d1 = abx * apx + aby * apy + abz * apz, d2 = acx * apx + acy * apy + acz * apz;
            double qx, qy, qz;
            if (d1 <= 0 && d2 <= 0) { qx = ax; qy = ay; qz = az; return Et(px, py, pz, qx, qy, qz); }
            double bpx = px - bx, bpy = py - by, bpz = pz - bz;
            double d3 = abx * bpx + aby * bpy + abz * bpz, d4 = acx * bpx + acy * bpy + acz * bpz;
            if (d3 >= 0 && d4 <= d3) return Et(px, py, pz, bx, by, bz);
            double vc = d1 * d4 - d3 * d2;
            if (vc <= 0 && d1 >= 0 && d3 <= 0) { double v = d1 / (d1 - d3); return Et(px, py, pz, ax + abx * v, ay + aby * v, az + abz * v); }
            double cpx = px - cx, cpy = py - cy, cpz = pz - cz;
            double d5 = abx * cpx + aby * cpy + abz * cpz, d6 = acx * cpx + acy * cpy + acz * cpz;
            if (d6 >= 0 && d5 <= d6) return Et(px, py, pz, cx, cy, cz);
            double vb = d5 * d2 - d1 * d6;
            if (vb <= 0 && d2 >= 0 && d6 <= 0) { double w = d2 / (d2 - d6); return Et(px, py, pz, ax + acx * w, ay + acy * w, az + acz * w); }
            double va = d3 * d6 - d5 * d4;
            if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0)
            {
                double w = (d4 - d3) / (d4 - d3 + (d5 - d6));
                return Et(px, py, pz, bx + (cx - bx) * w, by + (cy - by) * w, bz + (cz - bz) * w);
            }
            double den = 1 / (va + vb + vc), vv = vb * den, ww = vc * den;
            qx = ax + abx * vv + acx * ww; qy = ay + aby * vv + acy * ww; qz = az + abz * vv + acz * ww;
            return Et(px, py, pz, qx, qy, qz);
        }

        static double Et(double ax, double ay, double az, double bx, double by, double bz)
        { double dx = ax - bx, dy = ay - by, dz = az - bz; return Math.Sqrt(dx * dx + dy * dy + dz * dz); }
    }
}
