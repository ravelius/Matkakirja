/*
 * Savuke: LIFTATESSA REITIT PIIRTYVÄT HEITON KANTAMAN PÄÄHÄN.
 *
 * OMISTAJA 20.9.2026 klo 13.30 (kaappaus liftaus-reitit-puuttuvat.webp,
 * Bryssel): *"liftatessa näkyy vain ne reitit jotka olivat piirtyneet
 * ennen nopan heittoa. kun noppaa heitti ja kartta laajeni ulospäin,
 * uudet näkyviin tulleet reitit eivät piirtyneet kartalle."*
 * Päätös klo 13.45: piirretään ne kaaret, joita pitkin tällä heitolla
 * voi edetä — ei kaikkien näkyvien kaupunkien reittejä.
 *
 * VARTIOT (Bryssel, maakulku):
 *   1. Heitto 1: vain oman kaupungin kaaret (Pariisi, Amsterdam).
 *   2. Heitto 6: kantama ulottuu jatkokaariin — Pariisi–Lontoo ja
 *      Amsterdam–Berliini ovat mukana, ja kaaria on enemmän kuin
 *      kahdella omalla.
 *   3. Piirretty kerros vastaa valintaa: yhtä monta viivaa kuin kaarta.
 *   4. VASTAKOE: kantama ei ole koko lauta — ulottumattomissa oleva
 *      kaari (Edinburgh–Lontoo kuutosella EI riitä kaikkialle) ei tule
 *      mukaan pienellä heitolla.
 *
 * Aja:  node tools/savukkeet/savuke-liftaus-reitit.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  const polku = join(JUURI, p === '/' ? 'index.html' : p);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'bryssel' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'roll';
peli.tokens.delete('bryssel');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch(
  process.env.CHROMIUM || existsSync('/opt/pw-browsers/chromium')
    ? { executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' } : {},
);
const ctx = await selain.newContext({ viewport: { width: 1400, height: 900 }, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (r) => r.abort());
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(2500);

/*
 * NOPPA LUKITAAN, MUTTA HEITTO ON PELIN OMA. rollDie korvataan vakiolla
 * ja sen jälkeen kutsutaan pelin omaa actionRollia: kantama, kulkutapa
 * ja vaiheen vaihto tulevat oikeaa reittiä, eikä savuke rakenna omaa
 * rinnakkaista laskelmaansa siitä, minne heitolla pääsee.
 */
const heita = (silmaluku) => sivu.evaluate(async (die) => {
  const { ui, game } = window.matkakirja;
  game.phase = 'roll';
  game.travelMode = 'land';
  game.die = null;
  game.moves = new Map();
  game.rollDie = () => die;
  game.actionRoll();
  /*
   * MATKASESSIO ON LIFTAUKSEN VALINTAVAIHE. Pelissä sen avaa Liiku →
   * kulkutapa; savuke merkitsee saman tilan suoraan, koska mitattava
   * asia on reittikerros eikä valikon polku.
   */
  ui.matkaSessio = game.cityOf().id;
  ui.matkareittiAvain = null;
  ui.paivitaMatkareitit();
  await new Promise((r) => setTimeout(r, 400));
  const val = ui.matkareittienValinta();
  return {
    die: game.die,
    vaihe: game.phase,
    siirtoja: game.moves.size,
    kaaret: val.reittiTunnukset,
    kaariaLaudalla: game.board.edgeById.size,
    /*
     * Maailmankartta on pallolauta: litteä SVG-kerros on lepotilassa ja
     * piirron hoitaa js/pallolauta/reitit.js. Sääntö on kuitenkin yksi
     * (ui.matkareittienValinta), joten mitataan se — piirtäjä vain
     * toteuttaa valinnan.
     */
    lepotila: ui.kartta?.lepotila ?? null,
  };
}, silmaluku);

const yksi = await heita(1);
tieto('heitto 1', JSON.stringify(yksi));
vaadi('heitto 1: vain oman kaupungin kaaret',
  yksi.kaaret.length === 2
  && yksi.kaaret.includes('pariisi|bryssel') && yksi.kaaret.includes('bryssel|amsterdam'),
  JSON.stringify(yksi.kaaret));
vaadi('vastakoe: pienellä heitolla kaukainen kaari ei ole mukana',
  !yksi.kaaret.includes('lontoo|pariisi') && !yksi.kaaret.includes('amsterdam|berliini'),
  JSON.stringify(yksi.kaaret));

const kuusi = await heita(6);
tieto('heitto 6', JSON.stringify(kuusi));
vaadi('heitto 6: jatkokaaret piirtyvät (Pariisi–Lontoo)',
  kuusi.kaaret.includes('lontoo|pariisi'), JSON.stringify(kuusi.kaaret));
vaadi('heitto 6: jatkokaaret piirtyvät (Amsterdam–Berliini)',
  kuusi.kaaret.includes('amsterdam|berliini'), JSON.stringify(kuusi.kaaret));
vaadi('heitto 6: kaaria on enemmän kuin omat kaksi',
  kuusi.kaaret.length > yksi.kaaret.length, `${kuusi.kaaret.length} vs ${yksi.kaaret.length}`);
vaadi('heitto 6: kantama ei ole koko lauta',
  kuusi.kaaret.length < 20 && kuusi.kaaret.length < kuusi.kaariaLaudalla,
  `${kuusi.kaaret.length} / ${kuusi.kaariaLaudalla} kaarta`);
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
