/*
 * Savuke: MATKAKIRJAKORTTI PALAA AUKI LUENNAN AJAN KARTAN LIIKKEEN
 * JÄLKEEN (omistaja 10.9.2026, Raamattu).
 *
 * *"Matkakirjan teksti saisi aina aueta kun tullaan uuteen paikkaan ja
 * se saisi pysyä auki niin kauan kuin puhe kestää. Jos karttaa
 * liikuttaa niin se katoaa pieneksi mutta puheen aikana se palutuu
 * liikkeen jälkeen. Puheen jälkeen se voi pysyä piilossa."*
 *
 * VARTIOT:
 *   1. SAAPUMISESSA KORTTI ON AUKI (ei .pieni).
 *   2. LUENNAN AIKANA RAAHAUS KUTISTAA sen lapuksi.
 *   3. SORMEN NOSTON JÄLKEEN kortti palaa auki rauhoitusajassa.
 *   4. LUENNAN JÄLKEEN raahaus kutistaa — ja kortti JÄÄ lapuksi.
 *   5. Sivulla ei ole JS-virheitä.
 *
 * LUENTA PAKOTETAAN TILAKSI, EI ÄÄNEKSI. Headless-Chromiumissa
 * äänitteen soiminen on ympäristön armoilla (autoplay, ämpäri, koodekit),
 * eikä savuke saa mitata verkkoyhteyttä. Mekanismi lukee luennan tilan
 * ui.luentaKesken()-apurin kautta (js/ui.js), joten savuke asettaa
 * ui.diaryVoicen soivaan ja päättyneeseen tilaan — juuri ne kaksi
 * tilaa, joiden ero on koko omistajan ohje. Jos peli itse saa luennan
 * käyntiin, oikeaa ääntä käytetään sellaisenaan (INFO-rivi kertoo kumpi).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-matkakirjakortti.mjs [kuvakansio]
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'lontoo';
const TYOPOYTA = { width: 1280, height: 860 };
// Rauhoitusaika on 500 ms (js/ui.js KORTIN_PALAUTUS_MS); savuke odottaa
// sen yli, muttei niin kauan että mittaus menettäisi merkityksensä.
const PALUUN_ODOTUS_MS = 900;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
const AMPARI = /media\.matkakirja\.app|r2\.dev\//;
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];
const ctx = await selain.newContext({ viewport: TYOPOYTA, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try { localStorage.setItem('matkakirja-save-v1', data); } catch { /* yksityinen tila */ }
}, tallenne);

const sivu = await ctx.newPage();
const cdp = await ctx.newCDPSession(sivu);
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(AMPARI, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});

await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(4000);

/* Saapuminen Lontooseen pelin omalla tilalla (kuten renderFactissa). */
await sivu.evaluate((id) => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: id };
  game.world.visited.add(id);
  game.arrivalFact = { packId: game.pack.id, cityId: id };
  ui.render();
}, KAUPUNKI);
await sivu.waitForTimeout(2500);

const kaappaa = async (nimi) => {
  if (!KUVAKANSIO) return;
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(KUVAKANSIO, nimi), Buffer.from(data, 'base64'));
};

const lue = () => sivu.evaluate(() => {
  const kortti = document.querySelector('.fact-card');
  return {
    kortti: Boolean(kortti),
    pieni: Boolean(kortti?.classList.contains('pieni')),
    luentaKesken: Boolean(window.matkakirja.ui.luentaKesken?.()),
  };
});

/** Pelaajan oma panorointi: sormi alas, veto, sormi ylös. */
async function raahaa({ pidaPohjassa = false } = {}) {
  const keski = await sivu.evaluate(() => {
    const r = window.matkakirja.ui.mapPane.getBoundingClientRect();
    return { x: Math.round(r.left + r.width * 0.6), y: Math.round(r.top + r.height * 0.6) };
  });
  await sivu.mouse.move(keski.x, keski.y);
  await sivu.mouse.down();
  await sivu.mouse.move(keski.x - 120, keski.y - 60, { steps: 12 });
  if (pidaPohjassa) return;
  await sivu.mouse.up();
}

/* ---- 1. Saapumisessa kortti on auki ---------------------------- */
let tila = await lue();
vaadi('kortti on saapumisessa auki', tila.kortti && !tila.pieni, JSON.stringify(tila));
await kaappaa('matkakirjakortti-saapuminen.png');

/* ---- Luenta käyntiin (oikea ääni tai pakotettu tila) ----------- */
const luennanLahde = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  if (ui.luentaKesken?.()) return 'peli soittaa luentaa';
  ui.diaryVoice = {
    paused: false, currentTime: 1.2, ended: false, error: null,
  };
  return 'luennan tila pakotettu savukkeessa';
});
tieto('luenta', luennanLahde);
vaadi('luenta on kesken ennen raahausta', (await lue()).luentaKesken === true);

/* ---- 2. Luennan aikana raahaus kutistaa ------------------------ */
await raahaa({ pidaPohjassa: true });
tila = await lue();
vaadi('kortti kutistuu kartan liikkeestä luennan aikana', tila.pieni === true, JSON.stringify(tila));
await kaappaa('matkakirjakortti-raahaus.png');

/* ---- 3. Sormen noston jälkeen kortti palaa auki ---------------- */
await sivu.mouse.up();
await sivu.waitForTimeout(PALUUN_ODOTUS_MS);
tila = await lue();
vaadi('kortti palaa auki liikkeen jälkeen luennan aikana', tila.pieni === false,
  JSON.stringify(tila));
await kaappaa('matkakirjakortti-palasi.png');

/* ---- 4. Luennan jälkeen kortti jää lapuksi --------------------- */
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  // Sama polku kuin pelissä: luenta pysähtyy ja irtoaa ui:sta
  // (js/luenta.js stopDiaryVoice peruu myös odottavan kortin paluun).
  const { stopDiaryVoice } = await import('/js/luenta.js');
  stopDiaryVoice(ui);
});
vaadi('luenta ei ole enää kesken', (await lue()).luentaKesken === false);

await raahaa();
tila = await lue();
vaadi('kortti kutistuu myös luennan jälkeen', tila.pieni === true, JSON.stringify(tila));
await sivu.waitForTimeout(PALUUN_ODOTUS_MS * 2);
tila = await lue();
vaadi('kortti JÄÄ lapuksi luennan jälkeen', tila.pieni === true, JSON.stringify(tila));
await kaappaa('matkakirjakortti-luennan-jalkeen.png');

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await ctx.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
