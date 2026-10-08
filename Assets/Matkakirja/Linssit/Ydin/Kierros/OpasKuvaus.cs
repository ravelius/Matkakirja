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
using System.Collections.Generic;

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
        // LÄHEMMÄS (omistaja TF 149, Päätoimittaja 6.10. 16.3x: "kohteet näytetään vieläkin välillä turhan kaukaa"): kohde täyttää
        // ~50 % kuvasta (leveys 0,4 → 0,5, korkeus 0,6 → 0,5) ja vähimmäisetäisyydet alas (150/150/220 → 110/100/160 m), jotta alle
        // ~70 m:n kohteet (patsas, pieni kirkko, Agoran rakennukset) eivät jää pieniksi; yläraja ennallaan.
        public const double KuvaPystyAst = 50, KuvaSuhde = 1.8, LeveysOsuus = 0.5, KorkeusOsuus = 0.5, KatseAlasOsuus = 0.06;
        public const double KatuEtMinM = 110, KatuEtMaxM = 350, RakennusEtMinM = 100, RakennusEtMaxM = 600, AlueEtMinM = 160, AlueEtMaxM = 350;   // Päätoimittaja 21.3x: Nyhavn/Tivoli/Strøget liian kaukaa → enintään ~350 m
        public const double SivuKulma = 25;
        // Pysähdys
        // KAKSI KEHYSTÄ (omistaja 5.10. 23.3x: "hidas orbit … saisi olla nopeampi ja näyttää samasta kohteesta myös toisen suunnan"):
        // orbit KiertoAsteS VaiheS:n ajan, sitten pehmeä siirtolento SiirtoS: katu ja alue kohteen toiselle puolelle (+SiirtoKulma),
        // rakennus ja torni yksityiskohtaan lähemmäs (×LahemmasOsuus, hieman viistommin), ja sama orbit jatkuu sieltä.
        public const double KiertoAsteS = 0.9, KiertoAlkuS = 3, DollyOsuus = 0.07, DollyAikaS = 25;
        public const double VaiheS = 13, SiirtoS = 4, SiirtoKulma = 150, LahemmasOsuus = 0.7, LahemmasKallistus = 4, SiirtoUlosOsuus = 0.15;
        // Lento (juna 156, omistaja 23.4x / Päätoimittaja): pehmeä kaari matkan mukaan (ks. Lennossa). Aiempi TF 144 -linja "korkealla
        // ja jyrkkänä viimeiseen neljännekseen" kumottu; "ei mätkähdystä" hoituu sin²-kummulla (pystynopeus 0 laskussa).
        public const double LahiKaariOsuus = 0.3, KaariOsuus = 0.22, KaariMaxM = 1200, MinKorkeusM = 150, KeskiJyrkennys = 10;
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
            // KORKEA KOHDE (Päätoimittaja 7.10. 04.3x: Eiffelin huippu leikkautui, Liikun jälkeen kolmannes tornista yli reunan):
            // etäisyys pystysuuntaisen näkökentän mukaan niin, että juuri ja huippu mahtuvat kuvaan marginaalilla.
            double minEt = 0;
            if (korkeus >= KorkeaRajaM) { minEt = KorkeaEtaisyys(korkeus, kall, nosto, 50); et = Math.Max(et, minEt); }   // pienin mahtuva: lähemmäs-vaihe saa mennä siihen asti
            nosto -= KatseAlasOsuus * et;   // kohde hieman keskikohdan yläpuolelle (sirut eivät peitä)
            return new Pysahdys
            {
                Id = k.Id ?? k.Nimi, Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = k.Teksti, Lat = k.Lat, Lon = k.Lon, MaaM = maaM, NostoM = nosto,
                Suuntima = KierrosLento.Kiedo(tulosuunta + SivuKulma), Kallistus = kall, EtaisyysM = et, MinEtM = minEt,
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
            // Dolly S-käyränä (omistaja 23.4x): nopeus alkaa nollasta (1 − e^(−(t/τ)²)), ei täydellä nopeudella saapumishetkellä.
            double dolly = 1 - DollyOsuus * (1 - Math.Exp(-(t / DollyAikaS) * (t / DollyAikaS)));
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
            if (p.MinEtM > 0) et = Math.Max(et, p.MinEtM);   // korkea kohde: koko kohde kuvassa myös lähemmäs-vaiheessa ja dollyssa
            return new Kuvakulma(p.Lat, p.Lon, et, kall, KierrosLento.Kiedo(p.Suuntima + kierto + lisaSuunta), p.KatseKorkeusM);
        }

        /// <summary>
        /// Lento a → b osuudella t (0…1). PEHMEÄ KAARI (omistaja 6.10. 23.4x: "kamera liikkuu välillä turhan nopeasti ja tekee turhan
        /// ylhäällä käyviä liikkeitä … kamera-ajot pehmeämmiksi"; Päätoimittaja kumosi "korkea kaari ripeästi" -linjan, "ei mätkähdystä"
        /// pysyy): yksi kumpu h = sin²(πt) (pystynopeus nolla lähdössä ja laskussa), korkeus suhteessa matkaan (KaariOsuus × matka
        /// pystysuunnassa, lähikohteisiin 0,3), vähintään MinKorkeusM kohteen yläpuolella kesken lennon, kallistus liukuu a → b
        /// hieman jyrkempänä keskellä, sijainti ease-in-out (smootherstep). Katse lentosuuntaan keskellä, lopuksi kohteeseen.
        /// </summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            if (matka >= LahiRajaM) return OpasSilmukka.Lennossa(a, b, t);
            double s = Eteneminen(t, matka);
            // Nousukaari etenemisen mukaan (Päätoimittaja 8.10. 07.5x, juna 164 -video: lepo → huippu 1–1,5 s ja viimeinen 0,5 s
            // jyrkkä): ajasta laskettu sin²(πt) aloitti nousun täydellä kiihtyvyydellä (h'' = 2π² hetkellä 0) ja päätti laskun
            // suoraviivaisesti nollaan; s:stä laskettuna nousu, kallistus ja etäisyys alkavat ja loppuvat samalla S-käyrällä kuin eteneminen.
            double h = Kaari(s);
            double L(double x, double y) => x + (y - x) * s;
            double kall = L(a.Kallistus, b.Kallistus) - KeskiJyrkennys * h;
            double cosK = Math.Max(0.25, Math.Cos(kall * Math.PI / 180));
            double perus = L(a.EtaisyysM, b.EtaisyysM);
            double nousu = Rajaa((matka < 1000 ? LahiKaariOsuus : KaariOsuus) * matka, 0, KaariMaxM);   // pystysuunnassa (m)
            // KUVAN NOPEUS (Päätoimittaja / Laitetestaaja 8.10. 08.3x: Louvreen tultaessa näennäinen nopeus kasvoi laskeutuessa):
            // vaakaliike etenee nykyisen korkeuden suhteessa (vaakanopeus ∝ korkeus), joten maan näennäinen nopeus kuvassa seuraa
            // suoraan etenemisen S-käyrää eikä kasva matalalla; korkealla vauhti on suurempi, matalalla pienempi.
            double kMid = Math.Max(0.25, Math.Cos(((a.Kallistus + b.Kallistus) / 2 - KeskiJyrkennys) * Math.PI / 180));
            double pMid = (a.EtaisyysM + b.EtaisyysM) / 2;
            double sv = VaakaOsuus(s, pMid, Math.Min(nousu / kMid, pMid));   // painotus enintään 2 × (huippunopeus ei karkaa)
            double V(double x, double y) => x + (y - x) * sv;
            double et = perus + nousu / cosK * h;
            et = Math.Max(et, perus + (MinKorkeusM / cosK - perus) * h);   // kesken lennon vähintään MinKorkeusM kohteen yläpuolella
            double suunta;
            if (OpasSilmukka.PalloLento)
                // Pallo (omistaja 23.4x: "nopeat käännökset heti kun kohde vaihtuu, ennen kuin siirtyminen alkaa, ovat kaikkein
                // epärealistisimpia; kaikki kiihdytykset S-käyriä mukaillen"): suunta kääntyy suoraan etenemisen mukana (s, ei aika t),
                // joten paikallaan ei käännytä, ja kääntönopeus seuraa lentonopeuden S-käyrää (alkaa ja loppuu nollasta, huippu 2Δ/T).
                suunta = KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(b.Suuntima - a.Suuntima) * sv);   // vaakaliikkeen mukana
            else
            {
                double lento = matka < 50 ? b.Suuntima : OpasSilmukka.Suunta(a.Lat, a.Lon, b.Lat, b.Lon);
                double w1 = KierrosLento.Smootherstep(Math.Min(1, t * 3)), w2 = KierrosLento.Smootherstep(Math.Max(0, t * 3 - 2));
                suunta = KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(lento - a.Suuntima) * w1);
                suunta = KierrosLento.Kiedo(suunta + KierrosLento.Kiedo(b.Suuntima - suunta) * w2);
            }
            return new Kuvakulma(V(a.Lat, b.Lat), V(a.Lon, b.Lon), et, kall, suunta, L(a.KatseKorkeusM, b.KatseKorkeusM));
        }

        /// <summary>
        /// LENNON TELEMETRIA (Päätoimittaja 8.10. 08.3x): silmän nopeusnäytteistä (m/s, tasainen väli dt) nousun ja hidastuksen
        /// kesto 10 % → 90 % huipusta (s) sekä kuvan nopeuden (nopeus / katse-etäisyys) suurin kasvu huipun jälkeen (osuutena).
        /// </summary>
        public static (double nousuS, double hidastusS, double huippu, double kuvaKasvu) Telemetria(IReadOnlyList<double> nopeus, IReadOnlyList<double> etaisyys, double dt)
        {
            int n = nopeus.Count;
            if (n < 3) return (0, 0, 0, 0);
            double huippu = 0; int ih = 0;
            for (int i = 0; i < n; i++) if (nopeus[i] > huippu) { huippu = nopeus[i]; ih = i; }
            int Eka(double raja) { for (int i = 0; i < n; i++) if (nopeus[i] >= raja) return i; return 0; }
            int Vika(double raja) { for (int i = n - 1; i >= 0; i--) if (nopeus[i] >= raja) return i; return n - 1; }
            double nousu = (Eka(0.9 * huippu) - Eka(0.1 * huippu)) * dt, hidastus = (Vika(0.1 * huippu) - Vika(0.9 * huippu)) * dt;
            // Kuvan nopeus kuvan huipusta loppuun: suurin nousu edellisestä minimistä (0 = ei kasva).
            double kuvaHuippu = 0; int ik = 0;
            for (int i = 0; i < n; i++) { double w = nopeus[i] / Math.Max(1, etaisyys[i]); if (w > kuvaHuippu) { kuvaHuippu = w; ik = i; } }
            double kasvu = 0, min = double.MaxValue;
            for (int i = ik; i < n; i++)
            {
                double w = nopeus[i] / Math.Max(1, etaisyys[i]);
                min = Math.Min(min, w);
                if (kuvaHuippu > 0) kasvu = Math.Max(kasvu, (w - min) / kuvaHuippu);
            }
            return (nousu, hidastus, huippu, kasvu);
        }

        /// <summary>
        /// Nousukaari 0–1 etenemisestä (Päätoimittaja 8.10. 08.3x: "laskeutuminen myös S-käyrällä ja ennen jarrutusta"): nousu
        /// smootherstepinä 0–KaariNousuLoppu, huippu, lasku KaariLaskuAlku–KaariLaskuLoppu; loppumatka loppukorkeudella, jolloin
        /// jarrutuksen viimeinen osa on vaakaliikettä eikä laskeutuminen kasvata kuvan nopeutta.
        /// </summary>
        public const double KaariNousuLoppu = 0.4, KaariLaskuAlku = 0.45, KaariLaskuLoppu = 0.85;
        public static double Kaari(double p)
        {
            if (p <= 0 || p >= KaariLaskuLoppu) return 0;
            if (p < KaariNousuLoppu) return KierrosLento.Smootherstep(p / KaariNousuLoppu);
            if (p <= KaariLaskuAlku) return 1;
            return KierrosLento.Smootherstep((KaariLaskuLoppu - p) / (KaariLaskuLoppu - KaariLaskuAlku));
        }

        /// <summary>Vaakaosuus etenemisestä p, kun korkeus on perus + kaari·Kaari(p): ∫₀ᵖ H / ∫₀¹ H (kaari 0 → p); Simpson 48 väliä.</summary>
        public static double VaakaOsuus(double p, double perus, double kaari)
        {
            p = Math.Max(0, Math.Min(1, p));
            if (kaari <= 1e-9 || perus + kaari <= 1e-9) return p;
            double I(double x) { const int n = 48; double hx = x / n, sum = 0; for (int i = 0; i <= n; i++) { double w = i == 0 || i == n ? 1 : (i % 2 == 1 ? 4 : 2); sum += w * (perus + kaari * Kaari(i * hx)); } return sum * hx / 3; }
            return I(p) / I(1);
        }

        /// <summary>Kameran paikka (m) paikallisessa ENU:ssa pisteestä (lat0, lon0): katsekohde − katsesuunta × etäisyys.</summary>
        public static (double e, double n, double u) KameraPaikka(Kuvakulma k, double lat0, double lon0)
        {
            const double R = 6371000, A = Math.PI / 180;
            double te = (k.Lon - lon0) * R * Math.Cos(lat0 * A) * A, tn = (k.Lat - lat0) * R * A;
            double kl = k.Kallistus * A, sm = k.Suuntima * A;
            return (te - Math.Sin(kl) * Math.Sin(sm) * k.EtaisyysM, tn - Math.Sin(kl) * Math.Cos(sm) * k.EtaisyysM, k.KatseKorkeusM + Math.Cos(kl) * k.EtaisyysM);
        }

        /// <summary>
        /// LENTOMITTARI (Päätoimittaja 23.4x: "suurin kiihtyvyys ja suurin pystynopeus laskussa, ennen ja jälkeen"): lento a → b
        /// keston kestoS aikana näytteistettynä tasavälein (ei kehysaikojen kohinaa): suurin kiihtyvyys (m/s²) ja suurin
        /// laskunopeus (m/s, alaspäin positiivinen) kameran paikasta. rata = lentofunktio (oletus Lennossa).
        /// </summary>
        public static (double kiihtyvyys, double lasku) Mittari(Kuvakulma a, Kuvakulma b, double kestoS, Func<Kuvakulma, Kuvakulma, double, Kuvakulma> rata = null)
        {
            rata ??= Lennossa;
            const int N = 400;
            double dt = kestoS / N, maxA = 0, maxL = 0;
            (double e, double n, double u) P(int i) => KameraPaikka(rata(a, b, (double)i / N), a.Lat, a.Lon);
            var p0 = P(0); var p1 = P(1);
            for (int i = 2; i <= N; i++)
            {
                var p2 = P(i);
                double ae = (p2.e - 2 * p1.e + p0.e) / (dt * dt), an = (p2.n - 2 * p1.n + p0.n) / (dt * dt), au = (p2.u - 2 * p1.u + p0.u) / (dt * dt);
                maxA = Math.Max(maxA, Math.Sqrt(ae * ae + an * an + au * au));
                maxL = Math.Max(maxL, -(p2.u - p1.u) / dt);
                p0 = p1; p1 = p2;
            }
            return (maxA, maxL);
        }

        /// <summary>
        /// Eteneminen 0…1 ajan osuudesta: pehmeä kiihdytys, tasainen matkavauhti ja pehmeä jarrutus (nopeus nousee ja laskee
        /// smootherstep-rampilla, joten nopeus, kiihtyvyys ja nykäisy ovat jatkuvia). Lyhyellä matkalla ramppi on puolet lennosta (S-käyrä),
        /// pitkällä (≥ 2 km) neljännes, jolloin keskellä on tasainen vauhti (Päätoimittaja 23.4x).
        /// </summary>
        /// <summary>Rampin osuus lennosta matkan mukaan: ≤ 500 m puolet (S-käyrä), ≥ 2 km neljännes.</summary>
        public static double RamppiOsuus(double matkaM) => matkaM >= 2000 ? 0.25 : matkaM <= 500 ? 0.5 : 0.5 - 0.25 * (matkaM - 500) / 1500;

        public static double Eteneminen(double t, double matkaM)
        {
            t = Math.Max(0, Math.Min(1, t));
            double a = OpasSilmukka.PalloLento ? OpasSilmukka.PalloProfiili(matkaM).osuus : RamppiOsuus(matkaM);
            double kokonais = 1 - a;   // a·½ + (1 − 2a) + a·½
            // Nopeusrampit smootherstepinä (Päätoimittaja 8.10. 07.5x): kiihtyvyys alkaa ja loppuu nollasta (ei nykäisyä), rampin
            // pinta-ala sama a/2 kuin smoothstepillä → huippunopeus ja kesto ennallaan (omistaja).
            double x = t < a ? a * SmootherstepIntegraali(t / a)
                : t > 1 - a ? kokonais - a * SmootherstepIntegraali((1 - t) / a)
                : a * 0.5 + (t - a);
            return x / kokonais;
        }

        /// <summary>Korkea kohde (m): tätä korkeammalle kehys lasketaan pystysuuntaisesta näkökentästä; yläraja KorkeaEtMaxM.</summary>
        public const double KorkeaRajaM = 60, KorkeaEtMaxM = 1200, KorkeaMarginaaliAst = 4;

        /// <summary>
        /// Pienin etäisyys (≥ etAlku, ≤ KorkeaEtMaxM), jolla korkeusM:n kohde kohteen kohdalla näkyy kokonaan: kamera katsoo
        /// kallistuksella (pystysuorasta) pisteeseen nostoPerus − KatseAlasOsuus·et maasta, ja huipun ja juuren kulma katseakselista
        /// on enintään KuvaPystyAst/2 − KorkeaMarginaaliAst. Askel 3 %.
        /// </summary>
        public static double KorkeaEtaisyys(double korkeusM, double kallistus, double nostoPerus, double etAlku)
        {
            double puoli = KuvaPystyAst / 2 - KorkeaMarginaaliAst, akseli = 90 - kallistus;   // katseen painuma vaakatasosta (°)
            double s = Math.Sin(kallistus * Math.PI / 180), c = Math.Cos(kallistus * Math.PI / 180);
            bool Mahtuu(double et)
            {
                double katse = nostoPerus - KatseAlasOsuus * et, silma = katse + et * c, vaaka = et * s;
                double Kulma(double z) => akseli - Math.Atan2(silma - z, vaaka) * 180 / Math.PI;   // + = katseakselin yläpuolella
                return Kulma(korkeusM) <= puoli && Kulma(0) >= -puoli;
            }
            double e = Math.Max(1, etAlku);
            while (e < KorkeaEtMaxM && !Mahtuu(e)) e *= 1.03;
            return Math.Min(e, KorkeaEtMaxM);
        }

        // ---- MAA JA KORKEUS NÄYTTEISTÄ (Päätoimittaja 7.10. 02.0x, juna 156 VIE-este: Eiffelin pysähdyksellä kamera tornin sisällä).
        // Juurisyy: maa näytteistettiin kohteen keskipisteestä (SampleHeightMostDetailed), ja tornissa ja katoissa säde osui
        // rakenteeseen (Eiffel ~190 m, Sydneyn oopperatalo 73 m katto), jolloin kehys rakennettiin latvaan. Maa otetaan nyt kehältä
        // kohteen ympäriltä: MEDIAANI 8 pisteestä (Päätoimittaja 02.1x: rinteessä matalin piste on selvästi jalkaa alempana, ja
        // yksittäinen kuoppa tai naapurin katto ei siirrä mediaania), ja puuttuva korkeus arvioidaan
        // keskipisteen ja maan erotuksesta (workerin korkeus_m tulee mallilta eikä ole aina mukana). ----
        public const int KehaPisteita = 8;
        public const double KorkeusArvioMinM = 20;

        /// <summary>Kehän säde (m) kohteen koosta, 35–60 m: lähellä jalkaa (simu 7.10. 03.5x: Akropoliksen 220 m:n kehä osui
        /// kukkulan rinteeseen, maa 191 → 130 m). Tornissa 60 m osuu jalkojen väliseen maahan tai jalustan viereen.</summary>
        public static double KehaSade(double kokoM) => Rajaa(0.6 * Math.Max(10, kokoM), 35, 60);

        /// <summary>Kehän piste i (0…KehaPisteita−1) kohteen ympärillä.</summary>
        public static (double lat, double lon) KehaPiste(double lat, double lon, double sadeM, int i)
        {
            double a = 2 * Math.PI * i / KehaPisteita;
            return (lat + sadeM * Math.Cos(a) / 111195.0, lon + sadeM * Math.Sin(a) / (111195.0 * Math.Max(0.01, Math.Cos(lat * Math.PI / 180))));
        }

        /// <summary>Maa = min(keskus, kehän mediaani); korkeus = keskus − maa, jos vähintään KorkeusArvioMinM, muuten 0.
        /// NaN-näytteet ohitetaan; ei yhtään kehänäytettä → keskus (vanha käytös).</summary>
        public static (double maa, double korkeus) MaaJaKorkeus(double keskus, IReadOnlyList<double> keha)
        {
            var l = new List<double>();
            if (keha != null) foreach (var h in keha) if (!double.IsNaN(h)) l.Add(h);
            if (l.Count == 0) return (keskus, 0);
            l.Sort();
            double maa = l.Count % 2 == 1 ? l[l.Count / 2] : 0.5 * (l[l.Count / 2 - 1] + l[l.Count / 2]);
            if (!double.IsNaN(keskus)) maa = Math.Min(maa, keskus);
            double korkeus = double.IsNaN(keskus) ? 0 : keskus - maa;
            return (maa, korkeus >= KorkeusArvioMinM ? korkeus : 0);
        }

        static double Rajaa(double x, double min, double max) => Math.Max(min, Math.Min(max, x));

        /// <summary>∫₀ˣ smoothstep(u) du = x³ − x⁴/2 (x ∈ 0…1; x = 1 → 0,5).</summary>
        /// <summary>∫₀ˣ smoothstep (0 ≤ x ≤ 1; arvo 0,5, kun x = 1): S-käyrän mukaan kiihtyvän liikkeen kuljettu osuus.</summary>
        public static double SmoothstepIntegraali(double x) => x * x * x - 0.5 * x * x * x * x;
        /// <summary>∫₀ˣ smootherstep = x⁶ − 3x⁵ + 2,5x⁴ (arvo 0,5 kohdassa 1).</summary>
        public static double SmootherstepIntegraali(double x) { double x4 = x * x * x * x; return x4 * (x * x - 3 * x + 2.5); }

        /// <summary>Pysähdyksen kierron nopeus (°/s) ajassa aikaS saapumisesta (S-käyrä KiertoAlkuS:ssa täyteen).</summary>
        public static double KiertoNopeus(double aikaS)
        {
            double x = Math.Max(0, Math.Min(1, aikaS / KiertoAlkuS));
            return KiertoAsteS * x * x * (3 - 2 * x);
        }

        /// <summary>
        /// Kierron jatko lennon alussa (omistaja 23.4x: "kaikki kiihdytykset S-käyriä mukaillen"): lähtöhetken kiertonopeus nopeus
        /// hiipuu S-käyrää pitkin KiertoAlkuS:ssa nollaan. Palauttaa kulman (°) suhteessa lopulliseen jatkoon (nopeus × KiertoAlkuS / 2):
        /// alussa −nopeus·R/2, R:n jälkeen 0, joten lähtöasentoa siirretään +nopeus·R/2 ja kulma on jatkuva molemmissa päissä.
        /// </summary>
        public static double KierronHiipuminen(double nopeus, double aikaS)
        {
            double r = KiertoAlkuS, x = Math.Max(0, Math.Min(1, aikaS / r));
            return nopeus * r * (x - SmoothstepIntegraali(x) - 0.5);
        }
    }
}
