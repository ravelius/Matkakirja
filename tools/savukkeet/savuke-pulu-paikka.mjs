/*
 * Savuke: PULU NÄYTTÄÄ PAIKAN KARTALLA (js/pulu-paikka.js).
 *
 * Omistajan tilaus 6.9.2026 ilta (iPad, keskustelu jossa pelaaja
 * kirjoitti *"Missä Sparta on?"*), sanatarkasti: *"Olisiko pulun
 * mahdollista näyttää joku kohta kartalla kysyttäessä, niin että kamera
 * lentäisi sinne? Sitten jonnekin tulisi palaa nappi jolla pääsisi
 * lähtöpaikkaan takaisin."*
 *
 * ── VARTIOT, MOLEMMILLA LAUDOILLA (?lauta=kartta ja ?lauta=pallo) ──
 *
 *   1. "Missä Sparta on?" lennättää kameran: näkymän keskipiste on
 *      Spartan kohdalla ±2° (Sparta ei ole pelin omassa aineistossa,
 *      joten tämä on nimenomaan PALVELIMEN paikkakentän polku —
 *      workerin vastaus jäljitellään paikallisesti, verkkoon ei mennä).
 *   2. Merkki näkyy kartalla ja siinä lukee kohteen nimi.
 *   3. Palaa-nappi näkyy.
 *   4. Palaa-napin painallus palauttaa alkuperäisen näkymän ±1 %
 *      (keskipiste ja näkyvä leveys) ja poistaa merkin.
 *   5. Pelin OMA aineisto riittää ilman palvelinta: kun pöllöpalvelin
 *      on kokonaan poikki, "Missä Lontoo on?" lennättää kameran silti
 *      (tasokartalla mitattuna).
 *
 * Kuvat: ensimmäinen argumentti on kuvakansio.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1) kuten
 * savuke-pallolaudassa: kontin selain ei osaa välityspalvelinta, Noden
 * fetch osaa. Ilman ämpäriä pallo ei lataudu, ja silloin savuke ajaa
 * vain tasokartan vartiot ja sanoo sen ääneen.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pulu-paikka.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Sparta, en-Wikipedia "Sparta" (37,0736 N / 22,4297 E). */
const SPARTA = { lat: 37.0736, lon: 22.4297 };

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
const AMPARI_TOIMII = kirjasto?.status === 200;
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — pallo ei voi latautua; ajetaan vain tasokartan vartiot');

/* Tallenne: Fogg Ateenassa, aarre löydetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Uusi sivu. `paikka` = jäljitellyn workerin paikkakenttä, null =
 * palvelin on kokonaan poikki (verkkovirhe, kuten puhelimessa).
 */
async function avaaSivu({ lauta, paikka = null }) {
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  /*
   * PÖLLÖPALVELIN JÄLJITELLÄÄN PAIKALLISESTI: verkkoon ei mene yhtään
   * pyyntöä eikä generointikiintiötä kulu. Vastaus on tavallista
   * JSONia, jonka pöllön striimipolku lukee varapolkunaan (js/pollo.js
   * pyydaStriimi) — juuri se polku, jota vanha worker myös käyttää.
   */
  await sivu.route('**samireivinen.workers.dev/**', async (route) => {
    let runko = null;
    try { runko = JSON.parse(route.request().postData() ?? '{}'); } catch { runko = null; }
    if (runko?.tehtava !== 'vastaus' || !paikka) { await route.abort(); return; }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        vastaus: 'Sparta oli Lakonian tasangolla Eurotas-joen varrella.',
        jatkot: [],
        paikka,
      }),
    });
  });
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(`${osoite}?lauta=${lauta}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  if (lauta === 'pallo') {
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
      .catch(() => null);
  }
  await sivu.waitForTimeout(2500);
  return { ctx, sivu, virheet };
}

/** Näkymän keskipiste ja leveys laudan yksiköissä. */
const lueNakyma = (sivu) => sivu.evaluate(() => {
  // Sama kahva kuin paikannuksella (js/pulu-paikka.js lahtonakyma):
  // ui.nakyvaAlue on laudasta riippumaton.
  const alue = window.matkakirja.ui.nakyvaAlue?.();
  return alue ? { x: alue.x + alue.w / 2, y: alue.y + alue.h / 2, leveys: alue.w } : null;
});

/**
 * Näkymä paikalleen ennen mittausta.
 *
 * Saapumisen oma kamera-ajo on kesken vielä sekunteja latauksen
 * jälkeen, ja siitä luettu "lähtönäkymä" olisi ohikiitävä välivaihe —
 * jota Palaa ei voi palauttaa, koska se on zoomiportaikon ulkopuolella.
 * Odotetaan, että kaksi peräkkäistä lukemaa ovat samat.
 */
async function asetu(sivu, { kierroksia = 25, vali = 400 } = {}) {
  let edellinen = null;
  for (let i = 0; i < kierroksia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const nyt = await lueNakyma(sivu);
    if (edellinen && nyt && Math.abs(nyt.x - edellinen.x) < 0.5
      && Math.abs(nyt.y - edellinen.y) < 0.5
      && Math.abs(nyt.leveys - edellinen.leveys) < 0.5) return nyt;
    edellinen = nyt;
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(vali);
  }
  return edellinen;
}

/** Kysyy pululta ja odottaa, että merkki on noussut esiin. */
async function kysy(sivu, kysymys) {
  await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
  await sivu.waitForTimeout(700);
  await sivu.evaluate((teksti) => {
    void window.matkakirjaPollo?.kysy(teksti);
  }, kysymys);
  // waitForFunction eikä waitForSelector: mitattava asia on LUOKKA
  // (merkki on noussut esiin), ei Playwrightin näkyvyyskäsitys.
  return sivu.waitForFunction(
    () => Boolean(document.querySelector('.pulu-paikkamerkki.esilla')),
    null,
    // Ajastinpolku eikä rAF: pallolaudalla kehykset menevät WebGL:ään,
    // ja rAF-poll jäi näkemättä luokan vaihdon (mitattu 6.9.2026).
    { timeout: 20000, polling: 250 },
  ).then(() => true).catch(() => false);
}

/** Merkin ja napin tila ruudulla. */
const lueNaytto = (sivu) => sivu.evaluate(() => {
  const merkki = document.querySelector('.pulu-paikkamerkki');
  const nappi = document.querySelector('.pulu-palaa');
  const nakyy = (el, sisus = el) => Boolean(el) && el.classList.contains('esilla')
    && !el.classList.contains('haipyva') && sisus?.getBoundingClientRect().width > 0;
  return {
    // Merkin ankkuri on nollan kokoinen (css .pulu-paikkamerkki), joten
    // laatikko mitataan nimilaatasta.
    merkki: nakyy(merkki, merkki?.querySelector('.pulu-paikkalaatta')),
    merkinTeksti: merkki?.textContent ?? '',
    nappi: nakyy(nappi),
    napinTeksti: nappi?.textContent ?? '',
    rivi: [...document.querySelectorAll('.pollo-paikkarivi')].map((el) => el.textContent).join(' | '),
  };
});

/** Yhden laudan koko kierros. */
async function ajaLauta(lauta) {
  console.log(`\n=== ${lauta.toUpperCase()} ===`);
  const { ctx, sivu, virheet } = await avaaSivu({
    lauta,
    paikka: {
      nimi: 'Sparta', lat: SPARTA.lat, lon: SPARTA.lon, tarkkuus: 'kaupunki',
    },
  });
  const alku = await asetu(sivu);
  vaadi(`${lauta}: lähtönäkymä luettavissa`, Boolean(alku?.leveys > 0), JSON.stringify(alku));

  const nayttyi = await kysy(sivu, 'Missä Sparta on?');
  // Ajo saa rauhassa loppua ennen mittausta.
  const perilla = await asetu(sivu, { kierroksia: 12 });
  const asteet = perilla ? laudaltaAsteiksi('maailmankartta', perilla.x, perilla.y) : null;
  const dLat = asteet ? Math.abs(asteet.lat - SPARTA.lat) : 999;
  const dLon = asteet ? Math.abs(asteet.lon - SPARTA.lon) : 999;
  vaadi(`${lauta}: kamera lensi Spartaan ±2°`, dLat <= 2 && dLon <= 2,
    `keskipiste ${asteet?.lat?.toFixed(2)} N / ${asteet?.lon?.toFixed(2)} E`);
  tieto(`${lauta} näkyvä leveys perillä`, `${perilla?.leveys?.toFixed(0)} lautayksikköä`);

  const naytto = await lueNaytto(sivu);
  vaadi(`${lauta}: merkki näkyy kohteen nimellä`,
    nayttyi && naytto.merkki && naytto.merkinTeksti.includes('Sparta'), JSON.stringify(naytto));
  vaadi(`${lauta}: Palaa-nappi näkyy`, naytto.nappi && naytto.napinTeksti.includes('Palaa'),
    JSON.stringify(naytto));
  vaadi(`${lauta}: pulun paneeliin tuli rivi kartalla näytetystä paikasta`,
    naytto.rivi.includes('Näytän kartalla') && naytto.rivi.includes('Sparta'), naytto.rivi);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `${lauta}-1-sparta.png`), timeout: 120000 });

  await sivu.evaluate(() => document.querySelector('.pulu-palaa')?.click());
  const paluu = await asetu(sivu, { kierroksia: 12 });
  const ero = (a, b) => Math.abs(a - b) / Math.max(1e-6, Math.abs(alku.leveys));
  const sama = paluu && ero(paluu.x, alku.x) <= 0.01 && ero(paluu.y, alku.y) <= 0.01
    && Math.abs(paluu.leveys - alku.leveys) / alku.leveys <= 0.01;
  vaadi(`${lauta}: Palaa palauttaa alkuperäisen näkymän ±1 %`, sama,
    `${JSON.stringify(alku)} → ${JSON.stringify(paluu)}`);
  const jalkeen = await lueNaytto(sivu);
  vaadi(`${lauta}: merkki ja nappi katosivat paluun jälkeen`,
    !jalkeen.merkki && !jalkeen.nappi, JSON.stringify(jalkeen));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `${lauta}-2-palattu.png`), timeout: 120000 });

  if (virheet.length) tieto(`${lauta} sivun virheet`, virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

await ajaLauta('kartta');
if (AMPARI_TOIMII) await ajaLauta('pallo');
else { kaikki += 6; console.log('SKIP  pallon vartiot (ämpäri ei vastaa)'); }

/* ===== PELIN OMA AINEISTO ILMAN PALVELINTA ===== */
{
  console.log('\n=== OMA AINEISTO, PALVELIN POIKKI ===');
  const { ctx, sivu } = await avaaSivu({ lauta: 'kartta', paikka: null });
  const alku = await asetu(sivu);
  await kysy(sivu, 'Missä Lontoo on?');
  const perilla = await asetu(sivu, { kierroksia: 12 });
  const asteet = perilla ? laudaltaAsteiksi('maailmankartta', perilla.x, perilla.y) : null;
  // Lontoo: 51,51 N / -0,13 E (js/packs/maailmankartta.js CITIES).
  const osui = asteet && Math.abs(asteet.lat - 51.51) <= 2 && Math.abs(asteet.lon + 0.13) <= 2;
  vaadi('oma aineisto lennättää kameran ilman palvelinta', Boolean(osui),
    `lähtö ${JSON.stringify(alku)} → ${asteet?.lat?.toFixed(2)} N / ${asteet?.lon?.toFixed(2)} E`);
  const naytto = await lueNaytto(sivu);
  vaadi('merkissä lukee Lontoo', naytto.merkinTeksti.includes('Lontoo'), JSON.stringify(naytto));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'kartta-3-oma-aineisto.png'), timeout: 120000 });
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
