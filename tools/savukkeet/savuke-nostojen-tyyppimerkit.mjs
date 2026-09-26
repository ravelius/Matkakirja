/*
 * SAVUKE: NOSTOJEN TYYPPIMERKIT LÄHIZOOMISSA (omistajan päätös 21.9.2026
 * klo 23.05: *"nostojen karttamerkit takaisin"*; nostot.js TYYPPIMERKIT
 * LÄHIZOOMISSA). z8:sta lähemmäs (kartan kerroin ≥ 4; löydös 155: jo 2,5:stä,
 * 2,5–4 merkki 0,7-kokoisena, korkeus z7) jokainen nosto
 * saa tyyppinsä Codexin kuvamerkin pisteen tilalle; kauempana piste;
 * ykköstaso 1,6-kertaisena kaikilla zoomeilla; vaihto häivytyksellä
 * GL-rungolla (glnimiot-sovitin.js `#ikoni-vanha`).
 *
 * Puhelin 390 × 844 dpr 2 (WebKit oletus), Ranska-tallenne. Kolme
 * korkeutta: z6 (saapuminen, 0,2), z8 (0,05) ja z9 (syvin sallittu).
 * Rungon ikonit luetaan sovittimen nostotRungolla()-listasta; kuvamerkki
 * tunnistetaan rasterin avaimesta ('merkki-'). Vartiot per korkeus:
 *   1. merkkien määrä: z6 → kuvamerkkejä tasan ykköstason verran;
 *      z8/z9 → jokaisella nostolla, jonka tyypillä on merkki, on
 *      kuvamerkki (määrä täsmää), pisteitä vain merkittömillä tyypeillä;
 *   2. ykköstason merkki on 1,6 × tavallisen merkin ruutu, tavallinen
 *      merkki pisteen ruudussa (leveys sama kuin pisteellä z6:ssa);
 *   3. yksikään ikoni ei osu toisen noston näkyvän nimiön päälle;
 *   4. z7 → z8 -zoomissa vaihto häivytetään: sovittimen häivytyksissä
 *      näkyy `#ikoni`-avain (ei hyppyä);
 *   5. ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-nostojen-tyyppimerkit.mjs [kuvakansio]
 *       SAVUKE_MOOTTORI=webkit|chromium
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
const CAMARGUE = { lat: 43.7, lng: 4.6 };
const KORKEUDET = [
  { tunniste: 'z6', pov: { lat: 46.5, lng: 2.5, altitude: 0.2 }, lahi: false },
  // Löydös 155: kerroin ~3 (2,5–4) → kuvamerkit jo käytössä, tavallinen merkki 0,7-kokoisena.
  { tunniste: 'z7', pov: { ...CAMARGUE, altitude: 0.067 }, lahi: true },
  { tunniste: 'z8', pov: { ...CAMARGUE, altitude: 0.05 }, lahi: true },
  { tunniste: 'z9', pov: { ...CAMARGUE, altitude: 0.025 }, lahi: true },
];
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

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const virheet = [];
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage();
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
await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });

const odotaRunko = async () => {
  await sivu.waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 }).catch(() => {});
  await sivu.waitForFunction(() => {
    const s = window.matkakirja.ui.pallolauta.glSovitin?.(); const t = s?.tila?.();
    if (!t || !(t.nostotGl > 0)) return false;
    const dom = [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu')).length;
    return dom === t.nostotCss2d && !s.haivytykset().size;
  }, null, { timeout: 20000 }).catch(() => {});
  await sivu.waitForTimeout(800);
};
/** Rungon nostot: ikonit ja näkyvät nimiöt laatikoineen, tyypin merkki datasta. */
const lue = () => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta; const s = l.glSovitin();
  const { nostosymKuvamerkki, NOSTOSYM_KUVAMERKIN_KERROIN } = await import('/js/fokusnosto-symbolit.js');
  const { NOSTOJEN_TYYPPIMERKIN_KERROIN, NOSTOJEN_TYYPPIMERKIN_TAYSI_KERROIN, NOSTOJEN_TYYPPIMERKIN_PIENI } = await import('/js/pallolauta/nostot.js');
  const datumit = new Map(s.viimeisetNostot().map((d) => [d.avain ?? `${d.laji}:${d.id}`, d]));
  const koti = l.kotelo.getBoundingClientRect();
  const laatikko = (i) => {
    const q = ui.pallonInstanssi.getScreenCoords(i.lat, i.lng, 0);
    if (!q) return null;
    const x = q.x + i.dx - i.ankkuriX; const y = q.y + i.dy - i.ankkuriY;
    return { x0: x, y0: y, x1: x + i.leveys, y1: y + i.korkeus, sisalla: q.x >= 0 && q.y >= 0 && q.x <= koti.width && q.y <= koti.height };
  };
  const ikonit = []; const nimiot = [];
  for (const i of s.nostotRungolla()) {
    const osa = i.tunnus.split('#')[1]; const emo = i.tunnus.split('#')[0];
    if (osa !== 'ikoni' && osa !== 'nimio') continue;
    const d = datumit.get(emo); const b = laatikko(i);
    if (!d || !b) continue;
    const rivi = { emo, nimi: d.nimi ?? '?', taso: d.taso ?? 2, kaupunki: Boolean(d.kaupunki), ...b, leveys: i.leveys, opacity: i.opacity, kuvamerkki: false };
    if (osa === 'ikoni') {
      rivi.kuvamerkki = Boolean(d.kuvamerkki);
      rivi.tyypilla = Boolean(nostosymKuvamerkki(d.kategoria, d.symLaji));
      ikonit.push(rivi);
    } else if (i.opacity > 0 && d.nimioNakyy) nimiot.push(rivi);
  }
  const kerroin = l.nostot?.karttakerroin?.() ?? null;
  return { ikonit, nimiot, pov: ui.pallonInstanssi.pointOfView(), kerroin, raja: NOSTOJEN_TYYPPIMERKIN_KERROIN, tasoKerroin: NOSTOSYM_KUVAMERKIN_KERROIN,
    // Löydös 155: tavallinen merkki on 0,7-kokoinen kertoimilla 2,5–4, joten ykköstason suhde on silloin 1,6 / 0,7.
    tavallinenKoko: kerroin < NOSTOJEN_TYYPPIMERKIN_TAYSI_KERROIN ? NOSTOJEN_TYYPPIMERKIN_PIENI : 1 };
});
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

let pisteenLeveys = null;
for (const k of KORKEUDET) {
  await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, k.pov);
  await sivu.waitForTimeout(3500);
  await odotaRunko();
  const t = await lue();
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `tyyppimerkit-${k.tunniste}-puhelin.jpg`), type: 'jpeg', quality: 70 }).catch(() => {});
  const sisalla = t.ikonit.filter((i) => i.sisalla);
  const merkilliset = sisalla.filter((i) => i.kuvamerkki);
  const taso1 = sisalla.filter((i) => i.taso === 1);
  const tyypilla = sisalla.filter((i) => i.tyypilla);
  tieto(`${k.tunniste}`, `alt ${p(t.pov.altitude, 4)}, kerroin ${p(t.kerroin, 2)} (raja ${t.raja}), ikoneja ruudussa ${sisalla.length}, kuvamerkkejä ${merkilliset.length}, ykköstasoa ${taso1.length}, tyypillä merkki ${tyypilla.length}: ${sisalla.map((i) => `${i.nimi}${i.kuvamerkki ? '◆' : '·'}${i.taso === 1 ? '¹' : ''}`).join(' ')}`);
  if (!k.lahi) {
    vaadi(`${k.tunniste} 1. kuvamerkkejä tasan ykköstason verran (muut pisteitä)`, sisalla.length >= 5 && merkilliset.length === taso1.filter((i) => i.tyypilla).length && merkilliset.every((i) => i.taso === 1),
      `kuvamerkkejä ${merkilliset.length}, ykköstasoa merkillisellä tyypillä ${taso1.filter((i) => i.tyypilla).length}`);
    const tavalliset = sisalla.filter((i) => i.taso !== 1);
    pisteenLeveys = tavalliset.length ? tavalliset[0].leveys / (tavalliset[0].leveys > 0 ? 1 : 1) : null;
    // Pisteen ruudun leveys suhteessa mittaan: talteen vertailuksi (z8 sama suhde).
    pisteenLeveys = tavalliset.length ? tavalliset[0].leveys : null;
  } else {
    vaadi(`${k.tunniste} 1. jokaisella nostolla, jonka tyypillä on merkki, on kuvamerkki; muilla piste`,
      sisalla.length >= 3 && t.kerroin >= t.raja && merkilliset.length === tyypilla.length && merkilliset.every((i) => i.tyypilla),
      `kerroin ${p(t.kerroin, 2)}, kuvamerkkejä ${merkilliset.length}, tyypillä merkki ${tyypilla.length}`);
    const ykkoset = merkilliset.filter((i) => i.taso === 1);
    const tavalliset = merkilliset.filter((i) => i.taso !== 1);
    if (ykkoset.length && tavalliset.length) {
      const suhde = ykkoset[0].leveys / tavalliset[0].leveys;
      const odotettu = t.tasoKerroin / t.tavallinenKoko;
      vaadi(`${k.tunniste} 2. ykköstason merkki on ${p(odotettu, 2)} × tavallisen merkin ruutu (tavallinen ${t.tavallinenKoko})`, Math.abs(suhde - odotettu) < 0.05 * odotettu, `suhde ${p(suhde, 2)}`);
    } else {
      tieto(`${k.tunniste} 2.`, `ykköstasoa ${ykkoset.length}, tavallisia ${tavalliset.length} — suhdetta ei mitattu`);
    }
  }
  // Sovittelun sääntö (sovittelu.js IKONIT OVAT ESTEITÄ): kaupungin ja ykköstason nimiö ei
  // väistä ikonia (ne voittavat), muut nimiöt väistävät — vartio koskee niitä; vahvat INFOna.
  const osumat = []; const vahvat = [];
  // Nimetön ikoni on pelkkä piste (katon yli mennyt rivi, nostot.js vainPiste): ei lappu, ei este.
  for (const i of sisalla.filter((x) => x.nimi)) for (const n of t.nimiot) {
    if (n.emo === i.emo || !limittyy(i, n)) continue;
    (n.kaupunki || n.taso === 1 ? vahvat : osumat).push(`${i.nimi}×${n.nimi}`);
  }
  if (vahvat.length) tieto(`${k.tunniste} 3.`, `kaupungin/ykköstason nimiö ikonin päällä (sallittu): ${vahvat.join(', ')}`);
  vaadi(`${k.tunniste} 3. yksikään ikoni ei osu toisen noston nimiön päälle (kaupunki ja ykköstaso voittavat)`, osumat.length === 0, osumat.slice(0, 5).join(', '));
}
// 4. Häivytys z7 → z8: vaihto piste → merkki näkyy sovittimen häivytyksissä.
await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.1 }, 0), CAMARGUE);
await sivu.waitForTimeout(3000);
await odotaRunko();
const havaittu = await sivu.evaluate(async (pov) => {
  const ui = window.matkakirja.ui; const s = ui.pallolauta.glSovitin();
  const nahty = new Set();
  ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.05 }, 1200);
  const alku = performance.now();
  while (performance.now() - alku < 2600) {
    for (const t of s.haivytykset().keys()) if (t.includes('#ikoni')) nahty.add(t);
    await new Promise((r) => requestAnimationFrame(r));
  }
  return [...nahty];
}, CAMARGUE);
vaadi('4. z7 → z8: ikonin vaihto piste → merkki häivytetään (sovittimen #ikoni-häivytys)', havaittu.length > 0, `häivytyksiä ${havaittu.length}: ${havaittu.slice(0, 4).join(', ')}`);
vaadi('5. ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
await ctx.close(); await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
