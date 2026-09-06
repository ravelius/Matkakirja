/*
 * Savuke: PELAAJAN LAUTAKYTKIN (pallolauta, vaihe 6).
 *
 * Omistaja 5.9.2026, sanatarkasti: *"pelissä periaatteessa voisi olla
 * lopulta kytkin, millä pelaaja voisi valita haluaako pelata
 * pallonäkymässä vai sillä meidän vanhalla kartalla sitten kun ollaan
 * saatu pallo toimimaan."* (docs/moduulit/karttapallo.md luku 0 kohta 4,
 * luku 7 rivi 6.)
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *  1. Asetusrivi on PELAAJAN valikossa ILMAN kehittäjätilaa: hampurilaisen
 *     Pelilauta-osiossa kaksi riviä (Karttapallo, Vanha kartta), ja
 *     oletuksena valittuna on karttapallo.
 *  2. Vaihto vanhaan karttaan: rivi näyttää ilmoituksen "Vaihdetaan
 *     lautaa…", sivu latautuu uudestaan, laitteen avain matkakirja-lauta
 *     on 'kartta' ja peli piirtyy tasokartalle (svg#board täyttyy, pallon
 *     kuorta ei ole). Osoitteeseen ei jää ?lauta=-parametria.
 *  3. Tallenne on sama: sama peli jatkuu (matkakirja-save-v1 ennallaan,
 *     nappula samassa kaupungissa) — valinta ei koske pelitilaan.
 *  4. Paluu karttapalloon samalta riviltä: avain poistuu (oletus = pallo)
 *     ja pallolauta avautuu uudestaan (vaatii ämpärin).
 *  5. Sama tila näkyy kehittäjän ratasvalikon vivussa: yksi avain, kaksi
 *     kytkintä (#kehittaja-pallolauta-btn aria-pressed).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1) kuten
 * savuke-pallolauta.mjs:ssä: kontin selain ei osaa välityspalvelinta.
 * Ilman ämpäriä pallo ei lataudu — vartiot 1–3 ja 5 ajetaan silti, ja
 * vartija 4 raportoidaan INFO-rivinä.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-lautakytkin.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

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
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — pallo ei voi latautua; vartija 4 jää INFO-riviksi');

/* Tallenne: Fogg Ateenassa, aarre löydetty (sama kuin savuke-pallolauta). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
/*
 * YKSI KONTEKSTI KOKO AJON AJAN: kytkin kirjoittaa laitteen varastoon ja
 * lataa sivun uudestaan, joten vaihdon vaikutus näkyy vain, jos varasto
 * säilyy sivulatauksen yli. Kehittäjätilaa EI kytketä — asetusrivin on
 * oltava tavallisen pelaajan ulottuvilla (vartija 5 kytkee sen lopuksi).
 */
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    if (!localStorage.getItem('matkakirja-save-v1')) localStorage.setItem('matkakirja-save-v1', data);
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/r2\.dev\//, async (route) => {
  const url = route.request().url();
  const vastaus = await ampariHaku(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
});

/** Sivu auki ja peli pystyssä (ilman ?lauta=-parametria — asetus ratkaisee). */
async function avaa() {
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
}

/** Valikko auki ja Pelilauta-rivin tila luettuna. */
async function lueRivit() {
  await sivu.evaluate(() => {
    const valikko = document.getElementById('paavalikko');
    if (valikko?.hidden) document.getElementById('menu-btn')?.click();
  });
  return sivu.evaluate(() => {
    const rivit = [...document.querySelectorAll('#lauta-valikko button')];
    return {
      maara: rivit.length,
      nimet: rivit.map((r) => r.querySelector('.aanikytkin-nimi')?.textContent),
      valittu: rivit.find((r) => r.getAttribute('aria-checked') === 'true')?.dataset.lauta ?? null,
      otsikko: [...document.querySelectorAll('#paavalikko .valikko-otsikko')].map((p) => p.textContent),
      kehittajaValikko: !document.getElementById('kehittaja-valikko-kotelo')?.hidden,
    };
  });
}

/** Napauttaa lautariviä ja odottaa sivun latautuvan uudestaan. */
async function vaihdaLauta(lauta) {
  await sivu.evaluate(() => { window.__ennenVaihtoa = true; });
  await sivu.evaluate((l) => document.querySelector(`#lauta-valikko button[data-lauta="${l}"]`)?.click(), lauta);
  const vihje = await sivu.evaluate(() => document.getElementById('lauta-vihje')?.textContent ?? '');
  await sivu.waitForFunction(() => !window.__ennenVaihtoa, null, { timeout: 20000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  return vihje;
}

/* ================= 1. RIVI ON PELAAJAN VALIKOSSA ================= */
await avaa();
{
  const rivit = await lueRivit();
  vaadi('asetusrivi näkyy pelaajalle ilman kehittäjätilaa (Pelilauta: kaksi vaihtoehtoa)',
    rivit.maara === 2 && rivit.otsikko.includes('Pelilauta') && !rivit.kehittajaValikko
    && rivit.nimet.join('/') === 'Karttapallo/Vanha kartta', JSON.stringify(rivit));
  vaadi('oletuksena valittuna on karttapallo', rivit.valittu === 'pallo', JSON.stringify(rivit));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'lautakytkin-valikko.png') });
}

/* ================= 2.–3. VAIHTO VANHAAN KARTTAAN ================= */
{
  /*
   * Tallenteen ydin ennen vaihtoa: paikka ja vaihe. Koko merkkijonoa ei
   * voi verrata, koska peli tallentaa itsensä käynnistyessään uudestaan
   * (kenttien järjestys ja istuntokohtaiset luvut elävät) — ratkaisevaa
   * on, että SAMA PELI jatkuu samasta paikasta.
   */
  const ennen = await sivu.evaluate(() => {
    const t = JSON.parse(localStorage.getItem('matkakirja-save-v1'));
    return JSON.stringify({ pos: t.players[0].pos, phase: t.phase, tokens: (t.tokens ?? []).length });
  });
  const vihje = await vaihdaLauta('kartta');
  vaadi('rivi ilmoittaa vaihdosta ennen latausta', /Vaihdetaan lautaa/.test(vihje), `vihje: "${vihje}"`);
  // Tasokartta piirtyy: odotetaan lauta valmiiksi ennen mittausta.
  await sivu.waitForFunction(() => document.querySelectorAll('#board *').length > 100, null, { timeout: 30000 })
    .catch(() => {});
  const tila = await sivu.evaluate(() => ({
    avain: localStorage.getItem('matkakirja-lauta'),
    osoite: location.search,
    svgLapsia: document.querySelectorAll('#board *').length,
    pallo: Boolean(document.querySelector('.pallo-kuori.pallolauta')),
    lepotila: window.matkakirja.ui.kartta.lepotila,
    tallenne: (() => {
      const t = JSON.parse(localStorage.getItem('matkakirja-save-v1'));
      return JSON.stringify({ pos: t.players[0].pos, phase: t.phase, tokens: (t.tokens ?? []).length });
    })(),
    kaupunki: window.matkakirja.ui.game.cityOf()?.id ?? null,
  }));
  vaadi('vaihto tallentaa valinnan laitteelle ja peli piirtyy tasokartalle',
    tila.avain === 'kartta' && tila.svgLapsia > 100 && !tila.pallo && tila.lepotila === false,
    JSON.stringify({ ...tila, tallenne: undefined }));
  vaadi('osoitteeseen ei jää ?lauta=-parametria', !tila.osoite.includes('lauta='), tila.osoite);
  vaadi('sama peli jatkuu: tallenne ja nappulan kaupunki ennallaan',
    tila.tallenne === ennen && tila.kaupunki === 'ateena', `kaupunki ${tila.kaupunki}, tallenne sama: ${tila.tallenne === ennen}`);
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'lautakytkin-kartta.png') });
}

/* ================= 4. PALUU KARTTAPALLOON ================= */
{
  const rivit = await lueRivit();
  vaadi('rivi näyttää nyt vanhan kartan valittuna', rivit.valittu === 'kartta', JSON.stringify(rivit));
  await vaihdaLauta('pallo');
  const avain = await sivu.evaluate(() => localStorage.getItem('matkakirja-lauta'));
  vaadi('paluu palloon poistaa avaimen (oletus = pallo)', avain === null, `avain ${avain}`);
  if (AMPARI_TOIMII) {
    const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
      .then(() => true).catch(() => false);
    vaadi('pallolauta avautuu asetusrivin valinnalla', auki, 'ui.pallolauta ei syntynyt 45 s:ssa');
    if (KUVAKANSIO && auki) {
      await sivu.waitForTimeout(3000);
      await sivu.screenshot({ path: join(KUVAKANSIO, 'lautakytkin-pallo.png') });
    }
  } else {
    tieto('pallolaudan avautuminen', 'ohitettu — ämpäri ei vastaa');
  }
}

/* ================= 5. SAMA TILA KEHITTÄJÄN VIVUSSA ================= */
{
  await sivu.evaluate(() => {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-lauta', 'kartta');
  });
  await avaa();
  const tila = await sivu.evaluate(() => {
    document.getElementById('kehittaja-valikko-btn')?.click();
    const vipu = document.getElementById('kehittaja-pallolauta-btn');
    const rivi = document.querySelector('#lauta-valikko button[data-lauta="kartta"]');
    return {
      vipu: vipu?.getAttribute('aria-pressed'),
      rivi: rivi?.getAttribute('aria-checked'),
    };
  });
  vaadi('yksi avain, kaksi kytkintä: vipu ja asetusrivi näyttävät saman tilan',
    tila.vipu === 'false' && tila.rivi === 'true', JSON.stringify(tila));
}

if (virheet.length) tieto('sivun virheet', virheet.slice(0, 5).join(' | '));
await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
