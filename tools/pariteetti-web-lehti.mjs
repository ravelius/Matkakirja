// Pariteettierän web-kuvat lehti/maalehti/matkakirja/linssi-näkymille
// (Laitetestaaja 24.9.2026). Ajaa oikeaa GPU:ta Chromium+--use-angle=metal
// -lipulla (ilman sitä etusivun avaus-kesken ei koskaan poistu). Käyttää
// pelin omaa window.matkakirja.ui-konsolia (sama rajapinta kuin
// tools/kuvaa-maalehti.mjs) suoraan lehden/sivun avaamiseen — ei
// UI-klikkailua, koska saapumissekvenssi ja typewriter-teksti veisivät
// ~30-40s per näkymä.
//
// node tools/pariteetti-web-lehti.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.env.PARITEETTI_OUT ?? '/Users/Shared/Claude/proto-3d/lokit/pariteetti-20260924';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ['--use-angle=metal'] });
const page = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2 });

async function shot(nimi) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, `web-${nimi}-iphone.jpg`), quality: 70, type: 'jpeg' });
  console.log('OK', nimi);
}

await page.goto('https://matkakirja.app/?lauta=pallo&dev=ateena', { waitUntil: 'networkidle' });
await page.waitForFunction(() => Boolean(window.matkakirja?.ui?.game), null, { timeout: 30000 });
await page.waitForTimeout(1000);

// --- Ateenan kaupunkilehti (Tutki-sivut) ---
await page.evaluate(() => {
  const ui = window.matkakirja.ui;
  const city = ui.game.pack.cityById?.('ateena') ?? ui.game.pack.cities.find((c) => c.id === 'ateena');
  ui.openArrival(city, { ohitaLehtilukko: true });
});
// Saapumistraileri (kuva + "Ohita") edeltää lehteä — sama ohitus kuin
// js/kehittaja-pikatie.js: klikkaa Ohita jos näkyy, poista jäänteet.
await page.waitForTimeout(1000);
await page.evaluate(() => {
  const ohita = [...document.querySelectorAll('button')].find((b) => /^ohita$/i.test(b.textContent.trim()));
  ohita?.click();
});
await page.waitForTimeout(600);
await page.evaluate(() => {
  for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokusvirta-ohitanappi, .fokuszoom, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
});
await shot('lehti-kansi');

await page.evaluate(() => {
  const d = document.querySelector('dialog[open]');
  const scroller = d?.querySelector('.arrival-card') ?? d;
  scroller?.scrollTo?.(0, 1100);
});
await shot('lehti-kansi-alas');

await page.evaluate(() => window.matkakirja.ui.naytaTutkiSivu(1, { heti: true }));
await shot('lehti-aihe');

await page.evaluate(() => {
  const d = document.querySelector('dialog[open]');
  const scroller = d?.querySelector('.arrival-card') ?? d;
  scroller?.scrollTo?.(0, 900);
});
await shot('lehti-aihe-nostot');

await page.evaluate(() => {
  const ui = window.matkakirja.ui;
  const last = ui.lehtitila.tutkiSivut.length;
  ui.naytaTutkiSivu(last, { heti: true });
});
await shot('lehti-loppu');

await page.evaluate(() => window.matkakirja.ui.avaaSisallysvalikko?.());
await shot('lehti-sisallys');

// Sisällys kiinni (avaaSisallysvalikko togglaa kiinni, ks. js/lehti.js).
await page.evaluate(() => window.matkakirja.ui.avaaSisallysvalikko?.());
await page.waitForTimeout(300);

// --- Maalehti (Kreikka) ---
await page.evaluate(() => window.matkakirja.ui.avaaMaalehti?.('GRC'));
await shot('maalehti');

// --- Matkakirja auki (Tanger) ---
await page.goto('https://matkakirja.app/?lauta=pallo&dev=tanger', { waitUntil: 'networkidle' });
await page.waitForFunction(() => Boolean(window.matkakirja?.ui?.game), null, { timeout: 30000 });
await page.waitForTimeout(1000);
await page.evaluate(() => window.matkakirja.ui.asetaPaivakirjanKoko?.(false));
await shot('matkakirja-auki');

// --- Linssit (pallon pinnalle piirtyvät kerrokset) ---
await page.goto('https://matkakirja.app/?lauta=pallo&dev=ateena', { waitUntil: 'networkidle' });
await page.waitForFunction(() => Boolean(window.matkakirja?.ui?.game), null, { timeout: 30000 });
await page.waitForTimeout(1000);

await page.evaluate(() => window.matkakirja.ui.aktivoiLinssi?.('keksinnot'));
await page.waitForTimeout(1500);
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => /käynnistä/i.test(b.textContent));
  btn?.click();
});
await page.waitForTimeout(4000);
await shot('linssi-keksinnot');

await page.evaluate(() => window.matkakirja.ui.aktivoiLinssi?.('ihmisen-matka'));
await page.waitForTimeout(1500);
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => /käynnistä/i.test(b.textContent));
  btn?.click();
});
await page.waitForTimeout(9000);
await shot('linssi-ihminen');

await browser.close();
console.log('VALMIS');
