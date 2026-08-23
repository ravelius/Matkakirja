/*
 * HEROKUVATYÖLISTA, KIERROS 19 (6 kaupunkia, 18 kuvaa): Wellington,
 * Sevilla, Bergen, Montreal, Tampere ja Tallinna.
 *
 * Sama malli kuin tools/hero-tyolista-13.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: neljä tänään lehtensä saanutta uutta kaupunkia
 * ensin (Wellington, Sevilla, Bergen, Montreal) ja perään kaksi
 * lähikaupunkia, joilta herot yhä puuttuvat (Tampere, Tallinna) —
 * maanosia vuorotellen: Oseania 1, Eurooppa 4, Pohjois-Amerikka 1.
 * Yksikään heroaihe ei ole oman lehtensä kansikuvana eikä
 * avauskuvana: Wellingtonissa ohitetaan Oriental Bay, Bucket Fountain
 * ja kasvitieteellinen puutarha, Sevillassa Alcázarin piha ja
 * kaupungin tunnus, Bergenissä Bergenhus, Mariakirken ja Bryggen,
 * Montrealissa Notre-Dame ja maanalainen kaupunki, Tampereella
 * tuomiokirkko, Pispala, Särkänniemi ja Näsinneula, Tallinnassa
 * raatihuone, Virun portti ja Aleksanteri Nevskin katedraali.
 *
 * HERKKYYS: Montrealin oratorio on kohteena rakennuksena, ei
 * hartautena — pyhiinvaeltajat vain kaukaisina hahmoina portailla.
 * Tallinnan teletorni kuvataan rakennuksena ilman politiikkaa.
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..13:ssa.
const KUVAKULMA =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic wide photograph of ${kohde} dominating the`
  + ` foreground: ${kuvaus}. Behind and below it, smaller:`
  + ` ${ymparisto}.${KUVAKULMA}`;

export const TYOLISTA = [
  /* ---- WELLINGTON — Beehive, Te Papa, vanha hallintorakennus. */
  {
    id: 'wellington-aamu',
    tiedosto: 'hero-wellington-aamu.png',
    kaupunki: 'wellington',
    prompti: p(
      'the Beehive, the executive wing of the New Zealand parliament in'
      + ' Wellington',
      'the round government building rising 72 metres in ten stepped'
      + ' tiers that narrow toward the top like a woven straw beehive,'
      + ' every tier a continuous band of tinted glazing set between pale'
      + ' concrete floor slabs, the glass translucent enough that the lit'
      + ' office floors, the ceiling strips and the desks inside show'
      + ' through it while the morning sky slides across the upper bands'
      + ' as a mirrored ribbon, a brown hand-seamed copper roof capping'
      + ' the top drum, low early morning sun from the east on the eastern'
      + ' curve while the western side stays in blue shadow; there is only'
      + ' ONE such round building in the picture and nothing rises behind'
      + ' its roofline',
      'the long grey stone block of Parliament House standing lower beside'
      + ' it with its columned portico and flat roof, the lawns, clipped'
      + ' hedges and gravel forecourt in front, the camera standing on the'
      + ' forecourt side so that a low stone wall and a row of flagpoles'
      + ' are in the foreground, early workers crossing as small figures,'
      + ' Molesworth Street and Lambton Quay running away with morning'
      + ' traffic, and the cranes of the harbour and the steep green'
      + ' ridges closing the city',
    ),
    selite: 'Wellingtonin Beehive eli parlamentin toimeenpanosiipi '
      + 'rakennettiin 1969–1981 Basil Spencen vuonna 1964 luonnosteleman '
      + 'idean pohjalta, se on 72 metriä korkea, ja siinä on kymmenen '
      + 'kerrosta maan päällä ja neljä maan alla.',
  },
  {
    id: 'wellington-keskipaiva',
    tiedosto: 'hero-wellington-keskipaiva.png',
    kaupunki: 'wellington',
    prompti: p(
      'the Te Papa Tongarewa museum on the Wellington waterfront',
      'the huge low museum of pale grey stone and concrete, one long'
      + ' straight wall of rough grey blocks running along the street and'
      + ' a great curved bow of wall swinging out from it, between them a'
      + ' tall glazed entrance slot whose clear glass shows the lit'
      + ' atrium, the hanging stairs and the visitors moving inside,'
      + ' coloured cladding panels, deep eaves and a stepped roof terrace'
      + ' above, high midday sun bleaching the pale stone and throwing'
      + ' hard short shadows; there is only ONE such building in the'
      + ' picture and nothing rises behind its roofline',
      'the Cable Street frontage and the waterfront promenade below with'
      + ' young trees, benches and parked bicycles, the camera standing on'
      + ' the museum side of the street so that the wide entrance steps'
      + ' and a low stone wall are in the foreground, the sheltered water'
      + ' of Lambton Harbour with small boats and a wooden jetty, walkers'
      + ' as small figures along the quay, and the office towers of the'
      + ' city centre with the steep green suburbs rising behind them',
    ),
    selite: 'Uuden-Seelannin kansallismuseo Te Papa Tongarewa avattiin 14. '
      + 'helmikuuta 1998 Jasmaxin suunnittelemaan 36 000 neliömetrin '
      + 'taloon, joka seisoo satamalta vallatulla maalla maanjäristysten '
      + 'varalta eristetyillä perustuksilla.',
  },
  {
    id: 'wellington-ilta',
    tiedosto: 'hero-wellington-ilta.png',
    kaupunki: 'wellington',
    prompti: p(
      'the Old Government Buildings at the foot of Lambton Quay in'
      + ' Wellington at sunset',
      'the enormous four-storey building of kauri timber painted pale'
      + ' cream and shaped throughout to imitate cut stone, a very long'
      + ' symmetrical front with a slightly projecting centre under a low'
      + ' pediment, even rows of tall rectangular windows in heavy painted'
      + ' surrounds, a bracketed cornice and a low hipped roof with'
      + ' chimneys, warm low sunset light from the west raking along the'
      + ' front so that every board line and window frame stands out;'
      + ' there is only ONE such building in the picture and nothing rises'
      + ' behind its roofline',
      'the lawns and old trees of the small park in front, the camera'
      + ' standing on the building side so that the gravel path, a low'
      + ' iron railing and the front steps are in the foreground, students'
      + ' and office workers crossing as small figures in the last light,'
      + ' the busy corner of Lambton Quay with headlights beyond the'
      + ' trees, and the glass towers of the city and the wooded hills'
      + ' going violet behind them',
    ),
    selite: 'Wellingtonin vanha hallintorakennus valmistui 1876 William '
      + 'Claytonin suunnitelmien mukaan kauripuusta, joka veistettiin ja '
      + 'maalattiin kiveä jäljitteleväksi, ja se on eteläisen '
      + 'pallonpuoliskon suurin puurakennus.',
  },

  /* ---- SEVILLA — Giralda, Plaza de España, Metropol Parasol. */
  {
    id: 'sevilla-aamu',
    tiedosto: 'hero-sevilla-aamu.png',
    kaupunki: 'sevilla',
    prompti: p(
      'the Giralda, the bell tower of the cathedral of Seville',
      'the square tower rising about 96 metres, its lower two thirds the'
      + ' old minaret of warm ochre brick patterned with interlacing sebka'
      + ' panels and blind arches on slender marble columns, above it a'
      + ' narrower renaissance belfry of pale stone climbing in ever'
      + ' smaller stages with open arcades of bells, balustrades and stone'
      + ' urns, and at the very top a bronze weathervane figure holding a'
      + ' palm branch, low early morning sun from the east on the eastern'
      + ' face while the north side stays cool and grey; there is only ONE'
      + ' tower in the picture and nothing rises behind the roofline',
      'the grey bulk of the gothic cathedral spreading below around the'
      + ' foot of the tower with its buttresses, pinnacles and tiled'
      + ' roofs, the walled courtyard of orange trees and its fountain'
      + ' beside it, the camera standing on the cathedral side so that the'
      + ' stone parapet and the ridge of the nave roof are in the'
      + ' foreground, the narrow lanes and white and ochre houses of the'
      + ' old town below with horse carriages and early walkers as small'
      + ' figures, and the Guadalquivir and the flat green plain beyond',
    ),
    selite: 'Sevillan Giralda rakennettiin almohadien minareetiksi '
      + '1184–1198, sen päälle kohotettiin 1558–1568 Hernán Ruiz '
      + 'nuoremman suunnittelema renessanssiajan kellotorni, ja huipulle '
      + 'nostettiin 1568 nelimetrinen ja 1 500 kilon painoinen pronssinen '
      + 'tuuliviiri Giraldillo.',
  },
  {
    id: 'sevilla-keskipaiva',
    tiedosto: 'hero-sevilla-keskipaiva.png',
    kaupunki: 'sevilla',
    prompti: p(
      'the Plaza de España in Seville',
      'the vast brick and tile palace curving in a half circle around the'
      + ' square, two storeys of arcaded galleries in warm red brick with'
      + ' white stone dressings and glazed ceramic ornament, one tall'
      + ' tower at each end of the curve and a higher pavilion in the'
      + ' middle, a row of painted tile alcoves for the provinces of Spain'
      + ' set along the foot of the wall with benches and maps in them,'
      + ' high midday sun blazing on the brick and flashing off the'
      + ' coloured tiles; there is only ONE such curving building in the'
      + ' picture and nothing rises behind its roofline',
      'the wide half moon of paving in front with a stone fountain in the'
      + ' middle, the curved canal running along the foot of the building'
      + ' with rowing boats on it and four tiled bridges crossing it, the'
      + ' camera standing on the open side of the square so that the tiled'
      + ' balustrade of the canal and a line of orange trees are in the'
      + ' foreground, visitors as small figures on the bridges, and the'
      + ' palms and tall trees of the Maria Luisa park closing the view',
    ),
    selite: 'Sevillan Plaza de España rakennettiin 1928 Aníbal Gonzálezin '
      + 'suunnitelmien mukaan seuraavan vuoden Ibero-amerikkalaista '
      + 'näyttelyä varten, aukio on 45 932 neliömetriä, ja kanavan '
      + 'ylittävät neljä siltaa kuvaavat Espanjan vanhoja '
      + 'kuningaskuntia.',
  },
  {
    id: 'sevilla-ilta',
    tiedosto: 'hero-sevilla-ilta.png',
    kaupunki: 'sevilla',
    prompti: p(
      'the Metropol Parasol on the Plaza de la Encarnacion in Seville at'
      + ' sunset',
      'the giant lattice canopy of pale laminated pine measuring 150'
      + ' metres by 70 and standing 26 metres high, six mushroom shaped'
      + ' parasols growing out of thick trunks and spreading into an open'
      + ' honeycomb grid of timber ribs, the grid open so that the sunset'
      + ' sky, the clouds and the railings of the walkway on top of it are'
      + ' seen straight through the holes, a winding rooftop promenade'
      + ' along the crest with people on it, warm low sunset light from'
      + ' the west turning the pine deep orange while the shaded plaza'
      + ' below goes blue; there is only ONE such structure in the picture'
      + ' and nothing rises behind it',
      'the paved square underneath with the market hall and cafe tables in'
      + ' the shade of the trunks, the camera standing on the plaza side'
      + ' so that the glass roof lights of the underground antiquarium set'
      + ' in the pavement and a row of cafe chairs are in the foreground,'
      + ' the low white and ochre houses with iron balconies packed around'
      + ' the square, people crossing as small figures as the first lamps'
      + ' come on, and the tiled roofs of the old town running away into'
      + ' the last light',
    ),
    selite: 'Sevillan Metropol Parasol valmistui huhtikuussa 2011 Jürgen '
      + 'Mayerin suunnitelman mukaan, se on 150 metriä pitkä, 70 metriä '
      + 'leveä ja 26 metriä korkea, ja siihen käytettiin 3 500 '
      + 'kuutiometriä suomalaista mäntyviilua.',
  },

  /* ---- BERGEN — Johanneksen kirkko, Fløibanen, Grieghallen. */
  {
    id: 'bergen-aamu',
    tiedosto: 'hero-bergen-aamu.png',
    kaupunki: 'bergen',
    prompti: p(
      'the church of Saint John on the Sydneshaugen hill in Bergen',
      'the big red brick church in the gothic revival manner standing on'
      + ' the crown of the hill, a cruciform body under steep dark slate'
      + ' roofs with stepped brick gables, tall pointed windows with brick'
      + ' tracery, and at the west end one square tower climbing 61 metres'
      + ' to a slender spire flanked by four small pinnacles, low early'
      + ' morning sun from the east on the brick tower face while the'
      + ' north wall of the nave stays dark; there is only ONE tower in'
      + ' the picture and nothing rises behind the roofline',
      'the paved churchyard and stepped granite terraces around it with'
      + ' old trees and lamp posts, the camera standing on the churchyard'
      + ' side so that the low stone wall and the wide steps are in the'
      + ' foreground, the steep streets falling away from the hill between'
      + ' white timber and plastered houses, a few early walkers as small'
      + ' figures, the roofs of the university quarter below, and the grey'
      + ' water of the inlet with the bare mountains around the city',
    ),
    selite: 'Bergenin Johanneksen kirkko vihittiin 15. maaliskuuta 1894 '
      + 'Herman Major Backerin suunnitelmien mukaan punatiilestä, sen 61 '
      + 'metriä korkea torni on kaupungin korkein, ja kirkkoon mahtuu 690 '
      + 'ihmistä.',
  },
  {
    id: 'bergen-keskipaiva',
    tiedosto: 'hero-bergen-keskipaiva.png',
    kaupunki: 'bergen',
    prompti: p(
      'a carriage of the Floibanen funicular climbing the mountainside'
      + ' above Bergen',
      'the single red funicular carriage built as a stepped wedge so that'
      + ' its compartments stay level on the steep track, wide glazed'
      + ' windows and a fully glazed front through which the tiered floors'
      + ' inside, the handrails and the standing passengers are clearly'
      + ' seen, steel wheels on the narrow metre gauge rails and the'
      + ' concrete track bed climbing straight up the slope behind it into'
      + ' the trees, high midday sun on the red bodywork and flashing off'
      + ' the glass; there is only ONE carriage in the picture and nothing'
      + ' rises behind the track',
      'the wooden houses of the hillside crowding right up to the rails'
      + ' with gardens, painted fences and washing lines, the camera'
      + ' standing on the uphill side of the line so that the sleepers, a'
      + ' wire fence and a small stone bridge are in the foreground, the'
      + ' packed white timber houses of the old town falling away below,'
      + ' the gabled warehouse fronts and quays along the water far down'
      + ' with boats moored in the inlet, and the fjord and the grey'
      + ' mountains beyond',
    ),
    selite: 'Bergenin Fløibanen-köysirata avattiin 15. tammikuuta 1918, '
      + 'rata on 848 metriä pitkä ja nousee 302 metriä Fløyen-vuoren '
      + 'rinnettä, ja sen kaksi vaunua on nimetty punaiseksi Rødhetteksi '
      + 'ja siniseksi Blåmanniksi.',
  },
  {
    id: 'bergen-ilta',
    tiedosto: 'hero-bergen-ilta.png',
    kaupunki: 'bergen',
    prompti: p(
      'the Grieg Hall concert house in the centre of Bergen at sunset',
      'the long modernist concert building, a high windowless block of'
      + ' pale concrete over the auditorium with a folded angular'
      + ' roofline, and along its whole front a lower foyer glazed from'
      + ' floor to roof whose clear panes show the lit staircases, the'
      + ' balconies and the audience standing inside, slender columns and'
      + ' dark stone paving under the glass, warm low sunset light from'
      + ' the west so that half the glass front mirrors the orange sky and'
      + ' half stays transparent; there is only ONE such building in the'
      + ' picture and nothing rises behind its roofline',
      'the open paved plaza and shallow steps in front with young trees,'
      + ' banners and lamp posts, the camera standing on the plaza side so'
      + ' that the low granite wall and a row of parked bicycles are in'
      + ' the foreground, concert goers arriving as small figures, the'
      + ' small city lake with its fountain and the pale nineteenth'
      + ' century blocks of the centre beyond it, and the dark ridge of'
      + ' the mountains behind the town with the first lights coming on',
    ),
    selite: 'Bergenin Grieghallen vihittiin 23. toukokuuta 1978 '
      + 'tanskalaisen Knud Munkin suunnitelmien mukaan, sen pääsalissa on '
      + '1 500 paikkaa, ja talo on Bergenin filharmonikkojen koti.',
  },

  /* ---- MONTREAL — oratorio, Biosphère, olympiastadionin torni. */
  {
    id: 'montreal-aamu',
    tiedosto: 'hero-montreal-aamu.png',
    kaupunki: 'montreal',
    prompti: p(
      'the Oratory of Saint Joseph on the northern slope of Mount Royal'
      + ' in Montreal',
      'the colossal basilica of grey granite standing on the hillside, a'
      + ' renaissance revival front with a giant columned portico between'
      + ' two square corner blocks, and above it one enormous ribbed dome'
      + ' 39 metres across whose green copper skin rises 97 metres above'
      + ' the floor of the nave, a lantern and a cross on its top, tiers'
      + ' of round arched windows below, low early morning sun from the'
      + ' east on the eastern flank of the dome while the portico stays in'
      + ' deep shadow; there is only ONE dome in the picture and nothing'
      + ' rises behind the roofline',
      'the long ceremonial staircase climbing the slope in front with two'
      + ' outer flights of concrete steps and a middle flight of wooden'
      + ' steps between them, terraces, lawns and low walls dividing the'
      + ' flights, the camera standing on the basilica side so that the'
      + ' topmost steps and a stone balustrade are in the foreground,'
      + ' pilgrims and visitors as small distant figures far down the'
      + ' stairs, the roofs and trees of the district below, and the flat'
      + ' plain of the island running out to the river in the morning'
      + ' haze',
    ),
    selite: 'Montrealin Pyhän Joosefin oratorion basilikaa rakennettiin '
      + '1914–1967 veli André Bessetten vuonna 1904 perustaman pienen '
      + 'kappelin paikalle, sen kupoli on 39 metriä leveä ja nousee 97 '
      + 'metriä kirkkosalin lattiasta, ja rinteen portaissa on kaksi 283 '
      + 'betoniaskelman rivistöä ja niiden välissä 99 puuaskelmaa.',
  },
  {
    id: 'montreal-keskipaiva',
    tiedosto: 'hero-montreal-keskipaiva.png',
    kaupunki: 'montreal',
    prompti: p(
      'the Biosphere on Saint Helen Island in Montreal',
      'the giant geodesic sphere 76 metres across and 62 metres high, a'
      + ' double layer lattice of slender painted steel tubes forming a'
      + ' honeycomb of triangles and hexagons, the transparent acrylic'
      + ' skin long gone so that the blue sky, the clouds and the far side'
      + ' of the lattice are seen straight through the frame and the small'
      + ' museum building, the platforms and the walkways standing inside'
      + ' it are plainly visible, high midday sun throwing a net of'
      + ' triangular shadows across the ground within; there is only ONE'
      + ' such sphere in the picture and nothing rises behind it',
      'the lawns, gravel paths and young maples of the island park at its'
      + ' foot with a low pavilion and a car park, the camera standing on'
      + ' the park side so that the path and a row of benches are in the'
      + ' foreground, visitors as small figures under the frame for scale,'
      + ' the wide grey water of the Saint Lawrence river with a moored'
      + ' barge, and the towers of the city centre and the green hump of'
      + ' Mount Royal on the far bank',
    ),
    selite: 'Montrealin Biosphère rakennettiin Yhdysvaltain paviljongiksi '
      + 'vuoden 1967 maailmannäyttelyyn Buckminster Fullerin suunnitelman '
      + 'mukaan, pallo on 76 metriä leveä ja 62 metriä korkea, ja 20. '
      + 'toukokuuta 1976 tulipalo poltti sen läpinäkyvän akryylikuoren '
      + 'mutta jätti teräsrungon pystyyn.',
  },
  {
    id: 'montreal-ilta',
    tiedosto: 'hero-montreal-ilta.png',
    kaupunki: 'montreal',
    prompti: p(
      'the Montreal Tower leaning over the Olympic stadium at sunset',
      'the vast curved concrete tower rising 165 metres and leaning at 45'
      + ' degrees like a bent spine, ribbed concrete flanks tapering as'
      + ' they climb, near the top a glazed observation deck whose tinted'
      + ' glass lets the lit floors, the ceiling lights and the visitors'
      + ' inside show through it, the steel cables of the stadium roof'
      + ' running down from its head and the track of the inclined lift'
      + ' climbing one flank, warm low sunset light from the west along'
      + ' the leaning shaft while its underside falls into blue shadow;'
      + ' there is only ONE tower in the picture and nothing rises behind'
      + ' it',
      'the enormous elliptical bowl of the stadium below with its ribbed'
      + ' concrete buttresses and its ring of floodlights, the paved'
      + ' esplanade and ramps around it, the camera standing on the'
      + ' esplanade side so that the concrete parapet and a line of lamp'
      + ' posts are in the foreground, people walking as small figures'
      + ' toward the metro entrance, wide avenues with evening traffic,'
      + ' and the low brick houses with outside staircases running away'
      + ' toward the lit towers of the city centre',
    ),
    selite: 'Montrealin olympiastadionin torni valmistui 1987 Roger '
      + 'Taillibertin suunnitelmien mukaan, se on 165 metriä korkea ja '
      + 'kallistuu 45 asteen kulmassa, ja sen huipulta laskeutuvat '
      + 'vaijerit kannattivat stadionin avattavaa kattoa.',
  },

  /* ---- TAMPERE — Näsilinna, Metso ja Vanha kirkko. */
  {
    id: 'tampere-aamu',
    tiedosto: 'hero-tampere-aamu.png',
    kaupunki: 'tampere',
    prompti: p(
      'the Nasilinna palace on its hill above the lake in Tampere',
      'the two-storey neo-baroque palace of plastered brick painted pale'
      + ' ochre with white pilasters, carved window surrounds and a heavy'
      + ' cornice, a projecting centre bay crowned by a curved gable and a'
      + ' stone balustrade with urns, tall arched windows and a wide'
      + ' terrace with a stone staircase on the park front, low early'
      + ' morning sun from the east along the pale wall so that every'
      + ' moulding throws a long shadow; there is only ONE such building'
      + ' in the picture and nothing rises behind its roofline',
      'the sloping park below with gravel paths, flower beds, old birches'
      + ' and a low iron railing, the camera standing on the palace side'
      + ' so that the terrace steps and a stone bench are in the'
      + ' foreground, a few early walkers as small figures on the paths,'
      + ' the red brick factory blocks and church towers of the town below'
      + ' the hill, and the wide grey water of the lake with a steamer at'
      + ' the quay and low wooded shores beyond',
    ),
    selite: 'Tampereen Näsilinna valmistui 1898 Karl August Wreden '
      + 'suunnittelemaksi uusbarokkipalatsiksi tehtailijasuvun jäsenelle '
      + 'Peter von Nottbeckille, joka antoi sille nimen Milavida, ja '
      + 'vuodesta 2015 talossa on toiminut Milavida-museo.',
  },
  {
    id: 'tampere-keskipaiva',
    tiedosto: 'hero-tampere-keskipaiva.png',
    kaupunki: 'tampere',
    prompti: p(
      'the Metso central library in Tampere',
      'the low organic library building whose curved walls of grey granite'
      + ' and speckled reddish rapakivi stone swirl outward in overlapping'
      + ' shells, a fan of copper roof plates spreading over them like'
      + ' folded wings, and between the stone and the copper long curved'
      + ' bands of glazing through which the lit reading galleries, the'
      + ' bookshelves and the readers inside are seen, high midday sun on'
      + ' the copper and the pale stone; there is only ONE such building'
      + ' in the picture and nothing rises behind its roofline',
      'the lawns, birches and gravel paths of the park around it with'
      + ' bicycles in the racks, the camera standing on the park side so'
      + ' that the low stone kerb and a bench are in the foreground,'
      + ' people going in and out as small figures, the straight streets'
      + ' and plastered apartment blocks of the district beyond, and the'
      + ' roofs of central Tampere with a long wooded ridge closing the'
      + ' horizon',
    ),
    selite: 'Tampereen pääkirjasto Metso avattiin elokuussa 1986 Reima ja '
      + 'Raili Pietilän suunnitelmien mukaan, ja ylhäältä katsottuna '
      + 'metsoa muistuttavan talon julkisivuissa on graniittia, '
      + 'rapakiveä, kuparia ja lasia.',
  },
  {
    id: 'tampere-ilta',
    tiedosto: 'hero-tampere-ilta.png',
    kaupunki: 'tampere',
    prompti: p(
      'the Old Church of Tampere beside the central square at sunset',
      'the wooden cross-plan church of horizontal boards painted pale'
      + ' yellow with white corner pilasters and window frames, four equal'
      + ' gabled arms meeting under a low shingled roof with a small'
      + ' octagonal lantern and a cross over the crossing, tall round'
      + ' headed windows and a porch with white columns under a pediment,'
      + ' warm low sunset light from the west along the board wall so that'
      + ' the shadow of every plank shows; there is only ONE church'
      + ' building in the picture and nothing rises behind its roofline',
      'the churchyard of old lime trees and cut lawns around it with'
      + ' gravel paths and a low iron fence, one separate low wooden bell'
      + ' tower standing apart among the trees, the camera standing on the'
      + ' churchyard side so that the fence and the porch steps are in the'
      + ' foreground, people crossing the grass as small figures in the'
      + ' last light, the central square with its tram tracks, market'
      + ' stalls and stone buildings beyond the trees, and the rapids and'
      + ' the red brick factory walls further off',
    ),
    selite: 'Tampereen Vanha kirkko valmistui puisena ristikirkkona 1824 '
      + 'Carlo Bassin suunnitelmien mukaan ja otettiin käyttöön 1825, sen '
      + 'viereinen kellotapuli valmistui 1828 Carl Ludvig Engelin '
      + 'piirustusten mukaan, ja kirkko on keskustan vanhin säilynyt '
      + 'rakennus.',
  },

  /* ---- TALLINNA — Oleviste, Kadriorg ja teletorni. */
  {
    id: 'tallinna-aamu',
    tiedosto: 'hero-tallinna-aamu.png',
    kaupunki: 'tallinna',
    prompti: p(
      'the church of Saint Olaf in the old town of Tallinn',
      'the tall gothic church of grey limestone with a steep dark roof'
      + ' over its buttressed nave, and at the west end one huge square'
      + ' tower that turns into an octagon and then into an enormous green'
      + ' copper spire climbing to a cross 123 metres above the street, an'
      + ' open viewing gallery ringing the tower 60 metres up, tall'
      + ' pointed windows and heavy stepped buttresses below, low early'
      + ' morning sun from the east on the limestone and the copper spire'
      + ' while the lane beneath stays dark; there is only ONE tower in'
      + ' the picture and nothing rises behind the roofline',
      'the narrow cobbled streets of the lower town packed around the'
      + ' church with red tiled roofs, gabled merchant houses and old'
      + ' warehouse hoists, the camera standing on the church side of the'
      + ' street so that the stone plinth of the wall and a row of low'
      + ' bollards are in the foreground, early walkers and a delivery'
      + ' cart as small figures, the medieval town wall with its round'
      + ' red-roofed towers running behind, and the harbour with ferries'
      + ' and the flat grey sea beyond',
    ),
    selite: 'Tallinnan Oleviste eli Pyhän Olavin kirkko mainitaan '
      + 'asiakirjoissa ensi kerran 1267, sen torni nousee nykyään 123,8 '
      + 'metriin ja näköalatasanne on 60 metrin korkeudessa, ja torniin '
      + 'on iskenyt salama noin kymmenen kertaa.',
  },
  {
    id: 'tallinna-keskipaiva',
    tiedosto: 'hero-tallinna-keskipaiva.png',
    kaupunki: 'tallinna',
    prompti: p(
      'the Kadriorg Palace east of the centre of Tallinn',
      'the two-storey baroque palace with walls of deep rose plaster and'
      + ' white stone pilasters, window surrounds and carved garlands, a'
      + ' projecting centre bay rising higher than the wings and crowned'
      + ' by a scrolled gable with a coat of arms, a steep tiled roof with'
      + ' dormers, and a broad stone staircase and terrace across the'
      + ' garden front, high midday sun flattening the shadows on the rose'
      + ' walls; there is only ONE such palace in the picture and nothing'
      + ' rises behind its roofline',
      'the formal flower garden below with clipped hedges in geometric'
      + ' beds, two round fountains and gravel walks, the camera standing'
      + ' on the garden side so that the stone balustrade and the lowest'
      + ' steps are in the foreground, visitors as small figures on the'
      + ' paths, the old lime and oak trees of the park closing both'
      + ' sides, and the roofs of the district and the grey Baltic beyond'
      + ' the trees',
    ),
    selite: 'Tallinnan Kadriorgin palatsi rakennettiin 1718–1725 Nicola '
      + 'Michettin suunnitelmien mukaan Pietari Suuren toimeksiannosta '
      + 'hänen puolisolleen Katariina I:lle, ja siinä toimii nykyään '
      + 'ulkomaista taidetta esittelevä Kadriorgin taidemuseo.',
  },
  {
    id: 'tallinna-ilta',
    tiedosto: 'hero-tallinna-ilta.png',
    kaupunki: 'tallinna',
    prompti: p(
      'the Tallinn television tower at Pirita at sunset',
      'the slender reinforced concrete shaft rising 190 metres and'
      + ' carrying a steel lattice mast 124 metres higher, and near the'
      + ' top a wide disc-shaped platform 38 metres across whose'
      + ' continuous band of glazing lets the lit ceiling, the tables and'
      + ' the silhouettes of visitors inside show through it, ribbed'
      + ' concrete and a spiral of small windows on the shaft, warm low'
      + ' sunset light from the west setting the western half of the disc'
      + ' glass alight while the shaft goes dark; there is only ONE tower'
      + ' in the picture and nothing rises behind it',
      'the low round entrance building and the car park at its foot with'
      + ' birches, lamp posts and a flagpole, the camera standing on the'
      + ' entrance side so that the paved forecourt and a low wall are in'
      + ' the foreground, visitors as small figures at the doors, the pine'
      + ' woods and allotment gardens of the district around it, the'
      + ' convent ruins and the yacht harbour at the river mouth, and the'
      + ' sea going violet along the low shore',
    ),
    selite: 'Tallinnan teletorni avattiin 11. heinäkuuta 1980 Moskovan '
      + 'olympialaisten purjehduskisoja varten, se on 314 metriä korkea '
      + 'ja siten Viron korkein rakennus, ja sen näköalatasanne on 170 '
      + 'metrin korkeudessa.',
  },
];
