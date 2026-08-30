/*
 * MAASTOKOHTEET — CMR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CMR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CMR.json. Työkalu laskee laudan
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
 * Kamerunin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Kamerunvuoren korkeudeksi ilmoitetaan usein 4 095 m, mutta artikkelin tietolaatikko antaa 4 040 m ja huomauttaa, ettei suurempi lukema sovi SRTM-korkeusaineistoon — tekstissä käytetään tietolaatikon lukemaa.
 */
export const MAASTOKOHTEET_CMR = [
  {
    id: 'kamerunvuori',
    nimi: 'Kamerunvuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin Kamerunvuori purkautui viimeksi?',
      'Mitä paikallinen nimi Mongo ma Ndemi tarkoittaa?',
    ],
    korostukset: ['Guineanlahti|Guineanlahden'],
    nappi: 'Aktiivinen tulivuori meren äärellä',
    // 9.1725 E / 4.2167 N — en-Wikipedia "Mount Cameroon"
    laudat: {
      maailmankartta: { x: 6139.1, y: 3070.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kamerunvuori on aktiivinen kerrostulivuori Lounais-Kamerunissa, Buean kaupungin '
      + 'vieressä lähellä Guineanlahden rantaa. Sen korkeudeksi annetaan 4 040 metriä, joskin '
      + 'lähteet kiistelevät lukemasta. Paikallisilta kieliltä vuori tunnetaan nimillä Fako ja '
      + 'Mongo ma Ndemi, ja se on maailman huippujen joukossa sijalla 22, kun ne pannaan '
      + 'järjestykseen sen mukaan, kuinka kaukana lähin korkeampi maasto on.',
    lahde: 'en-Wikipedia "Mount Cameroon", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'guineanlahti',
    nimi: 'Guineanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä Bonnynlahti ja Beninlahti ovat?',
      'Mistä Guineanlahden öljy pumpataan?',
    ],
    nappi: 'Tropiikin suuri lahti',
    // 8.7 E / 3 N — ulappa Kamerunin rannikon edustalla; en-Wikipedia "Gulf of Guinea" antaa keskipisteeksi 0 / 0
    laudat: {
      maailmankartta: { x: 6123.3, y: 3111.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Guineanlahti on trooppisen Atlantin koillisin osa: se ulottuu Gabonin Cape Lopezista '
      + 'pohjoiseen ja länteen aina Liberian Cape Palmasiin asti. Lahteen laskee monta suurta '
      + 'jokea, muun muassa Niger ja Volta, ja sen rannikkoon kuuluvat Beninlahti sekä '
      + 'Kamerunin edustalla aukeava Bonnynlahti.',
    lahde: 'en-Wikipedia "Gulf of Guinea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sanaga',
    nimi: 'Sanaga',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Djérem ja Lom yhtyvät Sanagaksi?',
      'Miksi joki on Kamerunin sähköntuotannolle tärkeä?',
    ],
    nappi: 'Kamerunin suurin joki',
    // 11 E / 4.2 N — keskijuoksu Edéan yläpuolella; en-Wikipedia "Sanaga River" antaa suulle 9,65 / 3,56
    laudat: {
      maailmankartta: { x: 6200, y: 3071.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sanaga on Kamerunin suurin joki, ja se virtaa maan itä-, keski- ja rannikko-osien '
      + 'halki. Sanagaksi jokea kutsutaan Djéremin ja Lomin yhtymäkohdasta alkaen, mistä matkaa '
      + 'merelle kertyy noin 603 kilometriä — ja kun pisin latvahaara Djérem lasketaan mukaan, '
      + 'koko jokijärjestelmän pituudeksi tulee lähes 1 070 kilometriä.',
    lahde: 'en-Wikipedia "Sanaga River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

