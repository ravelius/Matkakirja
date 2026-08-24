/*
 * Herokuvien TYÖLISTA 22: São Paulo, Toronto, Lima ja Quito.
 *
 * Kaikilla neljällä on valmis kaupunkilehti mutta ei yhtään
 * herokuvaa. Kolme kohtaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * eri pääkohde ja eri puoli kaupunkia joka kerta. Kuvakulma on aina
 * VAKIO (tools/hero-kuvakulmat.mjs) — omistajan päättämä oletus.
 * Malli: tools/hero-tyolista-24.mjs (kierros 24), joka on tuorein
 * ja lähin ennakkotapaus tästä reseptistä.
 *
 * ------------------------------------------------------------------
 * OHITETUT AIHEET (jo lehden kansikuvana tai avauskuvana — hero ei
 * saa toistaa niitä, ks. tools/hero-ajuri.mjs:n VIITEKUVAT-osio).
 * Näiden lisäksi ohitettiin myös NOSTOISSA jo käytetyt kohteet,
 * vaikka sääntö koskee vain kansi-/avauskuvia (sama harkinta kuin
 * Valparaíson Ascensor Artillería -tapauksessa listassa 24) —
 * toistuva aihe olisi silti laiska valinta neljästä uudesta kuvasta.
 * ------------------------------------------------------------------
 *
 * SÃO PAULO: kansi/avaus — Sé-katedraali, Pátio do Colégio, Theatro
 * Municipal, Centro-ilmakuva, Avenida Paulista -harjanne, Ibirapueran
 * puisto. NOSTOISSA JO KÄYTETTY (ei siis nämäkään): Edifício
 * Martinelli (oma nosto "Modernismin viikko ja ensimmäinen
 * pilvenpiirtäjä"), Mercado Municipal/Mercadão (kohdekartan
 * sub-nosto), Rua 25 de Março (kahdesti), Monumento às Bandeiras,
 * Estação da Luz, Liberdade, Altino Arantes -rakennus samassa
 * korttelissa Martinellin kanssa. → valittiin MASP (Avenida
 * Paulistalla mutta ERI rakennus kuin harjannenäkymä), Edifício
 * Copan (keskusta, ei mainita lehdessä lainkaan) ja Beco do Batman
 * Vila Madalenassa (katutason yleisnäkymä, ei nimettyä rakennusta).
 *
 * TORONTO: kansi/avaus — Ontarion parlamenttitalo, Casa Loma,
 * saaristolautta, keskustan siluetti CN Towerin kanssa, ilmakuva
 * pohjoisesta, järven rantaviiva. NOSTOISSA JO KÄYTETTY: Fort York,
 * St. Jamesin kirkko, Distillery District, CN Tower, Scarborough
 * Bluffs (kohdekartan sub-nosto), St. Lawrence Hall/-market. →
 * valittiin Royal Ontario Museum (Bloor-Yorkville), Toronto City
 * Hall (keskusta) ja High Park (länsilaita) — kolmea eri
 * kaupunginosaa, ei yhtään jo kuvattua kohdetta.
 *
 * LIMA: kansi/avaus — Plaza Mayor/katedraali, Costa Verde, muurin
 * jäänne, Centro-ilmakuva, Mirafloresin malecón-ilmakuva, yleinen
 * Lima-ilmakuva. NOSTOISSA JO KÄYTETTY: Huaca Pucllana (oma nosto
 * "Savitiilipyramidi korttelin keskellä", wiki-kentällä merkitty),
 * Malecón de la Reserva, Barrancon liitovarjonosto, Castillo del
 * Real Felipe (Callao), Palacio de Torre Tagle (historiallinen
 * kaiverrus), Pachacámac. → valittiin Basílica y Convento de San
 * Francisco (Centro Histórico, EI sama kuin Plaza Mayor -katedraali),
 * Huaca Huallamarca (San Isidro — ERI savitiilipyramidi kuin
 * Pucllana, ei mainita lehdessä lainkaan) ja La Punta Callaon
 * niemellä (katutason yleisnäkymä, ei nimettyä rakennusta).
 *
 * QUITO: kansi/avaus — Basílica del Voto Nacional, vanhankaupungin
 * yleispanoraama El Panecillolta ja Casa Bella Vistalta, Plaza de
 * San Francisco. NOSTOISSA JO KÄYTETTY: Quito-katedraali, San
 * Franciscon kirkko, La Compañía de Jesús (oma nosto "Satakuusi-
 * kymmentä vuotta yhteen julkisivuun", wiki-kentällä merkitty),
 * TeleferiQo, observatorio, Mitad del Mundo (oma nosto "Historian
 * käännekohta: Mitad del Mundo"). → valittiin Carondelet-palatsi
 * (Plaza Grande — ERI aukio kuin Plaza de San Francisco), Iglesia
 * de Guápulo (laakson rinteellä vanhankaupungin ulkopuolella) ja
 * Calle La Ronda (vanhankaupungin eteläreunan katutason yleisnäkymä).
 *
 * ------------------------------------------------------------------
 * VIITEKATEGORIAT — käsin todennettu 24.8.2026 Commonsin
 * categorymembers-rajapinnasta (NODE_USE_ENV_PROXY=1). Kaikki
 * kategorianimet haettu joko en-Wikipedian artikkelista Wikidatan
 * kautta tai Commonsin omalla otsikkohaulla, EI arvattu — neljä
 * niistä (São Franciscon basilika Limassa, Carondelet-palatsi,
 * Guápulo, sekä alun perin harkittu mutta hylätty Edifício
 * Martinelli) osoittautuivat tapauksiksi, joissa Wikidata-reitti ei
 * löytänyt sitelinkkiä/P373:a ja oikea kategoria piti hakea
 * Commonsin category-haulla suoraan (sama sudenkuoppa kuin Oodilla,
 * Petran kuningashaudoilla ja Damaskoksen linnoituksella — arvattu
 * nimi ei olisi toiminut).
 * ------------------------------------------------------------------
 *   Category:Museu de Arte de São Paulo            45 kelvollista kuvaa
 *   Category:Edifício Copan                         46 kelvollista kuvaa
 *   Category:Exterior of the Royal Ontario Museum   40 kelvollista kuvaa
 *   Category:Toronto City Hall                      48 kelvollista kuvaa
 *   Category:San Francisco de Asis (Lima)           35 kelvollista kuvaa
 *   Category:Huaca Huallamarca                      46 kelvollista kuvaa
 *   Category:Carondelet Palace, Quito                46 kelvollista kuvaa
 *   Category:Iglesia de Guápulo                     25 kelvollista kuvaa
 * Kaikki ylittävät reilusti generointiportin kahden kuvan rajan —
 * EI YHTÄÄN korvausta tarvittu kuvapulan takia. (Ensimmäiset
 * ehdokkaat Martinelli ja Mercado Municipal São Paulolle sekä
 * Compañía de Jesús ja Mitad del Mundo Quitolle vaihdettiin, mutta
 * syy oli aihetoisto jo olemassa olevien lehtinostojen kanssa, EI
 * viitekuvien puute — ks. yllä.)
 *
 * Beco do Batman (São Paulo, ilta), La Punta (Lima, ilta) ja Calle
 * La Ronda (Quito, ilta) ovat laajoja katunäkymiä ilman yhtä
 * nimettyä rakennusta — ei tarkkaKohde-merkintää, generoidaan
 * viitteettöminä. Kolme viitteetöntä kohtaa neljästä kaupungista on
 * sallitun ylärajan (yksi per kaupunki) sisällä.
 *
 * ------------------------------------------------------------------
 * HERKKYYS (perustuslain pilari 3, js/tyohuone-raamattu.js)
 * ------------------------------------------------------------------
 * - Ei alkuperäiskansa-aiheita kuvituksena: Lima ja Quito ovat
 *   Perua ja Ecuadoria, ja inkaperintö rajataan rakennuksiin ja
 *   arkeologisiin kohteisiin (Huaca Huallamarca) ilman seremonioita
 *   tai ihmisiä lähikuvassa — samoin kuin Huaca Pucllanan lehtinosto
 *   jo tekee.
 * - Ei köyhyys- eikä raunioestetiikkaa: São Paulossa ja Limassa ei
 *   käytetä favela- tai slummiaiheita; Huaca Huallamarca kuvataan
 *   arkeologisena rakennelmana modernin kaupunginosan keskellä, ei
 *   raunioina.
 * - Uskonnolliset rakennukset (San Francisco Lima, Guápulo) kuvataan
 *   rakennuksina, ei hartautena.
 * - Carondelet-palatsi kuvataan rakennuksena aamuvalossa, ei
 *   nykypolitiikkana; seremoniavartijat mainitaan vain osana
 *   arkkitehtonista näkymää.
 *
 * FAKTAT tarkistettu js/packs/kulttuuri-kategoriat.js:n saopaulo-,
 * toronto-, lima- ja quito-lohkoista (kansi-/avaus-/nostokuvien
 * tiedostonimet ja selitteet) sekä Commonsin extmetadatasta
 * viitekuvien tekijä- ja lisenssitietojen osalta.
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ================= SÃO PAULO ================= */

  /*
   * Aamu — Museu de Arte de São Paulo (MASP), Lina Bo Bardin 1968
   * suunnittelema punainen betonilaatikko Avenida Paulistalla.
   * ERI rakennus kuin avauskuvan Paulista-harjannenäkymä: tässä
   * kohteena on nimenomaan itse museorakennus ja sen kannatinpalkit.
   */
  {
    id: 'saopaulo-aamu',
    tiedosto: 'hero-saopaulo-aamu.png',
    kaupunki: 'São Paulo',
    tarkkaKohde: true,
    kategoria: 'Category:Museu de Arte de São Paulo',
    viitehaku: 'Museu de Arte de São Paulo',
    viitesuosi: ['facade', 'exterior', 'pillars', 'vao'],
    prompti: prompti(
      'the São Paulo Museum of Art (MASP) on Avenida Paulista in São'
      + ' Paulo, in the early morning',
      'a flat rectangular box of glass and concrete painted a deep'
      + ' solid RED, raised completely off the ground and suspended'
      + ' between two massive red concrete beams that span between two'
      + ' huge red concrete pillars at either end; THE SPACE UNDERNEATH'
      + ' THE BOX IS COMPLETELY OPEN — no walls, no columns and no'
      + ' rooms beneath the middle of the building, only the paved open'
      + ' plaza and clear sky visible straight through the gap, so the'
      + ' whole box appears to float above the square on just its two'
      + ' end supports; the glass walls of the box are divided by'
      + ' narrow vertical mullions into a plain grid',
      'the open paved plaza (the Vão Livre) directly underneath and in'
      + ' front of it with a scatter of people crossing through the'
      + ' shaded space beneath the suspended building at human scale,'
      + ' the wide lanes of Avenida Paulista running past with early'
      + ' traffic, and the dense wall of bank towers and apartment'
      + ' blocks lining the avenue\'s ridge stretching away under the'
      + ' low morning sun',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Edifício Copan, Oscar Niemeyerin aaltoileva
   * asuintorni keskustassa. Ei mainita lehdessä lainkaan.
   */
  {
    id: 'saopaulo-keskipaiva',
    tiedosto: 'hero-saopaulo-keskipaiva.png',
    kaupunki: 'São Paulo',
    tarkkaKohde: true,
    kategoria: 'Category:Edifício Copan',
    viitehaku: 'Edifício Copan',
    viitesuosi: ['facade', 'curve', 'exterior', 'brise'],
    prompti: prompti(
      'the Edifício Copan apartment tower in downtown São Paulo at'
      + ' midday',
      'an enormous high-rise built as a continuous S-shaped curve'
      + ' rather than a straight block — its long main facade bends'
      + ' back and forth in broad, shallow undulations for the whole'
      + ' height of the building, WITH NO FLAT STRAIGHT WALL AND NO'
      + ' RIGHT-ANGLED CORNERS anywhere along it; unbroken horizontal'
      + ' concrete sun-shade fins run in tight rows across every curve'
      + ' of the facade from top to bottom, throwing sharp horizontal'
      + ' shadow stripes; the building tapers slightly and ends in a'
      + ' flat roofline',
      'the dense, narrow streets of the old downtown grid pressing'
      + ' close around its base, small shops, newsstands and awnings'
      + ' with midday pedestrians crossing at the corner below, and the'
      + ' crowded skyline of older mid-century towers and rooftop water'
      + ' tanks of central São Paulo on every side under bright midday'
      + ' light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Beco do Batman, Vila Madalenan graffiti-kuja. Laaja
   * katunäkymä ilman yhtä nimettyä rakennusta — EI tarkkaKohde.
   */
  {
    id: 'saopaulo-ilta',
    tiedosto: 'hero-saopaulo-ilta.png',
    kaupunki: 'São Paulo',
    prompti: prompti(
      'the Beco do Batman alley in the Vila Madalena neighbourhood of'
      + ' São Paulo at dusk',
      'a narrow sloping alley between two- and three-storey houses'
      + ' whose walls are covered edge to edge in dense, colourful'
      + ' mural graffiti — bold overlapping shapes, faces and lettering'
      + ' in many bright paints layered over each other, with no bare'
      + ' wall visible; string lights and a few small illuminated'
      + ' shopfronts glow along the alley',
      'a scatter of visitors and residents walking the alley at human'
      + ' scale without recognisable faces, café tables spilling onto'
      + ' the pavement at one end, and the ordinary residential streets'
      + ' of hillside Vila Madalena fading into the warm dusk light'
      + ' beyond',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= TORONTO ================= */

  /*
   * Aamu — Royal Ontario Museum: vuoden 1914 kivisiipi PLUS Michael
   * Lee-Chin Crystal -lisärakennus (2007). Kulmikas kide, ei
   * pyöreä lasikupla — tämä on kohta, jonka malli helpoiten arvaa
   * väärin.
   */
  {
    id: 'toronto-aamu',
    tiedosto: 'hero-toronto-aamu.png',
    kaupunki: 'Toronto',
    tarkkaKohde: true,
    kategoria: 'Category:Exterior of the Royal Ontario Museum',
    viitehaku: 'Royal Ontario Museum',
    viitesuosi: ['crystal', 'exterior', 'facade'],
    prompti: prompti(
      'the Royal Ontario Museum on Bloor Street in Toronto in the'
      + ' early morning',
      'the original nineteen-fourteen wing built of warm beige brick'
      + ' and terracotta in a Romanesque-revival style, with rows of'
      + ' round-arched windows, decorative stone banding and small'
      + ' corner turrets along its roofline; bursting outward from one'
      + ' corner of this older stone building at a sharp diagonal angle'
      + ' is the Michael Lee-Chin Crystal, an entirely separate modern'
      + ' addition made of ANGULAR, FACETED metal-and-glass panels'
      + ' arranged in overlapping crystalline shards that jut out at'
      + ' odd tilted angles, its grey aluminum cladding and slanted'
      + ' glass panes meeting the old brick corner directly; THE'
      + ' CRYSTAL\'S SURFACE IS MADE OF SHARP FLAT FACETS, NOT SMOOTH'
      + ' CURVED GLASS, so it reads as a cluster of broken crystal'
      + ' shards grown out of the traditional museum building',
      'Bloor Street directly below with the first morning streetcars'
      + ' and commuters, the tree-lined path of Philosopher\'s Walk'
      + ' running along the museum\'s western side, and the Victorian'
      + ' houses of the Annex and the shops of Yorkville stretching'
      + ' away under the low morning sun',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Toronto City Hall, Viljo Revell 1965. Kaksi ERI
   * korkuista kaartuvaa tornia plus lentävä lautanen -neuvostosali
   * niiden välissä — ei symmetrinen tornipari.
   */
  {
    id: 'toronto-keskipaiva',
    tiedosto: 'hero-toronto-keskipaiva.png',
    kaupunki: 'Toronto',
    tarkkaKohde: true,
    kategoria: 'Category:Toronto City Hall',
    viitehaku: 'Toronto City Hall',
    viitesuosi: ['exterior', 'towers', 'nathan'],
    prompti: prompti(
      'Toronto City Hall on Nathan Phillips Square at midday',
      'two tall curved concrete tower blocks of CLEARLY DIFFERENT'
      + ' HEIGHTS standing side by side and curving toward one another'
      + ' like two open parentheses facing each other — a taller tower'
      + ' on one side and a distinctly shorter tower on the other, each'
      + ' with a smooth blank concrete back on its outward curve and'
      + ' continuous vertical ribbon windows on its inward concave'
      + ' face; cradled low between the foot of the two curved towers'
      + ' sits a separate round, flying-saucer-shaped council chamber'
      + ' building on a raised podium, its shallow dome barely rising'
      + ' above the podium\'s edge; THE TWO TOWERS ARE UNEQUAL IN'
      + ' HEIGHT AND CURVED, NOT A MATCHING PAIR OF STRAIGHT'
      + ' RECTANGULAR TOWERS',
      'Nathan Phillips Square spread out in front with its rectangular'
      + ' reflecting pool, concrete arches and raised walkway busy with'
      + ' midday visitors and food-cart lines, the smaller stone clock'
      + ' tower of the old nineteenth-century City Hall visible off to'
      + ' one side, and the office towers of the financial district'
      + ' rising behind',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — High Park, kaupungin länsilaidan puisto. Laaja
   * yleisnäkymä ilman yhtä nimettyä rakennusta — EI tarkkaKohde.
   */
  {
    id: 'toronto-ilta',
    tiedosto: 'hero-toronto-ilta.png',
    kaupunki: 'Toronto',
    prompti: prompti(
      'High Park in the west end of Toronto at sunset',
      'rolling wooded parkland of tall oak trees and open grass hills,'
      + ' gravel paths winding between the mature trees, and a small'
      + ' pond reflecting the evening sky at the bottom of a shallow'
      + ' valley',
      'joggers and cyclists on the park paths as small distant'
      + ' figures, the low brick and stone houses of the Roncesvalles'
      + ' and Bloor West neighbourhoods just visible along the park\'s'
      + ' edge, and the downtown skyline reduced to a faint cluster of'
      + ' towers on the horizon far to the east under the setting sun',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= LIMA ================= */

  /*
   * Aamu — Basílica y Convento de San Francisco, Centro Histórico.
   * EI sama rakennus kuin kansikuvan Plaza Mayor -katedraali; oma
   * torinsa ja oma julkisivunsa toisella kadulla.
   */
  {
    id: 'lima-aamu',
    tiedosto: 'hero-lima-aamu.png',
    kaupunki: 'Lima',
    tarkkaKohde: true,
    kategoria: 'Category:San Francisco de Asis (Lima)',
    viitehaku: 'Basílica y Convento de San Francisco de Lima',
    viitesuosi: ['facade', 'exterior', 'towers'],
    prompti: prompti(
      'the Basilica and Convent of San Francisco in the historic'
      + ' centre of Lima in the early morning',
      'a colonial baroque church facade painted a solid pale'
      + ' OCHRE-YELLOW with sharply contrasting WHITE carved stone'
      + ' surrounds around every door, window and niche; twin matching'
      + ' bell towers rise above the roofline, each topped with a small'
      + ' white dome and lantern; a tall triangular pediment decorated'
      + ' with white carved scrollwork crowns the main portal, and the'
      + ' two-storey facade is lined with round-arched niches and'
      + ' balustraded stone balconies; THE WALLS READ CLEARLY AS'
      + ' YELLOW WITH WHITE TRIM, not plain grey or white stone',
      'the cobbled colonial plaza in front with low arcaded buildings'
      + ' and wooden balconies nearby, a scatter of pigeons and early'
      + ' pedestrians at human scale, and the tiled roofs of the'
      + ' historic centre receding under soft morning light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Huaca Huallamarca, San Isidro. ERI savitiilipyramidi
   * kuin lehden Huaca Pucllana -nosto (Miraflores) — eri kaupungin-
   * osa, eri kohde, ei mainita lehdessä lainkaan.
   */
  {
    id: 'lima-keskipaiva',
    tiedosto: 'hero-lima-keskipaiva.png',
    kaupunki: 'Lima',
    tarkkaKohde: true,
    kategoria: 'Category:Huaca Huallamarca',
    viitehaku: 'Huaca Huallamarca',
    viitesuosi: ['exterior', 'pyramid', 'adobe'],
    prompti: prompti(
      'the Huaca Huallamarca adobe pyramid in the San Isidro district'
      + ' of Lima at midday',
      'a massive stepped platform mound built entirely from small'
      + ' handmade sun-dried mud bricks stacked upright in a'
      + ' distinctive layered "bookshelf" pattern, forming rough'
      + ' staggered terraces and a long earthen ramp climbing between'
      + ' levels; the surface is irregular, crumbling and the dry'
      + ' ochre-brown colour of clay, WITH NO STONE MASONRY AND NO'
      + ' SMOOTH TRIANGULAR PYRAMID SIDES anywhere on it — it must read'
      + ' as ancient weathered mud brick, not cut stone',
      'a low modern fence and gravel visitor path around its base, and'
      + ' pressing in immediately behind it the sharp contrast of'
      + ' modern San Isidro apartment towers, office buildings and'
      + ' manicured street trees enclosing the ancient mound on every'
      + ' side under bright midday sun',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — La Punta, Callaon niemen kärki. Laaja katunäkymä ilman
   * yhtä nimettyä rakennusta — EI tarkkaKohde.
   */
  {
    id: 'lima-ilta',
    tiedosto: 'hero-lima-ilta.png',
    kaupunki: 'Lima',
    prompti: prompti(
      'the La Punta neighbourhood on the Callao peninsula in Lima at'
      + ' sunset',
      'a quiet grid of low early-twentieth-century houses painted in'
      + ' soft pastel colours — pale blue, yellow and pink — with'
      + ' wrought-iron balconies, tiled porches and small front gardens'
      + ' facing wide, nearly empty streets',
      'a scatter of residents walking or cycling at human scale along'
      + ' the seafront promenade, fishing boats drawn up on the narrow'
      + ' beach at the tip of the peninsula, and the open Pacific Ocean'
      + ' stretching away on both sides of the narrow spit of land'
      + ' under the colours of the setting sun',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= QUITO ================= */

  /*
   * Aamu — Carondelet-palatsi, Plaza Grande. ERI aukio kuin
   * kansikuvan Plaza de San Francisco; matala pitkä julkisivu, ei
   * torni eikä kirkko.
   */
  {
    id: 'quito-aamu',
    tiedosto: 'hero-quito-aamu.png',
    kaupunki: 'Quito',
    tarkkaKohde: true,
    kategoria: 'Category:Carondelet Palace, Quito',
    viitehaku: 'Carondelet Palace',
    viitesuosi: ['facade', 'exterior', 'balcony'],
    prompti: prompti(
      'the Carondelet Palace, Ecuador\'s presidential palace, on Plaza'
      + ' Grande in the historic centre of Quito in the early morning',
      'a long two-storey neoclassical facade painted white with pale'
      + ' grey stone trim, a continuous covered arcade of round arches'
      + ' running along the ground floor, and a row of tall shuttered'
      + ' windows above opening onto a long covered balcony at the'
      + ' centre of the upper floor where addresses are given; a low'
      + ' pediment and the flag of Ecuador mark the central bay; THE'
      + ' FACADE IS LOW AND HORIZONTAL, NOT A TOWER OR A CHURCH FRONT,'
      + ' running the full width of one side of the square',
      'the paved Plaza Grande in front with its central garden,'
      + ' benches and a scatter of early pedestrians and pigeons at'
      + ' human scale, ceremonial guards at the entrance, and the tiled'
      + ' roofs and church towers of the historic centre rising gently'
      + ' behind',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Iglesia de Guápulo, laakson rinteellä
   * vanhankaupungin ulkopuolella. Ei sekoiteta La Compañíaan tai
   * San Franciscoon, jotka on jo käytetty lehden nostoissa.
   */
  {
    id: 'quito-keskipaiva',
    tiedosto: 'hero-quito-keskipaiva.png',
    kaupunki: 'Quito',
    tarkkaKohde: true,
    kategoria: 'Category:Iglesia de Guápulo',
    viitehaku: 'Iglesia de Guápulo',
    viitesuosi: ['facade', 'exterior', 'hillside'],
    prompti: prompti(
      'the Sanctuary of Guápulo, a colonial baroque church perched on'
      + ' the steep hillside of the Guápulo valley below Quito, at'
      + ' midday',
      'a whitewashed baroque church with a single tall bell tower and'
      + ' a curved, scrolled stone gable above the main entrance, its'
      + ' plain white walls broken by simple stone window surrounds;'
      + ' the church stands on a series of terraced stone platforms and'
      + ' a walled forecourt built directly into the STEEP SLOPE, so'
      + ' the ground drops away sharply on one side of the building'
      + ' rather than sitting on flat land',
      'the switchback cobbled road climbing the valley wall below the'
      + ' church, red-tiled colonial rooftops and terraced gardens'
      + ' clinging to the same steep hillside around it, and the'
      + ' forested valley floor dropping away toward the eastern edge'
      + ' of the city under clear midday light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Calle La Ronda, vanhankaupungin eteläreunan kävelykatu.
   * Laaja katunäkymä ilman yhtä nimettyä rakennusta — EI
   * tarkkaKohde.
   */
  {
    id: 'quito-ilta',
    tiedosto: 'hero-quito-ilta.png',
    kaupunki: 'Quito',
    prompti: prompti(
      'Calle La Ronda, a historic pedestrian street at the southern'
      + ' edge of Quito\'s old town, at dusk',
      'a narrow cobbled street lined with single-storey colonial'
      + ' houses in white, ochre and deep red, their wooden doors and'
      + ' window frames painted in contrasting colours, wrought-iron'
      + ' lanterns hanging over small artisan workshops and cafés with'
      + ' warm light spilling from open doorways',
      'a scatter of visitors walking the narrow street at human scale'
      + ' without recognisable faces, hand-painted shop signs and'
      + ' hanging flowerpots along the walls, and the darker rooftops'
      + ' of the old town fading into the evening sky above the street',
      VAKIO,
    ),
    selite: null,
  },
];
