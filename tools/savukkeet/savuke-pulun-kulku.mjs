/*
 * Savuke: KAUPUNGIN KULKU — PULU, LUENTA, PULU (ei kuvia).
 *
 * Omistajan linjaus 7.9.2026 (Raamattu, "KAUPUNGIN KULKU: EI KUVIA,
 * PULU - LUENTA - PULU"): saapuminen on kolme hetkeä. Ensin pulun
 * ALUSTUS yhtenä kuplana, sitten isoisän LUENTA — jonka aikana pulu
 * huutaa enintään yhden lyhyen välihuudon tarkasti nimettyyn kohtaan —
 * ja lopuksi pulun KOMMENTTI yhtenä tai kahtena kuplana. Kuvia ei
 * näytetä: ne kuuluvat kaupunkilehteen.
 *
 * MITTAKAUPUNKI ON BUDAPEST. Se on uuden kulun kaupunki, jonka
 * matkakirjamerkinnässä huudahduksen kohta ("Kartantekijöille riittää
 * töitä") on keskellä tekstiä — eli välihuuto ei voi osua kohdalleen
 * vahingossa heti alussa tai lopussa.
 *
 * VARTIOT:
 *   1. ALUSTUS ENNEN LUENTAA: kuplassa lukee alustusteksti, eikä
 *      matkakirjan luenta ole vielä alkanut (ui.diaryVoice on tyhjä tai
 *      soittamatta).
 *   2. LUENTA LÄHTEE ALUSTUKSEN JÄLKEEN: ui.diaryVoice on olemassa.
 *   3. VÄLIHUUTO LUENNAN AIKANA: .fokusvirta-huudahdus ilmestyy ja
 *      siinä lukee pakkauksen huudahdusteksti.
 *   4. KOMMENTTI LUENNAN JÄLKEEN: molemmat kommenttikuplat ovat
 *      pinossa luennan päätyttyä.
 *   5. KUPLA ODOTTAA PUHEEN LOPPUUN: pulun äänite on mokattu SEITSEMÄN
 *      SEKUNNIN mittaiseksi, ja toinen kommenttikupla ei saa tulla
 *      ennen kuin ensimmäisen puhe on ohi. Ilman odotusta kupla
 *      vaihtuisi tekstin lukuajalla (63 merkkiä ≈ 4,9 s) ja lause
 *      katkeaisi kesken (Raamattu, PULU PUHUU: "kupla odottaa puheen
 *      loppuun").
 *   6. EI KUVAA: matkakirjakortilla ei ole valokuvaa.
 *
 * Aja:  node tools/savukkeet/savuke-pulun-kulku.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_BUDAPEST } from '../../js/packs/fokusvirta-budapest.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const RUUTU = { width: 1280, height: 860 };

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
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const ALUSTUS = FOKUSVIRTA_BUDAPEST.pollo.alustus;
const HUUDAHDUS = FOKUSVIRTA_BUDAPEST.pollo.huudahdus.teksti;
const KOMMENTIT = FOKUSVIRTA_BUDAPEST.pollo.kommentti;

/* Tallenne: Fogg Ateenassa, ensimmäinen laatta käännetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

/*
 * MOKATTU PULUN ÄÄNITE (7.9.2026). Ämpärin mp3:t eivät lataudu
 * savukkeessa, joten kesto pitää valehdella: jokainen `aanet/pulu/`
 * -osoitteesta luotu soitin kertoo kestokseen KESTO_S sekuntia ja
 * suostuu soimaan. Muut äänet (isoisän luenta) kulkevat koskematta.
 */
const KESTO_S = 7;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: RUUTU, serviceWorkers: 'block' });
await ctx.addInitScript((kesto) => {
  const Alkuperainen = window.Audio;
  const PuluAudio = function PuluAudio(src) {
    const audio = new Alkuperainen(src);
    if (String(src ?? '').includes('aanet/pulu/')) {
      Object.defineProperty(audio, 'duration', { get: () => kesto, configurable: true });
      // Puuttuva tiedosto ei saa laueta virheeksi: soitto vain onnistuu.
      audio.play = () => Promise.resolve();
      window.__puluAanet = (window.__puluAanet ?? 0) + 1;
    }
    return audio;
  };
  PuluAudio.prototype = Alkuperainen.prototype;
  window.Audio = PuluAudio;
  /*
   * KUPLIEN ILMESTYMISHETKET talteen heti sivun alusta: kommentti voi
   * tulla ruudulle jo silloin kun savuke odottaa välihuutoa, eikä
   * väliä voi siksi mitata jälkikäteen kyselemällä.
   */
  window.__kuplaHetket = [];
  const nahdyt = new Set();
  setInterval(() => {
    for (const kupla of document.querySelectorAll('.pollo-kuplapino .pollo-vihje')) {
      const teksti = (kupla.textContent ?? '').trim();
      if (!teksti || nahdyt.has(teksti)) continue;
      nahdyt.add(teksti);
      window.__kuplaHetket.push({ teksti, aika: performance.now() });
    }
  }, 50);
}, KESTO_S);
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Avaus ja tuurauspaljastus on nähty: tämä savuke mittaa KAUPUNGIN
    // kulkua, ei ensisaapumisen kertasarjoja (js/livia.js).
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);

const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());

await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(2000);

/* Saapuminen Budapestiin pelin omalla tilalla — sama kytkentä kuin
 * renderFactissa (js/ui.js), joten kulku alkaa kuten pelaajalla. */
await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: 'budapest' };
  game.world.visited.add('budapest');
  game.arrivalFact = { packId: game.pack.id, cityId: 'budapest' };
  ui.render();
});

/** Kuplapinon teksti ja välihuudon tila yhdellä lukemalla. */
const lue = () => sivu.evaluate(() => ({
  pino: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
    .map((k) => k.textContent ?? '').join(' '),
  huudahdus: document.querySelector('.fokusvirta-huudahdus')?.textContent ?? '',
  luenta: Boolean(window.matkakirja.ui.diaryVoice),
  luennanAika: window.matkakirja.ui.diaryVoice?.currentTime ?? 0,
  kuva: Boolean(document.querySelector('.fact-valokuva:not([hidden])')),
}));

/* 1. Alustus ennen luentaa. */
let tila = null;
for (let i = 0; i < 40; i += 1) {
  tila = await lue();
  if (tila.pino.includes(ALUSTUS.slice(0, 24))) break;
  await sivu.waitForTimeout(300);
}
tieto('alustuksen hetki', JSON.stringify(tila));
vaadi('alustus tulee kuplaan ennen luentaa',
  tila.pino.includes(ALUSTUS.slice(0, 24)) && tila.luennanAika === 0,
  JSON.stringify(tila).slice(0, 200));
vaadi('matkakirjakortilla ei ole kuvaa', tila.kuva === false, JSON.stringify(tila.kuva));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '1-alustus.png') });

/* 2. Luenta lähtee alustuksen jälkeen. */
for (let i = 0; i < 60; i += 1) {
  tila = await lue();
  if (tila.luenta) break;
  await sivu.waitForTimeout(300);
}
vaadi('isoisän luenta lähtee alustuksen jälkeen', tila.luenta === true, JSON.stringify(tila));

/* 3. Välihuuto luennan aikana. */
let huuto = '';
for (let i = 0; i < 80; i += 1) {
  const nyt = await lue();
  if (nyt.huudahdus) { huuto = nyt.huudahdus; break; }
  await sivu.waitForTimeout(300);
}
vaadi('välihuuto ilmestyy luennan aikana', huuto.includes(HUUDAHDUS), huuto || '(ei tullut)');
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '2-huudahdus.png') });

/* 4. Kommentti luennan jälkeen: luenta katkaistaan kuten pelaaja
 *    tekisi kuuntelunapista, ja kommentti tulee sen päätyttyä.
 *
 *    SAMALLA MITATAAN KUPLIEN VÄLI: mokattu äänite kestää KESTO_S
 *    sekuntia, joten toinen kupla ei saa tulla ennen kuin ensimmäisen
 *    puhe on ohi. Aika luetaan selaimen omasta kellosta, jotta
 *    kyselyn viive ei sotke mittausta. */
await sivu.evaluate(() => { window.matkakirja.ui.diaryVoice?.pause(); });
const kelloJaPino = () => sivu.evaluate(() => ({
  pino: [...document.querySelectorAll('.pollo-kuplapino .pollo-vihje')]
    .map((k) => k.textContent ?? '').join(' '),
  aanet: window.__puluAanet ?? 0,
  hetket: window.__kuplaHetket ?? [],
}));
let pino = '';
let aanet = 0;
let hetket = [];
for (let i = 0; i < 200; i += 1) {
  const nyt = await kelloJaPino();
  ({ pino, aanet, hetket } = nyt);
  if (KOMMENTIT.every((k) => pino.includes(k.slice(0, 24)))) break;
  await sivu.waitForTimeout(150);
}
/** Kuplan ilmestymishetki selaimen omalta kellolta (ms). */
const kuplanHetki = (teksti) => hetket
  .find((h) => h.teksti.includes(teksti.slice(0, 24)))?.aika ?? null;
tieto('pino luennan jälkeen', pino.slice(-220));
vaadi('kommentti tulee luennan jälkeen kupliin',
  KOMMENTIT.every((k) => pino.includes(k.slice(0, 24))), pino.slice(-220));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, '3-kommentti.png') });

/* 5. Kupla odottaa puheen loppuun. */
const LUKUAIKA_MS = Math.min(9500, Math.max(3200, KOMMENTIT[0].length * 78));
const VAADITTU_MS = KESTO_S * 1000 + 400;
tieto('mokattuja pulun äänitteitä', aanet);
tieto('kommentin lukuaika vs. puheen mitta', `${LUKUAIKA_MS} ms → ${VAADITTU_MS} ms`);
vaadi('pulun äänite oikeasti soi', aanet > 0,
  'yksikään aanet/pulu/-soitin ei syntynyt — vartio ei mittaisi mitään');
const eka = kuplanHetki(KOMMENTIT[0]);
const toka = kuplanHetki(KOMMENTIT.at(-1));
const vali = eka !== null && toka !== null ? Math.round(toka - eka) : -1;
tieto('kuplien väli', `${vali} ms (lukuaika ${LUKUAIKA_MS} ms)`);
/*
 * Selaimen oma tarkkailija poimii hetket 50 ms:n välein, joten rajaksi
 * riittää puheen mitta miinus puoli sekuntia — se on yhä selvästi yli
 * pelkän lukuajan (4,9 s), eli vartio kaatuisi heti jos odotus
 * poistettaisiin.
 */
vaadi('toinen kupla odottaa ensimmäisen puheen loppuun',
  vali >= VAADITTU_MS - 500,
  `väli ${vali} ms, pitäisi olla vähintään ${VAADITTU_MS - 500} ms`);

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
