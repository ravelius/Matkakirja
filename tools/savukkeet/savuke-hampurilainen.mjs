/*
 * Savuke: PÄÄVALIKON NAPPI ON ALKUPERÄINEN HAMPURILAINEN — VÄKÄSET
 * VAIN SILLOIN KUN YLÄPALKKI ON PIILOSSA.
 *
 * OMISTAJAN TILAUS 14.9.2026, sanatarkasti: *"Hampurilaisen ikonin voi
 * vaihtaa alkuperaiseen mutta jata nykyinen iPhonen vaaka tilaa varten
 * kayttoon silloin kun Ylapalkki on piilossa"*
 *
 * MITÄ TÄMÄ MITTAA, jota yksikkötesti ei näe: sen KUMPI kuvake on
 * oikeasti ruudulla kussakin ruutukoossa. Yläpalkin piilotus on
 * media-kysely (max-height 520px), ja se ratkeaa vasta oikeassa
 * selaimessa. Kolme kokoa:
 *
 *   pysty 390 × 844   yläpalkki näkyy → #menu-btn = kolme suoraa viivaa
 *   vaaka 844 × 390   yläpalkki piilossa → kartalla väkäsnappi
 *   työpöytä 1400×900 yläpalkki näkyy → kolme suoraa viivaa
 *
 * VASTAKOE kuuluu ajoon: `--vastakoe` pakottaa odotukset päinvastoin
 * (väkäset päävalikossa, suorat viivat kartan napissa), jolloin ajon
 * pitää antaa FAIL-rivejä.
 *
 *   node tools/savukkeet/savuke-hampurilainen.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const VASTAKOE = process.argv.includes('--vastakoe');

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const pyyntö = decodeURIComponent(req.url.split('?')[0]);
  const polku = join(JUURI, pyyntö === '/' ? 'index.html' : pyyntö);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* Alkuperäisen hampurilaisen tuntomerkki: viiva on kahden pisteen
   "h"-muoto (vaakaviiva), ei kolmipisteinen v. */
const onSuoraViiva = (d) => !/[Ll]/.test(d) && /h/.test(d);
const onVakanen = (d) => (d.match(/L/g) ?? []).length === 2;

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Avaa pelin annetussa ruutukoossa ja palauttaa sivun. */
async function avaaPeli(leveys, korkeus) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, serviceWorkers: 'block',
  });
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
  await sivu.waitForSelector('.start-btn', { timeout: 15000 });
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(3500);
  return { ctx, sivu, virheet };
}

/** Kummankin napin kuvakepolut ja näkyvyys yhdellä lukemalla. */
const lueTila = (sivu) => sivu.evaluate(() => {
  const polut = (juuri) => (juuri
    ? [...juuri.querySelectorAll('svg path')].map((p) => p.getAttribute('d')) : []);
  const nakyy = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const t = getComputedStyle(el);
    return t.display !== 'none' && t.visibility !== 'hidden'
      && r.width > 0 && r.height > 0
      && r.bottom > 0 && r.top < window.innerHeight;
  };
  const valikkoNappi = document.getElementById('menu-btn');
  const palkki = document.querySelector('.topbar');
  const karttaNappi = document.querySelector('.ylapalkki-nappi');
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x), y: Math.round(r.y),
      w: Math.round(r.width), h: Math.round(r.height),
    };
  };
  return {
    palkkiNakyy: nakyy(palkki),
    palkkiLaatikko: laatikko(palkki),
    valikkoNappiNakyy: nakyy(valikkoNappi),
    valikkoPolut: polut(valikkoNappi),
    valikkoLaatikko: laatikko(valikkoNappi),
    karttaNappiNakyy: nakyy(karttaNappi),
    karttaPolut: polut(karttaNappi),
    karttaLaatikko: laatikko(karttaNappi),
  };
});

const kuvat = [];

/* ── 1. PYSTY 390 × 844: yläpalkki näkyy ───────────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(390, 844);
  vaadi('pysty: sivu latautui ilman poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  const tila = await lueTila(sivu);
  console.log('      pysty:', JSON.stringify(tila));
  vaadi('pysty: yläpalkki on näkyvissä', tila.palkkiNakyy, JSON.stringify(tila.palkkiLaatikko));
  vaadi('pysty: päävalikon nappi on näkyvissä', tila.valikkoNappiNakyy);
  vaadi('pysty: päävalikossa on kolme viivaa',
    tila.valikkoPolut.length >= 1
      && tila.valikkoPolut.every(VASTAKOE ? onVakanen : onSuoraViiva)
      && tila.valikkoPolut.join('').split('M').length - 1 === 3,
    JSON.stringify(tila.valikkoPolut));
  vaadi('pysty: kartan väkäsnappi on piilossa', !tila.karttaNappiNakyy,
    JSON.stringify(tila.karttaLaatikko));
  await sivu.click('#menu-btn');
  await sivu.waitForTimeout(250);
  const auki = await sivu.evaluate(() => {
    const v = document.getElementById('paavalikko');
    return Boolean(v) && !v.hidden && v.getBoundingClientRect().height > 0;
  });
  vaadi('pysty: nappi avaa päävalikon', auki);
  await sivu.screenshot({ path: `${JUURI}docs/raportit/kuvat/hampurilainen-pysty.png` });
  kuvat.push('hampurilainen-pysty.png');
  await ctx.close();
}

/* ── 2. VAAKA 844 × 390: yläpalkki piilossa ────────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(844, 390);
  vaadi('vaaka: sivu latautui ilman poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  const tila = await lueTila(sivu);
  console.log('      vaaka:', JSON.stringify(tila));
  vaadi('vaaka: yläpalkki on piilossa', !tila.palkkiNakyy, JSON.stringify(tila.palkkiLaatikko));
  vaadi('vaaka: kartan nappi on näkyvissä oikeassa yläkulmassa',
    tila.karttaNappiNakyy && tila.karttaLaatikko.x > 844 * 0.8 && tila.karttaLaatikko.y < 100,
    JSON.stringify(tila.karttaLaatikko));
  vaadi('vaaka: kartan napissa on väkäset',
    tila.karttaPolut.length === 3 && tila.karttaPolut.every(VASTAKOE ? onSuoraViiva : onVakanen),
    JSON.stringify(tila.karttaPolut));
  await sivu.screenshot({ path: `${JUURI}docs/raportit/kuvat/hampurilainen-vaaka.png` });
  kuvat.push('hampurilainen-vaaka.png');
  await sivu.click('.ylapalkki-nappi');
  await sivu.waitForTimeout(350);
  const palkkiAuki = await lueTila(sivu);
  vaadi('vaaka: nappi tuo yläpalkin näkyviin', palkkiAuki.palkkiNakyy,
    JSON.stringify(palkkiAuki.palkkiLaatikko));
  vaadi('vaaka: esiin tulleessa palkissa on kolme viivaa',
    palkkiAuki.valikkoPolut.every(VASTAKOE ? onVakanen : onSuoraViiva),
    JSON.stringify(palkkiAuki.valikkoPolut));
  await sivu.click('#menu-btn');
  await sivu.waitForTimeout(250);
  const auki = await sivu.evaluate(() => {
    const v = document.getElementById('paavalikko');
    return Boolean(v) && !v.hidden && v.getBoundingClientRect().height > 0;
  });
  vaadi('vaaka: nappi avaa päävalikon', auki);
  await ctx.close();
}

/* ── 3. TYÖPÖYTÄ 1400 × 900 ────────────────────────────────────────── */
{
  const { ctx, sivu, virheet } = await avaaPeli(1400, 900);
  vaadi('työpöytä: sivu latautui ilman poikkeuksia', virheet.length === 0,
    virheet.join(' | ').slice(0, 300));
  const tila = await lueTila(sivu);
  console.log('      työpöytä:', JSON.stringify(tila));
  vaadi('työpöytä: yläpalkki on näkyvissä', tila.palkkiNakyy);
  vaadi('työpöytä: päävalikossa on kolme viivaa',
    tila.valikkoPolut.every(VASTAKOE ? onVakanen : onSuoraViiva)
      && tila.valikkoPolut.join('').split('M').length - 1 === 3,
    JSON.stringify(tila.valikkoPolut));
  vaadi('työpöytä: kartan väkäsnappi on piilossa', !tila.karttaNappiNakyy,
    JSON.stringify(tila.karttaLaatikko));
  await sivu.click('#menu-btn');
  await sivu.waitForTimeout(250);
  const auki = await sivu.evaluate(() => {
    const v = document.getElementById('paavalikko');
    return Boolean(v) && !v.hidden && v.getBoundingClientRect().height > 0;
  });
  vaadi('työpöytä: nappi avaa päävalikon', auki);
  await sivu.screenshot({ path: `${JUURI}docs/raportit/kuvat/hampurilainen-tyopoyta.png` });
  kuvat.push('hampurilainen-tyopoyta.png');
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi${VASTAKOE ? ' (VASTAKOE: FAIL-rivit odotettuja)' : ''}`);
console.log(`kuvat: ${kuvat.join(', ')}`);
process.exit(VASTAKOE ? 0 : (lapi === kaikki ? 0 : 1));
