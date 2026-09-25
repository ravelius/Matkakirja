/*
 * SELAINSAVUKE: LAATTAKERROS LUKITTUU KERTOMUSKAMERAN LENNON AJAKSI.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-linssilaatat.mjs
 *
 * OMISTAJA 14.9.2026 (iPad, Ihmisen matka, sanatarkasti): *"valilla
 * kartan pienta vareilee meinaten pudottaa topografian"*. Fablen päätös
 * samana päivänä: toteuta zoomitason lukitus linssin ajaksi
 * (docs/raportit/viesti-fable-linssilaatat-20260914.md).
 *
 * MITÄ TÄSSÄ MITATAAN. Linssin kertomuskamera lentää koko ajon, ja
 * laattakerros laski näkyvän joukon uudelleen jokaisella liikkeellä:
 * taso vaihtui kesken tarinan (z6 → z3 → z6) ja laattoja purettiin
 * nopeammin kuin ehdittiin ladata, jolloin näyttämölle jäi 0–14 laattaa
 * tarvitusta 15–24:stä. Kertomuslukko (js/pallolaatat.js KERTOMUSLUKKO)
 * naulaa tason ja pitää jo ladatut laatat muistissa linssin ajan.
 *
 * VÄITTEET:
 *   1. Ennen linssiä kerros näkyy eikä lukko ole päällä (kertomustaso null).
 *   2. Linssin käynnistys naulaa TÄSMÄLLEEN sen tason, joka oli valittuna.
 *   3. Naula EI liiku ajon aikana (10 s näyte).
 *   4. TAUOLLA KARTTA ON PAIKALLAAN. Linssi pysäytetään (Tauko) ja
 *      kartta-alueesta otetaan kolme kaappausta kahden sekunnin välein:
 *      peräkkäisten kuvien luminanssiero on pieni. Juuri tämä on
 *      omistajan näkemä oire — tyhjät vaaleat arkit välähtelivät
 *      seepiakartan päällä, vaikka kamera seisoi paikallaan.
 *   5. Linssin sulku purkaa lukon (kertomustaso null).
 *   6. Ei sivuvirheitä.
 *
 * MIKSI PEITTOPROSENTTI EI OLE VÄITTEENÄ. Ensimmäinen versio tästä ajoi
 * linssin kahdesti (ilman lukkoa ja lukon kanssa) ja vertasi näyttämön
 * peittoa ajojen välillä. Se on oikea mitta mutta väärä savukkeeseen:
 * kaksi linssiajoa ei mahdu aikakattoon (mitattu, ajo katkesi 1500 s:iin),
 * ja lennon aikainen peitto riippuu ämpärihaun nopeudesta, joka
 * mittausympäristössä vaihtelee. Ennen/jälkeen-vertailu on tehty ja
 * kirjattu raporttiin (viesti-fable-linssilaatat-20260914.md luvut 2 ja
 * 4); savuke vartioi sitä, mikä on nopeaa ja yksiselitteistä — lukon
 * mekaniikkaa ja TAUOLLA mitattua kuvaeroa, joka on omistajan oire ja
 * jossa ero on suuruusluokka (3,0–8,1 → 0,05–0,64).
 *
 * VASTAKOE: aja `LUKKO=0 node tools/savukkeet/savuke-linssilaatat.mjs`,
 * jolloin lukko sammutetaan heti käynnistyksestä ja väitteet 2–4 kaatuvat.
 */
const LUKKO_PAALLA = process.env.LUKKO !== '0';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, kuvienEro } from './pallon-liike-mittarit.mjs';

/*
 * TAUON EROKATTO: keskimääräinen luminanssiero (0…255) kahden peräkkäisen
 * kaappauksen välillä kartta-alueella, kun linssi on tauolla. Raja on
 * mitattu: ilman korjausta ero oli 3,0–8,1 (välähtävät tyhjät arkit),
 * korjattuna alle yhden. Kolme on siis selvästi kummankin puolella.
 */
const TAUON_EROKATTO = 3;

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const l = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, l);
  return l;
}
const PORTTI = Number(process.env.PORTTI ?? 8759);
const palvelin = createServer((req, res) => {
  const s = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const p = join(JUURI, s);
  if (!existsSync(p) || p.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
  res.end(readFileSync(p));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

const virheet = [];
const konteksti = await selain.newContext({
  viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
const sivu = await konteksti.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const v = await ampariHaku(route.request().url());
  if (!v) { route.fulfill({ status: 404, body: '' }); return; }
  route.fulfill({
    status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
sivu.on('pageerror', (e) => virheet.push(String(e)));
const cdp = await konteksti.newCDPSession(sivu);
const kuvaa = async () => Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64');

const MITTA = `() => {
  const lauta = window.matkakirja?.ui?.pallolauta;
  const m = lauta?.lepokerros?.()?.mittarit?.() ?? null;
  const pov = lauta?.pallo?.pointOfView?.() ?? null;
  if (!m) return null;
  return {
    tila: m.tila, taso: m.taso, kertomustaso: m.kertomustaso ?? null,
    nakyvia: m.nakyvia, nakyviaScenessa: m.nakyviaScenessa,
    purettuja: m.purettuja, pyyntoja: m.pyyntoja, laattoja: m.laattoja,
    tavut: m.kaytetytTavut,
    korkeus: pov ? Number(pov.altitude.toFixed(3)) : null,
  };
}`;
const lue = () => sivu.evaluate(`(${MITTA})()`);
const peitto = (m) => (m && m.nakyvia > 0 ? m.nakyviaScenessa / m.nakyvia : 0);

/* ---------------- peli auki Pariisiin ------------------------------- */
await sivu.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  const k = game.pack.cities.find((c) => c.id === 'pariisi') ?? game.pack.cities[0];
  game.player.pos = { type: 'city', city: k.id };
  game.world.visited.add(k.id);
  game.phase = 'action';
  ui.render();
});
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
  .catch(() => null);
// Kerros pystyyn ennen linssiä: lukko naulaa juuri sen tason.
await sivu.waitForFunction(
  () => (window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.()?.scenessa ?? 0) > 0,
  null, { timeout: 60000 },
).catch(() => null);
await sivu.waitForTimeout(3000);

const ennen = await lue();
vaadi('ennen linssiä kerros näkyy eikä lukko ole päällä',
  Boolean(ennen) && ennen.tila === 'nakyy' && ennen.kertomustaso === null,
  JSON.stringify({ tila: ennen?.tila, taso: ennen?.taso, kertomustaso: ennen?.kertomustaso }));

/** Yksi linssiajo. `lukolla=false` sammuttaa lukon heti käynnistyksestä. */
async function ajaLinssi(lukolla, naytteita = 10) {
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
  const naulattu = (await lue())?.kertomustaso ?? null;
  if (!lukolla) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta?.lepokerros?.()?.lukitseKertomus?.(false));
  }
  await sivu.waitForFunction(() => {
    const n = document.querySelector('.aikajana-avaus-nappi');
    return Boolean(n) && !n.disabled;
  }, null, { timeout: 90000 }).catch(() => null);
  await sivu.evaluate(() => document.querySelector('.aikajana-avaus-nappi')?.click());
  await sivu.waitForFunction(() => {
    const a = document.querySelector('.aikajana-avaus');
    return !a || a.classList.contains('pois');
  }, null, { timeout: 60000 }).catch(() => null);
  if (!lukolla) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta?.lepokerros?.()?.lukitseKertomus?.(false));
  }
  await sivu.waitForTimeout(3000);
  const sarja = [];
  for (let i = 0; i < naytteita; i += 1) {
    sarja.push(await lue()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1000); // eslint-disable-line no-await-in-loop
  }
  return { naulattu, sarja };
}

/** Linssi kiinni ja kerros takaisin lepoon seuraavaa ajoa varten. */
async function suljeLinssi() {
  await sivu.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await sivu.waitForFunction(() => !document.body.classList.contains('aikajana-paalla'),
    null, { timeout: 30000 }).catch(() => null);
  await sivu.waitForTimeout(4000);
  return lue();
}

/* ---------------- linssiajo (vastakokeessa ilman lukkoa) ------------ */
const lukko = await ajaLinssi(LUKKO_PAALLA);
writeFileSync(join(ULOS, 'linssilaatat-lukko.png'), await kuvaa());

vaadi('linssin käynnistys naulaa sen tason, joka oli valittuna',
  lukko.naulattu !== null && lukko.naulattu === ennen?.taso,
  JSON.stringify({ naulattu: lukko.naulattu, tasoEnnen: ennen?.taso }));

const naulat = new Set(lukko.sarja.map((m) => m?.kertomustaso ?? null));
vaadi('naula ei liiku ajon aikana',
  naulat.size === 1 && naulat.has(lukko.naulattu),
  JSON.stringify([...naulat]));

/* Peitto kirjataan tiedoksi, ei väitteeksi (ks. otsikko). */
console.log('peitto ajon aikana:', JSON.stringify(lukko.sarja.map((m) => Number(peitto(m).toFixed(2)))));

/* ---------------- 3. tauko: kartta paikallaan ----------------------- */
await sivu.evaluate(() => {
  [...document.querySelectorAll('.aikajana-nappi')].find((b) => /tauko/i.test(b.textContent))?.click();
});
/*
 * TAUON ANNETAAN ASETTUA ENNEN ENSIMMÄISTÄ KAAPPAUSTA. Tauko pysäyttää
 * kellon, mutta kameran pehmennys (easing) ja havainnekuvan ristihäivytys
 * jatkuvat vielä sekunteja — mitattu: kuuden sekunnin kohdalla ero on
 * nolla, mutta heti tauon jälkeen 16,6, eli kuvassa on vielä liikettä
 * joka ei ole laattakerroksen asia.
 */
await sivu.waitForTimeout(7000);
const taukokuvat = [];
for (let i = 0; i < 3; i += 1) {
  taukokuvat.push(decodePng(await kuvaa())); // eslint-disable-line no-await-in-loop
  await sivu.waitForTimeout(2000); // eslint-disable-line no-await-in-loop
}
/* Kartta-alue: ylä- ja alapalkki rajataan pois (ne elävät kellon tahdissa). */
const kuva0 = taukokuvat[0];
const alue = {
  x0: 0, x1: kuva0.width, y0: Math.round(kuva0.height * 0.12), y1: Math.round(kuva0.height * 0.82),
};
const erot = [kuvienEro(taukokuvat[0], taukokuvat[1], alue), kuvienEro(taukokuvat[1], taukokuvat[2], alue)];
vaadi('tauolla kartta on paikallaan (ei välähtäviä arkkeja)',
  erot.every((e) => e <= TAUON_EROKATTO),
  JSON.stringify({ erot, katto: TAUON_EROKATTO }));

const kiinni = await suljeLinssi();
vaadi('linssin sulku purkaa lukon',
  kiinni?.kertomustaso === null,
  JSON.stringify({ kertomustaso: kiinni?.kertomustaso, tila: kiinni?.tila }));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await konteksti.close();
await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi.`);
if (kaatui.length) process.exitCode = 1;
