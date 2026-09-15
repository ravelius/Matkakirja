/*
 * MITTANAUHA: KYLTIN ANKKURI ZOOMEITTAIN JA RANSKAN MERKKIEN MÄÄRÄ.
 *
 * Tämä ei ole savuke vaan MITTA — savukkeen vartiot ovat
 * tools/savukkeet/savuke-nimikyltti.mjs:ssä (vartiot 1–7). Tämä avaa
 * Ranskan saapumisnäkymän kerran ja lukee viideltä zoomtasolta kaksi
 * asiaa, jotka omistaja kysyi 15.9.2026 (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 24 ja SELVITYS: RANSKAN NOSTOT JA MUUT KAUPUNGIT
 * PUUTTUVAT):
 *
 *   1. KYLTIN ANKKURI: nimen keskipiste MIINUS oman CSS2D-solmun
 *      keskipiste (solmu on kaupungin pisteessä, translate(-50%,-50%)),
 *      siitä suunta asteina ja etäisyys tekstikorkeuteen
 *      suhteutettuna. `getScreenCoords(lat, lon, 0)` EI kelpaa
 *      ankkuriksi: se on eri korkeudella kuin merkkikerros, ja ero
 *      kasvaa zoomatessa — mitta liikkuisi, vaikka kyltti olisi
 *      paikallaan (mitattu 15.9.2026, ero 70 px Alpeilla).
 *   2. MERKKIEN MÄÄRÄ: montako nostoa ja kohdemerkkiä on DOMissa ja
 *      näkyvissä, ja mitä merkkiportti (js/pallolauta/nostot.js
 *      merkkiPortti) päästi läpi ja jätti lähizoomia odottamaan.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-nimikyltit.mjs [kuvatiedosto]
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
const KUVA = process.argv[2] ?? null;

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
  viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* */ }
}, tallenne('pariisi'));
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

const alkuPov = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
console.log('POV', JSON.stringify(alkuPov));

const mittaa = async (kerroin) => sivu.evaluate(async ([k, pov]) => {
  const ui = window.matkakirja.ui;
  const l = ui.pallolauta;
  l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * k }, 0);
  await new Promise((v) => setTimeout(v, 1600));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  const koti = (document.querySelector('.pallolauta-kotelo') ?? document.body).getBoundingClientRect();
  const nakyy = (r) => r.width > 0 && r.right > koti.left && r.left < koti.right
    && r.bottom > koti.top && r.top < koti.bottom;
  const kyltit = [...document.querySelectorAll('.pallolauta-nimi')].map((el) => {
    const id = el.dataset.kaupunki;
    const t = el.querySelector('text');
    const g = el.querySelector('.pallolauta-nimi-siirto');
    const r = t ? t.getBoundingClientRect() : null;
    const a = el.getBoundingClientRect();
    if (!r || !(r.width > 0)) return null;
    // ANKKURI ON ELEMENTIN OMA KESKIPISTE: CSS2D asettaa solmun
    // kaupungin pisteeseen (translate(-50%,-50%)), joten 1x1-svg:n
    // keskipiste ON merkin paikka ruudulla. getScreenCoords(lat,lon,0)
    // olisi eri korkeudella kuin merkkikerros ja siirtyisi zoomin
    // mukana — se mittaisi eri asiaa.
    const ax = a.left + a.width / 2;
    const ay = a.top + a.height / 2;
    const dx = r.left + r.width / 2 - ax;
    const dy = r.top + r.height / 2 - ay;
    const siirto = g ? (g.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/u) ?? []) : [];
    return {
      id,
      dx, dy,
      kulma: (Math.atan2(dy, dx) * 180) / Math.PI,
      etaisyys: Math.hypot(dx, dy),
      koko: Number(t.getAttribute('font-size')),
      ank: t.getAttribute('text-anchor'),
      sdx: Number(siirto[1] ?? 0),
      sdy: Number(siirto[2] ?? 0),
    };
  }).filter(Boolean);
  const nostot = [...document.querySelectorAll('.pallolauta-nosto')];
  const merkit = [...document.querySelectorAll('.pallolauta-merkki')];
  const portti = l.nostot?.portti?.() ?? null;
  return {
    alt: l.pallo.pointOfView().altitude,
    skaala: l.kamera.nakyvaAlue()?.skaala ?? 0,
    vertailu: l.saapumisenSkaala?.() ?? 0,
    kyltit,
    nimia: kyltit.length,
    nostojaDom: nostot.length,
    nostojaNakyvissa: nostot.filter((e) => nakyy(e.getBoundingClientRect())).length,
    merkkejaDom: merkit.length,
    merkkejaNakyvissa: merkit.filter((e) => nakyy(e.getBoundingClientRect())).length,
    lisakaupungit: merkit.filter((e) => /nakyva-kaupunki/.test(e.dataset?.kohde ?? e.dataset?.id ?? e.getAttribute('aria-label') ?? '')).length,
    merkkiTunnukset: merkit.slice(0, 200).map((e) => e.dataset?.kohde ?? e.dataset?.id ?? e.getAttribute('aria-label') ?? '?'),
    portti: portti ? {
      merkkeja: portti.merkit?.length ?? 0,
      piiloon: portti.piiloon?.length ?? 0,
      polttovelka: portti.polttovelka?.length ?? 0,
      uloinOsuus: portti.uloinOsuus ?? 0,
    } : null,
  };
}, [kerroin, alkuPov]);

const TASOT = [1, 0.7, 0.5, 0.35, 0.25];
const tulokset = [];
for (const k of TASOT) {
  const m = await mittaa(k);
  tulokset.push({ k, ...m });
  console.log(`\n== kerroin ${k} alt ${m.alt.toFixed(4)} skaala ${m.skaala.toFixed(3)} (vertailu ${m.vertailu.toFixed(3)})`);
  console.log(`   nimiä ${m.nimia} | nostoja DOM ${m.nostojaDom} näkyvissä ${m.nostojaNakyvissa} | merkkejä DOM ${m.merkkejaDom} näkyvissä ${m.merkkejaNakyvissa} | lisäkaupunkeja ${m.lisakaupungit}`);
  console.log(`   portti ${JSON.stringify(m.portti)}`);
  console.log(`   merkkitunnukset: ${m.merkkiTunnukset.slice(0, 40).join(', ')}`);
  for (const kk of m.kyltit.filter((c) => ['pariisi', 'alpit', 'marseille'].includes(c.id))) {
    console.log(`   ${kk.id}: kulma ${kk.kulma.toFixed(1)}° etäisyys ${kk.etaisyys.toFixed(1)} px koko ${kk.koko.toFixed(2)} ank ${kk.ank} siirto ${kk.sdx.toFixed(1)}/${kk.sdy.toFixed(1)} (et/koko ${(kk.etaisyys / kk.koko).toFixed(3)})`);
  }
}
console.log('\n=== YHTEENVETO kylttien ankkurista ===');
for (const id of ['pariisi', 'alpit', 'marseille']) {
  const rivi = tulokset.map((t) => t.kyltit.find((c) => c.id === id)).filter(Boolean);
  if (!rivi.length) { console.log(`${id}: ei kylttiä`); continue; }
  const kulmat = rivi.map((r) => r.kulma);
  const suhteet = rivi.map((r) => r.etaisyys / r.koko);
  console.log(`${id}: kulmat ${kulmat.map((v) => v.toFixed(1)).join(' / ')} (hajonta ${(Math.max(...kulmat) - Math.min(...kulmat)).toFixed(1)}°)`);
  console.log(`${id}: et/koko ${suhteet.map((v) => v.toFixed(3)).join(' / ')} (hajonta ${(100 * (Math.max(...suhteet) - Math.min(...suhteet)) / (suhteet.reduce((a, b) => a + b, 0) / suhteet.length)).toFixed(1)} %)`);
  console.log(`${id}: ank ${rivi.map((r) => r.ank).join(' / ')}`);
}
if (KUVA) {
  await sivu.evaluate(async ([pov]) => {
    const l = window.matkakirja.ui.pallolauta;
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    l.ladoHeti();
    await new Promise((v) => setTimeout(v, 500));
  }, [alkuPov]);
  await sivu.screenshot({ path: KUVA, type: 'jpeg', quality: 70, scale: 'css', timeout: 120000 });
}
console.log('virheet:', virheet.slice(0, 3));
await ctx.close();
await selain.close();
palvelin.close();
process.exit(0);
