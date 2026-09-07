/*
 * Savuke: KAUPUNGIN KULKU — PULU, LUENTA, PULU (ei kuvia).
 *
 * Omistajan linjaus 7.9.2026 (Raamattu, "KAUPUNGIN KULKU: EI KUVIA,
 * PULU - LUENTA - PULU"): saapuminen on kolme hetkeä. Ensin pulun
 * ALUSTUS yhtenä kuplana, sitten isoisän LUENTA — jonka aikana pulu
 * huutaa enintään yhden lyhyen välihuudon tarkasti nimettyyn kohtaan —
 * ja lopuksi pulun KOMMENTTI yhtenä tai kahtena kuplana. Kuvia ei
 * näytetä: ne kuuluvat kaupunkilehteen.
 *
 * MITTAKAUPUNKI ON BUDAPEST. Se on uuden kulun kaupunki, jonka
 * matkakirjamerkinnässä huudahduksen kohta ("Kartantekijöille riittää
 * töitä") on keskellä tekstiä — eli välihuuto ei voi osua kohdalleen
 * vahingossa heti alussa tai lopussa.
 *
 * VARTIOT:
 *   1. ALUSTUS ENNEN LUENTAA: kuplassa lukee alustusteksti, eikä
 *      matkakirjan luenta ole vielä alkanut (ui.diaryVoice on tyhjä tai
 *      soittamatta).
 *   2. LUENTA LÄHTEE ALUSTUKSEN JÄLKEEN: ui.diaryVoice on olemassa.
 *   3. VÄLIHUUTO LUENNAN AIKANA: .fokusvirta-huudahdus ilmestyy ja
 *      siinä lukee pakkauksen huudahdusteksti.
 *   4. KOMMENTTI LUENNAN JÄLKEEN: molemmat kommenttikuplat ovat
 *      pinossa luennan päätyttyä.
 *   5. EI KUVAA: matkakirjakortilla ei ole valokuvaa.
 *
 * Aja:  node tools/savukkeet/savuke-pulun-kulku.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_BUDAPEST } from '../../js/packs/fokusvirta-budapest.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUTU = { width: 1280, height: 860 };

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
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const ALUSTUS = FOKUSVIRTA_BUDAPEST.pollo.alustus;
const HUUDAHDUS = FOKUSVIRTA_BUDAPEST.pollo.huudahdus.teksti;
const KOMMENTIT = FOKUSVIRTA_BUDAPEST.pollo.kommentti;

/* Tallenne: Fogg Ateenassa, ensimmäinen laatta käännetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: RUUTU, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Avaus ja tuurauspaljastus on nähty: tämä savuke mittaa KAUPUNGIN
    // kulkua, ei ensisaapumisen kertasarjoja (js/livia.js).
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);

const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());

await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(2000);

/* Saapuminen Budapestiin pelin omalla tilalla — sama kytkentä kuin
 * renderFactissa (js/ui.js), joten kulku alkaa kuten pelaajalla. */
await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'budapest' };
  game.world.visited.add('budapest');
  game.arrivalFact = { packId: game.pack.id, cityId: 'budapest' };
  ui.render();
});

/** Kuplapinon teksti ja välihuudon tila yhdellä lukemalla. */
const lue = () => sivu.evaluate(() => ({
  pino: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
    .map((k) => k.textContent ?? '').join(' '),
  huudahdus: document.querySelector('.fokusvirta-huudahdus')?.textContent ?? '',
  luenta: Boolean(window.matkakirja.ui.diaryVoice),
  luennanAika: window.matkakirja.ui.diaryVoice?.currentTime ?? 0,
  kuva: Boolean(document.querySelector('.fact-valokuva:not([hidden])')),
}));

/* 1. Alustus ennen luentaa. */
let tila = null;
for (let i = 0; i < 40; i += 1) {
  tila = await lue();
  if (tila.pino.includes(ALUSTUS.slice(0, 24))) break;
  await sivu.waitForTimeout(300);
}
tieto('alustuksen hetki', JSON.stringify(tila));
vaadi('alustus tulee kuplaan ennen luentaa',
  tila.pino.includes(ALUSTUS.slice(0, 24)) && tila.luennanAika === 0,
  JSON.stringify(tila).slice(0, 200));
vaadi('matkakirjakortilla ei ole kuvaa', tila.kuva === false, JSON.stringify(tila.kuva));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '1-alustus.png') });

/* 2. Luenta lähtee alustuksen jälkeen. */
for (let i = 0; i < 60; i += 1) {
  tila = await lue();
  if (tila.luenta) break;
  await sivu.waitForTimeout(300);
}
vaadi('isoisän luenta lähtee alustuksen jälkeen', tila.luenta === true, JSON.stringify(tila));

/* 3. Välihuuto luennan aikana. */
let huuto = '';
for (let i = 0; i < 80; i += 1) {
  const nyt = await lue();
  if (nyt.huudahdus) { huuto = nyt.huudahdus; break; }
  await sivu.waitForTimeout(300);
}
vaadi('välihuuto ilmestyy luennan aikana', huuto.includes(HUUDAHDUS), huuto || '(ei tullut)');
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '2-huudahdus.png') });

/* 4. Kommentti luennan jälkeen: luenta katkaistaan kuten pelaaja
 *    tekisi kuuntelunapista, ja kommentti tulee sen päätyttyä. */
await sivu.evaluate(() => { window.matkakirja.ui.diaryVoice?.pause(); });
let pino = '';
for (let i = 0; i < 60; i += 1) {
  pino = (await lue()).pino;
  if (pino.includes(KOMMENTIT.at(-1).slice(0, 24))) break;
  await sivu.waitForTimeout(400);
}
tieto('pino luennan jälkeen', pino.slice(-220));
vaadi('kommentti tulee luennan jälkeen kupliin',
  KOMMENTIT.every((k) => pino.includes(k.slice(0, 24))), pino.slice(-220));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '3-kommentti.png') });

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
