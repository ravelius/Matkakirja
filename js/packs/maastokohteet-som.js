/*
 * MAASTOKOHTEET — SOM. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SOM --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SOM.json. Työkalu laskee laudan
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
 * Somalian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Neljä kohdetta, koska maalla on kaksi aivan erilaista merenrantaa: Adeninlahti pohjoisessa ja avoin Intian valtameri idässä.
 */
export const MAASTOKOHTEET_SOM = [
  {
    id: 'shimbiris',
    nimi: 'Shimbiris',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren korkeudesta on kaksi lukua?',
      'Millaista metsää Cal Madowilla kasvaa?',
    ],
    korostukset: ['Cal Madow|Cal Madowin'],
    nappi: 'Somalian korkein huippu',
    // 47.2461 E / 10.7347 N — en-Wikipedia "Mount Shimbiris"
    laudat: {
      maailmankartta: { x: 7408.2, y: 2852.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Somalian korkein huippu on todennäköisesti korkeampi kuin kirjoissa lukee. Shimbirisin '
      + 'usein toistettu lukema on 2 416 metriä, mutta avaruussukkulan tutkakartoitus viittaa '
      + 'siihen, että oikea korkeus on 2 460 metriä. Vuori nousee jyrkästi Adeninlahdelle päin '
      + 'viettävien jyrkänteiden yläpuolelle Erigavon lähistöllä, ja Cal Madowin vuoristo sen '
      + 'ympärillä juoksee rannikon suuntaisesti terävine harjanteineen ja syvine laaksoineen. '
      + 'Korkeus tekee ilmastostakin toisen: sadetta tulee enemmän kuin alavassa Somaliassa, ja '
      + 'rinteillä kasvaa katajametsää sekä kotoperäisiä kasvilajeja, joita ei tavata muualta.',
    lahde: 'en-Wikipedia "Mount Shimbiris", johdanto-osa sekä osiot "Geography", "Climate" ja '
      + '"Flora and fauna" (tarkistettu 1.9.2026).',
  },
  {
    id: 'adeninlahti',
    nimi: 'Adeninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Adeninlahti levenee vuosi vuodelta?',
      'Mikä oli antiikin Erythrean meri?',
    ],
    nappi: 'Portti Punaisellemerelle',
    // 47.6 E / 11.6 N — ulappa Somalian pohjoisrannikon edustalla; artikkelin oma keskipiste on 48 / 12
    laudat: {
      maailmankartta: { x: 7420, y: 2823.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Adeninlahti on Intian valtameren syvä lahti Jemenin ja Somalian rannikoiden välissä, '
      + 'ja luoteessa se yhtyy Punaiseenmereen Bab el Mandebin salmen kautta. Lahden keskellä '
      + 'kulkee Adenin selänne, jonka tuliperäinen liike leventää lahtea noin puolitoista '
      + 'senttimetriä vuodessa. Antiikin kreikkalaiset pitivät lahtea yhtenä Erythrean meren '
      + 'tärkeimmistä osista.',
    lahde: 'en-Wikipedia "Gulf of Aden", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuren osan maapallon vesistä valtameri kattaa?',
      'Mitkä reunameret siihen kuuluvat?',
    ],
    nappi: 'Maailman kolmanneksi suurin valtameri',
    // 46.5 E / 1.2 N — ulappa Mogadishun kaakkoispuolella; artikkelin oma keskipiste on 80 / -20
    laudat: {
      maailmankartta: { x: 7383.3, y: 3171.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri kattaa yli 70 miljoonaa neliökilometriä eli noin viidenneksen '
      + 'maapallon vesipinnasta, ja sitä rajaavat pohjoisessa Aasia, lännessä Afrikka ja idässä '
      + 'Australia. Siihen kuuluu suuria reunameriä kuten Arabianmeri ja Bengalinlahti. '
      + 'Somalian koko itäranta avautuu tälle valtamerelle.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'jubba',
    nimi: 'Jubba',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä oli Ajuranin valtakunta?',
      'Mikä on hydraulinen imperiumi?',
    ],
    korostukset: ['Ajuran|Ajuranin'],
    nappi: 'Joki jolta Jubaland sai nimensä',
    // 42.6307 E / -0.2495 N — en-Wikipedia "Jubba River" — koordinaatti on suulla Goobweynin kohdalla
    laudat: {
      maailmankartta: { x: 7254.4, y: 3219.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jubban varrella nousi keskiajalla Afrikan ainoa hydraulinen imperiumi. Ajuranin '
      + 'valtakunta otti 1200-luvulta alkaen haltuunsa sekä Jubban että Shebellen vedet, '
      + 'kasteli niillä viljelyksensä ja rakensi kalkkikivestä kaivoja ja vesisäiliöitä, joita '
      + 'käytetään yhä. Se kehitti myös oman maatalous- ja verotusjärjestelmänsä, joka säilyi '
      + 'Afrikan sarvessa vuosisatoja valtakunnan jälkeenkin. Joki itse alkaa Etiopian rajalta, '
      + 'missä Dawa ja Ganale Dorya yhtyvät, ja virtaa suoraan etelään Somalimereen Goobweynin '
      + 'kohdalla. Sen valuma-alue on 749 000 neliökilometriä, ja koko maakunta — Jubaland, '
      + 'entinen Trans-Juba — on nimetty joen mukaan.',
    lahde: 'en-Wikipedia "Jubba River", johdanto-osa ja osio "Ajuran Empire" (tarkistettu '
      + '1.9.2026).',
  },
];

