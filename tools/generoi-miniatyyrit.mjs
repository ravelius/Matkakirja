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
 *          --akvarelli vaihtaa tyylin akvarelliksi (omistajan hyväksymä
 *          Helsingin pilotti v1025/v1026); vanhan kuvan uusinta samalla
 *          avaimella vaatii lisäksi --uusiksi.
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
const TYYLI_SEEPIA = (aihe) => 'A tiny landmark sketch for a vintage '
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
 * AKVARELLITYYLI (--akvarelli). Omistaja hyväksyi Helsingin
 * akvarellipilotin (v1025 + leikkauskorjaus v1026, js/tyohuone-tilanne.js:
 * "seepiaviiva + kevyet laveeraukset, sama kermapaperi") ja tilasi
 * kaikkien nähtävyysminiatyyrien uusinnan samalla reseptillä.
 *
 * REKONSTRUKTIO 22.8.2026: pilotin muokattu tyyliprompti EI PÄÄTYNYT
 * REPOON — v1025/v1026 committoivat vain valmiit .webp-kuvat. Tämä
 * kääre on kirjoitettu takaisin hyväksyttyjä Helsingin kuvia
 * (assets/kartat/miniatyyrit/helsinki-*.webp) katsomalla: ohut
 * seepiamusteviiva pohjalla, sen päällä muutama läpikuultava
 * laveeraus rakennuksen omissa haaleissa väreissä (patinoitunut
 * kuparinvihreä, lämmin kivenkerma, murrettu tiilenpunainen), suuri
 * osa paperista jää maalaamatta, ja rakennuksen alla on pieni pehmeä
 * varjolaveeraus. Jos alkuperäinen sanamuoto joskus löytyy, se voittaa
 * tämän rekonstruktion.
 *
 * Sommittelu-, karikatyyri- ja kanvaasirunko on sama kuin seepiassa,
 * ja kaikki kolme vartiota säilyvät (tausta koko kanvaasi reunasta
 * reunaan, ei tekstiä, ei karttaa tai katuja, ei paperiarkkia
 * varjoineen, ei valkoista hehkua rakennuksen ympärillä) — vain
 * varjovartio on muotoiltu niin, ettei sallittu akvarellivarjo
 * rakennuksen ALLA kumoa kieltoa hehkusta sen YMPÄRILLÄ.
 *
 * Viimeinen lause kumoaa aiheen omat yksivärisyysvaatimukset: osassa
 * kohdekuvauksia (esim. tripoli-punainen-linna, tokio-shitamachi-museo)
 * lukee "one-colour dark sepia ink", koska seepiatyylissä malli lipsui
 * väreihin. Akvarelliajossa niitä ei saa noudattaa.
 */
const TYYLI_AKVARELLI = (aihe) => 'A tiny landmark illustration for a '
  + `vintage hand-drawn city map: ${aihe}. `
  + 'Drawn FIRST as a fine dark sepia-brown ink line sketch, and then '
  + 'tinted on top with LIGHT TRANSPARENT WATERCOLOR WASHES: soft, '
  + 'natural, muted colors — the building in its own real material '
  + 'colors but pale and watered down (weathered copper green, warm '
  + 'pale stone, muted brick red, soft slate grey, dusty foliage '
  + 'green) — laid on as a few loose washes that let the ink lines and '
  + 'the paper show through everywhere. Watercolor only: never '
  + 'saturated, never poster colors, no gouache, no flat digital fill, '
  + 'no colored outlines, no black shading. Paint sparingly — LARGE '
  + 'AREAS OF THE PAPER ARE LEFT COMPLETELY UNPAINTED, and here and '
  + 'there a wash stops short of the ink outline. The ink drawing '
  + 'carries the picture; the color is only a hint. Slightly '
  + 'caricatured and playful: its most recognizable features gently '
  + 'exaggerated, proportions charmingly squashed, like a quick '
  + 'confident sketch by a travel illustrator. As simple as possible: '
  + 'just a few clean confident ink lines, minimal detail. A small '
  + 'charming three-quarter aerial view. The building stands alone on '
  + 'a plain warm cream paper background (like aged map paper, '
  + '#f2ecd8) that fills the ENTIRE square canvas edge to edge; under '
  + 'the building at most a small soft pale watercolor shadow wash '
  + 'right at its foot. No surrounding streets or map, no text, no '
  + 'letters, no signs, no frame, no border, no people in front. '
  + 'Square 1:1. '
  // Sama paperivartio kuin seepiassa: tausta on koko kanvaasi, EI
  // pöydällä makaava paperiarkki varjoineen.
  + 'The cream paper fills the whole canvas edge to edge: do NOT paint '
  + 'a sheet of paper lying on a surface, no paper edges, no drop '
  + 'shadow around the background, no rectangular panel. '
  // Taustanpoisto (tools/leikkaa-miniatyyrit.mjs) vaatii TASAISEN
  // taustan: vaalea hehku rakennuksen ympärillä estäisi tulvatäytön.
  // Varjolaveeraus rakennuksen ALLA on sallittu ja säilyy leikkauksessa,
  // koska se on taustaa selvästi tummempi (mitattu v1025-kuvista).
  + 'Apart from that small shadow wash at the foot of the building, do '
  + 'NOT paint any white halo, glow, vignette or colored wash around '
  + 'the building and do NOT lighten the paper near it: the flat cream '
  + 'background color continues completely unchanged right up to the '
  + 'building outline on every side, and no sky is painted. '
  + 'If the subject description above asks for a one-color, monochrome '
  + 'or colorless ink drawing, IGNORE that wording: this is the '
  + 'watercolor version of the very same sketch.';

/*
 * Tyylivalinta: seepia on oletus, --akvarelli vaihtaa akvarelliin.
 * Lippu luetaan tässä, koska TYYLI on vakio; argumenttien siivous
 * (lippu ei ole kohdeavain) tehdään jonon rakennuksen yhteydessä.
 */
const AKVARELLI = process.argv.includes('--akvarelli');
const TYYLI = AKVARELLI ? TYYLI_AKVARELLI : TYYLI_SEEPIA;

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
   * ── Tampere, kahdeksan kohdetta (17.8.2026, +2 18.8.2026) ────────
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
  /*
   * UUSINTA (katselmointi 17.8.2026): ensimmäinen otto ei muistuttanut
   * kohdetta lainkaan — "matala pyramidikatto ja kulmatornit" antoi
   * yleisen linnamaisen kirkon. Tunnusmerkit kirjoitetaan nyt auki:
   * JYRKKÄ SATULAKATTO, YKSI korkea nelikulmainen torni SUIPPO huippu
   * ja PYÖREÄ RUUSUIKKUNA päädyssä — kolme asiaa, joista kirkon
   * tunnistaa, eikä mitään muuta.
   */
  ['tampere-tampereen-tuomiokirkko', 'a Finnish national romantic '
    + 'church built of rough grey granite blocks: a broad tall stone '
    + 'nave under a VERY STEEP pitched saddle roof (two straight slopes '
    + 'meeting in a sharp ridge, no pyramid, no hipped roof), a large '
    + 'ROUND rose window high in the near gable end, and exactly ONE '
    + 'tall square stone bell tower at the corner, its four straight '
    + 'walls carrying a STEEP POINTED spire. Only one tower — no '
    + 'second tower, no corner turrets, no dome'],
  ['tampere-pyynikin-nakotorni', 'a short square observation tower '
    + 'built of red granite blocks, standing among tall pines on a '
    + 'gravel ridge: a railed open viewing platform at the top and a '
    + 'small café building at its foot'],
  /*
   * Kaksi kohdetta lisää 18.8.2026 (kaupungin mittaiseksi, 6 → 8).
   * Kumpikin on PUUTALO ja tehtaiden vastapari, joten kuvauksissa
   * korostetaan sitä, mikä ne erottaa Tampereen muusta tiilestä:
   * hirsi- ja lautaseinä, koristeltu räystäs, matala rivi.
   */
  ['tampere-tallipiha', 'a low 19th-century wooden stable building '
    + 'of ochre-brown stained logs on a red-brick base: a steep '
    + 'metal-sheet roof with two chimneys, a wide double door for '
    + 'carriages, and a small ornate gable balcony with sawn '
    + 'decorative brackets and fretwork at the near end'],
  ['tampere-amurin-tyolaismuseokortteli', 'a row of single-storey '
    + 'pale grey wooden workers\' houses along a cobbled street: '
    + 'horizontal board cladding, white window frames with '
    + 'six-paned windows, a black sheet-metal roof and two red-brick '
    + 'chimneys. NO tall buildings'],
  /*
   * ── Firenze, yhdeksän kohdetta (17.8.2026, +3 18.8.2026) ────────
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
   * Kolme kohdetta lisää 18.8.2026 (6 → 9). Firenzen muut kohteet on
   * kuvattu ULKOA, joten Accademia kuvataan siitä, mikä siitä näkyy
   * kadulle asti: kupolisali ja sen alla seisova patsas. Bargellosta
   * piirretään sisäpiha eikä julkisivu — juuri piha on se, mistä
   * talon tunnistaa, ja julkisivu on pelkkä kivimuuri kadun varressa.
   */
  ['firenze-galleria-dellaccademia', 'the interior of a museum '
    + 'rotunda: one white marble statue of a standing nude young man '
    + 'on a low pedestal in a semicircular apse, directly beneath a '
    + 'round glazed dome that lets daylight fall straight down on '
    + 'him. Only ONE statue, nothing else in the room'],
  ['firenze-santa-maria-novella', 'a renaissance church facade of '
    + 'white and dark green marble laid in squares and stripes: '
    + 'three round-arched portals below, a large ROUND window in the '
    + 'centre, a triangular pediment at the top and two big S-shaped '
    + 'scrolls curling outward on either side of it. No bell tower '
    + 'in front'],
  ['firenze-bargello', 'the inner courtyard of a medieval italian '
    + 'stone palace: rough sandstone walls covered with rows of '
    + 'carved stone coats of arms, a ground-floor arcade of pointed '
    + 'arches on one side, an open loggia above it, and a long '
    + 'external stone staircase running up the opposite wall to the '
    + 'first floor'],

  /*
   * ── Bagdad, kahdeksan kohdetta (E00 17.8., +2 18.8.2026) ─────────
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
   * Kaksi uutta bagdadilaista (kohdemäärien nosto 18.8.2026).
   * Kummankin aiheessa sanotaan minareetin muoto suoraan, koska
   * ottomaanibagdadin minareetti ei ole sylinteri vaan kapeneva
   * tiilivarsi, jonka parvekkeen alla on kennosto ja jonka huippu
   * on uurrettu kupu.
   */
  ['bagdad-haydarkhanan-moskeija', 'a large Ottoman-era Baghdad '
    + 'mosque of pale yellow brick: one tapering round brick minaret '
    + 'patterned all over with turquoise glazed diamonds, a deep '
    + 'honeycomb muqarnas corbel under its railed balcony and a '
    + 'ribbed melon-shaped cap on top; beside it a low blue tiled '
    + 'dome and a wall of pointed arched recesses filled with '
    + 'blue-and-white star tilework'],
  ['bagdad-al-wazirin-moskeija', 'a 16th-century Ottoman mosque by a '
    + 'river: a tall slender brick minaret covered in turquoise '
    + 'zigzag glazed patterning with a bulbous tiled crown, a low '
    + 'shallow dome of the same green-blue glaze beside it, and a '
    + 'plain brick courtyard wall below set with a few blue tiled '
    + 'panels'],

  /*
   * ── Teheran, kahdeksan kohdetta (E00 17.8., +2 18.8.2026) ────────
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
   * Kaksi uutta teheranilaista (kohdemäärien nosto 18.8.2026).
   * Toopkhaneh on aukio eikä rakennus, joten aiheeksi on otettu se,
   * mikä aukiosta on kuvissa: pitkä kaarikäytävärakennus ja tykit.
   * Aihe EI nimeä aukiota, koska kohteen nimi vetää tekstiä kuvaan
   * (sama ansa kuin East Side Galleryssä).
   */
  ['teheran-toopkhanen-aukio', 'a long low 19th-century Persian '
    + 'artillery barracks range closing one side of a wide open '
    + 'square: two storeys of small identical arched openings running '
    + 'the whole length, a taller arched gateway block in the middle, '
    + 'two old bronze field cannons standing on the bare ground in '
    + 'front, and a line of snow-capped mountains far behind. No '
    + 'text, no letters, no signs anywhere'],
  ['teheran-bagh-e-mellin-portti', 'a free-standing Persian city '
    + 'gate of pale yellow brick: one tall pointed archway with '
    + 'ornate wooden doors set deep in it, a pair of stout round '
    + 'brick columns on each side, and painted tile panels above the '
    + 'arch showing a lion with a sun rising behind it. Two small '
    + 'square turrets on the roofline'],

  /*
   * ── Tripoli, seitsemän kohdetta (E00 17.8., +1 18.8.2026) ────────
   * Vain jonossa, ei generoitu. Kuvaukset nojaavat kohteiden omiin
   * nähtävyysjuttuihin ja niiden todennettuihin valokuviin
   * (js/packs/nahtavyysjutut.js: tripoli).
   */
  /*
   * UUSINTA (katselmointi 17.8.2026): ensimmäisessä otossa kuvan
   * ympärille piirtyi paperikehys (kaivanto luki arkin reunana) ja
   * muoto meni väärin — tuli korkea yksiaukkoinen kaari. Kaivanto
   * pudotettiin aiheesta kokonaan, ja tetrapylon-muoto sekä matala
   * leveä mittasuhde sanotaan suoraan. Kehyskielto toistetaan aiheen
   * sisällä samasta syystä kuin Tower Bridgessä.
   */
  ['tripoli-marcus-aureliuksen-riemukaari', 'a Roman TETRAPYLON '
    + 'triumphal arch of white marble: a single square block pierced by '
    + 'FOUR identical open archways, one on each of its four sides, so '
    + 'you can see straight through it both ways. It is LOW AND WIDE — '
    + 'clearly broader than it is tall, squat rather than soaring — and '
    + 'a shallow DOME-LIKE pyramid cap sits on top, with a carved '
    + 'triangular pediment over each archway. It stands directly on '
    + 'flat ground at ground level. The warm cream paper background '
    + 'fills the WHOLE square canvas edge to edge: absolutely NO frame, '
    + 'no border, no rectangular panel, no sunken pit or excavated '
    + 'hollow around it, no paper sheet edges'],
  ['tripoli-darghutin-moskeija', 'a low whitewashed North African '
    + 'mosque: a long flat-roofed block carrying a whole field of '
    + 'small round white domes, with one slender white minaret beside '
    + 'it that has a railed balcony and an ochre-coloured pointed cap'],
  ['tripoli-vanhankaupungin-kellotorni', 'a slender square Ottoman '
    + 'clock tower of whitewashed stone rising from a small square: '
    + 'it narrows in stages, each stage has pairs of small columns at '
    + 'the corners, and the top stage carries a round clock face on '
    + 'every side under an ornate cornice', 'halpa'],
  /*
   * UUSINTA (katselmointi 17.8.2026): ensimmäinen otto oli värillinen
   * tyylirikko — värisana "reddish-ochre" aiheessa veti mallin
   * maalaamaan koko linnan värillä, vaikka tyylikääre pyytää yhtä
   * mustetta. Väri on nyt pelkkä nimi ("Red Castle"), ei ohje, ja
   * yksivärisyys toistetaan aiheen sisällä.
   */
  ['tripoli-punainen-linna', 'a big old seafront wall fortress '
    + '(the Red Castle, Assai al-Hamra): a long low citadel rising '
    + 'straight out of the harbour wall, massive sloping ramparts with '
    + 'only a few small openings, a squat round corner bastion, and '
    + 'above the ramparts a row of tall open stone arches; calm water '
    + 'suggested with a few horizontal strokes along its foot. Drawn '
    + 'STRICTLY as a one-colour dark sepia ink line drawing — no red, '
    + 'no ochre, no colour of any kind anywhere, no painted or filled '
    + 'walls, only ink outlines and sparse hatching on cream paper'],
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
   * Seitsemäs tripolilainen (kohdemäärien nosto 18.8.2026). Aihe on
   * koko rakennus eikä oven yksityiskohta, koska miniatyyri luetaan
   * 84 pikselissä: ovi lukisi pelkkänä laatikkona. Kupolien määrä
   * (15) ja minareetin kahdeksankulmainen varsi sanotaan suoraan.
   */
  ['tripoli-gurgin-moskeija', 'a whitewashed North African mosque of '
    + 'the 1830s: a low square block whose flat roof carries a whole '
    + 'field of about fifteen small round white domes, one slender '
    + 'minaret rising beside it with TWO railed balconies one above '
    + 'the other and a pointed cap, and in the near wall one narrow '
    + 'arched doorway framed in pale marble with a band of patterned '
    + 'tiles around it. NO people'],

  /*
   * ── Tokio, kymmenen kohdetta (E00 17.8., +4 18.8.2026) ──────────
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
  /*
   * UUSINTA (katselmointi 17.8.2026): ensimmäinen otto tuli
   * isometrisenä leikkauskuvana valkoisella pohjalla — sisänäkymän
   * pyytäminen ("shown inside them a reconstructed alley") sai mallin
   * avaamaan seinän ja vaihtamaan sekä taustan että tyylin. Sisänäkymä
   * pudotettiin kokonaan: kuva on tavallinen ulkonäkymä talosta
   * samalla seepiaviivalla ja pergamenttitaustalla kuin muut.
   */
  ['tokio-shitamachi-museo', 'a modest two-storey museum building at '
    + 'the edge of a park: a compact rectangular house seen from '
    + 'OUTSIDE at a slight angle, plain walls, a row of large windows '
    + 'along the ground floor and smaller ones above, a simple entrance '
    + 'door in the middle, and a wide tiled hipped roof with slightly '
    + 'upturned eaves; a couple of trees behind one corner. An ordinary '
    + 'exterior view of the whole house standing closed and complete — '
    + 'NOT a cutaway, NOT a cross-section, NOT an isometric floor plan, '
    + 'no open walls and nothing visible inside. Same monochrome sepia '
    + 'ink line style as the other sketches, on the warm cream paper '
    + 'background filling the entire canvas — never a white background'],
  /*
   * Neljä uutta tokiolaista (kohdemäärien nosto 18.8.2026).
   * Hanayashiki on huvipuisto eikä rakennus, joten aiheessa
   * korostetaan sitä, mikä siitä lukee pienenä: yksi kierros
   * vuoristorataa ja talojen ahtaus ympärillä.
   */
  ['tokio-ueno-tosho-gu', 'an ornate shinto shrine gate of the Edo '
    + 'period standing between two low walls: a small square gatehouse '
    + 'with a steeply curving cusped gable over its opening, a copper '
    + 'tiled roof with upturned corners, and every surface of the '
    + 'woodwork below covered in dense carved ornament of dragons, '
    + 'birds and flowers. Tall dark conifers close behind. NO people'],
  ['tokio-uenon-asema', 'a big 1930s concrete railway station: a long '
    + 'low pale symmetrical facade with a row of tall narrow windows '
    + 'across the middle floor, one round clock high above them, and a '
    + 'flat cantilevered entrance canopy running along the ground '
    + 'floor. Seen straight on from across an empty forecourt. NO '
    + 'text, NO letters, no signs'],
  ['tokio-hanayashiki', 'a tiny old amusement park crammed into one '
    + 'small city block, seen from above at an angle: a single narrow '
    + 'roller coaster track looping right round the plot and passing '
    + 'over the roofs of the park buildings, a small carousel with a '
    + 'striped canopy and a little tower ride inside the loop, and '
    + 'ordinary houses pressed right up against the fence on every '
    + 'side'],
  ['tokio-kyu-iwasaki-tei', 'a large white wooden western-style '
    + 'mansion of the 1890s standing on a lawn: a two-storey '
    + 'colonnaded veranda along the whole front with slender columns '
    + 'and a balustrade on both levels, a polygonal glazed bay '
    + 'projecting at one corner, and a row of small pointed finials '
    + 'along the roofline. A low japanese tiled roof of a separate '
    + 'wing just visible at one end'],

  /*
   * ── Soul, yhdeksän kohdetta (E00 17.8., +3 18.8.2026) ───────────
   * VAIN JONOSSA, ei generoitu (ks. Tampere yllä).
   *
   * Korealaisen palatsiarkkitehtuurin kolme tunnusmerkkiä on
   * kirjoitettu jokaiseen kehotteeseen erikseen, koska ne erottavat
   * sen japanilaisesta: kaksoisräystäs, jonka kulmat kaartuvat
   * ylös, räystään alla vihreä-punainen ruutumainen koristemaalaus
   * (dancheong) ja pyöreät punaiset pylväät kivijalustan päällä.
   */
  ['soul-gyeongbokgung', 'a korean royal throne hall on a wide stone '
    + 'terrace with carved balustrades: a two-tiered grey tiled roof '
    + 'with strongly upturned corners, red round pillars beneath, and '
    + 'green-and-red painted latticework under the eaves. Two rows of '
    + 'small low stone posts stand on the empty paved courtyard in '
    + 'front. NO people'],
  ['soul-bukchonin-hanok-kyla', 'a narrow sloping lane of traditional '
    + 'korean houses seen from above: rows of grey curved tiled roofs '
    + 'stepping down the hill on both sides, white stone walls with a '
    + 'red angular geometric pattern along their top, and a wooden '
    + 'gate. Modern glass towers small and hazy in the far distance'],
  ['soul-changdeokgung', 'a square garden pond with a small round '
    + 'island in the middle bearing one leaning pine tree, and on the '
    + 'left bank a small korean pavilion standing partly over the '
    + 'water on stone pillars, its grey tiled roof with upturned '
    + 'corners and green-and-red painted eaves. Wooded slope behind'],
  ['soul-jongmyo', 'one extremely long low shrine hall seen at an '
    + 'oblique angle so it recedes far into the distance: an unbroken '
    + 'grey tiled roof carried by an endless row of plain dark red '
    + 'pillars with dark double doors between them, standing on a '
    + 'high stone platform above a rough flagged courtyard. Austere, '
    + 'no ornament, NO people'],
  ['soul-tapgol-puisto', 'a tall slender ten-storey stone pagoda of '
    + 'pale carved marble, its tiers stepping inwards like a stack of '
    + 'small roofs, standing alone in a city park with a hexagonal '
    + 'red-pillared pavilion beside it and pine trees around'],
  ['soul-bosingak', 'a korean bell pavilion: an open upper storey '
    + 'with a red railing raised on thick round red pillars, under a '
    + 'wide grey tiled roof with sharply upturned corners and '
    + 'green-and-red painted eaves, with a huge dark bronze bell '
    + 'hanging in the shadow beneath. A low stone balustrade rings the '
    + 'platform'],
  /*
   * Kolme uutta soulilaista (kohdemäärien nosto 18.8.2026).
   * Gwanghwamunissa on sanottava kolme kaarta erikseen, tai malli
   * piirtää yhden; Insadong on katu eikä rakennus, ja Jogyesan
   * tunnusmerkki on lyhtykatos eikä itse halli.
   */
  ['soul-gwanghwamun', 'a korean palace gate: a massive pale stone '
    + 'base pierced by THREE identical round-arched passages side by '
    + 'side, and standing on top of it a wooden gate tower with a '
    + 'double grey tiled roof whose corners curve sharply upwards and '
    + 'green-and-red painted latticework under the eaves. One carved '
    + 'stone guardian beast sits on the ground beside the base. NO '
    + 'people, NO text'],
  ['soul-insadong', 'a narrow pedestrian shopping street of low '
    + 'two-storey buildings with shop fronts open to the pavement, '
    + 'young leafy trees along both sides, and a line of round paper '
    + 'lanterns strung across the street overhead. A small awninged '
    + 'stall at one kerb. NO text, NO letters, no readable signs'],
  ['soul-jogyesa', 'a korean buddhist temple courtyard roofed over '
    + 'entirely by a dense canopy of thousands of small round paper '
    + 'lotus lanterns hung on wires from side to side; beneath them '
    + 'one big old twin-trunked tree, and behind it the temple hall '
    + 'with a grey tiled roof with upturned corners and green-and-red '
    + 'painted eaves and latticed doors'],

  /*
   * ── Shanghai, yhdeksän kohdetta (E00 17.8., +3 18.8.2026) ───────
   * VAIN JONOSSA, ei generoitu (ks. Tampere yllä).
   *
   * Shanghain kohteista neljä on länsimaista 1900-luvun alun
   * arkkitehtuuria ja kaksi kiinalaista. Kehotteissa on siksi
   * kirjoitettu auki se, mikä erottaa ne toisistaan: kivijulkisivu
   * ja kellotorni toisaalla, kaartuvat räystäänkulmat ja
   * kalkkikivilohkareet toisaalla — ilman sitä malli sekoittaa
   * tyylit keskenään.
   */
  ['shanghai-bund', 'a row of grand early-20th-century stone bank '
    + 'buildings standing shoulder to shoulder along a wide riverside '
    + 'embankment, seen from across the water: heavy grey classical '
    + 'facades with columns and cornices, one domed clock tower rising '
    + 'above the middle of the row. Flat empty water in front'],
  ['shanghai-waibaidun-silta', 'a riveted steel truss bridge whose top '
    + 'chord rises in two low humps like a camel\'s back, its lattice '
    + 'of diagonal girders drawn clearly, crossing a narrow creek on '
    + 'stone piers. Seen from the bank at a low angle. NO traffic'],
  ['shanghai-rauhanhotelli', 'a ten-storey art deco corner tower of '
    + 'pale granite: strong vertical window bands, stepped setbacks '
    + 'near the top, and crowning it a very steep copper pyramid roof '
    + 'weathered pale green. Arched shopfronts along the ground floor'],
  ['shanghai-yu-puutarha', 'a classical chinese garden pond: a '
    + 'two-storey dark red timber pavilion with sharply upcurving roof '
    + 'corners stands at the water\'s edge, a low covered walkway runs '
    + 'along the left bank, and a zigzag stone bridge crosses the '
    + 'water. White pitted limestone rocks piled at the shore'],
  ['shanghai-nanjing-katu', 'a broad pedestrian shopping street seen '
    + 'down its length: tall vertical shop signs in chinese characters '
    + 'stacked one above another on both sides, awnings and lanterns, '
    + 'a paved street with low stone bollards down the middle. Busy '
    + 'but drawn simply'],
  ['shanghai-shanghain-museo', 'a modern museum building shaped like '
    + 'an ancient chinese bronze cooking vessel: a low square base of '
    + 'pale stone carrying a wide flat round drum, and from the rim of '
    + 'the drum two curved arch-like handles rising into the air. Lawn '
    + 'in front, NO people'],
  /*
   * Kolme uutta shanghailaista (kohdemäärien nosto 18.8.2026), kaikki
   * muurin sisäisestä vanhastakaupungista. Fuyoun moskeija on
   * kiinalainen kaupunkitalo eikä kupolimoskeija, ja se sanotaan
   * aiheessa suoraan — muuten malli piirtää minareetin.
   */
  ['shanghai-kaupunginjumalan-temppeli', 'a chinese temple hall seen '
    + 'from the front: a grey tiled roof with dramatically upswept '
    + 'ridge ends, a row of dark red round pillars along the front, '
    + 'carved and gilded panels above the doorways, and a big bronze '
    + 'incense burner standing on the paved court in front of it. NO '
    + 'people'],
  ['shanghai-fuyoun-moskeija', 'a three-storey chinese townhouse that '
    + 'is a mosque: a plain pale rendered street facade with rows of '
    + 'ordinary rectangular windows, one arched doorway in the middle '
    + 'with a small carved plaque above it, and on the flat roof a '
    + 'little open pavilion with a chinese tiled roof for watching '
    + 'the moon. Absolutely NO minaret, NO dome'],
  ['shanghai-dajingin-pavilonki', 'the last surviving stretch of an '
    + 'old chinese city wall: a grey brick rampart with square '
    + 'crenellations and small rectangular loopholes running across '
    + 'the foreground, and rising directly behind it a two-storey '
    + 'wooden pavilion with red walls, latticed windows and two '
    + 'strongly upswept grey tiled roofs'],

  /*
   * ── Kairo, kymmenen kohdetta (lehden viimeistely 18.8.2026) ──────
   * VAIN JONOSSA, ei generoitu: piirrokset vaativat API-avaimen,
   * jota työsessiossa ei ole. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä. Kuvaukset on kirjoitettu nähtävyysjuttujen
   * todennettujen valokuvien mukaan (js/packs/nahtavyysjutut.js:
   * kairo) — arkkitehtuurin tosiasioita, ei mielikuvia. Yksi otto
   * per kohde.
   */
  ['kairo-kairon-torni', 'a very tall slender cylindrical concrete '
    + 'tower wrapped in an open lattice shell that flares out at the '
    + 'top into pointed petals like a lotus flower, a small round '
    + 'observation deck above the petals and a thin antenna at the '
    + 'summit', 'halpa'],
  ['kairo-egyptin-museo', 'a grand neoclassical museum facade of '
    + 'reddish stone: a tall rounded central arch entrance flanked by '
    + 'two columns and two arched niches, symmetrical wings with '
    + 'pilasters, and a small dome over the central bay'],
  ['kairo-tahririn-aukio', 'a wide city square with a round grassy '
    + 'traffic island at its center, a single ancient Egyptian '
    + 'obelisk standing on the island, lamp posts around the circle '
    + 'and a long curved early-20th-century building facade behind', 'halpa'],
  ['kairo-abdeenin-palatsi', 'a long low 19th-century royal palace '
    + 'facade in European neoclassical style: rows of tall windows in '
    + 'two storeys, a slightly projecting central bay with a '
    + 'triangular pediment and flagpole, and a tall wrought-iron '
    + 'gate with lantern posts in front'],
  ['kairo-ibn-tulunin-moskeija', 'a vast early Islamic mosque: a '
    + 'wide walled courtyard surrounded by arcades of pointed '
    + 'arches, a domed ablution pavilion in the middle, and behind '
    + 'the arcade a stone minaret with an external spiral staircase '
    + 'winding around its shaft'],
  ['kairo-sulttaani-hassanin-moskeija', 'a monumental Mamluk stone '
    + 'mosque: a massive cubic building with tall vertical strips of '
    + 'stacked windows, a deep carved cornice at the top edge, one '
    + 'large rounded dome at the near end and two tall minarets with '
    + 'pointed caps flanking it'],
  ['kairo-bab-zuweila', 'a medieval stone city gate: two massive '
    + 'semicircular towers with a tall pointed-arch passage between '
    + 'them, and rising from the top of each tower a slender '
    + 'octagonal minaret with two carved balconies and a bulb-shaped '
    + 'finial'],
  ['kairo-saladinin-linnoitus', 'a hilltop citadel: long crenellated '
    + 'stone walls with round towers climbing a rocky slope, and '
    + 'above them a great Ottoman-style mosque with a high central '
    + 'dome, cascading half-domes and two very slender '
    + 'pencil-pointed minarets'],
  ['kairo-khan-el-khalili', 'a narrow old bazaar lane: a pointed '
    + 'stone arch spanning the alley, shopfronts on both sides '
    + 'crowded with dozens of ornate metal lanterns hanging from '
    + 'hooks, and a strip of sky above between the buildings'],
  ['kairo-al-azhar-puisto', 'a terraced formal garden on a hill: a '
    + 'straight water channel with small fountains running down the '
    + 'middle of a palm-lined promenade, low flower beds and lawns '
    + 'stepping down on both sides, and a small domed pavilion at '
    + 'the far end', 'halpa'],

  /*
   * ── Istanbul, kymmenen kohdetta (lehden viimeistely 18.8.2026) ───
   * VAIN JONOSSA, ei generoitu: piirrokset vaativat API-avaimen, jota
   * työsessiossa ei ole. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä — Istanbulilla ei ole ollut yhtään miniatyyriä.
   * Kuvaukset on kirjoitettu nähtävyysjuttujen todennettujen
   * valokuvien mukaan (js/packs/nahtavyysjutut.js: istanbul) —
   * arkkitehtuurin tosiasioita, ei mielikuvia. Yksi otto per kohde.
   */
  ['istanbul-suuri-basaari', 'a covered bazaar street: a long stone '
    + 'passage roofed with a row of shallow vaults painted with red '
    + 'and blue arabesque bands, arched shopfronts on both sides, and '
    + 'ornate metal lanterns hanging on chains from the vault. NO '
    + 'people'],
  ['istanbul-sininen-moskeija', 'a great Ottoman mosque with a '
    + 'cascade of grey lead domes stepping up to one large central '
    + 'dome, and six slender pencil-thin minarets with pointed caps '
    + 'and two or three small balconies each, rising around it'],
  ['istanbul-hagia-sofia', 'a massive low pinkish-buff Byzantine '
    + 'basilica: one very wide shallow dome flanked by two half-domes '
    + 'stepping down, heavy buttresses along the flanks, and four '
    + 'plain stone minarets of unequal design standing at the corners'],
  ['istanbul-topkapin-palatsi', 'a low Ottoman palace pavilion in a '
    + 'walled garden: wide overhanging eaves on slender columns, a '
    + 'shallow lead dome with a gilded finial, marble-framed arched '
    + 'windows and a colonnaded porch in front', 'halpa'],
  ['istanbul-galatan-torni', 'a tall round stone tower rising alone '
    + 'from a slope of tiled rooftops: a cylindrical grey shaft with '
    + 'small rectangular windows, a projecting railed balcony near '
    + 'the top, a ring of arched windows above it and a pointed '
    + 'conical roof'],
  ['istanbul-uskudar', 'a small waterfront mosque built right at the '
    + 'shore: a single square domed prayer hall with one slim '
    + 'minaret, an arcaded courtyard wall beside it, and a stone quay '
    + 'with water lapping at its foot', 'halpa'],
  ['istanbul-suleymaniyen-moskeija', 'a hilltop imperial mosque: one '
    + 'large central dome with half-domes cascading down on two '
    + 'sides, rows of arched windows in the drum, and four slender '
    + 'minarets at the corners of a walled forecourt, the two inner '
    + 'ones clearly taller than the outer ones'],
  ['istanbul-galatan-silta', 'a long low modern road bridge across a '
    + 'harbour inlet: a flat wide deck on plain concrete piers, a '
    + 'railing lined with fishing rods along the top, and a second '
    + 'lower level under the deck filled with a row of small '
    + 'restaurant fronts with awnings. NO people'],
  ['istanbul-sirkecin-asema', 'a 19th-century orientalist railway '
    + 'terminus: a symmetrical facade of pale stone banded with dark '
    + 'red brick, a large round rose window over the central arched '
    + 'entrance, two square clock towers flanking it and a glazed '
    + 'dome on the roof between them'],
  ['istanbul-neitsyttorni', 'a small white stone tower on a tiny '
    + 'rocky islet surrounded by water: a low single-storey building '
    + 'with a red tiled roof at the base, an octagonal tower rising '
    + 'from it with a railed gallery, a dark lead cupola and a very '
    + 'tall thin flagpole at the top', 'halpa'],

  /*
   * ── Dubai, kymmenen kohdetta (lehden viimeistely 18.8.2026) ──────
   * VAIN JONOSSA, ei generoitu: piirrokset vaativat API-avaimen, jota
   * työsessiossa ei ole. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä — Dubailla ei ole ollut yhtään miniatyyriä.
   * Kuvaukset on kirjoitettu nähtävyysjuttujen todennettujen
   * valokuvien mukaan (js/packs/nahtavyysjutut.js: dubai) —
   * arkkitehtuurin tosiasioita, ei mielikuvia. Yksi otto per kohde.
   */
  ['dubai-kultasuuk', 'a covered market arcade: a long straight lane '
    + 'roofed with a carved wooden lattice canopy on slender posts, '
    + 'shopfronts with wide plate-glass windows on both sides, and '
    + 'ornate hanging lamps along the middle of the roof. NO people'],
  ['dubai-dhow-satama', 'a working wharf on a creek: two heavy wooden '
    + 'cargo sailing boats with high curved prows moored side by side '
    + 'along a stone quay, their decks stacked with crates and bundles '
    + 'under canvas, and coiled ropes on the quay. NO people'],
  ['dubai-al-shindagha', 'a low sand-coloured coral-stone house around '
    + 'a courtyard: flat roofs edged with stepped crenellations, and '
    + 'four square wind towers rising at the corners, each open on all '
    + 'four sides with slatted vents near the top'],
  ['dubai-abra-laiturit', 'a small wooden ferry boat on calm water: an '
    + 'open low hull with a long bench running down the middle under a '
    + 'flat shade roof on thin posts, a tiny engine box at the stern, '
    + 'moored at a simple floating pontoon jetty. NO people', 'halpa'],
  ['dubai-bastakian-kaupunginosa', 'a narrow alley between plain '
    + 'sand-coloured plastered houses: blank walls with small carved '
    + 'wooden doors and shuttered windows, the lane turning out of '
    + 'sight, and square wind towers with pointed corner finials '
    + 'rising above the rooftops'],
  ['dubai-al-fahidin-linnoitus', 'a square desert fort of pale coral '
    + 'stone: thick battered walls topped with stepped crenellations, '
    + 'a round tower at one corner and a square tower at another, one '
    + 'arched gateway in the middle of the near wall and two old '
    + 'cannons standing in front of it'],
  ['dubai-al-ahmadiyan-koulu', 'a two-storey traditional Gulf '
    + 'courtyard building in pale coral stone: an arcade of pointed '
    + 'arches running along both floors around an open sandy '
    + 'courtyard, carved plaster panels above the arches, and one '
    + 'square wind tower rising at the far corner'],
  ['dubai-suuri-moskeija', 'a large sand-grey mosque with an entrance '
    + 'facade of five plain columns above a flight of six steps, a '
    + 'band of Arabic inscription over the columns, a roof crowded '
    + 'with many small white domes around nine larger ones, and one '
    + 'very tall slender minaret shaped like a lighthouse standing '
    + 'beside it'],
  ['dubai-maustesuuk', 'a narrow market lane under a simple corrugated '
    + 'shade roof: open sacks of coloured spices, dried herbs and '
    + 'lumps of pale incense resin standing in rows on both sides, '
    + 'metal scoops in the sacks and bundles of dried goods hanging '
    + 'above them. NO people'],
  ['dubai-tekstiilisuuk', 'a covered market street: a high arcade of '
    + 'carved wooden arches spanning the lane, daylight falling '
    + 'through the gaps between them onto the paving, traditional '
    + 'arabesque lanterns hanging from the arches, and shopfronts '
    + 'stacked with bolts of folded cloth on both sides. NO people'],
  // ── New York (kohdekartta v1065, paketti O9) ─────────────────────
  ['newyork-luonnonhistoriallinen-museo', 'the American Museum of '
    + 'Natural History in New York: a long Romanesque Revival granite '
    + 'facade with a broad arched entrance, round corner turrets with '
    + 'conical roofs and a wide flight of steps rising to the door'],
  ['newyork-metropolitan-museo', 'the Metropolitan Museum of Art in '
    + 'New York: a long Beaux-Arts limestone facade with a central '
    + 'arched entrance flanked by paired columns, three tall arched '
    + 'windows above and a broad staircase spilling down to the avenue'],
  ['newyork-pyhan-patrickin-katedraali', 'St Patrick\'s Cathedral in '
    + 'New York: a white marble Gothic Revival church with two '
    + 'identical open-work spires rising side by side, a large rose '
    + 'window between them and pointed arched doorways below'],
  ['newyork-times-square', 'a wedge-shaped street junction where two '
    + 'avenues cross at an angle: tall buildings on both sides covered '
    + 'from top to bottom in blank rectangular advertising panels and '
    + 'stepped tiers, strictly no letters, no words, no readable text'],
  ['newyork-paakirjasto', 'the New York Public Library main building: '
    + 'a Beaux-Arts marble palace with a six-columned portico, three '
    + 'tall arched doorways, wide steps and one carved stone lion '
    + 'lying on a pedestal at each side of the stairs'],
  ['newyork-empire-state-building', 'the Empire State Building in New '
    + 'York: a very tall limestone Art Deco skyscraper rising in '
    + 'stepped setbacks to a narrow tower, crowned by a rounded '
    + 'observation crown and a slender antenna mast'],
  ['newyork-flatiron-building', 'the Flatiron Building in New York: a '
    + 'narrow triangular twenty-storey building shaped like the prow '
    + 'of a ship, rounded at its sharp corner, with a heavily '
    + 'ornamented terracotta facade and a projecting cornice on top'],
  ['newyork-washington-squaren-riemukaari', 'the Washington Square '
    + 'Arch in New York: a single white marble triumphal arch with one '
    + 'wide opening, a carved frieze and eagles above the columns, and '
    + 'a statue standing in a niche on each of the two front piers'],
  ['newyork-kaupungintalo', 'New York City Hall: a small early '
    + 'nineteenth-century marble civic building with a colonnaded '
    + 'front, two low wings, a balustraded roof and a central domed '
    + 'cupola with a statue on its top'],
  ['newyork-trinity-church', 'Trinity Church in New York: a dark '
    + 'brownstone Gothic Revival church with a single tall square '
    + 'tower carrying a pointed spire and a clock face, pointed arched '
    + 'windows along its side and an old graveyard beside it'],

  /*
   * ── EUROOPAN LOPUT KOHDEKARTAT, 20 kaupunkia (erät E1–E5,
   * 26.8.2026; omistajan tilaus: "Voisi käydä koko Euroopan läpi ja
   * lisätä kaikkiin puuttuvat kuvat") ──────────────────────────────
   * VAIN JONOSSA, ei generoitu: päätoimittaja ajaa generoinnin
   * Actions-työnkululla erissä. Kartalla kohteet näkyvät siihen asti
   * numeroympyröinä, kuten koodi tekee piirroksettomalle kohteelle.
   * Kuvaukset on kirjoitettu kohteiden omien nähtävyysjuttujen ja
   * niiden todennettujen valokuvien mukaan (js/packs/nahtavyysjutut.js)
   * — arkkitehtuurin tosiasioita, ei mielikuvia. Yksi otto per kohde.
   * Järjestys on kartan kohdejärjestys (js/packs/maakartat.js).
   */

  // ── Sofia (erä E1, 26.8.2026) ────────────────────────────────────
  ['sofia-mineraalikylpyla', 'a long symmetrical Vienna Secession '
    + 'bath house of cream and red brick banded with rows of colourful '
    + 'ceramic tiles: two storeys of round-arched windows under a red '
    + 'tiled roof, a tall semicircular arched entrance with a '
    + 'fan-shaped tiled tympanum in the middle, and THREE dark ribbed '
    + 'domes on small arcaded drums — one over the entrance and one at '
    + 'each end of the building; a wide fountain pool on the terrace '
    + 'in front'],
  ['sofia-pyhan-yrjon-rotunda', 'a very small ancient ROUND red-brick '
    + 'church standing in a courtyard below much taller buildings: a '
    + 'plain cylindrical brick drum with a few narrow arched windows, a '
    + 'shallow round tiled dome with a cross on top, and low apsidal '
    + 'brick bays leaning against its sides. Bare weathered brick '
    + 'everywhere, no plaster', 'halpa'],
  ['sofia-sofian-katedraali', 'a huge Bulgarian orthodox cathedral: '
    + 'one enormous GILDED dome on a windowed drum in the middle, '
    + 'around it several smaller domes of weathered COPPER GREEN with '
    + 'gilded crosses, and one tall bell tower with a gilded cap at the '
    + 'front; rows of round-arched windows and shallow arched gables '
    + 'along the pale stone walls. Absolutely NO minarets'],
  ['sofia-sofian-yliopisto', 'a long neoclassical university palace '
    + 'whose wings curve gently back from the street: a central portico '
    + 'of tall corinthian columns under a plain entablature, a broad '
    + 'green COPPER dome rising behind it, two smaller green domes over '
    + 'the ends of the wings, and one seated stone figure on a low '
    + 'pedestal at each side of the entrance steps'],
  ['sofia-borisovan-puutarha', 'a large old city park: a calm lake '
    + 'with a fountain jetting in the middle, long avenues of lime and '
    + 'chestnut trees, gravel paths curving between rose beds and park '
    + 'benches, and a slender concrete television tower rising far '
    + 'behind the treetops'],
  ['sofia-kansalliskulttuuripalatsi', 'a huge low modernist congress '
    + 'palace: a wide symmetrical front faced from top to bottom with '
    + 'tall narrow white vertical fins, a glazed ground floor between '
    + 'them, a dark flat-roofed block above and one big round sunburst '
    + 'emblem in the centre of the facade; in front a very long '
    + 'straight axis of stepped fountain basins between broad paved '
    + 'promenades, mountains on the horizon. NO text, NO letters'],

  // ── Ateena (erä E1, 26.8.2026) ───────────────────────────────────
  ['ateena-antiikin-agora', 'an ancient greek market place: in the '
    + 'middle a small COMPLETE doric temple standing intact on a low '
    + 'stepped platform, columns all round it and a plain triangular '
    + 'pediment at each end, and behind it a long two-storey '
    + 'colonnaded hall; broken column drums and blocks lying on the '
    + 'grass around them'],
  ['ateena-akropolis', 'a steep flat-topped rock rising straight out '
    + 'of a city, its sides ringed by rough stone walls: on the crown a '
    + 'great marble doric temple with rows of columns and its roof gone, '
    + 'a columned gateway at the head of a ramp on the near side, and '
    + 'beside the temple a small porch carried by SIX draped female '
    + 'statues standing where the columns should be'],
  ['ateena-zeuksen-temppeli', 'the ruin of a colossal greek temple: '
    + 'about fifteen ENORMOUS corinthian columns with deep acanthus '
    + 'capitals still standing in two rows, a short length of straight '
    + 'entablature resting across the tops of three of them, and ONE '
    + 'fallen column lying broken into a neat row of round drums on the '
    + 'ground beside them', 'halpa'],
  ['ateena-syntagman-aukio', 'a large plain ochre neoclassical palace '
    + 'block, three storeys of regular tall windows under a flat '
    + 'roofline, with a slightly projecting central bay carrying a '
    + 'columned porch and a triangular pediment; below it a broad '
    + 'marble terrace with a low carved tomb, and two guards in pleated '
    + 'skirts and pompom shoes standing stiffly still in front of it. A '
    + 'wide paved square below'],
  ['ateena-lykavittos', 'a steep cone-shaped limestone hill covered in '
    + 'dark pine woods rising abruptly out of a city, with one tiny '
    + 'whitewashed chapel with a small bell gable perched right on the '
    + 'summit and a zigzag path climbing the slope to it', 'halpa'],
  ['ateena-kallimarmaro', 'an ancient athletics stadium built entirely '
    + 'of WHITE MARBLE, seen slightly from above: a long horseshoe of '
    + 'steep straight tiers of marble benches wrapped round a narrow '
    + 'U-shaped running track and open at the near end, a plain marble '
    + 'entrance below and cypresses on the wooded slope behind'],

  // ── Bukarest (erä E1, 26.8.2026) ─────────────────────────────────
  ['bukarest-romanian-ateneum', 'a ROUND domed concert hall: a tall '
    + 'circular drum crowned by a shallow dome with a small finial, and '
    + 'in front of it a porch of six slender ionic columns under a '
    + 'triangular pediment, with a band of mosaic panels running round '
    + 'the drum above the columns; a low flight of steps and flower '
    + 'beds in front'],
  ['bukarest-cismigiun-puutarha', 'a leafy 19th-century city park '
    + 'around a lake: old trees leaning over the water, a wooden '
    + 'landing stage and a small terrace restaurant at the shore, a '
    + 'fountain jetting in the lake, and a small semicircular stone '
    + 'rotunda ringed with portrait busts among the trees'],
  ['bukarest-yliopiston-aukio', 'a broad city square seen from above: '
    + 'a wide boulevard sweeping past a round grassy traffic island, on '
    + 'one side an ornate pale palace of the 1860s with steep grey '
    + 'mansard roofs, corner domes and rows of dormer windows, on the '
    + 'other a small park of paths and trees, and bronze statues on '
    + 'pedestals along the kerb'],
  ['bukarest-stavropoleoksen-kirkko', 'a very small richly carved '
    + 'romanian church: an open porch along its front carried on '
    + 'slender stone columns covered in deep vine carving under '
    + 'multi-lobed arches, a row of ROUND painted saint medallions in '
    + 'the frieze above them, wide overhanging tiled eaves, and behind '
    + 'the porch a small octagonal tower with a shallow cap and a '
    + 'second dome further back'],
  ['bukarest-vanha-ruhtinaanhovi', 'the excavated ruins of a medieval '
    + 'princely court: low broken walls of thin red brick and stone '
    + 'standing a metre or two high in an open paved enclosure, one '
    + 'stone column standing alone among them, and a surviving '
    + 'round-arched brick vault leading down out of sight', 'halpa'],
  ['bukarest-parlamenttipalatsi', 'an immense symmetrical 1980s palace '
    + 'of white stone: a vast facade rising in stepped tiers to a '
    + 'central block, tier after tier of identical arched loggias and '
    + 'columns across its whole width, a flagpole on the roof and a '
    + 'huge empty paved plaza in front. Monumental and utterly regular'],
  ['bukarest-antipan-museo', 'a pale yellow neoclassical museum: a '
    + 'slightly projecting central bay with four flat pilasters '
    + 'carrying a triangular pediment, three arched doorways beneath it '
    + 'at the top of a wide flight of steps, long two-storey wings of '
    + 'round-arched windows on both sides, and a giraffe sculpture '
    + 'standing on the lawn in front'],

  // ── Sarajevo (erä E1, 26.8.2026) ─────────────────────────────────
  ['sarajevo-sarajevon-katedraali', 'a neo-gothic stone cathedral: TWO '
    + 'identical square west towers with steep pointed pyramid roofs '
    + 'and corner pinnacles, a large ROUND rose window between them '
    + 'above a pointed arched portal, and the steep gabled nave roof '
    + 'running back behind'],
  ['sarajevo-gazi-husrev-begin-moskeija', 'an Ottoman mosque of pale '
    + 'stone: one broad lead-grey dome over the prayer hall with '
    + 'smaller domes stepping down over an arcaded porch in front of '
    + 'it, one very tall slender stone minaret with a single railed '
    + 'balcony and a pointed cap beside it, and a small domed fountain '
    + 'in the walled courtyard'],
  ['sarajevo-bascarsija', 'an old Ottoman bazaar square: in the middle '
    + 'a wooden kiosk fountain — an ornate octagonal cage of carved '
    + 'timber under a wide overhanging pointed roof, standing on a low '
    + 'stone base — and around it small tiled-roof shops with open '
    + 'fronts, hammered copper trays and coffee pots stacked on their '
    + 'tables, a minaret rising behind the roofs. NO text, NO letters'],
  ['sarajevo-vijecnica', 'a pseudo-Moorish city hall on a river bank: '
    + 'walls striped in horizontal bands of ochre and cream, an angled '
    + 'corner front with an upper loggia of many horseshoe arches on '
    + 'slender paired columns, carved panels between the windows and a '
    + 'crenellated parapet along the flat roof; a stone embankment wall '
    + 'and the river below it'],
  ['sarajevo-latinalaissilta', 'a low Ottoman stone bridge over a '
    + 'shallow river: FOUR shallow arches carried on three thick piers, '
    + 'and above each pier one ROUND open hole pierced right through '
    + 'the parapet wall, with a plain stone railing along the top', 'halpa'],
  ['sarajevo-keltainen-linnake', 'a small hilltop gun bastion of '
    + 'yellow sandstone: a curved crescent-shaped rampart wall with a '
    + 'flat gravel terrace behind it and a few embrasures in the '
    + 'parapet, standing on a steep grassy slope that falls away in '
    + 'front of it', 'halpa'],

  // ── Madrid (erä E2, 26.8.2026) ───────────────────────────────────
  ['madrid-kuninkaanlinna', 'a vast white stone baroque palace on a '
    + 'high plinth: a long symmetrical facade of three storeys, the '
    + 'upper two tied together by tall engaged columns and pilasters, a '
    + 'plain balustraded roofline with urns, rows of identical windows '
    + 'and a wide empty paved courtyard in front'],
  ['madrid-plaza-mayor', 'a completely ENCLOSED rectangular square: '
    + 'four continuous ranges of identical red-ochre houses with slate '
    + 'roofs and rows of small iron balconies, an arcade of round '
    + 'arches running along the ground floor all the way round, one '
    + 'taller bay with two slate spires on the far side, and a bronze '
    + 'equestrian statue in the middle of the paving'],
  ['madrid-puerta-del-sol', 'a broad crescent-shaped city square: '
    + 'along one side a long red-and-white 18th-century post-office '
    + 'palace whose central bay carries a square clock tower with a '
    + 'small bell cupola, and at the near kerb a bronze statue of a '
    + 'bear standing on its hind legs and reaching up into a small '
    + 'tree. NO text, NO letters'],
  ['madrid-cibeleen-aukio', 'a white marble fountain in the middle of '
    + 'a square: a goddess sitting upright in a chariot drawn by TWO '
    + 'LIONS walking side by side, the whole group set on carved rocks '
    + 'in a wide basin; behind it a huge white palace with pinnacled '
    + 'towers and a tall gabled centre', 'halpa'],
  ['madrid-prado-museo', 'a long low neoclassical museum of warm brick '
    + 'and pale stone: a projecting portico of six doric columns in the '
    + 'middle of the front, an arcaded gallery of round arches running '
    + 'the whole length of the ground floor on both sides of it, and a '
    + 'bronze statue on a pedestal at the foot of the steps'],
  ['madrid-alcalan-portti', 'a free-standing granite triumphal gate '
    + 'standing alone in the middle of a roundabout: FIVE openings side '
    + 'by side — three tall round archways in the centre and one '
    + 'smaller square-topped opening at each end — engaged columns '
    + 'between them, and carved trophies and reclining figures above '
    + 'the cornice', 'halpa'],

  // ── Lissabon (erä E2, 26.8.2026) ─────────────────────────────────
  ['lissabon-glorian-koysirata', 'a short yellow funicular tram car '
    + 'climbing a very steep narrow street: a squat boxy car with '
    + 'rounded ends, its floor cut into steps so that it stands level '
    + 'on the slope, running on a single track between tall plastered '
    + 'houses with small iron balconies', 'halpa'],
  ['lissabon-rossio', 'a long paved square: in the middle a tall '
    + 'slender column on a stepped base with a small bronze figure on '
    + 'top and a tiered fountain on each side of it, wave-patterned '
    + 'black-and-white mosaic paving over the whole square, and at the '
    + 'far end a pale neoclassical theatre with a six-columned portico'],
  ['lissabon-sao-jorgen-linna', 'a hilltop moorish castle: a ring of '
    + 'crenellated stone walls with tall square battlemented towers, a '
    + 'gate tower reached by a stone bridge over a dry ditch, a flag on '
    + 'the highest tower, and umbrella pines and olive trees on the '
    + 'slope below'],
  ['lissabon-tuomiokirkko', 'a fortress-like romanesque cathedral: TWO '
    + 'squat square bell towers with crenellated tops flanking the '
    + 'front, a large ROUND rose window between them above a plain '
    + 'round-arched doorway, and heavy grey stone walls with very few '
    + 'openings'],
  ['lissabon-kauppatori', 'a huge open square facing a river: '
    + 'identical pale yellow buildings with round-arched arcades along '
    + 'their ground floors closing three sides of it, a bronze '
    + 'equestrian statue in the middle, and in the far range a tall '
    + 'ornate triumphal arch crowned with statues spanning the street '
    + 'that leads out of the square'],
  ['lissabon-kansallispanteoni', 'a white marble baroque church on a '
    + 'greek-cross plan: one great white DOME on a windowed drum in the '
    + 'middle, four small square corner towers with little domes of '
    + 'their own, and a curved front with columns; the whole building '
    + 'gleaming pale above a huddle of red-tiled rooftops'],

  // ── Budapest (erä E2, 26.8.2026) ─────────────────────────────────
  ['budapest-kalastajanlinnake', 'a white stone terrace on a hilltop '
    + 'that only looks like a castle: SEVEN small lookout turrets with '
    + 'pointed conical roofs standing in a row along the parapet, '
    + 'joined by open arcaded walkways and cloister-like arches, with '
    + 'broad stairways sweeping down in front of it'],
  ['budapest-ketjusilta', 'a 19th-century chain suspension bridge over '
    + 'a wide river: two massive pale stone gateway towers standing in '
    + 'the water, each pierced by one tall round archway, heavy iron '
    + 'chains slung in shallow curves between and beyond them, and a '
    + 'stone lion lying on a pedestal at the bridge end', 'halpa'],
  ['budapest-parlamenttitalo', 'an enormous neo-gothic parliament on a '
    + 'river bank: a great ribbed DOME on a colonnaded drum in the '
    + 'middle, long symmetrical wings of pointed windows stretching '
    + 'away on both sides, spiky pinnacles and small spired turrets all '
    + 'along the roofline, and an arcaded terrace at the water'],
  ['budapest-gellertinvuori', 'a steep rocky hill above a river: a '
    + 'long low crenellated stone fortress running along the summit, '
    + 'and beside it on the very top a tall plain pedestal carrying a '
    + 'slim bronze woman who holds a palm leaf high above her head with '
    + 'both hands'],
  ['budapest-pyhan-tapanin-kirkko', 'a neoclassical basilica: one '
    + 'great DOME on a colonnaded drum over the crossing, and at the '
    + 'front two identical square bell towers with small domed caps '
    + 'flanking a columned porch with a triangular pediment between '
    + 'them'],
  ['budapest-suuri-kauppahalli', 'a great 19th-century market hall of '
    + 'pale brick with red brick trim: a tall gabled front with a huge '
    + 'arched window over the entrance and small corner turrets, and a '
    + 'steep roof covered in patterned coloured glazed tiles laid in '
    + 'zigzag bands; a long glass-and-iron roof running back behind '
    + 'the gable'],
  ['budapest-sankarien-aukio', 'a monument on a wide paved square: a '
    + 'tall slender column with a winged figure on top holding a crown '
    + 'in one hand and a double cross in the other, at its foot a '
    + 'bronze group of SEVEN horsemen in fur cloaks, and behind them a '
    + 'curved colonnade of paired columns on each side with statues '
    + 'standing in the gaps between them'],

  // ── Varsova (erä E2, 26.8.2026) ──────────────────────────────────
  ['varsova-vanhankaupungin-tori', 'a small enclosed old town square: '
    + 'three- and four-storey burgher houses in many different colours '
    + 'standing shoulder to shoulder round all four sides, each with '
    + 'its own decorated gable and rows of shuttered windows, cobbled '
    + 'paving, and in the middle a small bronze mermaid holding a sword '
    + 'and a round shield'],
  ['varsova-varsovan-linna', 'a long brick-red baroque royal castle: a '
    + 'wide symmetrical five-storey range with a plain roofline, and '
    + 'rising from its centre one tall square clock tower with a green '
    + 'copper cupola and a slender spire; a tall column with a small '
    + 'statue on top standing on the square in front of it'],
  ['varsova-kopernikuksen-tiedekeskus', 'a long low modern building '
    + 'clad in vertical panels of rusty brown, copper and grey metal in '
    + 'irregular stripes, with narrow slot windows, an open steel '
    + 'trellis with climbing plants running along one side, and a flat '
    + 'roof planted as a garden', 'halpa'],
  ['varsova-pyhan-ristin-kirkko', 'a baroque church front of grey '
    + 'stone: TWO identical towers with ornate curving multi-tiered '
    + 'caps flanking a facade of pilasters, niches and statues, a '
    + 'shallow curved pediment in the middle and a wide flight of steps '
    + 'running the full width in front'],
  ['varsova-varsovan-kansallismuseo', 'a stripped-classical 1930s '
    + 'museum of pale limestone: a deeply recessed portico running '
    + 'right across the front, carried on tall plain SQUARE piers with '
    + 'no capitals and no bases, a flat roof slab above them, a broad '
    + 'low flight of steps and a long rectangular fountain pool in '
    + 'front'],
  ['varsova-kulttuuri-ja-tiedepalatsi', 'a huge Stalinist skyscraper: '
    + 'a tiered wedding-cake tower stepping inwards stage by stage from '
    + 'a broad pillared base, small pinnacles and lanterns at every '
    + 'setback, four large round clock faces near the top and a tall '
    + 'slender spire above them'],

  // ── Oslo (erä E3, 26.8.2026) ─────────────────────────────────────
  ['oslo-kuninkaanlinna', 'a pale YELLOW neoclassical palace on a low '
    + 'hill: a long symmetrical three-storey block with a plain flat '
    + 'roofline, a projecting central bay with a row of tall columns '
    + 'under a triangular pediment, and a bronze equestrian statue on a '
    + 'high pedestal on the gravel forecourt in front'],
  ['oslo-karl-johans-gate', 'a broad city street seen straight down '
    + 'its length: rows of leafy trees along both sides, plain '
    + 'four-storey 19th-century facades behind them, and at the far end '
    + 'of the perspective a pale palace standing on a rise and closing '
    + 'the view. NO text, NO letters, no readable signs'],
  ['oslo-oslon-tuomiokirkko', 'a plain broad brick church tower: a '
    + 'massive square shaft of pale brown brick with ONE large round '
    + 'white clock face high on each side, and above it a dark copper '
    + 'bell stage with an open arcaded lantern and a small pointed '
    + 'spire; a sandstone gothic-revival porch with a rounded '
    + 'ornamental gable at its foot and the low dark-roofed nave behind'],
  ['oslo-kaupungintalo', 'a massive dark red brick city hall: TWO tall '
    + 'square brick towers of equal height rising side by side from a '
    + 'wide lower block between them, small windows in strict regular '
    + 'rows, and an arcaded gallery along the ground floor facing a '
    + 'paved square with statues'],
  ['oslo-akershusin-linnoitus', 'a medieval stone fortress on a rocky '
    + 'shore: thick pale walls rising straight out of the rock, two '
    + 'square towers with pointed green copper spires and a round tower '
    + 'between them, a stepped brick gable on one wing, and calm water '
    + 'with a small sailing boat below'],
  ['oslo-oopperatalo', 'a modern opera house like a white iceberg '
    + 'risen out of the sea: broad flat SLOPING planes of white marble '
    + 'running straight down into the water, a tall glass wall of '
    + 'slender mullions rising at one end, and a plain metal-clad box '
    + 'standing on the sloping roof'],

  // ── Dublin (erä E3, 26.8.2026) ───────────────────────────────────
  ['dublin-guinness-panimo', 'an old brewery block of dark '
    + 'soot-blackened brick on a cobbled street: a long high wall '
    + 'articulated by a row of tall blind arched recesses, iron '
    + 'bollards along the kerb, and on the roof of the block a ROUND '
    + 'drum of glass — a circular glazed bar — sitting above the brick'],
  ['dublin-patrickin-katedraali', 'an early gothic cathedral of grey '
    + 'stone: ONE massive square battlemented tower at the near corner '
    + 'carrying a tall stone spire, a long low nave with buttresses and '
    + 'lancet windows beside it, and a big pointed west window under a '
    + 'gable'],
  ['dublin-dublinin-linna', 'a castle yard: at one end a stout ROUND '
    + 'medieval tower of rough grey stone with a crenellated top, and '
    + 'joined to it a long Georgian range of red brick with pale stone '
    + 'dressings, rows of sash windows and three round-arched carriage '
    + 'passages through the middle of it'],
  ['dublin-hapenny-silta', 'a narrow cast-iron footbridge over a city '
    + 'river: ONE shallow elliptical arch of iron ribs, a white '
    + 'latticed railing curving along it, and three ornate lamp '
    + 'standards standing on the parapet', 'halpa'],
  ['dublin-spire', 'a single enormous stainless steel needle standing '
    + 'alone on a city street: a plain round shaft, widest at the '
    + 'ground and tapering evenly all the way up to a hair-thin point, '
    + 'mirror-smooth with no ornament of any kind', 'halpa'],
  ['dublin-trinity-college', 'a university square: in the middle a '
    + 'tall stone bell tower standing free — an open round-arched base, '
    + 'above it a square stage with a seated statue on each corner, '
    + 'then an octagonal lantern of pointed arched openings under a '
    + 'ribbed dome and small cupola; a long Georgian range with an '
    + 'arcaded ground floor along one side, big chestnut trees and '
    + 'cobbled paving'],

  // ── Barcelona (erä E3, 26.8.2026) ────────────────────────────────
  ['barcelona-sagrada-familia', 'an unfinished modernist basilica: a '
    + 'cluster of very tall tapering honeycombed towers of different '
    + 'heights, their tips studded with coloured knobs, rising in a '
    + 'bunch above a facade covered in dripping cave-like stone '
    + 'sculpture; one construction crane leaning against a tower'],
  ['barcelona-casa-batllo', 'a narrow city house with almost no '
    + 'straight lines: a wavy facade shimmering with broken coloured '
    + 'glass and ceramic mosaic, bone-like stone columns across the '
    + 'bottom, balconies shaped like carved masks with iron rails, and '
    + 'a scaly arched roof like a dragon’s back with a small turret and '
    + 'cross at one end'],
  ['barcelona-arc-de-triomf', 'a triumphal gate built entirely of RED '
    + 'BRICK: one wide round archway, brick pilasters at the corners, a '
    + 'carved stone relief panel above the arch, a band of small '
    + 'shields running round the top and a small pinnacle at each '
    + 'corner; palm trees along the promenade that runs through it', 'halpa'],
  ['barcelona-musiikkipalatsi', 'an ornate red-brick concert hall on a '
    + 'street corner: an upper gallery of slender columns each clad in '
    + 'a DIFFERENT coloured mosaic pattern, the arches above them '
    + 'filled with floral mosaic, a big stone sculpture group bursting '
    + 'out of the corner below, and a balustrade of small mosaic '
    + 'colonnettes'],
  ['barcelona-boquerian-kauppahalli', 'the entrance of a covered '
    + 'market: a wide shallow gable of iron trusses over the opening, '
    + 'its edges set with rows of round coloured glass roundels, a big '
    + 'stained-glass coat of arms in the middle of the gable, and rows '
    + 'of stalls under striped awnings in the iron-roofed hall behind. '
    + 'NO text, NO letters'],
  ['barcelona-kolumbuksen-patsas', 'a tall monument at the end of a '
    + 'boulevard by the sea: a slender round column on a broad ornate '
    + 'base with winged figures and griffins at its corners, and on top '
    + 'a bronze man in a long cloak pointing straight out over the '
    + 'water with one arm and holding a rolled chart in the other; palm '
    + 'trees around the base', 'halpa'],

  // ── Edinburgh (erä E3, 26.8.2026) ────────────────────────────────
  ['edinburgh-charlotte-square', 'a Georgian terrace of golden '
    + 'sandstone facing a square: one long unbroken palace front of '
    + 'three storeys, a slightly projecting centre with columns and a '
    + 'triangular pediment, a rusticated ground floor with fanlight '
    + 'doorways, iron railings along the pavement and a dense row of '
    + 'chimney stacks along the roofline'],
  ['edinburgh-edinburghin-linna', 'a castle on a sheer volcanic crag: '
    + 'a curved half-round gun battery of dark stone rising straight '
    + 'out of the rock face, buildings with crow-stepped gables and '
    + 'small towers crowded behind it on the summit, a flag on the '
    + 'highest roof and the bare cliff falling away below'],
  ['edinburgh-st-gilesin-katedraali', 'a gothic town church with an '
    + 'extraordinary tower: a square stone tower whose top is a CROWN — '
    + 'eight thin flying arches springing inward from its corners and '
    + 'meeting under a small central spire, an open stone crown '
    + 'standing in the air — with the low pinnacled nave below it'],
  ['edinburgh-greyfriars-bobby', 'a small bronze statue of a shaggy '
    + 'little terrier sitting alert on top of a low ROUND polished '
    + 'granite drinking fountain at a street corner, tall old '
    + 'rubble-stone tenements behind it', 'halpa'],
  ['edinburgh-calton-hill', 'a grassy hilltop crowded with odd '
    + 'monuments: an UNFINISHED greek temple — a bare row of about '
    + 'twelve huge doric columns carrying a short length of entablature '
    + 'and then stopping abruptly in mid-air — and beside it a tall '
    + 'round dark stone tower shaped like an upturned telescope with a '
    + 'mast on top'],
  ['edinburgh-holyroodin-palatsi', 'a low quadrangular palace of grey '
    + 'stone: a front with TWO round battlemented towers with small '
    + 'conical caps at its ends and a columned doorway with a little '
    + 'clock cupola between them, and beside the palace the roofless '
    + 'ruined nave of an abbey church with tall empty pointed windows'],

  // ── Moskova (erä E4, 26.8.2026) ──────────────────────────────────
  ['moskova-bolsoi-teatteri', 'a neoclassical theatre: a portico of '
    + 'eight tall columns across the front under a plain triangular '
    + 'pediment, and standing on the roof above the pediment a bronze '
    + 'chariot drawn by FOUR horses abreast with a god holding a lyre; '
    + 'a long plain wing of windows on each side'],
  ['moskova-punainen-tori', 'a long paved square: along one side a '
    + 'dark red brick fortress wall with a tall tented clock tower, at '
    + 'the far end a fanciful dark red museum bristling with spiky '
    + 'pinnacles and small tent roofs, and along the other side the '
    + 'long arcaded glass-roofed front of an old department store. NO '
    + 'text, NO letters'],
  ['moskova-pyhan-vasilin-katedraali', 'a russian cathedral like a '
    + 'bonfire of towers: NINE onion domes of different sizes on tall '
    + 'slender drums, each dome patterned differently — spirals, '
    + 'zigzags, facets, chevrons — clustered around one taller tented '
    + 'spire, the whole standing on a low arcaded terrace with covered '
    + 'stairways'],
  ['moskova-moskovan-kreml', 'a long dark red brick fortress wall with '
    + 'swallowtail battlements running along a river bank, tall tented '
    + 'towers with spires at intervals along it and one taller gate '
    + 'tower with a clock, and rising behind the wall the golden onion '
    + 'domes of cathedrals and a tall white bell tower'],
  ['moskova-vapahtajan-katedraali', 'a huge white stone russian '
    + 'cathedral: one enormous GILDED dome on a tall windowed drum in '
    + 'the middle and four smaller gilded domes on square corner towers '
    + 'around it, deep arched gables along the white walls and an '
    + 'arcaded stone terrace at its foot'],
  ['moskova-tretjakovin-galleria', 'a fairy-tale museum front in '
    + 'russian revival style: terracotta-red walls with a white central '
    + 'bay crowned by a big keel-shaped ogee gable carrying a carved '
    + 'relief of a horseman, a wide arched doorway beneath it, small '
    + 'white gabled porches with tiled edging on both sides, and bands '
    + 'of coloured majolica tiles across the wall'],

  // ── Pietari (erä E4, 26.8.2026) ──────────────────────────────────
  ['pietari-pietari-paavalin-linnoitus', 'a star-shaped fortress on a '
    + 'low river island seen slightly from above: long low pale bastion '
    + 'walls meeting in sharp points, and rising from the middle of '
    + 'them a cathedral with a needle-thin GOLDEN spire, enormously '
    + 'tall, with a tiny angel on its very tip'],
  ['pietari-talvipalatsi', 'an immense baroque palace: a very long '
    + 'facade painted pale GREEN with white columns and window frames, '
    + 'two storeys of tall windows above a lower one, a balustraded '
    + 'roofline crowded with statues and urns, and one tall granite '
    + 'column with a figure on top standing on the square in front'],
  ['pietari-verikirkko', 'a russian church beside a canal: a group of '
    + 'onion domes of different heights, each patterned in a different '
    + 'bright enamel — spirals, chequers, facets — clustered around a '
    + 'tall tented central spire, with ornate gabled porches below and '
    + 'a slim tent-roofed bell tower at the front'],
  ['pietari-vaskiratsastaja', 'a bronze equestrian statue on a '
    + 'colossal rough granite boulder shaped like a breaking wave: the '
    + 'horse rears up on its hind legs at the very edge of the rock, a '
    + 'snake writhing under its hooves, and the rider sits upright with '
    + 'one arm flung straight out ahead', 'halpa'],
  ['pietari-kazanin-katedraali', 'a cathedral with a great curved '
    + 'colonnade: a huge semicircular sweep of tall corinthian columns '
    + 'in four rows curving out from the building to embrace a small '
    + 'square, and behind it a plain drum and dome with a cross'],
  ['pietari-mariinski-teatteri', 'a pale GREEN and white theatre: a '
    + 'symmetrical front of three storeys with a rounded projecting '
    + 'central bay carried on columns, a shallow curved roof over the '
    + 'auditorium behind it, and small square corner towers with '
    + 'sculpted ornament'],

  // ── Kiova (erä E4, 26.8.2026) ────────────────────────────────────
  ['kiova-kontraktovan-aukio', 'a yellow-and-white classicist merchant '
    + 'hall on a square: a heavy portico of six white doric columns '
    + 'carrying a plain triangular pediment, rusticated yellow walls '
    + 'with white window frames on both sides of it, and a broad flight '
    + 'of steps between the columns'],
  ['kiova-andreaksen-kirkko', 'a baroque church standing on a steep '
    + 'hill high on a tall arcaded stone substructure, so that it seems '
    + 'to float above the street: turquoise BLUE walls with white '
    + 'columns and gilded trim, one dome with a gilded cap in the '
    + 'middle and slender turrets with small gilded caps at its '
    + 'corners, and a long flight of steps climbing to its door'],
  ['kiova-pyhan-mikaelin-luostari', 'a Ukrainian baroque monastery '
    + 'church: sky-BLUE walls with white pilasters and gilded ornament, '
    + 'and above them a group of GILDED onion domes of different sizes '
    + 'on tall drums; beside it a separate white bell tower rising in '
    + 'narrowing tiers to a gilded cap'],
  ['kiova-pyhan-sofian-katedraali', 'an ancient byzantine cathedral '
    + 'rebuilt in white baroque plaster: one large GILDED dome in the '
    + 'middle and many smaller GREEN domes on drums stepping down '
    + 'around it, each carrying a slender gilded cross, above white '
    + 'walls with pilasters and small arched windows'],
  ['kiova-itsenaisyyden-aukio', 'a tall white monument on a wide city '
    + 'square: a slender fluted column with a carved corinthian capital '
    + 'standing on an ornate white base with figures in niches, and on '
    + 'top a gilded woman holding a leafy branch high above her head; '
    + 'behind it a low glass dome over an underground hall and a pale '
    + 'columned building'],
  ['kiova-kiovan-kultainen-portti', 'a reconstructed medieval city '
    + 'gate standing alone in a park: a square whitewashed and brick '
    + 'gatehouse with one tall arched passage through it, wooden '
    + 'battlements and a shingled roof, and on top of it a tiny church '
    + 'with a single GILDED onion dome; a fragment of old ruined wall '
    + 'in a grey casing at its foot'],

  // ── Riika (erä E4, 26.8.2026) ────────────────────────────────────
  ['riika-vapaudenpatsas', 'a tall slender monument: a narrow pale '
    + 'stone shaft on a broad stepped granite base with bronze figure '
    + 'groups round its foot, and at the very top a bronze woman '
    + 'holding THREE gilded stars up above her head with both hands', 'halpa'],
  ['riika-kolme-veljesta', 'THREE narrow old town houses of different '
    + 'heights standing side by side in one row on a lane: the widest '
    + 'plain and pale with a simple stepped gable, the middle one with '
    + 'a tall stepped gable and a carved stone doorway, and the '
    + 'narrowest a slim ornate baroque front with a scrolled gable — '
    + 'three different faces in one wall'],
  ['riika-riian-tuomiokirkko', 'a big red-brick medieval cathedral: a '
    + 'long steep-roofed nave with round-arched brick windows, and one '
    + 'square brick tower carrying an octagonal green copper stage and '
    + 'a bulbous baroque cupola with a spire and a weathercock on top'],
  ['riika-pyhan-pietarin-kirkko', 'a red-brick gothic church with an '
    + 'enormous tiered spire: a square brick tower whose top is a stack '
    + 'of THREE open green copper galleries growing smaller one above '
    + 'the other and ending in a thin needle with a gilded weathercock; '
    + 'the brick nave with tall pointed windows below'],
  ['riika-mustapaiden-talo', 'a richly decorated Hanseatic guild '
    + 'house: a tall narrow brick front rising to a stepped-and-scrolled '
    + 'renaissance gable crowded with stone figures, a round clock and '
    + 'coats of arms high on the gable, tall arched windows below, and '
    + 'a stone knight with a raised sword standing on a pedestal on the '
    + 'square in front'],
  ['riika-keskustori', 'FIVE identical enormous barrel-vaulted market '
    + 'pavilions standing in a row: each one a long half-cylinder '
    + 'hangar roof of ribbed metal on a low arcaded stone base, its end '
    + 'wall a plain gable pierced by one huge arched window, all five '
    + 'side by side and seen slightly from above'],

  // ── Vilna (erä E5, 26.8.2026) ────────────────────────────────────
  ['vilna-gediminaksen-torni', 'a stout OCTAGONAL red-brick tower '
    + 'standing alone on a steep green hill: three low storeys with a '
    + 'few small windows, a flat crenellated top with a flagpole and '
    + 'flag, and fragments of ruined stone wall on the slope below it', 'halpa'],
  ['vilna-vilnan-tuomiokirkko', 'a white cathedral built like a greek '
    + 'temple: a wide portico of six tall columns under a plain '
    + 'triangular pediment, THREE stone statues standing on the '
    + 'roofline above it, and standing quite SEPARATELY beside it a '
    + 'tall ROUND white bell tower rising in tiers to a small dome and '
    + 'cross'],
  ['vilna-pyhan-annan-kirkko', 'a small brick gothic church like red '
    + 'lace: a facade of THREE slender pointed brick turrets with the '
    + 'middle one taller, and between them one large flamboyant ogee '
    + 'arch of moulded brick over the doorway, the whole wall woven out '
    + 'of thin patterned brick shafts and little niches'],
  ['vilna-vilnan-yliopisto', 'a university courtyard: pale yellow '
    + 'three-storey ranges with red tiled roofs enclosing a rectangular '
    + 'yard, an open arcade of round arches running along the ground '
    + 'floor, patterned paving across the middle, and at one corner a '
    + 'tall white baroque bell tower rising in narrowing tiers to a '
    + 'small spire'],
  ['vilna-uzupis', 'a tall slender column on a small square in an '
    + 'artists’ quarter, with a bronze ANGEL standing on top, its wings '
    + 'spread and a long trumpet raised to its lips; low old plastered '
    + 'houses with tiled roofs around the square', 'halpa'],
  ['vilna-aamuportti', 'a whitewashed city gate spanning a narrow '
    + 'street: ONE round arched passage at street level, and above it a '
    + 'chapel front with three tall arched windows between pilasters, a '
    + 'gilded image glinting in the middle one, a triangular pediment '
    + 'with a gilded sunburst above, and a tiny bellcote with a cross '
    + 'on the very top'],

  // ── Tallinna (erä E5, 26.8.2026) ─────────────────────────────────
  ['tallinna-paksu-margareeta', 'an immensely thick squat ROUND cannon '
    + 'tower of grey limestone at the end of a street: far wider than '
    + 'it is tall, with only a few small openings in its huge wall, a '
    + 'low conical red roof, and a stone gateway with a carved coat of '
    + 'arms attached to its side', 'halpa'],
  ['tallinna-olevisten-kirkko', 'a very tall church spire: a slim '
    + 'green copper octagonal spire rising to a needle point above a '
    + 'square limestone tower, so tall that it dwarfs the low '
    + 'whitewashed gothic nave with its pointed windows and steep roof '
    + 'at its foot'],
  ['tallinna-raatihuoneentori', 'a medieval town hall on a square: a '
    + 'long low limestone hall with an arcade of pointed arches along '
    + 'the ground floor and a row of small windows above, and at one '
    + 'end a slender octagonal tower rising in tiers to a small spire '
    + 'with a weathervane of a watchman on top; gabled merchant houses '
    + 'closing the square around it'],
  ['tallinna-nevskin-katedraali', 'a russian revival cathedral of red '
    + 'brick with pale stone banding: FIVE onion domes with gilded '
    + 'crosses — one big one in the middle and four smaller ones around '
    + 'it — above walls with arched gables, mosaic panels and a low '
    + 'arcaded porch'],
  ['tallinna-virun-portti', 'TWO ROUND stone gate towers of equal size '
    + 'standing a street’s width apart, each with a pointed red-tiled '
    + 'conical roof and a few small windows, ivy climbing their walls, '
    + 'and the street running between them', 'halpa'],
  ['tallinna-matkustajasatama', 'a passenger harbour seen from above: '
    + 'two long low modern terminal buildings along a quay, a big '
    + 'blunt-nosed car ferry moored at each of them, gangway bridges '
    + 'reaching out to the ships, and open sea beyond. NO text, NO '
    + 'letters on the hulls'],

  // ── Ankara (erä E5, 26.8.2026) ───────────────────────────────────
  ['ankara-ankaran-linna', 'a byzantine hilltop citadel: a crenellated '
    + 'stone curtain wall with square towers set close together running '
    + 'along the top of a rocky crag, a flag on the highest tower, and '
    + 'small red-tiled houses crowded on the slope below the wall'],
  ['ankara-augustuksen-temppeli', 'the ruin of a roman temple: two '
    + 'long parallel walls of pale limestone blocks standing roofless '
    + 'and open to the sky, an elaborately carved doorway frame between '
    + 'them at the near end, the stumps of six column bases in front of '
    + 'it, and a slender brick minaret rising close behind'],
  ['ankara-roomalainen-kylpyla', 'a roman bath excavation: hundreds of '
    + 'short PILLARS OF STACKED BRICKS standing in neat regular rows '
    + 'across an open field where the floor has gone, low stone footing '
    + 'walls running between them, and a few carved column capitals '
    + 'lying on the grass at the edge'],
  ['ankara-julianuksen-pylvas', 'a single roman column standing alone '
    + 'on a lawn: about fifteen metres tall, built up of stacked stone '
    + 'drums, its whole shaft cut into close HORIZONTAL RINGS from '
    + 'bottom to top, with a leafy carved capital at the summit and '
    + 'pieces broken off its upper edge', 'halpa'],
  ['ankara-anatolian-sivilisaatioiden-museo', 'an Ottoman covered '
    + 'market turned museum: a long low stone hall roofed by TEN small '
    + 'lead domes in rows, a walled courtyard in front of it with a '
    + 'plain arched entrance, and carved stone lions and reliefs '
    + 'standing on the paving of the yard'],
  ['ankara-linnanportin-kellotorni', 'a small clock tower built on top '
    + 'of a ROUND stone bastion beside a castle gate: the tower is '
    + 'plastered pale pink, octagonal at the top with open arches, and '
    + 'has a white clock face with roman numerals below that; beside it '
    + 'the gate arch is laid in alternating light and dark stones', 'halpa'],

  // ── İzmir (erä E5, 26.8.2026) ────────────────────────────────────
  ['izmir-izmirin-kellotorni', 'an ornate Ottoman clock tower: an '
    + 'OCTAGONAL open base of horseshoe arches on paired slender '
    + 'columns with small marble drinking fountains under the arches, '
    + 'above it a tapering shaft with a round clock face, and at the '
    + 'top an open pavilion of little columns carrying a pointed cap', 'halpa'],
  ['izmir-kemeraltin-basaari', 'a narrow paved bazaar lane curving '
    + 'gently out of sight: small shopfronts under striped awnings on '
    + 'both sides, goods hanging above the doorways, and one big plane '
    + 'tree spreading its shade over the street. NO text, NO letters, '
    + 'no readable signs'],
  ['izmir-hisarin-moskeija', 'a large Ottoman mosque seen over the '
    + 'roofs of a bazaar quarter: one broad lead-grey central dome with '
    + 'a crescent finial, three big domes stepping down on each side of '
    + 'it and a row of small domes along the courtyard wall, and one '
    + 'slender minaret with a single railed balcony beside them'],
  ['izmir-sulu-han', 'the courtyard of an Ottoman caravanserai: TWO '
    + 'storeys of arcaded galleries of pointed arches running right '
    + 'round a square yard with small merchant rooms behind them, a '
    + 'fountain basin in the middle of the paving, and one deep arched '
    + 'gateway tall enough for a loaded pack animal'],
  ['izmir-smyrnan-agora', 'an excavated roman market place: a long row '
    + 'of tall CORINTHIAN columns standing on a stepped base along one '
    + 'side, and in front of them a wall of massive open stone arches — '
    + 'one wide arch and then a row of narrower ones — the vaults that '
    + 'once carried the floor of the market above'],
  ['izmir-salepcioglun-moskeija', 'a mosque of the 1900s: a square '
    + 'prayer hall with dark GREEN marble walls framed in white marble, '
    + 'one grey dome on top and three smaller domes over the entrance '
    + 'side, two rows of arched windows with small white iron balconies '
    + 'in front of them, and standing quite SEPARATE on its own stone '
    + 'base an extremely slender round minaret with a single balcony'],
];

const uusiksi = process.argv.includes('--uusiksi');
const LIPUT = new Set(['--uusiksi', '--akvarelli']);
const pyydetyt = process.argv.slice(2).filter((a) => !LIPUT.has(a));
console.log(`Tyyli: ${AKVARELLI ? 'akvarelli (seepiaviiva + kevyet laveeraukset)' : 'seepia'}.`);
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
