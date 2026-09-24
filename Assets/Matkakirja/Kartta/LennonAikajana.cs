using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kamera;
using Unity.Mathematics;

namespace Matkakirja
{
    /// <summary>
    /// LENNON AIKAJANA (omistaja 24.9.2026, sitova: ALOITUSLENNON KAMERAKÄSIKIRJOITUS + TEMPO, KAMERA-AJOT):
    /// lennon kamera avainkehyksinä datana. Jokaisella avaimella on osuus lennon kestosta, käyrä, jolla siihen
    /// tullaan (Linssisepän Kamerakoreografia: kuminauha, kiihtyvä, jarruttava…), sekä etäisyys, kallistus,
    /// suunta ja kohde. Vaiheet:
    ///   ALKU         syöksy lähelle konetta, kuminauhajarrutus lähikuvaan
    ///   LÄHIKUVA     hetki lähes paikallaan, kamera panoroi hitaasti koneen ympäri
    ///   IRTAUTUMINEN kiihtyvä vetäytyminen, pallo paljastuu, ja jarruttava asettuminen
    ///   MATKA        tasainen: kone lentää vakionopeudella, kamera liukuu hitaasti
    ///   LOPPU        kohdekaupungin kierto viistosta kaupungin ympäristön mukaan (Kaupungit), kiihtyvä
    ///                kierto ja hidastuva siirtymä pelin saapumisnäkymään (18,6°, pohjoinen ylös).
    /// Kiihtyvä + jarruttava pari lasketaan niin, että nopeus on saumassa sama (ei nykäystä).
    /// Koneen oma eteneminen (KoneenOsuus) tulee nopeusprofiilista: lähikuvassa kone lähes seisoo,
    /// kiihtyy irtautuessa, lentää tasaisesti ja hidastaa kaupunkiin.
    /// </summary>
    public static class LennonAikajana
    {
        /// <summary>
        /// Kohteen koodi: −1 = kameran lähtöpiste (esim. Lontoon zoomi), 0 = lentokone, 1 = kohdekaupunki.
        /// Suunta: jos SuuntaAbs, kameran katsesuunta asteina pohjoisesta; muuten lentosuuntaan lisättävä.
        /// </summary>
        public struct Avain
        {
            public double Osuus, Parametri, Etaisyys, Kallistus, Suunta, Kohde;
            /// <summary>Koneen leveys osuutena ruudun leveydestä (0 = tavallinen merkkikoko, Nappula.malliPx).</summary>
            public double Kone;
            public Kayra Kayra;
            /// <summary>Suunnan oma käyrä (null = Kayra): kaupungin kierto kiihtyy, vaikka etäisyys pysyy.</summary>
            public Kayra? SuuntaKayra;
            public bool SuuntaAbs;
        }

        /// <summary>Kohdekaupungin kierto: katsesuunta (°), kallistus (°), etäisyys (km), kierron laajuus (°).</summary>
        public readonly struct Kierto
        {
            public readonly double Suunta, Kallistus, EtaisyysKm, Laajuus;
            public Kierto(double suunta, double kallistus, double etaisyysKm, double laajuus = 45)
            { Suunta = suunta; Kallistus = kallistus; EtaisyysKm = etaisyysKm; Laajuus = laajuus; }
        }

        /// <summary>
        /// Aloituskaupunkien kierrot (18 kohdetta Lontoosta, sisältöpaketin aloitus = true). Kamera katsoo
        /// kaupunkia sen maiseman puolelta: Ateenassa Saaronianlahden saaret, Tokiossa Fuji, Kapkaupungissa
        /// niemimaa ja Pöytävuori, Kairossa Niili ja suisto, San Franciscossa Golden Gate ja lahti…
        /// </summary>
        public static readonly Dictionary<string, Kierto> Kaupungit = new Dictionary<string, Kierto>
        {
            ["istanbul"] = new Kierto(20, 60, 70),        // Marmaranmereltä Bosporia pohjoiseen
            ["ateena"] = new Kierto(45, 60, 110, 55),     // saarten yltä lounaasta kohti Ateenaa
            ["moskova"] = new Kierto(340, 52, 80),
            ["tanger"] = new Kierto(235, 62, 90),         // Gibraltarinsalmi, Kalliovuori taustalla
            ["kairo"] = new Kierto(345, 58, 150),         // Niili etelästä suistoa kohti
            ["kapkaupunki"] = new Kierto(195, 64, 80),    // Pöytävuori ja niemimaa etelään
            ["dubai"] = new Kierto(125, 56, 70),          // Persianlahdelta rannikkoa kohti
            ["tokio"] = new Kierto(235, 66, 130, 55),     // Tokionlahti ja Fuji lounaassa
            ["peking"] = new Kierto(315, 60, 110),        // vuoret luoteessa
            ["singapore"] = new Kierto(10, 56, 80),       // salmi ja saaret etelästä
            ["mumbai"] = new Kierto(80, 60, 90),          // mereltä Länsi-Ghateille
            ["newyork"] = new Kierto(10, 60, 60),         // satama ja Manhattan etelästä
            ["sanfrancisco"] = new Kierto(80, 62, 60),    // Tyyneltämereltä Golden Gaten läpi lahdelle
            ["losangeles"] = new Kierto(15, 62, 90),      // mereltä altaaseen ja vuorille
            ["buenosaires"] = new Kierto(290, 56, 120),   // Río de la Plata idästä
            ["rio"] = new Kierto(350, 64, 60),            // lahdet ja vuoret mereltä
            ["sydney"] = new Kierto(270, 62, 80),         // satama ja Blue Mountains idästä
            ["perth"] = new Kierto(85, 56, 60),           // mereltä Swan-joelle
        };

        /// <summary>Oletuskierto muille kohteille: katse lentosuuntaan, loiva viisto.</summary>
        public static Kierto Oletus(double lentosuunta, double saapumisKorkeusM) =>
            new Kierto(Kiedo(lentosuunta), 55, math.clamp(saapumisKorkeusM * 0.00005, 60, 160), 40);

        /// <summary>
        /// Avaimet lennolle. reittiM = isoympyrän pituus, saapumisKorkeus = pelin saapumisnäkymä (m),
        /// loppuKallistus = sallittu kallistus saapumiskorkeudella (PalloKierto.KallistusRaja), jottei kamera
        /// hyppää lennon päätyttyä; k = kohdekaupungin kierto (Kaupungit tai Oletus).
        /// </summary>
        public static Avain[] Laske(double reittiM, double saapumisKorkeus, double loppuKallistus, Kierto k)
        {
            // Irtautumisen huippu: pallon kaarevuus ja horisontti näkyvät (iPad-simulaattori 24.9.: 1500 km oli vielä kartta).
            double kauko = math.clamp(reittiM * 1.2, 3_000_000.0, 9_000_000.0);
            double lahi = 32_000.0;
            var a = new List<Avain>
            {
                // ALKU: lähtöpiste (kameran nykyinen asento, Nappula täyttää).
                new Avain { Osuus = 0.00, Kohde = -1 },
                // Syöksy koneen etuviistoon, kuminauhajarrutus lähikuvaan.
                // Omistaja 24.9. klo 11.4x: lähivaiheissa kone täyttää ~2/3 ruudun leveydestä; kamera matalalta
                // etuviistosta (kallistus 80–83°), jotta horisontti ja taivas ovat koneen takana ja pilvet alla.
                new Avain { Osuus = 0.09, Kayra = Kayra.SyoksyKuminauha, Etaisyys = 40_000, Kallistus = 80, Suunta = 150, Kohde = 0, Kone = 0.74 },
                // LÄHIKUVA: hidas panorointi koneen ympäri, lähes paikallaan.
                new Avain { Osuus = 0.22, Kayra = Kayra.Pehmea, Etaisyys = lahi, Kallistus = 83, Suunta = 205, Kohde = 0, Kone = 0.74 },
            };
            // IRTAUTUMINEN: kiihtyvä vetäytyminen + jarruttava asettuminen (nopeus sama saumassa).
            var loppu = new Avain { Osuus = 0.40, Kayra = Kayra.Jarruttava, Etaisyys = kauko, Kallistus = 30, Suunta = 360, Kohde = 0 };
            a.Add(Pari(a[a.Count - 1], loppu, 0.30));
            a.Add(loppu);
            // MATKA: tasainen liuku, kamera kiertää hitaasti koneen taakse.
            a.Add(new Avain { Osuus = 0.70, Kayra = Kayra.Pehmea, Etaisyys = kauko * 0.85, Kallistus = 36, Suunta = 385, Kohde = 0 });
            // LOPPU: kaupunki viistosta, kierto lähtee kiertosuunnan takaa.
            double suunta = Kiedo(k.Suunta);
            // Kiertosuunta kohti pohjoista, jotta lasku päättyy pohjoinen ylös ilman takaisinkääntöä.
            double suuntaan = suunta <= 180 ? -1 : 1;
            var kaupunki = new Avain
            {
                Osuus = 0.80, Kayra = Kayra.Pehmea, SuuntaAbs = true, Kohde = 1,
                Etaisyys = k.EtaisyysKm * 1000.0 * 1.8, Kallistus = k.Kallistus, Suunta = suunta - suuntaan * k.Laajuus,
            };
            a.Add(kaupunki);
            // Kiihtyvä kierto (etäisyys ja kallistus pysyvät) ja hidastuva siirtymä saapumisnäkymään;
            // suunnan nopeus on saumassa sama (Pari), etäisyys lähtee levosta.
            double pohjoinen = suuntaan > 0 ? 360 : 0;
            var lasku = new Avain
            {
                Osuus = 1.00, Kayra = Kayra.Pehmea, SuuntaKayra = Kayra.Jarruttava, SuuntaAbs = true, Kohde = 1,
                Etaisyys = saapumisKorkeus, Kallistus = math.min(loppuKallistus, 12), Suunta = pohjoinen,
            };
            var kierto = Pari(kaupunki, lasku, 0.92);
            kierto.Kayra = Kayra.Pehmea;
            kierto.SuuntaKayra = Kayra.Kiihtyva;
            kierto.Etaisyys = kaupunki.Etaisyys;
            kierto.Kallistus = kaupunki.Kallistus;
            a.Add(kierto);
            a.Add(lasku);
            return a.ToArray();
        }

        /// <summary>
        /// Kiihtyvä väliavain a → (b) → c niin, että kiihtyvän loppunopeus = jarruttavan alkunopeus:
        /// b = (c·Δ1 + a·Δ2) / (Δ1 + Δ2) jokaiselle raidalle (etäisyys logaritmisena).
        /// </summary>
        static Avain Pari(Avain a, Avain c, double osuus)
        {
            double d1 = osuus - a.Osuus, d2 = c.Osuus - osuus;
            double V(double x, double z) => (z * d1 + x * d2) / (d1 + d2);
            return new Avain
            {
                Osuus = osuus, Kayra = Kayra.Kiihtyva, SuuntaAbs = c.SuuntaAbs, Kohde = c.Kohde,
                Etaisyys = math.exp(V(math.log(a.Etaisyys), math.log(c.Etaisyys))),
                Kone = V(a.Kone, c.Kone),
                Kallistus = V(a.Kallistus, c.Kallistus),
                Suunta = V(a.Suunta, c.Suunta),
            };
        }

        /// <summary>Kameran asento kohdassa t (0–1): segmentin käyrä ja lineaarinen sekoitus (etäisyys log).</summary>
        public static (double etaisyys, double kallistus, double suunta, double kohde, double kone) Arvo(Avain[] a, double t, double lentosuunta)
        {
            int i = 1;
            while (i < a.Length - 1 && t > a[i].Osuus) i++;
            var p = a[i - 1];
            var n = a[i];
            double u = n.Osuus > p.Osuus ? math.saturate((t - p.Osuus) / (n.Osuus - p.Osuus)) : 1;
            double par = n.Parametri == 0 ? double.NaN : n.Parametri;
            double s = Kamerakayrat.Arvo(n.Kayra, u, par);
            double ss = n.SuuntaKayra.HasValue ? Kamerakayrat.Arvo(n.SuuntaKayra.Value, u, par) : s;
            double sp = p.SuuntaAbs ? p.Suunta : p.Suunta + lentosuunta;
            double sn = n.SuuntaAbs ? n.Suunta : n.Suunta + lentosuunta;
            // Suhteellinen → absoluuttinen: lyhin kulma, muuten avainten oma kiertosuunta (voi ylittää 180°).
            if (p.SuuntaAbs != n.SuuntaAbs) sn = sp + Kiedo180(sn - sp);
            return (
                math.exp(math.lerp(math.log(math.max(1, p.Etaisyys)), math.log(math.max(1, n.Etaisyys)), s)),
                math.lerp(p.Kallistus, n.Kallistus, s),
                math.lerp(sp, sn, ss),
                math.clamp(math.lerp(p.Kohde, n.Kohde, s), -1, 1),
                math.max(0, math.lerp(p.Kone, n.Kone, s)));
        }

        /// <summary>Lennon vaihe (Nousu, Matka, Lasku) aikajanan kohdasta.</summary>
        public static LennonVaihe Vaihe(double t) => t < 0.40 ? LennonVaihe.Nousu : t < 0.80 ? LennonVaihe.Matka : LennonVaihe.Lasku;

        // ---- Koneen eteneminen: nopeusprofiili integroituna, normitettuna niin, että t = 1 → 1. ----

        const int Naytteita = 512;
        static double[] kertyma;

        /// <summary>Koneen nopeus (suhteellinen) hetkellä t: lähikuvassa lähes paikallaan, kiihdytys, tasainen, hidastus.</summary>
        static double Nopeus(double t)
        {
            double kiihdytys = Kamerakayrat.Pehmea((t - 0.22) / 0.18);
            double hidastus = Kamerakayrat.Pehmea((t - 0.80) / 0.20);
            return math.lerp(0.035, 1.0, kiihdytys) * (1.0 - hidastus) + 0.02 * hidastus * (1 - t);
        }

        /// <summary>Koneen reittiosuus 0–1 lennon aikaosuudesta t (monotoninen, nopeus jatkuva).</summary>
        public static double KoneenOsuus(double t)
        {
            if (kertyma == null)
            {
                var k = new double[Naytteita + 1];
                double summa = 0;
                for (int i = 1; i <= Naytteita; i++)
                {
                    double t0 = (i - 1) / (double)Naytteita, t1 = i / (double)Naytteita;
                    summa += 0.5 * (Nopeus(t0) + Nopeus(t1)) / Naytteita;
                    k[i] = summa;
                }
                for (int i = 1; i <= Naytteita; i++) k[i] /= summa;
                kertyma = k;
            }
            double x = math.saturate(t) * Naytteita;
            int j = math.min(Naytteita - 1, (int)x);
            return math.lerp(kertyma[j], kertyma[j + 1], x - j);
        }

        static double Kiedo(double a) => ((a % 360.0) + 360.0) % 360.0;
        static double Kiedo180(double a) => ((a % 360.0) + 540.0) % 360.0 - 180.0;
    }
}
