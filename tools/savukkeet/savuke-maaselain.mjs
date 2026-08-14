/*
 * Savuke: maaselaimen uusi asettelu.
 *  1. Kirjanappi on vasemmassa reunassa.
 *  2. Pilleri näkyy maaselaimessa ja näyttää valitun maan.
 *  3. Valinnan purku ja tilan sulku palauttavat pelaajan maan kylttiin.
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
const tulos = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  // Pelaajalle maa kylttiin vertailupohjaksi.
  ui.paivitaMaaPilleri({ nimi: 'Pelaajan maa' }, 'PEL');
  // Maaselain päälle suoraan (varusteohitus: linssiValittu).
  ui.linssiValittu = 'maatiedot';
  ui.tahdistaMaatiedot(true);
  await odota(300);
  const nappi = document.getElementById('maalehti-nappi');
  nappi.hidden = false;
  const n = nappi.getBoundingClientRect();
  const kartta = document.querySelector('.map-pane').getBoundingClientRect();
  const vasemmalla = n.left - kartta.left < 60;
  const pilleri = () => document.querySelector('.maa-pilleri');
  const pilleriNakyy = () => {
    const p = pilleri();
    return Boolean(p && !p.hidden && getComputedStyle(p).display !== 'none');
  };
  const tilassaNakyy = pilleriNakyy();
  // Valitse maa selaimesta (muodot eivät ehdi latautua testissä —
  // istutetaan testimaa suoraan karttadataan).
  const map = window.matkakirja.game.pack.map;
  map.countryShapes = map.countryShapes ?? {};
  map.countryShapes.TST = {
    nimi: 'Testimaa', renkaat: [[[100, 100], [200, 100], [200, 200], [100, 200]]],
    keskus: [150, 150], leveys: 100,
  };
  const muodot = map.countryShapes;
  const iso = 'TST';
  ui.piirraMaatiedotMaat();
  ui.maatiedotValittu = iso;
  ui.piirraMaatiedotMaat();
  await odota(100);
  const valittuNimi = pilleri()?.querySelector('.maa-pilleri-nimi')?.textContent ?? '';
  const kartallaNimia = document.querySelectorAll('.maatiedot-nimi').length;
  // Valinta pois → pelaajan maa takaisin.
  ui.maatiedotValittu = null;
  ui.piirraMaatiedotMaat();
  await odota(100);
  // Pelaajalla ei ole maata aloitusruudussa: purku piilottaa kyltin.
  const purunJalkeen = pilleri()?.hidden === true;
  // Tila kiinni → pelaajan maa.
  ui.linssiValittu = null;
  ui.tahdistaMaatiedot(false);
  await odota(100);
  const sulunJalkeen = pilleri()?.hidden === true;
  return {
    vasemmalla, tilassaNakyy, valittuNimi, odotettuNimi: muodot[iso]?.nimi ?? '',
    kartallaNimia, purunJalkeen, sulunJalkeen,
  };
});
vaadi('kirjanappi on vasemmassa reunassa', tulos.vasemmalla === true, JSON.stringify(tulos));
vaadi('pilleri näkyy maaselaimessa', tulos.tilassaNakyy === true, JSON.stringify(tulos));
vaadi('valittu maa nousee kylttiin', tulos.valittuNimi === tulos.odotettuNimi && tulos.valittuNimi !== '', JSON.stringify(tulos));
vaadi('kartalle ei piirry nimeä', tulos.kartallaNimia === 0, String(tulos.kartallaNimia));
vaadi('valinnan purku palauttaa pelaajan tilan (kyltti piiloon, ei maata)',
  tulos.purunJalkeen === true, String(tulos.purunJalkeen));
vaadi('tilan sulku palauttaa pelaajan tilan (kyltti piiloon, ei maata)',
  tulos.sulunJalkeen === true, String(tulos.sulunJalkeen));
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
