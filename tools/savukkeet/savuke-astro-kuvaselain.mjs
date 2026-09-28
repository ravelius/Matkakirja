#!/usr/bin/env node
/*
 * SELAINSAVUKE: ASTRONAUTIN KAMERAN KUVASELAIN (omistaja 27.9.2026 klo
 * 23.5x Fablen kautta; Linssisepän suositus docs/raportit/
 * astronautin-kuvaselain-20260928.md, natiivi c5b073cd).
 *
 *   PLAYWRIGHT_JS=…/node_modules/playwright/index.js \
 *     node tools/savukkeet/savuke-astro-kuvaselain.mjs [--juuri <checkout>] [--kuvat <kansio>]
 *
 * WebKit, pariteettiruudut iPhone 393 × 852 ja iPad 834 × 1194 (DPR 2).
 * Ajetaan ENNEN (origin/main, --juuri) ja JÄLKEEN: ennen-versiossa
 * kuvaselainta ei ole, joten sen mittarit tulostuvat '–' ja vain kuvat
 * otetaan (kuvapari Etna ja Istanbul, sama tila molemmissa).
 *
 * VÄITTEET (jälkeen):
 *   1. Tausta on läpikuultava (alfa 0,7), ja kamera liukuu kohteen ylle
 *      (pallon keskipiste ≤ 1,5° kohteesta 1,5 s:n päästä).
 *   2. ‹ › ovat alhaalla keskellä (keskipiste ±4 px ruudun keskeltä,
 *      alareuna ≤ 16 px + turva-alue) eivätkä leikkaa pikkukuvia tai
 *      minipulua.
 *   3. Reunan napautus oikealle: Etnan 2. kuva, uusi napautus: seuraava
 *      kohde kierroksella (SATELLIITTI_KIERROS) ensimmäisellä kuvallaan,
 *      ja nimi kirkastuu (satelliitti-selite-uusi).
 *   4. Pyyhkäisy vasemmalle vie seuraavaan, oikealle takaisin.
 *   5. ‹ vie edelliseen kohteeseen (oletuskuva), › seuraavaan.
 *   6. Keskiosan napautus ei selaa (vastakoe reunalle).
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
const ULOS = valitsin('kuvat', '/tmp/matkakirja-kaappaukset/astro-kuvaselain');
mkdirSync(ULOS, { recursive: true });
const JALKEEN = readFileSync(join(JUURI, 'js/linssit/satelliitti.js'), 'utf8').includes('satelliitti-kohdenappi');
const VERSIO = JALKEEN ? 'jalkeen' : 'ennen';
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
const PORTTI = Number(process.env.PORTTI) || 8761;
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
  // Paljastus ja avausajo loppuun, sitten ote palloon (päättää ISS-seurannan kuten pelaajalla).
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.paljastus?.vaihe === 'paljastettu',
    null, { timeout: 20000 },
  ).catch(() => {});
  await s.evaluate(() => {
    const kotelo = window.matkakirja.ui.pallolauta?.kotelo ?? document.querySelector('.pallo-kotelo, .pallo-kuori');
    for (const laji of ['pointerdown', 'pointerup']) {
      kotelo?.dispatchEvent(new PointerEvent(laji, { bubbles: true, cancelable: true, clientX: 1, clientY: 1 }));
    }
  });
  await s.waitForTimeout(1200);
}

/** Näkymän tila: kohde, kuva, tausta, napit, kamera. */
const tila = (s) => s.evaluate(() => {
  const k = document.querySelector('.satelliitti-katselu');
  const r = (el) => (el ? el.getBoundingClientRect() : null);
  const napit = document.querySelector('.satelliitti-kohteet');
  const pov = window.matkakirja.ui.pallonInstanssi?.pointOfView?.() ?? null;
  const laatikko = (el) => { const b = r(el); return b ? [b.left, b.top, b.right, b.bottom].map(Math.round) : null; };
  return {
    auki: Boolean(k),
    nimi: document.querySelector('.satelliitti-selite-otsikko')?.firstChild?.textContent ?? null,
    kuva: document.querySelector('.satelliitti-kuva')?.getAttribute('src')?.split('/').pop() ?? null,
    tausta: k ? getComputedStyle(k).backgroundColor : null,
    sumu: [...document.querySelectorAll('.astro-sumu')].map((e) => getComputedStyle(e).visibility).join(',') || null,
    selite: (() => {
      const e = document.querySelector('.satelliitti-selite');
      const o = document.querySelector('.satelliitti-selite-otsikko');
      if (!e || !o) return null;
      return { leveys: Math.round(e.getBoundingClientRect().width), otsikko: Math.round(o.scrollWidth), kiinni: e.classList.contains('satelliitti-selite-kiinni') };
    })(),
    uusi: document.querySelector('.satelliitti-selite')?.classList.contains('satelliitti-selite-uusi') ?? false,
    napit: napit && !napit.hidden ? laatikko(napit) : null,
    nauha: laatikko(document.querySelector('.satelliitti-nauha:not([hidden])')),
    pulu: laatikko(document.querySelector('.satelliitti-pulunappi')),
    pov: pov ? { lat: +pov.lat.toFixed(2), lng: +pov.lng.toFixed(2), alt: +pov.altitude.toFixed(2) } : null,
    leveys: innerWidth,
    korkeus: innerHeight,
  };
});

const leikkaa = (a, b) => a && b && a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

async function ajaNakyma(nimi) {
  const virheet = [];
  const konteksti = await selain.newContext({ ...NAKYMAT[nimi], serviceWorkers: 'block' });
  const s = await konteksti.newPage();
  const luennat = [];
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => {
    // Selitteen luentapyyntö (lohko astro-selite) kirjataan; verkko pysyy poikki.
    const runko = route.request().postData() ?? '';
    if (runko.includes('astro-selite')) luennat.push(runko.slice(0, 200));
    route.abort();
  });
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  s.on('pageerror', (e) => virheet.push(String(e)));
  const kuva = (vaihe) => s.screenshot({ path: join(ULOS, `astro-kuvaselain-${VERSIO}-${nimi}-${vaihe}.png`), timeout: 90000 })
    .catch((e) => console.log(`    (kaappaus ${vaihe}: ${e.message.split('\n')[0]})`));
  const n = (t) => `${t} (${nimi}, ${VERSIO})`;

  await avaaPeli(s);
  const data = await s.evaluate(async () => {
    const m = await import('/js/linssit/satelliitti-data.js');
    return { kohteet: m.SATELLIITTI_KOHTEET.map((k) => ({ t: k.tunnus, nimi: k.nimi, lat: k.lat, lon: k.lon, n: k.havainnot.length })), kierros: m.SATELLIITTI_KIERROS ?? null };
  });
  const kohde = (t) => data.kohteet.find((k) => k.t === t);
  const naapuri = (t, suunta) => {
    const i = data.kierros.indexOf(t);
    return data.kierros[(i + suunta + data.kierros.length) % data.kierros.length];
  };
  const avaa = async (t) => {
    await s.evaluate((tt) => window.matkakirja.ui.pallolinssi?.kahva?.avaaKohde?.(tt), t);
    await s.waitForTimeout(1800);
  };

  /* --- Etna: kuvapari + perusväitteet ------------------------------ */
  await avaa('etna');
  const etna = await tila(s);
  await kuva('etna');
  if (!JALKEEN) {
    await avaa('istanbul');
    await kuva('istanbul');
    console.log(`    ennen: tausta ${etna.tausta}, napit – , kamera ${JSON.stringify(etna.pov)}`);
    vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
    await konteksti.close();
    return;
  }
  vaadi(n('tausta läpikuultava 0,7'), /rgba\(4, 9, 7, 0\.7/.test(etna.tausta ?? ''), etna.tausta);
  if (JALKEEN && etna.selite?.kiinni) {
    vaadi(n('pienennetty selite on otsikkorivin kokoinen'), etna.selite.leveys <= etna.selite.otsikko + 32,
      JSON.stringify(etna.selite));
  }
  vaadi(n('selite luetaan ääneen (lohko astro-selite)'), luennat.length > 0, `${luennat.length} pyyntöä ${luennat[0] ?? ''}`);
  vaadi(n('avaruussumu piilossa kuvan ajan'), etna.sumu === null || !etna.sumu.includes('visible'), etna.sumu);
  const e = kohde('etna');
  vaadi(n('kamera kohteen yllä'), etna.pov && Math.abs(etna.pov.lat - e.lat) < 1.5 && Math.abs(etna.pov.lng - e.lon) < 1.5,
    JSON.stringify(etna.pov));
  const keski = etna.napit ? (etna.napit[0] + etna.napit[2]) / 2 : null;
  vaadi(n('‹ › alhaalla keskellä, ei päällekkäin pikkukuvien eikä pulun kanssa'),
    etna.napit && Math.abs(keski - etna.leveys / 2) <= 4 && etna.korkeus - etna.napit[3] <= 16 + 34
      && !leikkaa(etna.napit, etna.nauha) && !leikkaa(etna.napit, etna.pulu),
    JSON.stringify({ napit: etna.napit, nauha: etna.nauha, pulu: etna.pulu }));

  const { leveys: W, korkeus: H } = etna;
  const napauta = async (x) => { await s.mouse.click(x, H * 0.45); await s.waitForTimeout(700); };
  // Vastakoe: keskiosan napautus ei selaa.
  await napauta(W / 2);
  const keskella = await tila(s);
  vaadi(n('keskiosan napautus ei selaa'), keskella.kuva === etna.kuva && keskella.nimi === etna.nimi, keskella.kuva);
  await s.waitForTimeout(400);
  await napauta(W * 0.92);
  const toinen = await tila(s);
  vaadi(n('reunan napautus: kohteen seuraava kuva'), toinen.nimi === etna.nimi && toinen.kuva !== etna.kuva,
    `${etna.kuva} → ${toinen.kuva}`);
  await napauta(W * 0.92);
  await s.waitForTimeout(300);
  const seuraava = await tila(s);
  const odotettu = kohde(naapuri('etna', 1));
  vaadi(n('kohteen lopussa galleria jatkuu seuraavaan kohteeseen ja nimi kirkastuu'),
    seuraava.nimi === odotettu.nimi && seuraava.uusi, `${seuraava.nimi} (odotettu ${odotettu.nimi}), uusi ${seuraava.uusi}`);
  await s.waitForTimeout(1300);
  await kuva('reuna-seuraava-kohde');

  // Pyyhkäisy takaisin (oikealle): Etnan viimeinen kuva.
  const pyyhkaise = async (mista, mihin) => {
    await s.mouse.move(mista, H * 0.45);
    await s.mouse.down();
    for (let i = 1; i <= 8; i += 1) {
      await s.mouse.move(mista + ((mihin - mista) * i) / 8, H * 0.45);
      await s.waitForTimeout(16);
    }
    await s.mouse.up();
    await s.waitForTimeout(800);
  };
  await pyyhkaise(W * 0.3, W * 0.8);
  const takaisin = await tila(s);
  vaadi(n('pyyhkäisy oikealle: edellisen kohteen viimeinen kuva'), takaisin.nimi === etna.nimi && takaisin.kuva === toinen.kuva,
    `${takaisin.nimi} ${takaisin.kuva}`);
  await pyyhkaise(W * 0.55, W * 0.45);
  const lyhyt = await tila(s);
  vaadi(n('lyhyt hidas veto palauttaa kuvan'), lyhyt.kuva === takaisin.kuva, lyhyt.kuva);

  // ‹ ja ›: viereiset kohteet oletuskuvaan.
  await s.click('.satelliitti-kohdenappi >> nth=0');
  await s.waitForTimeout(1800);
  const edellinen = await tila(s);
  const odEd = kohde(naapuri('etna', -1));
  vaadi(n('‹ vie edelliseen kohteeseen kartalla, kamera seuraa'),
    edellinen.nimi === odEd.nimi && Math.abs(edellinen.pov.lat - odEd.lat) < 1.5 && Math.abs(edellinen.pov.lng - odEd.lon) < 1.5,
    `${edellinen.nimi} ${JSON.stringify(edellinen.pov)}`);
  await s.click('.satelliitti-kohdenappi >> nth=1');
  await s.waitForTimeout(1800);
  const paluu = await tila(s);
  vaadi(n('› palaa samaa tietä'), paluu.nimi === etna.nimi, paluu.nimi);

  await avaa('istanbul');
  await kuva('istanbul');
  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
  await konteksti.close();
}

console.log(`Kuvaselain ${VERSIO} (${APP_VERSIO}), juuri ${JUURI}`);
for (const nimi of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : Object.keys(NAKYMAT))) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nimi);
}
await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
