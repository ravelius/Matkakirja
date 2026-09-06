/*
 * MITTARI: rantaviivat ja rajat vektoreina pallolla (Fablemax 6.9.2026,
 * Raamattu "VEKTORIT SAMALLA"; suunnitelma docs/moduulit/pallon-vektoriviivat.md).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-vektorit.mjs
 *       [--tapa=peli|line2|nauha|polut|svg|ei] [--aineisto=<tee-aineisto.mjs:n kansio>]
 *       [--nakyma=puhelin|tyopoyta] [--throttle=4] [--leveys=1.5] [--vari=debug|oikea]
 *       [--haku=rajat=0&lod=2] [--vaihe=lepo|liike|zoom|kaikki] [--ulos=<kansio>]
 *       [--tunniste=<nimi>] [--dpr=1] [--vartio] [--vertailu=<raportti.json>]
 *
 * Ajaa tools/kokeilut/pallon-vektorit/pallo.html:n (pelin oma pallo +
 * vektorikerros kytkimen takana) samoissa oloissa kuin
 * mittaa-pallon-liike.mjs: puhelin 390 × 844 dpr 3, CPU-throttle 4×
 * mittausjaksoilla, ämpäri Noden fetchillä.
 *
 * KAKSI TAPAA. `--tapa=peli` ajaa PELIN OMAN moduulin js/pallovektorit.js
 * (luoPallovektorit, vakiot moduulista, aineisto ämpäristä
 * PALLOVEKTORIT_JUURI) — silloin mittari mittaa tuotantokoodia eikä
 * `--aineisto`-kansiota tarvita lainkaan. Kokeilun omat tavat (line2,
 * nauha, polut, svg) lukevat solunsa `--aineisto`-kansiosta, joka
 * tarjoillaan polusta /_aineisto/.
 *
 * VARTIO (--vartio): sama ajo, mutta lopuksi luvut verrataan
 * suunnitelman docs/moduulit/pallon-vektoriviivat.md luvun 5 rajoihin
 * ja jokaisesta mitasta tulostetaan OK/FAIL-rivi (OHI = mittausta ei
 * ajettu tällä --vaihe- tai --vari-valinnalla, tai vertailuraporttia ei
 * annettu). Yksikään FAIL antaa poistumiskoodin 1, joten erän voi ajaa
 * portiksi. `--vertailu=<raportti.json>` on saman näkymän `--tapa=ei`
 * -ajon raportti: siitä luetaan panoroinnin p50 ilman vektoreita.
 *
 * MITÄ MITATAAN (laitepikseleinä ja millisekunteina):
 *   1. VIIVAN LEVEYS levossa, liikkeessä ja zoomin portailla: kun
 *      --vari=debug, vektoriviiva on magentaa ja sen paksuus mitataan
 *      suoraan (lyhyemmän vaaka/pystyjuoksun mediaani magentapikseleistä),
 *      ja lisäksi poltetun musteen mitat (pallon-liike-mittarit: reunan
 *      FWHM, musteviiva) samasta keskialueesta.
 *   2. HORISONTTI: koko pallon näkymässä magentapikselit pallon kiekon
 *      ulkopuolella (vuoto reunan yli) ja magentan määrä — sama ajo
 *      --haku=syvyys=0 kertoo, mitä syvyystesti leikkaa pois (takapuoli).
 *   3. SYVYYSJÄRJESTYS: koepiste (kultainen levy rannikon kärjessä) —
 *      magentaa levyn sisällä = viiva piirtyy pisteen päälle (virhe);
 *      PINTAKERROKSEN (laattakerros js/pallolaatat.js, polygonOffset −8
 *      ja renderOrder −10 + z; vanha lepokerros samalla siirrolla)
 *      päällä magentan määrä ennen ja jälkeen kerroksen — z-taistelu
 *      näkyisi katona. Raporttiin kirjataan myös pintakerroksen omat
 *      mittarit (tila, taso, scenessa, kaytetytTavut).
 *   4. PANOROINNIN HINTA: kehysajat (vain suhteet, ohjelmistorasteroija),
 *      piirtokutsut (myös kerroksen OMA osuus: kehys kerroksen oliot
 *      näkyvissä ja kehys ne piilotettuina), kolmiot, kerroksen oma JS
 *      (paivitaMs, svgMs), pyynnöt ja tavut, JS-keko.
 *   5. ZOOM 2,5 → 0,05: tasonvalinta (lod), solut, janat ja leveys
 *      neljällä kiinteällä korkeudella.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, pinta, p } from './pallon-liike-mittarit.mjs';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const AINEISTO = arg('aineisto', null);
const TAPA = arg('tapa', 'line2');
const NAKYMA = arg('nakyma', 'puhelin');
const THROTTLE = Number(arg('throttle', NAKYMA === 'puhelin' ? 4 : 1));
const LEVEYS = Number(arg('leveys', 1.5));
const VARI = arg('vari', 'debug');
const HAKU = arg('haku', '');
const VAIHE = arg('vaihe', 'kaikki');
const TUNNISTE = arg('tunniste', [TAPA, VARI, `l${LEVEYS}`, HAKU ? HAKU.replace(/[^a-z0-9]+/gi, '_') : null].filter(Boolean).join('-'));
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pallon-vektorit');
const VARTIO = process.argv.includes('--vartio');
const VERTAILU = arg('vertailu', null);
mkdirSync(ULOS, { recursive: true });
/*
 * AINEISTOKANSIO VAIN KOKEILUN OMILLE TAVOILLE. `--tapa=peli` ajaa pelin
 * moduulin, joka hakee solunsa ämpäristä (PALLOVEKTORIT_JUURI) sivun
 * route-käsittelijän kautta, ja `--tapa=ei` ei lataa mitään.
 */
const AINEISTOA_TARVITAAN = TAPA !== 'peli' && TAPA !== 'ei';
if (AINEISTOA_TARVITAAN && (!AINEISTO || !existsSync(join(AINEISTO, 'luettelo.json')))) {
  console.error(`--tapa=${TAPA} vaatii --aineisto=<kansio>, jossa on tee-aineisto.mjs:n `
    + 'luettelo.json (tuotantomoduulin mittaus: --tapa=peli, ei aineistokansiota)');
  process.exit(1);
}
const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;

/* ---------------- palvelin: repo + aineisto + ämpäri ---------------- */
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.bin': 'application/octet-stream', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  if (reitti.startsWith('/_aineisto/') && !AINEISTO) { res.writeHead(404); res.end(); return; }
  const polku = reitti.startsWith('/_aineisto/') ? join(AINEISTO, reitti.slice('/_aineisto/'.length)) : join(JUURI, reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/tools/kokeilut/pallon-vektorit/pallo.html`;
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

const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};
const nakyma = { ...NAKYMAT[NAKYMA] };
if (arg('dpr', null)) nakyma.deviceScaleFactor = Number(arg('dpr'));
const dpr = nakyma.deviceScaleFactor;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text().slice(0, 200)); });
const pyynnot = [];
sivu.on('request', (r) => { const url = r.url(); if (url.includes('julisteet/') || url.includes('/_aineisto/')) pyynnot.push({ t: Date.now(), url }); });
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body, headers: { 'access-control-allow-origin': '*' } });
});
const cdp = await ctx.newCDPSession(sivu);
const hidasta = (paalla) => cdp.send('Emulation.setCPUThrottlingRate', { rate: paalla && THROTTLE > 1 ? THROTTLE : 1 });

const haku = [`vektorit=${TAPA}`, `leveys=${LEVEYS}`, VARI === 'debug' ? 'vari=debug' : null, HAKU || null].filter(Boolean).join('&');
await sivu.goto(`${osoite}?${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.koe), null, { timeout: 90000 });
await sivu.evaluate(() => window.koe.valmis);
await sivu.waitForTimeout(2500);

/* ---------------- pikselimittarit (magenta = vektoriviiva) ------------ */
const onMagenta = (d, i) => d[i] > 150 && d[i + 2] > 150 && d[i + 1] < 110;
const onTausta = (d, i) => Math.abs(d[i] - 0x2a) < 14 && Math.abs(d[i + 1] - 0x1d) < 14 && Math.abs(d[i + 2] - 0x12) < 14;
/** Magentaviivan paksuus: lyhyemmän juoksun mediaani/p75/p90, pikselimäärä. */
function magentanPaksuus(kuva, alue) {
  const { width, data } = kuva;
  const { x0, y0, x1, y1 } = alue;
  const W = x1 - x0; const H = y1 - y0;
  const m = new Uint8Array(W * H);
  let n = 0;
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) { if (onMagenta(data, ((y + y0) * width + (x + x0)) * 4)) { m[y * W + x] = 1; n += 1; } }
  if (!n) return { paksuus: 0, p75: 0, p90: 0, pikseleita: 0 };
  const vaaka = new Uint16Array(W * H); const pysty = new Uint16Array(W * H);
  for (let y = 0; y < H; y += 1) { let x = 0; while (x < W) { if (!m[y * W + x]) { x += 1; continue; } let e = x; while (e < W && m[y * W + e]) e += 1; for (let k = x; k < e; k += 1) vaaka[y * W + k] = e - x; x = e; } }
  for (let x = 0; x < W; x += 1) { let y = 0; while (y < H) { if (!m[y * W + x]) { y += 1; continue; } let e = y; while (e < H && m[e * W + x]) e += 1; for (let k = y; k < e; k += 1) pysty[k * W + x] = e - y; y = e; } }
  const arvot = [];
  for (let i = 0; i < W * H; i += 1) if (m[i]) arvot.push(Math.min(vaaka[i], pysty[i]));
  arvot.sort((a, b) => a - b);
  const q = (pp) => arvot[Math.min(arvot.length - 1, Math.floor(arvot.length * pp))];
  return { paksuus: q(0.5), p75: q(0.75), p90: q(0.9), pikseleita: n };
}
/** Magentapikselit koko kuvassa ja pallon kiekon (ei-tausta, laajennettu 2 px) ulkopuolella. */
function magentaVuoto(kuva) {
  const { width, height, data } = kuva;
  const pallo = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i += 1) if (!onTausta(data, i * 4)) pallo[i] = 1;
  let magenta = 0; let ulkona = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x;
      if (!onMagenta(data, i * 4)) continue;
      magenta += 1;
      // Kiekon sisällä, jos 3 px säteellä on jokin ei-magenta pallopikseli.
      let sisalla = false;
      for (let dy = -3; dy <= 3 && !sisalla; dy += 1) for (let dx = -3; dx <= 3; dx += 1) {
        const xx = x + dx; const yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
        const j = yy * width + xx;
        if (pallo[j] && !onMagenta(data, j * 4)) { sisalla = true; break; }
      }
      if (!sisalla) ulkona += 1;
    }
  }
  return { magenta, ulkona };
}
/** Magentaa ympyrän sisällä (koepiste). */
function magentaaYmpyrassa(kuva, cx, cy, r) {
  let n = 0; let kulta = 0;
  for (let y = Math.floor(cy - r); y <= cy + r; y += 1) for (let x = Math.floor(cx - r); x <= cx + r; x += 1) {
    if ((x - cx) ** 2 + (y - cy) ** 2 > r * r || x < 0 || y < 0 || x >= kuva.width || y >= kuva.height) continue;
    const i = (y * kuva.width + x) * 4;
    if (onMagenta(kuva.data, i)) n += 1;
    if (kuva.data[i] > 180 && kuva.data[i + 1] > 140 && kuva.data[i + 2] < 90) kulta += 1;
  }
  return { magentaa: n, kultaa: kulta };
}
/** Viivan väri: mediaani tummista (luminanssi < 150) pikseleistä alueella. */
function musteenVari(kuva, alue) {
  const { width, data } = kuva;
  const r = []; const g = []; const b = [];
  for (let y = alue.y0; y < alue.y1; y += 1) for (let x = alue.x0; x < alue.x1; x += 1) {
    const i = (y * width + x) * 4;
    const L = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (L < 150) { r.push(data[i]); g.push(data[i + 1]); b.push(data[i + 2]); }
  }
  const med = (a) => { if (!a.length) return null; a.sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
  // Ydin: tummimman kymmenyksen (luminanssi) pikselien keskiarvo — viivan oma sävy ilman reunan sekoitusta.
  const L = r.map((_, i) => 0.299 * r[i] + 0.587 * g[i] + 0.114 * b[i]);
  const jarj = L.map((l, i) => i).sort((a, b2) => L[a] - L[b2]).slice(0, Math.max(1, Math.floor(L.length / 10)));
  const ka = (a) => Math.round(jarj.reduce((s, i) => s + a[i], 0) / jarj.length);
  const ydin = r.length ? { r: ka(r), g: ka(g), b: ka(b) } : null;
  return { r: med(r), g: med(g), b: med(b), n: r.length, ydin };
}

/* ---------------- apurit ------------------------------------------- */
const kotelo = await sivu.evaluate(() => { const r = window.koe.kotelo.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
const keski = {
  x0: Math.round((kotelo.x + kotelo.w * 0.2) * dpr), x1: Math.round((kotelo.x + kotelo.w * 0.8) * dpr),
  y0: Math.round((kotelo.y + kotelo.h * 0.25) * dpr), y1: Math.round((kotelo.y + kotelo.h * 0.75) * dpr),
};
const kuvat = [];
const kaappaa = async (nimi) => {
  const polku = join(ULOS, `${NAKYMA}-${TUNNISTE}-${nimi}.png`);
  const buf = await sivu.screenshot({ path: polku, timeout: 120000 });
  kuvat.push(polku);
  return decodePng(buf);
};
const tila = () => sivu.evaluate(() => window.koe.tila());
/**
 * PINTAKERROKSEN (laattakerros E1, js/pallolaatat.js; vanha lepokerros
 * samalla kahvalla) omat mittarit. Pelissä kahva on
 * `ui.pallolauta.lepokerros()`, kokeilusivulla `window.koe.lepokerros()`
 * — sama js/pallo.js:n pallonLepokerros molemmissa.
 */
const laattakerros = () => sivu.evaluate(() => {
  const ui = window.matkakirja?.ui;
  const kahva = (ui && ui.pallolauta ? ui.pallolauta.lepokerros() : window.koe.lepokerros?.()) ?? null;
  const m = kahva?.mittarit?.();
  if (!m) return null;
  return {
    tila: m.tila ?? null, taso: m.taso ?? null, laattoja: m.laattoja ?? null,
    scenessa: m.scenessa ?? null, kaytetytTavut: m.kaytetytTavut ?? null,
  };
});
/**
 * Vektorikerroksen OMA osuus piirtokutsuista: kehys nykyisellään ja
 * kehys kerroksen oliot piilotettuina (näkyvyys pois, ei purkua — sama
 * tapa kuin z-taistelussa). Erotus on kerroksen hinta piirtokutsuina.
 */
const piirtoOsuus = () => sivu.evaluate(async () => {
  const renderer = window.koe.pallo.renderer();
  const kehys = () => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
  await kehys();
  const kanssa = renderer.info.render.calls;
  const oliot = [];
  window.koe.pallo.scene().traverse((o) => {
    if ((o.userData?.pallovektorit || o.userData?.vektorit) && o.visible) oliot.push(o);
  });
  for (const o of oliot) o.visible = false;
  await kehys();
  const ilman = renderer.info.render.calls;
  for (const o of oliot) o.visible = true;
  await kehys();
  return { kanssa, ilman, oma: kanssa - ilman, olioita: oliot.length };
});
const ateena = await sivu.evaluate(() => window.koe.ateena);
const aseta = (korkeus, lat = ateena.lat, lng = ateena.lng) => sivu.evaluate(({ lat, lng, korkeus }) => window.koe.asetaNakyma({ lat, lng, korkeus }), { lat, lng, korkeus });
/**
 * Lepo: odotetaan, että laattapyynnöt ovat tauonneet (1,5 s ilman uutta
 * pyyntöä) JA lepokerros näkyy (tai lepokerrosta ei tule: yleiskuva),
 * enintään --lepo ms (oletus 20 s — kontissa laatat kulkevat Noden
 * fetchin kautta hitaasti, ja kolme rinnakkaista ajoa jakavat kaistan).
 */
const LEPO_MS = Number(arg('lepo', 20000));
const odotaLepo = async () => {
  const alku = Date.now();
  while (Date.now() - alku < LEPO_MS) {
    const viimeisin = pyynnot.length ? pyynnot[pyynnot.length - 1].t : 0;
    const t = await sivu.evaluate(() => window.koe.tila()); // eslint-disable-line no-await-in-loop
    const kerrosValmis = t.lepokerros === 'nakyy' || (t.korkeus > 0.6 && Date.now() - alku > 3000);
    if (Date.now() - viimeisin > 1500 && kerrosValmis) break;
    await sivu.waitForTimeout(400); // eslint-disable-line no-await-in-loop
  }
  await sivu.evaluate(() => window.koe.vektorit?.paivita?.());
  await sivu.waitForTimeout(800);
};
const mittausAlkaa = async () => {
  await hidasta(true);
  await sivu.evaluate(() => {
    const M = { kehykset: [], drawCalls: [], mittaa: true };
    window.__mittarit = M;
    let edellinen = performance.now();
    const askel = (t) => {
      if (!M.mittaa) return;
      M.kehykset.push(t - edellinen); edellinen = t;
      M.drawCalls.push(window.koe.pallo.renderer().info.render.calls);
      requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  });
};
const mittausLoppuu = async () => {
  const m = await sivu.evaluate(() => { const M = window.__mittarit; M.mittaa = false; return { kehykset: M.kehykset, drawCalls: M.drawCalls }; });
  await hidasta(false);
  return m;
};
const yhteenveto = (m) => ({
  kehyksia: m.kehykset.length, p50: p(m.kehykset, 0.5), p95: p(m.kehykset, 0.95), max: p(m.kehykset, 1),
  drawCallsP50: p(m.drawCalls, 0.5), drawCallsMax: p(m.drawCalls, 1),
});

const tulos = { nakyma: NAKYMA, dpr, throttle: THROTTLE, tapa: TAPA, leveys: LEVEYS, vari: VARI, haku: HAKU, kotelo };
/*
 * ALKUTILA ennen ensimmäistäkään näkymänvaihtoa: kirjasto avaa pallon
 * koko maailman näkymään, joten kerroksen kumulatiiviset pyynnöt ja
 * tavut sisältävät jo yleiskuvan solut. Saapumisnäkymän hinta on
 * EROTUS tähän (luku 5: "pyynnöt kerroksesta Ateenan saapumisnäkymässä").
 */
tulos.alku = { vektorit: await sivu.evaluate(() => window.koe.vektorit?.mittarit() ?? null), laattakerros: await laattakerros() };

/* ================= 1: LEPO KOLMESSA NÄKYMÄSSÄ ================= */
if (VAIHE === 'kaikki' || VAIHE === 'lepo') {
  tulos.lepo = {};
  for (const [nimi, korkeus] of [['ateena', 0.35], ['lahi', 0.08], ['maailma', 2.5]]) {
    await aseta(korkeus);
    await odotaLepo();
    const t = await tila();
    const kuva = await kaappaa(`1-lepo-${nimi}`);
    const rivi = {
      tila: t, muste: pinta(kuva, keski), vari: musteenVari(kuva, keski),
      laattakerros: await laattakerros(), piirto: await piirtoOsuus(),
    };
    if (VARI === 'debug') {
      rivi.vektori = magentanPaksuus(kuva, keski);
      rivi.vuoto = magentaVuoto(kuva);
    }
    if (nimi === 'lahi') {
      // Koepiste: kultainen levy rannikon kärjessä; magentaa levyn sisällä = viiva päällä.
      const kp = await sivu.evaluate(() => { const k = window.koe.koepiste; const r = window.koe.ruudulla(k.lat, k.lon, 0.003); return r ? { x: r.x, y: r.y } : null; });
      if (kp) {
        const cx = (kotelo.x + kp.x) * dpr; const cy = (kotelo.y + kp.y) * dpr;
        rivi.koepiste = { x: Math.round(cx), y: Math.round(cy), ...magentaaYmpyrassa(kuva, cx, cy, 5 * dpr) };
      }
      // Lepokerros pois (piilota) → sama kuva ilman kerrosta: magentan määrä ei saa muuttua.
      if (VARI === 'debug') {
        const ennen = rivi.vektori.pikseleita;
        // PINTAKERROS POIS: laattakerros (E1) merkitsee verkkonsa
        // userData.laattakerros, vanha lepokerros userData.lepokerros —
        // kumpikin on polygonOffset −8:lla vektorin (−12) alla.
        const piilo = (nakyy) => sivu.evaluate((n) => {
          const { pallo } = window.koe;
          let verkkoja = 0;
          pallo.scene().traverse((o) => {
            if (!o.userData?.lepokerros && !o.userData?.laattakerros) return;
            o.visible = n; verkkoja += 1;
          });
          return verkkoja;
        }, nakyy);
        const verkkoja = await piilo(false);
        await sivu.waitForTimeout(300);
        const kuva2 = await kaappaa(`1-lepo-${nimi}-ilman-lepokerrosta`);
        rivi.ilmanLepokerrosta = { verkkoja, vektori: magentanPaksuus(kuva2, keski), muste: pinta(kuva2, keski) };
        rivi.zTaistelu = { verkkoja, magentaaKerroksella: ennen, magentaaIlman: rivi.ilmanLepokerrosta.vektori.pikseleita, suhde: +(ennen / Math.max(1, rivi.ilmanLepokerrosta.vektori.pikseleita)).toFixed(3) };
        await piilo(true);
      }
    }
    tulos.lepo[nimi] = rivi;
  }
}

/* ================= 2: PANOROINTI ================= */
if (VAIHE === 'kaikki' || VAIHE === 'liike') {
  await aseta(0.35);
  await odotaLepo();
  const ennen = await tila();
  const pyyntojaEnnen = pyynnot.length;
  const dLng = 2 * 9.1; // kaksi ruudunleveyttä ≈ 302 lautayksikköä ≈ 9,1° (mittaa-pallon-liike)
  await mittausAlkaa();
  const t0 = Date.now();
  await sivu.evaluate(({ lat, lng, korkeus }) => window.koe.ajaNakyma({ lat, lng, korkeus }, 4000), { lat: ateena.lat, lng: ateena.lng + dLng, korkeus: 0.35 });
  const kesto = Date.now() - t0;
  const m = await mittausLoppuu();
  const jalkeen = await tila();
  tulos.pano = { kestoMs: kesto, ...yhteenveto(m), pyyntoja: pyynnot.length - pyyntojaEnnen, ennen, jalkeen };
  // Paluu hitaasti, kaappaus kesken liikkeen (25 % ja 55 %).
  const paluu = sivu.evaluate(({ lat, lng, korkeus }) => window.koe.ajaNakyma({ lat, lng, korkeus }, 8000), { lat: ateena.lat, lng: ateena.lng, korkeus: 0.35 });
  const odotaOsuus = (osuus) => sivu.waitForFunction(({ lng0, lng1, osuus }) => {
    const pov = window.koe.pallo.pointOfView();
    return Math.abs(pov.lng - lng0) / Math.abs(lng1 - lng0) >= osuus;
  }, { lng0: ateena.lng + dLng, lng1: ateena.lng, osuus }, { timeout: 60000 });
  await odotaOsuus(0.25);
  const k1 = await kaappaa('2-liike');
  const t1 = await tila();
  await odotaOsuus(0.55);
  const k2 = await kaappaa('2b-liike');
  const t2 = await tila();
  await paluu;
  tulos.liike = {
    tila: t1, muste: pinta(k1, keski), vektori: VARI === 'debug' ? magentanPaksuus(k1, keski) : null,
    tila2: t2, muste2: pinta(k2, keski), vektori2: VARI === 'debug' ? magentanPaksuus(k2, keski) : null,
  };
  await odotaLepo();
  const k3 = await kaappaa('3-lepo-paluu');
  tulos.lepoPaluu = { tila: await tila(), muste: pinta(k3, keski), vektori: VARI === 'debug' ? magentanPaksuus(k3, keski) : null };
}

/* ================= 3: ZOOM ================= */
if (VAIHE === 'kaikki' || VAIHE === 'zoom') {
  // Ajo: kehysajat ja kerroksen tasonvaihdot hidastettuna.
  await aseta(2.5);
  await odotaLepo();
  const pyyntojaEnnen = pyynnot.length;
  await mittausAlkaa();
  const vaihdot = [];
  const seuranta = (async () => {
    const alku = Date.now();
    while (Date.now() - alku < 8400) {
      const t = await sivu.evaluate(() => { const v = window.koe.vektorit?.mittarit(); const pov = window.koe.pallo.pointOfView(); return { korkeus: +pov.altitude.toFixed(3), lod: v?.lod ?? null, soluja: v?.soluja ?? 0, janoja: v?.janoja ?? 0, nakyvia: v?.nakyvia ?? 0 }; }); // eslint-disable-line no-await-in-loop
      if (!vaihdot.length || vaihdot[vaihdot.length - 1].lod !== t.lod || vaihdot[vaihdot.length - 1].soluja !== t.soluja) vaihdot.push(t);
      await sivu.waitForTimeout(200); // eslint-disable-line no-await-in-loop
    }
  })();
  await sivu.evaluate(({ lat, lng }) => new Promise((ok) => {
    const { pallo } = window.koe;
    const a0 = Math.log(2.5); const a1 = Math.log(0.05);
    const t0 = performance.now();
    const askel = () => {
      const t = Math.min(1, (performance.now() - t0) / 8000);
      pallo.pointOfView({ lat, lng, altitude: Math.exp(a0 + (a1 - a0) * t) }, 0);
      if (t < 1) requestAnimationFrame(askel); else ok(true);
    };
    requestAnimationFrame(askel);
  }), { lat: ateena.lat, lng: ateena.lng });
  await seuranta;
  const m = await mittausLoppuu();
  tulos.zoom = { ...yhteenveto(m), vaihdot, pyyntoja: pyynnot.length - pyyntojaEnnen };
  // Portaat: leveys neljällä korkeudella levossa.
  tulos.zoom.portaat = [];
  for (const korkeus of [1.0, 0.35, 0.1, 0.05]) {
    await aseta(korkeus);
    await odotaLepo();
    const kuva = await kaappaa(`4-zoom-${String(korkeus).replace('.', '_')}`);
    const t = await tila();
    tulos.zoom.portaat.push({ korkeus, lod: t.vektorit?.lod ?? null, janoja: t.vektorit?.janoja ?? null, drawCalls: t.drawCalls, taso: t.taso, muste: pinta(kuva, keski), vektori: VARI === 'debug' ? magentanPaksuus(kuva, keski) : null });
  }
}

/* ================= VARTIO (--vartio) ================= */
/*
 * Suunnitelman docs/moduulit/pallon-vektoriviivat.md luvun 5
 * hyväksymisrajat YHDESSÄ paikassa. Nämä ovat RAJOJA, eivät mittoja:
 * mittojen määritelmät (magentan tunnistus, lyhyemmän juoksun mediaani)
 * asuvat tämän tiedoston pikselimittareissa eivätkä muutu. Rajaa ei
 * säädetä mittauksen mukaan — jos luku ei täyty, se raportoidaan.
 */
const RAJAT = {
  leveys: 2, // magentaviivan mediaani laitepikseleinä JOKA rivillä
  leveysP90: 4, // p90 lähikuvassa, Ateenassa, liikkeessä ja zoomin portailla
  leveysP90Yleiskuva: 6, // koko pallon näkymä: tiheät rannikot sulautuvat
  koepiste: 0, // magentaa kultaisen koepisteen levyn sisällä
  zTaisteluAla: 0.97,
  zTaisteluYla: 1.03,
  vuotoOsuus: 0.003, // magentaa pallon kiekon ulkopuolella / kaikki magenta
  piirtoAteena: 60, // kerroksen OMA osuus piirtokutsuista Ateenan näkymässä
  piirtoMaailma: 4, // sama koko pallon näkymässä
  paivitaMs: 5, // kerroksen oma JS päivitystä kohti (4× hidastus)
  panoSuhde: 2.2, // pano p50 vs. --vertailu-ajon (tapa=ei) p50
  pyyntoja: 30, // kerroksen pyyntöjä Ateenan saapumisnäkymään mennessä
  tavua: 150 * 1024,
};

/**
 * Vertaa raportin luvut rajoihin. Palauttaa rivit { tila, nimi, teksti },
 * joissa tila on OK, FAIL tai OHI (mittausta ei ajettu tällä valinnalla).
 */
function vartioRivit(t) {
  const rivit = [];
  const lisaa = (tila, nimi, teksti) => { rivit.push({ tila, nimi, teksti }); };
  const arvio = (ehto, nimi, teksti) => lisaa(ehto ? 'OK' : 'FAIL', nimi, teksti);
  const lepoAjettu = VAIHE === 'kaikki' || VAIHE === 'lepo';
  const liikeAjettu = VAIHE === 'kaikki' || VAIHE === 'liike';
  const zoomAjettu = VAIHE === 'kaikki' || VAIHE === 'zoom';
  const debug = VARI === 'debug';
  const p90 = (v) => v?.p90 ?? v?.p75 ?? 0;

  /* 0. Kerros elää: ilman tätä kaikki muut luvut olisivat nollia. */
  const m = t.vektorit;
  arvio(m?.tila === 'nakyy', 'kerroksen tila',
    `tila ${m?.tila ?? '-'}${m?.syy ? ` (${m.syy})` : ''}, lod ${m?.lod ?? '-'}, `
    + `soluja ${m?.soluja ?? 0}, janoja ${m?.janoja ?? 0} — raja: nakyy`);

  /* 1–2. Viivan leveys joka näkymässä (luku 5, rivit 1 ja 2). */
  const leveys = (nimi, v, raja) => {
    if (!debug) { lisaa('OHI', nimi, `--vari=${VARI}: magentamittausta ei tehdä`); return; }
    if (!v) { lisaa('OHI', nimi, `--vaihe=${VAIHE}: mittausta ei ajettu`); return; }
    arvio(v.paksuus === RAJAT.leveys && p90(v) <= raja, nimi,
      `mediaani ${v.paksuus} px, p90 ${v.p90} px, ${v.pikseleita} px magentaa `
      + `— raja: mediaani ${RAJAT.leveys}, p90 ≤ ${raja}`);
  };
  leveys('leveys lepo ateena', lepoAjettu ? t.lepo?.ateena?.vektori : null, RAJAT.leveysP90);
  leveys('leveys lepo lahikuva', lepoAjettu ? t.lepo?.lahi?.vektori : null, RAJAT.leveysP90);
  leveys('leveys lepo maailma', lepoAjettu ? t.lepo?.maailma?.vektori : null, RAJAT.leveysP90Yleiskuva);
  leveys('leveys liike 25 %', liikeAjettu ? t.liike?.vektori : null, RAJAT.leveysP90);
  leveys('leveys liike 55 %', liikeAjettu ? t.liike?.vektori2 : null, RAJAT.leveysP90);
  for (const porras of (zoomAjettu ? t.zoom?.portaat ?? [] : [])) {
    leveys(`leveys zoom ${String(porras.korkeus).replace('.', ',')}`, porras.vektori, RAJAT.leveysP90);
  }
  if (zoomAjettu && !(t.zoom?.portaat ?? []).length) lisaa('OHI', 'leveys zoomin portaat', 'porrasmittausta ei saatu');

  /* 3. Koepiste: viiva ei saa peittää kaupunkipistettä (luku 4.3). */
  const kp = t.lepo?.lahi?.koepiste;
  if (!lepoAjettu || !debug) lisaa('OHI', 'koepiste', `--vaihe=${VAIHE} --vari=${VARI}: ei mitattu`);
  else if (!kp) lisaa('FAIL', 'koepiste', 'koepistettä ei saatu ruudulle');
  else {
    arvio(kp.magentaa <= RAJAT.koepiste, 'koepiste',
      `${kp.magentaa} px magentaa levyn sisällä (kultaa ${kp.kultaa} px) — raja: ${RAJAT.koepiste}`);
  }

  /* 4. Z-taistelu pintakerrosta (E1 laattakerros / lepokerros) vasten. */
  const zt = t.lepo?.lahi?.zTaistelu;
  if (!lepoAjettu || !debug) lisaa('OHI', 'z-taistelu pintakerros', `--vaihe=${VAIHE} --vari=${VARI}: ei mitattu`);
  else if (!zt) lisaa('FAIL', 'z-taistelu pintakerros', 'vertailukuvaa ilman pintakerrosta ei saatu');
  else {
    arvio(zt.suhde >= RAJAT.zTaisteluAla && zt.suhde <= RAJAT.zTaisteluYla, 'z-taistelu pintakerros',
      `${zt.magentaaKerroksella} px kerroksen kanssa / ${zt.magentaaIlman} px ilman = ${zt.suhde} `
      + `(${zt.verkkoja ?? '?'} verkkoa piilotettu, kerros ${t.lepo?.lahi?.laattakerros?.tila ?? '-'} `
      + `taso ${t.lepo?.lahi?.laattakerros?.taso ?? '-'}) — raja: ${RAJAT.zTaisteluAla}…${RAJAT.zTaisteluYla}`);
  }

  /* 5. Horisontti: viiva ei saa vuotaa kiekon reunan yli (luku 4.4). */
  const vuoto = t.lepo?.maailma?.vuoto;
  if (!lepoAjettu || !debug) lisaa('OHI', 'horisontti', `--vaihe=${VAIHE} --vari=${VARI}: ei mitattu`);
  else if (!vuoto?.magenta) lisaa('FAIL', 'horisontti', 'magentaa ei löytynyt koko pallon näkymästä');
  else {
    const osuus = vuoto.ulkona / vuoto.magenta;
    arvio(osuus <= RAJAT.vuotoOsuus, 'horisontti',
      `${vuoto.ulkona} / ${vuoto.magenta} px = ${(osuus * 100).toFixed(2)} % kiekon ulkopuolella `
      + `— raja: ≤ ${(RAJAT.vuotoOsuus * 100).toFixed(1)} %`);
  }

  /* 6. Kerroksen oma osuus piirtokutsuista (luku 5). */
  const piirto = (nimi, mitta, raja) => {
    if (!lepoAjettu || !mitta) { lisaa('OHI', nimi, `--vaihe=${VAIHE}: ei mitattu`); return; }
    arvio(mitta.oma <= raja, nimi,
      `${mitta.oma} kutsua (${mitta.kanssa} kerroksen kanssa, ${mitta.ilman} ilman, `
      + `${mitta.olioita} oliota) — raja: ≤ ${raja}`);
  };
  piirto('piirtokutsut ateena', t.lepo?.ateena?.piirto, RAJAT.piirtoAteena);
  piirto('piirtokutsut maailma', t.lepo?.maailma?.piirto, RAJAT.piirtoMaailma);

  /* 7. Kerroksen oma JS päivitystä kohti: pahin koko ajolta. */
  const msLuvut = [];
  const keraa = (o) => {
    if (!o || typeof o !== 'object') return;
    if (typeof o.paivitaMs === 'number' && typeof o.lod !== 'undefined') msLuvut.push(o.paivitaMs);
    for (const arvo of Object.values(o)) if (arvo && typeof arvo === 'object') keraa(arvo);
  };
  keraa(t);
  if (!msLuvut.length) lisaa('FAIL', 'paivitaMs', 'kerroksen mittareita ei saatu');
  else {
    const pahin = Math.max(...msLuvut);
    arvio(pahin <= RAJAT.paivitaMs, 'paivitaMs',
      `pahin ${pahin} ms (${msLuvut.length} otosta, mediaani ${p(msLuvut, 0.5)} ms) — raja: ≤ ${RAJAT.paivitaMs} ms`);
  }

  /* 8. Panoroinnin kehyshinta vertailuajoon (--tapa=ei) nähden. */
  if (!liikeAjettu) lisaa('OHI', 'pano p50', `--vaihe=${VAIHE}: liikevaihetta ei ajettu`);
  else if (!VERTAILU) lisaa('OHI', 'pano p50', `${t.pano?.p50 ?? '-'} ms — anna --vertailu=<tapa=ei -ajon raportti>`);
  else if (!vertailu?.pano?.p50) lisaa('FAIL', 'pano p50', `vertailuraportista ${VERTAILU} ei löydy pano.p50:tä`);
  else {
    const suhde = t.pano.p50 / vertailu.pano.p50;
    arvio(suhde <= RAJAT.panoSuhde, 'pano p50',
      `${t.pano.p50} ms vs ${vertailu.pano.p50} ms ilman vektoreita = ${suhde.toFixed(2)} × `
      + `— raja: ≤ ${RAJAT.panoSuhde} ×`);
  }

  /*
   * 9. Ateenan SAAPUMISNÄKYMÄN oma hinta: kumulatiivisista luvuista
   * vähennetään alkutila (kirjaston avaama yleiskuva), jotta mitta on
   * "mitä saapuminen maksaa" eikä "mitä sivu on kaikkiaan hakenut".
   * Molemmat luvut näkyvät rivillä.
   */
  const saapuminen = t.lepo?.ateena?.tila?.vektorit;
  const alku = t.alku?.vektorit;
  if (!lepoAjettu || !saapuminen) {
    lisaa('OHI', 'pyynnot kerroksesta', `--vaihe=${VAIHE}: lepovaihetta ei ajettu`);
    lisaa('OHI', 'tavut kerroksesta', `--vaihe=${VAIHE}: lepovaihetta ei ajettu`);
  } else {
    const pyyntoja = saapuminen.pyyntoja - (alku?.pyyntoja ?? 0);
    const tavua = saapuminen.tavua - (alku?.tavua ?? 0);
    arvio(pyyntoja <= RAJAT.pyyntoja, 'pyynnot kerroksesta',
      `${pyyntoja} pyyntöä saapumiseen (yleiskuva ${alku?.pyyntoja ?? '-'}, yhteensä `
      + `${saapuminen.pyyntoja}) — raja: ≤ ${RAJAT.pyyntoja}`);
    arvio(tavua <= RAJAT.tavua, 'tavut kerroksesta',
      `${Math.round(tavua / 1024)} kt saapumiseen (yhteensä ${Math.round(saapuminen.tavua / 1024)} kt) `
      + `— raja: ≤ ${Math.round(RAJAT.tavua / 1024)} kt`);
  }

  /* 10. Zoomin tasonvalinta monotonisesti karkeasta hienoon (luku 5). */
  const lodit = (t.zoom?.vaihdot ?? []).map((v) => v.lod).filter((v) => typeof v === 'number');
  if (!zoomAjettu) lisaa('OHI', 'zoomin tason vaihdot', `--vaihe=${VAIHE}: zoomvaihetta ei ajettu`);
  else if (!lodit.length) lisaa('FAIL', 'zoomin tason vaihdot', 'tasonvalintaa ei saatu');
  else {
    const taakse = lodit.filter((v, i) => i > 0 && v < lodit[i - 1]).length;
    arvio(taakse === 0, 'zoomin tason vaihdot',
      `${lodit.join(' → ')}, joista ${taakse} taaksepäin — raja: monotoninen, ei edestakaisin`);
  }
  return rivit;
}

const vertailu = VERTAILU && existsSync(VERTAILU) ? JSON.parse(readFileSync(VERTAILU, 'utf8')) : null;
if (VERTAILU && !vertailu) console.error(`vertailuraporttia ${VERTAILU} ei löydy — pano p50 jää arvioimatta`);

tulos.vektorit = await sivu.evaluate(() => window.koe.vektorit?.mittarit() ?? null);
tulos.laattakerros = await laattakerros();
tulos.virheet = virheet.slice(0, 8);
tulos.kuvat = kuvat;
if (VARTIO) tulos.vartio = vartioRivit(tulos);
const raportti = join(ULOS, `${NAKYMA}-${TUNNISTE}${VAIHE === 'kaikki' ? '' : `-${VAIHE}`}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 1));
if (VARTIO) {
  console.log('VARTIO — docs/moduulit/pallon-vektoriviivat.md luku 5 '
    + `(${NAKYMA}, dpr ${dpr}, throttle ${THROTTLE}×, tapa ${TAPA}, vari ${VARI})`);
  const levein = Math.max(...tulos.vartio.map((r) => r.nimi.length));
  for (const r of tulos.vartio) console.log(`${r.tila.padEnd(4)} ${r.nimi.padEnd(levein)}  ${r.teksti}`);
  const laske = (t) => tulos.vartio.filter((r) => r.tila === t).length;
  console.log(`VARTIO: ${laske('OK')} OK, ${laske('FAIL')} FAIL, ${laske('OHI')} OHI`);
  if (laske('FAIL')) process.exitCode = 1;
} else {
  console.log(JSON.stringify(tulos, null, 1));
}
console.log('RAPORTTI', raportti);
await selain.close();
palvelin.close();
