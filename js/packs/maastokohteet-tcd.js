/*
 * MAASTOKOHTEET — TCD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TCD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TCD.json. Työkalu laskee laudan
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
 * Tšadin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Sisämaavaltion 'meri' on Tšadjärvi, joka on antanut koko maalle nimensä ja jonka tyyppi on pelin symbolitaksonomiassa meri (luonto-symboli; erillistä järvityyppiä ei ole).
 */
export const MAASTOKOHTEET_TCD = [
  {
    id: 'emikoussi',
    nimi: 'Emi Koussi',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka suuri Emi Koussin kaldera on?',
      'Mikä on Era Kohor?',
    ],
    korostukset: ['Tibesti|Tibestin'],
    nappi: 'Saharan korkein huippu',
    // 18.5464 E / 19.7925 N — en-Wikipedia "Emi Koussi"
    laudat: {
      maailmankartta: { x: 6451.5, y: 2543.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Emi Koussi on Tibestin vuoriston kaakkoispäässä kohoava kilpitulivuori ja koko Saharan '
      + 'korkein huippu: 3 447 metriä, kolme kilometriä ympäröiviä hiekkakivitasankoja '
      + 'ylempänä. Sen lakea reunustaa kaksi sisäkkäistä kalderaa, joista ulompi on noin '
      + 'viidentoista kilometrin levyinen; kaakkoisosassa on lisäksi 350 metriä syvä Era '
      + 'Kohorin kaldera.',
    lahde: 'en-Wikipedia "Emi Koussi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tsadjarvi',
    nimi: 'Tšadjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi järven koko vaihtelee niin rajusti?',
      'Mistä järvi saa vetensä?',
    ],
    korostukset: ['Chari|Charista'],
    nappi: 'Järvi neljän maan rajalla',
    // 14.533 E / 13.099 N — en-Wikipedia "Lake Chad"
    laudat: {
      maailmankartta: { x: 6317.8, y: 2772.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tšadjärvi on laskujoeton makeavesijärvi neljän maan — Tšadin, Nigerian, Nigerin ja '
      + 'Kamerunin — rajojen solmukohdassa, ja sen valuma-alue on yli miljoona neliökilometriä. '
      + 'Vetensä järvi saa pääosin Charista, ja sen pinta ja pinta-ala vaihtelevat rajusti '
      + 'vuodenaikojen mukaan. Järvi on yksi Afrikan tärkeimmistä makean veden kala-alueista.',
    lahde: 'en-Wikipedia "Lake Chad", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'chari',
    nimi: 'Chari',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka pitkä Chari on?',
      'Miksi järvi kuihtuisi ilman tätä jokea?',
    ],
    nappi: 'Tšadjärven elinehto',
    // 15.05 E / 12.11 N — N'Djamena joen alajuoksulla; artikkelin koordinaatti 14,565 / 12,909 on suulla Tšadjärvellä
    laudat: {
      maailmankartta: { x: 6335, y: 2805.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Chari on noin 1 400 kilometriä pitkä Keski-Afrikan joki ja Tšadjärven tärkein '
      + 'vedentuoja: järven vesi tulee pääosin siitä ja sen monista sivujoista. Merkki on '
      + 'pääkaupungin N\'Djamenan kohdalla, jonka ohi joki virtaa viimeisellä taipaleellaan '
      + 'kohti järveä.',
    lahde: 'en-Wikipedia "Chari River" ja "Lake Chad", johdanto-osat (tarkistettu 30.8.2026).',
  },
];

