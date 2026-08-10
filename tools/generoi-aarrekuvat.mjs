/*
 * Aarrekuvien AI-generointi (omistajan päätös 9.8.2026: yhtenäinen
 * tyyli ja tausta, Commons-valokuvat eivät toimi sellaisinaan).
 *
 * Käyttö:  NODE_USE_ENV_PROXY=1 GOOGLE_API_KEY=... node tools/generoi-aarrekuvat.mjs [avain …]
 * Ilman argumentteja generoi kaikki. Avaimet: europe-ruby, africa-topaz …
 * Malli: Gemini-kuvamalli (generateContent); vaihdettavissa
 * AARRE_MALLI-ympäristömuuttujalla. (Imagen 3/4 eivät olleet avaimen
 * käytettävissä 9.8.2026 — Gemini-kuvamallit olivat.) Ulos: assets/aarteet/aarre-<avain>.png
 * (1024×1024 — pienennys ~640 px:iin tehdään erillisenä vaiheena
 * ennen peliin kytkemistä, ks. tools/aarrekuvat-promptit.md).
 *
 * API-avainta EI koskaan repoon eikä lokiin.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MALLI = process.env.AARRE_MALLI ?? 'gemini-3-pro-image';

// Ympäristössä avain on kirjoitusvirheellisellä nimellä GOOGLW_API_KEY
// (omistajan huomio 10.8.2026) — luetaan molemmat, ettei generointi
// kaadu nimen kirjoitusasuun.
const avain = process.env.GOOGLE_API_KEY ?? process.env.GOOGLW_API_KEY;
if (!avain) {
  console.error('GOOGLE_API_KEY (tai GOOGLW_API_KEY) puuttuu ympäristöstä — kuvia ei voi generoida.');
  process.exit(1);
}

/*
 * Yhtenäinen tyyli joka promptin ympärille (omistajan palaute
 * 9.8.2026 myöhäisilta: "generoi aarteet uudestaan niin että nousevat
 * mustasta... kuva ilman rajoja keskelle jonka ympärille tekstit").
 * Esine nousee puhtaasta mustasta kynttilänvalossa — reunat häipyvät
 * saumatta paljastuskortin tummaan taustaan, ei kehyksiä eikä
 * pergamenttia.
 */
const TYYLI = (esine) => `Vintage children's adventure book illustration of ${esine}, `
  + 'painted in warm gouache with fine ink outlines, emerging from '
  + 'pure black darkness. The object is centered and lit warmly by '
  + 'unseen candlelight from the upper left; everything around it '
  + 'fades smoothly into solid pure black (#000000) at the edges. '
  + 'No background scenery, no parchment, no frame, no border, no '
  + 'text, no people, no candle visible. The darkness fills the '
  + 'ENTIRE square canvas edge to edge: all four corners and edges '
  + 'are solid black, never white, never paper — do not paint a '
  + 'black circle on a light page. Rich glowing detail on the '
  + 'object itself, muted antique palette with one strong accent '
  + 'color from the object.';

const KUVAT = [
  // Eurooppa
  ['europe-ruby', 'a magnificent royal crown of gold covered in pearls, table-cut gems and colorful enamel figures'],
  ['europe-emerald', "a knight's medieval longsword with silver pommel and worn leather-wrapped grip, lying diagonally on cloth"],
  ['europe-topaz', 'a cluster of glowing baltic amber pieces, one with a tiny ancient insect trapped inside, light passing through'],
  // Afrikka
  ['africa-ruby', 'a large rough uncut diamond crystal, glassy and angular, resting on dark stone'],
  ['africa-emerald', 'a heavy natural gold nugget with pitted gleaming surface'],
  ['africa-topaz', 'a small pile of glossy spotted cowrie shells, once used as money'],
  // Lähi-itä
  ['middleeast-ruby', 'an ornate antique brass oil lamp with curved spout and looped handle, like from an old tale'],
  ['middleeast-emerald', 'translucent golden frankincense resin chunks in a small brass bowl with a faint wisp of smoke'],
  ['middleeast-topaz', 'a small linen pouch spilling deep red saffron threads'],
  // Aasia
  ['asia-ruby', 'a single large lustrous white pearl resting on a dark mother-of-pearl oyster shell'],
  ['asia-emerald', 'a rolled bolt of imperial yellow silk with a woven dragon pattern, partly unrolled'],
  ['asia-topaz', 'a delicate blue-and-white Chinese porcelain cup with painted figures'],
  // Pohjois-Amerikka
  ['northamerica-ruby', 'a gold nugget beside a battered tin gold-panning dish with river sand'],
  ['northamerica-emerald', 'a raw turquoise stone with golden-brown matrix veins'],
  ['northamerica-topaz', 'a burlap sack spilling brown cacao beans'],
  // Etelä-Amerikka
  ['southamerica-ruby', 'a small pre-Columbian hammered gold votive figurine with a headdress'],
  ['southamerica-emerald', 'a vivid green emerald crystal embedded in white host rock'],
  ['southamerica-topaz', 'an irregular hand-struck Spanish colonial silver coin with a cross and shield design'],
  // Oseania
  ['oceania-ruby', 'a precious opal with rainbow fire flashing across its surface, set in rough sandstone'],
  ['oceania-emerald', 'a polished paua abalone shell shimmering blue and green'],
  ['oceania-topaz', 'long strings of tiny white shell beads coiled like rope, Pacific island shell money'],
];

const pyydetyt = process.argv.slice(2);
const jono = KUVAT.filter(([k]) => !pyydetyt.length || pyydetyt.includes(k));
if (!jono.length) {
  console.error('Ei kohteita. Tunnetut:', KUVAT.map(([k]) => k).join(', '));
  process.exit(1);
}

mkdirSync(resolve(JUURI, 'assets/aarteet'), { recursive: true });

async function generoi(tunnus, esine) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MALLI}:generateContent?key=${avain}`;
  const vastaus = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: TYYLI(esine) }] }],
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
  const polku = resolve(JUURI, `assets/aarteet/aarre-${tunnus}.png`);
  writeFileSync(polku, Buffer.from(b64, 'base64'));
  console.log(`${tunnus}: ${(Buffer.from(b64, 'base64').length / 1024).toFixed(0)} kt → ${polku}`);
  return true;
}

let onnistui = 0;
for (const [tunnus, esine] of jono) {
  if (await generoi(tunnus, esine)) onnistui++;
  await new Promise((r) => setTimeout(r, 2000));
}
console.log(`Valmis: ${onnistui}/${jono.length}.`);
