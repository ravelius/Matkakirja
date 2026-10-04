// CUPOLAN NÄKYMÄN RASTERILAATAT ENNAKOLTA (iPad 36a05beb 4.10.2026: kylmä ensiavaus jäi 4 s:n kattoon, koska kyydin BMNG- ja
// S2-kerrokset lisätään vasta Cupolaan tultaessa ja niiden laatat tulivat verkosta; lämpimät avaukset levyvälimuistista 2,0 s).
// Laskee, mitkä Web Mercator -laatat (z, x, y; y alas) Cupolan asento tarvitsee: ruutu näytteistetään ruudukkona, jokaisen
// näytteen säde leikataan maapalloon ja osumakohdan taso valitaan kuten Cesium: maastolaatan taso L tarkentuu, kunnes
// geometrinen virhe 77 067 m / 2^L ≤ 2 maan pikseliä (KarttaKerrokset: layer.json-maasto, SSE 16 / 8), ja rasteri seuraa
// laattaa (laatan leveys / virhe · rasterin näyttövirhe 2 = 520 pikseliä laatan yli) → Web Mercator -taso
// z = round(L + 2,02 + log2(1 / cos lat)) (Cesium Native pyöristää ja ottaa suuremman akseleista).
// Mukaan myös esivanhemmat alimpaan tasoon asti (Cesium lataa ne paikkamerkeiksi). Kamera kuten PalloKierto.Kuvaa.
// Puhdas C#: Linssit-testit CupolanLaatatTestit.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Iss
{
    public static class CupolanLaatat
    {
        const double R = 6371000, Deg = Math.PI / 180;
        /// <summary>Maaston tason 0 geometrinen virhe (m) ja layer.json-maxzoom (KarttaKerrokset, MAASTON TARKKUUS).</summary>
        public const double MaastonVirhe = 77_067; public const int MaastoMaxTaso = 12;
        /// <summary>Rasterin taso maastolaatan yli: log2(40 075 016 / (256 · 77 067 / 2 · 260)) ≈ 2,02 (520 pikseliä laatan yli).</summary>
        const double RasteriLisa = 2.02;
        /// <summary>Näytteitä ruudun kummallakin akselilla (laatta on ruudulla ≥ 256 px, näyteväli ~100 px iPadilla).</summary>
        public const int Naytteita = 32;

        /// <summary>
        /// Laatat tasoilla <paramref name="zMin"/>–<paramref name="zMax"/> asennolle <paramref name="a"/> (pystykenttä asteina, kuvasuhde
        /// leveys / korkeus, ruudun korkeus pikseleinä). <paramref name="alue"/> rajaa sarjan kattavuuteen
        /// (W, S, E, N asteina); null = koko maailma.
        /// </summary>
        public static SortedSet<(int z, int x, int y)> Laske(in Kuvakulma a, double kentta, double suhde, double korkeusPx, int zMin, int zMax,
            (double W, double S, double E, double N)? alue = null)
        {
            var r = new SortedSet<(int, int, int)>();
            // Kamera maan keskipisteen kehyksessä (pallo).
            double la = a.Lat * Deg, lo = a.Lon * Deg;
            var n = (x: Math.Cos(la) * Math.Cos(lo), y: Math.Cos(la) * Math.Sin(lo), z: Math.Sin(la));
            var p = Kerro(n, R + a.KatseKorkeusM);
            var pohjoinen = Norm(Vahenna((0, 0, 1), Kerro(n, n.z)));
            var ita = Norm(Risti(pohjoinen, n));
            double b = a.Suuntima * Deg, k = Math.Max(0, Math.Min(85, a.Kallistus)) * Deg;
            var eteen = Lisaa(Kerro(pohjoinen, Math.Cos(b)), Kerro(ita, Math.Sin(b)));
            var silma = Lisaa(p, Kerro(Vahenna(Kerro(n, Math.Cos(k)), Kerro(eteen, Math.Sin(k))), a.EtaisyysM));
            var f = Norm(Vahenna(p, silma));
            var ylos = Norm(Lisaa(Kerro(eteen, Math.Cos(k)), Kerro(n, Math.Sin(k))));
            var oikea = Norm(Risti(f, ylos));
            ylos = Risti(oikea, f);
            double tv = Math.Tan(kentta * 0.5 * Deg), th = tv * suhde, pikseliPerM = 2 * tv / Math.Max(1, korkeusPx);
            for (int i = 0; i < Naytteita; i++)
                for (int j = 0; j < Naytteita; j++)
                {
                    double u = -1 + 2 * (i + 0.5) / Naytteita, v = -1 + 2 * (j + 0.5) / Naytteita;
                    var d = Norm(Lisaa(f, Lisaa(Kerro(oikea, u * th), Kerro(ylos, v * tv))));
                    // |silmä + t d|² = R²
                    double bb = Piste(silma, d), c = Piste(silma, silma) - R * R, D = bb * bb - c;
                    if (D < 0) continue;
                    double t = -bb - Math.Sqrt(D);
                    if (t <= 0) continue;
                    var g = Lisaa(silma, Kerro(d, t));
                    double lat = Math.Asin(Math.Max(-1, Math.Min(1, g.z / R))) / Deg, lon = Math.Atan2(g.y, g.x) / Deg;
                    if (alue.HasValue && (lon < alue.Value.W || lon > alue.Value.E || lat < alue.Value.S || lat > alue.Value.N)) continue;
                    double maa = Math.Max(1, t * pikseliPerM);
                    int L = Math.Max(0, Math.Min(MaastoMaxTaso, (int)Math.Ceiling(Math.Log(MaastonVirhe / (2 * maa), 2) - 1e-9)));
                    // Cesium Native computeLevelFromTargetScreenPixels: log2-taso pyöristettynä, suurempi akseleista (pysty venyy
                    // Mercatorissa 1 / cos lat).
                    int zt = Math.Max(zMin, Math.Min(zMax, L + (int)Math.Round(RasteriLisa + Math.Log(1 / Math.Max(0.05, Math.Cos(lat * Deg)), 2))));
                    var (x, y) = Laattalista.Laatta(lat, lon, zt);
                    for (int zz = zt; zz >= zMin; zz--, x >>= 1, y >>= 1) if (!r.Add((zz, x, y))) break;
                }
            return r;
        }

        /// <summary>
        /// Laattojen ämpäripolut mallista ({z}, {x}, {y} tai {reverseY}; y alas kuten Cesiumin XYZ), juuri poistettuna alusta.
        /// Alueeseen rajatulla jaolla (KarttaKerrokset.RasterinJako) URL:n taso ja rivit ovat juurilaatasta (<paramref name="juuriZ"/>,
        /// <paramref name="juuriX"/>, <paramref name="juuriY"/> Web Mercatorissa): {z} = z − juuriZ, {x} = x − juuriX · 2^taso.
        /// </summary>
        public static List<string> Polut(string malli, IEnumerable<(int z, int x, int y)> laatat, string juuri, int juuriZ = 0, int juuriX = 0, int juuriY = 0)
        {
            var r = new List<string>();
            if (string.IsNullOrEmpty(malli)) return r;
            string m = juuri != null && malli.StartsWith(juuri, StringComparison.Ordinal) ? malli.Substring(juuri.Length) : malli;
            foreach (var (z, x, y) in laatat)
            {
                int t = z - juuriZ;
                if (t < 0) continue;
                int xr = x - (juuriX << t), yr = y - (juuriY << t);
                if (xr < 0 || yr < 0) continue;
                r.Add(m.Replace("{z}", t.ToString()).Replace("{x}", xr.ToString()).Replace("{reverseY}", yr.ToString()).Replace("{y}", yr.ToString()));
            }
            return r;
        }

        /// <summary>Alueeseen rajatun jaon juurilaatta (vasen yläkulma) tasolla <paramref name="z"/>: alueen länsi- ja pohjoisreuna.</summary>
        public static (int x, int y) Juuri(double w, double n, int z) => Laattalista.Laatta(n - 1e-9, w + 1e-9, z);

        static (double x, double y, double z) Lisaa((double x, double y, double z) a, (double x, double y, double z) b) => (a.x + b.x, a.y + b.y, a.z + b.z);
        static (double x, double y, double z) Vahenna((double x, double y, double z) a, (double x, double y, double z) b) => (a.x - b.x, a.y - b.y, a.z - b.z);
        static (double x, double y, double z) Kerro((double x, double y, double z) a, double k) => (a.x * k, a.y * k, a.z * k);
        static double Piste((double x, double y, double z) a, (double x, double y, double z) b) => a.x * b.x + a.y * b.y + a.z * b.z;
        static (double x, double y, double z) Risti((double x, double y, double z) a, (double x, double y, double z) b) =>
            (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
        static (double x, double y, double z) Norm((double x, double y, double z) a) { double l = Math.Sqrt(Piste(a, a)); return l > 0 ? Kerro(a, 1 / l) : a; }
    }
}
