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
