/*
 * MAASTOKOHTEET — AUT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AUT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AUT.json. Työkalu laskee laudan
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
 * Itävallan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_AUT = [
  {
    id: 'groglockner',
    nimi: 'Großglockner',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Pasterze on?',
      'Miksi korkeus mitataan Adrianmerestä?',
    ],
    korostukset: ['Hohe Tauern|Hohe Tauernin'],
    nappi: 'Itävallan korkein huippu',
    // 12.6953 E / 47.0749 N — en-Wikipedia "Grossglockner"
    laudat: {
      maailmankartta: { x: 6256.5, y: 1515.4 },
      europe: { x: 454.9, y: 655.5 },
    },
    teksti: 'Großglockner on 3 798 metriä Adrianmeren pinnasta ja siten Itävallan korkein vuori '
      + 'sekä Alppien korkein Brennerin solan itäpuolella. Se kuuluu Hohe Tauernin vuoriston '
      + 'Glockner-ryhmään Keski-Itäalppien pääharjanteella. Sen itärinteellä lepää Pasterze, '
      + 'Itävallan laajin jäätikkö.',
    lahde: 'en-Wikipedia "Grossglockner", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'wildspitze',
    nimi: 'Wildspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä topografinen dominanssi tarkoittaa?',
      'Millainen on Ötztalin Alppien jäätikkö?',
    ],
    nappi: 'Ötztalin Alppien katto',
    // 10.8672 E / 46.8853 N — en-Wikipedia "Wildspitze"
    laudat: {
      maailmankartta: { x: 6195.6, y: 1523.3 },
      europe: { x: 419.9, y: 660.5 },
    },
    teksti: 'Wildspitze on Ötztalin Alppien ja Pohjois-Tirolin korkein vuori sekä Itävallan '
      + 'toiseksi korkein heti Großglocknerin jälkeen. Topografiselta dominanssiltaan — 2 261 '
      + 'metriä — se on Alppien neljäs ja koko Euroopan viidestoista huippu.',
    lahde: 'en-Wikipedia "Wildspitze", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka monen pääkaupungin läpi Tonava virtaa?',
      'Mikä Wachaun laakso on?',
    ],
    korostukset: ['Rooman valtakunta|Rooman valtakunnan'],
    nappi: 'Euroopan toiseksi pisin joki',
    // 15.42 E / 48.37 N — Wachaun laakso Itävallan puolella; artikkelin koordinaatti 29,761 / 45,218 on suistossa Romaniassa
    laudat: {
      maailmankartta: { x: 6347.3, y: 1460.4 },
      europe: { x: 507.3, y: 621.5 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan toiseksi pisin joki: 2 850 kilometriä Saksan '
      + 'Schwarzwaldista Mustallemerelle. Se yhdistää nykyisin kymmenen Euroopan maata ja oli '
      + 'aikoinaan Rooman valtakunnan rajajoki. Sen varrella on neljä pääkaupunkia — Wien, '
      + 'Bratislava, Budapest ja Belgrad — ja valuma-alue on 817 000 neliökilometriä.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'inn',
    nimi: 'Inn',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Engadin on?',
      'Miksi Inn on niin vetinen?',
    ],
    nappi: 'Tonavan kolmanneksi suurin sivujoki',
    // 11.75 E / 47.3 N — Innin laakso Innsbruckin alapuolella; artikkelin koordinaatti 13,477 / 48,574 on yhtymäkohdassa Passaussa
    laudat: {
      maailmankartta: { x: 6225, y: 1505.9 },
      europe: { x: 436.8, y: 649.6 },
    },
    teksti: 'Inn on 518 kilometrin pituinen joki Sveitsissä, Itävallassa ja Saksassa ja '
      + 'virtaamaltaan Tonavan kolmanneksi suurin sivujoki. Sen valuma-alueen korkein kohta on '
      + 'Piz Berninan huippu 4 049 metrissä. Engadin, joen laakso Sveitsin puolella, on maan '
      + 'ainoa laakso, jonka vedet päätyvät Mustallemerelle.',
    lahde: 'en-Wikipedia "Inn (river)", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

