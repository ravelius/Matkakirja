/*
 * Savuke: laudalla makaava noppa ja hyppivä pelinappula.
 *
 * Omistajan tilaukset #98 ja #100. Vartiot:
 *   1. Noppa asuu kartan SIIRTOKUORESSA (.kartta-kuori) ja sen
 *      lepopaikka on kirjattu LAUDAN koordinaatteina.
 *   2. Panorointi kuljettaa nopan mukanaan: se liikkuu ruudulla
 *      täsmälleen yhtä paljon kuin kartta, eikä laudan kohta muutu.
 *   3. Zoomaus skaalaa nopan samassa suhteessa kuin kartan.
 *   4. Nappula hyppii: paraabelikaari nousee ja palaa, ja koodilla
 *      piirretty varjo kutistuu ja haalenee laella.
 *   5. Nappula on hahmo, jolla on mitat: puinen kartionappula
 *      (koodilla piirretty polku) tai vanha tinaherra-kuva.
 *   6. Uuteen kaupunkiin saavuttaessa noppa häipyy pois.
 *   7. Nappula seisoo kaupungin laatalla PEITTÄMÄTTÄ sitä.
 *
 * MIKSI VARTIO: kaikki kolme takeista (ankkurointi, skaalaus,
 * häivytys) ovat sellaisia, jotka rikkoutuvat hiljaa. Väärään
 * vanhempaan luotu kerros näyttää levossa täsmälleen oikealta ja
 * paljastuu vasta panoroitaessa, ja hypyn kaari katoaa jos joku
 * palauttaa CSS-siirtymän liikkuvalle nappulalle.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(e.message));
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2000);

/** Nopan tila: kerroksen isäntä, laudan kohta, ruutupaikka ja koko. */
const noppa = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kerros = document.querySelector('.die-layer');
  const kuutio = document.querySelector('.board-die');
  const r = kuutio?.getBoundingClientRect();
  const pr = ui.mapPane.getBoundingClientRect();
  return {
    isanta: kerros?.parentElement?.className ?? null,
    piilossa: kerros?.hidden ?? null,
    haipyy: kerros?.classList.contains('noppa-haipyy') ?? null,
    kartalla: ui.noppaKartalla
      ? { x: +ui.noppaKartalla.x.toFixed(2), y: +ui.noppaKartalla.y.toFixed(2) }
      : null,
    leveys: r ? +r.width.toFixed(2) : null,
    ruudulla: r ? { x: +(r.left - pr.left).toFixed(1), y: +(r.top - pr.top).toFixed(1) } : null,
    skaala: ui.zoomSkaala,
  };
});

/** Pelaajan kaupungin ruutupaikka: mittatikku kartan omalle liikkeelle. */
const kaupunki = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const c = ui.game.cityOf();
  const p = ui.kartta.mapToPane({ x: c.x, y: c.y });
  return { x: +p.x.toFixed(1), y: +p.y.toFixed(1) };
});

await sivu.evaluate(async () => { await window.matkakirja.ui.animateDie(5); });
await sivu.waitForTimeout(300);
const a = await noppa(); const ka = await kaupunki();
vaadi('1a noppa asuu kartan siirtokuoressa', a.isanta === 'kartta-kuori', String(a.isanta));
vaadi('1b lepopaikka on laudan koordinaateissa', a.kartalla !== null);

// --- 2. panorointi kuljettaa nopan mukanaan ---
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.asetaPan((ui.panX ?? 0) - 90, (ui.panY ?? 0) - 40);
});
await sivu.waitForTimeout(400);
const b = await noppa(); const kb = await kaupunki();
const dNoppa = { x: b.ruudulla.x - a.ruudulla.x, y: b.ruudulla.y - a.ruudulla.y };
const dKartta = { x: kb.x - ka.x, y: kb.y - ka.y };
vaadi('2a kartta liikkui', Math.abs(dKartta.x) > 40, JSON.stringify(dKartta));
vaadi('2b noppa liikkui saman verran kuin kartta',
  Math.abs(dNoppa.x - dKartta.x) < 1.5 && Math.abs(dNoppa.y - dKartta.y) < 1.5,
  JSON.stringify({ dNoppa, dKartta }));
vaadi('2c laudan kohta ei muuttunut panoroidessa',
  Math.abs(b.kartalla.x - a.kartalla.x) < 0.01 && Math.abs(b.kartalla.y - a.kartalla.y) < 0.01,
  JSON.stringify({ ennen: a.kartalla, jalkeen: b.kartalla }));

// --- 3. zoomaus skaalaa nopan kartan mukana ---
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(1800);
const c = await noppa();
const suhdeKartta = c.skaala / b.skaala;
const suhdeNoppa = c.leveys / b.leveys;
vaadi('3a kartta zoomasi', suhdeKartta > 1.2, String(suhdeKartta));
vaadi('3b nopan koko skaalautui samassa suhteessa',
  Math.abs(suhdeNoppa - suhdeKartta) < 0.02 * suhdeKartta,
  JSON.stringify({ suhdeKartta, suhdeNoppa }));
vaadi('3c laudan kohta ei muuttunut zoomatessa',
  Math.abs(c.kartalla.x - a.kartalla.x) < 0.01 && Math.abs(c.kartalla.y - a.kartalla.y) < 0.01,
  JSON.stringify({ ennen: a.kartalla, jalkeen: c.kartalla }));

// --- 4. nappula hyppii, varjo irtoaa laella ---
const hyppy = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const p = g.player;
  const board = g.board;
  const eid = [...board.adj.get(p.pos.city)][0];
  const e = board.edgeById.get(eid);
  const alku = { ...p.pos };
  const askeleet = [];
  for (let i = 1; i <= Math.min(3, e.steps); i++) {
    askeleet.push({ type: 'edge', edge: eid, idx: e.a === p.pos.city ? i : e.steps - i });
  }
  const nayte = [];
  const lupaus = ui.animatePawn(p, alku, askeleet, 240);
  const kello = setInterval(() => {
    const hahmo = document.querySelector('.pawn-moving .pawn-hahmo');
    const varjo = document.querySelector('.pawn-moving .pawn-varjo');
    if (!hahmo) return;
    const m = /translate\(0,(-?[\d.]+)\)/.exec(hahmo.getAttribute('transform') ?? '');
    const s = /scale\(([\d.]+)\)/.exec(varjo?.getAttribute('transform') ?? '');
    nayte.push({ k: m ? +m[1] : 0, v: s ? +s[1] : 1, o: +(varjo?.style.opacity || 1) });
  }, 16);
  await lupaus;
  clearInterval(kello);
  const korkeudet = nayte.map((n) => -n.k);
  return {
    naytteita: nayte.length,
    maxKorkeus: korkeudet.length ? Math.max(...korkeudet) : 0,
    minKorkeus: korkeudet.length ? Math.min(...korkeudet) : 99,
    varjoMin: nayte.length ? Math.min(...nayte.map((n) => n.v)) : 1,
    peittoMin: nayte.length ? Math.min(...nayte.map((n) => n.o)) : 1,
  };
});
vaadi('4a nappula nousi ilmaan', hyppy.maxKorkeus > 5, JSON.stringify(hyppy));
vaadi('4b nappula palasi laudan pintaan', hyppy.minKorkeus < 1, String(hyppy.minKorkeus));
vaadi('4c varjo kutistui hypyn laella', hyppy.varjoMin < 0.85, String(hyppy.varjoMin));
vaadi('4d varjo haaleni hypyn laella', hyppy.peittoMin < 0.7, String(hyppy.peittoMin));

/*
 * --- 5. nappulalla on hahmo, ja se seisoo jaloillaan ---
 *
 * VÄRIÄ EI LUKITA TÄHÄN. Nappula oli tilauksessa #100 tinaherra-webp,
 * 27.8.2026 lähtien koodilla piirretty valkoinen kartionappula ja
 * 28.8.2026 lähtien saman muodon puunvärinen versio (js/ui.js
 * NAPPULA_TYYLI). Vartioitava asia ei missään näistä ole tiedostonimi
 * eikä sävy vaan se, että hahmo on OLEMASSA, MITALLINEN ja ANKKUROITU
 * JALKAPISTEESTÄÄN kaupunkiin — juuri ne rikkoutuvat hiljaa, jos hahmon
 * piirto vaihtuu. Väriläiskä ei tätä läpäisisi: sillä ei ole
 * jalkapistettä nappulan alareunassa.
 *
 * MITTASUHDE SEN SIJAAN LUKITAAN (5e). Omistajan tilaus 28.8.2026 oli
 * *"matalampi ... nappula saa olla pienempi"*, ja siluetti madallettiin
 * 25,9:stä 18,1:een leveyden pysyessä lähes ennallaan (13,2 -> 10).
 * Suhde 1,81 on juuri se, mikä tilauksessa muuttui; jos joku palauttaa
 * vanhat mitat, hahmo on taas kaupungin laatan kokoinen.
 */
const kuva = await sivu.evaluate(() => {
  const i = document.querySelector('.pawn .pawn-kuva');
  const p = document.querySelector('.pawn');
  const r = i?.getBoundingClientRect();
  const pr = p?.getBoundingClientRect();
  return {
    onHahmo: Boolean(i),
    tagi: i?.tagName ?? null,
    leveys: r ? +r.width.toFixed(2) : 0,
    korkeus: r ? +r.height.toFixed(2) : 0,
    // Hahmon alareunan etäisyys koko nappularyhmän alareunasta: jalusta
    // on ryhmän pohjalla (varjo ja vuororengas ovat sen tasossa).
    jalkaEro: r && pr ? +(pr.bottom - r.bottom).toFixed(2) : null,
  };
});
vaadi('5a nappulalla on hahmo', kuva.onHahmo === true, JSON.stringify(kuva));
vaadi('5b hahmo on mitallinen', kuva.leveys > 4 && kuva.korkeus > 8, JSON.stringify(kuva));
vaadi('5c hahmo on pystymallinen', kuva.korkeus > kuva.leveys, JSON.stringify(kuva));
vaadi('5d hahmo seisoo jaloillaan laudan pinnassa',
  kuva.jalkaEro !== null && Math.abs(kuva.jalkaEro) < 0.6 * kuva.korkeus,
  JSON.stringify(kuva));
const suhde = kuva.leveys > 0 ? kuva.korkeus / kuva.leveys : 0;
vaadi('5e siluetti on matala nappula (korkeus/leveys 18,1/10 = 1,81)',
  suhde > 1.68 && suhde < 1.95, `${suhde.toFixed(3)} — ${JSON.stringify(kuva)}`);

// --- 6. uuteen kaupunkiin saavuttaessa noppa häipyy ---
const saapuminen = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const p = g.player;
  const board = g.board;
  const eid = p.pos.type === 'edge' ? p.pos.edge : [...board.adj.get(p.pos.city)][0];
  const e = board.edgeById.get(eid);
  const lupaus = ui.animatePawn(p, { ...p.pos }, [{ type: 'city', city: e.b }], 240);
  await new Promise((r) => setTimeout(r, 400));
  const kesken = { haipyy: document.querySelector('.die-layer')?.classList.contains('noppa-haipyy') };
  await lupaus;
  await new Promise((r) => setTimeout(r, 700));
  return {
    kesken,
    piilossa: document.querySelector('.die-layer')?.hidden,
    dieThrown: ui.dieThrown,
    kartalla: ui.noppaKartalla,
  };
});
vaadi('6a noppa alkoi häipyä kaupunkiin saavuttaessa', saapuminen.kesken.haipyy === true);
vaadi('6b noppa on lopulta piilossa', saapuminen.piilossa === true);
vaadi('6c nopan muisti nollattiin',
  saapuminen.dieThrown === false && !saapuminen.kartalla);

/*
 * --- 7. nappula seisoo laatalla peittämättä sitä ---
 *
 * OMISTAJAN TILAUS 28.8.2026: *"sen alta saisi näkyä kaupungin laatta
 * (nyt ei näy ollenkaan). eli nappula saa olla pienempi"*. Laatta oli
 * piilotettu kokonaan nappulan kohdalta (css .nappulan-alla), koska
 * silloinen hahmo oli lähes laatan levyinen; nyt piilotus koskee enää
 * lentokoneen merkkiä ja sykekehää, ja nappula on kutistettu niin, että
 * laatan reuna kiertää sen joka suunnasta.
 *
 * VARTIO ON GEOMETRINEN, EI LUOKKALISTA. Sääntö voi rikkoutua kahdesta
 * suunnasta — joku palauttaa piilotuksen, tai joku kasvattaa nappulaa,
 * varjoa tai vuororengasta niin että laatta jää taas alle. Molemmat
 * näkyvät samassa mitassa: koko nappularyhmän (hahmo + varjo +
 * vuororengas) on mahduttava laatan leveyteen, ja laatan on oltava
 * piirrossa mukana.
 *
 * NAPPULA VIEDÄÄN VARMUUDEN VUOKSI KAUPUNKIIN. Kohdan 4 hyppy jätti sen
 * reitin varrelle, eikä reitin varrella ole laattaa lainkaan.
 */
const laatalla = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const g = ui.game;
  const p = g.player;
  const board = g.board;
  const kohde = p.pos.type === 'city' ? p.pos.city : board.edgeById.get(p.pos.edge).b;
  p.pos = { type: 'city', city: kohde };
  ui.movingPlayerId = null;
  ui.render();
  const c = g.cityOf();
  const laatta = document.querySelector(
    `.city[data-kaupunki="${c.id}"], .city-start[data-kaupunki="${c.id}"]`);
  const ryhma = document.querySelector('.pawn');
  const hahmo = document.querySelector('.pawn .pawn-kuva');
  const lr = laatta?.getBoundingClientRect();
  const rr = ryhma?.getBoundingClientRect();
  const hr = hahmo?.getBoundingClientRect();
  return {
    laattaPiirretty: Boolean(laatta),
    laattaNakyy: laatta ? getComputedStyle(laatta).display !== 'none' : false,
    laatta: lr ? +lr.width.toFixed(2) : 0,
    ryhma: rr ? +rr.width.toFixed(2) : 0,
    hahmo: hr ? +hr.width.toFixed(2) : 0,
    // Paljonko laattaa jää nappularyhmän molemmin puolin näkyviin.
    vasen: lr && rr ? +(rr.left - lr.left).toFixed(2) : null,
    oikea: lr && rr ? +(lr.right - rr.right).toFixed(2) : null,
  };
});
vaadi('7a kaupungin laatta on piirretty ja näkyvissä nappulan alla',
  laatalla.laattaPiirretty && laatalla.laattaNakyy, JSON.stringify(laatalla));
vaadi('7b laatta on selvästi hahmoa leveämpi',
  laatalla.hahmo > 0 && laatalla.laatta > laatalla.hahmo * 1.6, JSON.stringify(laatalla));
vaadi('7c koko nappularyhmä varjoineen mahtuu laatan leveyteen',
  laatalla.vasen > 0.5 && laatalla.oikea > 0.5, JSON.stringify(laatalla));

vaadi('8 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
