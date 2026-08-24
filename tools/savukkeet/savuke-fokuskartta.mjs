/*
 * Savuke: fokusmoodin maakohtainen topografiapohja (paketti 2,
 * js/fokuskartta.js + js/kartta.js kamera-ajo).
 *
 * Kuvat asuvat ämpärissä eikä repossa, joten savuke ei lataa mitään
 * verkosta: se korvaa `fokus/`-polun omalla vastauksellaan. Kaksi ajoa,
 * ja juuri se on koko testin idea:
 *
 *  1. PUUTTUVA POHJA (404). Kerroksen on jäätävä tyhjäksi ja pelin
 *     toimittava täsmälleen kuten ennen pakettia 2 — laatta, nimi ja
 *     kartta paikoillaan. Tämä on se polku, jolla peli on kaikissa
 *     muissa maissa kuin Kreikassa.
 *  2. OLEMASSA OLEVA POHJA. Kuva ilmestyy laudan koordinaatteihin
 *     TÄSMÄLLEEN JSONin rajaukseen, reitit piirtyvät sen päälle, ja
 *     maasta toiseen siirryttäessä kamera ajaa rajaukseen pehmeästi.
 *     Ele keskeyttää ajon eikä kartta hyppää maaliin.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
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

// Kreikan oikea rajaus pelilaudalla (tools/tee-fokuskartta.mjs,
// GRC.json 24.8.2026 — maailmankartta, Millerin lieriö).
const BBOX = {
  // Täsmälleen js/packs/fokus-grc.js FOKUS_POHJAT.GRC.bbox — rajaus
  // luetaan nykyään repsta, ei ämpärin JSONista (CORS-korjaus
  // 24.8.2026), joten savukkeen on verrattava samoihin lukuihin.
  x: 6488.94, y: 1722.84, w: 241.91, h: 285.01,
};
// Pienin mahdollinen kelvollinen PNG: savuke tutkii sijoittelua, ei
// kuvan sisältöä.
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1112 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());

/** Fokuspohjan vastaus: 'puuttuu' | 'ok' | 'vaara-lauta'. */
let vaihe = 'puuttuu';
await sivu.route('**/fokus/**', (route) => {
  const url = route.request().url();
  if (vaihe === 'puuttuu') { route.fulfill({ status: 404, body: 'ei' }); return; }
  if (url.endsWith('.json')) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        iso: 'GRC',
        // Väärän laudan rajaus on samannäköinen mutta toisen
        // projektion koordinaateissa: peli ei saa käyttää sitä.
        lauta: vaihe === 'vaara-lauta' ? 'europe' : 'maailmankartta',
        bbox: BBOX,
        tiedosto: 'GRC.png',
      }),
    });
    return;
  }
  route.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
});

/** Peli käyntiin Ateenaan (Kreikka on pilottimaa). */
async function peliAteenaan() {
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1200);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
    window.matkakirja.ui.render();
  });
  await sivu.waitForTimeout(1500);
}

/* ---------------------------------------------------------- 1. puuttuva */

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);
await peliAteenaan();
await sivu.waitForTimeout(800);

const ilman = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    maa: ui.game.pack.map.cityCountry[ui.game.cityOf().id],
    kerros: Boolean(ui.fokuskarttaKerros),
    lapsia: ui.fokuskarttaKerros?.childElementCount ?? -1,
    laatta: Boolean(document.querySelector('#board .city')),
    nimia: document.querySelectorAll('#board .city-label').length,
  };
});
vaadi('1a fokuskerros on olemassa', ilman.kerros);
vaadi('1a pelaaja on Kreikassa', ilman.maa === 'GRC', `maa ${ilman.maa}`);
vaadi('1b puuttuva pohja jättää kerroksen tyhjäksi', ilman.lapsia === 0,
  `lapsia ${ilman.lapsia}`);
vaadi('1c lauta piirtyy silti', ilman.laatta && ilman.nimia > 0,
  `laatta ${ilman.laatta}, nimiä ${ilman.nimia}`);

/* ----------------------------------------------------------- 2. pohja */

vaihe = 'ok';
// Uusi lataus: moduulin muisti puuttuvasta pohjasta nollautuu, ja peli
// jatkuu tallennuksesta samasta kaupungista.
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(1500);

const kuva = await sivu.evaluate(() => {
  const im = document.querySelector('#board .fokuskartta-kuva');
  if (!im) return null;
  return {
    x: Number(im.getAttribute('x')),
    y: Number(im.getAttribute('y')),
    w: Number(im.getAttribute('width')),
    h: Number(im.getAttribute('height')),
    suodatin: im.getAttribute('filter'),
    reitteja: document.querySelectorAll('#board .fokuskartta-reitit .route').length,
    // Kerrosjärjestys: kuvan on oltava kaupunkien ALLA.
    ennenKaupunkeja: Boolean(document.querySelector('#board .fokuskartta')
      ?.compareDocumentPosition(document.querySelector('#board .cities'))
      & Node.DOCUMENT_POSITION_FOLLOWING),
  };
});
vaadi('2a kuva ilmestyy laudalle', Boolean(kuva));
if (kuva) {
  const osuu = Math.abs(kuva.x - BBOX.x) < 0.01 && Math.abs(kuva.y - BBOX.y) < 0.01
    && Math.abs(kuva.w - BBOX.w) < 0.01 && Math.abs(kuva.h - BBOX.h) < 0.01;
  vaadi('2b kuva on täsmälleen JSONin rajauksessa', osuu, JSON.stringify(kuva));
  vaadi('2c reitit piirtyvät kuvan päälle', kuva.reitteja > 0, `${kuva.reitteja} reittiä`);
  vaadi('2d kuvalla ei ole suodatinta (iOS)', !kuva.suodatin, String(kuva.suodatin));
  vaadi('2e kuva on kaupunkikerroksen alla', kuva.ennenKaupunkeja);
}

/* ------------------------------------------------- 3. kamera-ajo maahan */

// Saapuminen toisesta maasta: kerros luulee tulevansa Italiasta, jolloin
// päivitys on saapuminen eikä laudan ensimmäinen piirto.
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(-1);
  ui.fokuskarttaAvain = 'ITA';
  ui.paivitaFokusKerros();
});
await sivu.waitForTimeout(300);
const kesken = await sivu.evaluate(() => window.matkakirja.ui.kartta.kameraAjossa());
vaadi('3a kamera lähtee ajoon', kesken);
await sivu.waitForTimeout(2600);
const perilla = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const n = ui.nakyvaAlue();
  return {
    ajossa: ui.kartta.kameraAjossa(),
    keskiX: n.x + n.w / 2,
    keskiY: n.y + n.h / 2,
    leveys: n.w,
    muunnos: ui.svg.style.transform,
  };
});
vaadi('3b ajo päättyy', !perilla.ajossa);
vaadi('3c näkymä keskittyy maan rajaukseen',
  Math.abs(perilla.keskiX - (BBOX.x + BBOX.w / 2)) < BBOX.w * 0.2
  && Math.abs(perilla.keskiY - (BBOX.y + BBOX.h / 2)) < BBOX.h * 0.25,
  `keski ${perilla.keskiX.toFixed(0)},${perilla.keskiY.toFixed(0)}`);
vaadi('3d rajaus mahtuu näkymään', perilla.leveys > BBOX.w,
  `näkyvä leveys ${perilla.leveys.toFixed(0)}`);
vaadi('3e ajon muunnos on siivottu', !/scale/.test(perilla.muunnos), perilla.muunnos);

/* --------------------------------------------------- 4. ele keskeyttää */

const ele = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.kartta.zoomaaPainikkeella(-1);
  const alku = ui.nakyvaAlue();
  ui.kartta.ajaKamera({
    bbox: {
      x: 6488.9, y: 1722.8, w: 241.9, h: 285,
    },
  });
  await new Promise((r) => setTimeout(r, 260));
  const kesken = ui.nakyvaAlue();
  // Sormi kartalle: kaappausvaiheen kuuntelija pysäyttää ajon.
  const pane = ui.svg.parentElement;
  pane.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true, pointerId: 1, clientX: 400, clientY: 500,
  }));
  await new Promise((r) => setTimeout(r, 500));
  const jalkeen = ui.nakyvaAlue();
  return {
    ajossa: ui.kartta.kameraAjossa(),
    alkuLeveys: alku.w,
    keskenLeveys: kesken.w,
    jalkeenLeveys: jalkeen.w,
  };
});
vaadi('4a ele pysäyttää ajon', !ele.ajossa);
vaadi('4b kartta jää siihen mihin ajo ehti, ei hyppää maaliin',
  ele.jalkeenLeveys < ele.alkuLeveys && ele.jalkeenLeveys > BBOX.w * 1.05,
  `alku ${ele.alkuLeveys.toFixed(0)} → kesken ${ele.keskenLeveys.toFixed(0)} `
  + `→ jäi ${ele.jalkeenLeveys.toFixed(0)}`);

/* ------------------------------------------------- 5. väärä lauta pois */

/*
 * Rajaus luetaan nykyään repon FOKUS_POHJAT-taulusta, jossa on
 * lauta-kenttä ('maailmankartta'). Väärä lauta simuloidaan vaihtamalla
 * pelin pack.id hetkeksi: haePohja saa lauta-arvon sieltä, ja
 * FOKUS_POHJAT.GRC.lauta ei täsmää → kuvaa ei saa käyttää, koska
 * rajaus on toisen projektion koordinaateissa.
 */
const vaara = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const oikeaId = ui.game.pack.id;
  ui.game.pack.id = 'europe';
  ui.fokuskarttaAvain = null;
  if (ui.fokuskarttaKerros) ui.fokuskarttaKerros.textContent = '';
  ui.render();
  await new Promise((s) => setTimeout(s, 800));
  const tulos = {
    kuvia: document.querySelectorAll('#board .fokuskartta-kuva').length,
    laatta: Boolean(document.querySelector('#board .city')),
  };
  ui.game.pack.id = oikeaId;
  ui.fokuskarttaAvain = null;
  return tulos;
});
vaadi('5a toisen laudan rajausta ei käytetä', vaara.kuvia === 0, `${vaara.kuvia} kuvaa`);
vaadi('5b peli toimii silti', vaara.laatta);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
