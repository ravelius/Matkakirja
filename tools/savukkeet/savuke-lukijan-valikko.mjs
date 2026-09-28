#!/usr/bin/env node
/*
 * SELAINSAVUKE: LUKIJAN VALIKKO (omistaja 28.9.2026, Fablen tulkinta).
 *
 *   PLAYWRIGHT_JS=…/node_modules/playwright/index.js \
 *     node tools/savukkeet/savuke-lukijan-valikko.mjs [--juuri <checkout>] [--kuvat <kansio>]
 *
 * WebKit, iPhone 393 × 852 ja iPad 834 × 1194. Pallolauta, Olympian
 * kohdekortti (Lisää-näkymä) ja Lontoon lehti. Puhe on tynkä: workerin
 * vastaus on 4 s:n äänekäs sävel-WAV (hiljaisella soitin ohittaisi
 * kelauksen), joten savuke ei kuluta kiintiötä.
 *
 * VÄITTEET (jälkeen):
 *   1. Kortissa kaksi nappia: valikkonappi kaiuttimen vasemmalla samalla
 *      pystykeskellä (±2 px), ei säätöratasta eikä vanhaa paneelia.
 *   2. Valikko avautuu: kappaleita ≥ 2, kelausrivi (4 nappia: 2 vasemmalla,
 *      2 oikealla), nopeus ja ääni; kelaus harmaana ennen luentaa.
 *   3. Kappaleen napautus aloittaa luennan siitä (nykyinen = napautettu).
 *   4. Seuraava kappale / +10 s / −10 s liikuttavat nykyistä kappaletta.
 *   5. Ulos napautus sulkee; kaiutin keskeyttää ("Jatka kuuntelua").
 *   6. Lehden otsikkorivillä kaksi nappia (valikko kaiuttimen vieressä).
 *   7. Ulos napautus sulkee VAIN valikon: kortti jää auki eikä click
 *      läpäise (Fable 28.9.2026, omistajan natiivibugi).
 *   8. Latausrengas (omistaja 28.9.2026): hidas synteesi (tynkä 1,5 s) →
 *      .lataa näkyy vasta ~250 ms:n jälkeen ja poistuu kun ääni alkaa;
 *      nopea vastaus → rengasta ei näy lainkaan.
 * Ennen-versiossa (--juuri origin/main) otetaan vain kuvat (ratas auki).
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
const ULOS = valitsin('kuvat', '/tmp/matkakirja-kaappaukset/lukijan-valikko');
mkdirSync(ULOS, { recursive: true });
const JALKEEN = readFileSync(join(JUURI, 'js/lukija.js'), 'utf8').includes('lukija-valikkonappi');
const VERSIO = JALKEEN ? 'jalkeen' : 'ennen';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = createServer((req, res) => {
  const suht = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suht);
  if (!polku.startsWith(JUURI) || !existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(0, r));
const PORTTI = palvelin.address().port;

/** 4 s 440 Hz -sävel, 8 kHz mono 16-bit WAV (äänekäs: soitin ei ohita sitä hiljaisena). */
const savel = (() => {
  const n = 32000;
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8);
  b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i += 1) b.writeInt16LE(Math.round(9000 * Math.sin((2 * Math.PI * 440 * i) / 8000)), 44 + i * 2);
  return b;
})();

const VALIMUISTI = new Map();
const ulkohaku = (url) => {
  if (!VALIMUISTI.has(url)) {
    VALIMUISTI.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  }
  return VALIMUISTI.get(url);
};

const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const selain = await paketti.webkit.launch();
const NAKYMAT = {
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, hasTouch: true },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
};
const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push(ok);
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click());
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
    for (const el of document.querySelectorAll('.fokusvirta-isokuva-ruutu, .fokusvirta-isokuva-ohita')) el.style.display = 'none';
  });
  await s.waitForTimeout(800);
}

/** Valikon tila: nykyinen kappale, kelauksen käytettävyys, kaiuttimen nimi. */
const valikonTila = (s) => s.evaluate(() => {
  const v = document.querySelector('.lukija-valikko');
  const rivit = v ? [...v.querySelectorAll('.lukija-kappale')] : [];
  const nappi = document.querySelector('#arrival-dialog[open] .lukija-nappi') ?? document.querySelector('.lukija-otsikkorivi .lukija-nappi');
  return {
    auki: Boolean(v),
    kappaleita: rivit.filter((r) => !r.parentElement.hidden).length,
    nykyinen: rivit.findIndex((r) => r.classList.contains('nykyinen')),
    kelaus: v ? [...v.querySelectorAll('.lukija-kelaus-ryhma')].map((g) => g.querySelectorAll('.lukija-kelausnappi').length) : [],
    kelausKaytossa: v ? [...v.querySelectorAll('.lukija-kelausnappi')].every((b) => !b.disabled) : false,
    saadot: v ? Boolean(v.querySelector('select')) && Boolean(v.querySelector('input[type=range]')) : false,
    lukee: nappi?.classList.contains('lukee') ?? false,
    nimi: nappi?.getAttribute('aria-label') ?? null,
  };
});

let workerViive = 0;

async function ajaNakyma(nimi) {
  const virheet = [];
  workerViive = 0;
  const ctx = await selain.newContext({ ...NAKYMAT[nimi], serviceWorkers: 'block' });
  const s = await ctx.newPage();
  await s.route((u) => !/127\.0\.0\.1/.test(u.href), async (r) => {
    const url = r.request().url();
    if (/workers\.dev/.test(url)) {
      if (r.request().method() === 'OPTIONS') { r.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: '' }); return; }
      if (workerViive) await new Promise((ok) => setTimeout(ok, workerViive));
      r.fulfill({ status: 200, contentType: 'audio/wav', body: savel, headers: { 'access-control-allow-origin': '*' } }).catch(() => {});
      return;
    }
    if (/media\.matkakirja\.app|r2\.dev|wikimedia/.test(url)) {
      const v = await ulkohaku(url);
      if (v) { r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); return; }
    }
    r.abort();
  });
  s.on('pageerror', (e) => virheet.push(String(e)));
  const kuva = (vaihe) => s.screenshot({ path: join(ULOS, `lukijan-valikko-${VERSIO}-${nimi}-${vaihe}.png`) }).catch(() => {});
  const n = (t) => `${t} (${nimi}, ${VERSIO})`;
  await avaaPeli(s);

  /* --- Olympian kortti, Lisää-näkymä --------------------------------- */
  await s.evaluate(async () => {
    const { FOKUSKOHTEET_GRC } = await import('/js/packs/fokuskohteet-grc.js');
    const { avaaFokuskohde } = await import('/js/fokuskohteet.js');
    avaaFokuskohde(window.matkakirja.ui, FOKUSKOHTEET_GRC.find((x) => x.id === 'olympia'));
  });
  await s.waitForTimeout(3500);
  await s.evaluate(() => [...document.querySelectorAll('button')].find((b) => /^lisää$/i.test(b.textContent.trim()) && b.offsetParent)?.click());
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .fokusvirta-isokuva-ruutu, .fokusvirta-isokuva-ohita')) el.style.display = 'none';
  });
  if (!JALKEEN) {
    await s.evaluate(() => document.querySelector('.lukija-saadin')?.click());
    await s.waitForTimeout(500);
    await kuva('kortti-valikko');
    vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
    await ctx.close();
    return;
  }
  const rivi = await s.evaluate(() => {
    const k = document.querySelector('.lukija-otsikkorivi .lukija-nappi');
    const v = document.querySelector('.lukija-otsikkorivi .lukija-valikkonappi');
    const r = (e) => e?.getBoundingClientRect();
    const a = r(k); const b = r(v);
    return {
      kaiutin: Boolean(a?.width), valikko: Boolean(b?.width),
      vasemmalla: a && b ? b.right <= a.left + 2 : false,
      keskiero: a && b ? Math.abs((a.top + a.height / 2) - (b.top + b.height / 2)) : 99,
      ratas: document.querySelectorAll('.lukija-saadin').length,
      paneeli: document.querySelectorAll('.lukija-paneeli').length,
    };
  });
  vaadi(n('kortissa kaksi nappia: valikko kaiuttimen vasemmalla samalla korkeudella, ei ratasta'),
    rivi.kaiutin && rivi.valikko && rivi.vasemmalla && rivi.keskiero <= 1 && !rivi.ratas && !rivi.paneeli, JSON.stringify(rivi));

  await s.click('.lukija-otsikkorivi .lukija-valikkonappi');
  await s.waitForTimeout(400);
  const kortti = await valikonTila(s);
  const sisalla = await s.evaluate(() => {
    const v = document.querySelector('.lukija-valikko')?.getBoundingClientRect();
    const k = document.querySelector('.fokuskohde-popup')?.getBoundingClientRect();
    return v && k ? v.left >= k.left && v.right <= k.right : false;
  });
  vaadi(n('kortin valikko: kelausrivi 2 + 2, nopeus ja ääni, kokonaan kortin sisällä'),
    kortti.auki && kortti.kelaus.join() === '2,2' && kortti.saadot && !kortti.kelausKaytossa && sisalla, JSON.stringify({ ...kortti, sisalla }));
  await kuva('kortti-valikko');
  await s.mouse.click(20, NAKYMAT[nimi].viewport.height - 30);
  await s.waitForTimeout(400);
  vaadi(n('ulos napautus sulkee valikon'), !(await valikonTila(s)).auki);

  // 7. Napautus kortin tekstiin valikon ollessa auki: vain valikko sulkeutuu, click ei läpäise.
  await s.click('.lukija-otsikkorivi .lukija-valikkonappi');
  await s.waitForTimeout(400);
  const kohta = await s.evaluate(() => {
    window.__lapaisyt = 0;
    document.addEventListener('click', () => { window.__lapaisyt += 1; });
    const kortti = document.querySelector('.fokuskohde-popup');
    const valikko = document.querySelector('.lukija-valikko')?.getBoundingClientRect();
    const k = kortti?.getBoundingClientRect();
    if (!k || !valikko) return null;
    // Kortin sisältä valikon alapuolelta (tai vasemmalta), ei napista.
    const y = Math.min(k.bottom - 12, valikko.bottom + 24);
    return { x: k.left + 16, y };
  });
  if (kohta) await s.mouse.click(kohta.x, kohta.y);
  await s.waitForTimeout(500);
  const jalki = await s.evaluate(() => ({
    kortti: Boolean(document.querySelector('.fokuskohde-popup')?.getClientRects().length),
    lapaisyt: window.__lapaisyt,
  }));
  vaadi(n('napautus korttiin sulkee vain valikon: kortti auki, click ei läpäise'),
    Boolean(kohta) && !(await valikonTila(s)).auki && jalki.kortti && jalki.lapaisyt === 0, JSON.stringify({ kohta, ...jalki }));
  // Seuraava napautus toimii taas normaalisti (nielu ei jää päälle).
  await s.waitForTimeout(800);
  await s.mouse.click(kohta?.x ?? 30, kohta?.y ?? 300);
  await s.waitForTimeout(200);
  const perille = await s.evaluate(({ x, y }) => {
    const el = document.elementFromPoint(x, y);
    return { lapaisyt: window.__lapaisyt, kohde: el ? `${el.tagName}.${[...el.classList].join('.')}` : null };
  }, { x: kohta?.x ?? 30, y: kohta?.y ?? 300 });
  // Perille = click kuplii dokumenttiin TAI kortti reagoi (kuvan napautus avaa suurennoksen, joka pysäyttää clickin).
  vaadi(n('nielu päättyy: seuraava napautus menee perille'),
    perille.lapaisyt >= 1 || /fokuskohde-zoom-auki/.test(perille.kohde ?? ''), JSON.stringify(perille));
  await s.evaluate(() => document.querySelector('.fokuskohde-zoom-auki')?.click());
  await s.waitForTimeout(300);

  // 8b. Nopea vastaus: kortin luenta ilman viivettä ei näytä rengasta.
  const nopea = await s.evaluate(async () => {
    const k = document.querySelector('.lukija-otsikkorivi .lukija-nappi');
    k?.click();
    let nahty = false;
    for (let i = 0; i < 25; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((ok) => setTimeout(ok, 40));
      if (k?.classList.contains('lataa')) nahty = true;
    }
    const lukee = k?.classList.contains('lukee');
    k?.click(); // tauko
    return { nahty, lukee };
  });
  vaadi(n('nopea synteesi: latausrengasta ei välähdä'), nopea.lukee && !nopea.nahty, JSON.stringify(nopea));
  await s.evaluate(async () => { const m = await import('/js/lukija.js'); m.pysaytaLukija?.(); });

  /* --- Lontoon lehti -------------------------------------------------- */
  await s.evaluate(() => {
    document.querySelector('.fokuskohde-popup [aria-label*="Sulje"], .fokuskohde-sulje')?.click();
    window.matkakirja.game.tokens?.delete('lontoo');
    window.matkakirja.ui.openArrival(window.matkakirja.ui.game.board.cityById.get('lontoo'));
  });
  await s.waitForTimeout(2500);
  const lehti = await s.evaluate(() => {
    const d = document.getElementById('arrival-dialog');
    const k = d?.querySelector('.lukija-nappi');
    const v = d?.querySelector('.lukija-valikkonappi');
    const r = (e) => e?.getBoundingClientRect();
    const a = r(k); const b = r(v);
    return {
      auki: Boolean(d?.open), kaiutin: Boolean(a?.width), valikko: Boolean(b?.width) && !v.hidden,
      samaVanhempi: k?.parentElement === v?.parentElement,
      keskiero: a && b ? Math.round(Math.abs((a.top + a.height / 2) - (b.top + b.height / 2))) : 99,
    };
  });
  vaadi(n('lehden otsikkorivillä kaksi nappia'), lehti.auki && lehti.kaiutin && lehti.valikko && lehti.samaVanhempi && lehti.keskiero <= 1, JSON.stringify(lehti));
  await kuva('lehti');
  await s.click('#arrival-dialog .lukija-valikkonappi');
  await s.waitForTimeout(500);
  const alku = await valikonTila(s);
  vaadi(n('lehden valikko: kappaleet, kelausrivi, nopeus ja ääni; kelaus harmaana ennen luentaa'),
    alku.auki && alku.kappaleita >= 3 && alku.kelaus.join() === '2,2' && alku.saadot && !alku.kelausKaytossa, JSON.stringify(alku));
  await kuva('lehti-valikko');
  workerViive = 1500;
  await s.click('.lukija-valikko .lukija-kappale >> nth=1');
  const rengas = await s.evaluate(async () => {
    const k = document.querySelector('#arrival-dialog .lukija-nappi');
    const odota = (ms) => new Promise((ok) => setTimeout(ok, ms));
    await odota(120);
    const heti = k.classList.contains('lataa');
    await odota(500);
    const kohta = k.classList.contains('lataa');
    const ring = getComputedStyle(k.querySelector('.icon-glyph'), '::after');
    const tyyli = { opacity: ring.opacity, animaatio: ring.animationName };
    return { heti, kohta, tyyli };
  });
  await kuva('lehti-lataus');
  Object.assign(rengas, await s.evaluate(async () => {
    const k = document.querySelector('#arrival-dialog .lukija-nappi');
    let poistui = null;
    for (let i = 0; i < 60 && poistui == null; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((ok) => setTimeout(ok, 50));
      if (!k.classList.contains('lataa')) poistui = i * 50;
    }
    return { poistui, lukee: k.classList.contains('lukee') };
  }));
  vaadi(n('hidas synteesi: latausrengas vasta viiveen jälkeen, pois kun ääni alkaa'),
    !rengas.heti && rengas.kohta && rengas.poistui != null && rengas.lukee, JSON.stringify(rengas));
  workerViive = 0;
  await s.waitForTimeout(600);
  const hyppy = await valikonTila(s);
  vaadi(n('kappaleen napautus aloittaa luennan siitä'), hyppy.lukee && hyppy.nykyinen === 1 && hyppy.kelausKaytossa, JSON.stringify(hyppy));
  await s.click('.lukija-valikko .lukija-kelausnappi >> nth=3');
  await s.waitForTimeout(1200);
  const eteen = await valikonTila(s);
  vaadi(n('seuraava kappale'), eteen.nykyinen === 2, JSON.stringify(eteen));
  await s.click('.lukija-valikko .lukija-kelausnappi >> nth=1');
  await s.waitForTimeout(1200);
  const taakse = await valikonTila(s);
  vaadi(n('−10 s perääntyy edelliseen kappaleeseen (palat 4 s)'), taakse.nykyinen >= 0 && taakse.nykyinen < eteen.nykyinen, JSON.stringify(taakse));
  await s.click('.lukija-valikko .lukija-kelausnappi >> nth=2');
  await s.waitForTimeout(1200);
  const plus = await valikonTila(s);
  vaadi(n('+10 s etenee seuraavaan kappaleeseen'), plus.nykyinen > taakse.nykyinen, JSON.stringify(plus));
  await kuva('lehti-luenta');
  await s.mouse.click(20, NAKYMAT[nimi].viewport.height - 30);
  await s.waitForTimeout(400);
  // +10 s voi viedä viimeiseen kappaleeseen, ja 4 s:n tynkä ehtii loppua: tauko testataan vain kesken luennan.
  const kesken = (await valikonTila(s)).lukee;
  await s.evaluate(() => document.querySelector('#arrival-dialog .lukija-nappi')?.click());
  await s.waitForTimeout(400);
  const tauko = await valikonTila(s);
  vaadi(n('kaiutin keskeyttää luennan'), !kesken || tauko.nimi === 'Jatka kuuntelua', `${kesken ? '' : '(luenta ehti loppua) '}${tauko.nimi}`);
  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' / '));
  await ctx.close();
}

console.log(`Lukijan valikko ${VERSIO}, juuri ${JUURI}`);
for (const nimi of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : Object.keys(NAKYMAT))) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nimi);
}
await selain.close();
palvelin.close();
const hylatyt = tulokset.filter((x) => !x).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi. Kuvat: ${ULOS}`);
process.exit(hylatyt ? 1 : 0);
