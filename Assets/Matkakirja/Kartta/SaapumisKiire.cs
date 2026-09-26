using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// SAAPUMISEN KIIRE (omistajan löydös 171, P1, Natiiviseppä 26.9.2026): aloituslennon saapumisessa kohdemaa näkyi pelkkänä
    /// vaaleana laattana (löydöksen 163/163b toistuma). Puhtaat päätökset Laattapalvelimelle, Nappulan aloituslennolle ja
    /// Saapumisvartijalle (ei UnityEngineä; Kartta-testit/Testit/SaapumisKiireTestit.cs).
    ///
    /// JUURISYY (lokit/laatta-esilataus/d-era1, kylmä aloituslento Lontoo → Ateena, ja lokit/loydos171/RAPORTTI.md):
    ///   1. Aloituslento esilataa kohteesta vain LENNON PINNAN (Blue Marble ja Sentinel, KarttaKerrokset.EsilataaKohde). Pelin
    ///      kartan pohjaa, maastoa ja kohdemaan kermahuntua (Varitaso) ei esiladattu lainkaan: erä 2 (SaapumisLaatatSilta)
    ///      ohittaa aloituslennon, ja väritaso on lennon ajan väistössä (VaistaVaritaso).
    ///   2. Saapumiskortin alla (Nappula.PaataAloituslento → LentoPohja(false)) lennon pinta poistuu ja väritaso luodaan
    ///      kohdemaalle (laatat.json kylmänä verkosta): Cesium kiinnittää uuden raster-kerroksen jokaiseen laattaan, eikä laatta
    ///      ole piirrettävä ennen kuin sen kaikki rasterit ovat valmiina → piirrossa 52 → 5 laattaa, aste 34 → 2,7 %, Cesiumin
    ///      työjonossa 301 laattaa. Kortti peittää ruutua vain ~3,6 s (Saapumiskortti: 280 + kirjoitus + 2000 + 320 ms), ja
    ///      kylmänä aste oli sekunnin kuluttua 31,8 %. Laatta, jolla ei ole valmista pohjarasteria eikä valmista esivanhempaa,
    ///      piirtyy varjostimen oletusalfalla 0 (KarttaKerrokset: "alta näkyy pergamentti tai materiaalin vaalea perusväri") —
    ///      ja kohdemaassa ei ole hunnun kermaa peittämässä sitä (huntu on muissa maissa), joten juuri kohdemaa näkyy vaaleana.
    ///   3. Kiirejono (163b) ja vartija (163) eivät kata tätä: 163b kirjaa vain näkyvän jonon nälän, ja VARTIJA 163 toimii vain
    ///      PAIKALLAAN/KERROS-tilassa. Lennon lopun ja kortin aikana kukaan ei valvo kohdemaan valmiutta, ja kortin jälkeen
    ///      Ruudunpaivitys putoaa lepoon (30 fps), mikä puolittaa Cesiumin pääsäikeen latauskierrokset (build 22 -mittaus).
    /// KORJAUS (kehittäjälippu Saapumisvartija.Paalla):
    ///   - Kohdemaan saapumisnäkymän laatat (pohja, maasto, kerma + laatat.json; sama näkymä kuin kortin alla, maaRajaus pois)
    ///     haetaan jo lennon alusta omassa SAAPUMISJONOSSA (<see cref="Jono.Saapuminen"/>): näkyvän kartan vapailla paikoilla
    ///     ennen muuta esilatausta. Näkyvän jonon etusija säilyy (163b), ja Cesiumin omat kermapyynnöt kulkevat kiirejonossa.
    ///   - SAAPUMISTILA laskeutumisesta (liuku) kohdemaan näkymän valmistumiseen: näkyvän kartan jonolle
    ///     <see cref="NakyvaRaja"/> paikkaa kuten verhon kevennyksessä, muu esilataus ja taustajono tauolla, täysi ruudunpäivitys.
    ///   - Lento hidastuu loppuorbitissa (<see cref="Aikakerroin"/>), jos kohdemaan laatat eivät ole levyllä, enintään
    ///     <see cref="LisaaEnintaanS"/> s. Musta verho ja aloitusverho eivät pidene (saapumisjono on tauolla verhon aikana).
    /// </summary>
    public static class SaapumisKiire
    {
        /// <summary>Laattapalvelimen jonot (Laattapalvelin.HaeSisalto).</summary>
        public enum Jono { Nakyva, Kiire, Kohde, Saapuminen, Esi, Tausta }

        /// <summary>
        /// Haun jono: Cesiumin pyynnöt näkyvään (väritaso ja harvat sarjat kiireeseen); esilatauksista verhon reitti ja lennon
        /// kohdealue kiirejonoon, jos laatta on väritasoa (Sentinel), muuten kohdealue omaan jonoonsa; kohdemaan saapuminen
        /// (myös sen kerma) saapumisjonoon, joka palvellaan vasta näkyvän jonon jälkeen (163b: näkyvä ensin), tausta
        /// taustajonoon ja muut esilatausjonoon.
        /// </summary>
        public static Jono Valitse(bool esilataus, bool varitasoa, bool verholle, bool etusija, bool saapuminen, bool tausta)
        {
            if (!esilataus) return varitasoa ? Jono.Kiire : Jono.Nakyva;
            if (varitasoa && (verholle || etusija)) return Jono.Kiire;
            if (etusija) return Jono.Kohde;
            if (saapuminen) return Jono.Saapuminen;
            return tausta ? Jono.Tausta : Jono.Esi;
        }

        /// <summary>Näkyvän kartan jonon rinnakkaiset haut: verhon kevennyksessä ja saapumistilassa vähintään verhon määrä.</summary>
        public static int NakyvaRaja(int rinnakkain, int verhoRinnakkain, bool verho, bool saapumistila) =>
            verho || saapumistila ? Math.Max(rinnakkain, verhoRinnakkain) : rinnakkain;

        /// <summary>
        /// Palvellaanko esilatausjonon (esiJono) hakua nyt: verhon aikana vain verhon odottama (Verholle), saapumistilassa
        /// samoin (lennon reitti jatkuu, aloitusnäytön ja muut esilataukset odottavat kohdemaan valmistumista).
        /// </summary>
        public static bool EsiPalvellaan(bool verho, bool saapumistila, bool verholle) => verholle || (!verho && !saapumistila);

        /// <summary>
        /// Palvellaanko saapumisjonon hakua nyt: verhon aikana ei (musta verho ja aloitusverho odottavat omia laattojaan,
        /// eikä niiden aika saa kasvaa), paitsi jos haku on verhon odottama.
        /// </summary>
        public static bool SaapumisPalvellaan(bool verho, bool verholle) => verholle || !verho;

        // ---- Kerman karkeat tasot koko pallolta ----

        /// <summary>
        /// Kerman karkeat tasot (Z3–Z5), joita Cesium pyytää väritason luonnin jälkeen KOKO PALLOLTA: uusi raster-kerros
        /// liitetään jokaiseen muistissa olevaan laattaan (valintanäkymän ja lennon karkeat laatat), ja kylmänä
        /// (lokit/laatta-esilataus/d-era1, 31–37 s) kortin alla haettiin verkosta kerma Z3 33, Z4 75, Z5 91 laattaa (lon −180…180,
        /// Z4 rivit 3–13, Z5 rivit 9–22 eli lat ±62°) ennen näkymän omia Z6–Z7-laattoja — kiirejono palvelee ne saapumisjärjestyksessä. Laatat ovat pieniä
        /// (~0,3–3 kt; alueen ulkopuoli _maailma-sarjasta). Rivit leveysrajan sisältä, lähin kohdetta ensin.
        /// </summary>
        public static readonly (int z, double latRaja)[] KermaMaailmaTasot = { (3, 85.06), (4, 79.0), (5, 61.0) };

        /// <summary>Kerman karkeat laatat (z, x, y; XYZ) koko pallolta leveysrajoin, lähin (lat, lon) ensin.</summary>
        public static List<(int z, int x, int y)> KermaMaailma(double lat, double lon)
        {
            var tulos = new List<(int z, int x, int y, double d)>();
            double la0 = lat * Math.PI / 180.0, lo0 = lon * Math.PI / 180.0;
            foreach (var (z, raja) in KermaMaailmaTasot)
            {
                int n = 1 << z;
                for (int y = 0; y < n; y++)
                {
                    double pohjoinen = Leveys(y, n), etela = Leveys(y + 1, n);
                    if (etela > raja || pohjoinen < -raja) continue;
                    double lk = (pohjoinen + etela) * 0.5 * Math.PI / 180.0;
                    for (int x = 0; x < n; x++)
                    {
                        double lok = ((x + 0.5) / n * 360.0 - 180.0) * Math.PI / 180.0;
                        double c = Math.Sin(la0) * Math.Sin(lk) + Math.Cos(la0) * Math.Cos(lk) * Math.Cos(lok - lo0);
                        tulos.Add((z, x, y, Math.Acos(Math.Max(-1.0, Math.Min(1.0, c)))));
                    }
                }
            }
            // Karkein taso ensin (Cesium lataa tason kerrallaan), tason sisällä lähin ensin.
            tulos.Sort((a, b) => a.z != b.z ? a.z.CompareTo(b.z) : a.d.CompareTo(b.d));
            var l = new List<(int z, int x, int y)>(tulos.Count);
            foreach (var t in tulos) l.Add((t.z, t.x, t.y));
            return l;
        }

        /// <summary>Web Mercatorin rivin y yläreunan leveys (°) n × n -ruudukossa.</summary>
        static double Leveys(int y, int n) => Math.Atan(Math.Sinh(Math.PI * (1 - 2.0 * y / n))) * 180.0 / Math.PI;

        // ---- Lennon hidastus loppuorbitissa ----

        /// <summary>Kohdemaan esilatauksen osuus, jonka alla lento hidastuu loppuorbitissa.</summary>
        public const float Kynnys = 0.9f;
        /// <summary>Lennon ajan nopeus hidastettaessa (1 = normaali).</summary>
        public const double Hidastus = 0.5;
        /// <summary>
        /// Lento pitenee enintään näin monta sekuntia (PeliOhjaimen varareitti antaa lennolle yli 5 s varaa:
        /// 2,5 + AjonVara 0,75 + 2 s + käyttämätön mustan katto).
        /// </summary>
        public const double LisaaEnintaanS = 1.5;

        /// <summary>
        /// Lennon ajan kerroin tässä kehyksessä: <see cref="Hidastus"/>, kun lento on loppuorbitissa (t ≥ kiertoAlku, t &lt; 1),
        /// kohdemaan esilataus on alle <see cref="Kynnys"/> ja lisäaikaa on käytetty alle <see cref="LisaaEnintaanS"/>; muuten 1.
        /// osuus &lt; 0 = ei esilatausta (ei hidastusta).
        /// </summary>
        public static double Aikakerroin(double t, double kiertoAlku, double osuus, double lisattyS)
        {
            if (osuus < 0 || osuus >= Kynnys || t < kiertoAlku || t >= 1 || lisattyS >= LisaaEnintaanS) return 1.0;
            return Hidastus;
        }

        /// <summary>
        /// Kehyksen lisäaika (s), kun reaaliaika kului dt ja lennon aika kertoimella k: dt · (1 − k), rajattuna niin, ettei
        /// kokonaislisä ylitä <see cref="LisaaEnintaanS"/>.
        /// </summary>
        public static double Lisa(double dt, double kerroin, double lisattyS) =>
            Math.Max(0.0, Math.Min(dt * (1.0 - Math.Max(0.0, Math.Min(1.0, kerroin))), LisaaEnintaanS - lisattyS));

        // ---- Saapumisvartija ----

        /// <summary>Saapumistila päättyy viimeistään näin monen sekunnin päästä viimeisestä alusta (keskeytyneet ajot).</summary>
        public const double KattoS = 20.0;

        /// <summary>
        /// Kohdemaan näkymä valmis, saapumistila saa päättyä: ei odotettavia vaiheita (lento, kamera-ajo), kamera levossa ja
        /// pallon valmiusehto täyttyi (ValmiusEhto: aste ≥ 90 % ja tasaantunut) kohdemaan näkymässä. Kohdemaan esilatauksen
        /// loppua ei odoteta (sen karkeat kermatasot koko pallolta jatkuvat saapumisjonossa ilman saapumistilaa).
        /// </summary>
        public static bool Valmis(int odotuksia, bool kameraLiikkuu, bool pallovalmis) =>
            odotuksia == 0 && !kameraLiikkuu && pallovalmis;

        /// <summary>Paljastuksen luokka lokiriville: pallo valmis, kesken (aste ≥ raja) vai vaalea riski (aste alle rajan).</summary>
        public static string Paljastus(bool pallovalmis, float aste, float raja = ValmiusEhto.Raja) =>
            pallovalmis ? "valmis" : aste >= raja ? "kesken" : "EI VALMIS";
    }
}
