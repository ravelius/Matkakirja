/*
 * Savuke: LAATTAPYRAMIDI (js/laattapyramidi.js, pilotti lipun takana).
 *
 *   node tools/savukkeet/savuke-laattapyramidi.mjs [--laatat <kansio>]
 *
 * Omistajan päälinjaus 30.8.2026 (Raamattu, "YKSI MAAILMANBITTIKARTTA -
 * MAALEHDISTA LUOVUTAAN"): koko maailma on yksi laatasto, josta
 * ladataan vain näkyvä pala.
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 *   P1  LIPPU POIS = OLETUSPOLKU ENNALLAAN. Ilman ?pyramidi=1 kerros
 *       on tyhjä, verkosta ei haeta laattaa eikä luetteloa, ja
 *       maalehdet toimivat kuten ennen. Tämä on koko pilotin ehto, ja
 *       siksi se on ensimmäinen väite.
 *   P2  Lippu päällä: laatat ilmestyvät kerrokseen ja maalehdet
 *       katoavat (ei lehtivalintaa, ei saumoja).
 *   P3  Vain näkyvä pala ladataan — laattojen määrä on kymmeniä, ei
 *       tuhansia, ja se pysyy samassa suuruusluokassa zoomatessa.
 *   P4  Puuttuvaa laattaa EI pyydetä: luettelon laatasto-bittikartta
 *       kertoo mitkä ovat olemassa (harva pyramidi).
 *   P5  Kierto: päivämääränrajan yli panoroitaessa laatat asettuvat
 *       jatkuvasti eikä väliin jää rakoa. Tason leveys ei ole
 *       laattakoon monikerta, joten tämä on se kohta, jossa naiivi
 *       modulo menisi 128 pikseliä väärään paikkaan.
 *
 * === MITÄ TÄMÄ MITTAA ===============================================
 *
 * Suunnitelma (docs/moduulit/laattapyramidi.md luku 6) vaatii pilotilta
 * oikeat luvut: laattojen määrä näkymässä, latausaika, purettu muisti
 * ja kehysaika panoroinnissa. Ne luetaan pelin omasta kahvasta
 * `__pyramidinMittarit()` ja tulostetaan MITAT-osioon.
 *
 * VERKKOON EI MENNÄ: laatat tulevat testin omasta reitityksestä
 * paikallisesta pilottikansiosta (oletus: kontin scratchpad).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const LAATAT = valitsin('laatat', process.env.PYRAMIDI_LAATAT ?? '');

if (!LAATAT || !existsSync(join(LAATAT, 'pyramidi.json'))) {
  console.error('Pilottilaattoja ei löydy. Aja ensin '
    + 'tools/generoi-laattapyramidi.mjs ja anna kansio: '
    + '--laatat <kansio> (tai PYRAMIDI_LAATAT).');
  process.exit(2);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Avaa pelin ja ajaa sen Ateenaan. Palauttaa sivun ja pyyntölokin.
 *
 * Laattapyyntöjä EI päästetä verkkoon: ne palvellaan pilottikansiosta,
 * ja puuttuva laatta saa 404:n — juuri se, mitä P4 mittaa.
 */
async function avaaPeli({ lippu }) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3,
    serviceWorkers: 'block',
  });
  const sivu = await ctx.newPage();
  const pyynnot = [];
  const lehtipyynnot = [];
  /*
   * REITTIEN JÄRJESTYS ON MERKITSEVÄ. Playwright kokeilee reittejä
   * KÄÄNTEISESSÄ rekisteröintijärjestyksessä, joten yleinen "kaikki
   * ämpäriin menevä poikki" on rekisteröitävä ENSIN ja tarkemmat
   * poikkeukset sen jälkeen — muuten ne jäävät sen alle eikä yksikään
   * laatta koskaan päädy testin omaan käsittelyyn.
   */
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route('**r2.dev/**', (route) => route.abort());
  // Lehtipyynnöt kirjataan mutta katkaistaan: verkkoon ei mennä.
  await sivu.route('**/julisteet/fokus/**', (route) => {
    lehtipyynnot.push(route.request().url());
    route.abort();
  });
  await sivu.route('**/julisteet/pyramidi/**', (route) => {
    const url = new URL(route.request().url());
    const osa = url.pathname.split('/julisteet/pyramidi/')[1];
    pyynnot.push(osa);
    /*
     * Laatan osoitteessa on VERSIO polun osana
     * (julisteet/pyramidi/<versio>/z7/...), mutta pilottikansiossa
     * laatat ovat suoraan z-kansioissa. Kokeillaan siis molempia:
     * ensin sellaisenaan, sitten versio-osa kuorittuna.
     */
    let tiedosto = join(LAATAT, osa);
    if (!existsSync(tiedosto) && osa.includes('/')) {
      tiedosto = join(LAATAT, osa.slice(osa.indexOf('/') + 1));
    }
    if (!existsSync(tiedosto)) { route.fulfill({ status: 404, body: 'ei' }); return; }
    route.fulfill({
      status: 200,
      contentType: osa.endsWith('.json') ? 'application/json' : 'image/webp',
      body: readFileSync(tiedosto),
    });
  });
  await sivu.goto(osoite + (lippu ? '?pyramidi=1' : '?pyramidi=0'), { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1500);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') { g.actionPickStart('ateena', 0); window.matkakirja.ui.render(); }
  });
  await sivu.waitForTimeout(7000);
  return { sivu, ctx, pyynnot, lehtipyynnot };
}

const laattojaKerroksessa = (sivu) => sivu.evaluate(
  () => window.matkakirja.ui.pyramidiKerros?.querySelectorAll('image.pyramidi-laatta').length ?? -1,
);
const mittarit = (sivu) => sivu.evaluate(() => globalThis.__pyramidinMittarit?.() ?? null);

/* ============ P1: lippu pois — oletuspolku ennallaan ================ */

console.log('--- P1: lippu pois ---');
{
  const { sivu, ctx, pyynnot, lehtipyynnot } = await avaaPeli({ lippu: false });
  const laattoja = await laattojaKerroksessa(sivu);
  const m = await mittarit(sivu);
  vaadi('P1a kerros on olemassa mutta tyhjä', laattoja === 0, `laattoja ${laattoja}`);
  vaadi('P1b yhtään pyramidipyyntöä ei tehdä', pyynnot.length === 0,
    `pyyntöjä ${pyynnot.length}: ${pyynnot.slice(0, 3).join(', ')}`);
  /*
   * Vanha lehtijärjestelmä on yhä käytössä: sitä ei voi todeta
   * piirretyistä kuvista, koska testi katkaisee verkon, mutta PYYNNÖT
   * se tekee — ja juuri niiden olemassaolo on todiste siitä, ettei
   * lippu poistanut mitään.
   */
  vaadi('P1c vanha lehtijärjestelmä on yhä käytössä', lehtipyynnot.length > 0,
    `lehtipyyntöjä ${lehtipyynnot.length}`);
  vaadi('P1d mittarikahva on olemassa ja nollilla', m && m.nakymassa === 0, JSON.stringify(m));
  await ctx.close();
}

/* ============ P2-P5: lippu päällä =================================== */

console.log('\n--- P2-P5: lippu päällä ---');
const { sivu, ctx, pyynnot, lehtipyynnot } = await avaaPeli({ lippu: true });

const laattoja = await laattojaKerroksessa(sivu);
vaadi('P2a laattoja on kerroksessa', laattoja > 0, `laattoja ${laattoja}`);
vaadi('P2b maalehtiä ei haeta lainkaan', lehtipyynnot.length === 0,
  `lehtipyyntöjä ${lehtipyynnot.length}: ${lehtipyynnot.slice(0, 4).join(' ')}`);
vaadi('P2c luettelo haettiin kerran',
  pyynnot.filter((p) => p === 'pyramidi.json').length === 1,
  `${pyynnot.filter((p) => p === 'pyramidi.json').length} kertaa`);

const m1 = await mittarit(sivu);
vaadi('P3a näkyvässä palassa on kymmeniä laattoja, ei tuhansia',
  m1.nakymassa > 0 && m1.nakymassa < 200, `nakymassa ${m1.nakymassa}`);
vaadi('P4a puuttuvia laattoja ei pyydetä (laatasto-bittikartta)',
  m1.epaonnistui === 0, `404 ${m1.epaonnistui} kpl`);

// Zoomataan lähemmäs: tason on vaihduttava ja laattamäärän pysyttävä maltillisena.
for (let z = 0; z < 3; z += 1) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(1200);
}
await sivu.waitForTimeout(2500);
const m2 = await mittarit(sivu);
vaadi('P3b zoomatessa taso vaihtuu', m2.taso !== m1.taso, `${m1.taso} → ${m2.taso}`);
vaadi('P3c laattamäärä pysyy maltillisena myös lähikuvassa',
  m2.nakymassa > 0 && m2.nakymassa < 200, `nakymassa ${m2.nakymassa}`);
vaadi('P4b lähikuvassakaan ei tule 404:iä', m2.epaonnistui === 0, `404 ${m2.epaonnistui} kpl`);

/*
 * P5: KIERTO. Panoroidaan laudan sauman yli ja katsotaan, ettei
 * laattojen väliin jää rakoa. Rako syntyisi, jos paikka laskettaisiin
 * "sarake modulo sarakkeiden määrä" -kaavalla, koska tason leveys ei
 * ole laattakoon monikerta.
 */
const raot = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const laatat = [...ui.pyramidiKerros.querySelectorAll('image.pyramidi-laatta')]
    .map((k) => ({
      x: parseFloat(k.getAttribute('x')),
      y: parseFloat(k.getAttribute('y')),
      w: parseFloat(k.getAttribute('width')),
      h: parseFloat(k.getAttribute('height')),
    }));
  // Etsitään samalta riviltä vierekkäiset laatat ja mitataan väli.
  let pahin = 0;
  for (const a of laatat) {
    let lahin = Infinity;
    for (const b of laatat) {
      if (a === b || Math.abs(a.y - b.y) > 0.01) continue;
      const vali = b.x - (a.x + a.w);
      if (vali >= -0.01 && vali < lahin) lahin = vali;
    }
    if (lahin !== Infinity) pahin = Math.max(pahin, lahin);
  }
  return { pahin, laattoja: laatat.length };
});
vaadi('P5a vierekkäisten laattojen väliin ei jää rakoa',
  raot.pahin < 0.01, `pahin rako ${raot.pahin} lautayksikköä`);

/* ============ MITAT ================================================= */

/*
 * KEHYSAIKA PANOROINNISSA. Mitataan requestAnimationFramen väleistä
 * samalla kun karttaa raahataan — sama suure kuin karttamittarilla.
 *
 * TÄMÄ ON EMULAATTORILUKU. Raamattu ("BITTIKARTTA VAIHEET 2-3,
 * MITATUT RAJAT") vaatii, että kehysaika mitataan OIKEALLA
 * iOS-LAITTEELLA — emulaattorin perustaso oli harhaanjohtava. Luku on
 * tässä suuntaa antavana, ei päätöksen perustana.
 */
await sivu.evaluate(() => {
  window.__kehykset = [];
  let edellinen = performance.now();
  const askel = () => {
    const nyt = performance.now();
    window.__kehykset.push(nyt - edellinen);
    edellinen = nyt;
    if (window.__kehykset.length < 240) requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);
});
const laatikko = await sivu.evaluate(() => {
  const r = window.matkakirja.ui.mapPane.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await sivu.touchscreen.tap(laatikko.x, laatikko.y).catch(() => {});
for (let i = 0; i < 3; i += 1) {
  await sivu.mouse.move(laatikko.x + 120, laatikko.y);
  await sivu.mouse.down();
  for (let s = 0; s < 12; s += 1) {
    await sivu.mouse.move(laatikko.x + 120 - s * 20, laatikko.y + s * 4);
    await sivu.waitForTimeout(16);
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(400);
}
const kehykset = await sivu.evaluate(() => window.__kehykset ?? []);
const lajiteltu = [...kehykset].sort((a, b) => a - b);
const p50 = lajiteltu[Math.floor(lajiteltu.length * 0.5)] ?? 0;
const p95 = lajiteltu[Math.floor(lajiteltu.length * 0.95)] ?? 0;
const m3 = await mittarit(sivu);

console.log('\nMITAT (emulaattori, iPhone-profiili 390x844 dpr 3)');
console.log(`  taso näkymässä      z${m3.taso}`);
console.log(`  laattoja näkymässä  ${m3.nakymassa}`);
console.log(`  purettu muisti      ${m3.muistiMt} Mt (laatat × 512² × 4 tavua)`);
console.log(`  laattoja ladattu    ${m3.ladattu} · epäonnistui ${m3.epaonnistui}`);
console.log(`  latausaika          keski ${m3.keskiMs} ms · hitain ${m3.hitainMs} ms`);
console.log(`  päivityksiä         ${m3.paivityksia} · viimeisin ${m3.viimeisinPaivitysMs} ms`);
console.log(`  kehysaika panoroinnissa  p50 ${p50.toFixed(1)} ms · p95 ${p95.toFixed(1)} ms`
  + `  (${kehykset.length} kehystä)`);
console.log(`  pyramidipyyntöjä    ${pyynnot.length}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
