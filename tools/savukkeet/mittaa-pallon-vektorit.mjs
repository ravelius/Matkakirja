/*
 * MITTARI: rantaviivat ja rajat vektoreina pallolla (Fablemax 6.9.2026,
 * Raamattu "VEKTORIT SAMALLA"; suunnitelma docs/moduulit/pallon-vektoriviivat.md).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-vektorit.mjs
 *       --aineisto=<tee-aineisto.mjs:n kansio> [--tapa=line2|nauha|polut|svg|ei]
 *       [--nakyma=puhelin|tyopoyta] [--throttle=4] [--leveys=1.5] [--vari=debug|oikea]
 *       [--haku=rajat=0&lod=2] [--vaihe=lepo|liike|zoom|kaikki] [--ulos=<kansio>]
 *       [--tunniste=<nimi>] [--dpr=1]
 *
 * Ajaa tools/kokeilut/pallon-vektorit/pallo.html:n (pelin oma pallo +
 * vektorikerros kytkimen takana) samoissa oloissa kuin
 * mittaa-pallon-liike.mjs: puhelin 390 × 844 dpr 3, CPU-throttle 4×
 * mittausjaksoilla, ämpäri Noden fetchillä. Aineistokansio tarjoillaan
 * polusta /_aineisto/.
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
 *      lepokerroksen (polygonOffset −8) päällä magentan määrä ennen ja
 *      jälkeen kerroksen (z-taistelu näkyisi katona).
 *   4. PANOROINNIN HINTA: kehysajat (vain suhteet, ohjelmistorasteroija),
 *      piirtokutsut, kolmiot, kerroksen oma JS (paivitaMs, svgMs),
 *      pyynnöt ja tavut, JS-keko.
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
mkdirSync(ULOS, { recursive: true });
if (!AINEISTO || !existsSync(join(AINEISTO, 'luettelo.json'))) {
  console.error('anna --aineisto=<kansio>, jossa on tee-aineisto.mjs:n luettelo.json');
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

/* ================= 1: LEPO KOLMESSA NÄKYMÄSSÄ ================= */
if (VAIHE === 'kaikki' || VAIHE === 'lepo') {
  tulos.lepo = {};
  for (const [nimi, korkeus] of [['ateena', 0.35], ['lahi', 0.08], ['maailma', 2.5]]) {
    await aseta(korkeus);
    await odotaLepo();
    const t = await tila();
    const kuva = await kaappaa(`1-lepo-${nimi}`);
    const rivi = { tila: t, muste: pinta(kuva, keski), vari: musteenVari(kuva, keski) };
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
        await sivu.evaluate(() => { const { pallo } = window.koe; pallo.scene().traverse((o) => { if (o.userData?.lepokerros) o.visible = false; }); });
        await sivu.waitForTimeout(300);
        const kuva2 = await kaappaa(`1-lepo-${nimi}-ilman-lepokerrosta`);
        rivi.ilmanLepokerrosta = { vektori: magentanPaksuus(kuva2, keski), muste: pinta(kuva2, keski) };
        rivi.zTaistelu = { magentaaKerroksella: ennen, magentaaIlman: rivi.ilmanLepokerrosta.vektori.pikseleita, suhde: +(ennen / Math.max(1, rivi.ilmanLepokerrosta.vektori.pikseleita)).toFixed(3) };
        await sivu.evaluate(() => { const { pallo } = window.koe; pallo.scene().traverse((o) => { if (o.userData?.lepokerros) o.visible = true; }); });
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

tulos.vektorit = await sivu.evaluate(() => window.koe.vektorit?.mittarit() ?? null);
tulos.virheet = virheet.slice(0, 8);
tulos.kuvat = kuvat;
const raportti = join(ULOS, `${NAKYMA}-${TUNNISTE}${VAIHE === 'kaikki' ? '' : `-${VAIHE}`}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 1));
console.log(JSON.stringify(tulos, null, 1));
console.log('RAPORTTI', raportti);
await selain.close();
palvelin.close();
