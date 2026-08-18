/*
 * Savuke: kartan geometria ei jää vanhaksi kesken pelin (omistajan
 * kuvakaappaus iPadilta 18.8.2026, v884: kartta pienentyneenä ja
 * työntyneenä oikealle alas, pergamenttikaista vasemmassa reunassa,
 * MATKAKIRJASTA-kyltti kaupunkinimen päällä, noppa irrallaan
 * kaistalla). Vartiot:
 *  1. Lehtikierros: lehti auki → näkymän koko muuttuu lehden ollessa
 *     auki → svg:hen jää (simuloitu WKWebView-aukko) vanhentunut
 *     muunnos → lehden sulku johtaa geometrian uudelleen: viewBoxin
 *     ja paneelin mittasuhde täsmää, svg peittää paneelin eikä
 *     pelaajan kaupunki ole nurkassa kyltin alla.
 *  2. Kesken jäänyt nipistys (ei touchend/touchcancel): jumivahti
 *     hylkää eleen — scale-muunnos poistuu ja geometria palaa eleen
 *     edeltävään tilaan. 2b: nipistyksen oma vahtiajastin purkaa
 *     jumin ilman mitään muuta ärsykettä (tarkkuussilmukka voi olla
 *     levossa sammuksissa).
 *  3. Yhden sormen kosketus purkaa jumiutuneen nipistyksen heti, ja
 *     panorointi toimii taas.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 }, hasTouch: true, isMobile: true,
  deviceScaleFactor: 2, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2000);

// Peli käyntiin ja kartta lähikuvaan (mannerZoom) kuten pelissä.
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2000);

/** Kartan geometrian kuntoraportti. */
const geometria = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const p = ui.svg.parentElement.getBoundingClientRect();
  const r = ui.svg.getBoundingClientRect();
  const vb = ui.svg.viewBox.baseVal;
  const oma = ui.game.cityOf?.() ?? null;
  const kohta = oma ? ui.kartta.mapToPane({ x: oma.x, y: oma.y }) : null;
  return {
    transform: ui.svg.style.transform,
    // Positiivinen rako = paneelin pergamentti näkyy siltä reunalta.
    rakoVasen: Math.round(r.left - p.left),
    rakoYla: Math.round(r.top - p.top),
    rakoOikea: Math.round(p.right - r.right),
    rakoAla: Math.round(p.bottom - r.bottom),
    // viewBoxin ja piirtokoon suhteen on täsmättävä (ei venytystä).
    suhdeVirhe: Math.abs((r.width / r.height) / (vb.width / vb.height) - 1),
    pane: { w: Math.round(p.width), h: Math.round(p.height) },
    kaupunki: kohta ? { x: Math.round(kohta.x), y: Math.round(kohta.y) } : null,
    panX: ui.panX,
  };
});
const kunnossa = (g) => !g.transform.includes('scale(')
  && g.rakoVasen <= 1 && g.rakoYla <= 1 && g.rakoOikea <= 1 && g.rakoAla <= 1
  && g.suhdeVirhe < 0.02;

// --- 1. Lehtikierros: avaa → muuta kokoa → vanhennus → sulje ----------
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(600);
// Näkymän koko muuttuu lehden ollessa auki (Stage Manager / split
// view / näppäimistö). PYSTYSUUNTAINEN koko: vaakasuunta laukaisisi
// vaakalukon (.rotate-guard piilottaa koko pelin), eikä se ole tämän
// savukkeen aihe.
await sivu.setViewportSize({ width: 768, height: 1024 });
// Odotus yli kaikkien resize-ajastimien (elvytys 120 ms + lehden
// mittavarmistus 400/1600 ms): korruption jälkeen ainoa siivooja on
// lehden sulku — muuten vartio läpäisisi ajoituskilvalla myös
// korjaamattoman koodin (mitattu 18.8.2026: elvytysajastin ehti
// satunnaisesti korruption jälkeen ja pyyhki sen).
await sivu.waitForTimeout(2500);
/*
 * WKWebView-aukon simulointi: moottori on voinut oikaista asettelun
 * toimittamatta tapahtumaa, jolloin svg:ssä on sulkuhetkellä
 * vanhentunut muunnos. Kirjoitetaan sellainen käsin — vain lehden
 * sulun peitevahti voi enää siivota sen, koska kokoa ei muuteta enää.
 */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.svg.style.transform = 'translate3d(180px, 60px, 0) scale(0.5)';
});
await sivu.evaluate(() => { document.getElementById('arrival-dialog').close(); });
await sivu.waitForTimeout(300);
const lehdenJalkeen = await geometria();
vaadi('lehden sulku johtaa kartan geometrian uudelleen',
  kunnossa(lehdenJalkeen), JSON.stringify(lehdenJalkeen));
vaadi('pelaajan kaupunki ei ole nurkassa kyltin alla',
  Boolean(lehdenJalkeen.kaupunki)
  && lehdenJalkeen.kaupunki.x > 40 && lehdenJalkeen.kaupunki.y > 40
  && lehdenJalkeen.kaupunki.x < lehdenJalkeen.pane.w - 40
  && lehdenJalkeen.kaupunki.y < lehdenJalkeen.pane.h - 40,
  JSON.stringify(lehdenJalkeen));

// --- 2. Kesken jäänyt nipistys: jumivahti hylkää eleen ----------------
/** Nipistys sisäänpäin ILMAN touchend/touchcancel-tapahtumaa. */
const nipistaKesken = () => sivu.evaluate(async () => {
  const pane = window.matkakirja.ui.svg.parentElement;
  const kx = 500; const ky = 500; const alku = 400;
  const sormi = (id, x, y) => ({ identifier: id, clientX: x, clientY: y, pageX: x, pageY: y });
  const parit = (d) => [sormi(1, kx - d / 2, ky), sormi(2, kx + d / 2, ky)];
  const laheta = (tyyppi, koskee, muuttuneet) => {
    const e = new Event(tyyppi, { bubbles: true, cancelable: true });
    Object.defineProperty(e, 'touches', { value: koskee });
    Object.defineProperty(e, 'targetTouches', { value: koskee });
    Object.defineProperty(e, 'changedTouches', { value: muuttuneet });
    pane.dispatchEvent(e);
  };
  let p = parit(alku);
  laheta('touchstart', p, p);
  for (let i = 1; i <= 10; i++) {
    p = parit(alku * (1 - 0.6 * (i / 10)));
    laheta('touchmove', p, p);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 16));
  }
  // EI touchend/touchcancel: iOS söi eleen lopun.
});
const ennenNipistysta = await geometria();
await nipistaKesken();
const kesken = await geometria();
vaadi('kesken jäänyt nipistys jättää scale-muunnoksen (lähtötila)',
  kesken.transform.includes('scale('), JSON.stringify(kesken));
// Jumivahti: ele on ollut hiljaa yli rajan → tarkistus hylkää sen.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartanEleHetki = performance.now() - 6000;
  ui.tarkistaTarkkuus();
});
await sivu.waitForTimeout(400);
const jumivahdinJalkeen = await geometria();
vaadi('jumivahti hylkää kesken jääneen nipistyksen',
  kunnossa(jumivahdinJalkeen), JSON.stringify(jumivahdinJalkeen));
vaadi('geometria palaa eleen edeltävään tilaan',
  jumivahdinJalkeen.transform === ennenNipistysta.transform,
  `${jumivahdinJalkeen.transform} vs ${ennenNipistysta.transform}`);

// --- 2b. Nipistyksen OMA vahti purkaa jumin ilman mitään apua ---------
// Tarkkuussilmukka on levossa sammuksissa (mitattu 18.8.2026), joten
// pelkkä eleKesken-koukku ei riitä: elävän nipistyksen oma ajastin on
// ainoa, joka laukeaa varmasti. Ei kosketuksia, ei kutsuja — vain
// odotus yli jumirajan (5 s + 200 ms).
await nipistaKesken();
await sivu.waitForTimeout(6500);
const omanVahdin = await geometria();
vaadi('nipistyksen oma vahti purkaa jumin ilman muita ärsykkeitä',
  kunnossa(omanVahdin), JSON.stringify(omanVahdin));

// --- 3. Yhden sormen kosketus purkaa jumin heti -----------------------
await nipistaKesken();
await sivu.evaluate(() => {
  const pane = window.matkakirja.ui.svg.parentElement;
  const sormi = { identifier: 9, clientX: 300, clientY: 500, pageX: 300, pageY: 500 };
  const e = new Event('touchstart', { bubbles: true, cancelable: true });
  Object.defineProperty(e, 'touches', { value: [sormi] });
  Object.defineProperty(e, 'targetTouches', { value: [sormi] });
  Object.defineProperty(e, 'changedTouches', { value: [sormi] });
  pane.dispatchEvent(e);
});
await sivu.waitForTimeout(200);
const kosketuksenJalkeen = await geometria();
vaadi('yhden sormen kosketus purkaa jumiutuneen nipistyksen heti',
  kunnossa(kosketuksenJalkeen), JSON.stringify(kosketuksenJalkeen));
// Panorointi toimii jumin jälkeen: yhden sormen veto siirtää karttaa.
await sivu.evaluate(() => {
  const pane = window.matkakirja.ui.svg.parentElement;
  const laheta = (tyyppi, px, py, lisa = {}) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 11, pointerType: 'touch', isPrimary: true,
    clientX: px, clientY: py, bubbles: true, cancelable: true, ...lisa,
  }));
  laheta('pointerdown', 400, 500, { buttons: 1 });
  laheta('pointermove', 300, 480, { buttons: 1 });
  laheta('pointerup', 300, 480);
});
await sivu.waitForTimeout(200);
const panoroinnin = await geometria();
vaadi('panorointi toimii jumin purun jälkeen',
  panoroinnin.panX !== kosketuksenJalkeen.panX,
  `panX ${kosketuksenJalkeen.panX} -> ${panoroinnin.panX}`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
