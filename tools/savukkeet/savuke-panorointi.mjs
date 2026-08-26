/*
 * Savuke: fokusmoodin panoroinnin sujuvuus — asettelu ei saa palata
 * siirtosilmukkaan.
 *
 * Omistajan pelitesti 26.8.2026 (iPad, Kreikka): "kartan vieritys
 * tökkii vielä." Mitattu syyketju (Chromium + CDP-invalidointijäljitys
 * ja CPU-profiili, 4x CPU-kuristus):
 *
 *   1. SVG-lapsen CSS-transform-animaatio (.fokuslaatta-syke) EI ole
 *      kompositorin työtä vaan likaa KOKO laudan asettelun jokaisella
 *      animaatiokehyksellä ("Style changed" -> LayoutInvalidation).
 *   2. Siirtokäsittelijän asettelunluvut (rajaaFokusPan/rajaaKasinPan:
 *      pane.clientWidth) pakottivat likaisen asettelun synkronisesti
 *      joka pointermovella: 178 pakotettua asettelua 180 kehyksen
 *      panoroinnissa, profiilissa 2,8 s itsekulua rajaaFokusPanissa.
 *   3. Yhteensä ~1,8 asettelua/kehys; kehysajat p50 24,9 ms,
 *      p95 35,3 ms, 16 longtaskia (54–119 ms) kolmen eleen aikana.
 *
 * Korjaus: sykkeet vaikenevat raahauksen ajaksi (body.kartta-raahaus,
 * css/styles.css + css/fokusvirta.css) ja eleiden silmukat lukevat
 * paneelin mitat fitViewBoxin välimuistista (kartta.js paneMitat) —
 * v1115:n sääntö "ei asettelunlukuja silmukassa". Jälkeen: ~0,8
 * asettelua/kehys, p95 29,2 ms, 0 longtaskia.
 *
 * TÄMÄ SAVUKE VARTIOI RAKENNETTA, EI KELLOA. Kehysaikaraja flakkaisi
 * CI:n koneilla, joten väitteet ovat determinantteja:
 *
 *   1a/1b. Raahauksen aikana body.kartta-raahaus on päällä ja laatan
 *          syke on animaatioltaan vaiennettu (computed 'none').
 *   2.     Asetteluja syntyy skriptatussa panoroinnissa korkeintaan
 *          1,5 kpl kehystä kohti (CDP LayoutCount; ennen korjausta
 *          ~1,8–2,0, jälkeen ~0,8 — raja on väljä tarkoituksella).
 *   3.     Panorointi oikeasti liikuttaa karttaa (transform muuttuu)
 *          — muuten väitteet 1–2 mittaisivat tyhjää.
 *   4.     Eleen jälkeen syke herää uudelleen (animaatio palaa).
 *
 * Fokuspohja syötetään paikallisesti samalla stubilla kuin
 * savuke-fokuskartassa: yhden pikselin PNG ja oikea GRC-rajaus —
 * savuke ei lataa mitään verkosta, ja asettelukustannus syntyy
 * laudan SVG:stä eikä kuvan sisällöstä.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

// Kreikan oikea rajaus (js/packs/fokus-grc.js FOKUS_POHJAT.GRC).
const BBOX = { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 };
const RAJAUS = { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 };
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**/fokus/**', (route) => {
  const url = route.request().url();
  if (url.endsWith('GRC.json')) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        iso: 'GRC', lauta: 'maailmankartta', bbox: BBOX, rajaus: RAJAUS, tiedosto: 'GRC.png',
      }),
    });
    return;
  }
  // Kuva millä tahansa päätteellä (packs-data pyytää GRC.webp): yhden
  // pikselin PNG kelpaa, selain tunnistaa kuvan tavuista.
  if (/GRC\.(png|webp)$/.test(url)) {
    route.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
    return;
  }
  // Naapurit ja yleislehti puuttuvat: kevyt ja verkoton ajo riittää,
  // koska asettelukustannus syntyy laudasta eikä lehtikuvista.
  route.fulfill({ status: 404, body: 'ei' });
});

const cdp = await ctx.newCDPSession(sivu);
await cdp.send('Performance.enable');
const layoutCount = async () => {
  const { metrics } = await cdp.send('Performance.getMetrics');
  return metrics.find((m) => m.name === 'LayoutCount')?.value ?? 0;
};

/* ------------------------------------------------ peli Ateenaan */

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
  window.matkakirja.ui.render();
});
// Saapumisajo, lehden asennus ja rasterointi rauhassa loppuun.
await sivu.waitForTimeout(6000);

const alku = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    fokusmoodi: Boolean(ui.fokusmoodi),
    mannerZoom: Boolean(ui.mannerZoom),
    pohja: Boolean(ui.fokusPohjaBbox),
    syke: Boolean(document.querySelector('.fokuslaatta-syke')),
  };
});
vaadi('0a fokusmoodi Kreikassa on päällä',
  alku.fokusmoodi && alku.mannerZoom && alku.pohja,
  JSON.stringify(alku));
vaadi('0b laatan syke on kartalla', alku.syke);

// Yksi porras sisään, jotta panorointivaraa on runsaasti — sama
// tilanne kuin omistajan lähiluvussa.
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2500);

/* ------------------------------------- skriptattu panorointi */

const KEHYKSIA = 150;
const layoutEnnen = await layoutCount();
const ele = await sivu.evaluate(async (N) => {
  const ui = window.matkakirja.ui;
  const pane = document.querySelector('.map-pane');
  const r = pane.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const o = (x, y) => ({
    bubbles: true, cancelable: true, pointerId: 7, isPrimary: true,
    pointerType: 'touch', clientX: x, clientY: y, buttons: 1,
  });
  const alkuMuunnos = ui.svg.style.transform;
  pane.dispatchEvent(new PointerEvent('pointerdown', o(cx, cy)));
  let raahausNahty = false;
  let sykeVaiennettu = null;
  let muuttui = false;
  for (let i = 0; i < N; i++) {
    await new Promise((ok) => requestAnimationFrame(ok));
    const ph = (i / N) * 2 * Math.PI;
    pane.dispatchEvent(new PointerEvent('pointermove',
      o(cx + 180 * Math.sin(2 * ph), cy + 90 * Math.sin(3 * ph))));
    if (ui.svg.style.transform !== alkuMuunnos) muuttui = true;
    if (document.body.classList.contains('kartta-raahaus')) {
      raahausNahty = true;
      // Luetaan kerran keskeltä elettä: computed-tyyli kertoo, onko
      // vaimennussääntö voimassa (ei aikamittaus, ei siis flakkaa).
      if (i === Math.floor(N / 2)) {
        const syke = document.querySelector('.fokuslaatta-syke');
        sykeVaiennettu = syke
          ? getComputedStyle(syke).animationName === 'none'
          : null;
      }
    }
  }
  /*
   * Sormi pysähtyy ennen irrotusta: liukupanorointi (kartta.js
   * aloitaLiuku) pitäisi muuten raahausluokkaa pystyssä vielä
   * sekunnin eleen jälkeen, ja väite 4 mittaisi liu'un kestoa eikä
   * heräämistä. Paikallaan pidetty sormi tyhjentää nopeusikkunan.
   */
  const viimeX = cx + 180 * Math.sin(2 * 2 * Math.PI);
  const viimeY = cy + 90 * Math.sin(3 * 2 * Math.PI);
  for (let i = 0; i < 12; i++) {
    await new Promise((ok) => requestAnimationFrame(ok));
    pane.dispatchEvent(new PointerEvent('pointermove', o(viimeX, viimeY)));
  }
  pane.dispatchEvent(new PointerEvent('pointerup', o(viimeX, viimeY)));
  return { raahausNahty, sykeVaiennettu, muuttui };
}, KEHYKSIA);
const layoutJalkeen = await layoutCount();

vaadi('1a raahausluokka syttyy eleen aikana', ele.raahausNahty);
vaadi('1b laatan syke vaikenee raahauksen ajaksi', ele.sykeVaiennettu === true,
  `sykeVaiennettu ${ele.sykeVaiennettu}`);
vaadi('3 panorointi liikuttaa karttaa', ele.muuttui);

/*
 * Väljä raja: nyt ~0,8 asettelua/kehys (svg-juuren transform-
 * kirjoitus likaa asettelun kerran kehyksessä — tunnettu jäännös,
 * ks. raportti 26.8.2026), ennen korjausta ~1,8–2,0. Raja 1,5
 * erottaa regression ilman että normaali vaihtelu kaataa ajoa.
 */
const asetteluaPerKehys = (layoutJalkeen - layoutEnnen) / KEHYKSIA;
console.log(`      mitattu: ${asetteluaPerKehys.toFixed(2)} asettelua/kehys`);
vaadi('2 asettelu ei palaa siirtosilmukkaan',
  asetteluaPerKehys <= 1.5,
  `${asetteluaPerKehys.toFixed(2)} asettelua/kehys (raja 1,5)`);

// Eleen jälkeen syke herää: vaimennus oli raahausluokan varassa eikä
// jäänyt päälle.
await sivu.waitForTimeout(600);
const heraa = await sivu.evaluate(() => {
  const syke = document.querySelector('.fokuslaatta-syke');
  return syke ? getComputedStyle(syke).animationName : null;
});
vaadi('4 syke herää eleen jälkeen', Boolean(heraa) && heraa !== 'none',
  `animationName ${heraa}`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
