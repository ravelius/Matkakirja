/*
 * MITTANAUHA: KOHDEMAAN MERKIT JA NIMIÖT SAAPUMISNÄKYMÄSSÄ.
 *
 * Tämä ei ole savuke vaan MITTA (kuten mittaa-nimikyltit.mjs).
 * Omistajan päätös 15.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
 * 25) tilasi kaksi lukua, joita ei ollut olemassa:
 *
 *   1. MONTAKO KOHDEMAAN MERKKIÄ saapumisnäkymä päästää läpi
 *      (js/pallolauta/nostot.js merkkiPortti) ja montako niistä on
 *      ruudulla — odotus PAATOKSET 25:n jälkeen on kaikki.
 *   2. NIMIÖN KOKO PIKSELEINÄ saapumiszoomilla, erikseen
 *      LISÄKAUPUNGEILLE (`nakyva-kaupunki-*`, tilaus n. 11–12 px) ja
 *      muille nostoille (8,5 px, PAATOKSET 14) — sekä päällekkäisten
 *      nimiöiden osuus, joka on se hinta, jonka isompi nimiö voi
 *      maksaa (PAATOKSET 25 kohta 3).
 *
 * MITTA LUETAAN KAAVASTA EIKÄ RUUDULTA. Elävän noston oma svg on
 * 1 × 1 px ja ylivuotava, joten `getBoundingClientRect` ei kerro
 * lapusta mitään; kerros luovuttaa laatikot samasta kaavasta, jolla
 * sovittelu ne laski (`nostot.lappuLaatikot()`, `osumaLaatikot()`).
 * Nimiön pistekoko luetaan merkin omasta skaalasta: rasterissa nimiö
 * on NOSTOSYM_NIMIO_KOKO yksikköä, joten ruudulla se on skaala × 11.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-kohdemaan-merkit.mjs \
 *     [--kaupunki=pariisi] [--leveys=1400] [--korkeus=900] [--kuva=polku.jpg]
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const lippu = (nimi, oletus) => {
  const osuma = process.argv.slice(2).find((a) => a.startsWith(`--${nimi}=`));
  return osuma ? osuma.slice(nimi.length + 3) : oletus;
};
const KAUPUNKI = lippu('kaupunki', 'pariisi');
const LEVEYS = Number(lippu('leveys', 1400));
const KORKEUS = Number(lippu('korkeus', 900));
const KUVA = lippu('kuva', null);

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) { console.log('OHITUS ämpäri'); palvelin.close(); process.exit(0); }

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: LEVEYS, height: KORKEUS }, deviceScaleFactor: 1, serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* */ }
}, tallenne(KAUPUNKI));
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const v = await ampariHaku(route.request().url());
  if (!v || v.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(44000);

const mittaa = async () => sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  const koti = (document.querySelector('.pallolauta-kotelo') ?? document.body).getBoundingClientRect();
  const nakyy = (r) => r.x1 > koti.left && r.x0 < koti.right && r.y1 > koti.top && r.y0 < koti.bottom;
  const NIMIO_KOKO = 11; // NOSTOSYM_NIMIO_KOKO
  const nostot = [...document.querySelectorAll('.pallolauta-nosto')].map((el) => {
    const g = el.querySelector('.pallolauta-nosto-siirto');
    const m = g?.style.transform.match(/scale\(([\d.]+)\)/u);
    const a = el.getBoundingClientRect();
    return {
      id: el.dataset.nosto,
      nimio: el.dataset.nimio || '',
      skaala: m ? Number(m[1]) : 0,
      nimioPx: m ? Number(m[1]) * NIMIO_KOKO : 0,
      x: a.left + a.width / 2,
      y: a.top + a.height / 2,
    };
  });
  const laput = (l.nostot?.lappuLaatikot?.() ?? []).map((r) => ({ ...r }));
  const osumat = (l.nostot?.osumaLaatikot?.() ?? []).map((r) => ({ ...r }));
  const portti = l.nostot?.portti?.() ?? null;
  const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  const parit = [];
  const nakyvatLaput = laput.filter(nakyy);
  for (let i = 0; i < nakyvatLaput.length; i += 1) {
    for (let j = i + 1; j < nakyvatLaput.length; j += 1) {
      if (limittyy(nakyvatLaput[i], nakyvatLaput[j])) {
        parit.push(`${nakyvatLaput[i].id} + ${nakyvatLaput[j].id}`);
      }
    }
  }
  const paalla = new Set(parit.flatMap((p) => p.split(' + ')));
  return {
    alt: l.pallo.pointOfView().altitude,
    portti: portti ? {
      merkkeja: portti.merkit?.length ?? 0,
      piiloon: portti.piiloon?.length ?? 0,
      polttovelka: portti.polttovelka?.length ?? 0,
      kaikki: (portti.merkit?.length ?? 0) + (portti.piiloon?.length ?? 0),
      piiloonIdt: portti.piiloon ?? [],
    } : null,
    nostot,
    laput: nakyvatLaput.map((r) => ({
      id: r.id, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1,
    })),
    osumia: osumat.length,
    osumiaNakyvissa: osumat.filter(nakyy).length,
    parit,
    paallekkain: paalla.size,
    lappujaNakyvissa: nakyvatLaput.length,
  };
});

const m = await mittaa();
const kaupunkeja = m.nostot.filter((n) => /^nakyva-kaupunki-/u.test(n.id ?? ''));
const muut = m.nostot.filter((n) => !/^nakyva-kaupunki-/u.test(n.id ?? ''));
const ka = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
console.log(`\n=== ${KAUPUNKI} ${LEVEYS}x${KORKEUS} saapumisnäkymä (alt ${m.alt.toFixed(4)}) ===`);
console.log(`portti: merkkejä ${m.portti?.merkkeja} piiloon ${m.portti?.piiloon}`
  + ` polttovelka ${m.portti?.polttovelka} kaikkiaan ${m.portti?.kaikki}`);
if (m.portti?.piiloonIdt?.length) console.log(`  piiloon: ${m.portti.piiloonIdt.join(', ')}`);
console.log(`eläviä nostoelementtejä DOMissa: ${m.nostot.length}`);
console.log(`  lisäkaupunkeja ${kaupunkeja.length} nimiö ka ${ka(kaupunkeja.map((n) => n.nimioPx)).toFixed(2)} px`
  + ` (${kaupunkeja.map((n) => n.nimioPx.toFixed(1)).join(', ')})`);
console.log(`  muita nostoja ${muut.length} nimiö ka ${ka(muut.map((n) => n.nimioPx)).toFixed(2)} px`);
console.log(`osumalaatikoita ${m.osumia}, näkyvissä ${m.osumiaNakyvissa}`);
console.log(`nimiölaatikoita näkyvissä ${m.lappujaNakyvissa}, päällekkäin ${m.paallekkain}`
  + ` (${m.lappujaNakyvissa ? ((100 * m.paallekkain) / m.lappujaNakyvissa).toFixed(1) : '0'} %)`
  + ` pareja ${m.parit.length}`);
if (m.parit.length) console.log(`  parit: ${m.parit.slice(0, 20).join(' | ')}`);
console.log(`kaupunkimerkit: ${kaupunkeja.map((n) => `${n.id.replace('nakyva-kaupunki-', '')}`
  + ` @${Math.round(n.x)},${Math.round(n.y)}`).join(', ')}`);
if (KUVA) {
  /*
   * SAAPUMISKORTTI POIS KUVASTA. Puhelinruudulla saapumisen valokuva
   * peittää kartan lähes kokonaan, eikä kuvasta silloin näe sitä,
   * mitä tässä mitataan. Escape sulkee kortin; kartta ladotaan vielä
   * kerran, jotta kuva on sama näkymä kuin luvut.
   */
  for (let i = 0; i < 4; i += 1) {
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(250);
  }
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    window.matkakirja.ui.pallolauta.ladoHeti();
    await new Promise((v) => setTimeout(v, 1200));
  });
  /*
   * KUVAN LUVUT ERIKSEEN. Kortin sulkeminen on oma ladontansa, ja
   * puhelimella kamera asettuu sen jälkeen hieman eri kohtaan kuin
   * kortin takana — kuva ja luvut eivät saa olla eri näkymästä.
   */
  const k = await mittaa();
  const kk = k.nostot.filter((n) => /^nakyva-kaupunki-/u.test(n.id ?? ''));
  console.log(`\nkuvan näkymä (saapumiskortti suljettu): portti ${k.portti?.merkkeja}`
    + ` piiloon ${k.portti?.piiloon}, merkkielementtejä ${k.nostot.length},`
    + ` lisäkaupunkeja ${kk.length} (${kk.map((n) => n.id.replace('nakyva-kaupunki-', '')).join(', ')}),`
    + ` nimiöitä näkyvissä ${k.lappujaNakyvissa}, päällekkäin ${k.paallekkain}`);
  await sivu.screenshot({
    path: KUVA, type: 'jpeg', quality: 70, scale: 'css', timeout: 120000,
  });
}
console.log('virheet:', virheet.slice(0, 3));
await ctx.close();
await selain.close();
palvelin.close();
process.exit(0);
