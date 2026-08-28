/*
 * Savuke: kartan eleet WEBKITILLÄ — lavaikkunan vartija.
 *
 * === MIKSI TÄMÄ ON OLEMASSA (Fablemaxin diagnoosi 28.8.2026, PR #1715) ===
 *
 * Peliä pelataan iPhonen WKWebView'ssä, mutta jokainen kartan
 * sujuvuusmittaus oli siihen asti tehty Chromiumilla. Ero ei ole
 * pikkuseikka: Chromium rasteroi kartan omissa säikeissään ja karsii
 * näkymättömät tiilet, kun taas WebKitissä jättikerroksen tiilien
 * maalaus ja hallinta tapahtuu web-prosessin PÄÄSÄIKEESSÄ — samassa,
 * joka käsittelee eleet. Kolme peräkkäistä optimointierää (v1273–v1291)
 * näytti Chromiumissa terveeltä, ja laite tökki silti: mitattu
 * WebKitillä samalla eleellä 91–142 ms kehyksiä, Chromiumissa 16,8 ms
 * neljä- ja kuusinkertaisellakin kuristuksella.
 *
 * Juurisyyksi mitattiin SVG-LAVAN KOKO: lava mitoitettiin koko
 * pelilaudan kokoiseksi nykyisellä mittakaavalla (saapumisnäkymässä
 * 9 966 x 4 501 css-px, syvimmällä portaalla 51 374 x 22 069). Korjaus
 * on LAVAIKKUNA (js/kartta.js): lava on näkymä + yhden pyyhkäisyn
 * marginaali, ja se ikkunoidaan eleen jälkeen uudelleen.
 *
 * === MITÄ TÄMÄ SAVUKE VARTIOI ===
 *
 * 1–3. RAKENNE, EI KELLO (sama oppi kuin savuke-panoroinnissa): lava
 *      pysyy ikkunan kokoisena, EI kasva zoomatessa, ja reunatäydennys
 *      ei siirrä näkymää pikseliäkään. Nämä väitteet ovat
 *      determinantteja ja kaatuisivat heti, jos lava palaisi laudan
 *      kokoiseksi — se on juuri se vikaluokka, jota kontin Chromium ei
 *      näe.
 * 4.   KELLO SUHTEESSA POHJAAN. Eleen kehysaika mitataan, ja sille
 *      pyydetään omistajan raja (p95 <= 40 ms). Kontin WebKit on
 *      ohjelmistokompositoitu eikä yllä siihen edes tyhjällä
 *      ruudunkokoisella lavalla, joten savuke mittaa ensin VERROKIN
 *      (sama ele lava pakotettuna ruudun kokoiseksi) ja käyttää
 *      absoluuttista rajaa vain, jos ympäristö siihen ylipäätään
 *      yltää. Muuten vaaditaan, ettei ele ole verrokkia moninkerroin
 *      raskaampi. Näin väite ei flakkaa hitaalla koneella mutta
 *      kaatuu, jos lava taas paisuu.
 *
 * WebKitin puuttuminen EI kaada savuketta: se ohitetaan selvällä
 * viestillä (sama malli kuin savuke-fokuskartan ohitusvahdissa).
 * Asennus: `npx playwright install webkit && npx playwright install-deps`.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const webkit = paketti.webkit ?? paketti.default?.webkit;
if (!webkit) {
  console.log('OHITETTU: playwright ei ole asennettuna');
  process.exit(0);
}

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
// iPhone 14 -profiili: juuri se ruutu, jolla omistaja pelaa.
const RUUTU = { width: 390, height: 844 };
/*
 * Sama marginaali kuin js/kartta.js LAVA_MARGINAALI ja LAVA_LIUKUVARA.
 * Luku luetaan lähteestä, jotta savuke ei jää jälkeen, jos marginaalia
 * viritetään — mutta sen OLEMASSAOLO on väite: lava ei saa olla laudan
 * kokoinen.
 */
const lahde = readFileSync(join(JUURI, 'js/kartta.js'), 'utf8');
const MARGINAALI = Number(/LAVA_MARGINAALI = ([\d.]+)/.exec(lahde)?.[1] ?? 1);
const LIUKUVARA = Number(/LAVA_LIUKUVARA = ([\d.]+)/.exec(lahde)?.[1] ?? 720);
/** Suurin sallittu lava akselilla: näkymä + marginaali molemmin puolin. */
const katto = (mitta) => mitta + 2 * Math.max(mitta * MARGINAALI, LIUKUVARA) + 8;
// Pienin mahdollinen kelvollinen PNG (fokuslehti korvataan tällä:
// savuke ei lataa mitään verkosta).
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

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

let selain;
try {
  selain = await webkit.launch();
} catch (virhe) {
  console.log(`OHITETTU: WebKitiä ei voi käynnistää (${String(virhe.message).split('\n')[0]}).`);
  console.log('          Asennus: npx playwright install webkit && npx playwright install-deps');
  palvelin.close();
  process.exit(0);
}

const ctx = await selain.newContext({
  viewport: RUUTU, hasTouch: true, isMobile: true, deviceScaleFactor: 3, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const sivuvirheet = [];
/*
 * Verkkovirheet eivät kuulu tähän savukkeeseen: ämpärin äänet ja kuvat
 * on tarkoituksella katkaistu (savuke ei lataa mitään verkosta), ja
 * WebKit kirjaa niistä oman virheensä. Vain skriptivirheet lasketaan.
 */
const verkkovirhe = /r2\.dev|access control|Load failed|NetworkError|Failed to fetch/i;
sivu.on('pageerror', (e) => {
  if (!verkkovirhe.test(e.message)) sivuvirheet.push(e.message);
});
// Luentapalvelin ja ämpäri katkaistaan: savuke ei kuluta kiintiötä
// eikä lataa mitään verkosta.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**/fokus/**', (route) => {
  const url = route.request().url();
  if (url.endsWith('.json')) { route.fulfill({ status: 404, body: 'ei' }); return; }
  route.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
});

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
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
await sivu.waitForTimeout(6000);
// Lähikuvaan: juuri siellä lava ennen paisui laudan kokoiseksi.
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2500);

const lavanMitat = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    w: parseFloat(ui.svg.style.width) || 0,
    h: parseFloat(ui.svg.style.height) || 0,
    lahikuva: Boolean(ui.mannerZoom),
  };
});

const lahi = await lavanMitat();
vaadi('1a lähikuva on päällä', lahi.lahikuva, 'mannerZoom ei ole päällä');
vaadi('1b lava on ikkunoitu leveydeltään', lahi.w > 0 && lahi.w <= katto(RUUTU.width),
  `lava ${lahi.w} px > katto ${Math.round(katto(RUUTU.width))} px`);
vaadi('1c lava on ikkunoitu korkeudeltaan', lahi.h > 0 && lahi.h <= katto(RUUTU.height),
  `lava ${lahi.h} px > katto ${Math.round(katto(RUUTU.height))} px`);

// Lava EI saa kasvaa zoomatessa: ennen lavaikkunaa se kasvoi
// portaittain 9 966 -> 51 374 px.
for (let i = 0; i < 3; i++) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(900);
}
await sivu.waitForTimeout(1200);
const syva = await lavanMitat();
vaadi('2 lava ei kasva zoomatessa', syva.w <= katto(RUUTU.width) && syva.h <= katto(RUUTU.height),
  `syvimmällä portaalla ${syva.w} x ${syva.h} px`);
console.log(`      mitattu: lava ${lahi.w} x ${lahi.h} px, syvin porras ${syva.w} x ${syva.h} px`);

/** Raahaus kartalla: siirtää näkymää eleen tavoin. */
const raahaa = (dx, dy) => sivu.evaluate(async ([sx, sy]) => {
  const pane = window.matkakirja.ui.mapPane;
  const r = pane.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const o = (x, y) => ({
    bubbles: true, cancelable: true, pointerId: 9, isPrimary: true,
    pointerType: 'touch', clientX: x, clientY: y, buttons: 1,
  });
  pane.dispatchEvent(new PointerEvent('pointerdown', o(cx, cy)));
  const N = 20;
  for (let i = 1; i <= N; i++) {
    await new Promise((ok) => requestAnimationFrame(ok));
    pane.dispatchEvent(new PointerEvent('pointermove', o(cx + (sx * i) / N, cy + (sy * i) / N)));
  }
  pane.dispatchEvent(new PointerEvent('pointerup', o(cx + sx, cy + sy)));
}, [dx, dy]);

/*
 * REUNATÄYDENNYS EI SAA SIIRTÄÄ NÄKYMÄÄ. Ikkunointi ajetaan tässä
 * suoraan (fitViewBox tekee saman kuin ikkunoiLava, mutta ehdoitta),
 * ja sama laudan piste mitataan ruudulla ennen ja jälkeen.
 */
await raahaa(-120, -80);
await sivu.waitForTimeout(500);
const hyppy = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kohta = ui.kartta.nykyinenKeskipiste();
  const ennen = ui.kartta.mapToPane(kohta);
  const lavaEnnen = ui.zoomVasenReuna;
  ui.kartta.fitViewBox();
  const jalkeen = ui.kartta.mapToPane(kohta);
  return {
    dx: Math.abs(jalkeen.x - ennen.x),
    dy: Math.abs(jalkeen.y - ennen.y),
    lavaEnnen,
    lavaJalkeen: ui.zoomVasenReuna,
  };
});
vaadi('3 reunatäydennys ei siirrä näkymää', hyppy.dx < 1 && hyppy.dy < 1,
  `hyppy ${hyppy.dx.toFixed(2)} x ${hyppy.dy.toFixed(2)} px`);
console.log(`      mitattu: hyppy ${hyppy.dx.toFixed(2)} x ${hyppy.dy.toFixed(2)} px`);

/* --- 4. KEHYSAJAT ---------------------------------------------------- */

const asenna = () => sivu.evaluate(() => {
  window.__savuke = { kehykset: [], kaynnissa: true };
  let edellinen = performance.now();
  const askel = (nyt) => {
    if (!window.__savuke.kaynnissa) return;
    window.__savuke.kehykset.push(nyt - edellinen);
    edellinen = nyt;
    requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);
});
const lue = () => sivu.evaluate(() => {
  window.__savuke.kaynnissa = false;
  const s = window.__savuke.kehykset.slice(3).sort((a, b) => a - b);
  const p = (q) => Math.round(s[Math.min(s.length - 1, Math.floor(s.length * q))] * 10) / 10;
  return { n: s.length, p50: p(0.5), p95: p(0.95), max: p(1) };
});
const panorointiEle = () => sivu.evaluate(async () => {
  const pane = window.matkakirja.ui.mapPane;
  const r = pane.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const o = (x, y) => ({
    bubbles: true, cancelable: true, pointerId: 7, isPrimary: true,
    pointerType: 'touch', clientX: x, clientY: y, buttons: 1,
  });
  const N = 120;
  pane.dispatchEvent(new PointerEvent('pointerdown', o(cx, cy)));
  for (let i = 0; i < N; i++) {
    await new Promise((ok) => requestAnimationFrame(ok));
    const ph = (i / N) * 2 * Math.PI;
    pane.dispatchEvent(new PointerEvent('pointermove',
      o(cx + 120 * Math.sin(2 * ph), cy + 80 * Math.sin(3 * ph))));
  }
  pane.dispatchEvent(new PointerEvent('pointerup', o(cx, cy)));
});
const nipistysEle = () => sivu.evaluate(async () => {
  const pane = window.matkakirja.ui.mapPane;
  const r = pane.getBoundingClientRect();
  const kx = r.left + r.width / 2;
  const ky = r.top + r.height / 2;
  const sormi = (id, x, y) => ({ identifier: id, clientX: x, clientY: y, pageX: x, pageY: y });
  const parit = (d) => [sormi(1, kx - d / 2, ky), sormi(2, kx + d / 2, ky)];
  const laheta = (tyyppi, koskee, muuttuneet) => {
    const e = new Event(tyyppi, { bubbles: true, cancelable: true });
    Object.defineProperty(e, 'touches', { value: koskee });
    Object.defineProperty(e, 'targetTouches', { value: koskee });
    Object.defineProperty(e, 'changedTouches', { value: muuttuneet });
    pane.dispatchEvent(e);
  };
  const N = 80;
  let p = parit(120);
  laheta('touchstart', p, p);
  for (let i = 1; i <= N; i++) {
    await new Promise((ok) => requestAnimationFrame(ok));
    p = parit(120 + 140 * (i / N));
    laheta('touchmove', p, p);
  }
  laheta('touchcancel', [], p);
});
const aja = async (ele) => {
  await asenna();
  await ele();
  const tulos = await lue();
  await sivu.waitForTimeout(1200);
  return tulos;
};

const panorointi = await aja(panorointiEle);
const nipistys = await aja(nipistysEle);

/*
 * VERROKKI: sama ele lava pakotettuna ruudun kokoiseksi. Se on tämän
 * koneen pohja-aika samalle eleelle — nopeampaa ei tällä sisällöllä
 * saa. Kuva vääristyy, mutta kello ei siitä välitä.
 */
await sivu.evaluate(([w, h]) => {
  const svg = window.matkakirja.ui.svg;
  svg.style.width = `${w}px`;
  svg.style.height = `${h}px`;
}, [RUUTU.width, RUUTU.height]);
await sivu.waitForTimeout(1200);
const verrokki = await aja(panorointiEle);

console.log(`      mitattu: panorointi p50 ${panorointi.p50} / p95 ${panorointi.p95} ms`
  + `, nipistys p50 ${nipistys.p50} / p95 ${nipistys.p95} ms`
  + `, verrokki (ruudunkokoinen lava) p95 ${verrokki.p95} ms`);

const RAJA_MS = 40;
const VERROKIN_KERROIN = 2.5;
if (verrokki.p95 <= 25) {
  vaadi('4a panorointi p95 <= 40 ms', panorointi.p95 <= RAJA_MS, `p95 ${panorointi.p95} ms`);
  vaadi('4b nipistys p95 <= 40 ms', nipistys.p95 <= RAJA_MS, `p95 ${nipistys.p95} ms`);
} else {
  /*
   * Ympäristö ei yllä absoluuttiseen rajaan edes ruudunkokoisella
   * lavalla (ohjelmistokompositointi kontissa), joten kello mitataan
   * suhteessa siihen pohjaan. Raja on väljä tarkoituksella: se kaataa
   * lavan paisumisen, ei koneen hitautta.
   */
  const katto2 = Math.round(verrokki.p95 * VERROKIN_KERROIN);
  console.log(`      HUOM: verrokki ${verrokki.p95} ms > 25 ms — ympäristö ei yllä `
    + `${RAJA_MS} ms:n rajaan, käytetään suhteellista kattoa ${katto2} ms.`);
  vaadi('4a panorointi ei ole verrokkia moninkerroin raskaampi',
    panorointi.p95 <= katto2, `p95 ${panorointi.p95} ms > ${katto2} ms`);
  vaadi('4b nipistys ei ole verrokkia moninkerroin raskaampi',
    nipistys.p95 <= katto2, `p95 ${nipistys.p95} ms > ${katto2} ms`);
}

vaadi('5 ei sivuvirheitä', sivuvirheet.length === 0, sivuvirheet[0] ?? '');

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
