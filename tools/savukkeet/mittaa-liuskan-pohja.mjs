/*
 * Mittari: LIUSKAN POHJA JA PUHELIMEN ZOOMIRAJA (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 34 kohta 15 a-c ja kohdan 14 velka).
 *
 * Yksi kohdemittaus per väite, ei koko sarjaa (omistajan agenttiohje):
 *
 *   15a1. POHJA ON LÄPIKUULTAVA: sisimmän vyön yhteispeitto < 1 ja
 *         väli 0,80-0,85; kaappauksesta luettu pohjan sävy ei ole
 *         puhdas paperi.
 *   15a2. TEKSTI PYSYY LUETTAVANA: musteen ja pohjan kontrasti
 *         kaappauksesta >= 4,5:1.
 *   15a3. EI SUODATINTA (iOS-sääntö): pohjan laskettu tyyli ei sisällä
 *         `filter`iä eikä `backdrop-filter`iä.
 *   14v.  LIUSKAN ALLE EI JÄÄ TOISEN NOSTON NIMIÖTÄ (kohdan 14 velka,
 *         omistajan iPhone-kuvan Reims): pohjan laatikon alla 0 näkyvää
 *         nimiötä tai merkkiä.
 *   15b.  POHJAN MARGINAALI ON SAMA JOKA PUOLELLA: neljä marginaalia
 *         rivien todellisesta laatikosta, ero <= 1 px, tavoite
 *         0,8 x kirjasin.
 *   15c.  PUHELIN ZOOMAA PORTAAN SYVEMMÄLLE: lähin sallittu korkeus
 *         ennen/jälkeen, näkyvä leveys, nimiön ruutukoko (katto 16 px
 *         pysyy) ja merkin halkaisija molemmissa.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const LEVEYS = Number(process.env.SAVUKE_RUUTU ?? 390) || 390;
const KORKEUS = LEVEYS === 390 ? 844 : 900;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');

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
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI ?? 0), ok));
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
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; mittaus ohitetaan');
  palvelin.close();
  process.exit(0);
}

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

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: LEVEYS, height: KORKEUS },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
await ctx.addInitScript((d) => {
  try {
    localStorage.setItem('matkakirja-save-v1', d);
    localStorage.removeItem('matkakirja-lauta');
    localStorage.setItem('matkakirja-kehittaja', '1');
  } catch { /* yksityinen tila */ }
}, tallenne('pariisi'));
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const v = await ampariHaku(route.request().url());
  if (!v || v.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: v.tyyppi ?? 'application/octet-stream',
    body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
// Saapuminen loppuun (isoisän kuvasarja ja pulu ruudun poikki) — sama
// odotus kuin savuke-pariisi-lahizoom.mjs:ssä.
await sivu.waitForTimeout(44000);

async function kaappaa(nimi) {
  if (!KUVAKANSIO) return;
  try {
    await sivu.screenshot({ path: join(KUVAKANSIO, nimi), timeout: 15000 });
  } catch (virhe) {
    tieto('kaappaus ei onnistunut', `${nimi}: ${String(virhe?.message ?? virhe).slice(0, 80)}`);
  }
}

const kankaanNurkka = () => sivu.evaluate(() => {
  const r = window.matkakirja.ui.pallolauta.pallo.renderer().domElement.getBoundingClientRect();
  return { x: r.left, y: r.top };
});

/* ── LIUSKA AUKI SAAPUMISNÄKYMÄSTÄ ─────────────────────────────── */
const nurkka = await kankaanNurkka();
const piste = await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const oma = ui.game?.cityOf?.() ?? null;
  const k = oma ? (l.kaupunki?.(oma.id) ?? null) : null;
  const pp = k ? l.pallo.getScreenCoords(k.lat, k.lon, 0) : null;
  return pp ? { x: pp.x, y: pp.y, id: oma.id } : null;
});
let auki = null;
for (let yritys = 0; yritys < 2 && !auki; yritys += 1) {
  /* eslint-disable no-await-in-loop */
  await sivu.mouse.move(nurkka.x + piste.x, nurkka.y + piste.y);
  await sivu.waitForTimeout(150);
  await sivu.mouse.click(nurkka.x + piste.x, nurkka.y + piste.y);
  for (let i = 0; i < 40; i += 1) {
    auki = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null);
    if (auki) break;
    await sivu.waitForTimeout(50);
  }
  /* eslint-enable no-await-in-loop */
}
await sivu.waitForTimeout(700);
await kaappaa(`liuska-pohja-jalkeen-saapuen-${LEVEYS}.png`);

/* ── 15b + 15a3 + 14v: DOM-laatikot ────────────────────────────── */
const dom = await sivu.evaluate(() => {
  const juuri = [...document.querySelectorAll('.pallolauta-viuhka')]
    .find((g) => g.querySelector('.pallolauta-viuhka-rivit'));
  if (!juuri) return null;
  const rivit = juuri.querySelector('.pallolauta-viuhka-rivit');
  const pohjat = [...juuri.querySelectorAll('.pallolauta-viuhka-pohja')];
  const sisin = pohjat[pohjat.length - 1];
  const b = rivit.getBBox();
  const laatikko = {
    x: Number(sisin.getAttribute('x')),
    y: Number(sisin.getAttribute('y')),
    w: Number(sisin.getAttribute('width')),
    h: Number(sisin.getAttribute('height')),
  };
  const tyyli = getComputedStyle(sisin);
  const kuori = juuri.closest('.pallolauta-nosto');
  const kr = kuori.getBoundingClientRect();
  const pr = rivit.getBoundingClientRect();
  const sr = sisin.getBoundingClientRect();
  // Muiden nostojen näkyvä muste pohjan laatikon alla.
  const alla = [];
  for (const el of document.querySelectorAll('.pallolauta-nosto, .pallolauta-aihemerkki')) {
    if (el === kuori) continue;
    const t = getComputedStyle(el);
    if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) < 0.05) continue;
    const r = el.getBoundingClientRect();
    if (!(r.width > 0)) continue;
    if (r.left < sr.right && sr.left < r.right && r.top < sr.bottom && sr.top < r.bottom) {
      alla.push({ nimio: el.dataset.nimio ?? '', nosto: el.dataset.nosto ?? el.dataset.aihe ?? '' });
    }
  }
  return {
    peitot: pohjat.map((r) => Number(r.getAttribute('fill-opacity'))),
    marginaalit: {
      vasen: b.x - laatikko.x,
      oikea: (laatikko.x + laatikko.w) - (b.x + b.width),
      yla: b.y - laatikko.y,
      ala: (laatikko.y + laatikko.h) - (b.y + b.height),
    },
    // Kirjasin ruudulla: rivin oma skaala × nimiön kirjasinkoko (11).
    fontti: (() => {
      const kuva = rivit.querySelector('.pallolauta-viuhka-kuva');
      const s2 = /scale\(([-\d.]+)\)/.exec(kuva?.style.transform ?? '');
      return s2 ? Number(s2[1]) * 11 : null;
    })(),
    suodatin: `${tyyli.filter}|${tyyli.backdropFilter}`,
    alla,
    ruutulaatikko: {
      x0: sr.left, y0: sr.top, x1: sr.right, y1: sr.bottom,
    },
    kuori: { x: kr.left, y: kr.top },
    rivitRuudulla: {
      x0: pr.left, y0: pr.top, x1: pr.right, y1: pr.bottom,
    },
  };
});
if (!dom) {
  console.log('FAIL  liuskaa ei löytynyt DOMista');
  await selain.close(); palvelin.close(); process.exit(1);
}
const yhteispeitto = 1 - dom.peitot.reduce((a, v) => a * (1 - v), 1);
tieto('pohjan vyöt', `${dom.peitot.map((v) => p(v)).join(' / ')} → yhteispeitto ${p(yhteispeitto, 3)}`);
vaadi('15a1. pohjan alfa on 0,80-0,85 (läpikuultava, ei umpinainen)',
  yhteispeitto > 0.795 && yhteispeitto < 0.855, `yhteispeitto ${p(yhteispeitto, 3)}`);
vaadi('15a3. pohjassa ei ole suodatinta (iOS-sääntö)',
  /^none\|(none|)$/.test(dom.suodatin), dom.suodatin);

const m = dom.marginaalit;
const arvot = [m.vasen, m.oikea, m.yla, m.ala];
const ero = Math.max(...arvot) - Math.min(...arvot);
const tavoite = 0.8 * (dom.fontti ?? 0);
tieto('pohjan marginaalit (px)', `vasen ${p(m.vasen)} · oikea ${p(m.oikea)} · ylä ${p(m.yla)} · ala ${p(m.ala)}`
  + ` — kirjasin ${p(dom.fontti)} px, tavoite ${p(tavoite)} px`);
vaadi('15b. neljä marginaalia ovat samat (±1 px)', ero <= 1, `ero ${p(ero)} px`);
vaadi('15b. marginaali on 0,8 × kirjasin (±1 px)',
  Math.abs(arvot.reduce((a, v) => a + v, 0) / 4 - tavoite) <= 1,
  `keskiarvo ${p(arvot.reduce((a, v) => a + v, 0) / 4)} vs ${p(tavoite)}`);
vaadi('14v. liuskan pohjan alla ei ole toisen noston näkyvää mustetta',
  dom.alla.length === 0, dom.alla.map((a) => `${a.nosto}"${a.nimio}"`).join(', '));

/* ── 15a2: kontrasti kaappauksesta ─────────────────────────────── */
const kuva = await sivu.screenshot({ type: 'png' });
const kontrasti = await sivu.evaluate(async ({ b64, laatikko, dpr }) => {
  const img = new Image();
  await new Promise((ok, ei) => { img.onload = ok; img.onerror = ei; img.src = `data:image/png;base64,${b64}`; });
  const c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  c.getContext('2d').drawImage(img, 0, 0);
  const x0 = Math.round(laatikko.x0 * dpr);
  const y0 = Math.round(laatikko.y0 * dpr);
  const w = Math.round((laatikko.x1 - laatikko.x0) * dpr);
  const h = Math.round((laatikko.y1 - laatikko.y0) * dpr);
  const data = c.getContext('2d').getImageData(x0, y0, w, h).data;
  const kanava = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const lumi = [];
  const savyt = new Map();
  for (let i = 0; i < data.length; i += 4) {
    lumi.push(0.2126 * kanava(data[i]) + 0.7152 * kanava(data[i + 1]) + 0.0722 * kanava(data[i + 2]));
    const avain = `${data[i] >> 2},${data[i + 1] >> 2},${data[i + 2] >> 2}`;
    savyt.set(avain, (savyt.get(avain) ?? 0) + 1);
  }
  lumi.sort((a, b) => a - b);
  const prosentti = (q) => lumi[Math.min(lumi.length - 1, Math.floor(q * lumi.length))];
  let yleisin = null; let maara = 0;
  for (const [avain, n] of savyt) if (n > maara) { maara = n; yleisin = avain; }
  const [r, g, b] = yleisin.split(',').map((v) => Number(v) * 4 + 2);
  const pohjaLumi = 0.2126 * kanava(r) + 0.7152 * kanava(g) + 0.0722 * kanava(b);
  const musteLumi = prosentti(0.02);
  return {
    pohja: { r, g, b, lumi: pohjaLumi },
    muste: musteLumi,
    suhde: (Math.max(pohjaLumi, musteLumi) + 0.05) / (Math.min(pohjaLumi, musteLumi) + 0.05),
    pikselit: lumi.length,
  };
}, { b64: kuva.toString('base64'), laatikko: dom.ruutulaatikko, dpr: 2 });
tieto('pohjan sävy kaappauksesta', `rgb(${kontrasti.pohja.r}, ${kontrasti.pohja.g}, ${kontrasti.pohja.b})`
  + ` (paperi on rgb(239, 220, 180)) — ${kontrasti.pikselit} pikseliä`);
vaadi('15a2. musteen ja pohjan kontrasti ≥ 4,5:1 kaappauksesta',
  kontrasti.suhde >= 4.5, `${p(kontrasti.suhde)}:1`);
tieto('kontrasti', `${p(kontrasti.suhde)}:1 (pohja L ${p(kontrasti.pohja.lumi, 3)}, muste L ${p(kontrasti.muste, 3)})`);
vaadi('15a1b. pohja EI ole puhdas paperi (kartta kuultaa läpi)',
  Math.abs(kontrasti.pohja.r - 239) + Math.abs(kontrasti.pohja.g - 220)
    + Math.abs(kontrasti.pohja.b - 180) > 6,
  `rgb(${kontrasti.pohja.r}, ${kontrasti.pohja.g}, ${kontrasti.pohja.b})`);

/* ── 15c: syvin zoomi ennen ja jälkeen ─────────────────────────── */
const zoomi = await sivu.evaluate(async () => {
  const k = await import('/js/pallolauta/kamera.js');
  const n = await import('/js/pallolauta/nostot.js');
  const l = window.matkakirja.ui.pallolauta;
  const kotelo = l.pallo.renderer().domElement.getBoundingClientRect();
  const kuvasuhde = kotelo.width / kotelo.height;
  const syvennys = k.lahizoominSyvennys({ leveysPx: kotelo.width, dpr: window.devicePixelRatio });
  const ennen = k.lahinKorkeus({ kuvasuhde, syvennys: 1 });
  const jalkeen = k.lahinKorkeus({ kuvasuhde, syvennys });
  const leveys = (h) => k.leveysKorkeudesta(h, { kuvasuhde });
  const pov = l.pallo.pointOfView();
  const mittaa = async (korkeus) => {
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: korkeus }, 0);
    await new Promise((ok) => setTimeout(ok, 1400));
    const merkit = [...document.querySelectorAll('.pallolauta-nosto:not(.pallolauta-nosto-ankkuri)')]
      .map((el) => {
        const g = el.querySelector('.pallolauta-nosto-siirto');
        const s = /scale\(([-\d.]+)\)/.exec(g?.style.transform ?? '');
        const kuva = el.querySelector('image, svg image');
        const r = kuva?.getBoundingClientRect?.() ?? null;
        return {
          mitta: s ? Number(s[1]) : null,
          kaupunki: el.classList.contains('pallolauta-nosto-kaupunki'),
          leveysPx: r ? r.width : null,
        };
      })
      .filter((x) => Number.isFinite(x.mitta));
    const pallot = [...document.querySelectorAll('.pallolauta-aihemerkki')].map((el) => {
      const g = el.querySelector('.pallolauta-aihemerkki-siirto');
      const s = /scale\(([-\d.]+)\)/.exec(g?.style.transform ?? '');
      return s ? Number(s[1]) : null;
    }).filter(Number.isFinite);
    const mitat = merkit.filter((x) => !x.kaupunki).map((x) => x.mitta);
    return {
      korkeus,
      leveysYks: leveys(korkeus),
      merkkeja: merkit.length,
      suurinMitta: mitat.length ? Math.max(...mitat) : null,
      nimioPx: mitat.length ? Math.max(...mitat) * n.NOSTON_MITTA * 0 + Math.max(...mitat) * 11 : null,
      merkinLeveysPx: merkit.length
        ? Math.max(...merkit.map((x) => x.leveysPx ?? 0)) : null,
      aihepallonMitta: pallot.length ? Math.max(...pallot) : null,
      karttaskaala: l.nakyvaAlue?.()?.skaala ?? null,
    };
  };
  // Saapumisnäkymä ensin: siitä luetaan poltetun merkin koko
  // (PAATOKSET 34 kohta 15 TILA), johon kasvua verrataan.
  const saapuen = await mittaa(pov.altitude);
  const a = await mittaa(ennen);
  const b = await mittaa(jalkeen);
  const ohj = l.pallo.controls?.();
  const sade = l.pallo.getGlobeRadius?.() ?? 1;
  return {
    syvennys,
    kuvasuhde,
    saapuen,
    ennen: a,
    jalkeen: b,
    minDistanceKorkeus: ohj ? (ohj.minDistance / sade) - 1 : null,
    katto: n.NOSTON_NIMIO_KATTO_PX,
  };
});
/*
 * PAATOKSET 34 kohta 15 TILA: elävä nosto on saapuessa TÄSMÄLLEEN
 * poltetun merkin kokoinen (nimiö 8,5 px, pallo 5,25 px = nimiö ×
 * 5,25/8,5, koska merkki ja nimiö ovat samassa rasterissa) ja kasvaa
 * kartan mukana kattoon asti.
 */
const POLTETTU_NIMIO_PX = 8.5;
const PALLON_OSUUS = 5.25 / 8.5;
const pallo = (nimioPx) => (Number.isFinite(nimioPx) ? nimioPx * PALLON_OSUUS : NaN);
tieto('saapumisnäkymä', `korkeus ${p(zoomi.saapuen.korkeus, 5)}`
  + ` · nimiö ${p(zoomi.saapuen.nimioPx)} px · pallo ${p(pallo(zoomi.saapuen.nimioPx))} px`
  + ` (${zoomi.saapuen.merkkeja} merkkiä)`);
vaadi('34k15. saapumisnäkymässä nimiö 8,5 px ja pallo 5,25 px (poltettu muste)',
  Number.isFinite(zoomi.saapuen.nimioPx)
    && Math.abs(zoomi.saapuen.nimioPx - POLTETTU_NIMIO_PX) < 0.6,
  `nimiö ${p(zoomi.saapuen.nimioPx)} px (tavoite ${POLTETTU_NIMIO_PX})`);
tieto('syvin zoomi ennen', `korkeus ${p(zoomi.ennen.korkeus, 5)} · leveys ${p(zoomi.ennen.leveysYks)} lautayks.`
  + ` · skaala ${p(zoomi.ennen.karttaskaala, 3)} · nimiö ${p(zoomi.ennen.nimioPx)} px`
  + ` · merkin leveys ${p(zoomi.ennen.merkinLeveysPx)} px (${zoomi.ennen.merkkeja} merkkiä)`);
tieto('syvin zoomi jälkeen', `korkeus ${p(zoomi.jalkeen.korkeus, 5)} · leveys ${p(zoomi.jalkeen.leveysYks)} lautayks.`
  + ` · skaala ${p(zoomi.jalkeen.karttaskaala, 3)} · nimiö ${p(zoomi.jalkeen.nimioPx)} px`
  + ` · merkin leveys ${p(zoomi.jalkeen.merkinLeveysPx)} px (${zoomi.jalkeen.merkkeja} merkkiä)`);
tieto('syvennys', `${p(zoomi.syvennys, 2)} × (kuvasuhde ${p(zoomi.kuvasuhde, 3)}), `
  + `OrbitControlsin minDistance-korkeus ${p(zoomi.minDistanceKorkeus, 5)}`);
vaadi('15c. puhelin pääsee portaan (1,5×) syvemmälle kuin ennen',
  Math.abs(zoomi.ennen.leveysYks / zoomi.jalkeen.leveysYks - 1.5) < 0.05,
  `leveyssuhde ${p(zoomi.ennen.leveysYks / zoomi.jalkeen.leveysYks, 3)}`);
vaadi('15c. laudan zoomiraja (minDistance) seuraa syvennystä',
  Number.isFinite(zoomi.minDistanceKorkeus)
    && Math.abs(zoomi.minDistanceKorkeus - zoomi.jalkeen.korkeus) < 1e-4,
  `${p(zoomi.minDistanceKorkeus, 5)} vs ${p(zoomi.jalkeen.korkeus, 5)}`);
vaadi('15c. nimiön 16 px:n ruutukatto pitää syvimmässä zoomissa (PAATOKSET 31)',
  !Number.isFinite(zoomi.jalkeen.nimioPx) || zoomi.jalkeen.nimioPx <= zoomi.katto + 0.01,
  `${p(zoomi.jalkeen.nimioPx)} px > ${zoomi.katto} px`);
vaadi('34k15. nosto kasvaa kartan mukana saapumisesta syvimpään zoomiin',
  Number.isFinite(zoomi.jalkeen.nimioPx)
    && zoomi.jalkeen.nimioPx > zoomi.saapuen.nimioPx + 1,
  `saapuen ${p(zoomi.saapuen.nimioPx)} px → syvin ${p(zoomi.jalkeen.nimioPx)} px`);
vaadi('34k15. syvimmässä zoomissa nimiö seisoo katossa (16 px), pallo samassa suhteessa',
  Number.isFinite(zoomi.jalkeen.nimioPx)
    && Math.abs(zoomi.jalkeen.nimioPx - zoomi.katto) < 0.05,
  `nimiö ${p(zoomi.jalkeen.nimioPx)} px · pallo ${p(pallo(zoomi.jalkeen.nimioPx))} px`);
await kaappaa(`liuska-pohja-jalkeen-syvin-${LEVEYS}.png`);

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
