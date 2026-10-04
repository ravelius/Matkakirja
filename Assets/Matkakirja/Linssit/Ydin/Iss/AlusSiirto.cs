// ALUS SIIRTYY KOHTEESEEN KATSE SÄILYTTÄEN (omistaja 4.10.2026 klo 11.5x: "kun kohde valitaan listalta, näkymä aluksen korkeus
// suunta ei saisi muuttua vaan pitää sama näkymän suunta kuin mikä oli kun kohdetta klikattiin. eli poista se että näkymä siirtyy
// automaattisesti suoraan alas"; Päätoimittaja: valinta siirtää aluksen pehmeästi alle 2 s). Cupolan alus on todellisen radan
// kierretty kopio: virtuaalinen alapiste = R · todellinen alapiste, jolloin alus jatkaa samaa ratanopeutta ja kaasu toimii.
// Valinta laskee uuden kierron niin, että nykyisellä katseella (kulma alas, suunta maajäljestä) katse osuu kohteeseen ja
// katseen ilmansuunta kohteessa pysyy samana; kierto liukuu vanhasta uuteen (slerp) SiirtoS:ssa. Nollaa = todellinen rata.
// Puhdas C#: Linssit-testit AlusSiirtoTestit.
using System;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Iss
{
    public sealed class AlusSiirto
    {
        /// <summary>Siirron kesto (s, alle 2 s).</summary>
        public const double SiirtoS = 1.5;
        const double Deg = Math.PI / 180;

        // Kierto kvaterniona (w, x, y, z): alku → loppu liukuen ajassa t0 … t0 + kesto.
        double[] alku = { 1, 0, 0, 0 }, loppu = { 1, 0, 0, 0 };
        double t0, kesto;

        /// <summary>Alus on siirretty todelliselta radalta (tai siirtyy).</summary>
        public bool Siirretty { get; private set; }
        public bool Siirtyy(double nyt) => kesto > 0 && nyt < t0 + kesto;

        public void Nollaa() { alku = new double[] { 1, 0, 0, 0 }; loppu = new double[] { 1, 0, 0, 0 }; kesto = 0; Siirretty = false; }

        /// <summary>Todellinen alapiste → aluksen alapiste hetkellä <paramref name="nyt"/> (s).</summary>
        public LatLon Paikka(LatLon todellinen, double nyt)
        {
            if (!Siirretty) return todellinen;
            var q = Kierto(nyt);
            var v = Kierra(q, Vektori(todellinen.Lat, todellinen.Lon));
            return Piste(v);
        }

        /// <summary>
        /// Uusi siirto: todellinen alapiste <paramref name="todellinen"/> suunnalla <paramref name="todellinenSuunta"/> (radan
        /// suunta, ° pohjoisesta) viedään pisteeseen <paramref name="uusi"/> suunnalla <paramref name="uusiSuunta"/>. Liukuu
        /// nykyisestä kierrosta (myös kesken edellistä siirtoa) <paramref name="kestoS"/>:ssa.
        /// </summary>
        public void Aseta(LatLon todellinen, double todellinenSuunta, LatLon uusi, double uusiSuunta, double nyt, double kestoS)
        {
            var nykyinen = Kierto(nyt);
            var m0 = Kehys(todellinen.Lat, todellinen.Lon, todellinenSuunta);
            var m1 = Kehys(uusi.Lat, uusi.Lon, uusiSuunta);
            // R = M1 · M0ᵀ (sarakkeet: alapiste, eteenpäin, vasemmalle).
            var r = new double[3, 3];
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                    r[i, j] = m1[i, 0] * m0[j, 0] + m1[i, 1] * m0[j, 1] + m1[i, 2] * m0[j, 2];
            alku = nykyinen;
            loppu = Kvaternio(r);
            t0 = nyt;
            kesto = Math.Max(0, kestoS);
            Siirretty = true;
        }

        /// <summary>
        /// Aluksen uusi paikka ja radan suunta niin, että katse (<paramref name="kaari"/> = katsepisteen keskuskulma, °;
        /// <paramref name="katseSuunta"/> = katseen suunta radasta oikealle) osuu kohteeseen ja katseen loppusuunta kohteessa on
        /// <paramref name="ilmansuunta"/> (° pohjoisesta, IssKuvakulma.Ikkuna-asennon suuntima).
        /// </summary>
        public static (LatLon Paikka, double Suunta) Kohteeseen(double lat, double lon, double kaari, double katseSuunta,
            double ilmansuunta, double nykyinenSuunta)
        {
            if (kaari < 1e-7) return (new LatLon(lat, lon), nykyinenSuunta);
            IssKuvakulma.Kohde(lat, lon, (ilmansuunta + 180) % 360, kaari, out double plat, out double plon, out _);
            double kohti = IssKuvakulma.Suunta(plat, plon, lat, lon);
            return (new LatLon(plat, plon), ((kohti - katseSuunta) % 360 + 360) % 360);
        }

        double[] Kierto(double nyt)
        {
            if (kesto <= 0 || nyt >= t0 + kesto) return loppu;
            double u = Math.Max(0, (nyt - t0) / kesto);
            return Slerp(alku, loppu, Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea(u));
        }

        static double[] Vektori(double lat, double lon)
        {
            double a = lat * Deg, b = lon * Deg;
            return new[] { Math.Cos(a) * Math.Cos(b), Math.Cos(a) * Math.Sin(b), Math.Sin(a) };
        }

        static LatLon Piste(double[] v) =>
            new LatLon(Math.Asin(Math.Max(-1, Math.Min(1, v[2]))) / Deg, Math.Atan2(v[1], v[0]) / Deg);

        /// <summary>Paikallinen kehys sarakkeina: alapiste p, eteenpäin f (suunnassa), vasemmalle p × f.</summary>
        static double[,] Kehys(double lat, double lon, double suunta)
        {
            double a = lat * Deg, b = lon * Deg, s = suunta * Deg;
            var p = Vektori(lat, lon);
            var ita = new[] { -Math.Sin(b), Math.Cos(b), 0 };
            var poh = new[] { -Math.Sin(a) * Math.Cos(b), -Math.Sin(a) * Math.Sin(b), Math.Cos(a) };
            var f = new double[3];
            for (int i = 0; i < 3; i++) f[i] = Math.Cos(s) * poh[i] + Math.Sin(s) * ita[i];
            var v = new[] { p[1] * f[2] - p[2] * f[1], p[2] * f[0] - p[0] * f[2], p[0] * f[1] - p[1] * f[0] };
            var m = new double[3, 3];
            for (int i = 0; i < 3; i++) { m[i, 0] = p[i]; m[i, 1] = f[i]; m[i, 2] = v[i]; }
            return m;
        }

        static double[] Kvaternio(double[,] m)
        {
            double tr = m[0, 0] + m[1, 1] + m[2, 2], w, x, y, z;
            if (tr > 0)
            {
                double s = Math.Sqrt(tr + 1) * 2;
                w = 0.25 * s; x = (m[2, 1] - m[1, 2]) / s; y = (m[0, 2] - m[2, 0]) / s; z = (m[1, 0] - m[0, 1]) / s;
            }
            else if (m[0, 0] > m[1, 1] && m[0, 0] > m[2, 2])
            {
                double s = Math.Sqrt(1 + m[0, 0] - m[1, 1] - m[2, 2]) * 2;
                w = (m[2, 1] - m[1, 2]) / s; x = 0.25 * s; y = (m[0, 1] + m[1, 0]) / s; z = (m[0, 2] + m[2, 0]) / s;
            }
            else if (m[1, 1] > m[2, 2])
            {
                double s = Math.Sqrt(1 + m[1, 1] - m[0, 0] - m[2, 2]) * 2;
                w = (m[0, 2] - m[2, 0]) / s; x = (m[0, 1] + m[1, 0]) / s; y = 0.25 * s; z = (m[1, 2] + m[2, 1]) / s;
            }
            else
            {
                double s = Math.Sqrt(1 + m[2, 2] - m[0, 0] - m[1, 1]) * 2;
                w = (m[1, 0] - m[0, 1]) / s; x = (m[0, 2] + m[2, 0]) / s; y = (m[1, 2] + m[2, 1]) / s; z = 0.25 * s;
            }
            double n = Math.Sqrt(w * w + x * x + y * y + z * z);
            return new[] { w / n, x / n, y / n, z / n };
        }

        static double[] Slerp(double[] a, double[] b, double t)
        {
            double d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
            var c = (double[])b.Clone();
            if (d < 0) { d = -d; for (int i = 0; i < 4; i++) c[i] = -c[i]; }
            double ka, kb;
            if (d > 0.9995) { ka = 1 - t; kb = t; }
            else { double th = Math.Acos(d), s = Math.Sin(th); ka = Math.Sin((1 - t) * th) / s; kb = Math.Sin(t * th) / s; }
            var q = new double[4];
            for (int i = 0; i < 4; i++) q[i] = ka * a[i] + kb * c[i];
            double n = Math.Sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
            for (int i = 0; i < 4; i++) q[i] /= n;
            return q;
        }

        static double[] Kierra(double[] q, double[] v)
        {
            double w = q[0], x = q[1], y = q[2], z = q[3];
            // v' = v + 2w (u × v) + 2 u × (u × v), u = (x, y, z)
            double cx = y * v[2] - z * v[1], cy = z * v[0] - x * v[2], cz = x * v[1] - y * v[0];
            double ccx = y * cz - z * cy, ccy = z * cx - x * cz, ccz = x * cy - y * cx;
            return new[] { v[0] + 2 * (w * cx + ccx), v[1] + 2 * (w * cy + ccy), v[2] + 2 * (w * cz + ccz) };
        }
    }
}
