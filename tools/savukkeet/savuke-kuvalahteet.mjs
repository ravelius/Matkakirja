/*
 * SELAINSAVUKE: KUVAN LÄHDE JA HAVAINNEKUVAMERKINTÄ VAIN SUURENNOKSESSA.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kuvalahteet.mjs [kuvakansio]
 *
 * Omistaja 19.9.2026 klo 19.04 Suomen aikaa (Loire-kohdekortti),
 * sanatarkasti: "Havainnekuva ja lähteet saa näkyä vasta kun kuva
 * klikataan isoksi. Tsekkaa kaikkialta läpi". Toteutus: js/tekijakortti.js
 * kortinKuvalahde. Per pinta 390 px: kortilla EI näkyvää lähde- tai
 * havainnekuvariviä; kuvan napautus avaa suurennoksen, jossa rivi ON.
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
const NOSTO = 'maalehti-montgolfier';

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


const RIVI = /Valokuva:|Matkakirjan havainnekuva|Wikimedia Commons|\bCC[ -](?:BY|0)|public domain/i;
const PINNAT = [
  { nimi: 'kohdekortti Loire', avaa: 'kohde:FRA:loire', kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'hahmotelma Texel', avaa: 'kohde:NLD:hahmotelma-texel', kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'kohdekortti Loire (vaihe 2)', avaa: 'kohde:FRA:loire', lisaa: true, kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'hahmotelma Texel (vaihe 2)', avaa: 'kohde:NLD:hahmotelma-texel', lisaa: true, kortti: '.fokuskohde-popup', kuva: '.fokuskohde-kuvanappi, .nostokuva-nappi' },
  { nimi: 'maalehtinosto Montgolfier (vaihe 1)', avaa: 'nosto:maalehti-montgolfier', kortti: '.fokusnosto-kortti', kuva: '.nostokuva-nappi, .fokusnosto-kuvanappi' },
  { nimi: 'maalehtinosto Montgolfier (vaihe 2)', avaa: 'nosto:maalehti-montgolfier', lisaa: true, kortti: '.fokusnosto-kortti', kuva: '.nostokuva-nappi, .fokusnosto-kuvanappi' },
];
const selain = await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
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
vaadi('pallolauta aukesi', auki);
await s.waitForTimeout(3000);
for (const p of PINNAT) {
  const tulos = await s.evaluate(async ({ p, rivi }) => {
    const RE = new RegExp(rivi, 'i');
    const odota = (ms) => new Promise((v) => setTimeout(v, ms));
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros, [class*="zoomkerros"], [class*="fokuskohde-zoom"]')) el.remove();
    const [laji, a, b] = p.avaa.split(':');
    if (laji === 'kohde') {
      const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
      const kohde = (KOHDE_MAAT[a] ?? []).find((k) => k.id === b);
      if (!kohde) return { virhe: 'ei kohdetta' };
      avaaFokuskohde(window.matkakirja.ui, kohde);
    } else {
      const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
      avaaNostonTunnuksella(window.matkakirja.ui, a);
    }
    await odota(700);
    if (p.lisaa) { document.querySelector(`${p.kortti} .nostokuva-lisaa`)?.click(); await odota(700); }
    const kortti = document.querySelector(p.kortti);
    if (!kortti) return { virhe: 'ei korttia' };
    const nakyva = (e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
    const rivit = [...kortti.querySelectorAll('*')]
      .filter((e) => nakyva(e) && [...e.childNodes].some((c) => c.nodeType === 3 && RE.test(c.textContent)))
      .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}: ${e.textContent.trim().slice(0, 50)}`);
    const nappi = kortti.querySelector(p.kuva);
    const suurennoksessa = () => [...document.body.querySelectorAll('*')].filter((e) => !kortti.contains(e) && nakyva(e)
      && [...e.childNodes].some((c) => c.nodeType === 3 && RE.test(c.textContent)));
    // Kuva edellä -kortissa ensimmäinen napautus voi avata jutun; toinen avaa suurennoksen.
    let kaikki = [];
    for (let i = 0; i < 2 && !kaikki.length; i += 1) {
      (kortti.querySelector(p.kuva) ?? nappi)?.click();
      await odota(900);
      kaikki = suurennoksessa();
    }
    return { rivit, kuvanappi: Boolean(nappi), suurennoksessa: kaikki.map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`).slice(0, 4) };
  }, { p, rivi: RIVI.source });
  tieto(p.nimi, JSON.stringify(tulos));
  vaadi(`${p.nimi}: kortilla ei lähde- eikä havainnekuvariviä`, !tulos.virhe && tulos.rivit.length === 0, JSON.stringify(tulos.rivit ?? tulos));
  vaadi(`${p.nimi}: suurennoksessa lähderivi on`, !tulos.virhe && tulos.kuvanappi && tulos.suurennoksessa.length > 0, JSON.stringify(tulos));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `kuvalahteet-${p.nimi.replace(/[^a-z0-9]+/gi, '-')}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
  await s.keyboard.press('Escape');
  await s.waitForTimeout(300);
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
