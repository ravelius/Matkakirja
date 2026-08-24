/*
 * HEROKUVATYÖLISTA, VANCOUVER — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Vancouverin kolme herokuvaa generoitiin kierroksella
 * 20 (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md). Kohteet ovat samat kuin kierroksella
 * 20: Lions Gate -silta, Science Worldin pallo ja Marine Building.
 * Yksikään ei ole Vancouverin kaupunkilehden kansikuvana (Gastown,
 * Granville Islandin ruokatori, Canada Place) eikä avauskuvana
 * (Stanley Parkin panoraama, False Creek, niemen ilmakuva).
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs vancouver 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO: omistajan päätös 24.8.2026 on, että
 * alkuperäinen korkeus ja etäisyys on visuaalisesti paras ja että
 * kuvan pitää olla dronemainen, jotta kaupunki hahmottuu.
 *
 * MITTAKAAVA. Vakioprompti sanoo "the landmark towers large and
 * dominant", ja malli liioittelee sen takia kohteen kokoa. Jokaisen
 * kohteen kuvaukseen on siksi kirjoitettu auki sen todellinen suhde
 * ympäristöönsä: silta on pitkä ja hoikka eikä massiivinen, Science
 * Worldin pallo on yksittäinen matala kupoli asuintornien juurella,
 * ja Marine Building on nykyään selvästi naapureitaan MATALAMPI —
 * juuri se on sen tarina.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   Lions Gate -silta  Category:Lions Gate Bridge          47  portti aukeaa
 *   Science World      Category:Science World (Vancouver)  48  portti aukeaa
 *   Marine Building    Category:Marine Building            26  portti aukeaa
 * Kaikki kolme tunnistuivat en-Wikipedian otsikosta Wikidatan kautta,
 * mutta VARMENNETTU KATEGORIA ANNETAAN SILTI KENTÄSSÄ `kategoria`.
 * Syy näkyi kuivaharjoituksessa: Wikidatan rajapinta vastasi kesken
 * erän 429:llä (liikaa pyyntöjä), jolloin tunnistus putosi
 * tekstihakuun ja generointiportti meni kiinni täysin kelvollisesta
 * kohteesta. Kun kategoria on kirjattu tähän, yksi verkkokutsu jää
 * pois eikä kiireinen Wikidata voi kaataa ajoa. `wiki` jätetään
 * näkyviin, koska se dokumentoi, mitä reittiä kategoria löytyi.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (Lions Gate Bridge,
 * Science World (Vancouver), Marine Building).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- LIONS GATE -SILTA — First Narrows, aamu. */
  {
    id: 'vancouver-aamu',
    tiedosto: 'hero-vancouver-aamu.png',
    kaupunki: 'Vancouver',
    tarkkaKohde: true,
    wiki: 'Lions Gate Bridge',
    kategoria: 'Category:Lions Gate Bridge',
    viitehaku: 'Lions Gate Bridge',
    /*
     * Ei `viitesuosi`-sanoja. Kategoriassa on myös vanhoja
     * laivakuvia (1939, 1947), joissa silta on vain taustalla, ja
     * suositus 'lions gate bridge' nosti juuri ne kärkeen — suositus
     * on järjestyksen ENSIMMÄINEN avain ja voittaa nykykuvasäännön.
     * Ilman suositusta valinta menee tuoreuden mukaan.
     */
    viitesuosi: [],
    prompti: prompti(
      'the Lions Gate Bridge across the First Narrows at the entrance'
      + ' to Vancouver harbour in early morning light',
      'a slender green suspension bridge, two open steel lattice towers'
      + ' rising 111 metres above the water, the main cables sweeping'
      + ' down in a long curve to the deck and up again, and a NARROW'
      + ' roadway of only three lanes with the first morning traffic on'
      + ' it; THE BRIDGE IS LONG AND THIN RATHER THAN MASSIVE — the'
      + ' deck is a fine line above the water, the towers are open'
      + ' latticework and not solid piers, and the forested slopes on'
      + ' both shores rise higher than the towers do; low early morning'
      + ' sun from the east catches the eastern faces of the towers and'
      + ' the cable strands while mist still lies on the water below',
      'the dark green forest of Stanley Park running down to the shore'
      + ' on the near side with the causeway cutting through it, the'
      + ' camera standing on the park side so that the crowns of'
      + ' Douglas firs and cedars and a stretch of the seawall are in'
      + ' the foreground, a bulk carrier and a small tug moving through'
      + ' the narrows below, walkers as small figures on the seawall'
      + ' path, the houses and marinas of the north shore, and the'
      + ' snow-streaked Coast Mountains rising steeply behind them into'
      + ' the morning haze',
      VAKIO,
    ),
    selite: 'Lions Gate -silta avattiin 1938 ja on virallisesti nimeltään '
      + 'First Narrows Bridge; sen pylonit ovat 111 metriä korkeat ja '
      + 'päähänjänne 473 metriä, ja kolmesta kaistasta keskimmäisen '
      + 'suunta vaihtuu liikenteen mukaan.',
  },

  /* ---- SCIENCE WORLD — False Creekin itäpää, keskipäivä. */
  {
    id: 'vancouver-keskipaiva',
    tiedosto: 'hero-vancouver-keskipaiva.png',
    kaupunki: 'Vancouver',
    tarkkaKohde: true,
    wiki: 'Science World (Vancouver)',
    kategoria: 'Category:Science World (Vancouver)',
    viitehaku: 'Science World Vancouver',
    viitesuosi: ['science world'],
    prompti: prompti(
      'the geodesic dome of Science World at the eastern end of False'
      + ' Creek in Vancouver at midday',
      'a single silver geodesic sphere of triangular steel framing and'
      + ' pale panels, its curve sitting on a low dark base of glass and'
      + ' concrete with a broad entrance canopy at the front, the'
      + ' triangles catching the light at different angles so that the'
      + ' sphere reads as a faceted ball rather than a smooth one; THE'
      + ' DOME IS A LOW, SQUAT SPHERE ONLY A FEW STOREYS HIGH — the'
      + ' glass apartment towers standing around the head of the inlet'
      + ' behind it are many times taller, and the dome sits at the'
      + ' waterline like a bubble at their feet; hard midday sun'
      + ' straight overhead makes the upper panels flare and the'
      + ' underside of the sphere fall into even shade',
      'the flat blue-green water of the inlet directly in front with a'
      + ' small ferry and paddleboarders on it, the seawall path curving'
      + ' around the shore with cyclists and families as small figures,'
      + ' the camera standing on the seawall side so that the railing,'
      + ' a bench and a row of young maples are in the foreground, the'
      + ' ranks of glass residential towers along both banks of the'
      + ' creek, and the downtown skyline and the blue Coast Mountains'
      + ' beyond them',
      VAKIO,
    ),
    selite: 'Science Worldin geodeettinen kupoli rakennettiin Expo Centreksi '
      + 'vuoden 1986 maailmannäyttelyyn, ja tiedekeskus avattiin siinä 6. '
      + 'toukokuuta 1989 False Creekin itäpäässä.',
  },

  /* ---- MARINE BUILDING — Burrard Street, ilta. */
  {
    id: 'vancouver-ilta',
    tiedosto: 'hero-vancouver-ilta.png',
    kaupunki: 'Vancouver',
    tarkkaKohde: true,
    wiki: 'Marine Building',
    kategoria: 'Category:Marine Building',
    viitehaku: 'Marine Building',
    viitesuosi: ['marine building'],
    prompti: prompti(
      'the Marine Building on Burrard Street in downtown Vancouver at'
      + ' sunset',
      'an art deco office tower of warm brown brick and terracotta that'
      + ' steps inward in setbacks as it rises to a crown of pointed'
      + ' vertical fins, its lower storeys covered in moulded'
      + ' marine ornament — seahorses, ships, scallops and waves — and'
      + ' a tall pointed entrance arch of green and gold at street'
      + ' level; THE TOWER IS ONLY ABOUT TWENTY STOREYS HIGH AND IS NOW'
      + ' CLEARLY SHORTER THAN THE PLAIN GLASS SKYSCRAPERS PRESSING'
      + ' AROUND IT ON EVERY SIDE — it is an ornate older building'
      + ' standing among far taller modern neighbours, not the tallest'
      + ' thing in the picture; warm low sunset light from the west'
      + ' slides along the brickwork so that every moulding stands out'
      + ' and the glass towers behind reflect the orange sky',
      'the busy downtown corner below with crosswalks, buses and'
      + ' evening commuters as small figures, the camera standing on the'
      + ' street side so that a traffic light, a street tree and the'
      + ' awnings of the opposite corner are in the foreground, the'
      + ' straight run of Burrard Street dropping toward the harbour'
      + ' with its lights coming on, the sails of Canada Place and the'
      + ' cranes of the port beyond, and the dark north shore mountains'
      + ' closing the view',
      VAKIO,
    ),
    selite: 'Marine Building valmistui Burrard Streetille 1930 ja oli '
      + 'silloin Vancouverin korkein rakennus; se on saanut nimensä '
      + 'runsaista meriaiheisista koristeistaan, ja se luetaan maailman '
      + 'parhaiden art deco -rakennusten joukkoon.',
  },
];
