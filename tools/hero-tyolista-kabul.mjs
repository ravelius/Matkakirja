/*
 * HEROKUVATYÖLISTA, KABUL — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Kabulin kolme herokuvaa generoitiin kierroksella 20
 * (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md).
 *
 * ------------------------------------------------------------------
 * HERKKYYS (perustuslain pilari 3) — TÄMÄN LISTAN TÄRKEIN SÄÄNTÖ
 * ------------------------------------------------------------------
 * Kabul kuvataan ARVOKKAANA NYKYAIKAISENA KAUPUNKINA. Ei sotakuvastoa,
 * ei raunioestetiikkaa, ei aseita eikä sotilaita; ihmiset näkyvät vain
 * kaukaisina hahmoina tavallisessa arjessaan. Sama sääntö koskee
 * VIITEKUVIA, ei vain promptia: viite ohjaa mallia vahvemmin kuin
 * sanat, joten kohde vaihdetaan, jos sen kategoria on täynnä
 * sotavaurioita. Rakennukset ovat kohteina rakennuksina — eivät
 * hartautena eivätkä politiikkana.
 *
 * ------------------------------------------------------------------
 * KAKSI KOLMESTA KOHTEESTA VAIHDETTU
 * ------------------------------------------------------------------
 * 1. TIMUR SHAHIN MAUSOLEUMI (kierroksen 20 aamukuva) POIS: kohteella
 *    EI OLE Commons-kategoriaa. Wikidata ei anna otsikoille "Tomb of
 *    Timur Shah" tai "Timur Shah Mausoleum" mitään, ja arvattavat
 *    Category:Timur Shah Mausoleum ja Category:Mausoleum of Timur Shah
 *    ovat tyhjiä; Commonsin kategoriahaku "Timur Shah" löytää vain
 *    henkilökategorian Category:Timur Shah Durrani, jossa ei ole
 *    rakennuksen valokuvia. Generointiportti pysäyttäisi kuvan.
 *    Tilalle: Sakhin pyhäkkö eli Kabulin sininen moskeija Karte
 *    Sakhissa (Category:Kart-e Sakhi Mosque, 7 kelvollista kuvaa,
 *    kaikki tuoreita ja rauhanomaisia).
 *
 * 2. DARUL AMANIN PALATSI (kierroksen 20 keskipäiväkuva) POIS
 *    HERKKYYSSYYSTÄ: kategoriassa on 33 kelvollista kuvaa, mutta
 *    valtaosa niistä esittää palatsia SOTAVAURIOISENA RAUNIONA
 *    (2002–2015), ja peruskorjauksen jälkeisiä kuvia on vain kolme yli
 *    1000 px:n kuvaa. Kuivaharjoituksessa kaksi neljästä valitusta
 *    viitteestä oli raunio silloinkin, kun `viitesuosi` yritti nostaa
 *    kunnostetut. Se on täsmälleen se raunioestetiikka, joka on
 *    kielletty. Tilalle: Kabulin yliopisto (Category:Kabul University,
 *    12 kelvollista kuvaa) — nykyaikainen, arkinen ja arvokas aihe.
 *
 * 3. ABDUL RAHMANIN MOSKEIJA (iltakuva) SÄILYI: sen kategorian neljä
 *    parasta viitettä ovat kaikki rauhanomaisia nykyvalokuvia
 *    moskeijasta (2007, 2010, 2013, 2018).
 *
 * MYÖS HYLÄTTY: Category:Id Gah Mosque (Kabul), 5 kelvollista kuvaa,
 * mutta neljäs valituista viitteistä oli ilmavoimien lentokonekuva
 * (AfghanAirForce1.jpg) — juuri sitä sotakuvastoa, jota tässä
 * vältetään.
 *
 * Yksikään kohde ei ole Kabulin kaupunkilehden kansikuvana (kolme
 * historiallista näkymää) eikä avauskuvana (Baburin puutarha,
 * joenvarsi, rinnepanoraama).
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs kabul 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO (omistajan päätös 24.8.2026:
 * alkuperäinen korkeus ja etäisyys, dronemainen näkymä).
 *
 * MITTAKAAVA. Vakioprompti houkuttelee liioittelemaan kohteen kokoa,
 * joten todellinen suhde ympäristöön on kirjoitettu auki: pyhäkkö on
 * matala laattapintainen piha vuoren juurella, yliopiston rakennukset
 * ovat kaksi- ja kolmikerroksisia puiden keskellä, ja moskeija on
 * kolmikerroksinen mutta ympärillään samankorkuisia liiketaloja.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   Sakhin pyhäkkö        Category:Kart-e Sakhi Mosque   7  portti aukeaa
 *   Kabulin yliopisto     Category:Kabul University     12  portti aukeaa
 *   Abdul Rahmanin mosk.  Category:Abdul Rahman Mosque  7  portti aukeaa
 * Kategoriat annetaan käsin, koska ne on varmennettu hakemalla; kahden
 * ensimmäisen en-Wikipedian otsikko ("Blue Mosque, Kabul") ei ole sama
 * kuin kategorian nimi.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (Blue Mosque, Kabul;
 * Kabul University; Abdul Rahman Mosque).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- SAKHIN PYHÄKKÖ / SININEN MOSKEIJA — Karte Sakhi, aamu. */
  {
    id: 'kabul-aamu',
    tiedosto: 'hero-kabul-aamu.png',
    kaupunki: 'Kabul',
    tarkkaKohde: true,
    kategoria: 'Category:Kart-e Sakhi Mosque',
    viitehaku: 'Kart-e Sakhi Mosque',
    viitesuosi: ['sakhi'],
    prompti: prompti(
      'the Sakhi shrine, the blue-tiled mosque of Karte Sakhi at the'
      + ' foot of the Asamayi hill in Kabul, in early morning light',
      'a wide, low mosque and shrine complex faced all over in glazed'
      + ' tilework in turquoise, cobalt and white, a central hall under'
      + ' a shallow tiled dome with a tall arched portal in front of'
      + ' it, lower arcaded wings of the same tilework running out to'
      + ' both sides around an open paved courtyard, and two short'
      + ' minarets at the front corners; THE WHOLE COMPLEX IS LOW AND'
      + ' SPREADS SIDEWAYS — no part of it is more than about three'
      + ' storeys high, and the bare brown hillside rising immediately'
      + ' behind it is many times taller than its dome, so the building'
      + ' is a broad band of colour at the foot of the slope; low early'
      + ' morning sun from the east strikes the glazed tiles straight'
      + ' on so that the blues turn brilliant and the arched recesses'
      + ' fall into deep shade',
      'the swept courtyard in front with its stone paving, a row of'
      + ' plane trees and a long water trough, the camera standing on'
      + ' the courtyard side so that the low boundary wall, an iron'
      + ' gate and a stone bench are in the foreground, a few people'
      + ' walking to work and children on their way to school as small'
      + ' distant figures, the quiet street outside with a handcart of'
      + ' fruit and parked cars, the flat-roofed houses of the district'
      + ' climbing the slope behind in tiers, and the snow on the far'
      + ' mountains beyond the city under a clear morning sky',
      VAKIO,
    ),
    selite: 'Karte Sakhin kaupunginosassa Asamayi-vuoren juurella seisovan '
      + 'Sakhin pyhäkön eli sinisen moskeijan julkisivut on päällystetty '
      + 'uussafavidiseen persialaiseen tapaan lasitetuilla laatoilla, '
      + 'joihin on kirjoitettu omistuskirjoituksia ja runoutta.',
  },

  /* ---- KABULIN YLIOPISTO — 3. kaupunginosa, keskipäivä. */
  {
    id: 'kabul-keskipaiva',
    tiedosto: 'hero-kabul-keskipaiva.png',
    kaupunki: 'Kabul',
    tarkkaKohde: true,
    kategoria: 'Category:Kabul University',
    viitehaku: 'Kabul University',
    // Kategoriassa on myös henkilökuvia; nämä sanat nostavat rakennukset.
    viitesuosi: ['library', 'center', 'campus'],
    prompti: prompti(
      'the main library building on the campus of Kabul University at'
      + ' midday',
      'a long symmetrical campus building of pale plastered concrete and'
      + ' buff stone, two and three storeys high, with even rows of'
      + ' rectangular windows in deep reveals, a projecting entrance'
      + ' block in the middle reached by a broad flight of steps under a'
      + ' flat canopy, plain parapets along a flat roof and a low'
      + ' decorative screen of pierced concrete across the upper front;'
      + ' THE BUILDING IS LOW AND HORIZONTAL — it is a modest campus'
      + ' block of a few storeys, no tower and no dome, and the pines'
      + ' and plane trees growing along the front reach almost to its'
      + ' roofline; hard midday sun straight overhead bleaches the'
      + ' plaster white and drops one narrow band of shade under the'
      + ' canopy',
      'the campus grounds in front with clipped lawns, rose beds,'
      + ' gravel paths and rows of tall pines, the camera standing on'
      + ' the lawn side so that a hedge, a path and a stone bench are in'
      + ' the foreground, students walking between buildings and sitting'
      + ' on the steps with books as small distant figures, further'
      + ' faculty blocks of the same pale stone among the trees, the'
      + ' flat-roofed houses and shopfronts of the surrounding district'
      + ' beyond the campus wall, and the bare brown ridges that ring'
      + ' the Kabul valley rising behind under a hard blue sky',
      VAKIO,
    ),
    selite: 'Kabulin yliopisto perustettiin 1931 kuningas Mohammed Nadir '
      + 'Shahin aikana, se on yksi Afganistanin vanhimmista korkeakouluista, '
      + 'ja siellä opiskelee noin 22 000 opiskelijaa.',
  },

  /* ---- ABDUL RAHMANIN MOSKEIJA — Deh Afghanan, ilta. */
  {
    id: 'kabul-ilta',
    tiedosto: 'hero-kabul-ilta.png',
    kaupunki: 'Kabul',
    tarkkaKohde: true,
    kategoria: 'Category:Abdul Rahman Mosque',
    viitehaku: 'Abdul Rahman Mosque',
    viitesuosi: ['abdul rahman', 'grand mosque'],
    prompti: prompti(
      'the Abdul Rahman Mosque in the Deh Afghanan district in the'
      + ' centre of Kabul at sunset',
      'a large modern congregational mosque of pale dressed stone, three'
      + ' storeys high with regular rows of tall pointed windows along'
      + ' its long flanks, a broad shallow dome over the prayer hall and'
      + ' smaller domes to either side of it, two slender minarets with'
      + ' balconies rising at the front corners, and a high tiled portal'
      + ' of blue and white over the main doors; THE MOSQUE IS BROAD'
      + ' RATHER THAN TALL — the prayer hall is only three storeys, the'
      + ' commercial buildings along the street beside it are of much'
      + ' the same height, and only the two minarets stand clear above'
      + ' the rooflines; warm low sunset light from the west slides'
      + ' across the dome so that the stone turns gold while the'
      + ' minaret shafts go dark against the sky',
      'the walled forecourt with plane trees, a long ablution trough and'
      + ' rows of shoes at the doors, the camera standing on the'
      + ' forecourt side so that the courtyard wall, the trough and a'
      + ' parked handcart are in the foreground, people crossing the'
      + ' courtyard and passers-by on the pavement as small distant'
      + ' figures, the busy commercial street outside with evening'
      + ' traffic, fruit stalls and strings of lights coming on, the'
      + ' trees and paths of the park across the road, and the'
      + ' flat-roofed houses climbing in tiers up the darkening'
      + ' hillside behind the city with their windows lighting up one'
      + ' by one under the mountains',
      VAKIO,
    ),
    selite: 'Abdul Rahmanin moskeija eli Kabulin suuri moskeija seisoo '
      + 'Deh Afghananin kauppakorttelissa Zarnegar-puiston vieressä, se on '
      + 'kolmikerroksinen ja peittää 1,4 hehtaarin tontin, ja yksi sen '
      + 'kerroksista on varattu naisille.',
  },
];
