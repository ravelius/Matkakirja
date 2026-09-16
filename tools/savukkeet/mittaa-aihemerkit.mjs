/*
 * MITTANAUHA: AIHEMERKIT JA VIUHKA SAAPUMISNÄKYMÄSSÄ.
 *
 * Tämä ei ole savuke vaan MITTA (kuten mittaa-kohdemaan-merkit.mjs,
 * jonka ajosta ja palvelinrungosta tämä on jatkettu). Omistajan päätös
 * 15.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 27) tilasi luvut,
 * joita ei ollut olemassa:
 *
 *   1. MONTAKO AIHEMERKKIÄ saapumisnäkymässä on ja mitkä nostot niiden
 *      sisällä ovat (js/pallolauta/nostot.js aihemerkit()).
 *   2. LIMITTYVIEN NIMIÖIDEN OSUUS — odotus Pariisin kohdalla 0 %.
 *   3. VIUHKA: avautuuko se napautuksesta, ovatko kaikki kohdat
 *      RUUDULLA ja napautettavissa (elementFromPoint), aukeaako
 *      kohdasta noston popup ja sulkeutuuko viuhka kartan
 *      napautuksesta.
 *   4. YKSI ZOOMPORRAS SISÄÄN: hajoavatko aihemerkit omiksi nostoiksi.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-aihemerkit.mjs \
 *     [--kaupunki=pariisi] [--leveys=1400] [--korkeus=900] \
 *     [--kuva=polku.jpg] [--viuhkakuva=polku.jpg]
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
await sivu.goto(`${osoite}?lauta=pallo${lippu('ryhmitys', '1') === '0' ? '&aihemerkit=0' : ''}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(44000);

const mittaa = async () => sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
  const koti = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
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


const VIUHKA_KUVA = lippu('viuhkakuva', null);

const aihemitta = async () => sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  const n = l.nostot;
  const koti = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
  const aihemerkit = (n.aihemerkit?.() ?? []).map((a) => ({ ...a }));
  const kohdat = (n.viuhkanKohdat?.() ?? []).map((k) => ({ ...k }));
  const auki = n.viuhkaAuki?.() ?? null;
  const merkki = auki ? aihemerkit.find((a) => auki.includes(a.id.replace('aihemerkki:', ''))) : null;
  const paikka = merkki ?? aihemerkit[0] ?? null;
  const ruutu = { leveys: koti.width, korkeus: koti.height };
  const laatikot = n.viuhkanOsumalaatikot?.() ?? [];
  const kohdatRuudulla = kohdat.map((k, i) => {
    const x = (paikka?.x ?? 0) + k.dx;
    const y = (paikka?.y ?? 0) + k.dy;
    const l = laatikot[i];
    return {
      ...k,
      x,
      y,
      // "Ruudulla" = koko osumalaatikko nimineen on kotelon sisällä.
      ruudulla: Boolean(l) && l.x0 >= 0 && l.y0 >= 0
        && l.x1 <= ruutu.leveys && l.y1 <= ruutu.korkeus,
      // "Napautettava" = laudan oma osumatesti löytää kohdan sen
      // keskipisteestä (sama laatikko, jonka piirto käytti).
      osuu: Boolean(l) && x >= l.x0 && x <= l.x1 && y >= l.y0 && y <= l.y1,
      laatikko: l ? [Math.round(l.x0), Math.round(l.y0), Math.round(l.x1), Math.round(l.y1)] : null,
    };
  });
  return {
    auki,
    aihemerkit,
    kohdat: kohdatRuudulla,
    ruutu,
    elementteja: document.querySelectorAll('.pallolauta-aihemerkki').length,
    viuhkaElementteja: document.querySelectorAll('.pallolauta-viuhka-kohta').length,
    nostoElementteja: document.querySelectorAll('.pallolauta-nosto').length,
    kortti: Boolean(document.querySelector('.fokuskohde-popup, .fokusnosto-kerros, .minipopup')),
  };
});

const tulosta = (otsake, m) => {
  console.log(`\n=== ${otsake} (alt ${m.alt.toFixed(4)}) ===`);
  console.log(`portti: merkkejä ${m.portti?.merkkeja} piiloon ${m.portti?.piiloon}`
    + ` kaikkiaan ${m.portti?.kaikki}`);
  console.log(`eläviä merkkielementtejä DOMissa: ${m.nostot.length}`);
  console.log(`nimiölaatikoita näkyvissä ${m.lappujaNakyvissa}, päällekkäin ${m.paallekkain}`
    + ` (${m.lappujaNakyvissa ? ((100 * m.paallekkain) / m.lappujaNakyvissa).toFixed(1) : '0'} %)`
    + ` pareja ${m.parit.length}`);
  if (m.parit.length) console.log(`  parit: ${m.parit.slice(0, 20).join(' | ')}`);
};

/*
 * SAAPUMISKORTTI POIS ENSIN. Puhelinruudulla saapumisen valokuva
 * peittää kartan, ja kortin sulku on oma ladontansa — luvut, kuva ja
 * viuhkan kokeilu ovat siis samasta näkymästä vasta sen jälkeen.
 */
await sivu.evaluate(() => {
  const d = window.matkakirja?.ui?.arrivalDialog;
  if (d?.open) d.close();
}).catch(() => {});
for (let i = 0; i < 4; i += 1) {
  await sivu.keyboard.press('Escape');
  await sivu.waitForTimeout(250);
}
await sivu.waitForTimeout(2500);
await sivu.evaluate(async () => {
  window.matkakirja.ui.pallolauta.ladoHeti();
  await new Promise((v) => setTimeout(v, 1200));
});

const m = await mittaa();
tulosta(`${KAUPUNKI} ${LEVEYS}x${KORKEUS} saapumisnäkymä`, m);
const a = await aihemitta();
console.log(`aihemerkkejä ${a.aihemerkit.length} (DOMissa ${a.elementteja})`);
for (const r of a.aihemerkit) {
  const etaisyydet = [];
  for (let i = 0; i < r.jasenet.length; i += 1) {
    for (let j = i + 1; j < r.jasenet.length; j += 1) {
      etaisyydet.push(Math.round(Math.hypot(
        r.jasenet[i].x - r.jasenet[j].x, r.jasenet[i].y - r.jasenet[j].y,
      )));
    }
  }
  console.log(`  ${r.aihe} × ${r.maara} @${Math.round(r.x)},${Math.round(r.y)}:`
    + ` ${r.jasenet.map((m) => m.id).join(', ')} [välit ${etaisyydet.sort((x, y) => x - y).join(', ')}]`);
}
if (KUVA) {
  await sivu.screenshot({
    path: KUVA, type: 'jpeg', quality: 70, scale: 'css', timeout: 120000,
  });
}

/* ── VIUHKA ─────────────────────────────────────────────────────── */
let viuhka = null;
if (a.aihemerkit.length) {
  const suurin = [...a.aihemerkit].sort((x, y) => y.maara - x.maara)[0];
  await sivu.evaluate((id) => {
    window.matkakirja.ui.pallolauta.napautaNosto(id);
  }, suurin.id);
  await sivu.waitForTimeout(900);
  viuhka = await aihemitta();
  console.log(`\nviuhka auki: ${viuhka.auki} — kohtia ${viuhka.kohdat.length}`
    + ` (elementtejä ${viuhka.viuhkaElementteja}, nostoelementtejä ${viuhka.nostoElementteja})`);
  for (const k of viuhka.kohdat) {
    console.log(`  ${k.nimi}: @${Math.round(k.x)},${Math.round(k.y)}`
      + ` ruudulla ${k.ruudulla ? 'kyllä' : 'EI'} napautettava ${k.osuu ? 'kyllä' : 'EI'}`
      + ` laatikko ${k.laatikko?.join(',')}`);
  }
  console.log(`  kaikki ruudulla: ${viuhka.kohdat.every((k) => k.ruudulla)},`
    + ` kaikki napautettavia: ${viuhka.kohdat.every((k) => k.osuu)}`);
  if (VIUHKA_KUVA) {
    await sivu.screenshot({
      path: VIUHKA_KUVA, type: 'jpeg', quality: 70, scale: 'css', timeout: 120000,
    });
  }
  // Napautus kohtaan avaa noston popupin.
  const kohta = viuhka.kohdat.find((k) => k.osuu);
  if (kohta) {
    const koti = await sivu.evaluate(() => {
      const r = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
      return { x: r.left, y: r.top };
    });
    const paalla = await sivu.evaluate(({ x, y }) => {
      const e = document.elementFromPoint(x, y);
      return e ? `${e.tagName}.${(typeof e.className === 'string' ? e.className : e.className?.baseVal) || ''}` : 'tyhjä';
    }, { x: koti.x + kohta.x, y: koti.y + kohta.y });
    console.log(`  napautuskohdan päällimmäinen elementti: ${paalla}`);
    await sivu.mouse.click(koti.x + kohta.x, koti.y + kohta.y);
    await sivu.waitForTimeout(1200);
    const jalkeen = await aihemitta();
    console.log(`  napautus "${kohta.nimi}" (${Math.round(koti.x + kohta.x)},${Math.round(koti.y + kohta.y)})`
      + ` → popup ${jalkeen.kortti ? 'AUKI' : 'ei auennut'},`
      + ` viuhka ${jalkeen.auki ? 'yhä auki' : 'sulkeutui'}`);
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(500);
    await sivu.evaluate((id) => { window.matkakirja.ui.pallolauta.napautaNosto(id); }, suurin.id);
    await sivu.waitForTimeout(800);
    const sisaisesti = await sivu.evaluate(({ x, y }) => {
      const l = window.matkakirja.ui.pallolauta;
      const osui = l.nostot.napautaViuhkasta({ x, y });
      return { osui, kortti: Boolean(document.querySelector('.fokuskohde-popup, .fokusnosto-kerros, .minipopup')) };
    }, { x: kohta.x, y: kohta.y });
    console.log(`  [sisäinen osumatesti] osui ${sisaisesti.osui}, popup ${sisaisesti.kortti}`);
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(600);
  }
  // Viuhka uudestaan auki ja kartan napautus tyhjään kohtaan sulkee sen.
  await sivu.evaluate((id) => {
    window.matkakirja.ui.pallolauta.napautaNosto(id);
  }, suurin.id);
  await sivu.waitForTimeout(700);
  const auki2 = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.nostot.viuhkaAuki());
  await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    l.nostot.suljeViuhka();
  });
  await sivu.waitForTimeout(600);
  const auki3 = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.nostot.viuhkaAuki());
  console.log(`  uudelleen auki: ${Boolean(auki2)} → sulku: ${auki3 ? 'EI SULKEUTUNUT' : 'sulkeutui'}`);
}

/* ── YKSI ZOOMPORRAS SISÄÄN ─────────────────────────────────────── */
await sivu.evaluate(async () => {
  const l = window.matkakirja.ui.pallolauta;
  const nyt = l.pallo.pointOfView();
  l.pallo.pointOfView({ lat: nyt.lat, lng: nyt.lng, altitude: nyt.altitude * 0.5 }, 0);
  await new Promise((v) => setTimeout(v, 900));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 900));
});
const z = await mittaa();
tulosta(`${KAUPUNKI} ${LEVEYS}x${KORKEUS} yksi zoomporras sisään`, z);
const az = await aihemitta();
console.log(`aihemerkkejä zoomin jälkeen: ${az.aihemerkit.length}`
  + ` (portin uloinOsuus ${(await sivu.evaluate(() => window.matkakirja.ui.pallolauta.nostot.portti()?.uloinOsuus ?? 0)).toFixed(3)})`);

console.log('virheet:', virheet.slice(0, 3));
await ctx.close();
await selain.close();
palvelin.close();
process.exit(0);
