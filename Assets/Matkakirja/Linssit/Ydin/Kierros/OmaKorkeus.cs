// OMA KORKEUSMALLI (Linssiseppä 8.10.2026; PT ja Karttaseppä: Googlen Map Tiles -ehdot C4 kieltävät korkeuksien lukemisen Googlen
// laatoista, mittaukset ovat johdannaisia): oppaan kehystyksen maa, vapaan lennon pinta ja muiden pallojen korkeus Karttasepän
// pintamallista (DSM, rakennukset mukana) korkeus-<id>.json + -lahi.png (2 m, Tukholma ja Pariisi) + -kauko.png (30 m, kaikki
// pallokaupungit; Copernicus GLO-30, IGN LiDAR HD, OSM-rakennukset). PNG 16-bit harmaa: h = pohja_m + arvo / 10 (WGS84-ellipsoidi),
// 0 = ei dataa; ylin rivi pohjoisin; pikseli (i, r) → ENU x = kulma.x + (i + 0,5)·ruutu, y = kulma.y + (H − 1 − r + 0,5)·ruutu.
// ENU kaupungin origossa (ellipsoidikorkeus 0) tarkasti ECEF:n kautta. Bilineaarinen interpolointi, lähiosa ensin. Puhdas C#.
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class OmaKorkeus
    {
        public sealed class Osa
        {
            public string Nimi; public double RuutuM, KulmaX, KulmaY, PohjaM; public int W, H; public ushort[] Arvot;

            /// <summary>Ellipsoidikorkeus ENU-pisteessä (m) tai NaN (osan ulkopuolella tai ei dataa).</summary>
            public double Korkeus(double x, double y)
            {
                double fi = (x - KulmaX) / RuutuM - 0.5, fr = H - 1 - ((y - KulmaY) / RuutuM - 0.5);
                if (fi < 0 || fr < 0 || fi > W - 1 || fr > H - 1) return double.NaN;
                int i0 = Math.Min((int)fi, W - 2 < 0 ? 0 : W - 2), r0 = Math.Min((int)fr, H - 2 < 0 ? 0 : H - 2);
                double u = fi - i0, v = fr - r0, summa = 0, paino = 0, kaikki = 0; int n = 0;
                for (int k = 0; k < 4; k++)
                {
                    int i = Math.Min(W - 1, i0 + (k & 1)), r = Math.Min(H - 1, r0 + (k >> 1));
                    ushort a = Arvot[r * W + i]; if (a == 0) continue;
                    double p = ((k & 1) == 1 ? u : 1 - u) * ((k >> 1) == 1 ? v : 1 - v);
                    summa += p * a; paino += p; kaikki += a; n++;
                }
                // Painotettu, tai jos piste osuu ei-dataan, naapurien keskiarvo.
                return paino > 1e-9 ? PohjaM + summa / paino / 10.0 : n > 0 ? PohjaM + kaikki / n / 10.0 : double.NaN;
            }
        }

        public string Id, Krediitti; public double Lat0, Lon0;
        public readonly List<Osa> Osat = new List<Osa>();   // lähi ensin

        /// <summary>Json ja PNG-tiedostot (tiedostonimi → tavut; puuttuva osa ohitetaan).</summary>
        public static OmaKorkeus Lue(string json, Func<string, byte[]> tiedosto)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var o = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "origo"));
            var m = new OmaKorkeus { Id = MiniJson.Teksti(j, "kohde"), Krediitti = MiniJson.Teksti(j, "krediitti"), Lat0 = MiniJson.Luku(o, "lat") ?? 0, Lon0 = MiniJson.Luku(o, "lon") ?? 0 };
            foreach (var oo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "osat")))
            {
                var d = MiniJson.Objekti(oo);
                var t = tiedosto(MiniJson.Teksti(d, "tiedosto"));
                if (t == null) continue;
                var (w, h, arvot) = Png16(t);
                var kulma = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "kulma"));
                m.Osat.Add(new Osa { Nimi = MiniJson.Teksti(d, "osa"), RuutuM = MiniJson.Luku(d, "ruutu_m") ?? 30, KulmaX = MiniJson.Luku(kulma, "x") ?? 0,
                    KulmaY = MiniJson.Luku(kulma, "y") ?? 0, PohjaM = MiniJson.Luku(d, "pohja_m") ?? 0, W = w, H = h, Arvot = arvot });
            }
            m.Osat.Sort((a, b) => a.RuutuM.CompareTo(b.RuutuM));
            return m;
        }

        /// <summary>Ellipsoidikorkeus (m) paikassa tai NaN (mallin ulkopuolella).</summary>
        public double Korkeus(double lat, double lon)
        {
            var (x, y) = Enu(Lat0, Lon0, lat, lon);
            foreach (var o in Osat) { double h = o.Korkeus(x, y); if (!double.IsNaN(h)) return h; }
            return double.NaN;
        }

        const double A = 6378137.0, F = 1 / 298.257223563, E2 = F * (2 - F);

        static (double x, double y, double z) Ecef(double lat, double lon)
        {
            double la = lat * Math.PI / 180, lo = lon * Math.PI / 180, n = A / Math.Sqrt(1 - E2 * Math.Sin(la) * Math.Sin(la));
            return (n * Math.Cos(la) * Math.Cos(lo), n * Math.Cos(la) * Math.Sin(lo), n * (1 - E2) * Math.Sin(la));
        }

        /// <summary>Paikka (lat, lon, korkeus 0) origon ENU-tasossa (x itä, y pohjoinen, m).</summary>
        public static (double x, double y) Enu(double lat0, double lon0, double lat, double lon)
        {
            var p0 = Ecef(lat0, lon0); var p = Ecef(lat, lon);
            double dx = p.x - p0.x, dy = p.y - p0.y, dz = p.z - p0.z;
            double la = lat0 * Math.PI / 180, lo = lon0 * Math.PI / 180;
            double e = -Math.Sin(lo) * dx + Math.Cos(lo) * dy;
            double nn = -Math.Sin(la) * Math.Cos(lo) * dx - Math.Sin(la) * Math.Sin(lo) * dy + Math.Cos(la) * dz;
            return (e, nn);
        }

        /// <summary>16-bittinen harmaa PNG (ei lomitusta): leveys, korkeus ja arvot rivi kerrallaan ylhäältä.</summary>
        public static (int w, int h, ushort[] arvot) Png16(byte[] b)
        {
            if (b.Length < 33 || b[1] != 'P' || b[2] != 'N' || b[3] != 'G') throw new InvalidDataException("ei PNG");
            int pos = 8, w = 0, h = 0; var idat = new MemoryStream();
            while (pos + 8 <= b.Length)
            {
                int n = (b[pos] << 24) | (b[pos + 1] << 16) | (b[pos + 2] << 8) | b[pos + 3];
                string tyyppi = System.Text.Encoding.ASCII.GetString(b, pos + 4, 4);
                if (tyyppi == "IHDR")
                {
                    w = (b[pos + 8] << 24) | (b[pos + 9] << 16) | (b[pos + 10] << 8) | b[pos + 11];
                    h = (b[pos + 12] << 24) | (b[pos + 13] << 16) | (b[pos + 14] << 8) | b[pos + 15];
                    if (b[pos + 16] != 16 || b[pos + 17] != 0 || b[pos + 20] != 0) throw new InvalidDataException("vain 16-bit harmaa ilman lomitusta");
                }
                else if (tyyppi == "IDAT") idat.Write(b, pos + 8, n);
                else if (tyyppi == "IEND") break;
                pos += 12 + n;
            }
            idat.Position = 2;   // zlib-otsake; Deflate-virta sen jälkeen
            int rivi = w * 2; var raaka = new byte[(rivi + 1) * h];
            using (var z = new DeflateStream(idat, CompressionMode.Decompress))
            {
                int luettu = 0, k;
                while (luettu < raaka.Length && (k = z.Read(raaka, luettu, raaka.Length - luettu)) > 0) luettu += k;
                if (luettu < raaka.Length) throw new InvalidDataException("PNG-data loppui kesken");
            }
            var arvot = new ushort[w * h]; var ed = new byte[rivi]; var nyt = new byte[rivi];
            for (int r = 0; r < h; r++)
            {
                int o = r * (rivi + 1), suodin = raaka[o];
                for (int i = 0; i < rivi; i++)
                {
                    int x = raaka[o + 1 + i], a = i >= 2 ? nyt[i - 2] : 0, c = i >= 2 ? ed[i - 2] : 0, ylos = ed[i];
                    switch (suodin)
                    {
                        case 1: x += a; break;
                        case 2: x += ylos; break;
                        case 3: x += (a + ylos) >> 1; break;
                        case 4: int p = a + ylos - c, pa = Math.Abs(p - a), pb = Math.Abs(p - ylos), pc = Math.Abs(p - c); x += pa <= pb && pa <= pc ? a : pb <= pc ? ylos : c; break;
                    }
                    nyt[i] = (byte)x;
                }
                for (int i = 0; i < w; i++) arvot[r * w + i] = (ushort)((nyt[2 * i] << 8) | nyt[2 * i + 1]);
                var t = ed; ed = nyt; nyt = t;
            }
            return (w, h, arvot);
        }
    }
}
