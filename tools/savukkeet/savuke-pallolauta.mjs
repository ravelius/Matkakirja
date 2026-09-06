/*
 * Savuke: PALLOLAUTA, VAIHEET 1–4 — tasokartta pois tieltä, pallo pelin
 * lautana, siirrot ja merkit pallolla, linssit pallon pinnalla (omistaja
 * 5.9.2026, Raamattu KARTTAPALLO ON PELILAUTA; docs/moduulit/karttapallo.md
 * luku 7).
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
 *   4. Pallolla ovat pelin merkit: nappula nykyisessä kaupungissa ja
 *      kaupunkipisteet VAIN nimettyjen kaupunkien kohdalla (vaihe 3,
 *      PISTE VAIN NIMEN KANSSA) — ei kaaria eikä polkuja levossa.
 *   5. Kaupungin napautus avaa kaupunkilehden (omistaja 2.9.2026:
 *      *"Kohdekaupunki avaa aina kaupunkilehden"*).
 *   6. Kamera osuu kaupunkiin ±5 %: ajon jälkeen Sofia on kotelon
 *      keskellä ja näkyvä leveys on pyydetty (±5 %).
 *   7. AALTO 1C, LINSSI PALLON PINNALLE: linssin valinta (maatiedot)
 *      piirtää maat PALLOLLE (linssit.polygonit → polygonsData) eikä
 *      avaa linssikarttaa lainkaan (karttapallo.md luku 10.1);
 *      tasokartta ei herää (svg#board tyhjä, kartta lepotilassa,
 *      pyramidipyyntöjä 0), pallo pysyy näkyvissä eikä kamera liiku;
 *      linssin sammutus purkaa polygonit ja maatiedot-tilan, ja Liiku
 *      ja lehdet toimivat linssin jälkeen. Vanha kuorivartio
 *      (linssikartta pallon päälle) oli aaltoa 1C edeltävä.
 *   Mittarit (raportti): tekstuurit lepotilassa (suunnitelman katto
 *      120), joutilas kehysaika p95, DOM-solmut.
 *
 *   VAIHE 3, MERKIT PALLOLLA (omistajan kortin vastaus 5.9.2026: nimet
 *   *"ELAVINA tekstielementteina laattojen paalla"*):
 *  12. Nimet Ateenassa ja koko pallolla: elävät H-elementit (≤ 40),
 *      laatikot eivät limity keskenään eivätkä elävien nostojen kanssa,
 *      jokaisella nimellä on piste ja pisteitä on vain nimetyillä (+ oma
 *      kaupunki); CSS2D-elementtejä ≤ 60; ilmestyminen animoitu.
 *  13. Nostot Ateenassa: Kreikan lehden merkit H-elementteinä (≤ 40),
 *      jokainen nimetty ja osumatestissä (napautettava); noston
 *      napautus avaa kortin merkin ruutupisteestä; kortin ollessa auki
 *      napautus vain sulkee. Poltetut (laatoissa) saavat R-osuman —
 *      raportoidaan, montako (pallon laatoissa ei vielä nostotasoa).
 *  14. Karttaselite toimii pallolla: kappalemäärät > 0, väripallo
 *      sytyttää valot pistekerrokseen (laji valo) ja OFF sammuttaa.
 *
 *   VAIHE 2, SIIRROT PALLOLLA (sama sivu):
 *   8. Liiku EI avaa linssikarttaa: pallo jää laudaksi, svg#board tyhjä;
 *      naapurireitit ilmestyvät pallolle (pathsData = 2 × naapurit:
 *      musteviiva ja sen alla vaalea varjo)
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
      // Ladonta levossa on jo ajettu (4 s); ajetaan vielä kerran, jotta
      // mittaus ei riipu lepoajastimen hetkestä.
      ui.pallolauta.ladoHeti();
      const pisteet = pallo?.pointsData?.() ?? [];
      const htmlt = pallo?.htmlElementsData?.() ?? [];
      const oma = ui.game.cityOf();
      const nappulat = htmlt.filter((d) => d.laji === 'nappula');
      const nimetyt = new Set([...ui.pallolauta.nimet.nimetyt(), oma?.id]);
      const kaupunkipisteet = pisteet.filter((p) => !p.laji);
      return {
        svgLapsia,
        lepotila: ui.kartta.lepotila,
        kuoriRuudussa: kuori?.parentElement === ui.mapPane,
        kuoriNakyy: Boolean(kuori) && !kuori.hidden && getComputedStyle(kuori).display !== 'none',
        pos,
        sulje: Boolean(kuori?.querySelector('.pallo-sulje')),
        pisteita: kaupunkipisteet.length,
        nimettyja: nimetyt.size,
        pisteVainNimella: kaupunkipisteet.every((p) => nimetyt.has(p.id)) && kaupunkipisteet.length === nimetyt.size,
        kaydyt: pisteet.filter((p) => p.kayty).length,
        nappuloita: nappulat.length,
        nappulaOmassa: nappulat.length === 1 && oma && Math.abs(nappulat[0].lat - ui.pallolauta.kaupunki(oma.id).lat) < 1e-9,
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
    vaadi('4. pallolla nappula nykyisessä kaupungissa ja piste vain nimetyillä kaupungeilla (+ oma)',
      tila.pisteita >= 1 && tila.pisteVainNimella && tila.nappuloita === 1 && tila.nappulaOmassa,
      JSON.stringify({ pisteita: tila.pisteita, nimettyja: tila.nimettyja, vainNimella: tila.pisteVainNimella, nappuloita: tila.nappuloita, omassa: tila.nappulaOmassa }));
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

    /* ================= VAIHE 3: MERKIT PALLOLLA ================= */

    /** Nimet ja nostot ruudulta: laatikot, limitykset, pisteet, DOM. */
    const MITTAA_MERKIT = async () => sivu.evaluate(() => {
      const { ui } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      const kotelo = ui.pallolauta.kotelo.getBoundingClientRect();
      const laatikko = (el) => {
        const r = el.getBoundingClientRect();
        return { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width };
      };
      // Limitys sallii 0,5 px:n kosketuksen (rasterin pyöristys).
      const leikkaa = (a, b) => a.x0 < b.x1 - 0.5 && a.x1 > b.x0 + 0.5 && a.y0 < b.y1 - 0.5 && a.y1 > b.y0 + 0.5;
      const nakyy = (el) => !el.classList.contains('pallolauta-takana') && !el.classList.contains('pallolauta-poistuu');
      const nimet = [...document.querySelectorAll('.pallolauta-nimi')].filter(nakyy).map((el) => ({
        id: el.dataset.kaupunki, r: laatikko(el.querySelector('text')),
      })).filter((n) => n.r.w > 0);
      const nostot = [...document.querySelectorAll('.pallolauta-nosto')].filter(nakyy).map((el) => ({
        id: el.dataset.nosto, nimio: el.dataset.nimio, aria: el.getAttribute('aria-label'), r: laatikko(el.querySelector('svg')),
      }));
      const limitykset = [];
      for (let i = 0; i < nimet.length; i += 1) {
        for (let j = i + 1; j < nimet.length; j += 1) if (leikkaa(nimet[i].r, nimet[j].r)) limitykset.push(`${nimet[i].id}+${nimet[j].id}`);
        for (const n of nostot) if (n.r.w > 0 && leikkaa(nimet[i].r, n.r)) limitykset.push(`${nimet[i].id}+${n.id}`);
      }
      const pisteet = pallo.pointsData().filter((p) => !p.laji).map((p) => p.id);
      const oma = ui.game.cityOf()?.id;
      const htmlt = pallo.htmlElementsData();
      const osumat = ui.pallolauta.nostot.osumat();
      return {
        nimia: nimet.length,
        nimetDatumeja: htmlt.filter((d) => d.laji === 'nimi').length,
        nimillaPiste: nimet.every((n) => pisteet.includes(n.id)),
        pisteita: pisteet.length,
        pisteVainNimella: pisteet.every((id) => id === oma || nimet.some((n) => n.id === id)),
        limitykset,
        nostoja: nostot.length,
        nostotNimetty: nostot.filter((n) => n.nimio || (n.aria && n.aria.length)).length,
        nostotOsumissa: nostot.filter((n) => osumat.some((o) => o.id === n.id)).length,
        nimiottomat: nostot.filter((n) => !n.nimio).map((n) => n.id),
        poltettuja: osumat.filter((o) => o.poltettu).length,
        elaimia: htmlt.filter((d) => d.perhe === 'elain').length,
        pisteMerkkeja: htmlt.filter((d) => d.laji === 'piste').length,
        htmlYhteensa: htmlt.length,
        dom: document.querySelectorAll('*').length,
        tekstuurit: pallo.renderer?.()?.info?.memory?.textures ?? null,
        leveys: ui.pallolauta.kamera.kameranTila()?.leveys,
        ilmesty: getComputedStyle(document.querySelector('.pallolauta-nimi') ?? document.body).animationName,
        kotelo: { w: kotelo.width, h: kotelo.height },
      };
    });

    /* 12. Nimet Ateenassa. */
    const ateenaMerkit = await MITTAA_MERKIT();
    vaadi('12. nimet Ateenassa: eläviä H-nimiä ≥ 1 ja ≤ 40, DOM = datumit, jokaisella nimellä piste ja piste vain nimetyillä',
      ateenaMerkit.nimia >= 1 && ateenaMerkit.nimia <= 40 && ateenaMerkit.nimia === ateenaMerkit.nimetDatumeja
        && ateenaMerkit.nimillaPiste && ateenaMerkit.pisteVainNimella,
      JSON.stringify(ateenaMerkit));
    vaadi('    nimet eivät limity keskenään eivätkä elävien nostojen kanssa; ilmestyminen animoitu',
      ateenaMerkit.limitykset.length === 0 && ateenaMerkit.ilmesty === 'pallolauta-ilmesty',
      JSON.stringify({ limitykset: ateenaMerkit.limitykset, ilmesty: ateenaMerkit.ilmesty }));
    tieto('Ateena: nimiä / nostoja / eläimiä / kohtaamispisteitä / html yhteensä',
      `${ateenaMerkit.nimia} / ${ateenaMerkit.nostoja} / ${ateenaMerkit.elaimia} / ${ateenaMerkit.pisteMerkkeja} / ${ateenaMerkit.htmlYhteensa}`);

    /* 13. Nostot Ateenassa: Kreikan lehti, jokainen nimetty ja napautettava. */
    vaadi('13. nostot Ateenassa: Kreikan lehden elävät nostot H-merkkeinä (1–40), jokainen nimetty ja osumatestissä; html ≤ 60',
      ateenaMerkit.nostoja >= 1 && ateenaMerkit.nostoja <= 40 && ateenaMerkit.nostotNimetty === ateenaMerkit.nostoja
        && ateenaMerkit.nostotOsumissa === ateenaMerkit.nostoja && ateenaMerkit.htmlYhteensa <= 60,
      JSON.stringify({ nostoja: ateenaMerkit.nostoja, nimetty: ateenaMerkit.nostotNimetty, osumissa: ateenaMerkit.nostotOsumissa, html: ateenaMerkit.htmlYhteensa }));
    tieto('nostot ilman nimiötä (kaupunkikohde tai nimiöväistön tinkimä)', ateenaMerkit.nimiottomat.join(', ') || '–');
    tieto('poltettuja (R-osuma) Ateenan näkymässä', ateenaMerkit.poltettuja);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-merkit-ateena.png') });
    const napautus = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const osuma = ui.pallolauta.nostot.osumat().find((o) => o.perhe === 'nosto' && !o.poltettu);
      if (!osuma) return { virhe: 'ei elävää nostoa' };
      const tulos = ui.pallolauta.napautaNosto(osuma.id);
      await new Promise((r) => setTimeout(r, 500));
      const kortti = document.querySelector('.fokuskohde-popup, .skandaali-kerros, .hetki-kerros, .fokusnosto-kerros, .syvennys-kerros');
      const pane = ui.mapPane.getBoundingClientRect();
      const kr = kortti?.getBoundingClientRect();
      // Ankkuri: kortti on merkin ruutupisteen vieressä (≤ 260 px) ja ruudulla.
      const p = ui.pallolauta.ruudulla(osuma.lat, osuma.lng);
      const kotelo = ui.pallolauta.kotelo.getBoundingClientRect();
      const ankkuriX = kotelo.left + (p?.x ?? 0);
      const ankkuriY = kotelo.top + (p?.y ?? 0);
      const etaisyys = kr ? Math.min(Math.abs(kr.left - ankkuriX), Math.abs(kr.right - ankkuriX)) : null;
      const ruudulla = kr ? kr.left >= pane.left - 1 && kr.right <= pane.right + 1 : false;
      // Sulkeva napautus ei avaa uutta: pointerdown koteloon + napautus toiseen nostoon.
      ui.pallolauta.kotelo.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 10 }));
      ui.pallolauta.kotelo.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 10, clientY: 10 }));
      const toinen = ui.pallolauta.nostot.osumat().find((o) => o.perhe === 'nosto' && o.id !== osuma.id);
      const auki1 = Boolean(document.querySelector('.fokuskohde-popup'));
      const pallo = ui.pallonInstanssi;
      // Kortti sulkeutui pointerdownissa; pallon oma click tulee perässä.
      if (toinen) pallo.onGlobeClick()({ lat: toinen.lat, lng: toinen.lng });
      await new Promise((r) => setTimeout(r, 300));
      const auki2 = Boolean(document.querySelector('.fokuskohde-popup, .skandaali-kerros, .hetki-kerros, .fokusnosto-kerros, .syvennys-kerros'));
      return {
        id: osuma.id, tulos, kortti: kortti?.className ?? null, etaisyys, ruudulla, auki1, auki2, toinen: toinen?.id ?? null,
      };
    });
    vaadi('    noston napautus avaa kortin merkin ruutupisteen viereen, ruudun sisään',
      !napautus.virhe && napautus.tulos && napautus.kortti && napautus.ruudulla
        && (napautus.etaisyys === null || napautus.etaisyys <= 260),
      JSON.stringify(napautus));
    vaadi('    sulkeva napautus ei avaa mitään uutta (omistaja 31.8.2026)',
      !napautus.virhe && !napautus.auki2, JSON.stringify(napautus));
    await sivu.evaluate(() => { for (const e of document.querySelectorAll('.fokuskohde-popup, .skandaali-kerros, .hetki-kerros, .fokusnosto-kerros, .syvennys-kerros')) e.remove(); });

    /* 14. Karttaselite ja aihevalot pallolla. */
    const selite = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      ui.karttaselite.avaa();
      await new Promise((r) => setTimeout(r, 100));
      const luvut = [...document.querySelectorAll('.karttaselite-rivi')].map((r) => [r.dataset.aihe, r.querySelector('.karttaselite-luku').textContent]);
      const rivi = [...document.querySelectorAll('.karttaselite-rivi')].find((r) => /\d/.test(r.querySelector('.karttaselite-luku').textContent));
      if (!rivi) return { luvut, virhe: 'ei riviä, jolla on kappaleita' };
      rivi.click();
      await new Promise((r) => setTimeout(r, 200));
      const aihe = rivi.dataset.aihe;
      const valojaPaalla = pallo.pointsData().filter((p) => p.laji === 'valo').length;
      const luokka = document.body.classList.contains(`valot-${aihe}`);
      document.querySelector('.karttaselite-kaikki').click(); // OFF
      await new Promise((r) => setTimeout(r, 200));
      const valojaPois = pallo.pointsData().filter((p) => p.laji === 'valo').length;
      ui.karttaselite.sulje();
      return {
        luvut, aihe, valojaPaalla, luokka, valojaPois, odotettu: Number(rivi.querySelector('.karttaselite-luku').textContent),
      };
    });
    vaadi('14. karttaselite pallolla: kappalemäärät > 0, väripallo sytyttää valot pistekerrokseen, OFF sammuttaa',
      !selite.virhe && selite.luokka && selite.valojaPaalla === selite.odotettu && selite.valojaPaalla > 0 && selite.valojaPois === 0,
      JSON.stringify(selite));

    /* 12b. Koko pallo: nimet ≤ 40 eivätkä limity. */
    const kokoPallo = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const ateena = ui.game.board.cityById.get('ateena');
      await ui.pallolauta.kamera.ajaKamera({ x: ateena.x, y: ateena.y, leveys: 12000 }, { kesto: 0 });
      await new Promise((r) => setTimeout(r, 400));
      ui.pallolauta.ladoHeti();
      await new Promise((r) => setTimeout(r, 400));
      return ui.pallolauta.nimet.tulos();
    });
    await sivu.waitForTimeout(300);
    const kokoMerkit = await MITTAA_MERKIT();
    vaadi('12b. koko pallo: nimiä 10–40 (ehdokkaita > 40), ei limityksiä, piste vain nimetyillä, html ≤ 60',
      kokoMerkit.nimia >= 10 && kokoMerkit.nimia <= 40 && kokoPallo.ehdokkaita > 40 && kokoMerkit.limitykset.length === 0
        && kokoMerkit.pisteVainNimella && kokoMerkit.nimillaPiste && kokoMerkit.htmlYhteensa <= 60,
      JSON.stringify({ nimia: kokoMerkit.nimia, ehdokkaita: kokoPallo.ehdokkaita, pudotettu: kokoPallo.pudotettu, limitykset: kokoMerkit.limitykset, html: kokoMerkit.htmlYhteensa, pisteita: kokoMerkit.pisteita }));
    tieto('koko pallo: nimiä / ehdokkaita / pudotettu / nostoja / DOM / tekstuurit',
      `${kokoMerkit.nimia} / ${kokoPallo.ehdokkaita} / ${kokoPallo.pudotettu} / ${kokoMerkit.nostoja} / ${kokoMerkit.dom} / ${kokoMerkit.tekstuurit}`);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-merkit-pallo.png') });
    /* 15. Kehittäjän maailmanäkymä: kaikki kaupungit pisteinä ja napautettavia. */
    const maailma = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      const { asetaKehittajaMaailma } = await import('./js/ui-apurit.js');
      asetaKehittajaMaailma(true);
      ui.kehittajaMaailma = true;
      ui.render();
      ui.pallolauta.ladoHeti();
      await new Promise((r) => setTimeout(r, 400));
      const kaikki = pallo.pointsData().filter((p) => !p.laji).length;
      // Napautus kaukaiseen kaupunkiin osuu pisteeseen (R-osuma näkyvistä).
      const tokio = ui.pallolauta.kaupunki('tokio') ?? ui.pallolauta.kaupunki('lontoo');
      let siirto = null;
      ui.doKehittajaSiirto = (city) => { siirto = city.id; };
      pallo.onGlobeClick()({ lat: tokio.lat, lng: tokio.lon });
      asetaKehittajaMaailma(false);
      ui.kehittajaMaailma = false;
      ui.render();
      ui.pallolauta.ladoHeti();
      await new Promise((r) => setTimeout(r, 400));
      return { kaikki, siirto, jalkeen: pallo.pointsData().filter((p) => !p.laji).length, kaupunki: tokio.id };
    });
    vaadi('15. kehittäjän maailmanäkymä pallolla: kaikki 261 kaupunkia pisteinä ja napautettavia (kehittäjäsiirto), pois kytkettynä vain nimetyt',
      maailma.kaikki === 261 && maailma.siirto === maailma.kaupunki && maailma.jalkeen < 261,
      JSON.stringify(maailma));
    // Kehittäjäsiirto palautetaan aitoon toteutukseen uudelleenlatauksella
    // seuraavissa vartioissa ei tarvita sitä; kamera takaisin Ateenaan.
    await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      delete ui.doKehittajaSiirto;
      await ui.pallolauta.kamera.kotiin({ kesto: 0 });
      ui.pallolauta.ladoHeti();
    });
    await sivu.waitForTimeout(500);

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
        // Mitat raporttiin: kotelo, pallon oma koko ja karttaruutu (dy:n juurisyy on kokoero).
        mitat: { kotelo: kotelo.clientHeight, pallo: pallo.height(), pane: ui.mapPane.clientHeight, pov: pallo.pointOfView(), sofia: { lat: k.lat, lon: k.lon } },
        alueKeskella: Math.abs(alue.x + alue.w / 2 - sofia.x) < 1 && Math.abs(alue.y + alue.h / 2 - sofia.y) < 1,
      };
    });
    const raja = kamera.w * 0.05;
    vaadi('6. kamera-ajo osuu Sofiaan ±5 % kotelon leveydestä',
      kamera.perilla && Math.abs(kamera.dx) <= raja && Math.abs(kamera.dy) <= raja,
      `dx ${kamera.dx.toFixed(1)} dy ${kamera.dy.toFixed(1)} raja ${raja.toFixed(1)} perillä ${kamera.perilla} ${JSON.stringify(kamera.mitat)}`);
    vaadi('   näkyvä leveys on pyydetty 240 ±5 % ja nakyvaAlue keskittyy kaupunkiin',
      Math.abs(kamera.leveys - 240) <= 12 && kamera.alueKeskella,
      `leveys ${kamera.leveys.toFixed(1)} korkeus ${kamera.korkeus.toFixed(3)} keskellä ${kamera.alueKeskella}`);
    vaadi('   ajo on animoitu (kesto ≥ 400 ms)', kamera.kesto >= 400, `${kamera.kesto.toFixed(0)} ms`);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-sofia.png') });

    /* ================= AALTO 1C: LINSSI PALLON PINNALLE ================= */

    /*
     * 7. Linssin valinta piirtää linssin PALLOLLE eikä avaa
     * linssikarttaa (karttapallo.md luku 10.1, aallot 1A–1C:
     * ui.sytytaLinssi kutsuu linssin `pallolle`-funktiota, joka piirtää
     * js/pallolauta/linssit.js:n apurilla). Maatiedot on maapolygoneja
     * (js/vertailu.js piirraMaatPallolle → linssit.polygonit), joten
     * mittari on polygonsData. Tasokartta ei saa herätä: svg#board
     * pysyy tyhjänä, kartta lepotilassa ja pyramidiin ei lähde
     * pyyntöjä. Vanha kuorivartio (linssikartta) oli aaltoa 1C
     * edeltävä; se on korvattu tällä.
     */
    const pyramidiEnnen = pyynnot.pyramidi;
    const linssiPallolla = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      const ennen = ui.pallolauta.kamera.kameranTila();
      if (!ui.game.player.linssit.includes('maatiedot')) ui.game.player.linssit.push('maatiedot');
      ui.valitseLinssi('maatiedot');
      // Aineiston lataus (maapolygonit) + kerroksen siirtymä.
      for (let i = 0; i < 80; i += 1) {
        if ((ui.pallonInstanssi?.polygonsData?.() ?? []).length) break;
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, 400));
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      const pt = ui.pallolauta.kamera.kameranTila();
      return {
        ennen: { x: ennen.x, y: ennen.y, leveys: ennen.leveys },
        nyt: pt ? { x: pt.x, y: pt.y, leveys: pt.leveys } : null,
        linssi: ui.linssiValittu,
        pallolinssi: ui.pallolinssi?.tunnus ?? null,
        polygoneja: ui.pallonInstanssi?.polygonsData?.().length ?? 0,
        linssikartta: Boolean(ui.linssikartta),
        kehys: Boolean(document.querySelector('.linssikartta-kehys')),
        luokka: document.body.classList.contains('linssikartta-auki'),
        maatiedotTila: document.body.classList.contains('maatiedot-tila'),
        linssiLuokka: document.body.classList.contains('linssi-maatiedot'),
        svgLapsia: document.querySelectorAll('#board *').length,
        lepotila: ui.kartta.lepotila,
        kuoriNakyy: Boolean(kuori) && !kuori.hidden && !kuori.classList.contains('linssin-alla'),
        dom: document.querySelectorAll('*').length,
      };
    });
    const k = linssiPallolla;
    vaadi('7. linssi piirtyy pallon pinnalle: maatiedot polygoneina, linssikarttaa ei avata',
      k.linssi === 'maatiedot' && k.pallolinssi === 'maatiedot' && k.polygoneja > 100
        && !k.linssikartta && !k.kehys && !k.luokka && k.maatiedotTila && k.linssiLuokka,
      JSON.stringify(k));
    vaadi('   tasokartta ei herää linssistä: svg#board tyhjä, kartta lepotilassa, pallo näkyvissä',
      k.svgLapsia === 0 && k.lepotila === true && k.kuoriNakyy,
      JSON.stringify({ svg: k.svgLapsia, lepotila: k.lepotila, kuori: k.kuoriNakyy }));
    vaadi('   pallon kamera pysyy paikallaan (linssi ei siirrä lautaa) ±5 %',
      k.nyt && Math.abs(k.nyt.x - k.ennen.x) <= 0.05 * k.ennen.leveys
        && Math.abs(k.nyt.y - k.ennen.y) <= 0.05 * k.ennen.leveys
        && Math.abs(k.nyt.leveys - k.ennen.leveys) <= 0.05 * k.ennen.leveys,
      `ennen ${JSON.stringify(k.ennen)} → nyt ${JSON.stringify(k.nyt)}`);
    tieto('maapolygoneja pallolla', k.polygoneja);
    tieto('pyramidipyyntöjä linssin avauksesta', pyynnot.pyramidi - pyramidiEnnen);
    tieto('DOM-solmuja linssi päällä', k.dom);
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'pallolauta-linssi-pallolla.png') });

    const linssiPois = await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      ui.valitseLinssi(null);
      const alku = Date.now();
      for (let i = 0; i < 80; i += 1) {
        if (!(ui.pallonInstanssi?.polygonsData?.() ?? []).length) break;
        await new Promise((r) => setTimeout(r, 50));
      }
      const purkuMs = Date.now() - alku;
      const kuori = document.querySelector('.pallo-kuori.pallolauta');
      // Liiku ja lehdet toimivat linssin jälkeen (avataan ja suljetaan,
      // jottei vartio 8 peri tilaa).
      ui.vaihdaLiuku();
      const liukuAukeaa = ui.liukuAuki;
      ui.suljeLiuku();
      const tutki = [...document.querySelectorAll('.actions button')]
        .find((b) => /^tutki$/i.test(b.getAttribute('aria-label') ?? ''));
      return {
        purkuMs,
        linssi: ui.linssiValittu,
        pallolinssi: ui.pallolinssi?.tunnus ?? null,
        polygoneja: ui.pallonInstanssi?.polygonsData?.().length ?? 0,
        maatiedotTila: document.body.classList.contains('maatiedot-tila'),
        svgLapsia: document.querySelectorAll('#board *').length,
        lepotila: ui.kartta.lepotila,
        kuoriNakyy: Boolean(kuori) && !kuori.hidden && getComputedStyle(kuori).opacity === '1',
        liukuAukeaa,
        tutkiEstetty: tutki ? tutki.disabled : null,
        dom: document.querySelectorAll('*').length,
      };
    });
    const s7 = linssiPois;
    vaadi('   linssin sammutus purkaa polygonit ja tilan; pallo jää lautana näkyviin',
      s7.linssi === null && s7.pallolinssi === null && s7.polygoneja === 0 && !s7.maatiedotTila
        && s7.svgLapsia === 0 && s7.lepotila === true && s7.kuoriNakyy,
      JSON.stringify(s7));
    vaadi('   Liiku ja lehdet toimivat linssin jälkeen', s7.liukuAukeaa === true && s7.tutkiEstetty !== true,
      JSON.stringify({ liuku: s7.liukuAukeaa, tutki: s7.tutkiEstetty }));
    tieto('DOM-solmuja linssin jälkeen', s7.dom);
    tieto('polygonien purku (ms)', s7.purkuMs);
    // Pyramidi on hiljaa linssin jälkeen: kesken olleet pyynnöt ehtivät
    // perille 300 ms:ssa, sen jälkeen 1,5 s:ssa ei yhtään uutta.
    await sivu.waitForTimeout(300);
    const pyramidiSulun = pyynnot.pyramidi;
    await sivu.waitForTimeout(1500);
    vaadi('   linssin jälkeen pyramidipyyntöjä 0', pyynnot.pyramidi === pyramidiSulun, `${pyynnot.pyramidi - pyramidiSulun} uutta`);

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
    // Jokainen naapurireitti on kaksi polkua: vaalea varjo ja sen
    // päällä musteviiva (js/pallolauta/reitit.js MATKAREITIN_VARJON_PAKSUUS_PX).
    vaadi('   naapurireitit pallolla liu\'un ollessa auki (pathsData = 2 × Ateenan naapurit: viiva + varjo), pois suljettuna',
      liiku.polkuja === liiku.naapureita * 2 && liiku.naapureita > 0 && liiku.polkujaSuljettuna === 0,
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
