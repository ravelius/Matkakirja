/*
 * MAASTOKOHTEET — PER. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PER --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PER.json. Työkalu laskee laudan
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
 * Perun maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Huascarán sellaisenaan; Marañónille ei ole fi-artikkelia, ja nimi on espanjankielinen erisnimi. Titicacajärvi jätettiin pois tarkoituksella: se on annettu Bolivialle, jottei sama kohde toistuisi kahdessa maassa.
 */
export const MAASTOKOHTEET_PER = [
  {
    id: 'huascaran',
    nimi: 'Huascarán',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten vuori voi olla lumihuippu tropiikissa?',
      'Mikä on Cordillera Blanca?',
    ],
    korostukset: ['tropiikki|tropiikin'],
    nappi: 'Tropiikin korkein kohta',
    // -77.6042 E / -9.1217 N — en-Wikipedia "Huascarán" (-77,604 / -9,122)
    laudat: {
      maailmankartta: { x: 3246.5, y: 3516.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Huascarán kohoaa Ancashin departementissa läntisten Andien Cordillera Blancassa. Sen '
      + 'eteläinen huippu Huascarán Sur yltää 6 768 metriin, ja se on Perun korkein kohta, '
      + 'pohjoisten Andien eli Titicacajärveä pohjoisempien vuorten korkein huippu ja koko '
      + 'maapallon tropiikin korkein piste. Etelä-Amerikan vuorista korkeampia ovat vain '
      + 'Aconcagua, Ojos del Salado ja Monte Pissis. Topografiselta eristyneisyydeltään '
      + 'Huascarán on maailman 25:s. Vuoren nimi on ketšuaksi Waskaran ja paikallisesti myös '
      + 'Mataraju.',
    lahde: 'en-Wikipedia "Huascarán", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'maranon',
    nimi: 'Marañón',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Amazon oikeastaan alkaa?',
      'Mitä tarkoittaa, että joella on omat oikeudet?',
    ],
    nappi: 'Amazonin päälatvahaara',
    // -77.2977 E / -7.9674 N — en-Wikipedia "Marañón River" (-77,298 / -7,967)
    laudat: {
      maailmankartta: { x: 3256.7, y: 3477.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Marañón on Amazonin päälatvahaara. Se saa alkunsa noin 160 kilometriä Limasta '
      + 'koilliseen, virtaa luoteeseen 3 650 metrin korkuisten ylätasankojen poikki ja '
      + 'kaivautuu syvään Andien laaksoon vuoriston itäjuurella. Noin viiden asteen ja 36 '
      + 'minuutin eteläisellä leveyspiirillä se kääntyy jyrkästi koilliseen, leikkaa vuoriston '
      + 'läpi ja purkautuu Pongo de Mansericheltä Amazonin alangolle. Nykyisin Marañónin '
      + 'katsotaan päättyvän Ucayalin liittymään, mistä eteenpäin joki on Amazon. Vuonna 2024 '
      + 'perulainen tuomioistuin päätti, että joella itsellään on perusoikeuksia.',
    lahde: 'en-Wikipedia "Marañón River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

