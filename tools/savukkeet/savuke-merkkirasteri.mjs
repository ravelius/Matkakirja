/*
 * Savuke: MERKKIKERROKSEN RASTERI ELEEN AJAKSI (js/karttamerkit.js).
 *
 * === MIKÄ VIKA OLI ===================================================
 *
 * v1280 vei merkkikerrokset — kohdemerkit, eläintäkyt, nimilaput,
 * valotäplät, nippuviivat — `display: none`-tyylillä pois
 * maalikierroksesta koko eleen ajaksi. Kehysbudjetti parani, mutta
 * kartalta katosi kaikki, mitä siitä katsotaan, aina kun sitä liikutti.
 *
 *     OMISTAJA 29.8.2026 ilta: *"Kaikki kohteet saisi siirtyä kartalla
 *     yhtäaikaa niin että mitään ei katoaisi näkyvistä siirron
 *     aikana... kone jaksaa piirtää kahta kerrosta yhtäaikaa ja sen
 *     toisen kerroksen voi varmaan myös rasteroida."*
 *
 * === KORJAUS, JOTA TÄMÄ SAVUKE VARTIOI ===============================
 *
 *   M1  Merkkikerroksista paistetaan bittikartta omalle canvakselleen,
 *       joka asuu KARTTAKUORESSA svg:n PÄÄLLÄ. Silloin kuoren oma
 *       translate3d siirtää pohjan, svg:n ja merkit yhtenä.
 *   M2  ELEEN AIKANA MERKIT OVAT RUUDULLA. Ei yhtäkään otosta, jossa
 *       elävät kerrokset olisi piilotettu ILMAN että rasteri on
 *       tilalla — tämä on väitteistä se, joka vastaa omistajan
 *       pyyntöä sanatarkasti.
 *   M3  ELEEN JÄLKEEN SVG PALAA: kerrokset ovat taas näkyviä ja merkit
 *       ovat napautuskohteita (elementFromPoint osuu merkkiin).
 *   M4  RASTERI EI JÄÄ RUUDULLE. Asettuneessa näkymässä runkoluokka on
 *       poissa, eli ruudulla on terävä vektori eikä pehmeä bittikartta.
 *   M5  KESKEN ELEEN EI PAISTETA. Sormen alla paistolaskuri ei liiku —
 *       sama sääntö kuin pohjacanvaksella (js/ui.js taydennaTaide
 *       sääntö 1), ja tässä myös ainoan puskurin ehto: puoliksi
 *       piirretty rasteri ei saa olla ruudulla.
 *   M6  VÄLIAIKAISRATKAISU ON PURETTU. Ilman valmista rasteria elävät
 *       kerrokset JÄÄVÄT paikalleen: ele on hitaampi, mutta merkitöntä
 *       karttaa ei enää synny missään tilanteessa.
 *   M7  Mitoitus pysyy puolessa pohjacanvaksen megapikselibudjetista ja
 *       4096 pikselin sivukatossa.
 *
 * TÄMÄ SAVUKE VARTIOI RAKENNETTA JA NÄKYVYYTTÄ, EI KELLOA: kehysaikaraja
 * flakkaisi CI:n koneilla, ja mitattava asia on tässä joka tapauksessa
 * se, mitä ruudulla ON — ei se, kuinka nopeasti.
 *
 * VERKOSTA EI HAETA MITÄÄN: lehdet tulevat testin omasta reitityksestä
 * (samat tiedostot kuin muillakin fokussavukkeilla).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { KARTTAPOHJAN_PROFIILIT } from '../../js/karttapohja.js';
import { mitoitaMerkkirasteri } from '../../js/karttamerkit.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
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

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ================= M7: mitoitus ilman selainta ====================== */

console.log('--- M7: mitoitus (puhdas funktio) ---');
{
  // Lavan nimellinen koko = ruutu + lavamarginaali (720 px) molemmin puolin.
  const laudat = [
    { nimi: 'iPhone 390x844', leveys: 390 + 1440, korkeus: 844 + 1440, profiili: 'kapea' },
    { nimi: 'iPad 820x1180', leveys: 820 + 1440, korkeus: 1180 + 1440, profiili: 'tabletti' },
    { nimi: 'tyopoyta 1440x900', leveys: 1440 + 1440, korkeus: 900 + 1440, profiili: 'tyopoyta' },
    { nimi: 'jattilava 6000x6000', leveys: 6000, korkeus: 6000, profiili: 'tyopoyta' },
  ];
  let mahtuu = true;
  let sivut = true;
  let alleKuinPohja = true;
  for (const lauta of laudat) {
    const m = mitoitaMerkkirasteri({
      leveysCss: lauta.leveys, korkeusCss: lauta.korkeus, profiili: lauta.profiili,
    });
    const pohjanKerroin = KARTTAPOHJAN_PROFIILIT[lauta.profiili].kerroin;
    if (m.tavut > m.budjettiTavut * 1.001) mahtuu = false;
    if (m.leveysPx > 4096 || m.korkeusPx > 4096) sivut = false;
    if (m.kerroin > pohjanKerroin + 1e-9) alleKuinPohja = false;
    console.log(`      ${lauta.nimi} (${lauta.profiili}): k=${m.kerroin.toFixed(3)}`
      + ` canvas=${m.leveysPx}x${m.korkeusPx} ${(m.tavut / 1e6).toFixed(1)} Mt`
      + ` / budjetti ${(m.budjettiTavut / 1e6).toFixed(0)} Mt`);
  }
  vaadi('M7a rasteri mahtuu puolikkaaseen budjettiin kaikilla laudoilla', mahtuu);
  vaadi('M7b rasterin sivu enintään 4096 px', sivut);
  vaadi('M7c rasteri ei ole pohjacanvasta tarkempi', alleKuinPohja);
  /*
   * Puolikas budjetti on koko pointti: rasteri on ruudulla vain eleen
   * ajan, eikä toista lavan kokoista puskuria mahdu puhelimeen pohjan
   * viereen. Tarkistetaan luku suoraan profiilista.
   */
  const puhelin = mitoitaMerkkirasteri({ leveysCss: 1830, korkeusCss: 2284, profiili: 'kapea' });
  vaadi('M7d budjetti on puolet pohjan megapikselikatosta',
    Math.abs(puhelin.budjettiTavut - KARTTAPOHJAN_PROFIILIT.kapea.kattoMp * 0.5 * 4e6) < 1,
    `${puhelin.budjettiTavut}`);
}

/* ================= selainosuus ====================================== */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await sivu.addInitScript(() => {
  try { localStorage.setItem('matkakirja-kehittaja', '1'); } catch { /* yksityinen tila */ }
});
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**r2.dev/**', (route) => route.abort());
const LEHDEN_KUVA = readFileSync(join(JUURI, 'assets/kartat/dubrovnik-keskusta.png'));
// Kreikan oikea rajaus (js/packs/fokus-grc.js FOKUS_POHJAT.GRC).
const BBOX = { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 };
const RAJAUS = { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 };
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
  if (/\.(png|webp)$/.test(url)) {
    route.fulfill({ status: 200, contentType: 'image/png', body: LEHDEN_KUVA });
    return;
  }
  route.fulfill({ status: 404, body: 'ei' });
});
await sivu.goto(osoite, { waitUntil: 'load' });
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
// Yksi porras lähemmäs: merkkejä on ruudulla ja lava on ikkunoitu.
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2000);

const tilasto = () => sivu.evaluate(() => window.matkakirja.ui.karttamerkit?.tilasto ?? null);

/**
 * Odotetaan että rasteri on paistettu JA asettunut. Merkit voivat
 * rakentua uusiksi kesken kaiken (kohteet saapuvat, valo syttyy), ja
 * jokainen rakennus mitätöi rasterin.
 */
const odotaVakaa = async (vakaaMs = 1400, katto = 40000) => {
  const loppu = Date.now() + katto;
  let viimePaistoja = -1;
  let vakaastaAlkaen = Date.now();
  while (Date.now() < loppu) {
    const t = await tilasto();
    if (!t || !t.tuore || t.paistoja !== viimePaistoja) {
      viimePaistoja = t?.paistoja ?? -1;
      vakaastaAlkaen = Date.now();
    } else if (Date.now() - vakaastaAlkaen >= vakaaMs) return t;
    await sivu.waitForTimeout(200);
  }
  return tilasto();
};
const valmis = await odotaVakaa();
console.log(`\n--- M1: rasteri kuoressa ---\n      tilasto: ${JSON.stringify(valmis)}`);

/* --- M1: canvas on kuoressa svg:n päällä ja siinä on merkkejä ------ */

const rakenne = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kuori = ui.karttaKuori;
  const canvas = kuori?.querySelector('canvas.karttamerkit');
  const laatikko = (e) => (e ? (({ x, y, width, height }) => ({
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    w: Math.round(width * 100) / 100,
    h: Math.round(height * 100) / 100,
  }))(e.getBoundingClientRect()) : null);
  /*
   * Rasterissa on oikeasti pikseleitä? Luenta tehdään VAIN testissä —
   * tuotantopolulla ei ole yhtään getImageData-kutsua (siksi canvas
   * luodaan ilman willReadFrequently-lippua).
   */
  let musteisia = null;
  try {
    const c2 = canvas?.getContext('2d');
    if (c2 && canvas.width > 0) {
      const data = c2.getImageData(0, 0, canvas.width, canvas.height).data;
      let n = 0;
      // Joka 37. pikseli riittää otokseksi: merkkejä on kymmeniä ja
      // koko luenta olisi kahdeksan megapikseliä.
      for (let i = 3; i < data.length; i += 4 * 37) if (data[i] > 8) n += 1;
      musteisia = n;
    }
  } catch (e) {
    musteisia = `virhe: ${e.message}`;
  }
  return {
    onCanvas: Boolean(canvas),
    // compareDocumentPosition === 2 (PRECEDING): svg on canvasta ennen.
    svgEnnen: canvas ? canvas.compareDocumentPosition(ui.svg) === 2 : false,
    canvasKoko: canvas ? `${canvas.width}x${canvas.height}` : null,
    canvasLaatikko: laatikko(canvas),
    lavaLaatikko: laatikko(ui.svg),
    zIndex: canvas ? getComputedStyle(canvas).zIndex : null,
    musteisia,
    kerroksia: [...ui.svg.querySelectorAll(
      '.fokuskohteet, .fokuspisteet, .fokusnosto-symbolit, .elaintakyt, .nippuviivat',
    )].filter((g) => g.firstElementChild && getComputedStyle(g).display !== 'none').length,
  };
});
console.log(`      ${JSON.stringify(rakenne)}`);
vaadi('M1a rasterin canvas on karttakuoressa svg:n PÄÄLLÄ',
  rakenne.onCanvas && rakenne.svgEnnen, JSON.stringify(rakenne));
/*
 * PAIKOITUS MITATAAN ELEEN AIKANA (M2e), ei tässä: levossa canvas on
 * `display: none`, ja piilossa olevan elementin ruutulaatikko on nolla.
 */
vaadi('M1c rasteri on nopan alla mutta svg:n yllä (z-index 2)',
  rakenne.zIndex === '2', `${rakenne.zIndex}`);
vaadi('M1d paistettuja kerroksia on ainakin yksi',
  rakenne.kerroksia > 0 && valmis?.kerroksia > 0,
  `${rakenne.kerroksia} / ${JSON.stringify(valmis)}`);
vaadi('M1e rasterissa on mustetta (ei tyhjä canvas)',
  typeof rakenne.musteisia === 'number' && rakenne.musteisia > 0,
  `${rakenne.musteisia}`);

/*
 * ULKOISET KUVAT. Tämä on paiston hauras kohta: selain ei lataa
 * <img>-kontekstissa olevaan SVG:hen mitään ulkoa, joten eläintäkyjen
 * symboli (assets/kartat/symbolit/sym-elain.webp) jäisi tyhjäksi, jos
 * upotusta ei olisi. Kysytään suoraan siltä merkkijonolta, joka
 * blobiin menee.
 */
const xml = await sivu.evaluate(async () => {
  const kp = window.matkakirja.ui.karttamerkit;
  const tila = kp.laskeTila();
  if (!tila) return null;
  const teksti = await kp.kokoaXml(tila);
  if (!teksti) return null;
  return {
    pituus: teksti.length,
    kuvia: (teksti.match(/<image\b/g) ?? []).length,
    dataUrleja: (teksti.match(/href="data:/g) ?? []).length,
    ulkoisia: (teksti.match(/href="(?!data:)[^"#]/g) ?? []).length,
    tyylitelty: /style="[^"]*fill:/.test(teksti),
  };
});
console.log(`      xml: ${JSON.stringify(xml)}`);
vaadi('M1f jokainen <image> on upotettu data-URLina, ulkoisia viittauksia ei jää',
  Boolean(xml) && xml.kuvia > 0 && xml.dataUrleja === xml.kuvia && xml.ulkoisia === 0,
  JSON.stringify(xml));
vaadi('M1g tyylit ovat kiinni elementeissä (irrallinen svg ei peri sivun css:ää)',
  xml?.tyylitelty === true, JSON.stringify(xml));

/* --- M2: eleen aikana merkit ovat ruudulla -------------------------- */

console.log('\n--- M2: panorointi 3 s, otos joka kehyksellä ---');
const otokset = await sivu.evaluate(async () => {
  const pane = document.querySelector('.map-pane');
  const kp = window.matkakirja.ui.karttamerkit;
  const tee = (tyyppi, cx, cy) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true,
    clientX: cx, clientY: cy, buttons: tyyppi === 'pointerup' ? 0 : 1,
  }));
  const kerätyt = [];
  tee('pointerdown', 195, 430);
  const loppu = performance.now() + 3000;
  let vaihe = 0;
  const canvas = () => document.querySelector('canvas.karttamerkit');
  while (performance.now() < loppu) {
    vaihe += 1;
    tee('pointermove', 195 + Math.sin(vaihe / 7) * 150, 430 + Math.cos(vaihe / 11) * 80);
    await new Promise((ok) => { requestAnimationFrame(() => ok()); });
    const c = canvas();
    const cr = c?.getBoundingClientRect();
    const sr = window.matkakirja.ui.svg.getBoundingClientRect();
    kerätyt.push({
      piilossa: document.body.classList.contains('kartta-merkit-piilossa'),
      rasteri: document.body.classList.contains('karttamerkit-rasteri'),
      naytto: c ? getComputedStyle(c).display : 'ei canvasta',
      paistoja: kp.tilasto.paistoja,
      // Rasterin ja lavan ruutulaatikoiden ero: kuoren muunnos siirtää
      // molempia, joten eron on pysyttävä nollassa joka kehyksellä.
      ero: cr ? Math.max(Math.abs(cr.x - sr.x), Math.abs(cr.y - sr.y),
        Math.abs(cr.width - sr.width), Math.abs(cr.height - sr.height)) : -1,
    });
  }
  tee('pointerup', 195, 430);
  return kerätyt;
});
const tyhjia = otokset.filter((o) => o.piilossa && !o.rasteri);
const rasterillisia = otokset.filter((o) => o.rasteri);
const naytolla = rasterillisia.filter((o) => o.naytto === 'block');
console.log(`      otoksia ${otokset.length}, rasteri päällä ${rasterillisia.length},`
  + ` canvas display:block ${naytolla.length}, merkittömiä kehyksiä ${tyhjia.length}`);
vaadi('M2a yhtäkään kehystä ilman merkkejä ei synny', tyhjia.length === 0,
  `${tyhjia.length} kehystä piilotti merkit ilman rasteria`);
vaadi('M2b rasteri otti paikkansa eleen ajaksi', rasterillisia.length > 0,
  JSON.stringify(otokset.slice(0, 4)));
vaadi('M2c rasterin canvas on oikeasti ruudulla koko sen ajan',
  rasterillisia.length > 0 && naytolla.length === rasterillisia.length,
  `${naytolla.length}/${rasterillisia.length}`);
vaadi('M2d eleen aikana ei paisteta uutta rasteria',
  new Set(otokset.map((o) => o.paistoja)).size === 1,
  `${[...new Set(otokset.map((o) => o.paistoja))].join(',')}`);
/*
 * POHJA JA MERKIT SAMAN MUUNNOKSEN ALLA (omistajan sanatarkka toive).
 * Rasteri ja svg ovat samassa karttakuoressa, joten kuoren translate3d
 * siirtää ne yhtenä — ero laatikoiden välillä on nolla joka kehyksellä.
 * Jos rasteri asuisi kuoren ulkopuolella, ero kasvaisi sormen mukana.
 */
{
  const suurinEro = Math.max(...rasterillisia.map((o) => o.ero));
  console.log(`      suurin ero rasterin ja lavan laatikoiden valilla ${suurinEro.toFixed(2)} px`);
  vaadi('M2e rasteri liikkuu lavan kanssa yhtenä (ero < 0,5 px)',
    rasterillisia.length > 0 && suurinEro < 0.5, `${suurinEro}`);
}

/* --- M3/M4: eleen jälkeen svg palaa ja rasteri väistyy -------------- */

console.log('\n--- M3/M4: eleen jälkeen ---');
await sivu.waitForTimeout(2500);
await odotaVakaa();
const jalkeen = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const pane = document.querySelector('.map-pane').getBoundingClientRect();
  const kerrokset = [...ui.svg.querySelectorAll(
    '.fokuskohteet, .fokuspisteet, .fokusnosto-symbolit, .elaintakyt, .nippuviivat',
  )].filter((g) => g.firstElementChild);
  const nakyvat = kerrokset.filter((g) => getComputedStyle(g).display !== 'none');
  /*
   * NAPAUTUSKOHDE. Osumatesti — sekä selaimen oma että moduulin
   * ruutulaatikkovertailu — vaatii näkyvän solmun, ja juuri se on syy
   * palauttaa svg eleen jälkeen. Etsitään merkki, joka on ruudun
   * keskikaistalla, ja kysytään selaimelta mikä siinä kohtaa on.
   */
  let osuma = null;
  for (const kerros of nakyvat) {
    for (const merkki of kerros.children) {
      const r = merkki.getBoundingClientRect();
      if (!(r.width > 0) || !(r.height > 0)) continue;
      const cx = r.x + r.width / 2;
      const cy = r.y + r.height / 2;
      if (cx < pane.x + 40 || cx > pane.right - 40) continue;
      if (cy < pane.y + 120 || cy > pane.bottom - 200) continue;
      const alla = document.elementFromPoint(cx, cy);
      osuma = {
        kerros: kerros.getAttribute('class'),
        merkkiOn: Boolean(alla?.closest?.(
          '.fokuskohteet, .fokuspisteet, .fokusnosto-symbolit, .elaintakyt, .nippuviivat',
        )),
        alla: alla ? `${alla.tagName}.${alla.getAttribute?.('class') ?? ''}` : null,
      };
      if (osuma.merkkiOn) return { kerroksia: kerrokset.length, nakyvia: nakyvat.length, osuma, ...tila() };
    }
  }
  function tila() {
    return {
      piilossa: document.body.classList.contains('kartta-merkit-piilossa'),
      rasteri: document.body.classList.contains('karttamerkit-rasteri'),
      canvasNaytto: (() => {
        const c = document.querySelector('canvas.karttamerkit');
        return c ? getComputedStyle(c).display : 'ei canvasta';
      })(),
    };
  }
  return { kerroksia: kerrokset.length, nakyvia: nakyvat.length, osuma, ...tila() };
});
console.log(`      ${JSON.stringify(jalkeen)}`);
vaadi('M3a merkkikerrokset ovat taas näkyviä', jalkeen.nakyvia > 0 && !jalkeen.piilossa,
  JSON.stringify(jalkeen));
vaadi('M3b merkki on napautuskohde eleen jälkeen', jalkeen.osuma?.merkkiOn === true,
  JSON.stringify(jalkeen.osuma));
vaadi('M4a rasteri ei jää ruudulle asettuneessa näkymässä',
  jalkeen.rasteri === false && jalkeen.canvasNaytto === 'none',
  JSON.stringify(jalkeen));

/* --- M5: HOLD 5 s — ei yhtään paistoa sormen alla ------------------- */

console.log('\n--- M5: HOLD 5 s ---');
const ennenHold = await tilasto();
await sivu.evaluate(async () => {
  const pane = document.querySelector('.map-pane');
  const tee = (tyyppi, cx, cy) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true,
    clientX: cx, clientY: cy, buttons: tyyppi === 'pointerup' ? 0 : 1,
  }));
  tee('pointerdown', 195, 430);
  const loppu = performance.now() + 5000;
  let vaihe = 0;
  while (performance.now() < loppu) {
    vaihe += 1;
    tee('pointermove', 195 + Math.sin(vaihe / 6) * 160, 430 + Math.cos(vaihe / 9) * 80);
    await new Promise((ok) => { requestAnimationFrame(() => ok()); });
  }
  tee('pointerup', 195, 430);
});
const holdJalkeen = await tilasto();
console.log(`      paistoja ${ennenHold.paistoja} → ${holdJalkeen.paistoja}`);
vaadi('M5 kesken eleen ei paisteta', holdJalkeen.paistoja === ennenHold.paistoja,
  `${ennenHold.paistoja} → ${holdJalkeen.paistoja}`);
await sivu.waitForTimeout(2500);
await odotaVakaa();

/* --- M6: ilman rasteria merkit JÄÄVÄT paikalleen -------------------- */

console.log('\n--- M6: väliaikaisratkaisu purettu ---');
const ilmanRasteria = await sivu.evaluate(async () => {
  const kp = window.matkakirja.ui.karttamerkit;
  // Kylmä rasteri: juuri se tilanne, jossa v1280 olisi piilottanut
  // merkit ja jättänyt kartan tyhjäksi.
  kp.tuore = false;
  const pane = document.querySelector('.map-pane');
  const tee = (tyyppi, cx, cy) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true,
    clientX: cx, clientY: cy, buttons: tyyppi === 'pointerup' ? 0 : 1,
  }));
  const kerätyt = [];
  tee('pointerdown', 195, 430);
  for (let i = 0; i < 40; i++) {
    tee('pointermove', 195 + Math.sin(i / 5) * 140, 430 + Math.cos(i / 8) * 70);
    await new Promise((ok) => { requestAnimationFrame(() => ok()); });
    kerätyt.push({
      piilossa: document.body.classList.contains('kartta-merkit-piilossa'),
      rasteri: document.body.classList.contains('karttamerkit-rasteri'),
    });
  }
  tee('pointerup', 195, 430);
  return kerätyt;
});
const piilotuksia = ilmanRasteria.filter((o) => o.piilossa).length;
console.log(`      otoksia ${ilmanRasteria.length}, piilotuksia ${piilotuksia}`);
vaadi('M6 ilman valmista rasteria merkkejä ei piiloteta', piilotuksia === 0,
  `${piilotuksia} otosta piilotti merkit kylmällä rasterilla`);

await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
