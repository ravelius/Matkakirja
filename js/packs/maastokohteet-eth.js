/*
 * MAASTOKOHTEET — ETH. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ETH --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ETH.json. Työkalu laskee laudan
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
 * Etiopian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Etiopia on sisämaavaltio, joten meren paikalla on maan suurin järvi Tanajärvi. Nimet fi-Wikipedian mukaan: Ras Dejen, Tanajärvi, Sininen-Niili.
 */
export const MAASTOKOHTEET_ETH = [
  {
    id: 'rasdejen',
    nimi: 'Ras Dejen',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Ras Dejen tarkoittaa?',
      'Millaisia eläimiä Simien-vuorilla elää?',
    ],
    korostukset: ['Simien-vuoret|Simien-vuorten'],
    nappi: 'Etiopian katto',
    // 38.3708 E / 13.2358 N — en-Wikipedia "Ras Dashen"
    laudat: {
      maailmankartta: { x: 7112.4, y: 2767.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ras Dejen, englanniksi usein Ras Dashen, on Etiopian korkein vuori: 4 550 metriä. Se '
      + 'kohoaa Simien-vuorten kansallispuistossa Amharan alueella maan pohjoisosassa. Etiopian '
      + 'karttalaitoksen käyttämä nimi viittaa perimätiedon mukaan päällikköön eli rasiin, joka '
      + 'taistelee keisarin edellä.',
    lahde: 'en-Wikipedia "Ras Dashen", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tanajarvi',
    nimi: 'Tanajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi näin suuri järvi on vain 15 metriä syvä?',
      'Mitä Tis Abbain putouksilla tapahtuu?',
    ],
    nappi: 'Sinisen-Niilin lähde',
    // 37.25 E / 12 N — en-Wikipedia "Lake Tana" (37,25 / 12)
    laudat: {
      maailmankartta: { x: 7075, y: 2809.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanajärvi on Etiopian suurin järvi ja Sinisen-Niilin lähde. Se lepää 1 788 metrin '
      + 'korkeudessa Etiopian ylängöllä: pituutta on noin 84 ja leveyttä 66 kilometriä, mutta '
      + 'syvyyttä enimmilläänkin vain 15 metriä, ja pinta-ala vaihtelee sateiden mukaan 3 000 '
      + 'ja 3 500 neliökilometrin välillä. Järven laskukohdasta vesi syöksyy Sinisen-Niilin '
      + 'putouksille, joita paikalliset kutsuvat nimellä Tis Abbai.',
    lahde: 'en-Wikipedia "Lake Tana", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sininenniili',
    nimi: 'Sininen-Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Kumpi on tärkeämpi, Valkoinen vai Sininen Niili?',
      'Missä kaupungissa Niilin haarat yhtyvät?',
    ],
    nappi: 'Joki, joka tuo Niilin veden',
    // 36.5 E / 10.5 N — joen kanjoni Etiopian ylängöllä Tanajärven lounaispuolella; en-Wikipedia "Blue Nile" antaa koordinaatiksi Tanajärven 37,25 / 12
    laudat: {
      maailmankartta: { x: 7050, y: 2860.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sininen-Niili saa alkunsa Tanajärvestä ja virtaa noin 1 450 kilometriä Etiopian ja '
      + 'Sudanin halki, kunnes yhtyy Valkoiseen Niiliin. Valkoinen haara on pidempi, mutta vesi '
      + 'tulee täältä: sadekaudella Sininen-Niili tuo noin 85,6 prosenttia koko Niilin vedestä.',
    lahde: 'en-Wikipedia "Blue Nile", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

