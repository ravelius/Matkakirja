using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON AVAUSNÄKYMÄN LAATAT (Natiiviseppä 26.9.2026, build 22, ESILATAUSPOLITIIKKA kohta 2): mitkä laatat Cesium
    /// pyytää, kun kamera katsoo kohdetta (Lontoo) etäisyydeltä D kallistuksella k suuntaan s (LennonAikajana.AloitusReitti.Avaus:
    /// 450 km, 45°). Mitattu pyyntölokilla (PyyntoLoki, lokit/laatta-esilataus/): mustan verhon avausvaiheessa Cesium haki
    /// verkosta noin 170 laattaa (maasto Z6–Z8, pohja Z6–Z8, Blue Marble Z6–Z7), lähialueelta (≤ 500 km) kaikkiin
    /// suuntiin ja kiilasta kameran suuntaan 1 800 km:iin asti, ja verho lähti katolla asteella 46–57 %.
    ///
    /// Malli: kamera on D·sin k maan pinnalla kohteen takana (suunta s + 180°) ja D·cos k korkeudella. Laatta kuuluu joukkoon,
    /// jos sen keskipiste on horisontin tällä puolen ja joko lähialueella (≤ <see cref="Lahiala"/> km kohteesta) tai katseen
    /// kartiossa (≤ <see cref="Kartio"/>° katseesta), ja sen taso z on enintään Cesiumin tarvitsema taso
    /// z* = ⌈log2(<see cref="Kerroin"/> / d) + siirto⌉ (d = laatan etäisyys kamerasta km; maasto: geometrinen virhe
    /// 77 067 m / 2^z ≤ 16 px SSE 2 400 px:n ruudulla ja fov 50°: 2^z ≈ 98 000 / d; rasterit ovat Web Mercatorissa noin
    /// 0,7 tasoa maastoa tarkempia samalla etäisyydellä, siirto 0,7). Esivanhemmat tulevat mukaan (Cesium lataa tason
    /// kerrallaan). Järjestys: karkein taso ensin, kamerasta lähin ensin. kiila = false: vain lähialue (suunnasta riippumaton
    /// osa; aloitusnäyttö ennen kohteen valintaa). Tarkkuus 34 % (867 haettua, noin 500 tarvittua), mutta lennon alussa
    /// haettuna avaus valmistui kylmänä 5,3 s:ssa (ilman 7,3–8,1 s; lokit/laatta-esilataus/b-geom, b-pois).
    /// Puhdas funktio (ei Unityä): Peli-testit/Testit/AvausLaatatTestit.cs.
    /// </summary>
    public static class AvausLaatat
    {
        public const double R = 6371.0;
        public static double Kerroin = 98000.0, Kartio = 42.0, Lahiala = 500.0, Raja = 2400.0, Lisa = 0.0;

        /// <summary>
        /// Laatat (z, x, y) tasoilta zMin–zMax. maantieteellinen = Cesiumin quantized-mesh -maasto (TMS 2 × 1, y etelästä);
        /// muuten Web Mercator XYZ (y pohjoisesta). siirto = tasosiirto maastoon nähden (rasterit 0,7).
        /// </summary>
        public static List<(int z, int x, int y)> Laatat(bool maantieteellinen, int zMin, int zMax, double siirto,
            double lat0, double lon0, double etaisyysKm, double kallistus, double suunta, bool kiila = true)
        {
            double maa = etaisyysKm * Math.Sin(Rad(kallistus)), alt = etaisyysKm * Math.Cos(Rad(kallistus));
            var (cla, clo) = Kohde(lat0, lon0, (suunta + 180.0) % 360.0, maa);
            var C = V(cla, clo, alt);
            var T = V(lat0, lon0, 0);
            var f = Nor(Sub(T, C));
            double ck = Math.Cos(Rad(Kartio));
            double dlat = Raja / 111.0, dlon = Raja / (111.0 * Math.Max(0.2, Math.Cos(Rad(lat0))));
            var tulos = new List<(int z, int x, int y, double d)>();
            for (int z = zMin; z <= zMax; z++)
            {
                int nx = maantieteellinen ? 2 << z : 1 << z, ny = 1 << z;
                for (int y = 0; y < ny; y++)
                {
                    double la = maantieteellinen ? (y + 0.5) / ny * 180.0 - 90.0
                        : Math.Atan(Math.Sinh(Math.PI * (1 - 2 * (y + 0.5) / ny))) * 180.0 / Math.PI;
                    if (Math.Abs(la - lat0) > dlat) continue;
                    for (int x = 0; x < nx; x++)
                    {
                        double lo = (x + 0.5) / nx * 360.0 - 180.0;
                        double dl = ((lo - lon0) % 360.0 + 540.0) % 360.0 - 180.0;
                        if (Math.Abs(dl) > dlon) continue;
                        var P = V(la, lo, 0);
                        var w = Sub(P, C);
                        double dc = Pit(w);
                        // Horisontti: pinnan normaali ei saa osoittaa kamerasta poispäin.
                        if (Dot(w, P) / (dc * Pit(P)) > 0.05) continue;
                        bool lahella = Pit(Sub(P, T)) < Lahiala;
                        if (!lahella && (!kiila || Dot(w, f) / dc < ck)) continue;
                        int tarve = (int)Math.Ceiling(Math.Log(Kerroin / dc, 2) + siirto + Lisa);
                        if (z <= Math.Min(tarve, zMax)) tulos.Add((z, x, y, dc));
                    }
                }
            }
            tulos.Sort((a, b) => a.z != b.z ? a.z.CompareTo(b.z) : a.d.CompareTo(b.d));
            return tulos.ConvertAll(t => (t.z, t.x, t.y));
        }

        /// <summary>Kehittäjän säätö "K,kartio,lisa" (PlayerPrefs matkakirja-avaus-malli); virheellinen jätetään huomiotta.</summary>
        public static void Saada(string s)
        {
            if (string.IsNullOrEmpty(s)) return;
            var o = s.Split(',');
            var ic = System.Globalization.CultureInfo.InvariantCulture;
            if (o.Length > 0 && double.TryParse(o[0], System.Globalization.NumberStyles.Float, ic, out double k) && k > 0) Kerroin = k;
            if (o.Length > 1 && double.TryParse(o[1], System.Globalization.NumberStyles.Float, ic, out double c) && c > 0) Kartio = c;
            if (o.Length > 2 && double.TryParse(o[2], System.Globalization.NumberStyles.Float, ic, out double l)) Lisa = l;
        }

        static double Rad(double a) => a * Math.PI / 180.0;

        static (double, double, double) V(double lat, double lon, double h)
        {
            double la = Rad(lat), lo = Rad(lon), r = R + h;
            return (r * Math.Cos(la) * Math.Cos(lo), r * Math.Cos(la) * Math.Sin(lo), r * Math.Sin(la));
        }

        static (double, double) Kohde(double lat, double lon, double suuntima, double km)
        {
            double la = Rad(lat), lo = Rad(lon), b = Rad(suuntima), dr = km / R;
            double la2 = Math.Asin(Math.Sin(la) * Math.Cos(dr) + Math.Cos(la) * Math.Sin(dr) * Math.Cos(b));
            double lo2 = lo + Math.Atan2(Math.Sin(b) * Math.Sin(dr) * Math.Cos(la), Math.Cos(dr) - Math.Sin(la) * Math.Sin(la2));
            return (la2 * 180.0 / Math.PI, lo2 * 180.0 / Math.PI);
        }

        static (double, double, double) Sub((double, double, double) a, (double, double, double) b) =>
            (a.Item1 - b.Item1, a.Item2 - b.Item2, a.Item3 - b.Item3);
        static double Dot((double, double, double) a, (double, double, double) b) =>
            a.Item1 * b.Item1 + a.Item2 * b.Item2 + a.Item3 * b.Item3;
        static double Pit((double, double, double) a) => Math.Sqrt(Dot(a, a));
        static (double, double, double) Nor((double, double, double) a) { double p = Pit(a); return (a.Item1 / p, a.Item2 / p, a.Item3 / p); }
    }
}
