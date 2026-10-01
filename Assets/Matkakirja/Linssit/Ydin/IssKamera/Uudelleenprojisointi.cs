// ISS-KAMERA: puretut Sentinel-2-COG-laatat (UTM) → Web Mercator -laatta (z, x, y), jonka AstronauttiKerroksen pinta
// (paikka 2, rajattu jako) piirtää kuten Helsingin esimerkkikuvan laatat. Näin laukaisun kuva saa saman ilmakehän,
// sävytyksen, filmin ja siluetin kuin livenäkymä; vain pinnan data vaihtuu 10–160 m:n S2:ksi.
//
//   taso      laatan pikselikoko (m) valitsee COG-tason; puuttuva laatta → seuraava karkeampi haettu taso
//   nayte     bilineaarinen, TCI-tavu → Karttasepän tci_lut (mosaiikin sävytys)
//   nodata    TCI 0,0,0 = ei dataa → seuraava ruutu (päällekkäiset S2-ruudut), lopulta läpinäkyvä (alfa 0)
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    /// <summary>
    /// Laukaisun data: ruutujen otsakkeet ja laatat. Laatat ovat joko valmiiksi purettuina (Laatat, RGB LaattaL × LaattaK × 3)
    /// tai pakattuina (Pakatut), jolloin ne puretaan tarvittaessa rajattuun välimuistiin (laitekoe 1.10.: 50 mm:n kuvassa 877
    /// laattaa = ~0,7 Gt purettuna, ~80 Mt pakattuina). Säieturvallinen piirrolle rinnakkain.
    /// </summary>
    public sealed class KuvaData
    {
        public readonly List<(S2Ruutu ruutu, CogOtsake otsake)> Ruudut = new List<(S2Ruutu, CogOtsake)>();
        public readonly Dictionary<(string tunnus, int taso, int tx, int ty), byte[]> Laatat = new Dictionary<(string, int, int, int), byte[]>();
        public readonly System.Collections.Concurrent.ConcurrentDictionary<(string tunnus, int taso, int tx, int ty), (CogTaso taso, byte[] pakattu)> Pakatut =
            new System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), (CogTaso, byte[])>();
        /// <summary>Purettujen välimuistin katto tavuina (ylitys tyhjentää välimuistin; käytössä olevat taulukot säilyvät kutsujilla).</summary>
        public long Valimuistikatto = 200L * 1024 * 1024;
        readonly System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), byte[]> purettu =
            new System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), byte[]>();
        long purettuTavut;
        /// <summary>TCI-tavu → näyttötavu (256 arvoa); null = sellaisenaan.</summary>
        public byte[] Lut;

        /// <summary>Purettu laatta tai null (ei haettu).</summary>
        public byte[] Hae((string tunnus, int taso, int tx, int ty) avain)
        {
            if (Laatat.TryGetValue(avain, out var l)) return l;
            if (purettu.TryGetValue(avain, out l)) return l;
            if (!Pakatut.TryGetValue(avain, out var p)) return null;
            l = CogOtsake.PuraLaatta(p.taso, p.pakattu);
            if (System.Threading.Interlocked.Add(ref purettuTavut, l.Length) > Valimuistikatto)
            {
                purettu.Clear(); System.Threading.Interlocked.Exchange(ref purettuTavut, l.Length);
            }
            purettu[avain] = l;
            return l;
        }
    }

    public static class Uudelleenprojisointi
    {
        const double R = 6378137.0;

        /// <summary>Web Mercator -laatan pikselin keskipisteen leveys ja pituus.</summary>
        public static (double lat, double lon) Pikseli(int z, int x, int y, double px, double py)
        {
            double n = 256.0 * (1 << z), gx = x * 256.0 + px, gy = y * 256.0 + py;
            double lon = gx / n * 360 - 180;
            double lat = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * gy / n))) * 180 / Math.PI;
            return (lat, lon);
        }

        /// <summary>Laatan pikselin koko maassa (m) leveydellä lat.</summary>
        public static double PikseliM(int z, double lat) => 2 * Math.PI * R / (256.0 * (1 << z)) * Math.Cos(lat * Math.PI / 180);

        /// <summary>
        /// Piirtää laatan RGBA-tavuiksi (256 × 256 × 4, rivi 0 = pohjoinen). Palauttaa peittävien pikselien määrän
        /// (0 = laatalle ei dataa, kutsuja voi jättää tiedoston kirjoittamatta).
        /// </summary>
        public static int Laatta(KuvaData d, int z, int x, int y, byte[] ulos)
        {
            if (ulos.Length < 256 * 256 * 4) throw new ArgumentException("ulos");
            Array.Clear(ulos, 0, 256 * 256 * 4);
            var (lat0, _) = Pikseli(z, x, y, 128, 128);
            double m = PikseliM(z, lat0);
            int peitto = 0;
            for (int py = 0; py < 256; py++)
                for (int px = 0; px < 256; px++)
                {
                    var (lat, lon) = Pikseli(z, x, y, px + 0.5, py + 0.5);
                    if (!Nayte(d, lat, lon, m, out byte r, out byte g, out byte b)) continue;
                    int i = (py * 256 + px) * 4;
                    if (d.Lut != null) { r = d.Lut[r]; g = d.Lut[g]; b = d.Lut[b]; }
                    ulos[i] = r; ulos[i + 1] = g; ulos[i + 2] = b; ulos[i + 3] = 255; peitto++;
                }
            return peitto;
        }

        /// <summary>Bilineaarinen näyte ensimmäisestä ruudusta, jolla on dataa pisteessä (karkein riittävä haettu taso).</summary>
        public static bool Nayte(KuvaData d, double lat, double lon, double metria, out byte r, out byte g, out byte b)
        {
            r = g = b = 0;
            foreach (var (ru, o) in d.Ruudut)
            {
                if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                var (e, n) = Utm.Eteen(lat, lon, ru.Vyohyke);
                for (int taso = o.TasoResoluutiolle(metria); taso < o.Tasot.Count; taso++)
                {
                    double pm = o.TasonPikseliM(taso);
                    double fx = (e - o.Ita0) / pm - 0.5, fy = (o.Pohjoinen0 - n) / pm - 0.5;
                    var t = o.Tasot[taso];
                    if (fx < 0 || fy < 0 || fx >= t.Leveys - 1 || fy >= t.Korkeus - 1) break;   // ruudun ulkopuolella
                    int ix = (int)fx, iy = (int)fy; double ax = fx - ix, ay = fy - iy;
                    if (!Pikselit(d, ru.Tunnus, t, taso, ix, iy, out var p00, out var p10, out var p01, out var p11)) continue;   // ei haettu → karkeampi
                    if (Musta(p00) && Musta(p10) && Musta(p01) && Musta(p11)) break;   // nodata → seuraava ruutu
                    r = Seka(p00.r, p10.r, p01.r, p11.r, ax, ay); g = Seka(p00.g, p10.g, p01.g, p11.g, ax, ay); b = Seka(p00.b, p10.b, p01.b, p11.b, ax, ay);
                    return true;
                }
            }
            return false;
        }

        static bool Musta((byte r, byte g, byte b) p) => p.r == 0 && p.g == 0 && p.b == 0;
        static byte Seka(byte a, byte b, byte c, byte d, double ax, double ay)
            => (byte)Math.Round((a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay);

        static bool Pikselit(KuvaData d, string tunnus, CogTaso t, int taso, int ix, int iy,
            out (byte r, byte g, byte b) p00, out (byte r, byte g, byte b) p10, out (byte r, byte g, byte b) p01, out (byte r, byte g, byte b) p11)
        {
            p00 = p10 = p01 = p11 = default;
            bool ok = Lue(d, tunnus, t, taso, ix, iy, out p00) & Lue(d, tunnus, t, taso, ix + 1, iy, out p10)
                    & Lue(d, tunnus, t, taso, ix, iy + 1, out p01) & Lue(d, tunnus, t, taso, ix + 1, iy + 1, out p11);
            return ok;
        }

        static bool Lue(KuvaData d, string tunnus, CogTaso t, int taso, int x, int y, out (byte r, byte g, byte b) p)
        {
            p = default;
            var l = d.Hae((tunnus, taso, x / t.LaattaL, y / t.LaattaK));
            if (l == null) return false;
            int i = ((y % t.LaattaK) * t.LaattaL + x % t.LaattaL) * 3;
            p = (l[i], l[i + 1], l[i + 2]);
            return true;
        }
    }
}
