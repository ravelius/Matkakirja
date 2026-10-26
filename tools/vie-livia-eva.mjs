// PULUN EVA-ASUN NATIIVIKERROKSET (Linssiseppä 2, 30.9.2026; omistaja: korjaukset moottorissa, ei Codexilla): viisi
// läpinäkyvää 2×-PNG:tä (304 × 608) samasta SVG:stä kuin webin astronauttipulu (js/livia-svg.js livianEvaKerrosSvg,
// lepoasento), jotta web ja natiivi pysyvät samana. Kypäräkuva upotetaan data-URI:ksi (ei palvelinta).
//   node tools/vie-livia-eva.mjs [kohdekansio] (selain.mjs etsii Playwrightin)
// Natiivi: kopioi tulokset protoon Assets/Matkakirja/UI/Resources/LiviaEva/<kerros>.png. JOKAISEN kerroksen alfa ≥ 240 → 255
// ennen kopiointia (lineaarinen väriavaruus vuotaa kartan läpi 240–254:llä, muisti ui-kuvien-alfa-255): peruskerros 30.9.,
// turvaköysi ja kypärälamput 2.10. PIL:llä (robottikerrokset korjaa tools/vie-livia-eva-robotti.mjs itse).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { livianSvgAsento, livianEvaKerrosSvg } from '../js/livia-svg.js';
import { avaaChromium } from './selain.mjs';

const juuri = fileURLToPath(new URL('..', import.meta.url));
const kohde = process.argv[2] ?? `${juuri}assets/livia`;

const kypara = `data:image/png;base64,${readFileSync(`${juuri}assets/livia/livia-astronauttikypara-2x.png`).toString('base64')}`;
const KERROKSET = { perus: 'perus', kasvovalo: 'kasvovalo', kypärälamput: 'kyparalamput', maavalo: 'maavalo', turvaköysi: 'turvakoysi' };
const lepo = livianSvgAsento('rest', 0);

const selain = await avaaChromium();
try {
  const sivu = await selain.newPage({ viewport: { width: 152, height: 304 }, deviceScaleFactor: 2 });
  for (const [kerros, tiedosto] of Object.entries(KERROKSET)) {
    const svg = livianEvaKerrosSvg(kerros, lepo).replaceAll('/assets/livia/livia-astronauttikypara-2x.png', kypara);
    await sivu.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await sivu.waitForFunction(() => [...document.images].every((i) => i.complete));
    const png = await sivu.locator('svg').screenshot({ omitBackground: true });
    writeFileSync(`${kohde}/livia-eva-${tiedosto}-2x.png`, png);
    console.log(`livia-eva-${tiedosto}-2x.png ${png.length} t`);
  }
} finally {
  await selain.close();
}
