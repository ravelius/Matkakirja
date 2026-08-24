/*
 * Herokuvien TYÖLISTA 24: New Orleans, Bogotá, Valparaíso ja Adelaide.
 *
 * Kaikilla neljällä on valmis kaupunkilehti mutta ei yhtään
 * herokuvaa. Kolme kohtaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * eri pääkohde ja eri puoli kaupunkia joka kerta. Kuvakulma on aina
 * VAKIO (tools/hero-kuvakulmat.mjs) — omistajan päättämä oletus.
 *
 * ------------------------------------------------------------------
 * OHITETUT AIHEET (jo lehden kansikuvana tai avauskuvana — hero ei
 * saa toistaa niitä, ks. tools/hero-ajuri.mjs:n VIITEKUVAT-osio)
 * ------------------------------------------------------------------
 *
 * New Orleans: kaupungin siluetti Mississippiltä; Jackson Square
 * kokonaisuudessaan (St. Louis -katedraali, Cabildo, Presbytère);
 * Ranskan Korttelin katot; Jackson Squaren ilmakuva; French
 * Quarter/CBD-ilmakuva; höyrylaiva Natchez. → valittiin sen sijaan
 * St. Louis Cemetery 1, Caesars Superdome ja Frenchmen Street, jotka
 * eivät esiinny kummassakaan listassa.
 *
 * Bogotá: Plaza de Bolívar patsaineen ja katedraaleineen; Centro
 * Internacionalin tornirykelmä; Monserrate (huipulta kuvattu
 * kaupunkinäkymä); pohjoisen ja kaakkoisen Bogotán ilmakuvat. →
 * valittiin Chorro de Quevedo (La Candelaria, ei Plaza de Bolívar),
 * Museo del Oro ja Torre Colpatria.
 *
 * Adelaide: Adelaide City -yleissiluetti; Torrens Lake ja
 * juhla/kongressitalot; Glenelg-ranta; ruutukaavan ilmakuva; South
 * Terracen puistovyöhyke; Adelaide Oval. → valittiin Central Market,
 * St Peter's Cathedral (North Adelaide) ja Beehive Corner (Rundle
 * Mall) — kolme eri kaupunginosaa, ei yhtään jo kuvattua kohdetta.
 *
 * Valparaíso: Plaza Sotomayor ja laivaston päämaja; yleinen värikäs
 * rinnetalomassa (kansikuva 2); satama lauttaveneineen; lahden
 * ilmakuva; plan+Sotomayor-panoraama; aamuinen yleisrinnekortteli
 * (avauskuva 3). Myös Ascensor Artillería (jo nostokuvana) vaihdettiin
 * tietoisesti toiseen hissiin tuoreuden vuoksi, vaikka sääntö koskee
 * vain kansi-/avauskuvia. → valittiin Ascensor Concepción (Turri),
 * Palacio Baburizza (Cerro Alegre) ja La Sebastiana (Cerro Bellavista)
 * — kolme eri kukkulaa, katso ERIKOISTAPAUS-huomautus alla.
 *
 * ------------------------------------------------------------------
 * VALPARAÍSO — ERIKOISTAPAUS
 * ------------------------------------------------------------------
 * Kaupungin tunnusomaisin piirre on rinteiden värikäs talomassa ja
 * vanhat ascensorit, ei yksi maamerkki — mutta nimeämätön "värikäs
 * rinne" johtaisi juuri siihen arkkityyppitäyttöön, jota
 * generointiportti on rakennettu estämään. Siksi jokaiselle kuvalle
 * on silti konkreettinen nimetty kohde: yksi ascensor (Concepción),
 * yksi rakennus Cerro Alegrella (Palacio Baburizza) ja yksi
 * rakennus Cerro Bellavistalla (La Sebastiana). Kolme eri kukkulaa
 * yhdessä kertovat kaupungin luonteen ilman yhtä yleiskliseekuvaa.
 *
 * ------------------------------------------------------------------
 * VIITEKATEGORIAT — käsin todennettu 24.8.2026 Commonsin
 * categorymembers-rajapinnasta (NODE_USE_ENV_PROXY=1). Kaikki
 * kategorianimet haettu joko en-Wikipedian artikkelista Wikidatan
 * kautta tai tämän mantereen faktapohjatiedostoista, EI arvattu.
 * ------------------------------------------------------------------
 *   Category:St. Louis Cemetery 1        49 kelvollista kuvaa
 *     (HUOM: arvattava "Category:St. Louis Cemetery No. 1" on TYHJÄ —
 *     oikea nimi löytyi Commonsin omalla otsikkohaulla.)
 *   Category:Caesars Superdome           18 kelvollista kuvaa
 *   Category:Chorro de Quevedo           21 kelvollista kuvaa
 *   Category:Museo del Oro, Bogotá       48 kelvollista kuvaa
 *   Category:Torre Colpatria             49 kelvollista kuvaa
 *   Category:Central Market, Adelaide    50 kelvollista kuvaa
 *   Category:St Peter's Cathedral, Adelaide  48 kelvollista kuvaa
 *   Category:Beehive Corner              12 kelvollista kuvaa
 *   Category:Palacio Baburizza           49 kelvollista kuvaa
 *   Category:La Sebastiana               44 kelvollista kuvaa
 *   Category:Ascensor Concepción         33 kelvollista kuvaa
 * Kaikki ylittävät reilusti generointiportin kahden kuvan rajan, ei
 * yhtään korvausta tarvittu kuvapulan takia.
 *
 * Frenchmen Street (New Orleans, ilta) on laaja katunäkymä ilman
 * yhtä nimettyä rakennusta — ei tarkkaKohde-merkintää, generoidaan
 * viitteettömänä kuten laajat yleisnäkymät yleensä. Tämä on ainoa
 * viitteetön kohta koko listassa (yksi per kaupunki sallittu, tässä
 * käytetty vain New Orleansin kohdalla).
 *
 * ------------------------------------------------------------------
 * HERKKYYS (perustuslain pilari 3, omistajan 23.8.2026 linjaus)
 * ------------------------------------------------------------------
 * - New Orleans: ei hurrikaani- eikä tuhokuvastoa, ei köyhyys-
 *   estetiikkaa. St. Louis Cemetery 1 kuvataan arkkitehtuurina
 *   aamuvalossa, ei kummitustaloestetiikkana eikä yksittäistä hautaa
 *   korostaen.
 * - Bogotá: ei väkivalta- eikä huumekuvastoa, ei nykypolitiikkaa.
 *   Museo del Oro kuvataan rakennuksena, ei muisca-esineistönä tai
 *   -kuvastona — kokoelman sisältö kuuluu lehden tekstiin.
 * - Adelaide: ei kaurna-aiheita herokuvissa.
 * - Kaikki kolme uskonnollista/juhlallista rakennusta (St. Louis
 *   -katedraali ei tässä listassa, mutta St Peter's Cathedral on)
 *   kuvataan rakennuksina, ei hartautena.
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ================= NEW ORLEANS ================= */

  /*
   * Aamu — St. Louis Cemetery 1, perustettu 1789, New Orleansin
   * vanhin säilynyt hautausmaa. Korkea pohjavesi pakotti hautaamaan
   * maan päälle: tulos on tiheä "kuolleiden kaupunki" valkoiseksi
   * kalkituista muuri- ja marmorihaudoista. Kuvataan arkkitehtuurina
   * aamuvalossa — ei kummitustalotunnelmaa, ei yksittäistä hautaa
   * korosteta.
   */
  {
    id: 'neworleans-aamu',
    tiedosto: 'hero-neworleans-aamu.png',
    kaupunki: 'New Orleans',
    tarkkaKohde: true,
    kategoria: 'Category:St. Louis Cemetery 1',
    viitehaku: 'St. Louis Cemetery 1 New Orleans',
    viitesuosi: ['exterior', 'tombs', 'row', 'path'],
    prompti: prompti(
      'St. Louis Cemetery No. 1, New Orleans\' oldest surviving'
      + ' cemetery, in early morning light',
      'densely packed rows of ABOVE-GROUND tombs — small'
      + ' house-like stone and brick vaults, most rendered in white'
      + ' or cream stucco, with flat or gently pedimented roofs,'
      + ' some family tombs topped with stone urns or simple crosses'
      + ' and a few larger society vaults with wrought-iron gates;'
      + ' narrow crushed-shell and brick paths run between the tomb'
      + ' rows like miniature streets, THERE ARE NO IN-GROUND'
      + ' HEADSTONES OR GRASSY LAWN, only the tomb rows and the'
      + ' paths between them',
      'the low brick perimeter wall with its own row of wall vaults'
      + ' at one edge, the rooftops of Treme just beyond it, and soft'
      + ' morning haze over the whole scene',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Caesars Superdome, avattu 1975 (Louisiana
   * Superdome), Central Business Districtin reunalla Poydras
   * Streetin päässä. Matala pyöreä stadion, ei pilvenpiirtäjä.
   */
  {
    id: 'neworleans-keskipaiva',
    tiedosto: 'hero-neworleans-keskipaiva.png',
    kaupunki: 'New Orleans',
    tarkkaKohde: true,
    kategoria: 'Category:Caesars Superdome',
    viitehaku: 'Caesars Superdome New Orleans',
    viitesuosi: ['exterior', 'dome', 'aerial'],
    prompti: prompti(
      'the Caesars Superdome at the edge of the Central Business'
      + ' District in New Orleans at midday',
      'a huge low CYLINDRICAL drum-shaped stadium, its walls a'
      + ' smooth pale grey-white cladding ringed by rows of small'
      + ' windows, crowned by a shallow domed roof covered in silver'
      + '-grey ribbed panels; NOT a glass tower and not a pointed or'
      + ' geodesic dome — the roof is a low, gently curved cap sitting'
      + ' flat on the wide cylindrical drum, with covered walkway'
      + ' ramps and plazas at ground level where the building meets'
      + ' the street',
      'the wide plaza and parking approaches around its base, the'
      + ' elevated expressway ramps nearby, and the office towers of'
      + ' the Central Business District rising a short distance away'
      + ' under a bright midday sun',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Frenchmen Street, Faubourg Marigny, muutaman korttelin
   * mittainen musiikkikatu Ranskan Korttelin itäpuolella. Laaja
   * katunäkymä ilman yhtä nimettyä rakennusta — EI tarkkaKohde.
   */
  {
    id: 'neworleans-ilta',
    tiedosto: 'hero-neworleans-ilta.png',
    kaupunki: 'New Orleans',
    prompti: prompti(
      'Frenchmen Street in the Faubourg Marigny neighbourhood of New'
      + ' Orleans at dusk',
      'a row of two-storey nineteenth-century Creole townhouses with'
      + ' cast-iron and wooden balconies, their ground floors turned'
      + ' into small music clubs and bars with warm light spilling'
      + ' from open doors and windows, strings of warm bulb lights'
      + ' overhead, hand-painted signs, and a brass band visible'
      + ' through one open doorway',
      'the narrow street itself with a scatter of people walking and'
      + ' listening at a respectful distance without singling out'
      + ' recognisable faces, and the quieter residential blocks of'
      + ' the Marigny fading into the warm dusk beyond',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= BOGOTÁ ================= */

  /*
   * Aamu — Chorro de Quevedo, La Candelarian pieni portaikkoaukio,
   * pidetään Bogotán perustamispaikkana 1538. Ei sama kuin Plaza de
   * Bolívar: pieni, kivetty, puinen risti/lähde keskellä.
   */
  {
    id: 'bogota-aamu',
    tiedosto: 'hero-bogota-aamu.png',
    kaupunki: 'Bogotá',
    tarkkaKohde: true,
    kategoria: 'Category:Chorro de Quevedo',
    viitehaku: 'Chorro de Quevedo Bogota',
    viitesuosi: ['plaza', 'exterior', 'colonial', 'square'],
    prompti: prompti(
      'the small stepped colonial square of Chorro de Quevedo in La'
      + ' Candelaria, Bogotá, traditionally regarded as the city\'s'
      + ' founding site, in cool morning light',
      'a SMALL, intimate cobblestone plaza — much smaller than a'
      + ' grand cathedral square — enclosed by low two-storey'
      + ' colonial houses with whitewashed or ochre walls, exposed'
      + ' dark wood balconies and beams, and red clay tile roofs; a'
      + ' simple stone monument with a cross stands near the plaza'
      + ' centre, and a narrow cobbled alley (Calle del Embudo) enters'
      + ' the square between two of the houses',
      'the steep cobbled lane climbing away toward the forested'
      + ' Eastern Hills, a scatter of people at human scale without'
      + ' recognisable faces, and the wider rooftops of La Candelaria'
      + ' descending below',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Museo del Oro (Gold Museum), Parque Santanderin
   * kulmalla. Nykyinen rakennus 1968, laajennettu 2004: MODERNI,
   * ei siirtomaa-ajan rakennus kuten naapurustonsa. Rakennuksena,
   * ei muisca-esineistönä.
   */
  {
    id: 'bogota-keskipaiva',
    tiedosto: 'hero-bogota-keskipaiva.png',
    kaupunki: 'Bogotá',
    tarkkaKohde: true,
    kategoria: 'Category:Museo del Oro, Bogotá',
    viitehaku: 'Museo del Oro Bogota building',
    viitesuosi: ['exterior', 'facade', 'building'],
    prompti: prompti(
      'the Gold Museum (Museo del Oro) building beside Parque'
      + ' Santander in central Bogotá at midday',
      'a MID-TWENTIETH-CENTURY MODERNIST museum building, NOT a'
      + ' colonial-era structure: a solid rectangular volume faced in'
      + ' pale travertine-coloured stone, its walls organised in a'
      + ' clean grid of narrow vertical window slits, a flat roofline,'
      + ' and a plain recessed ground-floor entrance without columns'
      + ' or ornament',
      'the paved plaza and street in front with pedestrians at human'
      + ' scale, and the mixed skyline of older colonial roofs and'
      + ' newer office buildings of central Bogotá behind it under'
      + ' clear midday light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Torre Colpatria, valmistui 1979, Bogotán toiseksi
   * korkein rakennus (196 m). Punaruskea, porrastettu huippu — ei
   * lasitorni.
   */
  {
    id: 'bogota-ilta',
    tiedosto: 'hero-bogota-ilta.png',
    kaupunki: 'Bogotá',
    tarkkaKohde: true,
    kategoria: 'Category:Torre Colpatria',
    viitehaku: 'Torre Colpatria Bogota',
    viitesuosi: ['exterior', 'skyline', 'evening', 'tower'],
    prompti: prompti(
      'Torre Colpatria rising over central Bogotá at dusk',
      'a tall, slender RECTANGULAR skyscraper faced in reddish-brown'
      + ' brick-toned panels, its top formed by a distinct STEPPED,'
      + ' PYRAMID-LIKE setback of several narrowing tiers rather than'
      + ' a flat roof or a pointed spire, NOT a glass curtain-wall'
      + ' tower',
      'the lower office and apartment blocks of central Bogotá'
      + ' spreading around its base with their windows lit against the'
      + ' fading sky, streets with evening traffic below, and the dark'
      + ' silhouette of the Eastern Hills behind the tower',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= VALPARAÍSO ================= */

  /*
   * Aamu — Ascensor Concepción (Turri), avattu 1.12.1883, vanhin
   * toimiva ascensor. Nousee Plaza Aníbal Pinton/Calle Pratin
   * tasolta Cerro Concepciónin Paseo Gervasonille.
   */
  {
    id: 'valparaiso-aamu',
    tiedosto: 'hero-valparaiso-aamu.png',
    kaupunki: 'Valparaíso',
    tarkkaKohde: true,
    kategoria: 'Category:Ascensor Concepción',
    viitehaku: 'Ascensor Concepcion Turri Valparaiso',
    viitesuosi: ['exterior', 'car', 'track', 'morning'],
    prompti: prompti(
      'Ascensor Concepción, Valparaíso\'s oldest funicular railway'
      + ' (opened 1883), climbing from the port level up Cerro'
      + ' Concepción in early morning light',
      'a short, STEEPLY inclined pair of steel rails running up a'
      + ' narrow wooden-and-masonry trestle wedged between two'
      + ' buildings, carrying a small boxy wooden funicular car'
      + ' painted in worn ochre-yellow with a peaked wooden roof and'
      + ' small windows, connected by a visible cable to a matching'
      + ' car passing it on the second rail; simple covered station'
      + ' platforms with ticket booths sit at both the top and bottom'
      + ' of the track',
      'the tiled roofs and colourfully painted houses of Cerro'
      + ' Concepción climbing away above the top station, and the'
      + ' flat streets of the port district (the plan) with a few'
      + ' early pedestrians at the bottom',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Palacio Baburizza, Cerro Alegre, valmistui 1916
   * kroatialaiselle salpietarikauppiaalle, nyk. Museo de Bellas
   * Artes. Art nouveau -huvila, ei rivitalorinne.
   */
  {
    id: 'valparaiso-keskipaiva',
    tiedosto: 'hero-valparaiso-keskipaiva.png',
    kaupunki: 'Valparaíso',
    tarkkaKohde: true,
    kategoria: 'Category:Palacio Baburizza',
    viitehaku: 'Palacio Baburizza Valparaiso',
    viitesuosi: ['exterior', 'facade', 'mansion'],
    prompti: prompti(
      'Palacio Baburizza, an Art Nouveau mansion on Cerro Alegre in'
      + ' Valparaíso, at midday',
      'a SINGLE ornate mansion, NOT a row of ordinary hillside houses:'
      + ' an asymmetrical composition of steep dark-tiled mansard'
      + ' roofs, a rounded corner turret, wooden and stucco walls in'
      + ' warm terracotta and cream tones, tall arched windows, carved'
      + ' wooden brackets under deep eaves, and a wrap-around covered'
      + ' balcony on the upper floor',
      'the small paved viewpoint square (Paseo Yugoslavo) in front'
      + ' with its balustrade overlooking the port, other Cerro'
      + ' Alegre houses in the middle distance, and the bay and port'
      + ' cranes of Valparaíso far below under clear midday light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — La Sebastiana, Pablo Nerudan talomuseo Cerro Bellavistalla.
   * Kapea, useakerroksinen "laivamainen" torni — ei tavallinen
   * rinnetalo. Auringonlasku sopii: talo tunnetaan lahtinäkymästään.
   */
  {
    id: 'valparaiso-ilta',
    tiedosto: 'hero-valparaiso-ilta.png',
    kaupunki: 'Valparaíso',
    tarkkaKohde: true,
    kategoria: 'Category:La Sebastiana',
    viitehaku: 'La Sebastiana Valparaiso Neruda house',
    viitesuosi: ['exterior', 'facade', 'sunset'],
    prompti: prompti(
      'La Sebastiana, Pablo Neruda\'s house-museum on Cerro'
      + ' Bellavista in Valparaíso, at sunset',
      'a NARROW, TALL, VERTICAL house built like a stacked tower of'
      + ' several small storeys — NOT a wide house and NOT one house'
      + ' among a uniform row of identical colourful houses: painted'
      + ' pale cream and blue-grey, with small round porthole-like'
      + ' windows on some floors alongside ordinary rectangular'
      + ' windows, a flat roof terrace at the very top, and a narrow'
      + ' external staircase climbing up one side',
      'the steep, winding lane of Cerro Bellavista running past its'
      + ' base with a few scattered neighbouring houses, and the whole'
      + ' bay of Valparaíso and its port opening out below in the'
      + ' warm colours of the setting sun',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= ADELAIDE ================= */

  /*
   * Aamu — Adelaide Central Market, Gouger Street, keskustan
   * länsilaidalla. Uusittu lasi-teräskatos vuodelta 2019 vanhan
   * markkinahallin edessä.
   */
  {
    id: 'adelaide-aamu',
    tiedosto: 'hero-adelaide-aamu.png',
    kaupunki: 'Adelaide',
    tarkkaKohde: true,
    kategoria: 'Category:Central Market, Adelaide',
    viitehaku: 'Adelaide Central Market Gouger Street',
    viitesuosi: ['exterior', 'entrance', 'morning', 'facade'],
    prompti: prompti(
      'Adelaide Central Market on Gouger Street in the western end of'
      + ' the CBD, in early morning light',
      'a large market hall entrance: a modern glass-and-white-steel'
      + ' canopy roof, angular and folded like an unfolding awning,'
      + ' projecting out over the pavement above wide glazed entrance'
      + ' doors, with the market\'s name lettering on the canopy and'
      + ' the older brick facade of the market hall visible behind and'
      + ' above it',
      'colourful striped awnings of adjoining stallholder shopfronts'
      + ' at street level, a scatter of early-morning shoppers with'
      + ' bags and trolleys at human scale, and the low CBD rooftops'
      + ' of the surrounding streets',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — St Peter's Cathedral, North Adelaide, anglikaaninen
   * tuomiokirkko, valmistunut pääosin 1904. Kaksi läntistä tornia
   * plus korkeampi risteystorni; ei sekoiteta katoliseen
   * katedraaliin keskustassa.
   */
  {
    id: 'adelaide-keskipaiva',
    tiedosto: 'hero-adelaide-keskipaiva.png',
    kaupunki: 'Adelaide',
    tarkkaKohde: true,
    kategoria: "Category:St Peter's Cathedral, Adelaide",
    viitehaku: "St Peter's Cathedral North Adelaide",
    viitesuosi: ['exterior', 'facade', 'towers'],
    prompti: prompti(
      "St Peter's Cathedral in North Adelaide at midday",
      'a Gothic Revival cathedral built of blue-grey bluestone with'
      + ' pale cream sandstone trim around the windows and arches: TWO'
      + ' matching spired towers flank the west front either side of a'
      + ' large pointed-arch window, and a third, TALLER spire rises'
      + ' from the crossing tower behind them; steeply pitched slate'
      + ' roofs and flying buttresses run along the nave',
      'the open lawns and mature trees of the cathedral close around'
      + ' it, Pennington Terrace and King William Road at a short'
      + ' distance with a few pedestrians, and the parklands and'
      + ' River Torrens beyond, under bright midday light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Beehive Corner, Rundle Mallin ja King William Streetin
   * kulma, rakennettu 1896. Viktoriaaninen kulmatalo, jonka kärjessä
   * mehiläispesän muotoinen kello/tuuliviiri.
   */
  {
    id: 'adelaide-ilta',
    tiedosto: 'hero-adelaide-ilta.png',
    kaupunki: 'Adelaide',
    tarkkaKohde: true,
    kategoria: 'Category:Beehive Corner',
    viitehaku: 'Beehive Corner Adelaide Rundle Mall',
    viitesuosi: ['exterior', 'facade', 'corner', 'evening'],
    prompti: prompti(
      "Beehive Corner, the historic 1896 building at the corner of"
      + ' Rundle Mall and King William Street in Adelaide, at dusk',
      'an ornate Victorian corner building of pale sandstone with a'
      + ' rounded corner turret rising above the roofline, topped with'
      + ' a small domed cupola and a BEEHIVE-SHAPED finial and'
      + ' weathervane at its very top; tall arched upper-storey'
      + ' windows and ground-floor shopfronts with warm lit windows'
      + ' along both street frontages',
      "the paved pedestrian mall with its own lamp posts and shop"
      + ' lights coming on, a scatter of evening shoppers at human'
      + ' scale, and the lower heritage shopfronts of Rundle Mall'
      + ' receding along the street in the dusk light',
      VAKIO,
    ),
    selite: null,
  },
];
