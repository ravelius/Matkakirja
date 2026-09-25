using System;

namespace Matkakirja
{
    /// <summary>
    /// VALOKEILAN PUHTAAT KAAVAT (Ihmisen matka II, Linssisepän tilaus 25.9.2026; ei UnityEngineä: testit
    /// Kartta-testit/Testit/ValokeilalaskentaTestit.cs). Käyttö KarttaKerrokset.Valokeila-rajapinnassa ja samat kaavat
    /// tileset-varjostimessa (Shaders/Cesium/Lahde~/tee_tileset.py, RadioHamara) ja napakansissa (Shaders/Napakansi.shader).
    ///
    /// SUUNTA: keilan keskipiste on WGS84-ellipsoidin pinnan pisteen (geodeettinen lat/lon, korkeus 0) GEOSENTRINEN
    /// yksikkösuunta ECEF-koordinaateissa. Varjostin vertaa sitä pikselin suuntaan normalize(pos − _maaKeski.xyz), joka on
    /// sama geosentrinen suunta, joten keila osuu pinnan pisteeseen tarkasti (geodeettisen ja geosentrisen leveyden ero
    /// ≤ 0,19° ei siirrä keilaa).
    ///
    /// SÄDE: kulma maan keskipisteestä = sadeKm / R (keskisäde 6 371,0088 km). Pehmeys p on reunan liukuma säteen
    /// osuutena: täysi valo kulmaan kulma·(1 − p) asti, pimeä kulmasta kulma alkaen; väli smoothstepillä.
    /// VERTAILU JÄNTEENÄ (acos-vapaa): varjostin vertaa jännettä |n − k| = 2 sin(φ/2) rajoihin 2 sin(kulma/2), ei
    /// kosinia dot(n, k): floatin kosini on 1:n lähellä karkea (50 km:n keilalla reuna porrastuisi ~50 m:n, 5 km:n keilalla
    /// ~500 m:n askelin), jänne on tarkka pienilläkin kulmilla (~1 m). Järjestys on sama (jänne kasvaa kulman mukana).
    ///
    /// SIIRTYMÄT: smootherstep (6t⁵ − 15t⁴ + 10t³) — nopeus ja kiihtyvyys nolla päissä (KAMERA-AJOT-sääntö: ei lineaarisia
    /// siirtymiä). Keskipiste liukuu isoympyrää pitkin (<see cref="Isoympyra"/>).
    /// </summary>
    public static class Valokeilalaskenta
    {
        /// <summary>Maan keskisäde (km), IUGG.</summary>
        public const double MaanSadeKm = 6371.0088;
        const double Ekv = 6378137.0;
        const double E2 = 6.69437999014e-3; // WGS84 ensimmäinen epäkeskisyys²

        /// <summary>Geodeettinen lat/lon (asteina) → pinnan pisteen geosentrinen yksikkösuunta ECEF:ssä (x = lon 0, z = pohjoisnapa).</summary>
        public static (double x, double y, double z) SuuntaEcef(double latDeg, double lonDeg)
        {
            double la = latDeg * Math.PI / 180.0, lo = lonDeg * Math.PI / 180.0;
            double s = Math.Sin(la), c = Math.Cos(la);
            double n = Ekv / Math.Sqrt(1.0 - E2 * s * s);
            return Normalisoi((n * c * Math.Cos(lo), n * c * Math.Sin(lo), n * (1.0 - E2) * s));
        }

        /// <summary>Säde pinnalla (km) → kulma maan keskipisteestä (rad), rajattu välille [0, π].</summary>
        public static double Kulma(double sadeKm) =>
            Math.Min(Math.PI, Math.Max(0.0, (double.IsNaN(sadeKm) ? 0.0 : sadeKm) / MaanSadeKm));

        /// <summary>Kulma maan keskipisteestä (rad) → jänne yksikköpallolla 2 sin(kulma/2) (0…2).</summary>
        public static double Janne(double kulma) => 2.0 * Math.Sin(Math.Min(Math.PI, Math.Max(0.0, kulma)) * 0.5);

        /// <summary>
        /// Varjostimen jännerajat: sisä = jänne(kulma·(1 − p)) (täysi valo), ulko = jänne(kulma) (pimeä). Ulko pidetään
        /// aina sisää suurempana (smoothstep vaatii e0 &lt; e1), myös kun p = 0 tai kulma = 0.
        /// </summary>
        public static (double sisa, double ulko) Rajat(double kulma, double pehmeys01)
        {
            double p = Math.Min(1.0, Math.Max(0.0, double.IsNaN(pehmeys01) ? 0.0 : pehmeys01));
            double sisa = Janne(kulma * (1.0 - p));
            return (sisa, Math.Max(Janne(kulma), sisa + 1e-6));
        }

        /// <summary>HLSL-smoothstep.</summary>
        public static double Smoothstep(double e0, double e1, double x)
        {
            double t = Math.Min(1.0, Math.Max(0.0, (x - e0) / (e1 - e0)));
            return t * t * (3.0 - 2.0 * t);
        }

        /// <summary>
        /// Pikselin valo 0–1 kuten varjostimessa: 1 − smoothstep(sisä, ulko, |n − k|), jossa jänne = |n − k| pikselin ja
        /// keilan yksikkösuuntien välillä.
        /// </summary>
        public static double Valo(double janne, double sisa, double ulko) => 1.0 - Smoothstep(sisa, ulko, janne);

        /// <summary>
        /// Perusvärin kerroin kuten varjostimessa (ilman värisävyä): keilassa 1, ulkona 1 − 0,95·hämäryys
        /// (hämäryys 1 = lähes musta).
        /// </summary>
        public static double Kerroin(double valo, double hamaryys01)
        {
            double h = Math.Min(1.0, Math.Max(0.0, hamaryys01));
            double pohja = 1.0 - HamaranSyvyys * h;
            return pohja + (1.0 - pohja) * Math.Min(1.0, Math.Max(0.0, valo));
        }

        /// <summary>Hämäryys 1 kertoo perusvärin (1 − tämä):llä; sama vakio varjostimissa.</summary>
        public const double HamaranSyvyys = 0.95;

        /// <summary>Ease in/out: smootherstep 6t⁵ − 15t⁴ + 10t³ (t rajataan 0–1).</summary>
        public static double Pehmennys(double t)
        {
            double x = Math.Min(1.0, Math.Max(0.0, double.IsNaN(t) ? 1.0 : t));
            return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
        }

        /// <summary>
        /// Isoympyrän interpolaatio (slerp) yksikkösuuntien a ja b välillä, e = 0 → a, 1 → b. Vastapisteille
        /// (a ≈ −b) valitaan kiertoakseliksi jokin a:ta vastaan kohtisuora.
        /// </summary>
        public static (double x, double y, double z) Isoympyra((double x, double y, double z) a, (double x, double y, double z) b, double e)
        {
            a = Normalisoi(a); b = Normalisoi(b);
            double d = Math.Min(1.0, Math.Max(-1.0, Piste(a, b)));
            if (d > 0.999999) return Normalisoi(Lerp(a, b, e));
            if (d < -0.999999)
            {
                // Vastapiste: kierretään a:n kohtisuoran t kautta (puoliympyrä).
                var t = Math.Abs(a.x) < 0.9 ? Normalisoi(Risti(a, (1.0, 0.0, 0.0))) : Normalisoi(Risti(a, (0.0, 1.0, 0.0)));
                double k = e * Math.PI;
                return Normalisoi((a.x * Math.Cos(k) + t.x * Math.Sin(k), a.y * Math.Cos(k) + t.y * Math.Sin(k),
                                   a.z * Math.Cos(k) + t.z * Math.Sin(k)));
            }
            double w = Math.Acos(d), sw = Math.Sin(w);
            double ka = Math.Sin((1.0 - e) * w) / sw, kb = Math.Sin(e * w) / sw;
            return Normalisoi((a.x * ka + b.x * kb, a.y * ka + b.y * kb, a.z * ka + b.z * kb));
        }

        /// <summary>
        /// Värilämpötila (K) → sRGB 0–1 (Tanner Hellandin sovite mustan kappaleen käyrään, 1000–40 000 K).
        /// 3200 K (lyhdyn/hehkulampun valo) ≈ (1, 0,72, 0,48).
        /// </summary>
        public static (double r, double g, double b) Kelvin(double k)
        {
            double t = Math.Min(400.0, Math.Max(10.0, k / 100.0));
            double r = t <= 66.0 ? 255.0 : 329.698727446 * Math.Pow(t - 60.0, -0.1332047592);
            double g = t <= 66.0 ? 99.4708025861 * Math.Log(t) - 161.1195681661 : 288.1221695283 * Math.Pow(t - 60.0, -0.0755148492);
            double b = t >= 66.0 ? 255.0 : t <= 19.0 ? 0.0 : 138.5177312231 * Math.Log(t - 10.0) - 305.0447927307;
            return (Rajaa(r / 255.0), Rajaa(g / 255.0), Rajaa(b / 255.0));
        }

        public static double Piste((double x, double y, double z) a, (double x, double y, double z) b) => a.x * b.x + a.y * b.y + a.z * b.z;

        static (double x, double y, double z) Risti((double x, double y, double z) a, (double x, double y, double z) b) =>
            (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

        static (double x, double y, double z) Lerp((double x, double y, double z) a, (double x, double y, double z) b, double e) =>
            (a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e, a.z + (b.z - a.z) * e);

        static (double x, double y, double z) Normalisoi((double x, double y, double z) v)
        {
            double l = Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            return l > 1e-12 ? (v.x / l, v.y / l, v.z / l) : (0.0, 0.0, 1.0);
        }

        static double Rajaa(double v) => Math.Min(1.0, Math.Max(0.0, v));
    }
}
