/*
 * SELAINSAVUKE: VESISTÖLINSSIN JOET PALLOLLA — YHTENÄINEN UOMA.
 *
 *   PLAYWRIGHT_JS=…/node_modules/playwright/index.js CHROMIUM=… \
 *     node tools/savukkeet/savuke-vesistolinssi.mjs
 *
 * VIKA (Fable 24.9.2026): pallon vesistölinssin joet piirtyivät
 * pätkittäisinä ja läpikuultavina. Uoma ja sen tumma penger ovat samaa
 * polkua samalla korkeudella, ja kun molemmat kirjoittivat syvyyttä,
 * kapeampi uoma hävisi pengerelle z-taistelussa pätkä kerrallaan.
 * Natiivi (proto-3d Assets/Matkakirja/Linssit/Unity/VesistotKerros.cs)
 * piirtää saman parin ilman syvyyskirjoitusta ja kiinteällä jonolla:
 * järvet, penkereet, uomat luokittain (pääjoki päällimmäisenä).
 *
 * Savuke mittaa sen, mikä korjauksessa ratkaisee, pallon omasta
 * näyttämöstä eikä kuvasta:
 *
 *   1. Linssi syttyy pallolle, ja näyttämössä on sekä penkereitä että
 *      uomia.
 *   2. Yksikään joki- tai pengerviiva ei kirjoita syvyyttä
 *      (depthWrite = false), joten kerrokset eivät taistele keskenään.
 *   3. Järjestys on kiinteä renderOrderilla: järvi < penger < uoma, ja
 *      uomat tärkeysluokittain (luokka 1 päällimmäisenä).
 *   4. Uomat ja penkereet ovat UOMAN_KORKEUDELLA (0,004) eli järvien
 *      (0,003) ja kalvon (0,0015) yläpuolella, eivät reittien 0,002:ssa.
 *   5. Viivat ovat täysin peittäviä (opacity 1): läpikuultavuus ei saa
 *      syntyä kerrosten piirtojärjestyksestä.
 *
 * KUVAT: vesistolinssi-{amazon,eurooppa}.png kansioon KAAPPAUKSET.
 * Stillit otetaan ilman GPU-lippuja (SwiftShader), koska Macin
 * Metal-headless antaa mustan pallon kaappaukseen.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });
const ETULIITE = process.env.ETULIITE ?? 'vesistolinssi';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/* Ämpäri Noden kautta; epäonnistunutta hakua ei muisteta. */
const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  const vastaus = await lupaus;
  if (!vastaus) VALIMUISTI.delete(url);
  return vastaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = Number(process.env.PORTTI) || 8791;
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
  viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block',
});
const s = await konteksti.newPage();
await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
await s.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
  const vastaus = await ulkohaku(route.request().url());
  if (!vastaus) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
s.on('pageerror', (e) => virheet.push(String(e)));

/* --- Peli auki pallolaudalle (sama kaava kuin satelliittilinssissä) --- */
await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
await s.waitForTimeout(2500);
await s.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await s.waitForTimeout(2500);
await s.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
});
await s.waitForTimeout(1200);
await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 });
await s.waitForTimeout(1500);
await s.keyboard.press('Escape');
await s.evaluate(async () => {
  const { suljeFokusvirta } = await import('/js/fokusvirta.js');
  suljeFokusvirta(window.matkakirja.ui);
});
await s.waitForTimeout(600);
await s.evaluate(() => {
  for (const v of ['[aria-label*="Sulje"]', '.saapumistraileri-sulje', '.arrival-close']) {
    document.querySelector(v)?.click();
  }
  document.querySelector('dialog[open]')?.close?.();
  for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
});
await s.waitForTimeout(1200);

/* --- 1. Linssi pallolle -------------------------------------------- */
const syttyi = await s.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  if (!ui.game.player.linssit.includes('vesistot')) ui.game.player.linssit.push('vesistot');
  ui.valitseLinssi('vesistot');
  for (let i = 0; i < 400; i += 1) {
    if (ui.pallolinssi?.tunnus === 'vesistot') break;
    await new Promise((r) => setTimeout(r, 25));
  }
  // Polkujen siirtymä (pathTransitionDuration) ja kalvon häivytys.
  await new Promise((r) => setTimeout(r, 2500));
  return { pallolinssi: ui.pallolinssi?.tunnus ?? null };
});

/**
 * Näyttämön joki-, penger- ja järvioliot tiivisteenä. Kirjasto tekee
 * jokaisesta polusta ryhmän (`__globeObjType` 'path', datum `__data`),
 * jonka lapsi on Line2; järvestä ryhmän ('polygon'), jonka datum on
 * kääritty (`__data.data`) ja lapset ovat kansi ja reunaviiva.
 */
const NAYTTAMO = () => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const R = pallo.getGlobeRadius();
  const rivit = [];
  pallo.scene().traverse((ryhma) => {
    const tyyppi = ryhma.__globeObjType;
    if (tyyppi !== 'path' && tyyppi !== 'polygon') return;
    const d = tyyppi === 'path' ? ryhma.__data : ryhma.__data?.data;
    const avain = typeof d?.avain === 'string' ? d.avain : '';
    const laji = avain.split(':')[0];
    if (!['uoma', 'penger', 'jarvi'].includes(laji)) return;
    const lapsi = ryhma.children?.[0];
    if (!lapsi?.material) return;
    // Polygonin kannen materiaali on listan viimeinen (sivu, kansi).
    const m = Array.isArray(lapsi.material) ? lapsi.material[lapsi.material.length - 1] : lapsi.material;
    let sade = null;
    const alku = lapsi.geometry?.attributes?.instanceStart;
    if (tyyppi === 'path' && alku?.count) {
      const v = [alku.getX(0), alku.getY(0), alku.getZ(0)];
      sade = Math.hypot(...v) / R - 1;
    }
    rivit.push({
      laji,
      avain,
      tarkeys: d.tarkeys ?? null,
      tyyppi: lapsi.type,
      transparent: m.transparent,
      depthWrite: m.depthWrite,
      opacity: m.opacity,
      renderOrder: lapsi.renderOrder,
      sade,
    });
  });
  return rivit;
};

const objektit = await s.evaluate(NAYTTAMO);
const penkat = objektit.filter((o) => o.laji === 'penger');
const uomat = objektit.filter((o) => o.laji === 'uoma');
const jarvet = objektit.filter((o) => o.laji === 'jarvi');
vaadi('linssi syttyy pallolle, näyttämössä on penkereitä ja uomia',
  syttyi.pallolinssi === 'vesistot' && penkat.length > 0 && uomat.length > 0,
  `linssi=${syttyi.pallolinssi} penkereitä=${penkat.length} uomia=${uomat.length} järviä=${jarvet.length}`);

const kirjoittaa = [...penkat, ...uomat].filter((o) => o.depthWrite !== false);
vaadi('joet ja penkereet eivät kirjoita syvyyttä (ei z-taistelua)',
  kirjoittaa.length === 0,
  `depthWrite päällä ${kirjoittaa.length}/${penkat.length + uomat.length}`
    + (kirjoittaa[0] ? ` (esim. ${kirjoittaa[0].avain} ${kirjoittaa[0].tyyppi})` : ''));

const maxJarvi = Math.max(-Infinity, ...jarvet.map((o) => o.renderOrder));
const minPenger = Math.min(Infinity, ...penkat.map((o) => o.renderOrder));
const maxPenger = Math.max(-Infinity, ...penkat.map((o) => o.renderOrder));
const minUoma = Math.min(Infinity, ...uomat.map((o) => o.renderOrder));
const luokanJarjestys = [3, 2, 1].map((t) => {
  const r = uomat.filter((o) => o.tarkeys === t).map((o) => o.renderOrder);
  return r.length ? { t, min: Math.min(...r), max: Math.max(...r) } : null;
}).filter(Boolean);
const luokatNousevat = luokanJarjestys.every((l, i) => i === 0 || l.min > luokanJarjestys[i - 1].max);
vaadi('piirtojärjestys renderOrderilla: järvi < penger < uoma, pääjoki päällimmäisenä',
  maxJarvi < minPenger && maxPenger < minUoma && luokatNousevat,
  `järvi≤${maxJarvi} penger ${minPenger}–${maxPenger} uoma≥${minUoma} luokat ${JSON.stringify(luokanJarjestys)}`);

const korkeudet = [...penkat, ...uomat].map((o) => o.sade).filter(Number.isFinite);
const minKorkeus = Math.min(...korkeudet);
const maxKorkeus = Math.max(...korkeudet);
vaadi('uomat ja penkereet ovat UOMAN_KORKEUDELLA 0,004 (järvien ja kalvon yllä)',
  korkeudet.length > 0 && Math.abs(minKorkeus - 0.004) < 2e-4 && Math.abs(maxKorkeus - 0.004) < 2e-4,
  `korkeus ${minKorkeus.toFixed(4)}–${maxKorkeus.toFixed(4)}`);

const hento = [...penkat, ...uomat].filter((o) => (o.opacity ?? 1) < 1);
vaadi('viivat ovat täysin peittäviä (opacity 1)', hento.length === 0,
  `alle 1: ${hento.length}`);

/* --- Kuvat: sama näkymä ennen ja jälkeen ------------------------------ */
const NAKYMAT = [
  { nimi: 'amazon', lat: -3.5, lng: -60, altitude: 0.55 },
  { nimi: 'eurooppa', lat: 47, lng: 18, altitude: 0.5 },
];
for (const n of NAKYMAT) {
  await s.evaluate((v) => {
    window.matkakirja.ui.pallolauta.pallo.pointOfView({ lat: v.lat, lng: v.lng, altitude: v.altitude }, 0);
  }, n);
  await s.waitForTimeout(2500);
  const polku = join(ULOS, `${ETULIITE}-${n.nimi}.png`);
  await s.screenshot({ path: polku });
  console.log(`    kuva: ${polku}`);
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok).length;
console.log(`\n${tulokset.length - kaatui}/${tulokset.length} OK`);
process.exit(kaatui ? 1 : 0);
