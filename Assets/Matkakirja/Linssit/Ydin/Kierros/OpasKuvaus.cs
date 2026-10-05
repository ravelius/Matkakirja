// OPPAAN KUVAKIELI (omistaja 5.10.2026: "Onko kameran liikkeet cinemaattiset?"; Päätoimittaja: puhtailla funktioilla ilman
// Cinemachinea, koska kaupunkikameraa ohjaa PalloKierto ja Cesium valitsee laatat ennen LateUpdatea; Siirtoseppä, junaan 145).
// Linssisepän OpasSilmukka kutsuu näitä Kehysta-, KehysAsento- ja Lennossa-funktioidensa tilalla. Kaikki on ajan ja datan puhdas
// funktio (sama syöte → sama kuva), joten mikään ei hyppää eikä riipu kehysnopeudesta.
//  1) KEHYS kohteen luokan mukaan: katu/kanava/aukio matalalta ja viistosti läheltä (Nyhavn), torni/rakennus keskikorkealta
//     korkeuden mukaan, linnoitus/puisto/vesi/alue korkealta ja jyrkästi kauempaa (Kastellet). Luokka workerin "luokka"-kentästä,
//     muuten koosta ja korkeudesta. Kamera ei katso kohdetta suoraan tulosuunnasta vaan 25° sivusta (syvyys, ei litteä).
//  2) PYSÄHDYS: orbit ~0,9°/s pehmeällä alulla ja kevyt dolly sisään; 13 s:n jälkeen 4 s:n siirtolento toiseen kehykseen
//     (katu/alue: kohteen toiselle puolelle +150°, rakennus: yksityiskohta 30 % lähempää), ja orbit jatkuu (omistaja 23.3x).
//  3) LENTO: nousu – korkea jyrkkä liuku – lasku (0–25 %, 75–100 %). Sijainti minimum-jerk-käyrällä (smootherstep), liu'ussa
//     kallistus 30° pystystä ja etäisyys ≥ 1,5 × kehys (ei matalaa liukua karkeiden laattojen yllä, TF 144 -palaute), katse
//     lentosuuntaan ja lopuksi kohteeseen. Yli 20 km: OpasSilmukka.Lennossa (isoympyrä).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasKuvaus
    {
        public enum Luokka { Katu, Rakennus, Alue }

        // Kehys: kallistus kohteen pystysuorasta (0 = suoraan alas, 90 = vaaka), etäisyys koosta, katseen nosto korkeudesta.
        public const double KatuKallistus = 66, RakennusKallistus = 58, AlueKallistus = 58;   // 21.3x: suuret kohteet (katu, alue) viistommin ja lähempää   // katu 74 → 70 (simu 20.3x: matala kulma, laatat 53–59 % saapuessa)
        // TIUKKA KEHYS (omistaja 5.10. 20.5x: "kohde näytti olevan vähän kaukana kuvassa"): kohde täyttää ~40 % ruudun leveydestä
        // (pystykuvakulma 50°, suunniteltu kuvasuhteelle 1,8 → puhelimella ~33 %, iPadilla ~54 %), korkea kohde enintään 60 %
        // ruudun korkeudesta; pienelle kohteelle vähimmäisetäisyys. Katse hieman kohteen alapuolelle → kohde keskikohdan yllä.
        public const double KuvaPystyAst = 50, KuvaSuhde = 1.8, LeveysOsuus = 0.4, KorkeusOsuus = 0.6, KatseAlasOsuus = 0.06;
        public const double KatuEtMinM = 150, KatuEtMaxM = 350, RakennusEtMinM = 150, RakennusEtMaxM = 600, AlueEtMinM = 220, AlueEtMaxM = 350;   // Päätoimittaja 21.3x: Nyhavn/Tivoli/Strøget liian kaukaa → enintään ~350 m
        public const double SivuKulma = 25;
        // Pysähdys
        // KAKSI KEHYSTÄ (omistaja 5.10. 23.3x: "hidas orbit … saisi olla nopeampi ja näyttää samasta kohteesta myös toisen suunnan"):
        // orbit KiertoAsteS VaiheS:n ajan, sitten pehmeä siirtolento SiirtoS: katu ja alue kohteen toiselle puolelle (+SiirtoKulma),
        // rakennus ja torni yksityiskohtaan lähemmäs (×LahemmasOsuus, hieman viistommin), ja sama orbit jatkuu sieltä.
        public const double KiertoAsteS = 0.9, KiertoAlkuS = 3, DollyOsuus = 0.07, DollyAikaS = 25;
        public const double VaiheS = 13, SiirtoS = 4, SiirtoKulma = 150, LahemmasOsuus = 0.7, LahemmasKallistus = 4, SiirtoUlosOsuus = 0.15;
        // Lento
        // TF 144 -palaute (omistaja 6.10.: "mätkähtää lopuksi maahan"; Linssisepän toisto 00.04: lennon lopussa matala viisto liuku
        // karkean laattamassan yllä): lento korkealla ja jyrkkänä (LentoKallistus pystystä, etäisyys ≥ KorkeusKerroin × kehys)
        // viimeiseen neljännekseen asti; vasta silloin lasku ja kääntö kehyksen viistoon kulmaan lähes pystysuunnassa.
        public const double NousuLoppu = 0.25, LaskuAlku = 0.75, KaariOsuus = 0.35, KaariMinM = 250, KaariMaxM = 1600;
        public const double LentoKallistus = 30, KorkeusKerroin = 1.5;
        public const double LahiRajaM = 20000;

        /// <summary>Luokka workerin kentästä ("katu" | "kanava" | "aukio" | "rakennus" | "torni" | "linnoitus" | "puisto" |
        /// "vesi" | …; oletus OpasKohde.Luokka) tai, jos puuttuu, koosta ja korkeudesta.</summary>
        public static Luokka Luokittele(OpasKohde k, string luokka = null)
        {
            switch ((luokka ?? k?.Luokka ?? "").Trim().ToLowerInvariant())
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
            double tanPysty = Math.Tan(KuvaPystyAst * Math.PI / 360), tanVaaka = tanPysty * KuvaSuhde;
            // Etäisyys, jolla kohde täyttää LeveysOsuuden leveydestä ja enintään KorkeusOsuuden korkeudesta.
            double tiukka = Math.Max(koko / (2 * LeveysOsuus * tanVaaka), korkeus / (2 * KorkeusOsuus * tanPysty));
            double et, kall, nosto;
            switch (l)
            {
                case Luokka.Katu:
                    et = Rajaa(tiukka, KatuEtMinM, KatuEtMaxM); kall = KatuKallistus; nosto = Rajaa(korkeus * 0.4, 4, 25); break;
                case Luokka.Alue:
                    et = Rajaa(tiukka, AlueEtMinM, AlueEtMaxM); kall = AlueKallistus; nosto = Rajaa(korkeus * 0.3, 5, 40); break;
                default:
                    et = Rajaa(tiukka, RakennusEtMinM, RakennusEtMaxM);
                    kall = RakennusKallistus; nosto = Rajaa((korkeus > 0 ? korkeus : koko * 0.3) * 0.45, 5, 70); break;
            }
            nosto -= KatseAlasOsuus * et;   // kohde hieman keskikohdan yläpuolelle (sirut eivät peitä)
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
            // Toinen kehys: siirtolento VaiheS → VaiheS + SiirtoS (smootherstep), kaarena hieman ulos (ei läpi kohteen).
            double s = t <= VaiheS ? 0 : t >= VaiheS + SiirtoS ? 1 : KierrosLento.Smootherstep((t - VaiheS) / SiirtoS);
            bool lahemmas = Math.Abs(p.Kallistus - RakennusKallistus) < 0.5;   // rakennus/torni: yksityiskohta lähempää
            double lisaSuunta = lahemmas ? 0 : SiirtoKulma * s;
            double etKerroin = (lahemmas ? 1 + (LahemmasOsuus - 1) * s : 1) * (1 + SiirtoUlosOsuus * Math.Sin(Math.PI * s));
            double kall = p.Kallistus + (lahemmas ? LahemmasKallistus * s : 0);
            double et = p.EtaisyysM * dolly * etKerroin;
            // Lähennys ei vie kameraa rakennukseen: vähintään RakennusEtMinM tai kehyksen oma etäisyys, jos se on pienempi
            // (kattoraja hoitaa lisäksi OpasOhjaus.Sovella).
            if (lahemmas) et = Math.Max(et, Math.Min(p.EtaisyysM, RakennusEtMinM));
            return new Kuvakulma(p.Lat, p.Lon, et, kall, KierrosLento.Kiedo(p.Suuntima + kierto + lisaSuunta), p.KatseKorkeusM);
        }

        /// <summary>Lento a → b osuudella t (0…1): nousu – liuku – lasku, katse lentosuuntaan ja lopuksi kohteeseen.</summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            if (matka >= LahiRajaM) return OpasSilmukka.Lennossa(a, b, t);
            double s = KierrosLento.Smootherstep(t);
            // Nousu (0…NousuLoppu) ja lasku (LaskuAlku…1) pehmeästi; välissä korkea ja jyrkkä liuku.
            double ylos = KierrosLento.Smootherstep(Math.Min(1, t / NousuLoppu));
            double alas = KierrosLento.Smootherstep(Math.Max(0, (t - LaskuAlku) / (1 - LaskuAlku)));
            double h = ylos * (1 - alas);
            double L(double x, double y) => x + (y - x) * s;
            // Korkeus: vähintään KorkeusKerroin × suurempi kehysetäisyys tai kaari matkan mukaan (kumpi suurempi).
            double perus = L(a.EtaisyysM, b.EtaisyysM);
            double huippu = Math.Max(KorkeusKerroin * Math.Max(a.EtaisyysM, b.EtaisyysM), perus + Rajaa(KaariOsuus * matka, matka < 50 ? 0 : KaariMinM, KaariMaxM));
            double et = perus + (huippu - perus) * h;
            // Kallistus: lähtökulmasta jyrkkään (LentoKallistus) nousun aikana, jyrkästä kohteen kulmaan laskun aikana.
            double kall = a.Kallistus + (LentoKallistus - a.Kallistus) * ylos;
            kall += (b.Kallistus - kall) * alas;
            // Katse: alku → lentosuunta (0…1/3) → kohteen kehyssuunta (2/3…1); hyvin lyhyellä matkalla suoraan a → b.
            double lento = matka < 50 ? b.Suuntima : OpasSilmukka.Suunta(a.Lat, a.Lon, b.Lat, b.Lon);
            double w1 = KierrosLento.Smootherstep(Math.Min(1, t * 3)), w2 = KierrosLento.Smootherstep(Math.Max(0, t * 3 - 2));
            double suunta = KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(lento - a.Suuntima) * w1);
            suunta = KierrosLento.Kiedo(suunta + KierrosLento.Kiedo(b.Suuntima - suunta) * w2);
            return new Kuvakulma(L(a.Lat, b.Lat), L(a.Lon, b.Lon), et, kall, suunta, L(a.KatseKorkeusM, b.KatseKorkeusM));
        }

        static double Rajaa(double x, double min, double max) => Math.Max(min, Math.Min(max, x));

        /// <summary>∫₀ˣ smoothstep(u) du = x³ − x⁴/2 (x ∈ 0…1; x = 1 → 0,5).</summary>
        static double SmoothstepIntegraali(double x) => x * x * x - 0.5 * x * x * x * x;
    }
}
