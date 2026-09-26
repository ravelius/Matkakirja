using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// KOHDEKAUPUNGIN SAAPUMISNÄKYMÄN LAATAT (Natiiviseppä 26.9.2026, laattojen esilataus erä 2, ESILATAUSPOLITIIKKA kohdat 3 ja 5):
    /// mitkä pohjan (Web Mercator XYZ), maaston (quantized-mesh, maantieteellinen TMS 2 × 1) ja kermahunnun laatat Cesium
    /// pyytää, kun kamera ajaa matkan kohdemaan saapumisnäkymään (PalloKierto.SaapumisNakyma: keskipiste, korkeus, kallistus 0).
    ///
    /// MITOITUS PYYNTÖLOKILLA (PyyntoLoki, lokit/laatta-esilataus/era2, simulaattori 1572C658, kylmä välimuisti), ei arvausmallia:
    ///   Ateena → Rooma (lento): ITA-näkymä 1 526 km, pohja Z8 82 + Z7 20 + Z6 6, maasto Z7 68 + Z6 12, kerma Z8 83 + Z7 40 + Z6 20
    ///   Lontoo → Pariisi (bussi): FRA-näkymä 1 425 km, pohja Z8 64 + Z7 32, maasto Z7 71 + Z6 14, kerma Z8 64 + Z7 42 + Z6 22
    ///   Lontoo → Amsterdam (laiva): NLD-näkymä 404 km, pohja Z9 36 + Z8 21, maasto Z9 74 + Z8 40 + Z7 22, kerma Z8 21 + Z7 22
    /// Tästä: näkymän päätaso seuraa korkeutta, z = round(log2(K / h km)), rastereilla K = <see cref="RasteriKerroin"/>
    /// (1 526 ja 1 425 km → Z8, 404 km → Z9; kaikki kolme täsmäävät vain välillä 276 000–292 000) ja maastolla
    /// K = <see cref="MaastoKerroin"/> (→ Z7, Z7, Z9; väli 146 000–258 000). Alue on kameran kuvan maanpinta suoraan alas
    /// (pystysuunta ±FOV/2, vaakasuunta kuvasuhteen mukaan, pallon kaarevuus huomioiden), ja joka tasolla yksi laattarengas
    /// lisää (Cesium lataa reunan laatat, joiden rajaava tilavuus leikkaa kuvan). Esivanhemmat <see cref="Alas"/> tasoa
    /// alemmas samalta alueelta (Cesium lataa tason kerrallaan); alle <see cref="AlinTaso"/> kaikki ovat buildin paketissa.
    /// Ennuste kattoi mitatuista näkymän pää- ja esivanhempitasojen laatoista Pariisi 97 %, Rooma 78 %, Amsterdam 72 %
    /// (puuttuvat: lennon kaupunkipisteen maastokyselyt Z9–Z12 ja siirron kameran laajemmat Z6–Z7), ja ennusteesta 49–61 %
    /// oli mitatussa joukossa — mitattu on alaraja, sillä Cesium ei pyydä uudelleen muistissa olevia laattoja (Pariisin
    /// pohjoisosa oli Lontoon näkymästä muistissa). Koko: Rooma 548 laattaa ≈ 4,5 Mt, Pariisi 628 ≈ 4,6 Mt, Amsterdam 400 ≈ 1,7 Mt.
    /// Puhdas funktio (ei Unityä): Kartta-testit/Testit/SaapumisLaatatTestit.cs.
    /// </summary>
    public static class SaapumisLaatat
    {
        public const double R = 6371.0;
        /// <summary>Rasterien (pohja, kerma) päätaso: round(log2(RasteriKerroin / h km)).</summary>
        public const double RasteriKerroin = 285000.0;
        /// <summary>Maaston päätaso: round(log2(MaastoKerroin / h km)).</summary>
        public const double MaastoKerroin = 200000.0;
        /// <summary>Kuvan maanpinnan väljennys (1 = tarkka kuva) ja lisärengas laattoina joka tasolla.</summary>
        public const double Vara = 1.0;
        public const int Rengas = 1;
        /// <summary>Esivanhempia päätason alla (Cesium lataa tason kerrallaan).</summary>
        public const int Alas = 2;
        /// <summary>Alin esiladattava taso: pohja ja maasto Z0–Z5 ovat buildin laattapaketissa (Laattapaketti).</summary>
        public const int AlinTaso = 6;

        /// <summary>Kameran kuvan maanpinta (asteina), keskipiste ja korkeus.</summary>
        public readonly struct Ala
        {
            public readonly double LatMin, LatMax, LonMin, LonMax, Lat, Lon, KorkeusKm;
            public Ala(double latMin, double latMax, double lonMin, double lonMax, double lat, double lon, double korkeusKm)
            { LatMin = latMin; LatMax = latMax; LonMin = lonMin; LonMax = lonMax; Lat = lat; Lon = lon; KorkeusKm = korkeusKm; }
            public override string ToString() =>
                $"lat {LatMin:0.0}–{LatMax:0.0}, lon {LonMin:0.0}–{LonMax:0.0}, {KorkeusKm:0} km";
        }

        /// <summary>
        /// Kameran kuvan maanpinta, kun kamera katsoo suoraan alas pisteeseen (lat, lon) korkeudelta h km: pystysuunnan
        /// puolikulma fovPysty/2 ja vaakasuunnan atan(tan(fov/2) · kuvasuhde). Katsekulma a nadiirista osuu maahan
        /// keskuskulmassa asin((R + h)/R · sin a) − a (horisontin yli katsottaessa horisonttiin).
        /// </summary>
        public static Ala Alue(double lat, double lon, double korkeusKm, double fovPysty, double kuvasuhde, double vara = Vara)
        {
            double v = Math.Max(1.0, fovPysty) * Math.PI / 360.0;
            double hh = Math.Atan(Math.Tan(v) * Math.Max(0.05, kuvasuhde));
            double h = Math.Max(1.0, korkeusKm);
            double Maa(double a)
            {
                double s = (R + h) / R * Math.Sin(a);
                return s >= 1.0 ? R * Math.Acos(R / (R + h)) : R * (Math.Asin(s) - a);
            }
            double dLat = Maa(v) * vara / 111.195;
            double dLon = Maa(hh) * vara / (111.195 * Math.Max(0.05, Math.Cos(lat * Math.PI / 180.0)));
            return new Ala(Math.Max(-85.0, lat - dLat), Math.Min(85.0, lat + dLat), lon - Math.Min(180.0, dLon),
                lon + Math.Min(180.0, dLon), lat, lon, h);
        }

        /// <summary>Päätaso korkeudelta h km kertoimella K (rajattuna [min, max]).</summary>
        public static int Taso(double korkeusKm, double kerroin, int min, int max) =>
            Math.Max(min, Math.Min(max, (int)Math.Round(Math.Log(kerroin / Math.Max(1.0, korkeusKm), 2.0), MidpointRounding.AwayFromZero)));

        /// <summary>
        /// Web Mercator XYZ -laatat (y pohjoisesta) tasoilta zMin–zMax alueelta + rengas: karkein taso ensin, keskipistettä
        /// lähin ensin. Pituus kiertyy, rivi rajataan ruudukkoon.
        /// </summary>
        public static List<(int z, int x, int y)> Mercator(Ala a, int zMin, int zMax, int rengas = Rengas)
        {
            var tulos = new List<(int z, int x, int y)>();
            for (int z = zMin; z <= zMax; z++)
            {
                int n = 1 << z;
                var (x0, y0) = MercatorXY(z, a.LatMax, a.LonMin);
                var (x1, y1) = MercatorXY(z, a.LatMin, a.LonMax);
                var (cx, cy) = MercatorXY(z, a.Lat, a.Lon);
                Lisaa(tulos, z, n, n, x0, x1, y0, y1, cx, cy, rengas);
            }
            return tulos;
        }

        /// <summary>Quantized-mesh-maaston laatat (maantieteellinen TMS: 2 × 1 juurta, y etelästä), kuten Mercator.</summary>
        public static List<(int z, int x, int y)> Maantieteellinen(Ala a, int zMin, int zMax, int rengas = Rengas)
        {
            var tulos = new List<(int z, int x, int y)>();
            for (int z = zMin; z <= zMax; z++)
            {
                int nx = 2 << z, ny = 1 << z;
                var (x0, y0) = MaantieteellinenXY(z, a.LatMin, a.LonMin);
                var (x1, y1) = MaantieteellinenXY(z, a.LatMax, a.LonMax);
                var (cx, cy) = MaantieteellinenXY(z, a.Lat, a.Lon);
                Lisaa(tulos, z, nx, ny, x0, x1, y0, y1, cx, cy, rengas);
            }
            return tulos;
        }

        /// <summary>Esiladattavat tasot: päätaso ja <see cref="Alas"/> esivanhempaa, ei alle <see cref="AlinTaso"/>.</summary>
        public static (int min, int max) Tasot(int paataso) => (Math.Max(AlinTaso, paataso - Alas), paataso);

        /// <summary>
        /// Näkymän avain esilatausten yhdistämiseen: sama maa ja lähes sama kamera (keskipiste 0,5°:n ja korkeus 10 %:n
        /// tarkkuudella) = sama laattajoukko.
        /// </summary>
        public static string Avain(string maa, double lat, double lon, double korkeusKm) =>
            (maa ?? "-") + ":" + Math.Round(lat * 2.0) + ":" + Math.Round(lon * 2.0) + ":" + Math.Round(Math.Log(Math.Max(1.0, korkeusKm), 1.1));

        static void Lisaa(List<(int z, int x, int y)> tulos, int z, int nx, int ny, int x0, int x1, int y0, int y1,
            int cx, int cy, int rengas)
        {
            int leveys = ((x1 - x0) % nx + nx) % nx + 2 * rengas;
            if (leveys >= nx) { x0 = 0; leveys = nx - 1; rengas = 0; }
            int ya = Math.Max(0, Math.Min(y0, y1) - rengas), yb = Math.Min(ny - 1, Math.Max(y0, y1) + rengas);
            var taso = new List<(int x, int y, int d)>();
            for (int i = 0; i <= leveys; i++)
            {
                int x = ((x0 - rengas + i) % nx + nx) % nx;
                int dx = Math.Abs(x - cx); dx = Math.Min(dx, nx - dx);
                for (int y = ya; y <= yb; y++) taso.Add((x, y, Math.Max(dx, Math.Abs(y - cy))));
            }
            taso.Sort((a, b) => a.d != b.d ? a.d.CompareTo(b.d) : a.x != b.x ? a.x.CompareTo(b.x) : a.y.CompareTo(b.y));
            foreach (var (x, y, _) in taso) tulos.Add((z, x, y));
        }

        public static (int x, int y) MercatorXY(int z, double lat, double lon)
        {
            int n = 1 << z;
            double la = Math.Max(-85.0, Math.Min(85.0, lat)) * Math.PI / 180.0;
            int x = (int)Math.Floor((lon + 180.0) / 360.0 * n);
            int y = (int)Math.Floor((1.0 - Math.Log(Math.Tan(la) + 1.0 / Math.Cos(la)) / Math.PI) / 2.0 * n);
            return (((x % n) + n) % n, Math.Max(0, Math.Min(n - 1, y)));
        }

        public static (int x, int y) MaantieteellinenXY(int z, double lat, double lon)
        {
            int nx = 2 << z, ny = 1 << z;
            int x = (int)Math.Floor((lon + 180.0) / 360.0 * nx);
            int y = (int)Math.Floor((Math.Max(-90.0, Math.Min(90.0, lat)) + 90.0) / 180.0 * ny);
            return (((x % nx) + nx) % nx, Math.Max(0, Math.Min(ny - 1, y)));
        }
    }
}
