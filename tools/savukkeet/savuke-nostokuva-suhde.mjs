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
  const mittaa = () => s.evaluate(() => {
    const img = document.querySelector('.fokuskohde-popup .nostokuva-img');
    if (!img?.naturalWidth) return { img: false };
    const r = img.getBoundingClientRect();
    return {
      img: true,
      kuvanSuhde: +(img.naturalWidth / img.naturalHeight).toFixed(3),
      laatikonSuhde: +(r.width / r.height).toFixed(3),
      laatikko: [Math.round(r.width), Math.round(r.height)],
      luonnollinen: [img.naturalWidth, img.naturalHeight],
    };
  });
  const osuu = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) / b <= 0.03;
  const avaa = (lisaa) => s.evaluate(async (klikkaaLisaa) => {
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    const { KOHDE_MAAT, avaaFokuskohde, suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) el.remove();
    await odota(300);
    const kohde = (KOHDE_MAAT.FRA ?? []).find((k) => k.id === 'hahmotelma-canigou');
    if (!kohde) return false;
    avaaFokuskohde(window.matkakirja.ui, kohde);
    await odota(1200);
    if (klikkaaLisaa) {
      document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
      await odota(1000);
    }
    return true;
  }, lisaa);
  for (const [nimi, lisaa] of [['kuva edellä', false], ['Lisää', true]]) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await avaa(lisaa);
    // eslint-disable-next-line no-await-in-loop
    const m = await mittaa();
    tieto(`${ruutu.nimi} ${nimi}`, JSON.stringify(m));
    vaadi(`${ruutu.nimi}: laatikko on kuvan suhteessa (${nimi})`,
      ok && m.img === true && osuu(m.laatikonSuhde, m.kuvanSuhde), JSON.stringify(m));
    if (KUVAKANSIO) {
      // eslint-disable-next-line no-await-in-loop
      await s.screenshot({ path: join(KUVAKANSIO, `nostokuva-suhde-${nimi.replace(/\W+/g, '-')}.jpg`), type: 'jpeg', quality: 70 }).catch(() => {});
    }
  }
  /*
   * MYÖHÄSSÄ TULLUT LATAUS: laatikko väännetään 3:2-muotoon ja kuvalle
   * lähetetään uusi load — sama kuin varareitin tuoma toinen kuva.
   */
  const myohassa = await s.evaluate(async () => {
    const img = document.querySelector('.fokuskohde-popup .nostokuva-img');
    if (!img?.naturalWidth) return { img: false };
    const suhde = () => { const r = img.getBoundingClientRect(); return +(r.width / r.height).toFixed(3); };
    const leveys = Number.parseFloat(img.style.width) || img.getBoundingClientRect().width;
    img.style.height = `${Math.round(leveys / 1.5)}px`;
    const vaarin = suhde();
    img.dispatchEvent(new Event('load'));
    await new Promise((v) => setTimeout(v, 400));
    return {
      img: true, vaarin, jalkeen: suhde(),
      kuvanSuhde: +(img.naturalWidth / img.naturalHeight).toFixed(3),
    };
  });
  tieto(`${ruutu.nimi} myöhässä tullut lataus`, JSON.stringify(myohassa));
  vaadi(`${ruutu.nimi}: myöhässä tullut lataus korjaa väännetyn laatikon`,
    myohassa.img === true && !osuu(myohassa.vaarin, myohassa.kuvanSuhde)
      && osuu(myohassa.jalkeen, myohassa.kuvanSuhde), JSON.stringify(myohassa));
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
