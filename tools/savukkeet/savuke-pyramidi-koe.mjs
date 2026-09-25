/*
 * Savuke: KOEPYRAMIDI ?pyramidi=<sarja> (js/media.js pyramidiKoe).
 *
 *   node tools/savukkeet/savuke-pyramidi-koe.mjs [sarja]   (oletus 2026-09-25)
 *
 * Fable 25.9.2026: omistaja kokeilee uutta peruskarttaa ennen kuin
 * tuotannon luettelo (julisteet/pyramidi/pyramidi.json) vaihtuu. Savuke
 * avaa pelin kahdesti ja kirjaa ämpäripyynnöt:
 *
 *   K1  lipulla peli hakee luettelon koepolusta koe/<sarja>/pyramidi.json
 *       eikä tuotannon pyramidi.json:ia;
 *   K2  lipulla pallon laatat ja laatat.json tulevat sarjan kansiosta
 *       (<sarja>-pohja-<sarja ilman viivoja>);
 *   K3  ilman lippua peli hakee tuotannon luettelon ja nykyisen
 *       pallokansion (js/pallo.js PALLO_LAATTAKANSIO) — ei mitään koesta;
 *   K4  saapumisen jälkeen lepokerros hakee kokeessa sarjan omat
 *       pyramidilaatat (versiovahti js/pallolaatat.js
 *       lepokerroksenKerrokset päästää sarjan läpi) eikä tuotannon;
 *   K5  NOSTOT NÄKYVÄT JA OVAT NAPAUTETTAVIA (omistajan löydös 25.9.2026:
 *       koepyramidissa nostoja ei voinut klikata, koska nostotaso oli
 *       poltettu nimien kanssa): kohdemaan kirjaus kertoo nimet elävinä
 *       (js/laattapyramidi.js nostotasonNimetElavina) kuten tuotannossa,
 *       ja luettelossa on nimiötaso (alue- ja merinimet, koristeet).
 *
 * Ämpäripyynnöt välitetään Noden kautta (ämpärin CORS ei päästä
 * paikallista palvelinta), joten koe näkee oikeat luettelot.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const SARJA = process.argv[2] ?? '2026-09-25';
const { PALLO_LAATTAKANSIO } = await import(`${JUURI}js/pallo.js`);
const { koepyramidinPallokansio } = await import(`${JUURI}js/media.js`);
const KOEKANSIO = koepyramidinPallokansio(SARJA);
const { Game } = await import(`${JUURI}js/game.js`);
const { packById } = await import(`${JUURI}js/pack.js`);

// Peli käynnissä pallolaudalla (sama tallenne kuin savuke-lepopiirto.mjs):
// luettelo ja pallon laatat haetaan vasta pelinäkymässä.
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const TALLENNE = JSON.stringify(peli.toJSON());

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json',
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

const selain = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

/** Avaa pelin annetulla haulla ja palauttaa ämpäriin menneet polut. */
async function kirjaa(haku) {
  const ctx = await selain.newContext({ serviceWorkers: 'block', viewport: { width: 1200, height: 800 } });
  await ctx.addInitScript((data) => {
    try { localStorage.setItem('matkakirja-save-v1', data); localStorage.removeItem('matkakirja-lauta'); } catch { /* yksityinen selaus */ }
  }, TALLENNE);
  await ctx.route(/wikimedia\.org|workers\.dev/, (r) => r.abort());
  const polut = [];
  await ctx.route('https://media.matkakirja.app/**', async (reitti) => {
    const url = new URL(reitti.request().url());
    polut.push(url.pathname);
    try {
      const v = await fetch(url);
      const runko = Buffer.from(await v.arrayBuffer());
      await reitti.fulfill({
        status: v.status, body: runko,
        headers: { 'content-type': v.headers.get('content-type') ?? 'application/octet-stream', 'access-control-allow-origin': '*' },
      });
    } catch {
      await reitti.fulfill({ status: 502, body: '' });
    }
  });
  const sivu = await ctx.newPage();
  await sivu.goto(`${osoite}?lauta=pallo${haku}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 }).catch(() => {});
  await sivu.evaluate(() => {
    setInterval(() => {
      const ui = window.matkakirja?.ui;
      const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
      if (n) n.click();
    }, 150);
  }).catch(() => {});
  // Pallon laatat ja luettelo haetaan käynnistyksen jälkeen; odotetaan niitä, enintään 40 s.
  const alku = Date.now();
  while (Date.now() - alku < 40000) {
    if (polut.some((p) => p.includes('/julisteet/pyramidi/') && p.endsWith('.json'))
      && polut.some((p) => p.includes('/julisteet/pallo/laatat/'))) break;
    await sivu.waitForTimeout(500);
  }
  await sivu.waitForTimeout(2000);
  // Saapuminen lähelle: lepokerros latoo pyramidin laatat (K4).
  await sivu.evaluate(() => window.matkakirja?.ui?.pallolauta?.saavu?.({ kesto: 0 })).catch(() => {});
  await sivu.waitForTimeout(8000);
  const tila = await sivu.evaluate(async () => {
    const lp = await import('/js/laattapyramidi.js');
    const l = await lp.haePyramidinLuettelo();
    return { nimetElavina: lp.nostotasonNimetElavina(), nimiotaso: l?.nimiotaso?.versio ?? null };
  }).catch(() => ({}));
  await ctx.close();
  polut.tila = tila;
  return polut;
}

const koe = await kirjaa(`&pyramidi=${SARJA}`);
const koeLuettelot = koe.filter((p) => p.startsWith('/julisteet/pyramidi/') && p.endsWith('.json'));
const koePallo = koe.filter((p) => p.startsWith('/julisteet/pallo/laatat/'));
console.log(`INFO  koe: luettelot ${JSON.stringify([...new Set(koeLuettelot)])}, pallopyyntöjä ${koePallo.length}`);
vaadi('K1 koeluettelo koepolusta', koeLuettelot.includes(`/julisteet/pyramidi/koe/${SARJA}/pyramidi.json`), JSON.stringify(koeLuettelot));
vaadi('K1 ei tuotannon luetteloa', !koeLuettelot.includes('/julisteet/pyramidi/pyramidi.json'));
vaadi('K2 pallo koesarjan kansiosta', koePallo.length > 0 && koePallo.every((p) => p.startsWith(`/julisteet/pallo/laatat/${KOEKANSIO}/`)),
  JSON.stringify([...new Set(koePallo.map((p) => p.split('/')[4]))]));

const koeLaatat = koe.filter((p) => p.startsWith('/julisteet/pyramidi/') && p.endsWith('.webp'));
const koeVersiot = [...new Set(koeLaatat.map((p) => p.split('/')[3]))];
console.log(`INFO  koe: pyramidilaattoja ${koeLaatat.length}, versiot ${JSON.stringify(koeVersiot)}`);
// Väritaso on luettelon varitasot-kentän oma versio (kannetaan sarjasta toiseen), ei tuotannon pohja.
const koeluettelo = await fetch(`https://media.matkakirja.app/julisteet/pyramidi/koe/${SARJA}/pyramidi.json`).then((v) => v.json());
// Väri- ja nimiötaso kannetaan sarjasta toiseen (luettelon omat versiot), eivät ole tuotannon pohja.
const variversiot = new Set([...Object.values(koeluettelo.varitasot ?? {}).map((v) => v.versio), koeluettelo.nimiotaso?.versio].filter(Boolean));
vaadi('K4 lepokerros koesarjan laatoista', koeVersiot.some((v) => v.startsWith(SARJA))
  && koeVersiot.every((v) => v.startsWith(SARJA) || variversiot.has(v)), JSON.stringify(koeVersiot));

vaadi('K5 kohdemaan nostojen nimet elävinä (napautettavat)', koe.tila?.nimetElavina === true, JSON.stringify(koe.tila));
vaadi('K5 nimiötaso luettelossa', Boolean(koe.tila?.nimiotaso), JSON.stringify(koe.tila));

const tuotanto = await kirjaa('');
vaadi('K5 vertailu: tuotannossa samoin', tuotanto.tila?.nimetElavina === true && Boolean(tuotanto.tila?.nimiotaso), JSON.stringify(tuotanto.tila));
const tLuettelot = tuotanto.filter((p) => p.startsWith('/julisteet/pyramidi/') && p.endsWith('.json'));
const tPallo = tuotanto.filter((p) => p.startsWith('/julisteet/pallo/laatat/'));
console.log(`INFO  tuotanto: luettelot ${JSON.stringify([...new Set(tLuettelot)])}, pallopyyntöjä ${tPallo.length}`);
vaadi('K3 tuotannon luettelo ilman lippua', tLuettelot.includes('/julisteet/pyramidi/pyramidi.json') && !tLuettelot.some((p) => p.includes('/koe/')),
  JSON.stringify(tLuettelot));
vaadi('K3 nykyinen pallokansio ilman lippua', tPallo.length > 0 && tPallo.every((p) => p.startsWith(`/julisteet/pallo/laatat/${PALLO_LAATTAKANSIO}/`)),
  JSON.stringify([...new Set(tPallo.map((p) => p.split('/')[4]))]));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
