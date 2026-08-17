/*
 * Kohdekartan miniatyyripiirrosten AI-generointi (omistajan tilaus
 * 15.8.2026: "jos siihen saisi jotkut miniatyyrikuvat piirrettynä
 * nähtävyyksistä (nano banana) voisi olla hieno. Sama idea kuin
 * huvipuisto kartoissa" ja "Tee piirrokset sinne [Berliiniin] ensin
 * sekä samat kolmeen kaupunkiin hki. Pariisi. Lontoo").
 *
 * Sama putki kuin tools/generoi-varustekuvat.mjs: gemini-3-pro-image
 * antaa 1024×1024 PNG:n, joka pienennetään 512 px:n JPEG:ksi
 * Chromiumin kanvaasilla samassa ajossa. Tyyli (omistajan palaute
 * 15.8.2026: "yksivärisiä ja hieman karikatyyrin omaisia,
 * mahdollisimman yksinkertaisia"): yksivärinen seepiamusteluonnos,
 * kevyt karikatyyri, muutama varma viiva, paperinvärinen tausta.
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 node tools/generoi-miniatyyrit.mjs [avain …]
 *          Avain on muotoa berliini-tv-torni; ilman argumentteja
 *          generoidaan kaikki listatut. KATSO JOKAINEN KUVA SILMIN
 *          ennen peliin kytkemistä (js/packs/miniatyyrit.js).
 * Ulos:    assets/kartat/miniatyyrit/<avain>.jpg
 *
 * KUSTANNUSSÄÄNTÖ (omistajan päätös 16.8.2026, kun 30 €:n raja
 * täyttyi: "Aika arvokasta tehdä sillä kuvia" → budjetti nostettu
 * kiristettyä putkea vastaan): jokainen generointi maksaa ~0,04 €,
 * ja hukka tuli uusinta-ajoista. Siksi:
 *   1. OLEMASSA OLEVA TIEDOSTO OHITETAAN aina — kohteen saa
 *      uusiksi vain nimeämällä sen argumenttina JA lisäämällä
 *      --uusiksi. Koko listan uusinta-ajo ei ole enää mahdollinen
 *      vahingossa.
 *   2. YKSI otto per kohde. Hylätyt kirjataan ja generoidaan
 *      uudelleen vasta katselmoinnin jälkeen täsmäavaimilla — ei
 *      "generoi kunnes kelpaa" -silmukkaa.
 *   3. Ajon loppuun tulostuu generointien määrä ja kustannusarvio.
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/*
 * HYBRIDIMALLI (omistajan päätös 17.8.2026, vertailuajo kuvatesti-
 * arkilla): yksinkertaiset aiheet — tornit, patsaat, sillat,
 * yksittäiset selkeät rakennukset — generoidaan halvalla mallilla
 * (~puolet hinnasta, silmin todettu tasavertaiseksi), monimutkaiset
 * rakennuskokonaisuudet (palatsit, katedraalit, saaret) kalliimmalla.
 * Valinta tehdään kohdelistassa per kohde: kolmas alkio 'halpa'
 * vaihtaa mallin. MINIATYYRI_MALLI-ympäristömuuttuja ohittaa
 * molemmat. Vertailussa halvan mallin heikkoudet olivat portaiden
 * kaltaiset liitoskohdat ja tiheä viiva monimutkaisissa kohteissa.
 */
const MALLI = 'gemini-3-pro-image';
const HALPA_MALLI = 'gemini-3.1-flash-image';
const valitseMalli = (merkinta) => process.env.MINIATYYRI_MALLI
  ?? (merkinta === 'halpa' ? HALPA_MALLI : MALLI);
/*
 * TÄYSI 1024 — EI PIENENNYSTÄ (omistajan palaute 15.8.2026:
 * "piirroksen resoluutio ei riitä"). Suurennettu piirros on 75 %
 * karttaikkunan korkeudesta eli ~900 px, joten 512→384-kutistus
 * näkyi sumeutena. Malli antaa 1024×1024, ja se pidetään sellaisenaan.
 */
const LEVEYS = 1024;
const LAATU = 0.85;

// Ympäristössä avain on toisinaan kirjoitusvirheellisellä nimellä
// GOOGLW_API_KEY — luetaan molemmat (sama kuin muissa generoijissa).
const avain = process.env.GOOGLE_API_KEY ?? process.env.GOOGLW_API_KEY;
if (!avain) {
  console.error('GOOGLE_API_KEY (tai GOOGLW_API_KEY) puuttuu ympäristöstä — kuvia ei voi generoida.');
  process.exit(1);
}

/*
 * Yhtenäinen tyylikääre: huvipuistokartan pienoiskuva. Kolme vartiota
 * samoista syistä kuin muissa generoijissa:
 *   1. Tausta täyttää KOKO kanvaasin — kortti on paperia, eikä kuvan
 *      sisään saa syntyä omaa paperiarkkia, kehystä tai laatikkoa.
 *   2. Ei tekstiä missään muodossa: malli lipsuu kylttiteksteihin,
 *      ja väärin kirjoitettu nimi kuvassa on pahempi kuin tyhjä.
 *   3. Ei karttaa rakennuksen ympärille: pienoiskuva istutetaan
 *      OIKEALLE kartalle, joten kuvan oma katuverkko valehtelisi.
 */
const TYYLI = (aihe) => 'A tiny landmark sketch for a vintage '
  + `hand-drawn city map: ${aihe}. `
  + 'Drawn as a SIMPLE MONOCHROME ink sketch in one single color only — '
  + 'dark sepia brown ink — with no other colors, no watercolor, no '
  + 'washes, no fills except sparse light hatching. Slightly '
  + 'caricatured and playful: its most recognizable features gently '
  + 'exaggerated, proportions charmingly squashed, like a quick '
  + 'confident cartoon sketch by a travel illustrator. As simple as '
  + 'possible: just a few clean confident ink lines, minimal detail, '
  + 'large areas left empty paper. A small charming three-quarter '
  + 'aerial view. The building stands alone on a plain warm cream '
  + 'paper background (like aged map paper, #f2ecd8) that fills the '
  + 'ENTIRE square canvas edge to edge; at most a few short hatched '
  + 'ink strokes as a ground shadow under the building. No surrounding '
  + 'streets or map, no text, no letters, no signs, no frame, no '
  + 'border, no people in front. Square 1:1. '
  // Sama vartio kuin kohtaamiskuvissa: tausta on koko kanvaasi, EI
  // pöydällä makaava paperiarkki — Tower Bridgen ensimmäiseen ottoon
  // piirtyi arkin reunat ja varjo, joka lukisi kortilla kehyksenä.
  + 'The cream paper fills the whole canvas edge to edge: do NOT paint '
  + 'a sheet of paper lying on a surface, no paper edges, no drop '
  + 'shadow around the background, no rectangular panel. '
  // Taustanpoisto (tools/leikkaa-miniatyyrit.mjs) vaatii TASAISEN
  // taustan: valkoinen akvarellipesu rakennuksen ympärillä esti
  // leikkauksen kolmessa ensimmäisen erän kuvassa.
  + 'Do NOT paint any white halo, glow or watercolor wash around the '
  + 'building: the flat cream background color continues completely '
  + 'unchanged right up to the building outline on every side.';

/*
 * Kohteet kaupungeittain. AVAIMEN ALKUOSA on kaupungin tunnus ja
 * loppuosa kohteen tunniste; js/packs/miniatyyrit.js sitoo tiedoston
 * kohteen NIMEEN (sama avain kuin NAHTAVYYSJUTUT). Kuvaukset ovat
 * arkkitehtuurin tosiasioita — väärin piirretty maamerkki huomataan.
 */
const KUVAT = [
  // ── Berliini (pilotti — omistajan tilaus "sinne ensin") ──────────
  ['berliini-valtiopaivatalo', 'the Reichstag parliament building in '
    + 'Berlin: a massive neoclassical stone building with a grand '
    + 'six-columned portico, four square corner towers, and a large '
    + 'modern glass dome with a spiral walkway on its roof'],
  ['berliini-brandenburgin-portti', 'the Brandenburg Gate in Berlin: a '
    + 'sandstone neoclassical city gate with twelve Doric columns '
    + 'forming five passages, topped by the Quadriga — a '
    + 'four-horse chariot driven by a winged goddess'],
  ['berliini-checkpoint-charlie', 'the Checkpoint Charlie guardhouse '
    + 'in Berlin: a small white rectangular border-crossing booth with '
    + 'windows on all sides, sandbags stacked around its base and a '
    + 'simple striped barrier beside it'],
  ['berliini-museosaari', 'Museum Island in Berlin: a cluster of grand '
    + 'neoclassical museum buildings with long columned facades on a '
    + 'small river island, beside them the Berlin Cathedral with its grand dome'],
  ['berliini-tv-torni', 'the Berlin TV Tower (Fernsehturm): a very '
    + 'tall slender concrete tower with a shiny steel sphere near the '
    + 'top and a striped antenna spire above it'],
  /*
   * Ensimmäinen otto kirjoitti muuriin "EAST SIDE GALLERY" kahdesti —
   * kohteen nimi aiheessa vetää tekstin kuvaan. Siksi aihe kuvataan
   * nimeämättä kohdetta, ja tekstikielto toistetaan aiheen sisällä.
   */
  ['berliini-east-side-gallery', 'a '
    + 'long straight free-standing segment of a tall concrete wall '
    + 'covered edge to edge in painted murals — only abstract '
    + 'shapes, swirls and stylized painted faces, strictly no letters, '
    + 'no words and no writing anywhere on the wall — seen at a slight '
    + 'angle so its length shows'],

  // ── Helsinki ─────────────────────────────────────────────────────
  ['helsinki-temppeliaukion-kirkko', 'a round church sunk directly '
    + 'into natural grey granite bedrock: a shallow circular copper '
    + 'dome resting on a ring of skylights above rough rock walls, '
    + 'low and wide rather than tall'],
  ['helsinki-linnanmaki', 'a compact old amusement park on a low '
    + 'hill: a white wooden roller coaster with lattice supports, a '
    + 'slender panorama tower with a ring-shaped observation cabin, '
    + 'and a small carousel with a striped roof'],
  ['helsinki-paarautatieasema', 'a monumental granite railway '
    + 'station in national romantic style: a tall clock tower on one '
    + 'side, a great arched entrance, and two pairs of giant stone '
    + 'figures holding spherical lamps flanking the doors'],
  ['helsinki-kaisaniemen-puisto', 'a leafy northern city park: broad '
    + 'lawns, old deciduous trees, winding gravel paths, a small '
    + 'white glasshouse at the edge and a calm bay glimpsed behind '
    + 'the trees'],
  ['helsinki-kallion-kirkko', 'a grey granite church in national '
    + 'romantic style on a hilltop: a very tall MASSIVE broad square '
    + 'stone bell tower with clock faces and a low pyramid copper cap, '
    + 'the heavy nave lower behind it — monumental and blocky, not a '
    + 'slender village church'],
  ['helsinki-tuomiokirkko', 'a gleaming white neoclassical cathedral '
    + 'on top of a broad steep flight of stone steps: a tall '
    + 'central dome, four smaller domes around it and columned '
    + 'porticoes on each side'],
  ['helsinki-uspenskin-katedraali', 'a red-brick orthodox cathedral '
    + 'on a rocky outcrop: a cluster of thirteen small onion '
    + 'cupolas above narrow arched windows'],
  ['helsinki-johanneksenkirkko', 'a red-brick gothic revival church '
    + 'with two identical very tall slender towers topped by pointed '
    + 'copper spires'],
  ['helsinki-suomenlinna', 'a sea fortress spread over small rocky '
    + 'islands: low stone bastion walls and grassy ramparts, a pale '
    + 'church tower rising above them, a few old cannons and a small '
    + 'sailing boat by the shore'],

  // ── Pariisi ──────────────────────────────────────────────────────
  ['pariisi-eiffel-torni', 'the Eiffel Tower: a tall wrought-iron '
    + 'lattice tower in warm brown, four arched legs joining into a '
    + 'tapering spire with viewing platforms'],
  ['pariisi-riemukaari', 'the Arc de Triomphe: a massive stone '
    + 'triumphal arch with one grand central archway, sculpted '
    + 'reliefs of winged figures on its pillars and a frieze band '
    + 'near the top'],
  ['pariisi-concorden-aukio', 'a grand paved square with a tall '
    + 'ancient Egyptian obelisk of pink granite with a small gilded '
    + 'pyramid tip, flanked by two ornate tiered fountains with '
    + 'sculpted figures'],
  ['pariisi-louvre', 'a long classical palace with ornate stone '
    + 'facades and mansard roofs forming a courtyard, and in the '
    + 'courtyard a modern glass pyramid'],
  ['pariisi-luxembourgin-puisto', 'a formal French garden: an '
    + 'elegant stone palace with slate roofs, a central octagonal '
    + 'pond with tiny toy sailboats, geometric flowerbeds and neat '
    + 'rows of clipped trees'],
  ['pariisi-sacre-coeur', 'a gleaming white basilica on a hilltop: '
    + 'a tall central dome flanked by smaller domes, arched '
    + 'porticoes, and a slender square campanile behind, a long '
    + 'flight of steps below'],
  ['pariisi-pantheon', 'a neoclassical domed monument: a columned '
    + 'portico with a triangular pediment in front, a tall colonnaded '
    + 'drum and dome above'],
  ['pariisi-notre-dame', 'a gothic cathedral on a river island: two '
    + 'square west towers, a large round rose window between them, '
    + 'flying buttresses along the nave and a slender spire over the '
    + 'crossing'],

  // ── Lontoo ───────────────────────────────────────────────────────
  ['lontoo-buckinghamin-palatsi', 'a stately neoclassical palace '
    + 'with a long symmetric stone facade, a central balcony, tall '
    + 'gates in front and a gilded winged statue on a tall column '
    + 'before it'],
  ['lontoo-trafalgar-square', 'a grand city square: one very tall '
    + 'column with a small statue on top, four large lion statues at '
    + 'its base, two round fountains and a long columned gallery '
    + 'facade behind'],
  ['lontoo-big-ben', 'the Big Ben clock tower: a tall gothic revival '
    + 'stone tower with a large white clock face on each side, a pointed '
    + 'spire, a corner of an ornate '
    + 'parliament building at its foot'],
  ['lontoo-lontoon-silma', 'a giant white observation wheel by a '
    + 'river: slender spokes like a bicycle wheel and oval glass '
    + 'capsules along the rim, a hint of water below'],
  ['lontoo-pyhan-paavalin-katedraali', 'an English baroque cathedral: '
    + 'a great dome with a cross on a colonnaded '
    + 'drum, twin baroque towers at the west front with a columned '
    + 'portico between them'],
  ['lontoo-tower-bridge', 'a Victorian river bridge with two tall '
    + 'gothic stone towers, high walkways connecting them, high '
    + 'suspension chains and a twin lifting roadway between the '
    + 'towers'],

  // ── Rooma (Eurooppa-erä 1, 15.8.2026) ────────────────────────────
  ['rooma-pietarinkirkko', 'a vast Renaissance basilica with a great '
    + 'ribbed dome on a colonnaded drum, a long columned facade with '
    + 'statues along the roofline, and two sweeping curved colonnades '
    + 'embracing an oval square with an obelisk'],
  ['rooma-castel-santangelo', 'a massive round drum-shaped fortress '
    + 'on a square base beside a river, a sword-bearing angel statue '
    + 'on its top and a stone bridge lined with statues leading to '
    + 'its gate'],
  ['rooma-espanjalaiset-portaat', 'a wide baroque outdoor staircase '
    + 'cascading down a hillside in curved terraces, a twin-towered '
    + 'church with an obelisk at the top and a low boat-shaped '
    + 'fountain in the small square below'],
  ['rooma-trevin-suihkulahde', 'a grand baroque fountain built '
    + 'against a palace facade: a sea god in a central niche, tritons '
    + 'and rearing winged horses among carved rocks over a wide '
    + 'water basin'],
  ['rooma-pantheon', 'an ancient Roman round temple with a shallow '
    + 'dome pierced by a central round opening, and a deep porch of '
    + 'monolithic columns under a triangular pediment'],
  ['rooma-colosseum', 'a vast ancient elliptical amphitheatre with '
    + 'three tiers of arched arcades, its outer ring partly broken '
    + 'away on one side to reveal the inner walls'],

  // ── Wien ─────────────────────────────────────────────────────────
  ['wien-raatihuone', 'a neo-gothic city hall with a tall central '
    + 'tower carrying a slender openwork spire and a small statue on '
    + 'top, four smaller towers and an arcaded facade with pointed '
    + 'windows'],
  ['wien-hofburg', 'an imperial palace with a long curved wing: a '
    + 'central dome over a grand arched gate, columned facades '
    + 'sweeping to both sides and equestrian statues in front'],
  ['wien-valtionooppera', 'a neo-renaissance opera house with a '
    + 'two-storey arched loggia across the front, a shallow hipped '
    + 'roof and arched windows along the sides'],
  ['wien-stephansdom', 'a gothic cathedral with one immensely tall '
    + 'slender south spire, a steep roof patterned with zigzag '
    + 'diamond tiles and two lower octagonal towers at the front'],
  ['wien-belvedere', 'a wide baroque garden palace with domed '
    + 'octagonal corner pavilions, a gently stepped roofline and a '
    + 'formal terraced garden with fountains descending in front'],
  ['wien-jattiratas', 'a giant historic ferris wheel: a spoked steel '
    + 'wheel on tall lattice pylons with a ring of small boxy cabin '
    + 'gondolas hanging along the rim'],
  ['wien-schonbrunn', 'a very long baroque summer palace with rows '
    + 'of tall windows, a central section with a columned portico '
    + 'and double staircase, and a vast formal courtyard in front'],

  // ── Praha ────────────────────────────────────────────────────────
  ['praha-petrinin-nakotorni', 'a small lattice steel lookout tower '
    + 'on a wooded hilltop, like a slender miniature of a famous '
    + 'iron tower, with an observation cabin near its top'],
  ['praha-prahan-linna', 'a long castle complex along a ridge: '
    + 'palace wings and a basilica with two slim towers, and rising '
    + 'from their middle a gothic cathedral with twin openwork '
    + 'spires and a great tower with a rounded cap'],
  ['praha-kaarlensilta', 'a medieval stone arch bridge over a river, '
    + 'lined with statues of saints along both parapets, with a '
    + 'tall pointed gothic gate tower at its end'],
  ['praha-vanhauusi-synagoga', 'a small medieval synagogue with '
    + 'thick buttressed walls and a very steep sawtooth brick gable '
    + 'rising above its tiled roof'],
  ['praha-astronominen-kello', 'an ornate medieval astronomical '
    + 'clock on a gothic town-hall tower: two large stacked dials '
    + 'with rings and pointers, small carved figures flanking them'],
  ['praha-kansallismuseo', 'a monumental neo-renaissance museum on '
    + 'a rise: a central tower with a gilt-free lantern dome, long '
    + 'symmetrical wings with corner pavilions and a fountain '
    + 'terrace below'],

  // ── Amsterdam ────────────────────────────────────────────────────
  ['amsterdam-keskusrautatieasema', 'a long neo-renaissance railway '
    + 'palace with a richly decorated brick facade, two ornate '
    + 'clock towers and a great arched entrance in the middle'],
  ['amsterdam-anne-frankin-talo', 'a narrow Dutch canal house with '
    + 'tall sash windows and a plain warehouse gable with a '
    + 'hoisting beam, standing in a row of stepped-gable houses at '
    + 'the edge of a canal'],
  ['amsterdam-kuninkaanpalatsi', 'a monumental classical palace on '
    + 'a city square: a wide sandstone facade with a central '
    + 'pediment full of sculpture and a domed cupola tower with a '
    + 'ship weathervane'],
  ['amsterdam-rembrandtin-talo', 'a 17th-century Dutch townhouse '
    + 'with tall shuttered windows in pairs, a triangular cornice '
    + 'gable and stone steps to a raised front door'],
  ['amsterdam-artis-elaintarha', 'a historic zoo garden entrance: '
    + 'two stone pillars topped by eagle sculptures, an ornate '
    + '19th-century pavilion and large trees behind the gates'],
  ['amsterdam-rijksmuseum', 'a grand museum palace mixing gothic '
    + 'and renaissance: two ornate towers with pointed roofs, '
    + 'gabled wings and a monumental arched passage running through '
    + 'the middle'],

  // ── Tukholma ─────────────────────────────────────────────────────
  ['tukholma-kaupungintalo', 'a massive brick city hall on a '
    + 'waterfront: a long arcaded wing and a tall square corner '
    + 'tower topped by an open lantern and a slender spire carrying '
    + 'three small crowns'],
  ['tukholma-riddarholmenin-kirkko', 'a medieval brick church with '
    + 'a tall openwork cast-iron lattice spire, pointed gables and '
    + 'burial chapels clustered around its sides'],
  ['tukholma-sergelin-tori', 'a modernist sunken city plaza with a '
    + 'bold triangle-patterned floor, surrounded by glass office '
    + 'facades, and a tall slender glass obelisk rising from a '
    + 'fountain roundabout'],
  ['tukholma-kuninkaanlinna', 'a vast severe baroque royal palace: '
    + 'a huge rectangular block with a long flat roofline, rows of '
    + 'tall windows and a rusticated base, standing at the water '
    + 'edge of an old town island'],
  ['tukholma-vasa-museo', 'a dark modern museum hall shaped around '
    + 'a great ship: stylized hull walls and three tall ship masts '
    + 'with crow’s nests and rigging rising through the roof'],
  ['tukholma-skansen', 'an open-air museum on a wooded hill: a '
    + 'cluster of historic timber farmhouses with turf and shingle '
    + 'roofs, a wooden bell tower and a windmill among the trees'],

  // ── Kööpenhamina ─────────────────────────────────────────────────
  ['kobenhavn-pieni-merenneito', 'a small statue of a mermaid '
    + 'sitting pensively on a rounded boulder at the water edge, '
    + 'gentle ripples around the stone'],
  ['kobenhavn-amalienborg', 'a royal palace square: four identical '
    + 'rococo palace facades around an octagonal cobbled courtyard '
    + 'with an equestrian statue in the middle'],
  ['kobenhavn-rundetarn', 'a stout round brick tower with sparse '
    + 'small windows and a lattice railing around its flat top, '
    + 'attached to a steep-roofed church'],
  ['kobenhavn-nyhavn', 'a canalside row of tall narrow gabled '
    + 'townhouses of varied heights, with old wooden sailing ships '
    + 'and masts moored along the quay'],
  ['kobenhavn-christiansborg', 'a grand severe palace with a tall '
    + 'central tower carrying a spire topped by two crowns, long '
    + 'symmetrical wings and an arched gateway'],
  ['kobenhavn-tivoli', 'a historic pleasure garden: an ornate '
    + 'Moorish-style palace with onion domes and slender minarets, '
    + 'a wooden roller coaster and strings of garden lanterns among '
    + 'trees'],
  // ── Pariisi, kohteet 9–11 (paketti O4, 16.8.2026) ────────────────
  // Kaksi yritystä 16.8.2026: ensimmäinen tuotti yleisen pikkuaseman
  // kahdella kellotornilla, toinen matalan laatikon. Kolmannessa
  // mukana talon tunnusmerkki, koko pituudelta kaartuva lasikatto —
  // se antaa yläviistoon massan, jota laatikosta puuttui.
  ['pariisi-orsayn-taidemuseo', 'a former grand railway station turned '
    + 'art museum on a river quay: one very long pale limestone '
    + 'facade with a row of tall arched windows and two huge round '
    + 'clock faces set flat into the wall, topped along its WHOLE '
    + 'length by an enormous curved glass barrel-vault roof of '
    + 'arched iron ribs that rises high above the stone walls; a '
    + 'stone balustrade with small statues runs along the eaves. NO '
    + 'towers, NO domes, NO spires'],
  ['pariisi-palais-garnier', 'an opulent 19th-century opera house: a '
    + 'wide ornate facade with paired columns and arches, gilded '
    + 'statues along the roofline and a low green copper dome behind '
    + 'a sculpted pediment'],
  ['pariisi-place-des-vosges', 'a symmetrical square framed by '
    + 'identical three-storey houses of red brick with pale stone '
    + 'trim, steep blue-grey roofs and an arcaded ground floor, with '
    + 'a small formal park of clipped trees in the middle'],
  // ── Kööpenhamina, kohteet 7–9 (paketti K1, 16.8.2026) ────────────
  ['kobenhavn-vapahtajan-kirkko', 'a tall dark-brick baroque church '
    + 'whose slender spire is wrapped by an EXTERNAL gilded spiral '
    + 'staircase winding four turns anticlockwise up to a golden '
    + 'globe at the very top'],
  ['kobenhavn-rosenborgin-linna', 'a Dutch renaissance castle of '
    + 'red brick with sandstone trim: three slender copper-green '
    + 'spired towers of different heights, ornate gables, a small '
    + 'moat and clipped garden hedges in front'],
  ['kobenhavn-kastellet', 'a star-shaped 17th-century fortress from '
    + 'a slight aerial three-quarter view: grassy zigzag ramparts '
    + 'ringed by a moat, neat parallel rows of long red-roofed '
    + 'barracks inside, and a small dark windmill standing on one '
    + 'bastion'],

  /*
   * ── Tampere, kuusi kohdetta (17.8.2026) ──────────────────────────
   * Vain jonossa: näitä EI ole vielä generoitu, joten
   * js/packs/miniatyyrit.js:ssä ei ole tamperetta eikä sw.js:n
   * SHELLissä .webp-polkuja. Ajo tehdään Actionsissa, ja vasta sen
   * jälkeen kuvat kytketään peliin (yksi otto per kohde,
   * kustannussääntö yllä). Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä, kuten koodi tekee piirroksettomalle kohteelle.
   */
  ['tampere-nasinneula', 'a very tall slender concrete observation '
    + 'tower rising from a small wooded headland by a lake: a plain '
    + 'narrow shaft that widens near the top into a round two-level '
    + 'pod ringed with windows, and one thin needle-like antenna '
    + 'spire above it. NO other buildings'],
  ['tampere-finlaysonin-tehdasalue', 'a long red-brick cotton mill '
    + 'standing right at the edge of a rushing river: many rows of '
    + 'identical tall arched windows, a stepped brick gable at the '
    + 'near end and one very tall round brick chimney rising behind '
    + 'the roof'],
  ['tampere-museokeskus-vapriikki', 'a low red-brick 19th-century '
    + 'factory workshop turned museum on a river bank: a long brick '
    + 'facade of large multi-paned industrial windows with a modern '
    + 'glass entrance canopy in the middle'],
  ['tampere-hameensilta', 'a single wide stone arch road bridge over '
    + 'a foaming rapid, with four bronze statues on low pedestals '
    + 'standing along its granite parapet, two on each side'],
  ['tampere-tampereen-tuomiokirkko', 'a grey granite national '
    + 'romantic church: a broad rough-hewn stone body with a very '
    + 'steep tiled roof and one thick square tower topped by a low '
    + 'pyramid roof and small corner turrets'],
  ['tampere-pyynikin-nakotorni', 'a short square observation tower '
    + 'built of red granite blocks, standing among tall pines on a '
    + 'gravel ridge: a railed open viewing platform at the top and a '
    + 'small café building at its foot'],
  /*
   * ── Firenze, kuusi kohdetta (17.8.2026) ─────────────────────────
   * EI VIELÄ GENEROITU: piirrokset vaativat API-avaimen, jota
   * työsessiossa ei ole. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä, kuten koodi tekee kohteelle ilman piirrosta.
   * Kun avain on käytettävissä:
   *   node tools/generoi-miniatyyrit.mjs firenze-duomo …
   * Yksi otto per kohde (kustannussääntö, docs/tyolista-opukselle.md).
   */
  ['firenze-duomo', 'a renaissance cathedral dominated by an enormous '
    + 'octagonal terracotta-red brick dome with eight white marble '
    + 'ribs and a small white lantern on top, beside a tall slender '
    + 'square bell tower; walls striped in white, green and pink '
    + 'marble'],
  ['firenze-palazzo-vecchio', 'a fortress-like medieval town hall: a '
    + 'blocky rusticated stone cube with a row of small arched '
    + 'windows, a projecting crenellated battlement gallery near the '
    + 'top, and one very tall off-centre stone tower with a clock '
    + 'face and a crenellated crown'],
  ['firenze-uffizi', 'two long identical narrow renaissance office '
    + 'wings facing each other across a very narrow courtyard, each '
    + 'with an arcaded ground floor and rows of tall windows, joined '
    + 'at the far end by an arch — a corridor of stone seen in '
    + 'perspective'],
  ['firenze-ponte-vecchio', 'a low medieval stone arch bridge '
    + 'completely built over with small shuttered shops of mismatched '
    + 'heights, extra rooms propped over the water on wooden struts, '
    + 'and a continuous row of small windows running above them along '
    + 'the whole bridge'],
  ['firenze-santa-croce', 'a wide gothic basilica facade of white, '
    + 'green and pink marble panels: three gables, three pointed '
    + 'portals, a large round rose window in the centre and a '
    + 'six-pointed star at the very top, with a slender brick bell '
    + 'tower rising behind on the right'],
  ['firenze-bobolin-puutarha', 'a formal italian renaissance garden '
    + 'on a slope: a long avenue of clipped hedges and cypresses '
    + 'leading to an oval pond with a stone fountain on an islet, '
    + 'marble statues along the path and lemon trees in terracotta '
    + 'pots'],

  /*
   * ── Bagdad, kuusi kohdetta (E00-viimeistely 17.8.2026) ───────────
   * VAIN JONOSSA, ei generoitu: piirrokset vaativat API-avaimen,
   * jota työsessiossa ei ole. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä. Kuvaukset on kirjoitettu kohteiden omien
   * nähtävyysjuttujen ja niiden todennettujen valokuvien mukaan
   * (js/packs/nahtavyysjutut.js: bagdad) — arkkitehtuurin
   * tosiasioita, ei mielikuvia. Yksi otto per kohde.
   */
  ['bagdad-mutanabbin-katu', 'a narrow car-free old book-market '
    + 'street: two-storey brick houses on both sides with projecting '
    + 'wooden balconies and wrought-iron railings, open shopfronts at '
    + 'street level and rows of books laid out flat on the paving '
    + 'stones in front of them'],
  ['bagdad-qushlan-kellotorni', 'a slender square Ottoman clock '
    + 'tower of pale brick standing alone on a lawn: a plain tapering '
    + 'shaft with one round clock face high up, a small arcaded '
    + 'belfry stage above it and a pointed cap with a weather vane', 'halpa'],
  ['bagdad-abbasidipalatsi', 'a medieval Mesopotamian brick palace '
    + 'courtyard: two storeys of pointed arcades running all the way '
    + 'round a square court, the arch hoods filled with deep '
    + 'honeycomb muqarnas brickwork, and a low octagonal basin in the '
    + 'middle of the yard'],
  ['bagdad-khan-mirjan', 'a medieval brick caravanserai hall: a long '
    + 'covered gallery spanned by a row of very tall pointed '
    + 'transverse arches, two storeys of small merchant rooms behind '
    + 'them, and a deep pointed-arch portal of carved brick at the '
    + 'near end'],
  ['bagdad-mustansiriya-koulu', 'a 13th-century brick madrasa seen '
    + 'from the street: a long low facade with three pointed arched '
    + 'openings, bands of patterned decorative brickwork above them '
    + 'and a tall recessed pointed entrance portal at one end'],
  ['bagdad-bagdadin-museo', 'a small museum in a traditional Baghdad '
    + 'townhouse: a plain brick front with one large projecting '
    + 'wooden oriel balcony (shanasheel) of fine lattice screens '
    + 'jutting out over the street on carved brackets', 'halpa'],

  /*
   * ── Teheran, kuusi kohdetta (E00-viimeistely 17.8.2026) ──────────
   * Sama tilanne kuin Bagdadissa: vain jonossa, ei generoitu.
   * Kuvaukset nojaavat nähtävyysjuttujen valokuviin
   * (js/packs/nahtavyysjutut.js: teheran).
   */
  ['teheran-teheranin-basaari', 'a long covered Persian bazaar '
    + 'corridor seen down its length: a brick barrel-vaulted tunnel '
    + 'with small round skylight openings punched through the '
    + 'ceiling, arched shopfronts on both sides and carpets hanging '
    + 'from the walls'],
  ['teheran-golestanin-palatsi', 'a Qajar palace pavilion: a wide '
    + 'open reception veranda carried on slender twisted columns, a '
    + 'raised marble throne terrace in front of it, and every surface '
    + 'above covered in small tiled and mirrored panels'],
  ['teheran-dar-al-fonun', 'a 19th-century Persian college building '
    + 'round a courtyard: a symmetrical two-storey brick range with '
    + 'rows of tall arched windows on both floors and one taller '
    + 'arched gateway in the middle'],
  ['teheran-iranin-kansallismuseo', 'a plain red-brick museum '
    + 'building whose entrance is one enormous pointed barrel-vault '
    + 'archway modelled on an ancient Sasanian palace arch, filling '
    + 'almost the whole front wall', 'halpa'],
  ['teheran-masoudiehin-talo', 'a Qajar mansion: a two-storey facade '
    + 'of tall arched windows filled with small coloured glass panes, '
    + 'four fluted columns carrying a shallow porch, patterned '
    + 'brick and tile panels, and a long rectangular garden pool in '
    + 'front'],
  ['teheran-sepahsalarin-moskeija', 'a large Persian mosque: a tall '
    + 'tiled entrance iwan with a pointed arch, a low tiled dome '
    + 'behind it, several slender round minarets around the court '
    + 'and one square clock stage above the portal'],

  /*
   * ── Tripoli, kuusi kohdetta (E00-viimeistely 17.8.2026) ──────────
   * Vain jonossa, ei generoitu. Kuvaukset nojaavat kohteiden omiin
   * nähtävyysjuttuihin ja niiden todennettuihin valokuviin
   * (js/packs/nahtavyysjutut.js: tripoli).
   */
  ['tripoli-marcus-aureliuksen-riemukaari', 'a small Roman triumphal '
    + 'arch of white marble standing alone in a shallow excavated '
    + 'hollow below street level: open on all four sides, a low '
    + 'octagonal dome on top, and carved figures in the triangular '
    + 'pediments over each arch'],
  ['tripoli-darghutin-moskeija', 'a low whitewashed North African '
    + 'mosque: a long flat-roofed block carrying a whole field of '
    + 'small round white domes, with one slender white minaret beside '
    + 'it that has a railed balcony and an ochre-coloured pointed cap'],
  ['tripoli-vanhankaupungin-kellotorni', 'a slender square Ottoman '
    + 'clock tower of whitewashed stone rising from a small square: '
    + 'it narrows in stages, each stage has pairs of small columns at '
    + 'the corners, and the top stage carries a round clock face on '
    + 'every side under an ornate cornice', 'halpa'],
  ['tripoli-punainen-linna', 'a long low reddish-ochre fortress on a '
    + 'rocky spur by the water: massive sloping walls with a few '
    + 'small openings, and on the seaward bastion a row of tall open '
    + 'stone arches standing above the ramparts'],
  ['tripoli-karamanlin-moskeija', 'an Ottoman mosque built into a '
    + 'market street: a white arcade of pointed arches with '
    + 'brown-and-white striped voussoirs at street level, a roofline '
    + 'of many small white domes above it, and one slender minaret '
    + 'with a balcony and a green conical cap'],
  ['tripoli-an-naqan-moskeija', 'the courtyard arcade of a very old '
    + 'North African mosque: whitewashed pointed arches resting on '
    + 'stout re-used ancient stone columns whose capitals are '
    + 'visibly older and rougher than the rest, with plain green '
    + 'doors behind them'],

  /*
   * ── Tokio, kuusi kohdetta (E00-viimeistely 17.8.2026) ───────────
   * VAIN JONOSSA, ei generoitu: js/packs/miniatyyrit.js:ssä ei ole
   * tokiota eikä sw.js:n SHELLissä .webp-polkuja. Kartalla kohteet
   * näkyvät siihen asti numeroympyröinä, kuten koodi tekee
   * piirroksettomalle kohteelle. Yksi otto per kohde
   * (kustannussääntö, docs/tyolista-opukselle.md).
   *
   * Kaksi kohdetta on tarkoituksella kuvattu ILMAN ihmisiä ja ilman
   * kojuja (Kaminarimon, Sensō-ji): Asakusan valokuvissa on aina
   * väkijoukko, ja miniatyyrin pitää lukea 84 pikselissä.
   */
  ['tokio-kaminarimon', 'a japanese temple gate with a steep grey '
    + 'tiled roof carried on thick vermilion pillars, and hanging in '
    + 'the middle of the opening one ENORMOUS red paper lantern, '
    + 'wider than a man and nearly reaching the ground, with bold '
    + 'dark characters down its front and a small metal plate at its '
    + 'base. A guardian statue standing in a niche on each side. NO '
    + 'people, NO market stalls'],
  ['tokio-senso-ji', 'a large japanese buddhist temple hall raised on '
    + 'a stone platform: a broad two-tiered roof with heavy curving '
    + 'ridges and upturned corners, a row of vermilion pillars along '
    + 'the front and a wide flight of steps up to it, with a slender '
    + 'five-storey pagoda standing separately to one side. NO people'],
  ['tokio-kanei-ji', 'a small quiet japanese temple among tall trees: '
    + 'one modest wooden hall with a dark tiled hip roof and plain '
    + 'timber posts, a stone lantern and a low stone-flagged path '
    + 'leading to it. Deliberately humble, no vermilion, no crowd'],
  ['tokio-tokion-kansallismuseo', 'a large symmetrical 1930s museum '
    + 'building: a heavy pale stone facade of rectangular windows '
    + 'with a central entrance, crowned by a wide JAPANESE tiled hip '
    + 'roof with upturned eaves — an oriental roof on a western '
    + 'building — seen across an empty forecourt with a fountain '
    + 'basin in front'],
  ['tokio-uenon-puisto', 'a broad park avenue of cherry trees in full '
    + 'blossom arching over a wide gravel path, and beyond them an '
    + 'open pond edged with tall reeds and a small many-sided temple '
    + 'pavilion on a spit of land in the water'],
  ['tokio-shitamachi-museo', 'a plain two-storey museum block with '
    + 'large ground-floor windows, and shown inside them a '
    + 'reconstructed old Tokyo alley: a narrow wooden shopfront with '
    + 'a cloth shop-curtain over the door, a sliding paper screen '
    + 'above it, wooden tubs and a hand water pump at the kerb'],
];

const uusiksi = process.argv.includes('--uusiksi');
const pyydetyt = process.argv.slice(2).filter((a) => a !== '--uusiksi');
const { existsSync } = await import('node:fs');
let jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k));
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
}
// Kustannussääntö 1: valmis tiedosto ohitetaan. Repossa asuu vain
// leikattu .webp (jpg-välivaihe ei ole versionhallinnassa), joten
// KUMPI TAHANSA riittää ohitukseen — muuten tuore klooni (esim.
// GitHub-ajuri) generoisi koko listan uudestaan. Uusinta vaatii
// sekä täsmäavaimen että --uusiksi-lipun.
const valmis = (k) => existsSync(resolve(JUURI, `assets/kartat/miniatyyrit/${k}.jpg`))
  || existsSync(resolve(JUURI, `assets/kartat/miniatyyrit/${k}.webp`));
const ohitetut = jono.filter(([k]) => valmis(k) && !(uusiksi && pyydetyt.includes(k)));
jono = jono.filter(([k]) => !ohitetut.some(([o]) => o === k));
if (ohitetut.length) {
  console.log(`Ohitetaan ${ohitetut.length} valmista kuvaa (uusinta: nimeä avain + --uusiksi).`);
}
if (!jono.length) {
  console.log('Kaikki pyydetyt on jo generoitu — ei yhtään API-kutsua.');
  process.exit(0);
}

mkdirSync(resolve(JUURI, 'assets/kartat/miniatyyrit'), { recursive: true });

/* Pienennys 1024 → 512 ja JPEG-pakkaus Chromiumin kanvaasilla — sama
 * kuin tools/generoi-varustekuvat.mjs. */
async function avaaPienentaja() {
  const { chromium } = await import('playwright');
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await selain.newPage();
  return {
    async pienenna(png) {
      const jpg = await sivu.evaluate(async ({ data, leveys, laatu }) => {
        const kuva = new Image();
        kuva.src = `data:image/png;base64,${data}`;
        await kuva.decode();
        const kanvaasi = document.createElement('canvas');
        kanvaasi.width = leveys;
        kanvaasi.height = leveys;
        const piirto = kanvaasi.getContext('2d');
        piirto.imageSmoothingQuality = 'high';
        piirto.drawImage(kuva, 0, 0, leveys, leveys);
        return kanvaasi.toDataURL('image/jpeg', laatu).split(',')[1];
      }, { data: png.toString('base64'), leveys: LEVEYS, laatu: LAATU });
      return Buffer.from(jpg, 'base64');
    },
    sulje: () => selain.close(),
  };
}

async function generoi(tunnus, aihe, pienentaja, merkinta) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${valitseMalli(merkinta)}:generateContent?key=${avain}`;
  const vastaus = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: TYYLI(aihe) }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '1:1' },
      },
    }),
    signal: AbortSignal.timeout(120000),
  });
  if (!vastaus.ok) {
    const virhe = (await vastaus.text()).slice(0, 300).replace(new RegExp(avain, 'g'), '***');
    console.error(`${tunnus}: HTTP ${vastaus.status}: ${virhe}`);
    return false;
  }
  const data = await vastaus.json();
  const osat = data.candidates?.[0]?.content?.parts ?? [];
  const b64 = osat.find((p) => p.inlineData)?.inlineData?.data;
  if (!b64) {
    console.error(`${tunnus}: vastauksessa ei kuvaa (${JSON.stringify(data).slice(0, 160).replace(new RegExp(avain, 'g'), '***')})`);
    return false;
  }
  const jpg = await pienentaja.pienenna(Buffer.from(b64, 'base64'));
  const polku = resolve(JUURI, `assets/kartat/miniatyyrit/${tunnus}.jpg`);
  writeFileSync(polku, jpg);
  console.log(`${tunnus}: ${(jpg.length / 1024).toFixed(0)} kt → ${polku}`);
  return true;
}

const pienentaja = await avaaPienentaja();
let onnistui = 0;
for (const [tunnus, aihe, merkinta] of jono) {
  if (await generoi(tunnus, aihe, pienentaja, merkinta)) onnistui++;
  await new Promise((r) => setTimeout(r, 2000));
}
await pienentaja.sulje();
// Kustannussääntö 3: näkyvä hinta-arvio joka ajosta
// (~0,04 €/pro-kuva, ~0,02 €/halpa).
const halpoja = jono.filter(([, , m]) => m === 'halpa').length;
const arvio = halpoja * 0.02 + (jono.length - halpoja) * 0.04;
console.log(`Valmis: ${onnistui}/${jono.length}. Generointeja ${jono.length} (${halpoja} halvalla) ≈ ${arvio.toFixed(2)} €.`);
