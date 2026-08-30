/*
 * MAASTOKOHTEET — BRA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs BRA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/BRA.json. Työkalu laskee laudan
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
 * Brasilian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Nimien suomalainen asu fi-Wikipediasta: Pico da Neblina sellaisenaan, joen fi-artikkeli on Amazon.
 */
export const MAASTOKOHTEET_BRA = [
  {
    id: 'picodaneblina',
    nimi: 'Pico da Neblina',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Brasilian korkein huippu on niin matala?',
      'Mitä yanomamit tarkoittavat nimellä Yaripo?',
    ],
    korostukset: ['yanomamit|yanomamit'],
    nappi: 'Brasilian korkein huippu',
    // -66.0067 E / 0.8047 N — en-Wikipedia "Pico da Neblina" (-66,007 / 0,805)
    laudat: {
      maailmankartta: { x: 3633.1, y: 3184.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Pico da Neblina eli Sumuhuippu on Brasilian korkein vuori, 2 995 metriä. Se kohoaa '
      + 'maan luoteiskulmassa Amazonasin osavaltiossa Guayanan ylängön eteläreunalla, ja huippu '
      + 'on vain 687 metrin päässä Venezuelan rajasta. Se on koko Guayanan kilven korkein kohta '
      + 'ja Etelä-Amerikan korkein piste Andien itäpuolella. Yanomamit kutsuvat vuorta nimellä '
      + 'Yaripo, tuulten vuori, ja pitävät sitä pyhänä. Sadetta ja sumua riittää: ylärinteillä '
      + 'elää sammakoita, joiden lähimmät sukulaiset erkanivat niistä yli 45 miljoonaa vuotta '
      + 'sitten.',
    lahde: 'en-Wikipedia "Pico da Neblina", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantinvaltameri',
    nimi: 'Atlantin valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Atlantin muoto muistuttaa S-kirjainta?',
      'Kuka ylitti Atlantin ennen Kolumbusta?',
    ],
    nappi: 'Meri, joka erotti kaksi maailmaa',
    // -38 E / -13 N — ulappa Brasilian itärannikon edustalla Salvadorin kohdalla; en-Wikipedia "Atlantic Ocean" antaa keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 4566.7, y: 3647.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantin valtameri on maailman valtameristä toiseksi suurin: noin 85 133 000 '
      + 'neliökilometriä eli 17 prosenttia maapallon pinnasta. Sen allas on pitkänomainen ja '
      + 'S-kirjaimen muotoinen ja kulkee Euroopan ja Afrikan sekä Amerikkojen välissä. '
      + 'Löytöretkien aikaan meri tunnettiin juuri siitä, että se erotti uuden maailman '
      + 'vanhasta. Ensimmäisinä tunnettuina ylittäjinä pidetään viikinkejä, mutta Kristoffer '
      + 'Kolumbuksen matka 1492 oli seurauksiltaan mullistavin. Eteläinen Atlantti pysyy '
      + 'lämpimänä ympäri vuoden, koska sen rantavaltiot ovat tropiikissa.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'amazon',
    nimi: 'Amazon',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Amazonin pituudesta kiistellään?',
      'Mikä on Vesien kohtaaminen?',
    ],
    nappi: 'Maailman vuolain joki',
    // -60 E / -3.1 N — Vesien kohtaaminen Manausin kohdalla, jossa Rio Negro yhtyy Solimõesiin; en-Wikipedia "Amazon River" antaa koordinaatiksi latvat Perussa (-71,694 / -15,518)
    laudat: {
      maailmankartta: { x: 3833.3, y: 3314.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Amazon on virtaamaltaan maailman suurin joki: se purkaa keskimäärin 215 000–230 000 '
      + 'kuutiometriä sekunnissa eli enemmän kuin seitsemän seuraavaksi suurinta jokea '
      + 'yhteensä. Se vie viidenneksen kaikesta jokivedestä, joka maailman merille päätyy, ja '
      + 'sen 7 miljoonan neliökilometrin valuma-alue on maailman laajin. Pituudesta kiistellään '
      + 'Niilin kanssa; tunnustettu mitta on 6 400 kilometriä. Manausin kohdalla Rio Negron '
      + 'musta vesi kohtaa Solimõesin savisen virran, eivätkä ne sekoitu heti — sitä sanotaan '
      + 'Vesien kohtaamiseksi.',
    lahde: 'en-Wikipedia "Amazon River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

