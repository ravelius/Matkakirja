/*
 * HEROKUVATYÖLISTA, CHICAGO — VIITEKUVILLA (24.8.2026).
 *
 * MIKSI UUSIKSI. Chicagon kolme herokuvaa generoitiin kierroksella 20
 * (tools/hero-tyolista-20.mjs) ILMAN viitekuvia, eikä niitä ole
 * kytketty peliin. Uusi standardi on, että nimetty kohde ankkuroidaan
 * kohteen OMASTA Commons-kategoriasta haettuihin valokuviin
 * (docs/moduulit/viitekuvat.md). Kohteet ovat samat kuin kierroksella
 * 20: Wrigley Building, Marina City ja Buckinghamin suihkulähde.
 *
 * Yksikään ei ole Chicagon kaupunkilehden kansikuvana (vesitorni,
 * karjatarhojen portti, Millennium Park Nichols Bridgewaylta) eikä
 * avauskuvana (auringonnousu järveltä, näkymä 360 Chicagosta,
 * arkkitehtuuriristeily joella). Buckinghamin lähde on Grant Parkissa
 * eli eri puolella kuin lehden Millennium Park -kansikuva.
 *
 * Ajo (kohdekansio herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs chicago 0 3 herokoe
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä eikä kopioida.
 * Käytössä on OLETUS eli VAKIO (omistajan päätös 24.8.2026:
 * alkuperäinen korkeus ja etäisyys, dronemainen näkymä).
 *
 * MITTAKAAVA on Chicagossa erityisen tärkeä, koska vakioprompin
 * "towers large and dominant" osuu kaupunkiin, jossa naapurit ovat
 * aidosti pilvenpiirtäjiä. Wrigley Building oli 1920-luvulla korkea
 * mutta on nykyään ympäristöään matalampi, Marina Cityn tornit ovat
 * 179 metriä eli Loopin torneja matalampia, ja Buckinghamin lähde on
 * MAANTASAINEN — se ei kohoa lainkaan, ja jos malli tekee siitä
 * tornin, kuva on väärä.
 *
 * VIITEHAUN KUIVAHARJOITUS 24.8.2026 (kelvollisia kuvia, >=1000 px,
 * PD/CC0/CC BY/CC BY-SA):
 *   Wrigley Building   Category:Wrigley Building     42  portti aukeaa
 *   Marina City        Category:Marina City          40  portti aukeaa
 *   Buckinghamin lähde Category:Buckingham Fountain  43  portti aukeaa
 * Kaikki kolme tunnistuivat en-Wikipedian otsikosta Wikidatan kautta,
 * mutta VARMENNETTU KATEGORIA ANNETAAN SILTI KENTÄSSÄ `kategoria`.
 * Syy näkyi kuivaharjoituksessa: Wikidatan rajapinta vastasi kesken
 * erän 429:llä (liikaa pyyntöjä), jolloin tunnistus putosi
 * tekstihakuun ja generointiportti meni kiinni täysin kelvollisesta
 * kohteesta. Kun kategoria on kirjattu tähän, yksi verkkokutsu jää
 * pois eikä kiireinen Wikidata voi kaataa ajoa. `wiki` jätetään
 * näkyviin, koska se dokumentoi, mitä reittiä kategoria löytyi.
 *
 * FAKTAT tarkistettu en-Wikipediasta 24.8.2026 (Wrigley Building,
 * Marina City, Buckingham Fountain).
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ---- WRIGLEY BUILDING — Michigan Avenue, aamu. */
  {
    id: 'chicago-aamu',
    tiedosto: 'hero-chicago-aamu.png',
    kaupunki: 'Chicago',
    tarkkaKohde: true,
    wiki: 'Wrigley Building',
    kategoria: 'Category:Wrigley Building',
    viitehaku: 'Wrigley Building',
    /*
     * Suositus on tarkoituksella pitkä ja täsmällinen. Kategoriassa
     * on kymmeniä kuvia, joissa Wrigley Building on vain taustalla
     * (aiheena Trump Tower), ja lisäksi 1950-luvun valokuvia, joiden
     * metatietovuosi on latausvuosi eli näennäisen tuore. Pelkkä
     * 'wrigley' nosti niitä kärkeen; nämä nimenpätkät osuvat vain
     * niihin tiedostoihin, joissa rakennus on itse aiheena.
     */
    viitesuosi: ['wrigley bldg', 'wrigley building clock',
      'beyond wrigley building', 'wrigley building and tribune'],
    prompti: prompti(
      'the Wrigley Building on the north bank of the Chicago River at'
      + ' Michigan Avenue in early morning light',
      'a brilliant white office building in two joined towers clad from'
      + ' top to bottom in glazed terracotta, the taller southern tower'
      + ' stepping inward in setbacks to a slender crowned clock tower'
      + ' with a large clock face on each of its four sides, the lower'
      + ' northern tower beside it, and an open walkway bridging the'
      + ' gap between them; THE BUILDING IS TALL BUT NOT THE TALLEST'
      + ' THING IN THE PICTURE — it reaches about thirty storeys, and'
      + ' the modern glass skyscrapers standing directly behind and'
      + ' beside it rise far higher, so it reads as a bright white'
      + ' older tower at the foot of much bigger ones; low early'
      + ' morning sun from the east makes the white terracotta glow'
      + ' almost pink against the darker buildings behind',
      'the green water of the Chicago River directly below with a tour'
      + ' boat and a low bascule bridge at the corner, the camera'
      + ' standing on the river side so that the riverwalk railing, a'
      + ' flight of steps down to the water and a row of planters are'
      + ' in the foreground, early commuters crossing the bridge as'
      + ' small figures, the gothic crown of the newspaper tower across'
      + ' the avenue, the straight canyon of Michigan Avenue running'
      + ' north, and the dense ranks of downtown towers and the flat'
      + ' blue lake beyond',
      VAKIO,
    ),
    selite: 'Wrigley Building rakennettiin 1920–1924 purukumiyhtiö '
      + 'Wrigleyn pääkonttoriksi Michigan Avenuen varrelle, ja sen '
      + 'kirkkaanvalkoinen julkisivu on päällystetty terrakottalaatoilla.',
  },

  /* ---- MARINA CITY — Chicagojoen pohjoisranta, keskipäivä. */
  {
    id: 'chicago-keskipaiva',
    tiedosto: 'hero-chicago-keskipaiva.png',
    kaupunki: 'Chicago',
    tarkkaKohde: true,
    wiki: 'Marina City',
    kategoria: 'Category:Marina City',
    viitehaku: 'Marina City',
    /*
     * HUOM: Category:Marina City on osin roskainen — suuri osa
     * kuvista on otettu Trump Towerista tai kulkueista, ja tornit
     * ovat niissä vain taustalla. Kategorian omissa alakategorioissa
     * ei ole puhtaampaa joukkoa (rakennustyömaa, ravintolat,
     * näkymät torneista). Nämä kolme sanaa nostavat ne tiedostot,
     * joissa tornit ovat itse aiheena; kolme neljästä viitteestä
     * osuu silloin oikeaan rakennukseen.
     */
    viitesuosi: ['marina city', 'chicago river img', 'chicago modernism'],
    prompti: prompti(
      'the twin towers of Marina City on the north bank of the Chicago'
      + ' River at midday',
      'two identical round concrete apartment towers standing side by'
      + ' side, each 65 storeys and 179 metres high, their whole height'
      + ' ringed by continuous rows of scalloped, petal-shaped'
      + ' balconies so that the shafts look like fluted cobs of corn,'
      + ' the lowest twenty floors an open spiral parking ramp with cars'
      + ' visible inside, and a low platform at their feet with a small'
      + ' boat marina tucked underneath at river level; THE TOWERS ARE'
      + ' TALL BUT NOT EXCEPTIONAL HERE — the flat-topped office'
      + ' skyscrapers of the Loop rising directly across the river'
      + ' behind them are taller still, so the two round towers are'
      + ' distinctive by their shape rather than by their height; hard'
      + ' midday sun straight overhead throws a crisp shadow under'
      + ' every balcony so the shafts read as stacks of rings',
      'the green river running past the foot of the platform with a'
      + ' sightseeing boat and moored pleasure craft below, the camera'
      + ' standing on the opposite riverwalk so that a railing, café'
      + ' tables under umbrellas and a row of honey locusts are in the'
      + ' foreground, walkers and joggers along the water as small'
      + ' figures, the black steel and glass tower and the low bascule'
      + ' bridges beside them, and the canyon of the Loop with its'
      + ' elevated railway and the lake beyond',
      VAKIO,
    ),
    selite: 'Bertrand Goldbergin suunnitteleman Marina Cityn kaksi '
      + '179-metristä ja 65-kerroksista asuintornia avattiin '
      + 'Chicagojoen pohjoisrannalla 1963, ja korokkeen alla joen '
      + 'tasossa on pieni huvivenesatama, josta korttelin nimi tulee.',
  },

  /* ---- BUCKINGHAMIN SUIHKULÄHDE — Grant Park, ilta. */
  {
    id: 'chicago-ilta',
    tiedosto: 'hero-chicago-ilta.png',
    kaupunki: 'Chicago',
    tarkkaKohde: true,
    wiki: 'Buckingham Fountain',
    kategoria: 'Category:Buckingham Fountain',
    viitehaku: 'Buckingham Fountain',
    viitesuosi: ['buckingham fountain'],
    prompti: prompti(
      'Buckingham Fountain in the middle of Grant Park in Chicago at'
      + ' sunset',
      'a vast circular fountain of pink Georgia marble: a wide outer'
      + ' basin ringed by a low balustrade, four large bronze seahorses'
      + ' rearing out of the water at the compass points, and in the'
      + ' centre three stacked shallow bowls narrowing upward like a'
      + ' wedding cake, with a tall column of water jetting from the'
      + ' top and dozens of smaller jets arching inward from the rim;'
      + ' THE FOUNTAIN IS A LOW, WIDE, GROUND-LEVEL STRUCTURE, NOT A'
      + ' TOWER — the stone centrepiece is barely higher than the trees'
      + ' around the plaza, and only the central jet of water rises'
      + ' above them, so the fountain spreads sideways across the'
      + ' picture instead of reaching up; warm low sunset light from'
      + ' the west turns the spray gold and the wet marble pink while'
      + ' the first coloured lights come on inside the basin',
      'the wide paved plaza around the basin with flower beds, gravel'
      + ' paths, benches and rows of clipped trees, the camera standing'
      + ' on the plaza side so that the balustrade, a lamp standard and'
      + ' a bench are in the foreground, visitors walking around the'
      + ' rim and sitting on the steps as small figures, the long lawns'
      + ' and paths of the park stretching away, the whole wall of'
      + ' downtown skyscrapers rising along the western edge of the'
      + ' park and catching the last light, and the flat blue-grey'
      + ' expanse of Lake Michigan on the other side',
      VAKIO,
    ),
    selite: 'Grant Parkin keskellä seisova Buckinghamin suihkulähde '
      + 'vihittiin 1927 Kate S. Buckinghamin lahjoituksena, se tehtiin '
      + 'Versailles’n Latona-lähteen malliin, ja sen vesisuihkut ovat '
      + 'käytössä huhtikuun puolivälistä lokakuun puoliväliin.',
  },
];
