/*
 * SELAINSAVUKE: LINSSI SAMMUTTAA PELIN KERROKSET JA PELIN ÄÄNET.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-linssivika.mjs
 *
 * OMISTAJAN HAVAINTO 14.9.2026 (iPad, Ihmisen matka -linssi,
 * sanatarkasti): *"Linssissa nakyy kartan korostus seka infolaatikko
 * seka valilla kartan pienta vareilee meinaten pudottaa topografian"* ja
 * samana päivänä *"Muut aanet eivat myoskaan pysahdy kun linssi
 * aktivoituu"*.
 *
 * MITÄ TÄSSÄ MITATAAN, JOTA CSS EI KATA. Pelin lappuset (nimet, nostot,
 * kohteet, kartuutsi) piilotetaan tyylitiedostosta luokalla
 * `body.aikajana-paalla` (css/aikajana.css, css/styles.css). KAKSI
 * KERROSTA JÄÄ CSS:N ULOTTUMATTOMIIN:
 *
 *   1. KOHDEMAAN KOROSTUSKEHÄ on kolmiulotteinen viiva pallon
 *      vektorikerroksessa (js/pallovektorit.js `korostaMaa`), ei DOM.
 *   2. MAAPANEELI luetaan pallolaudan `paivita`-ohjauksesta, joka ajetaan
 *      vain pelin tilan muuttuessa — linssin kytkin ei ole pelin tila.
 *
 * Molemmat sammutetaan nyt samalla portilla kuin kaupunkipisteet
 * (js/pallolauta/lauta.js linssivahti), ja tämä savuke vartioi, että
 * sammutus tapahtuu JA että sulku palauttaa kerrokset entiselleen.
 *
 * ÄÄNET: linssin oma äänimaailma (js/aikajana.js avaaAanimaailma) saa
 * soida — kaaren luenta (puhe/ihmisen-matka-…), kaaren musiikki
 * (aanet/linssi-…) ja Livian LINSSIrepliikit (pulu/livia-ihmisen-matka-…).
 * Kaikki MUU pelin ääni on tauolla.
 *
 * VÄITTEET:
 *   1. Ennen linssiä kohdemaan korostus on päällä (mittarit.korostus === ISO).
 *   2. Linssi auki: korostus null eikä yhtään korostusjanaa.
 *   3. Linssi auki: maapaneeli, nimet, nostot ja kartuutsi ovat poissa ja
 *      kaupunkipisteen skaala on 0.
 *   4. Linssi auki: yksikään pelin oma Audio ei soi (1 s ja 5 s kuluttua).
 *   5. Linssi kiinni: korostus palaa samaan maahan ja kaupunkipisteet
 *      palaavat (skaala > 0).
 *   6. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUS: linssivika-auki.png kansioon KAAPPAUKSET.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, lupaus);
  return lupaus;
}

const PORTTI = Number(process.env.PORTTI ?? 8753);
const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** iPadin vaakanäkymä: omistajan oma laite (1180 × 820, dpr 2). */
const NAKYMA = { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 };

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const virheet = [];
const konteksti = await selain.newContext({ ...NAKYMA, serviceWorkers: 'block' });
const sivu = await konteksti.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
sivu.on('pageerror', (e) => virheet.push(String(e)));
/*
 * Playwrightin oma screenshot odottaa document.fonts.ready:a, joka ei
 * ratkea kun ulkoiset fontit on katkaistu — CDP ottaa kuvan suoraan.
 */
const cdp = await konteksti.newCDPSession(sivu);
const kuvaa = async () => Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64');

/** Kerrosten ja äänten tila yhdellä luennalla (merkkijono: evaluate). */
const TILA = `() => {
  const nakyy = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.display !== 'none'
      && s.visibility !== 'hidden' && Number(s.opacity) > 0.02;
  };
  const kpl = (sel) => [...document.querySelectorAll(sel)].filter(nakyy).length;
  const lauta = window.matkakirja?.ui?.pallolauta;
  const vm = lauta?.vektorit?.()?.mittarit?.() ?? null;
  let pisteSkaala = null;
  try {
    const kaup = (lauta?.pallo?.pointsData?.() ?? [])
      .find((d) => d.laji !== 'helmi' && d.laji !== 'valo');
    pisteSkaala = kaup?.__threeObjPoint?.scale?.x ?? null;
  } catch { /* pisteitä ei vielä ole */ }
  // Linssin omat äänet saavat soida: kaaren luenta, kaaren musiikki ja
  // Livian linssirepliikit. Kaikki muu on pelin ääntä.
  const linssinOma = (src) => /linssi-|ihmisen-matka/.test(src);
  const aanet = [...(window.__aanet ?? [])].map((a) => ({
    src: String(a.src || ''), paused: a.paused, t: Number(a.currentTime.toFixed(2)),
  }));
  return {
    linssi: document.body.classList.contains('aikajana-paalla'),
    korostus: vm?.korostus ?? null,
    korostusJanoja: vm?.korostusJanoja ?? 0,
    maapaneeli: kpl('.pallolauta-maapaneeli'),
    nimet: kpl('.pallolauta-nimi'),
    nostot: kpl('.pallolauta-nosto'),
    kartuutsi: kpl('.fokus-kartuutsi'),
    pisteSkaala,
    aanet,
    pelinAanetSoi: aanet.filter((a) => !a.paused && a.src && !linssinOma(a.src)).map((a) => a.src),
  };
}`;
const lue = () => sivu.evaluate(`(${TILA})()`);

/* ---------------- peli auki Pariisiin (sama kaava kuin savuke-aikajana) */
await sivu.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  const kaupunki = game.pack.cities.find((c) => c.id === 'pariisi') ?? game.pack.cities[0];
  game.player.pos = { type: 'city', city: kaupunki.id };
  game.world.visited.add(kaupunki.id);
  game.phase = 'action';
  ui.render();
});
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
  .catch(() => null);
// Korostus latautuu maapolygoneista: odotetaan kehä kartalle.
await sivu.waitForFunction(
  () => Boolean(window.matkakirja?.ui?.pallolauta?.vektorit?.()?.mittarit?.()?.korostus),
  null, { timeout: 30000 },
).catch(() => null);

/* Kaikki soittimet talteen: Audio.play kirjaa itsensä. */
await sivu.evaluate(() => {
  window.__aanet = [];
  const alkup = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function play(...a) {
    if (!window.__aanet.includes(this)) window.__aanet.push(this);
    return alkup.apply(this, a);
  };
});

const ennen = await lue();
vaadi('kohdemaan korostus on päällä ennen linssiä',
  Boolean(ennen.korostus) && ennen.korostusJanoja > 0,
  JSON.stringify({ korostus: ennen.korostus, janoja: ennen.korostusJanoja }));

/* ---------------- linssi auki ja avausjakso ohi --------------------- */
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
  ui.valitseLinssi('ihmisen-matka');
  for (let i = 0; i < 800; i += 1) {
    if (document.querySelector('.aikajana-avaus.laatikko-nakyy')) break;
    await new Promise((r) => setTimeout(r, 25));
  }
});
// Käynnistä on disabloitu kunnes virrat ovat valmiit (js/aikajana.js odotaVirtoja).
await sivu.waitForFunction(() => {
  const n = document.querySelector('.aikajana-avaus-nappi');
  return Boolean(n) && !n.disabled;
}, null, { timeout: 90000 }).catch(() => null);
await sivu.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
await sivu.waitForTimeout(1000);
const sekunti = await lue();
await sivu.waitForFunction(() => {
  const a = document.querySelector('.aikajana-avaus');
  return !a || a.classList.contains('pois');
}, null, { timeout: 60000 }).catch(() => null);
await sivu.waitForTimeout(4000);
const auki = await lue();
writeFileSync(join(ULOS, 'linssivika-auki.png'), await kuvaa());

vaadi('linssi auki: kohdemaan korostus on sammutettu',
  auki.linssi && !auki.korostus && auki.korostusJanoja === 0,
  JSON.stringify({ linssi: auki.linssi, korostus: auki.korostus, janoja: auki.korostusJanoja }));

vaadi('linssi auki: maapaneeli, nimet, nostot ja kartuutsi poissa, kaupunkipiste 0',
  auki.maapaneeli === 0 && auki.nimet === 0 && auki.nostot === 0 && auki.kartuutsi === 0
    && auki.pisteSkaala === 0,
  JSON.stringify({
    maapaneeli: auki.maapaneeli, nimet: auki.nimet, nostot: auki.nostot,
    kartuutsi: auki.kartuutsi, pisteSkaala: auki.pisteSkaala,
  }));

vaadi('linssi auki: pelin omat äänet ovat tauolla 1 s ja 5 s kuluttua',
  sekunti.pelinAanetSoi.length === 0 && auki.pelinAanetSoi.length === 0,
  JSON.stringify({ s1: sekunti.pelinAanetSoi, s5: auki.pelinAanetSoi }));

/* ---------------- linssi kiinni ------------------------------------- */
await sivu.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
await sivu.waitForFunction(
  () => !document.body.classList.contains('aikajana-paalla'),
  null, { timeout: 30000 },
).catch(() => null);
await sivu.waitForTimeout(4000);
const kiinni = await lue();

vaadi('linssi kiinni: korostus ja kaupunkipisteet palaavat entiselleen',
  kiinni.korostus === ennen.korostus && kiinni.korostusJanoja > 0 && kiinni.pisteSkaala > 0,
  JSON.stringify({
    ennen: ennen.korostus, kiinni: kiinni.korostus,
    janoja: kiinni.korostusJanoja, piste: kiinni.pisteSkaala,
  }));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await konteksti.close();
await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi.`);
if (kaatui.length) process.exitCode = 1;
