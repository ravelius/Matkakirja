#!/usr/bin/env node
/*
 * DIORAAMAN SOMMITTELUESIKATSELYN KUVAT — ottaa PNG-pysäytyskuvat esikatselu.html:stä
 * (Linnanrakentaja, ali-agentti M, erä 2, 29.9.2026). Rakentaa Node-staattispalvelimen
 * (repon juuri) ja avaa sivun Playwright Chromiumilla SwiftShaderilla — EI GPU-lippuja:
 * tämä työkalu ottaa vain pysäytyskuvia sommittelun tarkistamiseksi, ei mittaa
 * suorituskykyä (ks. tools/savukkeet/gpu-vaisto.mjs-tyylisten savukkeiden ero).
 *
 *   node tools/dioraama/esikatselu-kuvat.mjs [kansio] [--paketti /dist/dioraama/<r>/]
 *
 * kansio: minne PNG:t kirjoitetaan (oletus alla). --paketti: harvinainen ohitus
 * esikatselu.mjs:n omalle paketti-oletukselle (URL-polku, ei tiedostojärjestelmäpolku).
 *
 * Kuvat: yleis + jokainen kohdistettava tila (rakennus.json: kohdistettava === true)
 * × {pysty 393x852, vaaka 852x393, iPad vaaka 1366x1024}, taulu=1 (taulun peittämä
 * alue piirretään puoliläpinäkyvänä, ks. esikatselu.mjs). Tiedostonimi: <tila|yleis>-
 * <suunta>-<koko>.png.
 *
 * PLAYWRIGHT_JS: moduulin polku (oletus Fablen node_modules — tämä worktree ei
 * asenna omia npm-riippuvuuksia). CHROMIUM: selaimen binäärin polku (oletus
 * /opt/pw-browsers/chromium, ks. CLAUDE.md "Tärkeimmät säännöt").
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const argv = process.argv.slice(2);
const lippu = (nimi) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 ? argv[i + 1] : null;
};
const vapaat = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] ?? '').startsWith('--'));
const OLETUSKANSIO = join(
  '/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja',
  '490a38f3-bf91-4b47-bbd2-54497b242769/scratchpad/esikatselu',
);
const ULOS = vapaat[0] ?? OLETUSKANSIO;
const PAKETTI_URL = lippu('paketti'); // null = anna esikatselu.mjs:n käyttää omaa oletustaan
const RAKENNUS_POLKU_FS = join(JUURI, 'dist/dioraama/olavinlinna/rakennus.json');
mkdirSync(ULOS, { recursive: true });

if (!existsSync(RAKENNUS_POLKU_FS)) {
  console.error(`esikatselu-kuvat: ${RAKENNUS_POLKU_FS} puuttuu — aja ensin: node tools/dioraama/rakenna.mjs olavinlinna`);
  process.exit(1);
}
const rakennusJson = JSON.parse(readFileSync(RAKENNUS_POLKU_FS, 'utf8'));
const kohteet = ['', ...rakennusJson.tilat.filter((t) => t.kohdistettava).map((t) => t.id)];

const KOOT = [
  { suunta: 'pysty', koko: '393x852' },
  { suunta: 'vaaka', koko: '852x393' },
  { suunta: 'vaaka', koko: '1366x1024' }, // iPad vaaka — sama suunta, eri koko/kuvasuhde kuin puhelin
];

// ── Staattinen palvelin (repon juuri) ────────────────────────────────────────
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.glb': 'model/gltf-binary', '.svg': 'image/svg+xml',
};
const palvelin = createServer((req, res) => {
  const polkuOsa = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const polku = join(JUURI, polkuOsa);
  if (!polku.startsWith(JUURI) || !existsSync(polku)) { res.writeHead(404); res.end(); return; }
  try {
    const data = readFileSync(polku);
    res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(500); res.end();
  }
});
const PORT = await new Promise((resolve) => {
  palvelin.listen(0, '127.0.0.1', () => resolve(palvelin.address().port));
});
const JUURI_URL = `http://127.0.0.1:${PORT}`;
console.log(`esikatselu-kuvat: palvelin ${JUURI_URL} (${kohteet.length} kohdetta × ${KOOT.length} kokoa)`);

// ── Playwright: SwiftShader, EI GPU-lippuja (tehtävän vaatimus) ──────────────
const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  // CLAUDE.md: /opt/pw-browsers/chromium pätee konttiympäristössä — Mac Studiolla
  // (tämä sessio) Playwright löytää oman lataamansa selaimen itse (CHROMIUM ohittaa).
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

// ── Kuvat: yleis + jokainen kohdistettava tila × jokainen koko ──────────────
const tulokset = [];
for (const tila of kohteet) {
  for (const { suunta, koko } of KOOT) {
    const [leveys, korkeus] = koko.split('x').map(Number);
    // eslint-disable-next-line no-await-in-loop
    const ctx = await selain.newContext({ viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 2 });
    // eslint-disable-next-line no-await-in-loop
    const sivu = await ctx.newPage();
    const konsoliVirheet = [];
    sivu.on('pageerror', (e) => konsoliVirheet.push(String(e)));
    sivu.on('console', (m) => { if (m.type() === 'error') konsoliVirheet.push(m.text()); });

    const params = new URLSearchParams({ tila, suunta, koko, taulu: '1' });
    if (PAKETTI_URL) params.set('paketti', PAKETTI_URL);
    const url = `${JUURI_URL}/tools/dioraama/esikatselu.html?${params}`;
    const tiedostonimi = `${tila || 'yleis'}-${suunta}-${koko}.png`;
    const polku = join(ULOS, tiedostonimi);
    try {
      // eslint-disable-next-line no-await-in-loop
      await sivu.goto(url, { waitUntil: 'load' });
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForFunction('window.valmis === true', null, { timeout: 20000 });
      // eslint-disable-next-line no-await-in-loop
      const virhe = await sivu.evaluate(() => window.esikatseluVirhe);
      if (virhe) throw new Error(virhe);
      // eslint-disable-next-line no-await-in-loop
      await sivu.screenshot({ path: polku });
      tulokset.push({ tiedostonimi, ok: true });
    } catch (e) {
      const lisa = konsoliVirheet.length ? ` | konsoli: ${konsoliVirheet.slice(0, 3).join(' / ')}` : '';
      tulokset.push({ tiedostonimi, ok: false, virhe: `${e?.message ?? e}${lisa}` });
    }
    // eslint-disable-next-line no-await-in-loop
    await ctx.close();
  }
}

await selain.close();
palvelin.close();

console.log('');
for (const t of tulokset) {
  console.log(`${t.ok ? 'OK  ' : 'FAIL'}  ${join(ULOS, t.tiedostonimi)}${t.ok ? '' : ` — ${t.virhe}`}`);
}
const epaonnistui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - epaonnistui.length}/${tulokset.length} kuvaa onnistui. Kansio: ${ULOS}`);
process.exit(epaonnistui.length ? 1 : 0);
