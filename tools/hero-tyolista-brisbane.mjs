/*
 * HEROKUVATYÖLISTA, BRISBANE — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Brisbanen kolme herokuvaa generoitiin kierroksella 20
 * (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md).
 *
 * KOHDE VAIHDETTU: keskipäivä. Kierroksella 20 keskipäivän aiheena oli
 * Brisbanen kaupungintalo, mutta se on Brisbanen kaupunkilehden
 * ENSIMMÄINEN KANSIKUVA (js/packs/kulttuuri-kategoriat.js, brisbane →
 * kansikuvat, 'Brisbane City Hall 1 (30298960383).jpg'). Hero ei saa
 * toistaa lehden omaa kansikuvaa, joten tilalle otettiin Pyhän
 * Johanneksen katedraali Ann Streetillä — se ei esiinny lehdessä
 * lainkaan, se on kaupungin toinen selvä maamerkki keskustassa ja sen
 * Commons-kategoriassa on 39 kelvollista valokuvaa.
 *
 * Kaksi muuta kohdetta säilyivät: Story Bridge ja South Bankin
 * maailmanpyörä. Kumpikaan ei ole lehden kansi- eikä avauskuvana
 * (kannet: kaupungintalo, rahastotalo, muonavarasto; avaukset:
 * keskusta Kangaroo Pointista, South Bankin puisto, Mount Coot-tha).
 * Maailmanpyörän kuvakulma on tarkoituksella toinen kuin lehden
 * South Bank -avauskuvassa: pyörä edessä, puisto sen alla.
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs brisbane 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO (omistajan päätös 24.8.2026:
 * alkuperäinen korkeus ja etäisyys, dronemainen näkymä).
 *
 * MITTAKAAVA. Vakioprompti houkuttelee mallia liioittelemaan kohteen
 * kokoa, joten todellinen suhde ympäristöön on kirjoitettu auki:
 * sillan teräsristikko on leveä mutta keskustan tornit ovat sitä
 * korkeampia, katedraali on kivikirkko lasitornien puristuksessa, ja
 * maailmanpyörä on 60-metrinen eli selvästi vastarannan tornitaloja
 * matalampi.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   Story Bridge      Category:Story Bridge, Brisbane          44  portti aukeaa
 *   Katedraali        Category:St John's Cathedral, Brisbane   39  portti aukeaa
 *   Maailmanpyörä     Category:Wheel of Brisbane               49  portti aukeaa
 *
 * HUOM KATEGORIAN NIMESTÄ: katedraalin en-Wikipedian otsikko on
 * "St John's Cathedral (Brisbane)" sulkeineen, ja pilkullinen muoto
 * "St John's Cathedral, Brisbane" ei löydä Wikidatasta mitään — se
 * putoaisi tekstihakuun ja portti menisi kiinni. Kategoria annetaan
 * siksi käsin. Sama sudenkuoppa kuin Oodilla, Petran kuningashaudoilla
 * ja Damaskoksen linnoituksella.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (Story Bridge,
 * St John's Cathedral (Brisbane), Wheel of Brisbane).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- STORY BRIDGE — Kangaroo Point, aamu. */
  {
    id: 'brisbane-aamu',
    tiedosto: 'hero-brisbane-aamu.png',
    kaupunki: 'Brisbane',
    tarkkaKohde: true,
    wiki: 'Story Bridge',
    kategoria: 'Category:Story Bridge, Brisbane',
    viitehaku: 'Story Bridge',
    viitesuosi: ['story bridge'],
    prompti: prompti(
      'the Story Bridge across the Brisbane River at Kangaroo Point in'
      + ' early morning light',
      'a grey steel cantilever bridge, a dense lattice of riveted'
      + ' girders carrying the roadway high above the brown water and'
      + ' rising to two tall steel portal frames over the main span,'
      + ' maintenance walkways slung under the deck and steel stairs'
      + ' climbing the anchor piers; THE BRIDGE IS LONG AND LOW RATHER'
      + ' THAN TALL — its steel portals reach only about the height of'
      + ' a fifteen-storey building, and the office towers of the city'
      + ' centre behind it stand clearly higher than the tallest part'
      + ' of the steelwork; low early morning sun from the east flashes'
      + ' along the wet steel while mist still lies on the river',
      'the brown river swinging in a tight bend below with a blue and'
      + ' white CityCat catamaran running upstream and rowing shells'
      + ' close to the bank, the low cliffs of Kangaroo Point with'
      + ' their climbers and their riverside path, the camera standing'
      + ' on the Kangaroo Point side so that the cliff-top railing, a'
      + ' jacaranda and a park bench are in the foreground, early'
      + ' runners as small figures, timber houses on stumps among mango'
      + ' trees on the slopes, and the glass towers of the city centre'
      + ' with flat green ranges far behind',
      VAKIO,
    ),
    selite: 'Story Bridge avattiin 1940, se on Australian pisin '
      + 'ulokepalkkisilta ja siitä perittiin tiemaksua vuoteen 1947 asti; '
      + 'nimensä silta sai virkamies John Douglas Storyn mukaan.',
  },

  /* ---- PYHÄN JOHANNEKSEN KATEDRAALI — Ann Street, keskipäivä.
   * (Korvaa kierroksen 20 kaupungintalon, joka on lehden kansikuva.) */
  {
    id: 'brisbane-keskipaiva',
    tiedosto: 'hero-brisbane-keskipaiva.png',
    kaupunki: 'Brisbane',
    tarkkaKohde: true,
    kategoria: "Category:St John's Cathedral, Brisbane",
    viitehaku: "St John's Cathedral Brisbane",
    viitesuosi: ['st john', 'cathedral'],
    prompti: prompti(
      "St John's Anglican Cathedral on Ann Street in the centre of"
      + ' Brisbane at midday',
      'a gothic cathedral of warm honey-coloured sandstone with a long'
      + ' steep-roofed nave, high pointed windows with stone tracery,'
      + ' flying buttresses stepping out along the flanks, a square'
      + ' tower over the crossing and two more towers at the west front'
      + ' above a deep arched doorway, the stonework crisp and new on'
      + ' the western half and weathered darker on the older eastern'
      + ' end; THE CATHEDRAL IS A LOW STONE BUILDING WEDGED AMONG MUCH'
      + ' TALLER OFFICE TOWERS — its towers reach only a fraction of'
      + ' the height of the glass buildings that press against it on'
      + ' both sides and behind, so it sits in their shadow rather than'
      + ' rising above them; hard midday sun straight overhead bleaches'
      + ' the sandstone and drops the buttress shadows sharply onto the'
      + ' walls',
      'the narrow footpath and dropped forecourt on Ann Street with a'
      + ' low stone wall, a fig tree and a bicycle rack in the'
      + ' foreground on the cathedral side, office workers crossing at'
      + ' the lights and eating lunch on the steps as small figures,'
      + ' buses and taxis in the street below, the plain glass and'
      + ' concrete facades of the surrounding city blocks rising on'
      + ' every side, and beyond them the bend of the brown river and'
      + ' the low green ranges on the horizon',
      VAKIO,
    ),
    selite: 'Pyhän Johanneksen anglikaaninen katedraali Ann Streetillä '
      + 'rakennettiin John Loughborough Pearsonin piirustusten mukaan '
      + 'kolmessa vaiheessa vuosina 1906–2009, ja viimeisen vaiheen '
      + 'hiekkakivi louhittiin sadan kilometrin päässä Helidonissa.',
  },

  /* ---- MAAILMANPYÖRÄ — South Bank, ilta. */
  {
    id: 'brisbane-ilta',
    tiedosto: 'hero-brisbane-ilta.png',
    kaupunki: 'Brisbane',
    tarkkaKohde: true,
    wiki: 'Wheel of Brisbane',
    kategoria: 'Category:Wheel of Brisbane',
    viitehaku: 'Wheel of Brisbane',
    viitesuosi: ['wheel of brisbane', 'ferris'],
    prompti: prompti(
      'the Wheel of Brisbane standing over the South Bank parklands at'
      + ' sunset',
      'a white observation wheel 60 metres high, a slender steel rim'
      + ' braced with radiating cables and hung with rows of enclosed'
      + ' glass gondolas, the gondolas lit inside so that the passengers'
      + ' show as small silhouettes against the sky, the A-frame legs'
      + ' and the boarding platform at its foot; THE WHEEL IS ABOUT AS'
      + ' HIGH AS A FIFTEEN-STOREY BUILDING AND NO MORE — the office'
      + ' towers on the far bank of the river rise well above the top'
      + ' of it, and it is a light open framework rather than a solid'
      + ' mass; warm low sunset light from the west turns the white'
      + ' steel orange while the shaded side goes blue',
      'the subtropical parkland below with the kilometre-long arbour of'
      + ' curling steel columns smothered in magenta bougainvillea'
      + ' winding through it, the man-made lagoon beach with its sand'
      + ' and its last swimmers, the camera standing on the parkland'
      + ' side so that the arbour walkway, a row of palms and a food'
      + ' stall are in the foreground, families as small figures along'
      + ' the promenade, the brown river with a CityCat crossing it,'
      + ' and the towers of the city centre on the far bank taking the'
      + ' last orange light',
      VAKIO,
    ),
    selite: 'South Bankin 60 metriä korkea maailmanpyörä pystytettiin 2008 '
      + 'vuoden 1988 maailmannäyttelyn alueelle näyttelyn 20-vuotisjuhlaan, '
      + 'ja sen 42 ilmastoituun gondoliin mahtuu kerralla 336 matkustajaa.',
  },
];
