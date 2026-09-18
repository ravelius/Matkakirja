/*
 * MITTARI: MITÄ TOINEN LÄPINÄKYVÄ PINTA PALLOLLA MAKSAA?
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 36 kohta 5: laattapyramidi
 * halutaan kahtena kerroksena (pohja ilman merkintöjä + läpinäkyvä
 * merkkikerros), MUTTA käyttöönotto vasta kun WebKitillä on mitattu,
 * ettei muisti karkaa iPhonen rajoista eikä kehysnopeus putoa alle 50.
 *
 * Tämä EI ole vartija vaan mittari: se ei vaadi mitään, vaan ajaa saman
 * Ranskan näkymän kahdesti — kytkin pois (?merkkikerros=0) ja päällä
 * (?merkkikerros=1) — ja tulostaa taulukon. Kytkin on js/ui-apurit.js
 * merkkikerrosPaalla; päällä ollessaan js/pallo.js luo TOISEN
 * laattakerroksen, joka lataa vain nosto- ja viivatason laatat omalle
 * säteelleen (js/pallolaatat.js merkkikerros-valinta).
 *
 *   PLAYWRIGHT_JS=<polku>/node_modules/playwright/index.js \
 *     node tools/savukkeet/mittaa-merkkikerros.mjs
 *
 * MITÄ MITATAAN (per selain × tila × näkymä):
 *   a) kolmen kirjaston oma tekstuuri- ja geometriakirjanpito
 *      (renderer.info.memory) sekä piirtokutsut — sama luku kummassakin
 *      selaimessa, toisin kuin performance.memory.
 *   b) JS-kasa (performance.memory.usedJSHeapSize) siellä missä se on
 *      (Chromium). WebKitissä sitä ei ole; siellä tekstuurien tavut
 *      lasketaan laattamäärästä (laatta 512² × 4 B, mipmapit +1/3),
 *      minkä kumpikin laattakerros kirjaa itse (mittarit.kaytetytTavut).
 *   c) kehysnopeus 5 s:n panoroinnissa (rAF-laskuri, kehysaskel kuten
 *      savuke-pallo-kehystahti: kamera siirtyy joka piirretyllä
 *      kehyksellä sen verran kuin se siirtyisi 60 Hz:n laitteella).
 *   d) ensimmäisen kehyksen aika kameran asettamisesta.
 *
 * NÄKYMÄT: Ranskan saapumisnäkymä (korkeus kuten kaupunkiin saavuttaessa)
 * ja lähizoomi. KOTELO: 390 × 844 dpr 3 (iPhone) kuten PAATOKSET 36.
 *
 * VERKKO: ämpäri Noden fetchin kautta kuten savuke-astro-webkit —
 * suoraan haettuna ämpäri ei anna CORS-lupaa 127.0.0.1-originille.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PORTTI = Number(process.env.PORTTI ?? 8761);
const PANOROINTI_MS = Number(process.env.PANOROINTI_MS ?? 5000);
const KEHYKSIA = Math.round(PANOROINTI_MS / 16.7);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/* Ämpärin vastaukset välimuistiin: sama laatta haetaan monessa ajossa. */
const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

async function ohjaaVerkko(s) {
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
if (!paketti) { console.error('Playwrightia ei löydy: anna PLAYWRIGHT_JS'); process.exit(2); }
const pw = paketti.default ?? paketti;

const IPHONE_UA = pw.devices?.['iPhone 14']?.userAgent
  ?? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) '
    + 'Version/16.0 Mobile/15E148 Safari/604.1';

const KOTELO = {
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
  hasTouch: true, isMobile: true, userAgent: IPHONE_UA,
};

/* RANSKA: saapumisnäkymä ja lähizoomi. Korkeudet kuten pelin oma kamera. */
const RANSKA = { lat: 46.5, lng: 2.5 };
const NAKYMAT = [
  { nimi: 'saapuminen', altitude: 0.42 },
  { nimi: 'lähizoomi', altitude: 0.12 },
];

const SELAIMET = (process.env.SELAIMET ?? 'chromium,webkit').split(',').map((x) => x.trim()).filter(Boolean);
const TILAT = [{ nimi: 'pois', arvo: '0' }, { nimi: 'päällä', arvo: '1' }];

async function avaaPeli(s, kytkin) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo&merkkikerros=${kytkin}`,
    { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.phase = 'action';
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  }).catch(() => {});
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1000);
  return ok;
}

/** Kamera kohteeseen ja ensimmäisen kehyksen aika siitä hetkestä. */
const asetaKamera = (s, lat, lng, altitude) => s.evaluate(({ lat, lng, altitude }) => new Promise((valmis) => {
  const t0 = performance.now();
  window.matkakirja.ui.pallolauta.heraa?.();
  window.matkakirja.ui.pallonInstanssi.pointOfView({ lat, lng, altitude }, 0);
  requestAnimationFrame(() => valmis(+(performance.now() - t0).toFixed(1)));
}), { lat, lng, altitude });

/** Kirjaston ja kerrosten mittarit yhdessä paikassa. */
const lueMittarit = (s) => s.evaluate(() => {
  const koe = window.__merkkikerrosKoe ?? null;
  const muisti = koe?.muisti?.() ?? {};
  const pohja = koe?.pohja?.() ?? null;
  const merkit = koe?.merkit?.() ?? null;
  const kasa = performance.memory?.usedJSHeapSize ?? null;
  return {
    paalla: Boolean(koe?.paalla),
    tekstuureja: muisti.tekstuureja ?? -1,
    geometrioita: muisti.geometrioita ?? -1,
    piirtokutsuja: muisti.piirtokutsuja ?? -1,
    kolmioita: muisti.kolmioita ?? -1,
    kasaMt: kasa === null ? null : +(kasa / 1024 / 1024).toFixed(1),
    pohjaLaattoja: pohja?.laattoja ?? -1,
    pohjaTavutMt: pohja ? +(pohja.kaytetytTavut / 1024 / 1024).toFixed(1) : -1,
    merkkiLaattoja: merkit?.laattoja ?? -1,
    merkkiTavutMt: merkit ? +(merkit.kaytetytTavut / 1024 / 1024).toFixed(1) : -1,
  };
});

/*
 * KEHYSASKEL, EI KELLO (sama peruste kuin savuke-pallo-kehystahti):
 * kamera siirtyy joka piirretyllä kehyksellä sen verran kuin se siirtyisi
 * 60 Hz:n laitteella, joten jokainen mitattu kehys on laitteen kehys ja
 * vain seinäkelloaika venyy. fps = 1000 / kehysvälin mediaani.
 */
const panoroi = (s, kehyksia, dLng) => s.evaluate(({ kehyksia, dLng }) => new Promise((valmis) => {
  const pallo = window.matkakirja.ui.pallonInstanssi;
  const valit = [];
  let n = 0;
  let edellinen = performance.now();
  const askel = () => {
    const nyt = performance.now();
    valit.push(nyt - edellinen);
    edellinen = nyt;
    const pov = pallo.pointOfView();
    pallo.pointOfView({ lat: pov.lat, lng: pov.lng + dLng, altitude: pov.altitude }, 0);
    n += 1;
    if (n < kehyksia) requestAnimationFrame(askel);
    else {
      const j = valit.slice(1).sort((a, b) => a - b);
      const p50 = j[Math.floor(j.length / 2)] ?? 0;
      const p95 = j[Math.floor(j.length * 0.95)] ?? 0;
      valmis({
        kehyksia: j.length,
        fps: p50 ? +(1000 / p50).toFixed(1) : 0,
        kehysP50: +p50.toFixed(1),
        kehysP95: +p95.toFixed(1),
      });
    }
  };
  requestAnimationFrame(askel);
}), { kehyksia, dLng });

const rivit = [];
for (const nimi of SELAIMET) {
  const tyyppi = pw[nimi];
  if (!tyyppi) { console.error(`selainta ${nimi} ei ole`); continue; }
  for (const tila of TILAT) {
    let selain = null;
    try {
      selain = await tyyppi.launch();
      const konteksti = await selain.newContext({ ...KOTELO, serviceWorkers: 'block' });
      const sivu = await konteksti.newPage();
      await ohjaaVerkko(sivu);
      const ok = await avaaPeli(sivu, tila.arvo);
      if (!ok) { console.error(`${nimi}/${tila.nimi}: pallolauta ei noussut`); }
      for (const nakyma of NAKYMAT) {
        const ekaKehys = await asetaKamera(sivu, RANSKA.lat, RANSKA.lng, nakyma.altitude);
        // Laatat perille ennen lukemaa: kerros lataa ja kiinnittää itse.
        await sivu.waitForTimeout(4000);
        const m = await lueMittarit(sivu);
        const p = await panoroi(sivu, KEHYKSIA, 0.02);
        rivit.push({
          selain: nimi, tila: tila.nimi, nakyma: nakyma.nimi, ekaKehys, ...m, ...p,
        });
      }
      await selain.close();
      selain = null;
    } catch (virhe) {
      console.error(`${nimi}/${tila.nimi}: ${virhe.message}`);
      await selain?.close?.().catch(() => {});
    }
  }
}

const otsikko = ['selain', 'tila', 'näkymä', 'kytkin', 'tekstuureja', 'geometrioita', 'piirtoja',
  'kasa Mt', 'pohja laattoja', 'pohja Mt', 'merkki laattoja', 'merkki Mt', 'fps', 'kehys p50',
  'kehys p95', '1. kehys ms'];
console.log(otsikko.join(' | '));
for (const r of rivit) {
  console.log([r.selain, r.tila, r.nakyma, r.paalla ? 'on' : 'ei', r.tekstuureja, r.geometrioita,
    r.piirtokutsuja, r.kasaMt ?? '-', r.pohjaLaattoja, r.pohjaTavutMt, r.merkkiLaattoja,
    r.merkkiTavutMt, r.fps, r.kehysP50, r.kehysP95, r.ekaKehys].join(' | '));
}
console.log(JSON.stringify(rivit));
palvelin.close();
process.exit(0);
