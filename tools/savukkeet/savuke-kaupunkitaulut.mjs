import pw from '../../node_modules/playwright/index.js';

const { chromium } = pw;
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAT = '/tmp/claude-0/-home-user-Matkakirja/c5b894db-1cea-56f5-9739-4e6b1ebb57bd/scratchpad';
const TYYPIT = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.webmanifest': 'application/manifest+json',
  '.geojson': 'application/json', '.svg': 'image/svg+xml',
};

const palvelin = http.createServer((req, res) => {
  const p = path.join(JUURI, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(JUURI) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) {
    res.writeHead(404); res.end('ei'); return;
  }
  res.writeHead(200, { 'content-type': TYYPIT[path.extname(p)] ?? 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => palvelin.listen(0, '127.0.0.1', r));
const osoite = `http://127.0.0.1:${palvelin.address().port}`;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const konteksti = await selain.newContext({
  viewport: { width: 900, height: 1000 }, serviceWorkers: 'block',
});
await konteksti.route('**', (route) => {
  const u = route.request().url();
  if (u.startsWith(osoite)) return route.continue();
  return route.abort();
});
const virheet = [];
const sivu = await konteksti.newPage();
const konsoli = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
sivu.on('console', (m) => { if (m.type() === 'error') konsoli.push(m.text()); });

await sivu.goto(`${osoite}/tyohuone.html#tilanne`, { waitUntil: 'domcontentloaded' });
await sivu.waitForSelector('#kaupunkilehdet details', { timeout: 30000 });

const tulos = await sivu.evaluate(() => {
  const osiot = [...document.querySelectorAll('#kaupunkilehdet > details')];
  return osiot.map((d) => ({
    otsikko: d.querySelector('summary').textContent.trim(),
    auki: d.open,
    rivit: d.querySelectorAll('tbody tr').length,
    eka: [...(d.querySelector('tbody tr')?.cells ?? [])].map((c) => c.textContent),
  }));
});
console.log(JSON.stringify(tulos, null, 1));
const naky = await sivu.evaluate(() => {
  const t = document.querySelector('#kaupunkilehdet details[open] table');
  const r = t.getBoundingClientRect();
  return { nakyy: r.height > 0 && r.width > 0, vaakavieritys: document.documentElement.scrollWidth > document.documentElement.clientWidth };
});
console.log('naky', JSON.stringify(naky));

await sivu.evaluate(() => {
  const h = [...document.querySelectorAll('#tab-tilanne h2')]
    .find((n) => n.textContent.startsWith('Kaupunkilehdet'));
  window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 115);
});
await sivu.screenshot({ path: `${KUVAT}/kaupunkilehdet-900.png`, fullPage: false });

await sivu.setViewportSize({ width: 390, height: 844 });
await sivu.evaluate(() => {
  const h = [...document.querySelectorAll('#tab-tilanne h2')]
    .find((n) => n.textContent.startsWith('Kaupunkilehdet'));
  window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 115);
});
const kapea = await sivu.evaluate(() => {
  const leveys = document.documentElement.clientWidth;
  const syylliset = [...document.querySelectorAll('#tab-tilanne *')]
    .filter((n) => n.getBoundingClientRect().right > leveys + 1)
    .slice(0, 8)
    .map((n) => `${n.tagName}.${n.className || '-'} isä=${n.parentElement?.id || n.parentElement?.className || '?'} → ${Math.round(n.getBoundingClientRect().right)}`);
  return { vieritys: document.documentElement.scrollWidth > leveys, leveys, syylliset };
});
console.log('390px:', JSON.stringify(kapea, null, 1));
await sivu.screenshot({ path: `${KUVAT}/kaupunkilehdet-390.png`, fullPage: false });

console.log('pageerrorit:', virheet.length, virheet.slice(0, 5));
console.log('konsolivirheet (odotettuja: katkaistut ulkoiset haut):', konsoli.length, konsoli.slice(0, 5));
await selain.close();
palvelin.close();
