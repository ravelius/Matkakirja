/*
 * HEROKUVATYÖLISTA, KIERROS 18 (6 kaupunkia, 18 kuvaa): Varsova,
 * Riika, Kuwait, Tabriz, Kašgar ja Jekaterinburg.
 *
 * Sama malli kuin tools/hero-tyolista-12.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia ja
 * kulttuurialueita vuorotellen — Eurooppa 2 (Varsova, Riika),
 * Lähi-itä 1 (Kuwait), Iran 1 (Tabriz), Keski-Aasia 1 (Kašgar),
 * Venäjä ja Ural 1 (Jekaterinburg). Yksikään heroaihe ei ole oman
 * lehtensä kansikuvana: Varsovassa ohitetaan kulttuuripalatsi ja
 * Syrenka, Riiassa tuomiokirkko ja Vanšu-silta, Kuwaitissa
 * Al-Hashemi-II ja tiedekeskus, Tabrizissa El Goli ja Chardinin
 * piirros, Kašgarissa Id Kah ja Afaq Khojan mausoleumi,
 * Jekaterinburgissa Sevastjanovin talo ja Vainerin katu.
 *
 * HERKKYYS: Varsovassa linnan ja vanhankaupungin jälleenrakennus
 * kerrotaan tapahtumana neutraalisti — ei raunioita eikä sotakuvia.
 * Jekaterinburgissa Veren kirkko on kohteena rakennuksena, ei
 * politiikkana eikä surmapaikkana. Kašgarissa kohteina ovat
 * rakennukset ja katunäkymä, ihmiset vain kaukaisina hahmoina.
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..12:ssa.
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
  /* ---- VARSOVA — kuninkaanlinna, Wilanów, Saaripalatsi. */
  {
    id: 'varsova-aamu',
    tiedosto: 'hero-varsova-aamu.png',
    kaupunki: 'varsova',
    prompti: p(
      'the Royal Castle on Castle Square in Warsaw',
      'the long brick palace rendered in warm reddish pink with pale'
      + ' stone dressings, a front some 90 metres wide of three storeys'
      + ' under a steep dark tiled roof, and in the middle of it one'
      + ' square clock tower climbing 60 metres to a green copper cupola'
      + ' with a gilded ball and a slender spire, even rows of tall'
      + ' rectangular windows and a rusticated stone base below them,'
      + ' low early morning sun from the east on the tower face while'
      + ' the lower wing stays in shadow; there is only ONE tower in the'
      + ' picture and nothing rises behind the roofline',
      'the sloping cobbled Castle Square below with the tall granite'
      + ' column of King Sigismund and its bronze figure on top, the'
      + ' camera standing on the castle side of the square so that the'
      + ' low stone balustrade and the wide steps at the foot of the'
      + ' wall are in the foreground, the pastel gabled townhouses of'
      + ' the old town closing the far side, people crossing the cobbles'
      + ' as small figures, and the Vistula and the flat roofs of the'
      + ' eastern bank beyond',
    ),
    selite: 'Varsovan kuninkaanlinna sai barokkiasunsa 1598–1619, se '
      + 'tuhoutui syyskuussa 1944 ja koottiin uudelleen 1971–1984 '
      + 'vanhojen piirustusten mukaan — Sigismundin torni nousee 60 '
      + 'metriin ja tiilijulkisivu on 90 metriä pitkä.',
  },
  {
    id: 'varsova-keskipaiva',
    tiedosto: 'hero-varsova-keskipaiva.png',
    kaupunki: 'varsova',
    prompti: p(
      'Wilanów Palace on the southern edge of Warsaw',
      'the two-storey baroque palace of plastered brick painted pale'
      + ' yellow with white pilasters, gilded ornament and a sculpted'
      + ' frieze under the cornice, a taller central block crowned by a'
      + ' low pavilion and flanked by two square alcove towers with'
      + ' small baroque spires, long gallery wings running out to left'
      + ' and right to enclose a courtyard, stone statues standing on'
      + ' the roof balustrade, high midday sun flattening the shadows on'
      + ' the yellow walls; there is only ONE palace in the picture and'
      + ' nothing rises behind its roofline',
      'the gravelled entrance courtyard closed by a low wall and a gate,'
      + ' the geometric baroque parterres and clipped hedges of the'
      + ' garden dropping in two terraces toward a long lake behind the'
      + ' building, gardeners and visitors as small figures on the'
      + ' paths, the old lime trees of the park around it, and the low'
      + ' roofs of the Wilanów district with the distant towers of'
      + ' central Warsaw in the summer haze',
    ),
    selite: 'Wilanówin palatsin rakentaminen alkoi 23. huhtikuuta 1677 '
      + 'Augustyn Wincenty Loccin suunnitelmien mukaan ja päärakennus '
      + 'valmistui 1696, ja Elżbieta Sieniawska laajensi sen '
      + 'sivusiivillä 1720–1729.',
  },
  {
    id: 'varsova-ilta',
    tiedosto: 'hero-varsova-ilta.png',
    kaupunki: 'varsova',
    prompti: p(
      'the Palace on the Isle in the Royal Baths Park in Warsaw at'
      + ' sunset',
      'the low neoclassical palace of pale stuccoed brick standing on'
      + ' its own island in the lake, two floors tied together by giant'
      + ' Corinthian pilasters and crowned by a stone balustrade'
      + ' carrying mythological statues, a pedimented portico of four'
      + ' columns in the middle of the front, tall arched windows and a'
      + ' flat roof, warm low sunset light from the west along the pale'
      + ' facade with its reflection lying unbroken on the still water;'
      + ' there is only ONE palace in the picture and nothing rises'
      + ' behind its roofline',
      'the lake around the island with the two low bridges that tie it'
      + ' to the shore, swans and a rowing boat on the water, the wooded'
      + ' paths and lawns of the park where people walk as small figures'
      + ' and the first lamps are coming on, the stone amphitheatre on'
      + ' the bank, and the roofs and towers of central Warsaw far'
      + ' beyond the trees',
    ),
    selite: 'Saaripalatsi rakennettiin kylpypaviljongiksi ennen vuotta '
      + '1683 ja valmistui 1689, ja Domenico Merlini muutti sen '
      + '1764–1795 uusklassiseksi kesäpalatsiksi 76 hehtaarin '
      + 'Łazienki-puistoon.',
  },

  /* ---- RIIKA — Mustapäiden talo, vapaudenpatsas, Pietarin kirkko. */
  {
    id: 'riika-aamu',
    tiedosto: 'hero-riika-aamu.png',
    kaupunki: 'riika',
    prompti: p(
      'the House of the Blackheads on Town Hall Square in Riga',
      'the narrow tall guild house of red brick with a richly'
      + ' ornamented stone front, a stepped gable climbing in tiers'
      + ' above the roof with statues standing in niches and gilded'
      + ' figures at the corners, a large astronomical clock set into'
      + ' the gable, tall arched windows with stone tracery and a carved'
      + ' stone doorway reached by a few steps, low early morning sun'
      + ' from the east lighting the whole front while the lane beside'
      + ' it stays dark; there is only ONE such building in the picture'
      + ' and nothing rises behind the roofline',
      'the paved Town Hall Square below with the dark statue of Roland'
      + ' on its plinth in front of the house, the camera standing on'
      + ' the house side of the square so that the worn granite paving'
      + ' and the low bollards are in the foreground, the pale classical'
      + ' town hall closing the opposite side, cafe tables and early'
      + ' walkers as small figures, and the red tiled roofs of the old'
      + ' town with the Daugava beyond',
    ),
    selite: 'Mustapäiden talo pystytettiin 1334 kauppiaiden varastoksi '
      + 'ja juhlapaikaksi, se tuhoutui 29. kesäkuuta 1941 ja purettiin '
      + '1948, ja nykyinen talo on 1996–1999 tehty jälleenrakennus, '
      + 'joka avattiin 9. joulukuuta 1999.',
  },
  {
    id: 'riika-keskipaiva',
    tiedosto: 'hero-riika-keskipaiva.png',
    kaupunki: 'riika',
    prompti: p(
      'the Freedom Monument at the head of Brivibas boulevard in Riga',
      'the slender travertine column rising 42 metres from a broad'
      + ' stepped granite base, a copper figure of a woman nine metres'
      + ' tall standing on the top and holding three gilded stars above'
      + ' her head, granite sculpture groups and carved reliefs ranged'
      + ' around the base, high midday sun bleaching the pale stone and'
      + ' making the gilded stars flare against the sky; there is only'
      + ' ONE such monument in the picture and nothing rises behind it',
      'the wide paved plaza around the base with flowers laid on the'
      + ' steps, the camera standing on the old town side of the plaza'
      + ' so that the low chain barrier and the granite kerb are in the'
      + ' foreground, the canal park with its willows and the yellow'
      + ' opera house on one side, the broad boulevard with trams and'
      + ' traffic running away on the other, and the tiled roofs and'
      + ' green spires of Riga in the summer haze',
    ),
    selite: 'Riian vapaudenpatsas paljastettiin 18. marraskuuta 1935 '
      + 'kuvanveistäjä Kārlis Zālen suunnitelman mukaan, se on 42 '
      + 'metriä korkea, ja huipulla seisova yhdeksänmetrinen kuparinen '
      + 'naishahmo kohottaa käsissään kolme kullattua tähteä.',
  },
  {
    id: 'riika-ilta',
    tiedosto: 'hero-riika-ilta.png',
    kaupunki: 'riika',
    prompti: p(
      'the church of Saint Peter in the old town of Riga at sunset',
      'the tall red brick church with white stone portals and a steep'
      + ' dark roof over its buttressed gothic nave, and at the west end'
      + ' one enormous tower whose three tapering green copper galleries'
      + ' narrow step by step to a long thin spire with a gilded'
      + ' weathercock at the tip, an open observation gallery ringing'
      + ' the tower 72 metres above the street, warm low sunset light'
      + ' from the west turning the brick deep red and catching the'
      + ' gilded cock; there is only ONE tower in the picture and'
      + ' nothing rises behind the roofline',
      'the narrow cobbled lanes and small squares of the old town packed'
      + ' tightly around the church with red tiled roofs and lit shop'
      + ' windows, people walking below as small figures, the low'
      + ' merchant houses and gabled warehouses of the medieval quarter,'
      + ' and the Daugava with its long bridges and the lamps coming on'
      + ' along the far bank',
    ),
    selite: 'Riian Pyhän Pietarin kirkko mainitaan asiakirjoissa ensi '
      + 'kerran vuonna 1209, sen moneen kertaan uusittu torni '
      + 'kunnostettiin 1967–1983, ja tornin näköalatasanne on 72 metrin '
      + 'korkeudessa.',
  },

  /* ---- KUWAIT — Kuwaitin tornit, suurmoskeija, Seifin palatsi. */
  {
    id: 'kuwait-aamu',
    tiedosto: 'hero-kuwait-aamu.png',
    kaupunki: 'kuwait',
    prompti: p(
      'the Kuwait Towers on their spit of land in Kuwait City',
      'the three tapering concrete towers standing in a line, the'
      + ' tallest rising 187 metres and carrying two spheres, the lower'
      + ' sphere a water tank with a restaurant and the smaller upper'
      + ' sphere a revolving viewing cafe whose continuous band of'
      + ' translucent tinted glass lets the lit ceiling and the'
      + ' silhouettes of tables and people show through it, the second'
      + ' tower 147 metres tall with one sphere, the third a plain'
      + ' needle with no sphere at all, every sphere clad in thousands'
      + ' of small enamelled steel discs in eight shades of blue, green'
      + ' and grey, low early morning sun from the east glinting disc by'
      + ' disc; there are only THESE THREE towers in the picture and'
      + ' nothing rises behind them',
      'the low green park and sea wall at the foot of the towers with'
      + ' palms, footpaths and a car park, the shallow blue water of'
      + ' Kuwait Bay wrapping around the point with a few small boats,'
      + ' a straight coastal road with early traffic and people walking'
      + ' as small figures, and the glass towers of the city centre'
      + ' standing back along the shore in the morning haze',
    ),
    selite: 'Kuwaitin tornit vihittiin maaliskuussa 1979 tanskalaisen '
      + 'Malene Bjørnin suunnitelman mukaan, korkein niistä on 187 '
      + 'metriä, ja pallojen pintaa peittää noin 41 000 emaloitua '
      + 'teräskiekkoa kahdeksassa sinisen, vihreän ja harmaan sävyssä.',
  },
  {
    id: 'kuwait-keskipaiva',
    tiedosto: 'hero-kuwait-keskipaiva.png',
    kaupunki: 'kuwait',
    prompti: p(
      'the Grand Mosque of Kuwait in the centre of Kuwait City',
      'the low sand-coloured stone mosque covering a huge rectangle of'
      + ' ground, arcades of pointed arches running along every side'
      + ' under a flat parapet, one broad ribbed dome 26 metres across'
      + ' and 43 metres high over the prayer hall with carved bands of'
      + ' calligraphy around its base, one single minaret 74 metres tall'
      + ' in the Andalusian manner at the corner with a square shaft, a'
      + ' balcony and a small open lantern on top, carved teak doors and'
      + ' rows of shaded windows, high midday sun burning white on the'
      + ' stone; there is only ONE dome and ONE minaret in the picture'
      + ' and nothing rises behind the roofline',
      'the walled forecourts and date palms around the mosque with'
      + ' paved parking and a fountain, worshippers arriving as small'
      + ' figures along the paths, a wide multi-lane avenue in front'
      + ' with traffic, and the glass office towers of the city standing'
      + ' further back with the flat blue bay beyond them',
    ),
    selite: 'Kuwaitin suurmoskeija rakennettiin 1979–1986, sen kupoli '
      + 'on 26 metriä leveä ja 43 metriä korkea, minareetti nousee 74 '
      + 'metriin, ja rukoussaliin mahtuu kymmenentuhatta ihmistä.',
  },
  {
    id: 'kuwait-ilta',
    tiedosto: 'hero-kuwait-ilta.png',
    kaupunki: 'kuwait',
    prompti: p(
      'Seif Palace on the waterfront of Kuwait City at sunset',
      'the long low palace of pale stone and plaster built in the old'
      + ' Kuwaiti manner, arcaded galleries and shaded balconies along'
      + ' the sea front, carved wooden doors and screened windows, and'
      + ' rising from the middle of it one square clock tower faced with'
      + ' small blue tiles in geometric patterns and capped by a shallow'
      + ' roof plated in gold with a slender finial, warm low sunset'
      + ' light from the west setting the gilded cap alight while the'
      + ' blue tiles go dark; there is only ONE tower in the picture and'
      + ' nothing rises behind the roofline',
      'the paved waterfront in front of the palace with palms, low walls'
      + ' and a gate, the camera standing on the palace side of the road'
      + ' so that the tiled forecourt and a row of flagpoles are in the'
      + ' foreground, the calm water of the bay with fishing boats and'
      + ' wooden dhows moored along the quay, headlights running along'
      + ' the corniche, and the lit skyscrapers of the city further'
      + ' along the shore',
    ),
    selite: 'Seifin palatsin rakentaminen alkoi 1880 ja siihen '
      + 'käytettiin paikallista savea, kiveä, kalkkikiveä, puuta ja '
      + 'metallia, ja sen kellotorni on päällystetty sinisillä '
      + 'kaakeleilla ja kullatulla katolla.',
  },

  /* ---- TABRIZ — Sininen moskeija, Arg ja Saat-torni. */
  {
    id: 'tabriz-aamu',
    tiedosto: 'hero-tabriz-aamu.png',
    kaupunki: 'tabriz',
    prompti: p(
      'the Blue Mosque of Tabriz',
      'the low brick mosque whose whole street front is one great'
      + ' pointed entrance iwan framed by a rectangular band of'
      + ' tilework, every surface faced with dark cobalt blue mosaic'
      + ' tiles carrying white and turquoise arabesques, floral panels'
      + ' and broad calligraphy borders, a low brick dome showing behind'
      + ' the portal and the stumps of two lost minarets at the front'
      + ' corners, bare brick showing through where tiles are missing,'
      + ' low early morning sun from the east striking the glaze so that'
      + ' the blue goes almost black inside the shadowed vault; there is'
      + ' only ONE such portal in the picture and nothing rises behind'
      + ' the roofline',
      'the small walled garden in front with clipped hedges, pines and a'
      + ' fountain, the camera standing on the garden side so that a low'
      + ' iron railing and stone benches are in the foreground, a busy'
      + ' avenue with early traffic beyond the wall, the low brick and'
      + ' plaster blocks of central Tabriz around it, and the bare brown'
      + ' ridges of the mountains closing the valley',
    ),
    selite: 'Tabrizin Sininen moskeija valmistui lokakuussa 1465 '
      + 'hallitsija Jahanshahin puolison Khatun Jan Begomin '
      + 'toimeksiannosta, vuoden 1780 maanjäristys jätti pystyyn '
      + 'lähinnä porttiholvin, ja jälleenrakennus aloitettiin 1973.',
  },
  {
    id: 'tabriz-keskipaiva',
    tiedosto: 'hero-tabriz-keskipaiva.png',
    kaupunki: 'tabriz',
    prompti: p(
      'the Arg of Tabriz, the great brick wall of the Alishah citadel',
      'the colossal bare brick mass standing alone above the city, the'
      + ' surviving front of a vaulted hall that measured 30.5 metres'
      + ' across, one gigantic pointed arch opening in it with the vault'
      + ' broken open to the sky, walls metres thick of weathered ochre'
      + ' fired brick without a single window, heavy buttressed corners'
      + ' and stepped brick courses at the base, high midday sun'
      + ' throwing a hard black shadow into the arch; there is only ONE'
      + ' such structure in the picture and nothing rises behind it',
      'the paved terrace and gardens at the foot of the wall with pines'
      + ' and low railings, the camera standing on the terrace side so'
      + ' that the stone steps and a line of lamp posts are in the'
      + ' foreground, visitors as small figures under the wall for'
      + ' scale, the wide avenues and low brick blocks of central Tabriz'
      + ' beyond, and the dry brown mountains around the valley',
    ),
    selite: 'Tabrizin Arg eli Alishahin muuri rakennettiin 1310–1321 '
      + 'ilkhanidien aikana suureksi holvatuksi moskeijaksi, jonka '
      + 'holvi oli 30,5 metriä leveä ja 48 metriä syvä, ja siitä on '
      + 'jäljellä enää massiivinen tiiliseinä.',
  },
  {
    id: 'tabriz-ilta',
    tiedosto: 'hero-tabriz-ilta.png',
    kaupunki: 'tabriz',
    prompti: p(
      'the Municipality Palace of Tabriz, the Saat Tower building, at'
      + ' sunset',
      'the grey stone civic palace built as two long symmetrical wings'
      + ' that meet at a right angle like spread wings, three storeys of'
      + ' dressed stone with tall arched windows, carved stone bands and'
      + ' a low balustrade, and in the angle between the wings one'
      + ' square clock tower 30.5 metres high with a clock face on each'
      + ' of its four sides, a small pyramidal roof and a flagpole,'
      + ' warm low sunset light from the west along one wing while the'
      + ' other falls into shadow and the clock faces light up; there is'
      + ' only ONE tower in the picture and nothing rises behind the'
      + ' roofline',
      'the big paved square in front with fountains, flower beds and a'
      + ' low balustrade, the camera standing on the building side of'
      + ' the square so that the front steps and the lamps along them'
      + ' are in the foreground, evening traffic circling the square in'
      + ' ribbons of headlights, people crossing as small figures, and'
      + ' the low roofs of central Tabriz with the mountains going'
      + ' violet behind',
    ),
    selite: 'Tabrizin kaupungintalo eli Saat-torni valmistui 1934 '
      + 'Avedis Ohanjanianin suunnitelmien mukaan, sen nelitauluinen '
      + 'kellotorni on 30,5 metriä korkea, ja vuodesta 2007 talossa on '
      + 'toiminut myös kaupunginmuseo.',
  },

  /* ---- KAŠGAR — vanhankaupungin portti, Balasagunin mausoleumi ja
     basaarin porttitalo. */
  {
    id: 'kashgar-aamu',
    tiedosto: 'hero-kashgar-aamu.png',
    kaupunki: 'kashgar',
    prompti: p(
      'the great gate of the old town of Kashgar',
      'the tall mud-brick gatehouse of the old quarter, one wide'
      + ' pointed archway cut through a thick ochre wall, the wall faced'
      + ' with pale yellow brick laid in patterned courses and topped by'
      + ' a row of small crenellations, two square towers with wooden'
      + ' balconies and carved eaves flanking the arch and a taller'
      + ' tiled roof with upturned corners over the middle, low early'
      + ' morning sun from the east filling the archway with warm light'
      + ' while the lane beyond stays in shadow; there is only ONE such'
      + ' gate in the picture and nothing rises behind the roofline',
      'the sloping street outside the gate with market stalls just'
      + ' opening, a few handcarts and bicycles and people as small'
      + ' distant figures, the mud-brick houses of the old town packed'
      + ' on their loess hill behind the wall with flat roofs,'
      + ' poplar-beam balconies and narrow crooked lanes between them,'
      + ' and the wide new avenues and concrete blocks of the modern'
      + ' city out on the plain beyond',
    ),
    selite: 'Kašgarin vanhankaupungin kortteleita ei ole kaavoitettu, '
      + 'vaan ne ovat kasvaneet vuosisatojen kuluessa savitiiliseinien '
      + 'ja sisäpihojen varaan loessikukkulan päälle, ja 2000-luvun '
      + 'alussa siellä asui kaksi viidesosaa koko kaupungin väestöstä.',
  },
  {
    id: 'kashgar-keskipaiva',
    tiedosto: 'hero-kashgar-keskipaiva.png',
    kaupunki: 'kashgar',
    prompti: p(
      'the mausoleum of the poet Yusuf Balasaguni in Kashgar',
      'the square tiled mausoleum standing in a walled garden, a tall'
      + ' rectangular portal in the middle of the front with a pointed'
      + ' niche set into it, the whole face covered with glazed tiles in'
      + ' turquoise, white and deep blue in geometric and floral panels'
      + ' with calligraphy bands between them, a ribbed turquoise dome'
      + ' on a high drum behind the portal and a slender tiled minaret'
      + ' with a small balcony at each front corner, high midday sun'
      + ' blazing on the glaze so that the turquoise looks almost white;'
      + ' there is only ONE such building in the picture and nothing'
      + ' rises behind the roofline',
      'the walled garden below with straight paths, rose beds, poplars'
      + ' and a low tiled fence, a few visitors as small figures at the'
      + ' steps, the flat roofs, courtyards and dusty streets of Kashgar'
      + ' around it, and the poplar windbreaks and irrigated fields of'
      + ' the oasis running out toward the desert haze',
    ),
    selite: 'Runoilija Yusuf Balasagunin (noin 1019–1077) mausoleumi '
      + 'pystytettiin Kašgariin 1865 Jakub Begin toimesta, ja '
      + 'Balasaguni oli kirjoittanut vuonna 1069 turkkilaiskielisen '
      + 'hallitsijan ohjekirjan Kutadgu Bilig.',
  },
  {
    id: 'kashgar-ilta',
    tiedosto: 'hero-kashgar-ilta.png',
    kaupunki: 'kashgar',
    prompti: p(
      'the gateway building of the great bazaar of Kashgar at sunset',
      'the broad two-storey market front of yellow brick with one huge'
      + ' pointed arch in the middle deep enough to hold a shaded'
      + ' passage, rows of arched shop fronts on both sides under a'
      + ' tiled cornice, two short round towers with green tiled caps'
      + ' and small balconies at the ends of the front, patterned'
      + ' brickwork and carved wooden shutters, warm low sunset light'
      + ' from the west flooding the arch and the shop fronts while the'
      + ' lamps inside come on; there is only ONE such gateway in the'
      + ' picture and nothing rises behind the roofline',
      'the wide market street in front with awnings, handcarts, melon'
      + ' stalls and donkey carts and people moving as small distant'
      + ' figures in the last light, the camera standing on the bazaar'
      + ' side of the street so that the paving and a row of parked'
      + ' carts are in the foreground, low brick shop houses and'
      + ' workshops lining the far side, and the flat roofs and poplars'
      + ' of Kashgar running out to a dark desert horizon',
    ),
    selite: 'Kašgarin sunnuntaimarkkinat ovat Keski-Aasian suurin '
      + 'markkinapaikka, ja vilkkaimpina tunteina paikalla käy '
      + 'satatuhatta ihmistä.',
  },

  /* ---- JEKATERINBURG — Veren kirkko, Valkoinen torni, Iset-torni. */
  {
    id: 'jekaterinburg-aamu',
    tiedosto: 'hero-jekaterinburg-aamu.png',
    kaupunki: 'jekaterinburg',
    prompti: p(
      'the Church on the Blood in Yekaterinburg',
      'the tall church of white stone and red-brown granite standing on'
      + ' a high terraced base in the Byzantine revival manner, a broad'
      + ' central drum carrying one big gilded onion dome with four'
      + ' smaller gilded domes set around it, a square bell tower over'
      + ' the west entrance with its own gilded spire, tiers of rounded'
      + ' arched windows and dark red granite steps and balustrades'
      + ' below, low early morning sun from the east setting the gilding'
      + ' alight against a pale sky; there is only ONE such church in'
      + ' the picture and nothing rises behind the roofline',
      'the paved terraces and gravel paths around the church with young'
      + ' lime trees and low granite walls, the camera standing on the'
      + ' terrace side so that the wide steps and the iron railing are'
      + ' in the foreground, a few early walkers as small figures, the'
      + ' wooded slope falling toward the Iset river and its dam, and'
      + ' the mixed roofs, cupolas and glass towers of central'
      + ' Yekaterinburg beyond',
    ),
    selite: 'Jekaterinburgin Veren kirkko rakennettiin 2000–2003 ja '
      + 'vihittiin 16. heinäkuuta 2003, se on tyyliltään '
      + 'uusbysanttilainen, ja 2 760 neliömetrin kokonaisuuteen '
      + 'kuuluvat kaksi kirkkoa, kellotorni ja museo.',
  },
  {
    id: 'jekaterinburg-keskipaiva',
    tiedosto: 'hero-jekaterinburg-keskipaiva.png',
    kaupunki: 'jekaterinburg',
    prompti: p(
      'the White Tower, the constructivist water tower of the Uralmash'
      + ' district in Yekaterinburg',
      'the plain white-painted cylinder of reinforced concrete 13.5'
      + ' metres across and 29 metres high, carried on four thick'
      + ' external columns with the steel water tank inside it, a tall'
      + ' narrow rectangular stair shaft attached to one side, and a'
      + ' continuous ribbon of translucent glazing running horizontally'
      + ' around the cylinder and vertically up the stair shaft through'
      + ' which the bare concrete landings inside and the sky on the far'
      + ' side show as a grey-green haze, high midday sun bleaching the'
      + ' white concrete; there is only ONE such tower in the picture'
      + ' and nothing rises behind it',
      'the rough grassy hill below with birches, a low fence and a'
      + ' gravel path where a few people walk as small figures, the'
      + ' straight streets and low yellow apartment blocks of the'
      + ' Uralmash district around it, factory sheds and chimneys'
      + ' further off, and the flat forested horizon of the Urals under'
      + ' a hard blue sky',
    ),
    selite: 'Uralmashin Valkoinen torni rakennettiin vesitorniksi '
      + '1929–1931 Moisei Reisherin suunnitelmien mukaan, se on 29 '
      + 'metriä korkea, ja sen 700 kuutiometrin terässäiliö oli '
      + 'kaupungin ensimmäisiä hitsattuja rakenteita.',
  },
  {
    id: 'jekaterinburg-ilta',
    tiedosto: 'hero-jekaterinburg-ilta.png',
    kaupunki: 'jekaterinburg',
    prompti: p(
      'the Iset Tower in the Yekaterinburg-City district at sunset',
      'the cylindrical skyscraper rising 209 metres in 52 storeys, a'
      + ' smooth round shaft of glass and aluminium curtain walling'
      + ' divided into three visibly different bands of facade, the'
      + ' triple-glazed skin translucent enough that the lit floors,'
      + ' ceiling strips and balcony slabs show through it while the'
      + ' sunset sky slides across the glass as a mirrored band, a'
      + ' rounded crown and a flat technical roof on top, warm low'
      + ' sunset light from the west on the western curve while the'
      + ' eastern side falls into blue shadow; there is only ONE round'
      + ' tower in the picture and nothing rises behind it',
      'the plaza and low glass podium at its foot with young trees and'
      + ' people as small figures, the other blocks of the business'
      + ' district and a broad bridge over the Iset river with'
      + ' headlights, the city pond and the low nineteenth-century'
      + ' streets of the centre beyond it, and the flat wooded horizon'
      + ' going violet in the last light',
    ),
    selite: 'Iset-torni rakennettiin 2010–2015 Werner Sobekin '
      + 'suunnitelmien mukaan, se on 209 metriä korkea ja '
      + '52-kerroksinen, ja se on Jekaterinburgin korkein rakennus.',
  },
];
