/*
 * Savuke: LIFTAUKSEN NOPANHEITTO EI ZOOMAA MAAILMAKUVAAN — eri ajoituksilla.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-liftaus-ajoitus.mjs [--kuvat <kansio>]
 *
 * OMISTAJA (v1983 työpöytä, 20.9.2026, kaappaus docs/raportit/kaappaukset/
 * omistaja-20260920/liftaus-zoomasi-pallolle-v1983.webp): Pariisista
 * liftatessa nopan heiton jälkeen näkymä hyppäsi koko pallolle; *"ei
 * ollut zoomannut ennen noppaa; kartta hyppäsi yhtäkkiä äärimmäisen
 * kauas; ei toistu joka kerta"*. Yksi ajo (Liiku → Liftaus → noppa 3
 * rauhassa) ei toistanut vikaa (0,205 → 0,217), joten tämä savuke ajaa
 * saman heiton ERI AJOITUKSILLA ja vartioi kameran korkeutta jokaisessa.
 *
 * MITATTU JUURISYY (20.9.2026, tämä savuke, kaikki viisi ajoitusta):
 * `sovitaSiirtokohteet` → `matkaZoomivapaus(true)` → lauta.js
 * `matkaZoomirajat` nostaa katon 0,205 → 2,5, ja `tahdistaZoomirajat`in
 * `kattoPuristus`-muisti PALAUTTI kameran koko pallolle (`pointOfView`
 * altitude 2,5, ms 0) — ei yhtään `ajaKamera`-kutsua. Sama vika kuin
 * `paivita`n korostusmaa-haarassa (PAATOKSET 40), eri ovi; korjaus
 * nollaa muistin myös matkan vapautuksessa. Ennen korjausta 5/10
 * (kaikki ajoitukset 2,5), jälkeen 10/10. Vartio pitää kaikki ajoitukset,
 * koska omistajan mukaan vika *"ei toistu joka kerta"*: tulevat ovet
 * jäävät kiinni samaan lokiin.
 *
 * SAVUKE_DEBUG=1 kirjaa pointOfView-kutsut (korkeus > 1) pinoineen ja
 * ajaKamera-kutsut; SAVUKE_DEBUG=2 lisäksi korkeuden 12 s ajan.
 *
 * VÄITTEET: jokaisen ajoituksen jälkeen (2 s asettumisen jälkeen) kameran
 * korkeus on alle KORKEUSKATTO (maailmakuva on ~2,5, maan saapumisnäkymä
 * 0,2–0,35) ja nappula on ruudulla. Vartio kirjaa korkeuden jokaisesta
 * ajoituksesta myös INFO-rivinä, jotta harvinainenkin hyppy jää lokiin.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA. Ilman ämpäriä OHITETAAN.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const KUVAT = argv.includes('--kuvat') ? argv[argv.indexOf('--kuvat') + 1] : (argv[0] && !argv[0].startsWith('--') ? argv[0] : null);
/** Maailmakuva alkaa tästä; maan näkymät ovat 0,2–0,6. */
const KORKEUSKATTO = 1.0;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
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
const lopeta = () => { palvelin.close(); console.log(`\n${lapi}/${kaikki} läpi`); process.exit(lapi === kaikki ? 0 : 1); };
const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' })).catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
if ((await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`))?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata');
  palvelin.close();
  process.exit(0);
}
/* Kuten omistajalla: Lontoosta Pariisiin, päivä 3. */
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action';
peli.player.pos = { type: 'city', city: 'pariisi' };
peli.visitCity?.(peli.player);
peli.tokens.delete('lontoo');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--disable-dev-shm-usage'] });

/** Avaa pelin Pariisiin; `ohitaKuvat` = painaa Ohita-nappia heti kun se ilmestyy. */
async function avaa(ohitaKuvat) {
  const ctx = await selain.newContext({ viewport: { width: 2000, height: 1300 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
      localStorage.setItem('matkakirja-reittiverkko', '1');
    } catch { /* yksityinen selaus */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  sivu.setDefaultTimeout(120000);
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  if (ohitaKuvat) {
    await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  }
  return { ctx, sivu, virheet };
}
const pov = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta; const p = l.pallo.pointOfView();
  return { alt: +p.altitude.toFixed(3), phase: window.matkakirja.game.phase, die: window.matkakirja.game.die ?? null };
});
/** Heitto pelin omalla reitillä (kuten savuke-liftaus-reitit): noppa lukittu. */
const heita = (sivu, die) => sivu.evaluate((silmaluku) => {
  const { ui, game } = window.matkakirja;
  game.phase = 'roll'; game.travelMode = 'land'; game.die = null; game.moves = new Map();
  game.rollDie = () => silmaluku;
  game.actionRoll();
  ui.matkaSessio = game.cityOf()?.id ?? null;
  ui.matkareittiAvain = null;
  ui.paivitaMatkareitit();
  ui.pallolauta.paivita?.();
  ui.sovitaSiirtokohteet?.();
}, die);
/** Nappula ruudulla? (sama mitta kuin savuke-noppa-saapumisen-aikana) */
const nappulaRuudulla = (sivu) => sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  const pos = game.player?.pos; if (pos?.type !== 'city') return null;
  const c = game.board.cityById.get(pos.city);
  const l = ui.pallolauta; const a = l.asteet?.({ x: c.x, y: c.y }) ?? null; if (!a) return null;
  const s = l.pallo.getScreenCoords(a.lat, a.lon);
  return s.x >= 0 && s.y >= 0 && s.x <= innerWidth && s.y <= innerHeight;
});
const kuvaan = async (sivu, nimi) => { if (!KUVAT) return; mkdirSync(KUVAT, { recursive: true }); writeFileSync(join(KUVAT, `${nimi}.png`), await sivu.screenshot()); };

const AJOITUKSET = [
  { nimi: 'rauhassa (kuvat ohitettu, 4 s)', ohita: true, odota: 4000, heitot: [3] },
  { nimi: 'heti saapumisen jälkeen (0 s)', ohita: true, odota: 0, heitot: [3] },
  { nimi: 'kesken saapumistrailerin (kuvia ei ohiteta, 1,5 s)', ohita: false, odota: 1500, heitot: [3] },
  { nimi: 'kaksi nopeaa heittoa peräkkäin (300 ms väli)', ohita: true, odota: 4000, heitot: [3, 6], vali: 300 },
  { nimi: 'heitto kesken edellisen sovituksen (kuutonen, 120 ms väli)', ohita: true, odota: 4000, heitot: [6, 2], vali: 120 },
];
for (const a of AJOITUKSET) {
  // eslint-disable-next-line no-await-in-loop
  const { ctx, sivu, virheet } = await avaa(a.ohita);
  /* eslint-disable no-await-in-loop */
  await sivu.waitForTimeout(a.odota);
  if (process.env.SAVUKE_DEBUG) await sivu.evaluate(() => {
    const pallo = window.matkakirja.ui.pallolauta.pallo; const alkupPov = pallo.pointOfView.bind(pallo); window.__povit = [];
    pallo.pointOfView = (p, ms) => { if (p && p.altitude > 1) window.__povit.push({ alt: +p.altitude.toFixed(2), ms, pino: new Error().stack.split('\n').slice(2, 7).map((r) => r.trim().replace(/^at /, '').slice(0, 70)) }); return p === undefined ? alkupPov() : alkupPov(p, ms); };
    const ui = window.matkakirja.ui; const k = ui.kamera(); window.__ajot = [];
    const alkup = k.ajaKamera.bind(k);
    k.ajaKamera = (kohde, asetukset) => { window.__ajot.push({ kohde, asetukset, alt: +ui.pallolauta.pallo.pointOfView().altitude.toFixed(3), pino: new Error().stack.split('\n').slice(2, 5).map((r) => r.trim().slice(0, 60)) }); return alkup(kohde, asetukset); };
  });
  const ennen = await pov(sivu);
  for (let i = 0; i < a.heitot.length; i += 1) {
    await heita(sivu, a.heitot[i]);
    if (i + 1 < a.heitot.length) await sivu.waitForTimeout(a.vali ?? 300);
  }
  await sivu.waitForTimeout(2500);
  if (process.env.SAVUKE_DEBUG === '2') { for (let s = 0; s < 8; s += 1) { await sivu.waitForTimeout(1500); tieto(`  t+${(s + 1) * 1.5 + 2.5} s`, JSON.stringify(await pov(sivu))); } }
  const jalkeen = await pov(sivu);
  const nappula = await nappulaRuudulla(sivu);
  tieto(a.nimi, `korkeus ${ennen.alt} → ${jalkeen.alt}, vaihe ${jalkeen.phase}, noppa ${jalkeen.die}, nappula ruudulla ${nappula}`);
  if (process.env.SAVUKE_DEBUG) tieto('  ajot', JSON.stringify(await sivu.evaluate(() => ({ ajot: window.__ajot, povit: window.__povit.slice(0, 3) }))));
  vaadi(`${a.nimi}: kamera ei hyppää maailmakuvaan`, jalkeen.alt < KORKEUSKATTO, `korkeus ${jalkeen.alt}`);
  vaadi(`${a.nimi}: nappula on ruudulla`, nappula !== false, String(nappula));
  if (virheet.length) tieto(`${a.nimi}: sivuvirheet`, virheet.slice(0, 2).join(' | '));
  await kuvaan(sivu, `liftaus-${AJOITUKSET.indexOf(a) + 1}`);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}
await selain.close();
lopeta();
