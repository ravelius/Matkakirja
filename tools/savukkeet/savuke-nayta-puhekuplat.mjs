/*
 * Savuke: PLUSKUPLA POIS, "NÄYTÄ PUHEKUPLAT" CHATIN YLÄRIVILLE.
 *
 * Omistajan päätös 18.9.2026 (Raamattu "KARTTAUUDISTUKSEN PAATOKSET 34"
 * kohta 20):
 *   a) pulun pieni PLUSKUPLA, johon puhekuplat imeytyivät, poistetaan
 *      näkyvistä kokonaan — elementtiä ei piirretä, joten imeytymisen
 *      kohde katoaa ja kuplat vain sulkeutuvat;
 *   b) pulun chatin YLÄRIVILLE painike "Näytä puhekuplat", joka tuo
 *      ohi menneet kohdekaupungin puhekuplat näkyviin (sama sisältö,
 *      jonka pluskuplan napautus palautti);
 *   c) painike on PIILOSSA, kun näytettäviä kuplia ei ole — ei pelkkää
 *      disabled-tilaa.
 *
 * TÄMÄ KORVAA vanhan savuke-plus-kupla.mjs:n (14.9.2026), joka vartioi
 * juuri poistettua pluskuplaa. Puhelimen sääntö itsessään on ennallaan:
 * kupla ALOITTAA suljettuna (js/pollo.js lisaaPinoon →
 * imePuhelimenKuplaan), vain paluureitti vaihtui.
 *
 * VARTIOT (vastakokeineen):
 *   1. Pluskuplaa ei ole DOMissa missään vaiheessa (kohta 20 a).
 *   2. Repliikin jälkeen puhelimella ei näy yhtään kuplatekstiä;
 *      työpöydällä päinvastoin (vastakoe).
 *   3. Tyhjässä tilanteessa chatin ylärivin nappi on PIILOSSA
 *      (hidden), ei himmennettynä (kohta 20 c) — vastakoe kohdalle 4.
 *   4. Repliikin jälkeen nappi NÄKYY chatin ylärivillä, sen sisällä
 *      (ei kelluvana ruudulla), ja napautus sulkee chatin ja tuo
 *      repliikin tekstin näkyviin.
 *   5. Sama koskee saapumisen OHJEKUPLAA (laji 'vihje').
 *
 * Kontin/Macin selain ei lataa äänitteitä eikä karttapalloa, mutta
 * kuplat ovat tavallista DOMia: savuke kutsuu pollon omia
 * vientifunktioita (polloPuheenvuoro, polloVihje) eikä matki niitä.
 *
 *   PLAYWRIGHT_JS=<polku> CHROMIUM=<polku> \
 *     node tools/savukkeet/savuke-nayta-puhekuplat.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
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

/* Kohdekaupunki on Pariisi (omistajan mittauspyyntö 18.9.2026). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 11,
});
peli.tokens.set('pariisi', 'topaz');
peli.revealed.delete('pariisi');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

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
  // Ulkoverkkoa ei ole: muu liikenne katkaistaan, jottei sivun
  // latausvahti jää odottamaan aikakatkaisua.
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

/** Chatti auki pulun omasta napista, kuten pelaajalla. */
const avaaChat = async (sivu) => {
  await sivu.evaluate(() => document.querySelector('.pollo-nappi')?.click());
  await sivu.waitForTimeout(500);
};

const mittaa = () => {
  const nakyy = (el) => {
    if (!el || el.hidden) return false;
    const r = el.getBoundingClientRect();
    const t = getComputedStyle(el);
    return r.width > 2 && r.height > 2 && t.display !== 'none' && t.visibility !== 'hidden';
  };
  const nappi = document.querySelector('.pollo-naytakuplat');
  const ylarivi = document.querySelector('.pollo-ylarivi');
  const kuplat = [...document.querySelectorAll('.pollo-vihje')].filter(nakyy);
  return {
    // Kohta 20 a: pluskuplaa ei ole DOMissa lainkaan.
    plusDomissa: document.querySelectorAll('.pollo-kuplapalautus').length,
    nappiDomissa: Boolean(nappi),
    nappiNakyy: nakyy(nappi),
    nappiHidden: nappi ? nappi.hidden : null,
    nappiDisabled: nappi ? Boolean(nappi.disabled) : null,
    nappiYlarivilla: Boolean(nappi && ylarivi && ylarivi.contains(nappi)),
    nappiTeksti: (nappi?.textContent ?? '').trim(),
    chatAuki: Boolean(document.querySelector('.pollo-paneeli:not([hidden])')),
    kuplia: kuplat.length,
    tekstit: kuplat.map((k) => k.textContent),
  };
};

const REPLIIKKI = 'Pariisissa keskustelu keksittiin uudelleen joka kahvilassa.';
const OHJE = 'Tervetuloa Pariisiin. Napauta kaupunkia.';

/* --- PUHELIN 390 px: pysty ja vaaka --- */
for (const [nimi, ase] of [
  ['pysty', {
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  }],
  ['vaaka', {
    viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
  }],
]) {
  const { konteksti, sivu } = await avaa(ase);

  /* 3. VASTAKOE: tyhjässä tilanteessa nappi on piilossa. */
  await avaaChat(sivu);
  const tyhja = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: tyhjänä nappi on piilossa eikä disabled`,
    tyhja.chatAuki === true && tyhja.nappiNakyy === false
      && tyhja.nappiHidden === true && tyhja.nappiDisabled === false,
    JSON.stringify(tyhja));
  vaadi(`puhelin ${nimi}: pluskuplaa ei ole DOMissa alussa`,
    tyhja.plusDomissa === 0, JSON.stringify(tyhja.plusDomissa));
  await sivu.keyboard.press('Escape');
  await sivu.waitForTimeout(400);

  /* 1–2. Repliikki: kuplaa ei jää ruudulle eikä pluskuplaa synny. */
  await repliikki(sivu, REPLIIKKI);
  await sivu.waitForTimeout(900);
  const suljettu = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: repliikki ei jätä kuplaa eikä pluskuplaa ruudulle`,
    suljettu.kuplia === 0 && suljettu.plusDomissa === 0, JSON.stringify(suljettu));

  /* 4. Nappi näkyy chatin ylärivillä ja tuo kuplan takaisin. */
  await avaaChat(sivu);
  const auki = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: "Näytä puhekuplat" näkyy chatin ylärivillä`,
    auki.nappiNakyy === true && auki.nappiYlarivilla === true
      && auki.nappiTeksti === 'Näytä puhekuplat',
    JSON.stringify(auki));

  await sivu.evaluate(() => document.querySelector('.pollo-naytakuplat').click());
  await sivu.waitForTimeout(700);
  const avattu = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: napautus sulkee chatin ja tuo repliikin näkyviin`,
    avattu.chatAuki === false && avattu.kuplia === 1
      && avattu.tekstit[0].includes('keskustelu keksittiin uudelleen'),
    JSON.stringify(avattu));
  vaadi(`puhelin ${nimi}: pluskuplaa ei syntynyt palautuksessakaan`,
    avattu.plusDomissa === 0, JSON.stringify(avattu.plusDomissa));

  /* 5. OHJEKUPLA ON SAMAA PULUN TEKSTIÄ (laji 'vihje'). */
  await ohjekupla(sivu, OHJE);
  await sivu.waitForTimeout(900);
  await avaaChat(sivu);
  await sivu.evaluate(() => document.querySelector('.pollo-naytakuplat')?.click());
  await sivu.waitForTimeout(700);
  const ohjeAuki = await sivu.evaluate(mittaa);
  vaadi(`puhelin ${nimi}: ohjekuplan teksti aukeaa samasta napista`,
    ohjeAuki.kuplia >= 1 && ohjeAuki.tekstit.join(' ').includes('Tervetuloa Pariisiin'),
    JSON.stringify(ohjeAuki));
  await konteksti.close();
}

/* --- TYÖPÖYTÄ: VASTAKOE. Kuplat näkyvät yhä suoraan. --- */
{
  const { konteksti, sivu } = await avaa({ viewport: { width: 1400, height: 900 } });
  await repliikki(sivu, REPLIIKKI);
  await sivu.waitForTimeout(900);
  const yksi = await sivu.evaluate(mittaa);
  vaadi('työpöytä (vastakoe): repliikki näkyy kuplana, pluskuplaa ei tarvita',
    yksi.kuplia === 1 && yksi.plusDomissa === 0, JSON.stringify(yksi));

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
