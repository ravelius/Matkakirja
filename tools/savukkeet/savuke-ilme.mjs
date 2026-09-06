/*
 * SAVUKE: ILMEPAKETTI (js/ilme.js — Vivus + Rough.js + rough-notation;
 * omistajan päätös 5.9.2026, kartoituksen TOP 6 kohta 6).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ilme.mjs [kuvakansio]
 *
 * VÄITTEET (?lauta=kartta, iPhone 390×844):
 *
 *   A. KIRJASTOT ÄMPÄRISTÄ: kolme vendor/-pyyntöä, globaalit Vivus,
 *      rough ja RoughNotation syntyvät; ei CDN-pyyntöjä.
 *   B. PÖLLÖN KOROSTUS: lehtivinkin avainsana on rough-notation-
 *      elementti (svg.rough-annotation heti sanan perässä), ja
 *      sähkekortin kysymysrivi saa kynän alleviivauksen
 *      (.ilme-korostettu + svg.rough-annotation).
 *   C. REITTI PIIRTYY VIVUKSELLA: Liiku-vaiheessa kerros on tilassa
 *      data-musteviiva='piirtyy', kynä piirtää kopioon g.ilme-muste ja
 *      pelin omat polut odottavat näkymättöminä; perillä tila on
 *      'valmis', kopio on poissa, katkoviiva ja askelympyrät ennallaan.
 *   D. SELITE: levyllä on käsin piirretty kehys (svg.ilme-karhea).
 *   E. REDUCED MOTION: reitti on valmis heti ilman kopiota tai tilaa;
 *      korostus piirtyy ilman animaatiota.
 *   F. ILMAN KIRJASTOJA (vendor/ katkaistu): ei yhtään ilme-elementtiä,
 *      levy pitää CSS-reunansa, sähkeen lappu on ennallaan.
 *   G. LIPUT POIS (matkakirja-ilme-* = '0'): vendor/-pyyntöjä 0.
 *   H. DOM-solmujen määrä kirjastojen kanssa ei ylitä +5 % ilman niitä.
 *   I. Ei sivuvirheitä (poikkeuksia) yhdessäkään ajossa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta. Ilman ämpäriä ajetaan vain F ja G.
 *
 * Kaappaukset (jos kuvakansio annettu): ilme-vinkki.png, ilme-sahke.png,
 * ilme-reitti-kesken.png, ilme-reitti-valmis.png, ilme-selite.png.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
const VENDOR = ['vendor/vivus-0.4.6.min.js', 'vendor/rough-4.6.6.js', 'vendor/rough-notation-0.5.1.iife.js'];
const valimuisti = new Map();
async function ampariHaku(url) {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
      : { status: v.status })).catch(() => null));
  }
  return valimuisti.get(url);
}
const kirjastot = await Promise.all(VENDOR.map((v) => ampariHaku(AMPARI + v)));
const AMPARI_TOIMII = kirjastot.every((k) => k?.status === 200);
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — ajetaan vain kirjastottomat vartiot (F, G)');

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** Uusi sivu Sofiassa pelitilassa; ämpäri reititetty Noden kautta tai katkaistu. */
async function avaaSivu({ kirjastot: kirjastotMukana = true, reducedMotion = 'no-preference', liput = true }) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion, serviceWorkers: 'block',
  });
  await ctx.addInitScript((lipuilla) => {
    try {
      localStorage.setItem('matkakirja-kehittaja', '1');
      localStorage.removeItem('matkakirja-lauta');
      for (const lippu of ['musteviiva', 'karhea', 'korostus']) {
        if (lipuilla) localStorage.removeItem(`matkakirja-ilme-${lippu}`);
        else localStorage.setItem(`matkakirja-ilme-${lippu}`, '0');
      }
    } catch { /* yksityinen tila */ }
  }, liput);
  const sivu = await ctx.newPage();
  const tila = { vendor: [], cdn: [], virheet: [] };
  sivu.on('pageerror', (e) => tila.virheet.push(String(e.message ?? e)));
  sivu.on('request', (r) => {
    const url = r.url();
    if (url.includes('/vendor/')) tila.vendor.push(url);
    if (/jsdelivr|cdnjs|unpkg|esm\.sh/.test(url)) tila.cdn.push(url);
  });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const url = route.request().url();
    if (!kirjastotMukana && url.includes('/vendor/')) { route.abort(); return; }
    const v = await ampariHaku(url);
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body });
  });
  await sivu.goto(`${osoite}index.html?lauta=kartta`, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'sofia' };
    game.world.visited.add('sofia');
    game.phase = 'action';
    game.world.tokens.set('sofia', 'pieniAarre');
    ui.busy = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1500));
    window.matkakirjaPollo?.tyhjennaPino();
  });
  return { ctx, sivu, tila };
}

const kuva = (sivu, nimi) => (KUVAKANSIO ? sivu.screenshot({ path: join(KUVAKANSIO, `ilme-${nimi}.png`) }) : null);

/** Lehti auki Sofiassa → pöllön vinkki. Palauttaa vinkin tilan. */
async function vinkki(sivu) {
  await sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    ui.openArrival(game.board.cityById.get('sofia'));
  });
  await sivu.waitForTimeout(3000);
  const t = await sivu.evaluate(() => {
    const sana = document.querySelector('.fokusvirta-vinkki .ilme-sana');
    return {
      kupla: Boolean(document.querySelector('.fokusvirta-vinkki')),
      teksti: document.querySelector('.fokusvirta-vinkkiteksti')?.textContent ?? '',
      sana: sana?.textContent ?? null,
      korostettu: Boolean(sana?.classList.contains('ilme-korostettu')),
      annotaatio: Boolean(sana?.nextElementSibling?.matches?.('svg.rough-annotation')),
      annotaatioita: document.querySelectorAll('.fokusvirta-vinkki svg.rough-annotation').length,
    };
  });
  return t;
}

/** Sähkekortti auki (kirjoitus ohitettu) → kysymysrivin korostus. */
async function sahke(sivu) {
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    const fv = await import('/js/fokusvirta.js');
    document.querySelector('.fokusvirta-vinkki')?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    ui.arrivalDialog?.close?.();
    ui.busy = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 800));
    fv.avaaFokusKohtaaminen(ui, game.cityOf());
    await new Promise((r) => setTimeout(r, 700));
    document.querySelector('.fokusvirta-sahke')?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
  });
  await sivu.waitForTimeout(1200);
  return sivu.evaluate(() => {
    const rivi = document.querySelector('.fokusvirta-sahkekysymys');
    const cs = rivi && getComputedStyle(rivi);
    return {
      kortti: Boolean(document.querySelector('.fokusvirta-sahke')),
      rivi: Boolean(rivi),
      teksti: (rivi?.textContent ?? '').slice(0, 40),
      korostettu: Boolean(rivi?.querySelector(':scope > .ilme-sisalto.ilme-korostettu')),
      annotaatioita: document.querySelectorAll('.fokusvirta-sahke svg.rough-annotation').length,
      lappu: cs ? cs.backgroundImage : null,
    };
  });
}

/** Ateenaan, Liiku maitse → reitit. Mittaa kesken (200 ms) ja perillä (1,7 s). */
async function reitti(sivu, leima) {
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    const fv = await import('/js/fokusvirta.js');
    fv.suljeFokusvirta(ui);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.tokens.delete('ateena');
    game.phase = 'action';
    ui.busy = false;
    ui.render();
    await new Promise((r) => setTimeout(r, 1500));
    game.actionTravel('land');
    ui.render();
  });
  await sivu.waitForTimeout(200);
  const kesken = await sivu.evaluate(() => {
    const k = document.querySelector('.matkareitit');
    const oma = k?.querySelector(':scope > path');
    return {
      tila: k?.dataset.musteviiva ?? null,
      kopio: k?.querySelectorAll(':scope > g.ilme-muste path').length ?? 0,
      kopioDash: k?.querySelector(':scope > g.ilme-muste path')?.style.strokeDasharray ?? '',
      omat: k?.querySelectorAll(':scope > path').length ?? 0,
      omaOpacity: oma ? getComputedStyle(oma).opacity : null,
    };
  });
  await kuva(sivu, `${leima}reitti-kesken`);
  await sivu.waitForTimeout(1500);
  const perilla = await sivu.evaluate(() => {
    const k = document.querySelector('.matkareitit');
    const polut = [...k.querySelectorAll(':scope > path')];
    return {
      tila: k?.dataset.musteviiva ?? null,
      kopioita: k.querySelectorAll('g.ilme-muste').length,
      polkuja: polut.length,
      katkot: polut.every((p) => /^\d/.test(p.style.strokeDasharray) && !p.style.strokeDashoffset),
      nakyvat: polut.every((p) => Number(getComputedStyle(p).opacity) > 0.3),
      ympyrat: k.querySelectorAll(':scope > circle').length,
      polkujaYhteensa: k.querySelectorAll('path').length,
    };
  });
  await kuva(sivu, `${leima}reitti-valmis`);
  return { kesken, perilla };
}

/** Karttaselite auki → kehys. */
async function selite(sivu) {
  await sivu.evaluate(() => document.querySelector('.karttaselite-nappi')?.click());
  await sivu.waitForTimeout(900);
  return sivu.evaluate(() => {
    const levy = document.querySelector('.karttaselite-levy');
    const svg = levy?.querySelector(':scope > svg.ilme-karhea');
    return {
      auki: Boolean(levy?.classList.contains('auki')),
      kehys: Boolean(svg?.querySelector('path')),
      luokka: Boolean(levy?.classList.contains('ilme-karhea-kehys')),
      reuna: levy ? getComputedStyle(levy).borderTopColor : null,
      korkeus: svg ? getComputedStyle(svg).height : null,
    };
  });
}

const solmut = (sivu) => sivu.evaluate(() => document.querySelectorAll('*').length);

/* ================= A–D: kirjastot mukana ================= */
let solmutKirjastoilla = 0;
if (AMPARI_TOIMII) {
  const { ctx, sivu, tila } = await avaaSivu({ kirjastot: true });
  const v = await vinkki(sivu);
  vaadi('vinkki: kupla ja omistajan lause ennallaan', v.kupla && v.teksti.startsWith('Etsi minitehtävä lehdestä'), JSON.stringify(v));
  vaadi('vinkki: avainsana on rough-notation-elementti (kynällä ympyröity)',
    v.sana === 'minitehtävä' && v.korostettu && v.annotaatio && v.annotaatioita === 1, JSON.stringify(v));
  await kuva(sivu, 'vinkki');
  const s = await sahke(sivu);
  vaadi('sähke: kysymysrivi saa kynän alleviivauksen (rough-notation)',
    s.kortti && s.rivi && s.korostettu && s.annotaatioita >= 1, JSON.stringify(s));
  await kuva(sivu, 'sahke');
  const r = await reitti(sivu, '');
  vaadi('reitti: kynä piirtää kopioon ja omat polut odottavat (data-musteviiva=piirtyy)',
    r.kesken.tila === 'piirtyy' && r.kesken.kopio === r.kesken.omat && r.kesken.omat > 0
      && r.kesken.omaOpacity === '0' && /^\d/.test(r.kesken.kopioDash), JSON.stringify(r.kesken));
  vaadi('reitti: perillä kopio on poissa, katkoviiva ja askelympyrät ennallaan',
    r.perilla.tila === 'valmis' && r.perilla.kopioita === 0 && r.perilla.katkot && r.perilla.nakyvat
      && r.perilla.ympyrat > 0 && r.perilla.polkujaYhteensa === r.perilla.polkuja, JSON.stringify(r.perilla));
  const se = await selite(sivu);
  vaadi('selite: levyllä on käsin piirretty kehys (Rough.js) ja CSS-reuna väistyy',
    se.auki && se.kehys && se.luokka && /rgba\(0, 0, 0, 0\)|transparent/.test(se.reuna ?? ''), JSON.stringify(se));
  await kuva(sivu, 'selite');
  vaadi('kirjastot tulevat ämpärin vendor/-polusta, ei CDN:stä',
    VENDOR.every((n) => tila.vendor.some((u) => u.endsWith(n))) && tila.cdn.length === 0,
    JSON.stringify({ vendor: tila.vendor, cdn: tila.cdn }));
  const globaalit = await sivu.evaluate(() => [typeof window.Vivus, typeof window.rough, typeof window.RoughNotation]);
  vaadi('globaalit Vivus, rough ja RoughNotation ovat sivulla', globaalit.every((t) => t !== 'undefined'), globaalit.join(','));
  solmutKirjastoilla = await solmut(sivu);
  tieto('DOM-solmut kirjastojen kanssa', solmutKirjastoilla);
  vaadi('ei sivuvirheitä (kirjastot mukana)', tila.virheet.length === 0, tila.virheet.slice(0, 3).join(' | '));
  await ctx.close();

  /* ================= E: reduced motion ================= */
  const rm = await avaaSivu({ kirjastot: true, reducedMotion: 'reduce' });
  const rv = await vinkki(rm.sivu);
  vaadi('reduced motion: korostus piirtyy ilman animaatiota', rv.korostettu && rv.annotaatio, JSON.stringify(rv));
  await sahke(rm.sivu);
  const rr = await reitti(rm.sivu, 'reduced-');
  vaadi('reduced motion: reitti on valmis heti, ei kopiota eikä tilaa',
    rr.kesken.tila === null && rr.kesken.kopio === 0 && rr.kesken.omaOpacity !== '0'
      && rr.perilla.tila === null && rr.perilla.kopioita === 0 && rr.perilla.katkot, JSON.stringify(rr));
  vaadi('ei sivuvirheitä (reduced motion)', rm.tila.virheet.length === 0, rm.tila.virheet.slice(0, 3).join(' | '));
  await rm.ctx.close();
}

/* ================= F: ilman kirjastoja ================= */
{
  const { ctx, sivu, tila } = await avaaSivu({ kirjastot: false });
  const v = await vinkki(sivu);
  vaadi('ilman kirjastoja: vinkki on pelkkä lause (ei annotaatiota)',
    v.kupla && v.teksti.startsWith('Etsi minitehtävä lehdestä') && !v.korostettu && v.annotaatioita === 0, JSON.stringify(v));
  const s = await sahke(sivu);
  vaadi('ilman kirjastoja: sähkeen kysymysrivi on CSS-korostettu kuten ennen',
    s.kortti && s.rivi && !s.korostettu && s.annotaatioita === 0, JSON.stringify(s));
  const r = await reitti(sivu, 'ilman-');
  vaadi('ilman kirjastoja: reitti on heti valmis, ei kopiota eikä tilaa',
    r.kesken.tila === null && r.kesken.kopio === 0 && r.kesken.omaOpacity !== '0' && r.perilla.katkot
      && r.perilla.polkujaYhteensa === r.perilla.polkuja, JSON.stringify(r));
  const se = await selite(sivu);
  vaadi('ilman kirjastoja: selite pitää CSS-reunansa, ei kehystä',
    se.auki && !se.kehys && !se.luokka && !/rgba\(0, 0, 0, 0\)|transparent/.test(se.reuna ?? ''), JSON.stringify(se));
  const ilmeSolmuja = await sivu.evaluate(() => document.querySelectorAll('.ilme-karhea, .rough-annotation, .ilme-muste, .ilme-korostettu').length);
  vaadi('ilman kirjastoja: yhtään ilme-elementtiä ei ole', ilmeSolmuja === 0, String(ilmeSolmuja));
  const solmutIlman = await solmut(sivu);
  tieto('DOM-solmut ilman kirjastoja', solmutIlman);
  if (solmutKirjastoilla) {
    const kasvu = (solmutKirjastoilla - solmutIlman) / solmutIlman;
    vaadi(`DOM-solmut kasvavat enintään 5 % (${(kasvu * 100).toFixed(2)} %)`, kasvu <= 0.05, `${solmutIlman} → ${solmutKirjastoilla}`);
  }
  vaadi('ei sivuvirheitä (ilman kirjastoja)', tila.virheet.length === 0, tila.virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

/* ================= G: liput pois ================= */
{
  const { ctx, sivu, tila } = await avaaSivu({ kirjastot: true, liput: false });
  await vinkki(sivu);
  await sahke(sivu);
  await reitti(sivu, 'liput-');
  await selite(sivu);
  await sivu.waitForTimeout(3500);
  const ilmeSolmuja = await sivu.evaluate(() => document.querySelectorAll('.ilme-karhea, .rough-annotation, .ilme-muste, .ilme-korostettu').length);
  vaadi('liput pois: kirjastoja ei ladata eikä ilme-elementtejä synny',
    tila.vendor.length === 0 && ilmeSolmuja === 0, JSON.stringify({ vendor: tila.vendor, ilmeSolmuja }));
  const kytkin = await sivu.evaluate(() => {
    const nappi = document.getElementById('kehittaja-ilme-btn');
    return { on: Boolean(nappi), tila: nappi?.querySelector('.kehittaja-kytkin-tila')?.textContent };
  });
  vaadi('kehittäjävalikon ilme-kytkin näyttää tilan "pois"', kytkin.on && kytkin.tila === 'pois', JSON.stringify(kytkin));
  vaadi('ei sivuvirheitä (liput pois)', tila.virheet.length === 0, tila.virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
