/*
 * Savuke: LIIKU-NAPPI ON PYSYVÄ — ALPPIEN UMPIKUJA.
 *
 * Codexin/rootin pelitesti julkaistussa v1855 (normaali peli, ei
 * injektioita): Alpeilla ei näy Liiku-nappia eikä aarteen vihjepistettä,
 * joten pelaaja ei pääse kohteesta pois lainkaan.
 *
 * JUURISYY. js/ui.js liikuNappiNakyy piti 25.8.2026 alkaen LAATTAPORTTIA:
 * fokusmoodissa nappi oli olemassa vasta kun kaupungin laatta oli
 * käännetty (`!game.tokens.has(city.id)`), ja ilman nappia myös liuku
 * suljettiin. Portti oli mitoitettu TÄYDELLE fokusvirtapakille, jossa
 * laatan kääntävä ketju on aina olemassa. KEVYELLÄ pakilla
 * (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT: alpit, islanti, kreeta,
 * lappi, sisilia, tromssa) ei ole kohtaamispistettä eikä aarteen
 * avaavaa lehtitehtävää — laatta on, mutta sen kääntäjää ei — joten
 * portti ei auennut koskaan.
 *
 * OMISTAJAN LINJAUS 13.9.2026 (Raamattu, KARTTAUUDISTUS) kumoaa portin:
 * *"Alareunassa onkin kokojan nakyvilla pieni 'liiku' nappi."* ja
 * *"Pelaaja voi myos halutessaan jatkaa matkaa ilman loytamatta
 * aarretta."*
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. ALPIT, LAATTA KÄÄNTÄMÄTTÄ: Liiku-nappi on laudalla, se ei ole
 *      harmaana ja liuku aukeaa siitä matkustustapoihin. Tämä on se
 *      vartio, joka on PUNAINEN vanhalla portilla (vastakoe).
 *   2. KAIKKI KUUSI KEVYTTÄ KOHDETTA: sama koe jokaisessa, sillä vika
 *      ei ollut Alppien vaan kevyen pakin.
 *   3. TÄYSI PAKKI (Pariisi), AARRE LUKOSSA: nappi on nyt sielläkin —
 *      uusi linjaus koskee koko peliä, ei vain kevyitä.
 *   4. TÄYSI PAKKI (Pariisi), AARRE AVATTU: vanha toimiva polku ei
 *      rikkoutunut.
 *   5. TURVARAJAT PAIKALLAAN: botin vuorolla ja siirtovaiheessa
 *      ('move') koko toimintorivi on yhä poissa (renderActions), eikä
 *      korjaus siis avannut nappia keskelle animaatiota.
 *
 * MIKSI SELAIMESSA EIKÄ VAIN NODESSA. tests/liiku-nappi.test.mjs
 * vartioi säännön (js/fokusvirta.js liikuNappiNakyvissa) ja sen
 * kytkennän tekstinä; vika oli kuitenkin PINNASSA — nappia ei ollut
 * DOM:issa — ja vain oikea ladonta todistaa sen poissa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *         node tools/savukkeet/savuke-liiku-alpit.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { KEVYET_FOKUSVIRRAT } from '../../js/packs/fokusvirrat.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;

/** Kuusi kevyttä kohdetta NIMETTYINÄ (js/packs/fokusvirrat.js). */
const KEVYET = ['alpit', 'islanti', 'kreeta', 'lappi', 'sisilia', 'tromssa'];
/** Täyden pakin verrokki. */
const TAYSI = 'pariisi';
/** Alpit lähikuvassa, jotta ladonta ja saapuminen käyttäytyvät kuten pelissä. */
const ALPIT_NAKYMA = { lat: 46.5, lng: 9.8, alt: 0.09 };

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.geojson': 'application/json',
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

/* ---------- VARTIO 0: DATA (ei tarvitse selainta) ---------- */
vaadi('0. kevyet kohteet ovat yhä nämä kuusi',
  [...KEVYET_FOKUSVIRRAT].sort().join(',') === [...KEVYET].sort().join(','),
  [...KEVYET_FOKUSVIRRAT].join(','));

/** Tallenne: Fogg Alpeilla, laatta paikallaan (aarretta ei ole löydetty). */
function tallenne() {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'alpit' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.polloLoydetty = true;
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen tila */ }
}, tallenne());
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
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
const auki = await sivu
  .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));
if (!auki) {
  await ctx.close(); await selain.close(); palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(1);
}
await sivu.waitForTimeout(3500);
await sivu.evaluate(async (n) => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView({ lat: n.lat, lng: n.lng, altitude: n.alt }, 0);
  await new Promise((v) => setTimeout(v, 1200));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
}, ALPIT_NAKYMA);

/**
 * Siirrä Fogg kaupunkiin, piirrä rivi ja lue Liiku-napin tila DOM:ista.
 *
 * Sama polku kuin pelaajalla: renderActions päättää piirretäänkö rivi,
 * piirraToimintorivi päättää onko nappi olemassa ja onko se estetty.
 * Saapumiskortti suljetaan ensin — se on oma kerroksensa eikä kuulu
 * tähän mittaukseen.
 */
const napinTila = (sivu2, id, asetukset) => sivu2.evaluate(async (a) => {
  const { ui } = window.matkakirja;
  const { game } = ui;
  for (const d of document.querySelectorAll('dialog[open]')) d.close?.();
  game.player.pos = { type: 'city', city: a.id };
  game.world.visited.add(a.id);
  game.player.isBot = Boolean(a.botti);
  /*
   * LAATTA VAIN POISTETAAN, EI PALAUTETA: game.tokens on Map
   * (kaupunki → laatan tyyppi), ja keksitty tyyppi olisi keksittyä
   * pelitilaa. Mittaukset on siksi järjestetty niin, että jokainen
   * kaupunki luetaan ensin laatta paikallaan.
   */
  if (a.aarreLoydetty) game.tokens.delete(a.id);
  game.phase = a.phase ?? 'action';
  ui.render();
  await new Promise((v) => setTimeout(v, 700));
  for (const d of document.querySelectorAll('dialog[open]')) d.close?.();
  const rivi = document.querySelector('.toimintorivi');
  const nappi = rivi?.querySelector('.monitoimi-nappi');
  let liukuAuki = null;
  let liukuNapit = 0;
  if (nappi && !nappi.disabled) {
    nappi.click();
    await new Promise((v) => setTimeout(v, 400));
    liukuAuki = Boolean(document.querySelector('.toimintorivi.liuku-auki'));
    liukuNapit = document.querySelectorAll('.toimintorivi-liuku > button').length;
    // Liuku kiinni seuraavaa mittausta varten.
    nappi.click();
    await new Promise((v) => setTimeout(v, 250));
  }
  return {
    kaupunki: game.cityOf()?.id ?? null,
    fokusmoodi: ui.fokusmoodi === true,
    laatta: game.tokens.has(a.id),
    saanto: ui.liikuNappiNakyy(),
    onRivi: Boolean(rivi),
    onNappi: Boolean(nappi),
    estetty: nappi?.disabled ?? null,
    lappu: nappi?.getAttribute('aria-label') ?? '',
    liukuAuki,
    liukuNapit,
  };
}, { id, ...asetukset });

/* ---------- VARTIO 1 + 2: kuusi kevyttä kohdetta ---------- */
for (const id of KEVYET) {
  const t = await napinTila(sivu, id, {});
  tieto(`kevyt kohde ${id}`, `laatta ${t.laatta}, fokusmoodi ${t.fokusmoodi}, `
    + `nappi ${t.onNappi} (estetty ${t.estetty}), liuku ${t.liukuAuki}/${t.liukuNapit}`);
  vaadi(`${id === 'alpit' ? '1' : '2'}. Liiku-nappi on käytettävissä kevyessä kohteessa: ${id}`,
    t.kaupunki === id && t.laatta === true && t.onNappi && t.estetty === false
      && t.saanto === true && t.liukuAuki === true && t.liukuNapit > 0,
    JSON.stringify(t));
}

/* ---------- VARTIO 3: täysi pakki, aarre lukossa ---------- */
const lukossa = await napinTila(sivu, TAYSI, {});
tieto('täysi pakki lukossa', JSON.stringify(lukossa));
vaadi('3. Liiku-nappi on käytettävissä täyden pakin kaupungissa aarteen ollessa lukossa',
  lukossa.kaupunki === TAYSI && lukossa.laatta === true && lukossa.onNappi
    && lukossa.estetty === false && lukossa.liukuAuki === true,
  JSON.stringify(lukossa));

/* ---------- VARTIO 4: täysi pakki, aarre avattu ---------- */
const avattu = await napinTila(sivu, TAYSI, { aarreLoydetty: true });
tieto('täysi pakki avattu', JSON.stringify(avattu));
vaadi('4. Liiku-nappi on käytettävissä täyden pakin kaupungissa aarteen auettua',
  avattu.kaupunki === TAYSI && avattu.laatta === false && avattu.onNappi
    && avattu.estetty === false && avattu.liukuAuki === true,
  JSON.stringify(avattu));

/* ---------- VARTIO 5: turvarajat ovat yhä paikallaan ---------- */
const siirrossa = await napinTila(sivu, 'alpit', { phase: 'move' });
tieto("vaihe 'move'", JSON.stringify(siirrossa));
vaadi("5a. siirtovaiheessa ('move') toimintoriviä ei piirretä lainkaan",
  siirrossa.onRivi === false && siirrossa.onNappi === false, JSON.stringify(siirrossa));

const botti = await napinTila(sivu, 'alpit', { botti: true });
tieto('botin vuoro', JSON.stringify(botti));
vaadi('5b. botin vuorolla toimintoriviä ei piirretä lainkaan',
  botti.onRivi === false && botti.onNappi === false, JSON.stringify(botti));
await sivu.evaluate(() => { window.matkakirja.ui.game.player.isBot = false; });

vaadi('sivulla ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
