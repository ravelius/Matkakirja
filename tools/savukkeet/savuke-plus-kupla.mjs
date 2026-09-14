/*
 * Savuke: puhelimen pluskupla avaa pulun repliikin tekstin.
 *
 * Omistajan päätös 14.9.2026, sanatarkasti:
 *   *"Pululla on se pieni puhekupla jossa plus merkki. Siitä tulee
 *   teksti näkyviin."*
 *
 * TAUSTA. v1891 piilotti puhelimella koko kuplapinon css:llä, koska
 * kuplat peittivät kartan ja isoisän kuvan. Se jätti avoimen kysymyksen:
 * äänettömällä puhelimella pulun repliikki jäi kokonaan saamatta.
 * Omistajan vastaus on pelin OMA mekanismi — kuplien sulkeminen jättää
 * jäljelle pienen pluskuplan (.pollo-kuplapalautus, 13.9.2026), jonka
 * napautus palauttaa viimeisimmän repliikin. Puhelimella kupla siis
 * ALOITTAA suljettuna (js/pollo.js lisaaPinoon → imePuhelimenKuplaan).
 *
 * VARTIOT (jokaisella VASTAKOE — työpöytä on se vastakoe, koska sääntö
 * ei saa päteä siellä):
 *   1. Ennen repliikkiä pluskuplaa ei ole näkyvissä.
 *   2. Repliikin jälkeen puhelimella NÄKYY pluskupla eikä yhtään
 *      kuplatekstiä; työpöydällä päinvastoin (vastakoe).
 *   3. Pluskuplan napautus tuo tekstin näkyviin ja piilottaa
 *      pluskuplan.
 *   4. Lukuajan jälkeen teksti imeytyy takaisin pluskuplaan — teksti on
 *      siis aina uudelleen avattavissa eikä jää peittämään karttaa.
 *   5. Sama koskee saapumisen OHJEKUPLAA (laji 'vihje'), ei vain
 *      Livian repliikkiä: molemmat ovat pulun tekstiä.
 *   6. Pluskupla on sormen mitassa (≥ 44 × 44) eikä osu pulun nappiin.
 *   7. Työpöydällä kuplat pinoutuvat kuten ennenkin (kaksi kuplaa
 *      näkyvissä yhtä aikaa) — vastakoe koko säännölle.
 *
 * Kontin selain ei lataa äänitteitä eikä karttapalloa, mutta kuplat
 * ovat tavallista DOMia: savuke kutsuu pollon omia vientifunktioita
 * (polloPuheenvuoro, polloVihje) eikä matki niitä.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { pulunKuplanPiilotusviive } from '../../js/pollo.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const avaa = async (asetukset) => {
  const konteksti = await selain.newContext(asetukset);
  await konteksti.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await konteksti.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (r) => r.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  // Kontti ei pääse ulkoverkkoon: muu ulkoinen liikenne katkaistaan,
  // jottei sivun latausvahti jää odottamaan aikakatkaisua.
  await sivu.route('**/*', (r) => (r.request().url().startsWith('http://localhost')
    ? r.continue() : r.abort()));
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForTimeout(3500);
  return { konteksti, sivu };
};

/** Livian repliikki pollon omalla vientifunktiolla (laji 'puhe'). */
const repliikki = (sivu, teksti) => sivu.evaluate(async (t) => {
  const P = await import('/js/pollo.js');
  P.polloPuheenvuoro([t]);
}, teksti);
/** Saapumisen ohjekupla (laji 'vihje'). */
const ohjekupla = (sivu, teksti) => sivu.evaluate(async (t) => {
  const P = await import('/js/pollo.js');
  P.polloVihje(t);
}, teksti);

const mittaa = () => {
  const nakyy = (el) => {
    if (!el || el.hidden) return false;
    const r = el.getBoundingClientRect();
    const t = getComputedStyle(el);
    return r.width > 2 && r.height > 2 && t.display !== 'none' && t.visibility !== 'hidden';
  };
  const plus = document.querySelector('.pollo-kuplapalautus');
  const kuplat = [...document.querySelectorAll('.pollo-vihje')].filter(nakyy);
  const pr = plus?.getBoundingClientRect();
  const nappi = document.querySelector('.pollo-nappi')?.getBoundingClientRect();
  const osuu = Boolean(pr && nappi && pr.width > 0 && nappi.width > 0
    && pr.x < nappi.x + nappi.width && nappi.x < pr.x + pr.width
    && pr.y < nappi.y + nappi.height && nappi.y < pr.y + pr.height);
  return {
    plusNakyy: nakyy(plus),
    plusKoko: pr ? { w: Math.round(pr.width), h: Math.round(pr.height) } : null,
    plusMerkki: (plus?.textContent ?? '').trim(),
    kuplia: kuplat.length,
    tekstit: kuplat.map((k) => k.textContent),
    plusOsuuNappiin: osuu,
  };
};

const REPLIIKKI = 'Ateenassa keskustelu keksittiin, ja sitä on jatkettu siitä asti.';
const OHJE = 'Tervetuloa Ateenaan. Napauta kaupunkia.';
/* Lukuaika + imun varmuusmarginaali (js/pollo.js pulunKuplanPiilotusviive). */
const LUKUAIKA_MS = pulunKuplanPiilotusviive(REPLIIKKI) + 1500;

/* --- PUHELIN: pysty ja vaaka --- */
for (const [nimi, ase] of [
  ['pysty', {
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  }],
  ['vaaka', {
    viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  }],
]) {
  const { konteksti, sivu } = await avaa(ase);
  const alussa = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: ennen repliikkiä ei pluskuplaa eikä kuplia`,
    alussa.plusNakyy === false && alussa.kuplia === 0, JSON.stringify(alussa));

  await repliikki(sivu, REPLIIKKI);
  await sivu.waitForTimeout(900);
  const suljettu = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: repliikki jättää jäljelle VAIN pluskuplan`,
    suljettu.plusNakyy === true && suljettu.kuplia === 0, JSON.stringify(suljettu));
  vaadi(`puhelin ${nimi}: pluskuplassa on plusmerkki`,
    suljettu.plusMerkki === '+', suljettu.plusMerkki);
  vaadi(`puhelin ${nimi}: pluskupla on sormen mitassa (≥ 44 × 44)`,
    suljettu.plusKoko?.w >= 44 && suljettu.plusKoko?.h >= 44, JSON.stringify(suljettu.plusKoko));
  vaadi(`puhelin ${nimi}: pluskupla ei osu pulun nappiin`,
    suljettu.plusOsuuNappiin === false);

  await sivu.evaluate(() => document.querySelector('.pollo-kuplapalautus').click());
  await sivu.waitForTimeout(600);
  const avattu = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: pluskuplan napautus tuo repliikin tekstin näkyviin`,
    avattu.kuplia === 1 && avattu.tekstit[0].includes('keskustelu keksittiin'),
    JSON.stringify(avattu));
  vaadi(`puhelin ${nimi}: avattuna pluskupla on poissa`,
    avattu.plusNakyy === false, JSON.stringify(avattu.plusNakyy));

  await sivu.waitForTimeout(LUKUAIKA_MS);
  const takaisin = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: lukuajan jälkeen teksti imeytyy takaisin pluskuplaan`,
    takaisin.plusNakyy === true && takaisin.kuplia === 0, JSON.stringify(takaisin));

  /* OHJEKUPLA ON SAMAA PULUN TEKSTIÄ (laji 'vihje'). */
  await ohjekupla(sivu, OHJE);
  await sivu.waitForTimeout(900);
  const ohje = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: myös saapumisen ohjekupla menee pluskuplaan`,
    ohje.plusNakyy === true && ohje.kuplia === 0, JSON.stringify(ohje));
  await sivu.evaluate(() => document.querySelector('.pollo-kuplapalautus').click());
  await sivu.waitForTimeout(600);
  const ohjeAuki = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: ohjekuplan teksti aukeaa pluskuplasta`,
    ohjeAuki.kuplia === 1 && ohjeAuki.tekstit[0].includes('Tervetuloa Ateenaan'),
    JSON.stringify(ohjeAuki));
  await konteksti.close();
}

/* --- TYÖPÖYTÄ: VASTAKOE. Sääntö ei saa päteä siellä. --- */
{
  const { konteksti, sivu } = await avaa({ viewport: { width: 1400, height: 900 } });
  await repliikki(sivu, REPLIIKKI);
  await sivu.waitForTimeout(900);
  const yksi = await sivu.evaluate(mittaa);
  vaadi('työpöytä (vastakoe): repliikki näkyy kuplana, pluskuplaa ei tarvita',
    yksi.kuplia === 1 && yksi.plusNakyy === false, JSON.stringify(yksi));

  await ohjekupla(sivu, OHJE);
  await sivu.waitForTimeout(900);
  const kaksi = await sivu.evaluate(mittaa);
  vaadi('työpöytä (vastakoe): kuplat pinoutuvat kuten ennenkin',
    kaksi.kuplia === 2, JSON.stringify(kaksi));
  await konteksti.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
