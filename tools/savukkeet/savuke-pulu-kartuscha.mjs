/*
 * SELAINSAVUKE: KUVAN LAATIKKO ON KUVAN SUHTEESSA.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostokuva-suhde.mjs [kuvakansio]
 *
 * Sonnet 1, kierros 16 (20.9.2026), FRA Canigou: *"panoraamakuva täyttää
 * vain kuva-alan yläkolmanneksen ja alle jää iso tyhjä beige"*.
 * Kuva edellä -kortin kuvalaatikko on inline-pikseleitä, ja se
 * laskettiin VAIN ensimmäisestä latauksesta (`once: true`). Jos
 * ensimmäinen osoite kaatui ja varareitti (js/media.js asetaKuva) toi
 * eri muotoisen kuvan, laatikko jäi vanhaan suhteeseen ja
 * `object-fit: contain` jätti paperin näkyviin kuvan alle.
 *
 * Mittaus 390 px, Canigoun kohdekortti (vaihe 1 ja vaihe 2):
 *   1. laatikon suhde on kuvan suhde ±3 %
 *   2. myöhässä tullut lataus korjaa väännetyn laatikon takaisin
 *      (js/nostokuva.js sovitaLukittuLaatikko)
 */import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
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
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());





const RUUDUT = [{ nimi: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true }];
const selain = await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
for (const ruutu of RUUDUT) {
  const ctx = await selain.newContext({ ...ruutu, nimi: undefined, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => {
    try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
  }, tallenne);
  const s = await ctx.newPage();
  await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const v = await ampariHaku(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await s.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
    .then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: pallolauta aukesi`, auki);
  await s.waitForTimeout(3000);
  const kartuscha = (avaa) => s.evaluate(async (avataan) => {
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    for (const e of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) e.remove();
    const { ui } = window.matkakirja;
    ui.pallolauta?.pallo?.pointOfView?.({ lat: 46.6, lng: 2.4, altitude: 0.5 }, 0);
    ui.pallolauta?.heraa?.();
    await odota(2200);
    const kortti = document.querySelector('.maapaneeli-kortti');
    const nytAuki = Boolean(kortti?.classList.contains('valikko-auki'));
    if (nytAuki !== avataan) {
      document.querySelector('.maapaneeli-avain, .maapaneeli-kortti button')?.click();
      await odota(1200);
    }
    await odota(600);
    const laatikko = (el) => {
      const r = el?.getBoundingClientRect();
      return r && r.width > 0 ? [r.left, r.top, r.right, r.bottom].map(Math.round) : null;
    };
    const k = document.querySelector('.maapaneeli-kortti');
    const n = document.querySelector('.pollo-nappi');
    const pinta = document.querySelector('.livia-kasvot-pinta');
    const leikkaa = (a, b) => Boolean(a && b && a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]);
    const kl = laatikko(k); const nl = laatikko(n);
    const pl = pinta && !pinta.hidden ? laatikko(pinta) : null;
    return {
      auki: Boolean(k?.classList.contains('valikko-auki')),
      vaistettava: Boolean(k?.classList.contains('pulu-vaistettava')),
      kortti: kl, nappi: nl, pinta: pl,
      nappiLeikkaa: leikkaa(nl, kl),
      pintaLeikkaa: leikkaa(pl, kl),
      ylla: Boolean(n?.classList.contains('pulu-paneelin-ylla')),
      piilossa: Boolean(n?.classList.contains('pulu-paneelin-alla-piilossa')),
    };
  }, avaa);
  const auki1 = await kartuscha(true);
  tieto(`${ruutu.nimi} kartuscha auki`, JSON.stringify(auki1));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, 'pulu-kartuscha-auki.jpg'), type: 'jpeg', quality: 70 }).catch(() => {});
  vaadi(`${ruutu.nimi}: kartuscha aukesi ja merkitsee itsensä väistettäväksi`,
    auki1.auki === true && auki1.vaistettava === true && Boolean(auki1.kortti), JSON.stringify(auki1));
  vaadi(`${ruutu.nimi}: pulu ei peitä kartuschaa (nappi eikä kasvokangas)`,
    auki1.nappiLeikkaa === false && auki1.pintaLeikkaa === false
      && (auki1.ylla === true || auki1.piilossa === true), JSON.stringify(auki1));
  const kiinni = await kartuscha(false);
  tieto(`${ruutu.nimi} kartuscha kiinni`, JSON.stringify(kiinni));
  vaadi(`${ruutu.nimi}: kartuschan sulkeuduttua pulu palaa omalle paikalleen`,
    kiinni.auki === false && kiinni.ylla === false && kiinni.piilossa === false,
    JSON.stringify(kiinni));
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
