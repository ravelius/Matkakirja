/*
 * MAASTOKOHTEET — NGA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NGA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NGA.json. Työkalu laskee laudan
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
 * Nigerian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nigerjoen merkki on Lokojassa, jossa Benue yhtyy siihen — suisto olisi lehden eteläreunassa ja kahden joen tarina kerrotaan juuri yhtymäkohdassa.
 */
export const MAASTOKOHTEET_NGA = [
  {
    id: 'chappalwaddi',
    nimi: 'Chappal Waddi',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä mambilla-tarut kertovat Gang-vuoresta?',
      'Mikä on Gashaka-Gumtin kansallispuisto?',
    ],
    korostukset: ['Mambilla|Mambillan'],
    nappi: 'Länsi-Afrikan korkein huippu',
    // 11.715 E / 7.0361 N — en-Wikipedia "Chappal Waddi"
    laudat: {
      maailmankartta: { x: 6223.8, y: 2976.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Vuoren toinen nimi on Kuoleman vuori, mutta sen oma, alkuperäinen nimi on Gang. '
      + 'Mambillan ylängön kansan taruissa juuri Gang-vuorella ratkaistiin, tulisiko '
      + 'seuraavasta viljelykaudesta hyvä vai huono — vuori oli useiden vanhojen myyttisten '
      + 'yhteisöjen päämaja. Nigerian ja koko Länsi-Afrikan korkein kohta, 2 419 metriä, on '
      + 'Taraba Statessa lähellä Kamerunin rajaa, Gashaka Gumtin metsänsuojelualueen ja '
      + 'kansallispuiston laidalla. Se kuuluu Bamendan, Alantikan ja Mandaran vuoriketjuun, '
      + 'joka jatkuu Nigeriasta Kameruniin.',
    lahde: 'en-Wikipedia "Chappal Waddi" (tarkistettu 1.9.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä nollameridiaani ja päiväntasaaja leikkaavat?',
      'Mitkä suuret joet laskevat Guineanlahteen?',
    ],
    nappi: 'Trooppisen Atlantin kulmaus',
    // 5 E / 3.3 N — ulappa Nigerin suiston edustalla; artikkelin oma keskipiste on nollasaarella (0 / 0)
    laudat: {
      maailmankartta: { x: 6000, y: 3101.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa, joka ulottuu Liberian Cape '
      + 'Palmasista Gabonin Cape Lopeziin. Juuri tässä lahdessa maapallon koordinaatiston '
      + 'nollapiste — päiväntasaajan ja nollameridiaanin leikkauskohta — osuu avomerelle. '
      + 'Lahteen laskevat monet suuret joet, muiden muassa Niger ja Volta.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'nigerjoki',
    nimi: 'Nigerjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Niger virtaa puolikuun muotoisen kaaren?',
      'Mikä on Nigerin suisto?',
    ],
    korostukset: ['Benue|Benuen'],
    nappi: 'Länsi-Afrikan pääjoki',
    // 6.74 E / 7.8 N — Lokoja, jossa Benue yhtyy Nigeriin; artikkelin koordinaatti 6,469 / 5,322 on suistossa
    laudat: {
      maailmankartta: { x: 6058, y: 2951 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niger on Länsi-Afrikan pääjoki ja Afrikan kolmanneksi pisin, noin 4 180 kilometriä — '
      + 'edellä ovat vain Niili ja Kongo. Se saa alkunsa Guinean ylängöltä läheltä Sierra '
      + 'Leonen rajaa ja kiertää suuren puolikuun muotoisen kaaren Malin ja Nigerin kautta, '
      + 'kunnes laskee Guineanlahteen valtavan suistonsa läpi. Merkki on Lokojassa, jossa '
      + 'jokeen yhtyy sen suurin sivujoki Benue.',
    lahde: 'en-Wikipedia "Niger River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'benue',
    nimi: 'Benue',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi sivujoki on päähaaraa suurempi?',
      'Mitä nimi Benue tarkoittaa?',
    ],
    korostukset: ['Niger|Nigerin'],
    nappi: 'Virtahepojen joki',
    // 8.53 E / 7.73 N — Makurdi joen keskijuoksulla; artikkelin koordinaatti 6,757 / 7,753 on yhtymäkohdassa Lokojassa
    laudat: {
      maailmankartta: { x: 6117.7, y: 2953.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Lokojassa kaksi jokea kohtaa, ja sivujoki tuo enemmän vettä kuin pääjoki. Benue on '
      + 'kartalla Nigerin sivuhaara, mutta yhtymäkohdassa sen virtaama on suurempi: ennen '
      + '1960-lukua mitattu keskivirtaama oli 3 400 kuutiometriä sekunnissa Benuella ja 3 000 '
      + 'Nigerillä. Nimi tulee tiv-kielen sanasta bernor, virtahepojen joki. Aiemmin se '
      + 'tunnettiin nimellä Chadda. Joki alkaa Pohjois-Kamerunin Adamawan ylängöltä ja kulkee '
      + 'noin 1 400 kilometriä länteen; kesäkuukausina lähes koko matka on veneellä '
      + 'kuljettavissa, mikä tekee siitä tärkeän kulkureitin. Tulvien aikaan sivujoki Mayo '
      + 'Kébbi yhdistää sen jopa Tšad-järven vesistöön.',
    lahde: 'en-Wikipedia "Benue River", johdanto-osa ja osio "Geography" (tarkistettu 1.9.2026).',
  },
];

