// ELÄVÄ KARTTA: maakuntien väliset rajat ja etäisyydet (Linssiseppä 26.9.2026). Puhdas C#.
//
// SISÄRAJAT: maakuntarajat-kokoelman renkaat on koottu samoista kaarista (pyöristys 1e-3°, Kartta/Maakuntajako), joten
// kahden maakunnan yhteinen raja on kummankin renkaassa samoin pistein. Jana, jonka omistaa kaksi ERI maakuntaa, on
// sisäraja (kynä piirtää sen); yhden maakunnan jana on rannikko tai valtakunnan raja (pohjakartta piirtää ne). Sisärajan
// janat ketjutetaan solmusta solmuun: ketju katkeaa risteyksessä (aste ≠ 2), joten jokainen maakuntapari saa omat
// viivansa, ja ne piirretään yksi kerrallaan etäisyysjärjestyksessä saapumiskaupungista.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Elava
{
    public static class Maakuntarajat
    {
        const double Tarkkuus = 1000;   // 1e-3° (aineiston pyöristys)

        static (long, long) Avain(LatLon p) => ((long)Math.Round(p.Lon * Tarkkuus), (long)Math.Round(p.Lat * Tarkkuus));

        static ((long, long), (long, long)) Jana((long, long) a, (long, long) b) =>
            a.CompareTo(b) <= 0 ? (a, b) : (b, a);

        /// <summary>Maakuntien väliset rajat ketjuina (kukin vähintään kaksi pistettä).</summary>
        public static List<LatLon[]> Sisarajat(IReadOnlyList<ElavaMaakunta> maakunnat)
        {
            var omistajat = new Dictionary<((long, long), (long, long)), (int A, int B)>();
            var pisteet = new Dictionary<(long, long), LatLon>();
            for (int m = 0; m < maakunnat.Count; m++)
                foreach (var r in maakunnat[m].Renkaat)
                    for (int i = 0; i < r.Length; i++)
                    {
                        var a = Avain(r[i]);
                        var b = Avain(r[(i + 1) % r.Length]);
                        if (a.Equals(b)) continue;
                        pisteet[a] = r[i];
                        var k = Jana(a, b);
                        if (!omistajat.TryGetValue(k, out var o)) omistajat[k] = (m, -1);
                        else if (o.A != m && o.B < 0) omistajat[k] = (o.A, m);
                    }

            // Sisärajan verkko: solmu → naapurit.
            var naapurit = new Dictionary<(long, long), List<(long, long)>>();
            foreach (var kv in omistajat)
            {
                if (kv.Value.B < 0) continue;
                var (a, b) = kv.Key;
                if (!naapurit.TryGetValue(a, out var la)) naapurit[a] = la = new List<(long, long)>();
                if (!naapurit.TryGetValue(b, out var lb)) naapurit[b] = lb = new List<(long, long)>();
                la.Add(b);
                lb.Add(a);
            }

            var kayty = new HashSet<((long, long), (long, long))>();
            var tulos = new List<LatLon[]>();
            List<LatLon> Kulje((long, long) alku, (long, long) seuraava)
            {
                var ketju = new List<LatLon> { pisteet[alku] };
                var edellinen = alku;
                var nyt = seuraava;
                kayty.Add(Jana(alku, seuraava));
                while (true)
                {
                    ketju.Add(pisteet[nyt]);
                    var l = naapurit[nyt];
                    if (l.Count != 2) break;
                    var jatko = l[0].Equals(edellinen) ? l[1] : l[0];
                    var j = Jana(nyt, jatko);
                    if (kayty.Contains(j)) break;
                    kayty.Add(j);
                    edellinen = nyt;
                    nyt = jatko;
                }
                return ketju;
            }

            // Ensin ketjut risteyksistä ja päistä, sitten jäljelle jääneet renkaat (esim. saaren ympäri kulkeva raja).
            var solmut = new List<(long, long)>(naapurit.Keys);
            solmut.Sort();
            foreach (var s in solmut)
            {
                if (naapurit[s].Count == 2) continue;
                foreach (var n in naapurit[s])
                    if (!kayty.Contains(Jana(s, n))) tulos.Add(Kulje(s, n).ToArray());
            }
            foreach (var s in solmut)
                foreach (var n in naapurit[s])
                    if (!kayty.Contains(Jana(s, n))) tulos.Add(Kulje(s, n).ToArray());
            return tulos;
        }

        /// <summary>Parillisuussääntö (lon, lat)-tasossa.</summary>
        public static bool Sisalla(LatLon p, LatLon[] rengas)
        {
            bool c = false;
            for (int i = 0, j = rengas.Length - 1; i < rengas.Length; j = i++)
            {
                double xi = rengas[i].Lon, yi = rengas[i].Lat, xj = rengas[j].Lon, yj = rengas[j].Lat;
                if (((yi > p.Lat) != (yj > p.Lat)) && (p.Lon < (xj - xi) * (p.Lat - yi) / (yj - yi) + xi)) c = !c;
            }
            return c;
        }

        public static bool Sisalla(LatLon p, ElavaMaakunta m)
        {
            bool c = false;
            foreach (var r in m.Renkaat) if (Sisalla(p, r)) c = !c;
            return c;
        }

        /// <summary>Maakunnan etäisyys pisteestä asteina: 0 sisällä, muuten lähin kärki.</summary>
        public static double Etaisyys(LatLon p, ElavaMaakunta m)
        {
            if (Sisalla(p, m)) return 0;
            double min = double.MaxValue;
            foreach (var r in m.Renkaat)
                foreach (var q in r)
                    min = Math.Min(min, Kameramatikka.KulmaAsteina(p, q));
            return min;
        }

        /// <summary>Viivan lähin piste (asteina) ja käännös niin, että viiva alkaa keskusta lähempää päätä.</summary>
        public static (LatLon[] Pisteet, double Etaisyys) Keskuksesta(LatLon keskus, LatLon[] viiva)
        {
            double min = double.MaxValue;
            foreach (var q in viiva) min = Math.Min(min, Kameramatikka.KulmaAsteina(keskus, q));
            if (viiva.Length < 2) return (viiva, min);
            bool kaanna = Kameramatikka.KulmaAsteina(keskus, viiva[viiva.Length - 1]) < Kameramatikka.KulmaAsteina(keskus, viiva[0]);
            if (!kaanna) return (viiva, min);
            var k = (LatLon[])viiva.Clone();
            Array.Reverse(k);
            return (k, min);
        }

        /// <summary>Renkaan painopiste (lon, lat)-tasossa (pinta-alapainotettu; rappeutuneelle kärkien keskiarvo).</summary>
        public static LatLon Painopiste(LatLon[] r)
        {
            double a = 0, cx = 0, cy = 0;
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++)
            {
                double f = r[j].Lon * r[i].Lat - r[i].Lon * r[j].Lat;
                a += f;
                cx += (r[j].Lon + r[i].Lon) * f;
                cy += (r[j].Lat + r[i].Lat) * f;
            }
            if (Math.Abs(a) < 1e-12)
            {
                double sx = 0, sy = 0;
                foreach (var p in r) { sx += p.Lon; sy += p.Lat; }
                return new LatLon(sy / Math.Max(1, r.Length), sx / Math.Max(1, r.Length));
            }
            return new LatLon(cy / (3 * a), cx / (3 * a));
        }
    }
}
