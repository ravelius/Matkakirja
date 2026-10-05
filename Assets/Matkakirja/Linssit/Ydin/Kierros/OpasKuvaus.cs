// OPPAAN KUVAKIELI (omistaja 5.10.2026: "Onko kameran liikkeet cinemaattiset?"; Päätoimittaja: puhtailla funktioilla ilman
// Cinemachinea, koska kaupunkikameraa ohjaa PalloKierto ja Cesium valitsee laatat ennen LateUpdatea; Siirtoseppä, junaan 145).
// Linssisepän OpasSilmukka kutsuu näitä Kehysta-, KehysAsento- ja Lennossa-funktioidensa tilalla. Kaikki on ajan ja datan puhdas
// funktio (sama syöte → sama kuva), joten mikään ei hyppää eikä riipu kehysnopeudesta.
//  1) KEHYS kohteen luokan mukaan: katu/kanava/aukio matalalta ja viistosti läheltä (Nyhavn), torni/rakennus keskikorkealta
//     korkeuden mukaan, linnoitus/puisto/vesi/alue korkealta ja jyrkästi kauempaa (Kastellet). Luokka workerin "luokka"-kentästä,
//     muuten koosta ja korkeudesta. Kamera ei katso kohdetta suoraan tulosuunnasta vaan 25° sivusta (syvyys, ei litteä).
//  2) PYSÄHDYS: hidas kierto (~0,35°/s eli ~14° 40 s:n kappaleessa) pehmeällä alulla (ei nykäisyä saapuessa) ja kevyt dolly
//     sisään (−7 % etäisyydestä, eksponentiaalisesti).
//  3) LENTO: nousu – liuku – lasku. Sijainti minimum-jerk-käyrällä (smootherstep), korkeus tasanteena (nousu 0–30 %, liuku,
//     lasku 70–100 %, kaikki pehmeästi), katse kääntyy lentosuuntaan ensimmäisen kolmanneksen aikana ja kohteen kehyssuuntaan
//     viimeisen kolmanneksen aikana; liu'ussa kallistus hieman vaakaan (näkee eteen). Yli 20 km: OpasSilmukka.Lennossa (isoympyrä).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasKuvaus
    {
        public enum Luokka { Katu, Rakennus, Alue }

        // Kehys: kallistus kohteen pystysuorasta (0 = suoraan alas, 90 = vaaka), etäisyys koosta, katseen nosto korkeudesta.
        public const double KatuKallistus = 74, RakennusKallistus = 66, AlueKallistus = 50;
        public const double KatuEtMinM = 180, KatuEtMaxM = 650, RakennusEtMinM = 240, RakennusEtMaxM = 900, AlueEtMinM = 450, AlueEtMaxM = 1800;
        public const double SivuKulma = 25;
        // Pysähdys
        public const double KiertoAsteS = 0.35, KiertoAlkuS = 4, DollyOsuus = 0.07, DollyAikaS = 25;
        // Lento
        public const double NousuLoppu = 0.3, LaskuAlku = 0.7, KaariOsuus = 0.28, KaariMinM = 120, KaariMaxM = 1600, LiukuKallistus = 6;
        public const double LahiRajaM = 20000;

        /// <summary>Luokka workerin kentästä ("katu" | "kanava" | "aukio" | "rakennus" | "torni" | "linnoitus" | "puisto" |
        /// "vesi" | …) tai, jos puuttuu, koosta ja korkeudesta.</summary>
        public static Luokka Luokittele(OpasKohde k, string luokka = null)
        {
            switch ((luokka ?? "").Trim().ToLowerInvariant())
            {
                case "katu": case "kanava": case "aukio": case "tori": case "silta": return Luokka.Katu;
                case "rakennus": case "torni": case "kirkko": case "patsas": case "monumentti": return Luokka.Rakennus;
                case "linnoitus": case "puisto": case "vesi": case "satama": case "alue": case "saari": return Luokka.Alue;
            }
            if (k == null) return Luokka.Rakennus;
            if (k.KokoM >= 300) return Luokka.Alue;
            if (k.KorkeusM >= 25) return Luokka.Rakennus;
            return k.KokoM <= 120 ? Luokka.Katu : Luokka.Rakennus;
        }

        /// <summary>Kehys kohteelle: luokan kuvakulma, katse SivuKulman verran tulosuunnasta sivuun.</summary>
        public static Pysahdys Kehysta(OpasKohde k, double maaM, double tulosuunta, string luokka = null)
        {
            var l = Luokittele(k, luokka);
            double koko = Math.Max(10, k.KokoM), korkeus = k.KorkeusM > 0 ? k.KorkeusM : 0;
            double et, kall, nosto;
            switch (l)
            {
                case Luokka.Katu:
                    et = Rajaa(koko * 2.5 + 120, KatuEtMinM, KatuEtMaxM); kall = KatuKallistus; nosto = Rajaa(korkeus * 0.4, 4, 25); break;
                case Luokka.Alue:
                    et = Rajaa(koko * 1.6 + 250, AlueEtMinM, AlueEtMaxM); kall = AlueKallistus; nosto = Rajaa(korkeus * 0.3, 5, 40); break;
                default:
                    et = Rajaa(Math.Max(koko * 2.8, korkeus * 5) + 120, RakennusEtMinM, RakennusEtMaxM);
                    kall = RakennusKallistus; nosto = Rajaa((korkeus > 0 ? korkeus : koko * 0.3) * 0.45, 5, 70); break;
            }
            return new Pysahdys
            {
                Id = k.Id ?? k.Nimi, Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = k.Teksti, Lat = k.Lat, Lon = k.Lon, MaaM = maaM, NostoM = nosto,
                Suuntima = KierrosLento.Kiedo(tulosuunta + SivuKulma), Kallistus = kall, EtaisyysM = et,
            };
        }

        /// <summary>Pysähdyksen asento hetkellä aikaS saapumisesta: pehmeästi alkava hidas kierto ja kevyt dolly sisään.
        /// aikaS = 0 antaa täsmälleen kehyksen (lennon loppu), joten saapuminen on jatkuva.</summary>
        public static Kuvakulma Pysahdyksella(Pysahdys p, double aikaS)
        {
            double t = Math.Max(0, aikaS);
            // Kierto: kiihtyy KiertoAlkuS:ssa täyteen nopeuteen (integroitu smoothstep → kulma jatkuva ja derivaatta jatkuva).
            double kierto = t < KiertoAlkuS
                ? KiertoAsteS * KiertoAlkuS * SmoothstepIntegraali(t / KiertoAlkuS)
                : KiertoAsteS * (KiertoAlkuS * 0.5 + (t - KiertoAlkuS));
            double dolly = 1 - DollyOsuus * (1 - Math.Exp(-t / DollyAikaS));
            return new Kuvakulma(p.Lat, p.Lon, p.EtaisyysM * dolly, p.Kallistus, KierrosLento.Kiedo(p.Suuntima + kierto), p.KatseKorkeusM);
        }

        /// <summary>Lento a → b osuudella t (0…1): nousu – liuku – lasku, katse lentosuuntaan ja lopuksi kohteeseen.</summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            if (matka >= LahiRajaM) return OpasSilmukka.Lennossa(a, b, t);
            double s = KierrosLento.Smootherstep(t);
            // Korkeustasanne: nousu ja lasku pehmeästi, liuku tasaisena välissä.
            double h = KierrosLento.Smootherstep(Math.Min(1, t / NousuLoppu)) * (1 - KierrosLento.Smootherstep(Math.Max(0, (t - LaskuAlku) / (1 - LaskuAlku))));
            double kaari = Rajaa(KaariOsuus * matka, matka < 50 ? 0 : KaariMinM, KaariMaxM) * h;
            // Katse: alku → lentosuunta (0…1/3) → kohteen kehyssuunta (2/3…1); hyvin lyhyellä matkalla suoraan a → b.
            double lento = matka < 50 ? b.Suuntima : OpasSilmukka.Suunta(a.Lat, a.Lon, b.Lat, b.Lon);
            double w1 = KierrosLento.Smootherstep(Math.Min(1, t * 3)), w2 = KierrosLento.Smootherstep(Math.Max(0, t * 3 - 2));
            double suunta = KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(lento - a.Suuntima) * w1);
            suunta = KierrosLento.Kiedo(suunta + KierrosLento.Kiedo(b.Suuntima - suunta) * w2);
            double L(double x, double y) => x + (y - x) * s;
            double kall = L(a.Kallistus, b.Kallistus) + LiukuKallistus * h;
            return new Kuvakulma(L(a.Lat, b.Lat), L(a.Lon, b.Lon), L(a.EtaisyysM, b.EtaisyysM) + kaari, Math.Min(85, kall), suunta,
                L(a.KatseKorkeusM, b.KatseKorkeusM));
        }

        static double Rajaa(double x, double min, double max) => Math.Max(min, Math.Min(max, x));

        /// <summary>∫₀ˣ smoothstep(u) du = x³ − x⁴/2 (x ∈ 0…1; x = 1 → 0,5).</summary>
        static double SmoothstepIntegraali(double x) => x * x * x - 0.5 * x * x * x * x;
    }
}
