/*
 * LAATTOJEN ESILATAUS LEVOSSA (erä E1, js/laattaesilataus.js + sw.js) — savuke.
 *
 * Omistaja 22.9.2026: levossa seuraavan tason laatat näkymän ympäriltä ja
 * saapuessa koko kohdemaan z6–z8 palvelutyöntekijän koriin, jotta zoomatessa
 * laatat tulevat levyltä eikä verkosta. Savuke ajaa PALVELUTYÖNTEKIJÄN
 * KANSSA (ei serviceWorkers: 'block'): sivu paikalliselta palvelimelta,
 * ämpäri Noden kautta kontekstin reitillä (myös SW:n noudot; Chromium).
 *
 * Kaksi ajoa saman koneen eri selainkonteksteissa (tyhjä kori kummassakin):
 *   A) ?esilataus=0 — vertailu: saapuminen Ranskaan, lepo 6 s, zoomi.
 *   B) esilataus päällä — sama, mutta levossa jono lähettää z+1:n ja maan.
 * Vartiot: 1) B:n jono lähetti eriä ja maa on FRA; 2) B:n korissa on
 * pyramidin laattoja lepoajan jälkeen; 3) A:ssa jonoa ei ole; 4) B:n
 * karkean tason näkymisaika z7→z8 ≤ 700 ms (A kirjataan rinnalle);
 * 5) ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-laattaesilataus.mjs
 *     [SAVUKE_MOOTTORI=chromium|webkit] [ULOS=<kansio>]   (webkit: SW:n noudot eivät reitity)
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'chromium';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/laattaesilataus';
mkdirSync(ULOS, { recursive: true });
const DPR = Number(process.env.DPR) || 3;
const VIEWPORT = { width: 390, height: 844 };
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.bin': 'application/octet-stream' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

const vartiot = [];
const vartio = (nimi, ehto, tieto = '') => { vartiot.push({ nimi, ok: Boolean(ehto), tieto }); console.log(`${ehto ? 'OK ' : 'VIKA'} ${nimi}${tieto ? ` — ${tieto}` : ''}`); };
const KOHDE = { lat: 46.5, lng: 2.5 };

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] });

/** Tason vaihdot ja aika 90 %:n peittoon (sama kuin mittaa-zoomiennakko-meri.mjs). */
const vaihdot = (kehykset) => {
  const ulos = [];
  for (let i = 1; i < kehykset.length; i += 1) {
    if (kehykset[i].taso === kehykset[i - 1].taso || kehykset[i].taso == null) continue;
    const alku = kehykset[i].t;
    let ms = null;
    for (let j = i; j < kehykset.length; j += 1) {
      if (kehykset[j].taso !== kehykset[i].taso) break;
      if (kehykset[j].nakyvia > 0 && kehykset[j].scenessa / kehykset[j].nakyvia >= 0.9) { ms = kehykset[j].t - alku; break; }
    }
    ulos.push({ taso: `${kehykset[i - 1].taso}→${kehykset[i].taso}`, ms: ms === null ? Infinity : Math.round(ms) });
  }
  return ulos;
};

async function ajo(nimi, lippu) {
  const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
  /*
   * Ämpäri Noden kautta KONTEKSTIN reitillä: paikallinen sivu (localhost)
   * ei läpäise ämpärin CORS-sääntöä, ja vain kontekstin reitti nappaa
   * myös palvelutyöntekijän omat noudot (Playwright: Chromium). WebKit ei
   * reititä SW:n pyyntöjä — siksi oletusmoottori on tässä Chromium.
   */
  await ctx.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=31536000, immutable' } }); });
  await ctx.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await ctx.route(/wikimedia\.org/, (r) => r.abort());
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  // Palvelutyöntekijä hallintaan: odota, että se ohjaa sivua (asennus + claim).
  const swOk = await sivu.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 60000 }).then(() => true).catch(() => false);
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.2 }, 0), KOHDE);
  // Lepo: esilataus (jos päällä) lähettää eriä 250 ms:n välein.
  await sivu.waitForTimeout(6000);
  const lue = () => sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta.lepokerros?.();
    const m = l?.mittarit?.() ?? {};
    let korissa = 0; let pyramidissa = 0;
    try {
      const kori = await caches.open('matkakirja-pallolaatat-v1');
      const avaimet = await kori.keys();
      korissa = avaimet.length;
      pyramidissa = avaimet.filter((p) => p.url.includes('/julisteet/pyramidi/')).length;
    } catch { /* ei koria */ }
    const korostus = window.matkakirja.ui.pallolauta.vektorit?.()?.mittarit?.()?.korostus ?? null;
    return { esilataus: m.esilataus ?? null, taso: m.taso, korissa, pyramidissa, korostus, kerros: Boolean(l?.asetaEsilatausMaa) };
  });
  const lepo = await lue();
  await sivu.evaluate(() => {
    window.__zoomi = { kehykset: [], kaynnissa: true };
    const askel = () => {
      if (!window.__zoomi.kaynnissa) return;
      const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
      window.__zoomi.kehykset.push({ t: performance.now(), taso: m.taso, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa });
      requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  });
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.067 }, 1500), KOHDE);
  await sivu.waitForTimeout(2200);
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.022 }, 1500), KOHDE);
  await sivu.waitForTimeout(2200);
  const kehykset = await sivu.evaluate(() => { window.__zoomi.kaynnissa = false; return window.__zoomi.kehykset; });
  const jalkeen = await lue();
  await sivu.screenshot({ path: join(ULOS, `esilataus-${nimi}-${MOOTTORI}.jpg`), type: 'jpeg', quality: 80 });
  await ctx.close();
  const v = vaihdot(kehykset);
  const tulos = { nimi, swOk, lepo, jalkeen, vaihdot: v, virheet };
  console.log(`${nimi}: sw ${swOk}, korostus ${lepo.korostus} kerros ${lepo.kerros}, levossa taso ${lepo.taso}, korissa ${lepo.korissa} (pyramidi ${lepo.pyramidissa}), esilataus ${JSON.stringify(lepo.esilataus)}; zoomi ${v.map((x) => `${x.taso} ${x.ms} ms`).join(', ') || '-'}; jälkeen korissa ${jalkeen.korissa} (pyramidi ${jalkeen.pyramidissa})`);
  return tulos;
}

const A = await ajo('ilman', '&esilataus=0');
const B = await ajo('esilataus', '');
vartio('B: jono lähetti eriä ja maa on FRA', (B.lepo.esilataus?.lahetetty ?? 0) > 0 && B.lepo.esilataus?.maa === 'FRA', JSON.stringify(B.lepo.esilataus));
vartio('B: korissa pyramidin laattoja lepoajan jälkeen', B.lepo.pyramidissa > 20, `${B.lepo.pyramidissa} (A: ${A.lepo.pyramidissa})`);
vartio('A: ilman esilatausta jonoa ei ole', A.lepo.esilataus === null, JSON.stringify(A.lepo.esilataus));
const med = (xs) => { const s = xs.filter(Number.isFinite).sort((a, b) => a - b); return s.length ? s[Math.floor((s.length - 1) / 2)] : Infinity; };
const medA = med(A.vaihdot.map((x) => x.ms)); const medB = med(B.vaihdot.map((x) => x.ms));
console.log(`karkean tason näkymisaika: ilman ${medA} ms, esilatauksella ${medB} ms`);
vartio('B: karkean tason näkymisaika ≤ 700 ms', medB <= 700, `${medB} ms (ilman ${medA})`);
vartio('ei sivuvirheitä', A.virheet.length === 0 && B.virheet.length === 0, [...A.virheet, ...B.virheet].slice(0, 3).join(' | '));
writeFileSync(join(ULOS, `esilataus-${MOOTTORI}.json`), JSON.stringify({ A, B }, null, 1));

await selain.close();
palvelin.close();
const viat = vartiot.filter((v) => !v.ok);
console.log(`Vartio: ${vartiot.length - viat.length}/${vartiot.length} OK`);
process.exit(viat.length ? 1 : 0);
