/*
 * MAASTOKOHTEET — MAR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MAR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MAR.json. Työkalu laskee laudan
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
 * Marokon maastokohteet. Faktat en-Wikipediasta 30.8.2026. Toubkalille ei ole vakiintunutta suomennosta (fi-Wikipediassa ei artikkelia); joen asu fi-Wikipedian mukaan Drâa.
 */
export const MAASTOKOHTEET_MAR = [
  {
    id: 'toubkal',
    nimi: 'Toubkal',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on ultrahuippu?',
      'Näkyykö Toubkal Marrakechiin asti?',
    ],
    korostukset: ['Atlasvuoret|Atlasvuorten'],
    nappi: 'Pohjois-Afrikan korkein',
    // -7.9151 E / 31.0596 N — en-Wikipedia "Toubkal"
    laudat: {
      maailmankartta: { x: 5569.5, y: 2142.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Toubkal eli Jbel Toubkal on 4 167 metrillään Marokon, Atlasvuorten, Pohjois-Afrikan ja '
      + 'koko arabimaailman korkein huippu. Se kohoaa Toubkalin kansallispuistossa 63 '
      + 'kilometriä Marrakechista etelään ja näkyy kaupunkiin asti. Toubkal on niin sanottu '
      + 'ultrahuippu: yli 2 000 kilometrin säteellä ei ole yhtään sitä korkeampaa vuorta.',
    lahde: 'en-Wikipedia "Toubkal", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Ketkä ylittivät Atlantin ensimmäisinä?',
      'Miksi vuotta 1492 pidetään käännekohtana?',
    ],
    nappi: 'Löytöretkien valtameri',
    // -8.5 E / 33.2 N — ulappa Casablancan edustalla; en-Wikipedia "Atlantic Ocean" antaa koko valtameren keskipisteeksi -25 / 0
    laudat: {
      maailmankartta: { x: 5550, y: 2062.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, ja Marokon länsirannikko avautuu '
      + 'suoraan sen ulapalle. Ensimmäisinä valtameren tiedetään ylittäneen viikinkien, mutta '
      + 'seurauksiltaan suurin oli Kristoffer Kolumbuksen retki vuonna 1492: se avasi '
      + 'eurooppalaisten löytöretkien ja siirtomaavalloitusten aikakauden. Löytöretkien aikaan '
      + 'Atlantin ajateltiin erottavan Amerikan \'uuden maailman\' vanhasta.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'draa',
    nimi: 'Drâa',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joen loppuosa on enimmäkseen kuiva?',
      'Mitä Fezouatan kivettymät ovat?',
    ],
    korostukset: ['Korkea Atlas|Korkealta Atlakselta'],
    nappi: 'Joki, joka katoaa hiekkaan',
    // -5.8 E / 30.3 N — keskijuoksu Zagoran seudulla; en-Wikipedia "Draa River" antaa koordinaatiksi alajuoksun -11,12 / 28,68
    laudat: {
      maailmankartta: { x: 5640, y: 2169.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Drâa on Marokon pisin joki: 1 100 kilometriä. Se syntyy Dadèsin ja Iminin jokien '
      + 'yhtyessä, virtaa Korkealta Atlakselta ensin kaakkoon ja kääntyy sitten länteen kohti '
      + 'Atlanttia — mutta Tagouniten jälkeinen osuus on suurimman osan vuotta kuivillaan. Joen '
      + 'laaksosta on löydetty Fezouatan kivettymät, poikkeuksellisen hyvin säilynyt ikkuna '
      + 'ordovikikauden alun muinaiseen meriluontoon.',
    lahde: 'en-Wikipedia "Draa River", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

