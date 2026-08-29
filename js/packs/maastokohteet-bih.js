/*
 * MAASTOKOHTEET — BIH. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs BIH --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/BIH.json. Työkalu laskee laudan
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
 * Bosnia ja Hertsegovinan maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-bih.js (Una, Neretva, Sutjeskan kansallispuisto); tässä ovat puuttuvat korkein huippu ja rantameri. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_BIH = [
  {
    id: 'maglic',
    nimi: 'Maglić',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Dinaridit?',
      'Miksi kaksoishuipuista käytetympi on matalampi?',
    ],
    korostukset: ['Dinaridit|Dinaridien'],
    nappi: 'Maan korkein huippu',
    // 18.7369 E / 43.2811 N — en-Wikipedia "Maglić (mountain)"
    laudat: {
      maailmankartta: { x: 6457.9, y: 1672 },
      europe: { x: 570.9, y: 755.3 },
    },
    teksti: 'Maglić on rajan ylittävä vuori Dinaridien alueella Bosnia ja Hertsegovinan sekä '
      + 'Montenegron rajalla. Sen korkein huippu on 2 388 metriä ja Montenegron puolella; '
      + 'kaksoishuippu 2 386 metrissä on Bosnia ja Hertsegovinan puolella ja siten maan korkein '
      + 'kohta — ja samalla se kahdesta huipusta, jolla käydään useammin. Vuori kulkee '
      + 'luoteesta kaakkoon.',
    lahde: 'en-Wikipedia "Maglić (mountain)", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'adrianmeri',
    nimi: 'Adrianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi maan rannikko on niin lyhyt?',
      'Mikä Otranton salmi on?',
    ],
    korostukset: ['Otranton salmi|Otranton salmesta'],
    nappi: 'Kahdenkymmenen kilometrin rantakaistale',
    // 17.3 E / 42.85 N — ulappa Neumin edustalla, maan ainoan rannikkokaistaleen kohdalla; artikkelin oma keskipiste on 15 / 43
    laudat: {
      maailmankartta: { x: 6410, y: 1689.4 },
      europe: { x: 543.4, y: 766.6 },
    },
    teksti: 'Adrianmeri erottaa Apenniinien niemimaan Balkanin niemimaasta. Se on Välimeren '
      + 'pohjoisin haara ja ulottuu Otranton salmesta luoteeseen Pon laaksoon asti. Rantaa '
      + 'sillä on kuudella maalla, ja Bosnia ja Hertsegovina on niistä se, jolla rantaa on '
      + 'kaikkein vähiten — kapea kaistale Neumin kohdalla.',
    lahde: 'en-Wikipedia "Adriatic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

