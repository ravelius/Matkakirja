using System;
using System.Text;

namespace Matkakirja
{
    /// <summary>
    /// LENTOPELI — Tiger Moth -lento omana pelinä (omistaja hyväksyi 27.9.2026; suunnitelma
    /// docs/raportit/lentopeli-suunnitelma-20260927.md, vaihe 1: Linssisepän ydin). Puhdas laskenta ilman UnityEngineä
    /// (Kartta-testit/Testit/LentopeliTestit.cs). Pelimäinen, ei simulaattori; yksiköt km, km/s, astetta ja sekunteja.
    ///   - Lentomalli (<see cref="Askel"/>): kallistus ja nokka hakeutuvat sauvan tavoitteeseen, kallistus kääntää
    ///     koordinoidusti (40 × tan(kallistus) °/s), nokan nosto vaihtaa nopeutta korkeuteen, pehmeä sakkaus toipuu itse,
    ///     tuuli siirtää maan suhteen ja moottorin sammuttua kone liitää (1:8). Avustettu tila oikaisee sormen noustessa.
    ///   - Polttoaine [O]: täysi tankki matkakaasulla 360 s ja noin 800 km (2,2 km/s × 360 s = 792 km); talous 480 s,
    ///     täysi kaasu 240 s. Paluurengas (<see cref="PaluuSadeKm"/>) talouskaasulla nykyisellä tuulella.
    ///   - Rahat [O]: tankki 24 £, sakot 40 / 80 £ (× hintataso), tehtävät +20 / 25 / 35 % tankista.
    ///   - Rengasrata (<see cref="Rengasrata"/>): 5–7 rengasta 25–45 km:n kehällä, deterministinen siemenestä
    ///     (oma kokonaislukuhajautus, ei System.Randomia). Läpäisy vain tason läpi renkaan sisältä oikeaan suuntaan.
    /// </summary>
    public static class Lentopeli
    {
        public const double R = 6371.0;
        const double Rad = Math.PI / 180.0;

        // ---------------------------------------------------------------- vakiot

        /// <summary>Sauvan täysi poikkeama: kallistus 45°, nokka 25°.</summary>
        public const double MaksKallistus = 45.0, MaksNokka = 25.0;
        /// <summary>Aikavakiot (s): kallistus 0,25, nokka 0,3, oikaisu (sormi irti, avustettu) 0,5.</summary>
        public const double KallistusTau = 0.25, NokkaTau = 0.3, OikaisuTau = 0.5;
        /// <summary>Oikaisun vähimmäisnopeus (°/s): lopun hidas eksponenttihäntä oikaistaan suoraan nollaan, jotta
        /// 45°:n kallistus on oikaistu 1,5 s:ssa (pelkkä τ 0,5 jättäisi 2,2°).</summary>
        public const double OikaisuMinNopeus = 10.0;
        /// <summary>Kääntymisnopeus °/s = 40 × tan(kallistus).</summary>
        public const double KaannosKerroin = 40.0;
        /// <summary>Nopeuden aikavakio moottori käynnissä (s) ja painovoiman kaltainen nokkatermi (km/s²).</summary>
        public const double NopeusTau = 3.0, Painovoima = 0.6;
        /// <summary>Liito: tavoitenopeus 0 aikavakiolla 16 s, jolloin liitonopeudella 1,2 km/s vajoama on v/8
        /// (τ 3 s antaisi liitosuhteen 1:2). Avustettu tila pitää nopeuden ≥ 0,9 laskemalla nokkaa.</summary>
        public const double LiitoTau = 16.0, LiitoNopeus = 1.2, LiitoMinNopeus = 0.9, LiitoNokkaKerroin = 40.0;
        /// <summary>Sakkaus: alle 1,0 km/s nokka yli 5° → 1,5 s nokka −10°:een.</summary>
        public const double SakkausNopeus = 1.0, SakkausNokka = 5.0, SakkausKesto = 1.5, SakkausNokkaAlas = -10.0;
        /// <summary>Täysi tankki matkakaasulla (s); kulutus/s = kerroin / 360.</summary>
        public const double TankkiMatkallaS = 360.0;
        /// <summary>Paluurenkaan kaasu: talous.</summary>
        public const Kaasu PaluuKaasu = Kaasu.Talous;

        /// <summary>Rahat (£ × maan hintataso) ja tehtäväpalkkiot (osuus tankista) [O].</summary>
        public const double TankkiPuntaa = 24.0, SakkoMuuallePuntaa = 40.0, SakkoPakkolaskuPuntaa = 80.0;
        public const double PalkkioRengasrata = 0.20, PalkkioKuvauslento = 0.25, PalkkioNavigointi = 0.35;

        /// <summary>Rengasrata: renkaat kehällä 25–45 km, korkeus 1,5–5 km, säde 7,5 km (3 × siipiväli 5 km / 2).</summary>
        public const double RataMinKm = 25.0, RataMaksKm = 45.0, RengasMinKorkeus = 1.5, RengasMaksKorkeus = 5.0;
        public const double Siipivali = 5.0, RenkaanSade = 3.0 * Siipivali / 2.0;

        // ---------------------------------------------------------------- tyypit

        public enum Kaasu { Tyhjakaynti, Talous, Matka, Taysi }

        public enum Tehtava { Rengasrata, Kuvauslento, Navigointi }

        /// <summary>Koneen tila. Korkeus merenpinnasta (km), suunta kompassiasteina (0 = pohjoinen, myötäpäivään),
        /// kallistus + = oikealle, nokka + = ylös, polttoaine 0..1 tankista, Sakkaus = jäljellä oleva toipumisaika (s).</summary>
        public struct Lentotila
        {
            public double Lat, Lon, KorkeusKm, Suunta, NopeusKms, Kallistus, Nokka, Polttoaine, AikaS, Sakkaus;
            public bool Moottori;

            /// <summary>Lähtötila: täysi tankki, moottori käy, matkanopeus, vaakalento.</summary>
            public static Lentotila Lahto(double lat, double lon, double korkeusKm, double suunta, double polttoaine = 1.0)
                => new Lentotila
                {
                    Lat = lat, Lon = lon, KorkeusKm = korkeusKm, Suunta = suunta, NopeusKms = Tavoitenopeus(Kaasu.Matka),
                    Polttoaine = polttoaine, Moottori = polttoaine > 0,
                };
        }

        /// <summary>Pelaajan ohjaus: peukalosauva (−1..1), sormi sauvalla, kaasuvivun pykälä ja avustettu tila
        /// (oletus true; vapaa tila asetuksista poistaa oikaisun ja liitoavun).</summary>
        public struct Ohjaus
        {
            public double SauvaX, SauvaY;
            public bool Sormi;
            public Kaasu Kaasu;
            bool vapaa;
            public bool Avustettu { get => !vapaa; set => vapaa = !value; }
        }

        /// <summary>Tuuli: suunta josta puhaltaa (°) ja nopeus (km/s).</summary>
        public struct Tuuli
        {
            public double SuuntaAst, NopeusKms;
            public Tuuli(double suuntaAst, double nopeusKms) { SuuntaAst = suuntaAst; NopeusKms = nopeusKms; }
        }

        /// <summary>Tehtävärengas: keskipiste, korkeus, läpilentosuunta (tason normaali) ja säde.</summary>
        public struct Rengas
        {
            public double Lat, Lon, KorkeusKm, SuuntaAst, SadeKm;
        }

        /// <summary>Käynnissä oleva lento: tila, rengasrata ja koti (lähtörengas).</summary>
        public struct Lento
        {
            public Lentotila Tila;
            public Rengas[] Rata;
            public int Seuraava, Lapaisty;
            public double KotiLat, KotiLon;
            /// <summary>Rata läpäisty (palkkio annettu).</summary>
            public bool RataValmis => Rata != null && Rata.Length > 0 && Seuraava >= Rata.Length;
        }

        // ---------------------------------------------------------------- kaasu ja polttoaine

        public static double Tavoitenopeus(Kaasu k) => k switch
        {
            Kaasu.Tyhjakaynti => 0.9, Kaasu.Talous => 1.9, Kaasu.Matka => 2.2, _ => 2.7,
        };

        public static double Kulutuskerroin(Kaasu k) => k switch
        {
            Kaasu.Tyhjakaynti => 0.3, Kaasu.Talous => 0.75, Kaasu.Matka => 1.0, _ => 1.5,
        };

        /// <summary>Polttoaineen kulutus tankkia sekunnissa.</summary>
        public static double Kulutus(Kaasu k) => Kulutuskerroin(k) / TankkiMatkallaS;

        // ---------------------------------------------------------------- lentomalli

        /// <summary>Yksi aika-askel (s). Järjestys: polttoaine, kallistus, nokka (sakkaus ja liitoapu), nopeus, korkeus,
        /// suunta ja paikka (isoympyrä pallolla R = 6371 km maanopeuden suuntaan).</summary>
        public static Lentotila Askel(Lentotila s, double dt, Ohjaus o, Tuuli t)
        {
            if (!(dt > 0)) return s;
            double sx = Rajaa(o.SauvaX, -1, 1), sy = Rajaa(o.SauvaY, -1, 1);
            bool avu = o.Avustettu;

            if (s.Moottori)
            {
                s.Polttoaine -= Kulutus(o.Kaasu) * dt;
                if (s.Polttoaine <= 0) { s.Polttoaine = 0; s.Moottori = false; }
            }

            // Kallistus: sauvan tavoite; sormi irti → avustettu oikaisee, vapaa pitää.
            if (o.Sormi) s.Kallistus = Lahesty(s.Kallistus, sx * MaksKallistus, dt, KallistusTau, 0);
            else if (avu) s.Kallistus = Lahesty(s.Kallistus, 0, dt, OikaisuTau, OikaisuMinNopeus);

            // Nokka: sakkaus ohittaa ohjauksen; liidossa avustettu tila rajaa nokan ylärajan nopeuden mukaan.
            if (s.Sakkaus > 0)
            {
                s.Nokka = Lahesty(s.Nokka, SakkausNokkaAlas, dt, NokkaTau, 0);
                s.Sakkaus = Math.Max(0, s.Sakkaus - dt);
            }
            else
            {
                double tavoite = s.Nokka, tau = NokkaTau, minNop = 0;
                if (o.Sormi) tavoite = sy * MaksNokka;
                else if (avu) { tavoite = 0; tau = OikaisuTau; minNop = OikaisuMinNopeus; }
                if (!s.Moottori && avu)
                {
                    double yla = LiitoKulma + LiitoNokkaKerroin * (s.NopeusKms - LiitoNopeus);
                    if (tavoite > yla) tavoite = yla;
                }
                s.Nokka = Lahesty(s.Nokka, tavoite, dt, tau, minNop);
                if (s.NopeusKms < SakkausNopeus && s.Nokka > SakkausNokka) s.Sakkaus = SakkausKesto;
            }

            // Nopeus ja korkeus: energia vaihtuu korkeuteen nokan kautta.
            double nr = s.Nokka * Rad;
            double vt = s.Moottori ? Tavoitenopeus(o.Kaasu) : 0;
            double tauV = s.Moottori ? NopeusTau : LiitoTau;
            s.NopeusKms = Math.Max(0, s.NopeusKms + ((vt - s.NopeusKms) / tauV - Painovoima * Math.Sin(nr)) * dt);
            s.KorkeusKm += s.NopeusKms * Math.Sin(nr) * dt;

            // Koordinoitu käännös.
            s.Suunta = Kulma360(s.Suunta + KaannosKerroin * Math.Tan(Rajaa(s.Kallistus, -89, 89) * Rad) * dt);

            // Paikka: ilmanopeuden vaakakomponentti + tuuli (puhaltaa SuuntaAst:sta poispäin).
            double vh = s.NopeusKms * Math.Cos(nr), sr = s.Suunta * Rad, tr = (t.SuuntaAst + 180.0) * Rad;
            double pohj = vh * Math.Cos(sr) + t.NopeusKms * Math.Cos(tr);
            double ita = vh * Math.Sin(sr) + t.NopeusKms * Math.Sin(tr);
            double matka = Math.Sqrt(pohj * pohj + ita * ita) * dt;
            if (matka > 0) Siirra(s.Lat, s.Lon, Math.Atan2(ita, pohj) / Rad, matka, out s.Lat, out s.Lon);

            s.AikaS += dt;
            return s;
        }

        /// <summary>Tasaisen liidon nokkakulma (°): sin = −1/8.</summary>
        public static readonly double LiitoKulma = -Math.Asin(1.0 / 8.0) / Rad;

        // ---------------------------------------------------------------- pallo

        /// <summary>Isoympyrämatka (km), haversine.</summary>
        public static double EtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            double f1 = lat1 * Rad, f2 = lat2 * Rad, df = (lat2 - lat1) * Rad, dl = (lon2 - lon1) * Rad;
            double a = Math.Sin(df / 2) * Math.Sin(df / 2) + Math.Cos(f1) * Math.Cos(f2) * Math.Sin(dl / 2) * Math.Sin(dl / 2);
            return 2 * R * Math.Asin(Math.Min(1, Math.Sqrt(a)));
        }

        /// <summary>Alkusuuntima pisteestä 1 pisteeseen 2 (kompassi°, 0..360).</summary>
        public static double SuuntimaAst(double lat1, double lon1, double lat2, double lon2)
        {
            double f1 = lat1 * Rad, f2 = lat2 * Rad, dl = (lon2 - lon1) * Rad;
            double y = Math.Sin(dl) * Math.Cos(f2);
            double x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Kulma360(Math.Atan2(y, x) / Rad);
        }

        /// <summary>Piste matkan km päässä suuntimalla (isoympyrä).</summary>
        public static void Siirra(double lat, double lon, double suuntimaAst, double km, out double lat2, out double lon2)
        {
            double f1 = lat * Rad, d = km / R, th = suuntimaAst * Rad;
            double f2 = Math.Asin(Rajaa(Math.Sin(f1) * Math.Cos(d) + Math.Cos(f1) * Math.Sin(d) * Math.Cos(th), -1, 1));
            double l2 = lon * Rad + Math.Atan2(Math.Sin(th) * Math.Sin(d) * Math.Cos(f1), Math.Cos(d) - Math.Sin(f1) * Math.Sin(f2));
            lat2 = f2 / Rad;
            lon2 = Kulma180(l2 / Rad);
        }

        // ---------------------------------------------------------------- paluurengas ja rahat

        /// <summary>Paluurenkaan säde (km): matka, jonka kone ehtii takaisin kotiin talouskaasulla nykyisellä
        /// polttoaineella ja tuulella. Vastatuuli (tuuli kotisuunnasta) pienentää maanopeutta.</summary>
        public static double PaluuSadeKm(double polttoaine, Tuuli t, double suuntaKotiinAst)
        {
            double aika = Math.Max(0, polttoaine) / Kulutus(PaluuKaasu);
            double komp = -t.NopeusKms * Math.Cos((t.SuuntaAst - suuntaKotiinAst) * Rad);
            return aika * Math.Max(0, Tavoitenopeus(PaluuKaasu) + komp);
        }

        public static double TankkiHinta(double hintataso) => TankkiPuntaa * hintataso;
        public static double SakkoMuualle(double hintataso) => SakkoMuuallePuntaa * hintataso;
        public static double SakkoPakkolasku(double hintataso) => SakkoPakkolaskuPuntaa * hintataso;

        public static double Palkkio(Tehtava t) => t switch
        {
            Tehtava.Rengasrata => PalkkioRengasrata, Tehtava.Kuvauslento => PalkkioKuvauslento, _ => PalkkioNavigointi,
        };

        /// <summary>Tankkaus täyteen, enintään rahan verran. Palauttaa uuden polttoaineen; maksu (£) ulos.</summary>
        public static double Tankkaa(double polttoaine, double raha, double hintataso, out double maksu)
        {
            double p = Rajaa(polttoaine, 0, 1), hinta = TankkiHinta(hintataso);
            if (hinta <= 0) { maksu = 0; return 1.0; }
            double tayteen = (1.0 - p) * hinta;
            if (raha >= tayteen) { maksu = tayteen; return 1.0; }
            maksu = Math.Max(0, raha);
            return p + maksu / hinta;
        }

        // ---------------------------------------------------------------- rengasrata

        /// <summary>Deterministinen siemen kaupungista ja päivästä (FNV-1a UTF-8-tavuista + päivä, sekoitettuna).</summary>
        public static int Siemen(string kaupunki, int paiva)
        {
            unchecked
            {
                uint h = 2166136261u;
                foreach (byte b in Encoding.UTF8.GetBytes(kaupunki ?? "")) { h ^= b; h *= 16777619u; }
                for (int i = 0; i < 4; i++) { h ^= (byte)(paiva >> (8 * i)); h *= 16777619u; }
                return (int)(Sekoita(h) & 0x7FFFFFFF);
            }
        }

        /// <summary>Rengasrata: 5–7 rengasta kehällä 25–45 km keskipisteestä, kierros koti → renkaat → koti.
        /// Renkaan suunta on radan kulkusuunta renkaan kohdalla (tulo- ja lähtösuunnan puolittaja), joten rengas
        /// on aina lentäjää kohti.</summary>
        public static Rengas[] Rengasrata(int siemen, double keskiLat, double keskiLon)
        {
            int n = 5 + (int)(Arpa(siemen, 0) % 3);
            double alku = Arpa01(siemen, 1) * 360.0, kierto = Arpa01(siemen, 2) < 0.5 ? 1 : -1, vali = 360.0 / n;
            var rata = new Rengas[n];
            for (int i = 0; i < n; i++)
            {
                double kulma = alku + kierto * (i * vali + (Arpa01(siemen, 10 + i) - 0.5) * 0.4 * vali);
                double r = RataMinKm + (RataMaksKm - RataMinKm) * Arpa01(siemen, 20 + i);
                Siirra(keskiLat, keskiLon, kulma, r, out rata[i].Lat, out rata[i].Lon);
                rata[i].KorkeusKm = RengasMinKorkeus + (RengasMaksKorkeus - RengasMinKorkeus) * Arpa01(siemen, 30 + i);
                rata[i].SadeKm = RenkaanSade;
            }
            for (int i = 0; i < n; i++)
            {
                double eLat = i == 0 ? keskiLat : rata[i - 1].Lat, eLon = i == 0 ? keskiLon : rata[i - 1].Lon;
                double sLat = i == n - 1 ? keskiLat : rata[i + 1].Lat, sLon = i == n - 1 ? keskiLon : rata[i + 1].Lon;
                double tulo = SuuntimaAst(eLat, eLon, rata[i].Lat, rata[i].Lon) * Rad;
                double lahto = SuuntimaAst(rata[i].Lat, rata[i].Lon, sLat, sLon) * Rad;
                rata[i].SuuntaAst = Kulma360(Math.Atan2(Math.Sin(tulo) + Math.Sin(lahto), Math.Cos(tulo) + Math.Cos(lahto)) / Rad);
            }
            return rata;
        }

        /// <summary>Läpäisikö kone renkaan askeleella ennen → jälkeen: ylittää renkaan tason renkaan suuntaan (takaa eteen)
        /// ja leikkauspiste on säteen sisällä. Paikallinen tangenttitaso km:ssä renkaan keskipisteestä, korkeus mukaan.</summary>
        public static bool LapiRenkaasta(Lentotila ennen, Lentotila jalkeen, Rengas r)
        {
            Paikallinen(r, ennen, out double ax, out double ay, out double az);
            Paikallinen(r, jalkeen, out double bx, out double by, out double bz);
            double nx = Math.Sin(r.SuuntaAst * Rad), ny = Math.Cos(r.SuuntaAst * Rad);
            double da = ax * nx + ay * ny, db = bx * nx + by * ny;
            if (!(da < 0 && db >= 0)) return false;
            double u = da / (da - db);
            double px = ax + u * (bx - ax), py = ay + u * (by - ay), pz = az + u * (bz - az);
            return px * px + py * py + pz * pz <= r.SadeKm * r.SadeKm;
        }

        static void Paikallinen(Rengas r, Lentotila s, out double x, out double y, out double z)
        {
            double d = EtaisyysKm(r.Lat, r.Lon, s.Lat, s.Lon), b = SuuntimaAst(r.Lat, r.Lon, s.Lat, s.Lon) * Rad;
            x = d * Math.Sin(b); y = d * Math.Cos(b); z = s.KorkeusKm - r.KorkeusKm;
        }

        // ---------------------------------------------------------------- lento ja autopilotti

        /// <summary>Uusi lento kotirenkaalta: rata siemenestä keskipisteenä koti.</summary>
        public static Lento Uusi(Lentotila tila, double kotiLat, double kotiLon, Rengas[] rata)
            => new Lento { Tila = tila, Rata = rata, KotiLat = kotiLat, KotiLon = kotiLon };

        /// <summary>Askel + renkaat: seuraavan renkaan läpäisy siirtää vuoron eteenpäin, koko rata antaa palkkion
        /// (+0,20 tankkiin, enintään täysi; moottori käynnistyy, jos se oli sammunut).</summary>
        public static void Paivita(ref Lento l, double dt, Ohjaus o, Tuuli t)
        {
            var ennen = l.Tila;
            l.Tila = Askel(l.Tila, dt, o, t);
            if (l.Rata == null || l.Seuraava >= l.Rata.Length) return;
            if (!LapiRenkaasta(ennen, l.Tila, l.Rata[l.Seuraava])) return;
            l.Seuraava++;
            l.Lapaisty++;
            if (l.Seuraava == l.Rata.Length)
            {
                l.Tila.Polttoaine = Math.Min(1.0, l.Tila.Polttoaine + PalkkioRengasrata);
                if (l.Tila.Polttoaine > 0) l.Tila.Moottori = true;
            }
        }

        /// <summary>Yksinkertainen ohjaus kohti renkaan keskipistettä ja korkeutta (video ja testit).</summary>
        public static Ohjaus Autopilotti(Lentotila s, Rengas kohde)
        {
            double ero = Kulma180(SuuntimaAst(s.Lat, s.Lon, kohde.Lat, kohde.Lon) - s.Suunta);
            return new Ohjaus
            {
                SauvaX = Rajaa(ero / 30.0, -1, 1),
                SauvaY = Rajaa((kohde.KorkeusKm - s.KorkeusKm) / 1.5, -1, 1),
                Sormi = true,
                Kaasu = Kaasu.Matka,
                Avustettu = true,
            };
        }

        // ---------------------------------------------------------------- apurit

        /// <summary>Ensimmäisen asteen hakeutuminen tavoitteeseen (aikavakio tau), vähintään minNopeus °/s.</summary>
        static double Lahesty(double x, double tavoite, double dt, double tau, double minNopeus)
        {
            double ero = tavoite - x, askel = ero * (1 - Math.Exp(-dt / tau));
            double min = minNopeus * dt;
            if (Math.Abs(askel) < min) askel = Math.Abs(ero) <= min ? ero : Math.Sign(ero) * min;
            return x + askel;
        }

        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        static double Kulma360(double a) { a %= 360.0; return a < 0 ? a + 360.0 : a; }
        static double Kulma180(double a) { a = Kulma360(a); return a > 180.0 ? a - 360.0 : a; }

        static uint Sekoita(uint x)
        {
            unchecked { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
        }

        static uint Arpa(int siemen, int i) { unchecked { return Sekoita((uint)siemen * 0x9E3779B9u ^ Sekoita((uint)i + 0x632BE5ABu)); } }
        static double Arpa01(int siemen, int i) => Arpa(siemen, i) / 4294967296.0;
    }
}
