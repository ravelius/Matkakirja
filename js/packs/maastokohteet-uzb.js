/*
 * MAASTOKOHTEET — UZB. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UZB --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UZB.json. Työkalu laskee laudan
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
 * Uzbekistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Araljärvi on suomeksi järvi mutta otsakkeeksi 'Meri' olisi silti väärin ja 'Vuori' vielä väärempi: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js).
 */
export const MAASTOKOHTEET_UZB = [
  {
    id: 'khazretsultan',
    nimi: 'Khazret Sultan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren nimi vaihdettiin?',
      'Mikä Gissarin vuoristo on?',
    ],
    korostukset: ['Gissarin vuoristo|Gissarin vuoristossa'],
    nappi: 'Uzbekistanin katto',
    // 68.1722 E / 38.9483 N — en-Wikipedia "Khazret Sultan"
    laudat: {
      maailmankartta: { x: 8105.7, y: 1844 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Uzbekistanin korkein vuori on vaihtanut nimeä kerran ja saattaa pian menettää '
      + 'arvonimensäkin. Neuvostoaikana huippu tunnettiin kommunistisen puolueen 22. '
      + 'puoluekokouksen huippuna; nyt se on Khazret Sultan, 4 643 metriä, Gissarin vuoristossa '
      + 'aivan Tadžikistanin rajalla. Korkeus on Neuvostoliiton vuoden 1980 mittauksesta, eikä '
      + 'sitä ole korvattu — mutta vuonna 2025 vuorikiipeilijä Eric Gilbertson julkaisi '
      + 'mittauksen, jonka mukaan toinen huippu, Alpomish, on maan korkein. Uzbekistanin '
      + 'viranomaiset pitävät toistaiseksi kiinni vanhasta lukemasta. Rinteiltä on 1800-luvulla '
      + 'löydetty tieteelle uusia perhoslajeja.',
    lahde: 'en-Wikipedia "Khazret Sultan", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'araljarvi',
    nimi: 'Araljärvi',
    // Järvi ei ole meri-otsakkeen kohde: tyyppi 'muu' + symboli
    // 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js)
    // — kortin ylärivi näyttää silloin luokan Luonto.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Minne kokonainen järvi voi kadota?',
      'Mitä järven paljastuneelta pohjalta löytyy?',
    ],
    korostukset: ['suolajärvi'],
    nappi: 'Järvi joka katosi',
    // 58.5 E / 44.3 N — eteläisen Araljärven läntinen allas Karakalpakstanin puolella; artikkelin oma keskipiste 60 / 45 on suurelta osin kuivunutta pohjaa
    laudat: {
      maailmankartta: { x: 7783.3, y: 1630.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Araljärvi oli vielä 1960-luvulla maailman kolmanneksi suurin järvi, 68 000 '
      + 'neliökilometrin suolajärvi Kazakstanin ja Uzbekistanin välissä. Kun '
      + 'neuvostoliittolaiset kasteluhankkeet käänsivät sitä ruokkivat joet pelloille, järvi '
      + 'alkoi kuivua: vuoteen 2007 mennessä jäljellä oli kymmenesosa, neljäksi erilliseksi '
      + 'altaaksi hajonneena. Nimi tarkoittaa saarten merta — saaria järvessä oli yli tuhat.',
    lahde: 'en-Wikipedia "Aral Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'amudarja',
    nimi: 'Amudarja',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki ei enää pääse perille asti?',
      'Minkä rajan Oxus muinoin merkitsi?',
    ],
    korostukset: ['Oxus|Oxuksena'],
    nappi: 'Antiikin Oxus',
    // 60.63 E / 41.55 N — joen laakso Urgenchin kohdalla Khorezmin keitaalla; artikkelin koordinaatti 59,68 / 44,11 on kuivuneella suulla
    laudat: {
      maailmankartta: { x: 7854.3, y: 1741.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Amudarja syntyy Pamirin vuoristossa Vakhshin ja Panjin yhtyessä ja virtaa luoteeseen '
      + 'kohti Araljärven eteläisiä jäänteitä — mutta perille se ei enää yllä, vaan sen suu on '
      + 'kuivuneella järvenpohjalla. Antiikin maailma tunsi joen Oxuksena, ja sitä pidettiin '
      + 'suur-Iranin ja Turanin rajana. Vettä se kuljettaa keskimäärin noin 70 kuutiokilometriä '
      + 'vuodessa.',
    lahde: 'en-Wikipedia "Amu Darya", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

