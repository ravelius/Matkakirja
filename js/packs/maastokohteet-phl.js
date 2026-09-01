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
      'Kuka oli Datu Manig?',
      'Mitä nimi Apo Sandawa tarkoittaa?',
    ],
    korostukset: ['Mindanao|Mindanaon'],
    nappi: 'Filippiinien korkein',
    // 125.2708 E / 6.9875 N — en-Wikipedia "Mount Apo"
    laudat: {
      maailmankartta: { x: 10009, y: 2978.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ennen kuin Mindanaon korkeimmalle huipulle sai nousta, oli kysyttävä lupa. Kaksi '
      + 'retkikuntaa oli jo epäonnistunut — José Oyanguren 1852 ja Señor Real 1870 — kun Don '
      + 'Joaquín Rajal kääntyi bagobo-päällikkö Datu Manigin puoleen. Kerrotaan, että päällikkö '
      + 'vaati ihmisuhria vuoren jumalalle Mandaranganille mutta luopui lopulta vaatimuksesta; '
      + 'nousu alkoi 6. lokakuuta 1880 ja onnistui viisi päivää myöhemmin. Vuoren nimi kertoo '
      + 'saman kunnioituksen. Apo on lumad-kansojen kielissä arvonimi, kunnioitettu vanhus, ja '
      + 'täydempi muoto Apo Sandawa tarkoittaa vuoren henkeä — Sandawa-isoisää, jota '
      + 'lähirinteiden manobo- ja kalagan-heimot pitävät esi-isänään. Huippu on 2 954 metriä, '
      + 'sammunut kerrostulivuori, jonka laella on kahdensadan metrin levyinen kraatteri ja '
      + 'pieni järvi.',
    lahde: 'en-Wikipedia "Mount Apo", osiot "Hiking activity", "Etymology and indigenous peoples" '
      + 'ja "Geology" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mayon',
    nimi: 'Mayon',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi tulivuoresta kasvaa täydellinen kartio?',
      'Miten aktiivista tulivuorta vahditaan?',
    ],
    korostukset: ['kartio|kartiostaan'],
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
      'Mikä Mariaanien hauta on?',
    ],
    korostukset: ['Mariaanien hauta|Mariaanien hauta'],
    nappi: 'Maailman suurin meri',
    // 126.6 E / 13.5 N — ulappa Samarin itäpuolella; artikkelin oma keskipiste 130 / 20 jää lehden ikkunan ulkopuolelle
    laudat: {
      maailmankartta: { x: 10053.3, y: 2758.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Maailman suurimman meren pohjassa on maailman syvin kohta. Filippiinienmeri peittää '
      + 'noin viisi miljoonaa neliökilometriä Tyynenmeren länsilaidalla, ja sen pohjan '
      + 'muodostaa oma mannerlaattansa, joka työntyy Filippiinien liikkuvan vyöhykkeen alle. '
      + 'Painumasta syntyy hautoja: Filippiinienhauta ja Mariaanien hauta, jonka pohjalla on '
      + 'koko planeetan syvin piste. Pinnalla meri on yhtä levoton, sillä se on läntisen '
      + 'Tyynenmeren trooppisten myrskyjen synnyinallas — idästä tulevat taifuunit repivät '
      + 'koralliriuttoja, joiden varassa kalastajayhteisöt elävät. Samalla merellä käytiin '
      + '19.—20. kesäkuuta 1944 historian suurin lentotukialusten välinen taistelu.',
    lahde: 'en-Wikipedia "Philippine Sea", johdanto-osa sekä osiot "Geology", "Marine '
      + 'biodiversity" ja "Battle of the Philippine Sea" (tarkistettu 1.9.2026).',
  },
  {
    id: 'cagayan',
    nimi: 'Cagayan',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokilaakso on saaren vilja-aitta?',
      'Mikä taifuuni Vamco oli?',
    ],
    korostukset: ['Luzon|Luzonin'],
    nappi: 'Luzonin suuri virta',
    // 121.6167 E / 18.3667 N — en-Wikipedia "Cagayan River" (koordinaatti on joen suulla)
    laudat: {
      maailmankartta: { x: 9887.2, y: 2592.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Luzonin pohjoisosassa aukeava Cagayanin laakso saa etelävuoriltaan jopa kolme metriä '
      + 'sadetta vuodessa, ja kaikki se vesi valuu yhtä uomaa pitkin. Filippiinien pisin ja '
      + 'vesirikkain joki alkaa Caraballo-vuorilta noin 1 524 metrin korkeudesta ja virtaa 505 '
      + 'kilometriä pohjoiseen Babuyaninsalmeen Aparrin kohdalla. Laakso on kuitenkin laaja ja '
      + 'loiva ja uoma mutkittelee, joten vesi lähtee vuorilta hitaasti ja jää seisomaan '
      + 'tasangolle. Tulvia tulee monsuunikaudella touko—marraskuussa vuodesta toiseen, ja '
      + 'marraskuussa 2020 taifuuni Vamco nosti joen historiansa korkeimpaan lukemaan — myös '
      + 'Magatin padon tulvaluukut jouduttiin avaamaan. Siksi joen varrella on nykyään '
      + 'tulvavaroitusasemien ketju.',
    lahde: 'en-Wikipedia "Cagayan River", osiot "Topography" ja "Flooding" (tarkistettu 1.9.2026).',
  },
];

