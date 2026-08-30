/*
 * MAASTOKOHTEET — JPN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs JPN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/JPN.json. Työkalu laskee laudan
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
 * Japanin maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_JPN = [
  {
    id: 'fuji',
    nimi: 'Fuji',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin Fuji viimeksi purkautui?',
      'Miksi juuri Fuji päätyi tuhansiin tauluihin?',
    ],
    korostukset: ['Honshu|Honshun'],
    nappi: 'Japanin pyhä kartio',
    // 138.7275 E / 35.3608 N — en-Wikipedia "Mount Fuji"
    laudat: {
      maailmankartta: { x: 10457.6, y: 1981.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Fuji on Japanin korkein vuori, 3 776 metriä, ja yhä aktiivinen kerrostulivuori Honshun '
      + 'saarella — viimeksi se purkautui vuosina 1707–1708. Sen poikkeuksellisen symmetrinen '
      + 'kartio on lumen peitossa noin viisi kuukautta vuodesta ja näkyy kirkkaalla säällä '
      + 'Tokioon asti, sadan kilometrin päähän. Vuori on Japanin kulttuurin tunnuskuvia, jota '
      + 'taiteilijat ovat kuvanneet loputtomiin.',
    lahde: 'en-Wikipedia "Mount Fuji", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'japaninmeri',
    nimi: 'Japaninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi tällä merellä ei ole vuorovettä?',
      'Mitkä maat merta reunustavat?',
    ],
    korostukset: ['Sahalin|Sahalinin'],
    nappi: 'Meri lähes ilman vuorovettä',
    // 135 E / 40 N — en-Wikipedia "Sea of Japan" — artikkelin oma keskipiste
    laudat: {
      maailmankartta: { x: 10333.3, y: 1802.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Japaninmeri on reunameri Japanin saariston, Korean niemimaan, Sahalinin ja Venäjän '
      + 'Kaukoidän välissä. Japanin saaret sulkevat sen Tyynestämerestä niin tiiviisti, että '
      + 'vuorovesi jää lähes olemattomaksi, aivan kuten Välimerellä. Samasta syystä sen vesi on '
      + 'avomerta vähäsuolaisempaa ja lajisto omanlaisensa — suuria saaria, lahtia tai niemiä '
      + 'merellä ei ole lainkaan.',
    lahde: 'en-Wikipedia "Sea of Japan", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'shinanojoki',
    nimi: 'Shinanojoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joella on kaksi nimeä?',
      'Mistä Japanin Alpit ovat saaneet nimensä?',
    ],
    korostukset: ['Japanin Alpit|Japanin Alpeilta'],
    nappi: 'Japanin pisin joki, kaksi nimeä',
    // 138.81 E / 37.39 N — en-Wikipedia "Shinano River" — alajuoksu Niigatan maakunnassa
    laudat: {
      maailmankartta: { x: 10460.3, y: 1904.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Shinanojoki on Japanin pisin ja levein joki. Se saa alkunsa Japanin Alpeilta ja virtaa '
      + 'koilliseen Naganon ja Niigatan maakuntien halki Japaninmereen. Yläjuoksullaan sillä on '
      + 'eri nimi, Chikuma — sama virta vaihtaa siis nimeä matkalla vuorilta merelle.',
    lahde: 'en-Wikipedia "Shinano River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

