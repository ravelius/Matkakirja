/*
 * Kohdekartan miniatyyripiirrosten AI-generointi (omistajan tilaus
 * 15.8.2026: "jos siihen saisi jotkut miniatyyrikuvat piirrettynä
 * nähtävyyksistä (nano banana) voisi olla hieno. Sama idea kuin
 * huvipuisto kartoissa" ja "Tee piirrokset sinne [Berliiniin] ensin
 * sekä samat kolmeen kaupunkiin hki. Pariisi. Lontoo").
 *
 * Sama putki kuin tools/generoi-varustekuvat.mjs: gemini-3-pro-image
 * antaa 1024×1024 PNG:n, joka pienennetään 512 px:n JPEG:ksi
 * Chromiumin kanvaasilla samassa ajossa. Tyyli on huvipuistokartan
 * pienoiskuva: yksi rakennus viistosti ylhäältä, lämmin akvarelli +
 * musteviiva, paperinvärinen tausta joka jatkuu kortin paperiin.
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 node tools/generoi-miniatyyrit.mjs [avain …]
 *          Avain on muotoa berliini-tv-torni; ilman argumentteja
 *          generoidaan kaikki listatut. KATSO JOKAINEN KUVA SILMIN
 *          ennen peliin kytkemistä (js/packs/miniatyyrit.js).
 * Ulos:    assets/kartat/miniatyyrit/<avain>.jpg
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = process.env.MINIATYYRI_MALLI ?? 'gemini-3-pro-image';
const LEVEYS = 512;
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
const TYYLI = (aihe) => 'A miniature illustrated landmark for a vintage '
  + `hand-drawn city map, in the style of theme-park map art: ${aihe}. `
  + 'Drawn as a small charming three-quarter aerial view with fine warm '
  + 'brown ink outlines and soft muted watercolor washes; gentle warm '
  + 'colors — sand, brick, soft blues and greens — with one modest '
  + 'accent color. The building stands alone on a plain warm cream '
  + 'paper background (like aged map paper, #f2ecd8) that fills the '
  + 'ENTIRE square canvas edge to edge; only a soft small shadow under '
  + 'the building. No surrounding streets or map, no text, no letters, '
  + 'no signs, no frame, no border, no people in front. Square 1:1. '
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
    + 'forming five passages, topped by the Quadriga — a bronze-green '
    + 'four-horse chariot driven by a winged goddess'],
  ['berliini-checkpoint-charlie', 'the Checkpoint Charlie guardhouse '
    + 'in Berlin: a small white rectangular border-crossing booth with '
    + 'windows on all sides, sandbags stacked around its base and a '
    + 'simple striped barrier beside it'],
  ['berliini-museosaari', 'Museum Island in Berlin: a cluster of grand '
    + 'neoclassical museum buildings with long columned facades on a '
    + 'small river island, beside them the green-domed Berlin Cathedral'],
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
    + 'covered edge to edge in colorful painted murals — only abstract '
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
    + 'romantic style on a hilltop: a tall massive rectangular bell '
    + 'tower with a green copper roof, the nave lower behind it'],
  ['helsinki-tuomiokirkko', 'a gleaming white neoclassical cathedral '
    + 'on top of a broad steep flight of stone steps: a tall green '
    + 'central dome, four smaller green domes around it and columned '
    + 'porticoes on each side'],
  ['helsinki-uspenskin-katedraali', 'a red-brick orthodox cathedral '
    + 'on a rocky outcrop: a cluster of thirteen small golden onion '
    + 'cupolas above narrow arched windows'],
  ['helsinki-johanneksenkirkko', 'a red-brick gothic revival church '
    + 'with two identical very tall slender towers topped by pointed '
    + 'green copper spires'],
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
    + 'green-and-gold sculpted figures'],
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
    + 'column with a small statue on top, four large bronze lions at '
    + 'its base, two round fountains and a long columned gallery '
    + 'facade behind'],
  ['lontoo-big-ben', 'the Big Ben clock tower: a tall gothic revival '
    + 'stone tower with a large white clock face on each side, gilded '
    + 'details and a green pointed spire, a corner of an ornate '
    + 'parliament building at its foot'],
  ['lontoo-lontoon-silma', 'a giant white observation wheel by a '
    + 'river: slender spokes like a bicycle wheel and oval glass '
    + 'capsules along the rim, a hint of water below'],
  ['lontoo-pyhan-paavalin-katedraali', 'an English baroque cathedral: '
    + 'a great grey-green dome with a golden cross on a colonnaded '
    + 'drum, twin baroque towers at the west front with a columned '
    + 'portico between them'],
  ['lontoo-tower-bridge', 'a Victorian river bridge with two tall '
    + 'gothic stone towers, high walkways connecting them, pale blue '
    + 'suspension chains and a twin lifting roadway between the '
    + 'towers'],
];

const pyydetyt = process.argv.slice(2);
const jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k));
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
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

async function generoi(tunnus, aihe, pienentaja) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MALLI}:generateContent?key=${avain}`;
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
for (const [tunnus, aihe] of jono) {
  if (await generoi(tunnus, aihe, pienentaja)) onnistui++;
  await new Promise((r) => setTimeout(r, 2000));
}
await pienentaja.sulje();
console.log(`Valmis: ${onnistui}/${jono.length}.`);
