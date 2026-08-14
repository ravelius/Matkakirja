/*
 * Savuke: elävöitetty vuosisäägraafi.
 *  1. Kortti aukeaa säärivistä ja vihjeessä lukee "vuosiennuste".
 *  2. Graafissa on pehmeä käyräpolku, alue, palkit, ääripäiden lukemat
 *     ja kuluvan kuukauden korostus.
 *  3. Kuvakaappaus silmätarkistukseen.
 */
import { chromium } from '../../node_modules/playwright/index.mjs';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

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
const ctx = await selain.newContext({ viewport: { width: 834, height: 1194 } });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (v) => virheet.push(String(v)));
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

const tulos = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await new Promise((r) => setTimeout(r, 500));
  const rivi = document.querySelector('.lehti-saa');
  const vihje = rivi?.querySelector('.saa-vihje')?.textContent ?? '';
  ui.naytaVuosiSaa();
  await new Promise((r) => setTimeout(r, 1600));
  const svg = document.querySelector('.vuosisaa');
  return {
    vihje,
    kortti: Boolean(document.querySelector('.vuosisaa-kortti')),
    kayra: Boolean(svg?.querySelector('path.saa-viiva')),
    alue: Boolean(svg?.querySelector('path.saa-alue')),
    palkkeja: svg?.querySelectorAll('.saa-palkki').length ?? 0,
    arvoja: svg?.querySelectorAll('.saa-arvo').length ?? 0,
    kaista: Boolean(svg?.querySelector('.saa-kuluva-kaista')),
    kuluva: Boolean(svg?.querySelector('.saa-kuluva')),
    liuku: Boolean(svg?.querySelector('#vuosisaa-liuku')),
    viivaOffset: svg ? getComputedStyle(svg.querySelector('.saa-viiva')).strokeDashoffset : '',
  };
});
vaadi('säärivin vihjeessä lukee vuosiennuste', /vuosiennuste/i.test(tulos.vihje), tulos.vihje);
vaadi('vuosisääkortti aukeaa', tulos.kortti);
vaadi('käyrä on pehmeä polku ja sen alla on liukuvärialue',
  tulos.kayra && tulos.alue && tulos.liuku, JSON.stringify(tulos));
vaadi('sadepalkkeja on 12', tulos.palkkeja === 12, String(tulos.palkkeja));
vaadi('ääripäiden lukemia on 2–3', tulos.arvoja >= 2 && tulos.arvoja <= 3, String(tulos.arvoja));
vaadi('kuluva kuukausi korostuu kaistalla ja kirjaimella',
  tulos.kaista && tulos.kuluva, JSON.stringify(tulos));
vaadi('käyrän piirto on valmis (dashoffset 0)',
  parseFloat(tulos.viivaOffset) === 0, tulos.viivaOffset);
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await sivu.locator('.vuosisaa-kortti').screenshot({ path: '/tmp/matkakirja-kaappaukset/vuosisaa.png' });
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
