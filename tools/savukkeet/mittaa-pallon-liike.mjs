/*
 * MITTARI: pallon liike ja zoom täydellä tarkkuudella (Fablemax 6.9.2026).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-liike.mjs
 *       [--nakyma=puhelin|tyopoyta] [--throttle=4] [--lauta=pallo|kartta]
 *       [--laatu=aina] [--proto=A|A7|B1|C] [--vaihe=liike|zoom|kaikki]
 *       [--ulos=<kansio>] [--tunniste=<nimi>] [--korkeus=0.35] [--dpr=1]
 *
 * Omistaja 6.9.2026 ilta (Raamattu, PALAUTE v1642:STA, LIIKKEEN AIKAINEN
 * TARKKUUS): *"Saisiko tuota siirron aikaista matalampaa resoluutiota
 * mitenkään parannettua? ... rannan ääriviiva ... kasvaa niin paljon
 * paksummaksi"* ja *"Google Earthissä myös sisäänpäin zoomaus näyttää
 * portaattomalta."*
 *
 * MITÄ MITATAAN (kaikki luvut laitepikseleinä ja millisekunteina):
 *   1. Musteviivan paksuus levossa ja liikkeessä Ateenan lähikuvassa:
 *      mustepikselit (luminanssi < MUSTERAJA) ruudun keskialueelta,
 *      paksuus = mediaani pikselin lyhyemmästä vaaka/pystyjuoksusta.
 *      Rantaviiva ja poltettu teksti ovat samaa mustetta — molemmat
 *      paksunevat, kun karkea laatta venyy.
 *   2. Panoroinnin hinta: kehysajat (p50/p95/max) 4 s:n ajon aikana,
 *      updatePov-kutsujen määrä ja kesto, laattaverkkojen määrä
 *      scenessä (ja niistä pallon takapuolella olevat), laattapyynnöt
 *      sekunnissa, draw-callit, tekstuurit ja JS-keko ennen/jälkeen.
 *   3. Zoom 2,5 → korkeus (oletus 0,05) 6 s:ssa: kuvasarja 250 ms välein,
 *      jokaisesta tyhjän (mustan pohjapallon) osuus keskialueella,
 *      perättäisten kuvien ero ja moottorin tason vaihdot aikaleimoin.
 *   4. `--lauta=kartta`: sama panorointi tasokartalla (vertailu).
 *
 * PROTOTYYPIT (--proto) ovat sivun sisään ajettuja paikkauksia, eivät
 * pelin koodia — mittausta varten:
 *   A   välitaso liikkeessä: kynnyskerroin = √(lepokerroin)
 *   A7  välitaso liikkeessä: lepotaso − 1 (kerroin = lepokerroin / 2)
 *   B1  --laatu=aina + updatePov enintään 8 kertaa sekunnissa liikkeessä
 *   C   lepokerros jää päälle liikkeessä (ei kootaa uudestaan)
 *
 * Chromium piirtää ohjelmistorasteroijalla: absoluuttiset kehysajat
 * eivät vastaa laitetta, mutta suhteet (tila vs. tila) ja JS-osuudet
 * (updatePov, laattamäärät, pyynnöt) ovat päteviä. CPU-throttle 4×
 * (CDP Emulation.setCPUThrottlingRate) on puhelinmittausten oletus.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const NAKYMA = arg('nakyma', 'puhelin');
const THROTTLE = Number(arg('throttle', NAKYMA === 'puhelin' ? 4 : 1));
const LAUTA = arg('lauta', 'pallo');
const LAATU = arg('laatu', null);
const PROTO = arg('proto', null);
const VAIHE = arg('vaihe', 'kaikki');
const KORKEUS = Number(arg('korkeus', 0.35));
const ZOOM_LOPPU = Number(arg('zoomloppu', 0.05));
const TUNNISTE = arg('tunniste', [LAUTA, LAATU ? `laatu-${LAATU}` : null, PROTO ? `proto-${PROTO}` : null].filter(Boolean).join('-'));
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pallon-liike');
mkdirSync(ULOS, { recursive: true });

const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;

import { decodePng, reunanLeveys, viivanPaksuus, tyhjanOsuus, kuvienEro, pinta, p } from './pallon-liike-mittarit.mjs';

/* ---------------- palvelin ja ämpäri ---------------- */
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};
const nakyma = { ...NAKYMAT[NAKYMA] };
// --dpr=1 nopeuttaa kuvasarjaa ohjelmistorasteroijalla (zoomin poksahdukset
// näkyvät jo laitepikselisuhteella 1); oletus on laitteen oma (puhelin 3).
if (arg('dpr', null)) nakyma.deviceScaleFactor = Number(arg('dpr'));
const dpr = nakyma.deviceScaleFactor;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
const pyynnot = []; // { t, url }
sivu.on('request', (r) => { const url = r.url(); if (url.includes('julisteet/')) pyynnot.push({ t: Date.now(), url }); });
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body, headers: { 'access-control-allow-origin': '*' } });
});
const cdp = await ctx.newCDPSession(sivu);
/*
 * Throttle vain mittausjaksoilla: kuvakaappaus dpr 3:lla kestää
 * ohjelmistorasteroijalla sekunteja, ja 4× päällä se ylittää aikakaton.
 * Kaappaukset ovat tilan kuvia (kamera on siinä, missä on), joten
 * hidastus ei muuta niiden sisältöä.
 */
const hidasta = (paalla) => cdp.send('Emulation.setCPUThrottlingRate', { rate: paalla && THROTTLE > 1 ? THROTTLE : 1 });

const haku = [`lauta=${LAUTA}`, LAATU ? `laatu=${LAATU}` : null].filter(Boolean).join('&');
await sivu.goto(`${osoite}?${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
if (LAUTA === 'pallo') {
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
} else {
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.kartta?.ajaKamera), null, { timeout: 90000 });
}
await sivu.waitForTimeout(3000);

const tulos = { nakyma: NAKYMA, dpr, throttle: THROTTLE, lauta: LAUTA, laatu: LAATU, proto: PROTO, korkeus: KORKEUS };
const kuvat = [];
const kaappaa = async (nimi) => {
  const polku = join(ULOS, `${NAKYMA}-${TUNNISTE}-${nimi}.png`);
  const buf = await sivu.screenshot({ path: polku, timeout: 120000 });
  kuvat.push(polku);
  return decodePng(buf);
};
// Pelin merkit ja kuplat piiloon: mitataan vain pintaa.
const paallystys = `
  .pallolauta-nappula, .pallolauta-nimi, .pallolauta-nimi-siirto, .pollo-kuplapino, .pollo-vihje,
  .event-toast, .fact-card, .pallolauta-piste, .pallolauta-nosto, .fokusvirta-kupla, .topbar, .bottombar,
  .pallolauta-selite, #hud, .hud, .pawn, .city-label { visibility: hidden !important; }`;
await sivu.addStyleTag({ content: paallystys });

/* ---------------- sivun sisäiset mittarit ---------------- */
await sivu.evaluate(({ proto }) => {
  const M = { updatePov: { n: 0, ms: 0, max: 0 }, kehykset: [], mittaa: false, tasot: [] };
  window.__mittarit = M;
  const { ui } = window.matkakirja;
  // Kehysajat: oma rAF-silmukka (pääsäikeen kehysväli) — myös tasokartalla.
  let edellinen = performance.now();
  const askel = (t) => { if (M.mittaa) M.kehykset.push(t - edellinen); edellinen = t; requestAnimationFrame(askel); };
  requestAnimationFrame(askel);
  const pallo = ui.pallonInstanssi;
  if (!pallo) return;
  let moottori = null;
  pallo.scene().traverse((o) => { if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o; });
  M.moottori = Boolean(moottori);
  if (!moottori) return;
  window.__moottori = moottori;
  // updatePov-ajastus: kääre nykyisen (laatuPov) päälle.
  const sisempi = moottori.updatePov;
  let viimeinenTaso = moottori.level;
  moottori.updatePov = function mitattuPov(kam) {
    const t0 = performance.now();
    const r = sisempi.call(this, kam);
    const dt = performance.now() - t0;
    if (M.mittaa) { M.updatePov.n += 1; M.updatePov.ms += dt; M.updatePov.max = Math.max(M.updatePov.max, dt); }
    if (moottori.level !== viimeinenTaso) { M.tasot.push({ t: performance.now(), taso: moottori.level, korkeus: pallo.pointOfView()?.altitude }); viimeinenTaso = moottori.level; }
    return r;
  };
  /* ---- prototyypit ---- */
  if (proto === 'A' || proto === 'A7') {
    // Kynnykset: kun laatuPov asettaa liikkeen kynnykset (8·napakerroin),
    // annetaan moottorille välitason kynnykset.
    const H = ui.pallolauta.kotelo.clientHeight * Math.min(window.devicePixelRatio || 1, 3);
    const lepokerroin = Math.max(1, H / 304);
    const k = proto === 'A' ? Math.sqrt(lepokerroin) : lepokerroin / 2;
    let asetettu = moottori.thresholds;
    Object.defineProperty(moottori, 'thresholds', {
      configurable: true,
      get() {
        const nap = Math.max(0.16, Math.cos(((pallo.pointOfView()?.lat ?? 0) * Math.PI) / 180));
        const liikkeessa = Math.abs(asetettu[0] - 8 * nap) < 1e-6;
        if (!liikkeessa) return asetettu;
        return Array.from({ length: 30 }, (_, t) => (8 * k * nap) / 2 ** t);
      },
      set(v) { asetettu = v; },
    });
    M.proto = { k, lepokerroin };
  }
  if (proto === 'B1') {
    // updatePov enintään 8/s, kun kamera liikkuu (laatu=aina pitää tason).
    const ulompi = moottori.updatePov;
    let viime = 0;
    let vireilla = 0;
    moottori.updatePov = function harvennettuPov(kam) {
      const nyt = performance.now();
      if (nyt - viime >= 125) { viime = nyt; return ulompi.call(this, kam); }
      clearTimeout(vireilla);
      vireilla = setTimeout(() => { viime = performance.now(); ulompi.call(moottori, kam); }, 125);
      return undefined;
    };
  }
  if (proto === 'C') {
    const kahva = ui.pallolauta.lepokerros();
    if (kahva) { M.protoC = true; kahva.piilota = () => false; }
  }
}, { proto: PROTO });

/* ---------------- apurit ---------------- */
const ateena = await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  const c = game.board.cityById.get('ateena');
  const a = ui.pallolauta ? ui.pallolauta.asteet({ x: c.x, y: c.y }) : null;
  return { x: c.x, y: c.y, lat: a?.lat, lon: a?.lon };
});
const kotelo = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const el = ui.pallolauta?.kotelo ?? ui.mapPane ?? document.body;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
});
tulos.kotelo = kotelo;
// Keskialue laitepikseleinä: 60 % kotelosta keskeltä (reunat, kaarevuus pois).
const keski = {
  x0: Math.round((kotelo.x + kotelo.w * 0.2) * dpr), x1: Math.round((kotelo.x + kotelo.w * 0.8) * dpr),
  y0: Math.round((kotelo.y + kotelo.h * 0.25) * dpr), y1: Math.round((kotelo.y + kotelo.h * 0.75) * dpr),
};

const asetaKamera = (lat, lng, altitude) => sivu.evaluate(({ lat, lng, altitude }) => {
  window.matkakirja.ui.pallolauta.heraa?.();
  window.matkakirja.ui.pallonInstanssi.pointOfView({ lat, lng, altitude }, 0);
}, { lat, lng, altitude });
const odotaLepo = async (ms) => {
  if (LAUTA === 'pallo') await sivu.waitForFunction(() => !window.matkakirja.ui.pallolauta.kamera.kameraAjossa(), null, { timeout: 30000 });
  await sivu.waitForTimeout(ms);
};
const tila = () => sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  if (!pallo) return null;
  const moottori = window.__moottori;
  const renderer = pallo.renderer();
  const kam = pallo.camera();
  // Kameran suunta pallon KESKIPISTEESTÄ maailmankoordinaateissa; laatan
  // keskipiste muunnetaan samaan avaruuteen (laattaryhmä on kierretty).
  const suunta = kam.position.clone().normalize();
  let laattoja = 0; let takana = 0; let ilmanKuvaa = 0;
  moottori?.children.forEach((o) => {
    if (!o.geometry?.boundingSphere && o.geometry?.computeBoundingSphere) o.geometry.computeBoundingSphere();
    if (!o.material?.map && !o.userData?.napakansi) { ilmanKuvaa += 1; }
    if (o.geometry?.parameters?.phiLength === undefined) return;
    laattoja += 1;
    const c = o.geometry.boundingSphere?.center;
    if (c && o.localToWorld(c.clone()).normalize().dot(suunta) < 0) takana += 1;
  });
  const pov = pallo.pointOfView();
  return {
    taso: moottori?.level, laattoja, takana, ilmanKuvaa, korkeus: +pov.altitude.toFixed(3), lat: +pov.lat.toFixed(2), lng: +pov.lng.toFixed(2),
    drawCalls: renderer.info.render.calls, kolmiot: renderer.info.render.triangles,
    tekstuurit: renderer.info.memory.textures, geometriat: renderer.info.memory.geometries,
    pikselisuhde: renderer.getPixelRatio(), keko: Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1048576),
    lepokerros: ui.pallolauta?.lepokerros()?.mittarit?.()?.tila ?? null, lepokerrosSyy: ui.pallolauta?.lepokerros()?.mittarit?.()?.syy ?? null,
  };
});
const mittausAlkaa = async () => { await hidasta(true); await sivu.evaluate(() => { const M = window.__mittarit; M.kehykset = []; M.updatePov = { n: 0, ms: 0, max: 0 }; M.tasot = []; M.mittaa = true; }); };
const mittausLoppuu = async () => { const m = await sivu.evaluate(() => { const M = window.__mittarit; M.mittaa = false; return { kehykset: M.kehykset, updatePov: M.updatePov, tasot: M.tasot, proto: M.proto ?? null }; }); await hidasta(false); return m; };
const ajaKamera = (kohde, kesto) => sivu.evaluate(({ kohde, kesto }) => {
  const { ui } = window.matkakirja;
  const kamera = ui.pallolauta ? ui.pallolauta.kamera : ui.kartta;
  return kamera.ajaKamera(kohde, { kesto, pehmennys: (t) => t });
}, { kohde, kesto });

/* ================= 1 + 2: LEPO JA PANOROINTI ================= */
if (VAIHE === 'kaikki' || VAIHE === 'liike') {
  if (LAUTA === 'pallo') {
    await asetaKamera(ateena.lat, ateena.lon, KORKEUS);
  } else {
    await ajaKamera({ x: ateena.x, y: ateena.y, leveys: 300 }, 0);
  }
  await odotaLepo(3500);
  tulos.lepo = { tila: await tila() };
  const lepoKuva = await kaappaa('1-lepo');
  tulos.lepo.viiva = pinta(lepoKuva, keski);

  // Panorointi: kaksi kotelon leveyttä itään samassa korkeudessa, 4 s, tasainen.
  const leveys = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    if (ui.pallolauta) return ui.pallolauta.kamera.kameranTila().leveys;
    return ui.nakyvaAlue().w;
  });
  tulos.leveysYks = +leveys.toFixed(1);
  const kohde1 = { x: ateena.x + 2 * leveys, y: ateena.y, leveys };
  // Ajo 1: mittarit ilman kaappauksia.
  const ennen = await tila();
  const pyyntojaEnnen = pyynnot.length;
  await mittausAlkaa();
  const t0 = Date.now();
  await ajaKamera(kohde1, 4000);
  const kesto = Date.now() - t0;
  const m = await mittausLoppuu();
  const jalkeen = await tila();
  const pyyntojaAikana = pyynnot.length - pyyntojaEnnen;
  tulos.pano = {
    kestoMs: kesto, kehyksia: m.kehykset.length, p50: p(m.kehykset, 0.5), p95: p(m.kehykset, 0.95), max: p(m.kehykset, 1),
    updatePov: { n: m.updatePov.n, msPerKutsu: +(m.updatePov.ms / Math.max(1, m.updatePov.n)).toFixed(2), max: +m.updatePov.max.toFixed(1), yhtMs: Math.round(m.updatePov.ms) },
    tasot: m.tasot.map((t) => ({ taso: t.taso, korkeus: +(t.korkeus ?? 0).toFixed(3) })),
    laattapyyntoja: pyyntojaAikana, pyyntojaPerS: +(pyyntojaAikana / (kesto / 1000)).toFixed(1),
    ennen, jalkeen, proto: m.proto,
  };
  // Lepo perillä: laattojen palautus (uudet pyynnöt levossa).
  const pyyntojaLevossaAlku = pyynnot.length;
  await odotaLepo(3500);
  tulos.pano.levossaJalkeen = { tila: await tila(), laattapyyntoja: pyynnot.length - pyyntojaLevossaAlku };
  // Ajo 2 takaisin: kaappaus kesken liikkeen — odotetaan, että kamera on
  // ehtinyt 25 % ja 55 % matkasta (kehykset ovat ohjelmistopiirrolla hitaita).
  const paluu = ajaKamera({ x: ateena.x, y: ateena.y, leveys }, 8000);
  const odotaOsuus = (osuus) => sivu.waitForFunction(({ lng0, lng1, osuus }) => {
    const pov = window.matkakirja.ui.pallonInstanssi?.pointOfView?.() ?? window.matkakirja.ui.kartta.kameranTila();
    const lng = pov.lng ?? pov.x;
    return Math.abs(lng - lng0) / Math.abs(lng1 - lng0) >= osuus;
  }, { lng0: LAUTA === 'pallo' ? ateena.lon + 2 * leveys * 360 / 12000 : ateena.x + 2 * leveys, lng1: LAUTA === 'pallo' ? ateena.lon : ateena.x, osuus }, { timeout: 60000 });
  await odotaOsuus(0.25);
  const liikeTila = await tila();
  const liikeKuva = await kaappaa('2-liike');
  await odotaOsuus(0.55);
  const liikeTila2 = await tila();
  const liikeKuva2 = await kaappaa('2b-liike');
  await paluu;
  const pyyntojaPaluu = pyynnot.length;
  tulos.liike = { tila: liikeTila, viiva: pinta(liikeKuva, keski), tila2: liikeTila2, viiva2: pinta(liikeKuva2, keski) };
  await odotaLepo(3500);
  const lepoKuva2 = await kaappaa('3-lepo-paluu');
  tulos.lepoPaluu = { tila: await tila(), viiva: pinta(lepoKuva2, keski), laattapyyntoja: pyynnot.length - pyyntojaPaluu };
}

/* ================= 3: ZOOM ================= */
if ((VAIHE === 'kaikki' || VAIHE === 'zoom') && LAUTA === 'pallo') {
  const ZOOM_MS = Number(arg('zoomms', 8000));
  const zoomAjo = (kesto) => sivu.evaluate(({ lat, lng, loppu, kesto }) => new Promise((ok) => {
    const pallo = window.matkakirja.ui.pallonInstanssi;
    window.matkakirja.ui.pallolauta.heraa?.();
    const a0 = Math.log(2.5); const a1 = Math.log(loppu);
    const t0 = performance.now();
    const askel = () => {
      const t = Math.min(1, (performance.now() - t0) / kesto);
      pallo.pointOfView({ lat, lng, altitude: Math.exp(a0 + (a1 - a0) * t) }, 0);
      if (t < 1) requestAnimationFrame(askel); else ok(true);
    };
    requestAnimationFrame(askel);
  }), { lat: ateena.lat, lng: ateena.lon, loppu: ZOOM_LOPPU, kesto });
  // Ajo 1: kehysajat ja tason vaihdot hidastettuna, ilman kaappauksia.
  await asetaKamera(ateena.lat, ateena.lon, 2.5);
  await odotaLepo(3000);
  const pyyntojaEnnen = pyynnot.length;
  await mittausAlkaa();
  await zoomAjo(ZOOM_MS);
  const m = await mittausLoppuu();
  tulos.zoom = {
    kestoMs: ZOOM_MS, p50: p(m.kehykset, 0.5), p95: p(m.kehykset, 0.95), max: p(m.kehykset, 1), kehyksia: m.kehykset.length,
    updatePov: { n: m.updatePov.n, msPerKutsu: +(m.updatePov.ms / Math.max(1, m.updatePov.n)).toFixed(2), max: +m.updatePov.max.toFixed(1) },
    tasot: m.tasot.map((t) => ({ taso: t.taso, korkeus: +(t.korkeus ?? 0).toFixed(3) })), laattapyyntoja: pyynnot.length - pyyntojaEnnen,
  };
  await odotaLepo(3000);
  tulos.zoom.lepo = { tila: await tila() };
  // Ajo 2: kuvasarja ilman hidastusta (kaappaus kestää sekunteja dpr 3:lla).
  await asetaKamera(ateena.lat, ateena.lon, 2.5);
  await odotaLepo(3000);
  const sarja = [];
  const SARJA_MS = Number(arg('sarjams', 12000));
  const ajo = zoomAjo(SARJA_MS);
  let edellinenKuva = null;
  const alku = Date.now();
  let i = 0;
  while (Date.now() - alku < SARJA_MS + 300) {
    const t = await tila();
    const kuva = await kaappaa(`4-zoom-${String(i).padStart(2, '0')}`);
    const rivi = { i, t: Date.now() - alku, korkeus: t.korkeus, taso: t.taso, laattoja: t.laattoja, ilmanKuvaa: t.ilmanKuvaa, tyhja: tyhjanOsuus(kuva, keski), ero: edellinenKuva ? kuvienEro(edellinenKuva, kuva, keski) : null, reuna: reunanLeveys(kuva, keski).leveys };
    sarja.push(rivi);
    edellinenKuva = kuva;
    i += 1;
  }
  await ajo;
  tulos.zoom.sarja = sarja;
  await odotaLepo(3000);
  const loppuKuva = await kaappaa('5-zoom-lepo');
  tulos.zoom.lepo.viiva = pinta(loppuKuva, keski);
}

tulos.virheet = virheet.slice(0, 5);
tulos.kuvat = kuvat;
const raportti = join(ULOS, `${NAKYMA}-${TUNNISTE}${VAIHE === 'kaikki' ? '' : `-${VAIHE}`}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 1));
console.log(JSON.stringify(tulos, null, 1));
console.log('RAPORTTI', raportti);
await selain.close();
palvelin.close();
