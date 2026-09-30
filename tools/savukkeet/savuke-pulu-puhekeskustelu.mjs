#!/usr/bin/env node
/*
 * SELAINSAVUKE: PULUN PUHEKESKUSTELU SANELUNAPISTA (omistaja 28.9.2026).
 *
 *   zsh -c 'source ~/.matkakirja-avaimet-koodaus.zsh; source ~/.zshrc; \
 *     PLAYWRIGHT_JS=…/node_modules/playwright/index.js nice -n 10 node tools/savukkeet/savuke-pulu-puhekeskustelu.mjs'
 *
 * OIKEA vastaus ja OIKEA puhe: Pöllö-worker (tools/pollo/worker.js) ajetaan
 * paikallisena HTTP-palvelimena (virtaus säilyy, Sonnet + xAI-puhe avaimet
 * ympäristöstä), ja peli ohjataan siihen (js/packs/pollo-asetukset.js
 * palvellaan muutettuna). Sanelu on tynkä: SpeechRecognition "sanoo"
 * kysymyksen 1,2 s:ssa ja päättyy (kuten Applen tunnistus lauseen lopussa).
 * Kaiutinvipu on POIS: saneltu kysymys luetaan silti.
 *
 * VÄITTEET:
 *   1. Tilarivi: Kuuntelen… → Mietin… → Puhun… → tyhjä (valmis), samassa paikassa.
 *   2. Vastaus kuuluu (Puhun), vaikka kaiutinvipu on pois.
 *   3. Mikki puheen aikana hiljentää Pulun (toinen kierros).
 *   4. Kirjoitettu kysymys vivun ollessa pois: ei puhetta.
 * Mittari: kysymyksen lähdöstä (sanelun loppu) ensimmäiseen ääneen.
 */
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { avaaChromium } from '../selain.mjs';

const JUURI = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
const ULOS = '/Users/Shared/Claude/proto-3d/lokit/pulu-puhekeskustelu';
mkdirSync(ULOS, { recursive: true });
for (const avain of ['ANTHROPIC_API_KEY', 'XAI_API_KEY']) {
  if (!process.env[avain]) { console.error(`${avain} puuttuu ympäristöstä.`); process.exit(2); }
}
const KYSYMYS = process.env.KYSYMYS ?? 'Mitä Ateenassa kannattaa syödä?';

const { default: worker } = await import(pathToFileURL(join(JUURI, 'tools/pollo/worker.js')).href);
const KV = new Map();
const kaynnista = (kasittelija) => new Promise((ok) => {
  const p = createServer(kasittelija);
  p.listen(0, '127.0.0.1', () => ok(p));
});
let PELI = '';
const KOODI = 'savukekoodi';
const env = () => ({
  POLLO_ORIGINIT: PELI, ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY, XAI_API_KEY: process.env.XAI_API_KEY,
  POLLO_KEHITTAJAKOODI: KOODI,
  // Sama malli kuin tuotannossa (tools/pollo/wrangler.jsonc POLLO_MALLI): ilman tätä worker käytti
  // oletusta (Haiku), ja viivemittaus ei vastannut tuotantoa (Natiivi-UI 28.9.2026).
  POLLO_MALLI: process.env.POLLO_MALLI || 'claude-sonnet-5-5',
  POLLO_KV: { async get(k) { return KV.get(k) ?? null; }, async put(k, v) { KV.set(k, v); } },
});
const kulut = { vastaus: 0, puhe: 0, puheMerkit: 0 };
const workerPalvelin = await kaynnista(async (req, res) => {
  const palat = [];
  for await (const p of req) palat.push(p);
  const runko = palat.length ? Buffer.concat(palat) : undefined;
  try {
    const tehtava = runko ? JSON.parse(runko.toString('utf8'))?.tehtava : null;
    if (tehtava === 'puhe') { kulut.puhe += 1; kulut.puheMerkit += String(JSON.parse(runko).teksti ?? '').length; }
    else if (tehtava) kulut.vastaus += 1;
  } catch { /* ei JSONia */ }
  const vastaus = await worker.fetch(new Request(`http://127.0.0.1${req.url}`, {
    method: req.method, headers: req.headers, body: req.method === 'POST' ? runko : undefined, duplex: 'half',
  }), env(), { waitUntil: () => {} });
  res.writeHead(vastaus.status, Object.fromEntries(vastaus.headers));
  if (vastaus.body) Readable.fromWeb(vastaus.body).pipe(res);
  else res.end();
});
const WORKER = `http://127.0.0.1:${workerPalvelin.address().port}`;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const pelipalvelin = await kaynnista((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  let sisalto = readFileSync(polku);
  if (suht === 'js/packs/pollo-asetukset.js') {
    sisalto = Buffer.from(sisalto.toString('utf8').replace(/https:\/\/matkakirja-pollo\.[a-z0-9.-]+\.workers\.dev/g, WORKER));
  }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
PELI = `http://127.0.0.1:${pelipalvelin.address().port}`;

const selain = await avaaChromium({
  args: ['--autoplay-policy=no-user-gesture-required', '--disable-features=AudioServiceOutOfProcess'],
});
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push(ok);
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};
const ctx = await selain.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true, serviceWorkers: 'block' });
const s = await ctx.newPage();
const virheet = [];
s.on('pageerror', (e) => virheet.push(String(e)));
await s.route((u) => !u.href.startsWith(PELI) && !u.href.startsWith(WORKER), (r) => r.abort());
await s.addInitScript(({ koodi, kysymys }) => {
  try {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-pollo-kehittajakoodi', koodi);
    localStorage.setItem('matkakirja-puhe-kehittaja', koodi);
    localStorage.removeItem('matkakirja-pollo-aani'); // kaiutinvipu pois
  } catch { /* yksityinen */ }
  // Sanelutynkä: kuulee kysymyksen 1,2 s:ssa ja päättyy itse (continuous=false).
  window.__sanelu = { kysymys, lopetettu: null };
  class Tynka {
    start() {
      setTimeout(() => this.onaudiostart?.(), 150);
      setTimeout(() => this.onresult?.({ results: [[{ transcript: window.__sanelu.kysymys }]] }), 900);
      setTimeout(() => { window.__sanelu.lopetettu = performance.now(); this.onend?.(); }, 1200);
    }
    stop() { this.onend?.(); }
    abort() { this.onend?.(); }
  }
  window.SpeechRecognition = Tynka;
  window.webkitSpeechRecognition = Tynka;
  // Tilarivin historia aikaleimoin.
  window.__tilat = [];
  new MutationObserver(() => {
    const t = document.querySelector('.pollo-sanelu-tila')?.textContent ?? '';
    const v = window.__tilat.at(-1);
    if (!v || v[0] !== t) window.__tilat.push([t, performance.now()]);
  }).observe(document, { subtree: true, childList: true, characterData: true });
}, { koodi: KOODI, kysymys: KYSYMYS });

await s.goto(`${PELI}/index.html?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await s.waitForFunction(() => [...document.querySelectorAll('button')].some((b) => /aloita seikkailu/i.test(b.textContent)), null, { timeout: 120000 });
await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
await s.waitForTimeout(2500);
await s.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
});
await s.waitForTimeout(3000);
await s.keyboard.press('Escape');
await s.evaluate(() => { document.querySelector('dialog[open]')?.close?.(); });
// Kaupunkiesittely ("ATEENA") ehtii pois ennen kuvia.
await s.waitForTimeout(7000);
await s.evaluate(() => {
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length < 4 && /MISSÄ KESKUSTELU/i.test(el.textContent ?? '') && !el.closest('.pollo-paneeli')) {
      (el.closest('[class*="traileri"], [class*="esittely"], [class*="nimi"]') ?? el).style.display = 'none';
    }
  }
});
await s.evaluate(() => document.querySelector('.pollo-nappi')?.click());
await s.waitForTimeout(1500);

const kuva = (n) => s.screenshot({ path: join(ULOS, `puhekeskustelu-iphone-${n}.png`) });
const rajaKuva = async (n) => {
  const r = await s.evaluate(() => document.querySelector('.pollo-paneeli')?.getBoundingClientRect()?.toJSON());
  if (r) await s.screenshot({ path: join(ULOS, `puhekeskustelu-iphone-${n}.png`), clip: { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(393, r.width), height: Math.min(852 - r.y, r.height) } });
  else await kuva(n);
};

// Kierros 1: sanelu → vastaus puheena loppuun asti.
await s.evaluate(() => document.querySelector('.pollo-mikki')?.click());
await s.waitForTimeout(500);
await rajaKuva('1-kuuntelen');
await s.waitForFunction(() => /Mietin/.test(document.querySelector('.pollo-sanelu-tila')?.textContent ?? ''), null, { timeout: 5000 }).catch(() => {});
await s.waitForTimeout(450);
await rajaKuva('2-mietin');
await s.waitForFunction(() => /Puhun/.test(document.querySelector('.pollo-sanelu-tila')?.textContent ?? ''), null, { timeout: 30000 }).catch(() => {});
await s.waitForTimeout(600);
await rajaKuva('3-puhun');
await s.waitForFunction(() => !document.querySelector('.pollo-sanelu-tila')?.textContent, null, { timeout: 90000 }).catch(() => {});
await s.waitForTimeout(300);
await rajaKuva('4-valmis');
const k1 = await s.evaluate(async () => ({
  tilat: window.__tilat.map(([t, a]) => [t, Math.round(a)]),
  lopetettu: Math.round(window.__sanelu.lopetettu),
  viive: (await import('/js/pollo.js')).polloPuheTila().viive,
  vipu: localStorage.getItem('matkakirja-pollo-aani'),
  vastaus: [...document.querySelectorAll('.pollo-virta .pollo-kupla, .pollo-virta [class*="pollo-pollo"]')].map((k) => k.textContent.trim()).filter(Boolean).at(-1)?.slice(0, 160),
}));
console.log(JSON.stringify(k1, null, 1));
const jarjestys = k1.tilat.map(([t]) => (/Kuuntelen/.test(t) ? 'K' : /Mietin/.test(t) ? 'M' : /Puhun/.test(t) ? 'P' : t === '' ? '_' : '?')).join('');
vaadi('tilarivi Kuuntelen → Mietin → Puhun → valmis samassa paikassa', /K[^M]*M[^P]*P+_$/.test(jarjestys.replace(/\?/g, '')), jarjestys);
vaadi('vastaus kuuluu vaikka kaiutinvipu on pois', k1.vipu !== '1' && jarjestys.includes('P'), `vipu ${k1.vipu}`);
const mietin = k1.tilat.find(([t]) => /Mietin/.test(t))?.[1];
const puhun = k1.tilat.find(([t]) => /Puhun/.test(t))?.[1];
console.log(`VIIVE sanelun lopusta ensimmäiseen ääneen: ${puhun && k1.lopetettu ? puhun - k1.lopetettu : '?'} ms (Pöllön mittari kysymyksen lähdöstä: ${k1.viive} ms)`);

// Kierros 2: mikki puheen aikana hiljentää.
await s.evaluate(() => { window.__tilat = []; window.__sanelu.kysymys = 'Kerro lyhyesti Akropoliista.'; });
await s.evaluate(() => document.querySelector('.pollo-mikki')?.click());
await s.waitForFunction(() => /Puhun/.test(document.querySelector('.pollo-sanelu-tila')?.textContent ?? ''), null, { timeout: 30000 }).catch(() => {});
await s.waitForTimeout(800);
console.log('ennen hiljennystä', JSON.stringify(await s.evaluate(async () => ({ ...(await import('/js/pollo.js')).polloPuheTila(), mikit: document.querySelectorAll('.pollo-mikki').length }))));
await s.evaluate(() => document.querySelector('.pollo-mikki')?.click());
await s.waitForTimeout(600);
const k2 = await s.evaluate(async () => {
  const { lukijaLukee } = await import('/js/lukija.js');
  return { tila: document.querySelector('.pollo-sanelu-tila')?.textContent ?? '', lukee: lukijaLukee(), nimi: document.querySelector('.pollo-mikki')?.getAttribute('aria-label') };
});
vaadi('mikki puheen aikana hiljentää Pulun', !k2.lukee && !/Puhun|Mietin/.test(k2.tila) && k2.nimi === 'Kysy ääneen', JSON.stringify(k2));

// Kierros 3: kirjoitettu kysymys, vipu pois → ei puhetta.
await s.waitForTimeout(20000);
await s.evaluate(() => { window.__tilat = []; });
await s.evaluate(() => {
  const kentta = document.querySelector('.pollo-kentta');
  kentta.value = 'Mikä on Ateenan vanhin tori?';
  kentta.closest('form')?.requestSubmit();
});
await s.waitForTimeout(15000);
const k3 = await s.evaluate(async () => {
  const { lukijaLukee } = await import('/js/lukija.js');
  return { lukee: lukijaLukee(), tilat: window.__tilat.map(([t]) => t) };
});
vaadi('kirjoitettu kysymys vivun ollessa pois: ei puhetta eikä puhetiloja', !k3.lukee && !k3.tilat.some((t) => /Mietin|Puhun/.test(t)), JSON.stringify(k3));
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' / '));
console.log(`KULUT: vastauspyyntöjä ${kulut.vastaus}, puhepyyntöjä ${kulut.puhe} (${kulut.puheMerkit} mrk)`);
await selain.close();
workerPalvelin.close();
pelipalvelin.close();
const hylatyt = tulokset.filter((x) => !x).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(hylatyt ? 1 : 0);
