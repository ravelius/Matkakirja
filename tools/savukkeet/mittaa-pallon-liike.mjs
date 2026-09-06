/*
 * MITTARI: pallon liike ja zoom täydellä tarkkuudella (Fablemax 6.9.2026).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-liike.mjs
 *       [--nakyma=puhelin|tyopoyta] [--throttle=4] [--lauta=pallo|kartta]
 *       [--laatu=aina] [--proto=A|A7|B1|C] [--vaihe=liike|zoom|heiluri|kaikki]
 *       [--ulos=<kansio>] [--tunniste=<nimi>] [--korkeus=0.35] [--dpr=1]
 *       [--vartio] [--sarjapaikkaus]
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
 *   5. HEILURI (`--vaihe=heiluri`): nopea edestakainen panorointi sormea
 *      irrottamatta (3 Hz, ± 20 % kotelon leveydestä) JO LADATULLA
 *      alueella — näkyvän alueen laattojen peitto joka kehyksellä ja
 *      musteviivan paksuus kesken heilurin (omistajan palaute v1649).
 *
 * PROTOTYYPIT (--proto) ovat sivun sisään ajettuja paikkauksia, eivät
 * pelin koodia — mittausta varten:
 *   A   välitaso liikkeessä: kynnyskerroin = √(lepokerroin)
 *   A7  välitaso liikkeessä: lepotaso − 1 (kerroin = lepokerroin / 2)
 *   B1  --laatu=aina + updatePov enintään 8 kertaa sekunnissa liikkeessä
 *   C   lepokerros jää päälle liikkeessä (ei kootaa uudestaan)
 *
 * VARTIO (--vartio): sama ajo, mutta lopuksi mittarin luvut verrataan
 * suunnitelman docs/moduulit/pallon-liike-taydella-tarkkuudella.md
 * luvun 5 taulukkoon ("Vaadittu E1:n jälkeen") ja jokaisesta mitasta
 * tulostetaan OK/FAIL-rivi (OHI = mittausta ei ajettu tällä --vaihe- tai
 * --lauta-valinnalla). Yksikin FAIL antaa poistumiskoodin 1, joten
 * mittari kelpaa laattakerroksen (E1) hyväksymisportiksi. Ilman lippua
 * tuloste on ennallaan (JSON-raportti) ja koodi 0. Rajat ovat yhdessä
 * paikassa vakiossa RAJAT; mittojen määritelmät (reunan FWHM, musteraja
 * 150) EIVÄT muutu — ennen/jälkeen-luvut pysyvät vertailukelpoisina.
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
/*
 * TODO: poistetaan E3:n jälkeen — --proto (A/A7/B1/C) ja niiden
 * sivunsisäiset paikkaukset dokumentoivat suunnitelman luvun 2.4
 * mittaukset, joten ne jäävät E1:n ja E2:n ajaksi paikalleen.
 */
const PROTO = arg('proto', null);
const VARTIO = process.argv.includes('--vartio');
const SARJAPAIKKAUS = process.argv.includes('--sarjapaikkaus');
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
/*
 * `--sarjapaikkaus`: SERVATUN laatat.json:in versiot korvataan pyramidin
 * versioilla. Ämpärin kaksi sarjaa poltetaan eri ajoissa, ja välissä
 * versiovahti (lepokerroksenKerrokset) sammuttaa laattakerroksen
 * kokonaan — silloin mittari ei näe kerrosta lainkaan eikä luvun 5
 * mittoja voi ajaa. Lippu asettaa sen tilan, jossa peli on, kun sarjat
 * on poltettu yhdessä. TÄMÄ ON MITTAUSTELINE, EI TODISTE
 * JULKAISTUSTA TILASTA: ilman lippua mittari ajaa sen, mitä ämpärissä
 * oikeasti on (ja vartio kertoo, jos kerros ei piirrä).
 */
const pyramidiSarja = SARJAPAIKKAUS
  ? await fetch('https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json').then((v) => v.json()).catch(() => null)
  : null;
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  if (pyramidiSarja && url.endsWith('laatat.json')) {
    const j = JSON.parse(vastaus.body.toString());
    j.versio = pyramidiSarja.versio;
    j.viivat = pyramidiSarja.viivataso?.versio ?? null;
    j.nostot = pyramidiSarja.nostotaso?.versio ?? null;
    j.ranta = pyramidiSarja.rantataso?.versio ?? null;
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(j), headers: { 'access-control-allow-origin': '*' } });
    return;
  }
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

const tulos = {
  nakyma: NAKYMA, dpr, throttle: THROTTLE, lauta: LAUTA, laatu: LAATU, proto: PROTO,
  korkeus: KORKEUS, sarjapaikkaus: SARJAPAIKKAUS,
};
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
const mittausAlkaa = async (throttle = true) => { await hidasta(throttle); await sivu.evaluate(() => { const M = window.__mittarit; M.kehykset = []; M.updatePov = { n: 0, ms: 0, max: 0 }; M.tasot = []; M.mittaa = true; }); };
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

/* ================= 4: HEILURI (nopea edestakainen panorointi) ================= */
/*
 * OMISTAJAN PALAUTE v1649:STA (iPad, sanatarkasti): *"Ainoastaan jos
 * todella nopeasti panoroi edestakaisin päästämättä sormea irti niin
 * kartta putoaa joiltain osin hetkeksi matalaan laatuun vaikka ko. osa
 * on jo ladattu ja ruudunpäivitys on hyvä."*
 *
 * MITTAUS. Sormi lasketaan ruudun keskelle KERRAN eikä nosteta koko
 * vaiheen aikana (pointerdown, sarja pointermoveja, ei pointerupia
 * ennen kuin kaikki on mitattu) — juuri se ele, josta palaute tulee.
 * Heiluri on sini: poikkeama ± HEILURI_AMPLITUDI × kotelon leveys,
 * taajuus HEILURI_HZ (3 Hz = 6 edestakaista 2 sekunnissa) — mutta askel
 * on rajattu HEILURI_JAKSO_OSUUTEEN kehystä kohti ja kesto mitataan
 * JAKSOINA, ks. vakioiden perustelu alempana.
 *
 * Kolme jaksoa samalla sormella:
 *   1. LÄMMITYS: sama heiluri HEILURI_JAKSOJA jaksoa, jotta koko
 *      heilurin alue on kertaalleen ollut ruudulla.
 *   2. LATAUSTAUKO: sormi paikallaan, kunnes NÄKYVÄ alue on kokonaan
 *      scenessä (katto HEILURI_TAUKO_MS). Tauko on tauko eikä
 *      lisälämmitys: heilurilla lämmittäminen kunnes jono on tyhjä
 *      antaisi vanhalle koneelle niin monta yritystä, että sekin ehtii
 *      ladata ääripäät, eikä mittaus enää näkisi vikaa.
 *   3. MITTAUS: sama heiluri uudestaan, ja joka kehyksellä kerroksen
 *      mittareista näkyvän alueen laattojen peitto
 *      (nakyviaScenessa / nakyvia). Pohjan Z5 näkyy täsmälleen silloin,
 *      kun peitto on alle 100 %.
 * Lopuksi vielä yksi heiluri ilman hidastusta, ja sen keskeltä
 * kuvakaappaus: rantaviivan musteen paksuus ruudun keskialueella
 * (sama mitta kuin luvun 2.1 muste — karkea laatta paksuntaa viivan).
 */
if (VAIHE === 'kaikki' || VAIHE === 'heiluri') {
  const HEILURI_HZ = Number(arg('heilurihz', 3));
  const HEILURI_AMPLITUDI = Number(arg('heiluriamp', 0.2));
  const HEILURI_JAKSOJA = Number(arg('heilurijaksoja', 6));
  const HEILURI_KATTO_MS = Number(arg('heilurikatto', 60000));
  const HEILURI_TAUKO_MS = Number(arg('heiluritauko', 40000));
  /*
   * HEILURI MITATAAN JAKSOINA, EI SEKUNTEINA, JA SEN ASKEL ON RAJATTU
   * KERROKSEN PÄIVITYSVÄLIIN.
   *
   * Omistajan ele on 3 Hz:n heiluri laitteella, joka piirtää 60 kehystä
   * sekunnissa ja päivittää kerroksen 10 kertaa sekunnissa
   * (LAATTAKERROS_PAIVITYSVALI_LIIKE_MS 100): kerros näkee siis
   * 0,3 jaksoa päivitystä kohti, eli ruutu on siirtynyt enimmillään
   * noin 32 % leveydestään sitten viime päivityksen. SE on se luku,
   * jonka algoritmi kokee — ei sekuntikello.
   *
   * Kontin ohjelmistorasteroija piirtää dpr 3:lla 1–2 kehystä
   * SEKUNNISSA, joten 3 Hz:n heiluri laskostuisi satunnaiseen
   * vaiheeseen ja mittaus kertoisi kehysajasta eikä koodista. Vaihe
   * viedään siksi eteenpäin `min(HZ · dt, JAKSO_OSUUS)`:lla: nopealla
   * laitteella se on tasan 3 Hz, hitaalla enintään 0,3 jaksoa
   * kehystä kohti — sama liike päivitystä kohti kuin laitteella.
   * Vaihe ratkaisee myös keston: ajetaan HEILURI_JAKSOJA jaksoa
   * (kello vain kattona).
   */
  const HEILURI_JAKSO_OSUUS = Number(arg('heilurijaksoosuus', 0.3));
  /**
   * Heiluri sivun sisällä: synteettiset PointerEventit koteloon (sama
   * kuuntelija kuin sormella, js/pallo.js asennaPallonEleet). `laske`
   * kerää kerroksen mittarit joka kehyksellä.
   */
  const heiluri = ({ jaksoja, laske = false, alas = false, ylos = false }) => sivu.evaluate(
    ({ jaksoja, laske, alas, ylos, hz, amp, osuus, katto }) => new Promise((ok) => {
      const { ui } = window.matkakirja;
      const kotelo = ui.pallolauta.kotelo;
      const r = kotelo.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const A = r.width * amp;
      const tapahtuma = (laji, x) => kotelo.dispatchEvent(new PointerEvent(laji, {
        clientX: x, clientY: cy, bubbles: true, cancelable: true,
        pointerId: 1, pointerType: 'touch', isPrimary: true, button: 0, buttons: 1,
      }));
      const kerros = ui.pallolauta.lepokerros?.();
      const otokset = [];
      ui.pallolauta.heraa?.();
      if (alas) tapahtuma('pointerdown', cx);
      const t0 = performance.now();
      let edellinen = t0;
      let vaihe = 0; // jaksoina
      const askel = () => {
        const nyt = performance.now();
        const dt = (nyt - edellinen) / 1000;
        edellinen = nyt;
        vaihe += Math.min(hz * dt, osuus);
        tapahtuma('pointermove', cx + A * Math.sin(2 * Math.PI * vaihe));
        if (laske) {
          const m = kerros?.mittarit?.() ?? null;
          if (m) {
            otokset.push({
              t: Math.round(nyt - t0), vaihe: +vaihe.toFixed(2),
              nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa,
              taysin: m.nakyviaTaysin, taso: m.taso, purettuja: m.purettuja, pyyntoja: m.pyyntoja,
              jonossa: m.jonossa, ladattavia: m.ladattavia, laattoja: m.laattoja, valmiita: m.valmiita,
              jumissa: m.jumissa,
            });
          }
        }
        if (vaihe < jaksoja && nyt - t0 < katto) { requestAnimationFrame(askel); return; }
        if (ylos) tapahtuma('pointerup', cx + A * Math.sin(2 * Math.PI * vaihe));
        ok({ otokset, jaksoja: +vaihe.toFixed(2), kestoMs: Math.round(nyt - t0) });
      };
      requestAnimationFrame(askel);
    }),
    {
      jaksoja, laske, alas, ylos, hz: HEILURI_HZ, amp: HEILURI_AMPLITUDI,
      osuus: HEILURI_JAKSO_OSUUS, katto: HEILURI_KATTO_MS,
    },
  );

  await asetaKamera(ateena.lat, ateena.lon, KORKEUS);
  await odotaLepo(3500);
  const ennen = await tila();
  /** Kerroksen mittarit juuri nyt. */
  const kerroksenTila = () => sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? null);
  /*
   * HEILURI MITATAAN ILMAN CPU-HIDASTUSTA. Heiluri on 3 Hz:n signaali, ja
   * sen näytteistys vaatii kehyksiä selvästi tiheämmin: kontin
   * ohjelmistorasteroija piirtää dpr 3:lla noin sekunnin kehyksen, ja 4×
   * hidastus vie sen yhteen kehykseen sekunnissa. Silloin mittaus ei
   * kuvaa laitetta, joka ajaa saman heilurin 60 kehyksellä sekunnissa,
   * vaan laskostuu satunnaiseen vaiheeseen. Muut vaiheet (panorointi,
   * zoom) mitataan hidastettuina kuten ennen — niiden signaali on hidas.
   */
  await mittausAlkaa(false);
  /*
   * 1. LÄMMITYS: sama heiluri kerran läpi (sormi alas eikä enää ylös),
   *    jotta koko heilurin alue on kertaalleen ollut ruudulla — juuri
   *    se, mistä omistaja sanoo *"ko. osa on jo ladattu"*.
   * 2. LATAUSTAUKO: sormi pohjassa paikallaan, kunnes NÄKYVÄ alue on
   *    kokonaan scenessä (`kokoa()` laskee mittarit uudestaan, koska
   *    kerros ei päivity, kun kamera ei liiku). Tauko on aidosti tauko
   *    eikä lisälämmitys: heilurilla lämmittäminen kunnes jono on tyhjä
   *    antaisi vanhalle koneelle niin monta yritystä, että sekin ehtii
   *    ladata ääripäät, eikä mittaus enää näkisi vikaa.
   */
  const lammitys = await heiluri({ jaksoja: HEILURI_JAKSOJA, alas: true });
  await sivu.waitForFunction(() => {
    const kerros = window.matkakirja.ui.pallolauta.lepokerros?.();
    if (!kerros) return true;
    kerros.kokoa?.();
    const m = kerros.mittarit?.();
    return Boolean(m) && m.nakyvia > 0 && m.nakyviaScenessa >= m.nakyvia;
  }, null, { timeout: HEILURI_TAUKO_MS }).catch(() => {});
  const ladattu = await kerroksenTila();
  // 3. Mitattu heiluri: joka kehyksestä näkyvän alueen peitto.
  const mitattu = await heiluri({ jaksoja: HEILURI_JAKSOJA, laske: true });
  const m = await mittausLoppuu();
  const kelpo = mitattu.otokset.filter((o) => o.nakyvia > 0);
  const osuudet = kelpo.map((o) => o.scenessa / o.nakyvia);
  const vaje = kelpo.filter((o) => o.scenessa < o.nakyvia);
  tulos.heiluri = {
    hz: HEILURI_HZ, amplitudiOsuus: HEILURI_AMPLITUDI, jaksoOsuus: HEILURI_JAKSO_OSUUS,
    jaksoja: mitattu.jaksoja, kestoMs: mitattu.kestoMs,
    lammitysJaksoja: lammitys.jaksoja, lammitysMs: lammitys.kestoMs, taukoKattoMs: HEILURI_TAUKO_MS,
    otoksia: kelpo.length,
    peittoMin: kelpo.length ? +(Math.min(...osuudet) * 100).toFixed(1) : null,
    peittoKeski: kelpo.length ? +((osuudet.reduce((a, b) => a + b, 0) / kelpo.length) * 100).toFixed(1) : null,
    vajeitaOtoksia: vaje.length,
    // Unohdetut laatat: tilassa "ladataan", ei aloitettu eikä jonossa.
    jumissa: Math.max(ladattu?.jumissa ?? 0, ...kelpo.map((o) => o.jumissa ?? 0), 0),
    vajeenPahin: vaje.length ? Math.max(...vaje.map((o) => o.nakyvia - o.scenessa)) : 0,
    purettujaAikana: kelpo.length ? kelpo[kelpo.length - 1].purettuja - kelpo[0].purettuja : 0,
    pyyntojaAikana: kelpo.length ? kelpo[kelpo.length - 1].pyyntoja - kelpo[0].pyyntoja : 0,
    tasot: [...new Set(kelpo.map((o) => o.taso))],
    kehyksia: m.kehykset.length, p50: p(m.kehykset, 0.5), p95: p(m.kehykset, 0.95), max: p(m.kehykset, 1),
    updatePov: { n: m.updatePov.n, msPerKutsu: +(m.updatePov.ms / Math.max(1, m.updatePov.n)).toFixed(2), max: +m.updatePov.max.toFixed(1) },
    ennen,
    /*
     * Kerros voi olla kokonaan poissa: ämpärin kaksi sarjaa (pyramidi ja
     * pallon oma laatat.json) poltetaan eri ajoissa, ja versiovahti
     * sammuttaa kerroksen siksi aikaa (js/pallo.js vapautaPohja
     * palauttaa silloin pohjan omaan syvimpään tasoonsa). Silloin
     * heiluria ei voi mitata — vartio kertoo syyn eikä väitä vikaa.
     */
    kerrosPoissa: !ladattu || ladattu.tila !== 'nakyy',
    ladattu: ladattu ? {
      nakyvia: ladattu.nakyvia, scenessa: ladattu.nakyviaScenessa, taso: ladattu.taso,
      laattoja: ladattu.laattoja, valmiita: ladattu.valmiita, pyyntoja: ladattu.pyyntoja,
      jonossa: ladattu.jonossa, ladattavia: ladattu.ladattavia, purettuja: ladattu.purettuja,
      jumissa: ladattu.jumissa,
    } : null,
    otokset: kelpo,
  };
  // 4. Muste heilurin keskeltä: kaappaus kesken liikkeen (ilman hidastusta).
  const vektorienTila = () => sivu.evaluate(() => {
    const v = window.matkakirja.ui.pallolauta.vektorit?.()?.mittarit?.() ?? null;
    return v ? { tila: v.tila, lod: v.lod, tarvePxAste: v.tarvePxAste, soluja: v.soluja, ladattu: v.ladattu } : null;
  });
  const kuvaAjo = heiluri({ jaksoja: HEILURI_JAKSOJA, ylos: true });
  await sivu.waitForTimeout(Math.round(Math.max(600, mitattu.kestoMs / 3)));
  const heiluriKuva = await kaappaa('6-heiluri');
  tulos.heiluri.vektorit = await vektorienTila();
  await kuvaAjo;
  tulos.heiluri.viiva = pinta(heiluriKuva, keski);
  await odotaLepo(3000);
  const heiluriLepo = await kaappaa('7-heiluri-lepo');
  tulos.heiluri.lepo = { tila: await tila(), viiva: pinta(heiluriLepo, keski), vektorit: await vektorienTila() };
}

/* ================= VARTIO (--vartio) ================= */
/*
 * Suunnitelman luvun 5 hyväksymisrajat YHDESSÄ paikassa. Nämä ovat
 * rajoja, eivät mittoja: mittojen määritelmät (reunan FWHM, musteraja
 * 150) asuvat pallon-liike-mittarit.mjs:ssä eivätkä muutu.
 */
const RAJAT = {
  reunaEro: 1, // liike vs lepo, mediaani ja p90 (px)
  reunaMediaani: 3,
  reunaP90: 5,
  muste: 2, // musteviivan paksuus liikkeessä (px)
  updatePovMs: 10,
  updatePovMax: 40,
  laattoja: 120, // laattaverkkoja scenessä lähikuvassa (pohja + kerros)
  drawCalls: 120,
  tekstuuritLevossa: 20, // uudestaan luodut tekstuurit panoroinnin jälkeen
  eroPiikki: 1.5, // zoomsarjan ero vs naapurien keskiarvo
  // Heiluri (omistajan palaute v1649): jo ladattu alue ei saa pudota
  // pohjan Z5:lle kesken nopean edestakaisen panoroinnin.
  heiluriPeitto: 100, // näkyvän alueen laattoja scenessä (%) vähintään
  heiluriMuste: 2, // musteviivan paksuus heilurin aikana (px)
  heiluriJumit: 0, // unohdettuja laattoja (tilassa "ladataan", ei jonossa)
  /*
   * PEITON MITTAAMINEN VAATII, ETTÄ KEHYS ON LYHYEMPI KUIN LAATAN MATKA
   * NÄYTÖNOHJAIMELLE. Kerros päivittyy kerran kehyksessä, ja vasta
   * näkyviin tullut laatta ehtii peittoon vain, jos haku, dekoodaus ja
   * tekstuurin vienti (≤ 2 / kehys) mahtuvat päivitysten väliin —
   * laitteella kehys on 16 ms ja päivitysväli 100 ms, joten aikaa on
   * useita päivityksiä. Kontin ohjelmistorasteroija piirtää dpr 3:lla
   * 1–2 kehystä sekunnissa, ja silloin koko putken pitäisi mahtua
   * yhteen kehykseen: mitta kertoo kehysajasta eikä koodista. Yli tämän
   * rajan menevä kehysaika antaa peittoriville OHI:n; `heilurin jumit`
   * on kehysajasta riippumaton eikä sitä ohiteta koskaan.
   */
  heiluriKehysMs: 400,
};

/**
 * Vertaa raportin luvut rajoihin. Palauttaa rivit { tila, nimi, teksti },
 * joissa tila on OK, FAIL tai OHI (mittausta ei ajettu tällä valinnalla).
 */
const VARTIORIVIT = [
  'reuna liikkeessä', 'muste liikkeessä', 'updatePov', 'laattaverkot', 'piirtokutsut',
  'tekstuurit levossa', 'zoomin tyhjä', 'zoomin ero-piikki', 'heilurin peitto',
  'heilurin jumit', 'heilurin muste', 'zoomin tason vaihdot',
];

function vartioRivit(t) {
  const rivit = [];
  const lisaa = (tila, nimi, teksti) => { rivit.push({ tila, nimi, teksti }); };
  const arvio = (ehto, nimi, teksti) => lisaa(ehto ? 'OK' : 'FAIL', nimi, teksti);
  if (t.kerrosPoissa) {
    const syy = 'laattakerros ei piirrä (pallon sarja ja pyramidi ämpärissä eri versiota tai '
      + 'pyramidin luetteloa ei saatu) — pohja on vapautettu omaan syvimpään tasoonsa '
      + '(js/pallo.js vapautaPohja) ja peli piirtää kuten v1645; luvun 5 rajat koskevat kerrosta';
    for (const nimi of VARTIORIVIT) lisaa('OHI', nimi, syy);
    return rivit;
  }
  const liikeAjettu = VAIHE === 'kaikki' || VAIHE === 'liike';
  const zoomAjettu = (VAIHE === 'kaikki' || VAIHE === 'zoom') && LAUTA === 'pallo';
  // Moottorin luvut (updatePov, laattaverkot, dc, tekstuurit) ovat pallon
  // omia; tasokartalla mitataan vain kuvan reuna ja muste (luku 2.1).
  const pallolla = LAUTA === 'pallo';
  const p90 = (r) => r?.p90 ?? r?.p75 ?? 0;

  /* 1–2. Reunan leveys ja musteviivan paksuus (luku 2.1). Liikkeestä
   * otetaan PAHIN kahdesta kaappauksesta (25 % ja 55 % matkasta). */
  const lepoViiva = t.lepo?.viiva;
  const liikeViivat = [['25 %', t.liike?.viiva], ['55 %', t.liike?.viiva2]]
    .filter(([, v]) => Boolean(v));
  const pahin = liikeViivat.map(([, v]) => v).sort((a, b) => (b.reuna.leveys - a.reuna.leveys)
    || (p90(b.reuna) - p90(a.reuna)) || (b.muste.paksuus - a.muste.paksuus))[0];
  if (!liikeAjettu) {
    lisaa('OHI', 'reuna liikkeessä', `--vaihe=${VAIHE}: liikevaihetta ei ajettu`);
    lisaa('OHI', 'muste liikkeessä', `--vaihe=${VAIHE}: liikevaihetta ei ajettu`);
  } else if (!lepoViiva || !pahin) {
    lisaa('FAIL', 'reuna liikkeessä', 'kuvamittausta ei saatu');
    lisaa('FAIL', 'muste liikkeessä', 'kuvamittausta ei saatu');
  } else {
    const lm = lepoViiva.reuna.leveys; const lp = p90(lepoViiva.reuna);
    const km = pahin.reuna.leveys; const kp = p90(pahin.reuna);
    const osuudet = liikeViivat.map(([nimi, v]) => `${nimi} ${v.reuna.leveys}/${p90(v.reuna)}`).join(', ');
    arvio(Math.abs(km - lm) <= RAJAT.reunaEro && Math.abs(kp - lp) <= RAJAT.reunaEro
      && km <= RAJAT.reunaMediaani && kp <= RAJAT.reunaP90
      && lm <= RAJAT.reunaMediaani && lp <= RAJAT.reunaP90, 'reuna liikkeessä',
    `liike ${km}/${kp} px (${osuudet}), lepo ${lm}/${lp} px `
      + `— raja: ero ≤ ${RAJAT.reunaEro} px ja molemmat ≤ ${RAJAT.reunaMediaani}/${RAJAT.reunaP90} px`);
    arvio(pahin.muste.paksuus <= RAJAT.muste, 'muste liikkeessä',
      `${pahin.muste.paksuus} px (lepo ${lepoViiva.muste.paksuus} px) — raja ≤ ${RAJAT.muste} px`);
  }

  /* 3. updatePov panoroinnissa (luku 2.2). */
  const u = t.pano?.updatePov;
  if (!pallolla) lisaa('OHI', 'updatePov', `--lauta=${LAUTA}: ei laattamoottoria`);
  else if (!liikeAjettu) lisaa('OHI', 'updatePov', `--vaihe=${VAIHE}: panorointia ei ajettu`);
  else if (!u) lisaa('FAIL', 'updatePov', 'mittausta ei saatu');
  else {
    arvio(u.msPerKutsu <= RAJAT.updatePovMs && u.max <= RAJAT.updatePovMax, 'updatePov',
      `${u.msPerKutsu} ms / kutsu, max ${u.max} ms (n ${u.n}) `
      + `— raja ≤ ${RAJAT.updatePovMs} ms ja max ≤ ${RAJAT.updatePovMax} ms`);
  }

  /* 4–5. Laattaverkot ja piirtokutsut lähikuvassa. Luvun 5 taulukon
   * "ennen" (227–312 laattaa, 215–240 dc) on LEVON luku, joten mitta
   * on levon pahin; liikkeen luku näkyy rivillä vertailuksi. */
  const lepoTilat = [t.lepo?.tila, t.lepoPaluu?.tila].filter(Boolean);
  const liikeTila = t.liike?.tila;
  if (!pallolla || !liikeAjettu) {
    const syy = pallolla ? `--vaihe=${VAIHE}: lähikuvaa ei mitattu` : `--lauta=${LAUTA}: ei laattamoottoria`;
    lisaa('OHI', 'laattaverkot', syy);
    lisaa('OHI', 'piirtokutsut', syy);
  } else if (!lepoTilat.length) {
    lisaa('FAIL', 'laattaverkot', 'mittausta ei saatu');
    lisaa('FAIL', 'piirtokutsut', 'mittausta ei saatu');
  } else {
    const laattoja = Math.max(...lepoTilat.map((x) => x.laattoja ?? 0));
    const dc = Math.max(...lepoTilat.map((x) => x.drawCalls ?? 0));
    arvio(laattoja <= RAJAT.laattoja, 'laattaverkot',
      `lepo ${laattoja} (liikkeessä ${liikeTila?.laattoja ?? '?'}, takana ${lepoTilat[0].takana ?? '?'}) `
      + `— raja ≤ ${RAJAT.laattoja}`);
    arvio(dc <= RAJAT.drawCalls, 'piirtokutsut',
      `lepo ${dc} (liikkeessä ${liikeTila?.drawCalls ?? '?'}) — raja ≤ ${RAJAT.drawCalls}`);
  }

  /* 6. Tekstuureja uudestaan levossa panoroinnin jälkeen (luku 2.2:n
   * sarake "tex levossa uudestaan": 27 → 210). */
  const tex0 = t.pano?.jalkeen?.tekstuurit;
  const tex1 = t.pano?.levossaJalkeen?.tila?.tekstuurit;
  if (!pallolla) lisaa('OHI', 'tekstuurit levossa', `--lauta=${LAUTA}: ei laattamoottoria`);
  else if (!liikeAjettu) lisaa('OHI', 'tekstuurit levossa', `--vaihe=${VAIHE}: panorointia ei ajettu`);
  else if (typeof tex0 !== 'number' || typeof tex1 !== 'number') lisaa('FAIL', 'tekstuurit levossa', 'mittausta ei saatu');
  else {
    arvio(tex1 - tex0 <= RAJAT.tekstuuritLevossa, 'tekstuurit levossa',
      `${tex1 - tex0} uudestaan (${tex0} → ${tex1}) — raja ≤ ${RAJAT.tekstuuritLevossa}`);
  }

  /* 7–9. Zoomsarja: tyhjä pohja, ero-piikit ja tason vaihdot. */
  const sarja = t.zoom?.sarja ?? [];
  if (!zoomAjettu) {
    for (const nimi of ['zoomin tyhjä', 'zoomin ero-piikki', 'zoomin tason vaihdot']) {
      lisaa('OHI', nimi, LAUTA === 'pallo' ? `--vaihe=${VAIHE}: zoomia ei ajettu` : `--lauta=${LAUTA}: zoomia ei ajeta`);
    }
  } else if (!sarja.length) {
    lisaa('FAIL', 'zoomin tyhjä', 'kuvasarjaa ei saatu');
    lisaa('FAIL', 'zoomin ero-piikki', 'kuvasarjaa ei saatu');
    lisaa('FAIL', 'zoomin tason vaihdot', `${(t.zoom?.tasot ?? []).length} vaihtoa, kuvasarjaa ei saatu`);
  } else {
    const tyhjat = sarja.filter((r) => r.tyhja > 0);
    arvio(tyhjat.length === 0, 'zoomin tyhjä',
      `${sarja.length} kuvaa, tyhjää yli 0 ${tyhjat.length} kuvassa `
      + `(max ${Math.max(...sarja.map((r) => r.tyhja))}) — raja 0 joka kuvassa`);
    const piikit = [];
    for (let i = 1; i < sarja.length - 1; i += 1) {
      const a = sarja[i - 1].ero; const v = sarja[i].ero; const b = sarja[i + 1].ero;
      if (a == null || v == null || b == null) continue;
      const naapurit = (a + b) / 2;
      if (naapurit > 0 && v > RAJAT.eroPiikki * naapurit) piikit.push(`#${i} ${v} vs ${naapurit.toFixed(1)}`);
    }
    arvio(piikit.length === 0, 'zoomin ero-piikki',
      `${piikit.length ? piikit.join(', ') : 'ei piikkejä'} `
      + `(erot ${sarja.map((r) => r.ero).filter((x) => x != null).join(' ')}) `
      + `— raja ≤ ${RAJAT.eroPiikki} × naapurien keskiarvo`);
  }
  /* 10–11. Heiluri: näkyvän alueen peitto ja muste (omistajan palaute v1649). */
  const heiluriAjettu = (VAIHE === 'kaikki' || VAIHE === 'heiluri') && LAUTA === 'pallo';
  const h = t.heiluri;
  if (!heiluriAjettu) {
    const syy = LAUTA === 'pallo' ? `--vaihe=${VAIHE}: heiluria ei ajettu` : `--lauta=${LAUTA}: heiluria ei ajeta`;
    lisaa('OHI', 'heilurin peitto', syy);
    lisaa('OHI', 'heilurin jumit', syy);
    lisaa('OHI', 'heilurin muste', syy);
  } else if (h?.kerrosPoissa) {
    const syy = 'laattakerros ei piirrä (pallon sarja ja pyramidi eri versiota tai luetteloa ei saatu) '
      + '— pohja on vapautettu omaan syvimpään tasoonsa, heiluria ei voi mitata';
    lisaa('OHI', 'heilurin peitto', syy);
    lisaa('OHI', 'heilurin jumit', syy);
    lisaa('OHI', 'heilurin muste', syy);
  } else if (!h || !h.otoksia) {
    lisaa('FAIL', 'heilurin peitto', 'mittausta ei saatu');
    lisaa('FAIL', 'heilurin jumit', 'mittausta ei saatu');
    lisaa('FAIL', 'heilurin muste', 'mittausta ei saatu');
  } else {
    const peittoTeksti = `${h.peittoMin} % pienimmillään (${h.jaksoja} jaksoa ${h.kestoMs} ms, `
      + `kehys p50 ${h.p50} ms, keski ${h.peittoKeski} %, vajeita ${h.vajeitaOtoksia}/${h.otoksia} otoksessa, `
      + `pahin ${h.vajeenPahin} laattaa, purettuja ${h.purettujaAikana}, pyyntoja ${h.pyyntojaAikana})`;
    if (h.p50 > RAJAT.heiluriKehysMs) {
      lisaa('OHI', 'heilurin peitto', `${peittoTeksti} — kehys p50 ${h.p50} ms > ${RAJAT.heiluriKehysMs} ms, `
        + 'mittausympäristö on liian hidas peittoon (ks. RAJAT.heiluriKehysMs)');
    } else {
      arvio(h.peittoMin >= RAJAT.heiluriPeitto, 'heilurin peitto',
      `${peittoTeksti} — raja ≥ ${RAJAT.heiluriPeitto} %`);
    }
    arvio((h.jumissa ?? 0) <= RAJAT.heiluriJumit, 'heilurin jumit',
      `${h.jumissa} unohdettua laattaa (tilassa "ladataan", ei aloitettu eikä jonossa; `
      + `lataustauolla ${h.ladattu?.jumissa ?? '?'}) — raja ${RAJAT.heiluriJumit}`);
    arvio((h.viiva?.muste?.paksuus ?? Infinity) <= RAJAT.heiluriMuste, 'heilurin muste',
      `${h.viiva?.muste?.paksuus ?? '?'} px (lepo ${h.lepo?.viiva?.muste?.paksuus ?? '?'} px) — raja ≤ ${RAJAT.heiluriMuste} px`);
  }

  if (zoomAjettu && sarja.length) {
    const tasot = (t.zoom?.tasot ?? []).map((x) => x.taso);
    const taakse = tasot.filter((v, i) => i > 0 && v < tasot[i - 1]).length;
    arvio(taakse === 0, 'zoomin tason vaihdot',
      `${tasot.length} vaihtoa (${tasot.join(' → ') || '-'}), joista ${taakse} taaksepäin `
      + '— raja: monotoninen, ei edestakaisin');
  }
  return rivit;
}

tulos.virheet = virheet.slice(0, 5);
tulos.kuvat = kuvat;
/*
 * ONKO LAATTAKERROS YLIPÄÄTÄÄN PÄÄLLÄ? Ämpärin kaksi sarjaa (pyramidi ja
 * pallon oma laatat.json) poltetaan eri ajoissa, ja versiovahti sammuttaa
 * kerroksen siksi aikaa; js/pallo.js vapautaPohja palauttaa silloin pohjan
 * omaan syvimpään tasoonsa ja v1645:n laatutiloihin. Luvun 5 rajat on
 * mitattu KERROKSELLE, joten ne eivät koske sellaista ajoa — vartio kertoo
 * syyn eikä väitä vikaa.
 */
if (LAUTA === 'pallo') {
  tulos.kerrosPoissa = await sivu.evaluate(
    () => window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.()?.tila !== 'nakyy',
  ).catch(() => false);
}
if (VARTIO) tulos.vartio = vartioRivit(tulos);
const raportti = join(ULOS, `${NAKYMA}-${TUNNISTE}${VAIHE === 'kaikki' ? '' : `-${VAIHE}`}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 1));
if (VARTIO) {
  console.log('VARTIO — docs/moduulit/pallon-liike-taydella-tarkkuudella.md luku 5 '
    + `(${NAKYMA}, dpr ${dpr}, throttle ${THROTTLE}×, lauta ${LAUTA}`
    + `${SARJAPAIKKAUS ? ', SARJAPAIKKAUS: laatat.json:in versiot pyramidista' : ''})`);
  const levein = Math.max(...tulos.vartio.map((r) => r.nimi.length));
  for (const r of tulos.vartio) console.log(`${r.tila.padEnd(4)} ${r.nimi.padEnd(levein)}  ${r.teksti}`);
  const laske = (tila) => tulos.vartio.filter((r) => r.tila === tila).length;
  console.log(`VARTIO: ${laske('OK')} OK, ${laske('FAIL')} FAIL, ${laske('OHI')} OHI`);
  if (laske('FAIL')) process.exitCode = 1;
} else {
  console.log(JSON.stringify(tulos, null, 1));
}
console.log('RAPORTTI', raportti);
await selain.close();
palvelin.close();
