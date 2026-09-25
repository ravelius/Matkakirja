// LAATAT NÄKYVÄLLE ALUEELLE ETUKÄTEEN (Raamattu ESILATAUSPOLITIIKKA kohdat 4 ja 6: "avaruuslinssin topografia nykyisellä
// zoomilla ±1" ja joutilaana "radiomastot ja yövalot"). Puhdas osa: mitkä Web Mercator -laatat (XYZ, 256 px, y alas)
// kattavat kameran näkymän tasoilla z, z+1 ja z−1. Hakee Laattapalvelin.Esilataa (Linssit/Unity/LinssienEsilataaja),
// joka ohittaa jo välimuistissa olevat, joten sama lista uudelleen on halpa.
//
//   TASO z: taso, jonka Cesium valitsee rasterille ruudun keskellä. Kameran alla ruudun kuvapiste vastaa maastossa
//     2h·tan(fov/2)/H metriä, ja tason z laatan kuvapiste on 2πR·cos(lat)/(256·2^z). Natiivisepän mittaus 24.9.
//     (KarttaKerrokset: iPad 2 420 px, fov 50°, 1 200 km Kreikan yllä → geometrialaatta 1,4° = Web Mercator -taso 8)
//     antaa kaavalla 8,06, joten Korjaus on 0. Simulaattorin mittaus kirjataan Korjaukseen, jos se poikkeaa.
//   ALUE: laatat, jotka kameran projektio tuo ruudulle (keskipiste tai jokin kulma). Kamera katsoo pohjoinen ylhäällä ja
//     kallistuu pohjoiseen kuten PalloKierto; kiertoa Nakyma ei kerro. Ehdokkaat rajataan kalotilla, jonka säde tulee
//     ruudun kulmaan osuvasta säteestä (horisontti rajaa). Kalotti yksin ylimitoitti iPhonen pystyruudun 2,2-kertaisesti,
//     jolloin pelkkä taso z täytti katon.
//   JÄRJESTYS: z koko ruudulle, z+1 ruudun keskiosalle (lähennys pitää keskustan) ja z−1 levennetylle ruudulle
//     (loitonnus paljastaa reunat), kukin taso keskeltä ulospäin. Katto rajaa joutilaan hetken latauksen.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    public static class Laattalista
    {
        public const double MaanSadeM = 6_371_000.0;
        /// <summary>Web Mercatorin leveysasteraja.</summary>
        public const double MercatorRaja = 85.05112878;
        /// <summary>Laattoja enintään yhdellä kutsulla (3 tasoa; 256 px:n jpg noin 10–25 kt).</summary>
        public const int Katto = 200;
        /// <summary>Tasojen säteet näkymän säteen osuuksina: z, z+1 (keskusta) ja z−1 (reunat).</summary>
        public const double SadeZ = 1.0, SadeLahemmas = 0.6, SadeKauemmas = 1.3;

        /// <summary>Simulaattorissa mitattu ero kaavan ja Cesiumin valitseman tason välillä (ks. otsikko).</summary>
        public static double Korjaus = 0;

        /// <summary>Tason z arvio ruudun keskelle (pyöristämätön, ilman rajoja).</summary>
        public static double TasoTarkka(double korkeusM, double latAst, double nakokulmaAst, double ruudunKorkeusPx)
        {
            double h = Math.Max(1.0, korkeusM);
            double tan = Math.Tan(Math.Max(1.0, nakokulmaAst) * Math.PI / 360.0);
            double cos = Math.Max(0.01, Math.Cos(Math.Min(MercatorRaja, Math.Abs(latAst)) * Math.PI / 180.0));
            double metriaPikselille = 2.0 * h * tan / Math.Max(1.0, ruudunKorkeusPx);
            return Math.Log(2.0 * Math.PI * MaanSadeM * cos / (256.0 * metriaPikselille), 2.0) + Korjaus;
        }

        /// <summary>Tason z arvio rajattuna sarjan tasoihin.</summary>
        public static int Taso(double korkeusM, double latAst, double nakokulmaAst, double ruudunKorkeusPx, int minTaso, int maxTaso)
        {
            double z = TasoTarkka(korkeusM, latAst, nakokulmaAst, ruudunKorkeusPx);
            return Math.Max(minTaso, Math.Min(maxTaso, (int)Math.Round(z)));
        }

        /// <summary>
        /// Näkyvän alueen kulmasäde asteina kameran alapisteestä: säde ruudun kulmaan, kallistettuna, horisonttiin asti.
        /// </summary>
        public static double KulmaSade(double korkeusM, double nakokulmaAst, double kuvasuhde, double kallistusAst)
        {
            double k = (MaanSadeM + Math.Max(1.0, korkeusM)) / MaanSadeM;
            double tanV = Math.Tan(Math.Max(1.0, nakokulmaAst) * Math.PI / 360.0);
            double tanH = tanV * Math.Max(0.1, kuvasuhde);
            double kulma = Math.Atan(Math.Sqrt(tanV * tanV + tanH * tanH)) + Math.Max(0, kallistusAst) * Math.PI / 180.0;
            double horisontti = Math.Acos(1.0 / k);
            double s = k * Math.Sin(Math.Min(kulma, Math.PI / 2));
            double theta = kulma >= Math.PI / 2 || s >= 1.0 ? horisontti : Math.Min(horisontti, Math.Asin(s) - kulma);
            return theta * 180.0 / Math.PI;
        }

        /// <summary>Laatta (x, y), jossa piste on (y alas, OSM-järjestys).</summary>
        public static (int x, int y) Laatta(double latAst, double lonAst, int z)
        {
            int n = 1 << z;
            double lat = Math.Max(-MercatorRaja, Math.Min(MercatorRaja, latAst)) * Math.PI / 180.0;
            double lon = ((lonAst + 180.0) % 360.0 + 360.0) % 360.0;
            int x = Math.Min(n - 1, (int)Math.Floor(lon / 360.0 * n));
            double yy = (1.0 - Math.Log(Math.Tan(lat) + 1.0 / Math.Cos(lat)) / Math.PI) / 2.0 * n;
            int y = Math.Max(0, Math.Min(n - 1, (int)Math.Floor(yy)));
            return (x, y);
        }

        /// <summary>Laatan rivin y yläreunan leveysaste (y alas).</summary>
        public static double RivinLat(int y, int z)
        {
            double m = Math.PI * (1.0 - 2.0 * y / (1 << z));
            return Math.Atan(Math.Sinh(m)) * 180.0 / Math.PI;
        }

        /// <summary>Isoympyräetäisyys asteina.</summary>
        public static double Etaisyys(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180.0;
            double dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                + Math.Cos(lat1 * r) * Math.Cos(lat2 * r) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2.0 * Math.Asin(Math.Min(1.0, Math.Sqrt(a))) / r;
        }

        /// <summary>
        /// Laattojen polut tasoilla z, z+1 ja z−1 (katso otsikko). <paramref name="malli"/> on sarjan osoite paikoin {z},
        /// {x} ja {y} tai {reverseY} (molemmat ovat Cesiumissa XYZ-rivi, y alas); <paramref name="juuri"/> poistetaan
        /// alusta (Laattapalvelin.Ampari), jolloin polku on ämpärin polku. Tyhjä lista, jos mallia ei ole.
        /// </summary>
        public static List<string> Polut(string malli, Nakyma kamera, double nakokulmaAst, double kuvasuhde,
            double ruudunKorkeusPx, int minTaso, int maxTaso, string juuri = null, int katto = Katto)
        {
            var tulos = new List<string>();
            if (string.IsNullOrEmpty(malli) || maxTaso < minTaso || katto <= 0) return tulos;
            if (juuri != null && malli.StartsWith(juuri, StringComparison.Ordinal)) malli = malli.Substring(juuri.Length);
            int z = Taso(kamera.Korkeus, kamera.Lat, nakokulmaAst, ruudunKorkeusPx, minTaso, maxTaso);
            var ruutu = new Ruutu(kamera, nakokulmaAst, kuvasuhde);
            double sade = KulmaSade(kamera.Korkeus, nakokulmaAst, kuvasuhde, kamera.Kallistus);
            var tasot = new List<(int taso, double osuus)> { (z, SadeZ) };
            if (z + 1 <= maxTaso) tasot.Add((z + 1, SadeLahemmas));
            if (z - 1 >= minTaso) tasot.Add((z - 1, SadeKauemmas));
            var nahty = new HashSet<string>();
            foreach (var (taso, osuus) in tasot)
            {
                foreach (var (x, y) in Tasolla(kamera.Lat, kamera.Lon, taso, Math.Min(180.0, sade * Math.Max(1.0, osuus)), ruutu, osuus))
                {
                    if (tulos.Count >= katto) return tulos;
                    string polku = malli.Replace("{z}", taso.ToString()).Replace("{x}", x.ToString())
                        .Replace("{reverseY}", y.ToString()).Replace("{y}", y.ToString());
                    if (nahty.Add(polku)) tulos.Add(polku);
                }
            }
            return tulos;
        }

        /// <summary>
        /// Kameran ruutu paikallisessa kehyksessä (origo maan keskipiste, z kameran alapisteen pystysuora, y pohjoinen,
        /// x itä): kamera korkeudella h, pohjoinen ylhäällä ja kallistus pohjoiseen (PalloKierto; kiertoa ei tunneta).
        /// Piste näkyy, kun se on pallon kameran puoleisella puolella ja projisoituu ruudulle osuuden rajoissa.
        /// </summary>
        readonly struct Ruutu
        {
            readonly double lat0, lon0, cz, tanV, tanH, fy, fz, uy, uz;

            public Ruutu(Nakyma kamera, double nakokulmaAst, double kuvasuhde)
            {
                lat0 = kamera.Lat;
                lon0 = kamera.Lon;
                cz = MaanSadeM + Math.Max(1.0, kamera.Korkeus);
                tanV = Math.Tan(Math.Max(1.0, nakokulmaAst) * Math.PI / 360.0);
                tanH = tanV * Math.Max(0.1, kuvasuhde);
                double t = Math.Max(0, Math.Min(89.0, kamera.Kallistus)) * Math.PI / 180.0;
                fy = Math.Sin(t); fz = -Math.Cos(t);   // eteenpäin: alas ja pohjoiseen
                uy = Math.Cos(t); uz = Math.Sin(t);    // ylös ruudulla
            }

            /// <summary>Näkyykö piste ruudun [−osuus, osuus]² -alueella.</summary>
            public bool Nakyy(double lat, double lon, double osuus)
            {
                double d = Etaisyys(lat0, lon0, lat, lon) * Math.PI / 180.0;
                double b = Suunta(lat0, lon0, lat, lon);
                double px = MaanSadeM * Math.Sin(d) * Math.Sin(b);
                double py = MaanSadeM * Math.Sin(d) * Math.Cos(b);
                double pz = MaanSadeM * Math.Cos(d);
                // Pallon kameran puoli: (C − P)·P > 0.
                if (-px * px - py * py + (cz - pz) * pz <= 0) return false;
                double vx = px, vy = py, vz = pz - cz;
                double syvyys = vy * fy + vz * fz;
                if (syvyys <= 0) return false;
                double sx = vx / syvyys / tanH, sy = (vy * uy + vz * uz) / syvyys / tanV;
                return Math.Abs(sx) <= osuus && Math.Abs(sy) <= osuus;
            }
        }

        /// <summary>Suuntakulma (radiaaneina, pohjoisesta itään) pisteestä 1 pisteeseen 2.</summary>
        static double Suunta(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180.0;
            double dLon = (lon2 - lon1) * r;
            double y = Math.Sin(dLon) * Math.Cos(lat2 * r);
            double x = Math.Cos(lat1 * r) * Math.Sin(lat2 * r) - Math.Sin(lat1 * r) * Math.Cos(lat2 * r) * Math.Cos(dLon);
            return Math.Atan2(y, x);
        }

        /// <summary>
        /// Tason laatat, jotka näkyvät ruudulla osuuden rajoissa (keskipiste tai jokin kulma), lähimmästä alkaen.
        /// Kameran alapisteen laatta on aina mukana (ruutu voi olla kokonaan yhden laatan sisällä).
        /// </summary>
        static List<(int x, int y)> Tasolla(double lat, double lon, int z, double sadeAst, Ruutu ruutu, double osuus)
        {
            int n = 1 << z;
            double latYla = Math.Min(MercatorRaja, lat + sadeAst), latAla = Math.Max(-MercatorRaja, lat - sadeAst);
            var (_, yYla) = Laatta(latYla, lon, z);
            var (_, yAla) = Laatta(latAla, lon, z);
            double suurinLat = Math.Min(89.0, Math.Max(Math.Abs(latYla), Math.Abs(latAla)));
            double lonSade = sadeAst / Math.Max(0.01, Math.Cos(suurinLat * Math.PI / 180.0));
            int xAlku, xMaara;
            // Kalotti navan yli: navan ympärillä kaikki pituusasteet ovat näkyvissä.
            if (lonSade >= 180.0 || lat + sadeAst >= 90.0 || lat - sadeAst <= -90.0) { xAlku = 0; xMaara = n; }
            else
            {
                xAlku = Laatta(lat, lon - lonSade, z).x;
                int xLoppu = Laatta(lat, lon + lonSade, z).x;
                xMaara = Math.Min(n, ((xLoppu - xAlku) % n + n) % n + 1);
            }
            var ehdokkaat = new List<(int x, int y, double d)>();
            var oma = Laatta(lat, lon, z);
            double leveys = 360.0 / n;
            for (int y = yYla; y <= yAla; y++)
            {
                double ylaLat = RivinLat(y, z), alaLat = RivinLat(y + 1, z);
                double kLat = (ylaLat + alaLat) / 2.0;
                for (int i = 0; i < xMaara; i++)
                {
                    int x = (xAlku + i) % n;
                    double vasen = x * leveys - 180.0, oikea = vasen + leveys, kLon = vasen + leveys / 2.0;
                    bool mukana = (x == oma.x && y == oma.y)
                        || ruutu.Nakyy(kLat, kLon, osuus)
                        || ruutu.Nakyy(ylaLat, vasen, osuus) || ruutu.Nakyy(ylaLat, oikea, osuus)
                        || ruutu.Nakyy(alaLat, vasen, osuus) || ruutu.Nakyy(alaLat, oikea, osuus);
                    if (mukana) ehdokkaat.Add((x, y, Etaisyys(lat, lon, kLat, kLon)));
                }
            }
            ehdokkaat.Sort((a, b) => a.d.CompareTo(b.d));
            var lista = new List<(int x, int y)>(ehdokkaat.Count);
            foreach (var e in ehdokkaat) lista.Add((e.x, e.y));
            return lista;
        }
    }
}
