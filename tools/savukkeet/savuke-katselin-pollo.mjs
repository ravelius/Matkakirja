/*
 * Savuke: kuvakatselimen sarjanapautus + pöllö artikkeli-ikkunoissa.
 *  1. Sarjakatselimessa napautus kuvaan siirtyy seuraavaan, ei sulje.
 *  2. Kuvan ulkopuolinen napautus sulkee; yhden kuvan katselin sulkeutuu
 *     kuvastakin.
 *  3. Pöllön nappi siirtyy wiki-/nähtävyysikkunaan kelluvana ja palaa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext({ viewport: { width: 834, height: 1194 } })).newPage();
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

const katselin = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  // Avataan lehti, jotta katselimella on isäntädialogi.
  ui.openArrival(ui.game.board.cityById.get('lontoo'));
  await odota(400);
  const teokset = [
    { tiedosto: 'a.jpg', otsikko: 'Yksi', selite: 'Eka' },
    { tiedosto: 'b.jpg', otsikko: 'Kaksi', selite: 'Toka' },
    { tiedosto: 'c.jpg', otsikko: 'Kolme', selite: 'Kolmas' },
  ];
  ui.naytaKulttuuriKuva(teokset[0], { teokset, kohdalla: 0 });
  await odota(200);
  const kortti = document.querySelector('.kulttuuri-suurennos');
  const kotelo = kortti.querySelector('.suurennos-kuvakotelo');
  const laskuri = () => kortti.querySelector('.arrival-kuva-laskuri')?.textContent ?? '';
  const alku = laskuri();
  // Napautus kuvaan (kotelo): pitää siirtyä seuraavaan.
  kotelo.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
  await odota(100);
  const kuvanJalkeen = { laskuri: laskuri(), auki: Boolean(document.querySelector('.kulttuuri-suurennos')) };
  // Napautus kortin taustaan (kotelon ulkopuolelle): pitää sulkea.
  kortti.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await odota(100);
  const taustanJalkeen = Boolean(document.querySelector('.kulttuuri-suurennos'));
  // Yhden kuvan katselin: napautus kuvaan sulkee.
  ui.naytaKulttuuriKuva(teokset[0]);
  await odota(100);
  const yksi = document.querySelector('.kulttuuri-suurennos');
  yksi.querySelector('.suurennos-kuvakotelo')
    .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
  await odota(100);
  const yhdenJalkeen = Boolean(document.querySelector('.kulttuuri-suurennos'));
  ui.closeArrival();
  await odota(200);
  return { alku, kuvanJalkeen, taustanJalkeen, yhdenJalkeen };
});
vaadi('sarjassa napautus kuvaan siirtyy seuraavaan eikä sulje',
  katselin.alku === '1 / 3' && katselin.kuvanJalkeen.laskuri === '2 / 3'
  && katselin.kuvanJalkeen.auki === true, JSON.stringify(katselin));
vaadi('napautus kuvan ulkopuolelle sulkee', katselin.taustanJalkeen === false, JSON.stringify(katselin));
vaadi('yhden kuvan katselin sulkeutuu kuvasta', katselin.yhdenJalkeen === false, JSON.stringify(katselin));

const pollo = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const nappi = document.querySelector('.pollo-nappi');
  const wiki = document.getElementById('wiki-dialog');
  wiki.showModal();
  await odota(200);
  const wikissa = { koti: nappi.closest('dialog')?.id ?? 'body', kelluu: nappi.classList.contains('pollo-kelluu') };
  wiki.close();
  await odota(200);
  const sulun = { koti: nappi.closest('dialog')?.id ?? 'body', kelluu: nappi.classList.contains('pollo-kelluu') };
  const nahtavyys = document.getElementById('nahtavyys-dialog');
  nahtavyys.showModal();
  await odota(200);
  const nahtavyydessa = nappi.closest('dialog')?.id ?? 'body';
  nahtavyys.close();
  await odota(200);
  return { wikissa, sulun, nahtavyydessa };
});
vaadi('pöllön nappi siirtyy wiki-ikkunaan kelluvana',
  pollo.wikissa.koti === 'wiki-dialog' && pollo.wikissa.kelluu === true, JSON.stringify(pollo));
vaadi('pöllön nappi palaa wiki-ikkunan sulkeuduttua',
  pollo.sulun.koti === 'body', JSON.stringify(pollo));
vaadi('pöllön nappi siirtyy nähtävyysikkunaan',
  pollo.nahtavyydessa === 'nahtavyys-dialog', JSON.stringify(pollo));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
