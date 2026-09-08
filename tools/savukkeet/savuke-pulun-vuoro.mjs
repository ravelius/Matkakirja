/*
 * Savuke: PULU JA KERTOJA EIVÄT PUHU PÄÄLLEKKÄIN.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pulun-vuoro.mjs [kaupungit]
 *
 * Omistajan vikailmoitus 8.9.2026 klo 12.55, sanatarkasti: *"jos
 * minulla on maailma tila päällä kehittäjänä ja menen kuuntelemaan
 * kaupunkeja joissa pululla äänet, niin pulun ja kertojan äänet menevät
 * päällekkäin ja pulu selittää ensin jotain ihan väärää juttua."*
 *
 * Vika ei näy yhdessäkään yksikkötestissä: se syntyy oikeista
 * ajastimista, oikeasta DOMista ja oikeista <audio>-elementeistä, kun
 * kehittäjä hyppää kaupungista toiseen KESKEN pulun lauseen (js/ui.js
 * doKehittajaSiirto). Savuke tekee juuri sen: se odottaa, kunnes pulun
 * repliikki oikeasti soi, hyppää vasta silloin ja katsoo, mitä
 * seuraavassa kaupungissa kuuluu.
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 *   R1  EI VUOTOA KAUPUNGISTA TOISEEN. Hypyn jälkeen ei kuulu
 *       edellisen kaupungin repliikkiä (tiedostonimessä lukee
 *       kaupunki: livia-<kaupunki>-<n>.mp3). Tämä on omistajan
 *       *"ihan väärä juttu"* mitattuna.
 *   R2  KERTOJA EI ALOITA PULUN PÄÄLLE. Yhdenkään matkakirjaluennan
 *       play()-kutsu ei osu hetkeen, jolloin pulun repliikki on
 *       äänessä. Mitta on PÄÄTÖSHETKI eikä kuultu ääni: kontissa
 *       tiedosto lähtee soimaan sekuntien päästä kutsusta, ja se
 *       peittäisi juuri sen ilmiön, jota mitataan.
 *   R3  JÄRJESTYS SÄILYY: ensimmäisessä kaupungissa ISOISÄ ALOITTAA —
 *       kertojan luenta lähtee ennen pulun ensimmäistä repliikkiä
 *       (Raamattu: KAUPUNGIN KULKU, ja sen kavennus 8.9.2026, jolla
 *       alustuskupla poistui: pulu puhuu vasta luennan aikana ja sen
 *       jälkeen).
 *
 * VERKKO: äänet tulevat ämpäristä Noden kautta (CLAUDE.md:
 * NODE_USE_ENV_PROXY=1), kuten savuke-pulu-ateenassa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
/* Kaupungit, joissa pululla on äänitetyt repliikit (LIVIAN_AANITETYT). */
const KAUPUNGIT = (process.argv[2] ?? 'riika,vilna,praha').split(',').map((s) => s.trim());
/* Kuinka pitkälle pulun lauseeseen ehditään ennen hyppyä. */
const HYPYN_VIIVE_MS = 2500;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Tallenne: peli käynnissä maailmankartalla, jotta hyppy on mahdollinen. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const ctx = await selain.newContext({
  viewport: { width: 834, height: 1194 }, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (v) => virheet.push(String(v.message ?? v)));

const valimuisti = new Map();
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const url = route.request().url();
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: Buffer.from(await v.arrayBuffer()),
    })).catch((e) => ({ status: 502, contentType: 'text/plain', body: Buffer.from(String(e)) })));
  }
  route.fulfill(await valimuisti.get(url));
});
await sivu.route('**workers.dev/**', (route) => route.abort());

/*
 * MITTAUS TAPAHTUMISTA. Jokainen <audio> kirjataan kolmella hetkellä:
 * play()-KUTSU (pelin päätös), soiton alku ja loppu. Kupla luetaan
 * MutationObserverista — kumpikaan ei ole ajastimen varassa.
 */
await sivu.addInitScript(() => {
  window.__loki = [];
  const nyt = () => Math.round(performance.now());
  const OikeaAudio = window.Audio;
  window.Audio = function Audio(...args) {
    const audio = new OikeaAudio(...args);
    const rivi = {
      laji: 'aani', src: String(args[0] ?? ''), kutsuttu: null, pysaytetty: null,
      alkoi: null, loppui: null,
    };
    window.__loki.push(rivi);
    const oikeaPlay = audio.play.bind(audio);
    audio.play = () => {
      if (rivi.kutsuttu === null) rivi.kutsuttu = nyt();
      return oikeaPlay();
    };
    /*
     * PYSÄYTYS KIRJATAAN KUTSUSTA, EI TAPAHTUMASTA. 'pause'-tapahtuma
     * on jonossa oleva tehtävä, ja ajastimia kuristavassa kontissa se
     * saapuu satoja millisekunteja myöhässä — mittari näyttäisi silloin
     * ääntä, joka on jo vaiennut. pause() itse on synkroninen.
     */
    const oikeaPause = audio.pause.bind(audio);
    audio.pause = () => {
      if (rivi.pysaytetty === null && rivi.kutsuttu !== null) rivi.pysaytetty = nyt();
      return oikeaPause();
    };
    audio.addEventListener('playing', () => { if (rivi.alkoi === null) rivi.alkoi = nyt(); });
    for (const laji of ['ended', 'pause', 'error']) {
      audio.addEventListener(laji, () => {
        if (rivi.alkoi !== null && rivi.loppui === null) rivi.loppui = nyt();
      });
    }
    return audio;
  };
  window.Audio.prototype = OikeaAudio.prototype;
  const vahti = new MutationObserver((muutokset) => {
    for (const muutos of muutokset) {
      for (const solmu of muutos.addedNodes) {
        if (solmu.nodeType !== 1) continue;
        const kuplat = solmu.matches?.('.pollo-vihje, .fokusvirta-huudahdus')
          ? [solmu] : [...(solmu.querySelectorAll?.('.pollo-vihje, .fokusvirta-huudahdus') ?? [])];
        for (const kupla of kuplat) {
          window.__loki.push({ laji: 'kupla', t: nyt(), teksti: kupla.textContent.trim() });
        }
      }
    }
  });
  const kiinnita = () => {
    if (!document.documentElement) return false;
    vahti.observe(document.documentElement, { childList: true, subtree: true });
    return true;
  };
  if (!kiinnita()) document.addEventListener('readystatechange', kiinnita, { once: true });
});

await sivu.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    // Kehittäjätila ja maailmanäkymä päälle: omistajan tilanne.
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
    // Avaus ja tuurauspaljastus on nähty: mitataan kaupungin kulkua.
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, TALLENNE);

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForTimeout(3000);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => { window.__loki.length = 0; });

const hyppaa = async (kaupunki) => sivu.evaluate((id) => {
  const { ui, game } = window.matkakirja;
  window.__loki.push({ laji: 'hyppy', t: Math.round(performance.now()), kaupunki: id });
  ui.doKehittajaSiirto(game.board.cityById.get(id));
}, kaupunki);

/* Ensimmäinen kaupunki: koko kulku rauhassa (R3 mitataan tästä). */
await hyppaa(KAUPUNGIT[0]);
await sivu.waitForFunction(
  () => window.__loki.some((r) => r.laji === 'aani' && /puhe-/.test(r.src) && r.kutsuttu !== null),
  null, { timeout: 120000 },
).catch(() => console.log('HUOM  isoisän luenta ei lähtenyt 120 s:ssa'));

/* Loput hypyt KESKEN pulun lauseen — siinä vika syntyy. */
for (const kaupunki of KAUPUNGIT.slice(1)) {
  await sivu.waitForFunction(() => window.__loki.some(
    (r) => r.laji === 'aani' && /aanet\/pulu\//.test(r.src) && r.alkoi !== null && r.loppui === null,
  ), null, { timeout: 90000 })
    .catch(() => console.log(`HUOM  pulun ääntä ei kuulunut ennen hyppyä (${kaupunki})`));
  await sivu.waitForTimeout(HYPYN_VIIVE_MS);
  await hyppaa(kaupunki);
}
await sivu.waitForTimeout(20000);

const loki = await sivu.evaluate(() => window.__loki);
const nimi = (src) => String(src).split('/').pop();
const aanet = loki.filter((r) => r.laji === 'aani' && r.kutsuttu !== null);
const hypyt = loki.filter((r) => r.laji === 'hyppy');
const paattyi = (r) => Math.min(r.loppui ?? Infinity, r.pysaytetty ?? Infinity);
/*
 * VAIN MITATTAVAT JAKSOT. Soitin, joka ei koskaan ehtinyt aloittaa
 * ('playing' tulematta) tai jonka loppua ei nähty ennen ajon päättymistä,
 * ei kerro mitään päällekkäisyydestä — se kertoo vain kontin verkosta.
 */
const puluJaksot = aanet.filter((r) => /aanet\/pulu\//.test(r.src))
  .filter((r) => r.alkoi !== null && Number.isFinite(paattyi(r)))
  .map((r) => ({ nimi: nimi(r.src), a: r.alkoi, b: paattyi(r) }));

tieto('äänet', JSON.stringify(aanet.map(
  (r) => `${nimi(r.src)} play=${r.kutsuttu} ${r.alkoi ?? '-'}–${r.loppui ?? '-'} stop=${r.pysaytetty ?? '-'}`,
)));
tieto('hypyt', JSON.stringify(hypyt.map((h) => `${h.t}: ${h.kaupunki}`)));

/*
 * R1: edellisen kaupungin repliikki ei kuulu uudessa kaupungissa.
 *
 * Raja on VÄLJÄ tarkoituksella: häivytys (js/liviapuhe.js
 * LIVIAN_HAIVYTYS_MS) saa viedä lauseen loppuun pehmeästi, ja
 * kuristettu ajastin voi venyttää sen yhden tikin verran. Sekunnin
 * yli menevä häntä on eri asia — silloin edellisen kaupungin lause
 * jatkuu uuden kaupungin päällä.
 */
const VUODON_RAJA_MS = 1000;
const vuodot = [];
hypyt.forEach((hyppy, i) => {
  const loppu = hypyt[i + 1]?.t ?? Infinity;
  for (const jakso of puluJaksot) {
    const osuma = /livia-([a-z-]+)-\d+\.mp3/.exec(jakso.nimi);
    if (!osuma || osuma[1] === hyppy.kaupunki) continue;
    const paattyiKun = Number.isFinite(jakso.b) ? jakso.b : loppu;
    if (paattyiKun > hyppy.t + VUODON_RAJA_MS && jakso.a < loppu) {
      vuodot.push(`${jakso.nimi} kuului ${hyppy.kaupunki}-hypyn jälkeen `
        + `${Math.round(paattyiKun - Math.max(jakso.a, hyppy.t))} ms`);
    }
  }
});
vaadi('R1 edellisen kaupungin repliikki ei kuulu uudessa kaupungissa',
  vuodot.length === 0, vuodot.join('; '));

/* R2: kertoja ei aloita pulun päälle. */
const paallekkaiset = [];
for (const kertoja of aanet.filter((r) => /puhe-/.test(r.src))) {
  for (const jakso of puluJaksot) {
    if (kertoja.kutsuttu > jakso.a && kertoja.kutsuttu < jakso.b) {
      paallekkaiset.push(`${nimi(kertoja.src)} @${kertoja.kutsuttu} vs ${jakso.nimi}`);
    }
  }
}
vaadi('R2 kertoja ei aloita pulun repliikin päälle',
  paallekkaiset.length === 0, paallekkaiset.join('; '));

/*
 * R3: isoisä aloittaa ensimmäisessä kaupungissa.
 *
 * Alustuskupla ennen luentaa on poistettu (omistaja 8.9.2026: *"ota
 * kaikki pulun alustukset pois."*), joten ensimmäinen pulun repliikki on
 * välihuuto KESKEN luennan — sen on siis alettava luennan jälkeen.
 */
const ekaPulu = puluJaksot[0]?.a ?? null;
const ekaLuenta = aanet.find((r) => /puhe-/.test(r.src))?.kutsuttu ?? null;
vaadi('R3 isoisän luenta alkaa ennen pulun ensimmäistä repliikkiä',
  ekaPulu !== null && ekaLuenta !== null && ekaLuenta < ekaPulu,
  `luenta ${ekaLuenta}, pulu ${ekaPulu}`);

vaadi('sivu ei kaatunut', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
