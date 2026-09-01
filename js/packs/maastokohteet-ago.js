/*
 * MAASTOKOHTEET — AGO. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AGO --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AGO.json. Työkalu laskee laudan
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
 * Angolan maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_AGO = [
  {
    id: 'morrodemoco',
    nimi: 'Morro de Moco',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on kansainvälisesti tärkeä lintualue?',
      'Miksi Morro de Mocon metsä on uhattuna?',
    ],
    korostukset: ['Huambo|Huambon'],
    nappi: 'Angolan korkein vuori',
    // 15.1667 E / -12.4667 N — en-Wikipedia "Mount Moco"
    laudat: {
      maailmankartta: { x: 6338.9, y: 3629.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Angolan korkeimmalla vuorella on laskettu 233 lintulajia, ja osaa niistä ei tapaa '
      + 'mistään muualta maailmasta. Morro de Moco kohoaa 2 620 metriin Huambon maakunnassa '
      + 'seitsemänkymmentä kilometriä kaupungista länteen, ja BirdLife International on '
      + 'nimennyt sen kansainvälisesti tärkeäksi lintualueeksi osana Länsi-Angolan '
      + 'kotoperäisten lintujen aluetta; siellä elävät muun muassa uhanalainen Swierstran pyy '
      + 'ja angolanluolarastas. Vuoren afrovuoristometsä on silti kutistumassa, kun puuta '
      + 'kaadetaan rakentamiseen ja polttopuuksi. Kasvitieteilijöitä paikalla on käynyt hyvin '
      + 'vähän — proteakukat aukeavat vasta heinä—syyskuussa, kun ruohomaan kulot ovat '
      + 'sammuneet. Vuonna 2014 Moco nimettiin yhdeksi Angolan seitsemästä ihmeestä.',
    lahde: 'en-Wikipedia "Mount Moco", johdanto-osa sekä osiot "Flora", "Birdlife" ja '
      + '"Conservation" (tarkistettu 1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Etelä-Atlantti on lämmin ympäri vuoden?',
      'Mitä \'vanha\' ja \'uusi maailma\' tarkoittavat?',
    ],
    nappi: 'Maailman toiseksi suurin valtameri',
    // 12 E / -10.5 N — ulappa Angolan rannikon edustalla Luandan eteläpuolella; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 6233.3, y: 3562.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri: se peittää noin 17 prosenttia '
      + 'maapallon pinnasta. Löytöretkien aikana sen ajateltiin erottavan Amerikan \'uuden '
      + 'maailman\' Afrikan, Aasian ja Euroopan \'vanhasta maailmasta\'. Angolan kohdalla '
      + 'levittäytyvä Etelä-Atlantti pysyy lämpimänä ympäri vuoden, sillä sitä reunustavat maat '
      + 'ovat tropiikissa.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cuanza',
    nimi: 'Cuanza',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Angolan valuutta on nimeltään kwanza?',
      'Kuinka pitkälle jokea pääsee veneellä?',
    ],
    korostukset: ['Luanda|Luandan'],
    nappi: 'Angolan pisin joki',
    // 14.4 E / -9.7 N — keskijuoksu Dondon seudulla; en-Wikipedia "Cuanza River" antaa suistolle 13,15 / -9,35
    laudat: {
      maailmankartta: { x: 6313.3, y: 3535.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Angolan raha on nimetty tämän joen mukaan, ja niin oli aikanaan myös valloituksen '
      + 'reitti. Cuanza on maan pisin joki ja laskee Atlanttiin kuusikymmentä kilometriä '
      + 'Luandan eteläpuolella; sen alajuoksu on veneellä kuljettavissa noin 240 kilometrin '
      + 'matkalta, ja juuri sitä pitkin portugalilaiset tunkeutuivat Pohjois-Angolaan. Nykyään '
      + 'joki tekee toista työtä: Capandan pato valmistui 2004, ja sen lisäksi virtaa '
      + 'padottavat Cambambe ja Laúca. Jokea on tutkittu vasta vähän — Angolan ensimmäinen '
      + 'Cuanzan monimuotoisuuslaskenta on löytänyt viisikymmentä kalalajia, ja geenitestit '
      + 'saattavat paljastaa niistä uusia lajeja tieteelle.',
    lahde: 'en-Wikipedia "Cuanza River", johdanto-osa sekä osiot "Geography", "History", '
      + '"Wildlife" ja "Legacy" (tarkistettu 1.9.2026).',
  },
];

