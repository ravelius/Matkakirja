#!/usr/bin/env node
/*
 * Savuke: LAATTA-AUKOT — epäonnistunut pyramidilaatta ei jää pysyväksi
 * aukoksi (Pelikoodari 27.9.2026, PR #3516; js/laattapyramidi.js
 * POHJAN_UUSINNAT, paikkaaLaatta, paikkaaKaikki).
 *
 *   node tools/savukkeet/savuke-laattaaukot.mjs [--juuri <checkout>]
 *        [--lauta kartta|pallo] [--siemen 1873] [--osuus 0.25]
 *        [--tausta-ms 8000] [--kuvat <kansio>]
 *
 * Omistaja 27.9.2026 klo 23.5x (iPad): *"karttavirhe palaa, vaikka olisi
 * aluksi näyttänyt kaiken oikein"*. Ennen korjausta epäonnistunut laatta
 * (SVG <image>, valmis(false)) menetti osoitteensa eikä sitä haettu
 * enää koskaan. Korjauksen jälkeen laatta, jonka luettelon bittikartta
 * takaa, uusitaan (?r=n, 2 kertaa), ja jos uusinnatkin kaatuvat, se saa
 * merkinnän data-virhe ja paikataan seuraavassa päivityksessä tai
 * paluussa näkyviin (?p=aika).
 *
 * === ENNEN JA JÄLKEEN SAMALLA KOMENNOLLA ============================
 *
 * `--juuri` on palveltava checkout (oletus: tämän tiedoston repo).
 * Versio tunnistetaan palveltavan checkoutin lähteestä: jos
 * js/laattapyramidi.js:ssä on `function paikkaaLaatta`, ajo on JÄLKEEN,
 * muuten ENNEN; mittariolion `uusittu`-kentän olemassaolo kirjataan
 * rinnalle (ENNEN-versiossa sitä ei ole, ja luku tulostetaan '–').
 * Vaatimus AUKKOJA 0 koskee vain JÄLKEEN-ajoa; ENNEN-ajo tulostaa
 * luvun ja kaatuu vain, jos mittaus itse ei toiminut (ei laattoja tai
 * injektio ei osunut).
 *
 * === TÄMÄ AJAA OLETUKSENA TASOKARTAN ================================
 *
 * SVG-pyramidin <image>-laatat (g.laattapyramidi) elävät VAIN
 * tasokartalla (js/ui.js drawBoard), ja tasokartta on pelissä pois
 * käytöstä (js/ui-apurit.js VANHA_KARTTA_KAYTOSSA = false). Pallolla
 * laatat hakee js/pallolaatat.js omalla fetch-putkellaan eikä yhtään
 * SVG-laattaa synny. Siksi `--lauta kartta` (oletus) avaa portin
 * OMASSA PALVELIMESSAAN kuten savuke-varilaatat: `/js/ui-apurit.js`
 * tarjoillaan vakio muutettuna todeksi. Repossa vakio pysyy falsena.
 * `--lauta pallo` ajaa saman injektion pelin oikealla laudalla: SVG-
 * laattoja on silloin 0, ja pallon laattakerroksen peitto
 * (nakyviaScenessa / nakyvia, jumissa, katkaistu) tulostetaan INFO-
 * rivinä vertailuksi.
 *
 * === INJEKTIO =======================================================
 *
 * Kaikki ämpärin kuvat kulkevat Noden kautta (kuten muissa
 * karttasavukkeissa). Laattaosoitteet (…/z<n>/<x>/<y>.<muoto>):
 *   1. Jokaisen eri laatan (osoite ilman ?r/?p) ENSIMMÄINEN pyyntö
 *      katkaistaan `route.abort('failed')` noin --osuus todennäköisyydellä.
 *      Arpa on siemenen ja osoitteen tiiviste, joten sama laatta
 *      kaatuu kummassakin ajossa pyyntöjen järjestyksestä riippumatta.
 *   2. TAUSTAJAKSO keskellä ajoa: kamera siirtyy uuteen kohtaan, sivu
 *      "menee taustalle" (document.hidden = true, visibilitychange) ja
 *      --tausta-ms ajan KAIKKI laattapyynnöt katkaistaan — myös ne,
 *      jotka olivat jo matkalla (kuin Safari katkaisisi ne). Sitten
 *      document.hidden = false ja visibilitychange takaisin näkyväksi.
 *
 * === MITTA ==========================================================
 *
 * Lopuksi (12 s viimeisen liikkeen jälkeen) ruudulla olevat
 * g.laattapyramidi-kerrosten <image>-laatat (luokat pyramidi-pohjataso,
 * -tarkkataso, -varitaso, -rantataso, -viivataso, -nostotaso; ks.
 * js/laattapyramidi.js varmistaKerrokset). AUKKO = laatalla ei ole
 * href:iä TAI sillä on data-virhe, eikä se ole data-ladattu. Tavallinen
 * 404 (harvan kerroksen puuttuva laatta) ei ole aukko: jokaisen laatan
 * alkuperäinen osoite kirjataan luonnissa (MutationObserver,
 * data-mitta-osoite), ja Node tarkistaa ämpäristä, onko laatta olemassa.
 * Aukot kehystetään punaisella kuvakaappaukseen.
 *
 * Tulostus: `AUKKOJA n / laattoja m, epaonnistui x, uusittu y, paikattu z`.
 *
 * Laite: WebKit, iPad 834×1194 (DPR 2). Ajo kestää ~2 min.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const JUURI = resolve(valitsin('juuri', process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')));
const LAUTA = valitsin('lauta', 'kartta');
const SIEMEN = Number(valitsin('siemen', '1873'));
const OSUUS = Number(valitsin('osuus', '0.25'));
const TAUSTA_MS = Number(valitsin('tausta-ms', '8000'));
const LOPPUODOTUS_MS = 12000;
/** Keinotekoinen verkon viive laatoille: pitää hakuja matkalla, jotta taustajakso osuu kesken olevaan. */
const VIIVE_MS = Number(process.env.VIIVE_MS ?? 60);
const ULOS = valitsin('kuvat', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/laattaaukot');
mkdirSync(ULOS, { recursive: true });
if (!['kartta', 'pallo'].includes(LAUTA)) { console.error('--lauta kartta|pallo'); process.exit(2); }
if (!existsSync(join(JUURI, 'js/laattapyramidi.js'))) { console.error(`Ei checkoutia: ${JUURI}`); process.exit(2); }

/* Versio palveltavasta lähteestä (ennen = origin/main ilman PR #3516:ta). */
const JALKEEN = readFileSync(join(JUURI, 'js/laattapyramidi.js'), 'utf8').includes('function paikkaaLaatta');
const VERSIO = JALKEEN ? 'jalkeen' : 'ennen';

const { Game } = await import(pathToFileURL(join(JUURI, 'js/game.js')).href);
const { packById } = await import(pathToFileURL(join(JUURI, 'js/pack.js')).href);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);

/* Tasokartan portti auki vain tämän savukkeen palvelimessa (ks. savuke-varilaatat). */
const PORTTI_AUKI = ['export const VANHA_KARTTA_KAYTOSSA = false;', 'export const VANHA_KARTTA_KAYTOSSA = true;'];
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.bin': 'application/octet-stream' };
const palvelin = http.createServer((req, res) => {
  const pyydetty = req.url.split('?')[0];
  const polku = join(JUURI, pyydetty === '/' ? 'index.html' : pyydetty);
  if (!polku.startsWith(JUURI) || !existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  if (LAUTA === 'kartta' && pyydetty === '/js/ui-apurit.js') {
    const lahde = readFileSync(polku, 'utf8');
    if (!lahde.includes(PORTTI_AUKI[0])) { console.error('VANHA_KARTTA_KAYTOSSA-vakiota ei löytynyt — tasokarttaa ei voi avata.'); process.exit(2); }
    res.end(lahde.replace(PORTTI_AUKI[0], PORTTI_AUKI[1]));
    return;
  }
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=${LAUTA}`;

/* Ämpäri Noden kautta; välimuisti osoitteittain (laatat ilman ?r/?p). */
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const LAATTA = /\/z\d+\/\d+\/\d+\.(webp|png|jpe?g|avif)(\?|$)/;
/** Laatan avain: osoite ilman uusinta- (r) ja paikkausparametria (p). */
const laatanAvain = (url) => {
  try {
    const u = new URL(url);
    u.searchParams.delete('r'); u.searchParams.delete('p');
    return u.toString();
  } catch { return url.replace(/[?&][rp]=\d+/g, ''); }
};
/** Siemenellinen arpa osoitteesta (FNV-1a), järjestyksestä riippumaton. */
const arpa = (avain) => {
  let h = (0x811c9dc5 ^ SIEMEN) >>> 0;
  for (let i = 0; i < avain.length; i += 1) { h ^= avain.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0; h ^= h >>> 13;
  return (h >>> 0) / 2 ** 32;
};
const nahdyt = new Set();
const laskurit = { laattapyyntoja: 0, arvottuKatkaisu: 0, taustaKatkaisu: 0, uusintaPyyntoja: 0, paikkausPyyntoja: 0 };
let tausta = false;

const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());
const kaupungit = Object.fromEntries((packById('maailmankartta').cities ?? []).map((c) => [c.id, { x: c.x, y: c.y }]));

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await paketti.webkit.launch();
const ctx = await selain.newContext({ viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => {
  localStorage.setItem('matkakirja-save-v1', d);
  localStorage.removeItem('matkakirja-lauta');
  /* Laatan alkuperäinen osoite talteen luonnissa (ENNEN-versio poistaa href:n virheessä). */
  new MutationObserver((muutokset) => {
    for (const m of muutokset) {
      for (const n of m.addedNodes) {
        if (n.localName === 'image' && n.classList?.contains('pyramidi-laatta') && !n.dataset.mittaOsoite) {
          n.dataset.mittaOsoite = n.getAttribute('href') ?? '';
        }
      }
    }
  }).observe(document, { childList: true, subtree: true });
  /* Taustalle ja takaisin: document.hidden + visibilitychange. */
  window.__taustalle = (piiloon) => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => piiloon });
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (piiloon ? 'hidden' : 'visible') });
    document.dispatchEvent(new Event('visibilitychange'));
  };
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
  const url = r.request().url();
  if (LAATTA.test(url)) {
    laskurit.laattapyyntoja += 1;
    if (/[?&]r=\d+/.test(url)) laskurit.uusintaPyyntoja += 1;
    if (/[?&]p=\d+/.test(url)) laskurit.paikkausPyyntoja += 1;
    const avain = laatanAvain(url);
    const ensimmainen = !nahdyt.has(avain);
    nahdyt.add(avain);
    if (tausta) { laskurit.taustaKatkaisu += 1; r.abort('failed'); return; }
    if (ensimmainen && arpa(avain) < OSUUS) {
      laskurit.arvottuKatkaisu += 1;
      void ampari(avain); // olemassaolo tiedetään mittausta varten
      r.abort('failed');
      return;
    }
    const v = await ampari(avain);
    if (VIIVE_MS) await new Promise((ok) => setTimeout(ok, VIIVE_MS));
    // Matkalla ollut haku katkeaa, jos sivu meni sillä välin taustalle.
    if (tausta) { laskurit.taustaKatkaisu += 1; r.abort('failed').catch(() => {}); return; }
    if (!v) { r.fulfill({ status: 404, body: '' }).catch(() => {}); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'image/webp', body: v.body, headers: { 'access-control-allow-origin': '*' } }).catch(() => {});
    return;
  }
  const v = await ampari(url);
  if (!v) { r.abort().catch(() => {}); return; }
  r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }).catch(() => {});
});
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());

console.log(`INFO  versio ${VERSIO.toUpperCase()} (${JUURI}), lauta ${LAUTA}, WebKit iPad 834×1194, siemen ${SIEMEN}, osuus ${OSUUS}, tausta ${TAUSTA_MS} ms`);
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2000);

/* ── LIIKE: pelin omat kamerakomennot, Eurooppa ~70 s ─────────────── */
const REITTI = [
  ['marseille', 1400], ['pariisi', 700], ['pariisi', 300], ['lontoo', 300], ['lontoo', 120],
  ['amsterdam', 300], ['berliini', 700], ['berliini', 160], ['praha', 300],
  /* ← taustajakso tässä välissä (TAUSTA_KOHTA) */
  ['wien', 300], ['wien', 120], ['budapest', 400], ['rooma', 700], ['rooma', 160],
  ['barcelona', 400], ['madrid', 250], ['lissabon', 700], ['marseille', 1400], ['pariisi', 300],
];
const TAUSTA_KOHTA = 9;
const PALLO_KORKEUS = (leveys) => Math.max(0.02, leveys / 3500);
const RAD = Math.PI / 180;
/* Pallolle kaupungin lat/lng pelin omasta muunnoksesta, jos sellainen on; muuten likiarvo Millerin lautakaavalla. */
const lautaLatLng = ({ x, y }) => {
  const SKAALA = 12000 / (2 * Math.PI);
  const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
  const Y0 = millerY(76);
  const lng = ((x / SKAALA) / RAD) - 175;
  const my = y / SKAALA + Y0;
  const lat = (2.5 * Math.atan(Math.exp(-my / 1.25)) - (5 * Math.PI) / 8) / RAD;
  return { lat, lng: ((lng + 540) % 360) - 180 };
};
const liiku = async (kaupunki, leveys, kesto = 900) => {
  const k = kaupungit[kaupunki];
  if (!k) return;
  if (LAUTA === 'kartta') {
    await sivu.evaluate(async ({ x, y, leveys: l, kesto: t }) => {
      const ui = window.matkakirja.ui;
      await ui.kartta?.ajaKamera?.({ x, y, leveys: l }, { kesto: t, pakota: true });
      ui.taydennaTaide?.();
    }, { ...k, leveys, kesto });
  } else {
    await sivu.evaluate(({ pov, kesto: t }) => {
      window.matkakirja.ui.pallolauta?.heraa?.();
      window.matkakirja.ui.pallonInstanssi?.pointOfView(pov, t);
    }, { pov: { ...lautaLatLng(k), altitude: PALLO_KORKEUS(leveys) }, kesto });
    await sivu.waitForTimeout(kesto + 100);
  }
};

if (LAUTA === 'kartta') {
  const valmis = await sivu.waitForFunction(() => {
    const ui = window.matkakirja?.ui;
    return Boolean(ui?.pyramidiKerros?.isConnected && typeof ui.kartta?.ajaKamera === 'function' && !ui.kartta.sijainen);
  }, null, { timeout: 60000 }).then(() => true).catch(() => false);
  vaadi('tasokartta heräsi (portti auki savukkeen palvelimessa)', valmis, 'ui.pyramidiKerros tai kartta.ajaKamera puuttuu');
} else {
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
}
await sivu.waitForTimeout(3000);

const alku = Date.now();
for (let i = 0; i < REITTI.length; i += 1) {
  if (i === TAUSTA_KOHTA) {
    // Uusi alue pyyntöön ja heti taustalle: matkalla olevat haut katkeavat.
    await liiku('wien', 700, 600);
    tausta = true;
    await sivu.evaluate(() => window.__taustalle(true));
    const t0 = Date.now();
    await sivu.waitForTimeout(TAUSTA_MS);
    tausta = false;
    await sivu.evaluate(() => window.__taustalle(false));
    console.log(`INFO  taustajakso ${Date.now() - t0} ms, katkaistuja tähän mennessä ${laskurit.taustaKatkaisu}`);
    await sivu.waitForTimeout(1500);
  }
  const [kaupunki, leveys] = REITTI[i];
  await liiku(kaupunki, leveys);
  await sivu.waitForTimeout(2800);
}
console.log(`INFO  liike ${Math.round((Date.now() - alku) / 1000)} s, odotetaan ${LOPPUODOTUS_MS / 1000} s`);
await sivu.waitForTimeout(LOPPUODOTUS_MS);

/* ── MITTA ─────────────────────────────────────────────────────────── */
const tulos = await sivu.evaluate(async () => {
  const w = window.innerWidth; const h = window.innerHeight;
  const piilossa = (e) => {
    for (let n = e; n && n.nodeType === 1; n = n.parentNode) {
      const s = getComputedStyle(n);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return true;
      if (n.classList?.contains('laattapyramidi')) break;
    }
    return false;
  };
  const laatat = [];
  for (const kuva of document.querySelectorAll('g.laattapyramidi image')) {
    const r = kuva.getBoundingClientRect();
    if (!(r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < w && r.top < h)) continue;
    if (kuva.dataset.peruttu === '1' || piilossa(kuva)) continue;
    const kerros = [...(kuva.parentNode?.classList ?? [])].find((c) => c.startsWith('pyramidi-')) ?? '?';
    const href = kuva.getAttribute('href') ?? kuva.getAttribute('xlink:href');
    const ehdokas = (!href || Boolean(kuva.dataset.virhe)) && kuva.dataset.ladattu !== '1';
    laatat.push({ kerros, taso: kuva.dataset.taso, ehdokas, osoite: kuva.dataset.mittaOsoite || null, virhe: Boolean(kuva.dataset.virhe) });
    if (ehdokas) kuva.dataset.mittaEhdokas = '1';
  }
  let m = globalThis.__pyramidinMittarit?.() ?? null;
  if (!m) { try { m = (await import('/js/laattapyramidi.js')).pyramidinMittarit(); } catch { m = null; } }
  const pallo = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
  return {
    laatat,
    mittarit: m ? { epaonnistui: m.epaonnistui ?? null, uusittu: 'uusittu' in m ? m.uusittu : null, paikattu: 'paikattu' in m ? m.paikattu : null, ladattu: m.ladattu ?? null, onUusittu: 'uusittu' in m } : null,
    pallo: pallo ? { nakyvia: pallo.nakyvia, scenessa: pallo.nakyviaScenessa, taysin: pallo.nakyviaTaysin, jumissa: pallo.jumissa, katkaistu: pallo.katkaistu, taso: pallo.taso, tila: pallo.tila } : null,
  };
});

/* 404-laatta ei ole aukko: olemassaolo ämpäristä. */
let aukkoja = 0; let puuttuvia = 0; let tuntemattomia = 0;
const aukot = [];
for (const l of tulos.laatat.filter((x) => x.ehdokas)) {
  if (!l.osoite) { tuntemattomia += 1; aukkoja += 1; aukot.push(l); continue; }
  const olemassa = Boolean(await ampari(laatanAvain(l.osoite)));
  if (olemassa) { aukkoja += 1; aukot.push(l); } else puuttuvia += 1;
}
/* Aukot punaisella kehyksellä kuvaan (vain ne, jotka ovat oikeasti aukkoja). */
await sivu.evaluate((osoitteet) => {
  const joukko = new Set(osoitteet);
  for (const kuva of document.querySelectorAll('g.laattapyramidi image[data-mitta-ehdokas="1"]')) {
    if (kuva.dataset.mittaOsoite && !joukko.has(kuva.dataset.mittaOsoite)) continue;
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    for (const a of ['x', 'y', 'width', 'height']) r.setAttribute(a, kuva.getAttribute(a));
    r.setAttribute('fill', 'rgba(255,0,0,0.15)'); r.setAttribute('stroke', '#e00'); r.setAttribute('stroke-width', '3');
    r.setAttribute('vector-effect', 'non-scaling-stroke');
    kuva.parentNode.appendChild(r);
  }
}, aukot.map((a) => a.osoite).filter(Boolean));
const kuva = join(ULOS, `laattaaukot-${VERSIO}-${LAUTA}.png`);
await sivu.screenshot({ path: kuva, timeout: 20000 }).then(() => console.log(`INFO  kuva ${kuva}`)).catch((e) => console.log(`INFO  kuvakaappaus epäonnistui: ${e.message.split('\n')[0]}`));

const m = tulos.mittarit ?? {};
const luku = (x) => (x == null ? '–' : String(x));
const laattoja = tulos.laatat.length;
console.log(`AUKKOJA ${aukkoja} / laattoja ${laattoja}, epaonnistui ${luku(m.epaonnistui)}, uusittu ${luku(m.uusittu)}, paikattu ${luku(m.paikattu)}`);
const kerroksittain = {};
for (const l of tulos.laatat) { const k = (kerroksittain[l.kerros] ??= { laattoja: 0, aukkoja: 0 }); k.laattoja += 1; }
for (const a of aukot) kerroksittain[a.kerros].aukkoja += 1;
console.log(`INFO  kerroksittain ${JSON.stringify(kerroksittain)}; 404-puuttuvia ${puuttuvia}, osoitteettomia aukkoja ${tuntemattomia}`);
if (aukot.length) console.log(`INFO  aukot: ${aukot.slice(0, 8).map((a) => `${a.kerros} z${a.taso}${a.virhe ? ' virhe' : ''} ${a.osoite?.split('/').slice(-3).join('/') ?? '?'}`).join(' | ')}`);
console.log(`INFO  verkko: laattapyyntöjä ${laskurit.laattapyyntoja}, arvottuja katkaisuja ${laskurit.arvottuKatkaisu}, taustakatkaisuja ${laskurit.taustaKatkaisu}, ?r-uusintoja ${laskurit.uusintaPyyntoja}, ?p-paikkauksia ${laskurit.paikkausPyyntoja}`);
console.log(`INFO  mittariolio: ${m.onUusittu ? 'uusittu-kenttä on (JÄLKEEN)' : 'ei uusittu-kenttää (ENNEN)'}; lähteen tunnistus ${VERSIO.toUpperCase()}`);
if (tulos.pallo) console.log(`INFO  pallon laattakerros: näkyviä ${tulos.pallo.nakyvia}, scenessä ${tulos.pallo.scenessa}, täysin ${tulos.pallo.taysin}, jumissa ${tulos.pallo.jumissa}, katkaisija ${tulos.pallo.katkaistu ? 'AUKI' : 'kiinni'}, taso ${tulos.pallo.taso}, tila ${tulos.pallo.tila}`);
if (virheet.length) console.log(`INFO  sivuvirheitä ${virheet.length}: ${virheet.slice(0, 3).join(' | ')}`);

/* Mittauksen oma kunto: koskee molempia versioita. */
vaadi('injektio osui: arvottuja katkaisuja > 0', laskurit.arvottuKatkaisu > 0, `laattapyyntöjä ${laskurit.laattapyyntoja}`);
vaadi('taustajakso katkaisi laattapyyntöjä', laskurit.taustaKatkaisu > 0, 'yhtään laattaa ei ollut matkalla taustajakson aikana');
if (LAUTA === 'kartta') {
  vaadi('ruudulla on pyramidilaattoja (mittaus ei ole tyhjä)', laattoja > 0, 'g.laattapyramidi image ruudulla 0');
  vaadi('mittariolio luettiin', Boolean(tulos.mittarit), '__pyramidinMittarit puuttuu');
  vaadi('versiotunnistus: lähde ja mittariolio samaa mieltä', !tulos.mittarit || m.onUusittu === JALKEEN, `lähde ${VERSIO}, uusittu-kenttä ${m.onUusittu}`);
  if (JALKEEN) {
    vaadi('JÄLKEEN: AUKKOJA 0', aukkoja === 0, `${aukkoja} aukkoa ${laattoja} laatasta`);
  } else {
    console.log(`INFO  ENNEN: aukkoja ${aukkoja} (odotus > 0; ei vaatimusta)`);
  }
} else {
  console.log('INFO  --lauta pallo: SVG-pyramidia ei ole pallolla, AUKKOJA-vaatimus ei koske tätä ajoa');
}

await selain.close();
palvelin.close();
console.log(`${lapi}/${kaikki} OK`);
process.exit(lapi === kaikki ? 0 : 1);
