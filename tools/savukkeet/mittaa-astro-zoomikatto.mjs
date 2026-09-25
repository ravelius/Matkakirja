/*
 * MITTARI: ASTRONAUTIN KAMERAN ZOOMIKATTO (Raamattu PAATOKSET 50 kohta 1).
 *
 *   PLAYWRIGHT_JS=<polku>/node_modules/playwright/index.js \
 *     KAAPPAUKSET=<kansio> node tools/savukkeet/mittaa-astro-zoomikatto.mjs
 *
 * Avaa Astronautin kameran pelaajan eleellä (390 × 844 dpr 3, WebKit
 * oletuksena; SELAIMET=webkit,chromium), lukee nykyisen lähimmän sallitun
 * korkeuden (tila().rajat.min) ja vie kameran Välimeren itäosan ylle
 * kolmelle korkeudelle: nykyinen katto sekä 25 % ja 35 % lähempänä.
 * Jokaisesta kirjataan
 *   - ruudun tarve (laitepikseleitä astetta kohti, js/reliefipyramidi.js
 *     ruudunTarvePxAste) ja näkyvien reliefilaattojen z-tasot,
 *   - NÄYTEPIKSELIN KOKO RUUDULLA = tarve / tason tiheys (675 · 2^z / 360
 *     px/aste). Yli 1 laitepikselin näyte venyy; yli dpr:n (yksi CSS-
 *     pikseli) se alkaa näkyä porrastuksena,
 *   - terävyys (sama gradienttimitta kuin savuke-astro-webkit),
 *   - näkyvä ala asteina (ruudun leveys ja korkeus).
 * Ei vartija: tulostaa taulukon raporttiin
 * (docs/raportit/viesti-fable-zoomikatto-20260919.md).
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, luminanssi } from './pallon-liike-mittarit.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });
const PORTTI = Number(process.env.PORTTI ?? 8761);
const LISAPARAMIT = process.env.LISAPARAMIT ?? '';
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

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
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
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
  ?? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

const KOTELOT = {
  webapp: { viewport: { width: 2539, height: 1321 }, deviceScaleFactor: 1 },
  iphone: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3,
    hasTouch: true, isMobile: true, userAgent: IPHONE_UA,
  },
};
const SELAIMET = (process.env.SELAIMET ?? 'webkit').split(',').map((x) => x.trim()).filter(Boolean);
const VALITUT_KOTELOT = (process.env.KOTELOT ?? 'iphone')
  .split(',').map((x) => x.trim()).filter(Boolean);

async function avaaPeli(s) {
  /*
   * SIVUN LATAUS: 60 s JA VARAREITTI (mitattu 18.9.2026).
   *
   * WebKit jäi jokaisella ajolla Playwrightin 30 s:n oletukseen ennen
   * kuin peli oli edes auki. Syy on tämän savukkeen oman otsikon
   * mukainen: estetyt ulkoverkon pyynnöt jäävät WebKitissä vireille
   * pitkäksi aikaa, eikä `load` laukea siinä ajassa, vaikka sivu on
   * ruudulla ja toimii. Kello nostetaan samaan 60 s:iin kuin
   * kaappauksilla, ja jos sekään ei riitä, `domcontentloaded` kelpaa:
   * sen jälkeen tuleva `waitForFunction(pallolauta)` on se oikea
   * vartija sille, onko peli pystyssä.
   */
  const osoite = `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${LISAPARAMIT}`;
  await s.goto(osoite, { waitUntil: 'load', timeout: 60000 })
    .catch((e) => {
      /*
       * EI UUTTA NAVIGOINTIA: sivu on jo ladattu ja ajossa, ja toinen
       * `goto` samaan osoitteeseen purkaisi WebGL-kontekstin kesken
       * alustuksen (mitattu 18.9.2026: WebKit sulki sivun kokonaan).
       * Jatketaan siitä, mikä on — `waitForFunction(pallolauta)` alla
       * on se vartija, joka kertoo, onko peli oikeasti pystyssä.
       */
      console.log(`    (load ei lauennut: ${e.message.split('\n')[0]} — jatketaan silti)`);
    });
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
    // Linssi laukkuun samalle kentälle, johon js/linssit/omistus.js sen kirjoittaa.
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1800);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
  return ok;
}
async function avaaLinssiEleella(s) {
  await s.click('#turn-pill', { timeout: 20000 })
    .catch(() => s.evaluate(() => document.getElementById('turn-pill')?.click()));
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('button[data-linssi="satelliitti"]')?.click()));
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  await aktivoi.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('.linssi-aktivoi')?.click()));
}
function teravyys(kuva, osuus = 0.6) {
  const x0 = Math.floor((kuva.width * (1 - osuus)) / 2);
  const x1 = Math.ceil(kuva.width - x0);
  const y0 = Math.floor((kuva.height * (1 - osuus)) / 2);
  const y1 = Math.ceil(kuva.height - y0);
  let summa = 0;
  let n = 0;
  for (let y = y0; y < y1 - 1; y += 1) {
    for (let x = x0; x < x1 - 1; x += 1) {
      const i = (y * kuva.width + x) * 4;
      const oikea = (y * kuva.width + x + 1) * 4;
      const ala = ((y + 1) * kuva.width + x) * 4;
      summa += Math.abs(luminanssi(kuva.data, i) - luminanssi(kuva.data, oikea))
        + Math.abs(luminanssi(kuva.data, i) - luminanssi(kuva.data, ala));
      n += 1;
    }
  }
  return n ? +(summa / n).toFixed(3) : 0;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * MITTAUS
 * ══════════════════════════════════════════════════════════════════
 */
/* Välimeren itäosa: Kreeta–Kypros–Niilin suisto keskellä. */
const KOHDE = { lat: 31.5, lng: 29 };
const KERTOIMET = (process.env.KERTOIMET ?? '1').split(',').map(Number);
const ODOTUS_MS = Number(process.env.ODOTUS_MS ?? 8000);

/** Laitteen tila: rajat, kamera, kangas ja näkyvien reliefilaattojen z. */
const LUE = () => {
  const ui = window.matkakirja?.ui;
  const kahva = ui?.pallolinssi?.kahva ?? null;
  const t = kahva?.avaruus?.tila?.() ?? null;
  const pallo = ui?.pallolauta?.pallo;
  const tasot = {};
  pallo?.scene?.()?.traverse?.((o) => {
    const l = o.userData?.laattakerros;
    if (!l || !o.visible) return;
    let nakyva = true;
    for (let p = o.parent; p; p = p.parent) if (!p.visible) { nakyva = false; break; }
    if (!nakyva) return;
    tasot[l.z] = (tasot[l.z] ?? 0) + 1;
  });
  const k = pallo?.renderer?.()?.domElement;
  return {
    avaus: t?.avauskorkeus ?? null,
    rajat: t?.rajat ?? null,
    korkeus: +(pallo?.pointOfView?.()?.altitude ?? 0).toFixed(4),
    ohjainMin: pallo?.controls?.()?.minDistance ?? null,
    kangas: k ? [k.width, k.height] : null,
    laastarilla: t?.laastarilla ?? null,
    reliefinTarkkuus: t?.reliefinTarkkuus ?? null,
    avausajo: t?.avausajo?.kaynnissa ?? null,
    tasot,
  };
};

/** Näkyvä ala asteina: ruudun reunojen ja keskipisteen maantieteellinen ero. */
const ALA = () => {
  const pallo = window.matkakirja?.ui?.pallolauta?.pallo;
  const el = pallo?.renderer?.()?.domElement;
  const w = el?.clientWidth ?? 0;
  const h = el?.clientHeight ?? 0;
  const g = (x, y) => pallo?.toGlobeCoords?.(x, y) ?? null;
  const v = g(0, h / 2); const o = g(w, h / 2); const y = g(w / 2, 0); const a = g(w / 2, h);
  return {
    lngLeveys: v && o ? +(o.lng - v.lng).toFixed(2) : null,
    latKorkeus: y && a ? +(y.lat - a.lat).toFixed(2) : null,
    vasen: v, oikea: o,
  };
};

const tulokset = [];
for (const selain of SELAIMET) {
  for (const koteloNimi of VALITUT_KOTELOT) {
    const selainOlio = await pw[selain].launch();
    const konteksti = await selainOlio.newContext({ ...KOTELOT[koteloNimi], serviceWorkers: 'block' });
    const s = await konteksti.newPage();
    await ohjaaVerkko(s);
    console.log(`\n== ${selain} ${koteloNimi} ==`);
    const ok = await avaaPeli(s);
    if (!ok) { console.log('  peli ei auennut'); await selainOlio.close(); continue; }
    await avaaLinssiEleella(s);
    await s.waitForFunction(() => window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.()?.avausajo?.kaynnissa === false,
      null, { timeout: 30000 }).catch(() => null);
    await s.waitForTimeout(1500);
    const alku = await s.evaluate(LUE);
    console.log(`  avaus ${alku.avaus}  rajat ${JSON.stringify(alku.rajat)}  kangas ${alku.kangas}  reliefi ${alku.reliefinTarkkuus}`);
    const nykyinenMin = alku.rajat?.min;
    /*
     * Katon koe: kamera pyydetään rajan alle (0,2), ja OrbitControlsin
     * on vedettävä se takaisin lähimpään sallittuun (mobiili-WebKit ei
     * tue rullaa, ja nipistys kulkee saman minDistance-rajan läpi).
     */
    await s.evaluate(({ KOHDE }) => window.matkakirja.ui.pallolauta.pallo.pointOfView({ ...KOHDE, altitude: 0.2 }, 0), { KOHDE });
    await s.waitForTimeout(1500);
    const pohjaan = await s.evaluate(LUE);
    console.log(`  pyydetty 0,2: korkeus ${pohjaan.korkeus} (min ${nykyinenMin}, ohjaimen minDistance ${pohjaan.ohjainMin})`);
    for (const kerroin of KERTOIMET) {
      const alt = +(nykyinenMin * kerroin).toFixed(4);
      /* Rajat alas kokeen ajaksi, jotta OrbitControls ei vedä takaisin. */
      await s.evaluate(({ alt, KOHDE }) => {
        const ui = window.matkakirja.ui;
        const r = ui.pallolinssi.kahva.avaruus.tila().rajat;
        ui.pallolauta.zoomirajat?.({ min: Math.min(r.min, alt), max: r.max });
        ui.pallolauta.pallo.pointOfView({ ...KOHDE, altitude: alt }, 0);
      }, { alt, KOHDE });
      await s.waitForTimeout(ODOTUS_MS);
      const tila = await s.evaluate(LUE);
      const ala = await s.evaluate(ALA);
      const H = tila.kangas?.[1] ?? 0;
      const tarve = H / (53.43 * tila.korkeus);
      const zt = Object.keys(tila.tasot).map(Number);
      const zMax = zt.length ? Math.max(...zt) : null;
      const tiheys = zMax === null ? null : (675 * 2 ** zMax) / 360;
      const nayte = tiheys ? +(tarve / tiheys).toFixed(2) : null;
      const pohjanNayte = +(tarve / ((tila.reliefinTarkkuus === '8k' ? 8192 : 4096) / 360)).toFixed(2);
      let terava = null;
      const kuva = await s.screenshot({ type: 'png' });
      try { terava = teravyys(decodePng(kuva)); } catch { /* ei png-purkua */ }
      if (ULOS) writeFileSync(join(ULOS, `zoomikatto-${selain}-${koteloNimi}-${Math.round(kerroin * 100)}.png`), kuva);
      const rivi = {
        selain, kotelo: koteloNimi, kerroin, korkeus: tila.korkeus, tarvePxAste: +tarve.toFixed(1),
        tasot: tila.tasot, zMax, naytePx: nayte, pohjanNaytePx: pohjanNayte, laastarilla: tila.laastarilla,
        teravyys: terava, ala,
      };
      tulokset.push(rivi);
      console.log(`  ×${kerroin}: korkeus ${tila.korkeus}  tarve ${rivi.tarvePxAste} px/°  tasot ${JSON.stringify(tila.tasot)}  näyte ${nayte} laitepx (pohja ${pohjanNayte})  laastari ${tila.laastarilla}  terävyys ${terava}  ala ${ala.lngLeveys}° × ${ala.latKorkeus}°`);
    }
    await selainOlio.close();
  }
}
if (ULOS) writeFileSync(join(ULOS, 'zoomikatto.json'), JSON.stringify(tulokset, null, 2));
palvelin.close();
