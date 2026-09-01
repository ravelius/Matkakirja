/*
 * MAASTOKOHTEET — SLE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SLE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SLE.json. Työkalu laskee laudan
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
 * Sierra Leonen maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 */
export const MAASTOKOHTEET_SLE = [
  {
    id: 'bintumani',
    nimi: 'Bintumani',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on kääpiövirtahepo?',
      'Milloin Loma-vuorten metsästyskielto asetettiin?',
    ],
    korostukset: ['Loma-vuoret|Loma-vuoret'],
    nappi: 'Loma-vuorten korkein',
    // -11.1167 E / 9.225 N — en-Wikipedia "Mount Bintumani"
    laudat: {
      maailmankartta: { x: 5462.8, y: 2903.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sierra Leonen korkeimman vuoren alarinteillä elää eläin, jota harva on nähnyt '
      + 'luonnossa: kääpiövirtahepo. Bintumanin — toiselta nimeltään Loma Mansa — sademetsissä '
      + 'kulkevat sen lisäksi kääpiökrokotiilit, ruostekalapöllöt ja useat kädellislajit. '
      + 'Huippu on 1 945 metriä, ja Loma-vuoret sen ympärillä ovat maan korkein vuorijono. Alue '
      + 'julistettiin metsästyskieltoalueeksi jo 1952, ja suojelualuetta on 33 201 hehtaaria: '
      + 'alempana kasvaa Guinean ja Kongon alankometsää, 1 680 metriin asti ainavihantaa '
      + 'vuoristometsää ja ylätasangolla vuoristoniittyä. BirdLife International on nimennyt '
      + 'alueen kansainvälisesti tärkeäksi lintualueeksi.',
    lahde: 'en-Wikipedia "Mount Bintumani" ja en-Wikipedia "Loma Mountains", johdanto-osa ja osio '
      + '"Environment" (tarkistettu 1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Ketkä ylittivät Atlantin ensimmäisinä?',
      'Miksi vuotta 1492 pidetään käännekohtana?',
    ],
    nappi: 'Länsi-Afrikan portti maailmalle',
    // -13.7 E / 8.1 N — ulappa Freetownin edustalla; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5376.7, y: 2940.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, joka erottaa Amerikan mantereet '
      + 'Afrikasta ja Euraasiasta. Ensimmäisinä sen tiedetään ylittäneen norjalaisten '
      + 'viikinkien, mutta vasta Kolumbuksen retki vuonna 1492 avasi valtameren ylittävän '
      + 'liikenteen ja löytöretkien aikakauden. Sierra Leonen koko rannikko avautuu tälle '
      + 'valtamerelle.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'rokel',
    nimi: 'Rokel',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Freetownin satama on niin suuri?',
      'Mikä on Ramsar-kosteikko?',
    ],
    korostukset: ['Freetown|Freetownin'],
    nappi: 'Sierra Leonen suurin joki',
    // -12.8 E / 8.55 N — en-Wikipedia "Rokel River" — koordinaatti on joen keskijuoksulla
    laudat: {
      maailmankartta: { x: 5406.7, y: 2925.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rokelin suisto avautuu niin leveäksi, että sen eteläranta muodostaa luonnonsataman, '
      + 'jota on sanottu maailman kolmanneksi suurimmaksi — ja juuri siihen on rakennettu '
      + 'Freetownin satama. Joki alkaa Loma-vuorten yhdeksänsadan metrin ylätasangolta, virtaa '
      + 'lounaaseen noin 390 kilometriä ja levenee suistoksi, joka on neljäkymmentä kilometriä '
      + 'pitkä ja leveimmillään kuudentoista kilometrin levyinen. Suisto on ollut vuodesta 1999 '
      + 'kansainvälisesti merkittävä Ramsar-kosteikko: sen mangrovesuot ja mutatasangot '
      + 'kattavat lähes viidenneksen koko maan mangrovemetsästä. Joesta on käytetty myös nimiä '
      + 'Seli ja aiemmin Pamoronkoh.',
    lahde: 'en-Wikipedia "Rokel River", johdanto-osa ja osio "Geography" (tarkistettu 1.9.2026).',
  },
];

