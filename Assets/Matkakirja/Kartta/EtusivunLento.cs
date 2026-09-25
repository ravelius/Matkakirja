using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// ETUSIVUN LENTO — aloitusportin pallon kone ja punainen viiva (omistajan löydös 112; WEB ON MALLI MITATTUNA,
    /// Pelikoodarin mitat proto-3d/lokit/loydos112-etusivupallo/MITAT.md). Puhdas laskenta ilman UnityEngineä
    /// (Kartta-testit/Testit/EtusivunLentoTestit.cs); piirto on <see cref="Etusivulento"/>, kamera PalloKierto.PorttiKierto.
    ///
    /// Lähde on webin js/etusivupallo.js (origin/main 25.9.2026) rivi riviltä:
    ///   reitti 213–216 (ETUSIVUN_REITTI; asteet ämpärin etusivu.json → reitti, pituus jatkuvana 317–344),
    ///   kamera 227–236 (ETUSIVUN_KAMERA) ja 411–426 (kameranNakyma: 9 näytettä ±3,4 s, leveys 0,62 × keskiarvo 2–38°),
    ///   ajoitus 243–253 (jakso = 1,0 + isoympyrä° × 0,115 s, Lontoon pito 2,6 s, häivytys 1,1 s), 353–370
    ///   (reitinJaksot) ja 387–405 (koneenTila: osuus LINEAARINEN, ei pehmennystä; jaksollinen yli kierroksen),
    ///   isoympyrä 261–313 (kaariAste, kaarietaisyys, suurympyra = slerp, pituus jatkuvana lähtöpisteen ympärillä),
    ///   jälki 645–659 (jaljenPisteet, 1,5°:n näytteet lähtöpisteestä koneeseen) ja sauma 1286–1287
    ///   (häivytys = min(1, t / 1,1, (kesto − t) / 1,1)). Kokonaiskesto 49,6228 s = etusivu.json → kesto.
    /// </summary>
    public static class EtusivunLento
    {
        /// <summary>Reitin piste: leveys ja pituus asteina (pituus jatkuvana idän suuntaan).</summary>
        public readonly struct Piste
        {
            public readonly double Lat, Lon;
            public Piste(double lat, double lon) { Lat = lat; Lon = lon; }
        }

        /// <summary>Jakso kahden kaupungin välillä (tai Lontoon pito: A = B, matka 0).</summary>
        public readonly struct Jakso
        {
            public readonly Piste A, B;
            public readonly double Matka, Alku, Kesto;
            public readonly bool Pito;
            public Jakso(Piste a, Piste b, double matka, double alku, double kesto, bool pito)
            { A = a; B = b; Matka = matka; Alku = alku; Kesto = kesto; Pito = pito; }
        }

        /// <summary>Koneen tila: paikka, jakson indeksi ja osuus jaksosta.</summary>
        public readonly struct Tila
        {
            public readonly double Lat, Lon, Osuus;
            public readonly int Jakso;
            public Tila(double lat, double lon, int jakso, double osuus) { Lat = lat; Lon = lon; Jakso = jakso; Osuus = osuus; }
        }

        /// <summary>Web ETUSIVUN_REITTI + etusivu.json → reitti (2026-09-07a): Lontoo → … → New York → Lontoo, 360° itään.</summary>
        public static readonly (string Id, Piste P)[] Reitti =
        {
            ("lontoo", new Piste(51.50509, -0.115)),
            ("pariisi", new Piste(48.8451, 2.333)),
            ("kairo", new Piste(29.99996, 31.226)),
            ("mumbai", new Piste(19.10125, 72.899)),
            ("kolkata", new Piste(22.60107, 88.4)),
            ("singapore", new Piste(1.79962, 103.601)),
            ("hongkong", new Piste(22.80061, 113.999)),
            ("tokio", new Piste(35.70035, 139.7)),
            ("sanfrancisco", new Piste(37.90002, 237.8)),
            ("newyork", new Piste(40.89944, 285.8)),
            ("lontoo", new Piste(51.50509, 359.885)),
        };

        public const double KierroksenAsteet = 360.0;
        public const double JaksonPohjaS = 1.0, JaksonAsteS = 0.115, LoppuPitoS = 2.6, HaivytysS = 1.1, JaljenAskelAste = 1.5;
        /// <summary>ETUSIVUN_KAMERA: leveys = kerroin × silotettu leveys rajattuna, silotus ±3,4 s.</summary>
        public const double LatKerroin = 0.62, LatMin = 2.0, LatMax = 38.0, SilotusS = 3.4;

        /// <summary>Jaksot (10 lentoa + Lontoon pito) ja kierroksen kesto (≈ 49,623 s).</summary>
        public static readonly Jakso[] Jaksot;
        public static readonly double Kesto;

        static EtusivunLento()
        {
            var jaksot = new List<Jakso>();
            double alku = 0;
            for (int i = 0; i + 1 < Reitti.Length; i++)
            {
                double matka = Kaarietaisyys(Reitti[i].P, Reitti[i + 1].P);
                double kesto = JaksonPohjaS + matka * JaksonAsteS;
                jaksot.Add(new Jakso(Reitti[i].P, Reitti[i + 1].P, matka, alku, kesto, false));
                alku += kesto;
            }
            var maali = Reitti[Reitti.Length - 1].P;
            jaksot.Add(new Jakso(maali, maali, 0, alku, LoppuPitoS, true));
            alku += LoppuPitoS;
            Jaksot = jaksot.ToArray();
            Kesto = alku;
        }

        const double Rad = Math.PI / 180.0;

        /// <summary>Pituusaste välille (−180, 180] (web kaariAste).</summary>
        public static double KaariAste(double a)
        {
            double x = a;
            while (x > 180) x -= 360;
            while (x <= -180) x += 360;
            return x;
        }

        static (double X, double Y, double Z) Suunta(double lat, double lon)
        {
            double a = lat * Rad, b = lon * Rad;
            return (Math.Cos(a) * Math.Sin(b), Math.Sin(a), Math.Cos(a) * Math.Cos(b));
        }

        static double Piste3((double X, double Y, double Z) a, (double X, double Y, double Z) b) => a.X * b.X + a.Y * b.Y + a.Z * b.Z;

        /// <summary>Isoympyräetäisyys asteina (web kaarietaisyys).</summary>
        public static double Kaarietaisyys(Piste a, Piste b) =>
            Math.Acos(Math.Min(1, Math.Max(-1, Piste3(Suunta(a.Lat, a.Lon), Suunta(b.Lat, b.Lon))))) / Rad;

        /// <summary>Isoympyrän piste osuudella u (slerp); pituus jatkuvana a:n ympärillä (web suurympyra).</summary>
        public static Piste Suurympyra(Piste a, Piste b, double u)
        {
            var va = Suunta(a.Lat, a.Lon);
            var vb = Suunta(b.Lat, b.Lon);
            double kulma = Math.Acos(Math.Min(1, Math.Max(-1, Piste3(va, vb))));
            (double X, double Y, double Z) p;
            if (kulma < 1e-6) p = va;
            else
            {
                double s = Math.Sin(kulma), k1 = Math.Sin((1 - u) * kulma) / s, k2 = Math.Sin(u * kulma) / s;
                p = (va.X * k1 + vb.X * k2, va.Y * k1 + vb.Y * k2, va.Z * k1 + vb.Z * k2);
            }
            double lat = Math.Asin(Math.Min(1, Math.Max(-1, p.Y))) / Rad;
            double lonRaaka = Math.Atan2(p.X, p.Z) / Rad;
            return new Piste(lat, a.Lon + KaariAste(lonRaaka - a.Lon));
        }

        /// <summary>
        /// Koneen paikka hetkellä t (web koneenTila). Jaksollinen: kierroksen ulkopuolella pituus jatkuu ±360°,
        /// jolloin kameran silotus kurkistaa sauman yli ja kierros on saumaton.
        /// </summary>
        public static Tila KoneenTila(double t)
        {
            double kierros = Math.Floor(t / Kesto);
            double aika = t - kierros * Kesto;
            int i = Jaksot.Length - 1;
            while (i > 0 && aika < Jaksot[i].Alku) i--;
            var j = Jaksot[i];
            double osuus = j.Kesto > 0 ? Math.Min(1, Math.Max(0, (aika - j.Alku) / j.Kesto)) : 1;
            var p = Suurympyra(j.A, j.B, osuus);
            return new Tila(p.Lat, p.Lon + kierros * KierroksenAsteet, i, osuus);
        }

        /// <summary>
        /// Kameran katsesuunta hetkellä t (web kameranNakyma): koneen paikan liukuva keskiarvo 9 näytteestä ±3,4 s,
        /// leveys = clamp(0,62 × keskiarvo, 2°, 38°), pituus = keskiarvo (jatkuvana, kiedottava kutsujan päässä).
        /// </summary>
        public static Piste KameranNakyma(double t)
        {
            const int n = 9;
            double lat = 0, lon = 0;
            for (int i = 0; i < n; i++)
            {
                double osuus = i / (double)(n - 1);
                var p = KoneenTila(t + (osuus * 2 - 1) * SilotusS);
                lat += p.Lat;
                lon += p.Lon;
            }
            lat /= n;
            lon /= n;
            return new Piste(Math.Min(LatMax, Math.Max(LatMin, lat * LatKerroin)), lon);
        }

        /// <summary>
        /// Lennetty jälki hetkeen t asti (web jaljenPisteet): isoympyrää pitkin noin 1,5°:n välein; viimeinen näyte on
        /// kone itse. Lontoon pito ei lisää näytteitä (ympyrä on silloin suljettu). Täyttää listan (tyhjennetään ensin).
        /// </summary>
        public static void JaljenPisteet(double t, List<Piste> ulos, double askel = JaljenAskelAste)
        {
            ulos.Clear();
            var kone = KoneenTila(t);
            for (int i = 0; i <= kone.Jakso; i++)
            {
                var j = Jaksot[i];
                if (!(j.Matka > 0)) continue;
                double loppu = i == kone.Jakso ? kone.Osuus : 1;
                int naytteita = Math.Max(1, (int)Math.Ceiling(j.Matka * loppu / askel));
                for (int k = 0; k <= naytteita; k++)
                {
                    if (i > 0 && k == 0) continue; // sama piste kuin edellisen jakson loppu
                    ulos.Add(Suurympyra(j.A, j.B, loppu * k / naytteita));
                }
            }
        }

        /// <summary>Kierroksen aika välille [0, Kesto).</summary>
        public static double Kierroksessa(double t)
        {
            double a = t % Kesto;
            return a < 0 ? a + Kesto : a;
        }

        /// <summary>Viivan ja koneen peitto kierroksen saumassa (web etusivupallo.js 1286): nousu alussa ja lasku pidon lopussa 1,1 s.</summary>
        public static double Haivytys(double t) => Math.Max(0, Math.Min(1, Math.Min(t / HaivytysS, (Kesto - t) / HaivytysS)));

        // MITOITUS RUUDULLA (MITAT.md luvut 3–5, mitatut-dom-arvot.json). Webissä kone ja viiva ovat SVG:ssä (viewBox
        // 1200), jonka laatikko on .intro-paneelin cover-koko × lisays; muunnos scale(KONEEN_SKAALA / lisays) ja viivan
        // stroke-width 11 / lisays kumoavat lisayksen, joten polkuyksikkö on ruudulla 1,15 × paneelin pitkä sivu / 1200
        // pistettä. Mitattu: iPhone 393 × 852 paneeli 376,6 × 785,0 → 0,7523 pt; iPad 834 × 1194 paneeli 812,8 × 1121,1
        // → 1,0744 pt. Tarkistus: koneen 29 × 18 kierrettynä 35,6° × 0,7523 = 25,6 × 23,7 pt ja iPadilla 36,8° × 1,0744 =
        // 36,5 × 34,1 pt (koneGBBoxRuudulla). Viivan stroke-width 9,2 / 8,26 on SVG:n käyttäjäyksikköä, EI ruudun
        // pistettä: ruudulla 9,2 × 938,9 / 1200 = 7,2 pt (iPhone) ja 8,26 × 1493,1 / 1200 = 10,3 pt (iPad) = 11 / 1,15 ×
        // polkuyksikkö.

        /// <summary>Koneen skaala (web KONEEN_SKAALA) ja viivan leveys videon pikseleinä (VIIVAN_LEVEYS).</summary>
        public const double KoneenSkaala = 1.15, ViivanLeveysVideo = 11.0, VideonSivu = 1200.0;
        /// <summary>Koneen reunaviiva polkuyksikköinä (.etusivupallo-koneen-runko stroke-width 1.4).</summary>
        public const double KoneenReunaYks = 1.4;
        /// <summary>.intro-paneelin pitkä sivu / ruudun pitkä sivu: iPhone 785,03 / 852, iPad 1121,06 / 1194.</summary>
        public const double PaneeliPuhelin = 785.03125 / 852.0, PaneeliTabletti = 1121.0625 / 1194.0;

        /// <summary>
        /// Koneen polkuyksikkö ruudun pisteinä: 1,15 × paneelin pitkä sivu / 1200. Paneelin osuus interpoloidaan
        /// lyhyen sivun mukaan mitattujen ruutujen (393 ja 834 pt) välillä ja rajataan niihin.
        /// </summary>
        public static double Yksikko(double lyhytPt, double pitkaPt)
        {
            double u = Math.Min(1, Math.Max(0, (lyhytPt - 393.0) / (834.0 - 393.0)));
            double paneeli = pitkaPt * (PaneeliPuhelin + (PaneeliTabletti - PaneeliPuhelin) * u);
            return KoneenSkaala * paneeli / VideonSivu;
        }

        /// <summary>Viivan leveys ruudun pisteinä (11 videopikseliä samalla muunnoksella: 7,2 pt iPhone, 10,3 pt iPad).</summary>
        public static double ViivanLeveys(double lyhytPt, double pitkaPt) => Yksikko(lyhytPt, pitkaPt) * ViivanLeveysVideo / KoneenSkaala;

        /// <summary>
        /// Web KONEEN_POLKU (etusivupallo.js 930–931, sama kuin aloituslennon kone): "M14,0 L-6,0 M-10,0 L-14,0
        /// M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z". Alipolut (x, y)-pareina,
        /// y alaspäin, nokka +x; Suljettu = z (täytetään), avoimet ovat pelkkiä viivoja (täyttö ei piirrä niistä mitään).
        /// </summary>
        public static readonly (bool Suljettu, double[] Xy)[] KoneenPolku =
        {
            (false, new double[] { 14, 0, -6, 0 }),
            (false, new double[] { -10, 0, -14, 0 }),
            (true, new double[] { 2, 0, -8, -9, -4, -9, 6, 0, -4, 9, -8, 9 }),
            (true, new double[] { -11, 0, -15, -5, -13, -5, -9, 0, -13, 5, -15, 5 }),
        };

        /// <summary>Koneen suunta: web laskee sen projektiosta hetkillä t ja t + 0,12 s (etusivupallo.js 1264–1274; pidossa suunta jää ennalleen).</summary>
        public const double SuunnanEdellaS = 0.12;

        // PALLON SOVITUS RUUDULLE (web pallonPiste 440–453, kiekonSade 528–535, koneenYlin 561–571, pallonSovitus
        // 599–629). Webin pallo on video (kamera D = 2,55 sädettä, fov 50°, lava 1400, kuva 1200), joka skaalataan
        // .intro-paneeliin niin, että kiekon säde on 1,15 × matka nurkkaan, ja kiekko laskee, jos koneen ylin kohta ei
        // muuten mahdu 34 px paneelin yläreunan alle. Natiivin kamera jäljittelee tätä (PalloKierto.PaivitaPorttiLinssi):
        // sama D, polttoväli F = f × skaala ja kiekon keskipiste (Cx, Cy) ruudulla. Ilman tätä (build 13, fov 50°,
        // D ≈ 1,97) kone kulki 50–75 pt webiä ylempänä, otsikon ja vaalean verhon alla (Natiivisepän kuvat t 26–47,5).

        /// <summary>Web ETUSIVUN_KAMERA.korkeus (pallon säteinä), videon fov, lava ja reunaehdot.</summary>
        public const double KameranKorkeus = 1.55, VideonFov = 50.0, Lava = 1400.0, KiekonYlitys = 1.15, KoneenMarginaali = 34.0;

        /// <summary>.intro-paneelin reunat ruudun reunoista (pt): vasen = oikea = ala, ylä (yläpalkki). iPhone / iPad.</summary>
        const double ReunaPuhelin = 8.1875, ReunaTabletti = 10.59375, YlaPuhelin = 58.78125, YlaTabletti = 62.34375;

        static double VideonF => Lava / 2 / Math.Tan(VideonFov * Rad / 2);

        /// <summary>Pallon pinnan piste videokuvassa keskipisteestä (x oikealle, y ylös, videopikseleinä), web pallonPiste.</summary>
        public static (double X, double Y, bool Nakyy) PallonPiste(Piste paikka, Piste kamera)
        {
            double D = 1 + KameranKorkeus;
            var c = Suunta(kamera.Lat, kamera.Lon);
            var p = Suunta(paikka.Lat, paikka.Lon);
            // oikea = normi([0,1,0] × c), ylös = c × oikea
            double ox = c.Z, oz = -c.X, on = Math.Sqrt(ox * ox + oz * oz);
            if (on < 1e-12) on = 1;
            var oikea = (ox / on, 0.0, oz / on);
            var ylos = (c.Y * oikea.Item3 - c.Z * oikea.Item2, c.Z * oikea.Item1 - c.X * oikea.Item3, c.X * oikea.Item2 - c.Y * oikea.Item1);
            double syvyys = D - Piste3(p, c);
            return (VideonF * Piste3(p, oikea) / syvyys, VideonF * Piste3(p, ylos) / syvyys, Piste3(p, c) >= 1 / D);
        }

        /// <summary>Kiekon säde videopikseleinä (web kiekonSade): f · √(1 − 1/D²) / (D − 1/D).</summary>
        public static double KiekonSade
        {
            get { double D = 1 + KameranKorkeus; return VideonF * Math.Sqrt(1 - 1 / (D * D)) / (D - 1 / D); }
        }

        static double ylin = -1;
        /// <summary>Koneen ylin kohta videon keskeltä ylöspäin (web koneenYlin, 0,25 s:n askel; ≈ 346,6 px).</summary>
        public static double KoneenYlin
        {
            get
            {
                if (ylin >= 0) return ylin;
                double y = 0;
                for (double t = 0; t <= Kesto; t += 0.25)
                {
                    var k = KoneenTila(t);
                    y = Math.Max(y, PallonPiste(new Piste(k.Lat, k.Lon), KameranNakyma(t)).Y);
                }
                return ylin = y;
            }
        }

        /// <summary>Pallon sovitus ruudulle pisteinä: polttoväli F, kiekon keskipiste (Cx, Cy) ylävasemmalta, säde.</summary>
        public readonly struct Sovitus
        {
            public readonly double F, Cx, Cy, Sade, Lasku;
            public Sovitus(double f, double cx, double cy, double sade, double lasku) { F = f; Cx = cx; Cy = cy; Sade = sade; Lasku = lasku; }
            /// <summary>Videon piste (PallonPiste) ruudun pisteiksi (y alas).</summary>
            public (double X, double Y) Ruudulle((double X, double Y, bool Nakyy) p) => (Cx + p.X * F / VideonF, Cy - p.Y * F / VideonF);
        }

        /// <summary>
        /// Web pallonSovitus natiiviruudulle (lev × kork pt): kotelo = ruutu webin .intro-paneelin reunoin
        /// (interpoloitu lyhyen sivun mukaan 393 → 834 pt), cover-skaala alarajana, kiekko 1,15 × nurkkaetäisyys ja
        /// lasku koneen ylimmän kohdan mukaan. Lisäehto natiiville: kiekko peittää myös ruudun nurkat (paneelin
        /// ulkopuolen yläpalkin kohdalla), jotta pallon reuna ei näy koko ruudun kamerakuvassa.
        /// </summary>
        public static Sovitus RuudulleSovitus(double lev, double kork)
        {
            double u = Math.Min(1, Math.Max(0, (Math.Min(lev, kork) - 393.0) / (834.0 - 393.0)));
            double reuna = ReunaPuhelin + (ReunaTabletti - ReunaPuhelin) * u, yla = YlaPuhelin + (YlaTabletti - YlaPuhelin) * u;
            double kw = Math.Max(1, lev - 2 * reuna), kh = Math.Max(1, kork - yla - reuna);
            double cover = Math.Max(kw / VideonSivu, kh / VideonSivu), sade = KiekonSade, ylinY = KoneenYlin;
            double skaala = cover, lasku = 0;
            for (int i = 0; i < 10; i++)
            {
                lasku = Math.Min(kh / 2, Math.Max(0, KoneenMarginaali - kh / 2 + ylinY * skaala));
                skaala = Math.Max(cover, KiekonYlitys * Math.Sqrt(kw * kw / 4 + (kh / 2 + lasku) * (kh / 2 + lasku)) / sade);
            }
            double cx = reuna + kw / 2, cy = yla + kh / 2 + lasku;
            double nurkka = Math.Sqrt(Math.Max(cx, lev - cx) * Math.Max(cx, lev - cx) + Math.Max(cy, kork - cy) * Math.Max(cy, kork - cy));
            skaala = Math.Max(skaala, nurkka / sade);
            return new Sovitus(VideonF * skaala, cx, cy, sade * skaala, lasku);
        }
    }
}
