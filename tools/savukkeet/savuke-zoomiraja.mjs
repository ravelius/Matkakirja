/*
 * Savuke: MAAN ULOSZOOMAUSRAJA PITÄÄ RULLALLA, NIPISTYKSELLÄ JA
 * WEBKITIN GESTURE-ELEILLÄ (Fable 21.9.2026 ilta, omistajan Safari-havainto
 * "nostot puuttuvat": kamera näytti päässeen maan zoomikaton
 * (js/pallolauta/lauta.js maanZoomiraja ← js/pallolauta/kamera.js
 * uloszoomausRaja) ohi, jolloin nostot putoavat pisteiksi).
 *
 * MITÄ VARTIOIDAAN. Kohdemaan (Ranska) näkymässä JOKAINEN korkeuden
 * kirjoituspolku päätyy OrbitControlsin maxDistanceen, joka on laudan
 * tahdistaZoomirajat-funktion asettama katto:
 *   1. ctrl+rulla (Windows, Chromiumin trackpad-nipistys) — js/pallo.js
 *      wheel-käsittelijä → zoominLiuku → asetaZoomi → korkeusrajat;
 *   2. cmd+rulla (Mac) — sama polku;
 *   3. kahden sormen nipistys pointer-tapahtumina (sormet lähemmäs =
 *      loitonnus) — js/pallo.js pointermove → asetaZoomi;
 *   4. WebKitin gesturestart/gesturechange/gestureend (scale 1 → 0,2) —
 *      pallo EI kuuntele näitä; vartioidaan, ettei kukaan lisää niille
 *      omaa rajatonta polkua;
 *   5. suora pointOfView(altitude 1,2) ohi kaikkien polkujen — OrbitControls
 *      leikkaa sen seuraavassa update()-vaiheessa.
 * Jokaisen jälkeen korkeus == katto (±1e-3), nostot eivät putoa pisteiksi
 * (kuvamerkkejä sama määrä kuin saapumisessa) eikä sivulla ole virheitä.
 *
 * MITATTU 21.9.2026 (Karttaseppä, Mac Studio, main v2004): WebKit ja
 * Chromium 1000×650 dpr 2, Pariisi ja Marseille (tallennettu peli päivä 4):
 * katto 0,2049, kaikki viisi polkua palaavat 0,2049:ään, nostot 69/69.
 * Omistajan näkymä (Ranska 40 % leveydestä, Britannia näkyvissä) ei synny
 * näillä poluilla — jäljelle jää katon nostaminen (lauta.js asetaAjonKatto,
 * matkallaVapaana, linssin syrjäytys, maailmatila).
 *
 * Ajo: SELAIMET=webkit,chromium (oletus) tai --webkit / --chromium;
 * --kuvat <kansio>; RUUTU=1000x650 (oletus omistajan Safari-ikkuna).
 * WebKitin puuttuminen ei kaada: kyseinen selain ohitetaan viestillä.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const argv = process.argv.slice(2);
const KUVAT = argv.includes('--kuvat') ? argv[argv.indexOf('--kuvat') + 1] : null;
const SELAIMET = argv.includes('--webkit') ? ['webkit'] : argv.includes('--chromium') ? ['chromium']
  : (process.env.SELAIMET ?? 'webkit,chromium').split(',');
const [RW, RH] = (process.env.RUUTU ?? '1000x650').split('x').map(Number);
const KAUPUNKI = process.env.KAUPUNKI ?? 'marseille';
const JUURI = new URL('../..', import.meta.url).pathname;
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
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK   ' : 'FAIL '} ${nimi}${lisa ? ` — ${lisa}` : ''}`);
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
/* Tallennettu peli kuten omistajalla: päivä 4, Marseille (vuoro 13 = 72 h). */
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action';
peli.player.pos = { type: 'city', city: KAUPUNKI };
peli.visitCity?.(peli.player);
peli.tokens.delete('lontoo');
peli.turnCount = 13;
const tallenne = JSON.stringify(peli.toJSON());

/** Kameran ja nostokerroksen tila yhdellä lukemalla. */
const tila = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const g = l.pallo;
  const pov = g.pointOfView();
  const ohj = g.controls();
  const R = g.getGlobeRadius();
  const kuori = l.kuori ?? document;
  const merkit = [...kuori.querySelectorAll('.pallolauta-nosto')];
  // Nostot ovat 21.9.2026 lähtien GL-rungolla (DOM 0): rungon näkyvät
  // ikonit lasketaan nostomerkeiksi. Pisteiksi putoaminen (zoomikaton
  // ohi) näkyy rungolla nostojen katoamisena, joten määrä vartioi samaa.
  const gl = (l.glSovitin?.()?.nostotRungolla?.() ?? []).filter((i) => i.tunnus.endsWith('#ikoni') && i.opacity > 0).length;
  return {
    alt: pov.altitude,
    katto: ohj.maxDistance / R - 1,
    dom: merkit.length + gl,
    kuvamerkit: merkit.filter((e) => e.querySelector('image, use')).length + gl,
    nimioNakyy: l.nostot?.osumat?.().filter((o) => o.nimioNakyy).length ?? null,
  };
});
const kankaanKeskus = (sivu) => sivu.evaluate(() => {
  const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
  const r = k.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
/** Rulla modifier pohjassa: `askelia` × 240 px ulospäin. */
async function rullaa(sivu, modifier, askelia = 10) {
  const k = await kankaanKeskus(sivu);
  await sivu.mouse.move(k.x, k.y);
  await sivu.keyboard.down(modifier);
  for (let i = 0; i < askelia; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.mouse.wheel(0, 240);
    await sivu.waitForTimeout(120);
    /* eslint-enable no-await-in-loop */
  }
  await sivu.keyboard.up(modifier);
  await sivu.waitForTimeout(2000);
}
/** Nipistys pointer-tapahtumina kotelon kankaalle: sormet 300 px → 60 px (loitonnus). */
const nipista = (sivu) => sivu.evaluate(async () => {
  const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
  const r = k.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const laheta = (tyyppi, id, x, y) => k.dispatchEvent(new PointerEvent(tyyppi, {
    bubbles: true, cancelable: true, pointerId: id, pointerType: 'touch', isPrimary: id === 1, clientX: x, clientY: y,
  }));
  laheta('pointerdown', 1, cx - 150, cy);
  laheta('pointerdown', 2, cx + 150, cy);
  for (let d = 145; d >= 30; d -= 5) {
    laheta('pointermove', 1, cx - d, cy);
    laheta('pointermove', 2, cx + d, cy);
    /* eslint-disable no-await-in-loop */
    await new Promise((v) => setTimeout(v, 25));
    /* eslint-enable no-await-in-loop */
  }
  laheta('pointerup', 1, cx - 30, cy);
  laheta('pointerup', 2, cx + 30, cy);
  await new Promise((v) => setTimeout(v, 1500));
});
/** WebKitin gesture-ele (scale 1 → 0,2). Chromiumissa GestureEventiä ei ole → 'ei tuettu'. */
const gesture = (sivu) => sivu.evaluate(async () => {
  if (typeof GestureEvent === 'undefined') return 'ei tuettu';
  const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
  const r = k.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  // WebKit ei anna rakentaa GestureEventiä `new`:llä; sama tapahtuma
  // Event-luokasta ominaisuuksineen kelpaa kuuntelijoille.
  const tee = (t, scale) => {
    const e = new Event(t, { bubbles: true, cancelable: true });
    Object.defineProperties(e, {
      scale: { value: scale }, rotation: { value: 0 }, clientX: { value: x }, clientY: { value: y },
    });
    k.dispatchEvent(e);
  };
  tee('gesturestart', 1);
  for (let s = 0.95; s > 0.2; s -= 0.05) {
    tee('gesturechange', s);
    /* eslint-disable no-await-in-loop */
    await new Promise((v) => setTimeout(v, 30));
    /* eslint-enable no-await-in-loop */
  }
  tee('gestureend', 0.2);
  await new Promise((v) => setTimeout(v, 1500));
  return 'lähetetty';
});
const suoraan = (sivu) => sivu.evaluate(async () => {
  const g = window.matkakirja.ui.pallolauta.pallo;
  const p = g.pointOfView();
  g.pointOfView({ lat: p.lat, lng: p.lng, altitude: 1.2 }, 0);
  await new Promise((v) => setTimeout(v, 1500));
});

for (const nimi of SELAIMET) {
  /* eslint-disable no-await-in-loop */
  const tyyppi = paketti[nimi] ?? paketti.default?.[nimi];
  let selain;
  try {
    selain = await tyyppi.launch(nimi === 'chromium'
      ? { executablePath: process.env.CHROMIUM || process.env.PW_CHROMIUM || undefined, args: ['--disable-dev-shm-usage'] } : {});
  } catch (e) {
    console.log(`OHITUS  ${nimi} ei käynnisty (${String(e.message ?? e).split('\n')[0]}) — npx playwright install ${nimi}`);
    continue;
  }
  const ctx = await selain.newContext({ viewport: { width: RW, height: RH }, deviceScaleFactor: 2, serviceWorkers: 'block' });
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
  // Synteettisillä pointer-tapahtumilla (nipistys) ei ole selaimen
  // osoitinta, joten OrbitControlsin releasePointerCapture heittää —
  // savukkeen oma artefakti, ei pelin vika.
  sivu.on('pageerror', (e) => { const t = String(e.message ?? e); if (!/PointerCapture|can not be found here/i.test(t)) virheet.push(t); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(9000);
  const kuvaan = async (n) => { if (!KUVAT) return; mkdirSync(KUVAT, { recursive: true }); writeFileSync(join(KUVAT, `${nimi}-${n}.png`), await sivu.screenshot()); };
  const alku = await tila(sivu);
  await kuvaan('saapuminen');
  tieto(`${nimi} saapuminen`, `korkeus ${alku.alt.toFixed(4)}, katto ${alku.katto.toFixed(4)}, kuvamerkkejä ${alku.kuvamerkit}/${alku.dom}, nimiöitä ${alku.nimioNakyy}`);
  vaadi(`${nimi}: saapuminen on katossa`, Math.abs(alku.alt - alku.katto) < 1e-3);
  vaadi(`${nimi}: saapumisessa nostot kuvamerkkeinä`, alku.kuvamerkit > 0 && alku.kuvamerkit === alku.dom, `${alku.kuvamerkit}/${alku.dom}`);
  const polut = [
    ['ctrl+rulla ulos', () => rullaa(sivu, 'Control')],
    ['cmd+rulla ulos', () => rullaa(sivu, 'Meta')],
    ['nipistys (sormet lähemmäs)', () => nipista(sivu)],
    ['gesturechange scale 0,2', () => gesture(sivu)],
    ['suora pointOfView 1,2', () => suoraan(sivu)],
  ];
  for (const [otsikko, aja] of polut) {
    const tulos = await aja();
    const t = await tila(sivu);
    await kuvaan(otsikko.split(' ')[0].replace(/[^a-z]/g, ''));
    if (tulos === 'ei tuettu') { tieto(`${nimi} ${otsikko}`, 'ei GestureEventiä — ohitettu'); continue; }
    vaadi(`${nimi}: ${otsikko} → korkeus katossa`, Math.abs(t.alt - t.katto) < 1e-3 && Math.abs(t.katto - alku.katto) < 1e-3,
      `korkeus ${t.alt.toFixed(4)}, katto ${t.katto.toFixed(4)}`);
    vaadi(`${nimi}: ${otsikko} → nostot eivät putoa pisteiksi`, t.kuvamerkit === alku.kuvamerkit, `${t.kuvamerkit}/${t.dom}`);
  }
  vaadi(`${nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await selain.close();
  /* eslint-enable no-await-in-loop */
}
lopeta();
