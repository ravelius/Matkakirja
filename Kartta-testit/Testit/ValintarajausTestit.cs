// VALINTANÄKYMÄN RAJAUS KELLON ALLE (v3f): Assets/Matkakirja/Kartta/Valintarajaus.cs.
// Laitemitat v3f-laiteajosta 28.9. klo 14.30 (iPhone 17, 402 × 874 pt, fov 50°): kello varaa yläreunasta 133 pt
// (Pelikellonaytto.YlaVaraus), valittavan nimen yläreuna on 35 + 17 pt pisteen yllä (KaupunkiMerkit.ValintaNimenY + nimi).
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ValintarajausTestit
    {
        const double Lat0 = 30, Lon0 = 17, PallonOsuus = 0.55, AnkkuriVara = 0.78, NimiYla = 52;
        static readonly double Tan = Math.Tan(25 * Math.PI / 180);
        static readonly (double Lat, double Lon) Lontoo = (51.5074, -0.1278), Ateena = (37.9838, 23.7275),
            Moskova = (55.7558, 37.6173), Istanbul = (41.0082, 28.9784), Kairo = (30.0444, 31.2357), Tanger = (35.7595, -5.8340);
        static readonly (double Lat, double Lon)[] Ankkurit = { Lontoo, Ateena };
        static readonly (double Lat, double Lon)[] Valittavat =
        {
            Ateena, (40.7128, -74.0060), Kairo, (-22.9068, -43.1729), (19.0760, 72.8777), (39.9042, 116.4074),
            (-33.8688, 151.2093), Moskova, (35.6762, 139.6503), (1.3521, 103.8198), (-33.9249, 18.4241),
            (37.7749, -122.4194), Tanger, Istanbul,
        };

        /// <summary>Aloitusnäkymän rajattu valintanäkymä iPhone 17:ssä (aloitusradan testien napautusnäkymä).</summary>
        internal static AloituslennonRata.Asento Iphone17Valinta()
        {
            double suhde = 402.0 / 874.0;
            double d0 = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            var (lat, d) = Valintarajaus.Sovita(Lat0, Lon0, d0, Tan, suhde, 1 - 2 * (133 + NimiYla) / 874, -AnkkuriVara, Valittavat, Ankkurit);
            return new AloituslennonRata.Asento(lat, Lon0, (d - 1) * 6_378_137.0, 0, 0, 0);
        }

        /// <summary>Pisteen y ruudun yläreunasta (pt).</summary>
        static double YPt(double lat, double d, double suhde, double korkeusPt, (double Lat, double Lon) p)
        {
            Oleta.Tosi(Valintarajaus.Ruutu(lat, Lon0, d, Tan, suhde, p.Lat, p.Lon, out _, out double y), $"{p} näkyy");
            return korkeusPt * 0.5 * (1 - y);
        }

        [Testi]
        static void WebEtaisyysAnkkureista()
        {
            double suhde = 402.0 / 874.0;
            double d = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            Oleta.Tosi(d > 1.5 && d < 4, $"etäisyys säteinä {d:0.000}");
            // Lontoo (kapean ruudun sitova ankkuri) on täsmälleen 78 %:ssa puolikkaasta vaakasuunnassa.
            Valintarajaus.Ruutu(Lat0, Lon0, d, Tan, suhde, Lontoo.Lat, Lontoo.Lon, out double x, out _);
            Oleta.Tosi(Math.Abs(Math.Abs(x) - AnkkuriVara) < 1e-9 || Math.Abs(x) < AnkkuriVara, $"Lontoo x {x:0.000}");
        }

        [Testi]
        static void MalliVastaaLaitekuvaa()
        {
            // v3f/valinta-1.png (1206 × 2622 px = 402 × 874 pt): Moskova (341, 116), Istanbul (321, 284), Ateena (273, 326),
            // Kairo (365, 426) pt. Pallomalli ja ruudun mitat ±12 pt (Cesiumin ellipsoidi, merkin nosto).
            double suhde = 402.0 / 874.0;
            double d = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            foreach (var (p, x0, y0, nimi) in new[] { (Moskova, 341.0, 116.0, "Moskova"), (Istanbul, 321.0, 284.0, "Istanbul"),
                         (Ateena, 273.0, 326.0, "Ateena"), (Kairo, 365.0, 426.0, "Kairo") })
            {
                Valintarajaus.Ruutu(Lat0, Lon0, d, Tan, suhde, p.Lat, p.Lon, out double x, out double y);
                double xp = 201 * (1 + x), yp = 437 * (1 - y);
                Oleta.Tosi(Math.Abs(xp - x0) < 12 && Math.Abs(yp - y0) < 12, $"{nimi} ({xp:0}, {yp:0}) pt, kuvassa ({x0}, {y0})");
            }
        }

        [Testi]
        static void MoskovaKellonAllePuhelimessa()
        {
            double suhde = 402.0 / 874.0, h = 874, varaus = 133;
            double d0 = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            Oleta.Tosi(YPt(Lat0, d0, suhde, h, Moskova) - NimiYla < varaus, "lähtönäkymässä Moskovan nimi kellon alla (löydös)");
            double ylaY = 1 - 2 * (varaus + NimiYla) / h;
            var (lat, d) = Valintarajaus.Sovita(Lat0, Lon0, d0, Tan, suhde, ylaY, -AnkkuriVara, Valittavat, Ankkurit);
            Oleta.Tosi(d == d0, $"puhelimessa ei loitonneta ({d:0.000} vs {d0:0.000})");
            Oleta.Tosi(lat > Lat0 && lat < Lat0 + 10, $"keskus siirtyy pohjoiseen {lat - Lat0:0.00}°");
            double moskova = YPt(lat, d, suhde, h, Moskova) - NimiYla;
            Oleta.Tosi(moskova >= varaus - 0.01 && moskova < varaus + 0.5, $"Moskovan nimi alkaa kellon varauksesta ({moskova:0.0} pt)");
            foreach (var p in new[] { Istanbul, Ateena, Kairo, Lontoo })
                Oleta.Tosi(YPt(lat, d, suhde, h, p) < h * 0.5 * (1 + AnkkuriVara), $"{p} alarajan yllä");
        }

        [Testi]
        static void IlmanKelloaEnnallaan()
        {
            double suhde = 402.0 / 874.0, h = 874;
            double d0 = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            var (lat, d) = Valintarajaus.Sovita(Lat0, Lon0, d0, Tan, suhde, 1 - 2 * NimiYla / h, -AnkkuriVara, Valittavat, Ankkurit);
            Oleta.Tosi(lat == Lat0 && d == d0, $"varaus 0: näkymä ennallaan ({lat}, {d})");
            (lat, d) = Valintarajaus.Sovita(Lat0, Lon0, d0, Tan, suhde, -2, -AnkkuriVara, null, Ankkurit);
            Oleta.Tosi(lat == Lat0 && d == d0, "ei valittavia: ennallaan");
        }

        [Testi]
        static void VaakaruutuLoitontaaTarvittaessa()
        {
            // Vaakapuhelin 874 × 402 pt: ei ylälovea, varaus 10 + 56 + 8 = 74 pt.
            double suhde = 874.0 / 402.0, h = 402, varaus = 74;
            double d0 = Valintarajaus.AnkkuriEtaisyys(Lat0, Lon0, Tan, suhde, PallonOsuus, AnkkuriVara, Ankkurit);
            double ylaY = 1 - 2 * (varaus + NimiYla) / h;
            var (lat, d) = Valintarajaus.Sovita(Lat0, Lon0, d0, Tan, suhde, ylaY, -AnkkuriVara, Valittavat, Ankkurit);
            Oleta.Tosi(lat >= Lat0 && d >= d0, $"siirto {lat - Lat0:0.00}°, etäisyys {d0:0.000} → {d:0.000}");
            foreach (var p in Valittavat)
                if (Valintarajaus.Ruutu(Lat0, Lon0, d0, Tan, suhde, p.Lat, p.Lon, out double x0, out double y0) && Math.Abs(x0) <= 1 && y0 >= -1)
                {
                    double y = YPt(lat, d, suhde, h, p);
                    Oleta.Tosi(y - NimiYla >= varaus - 0.01, $"{p} nimi kellon alla ({y - NimiYla:0.0} pt)");
                    Oleta.Tosi(y <= h * 0.5 * (1 + AnkkuriVara) + 1e-6, $"{p} alarajan yllä ({y:0.0} pt)");
                }
        }

        [Testi]
        static void SiirtoPohjoiseenLaskeeJaLoitonnusKutistaa()
        {
            var r = new Random(7);
            for (int i = 0; i < 400; i++)
            {
                double lat = r.NextDouble() * 60 - 10, d = 1.3 + r.NextDouble() * 3;
                double plat = lat + r.NextDouble() * 60 - 30, plon = Lon0 + r.NextDouble() * 60 - 30;
                if (!Valintarajaus.Ruutu(lat, Lon0, d, Tan, 0.5, plat, plon, out _, out double y0)) continue;
                if (Valintarajaus.Ruutu(lat + 0.5, Lon0, d, Tan, 0.5, plat, plon, out _, out double y1))
                    Oleta.Tosi(y1 < y0, $"y laskee siirrossa ({lat:0.0}, {plat:0.0}, {plon:0.0}, {d:0.00})");
                Valintarajaus.Ruutu(lat, Lon0, d * 1.1, Tan, 0.5, plat, plon, out _, out double y2);
                Oleta.Tosi(Math.Abs(y2) <= Math.Abs(y0) + 1e-12, "loitonnus pienentää |y|");
            }
        }
    }
}
