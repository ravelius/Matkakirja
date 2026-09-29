#!/usr/bin/env node
/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERAN ISS-KYYTI (omistajan kysymys 27.9.2026
 * klo 23.5x; Linssisepän suositus docs/raportit/iss-kyyti-suositus-
 * 20260928.md, natiivi proto linssiseppa/iss-kyyti).
 *
 *   PLAYWRIGHT_JS=…/node_modules/playwright/index.js \
 *     node tools/savukkeet/savuke-iss-kyyti.mjs [--kuvat <kansio>]
 *
 * WebKit, pariteettiruudut iPhone 393 × 852 ja iPad 834 × 1194 (DPR 2).
 * media.matkakirja.app haetaan Noden kautta (CORS), muu verkko poikki.
 *
 * VÄITTEET (kummallakin laitteella):
 *   1. Kaukonäkymä: TLE ämpäristä (laatu tarkka), ISS-merkki näkyvissä,
 *      syke soi kerran paljastuksessa.
 *   2. Napautus 44 px:n osuma-alaan (merkin vierestä) → seuranta 2,5 s:ssa:
 *      LIVE-pilleri "● LIVE · ISS · … km · … km/h", ilmakehän kaari,
 *      ISS-malli, ohjaimet kiinni, kenttäkulma 50°, silmä 1 200 km ISS:stä.
 *   3. Veto ja rulla kosketuskerroksella eivät siirrä kameraa ISS:stä.
 *   4. Napautus → ikkuna: kenttäkulma 80°, Cupola-kehys ladattu, malli pois.
 *   5. Napautus → takaisin seurantaan (kenttäkulma 50°).
 *   6. ✕ → kaukonäkymä 2 s:ssa: ohjaimet auki, kenttäkulma palautunut, rata
 *      näkyvissä, kyydin UI pois.
 *   7. Ei sivuvirheitä.
 * Lisäksi iPhone ilman TLE:tä: pilleri "ISS · 420 km · … · rata-arvio" ilman LIVE:ä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const JUURI = resolve(valitsin('juuri', join(dirname(fileURLToPath(import.meta.url)), '..', '..')));
const ULOS = valitsin('kuvat', '/tmp/matkakirja-kaappaukset/iss-kyyti');
mkdirSync(ULOS, { recursive: true });
const APP_VERSIO = readFileSync(join(JUURI, 'js/main.js'), 'utf8').match(/APP_VERSION = '([^']+)'/)?.[1] ?? '?';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const VALIMUISTI = new Map();
const ulkohaku = (url) => {
  if (!VALIMUISTI.has(url)) {
    VALIMUISTI.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
      : null)).catch(() => null));
  }
  return VALIMUISTI.get(url);
};
const palvelin = createServer((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = Number(process.env.PORTTI) || 8763;
await new Promise((r) => palvelin.listen(PORTTI, r));

const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const selain = await paketti.webkit.launch();

const NAKYMAT = {
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaPeli(s) {
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
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 });
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(800);
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
    for (let i = 0; i < 400 && ui.pallolinssi?.tunnus !== 'satelliitti'; i += 1) {
      await new Promise((r) => setTimeout(r, 25));
    }
  });
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.paljastus?.vaihe === 'paljastettu',
    null, { timeout: 20000 },
  ).catch(() => {});
  await s.waitForTimeout(1500);
}

/** Kyydin, kameran ja ISS:n tila yhdellä kertaa. */
const tila = (s) => s.evaluate(() => {
  const { ui } = window.matkakirja;
  const av = ui.pallolinssi?.kahva?.avaruus;
  const t = av?.tila?.();
  const pallo = ui.pallonInstanssi;
  const cam = pallo.camera();
  const k = t?.kyyti ?? {};
  const ISS = t?.kalvo?.iss ?? null;
  const rata = document.querySelector('.astro-rata');
  const tieto = document.querySelector('.iss-kyyti-tieto');
  return {
    kyyti: k,
    issSyke: t?.issSyke ?? null,
    // ISS-realismi (Siirtoseppä): kerrokset; realismin ilmakaari korvaa näkymän oman kaaren (korvaa.kaari).
    realismi: t?.realismi ?? null,
    iss: ISS,
    radanLaatu: t?.kalvo?.radanLaatu ?? null,
    rataOpacity: rata ? getComputedStyle(rata).opacity : null,
    radanPisteita: t?.kalvo?.kaarenPisteita ?? 0,
    kamera: { x: cam.position.x, y: cam.position.y, z: cam.position.z, fov: cam.fov },
    korkeus: +(cam.position.length() / pallo.getGlobeRadius() - 1).toFixed(4),
    ohjaimet: pallo.controls().enabled,
    tieto: tieto ? { teksti: document.querySelector('.iss-kyyti-teksti')?.textContent ?? '', opacity: getComputedStyle(tieto).opacity, laatikko: (() => { const b = tieto.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom].map(Math.round); })() } : null,
    uiNakyy: Boolean(document.querySelector('.iss-kyyti:not([hidden])')),
    body: document.body.classList.contains('satelliitti-kyyti'),
    linssisulku: (() => { const e = document.querySelector('.satelliitti-linssikehys'); return e ? getComputedStyle(e).display : null; })(),
    leveys: innerWidth,
    korkeusPx: innerHeight,
  };
});

/** ISS:n todellinen paikka ja etäisyys silmästä (km). */
const issEtaisyys = (s) => s.evaluate(async () => {
  const { ISS_NYT } = await import('/js/linssit/iss-rata.js');
  const pallo = window.matkakirja.ui.pallonInstanssi;
  const p = ISS_NYT.paikka(Date.now());
  const c = pallo.getCoords(p.lat, p.lon, p.korkeusKm / 6371);
  const cam = pallo.camera().position;
  const R = pallo.getGlobeRadius();
  const ruutu = pallo.getScreenCoords(p.lat, p.lon, p.korkeusKm / 6371);
  return {
    km: Math.round((Math.hypot(cam.x - c.x, cam.y - c.y, cam.z - c.z) / R) * 6371),
    ruutu: ruutu ? { x: Math.round(ruutu.x), y: Math.round(ruutu.y) } : null,
  };
});

/** Kehysvälit (ms) rAF:lla n sekunnin ajan: kevyt mittaus, ei kuormitusta. */
const kehysvalit = (s, sek = 3) => s.evaluate(async (kesto) => {
  const valit = [];
  let ed = null;
  await new Promise((valmis) => {
    const loppu = performance.now() + kesto * 1000;
    const askel = (t) => {
      if (ed !== null) valit.push(t - ed);
      ed = t;
      if (t < loppu) requestAnimationFrame(askel); else valmis();
    };
    requestAnimationFrame(askel);
  });
  valit.sort((a, b) => a - b);
  const p = (q) => +valit[Math.min(valit.length - 1, Math.floor(q * valit.length))].toFixed(1);
  return { n: valit.length, p50: p(0.5), p95: p(0.95) };
}, sek);

async function ajaNakyma(nimi, { ilmanTle = false } = {}) {
  const virheet = [];
  const nakyma = nimi.replace(/-.*/, '');
  const konteksti = await selain.newContext({ ...NAKYMAT[nakyma], serviceWorkers: 'block' });
  // Pulun tervetulojakso (js/linssit/pulu-tervetulo.js) kuultu: muuten Livia ohjaisi kameraa kesken mittauksen.
  await konteksti.addInitScript(() => {
    try { localStorage.setItem('matkakirja-pulu-astro-tervetulo', '1'); } catch { /* yksityinen tila */ }
  });
  const s = await konteksti.newPage();
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const url = route.request().url();
    if (ilmanTle && url.includes('iss-tle.json')) { route.abort(); return; }
    const v = await ulkohaku(url);
    if (!v) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  s.on('pageerror', (e) => virheet.push(String(e)));
  const kuva = (vaihe) => s.screenshot({ path: join(ULOS, `iss-kyyti-web-${nimi}-${vaihe}.png`), timeout: 90000 })
    .catch((e) => console.log(`    (kaappaus ${vaihe}: ${e.message.split('\n')[0]})`));
  const n = (t) => `${t} (${nimi})`;

  await avaaPeli(s);
  // Saapumiskortti ("Ohita") voi nousta linssin päälle: pois kuvista.
  await s.evaluate(() => {
    [...document.querySelectorAll('button, a, [role="button"]')].find((b) => /^\s*ohita\s*$/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(800);
  // TLE ehtii ämpäristä; kamera ISS:n ylle, jotta merkki on pallon etupuolella.
  await s.waitForTimeout(1500);
  await s.evaluate(async () => {
    const { ISS_NYT } = await import('/js/linssit/iss-rata.js');
    const p = ISS_NYT.paikka(Date.now());
    const { ui } = window.matkakirja;
    ui.pallonInstanssi.pointOfView({ lat: Math.max(-50, Math.min(50, p.lat - 8)), lng: p.lon }, 0);
  });
  await s.waitForTimeout(1200);
  const kauko = await tila(s);
  if (ilmanTle) {
    vaadi(n('ilman TLE:tä havainnollinen rata'), kauko.radanLaatu === 'havainnollinen', kauko.radanLaatu);
  } else {
    vaadi(n('TLE ämpäristä: radan laatu tarkka'), kauko.radanLaatu === 'tarkka', kauko.radanLaatu);
    vaadi(n('syke soi kerran paljastuksessa'), kauko.issSyke === true, String(kauko.issSyke));
    vaadi(n('ISS-merkki näkyvissä kaukonäkymässä'), Boolean(kauko.iss?.nakyvissa), JSON.stringify(kauko.iss));
    await kuva('1-kauko');
  }

  /*
   * 44 px:n osuma-ala: napautus 20 px merkin VIEREEN. ISS voittaa vain, jos
   * yksikään näkyvä havaintopiste ei ole napautusta lähempänä (natiivin
   * sääntö, satelliitti-avaruus.js issNapautukseen). Kiinteä "20 px oikealle"
   * kaatui aina, kun ISS lensi Euroopan pisteiden vierestä (Siirtoseppä
   * 28.9.2026: klo 20.30–20.50 2/2) — suunta valitaan siksi tuoreesta
   * asemasta niin, ettei mikään piste ole lähempänä; ellei sellaista ole,
   * napautetaan merkkiin (tuloste kertoo kumpi).
   */
  const vapaa = await s.evaluate(() => {
    /*
     * KILPAILUVAPAA NAPAUTUS: kaukonäkymässä pallo pyörii, joten merkki ja
     * pisteet liikkuvat hiiren napautuksen ja erillisen mittauksen välissä
     * (Siirtoseppä 28.9. klo 21.0x: suunta oli oikea, osuma silti ohi).
     * Suunta valitaan ja pointerdown/pointerup lähetetään SAMASSA
     * synkronisessa ajossa samoista koordinaateista, joilla pelin
     * issNapautukseen päättää.
     */
    const koteloEl = window.matkakirja.ui.pallolauta?.kotelo ?? document.querySelector('.pallo-kotelo, .pallo-kuori');
    const k = koteloEl.getBoundingClientRect();
    const iss = window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.kalvo?.iss ?? null;
    if (!iss?.nakyvissa || iss.x == null) return { d: -1 };
    const keski = { x: k.left + iss.x, y: k.top + iss.y };
    const pisteet = [...document.querySelectorAll('.satelliitti-piste:not(.pallolauta-takana) .satelliitti-ydin')]
      .map((el) => el.getBoundingClientRect()).filter((b) => b.width).map((b) => ({ x: b.left + b.width / 2, y: b.top + b.height / 2 }));
    const suunnat = [[20, 0], [-20, 0], [0, 20], [0, -20], [14, 14], [-14, 14], [14, -14], [-14, -14]];
    const valittu = suunnat.map(([dx, dy]) => ({ x: keski.x + dx, y: keski.y + dy, d: Math.hypot(dx, dy), dx, dy }))
      .find((c) => pisteet.every((p) => Math.hypot(c.x - p.x, c.y - p.y) > c.d + 1))
      ?? { x: keski.x, y: keski.y, d: 0, dx: 0, dy: 0 };
    const alle = document.elementFromPoint(valittu.x, valittu.y) ?? koteloEl;
    const tapahtuma = (tyyppi) => new PointerEvent(tyyppi, { bubbles: true, cancelable: true, clientX: valittu.x, clientY: valittu.y, pointerId: 1, pointerType: 'mouse', isPrimary: true });
    alle.dispatchEvent(tapahtuma('pointerdown'));
    alle.dispatchEvent(tapahtuma('pointerup'));
    return { d: valittu.d, kohta: [valittu.dx, valittu.dy], pisteita: pisteet.length };
  });
  await s.waitForTimeout(400);
  const lento = await tila(s);
  vaadi(n(`napautus ISS:n viereen (${vapaa.d > 0 ? '20 px' : 'merkkiin, pisteet vieressä'}) vie kyytiin`), lento.kyyti.tila === 'seuranta' && lento.kyyti.kyydissa,
    JSON.stringify({ tila: lento.kyyti.tila, siirtyy: lento.kyyti.siirtyy, kohta: vapaa.kohta, pisteita: vapaa.pisteita }));
  await s.waitForTimeout(3600);
  const seuranta = await tila(s);
  const et = await issEtaisyys(s);
  if (ilmanTle) {
    vaadi(n('pilleri ilman LIVE:ä ja "· rata-arvio" lopussa'),
      /^ISS · 420 km · [\d\s]+ km\/h · rata-arvio$/.test(seuranta.tieto?.teksti ?? '') && seuranta.kyyti.live === false,
      seuranta.tieto?.teksti);
    await kuva('2-seuranta-rata-arvio');
    vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
    await konteksti.close();
    return;
  }
  vaadi(n('seuranta: LIVE-pilleri vasemmassa yläkulmassa'),
    /^· ISS · \d{3} km · 2[\d\s]+ km\/h$/.test(seuranta.tieto?.teksti ?? '') && seuranta.kyyti.live === true
      && Number(seuranta.tieto.opacity) > 0.9 && seuranta.tieto.laatikko[0] <= 16,
    JSON.stringify(seuranta.tieto));
  const realismiKaari = Boolean(seuranta.realismi?.kerrokset?.some((k) => k.nimi === 'ilmakaari' && k.nakyy));
  vaadi(n('seuranta: kaari (oma tai realismin ilmakaari), malli, ohjaimet kiinni, kenttäkulma 50°'),
    (seuranta.kyyti.kaari || realismiKaari) && seuranta.kyyti.malli && seuranta.kyyti.osuus === 1 && seuranta.ohjaimet === false
      && Math.abs(seuranta.kamera.fov - 50) < 0.01 && seuranta.body && seuranta.linssisulku === 'none',
    JSON.stringify({ ...seuranta.kyyti, kerrokset: undefined, realismiKaari, fov: seuranta.kamera.fov, ohjaimet: seuranta.ohjaimet }));
  vaadi(n('seuranta: silmä 1 200 km ISS:stä, ISS ruudulla'), Math.abs(et.km - 1200) < 25
    && et.ruutu && et.ruutu.x > 0 && et.ruutu.x < seuranta.leveys && et.ruutu.y > 0 && et.ruutu.y < seuranta.korkeusPx,
  JSON.stringify(et));
  vaadi(n('seuranta: rata piilossa'), Number(seuranta.rataOpacity) < 0.05, seuranta.rataOpacity);
  await kuva('2-seuranta');
  const kehysSeuranta = await kehysvalit(s, 3);

  // Veto ja rulla kosketuskerroksella: kamera pysyy kyydissä.
  const { leveys: W, korkeusPx: H } = seuranta;
  await s.mouse.move(W * 0.3, H * 0.6);
  await s.mouse.down();
  for (let i = 1; i <= 10; i += 1) { await s.mouse.move(W * 0.3 + i * 18, H * 0.6 - i * 6); await s.waitForTimeout(16); }
  await s.mouse.up();
  await s.mouse.wheel(0, 600);
  await s.waitForTimeout(700);
  const vedon = await tila(s);
  const et2 = await issEtaisyys(s);
  vaadi(n('veto ja rulla eivät liikuta kameraa'), vedon.kyyti.tila === 'seuranta' && Math.abs(et2.km - 1200) < 25,
    `${et2.km} km, ${vedon.kyyti.tila}`);

  // Napautus → ikkuna.
  await s.mouse.click(W / 2, H * 0.55);
  await s.waitForTimeout(2600);
  const ikkuna = await tila(s);
  const et3 = await issEtaisyys(s);
  vaadi(n('ikkuna: kenttäkulma 80°, silmä ISS:ssä, malli pois'),
    ikkuna.kyyti.tila === 'ikkuna' && Math.abs(ikkuna.kamera.fov - 80) < 0.01 && et3.km < 5 && !ikkuna.kyyti.malli,
    JSON.stringify({ tila: ikkuna.kyyti.tila, fov: ikkuna.kamera.fov, km: et3.km }));
  vaadi(n('ikkuna: Cupola-kehys ladattu ja näkyvissä'),
    ikkuna.kyyti.kehys && ikkuna.kyyti.kehysOk === true && ikkuna.kyyti.kerrokset.some((k) => k.laji === 'kehys' && k.ladattu),
    JSON.stringify(ikkuna.kyyti.kerrokset));
  await kuva('3-ikkuna');
  const kehysIkkuna = await kehysvalit(s, 3);
  // Kuvaparia varten: ikkuna ilman kehystä (sama hetki).
  await s.evaluate(() => { for (const el of document.querySelectorAll('.iss-kyyti-cupola')) el.style.visibility = 'hidden'; });
  await s.waitForTimeout(150);
  await kuva('3-ikkuna-ilman-kehysta');
  await s.evaluate(() => { for (const el of document.querySelectorAll('.iss-kyyti-cupola')) el.style.visibility = ''; });

  // Napautus → takaisin seurantaan.
  await s.mouse.click(W / 2, H * 0.55);
  await s.waitForTimeout(2000);
  const takaisin = await tila(s);
  vaadi(n('ikkunasta napautus palaa seurantaan (kenttäkulma 50°)'),
    takaisin.kyyti.tila === 'seuranta' && Math.abs(takaisin.kamera.fov - 50) < 0.01, `${takaisin.kyyti.tila} ${takaisin.kamera.fov}`);

  /* ---- Nopeutus ja Palaa LIVE (omistaja 28.9. klo 12.1x) --------- */
  const aika = () => s.evaluate(() => {
    const t = window.matkakirja.ui.pallolinssi.kahva.avaruus.tila().kyyti;
    return {
      ...t.aika, tila: t.tila, ylilento: t.ylilento, kohde: t.kohde, nasaKoe: t.nasaKoe,
      merkki: document.querySelector('.iss-kyyti-live')?.textContent ?? null,
      merkkiNakyy: !document.querySelector('.iss-kyyti-live')?.hidden,
      nopeutettu: document.querySelector('.iss-kyyti-tieto')?.classList.contains('iss-kyyti-tieto-nopeutettu'),
      ylilentoRivi: document.querySelector('.iss-kyyti-ylilento:not([hidden])')?.textContent ?? null,
      pilleri: (() => { const e = document.querySelector('.iss-kyyti-tieto'); const c = getComputedStyle(e); return { top: c.top, left: c.left }; })(),
    };
  });
  await s.click('.iss-kyyti-nopeudet button[data-kerroin="100"]');
  await s.waitForTimeout(2000);
  const nopea = await aika();
  vaadi(n('nopeutus 100×: pilleri "● 100× · ISS …" ilman LIVE-sanaa, aika juoksee 100×'),
    nopea.merkki === '100×' && nopea.nopeutettu && !nopea.live && nopea.eroMs > 150_000 && nopea.eroMs < 260_000,
    JSON.stringify({ merkki: nopea.merkki, ero: nopea.eroMs, nopeus: nopea.nopeus }));
  await kuva('5-nopeutus-100x');
  await s.click('.iss-kyyti-tieto');
  await s.waitForTimeout(400);
  const kelaus = await aika();
  await s.waitForTimeout(3200);
  const takaisinLive = await aika();
  vaadi(n('Palaa LIVE (pillerin napautus): kelaa pehmeästi todelliseen hetkeen'),
    kelaus.kelaa === true && Math.abs(kelaus.eroMs) > 1000 && takaisinLive.live && Math.abs(takaisinLive.eroMs) < 50
      && takaisinLive.merkki === 'LIVE',
    `kesken ${kelaus.eroMs} ms, perillä ${takaisinLive.eroMs} ms, ${takaisinLive.merkki}`);
  vaadi(n('pilleri turva-alueella (10 px + inset ylhäältä, 12 px sivusta)'),
    takaisinLive.pilleri.top === '10px' && takaisinLive.pilleri.left === '12px', JSON.stringify(takaisinLive.pilleri));

  /* ---- "Lennä kohteen ylle" → seuraava todellinen ylilento --------- */
  const lenna = async (tunnus, odotaS = 32, valoisa = false) => {
    // Valikko (pelaajan tie) — NASA-kokeessa sama funktio valoisalle ohitukselle.
    if (valoisa) await s.evaluate((t) => window.matkakirja.ui.pallolinssi.kahva.avaruus.lennaKohteeseen(t, { valoisa: true }), tunnus);
    else await s.selectOption('.iss-kyyti-kohteet', tunnus);
    await s.waitForTimeout(300);
    const alku = await aika();
    const loppuu = Date.now() + odotaS * 1000;
    let t = alku;
    while (Date.now() < loppuu) {
      await s.waitForTimeout(500);
      t = await aika();
      if (t.tila === 'kohde' && t.ylilento?.perilla) break;
    }
    await s.waitForTimeout(1600);
    const keski = await s.evaluate((k) => {
      const pallo = window.matkakirja.ui.pallonInstanssi;
      const p = pallo.getScreenCoords(k.lat, k.lon, 0);
      return p ? { x: Math.round(p.x), y: Math.round(p.y) } : null;
    }, t.kohde ?? { lat: 0, lon: 0 });
    return { alku, perilla: await aika(), keski };
  };
  const venetsia = await lenna('venetsia');
  vaadi(n('valikko: ylilennon kellonaika näkyy ("Ylilento klo 14.32, 3 h 12 min päästä")'),
    /Ylilento klo \d{1,2}\.\d\d, (\d+ h )?\d+ min päästä/.test(venetsia.alku.ylilentoRivi ?? ''), venetsia.alku.ylilentoRivi);
  vaadi(n('ylilento: kelaus perille (ei teleporttia), kamera kohteessa, sivuttain ≤ 500 km'),
    venetsia.alku.kelaa === true && venetsia.perilla.tila === 'kohde' && venetsia.perilla.ylilento?.perilla
      && Math.abs(venetsia.perilla.simMs - venetsia.perilla.ylilento.ms) < 60_000
      && venetsia.perilla.ylilento.sivuttainKm <= 500
      && venetsia.keski && Math.abs(venetsia.keski.x - W / 2) < 40 && Math.abs(venetsia.keski.y - H / 2) < 40,
    JSON.stringify({ ylilento: venetsia.perilla.ylilento, keski: venetsia.keski, rivi: venetsia.perilla.ylilentoRivi }));
  await kuva('6-ylilento-venetsia');
  if (nimi === 'iphone') {
    /* KOE: NASA-kuva kohteen päälle — kuvapari piirretty | oikea kuva. */
    for (const tunnus of ['venetsia', 'dardanellit', 'santorini']) {
      // Valoisa ohitus, jotta kuvapari näyttää maan (yöllä yökuori tummentaa molemmat).
      await lenna(tunnus, 32, true);
      const koeKuva = (laji) => s.screenshot({ path: join(ULOS, 'nasa-koe', `nasa-koe-${nimi}-${tunnus}-${laji}.png`), timeout: 90000 });
      mkdirSync(join(ULOS, 'nasa-koe'), { recursive: true });
      await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.nasaKoe(false));
      await s.waitForTimeout(900);
      await koeKuva('piirretty');
      await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.nasaKoe(true));
      await s.waitForTimeout(2500);
      const koe = await aika();
      vaadi(n(`NASA-koe ${tunnus}: kuva ladattu ja häivytetty kohteen päälle`),
        koe.nasaKoe?.tunnus === tunnus && koe.nasaKoe.valmis && koe.nasaKoe.peitto > 0.9, JSON.stringify(koe.nasaKoe));
      await koeKuva('nasa');
      const tila2 = await aika();
      console.log(`    ${tunnus}: ylilento ${new Date(tila2.ylilento?.ms ?? 0).toISOString()}, sivuttain ${tila2.ylilento?.sivuttainKm} km`);
    }
    await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.nasaKoe(false));
  }

  // ✕ → kaukonäkymä (aika palaa LIVE:ksi paluulennon aikana).
  await s.click('.iss-kyyti-sulku');
  await s.waitForTimeout(3000);
  const paluu = await tila(s);
  vaadi(n('✕ palaa kaukonäkymään: ohjaimet auki, kenttäkulma 50°, UI pois'),
    !paluu.kyyti.kyydissa && paluu.ohjaimet === true && Math.abs(paluu.kamera.fov - 50) < 0.01
      && !paluu.uiNakyy && !paluu.body && paluu.linssisulku !== 'none',
    JSON.stringify({ kyydissa: paluu.kyyti.kyydissa, ohjaimet: paluu.ohjaimet, fov: paluu.kamera.fov, ui: paluu.uiNakyy }));
  vaadi(n('kaukonäkymässä rata näkyy ja kamera on lepokorkeudella'),
    Number(paluu.rataOpacity || 1) > 0.95 && paluu.radanPisteita > 10 && paluu.korkeus > 1,
    `rata ${paluu.rataOpacity}, ${paluu.radanPisteita} pistettä, korkeus ${paluu.korkeus}`);
  const paluuAika = await aika();
  vaadi(n('✕ palauttaa ajan LIVE:ksi'), paluuAika.live && Math.abs(paluuAika.eroMs) < 50, String(paluuAika.eroMs));
  await kuva('4-kauko-paluu');
  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
  console.log(`    kehysväli seuranta ${JSON.stringify(kehysSeuranta)}, ikkuna ${JSON.stringify(kehysIkkuna)};`
    + ` kyydin oma työ ka ${paluu.kyyti.kuvaMsKa} ms, max ${paluu.kyyti.kuvaMsMax} ms (${paluu.kyyti.kehyksia} kehystä)`);
  await konteksti.close();
}

console.log(`ISS-kyyti (${APP_VERSIO}), juuri ${JUURI}`);
for (const nimi of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : Object.keys(NAKYMAT))) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nimi);
}
if (!process.env.NAKYMAT || process.env.NAKYMAT.includes('ilman')) await ajaNakyma('iphone-ilman-tle', { ilmanTle: true });
await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
