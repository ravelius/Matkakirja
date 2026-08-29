/*
 * MAASTOKOHTEET — ISL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ISL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ISL.json. Työkalu laskee laudan
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
 * Islannin maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Islanti on Euroopan laudan kaavan (lon -11...41) ULKOPUOLELLA, joten kohteet saavat vain maailmankartan rivin — sama sääntö kuin laudan omalla Islanti-pisteellä (js/packs/europe.js).
 */
export const MAASTOKOHTEET_ISL = [
  {
    id: 'hvannadalshnukur',
    nimi: 'Hvannadalshnúkur',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Öræfajökull on?',
      'Mitä ultraprominentti huippu tarkoittaa?',
    ],
    korostukset: ['Vatnajökull|Vatnajökullin'],
    nappi: 'Islannin korkein piste',
    // -16.6747 E / 64.0158 N — en-Wikipedia "Hvannadalshnjúkur"
    laudat: {
      maailmankartta: { x: 5277.5, y: 719 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hvannadalshnúkur on pyramidin muotoinen huippu Öræfajökull-tulivuoren huippukraatterin '
      + 'luoteisreunalla Vatnajökullin kansallispuistossa. Se on Islannin korkein kohta ja maan '
      + 'ainoa ultraprominentti huippu — ainoa, joka kohoaa ympäristöstään yli puolentoista '
      + 'kilometrin verran. Huippu ei siis ole oma vuorensa vaan jäätikön peittämän tulivuoren '
      + 'reuna.',
    lahde: 'en-Wikipedia "Hvannadalshnjúkur", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'gronlanninmeri',
    nimi: 'Grönlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuuluuko Grönlanninmeri Jäämereen vai Atlanttiin?',
      'Mikä Framinsalmi on?',
    ],
    korostukset: ['Framinsalmi|Framinsalmi'],
    nappi: 'Meri, joka ei tiedä mihin kuuluu',
    // -18.5 E / 67 N — meren eteläreuna Islannin pohjoispuolella; artikkelin oma keskipiste on -8 / 76
    laudat: {
      maailmankartta: { x: 5216.7, y: 555.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Grönlanninmeri rajautuu lännessä Grönlantiin, idässä Huippuvuoriin, pohjoisessa '
      + 'Framinsalmeen ja Jäämereen sekä etelässä Norjanmereen ja Islantiin. Se määritellään '
      + 'joskus osaksi Jäämerta ja joskus osaksi Atlanttia — Jäämeren ja sen sivumerten rajat '
      + 'ovat epätarkkoja. Merentutkimuksessa se luetaan Norjanmeren kanssa Pohjoisiin meriin.',
    lahde: 'en-Wikipedia "Greenland Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jorsa',
    nimi: 'Þjórsá',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Stöng on?',
      'Mikä oli þing?',
    ],
    korostukset: ['jäätikköjoki|jäätikköjoki'],
    nappi: 'Härkäjoki',
    // -20.813 E / 63.774 N — en-Wikipedia "Þjórsá" — joen suu Atlantilla
    laudat: {
      maailmankartta: { x: 5139.6, y: 731.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Þjórsá on Islannin pisin joki, 230 kilometriä, ja se virtaa saaren eteläosassa. Se on '
      + 'jäätikköjoki, joka saa alkunsa Hofsjökullilta, kulkee kapeiden rotkojen läpi Islannin '
      + 'ylängöillä ja levenee alangolla. Nimi tulee sanoista á, joki, ja þjór, härkä: '
      + 'Landnámabókin mukaan joki nimettiin erään ensimmäisistä uudisasukaslaivoista '
      + 'keulakuvan mukaan, joka esitti härkää.',
    lahde: 'en-Wikipedia "Þjórsá", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

