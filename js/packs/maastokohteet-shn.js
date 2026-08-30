/*
 * MAASTOKOHTEET — SHN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SHN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SHN.json. Työkalu laskee laudan
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
 * Saint Helenan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Saari on hyvin pieni, joten sen fokuslehden rajaus on vain noin 45 × 45 laudan yksikköä; molemmat kohteet on siksi tarkistettu erikseen mahtumaan ikkunaan, ja Atlantin merkki on viety saaren lounaispuolen ulapalle, jotta se ei osu Diana's Peakin merkin päälle.
 */
export const MAASTOKOHTEET_SHN = [
  {
    id: 'dianaspeak',
    nimi: 'Diana\'s Peak',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi kaukaisilla saarilla on niin paljon kotoperäisiä lajeja?',
      'Mistä muusta Saint Helena tunnetaan?',
    ],
    korostukset: ['kotoperäinen|kotoperäisiä'],
    nappi: 'Saint Helenan korkein kohta',
    // -5.6914 E / -15.9597 N — en-Wikipedia "Diana's Peak", infolaatikko 15°57′35″S 5°41′29″W
    laudat: {
      maailmankartta: { x: 5643.6, y: 3747.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Diana\'s Peak on Saint Helenan korkein kohta, 818 metriä. Vulkaanista alkuperää oleva '
      + 'huippu sijaitsee kolmen piirikunnan — Sandy Bayn, Levelwoodin ja Longwoodin — rajalla, '
      + 'ja sen naapureina kohoavat Mount Actaeon 814 metriin ja Cuckold\'s Point 815 metriin. '
      + 'Vuori lähiympäristöineen julistettiin maaliskuussa 1996 saaren ensimmäiseksi '
      + 'kansallispuistoksi; pinta-alaa on 81 hehtaaria. Puistossa kasvaa saarelle kotoperäisiä '
      + 'uhanalaisia lajeja, muun muassa puusaniaisia, kaalipuita ja whitewood-puuta. Kahden '
      + 'matalamman huipun laella kasvaa suuria norfolkinmäntyjä, ja pohjoisrinteellä on '
      + 'kotoperäisten lajien taimitarha.',
    lahde: 'en-Wikipedia "Diana\'s Peak", johdanto-osa ja osio National park (tarkistettu '
      + '30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miten keskelle valtamerta voi syntyä vuorijono?',
      'Miksi Saint Helena oli purjelaivoille niin tärkeä?',
    ],
    korostukset: ['Keski-Atlantin selänne|Keski-Atlantin selänne'],
    nappi: 'Eteläisen Atlantin ulappa',
    // -6.05 E / -16.05 N — ulappa saaren lounaispuolella, lehden rajauksen sisällä mutta erillään huipun merkistä; en-Wikipedia "Atlantic Ocean" antaa keskipisteeksi -30 / 0
    laudat: {
      maailmankartta: { x: 5631.7, y: 3751 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman valtameristä toiseksi suurin: pinta-alaa noin 85 133 000 '
      + 'neliökilometriä, keskisyvyyttä 3 646 metriä ja syvimmillään Puerto Ricon haudassa 8 '
      + '376 metriä. Saint Helena on eteläisellä Atlantilla yksinäinen kalliosaari keskellä '
      + 'ulappaa, kaukana kaikista mantereista. Meren pohjaa halkoo Keski-Atlantin selänne, '
      + 'vedenalainen vuorijono, joka kohoaa kahdesta kolmeen kilometriä ympäröivästä '
      + 'merenpohjasta ja ulottuu pohjoisnavan tuntumasta eteläiselle Bouvet\'nsaarelle asti. '
      + 'Selänne jakaa koko valtameren altaan kahtia.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa ja osio Bathymetry (tarkistettu '
      + '30.8.2026).',
  },
];

