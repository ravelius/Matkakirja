using System;

namespace Matkakirja
{
    /// <summary>
    /// HORISONTTIUSVA JA KALLISTUKSEN KATTO (omistajan löydös 46, build 11: kallistetussa kartassa musta avaruus näkyi
    /// horisontin yllä). Webin malli js/pallolauta/kallistus.js: horisontti rajataan kulmaetäisyydelle
    /// KALLISTUS_RAJA_KERROIN 0,6 × korkeus katsepisteestä P (eli maapinnan matka 0,6 · d), ja rajan yläpuolelle tulee
    /// paperin värinen usva, joka häipyy USVAN_LIUKU 0,12 ruudun korkeuden matkalla alaspäin ja voimistuu kulman mukaan
    /// (opacity min(1, kulma / 8°)). Natiivissa usva on Unityn lineaarinen sumu (Cesiumin tileset-varjostin lukee sen) ja
    /// kameran tausta samaa sävyä, joten horisontin takana ei näy mustaa (Aurinko.cs).
    ///
    /// Geometria (puhdas, ei UnityEngineä; testit Kartta-testit/Testit/KarttavaloTestit.cs): pallo säteellä R, P sen
    /// pinnalla, kamera etäisyydellä d P:stä kallistettuna α pystysuorasta (PalloKierto.Aseta), pystysuuntainen
    /// puolikuvakulma φ. Ruudun pystypaikka y on osuus puolikorkeudesta: 0 = keskellä, 1 = yläreuna, −1 = alareuna.
    /// Syvyys on katseakselin suuntainen etäisyys (Unityn sumu käyttää sitä, ei säteen pituutta).
    ///
    /// KATTO: kallistus saa kasvaa, kunnes usvan raja (maapinnan piste 0,6 · d P:n takana) laskee ruudulla korkeudelle
    /// <see cref="RajanY"/> (0,5 = puolivälissä keskeltä yläreunaan, eli ylin neljännes ruudusta on usvaa). φ = 25°:lla
    /// katto on noin 55° (webissä kiinteä 30°, jolloin raja on korkeudella 0,86). Build 11:n katto 85° vei usvan rajan
    /// lähes ruudun keskelle ja kameran horisonttiin: kuva oli enimmäkseen avaruutta ja kaukaista, sumeaa laattaa.
    /// </summary>
    public static class Horisonttiusva
    {
        /// <summary>Webin KALLISTUS_RAJA_KERROIN: usvan raja maapinnan matkana katsepisteestä, × d.</summary>
        public const double RajaKerroin = 0.6;
        /// <summary>Webin USVAN_LIUKU: usva häipyy rajalta alaspäin tämän osuuden ruudun koko korkeudesta.</summary>
        public const double Liuku = 0.12;
        /// <summary>Webin usvan voimistuminen: täysi, kun kallistus ≥ tämä (°).</summary>
        public const double TaysiKallistus = 8.0;
        /// <summary>Katto: usvan raja saa laskea ruudulla enintään tälle korkeudelle (osuus puolikorkeudesta).</summary>
        public const double RajanY = 0.5;

        // ---- RUUDUN USVA MERKEILLE (omistajan löydös 153, build 19): webin paperiusva (js/pallolauta/kallistus.js
        // asetaUsva, .pallolauta-usva z-index 3) peittää laattojen lisäksi GL-nimiöt ja -symbolit, mutta natiivin
        // sumu koskee vain 3D:tä, joten UI-merkit (NostotKartalla) jäivät täysin näkyviin usvan päälle. Aurinko
        // kirjoittaa joka kehys rajan ruudulla ja voiman; merkit kertovat peittävyytensä (1 − Peitto).

        /// <summary>Usvan raja ruudun korkeuden osuutena ylhäältä (0–1; web: y / H, raja ruudun yllä → 0).</summary>
        public static float RuutuRajaY;
        /// <summary>Usvan voima tässä kehyksessä (0 = ei usvaa; web: min(1, kulma / 8), Aurinko.Usva).</summary>
        public static float RuutuVoima;

        /// <summary>
        /// Webin usvan peitto ruudun kohdassa y (osuus ylhäältä): täysi rajan yläpuolella, lineaarisesti nollaan
        /// <see cref="Liuku"/>:n matkalla rajan alla (linear-gradient kerma → 0 %), kerrottuna voimalla.
        /// </summary>
        public static double Peitto(double yYlhaalta, double rajaY, double voima)
        {
            if (!(voima > 0)) return 0;
            if (yYlhaalta <= rajaY) return voima;
            double t = (yYlhaalta - rajaY) / Liuku;
            return t >= 1 ? 0 : voima * (1 - t);
        }

        /// <summary>Tämän kehyksen peitto ruudun kohdassa y (osuus ylhäältä).</summary>
        public static float Peitto(float yYlhaalta) => (float)Peitto(yYlhaalta, RuutuRajaY, RuutuVoima);

        /// <summary>Usvan voimakkuus kallistuksen mukaan (web: min(1, kulma / 8)).</summary>
        public static double Vahvuus(double kallistusAst) => Math.Max(0.0, Math.Min(1.0, kallistusAst / TaysiKallistus));

        // Pystytaso: origo maan keskellä, P = (0, R), eteenpäin (katseen vaakasuunta) +x. Kamera C = P + d(−sin α, cos α).
        // Katseakseli v = (sin α, −cos α), ruudun ylös u = (cos α, sin α).

        static void Kehys(double d, double alfaAst, double R, out double cx, out double cy,
            out double vx, out double vy, out double ux, out double uy)
        {
            double a = alfaAst * Math.PI / 180.0, s = Math.Sin(a), c = Math.Cos(a);
            cx = -d * s; cy = R + d * c;
            vx = s; vy = -c;
            ux = c; uy = s;
        }

        /// <summary>
        /// Maapinnan pisteen ruudun pystypaikka, kun piste on kulmaetäisyydellä theta (rad) P:n takana katseen suuntaan.
        /// NaN, jos piste on kameran takana.
        /// </summary>
        public static double PisteenY(double d, double alfaAst, double puoliFovAst, double R, double theta)
        {
            Kehys(d, alfaAst, R, out double cx, out double cy, out double vx, out double vy, out double ux, out double uy);
            double qx = R * Math.Sin(theta) - cx, qy = R * Math.Cos(theta) - cy;
            double syv = qx * vx + qy * vy;
            if (!(syv > 1e-9)) return double.NaN;
            return (qx * ux + qy * uy) / syv / Math.Tan(puoliFovAst * Math.PI / 180.0);
        }

        /// <summary>Usvan rajan (maapinnan matka kerroin · d P:stä) ruudun pystypaikka.</summary>
        public static double RajanRuutuY(double d, double alfaAst, double puoliFovAst, double R, double kerroin = RajaKerroin) =>
            PisteenY(d, alfaAst, puoliFovAst, R, kerroin * d / R);

        /// <summary>Usvan rajan syvyys (katseakselin suuntainen etäisyys kamerasta, m).</summary>
        public static double RajanSyvyys(double d, double alfaAst, double R, double kerroin = RajaKerroin)
        {
            Kehys(d, alfaAst, R, out double cx, out double cy, out double vx, out double vy, out _, out _);
            double th = kerroin * d / R;
            return (R * Math.Sin(th) - cx) * vx + (R * Math.Cos(th) - cy) * vy;
        }

        /// <summary>
        /// Ruudun pystypaikan y säteen osumasyvyys pallon pintaan (m). +∞, jos säde ohittaa pallon (taivas).
        /// </summary>
        public static double SyvyysRuudulla(double d, double alfaAst, double puoliFovAst, double R, double y)
        {
            Kehys(d, alfaAst, R, out double cx, out double cy, out double vx, out double vy, out double ux, out double uy);
            double s = y * Math.Tan(puoliFovAst * Math.PI / 180.0);
            double rx = vx + ux * s, ry = vy + uy * s;   // syvyys = t, koska r·v = 1
            double a = rx * rx + ry * ry, b = cx * rx + cy * ry, c = cx * cx + cy * cy - R * R;
            double disk = b * b - a * c;
            if (disk < 0) return double.PositiveInfinity;
            double t = (-b - Math.Sqrt(disk)) / a;
            return t > 0 ? t : double.PositiveInfinity;
        }

        /// <summary>
        /// Lineaarisen sumun alku ja loppu (syvyyksiä, m): loppu = usvan raja (täysi usva sen takana, kuten webin usva
        /// rajan yläpuolella), alku = syvyys ruudulla 2 · <see cref="Liuku"/> puolikorkeutta rajan alapuolella (webin
        /// liuku on 0,12 koko korkeudesta). Alku on aina lopun edessä.
        /// </summary>
        public static (double alku, double loppu) Sumu(double d, double alfaAst, double puoliFovAst, double R,
            double kerroin = RajaKerroin)
        {
            double loppu = RajanSyvyys(d, alfaAst, R, kerroin);
            double y = RajanRuutuY(d, alfaAst, puoliFovAst, R, kerroin);
            double alku = double.IsNaN(y) ? loppu * 0.8 : SyvyysRuudulla(d, alfaAst, puoliFovAst, R, y - 2.0 * Liuku);
            if (!(alku < loppu)) alku = loppu * 0.8;
            return (Math.Max(0.0, alku), loppu);
        }

        /// <summary>
        /// Kallistuksen katto (°): suurin α ≤ max, jolla usvan raja on ruudulla vähintään korkeudella rajanY.
        /// Rajan paikka laskee ruudulla kallistuksen kasvaessa, joten haetaan puolitushaulla.
        /// </summary>
        public static double KallistusKatto(double d, double puoliFovAst, double R, double max = 85.0,
            double kerroin = RajaKerroin, double rajanY = RajanY)
        {
            bool Sallittu(double a)
            {
                double y = RajanRuutuY(d, a, puoliFovAst, R, kerroin);
                return !double.IsNaN(y) && y >= rajanY;
            }
            if (Sallittu(max)) return max;
            if (!Sallittu(0.0)) return 0.0;
            double lo = 0.0, hi = max;
            for (int i = 0; i < 40; i++)
            {
                double m = 0.5 * (lo + hi);
                if (Sallittu(m)) lo = m; else hi = m;
            }
            return lo;
        }
    }
}
