/*
 * MAASTOKOHTEET — PRY. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PRY --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PRY.json. Työkalu laskee laudan
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
 * Paraguayn maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Paraguayjoki ja Gran Chaco. Korkeimman kohdan en-artikkeli on Cerro Tres Kandú; nimi Cerro Perõ on saman kukkulan toinen asu, mutta kohteen nimeksi on otettu lähteen oma otsikko.
 */
export const MAASTOKOHTEET_PRY = [
  {
    id: 'cerrotreskandu',
    nimi: 'Cerro Tres Kandú',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta jää alle kilometrin?',
      'Miksi armeija vei mastonsa juuri tälle kukkulalle?',
    ],
    korostukset: ['guarani|guaranin'],
    nappi: 'Paraguayn korkein kohta',
    // -56.16 E / -25.9017 N — en-Wikipedia "Cerro Tres Kandú" (-56,16 / -25,902)
    laudat: {
      maailmankartta: { x: 3961.3, y: 4094.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cerro Tres Kandú on Paraguayn korkein kohta, 842 metriä. Se kohoaa Guairán '
      + 'departementissa General Eugenio Garayn kunnassa Ybytyruzú-nimisessä kukkulajonossa. '
      + 'Nimi on guaranin kieltä. Koko maa on niin tasaista, että tämä vaatimaton kukkula '
      + 'riittää huipuksi — vertailun vuoksi naapurin Aconcagua on yli kahdeksankertainen. '
      + 'Kukkula oli pitkään tärkeä Paraguayn asevoimille, sillä sen laelle sopi radiolinkkien '
      + 'toistin, ja myös maan sähköyhtiö ANDE piti siellä omaansa. Nykyään laitteet ovat '
      + 'hylättyjä.',
    lahde: 'en-Wikipedia "Cerro Tres Kandú", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'paraguayjoki',
    nimi: 'Paraguayjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miten sisämaavaltio pääsee jokea pitkin merelle?',
      'Montako valtakunnanrajaa yksi joki voi muodostaa?',
    ],
    nappi: 'Sisämaavaltion tie merelle',
    // -57.63 E / -25.28 N — joen uoma Asunciónin kohdalla; en-Wikipedian artikkelilla "Paraguay River" ei ole pistekoordinaattia
    laudat: {
      maailmankartta: { x: 3912.3, y: 4072.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Paraguayjoki on Etelä-Amerikan keskiosan suuria virtoja. Se kulkee Brasilian ja '
      + 'Paraguayn halki ja muodostaa osan Paraguayn ja Argentiinan, Brasilian ja Bolivian sekä '
      + 'Brasilian ja Paraguayn välisistä rajoista. Matkaa latvoilta Brasilian Mato Grossosta '
      + 'Paranájokeen, johon se yhtyy Corrientesin ja Resistencian pohjoispuolella, on noin 2 '
      + '621 kilometriä. Merelle Paraguaylla ei ole omaa rantaa, joten juuri tämä joki on maan '
      + 'väylä maailmalle: se laskee Paranájokeen, ja Paraná jatkaa Río de la Platan '
      + 'estuaariin.',
    lahde: 'en-Wikipedia "Paraguay River", johdanto-osa; jatko estuaariin en-Wikipedia "Río de la '
      + 'Plata", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'granchaco',
    nimi: 'Gran Chaco',
    // Alanko ei ole vuori, meri eikä joki: tyyppi 'muu' + symboli
    // 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js) —
    // kortin ylärivi näyttää silloin luokan Luonto eikä väärää otsaketta.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Chacoa sanotaan puoliaavikoksi, vaikka siellä on metsää?',
      'Mitä Chacon metsille tapahtuu nyt?',
    ],
    nappi: 'Mantereen toiseksi laajin metsäalue',
    // -59.5 E / -22.3 N — Paraguayn puoleinen Chaco; en-Wikipedia "Gran Chaco" antaa keskipisteeksi -61,47 / -19,16
    laudat: {
      maailmankartta: { x: 3850, y: 3967.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gran Chaco on laaja puolikuiva alanko Etelä-Amerikan keskiosassa. Se leviää yli '
      + 'miljoonan neliökilometrin alalle Bolivian itäosaan, Paraguayn länsipuoliskoon, '
      + 'Pohjois-Argentiinaan ja osaan Brasiliaa, ja kuuluu Río de la Platan valuma-alueeseen. '
      + 'Maisemassa vuorottelevat trooppiset ja subtrooppiset kuivat lehtimetsät, '
      + 'piikkipensaikot, savannit, kosteikot ja palmulehdot; se on mantereen toiseksi laajin '
      + 'metsäalue. Lajeja on paljon: yli 3 400 kasvia, noin 500 lintua ja 150 nisäkästä, muun '
      + 'muassa jaguaari, jättivyötiäinen, pekarit ja harjasusi.',
    lahde: 'en-Wikipedia "Gran Chaco", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

