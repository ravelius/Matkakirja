/*
 * MAASTOKOHTEET — KAZ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KAZ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KAZ.json. Työkalu laskee laudan
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
 * Kazakstanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kaspianmeri on annettu IRN:lle, joten Kazakstanin 'meri' on Araljärvi — jonka koko tarina on juuri se, ettei merta enää ole.
 */
export const MAASTOKOHTEET_KAZ = [
  {
    id: 'khantengri',
    nimi: 'Khan Tengri',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huipun korkeus riippuu jäästä?',
      'Mikä Tian Shan on?',
    ],
    korostukset: ['Tian Shan|Tian Shanin'],
    nappi: 'Taivaiden valtias kolmen maan rajalla',
    // 80.175 E / 42.2108 N — en-Wikipedia "Khan Tengri"
    laudat: {
      maailmankartta: { x: 8505.8, y: 1715.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Khan Tengri, "taivaiden valtias", kohoaa Tian Shanin vuoristossa täsmälleen '
      + 'Kazakstanin, Kirgisian ja Kiinan rajojen yhtymäkohdassa, ja se on Kazakstanin korkein '
      + 'kohta. Kalliohuippu on 6 995 metrissä, mutta laen jääkupu nostaa vuoren 7 010 metriin '
      + '— siksi vuorikiipeilijät laskevat sen seitsemäntuhantisten joukkoon. Koko Tian '
      + 'Shanissa sen ylittää vain Jengish Chokusu.',
    lahde: 'en-Wikipedia "Khan Tengri", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'araljarvi',
    nimi: 'Araljärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Minne Araljärven vesi meni?',
      'Mitä \'saarten meri\' tarkoittaa?',
    ],
    korostukset: ['puuvilla|puuvillapelloille'],
    nappi: 'Meri, joka katosi ihmisen käsissä',
    // 60 E / 45 N — en-Wikipedia "Aral Sea" — entisen järven keskipiste
    laudat: {
      maailmankartta: { x: 7833.3, y: 1601.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Araljärvi oli vielä 1900-luvun puolivälissä maailman kolmanneksi suurin järvi, 68 000 '
      + 'neliökilometriä suolaista vettä Kazakstanin ja Uzbekistanin välissä — nimi tarkoittaa '
      + 'saarten merta, sillä saaria oli yli tuhat. Kun Neuvostoliitto käänsi sitä ruokkivat '
      + 'joet puuvillapelloille 1960-luvulta alkaen, järvi alkoi kutistua, ja vuoteen 2007 '
      + 'mennessä jäljellä oli kymmenesosa. Entinen pohja on nykyään aavikkoa, ja vain '
      + 'pohjoinen allas Kazakstanin puolella on saatu osin elvytettyä.',
    lahde: 'en-Wikipedia "Aral Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'irtys',
    nimi: 'Irtyš',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Irtyš on \'vain\' sivujoki?',
      'Minkä kolmen maan läpi joki virtaa?',
    ],
    korostukset: ['Ob|Obiin'],
    nappi: 'Maailman pisin sivujoki',
    // 80.25 E / 50.42 N — Semein kohdalla Itä-Kazakstanissa; artikkelin koordinaatti 68,83 / 61,08 on alajuoksulla Venäjällä
    laudat: {
      maailmankartta: { x: 8508.3, y: 1371.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Irtyš alkaa Mongolian Altailta Kiinan puolelta, virtaa Kazakstanin itäosan halki ja '
      + 'jatkaa Venäjälle, missä se laskee Obiin. Se on maailman pisin sivujoki — pidempi kuin '
      + 'pääjokensa siihen asti, missä ne kohtaavat. Yhdessä Ob ja Irtyš muodostavat '
      + 'jokijärjestelmän, joka kokoaa vedet suurimmasta osasta Länsi-Siperiaa ja Altain '
      + 'vuoristoa.',
    lahde: 'en-Wikipedia "Irtysh", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

