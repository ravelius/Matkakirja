/*
 * Savuke: PALLON RANTAVIIVAT VANHAN KARTAN TYYLIIN (omistaja 7.9.2026,
 * työpöytä, sanatarkasti: *"Miksi muuten kartan rajat ovat noin mustia
 * ja röpelöisiä? Ovatko nuo nyt sitä uutta vektorilla piirrettyä? Sitä
 * saisi vähän pehmentää paremmin vanhan kartan tyyliin istuvaksi."*).
 *
 * Vertailutyyli on tasokartan rantaviiva: OHUT, RUSKEA, PEHMEÄREUNAINEN
 * — ei musta nauha. Savuke mittaa juuri sen kolmella suureella, ja
 * mittaus tehdään EROTUSKUVASTA: sama kamera kahdesti, kerran
 * vektorikerros näkyvissä ja kerran piilotettuna. Erotus kertoo tasan
 * ne pikselit, jotka viiva on maalannut, eikä laattojen poltettu
 * rantaviiva pääse sotkemaan mittaa.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *  1. EI MUSTA. Viivan tummin prosentti on erotuskuvan mukaan
 *     LUMINANSSILTAAN yli MUSTUUS_RAJA:n (pohja on pergamentti, joten
 *     alle sen viiva luetaan tussiksi). Ennen korjausta yleiskuvan
 *     viiva saturoitui täysin mustaksi, koska LineSegments2:n
 *     päätypyörylät kasasivat läpinäkyvää mustetta päällekkäin
 *     (yleiskuvassa jana on 0,19 px ja pyörylä 0,75 px säteinen).
 *  2. KESKIMÄÄRÄINEN PEITTO on välillä PEITTO_RAJAT: viiva erottuu
 *     pohjasta mutta ei peitä sitä. Peitto = 1 − (viivan luminanssi /
 *     saman pikselin pohjan luminanssi).
 *  3. RUSKEA, EI HARMAA: viivan keskimääräinen R on selvästi B:tä
 *     suurempi (SAVY_RAJA), eli muste on lämmin kuten vanhassa
 *     kartassa.
 *  4. PEHMEÄ REUNA JA KEVYT MUSTE: huippupeitto (viivan tummin kohta
 *     suhteessa pohjaan) alle HUIPPU_RAJA:n, ja osittaisia
 *     reunapikseleitä vähintään PEHMEA_SUHDE kertaa ydinpikseleiden
 *     määrä. Kalibrointi vanhoilla vakioilla 7.9.2026 antoi huipuksi
 *     0,82 / 0,80 ja reunasuhteeksi 1,1 / 1,7; uusi viiva 0,68 / 0,60
 *     ja 19 / 35.
 *  5. VÄHEMMÄN PISTEITÄ KAUKAA: yleiskuvan janoja NÄKYVÄÄ SOLUA kohti
 *     on pienempi kuin lähikuvan, ja yleiskuvan harvennusporras on
 *     karkeampi (kerroksen oma Douglas–Peucker, js/pallovektorit.js
 *     harvennusPorras). Lähikuvassa porras on 0 = täysi yksityiskohta.
 *  6. KUVA RAUHOITTUU: kaksi peräkkäistä kaappausta samalla kameralla
 *     eroavat lopulta alle VALKE_RAJA:n verran. Erotus otetaan vasta
 *     tämän jälkeen, jotta laattojen sisäänhäivytys ei sotke mittaa;
 *     z-taistelu (polygonOffset väärin) ei rauhoittuisi koskaan.
 *
 * Kirjoittaa kuvat ja JSON-raportin --ulos-kansioon (yleiskuva ja
 * lähikuva, kummastakin myös kerros piilossa ja erotus).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallo-rantaviivat.mjs [--ulos=<kansio>]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pallo-rantaviivat');
mkdirSync(ULOS, { recursive: true });

/* ── rajat (perustelut yllä) ──────────────────────────────────────── */
/**
 * Viivan tummuus luetaan 1 %:n PERSENTIILINÄ eikä ehdottomana
 * minimiluminanssina: yksittäinen laatan sisäänhäivytyksen jäljiltä
 * jäänyt pikseli ei saa ratkaista mittaa.
 */
const MUSTUUS_RAJA = 60;
/** Keskimääräinen peitto pohjaan nähden. */
const PEITTO_RAJAT = [0.05, 0.42];
/** Ruskea, ei harmaa: R − B keskimäärin vähintään tämä. */
const SAVY_RAJA = 10;
/**
 * Huippupeitto: viivan tummin kohta suhteessa pohjaan. Kalibrointiajo
 * vanhoilla vakioilla 7.9.2026 mittasi 0,82 / 0,80; uusi 0,68 / 0,60.
 */
const HUIPPU_RAJA = 0.75;
/**
 * PEHMEÄ REUNA: osittaisia pikseleitä (peitto 20…70 % huipusta)
 * ydinpikseliä (yli 85 % huipusta) kohti. Kova reuna saa vain MSAA:n
 * portaat — kalibroinnissa 1,1 ja 1,7 — kun taas häivytetty reuna tuo
 * kokonaisen vyön kummallekin puolelle: 19 ja 35. Kymmenkertainen ero,
 * joten raja on turvallista pitää tässä välissä.
 */
const PEHMEA_SUHDE = 4;
/** Kahden peräkkäisen saman kaappauksen sallittu ero (osuus pikseleistä). */
const VALKE_RAJA = 0.002;
/** Pikselin luminanssiero, jota pienempi on kohinaa eikä mustetta. */
const MUSTERAJA = 12;

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.bin': 'application/octet-stream',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('HUOM  ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata');
  palvelin.close();
  process.exit(1);
}

/* Tallenne: Fogg Ateenassa, aarre löydetty (sama kuin savuke-pallolaudassa). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

/*
 * Kaappauksia otetaan toistakymmentä peräkkäin ohjelmistorasteroijalla;
 * ilman /dev/shm:n ohitusta kontin selain kaatuu kesken sarjan.
 */
const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1100 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
/* Pallo piirtää jatkuvasti ja kuva on 834 × 1100 dpr 2 — kaappaus vie aikaa. */
sivu.setDefaultTimeout(120000);
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  // Ilman palloa ei ole mitattavaa; sanotaan se ääneen eikä kaaduta pinoon.
  console.log(`\n${lapi}/${kaikki} vartiota läpi — pallo ei avautunut`);
  await ctx.close();
  await selain.close();
  palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(2500);

/** Kerroksen oliot näkyviin tai piiloon (erotuskuvaa varten). */
const naytaVektorit = (nayta) => sivu.evaluate((n) => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  let muutettu = 0;
  pallo.scene().traverse((o) => {
    if (!o.userData?.pallovektorit) return;
    if (n) {
      if (o.userData.savukePiilotettu) { o.visible = true; o.userData.savukePiilotettu = false; }
    } else if (o.visible) { o.visible = false; o.userData.savukePiilotettu = true; muutettu += 1; }
  });
  return muutettu;
}, nayta);

/**
 * Yhden rajauksen mittaus: kamera paikalleen, kaksi kaappausta
 * (kerros näkyvissä, kerros piilossa) ja niiden erotus.
 */
async function mittaa(nimi, pov) {
  await sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.pallo.pointOfView(p, 0); }, pov);
  await sivu.waitForTimeout(9000);
  /*
   * KUVA ENSIN VAKAAKSI. Laatat häipyvät sisään omalla tahdillaan, ja
   * jos erotus otetaan kesken häivytyksen, mittaan tulee mukaan
   * pikseleitä, joita vektoriviiva ei ole koskaan koskenut. Otetaan
   * kaappauksia, kunnes kaksi peräkkäistä eroaa alle VALKE_RAJA:n —
   * ja sama luku on samalla välkyntämitta (z-taistelu ei rauhoittuisi).
   */
  /*
   * RAJATTU IKKUNA, EI KOKO SIVUA: mittaan riittää pala rantaviivaa, ja
   * koko 834 × 1100 dpr 2 -kaappaus toistettuna kaataa kontin selaimen.
   */
  const rajaus = { clip: { x: 60, y: 220, width: 700, height: 700 }, timeout: 120000 };
  const erota = (x, y) => {
    let n = 0;
    for (let i = 0; i < x.data.length; i += 4) if (Math.abs(x.data[i] - y.data[i]) > 6) n += 1;
    return n / (x.data.length / 4);
  };
  let a = decodePng(await sivu.screenshot(rajaus));
  let valkeOsuus = 1;
  for (let kierros = 0; kierros < 6; kierros += 1) {
    await sivu.waitForTimeout(1200); // eslint-disable-line no-await-in-loop
    const uusi = decodePng(await sivu.screenshot(rajaus)); // eslint-disable-line no-await-in-loop
    valkeOsuus = erota(a, uusi);
    a = uusi;
    if (valkeOsuus <= VALKE_RAJA) break;
  }
  await sivu.screenshot({ ...rajaus, path: join(ULOS, `${nimi}-viiva.png`) });
  /* Mittarit vasta rauhoittuneesta kuvasta: kesken latauksen janoja on 0. */
  const mitat = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.vektorit?.().mittarit?.() ?? null);
  await naytaVektorit(false);
  await sivu.waitForTimeout(700);
  const ilman = await sivu.screenshot({ ...rajaus, path: join(ULOS, `${nimi}-ilman.png`) });
  await naytaVektorit(true);
  await sivu.waitForTimeout(300);

  const b = decodePng(ilman);
  const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  /*
   * Viivan pikselit: erotus pohjaan on selvästi kohinaa suurempi.
   * Kaksi juoksua koko kuvan yli (taulukko olisi miljoona alkiota):
   * ensin summat ja huippu, sitten osittaisten osuus.
   */
  const viivalla = (i) => {
    const lb = lum(b.data, i);
    if (lb <= 8) return -1; // pohja musta (kehyksen tausta)
    const la = lum(a.data, i);
    return lb - la >= MUSTERAJA ? 1 - la / lb : -1;
  };
  let n = 0; let summa = 0; let huippu = 0;
  let rSum = 0; let bSum = 0;
  const histo = new Uint32Array(256);
  for (let i = 0; i < a.data.length; i += 4) {
    const peitto = viivalla(i);
    if (peitto < 0) continue;
    n += 1; summa += peitto;
    if (peitto > huippu) huippu = peitto;
    histo[Math.max(0, Math.min(255, Math.round(lum(a.data, i))))] += 1;
    rSum += a.data[i]; bSum += a.data[i + 2];
  }
  /* Tummuus 1 %:n persentiilinä (yksi karannut pikseli ei ratkaise). */
  let tummin = 0; let kertyma = 0;
  for (let v = 0; v < 256; v += 1) {
    kertyma += histo[v];
    if (kertyma >= n * 0.01) { tummin = v; break; }
  }
  let osittaisia = 0; let ytimia = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    const peitto = viivalla(i);
    if (peitto < 0) continue;
    if (peitto > 0.85 * huippu) ytimia += 1;
    else if (peitto > 0.2 * huippu && peitto < 0.7 * huippu) osittaisia += 1;
  }
  return {
    nimi,
    pov,
    mitat,
    pikseleita: n,
    keskipeitto: n ? +(summa / n).toFixed(3) : 0,
    huippupeitto: +huippu.toFixed(3),
    tummin,
    savyRB: n ? Math.round((rSum - bSum) / n) : 0,
    pehmeaSuhde: ytimia ? +(osittaisia / ytimia).toFixed(2) : 0,
    taytelaisyys: huippu ? +((summa / Math.max(1, n)) / huippu).toFixed(3) : 0,
    valkeOsuus: +valkeOsuus.toFixed(5),
  };
}

const yleis = await mittaa('yleiskuva', { lat: 12, lng: 16, altitude: 1.6 });
const lahi = await mittaa('lahikuva', { lat: 38.2, lng: 24.0, altitude: 0.06 });

for (const m of [yleis, lahi]) {
  tieto(`${m.nimi} viivapikseleitä`, m.pikseleita);
  tieto(`${m.nimi} keskipeitto / huippu`, `${m.keskipeitto} / ${m.huippupeitto}`);
  tieto(`${m.nimi} tummin luminanssi`, m.tummin);
  tieto(`${m.nimi} sävy R−B`, m.savyRB);
  tieto(`${m.nimi} täyteläisyys (keski/huippu)`, m.taytelaisyys);
  tieto(`${m.nimi} osittaisia / ydinpikseleitä`, m.pehmeaSuhde);
  tieto(`${m.nimi} leveys css / harvennus° / janoja per solu`,
    `${m.mitat?.leveysCss} / ${m.mitat?.harvennus} / ${m.mitat?.janojaSolua}`);
  vaadi(`${m.nimi}: viivaa löytyy erotuskuvasta`, m.pikseleita > 500, String(m.pikseleita));
  vaadi(`${m.nimi}: viiva ei ole musta`, m.tummin > MUSTUUS_RAJA, `tummin ${m.tummin} ≤ ${MUSTUUS_RAJA}`);
  vaadi(`${m.nimi}: keskimääräinen peitto ${PEITTO_RAJAT[0]}…${PEITTO_RAJAT[1]}`,
    m.keskipeitto >= PEITTO_RAJAT[0] && m.keskipeitto <= PEITTO_RAJAT[1], String(m.keskipeitto));
  vaadi(`${m.nimi}: muste on ruskea eikä harmaa`, m.savyRB >= SAVY_RAJA, `R−B ${m.savyRB}`);
  vaadi(`${m.nimi}: viiva ei peitä pohjaa (huippupeitto ≤ ${HUIPPU_RAJA})`,
    m.huippupeitto <= HUIPPU_RAJA, String(m.huippupeitto));
  vaadi(`${m.nimi}: reuna on häivytetty, ei kova`,
    m.pehmeaSuhde >= PEHMEA_SUHDE, String(m.pehmeaSuhde));
  vaadi(`${m.nimi}: kuva rauhoittuu (ei välkyntää laattojen päällä)`,
    m.valkeOsuus <= VALKE_RAJA, String(m.valkeOsuus));
  vaadi(`${m.nimi}: varjostimen pehmennys on paikallaan`, m.mitat?.pehmennysPaikka === true);
}

/* Kaukaa vähemmän kärkiä kuin läheltä (kerroksen oma harvennus). */
vaadi('yleiskuvassa vähemmän janoja solua kohti kuin lähikuvassa',
  (yleis.mitat?.janojaSolua ?? 0) < (lahi.mitat?.janojaSolua ?? 0),
  `${yleis.mitat?.janojaSolua} ≥ ${lahi.mitat?.janojaSolua}`);
vaadi('yleiskuvan harvennus on karkeampi kuin lähikuvan',
  (yleis.mitat?.harvennus ?? 0) > (lahi.mitat?.harvennus ?? 0),
  `${yleis.mitat?.harvennus} ≤ ${lahi.mitat?.harvennus}`);
vaadi('yleiskuvan viiva on ohuempi kuin lähikuvan',
  (yleis.mitat?.leveysCss ?? 0) < (lahi.mitat?.leveysCss ?? 0),
  `${yleis.mitat?.leveysCss} ≥ ${lahi.mitat?.leveysCss}`);
vaadi('sivu ei kaadu', virheet.filter((v) => !/ERR_FAILED|ERR_ABORTED/.test(v)).length === 0,
  virheet.slice(0, 3).join(' | '));

writeFileSync(join(ULOS, 'raportti.json'), JSON.stringify({ yleis, lahi, virheet }, null, 2));
console.log(`\n${lapi}/${kaikki} vartiota läpi — kuvat ja raportti: ${ULOS}`);

await ctx.close();
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
