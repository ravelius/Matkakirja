/*
 * ETUSIVUN PALLO — esirenderöity, sumennettu kuvasarja videoksi.
 *
 *   node tools/tee-etusivupallo.mjs [--kuiva] [--fps 15] [--lava 900]
 *        [--kuva 800] [--sumennus 6] [--taso 5] [--kehykset N]
 *        [--ulos kansio] [--ffmpeg polku] [--ei-videota]
 *
 * OMISTAJAN TILAUS 5.9.2026, sanatarkasti: *"etusivun kartan voi pitää
 * aluksi vielä vanhassa mutta sitten kun ehditään tehdä uusi, niin
 * siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa, mutta on jo renderöity
 * blurrattuna, jotta efekti ei vie etusivulla tehoja."*
 *
 * ── MIKSI VIDEO EIKÄ KUVASARJA TAI PANORAAMA ───────────────────────
 *
 * Kolme vaihtoehtoa punnittiin (perustelu raportissa ja
 * docs/moduulit/karttapallo.md luku 7, vaihe 5):
 *   1. WebP-kuvasarja: 600 kehystä × ~25 kt = 15 Mt, ja selain joutuu
 *      vaihtamaan <img>-lähdettä 15 kertaa sekunnissa — kallista.
 *   2. Yksi iso sumennettu panoraama + CSS-animaatio: kevyin ladata,
 *      mutta ortografista palloa EI voi kiertää CSS:llä ilman että
 *      projektio vääristyy — ja silloin koneen ruutupiste ei enää
 *      osuisi pallon pintaan. Hylätty juuri siksi: kone ja viiva ovat
 *      tilauksen ydin.
 *   3. VIDEO (tämä): sumennettu sisältö pakkautuu murto-osaan, purku
 *      on raudalla, ja aika ↔ kameran pituusaste on tarkka. Kaksi
 *      muotoa (VP9/WebM ja H.264/MP4) kattaa kaikki selaimet, ja yksi
 *      pysäytyskuva (juliste) palvelee reduced motionia.
 *
 * ── MITEN ──────────────────────────────────────────────────────────
 *
 * Playwright ajaa headless-Chromiumin, joka lataa Globe.gl:n ja pelin
 * omat pallolaatat ämpäristä (samat kuin pelissä). Kamera asetetaan
 * joka kehykselle js/etusivupallo.js:n kameranNakyma-funktiolla —
 * SAMALLA funktiolla, jota etusivu käyttää — joten kehysnumero ja
 * kameran pituusaste vastaavat toisiaan pelissä ilman erillistä
 * taulukkoa. Sumennus tehdään SELAIMESSA (CSS filter: blur lavan
 * paperitaustan päällä), joten työkalu ei tarvitse sharpia; kuva
 * rajataan lavan keskeltä, jottei sumennus vuoda reunoilta.
 *
 * Kehykset menevät ffmpegille (ubuntu-latest: libvpx-vp9 + libx264).
 * Repoon ei viedä kuvia eikä videoita — tulos menee ämpäriin polkuun
 * julisteet/etusivu/<versio>/ (workflow tee-etusivupallo).
 *
 * KONTISSA: Chromium on /opt/pw-browsers/chromium ja ämpäri kulkee
 * Noden fetchin kautta (NODE_USE_ENV_PROXY=1) — selain ei osaa
 * välityspalvelinta, joten r2.dev-pyynnöt reititetään page.routella
 * kuten tools/savukkeet/savuke-pallolauta.mjs:ssä.
 */

import { spawnSync } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = fileURLToPath(import.meta.url);
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const {
  ETUSIVUPALLO_VERSIO, ETUSIVUN_KAMERA, ETUSIVUPALLO_TIEDOSTOT, HAIVYTYS_S,
  kameranNakyma, koneenTila, pallonPiste, reitinPisteet, teeReitti,
} = await import('../js/etusivupallo.js');
const { PALLO_LAATAT, PALLO_KIRJASTO, laattakynnykset } = await import('../js/pallo.js');
const { packById } = await import('../js/pack.js');

const argv = process.argv.slice(2);
const lippu = (nimi) => argv.includes(`--${nimi}`);
const arvo = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};

const KUIVA = lippu('kuiva');
const EI_VIDEOTA = lippu('ei-videota');
const FPS = Number(arvo('fps', '15'));
/** Lava = renderöity kangas; kuva rajataan sen keskeltä sumennuksen takia. */
const LAVA = Number(arvo('lava', '900'));
const KUVA = Number(arvo('kuva', '800'));
const SUMENNUS = Number(arvo('sumennus', '6'));
const TASO = Number(arvo('taso', '5'));
const ULOS = arvo('ulos', join(process.cwd(), 'etusivupallo-ulos'));
const FFMPEG = arvo('ffmpeg', process.env.FFMPEG ?? 'ffmpeg');
/** Pelin paperinsävy: lava on samaa paperia kuin etusivu, joten sumennus ei jätä reunaa. */
const PAPERI = arvo('tausta', '#efdcb4');

const pack = packById('maailmankartta');
const reitti = teeReitti(reitinPisteet(pack));
if (reitti.jaksot.length < 4) throw new Error('reitin kaupunkeja ei löytynyt paketista');
const KEHYKSIA = Number(arvo('kehykset', String(Math.ceil(reitti.kesto * FPS))));
const KESTO = KEHYKSIA / FPS;
/** Julisteen (pysäytyskuvan) hetki: puolimatkassa, jolloin viivaa on jo kertynyt. */
const JULISTE_AIKA = Math.min(reitti.kesto, reitti.jaksot[4]?.alku ?? reitti.kesto / 2);

const AVAIN = `julisteet/etusivu/${ETUSIVUPALLO_VERSIO}/`;

/** Häivytys kierroksen saumassa — sama käyrä kuin js/etusivupallo.js:ssä. */
const haivytys = (t) => Math.max(0, Math.min(1, t / HAIVYTYS_S, (KESTO - t) / HAIVYTYS_S));

const luettelo = {
  versio: ETUSIVUPALLO_VERSIO,
  tehty: new Date().toISOString(),
  kesto: Number(KESTO.toFixed(4)),
  fps: FPS,
  kehyksia: KEHYKSIA,
  julisteAika: Number(JULISTE_AIKA.toFixed(3)),
  sumennus: SUMENNUS,
  laatat: PALLO_LAATAT,
  laattataso: TASO,
  mitat: {
    leveys: KUVA, korkeus: KUVA, lava: LAVA, fov: ETUSIVUN_KAMERA.fov,
  },
  kamera: {
    korkeus: ETUSIVUN_KAMERA.korkeus,
    latKerroin: ETUSIVUN_KAMERA.latKerroin,
    latMin: ETUSIVUN_KAMERA.latMin,
    latMax: ETUSIVUN_KAMERA.latMax,
    silotusS: ETUSIVUN_KAMERA.silotusS,
  },
  // Reitti asteina: video on poltettu NÄILLÄ koordinaateilla, joten
  // etusivu laskee koneen paikan tästä eikä paketista (js/etusivupallo.js).
  reitti: reitti.pisteet.map((p) => ({
    id: p.id, nimi: p.nimi, lat: Number(p.lat.toFixed(5)), lon: Number(p.lon.toFixed(5)),
  })),
  tiedostot: ETUSIVUPALLO_TIEDOSTOT,
};

console.log(`Etusivun pallo ${ETUSIVUPALLO_VERSIO}: ${KEHYKSIA} kehystä @ ${FPS} fps = `
  + `${KESTO.toFixed(1)} s, lava ${LAVA}px → kuva ${KUVA}px, sumennus ${SUMENNUS}px, laattataso ${TASO}`);
console.log(`Reitti: ${reitti.pisteet.map((p) => p.nimi).join(' → ')}`);
console.log(`Ämpärin polku: ${AVAIN}`);

if (KUIVA) {
  console.log(JSON.stringify(luettelo, null, 1));
  process.exit(0);
}

/* ffmpeg tarkistetaan ENNEN kuin poltetaan satoja kehyksiä. */
if (!EI_VIDEOTA) {
  const koe = spawnSync(FFMPEG, ['-version'], { stdio: 'ignore' });
  if (koe.status !== 0) {
    throw new Error(`ffmpeg ei löydy polusta "${FFMPEG}" — anna --ffmpeg <polku> `
      + 'tai aja --ei-videota (pelkät kehykset)');
  }
}

mkdirSync(ULOS, { recursive: true });
const KEHYSKANSIO = join(ULOS, 'kehykset');
rmSync(KEHYSKANSIO, { recursive: true, force: true });
mkdirSync(KEHYSKANSIO, { recursive: true });

/* ---------- ämpäri Noden fetchin kautta (kontti) ---------- */

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

/* ---------- pieni palvelin: yksi sivu ---------- */

const SIVU = `<!doctype html><meta charset="utf-8">
<style>
  html, body { margin: 0; background: ${PAPERI}; }
  #lava {
    width: ${LAVA}px; height: ${LAVA}px; background: ${PAPERI};
    filter: blur(${SUMENNUS}px); overflow: hidden;
  }
  #pallo { width: ${LAVA}px; height: ${LAVA}px; }
</style>
<div id="lava"><div id="pallo"></div></div>
<script src="${PALLO_KIRJASTO}"></script>
<script>
  const LAATAT = ${JSON.stringify(PALLO_LAATAT)};
  window.pallo = Globe()(document.getElementById('pallo'))
    .width(${LAVA}).height(${LAVA})
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18);
  window.pallo.globeTileEngineUrl((x, y, l) => LAATAT + l + '/' + x + '/' + y + '.jpg')
    .globeTileEngineMaxLevel(${TASO});
  window.pallo.controls().enabled = false;
  window.pallo.renderer().setPixelRatio(1);
  // Laattamoottorin kynnykset: taso valitaan korkeudesta, joten kerroin
  // pakottaa halutun tason (sama kaava kuin js/pallo.js lepokerroin).
  window.asetaKynnykset = (kynnykset) => {
    let moottori = null;
    window.pallo.scene().traverse((o) => {
      if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o;
    });
    if (!moottori) return false;
    moottori.thresholds = kynnykset;
    return true;
  };
  window.haivyta = (arvo) => { document.getElementById('pallo').style.opacity = String(arvo); };
</script>`;

const palvelin = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(SIVU);
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

/* ---------- selain ---------- */

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const KROMI = process.env.PW_CHROMIUM
  ?? (process.env.GITHUB_ACTIONS ? undefined : '/opt/pw-browsers/chromium');

const selain = await chromium.launch({
  ...(KROMI ? { executablePath: KROMI } : {}),
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const ctx = await selain.newContext({
  viewport: { width: LAVA, height: LAVA }, deviceScaleFactor: 1,
});
const sivu = await ctx.newPage();

let lennossa = 0;
let viimeisin = Date.now();
const laatta = (url) => url.includes('julisteet/pallo/laatat');
sivu.on('request', (r) => { if (laatta(r.url())) { lennossa += 1; viimeisin = Date.now(); } });
const valmis = (r) => { if (laatta(r.url())) { lennossa -= 1; viimeisin = Date.now(); } };
sivu.on('requestfinished', valmis);
sivu.on('requestfailed', valmis);
sivu.on('pageerror', (e) => console.log(`HUOM sivun virhe: ${e.message ?? e}`));

await sivu.route(/r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    headers: { 'access-control-allow-origin': '*' },
    body: vastaus.body,
  });
});

await sivu.goto(osoite, { waitUntil: 'load', timeout: 120000 });
await sivu.waitForFunction(() => Boolean(window.pallo), null, { timeout: 60000 });

// Laattataso pakotetaan: kerroin, jolla 8k/2^taso ≤ korkeus mutta
// 8k/2^(taso−1) > korkeus (js/pallo.js laattakynnykset).
const kerroin = (0.8 * ETUSIVUN_KAMERA.korkeus * 2 ** TASO) / 8;
const kynnykset = laattakynnykset(kerroin);
for (let y = 0; y < 40; y++) {
  // Moottori syntyy vasta ensimmäisillä kehyksillä.
  const ok = await sivu.evaluate((k) => window.asetaKynnykset(k), kynnykset);
  if (ok) break;
  await sivu.waitForTimeout(150);
}

/** Odottaa, että laattapyynnöt ovat maalissa ja kuva on piirretty. */
async function odotaLaatat(enintaanMs = 6000) {
  const alku = Date.now();
  for (;;) {
    if (lennossa <= 0 && Date.now() - viimeisin > 140) break;
    if (Date.now() - alku > enintaanMs) break;
    await sivu.waitForTimeout(60);
  }
  await sivu.evaluate(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))));
}

/** Kamera hetkelle t + häivytys. */
async function asetaKehys(t) {
  const nakyma = kameranNakyma(reitti, t);
  await sivu.evaluate(([n, h]) => {
    window.pallo.pointOfView({ lat: n.lat, lng: n.lon, altitude: n.korkeus }, 0);
    window.haivyta(h);
  }, [nakyma, haivytys(t)]);
}

/*
 * VARTIJA: kirjaston oma ruutupiste. Luetaan VASTA kun kamera on
 * asettunut — pointOfView(…, 0) siirtää kameran vasta seuraavalla
 * kehyksellä, joten samassa evaluatessa luettu piste olisi edellisen
 * kehyksen kamerasta (mitattu 5.9.2026: virhe 1 209 px).
 */
const kirjastonRuutupiste = (piste) => sivu.evaluate(
  (k) => window.pallo.getScreenCoords?.(k.lat, k.lon, 0) ?? null, piste,
);

const rajaus = {
  x: Math.round((LAVA - KUVA) / 2), y: Math.round((LAVA - KUVA) / 2), width: KUVA, height: KUVA,
};
/*
 * Kaappaus on SIVUN kaappaus rajauksella eikä elementin kaappaus:
 * Playwrightin locator.screenshot EI tue clip-valintaa (mitattu
 * 5.9.2026 — kehykset tulivat lavan kokoisina, jolloin sumennuksen
 * reuna olisi jäänyt videoon). Näkymä on lavan kokoinen ja #lava on
 * sen vasemmassa ylänurkassa, joten rajaus osuu suoraan.
 */
const kaappaa = (polku) => sivu.screenshot({ path: polku, clip: rajaus });

/* Esilämmitys: sama kierros kerran harvakseltaan, jotta laatat ovat
 * selaimen välimuistissa eikä ensimmäinen kierros ehdi sumeaksi. */
for (let i = 0; i < 12; i++) {
  await asetaKehys((i / 12) * KESTO);
  await odotaLaatat(8000);
}

const numero = (i) => String(i).padStart(5, '0');
let projektiovirhe = 0;
const kehysajat = [];
for (let i = 0; i < KEHYKSIA; i++) {
  const t = i / FPS;
  const alku = Date.now();
  await asetaKehys(t);
  await odotaLaatat();
  // Oma projektio vs. kirjaston getScreenCoords: jos nämä eroavat,
  // kone lentäisi etusivulla väärässä paikassa.
  const ruutu = await kirjastonRuutupiste(koneenTila(reitti, t));
  if (ruutu && Number.isFinite(ruutu.x)) {
    const oma = pallonPiste(koneenTila(reitti, t), kameranNakyma(reitti, t),
      { leveys: LAVA, korkeus: LAVA, lava: LAVA, fov: ETUSIVUN_KAMERA.fov });
    projektiovirhe = Math.max(projektiovirhe, Math.hypot(oma.x - ruutu.x, oma.y - ruutu.y));
  }
  await kaappaa(join(KEHYSKANSIO, `kehys-${numero(i)}.png`));
  kehysajat.push(Date.now() - alku);
  if (i % 25 === 0 || i === KEHYKSIA - 1) {
    console.log(`  kehys ${i + 1}/${KEHYKSIA} (t=${t.toFixed(1)} s, ${Date.now() - alku} ms)`);
  }
}

/* Juliste (pysäytyskuva) omalla hetkellään, ilman häivytystä. */
await asetaKehys(JULISTE_AIKA);
await odotaLaatat(8000);
await kaappaa(join(ULOS, 'juliste.png'));

await ctx.close();
await selain.close();
palvelin.close();

console.log(`Kehykset valmiit: ${KEHYKSIA} kpl, keskimäärin `
  + `${Math.round(kehysajat.reduce((a, b) => a + b, 0) / kehysajat.length)} ms/kehys`);
if (projektiovirhe > KUVA * 0.01) {
  throw new Error(`projektio eroaa kirjaston omasta ${projektiovirhe.toFixed(1)} px — `
    + 'kone lentäisi etusivulla väärässä paikassa (js/etusivupallo.js pallonPiste)');
}
console.log(`Projektiovartija: suurin ero kirjaston getScreenCoordsiin ${projektiovirhe.toFixed(2)} px`);

/* ---------- videot ---------- */

const aja = (args) => {
  const ajo = spawnSync(FFMPEG, args, { stdio: 'inherit' });
  if (ajo.status !== 0) throw new Error(`${FFMPEG} ${args[0]}… epäonnistui (${ajo.status})`);
};
const koko = (p) => {
  try { return statSync(p).size; } catch { return 0; }
};
const kilot = (n) => `${(n / 1024).toFixed(0)} kt`;

if (!EI_VIDEOTA) {
  const syote = ['-y', '-framerate', String(FPS), '-i', join(KEHYSKANSIO, 'kehys-%05d.png')];
  aja([...syote, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1',
    '-pix_fmt', 'yuv420p', '-an', join(ULOS, ETUSIVUPALLO_TIEDOSTOT.webm)]);
  aja([...syote, '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'main',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(ULOS, ETUSIVUPALLO_TIEDOSTOT.mp4)]);
  aja(['-y', '-i', join(ULOS, 'juliste.png'), '-q:v', '4',
    join(ULOS, ETUSIVUPALLO_TIEDOSTOT.juliste)]);
}

luettelo.koot = Object.fromEntries(Object.values(ETUSIVUPALLO_TIEDOSTOT)
  .map((t) => [t, koko(join(ULOS, t))]));
writeFileSync(join(ULOS, 'etusivu.json'), `${JSON.stringify(luettelo, null, 1)}\n`);
writeFileSync(join(ULOS, 'avain.txt'), AVAIN);

for (const [nimi, n] of Object.entries(luettelo.koot)) console.log(`  ${nimi}: ${kilot(n)}`);
/* Puhelin lataa VAIN toisen videon (source-valinta) ja julisteen. */
const puhelin = Math.max(luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.webm] ?? 0,
  luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.mp4] ?? 0) + (luettelo.koot[ETUSIVUPALLO_TIEDOSTOT.juliste] ?? 0);
console.log(`Puhelimen lataus (yksi video + juliste): noin ${kilot(puhelin)}`);
if (!EI_VIDEOTA && puhelin > 3 * 1024 * 1024) {
  console.log('::warning::yli 3 Mt puhelimelle — nosta --crf-arvoja tai pudota --fps/--kuva');
}
console.log(`Kehyskansio ${KEHYSKANSIO} (${readdirSync(KEHYSKANSIO).length} kuvaa) — ei viedä ämpäriin.`);
console.log(`Valmis: ${ULOS} → s3://…/${AVAIN}`);
