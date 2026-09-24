/*
 * MITTARI: KAMERAKALLISTUS, VAIHE 1 (?koe=kallistus; js/pallolauta/kallistus.js,
 * suunnitelma docs/raportit/kamerakallistus-suunnitelma-20260923.md).
 *
 * Ranska (Fogg Marseillessa), katsepiste Keski-Ranskassa. Korkeus haetaan niin,
 * että laattakerroksen taso on 6, 7 ja 8 (6 vain zoomirajan ulkopuolelta, ks. alla). Kummallakin tasolla kulmat 0°/15°/30°:
 * laattoja scenessä, näkyvissä, taso, drawcallit ja kaappaus. 30°:ssa lisäksi
 * orbit ±20° 3 s: kehysaika p50/p95, laattavientejä ja -päivityksiä sekunnissa.
 *
 *   K1 katto: näkyviä laattoja ≤ 1,3 × sama näkymä 0°:ssa joka tasolla
 *      (INFO: suhde taso 8 / 0° -näkymään; `scenessä` tiedoksi)
 *   K2 kulma 0 on nykyinen kamera: pov ennen kallistusta = pov suoristuksen jälkeen
 *   K3 kallistus todella kallistaa: kameran etäisyys keskipisteestä < 0° -etäisyys 30°:ssa
 *   K4 ruudun keskipisteen alla on katsepiste (toGlobeCoords, kirjaston säteenjäljitys)
 *   K5 ei sivuvirheitä
 *   K6 saapuminen (saavu, kesto > 0) esittelee maan: kallistus 20–30° ja paluu
 *      ylhäältä-näkymään
 *   K7 kosketus esittelyn aikana suoristaa kameran (250 ms:n animaatio: 400 ms:ssa
 *      < 1°, 700 ms:ssa pois; headless-rAF on kuormassa hidas)
 *
 * Aja: PLAYWRIGHT_JS=… NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-kallistus.mjs [kuvakansio]
 * RUUTU=1400 työpöytä (oletus 390 × 844 dpr 2); SAVUKE_MOOTTORI=chromium.
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
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const RUUTU = process.env.RUUTU === '1400'
  ? { width: 1400, height: 900, dpr: 1, mobiili: false }
  : { width: 390, height: 844, dpr: 2, mobiili: true };
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
if (!await ampari('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js')) {
  console.log('OHITUS  ämpäri ei vastaa'); palvelin.close(); process.exit(0);
}
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const KATSE = { lat: 47.0, lng: 2.4 };
const TASOT = [6, 7, 8];
const KULMAT = [0, 15, 30];
/* Horisonttirajan kerroin (kallistus.js KALLISTUS_RAJA_KERROIN); RAJA=… kokeiluun. */
const RAJA = Number(process.env.RAJA) || undefined;

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const ctx = await selain.newContext({ viewport: { width: RUUTU.width, height: RUUTU.height }, deviceScaleFactor: RUUTU.dpr, isMobile: RUUTU.mobiili, hasTouch: RUUTU.mobiili, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());

const lue = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta; const p = ui.pallonInstanssi;
  const m = l.lepokerros?.()?.mittarit?.() ?? {};
  const info = p.renderer().info.render;
  const cam = p.camera().position;
  const k = p.renderer().domElement.getBoundingClientRect();
  const keski = p.toGlobeCoords(k.width / 2, k.height / 2);
  // Drawcallien jakauma: näkyvät verkot renderOrderin mukaan ryhmiteltyinä.
  const ryhmat = {};
  p.scene().traverseVisible((o) => {
    if (!o.isMesh && !o.isLine && !o.isLineSegments && !o.isPoints) return;
    const ketju = []; for (let q = o; q && ketju.length < 4; q = q.parent) ketju.push(q.__globeObjType || q.name || q.type);
    const avain = `${o.renderOrder}:${o.geometry?.type ?? ''}:${ketju.join('<')}:${o.material?.type ?? ''}`;
    ryhmat[avain] = (ryhmat[avain] ?? 0) + 1;
  });
  return {
    pov: p.pointOfView(), scenessa: m.scenessa ?? null, nakyvia: m.nakyvia ?? null, taso: m.taso ?? null,
    vienteja: m.vienteja ?? 0, paivityksia: m.paivityksia ?? 0, drawcalls: info.calls, kolmiot: info.triangles,
    etaisyys: Math.hypot(cam.x, cam.y, cam.z), keski, kallistus: l.kallistus?.()?.tila?.() ?? null, ryhmat,
  };
});
const odota = (ms) => sivu.waitForTimeout(ms);

try {
  await sivu.goto(`${osoite}?lauta=pallo&koe=kallistus`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta?.kallistus?.() && window.__kehysprofiili), null, { timeout: 90000 });
  // Saapumisen kuvavirta pois (sama kuin savuke-nostotasot): kaappaus näyttää kartan.
  const siivoa = () => sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin); ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
  });
  await odota(1500);
  await siivoa();
  /*
   * ZOOMIRAJA VAPAAKSI MITTAUKSEN AJAKSI: Ranskan puhelinnäkymä on pelissä
   * tasoilla 7–8 (uloszoomauksen katto = saapumislaatikko, korkeus ≈ 0,205),
   * joten taso 6 mitataan rajan ulkopuolelta — se kertoo laattamoottorin
   * käytöksen, ei pelin näkymää.
   */
  await sivu.evaluate(() => { const o = window.matkakirja.ui.pallonInstanssi.controls(); o.minDistance = 0; o.maxDistance = 1e9; });
  const rivit = [];
  let katto8 = null;
  for (const taso of TASOT) {
    // Korkeus tasolle: puolitushaku lokaritmisesti (taso kasvaa korkeuden pienetessä).
    let ala = Math.log(0.01); let yla = Math.log(2); let loydetty = null;
    const nahty = [];
    for (let i = 0; i < 12; i += 1) {
      const alt = Math.exp((ala + yla) / 2);
      await sivu.evaluate(({ lat, lng, alt: a }) => {
        const p = window.matkakirja.ui.pallonInstanssi; const o = p.controls();
        o.minDistance = 0; o.maxDistance = 1e9; // lauta palauttaa rajan tapahtumissa (ks. yllä)
        p.pointOfView({ lat, lng, altitude: a }, 0);
      }, { ...KATSE, alt });
      await odota(900);
      let t = (await lue()).taso;
      for (let j = 0; j < 10 && t == null; j += 1) { await odota(400); t = (await lue()).taso; }
      const z = Number.isFinite(t?.z) ? t.z : t;
      nahty.push(`${alt.toFixed(3)}→${z}`);
      if (z === taso) { loydetty = alt; break; }
      if (z > taso) ala = Math.log(alt); else yla = Math.log(alt);
    }
    if (!loydetty) { tieto(`taso ${taso}`, `korkeutta ei löytynyt (${nahty.join(' ')})`); continue; }
    await odota(3500);
    const ennen = await lue();
    for (const kulma of KULMAT) {
      await sivu.evaluate(({ k, raja }) => window.matkakirja.ui.pallolauta.kallistus().kallista({ kulma: k, suunta: 0, kesto: 0, raja }), { k: kulma, raja: RAJA });
      await odota(4500);
      const m = await lue();
      rivit.push({ taso, kulma, alt: loydetty, ...m });
      if (taso === 8 && kulma === 0) katto8 = m.scenessa;
      tieto(`taso ${taso} ${kulma}°`, `alt ${loydetty.toFixed(4)} scenessä ${m.scenessa} näkyviä ${m.nakyvia} taso ${JSON.stringify(m.taso?.z ?? m.taso)} dc ${m.drawcalls} kolmiot ${m.kolmiot} etäisyys ${m.etaisyys.toFixed(2)} keski ${m.keski ? `${m.keski.lat.toFixed(3)},${m.keski.lng.toFixed(3)}` : '—'}`);
      if (process.env.RYHMAT) tieto(`  verkot taso ${taso} ${kulma}°`, JSON.stringify(Object.entries(m.ryhmat).sort((a, b) => b[1] - a[1]).slice(0, 10)));
      if (KUVAKANSIO) { await siivoa(); await odota(300); await sivu.screenshot({ path: join(KUVAKANSIO, `kallistus-${RUUTU.width}-taso${taso}-${kulma}.png`) }); }
      if (kulma === 30) {
        const orbit = await sivu.evaluate(async () => {
          const l = window.matkakirja.ui.pallolauta; const prof = window.__kehysprofiili;
          const m0 = l.lepokerros().mittarit();
          prof.aloita();
          await l.kallistus().orbit({ kaari: 20, kesto: 3000 });
          const t = prof.tiivista(prof.lopeta());
          const m1 = l.lepokerros().mittarit();
          return { p50: t.mediaani, p95: t.p95, max: t.max, kehyksia: t.kehyksia, vienteja: (m1.vienteja ?? 0) - (m0.vienteja ?? 0), paivityksia: (m1.paivityksia ?? 0) - (m0.paivityksia ?? 0), dcMax: t.drawcallsMax, scenessaMax: t.scenessaMax };
        });
        rivit.at(-1).orbit = orbit;
        tieto(`taso ${taso} 30° orbit ±20° 3 s`, `kehys p50 ${orbit.p50?.toFixed(1)} p95 ${orbit.p95?.toFixed(1)} max ${orbit.max?.toFixed(0)} ms (${orbit.kehyksia}), vientejä ${(orbit.vienteja / 3).toFixed(1)}/s, päivityksiä ${(orbit.paivityksia / 3).toFixed(1)}/s, dc ≤ ${orbit.dcMax}, scenessä ≤ ${orbit.scenessaMax}`);
      }
    }
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.kallistus().suorista({ kesto: 0 }));
    await odota(300);
    const jalkeen = await lue();
    const ero = Math.hypot(jalkeen.pov.lat - ennen.pov.lat, jalkeen.pov.lng - ennen.pov.lng, (jalkeen.pov.altitude - ennen.pov.altitude) * 100);
    vaadi(`K2 taso ${taso}: suoristus palauttaa saman kameran (pov-ero ${ero.toExponential(1)}, etäisyys ${ennen.etaisyys.toFixed(3)} → ${jalkeen.etaisyys.toFixed(3)})`,
      ero < 1e-6 && Math.abs(jalkeen.etaisyys - ennen.etaisyys) < 1e-6 && !jalkeen.pov.kallistus);
  }
  /*
   * KATTO KAHDESTA SUUNNASTA: (a) kallistus lisää laattoja samalla tasolla
   * ja korkeudella enintään 30 % (sama näkymä 0°:ssa on vertailu), ja
   * (b) tieto: suhde taso 8 / 0° -näkymään (se riippuu korkeudesta).
   */
  /*
   * `näkyviä` = laatat, jotka näkymä TARVITSEE (ei välimuistiin jääneitä);
   * `scenessä` riippuu latauksen ajoituksesta ja jää tiedoksi.
   */
  const yli = rivit.filter((r) => {
    const nolla = rivit.find((x) => x.taso === r.taso && x.kulma === 0)?.nakyvia;
    return nolla > 0 && r.nakyvia > nolla * 1.3;
  });
  vaadi('K1 näkyviä laattoja ≤ 1,3 × sama näkymä 0°:ssa (joka taso)', rivit.length > 0 && yli.length === 0, yli.map((r) => `taso ${r.taso} ${r.kulma}°: ${r.nakyvia}`).join('; '));
  const nakyva8 = rivit.find((x) => x.taso === 8 && x.kulma === 0)?.nakyvia;
  if (nakyva8) tieto('näkyviä suhteessa taso 8 / 0° -näkymään', rivit.map((r) => `taso ${r.taso} ${r.kulma}° ${(r.nakyvia / nakyva8).toFixed(2)}`).join(', '));
  const k30 = rivit.filter((r) => r.kulma === 30); const k0 = rivit.filter((r) => r.kulma === 0);
  vaadi('K3 30°:ssa kamera on lähempänä keskipistettä kuin 0°:ssa (kallistus toteutui)', k30.length > 0 && k30.every((r) => r.etaisyys < k0.find((x) => x.taso === r.taso).etaisyys - 1e-3));
  const keskiVirhe = rivit.filter((r) => r.kulma > 0).map((r) => (r.keski ? Math.hypot(r.keski.lat - KATSE.lat, r.keski.lng - KATSE.lng) : Infinity));
  vaadi('K4 ruudun keskellä on katsepiste (kirjaston säde, ≤ 0,05°)', keskiVirhe.length > 0 && keskiVirhe.every((e) => e < 0.05), keskiVirhe.map((e) => e.toFixed(3)).join(', '));
  /*
   * K6 MAAN ESITTELY SAAPUMISESSA: lauta.saavu({ kesto }) → kotiin-ajo, sitten
   * kallistus 25° + orbit ±20° + suoristus. Näyte 100 ms välein.
   * K7 SYÖTE SUORISTAA: pointerdown esittelyn aikana → suora ≤ 400 ms:ssa.
   */
  await sivu.evaluate(() => { const p = window.matkakirja.ui.pallonInstanssi; p.pointOfView({ lat: 44, lng: 6, altitude: 0.3 }, 0); });
  const esittely = await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta; const k = l.kallistus();
    const naytteet = [];
    const ajastin = setInterval(() => naytteet.push(k.tila().kulma), 100);
    await l.saavu({ kesto: 1400 });
    const alku = performance.now();
    while (performance.now() - alku < 11000 && (naytteet.length < 20 || k.kaynnissa())) await new Promise((v) => setTimeout(v, 100));
    clearInterval(ajastin);
    return { maksimi: Math.max(...naytteet), lopussa: k.kaynnissa(), pov: window.matkakirja.ui.pallonInstanssi.pointOfView() };
  });
  vaadi(`K6 saapuminen esittelee maan (kulma ≤ ${esittely.maksimi.toFixed(1)}°) ja palaa ylhäältä-näkymään`,
    esittely.maksimi > 20 && esittely.maksimi <= 30 && !esittely.lopussa && !esittely.pov.kallistus, JSON.stringify(esittely));
  const keskeytys = await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta; const k = l.kallistus();
    void k.esittele();
    await new Promise((v) => setTimeout(v, 1500));
    const ennen = k.tila().kulma;
    l.kotelo.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 9, pointerType: 'touch', clientX: 100, clientY: 300 }));
    l.kotelo.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 9, pointerType: 'touch', clientX: 100, clientY: 300 }));
    await new Promise((v) => setTimeout(v, 400));
    const kulma400 = k.tila().kulma;
    await new Promise((v) => setTimeout(v, 300));
    return { ennen, kulma400, paalla700: k.kaynnissa() };
  });
  vaadi('K7 kosketus esittelyn aikana suoristaa kameran (400 ms: < 1°, 700 ms: pois)', keskeytys.ennen > 10 && keskeytys.kulma400 < 1 && !keskeytys.paalla700, JSON.stringify(keskeytys));
  vaadi('K5 ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
