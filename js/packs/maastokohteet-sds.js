/*
 * MAASTOKOHTEET — SDS. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SDS --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SDS.json. Työkalu laskee laudan
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
 * Etelä-Sudanin maastokohteet. Pelin maakoodi on SDS (Natural Earthin ADM0_A3, ks. tools/fokuskartta/aineisto.mjs NE_PAIKKATUNNUS) — ISO-koodi SSD esiintyy vain aineistokäännöksissä. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_SDS = [
  {
    id: 'kinyeti',
    nimi: 'Kinyeti',
    tyyppi: 'vuori',
    kysymykset: [
      'Missä Imatong-vuoret sijaitsevat?',
      'Miksi vuoren metsät ovat lajissaan pohjoisimmat?',
    ],
    korostukset: ['Imatong-vuoristo|Imatong-vuoristossa'],
    nappi: 'Etelä-Sudanin korkein huippu',
    // 32.9089 E / 3.9475 N — en-Wikipedia "Kinyeti"
    laudat: {
      maailmankartta: { x: 6930.3, y: 3079.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etelä-Sudanin korkein huippu on samalla erään metsätyypin viimeinen etuvartio '
      + 'pohjoisessa. Kinyeti kohoaa 3 187 metriin Imatong-vuoristossa lähellä Ugandan rajaa, '
      + 'ja sen alarinteitä peitti tiheä sademetsä — Itä-Afrikan vuoristometsien pohjoisin '
      + 'esiintymä, jonka jälkeen alkaa Sahelin kuivuus. Huippu itse on paljasta kalliota, '
      + 'jonka koloissa kasvaa vuoristoniittyä ja matalaa kanervikkoa. Ensimmäisiä '
      + 'eurooppalaisia kävijöitä oli kasvitieteilijä Thomas Ford Chipp, joka löysi huipun '
      + 'läheltä tieteelle uuden kasvin, Coreopsis chippiin. Vuoren mukaan on nimetty myös '
      + 'uhanalainen kameleontti, Trioceros kinetensis.',
    lahde: 'en-Wikipedia "Kinyeti" (tarkistettu 1.9.2026).',
  },
  {
    id: 'valkoinenniili',
    nimi: 'Valkoinen Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on Sudd?',
      'Miksi Niilin lähdettä etsittiin idästä käsin?',
    ],
    korostukset: ['Sudd|Suddin'],
    nappi: 'Niilin pitempi haara',
    // 31.65 E / 9.53 N — Malakal joen varrella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 6888.3, y: 2892.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Arabian kielen sana sadd tarkoittaa estettä, ja juuri siksi Niilin lähdettä ei '
      + 'löydetty jokea pitkin. Valkoisen Niilin keskijuoksu leviää Etelä-Sudanissa Suddin '
      + 'suoksi — yhdeksi maailman laajimmista kosteikoista, jonka kelluvat kasvilautat '
      + 'tukkivat kulun vuosisadoiksi. Muinaiset egyptiläiset eivät päässeet sen läpi. Vuonna '
      + '61 keisari Neron lähettämä roomalainen sotilasosasto eteni Valkoista Niiliä ylös mutta '
      + 'pysähtyi Suddiin, ja siihen jäi Rooman tunnettu maailma päiväntasaajan suunnassa. '
      + 'Siksi lähteen etsijät joutuivat kulkemaan maitse Itä-Afrikan rannikolta. Joen vaalea '
      + 'väri tulee savesta, jota vesi kantaa mukanaan.',
    lahde: 'en-Wikipedia "White Nile", johdanto-osa, ja en-Wikipedia "Sudd", johdanto-osa '
      + '(tarkistettu 1.9.2026).',
  },
];

