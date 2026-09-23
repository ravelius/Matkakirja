// LINSSIEN KONTAKTIARKKI: webin ja natiivin kuvat rinnakkain samoista näkymistä
// (Linssiseppä 23.9.2026; natiivi: laitetesti.sh kontakti|maat, web: Laitetestaaja).
//
// Käyttö: node kontaktiarkki.mjs <web-kansio> <natiivi-kansio> <ulos.png>
// Kirjoittaa myös <ulos>.html. Playwright pelin checkoutin node_modulesista
// (PLAYWRIGHT_JS, oletus /Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js).
import { existsSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const [web, natiivi, ulos] = process.argv.slice(2).map((p) => p && resolve(p));
if (!ulos) { console.error('käyttö: node kontaktiarkki.mjs <web> <natiivi> <ulos.png>'); process.exit(1); }
const NAKYMAT = [
  ['topografia', 'Topografia'], ['vesistot', 'Vesistöt'], ['satelliitti', 'Astronautin kamera'],
  ['keksinnot-1873', 'Keksinnöt 1873'], ['keksinnot-loppu', 'Keksinnöt, loppu'],
  ['ihmisen-matka-levantti', 'Ihmisen matka, Levantti'], ['vertailu-fin', 'Vertailu, Suomi'],
  ['vertailu', 'Vertailu, täysi lista'], ['maatiedot', 'Maatiedot, Japani'],
];
const kuva = (kansio, n) => {
  const p = `${kansio}/kontakti-${n}.png`;
  return existsSync(p) ? `<img src="file://${p}">` : '<div class="puuttuu">puuttuu</div>';
};
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:24px;background:#f4ede0;font:15px Georgia,serif;color:#2b2016}
h1{font-size:22px;margin:0 0 16px}
.rivi{display:grid;grid-template-columns:180px 1fr 1fr;gap:12px;align-items:start;margin-bottom:14px}
.rivi b{padding-top:8px}.otsikot{font-weight:bold}
img,.puuttuu{width:100%;aspect-ratio:1668/2420;object-fit:cover;border:1px solid #b9a88c;background:#1e1712}
.puuttuu{display:flex;align-items:center;justify-content:center;color:#b9a88c}
</style><h1>Linssit: web ja natiivi (iPad Pro 11)</h1>
<div class="rivi otsikot"><span></span><span>Web</span><span>Natiivi</span></div>
${NAKYMAT.map(([n, t]) => `<div class="rivi"><b>${t}</b>${kuva(web, n)}${kuva(natiivi, n)}</div>`).join('\n')}`;
const htmlPolku = ulos.replace(/\.png$/, '.html');
writeFileSync(htmlPolku, html);

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_JS ?? '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const selain = await chromium.launch();
const sivu = await selain.newPage({ viewport: { width: 900, height: 800 } });
await sivu.goto(`file://${htmlPolku}`);
await sivu.waitForLoadState('load');
await sivu.screenshot({ path: ulos, fullPage: true });
await selain.close();
console.log(`kontaktiarkki: ${ulos}`);
