// ISS-KAMERA: mitä laukaisu hakee. Kameran näkymä jaetaan ruudukoksi; jokaisen solun kulmista ammutaan säde WGS84-
// ellipsoidiin, ja solun maapikselin koko (m) valitsee Sentinel-2-COG:n tason (10 m lähellä, 20–160 m kaukana). Solun
// kulmien UTM-rajaus kertoo tarvittavat COG-laatat. Tulos: (ruutu, taso, laatta) -joukko ja arvio tavuista ennen hakua.
//
//   1) Naytteet(kamera)           solujen maapisteet ja metriä/pikseli (avaruuteen osuvat solut pois)
//   2) Ruudut(naytteet, indeksi)  S2-ruudut, joiden bbox osuu soluihin, ja kunkin tarkin tarvittu taso
//   3) Laatat(…, otsake)          COG-otsakkeen jälkeen: laattajoukko ja tavumäärä
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    /// <summary>Kamera ECEF-metreinä: paikka, katse, oikea ja ylös (yksikkövektorit), pystykenttä ja kuvan koko pikseleinä.</summary>
    public struct KuvaKamera
    {
        public (double x, double y, double z) Paikka, Katse, Oikea, Ylos;
        public double PystykenttaAst;
        public int Leveys, Korkeus;
    }

    /// <summary>Indeksin S2-ruutu (Karttaseppä: linssit/astronautin-kamera/s2-indeksi/v1/indeksi.json).</summary>
    public sealed class S2Ruutu
    {
        public string Tunnus, Url;
        public double W, S, E, N;
        /// <summary>Ruudun alueen tci_lut (maailman indeksi); null = KuvaData.Lut.</summary>
        public byte[] Lut;
        /// <summary>Usvatasoitus (Uudelleenprojisointi.TasaaUsva): TCI-arvosta vähennettävä usva kanavittain ennen lutia.</summary>
        public double UsvaR, UsvaG, UsvaB;
        /// <summary>Valinnan nodata-osuus (%, indeksistä): > 0,5 → ruutu ei voi yksin kattaa lehteä (rataleveyden reuna).</summary>
        public double Nodata;
        /// <summary>SCL-COG (luokitus, 20 m) pilvimaskiin; null = ei maskia.</summary>
        public string Scl;
        /// <summary>Valinnan järjestys indeksissä (0 = paras, 1–2 varakuvat); varakuvan tunnus on "&lt;MGRS&gt;#k".</summary>
        public int Valinta;
        public int Vyohyke => Utm.Vyohyke(Tunnus);
        /// <summary>MGRS-tunnus ilman varakuvan päätettä.</summary>
        public string Mgrs => Tunnus.Split('#')[0];
    }

    public struct Nayte
    {
        public int Sx, Sy;                      // solu
        public double Lat, Lon, MetriaPikseli;  // solun keskipiste ja tarvittu resoluutio
        public double LatMin, LatMax, LonMin, LonMax;
    }

    public static class Kuvasuunnitelma
    {
        const double A = 6378137.0, B = 6356752.314245;

        /// <summary>Säde (o + t·d) ellipsoidiin: lähin osuma tai null.</summary>
        public static (double x, double y, double z)? Osuma((double x, double y, double z) o, (double x, double y, double z) d)
        {
            double k = A / B;
            double ox = o.x, oy = o.y, oz = o.z * k, dx = d.x, dy = d.y, dz = d.z * k;
            double a = dx * dx + dy * dy + dz * dz, b = 2 * (ox * dx + oy * dy + oz * dz), c = ox * ox + oy * oy + oz * oz - A * A;
            double D = b * b - 4 * a * c;
            if (D < 0) return null;
            double t = (-b - Math.Sqrt(D)) / (2 * a);
            if (t <= 0) return null;
            return (o.x + t * d.x, o.y + t * d.y, o.z + t * d.z);
        }

        /// <summary>ECEF → geodeettinen leveys ja pituus (astetta), pinnalla olevalle pisteelle.</summary>
        public static (double lat, double lon) Geodeettinen((double x, double y, double z) p)
        {
            double e2 = 1 - B * B / (A * A), r = Math.Sqrt(p.x * p.x + p.y * p.y);
            double lat = Math.Atan2(p.z, r * (1 - e2));   // pinnalla tarkka (h = 0)
            return (lat * 180 / Math.PI, Math.Atan2(p.y, p.x) * 180 / Math.PI);
        }

        /// <summary>Geodeettinen → ECEF pinnalla (h = 0).</summary>
        public static (double x, double y, double z) Ecef(double lat, double lon)
        {
            double fi = lat * Math.PI / 180, la = lon * Math.PI / 180, e2 = 1 - B * B / (A * A);
            double n = A / Math.Sqrt(1 - e2 * Math.Sin(fi) * Math.Sin(fi));
            return (n * Math.Cos(fi) * Math.Cos(la), n * Math.Cos(fi) * Math.Sin(la), n * (1 - e2) * Math.Sin(fi));
        }

        static (double, double, double) Sade(KuvaKamera k, double px, double py)
        {
            double th = Math.Tan(k.PystykenttaAst * Math.PI / 360), tw = th * k.Leveys / k.Korkeus;
            double u = (2 * px / k.Leveys - 1) * tw, v = (1 - 2 * py / k.Korkeus) * th;
            double x = k.Katse.x + u * k.Oikea.x + v * k.Ylos.x, y = k.Katse.y + u * k.Oikea.y + v * k.Ylos.y, z = k.Katse.z + u * k.Oikea.z + v * k.Ylos.z;
            double l = Math.Sqrt(x * x + y * y + z * z);
            return (x / l, y / l, z / l);
        }

        static double Etaisyys((double x, double y, double z) a, (double x, double y, double z) b)
            => Math.Sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));

        /// <summary>
        /// Ruudukko sx × sy solua: solun maapikselin koko = lähemmän reunan maaetäisyys / solun pikselit (suurempi akseli). Solu, jonka
        /// jokin kulma osuu avaruuteen (horisontin yli), jää pois; horisonttirivin solut saavat kauimmaisen osuneen kulman.
        /// </summary>
        public static List<Nayte> Naytteet(KuvaKamera k, int sx = 48, int sy = 36)
        {
            var r = new List<Nayte>();
            var p = new (double x, double y, double z)?[sx + 1, sy + 1];
            for (int i = 0; i <= sx; i++)
                for (int j = 0; j <= sy; j++)
                    p[i, j] = Osuma(k.Paikka, Sade(k, k.Leveys * (double)i / sx, k.Korkeus * (double)j / sy));
            double solL = k.Leveys / (double)sx, solK = k.Korkeus / (double)sy;
            for (int i = 0; i < sx; i++)
                for (int j = 0; j < sy; j++)
                {
                    var a = p[i, j]; var b = p[i + 1, j]; var c = p[i, j + 1]; var d = p[i + 1, j + 1];
                    if (a == null || b == null || c == null || d == null) continue;
                    // Solun lähempi reuna ratkaisee (tarkempi taso): koko solu saa vähintään sen resoluution.
                    double vaaka = Math.Min(Etaisyys(a.Value, b.Value), Etaisyys(c.Value, d.Value)) / solL;
                    double pysty = Math.Min(Etaisyys(a.Value, c.Value), Etaisyys(b.Value, d.Value)) / solK;
                    var n = new Nayte { Sx = i, Sy = j, MetriaPikseli = Math.Max(vaaka, pysty),
                        LatMin = 90, LatMax = -90, LonMin = 180, LonMax = -180 };
                    foreach (var q in new[] { a.Value, b.Value, c.Value, d.Value })
                    {
                        var (la, lo) = Geodeettinen(q);
                        n.LatMin = Math.Min(n.LatMin, la); n.LatMax = Math.Max(n.LatMax, la);
                        n.LonMin = Math.Min(n.LonMin, lo); n.LonMax = Math.Max(n.LonMax, lo);
                    }
                    n.Lat = (n.LatMin + n.LatMax) / 2; n.Lon = (n.LonMin + n.LonMax) / 2;
                    r.Add(n);
                }
            return r;
        }

        /// <summary>S2-ruudut, joiden bbox leikkaa jonkin solun, ja tarkin tarvittu resoluutio (m) per ruutu.</summary>
        public static Dictionary<S2Ruutu, double> Ruudut(List<Nayte> naytteet, IEnumerable<S2Ruutu> indeksi)
        {
            var r = new Dictionary<S2Ruutu, double>();
            foreach (var ru in indeksi)
                foreach (var n in naytteet)
                {
                    if (n.LonMax < ru.W || n.LonMin > ru.E || n.LatMax < ru.S || n.LatMin > ru.N) continue;
                    r[ru] = r.TryGetValue(ru, out var m) ? Math.Min(m, n.MetriaPikseli) : n.MetriaPikseli;
                }
            return r;
        }

        /// <summary>
        /// COG-laatat ruudulle: jokainen ruutuun osuva solu valitsee oman tasonsa (resoluution mukaan) ja solun kulmien
        /// UTM-rajauksen laatat. Palauttaa (taso, tx, ty) -joukon; tavut = otsakkeen Pituudet.
        /// </summary>
        public static HashSet<(int taso, int tx, int ty)> Laatat(S2Ruutu ru, CogOtsake o, List<Nayte> naytteet)
        {
            var r = new HashSet<(int, int, int)>();
            int v = ru.Vyohyke;
            foreach (var n in naytteet)
            {
                if (n.LonMax < ru.W || n.LonMin > ru.E || n.LatMax < ru.S || n.LatMin > ru.N) continue;
                int taso = o.TasoResoluutiolle(n.MetriaPikseli);
                var t = o.Tasot[taso]; double pm = o.TasonPikseliM(taso);
                double xmin = double.MaxValue, xmax = double.MinValue, ymin = double.MaxValue, ymax = double.MinValue;
                foreach (var (la, lo) in new[] { (n.LatMin, n.LonMin), (n.LatMin, n.LonMax), (n.LatMax, n.LonMin), (n.LatMax, n.LonMax) })
                {
                    var (e, no) = Utm.Eteen(la, lo, v);
                    double x = (e - o.Ita0) / pm, y = (o.Pohjoinen0 - no) / pm;
                    xmin = Math.Min(xmin, x); xmax = Math.Max(xmax, x); ymin = Math.Min(ymin, y); ymax = Math.Max(ymax, y);
                }
                int tx0 = Math.Max(0, (int)Math.Floor(xmin / t.LaattaL)), tx1 = Math.Min(t.LaattojaX - 1, (int)Math.Floor(xmax / t.LaattaL));
                int ty0 = Math.Max(0, (int)Math.Floor(ymin / t.LaattaK)), ty1 = Math.Min(t.LaattojaY - 1, (int)Math.Floor(ymax / t.LaattaK));
                for (int tx = tx0; tx <= tx1; tx++) for (int ty = ty0; ty <= ty1; ty++) r.Add((taso, tx, ty));
            }
            return r;
        }

        /// <summary>Haettavat tavut laattajoukolle.</summary>
        public static long Tavut(CogOtsake o, IEnumerable<(int taso, int tx, int ty)> laatat)
        {
            long s = 0;
            foreach (var (taso, tx, ty) in laatat) s += o.Tasot[taso].Alue(tx, ty).pituus;
            return s;
        }
    }
}
