// PARIISIN NYKYINTRO (omistaja 9.10.2026 klo 11.5x PT:n kautta: "nopea intro nykyajan tunnelmista Pariisissa ja sitten
// laskeuduttaisiin isoisän maailmaan"; kuvakäsikirjoitus docs/kohtaukset/pallokierros/pariisi-nykyintro.md; PT:n päätökset:
// pituus 31 s, Codex-kuvat C1–C5, nyt-rivi nousun kohdalla, 1. kyydin opastus Notre-Damen jälkeen). Puhdas aikajana: otokset
// datana ja tila hetkellä t (t = nopean kappaleen kohta, Aanisoitin.KaupunkiIntroAlkoi). Leikkaukset tahdin ensimmäiselle
// iskulle (124 bpm, 2 tahtia ≈ 3,87 s); Codex-kuvissa hidas Ken Burns (LatausLiike.Rajaus, zoomi ≤ 5 %). C5 (sama näkymä
// 1870-luvun valokuvana) ristihäivytetään 3D-avausnäkymän päälle; ilman C5:tä kova leikkaus 3D:hen 31,0 s:ssa ja isoisän avaus
// 31,5 s:ssa. Ohitus hyppää kohtaukseen 7 (siirtymä vanhaan). Unity-osa: OpasSovitin.Intro.cs.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public enum IntroLaji { Avausnakyma, Eiffel, Kuva }

    /// <summary>Yksi otos (kohtauslistan rivi): aika kappaleen alusta, laji, Codex-kuva 1–5 (0 = ei kuvaa) ja Ken Burns.</summary>
    public sealed class IntroOtos
    {
        public int Nro;
        public double AlkuS, LoppuS;
        public IntroLaji Laji;
        public int Kuva;
        public LatausLiike.Rajaus KbAlku, KbLoppu;
    }

    /// <summary>Intron tila hetkellä t: näkyvä kerros, kuvan peitto 3D:n päällä (0–1) ja Ken Burns -rajaus.</summary>
    public struct IntroTila
    {
        public int Otos;
        public IntroLaji Laji;
        /// <summary>Codex-kuva (1–5) 3D:n päällä alfalla Alfa; 0 = vain 3D.</summary>
        public int Kuva;
        public double Alfa;
        public LatausLiike.Rajaus Rajaus;
        /// <summary>Intro ohi: 3D-avausnäkymä, kuvakerros pois.</summary>
        public bool Ohi;
    }

    public static class KaupunkiIntro
    {
        public const string Kaupunki = "pariisi";
        /// <summary>Vain Pariisi (omistaja: muut kaupungit täsmälleen kuten ennen).</summary>
        public static bool OnIntro(string kaupunkiId) => string.Equals(kaupunkiId, Kaupunki, StringComparison.OrdinalIgnoreCase);

        /// <summary>"Pariisi nyt 2" (Lyria, musa-kaupunki-pariisi-nopea-lyria-v2): 124 bpm, tahti 4 iskua.</summary>
        public const double Bpm = 124, IskuS = 60.0 / Bpm, TahtiS = 4 * IskuS;
        public static double Tahti(int n) => n * TahtiS;

        /// <summary>Nousu (täysi groove) tahdin 9 alussa = 15,48 s; nyt-rivi samalla iskulla (NytRivi.Nayta).</summary>
        public static readonly double NousuS = Tahti(8), NytRiviS = Tahti(8);
        /// <summary>Kohtaus 7 (siirtymä vanhaan) tahdin 17 alussa = 30,97 s; ohitus hyppää tähän.</summary>
        public static readonly double SiirtymaS = Tahti(16);
        /// <summary>Musiikki (Aanisoitin.KaupunkiIntro oletukset): nopea katkeaa 31,0 s, häivytys 2 s, hidas 32,0 s.</summary>
        public const float MusiikinKatkoS = 31f, MusiikinHaivytysS = 2f, HidasAlkaaS = 32f;
        /// <summary>Kohtaus 7–9: C5 ristihäivytyksellä 3D:n päälle 31,5–33,0, täysi 33,0–36,0, häivytys takaisin 3D:hen 36,0–38,0.</summary>
        public const double C5AlkaaS = 31.5, C5TaysiS = 33.0, PaluuAlkaaS = 36.0, PaluuLoppuS = 38.0;
        /// <summary>Isoisän avaus (SoitaJaOdota "avaus") C5:n kanssa 33,5 s; ilman C5:tä kovan leikkauksen jälkeen 31,5 s.</summary>
        public const double AvausS = 33.5, AvausIlmanC5S = 31.5;
        /// <summary>Avauksen arvioitu kesto (Pariisin avaus 18,8 s) kierron mitoitukseen ennen kuin klippi on ladattu.</summary>
        public const double AvausArvioS = 18.8;
        /// <summary>Kuinka kauan musiikin alkua odotetaan (KaupunkiIntroAlkoi); ei tullut → intro ohitetaan kokonaan.</summary>
        public const double MusiikkiOdotusS = 5;

        public static double AvausAlkaa(bool c5) => c5 ? AvausS : AvausIlmanC5S;
        /// <summary>Pallon kori pois nykyajan otoksista (kuva-arkki 9.10.: kori ja köydet näkyivät avausnäkymässä ja Eiffel-otoksessa);
        /// palaa, kun C5 peittää ruudun (paluun alku 36,0 s), ilman C5:tä kovan leikkauksen kohdalla: isoisän maailmaan palataan pallossa.</summary>
        public static double KoriPalaa(bool c5) => c5 ? PaluuAlkaaS : SiirtymaS;
        /// <summary>Intron kuvakerros loppuu (C5:n kanssa paluun loppu, ilman sitä kohtauksen 7 alku).</summary>
        public static double Loppu(bool c5) => c5 ? PaluuLoppuS : SiirtymaS;
        /// <summary>Napautus intron aikana: hyppy kohtaukseen 7 (ei suoraan kierrokseen); siirtymässä jo → ennallaan.</summary>
        public static double Ohita(double t) => t < SiirtymaS ? SiirtymaS : t;

        /// <summary>Codex-kuvat ämpärissä (2048 × 1536, havainnekuvat); C5 tulee samaan kansioon.</summary>
        public const string KuvaJuuri = "https://media.matkakirja.app/julisteet/pariisi-nykyintro/20261009/pariisi-nykyintro-c";
        public const int Kuvia = 5;
        public static string KuvaUrl(int nro) => KuvaJuuri + nro + ".jpg";

        /// <summary>Ken Burns enintään (omistaja/PT: 3–5 %; C4 ≤ 5 %).</summary>
        public const double KbMaks = 1.05;
        static LatausLiike.Rajaus R(double s, double x, double y) => new LatausLiike.Rajaus { Skaala = s, AnkkuriX = x, AnkkuriY = y };

        /// <summary>Kohtauslista (taulukko kohdasta 2). Kohtaukset 7–9 riippuvat C5:stä (Tila).</summary>
        public static readonly IReadOnlyList<IntroOtos> Otokset = new[]
        {
            new IntroOtos { Nro = 1, AlkuS = 0, LoppuS = Tahti(4), Laji = IntroLaji.Avausnakyma },
            // C1 Seinen rantakatu: Ken Burns sisään (keskeltä).
            new IntroOtos { Nro = 2, AlkuS = Tahti(4), LoppuS = Tahti(8), Laji = IntroLaji.Kuva, Kuva = 1, KbAlku = R(1, 0.5, 0.5), KbLoppu = R(1.04, 0.5, 0.55) },
            new IntroOtos { Nro = 3, AlkuS = Tahti(8), LoppuS = Tahti(10), Laji = IntroLaji.Eiffel },
            // C2 bistron terassi: Ken Burns sivulle (4 %:n ylimeno vasemmalta oikealle).
            new IntroOtos { Nro = 4, AlkuS = Tahti(10), LoppuS = Tahti(12), Laji = IntroLaji.Kuva, Kuva = 2, KbAlku = R(1.04, 0, 0.5), KbLoppu = R(1.04, 1, 0.5) },
            // C3 Champs-Élysées: sisään akselia pitkin (Riemukaari kuvan keskellä).
            new IntroOtos { Nro = 5, AlkuS = Tahti(12), LoppuS = Tahti(14), Laji = IntroLaji.Kuva, Kuva = 3, KbAlku = R(1, 0.5, 0.5), KbLoppu = R(1.05, 0.5, 0.45) },
            // C4 Guimardin metro: ulos (≤ 5 %).
            new IntroOtos { Nro = 6, AlkuS = Tahti(14), LoppuS = SiirtymaS, Laji = IntroLaji.Kuva, Kuva = 4, KbAlku = R(1.05, 0.5, 0.5), KbLoppu = R(1, 0.5, 0.5) },
            // C5 vanha valokuva: paikallaan häivytyksen ajan (päällekkäin 3D:n kanssa), sitten hitaasti sisään kohti Cité-saarta.
            new IntroOtos { Nro = 7, AlkuS = SiirtymaS, LoppuS = C5TaysiS, Laji = IntroLaji.Kuva, Kuva = 5, KbAlku = R(1, 0.5, 0.5), KbLoppu = R(1, 0.5, 0.5) },
            new IntroOtos { Nro = 8, AlkuS = C5TaysiS, LoppuS = PaluuAlkaaS, Laji = IntroLaji.Kuva, Kuva = 5, KbAlku = R(1, 0.5, 0.5), KbLoppu = R(1.03, 0.5, 0.55) },
            new IntroOtos { Nro = 9, AlkuS = PaluuAlkaaS, LoppuS = PaluuLoppuS, Laji = IntroLaji.Kuva, Kuva = 5, KbAlku = R(1.03, 0.5, 0.55), KbLoppu = R(1.04, 0.5, 0.56) },
        };

        /// <summary>
        /// SAAPUMISESITYKSEN JATKO (omistaja 10.10.2026 klo 17.3x, sitova: "Pariisin esittely ei pitäisi liittyä kuumailmapalloon
        /// mitenkään, vaan se pitää tulla kun pelaaja saapuu kaupunkiin ja korvaa tai jatkaa sitä nykyistä kolmen kuvan esittelyä"):
        /// Codex-kuvat C1–C5 saapumisesityksen kuvapakkaan kukin ensimmäisen otoksensa alussa (aika musiikin alusta, tahdin iskulla).
        /// 3D-otokset (avausnäkymä, Eiffel) jäävät pois: niiden ajan pakassa näkyy edellinen kuva.
        /// </summary>
        public static IReadOnlyList<(int Kuva, double AlkuS)> Kuvasarja()
        {
            var l = new List<(int, double)>();
            foreach (var o in Otokset)
                if (o.Laji == IntroLaji.Kuva && o.Kuva > 0 && !l.Exists(x => x.Item1 == o.Kuva)) l.Add((o.Kuva, o.AlkuS));
            return l;
        }

        /// <summary>Kuvasarjan loppu (s musiikin alusta): C5 näkyy täysin, sitten pakka hiljenee kuten luennan jälkeen.</summary>
        public const double KuvasarjaLoppuS = PaluuAlkaaS;

        /// <summary>
        /// SAAPUMISEN KUVASARJA (omistaja KIIRE TF 180, juna 181: "lisäkuvat tulevat putkeen niiden kolmen aloituskuvan jälkeen"):
        /// nopea kappale alkaa isoisän saapumispuheen kanssa (Saapumistraileri), joten esittely alkaa vasta trailerin kolmen kuvan
        /// jälkeen noin 8,3–9 s kappaleen alusta. C1 tulee heti esittelyn alussa (aika 0 = jo ohi), C2–C4 kolmen tahdin välein
        /// (5,8 s) ja C5 entisellään siirtymän iskulla (Tahti(16), musiikin katko 31,0 s ennallaan): pallointron 3D-otosten
        /// 11,6 s:n aukkoa C1:n ja C2:n välissä ei jää. Kaikki ajat tahdin iskulla.
        /// </summary>
        public static readonly double[] SaapumisAjatS = { 0, Tahti(7), Tahti(10), Tahti(13), Tahti(16) };

        public static IReadOnlyList<(int Kuva, double AlkuS)> SaapumisKuvasarja()
        {
            var l = new List<(int, double)>();
            for (int i = 0; i < SaapumisAjatS.Length; i++) l.Add((i + 1, SaapumisAjatS[i]));
            return l;
        }

        /// <summary>Kappaleen kohta, jota pienempi tarkoittaa, että esittely käynnisti kappaleen itse (muuten se soi jo).</summary>
        public const double MusiikkiAlussaS = 2;

        /// <summary>
        /// Esittelyn kello kappaleen kohdasta (true) vai esittelyn alusta (false). tahdistettu = nopea alkoi trailerin puheen kanssa
        /// (AaniTila.EsitysKaupunki): kello on aina kappaleen kohta, kunhan siirtymä (C5) ei ole jo ohi. Muuten kuten ennen: vain
        /// juuri alkanut kappale tahdistaa (iPad-simu 17.4x: jo pitkään soinut kappale toi kaikki kuvat kerralla).
        /// </summary>
        public static bool KelloKappaleesta(double kohta, bool tahdistettu) =>
            !double.IsNaN(kohta) && kohta >= 0 && kohta < (tahdistettu ? SiirtymaS : MusiikkiAlussaS);

        public static IntroOtos Otos(double t)
        {
            foreach (var o in Otokset) if (t >= o.AlkuS && t < o.LoppuS) return o;
            return null;
        }

        static LatausLiike.Rajaus Valissa(LatausLiike.Rajaus a, LatausLiike.Rajaus b, double u) =>
            R(a.Skaala + (b.Skaala - a.Skaala) * u, a.AnkkuriX + (b.AnkkuriX - a.AnkkuriX) * u, a.AnkkuriY + (b.AnkkuriY - a.AnkkuriY) * u);

        /// <summary>
        /// Tila hetkellä t. kuvaValmis(n): Codex-kuva n on ladattu (puuttuva → otos näytetään 3D-avausnäkymänä); c5: C5 on mukana
        /// (lukitaan kohtauksen 7 alussa). Ken Burns kulkee tasaisesti (lineaarinen, ei nykäystä leikkauksessa: kova leikkaus).
        /// </summary>
        public static IntroTila Tila(double t, Func<int, bool> kuvaValmis, bool c5)
        {
            var tila = new IntroTila { Laji = IntroLaji.Avausnakyma, Rajaus = R(1, 0.5, 0.5) };
            if (double.IsNaN(t)) t = 0;
            if (t >= Loppu(c5)) { tila.Ohi = true; tila.Otos = c5 ? 10 : 7; return tila; }
            var o = Otos(Math.Max(0, t)) ?? Otokset[0];
            tila.Otos = o.Nro;
            if (o.Laji == IntroLaji.Eiffel) { tila.Laji = IntroLaji.Eiffel; return tila; }
            if (o.Laji != IntroLaji.Kuva || (o.Kuva == 5 && !c5) || kuvaValmis == null || !kuvaValmis(o.Kuva)) return tila;
            double u = Math.Max(0, Math.Min(1, (t - o.AlkuS) / Math.Max(1e-6, o.LoppuS - o.AlkuS)));
            tila.Kuva = o.Kuva;
            tila.Rajaus = Valissa(o.KbAlku, o.KbLoppu, u);
            tila.Alfa = 1;
            if (o.Nro == 7)
            {
                // 3D-avausnäkymä 30,97–31,5 s, sitten ristihäivytys 1,5 s kuvaan C5 (taustalla kierto jatkuu).
                double h = (t - C5AlkaaS) / (C5TaysiS - C5AlkaaS);
                tila.Alfa = KierrosLento.Smootherstep(Math.Max(0, Math.Min(1, h)));
            }
            else if (o.Nro == 9) tila.Alfa = 1 - KierrosLento.Smootherstep(u);
            tila.Laji = tila.Alfa > 0 ? IntroLaji.Kuva : IntroLaji.Avausnakyma;
            if (tila.Alfa <= 0) tila.Kuva = 0;
            return tila;
        }

        // --- Eiffel-otos (kohtaus 3): kiinteä kamera Trocadéron puolelta, nopea sivuliuku tornin ohi ----------------------------
        /// <summary>Eiffel-tornin juuri (OpasSovitin.OnEiffel).</summary>
        public const double EiffelLat = 48.858296, EiffelLon = 2.294479;
        /// <summary>
        /// Katse tornin keskikorkeudelle (maasta), etäisyys ja kallistus: torni (330 m) mahtuu ~40°:n pystykenttään (Aloitusnäkymän
        /// oletus) vain ~500 m:stä, joten PT:n "noin 300 m" on venytetty Trocadéron esplanadin etäisyyteen; matala, lähes vaakasuora
        /// katse. Suuntima Trocadérosta torniin 134° (kaakkoon); liuku 122° → 146° pehmeällä alulla ja lopulla. Säätö kuva-arkista.
        /// </summary>
        public const double EiffelKatseM = 170, EiffelEtaisyysM = 500, EiffelKallistus = 88, EiffelSuuntimaAlku = 122, EiffelSuuntimaLoppu = 146;
        /// <summary>Maan korkeus ellipsoidista tornin juurella, jos omaa korkeusmallia ei ole (34 m merenpinnasta + geoidi ~45 m).</summary>
        public const double EiffelMaaArvioM = 79;

        /// <summary>Eiffel-otoksen kamera osuudella u (0–1) otoksesta; maaM = maa ellipsoidista (NaN → arvio).</summary>
        public static Kuvakulma EiffelKulma(double u, double maaM)
        {
            if (double.IsNaN(maaM)) maaM = EiffelMaaArvioM;
            double p = KierrosLento.Smootherstep(Math.Max(0, Math.Min(1, double.IsNaN(u) ? 0 : u)));
            return new Kuvakulma(EiffelLat, EiffelLon, EiffelEtaisyysM, EiffelKallistus,
                EiffelSuuntimaAlku + (EiffelSuuntimaLoppu - EiffelSuuntimaAlku) * p, maaM + EiffelKatseM);
        }

        /// <summary>Eiffel-otoksen osuus hetkellä t (0 ennen, 1 jälkeen).</summary>
        public static double EiffelOsuus(double t)
        {
            var o = Otokset[2];
            return Math.Max(0, Math.Min(1, (t - o.AlkuS) / (o.LoppuS - o.AlkuS)));
        }

        /// <summary>Eiffelin laattojen esilataus (reittikameran ehdoin: näytetään saman minuutin sisällä) otoksen loppuun asti.</summary>
        public static bool EiffelEsilataus(double t) => t < Otokset[2].LoppuS;

        // =====================================================================================================================
        // ALOITUSINTRO (omistaja 11.10. 11.5x PT:n kautta, juna 182; lisävaatimukset 12.1x): aloituskaupungit Ateena, Pariisi ja
        // Tukholma. Saavuttaessa 18 s:n intro: William sanoo kaupungin nimen ja iskulauseen, kaupungin nopea kappale alkaa samassa
        // ruudussa, kuusi lähes koko ruudun kuvaa 3 s välein (sama esityspohja kuin Pariisin C1–C5: Natiivi Introesitys), Ohita aina.
        // Intron jälkeen kartta, sitten Paattyi (NUI:n Pulu ensimmäisellä kerralla → PuluValmis → isoisän luenta; muuten luenta
        // alkaa ~1 s kuluttua ilman Pulua). Ateena ja Tukholma: joka saapumisella (12.1x "intro joka kerta"); Pariisi: vain alkulennon
        // ensisaapumisella (muilla käynneillä nykyinen C1–C5-esitys isoilla kuvilla). Kuvia ei sidota iskuihin (Ateenan ja
        // Tukholman tempoa ei ole mitattu). Unity-osa: PeliOhjain (PaataTraileri, Perilla), UI/Pulu/AloitusintroNakyma.cs.
        // =====================================================================================================================

        /// <summary>Yhden aloitusintron data: Williamin repliikki (kesto mitattu), nopea kappale ja saako intro tulla muulloin kuin alkulennolla.</summary>
        public sealed class Aloitus
        {
            public string Kaupunki, WilliamUrl, MusiikkiUrl;
            public double WilliamS, MusiikkiS;
            /// <summary>Vain alkulennon ensisaapumisella (Pariisi: muilla käynneillä nykyinen saapumisesitys C1–C5).</summary>
            public bool VainAlkulennolla;
        }

        public const string WilliamJuuri = "https://media.matkakirja.app/aanet/kaupunki-intro-v1/william-";
        public const string MusiikkiJuuri = "https://media.matkakirja.app/audio/musa-kaupunki-";

        static Aloitus A(string k, double williamS, double musiikkiS, bool vainAlkulennolla) => new Aloitus
        {
            Kaupunki = k, WilliamUrl = WilliamJuuri + k + ".mp3", WilliamS = williamS,
            MusiikkiUrl = MusiikkiJuuri + k + "-nopea-lyria-v2.mp3", MusiikkiS = musiikkiS, VainAlkulennolla = vainAlkulennolla,
        };

        /// <summary>Aloitusintrojen taulukko (kaupunki → William, nopea). Pariisin nopea on sama kuin nykyisen esityksen (KaupunkiJakso).</summary>
        public static readonly IReadOnlyDictionary<string, Aloitus> Aloitukset = new Dictionary<string, Aloitus>(StringComparer.OrdinalIgnoreCase)
        {
            ["ateena"] = A("ateena", 3.25, 90.1, false),
            ["pariisi"] = A("pariisi", 3.82, double.NaN, true),
            ["tukholma"] = A("tukholma", 3.49, 95.5, false),
        };

        /// <summary>Kaupungin aloitusintro tai null.</summary>
        public static Aloitus AloitusintroData(string kaupunki) =>
            kaupunki != null && Aloitukset.TryGetValue(kaupunki, out var a) ? a : null;

        /// <summary>Saako tämä saapuminen aloitusintron (alkulento = alkulennon ensisaapuminen).</summary>
        public static bool AloitusintroSaa(string kaupunki, bool alkulento)
        {
            var a = AloitusintroData(kaupunki);
            return a != null && (alkulento || !a.VainAlkulennolla);
        }

        /// <summary>Ajoitus: kuusi kuvaa 3 s välein = 18 s.</summary>
        public const int AloitusKuvia = 6;
        public const double AloitusKuvaS = 3, AloitusKestoS = AloitusKuvia * AloitusKuvaS;
        /// <summary>Kaupungin nimi ja iskulause näkyvät Williamin puheen ja kahden ensimmäisen kuvan ajan, sitten kirjaimet ulos.</summary>
        public const double AloitusNimiPoisS = 2 * AloitusKuvaS;
        /// <summary>Kuinka kauan intro odottaa esiladattua musiikkia ennen kuin se alkaa ilman (kuten saapumistraileri, 1 s).</summary>
        public const double AloitusMusiikkiOdotusS = 1;
        /// <summary>Musiikin jatko (kuten Pariisin esittelyssä, Aanisoitin.KaupunkiIntro): nopea katkeaa intron lopussa 2 s:n
        /// häivytyksellä ja kaupungin tavallinen kappale (jakson hidas = oma raita) alkaa 1 s myöhemmin. Ohita tekee saman heti.</summary>
        public const float AloitusKatkoS = 18f, AloitusHaivytysS = 2f, AloitusHidasS = 19f;
        /// <summary>Isoisän luenta Paattyi-hetkestä, kun Pulua ei tule (12.1x "noin 1 s viiveellä").</summary>
        public const float AloitusLuentaViiveS = 1f;

        /// <summary>Kuvan indeksi (0–5) hetkellä t intron alusta; -1 ennen alkua ja lopun jälkeen.</summary>
        public static int AloitusKuva(double t) =>
            double.IsNaN(t) || t < 0 || t >= AloitusKestoS ? -1 : Math.Min(AloitusKuvia - 1, (int)Math.Floor(t / AloitusKuvaS));

        /// <summary>Kuvan n (0–5) alkuhetki intron alusta.</summary>
        public static double AloitusKuvaAlkaa(int n) => n * AloitusKuvaS;

        /// <summary>
        /// Kuusi kuvaa: avauskuvat järjestyksessä, vajaus täytetään lisäkuvilla (kansikuvat), samat (avain) vain kerran; jos yhteensä
        /// on alle kuuden, sarja kiertää alusta (kuva vaihtuu silti 3 s välein). Tyhjä = ei kuvia.
        /// </summary>
        public static List<T> AloitusKuvat<T>(IEnumerable<T> avaus, IEnumerable<T> lisa, Func<T, string> avain)
        {
            var l = new List<T>();
            var nahty = new HashSet<string>();
            foreach (var lahde in new[] { avaus, lisa })
            {
                if (lahde == null) continue;
                foreach (var x in lahde)
                {
                    if (l.Count >= AloitusKuvia) break;
                    var a = x == null ? null : avain(x);
                    if (string.IsNullOrEmpty(a) || !nahty.Add(a)) continue;
                    l.Add(x);
                }
            }
            int erilaisia = l.Count;
            for (int i = 0; erilaisia > 0 && l.Count < AloitusKuvia; i++) l.Add(l[i % erilaisia]);
            return l;
        }

        // --- tila ja NUI:n rajapinta (sovittu 11.10.; NUI tilaa heijastuksella: nimet pysyvät) ----------------------------------

        /// <summary>Intro päättyi (kaupunki, ohitettu): kerran per intro, kun 18 s on täynnä tai Ohita painettiin; kartta on jo näkyvissä.</summary>
        public static event Action<string, bool> Paattyi;

        /// <summary>Unity-kerros kytkee (PeliOhjain): PuluValmis → PeliOhjain.AloitaLykattyLuenta (Ydin ei näe PeliOhjainta).</summary>
        public static Action<string> LykattyLuentaKoukku;

        static string tuleva, saapuminen, puluOdottaa;

        /// <summary>Tosi intron kaupungille saapumisesta (alkulennolla AloituslentoPaattyi-hetkestä) Paattyi-eventtiin asti.</summary>
        public static bool TuleeAloitusintro(string kaupunki) => kaupunki != null && string.Equals(tuleva, kaupunki, StringComparison.OrdinalIgnoreCase);

        /// <summary>Tämä käynti alkoi aloitusintrolla (seuraavaan saapumiseen asti): Pariisin C1–C5-esitys ja luennan korvaus eivät koske sitä.</summary>
        public static bool AloitusSaapumisella(string kaupunki) => kaupunki != null && string.Equals(saapuminen, kaupunki, StringComparison.OrdinalIgnoreCase);

        /// <summary>Saapuminen (PeliOhjain): intro = tuleeko aloitusintro. Muu saapuminen nollaa edellisen käynnin tilan.</summary>
        public static void Saapuu(string kaupunki, bool intro)
        {
            tuleva = intro ? kaupunki : null;
            saapuminen = intro ? kaupunki : null;
            puluOdottaa = null;
        }

        /// <summary>Intro loppui (kartta jo näkyvissä): Paattyi kerran. false = tälle kaupungille ei ollut introa tulossa (ei eventtiä).</summary>
        public static bool Paata(string kaupunki, bool ohitettu)
        {
            if (!TuleeAloitusintro(kaupunki)) return false;
            tuleva = null;
            puluOdottaa = kaupunki;
            Paattyi?.Invoke(kaupunki, ohitettu);
            return true;
        }

        /// <summary>NUI: Pulun jakso on ohi → isoisän lykätty luenta (kerran per intro; toinen kutsu ei tee mitään).</summary>
        public static void PuluValmis(string kaupunki)
        {
            if (kaupunki == null || !string.Equals(puluOdottaa, kaupunki, StringComparison.OrdinalIgnoreCase)) return;
            puluOdottaa = null;
            LykattyLuentaKoukku?.Invoke(kaupunki);
        }

        /// <summary>Uusi matka tai aloitusnäkymä: tila pois (Paattyi ei laukea vanhalle introlle).</summary>
        public static void Nollaa()
        {
            tuleva = saapuminen = puluOdottaa = null;
        }
    }
}
