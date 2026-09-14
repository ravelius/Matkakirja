/*
 * Savuke: KARTTAUUDISTUKSEN ERÄ 12 — ZOOMIN RAJAUS JA MAAPANEELI
 * BISKAJANLAHDELLE (Ranska-pilotti).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 9 (omistaja 14.9.2026 klo
 * 11.00 UTC, sanatarkasti): *"aloita zoomin rajoittamisesta ja siirra
 * maainfo laatikko biskajanlahden paalle. silla pitaa olla kiintea
 * paikka ja koko. eli koko pysyy karttaan verrattuna samana, suurenee
 * zoomatessa ja toisinpain. laatikolla saisi olla isommat sisennykset
 * tekstille (kehys liian lahella)."*
 *
 * Kolme väitettä, kaikki Ranskassa (Pariisi):
 *
 *   1. ULOSZOOMAUS EI ONNISTU. Saapumisnäkymä JA uloin sallittu
 *      näkymä ovat sama asia: OrbitControlsin `maxDistance` on
 *      enintään ULOSZOOMAUSVARA verran kameran saapumiskorkeutta
 *      ulompana, ja ctrl-rulla ulospäin ei kasvata näkyvää leveyttä
 *      sitä enempää. Mitataan 9 sekunnin levon jälkeen, jotta
 *      erässä 12 korjattu mittauspiikki (ks. alla) ehtii tapahtua.
 *   2. PANEELI ON MEREN PÄÄLLÄ. Paneelin nelikulmio (25 näytepistettä)
 *      ei osu YHDENKÄÄN maan polygoniin — ei Ranskan eikä Espanjan.
 *      Polygonit luetaan samasta aineistosta kuin peli
 *      (assets/data/maapolygonit.json, js/maanaariviivat.js), ja
 *      paneelin paikka luetaan AJOSSA OLEVASTA pelistä
 *      (lauta.maapaneeli.mitat()), ei koodivakiosta.
 *   3. KOKO ON KIINTEÄ KARTTAAN NÄHDEN. Kolmella zoomitasolla (uloin
 *      sallittu, puolet siitä, neljäsosa) paneelin ruutuskaalan ja
 *      kameran korkeuden TULO on vakio ±SUHTEEN_VARA — eli
 *      ruutukoko ∝ kartan mittakaava ilman katkoa. Sama mitataan
 *      suoraan kortin ruutuleveyden ja paneelin OMAN lautamitan
 *      ruutuprojektion suhteena.
 *   5. RAJAUS ON AIVAN MAAN RAJOJEN ULKOPUOLELLA (erä 13, omistaja
 *      14.9.2026: *"kartta zoomautuu liian kauas. pitaa rajautua aivan
 *      rajojen ulkopuolelle."*). Rajauksen ruutulaatikko on maan
 *      laatikon kehän projektio yhdistettynä maapaneelin korttiin, ja
 *      SITOVALLA akselilla tyhjää tilaa on enintään TYHJAN_KATTO
 *      (3,5 %, ks. vakion perustelu);
 *      lisäksi laatikko on kokonaan ruudussa (mikään ei leikkaudu).
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 * Kaikki kolme tehdään TARJOILTAVAAN LÄHDETEKSTIIN, joten peli ajaa
 * oikeasti vanhalla arvolla — ei piilotettua koetta.
 *
 *   A. ULOSZOOMAUKSEN_KERROIN 1,15 → 3 (erää 2 edeltänyt arvo).
 *      VÄITTEEN 1 ON KAADUTTAVA.
 *   B. MAAPANEELIN_ANKKURIT tyhjäksi → ankkuri palaa maan laatikon
 *      eteläreunaan. VÄITTEEN 2 ON KAADUTTAVA (paneeli osuu
 *      Espanjaan).
 *   C. MAAPANEELIN_SKAALA_MAX 64 → 3 (erän 11 arvo). VÄITTEEN 3 ON
 *      KAADUTTAVA: katto katkaisee skaalauksen kesken pelialueen.
 *   D. `pallonKorkeus` palauttamaan null → rajaus lasketaan taas laudan
 *      Mercator-yksiköistä, kuten ennen erää 13. Kokeessa muutetaan
 *      VAIN MITTA, ei varaa, joten tulos ei ole vanha näkymä vaan
 *      vastaus kysymykseen *"tekeekö mitta eron"*. VÄITTEEN 5 ON
 *      KAADUTTAVA.
 *
 * === MIKSI 9 SEKUNNIN LEPO ON OSA KOETTA ============================
 *
 * Erässä 12 mitattu vika (Ranska 390 × 844): ResizeObserver ajaa
 * `mitoita`n noin 7 s saapumisen jälkeen kotelon hetkellisellä
 * mitalla, jolloin uloszoomauksen katto laskee alle kameran korkeuden
 * ja OrbitControls puristaa kameran sisään; katto palaa mutta kamera
 * ei. Vika näkyy VAIN, jos mittaus tehdään piikin jälkeen.
 *
 * === VERKKO ========================================================
 *
 * Pallo tarvitsee Globe.gl:n ämpäristä. Jos ämpäri ei vastaa, savuke
 * ohitetaan (sama sääntö kuin muilla pallosavukkeilla).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { puraMaanRenkaat } from '../../js/maanaariviivat.js';
import { projisoiLaudalle } from '../../js/fokusmitat.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/**
 * Sallittu uloszoomausvara: kuinka paljon `maxDistance` saa olla
 * saapumiskorkeutta ulompana. Luku EI ole mitoitus vaan väite, ja se
 * on valittu suunnitellun varan ja mitatun vian väliin:
 *
 *   suunniteltu  erässä 13 uloszoomauksen kerroin JA saapumisen vara
 *                ovat sama luku 1 + 2 × 0,01 = 1,02  →  0 % (ennen
 *                erää 13: 1,15 vs. 1,10 → 4,5 % työpöydällä)
 *   mitattu vika  mittauspiikin jälkeen 49 % (puhelin, 14.9.2026)
 *   vastakoe A    kerroin 3            →  yli 150 %
 */
const ULOSZOOMAUSVARA = 0.02;
/**
 * Väitteen 3 sallittu hajonta kolmen zoomitason välillä.
 *
 * MITTA ON `skaala × korkeus`, EI RUUTULEVEYKSIEN SUHDE. Kortti on
 * litteä HTML-elementti, jonka mittakaava on ruudun KESKIPISTEEN
 * mittakaava; kartan pinta on pallo, jolla sama lautamitta kattaa
 * ruudulla eri määrän pikseleitä sen mukaan, missä päin ruutua se on
 * ja millä leveyspiirillä (Mercatorin cos φ). Ruutuleveyksien suhde
 * heittelee siis pallon geometriasta 4–10 % ilman yhtään katkoa
 * koodissa — se kirjataan INFOna. Sen sijaan `skaala × korkeus` on
 * tasan vakio silloin ja vain silloin, kun mikään raja ei katkaise
 * skaalausta: skaala ∝ px per lautayksikkö ∝ 1 / korkeus.
 */
const SUHTEEN_VARA = 0.02;
/**
 * VÄITE 5: TYHJÄ TILA SITOVALLA AKSELILLA (erä 13, omistaja 14.9.2026
 * sanatarkasti: *"kartta zoomautuu liian kauas. pitaa rajautua aivan
 * rajojen ulkopuolelle."*).
 *
 * Mitta on RAJAUKSEN (maa + maapaneeli) ruutulaatikko: maan laatikon
 * kehä projisoituna `getScreenCoords`illa ja maapaneelin kortin oma
 * ruutulaatikko yhdistettynä. Tyhjä tila = ruudun mitta miinus
 * laatikon mitta, jaettuna ruudun mitalla; SITOVA AKSELI on se, jolla
 * tyhjää on vähemmän — toisella akselilla tyhjää saa olla, koska
 * laatikon kuvasuhde ei ole ruudun kuvasuhde.
 *
 * KATTO 3,5 % JA SEN PERUSTELU. Saapumisen vara on 1 + 2 × 0,01 =
 * 1,02, eli KAUIMMAINEN laatikon reuna asettuu tasan 98 %:iin ruudun
 * puolikkaasta. Koko akselin tyhjä on silti hitusen enemmän, koska
 * kamera osoittaa laatikon keskipisteeseen LAUDAN yksiköissä eikä
 * pallon projektion keskelle: toiselle reunalle jää enemmän tilaa kuin
 * toiselle. MITATTU Ranskassa erän 13 jälkeen 1,08 % (390 × 844) ja
 * 3,01 % (1400 × 900); ennen erää 13 luvut olivat 35,3 % ja 27,5 %.
 * Katto on 3,5 % eikä 3,0 %, jottei vartio kaadu kuormitetun koneen
 * puolen prosentin heitosta — se erottaa silti korjatun rajauksen
 * korjaamattomasta kymmenkertaisella marginaalilla (vastakoe D).
 */
const TYHJAN_KATTO = 0.035;
/**
 * Kolme zoomitasoa osuuksina uloimmasta sallitusta korkeudesta.
 * Sisin on valittu niin, että se YLITTÄÄ erän 11 katon (SKAALA_MAX 3)
 * molemmilla ruuduilla — muuten vastakoe C ei mittaisi mitään.
 */
const ZOOMITASOT = [1, 0.25, 0.125];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/** Vastakokeen kytkin: 'A' | 'B' | 'C' | null. Muutos tarjoiltuun tekstiin. */
let vastakoe = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (vastakoe === 'A' && polkuOsa.endsWith('/js/pallolauta/kamera.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/ULOSZOOMAUKSEN_KERROIN = [^;]+;/, 'ULOSZOOMAUKSEN_KERROIN = 3;'));
  }
  if (vastakoe === 'B' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_ANKKURIT = \{[\s\S]*?\n\};/, 'MAAPANEELIN_ANKKURIT = {};'));
  }
  if (vastakoe === 'D' && polkuOsa.endsWith('/js/pallolauta/kamera.js')) {
    /*
     * Erää 13 edeltänyt MITTA: korkeus laskettiin laudan
     * Mercator-yksiköistä eikä pallon perspektiivistä. Yksi rivi
     * riittää — `pallonKorkeus` palauttaa null, jolloin kameranKohde
     * putoaa takaisin vanhaan `korkeus(leveys)`-polkuun. Vara pysyy
     * uutena (1,02), joten koe eristää nimenomaan mitan.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace('const pallonKorkeus = (bbox, vara = 1) => {',
        'const pallonKorkeus = (bbox, vara = 1) => { if (bbox || vara) return null;'));
  }
  if (vastakoe === 'C' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_SKAALA_MAX = [\d.]+/, 'MAAPANEELIN_SKAALA_MAX = 3'));
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
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
const p = (v, d = 4) => (typeof v === 'number' ? +v.toFixed(d) : v);

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

/* ---- maapolygonit Nodessa: onko paneeli maan päällä? -------------- */
const maadata = JSON.parse(readFileSync(join(JUURI, 'assets/data/maapolygonit.json'), 'utf8'));
const renkaat = new Map();
for (const iso of Object.keys(maadata.maat ?? {})) renkaat.set(iso, puraMaanRenkaat(maadata, iso));
/** Säteenheitto: onko laudan piste renkaan sisällä? */
const rengaassa = (piste, rengas) => {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > piste[1]) !== (yj > piste[1])
      && piste[0] < ((xj - xi) * (piste[1] - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
};
/** Paneelin 25 näytepisteen maaosumat: [{ piste, iso }, …]. */
const maaosumat = (mitat) => {
  const keski = projisoiLaudalle('maailmankartta', mitat.lng, mitat.lat);
  if (!keski || !(mitat.w > 0) || !(mitat.h > 0)) return null;
  const ulos = [];
  for (let i = 0; i <= 4; i += 1) {
    for (let k = 0; k <= 4; k += 1) {
      const piste = [keski.x - mitat.w / 2 + (mitat.w * i) / 4, keski.y + (mitat.h * k) / 4];
      for (const [iso, ryhma] of renkaat) {
        if (ryhma.some((r) => rengaassa(piste, r))) ulos.push({ piste, iso });
      }
    }
  }
  return ulos;
};

/* Tallenne: Fogg Pariisissa — pilottimaa on Ranska. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi ajo: konteksti, peli Pariisissa, 9 s lepoa (ks. tiedoston alku). */
async function avaaPeli({ leveys, korkeus }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  // 9 s: saapumisketju ja mittauspiikki ehtivät molemmat tapahtua.
  if (auki) {
    await sivu.waitForTimeout(9000);
    /*
     * VAKIINTUMINEN ON OSA MITTAUSTA. `pointOfView()` voi palauttaa
     * ajon KOHTEEN, kun kirjaston oma tween on kesken, joten mittaus
     * odottaa, että PIIRRETTY mittakaava (kahden pisteen ruutuväli) ei
     * enää liiku. Ilman tätä rajausmitta luki kerran kameran korkeuden
     * 0,4667 vaikka kuva oli yhä korkeudella 0,65 (mitattu 14.9.2026).
     */
    const otos = () => sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const a = l.pallo.getScreenCoords(0, 0, 0);
      const b = l.pallo.getScreenCoords(0, 10, 0);
      return Math.abs(b.x - a.x);
    });
    let edel = await otos();
    for (let i = 0; i < 8; i += 1) {
      await sivu.waitForTimeout(1500);
      const nyt = await otos();
      if (Math.abs(nyt - edel) < 0.5) { edel = nyt; break; }
      edel = nyt;
    }
  }
  return { ctx, sivu, virheet, auki };
}

/** Kamera, kortti ja paneelin lautamitat samasta hetkestä. */
const mittaa = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const sade = l.pallo.getGlobeRadius();
  const ohj = l.pallo.controls();
  const pov = l.pallo.pointOfView();
  const kortti = document.querySelector('.maapaneeli-kortti');
  const r = kortti?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();
  const sisus = document.querySelector('.maapaneeli-sisus');
  const mitat = l.maapaneeli?.mitat?.() ?? null;
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  return {
    alt: pov.altitude,
    maxAlt: ohj.maxDistance / sade - 1,
    minAlt: ohj.minDistance / sade - 1,
    skaala: datum?.skaala ?? null,
    mitat,
    kortti: r ? { x0: r.left - kotelo.left, y0: r.top - kotelo.top, x1: r.right - kotelo.left, y1: r.bottom - kotelo.top, w: r.width, h: r.height } : null,
    kotelo: { w: kotelo.width, h: kotelo.height, x0: kotelo.left, y0: kotelo.top },
    ylivuoto: sisus ? sisus.scrollHeight - sisus.clientHeight : null,
  };
});

/**
 * Rajauksen ruutulaatikko ja tyhjä tila (väite 5).
 *
 * KOORDINAATISTO ON KOTELON, EI SIVUN. `getScreenCoords` antaa jo
 * kotelon suhteelliset pikselit, kun taas `getBoundingClientRect` on
 * sivun koordinaatistossa — kortista vähennetään siksi kotelon nurkka
 * ja maan laatikosta EI. Sekoitus siirtäisi laatikot toistensa suhteen
 * yläpalkin verran (mitattu 68 px), ja mitta olisi hölynpölyä.
 */
const rajausNyt = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kotelo = l.kotelo.getBoundingClientRect();
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  const bb = datum?.laatikko ?? null;
  if (!bb || !l.asteet) return null;
  let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
  const N = 40;
  const lisaa = (bx, by) => {
    const a = l.asteet({ x: bx, y: by });
    if (!a) return;
    const s = l.pallo.getScreenCoords(a.lat, a.lon ?? a.lng, 0);
    if (!s || !Number.isFinite(s.x) || !Number.isFinite(s.y)) return;
    x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x);
    y0 = Math.min(y0, s.y); y1 = Math.max(y1, s.y);
  };
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    lisaa(bb.x + bb.w * t, bb.y);
    lisaa(bb.x + bb.w * t, bb.y + bb.h);
    lisaa(bb.x, bb.y + bb.h * t);
    lisaa(bb.x + bb.w, bb.y + bb.h * t);
  }
  if (!Number.isFinite(x0)) return null;
  const maa = { x0, x1, y0, y1 };
  const k = document.querySelector('.maapaneeli-kortti')?.getBoundingClientRect() ?? null;
  const kortti = k
    ? { x0: k.left - kotelo.left, x1: k.right - kotelo.left,
      y0: k.top - kotelo.top, y1: k.bottom - kotelo.top }
    : null;
  const yhd = kortti
    ? { x0: Math.min(x0, kortti.x0), x1: Math.max(x1, kortti.x1),
      y0: Math.min(y0, kortti.y0), y1: Math.max(y1, kortti.y1) }
    : maa;
  const tyhjaX = (kotelo.width - (yhd.x1 - yhd.x0)) / kotelo.width;
  const tyhjaY = (kotelo.height - (yhd.y1 - yhd.y0)) / kotelo.height;
  return {
    maa,
    kortti,
    yhd,
    kotelo: { w: kotelo.width, h: kotelo.height },
    tyhjaX,
    tyhjaY,
    sitova: Math.min(tyhjaX, tyhjaY),
    akseli: tyhjaX <= tyhjaY ? 'X' : 'Y',
    // Leikkautuuko rajaus ruudun ulkopuolelle?
    ruudussa: yhd.x0 >= -1 && yhd.y0 >= -1
      && yhd.x1 <= kotelo.width + 1 && yhd.y1 <= kotelo.height + 1,
  };
});

/** Kortin leveys ja paneelin oman lautamitan ruutuleveys samalla zoomilla. */
const suhdeNyt = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const mitat = l.maapaneeli?.mitat?.();
  const kortti = document.querySelector('.maapaneeli-kortti');
  if (!mitat || !kortti) return null;
  /*
   * Paneelin OMA lautaleveys ruutupikseleinä: puolet leveydestä
   * ankkurin kummallekin puolelle samalla leveyspiirillä. Lauta on
   * 12000 yksikköä = 360°, joten muunnos on sama kuin kameran
   * `asteetLeveydesta`. Tämä on se mitta, jonka kortin PITÄÄ kattaa
   * ruudulla joka zoomilla — suhde on siis vakio 1:n tuntumassa.
   */
  const askel = (mitat.w * 360) / 12000 / 2;
  const a = l.pallo.getScreenCoords(mitat.lat, mitat.lng - askel, 0);
  const b = l.pallo.getScreenCoords(mitat.lat, mitat.lng + askel, 0);
  const r = kortti.getBoundingClientRect();
  // Maan laatikon ruutuleveys (tehtävänannon vertailumitta).
  const datum = l.pallo.htmlElementsData().find((d) => d.laji === 'maapaneeli') ?? null;
  let laatikko = null;
  const bb = datum?.laatikko;
  if (bb && l.asteet) {
    const v = l.asteet({ x: bb.x, y: bb.y + bb.h / 2 });
    const o = l.asteet({ x: bb.x + bb.w, y: bb.y + bb.h / 2 });
    if (v && o) {
      const p1 = l.pallo.getScreenCoords(v.lat, v.lon ?? v.lng, 0);
      const p2 = l.pallo.getScreenCoords(o.lat, o.lon ?? o.lng, 0);
      laatikko = Math.abs(p2.x - p1.x);
    }
  }
  return { kortti: r.width, lauta: Math.abs(b.x - a.x), laatikko,
    alt: l.pallo.pointOfView().altitude, skaala: datum?.skaala ?? null };
});

/** Kamera annetulle osuudelle uloimmasta sallitusta korkeudesta. */
const zoomaa = async (sivu, osuus) => {
  await sivu.evaluate(async (k) => {
    const l = window.matkakirja.ui.pallolauta;
    const sade = l.pallo.getGlobeRadius();
    const maxAlt = l.pallo.controls().maxDistance / sade - 1;
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: maxAlt * k }, 0);
    await new Promise((v) => setTimeout(v, 900));
    l.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 300));
  }, osuus);
};

const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];

const zoomiTulokset = [];
const meriTulokset = [];
const suhdeTulokset = [];
const rajausTulokset = [];
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

  /* --- 5. rajaus aivan maan rajojen ulkopuolelle ------------------ */
  const r = await rajausNyt(sivu);
  rajausTulokset.push({ ruutu: ruutu.nimi, sitova: p(r?.sitova, 4), akseli: r?.akseli,
    ruudussa: r?.ruudussa ?? false,
    ok: Boolean(r && r.sitova <= TYHJAN_KATTO && r.sitova >= 0 && r.ruudussa) });
  tieto(`${ruutu.nimi} px · rajaus (maa + maapaneeli)`,
    r
      ? `laatikko x ${p(r.yhd.x0, 1)}…${p(r.yhd.x1, 1)} / 0…${p(r.kotelo.w, 1)}, `
        + `y ${p(r.yhd.y0, 1)}…${p(r.yhd.y1, 1)} / 0…${p(r.kotelo.h, 1)}; `
        + `tyhjä X ${p(100 * r.tyhjaX, 2)} % · Y ${p(100 * r.tyhjaY, 2)} % → `
        + `sitova ${r.akseli} ${p(100 * r.sitova, 2)} % (katto ${p(100 * TYHJAN_KATTO, 1)} %), `
        + `kokonaan ruudussa ${r.ruudussa}`
      : 'EI MITATTAVISSA');

  /* --- 1. uloszoomaus ei onnistu -------------------------------- */
  const m = await mittaa(sivu);
  const vara = m.maxAlt / m.alt - 1;
  const kx = Math.round(m.kotelo.x0 + m.kotelo.w / 2);
  const ky = Math.round(m.kotelo.y0 + m.kotelo.h / 2);
  await sivu.keyboard.down('Control');
  await sivu.mouse.move(kx, ky);
  for (let i = 0; i < 25; i += 1) { await sivu.mouse.wheel(0, 200); await sivu.waitForTimeout(25); }
  await sivu.keyboard.up('Control');
  await sivu.waitForTimeout(700);
  const u = await mittaa(sivu);
  const rullavara = u.alt / m.alt - 1;
  zoomiTulokset.push({ ruutu: ruutu.nimi, vara: p(vara), rullavara: p(rullavara),
    ok: vara <= ULOSZOOMAUSVARA && rullavara <= ULOSZOOMAUSVARA });
  tieto(`${ruutu.nimi} px · uloszoomaus`,
    `saapumiskorkeus ${p(m.alt)}, katto ${p(m.maxAlt)} (vara ${p(100 * vara, 1)} %), `
    + `ctrl-rulla ulos → ${p(u.alt)} (+${p(100 * rullavara, 1)} %), `
    + `kortti ${m.kortti ? `${p(m.kortti.w, 1)} × ${p(m.kortti.h, 1)} px` : 'EI OLE'}, `
    + `ylivuoto ${m.ylivuoto} px`);

  /* --- 2. paneeli on meren päällä -------------------------------- */
  const osumat = m.mitat ? maaosumat(m.mitat) : null;
  meriTulokset.push({ ruutu: ruutu.nimi, osumia: osumat ? osumat.length : null,
    maat: osumat ? [...new Set(osumat.map((o) => o.iso))] : null,
    ok: Boolean(osumat && osumat.length === 0) });
  tieto(`${ruutu.nimi} px · paneelin paikka`,
    `keskiylä ${p(m.mitat?.lat, 3)} N / ${p(m.mitat?.lng, 3)} E, `
    + `lautamitta ${p(m.mitat?.w, 1)} × ${p(m.mitat?.h, 1)} yks, `
    + `maaosumia ${osumat ? osumat.length : '—'}`
    + `${osumat?.length ? ` (${[...new Set(osumat.map((o) => o.iso))].join(', ')})` : ''}, `
    + `kortti ruudulla x ${p(m.kortti?.x0, 1)}…${p(m.kortti?.x1, 1)} / 0…${p(m.kotelo.w, 1)}, `
    + `y ${p(m.kortti?.y0, 1)}…${p(m.kortti?.y1, 1)} / 0…${p(m.kotelo.h, 1)}`);

  if (KUVAKANSIO) {
    await sivu.evaluate(() => {
      for (const node of document.querySelectorAll('.fokusvirta-isokuva')) {
        node.style.setProperty('display', 'none', 'important');
      }
    });
    await sivu.waitForTimeout(400);
    await zoomaa(sivu, 1);
    await sivu.screenshot({ path: join(KUVAKANSIO, `karttauudistus-12-${ruutu.nimi}.png`) });
  }

  /* --- 3. koko on kiinteä karttaan nähden ------------------------ */
  const tasot = [];
  for (const osuus of ZOOMITASOT) {
    await zoomaa(sivu, osuus);
    const s = await suhdeNyt(sivu);
    if (s) tasot.push({ osuus, alt: p(s.alt), kortti: p(s.kortti, 1), lauta: p(s.lauta, 1),
      suhde: p(s.kortti / s.lauta, 5), laatikkosuhde: p(s.kortti / s.laatikko, 5),
      tulo: p(s.skaala * s.alt, 5) });
  }
  const hajonta = (avain) => {
    const arvot = tasot.map((t) => t[avain]);
    if (arvot.length < 3 || arvot.some((v) => !(v > 0))) return Infinity;
    return (Math.max(...arvot) - Math.min(...arvot)) / (arvot.reduce((a, b) => a + b, 0) / arvot.length);
  };
  const hTulo = hajonta('tulo');
  suhdeTulokset.push({ ruutu: ruutu.nimi, hTulo: p(hTulo, 5), ok: hTulo <= SUHTEEN_VARA, tasot });
  tieto(`${ruutu.nimi} px · skaala kolmella zoomilla`,
    `${tasot.map((t) => `alt ${t.alt} → kortti ${t.kortti} px, skaala × korkeus ${t.tulo}`).join(' | ')}; `
    + `hajonta ${p(100 * hTulo, 3)} % (raja ${100 * SUHTEEN_VARA} %)`);
  tieto(`${ruutu.nimi} px · ruutuleveyksien suhteet (pallon geometria, INFO)`,
    `${tasot.map((t) => `alt ${t.alt}: kortti/paneelin lautamitta ${t.suhde}, `
      + `kortti/maan laatikko ${t.laatikkosuhde}`).join(' | ')}; `
    + `hajonta ${p(100 * hajonta('suhde'), 2)} % ja ${p(100 * hajonta('laatikkosuhde'), 2)} %`);

  paaVirheet = paaVirheet.concat(virheet);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

vaadi('1. uloszoomaus ei onnistu Ranskassa (390 px ja 1400 px)',
  zoomiTulokset.length === RUUDUT.length && zoomiTulokset.every((t) => t.ok),
  JSON.stringify(zoomiTulokset));
vaadi('2. maapaneeli on meren päällä — ei yhdenkään maan polygonissa',
  meriTulokset.length === RUUDUT.length && meriTulokset.every((t) => t.ok),
  JSON.stringify(meriTulokset));
vaadi('3. paneelin koko seuraa kartan mittakaavaa katkotta (3 zoomia)',
  suhdeTulokset.length === RUUDUT.length && suhdeTulokset.every((t) => t.ok),
  JSON.stringify(suhdeTulokset.map((t) => ({ ruutu: t.ruutu, hTulo: t.hTulo }))));
vaadi('5. saapumisnäkymä rajautuu aivan maan rajojen ulkopuolelle (tyhjä ≤ 3,5 %)',
  rajausTulokset.length === RUUDUT.length && rajausTulokset.every((t) => t.ok),
  JSON.stringify(rajausTulokset));
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('4. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ==================== VASTAKOKEET ================================= */

/* A: ULOSZOOMAUKSEN_KERROIN 3 → väitteen 1 on kaaduttava. */
vastakoe = 'A';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaa(sivu) : null;
  const vara = m ? m.maxAlt / m.alt - 1 : null;
  tieto('vastakoe A (kerroin 3)',
    `saapumiskorkeus ${p(m?.alt)}, katto ${p(m?.maxAlt)}, vara ${p(100 * (vara ?? 0), 1)} % `
    + `→ väite 1 ${vara != null && vara <= ULOSZOOMAUSVARA ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE A: kertoimella 3 uloszoomausväite kaatuu',
    Boolean(auki && m) && vara > ULOSZOOMAUSVARA, JSON.stringify({ auki, vara }));
  await ctx.close();
}

/* B: ankkuritaulu tyhjäksi → väitteen 2 on kaaduttava. */
vastakoe = 'B';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaa(sivu) : null;
  const osumat = m?.mitat ? maaosumat(m.mitat) : null;
  tieto('vastakoe B (ankkuri takaisin eteläreunaan)',
    `keskiylä ${p(m?.mitat?.lat, 3)} N / ${p(m?.mitat?.lng, 3)} E, maaosumia ${osumat?.length ?? '—'}`
    + `${osumat?.length ? ` (${[...new Set(osumat.map((o) => o.iso))].join(', ')})` : ''} `
    + `→ väite 2 ${osumat && osumat.length === 0 ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE B: eteläreunan ankkurilla meriväite kaatuu',
    Boolean(auki && osumat) && osumat.length > 0, JSON.stringify({ auki, osumia: osumat?.length }));
  await ctx.close();
}

/* C: MAAPANEELIN_SKAALA_MAX 3 → väitteen 3 on kaaduttava. */
vastakoe = 'C';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const tasot = [];
  if (auki) {
    for (const osuus of ZOOMITASOT) {
      await zoomaa(sivu, osuus);
      const s = await suhdeNyt(sivu);
      if (s) tasot.push({ alt: p(s.alt), skaala: p(s.skaala, 3), tulo: p(s.skaala * s.alt, 5) });
    }
  }
  const arvot = tasot.map((t) => t.tulo);
  const hajonta = arvot.length === 3
    ? (Math.max(...arvot) - Math.min(...arvot)) / (arvot.reduce((a, b) => a + b, 0) / 3) : Infinity;
  tieto('vastakoe C (SKAALA_MAX 3)',
    `${tasot.map((t) => `alt ${t.alt} → skaala ${t.skaala}, tulo ${t.tulo}`).join(' | ')}; `
    + `hajonta ${p(100 * hajonta, 2)} % `
    + `→ väite 3 ${hajonta <= SUHTEEN_VARA ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE C: katolla 3 skaalaväite kaatuu',
    auki && hajonta > SUHTEEN_VARA, JSON.stringify({ auki, hajonta }));
  await ctx.close();
}
/* D: rajaus takaisin laudan yksiköihin → väitteen 5 on kaaduttava. */
vastakoe = 'D';
{
  const tulokset = [];
  for (const ruutu of RUUDUT) {
    /* eslint-disable no-await-in-loop */
    const { ctx, sivu, auki } = await avaaPeli(ruutu);
    const r = auki ? await rajausNyt(sivu) : null;
    tulokset.push({ ruutu: ruutu.nimi, sitova: p(r?.sitova, 4), akseli: r?.akseli });
    tieto(`vastakoe D (${ruutu.nimi} px, rajaus laudan Mercator-yksiköistä)`,
      r ? `tyhjä X ${p(100 * r.tyhjaX, 2)} % · Y ${p(100 * r.tyhjaY, 2)} % → sitova `
        + `${r.akseli} ${p(100 * r.sitova, 2)} %` : 'EI MITATTAVISSA');
    await ctx.close();
    /* eslint-enable no-await-in-loop */
  }
  const kaatui = tulokset.some((t) => !(t.sitova >= 0) || t.sitova > TYHJAN_KATTO);
  tieto('vastakoe D', `→ väite 5 ${kaatui ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  vaadi('VASTAKOE D: laudan yksiköillä rajausväite kaatuu', kaatui, JSON.stringify(tulokset));
}
vastakoe = null;

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
