/*
 * SELAINSAVUKE: PELISSÄ EI VALITA TEKSTIÄ.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-tekstivalinta.mjs [kuvakansio]
 *
 * Raamattu JONOSSA kohta D (omistaja 19.9.2026): peli on lauta ja lehti,
 * ei tekstidokumentti — pitkä painallus tai veto kartalla ja kortin
 * tekstissä ei saa maalata tekstiä. Poikkeus ovat syöttökentät.
 *
 * Mittaus per ruutu (390 × 844 ja iPad 1024 × 1366):
 *   1. veto kartan yli → `getSelection().toString()` tyhjä
 *   2. veto kortin leipätekstin yli (Chartres, Lisää) → valinta tyhjä
 *   3. kortin tekstin `user-select` on none ja `-webkit-touch-callout` none
 *   4. VASTAKOE: syöttökentässä user-select on text (pelaaja saa valita)
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




/*
 * `-webkit-touch-callout: none` luetaan LEVYLTÄ: Chromium ei tue
 * ominaisuutta, joten se putoaa sekä CSSOMista että getComputedStylesta.
 * iOS on se laite, jota sääntö koskee, ja tiedostossa se joko on tai ei.
 */
const TYYLI = readFileSync(join(JUURI, 'css/styles.css'), 'utf8');
const CALLOUT_TIEDOSTOSSA = /body\s*\{[^}]*-webkit-touch-callout:\s*none/.test(TYYLI);
tieto('body -webkit-touch-callout: none tyylitiedostossa', String(CALLOUT_TIEDOSTOSSA));

const RUUDUT = [
  { nimi: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
  { nimi: 'iPad', viewport: { width: 1024, height: 1366 }, deviceScaleFactor: 2, hasTouch: true },
];
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
  const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 }).then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: pallolauta aukesi`, auki);
  await s.waitForTimeout(3000);
  /*
   * VALINTAVETO ON MITTARI, EI PITKÄ PAINALLUS: pitkä painallus maalaa
   * tekstin vain oikealla kosketusnäytöllä, mutta VETO tekstin yli maalaa
   * sen kaikilla osoittimilla — ja juuri sen `user-select: none` estää.
   * Sama ele kartalla on panorointia, ja kortissa vieritystä.
   */
  const veto = async (x, y, dx = 140) => {
    await s.mouse.move(x, y);
    await s.mouse.down();
    for (let i = 1; i <= 7; i += 1) await s.mouse.move(x + (dx * i) / 7, y + 2);
    await s.mouse.up();
    await s.waitForTimeout(250);
    return s.evaluate(() => String(globalThis.getSelection?.() ?? '').trim());
  };
  const kartta = await s.evaluate(() => {
    const e = document.querySelector('.map-pane, #board, main.stage');
    const r = e?.getBoundingClientRect();
    return r ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height * 0.4) } : null;
  });
  const karttaValinta = kartta ? await veto(kartta.x, kartta.y) : 'ei karttaa';
  vaadi(`${ruutu.nimi}: veto kartan yli ei valitse tekstiä`, karttaValinta === '', JSON.stringify({ kartta, karttaValinta }));
  const kortti = await s.evaluate(async () => {
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) el.remove();
    const kohde = (KOHDE_MAAT.FRA ?? []).find((k) => k.id === 'chartresin-katedraali');
    avaaFokuskohde(window.matkakirja.ui, kohde);
    await odota(900);
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
    await odota(900);
    const p = [...document.querySelectorAll('.fokuskohde-popup .fokuskohde-teksti p')]
      .find((e) => e.getClientRects().length && e.textContent.trim().length > 60);
    p?.scrollIntoView({ block: 'center' });
    await odota(300);
    const r = p?.getBoundingClientRect();
    const tyyli = p ? getComputedStyle(p) : null;
    return {
      teksti: r ? { x: Math.round(r.left + 12), y: Math.round(r.top + Math.min(12, r.height / 2)) } : null,
      userSelect: tyyli?.userSelect ?? tyyli?.webkitUserSelect ?? null,
      /*
       * `-webkit-touch-callout` on WebKitin oma: Chromium ei tue sitä, ja
       * getComputedStyle palauttaa tyhjän. Sääntö luetaan siksi myös
       * tyylitiedostosta — iOS on se laite, jota se koskee.
       */
      callout: tyyli?.getPropertyValue?.('-webkit-touch-callout') ?? '',
      kentanValinta: (() => {
        const kentta = document.createElement('input');
        document.body.appendChild(kentta);
        const arvo = getComputedStyle(kentta).userSelect;
        kentta.remove();
        return arvo;
      })(),
    };
  });
  const korttiValinta = kortti.teksti ? await veto(kortti.teksti.x, kortti.teksti.y, 160) : 'ei tekstiä';
  tieto(`${ruutu.nimi} kortti`, JSON.stringify(kortti));
  vaadi(`${ruutu.nimi}: veto kortin leipätekstin yli ei valitse tekstiä`,
    Boolean(kortti.teksti) && korttiValinta === '', JSON.stringify({ kortti, korttiValinta }));
  vaadi(`${ruutu.nimi}: kortin teksti on user-select: none ja touch-callout none`,
    kortti.userSelect === 'none'
      && (kortti.callout === 'none' || (kortti.callout === '' && CALLOUT_TIEDOSTOSSA)),
    JSON.stringify(kortti));
  vaadi(`${ruutu.nimi}: VASTAKOE: syöttökentässä valinta on sallittu`,
    kortti.kentanValinta === 'text' || kortti.kentanValinta === 'auto', JSON.stringify(kortti));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `tekstivalinta-${ruutu.nimi}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
