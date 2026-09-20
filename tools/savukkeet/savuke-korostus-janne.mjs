/*
 * Savuke: KOROSTUKSEN PITKÄ JANA PIIRTYY KESKELTÄKIN — Gironden ja
 * Médocin rannan kaksoisviiva (omistaja 20.9.2026).
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-korostus-janne.mjs \
 *     [--kuvat <kansio>]
 *
 * OMISTAJA (Raamattu, Gironde 20.9.2026; kaappaukset docs/raportit/
 * kaappaukset/omistaja-20260920/gironde-kaksoisviiva-v1974.webp ja
 * gironde-tayton-reuna-v1979.png), sanatarkasti: *"paksu tumma kehä
 * seuraa suistoa ja toinen viiva kulkee suorana"* ja *"en usko etta
 * viivassa on vika vaan sen paalle tulee jotain muuta"*.
 *
 * === MITATTU JUURISYY (Karttaseppä 20.9.2026, Chromium) ===========
 *
 * Kaappauksissa Médocin Atlantin ranta Pointe de Gravesta Arcachoniin
 * on ilman korostusta JA ilman rantaviivaa; näkyvissä on vain laatan
 * meren täytön pehmeä reuna — se on "toinen viiva". Korostus kuitenkin
 * SISÄLTÄÄ rannan: sekä korostuksessa että rannikkosolussa on yksi
 * 0,50 asteen (55 km) suora jana −1,199 E 45,121 N → −1,260 E
 * 44,627 N (Côte d'Argent on oikeasti suora). LineSegments2 piirtää
 * janan suorana jänteenä, ja jänne painuu pallon pinnan alle keskeltä
 * R · (1 − cos(θ/2)) = 9,5 · 10⁻⁶ · R — laattakerroksen alle, jolloin
 * syvyystesti leikkaa viivan keskeltä pois. Mitattu: jänteen keskellä
 * 0 tummaa pikseliä 24 × 24:stä; depthTest pois → 206. Lyhyet janat
 * (0,16–0,21 astetta) piirtyivät kummallakin asetuksella.
 *
 * KORJAUS: js/pallovektorit.js vektorijanat jakaa yli
 * VEKTORIT_JANAN_ENIMMAISPITUUS_AST (0,1 astetta) pitkät janat
 * paloiksi, joiden päät ovat pinnalla.
 *
 * === VÄITTEET ======================================================
 *
 *   V1  JÄNTEEN KESKIKOHTA (−1,2295 E 44,874 N) on korostuksen mustetta:
 *       24 × 24 laitepikselin leikkeessä vähintään TUMMIA_VAHINTAAN
 *       pikseliä, joiden kirkkaus < TUMMUUS_RAJA.
 *   V2  ARCACHONIN KÄRKI (−1,245 E 44,70 N) samoin — sama jana, toinen
 *       pää.
 *   V3  VERTAILU: lyhyen janan kohta (−1,150 E 45,20 N) on mustetta
 *       — kuten ennenkin; jos tämä putoaa, mittari ei löydä korostusta
 *       lainkaan (kamera, lataus) eikä V1 kerro mitään.
 *   V4  VASTAKOE: korostus piilotettuna (olio.visible = false) jänteen
 *       keskikohdassa on ALLE TUMMIA_VAHINTAAN tummaa pikseliä — musta
 *       tuli siis korostuksesta, ei rantaviivasta eikä laatasta.
 *   V5  MITTARI: korostuksen janamäärä on suurempi kuin alkuperäisten
 *       välien määrä olisi (jakaminen on käytössä) — luetaan
 *       vektorikerroksen mittarista korostusJanoja > 0.
 *
 * Ruutu 700 × 1000 dpr 2 (iPadin pystykuva pienennettynä). Kamera
 * 45,45 N −0,95 E korkeus 0,055 — sama kuin omistajan kaappauksessa
 * (Biskajanlahti ja Dune du Pilat ruudulla).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä savuke OHITETAAN (poistuu 0:lla).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const KUVAT = argv.includes('--kuvat') ? argv[argv.indexOf('--kuvat') + 1] : (argv[0] && !argv[0].startsWith('--') ? argv[0] : null);

/** Kirkkaus (r+g+b)/3, jonka alle pikseli on rajan mustetta (#6b5539 → 83). */
const TUMMUUS_RAJA = 120;
/*
 * LEIKE ON VAAKASUUNTAAN LEVEÄ: Médocin ranta on ruudulla lähes pysty,
 * ja pallon getScreenCoords osuu 10–22 laitepikseliä viivan viereen
 * (mitattu 20.9.2026; sama luokka kuin js/pallolaatat.js pinnanPisteen
 * perustelussa). 80 × 16 laitepikselin leike löytää viivan, ja
 * vastakoe (korostus piilossa) lukee samassa leikkeessä 0 — ohut
 * rantaviiva (peitto 0,58) ei ylitä tummuusrajaa.
 */
/** Tummia pikseleitä leikkeessä vähintään: 3 css-px:n viiva 16 rivillä ≈ 6 × 16 = 96 laitepikseliä, puolet riittää. */
const TUMMIA_VAHINTAAN = 40;
const LEIKE_LEVEYS = 80;
const LEIKE_KORKEUS = 16;

const KOHDAT = [
  { avain: 'janteen-keski', nimi: 'jänteen keskikohta (Médoc)', lon: -1.2295, lat: 44.874, vaite: 'V1' },
  { avain: 'arcachon', nimi: 'Arcachonin kärki', lon: -1.245, lat: 44.70, vaite: 'V2' },
  { avain: 'lyhyt', nimi: 'lyhyen janan kohta (Montalivet)', lon: -1.150, lat: 45.20, vaite: 'V3' },
];

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
const lopeta = () => {
  palvelin.close();
  console.log(`\n${lapi}/${kaikki} läpi`);
  process.exit(lapi === kaikki ? 0 : 1);
};

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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--disable-dev-shm-usage'],
});
const ctx = await selain.newContext({
  viewport: { width: 700, height: 1000 },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
  hasTouch: true,
  isMobile: true,
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
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
  route.fulfill({
    status: 200,
    contentType: v.tyyppi ?? 'application/octet-stream',
    body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) { await selain.close(); lopeta(); }
await sivu.waitForTimeout(2500);
/*
 * SAAPUMISEN VALOKUVAT OHITETAAN NAPILLA, EI PIILOTETA TYYLILLÄ: kuvien
 * ajaksi kartta on sumennettu ja himmennetty (fokusvirta-isokuva), ja
 * pelkkä elementtien piilotus jättäisi sumennuksen kankaalle — mitattu:
 * 3 px:n viiva luki tummimmillaan 121 (raja 120). Ohita-nappi
 * (js/fokusvirta.js naytaOhitaNappi) ilmestyy vasta kuvan tultua, joten
 * sitä painetaan aina kun se on ruudulla.
 */
await sivu.evaluate(() => {
  window.__ohituksia = 0;
  setInterval(() => {
    const ui = window.matkakirja?.ui;
    const nappi = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
    if (nappi) { nappi.click(); window.__ohituksia += 1; }
  }, 150);
});
await sivu.waitForTimeout(3000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
/* Kortit, nimiöt ja pulu pois mittarin tieltä (sama sääntö kuin savuke-kerma-reuna.mjs). */
await sivu.addStyleTag({
  content: `body *:not(:has(canvas)):not(canvas) { visibility: hidden !important; }
            canvas { visibility: visible !important; }`,
});
const tila = await sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView({ lat: 45.45, lng: -0.95, altitude: 0.055 }, 0);
  await new Promise((v) => setTimeout(v, 3000));
  l.ladoHeti?.();
  await new Promise((v) => setTimeout(v, 6000));
  const m = l.vektorit?.()?.mittarit?.() ?? null;
  return { ohituksia: window.__ohituksia, pov: l.pallo.pointOfView(), korostus: m?.korostus ?? null, korostusJanoja: m?.korostusJanoja ?? 0, pudotettuja: m?.korostusPudotettuja ?? null };
});
tieto('kamera', `${JSON.stringify(tila.pov)}, saapumiskuvia ohitettu ${tila.ohituksia}`);
tieto('korostus', `${tila.korostus}, janoja ${tila.korostusJanoja}, pudotettuja ${tila.pudotettuja}`);
vaadi('V5 korostus on FRA ja siinä on janoja', tila.korostus === 'FRA' && tila.korostusJanoja > 0, JSON.stringify(tila));

/*
 * KAAPPAUS PLAYWRIGHTIN OMALLA screenshotilla LAITEPIKSELEINÄ (1400 ×
 * 2000): CDP:n Page.captureScreenshot antoi isMobile-emulaatiossa
 * CSS-pikselikuvan, jonka koordinaatisto oli 14 px sivussa
 * getScreenCoordsista (mitattu 20.9.2026) — mittari osui viivan viereen.
 */
const kaappaa = () => sivu.screenshot();
const ruutupiste = (lon, lat) => sivu.evaluate(([lo, la]) => {
  const s = window.matkakirja.ui.pallolauta.pallo.getScreenCoords(la, lo);
  return { x: s.x, y: s.y };
}, [lon, lat]);
/** Tummien pikselien määrä LEIKE_LEVEYS × LEIKE_KORKEUS laitepikselin ruudussa pisteen ympärillä. */
const tummia = (kuva, p) => {
  // getScreenCoords antaa CSS-pikselit; kuva on laitepikseleinä.
  const dpr = kuva.width / 700;
  const cx = Math.round(p.x * dpr); const cy = Math.round(p.y * dpr);
  let n = 0; let tummin = 999;
  for (let y = cy - LEIKE_KORKEUS / 2; y < cy + LEIKE_KORKEUS / 2; y += 1) {
    for (let x = cx - LEIKE_LEVEYS / 2; x < cx + LEIKE_LEVEYS / 2; x += 1) {
      if (x < 0 || y < 0 || x >= kuva.width || y >= kuva.height) continue;
      const i = (y * kuva.width + x) * 4;
      const v = (kuva.data[i] + kuva.data[i + 1] + kuva.data[i + 2]) / 3;
      if (v < tummin) tummin = v;
      if (v < TUMMUUS_RAJA) n += 1;
    }
  }
  return { n, tummin };
};

const kuvaan = (nimi, puskuri) => {
  if (!KUVAT) return;
  mkdirSync(KUVAT, { recursive: true });
  writeFileSync(join(KUVAT, `${nimi}.png`), puskuri);
};

const ennen = decodePng(await (async () => { const b = await kaappaa(); kuvaan('korostus-janne', b); return b; })());
const pisteet = {};
for (const k of KOHDAT) {
  // eslint-disable-next-line no-await-in-loop
  pisteet[k.avain] = await ruutupiste(k.lon, k.lat);
  const t = tummia(ennen, pisteet[k.avain]);
  tieto(`${k.nimi} (${Math.round(pisteet[k.avain].x)}, ${Math.round(pisteet[k.avain].y)})`, `tummia ${t.n}/${LEIKE_LEVEYS * LEIKE_KORKEUS}, tummin ${t.tummin.toFixed(0)}`);
  vaadi(`${k.vaite} ${k.nimi} on korostuksen mustetta`, t.n >= TUMMIA_VAHINTAAN, `tummia ${t.n} < ${TUMMIA_VAHINTAAN}`);
}

/* V4 VASTAKOE: korostus piiloon, sama piste uudelleen. */
const piilotettu = await sivu.evaluate(async () => {
  let n = 0;
  window.matkakirja.ui.pallolauta.pallo.scene().traverse((o) => {
    if (o.userData?.pallovektorit?.laji === 'korostus') { o.visible = false; n += 1; }
  });
  await new Promise((v) => setTimeout(v, 600));
  return n;
});
const jalkeen = decodePng(await (async () => { const b = await kaappaa(); kuvaan('korostus-janne-vastakoe', b); return b; })());
const vasta = tummia(jalkeen, pisteet['janteen-keski']);
tieto('vastakoe: korostusolioita piilotettu', String(piilotettu));
tieto('vastakoe: jänteen keskikohta ilman korostusta', `tummia ${vasta.n}/${LEIKE_LEVEYS * LEIKE_KORKEUS}, tummin ${vasta.tummin.toFixed(0)}`);
vaadi('V4 vastakoe: ilman korostusta jänteen keskikohta ei ole mustetta', piilotettu > 0 && vasta.n < TUMMIA_VAHINTAAN, `piilotettu ${piilotettu}, tummia ${vasta.n}`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
lopeta();
