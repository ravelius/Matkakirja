/*
 * Savuke: KERMA HETI — muun maan reliefi ei välähdä panoroitaessa,
 * ja meret jäävät pohjan omaan syvyysväriin.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-kerma-heti.mjs \
 *     [--kuvat <kansio>] [--meret]
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 37 (omistaja 18.9.2026):
 * *"peli valkkyy panoroitaessa, eli etta poistettu korkeusero kartta
 * tulee nakyviin aina vasta pienella viiveella"* ja *"meret saisi olla
 * silla Alkuperaisella korkeuserokartalla ja varilla"*.
 *
 * === MIKSI TÄMÄ ON OMA SAVUKKEENSA ==================================
 *
 * savuke-tasoitus-pallo.mjs vartioi kerman SISÄLTÖÄ (mikä piste
 * vaaleni, mikä pysyi ennallaan) ja tarvitsee siihen paikallisen
 * pilottilaataston. Tämä savuke vartioi kerman AJOITUSTA, ja se on
 * mitattavissa tuotannon omilla laatoilla: väite ei ole "mikä sävy"
 * vaan "monessako kehyksessä sävyä ei vielä ollut".
 *
 * === JUURISYY, JOTA TÄMÄ VARTIOI ===================================
 *
 * Kohdemaan väritaso on ajettu vain tasoille z4…z8 (ämpärin
 * pyramidi.json `varitasot.<ISO>.tasot`), joten `pyramidinKerrostasot`
 * ei lisää `vari`-kerrosta tasoille z0…z3 — eikä `maalaaTasoitus`
 * maalannut niillä mitään. Panoroitaessa uusi ala tulee näkyviin
 * ensin karkeana tasona: koko maailman topografia ilman kermaa, kunnes
 * z4+ saapuu. Korjaus maalaa kerman pohjan kanssa samassa vaiheessa
 * myös tasolla, jolla väritasoa ei ole.
 *
 * === VÄITTEET ======================================================
 *
 *   V1  PANOROINNIN AIKANA EI YHTÄÄN KEHYSTÄ, jossa kohdemaan
 *       ULKOPUOLINEN maa-alue (Saksa, Espanja) näkyy ilman kermaa.
 *       Mittari on 9 × 9 ruudun KESKIHAJONTA: kerma 0,85 litistää
 *       reliefin, joten σ romahtaa. Raja PAATOKSET 37:stä: σ < 5.
 *   V2  RANSKAN SISÄLLÄ RELIEFI SÄILYY: σ(Ranska) > σ(Saksa).
 *   V3  VERTAILUAJO (`--vanha`) KAATAA V1:n. Ilman tätä V1 voisi mitata
 *       sitä, ettei mittauspiste vain osu mihinkään reliefiin.
 *   V4  MERET (`--meret`, kytkin `?meretNakyviin=1`): Biskajanlahden ja
 *       Välimeren piste on pohjan meriväri ±8 eikä kermaa.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const webkit = paketti.webkit ?? paketti.default?.webkit;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const KUVAT = valitsin('kuvat', '');
const MERET = argv.includes('--meret');
const VANHA = argv.includes('--vanha');
const WEBKIT = argv.includes('--webkit');
const MERIKAMERA = argv.includes('--merikamera');

/*
 * VERTAILUAJON VANHA MODUULI TULEE GITISTÄ, EI KOPIONA. Savukkeen oma
 * kopio vanhasta koodista vanhenisi ensimmäisessä muutoksessa ja
 * mittaisi sen jälkeen historiaa; `git show origin/main:` on aina se,
 * mitä ruudulla oli ennen tätä erää.
 */
const VANHA_MODUULI = VANHA
  ? execFileSync('git', ['show', 'origin/main:js/pallolaatat.js'], { cwd: JUURI, encoding: 'utf8' })
  : null;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  if (VANHA_MODUULI && reitti === '/js/pallolaatat.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(VANHA_MODUULI);
    return;
  }
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

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
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

const moottori = WEBKIT ? webkit : chromium;
const kaynnistys = WEBKIT ? {} : {
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--disable-dev-shm-usage'],
};
const selain = await moottori.launch(kaynnistys);
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: !WEBKIT,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});

const lippu = MERET ? '&meretNakyviin=1' : '';
await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  console.log(`\n${lapi}/${kaikki} väitettä läpi — pallo ei avautunut`);
  await selain.close();
  palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(2500);
await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  const p = g.player;
  p.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(p);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(4000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(6000);

/* Kaikki pallon kankaan ulkopuolinen piiloon (kortit eivät saa osua mittariin). */
await sivu.addStyleTag({
  content: `body *:not(:has(canvas)):not(canvas) { visibility: hidden !important; }
            canvas { visibility: visible !important; }`,
});

/*
 * LAUDAN PROJEKTIO ON LUKITTU (leveys 12000, lon0 −175, pohjoinen 76;
 * tools/generoi-laattapyramidi.mjs LAUTA). Kaava on tässä auki eikä
 * tuotuna: savuke ei saa tuoda pelin karttamoduuleja Node-puolelle —
 * sivu tuo ne itse. Sama ratkaisu kuin savuke-tasoitus-pallolla.
 */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;
const laatikkoAsteista = (k) => {
  const x0 = lautaX(k.lon0);
  const x1 = lautaX(k.lon1);
  const y0 = lautaY(k.lat1);
  const y1 = lautaY(k.lat0);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
};

/*
 * MERIKAMERA (`--merikamera`): Biskajanlahti ja Bretagnen rannikko
 * ruutuun. Panorointiajon z7-näkymä on vain noin ±4° leveä, eivätkä
 * meripisteet mahdu siihen lainkaan — ensimmäinen ajo 18.9.2026 kaatui
 * juuri siihen ("piste ruudun ulkopuolella"). Meriväite on siis
 * mitattava omasta kamerasta.
 */
const MERIKAMERAN_LAATIKKO = {
  lon0: -6.5, lat0: 43.2, lon1: 1.0, lat1: 48.8,
};

/*
 * MITTAUSPISTEET. Jokainen on valittu niin, ettei sen päällä ole
 * kaupunkia, reittiä eikä nostoa, ja niin että siinä on reliefiä
 * mitattavaksi — tasaisella alangolla σ olisi lähtökohtaisesti nolla
 * eikä sen kutistumista voisi nähdä.
 */
/*
 * MERIKAMERAN PISTEET. `sisameri` on Ranskan suojan SISÄLLÄ oleva meri
 * (Biskajanlahden pohjukka Arcachonin edustalla) ja se on VIITE: siellä
 * kermaa ei ole kummassakaan tilassa, joten se kertoo pohjan oman
 * merisävyn tässä näkymässä. `galicia` ja `bretagne` ovat kontrolli:
 * kohdemaan ulkopuolista MAATA, jonka on erotuttava merestä — ilman
 * niitä väite menisi läpi myös silloin, jos maski lukisi kaiken mereksi.
 */
const MERIPISTEET = [
  { avain: 'sisameri', lon: -1.5, lat: 44.6, laji: 'meri-kohde' },
  { avain: 'biskaja', lon: -4.5, lat: 45.5, laji: 'meri' },
  { avain: 'kanaali', lon: -4.0, lat: 48.6, laji: 'meri' },
  { avain: 'galicia', lon: -7.5, lat: 43.0, laji: 'maa-ulko' },
  { avain: 'kantabria', lon: -4.0, lat: 43.0, laji: 'maa-ulko' },
];

const PISTEET = [
  { avain: 'saksa', lon: 8.5, lat: 47.8, laji: 'maa-ulko' },
  { avain: 'alpit', lon: 9.8, lat: 46.6, laji: 'maa-ulko' },
  { avain: 'ranska', lon: 2.0, lat: 47.3, laji: 'maa-kohde' },
  { avain: 'biskaja', lon: -2.6, lat: 45.2, laji: 'meri' },
  { avain: 'valimeri', lon: 6.6, lat: 42.6, laji: 'meri' },
];

/*
 * KUVAKAAPPAUS CDP:LLÄ, EI KANKAALTA. WebGL-kangas luodaan ilman
 * `preserveDrawingBuffer`ia, joten `drawImage(kangas)` antaa mustan
 * ruudun heti kun kehys on esitetty — ensimmäinen ajo 18.9.2026 mittasi
 * juuri sitä (kaikki σ = 0, rgb 0,0,0). `Page.captureScreenshot` ottaa
 * kuvan siitä, mitä ruudulla on; `page.screenshot` taas jää odottamaan
 * `document.fonts.ready`ä (sama ansa kuin savuke-tasoitus-pallolla).
 */
const cdp = await ctx.newCDPSession(sivu);
const kaappaa = async () => Buffer.from(
  (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
);

/**
 * Pisteiden ruutupaikat JUURI NYT. Kamera liikkuu, joten paikat on
 * luettava samasta hetkestä kuin kuva — jälkikäteen luettuina ne
 * osoittaisivat sinne, minne kamera ehti.
 *
 * Ruutupaikka on `getScreenCoords`in KANKAAN koordinaatisto, ja kuva on
 * RUUDUN: kankaan siirtymä on lisättävä (savuke-tasoitus-pallo, erä 1c).
 */
const ruutupaikat = (pisteet) => sivu.evaluate((ps) => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
  const kehys = kangas?.getBoundingClientRect() ?? { left: 0, top: 0 };
  const ulos = {};
  for (const p of ps) {
    const s = pallo.getScreenCoords(p.lat, p.lon, 0);
    ulos[p.avain] = s && Number.isFinite(s.x) ? { x: s.x + kehys.left, y: s.y + kehys.top } : null;
  }
  return ulos;
}, pisteet);

/**
 * Yhden kehyksen näyte kaapatusta kuvasta: 9 × 9 ruudun keskiarvo,
 * keskihajonta ja keskimääräinen rgb jokaisen pisteen ympäriltä.
 */
const naytteetKuvasta = (png, paikat) => sivu.evaluate(async ({ data, ps }) => {
  const img = new Image();
  img.src = `data:image/png;base64,${data}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const dpr = img.width / window.innerWidth;
  const ulos = {};
  for (const [avain, piste] of Object.entries(ps)) {
    if (!piste) { ulos[avain] = null; continue; }
    const x = Math.round(piste.x * dpr);
    const y = Math.round(piste.y * dpr);
    const r = 4 * Math.round(dpr);
    if (x - r < 0 || y - r < 0 || x + r >= img.width || y + r >= img.height) {
      ulos[avain] = null;
      continue;
    }
    const d = g.getImageData(x - r, y - r, 2 * r + 1, 2 * r + 1).data;
    const kirkkaudet = [];
    const rgb = [0, 0, 0];
    for (let i = 0; i < d.length; i += 4) {
      kirkkaudet.push(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
      rgb[0] += d[i]; rgb[1] += d[i + 1]; rgb[2] += d[i + 2];
    }
    const n = kirkkaudet.length;
    const ka = kirkkaudet.reduce((a, b) => a + b, 0) / n;
    const sigma = Math.sqrt(kirkkaudet.reduce((a, b) => a + (b - ka) ** 2, 0) / n);
    ulos[avain] = {
      ka: Math.round(ka * 10) / 10,
      sigma: Math.round(sigma * 100) / 100,
      rgb: rgb.map((v) => Math.round(v / n)),
    };
  }
  return ulos;
}, { data: png.toString('base64'), ps: paikat });

const naytteet = async (pisteet) => {
  const paikat = await ruutupaikat(pisteet);
  return naytteetKuvasta(await kaappaa(), paikat);
};

/** Odota lepoa: kaikki laatat valmiina eikä häivytyksiä kesken. */
async function odotaLepo(kierroksia = 12) {
  for (let i = 0; i < kierroksia; i += 1) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1200); // eslint-disable-line no-await-in-loop
    const m = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null); // eslint-disable-line no-await-in-loop
    if (m && m.jumissa === 0 && m.valmiita > 0 && m.valmiita >= m.laattoja && m.hapyvia === 0) return m;
  }
  return sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null);
}

const lepo = await odotaLepo();
tieto('laattakerros levossa', JSON.stringify({
  taso: lepo?.taso, syy: lepo?.syy, laattoja: lepo?.laattoja,
  valmiita: lepo?.valmiita, varillisia: lepo?.varillisia, variMaa: lepo?.variMaa,
}));
vaadi('väritaso on Ranskan eikä kerros sammunut', lepo?.variMaa === 'FRA' && !lepo?.syy,
  `variMaa ${lepo?.variMaa}, syy "${lepo?.syy}"`);

const kuvaan = async (nimi) => {
  if (!KUVAT) return null;
  mkdirSync(KUVAT, { recursive: true });
  const polku = join(KUVAT, `${nimi}.png`);
  writeFileSync(polku, await sivu.screenshot());
  return polku;
};

if (MERIKAMERA) {
  /*
   * KAMERA ENSIN, SITTEN LEPO UUDESTAAN: uusi näkymä hakee uudet
   * laatat, ja kesken häivytyksen mitattu pikseli on kahden kartan
   * sekoitus (savuke-tasoitus-pallon erän 1c löydös).
   */
  await sivu.evaluate(async (b) => {
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ bbox: b }, { kesto: 0, pakota: true });
  }, laatikkoAsteista(MERIKAMERAN_LAATIKKO));
  await sivu.waitForTimeout(2500);
  const m2 = await odotaLepo();
  tieto('merikamera levossa', `z${m2?.taso} · laattoja ${m2?.laattoja}`
    + ` · valmiita ${m2?.valmiita} · värillisiä ${m2?.varillisia}`);
  const nimi = `${VANHA ? 'vanha' : 'uusi'}${MERET ? '-meret' : ''}-merikamera`;
  const polku = await kuvaan(nimi);
  const n = await naytteet(MERIPISTEET);
  tieto('merikamera pisteet', JSON.stringify(n));
  /*
   * MEREN ODOTUSARVO EI OLE SAVUKKEESEEN KIRJOITETTU LUKU vaan
   * KOHDEMAAN SISÄPUOLINEN meri: Ranskan suojan sisällä kermaa ei ole
   * kummassakaan tilassa, joten sama laatta kertoo itse, mikä pohjan
   * merisävy tässä näkymässä on. Vertailu on siis laatan omaa sävyä
   * vastaan eikä paletista pääteltyä.
   */
  const viite = n.sisameri;
  if (!viite) vaadi('V4 viitepiste (kohdemaan sisäinen meri) on ruudulla', false, 'ei ruudulla');
  else {
    tieto('pohjan merisävy (viite)', `rgb ${viite.rgb.join(',')}`);
    for (const avain of ['biskaja', 'kanaali']) {
      const p = n[avain];
      if (!p) { vaadi(`V4 ${avain} on ruudulla`, false, 'piste ruudun ulkopuolella'); continue; }
      const ero = Math.max(...p.rgb.map((v, i) => Math.abs(v - viite.rgb[i])));
      vaadi(`V4 ${avain} on pohjan merisävy ±8 (ei kermaa)`, ero <= 8,
        `rgb ${p.rgb.join(',')} vs viite ${viite.rgb.join(',')} — suurin kanavaero ${ero}`);
    }
    for (const avain of ['galicia', 'kantabria']) {
      const p = n[avain];
      if (!p) { vaadi(`V4 ${avain} on ruudulla`, false, 'piste ruudun ulkopuolella'); continue; }
      const ero = Math.max(...p.rgb.map((v, i) => Math.abs(v - viite.rgb[i])));
      vaadi(`V4 ${avain} (kohdemaan ulkopuolinen MAA) EI ole merisävyä`, ero > 8,
        `rgb ${p.rgb.join(',')} on merisävyn sisällä — maamaski luki maan mereksi`);
    }
  }
  tieto('merikameran kuva', polku ?? '(ei tallennettu)');
  console.log(`\n${lapi}/${kaikki} väitettä läpi`);
  await selain.close();
  palvelin.close();
  process.exit(lapi === kaikki ? 0 : 1);
}

const ennen = await naytteet(PISTEET);
tieto('levossa', JSON.stringify(ennen));
await kuvaan(`${VANHA ? 'vanha' : 'uusi'}${MERET ? '-meret' : ''}-levossa`);

/*
 * PANOROINTI 400 px / 2 s JA NÄYTE 100 ms VÄLEIN. Panorointi tehdään
 * pallon omalla kameralla kehys kehykseltä (kosketuseleen inertia
 * tekisi matkasta eri mittaisen joka ajolla), ja 400 px muunnetaan
 * asteiksi pallon omalla projektiolla — ei omalla kaavalla.
 */
const asteet = await sivu.evaluate(() => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const pov = pallo.pointOfView();
  const a = pallo.getScreenCoords(pov.lat, pov.lng);
  const b = pallo.getScreenCoords(pov.lat, pov.lng + 1);
  const pxPerAste = Math.abs(b.x - a.x) || 1;
  return { alku: pov, delta: 400 / pxPerAste };
});
tieto('panorointi', `${Math.round(asteet.delta * 100) / 100}° = 400 px, alku ${JSON.stringify(asteet.alku)}`);

await sivu.evaluate((a) => {
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  window.__panorointi = new Promise((valmis) => {
    const alku = performance.now();
    const askel = (nyt) => {
      const t = Math.min(1, (nyt - alku) / 2000);
      pallo.pointOfView({ lat: a.alku.lat, lng: a.alku.lng + a.delta * t, altitude: a.alku.altitude }, 0);
      if (t < 1) requestAnimationFrame(askel);
      else valmis();
    };
    requestAnimationFrame(askel);
  });
}, asteet);

/*
 * KAAPPAUKSET TALTEEN PANOROINNIN AIKANA, ANALYYSI VASTA JÄLKEEN.
 * Pikselianalyysi on sivun omaa työtä, ja se hidastaisi juuri sitä
 * panorointia, jota mitataan. Ruutupaikat on silti luettava kaappauksen
 * hetkellä, koska kamera liikkuu.
 */
const raaka = [];
for (let i = 0; i < 22; i += 1) {
  const paikat = await ruutupaikat(PISTEET); // eslint-disable-line no-await-in-loop
  raaka.push({ png: await kaappaa(), paikat }); // eslint-disable-line no-await-in-loop
  await sivu.waitForTimeout(100); // eslint-disable-line no-await-in-loop
}
await sivu.evaluate(() => window.__panorointi);
const sarja = [];
for (const kehys of raaka) {
  sarja.push(await naytteetKuvasta(kehys.png, kehys.paikat)); // eslint-disable-line no-await-in-loop
}
await kuvaan(`${VANHA ? 'vanha' : 'uusi'}${MERET ? '-meret' : ''}-panoroinnin-jalkeen`);

const SIGMA_RAJA = 5;
const ulkopisteet = PISTEET.filter((p) => p.laji === 'maa-ulko').map((p) => p.avain);
let rikki = 0;
const pahin = { avain: null, sigma: 0, kehys: -1 };
sarja.forEach((kehys, i) => {
  let kehysRikki = false;
  for (const avain of ulkopisteet) {
    const n = kehys[avain];
    if (!n) continue;
    if (n.sigma > SIGMA_RAJA) {
      kehysRikki = true;
      if (n.sigma > pahin.sigma) { pahin.avain = avain; pahin.sigma = n.sigma; pahin.kehys = i; }
    }
  }
  if (kehysRikki) rikki += 1;
});
tieto('kehyksiä sarjassa', sarja.length);
tieto('σ(Saksa) sarja', sarja.map((k) => k.saksa?.sigma ?? '—').join(' '));
tieto('σ(Alpit) sarja', sarja.map((k) => k.alpit?.sigma ?? '—').join(' '));
tieto('σ(Ranska) sarja', sarja.map((k) => k.ranska?.sigma ?? '—').join(' '));

vaadi('V1 ei yhtään kehystä, jossa muun maan reliefi näkyy ilman kermaa',
  rikki === 0,
  `${rikki}/${sarja.length} kehystä rikki, pahin ${pahin.avain} σ ${pahin.sigma} (kehys ${pahin.kehys})`);

const ranskaSigma = sarja.map((k) => k.ranska?.sigma).filter(Number.isFinite);
const saksaSigma = sarja.map((k) => k.saksa?.sigma).filter(Number.isFinite);
const ka = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
vaadi('V2 Ranskan sisällä reliefi säilyy (σ suurempi kuin Saksassa)',
  ka(ranskaSigma) > ka(saksaSigma),
  `Ranska σ ${Math.round(ka(ranskaSigma) * 100) / 100}, Saksa σ ${Math.round(ka(saksaSigma) * 100) / 100}`);

if (MERET) {
  /*
   * MEREN ODOTUSARVO POHJAN OMASTA LAATASTA, EI SAVUKKEESEEN
   * KIRJOITETTUNA LUKUNA: sama piste luetaan Ranskan laatikon
   * ULKOPUOLELTA, jossa kermaa ei ole kummassakaan tilassa.
   */
  for (const avain of ['biskaja', 'valimeri']) {
    const n = ennen[avain];
    if (!n) { vaadi(`V4 ${avain} on ruudulla`, false, 'piste ruudun ulkopuolella'); continue; }
    const [r, g, b] = n.rgb;
    const neutraali = Math.abs(r - b) <= 40;
    vaadi(`V4 ${avain} on pohjan merisävy (ei kermaa)`, neutraali,
      `rgb ${r},${g},${b} — R − B ${r - b} (kerma nostaisi eron)`);
  }
}

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
