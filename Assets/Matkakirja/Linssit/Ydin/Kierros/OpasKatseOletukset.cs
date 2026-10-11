// KOHTEEN KATSEEN OLETUKSET YTIMESSÄ (omistaja TF 180, PT juna 181; Linssiseppä 11.10.): workerin opasdata (R2 opas/esittely-v1e,
// tools/pollo/aineistot.js) antaa katse_suunta- ja katse_kaari-kentät vain osalle kohteista, eikä tästä reposta voi muuttaa sitä.
// Kun omistaja pyytää kohteelle tiettyä näkymää ennen kuin data on workerissa, oletus asetetaan tässä paikan mukaan (kohde alle
// SadeM:n päässä). Workerin oma katse_suunta voittaa aina (oletusta ei käytetä). Kun sama tieto on workerissa, rivi poistetaan.
//  - Notre-Dame (omistaja TF 180: "pysähdyksessä kamera laskeutuu nopeammin ja kaartaa länsijulkisivun eteen"): julkisivun
//    normaali OSM-pohjapiirroksesta (Resources/Elava/muodot-pariisi.json Q2981, pienin rajaava suorakaide: pituusakseli
//    116,6° / 296,6°, länsipääty 57 m kohteen pisteestä suunnassa 301°) → kamera kirkon länsipuolella katsoen 117°:een.
//    Kierto päättyy julkisivun eteen (katse_loppu) ja laskeutuminen on valmis kierron puolivälissä (lasku_osuus 0,5).
//    Workeriin: {"katse_suunta": 117, "katse_loppu": true, "lasku_osuus": 0.5} Notre-Damen esittelyriville.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasKatseOletukset
    {
        public const double SadeM = 100;

        public sealed class Oletus { public string Nimi; public double Lat, Lon, KatseSuunta, KatseKaari, LaskuOsuus = 1; public bool KatseLoppu; }

        public static readonly Oletus[] Kohteet =
        {
            new Oletus { Nimi = "Notre-Dame", Lat = 48.8530, Lon = 2.3498, KatseSuunta = 117, KatseLoppu = true, LaskuOsuus = 0.5 },
        };

        /// <summary>Oletus paikassa (lat, lon) tai null.</summary>
        public static Oletus Hae(double lat, double lon)
        {
            foreach (var o in Kohteet) if (KierrosLento.EtaisyysM(o.Lat, o.Lon, lat, lon) < SadeM) return o;
            return null;
        }

        /// <summary>
        /// AUKION KESKUSMONUMENTTI (PT 11.10. 09.2x, iPhone-ajo e0689c677: pystykuvassa Concorden obeliski oli oikeassa reunassa, koska
        /// workerin aukion piste on ~19 m obeliskista): pallon pystykuvan aukiokehys kiertää monumenttia (OpasKuvaus.LeveysKuvaan).
        /// Ei riviä → aukion piste.
        /// TUNNISTUS (Linssiseppä 11.10.): ensisijaisesti workerin kohteen Wikidata-tunnisteella (OpasKohde.Id = aukion Q), varalla
        /// paikalla (alle MonumenttiSadeM aukion pisteestä; workerin piste on aukion Wikidata-P625, ks. kultaiset/opas-kierrokset-20261008.json).
        /// LÄHDE: monumentin Wikidata-P625; OSM (Overpass) kun P625 puuttuu tai on epätarkka (mainittu rivillä). Rivin lopussa monumentin
        /// etäisyys aukion pisteestä (kaikki alle koko_m / 2, eli aukion sisällä).
        /// EI RIVIÄ (oppaan esittelydatan 36 aukiosta 12; syy):
        ///  - Venceslauksen aukio Q847613: Pyhän Venceslauksen patsas (Q3497632) on 750 m:n bulevardin yläpäässä 381 m pisteestä
        ///    (≥ koko / 2), kierto sen ympäri näyttäisi vain museon pään eikä aukiota.
        ///  - Antiikin agora Q395367: kaivausalue ilman keskusmonumenttia (Hefaistoksen temppeli ja Attaloksen stoa reunoilla).
        ///  - Sýntagman aukio Q1137997: keskellä vain matala suihkulähde; kuvan aihe on parlamentti ja tuntematon sotilas aukion ulkopuolella.
        ///  - Potsdamer Platz Q152252: pilvenpiirtäjien risteys, ei keskusmonumenttia (liikennetornin kopio on pieni).
        ///  - Grand-Place Q215429: kaupungintalon torni on aiheen keskipiste (tornisääntö, OpasSilmukka.TorniKuvaan).
        ///  - Yliopiston aukio Q1850614: hajallaan patsaita ja muistoristejä, ei yhtä keskusmonumenttia.
        ///  - Piazza della Signoria Q849846: aiheena Palazzo Vecchion torni (tornisääntö); Neptunuksen suihkulähde (38 m) ja Cosimon
        ///    ratsastajapatsas (40 m) ovat sivussa ja vetäisivät kuvan pois tornista.
        ///  - Kauppatori Q541933: tori ilman keskusmonumenttia; Keisarinnankivi pohjoisreunalla (80 m), Havis Amanda aukion ulkopuolella.
        ///  - Rynek Główny Q770631: keskellä Sukiennice-halli, tornit (Mariankirkko, raatihuoneen torni) tornisäännön asia; Mickiewiczin
        ///    patsas (60 m) on hallin kyljessä.
        ///  - Plaza de España, Sevilla Q956018: keskussuihkulähde on aukion pisteessä (0 m), rivi ei muuttaisi mitään.
        ///  - Quattro Canti Q1665695: 40 m:n risteys, aiheena neljä julkisivua; ei keskusmonumenttia.
        ///  - Pyhän Markuksen tori Q217527: kellotorni (tornisääntö).
        /// Vanhankaupungin aukio ja Senaatintori saavat rivin, vaikka vieressä on torni (astronominen kello 75 m, tuomiokirkko 103 m):
        /// tornisääntö voittaa, kun torni on kierroksella; rivi palvelee aukion kehystä ilman tornia (esim. toiveena).
        /// </summary>
        public static readonly (string q, string nimi, double lat, double lon, double monLat, double monLon)[] AukionMonumentit =
        {
            ("Q189503", "Concorden aukio: Luxorin obeliski (Q1503331), P625, 19 m", 48.8656331, 2.3212357, 48.865475, 2.321133),
            ("Q898629", "Place des Vosges: Ludvig XIII:n ratsastajapatsas (Q3497619), P625, 5 m", 48.855555555556, 2.3655555555556, 48.8556, 2.36553),
            ("Q421678", "Vanhankaupungin aukio: Jan Husin muistomerkki (Q3499497), P625, 37 m", 50.0875, 14.421388888889, 50.08777778, 14.42111111),
            ("Q463400", "Piazza Navona: Neljän joen suihkulähde (Q655470), P625, 28 m", 41.89871, 12.47316, 41.898953, 12.473075),
            ("Q824997", "Piazza del Popolo: Flaminion obeliski (Q568194), P625, 3 m", 41.910714, 12.476317, 41.9107, 12.47635),
            ("Q129143", "Trafalgar Square: Nelsonin pylväs (Q842089), P625, 35 m", 51.508055555556, -0.12805555555556, 51.50775, -0.12794444444444444),
            ("Q839050", "Dam-aukio: Kansallismonumentti (Q473851), P625 (2. arvo; 1. arvo 40 m sivussa), 65 m", 52.37306, 4.89278, 52.372840527165266, 4.893665449073751),
            ("Q170103", "Gendarmenmarkt: Schillerin muistomerkki (Q1295061), P625, 5 m", 52.51361111111111, 13.392777777777777, 52.5136, 13.3927),
            ("Q299973", "Sankarien aukio: Millenniumin muistomerkin pylväs (Q1177277), OSM w152833111 (P625 vain 3 desimaalia), 17 m", 47.51528, 19.07806, 47.515152, 19.078179),
            ("Q3390456", "Vallankumouksen aukio: Uudestisyntymisen muistomerkki (Q6815562), P625 (OSM-solmu 26 m), 19 m", 44.43856, 26.0975, 44.438675, 26.09733056),
            ("Q5086152", "Charlotte Square: Albertin muistomerkki (Q17570702), P625, 4 m", 55.951765, -3.207686, 55.9518, -3.20767),
            ("Q1348158", "Piazzale Michelangelo: Daavidin pronssikopio, OSM n11514175156 (ei Wikidata-kohdetta), 16 m", 43.76292, 11.26516, 43.762825, 11.265008),
            ("Q4270926", "Leijonain piha: Leijonain suihkulähde (Q72715355), P625, 3 m", 37.1771, -3.58927, 37.177076, -3.589253),
            ("Q1329554", "Senaatintori: Aleksanteri II:n muistomerkki (Q11850682), P625, 4 m", 60.16947, 24.95228, 60.169502, 24.952282),
            ("Q999002", "Praça do Comércio: Joosef I:n ratsastajapatsas (Q18476235), P625, 9 m", 38.7075, -9.13639, 38.707539, -9.13648),
            ("Q1549270", "Rossio: Pietari IV:n pylväs (Q5150196), P625, 12 m", 38.713888888889, -9.1394444444444, 38.713797, -9.13937),
            ("Q1889515", "Prešerenin aukio: Prešerenin muistomerkki (Q7242492), P625, 28 m", 46.05137, 14.50595, 46.05140833, 14.50630833),
            ("Q359872", "Guillaume II:n aukio: Vilhelm II:n ratsastajapatsas, OSM w153272628 (ei Wikidata-kohdetta), 74 m", 49.61083, 6.13028, 49.610689, 6.131285),
            ("Q1123493", "Plaza Mayor: Filip III:n ratsastajapatsas (Q30899007), P625, 3 m", 40.41546, -3.70738, 40.4154368894268, -3.7073767124690953),
            ("Q427163", "Puerta del Sol: Kaarle III:n ratsastajapatsas (Q5848907), OSM w1221366184 (P625 49 m sivussa aukion keskellä), 43 m", 40.41694, -3.70361, 40.416747, -3.704045),
            ("Q1537446", "Cibeleen aukio: Cibeleen suihkulähde (Q2736564), P625, 18 m", 40.41917, -3.69306, 40.419331, -3.693093),
            ("Q1326261", "Plaza de España: Cervantesin muistomerkki (Q4343253), P625, 47 m", 40.423391666667, -3.7122333333333, 40.42314, -3.712677),
            ("Q3048023", "Stortorget: Stortorgetin kaivo (Q10681422), P625, 4 m", 59.325, 18.07083333, 59.324975, 18.07088056),
            ("Q844426", "Sergelin tori: Kristallvertikalaccent (lasiobeliski) (Q10549136), P625, 44 m", 59.3325, 18.064444444444, 59.332583333333, 18.065194444444),
        };
        public const double MonumenttiSadeM = 60;

        /// <summary>Aukion (lat, lon) keskusmonumentin paikka tai null (vain paikalla).</summary>
        public static (double lat, double lon)? Monumentti(double lat, double lon) => Monumentti(null, lat, lon);

        /// <summary>Aukion keskusmonumentin paikka tai null: ensin aukion Wikidata-tunnisteella (id), sitten paikalla (lat, lon).</summary>
        public static (double lat, double lon)? Monumentti(string id, double lat, double lon)
        {
            if (!string.IsNullOrEmpty(id))
                foreach (var m in AukionMonumentit) if (string.Equals(m.q, id.Trim(), StringComparison.OrdinalIgnoreCase)) return (m.monLat, m.monLon);
            foreach (var m in AukionMonumentit) if (KierrosLento.EtaisyysM(m.lat, m.lon, lat, lon) < MonumenttiSadeM) return (m.monLat, m.monLon);
            return null;
        }

        /// <summary>Täydentää workerin kohteen (katse_suunta puuttuu) paikan oletuksella.</summary>
        public static void Taydenna(OpasKohde k)
        {
            if (k == null || k.Kysymys || !double.IsNaN(k.KatseSuunta) || !(Hae(k.Lat, k.Lon) is Oletus o)) return;
            k.KatseSuunta = o.KatseSuunta; k.KatseKaari = o.KatseKaari; k.KatseLoppu = o.KatseLoppu; k.LaskuOsuus = o.LaskuOsuus;
        }
    }
}
