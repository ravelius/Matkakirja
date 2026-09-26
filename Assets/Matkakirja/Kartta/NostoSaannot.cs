using System;
using System.Collections.Generic;
using System.Text;

namespace Matkakirja
{
    /// <summary>
    /// NOSTOKERROKSEN PORTIT PUHTAINA SÄÄNTÖINÄ (löydös 50 osa B, web on malli; Kartta-testit/NostoSaannotTestit).
    /// Ilman UnityEngineä: NostoKerros kutsuu näitä, ja testit ajavat samat säännöt paketin datalla.
    ///
    ///  1. LÄHIZOOMIPORTTI (js/pallolauta/nostot.js:957 LAHIZOOMIN_OSUUS_ULOIMMASTA 0,7 ja :977 lahizoomiAuki):
    ///     mitta on näkymän osuus uloimmasta sallitusta, uloinOsuus = kameran korkeus / uloin korkeus (webissä
    ///     lauta.js uloimmanOsuus; uloin = maan saapumisnäkymä, kamera.js uloszoomausRaja). 0 tai tuntematon =
    ///     portti kiinni. KATTO EI KOSKE KOHDEMAATA (nostot.js:846–, merkkiPortti kohdemaa: true): `lahi`-lippu ei
    ///     piilota kohdemaassa mitään; vain taso 3 odottaa lähizoomia (merkkiPortti "Kolmostaso odottaa").
    ///  2. KAUPUNKI ON YKSI PISTE (nostot.js:2683–, js/pallolauta/kaupunkiliuska.js:58 KAUPUNGIN_SADE_KM 12 ja
    ///     :132 luoSisaisyysTesti): nosto on kaupungin sisäinen, jos sen paikkanimi on kaupungin nimi (löyhästi:
    ///     reunavälit ja kirjainkoko eivät eroa) TAI sen OMA paikka (ei ladottu) on enintään 12 km kaupungin
    ///     omasta pisteestä. Kaupunkinosto itse ei ole kenenkään sisäinen. Keskukset = laudan kaupungit
    ///     (kaupungit.json) + maan omat kaupunkinostot (lauta.js laudanKaupungit + nostokerroksen kaupunkirivit).
    ///     Sisäiset eivät piirry kartalle millään zoomilla (ne ovat kaupunkiliuskassa).
    ///  3. MERET NIMIKERROKSESSA (nostot.js:1969 merenTunnusPoltettu, :925 merinimenTunnus): meri-nosto jää pois,
    ///     kun sen tunnus tai nimen tunnus on nimikerroksen merinimissä (webissä pyramidin nimiötason meri-avaimet,
    ///     natiivissa aluenimet.json luokka meri/valtameri + merinimet.json). Webin toinen ehto kohde.tyyppi ===
    ///     'meri' ei ole viennissä; natiivissa sen korvaa aihe "luonto" (kaikki webin meri-tyypit ovat luontoa).
    ///     Meri, jota nimikerros ei näytä (Kreetanmeri, Traakianmeri), jää nostoksi kuten webissä.
    /// </summary>
    public static class NostoSaannot
    {
        /// <summary>KAUPUNGIN_SADE_KM (js/pallolauta/kaupunkiliuska.js:58).</summary>
        public const double KaupunginSadeKm = 12.0;
        /// <summary>LAHIZOOMIN_OSUUS_ULOIMMASTA (js/pallolauta/nostot.js:957).</summary>
        public const double LahizoominOsuus = 0.7;
        /// <summary>MAAN_SADE_KM (kaupunkiliuska.js etaisyysKm).</summary>
        public const double MaanSadeKm = 6371.0;
        /// <summary>Asteen pituus kilometreinä karkeaan karsintaan (kaupunkiliuska.js ASTE_KM).</summary>
        const double AsteKm = 111.2;
        const double Rad = Math.PI / 180.0;

        /// <summary>Miksi nosto on (tai ei ole) kartalla. Nakyy = portit päästävät (ruutu ja katto erikseen).</summary>
        public enum Syy { Nakyy, KaupunginNimi, KaupunginSade, Meri, Taso3 }

        /// <summary>Kaupungin keskus jäsenyyttä varten: kaupungin oma nimi ja oma piste.</summary>
        public struct Keskus
        {
            public string Nimi;
            public double Lat, Lon;
            public Keskus(string nimi, double lat, double lon) { Nimi = nimi; Lat = lat; Lon = lon; }
        }

        /// <summary>Kahden asteparin etäisyys kilometreinä (haversine, kaupunkiliuska.js:64 etaisyysKm).</summary>
        public static double EtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            double dLat = (lat2 - lat1) * Rad, dLon = (lon2 - lon1) * Rad;
            double s = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                       + Math.Cos(lat1 * Rad) * Math.Cos(lat2 * Rad) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2 * MaanSadeKm * Math.Asin(Math.Min(1.0, Math.Sqrt(s)));
        }

        /// <summary>Nimet vertautuvat löyhästi (kaupunkiliuska.js nimiAvain): reunavälit ja kirjainkoko eivät eroa.</summary>
        public static string NimiAvain(string s) => (s ?? "").Trim().ToLowerInvariant();

        /// <summary>
        /// Meren nimen tunnus (nostot.js:925 merinimenTunnus): pienet kirjaimet, ä/ö/å/é/î latinisoituna, muu kuin
        /// kirjain tai numero viivaksi, reunaviivat pois.
        /// </summary>
        public static string MerinimenTunnus(string nimi)
        {
            var s = (nimi ?? "").ToLowerInvariant().Replace('ä', 'a').Replace('ö', 'o').Replace('å', 'a').Replace('é', 'e').Replace('î', 'i');
            var b = new StringBuilder(s.Length);
            bool viiva = false;
            foreach (char c in s)
            {
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) { b.Append(c); viiva = false; }
                else if (!viiva) { b.Append('-'); viiva = true; }
            }
            return b.ToString().Trim('-');
        }

        /// <summary>Onko lähizoomi auki (nostot.js:977 lahizoomiAuki): 0 &lt; osuus ≤ 0,7.</summary>
        public static bool LahizoomiAuki(double uloinOsuus) => uloinOsuus > 0 && uloinOsuus <= LahizoominOsuus;

        /// <summary>NIMEN_KARTTAKERROIN_MIN ja _MAX (js/pallolauta/nimet.js:292–293).</summary>
        public const double KarttakerroinMin = 0.2, KarttakerroinMax = 64.0;
        /// <summary>NIMEN_KERTOIMEN_PORRAS (nimet.js:295): kerroin porrastetaan suhteellisin 0,5 %:n askelin.</summary>
        public const double KertoimenPorras = 1.005;

        /// <summary>
        /// Kartan mittakerroin (web nostot.js:633 nostonKarttakerroin = nimet.js:303 nimenKarttakerroin): kameran
        /// mittakaava / saapumisnäkymän mittakaava. Näkyvä leveys on korkeuteen verrannollinen (nostot.js "Korkeuden
        /// osuus on sama luku kuin leveyden osuus"), joten kerroin = saapumiskorkeus / korkeus. Rajattu
        /// [0,2; 64] ja porrastettu (sama zoomi antaa aina saman luvun, kameran heilahdus ei muuta sitä).
        /// Tuntematon vertailu (≤ 0) = 1.
        /// </summary>
        public static double Karttakerroin(double saapumisKorkeus, double korkeus)
        {
            if (!(saapumisKorkeus > 0) || !(korkeus > 0)) return 1.0;
            double raaka = Math.Min(KarttakerroinMax, Math.Max(KarttakerroinMin, saapumisKorkeus / korkeus));
            return Math.Pow(KertoimenPorras, Math.Round(Math.Log(raaka) / Math.Log(KertoimenPorras)));
        }

        /// <summary>
        /// Kaupungin sisäisyys (kaupunkiliuska.js:132 luoSisaisyysTesti): palauttaa KaupunginNimi, KaupunginSade tai
        /// Nakyy. Keskukset käydään järjestyksessä, ja kunkin kohdalla nimi ennen mittaa (kuten webin testi).
        /// <paramref name="kaupunki"/> = kaupunki, jonka sisään nosto kuuluu (diagnoosi).
        /// </summary>
        public static Syy KaupunginSisainen(string paikka, double omaLat, double omaLon, bool onKaupunki,
            IReadOnlyList<Keskus> keskukset, out string kaupunki, double sadeKm = KaupunginSadeKm)
        {
            kaupunki = null;
            if (onKaupunki || keskukset == null) return Syy.Nakyy;
            string paikkaAvain = NimiAvain(paikka);
            bool paikkaOk = !double.IsNaN(omaLat) && !double.IsNaN(omaLon);
            double latRaja = sadeKm / AsteKm;
            for (int i = 0; i < keskukset.Count; i++)
            {
                var k = keskukset[i];
                string nimi = NimiAvain(k.Nimi);
                if (nimi.Length > 0 && paikkaAvain == nimi) { kaupunki = k.Nimi; return Syy.KaupunginNimi; }
                if (!paikkaOk || double.IsNaN(k.Lat) || double.IsNaN(k.Lon)) continue;
                // Karkea laatikko ensin: haversine vain naapureille.
                if (Math.Abs(omaLat - k.Lat) > latRaja) continue;
                double lonRaja = latRaja / Math.Max(0.01, Math.Cos(k.Lat * Rad));
                double dLon = Math.Abs(omaLon - k.Lon);
                if (dLon > 180) dLon = 360 - dLon;
                if (dLon > lonRaja) continue;
                if (EtaisyysKm(omaLat, omaLon, k.Lat, k.Lon) <= sadeKm) { kaupunki = k.Nimi; return Syy.KaupunginSade; }
            }
            return Syy.Nakyy;
        }

        /// <summary>
        /// Onko nosto meri, jonka nimikerros jo näyttää (nostot.js:1969 merenTunnusPoltettu): aihe luonto ja tunnus
        /// tai nimen tunnus merinimissä. Tyhjä joukko = ei yhtään (kuten webissä ennen polttoa).
        /// </summary>
        public static bool OnMeri(string aihe, string tunnus, string nimi, ICollection<string> merinimet)
        {
            if (merinimet == null || merinimet.Count == 0 || aihe != "luonto") return false;
            return (tunnus != null && merinimet.Contains(tunnus)) || merinimet.Contains(MerinimenTunnus(nimi));
        }

        /// <summary>Datan portit (eivät riipu kamerasta): kaupungin sisäinen ensin, sitten meri.</summary>
        public static Syy DatanSyy(string aihe, string kategoria, string tunnus, string nimi, string paikka,
            double omaLat, double omaLon, IReadOnlyList<Keskus> keskukset, ICollection<string> merinimet, out string kaupunki)
        {
            bool onKaupunki = kategoria == "kaupunki" || aihe == "kaupungit";
            var s = KaupunginSisainen(paikka, omaLat, omaLon, onKaupunki, keskukset, out kaupunki);
            if (s != Syy.Nakyy) return s;
            return OnMeri(aihe, tunnus, nimi, merinimet) ? Syy.Meri : Syy.Nakyy;
        }

        /// <summary>
        /// Näkymän portti kohdemaassa: datan syy voittaa; muuten taso 3 odottaa lähizoomia (merkkiPortti), ja kaikki
        /// muut (myös `lahizoom`-lipulliset) näkyvät heti.
        /// </summary>
        public static Syy Portti(Syy datanSyy, int taso, bool lahella) =>
            datanSyy != Syy.Nakyy ? datanSyy : (taso == 3 && !lahella ? Syy.Taso3 : Syy.Nakyy);

        /// <summary>
        /// PIIRTOPISTE karttavalot-alkiosta (skeema 1.39, Siirtoseppä): `ankkuri` {lat, lon} = webin lukittu ankkuri
        /// (js/pallolauta/nostoankkurit.js lukittuAnkkuri), johon web piirtää merkin; null tai puuttuva → `ladottu`
        /// (ladonnan piste) → noston oma lat/lon. Vanha paketti ilman ankkuria toimii kuten ennen. false = ei pistettä.
        /// </summary>
        public static bool Piirtopiste(IDictionary<string, object> alkio, out double lat, out double lon)
        {
            lat = lon = 0;
            if (alkio == null) return false;
            foreach (var kentta in PiirtopisteenKentat)
            {
                if (kentta == null) { if (Piste(alkio, out lat, out lon)) return true; continue; }
                if (alkio.TryGetValue(kentta, out var o) && o is IDictionary<string, object> d && Piste(d, out lat, out lon)) return true;
            }
            return false;
        }
        /// <summary>Onko alkiolla kelvollinen webin ankkuri (skeema 1.39 `ankkuri` {lat, lon}).</summary>
        public static bool OnAnkkuri(IDictionary<string, object> alkio) =>
            alkio != null && alkio.TryGetValue("ankkuri", out var o) && o is IDictionary<string, object> d && Piste(d, out _, out _);

        static readonly string[] PiirtopisteenKentat = { "ankkuri", "ladottu", null };

        static bool Piste(IDictionary<string, object> d, out double lat, out double lon)
        {
            lat = lon = 0;
            if (!Luku(d, "lat", out lat) || !Luku(d, "lon", out lon)) return false;
            return true;
        }

        static bool Luku(IDictionary<string, object> d, string nimi, out double arvo)
        {
            arvo = 0;
            if (!d.TryGetValue(nimi, out var o) || o == null) return false;
            try { arvo = Convert.ToDouble(o, System.Globalization.CultureInfo.InvariantCulture); }
            catch (Exception) { return false; }
            return !double.IsNaN(arvo);
        }

        /// <summary>
        /// Noston oma nimiön kylki (skeema 1.39 `puoli`, web datan puoli / poltettu tynkä): "oikea", "vasen", "yla" tai
        /// "ala"; muu arvo tai puuttuva = null (UI:n oletus, web 'oikea').
        /// </summary>
        public static string Puoli(IDictionary<string, object> alkio) =>
            alkio != null && alkio.TryGetValue("puoli", out var o) && o is string p
            && (p == "oikea" || p == "vasen" || p == "yla" || p == "ala") ? p : null;

        // ==== ELÄINTÄYT KOKO LAUDALTA (löydös 125, web js/pallolauta/nostot.js keraa ja :390 ELAINTAKY_*) ====

        /// <summary>
        /// ELAINTAKY_NAKYY_KORKEUS = ELAINTAKY_MAANOSAN_ASTEET 34 / ALUEEN_VAHIN_OSUUS 0,75 = 45,3°: eläintäkymerkit
        /// näkyvät, kun näkymän korkeus leveysasteina on enintään tämä (Eurooppa täyttää ruudun, ei yleiskuvaa).
        /// </summary>
        public const double ElaintakyNakyyKorkeus = 34.0 / 0.75;

        /// <summary>Web `alueenMerkitNakyvat(nakyva, ELAINTAKY_NAKYY_KORKEUS) &amp;&amp; !liikkuu` (liikkuu = nappula siirtyy).</summary>
        public static bool ElaintaytNakyvat(double nakyvaKorkeusAsteina, bool nappulaLiikkuu) =>
            !nappulaLiikkuu && nakyvaKorkeusAsteina > 0 && nakyvaKorkeusAsteina <= ElaintakyNakyyKorkeus;

        // ==== SYMBOLIT (löydös 125, web js/fokusnosto-symbolit.js; mitattu proto-3d/lokit/nostot-125/web) ====

        /// <summary>
        /// NOSTOSYM_MINI_LUONNOS-taulun tunnukset: viisi viivamerkkiä (vuori, meri, huuto = salama, elain = tassu,
        /// ihme = kompassiruusu) ja yksitoista pistettä (<see cref="OnPistemerkki"/>).
        /// </summary>
        static readonly HashSet<string> MiniTunnukset = new HashSet<string>
        {
            "vuori", "meri", "huuto", "elain", "ihme",
            "silma", "historia", "ruoka", "kulttuuri", "tekniikka", "kauppa", "sana", "merenkulku", "urheilu", "kaupunki", "hetki",
        };

        /// <summary>NOSTOSYM_PISTEET: kategoriat, joiden kartan merkki on harmaa hehkupiste (muoto ei erota, väri erottaa).</summary>
        static readonly HashSet<string> PisteTunnukset = new HashSet<string>
        {
            "silma", "historia", "ruoka", "kulttuuri", "tekniikka", "kauppa", "sana", "merenkulku", "urheilu", "kaupunki", "hetki",
        };

        /// <summary>
        /// Kartan minimerkin tunnus (web nostosymMiniTunnus + NOSTOSYM_MINI_LAJIT): luonto lajin mukaan — meri ja joki
        /// kahtena aaltona ("meri"), muut (vuori, saari, järvi) ja tuntematon laji kolmiona ("vuori", webin oma
        /// oletus); muut kategoriat sellaisenaan, jos taulussa on merkki, ja tuntematon "huuto" (webin varamerkki).
        /// Laji = kohteen tyyppi (web datumin symLaji); karttavalot.json ei vielä vie sitä (löydös 125, data).
        /// </summary>
        public static string MiniTunnus(string kategoria, string laji)
        {
            if (kategoria == "luonto") return laji == "meri" || laji == "joki" ? "meri" : "vuori";
            return kategoria != null && MiniTunnukset.Contains(kategoria) ? kategoria : "huuto";
        }

        /// <summary>Onko minimerkki piste (NOSTOSYM_PISTEET), eli harmaa hehkupiste eikä viivamerkki.</summary>
        public static bool OnPistemerkki(string tunnus) => tunnus != null && PisteTunnukset.Contains(tunnus);

        /// <summary>NOSTOSYM_KUVAMERKIT: tyyppi (luonnon laji tai kategoria) → assets/nostotyypit/merkki-*.png.</summary>
        static readonly Dictionary<string, string> Kuvamerkit = new Dictionary<string, string>
        {
            ["vuori"] = "merkki-vuori.png", ["saari"] = "merkki-saari.png", ["jarvi"] = "merkki-jarvi.png",
            ["joki"] = "merkki-joki.png", ["meri"] = "merkki-meri.png", ["historia"] = "merkki-historia.png",
            ["kulttuuri"] = "merkki-kulttuuri.png", ["ruoka"] = "merkki-ruoka.png", ["kauppa"] = "merkki-kauppa.png",
            ["tekniikka"] = "merkki-tekniikka.png", ["merenkulku"] = "merkki-merenkulku.png",
        };

        /// <summary>
        /// Kuvamerkin tiedosto (web nostosymKuvamerkki: laji ensin, sitten kategoria) tai null, jos tyypillä ei ole
        /// merkkiä (silloin minimerkki). VÄLIAIKAINEN VARA datalle ilman lajia: luonto → vuoren merkki (natiivin
        /// entinen valinta, karttaselitteen ensimmäinen luontomerkki); webissä tätä haaraa ei ole, koska laji on aina.
        /// </summary>
        public static string Kuvamerkki(string kategoria, string laji)
        {
            if (laji != null && Kuvamerkit.TryGetValue(laji, out var k)) return k;
            if (kategoria != null && Kuvamerkit.TryGetValue(kategoria, out k)) return k;
            return laji == null && kategoria == "luonto" ? Kuvamerkit["vuori"] : null;
        }

        /// <summary>
        /// NOSTOJEN_TYYPPIMERKIN_KERROIN (js/pallolauta/nostot.js). Löydös 155 (Fable 26.9.2026 klo 09.0x): 4 → 2,5,
        /// ja kertoimilla 2,5–4 (<see cref="TyyppimerkinTaysiKerroin"/>) merkki on <see cref="TyyppimerkinPieniKoko"/>
        /// kertaa tavallisesta; web ja natiivi samassa erässä.
        /// </summary>
        public const double TyyppimerkinKerroin = 2.5;

        /// <summary>NOSTOJEN_TYYPPIMERKIN_TAYSI_KERROIN: tästä kertoimesta kuvamerkki on täysikokoinen (löydös 155).</summary>
        public const double TyyppimerkinTaysiKerroin = 4.0;

        /// <summary>NOSTOJEN_TYYPPIMERKIN_PIENI: kuvamerkin ruudun kerroin kynnyksen ja täyden koon välissä (löydös 155).</summary>
        public const float TyyppimerkinPieniKoko = 0.85f; // omistaja 26.9. klo 10.4x (ehdotus 0,7)

        /// <summary>
        /// Kuvamerkki käytössä (web nostot.js tyyppimerkitKaytossa): ykköstasolla aina, muuten kartan kertoimesta 2,5 alkaen.
        /// Kutsuja tarkistaa lisäksi, että tyypillä on merkki (<see cref="Kuvamerkki"/>).
        /// </summary>
        public static bool KuvamerkkiKaytossa(int taso, double kerroin) => taso == 1 || kerroin >= TyyppimerkinKerroin;

        /// <summary>Onko ykköstason ulkopuolinen kuvamerkki pienennetty (web tyyppimerkkiPieni, 2,5 ≤ kerroin &lt; 4).</summary>
        public static bool KuvamerkkiPieni(int taso, double kerroin) =>
            taso != 1 && kerroin >= TyyppimerkinKerroin && kerroin < TyyppimerkinTaysiKerroin;

        /// <summary>
        /// Kaupunkimerkki (web datumin kaupunki = kohde.tyyppi === 'kaupunki', nostot.js merkinKerroin: nimiö 11,5 px):
        /// lajista, kun se on datassa (Marathon, Ermoupoli, Kalamata ovat kaupunkeja muissa aiheissa); ilman lajia
        /// aihe kaupungit tai kategoria kaupunki (natiivin entinen sääntö).
        /// </summary>
        public static bool OnKaupunkimerkki(string aihe, string kategoria, string laji) =>
            laji != null ? laji == "kaupunki" : aihe == "kaupungit" || kategoria == "kaupunki";

        /// <summary>Meren nimiö (NOSTOSYM_NIMIO_LAJIT { meri }): harvennettu versaali haaleammalla musteella.</summary>
        public static bool OnMerenNimio(string laji) => laji == "meri";

        // ---- Musteet (css/styles.css .nostosym-*, NOSTOSYM_*; sRGB 0–1, alfa erikseen) ----

        /// <summary>--sym-piste-harmaa #6f6a61: kartan pistemerkin kiekko ja hehku (väri vain karttaselitteen valossa).</summary>
        public static readonly double[] PisteHarmaa = { 111 / 255.0, 106 / 255.0, 97 / 255.0 };
        /// <summary>.nostosym-mini fill rgba(58, 40, 25, 0,86): viivamerkin runko ja pisteen musterengas.</summary>
        public static readonly double[] Muste = { 58 / 255.0, 40 / 255.0, 25 / 255.0 };
        public const double MusteenPeitto = 0.86, OhuenPeitto = 0.52;
        /// <summary>.nostosym-nimio fill rgba(74, 52, 33, 0,92), ei haloa.</summary>
        public static readonly double[] NimionMuste = { 74 / 255.0, 52 / 255.0, 33 / 255.0 };
        public const double NimionPeitto = 0.92;
        /// <summary>NOSTOSYM_TASO1_MUSTE rgba(46, 30, 14, 0,98).</summary>
        public static readonly double[] Taso1Muste = { 46 / 255.0, 30 / 255.0, 14 / 255.0 };
        public const double Taso1Peitto = 0.98;
        /// <summary>.nostosym-nimio-meri fill rgba(120, 108, 84, 0,72), letter-spacing 0,28 em, versaali.</summary>
        public static readonly double[] MerenMuste = { 120 / 255.0, 108 / 255.0, 84 / 255.0 };
        public const double MerenPeitto = 0.72, MerenHarvennus = 0.28;

        // ---- HEHKUPISTE (web piirraNostosymMiniCanvas, omistaja 21.9.2026: "saisi olla hehkuvan näköinen") ----

        /// <summary>NOSTOSYM_PISTE_R (kirjaston yksikköä) ja NOSTOSYM_HEHKUN_SADE (pisteen säteinä).</summary>
        public const double PisteR = 3.4, HehkunSade = 2.1;
        /// <summary>NOSTOSYM_HEHKUN_ALFA (häiveen peitto sisäreunalla), _SISUS (sisuksen vaalennus), NOSTOSYM_PISTE_HIMMEYS.</summary>
        public const double HehkunAlfa = 0.45, HehkunSisus = 0.42, PisteenHimmeys = 0.86;
        /// <summary>Häiveen sisäsäde pisteen säteinä (createRadialGradient(0, 0, r · 0,7, 0, 0, r · 2,1)).</summary>
        public const double HehkunAlku = 0.7;

        /// <summary>
        /// Häiveen peitto etäisyydellä d keskeltä (pisteen säteinä): canvasin säteittäinen gradientti antaa
        /// sisäympyrän (0,7 r) sisällä ensimmäisen värin (0,45) ja siitä lineaarisesti nollaan 2,1 r:ssä.
        /// </summary>
        public static double HehkunPeitto(double d)
        {
            if (d <= HehkunAlku) return HehkunAlfa;
            if (d >= HehkunSade) return 0;
            return HehkunAlfa * (1 - (d - HehkunAlku) / (HehkunSade - HehkunAlku));
        }

        /// <summary>
        /// Sisuksen gradientin kohta ω pisteessä (x, y) pisteen säteinä (y alas kuten canvasilla): web
        /// createRadialGradient(−0,25 r, −0,25 r, 0, 0, 0, r) on kahden ympyrän kartio (polttopiste säde 0 → origo
        /// säde 1). ω = suurin ratkaisu yhtälöstä |p − (1 − ω) f| = ω; 0 = vaalennettu polttopiste, 1 = harmaa reuna.
        /// </summary>
        public static double SisuksenOsuus(double x, double y)
        {
            const double fx = -0.25, fy = -0.25;
            double qx = x - fx, qy = y - fy, dx = -fx, dy = -fy;
            double a = dx * dx + dy * dy - 1.0, qd = qx * dx + qy * dy, qq = qx * qx + qy * qy;
            double w = (qd - Math.Sqrt(Math.Max(0, qd * qd - a * qq))) / a;
            return Math.Min(1.0, Math.Max(0.0, w));
        }

        /// <summary>NOSTOSYM_SYKKEEN_OSUUS 0,07, NOSTOSYM_SYKKEEN_JAKSO_MS 2400 ja glSykeKerroin-nousu 600 ms (sekunteina).</summary>
        public const double SykkeenOsuus = 0.07, SykkeenJaksoS = 2.4, SykkeenNousuS = 0.6;

        /// <summary>
        /// Hehkupisteen sykähdys (web js/pallolauta/glnimiot-sovitin.js glSykeKerroin): koko 1 + 0,07 · a ·
        /// sin(2π t / 2,4 s), a = amplitudi 0–1 (webissä nousu 0,6 s levon alusta, liikkeessä 0). Natiivissa t ja a:n
        /// katto tulevat Joutosykkeestä (Lampopaatos.SykeJaatyy: syke jäätyy levossa, jotta pallo ja UI saavat levätä).
        /// </summary>
        public static double PisteenSyke(double aikaS, double amplitudi) =>
            1.0 + SykkeenOsuus * Math.Min(1.0, Math.Max(0.0, amplitudi)) * Math.Sin(2 * Math.PI * aikaS / SykkeenJaksoS);

        /// <summary>Noston taso datasta (web nostot.js `kohde.taso === 1 || kohde.taso === 3 ? kohde.taso : 2`): oletus 2.</summary>
        public static int Taso(double? arvo) => arvo == 1.0 ? 1 : arvo == 3.0 ? 3 : 2;

        /// <summary>Väri valkoista kohti osuudella t (web nostosymVaalenna, kanavat pyöristetään 0–255-asteikolla).</summary>
        public static double[] Vaalenna(double[] c, double t)
        {
            var v = new double[3];
            for (int i = 0; i < 3; i++) v[i] = Math.Round((c[i] * 255 + (255 - c[i] * 255) * t)) / 255.0;
            return v;
        }

        /// <summary>
        /// Hehkupisteen kiekko ja häive yhtenä sRGB-värinä (suora alfa) pisteessä (x, y) pisteen säteinä, kuten web
        /// piirtää: häive ensin (harmaa, <see cref="HehkunPeitto"/>), kiekko sen päälle (sisuksen gradientti, peitto
        /// 0,86 × <paramref name="kiekko"/> eli reunan kattavuus 0–1). Musterengas piirretään erikseen päälle.
        /// </summary>
        public static (double R, double G, double B, double A) Hehkupiste(double x, double y, double kiekko)
        {
            double d = Math.Sqrt(x * x + y * y);
            double ah = HehkunPeitto(d), ak = PisteenHimmeys * Math.Min(1.0, Math.Max(0.0, kiekko));
            var vaalea = Vaalenna(PisteHarmaa, HehkunSisus);
            double w = SisuksenOsuus(x, y);
            double A = ak + ah * (1 - ak);
            if (A <= 0) return (PisteHarmaa[0], PisteHarmaa[1], PisteHarmaa[2], 0);
            double[] c = new double[3];
            for (int i = 0; i < 3; i++)
            {
                double sisus = vaalea[i] + (PisteHarmaa[i] - vaalea[i]) * w;
                c[i] = (sisus * ak + PisteHarmaa[i] * ah * (1 - ak)) / A;
            }
            return (c[0], c[1], c[2], A);
        }

        /// <summary>Merinimien tunnukset aluenimet.json:sta (luokka meri tai valtameri) ja merinimet.json:sta (id).</summary>
        public static void LisaaMerinimet(IEnumerable<Dictionary<string, object>> alkiot, bool vainMeriluokka, ISet<string> ulos)
        {
            if (alkiot == null) return;
            foreach (var a in alkiot)
            {
                if (a == null) continue;
                if (vainMeriluokka)
                {
                    var luokka = a.TryGetValue("luokka", out var l) ? l as string : null;
                    if (luokka != "meri" && luokka != "valtameri") continue;
                }
                if (a.TryGetValue("id", out var id) && id is string s && s.Length > 0) ulos.Add(s);
            }
        }
    }
}
