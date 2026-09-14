/*
 * SAVUKE: ESTETTY ÄÄNIHAKU EI SAA ESTÄÄ PELIN KÄYNNISTYSTÄ.
 *
 * Ääni on koriste, peli on pääasia. sw.js:n `esilataaYdinaanet()` hakee
 * 26 ydinääntä ämpäristä ASENNUKSEN SISÄLLÄ (`install` → `waitUntil`),
 * joten jos nouto ei palaa, `self.skipWaiting()` jää ajamatta eikä
 * palvelutyöntekijä koskaan aktivoidu — ja silloin peli ei käynnisty
 * offline lainkaan.
 *
 * Tämä savuke mittaa sen oikeassa selaimessa: media.matkakirja.app
 * ohjataan palvelimeen, joka OTTAA TCP-YHTEYDEN VASTAAN MUTTEI VASTAA
 * KOSKAAN (juuri tämä on estetyn tai kadonneen ämpärin pahin muoto —
 * virhettä ei tule, vain hiljaisuus).
 *
 * Vartiot:
 *  1. Peli tulee näkyviin alle 10 sekunnissa — index.html:n
 *     varaventtiili (index.html, setTimeout 10000) on se raja, jonka
 *     jälkeen latausruutu väistyy VAIKKA peliä ei olisi, eli pelaaja
 *     näkisi tyhjän kehyksen.
 *  2. Latausruudun poisti peli (js/main.js paataPaivitysruutu) eikä
 *     varaventtiili.
 *  3. Palvelutyöntekijä pääsee tilaan `activated`: asennus valmistuu
 *     aikakatkaisun ansiosta, vaikka yksikään ääni ei latautuisi.
 *  4. Ei yhtään kaatavaa JS-poikkeusta.
 *  5. Verkon katkettua peli käynnistyy offline — tämä on se vartio,
 *     joka ennen korjausta EI mennyt läpi: ilman aktivoitunutta
 *     työntekijää sivu ei auennut ollenkaan.
 *
 * ÄÄNTÄ EI MUUTETA: savuke ei koske yhteenkään äänitiedostoon eikä
 * generoi mitään — se vain estää noudon verkkotasolla.
 *
 * MUU MEDIA VASTAA 404:llä tarkoituksella: pelin omat KUVApyynnöt
 * samaan isäntään jäisivät nekin roikkumaan, jolloin sivun `load`
 * viivästyisi ~46 sekuntia (mitattu) eikä savuke mittaisi enää ääntä
 * vaan kuvia. Äänipolku `/audio/` jätetään sieppaamatta, jotta se
 * menee oikeasti jumittuvaan sokettiin asti.
 *
 *   node tools/savukkeet/savuke-aanilataus.mjs [--nimio=jalkeen]
 *
 * Kuvat: docs/raportit/kuvat/aanilataus-<nimio>-*.png
 */
import http from 'node:http';
import net from 'node:net';
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const NIMIO = (process.argv.find((a) => a.startsWith('--nimio=')) ?? '--nimio=jalkeen').split('=')[1];
const KUVAT = join(JUURI, 'docs/raportit/kuvat');
mkdirSync(KUVAT, { recursive: true });

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
  if (!existsSync(polku) || statSync(polku).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream', 'cache-control': 'max-age=600' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
const PORTTI = palvelin.address().port;

// Jumittuva ämpäri: yhteys aukeaa, vastausta ei tule koskaan.
let aaniPyynnot = 0;
const jumi = net.createServer((soketti) => { aaniPyynnot += 1; soketti.on('error', () => {}); });
await new Promise((ok) => jumi.listen(0, '127.0.0.1', ok));
const JUMIPORTTI = jumi.address().port;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium/chrome-linux/chrome',
  args: ['--no-sandbox', '--no-proxy-server',
    // Ulkomaailma pois: vain peli ja jumittuva ämpäri vastaavat.
    `--host-resolver-rules=MAP media.matkakirja.app 127.0.0.1:${JUMIPORTTI}, MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`],
}).catch(async () => chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--no-proxy-server',
    `--host-resolver-rules=MAP media.matkakirja.app 127.0.0.1:${JUMIPORTTI}, MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`],
}));
const konteksti = await selain.newContext({ serviceWorkers: 'allow', viewport: { width: 900, height: 640 } });
// Muu media 404:ään heti (ks. tiedoston alun perustelu). Äänipolku jää
// koskematta, jotta se päätyy jumittuvaan sokettiin.
await konteksti.route(
  (url) => url.hostname === 'media.matkakirja.app' && !url.pathname.startsWith('/audio/'),
  (route) => route.fulfill({ status: 404, body: '' }).catch(() => {}),
);

const sivu = await konteksti.newPage();
await sivu.addInitScript(() => {
  window.__mitta = { alku: Date.now(), mk: 0, ruutu: 0 };
  const alku = window.__mitta.alku;
  let arvo;
  Object.defineProperty(window, 'matkakirja', {
    configurable: true,
    get() { return arvo; },
    set(v) { if (!window.__mitta.mk) window.__mitta.mk = Date.now() - alku; arvo = v; },
  });
});
const poikkeukset = [];
sivu.on('pageerror', (e) => poikkeukset.push(String(e).slice(0, 160)));

/*
 * Kaappaus CDP:llä eikä page.screenshotilla: Playwright odottaa
 * kaappauksen alussa `document.fonts.ready`-lupausta, ja kun ulkoiset
 * kirjasinpalvelimet on katkaistu (tai verkko on poikki), se lupaus ei
 * ratkea — odotus umpeutui 30 sekuntiin eikä offline-todistetta saatu
 * lainkaan. Page.captureScreenshot ottaa kuvan siitä, mitä ruudulla on.
 */
const cdp = await konteksti.newCDPSession(sivu);
const kaappaa = async (nimi) => {
  const polku = join(KUVAT, nimi);
  // Pieni tasaantuminen: latausruudun häivytys kestää hetken, eikä
  // todisteeksi haluta puolittain läpinäkyvää ruutua.
  await sivu.waitForTimeout(1200);
  try {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(polku, Buffer.from(data, 'base64'));
  } catch (e) { console.log(`(kaappaus ${nimi} ei onnistunut: ${String(e).split('\n')[0]})`); }
};

const OSOITE = `http://127.0.0.1:${PORTTI}/`;
const lue = async () => sivu.evaluate(async () => {
  const reg = await navigator.serviceWorker.getRegistration().catch(() => null);
  const ver = reg ? (reg.installing ? 'installing' : reg.waiting ? 'waiting' : reg.active ? reg.active.state : '-') : '-';
  let aania = 0;
  try {
    const nimet = await caches.keys();
    if (nimet.includes('matkakirja-aanet-v1')) aania = (await (await caches.open('matkakirja-aanet-v1')).keys()).length;
  } catch { /* ohi */ }
  const ruutu = document.getElementById('paivitysruutu');
  return { ver, aania, mk: window.__mitta?.mk ?? 0,
    ruutuNakyy: !!ruutu && !ruutu.hidden,
    onPeli: typeof window.matkakirja === 'object' && window.matkakirja !== null };
}).catch(() => ({ ver: '-', aania: 0, mk: 0, ruutuNakyy: true, onPeli: false }));

await sivu.goto(OSOITE, { waitUntil: 'commit' });

// 1–2: käynnistys varaventtiilin rajan sisällä.
// TYHJÄ KEHYS = hetki, jona latausruutu on poissa mutta peliä ei ole.
// Juuri sen varaventtiili (index.html, 10 s) tuottaa, jos käynnistys ei
// valmistu — ja juuri sitä root näki. Vartio 2 vahtii, ettei tuota
// hetkeä synny kertaakaan.
let tila = await lue();
let tyhjaKehys = 0;
const raja1 = Date.now() + 20000;
const alku1 = Date.now();
while (Date.now() < raja1 && !tila.onPeli) {
  if (!tila.ruutuNakyy && !tila.onPeli) tyhjaKehys = Date.now() - alku1;
  await sivu.waitForTimeout(200);
  tila = await lue();
}
vaadi('peli tulee näkyviin vaikka äänihaut jumittavat', tila.onPeli && tila.mk > 0 && tila.mk < 10000,
  `window.matkakirja ${tila.onPeli ? `${tila.mk} ms` : 'jäi syntymättä'}`);
vaadi('tyhjää kehystä ei synny (latausruutu ei väisty ilman peliä)', tyhjaKehys === 0,
  `latausruutu oli poissa ilman peliä ${tyhjaKehys} ms kohdalla`);
await kaappaa(`aanilataus-${NIMIO}-kaynnistys.png`);

// 3: asennus valmistuu aikakatkaisun ansiosta.
const raja2 = Date.now() + 120000;
while (Date.now() < raja2 && tila.ver !== 'activated') { await sivu.waitForTimeout(500); tila = await lue(); }
vaadi('palvelutyöntekijä aktivoituu vaikka yksikään ääni ei latautuisi', tila.ver === 'activated',
  `tila jäi arvoon "${tila.ver}" — asennus ei valmistunut`);
vaadi('äänikoriin ei jäänyt vajaita ääniä', tila.aania === 0, `korissa ${tila.aania} ääntä`);
vaadi('käynnistyksestä ei jää kaatavaa poikkeusta', poikkeukset.length === 0, poikkeukset.join(' | '));

// 5: offline-käynnistys.
await konteksti.setOffline(true);
let offlineVirhe = null;
try {
  await sivu.goto(OSOITE, { waitUntil: 'commit', timeout: 20000 });
} catch (e) { offlineVirhe = String(e).split('\n')[0]; }
let offline = await lue();
const raja3 = Date.now() + 25000;
while (!offlineVirhe && Date.now() < raja3 && !offline.onPeli) { await sivu.waitForTimeout(200); offline = await lue(); }
vaadi('peli käynnistyy offline asennuksen jälkeen', !offlineVirhe && offline.onPeli && offline.mk < 10000,
  offlineVirhe ?? `window.matkakirja ${offline.onPeli ? `${offline.mk} ms` : 'jäi syntymättä'}`);
await kaappaa(`aanilataus-${NIMIO}-offline.png`);
await konteksti.setOffline(false);

console.log(`\nÄänipyyntöjä jumittuvaan ämpäriin: ${aaniPyynnot}`);
console.log(`Kuvat: docs/raportit/kuvat/aanilataus-${NIMIO}-kaynnistys.png, aanilataus-${NIMIO}-offline.png`);
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close(); palvelin.close(); jumi.close();
process.exit(lapi === kaikki ? 0 : 1);
