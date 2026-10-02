#!/usr/bin/env node
/*
 * SELAINSAVUKE: AVARUUSKÄVELY (Päätoimittaja 2.10.2026: web pariteettiin, natiivi malli; js/linssit/iss-kavely*.js).
 *
 *   node tools/savukkeet/savuke-avaruuskavely.mjs [--kuvat <kansio>] [--valmiit <_valmiit/avaruuskavely/v1>]
 *
 * WebKit, iPhone 393 × 852 ja iPad 834 × 1194 (DPR 2). media.matkakirja.app Noden kautta; kävelyn kuvat ja äänet
 * (linssit/avaruuskavely/v1, aanet/avaruuskavely/v1) paikallisesta vientikansiosta --valmiit, jos annettu (ennen
 * ämpärivientiä), muuten ämpäristä.
 *
 * VÄITTEET (kummallakin laitteella):
 *   1. Pulun taulussa rivi "Avaruuskävely"; kävely alkaa Cupolasta: ilmalukko, ohje "Napauta: avaa luukku", kerrokset.
 *   2. Napautus → ulos (kyyti ulkona, kenttä 70°) → 4 s → köysi ("Napauta: kiinnitä köysi"), paneeli piilossa.
 *   3. Napautus → auringonnousu → kelaus → Pulu (aurinko 24×) → kuva ("Napauta: ota kuva").
 *   4. Napautus → vertailukortti (oma kuva + NASA-kuva, kohde ja km).
 *   5. Napautus → takaisin → Cupola (ikkuna, kenttä 80°), kerrokset pois.
 *   6. Ei sivuvirheitä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const JUURI = resolve(valitsin('juuri', join(dirname(fileURLToPath(import.meta.url)), '..', '..')));
const ULOS = valitsin('kuvat', '/tmp/matkakirja-kaappaukset/avaruuskavely');
const VALMIIT = valitsin('valmiit', null);
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.woff2': 'font/woff2',
};
const VALIMUISTI = new Map();
const ulkohaku = (url) => {
  if (!VALIMUISTI.has(url)) {
    const paikallinen = VALMIIT && url.match(/media\.matkakirja\.app\/((linssit|aanet)\/avaruuskavely\/v1\/.+)$/);
    VALIMUISTI.set(url, paikallinen
      ? Promise.resolve(existsSync(join(VALMIIT, paikallinen[1]))
        ? { body: readFileSync(join(VALMIIT, paikallinen[1])), tyyppi: MIME[extname(paikallinen[1])] } : null)
      : fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
        .catch(() => null));
  }
  return VALIMUISTI.get(url);
};
const palvelin = createServer((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = Number(process.env.PORTTI) || 8764;
await new Promise((r) => palvelin.listen(PORTTI, r));

const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const selain = await paketti.webkit.launch();

const NAKYMAT = {
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 1194, height: 834 }, deviceScaleFactor: 2, hasTouch: true },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 });
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(800);
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
    for (let i = 0; i < 400 && ui.pallolinssi?.tunnus !== 'satelliitti'; i += 1) {
      await new Promise((r) => setTimeout(r, 25));
    }
  });
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.paljastus?.vaihe === 'paljastettu',
    null, { timeout: 20000 },
  ).catch(() => {});
  await s.waitForTimeout(1500);
}

const tila = (s) => s.evaluate(() => {
  const av = window.matkakirja.ui.pallolinssi?.kahva?.avaruus;
  const t = av?.tila?.() ?? {};
  const k = t.kyyti ?? {};
  const juuri = document.querySelector('.iss-kyyti');
  const kav = document.querySelector('.iss-kavely');
  const kerrokset = [...document.querySelectorAll('.iss-kavely-kerros')].filter((e) => !e.hidden && e.offsetParent !== null)
    .map((e) => e.dataset.nimi);
  return {
    tila: k.tila, siirtyy: k.siirtyy, fov: k.fov, kavely: k.kavely ?? null,
    paneeliNakyy: Boolean(juuri && !juuri.classList.contains('iss-kyyti-kavely')),
    kavelyNakyy: Boolean(kav && !kav.hidden),
    ohje: document.querySelector('.iss-kavely-ohje:not([hidden])')?.textContent ?? null,
    kerrokset,
    kortti: (() => {
      const kj = document.querySelector('.iss-kavely-korttijuuri');
      if (!kj || kj.hidden) return null;
      const kuvat = [...kj.querySelectorAll('.iss-kavely-kuva')].map((e) => e.style.backgroundImage.slice(0, 40));
      const tekstit = [...kj.querySelectorAll('.iss-kavely-teksti')].map((e) => e.textContent);
      return { kuvat, tekstit };
    })(),
    aika: k.aika ?? null,
  };
});

const odota = async (s, ehto, kattoMs = 15000) => {
  const alku = Date.now();
  let t = await tila(s);
  while (!ehto(t) && Date.now() - alku < kattoMs) { await s.waitForTimeout(250); t = await tila(s); }
  return t;
};

async function ajaNakyma(nimi) {
  const virheet = [];
  const konteksti = await selain.newContext({ ...NAKYMAT[nimi], serviceWorkers: 'block' });
  await konteksti.addInitScript(() => {
    try { localStorage.setItem('matkakirja-pulu-astro-tervetulo', '1'); } catch { /* yksityinen tila */ }
  });
  const s = await konteksti.newPage();
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  s.on('pageerror', (e) => virheet.push(String(e)));
  const kuva = (vaihe) => s.screenshot({ path: join(ULOS, `avaruuskavely-web-${nimi}-${vaihe}.png`), timeout: 90000 })
    .catch((e) => console.log(`    (kaappaus ${vaihe}: ${e.message.split('\n')[0]})`));
  const n = (t) => `${t} (${nimi})`;
  const av = (fn) => s.evaluate((f) => window.matkakirja.ui.pallolinssi.kahva.avaruus[f](), fn);

  await avaaPeli(s);
  await s.evaluate(() => {
    [...document.querySelectorAll('button, a, [role="button"]')].find((b) => /^\s*ohita\s*$/i.test(b.textContent))?.click();
  });
  const rivit = await s.evaluate(async () => {
    const { ASTRO_TAULUN_RIVIT } = await import('/js/linssit/pulu-taulu.js');
    return ASTRO_TAULUN_RIVIT.map((r) => r.otsikko);
  });
  vaadi(n('Pulun taulussa rivi Avaruuskävely'), rivit.includes('Avaruuskävely'), rivit.join(', '));

  // Pelaajan polku: Pulun taulun rivi "Avaruuskävely" kaukonäkymästä (taulu vie ensin Cupolaan, sitten ilmalukkoon).
  const alkoi = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.taulu.valitse('avaruuskavely'));
  let t = await odota(s, (x) => x.kavely?.vaihe === 'ilmalukko' && x.kerrokset.length > 0, 20000);
  const tauluAuki = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.taulu.tila?.()?.auki ?? null);
  vaadi(n('taulun rivistä Cupolan kautta ilmalukkoon: ohje, kerrokset, taulu ja paneeli pois'), alkoi && t.kavely?.vaihe === 'ilmalukko'
    && t.ohje === 'Napauta: avaa luukku' && t.kerrokset.includes('ilmalukko-luukku') && !t.paneeliNakyy && tauluAuki !== true,
    JSON.stringify({ ohje: t.ohje, kerrokset: t.kerrokset.length, tauluAuki }));
  await s.waitForTimeout(1500);
  await kuva('1-ilmalukko');

  await av('napautaIss');
  await s.waitForTimeout(1500);
  await kuva('2-ulos');
  t = await odota(s, (x) => x.kavely?.vaihe === 'koysi' && !x.siirtyy, 8000);
  vaadi(n('ulos 4 s → köysi, kenttä 70°'), t.kavely?.vaihe === 'koysi' && t.tila === 'ulkona' && Math.abs(t.fov - 70) < 0.5
    && t.ohje === 'Napauta: kiinnitä köysi' && t.kerrokset.includes('kaide'), `${t.kavely?.vaihe} ${t.tila} fov ${t.fov}`);
  await s.waitForTimeout(1000);
  await kuva('3-koysi');

  await av('napautaIss');
  t = await odota(s, (x) => x.kavely?.vaihe === 'pulu', 20000);
  vaadi(n('auringonnousu: kelaus ja Pulun vaihe (24×)'), t.kavely?.vaihe === 'pulu', JSON.stringify(t.aika));
  await s.waitForTimeout(4000);
  await kuva('4-auringonnousu');
  t = await odota(s, (x) => x.kavely?.vaihe === 'kuva', 12000);
  vaadi(n('kuva-vaihe ja ohje'), t.kavely?.vaihe === 'kuva' && t.ohje === 'Napauta: ota kuva', t.ohje ?? '');
  await kuva('5-kuva');

  await av('napautaIss');
  t = await odota(s, (x) => x.kortti !== null, 5000);
  await s.waitForTimeout(1500);
  t = await tila(s);
  vaadi(n('vertailukortti: oma kuva ja NASA-kuva tekstein'), Boolean(t.kortti) && t.kortti.kuvat[0].startsWith('url(')
    && /Oma kuva ISS:n kaiteelta/.test(t.kortti.tekstit[0]) && /(Astronautin kuva \(NASA\)|ei löytynyt)/.test(t.kortti.tekstit[1]),
    JSON.stringify(t.kortti?.tekstit));
  await kuva('6-vertailu');

  await av('napautaIss');
  t = await odota(s, (x) => (x.kavely?.vaihe ?? 'ei') === 'ei' && x.tila === 'ikkuna' && !x.siirtyy, 8000);
  vaadi(n('takaisin Cupolaan, kerrokset pois'), t.tila === 'ikkuna' && Math.abs(t.fov - 80) < 0.5 && !t.kavelyNakyy && t.paneeliNakyy,
    `${t.tila} fov ${t.fov} kävely ${t.kavelyNakyy}`);
  await kuva('7-takaisin');
  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
  await konteksti.close();
}

for (const nimi of (valitsin('nakymat', 'iphone,ipad')).split(',')) await ajaNakyma(nimi);
await selain.close();
palvelin.close();
const kaatui = tulokset.filter((r) => !r.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} OK, kuvat ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
