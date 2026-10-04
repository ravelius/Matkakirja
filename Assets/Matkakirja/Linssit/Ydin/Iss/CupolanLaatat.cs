// CUPOLAN NÄKYMÄN RASTERILAATAT ENNAKOLTA (iPad 36a05beb 4.10.2026: kylmä ensiavaus jäi 4 s:n kattoon, koska kyydin BMNG- ja
// S2-kerrokset lisätään vasta Cupolaan tultaessa ja niiden laatat tulivat verkosta; lämpimät avaukset levyvälimuistista 2,0 s).
// Laskee, mitkä Web Mercator -laatat (z, x, y; y alas) Cupolan asento tarvitsee: ruutu näytteistetään ruudukkona, jokaisen
// näytteen säde leikataan maapalloon ja osumakohdan taso valitaan kuten Cesium: maastolaatan taso L tarkentuu, kunnes
// geometrinen virhe 77 067 m / 2^L ≤ 2 maan pikseliä (KarttaKerrokset: layer.json-maasto, SSE 16 / 8), ja rasteri seuraa
// laattaa (laatan leveys / virhe · rasterin näyttövirhe 2 = 520 pikseliä laatan yli) → Web Mercator -taso
// z = round(L + lisä + log2(Mercator-venymä)) (Cesium Native pyöristää ja ottaa suuremman akseleista; lisä ja maan pikselin
// kerroin kalibroitu iPadin hakulokiin, ks. vakiot). Laatat käydään läpi Cesiumin tapaan nelipuuna lähimmän etäisyyden mukaan.
// Maastolaatoista mukaan esivanhemmat ja sisarukset (preloadAncestors, forbidHoles), ja kunkin maastolaatan rasteritaso
// peittää koko laatan suorakulmion: karkeat esivanhemmat tuovat esim. S2:n kaikki juuret. Kamera kuten PalloKierto.Kuvaa.
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
        /// <summary>Rasterin taso maastolaatan yli: teoria log2(40 075 016 / (256 · 77 067 / 2 · 260)) ≈ 2,02 (520 pikseliä laatan yli);
        /// kalibroitu 1,52 (alla).</summary>
        public const double RasteriLisa = 1.52;
        /// <summary>
        /// Kalibrointi iPad 8023e34c -hakulokiin (Cupolan ensiavaus, Cesiumin S2- ja BMNG-pyynnöt): maastotason kynnyksen kerroin
        /// (renderöinnin mittakaava ja tilesetin näyttövirhe yhdessä), rasterin tasolisä ja rajauksen reunavara. Lisä 1,52, kerroin 3
        /// ja vara 0,15 kattavat Cesiumin pyynnöistä S2 307/307 (541 laattaa, tarkin z8 kuten Cesiumilla) ja BMNG 337/353 (845;
        /// puuttuvat ovat näkymän ulkopuolella Aasiassa, entisen kaukonäkymän laatoista).
        /// </summary>
        public const double PikseliKerroin = 3;
        /// <summary>Laatan rajauksen reunavara laatan koon osuutena.</summary>
        public const double RajausVara = 0.15;
        /// <summary>Rasterin laattoja enintään akselilla yhdelle maastolaatalle (maximumTextureSize 2048 / 256).</summary>
        public const int MaxLaattojaAkselilla = 8;
        /// <summary>Näytteitä ruudun kummallakin akselilla (laatta on ruudulla ≥ 256 px, näyteväli ~100 px iPadilla).</summary>
        public const int Naytteita = 32;

        /// <summary>
        /// Laatat tasoilla <paramref name="zMin"/>–<paramref name="zMax"/> asennolle <paramref name="a"/> (pystykenttä asteina, kuvasuhde
        /// leveys / korkeus, ruudun korkeus pikseleinä). <paramref name="alue"/> rajaa sarjan kattavuuteen
        /// (W, S, E, N asteina); null = koko maailma.
        /// </summary>
        public static SortedSet<(int z, int x, int y)> Laske(in Kuvakulma a, double kentta, double suhde, double korkeusPx, int zMin, int zMax,
            (double W, double S, double E, double N)? alue = null)
            => Rasterit(Maastolaatat(a, kentta, suhde, korkeusPx), zMin, zMax, alue);

        /// <summary>
        /// Maastolaatat (maantieteellinen nelipuu 2 × 1 juurta, TMS: y = 0 etelässä, kuten quantized-mesh -maasto), jotka Cesium
        /// lataa asennolle: näkyvät tarkentuen, sisarukset ja esivanhemmat. Sama joukko maaston esihakuun ja rasterien laskuun.
        /// </summary>
        public static HashSet<(int l, int x, int y)> Maastolaatat(in Kuvakulma a, double kentta, double suhde, double korkeusPx)
        {
            var maasto = new HashSet<(int l, int x, int y)>();
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
            double tv = Math.Tan(kentta * 0.5 * Deg), th = tv * suhde;
            // Näkyvät maapisteet (ruudun näytteet, osuma pallolle) ja niiden etäisyys silmästä.
            var osumat = new List<(double lat, double lon, double t)>();
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
                    osumat.Add((Math.Asin(Math.Max(-1, Math.Min(1, g.z / R))) / Deg, Math.Atan2(g.y, g.x) / Deg, t));
                }
            // Cesiumin läpikäynti maantieteellisessä nelipuussa (2 × 1 juurta): laatta, jossa on näkyvä piste, tarkentuu, kun
            // geometrinen virhe / lähin etäisyys · (korkeus / 2 tan(kenttä/2)) > 2 · PikseliKerroin; lapset tulevat neljänä
            // (forbidHoles), esivanhemmat ovat mukana (preloadAncestors). Lähin etäisyys = pienin näkyvän pisteen ja laatan
            // kulmien, reunojen keskipisteiden ja keskipisteen etäisyys silmästä (Cesiumin rajausvolyymin lähin piste).
            double kynnys = 2 * PikseliKerroin * 2 * tv / Math.Max(1, korkeusPx);   // virhe / etäisyys -raja
            void Kay(int l, int x, int y, List<(double lat, double lon, double t)> pisteet)
            {
                maasto.Add((l, x, y));
                double koko = 180.0 / (1 << l), w = x * koko - 180, s0 = y * koko - 90;
                // Cesiumin rajausvolyymi on laattaa väljempi (suuret laatat leikkaavat kartiota helpommin): reunavara RajausVara · koko.
                double vara = RajausVara * koko;
                var omat = pisteet.FindAll(q => q.lon >= w - vara && q.lon < w + koko + vara && q.lat >= s0 - vara && q.lat < s0 + koko + vara);
                if (omat.Count == 0 || l >= MaastoMaxTaso) return;
                double lahin = double.MaxValue;
                foreach (var q in omat) lahin = Math.Min(lahin, q.t);
                for (int i = 0; i <= 2; i++)
                    for (int j = 0; j <= 2; j++)
                    {
                        double qa = Math.Max(-89.9, Math.Min(89.9, s0 + koko * j / 2)) * Deg, qo = (w + koko * i / 2) * Deg;
                        var q = (x: R * Math.Cos(qa) * Math.Cos(qo), y: R * Math.Cos(qa) * Math.Sin(qo), z: R * Math.Sin(qa));
                        var dv = Vahenna(q, silma);
                        lahin = Math.Min(lahin, Math.Sqrt(Piste(dv, dv)));
                    }
                if (MaastonVirhe / (1 << l) / Math.Max(1, lahin) <= kynnys) return;
                for (int cx = 2 * x; cx <= 2 * x + 1; cx++) for (int cy = 2 * y; cy <= 2 * y + 1; cy++) Kay(l + 1, cx, cy, omat);
            }
            Kay(0, 0, 0, osumat); Kay(0, 1, 0, osumat);
            return maasto;
        }

        /// <summary>Maastolaattojen rasterit tasoilla zMin–zMax: kunkin laatan suorakulmio sen rasteritasolla (katto 8 × 8).</summary>
        public static SortedSet<(int z, int x, int y)> Rasterit(HashSet<(int l, int x, int y)> maasto, int zMin, int zMax,
            (double W, double S, double E, double N)? alue = null)
        {
            var r = new SortedSet<(int, int, int)>();
            foreach (var (l, gx, gy) in maasto)
            {
                double koko = 180.0 / (1 << l), aw = gx * koko - 180, ae = aw + koko, as_ = gy * koko - 90, an = as_ + koko;
                if (as_ >= 90 || an <= -90) continue;
                if (alue.HasValue)
                {
                    aw = Math.Max(aw, alue.Value.W); ae = Math.Min(ae, alue.Value.E); as_ = Math.Max(as_, alue.Value.S); an = Math.Min(an, alue.Value.N);
                    if (aw >= ae || as_ >= an) continue;
                }
                // Cesium Native computeLevelFromTargetScreenPixels: log2-taso pyöristettynä, suurempi akseleista (pysty venyy
                // Mercatorissa: suhde Mercator-korkeus / maantieteellinen korkeus).
                double sl = Math.Max(-85, as_), nl = Math.Min(85, an);
                double venyma = nl > sl ? (Mercator(nl) - Mercator(sl)) / ((nl - sl) * Deg) : 1;
                int zt = Math.Max(zMin, Math.Min(zMax, l + (int)Math.Round(RasteriLisa + Math.Log(Math.Max(1, venyma), 2))));
                var (x0, y0) = Laattalista.Laatta(Math.Min(85, an) - 1e-6, aw + 1e-6, zt);
                var (x1, y1) = Laattalista.Laatta(Math.Max(-85, as_) + 1e-6, ae - 1e-6, zt);
                // Rasterin tekstuuri enintään maximumTextureSize (2048 px = 8 laattaa akselilla; KarttaKerrokset.LisaaRasteri):
                // Cesium karkeuttaa tasoa, kunnes laatan rasteri mahtuu.
                while (zt > zMin && (x1 - x0 + 1 > MaxLaattojaAkselilla || y1 - y0 + 1 > MaxLaattojaAkselilla))
                {
                    zt--;
                    (x0, y0) = Laattalista.Laatta(Math.Min(85, an) - 1e-6, aw + 1e-6, zt);
                    (x1, y1) = Laattalista.Laatta(Math.Max(-85, as_) + 1e-6, ae - 1e-6, zt);
                }
                for (int x = x0; x <= x1; x++)
                    for (int y = y0; y <= y1; y++)
                        for (int zz = zt, xx = x, yy = y; zz >= zMin; zz--, xx >>= 1, yy >>= 1) if (!r.Add((zz, xx, yy))) break;
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

        static double Mercator(double latAst) { double la = latAst * Deg; return Math.Log(Math.Tan(Math.PI / 4 + la / 2)); }

        static (double x, double y, double z) Lisaa((double x, double y, double z) a, (double x, double y, double z) b) => (a.x + b.x, a.y + b.y, a.z + b.z);
        static (double x, double y, double z) Vahenna((double x, double y, double z) a, (double x, double y, double z) b) => (a.x - b.x, a.y - b.y, a.z - b.z);
        static (double x, double y, double z) Kerro((double x, double y, double z) a, double k) => (a.x * k, a.y * k, a.z * k);
        static double Piste((double x, double y, double z) a, (double x, double y, double z) b) => a.x * b.x + a.y * b.y + a.z * b.z;
        static (double x, double y, double z) Risti((double x, double y, double z) a, (double x, double y, double z) b) =>
            (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
        static (double x, double y, double z) Norm((double x, double y, double z) a) { double l = Math.Sqrt(Piste(a, a)); return l > 0 ? Kerro(a, 1 / l) : a; }
    }
}
