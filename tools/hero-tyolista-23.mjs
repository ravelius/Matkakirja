/*
 * HEROKUVATYÖLISTA 23 — Los Angeles, Montevideo, Havanna, Mexico City.
 *
 * Neljä kaupunkia, joilla on valmis kaupunkilehti mutta ei yhtään
 * herokuvaa. Kolme kohtaa kaupunkia kohti (aamu, keskipäivä, ilta) =
 * 12 kohtaa yhteensä. Kaikki 12 ovat `tarkkaKohde: true` -kohteita
 * PAITSI Mexico Cityn ilta (Xochimilco), joka on tietoisesti
 * viitteetön yleisnäkymä (kanavat ja chinampat — ei yhtä nimettyä
 * rakennusta, joten `tarkkaKohde`-merkintä ei sovi siihen).
 *
 * KAIKKI KATEGORIAT ON MITATTU KÄSIN 24.8.2026 tools/hae-viitekuvat.mjs
 * -työkalulla (NODE_USE_ENV_PROXY=1), ei arvattu. Yksi arvaus epäonnistui
 * (ks. Havanna/El Capitolio alla) — löytyi lopulta Commonsin
 * list=search-rajapinnalla kategorianimiavaruudesta.
 *
 * ------------------------------------------------------------------
 * KANSIKUVAT JA AVAUSKUVAT TARKISTETTU — näitä aiheita EI käytetä
 * ------------------------------------------------------------------
 * Tarkistettu js/packs/kulttuuri-kategoriat.js:stä (kohdat losangeles,
 * montevideo, havanna, mexico) 24.8.2026.
 *
 * LOS ANGELES — kaikki kuusi ovat laajoja yleisnäkymiä ilman yhtä
 * nimettyä pääkohdetta, PAITSI kaksi: avauskuva 2 ("Los Angeles from
 * Hollywood Hills") nimeää Griffith Observatoryn näkyvänä kohteena
 * kuvatekstissä, ja avauskuva 3 on suoraan Port of Los Angelesin
 * ilmakuva. Molemmat siis ohitettu. Lisäksi Hollywood-kyltti ja
 * Paramount Pictures ohitettiin tietoisesti Raamatun pilari 3 -säännön
 * takia (LA: "ei julkkiskulttuuria") vaikka kumpikaan ei ole
 * kansi-/avauskuva.
 *   → Valittu: Union Station, Watts Towers, Getty Center — yksikään
 *     ei esiinny kansikuvissa/avauskuvissa eikä liity julkkiskulttuuriin.
 *
 * MONTEVIDEO — kaikki kuusi (3 kansikuvaa, 3 avauskuvaa) ovat laajoja
 * ilma-/rantanäkymiä ilman yhtä nimettyä rakennusta (Ciudad Vieja
 * ilmasta, keskusta Ramblalta, Montevideo ilmasta; Cerron
 * näköalapaikka, Montevideo ilmasta, Rambla-näkymä 2017). Yksikään
 * kolmesta valitusta kohteesta ei esiinny niissä.
 *   → Valittu: Palacio Salvo, Estadio Centenario, Teatro Solís.
 *
 * HAVANNA — tässä oli oikeasti jotain vältettävää. Kansikuva 1 ON
 * Malecón itse ("Malecónin rantaväylä kaartaa Centro Habanan
 * editse") — tehtävänannon oma esimerkki Malecónista ei siis kelpaa
 * heroaiheeksi, koska se on jo kaupunkilehden kansikuva. Kansikuva 2
 * on Plaza Viejan siirtomaa-ajan palatsirivistö yleiskuvana, kansikuva
 * 3 satamanäkymä La Cabañan valleilta. Avauskuva 1 on kuvattu Castillo
 * del Morron valleilta (näkymä, ei linna itse, mutta kamera SEISOO
 * siellä — liian lähellä samaa aihetta), avauskuva 2 vastaavasti La
 * Cabañan kukkulalta, ja avauskuva 3 nimeää Hotel Nacionalin ja
 * Vedadon tornitalot auringonlaskussa.
 *   → Valittu: El Capitolio, Castillo de la Real Fuerza (ERI linnoitus
 *     kuin avauskuvien Morro/La Cabaña), University of Havana. Malecón
 *     jää siis pois vaikka tehtävänanto sen mainitsee esimerkkinä —
 *     kupolinsa peruskorjauksen jälkeinen El Capitolio toteuttaa saman
 *     "arvokas nykykaupunki" -hengen ilman päällekkäisyyttä.
 *
 * MEXICO CITY — kansikuvat ovat Zócalo, Reforma-bulevardin siluetti ja
 * Chapultepecin linna; avauskuvat ovat yleisnäkymä Torre
 * Latinoamericana näkyvissä, tulivuorinäkymä ja näkymä Torre
 * Latinoamericanalta. Chapultepecin linna on siis suoraan pois
 * (kansikuva 3), samoin Torre Latinoamericana (nimetty kahdessa
 * avauskuvassa kolmesta).
 *   → Valittu: Templo Mayor, Uusi Guadalupen basilika (ERI rakennus
 *     kuin lehden nostossa esiintyvä VANHA basilika), Xochimilco
 *     (yleisnäkymä, ei tarkkaKohde).
 *
 * ------------------------------------------------------------------
 * MITATUT KATEGORIAT (tools/hae-viitekuvat.mjs, NODE_USE_ENV_PROXY=1,
 * 24.8.2026) — portin raja on 2, kaikki alla reilusti yli
 * ------------------------------------------------------------------
 *   Union Station (LA)        Category:Union Station (Los Angeles)          47
 *   Watts Towers               Category:Watts Towers                        28
 *   Getty Center                Category:Getty Center                       26
 *   Palacio Salvo                Category:Palacio Salvo                     50
 *   Estadio Centenario            Category:Estadio Centenario               40
 *   Teatro Solís                   Category:Teatro Solís (Montevideo)       48
 *   El Capitolio                    Category:El Capitolio, La Habana        42
 *   Castillo de la Real Fuerza        Category:Castillo de la Real Fuerza de La Habana  46
 *   University of Havana              Category:University of Havana        41
 *   Templo Mayor                       Category:Templo Mayor - Main Pyramid 45
 *   Uusi Guadalupen basilika             Category:Nueva Basílica de Nuestra Señora de Guadalupe  9
 * Kaikki tunnistuivat suoraan `--wiki`-lipulla (en-Wikipedian otsikosta
 * Wikidatan kautta) PAITSI El Capitolio: Wikidata ei antanut
 * commonswiki-sitelinkiä eikä P373:a millään kokeillulla otsikolla
 * ("El Capitolio", "National Capitol Building (Havana)"), ja pelkkä
 * arvaus kategorianimestä epäonnistui kolmesti (Category:El Capitolio,
 * Category:El Capitolio (Havana), Category:El Capitolio de La Habana —
 * kaikki "missing", sama sudenkuoppa kuin Oodilla/Petralla/Damaskoksella).
 * Oikea nimi löytyi Commonsin list=search-rajapinnalla kategoria-
 * nimiavaruudesta (srnamespace=14, haku "Capitolio Habana"):
 * Category:El Capitolio, La Habana. Kategoria annetaan siis käsin
 * kentässä `kategoria`, ja `wiki`-kenttä jätetään pois kokonaan tästä
 * kohdasta, koska se ei johtaisi mihinkään.
 *
 * KUVAKULMA tuodaan tools/hero-kuvakulmat.mjs:stä (VAKIO, omistajan
 * oletus). Jokaiseen kuvaukseen on kirjoitettu auki todellinen
 * mittakaava ISOILLA KIRJAIMILLA, koska VAKIO-prompti sanoo kohteen
 * olevan "large and dominant" ja malli liioittelee sitä — sama korjaus
 * kuin Vancouver-erässä (tools/hero-tyolista-vancouver.mjs).
 *
 * Ajo (kohdekansio esim. herokoe/):
 *   NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
 *     node tools/hero-ajuri.mjs 23 0 12 herokoe
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ================================================================
   * LOS ANGELES
   * ================================================================ */

  /* ---- UNION STATION — downtown, aamu. */
  {
    id: 'losangeles-aamu',
    tiedosto: 'hero-losangeles-aamu.png',
    kaupunki: 'Los Angeles',
    tarkkaKohde: true,
    wiki: 'Los Angeles Union Station',
    kategoria: 'Category:Union Station (Los Angeles)',
    viitehaku: 'Los Angeles Union Station',
    viitesuosi: ['union station', 'exterior', 'tower', 'facade'],
    prompti: prompti(
      'Los Angeles Union Station in downtown Los Angeles in the early'
      + ' morning',
      'a long, low train station building of cream-coloured stucco'
      + ' walls under red clay tile roofs, blending Mission Revival'
      + ' and Streamline Moderne styles: a tall square clock tower'
      + ' with a pyramidal tiled cap rises at one corner, the main'
      + ' facade has a row of tall arched windows and doors beneath a'
      + ' stepped parapet, and smooth rounded corners and mission-style'
      + ' ornament run along the roofline; THE BUILDING IS LONG AND'
      + ' HORIZONTAL, ONLY A FEW STOREYS HIGH, NOT A SKYSCRAPER — it'
      + ' spreads wide and low rather than rising tall, with the clock'
      + ' tower as its only vertical accent',
      'the palm-lined forecourt and taxi drop-off directly in front'
      + ' with early commuters and a bus at a stop, the camera'
      + ' standing at the edge of the plaza so that a row of palm'
      + ' trees and a low wall are in the foreground, and the office'
      + ' towers of downtown Los Angeles rising in soft morning haze'
      + ' beyond the station roof',
      VAKIO,
    ),
    selite: 'Union Station avattiin 1939 ja yhdistää Mission Revival- ja '
      + 'Streamline Moderne -tyylejä; se on yhä Yhdysvaltain länsiosien '
      + 'suurin matkustajarautatieterminaali.',
  },

  /* ---- WATTS TOWERS — South LA, keskipäivä. */
  {
    id: 'losangeles-keskipaiva',
    tiedosto: 'hero-losangeles-keskipaiva.png',
    kaupunki: 'Los Angeles',
    tarkkaKohde: true,
    wiki: 'Watts Towers',
    kategoria: 'Category:Watts Towers',
    viitehaku: 'Watts Towers',
    viitesuosi: ['watts towers', 'exterior', 'spire', 'tower'],
    prompti: prompti(
      'the Watts Towers folk-art sculpture in the Watts neighbourhood'
      + ' of South Los Angeles at midday',
      'seventeen slender, tapering spires built of steel rebar wrapped'
      + ' in wire mesh and hand-applied mortar, their entire surface'
      + ' embedded with a dense mosaic of broken tile, pottery shards,'
      + ' sea shells and pieces of coloured glass that sparkle in the'
      + ' sun, the tallest spire narrowing to an open, lace-like point;'
      + ' the towers stand linked by curving mortar walls and arches'
      + ' within a small fenced yard; THE TOWERS ARE THIN, HANDMADE AND'
      + ' OPENWORK, NOT A SOLID OR SYMMETRICAL BUILDING — each one a'
      + ' slightly different height and shape, rising directly out of a'
      + ' modest residential yard',
      'the low single-storey houses, power lines and palm trees of the'
      + ' surrounding Watts neighbourhood at street level, a chain-link'
      + ' fence and a few visitors at human scale near the base, and'
      + ' the flat sprawl of South Los Angeles stretching away under'
      + ' the midday sun with the San Gabriel Mountains pale in the'
      + ' distant haze',
      VAKIO,
    ),
    selite: 'Italialaissyntyinen rakennustyöläinen Simon Rodia rakensi '
      + 'Watts Towersin omin käsin vuosina 1921–1955 talonsa takapihalle.',
  },

  /* ---- GETTY CENTER — Brentwood, ilta. */
  {
    id: 'losangeles-ilta',
    tiedosto: 'hero-losangeles-ilta.png',
    kaupunki: 'Los Angeles',
    tarkkaKohde: true,
    wiki: 'Getty Center',
    kategoria: 'Category:Getty Center',
    viitehaku: 'Getty Center',
    viitesuosi: ['getty center', 'exterior', 'aerial', 'hilltop'],
    prompti: prompti(
      'the Getty Center museum complex on its hilltop in Brentwood, Los'
      + ' Angeles, at sunset',
      'a cluster of angular modern pavilions clad in rough cream-white'
      + ' travertine stone blocks on their lower walls and smooth'
      + ' curved off-white metal panels above, linked by open'
      + ' walkways, terraces and a central garden courtyard, with flat'
      + ' and gently curved rooflines and no domes, spires or towers'
      + ' of any kind; THE COMPLEX IS A LOW, HORIZONTAL GROUP OF'
      + ' GEOMETRIC BUILDINGS SPREAD ACROSS THE HILLTOP, NOT ONE TALL'
      + ' STRUCTURE — its silhouette is stacked rectangular and curved'
      + ' volumes rather than a single tower',
      'the terraced gardens and stone plazas immediately around the'
      + ' buildings with a few evening visitors, the camera standing at'
      + ' the edge of a terrace so that a stone balustrade and clipped'
      + ' hedges are in the foreground, and the whole Los Angeles basin'
      + ' spreading out far below toward the Pacific, its grid of'
      + ' lights beginning to switch on under an orange sunset sky',
      VAKIO,
    ),
    selite: 'Richard Meierin suunnittelema Getty Center avattiin 1997 '
      + 'Brentwoodin kukkulalle, ja sen kokoelmat tavoittaa vain '
      + 'raitiovaunulla mäen juurelta.',
  },

  /* ================================================================
   * MONTEVIDEO
   * ================================================================ */

  /* ---- PALACIO SALVO — Plaza Independencia, aamu. */
  {
    id: 'montevideo-aamu',
    tiedosto: 'hero-montevideo-aamu.png',
    kaupunki: 'Montevideo',
    tarkkaKohde: true,
    wiki: 'Palacio Salvo',
    kategoria: 'Category:Palacio Salvo',
    viitehaku: 'Palacio Salvo',
    viitesuosi: ['palacio salvo', 'exterior', 'tower', 'facade'],
    prompti: prompti(
      'the Palacio Salvo tower on Plaza Independencia in downtown'
      + ' Montevideo in the early morning',
      'a tall eclectic-style reinforced-concrete tower of pale'
      + ' grey-beige render, twenty-seven storeys rising in a series of'
      + ' stepped setbacks, its lower floors an ornate street-level'
      + ' facade of shops and balconies on the plaza corner, the shaft'
      + ' studded with small balconies and round-arched windows, and'
      + ' the tower narrowing near the top into a slender section'
      + ' capped by a pointed dome with a thin antenna mast above it;'
      + ' THE SILHOUETTE IS DISTINCTLY STEPPED AND TAPERING, NOT A'
      + ' PLAIN GLASS SKYSCRAPER — it reads as an ornate, tiered older'
      + ' tower at a street corner, not a smooth modern high-rise',
      'the open paved expanse of Plaza Independencia directly below'
      + ' with its central equestrian statue and a few early'
      + ' pedestrians, the camera standing at the edge of the plaza so'
      + ' that a park bench and a row of trees are in the foreground,'
      + ' and the low rooftops of Ciudad Vieja stretching toward the'
      + ' harbour on one side and the avenues of central Montevideo on'
      + ' the other in soft morning light',
      VAKIO,
    ),
    selite: 'Palacio Salvo valmistui 1928 Plaza Independencian kulmaan; '
      + '105-metrisenä se oli hetken maailman korkein raudoitetusta '
      + 'betonista tehty rakennus.',
  },

  /* ---- ESTADIO CENTENARIO — Parque Batlle, keskipäivä. */
  {
    id: 'montevideo-keskipaiva',
    tiedosto: 'hero-montevideo-keskipaiva.png',
    kaupunki: 'Montevideo',
    tarkkaKohde: true,
    wiki: 'Estadio Centenario',
    kategoria: 'Category:Estadio Centenario',
    viitehaku: 'Estadio Centenario',
    viitesuosi: ['estadio centenario', 'exterior', 'stadium', 'torre'],
    prompti: prompti(
      'the Estadio Centenario football stadium in Parque Batlle,'
      + ' Montevideo, at midday',
      'a large open-topped concrete bowl stadium with tiered rows of'
      + ' pale blue-grey seating wrapping around a green pitch, its'
      + ' concrete structure weathered and utilitarian rather than'
      + ' sleek, and beside it a tall slender rectangular concrete'
      + ' tower, the Torre de los Homenajes, rising well above the'
      + ' stands with a flagpole at its summit; THE STADIUM HAS NO ROOF'
      + ' OR DOME OVER THE PITCH — it is an open concrete bowl, and the'
      + ' tower stands apart from it as a separate freestanding'
      + ' vertical landmark, not part of the stand structure',
      'the green lawns, footpaths and mature trees of Parque Batlle'
      + ' surrounding the stadium with a few people walking and'
      + ' cycling at midday, the camera standing among the park trees'
      + ' so that leafy branches and a paved path are in the'
      + ' foreground, and the low residential rooftops of the'
      + ' surrounding neighbourhood spreading toward the horizon under'
      + ' a bright midday sky',
      VAKIO,
    ),
    selite: 'Estadio Centenario nousi Parque Batlleen 1929–1930 '
      + 'ensimmäisiä jalkapallon MM-kisoja varten, ja se oli maailman '
      + 'ensimmäinen MM-kisastadion.',
  },

  /* ---- TEATRO SOLÍS — Ciudad Vieja, ilta. */
  {
    id: 'montevideo-ilta',
    tiedosto: 'hero-montevideo-ilta.png',
    kaupunki: 'Montevideo',
    tarkkaKohde: true,
    wiki: 'Solís Theatre',
    kategoria: 'Category:Teatro Solís (Montevideo)',
    viitehaku: 'Teatro Solis Montevideo',
    viitesuosi: ['teatro solis', 'exterior', 'facade', 'fachada'],
    prompti: prompti(
      'the Teatro Solís theatre on Plaza Independencia in Ciudad Vieja,'
      + ' Montevideo, at dusk',
      'a neoclassical theatre building of pale cream stone with a'
      + ' projecting colonnaded portico of tall round columns'
      + ' supporting a triangular pediment carved with a sunburst'
      + ' motif, three large arched entrances at street level with warm'
      + ' light spilling out, and a low symmetrical facade only a few'
      + ' storeys high running along the square; THE BUILDING IS LOW,'
      + ' FLAT-FRONTED AND CLASSICAL — a columned portico and pediment'
      + ' on a modest three-storey facade, not a tall tower or a modern'
      + ' glass structure',
      'the paved square in front with a scatter of evening visitors and'
      + ' café tables, the camera standing across the square so that a'
      + ' lamppost and the edge of a fountain are in the foreground,'
      + ' and the surrounding low rooftops and balconied facades of'
      + ' Ciudad Vieja fading into the blue dusk sky with the first'
      + ' street lights coming on',
      VAKIO,
    ),
    selite: 'Teatro Solís valmistui 1856, viisitoista vuotta '
      + 'rakennustöiden alkamisen jälkeen, ja on yksi Etelä-Amerikan '
      + 'vanhimmista teattereista.',
  },

  /* ================================================================
   * HAVANNA
   * ================================================================ */

  /* ---- EL CAPITOLIO — Centro Habana, aamu. Kategoria käsin (ks. */
  /* alkukommentti) — wiki-kenttä jätetty pois, koska se ei johda */
  /* mihinkään Wikidatan kautta. */
  {
    id: 'havanna-aamu',
    tiedosto: 'hero-havanna-aamu.png',
    kaupunki: 'Havanna',
    tarkkaKohde: true,
    kategoria: 'Category:El Capitolio, La Habana',
    viitehaku: 'El Capitolio Havana',
    viitesuosi: ['capitolio', 'exterior', 'dome', 'facade'],
    prompti: prompti(
      'El Capitolio in Centro Habana, Havana, in the early morning',
      'a monumental former parliament building of pale cream-white'
      + ' limestone, its facade dominated by a wide colonnaded portico'
      + ' of tall columns reached by a broad flight of steps flanked by'
      + ' two large bronze lion sculptures, and directly behind the'
      + ' portico a tall, ribbed dome rising in tiers to a pointed'
      + ' lantern; symmetrical wings with their own smaller columned'
      + ' porticos extend to either side; THE DOME HAS BEEN FRESHLY'
      + ' RESTORED AND IS CLEAN, BRIGHT AND UNWEATHERED — NO CRACKS, NO'
      + ' STREAKING, NO SCAFFOLDING — its stone gleaming pale gold in'
      + ' the morning sun',
      'the wide Paseo del Prado boulevard and its median gardens'
      + ' directly in front, with a few early pedestrians and a'
      + ' restored, freshly painted vintage American car parked at the'
      + ' kerb, the camera standing at the edge of the boulevard so'
      + ' that a stone bench and a laurel tree are in the foreground,'
      + ' and the tightly packed, freshly painted rooftops and'
      + ' balconies of Centro Habana stretching away on either side'
      + ' under clear morning light',
      VAKIO,
    ),
    selite: 'El Capitolio valmistui 1929 entiseksi parlamenttitaloksi, ja '
      + 'sen kupoli merkitsee työläiskaupunginosa Centro Habanan alkua.',
  },

  /* ---- CASTILLO DE LA REAL FUERZA — Habana Vieja, keskipäivä. */
  {
    id: 'havanna-keskipaiva',
    tiedosto: 'hero-havanna-keskipaiva.png',
    kaupunki: 'Havanna',
    tarkkaKohde: true,
    wiki: 'Castillo de la Real Fuerza',
    kategoria: 'Category:Castillo de la Real Fuerza de La Habana',
    viitehaku: 'Castillo de la Real Fuerza Havana',
    viitesuosi: ['real fuerza', 'exterior', 'fortress', 'castillo'],
    prompti: prompti(
      'the Castillo de la Real Fuerza fortress on the harbour front of'
      + ' Old Havana at midday',
      'a low, square stone fortress with thick sloped walls of pale'
      + ' grey-tan coral limestone rising directly from a dry moat, its'
      + ' corners built out into pointed angular bastions, a stone'
      + ' bridge crossing the moat to the main gate, and at one corner'
      + ' a slender square watchtower rising above the ramparts, topped'
      + ' by a small bronze weathervane statue of a woman in flowing'
      + ' robes — La Giraldilla, the city\'s emblem — turning against'
      + ' the sky; THE FORTRESS IS LOW AND SQUAT WITH SLOPING WALLS,'
      + ' NOT A TALL CASTLE — only the single corner tower with the'
      + ' weathervane rises higher than the ramparts, and the intact'
      + ' coral stone shows weathering but no crumbling or ruin',
      'the cobbled waterfront plaza and harbour wall directly in front'
      + ' with a few visitors at human scale, the camera standing at'
      + ' the edge of the plaza so that a mooring bollard and the'
      + ' harbour railing are in the foreground, and the calm blue'
      + ' water of Havana Bay opening out beyond the fortress with the'
      + ' colonial rooftops of Old Havana crowding the shoreline under'
      + ' a bright midday sun',
      VAKIO,
    ),
    selite: 'Real Fuerza valmistui 1577 rantakalliosta louhituin vinoin '
      + 'muurein; sen huipulla kääntyvä Giraldilla-tuuliviiri on '
      + 'Havannan tunnus.',
  },

  /* ---- UNIVERSITY OF HAVANA — Vedado, ilta. */
  {
    id: 'havanna-ilta',
    tiedosto: 'hero-havanna-ilta.png',
    kaupunki: 'Havanna',
    tarkkaKohde: true,
    wiki: 'University of Havana',
    kategoria: 'Category:University of Havana',
    viitehaku: 'University of Havana',
    viitesuosi: ['universidad', 'escalinata', 'exterior', 'staircase'],
    prompti: prompti(
      'the main staircase and Rectory of the University of Havana on'
      + ' its hilltop campus in Vedado at sunset',
      'a broad outdoor stone staircase, the Escalinata, climbing'
      + ' between two rows of tall neoclassical columns toward a wide'
      + ' upper plaza, with a bronze statue of a seated woman with'
      + ' outstretched arms, the Alma Mater, at the foot of the steps;'
      + ' at the top of the staircase stands the columned facade of the'
      + ' Rectory building in pale cream stone with a triangular'
      + ' pediment; THE COMPLEX IS AN OPEN OUTDOOR STAIRCASE AND'
      + ' COLONNADED PLAZA ON A HILLSIDE, NOT AN ENCLOSED BUILDING —'
      + ' the steps and columns are exposed to the sky, climbing the'
      + ' slope in a straight monumental axis',
      'the leafy streets of Vedado at the foot of the hill with a few'
      + ' students and evening pedestrians as small figures on the'
      + ' steps, the camera standing at street level so that a'
      + ' wrought-iron lamppost and a low garden wall are in the'
      + ' foreground, and the rooftops of Vedado spreading toward the'
      + ' sea under a warm orange sunset sky',
      VAKIO,
    ),
    selite: 'Yliopiston Escalinata-portaikon juurella seisova Alma '
      + 'Mater -patsas on yksi Havannan tunnetuimmista symboleista.',
  },

  /* ================================================================
   * MEXICO CITY
   * ================================================================ */

  /* ---- TEMPLO MAYOR — Centro Histórico, aamu. */
  {
    id: 'mexico-aamu',
    tiedosto: 'hero-mexico-aamu.png',
    kaupunki: 'Mexico City',
    tarkkaKohde: true,
    wiki: 'Templo Mayor',
    kategoria: 'Category:Templo Mayor - Main Pyramid',
    viitehaku: 'Templo Mayor',
    viitesuosi: ['templo mayor', 'exterior', 'ruins', 'excavation'],
    prompti: prompti(
      'the excavated ruins of the Templo Mayor archaeological site in'
      + ' the historic centre of Mexico City in the early morning',
      'a sunken open-air excavation, its floor lying several metres'
      + ' BELOW the level of the surrounding modern streets, exposing'
      + ' the stacked stone foundations and stepped platforms of'
      + ' several overlapping temple-pyramid phases built one over'
      + ' another, their grey volcanic stone walls and worn stairways'
      + ' laid out in a maze of low rectangular platforms and narrow'
      + ' walkways with metal railings for visitors; THIS IS A SUNKEN,'
      + ' PARTLY-RUINED EXCAVATED FOUNDATION, NOT A TALL STANDING'
      + ' PYRAMID — nothing rises higher than a few metres above the'
      + ' excavation floor, there is no intact pyramid silhouette and'
      + ' no single tall structure, only the low stone footprint of the'
      + ' vanished temple seen from above',
      'the modern paving and iron railings at the edge of the'
      + ' excavation in the foreground with a handful of early visitors'
      + ' as small distant figures, grey stone colonial buildings'
      + ' standing close beside the site, and the busy streets of the'
      + ' historic centre crowding around the excavation under soft'
      + ' morning light',
      VAKIO,
    ),
    selite: 'Sähköyhtiön työntekijät löysivät Templo Mayorin '
      + 'kaivauspaikan sattumalta 1978; se on esillä katutasoa alempana '
      + 'aivan katedraalin vieressä.',
  },

  /* ---- UUSI GUADALUPEN BASILIKA — Villa de Guadalupe, keskipäivä. */
  {
    id: 'mexico-keskipaiva',
    tiedosto: 'hero-mexico-keskipaiva.png',
    kaupunki: 'Mexico City',
    tarkkaKohde: true,
    wiki: 'Basilica of Our Lady of Guadalupe',
    kategoria: 'Category:Nueva Basílica de Nuestra Señora de Guadalupe',
    viitehaku: 'Basilica of Our Lady of Guadalupe new',
    viitesuosi: ['basilica', 'nueva', 'exterior', 'roof'],
    prompti: prompti(
      'the New Basilica of Our Lady of Guadalupe in the Villa de'
      + ' Guadalupe district of Mexico City at midday',
      'a large modern circular building shaped like a wide, shallow'
      + ' tent, its huge sweeping roof of dark bronze-green metal'
      + ' panels rising in folded pleats from a low circular drum of'
      + ' pale concrete and glass to a small central point, with no'
      + ' walls in the traditional sense — the whole building reads as'
      + ' one continuous curved roof spreading close to the ground over'
      + ' an enormous circular footprint; THIS IS A ROUND, TENT-SHAPED'
      + ' MODERN STRUCTURE WITH NO BELL TOWERS, NO DOME AND NO'
      + ' CLASSICAL FACADE — it must not look like a traditional'
      + ' colonial church, it is a single wide low modern canopy roof',
      'the vast paved atrium in front, filled with pilgrims and'
      + ' visitors as small distant figures crossing the open plaza,'
      + ' the camera standing at the edge of the atrium so that a metal'
      + ' railing and a flagstone path are in the foreground, and the'
      + ' hills of the Villa de Guadalupe rising pale behind everything'
      + ' under the bright midday sun',
      VAKIO,
    ),
    selite: 'Arkkitehti Pedro Ramírez Vázquezin suunnittelema uusi '
      + 'basilika valmistui 1976 ja mahtuu sisälle noin 10 000 '
      + 'pyhiinvaeltajaa.',
  },

  /* ---- XOCHIMILCO — kanavat ja chinampat, etelä, ilta. YLEISNÄKYMÄ: */
  /* ei nimettyä yksittäistä rakennusta, joten ei tarkkaKohde-merkintää */
  /* eikä viitekuvia (ks. hero-ajuri.mjs). Enintään yksi tällainen per */
  /* kaupunki (tehtävänannon sääntö) — tämä on Mexico Cityn ainoa. */
  {
    id: 'mexico-ilta',
    tiedosto: 'hero-mexico-ilta.png',
    kaupunki: 'Mexico City',
    prompti: prompti(
      'the floating gardens and canals of Xochimilco in southern Mexico'
      + ' City at sunset',
      'a wide artificial canal of calm brown-green water running'
      + ' between narrow rectangular chinampa garden plots dense with'
      + ' crop rows and rows of tall willow trees along the banks;'
      + ' several brightly painted wooden trajinera boats with arched'
      + ' canvas awnings and hand-painted flower names glide along the'
      + ' waterway, poled by boatmen standing at the stern; THE SCENE IS'
      + ' A FLAT NETWORK OF NARROW CANALS AND LOW GARDEN ISLANDS, NOT A'
      + ' SINGLE BUILDING OR LANDMARK — the horizon is made of reeds,'
      + ' willows and canal water stretching into the distance',
      'reeds and canal-side plants close to the camera in the'
      + ' foreground, more canals and chinampas receding in a maze'
      + ' toward the horizon, a few distant trajineras and small'
      + ' figures on the far banks, and the low hills of the Valley of'
      + ' Mexico fading into golden evening haze',
      VAKIO,
    ),
    selite: 'Xochimilcon kanavat ja chinampa-viljelysaaret ovat aztekien '
      + 'ajalta säilynyt viljelyjärjestelmä, jota käytetään yhä.',
  },
];
