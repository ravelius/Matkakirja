/*
 * ZOOMIN KARKEAN TASON NÄKYMISAIKA MERELLÄ JA MAALLA (Karttaseppä
 * 22.9.2026; omistajan aamutesti: *"merialueella zoomatessa syvyysviivat
 * sotkeutuvat hetkeksi paksummiksi"*). Mittari, jolla laattaputken
 * muutokset vertaillaan: mitattu 22.9. (WebKit 390 × 844 dpr 3, kuorma
 * 9–13) ennakon laajennus ei auttanut (verkko ei ole pullonkaula: z8-laatta
 * 16–52 kt, TTFB 21–56 ms), mutta tekstuurien vienti 2/kehys + valmistelun
 * budjetti 6–8 ms pudotti ajan 536–895 → 347–433 ms merellä ja 751–1052 →
 * 546–711 ms maalla ilman p95-kustannusta (mittaa-ablaatio 25–27 ms molemmilla).
 *
 * Avaa pallolaudan puhelinkoossa (390 × 844 dpr 3, WebKit oletus),
 * lentää kahteen näkymään — MERI (Välimeri Sardinian länsipuolella 40,5 N
 * 6,0 E, näkyvissä lähes vain merta) ja MAA (Ranska 46,5 N 2,5 E) — ja ajaa kummassakin
 * kirjaston zoomin 0,2 → 0,067 (1,5 s) sekä 0,067 → 0,022 (1,5 s).
 * Joka kehyksellä luetaan lepokerroksen mittarit (taso, nakyvia,
 * nakyviaScenessa, zoomiennakkoja, meriOsuus, zoomiennakkoMerella).
 *
 * KARKEAN TASON NÄKYMISAIKA = tason vaihdosta siihen kehykseen, jossa
 * uuden tason näkyvistä laatoista on scenessä ≥ 90 % — sen ajan vanha
 * taso näkyy venytettynä (paksut syvyyskäyrät). Kirjataan jokaiselle
 * vaihdolle ja vartioidaan MERELLÄ: mediaani ≤ MERI_KATTO_MS (oletus
 * 700, headless-kohina huomioiden) ja ennakko tilasi laattoja. Maalla
 * vain kirjataan.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/mittaa-zoomiennakko-meri.mjs
 *     [SAVUKE_MOOTTORI=webkit|chromium] [ULOS=<kansio>] [MERI_KATTO_MS=700]
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
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/zoomiennakko-meri';
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
const mediaani = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : NaN; };
const MERI_KATTO_MS = Number(process.env.MERI_KATTO_MS) || 700;
const NAKYMAT = { meri: { lat: 40.5, lng: 6.0 }, maa: { lat: 46.5, lng: 2.5 } };

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] });
const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);

/** Kehysprofiili: taso ja peitto joka kehyksellä. */
await sivu.evaluate(() => {
  window.__zoomi = {
    aloita() {
      this.kehykset = []; this.kaynnissa = true;
      const askel = () => {
        if (!this.kaynnissa) return;
        const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
        this.kehykset.push({ t: performance.now(), taso: m.taso, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa, ennakkoja: m.zoomiennakkoja, meri: m.meriOsuus, merella: m.zoomiennakkoMerella });
        requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
    },
    lopeta() { this.kaynnissa = false; return this.kehykset; },
  };
});

/** Tason vaihdot ja aika 90 %:n peittoon. */
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

const tulokset = {};
for (const [nimi, kohde] of Object.entries(NAKYMAT)) {
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.2 }, 0), kohde);
  await sivu.waitForTimeout(3500);
  const lahto = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {});
  await sivu.evaluate(() => window.__zoomi.aloita());
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.067 }, 1500), kohde);
  await sivu.waitForTimeout(2200);
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.022 }, 1500), kohde);
  await sivu.waitForTimeout(2200);
  const kehykset = await sivu.evaluate(() => window.__zoomi.lopeta());
  await sivu.screenshot({ path: join(ULOS, `zoomiennakko-${nimi}-${MOOTTORI}.jpg`), type: 'jpeg', quality: 80 });
  const v = vaihdot(kehykset);
  if (process.env.DEBUG) console.log(nimi, kehykset.filter((k, i) => i % 15 === 0).map((k) => `${Math.round(k.t)}:${k.taso}/${k.nakyvia}/${k.scenessa}/m${(k.meri ?? 0).toFixed(2)}/e${k.ennakkoja}`).join(' '));
  const loppu = kehykset[kehykset.length - 1];
  tulokset[nimi] = { lahtoMeri: lahto.meriOsuus, vaihdot: v, mediaaniMs: mediaani(v.map((x) => x.ms).filter(Number.isFinite)), ennakkojaMax: Math.max(0, ...kehykset.map((k) => k.ennakkoja ?? 0)), merella: kehykset.some((k) => k.merella), loppuMeri: loppu?.meri };
  console.log(`${nimi}: lähtö meriOsuus ${(lahto.meriOsuus ?? 0).toFixed(2)}, vaihdot ${v.map((x) => `${x.taso} ${x.ms} ms`).join(', ') || '-'}, mediaani ${tulokset[nimi].mediaaniMs} ms, zoomiennakkoja max ${tulokset[nimi].ennakkojaMax}, merellä ${tulokset[nimi].merella}`);
}
// Meren tunnistus (laatat.meriOsuus) on vain kokeiluhaarassa karttaseppa-zoomiennakko-2: vartioidaan, jos mittari on.
if (Number.isFinite(tulokset.meri.lahtoMeri)) {
  vartio('meri: näkyvät laatat tunnistetaan mereksi (meriOsuus ≥ 0,6)', tulokset.meri.lahtoMeri >= 0.6, String(tulokset.meri.lahtoMeri));
  vartio('maa: näkyvät laatat eivät ole merta (meriOsuus < 0,6)', tulokset.maa.lahtoMeri < 0.6, String(tulokset.maa.lahtoMeri));
}
vartio('meri: zoomiennakko tilasi laattoja', tulokset.meri.ennakkojaMax > 0, `ennakkoja ${tulokset.meri.ennakkojaMax}`);
vartio(`meri: karkean tason näkymisaika mediaani ≤ ${MERI_KATTO_MS} ms`, tulokset.meri.vaihdot.length > 0 && tulokset.meri.mediaaniMs <= MERI_KATTO_MS, `${tulokset.meri.mediaaniMs} ms (${tulokset.meri.vaihdot.length} vaihtoa)`);
vartio('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
writeFileSync(join(ULOS, `zoomiennakko-${MOOTTORI}.json`), JSON.stringify(tulokset, null, 1));

await selain.close();
palvelin.close();
const viat = vartiot.filter((v) => !v.ok);
console.log(`Vartio: ${vartiot.length - viat.length}/${vartiot.length} OK`);
process.exit(viat.length ? 1 : 0);
