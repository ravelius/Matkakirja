// KAUPUNGIN KADUT YÖVALOILLE (Päätoimittaja 6.10. 22.3x, yövalot v4: "katuvalot yhtenäisinä nauhoina katujen mukaan, ei satunnaisina
// pisteinä"): OSM-kadut Pöllön kautta (/opas/tiet, Pelikoodari; © OpenStreetMap contributors, ODbL) rasteroidaan paikalliseen
// ENU-ruudukkoon (metriä keskipisteestä, x itä, z pohjoinen). Arvo 0–255 = katuvalon voimakkuus tyypin mukaan; leveys tyypin mukaan,
// reuna pehmeä. Varjostin lukee maskin vaakapinnoilla (KaupunkiYovalot.shader): valonauha ja lamput nauhan keskellä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class KaupunkiTiet
    {
        public struct Tie { public string Tyyppi; public List<(double lat, double lon)> Pisteet; }

        /// <summary>Esilasketut kadut (Pelikoodari 6.10. 22.4x: Overpass ruuhkautuu, joten ei ajonaikaista hakua): ämpärin
        /// kartta/tiet-v1/{id}.json = {"keskus":[lat,lon],"r":4000,"tiet":[…]}. Valmiit id:t Pöllöstä (GET /opas/aineistot →
        /// {"tiet":[…],"aanikartta":[…]}, lyhyt välimuisti; ämpärin objektit ovat muuttumattomia, joten luettelo ei voi olla siellä);
        /// muita ei pyydetä, koska CDN välimuistittaa 404:n.</summary>
        public const string Media = "https://media.matkakirja.app/";
        public const string Juuri = Media + "kartta/tiet-v1/";

        /// <summary>Pöllön /opas/aineistot "tiet_polut" (Pelikoodari 6.10. 23.5x: Pariisi, Lontoo ja Rooma uudelleen r 6000:lla
        /// kansioon tiet-v2, koska v1-objektit ovat muuttumattomia): id → ämpärin suhteellinen polku; puuttuessa tyhjä.</summary>
        public static Dictionary<string, string> LuePolut(object j)
        {
            var p = new Dictionary<string, string>();
            if (j is IDictionary<string, object> d && d.TryGetValue("tiet_polut", out var v) && v is IDictionary<string, object> vd)
                foreach (var kv in vd) if (kv.Value is string s && s.EndsWith(".json") && !s.StartsWith("/") && !s.Contains("..")) p[kv.Key] = s;
            return p;
        }

        /// <summary>Kaupungin katutiedoston ämpäripolku: tiet_polut[id], muuten kartta/tiet-v1/{id}.json. Sama polku on
        /// laitteen välimuistin avain, joten v1-kopio ei peitä v2:ta.</summary>
        public static string Polku(string id, IReadOnlyDictionary<string, string> polut) =>
            polut != null && polut.TryGetValue(id, out var p) ? p : "kartta/tiet-v1/" + id + ".json";

        /// <summary>Kaupungin tunnus nimestä (Kööpenhamina → koopenhamina), sama kaava kuin Siirtosepän äänimaisemassa
        /// (KaupunkiAanimaisemaSoitin.Tunnus): pienet kirjaimet, ä/å/á/à → a, ö/ø/ó → o, é/è → e, välit ja viivat → -.</summary>
        public static string Tunnus(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return null;
            var sb = new System.Text.StringBuilder();
            foreach (char c0 in nimi.ToLowerInvariant())
            {
                char c = c0 == 'ä' || c0 == 'å' || c0 == 'á' || c0 == 'à' ? 'a' : c0 == 'ö' || c0 == 'ø' || c0 == 'ó' ? 'o' : c0 == 'é' || c0 == 'è' ? 'e' : c0;
                if (char.IsLetterOrDigit(c)) sb.Append(c); else if (c == ' ' || c == '-') sb.Append('-');
            }
            return sb.ToString();
        }

        /// <summary>Pöllön /opas/aineistot: avaimen (esim. "tiet") lista id:istä; puuttuessa tyhjä.</summary>
        public static HashSet<string> LueIndeksi(object j, string avain = "tiet")
        {
            var l = new HashSet<string>();
            if (j is IDictionary<string, object> d && d.TryGetValue(avain, out var v) && v is IList<object> vl)
                foreach (var o in vl) if (o is string s) l.Add(s);
            return l;
        }

        /// <summary>Tiedoston keskipiste ja säde (m); puuttuessa null.</summary>
        public static (double lat, double lon, double r)? Alue(IDictionary<string, object> j)
        {
            if (j == null || !j.TryGetValue("keskus", out var k) || !(k is IList<object> kl) || kl.Count < 2) return null;
            double r = j.TryGetValue("r", out var rv) ? Convert.ToDouble(rv) : 4000;
            return (Convert.ToDouble(kl[0]), Convert.ToDouble(kl[1]), r);
        }

        /// <summary>Kadun leveys (m) ja valon voimakkuus (0–1) OSM:n highway-tyypistä; null = ei katuvaloa (moottoritiet maalla, polut).</summary>
        public static (double leveysM, double voima)? Valo(string tyyppi)
        {
            switch (tyyppi)
            {
                case "motorway": case "trunk": return (18, 0.75);
                case "primary": return (16, 1.0);
                case "secondary": return (13, 0.95);
                case "tertiary": return (11, 0.85);
                case "unclassified": case "residential": case "living_street": return (8, 0.7);
                case "pedestrian": return (9, 0.6);
                case "service": return (5, 0.4);
                default: return null;
            }
        }

        /// <summary>Workerin JSON: {"tiet":[{"t":"primary","p":[[lat,lon],…]},…]}. Puutteelliset rivit ohitetaan.</summary>
        public static List<Tie> Lue(IDictionary<string, object> j)
        {
            var l = new List<Tie>();
            if (j == null || !j.TryGetValue("tiet", out var t) || !(t is IList<object> tiet)) return l;
            foreach (var o in tiet)
            {
                if (!(o is IDictionary<string, object> d) || !(d.TryGetValue("p", out var p) && p is IList<object> pl) || pl.Count < 2) continue;
                var pis = new List<(double, double)>(pl.Count);
                foreach (var q in pl)
                    if (q is IList<object> xy && xy.Count >= 2) pis.Add((Convert.ToDouble(xy[0]), Convert.ToDouble(xy[1])));
                if (pis.Count >= 2) l.Add(new Tie { Tyyppi = d.TryGetValue("t", out var ty) ? ty as string : null, Pisteet = pis });
            }
            return l;
        }

        /// <summary>
        /// Rasteroi kadut n × n -ruudukkoon, joka kattaa sivuM × sivuM metriä keskipisteen (lat0, lon0) ympärillä. Rivi 0 = eteläreuna,
        /// sarake 0 = länsireuna (kuten tekstuurissa). Päällekkäisistä otetaan suurin.
        /// </summary>
        public static byte[] Rasteroi(List<Tie> tiet, double lat0, double lon0, int n, double sivuM)
        {
            var m = new byte[n * n];
            const double R = 6371000, A = Math.PI / 180;
            double kx = R * Math.Cos(lat0 * A) * A, kz = R * A, px = sivuM / n, puoli = sivuM / 2;
            foreach (var t in tiet)
            {
                var v = Valo(t.Tyyppi);
                if (v == null) continue;
                double r = v.Value.leveysM / 2, reuna = Math.Max(px, 2.0);
                for (int i = 1; i < t.Pisteet.Count; i++)
                {
                    double ax = (t.Pisteet[i - 1].lon - lon0) * kx + puoli, az = (t.Pisteet[i - 1].lat - lat0) * kz + puoli;
                    double bx = (t.Pisteet[i].lon - lon0) * kx + puoli, bz = (t.Pisteet[i].lat - lat0) * kz + puoli;
                    double laaj = r + reuna;
                    int x0 = Math.Max(0, (int)Math.Floor((Math.Min(ax, bx) - laaj) / px)), x1 = Math.Min(n - 1, (int)Math.Ceiling((Math.Max(ax, bx) + laaj) / px));
                    int z0 = Math.Max(0, (int)Math.Floor((Math.Min(az, bz) - laaj) / px)), z1 = Math.Min(n - 1, (int)Math.Ceiling((Math.Max(az, bz) + laaj) / px));
                    if (x0 > x1 || z0 > z1) continue;
                    double dx = bx - ax, dz = bz - az, ll = dx * dx + dz * dz;
                    for (int z = z0; z <= z1; z++)
                        for (int x = x0; x <= x1; x++)
                        {
                            double cx = (x + 0.5) * px, cz = (z + 0.5) * px;
                            double s = ll > 0 ? Math.Max(0, Math.Min(1, ((cx - ax) * dx + (cz - az) * dz) / ll)) : 0;
                            double ex = cx - (ax + s * dx), ez = cz - (az + s * dz), d = Math.Sqrt(ex * ex + ez * ez);
                            double a = Math.Max(0, Math.Min(1, (r + reuna - d) / reuna)) * v.Value.voima;
                            byte b = (byte)Math.Round(a * 255);
                            if (b > m[z * n + x]) m[z * n + x] = b;
                        }
                }
            }
            return m;
        }
    }
}
