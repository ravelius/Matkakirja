/*
 * MAASTOKOHTEET — KEN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KEN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KEN.json. Työkalu laskee laudan
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
 * Kenian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Kenya on myös fi-Wikipedian nimi; järven asu fi-Wikipedian mukaan Victorianjärvi.
 */
export const MAASTOKOHTEET_KEN = [
  {
    id: 'mountkenya',
    nimi: 'Mount Kenya',
    tyyppi: 'vuori',
    kysymykset: [
      'Kauanko vuoren jäätiköt vielä kestävät?',
      'Kuinka korkea Mount Kenya oli ennen jäätiköitymistä?',
    ],
    korostukset: ['päiväntasaaja|päiväntasaajalta'],
    nappi: 'Vuori, joka antoi maalle nimen',
    // 37.3075 E / -0.1508 N — en-Wikipedia "Mount Kenya"
    laudat: {
      maailmankartta: { x: 7076.9, y: 3216.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Kenya on Afrikan toiseksi korkein vuori ja koko maan kaima. Sen korkeimmat '
      + 'huiput ovat Batian (5 199 m), Nelion (5 188 m) ja Point Lenana (4 985 m), ja se kohoaa '
      + 'vain 16,5 kilometriä päiväntasaajalta etelään. Tulivuori oli ennen jäätiköitymistään '
      + 'noin 7 000 metriä korkea; nykyisin sen rinteillä on yksitoista kutistuvaa jäätikköä, '
      + 'jotka voivat kadota vuoteen 2050 mennessä. Metsäiset rinteet ovat suurelle osalle '
      + 'Keniaa elintärkeä vesitorni.',
    lahde: 'en-Wikipedia "Mount Kenya", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'victorianjarvi',
    nimi: 'Victorianjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuri osa järvestä kuuluu Kenialle?',
      'Miksi niilinahven oli tuhoisa tulokas?',
    ],
    nappi: 'Afrikan suurin järvi',
    // 34.2 E / -0.35 N — Kenialle kuuluva koilliskulma järvestä; en-Wikipedia "Lake Victoria" antaa keskipisteeksi 33 / -1
    laudat: {
      maailmankartta: { x: 6973.3, y: 3223.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Victorianjärvi on Afrikan suurin ja maailman suurin trooppinen järvi — makean veden '
      + 'järvistä vain Pohjois-Amerikan Yläjärvi on pinta-alaltaan suurempi. Järvi jakautuu '
      + 'kolmen maan kesken: Tansanialle kuuluu 49, Ugandalle 45 ja Kenialle 6 prosenttia. '
      + 'Matalassa, keskimäärin vain 40-metrisessä vedessä elää kirjoahvenia, joita ei tapaa '
      + 'missään muualla maailmassa, mutta niilinahvenen kaltaiset tulokaslajit ovat ajaneet '
      + 'monet niistä sukupuuttoon.',
    lahde: 'en-Wikipedia "Lake Victoria", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on monsuuni?',
      'Mitä Intian valtameren yli purjehdittiin jo muinoin?',
    ],
    nappi: 'Monsuunien meri',
    // 40.2 E / -4.3 N — ulappa Mombasan edustalla; en-Wikipedia "Indian Ocean" antaa keskipisteeksi 80 / -20
    laudat: {
      maailmankartta: { x: 7173.3, y: 3354.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman valtameristä kolmanneksi suurin ja lämpimin, ja sen '
      + 'ilmastoa hallitsevat monsuunit. Se on ollut kaupan ja kulttuurien kohtauspaikka '
      + 'muinaisista ajoista asti, ja Kenian rannikko on osa tätä vanhaa valtamerten '
      + 'kauppaverkkoa. Meren ekosysteemit ovat monimuotoisia: koralliriuttoja, mangrovemetsiä '
      + 'ja meriheinäniittyjä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

