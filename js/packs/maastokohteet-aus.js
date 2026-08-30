/*
 * MAASTOKOHTEET — AUS. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AUS --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AUS.json. Työkalu laskee laudan
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
 * Australian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Suomalaiset nimiasut fi-Wikipediasta (Iso valliriutta, Korallimeri, Uluru, Mount Kosciuszko). Korallimeren merkki on artikkelin omalla keskipisteellä 158 / −18, joka osuu vielä lehden ikkunan itälaitaan.
 */
export const MAASTOKOHTEET_AUS = [
  {
    id: 'mountkosciuszko',
    nimi: 'Mount Kosciuszko',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli Tadeusz Kościuszko?',
      'Miksi Australian korkeimmalle huipulle pääsee kävellen?',
    ],
    korostukset: ['seitsemän huippua|seitsemän huipun'],
    nappi: 'Mantereen korkein huippu',
    // 148.2636 E / -36.4558 N — en-Wikipedia "Mount Kosciuszko" (36°27′21″S 148°15′49″E)
    laudat: {
      maailmankartta: { x: 10775.5, y: 4482.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Kosciuszko on Australian mantereen korkein vuori, 2 228 metriä merenpinnasta. Se '
      + 'kohoaa Uuden Etelä-Walesin Snowy Mountains -vuoriston pääharjanteella. Nimen antoi '
      + 'vuonna 1840 puolalainen tutkimusmatkailija Paweł Edmund Strzelecki kenraali Tadeusz '
      + 'Kościuszkon mukaan: huippu muistutti häntä Krakovan Kościuszko-kummusta. Victorian '
      + 'kartoissa nimet menivät vuosikymmeniksi ristiin naapurihuippu Mount Townsendin kanssa, '
      + 'ja sekaannus oikaistiin vasta 1940. Huipulle vie ajotie Charlotte Passilta Rawson '
      + 'Passiin ja siitä 1,4 kilometrin polku; nousu on helpoin koko seitsemän huipun '
      + 'listalla.',
    lahde: 'en-Wikipedia "Mount Kosciuszko", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'uluru',
    nimi: 'Uluru',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Uluru on pinnaltaan punainen mutta sisältä harmaa?',
      'Miksi kalliolle ei enää kiivetä?',
    ],
    korostukset: ['hiekkakivi|hiekkakivimuodostuma'],
    nappi: 'Punainen kallio autiomaan keskellä',
    // 131.0361 E / -25.345 N — en-Wikipedia "Uluru"
    laudat: {
      maailmankartta: { x: 10201.2, y: 4074.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Uluru on valtava hiekkakivimuodostuma Australian Pohjoisterritoriossa, 335 kilometriä '
      + 'Alice Springsistä lounaaseen. Se kohoaa 348 metriä ympäröivästä tasangosta ja 863 '
      + 'metriä merenpinnasta, mutta suurin osa sen massasta on maan alla; ympärysmitta on noin '
      + '9,4 kilometriä. Kivi on maasälpäpitoista arkoosia, jonka pinnan rautaoksidi ruostuttaa '
      + 'punaiseksi — tuoreelta murtumalta se on harmaata. Alueen perinteiset omistajat ovat '
      + 'aṉangut, joille paikka on pyhä; Australia palautti omistuksen heille 1985. Maanmittari '
      + 'William Gosse nimesi kallion 1873 Ayers Rockiksi, ja kiipeäminen kiellettiin '
      + 'lokakuussa 2019.',
    lahde: 'en-Wikipedia "Uluru", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'isovalliriutta',
    nimi: 'Iso valliriutta',
    tyyppi: 'meri',
    kysymykset: [
      'Mitä korallien vaaleneminen tarkoittaa?',
      'Miten riuttaa yritetään suojella?',
    ],
    korostukset: ['koralli|korallipeitteestään'],
    nappi: 'Elävien olentojen suurin rakennelma',
    // 145.8 E / -16.4 N — en-Wikipedia "Great Barrier Reef"
    laudat: {
      maailmankartta: { x: 10693.3, y: 3763 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Iso valliriutta on maailman suurin koralliriuttajärjestelmä: yli 2 300 kilometriä '
      + 'pitkä ketju Queenslandin rannikolla Korallimeressä. Siihen kuuluu yli 2 900 erillistä '
      + 'riuttaa ja 900 saarta noin 344 400 neliökilometrin alalla, ja mantereesta sen erottaa '
      + 'paikoin 160 kilometriä leveä väylä. Riutta on suurin yksittäinen elävien eliöiden '
      + 'rakentama rakennelma maapallolla, ja se erottuu avaruuteen asti. Lajeja on tuhansia: '
      + 'yli 1 500 kalaa ja 400 korallia. Unesco listasi riutan maailmanperintökohteeksi 1981, '
      + 'mutta se on menettänyt yli puolet korallipeitteestään vuoden 1985 jälkeen.',
    lahde: 'en-Wikipedia "Great Barrier Reef", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'korallimeri',
    nimi: 'Korallimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on reunameri?',
      'Miksi Korallimeren taistelu oli sodan käännekohta?',
    ],
    korostukset: ['reunameri|reunameri'],
    nappi: 'Riutan koti ja meritaistelun paikka',
    // 158 E / -18 N — en-Wikipedia "Coral Sea" antaa keskipisteeksi 158 / −18
    laudat: {
      maailmankartta: { x: 11100, y: 3817.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Korallimeri on eteläisen Tyynenmeren reunameri Australian koillispuolella. Sitä '
      + 'rajaavat lännessä Queenslandin rannikko, idässä Vanuatu ja Uusi-Kaledonia, koillisessa '
      + 'Salomonsaaret ja luoteessa Uuden-Guinean etelärannikko. Pinta-alaa on 4 791 000 '
      + 'neliökilometriä ja syvyyttä enimmillään 9 140 metriä. Meressä lepää maailman suurin '
      + 'riuttajärjestelmä, Iso valliriutta, joka pääsi Unescon maailmanperintöluetteloon 1981. '
      + 'Toukokuussa 1942 näillä vesillä käytiin Korallimeren taistelu, jossa liittoutuneiden '
      + 'laivasto esti japanilaisten maihinnousun Port Moresbyyn.',
    lahde: 'en-Wikipedia "Coral Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

