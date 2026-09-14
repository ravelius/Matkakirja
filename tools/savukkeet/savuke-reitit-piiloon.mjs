/*
 * Savuke: NAAPURIREITIT PIILOON KUNNES PELAAJA PAINAA LIIKU.
 *
 * Omistajan pyyntö 14.9.2026 (sanatarkasti): *"onko kaupunkien valiset
 * siirtymalinjat ja merireitit omalla tasollaan? jos on niin ne voi
 * ottaa pois nakyvista ja palauttaa vasta kun pelaaja painaa liiku
 * nappia"*.
 *
 * ── MITÄ TÄMÄ MITTAA ──────────────────────────────────────────────
 *
 * Näkyvyyssääntö on YKSI funktio (js/ui.js matkareittienValinta), mutta
 * sitä ei mitata tässä lukemalla funktion paluuarvoa — se olisi saman
 * lauseen toistoa. Mitataan se, minkä pelaaja näkee: pallon omat
 * kerrokset (js/pallolauta/reitit.js — `pathsData` reittiviivat,
 * `pointsData` askelhelmet, `arcsData` lentokaaret). Jos sääntö ja
 * piirto erkanevat, luvut eivät täsmää eikä kumpikaan kaadu itsestään.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. KAUPUNGISSA LIUKU KIINNI EI OLE VIUHKAA. Varsovassa (4
 *      maareittiä) reittiviivoja 0 ja helmiä 0 sekä vaiheessa 'action'
 *      että vaiheessa 'roll'. Vaihe 'roll' on tässä se tärkeä: erän
 *      koko ero vanhaan on juuri se, ettei siirtovaihe enää yksin riitä
 *      näyttämään viuhkaa (KARTTAUUDISTUKSEN PAATOKSET 5:n
 *      automaattinen nopanheitto osuu tähän hetkeen).
 *   2. LIUKU AUKI PALAUTTAA VIUHKAN. Sama kaupunki, `liukuAuki`
 *      tosi → tasan naapurien verran reittiviivoja ja helmiä yli nollan.
 *   3. KESKEN MATKAA SE YKSI REITTI JÄÄ. Nappula reitin päällä
 *      (`pos.type === 'edge'`), liuku kiinni → tasan 1 reittiviiva.
 *      Ilman tätä poikkeusta nappula kulkisi tyhjän päällä.
 *   4. KATSELUTILA JA BOTIN VUORO OVAT ENNALLAAN tyhjiä.
 *   5. LENTOKAARTEN SÄÄNTÖ EI MUUTU (omistaja 1.9.2026): Ateenassa
 *      lentolista auki (`travelExpanded`, suodatin 'air') → kaaria yli
 *      nollan; ilman listaa nolla. Tämä on erän tärkein vastavartio:
 *      viuhkan piilotus ei saa viedä kaaria mukanaan.
 *
 *      MIKSI LIUKU ON TÄSSÄ AUKI: lentolista aukeaa liu'un napista, ja
 *      juuri sillä piirtokierroksella `liukuAuki` on vielä tosi — liu'un
 *      oma sulkija ehtii vasta kuplinnassa perässä (js/ui.js
 *      piirraToimintorivi). Kaari siis syntyy sillä hetkellä. Mitattu
 *      oikeasta napautusketjusta 14.9.2026.
 *
 * ── VASTAKOE ──────────────────────────────────────────────────────
 *
 * Vartiot 1 ja 5 erottavat vanhan ja uuden säännön: vanhalla ehdolla
 * (`this.liukuAuki || vaiheessa`) vartio 1 on punainen vaiheessa 'roll'
 * ja vartio 5 yhtä vihreä kuin nyt. Aja savuke muutos palautettuna,
 * niin ero näkyy numeroina.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 * Laaja ruutu 2560 × 1352 (omistajan työpöytä): Varsova liuku kiinni,
 * Varsova liuku auki ja yksi kesken matkaa. Nimiö erottaa ENNEN- ja
 * JÄLKEEN-ajon toisistaan.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Ilman ämpäriä
 * pallo ei lataudu; savuke toteaa sen ja päättyy ohituksella.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-reitit-piiloon.mjs \
 *         [kuvakansio] [nimio]
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '/tmp/matkakirja-kaappaukset';
const NIMIO = process.argv[3] ?? 'jalkeen';
if (!existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Omistajan työpöytä: laaja ruutu, jolla viuhka näkyy kokonaan. */
const RUUTU = { width: 2560, height: 1352 };
/** Raporttikuvan pienennys: mitataan täydellä ruudulla, talletetaan pienenä. */
const KUVAN_SKAALA = 0.3;
/** Kaupunki, jonka viuhka mitataan: neljä maareittiä, ei lentokenttää. */
const KAUPUNKI = 'varsova';
/** Lentokaarivartion kaupunki: maa- ja merireittejä sekä lentokenttä. */
const LENTOKAUPUNKI = 'ateena';

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
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
const tallenne = JSON.stringify(peli.toJSON());
const NAAPURIT = [...(peli.board.adj.get(KAUPUNKI) ?? [])];
const NAAPUREITA = NAAPURIT.length;
const REITTI = NAAPURIT[0];

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: RUUTU, deviceScaleFactor: 1, serviceWorkers: 'block',
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
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const v = await ampariHaku(route.request().url());
  if (!v || v.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: v.tyyppi ?? 'application/octet-stream',
    body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 120000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
  { timeout: 120000 }).then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki, virheet.join(' | '));

/**
 * Asettaa pelitilan ja palauttaa sen, mitä pallo NÄYTTÄÄ: reittiviivat
 * (varjot pois laskuista), askelhelmet ja lentokaaret. Sääntö luetaan
 * samalla rinnalle, jotta raportista näkyy, ovatko sääntö ja piirto
 * samaa mieltä.
 */
const mittaa = (tila) => sivu.evaluate(async (t) => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const { game } = ui;
  game.phase = t.phase;
  game.player.pos = t.pos;
  game.player.isBot = Boolean(t.botti);
  ui.katselu = Boolean(t.katselu);
  ui.liukuAuki = Boolean(t.liuku);
  ui.travelExpanded = Boolean(t.matkavalikko);
  ui.travelSuodatin = t.suodatin ?? null;
  if (t.keskita) {
    /*
     * VAIN KESKITYS, EI ZOOMIA: korkeus otetaan siitä, mihin peli itse
     * asettui saapumisessa (maan rajaus, karttauudistus). Oma luku
     * antaisi kuvan, jota pelissä ei ole.
     */
    const c = game.board.cityById.get(t.keskita);
    const p = l.asteet({ x: c.x, y: c.y });
    const nyt = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: p.lat, lng: p.lon, altitude: nyt.altitude }, 0);
    await new Promise((v) => setTimeout(v, 700));
  }
  ui.paivitaMatkareitit();
  await new Promise((v) => setTimeout(v, 500));

  /*
   * VARJO EI OLE OMA REITTI: jokainen reittiviiva työnnetään kahdesti
   * (js/pallolauta/reitit.js — vaalea uoma ensin, musteviiva päälle),
   * joten pelaajan näkemien viivojen määrä on eri avainten määrä
   * ilman '#varjo'-päätettä.
   */
  const viivat = new Set();
  for (const d of l.pallo.pathsData()) {
    const avain = String(d.avain ?? '');
    if (!avain || avain.endsWith('#varjo')) continue;
    viivat.add(avain);
  }
  const helmia = l.pallo.pointsData().filter((p) => p.laji === 'helmi').length;
  const kaaria = l.pallo.arcsData().length;
  const valinta = ui.matkareittienValinta();
  return {
    viivoja: viivat.size,
    viivat: [...viivat],
    helmia,
    kaaria,
    saanto: valinta.reittiTunnukset.length,
    lennot: valinta.lennot.length,
    avain: valinta.avain,
  };
}, tila);

const kuva = async (nimi) => {
  /*
   * SAAPUMISEN ISOKUVA POIS ENNEN KAAPPAUSTA. Kaupunkiin saavuttaessa
   * fokusvirta jättää kartan päälle kaupungin ison kuvan
   * (.fokusvirta-isokuva), joka peittää juuri sen alueen, jota tässä
   * mitataan. Se nollataan pelin omalla kutsulla — savuke ei piilota
   * sitä CSS:llä eikä poista käsin, jottei kaappaus näyttäisi
   * näkymää, jota pelissä ei ole.
   */
  for (let i = 0; i < 6; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.evaluate(async () => {
      const { nollaaFokuskuvat, suljeFokusvirta } = await import('/js/fokusvirta.js');
      suljeFokusvirta(window.matkakirja.ui);
      nollaaFokuskuvat(window.matkakirja.ui);
    });
    await sivu.waitForTimeout(500);
    const jaljella = await sivu.evaluate(() => Boolean(
      document.querySelector('.fokusvirta-isokuva, .saapumistraileri'),
    ));
    /* eslint-enable no-await-in-loop */
    if (!jaljella) break;
  }
  /*
   * KAAPPAUS PIENENNETÄÄN SELAIMEN OMALLA KANKAALLA (sama kaava kuin
   * savuke-liiku): kartan pergamenttipinta on kohinaa, joka tekee
   * 2560 × 1352 png:stä yli kaksi megatavua, ja raporttikuvat pidetään
   * 400 kt:n kokoluokassa, jottei repon historia paisu. Mittaukset
   * luetaan pallon kerroksista eikä kuvasta, joten mittakaava ei vaikuta
   * yhteenkään lukuun — kuva on todiste silmälle.
   */
  const png = (await sivu.screenshot()).toString('base64');
  const pieni = await sivu.evaluate(async ([data, k]) => {
    const img = new Image();
    await new Promise((ok, hup) => {
      img.onload = ok; img.onerror = hup; img.src = `data:image/png;base64,${data}`;
    });
    const kangas = document.createElement('canvas');
    kangas.width = Math.round(img.width * k);
    kangas.height = Math.round(img.height * k);
    kangas.getContext('2d').drawImage(img, 0, 0, kangas.width, kangas.height);
    return kangas.toDataURL('image/png').split(',')[1];
  }, [png, KUVAN_SKAALA]);
  const polku = join(KUVAKANSIO, `reitit-${nimi}-${NIMIO}.png`);
  writeFileSync(polku, Buffer.from(pieni, 'base64'));
  tieto('kuva', `${polku} (${Math.round(Buffer.from(pieni, 'base64').length / 1024)} kt)`);
  return polku;
};

if (auki) {
  /*
   * SAAPUMISTRAILERI SAA PÄÄTTYÄ ITSE. Peli avaa kaupunkiin
   * saavuttaessa kolmen kuvan trailerin (js/saapumistraileri.js), joka
   * peittää kartan noin kymmeneksi sekunniksi. Kuva otetaan vasta sen
   * jälkeen — muuten kaappauksessa olisi trailerin kuva eikä karttaa.
   */
  await sivu.waitForTimeout(14000);
  /*
   * SAAPUMISKORTTI POIS KUVASTA: peli avaa kaupunkiin saavuttaessa
   * kortin, joka peittää kartan kokonaan. Mitattava asia on kartta sen
   * alla, joten kortti suljetaan samalla eleellä kuin pelaaja sulkee
   * sen. Tehtävä vaimennetaan ('stay' on aito valinta, joka estäisi
   * automaattivalinnan) ja vuoro aloitetaan puhtaalta pöydältä.
   */
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    ui.game.tehtavaTarjolla = () => false;
    ui.game.player.money = 300;
    ui.game.beginTurn();
    ui.render();
  });
  /*
   * SAAPUMISTRAILERI SAA PÄÄTTYÄ ITSE. Kuvasarja on peliä eikä roskaa:
   * se peittää kartan saapumisen ajan ja poistuu omalla ajallaan. Kuva
   * otetaan vasta sen jälkeen, muuten mitattaisiin trailerin kuvaa eikä
   * karttaa.
   */
  await sivu.waitForTimeout(1200);
  const paalla = await sivu.evaluate(() => Boolean(
    document.querySelector('.saapumistraileri, dialog[open]'),
  ));
  tieto('kartan päällä vielä traileri tai modaali', String(paalla));

  const kaupungissa = { type: 'city', city: KAUPUNKI };
  const keskella = { type: 'edge', edge: REITTI, idx: 1 };

  /* 1–2. kaupungissa: liuku kiinni vs. auki, molemmissa vaiheissa. */
  const aKiinniAction = await mittaa({
    phase: 'action', pos: kaupungissa, liuku: false, keskita: KAUPUNKI,
  });
  tieto('kaupunki/liuku kiinni/vaihe action', JSON.stringify(aKiinniAction));
  await kuva('kaupunki-kiinni');

  const aAuki = await mittaa({ phase: 'action', pos: kaupungissa, liuku: true });
  tieto('kaupunki/liuku auki/vaihe action', JSON.stringify(aAuki));
  await kuva('kaupunki-auki');

  const aKiinniRoll = await mittaa({ phase: 'roll', pos: kaupungissa, liuku: false });
  tieto('kaupunki/liuku kiinni/vaihe roll (automaattiheitto)', JSON.stringify(aKiinniRoll));
  await kuva('kaupunki-automaattiheitto');

  const aMoveKaupungissa = await mittaa({ phase: 'move', pos: kaupungissa, liuku: false });
  tieto('kaupunki/liuku kiinni/vaihe move', JSON.stringify(aMoveKaupungissa));

  /* 3. kesken matkaa. */
  const kesken = await mittaa({
    phase: 'move', pos: keskella, liuku: false, keskita: KAUPUNKI,
  });
  tieto('kesken reittiä/liuku kiinni/vaihe move', JSON.stringify(kesken));
  await kuva('kesken-matkaa');

  /* 4. katselu ja botti. */
  const katselu = await mittaa({
    phase: 'roll', pos: kaupungissa, liuku: true, katselu: true,
  });
  tieto('katselutila', JSON.stringify(katselu));
  const botti = await mittaa({
    phase: 'roll', pos: kaupungissa, liuku: true, botti: true,
  });
  tieto('botin vuoro', JSON.stringify(botti));

  /* 5. lentokaaret: sääntö ei muutu. */
  const lentoPos = { type: 'city', city: LENTOKAUPUNKI };
  const lentoLista = await mittaa({
    phase: 'action',
    pos: lentoPos,
    liuku: true,
    matkavalikko: true,
    suodatin: 'air',
    keskita: LENTOKAUPUNKI,
  });
  tieto('lentolista auki (liuku vielä auki)', JSON.stringify(lentoLista));
  const lentoDilla = await mittaa({
    phase: 'action', pos: lentoPos, liuku: false, keskita: LENTOKAUPUNKI,
  });
  tieto('lentokaupunki, ei listaa, liuku kiinni', JSON.stringify(lentoDilla));

  await mittaa({ phase: 'action', pos: kaupungissa, liuku: false, keskita: KAUPUNKI });

  vaadi('1a. kaupungissa liuku kiinni (vaihe action): ei reittiviivoja eikä helmiä',
    aKiinniAction.viivoja === 0 && aKiinniAction.helmia === 0,
    JSON.stringify(aKiinniAction));
  vaadi('1b. kaupungissa liuku kiinni (vaihe roll, automaattiheitto): ei viuhkaa',
    aKiinniRoll.viivoja === 0 && aKiinniRoll.helmia === 0,
    JSON.stringify(aKiinniRoll));
  vaadi('1c. kaupungissa liuku kiinni (vaihe move): ei viuhkaa',
    aMoveKaupungissa.viivoja === 0 && aMoveKaupungissa.helmia === 0,
    JSON.stringify(aMoveKaupungissa));
  vaadi(`2. liuku auki palauttaa viuhkan (${NAAPUREITA} naapuria)`,
    aAuki.viivoja === NAAPUREITA && aAuki.helmia > 0,
    JSON.stringify(aAuki));
  vaadi('3. kesken matkaa näkyy tasan se yksi reitti',
    kesken.viivoja === 1 && kesken.viivat[0] === REITTI,
    JSON.stringify(kesken));
  vaadi('4a. katselutilassa ei reittejä', katselu.viivoja === 0, JSON.stringify(katselu));
  vaadi('4b. botin vuorolla ei reittejä', botti.viivoja === 0, JSON.stringify(botti));
  vaadi('5a. lentolista auki piirtää kaaret (omistajan 1.9.2026 sääntö ennallaan)',
    lentoLista.kaaria > 0, JSON.stringify(lentoLista));
  vaadi('5b. ilman lentolistaa ei kaaria', lentoDilla.kaaria === 0, JSON.stringify(lentoDilla));
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
