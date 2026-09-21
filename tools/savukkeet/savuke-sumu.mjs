/*
 * SAVUKE: LÖYTÄMISEN SUMU (Fable 21.9.2026; omistaja hyväksyi julkaisuun
 * samana päivänä: sisäsumu 50 %, luonnosraita, merentakaiset pois).
 *
 * Kaappaa Ranskan saapumisnäkymän Pariisissa (Marseille käymättä) ja
 * saman Marseillen jälkeen 390 ja 1400 px:n ruuduilla (sumu on päällä
 * oletuksena).
 * Toteutus js/pallolauta/sumu.js; kytkennät lauta.js (sisäsumu +
 * rajat), nostot.js (luonnokset), pallolaatat.js maalaaSisasumu,
 * pallovektorit.js asetaSumu, css .pallolauta-nosto-luonnos.
 *
 * VARTIOT (390 ja 1400 px):
 *   1. PARIISISSA: sisäsumu päällä (tasoituksen sumu, aukko pariisi,
 *      käymättä marseille) ja Marseillen seutu kermaisempi kuin Pariisin.
 *   2. PARIISISSA: kohdemaassa on luonnosnostoja (löytämättömiä) ja
 *      mustattuja (löytösäteellä tai taso 1); jokaisella luonnoksella
 *      on katkoviivarengas.
 *   3. MARSEILLEN JÄLKEEN: sisäsumu pois (Cayenne ja Nouméa eivät
 *      laske), Marseillen seutu paljas, luonnoksia vähemmän.
 *   4. Rajojen peitto vaaleampi kuin oletus (pallovektorit asetaSumu).
 *   5. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-sumu.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

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

/** Mittapisteet: kaupungin viereinen maasto (ei itse nimiö). */
const PISTEET = [
  { nimi: 'pariisi', lat: 48.6, lon: 2.9 },
  { nimi: 'marseille', lat: 43.6, lon: 5.6 },
];
const VAPAA = { yla: 120, ala: 130, sivu: 24 };
const KERMA = [0xfa, 0xf4, 0xd6];
/** 35 %:n sumu vie Marseillen seudun (paljaana ~70) alle tämän. */
const SUMURAJA = 55;

const kermaEtaisyys = (kuva, x, y, sade = 5) => {
  const arvot = [];
  for (let dy = -sade; dy <= sade; dy += 1) {
    for (let dx = -sade; dx <= sade; dx += 1) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= kuva.width || py >= kuva.height) continue;
      const i = (py * kuva.width + px) * 4;
      arvot.push(Math.hypot(kuva.data[i] - KERMA[0], kuva.data[i + 1] - KERMA[1], kuva.data[i + 2] - KERMA[2]));
    }
  }
  if (!arvot.length) return Infinity;
  arvot.sort((a, b) => a - b);
  return arvot[Math.floor(arvot.length / 2)];
};

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
      localStorage.removeItem('matkakirja-loydetyt');
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

  const asetaKaupunki = (id, kaydyt) => sivu.evaluate(async ({ id: k, kaydyt: kk }) => {
    const { ui, game: g } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    g.player.pos = { type: 'city', city: k };
    for (const v of kk) g.world.visited.add(v);
    g.phase = 'action';
    ui.render();
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri')) el.remove();
    await new Promise((r) => setTimeout(r, 1500));
  }, { id, kaydyt });
  await asetaKaupunki('pariisi', ['pariisi']);
  await sivu.waitForFunction(async () => {
    const m = await import('/js/laattapyramidi.js');
    return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka);
  }, null, { timeout: 60000 }).catch(() => {});
  await sivu.waitForTimeout(5000);

  const lueTila = () => sivu.evaluate(async (pisteet) => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const m = await import('/js/laattapyramidi.js');
    const koti = l.kotelo.getBoundingClientRect();
    const t = m.pyramidinTasoitus();
    const nostot = [...document.querySelectorAll('.pallolauta-nosto')];
    const luonnokset = nostot.filter((n) => n.classList.contains('pallolauta-nosto-luonnos'));
    const vm = l.vektorit?.()?.mittarit?.() ?? null;
    const raja = vm ? { sumu: vm.sumu ?? null, kaydytJanoja: vm.kaydytJanoja ?? null } : null;
    return {
      pisteet: pisteet.map((p) => {
        const s = l.pallo.getScreenCoords(p.lat, p.lon, 0);
        return s ? { ...p, x: koti.left + s.x, y: koti.top + s.y } : { ...p, x: null, y: null };
      }),
      sumu: t?.sumu ? { aukot: t.sumu.aukot.map((a) => a.id), kaymatta: t.sumu.kaymatta, peitto: t.sumu.peitto } : null,
      avain: t?.avain ?? '',
      nostoja: nostot.length,
      luonnoksia: luonnokset.length,
      raitoja: document.querySelectorAll('.pallolauta-nosto-luonnos .pallolauta-luonnosraita').length,
      raja,
      loydetyt: JSON.parse(localStorage.getItem('matkakirja-loydetyt') ?? '[]').length,
    };
  }, PISTEET);

  await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .fokusvirta-lentokerros, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });
  const mittaa = async (hetki) => {
    const tila = await lueTila();
    const png = await sivu.screenshot();
    if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `sumu-${hetki}-${ruutu.nimi}.png`), png);
    const kuva = decodePng(png);
    const arvot = {};
    for (const p of tila.pisteet) {
      const nakyy = p.x != null && p.x >= VAPAA.sivu && p.x < ruutu.width - VAPAA.sivu
        && p.y >= VAPAA.yla && p.y < ruutu.height - VAPAA.ala;
      arvot[p.nimi] = nakyy ? Math.round(kermaEtaisyys(kuva, p.x, p.y)) : null;
    }
    tieto(`${ruutu.nimi} · ${hetki}`, `kermaetäisyys ${JSON.stringify(arvot)}; sumu ${JSON.stringify(tila.sumu)}; `
      + `nostoja ${tila.nostoja}, luonnoksia ${tila.luonnoksia} (raitoja ${tila.raitoja}); raja ${JSON.stringify(tila.raja)}; `
      + `löydetyt ${tila.loydetyt}; avain ${tila.avain}`);
    return { ...tila, arvot };
  };

  /* ── 1–2. Pariisissa, Marseille käymättä ─────────────────────────── */
  const pariisi = await mittaa('pariisi');
  // Pariisin seutu on itsessään vaaleaa (Pariisin allas), joten
  // vertailu on Marseillen seutu sumussa (< SUMURAJA) vs. paljaana (vartio 3).
  vaadi(`${ruutu.nimi} · 1. Pariisissa sisäsumu päällä: aukko pariisi, käymättä marseille, Marseillen seutu sumussa`,
    pariisi.sumu?.aukot?.join() === 'pariisi' && pariisi.sumu.kaymatta.includes('marseille')
      && (pariisi.arvot.marseille == null || pariisi.arvot.marseille < SUMURAJA),
    JSON.stringify({ sumu: pariisi.sumu, arvot: pariisi.arvot }));
  vaadi(`${ruutu.nimi} · 2. Pariisissa luonnoksia (renkaineen) ja mustattuja nostoja`,
    pariisi.luonnoksia > 0 && pariisi.luonnoksia < pariisi.nostoja && pariisi.raitoja === pariisi.luonnoksia,
    `nostoja ${pariisi.nostoja}, luonnoksia ${pariisi.luonnoksia}, raitoja ${pariisi.raitoja}`);

  /* ── 3. Marseillen jälkeen ───────────────────────────────────────── */
  await asetaKaupunki('marseille', ['pariisi', 'marseille']);
  await sivu.waitForTimeout(6000);
  const marseille = await mittaa('marseille');
  vaadi(`${ruutu.nimi} · 3. Marseillen jälkeen sisäsumu pois (merentakaiset eivät laske), Marseillen seutu paljas, luonnoksia vähemmän`,
    marseille.sumu === null
      && (marseille.arvot.marseille == null || pariisi.arvot.marseille == null
        || marseille.arvot.marseille > pariisi.arvot.marseille)
      && marseille.luonnoksia < pariisi.luonnoksia,
    JSON.stringify({ sumu: marseille.sumu, arvot: marseille.arvot, luonnoksia: [pariisi.luonnoksia, marseille.luonnoksia] }));
  vaadi(`${ruutu.nimi} · 4. Rajat sumussa (asetaSumu päällä)`,
    marseille.raja?.sumu === true, `raja ${JSON.stringify(marseille.raja)}`);
  vaadi(`${ruutu.nimi} · 5. Ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
