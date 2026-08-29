/*
 * MAASTOKOHTEET — GBR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GBR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GBR.json. Työkalu laskee laudan
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
 * Britannian maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_GBR = [
  {
    id: 'bennevis',
    nimi: 'Ben Nevis',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on felsenmeer?',
      'Millainen on Ben Neviksen pohjoisseinämä talvella?',
    ],
    korostukset: ['felsenmeer|felsenmeer'],
    nappi: 'Brittein saarten korkein',
    // -5.0035 E / 56.7969 N — en-Wikipedia "Ben Nevis"
    laudat: {
      maailmankartta: { x: 5666.6, y: 1081.5 },
      europe: { x: 115.1, y: 399.8 },
    },
    teksti: 'Ben Nevis on Skotlannin, Yhdistyneen kuningaskunnan ja koko Brittein saarten korkein '
      + 'vuori: huippu on 1 345 metriä merenpinnasta, eikä mihinkään suuntaan ole 739 '
      + 'kilometriin korkeampaa maata. Huippu itsessään on kivinen tasanne, felsenmeer, ja '
      + 'pohjoisseinämän seitsemänsataametriset kalliot ovat Skotlannin tärkein '
      + 'jääkiipeilypaikka. Vuorella on juostu kilpaa vuodesta 1898.',
    lahde: 'en-Wikipedia "Ben Nevis", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'snowdon',
    nimi: 'Snowdon',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Yr Wyddfa tarkoittaa?',
      'Miten jäätiköt muotoilivat Snowdonin?',
    ],
    korostukset: ['arête|arêtet'],
    nappi: 'Walesin korkein, kymriksi Yr Wyddfa',
    // -4.0762 E / 53.0685 N — en-Wikipedia "Snowdon"
    laudat: {
      maailmankartta: { x: 5697.5, y: 1254.2 },
      europe: { x: 132.9, y: 497.9 },
    },
    teksti: 'Snowdon eli kymrinkielisellä nimellään Yr Wyddfa kohoaa 1 085 metriin ja on Walesin '
      + 'korkein vuori sekä Brittein saarten korkein Skotlannin ylämaiden eteläpuolella. '
      + 'Kalliot syntyivät tulivuorenpurkauksissa ordovikikaudella, ja jäätiköt veistivät '
      + 'niistä pyramidihuipun ja terävät harjanteet eli arêtet Crib Gochin ja Y Lliweddin. '
      + 'Vuorta on kutsuttu Yhdistyneen kuningaskunnan vilkkaimmaksi: vuonna 2022 sen nousi 543 '
      + '541 kävelijää.',
    lahde: 'en-Wikipedia "Snowdon", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'pohjanmeri',
    nimi: 'Pohjanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Pohjanmeri on niin matala?',
      'Milloin Pohjanmereltä löydettiin öljy?',
    ],
    nappi: 'Meri seitsemän maan välissä',
    // 1.8 E / 55.6 N — ulappa Britannian itärannikon edustalla; artikkelin oma keskipiste on 3 / 56
    laudat: {
      maailmankartta: { x: 5893.3, y: 1137.9 },
      europe: { x: 245.8, y: 431.3 },
    },
    teksti: 'Pohjanmeri on Ison-Britannian, Tanskan, Norjan, Saksan, Alankomaiden, Belgian ja '
      + 'Ranskan välinen meri Euroopan mannerjalustalla. Etelässä se yhtyy Atlanttiin Englannin '
      + 'kanaalin kautta ja pohjoisessa Norjanmereen. Pituutta sillä on yli 970 kilometriä ja '
      + 'leveyttä 580, ja pinta-alaa 570 000 neliökilometriä.',
    lahde: 'en-Wikipedia "North Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'irlanninmeri',
    nimi: 'Irlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Mansaari on?',
      'Miksi merta kutsutaan joskus Manxinmereksi?',
    ],
    nappi: 'Kahden saaren välinen meri',
    // -4.2 E / 53.7 N — ulappa Walesin ja Irlannin välissä; artikkelin oma keskipiste on -5 / 53,5
    laudat: {
      maailmankartta: { x: 5693.3, y: 1225.5 },
      europe: { x: 130.6, y: 481.3 },
    },
    teksti: 'Irlanninmeri on 46 007 neliökilometrin vesialue, joka erottaa Irlannin saaren '
      + 'Isosta-Britanniasta. Etelässä se yhtyy Kelttienmereen Yrjönkanaalin kautta ja '
      + 'pohjoisessa Skotlannin länsipuolisiin sisämeriin Pohjoiskanaalin kautta. Sen suurin '
      + 'saari on Anglesey Pohjois-Walesissa ja toiseksi suurin Mansaari.',
    lahde: 'en-Wikipedia "Irish Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'thames',
    nimi: 'Thames',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea kutsutaan paikoin Isisiksi?',
      'Mikä joki on Yhdistyneen kuningaskunnan pisin?',
    ],
    nappi: 'Joki, jolla on kaksi nimeä',
    // -0.97 E / 51.46 N — Readingin kohta joen keskijuoksulla; artikkelin koordinaatti 0,61 / 51,5 on suistossa
    laudat: {
      maailmankartta: { x: 5801, y: 1326.1 },
      europe: { x: 192.6, y: 540.2 },
    },
    teksti: 'Thames virtaa Etelä-Englannin halki ja Lontoon läpi, ja sen pituus on 346 kilometriä. '
      + 'Se on Englannin pisin kokonaan maan sisällä virtaava joki ja koko Yhdistyneen '
      + 'kuningaskunnan toiseksi pisin Severnin jälkeen. Osalla matkaa jokea kutsutaan yhä '
      + 'vanhalla nimellä Isis.',
    lahde: 'en-Wikipedia "River Thames", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

