/*
 * MAASTOKOHTEET — PAN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PAN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PAN.json. Työkalu laskee laudan
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
 * Panaman maastokohteet. Faktat en-Wikipediasta 30.8.2026. Panaman kannas on aineistossa vuoret-listalla vain siksi, että työkalu poimisi sen mukaan; valmiissa pakissa sen tyyppi on 'muu' ja symboli 'luonto' Rub al-Khalin mallin mukaan, koska kannas ei ole vuori eikä vesistö. Kiintiön vesistön täyttää Panamanlahti. Maastotekstit ovat nykytietoa kuten KEN-mallissa, joten vuonna 1914 valmistunut Panaman kanava saa esiintyä, vaikka peli sijoittuu vuoteen 1873.
 */
export const MAASTOKOHTEET_PAN = [
  {
    id: 'volcanbaru',
    nimi: 'Volcán Barú',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka kaukaa merta voi ylipäätään nähdä vuorelta?',
      'Miksi Panama on juuri tällä kohtaa niin kapea?',
    ],
    korostukset: ['kerrostulivuori|Kerrostulivuori'],
    nappi: 'Huippu, jolta näkee kahdelle merelle',
    // -82.54234 E / 8.80881 N — en-Wikipedia "Volcán Barú", infolaatikko 8°48′32″N 82°32′32″W
    laudat: {
      maailmankartta: { x: 3081.9, y: 2917.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Volcán Barú on Panaman korkein vuori, 3 475 metriä. Kerrostulivuori kohoaa maan '
      + 'läntisessä Chiriquín maakunnassa noin 35 kilometrin päässä Costa Rican rajasta. '
      + 'Panaman kannas on tällä kohdalla niin kapea ja vuori niin korkea, että kirkkaalla '
      + 'säällä huipulta voi nähdä sekä Tyynenmeren että Karibianmeren yhtä aikaa. Näky on '
      + 'kuitenkin harvinainen: se vaatii poikkeuksellisen selkeän päivän, eikä useimmilta '
      + 'kävijöiltä sellaista tärppää.',
    lahde: 'en-Wikipedia "Volcán Barú", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'panamankannas',
    nimi: 'Panaman kannas',
    // Kannas ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js), kuten
    // ARE:n ja SAU:n Rub al-Khalissa — kortin ylärivi näyttää silloin
    // luokan Luonto eikä väärää otsaketta. Aineistossa kohde on
    // vuoret-listalla vain siksi, että työkalu poimisi sen mukaan.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miten kapea maakaistale voi muuttaa koko maapallon ilmaston?',
      'Miksi kanavan rakentaminen kesti niin kauan?',
    ],
    korostukset: ['maasilta|maasilta', 'Golfvirta|Golfvirta'],
    nappi: 'Kapeikko, joka muutti maapallon',
    // -79.55 E / 9.15 N — kannaksen kapein osa Panaman kanavan linjalla Colónin ja Panama Cityn välissä
    laudat: {
      maailmankartta: { x: 3181.7, y: 2905.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Panaman kannas on kapea maakaistale Karibianmeren ja Tyynenmeren välissä, ja se '
      + 'yhdistää Pohjois- ja Etelä-Amerikan toisiinsa. Kannas syntyi arviolta noin kolme '
      + 'miljoonaa vuotta sitten, joidenkin tutkimusten mukaan jo neljä miljoonaa vuotta '
      + 'sitten. Syntyessään se muutti maailmaa kahdella tavalla. Maasilta päästi eläimet '
      + 'vaeltamaan mantereelta toiselle: opossumit, vyötiäiset ja piikkisiat pohjoiseen, '
      + 'karhut, kissat, koirat ja hevoset etelään. Samalla merivirtojen kierto järjestyi '
      + 'uudelleen, Golfvirta syntyi ja pohjoinen napajäätikkö alkoi muodostua. Kannaksen halki '
      + 'kulkeva Panaman kanava valmistui vuonna 1914.',
    lahde: 'en-Wikipedia "Isthmus of Panama", johdanto-osa ja osiot Formation ja Panama Canal '
      + '(tarkistettu 30.8.2026).',
  },
  {
    id: 'panamanlahti',
    nimi: 'Panamanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mitä kosteikon Ramsar-asema tarkoittaa käytännössä?',
      'Miksi kuivan ja sateisen kauden ero on täällä niin jyrkkä?',
    ],
    korostukset: ['mangrove|mangrovemetsien'],
    nappi: 'Tyynenmeren puoleinen portti',
    // -79 E / 8.4 N — lahden keskiosa Helmisaarten länsipuolella; en-Wikipedia "Gulf of Panama" antaa keskipisteeksi -79 / 8,4
    laudat: {
      maailmankartta: { x: 3200, y: 2930.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Panamanlahti on Tyynenmeren poukama Panaman etelärannikolla: pinta-alaa 2 400 '
      + 'neliökilometriä, leveyttä enimmillään 250 kilometriä ja syvyyttä enintään 220 metriä. '
      + 'Lahti jakautuu kolmeen osaan: pohjoisessa Panaman poukama, lännessä Paritanlahti ja '
      + 'idässä San Miguelin lahti. Idässä on yli kahdensadan saaren Helmisaarten saaristo. '
      + 'Vuodenaikojen ero on jyrkkä: tammi–huhtikuu on äärimmäisen kuivaa ja touko–joulukuu '
      + 'äärimmäisen sateista, mikä ohjaa mangrovemetsien lisääntymistä. Panaman poukama '
      + 'julistettiin kansainvälisesti merkittäväksi kosteikoksi vuonna 2009.',
    lahde: 'en-Wikipedia "Gulf of Panama", johdanto-osa ja osiot Geography ja Ecology (tarkistettu '
      + '30.8.2026).',
  },
];

