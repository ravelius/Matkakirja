/*
 * MAASTOKOHTEET — CHN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHN.json. Työkalu laskee laudan
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
 * Kiinan maastokohteet. Faktat en-Wikipediasta 30.8.2026. HUOM EVEREST: maan korkein kohta on Everestin pohjoisrinne, mutta Nepal on pelin oma maa (asia-countries.js NPL, fokuslehti FOKUS_POHJAT.NPL), joten Everest jätetään Nepalin listalle eikä sitä duplikoida tänne. Vuoreksi valittiin Taishan, pyhistä vuorista tärkein.
 */
export const MAASTOKOHTEET_CHN = [
  {
    id: 'taishan',
    nimi: 'Taishan',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Kiinan viisi pyhää vuorta?',
      'Miksi keisarit nousivat juuri tälle vuorelle?',
    ],
    korostukset: ['Shandong|Shandongin'],
    nappi: 'Vuori, jota on palvottu 3 000 vuotta',
    // 117.1075 E / 36.2558 N — en-Wikipedia "Mount Tai"
    laudat: {
      maailmankartta: { x: 9736.9, y: 1947.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Taishan ei ole Kiinan korkein vuori — sen ylin huippu, Jadekeisarin huippu, jää 1 545 '
      + 'metriin — mutta se voi olla maan tärkein. Se on Kiinan viidestä pyhästä vuoresta '
      + 'itäisin, auringonnousun ja uuden alun vuori, jota on pidetty viidestä ensimmäisenä. '
      + 'Palvontapaikkana se on ollut ainakin kolmetuhatta vuotta, ja pitkiä aikoja se oli koko '
      + 'valtakunnan tärkeimpiä seremoniakeskuksia.',
    lahde: 'en-Wikipedia "Mount Tai", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'etelakiinanmeri',
    nimi: 'Etelä-Kiinan meri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä maat tätä merta reunustavat?',
      'Miksi meri on niin kiistelty?',
    ],
    korostukset: ['Tyynimeri|Tyynenmeren'],
    nappi: 'Meri, jonka kautta maailma käy kauppaa',
    // 112 E / 16 N — ulappa Hainanin kaakkoispuolella; artikkelin oma keskipiste 113 / 12 on kauempana etelässä
    laudat: {
      maailmankartta: { x: 9566.7, y: 2673.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etelä-Kiinan meri on läntisen Tyynenmeren reunameri Kiinan etelärannikon, Indokiinan '
      + 'niemimaan, Taiwanin, Filippiinien ja Borneon välissä — pinta-alaltaan noin 3,5 '
      + 'miljoonaa neliökilometriä. Se on maailman meriliikenteen valtaväyliä: sen kautta '
      + 'kulkee huomattava osa kaikesta maapallon merirahdista, ja pohjasta on löydetty öljyä '
      + 'ja maakaasua.',
    lahde: 'en-Wikipedia "South China Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jangtse',
    nimi: 'Jangtse',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joki saa alkunsa?',
      'Kuinka suuri osa kiinalaisista asuu sen varrella?',
    ],
    korostukset: ['Tiibet|Tiibetin'],
    nappi: 'Kiinan pisin, maailman kolmanneksi',
    // 111.28 E / 30.7 N — keskijuoksu Yichangin ja Kolmen rotkon kohdalla; artikkelin koordinaatti 121,98 / 31,39 on suistossa Shanghain luona
    laudat: {
      maailmankartta: { x: 9542.7, y: 2155.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jangtse eli Chang Jiang, "pitkä joki", on Kiinan pisin ja koko maailman kolmanneksi '
      + 'pisin joki: 6 236 kilometriä Tiibetin ylängön Tanggula-vuorilta itään Itä-Kiinan '
      + 'mereen. Sen valuma-alue kattaa viidenneksen Kiinan pinta-alasta, ja alueella asuu '
      + 'lähes kolmannes maan väestöstä.',
    lahde: 'en-Wikipedia "Yangtze", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'keltainenjoki',
    nimi: 'Keltainenjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä joen keltainen väri tulee?',
      'Mikä Ordosin mutka on?',
    ],
    korostukset: ['lössi|lössiylängön'],
    nappi: 'Kiinalaisen sivilisaation kehto',
    // 110 E / 40.5 N — Ordosin mutkan pohjoisreuna Baotoun luona; artikkelin koordinaatti 119,16 / 37,76 on suistossa Bohainmerellä
    laudat: {
      maailmankartta: { x: 9500, y: 1783.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keltainenjoki eli Huanghe on Kiinan toiseksi pisin joki, noin 5 464 kilometriä, ja sen '
      + 'laaksosta muinainen kiinalainen sivilisaatio sai alkunsa. Nimen selittää väri: '
      + 'virratessaan lössiylängön halki joki huuhtoo mukaansa valtavat määrät hienoa keltaista '
      + 'maa-ainesta. Matkallaan Bohainmereen se piirtää pohjoiseen puolentoistatuhannen '
      + 'kilometrin mittaisen Ordosin mutkan.',
    lahde: 'en-Wikipedia "Yellow River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

