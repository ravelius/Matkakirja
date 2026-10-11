// TYRMÄN OVIAUKKO JA RYÖMINTÄAUKKO (Siirtoseppä 11.10.2026; PT 06.0x, Laitetestaaja 4. kierros v8 653b7ce3: muunnelma 3 lukko auki
// 630 s, ulos vasta 1015 s, "kaksi mustaa karmia, kamera seinän sisään"). Oikea törmäysdata: kultaiset/olavinlinna-tyrma-E101-tormays.glb
// (paketti b257fdf63e18f222, LR:n vienti; sha1 6743d603) ja v47b-merkit (tyrmän merkit samat kuin paketissa). Kapselimalli kuten
// KavelyPieletTestit: ympyrä (0,3 + iho 0,03) seinien poikkileikkauksia vasten nilkalla (lattia + 0,4) ja vyötäröllä (+ 1,0).
// Mitattu: oviaukko 1,0 m × seinä 0,8 m, käytävä 1,0 m → kulkukelpoinen; ryömintäaukko 0,6 × 0,55 m (kapseli 0,66 m ei mahdu,
// yläpuolella kamana), irtokivi 0,18 m seinän sisällä → kapseli pysähtyy aukon suulle kiven ulottuville.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class TyrmaOviaukkoTestit
    {
        const double R = 0.33, Dt = 1 / 60.0, Lattia = -3.8;
        // SeikkailuTyrma: UlosM 1,2, OviLapiM 0,8, RyomiM 1,0; SeikkailuEsineet.PoimintaM 1,2.
        const double UlosM = 1.2, OviLapiM = 0.8, RyomiM = 1.0, PoimintaM = 1.2;

        static List<(double Ax, double Az, double Bx, double Bz)> seinat;
        static List<(double Ax, double Az, double Bx, double Bz)> Seinat()
        {
            if (seinat != null) return seinat;
            var m = DioraamaGlb.Lue(File.ReadAllBytes(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "olavinlinna-tyrma-E101-tormays.glb")), false);
            seinat = new List<(double, double, double, double)>();
            foreach (double h in new[] { Lattia + 0.4, Lattia + 1.0 })
                foreach (var o in m.Osat)
                    for (int i = 0; i + 2 < o.Kolmiot.Length; i += 3)
                    {
                        var p = new List<(double, double)>();
                        for (int k = 0; k < 3; k++)
                        {
                            int a = o.Kolmiot[i + k] * 3, b = o.Kolmiot[i + (k + 1) % 3] * 3;
                            double da = o.Paikat[a + 1] - h, db = o.Paikat[b + 1] - h;
                            if ((da < 0) != (db < 0)) { double f = da / (da - db); p.Add((o.Paikat[a] + (o.Paikat[b] - o.Paikat[a]) * f, o.Paikat[a + 2] + (o.Paikat[b + 2] - o.Paikat[a + 2]) * f)); }
                        }
                        if (p.Count == 2) seinat.Add((p[0].Item1, p[0].Item2, p[1].Item1, p[1].Item2));
                    }
            return seinat;
        }

        /// <summary>Lukitun oven törmäyslaatikko (SeikkailuEsineet.LuoOvet: leveys × 0,2 m merkin kohdalla, kierto_y) janoina.</summary>
        static List<(double, double, double, double)> OviLaatikko()
        {
            var o = M("ovi:tyrma"); double ky = o.KiertoY ?? 0, c = Math.Cos(ky), s = Math.Sin(ky), hx = o.Leveys / 2, hz = 0.1;
            // glTF-kierto y:n ympäri: paikallinen x → (cos, −sin), z → (sin, cos).
            (double, double) K(double a, double b) => (o.X + c * a + s * b, o.Z - s * a + c * b);
            var q = new[] { K(-hx, -hz), K(hx, -hz), K(hx, hz), K(-hx, hz) };
            var l = new List<(double, double, double, double)>();
            for (int k = 0; k < 4; k++) l.Add((q[k].Item1, q[k].Item2, q[(k + 1) % 4].Item1, q[(k + 1) % 4].Item2));
            return l;
        }

        static void Tyonna(ref double x, ref double z, List<(double Ax, double Az, double Bx, double Bz)> s)
        {
            for (int k = 0; k < 4; k++)
                foreach (var (ax, az, bx, bz) in s)
                {
                    double ex = bx - ax, ez = bz - az, ll = ex * ex + ez * ez; if (ll < 1e-12) continue;
                    double f = Math.Clamp(((x - ax) * ex + (z - az) * ez) / ll, 0, 1), cx = ax + ex * f, cz = az + ez * f, dx = x - cx, dz = z - cz;
                    double e = Math.Sqrt(dx * dx + dz * dz);
                    if (e < R && e > 1e-9) { x = cx + dx / e * R; z = cz + dz / e * R; }
                }
        }

        /// <summary>Tatti kohti pistettä (kävelyvauhti) enintään s sekuntia; palauttaa loppupaikan ja pienimmän etäisyyden mittapisteeseen.</summary>
        static (double X, double Z, double Lahin) Kohti(double x, double z, double kx, double kz, List<(double, double, double, double)> s, double mx, double mz, double sek = 12)
        {
            double lahin = double.MaxValue;
            for (double t = 0; t < sek; t += Dt)
            {
                double dx = kx - x, dz = kz - z, e = Math.Sqrt(dx * dx + dz * dz); if (e < 0.05) break;
                x += dx / e * Kavely.KavelyMs * Dt; z += dz / e * Kavely.KavelyMs * Dt;
                Tyonna(ref x, ref z, s);
                lahin = Math.Min(lahin, Math.Sqrt((x - mx) * (x - mx) + (z - mz) * (z - mz)));
            }
            return (x, z, lahin);
        }

        static KavelyMerkki M(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return m; throw new Exception(nimi); }
        static double Et(double x, double z, KavelyMerkki m) => Math.Sqrt((x - m.X) * (x - m.X) + (z - m.Z) * (z - m.Z));

        [Testi] static void AuennutOviaukkoKuljettavaKaytavanPaahan()
        {
            var i = M("istuu:pelaaja-tyrma"); var o = M("ovi:tyrma"); var u = M("ovi:tyrma-ulos");
            var (x, z, lahinOvi) = Kohti(i.X, i.Z, o.X, o.Z, Seinat(), o.X, o.Z);
            Oleta.Tosi(lahinOvi < OviLapiM, $"oljilta ovelle: oviaukon raja täyttyy ({lahinOvi:F2} m < {OviLapiM})");
            var (x2, z2, _) = Kohti(x, z, u.X, u.Z, Seinat(), u.X, u.Z);
            Oleta.Tosi(Et(x2, z2, u) < UlosM, $"oviaukosta käytävän päähän ({x2:F2} / {z2:F2}, {Et(x2, z2, u):F2} m)");
        }

        [Testi] static void SuljettuOviPysayttaa()
        {
            var i = M("istuu:pelaaja-tyrma"); var o = M("ovi:tyrma"); var u = M("ovi:tyrma-ulos");
            var s = new List<(double, double, double, double)>(Seinat()); s.AddRange(OviLaatikko());
            var (x, z, _) = Kohti(i.X, i.Z, o.X, o.Z, s, o.X, o.Z);
            var (x2, z2, _) = Kohti(x, z, u.X, u.Z, s, u.X, u.Z);
            Oleta.Tosi(Et(x2, z2, u) > UlosM + 0.5, $"lukittu ovi pitää huoneessa ({Et(x2, z2, u):F2} m käytävän päästä)");
        }

        [Testi] static void RyomintaaukonSuuKivenUlottuvilla()
        {
            // Laitetestaajan muunnelma 3: kipinä irtokiveen (590 s), tatti kohti → kapseli aukon suulle, ei aukkoon (0,6 × 0,55 m).
            var i = M("istuu:pelaaja-tyrma"); var k = M("esine:irtokivi-tyrma"); var r = M("ovi:tyrma-ryomi"); var o = M("ovi:tyrma");
            var (x, z, _) = Kohti(i.X, i.Z, r.X, r.Z, Seinat(), k.X, k.Z);
            Oleta.Tosi(Et(x, z, r) > 1.5, $"kapseli ei mene ryömintäaukkoon ({Et(x, z, r):F2} m pään merkistä)");
            Oleta.Tosi(Et(x, z, k) < RyomiM, $"aukon suulla kivi irti → ulos ({Et(x, z, k):F2} m < {RyomiM})");
            double pysty = (Lattia + 0.9) - k.Y, vaaka = Et(x, z, k);
            Oleta.Tosi(Math.Sqrt(vaaka * vaaka + pysty * pysty) < PoimintaM, $"irtokivi irrotettavissa aukon suulta ({vaaka:F2} m vaaka)");
            Oleta.Tosi(Et(x, z, o) > 4, $"aukon suu on kaukana ovesta ({Et(x, z, o):F2} m): oven vihje tarvitaan lukon auettua");
        }
    }
}
