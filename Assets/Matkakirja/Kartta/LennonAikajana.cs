using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja
{
    /// <summary>Lennon vaihe (LENNON ESITYS): Nappula.Vaihe; Pelikoodari ajoittaa äänet ja luennan, UI tekstit.</summary>
    public enum LennonVaihe { Ei, Nousu, Matka, Lasku }

    /// <summary>
    /// LENNON AIKAJANA — ALOITUSLENNON KAMERAREITTI (omistajan sitova päätös 24.9.2026 klo 16.1x ja Fablen hyväksymä
    /// kamerakäsikirjoitus proto-3d/lokit/kamerakasikirjoitus-lento-20260924.md, build 11). Kamera avainkehyksinä
    /// datana: jokaisella avaimella on osuus lennon kestosta, käyrä (Linssisepän yhteinen Kamerakoreografia), etäisyys
    /// (logaritmisesti), kallistus, suunta ja kohde. Vaiheet 20 s:n referenssilennolla (Lontoo → Ateena):
    ///   (a) SYÖKSY      0,0–2,6 s  kuminauha koneen SIVULLE (suunta 90° lentosuunnasta, kallistus 84°), kone 0,9 ruutua
    ///   (a) SIVUKYLKI   2,6–4,2 s  lähes paikallaan, hidas liuku 90° → 110° (hieman etuviistoon)
    ///   (b) LOITTONUS   4,2–11,0 s 30 km → ~3000 km, kallistus 84° → 35°, suunta 110° → 120°, kiihtyvä + jarruttava
    ///                              pari (nopeus sama saumassa), kohde = kone koko ajan (ruudun keskellä), koko ei alle
    ///                              merkkikoon (Nappula: max(malliPx, Kone × ruudun leveys))
    ///       LIUKU       11,0–12,0 s lähes paikallaan, kohdekaupunki tulee näkyviin
    ///   (c) KIERTO      12,0–15,5 s kohde koneesta kaupunkiin, kamera kiertää kaupunkia, 3000 → 250 km, kallistus
    ///                              35° → 55° smootherstep, kulmanopeus kasvaa (kiihtyvä)
    ///   (d) ORBIT       15,5–20,0 s sama kierto jatkuu vakiokulmanopeudella ja laskeutuu saapumisnäkymään (webin
    ///                              kaupunkinäkymä, PalloKierto.SaapumisNakyma: kallistus 0, pohjoinen ylös); jarrutus vasta
    ///                              viimeisen 1/3:n (1,5 s) aikana, ei pysähdystä kesken.
    /// Kesto skaalautuu reitin pituuden mukaan 16–26 s (<see cref="Kesto"/>, Fable 24.9.), suhteet pysyvät, mutta
    /// sivukylki ≥ 1,4 s ja orbit ≥ 4 s (<see cref="Jaa"/>). Kierron (c + d) kokonaiskulma on enintään 180° lyhyempään
    /// suuntaan (Fable 24.9. klo 18, video kamerareitti-b11k), tavoitenopeus ~35°/s; maisemasuunta (<see cref="Kaupungit"/>)
    /// ratkaisee vain tasatilanteen (180° ± 15°). Sivukylki (90/110/120 tai peilattuna 270/250/240) valitaan sille
    /// puolelle, jolta kierto on lähimpänä tavoitenopeutta (<see cref="Kaari"/>). Ensimmäinen versio (build 11 k) kiersi
    /// kaupungin vastakkaisen puolen ja maiseman kautta 360–410° (64–90°/s), mikä korvattiin.
    ///
    /// KORVATTU (build 10:n aikajana, 24.9.): SIIVEN OHI -syöksy (kone 1,25 ruutua, suunta 100°) ja LÄHIKUVAN panorointi
    /// 205°:een (32 km, kone 0,74) → sivukylki 90° → 110° (30 km, kone 0,9); IRTAUTUMINEN 245°:een ja MATKA 270°:ssa
    /// (tasainen liuku 40–70 %) → loittonus 120°:een ja 1 s:n liuku; LOPPU taulukon viistosta (Kierto.Kallistus,
    /// EtaisyysKm ja Laajuus, kallistus laskussa min(raja, 12°)) → vastakkaisen puolen kierto 250 km:iin ja orbit
    /// saapumisnäkymään kallistukseen 0. Kuvauskulmasääntö "ei koskaan suoraan takaa" pätee yhä: syöksy, sivukylki ja
    /// loittonus ovat 90–120° (tai peilattuna 240–270°) lentosuunnasta. Filmipinon täysi lähikuva on nyt 0,9 (ennen 0,74).
    /// Koneen nopeusprofiili (KoneenOsuus) ja vaihejako seuraavat uusia vaiheita.
    /// </summary>
    public static class LennonAikajana
    {
        /// <summary>
        /// Kohteen koodi: −1 = kameran lähtöpiste (valintanäkymä tai Lontoon zoomi), 0 = lentokone, 1 = kohdekaupunki,
        /// 2 = saapumisnäkymän keskipiste (webin kaupunkinäkymä; kaupunki kohdassa 0,42 × 0,78 ruudusta).
        /// Suunta: jos SuuntaAbs, kameran katsesuunta asteina pohjoisesta; muuten lentosuuntaan lisättävä
        /// (0 = kamera koneen takana, 90/270 = sivulta, 180 = edestä).
        /// </summary>
        public struct Avain
        {
            public double Osuus, Parametri, Etaisyys, Kallistus, Suunta, Kohde;
            /// <summary>Koneen leveys osuutena ruudun leveydestä (0 = tavallinen merkkikoko, Nappula.malliPx).</summary>
            public double Kone;
            public Kayra Kayra;
            /// <summary>Suunnan oma käyrä (null = Kayra): kierto kiihtyy ja kulkee vakionopeudella, vaikka etäisyys pehmenee.</summary>
            public Kayra? SuuntaKayra;
            public bool SuuntaAbs;
        }

        /// <summary>
        /// Kohdekaupungin maisema: katsesuunta (°), josta maisema näkyy parhaiten. Uudessa kamerareitissä (Fable 24.9.)
        /// vain Suunta on käytössä ja ratkaisee kiertosuunnan tasatilanteessa; Kallistus, EtaisyysKm ja Laajuus ovat build 10:n
        /// viistokierron arvoja (talteen, jos kierto palaa).
        /// </summary>
        public readonly struct Kierto
        {
            public readonly double Suunta, Kallistus, EtaisyysKm, Laajuus;
            public Kierto(double suunta, double kallistus, double etaisyysKm, double laajuus = 45)
            { Suunta = suunta; Kallistus = kallistus; EtaisyysKm = etaisyysKm; Laajuus = laajuus; }
        }

        /// <summary>
        /// Aloituskaupunkien maisemat (18 kohdetta Lontoosta, sisältöpaketin aloitus = true). Katsesuunta kohti
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

        /// <summary>Muut kohteet: ei maisemasuuntaa, joten kierto valitsee lyhyemmän suunnan pohjoiseen.</summary>
        public static readonly Kierto EiMaisemaa = new Kierto(double.NaN, 55, 250);

        // ---- Kesto (Fable 24.9.: 16–26 s reitin pituuden mukaan, Lontoo → Ateena = 20 s) ----

        /// <summary>Lontoo → Ateena isoympyränä (R = 6371 km), 20 s:n referenssi.</summary>
        public const double ReferenssiM = 2_392_000.0;
        public const double ReferenssiS = 20.0, LyhinS = 16.0, PisinS = 26.0;
        /// <summary>
        /// Löydös 110 (omistaja 25.9. klo 14.5x): aloituslennon KIINTEÄ kesto (s) kohteesta riippumatta. Vaihejako
        /// (Jaa) on silloin sama kaikille kohteille: nousu (syöksy, sivukylki) ja lasku (kierto, orbit) kestävät
        /// saman ajan, ja ero kurotaan koneen nopeudella matkavaiheessa (KoneenOsuus on normitettu koko reitille).
        /// Omistajan päätös 25.9.: 10 s ("video saa olla vauhdikas"), dynaaminen aikajana JaaAloitus. Muut lennot: Kesto.
        /// </summary>
        public static double AloituslennonKestoS = 10.0;
        /// <summary>Sekuntia reitin pituuden e-kertaistumista kohden: 16 s ≈ 630 km, 26 s ≈ 17 700 km (Sydney 17 000 km → 25,9 s).</summary>
        public const double KestonKerroin = 3.0;

        /// <summary>Lennon kesto sekunteina: 20 + 3 · ln(reitti / Lontoo–Ateena), rajattuna 16–26 s.</summary>
        public static double Kesto(double reittiM) =>
            reittiM > 0 ? Rajaa(ReferenssiS + KestonKerroin * Math.Log(reittiM / ReferenssiM), LyhinS, PisinS) : ReferenssiS;

        /// <summary>Isoympyrän pituus metreinä (R = 6371 km, sama kuin Nappulan reittiM).</summary>
        public static double ReittiM(double lat0, double lon0, double lat1, double lon1) =>
            Kamerakayrat.Kulma(lat0, lon0, lat1, lon1) * Math.PI / 180.0 * 6371000.0;

        // ---- Vaihejako ----

        /// <summary>Vaiheiden kestot 20 s:n referenssillä (s): syöksy, sivukylki, loittonus, liuku, kierto, orbit.</summary>
        public const double SyoksyS = 2.6, SivuS = 1.6, LoittoS = 6.8, LiukuS = 1.0, KiertoS = 3.5, OrbitS = 4.5;
        /// <summary>Käsikirjoituksen alarajat (Fable 24.9.): sivukylki ja orbit eivät lyhene tätä lyhyemmiksi.</summary>
        public const double SivuMinS = 1.4, OrbitMinS = 4.0;
        /// <summary>Loittonuksen kiihtyvän ja jarruttavan puolikkaan sauma osuutena loittonuksesta.</summary>
        public const double LoittoSaumaOsuus = 0.4;
        /// <summary>Orbitin jarrutus osuutena orbitista (1,5 s / 4,5 s).</summary>
        public const double JarrutusOsuus = 1.0 / 3.0;

        /// <summary>Vaiheiden loppuhetket osuutena lennosta (0–1).</summary>
        public readonly struct Jako
        {
            public readonly double KestoS, Syoksy, Sivu, LoittoSauma, Loitto, Liuku, Kierto, Tasainen;
            /// <summary>Aloituslento (<see cref="JaaAloitus"/>): kamera <see cref="AloitusReitti"/>-splinenä (löydös 120).</summary>
            public readonly bool Aloitus;
            public Jako(double kestoS, double syoksy, double sivu, double loittoSauma, double loitto, double liuku, double kierto, double tasainen,
                bool aloitus = false)
            {
                KestoS = kestoS; Syoksy = syoksy; Sivu = sivu; LoittoSauma = loittoSauma; Loitto = loitto;
                Liuku = liuku; Kierto = kierto; Tasainen = tasainen; Aloitus = aloitus;
            }
        }

        /// <summary>
        /// Vaihejako kestolle: suhteet kuten 20 s:n referenssissä, mutta sivukylki ≥ 1,4 s ja orbit ≥ 4 s; muut
        /// vaiheet jakavat loput suhteessa. Alle 12 s:n lennot (pelin mannerlennot) skaalautuvat suoraan.
        /// </summary>
        public static Jako Jaa(double kestoS)
        {
            double k = kestoS > 0 ? kestoS : ReferenssiS;
            double s = k / ReferenssiS;
            double sivu = SivuS * s, orbit = OrbitS * s;
            if (k >= 12.0) { sivu = Math.Max(SivuMinS, sivu); orbit = Math.Max(OrbitMinS, orbit); }
            double muut = SyoksyS + LoittoS + LiukuS + KiertoS;
            double m = (k - sivu - orbit) / muut;
            double t1 = SyoksyS * m, t2 = t1 + sivu, t3 = t2 + LoittoS * m, t4 = t3 + LiukuS * m, t5 = t4 + KiertoS * m;
            double t6 = t5 + orbit * (1 - JarrutusOsuus);
            return new Jako(k, t1 / k, t2 / k, (t2 + LoittoSaumaOsuus * (t3 - t2)) / k, t3 / k, t4 / k, t5 / k, t6 / k);
        }

        // ---- Aloituslennon kamerareitti (löydös 120, Fablen suunnitelma 25.9.; korvaa löydöksen 110 aikajanan) ----
        //
        // Löydös 120 (omistaja build 14): "kamera pomppii liian villisti eri paikkoihin". Löydöksen 110 aikajana teki kaksi
        // erillistä syöksyä 1200 km ↔ 12 km (noin sekunnissa kumpikin) ja vaihtoi kylkeä (80 → 115 → 150 → 165 → 250 →
        // 230 → 120), ja Arvo() interpoloi segmenteittäin omalla käyrällä: Jarruttava alkoi levosta suoraan huippunopeuteen
        // ja Pehmeä pysähtyi jokaiseen avaimeen. Nyt aloituslento on YKSI kamerareitti (AloitusReitti): jokainen kanava
        // (log-etäisyys, kallistus, absoluuttinen suunta, kohde, koneen ruutuosuus) on kvinttinen Hermite-spline aikaa
        // vasten (Kanava: nopeus ja kiihtyvyys jatkuvia, lepoavaimissa molemmat 0), joten sijainti ja katse ovat C2-jatkuvia.
        // Sekunnit 10 s:n lennolla (skaalautuu AloituslennonKestoS:n mukaan), P(x) = suunta koneen suhteen puolen mukaan:
        //   0,0–1,3  SYÖKSY          vahva ease-in, kuminauha: 11 km (1,15 s, ylitys) → 13 km (1,5 s), P(100), 82°, kone 1,8
        //   1,3–2,2  LÄHI 1          lähes paikallaan, hidas panorointi P(100) → P(125), 13 → 12 km
        //   2,2–3,6  KAARTO NOKAN EDESTÄ  P(125) → P(180) → P(235) samaan suuntaan, huippu ~110°/s nokan kohdalla,
        //                            etäisyys hengittää 12 → 24 → 12 km, kallistus 82 → 78 → 82
        //   3,6–4,3  LÄHI 2          hidas ajelehdinta P(235) → P(245)
        //   4,3–6,0  IRTAUTUMINEN    kiihtyvä loittonus kaukonäkymään, laskeutuminen jakautuu 5,3–6,5 s:lle (huippu 6,5 s),
        //                            kallistus → 40°, kone → merkkikoko (fyysinen koko)
        //   6,0–7,0  MATKA           hidas ajelehdinta (huippu → 0,92 × kauko), kone kiitää, suunta liukuu kierron alkuun
        //   7,0–8,6  KIERTO          kohde kone → kaupunki (valmis 8,2 s), → 250 km, 55°, kulmanopeus kasvaa levosta
        //   8,6–10,0 ORBIT + LASKU   vakiokulmanopeus, jarrutus lepoon viimeisen 1,2 s:n aikana saapumisnäkymään
        // Koneen nopeus (Nopeus, Aloitus): lähes paikallaan lähikuvissa (0–4,3 s), nopein matkassa, hidastus kierrosta.

        /// <summary>
        /// Aloituslennon vaihejako (osuudet 0–1, löydös 120): Syoksy = syöksyn loppu (1,3 s), Sivu = lähikuvien loppu
        /// (4,3 s), Loitto = Liuku = irtautumisen loppu eli matkan alku (6,0 s: pilvet ja Sentinel pois kamera kaukana),
        /// Kierto = orbitin alku (8,6 s), Tasainen = orbitin jarrutuksen alku (8,8 s). Kesto <see cref="AloituslennonKestoS"/>.
        /// </summary>
        public static Jako JaaAloitus(double kestoS) =>
            new Jako(kestoS > 0 ? kestoS : AloituslennonKestoS, 0.13, 0.43, 0.515, 0.60, 0.60, 0.86, AloitusJarrutus, aloitus: true);

        /// <summary>Aloituslennon lopun jarrutuksen alku (osuus, 8,8 s): jarrutus lepoon viimeisen 1,2 s:n aikana.</summary>
        public const double AloitusJarrutus = 0.88;

        /// <summary>Aloituslennon matkan loppu = kierron alku (osuus, 7,0 s): Vaihe Matka → Lasku.</summary>
        public const double AloitusMatkaLoppu = 0.70;

        /// <summary>Aloituslennon ensimmäinen lähikuva (löydös 120): etäisyys (m), kallistus (°), suunta koneen suhteen (P).</summary>
        public const double AloitusLahiM = 13_000.0, AloitusLahiKallistus = 82.0, AloitusLahiSuunta = 100.0;
        /// <summary>Koneen leveys ruudusta lähikuvissa (puolet koneesta näkyy, löydös 110) ja kaarron nokan edessä.</summary>
        public const double AloitusLahiKone = 1.9, AloitusKaartoKone = 1.0;
        /// <summary>Kaarron huippukulmanopeus nokan kohdalla (°/s 10 s:n lennolla).</summary>
        public const double AloitusKaartoHuippu = 110.0;
        /// <summary>Irtautumisen loppukallistus (°).</summary>
        public const double AloitusKaukoKallistus = 40.0;
        /// <summary>Irtautumisen lähtöetäisyys (m, lähi 2:n loppu 4,3 s) ja kaukonäkymän huippu (osuus, 6,5 s).</summary>
        public const double AloitusIrtautuminenM = 11_500.0, AloitusHuippu = 0.65;

        // ---- Kameran arvot ----

        /// <summary>Sivukyljen etäisyys (m), kallistus (°) ja koneen leveys ruudusta.</summary>
        public const double LahiM = 30_000.0, LahiKallistus = 84.0, LahiKone = 0.9;
        /// <summary>Loittonuksen loppu: kallistus (°); etäisyys max(3000 km, 1,2 × reitti) enintään 9000 km.</summary>
        public const double KaukoKallistus = 35.0;
        /// <summary>Kierron (c) loppu: etäisyys kaupungista (m) ja kallistus (°).</summary>
        public const double KiertoM = 250_000.0, KiertoKallistus = 55.0;
        /// <summary>Koneen vähimmäiskorkeus lähikuvista kiertoon (m lennon pohjasta): skaalattu kone ei leikkaa maastoa.</summary>
        public const double MinKoneKorkeusM = 10_000.0;
        /// <summary>
        /// Löydös 84 (omistaja 25.9.): aloituslennolla kone on jo nousussa, kun kamera lähtee valintanäkymästä, ja kamera
        /// löytää sen vasta täydessä korkeudessa: nousu päättyy tällä osuudella syöksystä (muilla lennoilla 1,0).
        /// </summary>
        public const double AloituksenNousu = 0.6;

        /// <summary>
        /// Avaimet lennolle. reittiM = isoympyrän pituus, saapumisKorkeus = saapumisnäkymän korkeus (m, webin
        /// kaupunkinäkymä, johon PeliOhjain.Saavu ajaa perillä), k = kohteen maisema (Kaupungit tai EiMaisemaa),
        /// j = vaihejako (Jaa), lentosuunta(t) = koneen suuntima asteina aikajanan kohdassa t.
        /// </summary>
        public static Avain[] Laske(double reittiM, double saapumisKorkeus, Kierto k, Jako j, Func<double, double> lentosuunta)
        {
            // Loittonuksen huippu: pallon kaarevuus näkyy, ja pitkillä reiteillä kohde tulee näkyviin liu'ussa.
            double kauko = Rajaa(reittiM * 1.2, 3_000_000.0, 9_000_000.0);
            // Kierron (c) + (d) kokonaiskulma (Fable 24.9. klo 18, video kamerareitti-b11k): enintään 180° lyhyempään
            // suuntaan, tavoitenopeus ~35°/s; sivukylki valitaan sille puolelle, jolta kulma on lähimpänä tavoitetta.
            double tc = j.Kierto - j.Liuku, t1 = j.Tasainen - j.Kierto, tb = 1.0 - j.Tasainen;
            double tehollinen = tc / 3.0 + t1 + tb / 3.0;
            double kaari = Kaari(lentosuunta(j.Liuku), k.Suunta, TavoiteNopeus * tehollinen * j.KestoS, out int puoli);
            // Suhteellinen suunta peilattuna valitulle puolelle (90 → 270 jne.).
            double P(double x) => puoli > 0 ? x : 360.0 - x;

            var a = new List<Avain>();
            a.AddRange(new[]
            {
                // Lähtöpiste (Nappula: kameran nykyinen asento).
                new Avain { Osuus = 0.0, Kohde = -1 },
                // (a) SYÖKSY koneen sivulle, kuminauha: kiihtyvä syöksy, pieni yli- ja paluuheilahdus.
                new Avain { Osuus = j.Syoksy, Kayra = Kayra.SyoksyKuminauha, Etaisyys = LahiM, Kallistus = LahiKallistus, Suunta = P(90), Kohde = 0, Kone = LahiKone },
            });
            {
                // (a) SIVUKYLKI: lähes paikallaan, hidas liuku 90° → 110° (etäisyys 6 % lähemmäs).
                var sivu = new Avain { Osuus = j.Sivu, Kayra = Kayra.Pehmea, Etaisyys = LahiM * 0.94, Kallistus = LahiKallistus, Suunta = P(110), Kohde = 0, Kone = LahiKone };
                a.Add(sivu);
                // (b) LOITTONUS: kiihtyvä + jarruttava pari (nopeus sama saumassa), kohde kone koko ajan.
                var loitto = new Avain { Osuus = j.Loitto, Kayra = Kayra.Jarruttava, Etaisyys = kauko, Kallistus = KaukoKallistus, Suunta = P(120), Kohde = 0 };
                a.Add(Pari(sivu, loitto, j.LoittoSauma));
                a.Add(loitto);
            }
            // LIUKU: lähes paikallaan. Suunta muuttuu tässä absoluuttiseksi (lentosuunta liu'un lopussa), jotta
            // kierto (c) ja orbit (d) ovat yksi yhtenäinen kulmaraita.
            double liukuSuunta = lentosuunta(j.Liuku) + P(LiukuSuhteellinen);
            a.Add(new Avain { Osuus = j.Liuku, Kayra = Kayra.Pehmea, SuuntaAbs = true, Etaisyys = kauko * 0.96, Kallistus = KaukoKallistus, Suunta = liukuSuunta, Kohde = 0 });

            // (c) + (d) YHTENÄ KULMARAITANA: kiihtyvä (c) → vakio (d) → jarruttava (viimeinen 1/3 orbitista), liu'un
            // suunnasta pohjoiseen. Kiihtyvä t³ päättyy nopeuteen 3Δ/T ja jarruttava alkaa siitä: ω = 3Δc/Tc = Δ1/T1 = 3Δ2/Tb.
            // (Build 11 k: kaari kulki vastakkaisen puolen ja maiseman kautta, 360–410° ja 64–90°/s; Fable rajasi.)
            double w = kaari / tehollinen;
            double dc = w * tc / 3.0, d1 = w * t1;
            double loppuSuunta = Math.Round((liukuSuunta + kaari) / 360.0) * 360.0;

            var kaupunki = new Avain
            {
                Osuus = j.Kierto, Kayra = Kayra.Pehmea, SuuntaKayra = Kayra.Kiihtyva, SuuntaAbs = true, Kohde = 1,
                Etaisyys = KiertoM, Kallistus = KiertoKallistus, Suunta = liukuSuunta + dc,
            };
            a.Add(kaupunki);
            var lasku = new Avain
            {
                Osuus = 1.0, Kayra = Kayra.Jarruttava, SuuntaKayra = Kayra.Jarruttava, SuuntaAbs = true, Kohde = 2,
                Etaisyys = Math.Max(1.0, saapumisKorkeus), Kallistus = 0, Suunta = loppuSuunta,
            };
            // (d) ORBIT: etäisyys, kallistus ja kohde kiihtyvä + jarruttava pari, suunta vakionopeudella.
            var orbit = Pari(kaupunki, lasku, j.Tasainen);
            orbit.SuuntaKayra = Kayra.Tasainen;
            orbit.Suunta = liukuSuunta + dc + d1;
            a.Add(orbit);
            a.Add(lasku);
            return a.ToArray();
        }

        /// <summary>Kierron (c + d) tavoitekulmanopeus (°/s) vakio-osuudella (Fable 24.9.).</summary>
        public const double TavoiteNopeus = 35.0;
        /// <summary>Tasatilanne: jos lyhyempi kaari on vähintään 180° − tämä, maisemasuunta ratkaisee kiertosuunnan.</summary>
        public const double TasatilanneAste = 15.0;
        /// <summary>Loittonuksen loppusuunta + liu'un ajelehtiminen (suhteellinen, oikea puoli; peilattuna 238,5°).</summary>
        public const double LiukuSuhteellinen = 121.5;

        /// <summary>
        /// Kierron (c + d) etumerkillinen kokonaiskulma (+ = suunta kasvaa eli myötäpäivään) liu'un lopusta pohjoiseen
        /// (Fable 24.9.): lyhyempi suunta, joten |kulma| ≤ 180°. Sivukylki (puoli +1 = 90°, −1 = 270°) valitaan niin,
        /// että kulma on lähimpänä tavoitekulmaa (≈ 35°/s); lähes tasan ollessa puoli, joka kiertää samaan suuntaan kuin
        /// sivukyljen liuku. Tasatilanteessa (lyhyempi ≥ 165°) maisemasuunta ratkaisee: kaari, joka pyyhkäisee maiseman
        /// katsesuunnan yli (enintään 195°). Ilman maisemaa (NaN) aina lyhyempi.
        /// </summary>
        public static double Kaari(double lentosuuntaLiuku, double maisema, double tavoiteKaari, out int puoli)
        {
            double Lyhin(int s) => Kiedo180(-(lentosuuntaLiuku + (s > 0 ? LiukuSuhteellinen : 360.0 - LiukuSuhteellinen)));
            double a = Lyhin(1), b = Lyhin(-1);
            double ea = Math.Abs(Math.Abs(a) - tavoiteKaari), eb = Math.Abs(Math.Abs(b) - tavoiteKaari);
            if (Math.Abs(ea - eb) < 5.0) { ea -= a > 0 ? 1 : 0; eb -= b < 0 ? 1 : 0; }
            puoli = ea <= eb ? 1 : -1;
            double kaari = puoli > 0 ? a : b;
            if (!double.IsNaN(maisema) && Math.Abs(kaari) >= 180.0 - TasatilanneAste)
            {
                double alku = lentosuuntaLiuku + (puoli > 0 ? LiukuSuhteellinen : 360.0 - LiukuSuhteellinen);
                double toinen = kaari - Math.Sign(kaari) * 360.0;
                if (!Pyyhkaisee(alku, kaari, maisema) && Pyyhkaisee(alku, toinen, maisema)) kaari = toinen;
            }
            return kaari;
        }

        /// <summary>Kulkeeko katse suunnasta alku kulman kaari verran kiertäessään suunnan x kautta.</summary>
        static bool Pyyhkaisee(double alku, double kaari, double x) =>
            kaari >= 0 ? Kiedo(x - alku) <= kaari : Kiedo(alku - x) <= -kaari;

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
                Osuus = osuus, Kayra = Kayra.Kiihtyva, SuuntaAbs = c.SuuntaAbs, Kohde = V(a.Kohde, c.Kohde),
                Etaisyys = Math.Exp(V(Math.Log(a.Etaisyys), Math.Log(c.Etaisyys))),
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
            double u = n.Osuus > p.Osuus ? Rajaa((t - p.Osuus) / (n.Osuus - p.Osuus), 0, 1) : 1;
            double par = n.Parametri == 0 ? double.NaN : n.Parametri;
            double s = Kamerakayrat.Arvo(n.Kayra, u, par);
            double ss = n.SuuntaKayra.HasValue ? Kamerakayrat.Arvo(n.SuuntaKayra.Value, u, par) : s;
            double sp = p.SuuntaAbs ? p.Suunta : p.Suunta + lentosuunta;
            double sn = n.SuuntaAbs ? n.Suunta : n.Suunta + lentosuunta;
            // Suhteellinen → absoluuttinen: lyhin kulma; absoluuttisten välillä avainten oma kiertosuunta (voi ylittää 180°).
            if (p.SuuntaAbs != n.SuuntaAbs) sn = sp + Kiedo180(sn - sp);
            // Kuminauhan ylitys (s > 1) vain etäisyyteen, suuntaan ja koneen kokoon. Kohde ja kallistus eivät saa
            // ampua ohi: syöksyn lopussa kohde > 0 siirsi katseen koneesta kohti kohdekaupunkia (~50 km), ja kone
            // liukui 0,5 s ruudun reunaan; kallistus yli 80° painoi kameran horisonttiin (iPad-simulaattori 24.9.).
            double sr = Rajaa(s, 0, 1);
            return (
                Math.Exp(Lerp(Math.Log(Math.Max(1, p.Etaisyys)), Math.Log(Math.Max(1, n.Etaisyys)), s)),
                Lerp(p.Kallistus, n.Kallistus, sr),
                Lerp(sp, sn, ss),
                Rajaa(Lerp(p.Kohde, n.Kohde, sr), -1, 2),
                Math.Max(0, Lerp(p.Kone, n.Kone, s)));
        }

        // ---- Aloituslennon kamerareitti kanavina (löydös 120) ----

        /// <summary>
        /// Yksi kamerakanava (löydös 120): avaimet (osuus 0–1, arvo, nopeus d/dosuus, kiihtyvyys d²/dosuus²) ja
        /// KVINTTINEN Hermite avainten välillä, joten arvo, nopeus ja kiihtyvyys ovat jatkuvia (C2) jokaisen avaimen läpi.
        /// Kuutiollinen Hermite oli vain C1: lepoavaimeen (nopeus 0) se tuli vakiohidastuvuudella ja pysähtyi kerralla,
        /// mikä näkyi kaukana (3000 km) tylynä jarrutuksena (Fable 25.9.).
        ///   * LEPO (<see cref="Lepo"/>): nopeus 0 ja kiihtyvyys 0, liike laskeutuu ja lähtee pehmeästi.
        ///   * LIIKKUVA (<see cref="Lisaa"/>, NaN = automaattinen): nopeus Fritsch–Carlson (painotettu harmoninen keskiarvo
        ///     viereisistä kulmakertoimista, 0 ääriarvossa); kiihtyvyys viereisten välien kuutiollisten Hermite-käyrien
        ///     avainpään kiihtyvyyksien painotettu keskiarvo (naapurien arvot ja nopeudet; pelkkä nopeuksien keskidifferenssi
        ///     antoi väärän merkin, kun naapuri oli ääriarvo, ja teki irtautumiseen kaksoiskyttyrän). Tasaisen välin
        ///     (sama arvo) päissä nopeus ja kiihtyvyys 0. Lopuksi ylitysraja: jokaisen välin derivaatan merkki tarkistetaan
        ///     näytteittäin, ja jos väli ei ole monotoninen (kuten data), automaattisia kiihtyvyyksiä ja sitten nopeuksia
        ///     pienennetään, kunnes on (äärirajana lepo: smootherstep on aina monotoninen).
        ///   * PROFIILI (<see cref="Profiili"/>): kahden lepoavaimen väli annetulla nopeusprofiililla (esim. etäisyys metreinä
        ///     tai etäisyys^0,5), kun metrinopeuden muoto ratkaisee (kaukana pienikin log-nopeus on suuri m/s).
        /// </summary>
        public sealed class Kanava
        {
            readonly List<double> t = new List<double>(), v = new List<double>(), vAnnettu = new List<double>(),
                aAnnettu = new List<double>(), potenssi = new List<double>();
            /// <summary>Tähän avaimeen päättyvän välin nopeusprofiili (null = kvinttinen Hermite).</summary>
            readonly List<(double gamma, int a, int k)?> profiili = new List<(double gamma, int a, int k)?>();
            double[] nop, kii;
            bool valmis;

            public int Maara => t.Count;
            public double Aika(int i) => t[i];
            public double this[int i] { get => v[i]; set { v[i] = value; valmis = false; } }
            /// <summary>Nopeus ja kiihtyvyys avaimessa i (osuuden yksiköissä) valmistelun jälkeen.</summary>
            public double Nopeus(int i) { Valmistele(); return nop[i]; }
            public double Kiihtyvyys(int i) { Valmistele(); return kii[i]; }

            /// <summary>Liikkuva avain: nopeus ja kiihtyvyys annettuina tai NaN = automaattinen.</summary>
            public Kanava Lisaa(double osuus, double arvo, double nopeus = double.NaN, double kiihtyvyys = double.NaN)
            {
                if (t.Count > 0 && osuus <= t[t.Count - 1]) throw new ArgumentException($"avain {osuus} ei kasva ({t[t.Count - 1]})");
                t.Add(osuus); v.Add(arvo); vAnnettu.Add(nopeus); aAnnettu.Add(kiihtyvyys); potenssi.Add(1.0); profiili.Add(null);
                valmis = false;
                return this;
            }

            /// <summary>
            /// Lepoavain, johon päättyvä väli (edellinenkin avain lepo) ajetaan nopeusprofiililla: muunnettu arvo
            /// exp(gamma · arvo) kulkee lähtöarvosta tähän Beta-kertymänä F(u) = ∫₀ᵘ s^a (1 − s)^k ds / B(a + 1, k + 1),
            /// eli nopeus ∝ u^a (1 − u)^k. Log-etäisyyskanavalla exp(gamma · arvo) = etäisyys^gamma: gamma = 1 tasaa
            /// kameran nopeuden metreinä, pienempi gamma logaritmisen (koetun) zoomausnopeuden. a, k ≥ 2: nopeus ja
            /// kiihtyvyys ovat 0 välin päissä, joten väli liittyy lepoavaimiin C2-jatkuvasti.
            /// </summary>
            public Kanava Profiili(double osuus, double arvo, double gamma, int a, int k)
            {
                if (gamma <= 0 || a < 2 || k < 2) throw new ArgumentException("profiili: gamma > 0, a ≥ 2, k ≥ 2");
                Lepo(osuus, arvo);
                profiili[t.Count - 1] = (gamma, a, k);
                return this;
            }

            /// <summary>
            /// Lepoavain: nopeus ja kiihtyvyys 0. potenssi &gt; 1: tähän päättyvä väli ajetaan ajalla u^potenssi (vahva
            /// ease-in, huippunopeus myöhään), kun edellinenkin avain on lepo (C2 säilyy: kvinttinen lepo–lepo-väli on
            /// smootherstep, jonka 1. ja 2. derivaatta ovat 0 päissä myös aikamuunnoksen jälkeen).
            /// </summary>
            public Kanava Lepo(double osuus, double arvo, double potenssi = 1.0)
            {
                Lisaa(osuus, arvo, 0, 0);
                this.potenssi[t.Count - 1] = Math.Max(1.0, potenssi);
                return this;
            }

            void Valmistele()
            {
                if (valmis && nop != null && nop.Length == t.Count) return;
                int n = t.Count;
                nop = new double[n];
                kii = new double[n];
                var autoV = new bool[n];
                var autoA = new bool[n];
                // Nopeudet: annettu tai Fritsch–Carlson (0 päissä, ääriarvoissa ja tasaisen välin reunalla).
                for (int i = 0; i < n; i++)
                {
                    autoV[i] = double.IsNaN(vAnnettu[i]);
                    if (!autoV[i]) { nop[i] = vAnnettu[i]; continue; }
                    if (i == 0 || i == n - 1) { nop[i] = 0; continue; }
                    double h0 = t[i] - t[i - 1], h1 = t[i + 1] - t[i];
                    double m0 = (v[i] - v[i - 1]) / h0, m1 = (v[i + 1] - v[i]) / h1;
                    nop[i] = m0 * m1 <= 0 ? 0 : 3 * (h0 + h1) / ((2 * h1 + h0) / m0 + (h1 + 2 * h0) / m1);
                }
                // Kiihtyvyydet: annettu tai viereisten kuutiollisten välien avainpään kiihtyvyyksien keskiarvo (painona
                // vastakkaisen välin pituus); tasaisen välin reunalla 0.
                for (int i = 0; i < n; i++)
                {
                    autoA[i] = double.IsNaN(aAnnettu[i]);
                    if (!autoA[i]) { kii[i] = aAnnettu[i]; continue; }
                    bool tasainen = i > 0 && v[i] == v[i - 1] || i < n - 1 && v[i] == v[i + 1];
                    if (i == 0 || i == n - 1 || tasainen) { kii[i] = 0; if (autoV[i]) nop[i] = 0; continue; }
                    double h0 = t[i] - t[i - 1], h1 = t[i + 1] - t[i];
                    double aVasen = (6 * (v[i - 1] - v[i]) + 2 * h0 * (nop[i - 1] + 2 * nop[i])) / (h0 * h0);
                    double aOikea = (6 * (v[i + 1] - v[i]) - 2 * h1 * (2 * nop[i] + nop[i + 1])) / (h1 * h1);
                    kii[i] = (h1 * aVasen + h0 * aOikea) / (h0 + h1);
                }
                // Ylitysraja: välin derivaatta samanmerkkinen kuin välin muutos (tasainen väli pysyy tasaisena).
                for (int kierros = 0; kierros < 200; kierros++)
                {
                    bool ok = true;
                    for (int i = 1; i < n; i++)
                    {
                        if (Monotoninen(i)) continue;
                        ok = false;
                        foreach (int k in new[] { i - 1, i })
                        {
                            if (autoA[k] && kii[k] != 0) kii[k] = Math.Abs(kii[k]) < 1e-9 ? 0 : kii[k] * 0.5;
                            else if (autoV[k] && nop[k] != 0) nop[k] = Math.Abs(nop[k]) < 1e-9 ? 0 : nop[k] * 0.8;
                        }
                    }
                    if (ok) break;
                }
                valmis = true;
            }

            /// <summary>Onko väli (i − 1, i) monotoninen datan suuntaan (derivaatta ei vaihda merkkiä).</summary>
            bool Monotoninen(int i)
            {
                double d = v[i] - v[i - 1];
                double h = t[i] - t[i - 1];
                double m0 = nop[i - 1] * h, m1 = nop[i] * h, c0 = kii[i - 1] * h * h, c1 = kii[i] * h * h;
                double suunta = Math.Sign(d);
                double sallittu = 1e-9 * (Math.Abs(d) + Math.Abs(m0) + Math.Abs(m1) + Math.Abs(c0) + Math.Abs(c1));
                for (int q = 1; q < 64; q++)
                {
                    double u = q / 64.0;
                    double dp = Kvintti1(v[i - 1], m0, c0, v[i], m1, c1, u);
                    if (suunta == 0 ? Math.Abs(dp) > sallittu + 1e-12 : dp * suunta < -sallittu) return false;
                }
                return true;
            }

            public double Arvo(double x)
            {
                Valmistele();
                int n = t.Count;
                if (x <= t[0]) return v[0];
                if (x >= t[n - 1]) return v[n - 1];
                int i = 1;
                while (i < n - 1 && x > t[i]) i++;
                double h = t[i] - t[i - 1], u = (x - t[i - 1]) / h;
                bool lepovali = nop[i - 1] == 0 && kii[i - 1] == 0 && nop[i] == 0 && kii[i] == 0;
                if (lepovali && profiili[i].HasValue)
                {
                    var (g, pa, pk) = profiili[i].Value;
                    double m0 = Math.Exp(g * v[i - 1]), m1 = Math.Exp(g * v[i]);
                    return Math.Log(m0 + (m1 - m0) * BetaKertyma(pa, pk, u)) / g;
                }
                if (lepovali && potenssi[i] > 1.0) u = Math.Pow(u, potenssi[i]);
                return Kvintti(v[i - 1], nop[i - 1] * h, kii[i - 1] * h * h, v[i], nop[i] * h, kii[i] * h * h, u);
            }
        }

        /// <summary>
        /// ALOITUSLENNON KAMERAREITTI (löydös 120): viisi kvinttistä Hermite-kanavaa samalle aikajanalle (ks. JaaAloitus).
        /// Etäisyys on kanavassa logaritmina ja suunta absoluuttisena (koneen suhteen annetut avaimet muunnettu avaimen
        /// hetken lentosuunnalla ja kierretty yhtenäiseksi). Kanavien avain 0 on kameran lähtöasento (<see cref="AsetaAlku"/>,
        /// Nappula: kameran nykyinen asento); suunnan avain 1 on syöksyn välipiste lähdön ja lähikuvan välissä.
        /// </summary>
        public sealed class AloitusReitti
        {
            public readonly Kanava LogEtaisyys = new Kanava(), Kallistus = new Kanava(), Suunta = new Kanava(),
                Kohde = new Kanava(), Kone = new Kanava();
            public readonly Jako Jako;
            /// <summary>Ensimmäisen lähikuvan kylki: +1 = P(x) = x (kaarto nokan edestä kasvattaa suuntaa), −1 peilattuna.</summary>
            public int Puoli { get; internal set; }
            /// <summary>Kierron ja orbitin kokonaiskulma (°, + = suunta kasvaa) 7,0 s:sta perille.</summary>
            public double Kaari { get; internal set; }
            /// <summary>Suunnan siirtymä matkan aikana (°) irtautumisen lopusta kierron alkuun.</summary>
            public double Ajelehdinta { get; internal set; }

            /// <summary>
            /// Syöksy: etäisyys (log) ja kallistus ajalla u^k (vahva ease-in ilman väliavainta, joka taittaisi kiihtyvyyden),
            /// suunta väliavaimella 0,75 s:ssa (osuus lähdöstä lähikuvaan), jotta kamera kääntyy pois koneen takaa kaukana.
            /// </summary>
            public const double SyoksyEtaisyys = 1.8, SyoksyKallistus = 1.6, SyoksySuunta = 0.65;

            /// <summary>Syöksyn suunnan kierto enintään tämän (°) verran, jotta kamera ei kulje koneen takaa.</summary>
            public const double SyoksyKiertoMax = 240.0;

            /// <summary>Lentosuunta lähdössä ja lähikuvassa sekä lähikuvan suunta koneen suhteen (AsetaAlku).</summary>
            internal double lentosuunta0, lentosuuntaLahi, lahiRel;

            internal AloitusReitti(Jako j) { Jako = j; }

            /// <summary>
            /// Kameran lähtöasento (avain 0) ja syöksyn välipiste. Suunta lähikuvan suuntaan sitä tietä, joka ei kulje
            /// koneen takaa (suhteellinen suunta ei ylitä 0°:ta), jos kierto on enintään 240°; muuten lyhintä tietä
            /// (kamera lähtee lähes suoraan takaa ja ohittaa takasuunnan heti alussa, kaukana).
            /// </summary>
            public void AsetaAlku(double etaisyys, double kallistus, double suunta)
            {
                LogEtaisyys[0] = Math.Log(Math.Max(1.0, etaisyys));
                Kallistus[0] = kallistus;
                double rel0 = Kiedo(suunta - lentosuunta0);
                double eiTakaa = Suunta[2] - (lahiRel - rel0) - Kiedo180(lentosuuntaLahi - lentosuunta0);
                double s0 = Math.Abs(Suunta[2] - eiTakaa) <= SyoksyKiertoMax ? eiTakaa : Suunta[2] + Kiedo180(suunta - Suunta[2]);
                Suunta[0] = s0;
                Suunta[1] = s0 + SyoksySuunta * (Suunta[2] - s0);
            }

            /// <summary>Kameran asento kohdassa t (0–1): etäisyys (m), kallistus, suunta (°, absoluuttinen), kohde, kone.</summary>
            public (double etaisyys, double kallistus, double suunta, double kohde, double kone) Arvo(double t) =>
                (Math.Exp(LogEtaisyys.Arvo(t)), Kallistus.Arvo(t), Suunta.Arvo(t), Rajaa(Kohde.Arvo(t), -1, 2), Math.Max(0, Kone.Arvo(t)));

            /// <summary>Ensimmäinen lähikuva (1,5 s): Nappula esilataa sen laatat mustan verhon alla.</summary>
            public (double etaisyys, double kallistus, double suunta) Lahikuva
            {
                get { var a = Arvo(0.15); return (a.etaisyys, a.kallistus, a.suunta); }
            }
        }

        /// <summary>Kierron vähimmäiskulma (°): lyhyempi kaari venytetään tähän matkan aikaisella ajelehdinnalla.</summary>
        public const double AloitusKaariMin = 30.0;
        /// <summary>Hinta (° ajelehdintaa), jos loppuorbit kiertää eri suuntaan kuin kaarto nokan edestä.</summary>
        public const double AloitusVastasuuntaHinta = 60.0;

        /// <summary>
        /// Aloituslennon kamerareitti (löydös 120, Fablen suunnitelma 25.9.). reittiM, saapumisKorkeus, k ja lentosuunta
        /// kuten <see cref="Laske"/>; j = <see cref="JaaAloitus"/>. Lähtöasento on valintanäkymän pallo, kunnes
        /// <see cref="AloitusReitti.AsetaAlku"/> asettaa kameran nykyisen asennon.
        /// KIERTOSUUNTA: kylki (Puoli) ja loppuorbitin suunta valitaan yhdessä: orbit kiertää samaan suuntaan kuin kaarto
        /// nokan edestä, ja kierron alkusuunta on irtautumisen loppusuunta, jos kaari pohjoiseen on siitä 30–180°;
        /// muuten suunta ajelehtii matkan aikana (kamera kaukana) lähimpään kelvolliseen alkuun. Vastasuuntainen orbit
        /// vain, jos se säästää yli 60° ajelehdintaa. Hinta = |ajelehdinta| + 0,3 · |kaari − tavoite (35°/s)|; maisema
        /// ratkaisee tasatilanteen (kaari, joka pyyhkäisee maiseman katsesuunnan yli).
        /// </summary>
        public static AloitusReitti LaskeAloitus(double reittiM, double saapumisKorkeus, Kierto k, Jako j, Func<double, double> lentosuunta)
        {
            var r = new AloitusReitti(j);
            double T = j.KestoS;
            double kauko = Rajaa(reittiM * 1.2, 3_000_000.0, 9_000_000.0);
            const double tK = AloitusMatkaLoppu;      // kierron alku 7,0 s
            double tO = j.Kierto, tJ = j.Tasainen;    // orbit 8,6 s, jarrutus
            // Kierto kiihtyy levosta vakionopeuteen ja jarruttaa lepoon smootherstep-nopeusprofiililla (kvinttinen Hermite,
            // kiihtyvyys 0 päissä): kiihdytys- ja jarrutusvaihe kattavat puolet kulmastaan vakionopeudella.
            double tehollinen = (tO - tK) / 2.0 + (tJ - tO) + (1.0 - tJ) / 2.0;
            double tavoite = TavoiteNopeus * tehollinen * T;

            // Kylki ja kierto: irtautumisen loppusuunta A = lentosuunta(6,0 s) + P(240).
            double L6 = lentosuunta(j.Liuku);
            double parasHinta = double.MaxValue;
            int puoli = 1; double kaari = 0, ajelehdinta = 0;
            foreach (int pu in new[] { 1, -1 })
            foreach (int su in new[] { 1, -1 })
            {
                double A = L6 + (pu > 0 ? 240.0 : 120.0);
                double m0 = Kiedo(su > 0 ? -A : A);
                double m = Rajaa(m0, AloitusKaariMin, 180.0);
                double drift = Kiedo180(-su * m - A);
                double hinta = Math.Abs(drift) + 0.3 * Math.Abs(m - tavoite) + (su != pu ? AloitusVastasuuntaHinta : 0);
                if (!double.IsNaN(k.Suunta) && Pyyhkaisee(A + drift, su * m, k.Suunta)) hinta -= 5.0;
                if (hinta < parasHinta) { parasHinta = hinta; puoli = pu; kaari = su * m; ajelehdinta = drift; }
            }
            r.Puoli = puoli; r.Kaari = kaari; r.Ajelehdinta = ajelehdinta;
            double P(double x) => puoli > 0 ? x : 360.0 - x;

            // SUUNTA: koneen suhteen annetut avaimet absoluuttisiksi yhtenäisenä ketjuna.
            double edO = 0.13, edRel = P(AloitusLahiSuunta), ed = lentosuunta(edO) + edRel;
            double Abs(double o, double rel)
            {
                ed += (rel - edRel) + Kiedo180(lentosuunta(o) - lentosuunta(edO));
                edO = o; edRel = rel;
                return ed;
            }
            double s13 = ed;
            r.lentosuunta0 = lentosuunta(0);
            r.lentosuuntaLahi = lentosuunta(0.13);
            r.lahiRel = P(AloitusLahiSuunta);
            r.Suunta.Lepo(0.0, s13).Lisaa(0.075, s13).Lisaa(0.13, s13);
            r.Suunta.Lisaa(0.22, Abs(0.22, P(125)));
            r.Suunta.Lisaa(0.29, Abs(0.29, P(180)), puoli * AloitusKaartoHuippu * T, 0);
            r.Suunta.Lisaa(0.36, Abs(0.36, P(235)));
            r.Suunta.Lisaa(0.43, Abs(0.43, P(245)));
            double s60 = Abs(0.60, P(240));
            r.Suunta.Lisaa(0.60, s60);
            // KIERTO + ORBIT yhtenä kulmaraitana: levosta (7,0 s) kiihtyen vakionopeuteen ω (8,6 s), vakio jarrutuksen
            // alkuun (Tasainen 8,8 s) ja jarrutus lepoon pohjoiseen tasan perillä (viimeiset 1,2 s).
            double w = kaari / tehollinen, hk = s60 + ajelehdinta;
            r.Suunta.Lepo(tK, hk);
            r.Suunta.Lisaa(tO, hk + w * (tO - tK) / 2.0, w, 0);
            r.Suunta.Lisaa(tJ, hk + w * (tO - tK) / 2.0 + w * (tJ - tO), w, 0);
            r.Suunta.Lepo(1.0, hk + kaari);

            // ETÄISYYS (log): syöksy lepoon kuminauhan ylitykseen (11 km, 1,15 s), paluu 13 km:iin, lähi 1, kaarto
            // hengittää, lähi 2 lepoon (4,3 s), IRTAUTUMINEN kaukonäkymään 4,3–6,5 s (profiili alla, huippu 6,5 s),
            // matkassa hidas ajelehdinta sisäänpäin (0,92 × kauko 7,0 s, liike jatkuu kiertoon), kierto 250 km:iin (lepo
            // 8,6 s) ja LASKU saapumisnäkymään 8,6–10 s (profiili, lepo tasan perillä).
            // Profiilit (Fable 25.9.: ei jyrkkää nopeuden pudotusta kaukana): irtautuminen etäisyys^0,5-avaruudessa
            // nopeudella ∝ u²(1 − u)³ (metrinopeuden huippu ~5,4 s, laskeutuminen 5,4–6,4 s, koettu zoomaus ≤ ~7 e/s);
            // lasku metreinä nopeudella ∝ u²(1 − u)⁴ (huippu ~9,1 s, pitkä jarrutus lepoon 9,1–10 s).
            double Ln(double x) => Math.Log(Math.Max(1.0, x));
            r.LogEtaisyys.Lepo(0.0, Ln(12_000_000)).Lepo(0.115, Ln(11_000), AloitusReitti.SyoksyEtaisyys)
                .Lisaa(0.15, Ln(AloitusLahiM)).Lisaa(0.22, Ln(12_000)).Lisaa(0.29, Ln(24_000)).Lisaa(0.36, Ln(12_000))
                .Lepo(0.43, Ln(AloitusIrtautuminenM))
                .Profiili(AloitusHuippu, Ln(kauko), 0.5, 2, 3)
                .Lisaa(tK, Ln(kauko * 0.92)).Lepo(tO, Ln(KiertoM))
                .Profiili(1.0, Ln(saapumisKorkeus), 1.0, 2, 4);

            r.Kallistus.Lepo(0.0, 0).Lepo(0.13, AloitusLahiKallistus, AloitusReitti.SyoksyKallistus).Lisaa(0.22, AloitusLahiKallistus)
                .Lisaa(0.29, AloitusLahiKallistus - 4).Lisaa(0.36, AloitusLahiKallistus).Lisaa(0.43, AloitusLahiKallistus)
                .Lisaa(0.62, AloitusKaukoKallistus).Lisaa(tO, KiertoKallistus).Lepo(1.0, 0);

            // KOHDE: lähtö → kone (1,0 s) → kaupunki (8,2 s) → saapumisnäkymän keskipiste, kaikki lepoavaimia: Nappula
            // vaihtaa kohdissa 0 ja 1 katsepisteen kaavaa (lähtö–kone, kone–kaupunki, kaupunki–saapumisnäkymä), ja läpi
            // kulkeva kohde taittaisi katsepisteen radan (nopeus 0) tai sen kiihtyvyyden (kiihtyvyys 0).
            r.Kohde.Lepo(0.0, -1).Lepo(0.10, 0).Lepo(tK, 0).Lepo(0.82, 1).Lepo(1.0, 2);

            // KONE (ruutuosuus): syöksyssä ylitys 2,1 (lähimmillään), lähikuvat 1,8–1,9, nokan edessä 1,0; irtautumisessa
            // fyysinen koko (1,9 × 11,5 km / etäisyys, ei kasva loitotessa), merkkikokoon 5,6 s:ssa.
            r.Kone.Lepo(0.0, 0).Lisaa(0.075, 0.02).Lisaa(0.115, 2.1).Lisaa(0.15, 1.8).Lisaa(0.22, AloitusLahiKone)
                .Lisaa(0.29, AloitusKaartoKone).Lisaa(0.36, AloitusLahiKone).Lisaa(0.43, AloitusLahiKone);
            double e43 = r.LogEtaisyys.Arvo(0.43), ed2 = AloitusLahiKone;
            foreach (double o in new[] { 0.45, 0.47, 0.50, 0.53 })
            {
                double fyys = Math.Min(ed2 * 0.95, AloitusLahiKone * Math.Exp(e43 - r.LogEtaisyys.Arvo(o)));
                r.Kone.Lisaa(o, fyys);
                ed2 = fyys;
            }
            r.Kone.Lepo(0.56, 0).Lepo(1.0, 0);

            r.AsetaAlku(12_000_000, 0, s13);
            return r;
        }

        /// <summary>
        /// Lennon vaihe: nousu syöksystä loittonuksen loppuun, matka liu'un ajan, lasku kierrosta perille. Aloituslennolla
        /// (löydös 120) matka on irtautumisen lopusta (Loitto = Liuku) kierron alkuun (<see cref="AloitusMatkaLoppu"/>).
        /// </summary>
        public static LennonVaihe Vaihe(double t, Jako j) =>
            t < j.Loitto ? LennonVaihe.Nousu : t < (j.Aloitus ? Math.Max(j.Liuku, AloitusMatkaLoppu) : j.Liuku) ? LennonVaihe.Matka : LennonVaihe.Lasku;

        /// <summary>
        /// Koneen vähimmäiskorkeus (m lennon pohjasta) hetkellä t: nousee syöksyn aikana 10 km:iin (sivukyljessä
        /// kamera on koneen tasolla 30 km:n päässä ja kone skaalattu 0,9 ruudun levyiseksi) ja laskee orbitin aikana
        /// nollaan, jotta kone laskeutuu kaupunkiin. Nappula: korkeus = max(huippu · sin πp, tämä).
        /// </summary>
        public static double KoneenMinimi(double t, Jako j, double nousu = 1.0) =>
            MinKoneKorkeusM * Kamerakayrat.Pehmea(t / Math.Max(1e-6, nousu * j.Syoksy)) * (1.0 - Kamerakayrat.Pehmea((t - j.Kierto) / Math.Max(1e-6, 1.0 - j.Kierto)));

        /// <summary>Pehmeän maksimin leveys (m): kaaren ja vähimmäiskorkeuden vaihtokohta ilman nopeuden porrasta.</summary>
        public const double KorkeusPehmennysM = 2_000.0;

        /// <summary>
        /// Koneen korkeus lennon pohjasta (Nappula.KoneenKorkeus ja lentokaari): kaari huippu · sin πp, vähintään minimi.
        /// Pehmeä maksimi (löydös 120): max(a, b) taittuu kohdassa a = b, jolloin koneen (ja sitä katsovan kameran)
        /// pystynopeus porrastuu; ½(a + b + √((a − b)² + ε²)) on aina ≥ max(a, b) ja C1-jatkuva.
        /// </summary>
        public static double KoneenKorkeus(double p, double huippu, double minimi)
        {
            double a = huippu * Math.Sin(Math.PI * p), d = a - minimi;
            return 0.5 * (a + minimi + Math.Sqrt(d * d + KorkeusPehmennysM * KorkeusPehmennysM));
        }

        // ---- Koneen eteneminen: nopeusprofiili integroituna, normitettuna niin, että t = 1 → 1. ----

        const int Naytteita = 512;
        static double[] kertyma, kertymanNopeus, kertymanKiihtyvyys;
        static Jako kertymanJako;

        /// <summary>Koneen nopeus (suhteellinen) hetkellä t: syöksyssä ja sivukyljessä lähes paikallaan, kiihdytys loittonuksessa, tasainen, hidastus kierrosta perille.</summary>
        static double Nopeus(double t, Jako j)
        {
            if (j.Aloitus)
            {
                // Löydös 120: kone lähes paikallaan (0,06) koko lähijakson (syöksy, lähi 1, kaarto, lähi 2 → 4,3 s), kiihtyy
                // irtautumisessa (4,3–5,5 s), nopein matkassa ja hidastuu kierrosta (7,0 s) perille. Siirtymät pehmeinä.
                double lahi = 1.0 - Kamerakayrat.Pehmea((t - j.Sivu) / 0.12);
                double hid = Kamerakayrat.Pehmea((t - AloitusMatkaLoppu) / Math.Max(1e-6, 1.0 - AloitusMatkaLoppu));
                return (Lerp(1.0, 0.06, lahi) * (1.0 - hid) + 0.02 * hid * (1 - t)) * Kamerakayrat.Pehmea(t / 0.08 + 0.15);
            }
            double kiihdytys = Kamerakayrat.Pehmea((t - j.Sivu) / Math.Max(1e-6, 0.45 * (j.Loitto - j.Sivu)));
            double hidastus = Kamerakayrat.Pehmea((t - j.Liuku) / Math.Max(1e-6, 1.0 - j.Liuku));
            return Lerp(0.035, 1.0, kiihdytys) * (1.0 - hidastus) + 0.02 * hidastus * (1 - t);
        }

        /// <summary>Koneen reittiosuus 0–1 lennon aikaosuudesta t (monotoninen, nopeus jatkuva).</summary>
        public static double KoneenOsuus(double t, Jako j)
        {
            var k = kertyma;
            if (k == null || !kertymanJako.Equals(j))
            {
                k = new double[Naytteita + 1];
                var v = new double[Naytteita + 1];
                var a = new double[Naytteita + 1];
                const double dt = 1e-4;
                double summa = 0;
                for (int i = 0; i <= Naytteita; i++)
                {
                    double ti = i / (double)Naytteita;
                    v[i] = Nopeus(ti, j);
                    a[i] = (Nopeus(Math.Min(1, ti + dt), j) - Nopeus(Math.Max(0, ti - dt), j)) / (Math.Min(1, ti + dt) - Math.Max(0, ti - dt));
                    // Simpson (virhe h⁵): kertymän ja nopeuden ristiriita ei porrasta kiihtyvyyttä solujen rajoilla.
                    if (i > 0) summa += (v[i - 1] + 4 * Nopeus((i - 0.5) / Naytteita, j) + v[i]) / (6.0 * Naytteita);
                    k[i] = summa;
                }
                for (int i = 0; i <= Naytteita; i++) { k[i] /= summa; v[i] /= summa; a[i] /= summa; }
                kertymanNopeus = v;
                kertymanKiihtyvyys = a;
                kertyma = k;
                kertymanJako = j;
            }
            var nv = kertymanNopeus;
            var na = kertymanKiihtyvyys;
            double x = Rajaa(t, 0, 1) * Naytteita;
            int jj = Math.Min(Naytteita - 1, (int)x);
            // Kvinttinen Hermite nopeuksilla ja kiihtyvyyksillä (löydös 120): lineaarinen taulukko porrasti koneen nopeuden
            // 512 kertaa lennossa, ja konetta katsova kamera peri portaat. Nyt paikka, nopeus ja kiihtyvyys ovat jatkuvia.
            const double h = 1.0 / Naytteita;
            return Kvintti(k[jj], nv[jj] * h, na[jj] * h * h, k[jj + 1], nv[jj + 1] * h, na[jj + 1] * h * h, x - jj);
        }

        /// <summary>
        /// Kvinttinen Hermite: arvot p0, p1, nopeudet m0, m1 ja kiihtyvyydet c0, c1 (yksikkönä koko väli), u = 0–1.
        /// Arvo, 1. ja 2. derivaatta täsmäävät päissä, joten peräkkäiset välit ovat C2-jatkuvia.
        /// </summary>
        static double Kvintti(double p0, double m0, double c0, double p1, double m1, double c1, double u)
        {
            double u2 = u * u, u3 = u2 * u, u4 = u3 * u, u5 = u4 * u;
            double h5 = 10 * u3 - 15 * u4 + 6 * u5;
            return p0 * (1 - h5) + p1 * h5
                   + m0 * (u - 6 * u3 + 8 * u4 - 3 * u5) + m1 * (-4 * u3 + 7 * u4 - 3 * u5)
                   + c0 * (0.5 * u2 - 1.5 * u3 + 1.5 * u4 - 0.5 * u5) + c1 * (0.5 * u3 - u4 + 0.5 * u5);
        }

        /// <summary>Beta-kertymä F(u) = ∫₀ᵘ s^a (1 − s)^k ds / ∫₀¹ s^a (1 − s)^k ds (kokonaisluvut a, k; binomikehitelmä).</summary>
        static double BetaKertyma(int a, int k, double u)
        {
            u = Rajaa(u, 0, 1);
            double s = 0, b = 0, c = 1, merkki = 1;
            for (int j = 0; j <= k; j++)
            {
                double e = a + j + 1;
                s += merkki * c * Math.Pow(u, e) / e;
                b += merkki * c / e;
                c = c * (k - j) / (j + 1);
                merkki = -merkki;
            }
            return Rajaa(s / b, 0, 1);
        }

        /// <summary>Kvinttisen Hermiten derivaatta u:n suhteen.</summary>
        static double Kvintti1(double p0, double m0, double c0, double p1, double m1, double c1, double u)
        {
            double u2 = u * u, u3 = u2 * u, u4 = u3 * u;
            double h5 = 30 * u2 - 60 * u3 + 30 * u4;
            return (p1 - p0) * h5
                   + m0 * (1 - 18 * u2 + 32 * u3 - 15 * u4) + m1 * (-12 * u2 + 28 * u3 - 15 * u4)
                   + c0 * (u - 4.5 * u2 + 6 * u3 - 2.5 * u4) + c1 * (1.5 * u2 - 4 * u3 + 2.5 * u4);
        }

        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        static double Lerp(double a, double b, double t) => a + (b - a) * t;
        static double Kiedo(double a) => ((a % 360.0) + 360.0) % 360.0;
        static double Kiedo180(double a) => ((a % 360.0) + 540.0) % 360.0 - 180.0;
    }
}
