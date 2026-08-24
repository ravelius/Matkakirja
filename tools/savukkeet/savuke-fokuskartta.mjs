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
 *     TÄSMÄLLEEN FOKUS_POHJAT-taulun rajaukseen, ja maasta toiseen
 *     siirryttäessä kamera ajaa LEHDEN IKKUNAAN pehmeästi. Ele
 *     keskeyttää ajon eikä kartta hyppää maaliin.
 *
 * === MIKÄ MUUTTUI OMISTAJAN PELITESTIN JÄLKEEN (v1095) ===
 *
 * Kuva on nyt kokonainen OPAAKKI atlaksen lehti, ja sen mukana lähti
 * kolme asiaa, joita savuke ennen vaati:
 *
 *   - REITTIVÄITE POISTUI. Ennen savuke vaati, että rajaukseen osuvat
 *     reitit piirretään uudelleen kuvan päälle. Omistaja halusi
 *     pisteet ja katkoviivat pois näkyvistä, joten nyt vaaditaan
 *     päinvastoin: kuvan päällä EI ole reittikerrosta.
 *   - KAKSI LAATIKKOA. Kuva asetetaan `bbox`iin, mutta kamera ajaa
 *     `rajaus`-ikkunaan; ne eivät ole sama laatikko, ja vuoto niiden
 *     välissä on koko sauman esto.
 *   - PUNAINEN KOROSTUS JA MAASTONIMET POIS. Uudet väitteet 2f ja 2g.
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

// Kreikan oikeat laatikot pelilaudalla (tools/tee-fokuskartta.mjs,
// GRC.json 24.8.2026 v2 — maailmankartta, Millerin lieriö).
// Täsmälleen js/packs/fokus-grc.js FOKUS_POHJAT.GRC — rajaus luetaan
// nykyään reposta, ei ämpärin JSONista (CORS-korjaus 24.8.2026), joten
// savukkeen on verrattava samoihin lukuihin.
const BBOX = {
  x: 6329.2, y: 1681.71, w: 608.26, h: 380.16,
};
// Lehden ikkuna: tähän kamera ajaa, tämä on pelaajan näkymä.
const RAJAUS = {
  x: 6399.39, y: 1725.58, w: 467.89, h: 292.43,
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
        rajaus: RAJAUS,
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
    // Punainen maan ääriviiva ja laudan maastonimet pois lehden päältä.
    korostusNakyy: [...document.querySelectorAll('#board .country-korostus')]
      .some((p) => getComputedStyle(p).display !== 'none'),
    pohjaLuokka: document.body.classList.contains('fokuspohja'),
    // Kohderenkaat ovat liikkumisen ainoa kartalta tehtävä valinta:
    // niiden kerros ei saa kadota lehden mukana.
    kohdekerros: Boolean(document.querySelector('#board .targets')),
  };
});
vaadi('2a kuva ilmestyy laudalle', Boolean(kuva));
if (kuva) {
  const osuu = Math.abs(kuva.x - BBOX.x) < 0.01 && Math.abs(kuva.y - BBOX.y) < 0.01
    && Math.abs(kuva.w - BBOX.w) < 0.01 && Math.abs(kuva.h - BBOX.h) < 0.01;
  vaadi('2b kuva on täsmälleen JSONin rajauksessa', osuu, JSON.stringify(kuva));
  vaadi('2c reittejä EI piirretä kuvan päälle', kuva.reitteja === 0,
    `${kuva.reitteja} reittiä`);
  vaadi('2d kuvalla ei ole suodatinta (iOS)', !kuva.suodatin, String(kuva.suodatin));
  vaadi('2e kuva on kaupunkikerroksen alla', kuva.ennenKaupunkeja);
  vaadi('2f punainen maan korostus on piilossa lehden päältä',
    kuva.pohjaLuokka && !kuva.korostusNakyy,
    `luokka ${kuva.pohjaLuokka}, korostus näkyy ${kuva.korostusNakyy}`);
  vaadi('2g kohderenkaiden kerros on tallella', kuva.kohdekerros);
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
    x: n.x,
    leveys: n.w,
    muunnos: ui.svg.style.transform,
  };
});
vaadi('3b ajo päättyy', !perilla.ajossa);
vaadi('3c näkymä keskittyy lehden ikkunaan',
  Math.abs(perilla.keskiX - (RAJAUS.x + RAJAUS.w / 2)) < RAJAUS.w * 0.2
  && Math.abs(perilla.keskiY - (RAJAUS.y + RAJAUS.h / 2)) < RAJAUS.h * 0.25,
  `keski ${perilla.keskiX.toFixed(0)},${perilla.keskiY.toFixed(0)}`);
vaadi('3d lehden ikkuna mahtuu näkymään', perilla.leveys >= RAJAUS.w * 0.99,
  `näkyvä leveys ${perilla.leveys.toFixed(0)}`);
/*
 * SAUMA EI SAA NÄKYÄ: kamera näyttää lehden ikkunan ja kuvasuhteen
 * vaatiman ylimäärän, ja sen ylimäärän on mahduttava kuvan sisään.
 * Juuri tätä varten kuvassa on vuotoa (js/packs/fokus-grc.js).
 */
vaadi('3f näkyvä alue pysyy kuvan sisällä (ei saumaa)',
  perilla.x >= BBOX.x - 0.5 && perilla.x + perilla.leveys <= BBOX.x + BBOX.w + 0.5,
  `näkyvä x ${perilla.x.toFixed(0)}..${(perilla.x + perilla.leveys).toFixed(0)}, `
  + `kuva ${BBOX.x}..${(BBOX.x + BBOX.w).toFixed(0)}`);
vaadi('3e ajon muunnos on siivottu', !/scale/.test(perilla.muunnos), perilla.muunnos);

/*
 * Laudan omat maastonimet (Balkanvuoret ym.) eivät saa jäädä lehden
 * päälle kellumaan: lehdessä on omat nimensä omalla kirjasimellaan
 * (omistaja 24.8.2026). Testi tehdään VASTA KAMERA-AJON JÄLKEEN, koska
 * maastonimet piirretään vain näkyvälle alueelle ja riittävällä
 * zoomilla — yleiskuvassa niitä ei ole olemassa yhtään.
 */
await sivu.evaluate(() => window.matkakirja.ui.paivitaMaastonimet());
await sivu.waitForTimeout(400);
const nimet = await sivu.evaluate((b) => {
  const kaikki = [...document.querySelectorAll('.maastonimi')];
  const laatikossa = kaikki.filter((n) => {
    const x = Number(n.dataset.x); const y = Number(n.dataset.y);
    return Number.isFinite(x) && Number.isFinite(y)
      && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
  });
  return {
    kaikki: kaikki.length,
    laatikossa: laatikossa.length,
    nakyvia: laatikossa.filter((n) => getComputedStyle(n).display !== 'none').length,
  };
}, BBOX);
console.log(`      (maastonimiä ${nimet.kaikki}, lehden alueella ${nimet.laatikossa})`);
vaadi('3g laudan maastonimet eivät näy lehden alueella', nimet.nakyvia === 0,
  `${nimet.nakyvia} näkyvissä (${nimet.laatikossa} lehden alueella, `
  + `${nimet.kaikki} kaikkiaan)`);

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
  ele.jalkeenLeveys < ele.alkuLeveys && ele.jalkeenLeveys > RAJAUS.w * 1.05,
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
