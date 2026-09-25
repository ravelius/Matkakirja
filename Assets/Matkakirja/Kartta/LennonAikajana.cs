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
        /// Ehdotus 20 s = Lontoo–Ateena-referenssi (video aloituslento-84); omistaja vahvistaa. Muut lennot: Kesto.
        /// </summary>
        public static double AloituslennonKestoS = ReferenssiS;
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
            public Jako(double kestoS, double syoksy, double sivu, double loittoSauma, double loitto, double liuku, double kierto, double tasainen)
            {
                KestoS = kestoS; Syoksy = syoksy; Sivu = sivu; LoittoSauma = loittoSauma; Loitto = loitto;
                Liuku = liuku; Kierto = kierto; Tasainen = tasainen;
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

            var a = new List<Avain>
            {
                // Lähtöpiste (Nappula: kameran nykyinen asento).
                new Avain { Osuus = 0.0, Kohde = -1 },
                // (a) SYÖKSY koneen sivulle, kuminauha: kiihtyvä syöksy, pieni yli- ja paluuheilahdus.
                new Avain { Osuus = j.Syoksy, Kayra = Kayra.SyoksyKuminauha, Etaisyys = LahiM, Kallistus = LahiKallistus, Suunta = P(90), Kohde = 0, Kone = LahiKone },
            };
            // (a) SIVUKYLKI: lähes paikallaan, hidas liuku 90° → 110° (etäisyys 6 % lähemmäs).
            var sivu = new Avain { Osuus = j.Sivu, Kayra = Kayra.Pehmea, Etaisyys = LahiM * 0.94, Kallistus = LahiKallistus, Suunta = P(110), Kohde = 0, Kone = LahiKone };
            a.Add(sivu);
            // (b) LOITTONUS: kiihtyvä + jarruttava pari (nopeus sama saumassa), kohde kone koko ajan.
            var loitto = new Avain { Osuus = j.Loitto, Kayra = Kayra.Jarruttava, Etaisyys = kauko, Kallistus = KaukoKallistus, Suunta = P(120), Kohde = 0 };
            a.Add(Pari(sivu, loitto, j.LoittoSauma));
            a.Add(loitto);
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

        /// <summary>Lennon vaihe: nousu syöksystä loittonuksen loppuun, matka liu'un ajan, lasku kierrosta perille.</summary>
        public static LennonVaihe Vaihe(double t, Jako j) => t < j.Loitto ? LennonVaihe.Nousu : t < j.Liuku ? LennonVaihe.Matka : LennonVaihe.Lasku;

        /// <summary>
        /// Koneen vähimmäiskorkeus (m lennon pohjasta) hetkellä t: nousee syöksyn aikana 10 km:iin (sivukyljessä
        /// kamera on koneen tasolla 30 km:n päässä ja kone skaalattu 0,9 ruudun levyiseksi) ja laskee orbitin aikana
        /// nollaan, jotta kone laskeutuu kaupunkiin. Nappula: korkeus = max(huippu · sin πp, tämä).
        /// </summary>
        public static double KoneenMinimi(double t, Jako j, double nousu = 1.0) =>
            MinKoneKorkeusM * Kamerakayrat.Pehmea(t / Math.Max(1e-6, nousu * j.Syoksy)) * (1.0 - Kamerakayrat.Pehmea((t - j.Kierto) / Math.Max(1e-6, 1.0 - j.Kierto)));

        // ---- Koneen eteneminen: nopeusprofiili integroituna, normitettuna niin, että t = 1 → 1. ----

        const int Naytteita = 512;
        static double[] kertyma;
        static Jako kertymanJako;

        /// <summary>Koneen nopeus (suhteellinen) hetkellä t: syöksyssä ja sivukyljessä lähes paikallaan, kiihdytys loittonuksessa, tasainen, hidastus kierrosta perille.</summary>
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
                double summa = 0;
                for (int i = 1; i <= Naytteita; i++)
                {
                    double t0 = (i - 1) / (double)Naytteita, t1 = i / (double)Naytteita;
                    summa += 0.5 * (Nopeus(t0, j) + Nopeus(t1, j)) / Naytteita;
                    k[i] = summa;
                }
                for (int i = 1; i <= Naytteita; i++) k[i] /= summa;
                kertyma = k;
                kertymanJako = j;
            }
            double x = Rajaa(t, 0, 1) * Naytteita;
            int jj = Math.Min(Naytteita - 1, (int)x);
            return Lerp(k[jj], k[jj + 1], x - jj);
        }

        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        static double Lerp(double a, double b, double t) => a + (b - a) * t;
        static double Kiedo(double a) => ((a % 360.0) + 360.0) % 360.0;
        static double Kiedo180(double a) => ((a % 360.0) + 540.0) % 360.0 - 180.0;
    }
}
