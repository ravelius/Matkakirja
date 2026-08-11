/*
 * SELAINSAVUKE: mannerkohtaiset aarteet, Aarnin luettelo ja mannerlento.
 *
 * Yksikkötestit näkevät vain js/game.js:n. Tämä ajaa saman ketjun
 * oikeassa selaimessa oikean UI:n läpi, koska juuri siellä muutokset
 * voivat kaatua: poistetun vihjekortin jäljet renderFactissa, uusi nappi
 * matkavalikon vaiheessa B ja Aarnin luettelon mannerkohtainen taulu.
 *
 *   node tools/savuke-mannerlento.mjs
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8733, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

await sivu.goto('http://127.0.0.1:8733/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

// 1) Peli käyntiin ja lähtöpiste valituksi.
const aloitus = await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  if (!n) return false;
  n.click();
  return true;
});
vaadi('peli käynnistyy', aloitus);
await sivu.waitForTimeout(2500);

// Lähtöpiste valitaan pelin omalla toiminnolla: kartan klikkaus riippuu
// projektiosta, ja savuke testaa mekaniikkaa eikä osumatarkkuutta.
const lahto = await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (!g) return 'peliä ei löydy globaalista';
  if (g.phase === 'pickstart') {
    const kaupunki = g.pack.cities.find((c) => c.links?.length);
    g.actionPickStart(kaupunki.id, 0);
    window.matkakirja.ui.render();
  }
  return g.pack.id;
});
vaadi('lauta on maailmankartta', lahto === 'maailmankartta', String(lahto));

// 2) Laudalla on seitsemän aarretta, yksi joka mantereella.
const jako = await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  const manner = g.pack.map.cityManner;
  const laskuri = {};
  for (const [cityId, type] of g.world.tokens) {
    if (type === 'star') laskuri[manner[cityId]] = (laskuri[manner[cityId]] ?? 0) + 1;
  }
  return laskuri;
});
const mantereita = Object.keys(jako).length;
const kaikkiYksi = Object.values(jako).every((n) => n === 1);
vaadi('seitsemän mannerta, yksi aarre kullakin', mantereita === 7 && kaikkiYksi,
  JSON.stringify(jako));

// 3) Aarteen löytö oikean revealTokenin kautta.
const loyto = await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  const p = g.player;
  p.pos = { type: 'city', city: 'lima' };
  p.money = 2000;
  g.world.tokens.set('lima', 'star');
  g.world.visited.add('lima');
  g.revealToken('lima');
  window.matkakirja.ui.render();
  return {
    stars: p.stars,
    manner: [...g.world.starsFound.keys()],
    nimi: g.aarreTyyppi('star', 'lima').name,
  };
});
vaadi('aarre kirjautuu mantereelle', loyto.stars === 1 && loyto.manner[0] === 'southamerica',
  JSON.stringify(loyto));
vaadi('aarre saa mantereensa nimen', /el dorado/i.test(loyto.nimi), loyto.nimi);

await sivu.waitForTimeout(1200);

// 4) Aarnin luettelo: yksi löytynyt, kuusi kateissa.
const luettelo = await sivu.evaluate(() => {
  document.getElementById('turn-pill')?.click();
  const paneeli = document.getElementById('passport-aarteet')
    ?? document.querySelector('.aarre-rivi')?.parentElement;
  if (!paneeli) return { virhe: 'luettelopaneelia ei löydy' };
  const rivit = [...paneeli.querySelectorAll('.aarre-rivi')].map((r) => r.textContent.trim());
  return { rivit };
});
const loytynytRivi = (luettelo.rivit ?? []).find((r) => /löytyi/.test(r));
const kateissaRivi = (luettelo.rivit ?? []).find((r) => /Kateissa/.test(r));
vaadi('Aarnin luettelossa löytynyt aarre nimeltä', /El Dorado/i.test(loytynytRivi ?? ''),
  loytynytRivi ?? JSON.stringify(luettelo));
vaadi('Aarnin luettelo: kateissa 6', /6$/.test(kateissaRivi ?? ''), kateissaRivi ?? '(puuttuu)');

await sivu.screenshot({ path: join(ULOS, 'savuke-aarnin-luettelo.png') });

// 5) Mannerlennon nappi matkavalikon vaiheessa B.
const lento = await sivu.evaluate(async () => {
  document.querySelector('#passport-dialog')?.close?.();
  const g = window.matkakirja.game;
  g.phase = 'action';
  g.player.money = 2000;
  window.matkakirja.ui.travelExpanded = true;
  window.matkakirja.ui.render();
  await new Promise((r) => setTimeout(r, 300));
  const napit = [...document.querySelectorAll('#actions button')].map((b) => b.textContent.trim());
  const mannerNapit = napit.filter((t) => /toiselle mantereelle/i.test(t));
  return { napit, mannerNapit };
});
vaadi('mannerlennon napit vaiheessa B', lento.mannerNapit.length === 6,
  `${lento.mannerNapit.length} kpl: ${lento.mannerNapit.join(' | ')}`);

await sivu.screenshot({ path: join(ULOS, 'savuke-mannerlento-napit.png') });

// 6) Napin painallus todella lentää.
const lensi = await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  const ennen = { kaupunki: g.player.pos.city, raha: g.player.money };
  const nappi = [...document.querySelectorAll('#actions button')]
    .find((b) => /toiselle mantereelle/i.test(b.textContent));
  if (!nappi) return { virhe: 'nappia ei löydy' };
  nappi.click();
  await new Promise((r) => setTimeout(r, 900));
  return { ennen, jalkeen: { kaupunki: g.player.pos.city, raha: g.player.money } };
});
vaadi('lento siirtää ja veloittaa',
  lensi.jalkeen && lensi.jalkeen.kaupunki !== lensi.ennen.kaupunki
    && lensi.jalkeen.raha === lensi.ennen.raha - 300,
  JSON.stringify(lensi));

await sivu.waitForTimeout(800);
await sivu.screenshot({ path: join(ULOS, 'savuke-lennon-jalkeen.png') });

// 7) Vihjejärjestelmän jäänteet: ei vihjekorttia, ei konsolivirheitä.
const vihjeita = await sivu.evaluate(() => ({
  vihjekortteja: document.querySelectorAll('.vihjekortti').length,
  starHint: typeof (window.matkakirja.game)?.starHint,
}));
vaadi('vihjekorttia ei ole', vihjeita.vihjekortteja === 0 && vihjeita.starHint === 'undefined',
  JSON.stringify(vihjeita));
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
