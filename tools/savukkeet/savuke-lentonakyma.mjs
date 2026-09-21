/*
 * Savuke: LENTONÄKYMÄSSÄ EI LIFTAUSKAARIA, LENTOKOHTEET NÄKYVIIN.
 *
 * OMISTAJA 20.9.2026 klo 14.40 (Raamattu, OMISTAJA 14.30-14.40 kohta 2),
 * sanatarkasti: *"lentonäkymässä liftausreitit pitää piilottaa ja
 * lentoreittien kohde kaupungit pitää näkyä"*. Kaappaus Berliinistä:
 * Lontoo ja Rooma tarjolla, kaaret piirtyivät, mutta kohdekaupunkien
 * merkit puuttuivat ja Berliinin liftauskaaret näkyivät.
 *
 * JUURISYYT (mitattu tässä erässä):
 *   1. ui.matkareittienValinta piirsi oman kaupungin liftauskaaret
 *      (matkaSessioKesken on tosi, kun matkavalikko on auki) myös
 *      lentolistan ollessa auki.
 *   2. Pallon kaupunkirajaus (lauta.js pelinKaupunkirajaus, PAATOKSET
 *      43 kohta 8) päästi läpi vain kohdemaan ja NOPAN kohteet —
 *      lentolistan kohteet eivät ole moveOptions-kohteita, joten
 *      Lontoo ja Rooma jäivät piiloon vaikka kaari osoitti niihin.
 *
 * VARTIOT (390 × 844 ja 1400 × 900, Fogg Berliinissä, vaihe action):
 *   1. LENTOLISTA AUKI: pallolla ei ole yhtään pelin reittiviivaa
 *      (pathsData ilman linssin osia), lentokaaria on yhtä monta kuin
 *      tarjottuja lentoja, ja jokainen lentokohde on kartalla pisteenä
 *      ja nimenä.
 *   2. VASTAKOE: lista kiinni → liftauskaaret palaavat ja ulkomaiset
 *      lentokohteet katoavat kartalta (rajaus toimii yhä).
 *   3. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-lentonakyma.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '';
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const LAHTOKAUPUNKI = 'berliini';
const KAIKKI_RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.width) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const PALLON_PACK = packById('maailmankartta');
const MAA = PALLON_PACK.map.cityCountry;
const KOHDEMAA = MAA[LAHTOKAUPUNKI];

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/** Reittikerros, kaaret ja kaupunkimerkit yhdestä hetkestä. */
const LUE = `() => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const pallo = ui.pallonInstanssi;
  const valinta = ui.matkareittienValinta();
  return {
    // Reittiviivat (varjo + viiva per kaari); linssi ei ole päällä, joten
    // kerroksessa on vain pelin osa.
    reittiviivoja: pallo.pathsData().length,
    reittiTunnukset: valinta.reittiTunnukset,
    lennot: valinta.lennot,
    kaaria: pallo.arcsData().length,
    pisteet: pallo.pointsData().filter((p) => !p.laji).map((p) => p.id),
    nimetyt: [...l.nimet.nimetyt()],
    domNimet: [...document.querySelectorAll('.pallolauta-nimi')]
      .map((e) => (e.textContent || '').trim()).filter(Boolean),
    vaihe: ui.game.phase,
    listaAuki: Boolean(ui.travelExpanded),
    suodatin: ui.travelSuodatin ?? null,
  };
}`;

for (const ruutu of RUUDUT) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(LAHTOKAUPUNKI);
  const tallenne = JSON.stringify(peli.toJSON());

  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  const tunnus = ruutu.nimi;
  await sivu.goto(`${osoite}?lauta=pallo&glnimiot=0`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${tunnus}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const l = ui.pallolauta;
    await l.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
  });

  const tarjolla = await sivu.evaluate(() => window.matkakirja.game.airportDestinations());
  tieto(`${tunnus}: lennot Berliinistä`, tarjolla.join(', ') || '—');
  vaadi(`${tunnus}: Berliinistä on lentoja tarjolla`, tarjolla.length >= 2, JSON.stringify(tarjolla));

  /* ── 1. lentolista auki ───────────────────────────────────────── */
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    // Pelaajan polku: Liiku (liuku auki = matkasessio alkaa) → LENTO.
    if (!ui.liukuAuki) ui.vaihdaLiuku();
    await new Promise((v) => setTimeout(v, 300));
    ui.avaaMatkavalikko('air');
    // Sovitus ajaa kameran; ladonta levossa sen jälkeen.
    await new Promise((v) => setTimeout(v, 2200));
    ui.pallolauta.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
  });
  const lento = await sivu.evaluate(`(${LUE})()`);
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, `lentonakyma-${ruutu.width}.png`), scale: 'css' });
  }
  tieto(`${tunnus}: lentolista auki`, JSON.stringify({
    reittiviivoja: lento.reittiviivoja, kaaria: lento.kaaria, lennot: lento.lennot,
    pisteet: lento.pisteet, nimet: lento.nimetyt,
  }));
  vaadi(`${tunnus}: 1a. lentolista on auki lentosuodattimella`,
    lento.listaAuki && lento.suodatin === 'air', JSON.stringify({ auki: lento.listaAuki, suodatin: lento.suodatin }));
  vaadi(`${tunnus}: 1b. lentonäkymässä ei ole liftauskaaria (reittikerros tyhjä)`,
    lento.reittiTunnukset.length === 0 && lento.reittiviivoja === 0,
    JSON.stringify({ tunnukset: lento.reittiTunnukset, viivoja: lento.reittiviivoja }));
  vaadi(`${tunnus}: 1c. lentokaaria on yhtä monta kuin tarjottuja lentoja`,
    lento.kaaria === tarjolla.length && lento.lennot.length === tarjolla.length,
    JSON.stringify({ kaaria: lento.kaaria, lennot: lento.lennot, tarjolla }));
  const puuttuvatPisteet = tarjolla.filter((id) => !lento.pisteet.includes(id));
  const puuttuvatNimet = tarjolla.filter((id) => !lento.nimetyt.includes(id));
  vaadi(`${tunnus}: 1d. jokainen lentokohde on kartalla pisteenä`,
    puuttuvatPisteet.length === 0, JSON.stringify({ puuttuvat: puuttuvatPisteet, pisteet: lento.pisteet }));
  vaadi(`${tunnus}: 1e. jokainen lentokohde on kartalla nimenä (ladonta ja DOM)`,
    puuttuvatNimet.length === 0 && lento.domNimet.length === lento.nimetyt.length,
    JSON.stringify({ puuttuvat: puuttuvatNimet, dom: lento.domNimet, ladonta: lento.nimetyt }));

  /* ── 2. vastakoe: lista kiinni ────────────────────────────────── */
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.suljeMatkavalikko();
    ui.render();
    await new Promise((v) => setTimeout(v, 1200));
    ui.pallolauta.ladoHeti();
    await new Promise((v) => setTimeout(v, 400));
  });
  const kiinni = await sivu.evaluate(`(${LUE})()`);
  tieto(`${tunnus}: lista kiinni`, JSON.stringify({
    reittiviivoja: kiinni.reittiviivoja, kaaria: kiinni.kaaria, pisteet: kiinni.pisteet,
  }));
  vaadi(`${tunnus}: 2a. vastakoe: lista kiinni → lentokaaret pois`,
    kiinni.kaaria === 0 && kiinni.lennot.length === 0, JSON.stringify({ kaaria: kiinni.kaaria }));
  const ulkomaiset = kiinni.pisteet.filter((id) => MAA[id] !== KOHDEMAA);
  vaadi(`${tunnus}: 2b. vastakoe: lista kiinni → ulkomaiset lentokohteet piiloon`,
    ulkomaiset.length === 0, JSON.stringify(ulkomaiset));
  /*
   * Liftauskaaret palaavat, kun matka on kesken: avataan jalan-lista
   * (matkavalikko ilman lentosuodatinta) ja katsotaan, että oman
   * kaupungin kaaret piirtyvät — sama polku, jolla ne ennen näkyivät
   * lentolistankin aikana.
   */
  const jalan = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    if (!ui.liukuAuki) ui.vaihdaLiuku();
    await new Promise((v) => setTimeout(v, 300));
    ui.avaaMatkavalikko('bus');
    await new Promise((v) => setTimeout(v, 800));
    const valinta = ui.matkareittienValinta();
    const viivoja = ui.pallonInstanssi.pathsData().length;
    ui.suljeMatkavalikko();
    ui.render();
    return { tunnukset: valinta.reittiTunnukset.length, lennot: valinta.lennot.length, viivoja };
  });
  vaadi(`${tunnus}: 2c. vastakoe: ilman lentosuodatinta liftauskaaret piirtyvät`,
    jalan.tunnukset > 0 && jalan.viivoja > 0 && jalan.lennot === 0, JSON.stringify(jalan));

  vaadi(`${tunnus}: 3. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
