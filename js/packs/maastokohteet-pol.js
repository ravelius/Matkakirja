/*
 * MAASTOKOHTEET — POL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs POL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/POL.json. Työkalu laskee laudan
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
 * Puolan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_POL = [
  {
    id: 'rysy',
    nimi: 'Rysy',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Rysyllä on kolme huippua?',
      'Mikä on Puolan vuorten kruunu?',
    ],
    korostukset: ['Tatrat|Tatroilla'],
    nappi: 'Puolan korkein piste',
    // 20.0881 E / 49.1794 N — en-Wikipedia "Rysy"
    laudat: {
      maailmankartta: { x: 6502.9, y: 1425.7 },
      europe: { x: 596.9, y: 600.2 },
    },
    teksti: 'Rysy on Korkeiden Tatrojen harjanteella Puolan ja Slovakian rajalla. Sillä on kolme '
      + 'huippua: keskimmäinen 2 501 metriä, luoteinen 2 500 ja kaakkoinen 2 473. Luoteinen '
      + 'huippu on Puolan korkein piste ja kuuluu Puolan vuorten kruunuun; kaksi muuta ovat '
      + 'Slovakian puolella.',
    lahde: 'en-Wikipedia "Rysy", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'sniezka',
    nimi: 'Śnieżka',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorella on kaksi nimeä?',
      'Mitkä ovat Jättiläisvuoret?',
    ],
    nappi: 'Ala-Sleesian katto',
    // 15.7403 E / 50.7361 N — en-Wikipedia "Sněžka"
    laudat: {
      maailmankartta: { x: 6358, y: 1358 },
      europe: { x: 513.4, y: 559.2 },
    },
    teksti: 'Śnieżka eli tšekiksi Sněžka on Puolan ja Tšekin rajalla ja Jättiläisvuorten Sleesian '
      + 'harjanteen hallitsevin kohta. Sen 1 603 metrin huippu on Ala-Sleesian voivodikunnan '
      + 'korkein kohta ja koko Sudeettien katto. Rajan toisella puolella sama huippu on Tšekin '
      + 'korkein piste.',
    lahde: 'en-Wikipedia "Sněžka", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Itämerellä ei ole vuorovettä?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 17.5 E / 55.2 N — ulappa Puolan rannikon edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6416.7, y: 1156.5 },
      europe: { x: 547.2, y: 441.8 },
    },
    teksti: 'Itämeri on Atlantin haara, jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, '
      + 'Liettua, Puola, Venäjä ja Ruotsi. Maantieteellisesti se jää Skandinavian niemimaan '
      + 'sekä Pohjois- ja Keski-Euroopan tasangon väliin. Se on maailman suurin murtovesiallas: '
      + 'makea jokivesi ja suolainen merivesi sekoittuvat siinä jatkuvasti.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'veiksel',
    nimi: 'Veiksel',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Krakova ja Varsova ovat molemmat Veikselin varrella?',
      'Mihin kolmeen muuhun maahan valuma-alue ulottuu?',
    ],
    nappi: 'Puolan pisin joki',
    // 18.6 E / 53.01 N — Toruń joen keskijuoksulla; artikkelin koordinaatti 18,952 / 54,362 on suistossa
    laudat: {
      maailmankartta: { x: 6453.3, y: 1256.8 },
      europe: { x: 568.3, y: 499.4 },
    },
    teksti: 'Veiksel eli puolaksi Wisła on Puolan pisin joki ja pisin Itämereen laskeva joki: 1 047 '
      + 'kilometriä. Sen valuma-alue on 193 960 neliökilometriä ja ulottuu Puolan lisäksi '
      + 'kolmeen muuhun maahan, mutta 168 868 neliökilometriä siitä on Puolan puolella.',
    lahde: 'en-Wikipedia "Vistula", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'odra',
    nimi: 'Odra',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Oder–Neisse-linja on?',
      'Mikä on Odran suurin sivujoki?',
    ],
    korostukset: ['Oder–Neisse-linja|Oder–Neisse-linjan'],
    nappi: 'Joki, joka on myös raja',
    // 17.03 E / 51.11 N — Wrocław joen keskijuoksulla; artikkelin koordinaatti 14,524 / 53,672 on suistossa
    laudat: {
      maailmankartta: { x: 6401, y: 1341.6 },
      europe: { x: 538.2, y: 549.4 },
    },
    teksti: 'Odra eli saksaksi Oder on Puolan toiseksi pisin joki ja rajojensa sisällä kolmanneksi '
      + 'pisin Veikselin ja sen suurimman sivujoen Wartan jälkeen. Se nousee Tšekistä ja virtaa '
      + '742 kilometriä Länsi-Puolan halki, ja siitä 187 kilometriä on Puolan ja Saksan rajaa '
      + 'osana Oder–Neisse-linjan rajaa. Lopulta se laskee Szczecinin laguuniin ja kolmena '
      + 'haarana Itämeren Pommerinlahteen.',
    lahde: 'en-Wikipedia "Oder", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

