/*
 * Savuke: SAAPUMISKUVIEN AIKANA MATKAKIRJA JA PULUN KUPLA OVAT POISSA.
 *
 * OMISTAJA 20.9.2026 klo 11.15 (kaappaus
 * docs/raportit/kaappaukset/omistaja-20260920/saapuminen-pariisi-v1974.webp):
 * sääntö muuttui niin, että kartta saa jäädä saapumistrailerin aikana
 * teräväksi — mutta vasemman yläkulman matkakirjapaneeli (paikkarivi,
 * teksti, pikkukuvat) ja pulun puhekupla eivät saa näkyä. v1974:ssä
 * molemmat olivat ruudulla koko trailerin ajan.
 *
 * VARTIOT (kaksi leveyttä: 390 ja 1400):
 *   1. Traileri on ruudulla ja rungolla on sen oma luokka.
 *   2. Matkakirjapaneeli ei näy trailerin aikana — mitattuna
 *      laskettuna näkyvyytenä, ei pelkkänä luokkana.
 *   3. Pulun puhekupla ei näy trailerin aikana.
 *   4. VASTAKOE: sama mittari näkee paneelin, kun luokka otetaan pois
 *      — muuten vihreä voisi tarkoittaa vain sitä, ettei paneelia ole.
 *   5. Trailerin jälkeen molemmat ovat taas näkyvissä (paneeli varmasti;
 *      kupla vain jos pulu on juuri silloin puhunut).
 *   6. Kartta pysyy trailerin aikana terävänä: ei sumennusta.
 *
 * Aja:  node tools/savukkeet/savuke-saapumisen-piilot.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Chromiumin ja Playwrightin paikka vaihtelee koneittain (kontti
// /opt/..., Mac Studio Playwrightin oma välimuisti).
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('lontoo');
peli.players[0].money = 5000;
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch(
  process.env.CHROMIUM || existsSync('/opt/pw-browsers/chromium')
    ? { executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' } : {},
);

/**
 * Näkyykö elementti oikeasti: olemassa, laskettu visibility/display
 * sallii sen, ja sillä on mittaa. Pelkkä luokan luku kertoisi vain
 * siitä, mitä koodi luulee tekevänsä.
 */
const NAKYVYYS = (valitsin) => {
  const el = document.querySelector(valitsin);
  if (!el) return { on: false, syy: 'ei elementtiä' };
  const t = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    on: t.visibility !== 'hidden' && t.display !== 'none' && Number(t.opacity) > 0.01
      && r.width > 0 && r.height > 0,
    visibility: t.visibility,
    display: t.display,
    opacity: Number(t.opacity),
    koko: [Math.round(r.width), Math.round(r.height)],
  };
};

for (const ruutu of RUUDUT) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height }, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);

  const nimessa = (t) => `${t} (${ruutu.nimi})`;

  /* Saapuminen uuteen kaupunkiin käynnistää trailerin. */
  await sivu.evaluate(() => {
    const { ui, game } = window.matkakirja;
    ui.doKehittajaSiirto(game.board.cityById.get('pariisi'));
  });
  const trailerissa = await sivu.waitForFunction(
    () => Boolean(document.querySelector('.saapumistraileri')),
    null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  vaadi(nimessa('saapumistraileri tulee ruudulle'), trailerissa, 'traileria ei syntynyt');
  if (!trailerissa) { await ctx.close(); continue; }

  // Mitataan trailerin PUOLIVÄLISSÄ, ei heti ensimmäisellä kehyksellä:
  // v1974:n vika näkyi koko keston ajan, ei vain alussa.
  await sivu.waitForTimeout(3000);
  const kesken = await sivu.evaluate((mittari) => {
    const nakyvyys = new Function(`return (${mittari})`)();
    return {
      luokka: document.body.classList.contains('saapumistraileri-paalla'),
      traileri: Boolean(document.querySelector('.saapumistraileri')),
      paneeli: nakyvyys('.fact-card'),
      kupla: nakyvyys('.pollo-kuplapino-kehys'),
      /*
       * Sumentava kerros lasketaan vain jos se OIKEASTI peittää ruutua:
       * pelkkä backdrop-filter-sääntö on myös avausverholla
       * (.intro-verho), joka jää DOMiin läpinäkyvänä eikä sumenna
       * mitään. Mitta on siis piirtyvä pinta, ei tyylisääntö.
       */
      sumentavat: [...document.querySelectorAll('body *')].filter((el) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return /blur\(/.test(s.backdropFilter ?? '')
          && s.visibility !== 'hidden' && s.display !== 'none'
          && Number(s.opacity) > 0.01 && r.width > 8 && r.height > 8
          && !el.closest('.saapumistraileri');
      }).map((el) => `${el.tagName.toLowerCase()}.${el.className} o=${getComputedStyle(el).opacity}`),
    };
  }, NAKYVYYS.toString());
  tieto(nimessa('trailerin aikana'), JSON.stringify(kesken));
  vaadi(nimessa('rungolla on trailerin luokka'), kesken.luokka, JSON.stringify(kesken));
  vaadi(nimessa('matkakirjapaneeli ei näy trailerin aikana'),
    kesken.paneeli.on === false, JSON.stringify(kesken.paneeli));
  vaadi(nimessa('pulun puhekupla ei näy trailerin aikana'),
    kesken.kupla.on === false, JSON.stringify(kesken.kupla));
  vaadi(nimessa('kartta pysyy terävänä: ei sumennusta trailerin ulkopuolella'),
    kesken.sumentavat.length === 0, kesken.sumentavat.join(' | '));
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, `traileri-kesken-${ruutu.nimi}.png`) });
  }

  /*
   * VASTAKOE: sama mittari samalla hetkellä, luokka hetkeksi pois.
   * Jos paneeli olisi piilossa jostain muusta syystä (esim. sitä ei ole
   * vielä piirretty), vihreä yllä ei tarkoittaisi mitään.
   */
  const vastakoe = await sivu.evaluate((mittari) => {
    const nakyvyys = new Function(`return (${mittari})`)();
    document.body.classList.remove('saapumistraileri-paalla');
    const auki = nakyvyys('.fact-card');
    document.body.classList.add('saapumistraileri-paalla');
    return auki;
  }, NAKYVYYS.toString());
  tieto(nimessa('vastakoe ilman luokkaa'), JSON.stringify(vastakoe));
  vaadi(nimessa('vastakoe: ilman runkoluokkaa paneeli näkyy'),
    vastakoe.on === true, JSON.stringify(vastakoe));

  /* Traileri ohi (napautus ohittaa, kuten pelaajalla). */
  await sivu.mouse.click(Math.round(ruutu.width / 2), Math.round(ruutu.height / 2));
  await sivu.waitForFunction(
    () => !document.querySelector('.saapumistraileri'),
    null, { timeout: 30000 },
  ).catch(() => {});
  await sivu.waitForTimeout(1200);
  const jalkeen = await sivu.evaluate((mittari) => {
    const nakyvyys = new Function(`return (${mittari})`)();
    return {
      luokka: document.body.classList.contains('saapumistraileri-paalla'),
      traileri: Boolean(document.querySelector('.saapumistraileri')),
      paneeli: nakyvyys('.fact-card'),
    };
  }, NAKYVYYS.toString());
  tieto(nimessa('trailerin jälkeen'), JSON.stringify(jalkeen));
  vaadi(nimessa('runkoluokka on poissa trailerin jälkeen'),
    jalkeen.luokka === false, JSON.stringify(jalkeen));
  vaadi(nimessa('matkakirjapaneeli palaa trailerin jälkeen'),
    jalkeen.paneeli.on === true, JSON.stringify(jalkeen.paneeli));
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, `traileri-jalkeen-${ruutu.nimi}.png`) });
  }
  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
