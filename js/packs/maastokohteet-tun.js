/*
 * MAASTOKOHTEET — TUN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TUN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TUN.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Tunisian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maalla on jo fokuskohde (Karthagon sotasatama), jota ei toisteta täällä; vuorennimi on fi-Wikipedian asussa Jabal ash Shanabi.
 */
export const MAASTOKOHTEET_TUN = [
  {
    id: 'jabalashshanabi',
    nimi: 'Jabal ash Shanabi',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipulla on metallinen puolikuu?',
      'Mikä on biosfäärialue?',
    ],
    korostukset: ['Kasserine|Kasserinen'],
    nappi: 'Tunisian korkein huippu',
    // 8.6831 E / 35.2067 N — en-Wikipedia "Jebel ech Chambi"
    laudat: {
      maailmankartta: { x: 6122.8, y: 1987.6 },
      europe: { x: 377.9, y: 967.7 },
    },
    teksti: 'Tunisian korkeimman vuoren huipulla on metallinen puolikuu, ja sen pystyttivät maan '
      + 'partiolaiset heti itsenäistymisen jälkeen vuonna 1956 merkiksi omasta nousustaan. '
      + 'Jabal ash Shanabi kohoaa 1 544 metriin Kasserinen yläpuolella, muutaman kilometrin '
      + 'päässä Algerian rajasta, ja sen laella kasvaa mäntymetsä. Kivi on caliche-kalkkikiveä, '
      + 'luonnon omaa sementtiä, jonka eroosio on uurtanut syviin uomiin; kolme '
      + 'sedimentaatiokierrosta erottuu punaisina savivyöhykkeinä. Unesco nimesi vuoren '
      + 'biosfäärialueeksi 1977. Joulukuusta 2012 alkaen sen luolissa on käyty myös aseellisia '
      + 'operaatioita.',
    lahde: 'en-Wikipedia "Jebel ech Chambi", johdanto-osa sekä osiot "Description" ja "Biosphere '
      + 'Reserve" (tarkistettu 1.9.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Välimerta ympäröi maa lähes joka suunnalta?',
      'Mitä reittiä Välimereltä pääsee valtamerelle?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri jota maa ympäröi',
    // 11.6 E / 37.3 N — ulappa Kap Bonin niemen koillispuolella; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 6220, y: 1907.8 },
      europe: { x: 433.9, y: 912.6 },
    },
    teksti: 'Välimeri on virallisesti kaksi merta, ja raja kulkee Tunisian kärjen kautta: '
      + 'läntisen ja itäisen altaan välinen viiva vedetään Sisilian länsikärjestä Adventure '
      + 'Bankin matalikon yli Bon-niemelle. Meri on Euroopan, Aasian ja Afrikan välissä, ja '
      + 'maa ympäröi sen lähes kokonaan — valtamerelle pääsee vain lännestä, Gibraltarinsalmen '
      + 'kautta. Yhteys on ollut poikki ennenkin: noin 5,9 miljoonaa vuotta sitten meri jäi '
      + 'Atlantista erilleen ja kuivui osin tai kokonaan runsaan puolen miljoonan vuoden '
      + 'ajaksi, kunnes Zanclean tulva täytti altaan uudelleen 5,3 miljoonaa vuotta sitten. '
      + 'Tunisian rannikko on tämän altaan etelälaidalla, ja Medjerda tuo maan jokivedet '
      + 'siihen Tunisinlahdessa.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa ja osio "Extent", sekä "Medjerda '
      + 'River", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'medjerda',
    nimi: 'Medjerda',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä oli antiikin Utica?',
      'Miksi joki vaihtoi uomaa vuonna 1973?',
    ],
    korostukset: ['Utica|Utican'],
    nappi: 'Tunisian pisin joki',
    // 9.4 E / 36.6 N — joen keskijuoksu Testourin tienoilla; artikkelin koordinaatti 10,213 / 37,112 on suulla Tunisinlahdessa
    laudat: {
      maailmankartta: { x: 6146.7, y: 1934.6 },
      europe: { x: 391.7, y: 931 },
    },
    teksti: 'Medjerda hautasi kokonaisen merenlahden. Antiikin Utica oli satamakaupunki Utican '
      + 'lahden rannalla, mutta joen tuoma liete täytti lahtea vuosisata vuosisadalta: eteläosa '
      + 'umpeutui jo myöhäisantiikissa, ja pohjoisosasta meri vetäytyi keskiajalla ja uudella '
      + 'ajalla. Jäljelle jäi vain Ghar el Melhin laguuni — koko entisestä lahdesta. Joki itse '
      + 'on Tunisian pisin, noin 450 kilometriä, ja se alkaa Koillis-Algerian Tell-Atlaksesta '
      + 'ja laskee Tunisinlahteen. Vettä on padottu useaan kohtaan, ja se kastelee maan '
      + 'vehnäpeltoja. Vuoden 1973 suurtulvan jälkeen Medjerda siirsi uomaansa jälleen kerran '
      + 'ja kulkee nyt ihmisen kaivamaa kanavaa pitkin.',
    lahde: 'en-Wikipedia "Medjerda River", johdanto-osa ja osio "Course" (tarkistettu 1.9.2026).',
  },
  /* ═══════════════ ERÄ M16 (TUNISIA), 6.9.2026 ═══════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Tunisialla oli ennen tätä erää kolme maastokohdetta (yllä) ja yksi
   * kohde (js/packs/fokuskohteet-tun.js, Karthagon pyöreä sotasatama),
   * joten vaje oli seitsemän kohdetta. Ne ovat tässä lohkossa. Maastossa
   * ei ollut vajetta, joten uusia maastokohteita ei kirjoitettu.
   *
   * EI PELIKAUPUNGIN KOHDALLA. Tunisian ainoa laudan kaupunki on
   * Karthago (js/packs/maailmankartta.js CITIES, x 6108,1 / y 1921,9).
   * Etäisyys mitattiin jokaiseen laudan kaupunkiin, ja lähin uusi merkki
   * on Dougga 37,9 lautayksikön päässä Karthagosta; raja
   * KAUPUNGIN_KOHDALLA_SADE on 7. Jokaisen kohteen lähin kaupunki on
   * kirjattu sen koordinaattirivin viereen.
   *
   * KOLME EHDOKASTA JÄI POIS. Djerba ja Ichkeulin järvi olisivat
   * maastotyyppejä (saari, jarvi), eikä maastossa ollut vajetta; Tunisin
   * medina taas jäi pois, koska sen merkki olisi 6,6 lautayksikön päässä
   * Karthagon sotasataman merkistä eli käytännössä sen nimiön päällä.
   *
   * KUVATON ERÄ. Faktat en-Wikipedian raakatekstistä 6.9.2026.
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: 'dougga',
    nimi: 'Dougga',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaupungilla oli kaksi hallintoa yhtä aikaa?',
      'Miksi rauniot ovat säilyneet näin hyvin?',
    ],
    korostukset: ['Masinissa|Masinissalle'],
    nappi: 'Numidialaisten ja roomalaisten yhteinen kaupunki',
    // 9.21833 E / 36.42222 N — en-Wikipedia "Dougga".
    // Lähin kaupunki Karthago 37,9 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6140.6, y: 1941.4 },
    },
    teksti: 'Dougga on berberien, punilaisten ja roomalaisten yhteinen kaupunki ylätasanteella '
      + 'Pohjois-Tunisiassa, ja Unesco otti sen maailmanperintöluetteloon 1997 pitäen sitä '
      + 'Pohjois-Afrikan parhaiten säilyneenä roomalaisena pikkukaupunkina. Kaupunki näyttää '
      + 'syntyneen 500-luvulla eaa., ja forumin alta on kaivettu esiin Masinissalle omistettu '
      + 'temppeli, joka pystytettiin Micipsan hallituskauden kymmenentenä vuotena eli 139 eaa. '
      + 'Augustuksen ajoista lähtien paikalla oli kaksi yhteisöä rinnakkain, vanha kaupunki ja '
      + 'roomalaisten uudisasukkaiden pagus, ja kummallakin oli omat virkamiehensä kahden '
      + 'vuosisadan ajan; vasta vuonna 205 jaa. ne yhdistyivät yhdeksi municipiumiksi '
      + 'Septimius Severuksen aikana. Kuuluisimmat rakennukset ovat libyalais-punilainen '
      + 'mausoleumi, capitolium, teatteri sekä Saturnuksen ja Juno Caelestiksen temppelit. '
      + 'Rauniot ovat säilyneet, koska ne jäivät keskelle maaseutua eikä paikalle rakennettu '
      + 'uutta kaupunkia niin kuin Karthagoon.',
    lahde: 'en-Wikipedia "Dougga", johdanto sekä osiot "Location", "Berber Kingdom" ja '
      + '"Roman Empire" (tarkistettu 6.9.2026).',
  },
  {
    id: 'eljemin-amfiteatteri',
    nimi: 'El Jemin amfiteatteri',
    // Kartalle lyhyt asu: koko nimi ei mahdu nimiöön.
    nimio: 'El Jem',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka moni mahtui katsomoon?',
      'Miksi rakennus jäi kesken?',
    ],
    korostukset: ['Thysdrus|Thysdrukseen'],
    nappi: 'Afrikan suurin areena',
    // 10.70694 E / 35.29639 N — en-Wikipedia "Amphitheatre of El Jem".
    // Lähin kaupunki Karthago 103,1 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6190.2, y: 1984.2 },
    },
    teksti: 'El Jemin soikea amfiteatteri rakennettiin noin vuonna 238 jaa. antiikin '
      + 'Thysdrukseen, ja se on yksi maailman parhaiten säilyneistä roomalaisista '
      + 'kivirakennelmista ja lajissaan ainutlaatuinen Afrikassa. Katsomoon arvioidaan '
      + 'mahtuneen 35 000 katsojaa, ja akselit ovat 148 ja 122 metriä pitkät. Se on paikan '
      + 'kolmas amfiteatteri; rakennuttajaksi on esitetty Gordianus-suvun jäseniä, ja työ jäi '
      + 'kesken, koska seuraajilla ei ollut syytä eikä halua saattaa sitä loppuun. Keskiajalla '
      + 'rakennus toimi linnoituksena, ja väki haki sieltä suojaa vandaalien hyökätessä '
      + 'vuonna 430 ja arabien vuonna 647. Rauniot otettiin maailmanperintöluetteloon 1979.',
    lahde: 'en-Wikipedia "Amphitheatre of El Jem", johdanto ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'kairouanin-altaat',
    nimi: 'Kairouanin altaat',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mihin altaita tarvittiin?',
      'Kuka teki Kairouanista pääkaupungin?',
    ],
    korostukset: ['aghlabidit|aghlabidien'],
    nappi: 'Islamilaisen maailman vesitekniikkaa',
    // 10.10083 E / 35.67722 N — en-Wikipedia "Kairouan".
    // Lähin kaupunki Karthago 78,3 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6170, y: 1969.8 },
    },
    teksti: 'Kairouan perustettiin noin vuonna 670 sotilastukikohdaksi keskelle tiheää metsää '
      + 'ja kauas merestä. Vuonna 800 kalifi Harun ar-Rashid vahvisti Ibrahim ibn al-Aghlabin '
      + 'Ifriqiyan perinnölliseksi hallitsijaksi, ja aghlabidien suvun aikana 800–909 '
      + 'kaupungista tuli heidän pääkaupunkinsa ja oppineiden keskus: he rakensivat suuren '
      + 'moskeijan ja perustivat sen yhteyteen korkeakoulun. Medinan muurien ulkopuolella '
      + 'olevat 800-luvun altaat ovat säilynein osa heidän vesirakennustöistään, ja niitä '
      + 'pidetään islamilaisen maailman historian merkittävimpänä vesijärjestelmänä. '
      + 'Rakennelma peittää 11 000 neliömetriä, ja siihen kuuluu pieni selkeytysallas, suuri '
      + 'varastoallas ja kaksi ottoallasta, yhteensä 68 800 kuutiometriä vettä.',
    lahde: 'en-Wikipedia "Kairouan", johdanto sekä osiot "Foundation and early Islamic '
      + 'period", "Aghlabid period" ja "Aghlabid basins" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kerkouane',
    nimi: 'Kerkouane',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi juuri tämä punilainen kaupunki säilyi?',
      'Mistä kaupunkilaiset saivat elantonsa?',
    ],
    korostukset: ['murex|murex-kotiloiden'],
    nappi: 'Ainoa säilynyt punilainen kaupunki',
    // 11.09917 E / 36.94639 N — en-Wikipedia "Kerkouane".
    // Lähin kaupunki Sisilia 88,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6203.3, y: 1921.4 },
    },
    teksti: 'Kerkouane on foinikialais-punilainen kaupunki Kap Bonin niemellä, ja Unesco otti '
      + 'sen maailmanperintöluetteloon 1985 sillä perusteella, että se on ainoa säilynyt '
      + 'esimerkki punilaisesta kaupungista. Se hylättiin todennäköisesti ensimmäisen '
      + 'puunilaissodan aikana, eivätkä roomalaiset rakentaneet sitä uudelleen, joten '
      + 'raunioiden päälle ei tullut mitään myöhempää. Asukkaita ei ollut enempää kuin noin '
      + '1 200, enimmäkseen kalastajia ja käsityöläisiä; murex-kotiloiden kuoria on niin '
      + 'paljon, että kaupunki näyttää valmistaneen purppuraväriä, ja lisäksi suolaa ja '
      + 'garum-kalakastiketta. Kadut ovat leveitä ja tontit ruutukaavassa, ja talot on '
      + 'rakennettu saman pohjapiirroksen mukaan; monen seinät ovat yhä pystyssä ja '
      + 'julkisivujen värjätty savi näkyy paikoin edelleen. Nimen antoivat arkeologit, sillä '
      + 'kaupungin antiikinaikaista nimeä ei tunneta yhdestäkään lähteestä.',
    lahde: 'en-Wikipedia "Kerkouane", johdanto ja osio "Excavations" (tarkistettu 6.9.2026).',
  },
  {
    id: 'soussen-ribat',
    nimi: 'Soussen ribat',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on ribat?',
      'Mitä varten kulmatorni rakennettiin?',
    ],
    korostukset: ['ribat|ribateista'],
    nappi: 'Rannikon vartiolinnake vuodelta 821',
    // 10.6388 E / 35.8277 N — en-Wikipedia "Ribat of Sousse".
    // Lähin kaupunki Karthago 90,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6188, y: 1964.1 },
    },
    teksti: 'Soussen ribat on parhaiten säilynyt niistä lukuisista ribateista eli '
      + 'linnoitetuista vartiopaikoista, joita Ifriqiyan rannikolle rakennettiin tasaisin '
      + 'välein niin, että merkin sai kulkemaan nopeasti linnakkeelta toiselle. Tornin oven '
      + 'yllä oleva marmorilaatta mainitsee aghlabidiruhtinas Ziyadat Allah I:n ja vuoden 821, '
      + 'ja se on Tunisian vanhin säilynyt islamilaisen ajan monumentaalikirjoitus. Linnake on '
      + 'noin 38 metriä sivultaan ja 11 metriä korkea, ja sen kulmia vahvistavat pyöreät '
      + 'tornit; kaakkoiskulman lieriötorni on mitä todennäköisimmin ollut majakka. Yläkerran '
      + 'holvattu sali mihrabeineen on Pohjois-Afrikan vanhin säilynyt rukoushuone, ja siihen '
      + 'mahtui noin 200 rukoilijaa. Ribat otettiin Soussen medinan kanssa '
      + 'maailmanperintöluetteloon 1988.',
    lahde: 'en-Wikipedia "Ribat of Sousse", johdanto sekä osiot "History" ja "Architecture" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'matmata',
    nimi: 'Matmata',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten maanalainen talo rakennetaan?',
      'Miksi kylä tuli tunnetuksi vasta 1969?',
    ],
    korostukset: ['troglodyytti|troglodyyttitaloissa'],
    nappi: 'Kylä, joka on kaivettu maahan',
    // 9.96682 E / 33.54264 N — en-Wikipedia "Matmata, Tunisia".
    // Lähin kaupunki Tripoli 111,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6165.6, y: 2050.1 },
    },
    teksti: 'Matmata on pieni berberinkielinen kylä Etelä-Tunisiassa, ja osa asukkaista asuu '
      + 'yhä maanalaisissa troglodyyttitaloissa. Talo tehdään kaivamalla maahan suuri kuoppa '
      + 'ja louhimalla sen reunoihin huoneiksi tarkoitetut luolat; osassa taloja on useita '
      + 'kuoppia, jotka on yhdistetty käytävillä. Muualla ei tiedetty vuoteen 1969 asti, että '
      + 'alueella oli vaeltavien heimojen lisäksi vakinaista asutusta: sinä vuonna 22 päivää '
      + 'kestäneet rankkasateet tulvivat luolataloihin ja saivat monet niistä sortumaan, ja '
      + 'avunpyyntöä varten kylästä lähetettiin valtuuskunta Gabèsin aluekeskukseen. Apua '
      + 'saatiin ja maan päälle rakennettiin uusi kylä, mutta useimmat perheet jatkoivat '
      + 'elämäänsä korjatuissa maanalaisissa taloissa. Vuonna 2004 asukkaita oli 2 116.',
    lahde: 'en-Wikipedia "Matmata, Tunisia", johdanto ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sbeitla',
    nimi: 'Sbeitla',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupungin vauraus tuli?',
      'Miksi vuosi 647 on tärkeä?',
    ],
    korostukset: ['Sufetula|Sufetulan'],
    nappi: 'Kolme temppeliä samalla forumilla',
    // 9.12944 E / 35.22972 N — en-Wikipedia "Sbeitla".
    // Lähin kaupunki Karthago 71,2 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 6137.6, y: 1986.7 },
    },
    teksti: 'Sbeitlan vieressä ovat antiikin Sufetulan rauniot, joissa on Tunisian parhaiten '
      + 'säilyneet roomalaiset forumtemppelit. Seudun vanhimmat jäljet ovat punilaisia '
      + 'megaliitteja ja hautakiviä, ja alue rauhoitettiin ja asutettiin keisari Vespasianuksen '
      + 'ja hänen poikiensa aikana vuosina 67–69. Kaupungin vauraus tuli oliiviöljystä: '
      + 'raunioista löydetyt oliivipuristimet vahvistavat, että 100-luvun menestys perustui '
      + 'öljyyn, ja se teki mahdolliseksi komean forumin rakentamisen. Vandaalien jälkeen '
      + 'bysanttilaisten aika toi uuden loiston. Vuonna 647 kaupungin edustan kentillä käytiin '
      + 'Sufetulan taistelu, joka päättyi ratkaisevaan voittoon ja aloitti muslimivalloituksen '
      + 'Pohjois-Afrikassa.',
    lahde: 'en-Wikipedia "Sbeitla", johdanto ja osio "History" (tarkistettu 6.9.2026).',
  },
];

