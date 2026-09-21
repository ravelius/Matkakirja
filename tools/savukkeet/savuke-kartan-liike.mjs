/*
 * SAVUKE: PIENI LIIKE KARTALLE (Fable 21.9.2026; js/kartta-liike.js).
 *
 * Pulu lentää harvoin kartan yli, pilven varjo liukuu reliefin päällä ja
 * kellonaika sävyttää kartan kevyesti — kytkin hampurilaisen Kartta-
 * ryhmässä (Pieni liike). Mitataan Pariisissa 390 ja 1400 px.
 *
 * VARTIOT:
 *   1. Kerros on laudalla, liike päällä oletuksena ja lauta levossa.
 *   2. Illan sävy: kun peli on illassa (turnCount → 'ilta'), sävykerros
 *      on lämmin ja näkyvissä; keskipäivällä sävy on pois.
 *   3. Pulu: lennätys onnistuu levossa, elementti on lennossa ja
 *      transform muuttuu; lento päättyy PULUN_LENTO_MS:n jälkeen.
 *   4. Kortti auki (nosto-popup-auki): lauta ei ole levossa, pilvi
 *      pysähtyy (animation-play-state paused) eikä pulu lähde.
 *   5. Kytkin pois (asetaLiike(false)): kerros ei ole päällä, pilvi ja
 *      sävy pois.
 *   6. Suorituskyky 390: kehysnopeus liikkeen kanssa ≥ 95 % ilman.
 *   7. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kartan-liike.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK  ' : 'FAIL'}  ${nimi}${ehto ? '' : ` — ${lisa}`}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400']).map((w) => (
  w === '390' ? { nimi: '390', width: 390, height: 844 } : { nimi: '1400', width: 1400, height: 900 }
));

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.removeItem('matkakirja-kartan-liike');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(async () => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: 'pariisi' };
    g.world.visited.add('pariisi');
    g.phase = 'action';
    ui.render();
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri')) el.remove();
    await new Promise((r) => setTimeout(r, 1500));
  });
  await sivu.waitForFunction(async () => {
    const m = await import('/js/laattapyramidi.js');
    return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka);
  }, null, { timeout: 60000 }).catch(() => {});
  await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .fokusvirta-lentokerros, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });
  await sivu.waitForTimeout(4000);

  const lueTila = () => sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const liike = l.liike?.();
    const kerros = l.kotelo.querySelector('.pallolauta-liike');
    const pilvi = kerros?.querySelector('.pallolauta-liike-pilvi');
    const savy = kerros?.querySelector('.pallolauta-liike-savy');
    const pulu = kerros?.querySelector('.pallolauta-liike-pulu');
    const cs = (el) => (el ? getComputedStyle(el) : null);
    return {
      kerros: Boolean(kerros),
      luokat: kerros ? [...kerros.classList] : [],
      tila: liike?.tila?.() ?? null,
      levossa: liike?.levossa?.() ?? null,
      pilviTila: cs(pilvi)?.animationPlayState ?? null,
      pilviPeitto: Number(cs(pilvi)?.opacity ?? -1),
      savyPeitto: Number(cs(savy)?.opacity ?? -1),
      savyAika: savy?.dataset.aika ?? null,
      puluLennossa: Boolean(pulu?.classList.contains('lennossa')),
      puluTransform: pulu?.style.transform ?? '',
      aika: window.matkakirja.game.timeOfDay(),
    };
  });

  /* ── 1. kerros ja lepo ───────────────────────────────────────────── */
  const alku = await lueTila();
  tieto(`${ruutu.nimi} · alku`, JSON.stringify(alku));
  vaadi(`${ruutu.nimi} · 1. Kerros laudalla, liike päällä ja lauta levossa`,
    alku.kerros && alku.tila?.paalla && alku.levossa === true && alku.luokat.includes('levossa')
      && alku.pilviTila === 'running' && alku.pilviPeitto > 0 && alku.pilviPeitto <= 0.08,
    JSON.stringify(alku));

  /* ── 2. illan sävy ───────────────────────────────────────────────── */
  const asetaAika = (tunti) => sivu.evaluate(async (t) => {
    const { ui, game: g } = window.matkakirja;
    const { TURN_HOURS } = await import('/js/game.js');
    g.turnCount = Math.round(t / TURN_HOURS) + 1;
    ui.render();
    await new Promise((r) => setTimeout(r, 2600));
  }, tunti);
  await asetaAika(14); // ilta (12–18)
  const ilta = await lueTila();
  tieto(`${ruutu.nimi} · ilta`, JSON.stringify({ aika: ilta.aika, savy: ilta.savyAika, peitto: ilta.savyPeitto }));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `liike-ilta-${ruutu.nimi}.png`), await sivu.screenshot());
  await asetaAika(8); // keskipäivä (6–12)
  const paiva = await lueTila();
  vaadi(`${ruutu.nimi} · 2. Illan sävy näkyy illassa, ei keskipäivällä`,
    ilta.aika === 'ilta' && ilta.savyAika === 'ilta' && ilta.savyPeitto > 0.05
      && paiva.aika === 'keskipäivä' && paiva.savyPeitto === 0,
    JSON.stringify({ ilta: [ilta.aika, ilta.savyAika, ilta.savyPeitto], paiva: [paiva.aika, paiva.savyPeitto] }));

  /* ── 3. pulu ─────────────────────────────────────────────────────── */
  const lahti = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.liike().lennata());
  await sivu.waitForTimeout(500);
  const kesken = await lueTila();
  const kuvaus = kesken.puluTransform;
  await sivu.waitForTimeout(2200);
  const jalkeen = await lueTila();
  vaadi(`${ruutu.nimi} · 3. Pulu lentää levossa ja lento päättyy`,
    lahti === true && kesken.puluLennossa && kesken.tila?.lentoja === 1 && /translate\(/.test(kuvaus)
      && !jalkeen.puluLennossa,
    JSON.stringify({ lahti, kesken: [kesken.puluLennossa, kesken.tila?.lentoja, kuvaus], jalkeen: jalkeen.puluLennossa }));
  if (KUVAKANSIO) {
    /*
     * KAAPPAUS HITAALLA LENNOLLA: ohjelmistopiirto (3 fps) ei ehdi
     * kaapata 2 s:n lentoa keskeltä, joten kuvaa varten lento venytetään
     * 20 sekuntiin (lennata(kestoMs); pelissä PULUN_LENTO_MS).
     */
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.liike().lennata(20000));
    await sivu.waitForTimeout(3000);
    const r = await sivu.evaluate(() => {
      const b = document.querySelector('.pallolauta-liike-pulu').getBoundingClientRect();
      return { x: b.x, y: b.y };
    });
    const cx = Math.max(0, Math.round(r.x - 200));
    const cy = Math.max(0, Math.round(r.y - 120));
    const clip = { x: cx, y: cy, width: Math.min(ruutu.width - cx, 460), height: Math.min(ruutu.height - cy, 280) };
    writeFileSync(join(KUVAKANSIO, `liike-pulu-lahi-${ruutu.nimi}.png`), await sivu.screenshot({ clip }));
    writeFileSync(join(KUVAKANSIO, `liike-pulu-${ruutu.nimi}.png`), await sivu.screenshot());
    // Hidas lento kesken; se ei haittaa seuraavia vartioita (kortti
    // keskeyttää sen, ja kytkin pois pyyhkii).
  }

  /* ── 4. kortti auki ──────────────────────────────────────────────── */
  await sivu.evaluate(() => document.body.classList.add('nosto-popup-auki'));
  await sivu.waitForTimeout(2300);
  const kortti = await lueTila();
  const lahtiKortilla = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.liike().lennata());
  await sivu.evaluate(() => document.body.classList.remove('nosto-popup-auki'));
  await sivu.waitForTimeout(2300);
  const takaisin = await lueTila();
  vaadi(`${ruutu.nimi} · 4. Kortti auki: ei levossa, pilvi pysähtyy, pulu ei lähde; kortin jälkeen lepo palaa`,
    kortti.levossa === false && !kortti.luokat.includes('levossa') && kortti.pilviTila === 'paused'
      && lahtiKortilla === false && takaisin.levossa === true && takaisin.pilviTila === 'running',
    JSON.stringify({ kortti: [kortti.levossa, kortti.pilviTila, lahtiKortilla], takaisin: [takaisin.levossa, takaisin.pilviTila] }));

  /* ── 5. kytkin pois, 6. suorituskyky ─────────────────────────────── */
  /*
   * KEHYSNOPEUS: headless Chromium piirtää pallon SwiftShaderilla 2–4
   * fps (laitteen fps mittaa Laitetestaaja), joten yksi ikkuna olisi
   * kvantisoitunut. Mitataan kehysväli millisekunteina KOLMESSA
   * vuorottelevassa ikkunassa (päällä/pois) ja verrataan mediaaneja:
   * liike on komposiittorin työtä (transform/opacity), ei silmukan.
   */
  const mittaaKehysvali = (ms) => sivu.evaluate((kesto) => new Promise((ok) => {
    const ajat = [];
    let edellinen = performance.now();
    const alku = edellinen;
    const askel = (t) => {
      ajat.push(t - edellinen);
      edellinen = t;
      if (t - alku < kesto) requestAnimationFrame(askel);
      else {
        ajat.sort((a, b) => a - b);
        ok(ajat[Math.floor(ajat.length / 2)] ?? 0);
      }
    };
    requestAnimationFrame(askel);
  }), ms);
  const kytke = (paalla) => sivu.evaluate(async (p) => {
    const { asetaLiike } = await import('/js/kartta-liike.js');
    asetaLiike(p);
  }, paalla);
  const mediaani = (t) => { const s = [...t].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
  const valitPaalla = [];
  const valitPois = [];
  for (let k = 0; k < 3; k += 1) {
    await kytke(true);
    await sivu.waitForTimeout(1200);
    valitPaalla.push(await mittaaKehysvali(4000));
    await kytke(false);
    await sivu.waitForTimeout(1200);
    valitPois.push(await mittaaKehysvali(4000));
  }
  await sivu.waitForTimeout(1600);
  const pois = await lueTila();
  vaadi(`${ruutu.nimi} · 5. Kytkin pois: kerros ei päällä, pilvi ja sävy pois`,
    pois.tila?.paalla === false && !pois.luokat.includes('paalla') && pois.pilviTila === 'paused'
      && pois.pilviPeitto === 0 && pois.savyPeitto === 0,
    JSON.stringify(pois));
  const vPaalla = mediaani(valitPaalla);
  const vPois = mediaani(valitPois);
  tieto(`${ruutu.nimi} · kehysväli ms`, `päällä ${valitPaalla.map((v) => v.toFixed(0)).join('/')} (mediaani ${vPaalla.toFixed(0)}), `
    + `pois ${valitPois.map((v) => v.toFixed(0)).join('/')} (mediaani ${vPois.toFixed(0)})`);
  if (ruutu.nimi === '390') {
    vaadi(`${ruutu.nimi} · 6. Kehysnopeus liikkeen kanssa ≥ 95 % ilman`,
      vPaalla <= vPois / 0.95, `kehysväli päällä ${vPaalla.toFixed(0)} ms, pois ${vPois.toFixed(0)} ms`);
  }
  vaadi(`${ruutu.nimi} · 7. Ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
