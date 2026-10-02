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
        /// <summary>
        /// SCL-otsakkeet ruuduittain (tunnus → otsake); SCL-laatat Pakatut-taulussa avaimella ("&lt;tunnus&gt;|scl", taso, tx, ty).
        /// Pilvimaski (Päätoimittaja 1.10.: S2:n omat kumpupilvet maahan painettuina läikkinä): luokat 3 (pilven varjo), 8, 9
        /// (pilvi) ja 10 (ohut cirrus) ohitetaan, jolloin pikseli tulee seuraavasta ruudusta tai varakuvasta.
        /// </summary>
        public readonly Dictionary<string, CogOtsake> Scl = new Dictionary<string, CogOtsake>();

        /// <summary>
        /// Vesipikselien tasoitus merenväriin (0 = pois): Ateenan julisteessa (8648c410) eri päivien S2-ruutujen meri (aallokko,
        /// kiilto, sameus) erottui suorina ruuturajoina. SCL-luokan 6 (vesi) pikseli sekoitetaan Meri-väriin (TCI ennen lutia).
        /// </summary>
        public double VesiTasoitus;
        public byte[] Meri = { 14, 22, 30 };

        /// <summary>Onko UTM-pisteessä (e, n) ruudun SCL:n mukaan pilvi tai pilven varjo (ei haettu → ei).</summary>
        public bool Pilvinen(string tunnus, int vyohyke, double e, double n, double metria)
        {
            byte c = SclLuokka(tunnus, e, n, metria);
            return c == 3 || c == 8 || c == 9 || c == 10;
        }

        /// <summary>SCL-luokka UTM-pisteessä (e, n); 255 = ei haettu.</summary>
        public byte SclLuokka(string tunnus, double e, double n, double metria)
        {
            if (!Scl.TryGetValue(tunnus, out var o)) return 255;
            int taso = o.TasoResoluutiolle(metria);
            var t = o.Tasot[taso]; double pm = o.TasonPikseliM(taso);
            int x = (int)((e - o.Ita0) / pm), y = (int)((o.Pohjoinen0 - n) / pm);
            if (x < 0 || y < 0 || x >= t.Leveys || y >= t.Korkeus) return 255;
            for (int tt = taso; tt < o.Tasot.Count; tt++)
            {
                var tn = o.Tasot[tt]; double pn = o.TasonPikseliM(tt);
                int xx = (int)((e - o.Ita0) / pn), yy = (int)((o.Pohjoinen0 - n) / pn);
                var l = Hae((tunnus + "|scl", tt, xx / tn.LaattaL, yy / tn.LaattaK));
                if (l == null) continue;
                return l[(yy % tn.LaattaK) * tn.LaattaL + xx % tn.LaattaL];
            }
            return 255;
        }

        /// <summary>Kaikki laatat ja välimuisti pois (kuvan työstön jälkeen; iPad-mittaus 2.10.).</summary>
        public void Vapauta()
        {
            Laatat.Clear(); Pakatut.Clear(); purettu.Clear(); System.Threading.Interlocked.Exchange(ref purettuTavut, 0);
        }

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
            // Tarkin haettu taso voittaa: tasot tarkimmasta karkeimpaan, jokaisella kaikki ruudut järjestyksessä (laitekoe 4:
            // ruutu kerrallaan -silmukka otti edellisen ruudun karkean tason toisen lehden haun jäljiltä → laatan muotoisia
            // eri tarkkuuden ja eri päivän kaistoja). Nodata (0,0,0) → seuraava ruutu samalla tasolla. Päällekkäiset ruudut
            // sekoitetaan reunalla painoin (saumapehmennys, eri päivien kuvat).
            r = g = b = 0;
            int lkm = d.Ruudut.Count, tasoja = 0;
            for (int k = 0; k < lkm; k++) tasoja = Math.Max(tasoja, d.Ruudut[k].otsake.Tasot.Count);
            int alku = int.MaxValue;
            for (int k = 0; k < lkm; k++)
            {
                var (ru, o) = d.Ruudut[k];
                if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                alku = Math.Min(alku, o.TasoResoluutiolle(metria));
            }
            if (alku == int.MaxValue) return false;
            (double e, double n)[] utm = null;
            double sr = 0, sg = 0, sb = 0, summa = 0, jaljella = 1;
            for (int taso = alku; taso < tasoja; taso++)
            {
                for (int k = 0; k < lkm; k++)
                {
                    var (ru, o) = d.Ruudut[k];
                    if (taso >= o.Tasot.Count || lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                    utm ??= new (double, double)[lkm];
                    if (utm[k].e == 0 && utm[k].n == 0) utm[k] = Utm.Eteen(lat, lon, ru.Vyohyke);
                    var (e, n) = utm[k];
                    double pm = o.TasonPikseliM(taso);
                    double fx = (e - o.Ita0) / pm - 0.5, fy = (o.Pohjoinen0 - n) / pm - 0.5;
                    var t = o.Tasot[taso];
                    if (fx < 0 || fy < 0 || fx >= t.Leveys - 1 || fy >= t.Korkeus - 1) continue;   // ruudun ulkopuolella
                    int ix = (int)fx, iy = (int)fy; double ax = fx - ix, ay = fy - iy;
                    if (!Pikselit(d, ru.Tunnus, t, taso, ix, iy, out var p00, out var p10, out var p01, out var p11)) continue;   // ei haettu
                    if (Musta(p00) || Musta(p10) || Musta(p01) || Musta(p11)) continue;   // nodata (myös reunapikseli)
                    byte luokka = d.SclLuokka(ru.Tunnus, e, n, pm);
                    if (luokka == 3 || luokka == 8 || luokka == 9 || luokka == 10) continue;   // S2:n oma pilvi tai sen varjo → seuraava / varakuva
                    double cr = (p00.r * (1 - ax) + p10.r * ax) * (1 - ay) + (p01.r * (1 - ax) + p11.r * ax) * ay;
                    double cg = (p00.g * (1 - ax) + p10.g * ax) * (1 - ay) + (p01.g * (1 - ax) + p11.g * ax) * ay;
                    double cb = (p00.b * (1 - ax) + p10.b * ax) * (1 - ay) + (p01.b * (1 - ax) + p11.b * ax) * ay;
                    if (luokka == 6 && d.VesiTasoitus > 0)
                    {
                        double w = d.VesiTasoitus;
                        cr += (d.Meri[0] - cr) * w; cg += (d.Meri[1] - cg) * w; cb += (d.Meri[2] - cb) * w;
                    }
                    // Saumapehmennys: paino kasvaa ruudun UTM-reunasta sisään 4 km:n matkalla; ruudun keskellä ensimmäinen voittaa.
                    double koko = o.Tasot[0].Leveys * o.PikseliM;
                    double reuna = Math.Min(Math.Min(e - o.Ita0, o.Ita0 + koko - e), Math.Min(o.Pohjoinen0 - n, n - (o.Pohjoinen0 - koko)));
                    double paino = Math.Max(0.02, Math.Min(1, reuna / 4000));
                    sr += cr * paino * jaljella; sg += cg * paino * jaljella; sb += cb * paino * jaljella; summa += paino * jaljella;
                    jaljella *= 1 - paino;
                    if (jaljella < 0.02) break;
                }
                if (summa > 0) break;   // tällä tasolla dataa: ei karkeampaa
            }
            if (summa <= 0) return false;
            r = (byte)Math.Min(255, Math.Round(sr / summa)); g = (byte)Math.Min(255, Math.Round(sg / summa)); b = (byte)Math.Min(255, Math.Round(sb / summa));
            return true;
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
