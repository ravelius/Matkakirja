/*
 * MAASTOKOHTEET — PHL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PHL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PHL.json. Työkalu laskee laudan
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
 * Filippiinien maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mayonin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 2 462 m). Filippiinienmeren merkki on ulapalla Samarin itäpuolella, jotta se pysyy lehden ikkunassa — artikkelin oma keskipiste 130 / 20 jää rajauksen ulkopuolelle.
 */
export const MAASTOKOHTEET_PHL = [
  {
    id: 'apo',
    nimi: 'Mount Apo',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on solfataarinen tulivuori?',
      'Näkyykö huippu Davaon kaupunkiin?',
    ],
    korostukset: ['Mindanao|Mindanaon'],
    nappi: 'Filippiinien korkein',
    // 125.2708 E / 6.9875 N — en-Wikipedia "Mount Apo"
    laudat: {
      maailmankartta: { x: 10009, y: 2978.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Apo on Filippiinien korkein vuori, 2 954 metriä merenpinnasta. Se on suuri, '
      + 'uinuva kerrostulivuori Mindanaon saarella, ja sen rikkihöyryt purkautuvat yhä maan '
      + 'raoista. Huippu näkyy 45 kilometrin päähän Davaon kaupunkiin, ja vuori on '
      + 'luonnonpuiston sydän.',
    lahde: 'en-Wikipedia "Mount Apo", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'mayon',
    nimi: 'Mayon',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi tulivuoresta kasvaa täydellinen kartio?',
      'Miten aktiivista tulivuorta vahditaan?',
    ],
    korostukset: ['kartio|kartionsa'],
    nappi: 'Täydellinen kartio',
    // 123.685 E / 13.2567 N — en-Wikipedia "Mayon"
    laudat: {
      maailmankartta: { x: 9956.2, y: 2767.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mayon on aktiivinen kerrostulivuori Albayn maakunnassa Luzonin saaren '
      + 'kaakkoiskärjessä, ja se on kuuluisa lähes täydellisen symmetrisestä kartiostaan. Se on '
      + 'Filippiinien aktiivisin tulivuori, jota tarkkaillaan jatkuvasti parinkymmenen '
      + 'kilometrin päästä. Vuori ympäristöineen julistettiin maan ensimmäiseksi '
      + 'kansallispuistoksi jo 1938, ja filippiiniläisessä mytologiassa se on pyhä.',
    lahde: 'en-Wikipedia "Mayon", johdanto-osa ja tietolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'filippiinienmeri',
    nimi: 'Filippiinienmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on maailman suurin meri?',
      'Mikä on Tyynenmeren tulirengas?',
    ],
    nappi: 'Maailman suurin meri',
    // 126.6 E / 13.5 N — ulappa Samarin itäpuolella; artikkelin oma keskipiste 130 / 20 jää lehden ikkunan ulkopuolelle
    laudat: {
      maailmankartta: { x: 10053.3, y: 2758.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Filippiinienmeri on Tyynenmeren reunameri saariston itäpuolella — ja pinta-alaltaan '
      + 'noin viiden miljoonan neliökilometrin laajuisena maailman suurin meri. Sen pohjana on '
      + 'kokonainen oma mannerlaatta, Filippiinienmeren laatta. Meren rajat piirtävät '
      + 'saariketjut: lännessä Taiwan ja Filippiinit, pohjoisessa Japani, idässä Mariaanit.',
    lahde: 'en-Wikipedia "Philippine Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'cagayan',
    nimi: 'Cagayan',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokilaakso on saaren vilja-aitta?',
      'Kumpi ratkaisee joen suuruuden: pituus vai virtaama?',
    ],
    korostukset: ['Luzon|Luzonin'],
    nappi: 'Luzonin suuri virta',
    // 121.6167 E / 18.3667 N — en-Wikipedia "Cagayan River" (koordinaatti on joen suulla)
    laudat: {
      maailmankartta: { x: 9887.2, y: 2592.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Cagayan eli Río Grande de Cagayán on Filippiinien pisin ja vesimäärältään suurin joki: '
      + '505 kilometriä pitkä, ja sen valuma-alue kattaa lähes 28 000 neliökilometriä. Se '
      + 'virtaa pohjoista kohti Luzonin saaren koillisosan halki Cagayanin laaksossa, viiden '
      + 'maakunnan läpi.',
    lahde: 'en-Wikipedia "Cagayan River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

