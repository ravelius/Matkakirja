/*
 * MITTA: NOSTOT EIVÄT LIIKU ZOOMATESSA, YKSI KOKO, EI PÄÄLLEKKÄISYYTTÄ
 * (Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 kohdat 1, 2, 4 ja 5).
 *
 * Kohdemitta, ei savukesarja: Pariisi 390 px kolmella zoomilla
 * (saapuminen, välizoomi, lähizoomi). Kolme väitettä:
 *
 *   1) ANKKURI EI LIIKU: sama nosto on samassa lat/lng-pisteessä
 *      kaikilla kolmella zoomilla (ero 0).
 *   2) EI PÄÄLLEKKÄISYYTTÄ: nostojen ja aihenostojen osumalaatikot
 *      (symboli + nimiö), kaupunkien nimikyltit ja pelinappula eivät
 *      limity millään zoomilla.
 *   3) YKSI KOKO: jokaisen elävän noston ja aihenoston mitta on sama
 *      kuin poltetun kartan noston (NOSTON_MITTA).
 *
 * VASTAKOE: `?nostoankkurit=0` palauttaa vanhan ladonnan ja limityksen.
 *
 * Ajo (Mac):
 *   PLAYWRIGHT_JS=… CHROMIUM="…" node tools/savukkeet/mittaa-nostoankkurit.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NOSTON_MITTA } from '../../js/pallolauta/nostot.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUTU = { w: 390, h: 844 };
/** Kolme zoomia: saapuminen (1,0), välizoomi ja lähizoomi. */
const ZOOMIT = [
  { nimi: 'saapuminen', osuus: 1 },
  { nimi: 'valizoomi', osuus: 0.6 },
  { nimi: 'lahizoomi', osuus: 0.34 },
];

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; mitta ohitetaan');
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

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

async function avaaSivu({ ankkurit = true } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: RUUTU.w, height: RUUTU.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne('pariisi'));
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
  const lippu = ankkurit ? '' : '&nostoankkurit=0&nostokoko=0';
  await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  // Saapuminen ajetaan loppuun: isoisän kuvasarja ja pulu kulkevat ruudun
  // poikki ensimmäiset 40 s (sama odotus kuin savuke-pariisi-lahizoom).
  await sivu.waitForTimeout(44000);
  return { ctx, sivu };
}

/** Kamera Pariisin päälle annettuun osuuteen saapumiskorkeudesta. */
async function zoomaa(sivu, osuus) {
  await sivu.evaluate(async (k) => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const c = ui.game.pack.cities.find((x) => x.id === 'pariisi');
    const a = l.asteet({ x: c.x, y: c.y });
    if (!window.__saapumiskorkeus) window.__saapumiskorkeus = l.pallo.pointOfView().altitude;
    l.pallo.pointOfView(
      { lat: a.lat, lng: a.lon, altitude: window.__saapumiskorkeus * k }, 0,
    );
    await new Promise((v) => setTimeout(v, 1800));
    window.matkakirja.ui.pallolauta.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 600));
  }, osuus);
}

/** Yhden zoomin lukema: merkit, laatikot, esteet. */
async function lue(sivu) {
  return sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const kotelo = document.querySelector('.pallolauta')?.getBoundingClientRect()
      ?? { left: 0, top: 0 };
    const merkit = l.nostot.osumat().map((o) => ({
      id: o.id,
      nimi: o.nimi ?? null,
      perhe: o.perhe,
      poltettu: Boolean(o.poltettu),
      kaupunki: Boolean(o.kaupunki),
      lat: o.lat,
      lng: o.lng,
      mitta: o.datum?.mitta ?? null,
    }));
    const laatikot = l.nostot.osumaLaatikot();
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x0: r.left - kotelo.left,
        y0: r.top - kotelo.top,
        x1: r.right - kotelo.left,
        y1: r.bottom - kotelo.top,
      };
    };
    const nimet = [...document.querySelectorAll('.pallolauta-nimi')]
      .filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => ({ nimi: el.textContent.trim(), ...rect(el) }));
    const nappula = [...document.querySelectorAll('.pallolauta-nappula, .pallolauta-pelaaja')]
      .filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => ({ nimi: 'nappula', ...rect(el) }));
    return {
      merkit, laatikot, nimet, nappula, osuus: l.uloimmanOsuus?.() ?? null,
    };
  });
}

async function kaappaa(sivu, nimi) {
  if (!KUVAKANSIO) return null;
  try {
    const polku = join(KUVAKANSIO, nimi);
    await sivu.screenshot({ path: polku, timeout: 15000 });
    return polku;
  } catch { return null; }
}

const { ctx, sivu } = await avaaSivu();
const lukemat = [];
for (const z of ZOOMIT) {
  // eslint-disable-next-line no-await-in-loop
  await zoomaa(sivu, z.osuus);
  // eslint-disable-next-line no-await-in-loop
  const tila = await lue(sivu);
  // eslint-disable-next-line no-await-in-loop
  const kuva = await kaappaa(sivu, `nostoankkurit-${z.nimi}.png`);
  lukemat.push({ ...z, ...tila, kuva });
  tieto(`${z.nimi} merkkejä`, `${tila.merkit.length} (laatikoita ${tila.laatikot.length}, nimiä ${tila.nimet.length})`);
  if (kuva) tieto(`${z.nimi} kaappaus`, kuva);
}

/* ── 1) ANKKURI EI LIIKU ─────────────────────────────────────────── */
const elava = (m) => !m.poltettu && (m.perhe === 'nosto' || m.perhe === 'aihemerkki');
/*
 * KAUPUNKIMERKKI EI OLE NOSTO. Sen nimiö on omistajan oma 11,5 px
 * (PAATOKSET 25 kohta 2), eikä PAATOKSET 32 kohta 4 puhu siitä —
 * kohta 4 koskee nostopalloja ja niiden nimiöitä.
 */
const nosto = (m) => elava(m) && !m.kaupunki;
const perus = new Map(lukemat[0].merkit.filter(elava).map((m) => [m.id, m]));
let suurinEro = 0;
let liikkuneita = 0;
for (const l of lukemat.slice(1)) {
  for (const m of l.merkit.filter(elava)) {
    const a = perus.get(m.id);
    if (!a) continue;
    const ero = Math.hypot(m.lat - a.lat, m.lng - a.lng);
    if (ero > suurinEro) suurinEro = ero;
    if (ero > 1e-9) liikkuneita += 1;
  }
}
tieto('suurin ankkurin ero (astetta)', p(suurinEro, 9));
vaadi('1 sama nosto samassa lat/lng-ankkurissa kaikilla zoomeilla',
  liikkuneita === 0, `liikkuneita ${liikkuneita}, suurin ero ${p(suurinEro, 6)}°`);

/* ── 2) EI PÄÄLLEKKÄISYYTTÄ ──────────────────────────────────────── */
/*
 * POLTETTU MUSTE EI OLE TÄMÄN ERÄN ASIA. Kaksi laattaan poltettua
 * nostoa (esim. *Camarguen hevoset* ja *Camarguenvarsa*) limittyvät
 * kuvassa, eikä sitä voi siirtää ilman uutta polttoa (R2-ajo). Elävä
 * muste väistää poltettua — se on tämän mitan väite; poltettu pari
 * raportoidaan erikseen.
 */
for (const l of lukemat) {
  const laatikot = [
    ...l.laatikot.map((r) => ({ nimi: r.nimi ?? r.id, poltettu: Boolean(r.poltettu), ...r })),
    ...l.nimet.map((r) => ({ ...r, poltettu: false })),
    ...l.nappula.map((r) => ({ ...r, poltettu: false })),
  ];
  const parit = [];
  let laatassa = 0;
  for (let i = 0; i < laatikot.length; i += 1) {
    for (let j = i + 1; j < laatikot.length; j += 1) {
      if (!limittyy(laatikot[i], laatikot[j])) continue;
      if (laatikot[i].poltettu && laatikot[j].poltettu) { laatassa += 1; continue; }
      parit.push(`${laatikot[i].nimi} × ${laatikot[j].nimi}`);
    }
  }
  tieto(`${l.nimi} limittyviä pareja`, `${parit.length}${parit.length ? ` (${parit.slice(0, 6).join('; ')})` : ''}; poltettu×poltettu ${laatassa}`);
  vaadi(`2 ${l.nimi}: limittyviä laatikkopareja 0`, parit.length === 0, `${parit.length} paria`);
}

/* ── 3) YKSI KOKO ────────────────────────────────────────────────── */
for (const l of lukemat) {
  const mitat = l.merkit.filter((m) => nosto(m) && Number.isFinite(m.mitta)).map((m) => m.mitta);
  const poikkeavat = mitat.filter((m) => Math.abs(m - NOSTON_MITTA) > 1e-6);
  tieto(`${l.nimi} mitat`, `${[...new Set(mitat.map((m) => p(m, 3)))].join(', ')} (poltettu ${p(NOSTON_MITTA, 3)})`);
  vaadi(`3 ${l.nimi}: kaikki nostot poltetun kartan kokoa`,
    mitat.length > 0 && poikkeavat.length === 0, `poikkeavia ${poikkeavat.length}`);
}

await ctx.close();

/* ── VASTAKOE: vanha ladonta palauttaa limityksen ─────────────────── */
const vastakoe = await avaaSivu({ ankkurit: false });
const vastaParit = [];
for (const z of ZOOMIT) {
  // eslint-disable-next-line no-await-in-loop
  await zoomaa(vastakoe.sivu, z.osuus);
  // eslint-disable-next-line no-await-in-loop
  const tila = await lue(vastakoe.sivu);
  // eslint-disable-next-line no-await-in-loop
  await kaappaa(vastakoe.sivu, `nostoankkurit-vastakoe-${z.nimi}.png`);
  const laatikot = [...tila.laatikot, ...tila.nimet, ...tila.nappula];
  let parit = 0;
  for (let i = 0; i < laatikot.length; i += 1) {
    for (let j = i + 1; j < laatikot.length; j += 1) if (limittyy(laatikot[i], laatikot[j])) parit += 1;
  }
  vastaParit.push({ nimi: z.nimi, parit, merkit: tila.merkit });
  tieto(`vastakoe ${z.nimi} limittyviä pareja`, parit);
}
const vastaPerus = new Map(vastaParit[0].merkit.filter(elava).map((m) => [m.id, m]));
let vastaLiikkui = 0;
for (const l of vastaParit.slice(1)) {
  for (const m of l.merkit.filter(elava)) {
    const a = vastaPerus.get(m.id);
    if (a && Math.hypot(m.lat - a.lat, m.lng - a.lng) > 1e-9) vastaLiikkui += 1;
  }
}
tieto('vastakoe: liikkuneita ankkureita', vastaLiikkui);
vaadi('V vastakoe ?nostoankkurit=0 näyttää limityksen palaavan',
  vastaParit.some((v) => v.parit > 0), 'vastakoe ei näyttänyt limitystä');
await vastakoe.ctx.close();

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
