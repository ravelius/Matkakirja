/*
 * Kuvaa etusivun ja avauslennon kahdella leveydellä ja raportoi
 * pageerrorit. Työkalu on tarkistusta varten (etusivun alkuanimaatio,
 * avaustekstin koko, lentonäkymän asettelu) — ei osa peliä.
 *
 *   node tools/kuvaa-etusivu.mjs [kansio]
 *
 * Ehdot, joita ilman tulos ei todista mitään:
 *   serviceWorkers: 'block' (muuten sw tarjoilee vanhaa) ja
 *   route-koukku, joka katkaisee kaikki ulkopuoliset pyynnöt.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.argv[2] ?? process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-etusivu';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8733, r));

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const LEVEYDET = [
  { nimi: '390', width: 390, height: 844 },
  { nimi: '900', width: 900, height: 800 },
];

let virheitaYhteensa = 0;
for (const koko of LEVEYDET) {
  const ctx = await selain.newContext({
    viewport: { width: koko.width, height: koko.height },
    serviceWorkers: 'block',
    reducedMotion: 'no-preference',
  });
  const sivu = await ctx.newPage();
  // Ulkopuoliset osoitteet katki: kaappaus ei saa riippua verkosta.
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));

  await sivu.goto('http://127.0.0.1:8733/index.html', { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.screenshot({ path: join(ULOS, `portti-${koko.nimi}.png`) });

  // Aloita seikkailu -portti auki: sen takaa paljastuu etusivu
  // avaustekstinsä ja karttansa kanssa.
  await sivu.evaluate(() => {
    const n = [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent));
    n?.click();
  });
  // Avausteksti kirjoittuu kirjoituskoneella; odotetaan sen loppuun.
  await sivu.waitForTimeout(9000);
  await sivu.screenshot({ path: join(ULOS, `etusivu-${koko.nimi}.png`) });
  // Toinen kaappaus hetken päästä: animaation pisteet ovat eri kohdissa.
  await sivu.waitForTimeout(3200);
  await sivu.screenshot({ path: join(ULOS, `etusivu-${koko.nimi}-b.png`) });

  // Avauslento: valitaan Lontoo lähtökaupungiksi ja lennetään.
  const lento = await sivu.evaluate(async () => {
    const ui = window.matkakirja?.ui;
    if (!ui) return 'ui puuttuu';
    ui.game.actionPickStart?.('lontoo');
    ui.render();
    await new Promise((r) => setTimeout(r, 400));
    ui.doFly('kairo');
    return 'ok';
  });
  await sivu.waitForTimeout(2600);
  await sivu.screenshot({ path: join(ULOS, `lento-${koko.nimi}.png`) });
  // Lennon loppu: Astu mantereelle -nappi esillä.
  await sivu.waitForTimeout(9000);
  await sivu.screenshot({ path: join(ULOS, `lento-${koko.nimi}-loppu.png`) });

  console.log(`${koko.nimi}px: lento=${lento} pageerror=${virheet.length}`);
  for (const v of virheet) console.log('  !', v);
  virheitaYhteensa += virheet.length;
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`kaappaukset: ${ULOS}`);
console.log(`pageerroreita yhteensä: ${virheitaYhteensa}`);
