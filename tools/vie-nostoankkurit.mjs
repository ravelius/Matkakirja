/*
 * VIE NOSTOJEN KARTTA-ANKKURIT DATAAN (Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 33 TARKENNUS 2 kohta 5, PAATOKSET 32 kohdat 1, 2 ja 5).
 * ══════════════════════════════════════════════════════════════════
 *
 * === MIKSI TÄMÄ ON OLEMASSA =======================================
 *
 * Elävä ankkuri (js/pallolauta/nostoankkurit.js) lasketaan
 * saapumiskehyksessä, ja kehyksen mitat ovat RUUTUKOON funktio:
 * ankkurivarasto on nimetty ruudulla ("390x844"), koska nimiö- ja
 * symbolilaatikot ovat ruutuvakioita ja levitys mittaa niitä. Sama
 * nosto saa siis eri ankkurin puhelimella ja työpöydällä. Poltettu
 * piste sen sijaan on laatassa YHDESSÄ paikassa.
 *
 * PÄÄTÖS (Opus-agentti 18.9.2026, kirjattu raporttiin
 * docs/raportit/viesti-fable-poltto-ranska-nostot-20260918.md):
 * poltto käyttää PUHELIMEN saapumiskehyksen ankkuria (390 × 844,
 * dpr 2 — omistajan pääalusta), ja peli lukee saman luvun datasta
 * kaikilla ruuduilla. Näin elävä nimiö ja osumapinta ovat poltetun
 * pisteen kohdalla myös työpöydällä.
 *
 * === TÄMÄ EI LASKE LADONTAA =======================================
 *
 * Ankkurit luetaan PELISTÄ, ei omasta kopiosta: työkalu avaa pelin
 * Playwrightilla puhelimen ruudulla, odottaa saapumisen loppuun ja
 * lukee `ui.pallolauta.nostot.osumat()` — täsmälleen ne rivit, jotka
 * ankkurointi on juuri kirjoittanut (Raamatun ehto: yksi ladonta,
 * yksi lähde). Kaupungin sisäiset nostot eivät ole listalla lainkaan
 * (PAATOKSET 34: ne ovat liuskassa eivätkä polta pistettä kartalle).
 *
 * Ajo (Mac):
 *   PLAYWRIGHT_JS=… CHROMIUM=/opt/pw-browsers/chromium \
 *     node tools/vie-nostoankkurit.mjs [--kaupunki pariisi] [--iso FRA] [--kuiva]
 *
 * Kirjoittaa js/packs/nostoankkurit-<iso>.js. `--kuiva` vain tulostaa.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const KAUPUNKI = valitsin('kaupunki', 'pariisi');
const ISO = valitsin('iso', 'FRA').toUpperCase();
const KUIVA = argv.includes('--kuiva');
/** Puhelimen saapumiskehys — ks. PÄÄTÖS yllä. */
const RUUTU = { w: Number(valitsin('leveys', 390)), h: Number(valitsin('korkeus', 844)) };

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; vienti ohitetaan');
  palvelin.close();
  process.exit(0);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/**
 * Avaa pelin annetussa ruudussa, ajaa saapumisen loppuun ja lukee
 * nostokerroksen osumat. `lukitut = false` ajaa vientilipun
 * `?lukitutankkurit=0`, jolloin ankkurit lasketaan levityksellä.
 */
async function lueRivit({ leveys, korkeus, lukitut }) {
const ctx = await selain.newContext({
  viewport: { width: leveys, height: korkeus },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen tila */ }
}, tallenne(KAUPUNKI));
const sivu = await ctx.newPage();
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
/*
 * VIENTI AJETAAN ILMAN VANHAA TAULUA (`?lukitutankkurit=0`): muuten
 * toinen ajo lukisi oman edellisen tuloksensa ja taulu jähmettyisi
 * siihen, mitä siinä sattui olemaan.
 */
await sivu.goto(`${osoite}?lauta=pallo${lukitut ? '' : '&lukitutankkurit=0'}`, {
  waitUntil: 'domcontentloaded', timeout: 60000,
});
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
// Saapuminen ajetaan loppuun (isoisän kuvasarja ja pulu, ~40 s).
await sivu.waitForTimeout(44000);
await sivu.evaluate(async () => {
  window.matkakirja.ui.pallolauta.ladoHeti?.();
  await new Promise((v) => setTimeout(v, 800));
});

const luettu = await sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const laatikot = l.nostot.osumaLaatikot?.() ?? [];
  const keskus = new Map(laatikot
    .filter((b) => b && Number.isFinite(b.x0))
    .map((b) => [b.avain ?? b.id, { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 }]));
  return {
    rivit: l.nostot.osumat().map((o) => ({
      avain: o.avain ?? null,
      id: o.id ?? null,
      nimi: o.nimi ?? null,
      perhe: o.perhe ?? null,
      kaupunki: Boolean(o.kaupunki),
      poltettu: Boolean(o.poltettu),
      lat: o.lat,
      lng: o.lng,
      px: keskus.get(o.avain ?? o.id) ?? null,
    })),
  };
});
await ctx.close();
return luettu;
}

/*
 * TARKISTUS (`--tarkista`): sama lukitusta taulua käyttävä peli
 * avataan KAHDESSA ruudussa (puhelin 390 ja työpöytä 1400). Väite:
 * jokainen lukittu nosto on TÄSMÄLLEEN taulun lat/lng-pisteessä
 * kummallakin ruudulla — juuri se, mitä poltettu piste vaatii, koska
 * laatassa piste on vain yhdessä paikassa.
 */
if (argv.includes('--tarkista')) {
  const { NOSTOANKKURIT_FRA } = await import(`../js/packs/nostoankkurit-${ISO.toLowerCase()}.js`);
  const ruudut = [{ leveys: 390, korkeus: 844 }, { leveys: 1400, korkeus: 900 }];
  let lapi = 0;
  let kaikki = 0;
  for (const ruutu of ruudut) {
    const { rivit } = await lueRivit({ ...ruutu, lukitut: true });
    const kartta = new Map(rivit.map((r) => [r.avain, r]));
    let pahin = 0;
    let puuttuu = 0;
    for (const [avain, a] of Object.entries(NOSTOANKKURIT_FRA)) {
      const r = kartta.get(avain);
      if (!r) { puuttuu += 1; continue; }
      kaikki += 1;
      const ero = Math.max(Math.abs(r.lat - a.lat), Math.abs(r.lng - a.lng));
      pahin = Math.max(pahin, ero);
      /*
       * SIETO ON TAULUN OMA PYÖRISTYS. Taulussa on kuusi desimaalia,
       * joten suurin mahdollinen ero on 5e-7° ≈ 0,05 m — kolme
       * kertaluokkaa alle vaaditun 2 px:n. Tiukempi raja mittaisi
       * pyöristystä eikä ankkuria.
       */
      if (ero <= 5e-7) lapi += 1;
      else console.log(`FAIL  ${ruutu.leveys}px ${avain} — ero ${ero.toExponential(2)}°`);
    }
    console.log(`INFO  ${ruutu.leveys}px: suurin ero taulusta ${pahin.toExponential(2)}°, `
      + `ruudulta puuttui ${puuttuu} (kamera ei näytä kaikkia)`);
  }
  console.log(`${lapi}/${kaikki} lukittua ankkuria paikallaan`);
  await selain.close();
  palvelin.close();
  process.exit(lapi === kaikki ? 0 : 1);
}

const luettu = await lueRivit({ leveys: RUUTU.w, korkeus: RUUTU.h, lukitut: false });
await selain.close();
palvelin.close();

/*
 * MITÄ VIEDÄÄN. Kaupungin ULKOPUOLISET nostot (`nosto:` ja
 * `naapuri:`) — ne ovat ne, jotka polttavat pisteen kartalle.
 * Aihenostoa (`aihemerkki:`) ei viedä: se syntyy ryhmityksessä
 * jäsentensä keskiarvona, joten sen paikan määräävät jäsenten omat
 * lukitut ankkurit. Kaupungin sisäiset eivät ole listalla lainkaan
 * (PAATOKSET 34: liuska).
 */
const vietavat = luettu.rivit
  .filter((r) => r.avain && !r.kaupunki
    && (r.avain.startsWith('nosto:') || r.avain.startsWith('naapuri:')))
  .filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng))
  .sort((a, b) => a.avain.localeCompare(b.avain));

console.log(`osumia yhteensä: ${luettu.rivit.length}, vietäviä: ${vietavat.length}`);
for (const r of vietavat) {
  console.log(`  ${r.avain}  ${r.lat.toFixed(6)}, ${r.lng.toFixed(6)}  ${r.nimi ?? ''}`);
}
if (!vietavat.length) {
  console.error('VIRHE: ei yhtään vietävää nostoa — tarkista kaupunki ja saapumisen odotus.');
  process.exit(1);
}
if (KUIVA) process.exit(0);

const polku = join(JUURI, 'js', 'packs', `nostoankkurit-${ISO.toLowerCase()}.js`);
const vanha = readFileSync(polku, 'utf8');
const rivit = vietavat
  .map((r) => `  '${r.avain}': { lat: ${r.lat.toFixed(6)}, lng: ${r.lng.toFixed(6)} },`)
  .join('\n');
const paiva = new Date().toISOString().slice(0, 10);
const uusi = vanha
  .replace(/export const NOSTOANKKURIT_\w+ = \{[\s\S]*?\n\};/, (o) => o.split('{')[0]
    + `{\n${rivit}\n};`)
  .replace(/_KEHYS = \{[^}]*\};/, `_KEHYS = { ruutu: '${RUUTU.w}x${RUUTU.h}', dpr: 2, `
    + `vietty: '${paiva}' };`);
writeFileSync(polku, uusi);
console.log(`kirjoitettu ${polku} (${vietavat.length} ankkuria, kehys ${RUUTU.w}x${RUUTU.h})`);
