/*
 * MAASTOKOHTEET — GTM. Guatemalan maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Guatemalalla ei ollut yhtäkään karttamerkkiä eikä eläintäkyä
 * (docs/moduulit/karttanostot-kattavuus.md, Pohjois-Amerikka). Tämä on
 * maailman erän M4 Guatemalan osuus: kahdeksan KOHDETTA ja kolme
 * MAASTOKOHDETTA Euroopan erien mallilla (js/packs/maastokohteet-isl.js).
 *
 * EI AINEISTOTIEDOSTOA. tools/maastoaineisto/GTM.json-tiedostoa ei ole,
 * joten maastokohteet on valittu käsin (Keski-Amerikan korkein huippu,
 * maan syvin järvi ja suurin jokialue) ja koordinaatit on laskettu
 * koneella työkalun kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian artikkelista).
 *
 * GUATEMALA ON YLEISELLÄ REITILLÄ (tools/fokuskartta/maat.mjs): lehdelle
 * ei ole poltettu maastonimiä, joten merkin nimiö on nimen ainoa
 * esiintymä kartalla, eikä yksikään nimi ole laudan omassa nimitaulussa
 * (js/packs/maailmankartta-nimet.js). Sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Guatemalalla rajaus on olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.GTM), joten vartio pätee ja jokainen piste on tarkistettu
 * sitä vasten. Vartiota ei ole muutettu.
 *
 * MAA ON PIENI JA PELIKAUPUNKI KESKELLÄ, JOTEN ETÄISYYS MITATTIIN
 * TARKASTI. Guatemalan ainoa pelikaupunki on Guatemala City, ja
 * etäisyys on laskettu jokaiseen js/packs/maailmankartta.js
 * CITIES-kaupunkiin. Lähin uusi merkki on Iximche 17,5 lautayksikön
 * päässä pääkaupungista — yli KAUPUNGIN_KOHDALLA_SADE-rajan (7,
 * js/fokuskohteet.js), joten kaikki ovat pääkartan merkkejä. Juuri
 * tästä syystä listasta puuttuu Antigua Guatemala: se olisi 8,0
 * yksikön päässä eli käytännössä kaupungin kohdalla.
 *
 * VAIN MAAILMANKARTAN RIVI (erillislaudasta luovuttu, Raamattu
 * 30.8.2026). KUVATON ERÄ. Faktat en-Wikipediasta 6.9.2026.
 */
export const MAASTOKOHTEET_GTM = [
  /* ================================================================
   * MAASTO — huippu, järvi ja joki.
   * ============================================================== */
  {
    id: 'tajumulco',
    nimi: 'Tajumulco',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Keski-Amerikan korkein vuori?',
      'Miksi tulivuoren purkaushistoria on epäselvä?',
    ],
    korostukset: ['stratovulkaani|stratovulkaani'],
    nappi: 'Keski-Amerikan korkein, 4 203 metriä',
    // -91.9033 E / 15.0433 N — en-Wikipedia "Volcán Tajumulco"
    // Lähin pelikaupunki: Guatemala City 47,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2769.9, y: 2706.3 },
    },
    teksti: 'Tajumulco on suuri stratovulkaani San Marcosin maakunnassa Länsi-Guatemalassa ja '
      + '4 203 metrillään Keski-Amerikan korkein vuori. Se kuuluu Sierra Madre de Chiapasin '
      + 'vuorijonoon, joka alkaa Meksikon eteläisimmästä osavaltiosta. Vuorella on kaksi '
      + 'huippua, ja itäisen päähuipun laella on 50–70 metriä leveä kraatteri; läntinen '
      + 'Cerro Concepción jää 3 800 metriin. Purkaushistoria on epäselvä eikä viimeisen '
      + 'purkauksen ajankohtaa tiedetä: 1700- ja 1800-luvun alun kertomuksia purkauksista '
      + 'pidetään epätodennäköisinä. Huipulle noustaan noin viidessä tunnissa Tuichánin '
      + 'kylästä, mutta näkymä on usein pilvessä.',
    lahde: 'en-Wikipedia "Volcán Tajumulco", johdanto-osa ja osiot "Description" ja '
      + '"Geomorphology, Ecosystem, and Ascent Routes" (tarkistettu 6.9.2026).',
  },
  {
    id: 'atitlanjarvi',
    nimi: 'Atitlánjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Mitä Atitlán tarkoittaa?',
      'Kuinka syvä järvi on?',
    ],
    korostukset: ['nahuatl|nahuatlin'],
    nappi: 'Keski-Amerikan syvin järvi',
    // -91.2025 E / 14.6939 N — en-Wikipedia "Lake Atitlán"
    // Lähin pelikaupunki: Guatemala City 24,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2793.3, y: 2718.2 },
    },
    teksti: 'Atitlánjärvi on suuri luonnonjärvi Guatemalan ylängöillä Sierra Madren '
      + 'vuoristossa, Sololán maakunnassa maan lounaisosassa. Se on 340 metrin '
      + 'enimmäissyvyydellään Keski-Amerikan syvin järvi. Nimi tarkoittaa "vesien välissä": '
      + 'nahuatlin kielessä atl on vesi ja titlan tarkoittaa "välissä, vieressä, lähellä" — '
      + 'sanan atl loppu jää pois, kun siihen liitetään pääte.',
    lahde: 'en-Wikipedia "Lake Atitlán", johdanto-osa ja osio "Name" (tarkistettu 6.9.2026).',
  },
  {
    id: 'motagua',
    nimi: 'Motagua',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä mayojen jade tuli?',
      'Mikä on Motaguan siirros?',
    ],
    korostukset: ['jadeitiitti|jadeitiittia'],
    nappi: 'Jaden laakso ja mannerlaattojen sauma',
    // -89.8 E / 14.95 N (keskijuoksu, jadeesiintymien laakso) — en-Wikipedia "Motagua River"
    // Lähin pelikaupunki: Guatemala City 23,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2840, y: 2709.5 },
    },
    teksti: 'Motagua on 486 kilometriä pitkä joki, joka saa alkunsa Guatemalan läntisiltä '
      + 'ylängöiltä ja virtaa itään Hondurasinlahteen. Sen valuma-alue on 12 670 '
      + 'neliökilometriä eli Guatemalan suurin, ja joki kulkee neljäntoista maakunnan ja '
      + 'seitsemän eri ekoalueen läpi. Laaksossa on jadeitiittia, jota alueen '
      + 'alkuperäiskansat ovat käyttäneet vuosituhansia. Motaguan laakso merkitsee myös '
      + 'Motaguan siirrosta, Pohjois-Amerikan ja Karibian mannerlaattojen rajaa, ja siirros '
      + 'on aiheuttanut useita suuria maanjäristyksiä Guatemalassa. Nykyään joki on '
      + 'toisestakin syystä kuuluisa: se on maailman eniten muovia mereen päästäviä jokia, '
      + 'noin kaksi prosenttia koko maailman jokien muovipäästöistä.',
    lahde: 'en-Wikipedia "Motagua River", johdanto-osa ja osio "Course" (tarkistettu '
      + '6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ M4, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'tikal',
    nimi: 'Tikal',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Tikalin oikea nimi?',
      'Mikä yhdisti Tikalia Teotihuacániin?',
    ],
    korostukset: ['Yax Mutal|Yax Mutal'],
    nappi: 'Sademetsän suurvalta',
    // -89.6236 E / 17.2222 N — en-Wikipedia "Tikal"
    // Lähin pelikaupunki: Guatemala City 84,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2845.9, y: 2631.8 },
    },
    teksti: 'Tikal on suuren mayakaupungin raunio Peténin altaassa Pohjois-Guatemalan '
      + 'sademetsässä; kaupungin oma nimi oli luultavasti Yax Mutal. Se oli yhden mayojen '
      + 'mahtavimman valtakunnan pääkaupunki ja hallitsi klassisella kaudella noin vuosina '
      + '200–900 suurta osaa mayaseudusta poliittisesti, taloudellisesti ja sotilaallisesti. '
      + 'Monumentaalirakentaminen alkoi jo 300-luvulla eaa., ja kaupunki piti yllä yhteyksiä '
      + 'kauas Mesoamerikkaan: on merkkejä siitä, että yhden Tikalin suurista hallitsijasuvuista '
      + 'perustivat valloittajat Teotihuacánista 300-luvulla jaa. Klassisen kauden lopussa '
      + 'uusia monumentteja ei enää pystytetty, ja on merkkejä siitä, että eliitin palatsit '
      + 'poltettiin; väki väheni, ja kaupunki hylättiin 900-luvun loppuun mennessä. Tikal on '
      + 'parhaiten tunnettu suurista mayakaupungeista: hallitsijaluettelo on pitkä ja monen '
      + 'hallitsijan hauta on löydetty.',
    lahde: 'en-Wikipedia "Tikal", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'el-mirador',
    nimi: 'El Mirador',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä La Danta on?',
      'Miksi valkoisia teitä kutsutaan moottoriteiksi?',
    ],
    korostukset: ['pengertie|pengertiellä'],
    nappi: 'Maailman ensimmäinen moottoritieverkko?',
    // -89.92 E / 17.755 N — en-Wikipedia "El Mirador"
    // Lähin pelikaupunki: Guatemala City 99,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2836, y: 2613.5 },
    },
    teksti: 'El Mirador on laaja esiklassisen kauden (1000 eaa. – 250 jaa.) mayakaupunkien '
      + 'keskus Peténin pohjoisosassa, ja sitä pidetään esiklassisen kauden tärkeimpänä '
      + 'kaupunkikokonaisuutena. Sen pyramideista erottuu La Danta, joka on tilavuudeltaan '
      + 'ja korkeudeltaan maailman suurimpia. Alueella arvioidaan olleen noin 800 kaupunkia, '
      + 'ja El Mirador oli kaupan, uskonnollisten menojen ja hallitsijoiden keskus. '
      + 'Kaupungit yhdistettiin kolmellatoista pengertiellä, mikä kertoo El Miradorin vallasta '
      + 'naapureihinsa nähden. Valkoiset tiet ovat 40 metriä leveitä ja 2–5 metriä korkeita, '
      + 'ja tutkijat ovat kutsuneet niitä maailman ensimmäiseksi moottoritieverkoksi. Alue '
      + 'kartoitettiin ensi kerran vasta 1962, ja tarkemmat tutkimukset alkoivat 1978.',
    lahde: 'en-Wikipedia "El Mirador", johdanto-osa ja osio "European discovery" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'quirigua',
    nimi: 'Quiriguá',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Quiriguássa tapahtui vuonna 738?',
      'Mikä tekee paikan steeleistä erityisiä?',
    ],
    korostukset: ['steele|steele'],
    nappi: 'Vasallikaupunki, joka kaatoi isäntänsä',
    // -89.0403 E / 15.2686 N — en-Wikipedia "Quiriguá"
    // Lähin pelikaupunki: Guatemala City 50,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2865.3, y: 2698.6 },
    },
    teksti: 'Quiriguá on mayakaupungin raunio Izabalin maakunnassa alajuoksun Motaguan '
      + 'varrella, tärkeiden kauppareittien risteyksessä. Paikka oli asuttu jo vuonna 200, '
      + 'akropoliin rakentaminen alkoi noin 550, ja suurin rakennuskausi käynnistyi '
      + '700-luvulla. Kasvun syy oli sota: kuningas Kʼakʼ Tiliw Chan Yopaat voitti Copánin '
      + 'vuonna 738, ja Copánin suurin kuningas Uaxaclajuun Ubʼaah Kʼawiil eli "18 Kania" '
      + 'vangittiin ja uhrattiin Quiriguán suurella aukiolla. Siihen asti Quiriguá oli ollut '
      + 'Copánin vasalli, mutta sen jälkeen se säilytti itsenäisyytensä. Seremonia-arkkitehtuuri '
      + 'on vaatimatonta, mutta veistokset ovat huikeita: paikalla on mayamaailman korkein '
      + 'steele. Unesco otti kohteen luetteloonsa 1981.',
    lahde: 'en-Wikipedia "Quiriguá", johdanto-osa ja osio "Name and location" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'seibal',
    nimi: 'Seibal',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Seibalin steelet ovat epätavallisen myöhäisiä?',
      'Mistä paikan nimi tulee?',
    ],
    korostukset: ['romahdus|romahdus'],
    nappi: 'Kaupunki, joka eli mayaromahduksen yli',
    // -90.0578 E / 16.5103 N — en-Wikipedia "Seibal"
    // Lähin pelikaupunki: Guatemala City 56,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2831.4, y: 2656.2 },
    },
    teksti: 'Seibal eli El Ceibal on klassisen kauden mayakaupunki Peténin pohjoisosassa noin '
      + 'sata kilometriä Tikalista lounaaseen, ja se oli Pasión-joen alueen suurin kaupunki. '
      + 'Sen pääkausi oli myöhäisellä esiklassisella kaudella (400 eaa. – 200 jaa.), minkä '
      + 'jälkeen se taantui — mutta se nousi uudelleen aivan lopussa ja saavutti toisen '
      + 'huippunsa noin vuosina 830–890, jolloin väkeä oli arviolta 8 000–10 000. Sen steelien '
      + 'päiväykset ovat poikkeuksellisen myöhäisiä: monumentteja pystytettiin vielä sen '
      + 'jälkeen, kun klassisen mayakulttuurin romahdus oli jo niellyt suurimman osan '
      + 'Peténiä, ja myöhäisissä monumenteissa näkyy vaikutteita Keski-Meksikosta ja '
      + 'Meksikonlahden rannikolta. Nimi on väännös espanjan sanasta ceibal, "paikka jossa '
      + 'kasvaa ceiba-puita".',
    lahde: 'en-Wikipedia "Seibal", johdanto-osa ja osio "Etymology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'iximche',
    nimi: 'Iximche',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä Guatemalan nimi tulee?',
      'Miksi kaqchikelit hylkäsivät pääkaupunkinsa?',
    ],
    korostukset: ['Quauhtemallan|Quauhtemallan'],
    nappi: 'Täältä maa sai nimensä',
    // -90.9967 E / 14.7367 N — en-Wikipedia "Iximche"
    // Lähin pelikaupunki: Guatemala City 17,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2800.1, y: 2716.8 },
    },
    teksti: 'Iximche oli myöhäisen jälkiklassisen kauden kaqchikel-mayojen kuningaskunnan '
      + 'pääkaupunki vuodesta 1470 siihen asti, kun se hylättiin 1524. Kaupunki perustettiin '
      + 'helposti puolustettavalle harjanteelle syvien rotkojen väliin, ja siinä oli '
      + 'pyramiditemppeleitä, palatseja ja kaksi pallokenttää. Espanjalaisten tullessa '
      + 'kaqchikelit lähettivät omat lähettiläänsä ja tarjosivat liittoa; Pedro de Alvarado '
      + 'otettiin 1524 hyvin vastaan, ja Iximchestä tehtiin Guatemalan kuningaskunnan '
      + 'ensimmäinen pääkaupunki. Juuri siitä maan nimi tulee: espanjalaiset kutsuivat '
      + 'kaupunkia nahuatlinkielisten liittolaistensa mukaan nimellä Quauhtemallan, '
      + '"metsäinen maa". Liitto katkesi pian liiallisiin veronkantovaatimuksiin, kaqchikelit '
      + 'jättivät kaupunkinsa, ja espanjalaiset karkurit polttivat sen kahta vuotta myöhemmin.',
    lahde: 'en-Wikipedia "Iximche", johdanto-osa ja osio "Etymology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chichicastenango',
    nimi: 'Chichicastenango',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Popol Vuh on?',
      'Kuinka moni kaupungissa puhuu kʼicheʼä?',
    ],
    korostukset: ['Popol Vuh|Popol Vuhin'],
    nappi: 'Täällä pyhä kirja saatiin talteen',
    // -91.1108 E / 14.9422 N — en-Wikipedia "Chichicastenango"
    // Lähin pelikaupunki: Guatemala City 20,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2796.3, y: 2709.8 },
    },
    teksti: 'Chichicastenango on kaupunki Guatemalan ylängöillä 1 965 metrin korkeudessa, ja '
      + 'se on ollut kʼicheʼ-mayojen seremoniallinen ja alueellinen keskus. Sen tunnetuin '
      + 'merkitys on kirjallinen: juuri täällä säilytettiin ja kirjoitettiin muistiin '
      + '1700-luvun alussa Popol Vuhin alkuperäiskäsikirjoitus, kʼicheʼ-kansan pyhä kertomus. '
      + 'Espanjalaiset valloittajat antoivat kaupungille nahuatlinkielisen nimen '
      + 'Tzitzicaztenanco, "nokkosten paikka", tlaxcalalaisten liittolaistensa kielellä; '
      + 'alkuperäinen kʼicheʼ-nimi oli Chaviar. Vuoden 2012 laskennan mukaan 98,5 prosenttia '
      + 'kunnan asukkaista on kʼicheʼ-mayoja: 21 prosenttia puhuu vain kʼicheʼä, 71 '
      + 'prosenttia sekä kʼicheʼä että espanjaa ja loput 8 prosenttia vain espanjaa.',
    lahde: 'en-Wikipedia "Chichicastenango", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'semuc-champey',
    nimi: 'Semuc Champey',
    tyyppi: 'muu',
    kysymykset: [
      'Mihin Cahabón-joki katoaa?',
      'Mitä Semuc Champey tarkoittaa?',
    ],
    korostukset: ['travertiini|travertiinista'],
    nappi: 'Paikka, jossa joki piiloutuu maan alle',
    // -89.95 E / 15.5333 N — en-Wikipedia "Semuc Champey"
    // Lähin pelikaupunki: Guatemala City 28,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2835, y: 2689.6 },
    },
    teksti: 'Semuc Champey on luonnonmuodostuma Alta Verapazin maakunnassa: 300 metriä pitkä '
      + 'travertiinista eli kalkkisaostumasta syntynyt luonnonsilta, jonka ali Cahabón-joen '
      + 'päävirta syöksyy maanalaiseen luolastoon kurkun kautta, jota paikalliset kutsuvat '
      + 'nimellä El Sumidero. Sillan päällä on porrasmaisia luonnonaltaita, joiden turkoosi '
      + 'vesi tulee vuorten lähteistä — oma makean veden pikkumaailmansa keskellä trooppista '
      + 'sademetsää. Nimi tulee qʼeqchiʼn kielestä ja tarkoittaa paikkaa, jossa joki '
      + 'piiloutuu maan alle. Luonnonmuistomerkiksi kohde säädettiin 2005. Parhaat näkymät '
      + 'ovat El Miradorin näköalapaikalta, jonne noustaan noin 45 minuuttia viidakkopolkua '
      + 'ylös.',
    lahde: 'en-Wikipedia "Semuc Champey", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'san-felipe-de-lara',
    nimi: 'San Felipe de Lara',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnake rakennettiin juuri tähän kohtaan?',
      'Mitä kautta merirosvot pääsivät Izabaljärvelle?',
    ],
    korostukset: ['merirosvo|merirosvot'],
    nappi: 'Kapeikko, jonka merirosvot ryöstivät moneen kertaan',
    // -88.9833 E / 15.6333 N — en-Wikipedia "Castle of San Felipe de Lara"
    // Lähin pelikaupunki: Guatemala City 56,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2867.2, y: 2686.2 },
    },
    teksti: 'Castillo de San Felipe de Lara on espanjalainen siirtomaalinnake Izabaljärven '
      + 'suulla Itä-Guatemalassa. Järvi on yhteydessä Karibianmereen Dulce-joen ja El '
      + 'Golfeten kautta, ja linnake rakennettiin joen kapeimpaan kohtaan juuri siksi: '
      + 'siitä pääsi vartioimaan koko reittiä. Espanjalaiset käyttivät sitä useiden '
      + 'vuosisatojen ajan, ja sinä aikana merirosvot tuhosivat ja ryöstivät sen monta '
      + 'kertaa. Linnake on Unescon aieluettelolla vuodesta 2002 ja Río Dulcen '
      + 'kansallispuiston suosituimpia kohteita — vierailijamäärä nousi 45 652:sta vuonna '
      + '2001 yli 156 000:een vuonna 2003, ja yli 90 prosenttia kävijöistä on guatemalalaisia. '
      + 'Heinäkuun 1999 maanjäristys repi muureihin halkeamia.',
    lahde: 'en-Wikipedia "Castle of San Felipe de Lara", johdanto-osa ja osio "Tourism and '
      + 'conservation" (tarkistettu 6.9.2026).',
  },
];
