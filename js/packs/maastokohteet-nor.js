/*
 * MAASTOKOHTEET — NOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NOR.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 3 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Norjassa oli neljä maastokohdetta ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat. Malli on sama
 * kuin K2-erässä 1 (js/packs/maastokohteet-isl.js, -che.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-nor.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista liittyy peliin hakemiston
 * kautta (js/packs/maastokohteet.js), joten kohteet ovat kartalla heti.
 *
 * NORJASSA ON KOLME PELIKAUPUNKIA (Oslo, Bergen, Tromssa), ja etäisyys
 * mitattiin niihin kaikkiin. Lähin uusi merkki on Eidsvollin rakennus
 * 23,7 lautayksikön päässä Oslosta — reilusti yli kaupungin kohdalla
 * -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js). Kaikki
 * kahdeksan ovat siis pääkartan merkkejä.
 *
 * MITÄ JÄTETTIIN POIS JA MIKSI: Bergenin Bryggen ja Oslon Oseberg
 * jäisivät pelikaupunkien kohdalle, ja Huippuvuoret jäävät maan
 * fokuslehden rajauksen ulkopuolelle (tools/johda-maastokohteet.mjs
 * osuuLehteen). Norjanmeri ja Barentsinmeri ovat jo yllä olevia
 * maastokohteita; ne esiintyvät uusissa teksteissä mutta eivät
 * uutena nimenä kartalla (sääntö N3).
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Norjan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_NOR = [
  {
    id: 'galdhpiggen',
    nimi: 'Galdhøpiggen',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä Jotunheimen tarkoittaa?',
      'Onko Galdhøpiggenilla jäätikköä?',
    ],
    korostukset: ['Jotunheimen|Jotunheimenin'],
    nappi: 'Pohjois-Euroopan korkein',
    // 8.3125 E / 61.6364 N — en-Wikipedia "Galdhøpiggen"
    laudat: {
      maailmankartta: { x: 6110.4, y: 843.1 },
      europe: { x: 370.8, y: 272.6 },
    },
    teksti: 'Galdhøpiggen on Norjan, Skandinavian ja koko Pohjois-Euroopan korkein vuori: 2 469 '
      + 'metriä. Se sijaitsee Lomin kunnassa Innlandetin maakunnassa Jotunheimenin vuoristossa '
      + 'Jotunheimenin kansallispuiston sisällä. Ympärillä kohoaa tiheä joukko muita huippuja — '
      + 'Keilhaus topp, Store Styggehøe, Storjuvtinden ja Skardstinden muiden muassa.',
    lahde: 'en-Wikipedia "Galdhøpiggen", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'norjanmeri',
    nimi: 'Norjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Norjan rannikko pysyy sulana talvella?',
      'Mikä Jan Mayenin harjanne on?',
    ],
    nappi: 'Meri, joka ei jäädy',
    // 6 E / 66.4 N — ulappa Norjan länsirannikon edustalla; artikkelin oma keskipiste on 2 / 69
    laudat: {
      maailmankartta: { x: 6033.3, y: 589.5 },
      europe: { x: 326.4, y: 147.3 },
    },
    teksti: 'Norjanmeri on reunameri Norjasta luoteeseen, Pohjanmeren ja Grönlanninmeren välissä, '
      + 'ja se rajautuu koillisessa Barentsinmereen. Lounaassa sen erottaa Atlantista Islannin '
      + 'ja Färsaarten välinen vedenalainen harjanne, pohjoisessa Jan Mayenin harjanne erottaa '
      + 'sen Grönlanninmerestä. Meri luetaan joko Atlanttiin tai Jäämereen kuuluvaksi.',
    lahde: 'en-Wikipedia "Norwegian Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'barentsinmeri',
    nimi: 'Barentsinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Willem Barentsz oli?',
      'Miksi merta kutsuttiin ennen Murmanskinmereksi?',
    ],
    korostukset: ['Willem Barentsz|Willem Barentszilta'],
    nappi: 'Meri, joka on nimetty hollantilaiselta',
    // 26 E / 71.3 N — ulappa Finnmarkin rannikon edustalla; artikkelin oma keskipiste on 40 / 75
    laudat: {
      maailmankartta: { x: 6700, y: 303.8 },
      europe: { x: 710.4, y: 18.4 },
    },
    teksti: 'Barentsinmeressä ui maailman viimeinen suuri turskakanta, eikä sen kohtaloa '
      + 'ratkaise kumpikaan rantavaltio yksin: Norja ja Venäjä ovat hoitaneet kalastusta '
      + 'yhdessä vuonna 1976 perustetussa yhteiskomissiossa. Meri on Jäämeren reunameri Norjan '
      + 'ja Venäjän pohjoisrannikoilla, jaettu maiden aluevesiksi, ja se lämpenee nopeammin '
      + 'kuin mikään muu osa arktista aluetta — tutkijat puhuvat sen atlantisoitumisesta. '
      + 'Venäläisillä kartoilla se oli 1500-luvulla Murmanskinmeri; nykyinen nimi tulee '
      + 'hollantilaiselta merenkulkijalta Willem Barentszilta, joka johti vuosisadan lopulla '
      + 'ensimmäisiä retkiä kauas pohjoiseen. Norjan puolella Vardøn satama pysyy sulana '
      + 'ympäri vuoden, koska lämmin Pohjois-Atlantin virta yltää tänne asti.',
    lahde: 'en-Wikipedia "Barents Sea", johdanto-osa sekä osiot "Extent", "Name" ja "Fishing" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'glomma',
    nimi: 'Glomma',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Glommaa käytettiin tukinuittoon?',
      'Mikä on Fetsundin uittolaitos?',
    ],
    korostukset: ['tukinuitto|tukinuittojoki'],
    nappi: 'Norjan pisin joki',
    // 11.56 E / 60.88 N — Elverum joen keskijuoksulla; artikkelin koordinaatti 10,931 / 59,218 on suistossa
    laudat: {
      maailmankartta: { x: 6218.7, y: 881.6 },
      europe: { x: 433.2, y: 292.5 },
    },
    teksti: 'Isoisäsi aikaan Glomma oli Norjan työteliäin joki: se virtaa maan rikkaimpien '
      + 'metsäseutujen läpi, ja siksi siitä tuli koko maan tärkein tukinuittojoki. Puuta, '
      + 'vesivoimaa ja hyvä satama suistossa — se yhdistelmä nosti Fredrikstadin ympärille '
      + 'Norjan suurimpia teollisuuslaitoksia. Joki on 621 kilometriä pitkä, maan pisin ja '
      + 'vesirikkain, ja sen valuma-alueeseen kuuluu kolmetoista prosenttia Norjan '
      + 'pinta-alasta. Øyeren-järveen laskiessaan se on kasannut Euroopan suurimman '
      + 'sisämaasuiston, joka ulottuu järven poikki toiselle rannalle. Muinaisskandinaaviksi '
      + 'joen nimi oli Raumelfr, jyrisevä virta.',
    lahde: 'en-Wikipedia "Glomma", johdanto-osa sekä osiot "Geography" ja "Name" (tarkistettu '
      + '1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'urnes',
    nimi: 'Urnesin sauvakirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä sauvakirkko on?',
      'Mikä Urnes-tyyli on?',
    ],
    korostukset: ['sauvakirkko|sauvakirkko'],
    nappi: 'Vanhin sauvakirkko ja viikinkikuvien viimeinen luku',
    // 7.3226 E / 61.2981 N — en-Wikipedia "Urnes Stave Church"
    laudat: {
      maailmankartta: { x: 6077.4, y: 860.4 },
    },
    teksti: 'Urnesin sauvakirkko on 1100-luvun sauvakirkko Ornesissa Lustrafjordin varrella '
      + 'Vestlandissa. Se on Norjan vanhimpia sauvakirkkoja: osa hirsirakenteesta on '
      + '1000-luvun jälkipuoliskolta, ja nykyinen kirkko rakennettiin noin vuonna 1130 tai '
      + 'vähän sen jälkeen. Nimi tulee sanasta stav, joka tarkoittaa niitä tukevia '
      + 'puupylväitä ja nurkkatolppia, jotka kannattavat koko rakennusta; seinät ovat '
      + 'pystysuoria seinälankkuja rungon urissa. Kirkon pohjoisportaali on antanut nimen '
      + 'Urnes-tyylille, jonka koristeaiheet ovat norjalaisesta muinaisuskosta — juuri se '
      + 'koristelu on näkyvä todiste siitä, miten viikinkikulttuuri muuttui ja sulautui '
      + 'kristinuskoon. Kirkko on ollut muinaismuistoyhdistyksen omistuksessa vuodesta 1881 '
      + 'ja maailmanperintökohde vuodesta 1979.',
    lahde: 'en-Wikipedia "Urnes Stave Church", johdanto-osa ja osio "Context" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'roros',
    nimi: 'Røros',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Røros on nimeltään Bergstaden?',
      'Mikä on Norjan toinen kaivoskaupunki?',
    ],
    korostukset: ['Bergstaden|Bergstaden'],
    nappi: 'Vuorikaupunki tervattujen hirsien varassa',
    // 11.3831 E / 62.5742 N — en-Wikipedia "Røros Municipality"
    laudat: {
      maailmankartta: { x: 6212.8, y: 794.8 },
    },
    teksti: 'Røros on kaupunki Trøndelagin maakunnassa Norjassa, ja sitä kutsutaan usein '
      + 'nimellä Bergstaden eli vuorikaupunki sen kuparikaivosten takia. Se on toinen Norjan '
      + 'kahdesta kaupungista, joilla on ollut virallinen kaivoskaupungin asema; toinen on '
      + 'hopeakaupunki Kongsberg. Monet nykyisistä asukkaista työskentelevät ja asuvat yhä '
      + '1600- ja 1700-luvun rakennuksissa, ja juuri siksi kaupunki merkittiin '
      + 'maailmanperintöluetteloon vuonna 1980. Kaupungissa on noin kahdeksankymmentä vanhaa '
      + 'puutaloa, useimmat ryhmiteltyinä pihapiireiksi. Monissa on yhä tumma tervattu '
      + 'hirsijulkisivu, joka antaa kaupungille keskiaikaisen näön.',
    lahde: 'en-Wikipedia "Røros Municipality", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'altankalliopiirrokset',
    nimi: 'Altan kalliopiirrokset',
    tyyppi: 'historia',
    kysymykset: [
      'Miten piirrosten ikä on määritetty?',
      'Mitä piirroksissa esitetään?',
    ],
    korostukset: ['rannansiirtymä|rannansiirtymän'],
    nappi: 'Kuusituhatta kuvaa kalliossa',
    // 23.1878 E / 69.9469 N — en-Wikipedia "Rock carvings at Alta"
    laudat: {
      maailmankartta: { x: 6606.3, y: 385.6 },
    },
    teksti: 'Altan kalliopiirrokset ovat Altan kunnassa Finnmarkissa Pohjois-Norjassa. '
      + 'Ensimmäiset piirrokset löytyivät vuonna 1973, ja sen jälkeen niitä on löytynyt yli '
      + '6 000 useasta paikasta; suurin niistä, Jiepmaluokta noin viiden kilometrin päässä '
      + 'Altasta, on tuhansine kuvineen muutettu ulkoilmamuseoksi. Kohde merkittiin '
      + 'maailmanperintöluetteloon 3. joulukuuta 1985, ja se on Norjan ainoa esihistoriallinen '
      + 'maailmanperintökohde. Professori Knut Helskog jakoi kuvat viiteen ryhmään ja ajoitti '
      + 'ne rannansiirtymän avulla: vanhimmat noin 4200 eaa. ja nuorimmat noin 500 eaa.; '
      + 'vuonna 2010 tutkija Jan Magne Gjerde siirsi vanhimpia vaiheita tuhat vuotta '
      + 'taaksepäin. Kuvasto kertoo metsästäjä-keräilijöistä, jotka osasivat hallita '
      + 'porolaumoja, rakentaa veneitä ja kalastaa ja jotka harjoittivat šamanistisia menoja, '
      + 'joihin kuului karhun ja muiden eläinten palvonta.',
    lahde: 'en-Wikipedia "Rock carvings at Alta", johdanto-osa ja osio "Cultural and '
      + 'historical background" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nordkapp',
    nimi: 'Nordkapp',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Onko Nordkapp todella Euroopan pohjoisin kohta?',
      'Mitkä kaksi merta kohtaavat niemellä?',
    ],
    korostukset: ['keskiyön aurinko|keskiyön aurinkoa'],
    nappi: 'Pohjoisin kohta, johon pääsee autolla',
    // 25.7844 E / 71.1725 N — en-Wikipedia "North Cape (Norway)"
    laudat: {
      maailmankartta: { x: 6692.8, y: 311.6 },
    },
    teksti: 'Nordkapp on niemi Magerøyan saaren pohjoisrannalla Finnmarkissa. Sen 307 metriä '
      + 'korkean jyrkänteen päällä on laaja tasanko, jolta katsotaan keskiyön aurinkoa ja '
      + 'näkymää pohjoiseen; Euroopan tie E69 päättyy tänne, joten se on Euroopan pohjoisin '
      + 'autolla saavutettava kohta. Pohjoisimmaksi kohdaksi sitä sanotaan silti '
      + 'virheellisesti: naapuriniemi Knivskjellodden työntyy 1 450 metriä kauemmas '
      + 'pohjoiseen, ja Manner-Euroopan pohjoisin kohta on Kinnarodden Nordkinnin '
      + 'niemimaalla. Nordkapp on kuitenkin paikka, jossa Atlanttiin kuuluva Norjanmeri '
      + 'kohtaa Jäämereen kuuluvan Barentsinmeren. Keskiyön aurinko näkyy 14. toukokuuta ja '
      + '31. heinäkuuta välisenä aikana, ja tasangolle rakennettiin vuonna 1988 '
      + 'vierailukeskus Nordkapphallen.',
    lahde: 'en-Wikipedia "North Cape (Norway)", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'nidaros',
    nimi: 'Nidarosin tuomiokirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenen haudan päälle kirkko rakennettiin?',
      'Missä Norjan hallitsijat vihitään?',
    ],
    korostukset: ['pyhiinvaeltaja|pyhiinvaeltajia'],
    nappi: 'Maailman pohjoisin keskiaikainen katedraali',
    // 10.3962 E / 63.4267 N — en-Wikipedia "Nidaros Cathedral"
    laudat: {
      maailmankartta: { x: 6179.9, y: 750.2 },
    },
    teksti: 'Nidarosin tuomiokirkko on Norjan kirkon katedraali Trondheimissa. Se on rakennettu '
      + 'kuningas Olavi II:n haudan päälle: Olavi toi kristinuskon Norjaan, hänestä tuli maan '
      + 'suojeluspyhimys, ja hänen kirkossaan vihitään yhä Norjan uudet hallitsijat. Kirkkoa '
      + 'rakennettiin 230 vuotta, vuodesta 1070 vuoteen 1300, jolloin se oli olennaisilta '
      + 'osin valmis; lisäyksiä ja korjauksia on tehty siitä lähtien, ja viimeisin suuri '
      + 'jälleenrakennus alkoi 1869 ja päättyi 2001. Vuonna 1152 kirkosta tuli Nidarosin '
      + 'arkkihiippakunnan katedraali, ja vuonna 1537 se siirtyi uskonpuhdistuksessa '
      + 'vastaperustettuun Norjan kirkkoon. Se on maailman pohjoisin keskiaikainen katedraali, '
      + 'siihen mahtuu noin 1 850 ihmistä, ja sinne saapuu yhä vuosittain tuhansia '
      + 'pyhiinvaeltajia.',
    lahde: 'en-Wikipedia "Nidaros Cathedral", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vemork',
    nimi: 'Vemork',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä raskas vesi on?',
      'Mikä oli operaatio Gunnerside?',
    ],
    korostukset: ['raskas vesi|raskasta vettä'],
    nappi: 'Voimalaitos, jota vastaan hyökättiin viidesti',
    // 8.4914 E / 59.8711 N — en-Wikipedia "Vemork"
    laudat: {
      maailmankartta: { x: 6116.4, y: 932.1 },
    },
    teksti: 'Vemork on vesivoimalaitos ja museo Rjukanin kaupungin ulkopuolella Telemarkissa '
      + 'Norjassa. Norsk Hydro rakensi sen ja avasi vuonna 1911 typen sitomista ja '
      + 'lannoitteiden valmistusta varten, ja 108 megawatin teholla se oli avautuessaan '
      + 'maailman suurin voimalaitos. Myöhemmin Vemorkiin tuli maailman ensimmäinen laitos, '
      + 'joka valmisti raskasta vettä suurina erinä; tuotanto alkoi joulukuussa 1934. '
      + 'Toisessa maailmansodassa laitosta pidettiin niin vakavana uhkana — pelkona oli '
      + 'saksalaisten atomipommi — että sitä vastaan tehtiin ainakin viisi erillistä '
      + 'hyökkäystä: helmikuussa 1943 laskuvarjoilla pudotetut norjalaisagentit tuhosivat '
      + 'operaatiossa Gunnerside laitoksen raskaan veden osaston ja 500 kiloa tuotetta, ja '
      + 'helmikuussa 1944 vastarintaliike upotti lautan, joka vei lastia Saksaan. Myöhemmin '
      + 'selvisi, etteivät saksalaiset olleet lähelläkään pommia; raskaan veden laitos '
      + 'suljettiin 1971, ja voimalasta tuli vuonna 1988 Norjan teollisuustyöväen museo.',
    lahde: 'en-Wikipedia "Vemork", johdanto-osa sekä osiot "History" ja "Heavy water '
      + 'sabotage" (tarkistettu 6.9.2026).',
  },
  {
    id: 'flamsbana',
    nimi: 'Flåmsbana',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka jyrkkä rata on?',
      'Miksi rata melkein lakkautettiin?',
    ],
    korostukset: ['normaaliraide|normaaliraiteisen'],
    nappi: 'Euroopan jyrkin normaaliraiteinen rata',
    // 7.1 E / 60.77 N — en-Wikipedia "Flåm Line"
    laudat: {
      maailmankartta: { x: 6070, y: 887.1 },
    },
    teksti: 'Flåmsbana on 20,2 kilometrin pituinen rautatie Myrdalin ja Flåmin välillä '
      + 'Aurlandissa Vestlandissa. Se on Bergenin radan haara, kulkee Flåmsdalenin laaksoa '
      + 'pitkin ja yhdistää pääradan Sognefjordiin; korkeusero on 866 metriä, ja radalla on '
      + 'kaksikymmentä tunnelia ja yksi silta. Suurin nousu on 5,5 prosenttia eli 1:18, mikä '
      + 'tekee siitä Euroopan jyrkimmän normaaliraiteisen rautatien, ja ylämäkeen saa ajaa '
      + '40 ja alamäkeen 30 kilometriä tunnissa. Rakentaminen alkoi vuonna 1924, rata '
      + 'avattiin 1940 ja sähköveto otettiin käyttöön 1944. Tavaraliikenne loppui 1992, ja '
      + 'halvat liput ja kalliit käyttökustannukset veivät radan lakkautuksen partaalle, '
      + 'kunnes Flåm Utvikling otti vuonna 1998 markkinoinnin ja lipunmyynnin hoitaakseen ja '
      + 'nosti hintoja rajusti — nykyään rata on Norjan kolmanneksi suosituin matkailukohde.',
    lahde: 'en-Wikipedia "Flåm Line", johdanto-osa ja osio "Route" (tarkistettu 6.9.2026).',
  },
  {
    id: 'eidsvoll',
    nimi: 'Eidsvollin rakennus',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Eidsvollissa tapahtui 17. toukokuuta 1814?',
      'Kuka pelasti talon konkurssin jälkeen?',
    ],
    korostukset: ['perustuslaki|perustuslaki'],
    nappi: 'Talo, jossa Norjan perustuslaki allekirjoitettiin',
    // 11.1717 E / 60.3011 N — en-Wikipedia "Eidsvollsbygningen"
    laudat: {
      maailmankartta: { x: 6205.7, y: 910.7 },
    },
    teksti: 'Eidsvollsbygningen on historiallinen kartanorakennus Eidsvollissa Akershusissa '
      + 'Norjassa. Siellä allekirjoitettiin Norjan perustuslaki 17. toukokuuta 1814, ja talo '
      + 'on nykyään valtion omistama kansallismonumentti ja museo. Rakennus valmistui vuonna '
      + '1770, ja sen pinta-ala on yli 2 000 neliömetriä; noin vuonna 1800 sen osti Carsten '
      + 'Anker, joka kunnosti kartanon ja asui siellä perheineen juuri allekirjoituksen '
      + 'aikaan. Anker ajautui konkurssiin 1822 ja omistus siirtyi brittiläisille velkojille, '
      + 'mutta runoilija Henrik Wergelandin johtama yksityisten kansalaisten ryhmä keräsi '
      + 'rahat ja osti talon puutarhoineen; kauppa vahvistui 1851, ja ryhmä lahjoitti '
      + 'kiinteistön Norjan valtiolle. Vuonna 2011 alkanut kunnostus palautti talon '
      + 'mahdollisimman tarkasti vuoden 1814 asuun, ja työ valmistui perustuslain '
      + '200-vuotisjuhlaan 2014.',
    lahde: 'en-Wikipedia "Eidsvollsbygningen", johdanto-osa sekä osiot "History" ja '
      + '"Renovations" (tarkistettu 6.9.2026).',
  },
];

