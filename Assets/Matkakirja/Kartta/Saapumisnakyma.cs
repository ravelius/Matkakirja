// SAAPUMISNÄKYMÄ — webin pallolaudan saapumisajo natiiviin (omistajan sitova sääntö WEB ON MALLI, MITATTUNA).
//
// Puhdas funktio ilman UnityEngineä: syöte on maan saapumislaatikko (laudan yksiköissä), pelaajan kaupunki,
// ruudun koko pisteinä, pystysuunnan FOV ja pistekerroin; tulos on kameran keskipiste (lat, lon), korkeus
// pallonsäteinä, kallistus 0 ja suunta 0 (pohjoinen ylös). Kaikki luvut ja kaavat on luettu webin koodista
// (origin/main 4d6b01ff7, 24.9.2026), eivät muistista; lähteet tiedosto:rivi vakioiden kohdalla ja mittaukset
// /Users/Shared/Claude/proto-3d/lokit/pariteetti-saapuminen/mitat.md.
//
// WEBIN KETJU (js/pallolauta/lauta.js saavu 5407 → saapumislaatikko 5396 → kamera.js kotiin 1170 →
// ajaKamera → kameranKohde 823). Kutsujat: ui.js palaaMaanRajaukseen 22814 (maa- ja merimatka kaupunkiin),
// siirto.js laske 678–679 (lento; avauslento kotiin ilman laatikkoa), ui.js 4378 (laudan avaus),
// lauta.js 5314 (paikanvaihto ilman siirtoa). Natiivissa PeliOhjain.Saavu → PalloKierto.AjaSaapumisnakymaan.
//   1. LAATIKKO = maan mantereen lautalaatikko (js/maanaariviivat.js:240 maanLautalaatikko: pelaajan
//      kaupungin rengas + renkaat, jotka ovat enintään SAARIVARA 0,2 × pidempi sivu päässä), väljennettynä
//      5 % joka suuntaan (js/pallolauta/maapaneeli.js:729 SAAPUMISEN_VARA, 744 paneelinLaatikko). EI
//      FOKUS_POHJAT-lehteä (js/packs/fokus-grc.js): se on nostotason ja entisen lehtikuvan laatikko.
//   2. KATTO (kamera.js:1041 laatikkoMahtuu): max(w, h · leveys/korkeus) × 1,10 ≤ 2000 lautayksikköä,
//      muuten entinen kaupunkinäkymä (RUS, USA, CAN, GRL, CHN).
//   3. KAPEA RUUTU SOVITETAAN KORKEUTEEN (kamera.js:710–820 korkeuteenSovitus, PÄÄTÖKSET 17): jos
//      vaakasuunta vaatii kauemmas kuin pystysuunta, korkeus tulee pystysuunnasta ja keskipisteen pituus
//      on pelaajan kaupunki rajattuna vyöhykkeeseen [länsireuna + puoli, itäreuna − puoli].
//      Leveysaste on laatikon keskipisteen leveysaste (EI kaupungin, ei pohjoiseen siirtoa).
//   4. MUUTEN MOLEMPIIN SUUNTIIN (kamera.js:615–675 pallonKorkeus): perspektiivin suljettu kaava laatikon
//      kehän 4 × 13 näytteestä, keskipiste = laatikon keskipiste laudalla.
//      Vara on molemmissa 1 + 2 × 0,01 = 1,02 (kamera.js:143 SAAPUMISRAJAUKSEN_MARGINAALI).
//   5. KORKEUS RAJATAAN [lähin, 2,5] (kamera.js:878 kameranKohde): lähin = 60 lautayksikköä ruudun leveydellä,
//      puhelimella (≤ 480 pt ja dpr ≥ 2) 40 (kamera.js:375–447).
//   6. KAUPUNKINÄKYMÄ (ei laatikkoa tai katto ylittyy): 240 lautayksikköä ruudun leveydellä ja
//      kohdistuspiste siirretään niin, että kaupunki on kohdassa (0,42; 0,78) ruudusta
//      (js/saapumisasento.js:63 SAAPUMISEN_KAUPUNKI, 123 saapumisenPallonKohta).
//   Ajo: 1400 ms (kamera.js:232 PALLOKAMERAN_AJO_MS), trapetsi ramppi 0,3 (js/siirtokoreografia.js:250,272),
//   korkeus logaritmisesti, lat/lon suoraan. Kallistus 0 (kallistus vain kokeena, js/pallolauta/kallistus.js:88).
//
// LAUDAN YKSIKÖT → ASTEET: maailmankartan lauta on Millerin lieriö (js/packs/fokus-grc.js:871: leveys
// 12000, lon0 −175, pohjoinen 76; kaavat js/fokusmitat.js:175 teeProjektionKaavat):
//   x = ((lon − lon0) rad mod 2π) · 12000 / 2π          (12000 yksikköä = 360°, 1° = 33,33 yksikköä)
//   y = (M(lat) − M(76)) · 12000 / 2π,  M(φ) = −1,25 · ln tan(π/4 + 0,4 φ)
// ASTEET → METRIT: webin korkeus on pallonsäteinä (Globe.gl altitude); natiivin korkeus metreinä
// = säteet × 6 378 137 (CesiumWgs84Ellipsoid.GetMaximumRadius, sama kuin PalloKierto.KorkeusKaarelle).
//
// KOTELO → KOKO RUUTU (löydös 50, 25.9.2026): webin pallo piirtyy karttaruutuun (.map-pane / .pallo-kotelo), joka
// alkaa yläpalkin alta ja jättää reunavaran (iPhone 402 × 874: kotelo 8,19 / 64,78 / 385,6 × 801,0 pt), ja FOV 50°
// koskee KOTELON korkeutta. Natiivin kamera kattaa koko ruudun (874 pt) samalla FOV:lla, joten sama korkeus
// pallonsäteinä antoi 874 / 801 = 1,09 × webin mittakaavan (Ranska iPhone 79 vs 72,8 px/°lat, iPad 834 × 1210
// 1,07 ×) ja keskipiste oli 28 pt (iPad 31 pt) liian ylhäällä. LaskeRuudulle laskee webin näkymän kotelolle
// (WebinKotelo, mitattu) ja siirtää sen natiivin kameraan: sama pistettä/radiaani-mittakaava
// (korkeus × s_ruutu / s_kotelo) ja webin keskipiste kotelon keskelle ruudulla.
using System;
using System.Collections.Generic;

namespace Matkakirja
{
    public static class Saapumisnakyma
    {
        // ---- Laudan projektio (js/packs/fokus-grc.js:871, js/fokusmitat.js:279–300) ----
        public const double LaudanLeveys = 12000.0;
        public const double LaudanLon0 = -175.0;
        public const double LaudanPohjoinen = 76.0;

        // ---- Kameran vakiot (js/pallolauta/kamera.js) ----
        /// <summary>PALLO_FOV (kamera.js:80): pystysuunnan avauskulma.</summary>
        public const double PalloFov = 50.0;
        /// <summary>PALLO_KORKEUS_MAX (kamera.js:82): kaukaisin korkeus pallonsäteinä.</summary>
        public const double KorkeusMax = 2.5;
        /// <summary>SAAPUMISRAJAUKSEN_MARGINAALI (kamera.js:143): vara = 1 + 2 × 0,01.</summary>
        public const double Marginaali = 0.01;
        /// <summary>SAAPUMISRAJAUKSEN_MAX (kamera.js:159): katto lautayksikköinä (60°).</summary>
        public const double RajausMax = 2000.0;
        /// <summary>SAAPUMISRAJAUKSEN_KATTOVARA (kamera.js:170).</summary>
        public const double KattoVara = 1.10;
        /// <summary>SAAPUMISEN_VARA (maapaneeli.js:729): laatikon väljennys joka suuntaan.</summary>
        public const double SaapumisenVara = 0.05;
        /// <summary>SAARIVARA (maanaariviivat.js:172): saaren suurin etäisyys laatikon pidemmästä sivusta.</summary>
        public const double Saarivara = 0.2;
        /// <summary>PALLOLAUDAN_SAAPUMISLEVEYS (kamera.js:111): kaupunkinäkymä lautayksikköinä ruudun leveydellä.</summary>
        public const double Saapumisleveys = 240.0;
        /// <summary>PALLOLAUDAN_LAHIN_LEVEYS = PALLOLAUDAN_SIIRTOLEVEYS 120 / 2 (kamera.js:230, 375).</summary>
        public const double LahinLeveys = 60.0;
        /// <summary>PUHELIMEN_LAHIZOOMIN_KERROIN (kamera.js:419).</summary>
        public const double PuhelimenKerroin = 1.5;
        /// <summary>PUHELIMEN_RUUTU_PX (kamera.js:421), css-px = iOS pt.</summary>
        public const double PuhelimenRuutu = 480.0;
        /// <summary>PERIMETRIN_NAYTTEET (kamera.js:615), KORKEUSSOVITUKSEN_HAARUKAT ja _KIERROKSET (kamera.js:710–711).</summary>
        public const int Naytteet = 12, Haarukat = 24, Kierrokset = 3;
        /// <summary>SAAPUMISEN_KAUPUNKI (saapumisasento.js:63): kaupunki ruudulla kaupunkinäkymässä (x oikealle, y alas).</summary>
        public const double KaupunkiX = 0.42, KaupunkiY = 0.78;
        /// <summary>PALLOKAMERAN_AJO_MS 1400 (kamera.js:232) ja MATKARAJAUKSEN_PALUU_MS 1400 (siirtokoreografia.js:599).</summary>
        public const float AjoS = 1.4f;
        /// <summary>SAATON_RAMPPI (siirtokoreografia.js:250): webin siirtoajonPehmennys-trapetsin ramppi (PalloKierto.Pehmennys).</summary>
        public const double Ramppi = 0.3;
        /// <summary>WGS84:n iso akseli: pallonsäteet → metrit (PalloKierto.KorkeusKaarelle käyttää samaa).</summary>
        public const double Sade = 6378137.0;

        const double Rad = Math.PI / 180.0;
        static readonly double Skaala = LaudanLeveys / (2.0 * Math.PI);
        static readonly double YPohjoinen = MillerY(LaudanPohjoinen);

        /// <summary>Laatikko laudan yksiköissä (x itään, y etelään), kuten webin { x, y, w, h }.</summary>
        public readonly struct Laatikko
        {
            public readonly double X, Y, W, H;
            public Laatikko(double x, double y, double w, double h) { X = x; Y = y; W = w; H = h; }
            public override string ToString() => $"{{x {X:0.##}, y {Y:0.##}, w {W:0.##}, h {H:0.##}}}";
        }

        /// <summary>Mikä sääntö näkymän antoi.</summary>
        public enum Tapa { Korkeuteen, Molempiin, Kaupunkinakyma }

        public struct Tulos
        {
            /// <summary>Kameran keskipiste (katsottava piste pinnalla).</summary>
            public double Lat, Lon;
            /// <summary>Korkeus pallonsäteinä (Globe.gl altitude); metreinä × <see cref="Sade"/>.</summary>
            public double Korkeus;
            /// <summary>Webin lähin sallittu korkeus tällä ruudulla (pallonsäteinä).</summary>
            public double KorkeusMin;
            /// <summary>Näkyvä leveys lautayksikköinä ruudun leveydellä.</summary>
            public double NakyvaLeveys;
            /// <summary>Kallistus (0 = suoraan alas) ja suunta (0 = pohjoinen ylös), asteina.</summary>
            public double Kallistus, Suunta;
            public Tapa Tapa;
            /// <summary>Sovitettu laatikko (väljennetty), tai null kaupunkinäkymässä.</summary>
            public Laatikko? Laatikko;
            /// <summary>
            /// Webin oma näkymä kotelossa (<see cref="LaskeRuudulle"/>: pov lat/lng ja altitude, joita webin mittaukset
            /// raportoivat); <see cref="Laske"/> antaa samat kuin Lat, Lon ja Korkeus.
            /// </summary>
            public double WebLat, WebLon, WebKorkeus;
            public double KorkeusMetreina => Korkeus * Sade;
        }

        /// <summary>Webin kotelo (karttaruutu) pisteinä ruudun vasemmasta yläkulmasta (y alas).</summary>
        public readonly struct Kotelo
        {
            public readonly double X, Y, W, H;
            public Kotelo(double x, double y, double w, double h) { X = x; Y = y; W = w; H = h; }
            public override string ToString() => $"{{x {X:0.##}, y {Y:0.##}, w {W:0.##}, h {H:0.##}}}";
        }

        // ---- Webin kotelo (mitattu 25.9.2026 matkakirja.app, Chromium ilman turva-alueita; lokit/pariteetti-b12/
        //      web-nostot-kartalla-mitat.txt raakamitat "kotelo"): reuna = .app-täyte + .map-pane-reunus,
        //      palkki = .topbar pystyssä. Vaakatilassa palkki on piilossa (web @media landscape + coarse pointer,
        //      natiivissa Ylapalkki.Piilossa), joten kotelo alkaa reunavaran alta. ----
        /// <summary>Kotelon reunavara puhelimella (lyhyt sivu ≤ 480 pt) ja muuten.</summary>
        public const double KoteloReunaPuhelin = 8.1875, KoteloReunaTabletti = 10.59375;
        /// <summary>Yläpalkki kotelon yllä pystyssä: puhelin 64,78 − 8,19, tabletti 71,97 − 10,59.</summary>
        public const double PalkkiPuhelin = 56.59375, PalkkiTabletti = 61.375;

        /// <summary>
        /// Webin kotelo tälle ruudulle pisteinä: iPhone 402 × 874 → (8,19; 64,78; 385,63 × 801,03), iPad 834 × 1210 →
        /// (10,59; 71,97; 812,81 × 1127,44), iPad vaaka 1194 × 834 → (10,59; 10,59; 1172,81 × 812,81).
        /// </summary>
        public static Kotelo WebinKotelo(double leveysPt, double korkeusPt)
        {
            if (!(leveysPt > 0) || !(korkeusPt > 0)) return new Kotelo(0, 0, Math.Max(0, leveysPt), Math.Max(0, korkeusPt));
            bool puhelin = Math.Min(leveysPt, korkeusPt) <= PuhelimenRuutu;
            double reuna = puhelin ? KoteloReunaPuhelin : KoteloReunaTabletti;
            double yla = reuna + (korkeusPt > leveysPt ? (puhelin ? PalkkiPuhelin : PalkkiTabletti) : 0);
            double w = leveysPt - 2 * reuna, h = korkeusPt - yla - reuna;
            if (!(w > 0) || !(h > 0)) return new Kotelo(0, 0, leveysPt, korkeusPt);
            return new Kotelo(reuna, yla, w, h);
        }

        // ------------------------------------------------------------------ projektio

        static double MillerY(double lat) => -1.25 * Math.Log(Math.Tan(Math.PI / 4.0 + 0.4 * lat * Rad));

        /// <summary>Laudalta asteiksi (fokusmitat.js:279 laudaltaAsteiksi); pituus välille −180…180.</summary>
        public static (double Lon, double Lat) LaudaltaAsteiksi(double x, double y)
        {
            double lon = LaudanLon0 + x / Skaala / Rad;
            double my = y / Skaala + YPohjoinen;
            double lat = (Math.Atan(Math.Exp(-my / 1.25)) - Math.PI / 4.0) / 0.4 / Rad;
            if (double.IsFinite(lon)) { while (lon > 180) lon -= 360; while (lon < -180) lon += 360; }
            return (lon, lat);
        }

        /// <summary>Asteista laudalle (fokusmitat.js:291 projisoiLaudalle); x välille 0…12000.</summary>
        public static (double X, double Y) ProjisoiLaudalle(double lon, double lat)
        {
            double d = (lon - LaudanLon0) * Rad, k = 2.0 * Math.PI;
            return (((d % k) + k) % k * Skaala, (MillerY(lat) - YPohjoinen) * Skaala);
        }

        // ------------------------------------------------------------------ laatikko

        /// <summary>
        /// Maan lautalaatikko (maanaariviivat.js:240 maanLautalaatikko) renkaista asteina (maarajat.json
        /// renkaat). Ankkuri on pelaajan kaupungin sisältävä rengas (laatikolla, useasta pisteikkäin), muuten
        /// pisteikkäin rengas; siihen liitetään renkaat, jotka ovat enintään <see cref="Saarivara"/> × pidempi
        /// sivu päässä kasvavasta laatikosta. Sauma puretaan kuten webissä. null = ei renkaita.
        /// </summary>
        public static Laatikko? MaanLautalaatikko(IEnumerable<(double Lon, double Lat)[]> renkaat, double kaupunkiLat, double kaupunkiLon)
        {
            if (renkaat == null) return null;
            const double leveys = LaudanLeveys, puoli = LaudanLeveys / 2.0;
            var palat = new List<(Laatikko l, int n)>();
            foreach (var r in renkaat)
            {
                if (r == null || r.Length < 3) continue;
                double x0 = double.PositiveInfinity, x1 = double.NegativeInfinity, y0 = double.PositiveInfinity, y1 = double.NegativeInfinity;
                double kierto = 0, edellinen = double.NaN;
                int n = 0;
                foreach (var p in r)
                {
                    var (x, y) = ProjisoiLaudalle(p.Lon, p.Lat);
                    if (!double.IsFinite(x) || !double.IsFinite(y)) continue;
                    // Rengas yhtenäiseksi: peräkkäiset pisteet eivät saa hypätä laudan yli (web avaa).
                    if (!double.IsNaN(edellinen))
                    {
                        while (x + kierto - edellinen > puoli) kierto -= leveys;
                        while (x + kierto - edellinen < -puoli) kierto += leveys;
                    }
                    edellinen = x + kierto;
                    x0 = Math.Min(x0, edellinen); x1 = Math.Max(x1, edellinen);
                    y0 = Math.Min(y0, y); y1 = Math.Max(y1, y);
                    n++;
                }
                if (n >= 3) palat.Add((new Laatikko(x0, y0, x1 - x0, y1 - y0), n));
            }
            if (palat.Count == 0) return null;

            var (kx, ky) = ProjisoiLaudalle(kaupunkiLon, kaupunkiLat);
            int ankkuri = -1;
            if (double.IsFinite(kx) && double.IsFinite(ky))
                for (int i = 0; i < palat.Count; i++)
                {
                    var l = palat[i].l;
                    double siirto = 0, keski = l.X + l.W / 2;
                    while (kx + siirto - keski > puoli) siirto -= leveys;
                    while (kx + siirto - keski < -puoli) siirto += leveys;
                    double px = kx + siirto;
                    bool osuu = px >= l.X && px <= l.X + l.W && ky >= l.Y && ky <= l.Y + l.H;
                    if (osuu && (ankkuri < 0 || palat[i].n > palat[ankkuri].n)) ankkuri = i;
                }
            if (ankkuri < 0)
                for (int i = 0; i < palat.Count; i++)
                    if (ankkuri < 0 || palat[i].n > palat[ankkuri].n) ankkuri = i;

            var a = palat[ankkuri].l;
            double ankkuriX = a.X + a.W / 2;
            var muut = new List<Laatikko>();
            for (int i = 0; i < palat.Count; i++)
            {
                if (i == ankkuri) continue;
                var l = palat[i].l;
                double siirto = 0, keski = l.X + l.W / 2;
                while (keski + siirto - ankkuriX > puoli) siirto -= leveys;
                while (keski + siirto - ankkuriX < -puoli) siirto += leveys;
                muut.Add(new Laatikko(l.X + siirto, l.Y, l.W, l.H));
            }
            var laatikko = a;
            bool kasvoi = true;
            while (kasvoi)
            {
                kasvoi = false;
                double vara = Saarivara * Math.Max(laatikko.W, laatikko.H);
                for (int i = muut.Count - 1; i >= 0; i--)
                {
                    if (Etaisyys(laatikko, muut[i]) <= vara)
                    {
                        laatikko = Yhdista(laatikko, muut[i]);
                        muut.RemoveAt(i);
                        kasvoi = true;
                    }
                }
            }
            if (!(laatikko.W > 0) || !(laatikko.H > 0)) return null;
            return laatikko;
        }

        /// <summary>
        /// Maarajat-kokoelman (sisältöpaketti, jäsennetty MiniJsonilla: Dictionary/List/double) renkaat maittain
        /// asteina. Mukaan tulevat sekä <c>renkaat</c> että <c>muutRenkaat</c> (skeema 1.29: webin laudan
        /// maamuodon ulkopuoliset, esim. Shetland ja Kuriilit): web laskee laatikon maan KAIKISTA renkaista
        /// (maapolygonit.json), ja merentakaiset osat karsii <see cref="MaanLautalaatikko"/> itse (SAARIVARA).
        /// </summary>
        public static Dictionary<string, List<(double Lon, double Lat)[]>> LueMaarajat(object kokoelma)
        {
            var ulos = new Dictionary<string, List<(double Lon, double Lat)[]>>();
            var alkiot = kokoelma is Dictionary<string, object> juuri && juuri.TryGetValue("alkiot", out var a)
                ? a as List<object> : kokoelma as List<object>;
            if (alkiot == null) return ulos;
            foreach (var o in alkiot)
            {
                if (!(o is Dictionary<string, object> maa) || !maa.TryGetValue("id", out var id) || !(id is string iso)) continue;
                var renkaat = new List<(double Lon, double Lat)[]>();
                foreach (var kentta in new[] { "renkaat", "muutRenkaat" })
                {
                    if (!maa.TryGetValue(kentta, out var lista) || !(lista is List<object> rr)) continue;
                    foreach (var r in rr)
                    {
                        if (!(r is List<object> pisteet)) continue;
                        var rengas = new List<(double Lon, double Lat)>(pisteet.Count);
                        foreach (var p in pisteet)
                            if (p is List<object> xy && xy.Count >= 2 && xy[0] is double lon && xy[1] is double lat)
                                rengas.Add((lon, lat));
                        if (rengas.Count >= 3) renkaat.Add(rengas.ToArray());
                    }
                }
                if (renkaat.Count > 0) ulos[iso] = renkaat;
            }
            return ulos;
        }

        static Laatikko Yhdista(Laatikko a, Laatikko b)
        {
            double x0 = Math.Min(a.X, b.X), y0 = Math.Min(a.Y, b.Y);
            double x1 = Math.Max(a.X + a.W, b.X + b.W), y1 = Math.Max(a.Y + a.H, b.Y + b.H);
            return new Laatikko(x0, y0, x1 - x0, y1 - y0);
        }

        static double Etaisyys(Laatikko a, Laatikko b)
        {
            double dx = Math.Max(0, Math.Max(a.X - (b.X + b.W), b.X - (a.X + a.W)));
            double dy = Math.Max(0, Math.Max(a.Y - (b.Y + b.H), b.Y - (a.Y + a.H)));
            return Math.Sqrt(dx * dx + dy * dy);
        }

        /// <summary>Saapumislaatikko = maan laatikko väljennettynä 5 % joka suuntaan (maapaneeli.js:732 saapumisenValjennys).</summary>
        public static Laatikko Valjenna(Laatikko l)
        {
            if (!(l.W > 0) || !(l.H > 0)) return l;
            double dx = SaapumisenVara * l.W, dy = SaapumisenVara * l.H;
            return new Laatikko(l.X - dx, l.Y - dy, l.W + 2 * dx, l.H + 2 * dy);
        }

        /// <summary>Mahtuuko laatikko saapumisrajaukseen (kamera.js:1022 laatikonTarve, 1041 laatikkoMahtuu).</summary>
        public static bool LaatikkoMahtuu(Laatikko l, double kuvasuhde)
        {
            if (!(l.W > 0) || !(l.H > 0)) return false;
            double tarve = Math.Max(l.W * KattoVara, l.H * KattoVara * kuvasuhde);
            return tarve <= RajausMax;
        }

        // ------------------------------------------------------------------ leveys ↔ korkeus

        /// <summary>Tasokuvan kerroin: astetta korkeusyksikköä kohti (kamera.js:264).</summary>
        static double TasoKerroin(double fov) => 2.0 * Math.Tan(fov / 2.0 * Rad) * (180.0 / Math.PI);

        /// <summary>Näkyvä leveys (lautayksikköä ruudun leveydellä) → korkeus pallonsäteinä (kamera.js:275).</summary>
        public static double KorkeusLeveydesta(double leveysYks, double kuvasuhde, double fov = PalloFov, double min = 0)
        {
            if (!(leveysYks > 0)) return KorkeusMax;
            double asteet = leveysYks * 360.0 / LaudanLeveys;
            double taso = asteet / (Math.Max(0.01, kuvasuhde) * TasoKerroin(fov));
            double kaari = asteet < 180 ? 1.0 / Math.Cos(asteet / 2.0 * Rad) - 1.0 : double.PositiveInfinity;
            return Math.Min(KorkeusMax, Math.Max(min, Math.Max(taso, kaari)));
        }

        /// <summary>Korkeus → näkyvä leveys lautayksikköinä (kamera.js:450 leveysKorkeudesta).</summary>
        public static double LeveysKorkeudesta(double korkeus, double kuvasuhde, double fov = PalloFov)
        {
            double h = Math.Max(1e-6, korkeus);
            double tasoAsteet = h * TasoKerroin(fov) * Math.Max(0.01, kuvasuhde);
            double kaariAsteet = 2.0 * Math.Acos(1.0 / (1.0 + h)) * (180.0 / Math.PI);
            double asteet = Math.Min(360.0, Math.Min(tasoAsteet, kaariAsteet));
            return asteet / 360.0 * LaudanLeveys;
        }

        /// <summary>Lähin sallittu korkeus (kamera.js:427 lahizoominSyvennys, 437 lahinLeveys, 442 lahinKorkeus).</summary>
        public static double KorkeusMin(double leveysPt, double korkeusPt, double fov = PalloFov, double dpr = 1)
        {
            bool puhelin = leveysPt > 0 && leveysPt <= PuhelimenRuutu && dpr >= 2;
            double syvennys = puhelin ? PuhelimenKerroin : 1.0;
            return KorkeusLeveydesta(LahinLeveys / syvennys, Kuvasuhde(leveysPt, korkeusPt), fov, 0);
        }

        static double Kuvasuhde(double leveys, double korkeus) =>
            leveys > 0 && korkeus > 0 ? leveys / korkeus : 1.0;

        // ------------------------------------------------------------------ perspektiivi (kamera.js:516–820)

        /// <summary>Laatikon kehän näytepisteet asteina (kamera.js:617 kehanAsteet).</summary>
        static List<(double Lat, double Lon)> KehanAsteet(Laatikko l)
        {
            if (!(l.W > 0) || !(l.H > 0)) return null;
            var ulos = new List<(double, double)>(4 * (Naytteet + 1));
            for (int i = 0; i <= Naytteet; i++)
            {
                double t = (double)i / Naytteet;
                Lisaa(l.X + l.W * t, l.Y);
                Lisaa(l.X + l.W * t, l.Y + l.H);
                Lisaa(l.X, l.Y + l.H * t);
                Lisaa(l.X + l.W, l.Y + l.H * t);
            }
            return ulos.Count > 0 ? ulos : null;

            void Lisaa(double x, double y)
            {
                var a = LaudaltaAsteiksi(x, y);
                if (double.IsFinite(a.Lat)) ulos.Add((a.Lat, a.Lon));
            }
        }

        /// <summary>Akseli: 0 = molemmat, 1 = vain vaaka (X), 2 = vain pysty (Y).</summary>
        static double KehanTarve(List<(double Lat, double Lon)> pisteet, double lat0, double lng0, double vara, int akseli, double kuvasuhde, double fov)
        {
            double sin0 = Math.Sin(lat0 * Rad), cos0 = Math.Cos(lat0 * Rad);
            double T = Math.Tan(fov / 2.0 * Rad), A = Math.Max(0.01, kuvasuhde);
            double etaisyys = 0;
            foreach (var p in pisteet)
            {
                double lat = p.Lat * Rad, dLng = (p.Lon - lng0) * Rad;
                double sinP = Math.Sin(lat), cosP = Math.Cos(lat), cosDl = Math.Cos(dLng);
                double syvyysOsa = sinP * sin0 + cosP * cos0 * cosDl;
                double sivu = Math.Abs(cosP * Math.Sin(dLng)) / (T * A);
                double pysty = Math.Abs(sinP * cos0 - cosP * sin0 * cosDl) / T;
                double osa = akseli == 1 ? sivu : akseli == 2 ? pysty : Math.Max(sivu, pysty);
                double tarve = syvyysOsa + vara * osa;
                if (tarve > etaisyys) etaisyys = tarve;
            }
            return etaisyys;
        }

        /// <summary>Korkeus molempiin suuntiin laatikon keskipisteestä (kamera.js:667 pallonKorkeus); NaN = ei ratkea.</summary>
        static double PallonKorkeus(Laatikko l, double vara, double kuvasuhde, double fov)
        {
            var pisteet = KehanAsteet(l);
            if (pisteet == null) return double.NaN;
            var keski = LaudaltaAsteiksi(l.X + l.W / 2, l.Y + l.H / 2);
            if (!double.IsFinite(keski.Lat)) return double.NaN;
            double etaisyys = KehanTarve(pisteet, keski.Lat, keski.Lon, vara, 0, kuvasuhde, fov);
            if (!(etaisyys > 1)) return double.NaN;
            return Math.Min(KorkeusMax, etaisyys - 1);
        }

        /// <summary>Pienin |Δlng|, jolla koko reunameridiaani on ruudun laidassa tai ulkona (kamera.js:723 reunanPuoli).</summary>
        static double ReunanPuoli(double latMin, double latMax, double lat0, double etaisyys, double kuvasuhde, double fov)
        {
            double sin0 = Math.Sin(lat0 * Rad), cos0 = Math.Cos(lat0 * Rad);
            double T = Math.Tan(fov / 2.0 * Rad), A = Math.Max(0.01, kuvasuhde);
            double PieninTarve(double u)
            {
                double cosDl = Math.Cos(u * Rad), sinDl = Math.Sin(u * Rad);
                double pienin = double.PositiveInfinity;
                for (int i = 0; i <= Naytteet; i++)
                {
                    double lat = (latMin + (latMax - latMin) * i / Naytteet) * Rad;
                    double sinP = Math.Sin(lat), cosP = Math.Cos(lat);
                    double tarve = sinP * sin0 + cosP * cos0 * cosDl + cosP * sinDl / (T * A);
                    if (tarve < pienin) pienin = tarve;
                }
                return pienin;
            }
            double ala = 0, yla = 90;
            if (!(PieninTarve(yla) >= etaisyys)) return yla;
            for (int i = 0; i < Haarukat; i++)
            {
                double keski = (ala + yla) / 2;
                if (PieninTarve(keski) >= etaisyys) yla = keski;
                else ala = keski;
            }
            return yla;
        }

        struct Sovitus { public double Korkeus, Lat, Lng; }

        /// <summary>
        /// Korkeuteen sovitettu näkymä (kamera.js:769 korkeuteenSovitus) tai null, jos ruutu ei ole laatikkoa
        /// kapeampi. toiveLng = pelaajan kaupungin pituus (kamera.js:754 pelaajanAsteet).
        /// </summary>
        static Sovitus? KorkeuteenSovitus(Laatikko l, double vara, double kuvasuhde, double fov, double toiveLng)
        {
            var pisteet = KehanAsteet(l);
            if (pisteet == null) return null;
            var keski = LaudaltaAsteiksi(l.X + l.W / 2, l.Y + l.H / 2);
            var lansi = LaudaltaAsteiksi(l.X, l.Y + l.H / 2);
            var ita = LaudaltaAsteiksi(l.X + l.W, l.Y + l.H / 2);
            if (!double.IsFinite(keski.Lat) || !double.IsFinite(lansi.Lon) || !double.IsFinite(ita.Lon)) return null;
            double lat0 = keski.Lat, lngKeski = keski.Lon, lngW = lansi.Lon, lngE = ita.Lon;
            // Päivämäärärajan yli kääntyvä laatikko: turvallinen tila on molempiin suuntiin sovitus.
            if (!(lngE > lngW) || !(lngE - lngW < 180)) return null;
            double tarveX = KehanTarve(pisteet, lat0, lngKeski, vara, 1, kuvasuhde, fov);
            double tarveY = KehanTarve(pisteet, lat0, lngKeski, vara, 2, kuvasuhde, fov);
            if (!(tarveX > tarveY)) return null;
            double latMin = double.PositiveInfinity, latMax = double.NegativeInfinity;
            foreach (var p in pisteet) { latMin = Math.Min(latMin, p.Lat); latMax = Math.Max(latMax, p.Lat); }
            double toive = double.IsFinite(toiveLng) ? Kiedo(toiveLng) : lngKeski;
            double lng0 = Math.Min(lngE, Math.Max(lngW, toive));
            double etaisyys = 0;
            for (int i = 0; i < Kierrokset; i++)
            {
                etaisyys = KehanTarve(pisteet, lat0, lng0, vara, 2, kuvasuhde, fov);
                double puoli = ReunanPuoli(latMin, latMax, lat0, etaisyys, kuvasuhde, fov);
                double alaraja = lngW + puoli, ylaraja = lngE - puoli;
                lng0 = ylaraja > alaraja ? Math.Min(ylaraja, Math.Max(alaraja, toive)) : (lngW + lngE) / 2;
            }
            if (!(etaisyys > 1)) return null;
            return new Sovitus { Korkeus = Math.Min(KorkeusMax, etaisyys - 1), Lat = lat0, Lng = lng0 };
        }

        static double Kiedo(double lon) => ((lon % 360.0) + 540.0) % 360.0 - 180.0;

        // ------------------------------------------------------------------ saapumisnäkymä

        /// <summary>
        /// SAAPUMISNÄKYMÄ (web lauta.js saavu → kamera.kotiin → kameranKohde). laatikko = saapumislaatikko
        /// (<see cref="MaanLautalaatikko"/> + <see cref="Valjenna"/>) tai null (tuntematon maa, aineisto
        /// lataamatta, pelaaja reitin varrella). leveysPt ja korkeusPt = kameran kuva pisteinä (webin kotelo
        /// css-pikseleinä); fov = pystysuunnan avauskulma; dpr = pistekerroin (puhelimen lähizoomiehto).
        /// </summary>
        public static Tulos Laske(Laatikko? laatikko, double kaupunkiLat, double kaupunkiLon,
            double leveysPt, double korkeusPt, double fov = PalloFov, double dpr = 1)
        {
            double A = Kuvasuhde(leveysPt, korkeusPt);
            double min = KorkeusMin(leveysPt, korkeusPt, fov, dpr);
            var tulos = new Tulos { KorkeusMin = min, Kallistus = 0, Suunta = 0 };

            if (laatikko.HasValue && LaatikkoMahtuu(laatikko.Value, A))
            {
                var l = laatikko.Value;
                double vara = 1 + 2 * Marginaali;
                var s = KorkeuteenSovitus(l, vara, A, fov, kaupunkiLon);
                var keski = LaudaltaAsteiksi(l.X + l.W / 2, l.Y + l.H / 2);
                double lat = keski.Lat, lon = keski.Lon, pyydetty;
                if (s.HasValue)
                {
                    lat = s.Value.Lat; lon = s.Value.Lng; pyydetty = s.Value.Korkeus;
                    tulos.Tapa = Tapa.Korkeuteen;
                }
                else
                {
                    pyydetty = PallonKorkeus(l, vara, A, fov);
                    tulos.Tapa = Tapa.Molempiin;
                    // Ei ratkennut (kamera.js:872): leveys laatikosta molempiin suuntiin kuvasuhteella.
                    if (double.IsNaN(pyydetty))
                        pyydetty = KorkeusLeveydesta(Math.Max(l.W * vara, l.H * vara * A), A, fov, min);
                }
                tulos.Korkeus = Math.Min(KorkeusMax, Math.Max(min, pyydetty));
                tulos.Lat = Math.Max(-89.5, Math.Min(89.5, lat));
                tulos.Lon = lon;
                tulos.Laatikko = l;
                tulos.NakyvaLeveys = LeveysKorkeudesta(tulos.Korkeus, A, fov);
                tulos.WebLat = tulos.Lat; tulos.WebLon = tulos.Lon; tulos.WebKorkeus = tulos.Korkeus;
                return tulos;
            }

            // Kaupunkinäkymä (kamera.js:1182): 240 yksikköä ja kaupunki alimpaan kolmannekseen (saapumisasento.js).
            double h = Math.Min(KorkeusMax, Math.Max(min, KorkeusLeveydesta(Saapumisleveys, A, fov, min)));
            double nakyva = LeveysKorkeudesta(h, A, fov);
            double leveysAst = nakyva * 360.0 / LaudanLeveys;
            double korkeusAst = leveysAst / A;
            double uusiLat = Math.Max(-89.5, Math.Min(89.5, kaupunkiLat + (KaupunkiY - 0.5) * korkeusAst));
            double kavennys = Math.Max(0.2, Math.Cos(uusiLat * Rad));
            tulos.Lat = uusiLat;
            tulos.Lon = Kiedo(kaupunkiLon - (KaupunkiX - 0.5) * leveysAst / kavennys);
            tulos.Korkeus = h;
            tulos.NakyvaLeveys = nakyva;
            tulos.Tapa = Tapa.Kaupunkinakyma;
            tulos.WebLat = tulos.Lat; tulos.WebLon = tulos.Lon; tulos.WebKorkeus = tulos.Korkeus;
            return tulos;
        }

        // ------------------------------------------------------------------ kotelosta natiivin ruudulle

        /// <summary>
        /// SAAPUMISNÄKYMÄ NATIIVIN KOKO RUUDUN KAMERALLE (löydös 50): webin näkymä lasketaan kotelolle
        /// (<paramref name="kotelo"/>, oletus <see cref="WebinKotelo"/>) webin FOV:lla <see cref="PalloFov"/>, ja
        /// <see cref="Ruudulle"/> siirtää sen kameraan, joka kattaa koko ruudun (leveysPt × korkeusPt, pystykulma
        /// <paramref name="fov"/>). Tulos: Lat/Lon/Korkeus natiivin kameralle, WebLat/WebLon/WebKorkeus webin pov.
        /// </summary>
        public static Tulos LaskeRuudulle(Laatikko? laatikko, double kaupunkiLat, double kaupunkiLon,
            double leveysPt, double korkeusPt, double fov = PalloFov, double dpr = 1, Kotelo? kotelo = null)
        {
            var k = kotelo ?? WebinKotelo(leveysPt, korkeusPt);
            var web = Laske(laatikko, kaupunkiLat, kaupunkiLon, k.W, k.H, PalloFov, dpr);
            return Ruudulle(web, k, leveysPt, korkeusPt, fov);
        }

        /// <summary>
        /// Webin kotelonäkymä (Laske kotelon mitoilla, FOV <see cref="PalloFov"/>) natiivin koko ruudun kameraan:
        /// 1. MITTAKAAVA: pisteitä radiaania kohden s = (korkeus pt / 2) / tan(fov / 2); maa näkyy samankokoisena, kun
        ///    s / etäisyys on sama, joten korkeus × s_ruutu / s_kotelo (sama FOV: × ruudun korkeus / kotelon korkeus).
        ///    Tasolla tarkka, pallolla Ranskan laidoilla alle 0,3 %.
        /// 2. KESKIPISTE: webin pov on kotelon keskellä, joka on ruudun keskeltä (dx, dy) pt; kameran katselupiste
        ///    siirretään isoympyrää pitkin kulman γ = asin((1 + h) sin θ) − θ (tan θ = |d| / s_ruutu) niin, että pov
        ///    päätyy kotelon keskelle (pohjoinen ylös, kallistus 0).
        /// </summary>
        public static Tulos Ruudulle(Tulos web, Kotelo kotelo, double leveysPt, double korkeusPt, double fov = PalloFov)
        {
            if (!(kotelo.H > 0) || !(korkeusPt > 0) || !(leveysPt > 0)) return web;
            double sKotelo = kotelo.H / 2.0 / Math.Tan(PalloFov / 2.0 * Rad);
            double sRuutu = korkeusPt / 2.0 / Math.Tan(fov / 2.0 * Rad);
            double kerroin = sRuutu / sKotelo;
            var t = web;
            t.WebLat = web.Lat; t.WebLon = web.Lon; t.WebKorkeus = web.Korkeus;
            t.Korkeus = web.Korkeus * kerroin;
            t.KorkeusMin = web.KorkeusMin * kerroin;
            t.NakyvaLeveys = LeveysKorkeudesta(t.Korkeus, Kuvasuhde(leveysPt, korkeusPt), fov);
            double dx = kotelo.X + kotelo.W / 2.0 - leveysPt / 2.0, dy = kotelo.Y + kotelo.H / 2.0 - korkeusPt / 2.0;
            double r = Math.Sqrt(dx * dx + dy * dy);
            if (r > 1e-9)
            {
                double theta = Math.Atan(r / sRuutu), s = (1.0 + t.Korkeus) * Math.Sin(theta);
                if (s < 1.0)
                {
                    // Pov näkyy keskeltä (dx oikealle, dy alas), joten katselupiste on siitä suuntaan (itä −dx, pohjoinen dy).
                    var (lat, lon) = Siirra(web.Lat, web.Lon, Math.Asin(s) - theta, Math.Atan2(-dx, dy));
                    t.Lat = Math.Max(-89.5, Math.Min(89.5, lat));
                    t.Lon = Kiedo(lon);
                }
            }
            return t;
        }

        /// <summary>Isoympyrän määränpää: kulma (rad) ja suuntima (rad, 0 = pohjoinen, itään +).</summary>
        static (double Lat, double Lon) Siirra(double lat, double lon, double kulma, double suunta)
        {
            double f1 = lat * Rad, l1 = lon * Rad;
            double f2 = Math.Asin(Math.Sin(f1) * Math.Cos(kulma) + Math.Cos(f1) * Math.Sin(kulma) * Math.Cos(suunta));
            double l2 = l1 + Math.Atan2(Math.Sin(suunta) * Math.Sin(kulma) * Math.Cos(f1), Math.Cos(kulma) - Math.Sin(f1) * Math.Sin(f2));
            return (f2 / Rad, l2 / Rad);
        }
    }
}
