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
import { KARTTANIMI_KOOT } from '../../js/karttanimet.js';
import { NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
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
 *   suunniteltu  uloszoomauksen kerroin 1,15 vs. saapumismarginaali
 *                1 + 2 × 0,05 = 1,10  →  4,5 % (mitattu työpöydällä
 *                4,55 %, puhelimella 0 %)
 *   mitattu vika  mittauspiikin jälkeen 49 % (puhelin, 14.9.2026)
 *   vastakoe A    kerroin 3            →  yli 150 %
 */
const ULOSZOOMAUSVARA = 0.08;
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
      .replace(/ULOSZOOMAUKSEN_KERROIN = [\d.]+/, 'ULOSZOOMAUKSEN_KERROIN = 3'));
  }
  if (vastakoe === 'B' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_ANKKURIT = \{[\s\S]*?\n\};/, 'MAAPANEELIN_ANKKURIT = {};'));
  }
  if (vastakoe === 'C' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_SKAALA_MAX = [\d.]+ \* MAAPANEELIN_TEKSTIKERROIN/,
        'MAAPANEELIN_SKAALA_MAX = 3'));
  }
  // D: erän 12 paneelikoko takaisin (kerroin 1) → tekstisuhdeväite kaatuu.
  if (vastakoe === 'D' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_TEKSTIKERROIN = [\d.]+/, 'MAAPANEELIN_TEKSTIKERROIN = 1'));
  }
  // E: erän 12 valikko takaisin (kaksi palstaa, kiinni kortissa).
  if (vastakoe === 'E' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/\.maapaneeli-valikko \{[\s\S]*?\n\}/, `.maapaneeli-valikko {
  position: absolute;
  top: calc(100% - 2px);
  right: -3px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  width: 105px;
  padding: 2.5px;
  background: var(--overlay-card);
  border: 0.5px solid var(--overlay-line);
  border-radius: 2.5px;
  pointer-events: auto;
}`));
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
  if (auki) await sivu.waitForTimeout(9000);
  /*
   * ...JA SEN JÄLKEEN ODOTETAAN, ETTÄ KAMERA ON PAIKALLAAN.
   * Mitattu 14.9.2026: kylmällä latauksella saapumisajo on 9 s:n
   * kohdalla joskus vielä kesken, ja kamera on silloin lähtökorkeudessa
   * (390 px: 0,0698 = sisin sallittu) eikä saapumisnäkymässä — väite 1
   * mittaisi kesken olevan liikkeen ja punastuisi satunnaisesti.
   * Odotetaan enintään 15 s, että kaksi peräkkäistä lukemaa eroavat
   * alle 0,5 %. Tämä EI löysää väitettä: mitta on yhä se korkeus,
   * johon peli itse jää, ja lepo on yhä vähintään erän 12 vaatimat 9 s.
   */
  if (auki) {
    let edellinen = null;
    for (let i = 0; i < 30; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const nyt = await sivu.evaluate(() => window.matkakirja.ui.pallolauta
        .pallo.pointOfView().altitude);
      if (edellinen != null && Math.abs(nyt - edellinen) / nyt < 0.005) break;
      edellinen = nyt;
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(500);
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


/**
 * ERÄ 13 — VÄITE 5: PANEELIN LEIPÄTEKSTI ON NOSTON TEKSTIN KOKOINEN.
 *
 * Molemmat mitataan RUUDULTA eikä koodivakiosta: kumpikin fonttikoko
 * kerrotaan sillä muunnosketjulla, joka elementin päällä oikeasti on.
 * Noston nimiö on rasteri, joten sen "fonttikoko" on piirtoyksikkö
 * NOSTOSYM_NIMIO_KOKO kerrottuna ryhmän mittakaavalla — sama luku,
 * jonka selain latoisi, jos nimiö olisi <text>.
 */
const tekstiKoot = (sivu, nimioKoko) => sivu.evaluate((koko) => {
  const ketju = (el) => {
    let s = 1;
    let n = el;
    while (n && n !== document.documentElement) {
      const t = getComputedStyle(n).transform;
      if (t && t !== 'none') { const m = new DOMMatrixReadOnly(t); s *= Math.hypot(m.a, m.b); }
      n = n.parentElement;
    }
    return s;
  };
  const g = document.querySelector('.pallolauta-nosto .pallolauta-nosto-siirto');
  const arvo = document.querySelector('.maapaneeli-arvo');
  return {
    nosto: g ? koko * ketju(g) : null,
    paneeli: arvo ? parseFloat(getComputedStyle(arvo).fontSize) * ketju(arvo) : null,
  };
}, nimioKoko);

/**
 * ERÄ 13 — VÄITE 6: LISÄÄ-VALIKKO ON YHDELLÄ RIVILLÄ JA IRTI KORTISTA.
 *
 * Rivien määrä luetaan nappien ruutupaikoista (eri y = eri rivi), ei
 * CSS:n `grid-template-columns`ista: mitta on se, minkä pelaaja näkee.
 * Rako mitataan kortin alareunan ja valikon yläreunan väliltä (tai
 * ylöspäin auetessa toisin päin), ja päällekkäisyys on oma testinsä.
 */
const valikonMitat = async (sivu) => {
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-lisaa')?.click(); });
  await sivu.waitForTimeout(600);
  const ulos = await sivu.evaluate(() => {
    const kortti = document.querySelector('.maapaneeli-kortti');
    const valikko = document.querySelector('.maapaneeli-valikko');
    const plus = document.querySelector('.maapaneeli-lisaa');
    if (!kortti || !valikko || valikko.hidden) return { auki: false };
    const r = valikko.getBoundingClientRect();
    const k = kortti.getBoundingClientRect();
    const pr = plus.getBoundingClientRect();
    const napit = [...valikko.querySelectorAll('.maapaneeli-aihe')]
      .map((b) => { const bb = b.getBoundingClientRect(); return { y: bb.top, w: bb.width, h: bb.height }; });
    const rivit = new Set(napit.map((n) => Math.round(n.y * 10) / 10)).size;
    const nappiAla = napit.reduce((a, n) => a + n.w * n.h, 0);
    return {
      auki: true,
      rivit,
      napit: napit.length,
      w: r.width,
      h: r.height,
      // Tyhjä tila = valikon ala, joka ei ole nappia (pehmuste + välit).
      tyhja: 1 - nappiAla / (r.width * r.height),
      rako: r.top >= k.bottom ? r.top - k.bottom : k.top - r.bottom,
      leikkaa: r.left < k.right && r.right > k.left && r.top < k.bottom && r.bottom > k.top,
      plusKeskiKortista: pr.top + pr.height / 2 - k.top,
      skaala: k.width / kortti.offsetWidth,
    };
  });
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-lisaa')?.click(); });
  await sivu.waitForTimeout(300);
  return ulos;
};

/**
 * OMISTAJAN RUUTULUOKKA on tekstisuhteen ankkuri (ks.
 * js/pallolauta/maapaneeli.js MAAPANEELIN_TEKSTIKERROIN): paneeli on
 * karttaan sidottu ja noston nimiö ruutuvakio, joten suhde on 1,00
 * tasan yhdellä kartan mittakaavalla. Muiden ruutujen suhteet
 * kirjataan INFOna.
 */
const ANKKURIRUUTU = { nimi: '2560', leveys: 2560, korkeus: 1352 };
/** Väitteen 5 vara: omistajan sana on "samaa luokkaa", mitta 5 %. */
const TEKSTIVARA = 0.05;

const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];

const zoomiTulokset = [];
const tekstiTulokset = [];
const valikkoTulokset = [];
const meriTulokset = [];
const suhdeTulokset = [];
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

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

  /* --- 5./6. tekstisuhde ja valikko (erä 13) ------------------- */
  await zoomaa(sivu, 1);
  const t = await tekstiKoot(sivu, NOSTOSYM_NIMIO_KOKO);
  tekstiTulokset.push({ ruutu: ruutu.nimi, ...t, suhde: p(t.paneeli / t.nosto, 4) });
  tieto(`${ruutu.nimi} px · tekstikoot saapumisnäkymässä`,
    `noston nimiö ${p(t.nosto, 3)} px, paneelin leipäteksti ${p(t.paneeli, 3)} px, `
    + `suhde ${p(t.paneeli / t.nosto, 3)} (ankkuri on ${ANKKURIRUUTU.nimi} px, INFO tässä)`);
  const v = await valikonMitat(sivu);
  valikkoTulokset.push({ ruutu: ruutu.nimi, ...v,
    ok: Boolean(v.auki) && v.rivit === 1 && !v.leikkaa && v.rako > 0 });
  tieto(`${ruutu.nimi} px · lisää-valikko`,
    v.auki
      ? `${v.napit} nappia ${v.rivit} rivillä, ${p(v.w, 1)} × ${p(v.h, 1)} px, `
        + `tyhjää tilaa ${p(100 * v.tyhja, 1)} %, rako korttiin ${p(v.rako, 2)} px, `
        + `leikkaa korttia: ${v.leikkaa ? 'KYLLÄ' : 'ei'}, plussan keskilinja `
        + `${p(v.plusKeskiKortista, 2)} px kortin yläreunasta (skaala ${p(v.skaala, 3)})`
      : 'EI AUENNUT');

  paaVirheet = paaVirheet.concat(virheet);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

/* --- 5. tekstisuhde ankkuriruudulla (erä 13) --------------------- */
let ankkuriSuhde = null;
{
  const { ctx, sivu, auki } = await avaaPeli(ANKKURIRUUTU);
  /*
   * MITATAAN SAAPUMISNÄKYMÄSSÄ SELLAISENAAN, EI ZOOMIKATOSSA.
   * Kerroin on kalibroitu juuri siihen korkeuteen, johon peli itse jää;
   * katto on työpöydällä 4,5 % ulompana (ks. väite 1), ja siellä
   * mitattuna sama paneeli antaisi suhteeksi 0,96. `avaaPeli` odottaa
   * jo, että kamera on paikallaan, joten tässä ei kosketa kameraan.
   */
  const t = auki ? await tekstiKoot(sivu, NOSTOSYM_NIMIO_KOKO) : null;
  ankkuriSuhde = t && t.nosto > 0 ? t.paneeli / t.nosto : null;
  tieto(`${ANKKURIRUUTU.nimi} px · tekstisuhde (ANKKURI)`,
    `noston nimiö ${p(t?.nosto, 3)} px, paneelin leipäteksti ${p(t?.paneeli, 3)} px, `
    + `suhde ${p(ankkuriSuhde, 4)} (raja 1,00 ± ${100 * TEKSTIVARA} %)`);
  await ctx.close();
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
vaadi('5. paneelin leipäteksti / noston teksti = 1,00 ± 5 % (ankkuriruutu)',
  ankkuriSuhde != null && Math.abs(ankkuriSuhde - 1) <= TEKSTIVARA,
  JSON.stringify({ ankkuriSuhde, muut: tekstiTulokset }));
vaadi('6. lisää-valikko on yhdellä rivillä ja irti kortista (390 px ja 1400 px)',
  valikkoTulokset.length === RUUDUT.length && valikkoTulokset.every((t) => t.ok),
  JSON.stringify(valikkoTulokset.map((t) => ({ ruutu: t.ruutu, rivit: t.rivit,
    rako: t.rako, leikkaa: t.leikkaa }))));
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
/* D: MAAPANEELIN_TEKSTIKERROIN 1 (erän 12 koko) → väitteen 5 on kaaduttava. */
vastakoe = 'D';
{
  const { ctx, sivu, auki } = await avaaPeli(ANKKURIRUUTU);
  const t = auki ? await tekstiKoot(sivu, NOSTOSYM_NIMIO_KOKO) : null;
  const suhde = t && t.nosto > 0 ? t.paneeli / t.nosto : null;
  tieto('vastakoe D (TEKSTIKERROIN 1)',
    `noston nimiö ${p(t?.nosto, 3)} px, paneelin leipäteksti ${p(t?.paneeli, 3)} px, `
    + `suhde ${p(suhde, 4)} → väite 5 `
    + `${suhde != null && Math.abs(suhde - 1) <= TEKSTIVARA ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE D: erän 12 kertoimella tekstisuhdeväite kaatuu',
    suhde != null && Math.abs(suhde - 1) > TEKSTIVARA, JSON.stringify({ auki, suhde }));
  await ctx.close();
}

/* E: erän 12 valikkotyyli → väitteen 6 on kaaduttava. */
vastakoe = 'E';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 1400, korkeus: 900 });
  const v = auki ? await valikonMitat(sivu) : null;
  tieto('vastakoe E (erän 12 valikko: kaksi palstaa, kiinni kortissa)',
    v?.auki
      ? `${v.napit} nappia ${v.rivit} rivillä, rako ${p(v.rako, 2)} px, `
        + `leikkaa: ${v.leikkaa ? 'KYLLÄ' : 'ei'} → väite 6 `
        + `${v.rivit === 1 && !v.leikkaa && v.rako > 0 ? 'LÄPI (paha)' : 'PUNAINEN'}`
      : 'EI AUENNUT');
  vaadi('VASTAKOE E: erän 12 valikkotyylillä valikkoväite kaatuu',
    Boolean(v?.auki) && (v.rivit !== 1 || v.leikkaa || !(v.rako > 0)),
    JSON.stringify(v));
  await ctx.close();
}
vastakoe = null;

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
