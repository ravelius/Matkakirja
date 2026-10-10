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
        public const double PalloMatalampiAst = 6, AukioEtMaxM = 220;
        static readonly System.Collections.Generic.HashSet<string> AukioLuokat = new System.Collections.Generic.HashSet<string> { "aukio", "tori" };
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
        /// <summary>Ympäröivien kattojen korkeus maan yläpuolella: 90. persentiili ulkokehän näytteistä (alle 6 näytettä → NaN; ei negatiivinen).</summary>
        public static double Ymparys(List<double> korkeudet)
        {
            if (korkeudet == null || korkeudet.Count < 6) return double.NaN;
            var l = new List<double>(korkeudet); l.Sort();
            return Math.Max(0, l[Math.Min(l.Count - 1, (int)Math.Floor(0.9 * (l.Count - 1) + 0.5))]);
        }

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
                    et = Rajaa(tiukka, KatuEtMinM, KatuEtMaxM); kall = KatuKallistus; nosto = Rajaa(korkeus * 0.4, 4, 25);
                    // Aukio lähempää (Päätoimittaja 9.10.: "Concorde lähempää, niin että obeliski erottuu"): keskusta, ei koko aukio.
                    if (OpasSilmukka.PalloLento && AukioLuokat.Contains((luokka ?? k?.Luokka ?? "").Trim().ToLowerInvariant())) et = Math.Min(et, AukioEtMaxM);
                    break;
                case Luokka.Alue:
                    et = Rajaa(tiukka, AlueEtMinM, AlueEtMaxM); kall = AlueKallistus; nosto = Rajaa(korkeus * 0.3, 5, 40); break;
                default:
                    et = Rajaa(tiukka, RakennusEtMinM, RakennusEtMaxM);
                    kall = RakennusKallistus; nosto = Rajaa((korkeus > 0 ? korkeus : koko * 0.3) * 0.45, 5, 70); break;
            }
            // MATALAMPI KATSELU (omistaja 9.10.: "kaupunkia olisi kivempi katsella vähän matalempaa ja samalla hieman orbit panoroiden"):
            // pallossa kehys PalloMatalampiAst viistommin (silmä matalammalla), ja kohdekaari laskee siitä vielä (Spiraali).
            // Vaakaetäisyys pysyy (silmä samassa kohdassa kartalla, vain matalammalla; Granada Alhambra → Kaarle V 128 m: kauempana
            // ollut silmä palasi lennolla taaksepäin), joten katse-etäisyys lyhenee.
            if (OpasSilmukka.PalloLento) { double k2 = Math.Min(80, kall + PalloMatalampiAst); et *= Math.Sin(kall * Math.PI / 180) / Math.Sin(k2 * Math.PI / 180); kall = k2; }
            // KORKEA KOHDE (Päätoimittaja 7.10. 04.3x: Eiffelin huippu leikkautui, Liikun jälkeen kolmannes tornista yli reunan):
            // etäisyys pystysuuntaisen näkökentän mukaan niin, että juuri ja huippu mahtuvat kuvaan marginaalilla.
            double minEt = 0;
            if (korkeus >= KorkeaRajaM) { minEt = KorkeaEtaisyys(korkeus, kall, nosto, 50); et = Math.Max(et, minEt); }   // pienin mahtuva: lähemmäs-vaihe saa mennä siihen asti
            // KIERRON ALKU- JA LOPPUETÄISYYS (omistaja 10.10.: "riemukaari muuten kuvataan hieman liian läheltä ja concorden aukio ehkä
            // liian kaukaa, koska se obeliski on niin pieni … ensin kuvataan siltä etäisyydeltä kuin nyt mutta pallon liikkuessa ja
            // kiertäessä kohdetta se samalla myös lähentyisi sitä"; PT: lopussa kohde täyttää noin kolmanneksen kuvan korkeudesta,
            // alussa koko kohde ympäristöineen): loppuetäisyys korkeudesta (KorkeusM, aukiolla keskusmonumentti AukioKohdeKorkeusM,
            // muuten koko leveyssuunnassa) niin, että kohde on KolmannesOsuus kuvasta, luokan rajoissa. Alku on nykyinen kehys, kuitenkin
            // PalloAlkuMinKerroin…PalloAlkuMaxKerroin × loppu (Riemukaari 101 → 201 m, loppu 161 m; Concorde 211 → 148 m, loppu 74 m).
            // Suuri matala kohde (Louvre, Champs-Élysées): loppu ≥ alku → ei lähestymistä. Korkea kohde (≥ KorkeaRajaM, tornit ja
            // kirkot): alku pysyy KORKEA KOHDE -kehyksenä (koko torni kuvassa, PT 7.10.), kolmannes-sääntö vain lähestymisen loppuna, jos
            // se on lähempänä (Tampere: 168 m:n Näsinneulan kehys 400 → 676 m työnsi 85 m:n hypyn lennon 5 m taaksepäin).
            double loppuEt = 0;
            if (OpasSilmukka.PalloLento)
            {
                // Korkeudeton kohde: koko täyttää kolmanneksen kuvan LEVEYDESTÄ (koko / KuvaSuhde pystykentässä), eikä alkua työnnetä
                // kauemmas (Tukholman kaupungintalo, koko 130 m ilman korkeutta: kehys 150 → 523 m kiersi saapuessa 166°).
                string ln = (luokka ?? k?.Luokka ?? "").Trim().ToLowerInvariant();
                bool aukio = korkeus <= 0 && AukioLuokat.Contains(ln), mitattu = korkeus > 0 || aukio;
                double hKoko = korkeus > 0 ? korkeus : aukio ? AukioKohdeKorkeusM : koko / KuvaSuhde;
                double luokanMax = korkeus >= KorkeaRajaM ? KorkeaEtMaxM : l == Luokka.Katu ? KatuEtMaxM : l == Luokka.Alue ? AlueEtMaxM : RakennusEtMaxM;
                loppuEt = Rajaa(hKoko / (KolmannesOsuus * 2 * tanPysty), Math.Max(PalloLoppuMinM, minEt), luokanMax);
                if (mitattu && korkeus < KorkeaRajaM && loppuEt * PalloAlkuMinKerroin <= luokanMax)
                    et = Rajaa(et, loppuEt * PalloAlkuMinKerroin, Math.Max(loppuEt * PalloAlkuMinKerroin, Math.Min(luokanMax, loppuEt * PalloAlkuMaxKerroin)));
                et = Math.Max(et, minEt);
                if (loppuEt >= et) loppuEt = 0;   // ei lähestymistä
            }
            nosto -= KatseAlasOsuus * et;   // kohde hieman keskikohdan yläpuolelle (sirut eivät peitä)
            // ESITTELYKORKEUS (omistaja TF 169, PT 9.10.: "rakennukset ovat kuitenkin kolmiulotteisia, ja liian korkealta katsottuna ne
            // eivät näytä juuri miltään verrattuna siihen, että ollaan noin rakennuksen puolivälin korkeudella tai hieman yläpuolella"):
            // pallossa silmä EsittelyOsuus × korkeus maasta, kuitenkin ympäröivien kattojen yläpuolella (YmparysM + KattoVaraM, omasta
            // korkeusmallista, ei Googlen laatoista). Vaakaetäisyys pysyy; silmä laskee ja katse kääntyy kohti vaakaa (enintään KallistusMax).
            double kattoYla = OpasOhjaus.KattoYlaM;
            if (OpasSilmukka.PalloLento && !double.IsNaN(k.YmparysM))
            {
                kattoYla = Math.Max(PalloKattoMinM, k.YmparysM + KattoVaraM);
                {
                    const double A = Math.PI / 180;
                    double vaaka = et * Math.Sin(kall * A), silma = nosto + et * Math.Cos(kall * A);
                    // ALUE (kuva-arkki 9.10., P3/T3: Louvre, Concorde, Champs-Élysées, Gamla stan, Kuninkaanlinna saapuivat 64°:n
                    // kartta-asennossa, koska alue jäi esittelykorkeuden ulkopuolelle): suuri kohde katsotaan kattojen yläpuolelta
                    // viistosti, kallistus enintään AlueEsittelyKallistus (koko alue pysyy kuvassa; spiraali laskee loppua kohti).
                    double tavoite = l == Luokka.Alue
                        ? Math.Max(kattoYla, nosto + vaaka / Math.Tan(AlueEsittelyKallistus * A))
                        : Math.Max(Math.Max(kattoYla, korkeus > 0 ? EsittelyOsuus * korkeus : kattoYla),
                            // PITKÄ MATALA RAKENNUS (PT 9.10., LS2:n tarvearvio: Orsayn pysähdyksessä silmä 28 m:ssä viereisen kadun yllä,
                            // museo reunassa): silmä vähintään PitkaKokoOsuus × koko, kun koko > PitkaSuhde × korkeus.
                            koko > PitkaSuhde * korkeus ? PitkaKokoOsuus * koko : 0);
                    if (tavoite < silma)
                    {
                        double h = Math.Max(tavoite - nosto, vaaka / Math.Tan((OpasOhjaus.KallistusMax - 1) * A));
                        kall = Math.Atan2(vaaka, Math.Max(1, h)) / A; et = Math.Sqrt(vaaka * vaaka + h * h);
                    }
                }
            }
            return new Pysahdys
            {
                Id = k.Id ?? k.Nimi, Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = k.Teksti, Lat = k.Lat, Lon = k.Lon, MaaM = maaM, NostoM = nosto,
                Suuntima = KierrosLento.Kiedo(tulosuunta + SivuKulma), Kallistus = kall, EtaisyysM = et, MinEtM = minEt, KattoYlaM = kattoYla,
                LoppuEtM = loppuEt > 0 && loppuEt < et ? loppuEt : 0,
            };
        }
        /// <summary>Kierron loppu (PT 10.10.): kohde täyttää näin suuren osan pystykentästä (KuvaPystyAst) kierron lopussa.</summary>
        public const double KolmannesOsuus = 1.0 / 3;
        /// <summary>Kierron alku loppuetäisyyden kerrannaisena (alussa kohde ympäristöineen; kehys pidetään, jos se on välissä).</summary>
        public const double PalloAlkuMinKerroin = 1.25, PalloAlkuMaxKerroin = 2.0;
        /// <summary>Kierron loppuetäisyys vähintään (m) ja aukion keskusmonumentin oletuskorkeus (m; Concorden obeliski 23 m), kun
        /// workerin korkeus_m puuttuu.</summary>
        public const double PalloLoppuMinM = 70, AukioKohdeKorkeusM = 23;

        /// <summary>Pysähdyksen asento hetkellä aikaS saapumisesta: pehmeästi alkava hidas kierto ja kevyt dolly sisään.
        /// aikaS = 0 antaa täsmälleen kehyksen (lennon loppu), joten saapuminen on jatkuva.</summary>
        public static Kuvakulma Pysahdyksella(Pysahdys p, double aikaS) => Pysahdyksella(p, aikaS, true);

        public static Kuvakulma Pysahdyksella(Pysahdys p, double aikaS, bool kiertaa)
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
            // Pallo (LS2:n PalloKierrosTestit 8.10.): ei toista kehystä eikä dollya — 13 s:n jälkeen silmä nykäisi puheen aikana
            // 17–85 m/s, ja dolly jatkui lipumisen jarrun jälkeen (lento ei lähtenyt levosta). Liikkeen hoitaa lipuminen.
            if (!kiertaa) { s = 0; dolly = 1; }
            bool lahemmas = Math.Abs(p.Kallistus - RakennusKallistus) < 0.5;   // rakennus/torni: yksityiskohta lähempää
            double lisaSuunta = lahemmas ? 0 : SiirtoKulma * s;
            double etKerroin = (lahemmas ? 1 + (LahemmasOsuus - 1) * s : 1) * (1 + SiirtoUlosOsuus * Math.Sin(Math.PI * s));
            double kall = p.Kallistus + (lahemmas ? LahemmasKallistus * s : 0);
            double et = p.EtaisyysM * dolly * etKerroin;
            // Lähennys ei vie kameraa rakennukseen: vähintään RakennusEtMinM tai kehyksen oma etäisyys, jos se on pienempi
            // (kattoraja hoitaa lisäksi OpasOhjaus.Sovella).
            if (lahemmas) et = Math.Max(et, Math.Min(p.EtaisyysM, RakennusEtMinM));
            if (p.MinEtM > 0) et = Math.Max(et, p.MinEtM);   // korkea kohde: koko kohde kuvassa myös lähemmäs-vaiheessa ja dollyssa
            if (!kiertaa) { kierto = 0; lisaSuunta = 0; }   // pallo: ei kiertoa kohteen ympäri (Lipuminen hoitaa liikkeen)
            return new Kuvakulma(p.Lat, p.Lon, et, kall, KierrosLento.Kiedo(p.Suuntima + kierto + lisaSuunta), p.KatseKorkeusM);
        }

        /// <summary>
        /// LIPUMINEN (omistaja 8.10. 08.3x: "kun ollaan katsomassa kohdetta, [pallo] valmiiksi lipuu siihen suuntaan, missä seuraava kohde
        /// on, pitäen kuitenkin kameran suunnan siihen päin, missä nykyinen kohde on"): silmä siirtyy vaakasuunnassa matkan d kohti
        /// pistettä (lat, lon), katsepiste ja silmän korkeus pysyvät; suuntima, kallistus ja etäisyys lasketaan uudesta silmästä.
        /// </summary>
        public static Kuvakulma Lipunut(Kuvakulma k, double kohtiLat, double kohtiLon, double dM) => Lipunut(k, kohtiLat, kohtiLon, dM, out _);

        /// <summary>kaariLoppu = kaari on päässä (seuraavan puolella tai sen tasalla): pallo leijuu (omistaja 18.4x).</summary>
        public static Kuvakulma Lipunut(Kuvakulma k, double kohtiLat, double kohtiLon, double dM, out bool kaariLoppu)
        {
            const double R = 6371000, A = Math.PI / 180;
            double ke = (kohtiLon - k.Lon) * R * Math.Cos(k.Lat * A) * A, kn = (kohtiLat - k.Lat) * R * A;
            // Seuraava samassa paikassa (alle 50 m): pallo leijuu (omistaja 18.4x; aineistossa lähes päällekkäisiä kohteita).
            kaariLoppu = ke * ke + kn * kn < 50 * 50;
            if (kaariLoppu || dM <= 0.01) return k;
            var e = KameraPaikka(k, k.Lat, k.Lon);
            double de = ke - e.e, dn = kn - e.n, pit = Math.Sqrt(de * de + dn * dn);
            if (pit < 1) { kaariLoppu = true; return k; }
            // KAARI SAMALLA ETÄISYYDELLÄ (omistaja 8.10. 18.4x: "Pallo voi siis kiertää samalla etäisyydellä saman kohteen toiselle
            // puolelle jos se on lähempänä seuraavaa kohdetta mutta muuten ei kannata lähteä kauemmas"): silmä kiertää kohdetta
            // vaakasäteellä r0 lyhyempää kaarta kohti seuraavan kohteen suuntaa, enintään sen kohdalle (lähin piste); siellä pallo
            // vain leijuu. Ei säteittäistä liikettä, joten etäisyys kohteeseen pysyy saapumisen etäisyytenä.
            double r0 = Math.Sqrt(e.e * e.e + e.n * e.n);
            if (r0 < 1) return k;
            double ero = Math.Atan2(kn, ke) - Math.Atan2(e.n, e.e);
            ero = ero - 2 * Math.PI * Math.Floor((ero + Math.PI) / (2 * Math.PI));   // −π…π
            // Seuraava kaaren sisällä (PalloKaupungitTestit: Granada, Alhambran 500 m:n kaari vei silmän 128 m:n päässä olevan
            // seuraavan ohi, ja lento palasi taaksepäin): kaari päättyy, kun silmä on seuraavan tasalla (0,9 × etäisyys).
            double lK = Math.Sqrt(ke * ke + kn * kn), loppuKulma = lK < r0 ? Math.Acos(Math.Min(1, 0.9 * lK / r0)) : 0;
            double jaljella = Math.Max(0, Math.Abs(ero) - loppuKulma);
            kaariLoppu = dM / r0 >= jaljella;
            double fi = Math.Sign(ero) * Math.Min(dM / r0, jaljella), c = Math.Cos(fi), si = Math.Sin(fi);
            double se = e.e * c - e.n * si, sn = e.e * si + e.n * c;
            double ve = -se, vn = -sn, vaaka = Math.Sqrt(ve * ve + vn * vn), pysty = e.u - k.KatseKorkeusM;
            double suunta = Math.Atan2(ve, vn) / A, kall = Math.Atan2(vaaka, Math.Max(1, pysty)) / A;
            return new Kuvakulma(k.Lat, k.Lon, Math.Sqrt(vaaka * vaaka + pysty * pysty), kall, KierrosLento.Kiedo(suunta), k.KatseKorkeusM);
        }
        /// <summary>
        /// Kohdekaaren spiraali (OpasSilmukka.PysahdysAsento): silmä kiertää katsepistettä kulman fi (°; positiivinen vastapäivään
        /// ylhäältä katsottuna), ja eteneminen q (0…1) pienentää vaakaetäisyyttä SpiraaliLahesty-osuudella ja korkeutta
        /// SpiraaliLasku-osuudella (vähintään SpiraaliMinKorkeusM katsepisteen yläpuolella); katse pysyy kohteessa.
        /// </summary>
        public static Kuvakulma Spiraali(Kuvakulma k, double fi, double q, double maaM = double.NaN, double kattoYla = double.NaN) =>
            Spiraali(k, fi, q, SpiraaliLahesty, OpasSilmukka.PalloLento ? SpiraaliLaskuPallo : SpiraaliLasku, maaM, kattoYla);

        /// <summary>Spiraali omilla osuuksilla (pallon kierto, OpasSilmukka.KiertoSuunnitelma): q = 1 → vaakaetäisyys × (1 − lahesty),
        /// silmän korkeus katsepisteestä × (1 − lasku), alarajat kuten yllä.</summary>
        public static Kuvakulma Spiraali(Kuvakulma k, double fi, double q, double lahesty, double laskuOsuus, double maaM, double kattoYla)
        {
            const double A = Math.PI / 180;
            var e = KameraPaikka(k, k.Lat, k.Lon);
            double c = Math.Cos(fi * A), si = Math.Sin(fi * A), sk = 1 - lahesty * q;
            double se = (e.e * c - e.n * si) * sk, sn = (e.e * si + e.n * c) * sk;
            double ve = -se, vn = -sn, vaaka = Math.Sqrt(ve * ve + vn * vn);
            // Lasku ei saa osua ohjauksen rajoihin (OpasOhjaus.Rajoita: kallistus ≤ KallistusMax, katto ≥ maa + KattoYlaM), koska ne
            // vetäisivät silmää vaakasuunnassa kohteeseen päin (PalloKierrosTestit: Concorde → Madeleine 19 m taaksepäin).
            // ESITTELYKORKEUS (omistaja TF 169): pallossa lasku syvempi (SpiraaliLaskuPallo) ja alaraja kohteen oma katto (ympäröivät katot
            // + 12 m), ei 60 m katseen yläpuolella; "Pariisin alussa pallo laskeutuu koko ajan alemmas Notre-Damea esitellessään".
            double katto = double.IsNaN(kattoYla) ? OpasOhjaus.KattoYlaM : kattoYla, lasku = laskuOsuus;
            double pysty0 = e.u - k.KatseKorkeusM, ala = Math.Max(OpasSilmukka.PalloLento ? 0 : SpiraaliMinKorkeusM, vaaka / Math.Tan((OpasOhjaus.KallistusMax - 1) * A));
            if (!double.IsNaN(maaM)) ala = Math.Max(ala, maaM + katto + 5 - k.KatseKorkeusM);
            double pysty = Math.Max(Math.Min(pysty0, ala), pysty0 * (1 - lasku * q));
            if (vaaka < 1) return k;
            double suunta = Math.Atan2(ve, vn) / A, kall = Math.Atan2(vaaka, Math.Max(1, pysty)) / A;
            return new Kuvakulma(k.Lat, k.Lon, Math.Sqrt(vaaka * vaaka + pysty * pysty), kall, KierrosLento.Kiedo(suunta), k.KatseKorkeusM);
        }
        /// <summary>Kamera kääntyy silmän ympäri kulman d (°): silmä paikallaan, katsepiste kiertää samalla vaakaetäisyydellä.</summary>
        public static Kuvakulma Panoroi(Kuvakulma k, double d)
        {
            if (Math.Abs(d) < 1e-6) return k;
            const double R = 6371000, A = Math.PI / 180;
            double h = k.EtaisyysM * Math.Sin(k.Kallistus * A), su = k.Suuntima * A, su2 = (k.Suuntima + d) * A;
            double de = h * (Math.Sin(su2) - Math.Sin(su)), dn = h * (Math.Cos(su2) - Math.Cos(su));
            return new Kuvakulma(k.Lat + dn / R / A, k.Lon + de / (R * Math.Cos(k.Lat * A)) / A, k.EtaisyysM, k.Kallistus, KierrosLento.Kiedo(k.Suuntima + d), k.KatseKorkeusM);
        }

        /// <summary>Kaaren silmänopeus (m/s) kulmanopeuden rajoin (°/s), spiraalin aikavakio (s), lähestyminen ja lasku (osuus).</summary>
        /// <summary>Esittelykorkeus (omistaja TF 169): silmä osuus × kohteen korkeus maasta; kattojen yläpuolella vähintään vara (m), pallossa katto vähintään (m).</summary>
        public const double EsittelyOsuus = 0.6, KattoVaraM = 12, PalloKattoMinM = 15;
        /// <summary>Alueen (suuri kohde, ei korkeutta) esittelyn kallistus pystysuorasta (°): kattojen yläpuolella, viistosti.</summary>
        public const double AlueEsittelyKallistus = 75;
        /// <summary>Pitkä matala rakennus (koko > PitkaSuhde × korkeus): esittelyn silmä vähintään PitkaKokoOsuus × koko maasta.</summary>
        public const double PitkaSuhde = 4, PitkaKokoOsuus = 0.25;
        public const double KaariNopeusMS = 10, KaariAlkuS = 3, KaariMaxAstS = 5, SpiraaliAikaS = 14, SpiraaliLahesty = 0.0, SpiraaliLasku = 0.35, SpiraaliLaskuPallo = 0.5, SpiraaliMinKorkeusM = 60, SpiraaliMaxMS = 2.5, KaariOsuusSeuraavaan = 0.5;

        /// <summary>Lipumisen huippunopeus (m/s), S-käyrän kesto (s) ja pehmeä katto (osuus välimatkasta, enintään m; tanh).</summary>
        public const double LipumisNopeus = 4, LipumisAlkuS = 6, LipumisOsuus = 0.25, LipumisMaxM = 200;
        /// <summary>Lipumisen ryömintä katon jälkeen: osuus lipumisnopeudesta (0,08 × 4 = 0,32 m/s), ettei pallo seiso pitkällä pysähdyksellä.</summary>
        public const double LipumisRyomintaOsuus = 0.08;
        /// <summary>Lipumisen nopeus ja katto skaalataan kehyksen etäisyydellä (enintään 1 tällä etäisyydellä): 119 m:n lähikuvassa
        /// 4 m/s vei rajan ja kaaren loppuun puolessa minuutissa, jonka jälkeen pallo seisoi.</summary>
        public const double LipumisVertailuEtM = 350;

        /// <summary>
        /// Lento a → b osuudella t (0…1). PEHMEÄ KAARI (omistaja 6.10. 23.4x: "kamera liikkuu välillä turhan nopeasti ja tekee turhan
        /// ylhäällä käyviä liikkeitä … kamera-ajot pehmeämmiksi"; Päätoimittaja kumosi "korkea kaari ripeästi" -linjan, "ei mätkähdystä"
        /// pysyy): yksi kumpu h = sin²(πt) (pystynopeus nolla lähdössä ja laskussa), korkeus suhteessa matkaan (KaariOsuus × matka
        /// pystysuunnassa, lähikohteisiin 0,3), vähintään MinKorkeusM kohteen yläpuolella kesken lennon, kallistus liukuu a → b
        /// hieman jyrkempänä keskellä, sijainti ease-in-out (smootherstep). Katse lentosuuntaan keskellä, lopuksi kohteeseen.
        /// </summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t) => Lennossa(a, b, t, 0);

        /// <summary>Lento a → b; rhoMin = pallolennon kaaren vähimmäiskorkeus (van Wijk–Nuij rho, NopeusRho), 0 = oletus.</summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t, double rhoMin)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            if (matka >= LahiRajaM) return OpasSilmukka.Lennossa(a, b, t);
            if (OpasSilmukka.PalloLento) return PalloLennossa(a, b, t, matka, rhoMin);
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
        /// PALLOLENTO OPTIMAALISELLA ZOOMAUS- JA PANOROINTIPOLULLA (van Wijk & Nuij 2003; juna 166, video 165:n telemetria: pitkillä
        /// hypyillä kuvan nopeudella oli kaksi kumpua, nousu ja laskeutuminen, Concorde +69 % huipun jälkeen): näkymän leveys w ∝
        /// katse-etäisyys ja vaakamatka u kulkevat geodeesia pitkin, jolla koettu nopeus on vakio polun parametrissa s; s = S·p, missä
        /// p on etenemisen S-käyrä (rampit PalloProfiili) → kuvan nopeudella on yksi kumpu, ja se alkaa ja loppuu nollasta. Suunta ja
        /// kallistus seuraavat vaakaosuutta (ei kääntymistä paikallaan). ZoomRho: pienempi = matalampi kaari.
        /// </summary>
        // Omistaja TF 167 (9.10.): "lentää siirtymissä matalammalla" → 0,6 → 0,42 (2,5 km:n lennon huippu ~600 → ~470 m); lipumisen
        // kaari samalla etäisyydellä ennallaan, sumennusten ohitus nostaa yhä tarvittaessa (SumennusRho).
        // Päätoimittaja 9.10. (omistaja: "siirtymälento matalammaksi, nousu vain esteiden yli") → 0,42 → 0,3.
        public const double ZoomRho = 0.3;
        /// <summary>
        /// NOPEA LENTO NOUSEE KAARESSA (omistaja 9.10. 13.1x: "lento voi olla nopea … kiihdytys pehmeää, samoin jarrutus"; PT: jos
        /// matala nopea ohitus sumentaa, nosta lentoa kaaressa matkan keskellä nopeuden sijaan; kuva-arkki 9.10.: Champs → Sacré-Cœur
        /// 416 m/s noin 250 m:n korkeudella, laatat sumeat): pienin rho (ZoomRho … SumennusRhoMax), jolla kuvan nopeus (silmän nopeus
        /// / katse-etäisyys) on enintään PalloKuvaNopeusMax. Kesto ei muutu; lisäkorkeus menee keskelle matkaa (pystysuoraan, ei taaksepäin).
        /// </summary>
        public static double NopeusRho(Kuvakulma a, Kuvakulma b, double kestoS)
        {
            if (!OpasSilmukka.PalloLento || kestoS <= 0) return 0;
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon);
            if (matka >= LahiRajaM || matka < 1) return 0;
            for (double r = ZoomRho; r < SumennusRhoMax + 1e-9; r += 0.05)
                if (KuvanNopeus(a, b, kestoS, r, matka) <= PalloKuvaNopeusMax) return r <= ZoomRho + 1e-9 ? 0 : r;
            return SumennusRhoMax;
        }
        /// <summary>Pallolennon suurin kuvan nopeus (rad/s).</summary>
        public const double PalloKuvaNopeusMax = 1.0;
        /// <summary>Pallolennon a → b suurin kuvan nopeus (rad/s = silmän nopeus / katse-etäisyys) kestolla kestoS ja kaarella rho.</summary>
        public static double KuvanNopeus(Kuvakulma a, Kuvakulma b, double kestoS, double rho, double matka)
        {
            const int N = 120;
            var p0 = KameraPaikka(PalloLennossa(a, b, 0, matka, rho), a.Lat, a.Lon); double suurin = 0, dt = kestoS / N;
            for (int i = 1; i <= N; i++)
            {
                var k = PalloLennossa(a, b, (double)i / N, matka, rho); var p = KameraPaikka(k, a.Lat, a.Lon);
                double de = p.e - p0.e, dn = p.n - p0.n, du = p.u - p0.u;
                suurin = Math.Max(suurin, Math.Sqrt(de * de + dn * dn + du * du) / dt / Math.Max(1, k.EtaisyysM));
                p0 = p;
            }
            return suurin;
        }

        // PEHMEÄ JARRUTUS PITKILLÄ PALLOLENNOILLA (PT 9.10., Raamattu: pallo ei "mätkähdä maahan", TF 144; Pariisin kulma-arkki:
        // Eiffelin lennolla jarrutus 63 m/s² vs kiihdytys 35, Riemukaari ja Sacré-Cœur päinvastoin 115/102 vs 82/67): van Wijk–Nuij-
        // polun silmän nopeus riippuu polun muodosta (korkeus, kaari), joten ajan S-käyrä ei yksin pidä kiihdytystä ja jarrutusta
        // tasapainossa. Pitkällä lennolla (≥ PalloTasainenRajaM) polku parametroidaan silmän kaarenpituuden mukaan: silmä kulkee
        // saman reitin, mutta kuljettu matka seuraa 7. asteen S-käyrää S(τ), τ = t + PalloJarruVino·t·(1 − t) eli loppuhidastus
        // on hieman alkukiihdytystä pidempi. Kesto ennallaan; kääntö, kallistus ja zoomaus seuraavat samaa parametria.
        // 10.10. (omistaja: "liike saisi hidastua pikkuhiljaa saavuttaessa kohteeseen"; PT: kiihdytykset ja jarrutukset pehmeiksi):
        // raja 1 500 → 0 m, eli myös lyhyet pallolennot (Louvre 1,2 km: jarrutus 0,5 s:n keskiarvona 28,9 → 11,3 m/s²).
        public const double PalloTasainenRajaM = 0, PalloJarruVino = 0.15;
        const int TasainenN = 96;
        static readonly double[] tasainenP = new double[TasainenN + 1], tasainenS = new double[TasainenN + 1], tasainenM = new double[TasainenN + 1];
        static Kuvakulma tasainenA, tasainenB; static double tasainenRho = double.NaN;

        static double TasainenParametri(Kuvakulma a, Kuvakulma b, double t, double matka, double rhoMin)
        {
            if (!(SamaKulma(a, tasainenA) && SamaKulma(b, tasainenB) && rhoMin == tasainenRho))
            {
                tasainenA = a; tasainenB = b; tasainenRho = rhoMin;
                (double e, double n, double u) ed = default;
                for (int i = 0; i <= TasainenN; i++)
                {
                    double p = (double)i / TasainenN;
                    var k = KameraPaikka(PalloPolku(a, b, p, matka, rhoMin), a.Lat, a.Lon);
                    tasainenP[i] = p;
                    tasainenS[i] = i == 0 ? 0 : tasainenS[i - 1] + Math.Sqrt((k.e - ed.e) * (k.e - ed.e) + (k.n - ed.n) * (k.n - ed.n) + (k.u - ed.u) * (k.u - ed.u));
                    ed = k;
                }
                // p(s) luonnollisena kuutiosplinina (toiset derivaatat M): lineaarinen tulkinta portaisti nopeuden solmukohdissa
                // (kiihtyvyyspiikit), spline pitää nopeuden ja kiihtyvyyden jatkuvina.
                var c = new double[TasainenN + 1]; var dd = new double[TasainenN + 1];
                tasainenM[0] = tasainenM[TasainenN] = 0; c[0] = 0; dd[0] = 0;
                for (int i = 1; i < TasainenN; i++)
                {
                    double h0 = Math.Max(1e-9, tasainenS[i] - tasainenS[i - 1]), h1 = Math.Max(1e-9, tasainenS[i + 1] - tasainenS[i]);
                    double r = 6 * ((tasainenP[i + 1] - tasainenP[i]) / h1 - (tasainenP[i] - tasainenP[i - 1]) / h0);
                    double m = 2 * (h0 + h1) - h0 * c[i - 1];
                    c[i] = h1 / m; dd[i] = (r - h0 * dd[i - 1]) / m;
                }
                for (int i = TasainenN - 1; i >= 1; i--) tasainenM[i] = dd[i] - c[i] * tasainenM[i + 1];
            }
            double kokonais = tasainenS[TasainenN];
            if (kokonais < 1) return Eteneminen(t, matka);
            double tau = t + PalloJarruVino * t * (1 - t);
            double x = Math.Max(0, Math.Min(1, tau)), x4 = x * x * x * x;
            // 7. asteen S-käyrä (C3): myös nykäys alkaa ja loppuu nollasta, joten kiihtyvyys kasvaa saumoissa pehmeästi
            // (PalloKierrosTestit: smootherstepillä lähtösauman kiihtyvyys hyppäsi 1,3 m/s² kolmessa ruudussa).
            double kohde = x4 * (35 - 84 * x + 70 * x * x - 20 * x * x * x) * kokonais;
            int lo = 0, hi = TasainenN;
            while (hi - lo > 1) { int m = (lo + hi) / 2; if (tasainenS[m] <= kohde) lo = m; else hi = m; }
            double hh = tasainenS[hi] - tasainenS[lo];
            if (hh < 1e-9) return tasainenP[lo];
            double A1 = (tasainenS[hi] - kohde) / hh, B1 = 1 - A1;
            double tulos = A1 * tasainenP[lo] + B1 * tasainenP[hi] + ((A1 * A1 * A1 - A1) * tasainenM[lo] + (B1 * B1 * B1 - B1) * tasainenM[hi]) * hh * hh / 6;
            return Math.Max(0, Math.Min(1, tulos));
        }

        static bool SamaKulma(Kuvakulma x, Kuvakulma y) =>
            x.Lat == y.Lat && x.Lon == y.Lon && x.EtaisyysM == y.EtaisyysM && x.Kallistus == y.Kallistus && x.Suuntima == y.Suuntima && x.KatseKorkeusM == y.KatseKorkeusM;

        static Kuvakulma PalloLennossa(Kuvakulma a, Kuvakulma b, double t, double matka, double rhoMin = 0) =>
            PalloPolku(a, b, matka >= PalloTasainenRajaM ? TasainenParametri(a, b, t, matka, rhoMin) : Eteneminen(t, matka), matka, rhoMin);

        /// <summary>Pallolennon asento polun parametrilla p (0–1; van Wijk–Nuij-zoomauspolku).</summary>
        static Kuvakulma PalloPolku(Kuvakulma a, Kuvakulma b, double p, double matka, double rhoMin)
        {
            double w0 = Math.Max(1, a.EtaisyysM), w1 = Math.Max(1, b.EtaisyysM);
            var (sv, et) = ZoomPolku(w0, w1, matka, p);
            double V(double x, double y) => x + (y - x) * sv;
            double kall = V(a.Kallistus, b.Kallistus);
            // Sumennuksen ohitus samalla zoomauspolulla (omistaja TF 166, 18.3x: "lähteekin yhtäkkiä hetkeksi taaksepäin ja palaa";
            // PalloKierrosTasaisuusTestit: kaikki taaksepäin nykäisyt tulivat erillisestä etäisyyskummusta): suurempi rho nostaa
            // van Wijk–Nuij-kaarta niin, että ohituskohdassa katse-etäisyys on SumennusEtM, ja kuvan nopeudella on yhä yksi kumpu.
            // Silmän vaakaetäisyys kohteesta pidetään peruspolun mukaisena (et·sin(kall)), jolloin lisänousu menee suoraan ylös eikä
            // silmä liiku taaksepäin; kallistus jyrkkenee nousun ajaksi.
            double rho = Math.Max(SumennusRho(a, b, w0, w1, matka), rhoMin);
            if (rho > ZoomRho) et = Math.Max(et, ZoomPolku(w0, w1, matka, p, rho).leveys);
            // ZOOMAUS PYSTYSUUNNASSA (PalloKaupungitTestit 8.10.: 37 kaupungissa silmä kulki taaksepäin 1–75 m, kun pallo lähti
            // kaaren päästä katsoen kohteesta poispäin tai saapui kääntörajan takia sivuttain/taaksepäin; zoomauskaari työnsi silmää
            // katsesuunnan mukana eteen ja veti takaisin): silmän vaakaetäisyys kohteesta muuttuu suoraan lähtö- ja tulokehyksen
            // välillä (vaakaosuuden mukana), ja kaaren lisäetäisyys menee ylöspäin (kallistus jyrkkenee). Katse-etäisyys ja kuvan
            // koko seuraavat yhä van Wijk–Nuij-polkua.
            double A = Math.PI / 180, ha = a.EtaisyysM * Math.Sin(a.Kallistus * A), hb = b.EtaisyysM * Math.Sin(b.Kallistus * A);
            double ua = a.EtaisyysM * Math.Cos(a.Kallistus * A), ub = b.EtaisyysM * Math.Cos(b.Kallistus * A);
            double hv = V(ha, hb), uv = V(ua, ub);
            double suunta = KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(b.Suuntima - a.Suuntima) * sv);
            // LYHYT LENTO, SILMÄN SUORA POLKU (PalloKaupungitTestit: Granada 128 m, suunta 73 → 98° 300 m:n vaakaetäisyydellä kaarsi
            // silmää 22 m eteen ja 12 m takaisin): silmä kulkee vaakatasossa suoraan lähtöpaikasta loppupaikkaan ja katsoo kohteeseen,
            // jos silmän ja katsepisteen polut eivät lähesty toisiaan (ei nopeaa kääntöä); muuten suunta kääntyy kuten ennen.
            if (matka < LyhytSuoraM && TryLyhytSuora(a, b, sv, ha, hb, out double h2, out double s2)) { hv = h2; suunta = s2; }
            et = Math.Max(et, Math.Sqrt(hv * hv + uv * uv));
            kall = Math.Asin(Math.Min(1, hv / et)) / A;
            double kLat = V(a.Lat, b.Lat), kLon = V(a.Lon, b.Lon);
            // VIISTO KATSE LENNOLLA (kuva-arkki 9.10., elokuvalinja: Concorde → Eiffel ja Champs → Sacré-Cœur katsoivat lähes suoraan
            // alas sumeiden laattojen yli, kun zoomauskaaren lisäetäisyys meni ylös ja kallistus putosi ~10°:een): kallistus enintään
            // PalloLentoJyrkennysMaxAst kehysten kallistusta jyrkempi. Silmä pysyy paikallaan (ei taaksepäin nykäisyä), katsepiste
            // siirtyy suuntimaa pitkin eteenpäin; pehmeä siirtymä ±8° rajan ympärillä, lennon päissä ei vaikutusta.
            double kMin = V(a.Kallistus, b.Kallistus) - PalloLentoJyrkennysMaxAst;
            if (kall < kMin + 8)
            {
                double x = Math.Max(0, Math.Min(1, (kMin + 8 - kall) / 16)), sx = x * x * (3 - 2 * x);
                double kUusi = kall + (kMin - kall) * sx, korkeus = et * Math.Cos(kall * A);
                double siirto = korkeus * Math.Tan(kUusi * A) - et * Math.Sin(kall * A);
                const double R = 6371000;
                kLat += siirto * Math.Cos(suunta * A) / R / A;
                kLon += siirto * Math.Sin(suunta * A) / (R * Math.Cos(kLat * A)) / A;
                et = korkeus / Math.Cos(kUusi * A); kall = kUusi;
            }
            return new Kuvakulma(kLat, kLon, et, kall, suunta, V(a.KatseKorkeusM, b.KatseKorkeusM));
        }
        /// <summary>Pallolennon kallistus enintään näin monta astetta kehysten kallistusta jyrkempi (katse viistossa, ei suoraan alas).</summary>
        public const double PalloLentoJyrkennysMaxAst = 20;

        public const double LyhytSuoraM = 1500;
        static bool TryLyhytSuora(Kuvakulma a, Kuvakulma b, double sv, double ha, double hb, out double h, out double suunta)
        {
            h = 0; suunta = 0;
            var ea = KameraPaikka(a, a.Lat, a.Lon); var eb = KameraPaikka(b, a.Lat, a.Lon);
            const double R = 6371000, A = Math.PI / 180;
            double be = (b.Lon - a.Lon) * R * Math.Cos(a.Lat * A) * A, bn = (b.Lat - a.Lat) * R * A;
            double raja = 0.4 * Math.Min(ha, hb);
            for (int i = 0; i <= 16; i++)
            {
                double f = i / 16.0, de = be * f - (ea.e + (eb.e - ea.e) * f), dn = bn * f - (ea.n + (eb.n - ea.n) * f);
                if (de * de + dn * dn < raja * raja) return false;
            }
            double te = be * sv - (ea.e + (eb.e - ea.e) * sv), tn = bn * sv - (ea.n + (eb.n - ea.n) * sv);
            h = Math.Sqrt(te * te + tn * tn); suunta = KierrosLento.Kiedo(Math.Atan2(te, tn) / A);
            return true;
        }

        /// <summary>van Wijk–Nuij: leveydestä w0 leveyteen w1 vaakamatkan u1 yli; p 0…1 → (vaakaosuus 0…1, leveys).</summary>
        public static (double osuus, double leveys) ZoomPolku(double w0, double w1, double u1, double p, double rho = ZoomRho)
        {
            p = Math.Max(0, Math.Min(1, p));
            if (u1 < 1e-3 * Math.Max(w0, w1)) return (p, w0 * Math.Exp(Math.Log(w1 / w0) * p));   // pelkkä zoomaus
            double r = rho, r2 = r * r, r4 = r2 * r2;
            double b0 = (w1 * w1 - w0 * w0 + r4 * u1 * u1) / (2 * w0 * r2 * u1), b1 = (w1 * w1 - w0 * w0 - r4 * u1 * u1) / (2 * w1 * r2 * u1);
            double q0 = -Asinh(b0), q1 = -Asinh(b1);   // ln(−b + √(b² + 1)) = −asinh(b), ilman kumoutumista
            double S = (q1 - q0) / r, s = S * p;
            double u = w0 / r2 * (Math.Cosh(q0) * Math.Tanh(r * s + q0) - Math.Sinh(q0));
            double w = w0 * Math.Cosh(q0) / Math.Cosh(r * s + q0);
            return (Math.Max(0, Math.Min(1, u / u1)), w);
        }
        static double Asinh(double x) => Math.Sign(x) * Math.Log(Math.Abs(x) + Math.Sqrt(x * x + 1));

        /// <summary>
        /// GOOGLEN SUMENTAMAT KOHTEET (Päätoimittaja 8.10. 10.3x, video 165: "huurrelasin näköiset läiskät" olivat Googlen 3D-aineiston
        /// omia sumennuksia, prefektuuri ja Élysée): kun lentolinja kulkee alle SumennusRajaM:n päästä, katse-etäisyys nousee pehmeällä
        /// kummulla ohituskohdan ympärillä kohti SumennusEtM:ää, jolloin sumennus näkyy pienenä kaukana. Reittiä ja järjestystä ei
        /// muuteta eikä mitään peitetä omalla kerroksella (Googlen ehdot). Kumpu häviää lennon päissä (kehykset ennallaan). Lisää
        /// kohteita sitä mukaa kuin niitä löytyy videoista (sama tunnistus: läiskä liikkuu maiseman mukana myös laattojen ollessa 100 %).
        /// </summary>
        public static readonly (string nimi, double lat, double lon)[] GoogleSumennukset =
        {
            ("Pariisin poliisiprefektuuri", 48.8541, 2.3470),
            ("Élysée-palatsi", 48.8704, 2.3167),
            // Juna 167 -video ja kohdekuvat 9.10. (Linssiseppä): Palais-Royalin puutarhan itäpuoli, Concorden luoteiskulma, Kungsholmen.
            ("Banque de France", 48.8649, 2.3404),
            ("Yhdysvaltain suurlähetystö ja Hôtel de Pontalba", 48.8687, 2.3196),
            ("Tukholman poliisitalo (Kronoberg)", 59.3326, 18.0373),
        };
        public const double SumennusRajaM = 250, SumennusTaysiM = 150, SumennusEtM = 500, SumennusPaateM = 400, SumennusIkkuna = 0.35, SumennusReuna = 0.08;
        /// <summary>A/B ja testit: false = ei nostoa.</summary>
        public static bool SumennusNostoPaalla = true;

        /// <summary>
        /// Zoomauspolun rho, jolla katse-etäisyys sumennuksen ohituskohdassa on vähintään SumennusNoston tavoite (ZoomRho = ei
        /// sumennusta lähellä). Haetaan 0,05:n askelin ylöspäin (enintään SumennusRhoMax: lähtö- tai tulokehyksen vieressä oleva
        /// sumennus jää osittaiseksi, koska kehykset pysyvät); välimuisti viimeiselle lennolle.
        /// </summary>
        public static double SumennusRho(Kuvakulma a, Kuvakulma b, double w0, double w1, double matka)
        {
            var avain = (a.Lat, a.Lon, b.Lat, b.Lon, w0, w1, SumennusNostoPaalla);
            if (rhoAvain.Equals(avain)) return rhoArvo;
            double rho = ZoomRho;
            if (SumennusNostoPaalla)
            {
                // Tavoite polun pisteissä: SumennusNosto peruspolun leveydestä; riittääkö rho:n polku kaikkialla (16 näytettä).
                bool Riittaa(double r)
                {
                    for (int i = 1; i < 16; i++)
                    {
                        var (o0, wb) = ZoomPolku(w0, w1, matka, i / 16.0);
                        double tavoite = SumennusNosto(a, b, o0, wb);
                        if (tavoite <= wb + 1) continue;
                        double paras = 0;
                        for (int j = 1; j < 32; j++) { var (o, w) = ZoomPolku(w0, w1, matka, j / 32.0, r); if (Math.Abs(o - o0) < 0.04) paras = Math.Max(paras, w); }
                        if (paras < tavoite * 0.97) return false;
                    }
                    return true;
                }
                while (rho < SumennusRhoMax - 1e-9 && !Riittaa(rho)) rho += 0.05;
            }
            rhoAvain = avain; rhoArvo = rho;
            return rho;
        }
        public const double SumennusRhoMax = 1.6;
        static (double, double, double, double, double, double, bool) rhoAvain; static double rhoArvo;

        /// <summary>Katse-etäisyys nostettuna sumennuksen kohdalla (vaakaosuus sv lennolla a → b).</summary>
        public static double SumennusNosto(Kuvakulma a, Kuvakulma b, double sv, double et)
        {
            if (!SumennusNostoPaalla) return et;
            const double R = 6371000, A = Math.PI / 180;
            double cl = Math.Cos(a.Lat * A);
            double bx = (b.Lon - a.Lon) * R * cl * A, by = (b.Lat - a.Lat) * R * A, l2 = bx * bx + by * by;
            double nosto = 0;
            foreach (var (_, la, lo) in GoogleSumennukset)
            {
                double sx = (lo - a.Lon) * R * cl * A, sy = (la - a.Lat) * R * A;
                double k = l2 < 1 ? 0 : Math.Max(0, Math.Min(1, (sx * bx + sy * by) / l2));
                double dx = sx - k * bx, dy = sy - k * by, d = Math.Sqrt(dx * dx + dy * dy);
                if (d >= SumennusRajaM) continue;
                // Päätepisteen vieressä (alle SumennusPaateM; prefektuuri 230 m Notre-Damesta) ei nostoa: kehys pysyy kuitenkin, ja nosto
                // vei lennon 430 m ylös (omistaja 9.10.: "Notre-Dame → Concorde liian korkealla").
                if (Math.Sqrt(sx * sx + sy * sy) < SumennusPaateM || Math.Sqrt((sx - bx) * (sx - bx) + (sy - by) * (sy - by)) < SumennusPaateM) continue;
                double voima = 1 - KierrosLento.Smootherstep(Math.Max(0, Math.Min(1, (d - SumennusTaysiM) / (SumennusRajaM - SumennusTaysiM))));   // täysi ≤ 300 m, hiipuu 400 m:iin
                double ikkuna = 1 - KierrosLento.Smootherstep(Math.Min(1, Math.Abs(sv - k) / SumennusIkkuna));
                double reuna = KierrosLento.Smootherstep(Math.Min(1, Math.Min(sv, 1 - sv) / SumennusReuna));
                nosto = Math.Max(nosto, voima * ikkuna * reuna);
            }
            return nosto <= 0 ? et : et + (Math.Max(et, SumennusEtM) - et) * nosto;
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

        /// <summary>
        /// Suora laskeutuminen a → b (OpasSilmukka.AvausSuoraS): silmä ja katsepiste kulkevat suoria janoja pitkin samalla
        /// smootherstep-käyrällä (kiihtyvyys ja nopeus alkavat ja loppuvat nollasta), suunta ja kallistus silmästä katsepisteeseen.
        /// </summary>
        public static Kuvakulma SuoraLasku(Kuvakulma a, Kuvakulma b, double t)
        {
            double s = KierrosLento.Smootherstep(Math.Max(0, Math.Min(1, t)));
            if (s <= 0) return a;
            if (s >= 1) return b;
            const double R = 6371000, A = Math.PI / 180;
            var ea = KameraPaikka(a, a.Lat, a.Lon); var eb = KameraPaikka(b, a.Lat, a.Lon);
            double ke = (b.Lon - a.Lon) * R * Math.Cos(a.Lat * A) * A * s, kn = (b.Lat - a.Lat) * R * A * s, ku = a.KatseKorkeusM + (b.KatseKorkeusM - a.KatseKorkeusM) * s;
            double se = ea.e + (eb.e - ea.e) * s, sn = ea.n + (eb.n - ea.n) * s, su = ea.u + (eb.u - ea.u) * s;
            double de = ke - se, dn = kn - sn, du = su - ku, vaaka = Math.Sqrt(de * de + dn * dn), et = Math.Sqrt(vaaka * vaaka + du * du);
            double suunta = vaaka > 1 ? KierrosLento.Kiedo(Math.Atan2(de, dn) / A) : KierrosLento.Kiedo(a.Suuntima + KierrosLento.Kiedo(b.Suuntima - a.Suuntima) * s);
            return new Kuvakulma(a.Lat + (b.Lat - a.Lat) * s, a.Lon + (b.Lon - a.Lon) * s, et, Math.Atan2(vaaka, du) / A, suunta, ku);
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
