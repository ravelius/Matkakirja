/*
 * Savuke: lehden avauksen mittavarmistus (iPadin kapea lehti
 * uudelleenavauksessa).
 *  1. Vanhentunut mittakirjaus korjautuu avauksessa ilman tapahtumia.
 *  2. Avauksen jälkeen elävä mitta (ei tapahtumia) laukaisee elvytyksen
 *     jälkitarkistuksesta.
 *  3. Tapahtumapolku (oikea resize) sivuttaa leveäksi kuten ennenkin.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 1024, height: 1366 } });
const sivu = await ctx.newPage();
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const aloita = document.getElementById('newgame-btn') ?? document.querySelector('.aloita');
  // Peli käynnistyy automaattisesti tallennuksesta tai startGamesta.
});

// 1. Vanhentunut mittakirjaus korjautuu avauksessa
const avaus = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.nakymanLeveys = 390; // simuloitu vanhentunut kirjaus
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 300));
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  return { mitta: ui.nakymanLeveys, leveys: kortti?.clientWidth ?? 0 };
});
vaadi('avaus korjaa vanhentuneen mitan ilman tapahtumia', avaus.mitta === 1024, JSON.stringify(avaus));
vaadi('lehti sivutetaan leveänä', avaus.leveys > 900, JSON.stringify(avaus));

// 2. Avauksen jälkeen elävä mitta laukaisee elvytyksen jälkitarkistuksesta
const elvytys = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  let elvytyksia = 0;
  const alkuperainen = ui.elvytaNakyma.bind(ui);
  ui.elvytaNakyma = () => { elvytyksia += 1; alkuperainen(); };
  // Uusi avaus virittää jälkitarkistukset.
  ui.arrivalShownFor = null;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 600));
  // Simuloidaan: sivutus tapahtui vanhalla mitalla eikä yhtään
  // tapahtumaa tullut. 1600 ms:n jälkitarkistuksen pitää huomata ero.
  ui.nakymanLeveys = 390;
  await new Promise((r) => setTimeout(r, 1400));
  const tulos = { elvytyksia, mitta: ui.nakymanLeveys };
  ui.elvytaNakyma = alkuperainen;
  return tulos;
});
vaadi('jälkitarkistus elvyttää ilman tapahtumia', elvytys.elvytyksia >= 1 && elvytys.mitta === 1024,
  JSON.stringify(elvytys));

// 3. Tapahtumapolku: kapea avaus + oikea resize → leveä
await sivu.evaluate(() => { document.getElementById('arrival-dialog').close(); });
await sivu.setViewportSize({ width: 390, height: 844 });
await sivu.waitForTimeout(400);
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.arrivalShownFor = null;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
});
await sivu.waitForTimeout(400);
await sivu.setViewportSize({ width: 1024, height: 1366 });
await sivu.waitForTimeout(1200);
const resizen = await sivu.evaluate(() => {
  const kortti = document.querySelector('#arrival-dialog .dialog-card');
  return { leveys: kortti?.clientWidth ?? 0, auki: document.getElementById('arrival-dialog').open };
});
vaadi('oikea resize sivuttaa avoimen lehden leveäksi', resizen.auki && resizen.leveys > 900,
  JSON.stringify(resizen));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
