/*
 * MAASTOKOHTEET — SWE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SWE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SWE.json. Työkalu laskee laudan
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
 * Ruotsin maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_SWE = [
  {
    id: 'kebnekaise',
    nimi: 'Kebnekaise',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi eteläinen huippu on kutistunut?',
      'Mitä nimi Giebmegáisi tarkoittaa?',
    ],
    korostukset: ['Kungsleden|Kungsledenin'],
    nappi: 'Vuori, joka on kutistunut',
    // 18.5283 E / 67.9044 N — en-Wikipedia "Kebnekaise"
    laudat: {
      maailmankartta: { x: 6450.9, y: 504.7 },
      europe: { x: 566.9, y: 107.7 },
    },
    teksti: 'Kebnekaise on Ruotsin korkein vuori, ja sen massiivissa on kaksi päähuippua. Jäätikön '
      + 'peittämä eteläinen huippu oli ennen korkein 2 120 metrissä, mutta se on kutistunut '
      + 'viidessäkymmenessä vuodessa 24 metriä, joten korkein on nyt jäätön pohjoinen huippu 2 '
      + '096,8 metrissä. Vuori on Ruotsin Lapissa noin 150 kilometriä napapiiristä pohjoiseen, '
      + 'Kirunasta länteen Kungsledenin vaellusreitin varrella.',
    lahde: 'en-Wikipedia "Kebnekaise", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Gotlanti oli kauppareittien risteys?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 18.6 E / 57.4 N — ulappa Gotlannin eteläpuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6453.3, y: 1052.7 },
      europe: { x: 568.3, y: 384 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Maantieteellisesti se jää Skandinavian niemimaan '
      + 'sekä Pohjois- ja Keski-Euroopan tasangon väliin. Se on maailman suurin murtovesiallas.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanlahti',
    nimi: 'Pohjanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Merenkurkku on?',
      'Miksi Pohjanlahden rannat nousevat?',
    ],
    korostukset: ['Merenkurkku|Merenkurkku'],
    nappi: 'Itämeren pohjoisin haara',
    // 19.6 E / 62.6 N — ulappa Selkämeren pohjoisosassa; artikkelin oma keskipiste on 20 / 63
    laudat: {
      maailmankartta: { x: 6486.7, y: 793.5 },
      europe: { x: 587.5, y: 247.2 },
    },
    teksti: 'Pohjanlahti on Itämeren pohjoisin haara Suomen länsirannikon ja Pohjois-Ruotsin '
      + 'itärannikon välissä. Se jakautuu Perämereen, Merenkurkkuun ja Selkämereen. Lahden '
      + 'eteläosassa on Ahvenanmaa, Ahvenanmeren ja Saaristomeren välissä.',
    lahde: 'en-Wikipedia "Gulf of Bothnia", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'gotaalv',
    nimi: 'Göta älv',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Baltian jääjärvi oli?',
      'Miksi Trollhättanin putoukset ovat tärkeät?',
    ],
    korostukset: ['Vänern|Vänernin'],
    nappi: 'Vänernin lasku mereen',
    // 12.29 E / 58.28 N — Trollhättan joen putousten kohdalla; artikkelin koordinaatti 11,908 / 57,693 on suistossa Göteborgissa
    laudat: {
      maailmankartta: { x: 6243, y: 1010.3 },
      europe: { x: 447.2, y: 360.8 },
    },
    teksti: 'Göta älv laskee Vänernin vedet Kattegatiin Göteborgin kohdalla Ruotsin '
      + 'länsirannikolla. Se syntyi viime jääkauden lopussa, kun Baltian jääjärven vedet '
      + 'purkautuivat sitä myöten Atlanttiin. Sen valuma-alue on Skandinavian suurin.',
    lahde: 'en-Wikipedia "Göta älv", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

