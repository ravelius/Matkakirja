/*
 * SELAINSAVUKE: JATKUVA ATLAS JA KEHITTÄJÄN YLÄRIVIN NAPIT
 *
 *   node tools/savuke-atlas.mjs
 *
 * Omistajan tilaus 25.8.2026: (1) fokuskarttapiirros piirretään koko
 * ajan niin, että valmistuneiden maiden lehdet näkyvät kartalla
 * samanaikaisesti — mutta laiskasti näkymän mukaan, koska 39 lehteä on
 * purettuna noin 3,7 gigatavua; (2) ylärivin kaksi kehittäjänappia ovat
 * "rajat" (pelaajan liikkuvuusrajoite päälle/pois) ja "pisteet" (laudan
 * kaupungit ja reittiverkko fokuskartan päälle, jotta kaupunkiin näkee
 * hypätä).
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI. Atlaksen valinta lasketaan NÄKYVÄSTÄ
 * ALUEESTA (ui.nakyvaAlue), joka on olemassa vasta kun kartalla on
 * viewBox, zoomi ja paneelin mitat. Sama koskee LRU-vapautusta: se
 * mitataan DOMista, koska juuri DOMista irrottaminen vapauttaa puretun
 * kuvan.
 *
 * LEHDET VÄÄRENNETÄÄN. Ämpärin oikeat webpit ovat 1–2 Mt kappale, eikä
 * savuke saa riippua verkosta. Jokainen fokuslehtipyyntö vastataan
 * samalla pikkuruisella PNG:llä: peli ei katso kuvan sisältöä, vaan
 * kaikki testattava (valinta, laiskuus, vapautus) tapahtuu ennen kuin
 * yhtäkään pikseliä piirretään. Pyynnöt lasketaan, ja juuri niiden
 * määrä on väite: 39:stä lehdestä haetaan vain kourallinen.
 *
 * HUOM VÄÄRENNÖKSEN SIVUVAIKUTUS: koska valelehti on yhden pikselin
 * kokoinen, atlaksen MEGAPIKSELIKATTO (js/fokuskartta.js
 * ATLAS_MEGAPIKSELIA) ei täyty koskaan, ja valinta ottaa enemmän
 * lehtiä kuin oikeilla kuvilla. Savuke todistaa siis valinnan,
 * laiskuuden ja vapautuksen — ei muistibudjetin osumaa. Budjetti on
 * mitattu erikseen (ks. moduulin johdanto: 25,6 Mp ≈ 102 Mt lehti).
 *
 * VÄITTEET:
 *   1. Kohdemaan lehti on kartalla ja saa oman ryhmänsä (.fokus-lehti).
 *   2. Lähikuvassa naapureita ei ladata turhaan.
 *   3. Loitonnettaessa naapurilehdet piirtyvät atlakseen (.fokus-atlas).
 *   4. Laiska lataus: haettujen lehtien määrä on murto-osa kaikista.
 *   5. Näkymästä poistuneet lehdet vapautetaan (LRU).
 *   6. Ylärivissä ovat "rajat" ja "pisteet", valikossa fokus + sumennus.
 *   7. "rajat" kytkee pelaajan liikkuvuusrajoitteen päälle.
 *   8. "pisteet" piirtää kaupungit ja reittiverkon kartalle.
 *   9. Kaupungin napautus hyppää sinne kehittäjätilassa.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8752, r));

/* Yksivärinen 1 x 1 PNG: kelvollinen kuva, jonka purku ei maksa mitään. */
const PIKKUKUVA = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
);

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();

const pyynnot = [];
await sivu.route((url) => /julisteet\/fokus\/.*\.webp$/.test(url.href), (route) => {
  pyynnot.push(route.request().url().split('/').pop().replace('.webp', ''));
  route.fulfill({ status: 200, contentType: 'image/png', body: PIKKUKUVA });
});
// Muu ulkomaailma katkaistaan — mutta EI fokuslehtiä, jotka yllä oleva
// reitti vastaa itse. Playwrightissa myöhemmin rekisteröity reitti
// voittaa, joten poikkeus on kirjoitettava tähän ehtoon.
await sivu.route(
  (url) => !/127\.0\.0\.1|localhost/.test(url.href)
    && !/julisteet\/fokus\/.*\.webp$/.test(url.href),
  (route) => route.abort(),
);

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Aloittaa pelin ja siirtää nappulan Ateenaan. */
async function ateenaan() {
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
    await new Promise((r) => setTimeout(r, 2500));
  });
  await sivu.waitForTimeout(1500);
}

await sivu.goto('http://127.0.0.1:8752/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();

const tila = () => sivu.evaluate(() => ({
  oma: window.matkakirja.ui.fokuskarttaAvain,
  lehti: document.querySelectorAll('.fokus-lehti image').length,
  atlas: [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])],
  kuvia: document.querySelectorAll('.fokus-atlas image').length,
}));

const a = await tila();
vaadi('kohdemaan lehti on omassa ryhmässään kartalla',
  a.oma === 'GRC' && a.lehti === 1, JSON.stringify(a));
vaadi('lähikuvassa naapureita ei ladata turhaan',
  a.atlas.length <= 2, `atlas=${a.atlas}`);

/* Kehittäjätila päälle, jotta kamera pääsee lehden ikkunan ulkopuolelle. */
await sivu.evaluate(() => {
  localStorage.setItem('matkakirja-kehittaja', '1');
  window.matkakirja.ui.paivitaKehittajaTila();
});
await sivu.waitForTimeout(1200);

/** Ajaa kameran kohdemaan ikkunaan kerrottuna ja odottaa asettumista. */
async function loitonna(kerroin) {
  await sivu.evaluate(async (k) => {
    const { ui } = window.matkakirja;
    const p = ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox;
    await ui.kartta.ajaKamera({
      bbox: {
        x: p.x - (p.w * (k - 1)) / 2,
        y: p.y - (p.h * (k - 1)) / 2,
        w: p.w * k,
        h: p.h * k,
      },
      marginaali: 0,
    }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 300));
    ui.paivitaMaastonimet();
  }, kerroin);
  await sivu.waitForTimeout(3000);
}

pyynnot.length = 0;
await loitonna(3);
const b = await tila();
vaadi('loitonnettaessa naapurilehdet piirtyvät atlakseen',
  b.atlas.length >= 1 && b.kuvia === b.atlas.length, `atlas=${b.atlas}`);

const haetut = [...new Set(pyynnot)];
vaadi('laiska lataus: 39 lehdestä haettiin vain näkymän lehdet',
  haetut.length > 0 && haetut.length <= 5, `haetut=${haetut.join(',')}`);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-loitonnettu.png') });

/* --- LRU: näkymästä poistuneet vapautetaan --- */
const c = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const pohjat = (await import('./js/packs/fokus-grc.js')).FOKUS_POHJAT;
  await ui.kartta.ajaKamera({ x: 5300, y: 1100, kerroin: 3 }, { kesto: 0 });
  await new Promise((r) => setTimeout(r, 600));
  ui.paivitaMaastonimet();
  await new Promise((r) => setTimeout(r, 1500));
  const n = ui.nakyvaAlue();
  // Vara on 30 % näkymän mitasta kumpaankin suuntaan (ATLAS_VARA).
  const vara = {
    x: n.x - n.w * 0.3, y: n.y - n.h * 0.3, w: n.w * 1.6, h: n.h * 1.6,
  };
  const leikkaa = (t) => t.x < vara.x + vara.w && t.x + t.w > vara.x
    && t.y < vara.y + vara.h && t.y + t.h > vara.y;
  const atlas = [...(ui.atlasLehdet?.keys() ?? [])];
  return {
    atlas,
    ulkopuolella: atlas.filter((iso) => !leikkaa(pohjat[iso].bbox)),
    kuvia: document.querySelectorAll('.fokus-atlas image').length,
  };
});
vaadi('LRU vapauttaa näkymästä poistuneet lehdet',
  c.ulkopuolella.length === 0 && c.kuvia === c.atlas.length,
  `atlas=${c.atlas} ulkopuolella=${c.ulkopuolella}`);

/* --- kehittäjänapit (sivu uusiksi, jotta main.js näyttää kotelon) --- */
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await ateenaan();

const napit = await sivu.evaluate(() => ({
  kotelo: !document.getElementById('fokus-kytkimet').hidden,
  rajat: document.getElementById('kehittaja-rajat-btn')?.textContent,
  pisteet: document.getElementById('kehittaja-pisteet-btn')?.textContent,
  valikossa: Boolean(document.getElementById('fokus-btn')
    && document.getElementById('fokus-sumennus-btn')),
}));
vaadi('ylärivissä rajat + pisteet, valikossa fokus + sumennus',
  napit.kotelo && napit.rajat === 'rajat' && napit.pisteet === 'pisteet' && napit.valikossa,
  JSON.stringify(napit));

const rajat = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const lue = () => ({ alue: Boolean(ui.kartta.valloitettuAlue()), sumu: ui.fokusSumuPaalla() });
  const ennen = lue();
  document.getElementById('kehittaja-rajat-btn').click();
  return { ennen, jalkeen: lue() };
});
vaadi('"rajat" kytkee pelaajan liikkuvuusrajoitteen päälle',
  !rajat.ennen.alue && !rajat.ennen.sumu && rajat.jalkeen.alue && rajat.jalkeen.sumu,
  JSON.stringify(rajat));
await sivu.evaluate(() => document.getElementById('kehittaja-rajat-btn').click());
await sivu.waitForTimeout(400);

const pisteet = await sivu.evaluate(() => {
  const ennen = document.querySelectorAll('.dev-pisteet').length;
  document.getElementById('kehittaja-pisteet-btn').click();
  const g = document.querySelector('.dev-pisteet');
  return {
    ennen,
    kaupunkeja: g?.querySelectorAll('.dev-kaupunki').length ?? 0,
    reitteja: g?.querySelectorAll('.dev-reitti').length ?? 0,
    tallessa: localStorage.getItem('matkakirja-kehittaja-pisteet'),
  };
});
vaadi('"pisteet" piirtää kaupungit ja reittiverkon',
  pisteet.ennen === 0 && pisteet.kaupunkeja > 50 && pisteet.reitteja > 50
  && pisteet.tallessa === '1', JSON.stringify(pisteet));
await sivu.waitForTimeout(600);
await sivu.screenshot({ path: join(ULOS, 'savuke-atlas-pisteet.png') });

const hyppy = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const ennen = game.cityOf()?.id;
  const kohde = game.board.cities.find((c) => c.id === 'sofia') ?? game.board.cities[3];
  const osuma = [...ui.targetLayer.querySelectorAll('.target-hit')]
    .find((o) => Math.abs(Number(o.getAttribute('cx')) - kohde.x) < 1
      && Math.abs(Number(o.getAttribute('cy')) - kohde.y) < 1);
  osuma?.parentElement?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 2500));
  return { ennen, kohde: kohde.id, jalkeen: game.cityOf()?.id };
});
vaadi('kaupungin napautus hyppää sinne kehittäjätilassa',
  hyppy.jalkeen === hyppy.kohde, JSON.stringify(hyppy));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
