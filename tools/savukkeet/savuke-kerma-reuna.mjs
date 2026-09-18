/*
 * Savuke: KERMAN LAATIKON REUNA — tasoituskerman peitto on sama
 * suojasuorakaiteen molemmin puolin, eivätkä meret saa kermaa
 * laatikon sisälläkään.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-kerma-reuna.mjs \
 *     [--kuvat <kansio>] [--vanha]
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 37 TARKENNUS (omistaja
 * 18.9.2026 klo 15.05, työpöytäkuva v1941:n Ranskan saapumisnäkymästä,
 * sanatarkasti): *"kartta nakyy vaarin ranskan ymparistossa"* — kerma
 * peitti vain suojasuorakaiteen sisäpuolen, laatikon vino kova reuna
 * näkyi ruudulla, ja laatikon sisällä myös Kanaali ja Välimeri olivat
 * kerman vaaleita.
 *
 * === MIKSI TÄMÄ ON OMA SAVUKKEENSA =================================
 *
 * savuke-kerma-heti.mjs vartioi kerman AJOITUSTA (välkkyykö
 * panoroitaessa), ja kaikki sen mittauspisteet ovat sattumalta saman
 * laatikon sisäpuolella — juuri siksi se oli vihreä silloinkin, kun
 * laatikon ulkopuolella ei ollut kermaa lainkaan. Tämä savuke vartioi
 * kerman PAIKKAA: se mittaa PARIT laatikon reunan kahta puolta ja
 * vaatii, että ero on olematon.
 *
 * === JUURISYY, JOTA TÄMÄ VARTIOI ===================================
 *
 * Kerma tuli kahdesta eri lähteestä, joiden raja oli suojasuorakaide:
 * sisäpuolella värilaatan poltettu kuva (leikkuri maalaa kerman myös
 * MERTEN päälle) ja ulkopuolella pelin oma maamaski. Kaksi lähdettä ei
 * voi kohdata saumattomasti. Korjaus maalaa kerman maamaskilla koko
 * laatalle ja palauttaa kohdemaan renkaiden sisuksen alkuperäiseksi
 * (js/pallolaatat.js maalaaKermaRenkaidenUlkopuolelle) — suorakaidetta
 * ei ole enää maalauksessa olemassa.
 *
 * === VÄITTEET ======================================================
 *
 *   V1  MAAN KIRKKAUS EI HYPPÄÄ LAATIKON REUNALLA: Saksan maa-alue
 *       0,26° reunan kummallakin puolella, |Δ kirkkaus| < 5.
 *   V2  LEVEÄ PARI (Saksa 8,7° ja 10,4°) samoin < 5 — reuna ei siirry
 *       vain vähän vaan on poissa.
 *   V3  POHJOISREUNA on TIETO eikä väite: pari Ardennit / Noord-Brabant
 *       mittasi maaston kylläisyyttä eikä laatikon reunaa (sama ero
 *       ennen korjausta ja sen jälkeen) — ks. perustelu alempaa.
 *   V4  MERI EI SAA KERMAA LAATIKON SISÄLLÄ: Kanaali (suojan sisällä)
 *       on sama sävy kuin Pohjanmeri (suojan ulkopuolella), suurin
 *       kanavaero < 5.
 *   V5  KOHDEMAA ENNALLAAN: Ranskan Massif Centralin σ on suurempi
 *       kuin kummankaan Saksan pisteen — reliefi on kerman alla vain
 *       kohdemaassa.
 *   V7  NAAPURIN POLTETTU MUSTE kerman alla on TIETO (mitattu kontrasti
 *       kirjataan) kunnes omistaja on päättänyt keinon — Fablen
 *       toimeksianto 18.9.2026 klo 15.20.
 *   V6  PISTEET OVAT OIKEALLA PUOLELLA SUOJAA: jokainen piste
 *       luokitellaan pelin OMASTA suojasta (pyramidinTasoitus), ei
 *       savukkeeseen kirjoitetusta laatikosta.
 *
 * Kaksi ruutua yhdessä ajossa: 1400 × 900 (työpöytä, dpr 2) ja
 * 390 × 844 (puhelin, dpr 3). Kamera ajetaan molemmilla SAMAAN
 * laatikkoon saapumisen jälkeen, jotta pisteet ovat ruudulla ja luvut
 * ovat vertailukelpoisia.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
/*
 * SELAINMOOTTORI ON LIPULLA (hotfix 18.9.2026). Sama savuke ajetaan
 * sekä Chromiumilla että WebKitillä, koska v1942:n kerma oli
 * Chromiumilla oikein mutta omistajan iPhonella (Safari/WebKit) rikki:
 * kohdemaan sisus merenvärinen, kerma vaakaraitoina. Vain Chromiumilla
 * vartioitu kerma ei siis ole vartioitu kerma.
 */
const MOOTTORI = process.argv.includes('--webkit') ? 'webkit' : 'chromium';
const chromium = paketti[MOOTTORI] ?? paketti.default?.[MOOTTORI];

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const KUVAT = valitsin('kuvat', '');
const VANHA = argv.includes('--vanha');

/*
 * VERTAILUAJON VANHAT MODUULIT TULEVAT GITISTÄ, EI KOPIONA (sama
 * ratkaisu kuin savuke-kerma-heti). Kerma asuu kahdessa tiedostossa —
 * maalaus pallolaatoissa, renkaat laattapyramidissa — joten vanha ajo
 * tarvitsee molemmat.
 */
const VANHAT = VANHA ? {
  '/js/pallolaatat.js': execFileSync('git', ['show', 'origin/main:js/pallolaatat.js'], { cwd: JUURI, encoding: 'utf8' }),
  '/js/laattapyramidi.js': execFileSync('git', ['show', 'origin/main:js/laattapyramidi.js'], { cwd: JUURI, encoding: 'utf8' }),
} : null;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  if (VANHAT?.[reitti]) {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(VANHAT[reitti]);
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

/* Ämpäri Noden kautta: CORS estää 127.0.0.1:n suoran haun. */
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

/*
 * MITTAUSPISTEET. Ranskan renkaiden laatikko ulottuu Korsikan takia
 * itään 9,56°:een ja Dunkerquen takia pohjoiseen 51,09°:een. Parit on
 * valittu niin, että MOLEMMAT puolet ovat samaa maata ja samanlaista
 * maastoa — silloin ero voi tulla vain kermasta.
 */
/*
 * KAKSI KAMERAA, KOSKA YKSI EI MAHDU PUHELIMEEN. Ensimmäinen ajo
 * 18.9.2026 yritti mitata kaikki parit yhdestä laajasta laatikosta:
 * työpöydällä se toimi, mutta puhelimen 390 × 844 rajaa näkymän
 * laatikon KORKEUDESTA, jolloin itäreunan pisteet jäivät ruudun
 * ulkopuolelle (neljä väitettä kaatui "ei ollut ruudulla"). Laatikot
 * on siksi mitoitettu niin, että molemmat kuvasuhteet näyttävät kaikki
 * oman kameransa pisteet.
 */
const KAMERAT = [
  {
    nimi: 'ita',
    laatikko: {
      lon0: 8.3, lat0: 45.8, lon1: 10.9, lat1: 51.0,
    },
    pisteet: [
      { avain: 'reuna-sisa', lon: 9.3, lat: 49.6, laji: 'maa-ulko' },
      { avain: 'reuna-ulko', lon: 9.82, lat: 49.6, laji: 'maa-ulko' },
      { avain: 'saksa-sisa', lon: 8.7, lat: 49.6, laji: 'maa-ulko' },
      { avain: 'saksa-ulko', lon: 10.4, lat: 49.6, laji: 'maa-ulko' },
      { avain: 'muste-sveitsi-sisa', lon: 8.57, lat: 46.56, laji: 'muste' },
      { avain: 'muste-italia-ulko', lon: 10.4, lat: 45.9, laji: 'muste' },
    ],
  },
  {
    nimi: 'laaja',
    laatikko: {
      lon0: -2.0, lat0: 44.0, lon1: 5.0, lat1: 54.0,
    },
    pisteet: [
      { avain: 'belgia-sisa', lon: 4.6, lat: 50.6, laji: 'maa-ulko' },
      { avain: 'hollanti-ulko', lon: 4.6, lat: 51.9, laji: 'maa-ulko' },
      { avain: 'kanaali-sisa', lon: -1.2, lat: 49.9, laji: 'meri' },
      { avain: 'pohjanmeri-ulko', lon: 3.2, lat: 53.2, laji: 'meri' },
      { avain: 'ranska', lon: 2.6, lat: 45.4, laji: 'maa-kohde' },
    ],
  },
];

/* Laudan projektio auki (tools/generoi-laattapyramidi.mjs LAUTA). */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;
const laatikkoAsteista = (k) => ({
  x: lautaX(k.lon0),
  y: lautaY(k.lat1),
  w: lautaX(k.lon1) - lautaX(k.lon0),
  h: lautaY(k.lat0) - lautaY(k.lat1),
});

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await (MOOTTORI === 'webkit'
  ? chromium.launch()
  : chromium.launch({
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--disable-dev-shm-usage'],
  }));

const RUUDUT = [
  { nimi: 'tyopoyta', leveys: 1400, korkeus: 900, dpr: 2 },
  { nimi: 'puhelin', leveys: 390, korkeus: 844, dpr: 3 },
];

const kuvaan = async (sivu, nimi) => {
  if (!KUVAT) return null;
  mkdirSync(KUVAT, { recursive: true });
  const polku = join(KUVAT, `${nimi}.png`);
  writeFileSync(polku, await sivu.screenshot());
  return polku;
};

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${MOOTTORI} ${ruutu.nimi} ${ruutu.leveys} × ${ruutu.korkeus} (dpr ${ruutu.dpr}) ===`);
  const ctx = await selain.newContext({
    viewport: { width: ruutu.leveys, height: ruutu.korkeus },
    hasTouch: ruutu.leveys < 768,
    // isMobile ei ole WebKitissä tuettu (Playwright heittää).
    ...(MOOTTORI === 'webkit' ? {} : { isMobile: ruutu.leveys < 768 }),
    deviceScaleFactor: ruutu.dpr,
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

  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: pallolauta avautuu`, auki);
  if (!auki) { await ctx.close(); continue; }
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
   * V6: PISTEIDEN PUOLI LUETAAN PELIN OMASTA SUOJASTA. Savukkeeseen
   * kirjoitettu laatikko vanhenisi ensimmäisessä aineistopäivityksessä
   * ja mittaisi sen jälkeen väärää reunaa.
   */
  const suoja = await sivu.evaluate(async () => {
    const m = await import('/js/laattapyramidi.js');
    const t = m.pyramidinTasoitus?.();
    return t ? {
      x: t.suoja.x, y: t.suoja.y, w: t.suoja.w, h: t.suoja.h, tarkka: Boolean(t.suoja.tarkka),
      renkaita: t.renkaat ? t.renkaat.length : 0, kerma: t.kerma, peitto: t.peitto,
    } : null;
  });
  tieto(`${ruutu.nimi}: suoja`, JSON.stringify(suoja));
  const kaikkiPisteet = KAMERAT.flatMap((k) => k.pisteet);
  if (suoja?.tarkka) {
    const sisalla = (p) => lautaX(p.lon) >= suoja.x && lautaX(p.lon) <= suoja.x + suoja.w
      && lautaY(p.lat) >= suoja.y && lautaY(p.lat) <= suoja.y + suoja.h;
    const vaarin = kaikkiPisteet.filter((p) => p.avain.includes('-sisa') !== sisalla(p)
      && (p.avain.includes('-sisa') || p.avain.includes('-ulko')));
    vaadi(`${ruutu.nimi}: V6 pisteet ovat suojan oikealla puolella`,
      vaarin.length === 0, vaarin.map((p) => p.avain).join(', '));
  }
  else vaadi(`${ruutu.nimi}: V6 suoja on tarkka (maapolygonit saapuneet)`, false, 'suoja on yhä laataston laatikko');

  /*
   * KUVAKAAPPAUS CDP:LLÄ, EI KANKAALTA: WebGL-kangas luodaan ilman
   * `preserveDrawingBuffer`ia (savuke-kerma-hetin oppi).
   */
  /* CDP on Chromiumin oma; WebKitillä sama kuva tulee sivun kaappauksena. */
  const cdp = MOOTTORI === 'webkit' ? null : await ctx.newCDPSession(sivu);
  const kaappaa = async () => (cdp
    ? Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64')
    : sivu.screenshot());
  const n = {};
  for (const kamera of KAMERAT) {
    /* eslint-disable no-await-in-loop */
    await sivu.evaluate(async (b) => {
      await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ bbox: b }, { kesto: 0, pakota: true });
    }, laatikkoAsteista(kamera.laatikko));
    await sivu.waitForTimeout(2500);
    let lepo = null;
    for (let i = 0; i < 12; i += 1) {
      await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.());
      await sivu.waitForTimeout(1200);
      lepo = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null);
      if (lepo && lepo.jumissa === 0 && lepo.valmiita > 0 && lepo.valmiita >= lepo.laattoja && lepo.hapyvia === 0) break;
    }
    tieto(`${ruutu.nimi}/${kamera.nimi}: laattakerros levossa`, JSON.stringify({
      taso: lepo?.taso, syy: lepo?.syy, laattoja: lepo?.laattoja,
      valmiita: lepo?.valmiita, varillisia: lepo?.varillisia, variMaa: lepo?.variMaa,
    }));
    vaadi(`${ruutu.nimi}/${kamera.nimi}: väritaso on Ranskan eikä kerros sammunut`,
      lepo?.variMaa === 'FRA' && !lepo?.syy, `variMaa ${lepo?.variMaa}, syy "${lepo?.syy}"`);

    const png = await kaappaa();
    const paikat = await sivu.evaluate((ps) => {
      const pallo = window.matkakirja.ui.pallolauta.pallo;
      const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
      const kehys = kangas?.getBoundingClientRect() ?? { left: 0, top: 0 };
      const ulos = {};
      for (const p of ps) {
        const s = pallo.getScreenCoords(p.lat, p.lon, 0);
        ulos[p.avain] = s && Number.isFinite(s.x) ? { x: s.x + kehys.left, y: s.y + kehys.top } : null;
      }
      return ulos;
    }, kamera.pisteet);
    /*
     * KAKSI MITTARIA SAMASTA RUUDUSTA. Maa- ja meripisteille 9 × 9:n
     * keskiarvo ja keskihajonta; MUSTEPISTEILLE laajempi ruutu ja
     * KONTRASTI (p95 − p5), koska poltettu nimiö on tumma viiva
     * vaalealla — keskiarvo ei sitä näe, mutta jakauman häntä näkee.
     */
    const otos = await sivu.evaluate(async ({ data, ps, lajit }) => {
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
        const r = (lajit[avain] === 'muste' ? 14 : 4) * Math.round(dpr);
        if (x - r < 0 || y - r < 0 || x + r >= img.width || y + r >= img.height) { ulos[avain] = null; continue; }
        const d = g.getImageData(x - r, y - r, 2 * r + 1, 2 * r + 1).data;
        const kirkkaudet = [];
        const rgb = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) {
          kirkkaudet.push(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
          rgb[0] += d[i]; rgb[1] += d[i + 1]; rgb[2] += d[i + 2];
        }
        const m = kirkkaudet.length;
        const ka = kirkkaudet.reduce((a, b) => a + b, 0) / m;
        const sigma = Math.sqrt(kirkkaudet.reduce((a, b) => a + (b - ka) ** 2, 0) / m);
        const j = [...kirkkaudet].sort((a, b) => a - b);
        ulos[avain] = {
          ka: Math.round(ka * 10) / 10,
          sigma: Math.round(sigma * 100) / 100,
          kontrasti: Math.round((j[Math.floor(m * 0.95)] - j[Math.floor(m * 0.05)]) * 10) / 10,
          rgb: rgb.map((v) => Math.round(v / m)),
        };
      }
      return ulos;
    }, {
      data: png.toString('base64'),
      ps: paikat,
      lajit: Object.fromEntries(kamera.pisteet.map((p) => [p.avain, p.laji])),
    });
    Object.assign(n, otos);
    tieto(`${ruutu.nimi}/${kamera.nimi}: pisteet`, JSON.stringify(otos));
    const polku = await kuvaan(sivu, `${MOOTTORI}-${VANHA ? 'vanha' : 'uusi'}-${ruutu.nimi}-${kamera.nimi}`);
    tieto(`${ruutu.nimi}/${kamera.nimi}: kuva`, polku ?? '(ei tallennettu)');
    /* eslint-enable no-await-in-loop */
  }

  const pari = (nimi, a, b, raja, vaite) => {
    if (!n[a] || !n[b]) {
      vaadi(`${ruutu.nimi}: ${vaite} ${nimi}`, false, `${!n[a] ? a : b} ei ollut ruudulla`);
      return;
    }
    const ero = Math.abs(n[a].ka - n[b].ka);
    vaadi(`${ruutu.nimi}: ${vaite} ${nimi} (|Δ| < ${raja})`, ero < raja,
      `${a} ka ${n[a].ka} vs ${b} ka ${n[b].ka} — ero ${Math.round(ero * 10) / 10}`);
  };
  pari('reunan kahta puolta', 'reuna-sisa', 'reuna-ulko', 5, 'V1 kerman peittävyys sama');
  pari('leveä pari', 'saksa-sisa', 'saksa-ulko', 5, 'V2 kerman peittävyys sama');
  /*
   * V3 ON TIETO EIKÄ VÄITE, JA SE ON MITTAUKSEN KORJAUS (18.9.2026).
   *
   * Pari Ardennit (4,6° 50,6°) / Noord-Brabant (4,6° 51,9°) on laatikon
   * pohjoisreunan eri puolilta, mutta se mittaa MAASTOA eikä reunaa:
   * ero oli sama ennen korjausta (152,5 / 142,0) ja sen jälkeen
   * (153,1 / 142,4). Syy on maamaskin ramppi — seepian R − B on
   * mäkisessä Ardenneissa selvästi korkeampi kuin Alankomaiden
   * alangolla, joten alanko saa vähemmän peittoa. Se on sama luku
   * laatikon molemmin puolin, eli EI laatikon reuna.
   *
   * Reunan mittaa V1: piste 0,26° reunan kummallakin puolella, samaa
   * maastoa, Δ 0,2. Tiukka pohjoispari (50,9° / 51,3°) on kirjattu
   * seuraavan erän työksi — sitä ei ehditty mitata aikakaton sisällä,
   * eikä mittaamatonta väitettä kirjoiteta vartijaan.
   */
  if (n['belgia-sisa'] && n['hollanti-ulko']) {
    tieto(`${ruutu.nimi}: maamaskin ramppi (maasto, ei reuna)`,
      `Ardennit ka ${n['belgia-sisa'].ka} vs Noord-Brabant ka ${n['hollanti-ulko'].ka}`
      + ` — ero ${Math.round(Math.abs(n['belgia-sisa'].ka - n['hollanti-ulko'].ka) * 10) / 10}`);
  }

  if (!n['kanaali-sisa'] || !n['pohjanmeri-ulko']) {
    vaadi(`${ruutu.nimi}: V4 meri laatikon sisällä = pohjan meri`, false, 'meripiste ei ollut ruudulla');
  }
  else {
    const ero = Math.max(...n['kanaali-sisa'].rgb.map((v, i) => Math.abs(v - n['pohjanmeri-ulko'].rgb[i])));
    vaadi(`${ruutu.nimi}: V4 meri laatikon sisällä on pohjan meren väri (kanavaero < 5)`, ero < 5,
      `Kanaali rgb ${n['kanaali-sisa'].rgb.join(',')} vs Pohjanmeri rgb ${n['pohjanmeri-ulko'].rgb.join(',')}`
      + ` — suurin kanavaero ${ero}`);
  }

  if (!n.ranska || !n['saksa-sisa'] || !n['saksa-ulko']) {
    vaadi(`${ruutu.nimi}: V5 Ranskan reliefi ennallaan`, false, 'piste ei ollut ruudulla');
  }
  else {
    vaadi(`${ruutu.nimi}: V5 Ranskan sisällä reliefi säilyy (σ suurin)`,
      n.ranska.sigma > n['saksa-sisa'].sigma && n.ranska.sigma > n['saksa-ulko'].sigma,
      `Ranska σ ${n.ranska.sigma}, Saksa sisä σ ${n['saksa-sisa'].sigma}, ulko σ ${n['saksa-ulko'].sigma}`);
  }

  /*
   * V7: NAAPURIN POLTETTU MUSTE JÄÄ KERMAN ALLE (Fablen lisäys
   * 18.9.2026 klo 15.20, Raamattu PAATOKSET 34 kohta 17 d). Nostotason
   * pisteet ja nimiöt on poltettu KAIKKIEN maiden laattoihin; kun kerma
   * peittää kohdemaan ulkopuolisen maan, muste ei saa erottua.
   * Mittari on ruudun kontrasti (p95 − p5): tumma viiva vaalealla
   * nostaa sen, tasainen kerma pitää sen matalana.
   *
   * MITATTU 18.9.2026 (korjattu kerma, molemmat ruudut): Gotthardin
   * seutu Sveitsissä kontrasti 14,8 (työpöytä) ja 13,9 (puhelin) eli
   * omistajan tavoitteen 10 YLI — 0,85:n kerma ei riitä piilottamaan
   * poltettua nimiötä. Gardan seutu Italiassa 3,4 / 2,8 (tuolla
   * kohdalla ei ole mustetta, eli luku on kerman oma tasaisuus).
   *
   * VÄITE ON TIETONA, KUNNES OMISTAJA ON PÄÄTTÄNYT KEINON. Fablen
   * toimeksianto 15.20: *"älä toteuta nostotason jakoa tässä erässä"*.
   * Ehdotus raportissa (kerman alfan nosto vai nostotason maittainen
   * jako); kun päätös on tehty, tämä muuttuu vaatimukseksi < 10.
   */
  for (const avain of ['muste-sveitsi-sisa', 'muste-italia-ulko']) {
    const p = n[avain];
    if (!p) { vaadi(`${ruutu.nimi}: V7 ${avain} on ruudulla`, false, 'piste ruudun ulkopuolella'); continue; }
    tieto(`${ruutu.nimi}: V7 ${avain} musteen kontrasti kerman alla`,
      `${p.kontrasti} (tavoite < 10, ka ${p.ka}, σ ${p.sigma})`);
  }

  await ctx.close();
}

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
