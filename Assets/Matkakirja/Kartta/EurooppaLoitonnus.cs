using System;

namespace Matkakirja
{
    /// <summary>
    /// EUROOPPA-LOITONNUS (omistaja 11.10.2026 PT:n kautta, juna 182, kuumailmapallojen kohta c): kun pelaaja loitontaa
    /// pääkartalla niin, että koko Eurooppa näkyy, huntu pysyy, kaupunkien kuumailmapallot näkyvät, kohdekaupungit näkyvät
    /// himmeinä pisteinä ja maiden rajat kevyesti. Puhdas laskenta (ei UnityEngineä), testit
    /// Kartta-testit/Testit/EurooppaLoitonnusTestit.cs; käyttö PalloKierto (katto ja panorointi), Varitaso (hunnun kaukoraja),
    /// Rajat (kynnys ja peitto), KaupunkiMerkit (himmeät pisteet) ja Komennot ("eurooppa").
    ///
    ///  - KATTO: pelaajan eleiden loitonnuksen katto on suurempi maan katosta ja korkeudesta, jolla <see cref="Laatikko"/>
    ///    mahtuu kameran kuvaan laitteen kuvasuhteella (<see cref="SovitusKorkeus"/>, vara <see cref="Vara"/> UI-kalusteille).
    ///    Voimassa vain, kun pelaajan maan rajat ovat voimassa ja maa on Euroopassa; kehittäjän maailmatila ennallaan.
    ///  - PANOROINTI: maan katon yläpuolella panorointiraja laajenee pehmeästi kohti Euroopan laatikkoa (<see cref="Osuus"/>,
    ///    <see cref="Laajenna"/>); lähennettäessä raja kutistuu jatkuvasti, joten kamera palaa maahan ilman hyppyä.
    ///  - HUNTU: kaukoraja (huntu pois) vähintään <see cref="HunnunVara"/> × Euroopan katto (<see cref="HunnunKaukoraja"/>).
    ///  - RAJAT: kynnys <see cref="RajojenKynnys"/> px/° (oli 30). Kaukana (alle 30 px/°) ohut YHTENÄINEN viiva matalalla
    ///    peitolla (<see cref="RajojenPeitto"/>, <see cref="RajatYhtenaisena"/>; PT 11.10. 15.5x "huntu + pisteet + rajat"):
    ///    katkoviivan jakso (2,1 km) on silloin alle pikselin, jolloin varjostin liu'utti sen keskiarvoon 1/3 × peitto ja rajat
    ///    näkyivät hunnun päällä vain paikoin. Rajakerros piirtyy laattojen ja hunnun jälkeen (jono 2996 > 2000).
    ///  - PISTEET: maan katon yläpuolella (<see cref="Kaukana"/>) Euroopan laudan kaupungit himmeinä pisteinä ilman nimeä.
    /// </summary>
    public static class EurooppaLoitonnus
    {
        /// <summary>Euroopan laatikko asteina: Islanti (−24,5°) … Moskova ja Krim (≈ 40°), Kreeta ja Kypros (34,6°) … Nordkapp (71,2°).</summary>
        public const double LatMin = 34.5, LatMax = 71.2, LonMin = -25.0, LonMax = 41.0;
        public const double KeskiLat = (LatMin + LatMax) / 2, KeskiLon = (LonMin + LonMax) / 2;
        /// <summary>Kuvan vara: yläpalkki, kartussi ja muut kalusteet peittävät reunoja, joten Eurooppa täyttää ~92 % kuvasta.</summary>
        public const double Vara = 1.08;
        /// <summary>Kaukonäkymän kynnys: korkeus &gt; maan katto × tämä (himmeät pisteet, kirjaus).</summary>
        public const double KaukoKynnys = 1.1;
        /// <summary>Hunnun kaukorajan vara Euroopan katon yli (hystereesi 0,85 pysyy silti katon yläpuolella).</summary>
        public const double HunnunVara = 1.3;
        /// <summary>Rajojen kynnys Euroopan loitonnuksessa (laitepikseliä/aste); webin VEKTORIT_RAJAT_PX_ASTE 30 muualla.</summary>
        public const double RajojenKynnys = 15;
        /// <summary>Kaukana yhtenäisen rajaviivan peitto osuutena webin rajapeitosta (hillitty: houkuttimet erottuvat).</summary>
        public const double RajojenKaukoOsuus = 0.4;
        public const double RajojenLahiTiheys = 30;

        const double Rad = Math.PI / 180.0;
        const int Naytteita = 24, Haarukat = 40;

        /// <summary>Onko piste Euroopan laatikossa.</summary>
        public static bool Euroopassa(double lat, double lon) =>
            lat >= LatMin && lat <= LatMax && lon >= LonMin && lon <= LonMax;

        /// <summary>
        /// Kameran korkeus maan säteinä (pallo R = 1), jolla koko <see cref="Laatikko"/> mahtuu kuvaan, kun kamera katsoo
        /// laatikon keskipistettä pohjoinen ylös: laatikon reunojen näytteet ovat pallon näkyvällä puolella ja kuvakulman sisällä
        /// varalla <paramref name="vara"/>. fovPysty = pystykuvakulma asteina, kuvasuhde = leveys / korkeus. NaN, jos ei ratkea.
        /// </summary>
        public static double SovitusKorkeus(double fovPysty, double kuvasuhde, double vara = Vara)
        {
            if (!(fovPysty > 0 && fovPysty < 180) || !(kuvasuhde > 0) || !(vara > 0)) return double.NaN;
            double tanV = Math.Tan(fovPysty * 0.5 * Rad) / vara, tanH = tanV * kuvasuhde;
            double ala = 1.0, yla = 60.0;
            if (!Mahtuu(yla, tanV, tanH)) return double.NaN;
            for (int i = 0; i < Haarukat; i++)
            {
                double d = (ala + yla) / 2;
                if (Mahtuu(d, tanV, tanH)) yla = d; else ala = d;
            }
            return yla - 1.0;
        }

        /// <summary>Mahtuuko laatikko kuvaan etäisyydeltä d (pallon keskipisteestä, säteinä).</summary>
        static bool Mahtuu(double d, double tanV, double tanH)
        {
            double la = KeskiLat * Rad, lo = KeskiLon * Rad;
            double cx = Math.Cos(la) * Math.Cos(lo), cy = Math.Cos(la) * Math.Sin(lo), cz = Math.Sin(la);
            double ex = -Math.Sin(lo), ey = Math.Cos(lo);
            double nx = -Math.Sin(la) * Math.Cos(lo), ny = -Math.Sin(la) * Math.Sin(lo), nz = Math.Cos(la);
            for (int reuna = 0; reuna < 4; reuna++)
                for (int i = 0; i <= Naytteita; i++)
                {
                    double t = (double)i / Naytteita;
                    double lat = reuna == 0 ? LatMin : reuna == 1 ? LatMax : LatMin + (LatMax - LatMin) * t;
                    double lon = reuna == 2 ? LonMin : reuna == 3 ? LonMax : LonMin + (LonMax - LonMin) * t;
                    double pl = lat * Rad, po = lon * Rad;
                    double px = Math.Cos(pl) * Math.Cos(po), py = Math.Cos(pl) * Math.Sin(po), pz = Math.Sin(pl);
                    double pc = px * cx + py * cy + pz * cz;
                    if (pc < 1.0 / d) return false; // horisontin takana
                    double z = d - pc;
                    double vx = px - d * cx, vy = py - d * cy, vz = pz - d * cz;
                    double x = vx * ex + vy * ey, y = vx * nx + vy * ny + vz * nz;
                    if (Math.Abs(x) / z > tanH || Math.Abs(y) / z > tanV) return false;
                }
            return true;
        }

        /// <summary>
        /// Eleiden loitonnuksen katto metreinä: suurempi maan katosta ja Euroopan sovituksesta, enintään koko pallo. Ilman maan
        /// kattoa (≤ 0) tai sovitusta (NaN) maan katto ennallaan.
        /// </summary>
        public static double Katto(double maanKattoM, double euroopanM, double maxM)
        {
            if (!(maanKattoM > 0) || double.IsNaN(euroopanM)) return maanKattoM;
            double k = Math.Max(maanKattoM, euroopanM);
            return maxM > 0 ? Math.Min(k, Math.Max(maxM, maanKattoM)) : k;
        }

        /// <summary>Kaukonäkymä: korkeus selvästi maan katon yläpuolella (himmeät pisteet, kirjaus).</summary>
        public static bool Kaukana(double korkeusM, double maanKattoM) => maanKattoM > 0 && korkeusM > maanKattoM * KaukoKynnys;

        /// <summary>Panorointirajan laajennuksen osuus 0–1: maan katolla 0, Euroopan katolla 1 (smoothstep).</summary>
        public static double Osuus(double korkeusM, double maanKattoM, double kattoM)
        {
            if (!(maanKattoM > 0) || !(kattoM > maanKattoM)) return 0;
            double t = Math.Max(0, Math.Min(1, (korkeusM - maanKattoM) / (kattoM - maanKattoM)));
            return t * t * (3 - 2 * t);
        }

        /// <summary>
        /// Maan panorointiraja laajennettuna osuudella <paramref name="osuus"/> kohti maan rajan ja Euroopan laatikon unionia.
        /// pituus = false (raja kääntyy päivämäärärajan yli): pituusraja ennallaan.
        /// </summary>
        public static (double LatMin, double LatMax, double LngMin, double LngMax) Laajenna(double latMin, double latMax,
            double lngMin, double lngMax, bool pituus, double osuus)
        {
            double o = Math.Max(0, Math.Min(1, osuus));
            if (o <= 0) return (latMin, latMax, lngMin, lngMax);
            double Kohti(double a, double b) => a + (b - a) * o;
            latMin = Kohti(latMin, Math.Min(latMin, LatMin));
            latMax = Kohti(latMax, Math.Max(latMax, LatMax));
            if (pituus)
            {
                lngMin = Kohti(lngMin, Math.Min(lngMin, LonMin));
                lngMax = Kohti(lngMax, Math.Max(lngMax, LonMax));
            }
            return (latMin, latMax, lngMin, lngMax);
        }

        /// <summary>Hunnun kaukoraja (huntu pois sen yläpuolella): vähintään <see cref="HunnunVara"/> × Euroopan katto.</summary>
        public static double HunnunKaukoraja(double kaukoKorkeusM, double euroopanKattoM) =>
            euroopanKattoM > 0 ? Math.Max(kaukoKorkeusM, euroopanKattoM * HunnunVara) : kaukoKorkeusM;

        /// <summary>Rajojen piirtokynnys (px/°): Euroopan loitonnuksen ollessa sallittu <see cref="RajojenKynnys"/>, muuten oletus.</summary>
        public static double RajojenMinTiheys(bool eurooppaVoimassa, double oletus) =>
            eurooppaVoimassa ? Math.Min(oletus, RajojenKynnys) : oletus;

        /// <summary>Piirretäänkö raja kaukana yhtenäisenä (ei katkoviivaa): alle <see cref="RajojenLahiTiheys"/> px/°.</summary>
        public static bool RajatYhtenaisena(double tiheys) => !double.IsNaN(tiheys) && tiheys < RajojenLahiTiheys;

        /// <summary>Rajojen peitto: lähellä (≥ 30 px/°) webin katkoviivan peitto ennallaan, kaukana yhtenäinen viiva
        /// <see cref="RajojenKaukoOsuus"/> × peitto (tehollisesti hieman katkoviivan keskiarvoa 1/3 × peitto vahvempi, tasainen).</summary>
        public static float RajojenPeitto(float peitto, double tiheys) =>
            RajatYhtenaisena(tiheys) ? (float)(peitto * RajojenKaukoOsuus) : peitto;

        /// <summary>Rajakerroksen piirtojono (Rajat.RajaJono): hunnun päällä, kun jono on laattojen (2000) jälkeen.</summary>
        public static bool RajatHunnunPaalla(int jono) => jono > Houkuttimet.LaattaJono;

        /// <summary>Web Mercator -laattojen määrä alueella tasolla z (kirjaus: arvio hunnun ja pohjan laattamäärästä).</summary>
        public static int LaattojaAlueella(double lat0, double lat1, double lon0, double lon1, int z)
        {
            if (z < 0 || double.IsNaN(lat0) || double.IsNaN(lat1) || double.IsNaN(lon0) || double.IsNaN(lon1)) return 0;
            int n = 1 << Math.Min(z, 20);
            double Y(double lat)
            {
                double l = Math.Max(-85.0511, Math.Min(85.0511, lat)) * Rad;
                return (1 - Math.Log(Math.Tan(l) + 1 / Math.Cos(l)) / Math.PI) / 2 * n;
            }
            double leveys = Math.Min(360, Math.Max(0, lon1 - lon0));
            int x = Math.Min(n, (int)Math.Floor((lon0 + 180) / 360 * n + leveys / 360 * n) - (int)Math.Floor((lon0 + 180) / 360 * n) + 1);
            int y0 = (int)Math.Floor(Y(Math.Max(lat0, lat1))), y1 = (int)Math.Floor(Y(Math.Min(lat0, lat1)));
            int y = Math.Min(n, Math.Max(y0, y1) - Math.Min(y0, y1) + 1);
            return Math.Max(0, x) * Math.Max(0, y);
        }
    }
}
