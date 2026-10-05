// ISS:N KOHDEVALIKON RAJAUS (Päätoimittaja 4.10.2026 klo 21: enintään 30 kohdetta lähimpänä aluksen nykyistä maajälkeä, ei koko
// aakkoslistaa; astronauttikohteita on pian lähes 100 Euroopassa). Sama sääntö webissä (Pelikoodari): isoympyräetäisyys aluksen
// alapisteestä avaushetkellä, 30 lähintä etäisyysjärjestyksessä (tasapelissä nimi), Oma sijainti ei kuulu rajaan (valikko lisää sen
// kärkeen). Puhdas funktio, testit Linssit-testit/KohdeRajausTestit.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Iss
{
    public static class KohdeRajaus
    {
        /// <summary>Valikon enimmäiskoko (ilman Oma sijainti -riviä).</summary>
        public const int Enintaan = 30;
        const double MaanSadeKm = 6371.0;

        /// <summary>Isoympyräetäisyys km (haversine).</summary>
        public static double EtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            const double r = Math.PI / 180;
            double dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) + Math.Cos(lat1 * r) * Math.Cos(lat2 * r) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2 * MaanSadeKm * Math.Asin(Math.Min(1, Math.Sqrt(a)));
        }

        /// <summary>Enintään <paramref name="max"/> lähintä kohdetta pisteestä (lat0, lon0) etäisyysjärjestyksessä, tasapelissä nimen mukaan.</summary>
        public static List<T> Lahimmat<T>(IEnumerable<T> kohteet, Func<T, double> lat, Func<T, double> lon, Func<T, string> nimi,
            double lat0, double lon0, int max = Enintaan)
        {
            var l = new List<(T K, double D, string N)>();
            if (kohteet != null)
                foreach (var k in kohteet) l.Add((k, EtaisyysKm(lat0, lon0, lat(k), lon(k)), nimi(k) ?? ""));
            var fi = CultureInfo.GetCultureInfo("fi-FI").CompareInfo;
            l.Sort((a, b) => a.D != b.D ? a.D.CompareTo(b.D) : fi.Compare(a.N, b.N));
            var tulos = new List<T>(Math.Min(max, l.Count));
            for (int i = 0; i < l.Count && i < max; i++) tulos.Add(l[i].K);
            return tulos;
        }
    }
}
