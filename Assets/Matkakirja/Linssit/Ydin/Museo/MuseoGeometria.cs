// TAIDEMUSEO: GEOMETRIA DATASTA (Linssiseppä 10.10.2026). Väliaikainen halli sali.json:n osista (Linnanrakentajan Blender-
// geometria korvaa sen myöhemmin samoilla mitoilla) ja kehykset pursotettuina kehysprofiilista teoksen todellisiin mittoihin.
//  - Seinät: osan laatikon neljä seinää, aukot reikinä (yläpuolelle palkki), seinän nauhat korkeuden mukaan (sokkeli tumma,
//    paneeli paneelimateriaalista, seinä damasti/harmaa, ylälista vaalea). Väri kärkiväreinä (yksi materiaali koko hallille).
//  - Aukon pielet: aukon ensimmäinen osa piirtää pielet ja kynnyksen seinien välisen raon yli.
//  - Kehys: profiilin pisteet (cm, x ulospäin teoksen reunasta, y seinästä ulos) kiertävät suorakaiteen jiirikulmin;
//    jokainen profiilin väli on oma tasainen pinta (terävät kulmat aaltolistassa).
// Kolmioiden kiertosuunnalla ei ole väliä: museon varjostin piirtää molemmat puolet ja kääntää normaalin katsojaan päin.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Museo
{
    public sealed class Verkko
    {
        public readonly List<V3> P = new List<V3>(), N = new List<V3>();
        public readonly List<(double R, double G, double B)> C = new List<(double, double, double)>();
        public readonly List<(double U, double V)> UV = new List<(double, double)>();
        public readonly List<int> T = new List<int>();

        /// <summary>Nelikulmio a-b-c-d (kehän järjestyksessä), yksi normaali ja väri.</summary>
        public void Nelio(V3 a, V3 b, V3 c, V3 d, V3 n, (double, double, double) vari)
        {
            int i = P.Count;
            P.Add(a); P.Add(b); P.Add(c); P.Add(d);
            for (int k = 0; k < 4; k++) { N.Add(n); C.Add(vari); }
            UV.Add((0, 0)); UV.Add((1, 0)); UV.Add((1, 1)); UV.Add((0, 1));
            T.Add(i); T.Add(i + 1); T.Add(i + 2); T.Add(i); T.Add(i + 2); T.Add(i + 3);
        }

        public double Pinta()
        {
            double s = 0;
            for (int i = 0; i < T.Count; i += 3)
            {
                V3 a = P[T[i]], b = P[T[i + 1]], c = P[T[i + 2]];
                s += Ristitulo(b - a, c - a).Pituus / 2;
            }
            return s;
        }

        static V3 Ristitulo(V3 a, V3 b) => new V3(a.Y * b.Z - a.Z * b.Y, a.Z * b.X - a.X * b.Z, a.X * b.Y - a.Y * b.X);
    }

    public static class MuseoGeometria
    {
        public static readonly (double, double, double) Sokkelivari = (0.10, 0.09, 0.085), Kattovari = (0.80, 0.78, 0.74);
        static readonly Dictionary<string, (double, double, double)> Lattiat = new Dictionary<string, (double, double, double)>(StringComparer.Ordinal)
        {
            ["parketti_tammi"] = (0.42, 0.29, 0.18), ["parketti_kalanruoto"] = (0.40, 0.27, 0.16), ["kivi_terrazzo"] = (0.70, 0.67, 0.61),
        };

        public static (double, double, double) Lattiavari(string lattia) => lattia != null && Lattiat.TryGetValue(lattia, out var v) ? v : (0.45, 0.33, 0.22);

        public static (double, double, double) Vari(Sali s, string nimi, (double, double, double) oletus) =>
            nimi != null && s.Varit.TryGetValue(nimi, out var v) ? v : oletus;

        /// <summary>Seinän tunnus ("+x", "-x", "+z", "-z") → (vakiokoordinaatti, akseli X?, sisänormaali).</summary>
        static (double Taso, bool XSeina, V3 Normaali) SeinanTaso(Osa o, string seina) => seina switch
        {
            "-x" => (o.X0, true, new V3(1, 0, 0)),
            "+x" => (o.X1, true, new V3(-1, 0, 0)),
            "-z" => (o.Z0, false, new V3(0, 0, 1)),
            _ => (o.Z1, false, new V3(0, 0, -1)),
        };

        static string Vastakkainen(string seina) => seina switch { "-x" => "+x", "+x" => "-x", "-z" => "+z", _ => "-z" };

        /// <summary>Aukot, jotka leikkaavat osan seinän (aukon ensimmäiselle osalle annettu seinä, toiselle vastakkainen).</summary>
        public static List<(Aukko A, bool Ensimmainen)> SeinanAukot(Sali s, Osa o, string seina)
        {
            var l = new List<(Aukko, bool)>();
            foreach (var a in s.Aukot)
            {
                if (a.Osat.Length == 0) continue;
                if (a.Osat[0] == o.Id && a.Seina == seina) l.Add((a, true));
                else if (a.Osat.Length > 1 && a.Osat[1] == o.Id && Vastakkainen(a.Seina) == seina) l.Add((a, false));
            }
            return l;
        }

        /// <summary>Koko väliaikaishalli: lattiat, katot, seinät aukkoineen ja pielet.</summary>
        public static Verkko Halli(Sali s)
        {
            var v = new Verkko();
            foreach (var o in s.Osat) Osa(s, o, v);
            return v;
        }

        static void Osa(Sali s, Osa o, Verkko v)
        {
            var lattia = Lattiavari(o.Lattia);
            v.Nelio(new V3(o.X0, o.Y0, o.Z0), new V3(o.X1, o.Y0, o.Z0), new V3(o.X1, o.Y0, o.Z1), new V3(o.X0, o.Y0, o.Z1), new V3(0, 1, 0), lattia);
            v.Nelio(new V3(o.X0, o.Y1, o.Z0), new V3(o.X1, o.Y1, o.Z0), new V3(o.X1, o.Y1, o.Z1), new V3(o.X0, o.Y1, o.Z1), new V3(0, -1, 0), Kattovari);
            var seinavari = Vari(s, o.SeinaMateriaali, (0.3, 0.3, 0.3));
            var paneelivari = Vari(s, o.PaneeliMateriaali, seinavari);
            var listavari = Vari(s, "paneeli_kerma", (0.85, 0.82, 0.75));
            // Nauhat alhaalta ylös: sokkeli, paneeli (jos), seinä, ylälista.
            var nauhat = new List<(double Y0, double Y1, (double, double, double) Vari)>();
            double y = o.Y0;
            if (o.Sokkeli > 0) { nauhat.Add((y, y + o.Sokkeli, Sokkelivari)); y += o.Sokkeli; }
            if (o.Paneeli > y) { nauhat.Add((y, o.Paneeli, paneelivari)); y = o.Paneeli; }
            double ylalista = o.Lista > 0 ? Math.Max(y, o.Y1 - o.Lista) : o.Y1;
            nauhat.Add((y, ylalista, seinavari));
            if (ylalista < o.Y1) nauhat.Add((ylalista, o.Y1, listavari));

            foreach (var seina in new[] { "-x", "+x", "-z", "+z" })
            {
                var (taso, xSeina, n) = SeinanTaso(o, seina);
                double u0 = xSeina ? o.Z0 : o.X0, u1 = xSeina ? o.Z1 : o.X1;
                var reiat = new List<(double U0, double U1, double Y1)>();
                foreach (var (a, ensimmainen) in SeinanAukot(s, o, seina))
                {
                    reiat.Add((a.Keskipiste - a.Leveys / 2, a.Keskipiste + a.Leveys / 2, o.Y0 + a.Korkeus));
                    if (ensimmainen) Pielet(s, o, a, taso, xSeina, n, v);
                }
                foreach (var (ru0, ru1, ry0, ry1) in Suorakaiteet(u0, u1, o.Y0, o.Y1, reiat))
                    foreach (var (ny0, ny1, vari) in nauhat)
                    {
                        double a0 = Math.Max(ry0, ny0), a1 = Math.Min(ry1, ny1);
                        if (a1 - a0 < 1e-6) continue;
                        V3 P(double u, double yy) => xSeina ? new V3(taso, yy, u) : new V3(u, yy, taso);
                        v.Nelio(P(ru0, a0), P(ru1, a0), P(ru1, a1), P(ru0, a1), n, vari);
                    }
            }
        }

        /// <summary>Seinän suorakaide [u0,u1] × [y0,y1] miinus reiät (u-väli, korkeus lattiasta): pystykaistat + reikien yläpalkit.</summary>
        public static List<(double U0, double U1, double Y0, double Y1)> Suorakaiteet(double u0, double u1, double y0, double y1, List<(double U0, double U1, double Y1)> reiat)
        {
            var r = new List<(double, double, double, double)>();
            reiat.Sort((a, b) => a.U0.CompareTo(b.U0));
            double u = u0;
            foreach (var (h0, h1, hy) in reiat)
            {
                double a = Math.Max(u0, h0), b = Math.Min(u1, h1);
                if (b <= a) continue;
                if (a > u) r.Add((u, a, y0, y1));
                if (hy < y1) r.Add((a, b, Math.Max(y0, hy), y1));
                u = Math.Max(u, b);
            }
            if (u < u1) r.Add((u, u1, y0, y1));
            return r;
        }

        /// <summary>Aukon pielet ja kynnys seinien raon yli (ensimmäisen osan seinästä toisen osan seinään).</summary>
        static void Pielet(Sali s, Osa o, Aukko a, double taso, bool xSeina, V3 n, Verkko v)
        {
            var toinen = a.Osat.Length > 1 ? s.HaeOsa(a.Osat[1]) : null;
            double syvyys = a.Syvyys;
            if (toinen != null)
            {
                var (t2, _, _) = SeinanTaso(toinen, Vastakkainen(a.Seina));
                syvyys = Math.Abs(t2 - taso);
            }
            if (syvyys < 1e-3) return;
            double ulos = -1;   // pielet seinän taakse (sisänormaalia vastaan)
            double c0 = a.Keskipiste - a.Leveys / 2, c1 = a.Keskipiste + a.Leveys / 2, yk = o.Y0 + a.Korkeus;
            V3 P(double u, double yy, double d) { double t = taso + ulos * d * (xSeina ? n.X : n.Z); return xSeina ? new V3(t, yy, u) : new V3(u, yy, t); }
            var pielivari = Vari(s, "paneeli_kerma", (0.85, 0.82, 0.75));
            V3 sivu = xSeina ? new V3(0, 0, 1) : new V3(1, 0, 0);
            v.Nelio(P(c0, o.Y0, 0), P(c0, o.Y0, syvyys), P(c0, yk, syvyys), P(c0, yk, 0), sivu, pielivari);
            v.Nelio(P(c1, o.Y0, 0), P(c1, o.Y0, syvyys), P(c1, yk, syvyys), P(c1, yk, 0), sivu * -1, pielivari);
            v.Nelio(P(c0, yk, 0), P(c1, yk, 0), P(c1, yk, syvyys), P(c0, yk, syvyys), new V3(0, -1, 0), pielivari);
            v.Nelio(P(c0, o.Y0, 0), P(c1, o.Y0, 0), P(c1, o.Y0, syvyys), P(c0, o.Y0, syvyys), new V3(0, 1, 0), Lattiavari(o.Lattia));
        }

        /// <summary>Kehys teoksen ympärille paikallisissa koordinaateissa: teos origossa tasossa z = 0 (X oikealle, Y ylös,
        /// +Z seinästä ulos), w × h metreinä (teoksen näkyvä ala). Profiilin x kasvaa ulospäin, y seinästä ulos (cm).</summary>
        public static Verkko Kehys(Kehysprofiili k, double w, double h, (double, double, double) vari)
        {
            var v = new Verkko();
            var p = k.Pisteet;
            // Neljä sivua: (ulospäin osoittava suunta, kulma a, kulma b) kehän järjestyksessä.
            var sivut = new[] { (new V3(0, -1, 0), -1, -1, 1, -1), (new V3(1, 0, 0), 1, -1, 1, 1), (new V3(0, 1, 0), 1, 1, -1, 1), (new V3(-1, 0, 0), -1, 1, -1, -1) };
            foreach (var (o, ax, ay, bx, by) in sivut)
                for (int i = 0; i + 1 < p.Count; i++)
                {
                    double d0 = p[i].X / 100, z0 = p[i].Y / 100, d1 = p[i + 1].X / 100, z1 = p[i + 1].Y / 100;
                    V3 A(double d, double z) => new V3(ax * (w / 2 + d), ay * (h / 2 + d), z);
                    V3 B(double d, double z) => new V3(bx * (w / 2 + d), by * (h / 2 + d), z);
                    double dx = d1 - d0, dz = z1 - z0, l = Math.Sqrt(dx * dx + dz * dz);
                    if (l < 1e-9) continue;
                    // Profiilin normaali (dz, −dx): ulkoreunan pystyosa osoittaa ulos, sisäreuna teokseen päin, tasaiset seinästä ulos.
                    var n = o * (dz / l) + new V3(0, 0, -dx / l);
                    v.Nelio(A(d0, z0), B(d0, z0), B(d1, z1), A(d1, z1), n, vari);
                }
            return v;
        }
    }
}
