// Pulu-astronautin kolme vaihdettavaa @3x-ilmettä Päätoimittajan katseluun.
// Ei kytke kuvia peliin. Samasta 152 × 304 SVG-kankaasta tulee 456 × 912 PNG.
//   node tools/vie-pulu-astro-vauhti.mjs [kohdekansio]
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { livianSvgAsento, livianEvaKerrosSvg } from '../js/livia-svg.js';
import { avaaChromium } from './selain.mjs';

const juuri = fileURLToPath(new URL('..', import.meta.url));
const kohde = process.argv[2] ?? `${juuri}posti/pulu-astro-vauhti-20261006`;
const kypara = `data:image/png;base64,${readFileSync(`${juuri}assets/livia/livia-astronauttikypara-2x.png`).toString('base64')}`;
mkdirSync(kohde, { recursive: true });

const selain = await avaaChromium();
try {
  const sivu = await selain.newPage({ viewport: { width: 152, height: 304 }, deviceScaleFactor: 3 });
  for (let vauhti = 0; vauhti <= 2; vauhti++) {
    const tila = { ...livianSvgAsento('rest', 0), astroVauhtiIlme: vauhti };
    const svg = livianEvaKerrosSvg('perus', tila, { prefix: `pulu-vauhti-${vauhti}` })
      .replaceAll('/assets/livia/livia-astronauttikypara-2x.png', kypara);
    await sivu.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await sivu.waitForFunction(() => [...document.images].every((i) => i.complete));
    const png = await sivu.locator('svg').screenshot({ omitBackground: true });
    const nimi = `pulu-astro-vauhti-${vauhti}.png`;
    writeFileSync(`${kohde}/${nimi}`, png);
    console.log(`${nimi}: ${png.length} tavua`);
  }
  // Katselukuva näyttää samat ilmeet valoisina ja kypärälampun kanssa.
  // Se on vain esikatselu: nimettyjen kolmen PNG:n alfa ja ankkuri pysyvät puhtaina.
  const otsikot = ['Lepo 1–30×', 'Innostus 100–300×', 'Täysi vauhti 1000×'];
  const kortit = otsikot.map((otsikko, vauhti) => {
    const tila = { ...livianSvgAsento('rest', 0), astroVauhtiIlme: vauhti };
    const rajaa = (svg) => svg.replace('viewBox="0 0 152 304" width="152" height="304"',
      'viewBox="80 232 72 72" width="360" height="360"')
      .replaceAll('/assets/livia/livia-astronauttikypara-2x.png', kypara);
    const kuva = rajaa(livianEvaKerrosSvg('perus', tila, { prefix: `pulu-esikatselu-${vauhti}` }));
    const lamput = rajaa(livianEvaKerrosSvg('kypärälamput', tila, { prefix: `pulu-lamput-${vauhti}` }));
    return `<section><h2>${otsikko}</h2><div class="kuva"><div class="pulu">${kuva}</div><div class="lamput">${lamput}</div></div></section>`;
  }).join('');
  const katselu = await selain.newPage({ viewport: { width: 1140, height: 420 }, deviceScaleFactor: 1 });
  await katselu.setContent(`<!doctype html><html><head><style>
    body{margin:0;padding:20px;background:#142839;font-family:system-ui,sans-serif;color:#f2ead6;display:flex;gap:20px}
    section{width:360px;height:380px;background:#20394b;border:1px solid #5d7280;border-radius:14px;overflow:hidden}
    h2{height:39px;margin:0;padding:12px 16px 0;font-size:17px;font-weight:600}
    .kuva{position:relative;width:360px;height:360px;background:radial-gradient(ellipse at 50% 36%,#34566d,#182b3e 75%)}
    .pulu{filter:brightness(1.48) saturate(1.1)} .lamput{position:absolute;inset:0}
  </style></head><body>${kortit}</body></html>`);
  await katselu.waitForFunction(() => [...document.images].every((i) => i.complete));
  writeFileSync(`${kohde}/esikatselu.png`, await katselu.screenshot());
} finally {
  await selain.close();
}
