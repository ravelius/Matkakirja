using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON RATA v3e (omistajan palaute v3d-videoon 28.9.2026 klo 09.2x Fablen kautta, sanatarkasti: "Ensimmäinen
    /// lähestymislento kameralla kohti lentokonetta pitää tehdä niin, että se on yksi jouheva kiihdytys aloitusnäkymästä
    /// lentokoneeseen niin, että kameran liike kiihtyy enemmän kuminauhamaisesti eikä niin hyppäämällä, kuin nyt tapahtuu. Ja sen
    /// jälkeen, kun lähdetään taas erkanemaan kameralla lentokoneesta, niin liike saisi olla yhtenäinen ja samalla lailla
    /// kiihdytyskuminauhamainen. Lentoreitti voisi olla takaisin suoraan Ateenan yläpuolelle ja kamera suoraan ylhäältä alas, mutta
    /// tee kiihdytys ja lentoreitti hieman S-kurvin mukaisesti kumpikin"; tarkennus: "kun kamera lähtee erkanemaan lentokoneesta,
    /// se voisi ensin pakittaa vain taaksepäin, mutta ei muuttaisi korkeutta ... korkeus kyllä muuttuu, mutta todella todella
    /// vähän, ja sitten se korkeudenmuutos alkaa kiihtymään, ja loppupisteessä se taas alkaa myös hidastumaan, mutta ei lopu
    /// myöskään missään kohdassa. Eli tällä tavalla S-kurvi myös korkeuteen. Ja kamera voisi mennä vielä asteen lähemmäs
    /// lentokonetta siinä kohdassa, kun se käy lähellä."). Lontoo → aloituskaupunki yhtenä 15 s:n otoksena napautetusta
    /// pallonäkymästä pelin saapumisnäkymään. Voimassa olevat omistajan säännöt (v2–v3d):
    ///   1. Kone näkyy KOKO AJAN (pienenä tai isona) eikä sitä näytetä koskaan takaa (edestä, sivulta tai ylhäältä).
    ///   2. Alku täsmälleen napautusnäkymästä (korkealta, suoraan alas) ja kone lipuu ohituksessa VASEMMALTA OIKEALLE läheltä.
    ///   3. Kaukaa kone on pieni; lasku kuvataan kaukaa ja ylhäältä (v3d: "nyt näyttää kun joku pommi iskisi").
    ///   4. Kohteen 3D-maamerkki ei näy lennolla (Nappula); viiva ja lähtöpiste näkyvät alussa.
    ///
    /// AIKAJANA v3e2 (s): 0–7,2 LÄHESTYMINEN yhtenä S-käyränä (Beta-ydin, nopeus ∝ τ²(1−τ): kiihtyy pehmeästi levosta, huippu
    /// ~5 s, hidastuu koneeseen) napautusnäkymästä (~7 600 km, suoraan alas) koneeseen <see cref="OhitusEtaisyysM"/>:iin; KAIKKI
    /// kanavat (etäisyys, kallistus, suunta, koneen ruutupaikka, katseen korkeus) etenevät saman edistymän p(t) funktioina, joten
    /// mikään ei pysähdy välillä (v3d: avaus 0–4 s ja kiri 4–6,5 s olivat erilliset liikkeet ja kiri syöksyi 4 500 → 30 km 2 s:ssa
    /// = "hyppäys"). Kuminauha: kone karkaa ensin ruudulla oikealle alas ja kamera kiihtyy kiinni (<see cref="KuminauhaX"/>).
    /// · 6,3–8,1 OHITUS: kone liukuu vasemmalta oikealle, lähin kohta 7,2 s ~20 km:stä (kone ~58 % leveydestä; v3d 23,5 km, 49 %),
    /// reitillä <see cref="OhitusJaljellaM"/> ennen kohdetta (Ateena: Thessalia) · 7,2–15 ERKANEMINEN: silmän korkeus on S-käyrä
    /// log-asteikolla (<see cref="NousuA"/>, <see cref="NousuB"/>: nopeus ∝ τ⁴(1−τ)²), joten ensin kamera PAKITTAA lähes samalla
    /// korkeudella (8,1 → 9,4 km 2,2 s:ssa, kone loittonee kohti horisonttia), sitten nousu kiihtyy (huippu 12,5 s) ja hidastuu
    /// saapumisnäkymään pysähtymättä ennen loppua. Koneen alakulma kulkee korkeuden mukana (ln sin ε ∝ (1 − A)^1,8), joten koneen
    /// etäisyys kasvaa koko erkanemisen ajan yhtenä liikkeenä (pakitus luovuttaa nousulle) ja kamera kääntyy suoraan alas kohteen
    /// ylle. v3e2: silmän sivumatka koneesta enintään ~110 km ja kapenee ennen kosketusta (<see cref="SivuEnintaanM"/>), joten
    /// silmä kaartaa loivasti koneen oikealta puolelta kohteen ylle (v3e: koukku ~270 km kohteen eteläpuolelta) · kosketus
    /// <see cref="KosketusS"/> nähdään suoraan ylhäältä (kallistus ~2°) ~1 150 km:stä, kone ruudulla ~1,6 % · 15 s saapumisnäkymä.
    /// Vanat ja loppukohtauksen linnut: AloituslennonIlma.
    ///
    /// TOTEUTUS: kamera suunnitellaan koneen RUUTUPAIKKANA: joka näytteessä (240 Hz) katsepiste ratkaistaan Newtonilla niin, että
    /// kone osuu kanavan ruutupaikkaan, joten kone pysyy kuvassa rakenteellisesti. Lähestymisessä pääkanava on log-etäisyys
    /// katsepisteeseen, erkanemisessa silmän korkeus (etäisyys johdetaan korkeudesta ja kallistuksesta pallolla). Alku on
    /// täsmälleen napautusnäkymä ja loppu täsmälleen saapumisnäkymä (kanavat päättyvät siihen). Kone etenee omalla
    /// nopeusprofiilillaan (matkanopeus ∝ kameran etäisyys, ohituksessa 5 km/s), joka ratkaistaan niin, että ohitus osuu
    /// ohituskohtaan ja pysähdys perille.
    /// KONEEN KOKO (v3): maailmassa vakio 5 km, ruudulla vähintään <see cref="KokoVahintaan"/> (laskussa <see cref="KokoLaskussa"/>).
    /// USVA (v3): radan ajan horisonttiusvan raja on vähintään <see cref="UsvaVahintaanM"/> katsepisteestä (Aurinko.UsvaVahintaanM).
    /// Puhdas laskenta ilman UnityEngineä (Kartta-testit/AloituslennonRataTestit mittaa koneen näkyvyyden joka näytteessä).
    /// </summary>
    public sealed class AloituslennonRata
    {
        // ---- Aikajana (s) ----
        /// <summary>Kesto, avauksen loppu (Lontoo kuvassa), ohituksen liu'un alku (kiri), lähin kohta (ohitus), liu'un loppu,
        /// saapumisen alku (kamera kohteen yllä nousemassa), kosketus ja pysähdys.</summary>
        public const double KestoS = 15.0, AvausS = 2.0, OhitusS = 7.2, OhitusPuoliS = 0.9, KiriS = OhitusS - OhitusPuoliS,
            OhitusLoppuS = OhitusS + OhitusPuoliS, SaapuminenS = 12.6, KosketusS = 13.8, PysahdysS = 14.4;
        /// <summary>Pakitus ohituksen jälkeen (s): kallistus ja koneen ruutupaikka kohti horisonttia, korkeus lähes ennallaan.</summary>
        public const double PakitusS = 3.2;
        /// <summary>Lähin kohta (v3e, omistaja: "asteen lähemmäs"; v3d 23,5 km): etäisyys katsepisteeseen (= koneeseen) ja kallistus.</summary>
        public const double OhitusEtaisyysM = 19_000.0, OhitusKallistus = 76.0;
        /// <summary>Koneen alakulma pakituksen lopussa (°): kamera katsoo konetta loivasti, kone kohti horisonttia.</summary>
        public const double PakitusKulma = 7.0;
        /// <summary>Alakulman nousu korkeuden mukana: ln sin ε = ln sin ε_pakitus · (1 − A)^tämä (1 = tasainen, 2 = kamera kääntyy
        /// alas jo nousun alkupuolella; koneen etäisyys kasvaa silti koko ajan, kun tämä on alle 2,8).</summary>
        public const double AlakulmaEksponentti = 1.8;
        /// <summary>
        /// SILMÄN SIVUMATKA (v3e2, omistaja 28.9.: "Lentoreitti voisi olla takaisin suoraan Ateenan yläpuolelle ja kamera suoraan
        /// ylhäältä alas, mutta tee kiihdytys ja lentoreitti hieman S-kurvin mukaisesti"): silmän vaakaetäisyys koneesta on
        /// erkanemisessa enintään <see cref="SivuEnintaanM"/> (pehmeä minimi alakulman antamaan), ja raja kapenee
        /// <see cref="SivuLoppuM"/>:iin välillä <see cref="SivuKapeneeS"/>–<see cref="SivuKapeaS"/>, joten kamera kääntyy alas nousun
        /// mukana ja katsoo kosketusta suoraan ylhäältä. v3e:ssä alakulma jäi nousussa loivaksi, ja silmä kävi ~270 km kohteen
        /// eteläpuolella ja kaartoi takaisin sen ylle (koukku).
        /// </summary>
        public const double SivuEnintaanM = 110_000.0, SivuLoppuM = 15_000.0, SivuKapeneeS = 12.3, SivuKapeaS = 13.6;
        /// <summary>Suunnan kääntö saapumisnäkymään alkaa nousun edistymästä A = tämä (kamera on jo jyrkästi koneen yllä, joten
        /// kääntö kiertää karttaa eikä vie silmää sivuun; v3e: kääntö S(A):lla koko nousun ajan).</summary>
        public const double KaantoAlkaa = 0.30;
        /// <summary>Lähestymisen ja nousun S-käyrät Beta-ytiminä (nopeus ∝ τ^(a−1)(1−τ)^(b−1)).</summary>
        public const double LahestyminenA = 3.0, LahestyminenB = 2.0, NousuA = 5.0, NousuB = 3.0, PakitusA = 2.0, PakitusB = 2.2;
        /// <summary>Koneen ruutupaikka: ennen liukua (vasen), liu'un jälkeen (oikea), pakituksen jälkeen (x kohti keskeä, y ylös
        /// kohti horisonttia: kone loittonee).</summary>
        public const double LiukuX0 = -0.5, LiukuX1 = 0.35, PakitusX = 0.18, OhitusY = 0.03, PakitusY = 0.2;
        /// <summary>Lähestymisen KUMINAUHA: kone karkaa ensin ruudulla oikealle alas (kamera jää jälkeen), sitten kamera kiihtyy
        /// kiinni (loiva S ruudulla); kupu Kupu(p) = p(1−p)⁴ normitettuna, huippu p = 0,2 (~3 s).</summary>
        public const double KuminauhaX = 0.3, KuminauhaY = 0.15;
        /// <summary>Ohituksen oletuskohta reitillä (osuus) ja koneen nopeus ohituksessa (m/s).</summary>
        public const double OhitusOsuus = 0.5, OhitusNopeus = 5000.0;

        /// <summary>
        /// OHITUS LOPPUMATKALLA MAAN PÄÄLLÄ (v3e): lähin kohta on <see cref="OhitusJaljellaM"/> ennen kohdetta, jotta erkaneminen
        /// (pakitus ja nousu kohteen ylle) ei vaadi koneelta kiitoa (v3d: ohitus reitin puolivälissä, kone kiisi erkanemisessa
        /// 1 270 km ~2 kameran etäisyyttä sekunnissa). Aloituskohteiden ohituskohta reittiosuutena, lähin tavoitetta, jonka ±25 km:n
        /// ikkuna reitillä on maata (v3b: vaalea meri näytti lähikuvassa usvalta): natiivin maapolygonit (Maaraja:
        /// maapolygonit-2026-09-24, Natural Earth 10m + GSHHG), skripti proto-3d/lokit/aloituslento-33/v3e/ohitus_myohaan.py,
        /// lähtö Lontoo 51,507° N 0,128° W. Muut kohteet: <see cref="OhitusSaanto"/>.
        /// </summary>
        public static readonly Dictionary<string, double> OhitusMaalla = new Dictionary<string, double>(StringComparer.Ordinal)
        {
            ["ateena"] = 0.92,         // 39,2° N 22,2° E Thessalia (Othrys), 191 km ennen Ateenaa
            ["istanbul"] = 0.92,       // 42,1° N 27,1° E Bulgaria (Strandža), 200 km
            ["moskova"] = 0.92,        // 55,9° N 34,4° E Smolensk–Tver, 200 km
            ["tanger"] = 0.90,         // 37,4° N 5,4° W Andalusia, 181 km
            ["kairo"] = 0.957,         // 31,1° N 30,3° E Niilin suisto, 151 km (0,92 olisi merta)
        };

        /// <summary>Ohituksen tavoite-etäisyys kohteesta (m).</summary>
        public const double OhitusJaljellaM = 190_000.0;

        /// <summary>Ohituskohta ilman taulua: <see cref="OhitusJaljellaM"/> ennen kohdetta, osuus 0,5–0,93.</summary>
        public static double OhitusSaanto(double reittiM) => reittiM > 0 ? Rajaa(1.0 - OhitusJaljellaM / reittiM, OhitusOsuus, 0.93) : OhitusOsuus;
        // (Kairo: taulussa 0,957, koska 0,92–0,95 on Välimerta.)

        /// <summary>Kohteen ohituskohta (<see cref="OhitusMaalla"/>, muuten <see cref="OhitusSaanto"/>).</summary>
        public static double OhitusKohteelle(string kohdeId, double reittiM = 0) =>
            kohdeId != null && OhitusMaalla.TryGetValue(kohdeId, out var u) ? u : OhitusSaanto(reittiM);

        /// <summary>
        /// KEVYT LAATTAKYSYNTÄ NOPEISSA VAIHEISSA (v3b, laiteajo 28.9.: Cesiumin latausjonossa koko lennon 1 000–1 400 laattaa):
        /// lähestymisen nopein osa valitsee laatat näyttövirheellä <see cref="KarkeaSse"/> (LiikeLaatat.LentoKarkeaSse, pohja 20);
        /// avaus, ohitus ja erkaneminen täydellä tarkkuudella. v3e2: nousu ei enää ole karkea (v3e-laiteajo: 10,8–12,3 s tarkka
        /// lähimaasto ja karkea kauempi maa erottuivat terävänä laattarajana; nyt kamera katsoo nousussa jyrkästi alas).
        /// </summary>
        public const float KarkeaSse = 40f;
        public static bool Karkea(double t) => t >= 2.0 && t < KiriS - 0.4;
        /// <summary>Katseen suunta koneen kulkusuunnasta ohituksessa: −96° = kamera koneen oikealla, kone liikkuu vasemmalta oikealle.</summary>
        public const double OhitusTheta = -96.0;
        /// <summary>Symbolinen koko: siipiväli maailmassa 5 km (ohituksessa ~60 % leveydestä), mutta ruudulla vähintään
        /// KokoVahintaan leveydestä (kaukaa pieni mutta näkyvissä: iPhone ~10 pt, iPad 13 ~26 pt).</summary>
        public const double SiipiLahellaM = 5000.0, KokoVahintaan = 0.025;
        /// <summary>Vähimmäiskoko laskussa (v3d, omistaja 28.9.: "kamera pitää olla selvästi kauempana ja kone pienemmäksi kun
        /// laskeutuminen"): KokoVahintaan → tämä 11,5–12,8 s, ja pysyy perillä.</summary>
        public const double KokoLaskussa = 0.015;

        /// <summary>Koneen vähimmäiskoko ruudun leveydestä hetkellä t.</summary>
        public static double KokoVahintaanHetkella(double t) => KokoVahintaan + (KokoLaskussa - KokoVahintaan) * S((t - 11.5) / 1.3);
        /// <summary>Horisonttiusvan raja vähintään (m katsepisteestä) radan ajan: lähikuvissa maa näkyy usvan läpi.</summary>
        public const double UsvaVahintaanM = 250_000.0;
        public const double MatkaKorkeusM = 3500.0;
        const double R = LennonV3.R;
        const int Hz = 240;
        const int N = (int)(KestoS * Hz);

        /// <summary>Kameran asento PalloKierto.Kuvaa-muodossa: katsepiste, etäisyys (m), kallistus pystystä (°), suuntima (katseen
        /// suunta, °) ja katsepisteen korkeus (m).</summary>
        public struct Asento
        {
            public double Lat, Lon, EtaisyysM, Kallistus, Suuntima, Katse;
            public Asento(double lat, double lon, double etaisyysM, double kallistus, double suuntima, double katse)
            { Lat = lat; Lon = lon; EtaisyysM = etaisyysM; Kallistus = kallistus; Suuntima = suuntima; Katse = katse; }
        }

        /// <summary>Koneen mittaus ruudulla: x, y (−1…1, oikea ja ylä +), näkyykö (edessä, ruudussa, ei pallon takana),
        /// siipivälin osuus ruudun leveydestä, katselukulma keulasta (° 0 = edestä, 180 = takaa), kameran korotuskulma
        /// koneesta (°, 90 = suoraan yläpuolella), etäisyys kameraan ja kameran korkeus.</summary>
        public struct Mittaus
        {
            public double T, X, Y, Koko, Alfa, Korotus, EtaisyysM, KameraKorkeusM;
            public bool Nakyy;
        }

        public readonly double Lat0, Lon0, Lat1, Lon1, ReittiM, Kuvasuhde, Fov, MaaKohteessa;
        /// <summary>Ohituksen kohta reitillä (osuus, <see cref="OhitusKohteelle"/>).</summary>
        public readonly double Ohitus;
        public readonly Asento Alku, Loppu;
        /// <summary>Matkanopeuden kertoimet ennen ja jälkeen ohituksen (1/s: kameran etäisyyksiä sekunnissa): loki ja testit.</summary>
        public double Nopeus1 { get; private set; }
        public double Nopeus2 { get; private set; }
        /// <summary>Silmän korkeus lähimmässä kohdassa ja lopussa (m): erkanemisen korkeuskäyrän päät.</summary>
        public double KorkeusOhitus { get; private set; }
        public double KorkeusLoppu { get; private set; }
        /// <summary>Koneen etäisyys kamerasta lähimmässä kohdassa ja lopussa (m): erkanemisen etäisyyskäyrän päät.</summary>
        public double EtaisyysOhitus { get; private set; }
        public double EtaisyysLoppu { get; private set; }
        /// <summary>Koneen alakulma lähimmässä kohdassa (rad).</summary>
        double EpsOhitus;

        readonly double tanV, tanH;
        readonly SKayra lahestyminen = new SKayra(LahestyminenA, LahestyminenB), nousu = new SKayra(NousuA, NousuB),
            pakitus = new SKayra(PakitusA, PakitusB);
        // Näytteet 240 Hz: koneen reittiosuus ja korkeus, symbolinen siipiväli, kameran asento ja katseen paino, mittaus.
        readonly double[] kp = new double[N + 1], kh = new double[N + 1], siipi = new double[N + 1];
        readonly double[] cLat = new double[N + 1], cLon = new double[N + 1], cLnD = new double[N + 1], cK = new double[N + 1],
            cB = new double[N + 1], cKatse = new double[N + 1], cKatseW = new double[N + 1];
        readonly Mittaus[] mittaus = new Mittaus[N + 1];
        // Kanavien päät (ruutupaikat ja suunnat), jotka lasketaan radan alussa.
        double s0x, s0y, sfx, sfy, bOhitus, bMuutosLahestyminen, bMuutosErkaneminen;

        /// <param name="alku">Napautusnäkymä (PalloKierto: leveys, pituus, korkeus = etäisyys, KaytettyKallistus, suuntima, katseKorkeus).</param>
        /// <param name="loppu">Saapumisnäkymä, johon peli jatkaa (PalloKierto.SaapumisNakyma ilman maarajausta).</param>
        /// <param name="kuvasuhde">Ruudun leveys / korkeus.</param>
        /// <param name="fov">Pystykuvakulma (°).</param>
        /// <param name="maaKohteessa">Kohteen maan korkeus (m, liioiteltu).</param>
        /// <param name="ohitus">Ohituksen kohta reitillä (osuus 0,3–0,97; <see cref="OhitusKohteelle"/>).</param>
        public AloituslennonRata(double lat0, double lon0, double lat1, double lon1, Asento alku, Asento loppu, double kuvasuhde,
            double fov = 50.0, double maaKohteessa = 0.0, double ohitus = OhitusOsuus)
        {
            Lat0 = lat0; Lon0 = lon0; Lat1 = lat1; Lon1 = lon1; Alku = alku; Loppu = loppu;
            Ohitus = Rajaa(ohitus, 0.3, 0.97);
            ReittiM = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            Kuvasuhde = kuvasuhde > 0 ? kuvasuhde : 0.46;
            Fov = fov;
            MaaKohteessa = maaKohteessa;
            tanV = Math.Tan(Fov * Math.PI / 360.0);
            tanH = tanV * Kuvasuhde;
            Paat();
            var dRef = new double[N + 1];
            for (int i = 0; i <= N; i++)
            {
                double t = i / (double)Hz;
                Kanavat(t, PerusKorkeus(t), out dRef[i], out _, out _, out _, out _, out _);
            }
            Kone(dRef);
            Kamera();
        }

        // ====================================================================================================================
        // KANAVAT: lähestyminen yhtenä S-käyränä, ohituksen liuku, pakitus ja korkeuden S-käyrä
        // ====================================================================================================================

        /// <summary>Lähestymisen edistymä p (0 → 1 lähimpään kohtaan): Beta(3, 2) ajasta.</summary>
        double P(double t) => lahestyminen.Arvo(t / OhitusS);
        /// <summary>Erkanemisen korkeusedistymä A (0 lähimmässä kohdassa → 1 lopussa): Beta(4, 3) log-korkeudessa.</summary>
        double A(double t) => t <= OhitusS ? 0.0 : nousu.Arvo((t - OhitusS) / (KestoS - OhitusS));
        /// <summary>Pakituksen edistymä (0 → 1 PakitusS:ssa): Beta(2,5, 2), kiihtyy 60 %:iin asti ja luovuttaa nousulle (koneen
        /// etäisyyden kasvu ei notkahda pakituksen ja nousun välissä).</summary>
        double Pb(double t) => t <= OhitusS ? 0.0 : pakitus.Arvo((t - OhitusS) / PakitusS);
        /// <summary>Ohituksen liuku 0 → 1 (KiriS → OhitusLoppuS), nopein lähimmässä kohdassa.</summary>
        static double Liuku(double t) => S((t - KiriS) / (2.0 * OhitusPuoliS));

        /// <summary>Kanavien päät: koneen ruutupaikka napautus- ja saapumisnäkymässä, ohituksen suunta ja kääntöjen suunnat.</summary>
        void Paat()
        {
            var k0 = Kanta(Alku);
            Projisoi(k0, Ecef(Lat0, Lon0, 0.0), out s0x, out s0y, out _);
            s0x = Rajaa(double.IsNaN(s0x) ? 0 : s0x, -0.95, 0.95); s0y = Rajaa(double.IsNaN(s0y) ? 0 : s0y, -0.95, 0.95);
            var kL = Kanta(Loppu);
            Projisoi(kL, Ecef(Lat1, Lon1, MaaKohteessa), out sfx, out sfy, out _);
            sfx = Rajaa(double.IsNaN(sfx) ? 0 : sfx, -0.8, 0.8); sfy = Rajaa(double.IsNaN(sfy) ? 0 : sfy, -0.8, 0.8);
            // Ohituksen suunta: kamera koneen oikealla (kone lipuu vasemmalta oikealle). Kone on silloin ohituskohdassa.
            double psiO = SuuntimaReitilla(Ohitus);
            bOhitus = psiO + OhitusTheta;
            bMuutosLahestyminen = Kulmaero(Alku.Suuntima, bOhitus);
            bMuutosErkaneminen = Kulmaero(bOhitus, Loppu.Suuntima);
            // Erkanemisen korkeuskäyrän päät: silmä lähimmässä kohdassa (katse koneen korkeudella) ja saapumisnäkymässä.
            KorkeusOhitus = KorkeusEtaisyydesta(OhitusEtaisyysM, OhitusKallistus, PerusKorkeus(OhitusS));
            KorkeusLoppu = KorkeusEtaisyydesta(Loppu.EtaisyysM, Loppu.Kallistus, Loppu.Katse);
            // Koneen etäisyys lähimmässä kohdassa (tasomalli: kone kulmassa atan(y · tan V) katseen yllä) ja saapumisnäkymässä.
            EpsOhitus = (90.0 - OhitusKallistus - Math.Atan(OhitusY * tanV) * 180.0 / Math.PI) * Math.PI / 180.0;
            EtaisyysOhitus = (KorkeusOhitus - PerusKorkeus(OhitusS)) / Math.Sin(EpsOhitus);
            EtaisyysLoppu = (kL.Silma - Ecef(Lat1, Lon1, MaaKohteessa)).Pituus;
        }

        /// <summary>
        /// Kanavat hetkellä t: etäisyys katsepisteeseen (m), kallistus, suunta, koneen ruutupaikka ja katseen paino (katsepisteen
        /// korkeus = paino × koneen korkeus <paramref name="koneenKorkeus"/>). Lähestymisessä kaikki p:n funktioita (yksi liike),
        /// erkanemisessa silmän korkeus A:n ja pakitus Pb:n funktioita; ruutupaikka ja suunta liukuvat loppuun S(A):lla.
        /// </summary>
        void Kanavat(double t, double koneenKorkeus, out double d, out double k, out double b, out double x, out double y, out double katseW)
        {
            double p = t >= OhitusS ? 1.0 : P(t);
            double a = A(t), pb = Pb(t), sa = S(a);
            // Katse koneen korkeudelle lähestymisen jälkipuoliskolla, maahan nousun aikana.
            katseW = S((p - 0.4) / 0.6) * (1.0 - sa);
            // Kallistus lähestymisessä etupainotteisesti (suoraan alas → 76°); erkanemisessa johdetaan korkeudesta ja etäisyydestä (alla).
            k = Alku.Kallistus + (OhitusKallistus - Alku.Kallistus) * (1.0 - Math.Pow(1.0 - p, 1.3));
            // Suunta: lähestymisessä etupainotteisesti (kääntö tehdään korkealla, ennen kuin kamera laskeutuu koneen tasalle),
            // erkanemisessa nousun loppuosalla (A ≥ KaantoAlkaa), kun sivumatka on rajattu ja kamera katsoo konetta jo jyrkästi
            // ylhäältä: kääntö kiertää karttaa eikä vie silmää koneen taakse.
            double gb = S((a - KaantoAlkaa) / (1.0 - KaantoAlkaa));
            b = Alku.Suuntima + bMuutosLahestyminen * (1.0 - Math.Pow(1.0 - p, 2.5)) + bMuutosErkaneminen * gb;
            // Koneen ruutupaikka: napautusnäkymän Lontoosta vasemmalle, liuku oikealle, pakitus kohti horisonttia, loppu kohteen paikalle.
            double kupu = 12.2 * p * Math.Pow(1.0 - p, 4);
            double xa = s0x + (LiukuX0 - s0x) * p + KuminauhaX * kupu + (LiukuX1 - LiukuX0) * Liuku(t) + (PakitusX - LiukuX1) * pb;
            double ya = s0y + (OhitusY - s0y) * p - KuminauhaY * kupu + (PakitusY - OhitusY) * pb;
            x = xa + (sfx - xa) * sa;
            y = ya + (sfy - ya) * sa;
            double katse = katseW * koneenKorkeus;
            if (t <= OhitusS)
            {
                d = Math.Exp(Math.Log(Alku.EtaisyysM) + (Math.Log(OhitusEtaisyysM) - Math.Log(Alku.EtaisyysM)) * p);
                return;
            }
            // ERKANEMINEN: silmän korkeus h on omistajan S-käyrä (A), ja koneen alakulma ε (kuinka jyrkästi kamera katsoo konetta)
            // kulkee sen mukana: pakitus laskee ε:n ohituksen 13°:sta PakitusKulma-arvoon (kamera loittonee vaakasuunnassa lähes
            // samalla korkeudella), ja nousu nostaa sen suoraan alas: ln sin ε = ln sin ε_pakitus · (1 − A). Koneen etäisyys
            // e = (h − koneen korkeus) / sin ε kasvaa silloin koko erkanemisen ajan yhtenä kyttyränä (pakitus luovuttaa nousulle),
            // ja kallistus = 90° − ε − atan(y · tan V) pitää koneen ruudun korkeudella y. Lopussa kallistus liukuu saapumisnäkymään.
            double h = Math.Exp(Math.Log(KorkeusOhitus) + (Math.Log(KorkeusLoppu) - Math.Log(KorkeusOhitus)) * a);
            double ePb = EpsOhitus + (PakitusKulma * Math.PI / 180.0 - EpsOhitus) * pb;
            double sinE = Math.Exp(Math.Log(Math.Sin(ePb)) * Math.Pow(1.0 - a, AlakulmaEksponentti));
            // Sivumatka: alakulman antama vaakaetäisyys koneesta pehmeästi enintään rajaan, joka kapenee ennen kosketusta.
            double dH = Math.Max(1.0, h - koneenKorkeus);
            double vaakaA = dH / Math.Tan(Math.Max(1e-6, Math.Asin(Rajaa(sinE, 0, 1))));
            double raja = SivuEnintaanM + (SivuLoppuM - SivuEnintaanM) * S((t - SivuKapeneeS) / (SivuKapeaS - SivuKapeneeS));
            double vaaka = vaakaA + (PehmeaMin(vaakaA, raja) - vaakaA) * S((t - OhitusS) / PakitusS);
            double kE = 90.0 - Math.Atan2(dH, vaaka) * 180.0 / Math.PI - Math.Atan(y * tanV) * 180.0 / Math.PI;
            double wL = S((a - 0.88) / 0.12);
            k = kE + (Loppu.Kallistus - kE) * wL;
            d = EtaisyysKorkeudesta(h, k, katse);
        }

        /// <summary>Silmän korkeus pallon pinnasta (m) katsepisteen korkeudelta c etäisyydellä d kallistuksella k.</summary>
        static double KorkeusEtaisyydesta(double d, double k, double c)
        {
            double rc = R + c, ck = Math.Cos(k * Math.PI / 180.0);
            return Math.Sqrt(rc * rc + d * d + 2.0 * rc * d * ck) - R;
        }

        /// <summary>Etäisyys katsepisteeseen (m), jolla silmä on korkeudella h (käänteinen <see cref="KorkeusEtaisyydesta"/>).</summary>
        static double EtaisyysKorkeudesta(double h, double k, double c)
        {
            double rc = R + c, ck = Math.Cos(k * Math.PI / 180.0), rh = R + h;
            return Math.Max(100.0, -rc * ck + Math.Sqrt(Math.Max(0.0, rc * rc * ck * ck + rh * rh - rc * rc)));
        }

        // ====================================================================================================================
        // KONE: nopeusprofiili, reittiosuus ja korkeus
        // ====================================================================================================================

        /// <summary>Kameran suunniteltu etäisyys (m) hetkellä t: matkanopeus = K · etäisyys, jolloin kone kulkee ruudulla tasaisesti
        /// (ei viuhahda lähikuvan jälkeen eikä matele kaukaa).</summary>
        double[] dRef;
        double Dref(double t) => Lerp(dRef, t);

        static double Rullaus(double t) => 300.0 * S(t / 0.6) * (1 - S((t - 0.6) / 1.6));
        static double W1(double t) => S((t - 0.5) / 2.4) * (1 - S((t - (KiriS - 1.0)) / 1.0));
        static double Wo(double t) => S((t - (KiriS - 1.0)) / 1.0) * (1 - S((t - (OhitusS + 0.4)) / 1.4));
        /// <summary>Erkanemisen matkanopeus kameran mukana kosketusta edeltävään jarrutukseen asti: kone liukuu kohteeseen samalla
        /// kun kamera nousee (v3e: loppumatka ~190 km, v3d:n kiito pois).</summary>
        static double W2(double t) => S((t - (OhitusS + 0.4)) / 1.8) * (1 - S((t - (KosketusS - 1.6)) / 1.2));

        /// <summary>Laskun absoluuttinen nopeus (m/s): 3 km/s → 0,7 km/s kosketuksessa → pysähdys (kamera ~1 000 km:ssä).</summary>
        static double Saapuminen(double t)
        {
            double v;
            if (t <= KosketusS - 0.5) v = 3000.0;
            else if (t <= KosketusS) v = 3000.0 + (700.0 - 3000.0) * S((t - (KosketusS - 0.5)) / 0.5);
            else if (t <= PysahdysS) v = 700.0 * (1 - S((t - KosketusS) / (PysahdysS - KosketusS)));
            else v = 0.0;
            return S((t - (KosketusS - 1.6)) / 1.2) * v;
        }

        double Nopeus(double t) => Rullaus(t) + (Nopeus1 * W1(t) + Nopeus2 * W2(t)) * Dref(t) + OhitusNopeus * Wo(t) + Saapuminen(t);

        void Kone(double[] d)
        {
            dRef = d;
            // Matkanopeudet: lähin kohta ohituskohdassa (Ohitus, OhitusS) ja pysähdys perillä (PysahdysS).
            const int ali = 4;
            double dt = 1.0 / (Hz * ali);
            double a1 = 0, b1 = 0, a2 = 0, b2 = 0;
            for (int i = 0; i < (int)(PysahdysS * Hz * ali); i++)
            {
                double tm = (i + 0.5) * dt;
                if (tm < OhitusS) { a1 += W1(tm) * Dref(tm) * dt; b1 += (Rullaus(tm) + OhitusNopeus * Wo(tm) + Saapuminen(tm)) * dt; }
            }
            Nopeus1 = Math.Max(0.0, (Ohitus * ReittiM - b1) / Math.Max(1e-6, a1));
            for (int i = 0; i < (int)(PysahdysS * Hz * ali); i++)
            {
                double tm = (i + 0.5) * dt;
                a2 += W2(tm) * Dref(tm) * dt;
                b2 += (Rullaus(tm) + Nopeus1 * W1(tm) * Dref(tm) + OhitusNopeus * Wo(tm) + Saapuminen(tm)) * dt;
            }
            Nopeus2 = Math.Max(0.0, (ReittiM - b2) / Math.Max(1e-6, a2));
            double s = 0;
            kp[0] = 0;
            for (int i = 1; i <= N; i++)
            {
                for (int j = 0; j < ali; j++) s += Nopeus(((i - 1) * ali + j + 0.5) * dt) * dt;
                kp[i] = Math.Min(1.0, s / ReittiM);
            }
            // Pysähdyksestä alkaen täsmälleen perillä (numeerinen integraali ± 1e-4).
            for (int i = 0; i <= N; i++) if (i / (double)Hz >= PysahdysS) kp[i] = 1.0;
        }

        /// <summary>Koneen peruskorkeus (m): nousu 0,6–4 s matkakorkeuteen, liuku 3 s ennen kosketusta.</summary>
        public static double PerusKorkeus(double t)
        {
            double h = MatkaKorkeusM * S((t - 0.6) / 3.4);
            double alku = KosketusS - 3.0;
            if (t <= alku) return h;
            if (t >= KosketusS) return 0.0;
            double u = (t - alku) / (KosketusS - alku);
            return h * (1 - S(Math.Pow(u, 0.85)));
        }

        /// <summary>Symbolinen siipiväli (m) etäisyydellä kameraan: vakio 5 km, mutta ruudulla vähintään KokoVahintaan leveydestä
        /// (pehmeä maksimi, 4-normi: rajakohdassa +19 %, neliöjuurella +41 %). Kone kasvaa siis vasta, kun kamera on lähempänä kuin
        /// SiipiLahellaM / (KokoVahintaan · 2 tan h) (iPhone ~470 km).</summary>
        public double Siipivali(double etaisyysKameraanM, double t = 0.0)
        {
            double a = SiipiLahellaM, b = KokoVahintaanHetkella(t) * 2.0 * tanH * etaisyysKameraanM;
            return Math.Sqrt(Math.Sqrt(a * a * a * a + b * b * b * b));
        }

        /// <summary>Iso symbolikone nostetaan 30 % koon kasvusta (ei leikkaa maastoa kaukana); häviää saapumisessa.</summary>
        static double Nosto(double t, double siipiM) =>
            0.3 * Math.Max(0.0, siipiM - SiipiLahellaM) * (1 - S((t - SaapuminenS) / 1.6));

        // ====================================================================================================================
        // KAMERA: katsepisteen ratkaisu
        // ====================================================================================================================

        void Kamera()
        {
            double edLat = Alku.Lat, edLon = Alku.Lon, edEt = Alku.EtaisyysM;
            for (int i = 0; i <= N; i++)
            {
                double t = i / (double)Hz;
                // Kone tässä näytteessä (koko edellisen näytteen etäisyydestä: heikko kytkös).
                var q = Kohta(kp[i]);
                siipi[i] = Siipivali(edEt, t);
                kh[i] = PerusKorkeus(t) + Nosto(t, siipi[i]);
                var P = Ecef(q.Lat, q.Lon, kh[i]);
                Kanavat(t, kh[i], out double d, out double k, out double b, out double x, out double y, out double katseW);
                k = Rajaa(k, 0, 85);
                x = Rajaa(x, -0.8, 0.8); y = Rajaa(y, -0.8, 0.8);
                double katse = katseW * kh[i];
                double lnd = Math.Log(d);

                double la = edLat, lo = edLon;
                if (i == 0) { la = Alku.Lat; lo = Alku.Lon; lnd = Math.Log(Alku.EtaisyysM); k = Alku.Kallistus; b = Alku.Suuntima; katse = Alku.Katse; }
                else if (i == N) { la = Loppu.Lat; lo = Loppu.Lon; lnd = Math.Log(Loppu.EtaisyysM); k = Loppu.Kallistus; b = Loppu.Suuntima; katse = Loppu.Katse; }
                else Ratkaise(P, Math.Exp(lnd), k, b, katse, x, y, ref la, ref lo);
                cLat[i] = la; cLon[i] = lo; cLnD[i] = lnd; cK[i] = k; cB[i] = b; cKatse[i] = katse; cKatseW[i] = katseW;
                edLat = la; edLon = lo;

                var m = Mittaa(t, P, q.Lat, q.Lon, kp[i], siipi[i], new Asento(la, lo, Math.Exp(lnd), k, b, katse));
                mittaus[i] = m;
                edEt = m.EtaisyysM;
            }
            // Suunta jatkuvaksi (±360° hypyt pois) interpolointia varten.
            for (int i = 1; i <= N; i++) cB[i] = cB[i - 1] + Kulmaero(cB[i - 1], cB[i]);
        }

        /// <summary>Katsepiste (lat, lon), jolla piste P projisoituu ruudun kohtaan (x, y): Newton kahdella muuttujalla,
        /// numeerinen Jacobi, lähtö edellisestä näytteestä, askelraja puolet näkymän koosta.</summary>
        void Ratkaise(V P, double d, double k, double b, double katse, double x, double y, ref double la, ref double lo)
        {
            double h = d / R * 180.0 / Math.PI * 1e-3;
            for (int it = 0; it < 16; it++)
            {
                if (!Arvioi(P, la, lo, d, k, b, katse, out double fx, out double fy)) break;
                double ex = fx - x, ey = fy - y;
                if (Math.Abs(ex) < 1e-7 && Math.Abs(ey) < 1e-7) break;
                double hl = h / Math.Max(0.2, Math.Cos(la * Math.PI / 180.0));
                Arvioi(P, la + h, lo, d, k, b, katse, out double ax, out double ay);
                Arvioi(P, la, lo + hl, d, k, b, katse, out double ox, out double oy);
                double j11 = (ax - fx) / h, j21 = (ay - fy) / h, j12 = (ox - fx) / hl, j22 = (oy - fy) / hl;
                double det = j11 * j22 - j12 * j21;
                if (Math.Abs(det) < 1e-18) break;
                double dla = (-ex * j22 + ey * j12) / det, dlo = (-ey * j11 + ex * j21) / det;
                double raja = d / R * 180.0 / Math.PI * 0.5;
                double pit = Math.Sqrt(dla * dla + dlo * dlo);
                if (pit > raja) { dla *= raja / pit; dlo *= raja / pit; }
                la = Rajaa(la + dla, -89.0, 89.0); lo += dlo;
            }
        }

        bool Arvioi(V P, double la, double lo, double d, double k, double b, double katse, out double x, out double y) =>
            Projisoi(Kanta(new Asento(la, lo, d, k, b, katse)), P, out x, out y, out _);

        Mittaus Mittaa(double t, V P, double qLat, double qLon, double osuus, double siipiM, Asento a)
        {
            var c = Kanta(a);
            bool edessa = Projisoi(c, P, out double x, out double y, out double z);
            var w = c.Silma - P;
            double et = w.Pituus;
            Kanta(qLat, qLon, out var n, out var pohj, out var ita);
            double psi = SuuntimaReitilla(osuus) * Math.PI / 180.0;
            var eteen = pohj * Math.Cos(psi) + ita * Math.Sin(psi);
            double pysty = V.Dot(w, n);
            var vaaka = w - n * pysty;
            double alfa = vaaka.Pituus < 1e-6 ? 90.0 : Math.Acos(Rajaa(V.Dot(vaaka, eteen) / vaaka.Pituus, -1, 1)) * 180.0 / Math.PI;
            double korotus = Math.Asin(Rajaa(pysty / Math.Max(1e-9, et), -1, 1)) * 180.0 / Math.PI;
            bool nakyy = edessa && Math.Abs(x) <= 1 && Math.Abs(y) <= 1 && !Peitossa(c.Silma, P);
            return new Mittaus
            {
                T = t, X = x, Y = y, Nakyy = nakyy, Koko = edessa ? siipiM / (2 * z * tanH) : 0, Alfa = alfa, Korotus = korotus,
                EtaisyysM = et, KameraKorkeusM = c.Silma.Pituus - R,
            };
        }

        /// <summary>Pallo peittää pisteen Q silmästä (jana leikkaa pallon ennen Q:ta).</summary>
        static bool Peitossa(V silma, V q)
        {
            var d = q - silma;
            double l = d.Pituus;
            var u = d * (1.0 / l);
            double bb = V.Dot(silma, u), cc = V.Dot(silma, silma) - R * R, disk = bb * bb - cc;
            if (disk <= 0) return false;
            double s1 = -bb - Math.Sqrt(disk);
            return s1 > 0 && s1 < l - 50.0;
        }

        /// <summary>S-käyrä, jonka nopeus on Beta-ydin τ^(a−1)(1−τ)^(b−1) (a, b ≥ 2: lähtee levosta ja päättyy lepoon;
        /// b = 2 päättyy tasaisesti hidastuen, ei viipyen), taulukoituna.</summary>
        sealed class SKayra
        {
            const int M = 4096;
            readonly double[] f = new double[M + 1];
            public SKayra(double a, double b)
            {
                var v = new double[M];
                double s = 0;
                for (int i = 0; i < M; i++) { double x = (i + 0.5) / M; v[i] = Math.Pow(x, a - 1) * Math.Pow(1 - x, b - 1); s += v[i]; }
                double c = 0;
                for (int i = 0; i < M; i++) { c += v[i]; f[i + 1] = c / s; }
            }
            public double Arvo(double x)
            {
                x = Rajaa(x, 0, 1) * M;
                int i = Math.Min(M - 1, (int)x);
                return f[i] + (f[i + 1] - f[i]) * (x - i);
            }
        }

        // ====================================================================================================================
        // Julkinen rajapinta (Nappula)
        // ====================================================================================================================

        static double Lerp(double[] a, double t)
        {
            double x = Rajaa(t, 0, KestoS) * Hz;
            int i = Math.Min(N - 1, (int)x);
            return a[i] + (a[i + 1] - a[i]) * (x - i);
        }

        /// <summary>Kameran asento hetkellä t (PalloKierto.Kuvaa); lisa = koneen maastolisä (m), joka nostaa lähikuvien katsetta.</summary>
        public Asento Kamera(double t, double lisa = 0.0)
        {
            double x = Rajaa(t, 0, KestoS) * Hz;
            int i = Math.Min(N - 1, (int)x);
            double f = x - i;
            double lo = cLon[i] + Kulmaero(cLon[i], cLon[i + 1]) * f;
            return new Asento(cLat[i] + (cLat[i + 1] - cLat[i]) * f, Normalisoi180(lo), Math.Exp(cLnD[i] + (cLnD[i + 1] - cLnD[i]) * f),
                cK[i] + (cK[i + 1] - cK[i]) * f, Normalisoi(cB[i] + (cB[i + 1] - cB[i]) * f),
                cKatse[i] + (cKatse[i + 1] - cKatse[i]) * f + lisa * (cKatseW[i] + (cKatseW[i + 1] - cKatseW[i]) * f));
        }

        /// <summary>Silmän korkeus pallon pinnasta (m) hetkellä t (testit ja taulukko: erkanemisen korkeuskäyrä).</summary>
        public double SilmanKorkeus(double t)
        {
            var a = Kamera(t);
            return KorkeusEtaisyydesta(a.EtaisyysM, a.Kallistus, a.Katse);
        }

        /// <summary>Koneen reittiosuus 0–1 (monotoninen, 1 pysähdyksestä alkaen).</summary>
        public double KoneenOsuus(double t) => Lerp(kp, t);
        /// <summary>Koneen korkeus ilman maastolisää (m): peruskorkeus + symbolisen koon nosto.</summary>
        public double KoneenKorkeus(double t) => Lerp(kh, t);
        /// <summary>Symbolinen siipiväli (m).</summary>
        public double Siipi(double t) => Lerp(siipi, t);
        /// <summary>Maastolisän paino (nousun jälkeen 1, laskussa kohteen maahan).</summary>
        public static double LisanPaino(double t) => S((t - 0.6) / 3.4) * (1 - S((t - (KosketusS - 3.0)) / 3.0));
        /// <summary>Lento v3:n aikaan kuvattu hetki (Elo, nokka, kierrokset): kosketus <see cref="KosketusS"/> ↔ v3:n 14,3 s.</summary>
        public static double V3Aika(double t) =>
            t <= 9.0 ? t : Math.Min(LennonV3.KestoS, 9.0 + (t - 9.0) * (LennonV3.KosketusS - 9.0) / (KosketusS - 9.0));

        /// <summary>Mittaus näytteestä lähinnä hetkeä t (testit ja loki).</summary>
        public Mittaus Mitta(double t) => mittaus[Math.Min(N, Math.Max(0, (int)Math.Round(t * Hz)))];

        /// <summary>
        /// Osuus ruudun pystykeskilinjasta, jolla maa näkyy usvan läpi (sumu alle 50 %) hetkellä t: Aurinko.cs:n lineaarinen
        /// horisonttiusva (Horisonttiusva.Sumu, voima kallistuksen mukaan), raja vähintään <paramref name="usvaVahintaanM"/>
        /// katsepisteestä (0 = webin raja 0,6 × etäisyys kuten v2). Taivas ei kuulu. Testit ja taulukko.
        /// </summary>
        public double MaaNakyvissa(double t, double usvaVahintaanM = UsvaVahintaanM)
        {
            var a = Kamera(t);
            double d = a.EtaisyysM, k = a.Kallistus, puoli = Fov * 0.5;
            double kerroin = Math.Max(Horisonttiusva.RajaKerroin, usvaVahintaanM / d);
            var (alku, loppu) = Horisonttiusva.Sumu(d, k, puoli, R, kerroin);
            double voima = Horisonttiusva.Vahvuus(k);
            const int n = 200;
            int nakyy = 0;
            for (int i = 0; i < n; i++)
            {
                double z = Horisonttiusva.SyvyysRuudulla(d, k, puoli, R, -1.0 + (i + 0.5) * 2.0 / n);
                if (double.IsInfinity(z)) continue;
                if (voima * Rajaa((z - alku) / Math.Max(1.0, loppu - alku), 0, 1) < 0.5) nakyy++;
            }
            return nakyy / (double)n;
        }

        /// <summary>Pisteen (lat, lon, h) ruutupaikka hetkellä t (testit: lähtöpiste ja kohde kuvassa).</summary>
        public bool Ruudussa(double t, double lat, double lon, double h, out double x, out double y)
        {
            var c = Kanta(Kamera(t));
            var q = Ecef(lat, lon, h);
            bool ok = Projisoi(c, q, out x, out y, out _);
            return ok && Math.Abs(x) <= 1 && Math.Abs(y) <= 1 && !Peitossa(c.Silma, q);
        }

        /// <summary>Silmän maapiste (lat, lon) hetkellä t (testit: silmän maareitti).</summary>
        public (double Lat, double Lon) SilmanMaapiste(double t)
        {
            var s = Kanta(Kamera(t)).Silma;
            double r = s.Pituus;
            return (Math.Asin(s.Z / r) * 180.0 / Math.PI, Math.Atan2(s.Y, s.X) * 180.0 / Math.PI);
        }

        // ---- Reitti ----

        public (double Lat, double Lon) Kohta(double u) => LennonV3.Isoympyralla(Lat0, Lon0, Lat1, Lon1, Rajaa(u, 0, 1));

        public double SuuntimaReitilla(double u)
        {
            u = Rajaa(u, 0, 0.999);
            var a = Kohta(u); var b = Kohta(Math.Min(1.0, u + 0.001));
            return LennonV3.Suuntima(a.Lat, a.Lon, b.Lat, b.Lon);
        }

        /// <summary>Reitin isoympyrä pisteinä (käytävä ja maastokysely odotuksen alussa).</summary>
        public static List<(double Lat, double Lon)> Isoympyra(double lat0, double lon0, double lat1, double lon1, int n = 96)
        {
            var p = new List<(double, double)>(n + 1);
            for (int i = 0; i <= n; i++) p.Add(LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, (double)i / n));
            return p;
        }

        /// <summary>
        /// Lennon laatat (LennonV3Kaytava.Laatta): ALKU (odotus odottaa) = koko reitin matkanäkymä Z4–Z5 ±1, lähtömaa Z6 ±1 ja
        /// ohituksen lähikuva Z7–Z9 ±1 (ohituskohdan ±15 km); LOPUT = kohteen lasku Z7–Z9 ±1 viimeiseltä 80 km:ltä ja Z6 ±1
        /// reitin loppukymmenykseltä, lennon käytävässä (<paramref name="ymparisto"/>) lisäksi kohteen ympäristö Z7–Z9 ±2
        /// (v3b: saapuminen 200–490 km:stä näkee ~400 km:n alueen). Aloitusnäytön esilämmitys ottaa näistä Z8–Z9 (ohitus ja
        /// kohde) ilman ympäristöä (18 kohdetta × ~100 laattaa olisi liikaa taustalle).
        /// </summary>
        public static List<LennonV3Kaytava.Laatta> Laatat(double lat0, double lon0, double lat1, double lon1, double ohitus = OhitusOsuus,
            bool ymparisto = false)
        {
            var tulos = new List<LennonV3Kaytava.Laatta>();
            var nahty = new HashSet<long>();
            double L = Math.Max(1000.0, LennonAikajana.ReittiM(lat0, lon0, lat1, lon1));
            void Lisaa(double u, bool alku, params int[] tasot)
            {
                var q = LennonV3.Isoympyralla(lat0, lon0, lat1, lon1, Rajaa(u, 0, 1));
                foreach (int z in tasot) LennonV3Kaytava.Lisaa(tulos, nahty, q.Lat, q.Lon, z, 1, alku);
            }
            for (int i = -2; i <= 2; i++) Lisaa(Rajaa(ohitus, 0.3, 0.97) + i * 7_500.0 / L, true, 7, 8, 9);
            for (int i = 0; i <= 40; i++) Lisaa(i / 40.0, true, 4, 5);
            for (int i = 0; i <= 4; i++) Lisaa(i * 0.02, true, 6);
            for (int i = 0; i <= 10; i++) Lisaa(1 - i * 0.01, false, 6);
            for (int i = 0; i <= 2; i++) Lisaa(1 - i * 40_000.0 / L, false, 7, 8, 9);
            if (ymparisto) foreach (int z in new[] { 7, 8, 9 }) LennonV3Kaytava.Lisaa(tulos, nahty, lat1, lon1, z, 2, false);
            return tulos;
        }

        // ====================================================================================================================
        // Pallomalli
        // ====================================================================================================================

        struct V
        {
            public double X, Y, Z;
            public V(double x, double y, double z) { X = x; Y = y; Z = z; }
            public static V operator +(V a, V b) => new V(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
            public static V operator -(V a, V b) => new V(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
            public static V operator *(V a, double s) => new V(a.X * s, a.Y * s, a.Z * s);
            public static double Dot(V a, V b) => a.X * b.X + a.Y * b.Y + a.Z * b.Z;
            public static V Cross(V a, V b) => new V(a.Y * b.Z - a.Z * b.Y, a.Z * b.X - a.X * b.Z, a.X * b.Y - a.Y * b.X);
            public double Pituus => Math.Sqrt(X * X + Y * Y + Z * Z);
        }

        struct Kamerakanta { public V Silma, Eteen, Oikea, Ylos; }

        static V Ecef(double lat, double lon, double h)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180, r = R + h;
            return new V(r * Math.Cos(f) * Math.Cos(l), r * Math.Cos(f) * Math.Sin(l), r * Math.Sin(f));
        }

        static void Kanta(double lat, double lon, out V ylos, out V pohj, out V ita)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            ylos = new V(Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f));
            pohj = new V(-Math.Sin(f) * Math.Cos(l), -Math.Sin(f) * Math.Sin(l), Math.Cos(f));
            ita = new V(-Math.Sin(l), Math.Cos(l), 0.0);
        }

        /// <summary>Kamera kuten PalloKierto.LaskeAsento (pallolla, ilman maaston rakoa).</summary>
        static Kamerakanta Kanta(Asento a)
        {
            Kanta(a.Lat, a.Lon, out var ylos, out var pohj, out var ita);
            var L = ylos * (R + a.Katse);
            double b = a.Suuntima * Math.PI / 180, k = a.Kallistus * Math.PI / 180;
            var eteen = pohj * Math.Cos(b) + ita * Math.Sin(b);
            var silmaan = ylos * Math.Cos(k) - eteen * Math.Sin(k);
            var f = silmaan * -1.0;
            var u = eteen * Math.Cos(k) + ylos * Math.Sin(k);
            return new Kamerakanta { Silma = L + silmaan * a.EtaisyysM, Eteen = f, Ylos = u, Oikea = V.Cross(f, u) };
        }

        bool Projisoi(Kamerakanta c, V q, out double x, out double y, out double z)
        {
            var v = q - c.Silma;
            z = V.Dot(v, c.Eteen);
            if (z <= 1.0) { x = y = double.NaN; return false; }
            x = V.Dot(v, c.Oikea) / (z * tanH);
            y = V.Dot(v, c.Ylos) / (z * tanV);
            return true;
        }

        // ---- Apurit ----

        static double S(double x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * x * (x * (x * 6 - 15) + 10); }
        static double Rajaa(double x, double a, double b) => x < a ? a : x > b ? b : x;
        /// <summary>Pehmeä minimi (4-normi): pienempi arvo, rajakohdassa −16 %.</summary>
        static double PehmeaMin(double a, double b) => 1.0 / Math.Sqrt(Math.Sqrt(1.0 / (a * a * a * a) + 1.0 / (b * b * b * b)));
        static double Normalisoi(double a) { a %= 360.0; return a < 0 ? a + 360.0 : a; }
        static double Normalisoi180(double a) { a = Normalisoi(a + 180.0); return a - 180.0; }
        static double Kulmaero(double a, double b) => LennonV3.Kulmaero(a, b);
    }
}
