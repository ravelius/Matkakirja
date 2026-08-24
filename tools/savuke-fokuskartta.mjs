/*
 * SELAINSAVUKE: KAMERA PELIN KÄSISSÄ — panorointi valloitetulle alueelle.
 *
 *   node tools/savuke-fokuskartta.mjs
 *
 * Raamatun osio "Fokusmoodi", kohta KAMERA PELIN KÄSISSÄ (omistaja
 * 24.8.2026 illalla, tarkennettu saman illan pelitestissä): peli ajaa
 * kameran itse, ja käsin karttaa saa liikuttaa VAIN VALLOITETULLA
 * ALUEELLA JA SEN LÄHEISYYDESSÄ. Kehittäjätilassa panorointi on vapaa
 * kuten ennen.
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI. Rajaus elää ruudun mitoissa: se
 * lasketaan paneelin leveydestä, zoomin mittakaavasta ja laudan
 * viewBoxista. Yksikään näistä ei ole olemassa ilman selainta, ja juuri
 * niiden yhteispelissä vika olisi (väärä akseli, väärä origo, väärä
 * mittakaava) — täsmälleen se vikaluokka, joka on kaatanut kartan
 * eleitä ennenkin (js/kartta.js laudanKuvaus).
 *
 * VÄITTEET:
 *   1. Fokusmoodissa valloitettu alue on olemassa ja pelikaupunki on
 *      sen sisällä.
 *   2. Sormella vetäminen liikuttaa karttaa — panorointia EI ole
 *      poistettu.
 *   3. Pitkä veto ei vie näkymän keskipistettä alueen ulkopuolelle.
 *   4. Kehittäjätilassa rajausta ei ole (alue on null) ja sama veto vie
 *      kauemmas.
 *   5. Pelin oma kamera-ajo EI ole rajattu: se vie näkymän alueen
 *      ulkopuolelle silloin kun peli niin haluaa.
 *   6. Elekeskeytys toimii: kosketus kartalla pysäyttää kamera-ajon.
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
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
await new Promise((r) => palvelin.listen(8741, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const ctx = await selain.newContext({ viewport: { width: 430, height: 930 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

await sivu.goto('http://127.0.0.1:8741/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2500);

const alku = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') {
    game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  }
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
  await new Promise((r) => setTimeout(r, 1500));
  return { kaupunki: game.cityOf()?.id, fokus: ui.fokusmoodi === true };
});
vaadi('fokusmoodi päällä ja nappula Ateenassa',
  alku.kaupunki === 'ateena' && alku.fokus, JSON.stringify(alku));

/** Näkymän keskipiste laudan yksiköissä — sama kaava kuin kartta.js:ssä. */
const keskipiste = () => sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const pane = ui.svg.parentElement;
  const box = ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
  const ylaReuna = ui.zoomYlaReuna ?? box.y;
  return {
    x: box.x + (pane.clientWidth / 2 - (ui.panX ?? 0)) / ui.zoomSkaala,
    y: ylaReuna + (pane.clientHeight / 2 - (ui.panY ?? 0)) / ui.zoomSkaala,
    panX: ui.panX,
    panY: ui.panY,
  };
});

const alue = await sivu.evaluate(() => {
  const a = window.matkakirja.ui.kartta.valloitettuAlue();
  const city = window.matkakirja.game.cityOf();
  return a ? { ...a, cityX: city.x, cityY: city.y } : null;
});
vaadi('valloitettu alue on olemassa ja pelikaupunki on sen sisällä',
  Boolean(alue) && alue.cityX > alue.x0 && alue.cityX < alue.x1
    && alue.cityY > alue.y0 && alue.cityY < alue.y1,
  JSON.stringify(alue));

/** Yksi pitkä veto kartan yli. Palauttaa keskipisteen ennen ja jälkeen. */
async function veda(dx, dy) {
  const laatikko = await sivu.evaluate(() => {
    const r = window.matkakirja.ui.svg.parentElement.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const ennen = await keskipiste();
  const x0 = laatikko.x + laatikko.w / 2;
  const y0 = laatikko.y + laatikko.h / 2;
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  for (let i = 1; i <= 12; i += 1) {
    await sivu.mouse.move(x0 + (dx * i) / 12, y0 + (dy * i) / 12);
    await sivu.waitForTimeout(16);
  }
  await sivu.mouse.up();
  // Liuku saa hiipua loppuun ennen mittausta.
  await sivu.waitForTimeout(1400);
  const jalkeen = await keskipiste();
  return { ennen, jalkeen };
}

// Lyhyt veto: kartan pitää liikkua (panorointia ei ole poistettu).
const lyhyt = await veda(-90, 0);
vaadi('sormiveto liikuttaa karttaa',
  Math.abs(lyhyt.jalkeen.x - lyhyt.ennen.x) > 1,
  `${lyhyt.ennen.x.toFixed(1)} → ${lyhyt.jalkeen.x.toFixed(1)}`);

// Pitkä veto: keskipiste ei saa karata alueen ulkopuolelle.
const pitka = await veda(-1400, -1400);
const sisalla = pitka.jalkeen.x <= alue.x1 + 1 && pitka.jalkeen.x >= alue.x0 - 1
  && pitka.jalkeen.y <= alue.y1 + 1 && pitka.jalkeen.y >= alue.y0 - 1;
vaadi('pitkä veto pysyy valloitetulla alueella', sisalla,
  `keskipiste ${pitka.jalkeen.x.toFixed(1)}/${pitka.jalkeen.y.toFixed(1)} `
  + `alue ${alue.x0.toFixed(1)}–${alue.x1.toFixed(1)} / ${alue.y0.toFixed(1)}–${alue.y1.toFixed(1)}`);

await sivu.screenshot({ path: join(ULOS, 'savuke-fokuskartta-rajattu.png') });

/* ---------- kehittäjätila: rajausta ei ole ---------- */

const kehittajassa = await sivu.evaluate(() => {
  localStorage.setItem('matkakirja-kehittaja', '1');
  return window.matkakirja.ui.kartta.valloitettuAlue();
});
vaadi('kehittäjätilassa panorointi on rajaamaton', kehittajassa === null,
  JSON.stringify(kehittajassa));

const kehittajanVeto = await veda(-1400, 0);
vaadi('kehittäjätilassa sama veto vie alueen ulkopuolelle',
  kehittajanVeto.jalkeen.x < alue.x0 || kehittajanVeto.jalkeen.x > alue.x1,
  `${kehittajanVeto.jalkeen.x.toFixed(1)}`);

await sivu.evaluate(() => localStorage.removeItem('matkakirja-kehittaja'));

/* ---------- pelin oma kamera-ajo ei ole rajattu ---------- */

/*
 * Kohde valitaan SUHTEESSA ALUEESEEN eikä kaupunkilistasta: pelin
 * lähtökaupunki on Lontoo, joten Britannia on jo valloitettu ja sen
 * laatikko kuuluu alueeseen — ajo sinne ei todistaisi mitään. Piste
 * alueen länsipuolella on varmasti sen ulkopuolella ja silti laudalla.
 *
 * Pystysuunta jätetään mittaamatta: asetaPan rajaa panY laudan omiin
 * reunoihin (panVaraY), joten kamera ei aina yllä pyydettyyn
 * korkeuteen. Vaakasuunta riittää todisteeksi, koska juuri se on se
 * akseli, jolla käsieleen rajaus näkyi.
 */
const ajo = await sivu.evaluate(async (raja) => {
  const { ui } = window.matkakirja;
  const kohde = { x: raja.x0 - 900, y: raja.y1 - 400 };
  await ui.kartta.ajaKamera({ ...kohde, kerroin: 3 }, { kesto: 0 });
  await new Promise((r) => setTimeout(r, 400));
  const pane = ui.svg.parentElement;
  const box = ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
  return {
    kohde,
    keskiX: box.x + (pane.clientWidth / 2 - (ui.panX ?? 0)) / ui.zoomSkaala,
  };
}, alue);
vaadi('pelin kamera-ajo vie näkymän alueen ulkopuolellekin',
  Math.abs(ajo.keskiX - ajo.kohde.x) < 60 && ajo.keskiX < alue.x0,
  JSON.stringify({ ...ajo, x0: alue.x0 }));

/* ---------- elekeskeytys ennallaan ---------- */

const keskeytys = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const ateena = game.pack.cities.find((c) => c.id === 'ateena');
  ui.kartta.ajaKamera({ x: ateena.x, y: ateena.y, kerroin: 3 }, { kesto: 1600 });
  await new Promise((r) => setTimeout(r, 200));
  const kesken = Boolean(ui.kartta.kameraAjo);
  ui.svg.parentElement.dispatchEvent(new PointerEvent('pointerdown', {
    bubbles: true, clientX: 200, clientY: 400, pointerId: 7,
  }));
  await new Promise((r) => setTimeout(r, 120));
  return { kesken, jalkeen: Boolean(ui.kartta.kameraAjo) };
});
vaadi('ele keskeyttää kamera-ajon kuten ennenkin',
  keskeytys.kesken && !keskeytys.jalkeen, JSON.stringify(keskeytys));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
