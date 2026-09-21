/*
 * ABLAATIOTIKAS — SULAVUUS KERROS KERRALLAAN (omistajan menetelmä
 * 21.9.2026, Fable). Ei vartioita: mittari, joka kirjoittaa raportin.
 *
 * Avaa pallolaudan `?lauta=pallo&kerrokset=porras<N>` (js/pallolauta/
 * kerrokset.js) jokaisella portaalla 1–6, puhelinkoossa 390 × 844 dpr 3,
 * WebKitillä (oletus) tai Chromiumilla, kahdessa näkymässä (Ranska z6 ja
 * Camargue z8), ja ajaa kummassakin panoroinnin (hiiren veto 3 s) ja
 * zoomiajon (sisään ja ulos). Sivun sisällä rAF-silmukka kirjaa joka
 * kehyksestä keston ja kerrosten laskurien muutokset:
 *
 *   laatat      lepokerroksen pyynnöt ja purut (js/pallolaatat.js mittarit)
 *   ladonta     sovittimen nimi- ja nostojaot (glnimiot-sovitin.js tila)
 *   rasterit    valmistuneet nimiö-/nostorasterit (nimiorasterit.js tila)
 *   gl          rungon rakennukset (pallonimiot-gl.js mittarit)
 *   tekstuurit  three.js renderer.info.memory.textures (uudet tekstuurit GPU:lle)
 *   drawcalls   renderer.info.render.calls
 *   dom         document.getElementsByTagName('*').length (CSS2D-kirjoitukset)
 *   keko        performance.memory.usedJSHeapSize (vain Chromium; lasku = GC)
 *
 * Pitkän kehyksen SYY on se laskuri, joka muuttui juuri siinä
 * kehyksessä; ilman muutosta syy on "piirto" (GPU/komposiitti).
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/mittaa-ablaatio.mjs
 *     SAVUKE_MOOTTORI=webkit|chromium  PORTAAT=1,2,3,4,5,6  NAKYMAT=ranska,camargue
 *     ULOS=<kansio> (json + md)
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const PORTAAT = (process.env.PORTAAT ?? '1,2,3,4,5,6').split(',').map(Number);
const NAKYMAT = (process.env.NAKYMAT ?? 'ranska,camargue').split(',');
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/ablaatio';
mkdirSync(ULOS, { recursive: true });
const DPR = Number(process.env.DPR) || 3;
const VIEWPORT = { width: 390, height: 844 };
const KOHTEET = {
  ranska: { lat: 46.5, lng: 2.5, altitude: 0.2 },
  camargue: { lat: 43.55, lng: 4.5, altitude: 0.05 },
};
const PANOROINTI_MS = 3000;
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

const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');
const prosenttipiste = (arvot, q) => {
  if (!arvot.length) return NaN;
  const s = [...arvot].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * (s.length - 1)))];
};

/** Sivun sisäinen kehysprofiili: aloita() → lopeta() palauttaa kehykset laskureineen. */
const PROFIILI = `(() => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta; const pallo = ui.pallonInstanssi;
  const lue = () => {
    const laatat = l.lepokerros?.()?.mittarit?.() ?? {};
    const s = l.glSovitin?.(); const st = s?.tila?.() ?? {};
    const k = ui.pallolautaGL?.()?.mittarit?.() ?? {};
    const info = pallo.renderer?.()?.info ?? {};
    return {
      pyyntoja: laatat.pyyntoja ?? 0, purettuja: laatat.purettuja ?? 0, taso: laatat.taso ?? null,
      jakoja: (st.jakoja ?? 0) + (st.nostojakoja ?? 0), rasterit: st.rasterit?.valmiita ?? 0,
      rakennuksia: k.rakennuksia ?? 0, tekstuurit: info.memory?.textures ?? 0, geometriat: info.memory?.geometries ?? 0,
      drawcalls: info.render?.calls ?? 0, kolmiot: info.render?.triangles ?? 0,
      dom: document.getElementsByTagName('*').length,
      keko: performance.memory?.usedJSHeapSize ?? null,
    };
  };
  let tila = null;
  window.__ablaatio = {
    aloita() {
      tila = { kehykset: [], kaynnissa: true, edellinen: lue(), t: performance.now(), pitkat: [] };
      const askel = () => {
        if (!tila.kaynnissa) return;
        const nyt = performance.now(); const dt = nyt - tila.t; tila.t = nyt;
        const uusi = lue(); const d = {};
        for (const [avain, arvo] of Object.entries(uusi)) {
          const vanha = tila.edellinen[avain];
          if (typeof arvo === 'number' && typeof vanha === 'number' && arvo !== vanha) d[avain] = arvo - vanha;
          else if (avain === 'taso' && arvo !== vanha) d.taso = String(vanha) + '→' + String(arvo);
        }
        tila.edellinen = uusi;
        tila.kehykset.push({ dt, d });
        requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
      try {
        tila.po = new PerformanceObserver((lista) => { for (const e of lista.getEntries()) tila.pitkat.push({ t: e.startTime, kesto: e.duration }); });
        tila.po.observe({ entryTypes: ['longtask'] });
      } catch { tila.po = null; }
    },
    lopeta() {
      if (!tila) return null; tila.kaynnissa = false; tila.po?.disconnect?.();
      // Ensimmäinen kehys sisältää aloituksen viiveen: pois.
      return { kehykset: tila.kehykset.slice(1), pitkat: tila.pitkat, loppu: lue() };
    },
  };
})()`;

const tulokset = [];
const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] });
for (const porras of PORTAAT) {
  const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo&kerrokset=porras${porras}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(1500);
  await sivu.evaluate(PROFIILI);
  const kerrokset = await sivu.evaluate(() => ({
    body: [...document.body.classList].filter((c) => c.startsWith('kerros-pois-')),
    vektorit: Boolean(window.matkakirja.ui.pallolauta.vektorit?.()),
    glSovitin: Boolean(window.matkakirja.ui.pallolauta.glSovitin?.()),
  }));
  for (const nakyma of NAKYMAT) {
    await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, KOHTEET[nakyma]);
    await sivu.waitForTimeout(4000);
    // Laatat tarkkaan laatuun ennen mittausta, ettei lähtötilan lataus näy.
    await sivu.waitForFunction(async () => { const m = await import('/js/laattapyramidi.js'); return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka); }, null, { timeout: 30000 }).catch(() => {});
    await sivu.waitForTimeout(1500);
    const lahto = await sivu.evaluate(() => {
      const ui = window.matkakirja.ui; const l = ui.pallolauta; const s = l.glSovitin?.();
      return { pov: ui.pallonInstanssi.pointOfView(), dom: document.getElementsByTagName('*').length, nostot: s?.tila?.() ?? null, gl: ui.pallolautaGL?.()?.mittarit?.() ?? null, laatat: l.lepokerros?.()?.mittarit?.() ?? null };
    });
    // ── PANOROINTI: hiiren veto 3 s, edestakaisin kahdesti ──
    await sivu.evaluate(() => window.__ablaatio.aloita());
    const x0 = VIEWPORT.width / 2; const y0 = VIEWPORT.height / 2;
    await sivu.mouse.move(x0, y0); await sivu.mouse.down();
    const askelia = Math.round(PANOROINTI_MS / 33);
    for (let i = 1; i <= askelia; i += 1) {
      const vaihe = (i / askelia) * Math.PI * 4;
      await sivu.mouse.move(x0 + Math.sin(vaihe) * 120, y0 + Math.sin(vaihe / 2) * 60);
      await sivu.waitForTimeout(33);
    }
    await sivu.mouse.up();
    await sivu.waitForTimeout(400);
    const panorointi = await sivu.evaluate(() => window.__ablaatio.lopeta());
    await sivu.waitForTimeout(1500);
    // ── ZOOMI: sisään kolmasosaan ja takaisin, kirjaston tween ──
    await sivu.evaluate(() => window.__ablaatio.aloita());
    await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: pov.altitude / 3 }, 1500), KOHTEET[nakyma]);
    await sivu.waitForTimeout(1700);
    await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 1500), KOHTEET[nakyma]);
    await sivu.waitForTimeout(1700);
    const zoomi = await sivu.evaluate(() => window.__ablaatio.lopeta());
    await sivu.screenshot({ path: join(ULOS, `ablaatio-${MOOTTORI}-porras${porras}-${nakyma}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
    const tiivista = (ajo) => {
      const dts = ajo.kehykset.map((k) => k.dt);
      const pisimmat = ajo.kehykset.map((k, i) => ({ i, dt: k.dt, syy: Object.keys(k.d).length ? k.d : 'piirto' }))
        .sort((a, b) => b.dt - a.dt).slice(0, 10);
      return {
        kehyksia: dts.length, mediaani: prosenttipiste(dts, 0.5), p95: prosenttipiste(dts, 0.95), max: Math.max(...dts),
        yli50: dts.filter((d) => d > 50).length, yli20: dts.filter((d) => d > 20).length, pisimmat, pitkat: ajo.pitkat.length,
        // Laskurien summat koko ajolta: mitä kerros teki liikkeen aikana.
        summat: ajo.kehykset.reduce((a, k) => { for (const [n, v] of Object.entries(k.d)) if (typeof v === 'number') a[n] = (a[n] ?? 0) + v; return a; }, {}),
      };
    };
    const rivi = { porras, nakyma, moottori: MOOTTORI, kerrokset, lahto, panorointi: tiivista(panorointi), zoomi: tiivista(zoomi), virheet: [...virheet] };
    tulokset.push(rivi);
    const kuvaa = (t) => `med ${p(t.mediaani)} p95 ${p(t.p95)} max ${p(t.max)} ms, >50: ${t.yli50}, >20: ${t.yli20}/${t.kehyksia}`;
    console.log(`porras ${porras} ${nakyma} ${MOOTTORI}: panorointi ${kuvaa(rivi.panorointi)} | zoomi ${kuvaa(rivi.zoomi)} | dom ${lahto.dom} gl ${lahto.gl?.instansseja ?? '—'}`);
  }
  await ctx.close();
}
await selain.close(); palvelin.close();
writeFileSync(join(ULOS, `ablaatio-${MOOTTORI}.json`), JSON.stringify(tulokset, null, 1));
// Markdown-taulukko raporttia varten.
const rivit = ['| porras | näkymä | panorointi med / p95 / max | >50 | zoomi med / p95 / max | >50 | pisimmän syy (panorointi) |', '| --- | --- | --- | --- | --- | --- | --- |'];
for (const r of tulokset) {
  const syy = r.panorointi.pisimmat[0] ? JSON.stringify(r.panorointi.pisimmat[0].syy) : '—';
  rivit.push(`| ${r.porras} | ${r.nakyma} | ${p(r.panorointi.mediaani)} / ${p(r.panorointi.p95)} / ${p(r.panorointi.max)} | ${r.panorointi.yli50} | ${p(r.zoomi.mediaani)} / ${p(r.zoomi.p95)} / ${p(r.zoomi.max)} | ${r.zoomi.yli50} | ${syy} |`);
}
writeFileSync(join(ULOS, `ablaatio-${MOOTTORI}.md`), `${rivit.join('\n')}\n`);
console.log(rivit.join('\n'));
