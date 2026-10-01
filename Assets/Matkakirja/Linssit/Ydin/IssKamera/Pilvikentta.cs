// ISS-KAMERA: kesäpäivän kumpupilvikenttä pelaajan kuvaan (omistaja 1.10.2026: "aidon kesäpäivän kumpupilvikenttä —
// kokovaihtelu, ryhmät ja pilvijonot, pehmeät reunat, rannikolla ja meren yllä selkeä vyöhyke, kevyemmät varjot auringon
// kulman mukaan"). Sentinel-2-kuvat ovat pilvettömiä, joten pilvet lasketaan kuvaan erikseen. Sama malli kuin
// Helsingin esimerkkikuvan pilvet2.py (proto-3d/lokit/linssiseppa2-skriptit-20261001), mutta kohina on deterministinen
// funktio maailmankoordinaateista: laatat voi laskea erikseen ja missä järjestyksessä tahansa ilman saumoja.
//
//   peitto    0,20 + 0,11·iso(100 km) + 0,07·meso(21 km), enintään 0,42, × rantakerroin (maa-osuus ~8 km säteellä)
//   kenttä    0,60·jonot(3,7 km, 3,5× tuulen suuntaan) + 0,70·solut(1,3 km) + 0,32·hieno(0,5 km), kynnys peiton kvantiilista
//   valo      auringon puoli kirkas, varjopuoli harmaampi; varjo pilven korkeudelta 1,2–1,8 km auringon atsimuutin mukaan
using System;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class Pilvikentta
    {
        /// <summary>Maa-osuus 0…1 pisteessä (lat, lon), valmiiksi ~8 km:n sumennuksella; null = kaikki maata.</summary>
        public Func<double, double, double> MaaOsuus;
        /// <summary>Auringon atsimuutti (astetta, pohjoisesta myötäpäivään) ja korkeus (astetta).</summary>
        public double AurinkoAz = 290, AurinkoKorkeus = 16;
        /// <summary>Pilvijonojen suunta (astetta itään pohjoisesta, tuuli puhaltaa tähän suuntaan) ja siemen.</summary>
        public double TuuliAst = 72;
        public int Siemen = 1873;
        public double VarjonVoima = 0.35;
        /// <summary>
        /// Peiton kerroin (Päätoimittaja 1.10.: "muutama kesäpilvi varjoineen"; julisteessa valkoiset läiskät Suomen ja Viron
        /// päällä): 0,6 → keskimäärin ~8–12 % pilveä maalla (aiemmin ~15–20 %).
        /// </summary>
        public double PeittoKerroin = 0.6;

        const double Iso = 100000, Meso = 21000, Jono = 3700, Solu = 1300, Hieno = 500, Venytys = 3.5;
        readonly double[] kynnys = new double[201];
        double hajonta = 1;

        public Pilvikentta() { }

        /// <summary>Kalibroi kentän hajonnan ja peiton kvantiilit (kerran ennen käyttöä; ~40 000 näytettä).</summary>
        public Pilvikentta Kalibroi()
        {
            var r = new Random(Siemen); int n = 40000; var v = new double[n];
            hajonta = 1;
            double s2 = 0;
            for (int i = 0; i < n; i++) { v[i] = Raaka(r.NextDouble() * 4e6, r.NextDouble() * 4e6); s2 += v[i] * v[i]; }
            hajonta = Math.Sqrt(s2 / n);
            for (int i = 0; i < n; i++) v[i] /= hajonta;
            Array.Sort(v);
            for (int k = 0; k <= 200; k++) { double c = k / 200.0; kynnys[k] = v[Math.Min(n - 1, (int)((1 - c) * (n - 1)))]; }
            return this;
        }

        /// <summary>Paikallinen metrikoordinaatti (x itään, y pohjoiseen) pallolla: riittää kohinan syötteeksi.</summary>
        static (double x, double y) Metrit(double lat, double lon)
            => (lon * Math.PI / 180 * 6371000 * Math.Cos(lat * Math.PI / 180), lat * Math.PI / 180 * 6371000);

        /// <summary>Pilven alfa (0…1), kirkkaus (0,6…1) ja maan varjo (0…1) pisteessä.</summary>
        public (double alfa, double kirkkaus, double varjo) Nayte(double lat, double lon, double peittoK = 1)
        {
            var (x, y) = Metrit(lat, lon);
            double d = Tiheys(x, y, lat, lon, true, peittoK);
            double alfa = Askel(0, 0.55, d) * 0.97;
            // aurinkoa kohti 2,5 × 153 m: jos tiheys kasvaa aurinkoa kohti, olemme varjopuolella
            double az = AurinkoAz * Math.PI / 180, sx = Math.Sin(az), sy = Math.Cos(az);
            double dk = Tiheys(x + sx * 380, y + sy * 380, lat, lon, true, peittoK);
            double kirkkaus = Math.Max(0.70, Math.Min(1.0, 0.95 - 0.55 * (dk - d)));
            double varjo = 0;
            double tanEl = Math.Tan(Math.Max(3, AurinkoKorkeus) * Math.PI / 180);
            // Pilven paksuus 1,2–1,8 km seitsemällä korkeudella (kolme erillistä tuotti kolminkertaiset varjot).
            for (int i = 0; i < 7; i++)
            {
                double L = (1200 + i * 100) / tanEl;
                // Varjo pehmeästä kentästä (ilman hienorakennetta): ohuet piirteet piirsivät kampamaisia viivoja.
                double dv = Tiheys(x + sx * L, y + sy * L, lat, lon, false, peittoK);
                varjo = Math.Max(varjo, Askel(-0.25, 0.65, dv));
            }
            return (alfa, kirkkaus, varjo * VarjonVoima);
        }

        /// <summary>
        /// Lähikuvan pilvi (400 mm, laatan pikseli ≤ 40 m; laitekoe 2: pilvet pehmeinä möykkyinä): alfa ja kirkkaus pikselikohtaisesti
        /// kahdella lisäoktaavilla (200 m ja 80 m) — kumpupilven reunan kukkakaalirakenne ja kirkkaat huiput; varjo hilasta.
        /// </summary>
        public (double alfa, double kirkkaus) Lahi(double lat, double lon, double peittoK = 1)
        {
            var (x, y) = Metrit(lat, lon);
            double d0 = Tiheys(x, y, lat, lon, true, peittoK);
            if (d0 < -1.2) return (0, 1);   // kaukana pilvestä: lisäoktaavit eivät nosta kynnyksen yli
            double yksi = Kohina(x / 200, y / 200, 31), kaksi = Kohina(x / 80, y / 80, 32);
            double d = d0 + 0.22 * yksi + 0.10 * kaksi;
            double alfa = Askel(-0.05, 0.30, d) * 0.97;
            double az = AurinkoAz * Math.PI / 180, sx = Math.Sin(az), sy = Math.Cos(az);
            double dk = Tiheys(x + sx * 380, y + sy * 380, lat, lon, true, peittoK) + 0.22 * Kohina((x + sx * 120) / 200, (y + sy * 120) / 200, 31);
            double kirkkaus = Math.Max(0.66, Math.Min(1.0, 0.96 - 0.45 * (dk - d) + 0.04 * kaksi));
            return (alfa, kirkkaus);
        }

        double Tiheys(double x, double y, double lat, double lon, bool hieno = true, double peittoK = 1)
        {
            double ranta = MaaOsuus == null ? 1 : Askel(0.80, 0.97, MaaOsuus(lat, lon));
            double peitto = Math.Max(0, Math.Min(0.42 * Math.Max(1, peittoK), (0.20 + 0.11 * Kohina(x / Iso, y / Iso, 11) + 0.07 * Kohina(x / Meso, y / Meso, 12)) * peittoK)) * ranta * PeittoKerroin;
            if (peitto <= 0.001) return -10;
            double k = peitto * 200; int i = (int)k; double t = k - i;
            double T = i >= 200 ? kynnys[200] : kynnys[i] * (1 - t) + kynnys[i + 1] * t;
            return Raaka(x, y, hieno) / hajonta - T;
        }

        double Raaka(double x, double y, bool hieno = true)
        {
            double a = TuuliAst * Math.PI / 180, ca = Math.Cos(a), sa = Math.Sin(a);
            double pitka = x * sa + y * ca, poikki = x * ca - y * sa;   // tuulen suunta ja poikittain
            return 0.60 * Kohina(pitka / (Jono * Venytys), poikki / Jono, 21) + 0.70 * Kohina(x / Solu, y / Solu, 22) + (hieno ? 0.32 * Kohina(x / Hieno, y / Hieno, 23) : 0);
        }

        static double Askel(double a, double b, double x) { double t = Math.Max(0, Math.Min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

        /// <summary>Arvokohina (kuutiollinen interpolointi, hajonta ~1 normitettuna) hilasta, jonka solu = 1.</summary>
        double Kohina(double x, double y, int kanava)
        {
            double fx = Math.Floor(x), fy = Math.Floor(y); long ix = (long)fx, iy = (long)fy; double tx = x - fx, ty = y - fy;
            double r = 0;
            for (int j = -1; j <= 2; j++)
            {
                double rivi = 0;
                for (int i = -1; i <= 2; i++) rivi += Hila(ix + i, iy + j, kanava) * Kuutio(tx - i);
                r += rivi * Kuutio(ty - j);
            }
            return r * 1.9;   // Catmull-Rom-interpoloidun tasajakauman hajonta ~0,53 → ~1
        }

        double Hila(long x, long y, int kanava)
        {
            unchecked
            {
                ulong h = (ulong)x * 0x9E3779B97F4A7C15UL ^ (ulong)y * 0xC2B2AE3D27D4EB4FUL ^ (ulong)(Siemen * 131 + kanava) * 0x165667B19E3779F9UL;
                h ^= h >> 33; h *= 0xFF51AFD7ED558CCDUL; h ^= h >> 33; h *= 0xC4CEB9FE1A85EC53UL; h ^= h >> 33;
                return (h >> 11) * (1.0 / (1UL << 53)) * 2 - 1;
            }
        }

        /// <summary>Catmull-Rom-paino etäisyydelle t.</summary>
        static double Kuutio(double t)
        {
            t = Math.Abs(t);
            if (t < 1) return 1.5 * t * t * t - 2.5 * t * t + 1;
            if (t < 2) return -0.5 * t * t * t + 2.5 * t * t - 4 * t + 2;
            return 0;
        }
    }
}
