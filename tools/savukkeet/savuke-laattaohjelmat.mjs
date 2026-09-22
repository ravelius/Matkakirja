/*
 * SAVUKE: LAATTAKERROKSEN OHJELMAT LINKITTYVÄT JA LAATTA PIIRTYY.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-laattaohjelmat.mjs [--webkit]
 *   (SAVUKE_MOOTTORI=webkit|chromium; sarjat.json ajaa molemmat rivit)
 *
 * === MIKSI ==========================================================
 *
 * v2084 (kerma laatan shaderissa) meni tuotantoon niin, että kerma-
 * shaderin fragmentti EI KÄÄNTYNYT (viittasi `vUv`:hen, jota three
 * r155:ssä ei ole): ohjelma ei linkittynyt, three ei kirjannut virhettä
 * konsoliin, ja laattakerroksen laatat jäivät piirtymättä — pelaaja näki
 * kirjaston sumean z5-pohjan. Kaikki savukkeet olivat vihreitä, koska ne
 * mittasivat pikseleitä, joissa pohja peitti aukon. Fable 22.9.2026:
 * vartija, joka lukee LAATTAKERROKSEN laatan pikselin (ei pohjan) ja
 * tarkistaa ohjelmien linkityksen — CI:ssä WebKit + Chromium.
 *
 * === VÄITTEET =======================================================
 *
 *   V1  JOKAINEN OHJELMA LINKITTYY: three:n renderer.info.programs —
 *       gl.getProgramParameter(LINK_STATUS) on tosi kaikille, myös
 *       kaikille laattamateriaalivarianteille (cacheKey 'laattakerma').
 *       Punaisella tulostetaan kääntäjän loki.
 *   V2  KERMA-OHJELMIA ON: vähintään yksi ohjelma, jonka avaimessa on
 *       'laattakerma' (muuten shaderipolku ei ole edes käytössä).
 *   V3  LAATTAKERROKSEN LAATTA PIIRTYY ILMAN POHJAA: kirjaston moottori
 *       (pohjapallo + z5) piilotetaan, kehys piirretään ja luetaan
 *       gl.readPixels näkyvien laattojen keskipisteistä — jokainen on
 *       peittävä (alfa 255) eikä musta. Pohja palautetaan.
 *   V4  LAATTA ON PÄÄLLIMMÄISENÄ: pohja näkyvissä, laattakerros piiloon
 *       → keskipikseli MUUTTUU (kerros oikeasti piirtyy pohjan päälle).
 *       Tieto, ei väite, jos pohja ja laatta sattuvat samaan sävyyn
 *       (ero < 6), muuten väite.
 */
import http from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const MOOTTORI = (process.argv.includes('--webkit') || process.env.SAVUKE_MOOTTORI === 'webkit')
  ? 'webkit' : 'chromium';
const moottori = paketti[MOOTTORI] ?? paketti.default?.[MOOTTORI];
const JUURI = new URL('../..', import.meta.url).pathname;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Ämpäri Noden kautta: CORS estää 127.0.0.1:n suoran haun. */
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
if (kirjasto?.status !== 200) {
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await (MOOTTORI === 'webkit'
  ? moottori.launch()
  : moottori.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--disable-dev-shm-usage'] }));
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  ...(MOOTTORI === 'webkit' ? {} : { isMobile: true }),
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try { localStorage.setItem('matkakirja-save-v1', data); localStorage.removeItem('matkakirja-lauta'); } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const konsoli = [];
sivu.on('console', (m) => { if (m.type() === 'error') konsoli.push(m.text().slice(0, 300)); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort().catch(() => {}); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  }).catch(() => {});
});

await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) { await ctx.close(); await selain.close(); palvelin.close(); process.exit(1); }
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  setInterval(() => {
    const ui = window.matkakirja?.ui;
    const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
    if (n) n.click();
  }, 150);
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
/* Ranska z8: kerros peittää koko ruudun, kun laatat ovat saapuneet. */
await sivu.evaluate(() => {
  window.matkakirja.ui.pallolauta.heraa?.();
  window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 46.5, lng: 2.5, altitude: 0.05 }, 0);
});
const peitti = await sivu.waitForFunction(() => {
  const k = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.();
  return k && k.peittoOsuus === 1 && k.hapyvia === 0 && k.nakyvia > 0;
}, null, { timeout: 60000 }).then(() => true).catch(() => false);
const mittarit = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {});
tieto('laattakerros', JSON.stringify({ taso: mittarit.taso, nakyvia: mittarit.nakyvia, scenessa: mittarit.scenessa, peitto: mittarit.peittoOsuus, hapyvia: mittarit.hapyvia, kokeet: mittarit.kokeet ?? [] }));
vaadi('laattakerros peittää Ranskan z8:n (laatat saapuivat)', peitti, JSON.stringify({ peitto: mittarit.peittoOsuus, hapyvia: mittarit.hapyvia }));
await sivu.waitForTimeout(500);

const tulos = await sivu.evaluate(() => {
  const pallo = window.matkakirja.ui.pallonInstanssi; const scene = pallo.scene(); const kam = pallo.camera();
  const r = pallo.renderer(); const gl = r.getContext();
  let moottori = null; scene.traverse((o) => { if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o; });
  const siisti = (s) => String(s ?? '').replace(/[^\x20-\x7e -￿]/g, '').trim();
  /* V1–V2: ohjelmat. */
  const ohjelmat = r.info.programs.map((p) => {
    const link = gl.getProgramParameter(p.program, gl.LINK_STATUS);
    const loki = link ? '' : [gl.getProgramInfoLog(p.program), gl.getShaderInfoLog(p.vertexShader), gl.getShaderInfoLog(p.fragmentShader)]
      .map(siisti).filter(Boolean).join(' | ').slice(0, 400);
    return { avain: String(p.cacheKey).slice(-40), kerma: /laattakerma/.test(String(p.cacheKey)), kaytto: p.usedTimes, link, loki };
  });
  /* V3: laatat ilman pohjaa — 3 × 3 ruudukko ruudulta (peitto = 1: joka kohdassa on laatta). */
  const laatat = []; scene.traverse((o) => { if (o.isMesh && o.material?.kermaUniformit) laatat.push(o); });
  const kohdat = [];
  for (const y of [-0.6, 0, 0.6]) for (const x of [-0.6, 0, 0.6]) kohdat.push({ x, y });
  const W = gl.drawingBufferWidth; const H = gl.drawingBufferHeight;
  const lue = (p) => { const px = new Uint8Array(4); gl.readPixels(Math.round((p.x + 1) / 2 * (W - 1)), Math.round((p.y + 1) / 2 * (H - 1)), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return [...px]; };
  const nakyvyys = moottori?.visible ?? null;
  if (moottori) moottori.visible = false;
  r.render(scene, kam);
  const ilmanPohjaa = kohdat.map(lue);
  if (moottori) moottori.visible = true;
  /* V4: pohja näkyvissä, kerros piiloon → ruudukon pikselit muuttuvat. */
  r.render(scene, kam); const kerroksella = kohdat.map(lue);
  const nakyvat = laatat.filter((t) => t.visible);
  for (const t of nakyvat) t.visible = false;
  r.render(scene, kam); const ilmanKerrosta = kohdat.map(lue);
  for (const t of nakyvat) t.visible = true;
  if (moottori) moottori.visible = nakyvyys;
  r.render(scene, kam);
  return { ohjelmat, laattoja: laatat.length, kohtia: kohdat.length, ilmanPohjaa, kerroksella, ilmanKerrosta, W, H };
});

const rikki = tulos.ohjelmat.filter((o) => !o.link);
tieto(`ohjelmia ${MOOTTORI}`, `${tulos.ohjelmat.length}, kerma-variantteja ${tulos.ohjelmat.filter((o) => o.kerma).length}, avaimet ${JSON.stringify(tulos.ohjelmat.filter((o) => o.kerma).map((o) => o.avain))}`);
vaadi(`V1 ${MOOTTORI}: jokainen ohjelma linkittyy (LINK_STATUS)`, rikki.length === 0,
  rikki.map((o) => `${o.avain}: ${o.loki}`).join(' ;; '));
vaadi(`V2 ${MOOTTORI}: kerma-shaderin ohjelma on käytössä`, tulos.ohjelmat.some((o) => o.kerma), 'ei laattakerma-avainta');
const musta = (px) => px[3] < 250 || (px[0] < 10 && px[1] < 10 && px[2] < 10);
const mustat = tulos.ilmanPohjaa.filter(musta);
vaadi(`V3 ${MOOTTORI}: laattakerroksen laatat piirtyvät ilman pohjaa (${tulos.kohtia} kohtaa, ${tulos.laattoja} laattaa)`,
  tulos.laattoja > 0 && mustat.length === 0,
  `laattoja ${tulos.laattoja}, mustia/läpinäkyviä ${mustat.length}/${tulos.kohtia}: ${JSON.stringify(tulos.ilmanPohjaa)}`);
const erot = tulos.kerroksella.map((a, i) => Math.max(...[0, 1, 2].map((k) => Math.abs(a[k] - tulos.ilmanKerrosta[i][k]))));
const ero = Math.max(...erot);
if (ero < 6) tieto(`V4 ${MOOTTORI}: pohja ja laatta samaa sävyä joka kohdassa (suurin ero ${ero}) — ei väite`, JSON.stringify(tulos.kerroksella));
else vaadi(`V4 ${MOOTTORI}: kerros on pohjan päällä (pikselit muuttuvat, suurin ero ${ero}, kohtia ${erot.filter((e) => e >= 6).length}/${tulos.kohtia})`, true);
if (konsoli.length) tieto('konsolivirheet', JSON.stringify(konsoli.slice(0, 3)));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} väitettä läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
