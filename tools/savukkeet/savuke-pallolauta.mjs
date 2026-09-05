/*
 * Savuke: PALLOLAUTA, VAIHE 1 — tasokartta pois tieltä, pallo pelin
 * lautana (omistaja 5.9.2026, Raamattu KARTTAPALLO ON PELILAUTA;
 * docs/moduulit/karttapallo.md luku 7).
 *
 * Omistajan ehto sanatarkasti: *"Kunhan vanha kartta pysyy pois tieltä
 * eikä hidasta ollenkaan uuden kartan toimintaa. Mutta jos pallo ei
 * toimi niin pidetään optio palauttaa se."*
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   PALLOLAUTA (?lauta=pallo, tallenne Ateenassa):
 *   1. svg#board on TYHJÄ: nolla lapsielementtiä (tasokartan kerrokset
 *      eivät synny, karttapallo.md luku 3).
 *   2. Laattapyramidiin ei lähde yhtään pyyntöä (julisteet/pyramidi).
 *   3. Kuori on karttaruudussa laudan tasolla: ei Sulje-nappia, ei
 *      kiinteää sijaintia, näkyvissä.
 *   4. Pallolla ovat pelin merkit: 261 kaupunkipistettä ja nappula
 *      nykyisessä kaupungissa — ei nimiä, kaaria eikä polkuja.
 *   5. Kaupungin napautus avaa kaupunkilehden (omistaja 2.9.2026:
 *      *"Kohdekaupunki avaa aina kaupunkilehden"*).
 *   6. Kamera osuu kaupunkiin ±5 %: ajon jälkeen Sofia on kotelon
 *      keskellä ja näkyvä leveys on pyydetty (±5 %).
 *   7. Matkusta avaa linssikartan: tasokartta herää (svg#board saa
 *      kerrokset), kuori piiloon; paluu tyhjentää svg:n ja näyttää pallon.
 *   8. Mittarit (raportti): tekstuurit lepotilassa (suunnitelman katto
 *      120), joutilas kehysaika p95, DOM-solmut.
 *
 *   TASOKARTTA (?lauta=kartta): täsmälleen entinen peli — svg#board
 *   piirtyy, palloa ei ole, pyramidi pyydetään.
 *
 *   VARAPOLKU (?lauta=pallo, kirjasto ei lataudu): tasokartta herää
 *   tälle istunnolle, laitteen valinta palaa kartaksi (avain poistuu),
 *   yhden rivin ilmoitus.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa — Globe.gl,
 * laattaluettelo ja laatat reititetään selaimelle täältä. Ilman
 * ämpäriä pallo ei lataudu; silloin savuke toteaa sen ja ajaa vain
 * tasokartan ja varapolun vartiot.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pallolauta.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
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
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
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
const AMPARI_TOIMII = kirjasto?.status === 200;
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — pallo ei voi latautua; ajetaan tasokartan ja varapolun vartiot');

/* Tallenne: Fogg Ateenassa, aarre löydetty (Matkusta näkyvissä). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Uusi sivu: tallenne paikallaan, ämpäri reititetty (tai katkaistu). */
async function avaaSivu({ lauta, ampari = true, reducedMotion = 'no-preference' }) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion,
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const pyynnot = { pyramidi: 0, pallolaatat: 0, kirjasto: 0, virheet: [] };
  // Sivun virheet raporttiin: hiljainen kaatuminen näkyisi vain
  // "pallo ei avautunut" -rivinä.
  sivu.on('pageerror', (e) => pyynnot.virheet.push(String(e.message ?? e)));
  sivu.on('console', (m) => { if (m.type() === 'error') pyynnot.virheet.push(m.text()); });
  sivu.on('request', (r) => {
    const url = r.url();
    if (url.includes('julisteet/pyramidi')) pyynnot.pyramidi += 1;
    if (url.includes('julisteet/pallo/laatat')) pyynnot.pallolaatat += 1;
    if (url.includes('vendor/globe.gl')) pyynnot.kirjasto += 1;
  });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const url = route.request().url();
    if (!ampari && url.includes('vendor/globe.gl')) { route.abort(); return; }
    const vastaus = await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
  });
  await sivu.goto(`${osoite}?lauta=${lauta}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  return { ctx, sivu, pyynnot };
}

/* ================= PALLOLAUTA ================= */
if (AMPARI_TOIMII) {
  const { ctx, sivu, pyynnot } = await avaaSivu({ lauta: 'pallo' });
  const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  vaadi('pallolauta avautuu ?lauta=pallo-parametrilla', auki, 'ui.pallolauta ei syntynyt 45 s:ssa');
  if (pyynnot.virheet.length) tieto('sivun virheet', pyynnot.virheet.slice(0, 5).join(' | '));
  if (auki) {
    // Laatat ehtivät tulla, jotta pyramidin (ei-)pyynnöt ja tekstuurit ovat luettavissa.
    await sivu.waitForTimeout(4000);
    const tila = await sivu.evaluate(() => {
      const { ui } = window.matkakirja;
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      const pallo = ui.pallonInstanssi;
      const kotelo = kuori?.querySelector('.pallo-kotelo');
      const pos = getComputedStyle(kuori).position;
      const svgLapsia = document.querySelectorAll('#board *').length;
      const pisteet = pallo?.pointsData?.() ?? [];
      const htmlt = pallo?.htmlElementsData?.() ?? [];
      const oma = ui.game.cityOf();
      return {
        svgLapsia,
        lepotila: ui.kartta.lepotila,
        kuoriRuudussa: kuori?.parentElement === ui.mapPane,
        kuoriNakyy: Boolean(kuori) && !kuori.hidden && getComputedStyle(kuori).display !== 'none',
        pos,
        sulje: Boolean(kuori?.querySelector('.pallo-sulje')),
        pisteita: pisteet.length,
        kaydyt: pisteet.filter((p) => p.kayty).length,
        nappuloita: htmlt.length,
        nappulaOmassa: htmlt.length === 1 && oma && Math.abs(htmlt[0].lat - ui.pallolauta.kaupunki(oma.id).lat) < 1e-9,
        tekstuurit: pallo?.renderer?.()?.info?.memory?.textures ?? null,
        dom: document.querySelectorAll('*').length,
        kotelo: kotelo ? { w: kotelo.clientWidth, h: kotelo.clientHeight } : null,
        lehti: Boolean(ui.arrivalDialog?.open),
      };
    });
    vaadi('1. svg#board on tyhjä pallolaudalla', tila.svgLapsia === 0, `${tila.svgLapsia} elementtiä`);
    vaadi('   kartta on lepotilassa', tila.lepotila === true);
    vaadi('2. laattapyramidiin ei lähde pyyntöjä', pyynnot.pyramidi === 0, `${pyynnot.pyramidi} pyyntöä`);
    vaadi('3. kuori on karttaruudussa laudan tasolla, ilman Sulje-nappia',
      tila.kuoriRuudussa && tila.kuoriNakyy && tila.pos === 'absolute' && !tila.sulje,
      JSON.stringify({ ruudussa: tila.kuoriRuudussa, nakyy: tila.kuoriNakyy, pos: tila.pos, sulje: tila.sulje }));
    vaadi('4. pallolla 261 kaupunkipistettä ja nappula nykyisessä kaupungissa',
      tila.pisteita === 261 && tila.nappuloita === 1 && tila.nappulaOmassa,
      JSON.stringify({ pisteita: tila.pisteita, nappuloita: tila.nappuloita, omassa: tila.nappulaOmassa }));
    tieto('käydyiksi merkittyjä pisteitä', tila.kaydyt);
    tieto('pallolaattapyyntöjä', pyynnot.pallolaatat);
    tieto('tekstuureja (katto 120)', tila.tekstuurit);
    tieto('DOM-solmuja', tila.dom);
    tieto('kotelo', JSON.stringify(tila.kotelo));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-ateena.png') });

    /* Joutilas kehysaika: rAF-välit sekunnin ajan. */
    const kehys = await sivu.evaluate(() => new Promise((ok) => {
      const valit = [];
      let edellinen = performance.now();
      const askel = (t) => {
        valit.push(t - edellinen); edellinen = t;
        if (valit.length < 60) requestAnimationFrame(askel);
        else { valit.sort((a, b) => a - b); ok({ mediaani: valit[30], p95: valit[57] }); }
      };
      requestAnimationFrame(askel);
    }));
    tieto('joutilas kehys mediaani / p95 (ms)', `${kehys.mediaani.toFixed(1)} / ${kehys.p95.toFixed(1)}`);

    /* 5. Napautus nykyiseen kaupunkiin avaa lehden. */
    const lehti = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const tulos = ui.pallolauta.napautaKaupunki('ateena');
      await new Promise((r) => setTimeout(r, 800));
      return { tulos, auki: Boolean(ui.arrivalDialog?.open), lehti: ui.lehtitila?.arrivalShownFor ?? null };
    });
    vaadi('5. kaupungin napautus pallolla avaa kaupunkilehden', lehti.tulos && lehti.auki && lehti.lehti === 'ateena',
      JSON.stringify(lehti));
    // Lehti kiinni ennen kameraa (pallo lepää lehden takana).
    await sivu.evaluate(() => { window.matkakirja.ui.arrivalDialog?.close(); });
    await sivu.waitForTimeout(300);

    /* 6. Kamera osuu kaupunkiin ±5 %. */
    const kamera = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const sofia = ui.game.board.cityById.get('sofia');
      const alku = performance.now();
      const perilla = await ui.pallolauta.kamera.ajaKamera({ x: sofia.x, y: sofia.y, leveys: 240 }, { kesto: 500 });
      const kesto = performance.now() - alku;
      const pallo = ui.pallonInstanssi;
      const k = ui.pallolauta.kaupunki('sofia');
      const p = pallo.getScreenCoords(k.lat, k.lon, 0);
      const kotelo = ui.pallolauta.kuori.querySelector('.pallo-kotelo');
      const tila = ui.pallolauta.kamera.kameranTila();
      const alue = ui.nakyvaAlue();
      return {
        perilla, kesto, dx: p.x - kotelo.clientWidth / 2, dy: p.y - kotelo.clientHeight / 2,
        leveys: tila.leveys, korkeus: tila.korkeus, w: kotelo.clientWidth,
        alueKeskella: Math.abs(alue.x + alue.w / 2 - sofia.x) < 1 && Math.abs(alue.y + alue.h / 2 - sofia.y) < 1,
      };
    });
    const raja = kamera.w * 0.05;
    vaadi('6. kamera-ajo osuu Sofiaan ±5 % kotelon leveydestä',
      kamera.perilla && Math.abs(kamera.dx) <= raja && Math.abs(kamera.dy) <= raja,
      `dx ${kamera.dx.toFixed(1)} dy ${kamera.dy.toFixed(1)} raja ${raja.toFixed(1)} perillä ${kamera.perilla}`);
    vaadi('   näkyvä leveys on pyydetty 240 ±5 % ja nakyvaAlue keskittyy kaupunkiin',
      Math.abs(kamera.leveys - 240) <= 12 && kamera.alueKeskella,
      `leveys ${kamera.leveys.toFixed(1)} korkeus ${kamera.korkeus.toFixed(3)} keskellä ${kamera.alueKeskella}`);
    vaadi('   ajo on animoitu (kesto ≥ 400 ms)', kamera.kesto >= 400, `${kamera.kesto.toFixed(0)} ms`);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-sofia.png') });

    /* 7. Matkusta → linssikartta → paluu. */
    const pyramidiEnnen = pyynnot.pyramidi;
    const linssikartta = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const avattu = ui.avaaLinssikartta();
      await new Promise((r) => setTimeout(r, 600));
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      const auki = {
        avattu,
        svgLapsia: document.querySelectorAll('#board *').length,
        kuoriPiilossa: Boolean(kuori?.hidden),
        luokka: document.body.classList.contains('linssikartta-auki'),
        lepotila: ui.kartta.lepotila,
        palaaNakyy: getComputedStyle(document.querySelector('.linssikartta-palaa')).display !== 'none',
      };
      const suljettu = ui.suljeLinssikartta();
      await new Promise((r) => setTimeout(r, 300));
      return {
        auki,
        suljettu,
        svgLapsia: document.querySelectorAll('#board *').length,
        kuoriNakyy: !kuori?.hidden,
        lepotila: ui.kartta.lepotila,
        luokka: document.body.classList.contains('linssikartta-auki'),
      };
    });
    vaadi('7. Matkusta-tie: linssikartta herättää tasokartan ja piilottaa pallon',
      linssikartta.auki.avattu && linssikartta.auki.svgLapsia > 100 && linssikartta.auki.kuoriPiilossa
        && linssikartta.auki.luokka && linssikartta.auki.lepotila === false && linssikartta.auki.palaaNakyy,
      JSON.stringify(linssikartta.auki));
    vaadi('   paluu pallolle tyhjentää svg#boardin ja näyttää pallon',
      linssikartta.suljettu && linssikartta.svgLapsia === 0 && linssikartta.kuoriNakyy
        && linssikartta.lepotila === true && !linssikartta.luokka,
      JSON.stringify(linssikartta));
    tieto('pyramidipyyntöjä linssikartan avauksesta', pyynnot.pyramidi - pyramidiEnnen);
    // Pallolaudalle ei tullut ajovirheitä konsoliin? (kerätään raportiksi)
  }
  await ctx.close();
}

/* ================= TASOKARTTA ENNALLAAN ================= */
{
  const { ctx, sivu, pyynnot } = await avaaSivu({ lauta: 'kartta', ampari: AMPARI_TOIMII });
  await sivu.waitForTimeout(3000);
  const tila = await sivu.evaluate(() => ({
    svgLapsia: document.querySelectorAll('#board *').length,
    pallo: Boolean(document.querySelector('.pallo-kuori.pallolauta')),
    lepotila: window.matkakirja.ui.kartta.lepotila,
    pallolauta: Boolean(window.matkakirja.ui.pallolauta),
  }));
  vaadi('tasokartta: ?lauta=kartta piirtää laudan eikä avaa palloa',
    tila.svgLapsia > 100 && !tila.pallo && tila.lepotila === false && !tila.pallolauta, JSON.stringify(tila));
  if (AMPARI_TOIMII) vaadi('tasokartta: laattapyramidi pyydetään kuten ennen', pyynnot.pyramidi > 0, `${pyynnot.pyramidi} pyyntöä`);
  vaadi('tasokartta: kirjastoa ei ladata', pyynnot.kirjasto === 0, `${pyynnot.kirjasto}`);
  if (pyynnot.virheet.length) tieto('sivun virheet', pyynnot.virheet.slice(0, 5).join(' | '));
  await ctx.close();
}

/* ================= VARAPOLKU ================= */
{
  const { ctx, sivu, pyynnot } = await avaaSivu({ lauta: 'pallo', ampari: false });
  // Kirjasto ei lataudu → kartta herää. Odotetaan kunnes svg#board täyttyy.
  const heraa = await sivu.waitForFunction(() => document.querySelectorAll('#board *').length > 100, null, { timeout: 30000 })
    .then(() => true).catch(() => false);
  const tila = await sivu.evaluate(() => ({
    lepotila: window.matkakirja.ui.kartta.lepotila,
    pallolauta: Boolean(window.matkakirja.ui.pallolauta),
    kuori: Boolean(document.querySelector('.pallo-kuori.pallolauta')),
    avain: localStorage.getItem('matkakirja-lauta'),
    ilmoitus: [...document.querySelectorAll('.event-toast')].some((t) => /pelataan kartalla/.test(t.textContent)),
  }));
  vaadi('varapolku: ilman kirjastoa peli putoaa tasokartalle tälle istunnolle',
    heraa && tila.lepotila === false && !tila.pallolauta && !tila.kuori, JSON.stringify(tila));
  vaadi('varapolku: laitteen valintaa ei kirjoiteta (avain pysyy poissa) ja pelaaja saa yhden rivin',
    tila.avain === null && tila.ilmoitus, JSON.stringify(tila));
  if (pyynnot.virheet.length) tieto('sivun virheet', pyynnot.virheet.slice(0, 5).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
