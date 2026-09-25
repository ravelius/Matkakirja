/*
 * SAVUKE: HEHKUPISTE (omistaja 21.9.2026 klo 22.00: *"karttanostojen
 * väripiste on eloton yksi väripallo, saisi olla hehkuvan näköinen"*;
 * Fablen erä). Kategorian värikiekko saa säteittäisen häiveen aiheen
 * musteella ja vaaleamman sisuksen (js/fokusnosto-symbolit.js
 * piirraNostosymMiniCanvas HEHKUPISTE) sekä hitaan sykähdyksen levossa,
 * ei liikkeessä (runko: pallonimiot-gl.js `syke`; CSS2D:
 * .nostosym-rasteri-piste).
 *
 * WebKit puhelin 390 × 844 dpr 2, Ranska z6 (saapuminen) ja Camargue z8.
 * Vartiot:
 *   1. hehkupisteen rasteri: kiekon ulkopuolella (säde 1,1–1,9 × piste)
 *      on aiheen värin sävyistä, läpikuultavaa mustetta (alfa 0,05–0,6)
 *      ja sisus on vaaleampi kuin laita — luetaan rasterilähteen
 *      valmiista kuvasta canvasin kautta;
 *   2. levossa rungon syke-uniform vaihtelee (min < 1 < max yhden jakson
 *      aikana) ja rasterin koko ei muutu (sykähdys on uniform, ei uusi
 *      rasteri: rasterien määrä sama);
 *   3. liikkeessä (kamera-ajo) syke on tasan 1 joka kehyksessä;
 *   4. CSS2D-perääntymistie (?glnimiot=0): pistemerkin kuvalla on luokka
 *      nostosym-rasteri-piste ja sen animaatio on käynnissä levossa;
 *   5. ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-hehkupiste.mjs [kuvakansio]
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
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(1500);
  await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });
  return { ctx, sivu, virheet };
};

// ── GL (oletus) ──
{
  const { ctx, sivu, virheet } = await avaa('');
  await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, { lat: 46.5, lng: 2.5, altitude: 0.2 });
  await sivu.waitForTimeout(4500);
  await sivu.waitForFunction(() => { const s = window.matkakirja.ui.pallolauta.glSovitin?.(); const t = s?.tila?.(); return t && t.nostotGl > 0 && !t.rasterit?.kesken; }, null, { timeout: 20000 }).catch(() => {});
  await sivu.waitForTimeout(800);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `hehkupiste-z6-puhelin.jpg`), type: 'jpeg', quality: 75 }).catch(() => {});
  // 1. Rasterin sisältö: hehkupisteen ikonin kuva rasterilähteestä.
  const rasteri = await sivu.evaluate(async () => {
    const ui = window.matkakirja.ui; const s = ui.pallolauta.glSovitin(); const lahde = s.lahde();
    const { glOnHehkupiste } = await import('/js/pallolauta/glnimiot-sovitin.js');
    const { NOSTOSYM_PISTE_R, NOSTOSYM_HEHKUN_SADE, NOSTOSYM_PISTE_VARIT, nostosymPorrasNyt } = await import('/js/fokusnosto-symbolit.js');
    const d = s.viimeisetNostot().find((x) => glOnHehkupiste(x) && s.onRungolla(`${x.avain}#ikoni`));
    if (!d) return { virhe: 'ei hehkupistettä rungolla' };
    const sprite = lahde.haeNosto(d).find((x) => x.osa === 'ikoni');
    if (!sprite?.valmis) return { virhe: 'ikonin rasteri kesken' };
    const c = document.createElement('canvas'); c.width = sprite.w; c.height = sprite.h;
    const ctx2 = c.getContext('2d'); ctx2.drawImage(sprite.kuva, 0, 0);
    const porras = sprite.porras ?? nostosymPorrasNyt();
    const cx = sprite.ankkuriX; const cy = sprite.ankkuriY; const r = NOSTOSYM_PISTE_R * porras;
    const nayte = (rr, kulma) => { const x = Math.round(cx + rr * Math.cos(kulma)); const y = Math.round(cy + rr * Math.sin(kulma)); const [R, G, B, A] = ctx2.getImageData(x, y, 1, 1).data; return { R, G, B, A: A / 255 }; };
    const halo = [0, 1, 2, 3, 4, 5].map((i) => nayte(r * 1.45, (i * Math.PI) / 3));
    const sisus = nayte(r * 0.12, 0); const laita = nayte(r * 0.8, Math.PI / 4);
    const vari = NOSTOSYM_PISTE_VARIT[d.kategoria] ?? null;
    return { kategoria: d.kategoria, nimi: d.nimi, vari, halo, sisus, laita, w: sprite.w, h: sprite.h, porras, sade: NOSTOSYM_HEHKUN_SADE };
  });
  tieto('rasteri', JSON.stringify(rasteri).slice(0, 400));
  const haloOk = rasteri.halo?.length && rasteri.halo.every((n) => n.A > 0.05 && n.A < 0.6);
  const luminanssi = (n) => 0.299 * n.R + 0.587 * n.G + 0.114 * n.B;
  const sisusOk = rasteri.sisus && rasteri.laita && luminanssi(rasteri.sisus) > luminanssi(rasteri.laita) + 15;
  vaadi('1. hehkupisteen rasteri: kiekon ulkopuolella läpikuultava häive, sisus vaaleampi kuin laita', !rasteri.virhe && haloOk && sisusOk,
    rasteri.virhe ?? `halo alfa ${rasteri.halo?.map((n) => p(n.A, 2)).join('/')}, sisus L ${p(rasteri.sisus && luminanssi(rasteri.sisus), 0)}, laita L ${p(rasteri.laita && luminanssi(rasteri.laita), 0)}`);
  // 2. Syke levossa.
  const lepo = await sivu.evaluate(async () => {
    const ui = window.matkakirja.ui; const k = ui.pallolautaGL(); const s = ui.pallolauta.glSovitin();
    const rastereitaAlussa = s.tila().rasterit.valmiita;
    const arvot = [];
    const alku = performance.now();
    while (performance.now() - alku < 2700) { arvot.push(k.mittarit().syke); await new Promise((r) => requestAnimationFrame(r)); }
    return { min: Math.min(...arvot), max: Math.max(...arvot), n: arvot.length, rasterit: s.tila().rasterit.valmiita - rastereitaAlussa };
  });
  vaadi('2. levossa syke vaihtelee (min < 1 < max) eikä rastereita synny', lepo.min < 0.98 && lepo.max > 1.02 && lepo.rasterit === 0,
    `syke ${p(lepo.min)}–${p(lepo.max)} (${lepo.n} kehystä), uusia rastereita ${lepo.rasterit}`);
  // 3. Liikkeessä syke = 1.
  const liike = await sivu.evaluate(async () => {
    const ui = window.matkakirja.ui; const k = ui.pallolautaGL(); const pallo = ui.pallonInstanssi;
    const pov = pallo.pointOfView();
    pallo.pointOfView({ lat: pov.lat + 1.5, lng: pov.lng + 1.5, altitude: pov.altitude }, 1500);
    await new Promise((r) => setTimeout(r, 200));
    const arvot = [];
    const alku = performance.now();
    while (performance.now() - alku < 1000) { arvot.push(k.mittarit().syke); await new Promise((r) => requestAnimationFrame(r)); }
    return { min: Math.min(...arvot), max: Math.max(...arvot), n: arvot.length };
  });
  vaadi('3. liikkeessä syke on tasan 1 joka kehyksessä', liike.min === 1 && liike.max === 1, `syke ${p(liike.min)}–${p(liike.max)} (${liike.n} kehystä)`);
  await sivu.waitForTimeout(1500);
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0), { lat: 43.7, lng: 4.6, altitude: 0.05 });
  await sivu.waitForTimeout(4000);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `hehkupiste-z8-puhelin.jpg`), type: 'jpeg', quality: 75 }).catch(() => {});
  vaadi('5a. ei sivuvirheitä (GL)', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}
// ── CSS2D-perääntymistie ──
{
  const { ctx, sivu, virheet } = await avaa('&glnimiot=0');
  await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, { lat: 46.5, lng: 2.5, altitude: 0.2 });
  await sivu.waitForTimeout(4500);
  const css = await sivu.evaluate(() => {
    const kuvat = [...document.querySelectorAll('.pallolauta-nosto image.nostosym-rasteri-piste')];
    const kuvamerkilliset = [...document.querySelectorAll('.pallolauta-nosto image.nostosym-rasteri:not(.nostosym-nimiokuva)')].length;
    const tila = kuvat.map((k) => getComputedStyle(k).animationPlayState);
    const liikkuu = document.querySelector('.pallolauta-kotelo, .pallolauta')?.classList.contains('pallolauta-liikkuu') ?? false;
    return { pisteita: kuvat.length, ikoneja: kuvamerkilliset, kaynnissa: tila.filter((t) => t === 'running').length, liikkuu };
  });
  vaadi('4. CSS2D: pistemerkeillä luokka nostosym-rasteri-piste ja animaatio käynnissä levossa', css.pisteita >= 3 && css.kaynnissa === css.pisteita,
    JSON.stringify(css));
  vaadi('5b. ei sivuvirheitä (CSS2D)', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
}
await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
