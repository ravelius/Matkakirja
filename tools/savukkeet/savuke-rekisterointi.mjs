/*
 * Savuke: PALVELUTYÖNTEKIJÄN REKISTERÖINTI EI ODOTA ESTYNYTTÄ MEDIAA.
 *
 * Kirjattu vika (docs/raportit/siirto-2026-09-14-fablelle.md): kun
 * ämpäri (media.matkakirja.app) ei vastaa, pelin kuvapyynnöt jäävät
 * roikkumaan ja sivun `load` laukeaa vasta 46 sekunnin kohdalla.
 * Palvelutyöntekijä rekisteröitiin `load`issa, joten koko offline-tuki
 * odotti samat 46 sekuntia. Pelaaja ei näe tätä — peli on näkyvissä
 * 1–2 sekunnissa — mutta offline-tuen syntyminen viivästyy.
 *
 * VARTIOT:
 *   1. PELI NÄKYY NOPEASTI vaikka ämpäri jumittaa (alle 3 s).
 *   2. REKISTERÖINTI LÄHTEE ILMAN `load`IA, alle 8 sekunnissa.
 *   3. PALVELUTYÖNTEKIJÄ AKTIVOITUU samassa ajossa.
 *   4. VASTAKOE: sivun `load` on yhä estynyt (ei tule 20 sekunnissa) —
 *      eli este on todellinen eikä vartio 2 mittaa tervettä tilannetta.
 *   5. TERVE ÄMPÄRI EI MUUTU: kun media vastaa heti, rekisteröinti
 *      tapahtuu yhä `load`issa (alle 3 s), ei katon kuluttua.
 *
 * MITATTU 14.9.2026 (Chromium, 4 + 4 ajoa, paikallinen palvelin):
 *   ennen   jumi: peli 0,95–1,55 s  load 45,98–46,59 s  rek 45,98–46,59 s
 *   jälkeen jumi: peli 0,95–1,15 s  load ei tullut       rek 4,89–5,04 s
 *   jälkeen terve: peli 1,18–1,34 s load 1,28–1,47 s     rek 1,28–1,47 s
 *
 *   node tools/savukkeet/savuke-rekisterointi.mjs
 */
import http from 'node:http';
import net from 'node:net';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
  if (!existsSync(polku) || statSync(polku).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream', 'cache-control': 'max-age=600' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
const OSOITE = `http://127.0.0.1:${palvelin.address().port}/`;

// Jumittuva ämpäri: yhteys aukeaa, vastausta ei tule koskaan.
const jumi = net.createServer((s) => {
  s.on('error', () => {});
  const t = setTimeout(() => s.destroy(), 60000); t.unref();
});
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
    `--host-resolver-rules=MAP media.matkakirja.app 127.0.0.1:${JUMIPORTTI}, MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`],
}).catch(async () => chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--no-proxy-server',
    `--host-resolver-rules=MAP media.matkakirja.app 127.0.0.1:${JUMIPORTTI}, MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`],
}));

/**
 * Yksi lataus. `terve` tarkoittaa, että ämpäri vastaa heti 404:llä —
 * silloin mikään ei roiku ja `load` laukeaa normaalisti.
 */
async function aja({ terve = false, odotaMs = 20000 } = {}) {
  const ctx = await selain.newContext({ serviceWorkers: 'allow', viewport: { width: 900, height: 640 } });
  if (terve) {
    await ctx.route((url) => url.hostname === 'media.matkakirja.app',
      (route) => route.fulfill({ status: 404, body: '' }).catch(() => {}));
  }
  const sivu = await ctx.newPage();
  await sivu.addInitScript(() => {
    window.__m = { alku: Date.now(), mk: 0, load: 0, rek: 0 };
    const a = window.__m.alku; let arvo;
    Object.defineProperty(window, 'matkakirja', {
      configurable: true, get() { return arvo; },
      set(v) { if (!window.__m.mk) window.__m.mk = Date.now() - a; arvo = v; },
    });
    window.addEventListener('load', () => { window.__m.load = Date.now() - a; });
    if (navigator.serviceWorker) {
      const alkup = navigator.serviceWorker.register.bind(navigator.serviceWorker);
      navigator.serviceWorker.register = (...args) => {
        if (!window.__m.rek) window.__m.rek = Date.now() - a;
        return alkup(...args);
      };
    }
  });
  await sivu.goto(OSOITE, { waitUntil: 'commit' });
  const lue = () => sivu.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration().catch(() => null);
    const tila = reg ? (reg.installing ? 'installing' : reg.waiting ? 'waiting' : reg.active?.state ?? '-') : '-';
    return { tila, m: window.__m };
  }).catch(() => ({ tila: '-', m: {} }));
  const raja = Date.now() + odotaMs;
  let t = await lue();
  while (Date.now() < raja && t.tila !== 'activated') { await sivu.waitForTimeout(200); t = await lue(); }
  await Promise.race([ctx.close(), new Promise((r) => setTimeout(r, 5000))]);
  return { tila: t.tila, ...t.m };
}

const jumissa = await aja({ odotaMs: 20000 });
console.log(`jumittuva ämpäri: peli ${jumissa.mk} ms | load ${jumissa.load || 'ei tullut'} | rekisteröinti ${jumissa.rek} ms | tila ${jumissa.tila}`);
vaadi('peli tulee näkyviin vaikka ämpäri jumittaa', jumissa.mk > 0 && jumissa.mk < 3000,
  `window.matkakirja ${jumissa.mk || 'jäi syntymättä'} ms`);
vaadi('rekisteröinti lähtee ilman `load`-tapahtumaa', jumissa.rek > 0 && jumissa.rek < 8000,
  `rekisteröinti ${jumissa.rek || 0} ms — se odotti load-tapahtumaa`);
vaadi('palvelutyöntekijä aktivoituu samassa ajossa', jumissa.tila === 'activated',
  `tila jäi arvoon "${jumissa.tila}"`);
vaadi('VASTAKOE: `load` on yhä estynyt (este on todellinen)', !jumissa.load,
  `load laukesi ${jumissa.load} ms kohdalla — ämpäri ei ollutkaan jumissa`);

const terve = await aja({ terve: true, odotaMs: 20000 });
console.log(`terve ämpäri: peli ${terve.mk} ms | load ${terve.load} ms | rekisteröinti ${terve.rek} ms | tila ${terve.tila}`);
vaadi('terve ämpäri: rekisteröinti tapahtuu yhä `load`issa eikä katon kuluttua',
  terve.rek > 0 && terve.rek < 3000 && terve.load > 0 && Math.abs(terve.rek - terve.load) < 250,
  `load ${terve.load} ms, rekisteröinti ${terve.rek} ms`);

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close(); palvelin.close(); jumi.close();
process.exit(lapi === kaikki ? 0 : 1);
