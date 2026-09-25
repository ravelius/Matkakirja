/*
 * SELAINSAVUKE: LAAJA KOHDEKORTTI EI SULJE LEIPÄTEKSTIN NAPAUTUKSESTA.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kortti-sulku.mjs [kuvakansio]
 *
 * Omistaja 19.9.2026 klo 23.41 Suomen aikaa (iPad, Chartresin katedraali
 * LISÄÄ-tilassa), sanatarkasti: "Nosto sulkeutuu kun leipätekstin kohdalta
 * klikkaa. Johtuu siitä että peliin ei päivity että lisää sisältöä on
 * tuotu ruudulle. Korjaa". Kuva edellä -kortin oma napautusvahti
 * (js/fokuskohteet.js kuunteleKohdetta) sulki kortin kaikista kortin
 * kohdista myös vaiheessa 2, kun juttu oli jo ladottu kuvan ympärille.
 *
 * Per ruutu (390 × 844 ja iPad 1024 × 1366, kosketus): Chartres → Lisää →
 *   1. napautus leipätekstiin → kortti AUKI
 *   2. napautus kortin ulkopuolelle (kartta) → kortti KIINNI
 *   3. uudelleen auki → Lisää → ✕ → kortti KIINNI
 * Napautukset ovat oikeita osoitintapahtumia (Playwright touchscreen/mouse).
 */
import http from 'node:http';
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
  const avaa = () => s.evaluate(async () => {
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    const { KOHDE_MAAT, avaaFokuskohde, suljeFokuskohde } = await import('/js/fokuskohteet.js');
    // Edellinen kortti suljetaan pelin omalla funktiolla (kuuntelijat puretaan).
    suljeFokuskohde(window.matkakirja.ui);
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) el.remove();
    await odota(300);
    const kohde = (KOHDE_MAAT.FRA ?? []).find((k) => k.id === 'chartresin-katedraali');
    if (!kohde) return { virhe: 'ei kohdetta' };
    avaaFokuskohde(window.matkakirja.ui, kohde);
    await odota(900);
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
    await odota(900);
    const k = document.querySelector('.fokuskohde-popup');
    const p = [...(k?.querySelectorAll('.fokuskohde-teksti p, .fokuskohde-teksti') ?? [])]
      .find((e) => e.getClientRects().length && e.textContent.trim().length > 40);
    p?.scrollIntoView({ block: 'center' });
    await odota(300);
    const r = p?.getBoundingClientRect();
    const kr = k?.getBoundingClientRect();
    return {
      luokat: k ? String(k.className) : null,
      teksti: r ? { x: Math.round(r.left + r.width * 0.4), y: Math.round(r.top + Math.min(r.height / 2, 20)) } : null,
      kortti: kr ? { left: kr.left, top: kr.top, right: kr.right, bottom: kr.bottom } : null,
    };
  });
  const onAuki = () => s.evaluate(() => Boolean(document.querySelector('.fokuskohde-popup')?.isConnected));
  const napauta = async (x, y) => {
    if (ruutu.hasTouch) await s.touchscreen.tap(x, y); else await s.mouse.click(x, y);
    await s.waitForTimeout(700);
  };
  // 1. Leipäteksti.
  const a = await avaa();
  tieto(`${ruutu.nimi} kortti`, JSON.stringify(a));
  if (a.teksti) await napauta(a.teksti.x, a.teksti.y);
  vaadi(`${ruutu.nimi}: laajan kortin leipätekstin napautus EI sulje korttia`, Boolean(a.teksti) && await onAuki(), JSON.stringify(a));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `kortti-sulku-${ruutu.nimi}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  // 2. Ulkopuolelle: kortin ulkopuolinen piste (ylä- tai alapuoli, kartta).
  const vw = ruutu.viewport.width; const vh = ruutu.viewport.height;
  // Laaja kortti peittää lähes koko ruudun: ulkopuolinen kartta on
  // kortin alapuolella tai sivumarginaalissa (yläpuolella on palkki).
  // Sama, yhä auki oleva kortti (avataan uudelleen vain, jos 1. sulki sen).
  const b = (await onAuki()) ? { kortti: a.kortti } : await avaa();
  // Ulkopuolinen piste haetaan ruudulta: ensimmäinen osuma, jonka alla ei ole korttia.
  const ulko = await s.evaluate(({ vw, vh }) => {
    const k = document.querySelector('.fokuskohde-popup');
    for (const [x, y] of [[vw / 2, vh - 8], [4, vh / 2], [vw - 4, vh / 2], [vw / 2, vh - 3], [4, vh - 8]]) {
      const e = document.elementFromPoint(x, y);
      if (e && !k.contains(e) && !e.closest('button, a, .pollo-nappi, .pollo-paneeli, .topbar')) return { x: Math.round(x), y: Math.round(y), alla: String(e.className).slice(0, 30) };
    }
    return null;
  }, { vw, vh });
  const kiinniEnnen = await onAuki();
  /*
   * TARKKA OSOITIN: laaja kortti jättää ulkopuolelle vain 4–12 px:n reunan,
   * ja Chromiumin kosketuksen kohteenkorjaus (touch adjustment) siirtää niin
   * lähelle korttia osuvan napautuksen korttiin. Ulkopuolinen napautus
   * mitataan siksi hiirellä (mitattu 19.9.2026: kosketus osui kortin
   * reunaan, vaikka elementFromPoint näytti karttaa).
   */
  await s.mouse.click(ulko?.x ?? 1, ulko?.y ?? 1);
  await s.waitForTimeout(700);
  const ulkoKiinni = !(await onAuki());
  vaadi(`${ruutu.nimi}: napautus kortin ulkopuolelle sulkee`, Boolean(ulko) && kiinniEnnen && ulkoKiinni, JSON.stringify({ ulko, kortti: b.kortti }));
  // 3. ✕.
  await avaa();
  const x = await s.evaluate(() => { const b = document.querySelector('.fokuskohde-popup .fokuskohde-sulje')?.getBoundingClientRect(); return b ? { x: b.left + b.width / 2, y: b.top + b.height / 2 } : null; });
  if (x) await napauta(x.x, x.y);
  vaadi(`${ruutu.nimi}: ✕ sulkee kortin`, Boolean(x) && !(await onAuki()), JSON.stringify(x));
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
