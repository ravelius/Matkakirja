/*
 * SELAINSAVUKE: PULUN VALMISKYSYMYS KANTAA KORTIN AIHEEN KONTEKSTIIN.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-pulu-konteksti.mjs
 *
 * Omistajan löydös 30.9.2026 (TF 78/79): kartan kortti "Segovian akvedukti"
 * → valmis kysymys "Miten akveduktin ikä selvitettiin?" → Pulu vastasi,
 * ettei tiedä, mistä akvedukista on kyse. Juurisyy: kysymys lähti pulun
 * chattiin ilman, että kortin aihe kulki mukana (täkynoston kortti sulkeutuu
 * kysymyksen alussa, eikä kohdetietoruutu ole silloin enää auki).
 * Korjaus: js/pollo.js polloKysy(kysymys, { aihe }) + lueNakyma.
 *
 * Mitä mitataan — pöllöpalvelimelle lähtevä POST-runko, kenttä `konteksti`:
 *   A. Kohdekortti (Segovian akvedukti): ensimmäisen .fokuskohde-kysymys-napin
 *      napautus → konteksti sisältää "Segovian akvedukti".
 *   B. Täkynoston kortti (Pariisi, lustig-eiffel): ensimmäisen
 *      .fokusnosto-kysymys-napin napautus → konteksti sisältää rivin
 *      "Kortti, josta pelaaja kysyy: <noston otsikko>".
 *
 * TURVA: pöllöpalvelimen osoitteeseen (samireivinen.workers.dev) EI KOSKAAN
 * päästetä oikeaa pyyntöä — sillä on maksulliset IP-rajat. Jokainen pyyntö
 * vastataan pienellä keksityllä vastauksella tässä reitillä.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_PARIISI } from '../../js/packs/fokusvirta-pariisi.js';
import { avaaChromium } from '../selain.mjs';

const JUURI = new URL('../..', import.meta.url).pathname;

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

/** Koe A: kohde ja sen ensimmäinen valmiskysymys. */
const KOHDE_ID = 'segovian-akvedukti';
const KOHDE_NIMI = 'Segovian akvedukti';
/** Koe B: Pariisin täkynosto, jolla on kysymyksiä (ja kuva → "lisää"-nappi). */
const NOSTO = FOKUSVIRTA_PARIISI.takynostot.find((n) => n.id === 'lustig-eiffel' && n.kysymykset?.length)
  ?? FOKUSVIRTA_PARIISI.takynostot.find((n) => n.kysymykset?.length);

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (!kirjasto) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

/* ---------- Tallenne: Fogg Pariisissa, vuoro toiminnassa ---------- */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await avaaChromium({});
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
}, tallenne);
const s = await ctx.newPage();
const virheet = [];
s.on('pageerror', (e) => virheet.push(String(e.message ?? e)));

/* ---------- Pöllöpalvelimen sieppaus: oikeaa pyyntöä ei päästetä läpi ---------- */
const POLLOPYYNNOT = [];
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
};
await s.route(/workers\.dev/, async (r) => {
  const p = r.request();
  if (p.method() !== 'POST') { await r.fulfill({ status: 204, headers: CORS }); return; }
  let runko = {};
  try { runko = JSON.parse(p.postData() ?? '{}'); } catch { /* */ }
  POLLOPYYNNOT.push(runko);
  await r.fulfill({
    status: 200, contentType: 'application/json', headers: CORS,
    body: JSON.stringify({ vastaus: 'Testivastaus.', syy: null }),
  });
});
await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && !/workers\.dev$/.test(u.hostname), (r) => {
  const u = r.request().url();
  if (u.startsWith(AMPARI) || /r2\.dev\//.test(u)) return r.fallback();
  return r.abort();
});
await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
  const v = await ampariHaku(r.request().url());
  if (!v) { r.abort(); return; }
  r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
});

await s.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta aukesi', auki);
await s.waitForTimeout(3000);

/** Odota uutta vastauspyyntöä (tehtava 'vastaus') ja palauta sen runko. */
const odotaPyynto = async (ennen) => {
  for (let i = 0; i < 40; i += 1) {
    const uusi = POLLOPYYNNOT.slice(ennen).find((r) => r?.tehtava === 'vastaus' || typeof r?.kysymys === 'string');
    if (uusi) return uusi;
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(250);
  }
  return null;
};
/** Pulu valmiiksi lepotilaan kokeiden välillä: paneeli kiinni, vastaus ei kesken. */
const siivoa = () => s.evaluate(async () => {
  const odota = (ms) => new Promise((v) => setTimeout(v, ms));
  for (let i = 0; i < 20 && window.matkakirjaPollo?.kesken; i += 1) await odota(250);
  const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
  const { suljeNostonKortti } = await import('/js/fokusnosto.js');
  suljeFokuskohde(window.matkakirja.ui);
  suljeNostonKortti(window.matkakirja.ui);
  window.matkakirjaPollo?.sulje?.();
  await odota(400);
  return { kesken: Boolean(window.matkakirjaPollo?.kesken) };
});

/* ---------- A. Kohdekortti ---------- */
const alkuA = POLLOPYYNNOT.length;
const a = await s.evaluate(async ({ id }) => {
  const odota = (ms) => new Promise((v) => setTimeout(v, ms));
  const { KOHDE_MAAT, avaaFokuskohde } = await import('/js/fokuskohteet.js');
  const kohde = Object.values(KOHDE_MAAT).flat().find((k) => k.id === id);
  if (!kohde) return { virhe: 'kohdetta ei löydy KOHDE_MAAT-taulusta' };
  avaaFokuskohde(window.matkakirja.ui, kohde);
  await odota(900);
  // Kuva edellä -kortti: juttu ja kysymykset latoutuvat "lisää"-napista.
  document.querySelector('.fokuskohde-popup .nostokuva-lisaa')?.click();
  await odota(700);
  const nappi = document.querySelector('.fokuskohde-popup .fokuskohde-kysymys');
  if (!nappi) return { virhe: 'kohdekortissa ei kysymysnappia' };
  const teksti = nappi.textContent;
  nappi.click();
  return { teksti };
}, { id: KOHDE_ID });
vaadi('A: kohdekortin kysymysnappi löytyi ja napautettiin', Boolean(a.teksti), JSON.stringify(a));
const pyyntoA = a.teksti ? await odotaPyynto(alkuA) : null;
vaadi('A: pöllöpalvelimelle lähti kysymyspyyntö', Boolean(pyyntoA), 'ei pyyntöä (pulu ei näkynyt tai kysymys hylättiin)');
tieto('A kysymys', a.teksti);
tieto('A konteksti (300 merkkiä)', JSON.stringify(String(pyyntoA?.konteksti ?? '').slice(0, 300)));
vaadi(`A: konteksti sisältää "${KOHDE_NIMI}"`, String(pyyntoA?.konteksti ?? '').includes(KOHDE_NIMI),
  JSON.stringify(String(pyyntoA?.konteksti ?? '').slice(0, 300)));
tieto('A siivous', JSON.stringify(await siivoa()));

/* ---------- B. Täkynoston kortti ---------- */
const alkuB = POLLOPYYNNOT.length;
const b = await s.evaluate(async (nostoId) => {
  const odota = (ms) => new Promise((v) => setTimeout(v, ms));
  const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
  const loytyi = avaaNostonTunnuksella(window.matkakirja.ui, nostoId);
  await odota(500);
  document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
  await odota(700);
  const nappi = document.querySelector('.fokusnosto-kortti .fokusnosto-kysymys');
  if (!nappi) return { loytyi, virhe: 'nostokortissa ei kysymysnappia' };
  const teksti = nappi.textContent;
  nappi.click();
  await odota(200);
  return { loytyi, teksti, korttiKiinni: !document.querySelector('.fokusnosto-kortti') };
}, NOSTO.id);
vaadi('B: nostokortin kysymysnappi löytyi ja napautettiin', Boolean(b.teksti), JSON.stringify(b));
tieto('B: nostokortti kiinni kysymyksen jälkeen (ajoitus vaihtelee, ei vaatimus)', String(b.korttiKiinni));
const pyyntoB = b.teksti ? await odotaPyynto(alkuB) : null;
vaadi('B: pöllöpalvelimelle lähti kysymyspyyntö', Boolean(pyyntoB), 'ei pyyntöä');
tieto('B kysymys', b.teksti);
tieto('B konteksti (300 merkkiä)', JSON.stringify(String(pyyntoB?.konteksti ?? '').slice(0, 300)));
vaadi(`B: konteksti sisältää rivin "Kortti, josta pelaaja kysyy: ${NOSTO.otsikko.slice(0, 30)}…"`,
  String(pyyntoB?.konteksti ?? '').includes(`Kortti, josta pelaaja kysyy: ${NOSTO.otsikko}`),
  JSON.stringify(String(pyyntoB?.konteksti ?? '').slice(0, 300)));

if (virheet.length) tieto('sivuvirheet', JSON.stringify(virheet.slice(0, 3)));
await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
