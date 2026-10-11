// PORTAALIN PIELET (Siirtoseppä 11.10.2026; Laitetestaaja laituri-a1 f1041376: tatti pohjassa laiturilta ei päässyt linnaan). Oikea
// törmäysdata: kultaiset/olavinlinna-vesiportti-tormays.glb (paketti b257fdf63e18f222, LR:n vienti; sha1 fc1ffb5a) ja v47b-merkit.
// Kapselimalli: CharacterControllerin vaakaliuku ympyränä (säde 0,3 + iho 0,03) seinien poikkileikkauksia vasten nilkan yläpuolella
// (lattia + 0,4 m, askel 0,35 ylittyy) ja vyötäröllä (+ 1,0 m); liike Ydin Kavelyn juoksulla (tatti reunassa) nousu:laiturilta katse
// ovi:vesiportti-alkuun (DioraamaSovitin.VeneLaituriin). Ilman pieliä kapseli päätyy kannen kaakkoiskulmaan, pielin sillalle.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class KavelyPieletTestit
    {
        const double R = 0.33, Dt = 1 / 60.0, Lattia = -5.9;

        static List<(double X, double Y, double Z)[]> kolmiot;
        static List<(double X, double Y, double Z)[]> Kolmiot()
        {
            if (kolmiot != null) return kolmiot;
            var m = DioraamaGlb.Lue(File.ReadAllBytes(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "olavinlinna-vesiportti-tormays.glb")), false);
            kolmiot = new List<(double, double, double)[]>();
            foreach (var o in m.Osat)
                for (int i = 0; i + 2 < o.Kolmiot.Length; i += 3)
                {
                    var t = new (double, double, double)[3];
                    for (int k = 0; k < 3; k++) { int v = o.Kolmiot[i + k] * 3; t[k] = (o.Paikat[v], o.Paikat[v + 1], o.Paikat[v + 2]); }
                    kolmiot.Add(t);
                }
            return kolmiot;
        }

        /// <summary>Seinäjanat (x, z) korkeuksilla lattia + 0,4 ja + 1,0: kolmioiden ja pielien poikkileikkaukset.</summary>
        static List<(double Ax, double Az, double Bx, double Bz)> Seinat(List<KavelyLeikkaus> pielet)
        {
            var s = new List<(double, double, double, double)>();
            foreach (double h in new[] { Lattia + 0.4, Lattia + 1.0 })
            {
                foreach (var t in Kolmiot())
                {
                    var p = new List<(double, double)>();
                    for (int k = 0; k < 3; k++)
                    {
                        var a = t[k]; var b = t[(k + 1) % 3]; double da = a.Y - h, db = b.Y - h;
                        if ((da < 0) != (db < 0)) { double f = da / (da - db); p.Add((a.X + (b.X - a.X) * f, a.Z + (b.Z - a.Z) * f)); }
                    }
                    if (p.Count == 2) s.Add((p[0].Item1, p[0].Item2, p[1].Item1, p[1].Item2));
                }
                foreach (var l in pielet)
                {
                    if (Math.Abs(h - l.Y) > l.KokoY / 2) continue;
                    double c = Math.Cos(l.KiertoY), n = Math.Sin(l.KiertoY), hx = l.KokoX / 2, hz = l.KokoZ / 2;
                    (double, double) K(double a, double b) => (l.X + c * a - n * b, l.Z + n * a + c * b);
                    var q = new[] { K(-hx, -hz), K(hx, -hz), K(hx, hz), K(-hx, hz) };
                    for (int k = 0; k < 4; k++) s.Add((q[k].Item1, q[k].Item2, q[(k + 1) % 4].Item1, q[(k + 1) % 4].Item2));
                }
            }
            return s;
        }

        /// <summary>Lattiaa pisteen alla (glb:n pinta kannen tasosta sillan −5,6:een tai kynnys).</summary>
        static bool Lattiaa(double x, double z, List<KavelyLeikkaus> pielet)
        {
            foreach (var l in pielet) if (l.Nimi.StartsWith("kynnys:", StringComparison.Ordinal) && l.Sisalla(x, l.Y, z)) return true;
            foreach (var t in Kolmiot())
            {
                double x0 = t[0].X, z0 = t[0].Z, x1 = t[1].X - x0, z1 = t[1].Z - z0, x2 = t[2].X - x0, z2 = t[2].Z - z0, px = x - x0, pz = z - z0;
                double d = x1 * z2 - x2 * z1; if (Math.Abs(d) < 1e-9) continue;
                double u = (px * z2 - x2 * pz) / d, v = (x1 * pz - px * z1) / d;
                if (u < 0 || v < 0 || u + v > 1) continue;
                double y = t[0].Y + u * (t[1].Y - t[0].Y) + v * (t[2].Y - t[0].Y);
                if (y > Lattia - 0.15 && y < Lattia + 0.45) return true;   // silta nousee −5,6:een
            }
            return false;
        }

        static void Tyonna(ref double x, ref double z, List<(double Ax, double Az, double Bx, double Bz)> seinat)
        {
            for (int k = 0; k < 4; k++)
                foreach (var (ax, az, bx, bz) in seinat)
                {
                    double ex = bx - ax, ez = bz - az, ll = ex * ex + ez * ez; if (ll < 1e-12) continue;
                    double f = Math.Clamp(((x - ax) * ex + (z - az) * ez) / ll, 0, 1), cx = ax + ex * f, cz = az + ez * f, dx = x - cx, dz = z - cz;
                    double e = Math.Sqrt(dx * dx + dz * dz);
                    if (e < R && e > 1e-9) { x = cx + dx / e * R; z = cz + dz / e * R; }
                }
        }

        /// <summary>Tatti suoraan eteen (juoksu) s sekuntia katse yaw (Unity) glTF-pisteestä; palauttaa loppupaikan ja putosiko (ei lattiaa).</summary>
        static (double X, double Z, bool Putosi) Tatti(double x, double z, double yaw, double s, List<KavelyLeikkaus> pielet)
        {
            var seinat = Seinat(pielet); bool putosi = false;
            var k = new Kavely { KameraYaw = yaw, HahmoYaw = yaw, KameraPitch = 0, Kallistusvyohykkeet = true };
            var syote = new KavelySyote { LiikeY = 1, Juoksu = true };
            for (double t = 0; t < s; t += Dt)
            {
                k.Paivita(Dt, syote);
                x += k.NopeusX * Dt; z -= k.NopeusZ * Dt;   // Unity +z = glTF −z
                Tyonna(ref x, ref z, seinat);
                if (!Lattiaa(x, z, pielet)) putosi = true;
            }
            return (x, z, putosi);
        }

        static (double X, double Z, bool Putosi) Kohti(double x, double z, double kx, double kz, List<KavelyLeikkaus> pielet)
        {
            var seinat = Seinat(pielet); bool putosi = false;
            for (int i = 0; i < 1200; i++)
            {
                double dx = kx - x, dz = kz - z, e = Math.Sqrt(dx * dx + dz * dz); if (e < 0.3) break;
                x += dx / e * Kavely.KavelyMs * Dt; z += dz / e * Kavely.KavelyMs * Dt;
                Tyonna(ref x, ref z, seinat);
                if (!Lattiaa(x, z, pielet)) putosi = true;
            }
            return (x, z, putosi);
        }

        static KavelyMerkki M(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return m; throw new Exception(nimi); }

        /// <summary>Käytävän kehys: t portaalista kohti ovi:vesiportti-loppua, s sivulle.</summary>
        static (double T, double S) Kaytava(double x, double z)
        {
            var a = M("ovi:vesiportti-alku"); var b = M("ovi:vesiportti-loppu");
            double ux = b.X - a.X, uz = b.Z - a.Z, l = Math.Sqrt(ux * ux + uz * uz); ux /= l; uz /= l;
            return ((x - a.X) * ux + (z - a.Z) * uz, -(x - a.X) * uz + (z - a.Z) * ux);
        }

        static double NousuYaw()
        {
            var n = M("nousu:laituri"); var o = M("ovi:vesiportti-alku");
            return Math.Atan2(o.X - n.X, -(o.Z - n.Z)) * 180 / Math.PI;   // DioraamaSovitin.VeneLaituriin, Unityn kehyksessä
        }

        [Testi] static void IlmanPieliaTattiVieKannenKulmaan()
        {
            var n = M("nousu:laituri");
            var (x, z, _) = Tatti(n.X, n.Z, NousuYaw(), 5, new List<KavelyLeikkaus>());
            var (t, s) = Kaytava(x, z);
            Oleta.Tosi(Math.Abs(s) > 2, $"laituri-a1: ilman pieliä kannen kulmaan (t {t:F2}, s {s:F2}, glTF {x:F2} / {z:F2})");
        }

        [Testi] static void PieletOhjaavatSillalle()
        {
            var p = KavelyPielet.Laske(Huonesimulaatio.Data);
            Oleta.Sama(4, p.Count, "kolme pieltä ja kynnys");
            var n = M("nousu:laituri");
            double y0 = NousuYaw();
            Oleta.Tosi(Math.Abs(y0 - 44) < 1, $"nousun katse {y0:F1}");
            // Laitetestaajan suunta ja ±20°: aina sillalle, käytävän keskelle, eikä putoamista.
            for (double yaw = y0 - 4; yaw <= y0 + 36; yaw += 4)
            {
                var (x, z, putosi) = Tatti(n.X, n.Z, yaw, 6, p);
                var (t, s) = Kaytava(x, z);
                Oleta.Tosi(t > 5 && Math.Abs(s) < 1.2, $"yaw {yaw:F0}: sillalla (t {t:F2}, s {s:F2})");
                Oleta.Tosi(!putosi, $"yaw {yaw:F0}: ei putoa");
            }
        }

        [Testi] static void KansiJaaVapaaksi()
        {
            // Piilo ja portinvartijan partio kannen eteläpäässä: pielet eivät katkaise kulkua.
            var p = KavelyPielet.Laske(Huonesimulaatio.Data);
            foreach (var (alku, kohde) in new[] { ("nousu:laituri", "piilo:laituri-tynnyrit"), ("nousu:laituri", "partio:portinvartija-1"),
                         ("partio:portinvartija-1", "nousu:laituri"), ("reitti:pelaaja-2", "reitti:pelaaja-4"), ("reitti:pelaaja-4", "piilo:laituri-tynnyrit") })
            {
                var a = M(alku); var k = M(kohde);
                var (x, z, putosi) = Kohti(a.X, a.Z, k.X, k.Z, p);
                Oleta.Tosi(Math.Sqrt((x - k.X) * (x - k.X) + (z - k.Z) * (z - k.Z)) < 0.4, $"{alku} → {kohde}: perillä ({x:F2} / {z:F2})");
                Oleta.Tosi(!putosi, $"{alku} → {kohde}: ei putoa");
            }
        }

        [Testi] static void KynnysPeittaaKolmioaukon()
        {
            var tyhja = new List<KavelyLeikkaus>();
            Oleta.Tosi(!Lattiaa(-58.9, 22.0, tyhja), "kannen ja sillan välissä aukko (glb)");
            Oleta.Tosi(Lattiaa(-58.9, 22.0, KavelyPielet.Laske(Huonesimulaatio.Data)), "kynnys peittää");
        }

        [Testi] static void SiirtynytPortaaliEiSaaPielia()
        {
            var d = KavelyData.Lue("{}", "[{\"nimi\":\"ovi:vesiportti-alku\",\"paikka\":[-50,-5.9,20.9]},{\"nimi\":\"ovi:vesiportti-loppu\",\"paikka\":[-40.851,-5.6,24.015]}]");
            Oleta.Sama(0, KavelyPielet.Laske(d).Count, "LR:n korjattu geometria: ei pieliä väärään paikkaan");
        }
    }
}
