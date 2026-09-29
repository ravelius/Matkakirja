#!/usr/bin/env node
/*
 * DIORAAMAN ESIKATSELUN KUVAT — ottaa PNG-pysäytyskuvat esikatselu.html:stä
 * (Linnanrakentaja, ali-agentti P7, erä 2b, 29.9.2026). Rakentaa Node-staattis-
 * palvelimen (repon juuri) ja avaa sivun Playwright Chromiumilla SwiftShaderilla
 * — EI GPU-lippuja: tämä työkalu ottaa vain pysäytyskuvia sommittelun/valaistuksen
 * tarkistamiseksi, ei mittaa suorituskykyä (ks. tools/savukkeet/gpu-vaisto.mjs).
 *
 *   node tools/dioraama/esikatselu-kuvat.mjs [kansio] [--paketti /dist/dioraama/<r>/] [--tila <id>] [--yleis]
 *
 * kansio: minne PNG:t kirjoitetaan (oletus alla). --paketti: ohitus esikatselu.mjs:n omalle
 * paketti-oletukselle (URL-polku repon juuresta, ei tiedostojärjestelmäpolku); myös rakennus.json luetaan
 * sieltä. Erä 3: rinnakkaiset tila-agentit rakentavat omaan kansioonsa (rakenna.mjs --ulos dist/<oma>)
 * ja antavat --paketti /dist/<oma>/olavinlinna/. --tila <id>: vain tämä tila (+ pahvitarkistus kahdesta
 * yläkulmasta); --yleis: lisäksi yleisnäkymä; --nopea: vain vaaka 852x393 + pysty 393x852 + pahvikuvat,
 * deviceScaleFactor 1 (SwiftShader on hidas: rinnakkaiset agentit).
 *
 * Kuvat: yleis + jokainen kohdistettava tila (rakennus.json: kohdistettava === true)
 * × {pysty 393x852, vaaka 852x393, iPad vaaka 1366x1024}, taulu=1, paneeli=0 (kytkin-
 * paneeli pois). Tiedostonimi: <tila|yleis>-<suunta>-<koko>.png. Lisäksi keittiölle
 * kaksi pahvitarkistuskuvaa ylhäältä (era2b kohta 7) — ks. kuvat-listan rakennus alla.
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
const VAIN_TILA = lippu('tila'); // erä 3: yksi tila kerrallaan (tila-agentit)
const YLEIS = argv.includes('--yleis');
const NOPEA = argv.includes('--nopea');
const RAKENNUS_POLKU_FS = PAKETTI_URL
  ? join(JUURI, PAKETTI_URL, 'rakennus.json')
  : join(JUURI, 'dist/dioraama/olavinlinna/rakennus.json');
mkdirSync(ULOS, { recursive: true });

if (!existsSync(RAKENNUS_POLKU_FS)) {
  console.error(`esikatselu-kuvat: ${RAKENNUS_POLKU_FS} puuttuu — aja ensin: node tools/dioraama/rakenna.mjs olavinlinna`);
  process.exit(1);
}
const rakennusJson = JSON.parse(readFileSync(RAKENNUS_POLKU_FS, 'utf8'));
const kaikki = rakennusJson.tilat.filter((t) => t.kohdistettava).map((t) => t.id);
if (VAIN_TILA && !kaikki.includes(VAIN_TILA)) {
  console.error(`esikatselu-kuvat: tilaa '${VAIN_TILA}' ei ole (${kaikki.join(', ')})`);
  process.exit(1);
}
const kohteet = VAIN_TILA ? [...(YLEIS ? [''] : []), VAIN_TILA] : ['', ...kaikki];

const KOOT = [
  { suunta: 'pysty', koko: '393x852' },
  { suunta: 'vaaka', koko: '852x393' },
  { suunta: 'vaaka', koko: '1366x1024' }, // iPad vaaka — sama suunta, eri koko/kuvasuhde kuin puhelin
].filter((k) => !NOPEA || k.koko !== '1366x1024');

// Peruskuvat: yleis + jokainen kohdistettava tila × jokainen koko.
const kuvat = [];
for (const tila of kohteet) {
  for (const { suunta, koko } of KOOT) {
    kuvat.push({ tila, suunta, koko, tiedostonimi: `${tila || 'yleis'}-${suunta}-${koko}.png` });
  }
}
// Pahvitarkistus (era2b kohta 7, tehtävän kuvaus): tila ylhäältä kahdesta
// kulmasta iPad-koossa — paljastaisiko joku kulma litteän pahvin/billboardin.
// Oletuksena keittiö; --tila <id> tekee saman annetulle tilalle.
const pahviTila = VAIN_TILA ?? (rakennusJson.tilat.some((t) => t.id === 'keittio') ? 'keittio' : null);
if (pahviTila) {
  kuvat.push({
    tila: pahviTila, suunta: 'vaaka', koko: '1366x1024', tiedostonimi: `${pahviTila}-pahvi-ipad34-1366x1024.png`,
    lisaparametrit: { atsimuuttilisa: '35', korkeus: '40' },
  });
  kuvat.push({
    tila: pahviTila, suunta: 'vaaka', koko: '1366x1024', tiedostonimi: `${pahviTila}-pahvi-ylhaalta-1366x1024.png`,
    lisaparametrit: { korkeus: '65' },
  });
}

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
console.log(`esikatselu-kuvat: palvelin ${JUURI_URL} (${kuvat.length} kuvaa)`);

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

// ── Kuvat: peruskuvat + pahvitarkistus (ks. kuvat-listan rakennus yllä) ─────
const tulokset = [];
for (const kuva of kuvat) {
  const { tila, suunta, koko, tiedostonimi, lisaparametrit } = kuva;
  const [leveys, korkeus] = koko.split('x').map(Number);
  // eslint-disable-next-line no-await-in-loop
  const ctx = await selain.newContext({ viewport: { width: leveys, height: korkeus }, deviceScaleFactor: NOPEA ? 1 : 2 });
  // eslint-disable-next-line no-await-in-loop
  const sivu = await ctx.newPage();
  const konsoliVirheet = [];
  sivu.on('pageerror', (e) => konsoliVirheet.push(String(e)));
  sivu.on('console', (m) => { if (m.type() === 'error') konsoliVirheet.push(m.text()); });

  // paneeli=0: kytkinpaneeli pois kuvista. taulu=1: taulun peittämä alue näkyviin.
  const params = new URLSearchParams({ tila, suunta, koko, taulu: '1', paneeli: '0', ...lisaparametrit });
  if (PAKETTI_URL) params.set('paketti', PAKETTI_URL);
  const url = `${JUURI_URL}/tools/dioraama/esikatselu.html?${params}`;
  const polku = join(ULOS, tiedostonimi);
  try {
    // eslint-disable-next-line no-await-in-loop
    await sivu.goto(url, { waitUntil: 'load' });
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForFunction('window.valmis === true', null, { timeout: 30000 });
    // eslint-disable-next-line no-await-in-loop
    const virhe = await sivu.evaluate(() => window.esikatseluVirhe);
    if (virhe) throw new Error(virhe);
    // Varjot: odota 2 ruutua valmis-lipun jälkeen, jotta varjokartta on ehtinyt piirtyä
    // (era2b kohta 7 / tehtävän kuvaus) ennen kuin pysäytyskuva otetaan.
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    // eslint-disable-next-line no-await-in-loop
    await sivu.screenshot({ path: polku, timeout: 90000 });
    tulokset.push({ tiedostonimi, ok: true });
  } catch (e) {
    const lisa = konsoliVirheet.length ? ` | konsoli: ${konsoliVirheet.slice(0, 3).join(' / ')}` : '';
    tulokset.push({ tiedostonimi, ok: false, virhe: `${e?.message ?? e}${lisa}` });
  }
  // eslint-disable-next-line no-await-in-loop
  await ctx.close();
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
