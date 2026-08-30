/*
 * MAASTOKOHTEET — KWT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KWT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KWT.json. Työkalu laskee laudan
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
 * Kuwaitin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kuwait on lähes tasainen aavikkomaa, joten vuorten sijaan listalla on maan tunnetuin kohouma Mutlan harjanne — artikkeli itse kertoo, ettei se silti ole maan korkein piste.
 */
export const MAASTOKOHTEET_KWT = [
  {
    id: 'mutla',
    nimi: 'Mutlan harjanne',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko maan korkein kohta olla nimetön?',
      'Miksi tasaisessa maassa pienikin harjanne on tärkeä?',
    ],
    nappi: 'Aavikkomaan ainoa mäki',
    // 47.6333 E / 29.3833 N — en-Wikipedia "Mutla Ridge"
    laudat: {
      maailmankartta: { x: 7421.1, y: 2203.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mutlan harjanne on Kuwaitin näkyvin kohouma: 142 metriä merenpinnasta Jahran alueella, '
      + 'muuten lähes tasaisen aavikkomaan luoteiskulmassa. Maan korkein piste se ei silti ole '
      + '— se on nimetön kohta kaukana lännessä, joka ei erotu ympäristöstään lainkaan. '
      + 'Kuwaitissa korkein paikka ja korkein maisema ovat siis eri asioita.',
    lahde: 'en-Wikipedia "Mutla Ridge", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten helmiä kalastettiin ennen öljyä?',
      'Missä Hormuzinsalmi on?',
    ],
    korostukset: ['helmisimpukoita|helmisimpukoistaan'],
    nappi: 'Helmien ja öljyn lahti',
    // 48.8 E / 29.2 N — ulappa Kuwaitin kaakkoisrannikon edustalla; artikkelin oma keskipiste on 52 / 26
    laudat: {
      maailmankartta: { x: 7460, y: 2210 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Länsi-Aasian sisämeri Arabian niemimaan ja Iranin välissä, Intian '
      + 'valtameren ja Arabianmeren jatke. Itäpäässä se yhtyy Omaninlahteen Hormuzinsalmen '
      + 'kautta. Lahti on tunnettu kalavesistään, riutoistaan ja runsaista helmisimpukoistaan, '
      + 'joskin teollistuminen ja öljyvuodot ovat vahingoittaneet sen luontoa.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kuwaitinlahti',
    nimi: 'Kuwaitinlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi satamakaupunki syntyy juuri lahden suulle?',
      'Mistä Kuwait sai nimensä?',
    ],
    nappi: 'Lahti pääkaupungin sylissä',
    // 47.9333 E / 29.4333 N — en-Wikipedia "Kuwait Bay"
    laudat: {
      maailmankartta: { x: 7431.1, y: 2201.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kuwaitinlahti eli Jōn al Kuwayt on Persianlahden perukka — koko meren sisin sopukka. '
      + 'Kuwaitin pääkaupunki on kasvanut juuri sen kärkeen, joten suojaisa lahti on '
      + 'käytännössä maan koko historian näyttämö: sen rannalta kaupunki katsoo merelle.',
    lahde: 'en-Wikipedia "Kuwait Bay", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

