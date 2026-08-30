/*
 * MAASTOKOHTEET — USA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs USA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/USA.json. Työkalu laskee laudan
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
 * Yhdysvaltain maastokohteet. Faktat en-Wikipediasta 30.8.2026. HUOM: Denali (6 190 m) on Pohjois-Amerikan korkein huippu, mutta se jää Alaskassa maan fokuslehden rajauksen ulkopuolelle (maailmankartta 799,8/769, ikkuna alkaa vasta x 1328,97) — sama tilanne kuin Espanjan Teidellä. Tilalla on Mount Whitney, jonka en-Wikipedian artikkeli itse nimeää mantereisen Yhdysvaltain korkeimmaksi kohdaksi. Kalliovuorten merkki on ladottu vuoriston korkeimman huipun Mount Elbertin koordinaatteihin.
 */
export const MAASTOKOHTEET_USA = [
  {
    id: 'mountwhitney',
    nimi: 'Mount Whitney',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuori nimettiin osavaltiongeologin mukaan?',
      'Miksi Sierra Nevada on niin jyrkkä juuri idän puolelta?',
    ],
    korostukset: ['Sierra Nevada|Sierra Nevadan'],
    nappi: 'Mantereisen Yhdysvaltain korkein kohta',
    // -118.292 E / 36.5786 N — en-Wikipedia "Mount Whitney", infolaatikko 36°34′43″N 118°17′31″W
    laudat: {
      maailmankartta: { x: 1890.3, y: 1935.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Whitney kohoaa Sierra Nevadan harjalla Kaliforniassa ja on mantereisen '
      + 'Yhdysvaltain korkein kohta: 14 505 jalkaa eli 4 421 metriä. Kalifornian geologinen '
      + 'tutkimuslaitos nimesi huipun heinäkuussa 1864 osavaltiongeologi Josiah Whitneyn '
      + 'mukaan, joka oli tutkimuksen rahoittaja. Ensimmäisinä laella kävivät Charles Begole, '
      + 'Albert Johnson ja John Lucas 18. elokuuta 1873. Alaskan Denali on 6 190 metrillään '
      + 'koko Pohjois-Amerikan korkein, mutta Kalliovuorten ja Tyynenmeren välisessä '
      + 'Yhdysvalloissa Whitneytä korkeampaa ei ole.',
    lahde: 'en-Wikipedia "Mount Whitney", johdanto-osa ja osio History, sekä "Denali", '
      + 'johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'kalliovuoret',
    nimi: 'Kalliovuoret',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on mannerten vedenjakaja?',
      'Miten vuoristo syntyy laattojen liikkeestä?',
    ],
    korostukset: ['mannerten vedenjakaja|mannerten vedenjakaja', 'laattatektoniikka|tektoniset laatat'],
    nappi: 'Mannerten vedenjakaja',
    // -106.4453 E / 39.1178 N — vuoriston korkein huippu Mount Elbert Coloradossa; en-Wikipedia "Rocky Mountains" ja "Mount Elbert"
    laudat: {
      maailmankartta: { x: 2285.2, y: 1837.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kalliovuoret jatkuvat Läntisen Kanadan pohjoisosista New Mexicoon asti, suoraa linjaa '
      + 'noin 4 800 kilometriä eli 3 000 mailia. Vuoristo kohosi 55–80 miljoonaa vuotta sitten '
      + 'Laramide-poimutuksessa, kun tektoniset laatat alkoivat liukua Pohjois-Amerikan laatan '
      + 'alle ja työnsivät leveän vuorivyöhykkeen koko maanosan länsilaidalle. Korkein huippu '
      + 'on Coloradon Mount Elbert, 4 400 metriä. Vuoriston harjaa seuraa Amerikkojen mannerten '
      + 'vedenjakaja: sen toiselta puolelta vedet virtaavat Atlantille, toiselta '
      + 'Tyynellemerelle.',
    lahde: 'en-Wikipedia "Rocky Mountains", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'mississippi',
    nimi: 'Mississippi',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen mittaustapa muuttaa sen pituutta?',
      'Mitä höyrylaivat merkitsivät Mississippille?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Pohjois-Amerikan suurin joki',
    // -90.19 E / 38.63 N — joen keskijuoksu St. Louisin kohdalla, hieman Missourin yhtymäkohdan alapuolella
    laudat: {
      maailmankartta: { x: 2827, y: 1856.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mississippi virtaa Minnesotan Itascajärvestä Meksikonlahteen, 3 766 kilometriä eli 2 '
      + '340 mailia. Sen valuma-alue kattaa 2 980 000 neliökilometriä ja ulottuu kokonaan tai '
      + 'osittain 32 osavaltioon ja kahteen Kanadan provinssiin. Jos pituus mitataan Missourin '
      + 'latvoilta Montanasta asti, jokijärjestelmä on 5 971 kilometriä ja maailman neljänneksi '
      + 'pisin. Virtaamaltaan Mississippi on maailman kymmenenneksi suurin ja Pohjois-Amerikan '
      + 'suurin joki: vettä kulkee keskimäärin 6 000–20 000 kuutiometriä sekunnissa.',
    lahde: 'en-Wikipedia "Mississippi River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

