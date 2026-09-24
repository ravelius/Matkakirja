#!/usr/bin/env node
/*
 * PARITEETTIKUVAT — webin näkymät kuviksi natiivin vertailua varten
 * (Fable 24.9.2026, Laitetestaajan tilaus). Käyttöohje, näkymälista ja
 * kaikki käytetyt kehittäjäoikotiet: tools/pariteettikuvat.md.
 *
 *   node tools/pariteettikuvat.mjs [--url https://matkakirja.app/ | paikallinen | http://localhost:8080/]
 *     [--nakymat kartta,passi,...] [--koot 393x852,834x1194] [--ulos kansio]
 *     [--kaupunki marseille] [--siemen 5] [--dpr-iphone 3]
 *     [--gpu metal|ohjelma] [--uusinta 1] [--lista]
 *
 * Jokainen kuva otetaan TUOREESSA selainkontekstissa: tallenne (siemen +
 * kaupunki) istutetaan localStorageen, sivu avataan `?lauta=pallo&koe=suoraan`
 * (ei päivitysikkunaa, traileria, luentaa eikä kirjoituskonetta) ja
 * `reducedMotion: 'reduce'` (UI:n typeText kirjoittaa tekstin kerralla).
 * Näkymä avataan pelin omilla metodeilla (window.matkakirja.ui), ja kuva
 * otetaan, kun pallon laatat ovat perillä ja näkymän kuvat ladattu.
 * Virhe yhdessä näkymässä ei kaada muita; lopuksi yhteenveto.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync, rmSync, renameSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NAKYMAT } from './pariteettikuvat-nakymat.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Argumentit ────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  if (i < 0) return oletus;
  const v = argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
};
if (arg('lista')) {
  for (const n of NAKYMAT) console.log(`${n.nimi.padEnd(24)} ${n.kuvaus}`);
  process.exit(0);
}
const pvm = new Date().toISOString().slice(0, 10);
const URL_ARG = String(arg('url', 'https://matkakirja.app/'));
const ULOS = String(arg('ulos', `/Users/Shared/Claude/proto-3d/lokit/pariteetti-web-${pvm}`));
const KAUPUNKI = String(arg('kaupunki', 'marseille'));
const SIEMEN = Number(arg('siemen', 5));
const DPR_IPHONE = Number(arg('dpr-iphone', 3));
const GPU = String(arg('gpu', 'metal'));
const UUSINTOJA = Math.max(0, Number(arg('uusinta', 1)));
const KOOT = String(arg('koot', '393x852,834x1194')).split(',').map((k) => {
  const [w, h] = k.split('x').map(Number);
  // Kapea = iPhone (dpr 3 tai --dpr-iphone), leveä = iPad 11" (dpr 2).
  return { nimi: `${w}x${h}`, w, h, dpr: w < 600 ? DPR_IPHONE : 2, mobiili: w < 600 };
});
const valitut = arg('nakymat') ? String(arg('nakymat')).split(',').map((s) => s.trim()) : null;
const ajettavat = valitut ? NAKYMAT.filter((n) => valitut.includes(n.nimi)) : NAKYMAT;
if (valitut) {
  const tuntemattomat = valitut.filter((v) => !NAKYMAT.some((n) => n.nimi === v));
  if (tuntemattomat.length) { console.error(`Tuntematon näkymä: ${tuntemattomat.join(', ')} (--lista)`); process.exit(2); }
}
mkdirSync(ULOS, { recursive: true });

// ── Playwright: repon node_modules, PLAYWRIGHT_JS tai Macin tunnetut polut ──
async function lataaPlaywright() {
  const lahteet = ['playwright', process.env.PLAYWRIGHT_JS,
    '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js',
    '/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js',
    '/opt/node22/lib/node_modules/playwright/index.js'].filter(Boolean);
  for (const l of lahteet) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const m = await import(l);
      const c = m.chromium ?? m.default?.chromium;
      if (c) return c;
    } catch { /* seuraava */ }
  }
  throw new Error('Playwrightia ei löytynyt (aseta PLAYWRIGHT_JS)');
}

// ── Palvelin: tuotanto, annettu osoite tai oma staattinen palvelin ────
let palvelin = null;
let OSOITE = URL_ARG;
if (URL_ARG === 'paikallinen') {
  const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json' };
  palvelin = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const polku = join(JUURI, p === '/' ? 'index.html' : p);
    if (!polku.startsWith(JUURI) || !existsSync(polku) || statSync(polku).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
    res.end(readFileSync(polku));
  });
  await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
  OSOITE = `http://127.0.0.1:${palvelin.address().port}/`;
}
if (!OSOITE.endsWith('/')) OSOITE += '/';

/*
 * NODEN VÄLIMUISTI KAIKILLE PELIN PYYNNÖILLE. Jokainen kuva otetaan
 * tuoreessa kontekstissa ilman service workeria, jolloin selain hakisi
 * satoja ES-moduuleja ja laattoja joka kerta uudestaan — tuotanto vastasi
 * tähän 429 Too Many Requests, ja peli jäi käynnistymättä. Sama tiedosto
 * haetaan siksi kerran per ajo Noden kautta ja tarjoillaan muistista.
 * Samalla ratkeaa ämpärin (media.matkakirja.app) CORS paikallisesta
 * originista: vastaus saa `access-control-allow-origin: *` -otsakkeen.
 */
const VALIMUISTI = new Map();
const HAKUTILASTO = { haettu: 0, rajoitettu: 0, epaonnistui: 0 };
const odota = (ms) => new Promise((ok) => { setTimeout(ok, ms); });
async function haeKerran(url) {
  for (let yritys = 0; yritys < 6; yritys += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const v = await fetch(url);
      if (v.status === 429) HAKUTILASTO.rajoitettu += 1;
      if (v.status === 429 || v.status >= 500) { await odota(1000 * 2 ** yritys); continue; } // eslint-disable-line no-await-in-loop
      HAKUTILASTO.haettu += 1;
      // eslint-disable-next-line no-await-in-loop
      return { status: v.status, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') };
    } catch {
      await odota(500 * 2 ** yritys); // eslint-disable-line no-await-in-loop
    }
  }
  HAKUTILASTO.epaonnistui += 1;
  return null;
}
const valimuistista = (url) => {
  if (!VALIMUISTI.has(url)) {
    const lupaus = haeKerran(url);
    VALIMUISTI.set(url, lupaus);
    // Epäonnistunutta ei jätetä muistiin: seuraava kuva yrittää uudestaan.
    lupaus.then((v) => { if (!v || v.status >= 400) VALIMUISTI.delete(url); });
  }
  return VALIMUISTI.get(url);
};
const PELIN_ISANTA = new URL(OSOITE).host;
const valimuistiin = (url) => url.host === PELIN_ISANTA || /(^|\.)media\.matkakirja\.app$|r2\.dev$/.test(url.host);

// ── Tallenne: deterministinen peli (siemen + kaupunki, toimintavaihe) ──
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
function tallenne() {
  const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }], pack: packById('maailmankartta'), seed: SIEMEN });
  peli.phase = 'action';
  peli.tokens?.delete?.(KAUPUNKI);
  return JSON.stringify(peli.toJSON());
}
const TALLENNE = tallenne();

// ── Selain ────────────────────────────────────────────────────────────
const chromium = await lataaPlaywright();
const LIPUT = GPU === 'metal'
  ? ['--use-angle=metal', '--ignore-gpu-blocklist', '--enable-gpu']
  : ['--use-gl=angle', '--use-angle=swiftshader'];
LIPUT.push('--disable-features=HardwareMediaKeyHandling,MediaSessionService', '--autoplay-policy=no-user-gesture-required', '--mute-audio');
/*
 * YKSI SELAIN, NÄKYMÄT PERÄKKÄIN, SULKU AINA (Fable 24.9.2026: Macin muisti
 * loppui, kun CI:n savukkeet ja kymmenet Chrome for Testing -prosessit
 * ajoivat yhtä aikaa). Rinnakkaisuutta ei ole; jokaisen kuvan sivu ja
 * konteksti suljetaan finallyssa, ja selain suljetaan myös virheessä,
 * Ctrl-C:ssä (SIGINT), SIGTERMissä ja SIGHUPissa.
 */
const selain = await chromium.launch({ args: LIPUT, executablePath: process.env.CHROMIUM || undefined });
let suljettu = false;
async function suljeKaikki() {
  if (suljettu) return;
  suljettu = true;
  await selain.close().catch(() => {});
  palvelin?.close();
}
for (const signaali of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.once(signaali, () => {
    console.log(`\n${signaali}: suljetaan selain`);
    suljeKaikki().finally(() => process.exit(130));
  });
}
process.once('uncaughtException', (e) => {
  console.error(e);
  suljeKaikki().finally(() => process.exit(1));
});
process.once('unhandledRejection', (e) => {
  console.error(e);
  suljeKaikki().finally(() => process.exit(1));
});

/** Pallo valmis: lepokerroksen näkyvät laatat täysin scenessä, fontit ladattu. */
async function odotaPallo(sivu, kattoMs = 25000) {
  return sivu.waitForFunction(() => {
    const ui = window.matkakirja?.ui;
    const lauta = ui?.pallolauta;
    if (!lauta) return false;
    if (document.fonts?.status !== 'loaded') return false;
    const m = lauta.lepokerros?.()?.mittarit?.();
    if (!m) return false;
    const valmis = m.nakyvia > 0 && m.nakyviaTaysin >= m.nakyvia && !m.jumissa;
    window.__pariteettiValmis = valmis ? (window.__pariteettiValmis ?? 0) + 1 : 0;
    return window.__pariteettiValmis >= 3;
  }, null, { timeout: kattoMs, polling: 150 }).then(() => true).catch(() => false);
}

/** Näkymän kuvat ladattu (tai katto): kaikki näkyvät <img> complete. */
async function odotaKuvat(sivu, kattoMs = 8000) {
  return sivu.waitForFunction(() => [...document.images].every((k) => {
    const b = k.getBoundingClientRect();
    const nakyva = b.width > 0 && b.height > 0 && b.bottom > 0 && b.top < innerHeight;
    return !nakyva || k.complete || k.loading === 'lazy';
  }), null, { timeout: kattoMs, polling: 150 }).then(() => true).catch(() => false);
}

/*
 * NÄKYVYYSTARKISTIN SIVULLE (window.__pariteetti.nakyy). Palauttaa null,
 * kun jokin valitsimen elementeistä oikeasti näkyy ruudulla, muuten syyn.
 * "Näkyy" = laatikosta vähintään 24 × 24 px ruudun sisällä, ei
 * display:none eikä visibility:hidden, kertynyt opacity ≥ 0,9 ja
 * elementFromPoint osuu elementtiin (tai sen lapseen) vähintään kahdessa
 * viidestä näytepisteestä. pointer-events:none-elementiltä osumaa ei vaadita.
 */
const NAKYVYYSTARKISTIN = () => {
  const syyYhdelle = (el) => {
    const b = el.getBoundingClientRect();
    const x0 = Math.max(0, b.left); const y0 = Math.max(0, b.top);
    const x1 = Math.min(innerWidth, b.right); const y1 = Math.min(innerHeight, b.bottom);
    if (x1 - x0 < 24 || y1 - y0 < 24) return `ruudulla vain ${Math.round(Math.max(0, x1 - x0))}×${Math.round(Math.max(0, y1 - y0))} px`;
    let opasiteetti = 1;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none') return 'display:none';
      if (e.hidden) return 'hidden';
      opasiteetti *= Number(cs.opacity);
    }
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden') return 'visibility:hidden';
    // 0,9: häivytys kesken (esim. linssin avauskortti puoliksi näkyvissä) ei kelpaa.
    if (opasiteetti < 0.9) return `läpinäkyvä tai häivytys kesken (opacity ${opasiteetti.toFixed(2)})`;
    if (cs.pointerEvents === 'none') return null;
    const pisteet = [[0.5, 0.5], [0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]
      .map(([fx, fy]) => [x0 + (x1 - x0) * fx, y0 + (y1 - y0) * fy]);
    let osumia = 0; let peittaja = '';
    for (const [x, y] of pisteet) {
      const osuma = document.elementFromPoint(x, y);
      if (osuma && (osuma === el || el.contains(osuma))) osumia += 1;
      else if (osuma && !peittaja) peittaja = `${osuma.tagName.toLowerCase()}.${String(osuma.className).split(' ')[0]}`;
    }
    return osumia >= 2 ? null : `peitossa (osumia ${osumia}/5, päällä ${peittaja || '–'})`;
  };
  window.__pariteetti = {
    nakyy(valitsin) {
      const kaikki = [...document.querySelectorAll(valitsin)];
      if (!kaikki.length) return `${valitsin}: ei DOMissa`;
      let syy = null;
      for (const el of kaikki) {
        syy = syyYhdelle(el);
        if (!syy) return null;
      }
      return `${valitsin}: ${syy}${kaikki.length > 1 ? ` (${kaikki.length} ehdokasta)` : ''}`;
    },
  };
};

/** Näkymän todennus sivulla: kaikki nakyy-valitsimet ja ehto(p). null = ok. */
async function todenna(sivu, nakyma, p) {
  return sivu.evaluate(async ([valitsimet, ehtoLahde, param]) => {
    for (const v of valitsimet) {
      const syy = window.__pariteetti.nakyy(v);
      if (syy) return syy;
    }
    if (ehtoLahde) {
      // eslint-disable-next-line no-new-func
      const ehto = new Function(`return (${ehtoLahde});`)();
      const syy = await ehto(param);
      if (syy) return syy;
    }
    return null;
  }, [nakyma.nakyy ?? [], nakyma.ehto ? String(nakyma.ehto) : null, p]).catch((e) => `todennus kaatui: ${String(e.message).split('\n')[0]}`);
}

/** Odottaa todennusta enintään kattoMs; palauttaa viimeisen syyn tai null. */
async function odotaTodennus(sivu, nakyma, p, kattoMs = 12000) {
  const alku = Date.now();
  // Kaksi perättäistä hyväksyntää 400 ms:n välein: ohimenevä tila (häivytys,
  // sulkeutuva kortti) ei kelpaa kuvaksi.
  let perakkain = 0;
  let syy = null;
  while (Date.now() - alku < kattoMs) {
    // eslint-disable-next-line no-await-in-loop
    syy = await todenna(sivu, nakyma, p);
    perakkain = syy ? 0 : perakkain + 1;
    if (perakkain >= 2) return null;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((ok) => { setTimeout(ok, syy ? 200 : 400); });
  }
  return syy ?? 'todennus ei vakiintunut';
}

async function kuvaaYksi(nakyma, koko) {
  const alku = Date.now();
  let ctx = null;
  const luoKonteksti = () => selain.newContext({
    viewport: { width: koko.w, height: koko.h }, deviceScaleFactor: koko.dpr,
    isMobile: koko.mobiili, hasTouch: true, reducedMotion: 'reduce', serviceWorkers: 'block',
    locale: 'fi-FI', timezoneId: 'Europe/Helsinki',
  });
  const virheet = [];
  const vaiheet = {};
  const merkitse = (nimi) => { vaiheet[nimi] = +((Date.now() - alku) / 1000).toFixed(1); };
  try {
    ctx = await luoKonteksti();
    await ctx.addInitScript(([d, lisat]) => {
      if (sessionStorage.getItem('pariteetti-alustettu')) return;
      sessionStorage.setItem('pariteetti-alustettu', '1');
      if (d) localStorage.setItem('matkakirja-save-v1', d);
      for (const [k, v] of Object.entries(lisat)) {
        if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
      }
    }, [nakyma.tallenne === false ? null : TALLENNE, nakyma.localStorage ?? {}]);
    await ctx.addInitScript(NAKYVYYSTARKISTIN);
    const sivu = await ctx.newPage();
    sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
    const konsoli = [];
    sivu.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') konsoli.push(m.text().slice(0, 160)); });
    // Vireillä olevat pyynnöt diagnostiikkaan (jumittunut lataus näkyy virheessä).
    const vireilla = new Map();
    sivu.on('request', (r) => vireilla.set(r, Date.now()));
    sivu.on('requestfinished', (r) => vireilla.delete(r));
    sivu.on('requestfailed', (r) => vireilla.delete(r));
    await sivu.route((url) => valimuistiin(url), async (r) => {
      if (r.request().method() !== 'GET') { await r.continue(); return; }
      const v = await valimuistista(r.request().url());
      if (!v) { await r.abort(); return; }
      await r.fulfill({
        status: v.status, body: v.body, contentType: v.tyyppi ?? undefined,
        headers: { 'access-control-allow-origin': '*', ...(v.tyyppi ? { 'content-type': v.tyyppi } : {}) },
      });
    });
    const haku = nakyma.haku ?? '?lauta=pallo&koe=suoraan';
    await sivu.goto(`${OSOITE}${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    merkitse('dom');
    const kaynnissa = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 45000 })
      .then(() => true).catch(() => false);
    if (!kaynnissa) {
      const tila = await sivu.evaluate(() => `${document.readyState}, matkakirja=${Object.keys(window.matkakirja ?? {}).join('+') || '-'}, body=${document.body?.className}`).catch(() => '?');
      await sivu.screenshot({ path: join(ULOS, `${nakyma.nimi}-${koko.nimi}-VIRHE.png`) }).catch(() => {});
      console.log(`  konsoli (${nakyma.nimi}): ${konsoli.slice(-6).join(' | ')}`);
      const jumissa = [...vireilla.entries()].sort((a, b) => a[1] - b[1]).slice(0, 3)
        .map(([r, t]) => `${r.url().slice(0, 90)} (${Math.round((Date.now() - t) / 1000)} s)`);
      throw new Error(`peli ei käynnistynyt 45 s:ssa (readyState ${tila}; vireillä ${vireilla.size}: ${jumissa.join(', ')}${virheet.length ? `; sivuvirhe: ${virheet[0]}` : ''})`);
    }
    let pallo = null;
    merkitse('peli');
    if (nakyma.pallo !== false) pallo = await odotaPallo(sivu);
    merkitse('pallo');
    const p = { kaupunki: KAUPUNKI, ...(nakyma.parametri ?? {}) };
    let tulos = null;
    if (nakyma.avaa) {
      tulos = await sivu.evaluate(nakyma.avaa, p);
      if (tulos && tulos.virhe) throw new Error(`avaus: ${tulos.virhe}`);
    }
    if (nakyma.odota) {
      await sivu.waitForSelector(nakyma.odota, { state: 'visible', timeout: 20000 });
    }
    if (nakyma.jalkeen) {
      const j = await sivu.evaluate(nakyma.jalkeen, p);
      if (j && j.virhe) throw new Error(`jälkeen: ${j.virhe}`);
      if (j) tulos = { ...(tulos ?? {}), ...j };
    }
    if (nakyma.odotaJalkeen) {
      await sivu.waitForSelector(nakyma.odotaJalkeen, { state: 'visible', timeout: 20000 });
    }
    if (nakyma.palloJalkeen) pallo = await odotaPallo(sivu, 15000);
    merkitse('nakyma');
    let kuvat = await odotaKuvat(sivu);
    merkitse('kuvat');
    // Vieritys vasta kuvien jälkeen: latautuva kuva siirtäisi kohdetta.
    if (nakyma.viimeinen) {
      await sivu.evaluate(nakyma.viimeinen, p);
      kuvat = (await odotaKuvat(sivu)) && kuvat;
    }
    // Viimeinen asettuminen: päättyvät CSS-animaatiot ja -siirtymät loppuun
    // (katto 5 s; päättymättömät kuten sykkeet ohitetaan), sitten kaksi
    // piirtokehystä. reducedMotion ei pysäytä kaikkia CSS-häivytyksiä.
    await sivu.evaluate(async () => {
      const kesken = () => document.getAnimations().filter((a) => a.playState === 'running'
        && Number.isFinite(a.effect?.getComputedTiming?.().endTime ?? Infinity));
      const katto = new Promise((ok) => { setTimeout(ok, 5000); });
      for (let kierros = 0; kierros < 3 && kesken().length; kierros += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.race([Promise.allSettled(kesken().map((a) => a.finished)), katto]);
      }
      await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
    });
    merkitse('asettui');
    // TODENNUS ennen kuvaa (odottaa enintään 12 s) ja heti kuvan jälkeen:
    // näkymä ei saa sulkeutua kesken kuvan eikä kuva saa olla pelkkä kartta.
    let syy = await odotaTodennus(sivu, nakyma, p);
    if (!syy && nakyma.pallo !== false && pallo === false) syy = 'pallon laatat eivät valmistuneet 25 s:ssa';
    merkitse('todennettu');
    const polku = join(ULOS, `${nakyma.nimi}-${koko.nimi}.png`);
    const virhepolku = join(ULOS, `${nakyma.nimi}-${koko.nimi}-VIRHE.png`);
    rmSync(polku, { force: true });
    rmSync(virhepolku, { force: true });
    await sivu.screenshot({ path: syy ? virhepolku : polku });
    if (!syy) {
      const jalkeen = await todenna(sivu, nakyma, p);
      if (jalkeen) {
        syy = `sulkeutui kuvan aikana: ${jalkeen}`;
        renameSync(polku, virhepolku);
      }
    }
    if (syy) {
      return { nakyma: nakyma.nimi, koko: koko.nimi, ok: false, ms: Date.now() - alku, virhe: `todennus: ${syy}`, polku: virhepolku, pallo, kuvat, virheet, tulos, vaiheet };
    }
    return { nakyma: nakyma.nimi, koko: koko.nimi, ok: true, ms: Date.now() - alku, polku, pallo, kuvat, virheet, tulos, vaiheet };
  } catch (e) {
    return { nakyma: nakyma.nimi, koko: koko.nimi, ok: false, ms: Date.now() - alku, virhe: String(e.message ?? e).split('\n')[0], virheet, vaiheet };
  } finally {
    await ctx?.close().catch(() => {});
  }
}

// ── Ajo ───────────────────────────────────────────────────────────────
const tyot = [];
for (const n of ajettavat) for (const k of KOOT) tyot.push([n, k]);
console.log(`Pariteettikuvat: ${ajettavat.length} näkymää × ${KOOT.length} kokoa = ${tyot.length} kuvaa`);
console.log(`  osoite ${OSOITE}  kaupunki ${KAUPUNKI}  siemen ${SIEMEN}  gpu ${GPU}  ulos ${ULOS}`);
const alkuKaikki = Date.now();
const tulokset = [];
try {
  for (const [n, k] of tyot) {
    if (suljettu) break; // signaali: ei uusia kuvia
    // eslint-disable-next-line no-await-in-loop
    let t = await kuvaaYksi(n, k);
    // Uusinta: tuotannon verkko tai GPU-prosessi voi hetkellisesti jumittaa latauksen.
    for (let u = 0; !t.ok && !suljettu && u < UUSINTOJA; u += 1) {
      // eslint-disable-next-line no-await-in-loop
      const uusi = await kuvaaYksi(n, k);
      t = { ...uusi, ms: t.ms + uusi.ms, uusinta: u + 1, ensinVirhe: t.virhe };
    }
    tulokset.push(t);
    const huom = t.ok
      ? `${t.uusinta ? ` (uusinnalla; ensin: ${t.ensinVirhe})` : ''}${t.pallo === false ? ' (pallo ei valmis katossa)' : ''}${t.kuvat === false ? ' (kuvia kesken)' : ''}${t.virheet.length ? ` sivuvirheitä ${t.virheet.length}` : ''}`
      : ` — ${t.virhe}`;
    const tieto = t.tulos && typeof t.tulos === 'object' ? ` ${JSON.stringify(t.tulos)}` : '';
    console.log(`${t.ok ? 'OK   ' : 'VIRHE'} ${t.nakyma.padEnd(24)} ${t.koko.padEnd(9)} ${(t.ms / 1000).toFixed(1).padStart(5)} s${huom}${tieto}`);
  }
} finally {
  await suljeKaikki();
}
const ok = tulokset.filter((t) => t.ok).length;
const kesto = (Date.now() - alkuKaikki) / 1000;
console.log(`\nYHTEENVETO: ${ok}/${tulokset.length} ok, ${tulokset.length - ok} virhettä, kokonaisaika ${kesto.toFixed(0)} s, `
  + `keskimäärin ${(tulokset.reduce((s, t) => s + t.ms, 0) / Math.max(1, tulokset.length) / 1000).toFixed(1)} s/kuva`);
console.log(`Verkko: ${HAKUTILASTO.haettu} tiedostoa haettu kerran (Noden välimuisti), 429-vastauksia ${HAKUTILASTO.rajoitettu}, epäonnistui ${HAKUTILASTO.epaonnistui}`);
for (const t of tulokset.filter((x) => !x.ok)) console.log(`  VIRHE ${t.nakyma} ${t.koko}: ${t.virhe}`);
writeFileSync(join(ULOS, 'yhteenveto.json'), JSON.stringify({
  osoite: OSOITE, kaupunki: KAUPUNKI, siemen: SIEMEN, gpu: GPU, pvm, kestoS: kesto,
  tulokset,
}, null, 2));
console.log(`Kuvat: ${ULOS}`);
process.exit(ok === tulokset.length ? 0 : 1);
