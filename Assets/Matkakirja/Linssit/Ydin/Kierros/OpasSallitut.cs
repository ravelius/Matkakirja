// SALLITUT KAUPUNGIT (omistaja 7.10.2026 klo 00.4x Päätoimittajan kautta: "3D-näkymään ja oppaaseen vain kaupungit, joissa on oikea
// 3D"; LS2:n SALLITTU-lista, Pelikoodari tarjoilee sen Pöllön /opas/aineistot-vastauksessa kentässä "sallitut"). Natiivi:
// kaupunkiehdotukset ja lentokohteet vain listalta, vapaa liike pehmeästi kaupungin hyvän 3D:n säteelle, Kysy ei lennä ulos.
// Lista tulee palvelimelta (ei kovakoodattu); tyhjä tai puuttuva lista = ei rajausta (vanha käytös, ettei opas pysähdy).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasSallitut
    {
        public sealed class Kaupunki
        {
            public string Id, Nimi;
            public double Lat, Lon, RM;
            /// <summary>LS2:n RAJA-kaupunki (3D riittävä mutta ei paras; "raja": true).</summary>
            public bool Raja;
            public override string ToString() => $"{Nimi} ({Lat:F3}, {Lon:F3}, r {RM:F0} m)";
        }

        /// <summary>Pehmeän pysäytyksen vyöhyke reunan sisäpuolella (m): vapaa liike hidastuu tällä matkalla nollaan.</summary>
        public const double PehmeysM = 400;

        /// <summary>/opas/aineistot "sallitut": [{id, nimi, lat, lon, r_m}]; puutteelliset (ei nimeä, väärä paikka, r ≤ 0) pois.</summary>
        public static List<Kaupunki> Lue(object j)
        {
            var l = new List<Kaupunki>();
            if (!(j is IDictionary<string, object> d) || !d.TryGetValue("sallitut", out var v) || !(v is IList<object> vl)) return l;
            foreach (var o in vl)
            {
                if (!(o is IDictionary<string, object> k)) continue;
                string S(string a) => k.TryGetValue(a, out var x) ? x as string : null;
                double D(string a) => k.TryGetValue(a, out var x) && x is double dd ? dd : double.NaN;
                var kk = new Kaupunki { Id = S("id"), Nimi = S("nimi"), Lat = D("lat"), Lon = D("lon"), RM = D("r_m"),
                    Raja = k.TryGetValue("raja", out var rj) && rj is bool rb && rb };
                if (string.IsNullOrEmpty(kk.Nimi) || double.IsNaN(kk.Lat) || double.IsNaN(kk.Lon) || Math.Abs(kk.Lat) > 90
                    || Math.Abs(kk.Lon) > 180 || !(kk.RM > 0)) continue;
                if (string.IsNullOrEmpty(kk.Id)) kk.Id = KaupunkiTiet.Tunnus(kk.Nimi);
                l.Add(kk);
            }
            return l;
        }

        /// <summary>Kaupunki, jonka säteen sisällä piste on (lähin keskipiste), tai null.</summary>
        public static Kaupunki Sisalla(IReadOnlyList<Kaupunki> l, double lat, double lon)
        {
            Kaupunki paras = null; double pd = double.MaxValue;
            if (l == null) return null;
            foreach (var k in l)
            {
                double d = KierrosLento.EtaisyysM(lat, lon, k.Lat, k.Lon);
                if (d <= k.RM && d < pd) { pd = d; paras = k; }
            }
            return paras;
        }

        /// <summary>Saako pisteeseen lentää: lista tyhjä (ei rajausta) tai piste jonkin sallitun kaupungin säteellä.</summary>
        public static bool Sallittu(IReadOnlyList<Kaupunki> l, double lat, double lon) => l == null || l.Count == 0 || Sisalla(l, lat, lon) != null;

        /// <summary>Kaupunki nimellä tai tunnuksella (aloitusvalikon valinta); null jos ei listalla.</summary>
        public static Kaupunki Nimella(IReadOnlyList<Kaupunki> l, string nimi)
        {
            if (l == null || string.IsNullOrWhiteSpace(nimi)) return null;
            string t = KaupunkiTiet.Tunnus(nimi.Trim());
            foreach (var k in l) if (k.Id == t || string.Equals(k.Nimi, nimi.Trim(), StringComparison.OrdinalIgnoreCase)) return k;
            return null;
        }

        /// <summary>
        /// Vapaan liikkeen rajaus kaupungin säteelle: siirto (dLat, dLon) pisteestä (lat, lon) skaalataan niin, että ulospäin
        /// suuntautuva liike hidastuu pehmeästi PehmeysM:n vyöhykkeellä ja pysähtyy reunalle (smoothstep, ei hyppyä); sisäänpäin ja
        /// reunan suuntaisesti liike on vapaa. Reunan ulkopuolelta (esim. vanha asento) palataan reunalle päin.
        /// </summary>
        public static (double dLat, double dLon) Rajaa(Kaupunki k, double lat, double lon, double dLat, double dLon)
        {
            if (k == null) return (dLat, dLon);
            const double R = 6371008.8, A = Math.PI / 180;
            double c = Math.Cos(lat * A);
            // Paikallinen tasokuvaus metreinä kaupungin keskeltä.
            double x = (lon - k.Lon) * A * R * c, y = (lat - k.Lat) * A * R;
            double dx = dLon * A * R * c, dy = dLat * A * R;
            double r = Math.Sqrt(x * x + y * y);
            if (r < 1e-6) return (dLat, dLon);
            double ux = x / r, uy = y / r, ulos = dx * ux + dy * uy;   // ulospäin suuntautuva komponentti
            if (ulos <= 0) return (dLat, dLon);
            double vara = k.RM - r;   // matka reunaan
            double kerroin = vara <= 0 ? 0 : vara >= PehmeysM ? 1 : Smoothstep(vara / PehmeysM);
            double uusiUlos = Math.Min(ulos * kerroin, Math.Max(0, vara));
            dx += (uusiUlos - ulos) * ux; dy += (uusiUlos - ulos) * uy;
            return (dy / (A * R), c > 1e-9 ? dx / (A * R * c) : 0);
        }

        static double Smoothstep(double t) { t = Math.Max(0, Math.Min(1, t)); return t * t * (3 - 2 * t); }
    }
}
