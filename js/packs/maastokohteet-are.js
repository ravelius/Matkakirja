/*
 * MAASTOKOHTEET — ARE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ARE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ARE.json. Työkalu laskee laudan
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
 * Arabiemiraattien maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maan tunnusmaasto on Rub al-Khalin hiekka-aavikko, mutta aavikolle ei ole kohdetyyppiä (KOHDE_TYYPIT: vuori, meri, saari, joki) — siksi listalla ovat vuori ja meri.
 */
export const MAASTOKOHTEET_ARE = [
  {
    id: 'jebeljais',
    nimi: 'Jebel Jais',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi maan korkein kohta ei ole huippu?',
      'Mikä Hajarin vuoristo on?',
    ],
    korostukset: ['Hajar|Hajarin'],
    nappi: 'Korkein kohta — mutta ei huippu',
    // 56.1842 E / 25.9531 N — en-Wikipedia "Jebel Jais"
    laudat: {
      maailmankartta: { x: 7706.1, y: 2326.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jebel Jais on Hajarin vuoriston vuori Ras al-Khaimahin emiraatin ja Omanin rajalla. '
      + 'Sen varsinainen huippu, 1 934 metriä, on Omanin puolella — Arabiemiraattien korkein '
      + 'kohta on saman vuoren rinteellä 1 892 metrissä, kohouma jolla on vain kymmenisen '
      + 'metriä omaa korkeutta. Korkein kokonaan maan puolella oleva huippu on viereinen Jabal '
      + 'ar Rahrah, 1 691 metriä.',
    lahde: 'en-Wikipedia "Jebel Jais", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'persianlahti',
    nimi: 'Persianlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Hormuzinsalmi on?',
      'Miksi lahden rannoilla sukellettiin helmiä?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmen'],
    nappi: 'Matala meri helmien ja öljyn päällä',
    // 53 E / 25.3 N — ulappa Abu Dhabin edustalla; artikkelin oma keskipiste 52 / 26 on lähellä
    laudat: {
      maailmankartta: { x: 7600, y: 2350.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Persianlahti on Arabian niemimaan ja Iranin välinen sisämeri, Arabianmeren ja Intian '
      + 'valtameren jatke. Avomerelle siitä pääsee vain idästä, kapean Hormuzinsalmen kautta '
      + 'Omaninlahteen, ja luoteisrannan muodostaa Shatt al-Arabin suisto. Lähes koko '
      + 'Arabiemiraattien rannikko ja kaikki sen suuret kaupungit ovat tämän lahden rannalla.',
    lahde: 'en-Wikipedia "Persian Gulf", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

