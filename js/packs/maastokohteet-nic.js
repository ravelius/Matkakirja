/*
 * MAASTOKOHTEET — NIC. Nicaraguan maasto ja kahdeksan kohdetta.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Nicaragualla ei ollut yhtäkään karttamerkkiä eikä eläintäkyä
 * (docs/moduulit/karttanostot-kattavuus.md, Pohjois-Amerikka). Tämä on
 * maailman erän M4 Nicaraguan osuus: kahdeksan KOHDETTA ja kolme
 * MAASTOKOHDETTA Euroopan erien mallilla (js/packs/maastokohteet-isl.js).
 *
 * EI AINEISTOTIEDOSTOA. tools/maastoaineisto/NIC.json-tiedostoa ei ole,
 * joten maastokohteet on valittu käsin ja koordinaatit laskettu
 * koneella työkalun kaavalla (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian artikkelista).
 *
 * MIKSI COCIBOLCA EI OLE TÄSSÄ. Nicaraguajärvi on jo laudan omalla
 * nimitaululla (js/packs/maailmankartta-nimet.js, "Nicaraguajärvi"
 * pisteessä 2988,3 / 2824,8), ja sääntö N3 sanoo, että sama nimi on
 * kartalla vain kerran. Järven tilalla maastokolmikossa on siksi
 * Cosigüinan tulivuori, ja järvi näkyy kartalla laudan omana nimenään.
 * Samasta syystä maastoon ei otettu Momotomboa: sen merkki olisi ollut
 * 8,0 lautayksikön päässä Managuasta eli käytännössä pelikaupungin
 * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js).
 *
 * NICARAGUA ON YLEISELLÄ REITILLÄ (tools/fokuskartta/maat.mjs): lehdelle
 * ei ole poltettu maastonimiä, joten merkin nimiö on nimen ainoa
 * esiintymä kartalla.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`).
 * Nicaragualla rajaus on olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.NIC), joten vartio pätee ja jokainen piste on
 * tarkistettu sitä vasten. Vartiota ei ole muutettu.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Nicaraguan ainoa pelikaupunki
 * on Managua, ja etäisyys on mitattu jokaiseen js/packs/maailmankartta.js
 * CITIES-kaupunkiin. Lähin uusi merkki on Ciudad Darío 12,6
 * lautayksikön päässä Managuasta, eli yli rajan 7.
 *
 * VAIN MAAILMANKARTAN RIVI (erillislaudasta luovuttu, Raamattu
 * 30.8.2026). KUVATON ERÄ. Faktat en-Wikipediasta 6.9.2026.
 */
export const MAASTOKOHTEET_NIC = [
  /* ================================================================
   * MAASTO — tulivuori, saari ja joki.
   * ============================================================== */
  {
    id: 'cosiguina',
    nimi: 'Cosigüina',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka kauas vuoden 1835 tuhka lensi?',
      'Mikä on kaldera?',
    ],
    korostukset: ['kaldera|kaldera'],
    nappi: 'Purkaus, joka viilensi koko maapallon',
    // -87.5697 E / 12.9822 N — en-Wikipedia "Cosigüina"
    // Lähin pelikaupunki: Managua 46,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2914.3, y: 2776.4 },
    },
    teksti: 'Cosigüina on stratovulkaani Nicaraguan länsiosassa, ja se muodostaa suuren '
      + 'niemimaan Fonsecanlahteen. Huippua leikkaa kaldera, joka on kaksi kertaa 2,4 '
      + 'kilometriä laaja ja 500 metriä syvä ja jonka pohjalla on kraatterijärvi Laguna '
      + 'Cosigüina. Tulivuoren kuuluisin hetki oli 20. tammikuuta 1835: se tuotti Nicaraguan '
      + 'historian suurimman purkauksen, ja tuhkaa on löydetty Meksikosta, Costa Ricasta ja '
      + 'Jamaikalta asti. Berkeley Earth Surface Temperature -analyysin mukaan purkaus '
      + 'laski maapallon keskimääräistä maanpintalämpötilaa tilapäisesti noin 0,75 astetta. '
      + 'Viimeksi vuori purkautui 1859, mikä on geologisessa ajassa vain hetki sitten.',
    lahde: 'en-Wikipedia "Cosigüina", johdanto-osa ja osio "Activity" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ometepe',
    nimi: 'Ometepe',
    tyyppi: 'saari',
    kysymykset: [
      'Mitä Ometepe tarkoittaa?',
      'Miksi saarelaiset muuttivat rinteille?',
    ],
    korostukset: ['kalliopiirros|kalliopiirroksista'],
    nappi: 'Kaksi tulivuorta yhdessä järvessä',
    // -85.5833 E / 11.5 N — en-Wikipedia "Ometepe"
    // Lähin pelikaupunki: Managua 38,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2980.6, y: 2826.5 },
    },
    teksti: 'Ometepe on Nicaraguajärven suurin saari, ja sen muodostavat kaksi tulivuorta, '
      + 'Concepción ja Maderas, jotka matala kannas yhdistää yhdeksi 276 neliökilometrin '
      + 'saareksi. Nimi tulee nawatin sanoista ome (kaksi) ja tepetl (vuori). Saarella on '
      + 'asuttu tuhansia vuosia: vanhimmat jäljet ovat makro-tšibtšalaisia kieliä puhuneilta '
      + 'asukkailta, ja Maderasin pohjoisrinteiden kalliopiirroksista vanhimmat ovat noin '
      + '300 eaa. Chorotegat ja nicaraot jatkoivat piirrosten tekemistä ja veistivät basaltista '
      + 'patsaita. Espanjalaisvalloituksen jälkeen merirosvot tulivat Karibialta San '
      + 'Juan -jokea myöten järvelle: he ryöstivät eläimet ja sadon, sieppasivat naisia ja '
      + 'rakensivat rannalle tukikohtia, minkä vuoksi saarelaiset siirtyivät asumaan '
      + 'korkeammalle rinteille. Elinkeinoina ovat karja, maanviljely ja matkailu; '
      + 'tärkein viljelykasvi on banaani.',
    lahde: 'en-Wikipedia "Ometepe", johdanto-osa ja osio "Inhabitants" (tarkistettu 6.9.2026).',
  },
  {
    id: 'san-juanjoki',
    nimi: 'San Juanjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea kutsutaan nimellä El Desaguadero?',
      'Miten kullankaivajat kulkivat New Yorkista San Franciscoon?',
    ],
    korostukset: ['härkähai|härkähaita'],
    nappi: 'Oikotie Atlantilta Tyynellemerelle',
    // -83.7 E / 10.9167 N (suisto Karibianmerellä) — en-Wikipedia "San Juan River (Nicaragua)"
    // Lähin pelikaupunki: Managua 100,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3043.3, y: 2846.2 },
    },
    teksti: 'San Juanjoki eli El Desaguadero, "laskuoja", virtaa 192 kilometriä '
      + 'Nicaraguajärvestä itään Karibianmereen. Suuri osa Nicaraguan ja Costa Rican rajasta '
      + 'kulkee joen etelärantaa pitkin, ja Cañas–Jerez-sopimuksen mukaan vedet ovat '
      + 'Nicaraguan ja Costa Rica saa käyttää tiettyjä osia vain kauppapurjehdukseen '
      + 'Nicaraguan luvalla. Joessa elää härkähaita, jotka nousevat myös järveen. Ennen '
      + 'Panaman kanavaa joki oli tärkeä osa reittiä Atlantilta Tyynellemerelle: Kalifornian '
      + 'kultaryntäyksen aikana kymmenettuhannet matkustivat Cornelius Vanderbiltin '
      + 'Accessory Transit Companyn höyrylaivalla jokea ylös ja Nicaraguajärven poikki, ja '
      + 'postivaunut veivät heidät loppumatkan Tyynenmeren rannalle. Samaa reittiä oli '
      + 'kuljetettu myös orjuutettuja ihmisiä.',
    lahde: 'en-Wikipedia "San Juan River (Nicaragua)", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ M4, 6.9.2026 — KAHDEKSAN KOHDETTA.
   * ============================================================== */
  {
    id: 'leon-nicaragua',
    nimi: 'León',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi vanha León hylättiin?',
      'Miksi pääkaupungiksi valittiin lopulta Managua?',
    ],
    korostukset: ['León Viejo|León Viejo'],
    nappi: 'Runoilijoiden ja yliopiston kaupunki',
    // -86.878 E / 12.4379 N — en-Wikipedia "León, Nicaragua"
    // Lähin pelikaupunki: Managua 19,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2937.4, y: 2794.8 },
    },
    teksti: 'León on Managuan jälkeen Nicaraguan toiseksi suurin kaupunki ja maan '
      + 'poliittinen ja henkinen keskus. Sen kansallinen yliopisto UNAN perustettiin 1812, '
      + 'ja se on Keski-Amerikan toiseksi vanhin. Kaupunki on ollut monen nicaragualaisen '
      + 'runoilijan koti — Rubén Daríon, Alfonso Cortésin ja Salomón de la Selvan. '
      + 'Ensimmäinen León perustettiin 1524 noin 30 kilometriä nykyisestä paikasta itään, '
      + 'mutta se hylättiin 1610 tulivuorenpurkauksen käynnistämien maanjäristysten jälkeen; '
      + 'rauniot tunnetaan nimellä León Viejo, ne kaivettiin esiin 1960 ja Unesco otti ne '
      + 'luetteloonsa 2000. León oli siirtomaa-ajoista lähtien maan pääkaupunki, mutta '
      + 'itsenäistymisen jälkeen pääkaupunki vaihteli sen ja Granadan välillä liberaalien ja '
      + 'konservatiivien vallan mukaan — kunnes kompromissina Managuasta tehtiin pysyvä '
      + 'pääkaupunki 1852.',
    lahde: 'en-Wikipedia "León, Nicaragua", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'granada-nicaragua',
    nimi: 'Granada',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Granadaa kutsutaan Suureksi sulttaanittareksi?',
      'Miten Granada erosi kilpailijastaan Leónista?',
    ],
    korostukset: ['La Gran Sultana|La Gran Sultana'],
    nappi: 'Mantereen ensimmäinen eurooppalainen kaupunki?',
    // -85.956 E / 11.9344 N — en-Wikipedia "Granada, Nicaragua"
    // Lähin pelikaupunki: Managua 19,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2968.1, y: 2811.8 },
    },
    teksti: 'Granada on Läntisen Nicaraguan kaupunki ja Granadan departementin pääkaupunki, '
      + 'historiallisesti maan tärkeimpiä sekä taloudellisesti että poliittisesti. '
      + 'Francisco Hernández de Córdoba antoi sille nimen Granada vuonna 1524, ja sitä '
      + 'pidetään näennäisesti Amerikan mantereen ensimmäisenä eurooppalaisena kaupunkina — '
      + 'muidenkin kaupunkien esittämästä vaatimuksesta poiketen Granada oli paitsi '
      + 'valloittajien asutus myös Aragonian kruunun ja Kastilian kuningaskunnan virallisiin '
      + 'asiakirjoihin merkitty kaupunki. Siirtomaa-ajan perintö näkyy yhä sen '
      + 'arkkitehtuurissa ja kaupunkirakenteessa. Lempinimi La Gran Sultana kertoo '
      + 'maurilaisesta ja andalusialaisesta ilmeestä — toisin kuin sisarkaupunki ja '
      + 'ikivanha kilpailija León, joka on kastilialainen.',
    lahde: 'en-Wikipedia "Granada, Nicaragua", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'el-castillo-nicaragua',
    nimi: 'El Castillo',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnake rakennettiin juuri koskien kohdalle?',
      'Ketä vastaan sitä rakennettiin?',
    ],
    korostukset: ['Raudal del Diablo|Raudal del Diablon'],
    nappi: 'Paholaisen koskien vartija',
    // -84.4011 E / 11.0197 N — en-Wikipedia "Fortress of the Immaculate Conception"
    // Lähin pelikaupunki: Managua 78,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3020, y: 2842.7 },
    },
    teksti: 'Castillo de la Inmaculada Concepción seisoo San Juanjoen etelärannalla El '
      + 'Castillon kylässä, noin kuuden kilometrin päässä Costa Rican rajasta ja tarkalleen '
      + 'Raudal del Diablon koskien kohdalla. Se valmistui 1675 osana San Juanjoen '
      + 'linnoitusketjua, jonka tehtävä oli torjua merirosvojen hyökkäykset Granadaan — '
      + 'kaupunkiin, johon pääsi Karibianmereltä purjehtimalla jokea ylös Nicaraguajärvelle. '
      + 'Kylä ja sen linnoitus säilyttivät strategisen merkityksensä Guatemalan '
      + 'kenraalikapteenikunnalle 1700-luvun loppupuolelle asti. Linnake on Nicaraguan '
      + 'tärkeitä historiallisia maamerkkejä ja Unescon aieluettelolla.',
    lahde: 'en-Wikipedia "Fortress of the Immaculate Conception", johdanto-osa (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'bluefields',
    nimi: 'Bluefields',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä Mosquitian kuningaskunta oli?',
      'Mistä kaupungin nimi tulee?',
    ],
    korostukset: ['Mosquitia|Mosquitian'],
    nappi: 'Kaupunki, joka oli oma kuningaskuntansa',
    // -83.7639 E / 12.0139 N — en-Wikipedia "Bluefields"
    // Lähin pelikaupunki: Managua 85,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3041.2, y: 2809.1 },
    },
    teksti: 'Bluefields on Nicaraguan eteläisen Karibian autonomisen alueen pääkaupunki '
      + 'Mosquitorannikolla. Sen suurin merkitys on historiallinen: se oli Mosquitian '
      + 'kuningaskunnan hallinnollinen pääkaupunki, ja kuningaskunta säilytti '
      + 'itsenäisyytensä ja myöhemmin Britannian protektoraattiaseman 1600-luvulta '
      + '1800-luvulle. 1600-luvun alusta lähtien hollantilaiset ja englantilaiset kaapparit '
      + 'käyttivät Bluefieldsjoen suuta luonnonsatamana — alueella asuivat jo kukrat, '
      + 'ulwat, ramat ja miskitot. Bluefields nousi keskukseksi 1844, moravialainen kirkko '
      + 'perustettiin 1848, ja 1860–1880-luvuilla brittiläinen ja amerikkalainen raha teki '
      + 'siitä banaanin, puutavaran ja merenkulun kauppapaikan, jossa asui kreoleja, '
      + 'miskitoja, eurooppalaisia ja muita alkuperäiskansoja. Kasvu hidastui, kun Nicaragua '
      + 'miehitti Mosquitian 1894.',
    lahde: 'en-Wikipedia "Bluefields", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'solentiname',
    nimi: 'Solentiname',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti saarten taiteilijayhteisön?',
      'Mitä primitivistinen maalaus tarkoittaa?',
    ],
    korostukset: ['primitivistinen|primitivistiset'],
    nappi: 'Saaristo, jossa kalastajista tuli maalareita',
    // -84.9 E / 11.1667 N (Mancarrón) — en-Wikipedia "Solentiname Islands"
    // Lähin pelikaupunki: Managua 62,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3003.3, y: 2837.8 },
    },
    teksti: 'Solentinamen saaristo on Nicaraguajärven eteläpäässä Río San Juanin '
      + 'departementissa: neljä suurempaa saarta ja noin 32 pienempää, kaikki '
      + 'vulkaanista alkuperää ja yhteensä 38 neliökilometriä. Saarilla asuu alle tuhat '
      + 'ihmistä, ja sähkö ja juokseva vesi ovat harvinaisia. Suurimmalla saarella '
      + 'Mancarrónilla on pappi ja runoilija Ernesto Cardenalin seurakunta: hän saapui '
      + 'saarille 1966 ja perusti 1970-luvun alussa taiteilijoiden yhteisön, joka toimii '
      + 'yhä. Yhteisö kehitti kansanperinteestä oman naivistisen taidesuuntansa, ja '
      + 'saarten primitivistiset maalaukset ja balsapuusta veistetyt linnut ovat haluttuja. '
      + 'San Fernandon saarella on kalliopiirroksia papukaijoista, apinoista ja ihmisistä, '
      + 'ja saariston tapahtumat päätyivät myös kirjallisuuteen: Julio Cortázarin novelli '
      + 'Apocalipsis de Solentiname sijoittuu tänne.',
    lahde: 'en-Wikipedia "Solentiname Islands", johdanto-osa sekä osiot "Geography" ja '
      + '"Tourism and economy" (tarkistettu 6.9.2026).',
  },
  {
    id: 'somoton-kanjoni',
    nimi: 'Somoton kanjoni',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä joki saa alkunsa kanjonin suulla?',
      'Miksi kanjoni löydettiin vasta 2004?',
    ],
    korostukset: ['mioseeni|mioseenikaudella'],
    nappi: 'Kanjoni, jota kukaan ei ollut tutkinut',
    // -86.6167 E / 13.5 N — en-Wikipedia "Somoto Canyon National Monument"
    // Lähin pelikaupunki: Managua 38,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2946.1, y: 2758.8 },
    },
    teksti: 'Somoton kanjoni on Madrizin departementissa Pohjois-Nicaraguassa, ja sen '
      + 'kansallisen luonnonmuistomerkin ala on noin 170 hehtaaria, josta 125 hehtaaria on '
      + 'itse kanjonia. Kanjonin suulla yhtyvät Tapacalí- ja Comalí-joet, ja niistä syntyy '
      + 'Coco-joki, joka virtaa kanjonin läpi ja siitä eteenpäin 750 kilometriä '
      + 'Karibianmereen. Kanjonia ei ollut tutkittu järjestelmällisesti, ennen kuin '
      + 'tšekkiläisten ja nicaragualaisten tutkijoiden ryhmä "löysi" sen 2004; sen '
      + 'arvellaan syntyneen 5–13 miljoonaa vuotta sitten mioseenikaudella. '
      + 'Luonnonmuistomerkiksi se julistettiin 29. marraskuuta 2006. Kanjonista tuli nopeasti '
      + 'matkailukohde, mutta sen mukana tuli myös töhryjä, joita viranomaiset käyvät '
      + 'puhdistamassa seiniltä.',
    lahde: 'en-Wikipedia "Somoto Canyon National Monument", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ciudad-dario',
    nimi: 'Ciudad Darío',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä modernismo oli?',
      'Miksi runoilijan sukunimi oli Darío eikä García?',
    ],
    korostukset: ['modernismo|modernismon'],
    nappi: 'Täällä syntyi Latinalaisen Amerikan runouden uudistaja',
    // -86.1222 E / 12.7286 N — en-Wikipedia "Rubén Darío"
    // Lähin pelikaupunki: Managua 12,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 2962.6, y: 2785 },
    },
    teksti: 'Metapan kaupunki Matagalpan departementissa kantaa nykyään nimeä Ciudad Darío, '
      + 'ja syy on yksi ihminen: täällä syntyi 18. tammikuuta 1867 Félix Rubén García '
      + 'Sarmiento, joka tunnetaan nimellä Rubén Darío. Hän käynnisti espanjankielisen '
      + 'kirjallisuuden modernismon, joka kukoisti 1800-luvun lopulla, ja vaikutti '
      + 'voimakkaasti koko 1900-luvun espanjankieliseen kirjallisuuteen ja journalismiin. '
      + 'Sukunimi on tarina sinänsä: kasteessa nimi oli García, mutta isän suku oli '
      + 'tunnettu Daríona jo sukupolvien ajan — Daríoksi kutsutun isoisoisän nimi jäi elämään '
      + 'niin, että isoisoäiti allekirjoitti asiakirjat nimellä Rita Darío ja runoilijan isä '
      + 'hoiti kauppansa Darío-nimellä. Lapsuutensa Rubén vietti Leónissa äitinsä tädin ja '
      + 'sedän kasvattamana.',
    lahde: 'en-Wikipedia "Rubén Darío", johdanto-osa ja osio "Life" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bilwi',
    nimi: 'Bilwi',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä tarkoittaa yhtiökaupunki?',
      'Millä nimillä paikkaa on kutsuttu?',
    ],
    korostukset: ['yhtiökaupunki|yhtiökaupunki'],
    nappi: 'Kolme nimeä, kolme historiaa',
    // -83.3833 E / 14.0333 N — en-Wikipedia "Puerto Cabezas"
    // Lähin pelikaupunki: Managua 111,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 3053.9, y: 2740.7 },
    },
    teksti: 'Puerto Cabezas on Nicaraguan pohjoisen Karibian autonomisen alueen kaupunki ja '
      + 'miskitokansan pääkaupunki. Miskitoksi se on Bilwi, ja englantilaiset kauppiaat '
      + 'kutsuivat seutua nimellä Bragman’s Bluff. Ensimmäisen tunnetun maininnan '
      + 'paikasta teki englantilainen merirosvo 1600-luvulla; kylä oli yksi kahdeksasta '
      + 'englantilaisesta asutuksesta alueella, kunnes ne tyhjennettiin 1787. Vuonna 1849 '
      + 'seudulla kävivät brittiläinen varakonsuli ja Mosquitorannikon kuningas George '
      + 'Augustus Frederic. Kalastajakylästä tuli yhtiökaupunki, kun Bragman’s Bluff '
      + 'Lumber Company sai Nicaraguan hallitukselta 28. tammikuuta 1921 lahjoituksena '
      + '50 000 hehtaaria maata — maata, jolla asui miskitoja. Yhdysvalloilla oli '
      + 'kaupungissa konsulaatti vuosina 1931–1940.',
    lahde: 'en-Wikipedia "Puerto Cabezas", johdanto-osa sekä osiot "Name" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
