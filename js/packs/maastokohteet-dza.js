/*
 * MAASTOKOHTEET — DZA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs DZA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/DZA.json. Työkalu laskee laudan
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
 * Algerian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Tahatille ja Chelifille ei ole vakiintuneita suomennoksia (fi-Wikipediassa ei artikkeleita), joten nimet ovat kansainvälisessä asussa.
 */
export const MAASTOKOHTEET_DZA = [
  {
    id: 'tahat',
    nimi: 'Tahat',
    tyyppi: 'vuori',
    kysymykset: [
      'Keitä tuaregit ovat?',
      'Mitä Tassili n\'Ajjerin kalliomaalaukset esittävät?',
    ],
    korostukset: ['Sahara|Saharan'],
    nappi: 'Saharan tuliperäinen huippu',
    // 5.5336 E / 23.2889 N — en-Wikipedia "Mount Tahat"
    laudat: {
      maailmankartta: { x: 6017.8, y: 2421.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tahat on Algerian ja koko Hoggarin vuoriston korkein huippu: 2 908 metriä, joskin osa '
      + 'lähteistä antaa jopa 3 003 metriä. Tuliperäinen vuori nousee karulta ylätasangolta '
      + 'keskeltä Saharaa, tuaregien asuttamalta seudulta, ja lähin kaupunki Tamanrasset on 56 '
      + 'kilometrin päässä. Pohjoisempana Tassili n\'Ajjerin vuorilla on kalliomaalauksia, '
      + 'joissa paimennetaan karjaa ja metsästetään eläimiä, joita nykyään tapaa vasta paljon '
      + 'etelämpää — maalaukset on ajoitettu vuosien 8000 ja 2000 eaa. välille.',
    lahde: 'en-Wikipedia "Mount Tahat", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli Messinan suolakriisi?',
      'Miten kuivunut meri täyttyi uudelleen?',
    ],
    nappi: 'Meri, joka kuivui kerran lähes kokonaan',
    // 3 E / 37.3 N — ulappa Algerin edustalla; en-Wikipedia "Mediterranean Sea" antaa keskipisteeksi 18 / 35
    laudat: {
      maailmankartta: { x: 5933.3, y: 1907.8 },
      europe: { x: 268.8, y: 912.6 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja Algeria on '
      + 'osa sen eteläistä, pohjoisafrikkalaista rantaa. Meri on lähes kokonaan maan ympäröimä: '
      + 'Atlanttiin se yhtyy vain Gibraltarinsalmen kautta. Noin 5,9 miljoonaa vuotta sitten '
      + 'yhteys valtamereen katkesi ja Välimeri kuivui osin tai kokonaan satojentuhansien '
      + 'vuosien ajaksi, kunnes niin sanottu Zanclean tulva täytti altaan uudelleen.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'chelif',
    nimi: 'Chelif',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen vedenpinta vaihtelee rajusti?',
      'Mihin Chelifin vettä käytetään?',
    ],
    nappi: 'Algerian pisin joki',
    // 1.3 E / 36.1 N — keskijuoksu Tell-Atlaksessa; en-Wikipedia "Chelif River" antaa suulle 0,13 / 36,04
    laudat: {
      maailmankartta: { x: 5876.7, y: 1953.7 },
      europe: { x: 236.2, y: 944.2 },
    },
    teksti: 'Chelif on Algerian pisin joki: se virtaa 700 kilometriä Saharan Atlakselta '
      + 'Tell-Atlaksen halki ja laskee Välimereen Mostaganemin kaupungin pohjoispuolella. Joen '
      + 'vedenpinta vaihtelee usein voimakkaasti, ja sen alajuoksun vettä käytetään ennen '
      + 'kaikkea keinokasteluun.',
    lahde: 'en-Wikipedia "Chelif River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

