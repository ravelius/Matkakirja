/*
 * ZOOMIN "PIIRTO"-KEHYKSET — PÄÄSÄIE VAI GPU? (Pelikoodari 22.9.2026)
 *
 * Ablaatiotikas (mittaa-ablaatio.mjs) nimeää pitkän kehyksen syyksi
 * "piirto", kun mikään kerroslaskuri ei muuttunut. Se ei erota kahta
 * eri asiaa: pääsäikeen työtä, jota laskurit eivät kirjaa (laattojen
 * näkyvyyslaskenta, vektorien naulaus, CSS2D, three.js:n oma
 * puskurityö), ja näytönohjaimen/komposiittorin aikaa. Tämä mittari
 * jakaa jokaisen kehyksen kahtia:
 *
 *   varattu   rAF-takaisinkutsun alusta siihen, kun pääsäie vapautuu
 *             (MessageChannel-viesti ajetaan vasta rAF-jonon, tyylin,
 *             asettelun ja maalauksen jälkeen) — pääsäikeen työ
 *   vapaa     kehyksen loppu = dt − varattu — odotus GPU:lta / vsync
 *
 * Lisäksi Chromiumilla CDP-profiloija (Profiler.start, 250 µs) koko
 * zoomin ajan; näytteet, jotka osuvat pitkiin kehyksiin, kootaan
 * funktioittain (self-aika), joten pitkän kehyksen pääsäikeen työ saa
 * nimen. WebKitillä ei profiloijaa, vain jako.
 *
 * Absoluuttiset laskurit joka kehyksestä: drawcalls, kolmiot,
 * laattoja scenessä, häipyviä (kaksi kerrosta päällekkäin), näkyviä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/mittaa-zoomipiirto.mjs
 *     SAVUKE_MOOTTORI=chromium|webkit  PORTAAT=1,6  NAKYMAT=ranska
 *     KOKEET=perus,aniso1,eimip,eihaive  ULOS=<kansio>  CPU=4 (Chromium-kuristus)
 *
 * Kokeet kulkevat osoitteen `?koe=`-lipussa: laattojen kokeet lukee
 * js/pallolaatat.js laattakerroksenKokeet (aniso1, eimip, silmat40,
 * eihaive, vientilepo), DOM-kerrosten kokeet js/pallolauta/kerrokset.js
 * asennaPiirtokokeet (eiliike, eiblend, eikasvot, eipollo, eicss2d).
 * KOKEET=perus,eiliike+eipollo — '+' yhdistää.
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
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'chromium';
/* PORTAAT=1,6 tai KERROKSET="porras6;laatat,vektorit,nimet,nostot,nappula,kohteet,ui,aanet" (lista ilman pulua). */
const PORTAAT = process.env.KERROKSET ? process.env.KERROKSET.split(';') : (process.env.PORTAAT ?? '1,6').split(',').map((n) => `porras${n}`);
const NAKYMAT = (process.env.NAKYMAT ?? 'ranska').split(',');
const KOKEET = (process.env.KOKEET ?? 'perus').split(',');
const CPU = Number(process.env.CPU) || 0;
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/zoomipiirto';
mkdirSync(ULOS, { recursive: true });
const DPR = Number(process.env.DPR) || 3;
const VIEWPORT = { width: 390, height: 844 };
const KOHTEET = {
  ranska: { lat: 46.5, lng: 2.5, altitude: 0.2 },
  camargue: { lat: 43.55, lng: 4.5, altitude: 0.05 },
};
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

/* Sivun sisäinen kehysprofiili on js/pallolauta/kehysprofiili.js (asennetaan, kun ?kerrokset= tai ?koe= on osoitteessa). */

/** Profiilin näytteet kehyksiin: self-aika funktioittain pitkissä kehyksissä. */
function kokoaProfiili(profiili, kehykset, aikaSiirto, raja) {
  if (!profiili) return null;
  const solmut = new Map(profiili.nodes.map((n) => [n.id, n]));
  const vanhempi = new Map();
  for (const n of profiili.nodes) for (const lapsi of n.children ?? []) vanhempi.set(lapsi, n.id);
  const pitkat = kehykset.filter((k) => k.dt > raja).map((k) => ({ alku: k.t - k.dt + aikaSiirto, loppu: k.t + aikaSiirto }));
  const kaikki = kehykset.length ? { alku: kehykset[0].t - kehykset[0].dt + aikaSiirto, loppu: kehykset[kehykset.length - 1].t + aikaSiirto } : null;
  const nimi = (n) => `${n.callFrame.functionName || '(anon)'} ${n.callFrame.url.split('/').pop()}:${n.callFrame.lineNumber + 1}`;
  // Natiivi (":0") saa kutsujansa nimen perään: texSubImage2D ← initTexture ← …
  const polku = (n) => {
    const osat = [nimi(n)];
    let id = n.id;
    for (let i = 0; i < 3 && osat.length < 3; i += 1) {
      id = vanhempi.get(id); const v = id == null ? null : solmut.get(id);
      if (!v || v.callFrame.functionName === '(root)') break;
      if (v.callFrame.url) osat.push(nimi(v));
    }
    return osat.join(' ← ');
  };
  const summaa = (ikkunat) => {
    const self = new Map();
    let t = profiili.startTime;
    let yhteensa = 0;
    for (let i = 0; i < profiili.samples.length; i += 1) {
      const dt = profiili.timeDeltas[i] ?? 0; t += dt;
      const ms = t / 1000;
      if (!ikkunat.some((w) => ms >= w.alku && ms <= w.loppu)) continue;
      const n = solmut.get(profiili.samples[i]);
      if (!n) continue;
      const avain = polku(n);
      // (garbage collector), (program), (idle) erottuvat nimestään.
      self.set(avain, (self.get(avain) ?? 0) + dt / 1000);
      yhteensa += dt / 1000;
    }
    return { yhteensa, top: [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([n, ms]) => ({ n, ms: Number(ms.toFixed(1)) })) };
  };
  return { pitkat: summaa(pitkat), kaikki: kaikki ? summaa([kaikki]) : null, pitkia: pitkat.length };
}

const tulokset = [];
const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
for (const koe of KOKEET) for (const porras of PORTAAT) {
  const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d.tallenne); localStorage.removeItem('matkakirja-lauta'); }, { tallenne });
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  let cdp = null;
  if (MOOTTORI !== 'webkit') {
    cdp = await ctx.newCDPSession(sivu);
    if (CPU > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
  }
  // Koe kulkee osoitteessa (`?koe=`), jotta Laitetestaaja toistaa saman laitteella; '+' erottaa yhdistelmän.
  await sivu.goto(`${osoite}?lauta=pallo&kerrokset=${porras}${koe && koe !== 'perus' ? `&koe=${koe.split('+').join(',')}` : ''}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(1500);
  await sivu.waitForFunction(() => Boolean(window.__kehysprofiili), null, { timeout: 30000 });
  const gpu = await sivu.evaluate(() => {
    const gl = window.matkakirja.ui.pallonInstanssi.renderer?.()?.getContext?.();
    const d = gl?.getExtension?.('WEBGL_debug_renderer_info');
    return { renderer: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl?.getParameter?.(gl.RENDERER), aniso: gl?.getExtension?.('EXT_texture_filter_anisotropic') ? 'on' : 'ei', koe: [...document.body.classList].filter((c) => c.startsWith('piirtokoe-')), laattakoe: window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.()?.kokeet ?? null };
  });
  for (const nakyma of NAKYMAT) {
    await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, KOHTEET[nakyma]);
    await sivu.waitForTimeout(4000);
    await sivu.waitForFunction(async () => { const m = await import('/js/laattapyramidi.js'); return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka); }, null, { timeout: 30000 }).catch(() => {});
    await sivu.waitForTimeout(1500);
    // ── ZOOMI: sisään kolmasosaan ja takaisin, kirjaston tween; profiloija päällä ──
    let profiloijanAlku = 0;
    if (cdp) { await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 250 }); await cdp.send('Profiler.start'); profiloijanAlku = await sivu.evaluate(() => performance.now()); }
    await sivu.evaluate(() => window.__kehysprofiili.aloita());
    await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: pov.altitude / 3 }, 1500), KOHTEET[nakyma]);
    await sivu.waitForTimeout(1700);
    await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 1500), KOHTEET[nakyma]);
    await sivu.waitForTimeout(1700);
    const zoomi = await sivu.evaluate(() => { const t = window.__kehysprofiili.lopeta(); return { ...t, teksti: window.__kehysprofiili.teksti(t) }; });
    let profiili = null;
    if (cdp) { profiili = (await cdp.send('Profiler.stop')).profile; await cdp.send('Profiler.disable'); }
    const kehykset = zoomi.kehykset;
    const dts = kehykset.map((k) => k.dt);
    const pitkat = kehykset.filter((k) => k.dt > 25);
    // Profiloijan aika on µs monotonisesta kellosta; sidotaan sivun performance.now():hon aloitushetkellä (virhe ~1 ms).
    const aikaSiirto = profiili ? profiili.startTime / 1000 - profiloijanAlku : 0;
    const koonti = kokoaProfiili(profiili, kehykset.map((k) => ({ ...k, t: k.t + zoomi.alku })), aikaSiirto, 25);
    const rivi = {
      koe, porras, nakyma, moottori: MOOTTORI, cpu: CPU, gpu, virheet: [...virheet],
      kehyksia: dts.length, mediaani: prosenttipiste(dts, 0.5), p95: prosenttipiste(dts, 0.95), max: Math.max(...dts),
      yli50: dts.filter((d) => d > 50).length, yli25: pitkat.length,
      varattuMed: prosenttipiste(kehykset.map((k) => k.varattu ?? 0), 0.5),
      varattuP95: prosenttipiste(kehykset.map((k) => k.varattu ?? 0), 0.95),
      // Pitkien kehysten jako: kuinka suuri osa dt:stä oli pääsäikeen työtä.
      pitkatVarattuOsuus: pitkat.length ? pitkat.reduce((a, k) => a + (k.varattu ?? 0), 0) / pitkat.reduce((a, k) => a + k.dt, 0) : null,
      pisimmat: [...kehykset].sort((a, b) => b.dt - a.dt).slice(0, 12).map((k) => ({ t: Math.round(k.t), dt: Math.round(k.dt), varattu: Math.round(k.varattu ?? -1), drawcalls: k.drawcalls, kolmiot: k.kolmiot, scenessa: k.scenessa, hapyvia: k.hapyvia, nakyvia: k.nakyvia, taso: k.taso, paivityksia: k.paivityksia, pyyntoja: k.pyyntoja, rasterit: k.rasterit, jakoja: k.jakoja })),
      drawcallsMax: Math.max(...kehykset.map((k) => k.drawcalls)), kolmiotMax: Math.max(...kehykset.map((k) => k.kolmiot)),
      scenessaMax: Math.max(...kehykset.map((k) => k.scenessa)), hapyviaMax: Math.max(...kehykset.map((k) => k.hapyvia)),
      profiili: koonti,
      kehykset,
    };
    tulokset.push(rivi);
    console.log(`${koe} porras ${porras} ${nakyma} ${MOOTTORI}${CPU > 1 ? ` cpu×${CPU}` : ''}: zoomi med ${p(rivi.mediaani)} p95 ${p(rivi.p95)} max ${p(rivi.max)} ms, >50: ${rivi.yli50}, >25: ${rivi.yli25}/${rivi.kehyksia} | varattu med ${p(rivi.varattuMed)} p95 ${p(rivi.varattuP95)} | pitkien varattu-osuus ${rivi.pitkatVarattuOsuus == null ? '—' : Math.round(rivi.pitkatVarattuOsuus * 100) + ' %'} | drawcalls ≤ ${rivi.drawcallsMax}, laattoja scenessä ≤ ${rivi.scenessaMax}, häipyviä ≤ ${rivi.hapyviaMax} | gpu ${gpu.renderer}`);
    console.log(`   ${zoomi.teksti.split('\n')[0].split(' | ').slice(-1)[0]} | ${zoomi.teksti.split('\n')[1]}`);
    for (const k of rivi.pisimmat.slice(0, 6)) console.log(`   t ${k.t} dt ${k.dt} varattu ${k.varattu} | dc ${k.drawcalls} tri ${k.kolmiot} scenessä ${k.scenessa} häipyy ${k.hapyvia} näkyviä ${k.nakyvia} taso ${k.taso} päiv ${k.paivityksia} pyynt ${k.pyyntoja} rast ${k.rasterit} jak ${k.jakoja}`);
    if (koonti) {
      console.log(`   profiili pitkissä kehyksissä (${koonti.pitkia} kpl, ${p(koonti.pitkat.yhteensa)} ms näytteitä):`);
      for (const r of koonti.pitkat.top.slice(0, 15)) console.log(`     ${p(r.ms)} ms  ${r.n}`);
    }
  }
  await ctx.close();
}
await selain.close(); palvelin.close();
writeFileSync(join(ULOS, `zoomipiirto-${MOOTTORI}${CPU > 1 ? `-cpu${CPU}` : ''}.json`), JSON.stringify(tulokset.map((r) => ({ ...r, kehykset: r.kehykset.map((k) => ({ t: Math.round(k.t), dt: Math.round(k.dt * 10) / 10, v: k.varattu == null ? null : Math.round(k.varattu * 10) / 10, dc: k.drawcalls, sc: k.scenessa, h: k.hapyvia })) })), null, 1));
console.log(`→ ${ULOS}`);
