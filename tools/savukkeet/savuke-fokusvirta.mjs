/*
 * Savuke: fokusmoodin annosteluvirta Ateenassa (js/fokusvirta.js).
 *
 * Yksikkötestit (tests/fokusvirta.test.mjs) vahtivat tilakoneen, mutta
 * eivät sitä, että kortti oikeasti syntyy selaimessa, kelluu kartan
 * päällä ja vie pelaajan vaiheesta toiseen. Juuri se on tämän paketin
 * riski: virta on ensimmäinen asia, joka piirtyy DOMiin oman
 * moduulinsa kautta eikä ui.js:n renderin läpi.
 *
 * Vartiot:
 *   1. LEHTILUKKO — Tutki-nappi ei avaa saapumiskorttia vaan
 *      annostelukortin niin kauan kuin laatta on kääntämättä.
 *   2. Kortti on karttapinnan sisällä (.map-pane) eikä <dialog>: kartta
 *      näkyy taustalla, ei koko ruudun modaalia.
 *   3. Kulku vaiheesta 1 vaiheeseen 4: matkakirja → pöllö → valinta →
 *      täky, jossa on minivisa. Oikeasta vastauksesta tulee rahaa.
 *   4. Portti: "Jatka aarteelle" on estetty ennen ensimmäistä täkyä ja
 *      aukeaa sen jälkeen (Raamattu, ETENEMINEN).
 *   5. Tila säilyy: kortin sulku ja uusi avaus jatkavat samasta
 *      vaiheesta eivätkä ala alusta.
 *   6. Saapuminen avaa virran itsestään (ANNOSTELU-poikkeus "mikään ei
 *      ponnahda" -sääntöön).
 *
 * Peli istutetaan valmiiksi Ateenaan pelitallenteen kautta: Ateena on
 * Euroopan laudalla, eikä savuke voi lentää sinne maailmankartalta.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

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
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

/* Valmis peli: Herra Fogg seisoo Ateenassa, laatta kääntämättä. */
const peli = new Game({
  players: [{ name: 'Herra Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('europe'),
  seed: 11,
});
peli.tokens.set('ateena', 'topaz');
peli.revealed.delete('ateena');
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 834, height: 1112 } });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Fokusmoodi on oletuksena päällä; varmistetaan silti, ettei
    // kehittäjän kytkin ole jäänyt profiiliin pois päältä.
    localStorage.removeItem('matkakirja-fokusmoodi');
  } catch { /* yksityinen tila — savuke kaatuu myöhemmin selvemmin */ }
}, tallenne);
const sivu = await ctx.newPage();
// Luentapalvelin katkaistaan: savuke ei saa kuluttaa generointikiintiötä.
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

/** Kortin tilanne: otsikot, napit ja sijainti DOM-puussa. */
const kortti = () => sivu.evaluate(() => {
  const el = document.querySelector('.fokusvirta-kortti');
  if (!el) return null;
  return {
    ylarivi: el.querySelector('.fokusvirta-ylarivi')?.textContent ?? '',
    otsikko: el.querySelector('.fokusvirta-otsikko')?.textContent ?? '',
    teksti: el.querySelector('.fokusvirta-teksti')?.textContent ?? '',
    kuvia: el.querySelectorAll('.fokusvirta-kuva img').length,
    napit: [...el.querySelectorAll('.fokusvirta-napit button')]
      .map((b) => ({ teksti: b.textContent, pois: b.disabled })),
    vaihtoehdot: [...el.querySelectorAll('.fokusvirta-vaihtoehdot button')]
      .map((b) => b.textContent),
    tulos: el.querySelector('.fokusvirta-visa-tulos')?.textContent ?? '',
    karttapinnassa: Boolean(el.closest('.map-pane')),
    dialogissa: Boolean(el.closest('dialog')),
    vaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
    rahat: window.matkakirja.game.player.money,
  };
});

/** Painaa kortin napin, jonka teksti täsmää. */
const paina = async (osuma, mista = '.fokusvirta-napit') => {
  await sivu.evaluate(([teksti, valitsin]) => {
    const napit = [...document.querySelectorAll(`.fokusvirta-kortti ${valitsin} button`)];
    napit.find((b) => b.textContent.includes(teksti))?.click();
  }, [osuma, mista]);
  await sivu.waitForTimeout(350);
};

/* --- 1 & 2: Tutki avaa virran, ei saapumiskorttia --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(500);
let tila = await kortti();
const lehtiAuki = await sivu.evaluate(() => document.getElementById('arrival-dialog').open);
vaadi('lehtilukko: saapumiskortti pysyy kiinni', !lehtiAuki);
vaadi('annostelukortti avautui', Boolean(tila), JSON.stringify(tila));
vaadi('kortti kelluu kartan päällä eikä ole modaali',
  tila?.karttapinnassa === true && tila?.dialogissa === false, JSON.stringify(tila));

/* --- 3: vaihe 1 matkakirja --- */
// Tallennettu vaihe on tässä vielä null: virta kirjaa tilansa vasta
// ensimmäisestä siirrosta, jottei pelkkä kortin avaus kirjoita levylle.
vaadi('vaihe 1 on matkakirja isoisän äänellä',
  (tila?.vaihe ?? 'matkakirja') === 'matkakirja' && tila.ylarivi.includes('Matkapäiväkirjasta')
  && tila.otsikko.includes('1873'), JSON.stringify(tila));
vaadi('matkakirjakortilla on vanha kuva', tila?.kuvia === 1, JSON.stringify(tila));

/* --- vaihe 2 pöllö --- */
await paina('Jatka');
tila = await kortti();
vaadi('vaihe 2 on pöllön huomio herokuvineen',
  tila?.vaihe === 'pollo' && tila.ylarivi.includes('Pöllö') && tila.kuvia === 1,
  JSON.stringify(tila));

/* --- vaihe 3 valinta + portti --- */
await paina('Jatka');
tila = await kortti();
const aarreNappi = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('vaihe 3 tarjoaa kolme täkyä ja aarrenapin',
  tila?.vaihe === 'valinta' && tila.napit.length === 4, JSON.stringify(tila));
vaadi('portti kiinni: aarteelle ei pääse ilman täkyä',
  aarreNappi?.pois === true, JSON.stringify(tila?.napit));

/* --- vaihe 4 täky + minivisa --- */
const rahatEnnen = tila.rahat;
await paina('Filosofi');
tila = await kortti();
vaadi('vaihe 4 avaa syvennyksen kuvineen ja minivisoineen',
  tila?.vaihe === 'taky' && tila.kuvia === 1 && tila.vaihtoehdot.length === 3,
  JSON.stringify(tila));

await paina('lyhty', '.fokusvirta-vaihtoehdot');
tila = await kortti();
vaadi('oikea vastaus palkitaan rahalla',
  tila?.tulos.startsWith('Oikein!') && tila.rahat > rahatEnnen,
  JSON.stringify({ tulos: tila?.tulos, ennen: rahatEnnen, nyt: tila?.rahat }));

/* --- portti aukeaa --- */
await paina('Takaisin');
tila = await kortti();
const aarreNyt = tila?.napit.find((n) => n.teksti.includes('aarteelle'));
vaadi('portti aukeaa yhdestä täystä', aarreNyt?.pois === false, JSON.stringify(tila?.napit));
vaadi('tehtyä täkyä ei tarjota uudelleen',
  !tila?.napit.some((n) => n.teksti.includes('Filosofi')), JSON.stringify(tila?.napit));

/* --- 5: tila säilyy sulkemisen yli --- */
await sivu.evaluate(() => {
  document.querySelector('.fokusvirta-sulje').click();
});
await sivu.waitForTimeout(300);
vaadi('sulkunappi sulkee kortin', (await kortti()) === null);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.cityOf());
});
await sivu.waitForTimeout(400);
tila = await kortti();
vaadi('uusi avaus jatkaa samasta vaiheesta, ei alusta',
  tila?.vaihe === 'valinta', JSON.stringify(tila));

/* --- 6: saapuminen avaa virran itsestään --- */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  document.querySelector('.fokusvirta-sulje').click();
  // Saapumisen merkki on sama kuin Tutki-napin sykkeellä; istunnon
  // avausmuisti nollataan, jotta laukaisin saa toimia uudestaan.
  ui.fokusvirtaAvattu = new Set();
  ui.lehtitila.tutkiSyke = 'europe:ateena';
  ui.render();
});
await sivu.waitForTimeout(600);
tila = await kortti();
vaadi('saapuminen avaa virran ilman nappia', Boolean(tila), JSON.stringify(tila));

/* --- vaiheet 5–6 ja luovutus laattamekaniikalle --- */
await paina('aarteelle');
tila = await kortti();
vaadi('vaihe 5 on oppitunti, joka pohjustaa laattakysymystä',
  tila?.vaihe === 'oppitunti' && tila.teksti.includes('demokratia'), JSON.stringify(tila?.vaihe));

await paina('Nikos');
tila = await kortti();
vaadi('vaihe 6 esittelee paikallisen',
  tila?.vaihe === 'kohtaaminen' && tila.otsikko.includes('Nikos'), JSON.stringify(tila?.vaihe));

await paina('Tapaa Nikos');
await sivu.waitForTimeout(900);
const luovutus = await sivu.evaluate(() => ({
  kortti: Boolean(document.querySelector('.fokusvirta-kortti')),
  vaihe: window.matkakirja.game.phase,
  visa: Boolean(window.matkakirja.game.quiz),
  virranVaihe: window.matkakirja.game.fokusvirrat['europe:ateena']?.vaihe ?? null,
}));
vaadi('virta luovuttaa nykyiselle laattamekaniikalle',
  luovutus.vaihe === 'quiz' && luovutus.visa && !luovutus.kortti
  && luovutus.virranVaihe === 'valmis', JSON.stringify(luovutus));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
