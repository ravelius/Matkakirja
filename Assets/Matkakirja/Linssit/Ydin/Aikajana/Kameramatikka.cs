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
        public const double LoppuAjoMs = 1400;                          // sovitaKaareen

        const double Rad = Math.PI / 180;

        // Pelilaudan Miller-arkki (pyramidi.json projektio; sama kuin Kartta/ReittiGeometria).
        const double MillerLon0 = -175.0, MillerPohjoinen = 76.0;
        static readonly double MillerS = 12000.0 / (2 * Math.PI);
        static double MillerY(double phi) => -1.25 * Math.Log(Math.Tan(Math.PI / 4 + 0.4 * phi));

        /// <summary>Laudan piste (x, y) asteiksi (web fokusmitat laudaltaAsteiksi, Miller).</summary>
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
