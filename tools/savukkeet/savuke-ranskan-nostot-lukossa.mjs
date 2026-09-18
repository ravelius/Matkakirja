/*
 * Savuke: RANSKAN NOSTOT LUKOSSA JA NÄKYVISSÄ (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 a–c).
 *
 * OMISTAJA 18.9.2026 klo 15.20 Suomen aikaa (kaksi kuvaa v1941:
 * Marseillen lähizoomi ja Nähtävyydet-sivu), sanatarkasti:
 * *"Useampia nostoja liikkuu kun karttaa panoroi ja ainakin yksi
 * niistä on meren päällä. Ja eikö ranskassa pitäisi näkyä paljon
 * enemmän kohteita? … Nostojen lisäksi piti tulla tärkeimmät
 * kaupungit näkyville omiksi nostoikseen."*
 *
 * ── VARTIOT (Node, ei selainta) ───────────────────────────────────
 *
 *   1.  JOKAISELLA ELÄVÄLLÄ RANSKAN KARTTANOSTOLLA ON LUKITTU
 *       ANKKURI. Lähde on pelin oma sääntö: pääkartan Ranskan rivit
 *       (tools/tarkista-nostopaikat.mjs paakartanNostot) miinus
 *       kaupunkipisteet (js/nostoladonta.js onKaupunkipiste) ja
 *       miinus kaupungin sisäiset (js/pallolauta/kaupunkiliuska.js
 *       onKaupunginSisainen — ne ovat liuskassa, PAATOKSET 34 kohta
 *       3). Ilman lukittua ankkuria nosto latoo itsensä uudelleen
 *       aina kun kiinteä este liikkuu ruudulla — juuri se, mitä
 *       omistaja näki panoroidessaan.
 *   2.  YKSIKÄÄN LUKITTU ANKKURI EI OLE MERESSÄ. Piste testataan
 *       Natural Earthin maapolygoneja vasten (ne50.geojson, sama
 *       aineisto kuin pelin rantaviiva; tools/maamaski.mjs).
 *   3.  VASTAKOE: mittari löytää meren. Tunnetusti avomerellä oleva
 *       piste (Biskajanlahti 45,3 N / 3,2 W) EI mene vartion 2
 *       mitasta läpi, joten vartio 2 mittaa maata eikä palauta aina
 *       tosi-arvoa.
 *
 * ── VARTIOT (selain, 390 × 844 ja 1400 × 900, dpr 2) ──────────────
 *
 *   4.  NOSTO EI LIIKU VEDOSSA (PAATOKSET 32 kohta 1, 34 kohta 17 a).
 *       Saapumisnäkymässä vedetään VEDON_PITUUS_PX, ja jokaisen
 *       elävän Ranskan noston kartta-ankkuri (lat/lng) on vedon
 *       jälkeen sama kuin ennen.
 *   4b. SAMA RUUTUVEKTORINA: nimiön ruutusiirtymä merkin omasta
 *       pisteestä (dx, dy) on vedon jälkeen sama ±PAIKALLAAN_SIETO_PX.
 *   5.  SAAPUMISNÄKYMÄSSÄ RANSKAN NOSTOPISTEITÄ ≥ PISTEITA_VAHINTAAN
 *       (PAATOKSET 34 kohta 17 b). Piste on joko elävä merkki
 *       (DOM + osumalista) tai laattaan poltettua mustetta, joka on
 *       ruudulla ja osumalistalla — kumpikin näkyy pelaajalle
 *       pisteenä.
 *   6.  KAUPUNKIMERKKEJÄ ≥ KAUPUNKEJA_VAHINTAAN nimineen
 *       (PAATOKSET 34 kohta 17 c).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä selainvartiot OHITETAAN, Node-vartiot ajetaan.
 *
 * Aja: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs
 *      (SAVUKE_RUUTU=390 tai 1400 rajaa yhteen ruutuun.)
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { onKaupunkipiste } from '../../js/nostoladonta.js';
import { onKaupunginSisainen } from '../../js/pallolauta/kaupunkiliuska.js';
import { NOSTOANKKURIT_FRA } from '../../js/packs/nostoankkurit-fra.js';
import { paakartanNostot } from '../tarkista-nostopaikat.mjs';
import { onMaalla } from '../maamaski.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;

/*
 * PISTEET NAKYVAT AINA KOHDEMAASSA (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 21, omistajan puhelintesti v1944): kohdemaan
 * nostojen ja nakyvien kaupunkien PISTEET piirtyvat saapumisnakymassa
 * ja siita ulospain jokaisella zoomitasolla, jolla kohdemaa on
 * ruudulla. Luvut ovat omistajan antamat; 390 px:n pienempi luku on
 * PAATOKSET 17:n korkeuteen sovitus (maan ita- ja lansireuna jaavat
 * ruudun ulkopuolelle), ei tingitty tavoite.
 */
/** Ranskan kartalla näkyviä nostopisteitä vähintään (kohta 17 b, 21). */
const PISTEITA_VAHINTAAN = 40;
/** Sama luku 390 px:n pystyruudulla (PAATOKSET 17 rajaa reunat). */
const PISTEITA_VAHINTAAN_390 = 36;
/** Kaupunkimerkkejä vähintään (kohta 17 c). */
const KAUPUNKEJA_VAHINTAAN = 7;
/** Sama luku 390 px:n pystyruudulla (kohta 21). */
const KAUPUNKEJA_VAHINTAAN_390 = 5;
/** Vedon pituus saapumisnäkymässä (px). */
const VEDON_PITUUS_PX = 200;
/** Ruutuvektorin sallittu heitto vedon yli (px). */
const PAIKALLAAN_SIETO_PX = 1;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); return; }
  console.log(`FAIL  ${nimi} — ${lisa}`);
  /*
   * VÄITETEKSTI MYÖS PR-LOKIIN. GitHub Actions nostaa `::warning::`-
   * rivin (vanha `##[warning]`-muoto) yhteenvetoon, ja
   * tools/savukkeet/aja-sarja.mjs poimii juuri sen kuvioon
   * `^::(warning|error)::`. Ilman tätä punaisen vartion väite jää
   * lokin sisälle eikä näy PR:n annotaatioissa.
   */
  console.log(`::warning::${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ==================== VARTIOT 1–3: NODE ==================== */

/**
 * PELIN OMA RAJA: mitkä Ranskan rivit ovat kartan eläviä nostoja.
 * Kaupunkipiste ei ole nosto (se ei levity eikä tarvitse ankkuria),
 * ja kaupungin sisäinen on liuskassa eikä kartalla.
 */
const { kaikki: kaikkiRivit } = paakartanNostot();
const fraRivit = kaikkiRivit.filter((r) => r.iso === 'FRA');
const keskukset = fraRivit
  .filter((r) => onKaupunkipiste(r.id) && Number.isFinite(r.lat))
  .map((r) => ({ lat: r.lat, lng: r.lon }));
/*
 * LAUDAN OMA KAUPUNKI (Pariisi) on keskus siinä missä pakan näkyvät
 * kaupungit: kaupungin sisäiset nostot menevät liuskaan riippumatta
 * siitä, kummasta lähteestä kaupunki tulee (js/pallolauta/nostot.js
 * `kaupunkirivit`). Ilman tätä Pariisin nostot näyttäisivät kartan
 * eläviltä nostoilta, jotka vaativat lukitun ankkurin.
 */
const { MAAILMANKARTTA } = await import('../../js/packs/maailmankartta.js');
const { laudaltaAsteiksi } = await import('../../js/fokusmitat.js');
for (const k of (MAAILMANKARTTA.cities ?? [])) {
  if ((MAAILMANKARTTA.map?.cityCountry ?? {})[k.id] !== 'FRA') continue;
  const asteet = laudaltaAsteiksi(MAAILMANKARTTA.id, k.x, k.y);
  if (asteet) keskukset.push({ lat: asteet.lat, lng: asteet.lon ?? asteet.lng });
}
const sisainen = (r) => keskukset.some((k) => onKaupunginSisainen({ lat: r.lat, lng: r.lon }, k));
const elavat = fraRivit.filter((r) => !onKaupunkipiste(r.id) && !sisainen(r));
tieto('Ranskan pääkartan rivejä', fraRivit.length);
tieto('kaupunkipisteitä', fraRivit.filter((r) => onKaupunkipiste(r.id)).length);
tieto('kartan eläviä nostoja (ei kaupunkipiste, ei sisäinen)', elavat.length);

/** Ranskan kartalla elävien nostojen tunnukset (odotuslista kohdalle 5). */
const ODOTETUT = new Set(elavat.map((r) => r.id));

const lukitut = new Set(Object.keys(NOSTOANKKURIT_FRA));
const ilmanLukkoa = elavat.filter((r) => !lukitut.has(`nosto:${r.id}`));
vaadi('1. jokaisella Ranskan elävällä karttanostolla on lukittu ankkuri',
  ilmanLukkoa.length === 0, `ilman lukkoa ${ilmanLukkoa.length}: `
    + ilmanLukkoa.map((r) => r.id).join(', '));

const meressa = Object.entries(NOSTOANKKURIT_FRA)
  .filter(([, a]) => !onMaalla(a.lat, a.lng));
vaadi('2. yksikään lukittu ankkuri ei ole merellä',
  meressa.length === 0, `merellä ${meressa.length}: ${meressa.map(([k]) => k).join(', ')}`);
vaadi('3. vastakoe: merimittari tunnistaa Biskajanlahden merialueeksi',
  !onMaalla(45.3, -3.2), 'mittari sanoo avomerta maaksi');

/* ==================== SELAINVARTIOT ==================== */

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
  .catch(() => null);
const chromium = paketti?.chromium ?? paketti?.default?.chromium ?? null;
const lopeta = (koodi) => {
  console.log(`${lapi}/${kaikki} vartiota läpi`);
  process.exit(koodi);
};
if (!chromium) {
  console.log('OHITUS  playwright puuttuu — selainvartiot ohitetaan');
  lopeta(lapi === kaikki ? 0 : 1);
}

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; selainvartiot ohitetaan');
  palvelin.close();
  lopeta(lapi === kaikki ? 0 : 1);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const konttiSelain = '/opt/pw-browsers/chromium';
const selainPolku = process.env.CHROMIUM
  ?? (existsSync(konttiSelain) ? konttiSelain : chromium.executablePath());
const selain = await chromium.launch({ executablePath: selainPolku });

async function avaaSivu(ruutu) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne('pariisi'));
  const sivu = await ctx.newPage();
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  // Saapuminen ajetaan loppuun (isoisän kuvasarja ja pulu, ~40 s).
  await sivu.waitForTimeout(44000);
  await sivu.evaluate(async () => {
    window.matkakirja.ui.pallolauta.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 900));
  });
  return { ctx, sivu };
}

/** Kerroksen tila: osumat, DOM-merkit ja nimiön ruutuvektori merkistä. */
const lueTila = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const laatikot = l.nostot.osumaLaatikot?.() ?? [];
  const keskus = new Map(laatikot
    .filter((b) => b && Number.isFinite(b.x0))
    .map((b) => [b.avain ?? b.id, { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 }]));
  const kuori = l.kuori ?? document;
  const nimiovektorit = {};
  for (const el of kuori.querySelectorAll('.pallolauta-nosto')) {
    const avain = el.dataset?.avain ?? null;
    const lappu = el.querySelector('text');
    if (!avain || !lappu) continue;
    const a = el.getBoundingClientRect();
    const b = lappu.getBoundingClientRect();
    if (!b.width && !b.height) continue;
    nimiovektorit[avain] = {
      dx: (b.left + b.width / 2) - (a.left + a.width / 2),
      dy: (b.top + b.height / 2) - (a.top + a.height / 2),
    };
  }
  return {
    domMerkkeja: kuori.querySelectorAll('.pallolauta-nosto').length,
    nimiovektorit,
    rivit: l.nostot.osumat().map((o) => ({
      avain: o.avain ?? null,
      id: o.id ?? null,
      nimi: o.nimi ?? null,
      perhe: o.perhe ?? null,
      maara: o.maara ?? 0,
      jasenet: Array.isArray(o.jasenet) ? o.jasenet : [],
      kaupunki: Boolean(o.kaupunki),
      poltettu: Boolean(o.poltettu),
      lat: o.lat,
      lng: o.lng,
      px: keskus.get(o.avain ?? o.id) ?? null,
    })),
  };
});

async function veda(sivu, dx) {
  const laatikko = await sivu.evaluate(() => {
    const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
    const r = k.getBoundingClientRect();
    return {
      x: r.left, y: r.top, w: r.width, h: r.height,
    };
  });
  const x0 = laatikko.x + laatikko.w / 2;
  const y0 = laatikko.y + laatikko.h / 2;
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  for (let i = 1; i <= 8; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.mouse.move(x0 + (dx * i) / 8, y0);
    await sivu.waitForTimeout(40);
    /* eslint-enable no-await-in-loop */
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(900);
  await sivu.evaluate(async () => {
    window.matkakirja.ui.pallolauta.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 600));
  });
}

/**
 * Yksi loitonnusporras: rullaa ulos kartan keskellä ja ladotaan uudelleen.
 * Uloszoomaus on lukittu maan laatikkoon, joten kamera ei välttämättä
 * liiku — ele riittää silti laukaisemaan uuden ladonnan (ks. vartio 7).
 */
async function loitonna(sivu) {
  const keskus = await sivu.evaluate(() => {
    const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
    const r = k.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await sivu.mouse.move(keskus.x, keskus.y);
  for (let i = 0; i < 6; i += 1) {
    /* eslint-disable no-await-in-loop */
    await sivu.mouse.wheel(0, 240);
    await sivu.waitForTimeout(250);
    /* eslint-enable no-await-in-loop */
  }
  await sivu.waitForTimeout(1200);
  await sivu.evaluate(async () => {
    window.matkakirja.ui.pallolauta.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 600));
  });
}

const VAIN = Number(process.env.SAVUKE_RUUTU ?? 0) || 0;
/*
 * 2000 x 1300 ON OMISTAJAN OMA RUUTU (puhelintesti 18.9.2026,
 * PAATOKSET 34 kohta 21): juuri silla leveydella han naki Ranskan
 * saapumisnakyman ilman nostopisteita. Ilman tata rivia mittasarja ei
 * kayttanyt ollenkaan sita ruutua, josta loydos tuli.
 */
const RUUDUT = [{ w: 390, h: 844 }, { w: 1400, h: 900 }, { w: 2000, h: 1300 }]
  .filter((r) => !VAIN || r.w === VAIN);

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu } = await avaaSivu(ruutu);
  const ennen = await lueTila(sivu);
  const pisteet = ennen.rivit.filter((r) => r.avain && !r.avain.startsWith('piste:')
    && !r.kaupunki && (r.perhe === 'nosto' || r.perhe === 'aihemerkki'));
  const aiheet = ennen.rivit.filter((r) => r.perhe === 'aihemerkki');
  const jasenia = aiheet.reduce((a, r) => a + (r.maara ?? 0), 0);
  const kaupungit = ennen.rivit.filter((r) => r.kaupunki && r.nimi);
  tieto(`${ruutu.w}px DOM-merkkejä`, ennen.domMerkkeja);
  tieto(`${ruutu.w}px osumalistan rivejä`, ennen.rivit.length);
  tieto(`${ruutu.w}px nostopisteitä (elävä + poltettu)`,
    `${pisteet.length} (poltettuja ${pisteet.filter((r) => r.poltettu).length}, `
    + `aihemerkkejä ${aiheet.length}, niissä jäseniä ${jasenia})`);
  tieto(`${ruutu.w}px kaupunkimerkkejä`,
    `${kaupungit.length}: ${kaupungit.map((r) => r.nimi).join(', ')}`);
  /*
   * MITKÄ NOSTOT PUUTTUVAT. Pelkkä lukumäärä ei kerro, mikä meni
   * rikki: aihemerkki on yksi rivi mutta edustaa monta nostoa, ja
   * poltettu muste tulee listalle omana rivinään. Puuttuva on siis
   * odotuslistan (Ranskan kartan elävät nostot, vartio 1) tunnus,
   * joka ei ole listalla omana rivinään eikä minkään aihemerkin
   * jäsenenä — eli kadonnut pelaajan silmistä.
   */
  const nakyvatTunnukset = new Set();
  for (const r of ennen.rivit) {
    if (r.kaupunki) continue;
    if (r.id) nakyvatTunnukset.add(r.id);
    for (const j of r.jasenet) nakyvatTunnukset.add(j);
  }
  const puuttuvat = [...ODOTETUT].filter((id) => !nakyvatTunnukset.has(id));
  tieto(`${ruutu.w}px puuttuvia Ranskan nostoja (ei riviä eikä aihemerkin jäsenenä)`,
    `${puuttuvat.length}${puuttuvat.length ? `: ${puuttuvat.join(', ')}` : ''}`);
  const pisteRaja = ruutu.w < 1000 ? PISTEITA_VAHINTAAN_390 : PISTEITA_VAHINTAAN;
  vaadi(`5. ${ruutu.w}px saapumisnäkymässä Ranskan nostopisteitä >= ${pisteRaja}`,
    pisteet.length >= pisteRaja,
    `pisteitä ${pisteet.length}; puuttuvia ${puuttuvat.length}: ${puuttuvat.slice(0, 20).join(', ')}`);
  /*
   * KAUPUNKIMERKIT MITATAAN LEVEÄLLÄ RUUDULLA, PUHELIMELLA INFONA.
   *
   * Puhelimen pystyruudulla saapumisnäkymä sovitetaan KORKEUTEEN
   * (Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET 17, js/pallolauta/kamera.js
   * korkeuteenSovitus): maa täyttää ruudun pystysuunnassa ja *"maan
   * itä- ja länsireuna jäävät aluksi ruudun ulkopuolelle"*. Ranskan
   * itäisimmät lisäkaupungit (Strasbourg, Nizza) ovat siis 390 px:llä
   * poissa kuvasta omistajan oman aiemman päätöksen nojalla, eikä
   * tämä savuke saa kumota sitä hiljaa — luku on INFO ja ristiriita
   * kirjattu Fablelle (docs/raportit/viesti-fable-nostot-lukko-k17-
   * 20260918.md).
   */
  /*
   * 390 px:n luku on nyt VARTIO eikä pelkkä INFO (PAATOKSET 34 kohta
   * 21: *"390 px: >= 36 ja >= 5"*). Korkeuteen sovitus jättää itä- ja
   * länsireunan ruudun ulkopuolelle, joten raja on viisi eikä
   * seitsemän — mutta se on raja, ei tyhjä kohta.
   */
  const kaupunkiRaja = ruutu.w < 1000 ? KAUPUNKEJA_VAHINTAAN_390 : KAUPUNKEJA_VAHINTAAN;
  vaadi(`6. ${ruutu.w}px kaupunkimerkkejä nimineen >= ${kaupunkiRaja}`,
    kaupungit.length >= kaupunkiRaja, `kaupunkeja ${kaupungit.length}`);

  await veda(sivu, VEDON_PITUUS_PX);
  const jalkeen = await lueTila(sivu);
  const jalkeenKartta = new Map(jalkeen.rivit.map((r) => [r.avain, r]));
  const liikkuneet = [];
  for (const r of ennen.rivit) {
    if (!r.avain || r.kaupunki || r.poltettu) continue;
    if (r.perhe !== 'nosto' && r.perhe !== 'aihemerkki') continue;
    const j = jalkeenKartta.get(r.avain);
    if (!j) continue;
    const ero = Math.max(Math.abs(j.lat - r.lat), Math.abs(j.lng - r.lng));
    if (ero > 1e-6) liikkuneet.push(`${r.avain} ${ero.toExponential(2)}°`);
  }
  vaadi(`4. ${ruutu.w}px yksikään elävä nosto ei liiku ${VEDON_PITUUS_PX} px vedossa`,
    liikkuneet.length === 0,
    `liikkuneita ${liikkuneet.length}: ${liikkuneet.slice(0, 8).join(' | ')}`);

  const vektoriHeitot = [];
  for (const [avain, v] of Object.entries(ennen.nimiovektorit)) {
    const u = jalkeen.nimiovektorit[avain];
    if (!u) continue;
    const heitto = Math.max(Math.abs(u.dx - v.dx), Math.abs(u.dy - v.dy));
    if (heitto > PAIKALLAAN_SIETO_PX) vektoriHeitot.push(`${avain} ${heitto.toFixed(1)} px`);
  }
  vaadi(`4b. ${ruutu.w}px nimiön ruutuvektori merkistä sama vedon jälkeen`,
    vektoriHeitot.length === 0,
    `heittoja ${vektoriHeitot.length}: ${vektoriHeitot.slice(0, 8).join(' | ')}`);

  /*
   * ── VARTIO 7: LOITONNUS EI VIE PISTEITÄ ──────────────────────────
   *
   * PAATOKSET 34 kohta 21 sanoo pisteiden näkyvän saapumisnäkymässä
   * *"ja siita ulospain jokaisella zoomitasolla, jolla kohdemaa on
   * ruudulla"*. Uloszoomaus on lukittu maan laatikkoon (PAATOKSET 17,
   * js/pallolauta/kamera.js), joten ele ei yleensä liikuta kameraa
   * lainkaan — ja juuri siksi tämä vartio on tarpeen: MITATTU
   * 18.9.2026 ennen korjausta, että pelkkä loitonnusele pudotti
   * 390 px:llä pisteet 34 → 14 ja kaupungit 5 → 1, vaikka kameran
   * korkeus pysyi sadasosan tarkkuudella samana.
   *
   * NIMIÖT SAAVAT VÄHETÄ, PISTEET EIVÄT: mitta on sama pisteraja kuin
   * vartiossa 5.
   */
  await loitonna(sivu);
  const ulompana = await lueTila(sivu);
  const ulomPisteet = ulompana.rivit.filter((r) => r.avain && !r.avain.startsWith('piste:')
    && !r.kaupunki && (r.perhe === 'nosto' || r.perhe === 'aihemerkki'));
  const ulomKaupungit = ulompana.rivit.filter((r) => r.kaupunki && r.nimi);
  tieto(`${ruutu.w}px loitonnuksen jälkeen kaupunkimerkkejä`, ulomKaupungit.length);
  vaadi(`7. ${ruutu.w}px yhtä porrasta loitompana nostopisteitä >= ${pisteRaja}`,
    ulomPisteet.length >= pisteRaja,
    `pisteitä ${ulomPisteet.length} (saapumisnäkymässä ${pisteet.length})`);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();
lopeta(lapi === kaikki ? 0 : 1);
