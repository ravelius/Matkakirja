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
        /// Omistaja 25.9. klo 19.0x (löydös 120 v2): 12 s, jotta lennon alku (nousu Lontoosta) näkyy kaukaa ennen lähestymistä.
        /// </summary>
        public static double AloituslennonKestoS = 12.0;
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

        // ---- Aloituslennon kamerareitti (löydös 120 v2, omistaja 25.9. klo 19.0x; korvaa löydöksen 110 aikajanan) ----
        //
        // Löydös 120 (omistaja build 14): "kamera pomppii liian villisti eri paikkoihin". Löydöksen 110 aikajana teki kaksi
        // erillistä syöksyä 1200 km ↔ 12 km ja vaihtoi kylkeä, ja Arvo() interpoloi segmenteittäin omalla käyrällä. Siitä
        // lähtien aloituslento on YKSI kamerareitti (AloitusReitti): jokainen kanava (log-etäisyys, kallistus, absoluuttinen
        // suunta, kohde, koneen ruutuosuus) on kvinttinen Hermite-spline aikaa vasten (Kanava: nopeus ja kiihtyvyys jatkuvia,
        // lepoavaimissa molemmat 0), joten sijainti ja katse ovat C2-jatkuvia.
        // V1 (f9d785c9, omistaja hylkäsi v1-videoparista): syöksy valintanäkymästä etuviistoon ja kaarto nokan edestä
        // kadottivat koneen kuvasta, loppukierrossa katse siirtyi kaupunkiin koneen ollessa vielä satoja km:n päässä, eikä
        // nousu näkynyt. Omistajan tarkennus: "LENTOKONE ON KOKO AJAN NÄKYVISSÄ … ja LENNON ALKU NÄKYY, vaikka kaukaa: nousu
        // lähtökaupungista on kuvassa ennen kuin kamera lähestyy konetta"; lento saa kestää 12 s. V2: katse on koko ajan
        // koneessa tai pisteessä, josta kone näkyy (Kartta-testit: koneen projektio ruudun sisällä pysty- ja vaakamuodossa).
        // Sekunnit 12 s:n lennolla (skaalautuu AloituslennonKestoS:n mukaan), P(x) = suunta koneen suhteen puolen mukaan:
        //   0,0–1,8  (a) AVAUS         kaukaa (450 km, 45°, P(100)): Lontoo ja nouseva kone kuvassa. Musta verho paljastaa
        //                              tämän kuvan (Nappula asettaa kameran avaukseen verhon alla); kone lähtee levosta ja
        //                              nousee, kamera lähes paikallaan, katse liukuu Lontoosta koneeseen (valmis 2,1 s)
        //   1,8–3,4  (b) LÄHESTYMINEN  vahva ease-in → nopea lähestyminen → kuminauha: ylitys 11 km (3,0 s, lepo), paluu
        //                              13 km:iin (3,4 s); suunta pysyy P(100):ssa, kallistus 45° → 82°, kone kasvaa
        //                              fyysisenä kokona lähikuvan 1,9:ään (ylityksessä 2,2)
        //   3,4–5,8  (c) LÄHIKUVA      lähes paikallaan, hidas panorointi koneen ympäri P(100) → P(135), 13 → 12,5 km;
        //                              kone kuvan keskellä (katse koneessa)
        //   5,8–7,6  (d) IRTAUTUMINEN  kiihtyvä loittonus kaukonäkymään (huippu 8,0 s), kallistus → 40°, kone → merkkikoko
        //   7,6–8,8  (e) MATKA         hidas ajelehdinta (huippu → 0,92 × kauko), kone kiitää kuvan keskellä, suunta liukuu
        //                              kierron alkuun
        //   8,8–10,4 (f) KIERTO        laskeutuminen kohteen ylle 250 km:iin, 55°, kulmanopeus kasvaa levosta; katse koneessa,
        //                              kone hidastaa kameran mukana (kaupunki lähestyy kuvan keskustaa)
        //  10,4–12,0     ORBIT + LASKU vakiokulmanopeus; kone laskeutuu kaupunkiin (11,0 s), katse kone → kaupunki →
        //                              saapumisnäkymä, jarrutus lepoon viimeisen 1,2 s:n aikana
        // Koneen eteneminen on reitin oma (AloitusReitti.KoneenOsuus): lähtö levosta, lähikuvissa 20 km/s (kaikilla
        // reiteillä sama), matka kattaa loput, ja laskeutumisessa nopeus seuraa kameran etäisyyttä (kulmanopeus kamerasta
        // 0,6 × matkan kulmanopeus, enintään 0,3 rad/s), joten kone on perillä ennen kuin katse lähtee siitä.

        /// <summary>Aloituslennon referenssikesto (s): vaiheiden sekunnit on annettu tälle, osuus = s / 12.</summary>
        public const double AloitusRefS = 12.0;

        /// <summary>
        /// Aloituslennon vaihejako (osuudet 0–1, löydös 120 v2): Syoksy = lähestymisen loppu (3,4 s; koneen nousu päättyy
        /// <see cref="AloituksenNousu"/> × tämä), Sivu = lähikuvan loppu (5,8 s), Loitto = Liuku = irtautumisen loppu eli
        /// matkan alku (7,6 s: pilvet ja Sentinel pois kamera kaukana), Kierto = orbitin alku (10,4 s), Tasainen = orbitin
        /// jarrutuksen alku (10,8 s). Kesto <see cref="AloituslennonKestoS"/>.
        /// </summary>
        public static Jako JaaAloitus(double kestoS) =>
            new Jako(kestoS > 0 ? kestoS : AloituslennonKestoS, 3.4 / AloitusRefS, 5.8 / AloitusRefS, 6.5 / AloitusRefS,
                7.6 / AloitusRefS, 7.6 / AloitusRefS, 10.4 / AloitusRefS, AloitusJarrutus, aloitus: true);

        /// <summary>Aloituslennon lopun jarrutuksen alku (osuus, 10,8 s): jarrutus lepoon viimeisen 1,2 s:n aikana.</summary>
        public const double AloitusJarrutus = 10.8 / AloitusRefS;

        /// <summary>Aloituslennon matkan loppu = kierron alku (osuus, 8,8 s): Vaihe Matka → Lasku.</summary>
        public const double AloitusMatkaLoppu = 8.8 / AloitusRefS;

        /// <summary>Kone laskeutuu kaupunkiin (osuus, 11,0 s): reittiosuus 1, nopeus ja kiihtyvyys 0.</summary>
        public const double AloitusLaskeutuminen = 11.0 / AloitusRefS;

        /// <summary>Avauksen kameran asento (löydös 120 v2): etäisyys Lontoosta (m), kallistus (°), suunta koneen suhteen (P).</summary>
        public const double AloitusAvausM = 450_000.0, AloitusAvausKallistus = 45.0;
        /// <summary>Katse Lontoosta koneeseen valmis (osuus, 2,1 s).</summary>
        public const double AloitusKatseKoneessa = 2.1 / AloitusRefS;
        /// <summary>Kuminauhan ylitys (lepo, lähimmillään) ja lähikuvan alku (osuudet, 3,0 ja 3,4 s).</summary>
        public const double AloitusYlitys = 3.0 / AloitusRefS, AloitusLahikuva = 3.4 / AloitusRefS;
        /// <summary>Kuminauhan ylityksen etäisyys (m).</summary>
        public const double AloitusYlitysM = 11_000.0;
        /// <summary>Lähikuva (löydös 120): etäisyys (m), kallistus (°), suunta koneen suhteen lähikuvan alussa ja lopussa (P).</summary>
        public const double AloitusLahiM = 13_000.0, AloitusLahiKallistus = 82.0, AloitusLahiSuunta = 100.0, AloitusPanorointiSuunta = 135.0;
        /// <summary>Koneen leveys ruudusta lähikuvassa (puolet koneesta näkyy, löydös 110; omistaja: pidä ennallaan).</summary>
        public const double AloitusLahiKone = 1.9;
        /// <summary>Irtautumisen loppukallistus (°) ja loppusuunta koneen suhteen (P).</summary>
        public const double AloitusKaukoKallistus = 40.0, AloitusKaukoSuunta = 140.0;
        /// <summary>Irtautumisen lähtöetäisyys (m, lähikuvan loppu 5,8 s) ja kaukonäkymän huippu (osuus, 8,0 s).</summary>
        public const double AloitusIrtautuminenM = 12_500.0, AloitusHuippu = 8.0 / AloitusRefS;
        /// <summary>Koneen nopeus lähikuvissa (m/s, kaikilla reiteillä sama): maa virtaa lähikuvan takana.</summary>
        public const double AloitusLahiNopeus = 20_000.0;
        /// <summary>Laskeutumisen kulmanopeus kamerasta enintään (rad/s) ja osuus matkan kulmanopeudesta.</summary>
        public const double AloitusLaskuKulmaMax = 0.3, AloitusLaskuKulmaOsuus = 0.6;

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
        /// Aloituslennon nousu päättyy tällä osuudella lähestymisestä (Jako.Syoksy; muilla lennoilla 1,0). Löydös 120 v2:
        /// kone nousee Lontoosta avauksen ja lähestymisen aikana ja on 10 km:ssä 2,9 s:ssa ennen kuminauhan ylitystä.
        /// (Löydös 84: kone oli jo nousussa, kun kamera lähti valintanäkymästä; 0,6 syöksystä.)
        /// </summary>
        public const double AloituksenNousu = 0.85;

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
        /// ALOITUSLENNON KAMERAREITTI (löydös 120 v2): viisi kvinttistä Hermite-kanavaa samalle aikajanalle (ks. JaaAloitus)
        /// ja koneen oma eteneminen (<see cref="KoneenOsuus"/>). Etäisyys on kanavassa logaritmina ja suunta absoluuttisena
        /// (koneen suhteen annetut avaimet muunnettu avaimen hetken lentosuunnalla ja kierretty yhtenäiseksi). Kanavien
        /// avain 0 on avauksen asento (<see cref="Avaus"/>): Nappula asettaa kameran siihen mustan verhon alla, ja
        /// <see cref="AsetaAlku"/> ottaa talteen kameran todellisen asennon.
        /// </summary>
        public sealed class AloitusReitti
        {
            public readonly Kanava LogEtaisyys = new Kanava(), Kallistus = new Kanava(), Suunta = new Kanava(),
                Kohde = new Kanava(), Kone = new Kanava();
            public readonly Jako Jako;
            /// <summary>Lähikuvan kylki: +1 = P(x) = x (panorointi kasvattaa suuntaa, myötäpäivään), −1 peilattuna.</summary>
            public int Puoli { get; internal set; }
            /// <summary>Kierron ja orbitin kokonaiskulma (°, + = suunta kasvaa) 8,8 s:sta perille.</summary>
            public double Kaari { get; internal set; }
            /// <summary>Suunnan siirtymä matkan aikana (°) irtautumisen lopusta kierron alkuun.</summary>
            public double Ajelehdinta { get; internal set; }
            /// <summary>Koneen matkanopeus (m/s) ja laskeutumisen kulmanopeus kamerasta (rad/s).</summary>
            public double MatkaNopeus { get; internal set; }
            public double LaskuKulma { get; internal set; }

            internal AloitusReitti(Jako j) { Jako = j; }

            /// <summary>
            /// Kameran todellinen lähtöasento (avain 0; Nappula: kameran asento verhon jälkeen, normaalisti täsmälleen
            /// <see cref="Avaus"/>). Suunta lähimpään avauksen suunnan vastineeseen, joten kamera ei kierrä turhaan.
            /// </summary>
            public void AsetaAlku(double etaisyys, double kallistus, double suunta)
            {
                LogEtaisyys[0] = Math.Log(Math.Max(1.0, etaisyys));
                Kallistus[0] = kallistus;
                Suunta[0] = Suunta[0] + Kiedo180(suunta - Suunta[0]);
            }

            /// <summary>Kameran asento kohdassa t (0–1): etäisyys (m), kallistus, suunta (°, absoluuttinen), kohde, kone.</summary>
            public (double etaisyys, double kallistus, double suunta, double kohde, double kone) Arvo(double t) =>
                (Math.Exp(LogEtaisyys.Arvo(t)), Kallistus.Arvo(t), Suunta.Arvo(t), Rajaa(Kohde.Arvo(t), -1, 2), Math.Max(0, Kone.Arvo(t)));

            /// <summary>
            /// Avauksen asento (t = 0): katse Lontoossa (lennon pohjan tasolla), etäisyys, kallistus ja suunta. Nappula asettaa
            /// kameran tähän mustan verhon alla, joten verho paljastaa suoraan Lontoon ja nousevan koneen.
            /// </summary>
            public (double etaisyys, double kallistus, double suunta) Avaus
            {
                get { var a = Arvo(0); return (a.etaisyys, a.kallistus, a.suunta); }
            }

            /// <summary>Lähikuvan alku (osuus): Nappula esilataa sen laatat mustan verhon alla koneen sen hetken paikassa.</summary>
            public double LahikuvaOsuus => AloitusLahikuva;

            /// <summary>Lähikuvan alku (3,4 s): etäisyys, kallistus ja suunta (katse koneessa).</summary>
            public (double etaisyys, double kallistus, double suunta) Lahikuva
            {
                get { var a = Arvo(LahikuvaOsuus); return (a.etaisyys, a.kallistus, a.suunta); }
            }

            // ---- Koneen eteneminen (reittiosuus 0–1) ----

            internal const int KoneNaytteita = 2048;
            internal double[] koneP, koneV, koneA;

            /// <summary>
            /// Koneen reittiosuus 0–1 lennon aikaosuudesta t: monotoninen, paikka, nopeus ja kiihtyvyys jatkuvia (kvinttinen
            /// Hermite taulukosta), 1 laskeutumisesta (<see cref="AloitusLaskeutuminen"/>) perille.
            /// </summary>
            public double KoneenOsuus(double t)
            {
                double x = Rajaa(t, 0, 1) * KoneNaytteita;
                int j = Math.Min(KoneNaytteita - 1, (int)x);
                const double h = 1.0 / KoneNaytteita;
                return Rajaa(Kvintti(koneP[j], koneV[j] * h, koneA[j] * h * h, koneP[j + 1], koneV[j + 1] * h, koneA[j + 1] * h * h, x - j), 0, 1);
            }
        }

        /// <summary>Kierron vähimmäiskulma (°): lyhyempi kaari venytetään tähän matkan aikaisella ajelehdinnalla.</summary>
        public const double AloitusKaariMin = 30.0;
        /// <summary>Hinta (° ajelehdintaa), jos loppuorbit kiertää eri suuntaan kuin lähikuvan panorointi.</summary>
        public const double AloitusVastasuuntaHinta = 60.0;

        /// <summary>
        /// Aloituslennon kamerareitti (löydös 120 v2). reittiM, saapumisKorkeus ja k kuten <see cref="Laske"/>;
        /// j = <see cref="JaaAloitus"/>; suuntimaReitilla(p) = koneen suuntima asteina reittiosuudella p (koneen eteneminen on
        /// reitin oma, <see cref="AloitusReitti.KoneenOsuus"/>). Lähtöasento on avaus (<see cref="AloitusReitti.Avaus"/>).
        /// KIERTOSUUNTA: kylki (Puoli) ja loppuorbitin suunta valitaan yhdessä: orbit kiertää samaan suuntaan kuin lähikuvan
        /// panorointi, ja kierron alkusuunta on irtautumisen loppusuunta, jos kaari pohjoiseen on siitä 30–180°; muuten
        /// suunta ajelehtii matkan aikana (kamera kaukana) lähimpään kelvolliseen alkuun. Vastasuuntainen orbit vain, jos se
        /// säästää yli 60° ajelehdintaa. Hinta = |ajelehdinta| + 0,3 · |kaari − tavoite (35°/s)|; maisema ratkaisee
        /// tasatilanteen (kaari, joka pyyhkäisee maiseman katsesuunnan yli).
        /// </summary>
        public static AloitusReitti LaskeAloitus(double reittiM, double saapumisKorkeus, Kierto k, Jako j, Func<double, double> suuntimaReitilla)
        {
            var r = new AloitusReitti(j);
            double T = j.KestoS;
            double Os(double s) => s / AloitusRefS;
            double kauko = Rajaa(reittiM * 1.2, 3_000_000.0, 9_000_000.0);
            const double tK = AloitusMatkaLoppu;      // kierron alku 8,8 s
            double tO = j.Kierto, tJ = j.Tasainen;    // orbit 10,4 s, jarrutus 10,8 s
            double Ln(double x) => Math.Log(Math.Max(1.0, x));

            // ETÄISYYS (log): (a)+(b) yhtenä profiilina avauksesta kuminauhan ylitykseen (lepo 11 km, 3,0 s): etäisyys^0,5-
            // avaruudessa nopeudella ∝ u⁵(1 − u)², joten avaus on lähes paikallaan (1,2 s:ssa 8 % lähempänä) ja lähestyminen
            // nopea (huippu ~2,1 s) ja jarruttaa ylitykseen; paluu 13 km:iin (3,4 s, ääriarvo), lähikuvassa hidas ajelehdinta
            // 12,5 km:iin (lepo 5,8 s). IRTAUTUMINEN kaukonäkymään 5,8–8,0 s (etäisyys^0,35, ∝ u²(1 − u)³: koettu zoomaus
            // kiihtyy 0,2 s:ssa 2,6 e/s:iin, v1:n etäisyys^0,5 nytkäytti 4,2 e/s:iin; huippu ~6 e/s), matkassa hidas
            // ajelehdinta sisäänpäin (0,92 × kauko 8,8 s, liike jatkuu kiertoon), kierto 250 km:iin (lepo 10,4 s) ja LASKU
            // saapumisnäkymään 10,4–12 s (metreinä, ∝ u²(1 − u)⁴, lepo tasan perillä).
            r.LogEtaisyys.Lepo(0.0, Ln(AloitusAvausM))
                .Profiili(AloitusYlitys, Ln(AloitusYlitysM), 0.5, 5, 2)
                .Lisaa(AloitusLahikuva, Ln(AloitusLahiM))
                .Lepo(j.Sivu, Ln(AloitusIrtautuminenM))
                .Profiili(AloitusHuippu, Ln(kauko), 0.35, 2, 3)
                .Lisaa(tK, Ln(kauko * 0.92)).Lepo(tO, Ln(KiertoM))
                .Profiili(1.0, Ln(saapumisKorkeus), 1.0, 2, 4);

            // KONEEN ETENEMINEN (m/s): lähtö levosta (1,4 s) lähikuvan nopeuteen, kiihdytys irtautumisessa (5,8–7,3 s),
            // matkanopeus, siirtymä laskeutumiseen (8,2–9,2 s), jossa nopeus = kulmanopeus × kameran etäisyys (kone
            // hidastaa kameran laskeutuessa, joten kaupunki lähestyy kuvan keskustaa tasaisesti), ja jarrutus lepoon
            // laskeutumiseen (10,2–11,0 s). Matkanopeus kattaa loput reitistä; laskeutumisen kulmanopeus on 0,6 × matkan
            // kulmanopeus, enintään 0,3 rad/s.
            Func<double, double> e = t => Math.Exp(r.LogEtaisyys.Arvo(t));
            double S1(double t) => Kamerakayrat.Pehmea(t * T / 1.4);
            double S2(double t) => Kamerakayrat.Pehmea((t * T - 5.8) / 1.5);
            double S3(double t) => Kamerakayrat.Pehmea((t * T - 8.2) / 1.0);
            double S4(double t) => Kamerakayrat.Pehmea((t * T - 10.2) / ((AloitusLaskeutuminen * T) - 10.2));
            double Lahi(double t) => S1(t) * (1 - S2(t));
            double Matka(double t) => S2(t) * (1 - S3(t));
            double Lasku(double t) => e(t) * S3(t) * (1 - S4(t));
            // Integraalit sekunteina (Simpson): lähikuva, matka ja laskeutuminen.
            const int N = AloitusReitti.KoneNaytteita;
            double I(Func<double, double> f)
            {
                double s = 0;
                for (int i = 0; i < N; i++)
                {
                    double a = i / (double)N, b = (i + 1) / (double)N;
                    s += (f(a) + 4 * f(0.5 * (a + b)) + f(b)) / 6.0 * (b - a);
                }
                return s * T;
            }
            double iLahi = I(Lahi), iMatka = I(Matka), iLasku = I(Lasku);
            double eMatka = kauko * 0.92;
            double loput = Math.Max(0.0, reittiM - AloitusLahiNopeus * iLahi);
            double vMatka = loput / (iMatka + AloitusLaskuKulmaOsuus * iLasku / eMatka);
            double wLasku = AloitusLaskuKulmaOsuus * vMatka / eMatka;
            if (wLasku > AloitusLaskuKulmaMax)
            {
                wLasku = AloitusLaskuKulmaMax;
                vMatka = Math.Max(0.0, loput - wLasku * iLasku) / iMatka;
            }
            r.MatkaNopeus = vMatka; r.LaskuKulma = wLasku;
            double Nopeus(double t) => AloitusLahiNopeus * Lahi(t) + vMatka * Matka(t) + wLasku * Lasku(t);
            {
                var p = new double[N + 1];
                var v = new double[N + 1];
                var a = new double[N + 1];
                const double dt = 1e-5;
                double summa = 0;
                for (int i = 0; i <= N; i++)
                {
                    double ti = i / (double)N;
                    v[i] = Nopeus(ti) * T;
                    a[i] = (Nopeus(Math.Min(1, ti + dt)) - Nopeus(Math.Max(0, ti - dt))) * T / (Math.Min(1, ti + dt) - Math.Max(0, ti - dt));
                    if (i > 0) summa += (v[i - 1] + 4 * Nopeus((i - 0.5) / N) * T + v[i]) / (6.0 * N);
                    p[i] = summa;
                }
                // Normitus: laskeutumisesta alkaen tasan 1 (Simpsonin pieni virhe jaetaan koko matkalle).
                for (int i = 0; i <= N; i++) { p[i] /= summa; v[i] /= summa; a[i] /= summa; }
                r.koneP = p; r.koneV = v; r.koneA = a;
            }
            double L(double o) => suuntimaReitilla(r.KoneenOsuus(o));

            // Kierto kiihtyy levosta vakionopeuteen ja jarruttaa lepoon smootherstep-nopeusprofiililla (kvinttinen Hermite,
            // kiihtyvyys 0 päissä): kiihdytys- ja jarrutusvaihe kattavat puolet kulmastaan vakionopeudella.
            double tehollinen = (tO - tK) / 2.0 + (tJ - tO) + (1.0 - tJ) / 2.0;
            double tavoite = TavoiteNopeus * tehollinen * T;

            // Kylki ja kierto: irtautumisen loppusuunta A = lentosuunta(7,6 s) + P(140).
            double L76 = L(j.Liuku);
            double parasHinta = double.MaxValue;
            int puoli = 1; double kaari = 0, ajelehdinta = 0;
            foreach (int pu in new[] { 1, -1 })
            foreach (int su in new[] { 1, -1 })
            {
                double A = L76 + (pu > 0 ? AloitusKaukoSuunta : 360.0 - AloitusKaukoSuunta);
                double m0 = Kiedo(su > 0 ? -A : A);
                double m = Rajaa(m0, AloitusKaariMin, 180.0);
                double drift = Kiedo180(-su * m - A);
                double hinta = Math.Abs(drift) + 0.3 * Math.Abs(m - tavoite) + (su != pu ? AloitusVastasuuntaHinta : 0);
                if (!double.IsNaN(k.Suunta) && Pyyhkaisee(A + drift, su * m, k.Suunta)) hinta -= 5.0;
                if (hinta < parasHinta) { parasHinta = hinta; puoli = pu; kaari = su * m; ajelehdinta = drift; }
            }
            r.Puoli = puoli; r.Kaari = kaari; r.Ajelehdinta = ajelehdinta;
            double P(double x) => puoli > 0 ? x : 360.0 - x;

            // SUUNTA: koneen suhteen annetut avaimet absoluuttisiksi yhtenäisenä ketjuna. Avauksesta lähikuvaan suunta pysyy
            // P(100):ssa (vain lentosuunnan muutos), lähikuvassa hidas panorointi levosta P(135):een ja irtautumisessa P(140).
            double edO = 0.0, edRel = P(AloitusLahiSuunta), ed = L(0) + edRel;
            double Abs(double o, double rel)
            {
                ed += (rel - edRel) + Kiedo180(L(o) - L(edO));
                edO = o; edRel = rel;
                return ed;
            }
            r.Suunta.Lepo(0.0, ed);
            r.Suunta.Lepo(AloitusLahikuva, Abs(AloitusLahikuva, P(AloitusLahiSuunta)));
            r.Suunta.Lisaa(j.Sivu, Abs(j.Sivu, P(AloitusPanorointiSuunta)));
            double s76 = Abs(j.Liuku, P(AloitusKaukoSuunta));
            r.Suunta.Lisaa(j.Liuku, s76);
            // KIERTO + ORBIT yhtenä kulmaraitana: levosta (8,8 s) kiihtyen vakionopeuteen ω (10,4 s), vakio jarrutuksen
            // alkuun (Tasainen 10,8 s) ja jarrutus lepoon pohjoiseen tasan perillä (viimeiset 1,2 s).
            double w = kaari / tehollinen, hk = s76 + ajelehdinta;
            r.Suunta.Lepo(tK, hk);
            r.Suunta.Lisaa(tO, hk + w * (tO - tK) / 2.0, w, 0);
            r.Suunta.Lisaa(tJ, hk + w * (tO - tK) / 2.0 + w * (tJ - tO), w, 0);
            r.Suunta.Lepo(1.0, hk + kaari);

            // KALLISTUS: avauksen 45°:sta lähikuvan 82°:een samalla profiililla kuin etäisyys mutta myöhemmin (∝ u⁶(1 − u)²
            // lähes lineaarisena, 3,1 s), lähikuvassa 82°, irtautumisessa 40°, kierrossa 55° ja perillä 0.
            r.Kallistus.Lepo(0.0, AloitusAvausKallistus).Profiili(Os(3.1), AloitusLahiKallistus, 0.001, 6, 2)
                .Lepo(j.Sivu, AloitusLahiKallistus)
                .Lisaa(Os(7.8), AloitusKaukoKallistus).Lisaa(tO, KiertoKallistus).Lepo(1.0, 0);

            // KOHDE: Lontoo → kone (2,1 s) → (kone perillä 11,0 s) kaupunki → saapumisnäkymän keskipiste, kaikki lepoavaimia:
            // Nappula vaihtaa kohdissa 0 ja 1 katsepisteen kaavaa (lähtö–kone, kone–kaupunki, kaupunki–saapumisnäkymä), ja
            // läpi kulkeva kohde taittaisi katsepisteen radan (nopeus 0) tai sen kiihtyvyyden (kiihtyvyys 0). Katse lähtee
            // koneesta vasta, kun kone on lähes perillä (koneen projektio pysyy ruudulla, Kartta-testit).
            r.Kohde.Lepo(0.0, -1).Lepo(AloitusKatseKoneessa, 0).Lepo(Os(10.5), 0).Lepo(Os(11.2), 1).Lepo(1.0, 2);

            // KONE (ruutuosuus): avauksessa merkkikoko, lähestymisessä fyysinen koko 1,9 × 13 km / etäisyys (kone kasvaa
            // kameran lähestyessä, ylityksessä ~2,2), lähikuvassa 1,9; irtautumisessa fyysinen koko 1,9 × 12,5 km / etäisyys,
            // merkkikokoon ~6,5 s:ssa.
            // Avauksesta kuminauhaan avain 0,1 s:n välein fyysisestä koosta (harvemmat avaimet taittoivat nopeuden ylityksen
            // jarrutuksessa); ennen ~2,2 s:a arvo on merkkikoon alla (avauksessa 0,05), jolloin Nappulan pehmeä maksimi pitää
            // merkin.
            // Avaimiin fyysisen koon nopeus ja kiihtyvyys (keskeisdifferenssit), joten kanava seuraa sitä C2-jatkuvasti.
            void Fyysinen(double o, double m)
            {
                const double d = 1e-4;
                double f(double x) => AloitusLahiKone * m / e(Rajaa(x, 0, 1));
                r.Kone.Lisaa(o, f(o), (f(o + d) - f(o - d)) / (2 * d), (f(o + d) - 2 * f(o) + f(o - d)) / (d * d));
            }
            r.Kone.Lepo(0.0, AloitusLahiKone * AloitusLahiM / e(0));
            for (int i = 1; i <= 33; i++) Fyysinen(Os(i / 10.0), AloitusLahiM);
            r.Kone.Lisaa(AloitusLahikuva, AloitusLahiKone).Lisaa(Os(4.6), AloitusLahiKone).Lisaa(j.Sivu, AloitusLahiKone);
            double eS = e(j.Sivu);
            for (int i = 59; i <= 70; i++) Fyysinen(Os(i / 10.0), eS);
            r.Kone.Lepo(Os(7.2), 0).Lepo(1.0, 0);
            return r;
        }

        /// <summary>
        /// Lennon vaihe: nousu syöksystä loittonuksen loppuun, matka liu'un ajan, lasku kierrosta perille. Aloituslennolla
        /// (löydös 120) matka on irtautumisen lopusta (Loitto = Liuku, 7,6 s) kierron alkuun (<see cref="AloitusMatkaLoppu"/>,
        /// 8,8 s).
        /// </summary>
        public static LennonVaihe Vaihe(double t, Jako j) =>
            t < j.Loitto ? LennonVaihe.Nousu : t < (j.Aloitus ? Math.Max(j.Liuku, AloitusMatkaLoppu) : j.Liuku) ? LennonVaihe.Matka : LennonVaihe.Lasku;

        /// <summary>
        /// Koneen vähimmäiskorkeus (m lennon pohjasta) hetkellä t: nousee syöksyn aikana 10 km:iin (sivukyljessä
        /// kamera on koneen tasolla 30 km:n päässä ja kone skaalattu 0,9 ruudun levyiseksi) ja laskee orbitin aikana
        /// nollaan, jotta kone laskeutuu kaupunkiin. Nappula: korkeus = max(huippu · sin πp, tämä). Aloituslennolla
        /// (löydös 120 v2) lasku on <see cref="AloitusLaskuAlku"/> → laskeutuminen (9,4–11,0 s), jolloin kone on perillä.
        /// </summary>
        public static double KoneenMinimi(double t, Jako j, double nousu = 1.0)
        {
            double laskuAlku = j.Aloitus ? AloitusLaskuAlku : j.Kierto, laskuLoppu = j.Aloitus ? AloitusLaskeutuminen : 1.0;
            return MinKoneKorkeusM * Kamerakayrat.Pehmea(t / Math.Max(1e-6, nousu * j.Syoksy))
                   * (1.0 - Kamerakayrat.Pehmea((t - laskuAlku) / Math.Max(1e-6, laskuLoppu - laskuAlku)));
        }

        /// <summary>Aloituslennon koneen vähimmäiskorkeuden laskun alku (osuus, 9,4 s).</summary>
        public const double AloitusLaskuAlku = 9.4 / AloitusRefS;

        /// <summary>
        /// Koneen koko ruudulla (px) lennon aikana (Nappula.PaivitaKone, löydös 120 v2): pehmeä maksimi merkkikoosta ja
        /// aikajanan ruutuosuudesta ruudun LYHYEMMÄN sivun mukaan (vaakamuodossa lähikuvan 1,9 ei enää tarkoita 1,9 × leveyttä,
        /// jolloin kone oli nelinkertainen ruudun korkeuteen ja siivet kameran takana). ⁴√(a⁴ + b⁴) ≥ max(a, b) ja on sileä,
        /// joten kone kasvaa lähestymisessä ilman taitetta, kun fyysinen koko ohittaa merkkikoon (lähikuvassa ero ~0,01 %).
        /// </summary>
        public static double KoneenKokoPx(double merkkiPx, double koneRuudusta, double leveysPx, double korkeusPx)
        {
            double a = Math.Max(0, merkkiPx), b = Math.Max(0, koneRuudusta) * Math.Min(leveysPx, korkeusPx);
            double m = Math.Max(a, b);
            if (!(m > 0)) return 0;
            double x = a / m, y = b / m;
            return m * Math.Pow(x * x * x * x + y * y * y * y, 0.25);
        }

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

        // ---- Löydös 172 (omistaja 26.9. klo 19.3x): kone matalammalle ja lähikuvassa vaakasuoraan. ----
        // Käsikirjoitus proto-3d/lokit/kamerakasikirjoitus-lento-20260924.md, osio "Koneen korkeus ja asento". Paino
        // k(d) kameran etäisyydestä koneeseen: lähikuvissa (d ≤ 150 km) kone on matkalentokorkeudessa (minimi) ja
        // vaakasuorassa, kaukaa (d ≥ 2000 km) se kulkee matalalla kaarella ja nokka seuraa kaarta enintään ±6°.

        /// <summary>Painon rajat (m): lähikuva ja kaukokuva.</summary>
        public const double PainoLahiM = 150_000.0, PainoKaukoM = 2_000_000.0;
        /// <summary>Kaaren huippu: enintään 150 km ja 5 % reitistä (ennen 900 km ja 12 %).</summary>
        public const double HuippuMaxM = 150_000.0, HuippuOsuus = 0.05;
        /// <summary>Nokan suurin kallistus kaaren mukaan (°), kaukokuvassa.</summary>
        public const double NokkaMaxAste = 6.0;

        public static double Huippu(double reittiM) => Math.Min(HuippuMaxM, HuippuOsuus * Math.Max(0, reittiM));

        /// <summary>Kaaren ja nokan paino k(d) ∈ [0, 1]: smootherstep logaritmisella etäisyydellä 150 km → 2000 km.</summary>
        public static double KaarenPaino(double etaisyysM)
        {
            if (!(etaisyysM > PainoLahiM)) return 0;
            return Kamerakayrat.Pehmea(Math.Log(etaisyysM / PainoLahiM) / Math.Log(PainoKaukoM / PainoLahiM));
        }

        /// <summary>Koneen korkeus lennon pohjasta painolla: kaari huippu · sin πp · k, vähintään minimi (pehmeä maksimi).</summary>
        public static double KoneenKorkeus(double p, double huippu, double minimi, double paino) =>
            KoneenKorkeus(p, huippu * Math.Max(0, Math.Min(1, paino)), minimi);

        /// <summary>Nokan kulma vaakatasosta (°, + ylös): kaaren kulma rajattuna ±NokkaMaxAste ja kerrottuna painolla.</summary>
        public static double NokanKulma(double kaarenKulmaAste, double paino) =>
            Math.Max(-NokkaMaxAste, Math.Min(NokkaMaxAste, double.IsNaN(kaarenKulmaAste) ? 0 : kaarenKulmaAste)) * Math.Max(0, Math.Min(1, paino));

        // ---- Koneen eteneminen: nopeusprofiili integroituna, normitettuna niin, että t = 1 → 1. ----

        const int Naytteita = 512;
        static double[] kertyma, kertymanNopeus, kertymanKiihtyvyys;
        static Jako kertymanJako;

        /// <summary>
        /// Koneen nopeus (suhteellinen) hetkellä t: syöksyssä ja sivukyljessä lähes paikallaan, kiihdytys loittonuksessa,
        /// tasainen, hidastus kierrosta perille. Aloituslennon kone etenee reitin omalla profiililla
        /// (<see cref="AloitusReitti.KoneenOsuus"/>, löydös 120 v2), ei tällä.
        /// </summary>
        static double Nopeus(double t, Jako j)
        {
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
