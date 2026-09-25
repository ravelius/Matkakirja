using System;

namespace Matkakirja
{
    /// <summary>
    /// KARTAN RINNEVALO (omistajan löydös 46, build 11 → 12: "valo muotoilisi korkeuseroja"). Puhtaat kaavat, ei UnityEngineä:
    /// testit Kartta-testit/Testit/KarttavaloTestit.cs. Käyttö Aurinko.cs:ssä (valo ja ambientti) ja tileset-varjostimessa
    /// (normaalien tasaus, Shaders/Cesium/Lahde~/tee_tileset.py).
    ///
    /// ONGELMA: build 11:n valo kulki kameran mukana (Euler(10°, −15°) kamerasta), joten tasamaan N·L oli 0,95 ja rinteen
    /// N·L = cos(rinne ± 10°) ≈ sama: kosini on huipullaan litteä, eikä rinne näkynyt. Matala aurinko sivulta antaa
    /// ensimmäisen kertaluvun muutoksen: rinne auringon puolella vaalenee ja varjon puolella tummuu.
    ///
    /// EHTO: pergamentin sävy tasamaalla ei muutu. URP Lit (lineaarinen väriavaruus) antaa tasamaalle Lambert-osana
    ///     väri = albedo · (A + I · L · N·L)
    /// (A = ambientti, I = valon intensiteetti, L = valon väri, kaikki lineaarisina). Build 11:n ylhäältä katsottu tasamaa:
    /// A₀ + D₀·L, jossa D₀ = I₀ · N·L₀ = 1,1 · cos 10° · cos 15° = 1,0464 (<see cref="VanhaSuora"/>).
    /// Rinnevalo, jonka tasamaan N·L on nl (= sin korkeus, kun aurinko on korkeuskulmassa korkeus paikallisesta
    /// vaakatasosta), ja voima v (suoran valon osuus D₀:sta):
    ///     I = v · D₀ / nl,        A = A₀ + (1 − v) · D₀ · L
    /// Tasamaa: A₀ + (1 − v)·D₀·L + v·D₀/nl · L · nl = A₀ + D₀·L, eli täsmälleen build 11:n arvo (<see cref="Kompensoi"/>).
    /// Rinne, jonka N·L = nl + Δ: kirkkaus muuttuu v·D₀·Δ/nl. Oletus v = 1: ambientti ennallaan, I = D₀ / sin 35° = 1,82.
    ///
    /// TASAUS (tileset-varjostin): suuntavalo on koko ruudulle sama, mutta pallon pinnan normaali kääntyy näkymän
    /// poikki (1 000 km:n näkymässä ±5°), jolloin tasamaa vaalenisi luoteessa ja tummuisi kaakossa. Varjostin kiertää siksi
    /// jokaisen normaalin sillä kierrolla, joka vie pisteen ellipsoidinormaalin n kameran alapisteen normaaliksi n₀
    /// (geosentrinen suunta maan keskeltä kameraan): tasamaa saa kaikkialla normaalin n₀ ja rinteet säilyttävät kulmansa.
    /// Paino w (0–1) tulee globaalin _maaKeski.w:stä (KorkeusKerroin.Tasaus). Aurinko.cs laskee auringon suunnan saman n₀:n
    /// paikallisesta vaakatasosta, joten nl = sin(korkeus) ruudun joka kohdassa.
    ///
    /// Pallon mittakaavassa (koko maapallo ruudulla) rinnevalo häipyy takaisin kameravaloon (<see cref="Osuus"/>): tasaus
    /// tekisi pallosta litteän kiekon.
    /// </summary>
    public static class Karttavalo
    {
        /// <summary>Build 11:n kameravalon intensiteetti (Editor/Rakennus.cs).</summary>
        public const double VanhaIntensiteetti = 1.1;
        /// <summary>Build 11:n kameravalon N·L ylhäältä katsotulla tasamaalla: kierto Euler(10°, −15°) kamerasta.</summary>
        public static readonly double VanhaNL = Math.Cos(10.0 * Math.PI / 180.0) * Math.Cos(15.0 * Math.PI / 180.0);
        /// <summary>D₀ = I₀ · N·L₀: tasamaan suoran valon osuus, joka säilytetään.</summary>
        public static double VanhaSuora => VanhaIntensiteetti * VanhaNL;

        /// <summary>Auringon atsimuutti pohjoisesta myötäpäivään (315 = luode, kartografian perinne: valo vasemmalta ylhäältä).</summary>
        public const double OletusAtsimuutti = 315.0;
        /// <summary>Auringon korkeuskulma paikallisesta vaakatasosta (matala aurinko, pitkät rinnevarjot).</summary>
        public const double OletusKorkeus = 35.0;
        /// <summary>Suoran valon osuus D₀:sta: 1 = ambientti ennallaan (turvallisin), pienempi = pehmeämpi (ambientti kasvaa).</summary>
        public const double OletusVoima = 1.0;

        /// <summary>Rinnevalo täysi tähän korkeuteen asti (m, kameran etäisyys katsepisteestä).</summary>
        public const double TaysiM = 4_000_000.0;
        /// <summary>Tästä ylöspäin kameravalo kuten build 11:ssä (pallon reuna tulee näkyviin noin 8 700 km:ssä).</summary>
        public const double NollaM = 8_000_000.0;

        /// <summary>Pienin hyväksytty tasamaan N·L (aurinko horisontissa → intensiteetti äärettömäksi).</summary>
        public const double PieninNL = 0.1;

        /// <summary>
        /// Valo ja ambientin lisäys tasamaan N·L:n ja voiman mukaan: (intensiteetti, ambientin lisäys D₀:n yksiköissä).
        /// Ambientti = A₀ + lisäys · L (lineaarisena). Tasamaan tulos = A₀ + D₀·L kaikilla arvoilla.
        /// </summary>
        public static (double intensiteetti, double ambienttiLisays) Kompensoi(double nlTasamaa, double voima = OletusVoima)
        {
            double nl = Math.Max(PieninNL, Math.Min(1.0, nlTasamaa));
            double v = Math.Max(0.0, voima);
            return (v * VanhaSuora / nl, (1.0 - v) * VanhaSuora);
        }

        /// <summary>
        /// Lambert-kirkkaus (ambientti + suora) harmaalle valolle ja ambientille A₀: pinnan N·L = nl.
        /// Testejä ja lokia varten; varjostin laskee saman URP:n Lit-mallilla.
        /// </summary>
        public static double Kirkkaus(double a0, double intensiteetti, double ambienttiLisays, double nl) =>
            a0 + ambienttiLisays + intensiteetti * Math.Max(0.0, nl);

        /// <summary>
        /// Suunta aurinkoon paikallisessa kehyksessä (itä, pohjoinen, ylös): atsimuutti pohjoisesta myötäpäivään,
        /// korkeus vaakatasosta. Yksikkövektori.
        /// </summary>
        public static (double ita, double pohjoinen, double ylos) Suunta(double atsimuuttiAst, double korkeusAst)
        {
            double a = atsimuuttiAst * Math.PI / 180.0, k = korkeusAst * Math.PI / 180.0;
            return (Math.Cos(k) * Math.Sin(a), Math.Cos(k) * Math.Cos(a), Math.Sin(k));
        }

        /// <summary>Rinnevalon osuus korkeudella (m): 1 ≤ <see cref="TaysiM"/>, 0 ≥ <see cref="NollaM"/>, välillä smootherstep.</summary>
        public static double Osuus(double korkeusM, double taysiM = TaysiM, double nollaM = NollaM)
        {
            double t = (korkeusM - taysiM) / Math.Max(1.0, nollaM - taysiM);
            return 1.0 - KameraEleet.Smootherstep(t);
        }
    }
}
