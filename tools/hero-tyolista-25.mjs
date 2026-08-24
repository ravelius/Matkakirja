/*
 * Herokuvien TYÖLISTA 25: Hobart, Darwin ja Port Moresby.
 *
 * Kaikilla kolmella on valmis kaupunkilehti mutta ei yhtään
 * herokuvaa. Kolme kohtaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * eri pääkohde ja eri puoli kaupunkia joka kerta. Kuvakulma on aina
 * VAKIO (tools/hero-kuvakulmat.mjs) — omistajan päättämä oletus.
 *
 * ------------------------------------------------------------------
 * OHITETUT AIHEET (jo lehden kansikuvana tai avauskuvana
 * js/packs/kulttuuri-kategoriat.js:ssä — hero ei saa toistaa niitä,
 * ks. tools/hero-ajuri.mjs:n VIITEKUVAT-osio)
 * ------------------------------------------------------------------
 *
 * Hobart (kansikuvat: kunanyi/Mt Wellington -näkymä keskustasta,
 * Constitution Dock, Tasman Bridge Rosny Lookoutilta; avauskuvat:
 * Hobart idästä kattojen yli, Hobart ja Mt Wellington, Salamanca
 * Place katutasolta) → valittiin sen sijaan Theatre Royal, Cascade
 * Brewery ja MONA — mikään ei esiinny kummassakaan listassa eikä
 * toista Wellingtoninvuoren tai Salamanca Placen omaa aihetta.
 *
 * Darwin (kansikuvat: Darwin CBD, Darwin Waterfront, Mindil Beach;
 * avauskuvat: Darwinin muuttuva siluetti, East Point -näkymä
 * satamansuulle, rantakallio Coast off Darwin) → valittiin
 * Government House, Fannie Bay Gaol ja Christ Church Cathedral —
 * kolme eri kaupunginosaa (Esplanadi, Fannie Bay, Smith Street),
 * ei yhtään jo kuvattua yleisnäkymää.
 *
 * Port Moresby (kansikuvat: Town/Paga-kukkula-siluetti, Ela Beach,
 * kaupunki kukkuloiden välissä; avauskuvat: satama hämärässä,
 * Konedobu-näkymä, ilmakuva rannikosta) → valittiin National
 * Parliament (Waigani), Jacksons International Airport ja Boroko
 * (viitteetön katunäkymä) — kolme eri kaupunginosaa.
 *
 * ------------------------------------------------------------------
 * VIITEKATEGORIAT — käsin todennettu 24.8.2026 Commonsin
 * categorymembers-rajapinnasta (NODE_USE_ENV_PROXY=1) ja JOKAINEN
 * käytetty tiedosto on lisäksi katsottu silmin 700 px:n esikatseluna
 * ennen valintaa. Kategorianimet haettu joko Commonsin omalla
 * otsikkohaulla tai suoraan faktapohjatiedostoista, EI arvattu.
 * ------------------------------------------------------------------
 *   Category:Theatre Royal, Hobart            7 kelvollista kuvaa
 *   Category:Cascade Brewery                 12 kelvollista kuvaa
 *   Category:MONA                            48 kelvollista kuvaa
 *     (HUOM: arvattava "Category:Museum of Old and New Art" on
 *     KÄYTÄNNÖSSÄ TYHJÄ omalle sisällölleen — Commonsin oma nimi on
 *     lyhyt "Category:MONA". Sama sudenkuoppa kuin Oodilla, Petran
 *     kuningashaudoilla ja Damaskoksen linnoituksella.)
 *   Category:Government House, Darwin        14 kelvollista kuvaa
 *   Category:Fannie Bay Goal                  8 kelvollista kuvaa
 *     (HUOM: arvattava "Category:Fannie Bay Gaol" — oikea englannin
 *     sana vankilalle — EI OLE OLEMASSA Commonsissa. Kategorian nimi
 *     periytyy Commonsin omasta, vuosia vanhasta kirjoitusvirheestä
 *     "Goal". Yksi kuva neljästä on tienviitta eikä rakennus; silmin
 *     tarkistettu kolme muuta ovat aitoja vankilarakennuskuvia.)
 *   Category:Christ Church Cathedral, Darwin 15 kelvollista kuvaa
 *   Category:National Parliament of Papua New Guinea
 *                                              6 kelvollista kuvaa
 *     LUOTETTAVUUSVARAUS: kategoria on käytännössä poliittinen
 *     yleiskategoria, ei rakennuksen oma kuvakategoria. Silmin
 *     katsotuista kuvista KAKSI esittää itse parlamenttitaloa
 *     (1991-matkakuva ja pystykuva pääsisäänkäynnin mosaiikista, jonka
 *     edessä seisoo yksi ihminen) — ne riittävät juuri ja juuri
 *     porttiin (2/2). Ajurin todellisilla parametreilla ajettu
 *     kuivaharjoitus (tools/hae-viitekuvat.mjs, maara=4) nostaa lisäksi
 *     kategorian ALAKATEGORIOISTA (mm. "Members of the National
 *     Parliament of Papua New Guinea") kaksi henkilökuvaa neljän
 *     viitteen joukkoon — tiedossa oleva, ei korjattavissa työlistan
 *     tasolla; kirjoittaja/kuvantarkistaja voi tarvittaessa siivota
 *     lähdelokista ylimääräiset viitteet ennen julkaisua.
 *   Category:Jacksons International Airport   5 kelvollista kuvaa
 *     LUOTETTAVUUSVARAUS: samasta syystä kuin yllä. KAKSI silmin
 *     katsottua kuvaa neljästä on valtiovierailu-/diplomaattikuvia
 *     lentokentältä, ei terminaalirakennuksesta. KOLME aitoa
 *     terminaalikuvaa on olemassa (mm. "Port Moresby Intl Airport
 *     2008.jpg", jossa terminaalin PNG-koristefriisi ja PORT MORESBY
 *     INTERNATIONAL AIRPORT -kyltti näkyvät selvästi), ja ajurin
 *     kuivaharjoitus valitsi niistä kaksi + kaksi diplomaattikuvaa —
 *     sama tunnettu rajoitus kuin yllä.
 *
 * HYLÄTYT KOHTEET (Port Moresby, kuvapulan tai herkkyyden takia —
 * ks. tehtävänannon vaatimus raportoida rehellisesti):
 *   - PNG National Museum "Haus Tumbuna" (Category:Museums in Papua
 *     New Guinea sisältää yhden aidon kuvan, "Papua New Guinea
 *     National Museum May 2015.jpg" — hyvä kuva sinänsä, mutta
 *     museo on vain n. 300 m parlamenttitalosta samalla Waiganin
 *     tontilla, joten se ei olisi tuonut "eri puoli kaupunkia"
 *     -vaatimusta täyttävää vaihtelua kolmanteen kohtaan).
 *   - Sir John Guise Stadium: kategoria on olemassa mutta TYHJÄ
 *     (0 kelvollista kuvaa) — ei kelpaa.
 *   - Hanuabada ja Vabukori (motu-koitabu-kylät): EI KÄYTETTY vaikka
 *     kuvia löytyisi — pilari 3 ja tehtävänannon HERKKYYS-kohta
 *     kieltävät alkuperäiskansan asuinympäristön käytön herokuvan
 *     kuvituksena, ja ainoat löytyvät kuvat kallistuvat lisäksi
 *     kurjuusestetiikkaan (esim. Wikipedian oma "Poor coastal
 *     housing..." -tiedostonimi Hanuabadasta).
 *   - "Pineapple Building" (Category:Waigani): arkkitehtonisesti
 *     kiinnostava mutta ainoa Commons-kuva esittää rakennuksen
 *     hylättynä/ikkunattomana raunioina — ristiriidassa tehtävänannon
 *     vaatimuksen kanssa kuvata Port Moresby arvokkaana nykyaikaisena
 *     kaupunkina, ei rappiokuvastona. Jätetty pois.
 *   - Bomana-sotahautausmaa: ei edes kokeiltu — sotahistoria ei kuulu
 *     herokuviin tämän erän kaupungeissa.
 *
 * ------------------------------------------------------------------
 * HERKKYYS (perustuslain pilari 3, tehtävänannon HERKKYYS-kohta)
 * ------------------------------------------------------------------
 * - Ei yhtään alkuperäiskansa-aihetta kuvituksena kummassakaan
 *   kaupungissa: ei larrakia-aiheita Darwinissa, ei motu/koitabu-
 *   kyläkuvastoa Port Moresbyssa. Kansat kerrotaan elävinä ja
 *   nykyaikaisina lehtien TEKSTEISSÄ, ei herokuvissa.
 * - Darwin ja Port Moresby kuvataan arvokkaina nykyaikaisina
 *   kaupunkeina: ei köyhyysestetiikkaa, ei turvattomuuskuvastoa. Ei
 *   sotahistoriaa (Darwinin pommitukset 1942, Kokodan polku, Bomana)
 *   herokuvien aiheena.
 * - Hobartin vankisiirtolahistoria (Port Arthur) ei ole herokuvien
 *   aiheena — Cascade Brewery ja Theatre Royal ovat siviilirakennuksia.
 * - Fannie Bay Gaol kuvataan arkkitehtuurina (ulkoseinät, materiaalit),
 *   ei vankien kärsimystä korostaen — sama linjaus kuin Hobartin
 *   Port Arthur -kuvavalinnoissa faktapohjissa yleensä.
 */
import { VAKIO, prompti } from './hero-kuvakulmat.mjs';

export const TYOLISTA = [
  /* ================= HOBART ================= */

  /*
   * Aamu — Theatre Royal, Campbell Street, keskusta. Avattiin 1837,
   * Australian vanhin yhtäjaksoisesti toiminut teatteri (faktapohja-
   * hobart.md, nosto H2). Georgialainen kivijulkisivu, ei goottilainen
   * teatteritalo.
   */
  {
    id: 'hobart-aamu',
    tiedosto: 'hero-hobart-aamu.png',
    kaupunki: 'Hobart',
    tarkkaKohde: true,
    kategoria: 'Category:Theatre Royal, Hobart',
    viitehaku: 'Theatre Royal Hobart Campbell Street',
    viitesuosi: ['exterior', 'facade', 'building', 'street'],
    prompti: prompti(
      'the Theatre Royal on Campbell Street in central Hobart, in the'
      + ' soft early morning light',
      'a two-storey Georgian theatre front of pale cream-painted'
      + ' stucco, its flat parapet roofline broken only by two plain'
      + ' chimneys; a central pedimented portico of four plain round'
      + ' columns shelters an arched doorway with double crimson-red'
      + ' doors, the words THEATRE ROYAL in gold lettering across the'
      + ' pediment frieze, and a narrow teal-green band carved with a'
      + ' Greek key pattern running the width of the facade at cornice'
      + ' level; two tall black cast-iron double-globe lamp posts'
      + ' stand either side of the entrance steps; THE BUILDING IS'
      + ' NEOCLASSICAL AND FLAT-FRONTED, NOT A GOTHIC OR VICTORIAN'
      + ' THEATRE WITH POINTED ARCHES, SPIRES OR TOWERS',
      'the narrow terraced street of Campbell Street with parked cars'
      + ' and low colonial-era shopfronts on the opposite side, and the'
      + ' wider grid of central Hobart continuing into the distance'
      + ' under the morning light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Cascade Brewery, South Hobart, kunanyin juurella.
   * Australian vanhin yhtäjaksoisesti toiminut panimo (faktapohja-
   * hobart.md, nosto H3). Goottilainen teollisuusrakennus, ei kirkko.
   */
  {
    id: 'hobart-keskipaiva',
    tiedosto: 'hero-hobart-keskipaiva.png',
    kaupunki: 'Hobart',
    tarkkaKohde: true,
    kategoria: 'Category:Cascade Brewery',
    viitehaku: 'Cascade Brewery Hobart South Hobart',
    viitesuosi: ['exterior', 'building', 'brewery', 'facade'],
    prompti: prompti(
      'the Cascade Brewery building in South Hobart at midday',
      'a tall multi-storey Gothic Revival industrial building of pale'
      + ' ochre sandstone and render, its steep gable end rising in'
      + ' stepped, castellated parapets to a peak; rows of narrow'
      + ' arched windows with keystones run up each floor; near the'
      + ' top the words CASCADE BREWERY are painted in white across'
      + ' the facade, flanked by two round date plaques reading 1824'
      + ' and 1927; a tall square chimney rises beside the main block;'
      + ' THIS IS AN INDUSTRIAL BREWERY, NOT A CHURCH OR CASTLE — the'
      + ' windows are plain arched openings with no stained glass or'
      + ' tracery',
      'a formal garden of clipped hedges in front of the building, and'
      + ' behind it the dense forested lower slopes of kunanyi/Mount'
      + ' Wellington rising steeply into the midday haze',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — MONA, Berriedalen niemi, avattu 2011 (faktapohja-hobart.md,
   * nosto T1). Rakennus on louhittu kallioon: tarkoituksella
   * näkymätön, ei perinteinen museorakennus.
   */
  {
    id: 'hobart-ilta',
    tiedosto: 'hero-hobart-ilta.png',
    kaupunki: 'Hobart',
    tarkkaKohde: true,
    kategoria: 'Category:MONA',
    viitehaku: 'MONA Museum of Old and New Art Hobart',
    viitesuosi: ['exterior', 'entrance', 'pavilion', 'building'],
    prompti: prompti(
      'the entrance pavilion of MONA, the Museum of Old and New Art,'
      + ' on the Berriedale peninsula in the evening light',
      'a low, sharply angular structure of dark rusted steel and glass'
      + ' set into a grassy sandstone bluff above the river, its'
      + ' roofline barely rising above the surrounding lawn because'
      + ' almost the entire museum is built downward into the rock'
      + ' beneath it; a glazed lift and stair volume is the only large'
      + ' above-ground element; THE MUSEUM HAS NO GRAND CLASSICAL'
      + ' FACADE, NO DOME AND NO COLUMNS — it is deliberately hidden'
      + ' and mostly invisible from ground level, reading as a minimal'
      + ' modern pavilion rather than a conventional museum building',
      'rows of vines from the surrounding vineyard and open lawns'
      + ' sloping down to the Derwent River, with the wooded far bank'
      + ' and the evening sky reflecting on the water',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= DARWIN ================= */

  /*
   * Aamu — Government House, Esplanade. Valmistui 1870–71,
   * territorion vanhin eurooppalainen rakennus (faktapohja-darwin.md,
   * nosto H4). Matala, levittäytyvä trooppinen siirtomaatalo.
   */
  {
    id: 'darwin-aamu',
    tiedosto: 'hero-darwin-aamu.png',
    kaupunki: 'Darwin',
    tarkkaKohde: true,
    kategoria: 'Category:Government House, Darwin',
    viitehaku: 'Government House Darwin Esplanade',
    viitesuosi: ['exterior', 'building', 'veranda', 'facade'],
    prompti: prompti(
      'Government House in Darwin, on the Esplanade, in the early'
      + ' morning light',
      'a single-storey tropical colonial residence of cream-painted'
      + ' timber and masonry, with a tall steep roof of corrugated'
      + ' iron in a double-gabled cross shape, the pale yellow gable'
      + ' ends pierced by small pointed windows; a deep wraparound'
      + ' veranda runs the length of the house, its open sides fitted'
      + ' with white timber louvre shutters and slender white posts;'
      + ' THE BUILDING IS LOW AND SPREADING, ONE STOREY WITH VERANDAS'
      + ' ON ALL SIDES, NOT A TALL MULTI-STOREY MANSION',
      'a wide lawn dotted with tall royal palms, a flagpole, and'
      + ' glimpses of Darwin Harbour beyond the garden in the morning'
      + ' light',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Fannie Bay Gaol, Fannie Bay. Toimi vankilana
   * 1883–1979, nyk. museo (faktapohja-darwin.md, nosto T1). Matala,
   * ankara muurirakennus, ei koristeellinen.
   */
  {
    id: 'darwin-keskipaiva',
    tiedosto: 'hero-darwin-keskipaiva.png',
    kaupunki: 'Darwin',
    tarkkaKohde: true,
    kategoria: 'Category:Fannie Bay Goal',
    viitehaku: 'Fannie Bay Gaol Darwin',
    viitesuosi: ['exterior', 'building', 'gaol', 'wall'],
    prompti: prompti(
      'the old Fannie Bay Gaol in Darwin at midday',
      'a low, plain one-storey colonial prison building of coursed'
      + ' sandstone rubble masonry with a whitewashed lower course,'
      + ' its gabled roof of corrugated iron painted pale green; a row'
      + ' of small square windows fitted with heavy iron security bars'
      + ' runs along the wall at head height; a narrow covered'
      + ' breezeway with timber posts extends from one end; THE'
      + ' BUILDING IS SEVERE AND UTILITARIAN, A SQUAT MASONRY CELL'
      + ' BLOCK — NOT AN ORNATE OR CHURCH-LIKE STRUCTURE',
      'a stretch of dry mown grass and scattered palms around the'
      + ' compound, with the flat suburban rooftops of Fannie Bay and'
      + ' the sea beyond visible in the midday glare',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Christ Church Cathedral, Smith Street. Uudelleenrakennettu
   * 1977 hirmumyrsky Tracyn jälkeen; ainoa säilynyt osa on 1944
   * rakennettu kuisti (faktapohja-darwin.md, nosto T4). Vanha kuisti
   * ON MUKANA promptissa — se on rakennuksen erottuvin piirre.
   */
  {
    id: 'darwin-ilta',
    tiedosto: 'hero-darwin-ilta.png',
    kaupunki: 'Darwin',
    tarkkaKohde: true,
    kategoria: 'Category:Christ Church Cathedral, Darwin',
    viitehaku: 'Christ Church Cathedral Darwin Smith Street',
    viitesuosi: ['exterior', 'cathedral', 'porch', 'building'],
    prompti: prompti(
      'Christ Church Cathedral in Darwin in the evening light',
      'a soaring white roof folded into sharp pleated triangular'
      + ' planes that rise to a tall narrow peak, the apex filled with'
      + ' a tall vertical strip of glass; wide eaves sweep low over'
      + ' the walls at the sides; at the very front, attached to the'
      + ' base of this modern roof, stands a small, older porch of'
      + ' rough reddish-brown rubble ironstone masonry with a simple'
      + ' pointed gable and a plain cross at its peak — THIS OLD STONE'
      + ' PORCH MUST BE INCLUDED, ATTACHED DIRECTLY TO THE FRONT OF'
      + ' THE MODERN WHITE CATHEDRAL, since it is the only part of the'
      + ' previous building that survived Cyclone Tracy and the roof'
      + ' above it is entirely new',
      'tall coconut palms either side of the entrance path, a mown'
      + ' lawn, and low modern parish buildings just visible to one'
      + ' side under the evening sky',
      VAKIO,
    ),
    selite: null,
  },

  /* ================= PORT MORESBY ================= */

  /*
   * Aamu — National Parliament of Papua New Guinea, Waigani, avattu
   * 1984. Haus tambaran -henkinen kattomuoto (faktapohja-
   * portmoresby.md, kohdekartan kohde 7). Kuvattu ja tarkistettu
   * silmin: kattomuoto ja julkisivun mosaiikkiseinä ovat kohteen
   * tunnistavat piirteet.
   */
  {
    id: 'portmoresby-aamu',
    tiedosto: 'hero-portmoresby-aamu.png',
    kaupunki: 'Port Moresby',
    tarkkaKohde: true,
    kategoria: 'Category:National Parliament of Papua New Guinea',
    viitehaku: 'National Parliament House Port Moresby',
    viitesuosi: ['parliament', 'building', 'exterior', 'facade'],
    prompti: prompti(
      'the National Parliament building in Waigani, Port Moresby, in'
      + ' the calm morning light',
      'a dramatic asymmetric roof shaped like a traditional Highlands'
      + ' spirit house, its dark grey corrugated-metal planes sweeping'
      + ' steeply up on one side to a high overhanging peak; below the'
      + ' peak, filling the tall triangular gable end, is a vividly'
      + ' painted traditional mural made of small mosaic tiles showing'
      + ' stylised human figures, birds, fish and plant motifs in red,'
      + ' ochre, black and white; the lower storeys are plain'
      + ' cream-and-white concrete with a row of vertical fluted'
      + ' piers; THE ROOF SHAPE ITSELF, NOT A DOME OR COLUMNED'
      + ' PEDIMENT, IS WHAT MAKES THIS A PARLIAMENT BUILDING — it must'
      + ' read unmistakably as a giant traditional haus tambaran roof,'
      + ' not a generic Western government building',
      'a long rectangular reflecting pool directly in front of the'
      + ' building, its still water mirroring the roofline, with'
      + ' clipped tropical shrubs and a paved forecourt around the'
      + ' pool',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Keskipäivä — Jacksons International Airport, maan suurin
   * lentokenttä (faktapohja-portmoresby.md, jakso 1 ja kohdekartan
   * kohde 9). Matala pitkä terminaali, ei lasitorni.
   */
  {
    id: 'portmoresby-keskipaiva',
    tiedosto: 'hero-portmoresby-keskipaiva.png',
    kaupunki: 'Port Moresby',
    tarkkaKohde: true,
    kategoria: 'Category:Jacksons International Airport',
    viitehaku: 'Jacksons International Airport Port Moresby terminal',
    viitesuosi: ['terminal', 'airport', 'exterior', 'facade'],
    prompti: prompti(
      'the terminal building of Jacksons International Airport in'
      + ' Port Moresby at midday',
      'a long, low modern terminal with a flat overhanging roofline,'
      + ' its upper facade wrapped in a continuous decorative frieze'
      + ' of stylised traditional Papua New Guinean carved patterns in'
      + ' cream and brown running the full width of the building'
      + ' above the gate windows; large dark lettering spelling PORT'
      + ' MORESBY INTERNATIONAL AIRPORT is mounted on the facade;'
      + ' glass-walled gate lounges and a jet bridge stand at one end'
      + ' with a narrow-body jet parked at the gate; THE BUILDING IS A'
      + ' SINGLE LOW HORIZONTAL TERMINAL BLOCK, NOT A TALL MODERN'
      + ' GLASS TOWER',
      "the flat concrete apron in front of the terminal with taxi"
      + ' lines painted on the tarmac, and dry brown grassy hills'
      + ' dotted with scrub rising close behind the airport under the'
      + ' midday haze',
      VAKIO,
    ),
    selite: null,
  },

  /*
   * Ilta — Boroko, entinen kaupallinen keskus vanhan Townin ja
   * Waiganin välissä (faktapohja-portmoresby.md, jakso 2). Laaja
   * katunäkymä ilman yhtä nimettyä rakennusta — EI tarkkaKohde, sama
   * ratkaisu kuin New Orleansin Frenchmen Streetillä listassa 24.
   */
  {
    id: 'portmoresby-ilta',
    tiedosto: 'hero-portmoresby-ilta.png',
    kaupunki: 'Port Moresby',
    prompti: prompti(
      'a street in the Boroko district of Port Moresby in the warm'
      + ' evening light',
      'a row of low two-storey mid-twentieth-century commercial'
      + ' buildings with plain concrete facades, shallow shopfront'
      + ' awnings shading the footpath, and hand-painted shop signs in'
      + ' bright colours',
      'other similar low commercial blocks lining the street on both'
      + ' sides, overhead power lines, a scatter of pedestrians and'
      + ' parked cars at human scale without singling out recognisable'
      + ' faces, and the dry hills of Port Moresby\'s inland suburbs'
      + ' visible at the end of the street under the evening sky',
      VAKIO,
    ),
    selite: null,
  },
];
