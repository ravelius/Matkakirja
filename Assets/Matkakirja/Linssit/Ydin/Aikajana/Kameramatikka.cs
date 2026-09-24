// AIKAJANAN KAMERA (web js/aikajana.js pysakinLahikuva, aikajananHypynKaari,
// hypynLeveys, aikajananKameranPehmennys; js/pallolauta/reitit.js
// kulmaAsteina, isoympyranPiste).
//
// Pysäkillä kamera on tiukassa lähikuvassa, ja pitkä väli (Beringia, Sahul)
// näytetään liikkeellä: kamera nousee kaarelle matkan puolivälissä ja laskeutuu
// perille takaisin. Leveys interpoloidaan GEOMETRISESTI (lähikuva · suhde^kaari),
// koska silmä lukee zoomin suhteina eikä erotuksina.
//
// Web mittaa leveydet laudan yksiköissä: 12000 yksikköä = 360°. Natiivi muuntaa
// ne asteiksi (LeveysAsteina) ja ympäristö korkeudeksi ruudun leveyden mukaan.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Aikajana
{
    public readonly struct LatLon
    {
        public readonly double Lat, Lon;
        public LatLon(double lat, double lon) { Lat = lat; Lon = lon; }
        public override string ToString() => $"({Lat:F4}, {Lon:F4})";
    }

    public static class Kameramatikka
    {
        public const double LautayksikkoaAsteella = 12000.0 / 360.0;   // LAUTAYKSIKKOA_ASTEELLA
        public const double LahikuvaLeveys = 434;                       // AIKAJANAN_LAHIKUVA_LEVEYS
        public const double HypynKerroin = 2.2;                         // AIKAJANAN_HYPYN_KERROIN
        public const double HypynKatto = 1600;                          // AIKAJANAN_HYPYN_KATTO
        public const double EnnakkoOsuus = 0.8;
        public static readonly double EnnakkoMs = Math.Round(Kello.ViiveMs * EnnakkoOsuus, MidpointRounding.AwayFromZero); // 3680
        public const double JalkijattoMs = -300;                        // ajo päättyy 300 ms ennen syttymistä
        public const double PohjaMs = 900;                              // lyhin ajo
        public const double LoppuAjoMs = 1400;
        public const double MaanSade = 6_371_000;                          // sovitaKaareen

        const double Rad = Math.PI / 180;

        // Pelilaudan Miller-arkki (pyramidi.json projektio; sama kuin Kartta/ReittiGeometria).
        const double MillerLon0 = -175.0, MillerPohjoinen = 76.0;
        static readonly double MillerS = 12000.0 / (2 * Math.PI);
        static double MillerY(double phi) => -1.25 * Math.Log(Math.Tan(Math.PI / 4 + 0.4 * phi));

        /// <summary>Laudan piste (x, y) asteiksi (web fokusmitat laudaltaAsteiksi, Miller).</summary>
        /// <summary>Laatikko laudan yksiköissä (web alue { x, y, w, h }).</summary>
        public readonly struct LautaLaatikko
        {
            public readonly double X, Y, W, H;
            public LautaLaatikko(double x, double y, double w, double h) { X = x; Y = y; W = w; H = h; }
        }

        /// <summary>
        /// Web aikajana.js KAMERA_JATKE ja kaarenKameralaatikko: paneeli ja karuselli vievät osan
        /// ruudusta, joten kaaren laatikkoa jatketaan niiden suuntaan (pystyssä ylös 50 % ja alas 28 %).
        /// </summary>
        public static LautaLaatikko KaarenKameralaatikko(LautaLaatikko a, bool pysty) => pysty
            ? new LautaLaatikko(a.X, a.Y - a.H * 0.5, a.W, a.H * (1 + 0.28 + 0.5))
            : new LautaLaatikko(a.X - a.W * 0.08, a.Y - a.H * 0.14, a.W * (1 + 0.08), a.H * (1 + 0.12 + 0.14));

        const int PerimetrinNaytteet = 12;

        /// <summary>
        /// Web pallolauta/kamera.js pallonKorkeus + kehanTarve: kameran korkeus (pallon säteinä), jolla
        /// laatikon koko kehä (12 näytettä sivua kohti) mahtuu ruutuun perspektiivissä laatikon
        /// keskipisteestä katsottuna. vara = 1 + 2 · marginaali. Palauttaa (keskipiste, korkeus) tai null.
        /// </summary>
        public static (LatLon Keski, double KorkeusSateina)? PallonKorkeus(LautaLaatikko b, double fovAst, double kuvasuhde, double vara = 1)
        {
            if (!(b.W > 0) || !(b.H > 0)) return null;
            var keski = LaudaltaAsteiksi(b.X + b.W / 2, b.Y + b.H / 2);
            double sin0 = Math.Sin(keski.Lat * Rad), cos0 = Math.Cos(keski.Lat * Rad);
            double T = Math.Tan(fovAst / 2 * Rad), A = Math.Max(0.01, kuvasuhde);
            double etaisyys = 0;
            for (int i = 0; i <= PerimetrinNaytteet; i++)
            {
                double t = i / (double)PerimetrinNaytteet;
                foreach (var (bx, by) in new[] { (b.X + b.W * t, b.Y), (b.X + b.W * t, b.Y + b.H), (b.X, b.Y + b.H * t), (b.X + b.W, b.Y + b.H * t) })
                {
                    var p = LaudaltaAsteiksi(bx, by);
                    double lat = p.Lat * Rad, dLng = (p.Lon - keski.Lon) * Rad;
                    double sinP = Math.Sin(lat), cosP = Math.Cos(lat), cosDl = Math.Cos(dLng);
                    double syvyys = sinP * sin0 + cosP * cos0 * cosDl;
                    double sivu = Math.Abs(cosP * Math.Sin(dLng)) / (T * A);
                    double pysty = Math.Abs(sinP * cos0 - cosP * sin0 * cosDl) / T;
                    etaisyys = Math.Max(etaisyys, syvyys + vara * Math.Max(sivu, pysty));
                }
            }
            if (!(etaisyys > 1)) return null;
            return (keski, etaisyys - 1);
        }

        static IEnumerable<LatLon> Keha(LautaLaatikko b)
        {
            for (int i = 0; i <= PerimetrinNaytteet; i++)
            {
                double t = i / (double)PerimetrinNaytteet;
                yield return LaudaltaAsteiksi(b.X + b.W * t, b.Y);
                yield return LaudaltaAsteiksi(b.X + b.W * t, b.Y + b.H);
                yield return LaudaltaAsteiksi(b.X, b.Y + b.H * t);
                yield return LaudaltaAsteiksi(b.X + b.W, b.Y + b.H * t);
            }
        }

        /// <summary>Web kehanTarve akseli kerrallaan: 'X', 'Y' tai null (molemmat).</summary>
        static double KehanTarve(IReadOnlyList<LatLon> pisteet, double lat0, double lng0, double vara, double T, double A, char? akseli)
        {
            double sin0 = Math.Sin(lat0 * Rad), cos0 = Math.Cos(lat0 * Rad), e = 0;
            foreach (var p in pisteet)
            {
                double lat = p.Lat * Rad, dLng = (p.Lon - lng0) * Rad;
                double sinP = Math.Sin(lat), cosP = Math.Cos(lat), cosDl = Math.Cos(dLng);
                double syvyys = sinP * sin0 + cosP * cos0 * cosDl;
                double sivu = Math.Abs(cosP * Math.Sin(dLng)) / (T * A);
                double pysty = Math.Abs(sinP * cos0 - cosP * sin0 * cosDl) / T;
                double osa = akseli == 'X' ? sivu : akseli == 'Y' ? pysty : Math.Max(sivu, pysty);
                e = Math.Max(e, syvyys + vara * osa);
            }
            return e;
        }

        /// <summary>Web reunanPuoli: pienin |Δlng|, jolla reunameridiaani on kokonaan ruudun laidassa tai ulkona.</summary>
        static double ReunanPuoli(double latMin, double latMax, double lat0, double etaisyys, double T, double A)
        {
            double sin0 = Math.Sin(lat0 * Rad), cos0 = Math.Cos(lat0 * Rad);
            double PieninTarve(double u)
            {
                double cosDl = Math.Cos(u * Rad), sinDl = Math.Sin(u * Rad), pienin = double.PositiveInfinity;
                for (int i = 0; i <= PerimetrinNaytteet; i++)
                {
                    double lat = (latMin + (latMax - latMin) * i / PerimetrinNaytteet) * Rad;
                    double tarve = Math.Sin(lat) * sin0 + Math.Cos(lat) * cos0 * cosDl + Math.Cos(lat) * sinDl / (T * A);
                    if (tarve < pienin) pienin = tarve;
                }
                return pienin;
            }
            double ala = 0, yla = 90;
            if (!(PieninTarve(yla) >= etaisyys)) return yla;
            for (int i = 0; i < 24; i++)
            {
                double k = (ala + yla) / 2;
                if (PieninTarve(k) >= etaisyys) yla = k; else ala = k;
            }
            return yla;
        }

        /// <summary>
        /// Web ajaKamera({ bbox, marginaali }) ilman kokonaan-lippua: KAPEA RUUTU SOVITETAAN KORKEUTEEN
        /// (korkeuteenSovitus: jos leveys sitoisi, vain pystyakseli sitoo, X-keskipiste = toive rajattuna
        /// niin, ettei laatikon reuna tule ruudun sisään), muuten pallonKorkeus molempiin suuntiin.
        /// toiveLon = pelaajan pituusaste (web pelaajanAsteet); null = laatikon keskipiste.
        /// </summary>
        public static (LatLon Keski, double KorkeusSateina)? SovitaLaatikko(LautaLaatikko b, double fovAst, double kuvasuhde, double vara = 1, double? toiveLon = null)
        {
            if (!(b.W > 0) || !(b.H > 0)) return null;
            double T = Math.Tan(fovAst / 2 * Rad), A = Math.Max(0.01, kuvasuhde);
            var pisteet = Keha(b).ToList();
            var keski = LaudaltaAsteiksi(b.X + b.W / 2, b.Y + b.H / 2);
            double lngW = LaudaltaAsteiksi(b.X, b.Y + b.H / 2).Lon, lngE = LaudaltaAsteiksi(b.X + b.W, b.Y + b.H / 2).Lon;
            if (lngE > lngW && lngE - lngW < 180
                && KehanTarve(pisteet, keski.Lat, keski.Lon, vara, T, A, 'X') > KehanTarve(pisteet, keski.Lat, keski.Lon, vara, T, A, 'Y'))
            {
                double latMin = pisteet.Min(p => p.Lat), latMax = pisteet.Max(p => p.Lat);
                double toive = toiveLon ?? keski.Lon;
                double lng0 = Math.Min(lngE, Math.Max(lngW, toive)), etaisyys = 0;
                for (int i = 0; i < 3; i++)
                {
                    etaisyys = KehanTarve(pisteet, keski.Lat, lng0, vara, T, A, 'Y');
                    double puoli = ReunanPuoli(latMin, latMax, keski.Lat, etaisyys, T, A);
                    double alaraja = lngW + puoli, ylaraja = lngE - puoli;
                    lng0 = ylaraja > alaraja ? Math.Min(ylaraja, Math.Max(alaraja, toive)) : (lngW + lngE) / 2;
                }
                if (etaisyys > 1) return (new LatLon(keski.Lat, lng0), etaisyys - 1);
            }
            return PallonKorkeus(b, fovAst, kuvasuhde, vara);
        }

        public static LatLon LaudaltaAsteiksi(double x, double y)
        {
            double lon = x / MillerS / Rad + MillerLon0;
            lon = ((lon + 180) % 360 + 360) % 360 - 180;
            double my = y / MillerS + MillerY(MillerPohjoinen * Rad);
            double phi = (Math.Atan(Math.Exp(-my / 1.25)) - Math.PI / 4) / 0.4;
            return new LatLon(phi / Rad, lon);
        }

        /// <summary>Laudan laatikko { x, y, w, h } asteiden laatikoksi (kaaren alue).</summary>
        public static Laatikko LaatikkoLaudalta(double x, double y, double w, double h)
        {
            var a = LaudaltaAsteiksi(x, y);
            var b = LaudaltaAsteiksi(x + w, y + h);
            return new Laatikko(Math.Min(a.Lat, b.Lat), Math.Max(a.Lat, b.Lat), Math.Min(a.Lon, b.Lon), Math.Max(a.Lon, b.Lon));
        }

        /// <summary>Laudan yksiköt (ruudun leveydellä) asteiksi.</summary>
        public static double LeveysAsteina(double lautayksikot) => lautayksikot / LautayksikkoaAsteella;

        /// <summary>Hypyn huippuleveys matkasta (lautayks.): clamp(matka · 2,2, perus, 1600).</summary>
        public static double PysakinLahikuva(double perus, double matka, double kerroin = HypynKerroin, double katto = HypynKatto)
        {
            if (!(matka > 0)) return perus;
            return Math.Min(katto, Math.Max(perus, matka * kerroin));
        }

        /// <summary>sin²(πe): nolla ja derivaatta nolla molemmissa päissä.</summary>
        public static double HypynKaari(double e)
        {
            double x = Math.Min(1, Math.Max(0, e));
            return (1 - Math.Cos(2 * Math.PI * x)) / 2;
        }

        public static double HypynLeveys(double lahikuva, double huippu, double e)
        {
            if (!(huippu > lahikuva) || !(lahikuva > 0)) return lahikuva;
            return lahikuva * Math.Pow(huippu / lahikuva, HypynKaari(e));
        }

        /// <summary>Smootherstep x³(6x² − 15x + 10).</summary>
        public static double Pehmennys(double t)
        {
            double x = Math.Min(1, Math.Max(0, t));
            return x * x * x * (x * (x * 6 - 15) + 10);
        }

        /// <summary>Isoympyräkulma asteina.</summary>
        public static double KulmaAsteina(LatLon a, LatLon b)
        {
            double la1 = a.Lat * Rad, la2 = b.Lat * Rad, dLng = (b.Lon - a.Lon) * Rad;
            double c = Math.Sin(la1) * Math.Sin(la2) + Math.Cos(la1) * Math.Cos(la2) * Math.Cos(dLng);
            return Math.Acos(Math.Max(-1, Math.Min(1, c))) / Rad;
        }

        /// <summary>Piste isoympyrällä a→b osuudella t.</summary>
        public static LatLon IsoympyranPiste(LatLon a, LatLon b, double t)
        {
            double kulma = KulmaAsteina(a, b) * Rad;
            if (kulma < 1e-9) return a;
            double la1 = a.Lat * Rad, lo1 = a.Lon * Rad, la2 = b.Lat * Rad, lo2 = b.Lon * Rad;
            double s = Math.Sin(kulma);
            double A = Math.Sin((1 - t) * kulma) / s, B = Math.Sin(t * kulma) / s;
            double x = A * Math.Cos(la1) * Math.Cos(lo1) + B * Math.Cos(la2) * Math.Cos(lo2);
            double y = A * Math.Cos(la1) * Math.Sin(lo1) + B * Math.Cos(la2) * Math.Sin(lo2);
            double z = A * Math.Sin(la1) + B * Math.Sin(la2);
            return new LatLon(Math.Atan2(z, Math.Sqrt(x * x + y * y)) / Rad, Math.Atan2(y, x) / Rad);
        }

        /// <summary>
        /// Kameran asento hypyllä osuudella t (0…1, pehmentämätön aika):
        /// paikka isoympyrällä ja leveys (lautayks.) kaarella. Web ajaValia.
        /// </summary>
        public static (LatLon paikka, double leveys) Hyppy(LatLon alku, LatLon loppu, double lahikuva, bool hyppykamera, double t)
        {
            double e = Pehmennys(t);
            var paikka = IsoympyranPiste(alku, loppu, e);
            if (!hyppykamera) return (paikka, lahikuva);
            double matka = KulmaAsteina(alku, loppu) * LautayksikkoaAsteella;
            double huippu = PysakinLahikuva(lahikuva, matka);
            return (paikka, HypynLeveys(lahikuva, huippu, e));
        }

        /// <summary>
        /// Kameran ajon kesto pysäkille: ajo alkaa EnnakkoMs ennen syttymistä ja päättyy
        /// 300 ms ennen sitä; lyhin PohjaMs. eta = Kello.AikaSeuraavaan.
        /// </summary>
        public static double AjonKesto(double eta) => Math.Max(PohjaMs, eta + JalkijattoMs);
    }
}
