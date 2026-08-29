/*
 * MAASTOKOHTEET — ESP. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ESP --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ESP.json. Työkalu laskee laudan
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
 * Espanjan maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Teide (3 715 m) on Espanjan korkein, mutta se on Kanariansaarilla eikä siten mahdu maan fokuslehden ikkunaan (YLEINEN.saarenEtaisyys 2,5 astetta) — merkki jäisi kuvan ulkopuolelle. Siksi listalla on Mulhacén, jonka artikkeli itse nimeää mannermaisen Espanjan korkeimmaksi.
 */
export const MAASTOKOHTEET_ESP = [
  {
    id: 'mulhacen',
    nimi: 'Mulhacén',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka oli Muley Hacén?',
      'Miksi Sierra Nevadassa on lunta niin etelässä?',
    ],
    korostukset: ['Sierra Nevada|Sierra Nevadan'],
    nappi: 'Iberian niemimaan korkein',
    // -3.3114 E / 37.0533 N — en-Wikipedia "Mulhacén"
    laudat: {
      maailmankartta: { x: 5723, y: 1917.3 },
      europe: { x: 147.6, y: 919.1 },
    },
    teksti: 'Mulhacén kohoaa 3 479 metriin ja on mannermaisen Espanjan sekä koko Iberian niemimaan '
      + 'korkein vuori. Se kuuluu Sierra Nevadan vuoristoon Penibeettisessä järjestelmässä. '
      + 'Nimi tulee Granadan toiseksi viimeiseltä muslimihallitsijalta Abu\'l-Hasan Alilta, jota '
      + 'espanjaksi kutsuttiin Muley Hacéniksi ja joka tarun mukaan haudattiin vuoren huipulle.',
    lahde: 'en-Wikipedia "Mulhacén", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'aneto',
    nimi: 'Aneto',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Maladeta-massiivi on?',
      'Onko Anetolla vielä jäätikköä?',
    ],
    nappi: 'Pyreneiden korkein huippu',
    // 0.6578 E / 42.6322 N — en-Wikipedia "Aneto"
    laudat: {
      maailmankartta: { x: 5855.3, y: 1698.2 },
      europe: { x: 223.8, y: 772.4 },
    },
    teksti: 'Aneto on 3 404 metriä korkea, Pyreneiden ja Aragonian korkein huippu ja Espanjan '
      + 'kolmanneksi korkein vuori. Se sijaitsee Huescan maakunnassa kuusi kilometriä Ranskan '
      + 'rajasta etelään ja muodostaa Maladeta-massiivin eteläisimmän osan.',
    lahde: 'en-Wikipedia "Aneto", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Mitä Espanjan Välimeren rannikolla kalastetaan?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 0.6 E / 38.6 N — ulappa Espanjan itärannikon edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 5853.3, y: 1857.6 },
      europe: { x: 222.7, y: 878.4 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen kautta, '
      + 'joka erottaa Iberian niemimaan Marokosta vain neljäntoista kilometrin levyisenä. '
      + 'Espanja on ainoa maa, jolla on rantaa sekä tällä merellä että Atlantilla.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tajo',
    nimi: 'Tajo',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Toledo rakennettiin joen mutkaan?',
      'Millä nimellä joki tunnetaan Portugalissa?',
    ],
    nappi: 'Iberian pisin joki',
    // -4.02 E / 39.86 N — Toledo, joen mutka kaupungin ympäri — piste valittu keskijuoksulta; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 5699.3, y: 1808.4 },
      europe: { x: 134, y: 845.3 },
    },
    teksti: 'Tajo on Iberian niemimaan pisin joki. Se saa alkunsa Montes Universales -vuoristosta '
      + 'Cuencan ja Teruelin välissä Keski-Espanjassa, virtaa 1 007 kilometriä pääosin länteen '
      + 'ja laskee Atlanttiin Lissabonin kohdalla. Portugalin puolella sen nimi on Tejo.',
    lahde: 'en-Wikipedia "Tagus", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ebro',
    nimi: 'Ebro',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Ebron suisto on niin laaja?',
      'Mitä Ebron laaksossa kasvatetaan?',
    ],
    nappi: 'Espanjan oma pisin joki',
    // -0.88 E / 41.65 N — Zaragoza joen keskijuoksulla; artikkelin koordinaatti 0,863 / 40,72 on suistossa
    laudat: {
      maailmankartta: { x: 5804, y: 1737.6 },
      europe: { x: 194.3, y: 798.2 },
    },
    teksti: 'Ebro nousee Kantabriasta ja virtaa 930 kilometriä lähes koko matkan itäkaakkoon, '
      + 'kunnes laskee Välimereen ja muodostaa suiston Etelä-Kataloniaan. Iberian niemimaalla '
      + 'se on pituudeltaan toinen Tajon jälkeen sekä virtaamaltaan ja valuma-alueeltaan toinen '
      + 'Douron jälkeen. Se on kuitenkin pisin kokonaan Espanjan sisällä virtaava joki: kaksi '
      + 'muuta jatkavat Portugaliin.',
    lahde: 'en-Wikipedia "Ebro", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

