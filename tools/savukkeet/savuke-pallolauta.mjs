/*
 * Savuke: PALLOLAUTA, VAIHEET 1–2 — tasokartta pois tieltä, pallo pelin
 * lautana, siirrot pallolla (omistaja 5.9.2026, Raamattu KARTTAPALLO ON
 * PELILAUTA; docs/moduulit/karttapallo.md luku 7).
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
 *   7. Linssin tie avaa linssikartan: tasokartta herää (svg#board saa
 *      kerrokset), kuori piiloon; paluu tyhjentää svg:n ja näyttää pallon.
 *   Mittarit (raportti): tekstuurit lepotilassa (suunnitelman katto
 *      120), joutilas kehysaika p95, DOM-solmut.
 *
 *   VAIHE 2, SIIRROT PALLOLLA (sama sivu):
 *   8. Liiku EI avaa linssikarttaa: pallo jää laudaksi, svg#board tyhjä;
 *      naapurireitit ilmestyvät pallolle (pathsData = Ateenan naapurit)
 *      ja katoavat, kun liuku suljetaan.
 *   9. Nopanheitto pallolla: siirtovaihe, noppa on kuoressa pallon
 *      päällä, kohteet ovat H-merkkejä (htmlElementsData ja DOM =
 *      moveOptions), nappula paikallaan, reitit näkyvissä.
 *  10. Siirto pallolla: kohteen napautus liikuttaa nappulan
 *      (.pawn-moving nähdään) ja nappula päätyy kohteeseen — datum
 *      kohteen asteissa, elementin jalka ±5 % kotelon leveydestä pallon
 *      pinnan pisteestä; svg#board pysyy tyhjänä koko siirron ajan,
 *      pyramidipyyntöjä 0, kohteet poissa perillä.
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
  // Palvelutyöntekijä estetään: sw.js säilöö vendor/-kirjastot omaan
  // koriinsa (VENDORCACHE, 5.9.2026), ja workerin fetch ohittaa
  // Playwrightin page.routen — Globe.gl:n reititys ei muuten näkisi
  // pyyntöä (sama syy kuin savuke-siirtokoreografiassa).
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion, serviceWorkers: 'block',
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
    vaadi('7. linssin tie: linssikartta herättää tasokartan ja piilottaa pallon',
      linssikartta.auki.avattu && linssikartta.auki.svgLapsia > 100 && linssikartta.auki.kuoriPiilossa
        && linssikartta.auki.luokka && linssikartta.auki.lepotila === false && linssikartta.auki.palaaNakyy,
      JSON.stringify(linssikartta.auki));
    vaadi('   paluu pallolle tyhjentää svg#boardin ja näyttää pallon',
      linssikartta.suljettu && linssikartta.svgLapsia === 0 && linssikartta.kuoriNakyy
        && linssikartta.lepotila === true && !linssikartta.luokka,
      JSON.stringify(linssikartta));
    tieto('pyramidipyyntöjä linssikartan avauksesta', pyynnot.pyramidi - pyramidiEnnen);

    /* ================= VAIHE 2: SIIRROT PALLOLLA ================= */

    /* 8. Liiku ei avaa linssikarttaa; naapurireitit ilmestyvät pallolle. */
    const liiku = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      ui.vaihdaLiuku();
      await new Promise((r) => setTimeout(r, 400));
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      const tila = {
        liukuAuki: ui.liukuAuki,
        linssikartta: Boolean(ui.linssikartta),
        kuoriNakyy: !kuori?.hidden,
        lepotila: ui.kartta.lepotila,
        svgLapsia: document.querySelectorAll('#board *').length,
        polkuja: pallo.pathsData().length,
        naapureita: (game.board.adj.get('ateena') ?? []).length,
        helmia: pallo.pointsData().filter((p) => p.laji === 'helmi').length,
      };
      ui.suljeLiuku();
      await new Promise((r) => setTimeout(r, 300));
      tila.polkujaSuljettuna = pallo.pathsData().length;
      return tila;
    });
    vaadi('8. Liiku ei avaa linssikarttaa: pallo jää laudaksi, svg#board tyhjä',
      liiku.liukuAuki && !liiku.linssikartta && liiku.kuoriNakyy && liiku.lepotila && liiku.svgLapsia === 0,
      JSON.stringify(liiku));
    vaadi('   naapurireitit pallolla liu\'un ollessa auki (pathsData = Ateenan naapurit), pois suljettuna',
      liiku.polkuja === liiku.naapureita && liiku.naapureita > 0 && liiku.polkujaSuljettuna === 0,
      JSON.stringify(liiku));
    tieto('askelhelmiä naapurireiteillä', liiku.helmia);

    /* 9. Nopanheitto pallolla: noppa kuoressa pallon päällä, kohteet H-merkkeinä. */
    const heitto = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      clearTimeout(ui.automaattiheittoAjastin);
      ui.automaattiheittoAjastin = null;
      game.autoTravel = false;
      const valinta = game.actionTravel('land');
      if (!valinta.ok) return { virhe: valinta.error };
      ui.doRoll();
      // Nopan animaatio + sovitus: odotetaan kunnes run on ohi.
      for (let i = 0; i < 100 && ui.busy; i++) await new Promise((r) => setTimeout(r, 50));
      await new Promise((r) => setTimeout(r, 500));
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      const kohteet = game.moveOptions();
      const htmlt = pallo.htmlElementsData();
      return {
        vaihe: game.phase,
        die: game.die,
        noppaKuoressa: ui.boardDie?.layer?.parentElement === kuori,
        dieThrown: ui.dieThrown,
        kohteita: kohteet.length,
        kohdeMerkkeja: htmlt.filter((d) => d.laji === 'kohde').length,
        kohdeDom: document.querySelectorAll('.pallolauta-kohde').length,
        nappuloita: htmlt.filter((d) => d.laji === 'nappula').length,
        polkuja: pallo.pathsData().length,
        svgLapsia: document.querySelectorAll('#board *').length,
      };
    });
    vaadi('9. nopanheitto pallolla: siirtovaihe, noppa kuoressa pallon päällä',
      heitto.vaihe === 'move' && heitto.noppaKuoressa && heitto.dieThrown, JSON.stringify(heitto));
    vaadi('   kohteet H-merkkeinä (htmlElementsData ja DOM = moveOptions), nappula paikallaan, reitit näkyvissä',
      heitto.kohteita > 0 && heitto.kohdeMerkkeja === heitto.kohteita && heitto.kohdeDom === heitto.kohteita
        && heitto.nappuloita === 1 && heitto.polkuja > 0 && heitto.svgLapsia === 0,
      JSON.stringify(heitto));
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-heitto.png') });

    /* 10. Siirto pallolla: kohteen napautus → nappula hyppii perille. */
    const pyramidiEnnenSiirtoa = pyynnot.pyramidi;
    const siirto = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      const kohde = game.moveOptions().find((o) => o.city) ?? game.moveOptions()[0];
      if (!kohde) return { virhe: 'ei kohteita' };
      const kohdeKaupunki = kohde.city?.id ?? null;
      const kohdePos = kohde.pos;
      // Kohteen napautus pallolla: sama polku kuin sormella (lähin kohde).
      const napautettu = ui.pallolauta.napautaKohde(kohde.key);
      const alku = performance.now();
      let svgEnintaan = 0;
      let liikkuvaNahtiin = false;
      let liikkuvaLuokka = null;
      let lepoNappuloitaLiikkeessa = 0;
      for (;;) {
        svgEnintaan = Math.max(svgEnintaan, document.querySelectorAll('#board *').length);
        const liikkuva = document.querySelector('.pawn-moving');
        if (liikkuva) {
          liikkuvaNahtiin = true;
          liikkuvaLuokka = liikkuva.className;
          // Paikallaan oleva nappula on piilossa liikkeen ajan (pelaajan id on 0).
          lepoNappuloitaLiikkeessa = Math.max(lepoNappuloitaLiikkeessa,
            pallo.htmlElementsData().filter((d) => d.laji === 'nappula').length);
        }
        if (liikkuvaNahtiin && !liikkuva && !ui.busy) break;
        if (performance.now() - alku > 25000) break;
        await new Promise((r) => setTimeout(r, 40));
      }
      await new Promise((r) => setTimeout(r, 600));
      const htmlt = pallo.htmlElementsData();
      const nappula = htmlt.find((d) => d.laji === 'nappula');
      const kohta = kohdePos ? ui.pallolauta.asteet(
        (await import('./js/rules.js')).pixelOf(game.board, kohdePos),
      ) : null;
      const el = document.querySelector('.pallolauta-nappula:not(.pallolauta-liikkuva)');
      const kotelo = ui.pallolauta.kotelo;
      const kr = kotelo.getBoundingClientRect();
      const er = el?.getBoundingClientRect();
      const odotettu = kohta ? pallo.getScreenCoords(kohta.lat, kohta.lon, 0.004) : null;
      return {
        napautettu,
        kesto: Math.round(performance.now() - alku),
        liikkuvaNahtiin,
        liikkuvaLuokka,
        lepoNappuloitaLiikkeessa,
        svgEnintaan,
        perilla: game.player.pos,
        kohdeKaupunki,
        nappulaDatum: nappula ? { lat: nappula.lat, lng: nappula.lng } : null,
        odotettu: kohta,
        // Elementin JALKA (alareuna, keskellä) vs. pallon pinnan piste.
        dx: er && odotettu ? (er.left + er.width / 2 - kr.left) - odotettu.x : null,
        dy: er && odotettu ? (er.bottom - kr.top) - odotettu.y : null,
        leveys: kotelo.clientWidth,
        kohteitaJaljella: htmlt.filter((d) => d.laji === 'kohde').length,
        vaihe: game.phase,
        noppaNakyy: ui.dieThrown,
      };
    });
    const raja10 = (siirto.leveys ?? 390) * 0.05;
    vaadi('10. siirto pallolla: kohteen napautus liikuttaa nappulan (liikkuva .pawn-moving nähtiin, lepo-nappula piilossa) ja se päättyy',
      siirto.napautettu && siirto.liikkuvaNahtiin && siirto.lepoNappuloitaLiikkeessa === 0 && siirto.kesto < 25000,
      JSON.stringify(siirto));
    vaadi('    nappula päätyy kohteeseen: datum kohteen asteissa, elementti ±5 % kotelosta',
      siirto.nappulaDatum && siirto.odotettu
        && Math.abs(siirto.nappulaDatum.lat - siirto.odotettu.lat) < 1e-6
        && Math.abs(siirto.nappulaDatum.lng - siirto.odotettu.lon) < 1e-6
        && siirto.dx !== null && Math.abs(siirto.dx) <= raja10 && Math.abs(siirto.dy) <= raja10,
      `dx ${siirto.dx?.toFixed?.(1)} dy ${siirto.dy?.toFixed?.(1)} raja ${raja10.toFixed(1)} datum ${JSON.stringify(siirto.nappulaDatum)} odotettu ${JSON.stringify(siirto.odotettu)}`);
    vaadi('    svg#board pysyy tyhjänä koko siirron ajan, pyramidipyyntöjä 0, kohteet poissa perillä',
      siirto.svgEnintaan === 0 && pyynnot.pyramidi - pyramidiEnnenSiirtoa === 0 && siirto.kohteitaJaljella === 0,
      JSON.stringify({ svg: siirto.svgEnintaan, pyramidi: pyynnot.pyramidi - pyramidiEnnenSiirtoa, kohteita: siirto.kohteitaJaljella }));
    tieto('siirron kesto (ms), vaihe perillä, noppa näkyy', `${siirto.kesto}, ${siirto.vaihe}, ${siirto.noppaNakyy}`);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-siirto.png') });

    /* 11. Lento pallolla: kaari (A) ja kone (D), kamera rajaukseen ja perillä kohteeseen. */
    const lento = await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      const { pixelOf } = await import('./js/rules.js');
      clearTimeout(ui.automaattiheittoAjastin);
      ui.automaattiheittoAjastin = null;
      // Takaisin Ateenaan (lentokenttä) ja rahaa lippuun; render vie kameran perään.
      game.player.pos = { type: 'city', city: 'ateena' };
      game.player.money = 600;
      game.phase = 'action';
      ui.render();
      await new Promise((r) => setTimeout(r, 1600));
      // Pelaaja valitsee lennon Matkusta-liu'usta: liuku on auki, ja
      // valitun lennon kaari piirtyy (matkareittienValinta, sama sääntö
      // kuin tasokartalla).
      if (!ui.liukuAuki) ui.vaihdaLiuku();
      const kohteet = game.airportDestinations();
      if (!kohteet.length) return { virhe: 'ei lentokohteita' };
      const dest = kohteet[0];
      const alku = performance.now();
      ui.doFly(dest);
      let koneNahtiin = false;
      let kaariaEnintaan = 0;
      let svgEnintaan = 0;
      let nappuloitaLennolla = null;
      for (;;) {
        const kone = document.querySelector('.pallolauta-kone');
        if (kone) {
          koneNahtiin = true;
          nappuloitaLennolla = pallo.htmlElementsData().filter((d) => d.laji === 'nappula').length;
        }
        kaariaEnintaan = Math.max(kaariaEnintaan, pallo.arcsData().length);
        svgEnintaan = Math.max(svgEnintaan, document.querySelectorAll('#board *').length);
        if (koneNahtiin && !kone && !ui.busy) break;
        if (performance.now() - alku > 30000) break;
        await new Promise((r) => setTimeout(r, 40));
      }
      // Perillä kamera sukeltaa kohteeseen (kotiin 1400 ms) — odotetaan sen loppu.
      await new Promise((r) => setTimeout(r, 1800));
      const city = game.board.cityById.get(dest);
      const a = ui.pallolauta.asteet(pixelOf(game.board, { type: 'city', city: dest }));
      const nappula = pallo.htmlElementsData().find((d) => d.laji === 'nappula');
      const tila = ui.pallolauta.kamera.kameranTila();
      const kotelo = ui.pallolauta.kotelo;
      const p = pallo.getScreenCoords(a.lat, a.lon, 0);
      return {
        dest,
        kesto: Math.round(performance.now() - alku),
        koneNahtiin,
        kaariaEnintaan,
        svgEnintaan,
        nappuloitaLennolla,
        perilla: game.player.pos?.city,
        nappulaKohteessa: Boolean(nappula) && Math.abs(nappula.lat - a.lat) < 1e-6 && Math.abs(nappula.lng - a.lon) < 1e-6,
        kaariaJaljella: pallo.arcsData().length,
        koneJaljella: document.querySelectorAll('.pallolauta-kone').length,
        kameraDx: p.x - kotelo.clientWidth / 2,
        kameraDy: p.y - kotelo.clientHeight / 2,
        leveys: kotelo.clientWidth,
        nakyvaLeveys: tila?.leveys,
        cityName: city?.name,
      };
    });
    if (lento.virhe) vaadi('11. lento pallolla', false, lento.virhe);
    else {
      const raja11 = lento.leveys * 0.05;
      vaadi(`11. lento pallolla (Ateena → ${lento.cityName}): kone (D) lentää, kaari (A) näkyy lennon ajan, nappula piilossa lennolla`,
        lento.koneNahtiin && lento.kaariaEnintaan >= 1 && lento.nappuloitaLennolla === 0 && lento.kesto < 30000,
        JSON.stringify(lento));
      vaadi('    perillä: nappula kohteessa, kaari ja kone poissa, kamera sukelsi kohteeseen ±5 %, svg#board tyhjä',
        lento.perilla === lento.dest && lento.nappulaKohteessa && lento.kaariaJaljella === 0 && lento.koneJaljella === 0
          && Math.abs(lento.kameraDx) <= raja11 && Math.abs(lento.kameraDy) <= raja11 && lento.svgEnintaan === 0,
        JSON.stringify(lento));
      tieto('lennon kesto (ms), näkyvä leveys perillä', `${lento.kesto}, ${lento.nakyvaLeveys?.toFixed?.(0)}`);
      if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-lento.png') });
    }
    if (pyynnot.virheet.length) tieto('sivun virheet siirron jälkeen', pyynnot.virheet.slice(-5).join(' | '));
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
