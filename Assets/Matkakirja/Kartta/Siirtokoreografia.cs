using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// SIIRRON KOREOGRAFIA (pariteettiraportti liikkuminen-pariteetti-20260925: A20, A21, B12–B16): webin
    /// js/siirtokoreografia.js ja js/ui.js animatePawnSisalla luvut ja kaavat puhtaina funktioina ilman UnityEngineä
    /// (Kartta-testit). Nappula.cs ajaa niiden mukaan:
    ///   1. ENNAKKOZOOMI (ui.js:22572 ennakoiSiirtoZoomi): kamera ajaa lähtöpisteen ja reitin 2. askeleen puoliväliin
    ///      askelen vaatimaan mittakaavaan (liftaus, bussi) tai koko matkan laatikkoon (laiva), 760 ms venytettynä
    ///      sovitaAjonKesto-kaavalla, perään hengähdys 120 ms.
    ///   2. SAATTO (ui.js:22856 aloitaSaattavaKamera): YKSI kamera-ajo kohti määränpäätä, kesto
    ///      clamp(300 + nappulan kesto + 280, 1200, 6200) ms, trapetsipehmennys ramppi 0,3.
    ///   3. NAPPULA lähtee 300 ms saaton alun jälkeen (ui.js:23345): liftaus ja laiva hyppyketjuna, bussi autokyytinä.
    /// Kaikki ajat millisekunteina kuten webissä; Nappula muuntaa sekunneiksi.
    /// </summary>
    public static class Siirtokoreografia
    {
        /// <summary>Kulkutapa koreografian kannalta (Pelikoodarin Kulkutapa: Maa = Liftaus, Bussi, Meri = Laiva).</summary>
        public enum Tapa { Liftaus, Bussi, Laiva }

        // ---- Vakiot (web js/siirtokoreografia.js, origin/main 25.9.2026) ----

        /// <summary>Laivan hypyn lentoaika (siirtokoreografia.js:24 STEP_MS).</summary>
        public const double StepMs = 190;
        /// <summary>Tauko hyppyjen välissä (siirtokoreografia.js:39 HYPYN_TAUKO_MS).</summary>
        public const double HypynTaukoMs = 190;
        /// <summary>Hypyn huippu suhteessa hypyn pituuteen ruudulla (siirtokoreografia.js:40 HYPYN_KAARI).</summary>
        public const double HypynKaari = 0.34;
        /// <summary>Huipun rajat ruudun pisteinä (siirtokoreografia.js:41–42 HYPYN_KORKEUS_MIN/MAX).</summary>
        public const double HypynKorkeusMin = 9, HypynKorkeusMax = 30;
        /// <summary>Jalkamatkan askel, lyhin askel ja koko matkan katto (siirtokoreografia.js:85–87).</summary>
        public const double JalkamatkanStepMs = 860, JalkamatkanStepLyhinMs = 640, JalkamatkanKattoMs = 5200;
        /// <summary>Nappula lähtee saaton alun jälkeen ja on perillä ennen kameraa (siirtokoreografia.js:239–240).</summary>
        public const double NappulanLahdonViiveMs = 300, NappulanSaapumiseroMs = 280;
        /// <summary>Saattoajon kestorajat (siirtokoreografia.js:241–242).</summary>
        public const double SiirtoajonLyhinMs = 1200, SiirtoajonPisinMs = 6200;
        /// <summary>Saaton trapetsin ramppi (siirtokoreografia.js:250 SAATON_RAMPPI).</summary>
        public const double SaatonRamppi = 0.3;
        /// <summary>Askel vähintään tämä osuus ruudun lyhyemmästä sivusta (siirtokoreografia.js:352).</summary>
        public const double AskelenVahinOsuus = 0.25;
        /// <summary>Ennakkozoomin pohjakesto ja hengähdys (siirtokoreografia.js:382–383).</summary>
        public const double EnnakkozoominMs = 760, EnnakonHengahdysMs = 120;
        /// <summary>Ennakkozoomin rajaus: lähtö ja reitin 2. askel (siirtokoreografia.js:409 ENNAKON_ASKELIA).</summary>
        public const int EnnakonAskelia = 2;
        /// <summary>Saattoa ei ajeta, jos matka ruudulla &lt; max(24 pt, 6 % leveydestä) (siirtokoreografia.js:432–433).</summary>
        public const double SaatonVahinPx = 24, SaatonVahinOsuus = 0.06;
        /// <summary>Bussi ajaa saman matkan tässä osuudessa liftauksen ajasta (siirtokoreografia.js:559).</summary>
        public const double BussinVauhtikerroin = 0.6;
        /// <summary>Laivan matkarajauksen marginaali (siirtokoreografia.js:581 MATKARAJAUKSEN_MARGINAALI.sea).</summary>
        public const double LaivanMarginaali = 0.5;
        /// <summary>Matkarajauksen laatikko vähintään näin leveä ja korkea (siirtokoreografia.js:592).</summary>
        public const double MatkarajauksenVahinYks = 120;
        /// <summary>sovitaAjonKesto-lisän katto (siirtokoreografia.js:632 SOVITETUN_AJON_PISIN_MS).</summary>
        public const double SovitetunAjonPisinMs = 1800;
        /// <summary>Pallolaudan leveys: 12000 lautayksikköä = 360°, eli 1 yks = 0,03° (js/pallolauta/kamera.js:102).</summary>
        public const double LaudanLeveys = 12000;

        // ---- Kestot ----

        /// <summary>
        /// Yhden hypyn lentoaika jalkamatkalla, kun hyppyjä on n (siirtokoreografia.js:96 jalkamatkanAskel):
        /// 860 ms, kun askelia on 1–5, ja pitkällä heitolla kattoon mahtuva, vähintään 640 ms. JS:n Math.round.
        /// </summary>
        public static double JalkamatkanAskel(int askelia)
        {
            int n = Math.Max(1, askelia);
            double varattu = JalkamatkanKattoMs - (n - 1) * HypynTaukoMs;
            double mahtuva = varattu / n;
            return JsRound(Math.Max(JalkamatkanStepLyhinMs, Math.Min(JalkamatkanStepMs, mahtuva)));
        }

        /// <summary>Autokyydin askeltahti (siirtokoreografia.js:607 autokyydinAskel): bussilla round(askel × 0,6).</summary>
        public static double AutokyydinAskel(int askelia, bool bussi)
        {
            double perus = JalkamatkanAskel(askelia);
            return bussi ? JsRound(perus * BussinVauhtikerroin) : perus;
        }

        /// <summary>Yhden hypyn (tai bussilla askelen) kesto kulkutavan mukaan (ui.js:20645 ja 12908).</summary>
        public static double AskelMs(Tapa tapa, int askelia) =>
            tapa == Tapa.Laiva ? StepMs : AutokyydinAskel(askelia, tapa == Tapa.Bussi);

        /// <summary>Hyppiikö nappula (liftaus, laiva) vai ajaako se autokyytinä (bussi, ui.js:12910 kyyti: true).</summary>
        public static bool Hyppii(Tapa tapa) => tapa != Tapa.Bussi;

        /// <summary>
        /// Nappulan oma matka (ui.js:23310): n × askel, ja hyppyketjussa lisäksi (n − 1) × tauko. Esim. liftaus
        /// 3 askelta = 3 × 860 + 2 × 190 = 2960 ms, bussi 3 askelta = 3 × 516 = 1548 ms.
        /// </summary>
        public static double NappulanKestoMs(Tapa tapa, int askelia)
        {
            int n = Math.Max(1, askelia);
            return n * AskelMs(tapa, n) + (Hyppii(tapa) ? (n - 1) * HypynTaukoMs : 0);
        }

        /// <summary>Saattoajon kesto (siirtokoreografia.js:294 siirtoajonKesto): clamp(300 + nappula + 280, 1200, 6200).</summary>
        public static double SiirtoajonKesto(double nappulanKestoMs)
        {
            double kokonais = NappulanLahdonViiveMs + Math.Max(0, nappulanKestoMs) + NappulanSaapumiseroMs;
            return JsRound(Math.Min(SiirtoajonPisinMs, Math.Max(SiirtoajonLyhinMs, kokonais)));
        }

        /// <summary>
        /// Ajon kesto liikkeen mukaan (siirtokoreografia.js:633 sovitaAjonKesto): kesto × (1 + 0,5 × zoomioktaavit +
        /// 0,5 × panorointi ruutuina), lisä enintään 1800 ms:iin; lyhyempi kuin pyydetty ei tule.
        /// </summary>
        /// <param name="suhde">|ln(loppukorkeus / alkukorkeus)|</param>
        public static double SovitaAjonKesto(double kesto, double suhde, double matkaRuutuina)
        {
            double oktaavit = Math.Abs(suhde) / Math.Log(2.0);
            double kerroin = 1 + 0.5 * oktaavit + 0.5 * Math.Max(0, matkaRuutuina);
            return JsRound(Math.Max(kesto, Math.Min(SovitetunAjonPisinMs, kesto * kerroin)));
        }

        // ---- Käyrät ----

        /// <summary>
        /// Trapetsipehmennys (siirtokoreografia.js:272 siirtoajonPehmennys): smoothstep-tyyppiset rampit
        /// (a³ − a⁴/2), tasainen keskiosa; sama kuin PalloKierto.Pehmennys.
        /// </summary>
        public static double SiirtoajonPehmennys(double t, double ramppi = SaatonRamppi)
        {
            double x = Math.Min(1, Math.Max(0, t));
            double r = Math.Min(0.49, Math.Max(0.0001, ramppi));
            double v = 1 / (1 - r);
            if (x < r) { double a = x / r; return v * r * (a * a * a - a * a * a * a / 2); }
            if (x > 1 - r) { double b = (1 - x) / r; return 1 - v * r * (b * b * b - b * b * b * b / 2); }
            return v * (x - r / 2);
        }

        /// <summary>
        /// Hypyn vaihe (siirtokoreografia.js:450 hypynVaihe): vaakaliike neliöllinen ease-in-out, kaaren osuus
        /// huipusta 4t(1 − t), nolla päissä.
        /// </summary>
        public static (double e, double nousu) HypynVaihe(double t)
        {
            double x = Math.Min(1, Math.Max(0, t));
            return (NeliollinenEase(x), 4 * x * (1 - x));
        }

        /// <summary>Hypyn huippu ruudun pisteinä hypyn pituudesta (siirtokoreografia.js:462): 0,34 × pituus, 9–30.</summary>
        public static double HypynHuippu(double matkaPt) =>
            Math.Min(HypynKorkeusMax, Math.Max(HypynKorkeusMin, matkaPt * HypynKaari));

        /// <summary>Autokyydin käyrä (siirtokoreografia.js:489 autokyydinVaihe): neliöllinen ease-in-out.</summary>
        public static double AutokyydinVaihe(double t) => NeliollinenEase(Math.Min(1, Math.Max(0, t)));

        /// <summary>Matkapisteen kohdalla vauhti notkahtaa tähän osuuteen (siirtokoreografia.js:526 MATKAPISTEEN_VAUHTI).</summary>
        public const double MatkapisteenVauhti = 0.4;

        /// <summary>
        /// Bussin vaihekäyrä väleille n (siirtokoreografia.js:536 matkanVaihe): autokyydinVaihe ja sen päällä
        /// pisteiden aaltoilu u − (k/2π)·sin 2πu, k = 1 − 0,4. Jokainen piste osuu kohdalleen.
        /// </summary>
        public static double MatkanVaihe(double t, int valeja)
        {
            int n = Math.Max(1, valeja);
            double x = AutokyydinVaihe(t);
            if (n < 2) return x;
            if (x <= 0) return 0;
            if (x >= 1) return 1;
            double k = 1 - MatkapisteenVauhti;
            double raaka = x * n;
            int i = Math.Min(n - 1, (int)Math.Floor(raaka));
            double u = raaka - i;
            return (i + (u - k / (2 * Math.PI) * Math.Sin(2 * Math.PI * u))) / n;
        }

        static double NeliollinenEase(double x) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) * (-2 * x + 2) / 2;

        /// <summary>JavaScriptin Math.round (puolikas ylöspäin), ei pankkiirin pyöristystä.</summary>
        static double JsRound(double x) => Math.Floor(x + 0.5);

        // ---- Lauta (Millerin projektio, js/packs/fokus-grc.js:870 maailmankartta, js/fokusmitat.js teeProjektionKaavat) ----

        const double Rad = Math.PI / 180.0;
        static readonly double Skaala = LaudanLeveys / (2 * Math.PI);

        /// <summary>Laudan y leveysasteesta (Miller, ilman laudan pohjoisreunan siirtoa: vain erotuksia käytetään).</summary>
        public static double LautaY(double lat) => -1.25 * Math.Log(Math.Tan(Math.PI / 4 + 0.4 * lat * Rad)) * Skaala;

        /// <summary>Leveysaste laudan y:stä (LautaY:n käänteinen).</summary>
        public static double LatLaudalta(double y) => (Math.Atan(Math.Exp(-(y / Skaala) / 1.25)) - Math.PI / 4) / 0.4 / Rad;

        /// <summary>Pituusasteiden erotus b − a välillä [−180, 180).</summary>
        public static double LonEro(double a, double b) => ((b - a) % 360.0 + 540.0) % 360.0 - 180.0;

        /// <summary>Laudan x-erotus (pituusaste suoraan, 12000 yks = 360°).</summary>
        static double LautaDx(double lonA, double lonB) => LonEro(lonA, lonB) * LaudanLeveys / 360.0;

        /// <summary>Kahden pisteen välimatka laudan yksiköinä (webin pixelOf-erotus, Math.hypot).</summary>
        public static double LautaMatka((double lat, double lon) a, (double lat, double lon) b)
        {
            double dx = LautaDx(a.lon, b.lon), dy = LautaY(b.lat) - LautaY(a.lat);
            return Math.Sqrt(dx * dx + dy * dy);
        }

        /// <summary>Piste p siirrettynä laudalla (dx, dy) yksikköä.</summary>
        public static (double lat, double lon) SiirraLaudalla((double lat, double lon) p, double dx, double dy)
        {
            double lat = LatLaudalta(LautaY(p.lat) + dy);
            double lon = p.lon + dx * 360.0 / LaudanLeveys;
            return (Math.Max(-89.5, Math.Min(89.5, lat)), LonEro(0, lon));
        }

        // ---- Näkyvä leveys ↔ kameran korkeus (PalloKierto.MinKorkeus samalla kaavalla) ----

        /// <summary>Kameran korkeus (m), jolla ruudun leveys näyttää <paramref name="leveysYks"/> lautayksikköä.</summary>
        public static double KorkeusLeveydesta(double leveysYks, double fovPystyAst, double kuvasuhde, double sade)
        {
            double tanPysty = Math.Tan(fovPystyAst * Rad / 2);
            double asteet = leveysYks * 360.0 / LaudanLeveys;
            return asteet * Rad * sade / (2.0 * tanPysty * Math.Max(0.01, kuvasuhde));
        }

        /// <summary>KorkeusLeveydesta käänteisenä: näkyvä leveys lautayksikköinä korkeudesta (m).</summary>
        public static double LeveysKorkeudesta(double korkeusM, double fovPystyAst, double kuvasuhde, double sade)
        {
            double tanPysty = Math.Tan(fovPystyAst * Rad / 2);
            double asteet = korkeusM * 2.0 * tanPysty * Math.Max(0.01, kuvasuhde) / sade / Rad;
            return asteet * LaudanLeveys / 360.0;
        }

        // ---- Ennakkozoomi ----

        /// <summary>
        /// Näkyvä leveys (lautayksikköä ruudun leveydellä), jolla askel on vähintään <paramref name="osuus"/>
        /// ruudun lyhyemmästä sivusta (siirtokoreografia.js:367 askelenSiirtoleveys). NaN, jos mitat puuttuvat.
        /// </summary>
        public static double AskelenSiirtoleveys(double askelYks, double leveysPx, double korkeusPx, double osuus = AskelenVahinOsuus)
        {
            if (!(askelYks > 0) || !(leveysPx > 0) || !(korkeusPx > 0) || !(osuus > 0)) return double.NaN;
            return leveysPx * askelYks / (osuus * Math.Min(leveysPx, korkeusPx));
        }

        /// <summary>Askelvälien mediaani laudan yksiköinä (ui.js:22716 askelenNakymaleveys: valit[floor(n/2)]).</summary>
        public static double AskelMediaani(IList<(double lat, double lon)> pisteet)
        {
            if (pisteet == null || pisteet.Count < 2) return double.NaN;
            var valit = new List<double>();
            for (int i = 1; i < pisteet.Count; i++) valit.Add(LautaMatka(pisteet[i - 1], pisteet[i]));
            valit.Sort();
            return valit[valit.Count / 2];
        }

        public struct Ennakko
        {
            /// <summary>Kameran keskipiste ajon lopussa.</summary>
            public double Lat, Lon;
            /// <summary>Näkyvä leveys lautayksikköinä ajon lopussa (vähintään syvin sallittu).</summary>
            public double Leveys;
            /// <summary>Askelmittakaava (liftaus, bussi): saatto pitää tämän leveyden ja siirtyy nappulan verran.</summary>
            public bool Askelmittakaava;
            /// <summary>Ajon kesto sovitaAjonKesto-kaavalla (760–1800 ms).</summary>
            public double KestoMs;
        }

        /// <summary>
        /// Ennakkozoomin kohde (ui.js:22572 ennakoiSiirtoZoomi). <paramref name="pisteet"/>: ensimmäinen = lähtö,
        /// loput = askelpisteet (web from + path). Nykyinen näkymä: keskipiste (nytLat, nytLon) ja näkyvä leveys
        /// <paramref name="nytLeveys"/> lautayksikköinä. Ruutu pisteinä (leveysPt × korkeusPt), syvin sallittu
        /// näkyvä leveys <paramref name="syvinLeveys"/> (puhelin 40, muut 60 yks; PalloKierto.MinKorkeus).
        ///   Keskipiste: lähdön ja reitin min(2, n):nnen askeleen puoliväli laudalla (ENNAKON_ASKELIA).
        ///   Liftaus ja bussi: leveys = min(nyt, askelenSiirtoleveys(mediaani)), ei koskaan ulos pelaajan lähikuvasta.
        ///   Laiva: lähdön ja määränpään laatikko (vähintään 120 × 120 yks), marginaali 0,5 joka reunalla (vara 2),
        ///   leveys = max(w · 2, h · 2 · leveysPt / korkeusPt), keskipiste laatikon keskellä (ui.js:22731 matkarajaus,
        ///   kamera.js:840–866; pallon tarkka perspektiivisovitus korvattu tasokuvalla).
        /// Kesto: sovitaAjonKesto(760, |ln(leveys / nyt)|, panorointi / nykyinen näkyvä leveys).
        /// </summary>
        public static Ennakko Ennakkozoomi(IList<(double lat, double lon)> pisteet, Tapa tapa,
            double nytLat, double nytLon, double nytLeveys, double leveysPt, double korkeusPt, double syvinLeveys)
        {
            var e = new Ennakko { Lat = nytLat, Lon = nytLon, Leveys = nytLeveys, KestoMs = EnnakkozoominMs };
            if (pisteet == null || pisteet.Count < 2) return e;
            var lahto = pisteet[0];
            if (tapa == Tapa.Laiva)
            {
                var maali = pisteet[pisteet.Count - 1];
                double dx = LautaDx(lahto.lon, maali.lon), dy = LautaY(maali.lat) - LautaY(lahto.lat);
                double w = Math.Abs(dx), h = Math.Abs(dy);
                double wk = Math.Max(w, MatkarajauksenVahinYks), hk = Math.Max(h, MatkarajauksenVahinYks);
                double vara = 1 + 2 * LaivanMarginaali;
                var keski = SiirraLaudalla(lahto, dx / 2, dy / 2);
                e.Lat = keski.lat;
                e.Lon = keski.lon;
                e.Leveys = Math.Max(wk * vara, hk * vara * leveysPt / Math.Max(1e-6, korkeusPt));
            }
            else
            {
                var suunta = pisteet[Math.Min(EnnakonAskelia, pisteet.Count - 1)];
                double dx = LautaDx(lahto.lon, suunta.lon), dy = LautaY(suunta.lat) - LautaY(lahto.lat);
                var keski = SiirraLaudalla(lahto, dx / 2, dy / 2);
                e.Lat = keski.lat;
                e.Lon = keski.lon;
                double askelleveys = AskelenSiirtoleveys(AskelMediaani(pisteet), leveysPt, korkeusPt);
                if (!double.IsNaN(askelleveys))
                {
                    e.Askelmittakaava = true;
                    e.Leveys = nytLeveys > 0 ? Math.Min(nytLeveys, askelleveys) : askelleveys;
                }
            }
            e.Leveys = Math.Max(e.Leveys, syvinLeveys);
            double suhde = nytLeveys > 0 && e.Leveys > 0 ? Math.Abs(Math.Log(e.Leveys / nytLeveys)) : 0;
            double panAst = Math.Sqrt(Math.Pow(e.Lat - nytLat, 2) + Math.Pow(LonEro(nytLon, e.Lon), 2));
            double nakyvaAst = Math.Max(1e-6, nytLeveys * 360.0 / LaudanLeveys);
            e.KestoMs = SovitaAjonKesto(EnnakkozoominMs, suhde, panAst / nakyvaAst);
            return e;
        }

        // ---- Saatto ----

        public struct Saatto
        {
            /// <summary>Ajetaanko (matka ruudulla ylittää kynnyksen).</summary>
            public bool Ajetaan;
            public double Lat, Lon;
            /// <summary>Näkyvä leveys ajon lopussa; NaN = nykyinen korkeus pysyy.</summary>
            public double Leveys;
            /// <summary>Kameran matka ruudulla pisteinä ja kynnys (lokiin).</summary>
            public double MatkaPt, KynnysPt;
        }

        /// <summary>
        /// Saattoajon kohde (ui.js:22856 aloitaSaattavaKamera). Askelmittakaavalla (liftaus, bussi) kamera siirtyy
        /// nykyisestä keskipisteestään täsmälleen nappulan siirtymän (määränpää − lähtö) laudalla ja pitää ennakkozoomin
        /// leveyden; matka ruudulla = |siirtymä| × leveysPt / ennakon leveys. Muuten (laiva) kohde on määränpää
        /// nykyisellä korkeudella, matka = |määränpää − keskipiste| × leveysPt / nykyinen leveys. Kynnys
        /// max(24, 0,06 × leveysPt).
        /// </summary>
        public static Saatto Saattoajo((double lat, double lon) lahto, (double lat, double lon) maali, Ennakko ennakko,
            double nytLat, double nytLon, double nytLeveys, double leveysPt)
        {
            var s = new Saatto { Leveys = double.NaN, KynnysPt = Math.Max(SaatonVahinPx, leveysPt * SaatonVahinOsuus) };
            if (ennakko.Askelmittakaava && ennakko.Leveys > 0)
            {
                double dx = LautaDx(lahto.lon, maali.lon), dy = LautaY(maali.lat) - LautaY(lahto.lat);
                s.MatkaPt = Math.Sqrt(dx * dx + dy * dy) * leveysPt / ennakko.Leveys;
                var k = SiirraLaudalla((nytLat, nytLon), dx, dy);
                s.Lat = k.lat;
                s.Lon = k.lon;
                s.Leveys = ennakko.Leveys;
            }
            else
            {
                s.MatkaPt = nytLeveys > 0 ? LautaMatka((nytLat, nytLon), maali) * leveysPt / nytLeveys : 0;
                s.Lat = maali.lat;
                s.Lon = maali.lon;
            }
            s.Ajetaan = s.MatkaPt > s.KynnysPt;
            return s;
        }

        // ---- Aikataulu ----

        public struct Aikataulu
        {
            public Tapa Tapa;
            public int Askelia;
            /// <summary>Ennakkozoomi ja hengähdys; saatto alkaa niiden jälkeen.</summary>
            public double EnnakkoMs, HengahdysMs;
            /// <summary>Saattoajon kesto; nappula lähtee LahtoViiveMs saaton alusta.</summary>
            public double SaattoMs, LahtoViiveMs;
            /// <summary>Yhden hypyn (tai bussin askelen) kesto ja hyppyjen välinen tauko.</summary>
            public double AskelMs, TaukoMs;
            /// <summary>Nappulan koko matka (NappulanKestoMs).</summary>
            public double NappulaMs;

            public double SaattoAlkaaMs => EnnakkoMs + HengahdysMs;
            public double NappulaLahteeMs => SaattoAlkaaMs + LahtoViiveMs;
            public double NappulaPerillaMs => NappulaLahteeMs + NappulaMs;
            /// <summary>Koko liike: valmis-kutsu, kun nappula on perillä ja saatto päättynyt.</summary>
            public double KokonaisMs => Math.Max(NappulaPerillaMs, SaattoAlkaaMs + SaattoMs);

            /// <summary>Kaikki ajat kerrottuna k:lla (vanha Nappula.Aja-rajapinta mahtuu Pelikoodarin kestoon).</summary>
            public Aikataulu Skaalattu(double k)
            {
                var a = this;
                a.EnnakkoMs *= k; a.HengahdysMs *= k; a.SaattoMs *= k; a.LahtoViiveMs *= k;
                a.AskelMs *= k; a.TaukoMs *= k; a.NappulaMs *= k;
                return a;
            }
        }

        /// <summary>
        /// Koko siirron aikataulu. <paramref name="ennakkoMs"/> = Ennakkozoomi(...).KestoMs, tai 0, jos kameraa ei
        /// ajeta (silloin myös hengähdys ja lähtöviive ovat 0 ja nappula lähtee heti).
        /// </summary>
        public static Aikataulu Laske(Tapa tapa, int askelia, double ennakkoMs, bool kamera = true)
        {
            int n = Math.Max(1, askelia);
            double nappula = NappulanKestoMs(tapa, n);
            return new Aikataulu
            {
                Tapa = tapa,
                Askelia = n,
                EnnakkoMs = kamera ? Math.Max(0, ennakkoMs) : 0,
                HengahdysMs = kamera ? EnnakonHengahdysMs : 0,
                SaattoMs = kamera ? SiirtoajonKesto(nappula) : 0,
                LahtoViiveMs = kamera ? NappulanLahdonViiveMs : 0,
                AskelMs = AskelMs(tapa, n),
                TaukoMs = Hyppii(tapa) ? HypynTaukoMs : 0,
                NappulaMs = nappula,
            };
        }

        /// <summary>
        /// Nappulan paikka matkan ajassa <paramref name="ms"/> (0 = lähtö): hyppyketjussa (hyppy i, vaakavaihe e,
        /// kaaren osuus nousu), taukojen aikana nappula seisoo pisteessä (nousu 0). Autokyydissä i ja e ovat
        /// matkanVaiheesta (ei nousua). <paramref name="valeja"/> = pisteiden määrä − 1.
        /// </summary>
        public static (int i, double e, double nousu) NappulanVaihe(Aikataulu a, int valeja, double ms)
        {
            int n = Math.Max(1, valeja);
            if (ms <= 0) return (0, 0, 0);
            if (!Hyppii(a.Tapa))
            {
                double p = MatkanVaihe(ms / Math.Max(1e-6, a.NappulaMs), n);
                double raaka = p * n;
                int i = Math.Min(n - 1, (int)Math.Floor(raaka));
                return (i, raaka - i, 0);
            }
            // Hyppyjen määrä tulee pisteistä; askeleen kesto ja tauko aikataulusta.
            double jakso = a.AskelMs + a.TaukoMs;
            int h = (int)Math.Floor(ms / Math.Max(1e-6, jakso));
            if (h >= n) return (n - 1, 1, 0);
            double sisalla = ms - h * jakso;
            if (sisalla >= a.AskelMs) return (h, 1, 0);
            var v = HypynVaihe(sisalla / Math.Max(1e-6, a.AskelMs));
            return (h, v.e, v.nousu);
        }

        /// <summary>Hyppyketjun kesto pisteiden määrällä (valeja × askel + (valeja − 1) × tauko).</summary>
        public static double HyppyketjunMs(Aikataulu a, int valeja)
        {
            int n = Math.Max(1, valeja);
            return Hyppii(a.Tapa) ? n * a.AskelMs + (n - 1) * a.TaukoMs : a.NappulaMs;
        }
    }
}
