/*
 * MAASTOKOHTEET — MNG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MNG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MNG.json. Työkalu laskee laudan
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
 * Mongolian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Gobi on maan tunnusmaasto, joten se on mukana aavikkona: tyyppi vaihdetaan pakissa käsin arvoon 'muu' + symboli 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — vuori- tai meriotsake olisi väärin.
 */
export const MAASTOKOHTEET_MNG = [
  {
    id: 'huitenorgil',
    nimi: 'Hüiten orgil',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko valtioiden raja kulkea vuoren huipun yli?',
      'Missä kolmen valtakunnan kolmiopiste on?',
    ],
    korostukset: ['Altai|Altain', 'Tavan Bogd|Tavan Bogdin'],
    nappi: 'Mongolian kylmä katto',
    // 87.8189 E / 49.1458 N — en-Wikipedia "Khüiten Peak"
    laudat: {
      maailmankartta: { x: 8760.6, y: 1427.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hüiten orgil, "Kylmä huippu", kohoaa 4 356 metriin ja on sekä Mongolian että koko '
      + 'Altain vuoriston korkein kohta. Mongolian ja Kiinan raja kulkee suoraan sen huipun '
      + 'yli, ja lumi ei sula siltä koskaan. Huippu on yksi Tavan Bogdin viidestä huipusta; '
      + 'parin kilometrin päässä toinen niistä merkitsee Venäjän, Mongolian ja Kiinan '
      + 'kolmiopistettä.',
    lahde: 'en-Wikipedia "Khüiten Peak", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'gobi',
    nimi: 'Gobi',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) — kortin
    // ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Voiko aavikolla olla pakkasta?',
      'Mitä mongolin sana gov\' tarkoittaa?',
    ],
    korostukset: ['gov\''],
    nappi: 'Kylmä aavikko',
    // 103.43 E / 42.59 N — en-Wikipedia "Gobi Desert"
    laudat: {
      maailmankartta: { x: 9281, y: 1699.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gobi on laaja kylmä aavikko- ja aroalue Etelä-Mongoliassa ja Pohjois-Kiinassa — '
      + 'maailman kuudenneksi suurin aavikko. Nimi tulee mongolin sanasta gov\', kuiva maa, '
      + 'jolla on kutsuttu kaikkia Mongolian ylängön vedettömiä seutuja. Gobi ei ole hiekkameri '
      + 'vaan enimmäkseen kivistä puoliaavikkoa, ja talvella siellä paukkuvat pakkaset.',
    lahde: 'en-Wikipedia "Gobi Desert", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'orhon',
    nimi: 'Orhon',
    tyyppi: 'joki',
    kysymykset: [
      'Minne Mongolian joet laskevat?',
      'Mikä kaupunki Orhonin laaksossa sijaitsi?',
    ],
    korostukset: ['Selenga|Selengaan', 'Baikaljärvi|Baikaljärveen'],
    nappi: 'Mongolian pisin joki',
    // 102.75 E / 47.35 N — joen yläjuoksun laakso Harhorinin luona; artikkelin koordinaatti 106,14 / 50,25 on joen suulla Selengan yhtymäkohdassa
    laudat: {
      maailmankartta: { x: 9258.3, y: 1503.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Orhon on Mongolian pisin joki. Se saa alkunsa Hangain vuoristosta, virtaa Harhorinin '
      + 'ohi ja kääntyy pohjoiseen, kunnes yhtyy Selengaan lähellä Venäjän rajaa. Selenga '
      + 'jatkaa siitä Venäjälle ja laskee Baikaljärveen — Mongolian sydänmaiden vesi päätyy '
      + 'siis Siperiaan asti. Yläjuoksulla joen tuntumassa on kymmenen metriä leveä ja '
      + 'kaksikymmentä metriä korkea Ulaan Tsutgalanin vesiputous.',
    lahde: 'en-Wikipedia "Orkhon River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

