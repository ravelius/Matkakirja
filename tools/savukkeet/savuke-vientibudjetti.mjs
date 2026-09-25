/*
 * SAVUKE: LAATTOJEN VIENTI VEDON AIKANA BUDJETILLA (omistajan iPad-kierros
 * v2135/v2136, 22.9.2026: "Ei tekstuurivientejä" pudotti yli 20 ms:n
 * kehykset 25 % → 8 %). Oletuksena liikkeessä korkeintaan yksi vienti
 * LAATTAKERROS_VEDON_VIENTIVALI_MS:n välein (näkyvä, sitten ennakko); levossa
 * jono valuu. Sama synteettinen veto kolmeen suuntaan kahdesti:
 *   (vain kehykset, joissa kamera liikkui viimeisen 240 ms:n aikana)
 *   B0 esiehto: vastakokeessa laattoja vietiin (≥ 10) — muuten ympäristö ei
 *      ladannut laattoja, eikä mittaus kerro mitään
 *   B1 vastakoe oletus (ilman lippua): vedossa kaksi vientiä samassa kehyksessä
 *   Budjetti on koe ?koe=vientibudjetti (omistaja 22.9.2026 klo 23.45).
 *   B2 budjetti: yhdessäkään liikkeen kehyksessä ei yli yhtä vientiä
 *   B3 budjetti: ennakkovientejä (ei-näkyvä laatta) ≤ 21/s kerroksen omasta
 *      laskurista (vedonEnnakkoja); vientien kokonaismäärä vain tietona
 *   Vanha koodi kaatuu B2:een aina, kun B1 näkee kaksi vientiä kehyksessä.
 *   B4 budjetti ei näännytä: vedossa vietiin laattoja, ja pohja piirrossa
 *      enintään 15 %:ssa kehyksistä (kerros peittää ruudun)
 *   B5 levossa jono tyhjenee ja jokainen näkyvä laatta on scenessä täysin
 *   B6 ei sivuvirheitä
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
const avaa = async (haku) => {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  // Synteettinen veto: OrbitControlsin setPointerCapture ei tunne keksittyä pointerId:tä (sama kuin savuke-zoomiraja).
  sivu.on('pageerror', (e) => { const t = String(e.message ?? e); if (!/PointerCapture|can not be found here/i.test(t)) virheet.push(t); });
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili), null, { timeout: 90000 });
  // Lähelle, jotta veto tuo uusia laattoja (häive syntyy vain uudesta laatasta).
  await sivu.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 46.5, lng: 2.5, altitude: 0.35 }, 0));
  await sivu.waitForTimeout(5000);
  return { ctx, sivu, virheet };
};
const vedot = async (sivu) => sivu.evaluate(async () => {
  const tulokset = [];
  for (const suunta of [[1, 0.3], [-1, -0.2], [0.4, 1]]) {
    const m0 = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
    const ennakot0 = m0.vedonEnnakkoja ?? 0;
    const v = await window.__kehysprofiili.veto({ kesto: 1500, nopeusPx: 500, suunta });
    const ennakkoja = ((window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {}).vedonEnnakkoja ?? 0) - ennakot0;
    const k = v.kehykset.slice(3);
    /*
     * VAIN LIIKKEEN KEHYKSET. Synteettinen veto voi jättää kameran
     * paikalleen ennen kuin osoitin nousee (siirtymä 0 loppua kohti), ja
     * silloin pallo on levossa LAATU_LEPOVIIVE_MS:n (260) jälkeen — levon
     * tahti 2/kehys on oikein. Vienti lasketaan liikkeeseen, jos kamera
     * siirtyi jossain kehyksessä viimeisen 260 ms:n aikana.
     */
    const liikkeessa = (i) => k.some((f, j) => j <= i && k[i].t - f.t < 240 && (f.siirtyma ?? 0) > 0.25);
    const viennit = [];
    for (let i = 1; i < k.length; i += 1) {
      const d = (k[i].laattaVienteja ?? 0) - (k[i - 1].laattaVienteja ?? 0);
      if (d > 0 && liikkeessa(i)) viennit.push({ t: k[i].t, n: d });
    }
    const liikeKehyksia = k.filter((f, i) => liikkeessa(i));
    const kesto = liikeKehyksia.length > 1 ? liikeKehyksia.at(-1).t - liikeKehyksia[0].t : 0;
    const valit = viennit.slice(1).map((x, i) => x.t - viennit[i].t);
    tulokset.push({
      vienteja: viennit.reduce((a, x) => a + x.n, 0), ennakkoja, ennakkojaS: +(ennakkoja / 1.5).toFixed(1), maxKehys: Math.max(0, ...viennit.map((x) => x.n)),
      minVali: valit.length ? Math.round(Math.min(...valit)) : null, perS: kesto > 0 ? +(viennit.reduce((a, x) => a + x.n, 0) / (kesto / 1000)).toFixed(1) : 0,
      dcMax: Math.max(0, ...k.map((f) => f.drawcalls ?? 0)), pohjaOsuus: +(k.filter((f) => (f.drawcalls ?? 0) > 200).length / Math.max(1, k.length)).toFixed(2), kehyksia: k.length, liikeKehyksia: liikeKehyksia.length,
    });
  }
  return tulokset;
});
const lepoonTaysi = (sivu) => sivu.waitForFunction(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.();
  return m && m.nakyvia > 0 && (m.vientejaOdottaa ?? 0) === 0 && m.nakyviaTaysin === m.nakyvia
    ? { nakyvia: m.nakyvia, taysin: m.nakyviaTaysin, odottaa: m.vientejaOdottaa ?? 0 } : false;
}, null, { timeout: 15000, polling: 250 }).then((h) => h.jsonValue()).catch(async () => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
  return { aikakatko: true, nakyvia: m.nakyvia, taysin: m.nakyviaTaysin, odottaa: m.vientejaOdottaa };
}));

try {
  const vanha = await avaa('&koe=tuntematon');
  const v = await vedot(vanha.sivu);
  tieto('B1 oletus', JSON.stringify(v));
  const summa = (x) => x.reduce((a, t) => a + t.vienteja, 0);
  vaadi('B0 esiehto: vastakokeessa laattoja vietiin', summa(v) >= 10, `vanha ${summa(v)}`);
  vaadi('B1 vastakoe: vanha tahti vie kaksi samassa kehyksessä', v.some((t) => t.maxKehys > 1), JSON.stringify(v));
  await vanha.ctx.close();

  const b = await avaa('&koe=vientibudjetti');
  const r = await vedot(b.sivu);
  tieto('B2–B4 budjetti', JSON.stringify(r));
  vaadi('B2 yhdessäkään kehyksessä ei yli yhtä vientiä', r.every((t) => t.maxKehys <= 1), JSON.stringify(r));
  tieto('vientejä yhteensä', `budjetti ${summa(r)}, vanha ${summa(v)} (ympäristöherkkä: verkko ja välimuisti)`);
  vaadi('B3 ennakkovientejä ≤ 21/s', r.every((t) => t.ennakkojaS <= 21), `ennakkoja/s ${r.map((t) => t.ennakkojaS).join('/')}`);
  vaadi('B4 vedossa vietiin laattoja ja pohja piirrossa ≤ 15 %', summa(r) > 0 && r.every((t) => t.pohjaOsuus <= 0.15), JSON.stringify(r));
  const lepo = await lepoonTaysi(b.sivu);
  tieto('B5 lepo', JSON.stringify(lepo));
  vaadi('B5 levossa jono tyhjä ja näkyvät täysin scenessä', !lepo.aikakatko, JSON.stringify(lepo));
  vaadi('B6 ei sivuvirheitä', vanha.virheet.length + b.virheet.length === 0, [...vanha.virheet, ...b.virheet].join(' | '));
  await b.ctx.close();
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
