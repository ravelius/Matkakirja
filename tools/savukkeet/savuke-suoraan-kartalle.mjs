/*
 * SAVUKE: SUORAAN KARTALLE (omistajan testitila 23.9.2026 klo 10.50).
 * Peli ladataan tallennuksella (kaupungissa, saapumismerkintä tuore) ja
 * laitteella vanha versio, jolloin normaalisti aukeavat "Peli päivittyi"
 * -ikkuna, saapumistraileri, iso luentakuva ja isoisän luenta.
 *   S1 tila päällä (valikon tallennus): kangas näkyy < 3 s navigoinnista
 *   S2 ei päivitysikkunaa, traileria, isokuvaa eikä luentaa 8 s:n aikana
 *   S3 merkinnän teksti on kortissa heti (ei kirjoituskonetta)
 *   S4 ?koe=suoraan toimii samoin
 *   S5 tilarivi "· suoraan"
 *   S6 vastakoe ilman tilaa: päivitysikkuna ja traileri näkyvät
 *   S7 ei sivuvirheitä
 * KÄYTTÖ: PLAYWRIGHT_JS=... SAVUKE_MOOTTORI=webkit node tools/savukkeet/savuke-suoraan-kartalle.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2' };
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
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (x, n = 3) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const avaa = async (haku, muistiin = {}) => {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript(([d, m]) => {
    if (sessionStorage.getItem('savuke-alustettu')) return;
    sessionStorage.setItem('savuke-alustettu', '1');
    localStorage.setItem('matkakirja-save-v1', d);
    // Vanha nähty versio: normaalisti "Peli päivittyi" -ikkuna aukeaa.
    localStorage.setItem('matkakirja-nahty-versio', '2026-01-01.1');
    for (const [k, v] of Object.entries(m)) localStorage.setItem(k, v);
  }, [tallenne, muistiin]);
  await ctx.addInitScript(() => {
    window.__luennat = [];
    const alk = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function (...a) {
      const src = String(this.currentSrc || this.src || '');
      if (/puhe-|luenta|saapumis/.test(src)) window.__luennat.push(src.split('/').pop());
      return alk.apply(this, a);
    };
  });
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  // Kankaan näkymisaika navigoinnin alusta (performance.now on navigoinnin kello).
  const kangasMs = await sivu.waitForFunction(() => {
    const k = [...document.querySelectorAll('.pallo-kotelo canvas')].find((el) => {
      const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && b.width > 100 && b.height > 100;
    });
    return k ? Math.round(performance.now()) : false;
  }, null, { timeout: 30000, polling: 50 }).then((h) => h.jsonValue()).catch(() => null);
  const nahty = { paivitys: false, traileri: false, isokuva: false };
  for (let i = 0; i < 16; i += 1) {
    const t = await sivu.evaluate(() => {
      const nakyy = (s) => [...document.querySelectorAll(s)].some((el) => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && b.width > 0; });
      return { paivitys: Boolean(document.getElementById('paivitys-dialog')?.open), traileri: nakyy('.saapumistraileri'), isokuva: nakyy('.fokusvirta-isokuva') };
    });
    for (const k of Object.keys(nahty)) nahty[k] ||= t[k];
    await sivu.waitForTimeout(500);
  }
  const tila = await sivu.evaluate(() => ({
    luennat: window.__luennat,
    merkinta: (document.querySelector('.fact-card .fact-text, #fact-text, .fact-text')?.textContent ?? '').trim().length,
    kirjoittaa: Boolean(document.querySelector('.fact-text .pending')?.textContent),
    rivi: document.querySelector('.profiilinaytto > div')?.textContent ?? '',
  }));
  return { ctx, kangasMs, nahty, ...tila, virheet };
};

const virheet = [];
try {
  const p = await avaa('', { 'matkakirja-suoraan-kartalle': '1', 'matkakirja-kehysprofiili': '1' });
  tieto('päällä', JSON.stringify({ kangasMs: p.kangasMs, nahty: p.nahty, luennat: p.luennat, merkinta: p.merkinta, kirjoittaa: p.kirjoittaa, rivi: p.rivi }));
  vaadi('S1 kangas näkyy < 3 s', p.kangasMs != null && p.kangasMs < 3000, `${p.kangasMs} ms`);
  vaadi('S2 ei päivitysikkunaa, traileria, isokuvaa eikä luentaa', !p.nahty.paivitys && !p.nahty.traileri && !p.nahty.isokuva && p.luennat.length === 0, JSON.stringify({ ...p.nahty, luennat: p.luennat }));
  vaadi('S3 merkinnän teksti kortissa heti', p.merkinta > 20 && !p.kirjoittaa, JSON.stringify({ merkinta: p.merkinta, kirjoittaa: p.kirjoittaa }));
  vaadi('S5 tilarivi "· suoraan"', /· suoraan · profiili p\d+/.test(p.rivi), p.rivi);
  virheet.push(...p.virheet);
  await p.ctx.close();

  const q = await avaa('?koe=suoraan', {});
  tieto('?koe=suoraan', JSON.stringify({ kangasMs: q.kangasMs, nahty: q.nahty, luennat: q.luennat }));
  vaadi('S4 ?koe=suoraan toimii samoin', q.kangasMs != null && q.kangasMs < 3000 && !q.nahty.paivitys && !q.nahty.traileri && !q.nahty.isokuva && q.luennat.length === 0, JSON.stringify({ kangasMs: q.kangasMs, ...q.nahty, luennat: q.luennat }));
  virheet.push(...q.virheet);
  await q.ctx.close();

  const n = await avaa('', {});
  tieto('pois', JSON.stringify({ kangasMs: n.kangasMs, nahty: n.nahty, luennat: n.luennat }));
  vaadi('S6 vastakoe ilman tilaa: päivitysikkuna ja traileri näkyvät', n.nahty.paivitys && n.nahty.traileri, JSON.stringify(n.nahty));
  virheet.push(...n.virheet);
  await n.ctx.close();
} finally {
  await selain.close();
  palvelin.close();
}
vaadi('S7 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
