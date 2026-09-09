/*
 * Savuke: ETSI AARRE -NAPPI KAUPUNGIN LAATAN VIERESSÄ.
 *
 * Omistaja 9.9.2026 (Raamattu, PULUN KOMMENTIN JALKEEN KARTALLE NAPPI
 * "ETSI AARRE" ...), sanatarkasti: *"kun pulun kommentti on tullut,
 * kartalle saisi tulla kaupungin laatan viereen nappi: Etsi aarre,
 * mikä avaisi kaupunkilehden."*
 *
 * VARTIOT:
 *   1. EI NAPPIA ENNEN KOMMENTTIA: saapumisen ja luennan aikana
 *      kartalla ei ole .etsi-aarre-nappia.
 *   2. KOMMENTIN JÄLKEEN NAPPI: kupla ruudulle → nappi ilmestyy, ja
 *      siinä lukee "Etsi aarre".
 *   3. NAPPI ON LAATAN VIERESSÄ: napin keskipiste on kaupungin pisteen
 *      oikealla puolella ja alapuolella, muutaman kymmenen pikselin
 *      päässä — ei pisteen eikä nimen päällä.
 *   4. PAINALLUS AVAA KAUPUNKILEHDEN ja nappi väistyy.
 *
 * Aja:  node tools/savukkeet/savuke-etsi-aarre.mjs [kuvakansio] [lauta]
 *       lauta = pallo (oletus) | kartta
 *
 * TASOKARTTA ON OHITUKSESSA (js/ui-apurit.js VANHA_KARTTA_KAYTOSSA =
 * false, omistaja 7.9.2026): `lauta=kartta` toimii vain, jos vakio on
 * käännetty tilapäisesti todeksi. Muuten savuke ajetaan pallolla.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
const LAUTA = process.argv[3] === 'kartta' ? 'kartta' : 'pallo';
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'lontoo';
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
const osoite = `http://localhost:${palvelin.address().port}/?lauta=${LAUTA}`;

/*
 * ÄMPÄRI NODEN KAUTTA. Selaimessa ei ole ulkoverkkoa, ja pallolauta
 * tarvitsee globe.gl-kirjaston sekä laatat media.matkakirja.appista —
 * ilman niitä ruudulla lukee vain "Ladataan karttapalloa...". Sama
 * välitys kuin savuke-pallolaudassa: pyyntö haetaan Nodella ja
 * täytetään CORS-otsakkeella.
 */
const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (LAUTA === 'pallo' && kirjasto?.status !== 200) {
  console.log('HUOM  ämpäri ei vastaa — pallo ei lataudu');
}

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Tallenne: Fogg Ateenassa, peli käynnissä. */
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
    // Avaus ja tuurauspaljastus on nähty: tämä savuke mittaa nappia,
    // ei ensisaapumisen kertasarjoja (js/livia.js).
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);

const sivu = await ctx.newPage();
/*
 * KAAPPAUS CDP:LLÄ, EI page.screenshotilla. Pallolauta piirtää itseään
 * kehyksittäin, ja Playwrightin oma kaappaus jää odottamaan vakaata
 * ruutua ("waiting for fonts to load…") kunnes aikakatkaisu laukeaa.
 * Page.captureScreenshot ottaa kuvan sellaisena kuin ruutu on.
 */
const cdp = await ctx.newCDPSession(sivu);
const kaappaa = async (nimi) => {
  if (!KUVAKANSIO) return;
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(KUVAKANSIO, nimi), Buffer.from(data, 'base64'));
};
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
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
if (LAUTA === 'pallo') {
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
    .catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
}
await sivu.waitForTimeout(6000);

/* Saapuminen kaupunkiin pelin omalla tilalla — sama kytkentä kuin
 * renderFactissa (js/ui.js), joten kulku alkaa kuten pelaajalla. */
await sivu.evaluate((id) => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: id };
  game.world.visited.add(id);
  game.arrivalFact = { packId: game.pack.id, cityId: id };
  ui.render();
  // Kamera kaupungin päälle, jotta laatta ja nappi ovat ruudussa.
  const kaupunki = game.cityOf();
  ui.kamera?.()?.ajaKamera?.({ x: kaupunki.x, y: kaupunki.y, leveys: 900 },
    { kesto: 900, sovita: true });
}, KAUPUNKI);
await sivu.waitForTimeout(2500);

/** Napin ja kuplapinon tila yhdellä lukemalla. */
const lue = () => sivu.evaluate(() => {
  const nappi = document.querySelector('.etsi-aarre-nappi');
  const ankkuri = document.querySelector('.etsi-aarre-ankkuri');
  return {
    nappi: nappi ? (nappi.textContent ?? '').trim() : null,
    nakyy: Boolean(ankkuri?.classList.contains('nakyy')),
    laatikko: nappi ? nappi.getBoundingClientRect().toJSON() : null,
    pino: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
      .map((k) => k.textContent ?? '').join(' ').trim(),
    luenta: Boolean(window.matkakirja.ui.diaryVoice),
  };
});

/* 1. Ei nappia ennen kommenttia. */
let tila = await lue();
tieto('saapumisen hetki', JSON.stringify({ nappi: tila.nappi, luenta: tila.luenta }));
vaadi('kartalla ei ole nappia ennen kommenttia', tila.nappi === null,
  JSON.stringify(tila).slice(0, 200));
await kaappaa(`etsi-aarre-${LAUTA}-ennen.png`);

/* 2. Luenta pois kuten kuuntelunapista, ja kommentti sen jälkeen. */
await sivu.evaluate(() => { window.matkakirja.ui.diaryVoice?.pause(); });
for (let i = 0; i < 200; i += 1) {
  tila = await lue();
  if (tila.nappi) break;
  await sivu.waitForTimeout(200);
}
// Nousu on css-siirtymä (nakyy-luokka seuraavassa kehyksessä): luetaan
// tila vasta sen jälkeen, ettei mitata puolivalmista kehystä.
await sivu.waitForTimeout(800);
tila = await lue();
tieto('kuplapino', tila.pino.slice(-160) || '(tyhjä)');
vaadi('pulun kommentti tuli ruudulle', tila.pino.length > 0, '(pino jäi tyhjäksi)');
vaadi('nappi ilmestyy kommentin jälkeen', tila.nappi === 'Etsi aarre',
  JSON.stringify(tila.nappi));
vaadi('nappi on noussut näkyviin', tila.nakyy === true, JSON.stringify(tila.nakyy));

/* 3. Nappi on laatan vieressä: pisteen oikealla ja alapuolella. */
const paikka = await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  const kaupunki = game.cityOf();
  const alue = ui.nakyvaAlue();
  const pane = ui.mapPane.getBoundingClientRect();
  const keskus = { x: alue.x + alue.w / 2, y: alue.y + alue.h / 2 };
  return {
    piste: {
      x: pane.left + pane.width / 2 + (kaupunki.x - keskus.x) * alue.skaala,
      y: pane.top + pane.height / 2 + (kaupunki.y - keskus.y) * alue.skaala,
    },
    nappi: document.querySelector('.etsi-aarre-nappi')?.getBoundingClientRect().toJSON() ?? null,
    ruutu: { w: pane.width, h: pane.height },
  };
});
if (paikka.nappi) {
  const dx = paikka.nappi.x - paikka.piste.x;
  const dy = paikka.nappi.y - paikka.piste.y;
  tieto('napin siirtymä pisteestä', `dx ${Math.round(dx)} px, dy ${Math.round(dy)} px`);
  vaadi('nappi on pisteen oikealla puolella', dx > 4, `dx ${Math.round(dx)}`);
  vaadi('nappi on pisteen alapuolella', dy > 0, `dy ${Math.round(dy)}`);
  vaadi('nappi on lähellä laattaa', Math.hypot(dx, dy) < 120,
    `etäisyys ${Math.round(Math.hypot(dx, dy))} px`);
}
await kaappaa(`etsi-aarre-${LAUTA}.png`);

/* 4. Painallus avaa kaupunkilehden ja nappi väistyy. */
await sivu.click('.etsi-aarre-nappi');
await sivu.waitForTimeout(1500);
const jalkeen = await sivu.evaluate(() => ({
  nappi: document.querySelector('.etsi-aarre-nappi')?.textContent ?? null,
  lehti: Boolean(document.querySelector('#arrival-dialog[open], dialog[open] .lehti-sivu')
    || document.querySelector('dialog[open]')),
}));
tieto('painalluksen jälkeen', JSON.stringify(jalkeen));
vaadi('nappi väistyy painalluksesta', jalkeen.nappi === null, JSON.stringify(jalkeen.nappi));
vaadi('painallus avasi näkymän', jalkeen.lehti === true, JSON.stringify(jalkeen));
await kaappaa(`etsi-aarre-${LAUTA}-lehti.png`);

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi (lauta: ${LAUTA}).`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
