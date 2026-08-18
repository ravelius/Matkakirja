/*
 * SELAINSAVUKE: yhden tiedoston versio (dist/matkakirja.html).
 *
 * Niputus on merkkijonojen ketjutusta ilman moduulirajoja, joten sen
 * viat eivät näy kokoamisessa eivätkä yksikkötesteissä — ne näkyvät
 * vasta selaimessa: nimitörmäys ("Identifier X has already been
 * declared"), väärä järjestys ("Cannot access X before initialization")
 * tai puuttuva moduuli. Tämä savuke avaa koottuun tiedostoon ja vaatii
 * NOLLA virhettä.
 *
 *   node tools/build-standalone.mjs && node tools/savuke-dist.mjs
 *
 * Ulkoiset osoitteet katkaistaan, jotta ajo ei riipu verkosta.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const TIEDOSTO = join(JUURI, 'dist/matkakirja.html');
if (!existsSync(TIEDOSTO)) {
  console.error('dist/matkakirja.html puuttuu — aja ensin node tools/build-standalone.mjs');
  process.exit(1);
}

/*
 * Vain juuri vastaa. Muut polut ovat 404, koska yhden tiedoston versio
 * ei saa hakea mitään ulkopuolelta — jos jokin polku alkaisi vastata
 * HTML:llä, savuke näyttäisi vihreältä väärästä syystä.
 */
const palvelin = createServer((req, res) => {
  if ((req.url ?? '/').split('?')[0] !== '/') { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(readFileSync(TIEDOSTO));
});
await new Promise((r) => palvelin.listen(8735, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
sivu.on('console', (m) => {
  if (m.type() !== 'error') return;
  // Katkaistut ulkoiset kuvat ovat savukkeen oma jälki, eivät pelin vika.
  if (/Failed to load resource/.test(m.text())) return;
  /*
   * Yhden tiedoston versio ei saa linssejä lainkaan (tarkoituksellinen
   * raja, ks. tools/build-standalone.mjs): js/ui.js tuo kerros.js:n ja
   * radio.js:n dynaamisesti, ja niiden tuonti kaatuu täällä
   * hallitusti. Se on odotettu tila, ei regressio.
   */
  if (/dynamically imported module|Failed to load module script/.test(m.text())) return;
  virheet.push(`konsoli: ${m.text()}`);
});

await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await sivu.goto('http://127.0.0.1:8735/', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

vaadi('yhden tiedoston versio latautuu virheittä', virheet.length === 0,
  virheet.slice(0, 3).join(' | '));

// Peli käyntiin ja pöllö näkyviin: pöllö on osa alanappiriviä, joten
// tämä todistaa samalla, että rivi rakentuu niputetussa versiossa.
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  const g = window.matkakirja?.game;
  if (g?.phase === 'pickstart') g.actionPickStart('lontoo', null);
  // Pöllö on aarre (18.8.2026): nappi on piilossa ennen ensimmäistä
  // laattaa. Tämä savuke tarkistaa niputetun version rakenteen, joten
  // löytö kuitataan suoraan.
  if (g) g.polloLoydetty = true;
  window.matkakirja?.ui?.render();
  window.matkakirjaPollo?.paivitaNakyvyys?.();
});
await sivu.waitForTimeout(1200);

const tila = await sivu.evaluate(() => ({
  peli: Boolean(window.matkakirja?.game),
  rivi: document.querySelectorAll('.toimintorivi-perus').length,
  pollo: document.querySelectorAll('.pollo-nappi').length,
  monitoimi: document.querySelectorAll('.monitoimi-nappi').length,
}));
vaadi('peli käynnistyy niputetussa versiossa', tila.peli === true, JSON.stringify(tila));
vaadi('alanappirivi rakentuu', tila.rivi === 1 && tila.monitoimi === 1, JSON.stringify(tila));
vaadi('pöllönappi on paikallaan', tila.pollo === 1, JSON.stringify(tila));

// Pöllö on nukkuva (osoitetta ei ole asetettu repossa) — ei virhettä.
const nukkuu = await sivu.evaluate(async () => {
  document.querySelector('.pollo-nappi')?.click();
  await new Promise((r) => setTimeout(r, 600));
  return document.querySelector('.pollo-nukkuu-otsikko')?.textContent ?? '';
});
vaadi('pöllö näyttää hereillä-tilan ilman osoitetta', /ei ole vielä hereillä/.test(nukkuu),
  nukkuu || '(tyhjä)');

vaadi('ei virheitä koko ajon aikana', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await sivu.screenshot({ path: join(ULOS, 'dist-pollo-390.png') });

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
